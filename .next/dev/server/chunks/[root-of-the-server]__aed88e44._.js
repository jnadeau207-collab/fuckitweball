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
;
;
;
;
;
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
// Use memory storage; we handle writing to disk ourselves
const upload = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$multer__$5b$external$5d$__$28$multer$2c$__cjs$29$__["default"])({
    storage: __TURBOPACK__imported__module__$5b$externals$5d2f$multer__$5b$external$5d$__$28$multer$2c$__cjs$29$__["default"].memoryStorage()
});
const config = {
    api: {
        bodyParser: false
    }
};
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject)=>{
        fn(req, res, (result)=>{
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve();
        });
    });
}
function normalizeText(text) {
    if (!text) return '';
    return text.replace(/\r\n/g, '\n').replace(/\u0000/g, '').trim();
}
function isBadBatchCode(code) {
    if (!code) return true;
    const trimmed = code.trim();
    if (!trimmed) return true;
    // Avoid "PASS", "PASSED", "FAIL", "FAILED" as batch codes
    return /^(PASS(ED)?|FAIL(ED)?)$/i.test(trimmed);
}
function slugifyLabName(name) {
    const base = name.toLowerCase().replace(/labs?$/i, '') // strip trailing "Lab" / "Labs"
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return base || 'lab-' + __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(4).toString('hex');
}
/**
 * Heuristic parser specifically for Nova Analytic Labs (TagLeaf COAs)
 */ function parseNovaAnalyticLabs(text) {
    const normalized = normalizeText(text);
    if (!/nova analytic labs/i.test(normalized)) {
        return null;
    }
    let labName = 'Nova Analytic Labs';
    let batchCode = null;
    let sampleId = null;
    let sampleType = null;
    let thcPercent = null;
    let cbdPercent = null;
    let totalCannabinoidsPercent = null;
    let passed = null;
    // SAMPLE ID
    const sampleMatch = normalized.match(/SAMPLE\s+ID\s*:\s*([A-Z0-9-]+)/i) || normalized.match(/SAMPLE\s+ID:\s*([A-Z0-9-]+)/i);
    if (sampleMatch) {
        sampleId = sampleMatch[1].trim();
    }
    // MATRIX (sample type)
    const matrixMatch = normalized.match(/MATRIX\s*:\s*([A-Z ]+)/i);
    if (matrixMatch) {
        sampleType = matrixMatch[1].trim();
    }
    // BATCH RESULT PASS / FAIL
    const resultMatch = normalized.match(/BATCH\s+RESULT\s*:\s*(PASS(?:ED)?|FAIL(?:ED)?)/i);
    if (resultMatch) {
        passed = /^PASS/i.test(resultMatch[1]);
    }
    // BATCH CODE – avoid PASS/FAIL
    const batchMatch = normalized.match(/BATCH\s+NO\.\s*:\s*([A-Z0-9-]+)/i) || normalized.match(/BATCH\s*:\s*([A-Z0-9-]+)/i);
    if (batchMatch) {
        const candidate = batchMatch[1].trim();
        if (!isBadBatchCode(candidate)) {
            batchCode = candidate;
        }
    }
    // Older Nova flower COAs: "Δ-THC:28.5 %" and "TOTAL CANNABINOIDS:29.1 %"
    const thcMatch = normalized.match(/Δ-THC\s*:?\s*([0-9.]+)\s*%/i);
    if (thcMatch) {
        thcPercent = parseFloat(thcMatch[1]);
    }
    const cbdMatch = normalized.match(/\bCBD\s*:?\s*([0-9.]+)\s*%/i);
    if (cbdMatch) {
        cbdPercent = parseFloat(cbdMatch[1]);
    }
    const totalMatch = normalized.match(/TOTAL\s+CANNABINOIDS\s*:?\s*([0-9.]+)\s*%/i);
    if (totalMatch) {
        totalCannabinoidsPercent = parseFloat(totalMatch[1]);
    }
    // Nova is Maine in our dataset
    const stateCode = 'ME';
    const jurisdiction = 'ME';
    return {
        labName,
        batchCode,
        sampleId,
        sampleType,
        thcPercent,
        cbdPercent,
        totalCannabinoidsPercent,
        passed,
        stateCode,
        jurisdiction
    };
}
/**
 * Generic fallback parser for arbitrary labs.
 */ function basicHeuristicParse(text) {
    const normalized = normalizeText(text);
    let labName = null;
    let batchCode = null;
    let sampleId = null;
    let sampleType = null;
    let thcPercent = null;
    let cbdPercent = null;
    let totalCannabinoidsPercent = null;
    let passed = null;
    let stateCode = null;
    let jurisdiction = null;
    // Generic lab name heuristic
    const labMatch = normalized.match(/([A-Z][A-Za-z0-9 &]+Labs?)/);
    if (labMatch) {
        labName = labMatch[1].trim();
    }
    // Generic batch code
    const batchMatch = normalized.match(/BATCH\s+NO\.\s*:\s*([A-Z0-9-]+)/i) || normalized.match(/BATCH\s*:\s*([A-Z0-9-]+)/i);
    if (batchMatch) {
        const candidate = batchMatch[1].trim();
        if (!isBadBatchCode(candidate)) {
            batchCode = candidate;
        }
    }
    // Sample id
    const sampleMatch = normalized.match(/SAMPLE\s+ID\s*:\s*([A-Z0-9-]+)/i);
    if (sampleMatch) {
        sampleId = sampleMatch[1].trim();
    }
    // Matrix / sample type
    const matrixMatch = normalized.match(/MATRIX\s*:\s*([A-Z ]+)/i);
    if (matrixMatch) {
        sampleType = matrixMatch[1].trim();
    }
    // Pass/fail
    const resultMatch = normalized.match(/BATCH\s+RESULT\s*:\s*(PASS(?:ED)?|FAIL(?:ED)?)/i);
    if (resultMatch) {
        passed = /^PASS/i.test(resultMatch[1]);
    }
    // Potency (generic)
    const thcMatch = normalized.match(/THC\s*:?\s*([0-9.]+)\s*%/i);
    if (thcMatch) {
        thcPercent = parseFloat(thcMatch[1]);
    }
    const cbdMatch = normalized.match(/\bCBD\s*:?\s*([0-9.]+)\s*%/i);
    if (cbdMatch) {
        cbdPercent = parseFloat(cbdMatch[1]);
    }
    const totalMatch = normalized.match(/TOTAL\s+CANNABINOIDS\s*:?\s*([0-9.]+)\s*%/i);
    if (totalMatch) {
        totalCannabinoidsPercent = parseFloat(totalMatch[1]);
    }
    // Naive state inference
    if (/\bME\s+\d{5}\b/i.test(normalized)) {
        stateCode = 'ME';
        jurisdiction = 'ME';
    }
    return {
        labName,
        batchCode,
        sampleId,
        sampleType,
        thcPercent,
        cbdPercent,
        totalCannabinoidsPercent,
        passed,
        stateCode,
        jurisdiction
    };
}
async function handler(req, res) {
    const session = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$next__$5b$external$5d$__$28$next$2d$auth$2f$next$2c$__cjs$29$__["getServerSession"])(req, res, __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auth$2f5b2e2e2e$nextauth$5d2e$ts__$5b$api$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session || !session.user || session.user.role !== 'admin') {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }
    // -------- GET: list uploaded COAs --------
    if (req.method === 'GET') {
        const docs = await prisma.uploadedDocument.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                labResult: true
            }
        });
        return res.status(200).json(docs);
    }
    // -------- POST: upload + parse COA --------
    if (req.method === 'POST') {
        try {
            await runMiddleware(req, res, upload.single('file'));
            const anyReq = req;
            const file = anyReq.file;
            if (!file) {
                return res.status(400).json({
                    error: 'No file uploaded'
                });
            }
            if (file.mimetype !== 'application/pdf') {
                return res.status(400).json({
                    error: 'Only application/pdf files are supported'
                });
            }
            // Hash and dedupe
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
                return res.status(200).json({
                    reused: true,
                    document: existing,
                    labResult: existing.labResult
                });
            }
            // Persist to disk
            const uploadsDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'uploads', 'coas');
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(uploadsDir, {
                recursive: true
            });
            const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(uploadsDir, `${sha256}.pdf`);
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(filePath, file.buffer);
            // Extract text via pdf-parse
            let extractedText = '';
            try {
                const parsed = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$parse__$5b$external$5d$__$28$pdf$2d$parse$2c$__cjs$29$__["default"])(file.buffer);
                extractedText = normalizeText(parsed.text);
            } catch (err) {
                console.error('pdf-parse failed, continuing with empty text', err);
                extractedText = '';
            }
            // --- Parse metadata (Nova first, then generic fallback) ---
            let meta = {
                labName: null,
                batchCode: null,
                sampleId: null,
                sampleType: null,
                thcPercent: null,
                cbdPercent: null,
                totalCannabinoidsPercent: null,
                passed: null,
                stateCode: null,
                jurisdiction: null
            };
            const nova = parseNovaAnalyticLabs(extractedText);
            if (nova) {
                meta = nova;
            } else {
                meta = basicHeuristicParse(extractedText);
            }
            // --- Create UploadedDocument row ---
            const document = await prisma.uploadedDocument.create({
                data: {
                    filePath,
                    fileName: file.originalname,
                    mimeType: file.mimetype,
                    size: file.size,
                    sha256,
                    extractedText: extractedText || null,
                    labName: meta.labName,
                    batchCode: meta.batchCode,
                    uploader: session.user.email || session.user.name || 'unknown'
                }
            });
            // --- Upsert Lab (if we have a lab name) ---
            let labRecord = null;
            if (meta.labName) {
                const slug = slugifyLabName(meta.labName);
                labRecord = await prisma.lab.upsert({
                    where: {
                        slug
                    },
                    update: {
                        name: meta.labName,
                        stateCode: meta.stateCode ?? undefined,
                        city: meta.stateCode === 'ME' ? 'Portland' : undefined
                    },
                    create: {
                        name: meta.labName,
                        slug,
                        stateCode: meta.stateCode ?? undefined,
                        city: meta.stateCode === 'ME' ? 'Portland' : undefined
                    }
                });
            }
            // --- Create/find Batch (if we have a batch code) ---
            let batchRecord = null;
            if (meta.batchCode) {
                batchRecord = await prisma.batch.findFirst({
                    where: {
                        batchCode: meta.batchCode
                    }
                });
                if (!batchRecord) {
                    batchRecord = await prisma.batch.create({
                        data: {
                            batchCode: meta.batchCode,
                            jurisdiction: meta.jurisdiction,
                            stateCode: meta.stateCode ?? meta.jurisdiction,
                            isActive: true
                        }
                    });
                }
            }
            // --- Create LabResult ONLY if we have a Batch ---
            let labResult = null;
            if (batchRecord) {
                const labConnect = labRecord != null ? {
                    lab: {
                        connect: {
                            id: labRecord.id
                        }
                    }
                } : {};
                labResult = await prisma.labResult.create({
                    data: {
                        batch: {
                            connect: {
                                id: batchRecord.id
                            }
                        },
                        ...labConnect,
                        uploadedDocument: {
                            connect: {
                                id: document.id
                            }
                        },
                        sampleId: meta.sampleId,
                        sampleType: meta.sampleType,
                        thcPercent: meta.thcPercent,
                        cbdPercent: meta.cbdPercent,
                        totalCannabinoidsPercent: meta.totalCannabinoidsPercent,
                        passed: meta.passed
                    }
                });
            }
            return res.status(200).json({
                reused: false,
                document: {
                    ...document,
                    labResult
                },
                labResult
            });
        } catch (err) {
            console.error('Error handling upload', err);
            return res.status(500).json({
                error: err?.message || 'Failed to handle upload'
            });
        }
    }
    // Unsupported method
    return res.status(405).end();
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__aed88e44._.js.map