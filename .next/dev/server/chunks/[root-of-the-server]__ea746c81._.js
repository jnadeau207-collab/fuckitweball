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
"[project]/lib/coaParsers/registry.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/coaParsers/registry.ts
/**
 * Shape of a normalized COA parse result that the upload pipeline can use
 * to wire up Lab, Batch, and LabResult records.
 */ __turbopack_context__.s([
    "parseCoa",
    ()=>parseCoa
]);
function parseCoa(text, fileName) {
    const trimmed = (text || '').trim();
    if (!trimmed) return null;
    // Nova Analytic Labs – a.k.a. the one we care about right now
    if (/NOVA\s+ANALYTIC\s+LABS/i.test(trimmed)) {
        return parseNovaAnalyticLabs(trimmed);
    }
    // TODO: add more lab-specific parsers here as we go.
    return null;
}
/**
 * Helper: parse a US-looking date like "DEC 14, 2022" into ISO string.
 */ function parseUsDate(input) {
    if (!input) return undefined;
    const cleaned = input.trim();
    if (!cleaned) return undefined;
    const d = new Date(cleaned);
    if (Number.isNaN(d.getTime())) return undefined;
    return d.toISOString();
}
/**
 * Helper: parse flag patterns like "PESTICIDESPASS", "PESTICIDES FAIL", etc.
 */ function parsePassFailFlag(text, label) {
    const re = new RegExp(label + '\\s*(PASS|FAIL)', 'i');
    const m = text.match(re);
    if (!m) return undefined;
    return m[1].toUpperCase() === 'PASS';
}
/**
 * Parser for Nova Analytic Labs COAs.
 *
 * This is intentionally conservative – we only pull the bits we can
 * reliably infer across multiple examples (flower, tincture, etc.).
 */ function parseNovaAnalyticLabs(text) {
    // --- Batch code ---
    // Examples:
    //   "CLIENT: NOVA - PT ACCOUNT // BATCH: FAIL"
    //   "... BATCH: NAL-250414-043"
    let batchCode;
    const batchMatch = text.match(/BATCH:\s*([A-Z0-9\-_.]+)/i) || text.match(/BATCH\s+RESULT:\s*([A-Z0-9\-_.]+)/i);
    if (batchMatch) {
        batchCode = batchMatch[1].trim();
    }
    // --- Sample type / matrix ---
    // e.g. "MATRIX: FLOWER", "MATRIX: TINCTURE"
    let sampleType;
    const matrixMatch = text.match(/MATRIX:\s*([A-Z ]+)/i);
    if (matrixMatch) {
        sampleType = matrixMatch[1].trim();
    }
    // --- Product / "name-ish" ---
    // Nova's example: "COA EXAMPLE (FLOWER)" – not super useful,
    // but many partner COAs have more descriptive headers.
    let productName;
    const headerLineMatch = text.match(/COA\s+EXAMPLE\s*\(([^)]+)\)/i);
    if (headerLineMatch) {
        productName = headerLineMatch[1].trim();
    }
    // --- Produced / tested dates ---
    // Example:
    //   "COA EXAMPLE (FLOWER) // PRODUCED: JUN 10, 2024"
    //   "PREPARATION: DEC 14, 2022 // ANALYSIS: DEC 14, 2022"
    let producedAt;
    let testedAt;
    const producedMatch = text.match(/PRODUCED:\s*([A-Z]{3}\s+\d{1,2},\s+\d{4})/i);
    if (producedMatch) {
        producedAt = parseUsDate(producedMatch[1]);
    }
    const analysisMatch = text.match(/ANALYSIS:\s*([A-Z]{3}\s+\d{1,2},\s+\d{4})/i);
    if (analysisMatch) {
        testedAt = parseUsDate(analysisMatch[1]);
    }
    // --- Potency ---
    // Example lines:
    //   "Δ-THC:28.5 %"
    //   "TOTAL CANNABINOIDS:29.1 %"
    //   "TOTAL TERPENES1.27 %"
    const thcMatch = text.match(/Δ-THC[:\s]+([0-9.]+)\s*%/i);
    const totalCannMatch = text.match(/TOTAL\s+CANNABINOIDS[:\s]+([0-9.]+)\s*%/i);
    const cbdMatch = text.match(/CBD[:\s]+([0-9.]+)\s*%/i);
    const totalTerpMatch = text.match(/TOTAL\s+TERPENES[:\s]*([0-9.]+)\s*%/i);
    const thcPercent = thcMatch ? parseFloat(thcMatch[1]) : undefined;
    const totalCannabinoidsPercent = totalCannMatch ? parseFloat(totalCannMatch[1]) : undefined;
    const cbdPercent = cbdMatch ? parseFloat(cbdMatch[1]) : undefined;
    const totalTerpenesPercent = totalTerpMatch ? parseFloat(totalTerpMatch[1]) : undefined;
    // --- Safety flags ---
    // In the example we saw:
    //   "PESTICIDESFAIL"
    //   "MICROBIALFAIL"
    //   "METALSPASS"
    //   "MYCOTOXINSPASS"
    const pesticidesPass = parsePassFailFlag(text, 'PESTICIDES');
    const microbialsPass = parsePassFailFlag(text, 'MICROBIAL');
    const heavyMetalsPass = parsePassFailFlag(text, 'METALS');
    const solventsPass = parsePassFailFlag(text, 'SOLVENTS');
    // --- Moisture / water activity (if we see them) ---
    // Example snippet:
    //   "MOISTURE9.000.0100/0.0100"
    //   "WATER ACTIVITY0.65 Aw..."
    let moisturePercent;
    const moistureMatch = text.match(/MOISTURE\s*([0-9.]+)\s*%/i);
    if (moistureMatch) {
        moisturePercent = parseFloat(moistureMatch[1]);
    }
    let waterActivity;
    const waterMatch = text.match(/WATER\s+ACTIVITY\s*([0-9.]+)\s*Aw/i);
    if (waterMatch) {
        waterActivity = parseFloat(waterMatch[1]);
    }
    // --- Very lightweight analyte summary for now ---
    const analytes = [];
    if (typeof thcPercent === 'number') {
        analytes.push({
            analyte: 'Δ-THC',
            percent: thcPercent
        });
    }
    if (typeof cbdPercent === 'number') {
        analytes.push({
            analyte: 'CBD',
            percent: cbdPercent
        });
    }
    if (typeof totalCannabinoidsPercent === 'number') {
        analytes.push({
            analyte: 'Total Cannabinoids',
            percent: totalCannabinoidsPercent
        });
    }
    if (typeof totalTerpenesPercent === 'number') {
        analytes.push({
            analyte: 'Total Terpenes',
            percent: totalTerpenesPercent
        });
    }
    // Nova is physically in Portland, ME – we can safely hard-code this
    // for now so the state map & lab drill-downs work out of the box.
    const labSlug = 'nova-analytic-labs';
    return {
        labSlug,
        labName: 'Nova Analytic Labs',
        labWebsite: 'https://testnovalabs.com',
        labCity: 'Portland',
        labStateCode: 'ME',
        batchCode,
        productName,
        sampleType,
        jurisdiction: 'ME',
        batchStateCode: 'ME',
        producedAt,
        testedAt,
        reportedAt: producedAt,
        thcPercent,
        cbdPercent,
        totalCannabinoidsPercent,
        totalTerpenesPercent,
        pesticidesPass,
        microbialsPass,
        heavyMetalsPass,
        solventsPass,
        moisturePercent,
        waterActivity,
        analyteSummary: analytes.length ? {
            analytes
        } : undefined
    };
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
// Multer: keep file in memory; we decide where/how to write it.
const upload = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$multer__$5b$external$5d$__$28$multer$2c$__cjs$29$__["default"])({
    storage: __TURBOPACK__imported__module__$5b$externals$5d2f$multer__$5b$external$5d$__$28$multer$2c$__cjs$29$__["default"].memoryStorage()
});
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject)=>{
        fn(req, res, (result)=>{
            if (result instanceof Error) return reject(result);
            return resolve(result);
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
    if (!session || !session.user?.email) {
        res.status(401).json({
            error: 'Unauthorized'
        });
        return;
    }
    if (req.method === 'GET') {
        await handleGet(req, res);
        return;
    }
    if (req.method === 'POST') {
        await handlePost(req, res, session.user.email);
        return;
    }
    res.setHeader('Allow', [
        'GET',
        'POST'
    ]);
    res.status(405).end('Method Not Allowed');
}
// ---------- GET: list uploaded documents ----------
async function handleGet(req, res) {
    try {
        const docs = await prisma.uploadedDocument.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                fileName: true,
                mimeType: true,
                size: true,
                sha256: true,
                batchCode: true,
                labName: true,
                createdAt: true,
                verified: true,
                extractedText: true,
                labResult: {
                    select: {
                        id: true
                    }
                }
            }
        });
        res.json(docs);
    } catch (e) {
        console.error('Failed to list uploads', e);
        res.status(500).json({
            error: e?.message || 'Failed to list uploads'
        });
    }
}
// ---------- POST: upload + parse + wire up lab/batch/labResult ----------
async function handlePost(req, res, uploaderEmail) {
    try {
        // 1) Parse multipart form and grab the PDF
        await runMiddleware(req, res, upload.single('file'));
        const file = req.file;
        if (!file) {
            res.status(400).json({
                error: 'Missing PDF file field "file"'
            });
            return;
        }
        if (file.mimetype !== 'application/pdf') {
            res.status(400).json({
                error: 'Only PDF files are allowed.'
            });
            return;
        }
        // 2) Hash for dedupe
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
            // Already ingested – return the existing doc + labResult reference
            res.json({
                reused: true,
                document: existing,
                labResult: existing.labResult
            });
            return;
        }
        // 3) Persist PDF to disk under uploads/coas/<sha>.pdf
        const uploadDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'uploads', 'coas');
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(uploadDir, {
            recursive: true
        });
        const diskFileName = `${sha256}.pdf`;
        const absoluteFilePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(uploadDir, diskFileName);
        const relativeFilePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join('uploads', 'coas', diskFileName);
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(absoluteFilePath, file.buffer);
        // 4) Extract text with pdf-parse
        const parsedPdf = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$parse__$5b$external$5d$__$28$pdf$2d$parse$2c$__cjs$29$__["default"])(file.buffer);
        const extractedText = parsedPdf.text || '';
        // 5) Try to parse via lab-specific registry (Nova, etc.)
        const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$coaParsers$2f$registry$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["parseCoa"])(extractedText, file.originalname);
        // 6) Store UploadedDocument row
        const uploadedDoc = await prisma.uploadedDocument.create({
            data: {
                filePath: relativeFilePath,
                fileName: file.originalname,
                mimeType: file.mimetype,
                size: file.size,
                sha256,
                extractedText,
                labName: parsed?.labName || null,
                batchCode: parsed?.batchCode || null,
                uploader: uploaderEmail,
                verified: false
            }
        });
        // 7) If we didn't recognize the lab / batch, we stop here.
        if (!parsed || !parsed.batchCode) {
            res.json({
                reused: false,
                document: uploadedDoc,
                labResult: null,
                parsed: null
            });
            return;
        }
        // ---------- Upsert Lab (Nova) ----------
        let labRecord = null;
        if (parsed.labSlug) {
            labRecord = await prisma.lab.upsert({
                where: {
                    slug: parsed.labSlug
                },
                update: {
                    name: parsed.labName,
                    website: parsed.labWebsite || undefined,
                    city: parsed.labCity || undefined,
                    stateCode: parsed.labStateCode || undefined
                },
                create: {
                    slug: parsed.labSlug,
                    name: parsed.labName,
                    website: parsed.labWebsite || undefined,
                    city: parsed.labCity || undefined,
                    stateCode: parsed.labStateCode || undefined
                }
            });
        }
        // ---------- Find or create Batch ----------
        const batchStateCode = parsed.batchStateCode || parsed.jurisdiction || parsed.labStateCode || null;
        let batchRecord = await prisma.batch.findFirst({
            where: {
                batchCode: parsed.batchCode,
                ...batchStateCode ? {
                    stateCode: batchStateCode
                } : {}
            }
        });
        if (batchRecord) {
            batchRecord = await prisma.batch.update({
                where: {
                    id: batchRecord.id
                },
                data: {
                    productName: parsed.productName ?? batchRecord.productName,
                    primaryCategory: parsed.sampleType ?? batchRecord.primaryCategory,
                    jurisdiction: parsed.jurisdiction ?? batchRecord.jurisdiction,
                    stateCode: batchStateCode ?? batchRecord.stateCode
                }
            });
        } else {
            batchRecord = await prisma.batch.create({
                data: {
                    batchCode: parsed.batchCode,
                    productName: parsed.productName ?? null,
                    primaryCategory: parsed.sampleType ?? null,
                    jurisdiction: parsed.jurisdiction ?? batchStateCode ?? null,
                    stateCode: batchStateCode,
                    isActive: true
                }
            });
        }
        // ---------- Create LabResult linked to Batch + Lab + UploadedDocument ----------
        const labResult = await prisma.labResult.create({
            data: {
                batch: {
                    connect: {
                        id: batchRecord.id
                    }
                },
                lab: labRecord ? {
                    connect: {
                        id: labRecord.id
                    }
                } : undefined,
                uploadedDocument: {
                    connect: {
                        id: uploadedDoc.id
                    }
                },
                testedAt: parsed.testedAt ? new Date(parsed.testedAt) : undefined,
                reportedAt: parsed.reportedAt ? new Date(parsed.reportedAt) : undefined,
                thcPercent: typeof parsed.thcPercent === 'number' ? parsed.thcPercent : null,
                cbdPercent: typeof parsed.cbdPercent === 'number' ? parsed.cbdPercent : null,
                totalCannabinoidsPercent: typeof parsed.totalCannabinoidsPercent === 'number' ? parsed.totalCannabinoidsPercent : null,
                totalTerpenesPercent: typeof parsed.totalTerpenesPercent === 'number' ? parsed.totalTerpenesPercent : null,
                pesticidesPass: typeof parsed.pesticidesPass === 'boolean' ? parsed.pesticidesPass : null,
                solventsPass: typeof parsed.solventsPass === 'boolean' ? parsed.solventsPass : null,
                heavyMetalsPass: typeof parsed.heavyMetalsPass === 'boolean' ? parsed.heavyMetalsPass : null,
                microbialsPass: typeof parsed.microbialsPass === 'boolean' ? parsed.microbialsPass : null,
                moisturePercent: typeof parsed.moisturePercent === 'number' ? parsed.moisturePercent : null,
                waterActivity: typeof parsed.waterActivity === 'number' ? parsed.waterActivity : null,
                analyteSummary: parsed.analyteSummary ?? null,
                rawJson: null,
                sourcePdfUrl: parsed.sourceUrl ?? null
            }
        });
        res.json({
            reused: false,
            document: uploadedDoc,
            labResult,
            parsed
        });
    } catch (e) {
        console.error('Error handling upload', e);
        res.status(500).json({
            error: e?.message || 'Failed to handle COA upload'
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ea746c81._.js.map