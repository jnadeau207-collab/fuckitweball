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
"[project]/lib/coaParser.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/coaParser.ts
__turbopack_context__.s([
    "parseCoaText",
    ()=>parseCoaText
]);
/**
 * Utility: normalize line endings and compress multiple spaces
 */ function normalizeText(input) {
    return input.replace(/\r\n/g, '\n');
}
/**
 * Utility: extract first match group as string or null
 */ function matchGroup(text, regex, groupIndex = 1) {
    const m = text.match(regex);
    if (!m || !m[groupIndex]) return null;
    return m[groupIndex].trim();
}
/**
 * Utility: extract number from a matched group like "28.5 %"
 */ function matchNumber(text, regex, groupIndex = 1) {
    const s = matchGroup(text, regex, groupIndex);
    if (!s) return null;
    const cleaned = s.replace(/[^\d.\-]/g, '');
    const n = Number(cleaned);
    return Number.isNaN(n) ? null : n;
}
/**
 * Utility: slice text between two markers (best effort)
 */ function sliceBetween(text, startMarker, endMarkers) {
    const lower = text.toLowerCase();
    const startIdx = lower.indexOf(startMarker.toLowerCase());
    if (startIdx === -1) return undefined;
    let endIdx = text.length;
    for (const end of endMarkers){
        const idx = lower.indexOf(end.toLowerCase(), startIdx + startMarker.length);
        if (idx !== -1 && idx < endIdx) {
            endIdx = idx;
        }
    }
    return text.slice(startIdx, endIdx).trim();
}
/**
 * Scan the whole text for FAIL lines and try to infer category + analyte name.
 */ function detectFailures(text) {
    const lines = text.split('\n').map((l)=>l.trim()).filter(Boolean);
    const failures = [];
    for (const line of lines){
        if (!/FAIL\b/i.test(line)) continue;
        // crude heuristics to guess category by context keywords
        let category = 'Unknown';
        const lower = line.toLowerCase();
        if (lower.includes('mycotoxin')) category = 'Mycotoxins';
        else if (lower.includes('yeast') || lower.includes('mold') || lower.includes('bacteria') || lower.includes('salmonella') || lower.includes('coli') || lower.includes('enterobacter')) {
            category = 'Microbials';
        } else if (lower.includes('pesticide') || lower.includes('fungicide') || lower.includes('insecticide') || lower.includes('growth regulator') || lower.includes('μg/kg')) {
            category = 'Pesticides';
        } else if (lower.includes('arsenic') || lower.includes('cadmium') || lower.includes('lead') || lower.includes('mercury')) {
            category = 'Heavy metals';
        } else if (lower.includes('butane') || lower.includes('propane') || lower.includes('solvent')) {
            category = 'Solvents';
        } else if (lower.includes('hop latent viroid') || lower.includes('virus')) {
            category = 'Viral / plant health';
        }
        // analyte is usually at the start of the line until a double-space or number chunk
        const analyteMatch = line.match(/^([A-Z0-9\-\.\s]+?)(\d|<|N|P|F|μ|µ|$)/i);
        const analyte = analyteMatch ? analyteMatch[1].trim() : 'Unknown analyte';
        failures.push({
            analyte,
            category,
            line
        });
    }
    return failures;
}
function parseCoaText(raw) {
    const text = normalizeText(raw);
    // Top-level summary values
    const batchCode = matchGroup(text, /BATCH:\s*([A-Za-z0-9\-\._]+)/i) ?? matchGroup(text, /BATCH ID:\s*([A-Za-z0-9\-\._]+)/i) ?? null;
    const productName = matchGroup(text, /COA EXAMPLE.*\(([^)]+)\)/i) ?? matchGroup(text, /COA .*?FOR\s+([^\/\n]+)\//i) ?? null;
    const labName = matchGroup(text, /([A-Z][A-Z0-9\s]+LABS)\b/) ?? matchGroup(text, /CLIENT:\s*([A-Z0-9\s\-]+)\s*\/\//i) ?? null;
    const matrix = matchGroup(text, /MATRIX:\s*([A-Z0-9 ]+)/i) ?? null;
    const sampleId = matchGroup(text, /SAMPLE ID:\s*([A-Za-z0-9\-]+)/i) ?? null;
    const collectedOn = matchGroup(text, /COLLECTED ON:\s*([A-Za-z]{3}\s+\d{1,2},\s+\d{4})/i) ?? matchGroup(text, /COLLECTED ON:\s*([A-Za-z0-9 ,/]+)/i) ?? null;
    const receivedOn = matchGroup(text, /RECEIVED ON:\s*([A-Za-z]{3}\s+\d{1,2},\s+\d{4})/i) ?? matchGroup(text, /RECEIVED ON:\s*([A-Za-z0-9 ,/]+)/i) ?? null;
    const batchSizeGrams = matchNumber(text, /BATCH SIZE:\s*([0-9.,]+)\s*G/i) ?? null;
    const sampleSizeGrams = matchNumber(text, /SAMPLE SIZE:\s*([0-9.,]+)\s*G/i) ?? null;
    const thcPercent = matchNumber(text, /Δ-?THC:?\s*([0-9]+(?:\.[0-9]+)?)\s*%/i) ?? matchNumber(text, /TOTAL THC\s*([0-9]+(?:\.[0-9]+)?)\s*%/i) ?? null;
    const cbdPercent = matchNumber(text, /CBD:?\s*([0-9]+(?:\.[0-9]+)?)\s*%/i) ?? matchNumber(text, /TOTAL CBD\s*([0-9]+(?:\.[0-9]+)?)\s*%/i) ?? null;
    const totalCannabinoidsPercent = matchNumber(text, /TOTAL CANNABINOIDS:?\s*([0-9]+(?:\.[0-9]+)?)\s*%/i) ?? null;
    const totalTerpenesPercent = matchNumber(text, /TOTAL TERPENES\s*([0-9]+(?:\.[0-9]+)?)\s*%/i) ?? null;
    const moisturePercent = matchNumber(text, /MOISTURE\s*([0-9]+(?:\.[0-9]+)?)\s*%/i) ?? null;
    const waterActivity = matchNumber(text, /WATER ACTIVITY\s*([0-9]+(?:\.[0-9]+)?)\s*Aw/i) ?? null;
    const batchResultRaw = matchGroup(text, /BATCH RESULT:\s*(PASS|FAIL)/i) ?? null;
    const batchResult = batchResultRaw?.toUpperCase() === 'PASS' ? 'PASS' : batchResultRaw?.toUpperCase() === 'FAIL' ? 'FAIL' : 'UNKNOWN';
    const failures = detectFailures(text);
    const hasAnyFailure = batchResult === 'FAIL' || failures && failures.length > 0;
    // Raw sections to show in debug viewer
    const potencySection = sliceBetween(text, 'CAN.1: POTENCY', [
        'TERPENES BY',
        'RSOL.1',
        'RESIDUAL SOLVENTS'
    ]);
    const terpenesSection = sliceBetween(text, 'TERPENES BY', [
        'RSOL.1',
        'RESIDUAL SOLVENTS',
        'PST.2'
    ]);
    const pesticidesSection = sliceBetween(text, 'PST.2:', [
        'MYC.1:',
        'HME.1:',
        'HEAVY METALS'
    ]);
    const mycotoxinsSection = sliceBetween(text, 'MYC.1:', [
        'HME.1:',
        'HEAVY METALS',
        'FMT.1:'
    ]);
    const heavyMetalsSection = sliceBetween(text, 'HME.1:', [
        'FMT.1:',
        'FILTH AND FOREIGN',
        'MOISTURE CONTENT'
    ]);
    const solventsSection = sliceBetween(text, 'RSOL.1:', [
        'PST.2',
        'MYC.1'
    ]);
    const microbialsSection = sliceBetween(text, 'TOTAL YEAST AND MOLD', [
        'NOTES',
        'END OF REPORT'
    ]);
    const notesSection = sliceBetween(text, 'NOTES', [
        'END OF REPORT'
    ]);
    const summary = {
        batchCode,
        productName,
        labName,
        matrix,
        sampleId,
        collectedOn,
        receivedOn,
        batchSizeGrams,
        sampleSizeGrams,
        thcPercent,
        cbdPercent,
        totalCannabinoidsPercent,
        totalTerpenesPercent,
        moisturePercent,
        waterActivity,
        batchResult,
        hasAnyFailure,
        failureReasons: failures
    };
    return {
        summary,
        rawSections: {
            potency: potencySection,
            terpenes: terpenesSection,
            pesticides: pesticidesSection,
            microbials: microbialsSection,
            mycotoxins: mycotoxinsSection,
            heavyMetals: heavyMetalsSection,
            solvents: solventsSection,
            notes: notesSection
        }
    };
}
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/pdf-parse [external] (pdf-parse, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("pdf-parse", () => require("pdf-parse"));

module.exports = mod;
}),
"[project]/pages/api/admin/uploads/[id].ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/api/admin/uploads/[id].ts
__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$next__$5b$external$5d$__$28$next$2d$auth$2f$next$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next-auth/next [external] (next-auth/next, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auth$2f5b2e2e2e$nextauth$5d2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/auth/[...nextauth].ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$coaParser$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/coaParser.ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$parse__$5b$external$5d$__$28$pdf$2d$parse$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/pdf-parse [external] (pdf-parse, cjs)");
;
;
;
;
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
async function ensureExtractedText(doc) {
    // Try existing text fields first
    let rawText = doc.extractedText || doc.textContent || doc.rawText || '';
    if (rawText && rawText.trim().length > 0) {
        return rawText;
    }
    // No text yet – try to read from disk using a few possible field names
    const storagePath = doc.storagePath || doc.filePath || doc.localPath;
    if (!storagePath) {
        console.warn('UploadedDocument has no extracted text and no storagePath/filePath/localPath');
        return '';
    }
    try {
        // Make absolute if it isn't already
        const absPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].isAbsolute(storagePath) ? storagePath : __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), storagePath);
        const fileBuffer = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(absPath);
        const pdfData = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$parse__$5b$external$5d$__$28$pdf$2d$parse$2c$__cjs$29$__["default"])(fileBuffer);
        rawText = pdfData.text || '';
        // Persist for future calls if we got anything
        if (rawText && rawText.trim().length > 0) {
            await prisma.uploadedDocument.update({
                where: {
                    id: doc.id
                },
                data: {
                    extractedText: rawText
                }
            });
        }
        return rawText;
    } catch (e) {
        console.error('Failed to extract text from PDF file', e);
        return '';
    }
}
async function handler(req, res) {
    const session = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$next__$5b$external$5d$__$28$next$2d$auth$2f$next$2c$__cjs$29$__["getServerSession"])(req, res, __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auth$2f5b2e2e2e$nextauth$5d2e$ts__$5b$api$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session || session.user.role !== 'admin') {
        return res.status(403).json({
            error: 'forbidden'
        });
    }
    const { id } = req.query;
    const idNum = Number(id);
    if (!id || Number.isNaN(idNum)) {
        return res.status(400).json({
            error: 'invalid id'
        });
    }
    if (req.method === 'GET') {
        try {
            const doc = await prisma.uploadedDocument.findUnique({
                where: {
                    id: idNum
                },
                include: {
                    labResult: {
                        include: {
                            batch: true,
                            lab: true
                        }
                    }
                }
            });
            if (!doc) {
                return res.status(404).json({
                    error: 'not found'
                });
            }
            const anyDoc = doc;
            // ✅ Make sure we actually have text; extract from PDF if needed
            const rawText = await ensureExtractedText(anyDoc);
            const parseResult = rawText ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$coaParser$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["parseCoaText"])(rawText) : null;
            // Trim huge text for debug: keep first ~20k chars
            const rawTextPreview = rawText && rawText.length > 20000 ? rawText.slice(0, 20000) + '\n\n[truncated for display]' : rawText;
            return res.json({
                id: doc.id,
                fileName: doc.fileName,
                createdAt: doc.createdAt,
                mimeType: anyDoc.mimeType ?? null,
                sizeBytes: anyDoc.sizeBytes ?? null,
                labResult: doc.labResult,
                batch: doc.labResult?.batch ?? null,
                lab: doc.labResult?.lab ?? null,
                rawTextPreview,
                parseResult
            });
        } catch (e) {
            console.error('Failed to load upload debug info', e);
            return res.status(500).json({
                error: e?.message || 'Failed to load upload debug info'
            });
        }
    }
    if (req.method === 'DELETE') {
        try {
            const doc = await prisma.uploadedDocument.findUnique({
                where: {
                    id: idNum
                },
                select: {
                    id: true,
                    labResultId: true
                }
            });
            if (!doc) {
                return res.status(404).json({
                    error: 'not found'
                });
            }
            await prisma.$transaction(async (tx)=>{
                if (doc.labResultId) {
                    await tx.labResult.delete({
                        where: {
                            id: doc.labResultId
                        }
                    });
                }
                await tx.uploadedDocument.delete({
                    where: {
                        id: doc.id
                    }
                });
            });
            return res.json({
                ok: true
            });
        } catch (e) {
            console.error('Failed to delete upload / lab result', e);
            return res.status(500).json({
                error: e?.message || 'Failed to delete upload / lab result'
            });
        }
    }
    return res.status(405).end();
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f9f99bea._.js.map