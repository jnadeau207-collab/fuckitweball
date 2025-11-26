// lib/coaParsers/novaAnalyticLabs.ts

export type NovaParseResult = {
  labName?: string | null;

  // Identity
  productName?: string | null;
  batchCode?: string | null;
  sampleId?: string | null;

  // Jurisdiction / location
  jurisdiction?: string | null;
  stateCode?: string | null;

  // Potency (normalized as percentages)
  thcPercent?: number | null;
  cbdPercent?: number | null;
  totalCannabinoidsPercent?: number | null;

  // QA flags
  passed?: boolean | null;
  pesticidesPass?: boolean | null;
};

/**
 * Nova Analytic Labs parser.
 *
 * Assumes `text` is the full extractedText from pdf-parse.
 * Handles both the older flower COAs (with 28.5% THC example)
 * and the newer TagLeaf-style edibles / tincture reports.
 */
export function parseNovaAnalyticLabs(rawText: string): NovaParseResult {
  if (!rawText) return {};

  const text = rawText.replace(/\r/g, "");
  const lower = text.toLowerCase();

  const result: NovaParseResult = {};

  // --- 1) Lab name & jurisdiction (Nova is always ME in your data) ---
  result.labName = "Nova Analytic Labs";
  result.stateCode = "ME";
  result.jurisdiction = "ME";

  // --- 2) Product name (line after CERTIFICATE OF ANALYSIS, skipping QA blurb) ---
  result.productName = extractProductName(text);

  // --- 3) Sample ID ---
  const sampleMatch = text.match(/SAMPLE\s+ID\s*:\s*([A-Z0-9\-]+)/i);
  if (sampleMatch) {
    result.sampleId = sampleMatch[1].trim();
  }

  // --- 4) Batch code (BATCH NO. or BATCH #: ... ONLY – never Batch Result) ---
  const batchNoMatch =
    text.match(/BATCH\s+NO\.?\s*[:\-]\s*([A-Z0-9\-]+)/i) ||
    text.match(/BATCH\s+#\s*[:\-]\s*([A-Z0-9\-]+)/i);
  if (batchNoMatch) {
    result.batchCode = batchNoMatch[1].trim();
  }

  // --- 5) Batch result (Pass/Fail) ---
  // Example: "Client: Bioactive LLC // Batch Result: Pass"
  const batchResultMatch = text.match(
    /BATCH\s+RESULT\s*[:\-]\s*(PASS(?:ED)?|FAIL(?:ED)?)/i
  );
  if (batchResultMatch) {
    const v = batchResultMatch[1].toLowerCase();
    result.passed = v.startsWith("pass");
  }

  // Also consider explicit pesticides line:
  // e.g. "PESTICIDES" + "PASS" / "FAIL"
  const pesticidesMatch = text.match(/PESTICIDES\s+(\bPASS\b|\bFAIL\b)/i);
  if (pesticidesMatch) {
    result.pesticidesPass = pesticidesMatch[1].toLowerCase() === "pass";
  }

  // --- 6) Potency parsing ---
  // We try Nova's big analyte table first, then fall back
  // to more generic % searches.

  // THC – we prefer TOTAL THC if present; otherwise Δ-THC.
  const totalThc =
    extractPercentByLabel(text, "TOTAL THC") ??
    extractPercentByLabel(text, "Total THC");
  const deltaThc =
    extractPercentByLabel(text, "Δ-THC") ??
    extractPercentByLabel(text, "Delta-9-THC");

  if (totalThc != null) {
    result.thcPercent = totalThc;
  } else if (deltaThc != null) {
    result.thcPercent = deltaThc;
  }

  // CBD – prefer TOTAL CBD; fall back to CBD.
  const totalCbd =
    extractPercentByLabel(text, "TOTAL CBD") ??
    extractPercentByLabel(text, "Total CBD");
  const cbd = extractPercentByLabel(text, "CBD");

  if (totalCbd != null) {
    result.cbdPercent = totalCbd;
  } else if (cbd != null) {
    result.cbdPercent = cbd;
  }

  // Total cannabinoids – look for "TOTAL CANNABINOIDS"
  let totalCann =
    extractPercentByLabel(text, "TOTAL CANNABINOIDS") ??
    extractPercentByLabel(text, "Total Cannabinoids");

  // Some newer Nova COAs put "Total Cannabinoids" on its own line
  // with the % above it (your 3.02 % example). We handle that here.
  if (totalCann == null) {
    totalCann = extractPercentNearLabelBackward(text, "Total Cannabinoids", 160);
  }

  if (totalCann != null) {
    result.totalCannabinoidsPercent = totalCann;
  }

  return result;
}

// ---------------------------------------------------------
// Helpers
// ---------------------------------------------------------

/**
 * Grab the product name from near the top of the report.
 *
 * Pattern in your examples:
 *   CERTIFICATE OF ANALYSIS
 *   * For quality...
 *   Nano BS CBD #1 (Edible Liquid)
 *
 *   CERTIFICATE OF ANALYSIS
 *   * FOR QUALITY...
 *   600MG RELEAF TINCTURE - PINACOLADA (TINCTURE)
 *   PRODUCED: ...
 */
function extractProductName(text: string): string | null {
  const upper = text.toUpperCase();
  const idx = upper.indexOf("CERTIFICATE OF ANALYSIS");

  const window = idx >= 0 ? text.slice(idx, idx + 800) : text.slice(0, 800);

  const lines = window
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const filtered = lines.filter((l) => {
    const lu = l.toUpperCase();
    if (lu.includes("CERTIFICATE OF ANALYSIS")) return false;
    if (lu.includes("FOR QUALITY ASSURANCE")) return false;
    if (lu.startsWith("* FOR QUALITY ASSURANCE")) return false;
    return true;
  });

  return filtered[0] || null;
}

/**
 * Extract a percentage like "CBD0.902 %" or "CBD 0.902 %"
 * or "0.902 % CBD" from anywhere in the text.
 */
function extractPercentByLabel(
  text: string,
  label: string
): number | null {
  // Pattern 1: LABEL...12.3 %
  const pattern1 = new RegExp(
    `${escapeRegExp(label)}[^0-9]{0,10}([0-9]+(?:\\.[0-9]+)?)\\s*%`,
    "i"
  );
  const m1 = text.match(pattern1);
  if (m1) {
    const v = parseFloat(m1[1]);
    if (!Number.isNaN(v)) return v;
  }

  // Pattern 2: 12.3 % LABEL
  const pattern2 = new RegExp(
    `([0-9]+(?:\\.[0-9]+)?)\\s*%\\s*${escapeRegExp(label)}`,
    "i"
  );
  const m2 = text.match(pattern2);
  if (m2) {
    const v = parseFloat(m2[1]);
    if (!Number.isNaN(v)) return v;
  }

  return null;
}

/**
 * For the weird "3.02 % ... Total Cannabinoids" layout:
 *
 * 2.93 %
 * 0.0851 %
 * 3.02 %
 * CBD
 * CBG
 * Total Cannabinoids
 *
 * We locate "Total Cannabinoids" and scan backwards
 * within a small window for the last % number.
 */
function extractPercentNearLabelBackward(
  text: string,
  label: string,
  windowSize: number
): number | null {
  const idx = text.toLowerCase().indexOf(label.toLowerCase());
  if (idx < 0) return null;

  const start = Math.max(0, idx - windowSize);
  const window = text.slice(start, idx);

  const matches = Array.from(
    window.matchAll(/([0-9]+(?:\.[0-9]+)?)\s*%/g)
  );
  if (!matches.length) return null;

  const last = matches[matches.length - 1];
  const v = parseFloat(last[1]);
  return Number.isNaN(v) ? null : v;
}

/** Escape a string so it can safely be used inside a RegExp */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
