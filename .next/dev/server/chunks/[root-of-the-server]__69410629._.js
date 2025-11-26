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
"[project]/pages/api/admin/batches.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/api/admin/batches.ts
__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$next__$5b$external$5d$__$28$next$2d$auth$2f$next$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next-auth/next [external] (next-auth/next, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auth$2f5b2e2e2e$nextauth$5d2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/auth/[...nextauth].ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
async function handler(req, res) {
    // ✅ Same auth pattern as /api/admin/uploads
    const session = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$next__$5b$external$5d$__$28$next$2d$auth$2f$next$2c$__cjs$29$__["getServerSession"])(req, res, __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auth$2f5b2e2e2e$nextauth$5d2e$ts__$5b$api$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session) {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }
    if (req.method === 'GET') {
        const { stateCode, q } = req.query;
        const where = {};
        // Optional state filter (used by /admin/states/[stateCode])
        if (typeof stateCode === 'string' && stateCode.trim() !== '') {
            where.stateCode = stateCode.toUpperCase();
        }
        // Optional text search (batch code, product name, category)
        if (typeof q === 'string' && q.trim() !== '') {
            const search = q.trim();
            where.OR = [
                {
                    batchCode: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    productName: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    primaryCategory: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    subCategory: {
                        contains: search,
                        mode: 'insensitive'
                    }
                }
            ];
        }
        const batches = await prisma.batch.findMany({
            where,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                brand: true,
                labResults: {
                    orderBy: {
                        testedAt: 'desc'
                    },
                    take: 1,
                    include: {
                        lab: true
                    }
                }
            }
        });
        const mapped = batches.map((b)=>{
            const latest = b.labResults[0];
            return {
                id: b.id,
                batchCode: b.batchCode,
                productName: b.productName,
                productSku: b.productSku,
                primaryCategory: b.primaryCategory,
                subCategory: b.subCategory,
                jurisdiction: b.jurisdiction,
                stateCode: b.stateCode,
                isActive: b.isActive,
                createdAt: b.createdAt,
                brand: b.brand ? {
                    id: b.brand.id,
                    name: b.brand.name
                } : null,
                latestLab: latest ? {
                    id: latest.id,
                    testedAt: latest.testedAt,
                    thcPercent: latest.thcPercent,
                    cbdPercent: latest.cbdPercent,
                    totalCannabinoidsPercent: latest.totalCannabinoidsPercent,
                    passed: latest.passed,
                    labName: latest.lab?.name ?? null
                } : null
            };
        });
        return res.json(mapped);
    }
    if (req.method === 'POST') {
        const body = req.body || {};
        const created = await prisma.batch.create({
            data: {
                batchCode: body.batchCode,
                productName: body.productName ?? null,
                productSku: body.productSku ?? null,
                primaryCategory: body.primaryCategory ?? null,
                subCategory: body.subCategory ?? null,
                jurisdiction: body.jurisdiction ?? null,
                stateCode: body.stateCode ? String(body.stateCode).toUpperCase() : null,
                brandId: body.brandId === null || body.brandId === undefined ? null : Number(body.brandId),
                harvestDate: body.harvestDate ? new Date(body.harvestDate) : null,
                productionDate: body.productionDate ? new Date(body.productionDate) : null,
                packageDate: body.packageDate ? new Date(body.packageDate) : null,
                expirationDate: body.expirationDate ? new Date(body.expirationDate) : null,
                isActive: typeof body.isActive === 'boolean' ? body.isActive : true,
                notes: body.notes ?? null
            }
        });
        return res.status(201).json(created);
    }
    if (req.method === 'PUT') {
        const id = Number(req.query.id);
        if (!id) {
            return res.status(400).json({
                error: 'missing id'
            });
        }
        const body = req.body || {};
        const updated = await prisma.batch.update({
            where: {
                id
            },
            data: {
                batchCode: body.batchCode,
                productName: body.productName ?? null,
                productSku: body.productSku ?? null,
                primaryCategory: body.primaryCategory ?? null,
                subCategory: body.subCategory ?? null,
                jurisdiction: body.jurisdiction ?? null,
                stateCode: body.stateCode ? String(body.stateCode).toUpperCase() : null,
                brandId: body.brandId === null || body.brandId === undefined ? null : Number(body.brandId),
                harvestDate: body.harvestDate ? new Date(body.harvestDate) : null,
                productionDate: body.productionDate ? new Date(body.productionDate) : null,
                packageDate: body.packageDate ? new Date(body.packageDate) : null,
                expirationDate: body.expirationDate ? new Date(body.expirationDate) : null,
                isActive: typeof body.isActive === 'boolean' ? body.isActive : true,
                notes: body.notes ?? null
            }
        });
        return res.json(updated);
    }
    if (req.method === 'DELETE') {
        const id = Number(req.query.id);
        if (!id) {
            return res.status(400).json({
                error: 'missing id'
            });
        }
        try {
            // Remove child lab results first to avoid FK errors
            await prisma.labResult.deleteMany({
                where: {
                    batchId: id
                }
            });
            await prisma.batch.delete({
                where: {
                    id
                }
            });
            // 204 = no content (what your client already expects)
            return res.status(204).end();
        } catch (e) {
            console.error('Failed to delete batch', e);
            return res.status(500).json({
                error: e?.message || 'Failed to delete batch'
            });
        }
    }
    return res.status(405).end();
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__69410629._.js.map