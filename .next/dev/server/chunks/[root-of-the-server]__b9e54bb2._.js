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
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[externals]/multer [external] (multer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("multer", () => require("multer"));

module.exports = mod;
}),
"[externals]/pdf-parse [external] (pdf-parse, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("pdf-parse", () => require("pdf-parse"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/pages/api/admin/uploads/[id].ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$next__$5b$external$5d$__$28$next$2d$auth$2f$next$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next-auth/next [external] (next-auth/next, cjs)");
(()=>{
    const e = new Error("Cannot find module '../auth/[...nextauth]'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$multer__$5b$external$5d$__$28$multer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/multer [external] (multer, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$parse__$5b$external$5d$__$28$pdf$2d$parse$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/pdf-parse [external] (pdf-parse, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
;
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
// Use in-memory storage for uploaded files
const upload = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$multer__$5b$external$5d$__$28$multer$2c$__cjs$29$__["default"])({
    storage: __TURBOPACK__imported__module__$5b$externals$5d2f$multer__$5b$external$5d$__$28$multer$2c$__cjs$29$__["default"].memoryStorage()
});
// Helper to run multer as a promise
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject)=>{
        fn(req, res, (result)=>{
            if (result instanceof Error) return reject(result);
            return resolve(result);
        });
    });
}
async function handler(req, res) {
    const session = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$next__$5b$external$5d$__$28$next$2d$auth$2f$next$2c$__cjs$29$__["getServerSession"])(req, res, authOptions);
    if (!session) {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }
    if (req.method === 'GET') {
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
                    // Don’t send extractedText in the list view for performance
                    labResult: {
                        select: {
                            id: true
                        }
                    }
                }
            });
            return res.json(docs);
        } catch (e) {
            console.error('Error listing uploads', e);
            return res.status(500).json({
                error: e?.message || 'Failed to list uploads'
            });
        }
    }
    if (req.method === 'POST') {
        try {
            // Parse multipart/form-data with multer
            await runMiddleware(req, res, upload.single('file'));
            const file = req.file;
            if (!file) {
                return res.status(400).json({
                    error: 'No file uploaded'
                });
            }
            if (file.mimetype !== 'application/pdf') {
                return res.status(400).json({
                    error: 'Only PDF files are allowed'
                });
            }
            // Compute hash for dedupe
            const hash = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash('sha256').update(file.buffer).digest('hex');
            // Check for existing upload with same hash
            const existing = await prisma.uploadedDocument.findUnique({
                where: {
                    sha256: hash
                },
                include: {
                    labResult: true
                }
            });
            if (existing) {
                return res.json({
                    reused: true,
                    document: existing,
                    labResult: existing.labResult || null
                });
            }
            // Extract text from PDF
            let extractedText = null;
            try {
                const parsed = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$parse__$5b$external$5d$__$28$pdf$2d$parse$2c$__cjs$29$__["default"])(file.buffer);
                const raw = (parsed.text || '').trim();
                extractedText = raw.length > 0 ? raw : null;
            } catch (e) {
                console.error('Failed to parse PDF text', e);
                extractedText = null;
            }
            // Very light heuristics: try to detect batch code and lab name
            let detectedBatchCode = null;
            let detectedLabName = null;
            if (extractedText) {
                // Example: lines that start with "BATCH:" or "BATCH"
                const lines = extractedText.split(/\r?\n/).map((l)=>l.trim());
                for (const line of lines){
                    if (!detectedBatchCode) {
                        const m = line.match(/^(batch|lot|metrc id)\s*[:#-]?\s*(.+)$/i) || line.match(/batch\s*[:#-]\s*([A-Za-z0-9\-_.]+)/i);
                        if (m) {
                            detectedBatchCode = (m[2] || m[1] || '').trim();
                        }
                    }
                    if (!detectedLabName) {
                        // Very rough: look for "LABS" / "LABORATORY" / "ANALYTIC LABS"
                        if (/labs?|laborator(y|ies)/i.test(line) && line.length <= 80 && !/limit|result|analysis/i.test(line)) {
                            detectedLabName = line;
                        }
                    }
                    if (detectedBatchCode && detectedLabName) break;
                }
            }
            // Create the UploadedDocument row with extracted text
            const document = await prisma.uploadedDocument.create({
                data: {
                    fileName: file.originalname,
                    mimeType: file.mimetype,
                    size: file.size,
                    sha256: hash,
                    batchCode: detectedBatchCode,
                    labName: detectedLabName,
                    extractedText,
                    verified: false
                }
            });
            // Optionally: create a LabResult shell and try to pull potency
            // from the extracted text. (Keeps your “lab result #X” UI working.)
            let labResult = null;
            if (extractedText) {
                // quick-and-dirty THC / CBD / total regexes
                const thcMatch = extractedText.match(/THC\s*[:=]\s*([0-9]+(?:\.[0-9]+)?)\s*%/i) || extractedText.match(/Δ-?9?-?THC\s*[:=]\s*([0-9]+(?:\.[0-9]+)?)\s*%/i);
                const cbdMatch = extractedText.match(/CBD\s*[:=]\s*([0-9]+(?:\.[0-9]+)?)\s*%/i);
                const totalMatch = extractedText.match(/TOTAL CANNABINOIDS?\s*[:=]\s*([0-9]+(?:\.[0-9]+)?)\s*%/i) || extractedText.match(/TOTAL THC\s*[:=]\s*([0-9]+(?:\.[0-9]+)?)\s*%/i);
                const thcPercent = thcMatch ? parseFloat(thcMatch[1]) : null;
                const cbdPercent = cbdMatch ? parseFloat(cbdMatch[1]) : null;
                const totalCannabinoidsPercent = totalMatch ? parseFloat(totalMatch[1]) : null;
                labResult = await prisma.labResult.create({
                    data: {
                        uploadedDocument: {
                            connect: {
                                id: document.id
                            }
                        },
                        thcPercent,
                        cbdPercent,
                        totalCannabinoidsPercent
                    }
                });
            }
            return res.json({
                reused: false,
                document,
                labResult
            });
        } catch (e) {
            console.error('Error handling upload', e);
            return res.status(500).json({
                error: e?.message || 'Failed to upload COA'
            });
        }
    }
    return res.status(405).json({
        error: 'Method not allowed'
    });
}
const config = {
    api: {
        bodyParser: false
    }
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b9e54bb2._.js.map