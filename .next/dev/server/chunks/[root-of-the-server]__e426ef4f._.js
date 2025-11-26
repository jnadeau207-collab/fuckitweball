module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

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
"[project]/lib/parsers/nova.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isNovaLabsCoa",
    ()=>isNovaLabsCoa,
    "parseNovaLabsCoa",
    ()=>parseNovaLabsCoa
]);
function isNovaLabsCoa(text) {
    // Key identity markers for Nova Analytic Labs
    return /NOVA ANALYTIC LABS/i.test(text) || /nova-analyticlabs\.com/i.test(text) || /NOVA ANALYTIC LABS\s*\/\/\s*65 MILLIKEN STREET/i.test(text);
}
function matchNumber(re, text) {
    const m = text.match(re);
    if (!m || !m[1]) return null;
    const v = parseFloat(m[1].replace(',', ''));
    return Number.isNaN(v) ? null : v;
}
function parseNovaLabsCoa(text) {
    const labName = 'Nova Analytic Labs';
    // From line: CLIENT: NOVA - PT ACCOUNT // BATCH: FAIL
    const batchMatch = text.match(/BATCH:\s*([A-Za-z0-9\-]+)/i);
    const batchCode = batchMatch ? batchMatch[1].trim() : null;
    // Δ-THC or TOTAL THC
    const thcPercent = matchNumber(/Δ-THC[:\s]+(\d+(?:\.\d+)?)\s*%/i, text) ?? matchNumber(/TOTAL THC\s*([\d.]+)\s*%/i, text);
    // CBD often ND in this example; leave null unless a % is found
    const cbdPercent = matchNumber(/CBD[:\s]+(\d+(?:\.\d+)?)\s*%/i, text);
    // TOTAL CANNABINOIDS:29.1 %
    const totalCannabinoidsPercent = matchNumber(/TOTAL CANNABINOIDS[:\s]+([\d.]+)\s*%/i, text);
    // Moisture line: MOISTURE9.000.0100/0.0100N/A  => 9.00 %
    const moisturePercent = matchNumber(/MOISTURE\s*([\d.]+)\s*%?/i, text);
    // Water activity: WATER ACTIVITY0.65 Aw0.54...
    const waterActivity = matchNumber(/WATER ACTIVITY\s*([\d.]+)\s*Aw/i, text);
    // Summary flags at top: PESTICIDESFAIL, MICROBIALFAIL, METALSPASS
    const pesticidesFail = /PESTICIDESFAIL/i.test(text);
    const microbialsFail = /MICROBIALFAIL/i.test(text);
    const metalsPass = /METALSPASS/i.test(text);
    return {
        labName,
        batchCode,
        thcPercent,
        cbdPercent,
        totalCannabinoidsPercent,
        moisturePercent,
        waterActivity,
        pesticidesPass: pesticidesFail ? false : null,
        microbialsPass: microbialsFail ? false : null,
        heavyMetalsPass: metalsPass ? true : null
    };
}
}),
"[project]/lib/parsers/index.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseWithLabSpecificParsers",
    ()=>parseWithLabSpecificParsers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$parsers$2f$nova$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/parsers/nova.ts [api] (ecmascript)");
;
function parseWithLabSpecificParsers(text) {
    // Nova Analytic Labs
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$parsers$2f$nova$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["isNovaLabsCoa"])(text)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$parsers$2f$nova$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["parseNovaLabsCoa"])(text);
    }
    // future: more labs here
    return null;
}
}),
"[externals]/multer [external] (multer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("multer", () => require("multer"));

module.exports = mod;
}),
"[externals]/pdf-parse [external] (pdf-parse, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("pdf-parse", () => require("pdf-parse"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

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
"[project]/pages/api/admin/uploads.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$next__$5b$external$5d$__$28$next$2d$auth$2f$next$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next-auth/next [external] (next-auth/next, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auth$2f5b2e2e2e$nextauth$5d2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/auth/[...nextauth].ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$parsers$2f$index$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/parsers/index.ts [api] (ecmascript)");
// @ts-ignore - multer types are optional
var __TURBOPACK__imported__module__$5b$externals$5d2f$multer__$5b$external$5d$__$28$multer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/multer [external] (multer, cjs)");
// @ts-ignore - pdf-parse types are optional
var __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$parse__$5b$external$5d$__$28$pdf$2d$parse$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/pdf-parse [external] (pdf-parse, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
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
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
// -------------------- Auth helper --------------------
async function requireAdmin(req, res) {
    const session = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$next__$5b$external$5d$__$28$next$2d$auth$2f$next$2c$__cjs$29$__["getServerSession"])(req, res, __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auth$2f5b2e2e2e$nextauth$5d2e$ts__$5b$api$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session || session.user.role !== 'admin') {
        res.status(403).json({
            error: 'forbidden'
        });
        return null;
    }
    return session;
}
// -------------------- Multer setup --------------------
const uploadDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'uploads', 'coa');
if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(uploadDir)) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(uploadDir, {
        recursive: true
    });
}
const storage = __TURBOPACK__imported__module__$5b$externals$5d2f$multer__$5b$external$5d$__$28$multer$2c$__cjs$29$__["default"].diskStorage({
    destination: (_req, _file, cb)=>{
        cb(null, uploadDir);
    },
    filename: (_req, file, cb)=>{
        const timestamp = Date.now();
        const safeName = file.originalname.replace(/[^\w\-.]+/g, '_');
        cb(null, `${timestamp}-${safeName}`);
    }
});
const upload = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$multer__$5b$external$5d$__$28$multer$2c$__cjs$29$__["default"])({
    storage,
    fileFilter: (_req, file, cb)=>{
        if (file.mimetype !== 'application/pdf') {
            return cb(new Error('Only PDF files are allowed'));
        }
        cb(null, true);
    }
});
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject)=>{
        fn(req, res, (result)=>{
            if (result instanceof Error) return reject(result);
            return resolve(result);
        });
    });
}
function extractBatchCode(text) {
    const patterns = [
        // Batch / Lot style labels
        /Batch(?:\s*(?:ID|Number|No\.?)?)?\s*[:#]\s*([A-Za-z0-9\-]+)/i,
        /Lot(?:\s*(?:ID|Number|No\.?)?)?\s*[:#]\s*([A-Za-z0-9\-]+)/i,
        // METRC / Package tags that look like 1A4000XXXXXXX
        /(METRC|Package|Tag)\s*(?:ID|Number|No\.?)?\s*[:#]?\s*([A-Z0-9\-]{6,})/i,
        // “Batch … XXXXXX” style
        /Batch\s+([A-Za-z0-9\-]{4,})/i,
        /Lot\s+([A-Za-z0-9\-]{4,})/i
    ];
    for (const p of patterns){
        const m = text.match(p);
        if (m) {
            const candidate = m[2] || m[1];
            if (candidate) return candidate.trim();
        }
    }
    // Fallback heuristic: find a line containing "Batch" or "Lot" and grab a code-like token
    const lines = text.split(/\r?\n/);
    for (const line of lines){
        if (/Batch|Lot|METRC|Package/i.test(line)) {
            const tokens = line.split(/[\s,]+/);
            for (const t of tokens){
                if (/[A-Za-z0-9]/.test(t) && t.replace(/[^A-Za-z0-9]/g, '').length >= 4) {
                    return t.replace(/[^\w\-]/g, '');
                }
            }
        }
    }
    return null;
}
function parseCoaSummary(text) {
    const batchCode = extractBatchCode(text);
    const labName = extractLabName(text);
    // Basic THC / CBD / Total detection
    let thcPercent = extractPercent(/THC[^%\n\r]*?(\d+(?:\.\d+)?)\s*%/i, text) ?? null;
    let cbdPercent = extractPercent(/CBD[^%\n\r]*?(\d+(?:\.\d+)?)\s*%/i, text) ?? null;
    let totalCannabinoidsPercent = extractPercent(/(Total\s+(?:Cannabinoids|Active Cannabinoids)[^%\n\r]*?)(\d+(?:\.\d+)?)\s*%/i, text) ?? null;
    // If totalCannabinoids isn't explicit, approximate as THC + CBD when both are present
    if (totalCannabinoidsPercent == null && thcPercent != null && cbdPercent != null) {
        totalCannabinoidsPercent = thcPercent + cbdPercent;
    }
    return {
        batchCode,
        labName,
        thcPercent,
        cbdPercent,
        totalCannabinoidsPercent
    };
}
function extractLabName(text) {
    // Very naive: take the first non-empty line; many labs put their name at top
    const lines = text.split(/\r?\n/).map((l)=>l.trim()).filter(Boolean);
    if (lines.length === 0) return null;
    const first = lines[0];
    if (first.length > 3 && first.length < 120) return first;
    return null;
}
function extractPercent(label, text) {
    const m = text.match(label);
    if (!m) return null;
    const numStr = m[1];
    const val = parseFloat(numStr);
    if (Number.isNaN(val)) return null;
    return val;
}
async function hashFile(filePath) {
    const hash = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash('sha256');
    const stream = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].createReadStream(filePath);
    return new Promise((resolve, reject)=>{
        stream.on('data', (data)=>hash.update(data));
        stream.on('end', ()=>resolve(hash.digest('hex')));
        stream.on('error', (err)=>reject(err));
    });
}
async function handler(req, res) {
    const session = await requireAdmin(req, res);
    if (!session) return;
    if (req.method === 'GET') {
        const docs = await prisma.uploadedDocument.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                labResult: true
            }
        });
        return res.json(docs);
    }
    if (req.method === 'POST') {
        try {
            await runMiddleware(req, res, upload.single('file'));
            const file = req.file;
            if (!file) {
                return res.status(400).json({
                    error: 'No file uploaded'
                });
            }
            // Compute SHA-256
            const sha256 = await hashFile(file.path);
            // If we already saw this file, reuse DB record
            const existing = await prisma.uploadedDocument.findUnique({
                where: {
                    sha256
                },
                include: {
                    labResult: true
                }
            });
            if (existing) {
                // Clean up duplicate on disk
                try {
                    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].unlinkSync(file.path);
                } catch (_) {
                // ignore
                }
                return res.json({
                    reused: true,
                    document: existing
                });
            }
            // Extract text from PDF
            const dataBuffer = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(file.path);
            const pdfData = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$parse__$5b$external$5d$__$28$pdf$2d$parse$2c$__cjs$29$__["default"])(dataBuffer);
            const text = pdfData.text || '';
            // 1) Try lab-specific parser first
            const labParsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$parsers$2f$index$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["parseWithLabSpecificParsers"])(text);
            // 2) Fallback to generic parser
            const genericParsed = parseCoaSummary(text);
            const effective = {
                batchCode: labParsed?.batchCode ?? genericParsed.batchCode ?? null,
                labName: labParsed?.labName ?? genericParsed.labName ?? null,
                thcPercent: labParsed?.thcPercent ?? genericParsed.thcPercent ?? null,
                cbdPercent: labParsed?.cbdPercent ?? genericParsed.cbdPercent ?? null,
                totalCannabinoidsPercent: labParsed?.totalCannabinoidsPercent ?? genericParsed.totalCannabinoidsPercent ?? null,
                moisturePercent: labParsed?.moisturePercent ?? null,
                waterActivity: labParsed?.waterActivity ?? null,
                pesticidesPass: labParsed?.pesticidesPass ?? null,
                microbialsPass: labParsed?.microbialsPass ?? null,
                heavyMetalsPass: labParsed?.heavyMetalsPass ?? null
            };
            // Store relative file path so it's portable
            const relativePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].relative(process.cwd(), file.path);
            // Create UploadedDocument
            const uploaderEmail = session.user?.email || session.user?.name || null;
            const uploadedDoc = await prisma.uploadedDocument.create({
                data: {
                    filePath: relativePath,
                    fileName: file.originalname,
                    mimeType: file.mimetype,
                    size: file.size,
                    sha256,
                    extractedText: text,
                    labName: effective.labName,
                    batchCode: effective.batchCode,
                    uploader: uploaderEmail,
                    verified: false
                }
            });
            // Optionally: auto-create Batch + LabResult if we detected a batch code
            let createdLabResult = null;
            if (effective.batchCode) {
                // Find or create a Batch by batchCode (very basic for now)
                const existingBatch = await prisma.batch.findFirst({
                    where: {
                        batchCode: effective.batchCode
                    }
                });
                const batch = existingBatch || await prisma.batch.create({
                    data: {
                        batchCode: effective.batchCode,
                        isActive: true
                    }
                });
                createdLabResult = await prisma.labResult.create({
                    data: {
                        batchId: batch.id,
                        labId: null,
                        testedAt: null,
                        reportedAt: null,
                        thcPercent: effective.thcPercent,
                        cbdPercent: effective.cbdPercent,
                        totalCannabinoidsPercent: effective.totalCannabinoidsPercent,
                        passed: null,
                        pesticidesPass: effective.pesticidesPass,
                        solventsPass: null,
                        heavyMetalsPass: effective.heavyMetalsPass,
                        microbialsPass: effective.microbialsPass,
                        moisturePercent: effective.moisturePercent,
                        waterActivity: effective.waterActivity,
                        analyteSummary: null,
                        rawJson: null,
                        sourcePdfUrl: null,
                        uploadedDocumentId: uploadedDoc.id
                    }
                });
            }
            return res.json({
                reused: false,
                document: uploadedDoc,
                labResult: createdLabResult
            });
        } catch (err) {
            console.error('COA upload error', err);
            return res.status(500).json({
                error: err?.message || 'Upload failed'
            });
        }
    }
    res.status(405).end();
}
const config = {
    api: {
        bodyParser: false
    }
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e426ef4f._.js.map