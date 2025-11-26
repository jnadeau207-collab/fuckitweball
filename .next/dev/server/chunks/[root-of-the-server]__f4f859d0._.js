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
"[project]/lib/coaParsers/novaAnalytic.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/coaParsers/novaAnalytic.ts
__turbopack_context__.s([
    "parseNovaAnalytic",
    ()=>parseNovaAnalytic
]);
const STATE_ABBREVS = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY'
];
function detectCityStateFromLine(line) {
    // e.g. "65 MILLIKEN STREET, UNIT C PORTLAND ME 04103"
    const regex = new RegExp(`\\b([A-Za-z][A-Za-z]+)\\s+(${STATE_ABBREVS.join('|')})\\s+\\d{5}\\b`);
    const m = line.match(regex);
    if (!m) return {};
    const city = m[1];
    const state = m[2];
    return {
        city,
        state
    };
}
const parseNovaAnalytic = (text)=>{
    if (!/NOVA ANALYTIC LABS/i.test(text)) {
        return null;
    }
    const result = {
        labName: 'Nova Analytic Labs',
        contaminants: []
    };
    const canonicalText = text.replace(/\r\n/g, '\n');
    // Lab address line
    const labLineMatch = canonicalText.match(/NOVA ANALYTIC LABS\s*\/\/\s*([^\n]+)/i);
    if (labLineMatch) {
        const { city, state } = detectCityStateFromLine(labLineMatch[1]);
        if (city) result.labCity = city;
        if (state) result.labStateCode = state;
    }
    // Batch code, e.g. "BATCH: FAIL"
    const batchMatch = canonicalText.match(/BATCH:\s*([A-Za-z0-9_-]+)/i) || canonicalText.match(/BATCH\s+RESULT\s*:\s*([A-Za-z0-9_-]+)/i);
    if (batchMatch) {
        result.batchCode = batchMatch[1].trim();
    }
    // Basic cannabinoid metrics
    const thcMatch = canonicalText.match(/Δ-THC:?(\d+(\.\d+)?)\s*%/i);
    if (thcMatch) result.thcPercent = parseFloat(thcMatch[1]);
    const totalMatch = canonicalText.match(/TOTAL\s+CANNABINOIDS:?(\d+(\.\d+)?)\s*%/i);
    if (totalMatch) result.totalCannabinoidsPercent = parseFloat(totalMatch[1]);
    const cbdMatch = canonicalText.match(/CBD:?(\d+(\.\d+)?)\s*%/i);
    if (cbdMatch) result.cbdPercent = parseFloat(cbdMatch[1]);
    // Overall batch result: PASS/FAIL
    const batchResultMatch = canonicalText.match(/BATCH RESULT:\s*(PASS|FAIL)/i);
    if (batchResultMatch) {
        result.overallPass = batchResultMatch[1].toUpperCase() === 'PASS';
    }
    // Simple contaminant summary: capture FAIL lines
    const failLines = canonicalText.split('\n').filter((line)=>/\bFAIL\b/i.test(line));
    for (const line of failLines){
        const nameMatch = line.match(/([A-Z][A-Za-z]+)\s*FAIL/i);
        const name = nameMatch ? nameMatch[1] : 'Unknown';
        result.contaminants.push({
            group: 'OTHER',
            name,
            status: 'FAIL',
            valueRaw: line.trim()
        });
    }
    return result;
};
}),
"[project]/lib/coaParsers/registry.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/coaParsers/registry.ts
__turbopack_context__.s([
    "LAB_REGISTRY",
    ()=>LAB_REGISTRY,
    "findLabEntry",
    ()=>findLabEntry,
    "parseCoa",
    ()=>parseCoa
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$coaParsers$2f$novaAnalytic$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/coaParsers/novaAnalytic.ts [api] (ecmascript)");
;
const noopParser = (text)=>({
        contaminants: []
    });
const LAB_REGISTRY = [
    {
        slug: 'nova-analytic-labs',
        displayName: 'Nova Analytic Labs',
        states: [
            'ME'
        ],
        patterns: [
            /NOVA ANALYTIC LABS?/i
        ],
        parser: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$coaParsers$2f$novaAnalytic$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["parseNovaAnalytic"],
        website: 'https://www.nova-analyticlabs.com/'
    },
    {
        slug: 'mcr-labs',
        displayName: 'MCR Labs',
        states: [
            'MA',
            'CT',
            'PA'
        ],
        patterns: [
            /MCR LABS?/i
        ],
        parser: noopParser,
        website: 'https://mcrlabs.com/'
    },
    {
        slug: 'proverde-labs',
        displayName: 'ProVerde Laboratories',
        states: [
            'MA',
            'ME'
        ],
        patterns: [
            /PROVERDE LAB/i
        ],
        parser: noopParser,
        website: 'https://www.proverdelabs.com/'
    },
    {
        slug: 'sc-labs',
        displayName: 'SC Labs',
        states: [
            'CA',
            'CO',
            'MI',
            'OR',
            'TX'
        ],
        patterns: [
            /SC LABS?/i
        ],
        parser: noopParser,
        website: 'https://www.sclabs.com/'
    },
    {
        slug: 'kaycha-labs',
        displayName: 'Kaycha Labs',
        states: [
            'FL',
            'CA',
            'MA',
            'NY',
            'CO',
            'TN'
        ],
        patterns: [
            /KAYCHA LABS?/i
        ],
        parser: noopParser,
        website: 'https://kaychalabs.com/'
    },
    {
        slug: 'green-leaf-lab',
        displayName: 'Green Leaf Lab',
        states: [
            'OR',
            'CA'
        ],
        patterns: [
            /GREEN LEAF LAB/i
        ],
        parser: noopParser,
        website: 'https://www.greenleaflab.org/'
    },
    {
        slug: 'confidence-analytics',
        displayName: 'Confidence Analytics',
        states: [
            'WA'
        ],
        patterns: [
            /CONFIDENCE ANALYTICS/i
        ],
        parser: noopParser,
        website: 'https://www.confidenceanalytics.com/'
    }
];
function findLabEntry(text) {
    for (const entry of LAB_REGISTRY){
        if (entry.patterns.some((re)=>re.test(text))) {
            return entry;
        }
    }
    return null;
}
function parseCoa(text) {
    const entry = findLabEntry(text);
    if (entry) {
        const parsed = entry.parser(text);
        if (parsed) {
            return {
                ...parsed,
                labName: parsed.labName ?? entry.displayName,
                labStateCode: parsed.labStateCode ?? entry.states[0],
                contaminants: parsed.contaminants ?? []
            };
        }
    }
    // Generic fallback parser (THC/CBD/Total Cannabinoids only)
    const generic = {
        contaminants: []
    };
    const canonical = text.replace(/\r\n/g, '\n');
    const thcMatch = canonical.match(/TOTAL\s+THC[:\s]+(\d+(\.\d+)?)\s*%/i) || canonical.match(/Δ-?9?[-\s]*THC[:\s]+(\d+(\.\d+)?)\s*%/i);
    if (thcMatch) generic.thcPercent = parseFloat(thcMatch[1]);
    const cbdMatch = canonical.match(/TOTAL\s+CBD[:\s]+(\d+(\.\d+)?)\s*%/i) || canonical.match(/\bCBD[:\s]+(\d+(\.\d+)?)\s*%/i);
    if (cbdMatch) generic.cbdPercent = parseFloat(cbdMatch[1]);
    const totalCannMatch = canonical.match(/TOTAL\s+CANNABINOIDS?[:\s]+(\d+(\.\d+)?)\s*%/i);
    if (totalCannMatch) {
        generic.totalCannabinoidsPercent = parseFloat(totalCannMatch[1]);
    }
    return generic;
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
// --- Multer: in-memory upload, we write to disk ourselves ---
const upload = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$multer__$5b$external$5d$__$28$multer$2c$__cjs$29$__["default"])({
    storage: __TURBOPACK__imported__module__$5b$externals$5d2f$multer__$5b$external$5d$__$28$multer$2c$__cjs$29$__["default"].memoryStorage()
});
// Helper to run middleware (multer) inside Next API route
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject)=>{
        fn(req, res, (result)=>{
            if (result instanceof Error) return reject(result);
            return resolve();
        });
    });
}
// Small helpers
function slugify(input) {
    return input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
// Very simple fallback batch-code detection if parser doesn’t give one
function detectBatchCode(text) {
    const m = text.match(/batch\s*[:#]\s*([A-Za-z0-9\-_.]+)/i) || text.match(/lot\s*[:#]\s*([A-Za-z0-9\-_.]+)/i);
    return m ? m[1].trim() : null;
}
// Very simple fallback lab name detection
function detectLabName(text) {
    const lines = text.split(/\r?\n/).map((l)=>l.trim()).filter(Boolean);
    // look for something with "LAB" in it
    const candidate = lines.find((l)=>/lab(s)?/i.test(l));
    return candidate || null;
}
const config = {
    api: {
        bodyParser: false
    }
};
async function handler(req, res) {
    // 🔐 Require any authenticated session (we can tighten to role:"admin" later)
    const session = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$next__$5b$external$5d$__$28$next$2d$auth$2f$next$2c$__cjs$29$__["getServerSession"])(req, res, __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auth$2f5b2e2e2e$nextauth$5d2e$ts__$5b$api$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session) {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }
    // -------- GET: list uploaded documents --------
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
            return res.status(200).json(docs);
        } catch (e) {
            console.error('Failed to list uploads', e);
            return res.status(500).json({
                error: e?.message || 'Failed to list uploads'
            });
        }
    }
    // -------- POST: upload + parse a COA PDF --------
    if (req.method === 'POST') {
        try {
            // run multer to populate req.file
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
                    error: 'Only PDF files are allowed'
                });
            }
            // SHA-256 hash to de-dupe
            const sha256 = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash('sha256').update(file.buffer).digest('hex');
            // Check if this COA is already in the DB
            const existing = await prisma.uploadedDocument.findUnique({
                where: {
                    sha256
                },
                include: {
                    labResult: {
                        select: {
                            id: true
                        }
                    }
                }
            });
            if (existing) {
                return res.status(200).json({
                    reused: true,
                    document: existing,
                    labResult: existing.labResult || null
                });
            }
            // Ensure upload directory exists
            const uploadDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'uploads', 'coa');
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(uploadDir, {
                recursive: true
            });
            const safeName = `${sha256}.pdf`;
            const finalPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(uploadDir, safeName);
            // Write PDF to disk
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(finalPath, file.buffer);
            // Extract text from PDF
            let extractedText = '';
            try {
                const parsed = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$parse__$5b$external$5d$__$28$pdf$2d$parse$2c$__cjs$29$__["default"])(file.buffer);
                extractedText = parsed.text || '';
            } catch (err) {
                console.error('PDF parse error', err);
            }
            // Try lab-specific parser first
            let parsedCoa = null;
            if (extractedText) {
                try {
                    parsedCoa = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$coaParsers$2f$registry$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["parseCoa"])(extractedText);
                } catch (err) {
                    console.error('parseCoa() error', err);
                }
            }
            const batchCode = parsedCoa?.batchCode || detectBatchCode(extractedText) || null;
            const labName = parsedCoa?.labName || detectLabName(extractedText) || null;
            // Create UploadedDocument record
            const document = await prisma.uploadedDocument.create({
                data: {
                    filePath: finalPath,
                    fileName: file.originalname,
                    mimeType: file.mimetype,
                    size: file.size,
                    sha256,
                    extractedText,
                    batchCode,
                    labName,
                    uploader: session.user?.email || null,
                    verified: false
                }
            });
            // Optionally create Lab / Batch / LabResult
            let labResult = null;
            if (parsedCoa) {
                const thcPercent = parsedCoa.thcPercent ?? parsedCoa.thc ?? parsedCoa.totalTHC ?? null;
                const cbdPercent = parsedCoa.cbdPercent ?? parsedCoa.cbd ?? parsedCoa.totalCBD ?? null;
                const totalCannabinoidsPercent = parsedCoa.totalCannabinoidsPercent ?? parsedCoa.totalCannabinoids ?? null;
                const totalTerpenesPercent = parsedCoa.totalTerpenesPercent ?? parsedCoa.totalTerpenes ?? null;
                // Upsert Lab if we have a name (slug is unique in schema)
                let labRecord = null;
                if (labName) {
                    const slug = slugify(labName);
                    labRecord = await prisma.lab.upsert({
                        where: {
                            slug
                        },
                        update: {
                            name: labName
                        },
                        create: {
                            name: labName,
                            slug,
                            stateCode: parsedCoa.stateCode || parsedCoa.jurisdiction || null
                        }
                    });
                }
                // 🔁 Manual "upsert" for Batch by batchCode (since batchCode is NOT unique)
                let batchRecord = null;
                if (batchCode) {
                    const existingBatch = await prisma.batch.findFirst({
                        where: {
                            batchCode
                        }
                    });
                    if (existingBatch) {
                        batchRecord = await prisma.batch.update({
                            where: {
                                id: existingBatch.id
                            },
                            data: {
                                productName: parsedCoa.productName ?? existingBatch.productName,
                                jurisdiction: parsedCoa.jurisdiction ?? existingBatch.jurisdiction,
                                stateCode: parsedCoa.stateCode ?? parsedCoa.jurisdiction ?? existingBatch.stateCode
                            }
                        });
                    } else {
                        batchRecord = await prisma.batch.create({
                            data: {
                                batchCode,
                                productName: parsedCoa.productName || null,
                                jurisdiction: parsedCoa.jurisdiction || null,
                                stateCode: parsedCoa.stateCode || parsedCoa.jurisdiction || null,
                                isActive: true
                            }
                        });
                    }
                }
                // Create LabResult and connect to UploadedDocument + Batch/Lab
                labResult = await prisma.labResult.create({
                    data: {
                        uploadedDocument: {
                            connect: {
                                id: document.id
                            }
                        },
                        // If we already have a batchRecord, connect; otherwise create a simple fallback batch
                        batch: batchRecord ? {
                            connect: {
                                id: batchRecord.id
                            }
                        } : {
                            create: {
                                batchCode: batchCode || `COA-${document.id}`,
                                productName: parsedCoa.productName || null,
                                jurisdiction: parsedCoa.jurisdiction || null,
                                stateCode: parsedCoa.stateCode || parsedCoa.jurisdiction || null,
                                isActive: true
                            }
                        },
                        lab: labRecord ? {
                            connect: {
                                id: labRecord.id
                            }
                        } : undefined,
                        coaIdentifier: parsedCoa.coaIdentifier || parsedCoa.sampleId || null,
                        sampleId: parsedCoa.sampleId || null,
                        sampleType: parsedCoa.sampleType || null,
                        testedAt: parsedCoa.testedAt ? new Date(parsedCoa.testedAt) : null,
                        reportedAt: parsedCoa.reportedAt ? new Date(parsedCoa.reportedAt) : null,
                        thcPercent,
                        cbdPercent,
                        totalCannabinoidsPercent,
                        totalTerpenesPercent,
                        passed: typeof parsedCoa.passed === 'boolean' ? parsedCoa.passed : null,
                        pesticidesPass: typeof parsedCoa.pesticidesPass === 'boolean' ? parsedCoa.pesticidesPass : null,
                        solventsPass: typeof parsedCoa.solventsPass === 'boolean' ? parsedCoa.solventsPass : null,
                        heavyMetalsPass: typeof parsedCoa.heavyMetalsPass === 'boolean' ? parsedCoa.heavyMetalsPass : null,
                        microbialsPass: typeof parsedCoa.microbialsPass === 'boolean' ? parsedCoa.microbialsPass : null,
                        moisturePercent: typeof parsedCoa.moisturePercent === 'number' ? parsedCoa.moisturePercent : null,
                        waterActivity: typeof parsedCoa.waterActivity === 'number' ? parsedCoa.waterActivity : null,
                        analyteSummary: parsedCoa.analyteSummary || null,
                        rawJson: parsedCoa.rawJson || parsedCoa || null
                    }
                });
            }
            return res.status(200).json({
                reused: false,
                document,
                labResult
            });
        } catch (e) {
            console.error('Error handling upload', e);
            return res.status(500).json({
                error: e?.message || 'Failed to handle upload'
            });
        }
    }
    // Any other method
    res.setHeader('Allow', [
        'GET',
        'POST'
    ]);
    return res.status(405).end();
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f4f859d0._.js.map