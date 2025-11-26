module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[project]/pages/admin/uploads.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminUploads
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next-auth/react [external] (next-auth/react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
;
;
function AdminUploads() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__["useSession"])();
    const [docs, setDocs] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [successMessage, setSuccessMessage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [selectedDoc, setSelectedDoc] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [selectedLoading, setSelectedLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [savingSelected, setSavingSelected] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [deleteBusyId, setDeleteBusyId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (session) {
            fetchDocs();
        }
    }, [
        session
    ]);
    async function fetchDocs() {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('/api/admin/uploads');
            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || 'Failed to load uploads');
            }
            const data = await res.json();
            setDocs(data);
        } catch (e) {
            console.error('Failed to fetch uploads', e);
            setError(e.message || 'Failed to load uploads');
        } finally{
            setLoading(false);
        }
    }
    async function onSubmit(e) {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const file = formData.get('file');
        if (!file) {
            setError('Please choose a PDF file.');
            return;
        }
        if (file.type !== 'application/pdf') {
            setError('Only PDF files are allowed.');
            return;
        }
        try {
            setUploading(true);
            const res = await fetch('/api/admin/uploads', {
                method: 'POST',
                body: formData
            });
            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || 'Upload failed');
            }
            const data = await res.json();
            if (data.reused) {
                setSuccessMessage(`This COA was already uploaded (document #${data.document.id}).`);
            } else {
                setSuccessMessage(`Uploaded COA as document #${data.document.id}${data.labResult ? `; created lab result #${data.labResult.id}` : ''}.`);
            }
            form.reset();
            fetchDocs();
        } catch (err) {
            console.error('Upload error', err);
            setError(err.message || 'Upload failed');
        } finally{
            setUploading(false);
        }
    }
    async function openDoc(id) {
        try {
            setSelectedLoading(true);
            setError(null);
            setSuccessMessage(null);
            const res = await fetch(`/api/admin/uploads/${id}`);
            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || 'Failed to load document');
            }
            const data = await res.json();
            setSelectedDoc(data);
        } catch (e) {
            console.error('Failed to load document', e);
            setError(e.message || 'Failed to load document');
        } finally{
            setSelectedLoading(false);
        }
    }
    async function saveSelected() {
        if (!selectedDoc) return;
        try {
            setSavingSelected(true);
            setError(null);
            setSuccessMessage(null);
            const res = await fetch(`/api/admin/uploads/${selectedDoc.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    batchCode: selectedDoc.batchCode,
                    labName: selectedDoc.labName,
                    verified: selectedDoc.verified
                })
            });
            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || 'Failed to save document');
            }
            const updated = await res.json();
            setSelectedDoc((prev)=>prev ? {
                    ...prev,
                    ...updated
                } : prev);
            setDocs((prev)=>prev.map((d)=>d.id === updated.id ? {
                        ...d,
                        ...updated
                    } : d));
            setSuccessMessage(`Updated COA #${updated.id} (batch code & lab name).`);
        } catch (e) {
            console.error('Failed to save document', e);
            setError(e.message || 'Failed to save document');
        } finally{
            setSavingSelected(false);
        }
    }
    async function deleteDoc(id) {
        if (!confirm('Delete this COA and its linked lab result (if any)?')) return;
        try {
            setDeleteBusyId(id);
            setError(null);
            setSuccessMessage(null);
            const res = await fetch(`/api/admin/uploads/${id}`, {
                method: 'DELETE'
            });
            if (!res.ok && res.status !== 204) {
                const txt = await res.text();
                throw new Error(txt || 'Failed to delete document');
            }
            setDocs((prev)=>prev.filter((d)=>d.id !== id));
            if (selectedDoc && selectedDoc.id === id) {
                setSelectedDoc(null);
            }
            setSuccessMessage(`Deleted COA #${id}.`);
        } catch (e) {
            console.error('Failed to delete document', e);
            setError(e.message || 'Failed to delete document');
        } finally{
            setDeleteBusyId(null);
        }
    }
    if (!session) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "text-sm text-slate-300",
                children: "Sign in as an admin to upload COA PDFs."
            }, void 0, false, {
                fileName: "[project]/pages/admin/uploads.tsx",
                lineNumber: 240,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/admin/uploads.tsx",
            lineNumber: 239,
            columnNumber: 7
        }, this);
    }
    // Helpers for the “info dialog” legacy panel
    function getProducerName(doc) {
        const batch = doc.labResult?.batch;
        return batch?.brand?.name || batch?.productName || doc.labName || 'Unknown producer';
    }
    function getProducerLocation(doc) {
        const batch = doc.labResult?.batch;
        if (!batch || !batch.locations || batch.locations.length === 0) return null;
        // Just grab the first location for now
        const loc = batch.locations[0].location;
        const parts = [
            loc.name,
            loc.city,
            loc.state
        ].filter(Boolean);
        return parts.join(', ');
    }
    function getRetailerList(doc) {
        const batch = doc.labResult?.batch;
        if (!batch || !batch.locations || batch.locations.length === 0) return [];
        return batch.locations.map((bl)=>bl.location);
    }
    function getPotencySummary(doc) {
        const lr = doc.labResult;
        if (!lr) return 'No potency data linked yet.';
        const pieces = [];
        if (lr.thcPercent != null) pieces.push(`THC ${lr.thcPercent.toFixed(2)}%`);
        if (lr.cbdPercent != null) pieces.push(`CBD ${lr.cbdPercent.toFixed(2)}%`);
        if (lr.totalCannabinoidsPercent != null) pieces.push(`Total cannabinoids ${lr.totalCannabinoidsPercent.toFixed(2)}%`);
        if (pieces.length === 0) return 'No potency data linked yet.';
        return pieces.join(' · ');
    }
    function getSafetySummary(doc) {
        const lr = doc.labResult;
        if (!lr || lr.passed == null) {
            return 'No overall safety judgement recorded.';
        }
        return lr.passed ? 'Overall outcome: PASS (no issues detected in recorded tests).' : 'Overall outcome: FAIL (one or more tests did not meet thresholds).';
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "p-6 max-w-6xl mx-auto space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold mb-1",
                        children: "COA uploads"
                    }, void 0, false, {
                        fileName: "[project]/pages/admin/uploads.tsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-400",
                        children: "Upload raw PDF lab reports. CartFax will store the file, extract text, attempt to detect batch codes and lab names, and optionally create a linked batch + lab result. You can refine metadata and view a quick at-a-glance info card here, or open the full debug view for deeper parsing work."
                    }, void 0, false, {
                        fileName: "[project]/pages/admin/uploads.tsx",
                        lineNumber: 300,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/admin/uploads.tsx",
                lineNumber: 298,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                onSubmit: onSubmit,
                className: "rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-sm font-medium text-slate-200",
                        children: "Upload a COA PDF"
                    }, void 0, false, {
                        fileName: "[project]/pages/admin/uploads.tsx",
                        lineNumber: 314,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-xs text-slate-400",
                        children: "Supports one PDF at a time. Files are hashed to avoid duplicates."
                    }, void 0, false, {
                        fileName: "[project]/pages/admin/uploads.tsx",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-xs text-red-400 bg-red-950/40 border border-red-700/60 rounded-md px-3 py-2",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/pages/admin/uploads.tsx",
                        lineNumber: 322,
                        columnNumber: 11
                    }, this),
                    successMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-700/60 rounded-md px-3 py-2",
                        children: successMessage
                    }, void 0, false, {
                        fileName: "[project]/pages/admin/uploads.tsx",
                        lineNumber: 327,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row gap-3 items-start md:items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "file",
                                name: "file",
                                accept: "application/pdf",
                                className: "text-xs text-slate-200 file:border-0 file:bg-slate-800 file:text-slate-100 file:px-3 file:py-1.5 file:rounded-md file:text-xs"
                            }, void 0, false, {
                                fileName: "[project]/pages/admin/uploads.tsx",
                                lineNumber: 333,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: uploading,
                                className: "px-3 py-1.5 rounded-md bg-emerald-500 text-slate-950 text-sm font-medium hover:bg-emerald-400 disabled:opacity-60",
                                children: uploading ? 'Uploading…' : 'Upload COA'
                            }, void 0, false, {
                                fileName: "[project]/pages/admin/uploads.tsx",
                                lineNumber: 339,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/admin/uploads.tsx",
                        lineNumber: 332,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/admin/uploads.tsx",
                lineNumber: 310,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-slate-800 bg-slate-900/70 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        className: "text-sm font-semibold text-slate-200",
                                        children: "Uploaded documents"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/uploads.tsx",
                                        lineNumber: 353,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: fetchDocs,
                                        className: "px-2 py-1 rounded-md border border-slate-700 text-xs text-slate-200",
                                        children: "Refresh"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/uploads.tsx",
                                        lineNumber: 356,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/admin/uploads.tsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, this),
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "text-xs text-slate-400",
                                children: "Loading uploads…"
                            }, void 0, false, {
                                fileName: "[project]/pages/admin/uploads.tsx",
                                lineNumber: 365,
                                columnNumber: 13
                            }, this),
                            !loading && docs.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "text-xs text-slate-500",
                                children: "No COAs uploaded yet. Upload your first PDF above."
                            }, void 0, false, {
                                fileName: "[project]/pages/admin/uploads.tsx",
                                lineNumber: 369,
                                columnNumber: 13
                            }, this),
                            !loading && docs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
                                    className: "w-full text-xs text-left border-collapse",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                className: "border-b border-slate-800 text-slate-400",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                        className: "py-2 pr-3",
                                                        children: "ID"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                        className: "py-2 pr-3",
                                                        children: "File"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 380,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                        className: "py-2 pr-3",
                                                        children: "Batch code"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 381,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                        className: "py-2 pr-3",
                                                        children: "Lab name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 382,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                        className: "py-2 pr-3",
                                                        children: "Size"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 383,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                        className: "py-2 pr-3",
                                                        children: "Created"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 384,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                        className: "py-2 pr-3",
                                                        children: "LabResult"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 385,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                        className: "py-2 pr-3",
                                                        children: "Actions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 386,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/uploads.tsx",
                                                lineNumber: 378,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/uploads.tsx",
                                            lineNumber: 377,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                                            children: docs.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                    className: `border-b border-slate-900/70 hover:bg-slate-900/80 ${selectedDoc && selectedDoc.id === d.id ? 'bg-slate-900/80' : ''}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                            className: "py-2 pr-3 text-slate-300",
                                                            children: d.id
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/uploads.tsx",
                                                            lineNumber: 399,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                            className: "py-2 pr-3 text-slate-100",
                                                            children: d.fileName
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/uploads.tsx",
                                                            lineNumber: 400,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                            className: "py-2 pr-3 text-slate-200",
                                                            children: d.batchCode || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-500",
                                                                children: "Not detected"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/uploads.tsx",
                                                                lineNumber: 405,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/uploads.tsx",
                                                            lineNumber: 403,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                            className: "py-2 pr-3 text-slate-200",
                                                            children: d.labName || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-500",
                                                                children: "Not detected"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/uploads.tsx",
                                                                lineNumber: 410,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/uploads.tsx",
                                                            lineNumber: 408,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                            className: "py-2 pr-3 text-slate-400",
                                                            children: [
                                                                (d.size / 1024).toFixed(1),
                                                                " KB"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/admin/uploads.tsx",
                                                            lineNumber: 413,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                            className: "py-2 pr-3 text-slate-400",
                                                            children: new Date(d.createdAt).toLocaleString()
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/uploads.tsx",
                                                            lineNumber: 416,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                            className: "py-2 pr-3",
                                                            children: d.labResult ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "text-emerald-300",
                                                                children: [
                                                                    "#",
                                                                    d.labResult.id
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/admin/uploads.tsx",
                                                                lineNumber: 421,
                                                                columnNumber: 27
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-500",
                                                                children: "None"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/uploads.tsx",
                                                                lineNumber: 425,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/uploads.tsx",
                                                            lineNumber: 419,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                            className: "py-2 pr-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-wrap gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>openDoc(d.id),
                                                                        className: "text-[11px] px-2 py-1 rounded-md border border-slate-700 text-slate-200 hover:bg-slate-800",
                                                                        children: "View / Edit"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                                        lineNumber: 430,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>router.push(`/admin/uploads/${d.id}`),
                                                                        className: "text-[11px] px-2 py-1 rounded-md border border-emerald-600/70 text-emerald-300 hover:bg-emerald-900/40",
                                                                        children: "Full debug"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                                        lineNumber: 437,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>deleteDoc(d.id),
                                                                        disabled: deleteBusyId === d.id,
                                                                        className: "text-[11px] px-2 py-1 rounded-md border border-red-600/70 text-red-300 hover:bg-red-900/40 disabled:opacity-60",
                                                                        children: deleteBusyId === d.id ? 'Deleting…' : 'Delete'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                                        lineNumber: 446,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/admin/uploads.tsx",
                                                                lineNumber: 429,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/uploads.tsx",
                                                            lineNumber: 428,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, d.id, true, {
                                                    fileName: "[project]/pages/admin/uploads.tsx",
                                                    lineNumber: 391,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/uploads.tsx",
                                            lineNumber: 389,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/admin/uploads.tsx",
                                    lineNumber: 376,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/admin/uploads.tsx",
                                lineNumber: 375,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/admin/uploads.tsx",
                        lineNumber: 351,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-slate-800 bg-slate-900/70 p-4 flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "text-sm font-semibold text-slate-200 mb-2",
                                children: "COA info panel"
                            }, void 0, false, {
                                fileName: "[project]/pages/admin/uploads.tsx",
                                lineNumber: 465,
                                columnNumber: 11
                            }, this),
                            selectedLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "text-xs text-slate-400 mb-2",
                                children: "Loading document details…"
                            }, void 0, false, {
                                fileName: "[project]/pages/admin/uploads.tsx",
                                lineNumber: 469,
                                columnNumber: 13
                            }, this),
                            !selectedDoc && !selectedLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "text-xs text-slate-500",
                                children: "Select a COA from the table to see a quick summary: producer, retailers, potency & safety overview."
                            }, void 0, false, {
                                fileName: "[project]/pages/admin/uploads.tsx",
                                lineNumber: 474,
                                columnNumber: 13
                            }, this),
                            selectedDoc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-3 text-xs h-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "text-slate-300",
                                                        children: [
                                                            "#",
                                                            selectedDoc.id,
                                                            " · ",
                                                            selectedDoc.fileName
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 484,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "text-slate-500",
                                                        children: [
                                                            new Date(selectedDoc.createdAt).toLocaleString(),
                                                            selectedDoc.labResult ? ` · LabResult #${selectedDoc.labResult.id}` : ''
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 487,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/uploads.tsx",
                                                lineNumber: 483,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    className: "inline-flex items-center gap-1 text-slate-300",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: selectedDoc.verified,
                                                            onChange: (e)=>setSelectedDoc({
                                                                    ...selectedDoc,
                                                                    verified: e.target.checked
                                                                }),
                                                            className: "h-3 w-3 rounded border-slate-600 bg-slate-900"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/uploads.tsx",
                                                            lineNumber: 496,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Verified"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/admin/uploads.tsx",
                                                    lineNumber: 495,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/uploads.tsx",
                                                lineNumber: 494,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/admin/uploads.tsx",
                                        lineNumber: 482,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "grid gap-2 md:grid-cols-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        className: "text-slate-300",
                                                        children: "Batch code"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 515,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                        value: selectedDoc.batchCode || '',
                                                        onChange: (e)=>setSelectedDoc({
                                                                ...selectedDoc,
                                                                batchCode: e.target.value
                                                            }),
                                                        placeholder: "Batch / Lot / METRC ID",
                                                        className: "p-1.5 rounded-md bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 516,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/uploads.tsx",
                                                lineNumber: 514,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                        className: "text-slate-300",
                                                        children: "Lab name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 529,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                        value: selectedDoc.labName || '',
                                                        onChange: (e)=>setSelectedDoc({
                                                                ...selectedDoc,
                                                                labName: e.target.value
                                                            }),
                                                        placeholder: "Detected lab name",
                                                        className: "p-1.5 rounded-md bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 530,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/uploads.tsx",
                                                lineNumber: 528,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/admin/uploads.tsx",
                                        lineNumber: 513,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: saveSelected,
                                                disabled: savingSelected,
                                                className: "px-3 py-1.5 rounded-md bg-emerald-500 text-slate-950 font-medium text-[11px] hover:bg-emerald-400 disabled:opacity-60",
                                                children: savingSelected ? 'Saving…' : 'Save metadata'
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/uploads.tsx",
                                                lineNumber: 545,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSelectedDoc(null),
                                                className: "px-3 py-1.5 rounded-md border border-slate-700 text-[11px] text-slate-200",
                                                children: "Close"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/uploads.tsx",
                                                lineNumber: 552,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/admin/uploads.tsx",
                                        lineNumber: 544,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "border-t border-slate-800 pt-3 mt-1 space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "text-slate-400 text-[11px]",
                                                        children: "Producer / brand"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 563,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "text-slate-100",
                                                        children: getProducerName(selectedDoc)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 566,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "text-slate-500",
                                                        children: getProducerLocation(selectedDoc) || 'No producer location recorded.'
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 569,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/uploads.tsx",
                                                lineNumber: 562,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "text-slate-400 text-[11px] mb-0.5",
                                                        children: "Retailers (where seen / sold)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 576,
                                                        columnNumber: 19
                                                    }, this),
                                                    (()=>{
                                                        const retailers = getRetailerList(selectedDoc);
                                                        if (!retailers.length) {
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "text-slate-500",
                                                                children: "No retailer locations linked to this batch yet."
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/uploads.tsx",
                                                                lineNumber: 583,
                                                                columnNumber: 25
                                                            }, this);
                                                        }
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                                            className: "text-slate-200 space-y-0.5",
                                                            children: [
                                                                retailers.slice(0, 5).map((loc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                                        children: [
                                                                            loc.name,
                                                                            loc.city || loc.state ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                                className: "text-slate-500",
                                                                                children: [
                                                                                    ' ',
                                                                                    "· ",
                                                                                    loc.city || '—',
                                                                                    ", ",
                                                                                    loc.state || '—'
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/pages/admin/uploads.tsx",
                                                                                lineNumber: 594,
                                                                                columnNumber: 31
                                                                            }, this) : null
                                                                        ]
                                                                    }, loc.id, true, {
                                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                                        lineNumber: 591,
                                                                        columnNumber: 27
                                                                    }, this)),
                                                                retailers.length > 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                                    className: "text-slate-500",
                                                                    children: [
                                                                        "+ ",
                                                                        retailers.length - 5,
                                                                        " more…"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/pages/admin/uploads.tsx",
                                                                    lineNumber: 602,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/admin/uploads.tsx",
                                                            lineNumber: 589,
                                                            columnNumber: 23
                                                        }, this);
                                                    })()
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/uploads.tsx",
                                                lineNumber: 575,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "text-slate-400 text-[11px] mb-0.5",
                                                        children: "Potency (from linked lab result)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 612,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "text-slate-100",
                                                        children: getPotencySummary(selectedDoc)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 615,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/uploads.tsx",
                                                lineNumber: 611,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "text-slate-400 text-[11px] mb-0.5",
                                                        children: "Safety / contaminants"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 621,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "text-slate-100",
                                                        children: getSafetySummary(selectedDoc)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 624,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] text-slate-500 mt-0.5",
                                                        children: "Detailed analyte-level data and raw text are available in the Full debug view."
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/uploads.tsx",
                                                        lineNumber: 627,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/uploads.tsx",
                                                lineNumber: 620,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/admin/uploads.tsx",
                                        lineNumber: 561,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/admin/uploads.tsx",
                                lineNumber: 481,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/admin/uploads.tsx",
                        lineNumber: 464,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/admin/uploads.tsx",
                lineNumber: 349,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/admin/uploads.tsx",
        lineNumber: 297,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7257ff3c._.js.map