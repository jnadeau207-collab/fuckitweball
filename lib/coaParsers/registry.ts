// lib/coaParsers/registry.ts

import { parseNovaAnalyticLabs, NovaParseResult } from "./novaAnalyticLabs";

export type CoaParseInput = {
  fileName?: string;
  extractedText: string;
  labNameCandidate?: string | null;
};

export type CoaParseResult = {
  labName?: string | null;

  productName?: string | null;
  batchCode?: string | null;
  sampleId?: string | null;

  jurisdiction?: string | null;
  stateCode?: string | null;

  thcPercent?: number | null;
  cbdPercent?: number | null;
  totalCannabinoidsPercent?: number | null;

  passed?: boolean | null;
  pesticidesPass?: boolean | null;
};

/**
 * Central COA parsing entrypoint used by /api/admin/uploads.
 *
 * You can extend this later with additional lab-specific parsers
 * and state-specific templates.
 */
export function parseCoa(input: CoaParseInput): CoaParseResult {
  const text = (input.extractedText || "").replace(/\r/g, "");
  const lower = text.toLowerCase();

  let result: CoaParseResult = {};

  // --- Lab-specific detection ---

  const isNova = lower.includes("nova analytic labs");
  if (isNova) {
    const nova: NovaParseResult = parseNovaAnalyticLabs(text);

    result = {
      ...result,
      ...nova,
      // Ensure lab name & jurisdiction always set
      labName: nova.labName ?? "Nova Analytic Labs",
      jurisdiction: nova.jurisdiction ?? "ME",
      stateCode: nova.stateCode ?? "ME",
    };
  }

  // --- Generic lab name fallback ---
  if (!result.labName && input.labNameCandidate) {
    result.labName = input.labNameCandidate;
  }

  // --- Generic pass/fail fallback (in case a lab parser didn’t set it) ---
  if (result.passed == null) {
    const m = text.match(/BATCH\s+RESULT\s*[:\-]\s*(PASS(?:ED)?|FAIL(?:ED)?)/i);
    if (m) {
      const v = m[1].toLowerCase();
      result.passed = v.startsWith("pass");
    }
  }

  // --- Generic batch code fallback ---
  if (!result.batchCode) {
    // 1) BATCH NO.: ABC123-XYZ
    const m1 = text.match(/BATCH\s+NO\.?\s*[:\-]\s*([A-Z0-9\-]+)/i);
    if (m1) {
      result.batchCode = m1[1].trim();
    } else {
      // 2) BATCH: ..., but explicitly ignore "Batch Result" and "Batch Size"
      const m2 = text.match(
        /BATCH(?!\s+(RESULT|SIZE))\s*[:\-]\s*([A-Z0-9\-]+)/i
      );
      if (m2) {
        result.batchCode = m2[2].trim();
      }
    }
  }

  return result;
}
