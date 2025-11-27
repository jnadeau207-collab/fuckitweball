module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next-auth/next [external] (next-auth/next, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next-auth/next", () => require("next-auth/next"));

module.exports = mod;
}),
"[externals]/next-auth [external] (next-auth, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next-auth", () => require("next-auth"));

module.exports = mod;
}),
"[externals]/next-auth/providers/credentials [external] (next-auth/providers/credentials, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next-auth/providers/credentials", () => require("next-auth/providers/credentials"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[externals]/bcrypt [external] (bcrypt, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("bcrypt", () => require("bcrypt"));

module.exports = mod;
}),
"[project]/pages/api/auth/[...nextauth].ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authOptions",
    ()=>authOptions,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth__$5b$external$5d$__$28$next$2d$auth$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next-auth [external] (next-auth, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$providers$2f$credentials__$5b$external$5d$__$28$next$2d$auth$2f$providers$2f$credentials$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next-auth/providers/credentials [external] (next-auth/providers/credentials, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$bcrypt__$5b$external$5d$__$28$bcrypt$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/bcrypt [external] (bcrypt, cjs)");
;
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$providers$2f$credentials__$5b$external$5d$__$28$next$2d$auth$2f$providers$2f$credentials$2c$__cjs$29$__["default"])({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'admin@example.com'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const user = await prisma.adminUser.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if (!user) return null;
                const ok = await __TURBOPACK__imported__module__$5b$externals$5d2f$bcrypt__$5b$external$5d$__$28$bcrypt$2c$__cjs$29$__["default"].compare(credentials.password, user.password);
                if (!ok) return null;
                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: user.name || undefined,
                    role: user.role
                };
            }
        })
    ],
    callbacks: {
        async jwt ({ token, user }) {
            if (user) {
                token.role = user.role ?? 'admin';
                token.id = user.id ?? token.id;
            }
            return token;
        },
        async session ({ session, token }) {
            session.user = session.user ?? {};
            session.user.role = token.role;
            session.user.id = token.id;
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
};
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth__$5b$external$5d$__$28$next$2d$auth$2c$__cjs$29$__["default"])(authOptions);
}),
"[externals]/multer [external] (multer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("multer", () => require("multer"));

module.exports = mod;
}),
"[externals]/pdf-parse [external] (pdf-parse, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("pdf-parse", () => require("pdf-parse"));

module.exports = mod;
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/coaParsers/novaAnalyticLabs.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/coaParsers/novaAnalyticLabs.ts
__turbopack_context__.s([
    "parseNovaAnalyticLabs",
    ()=>parseNovaAnalyticLabs
]);
function parseNovaAnalyticLabs(rawText) {
    if (!rawText) return {};
    const text = rawText.replace(/\r/g, "");
    const lower = text.toLowerCase();
    const result = {};
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
    const batchNoMatch = text.match(/BATCH\s+NO\.?\s*[:\-]\s*([A-Z0-9\-]+)/i) || text.match(/BATCH\s+#\s*[:\-]\s*([A-Z0-9\-]+)/i);
    if (batchNoMatch) {
        result.batchCode = batchNoMatch[1].trim();
    }
    // --- 5) Batch result (Pass/Fail) ---
    // Example: "Client: Bioactive LLC // Batch Result: Pass"
    const batchResultMatch = text.match(/BATCH\s+RESULT\s*[:\-]\s*(PASS(?:ED)?|FAIL(?:ED)?)/i);
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
    const totalThc = extractPercentByLabel(text, "TOTAL THC") ?? extractPercentByLabel(text, "Total THC");
    const deltaThc = extractPercentByLabel(text, "Δ-THC") ?? extractPercentByLabel(text, "Delta-9-THC");
    if (totalThc != null) {
        result.thcPercent = totalThc;
    } else if (deltaThc != null) {
        result.thcPercent = deltaThc;
    }
    // CBD – prefer TOTAL CBD; fall back to CBD.
    const totalCbd = extractPercentByLabel(text, "TOTAL CBD") ?? extractPercentByLabel(text, "Total CBD");
    const cbd = extractPercentByLabel(text, "CBD");
    if (totalCbd != null) {
        result.cbdPercent = totalCbd;
    } else if (cbd != null) {
        result.cbdPercent = cbd;
    }
    // Total cannabinoids – look for "TOTAL CANNABINOIDS"
    let totalCann = extractPercentByLabel(text, "TOTAL CANNABINOIDS") ?? extractPercentByLabel(text, "Total Cannabinoids");
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
 */ function extractProductName(text) {
    const upper = text.toUpperCase();
    const idx = upper.indexOf("CERTIFICATE OF ANALYSIS");
    const window = idx >= 0 ? text.slice(idx, idx + 800) : text.slice(0, 800);
    const lines = window.split(/\r?\n/).map((l)=>l.trim()).filter(Boolean);
    const filtered = lines.filter((l)=>{
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
 */ function extractPercentByLabel(text, label) {
    // Pattern 1: LABEL...12.3 %
    const pattern1 = new RegExp(`${escapeRegExp(label)}[^0-9]{0,10}([0-9]+(?:\\.[0-9]+)?)\\s*%`, "i");
    const m1 = text.match(pattern1);
    if (m1) {
        const v = parseFloat(m1[1]);
        if (!Number.isNaN(v)) return v;
    }
    // Pattern 2: 12.3 % LABEL
    const pattern2 = new RegExp(`([0-9]+(?:\\.[0-9]+)?)\\s*%\\s*${escapeRegExp(label)}`, "i");
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
 */ function extractPercentNearLabelBackward(text, label, windowSize) {
    const idx = text.toLowerCase().indexOf(label.toLowerCase());
    if (idx < 0) return null;
    const start = Math.max(0, idx - windowSize);
    const window = text.slice(start, idx);
    const matches = Array.from(window.matchAll(/([0-9]+(?:\.[0-9]+)?)\s*%/g));
    if (!matches.length) return null;
    const last = matches[matches.length - 1];
    const v = parseFloat(last[1]);
    return Number.isNaN(v) ? null : v;
}
/** Escape a string so it can safely be used inside a RegExp */ function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
}),
"[project]/lib/coaParsers/registry.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/coaParsers/registry.ts
__turbopack_context__.s([
    "parseCoa",
    ()=>parseCoa
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$coaParsers$2f$novaAnalyticLabs$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/coaParsers/novaAnalyticLabs.ts [api] (ecmascript)");
;
function parseCoa(input) {
    const text = (input.extractedText || "").replace(/\r/g, "");
    const lower = text.toLowerCase();
    let result = {};
    // --- Lab-specific detection ---
    const isNova = lower.includes("nova analytic labs");
    if (isNova) {
        const nova = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$coaParsers$2f$novaAnalyticLabs$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["parseNovaAnalyticLabs"])(text);
        result = {
            ...result,
            ...nova,
            // Ensure lab name & jurisdiction always set
            labName: nova.labName ?? "Nova Analytic Labs",
            jurisdiction: nova.jurisdiction ?? "ME",
            stateCode: nova.stateCode ?? "ME"
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
            const m2 = text.match(/BATCH(?!\s+(RESULT|SIZE))\s*[:\-]\s*([A-Z0-9\-]+)/i);
            if (m2) {
                result.batchCode = m2[2].trim();
            }
        }
    }
    return result;
}
}),
"[project]/pages/api/admin/uploads/index.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/api/admin/uploads/index.ts
__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$next__$5b$external$5d$__$28$next$2d$auth$2f$next$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next-auth/next [external] (next-auth/next, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auth$2f5b2e2e2e$nextauth$5d2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/auth/[...nextauth].ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$multer__$5b$external$5d$__$28$multer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/multer [external] (multer, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$parse__$5b$external$5d$__$28$pdf$2d$parse$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/pdf-parse [external] (pdf-parse, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$coaParsers$2f$registry$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/coaParsers/registry.ts [api] (ecmascript)");
;
;
;
;
;
;
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
// Multer in-memory storage (we write the file ourselves)
const upload = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$multer__$5b$external$5d$__$28$multer$2c$__cjs$29$__["default"])({
    storage: __TURBOPACK__imported__module__$5b$externals$5d2f$multer__$5b$external$5d$__$28$multer$2c$__cjs$29$__["default"].memoryStorage()
});
// Helper to run multer (or any middleware) in Next API route
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject)=>{
        fn(req, res, (result)=>{
            if (result instanceof Error) return reject(result);
            return resolve();
        });
    });
}
const config = {
    api: {
        bodyParser: false
    }
};
async function handler(req, res) {
    const session = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$next__$5b$external$5d$__$28$next$2d$auth$2f$next$2c$__cjs$29$__["getServerSession"])(req, res, __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auth$2f5b2e2e2e$nextauth$5d2e$ts__$5b$api$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session || session.user?.role !== 'admin') {
        res.status(401).json({
            error: 'Unauthorized'
        });
        return;
    }
    if (req.method === 'GET') {
        try {
            const docs = await prisma.uploadedDocument.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    labResult: {
                        select: {
                            id: true
                        }
                    }
                }
            });
            res.status(200).json(docs);
            return;
        } catch (e) {
            console.error('Failed to list uploads', e);
            res.status(500).json({
                error: e?.message || 'Failed to list uploads'
            });
            return;
        }
    }
    if (req.method === 'POST') {
        try {
            await runMiddleware(req, res, upload.single('file'));
            const file = req.file;
            if (!file) {
                res.status(400).json({
                    error: 'No file uploaded'
                });
                return;
            }
            if (file.mimetype !== 'application/pdf') {
                res.status(400).json({
                    error: 'Only PDF uploads are supported'
                });
                return;
            }
            // Hash buffer to detect duplicates
            const sha256 = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash('sha256').update(file.buffer).digest('hex');
            const existing = await prisma.uploadedDocument.findUnique({
                where: {
                    sha256
                },
                include: {
                    labResult: true
                }
            });
            if (existing) {
                res.status(200).json({
                    reused: true,
                    document: existing,
                    labResult: existing.labResult || null
                });
                return;
            }
            // Ensure uploads directory
            const relativePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join('uploads', 'coas', `${sha256}.pdf`);
            const fullPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), relativePath);
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(fullPath), {
                recursive: true
            });
            // Write file
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(fullPath, file.buffer);
            // Extract raw text from PDF
            let extractedText = '';
            try {
                const parsedPdf = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$parse__$5b$external$5d$__$28$pdf$2d$parse$2c$__cjs$29$__["default"])(file.buffer);
                extractedText = parsedPdf.text || '';
            } catch (err) {
                console.error('pdf-parse failed, continuing with empty text', err);
            }
            // Base parsed info from lab-specific registry (if present)
            let parsed = null;
            try {
                if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$coaParsers$2f$registry$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["parseCoa"] === 'function') {
                    parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$coaParsers$2f$registry$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["parseCoa"])(extractedText);
                }
            } catch (err) {
                console.error('parseCoa threw', err);
            }
            // --- Heuristic extraction / normalization ---
            const looksLikeNova = /Nova Analytic Labs/i.test(extractedText);
            // Lab name
            let labName = parsed?.labName || detectLabNameFromText(extractedText);
            if (looksLikeNova && !labName) {
                labName = 'Nova Analytic Labs';
            }
            // Batch code & pass/fail
            let batchCode = parsed?.batchCode?.trim() || null;
            let passed = typeof parsed?.passed === 'boolean' ? parsed.passed : null;
            if (looksLikeNova) {
                const novaMeta = refineNovaMetadata(extractedText, batchCode, passed);
                batchCode = novaMeta.batchCode ?? batchCode;
                passed = novaMeta.passed ?? passed;
            }
            if (!batchCode) {
                batchCode = detectBatchCodeFromText(extractedText);
            }
            // Jurisdiction & state (for now, Nova → ME)
            let stateCode = parsed?.stateCode || null;
            let jurisdiction = parsed?.jurisdiction || null;
            if (!stateCode && looksLikeNova) {
                stateCode = 'ME';
            }
            if (!jurisdiction && stateCode) {
                jurisdiction = stateCode;
            }
            // Sample type / matrix / sample ID
            const sampleType = parsed?.sampleType || detectMatrix(extractedText) || null;
            const sampleId = parsed?.sampleId || detectSampleId(extractedText) || null;
            // Potency
            let thcPercent = parsed?.thcPercent ?? detectThcPercent(extractedText);
            let cbdPercent = parsed?.cbdPercent ?? detectCbdPercent(extractedText);
            let totalCannabinoidsPercent = parsed?.totalCannabinoidsPercent ?? detectTotalCannabinoidsPercent(extractedText);
            if (looksLikeNova) {
                if (totalCannabinoidsPercent == null) {
                    totalCannabinoidsPercent = detectNovaTotalCannabinoidsPercent(extractedText);
                }
                if (cbdPercent == null) {
                    cbdPercent = detectNovaCbdPercent(extractedText);
                }
            }
            // --- Persist UploadedDocument first ---
            const document = await prisma.uploadedDocument.create({
                data: {
                    filePath: relativePath.replace(/\\/g, '/'),
                    fileName: file.originalname,
                    mimeType: file.mimetype,
                    size: file.size,
                    sha256,
                    extractedText,
                    labName: labName || null,
                    batchCode: batchCode || null,
                    uploader: session.user?.email || null,
                    verified: false
                }
            });
            // --- Upsert Lab (if we found a name) ---
            let labRecord = null;
            if (labName) {
                const slug = slugify(labName);
                const existingLab = await prisma.lab.findUnique({
                    where: {
                        slug
                    }
                });
                if (existingLab) {
                    labRecord = await prisma.lab.update({
                        where: {
                            id: existingLab.id
                        },
                        data: {
                            name: labName,
                            stateCode: stateCode || existingLab.stateCode
                        }
                    });
                } else {
                    labRecord = await prisma.lab.create({
                        data: {
                            name: labName,
                            slug,
                            stateCode
                        }
                    });
                }
            }
            // --- Upsert Batch (using batchCode + jurisdiction heuristically) ---
            let batchRecord = null;
            if (batchCode) {
                const existingBatch = await prisma.batch.findFirst({
                    where: {
                        batchCode,
                        jurisdiction: jurisdiction || undefined
                    }
                });
                const batchData = {
                    batchCode,
                    productName: parsed?.productName || null,
                    jurisdiction,
                    stateCode,
                    isActive: true
                };
                if (existingBatch) {
                    batchRecord = await prisma.batch.update({
                        where: {
                            id: existingBatch.id
                        },
                        data: batchData
                    });
                } else {
                    batchRecord = await prisma.batch.create({
                        data: batchData
                    });
                }
            }
            // --- Create LabResult if we have at least a batch or lab ---
            let labResult = null;
            if (batchRecord || labRecord) {
                labResult = await prisma.labResult.create({
                    data: {
                        // link to batch & lab if present
                        ...batchRecord ? {
                            batch: {
                                connect: {
                                    id: batchRecord.id
                                }
                            }
                        } : {},
                        ...labRecord ? {
                            lab: {
                                connect: {
                                    id: labRecord.id
                                }
                            }
                        } : {},
                        uploadedDocument: {
                            connect: {
                                id: document.id
                            }
                        },
                        sampleId,
                        sampleType,
                        thcPercent,
                        cbdPercent,
                        totalCannabinoidsPercent,
                        passed,
                        analyteSummary: parsed?.analyteSummary || null,
                        rawJson: parsed?.rawJson || null
                    }
                });
            }
            res.status(200).json({
                reused: false,
                document,
                labResult
            });
            return;
        } catch (e) {
            console.error('Error handling upload', e);
            res.status(500).json({
                error: e?.message || 'Error handling upload'
            });
            return;
        }
    }
    res.status(405).end();
}
// ---------- Helpers ----------
function slugify(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}
function detectLabNameFromText(text) {
    if (/Nova Analytic Labs/i.test(text)) return 'Nova Analytic Labs';
    return null;
}
function detectBatchCodeFromText(text) {
    // Modern Nova: "BATCH NO.: 600RCRTPC113"
    const m1 = text.match(/BATCH\s*(?:NO\.?|NUMBER)\s*[:\-]\s*([A-Z0-9\-]+)/i);
    if (m1) return m1[1].trim();
    // Older Nova example: "CLIENT: ... // BATCH: FAIL"
    const m2 = text.match(/BATCH:\s*([A-Z0-9\-]+)/i);
    if (m2) {
        const candidate = m2[1].trim();
        const upper = candidate.toUpperCase();
        if (![
            'PASS',
            'PASSED',
            'FAIL',
            'FAILED'
        ].includes(upper)) {
            return candidate;
        }
    }
    return null;
}
function refineNovaMetadata(text, currentBatchCode, currentPassed) {
    let batchCode = currentBatchCode ?? null;
    let passed = currentPassed ?? null;
    // "BATCH RESULT: Pass" / "BATCH RESULT: Failed"
    const resultMatch = text.match(/BATCH RESULT:\s*(PASS(?:ED)?|FAIL(?:ED)?)/i);
    if (resultMatch) {
        const word = resultMatch[1].toUpperCase();
        passed = word.startsWith('PASS');
        if (batchCode && [
            'PASS',
            'PASSED',
            'FAIL',
            'FAILED'
        ].includes(batchCode.toUpperCase())) {
            // That wasn't a real batch code, just the result
            batchCode = null;
        }
    }
    // If we cleared batchCode or never had one, look for "BATCH NO.: ..."
    if (!batchCode) {
        const m = text.match(/BATCH\s*(?:NO\.?|NUMBER)\s*[:\-]\s*([A-Z0-9\-]+)/i);
        if (m) {
            batchCode = m[1].trim();
        }
    }
    return {
        batchCode,
        passed
    };
}
function detectMatrix(text) {
    const m = text.match(/MATRIX:\s*([A-Za-z ]+)/i);
    return m ? m[1].trim() : null;
}
function detectSampleId(text) {
    const m = text.match(/SAMPLE ID:\s*([A-Z0-9\-]+)/i);
    return m ? m[1].trim() : null;
}
// Very rough THC detector
function detectThcPercent(text) {
    // Δ-THC:28.5 %
    const m1 = text.match(/Δ-?THC[:\s]*([0-9]+(?:\.[0-9]+)?)\s*%/i);
    if (m1) return parseFloat(m1[1]);
    // Total THC ...
    const m2 = text.match(/TOTAL THC[^\n]*?\s([0-9]+(?:\.[0-9]+)?)\s*%/i);
    if (m2) return parseFloat(m2[1]);
    return null;
}
// Generic CBD % detector
function detectCbdPercent(text) {
    // CBD0.902 %
    const m = text.match(/CBD\s*([0-9]+(?:\.[0-9]+)?)\s*%/);
    if (m) return parseFloat(m[1]);
    return null;
}
// Generic "Total Cannabinoids" detector
function detectTotalCannabinoidsPercent(text) {
    const m = text.match(/TOTAL CANNABINOIDS[:\s]*([0-9]+(?:\.[0-9]+)?)\s*%/i);
    if (m) return parseFloat(m[1]);
    return null;
}
// Nova-specific "Total Cannabinoids" (covers both examples you pasted)
function detectNovaTotalCannabinoidsPercent(text) {
    // "Total Cannabinoids\n3.02 %"
    const m1 = text.match(/Total Cannabinoids[\s:]*([0-9]+(?:\.[0-9]+)?)\s*%/i);
    if (m1) return parseFloat(m1[1]);
    // "TOTAL CANNABINOIDS:29.1 %"
    const m2 = text.match(/TOTAL CANNABINOIDS[:\s]*([0-9]+(?:\.[0-9]+)?)\s*%/i);
    if (m2) return parseFloat(m2[1]);
    return null;
}
// Nova-specific CBD % (handles "CBD2.93 %" and "CBD0.902 %")
function detectNovaCbdPercent(text) {
    const m = text.match(/CBD\s*([0-9]+(?:\.[0-9]+)?)\s*%/);
    if (m) return parseFloat(m[1]);
    return null;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4c94af4f._.js.map