(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/lib/jurisdictions.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/jurisdictions.ts
// Central place for "what jurisdiction are we in" + cannabis legal status
// + high-level access rules. Backend will enforce the same rules server-side.
__turbopack_context__.s([
    "JURISDICTIONS",
    ()=>JURISDICTIONS,
    "getAccessProfile",
    ()=>getAccessProfile
]);
const JURISDICTIONS = {
    unitedStates: {
        id: 'unitedStates',
        name: 'United States',
        legalStatus: 'mixed',
        apiNamespace: 'us',
        defaultLandingAdminPath: '/admin/us',
        notes: 'Patchwork of state-level laws; federal prohibition still in play.'
    },
    canada: {
        id: 'canada',
        name: 'Canada',
        legalStatus: 'recreational',
        apiNamespace: 'ca',
        defaultLandingAdminPath: '/admin/ca',
        notes: 'National recreational and medical framework.'
    },
    mexico: {
        id: 'mexico',
        name: 'Mexico',
        legalStatus: 'mixed',
        apiNamespace: 'mx',
        defaultLandingAdminPath: '/admin/mx',
        notes: 'Supreme Court rulings enabling personal use; implementation is evolving.'
    },
    netherlands: {
        id: 'netherlands',
        name: 'Netherlands',
        legalStatus: 'tolerated',
        apiNamespace: 'nl',
        defaultLandingAdminPath: '/admin/nl',
        notes: 'Famous for tolerance and coffeeshops, but technically a controlled substance.'
    },
    uruguay: {
        id: 'uruguay',
        name: 'Uruguay',
        legalStatus: 'recreational',
        apiNamespace: 'uy',
        defaultLandingAdminPath: '/admin/uy',
        notes: 'First country to fully legalize recreational cannabis.'
    },
    germany: {
        id: 'germany',
        name: 'Germany',
        legalStatus: 'recreational',
        apiNamespace: 'de',
        defaultLandingAdminPath: '/admin/de',
        notes: 'Personal use and home grow legalized with non-profit social clubs; commercial retail still restricted.'
    },
    southAfrica: {
        id: 'southAfrica',
        name: 'South Africa',
        legalStatus: 'recreational',
        apiNamespace: 'za',
        defaultLandingAdminPath: '/admin/za',
        notes: 'Private use and cultivation legalized; commercial sale is still prohibited.'
    },
    luxembourg: {
        id: 'luxembourg',
        name: 'Luxembourg',
        legalStatus: 'recreational',
        apiNamespace: 'lu',
        defaultLandingAdminPath: '/admin/lu',
        notes: 'Private home grow and use legalized; public use and sales limited.'
    },
    malta: {
        id: 'malta',
        name: 'Malta',
        legalStatus: 'recreational',
        apiNamespace: 'mt',
        defaultLandingAdminPath: '/admin/mt',
        notes: 'First EU country to legalize recreational use; non-profit clubs allowed.'
    },
    georgia: {
        id: 'georgia',
        name: 'Georgia',
        legalStatus: 'recreational',
        apiNamespace: 'ge',
        defaultLandingAdminPath: '/admin/ge',
        notes: 'Private consumption legal; supply side remains restricted.'
    }
};
// Baseline policy: you can tighten per-jurisdiction if needed.
const BASE_ACCESS_BY_ROLE = {
    guest: {
        canSeePII: false,
        canSeeGovDashboards: false,
        canSeeOperatorDashboards: false,
        canSeeAggregatedAnalytics: true
    },
    consumer: {
        canSeePII: false,
        canSeeGovDashboards: false,
        canSeeOperatorDashboards: false,
        canSeeAggregatedAnalytics: true
    },
    operator: {
        canSeePII: true,
        canSeeGovDashboards: false,
        canSeeOperatorDashboards: true,
        canSeeAggregatedAnalytics: true
    },
    gov: {
        canSeePII: true,
        canSeeGovDashboards: true,
        canSeeOperatorDashboards: true,
        canSeeAggregatedAnalytics: true
    }
};
function getAccessProfile(jurisdiction, role) {
    const base = BASE_ACCESS_BY_ROLE[role];
    // Example of “US gov cannot see Canadian deep data” – tune as needed.
    if (jurisdiction === 'canada' && role === 'gov') {
        return {
            ...base,
            canSeeGovDashboards: false,
            canSeeAggregatedAnalytics: true
        };
    }
    // You can branch on other jurisdictions here as your rules harden.
    return base;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/stateSnapshots.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/stateSnapshots.ts
__turbopack_context__.s([
    "STATE_SNAPSHOTS",
    ()=>STATE_SNAPSHOTS
]);
const STATE_SNAPSHOTS = {
    CA: {
        id: 'CA',
        name: 'California',
        batchesTracked: 18234,
        labsReporting: 97,
        coverageScore: 82,
        recentRecalls: 12
    },
    ME: {
        id: 'ME',
        name: 'Maine',
        batchesTracked: 2045,
        labsReporting: 14,
        coverageScore: 68,
        recentRecalls: 1
    },
    CO: {
        id: 'CO',
        name: 'Colorado',
        batchesTracked: 9412,
        labsReporting: 33,
        coverageScore: 76,
        recentRecalls: 4
    },
    NY: {
        id: 'NY',
        name: 'New York',
        batchesTracked: 5110,
        labsReporting: 21,
        coverageScore: 59,
        recentRecalls: 3
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/AdminStateExplorer.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/AdminStateExplorer.tsx
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dynamic.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jurisdictions$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/jurisdictions.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stateSnapshots$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/stateSnapshots.ts [client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
// Lazy load globe for client-only rendering
const GlobeStatesDynamic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/components/GlobeStates.tsx [client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/components/GlobeStates.tsx [client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full w-full items-center justify-center text-xs text-slate-500",
            children: "Loading 3D atlas…"
        }, void 0, false, {
            fileName: "[project]/components/AdminStateExplorer.tsx",
            lineNumber: 18,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
});
_c = GlobeStatesDynamic;
const formatNumber = (n)=>n.toLocaleString(undefined, {
        maximumFractionDigits: 0
    });
const US_STATES = [
    {
        id: 'AL',
        name: 'Alabama'
    },
    {
        id: 'AK',
        name: 'Alaska'
    },
    {
        id: 'AZ',
        name: 'Arizona'
    },
    {
        id: 'AR',
        name: 'Arkansas'
    },
    {
        id: 'CA',
        name: 'California'
    },
    {
        id: 'CO',
        name: 'Colorado'
    },
    {
        id: 'CT',
        name: 'Connecticut'
    },
    {
        id: 'DE',
        name: 'Delaware'
    },
    {
        id: 'FL',
        name: 'Florida'
    },
    {
        id: 'GA',
        name: 'Georgia'
    },
    {
        id: 'HI',
        name: 'Hawaii'
    },
    {
        id: 'ID',
        name: 'Idaho'
    },
    {
        id: 'IL',
        name: 'Illinois'
    },
    {
        id: 'IN',
        name: 'Indiana'
    },
    {
        id: 'IA',
        name: 'Iowa'
    },
    {
        id: 'KS',
        name: 'Kansas'
    },
    {
        id: 'KY',
        name: 'Kentucky'
    },
    {
        id: 'LA',
        name: 'Louisiana'
    },
    {
        id: 'ME',
        name: 'Maine'
    },
    {
        id: 'MD',
        name: 'Maryland'
    },
    {
        id: 'MA',
        name: 'Massachusetts'
    },
    {
        id: 'MI',
        name: 'Michigan'
    },
    {
        id: 'MN',
        name: 'Minnesota'
    },
    {
        id: 'MS',
        name: 'Mississippi'
    },
    {
        id: 'MO',
        name: 'Missouri'
    },
    {
        id: 'MT',
        name: 'Montana'
    },
    {
        id: 'NE',
        name: 'Nebraska'
    },
    {
        id: 'NV',
        name: 'Nevada'
    },
    {
        id: 'NH',
        name: 'New Hampshire'
    },
    {
        id: 'NJ',
        name: 'New Jersey'
    },
    {
        id: 'NM',
        name: 'New Mexico'
    },
    {
        id: 'NY',
        name: 'New York'
    },
    {
        id: 'NC',
        name: 'North Carolina'
    },
    {
        id: 'ND',
        name: 'North Dakota'
    },
    {
        id: 'OH',
        name: 'Ohio'
    },
    {
        id: 'OK',
        name: 'Oklahoma'
    },
    {
        id: 'OR',
        name: 'Oregon'
    },
    {
        id: 'PA',
        name: 'Pennsylvania'
    },
    {
        id: 'RI',
        name: 'Rhode Island'
    },
    {
        id: 'SC',
        name: 'South Carolina'
    },
    {
        id: 'SD',
        name: 'South Dakota'
    },
    {
        id: 'TN',
        name: 'Tennessee'
    },
    {
        id: 'TX',
        name: 'Texas'
    },
    {
        id: 'UT',
        name: 'Utah'
    },
    {
        id: 'VT',
        name: 'Vermont'
    },
    {
        id: 'VA',
        name: 'Virginia'
    },
    {
        id: 'WA',
        name: 'Washington'
    },
    {
        id: 'WV',
        name: 'West Virginia'
    },
    {
        id: 'WI',
        name: 'Wisconsin'
    },
    {
        id: 'WY',
        name: 'Wyoming'
    }
];
// FIPS → postal abbreviation map so we can resolve snapshot keys
const FIPS_TO_STATE_CODE = {
    '01': 'AL',
    '02': 'AK',
    '04': 'AZ',
    '05': 'AR',
    '06': 'CA',
    '08': 'CO',
    '09': 'CT',
    '10': 'DE',
    '11': 'DC',
    '12': 'FL',
    '13': 'GA',
    '15': 'HI',
    '16': 'ID',
    '17': 'IL',
    '18': 'IN',
    '19': 'IA',
    '20': 'KS',
    '21': 'KY',
    '22': 'LA',
    '23': 'ME',
    '24': 'MD',
    '25': 'MA',
    '26': 'MI',
    '27': 'MN',
    '28': 'MS',
    '29': 'MO',
    '30': 'MT',
    '31': 'NE',
    '32': 'NV',
    '33': 'NH',
    '34': 'NJ',
    '35': 'NM',
    '36': 'NY',
    '37': 'NC',
    '38': 'ND',
    '39': 'OH',
    '40': 'OK',
    '41': 'OR',
    '42': 'PA',
    '44': 'RI',
    '45': 'SC',
    '46': 'SD',
    '47': 'TN',
    '48': 'TX',
    '49': 'UT',
    '50': 'VT',
    '51': 'VA',
    '53': 'WA',
    '54': 'WV',
    '55': 'WI',
    '56': 'WY'
};
const resolveStateCode = (rawId)=>{
    if (rawId === null || rawId === undefined) return null;
    const trimmed = String(rawId).trim();
    if (!trimmed) return null;
    const upper = trimmed.toUpperCase();
    if (/^[A-Z]{2}$/.test(upper)) return upper;
    const fipsKey = trimmed.length === 1 ? trimmed.padStart(2, '0') : trimmed;
    if (FIPS_TO_STATE_CODE[fipsKey]) {
        return FIPS_TO_STATE_CODE[fipsKey];
    }
    return null;
};
const AdminStateExplorer = ({ currentUserRole = 'operator' })=>{
    _s();
    // Active jurisdiction: which country the *whole site* is in.
    const [region, setRegion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('unitedStates');
    // Selection inside that jurisdiction (state or country name)
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        id: 'CA',
        name: 'California'
    });
    const [viewAltitude, setViewAltitude] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const isUS = region === 'unitedStates';
    const zoomedIn = viewAltitude !== null && viewAltitude < 1.6;
    const quickStates = isUS && zoomedIn ? US_STATES : [];
    const displayStateCode = isUS ? resolveStateCode(selected.id) ?? String(selected.id ?? '') : String(selected.id ?? '');
    const snapshotKey = isUS ? resolveStateCode(selected.id) : null;
    const activeSnapshot = snapshotKey && __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stateSnapshots$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["STATE_SNAPSHOTS"][snapshotKey] ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stateSnapshots$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["STATE_SNAPSHOTS"][snapshotKey] : null;
    const coveragePct = activeSnapshot?.coverageScore ?? 0;
    const fullCoaRate = activeSnapshot?.fullCoaRate ?? 0;
    const jurisdiction = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jurisdictions$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["JURISDICTIONS"][region];
    const accessProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jurisdictions$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getAccessProfile"])(region, currentUserRole);
    const detailTitle = isUS && activeSnapshot?.name ? activeSnapshot.name : selected.name || jurisdiction?.name || 'Selected region';
    const detailKind = isUS ? 'State snapshot' : `${jurisdiction.name} snapshot`;
    const adminHref = jurisdiction?.defaultLandingAdminPath || (snapshotKey ? `/admin?state=${snapshotKey}` : '/admin');
    const handleRegionChange = (next)=>{
        setRegion(next);
        const label = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jurisdictions$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["JURISDICTIONS"][next]?.name ?? null;
        if (next === 'unitedStates') {
            setSelected((prev)=>prev && prev.id ? prev : {
                    id: 'CA',
                    name: 'California'
                });
        } else {
            setSelected({
                id: next,
                name: label
            });
        }
    };
    const handleStateSelectFromGlobe = (id, name)=>{
        setSelected({
            id,
            name: name || null
        });
    };
    const crumbScope = isUS ? 'US · States' : `${jurisdiction?.name ?? 'Global'} · Jurisdiction`;
    const crumbLine = selected.name ? `${displayStateCode} · ${selected.name} — metallic glass tiles punched out of a spinning globe.` : 'Drag, hover, and click the atlas to explore live coverage.';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "relative flex min-h-screen flex-col overflow-hidden bg-black text-slate-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-auto mx-auto w-full max-w-5xl px-4 pt-6 pb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-3 flex flex-wrap items-baseline gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-sky-400",
                                    children: crumbScope
                                }, void 0, false, {
                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                    lineNumber: 251,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[0.75rem] text-slate-400",
                                    children: crumbLine
                                }, void 0, false, {
                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                    lineNumber: 254,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AdminStateExplorer.tsx",
                            lineNumber: 250,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex rounded-full border border-slate-700 bg-black px-1 py-1 shadow-sm shadow-slate-900",
                                    children: Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jurisdictions$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["JURISDICTIONS"]).map((j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>handleRegionChange(j.id),
                                            className: 'rounded-full px-4 py-1.5 text-[11px] transition ' + (region === j.id ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/40' : 'text-slate-400 hover:text-slate-100'),
                                            children: j.name
                                        }, j.id, false, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 260,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                    lineNumber: 258,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-[11px] text-slate-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_0_4px_rgba(56,189,248,0.40)]"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 276,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Drag to spin · Hover to “lift” · Scroll to zoom · Click to drill in"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 277,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                    lineNumber: 275,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AdminStateExplorer.tsx",
                            lineNumber: 257,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AdminStateExplorer.tsx",
                    lineNumber: 249,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/AdminStateExplorer.tsx",
                lineNumber: 248,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-0 flex flex-1 items-center justify-center pt-24 pb-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-auto h-[80vh] w-[80vh] max-h-[720px] max-w-[720px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlobeStatesDynamic, {
                        region: region,
                        onRegionChange: handleRegionChange,
                        onStateSelect: handleStateSelectFromGlobe,
                        onViewChange: (alt)=>setViewAltitude(alt)
                    }, void 0, false, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 289,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/AdminStateExplorer.tsx",
                    lineNumber: 288,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/AdminStateExplorer.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-x-0 top-28 z-30 flex justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-auto w-full max-w-3xl px-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "ml-auto w-full max-w-md rounded-3xl border border-slate-700 bg-black/90 shadow-[0_22px_60px_rgba(0,0,0,0.75)] backdrop-blur",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "border-b border-slate-800 px-4 pb-2 pt-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sky-400",
                                        children: [
                                            displayStateCode ?? selected.id ?? '',
                                            " · ",
                                            detailKind
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 303,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-semibold text-slate-50",
                                        children: detailTitle
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 306,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-[0.78rem] text-slate-400",
                                        children: isUS && activeSnapshot ? 'Illustrative coverage metrics while we connect live COA feeds and lab integrations.' : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jurisdictions$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["JURISDICTIONS"][region]?.notes ?? 'Jurisdiction-level coverage view. COA feeds, lab pipes, and recall telemetry plug in here.'
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 309,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 302,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 pb-3 pt-3",
                                children: isUS && activeSnapshot ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                            className: "mb-4 grid grid-cols-2 gap-3 text-[0.78rem]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                            className: "text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500",
                                                            children: "Batches tracked"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 324,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                            className: "mt-1 text-sm font-semibold text-slate-50",
                                                            children: formatNumber(activeSnapshot.batchesTracked)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 327,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 323,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                            className: "text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500",
                                                            children: "Labs reporting"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 332,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                            className: "mt-1 text-sm font-semibold text-slate-50",
                                                            children: formatNumber(activeSnapshot.labsReporting)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 335,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 331,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                            className: "text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500",
                                                            children: "Coverage score"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 340,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                            className: "mt-1 text-sm font-semibold text-slate-50",
                                                            children: [
                                                                coveragePct,
                                                                "/100"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 343,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 339,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                            className: "text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500",
                                                            children: "Recent recalls"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 348,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                            className: "mt-1 text-sm font-semibold text-slate-50",
                                                            children: activeSnapshot.recentRecalls
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 351,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 322,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between text-[0.7rem] text-slate-400",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium uppercase tracking-[0.16em]",
                                                                    children: "Coverage"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 360,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-slate-100",
                                                                    children: [
                                                                        coveragePct,
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 363,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 359,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1 h-2 rounded-full bg-slate-800",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 shadow-[0_0_12px_rgba(56,189,248,0.6)]",
                                                                style: {
                                                                    width: `${Math.min(coveragePct, 100)}%`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 368,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 367,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 358,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between text-[0.7rem] text-slate-400",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium uppercase tracking-[0.16em]",
                                                                    children: "Full COA coverage"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 379,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-slate-100",
                                                                    children: [
                                                                        fullCoaRate,
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 382,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 378,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1 h-2 rounded-full bg-slate-800",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 shadow-[0_0_10px_rgba(129,140,248,0.6)]",
                                                                style: {
                                                                    width: `${Math.min(fullCoaRate, 100)}%`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 387,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 386,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 377,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[0.7rem] text-slate-500",
                                                    children: "Metrics shown are illustrative only. In production this panel will be driven by live batch, lab, and recall data from your CartFax deployment."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 357,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3 text-[0.78rem] text-slate-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                "You're viewing",
                                                ' ',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: jurisdiction.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                ' ',
                                                "as a",
                                                ' ',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: currentUserRole
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 411,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                ". Legal status:",
                                                ' ',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: jurisdiction.legalStatus
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 415,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 405,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-1 text-[0.72rem] text-slate-400",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: [
                                                        "• PII visibility:",
                                                        ' ',
                                                        accessProfile.canSeePII ? 'allowed' : 'restricted'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 421,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: [
                                                        "• Government dashboards:",
                                                        ' ',
                                                        accessProfile.canSeeGovDashboards ? 'allowed' : 'restricted'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 425,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: [
                                                        "• Operator dashboards:",
                                                        ' ',
                                                        accessProfile.canSeeOperatorDashboards ? 'allowed' : 'restricted'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 431,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: [
                                                        "• Aggregated analytics:",
                                                        ' ',
                                                        accessProfile.canSeeAggregatedAnalytics ? 'allowed' : 'restricted'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 437,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 420,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[0.7rem] text-slate-500",
                                            children: [
                                                "Backend note: route reads/writes for this view through the",
                                                ' ',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                    className: "rounded bg-slate-900 px-1 py-0.5",
                                                    children: [
                                                        "/api/",
                                                        jurisdiction.apiNamespace
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                ' ',
                                                "namespace and enforce the same access rules on every request."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 444,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                    lineNumber: 404,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 319,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                                className: "flex items-center justify-between gap-3 border-t border-slate-800 px-4 py-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: adminHref,
                                        className: "inline-flex items-center justify-center rounded-full bg-sky-500 px-3 py-1.5 text-[0.78rem] font-medium text-white shadow-sm shadow-sky-500/40 transition hover:bg-sky-600",
                                        children: "Open admin data tools"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 457,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            setSelected({
                                                id: null,
                                                name: null
                                            });
                                        },
                                        className: "text-[11px] text-slate-500 hover:text-slate-300",
                                        children: "Dismiss"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 463,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 456,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 301,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/AdminStateExplorer.tsx",
                    lineNumber: 300,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/AdminStateExplorer.tsx",
                lineNumber: 299,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/AdminStateExplorer.tsx",
        lineNumber: 246,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AdminStateExplorer, "ySoL8NaahGYWkSQcMHhuKJoI9Hk=");
_c1 = AdminStateExplorer;
const __TURBOPACK__default__export__ = AdminStateExplorer;
var _c, _c1;
__turbopack_context__.k.register(_c, "GlobeStatesDynamic");
__turbopack_context__.k.register(_c1, "AdminStateExplorer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/index.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/index.tsx
__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AdminStateExplorer$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AdminStateExplorer.tsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function Home() {
    _s();
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSession"])();
    // Same atlas, but guests are allowed and treated as "guest" role
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AdminStateExplorer$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        session: session ?? null
    }, void 0, false, {
        fileName: "[project]/pages/index.tsx",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}
_s(Home, "xGqsfA9Yc4bug2CeORcyTsHwvXY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/index.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__0ef29a66._.js.map