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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stateSnapshots$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/stateSnapshots.ts [client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const GlobeStates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/components/GlobeStates.tsx [client] (ecmascript, next/dynamic entry, async loader)"), {
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
            lineNumber: 11,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
});
_c = GlobeStates;
// Regions available on the globe
const regionLabels = [
    {
        id: 'unitedStates',
        label: 'United States'
    },
    {
        id: 'canada',
        label: 'Canada'
    },
    {
        id: 'mexico',
        label: 'Mexico'
    },
    {
        id: 'netherlands',
        label: 'Netherlands'
    }
];
// Simple helper for formatting numbers in the UI
const formatNumber = (n)=>n.toLocaleString(undefined, {
        maximumFractionDigits: 0
    });
// For the quick-jump pill list when zoomed in on the US
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
/**
 * Take whatever ID the globe gives us (e.g. "CA", "06", or even 6)
 * and resolve a two-letter state code suitable for STATE_SNAPSHOTS lookups.
 * This is where the “California works once, then breaks” bug was coming from.
 */ const resolveStateCode = (rawId)=>{
    if (rawId === null || rawId === undefined) return null;
    // Normalize everything to a trimmed string first
    const trimmed = String(rawId).trim();
    if (!trimmed) return null;
    const upper = trimmed.toUpperCase();
    // Already looks like a postal code (e.g. "CA")
    if (/^[A-Z]{2}$/.test(upper)) return upper;
    // FIPS → postal (e.g. "06" → "CA"). Handle unpadded numbers like "6".
    const fipsKey = trimmed.length === 1 ? trimmed.padStart(2, '0') : trimmed;
    if (FIPS_TO_STATE_CODE[fipsKey]) {
        return FIPS_TO_STATE_CODE[fipsKey];
    }
    return null;
};
const AdminStateExplorer = ()=>{
    _s();
    const [region, setRegion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('unitedStates');
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        id: 'CA',
        name: 'California'
    });
    const [viewAltitude, setViewAltitude] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const isUS = region === 'unitedStates';
    const zoomedIn = viewAltitude !== null && viewAltitude < 1.6;
    const quickStates = isUS && zoomedIn ? US_STATES : [];
    // For UI: what code should we *show* (CA vs 06)?
    const displayStateCode = isUS ? resolveStateCode(selected.id) ?? selected.id : selected.id;
    // For metrics: what key should we use to look up STATE_SNAPSHOTS?
    const snapshotKey = isUS ? resolveStateCode(selected.id) : null;
    const activeSnapshot = snapshotKey && __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stateSnapshots$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["STATE_SNAPSHOTS"][snapshotKey] ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$stateSnapshots$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["STATE_SNAPSHOTS"][snapshotKey] : null;
    const coveragePct = activeSnapshot?.coverageScore ?? 0;
    const detailTitle = activeSnapshot?.name || selected.name || (isUS ? 'United States of America' : 'Selected region');
    const detailKind = isUS ? 'State snapshot' : 'Region snapshot';
    const handleRegionChange = (next)=>{
        setRegion(next);
        const label = regionLabels.find((r)=>r.id === next)?.label ?? null;
        if (next === 'unitedStates') {
            // When coming back to US, default to CA if nothing obvious is selected
            setSelected((prev)=>prev && prev.id ? prev : {
                    id: 'CA',
                    name: 'California'
                });
        } else {
            // For non-US regions we treat the region itself as the "selection"
            setSelected({
                id: next,
                name: label
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "relative min-h-[calc(100vh-3.5rem)] bg-slate-950 text-slate-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 lg:flex-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "mb-6 flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-sky-400",
                                            children: "CartFax · Atlas"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 236,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "mt-1 text-2xl font-semibold tracking-tight text-slate-50",
                                            children: "COA coverage across legal markets"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 239,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 max-w-xl text-sm text-slate-400",
                                            children: "Spin the globe and click any state or region to see where CartFax is actively tracking batches, labs, and recalls. Data here is synthetic while we wire live feeds into the atlas."
                                        }, void 0, false, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 242,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-[0_24px_80px_rgba(15,23,42,0.9)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pointer-events-none absolute -left-28 -top-32 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 253,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-[72px]"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 254,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative flex flex-col gap-4 p-4 lg:p-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex rounded-full border border-slate-200 bg-white px-1 py-1 shadow-sm",
                                                        children: regionLabels.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>handleRegionChange(r.id),
                                                                className: 'rounded-full px-4 py-1.5 text-[11px] transition ' + (region === r.id ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/40' : 'text-slate-500 hover:text-slate-900'),
                                                                children: r.label
                                                            }, r.id, false, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 261,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 259,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 text-[11px] text-slate-500",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "inline-flex h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_0_4px_rgba(56,189,248,0.40)]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 277,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Drag to spin · Hover to “lift” · Scroll to zoom · Click to drill in"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 278,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 276,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 258,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlobeStates, {
                                                    region: region,
                                                    onRegionChange: handleRegionChange,
                                                    onStateSelect: (id, name)=>setSelected({
                                                            id: id || null,
                                                            name: name || null
                                                        }),
                                                    onViewChange: (alt)=>setViewAltitude(alt)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 287,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 286,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 256,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "w-full max-w-sm space-y-4 lg:w-[320px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "rounded-3xl border border-slate-800 bg-slate-900/70 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.65)] backdrop-blur",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-400",
                                        children: "Why this exists"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 306,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-2 text-lg font-semibold text-slate-50",
                                        children: "A single cockpit for cannabis safety data"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 309,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-sm text-slate-400",
                                        children: "CartFax ingests COAs from licensed labs, normalizes the data, and maps it down to batches, dispensaries, and brands. The atlas gives regulators, operators, and patients a live view of where safety data is strong—and where it's missing."
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 312,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-[0.72rem] text-slate-500",
                                        children: "Today you're seeing demo numbers so we can iterate on the experience while we finish wiring live ingestion, deduplication, and alerting pipelines."
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 318,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 305,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "rounded-3xl border border-dashed border-emerald-500/40 bg-emerald-500/5 p-4 text-sm text-emerald-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-emerald-300",
                                        children: "Admin access"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 326,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-sm text-emerald-50",
                                        children: "If you're an operator, lab, or regulator, you can use the admin tools to manage batches, COA uploads, and locations in more detail."
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 329,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-[0.75rem] text-emerald-200/80",
                                        children: "Use the “Log in” button in the top-right, then come back to this atlas or open the dedicated admin hub."
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 334,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 325,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 304,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminStateExplorer.tsx",
                lineNumber: 230,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            quickStates.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "pointer-events-auto fixed left-6 top-1/2 z-30 hidden max-h-[420px] w-[220px] -translate-y-1/2 rounded-3xl border border-slate-200 bg-white/95 p-3 shadow-[0_18px_60px_rgba(15,23,42,0.16)] backdrop-blur lg:block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500",
                        children: "Quick jump"
                    }, void 0, false, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 345,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-[360px] overflow-y-auto pr-1",
                        children: quickStates.map((s)=>{
                            const currentCode = resolveStateCode(selected.id);
                            const isSelectedState = currentCode && currentCode === s.id || selected.id === s.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setSelected({
                                        id: s.id,
                                        name: s.name
                                    }),
                                className: 'mb-[3px] w-full rounded-full px-2 py-1 text-left text-[0.72rem] transition ' + (isSelectedState ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'),
                                children: [
                                    s.id,
                                    " · ",
                                    s.name
                                ]
                            }, s.id, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 356,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 348,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminStateExplorer.tsx",
                lineNumber: 344,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            selected.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "fixed bottom-6 right-6 z-30 max-w-sm rounded-3xl border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.35)] backdrop-blur",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "border-b border-slate-100 px-4 pb-2 pt-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sky-500",
                                children: [
                                    displayStateCode ?? selected.id ?? '',
                                    " · ",
                                    detailKind
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 381,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold text-slate-900",
                                children: detailTitle
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 384,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-[0.78rem] text-slate-500",
                                children: activeSnapshot ? 'Synthetic coverage metrics while we connect live COA feeds and lab integrations.' : 'We haven’t wired live coverage here yet. COA parsing and map tiles are coming soon.'
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 387,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 380,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    activeSnapshot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 pb-3 pt-3",
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
                                                lineNumber: 398,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                className: "mt-1 text-sm font-semibold text-slate-900",
                                                children: formatNumber(activeSnapshot.batchesTracked)
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 401,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 397,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                className: "text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500",
                                                children: "Labs reporting"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 406,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                className: "mt-1 text-sm font-semibold text-slate-900",
                                                children: formatNumber(activeSnapshot.labsReporting)
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 409,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 405,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                className: "text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500",
                                                children: "Coverage score"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 414,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                className: "mt-1 text-sm font-semibold text-slate-900",
                                                children: [
                                                    activeSnapshot.coverageScore,
                                                    "/100"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 417,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 413,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                className: "text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500",
                                                children: "Recalls"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 422,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                className: "mt-1 text-sm font-semibold text-slate-900",
                                                children: activeSnapshot.recentRecalls
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 425,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 421,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 396,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between text-[0.7rem] text-slate-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium uppercase tracking-[0.16em]",
                                                children: "Coverage"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 434,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-slate-700",
                                                children: [
                                                    coveragePct,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 437,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 433,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1 h-2 rounded-full bg-slate-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 shadow-[0_0_12px_rgba(56,189,248,0.6)]",
                                            style: {
                                                width: `${Math.min(coveragePct, 100)}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 442,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 441,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-[0.7rem] text-slate-500",
                                        children: [
                                            coveragePct,
                                            "% estimated coverage of the legal market in this state."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 449,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 432,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 395,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "flex items-center justify-between gap-3 border-t border-slate-100 px-4 py-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin",
                                className: "inline-flex items-center justify-center rounded-full bg-sky-500 px-3 py-1.5 text-[0.78rem] font-medium text-white shadow-sm shadow-sky-500/40 transition hover:bg-sky-600",
                                children: "Open admin data tools"
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 458,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setSelected({
                                        id: null,
                                        name: null
                                    }),
                                className: "text-[11px] text-slate-400 hover:text-slate-600",
                                children: "Dismiss"
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 464,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 457,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminStateExplorer.tsx",
                lineNumber: 379,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/AdminStateExplorer.tsx",
        lineNumber: 229,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AdminStateExplorer, "r6REXiJi9Ektk49hPL62nfbUEf0=");
_c1 = AdminStateExplorer;
const __TURBOPACK__default__export__ = AdminStateExplorer;
var _c, _c1;
__turbopack_context__.k.register(_c, "GlobeStates");
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

//# sourceMappingURL=%5Broot-of-the-server%5D__8bee4b01._.js.map