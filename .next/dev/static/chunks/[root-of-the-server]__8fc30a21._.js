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
"[project]/components/AdminStateExplorer.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/AdminStateExplorer.tsx
__turbopack_context__.s([
    "default",
    ()=>AdminStateExplorer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$simple$2d$maps$2f$dist$2f$index$2e$umd$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-simple-maps/dist/index.umd.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
const NAME_TO_CODE = {
    Alabama: 'AL',
    Alaska: 'AK',
    Arizona: 'AZ',
    Arkansas: 'AR',
    California: 'CA',
    Colorado: 'CO',
    Connecticut: 'CT',
    Delaware: 'DE',
    'District of Columbia': 'DC',
    Florida: 'FL',
    Georgia: 'GA',
    Hawaii: 'HI',
    Idaho: 'ID',
    Illinois: 'IL',
    Indiana: 'IN',
    Iowa: 'IA',
    Kansas: 'KS',
    Kentucky: 'KY',
    Louisiana: 'LA',
    Maine: 'ME',
    Maryland: 'MD',
    Massachusetts: 'MA',
    Michigan: 'MI',
    Minnesota: 'MN',
    Mississippi: 'MS',
    Missouri: 'MO',
    Montana: 'MT',
    Nebraska: 'NE',
    Nevada: 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    Ohio: 'OH',
    Oklahoma: 'OK',
    Oregon: 'OR',
    Pennsylvania: 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    Tennessee: 'TN',
    Texas: 'TX',
    Utah: 'UT',
    Vermont: 'VT',
    Virginia: 'VA',
    Washington: 'WA',
    'West Virginia': 'WV',
    Wisconsin: 'WI',
    Wyoming: 'WY',
    'Puerto Rico': 'PR'
};
/**
 * Approximate state centers, used only for animation
 * (map shapes are still the exact official outlines).
 */ const STATE_POSITIONS = {
    // West / AK / HI
    WA: {
        x: 10,
        y: 18
    },
    OR: {
        x: 13,
        y: 25
    },
    CA: {
        x: 13,
        y: 40
    },
    NV: {
        x: 21,
        y: 35
    },
    AZ: {
        x: 23,
        y: 49
    },
    UT: {
        x: 23,
        y: 39
    },
    CO: {
        x: 30,
        y: 38
    },
    NM: {
        x: 30,
        y: 50
    },
    AK: {
        x: 10,
        y: 85
    },
    HI: {
        x: 21,
        y: 88
    },
    ID: {
        x: 19,
        y: 27
    },
    MT: {
        x: 26,
        y: 20
    },
    WY: {
        x: 26,
        y: 30
    },
    // Rockies / Plains / Upper Midwest
    ND: {
        x: 36,
        y: 20
    },
    SD: {
        x: 36,
        y: 28
    },
    NE: {
        x: 36,
        y: 36
    },
    KS: {
        x: 36,
        y: 44
    },
    MN: {
        x: 44,
        y: 22
    },
    IA: {
        x: 44,
        y: 30
    },
    MO: {
        x: 44,
        y: 40
    },
    WI: {
        x: 50,
        y: 22
    },
    IL: {
        x: 50,
        y: 32
    },
    MI: {
        x: 58,
        y: 22
    },
    IN: {
        x: 58,
        y: 32
    },
    OH: {
        x: 62,
        y: 32
    },
    // South / Gulf / Lower Midwest
    TX: {
        x: 40,
        y: 60
    },
    OK: {
        x: 39,
        y: 52
    },
    AR: {
        x: 44,
        y: 48
    },
    LA: {
        x: 44,
        y: 58
    },
    MS: {
        x: 50,
        y: 54
    },
    AL: {
        x: 54,
        y: 54
    },
    TN: {
        x: 56,
        y: 46
    },
    KY: {
        x: 58,
        y: 40
    },
    GA: {
        x: 60,
        y: 60
    },
    FL: {
        x: 62,
        y: 72
    },
    SC: {
        x: 64,
        y: 58
    },
    NC: {
        x: 68,
        y: 52
    },
    VA: {
        x: 70,
        y: 44
    },
    WV: {
        x: 66,
        y: 40
    },
    // Northeast / Mid-Atlantic
    PA: {
        x: 66,
        y: 34
    },
    NY: {
        x: 68,
        y: 26
    },
    VT: {
        x: 70,
        y: 20
    },
    NH: {
        x: 73,
        y: 19
    },
    ME: {
        x: 80,
        y: 15
    },
    MA: {
        x: 75,
        y: 24
    },
    RI: {
        x: 77,
        y: 26
    },
    CT: {
        x: 75,
        y: 28
    },
    NJ: {
        x: 72,
        y: 30
    },
    DE: {
        x: 73,
        y: 34
    },
    MD: {
        x: 71,
        y: 36
    },
    DC: {
        x: 70,
        y: 38
    },
    PR: {
        x: 78,
        y: 80
    }
};
// Dense cluster (New England / Mid-Atlantic)
const DENSE_STATES = new Set([
    'RI',
    'CT',
    'MA',
    'NH',
    'VT',
    'NJ',
    'DE',
    'MD',
    'DC',
    'NY'
]);
// Tiny states that should blow up on hover
const TINY_STATES = new Set([
    'RI',
    'CT',
    'DE',
    'NJ',
    'MA',
    'DC'
]);
// New England detached to the right
const NEW_ENGLAND_DETACHED = new Set([
    'ME',
    'NH',
    'VT',
    'MA',
    'RI',
    'CT'
]);
// Layout offsets for detached New England — pulled in so they’re fully in-frame
const NEW_ENGLAND_LAYOUT = {
    ME: {
        dx: 45,
        dy: -60
    },
    NH: {
        dx: 45,
        dy: -25
    },
    VT: {
        dx: 45,
        dy: 10
    },
    MA: {
        dx: 45,
        dy: 45
    },
    RI: {
        dx: 45,
        dy: 80
    },
    CT: {
        dx: 45,
        dy: 115
    }
};
function generateMetrics(code) {
    const base = code.charCodeAt(0) + code.charCodeAt(1);
    const clamp = (v, min, max)=>Math.min(max, Math.max(min, v));
    return {
        batchesTracked: clamp(260 + base % 320, 120, 580),
        labsReporting: clamp(3 + base % 9, 2, 14),
        recentRecalls: base % 6,
        passingRate: clamp(82 + base % 11, 78, 97)
    };
}
function getGeographyStyle(isSelected, transform) {
    // Default stroke: same family of blue as hover halo so it looks cohesive even at rest
    const baseStroke = isSelected ? '#0ea5e9' : '#38bdf8';
    const shared = {
        transform,
        transformBox: 'fill-box',
        transformOrigin: 'center',
        shapeRendering: 'geometricPrecision',
        vectorEffect: 'non-scaling-stroke',
        strokeLinejoin: 'round',
        strokeLinecap: 'round',
        outline: 'none',
        willChange: 'transform, filter',
        transition: 'fill 140ms ease-out, stroke 140ms ease-out, filter 140ms ease-out, transform 120ms ease-out'
    };
    return {
        default: {
            ...shared,
            fill: 'url(#stateGlass)',
            stroke: baseStroke,
            strokeWidth: 1,
            filter: 'drop-shadow(0 4px 7px rgba(15,23,42,0.65))'
        },
        hover: {
            ...shared,
            fill: 'url(#stateGlassHover)',
            stroke: '#e5f5ff',
            strokeWidth: 1.15,
            cursor: 'pointer',
            filter: 'drop-shadow(0 9px 16px rgba(37,99,235,0.9))'
        },
        pressed: {
            ...shared,
            fill: 'url(#stateGlassActive)',
            stroke: '#020617',
            strokeWidth: 1.1,
            filter: 'drop-shadow(0 11px 20px rgba(22,101,52,0.9))'
        }
    };
}
const DEFAULT_STATE = {
    code: 'CA',
    name: 'California'
};
const REGIONS = [
    {
        id: 'us',
        label: 'United States',
        pill: 'US · States',
        earthPosition: '42% 52%'
    },
    {
        id: 'ca',
        label: 'Canada',
        pill: 'Canada · Provinces',
        earthPosition: '58% 50%'
    }
];
function AdminStateExplorer() {
    _s();
    const { data: session, status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSession"])();
    const isLoggedIn = status === 'authenticated';
    const [selectedState, setSelectedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_STATE);
    const [hoveredCode, setHoveredCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pointer, setPointer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tilt, setTilt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [detailPanel, setDetailPanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [regionIndex, setRegionIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const activeRegion = REGIONS[regionIndex];
    const metrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminStateExplorer.useMemo[metrics]": ()=>generateMetrics(selectedState.code)
    }["AdminStateExplorer.useMemo[metrics]"], [
        selectedState.code
    ]);
    const mapCardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleMapMouseMove = (event)=>{
        const rect = mapCardRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        setPointer({
            x,
            y
        });
        const rotateX = (y - 0.5) * 5;
        const rotateY = (0.5 - x) * 9;
        setTilt({
            x: rotateY,
            y: rotateX
        });
    };
    const handleMapMouseLeave = ()=>{
        setPointer(null);
        setTilt({
            x: 0,
            y: 0
        });
    };
    const handleStateClick = (code, name, evt)=>{
        const nextState = {
            code,
            name
        };
        setSelectedState(nextState);
        if (mapCardRef.current && evt && typeof evt.clientX === 'number') {
            const rect = mapCardRef.current.getBoundingClientRect();
            const x = (evt.clientX - rect.left) / rect.width;
            const y = (evt.clientY - rect.top) / rect.height;
            const clampedX = Math.min(0.8, Math.max(0.2, x));
            const clampedY = Math.min(0.8, Math.max(0.2, y));
            setDetailPanel({
                state: nextState,
                x: clampedX,
                y: clampedY
            });
        } else {
            setDetailPanel({
                state: nextState,
                x: 0.5,
                y: 0.5
            });
        }
    };
    const handleClosePanel = ()=>setDetailPanel(null);
    const currentLabel = `${selectedState.code} · ${selectedState.name}`;
    void pointer;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#f6f7f8] text-slate-900",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "mx-auto flex max-w-6xl flex-col gap-4 px-4 pb-16 pt-4 md:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "pt-1",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-balance text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl lg:text-4xl",
                        children: "Regional cannabis safety & COA explorer"
                    }, void 0, false, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 315,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/AdminStateExplorer.tsx",
                    lineNumber: 314,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "relative mt-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pointer-events-none absolute inset-x-6 top-[-64px] h-72 rounded-[80px] bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.35),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(56,189,248,0.35),transparent_55%)] blur-3xl"
                        }, void 0, false, {
                            fileName: "[project]/components/AdminStateExplorer.tsx",
                            lineNumber: 323,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: mapCardRef,
                            onMouseMove: handleMapMouseMove,
                            onMouseLeave: handleMapMouseLeave,
                            className: "relative mx-auto max-w-6xl rounded-[48px] border border-sky-400/45 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-50/0 px-[1.5px] pb-[1.5px] pt-[1.5px] shadow-[0_40px_120px_rgba(15,23,42,0.18)]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative overflow-hidden rounded-[46px] bg-gradient-to-b from-slate-100 via-slate-50 to-transparent px-5 pb-6 pt-5 md:px-7 md:pb-8 md:pt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative z-10 mx-auto flex max-w-5xl flex-col gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center justify-between gap-3 px-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-600",
                                                            children: activeRegion.pill
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 337,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-slate-600",
                                                            children: [
                                                                currentLabel,
                                                                " · True state boundaries on a glass atlas. Hover to tease them apart, click to drill in."
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 340,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 336,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-[11px] font-medium text-slate-500",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "inline-flex h-2 w-2 rounded-full bg-sky-500 shadow-[0_0_0_4px_rgba(56,189,248,0.35)]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 346,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Move your mouse · Click a state"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 347,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 345,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 335,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-2 px-1",
                                            children: REGIONS.map((region, idx)=>{
                                                const active = idx === regionIndex;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setRegionIndex(idx),
                                                    className: 'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ' + (active ? 'border-sky-500 bg-sky-500 text-white shadow-[0_10px_30px_rgba(56,189,248,0.55)]' : 'border-slate-300 bg-white/80 text-slate-700 hover:border-sky-400 hover:text-sky-700'),
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: region.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 367,
                                                        columnNumber: 25
                                                    }, this)
                                                }, region.id, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 352,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative mx-auto mt-2 aspect-[19/10] w-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pointer-events-none absolute inset-[14px] rounded-[999px] bg-[url('/earth-hero.jpg')] bg-cover bg-no-repeat",
                                                    style: {
                                                        backgroundPosition: activeRegion.earthPosition,
                                                        transition: 'background-position 600ms ease-out'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 rounded-[999px] bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.9),transparent_60%),radial-gradient(circle_at_70%_82%,rgba(148,163,184,0.65),transparent_60%),radial-gradient(circle_at_center,rgba(59,130,246,0.6),transparent_70%)] mix-blend-soft-light"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 384,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 376,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pointer-events-none absolute inset-x-20 bottom-4 h-24 rounded-[999px] bg-gradient-to-b from-transparent via-slate-700/35 to-black/75 blur-2xl"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 388,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative z-10 h-full w-full overflow-hidden",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex h-full w-full transition-transform duration-500 ease-out",
                                                        style: {
                                                            transform: `translateX(-${regionIndex * 100}%)`
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-full w-full flex-none",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        transform: `perspective(1600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) rotateZ(-3deg)`
                                                                    },
                                                                    className: "h-full w-full transition-transform duration-150 ease-out",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$simple$2d$maps$2f$dist$2f$index$2e$umd$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ComposableMap"], {
                                                                        projection: "geoAlbersUsa",
                                                                        projectionConfig: {
                                                                            scale: 1300
                                                                        },
                                                                        width: 975,
                                                                        height: 610,
                                                                        className: "relative h-full w-full",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                                                                                        id: "stateGlass",
                                                                                        cx: "30%",
                                                                                        cy: "20%",
                                                                                        r: "98%",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                offset: "0%",
                                                                                                stopColor: "#f9fafb",
                                                                                                stopOpacity: "1"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                lineNumber: 423,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                offset: "24%",
                                                                                                stopColor: "#e5e7eb",
                                                                                                stopOpacity: "0.98"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                lineNumber: 428,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                offset: "50%",
                                                                                                stopColor: "#ffffff",
                                                                                                stopOpacity: "1"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                lineNumber: 433,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                offset: "70%",
                                                                                                stopColor: "#e5e7eb",
                                                                                                stopOpacity: "0.96"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                lineNumber: 438,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                offset: "82%",
                                                                                                stopColor: "#166534",
                                                                                                stopOpacity: "0.22"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                lineNumber: 443,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                offset: "100%",
                                                                                                stopColor: "#38bdf8",
                                                                                                stopOpacity: "0.98"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                lineNumber: 448,
                                                                                                columnNumber: 33
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                        lineNumber: 417,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                                                                                        id: "stateGlassHover",
                                                                                        cx: "28%",
                                                                                        cy: "18%",
                                                                                        r: "100%",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                offset: "0%",
                                                                                                stopColor: "#ffffff",
                                                                                                stopOpacity: "1"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                lineNumber: 462,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                offset: "30%",
                                                                                                stopColor: "#e0f2fe",
                                                                                                stopOpacity: "1"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                lineNumber: 467,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                offset: "60%",
                                                                                                stopColor: "#60a5fa",
                                                                                                stopOpacity: "0.99"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                lineNumber: 472,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                offset: "82%",
                                                                                                stopColor: "#22c55e",
                                                                                                stopOpacity: "0.8"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                lineNumber: 477,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                offset: "100%",
                                                                                                stopColor: "#14532d",
                                                                                                stopOpacity: "0.9"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                lineNumber: 482,
                                                                                                columnNumber: 33
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                        lineNumber: 456,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                                                                                        id: "stateGlassActive",
                                                                                        cx: "30%",
                                                                                        cy: "18%",
                                                                                        r: "100%",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                offset: "0%",
                                                                                                stopColor: "#f0fdf4",
                                                                                                stopOpacity: "1"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                lineNumber: 496,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                offset: "30%",
                                                                                                stopColor: "#bbf7d0",
                                                                                                stopOpacity: "1"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                lineNumber: 501,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                offset: "60%",
                                                                                                stopColor: "#38bdf8",
                                                                                                stopOpacity: "0.99"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                lineNumber: 506,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                offset: "86%",
                                                                                                stopColor: "#166534",
                                                                                                stopOpacity: "0.82"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                lineNumber: 511,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                                offset: "100%",
                                                                                                stopColor: "#020617",
                                                                                                stopOpacity: "1"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                lineNumber: 516,
                                                                                                columnNumber: 33
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                        lineNumber: 490,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 415,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$simple$2d$maps$2f$dist$2f$index$2e$umd$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Geographies"], {
                                                                                geography: GEO_URL,
                                                                                children: ({ geographies })=>{
                                                                                    const hoverPos = hoveredCode ? STATE_POSITIONS[hoveredCode] : null;
                                                                                    const hoveredIsTiny = hoveredCode ? TINY_STATES.has(hoveredCode) : false;
                                                                                    const hoveredIsDense = hoveredCode ? DENSE_STATES.has(hoveredCode) : false;
                                                                                    const items = geographies.map((geo)=>{
                                                                                        const name = geo.properties?.name;
                                                                                        if (!name) return null;
                                                                                        const code = NAME_TO_CODE[name] ?? name;
                                                                                        const isSelected = code === selectedState.code;
                                                                                        const isTiny = TINY_STATES.has(code);
                                                                                        const isDetachedNE = NEW_ENGLAND_DETACHED.has(code);
                                                                                        const pos = STATE_POSITIONS[code] ?? {
                                                                                            x: 50,
                                                                                            y: 50
                                                                                        };
                                                                                        const sx = pos.x / 100;
                                                                                        const sy = pos.y / 100;
                                                                                        // Base: pull detached New England out into a clean column on the right
                                                                                        let baseTx = 0;
                                                                                        let baseTy = 0;
                                                                                        if (isDetachedNE) {
                                                                                            const layout = NEW_ENGLAND_LAYOUT[code];
                                                                                            if (layout) {
                                                                                                baseTx += layout.dx;
                                                                                                baseTy += layout.dy;
                                                                                            }
                                                                                        }
                                                                                        const baseScale = isDetachedNE ? 1.3 : 1.0;
                                                                                        let scale = baseScale;
                                                                                        let tx = baseTx;
                                                                                        let ty = baseTy;
                                                                                        if (hoverPos) {
                                                                                            const cx = hoverPos.x / 100;
                                                                                            const cy = hoverPos.y / 100;
                                                                                            const dx = sx - cx;
                                                                                            const dy = sy - cy;
                                                                                            const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
                                                                                            const isHover = code === hoveredCode;
                                                                                            // Smooth radial “break apart” from hovered center
                                                                                            const radius = 0.6;
                                                                                            const influence = Math.max(0, 1 - dist / radius);
                                                                                            let sepAmp = 16;
                                                                                            if (DENSE_STATES.has(code)) sepAmp = 20;
                                                                                            if (isTiny) sepAmp = 22;
                                                                                            if (isDetachedNE) sepAmp *= 0.9;
                                                                                            const separation = influence * sepAmp;
                                                                                            const nx = dx / dist;
                                                                                            const ny = dy / dist;
                                                                                            if (!isHover) {
                                                                                                tx += separation * nx;
                                                                                                ty += separation * ny;
                                                                                            }
                                                                                            const neighborRadius = hoveredIsTiny ? 0.24 : 0.18;
                                                                                            const isNeighbor = !isHover && dist < neighborRadius;
                                                                                            if (isHover) {
                                                                                                if (isTiny) {
                                                                                                    // Rhode Island etc – big but still elegant
                                                                                                    scale = baseScale * 2.4;
                                                                                                } else if (DENSE_STATES.has(code)) {
                                                                                                    scale = baseScale * 1.3;
                                                                                                } else {
                                                                                                    scale = baseScale * 1.18;
                                                                                                }
                                                                                            } else if (isNeighbor) {
                                                                                                if (hoveredIsTiny || hoveredIsDense || isTiny) {
                                                                                                    scale = baseScale * 1.16;
                                                                                                } else {
                                                                                                    scale = baseScale * 1.08;
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                        if (isSelected) {
                                                                                            scale *= 1.03;
                                                                                        }
                                                                                        const transformStr = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
                                                                                        const style = getGeographyStyle(isSelected, transformStr);
                                                                                        return {
                                                                                            geo,
                                                                                            name,
                                                                                            code,
                                                                                            style
                                                                                        };
                                                                                    }).filter(Boolean);
                                                                                    const hoveredItem = hoveredCode ? items.find((i)=>i.code === hoveredCode) : null;
                                                                                    const baseItems = hoveredCode ? items.filter((i)=>i.code !== hoveredCode) : items;
                                                                                    const renderGeo = (item, suffix)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$simple$2d$maps$2f$dist$2f$index$2e$umd$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Geography"], {
                                                                                            geography: item.geo,
                                                                                            onMouseEnter: ()=>setHoveredCode(item.code),
                                                                                            onMouseLeave: ()=>setHoveredCode((prev)=>prev === item.code ? null : prev),
                                                                                            onClick: (_geo, evt)=>handleStateClick(item.code, item.name, evt),
                                                                                            style: item.style,
                                                                                            className: "transition-transform duration-150 ease-out [transform-origin:center]"
                                                                                        }, item.geo.rsmKey + suffix, false, {
                                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                            lineNumber: 681,
                                                                                            columnNumber: 35
                                                                                        }, this);
                                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                        children: [
                                                                                            baseItems.map((item)=>renderGeo(item, '-base')),
                                                                                            hoveredItem && renderGeo(hoveredItem, '-hovered')
                                                                                        ]
                                                                                    }, void 0, true);
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 524,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 406,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 400,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 399,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-full w-full flex-none",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex h-full w-full flex-col items-center justify-center gap-4 rounded-[40px] bg-white/70 backdrop-blur-md",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500",
                                                                            children: "Canada · Provinces"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                            lineNumber: 722,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                            className: "text-xl font-semibold text-slate-800",
                                                                            children: "Canada coverage coming soon"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                            lineNumber: 725,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "max-w-sm text-center text-sm text-slate-500",
                                                                            children: "This carousel is wired for additional regions. When you're ready, we'll plug in a province-level safety atlas here with the same glass-map treatment."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                            lineNumber: 728,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 721,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 720,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 392,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 391,
                                                    columnNumber: 19
                                                }, this),
                                                detailPanel && activeRegion.id === 'us' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pointer-events-none absolute inset-0 z-30",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pointer-events-auto max-w-sm rounded-3xl border border-slate-200/70 bg-white/95 p-5 shadow-[0_26px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl",
                                                        style: {
                                                            position: 'absolute',
                                                            left: `${detailPanel.x * 100}%`,
                                                            top: `${detailPanel.y * 100}%`,
                                                            transform: 'translate(-50%, -50%)'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start justify-between gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-600",
                                                                                children: [
                                                                                    detailPanel.state.code,
                                                                                    " ·",
                                                                                    ' ',
                                                                                    detailPanel.state.name
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 752,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                                className: "mt-2 text-base font-semibold text-slate-900",
                                                                                children: "Safety snapshot & batch activity"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 756,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 751,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: handleClosePanel,
                                                                        className: "ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs text-slate-600 hover:bg-slate-300 hover:text-slate-900",
                                                                        children: "×"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 760,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 750,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-4 grid gap-3 text-sm text-slate-800",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-[11px] uppercase tracking-[0.18em] text-slate-500",
                                                                                children: "Batches tracked"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 771,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "mt-1 text-2xl font-semibold text-sky-700",
                                                                                children: metrics.batchesTracked.toLocaleString()
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 774,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 770,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "grid grid-cols-2 gap-3 text-xs",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "uppercase tracking-[0.16em] text-slate-500",
                                                                                        children: "Labs reporting"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                        lineNumber: 780,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "mt-1 text-lg font-semibold text-slate-800",
                                                                                        children: metrics.labsReporting
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                        lineNumber: 783,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 779,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "uppercase tracking-[0.16em] text-slate-500",
                                                                                        children: "Recalls watched"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                        lineNumber: 788,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "mt-1 text-lg font-semibold text-indigo-600",
                                                                                        children: metrics.recentRecalls
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                        lineNumber: 791,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 787,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 778,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-[11px] uppercase tracking-[0.18em] text-slate-500",
                                                                                children: "Passing rate"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 797,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "mt-1 text-lg font-semibold text-sky-700",
                                                                                children: [
                                                                                    metrics.passingRate,
                                                                                    "%",
                                                                                    ' ',
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[11px] font-normal text-slate-500",
                                                                                        children: "of COAs marked passing"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                        lineNumber: 802,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 800,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 796,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 769,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-4 flex items-center justify-between gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "max-w-[60%] text-[11px] text-slate-500",
                                                                        children: "These are illustrative numbers for now. Wire them to your real CartFax batch & recall APIs when you're ready."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 810,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: "/admin",
                                                                        className: "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-slate-100 px-3.5 py-1.5 text-[11px] font-semibold text-slate-950 shadow-[0_14px_40px_rgba(148,163,184,0.6)] hover:from-sky-400 hover:to-white",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: "Open admin backend"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 819,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[14px]",
                                                                                children: "↗"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 820,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 815,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 809,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 741,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 740,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 374,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                    lineNumber: 333,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 332,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/AdminStateExplorer.tsx",
                            lineNumber: 326,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AdminStateExplorer.tsx",
                    lineNumber: 321,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mt-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700",
                                children: "Admin data tools"
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 835,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold text-slate-900",
                                children: "Admin hub"
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 838,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-slate-600",
                                children: "When you're signed in as an admin, the hub opens the full CartFax backend: batches, COAs, brands, locations, and more."
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 839,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex flex-wrap items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-xs text-slate-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: 'inline-flex h-2 w-2 rounded-full shadow-[0_0_0_4px_rgba(56,189,248,0.25)] ' + (isLoggedIn ? 'bg-sky-500' : 'bg-slate-400')
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 846,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: isLoggedIn ? 'Admin mode unlocked. Data editing enabled.' : 'Sign in with your admin account to unlock editing.'
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 852,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 845,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/admin",
                                        className: "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-slate-100 px-4 py-2 text-xs font-semibold text-slate-950 shadow-[0_12px_35px_rgba(148,163,184,0.5)] hover:from-sky-400 hover:to-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Open admin hub"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 863,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[15px]",
                                                children: "↗"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 864,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 859,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 844,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 834,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/AdminStateExplorer.tsx",
                    lineNumber: 833,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/AdminStateExplorer.tsx",
            lineNumber: 312,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AdminStateExplorer.tsx",
        lineNumber: 311,
        columnNumber: 5
    }, this);
}
_s(AdminStateExplorer, "flvN86dZiubxGmYGMmQFxPD/VIk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
_c = AdminStateExplorer;
var _c;
__turbopack_context__.k.register(_c, "AdminStateExplorer");
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

//# sourceMappingURL=%5Broot-of-the-server%5D__8fc30a21._.js.map