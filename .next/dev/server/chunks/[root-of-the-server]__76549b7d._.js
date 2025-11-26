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
(()=>{
    const e = new Error("Cannot find module '../auth/[...nextauth]'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
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
// Multer setup – use memory storage, we handle disk write ourselves
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
async function handleGet(req, res) {
    const docs = await prisma.uploadedDocument.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            labResult: true
        }
    });
    res.status(200).json(docs);
}
async function handlePost(req, res) {
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
            error: 'Only PDF files are allowed'
        });
        return;
    }
    const buffer = file.buffer;
    // Compute SHA-256 to deduplicate uploads
    const sha256 = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash('sha256').update(buffer).digest('hex');
    const existing = await prisma.uploadedDocument.findFirst({
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
            labResult: existing.labResult ?? null
        });
        return;
    }
    // Ensure uploads directory exists
    const uploadDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'uploads');
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(uploadDir, {
        recursive: true
    });
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(uploadDir, `${sha256}.pdf`);
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(filePath, buffer);
    // Extract text from PDF
    let extractedText = '';
    try {
        const pdfData = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$parse__$5b$external$5d$__$28$pdf$2d$parse$2c$__cjs$29$__["default"])(buffer);
        extractedText = pdfData.text || '';
    } catch (err) {
        console.error('PDF parse failed', err);
        extractedText = '';
    }
    // Parse COA text using our registry / lab-specific parser
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$coaParsers$2f$registry$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["parseCoa"])(extractedText || '');
    const batchCode = parsed.batchCode ?? null;
    const labName = parsed.labName ?? null;
    // Create UploadedDocument row
    const document = await prisma.uploadedDocument.create({
        data: {
            fileName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            sha256,
            filePath,
            extractedText: extractedText || null,
            batchCode,
            labName,
            verified: false
        }
    });
    let batch = null;
    let labResult = null;
    let lab = null;
    if (batchCode) {
        // 1) Ensure Lab row if we know labName
        if (labName) {
            lab = await prisma.lab.upsert({
                where: {
                    name: labName
                },
                update: {
                    city: parsed.labCity ?? undefined,
                    stateCode: parsed.labStateCode ?? undefined
                },
                create: {
                    name: labName,
                    city: parsed.labCity ?? undefined,
                    stateCode: parsed.labStateCode ?? undefined
                }
            });
        }
        // 2) Ensure Batch row
        batch = await prisma.batch.upsert({
            where: {
                batchCode
            },
            update: {
                productName: parsed.productName ?? undefined,
                jurisdiction: parsed.labStateCode ?? undefined
            },
            create: {
                batchCode,
                productName: parsed.productName ?? null,
                jurisdiction: parsed.labStateCode ?? null,
                isActive: true
            }
        });
        // 3) Create LabResult linked to batch + doc (+ lab if known)
        labResult = await prisma.labResult.create({
            data: {
                uploadedDocument: {
                    connect: {
                        id: document.id
                    }
                },
                batch: {
                    connect: {
                        id: batch.id
                    }
                },
                ...lab ? {
                    lab: {
                        connect: {
                            id: lab.id
                        }
                    }
                } : {},
                thcPercent: parsed.thcPercent ?? null,
                cbdPercent: parsed.cbdPercent ?? null,
                totalCannabinoidsPercent: parsed.totalCannabinoidsPercent ?? null,
                passed: parsed.overallPass
            }
        });
        // 4) Link to a Location (LAB) for state map / drill-down
        if (lab && parsed.labStateCode) {
            let loc = await prisma.location.findFirst({
                where: {
                    name: lab.name,
                    state: parsed.labStateCode,
                    type: 'LAB'
                }
            });
            if (!loc) {
                loc = await prisma.location.create({
                    data: {
                        name: lab.name,
                        type: 'LAB',
                        city: parsed.labCity ?? null,
                        state: parsed.labStateCode
                    }
                });
            }
            const existingLink = await prisma.batchLocation.findFirst({
                where: {
                    batchId: batch.id,
                    locationId: loc.id
                }
            });
            if (!existingLink) {
                await prisma.batchLocation.create({
                    data: {
                        batchId: batch.id,
                        locationId: loc.id
                    }
                });
            }
        }
    }
    res.status(200).json({
        reused: false,
        document,
        batch,
        labResult
    });
}
async function handler(req, res) {
    const session = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$next__$5b$external$5d$__$28$next$2d$auth$2f$next$2c$__cjs$29$__["getServerSession"])(req, res, authOptions);
    // Restrict to admins
    if (!session || session.user?.role !== 'ADMIN') {
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
        try {
            await handlePost(req, res);
        } catch (err) {
            console.error('Error handling upload', err);
            res.status(500).json({
                error: 'Upload failed'
            });
        }
        return;
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

//# sourceMappingURL=%5Broot-of-the-server%5D__76549b7d._.js.map