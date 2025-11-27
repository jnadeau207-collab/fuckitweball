// pages/admin/uploads/[id].tsx

import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type LabResultAny = {
  id: number;
  createdAt?: string;
  thcPercent?: number | null;
  cbdPercent?: number | null;
  totalCannabinoidsPercent?: number | null;
  passed?: boolean | null;
  pesticidesPass?: boolean | null;
  solventsPass?: boolean | null;
  heavyMetalsPass?: boolean | null;
  microbialsPass?: boolean | null;
  batch?: {
    id: number;
    batchCode?: string | null;
    jurisdiction?: string | null;
    productName?: string | null;
    stateCode?: string | null;
  } | null;
  lab?: {
    id: number;
    name: string;
    slug?: string;
    city?: string | null;
    stateCode?: string | null;
  } | null;
  rawJson?: any;
};

type UploadDetail = {
  id: number;
  fileName: string;
  filePath: string;
  mimeType: string;
  size: number;
  sha256: string;
  createdAt: string;
  verified: boolean;
  batchCode?: string | null;
  labName?: string | null;
  extractedText?: string | null;
  labResult?: LabResultAny | null;
};

type NovaDerived = {
  labName: string;
  clientName: string | null;
  batchResult: string | null;
  batchCode: string | null;
  sampleId: string | null;
  matrix: string | null;
  producedRaw: string | null;
  thcPercent: number | null;
  cbdPercent: number | null;
  totalCannabinoidsPercent: number | null;
  pesticidesPass: boolean | null;
  passed: boolean | null;
};

function formatDate(value: string | Date | null | undefined): string {
  if (!value) return "—";
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
}

function formatSize(size: number | null | undefined): string {
  if (!size || size <= 0) return "—";
  const kb = size / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

function numberOrDash(n: number | null | undefined): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  return `${n.toFixed(2)} %`;
}

function deriveNovaFromText(text: string | null | undefined): NovaDerived | null {
  if (!text) return null;

  const raw = text.replace(/\r\n/g, "\n");
  const lower = raw.toLowerCase();

  if (!lower.includes("nova analytic labs")) {
    return null;
  }

  const safeNumber = (re: RegExp): number | null => {
    const m = raw.match(re);
    if (!m || !m[1]) return null;
    const value = parseFloat(m[1].replace(",", ""));
    return Number.isNaN(value) ? null : value;
  };

  const clientMatch = raw.match(/CLIENT:\s*([^/\n]+?)(?:\/\/|BATCH|$)/i);
  const clientName = clientMatch?.[1]?.trim() || null;

  const batchResultMatch = raw.match(
    /BATCH RESULT:\s*(PASS|PASSED|FAIL|FAILED)/i
  );
  const batchResult = batchResultMatch?.[1]?.toUpperCase() || null;

  const batchNoMatch = raw.match(
    /BATCH\s+NO\.?\s*[:#]\s*([A-Za-z0-9\-_.]+)/i
  );
  const batchCodeMatch = raw.match(
    /BATCH(?!\s*RESULT)\s*[:#]\s*([A-Za-z0-9\-_.]+)/i
  );

  let batchCode: string | null = null;

  if (batchNoMatch && batchNoMatch[1]) {
    batchCode = batchNoMatch[1].trim();
  } else if (batchCodeMatch && batchCodeMatch[1]) {
    batchCode = batchCodeMatch[1].trim();
  }

  if (batchCode && /^(pass|passed|fail|failed)$/i.test(batchCode)) {
    batchCode = null;
  }

  const sampleIdMatch = raw.match(/SAMPLE ID:\s*([A-Z0-9\-]+)/i);
  const sampleId = sampleIdMatch?.[1] || null;

  // Fallback: if no explicit batch code but we have a Sample ID, use that
  if (!batchCode && sampleId) {
    batchCode = sampleId;
  }

  const matrixMatch = raw.match(/MATRIX:\s*([A-Za-z ]+)/i);
  const matrix = matrixMatch?.[1]?.trim() || null;

  const producedMatch = raw.match(
    /PRODUCED:\s*([A-Z]{3}\s+\d{1,2},\s+\d{4})/i
  );
  const producedRaw = producedMatch?.[1]?.trim() || null;

  // Potency extraction:
  //  - First look for explicit "TOTAL THC nn.nn %"
  //  - fall back to "Δ-THC nn.nn %"
  const thcPercent =
    safeNumber(/TOTAL THC[^\d]*(\d+(?:\.\d+)?)\s*%/i) ||
    safeNumber(/Δ-THC\s*[: ]\s*(\d+(?:\.\d+)?)\s*%/i) ||
    null;

  // CBD is often "CBD 2.93 %" or "TOTAL CBD 0.902 %"
  const cbdPercent =
    safeNumber(/CBD\s+(\d+(?:\.\d+)?)\s*%/i) ||
    safeNumber(/TOTAL CBD[^\d]*(\d+(?:\.\d+)?)\s*%/i) ||
    null;

  const totalCannabinoidsPercent =
    safeNumber(/TOTAL CANNABINOIDS\s+(\d+(?:\.\d+)?)\s*%/i) || null;

  const pesticidesPass =
    /PESTICIDES[\s\S]{0,60}PASS/i.test(raw) ||
    /PESTICIDES, INSECTICIDES[\s\S]{0,200}NDN\/A/i.test(raw) ||
    null;

  let passed: boolean | null = null;
  if (batchResult === "PASS" || batchResult === "PASSED") passed = true;
  if (batchResult === "FAIL" || batchResult === "FAILED") passed = false;

  return {
    labName: "Nova Analytic Labs",
    clientName,
    batchResult,
    batchCode,
    sampleId,
    matrix,
    producedRaw,
    thcPercent,
    cbdPercent,
    totalCannabinoidsPercent,
    pesticidesPass,
    passed,
  };
}

export default function AdminUploadDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [doc, setDoc] = useState<UploadDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function fetchDetail() {
      setLoading(true);
      setErrorText(null);
      try {
        const res = await fetch(`/api/admin/uploads/${id}`);
        const txt = await res.text();

        if (!res.ok) {
          if (!cancelled) {
            setErrorText(txt || "Failed to load COA detail");
            setLoading(false);
          }
          return;
        }

        const data = JSON.parse(txt);
        if (!cancelled) {
          setDoc(data);
          setLoading(false);
        }
      } catch (err: any) {
        if (!cancelled) {
          setErrorText(err?.message || "Failed to load COA detail");
          setLoading(false);
        }
      }
    }

    fetchDetail();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const derivedNova: NovaDerived | null = useMemo(
    () => deriveNovaFromText(doc?.extractedText),
    [doc?.extractedText]
  );

  const labResult = doc?.labResult;

  const displayThc =
    labResult?.thcPercent ??
    derivedNova?.thcPercent ??
    null;

  const displayCbd =
    labResult?.cbdPercent ??
    derivedNova?.cbdPercent ??
    null;

  const displayTotalCannabinoids =
    labResult?.totalCannabinoidsPercent ??
    derivedNova?.totalCannabinoidsPercent ??
    null;

  const displayBatchCode =
    derivedNova?.batchCode ??
    doc?.batchCode ??
    labResult?.batch?.batchCode ??
    null;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-sm text-slate-300">Loading COA detail…</p>
      </div>
    );
  }

  if (errorText) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="max-w-lg rounded-xl border border-red-500/40 bg-red-950/30 p-4">
          <p className="text-sm font-semibold text-red-200 mb-2">
            Error loading COA
          </p>
          <pre className="text-xs text-red-100 whitespace-pre-wrap">
            {errorText}
          </pre>
          <div className="mt-3">
            <Link
              href="/admin/uploads"
              className="text-xs text-sky-300 hover:underline"
            >
              ← Back to COA uploads
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-sm text-slate-300">
            COA not found or has been deleted.
          </p>
          <Link
            href="/admin/uploads"
            className="text-xs text-sky-300 hover:underline"
          >
            ← Back to COA uploads
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="max-w-6xl mx-auto py-8 px-4">
        <Link
          href="/admin/uploads"
          className="inline-flex items-center text-xs font-medium text-sky-400 hover:text-sky-300"
        >
          ← Back to COA uploads
        </Link>

        <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              COA #{doc.id}
            </h1>
            <p className="text-xs text-slate-400 mt-1 break-all">
              {doc.fileName}
            </p>
          </div>
          <div className="text-right text-xs text-slate-400 space-y-1">
            <p>Uploaded: {formatDate(doc.createdAt)}</p>
            <p>SHA256: {doc.sha256}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1.8fr)]">
          {/* Left column: parsed + relationships */}
          <section className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Parsed metadata
              </h2>
              <dl className="mt-3 grid gap-x-6 gap-y-2 text-xs sm:grid-cols-2">
                <div>
                  <dt className="text-slate-500">Batch code</dt>
                  <dd className="font-mono text-slate-100">
                    {displayBatchCode || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Batch result</dt>
                  <dd className="font-mono text-slate-100">
                    {derivedNova?.batchResult ||
                      (labResult?.passed === true
                        ? "PASS"
                        : labResult?.passed === false
                        ? "FAIL"
                        : "Unknown")}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Lab name</dt>
                  <dd className="font-medium">
                    {doc.labName ||
                      labResult?.lab?.name ||
                      (derivedNova ? derivedNova.labName : "Unknown")}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Client / Producer</dt>
                  <dd className="font-medium">
                    {derivedNova?.clientName || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Sample ID</dt>
                  <dd className="font-mono">
                    {derivedNova?.sampleId || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Matrix / Sample type</dt>
                  <dd>{derivedNova?.matrix || labResult?.batch?.productName || "—"}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Produced</dt>
                  <dd>{derivedNova?.producedRaw || "—"}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Backend path</dt>
                  <dd className="font-mono break-all">{doc.filePath}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">File type</dt>
                  <dd>
                    {doc.mimeType} · {formatSize(doc.size)}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Verification</dt>
                  <dd>
                    {doc.verified ? (
                      <span className="text-emerald-300">Verified</span>
                    ) : (
                      <span className="text-amber-300">Unverified</span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Potency & safety summary
              </h2>
              <dl className="mt-3 grid gap-x-6 gap-y-2 text-xs sm:grid-cols-3">
                <div>
                  <dt className="text-slate-500">THC %</dt>
                  <dd className="font-mono">
                    {numberOrDash(displayThc)}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">CBD %</dt>
                  <dd className="font-mono">
                    {numberOrDash(displayCbd)}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Total cannabinoids %</dt>
                  <dd className="font-mono">
                    {numberOrDash(displayTotalCannabinoids)}
                  </dd>
                </div>
              </dl>

              <dl className="mt-4 grid gap-x-6 gap-y-2 text-xs sm:grid-cols-2">
                <div>
                  <dt className="text-slate-500">Pesticides</dt>
                  <dd>
                    {labResult?.pesticidesPass ??
                    derivedNova?.pesticidesPass ??
                    null
                      ? "Pass"
                      : labResult?.pesticidesPass === false
                      ? "Fail"
                      : "Unknown"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Microbials</dt>
                  <dd>
                    {labResult?.microbialsPass === true
                      ? "Pass"
                      : labResult?.microbialsPass === false
                      ? "Fail"
                      : "Unknown"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Solvents</dt>
                  <dd>
                    {labResult?.solventsPass === true
                      ? "Pass"
                      : labResult?.solventsPass === false
                      ? "Fail"
                      : "Unknown"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Heavy metals</dt>
                  <dd>
                    {labResult?.heavyMetalsPass === true
                      ? "Pass"
                      : labResult?.heavyMetalsPass === false
                      ? "Fail"
                      : "Unknown"}
                  </dd>
                </div>
              </dl>
            </div>

            {labResult?.batch && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Linked batch
                </h2>
                <dl className="mt-3 grid gap-x-6 gap-y-1 text-xs sm:grid-cols-2">
                  <div>
                    <dt className="text-slate-500">Batch link</dt>
                    <dd>Batch #{labResult.batch.id}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Jurisdiction</dt>
                    <dd>
                      {labResult.batch.jurisdiction ||
                        labResult.batch.stateCode ||
                        "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Product name</dt>
                    <dd>{labResult.batch.productName || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Stored batch code</dt>
                    <dd className="font-mono">
                      {labResult.batch.batchCode || "—"}
                    </dd>
                  </div>
                </dl>
              </div>
            )}
          </section>

          {/* Right column: raw text */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Raw extracted text
            </h2>
            <p className="mt-1 mb-3 text-[11px] text-slate-500">
              Use this to refine per-lab parsing rules. This view also
              includes Nova-specific parsing for batch result, potency, and
              sample metadata.
            </p>
            <div className="relative flex-1 min-h-[200px]">
              <pre className="absolute inset-0 overflow-auto text-[11px] leading-snug bg-slate-950/60 border border-slate-800 rounded-lg p-3 font-mono text-slate-100 whitespace-pre-wrap">
                {doc.extractedText || "No extracted text available."}
              </pre>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
