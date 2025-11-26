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
"[project]/pages/api/admin/batches.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$next__$5b$external$5d$__$28$next$2d$auth$2f$next$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next-auth/next [external] (next-auth/next, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auth$2f5b2e2e2e$nextauth$5d2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/auth/[...nextauth].ts [api] (ecmascript)");
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
async function handler(req, res) {
    const session = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$next__$5b$external$5d$__$28$next$2d$auth$2f$next$2c$__cjs$29$__["getServerSession"])(req, res, __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auth$2f5b2e2e2e$nextauth$5d2e$ts__$5b$api$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session || session.user.role !== 'admin') {
        return res.status(403).json({
            error: 'forbidden'
        });
    }
    // GET: list batches, optionally filtered by state and search query
    if (req.method === 'GET') {
        const { id, stateCode, q } = req.query;
        // Detail view: GET /api/admin/batches?id=123
        if (id) {
            const batchId = Number(id);
            if (!batchId) {
                return res.status(400).json({
                    error: 'invalid id'
                });
            }
            const item = await prisma.batch.findUnique({
                where: {
                    id: batchId
                },
                include: {
                    brand: true,
                    labResults: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        include: {
                            uploadedDocument: true
                        }
                    }
                }
            });
            if (!item) {
                return res.status(404).json({
                    error: 'not found'
                });
            }
            return res.json(item);
        }
        // List view (state + search)
        const where = {};
        if (stateCode && typeof stateCode === 'string') {
            where.stateCode = stateCode.toUpperCase();
        }
        if (q && typeof q === 'string' && q.trim().length > 0) {
            where.OR = [
                {
                    batchCode: {
                        contains: q,
                        mode: 'insensitive'
                    }
                },
                {
                    productName: {
                        contains: q,
                        mode: 'insensitive'
                    }
                },
                {
                    productCategory: {
                        contains: q,
                        mode: 'insensitive'
                    }
                },
                // remove this line if you don't have brand.name:
                {
                    brand: {
                        name: {
                            contains: q,
                            mode: 'insensitive'
                        }
                    }
                }
            ];
        }
        const items = await prisma.batch.findMany({
            where,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                brand: true,
                labResults: true
            }
        });
        return res.json(items);
    }
    // POST: create batch
    if (req.method === 'POST') {
        const body = req.body || {};
        const created = await prisma.batch.create({
            data: {
                batchCode: body.batchCode || '',
                productName: body.productName || null,
                productCategory: body.productCategory || null,
                productSubcategory: body.productSubcategory || null,
                brandId: body.brandId ?? null,
                sku: body.sku || null,
                stateCode: body.stateCode ? String(body.stateCode).toUpperCase() : null,
                harvestDate: body.harvestDate ? new Date(body.harvestDate) : null,
                productionDate: body.productionDate ? new Date(body.productionDate) : null,
                packageDate: body.packageDate ? new Date(body.packageDate) : null,
                expirationDate: body.expirationDate ? new Date(body.expirationDate) : null,
                isActive: body.isActive === true,
                notes: body.notes || null
            }
        });
        return res.status(201).json(created);
    }
    // PUT: update batch
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
                batchCode: body.batchCode || '',
                productName: body.productName || null,
                productCategory: body.productCategory || null,
                productSubcategory: body.productSubcategory || null,
                brandId: body.brandId ?? null,
                sku: body.sku || null,
                stateCode: body.stateCode ? String(body.stateCode).toUpperCase() : null,
                harvestDate: body.harvestDate ? new Date(body.harvestDate) : null,
                productionDate: body.productionDate ? new Date(body.productionDate) : null,
                packageDate: body.packageDate ? new Date(body.packageDate) : null,
                expirationDate: body.expirationDate ? new Date(body.expirationDate) : null,
                isActive: body.isActive === true,
                notes: body.notes || null
            }
        });
        return res.json(updated);
    }
    // DELETE: delete batch + its lab results
    if (req.method === 'DELETE') {
        const id = Number(req.query.id);
        if (!id) {
            return res.status(400).json({
                error: 'missing id'
            });
        }
        try {
            // delete all lab results that reference this batch
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
            return res.json({
                ok: true
            });
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

//# sourceMappingURL=%5Broot-of-the-server%5D__55615c53._.js.map