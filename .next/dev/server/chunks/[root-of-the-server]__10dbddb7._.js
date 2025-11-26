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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/pages/api/admin/uploads/index.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
    const session = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$next__$5b$external$5d$__$28$next$2d$auth$2f$next$2c$__cjs$29$__["getServerSession"])(req, res, __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auth$2f5b2e2e2e$nextauth$5d2e$ts__$5b$api$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session) {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }
    // GET: list uploads (no extractedText in list view)
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
    // POST: upload + parse PDF
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
            // Tiny heuristics for batch code & lab name
            let detectedBatchCode = null;
            let detectedLabName = null;
            if (extractedText) {
                const lines = extractedText.split(/\r?\n/).map((l)=>l.trim());
                for (const line of lines){
                    if (!detectedBatchCode) {
                        const m = line.match(/^(batch|lot|metrc id)\s*[:#-]?\s*(.+)$/i) || line.match(/batch\s*[:#-]\s*([A-Za-z0-9\-_.]+)/i);
                        if (m) {
                            detectedBatchCode = (m[2] || m[1] || '').trim();
                        }
                    }
                    if (!detectedLabName) {
                        if (/labs?|laborator(y|ies)/i.test(line) && line.length <= 80 && !/limit|result|analysis/i.test(line)) {
                            detectedLabName = line;
                        }
                    }
                    if (detectedBatchCode && detectedLabName) break;
                }
            }
            // Create document with extracted text
            const document = await prisma.uploadedDocument.create({
                data: {
                    fileName: file.originalname,
                    mimeType: file.mimetype,
                    size: file.size,
                    sha256: hash,
                    batchCode: detectedBatchCode,
                    labName: detectedLabName,
                    extractedText,
                    verified: false,
                    filePath: ''
                }
            });
            // For now, do NOT auto-create a LabResult because LabResult
            // requires a linked Batch in the Prisma schema.
            // We just return null, and you can create / link a lab result
            // later from the COA debug interface.
            const labResult = null;
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

//# sourceMappingURL=%5Broot-of-the-server%5D__10dbddb7._.js.map