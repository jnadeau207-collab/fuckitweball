(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === 'object' ? document.currentScript : undefined,
  '[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    /// <reference path="../../../shared/runtime-types.d.ts" />
    /// <reference path="../../runtime/base/dev-globals.d.ts" />
    /// <reference path="../../runtime/base/dev-protocol.d.ts" />
    /// <reference path="../../runtime/base/dev-extensions.ts" />
    __turbopack_context__.s([
      'connect',
      () => connect,
      'setHooks',
      () => setHooks,
      'subscribeToUpdate',
      () => subscribeToUpdate,
    ]);
    function connect({
      addMessageListener,
      sendMessage,
      onUpdateError = console.error,
    }) {
      addMessageListener((msg) => {
        switch (msg.type) {
          case 'turbopack-connected':
            handleSocketConnected(sendMessage);
            break;
          default:
            try {
              if (Array.isArray(msg.data)) {
                for (let i = 0; i < msg.data.length; i++) {
                  handleSocketMessage(msg.data[i]);
                }
              } else {
                handleSocketMessage(msg.data);
              }
              applyAggregatedUpdates();
            } catch (e) {
              console.warn(
                '[Fast Refresh] performing full reload\n\n' +
                  "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" +
                  'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' +
                  'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' +
                  'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' +
                  'Fast Refresh requires at least one parent function component in your React tree.',
              );
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
        push: ([chunkPath, callback]) => {
          subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        },
      };
      if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued) {
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
        headers: resource.headers || null,
      });
    }
    function subscribeToUpdates(sendMessage, resource) {
      sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource,
      });
      return () => {
        sendJSON(sendMessage, {
          type: 'turbopack-unsubscribe',
          ...resource,
        });
      };
    }
    function handleSocketConnected(sendMessage) {
      for (const key of updateCallbackSets.keys()) {
        subscribeToUpdates(sendMessage, JSON.parse(key));
      }
    }
    // we aggregate all pending updates until the issues are resolved
    const chunkListsWithPendingUpdates = new Map();
    function aggregateUpdates(msg) {
      const key = resourceKey(msg.resource);
      let aggregated = chunkListsWithPendingUpdates.get(key);
      if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(
          aggregated.instruction,
          msg.instruction,
        );
      } else {
        chunkListsWithPendingUpdates.set(key, msg);
      }
    }
    function applyAggregatedUpdates() {
      if (chunkListsWithPendingUpdates.size === 0) return;
      hooks.beforeRefresh();
      for (const msg of chunkListsWithPendingUpdates.values()) {
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
          for (let i = 1; i < updateA.merged.length; i++) {
            update = mergeChunkListEcmascriptMergedUpdates(
              update,
              updateA.merged[i],
            );
          }
          for (let i = 0; i < updateB.merged.length; i++) {
            update = mergeChunkListEcmascriptMergedUpdates(
              update,
              updateB.merged[i],
            );
          }
          merged = [update];
        }
      } else if (updateB.merged != null) {
        merged = updateB.merged;
      }
      return {
        type: 'ChunkListUpdate',
        chunks,
        merged,
      };
    }
    function mergeChunkListChunks(chunksA, chunksB) {
      const chunks = {};
      for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)) {
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
      for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)) {
        if (chunks[chunkPath] == null) {
          chunks[chunkPath] = chunkUpdateB;
        }
      }
      return chunks;
    }
    function mergeChunkUpdates(updateA, updateB) {
      if (
        (updateA.type === 'added' && updateB.type === 'deleted') ||
        (updateA.type === 'deleted' && updateB.type === 'added')
      ) {
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
      const entries = mergeEcmascriptChunkEntries(
        mergedA.entries,
        mergedB.entries,
      );
      const chunks = mergeEcmascriptChunksUpdates(
        mergedA.chunks,
        mergedB.chunks,
      );
      return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks,
      };
    }
    function mergeEcmascriptChunkEntries(entriesA, entriesB) {
      return {
        ...entriesA,
        ...entriesB,
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
      for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)) {
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
          const mergedUpdate = mergeEcmascriptChunkUpdates(
            chunkUpdateA,
            chunkUpdateB,
          );
          if (mergedUpdate != null) {
            chunks[chunkPath] = mergedUpdate;
          }
        } else {
          chunks[chunkPath] = chunkUpdateA;
        }
      }
      for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)) {
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
        for (const moduleId of addedModules) {
          if (!deletedModules.has(moduleId)) {
            added.push(moduleId);
          }
        }
        for (const moduleId of deletedModules) {
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
          deleted,
        };
      }
      if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
          ...(updateA.added ?? []),
          ...(updateB.added ?? []),
        ]);
        const deleted = new Set([
          ...(updateA.deleted ?? []),
          ...(updateB.deleted ?? []),
        ]);
        if (updateB.added != null) {
          for (const moduleId of updateB.added) {
            deleted.delete(moduleId);
          }
        }
        if (updateB.deleted != null) {
          for (const moduleId of updateB.deleted) {
            added.delete(moduleId);
          }
        }
        return {
          type: 'partial',
          added: [...added],
          deleted: [...deleted],
        };
      }
      if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
          ...(updateA.modules ?? []),
          ...(updateB.added ?? []),
        ]);
        for (const moduleId of updateB.deleted ?? []) {
          modules.delete(moduleId);
        }
        return {
          type: 'added',
          modules: [...modules],
        };
      }
      if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
          for (const moduleId of updateA.added) {
            modules.delete(moduleId);
          }
        }
        return {
          type: 'deleted',
          modules: [...modules],
        };
      }
      // Any other update combination is invalid.
      return undefined;
    }
    function invariant(_, message) {
      throw new Error(`Invariant: ${message}`);
    }
    const CRITICAL = ['bug', 'error', 'fatal'];
    function compareByList(list, a, b) {
      const aI = list.indexOf(a) + 1 || list.length;
      const bI = list.indexOf(b) + 1 || list.length;
      return aI - bI;
    }
    const chunksWithIssues = new Map();
    function emitIssues() {
      const issues = [];
      const deduplicationSet = new Set();
      for (const [_, chunkIssues] of chunksWithIssues) {
        for (const chunkIssue of chunkIssues) {
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
      for (const issue of msg.issues) {
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
    const SEVERITY_ORDER = ['bug', 'fatal', 'error', 'warning', 'info', 'log'];
    const CATEGORY_ORDER = [
      'parse',
      'resolve',
      'code generation',
      'rendering',
      'typescript',
      'other',
    ];
    function sortIssues(issues) {
      issues.sort((a, b) => {
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
      });
    }
    const hooks = {
      beforeRefresh: () => {},
      refresh: () => {},
      buildOk: () => {},
      issues: (_issues) => {},
    };
    function setHooks(newHooks) {
      Object.assign(hooks, newHooks);
    }
    function handleSocketMessage(msg) {
      sortIssues(msg.issues);
      handleIssues(msg);
      switch (msg.type) {
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
      return subscribeToUpdate(
        {
          path: chunkListPath,
        },
        sendMessage,
        callback,
      );
    }
    function subscribeToUpdate(resource, sendMessage, callback) {
      const key = resourceKey(resource);
      let callbackSet;
      const existingCallbackSet = updateCallbackSets.get(key);
      if (!existingCallbackSet) {
        callbackSet = {
          callbacks: new Set([callback]),
          unsubscribe: subscribeToUpdates(sendMessage, resource),
        };
        updateCallbackSets.set(key, callbackSet);
      } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
      }
      return () => {
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
      for (const callback of callbackSet.callbacks) {
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
  },
  '[project]/pages/admin/batches/[id].tsx [client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => AdminBatchDetail]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)',
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/react/index.js [client] (ecmascript)',
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/next/router.js [client] (ecmascript)',
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/next-auth/react/index.js [client] (ecmascript)',
      );
    var _s = __turbopack_context__.k.signature();
    function formatDate(s) {
      if (!s) return '—';
      const d = new Date(s);
      if (Number.isNaN(d.getTime())) return '—';
      return d.toLocaleDateString();
    }
    function latestVerification(verifications) {
      if (!verifications || verifications.length === 0) return null;
      return verifications[0];
    }
    function overallStatus(batch) {
      const latest = latestVerification(batch.verifications);
      const hasActiveRecall = batch.recalls.some((r) => r.status === 'ACTIVE');
      if (hasActiveRecall) return 'RECALLED';
      if (latest?.status === 'FLAGGED') return 'FLAGGED';
      if (latest?.status === 'REJECTED') return 'REJECTED';
      if (latest?.status === 'VERIFIED') return 'VERIFIED';
      return 'UNVERIFIED';
    }
    function AdminBatchDetail() {
      _s();
      const { data: session } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
        'useSession'
      ])();
      const router = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
        'useRouter'
      ])();
      const { id } = router.query;
      const [batch, setBatch] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(null);
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(false);
      const [error, setError] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(null);
      // NEW: track which lab result is being deleted
      const [deletingLabResultId, setDeletingLabResultId] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
        'useState'
      ])(null);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
        'useEffect'
      ])(
        {
          'AdminBatchDetail.useEffect': () => {
            if (!id || !session) return;
            fetchBatch(id);
          },
        }['AdminBatchDetail.useEffect'],
        [id, session],
      );
      async function fetchBatch(batchId) {
        try {
          setLoading(true);
          setError(null);
          const idStr = Array.isArray(batchId) ? batchId[0] : batchId;
          const res = await fetch(`/api/admin/batches/${idStr}`);
          if (!res.ok) {
            const txt = await res.text();
            throw new Error(txt || 'Failed to load batch');
          }
          const data = await res.json();
          setBatch(data);
        } catch (e) {
          console.error('Failed to load batch', e);
          setError(e.message || 'Failed to load batch');
        } finally {
          setLoading(false);
        }
      }
      // NEW: delete COA / lab result handler
      async function handleDeleteLabResult(labResultId) {
        if (!id) return;
        if (('TURBOPACK compile-time truthy', 1)) {
          const ok = window.confirm(
            'Delete this COA and its lab result from this batch? This cannot be undone.',
          );
          if (!ok) return;
        }
        try {
          setDeletingLabResultId(labResultId);
          setError(null);
          const res = await fetch(`/api/admin/lab-results/${labResultId}`, {
            method: 'DELETE',
          });
          if (!res.ok) {
            const txt = await res.text();
            throw new Error(txt || 'Failed to delete lab result / COA');
          }
          await fetchBatch(id);
        } catch (e) {
          console.error('Failed to delete lab result / COA', e);
          setError(e.message || 'Failed to delete lab result / COA');
        } finally {
          setDeletingLabResultId(null);
        }
      }
      if (!session) {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
          'jsxDEV'
        ])(
          'div',
          {
            className: 'p-6',
            children: /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'p',
              {
                className: 'text-sm text-slate-300',
                children: 'Sign in as an admin to view batch details.',
              },
              void 0,
              false,
              {
                fileName: '[project]/pages/admin/batches/[id].tsx',
                lineNumber: 191,
                columnNumber: 9,
              },
              this,
            ),
          },
          void 0,
          false,
          {
            fileName: '[project]/pages/admin/batches/[id].tsx',
            lineNumber: 190,
            columnNumber: 7,
          },
          this,
        );
      }
      if (loading && !batch) {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
          'jsxDEV'
        ])(
          'div',
          {
            className: 'p-6',
            children: /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'p',
              {
                className: 'text-sm text-slate-300',
                children: 'Loading batch…',
              },
              void 0,
              false,
              {
                fileName: '[project]/pages/admin/batches/[id].tsx',
                lineNumber: 201,
                columnNumber: 9,
              },
              this,
            ),
          },
          void 0,
          false,
          {
            fileName: '[project]/pages/admin/batches/[id].tsx',
            lineNumber: 200,
            columnNumber: 7,
          },
          this,
        );
      }
      if (error && !batch) {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
          'jsxDEV'
        ])(
          'div',
          {
            className: 'p-6',
            children: /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'p',
              {
                className: 'text-sm text-red-400',
                children: ['Error: ', error],
              },
              void 0,
              true,
              {
                fileName: '[project]/pages/admin/batches/[id].tsx',
                lineNumber: 209,
                columnNumber: 9,
              },
              this,
            ),
          },
          void 0,
          false,
          {
            fileName: '[project]/pages/admin/batches/[id].tsx',
            lineNumber: 208,
            columnNumber: 7,
          },
          this,
        );
      }
      if (!batch) {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
          'jsxDEV'
        ])(
          'div',
          {
            className: 'p-6',
            children: /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'p',
              {
                className: 'text-sm text-slate-300',
                children: 'Batch not found.',
              },
              void 0,
              false,
              {
                fileName: '[project]/pages/admin/batches/[id].tsx',
                lineNumber: 217,
                columnNumber: 9,
              },
              this,
            ),
          },
          void 0,
          false,
          {
            fileName: '[project]/pages/admin/batches/[id].tsx',
            lineNumber: 216,
            columnNumber: 7,
          },
          this,
        );
      }
      const status = overallStatus(batch);
      const ver = latestVerification(batch.verifications);
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'div',
        {
          className: 'p-6 max-w-6xl mx-auto space-y-6',
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                className: 'flex items-center justify-between gap-4',
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'div',
                    {
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'button',
                          {
                            onClick: () => router.push('/admin/batches'),
                            className:
                              'text-xs text-slate-400 hover:text-emerald-400 mb-1',
                            children: '← Back to batches',
                          },
                          void 0,
                          false,
                          {
                            fileName: '[project]/pages/admin/batches/[id].tsx',
                            lineNumber: 230,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'h1',
                          {
                            className: 'text-2xl font-semibold text-slate-100',
                            children: batch.productName || batch.batchCode,
                          },
                          void 0,
                          false,
                          {
                            fileName: '[project]/pages/admin/batches/[id].tsx',
                            lineNumber: 236,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'p',
                          {
                            className: 'text-sm text-slate-400',
                            children: [
                              'Batch code',
                              ' ',
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'span',
                                {
                                  className: 'font-mono text-slate-200',
                                  children: batch.batchCode,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/pages/admin/batches/[id].tsx',
                                  lineNumber: 241,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              batch.brand &&
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                    'Fragment'
                                  ],
                                  {
                                    children: [
                                      ' ',
                                      '· Brand:',
                                      ' ',
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        'span',
                                        {
                                          className: 'text-slate-100',
                                          children: batch.brand.name,
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/pages/admin/batches/[id].tsx',
                                          lineNumber: 248,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName: '[project]/pages/admin/batches/[id].tsx',
                            lineNumber: 239,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: '[project]/pages/admin/batches/[id].tsx',
                      lineNumber: 229,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'div',
                    {
                      className: 'flex flex-col items-end gap-2',
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'div',
                          {
                            className: 'flex gap-2',
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'span',
                                {
                                  className: `px-2 py-1 rounded-full text-[11px] border ${status === 'VERIFIED' ? 'border-emerald-500 text-emerald-300' : status === 'RECALLED' ? 'border-red-500 text-red-300' : status === 'FLAGGED' || status === 'REJECTED' ? 'border-amber-500 text-amber-300' : 'border-slate-600 text-slate-300'}`,
                                  children: status,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/pages/admin/batches/[id].tsx',
                                  lineNumber: 256,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              !batch.isActive &&
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'span',
                                  {
                                    className:
                                      'px-2 py-1 rounded-full text-[11px] border border-slate-600 text-slate-400',
                                    children: 'Inactive',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/pages/admin/batches/[id].tsx',
                                    lineNumber: 270,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName: '[project]/pages/admin/batches/[id].tsx',
                            lineNumber: 255,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        batch.reviewAggregate
                          ? /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className: 'text-xs text-emerald-300',
                                children: [
                                  '★ ',
                                  batch.reviewAggregate.ratingAvg.toFixed(1),
                                  ' / 5 (',
                                  ' ',
                                  batch.reviewAggregate.ratingCount,
                                  ' ',
                                  batch.reviewAggregate.ratingCount === 1
                                    ? 'rating'
                                    : 'ratings',
                                  ')',
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  '[project]/pages/admin/batches/[id].tsx',
                                lineNumber: 278,
                                columnNumber: 13,
                              },
                              this,
                            )
                          : /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className: 'text-xs text-slate-500',
                                children: 'No ratings yet',
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/pages/admin/batches/[id].tsx',
                                lineNumber: 287,
                                columnNumber: 13,
                              },
                              this,
                            ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: '[project]/pages/admin/batches/[id].tsx',
                      lineNumber: 253,
                      columnNumber: 9,
                    },
                    this,
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/pages/admin/batches/[id].tsx',
                lineNumber: 228,
                columnNumber: 7,
              },
              this,
            ),
            error &&
              batch &&
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                'jsxDEV'
              ])(
                'div',
                {
                  className:
                    'text-xs text-red-300 bg-red-950/40 border border-red-700/60 rounded-md px-3 py-2',
                  children: error,
                },
                void 0,
                false,
                {
                  fileName: '[project]/pages/admin/batches/[id].tsx',
                  lineNumber: 294,
                  columnNumber: 9,
                },
                this,
              ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                className:
                  'grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]',
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'div',
                    {
                      className:
                        'rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-3',
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'h2',
                          {
                            className:
                              'text-sm font-semibold text-slate-200 mb-1',
                            children: 'Overview',
                          },
                          void 0,
                          false,
                          {
                            fileName: '[project]/pages/admin/batches/[id].tsx',
                            lineNumber: 303,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'div',
                          {
                            className: 'grid text-sm gap-2 md:grid-cols-2',
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'div',
                                {
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'text-xs text-slate-400',
                                        children: 'Batch code',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/pages/admin/batches/[id].tsx',
                                        lineNumber: 308,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'font-mono text-slate-100',
                                        children: batch.batchCode,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/pages/admin/batches/[id].tsx',
                                        lineNumber: 309,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    '[project]/pages/admin/batches/[id].tsx',
                                  lineNumber: 307,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'div',
                                {
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'text-xs text-slate-400',
                                        children: 'Product',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/pages/admin/batches/[id].tsx',
                                        lineNumber: 314,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'text-slate-100',
                                        children: batch.productName || '—',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/pages/admin/batches/[id].tsx',
                                        lineNumber: 315,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    '[project]/pages/admin/batches/[id].tsx',
                                  lineNumber: 313,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'div',
                                {
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'text-xs text-slate-400',
                                        children: 'Category',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/pages/admin/batches/[id].tsx',
                                        lineNumber: 320,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'text-slate-100',
                                        children: [
                                          batch.primaryCategory || '—',
                                          batch.subCategory
                                            ? ` · ${batch.subCategory}`
                                            : '',
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          '[project]/pages/admin/batches/[id].tsx',
                                        lineNumber: 321,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    '[project]/pages/admin/batches/[id].tsx',
                                  lineNumber: 319,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'div',
                                {
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'text-xs text-slate-400',
                                        children: 'SKU',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/pages/admin/batches/[id].tsx',
                                        lineNumber: 329,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'text-slate-100',
                                        children: batch.productSku || '—',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/pages/admin/batches/[id].tsx',
                                        lineNumber: 330,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    '[project]/pages/admin/batches/[id].tsx',
                                  lineNumber: 328,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'div',
                                {
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'text-xs text-slate-400',
                                        children: 'Harvest date',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/pages/admin/batches/[id].tsx',
                                        lineNumber: 335,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'text-slate-100',
                                        children: formatDate(batch.harvestDate),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/pages/admin/batches/[id].tsx',
                                        lineNumber: 336,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    '[project]/pages/admin/batches/[id].tsx',
                                  lineNumber: 334,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'div',
                                {
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'text-xs text-slate-400',
                                        children: 'Production date',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/pages/admin/batches/[id].tsx',
                                        lineNumber: 341,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'text-slate-100',
                                        children: formatDate(
                                          batch.productionDate,
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/pages/admin/batches/[id].tsx',
                                        lineNumber: 344,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    '[project]/pages/admin/batches/[id].tsx',
                                  lineNumber: 340,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'div',
                                {
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'text-xs text-slate-400',
                                        children: 'Package date',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/pages/admin/batches/[id].tsx',
                                        lineNumber: 349,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'text-slate-100',
                                        children: formatDate(batch.packageDate),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/pages/admin/batches/[id].tsx',
                                        lineNumber: 350,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    '[project]/pages/admin/batches/[id].tsx',
                                  lineNumber: 348,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'div',
                                {
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'text-xs text-slate-400',
                                        children: 'Expiration date',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/pages/admin/batches/[id].tsx',
                                        lineNumber: 355,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'text-slate-100',
                                        children: formatDate(
                                          batch.expirationDate,
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/pages/admin/batches/[id].tsx',
                                        lineNumber: 356,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    '[project]/pages/admin/batches/[id].tsx',
                                  lineNumber: 354,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName: '[project]/pages/admin/batches/[id].tsx',
                            lineNumber: 306,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        batch.notes &&
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'div',
                            {
                              className: 'pt-2 border-t border-slate-800 mt-2',
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'div',
                                  {
                                    className: 'text-xs text-slate-400 mb-1',
                                    children: 'Notes',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/pages/admin/batches/[id].tsx',
                                    lineNumber: 364,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'p',
                                  {
                                    className:
                                      'text-xs text-slate-200 whitespace-pre-wrap',
                                    children: batch.notes,
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/pages/admin/batches/[id].tsx',
                                    lineNumber: 365,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                '[project]/pages/admin/batches/[id].tsx',
                              lineNumber: 363,
                              columnNumber: 13,
                            },
                            this,
                          ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: '[project]/pages/admin/batches/[id].tsx',
                      lineNumber: 302,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'div',
                    {
                      className: 'space-y-4',
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'div',
                          {
                            className:
                              'rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-sm',
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'h2',
                                {
                                  className:
                                    'text-sm font-semibold text-slate-200 mb-2',
                                  children: 'Verification',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/pages/admin/batches/[id].tsx',
                                  lineNumber: 376,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              ver
                                ? /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'div',
                                    {
                                      className: 'space-y-1',
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'div',
                                          {
                                            className: 'text-xs text-slate-400',
                                            children: 'Latest status',
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/pages/admin/batches/[id].tsx',
                                            lineNumber: 381,
                                            columnNumber: 17,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'div',
                                          {
                                            className: 'text-slate-100',
                                            children: [
                                              ver.status,
                                              ' ',
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                'span',
                                                {
                                                  className:
                                                    'text-xs text-slate-500',
                                                  children: [
                                                    'on ',
                                                    formatDate(ver.createdAt),
                                                    ver.createdBy
                                                      ? ` by ${ver.createdBy}`
                                                      : '',
                                                  ],
                                                },
                                                void 0,
                                                true,
                                                {
                                                  fileName:
                                                    '[project]/pages/admin/batches/[id].tsx',
                                                  lineNumber: 386,
                                                  columnNumber: 19,
                                                },
                                                this,
                                              ),
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              '[project]/pages/admin/batches/[id].tsx',
                                            lineNumber: 384,
                                            columnNumber: 17,
                                          },
                                          this,
                                        ),
                                        ver.reason &&
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'div',
                                            {
                                              className:
                                                'text-xs text-slate-300 mt-1',
                                              children: ver.reason,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/pages/admin/batches/[id].tsx',
                                              lineNumber: 392,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        '[project]/pages/admin/batches/[id].tsx',
                                      lineNumber: 380,
                                      columnNumber: 15,
                                    },
                                    this,
                                  )
                                : /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'div',
                                    {
                                      className: 'text-xs text-slate-500',
                                      children:
                                        'No verification events recorded yet.',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/pages/admin/batches/[id].tsx',
                                      lineNumber: 398,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName: '[project]/pages/admin/batches/[id].tsx',
                            lineNumber: 375,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'div',
                          {
                            className:
                              'rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-sm',
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'h2',
                                {
                                  className:
                                    'text-sm font-semibold text-slate-200 mb-2',
                                  children: 'Recalls',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/pages/admin/batches/[id].tsx',
                                  lineNumber: 406,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              batch.recalls.length === 0
                                ? /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'div',
                                    {
                                      className: 'text-xs text-slate-500',
                                      children:
                                        'No recalls recorded for this batch.',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/pages/admin/batches/[id].tsx',
                                      lineNumber: 410,
                                      columnNumber: 15,
                                    },
                                    this,
                                  )
                                : /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'div',
                                    {
                                      className: 'space-y-2',
                                      children: batch.recalls.map((r) =>
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'div',
                                          {
                                            className:
                                              'border border-slate-800 rounded-md px-2 py-1.5',
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                'div',
                                                {
                                                  className:
                                                    'flex items-center justify-between',
                                                  children: [
                                                    /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                                      'jsxDEV'
                                                    ])(
                                                      'div',
                                                      {
                                                        className:
                                                          'text-xs text-slate-300',
                                                        children: [
                                                          r.jurisdiction,
                                                          ' ',
                                                          r.recallNumber
                                                            ? `· ${r.recallNumber}`
                                                            : '',
                                                        ],
                                                      },
                                                      void 0,
                                                      true,
                                                      {
                                                        fileName:
                                                          '[project]/pages/admin/batches/[id].tsx',
                                                        lineNumber: 421,
                                                        columnNumber: 23,
                                                      },
                                                      this,
                                                    ),
                                                    /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                                      'jsxDEV'
                                                    ])(
                                                      'span',
                                                      {
                                                        className: `text-[10px] px-2 py-0.5 rounded-full border ${r.status === 'ACTIVE' ? 'border-red-500 text-red-300' : 'border-slate-600 text-slate-300'}`,
                                                        children: r.status,
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          '[project]/pages/admin/batches/[id].tsx',
                                                        lineNumber: 425,
                                                        columnNumber: 23,
                                                      },
                                                      this,
                                                    ),
                                                  ],
                                                },
                                                void 0,
                                                true,
                                                {
                                                  fileName:
                                                    '[project]/pages/admin/batches/[id].tsx',
                                                  lineNumber: 420,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                              r.reason &&
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'div',
                                                  {
                                                    className:
                                                      'text-[11px] text-slate-400 mt-1',
                                                    children: r.reason,
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      '[project]/pages/admin/batches/[id].tsx',
                                                    lineNumber: 436,
                                                    columnNumber: 23,
                                                  },
                                                  this,
                                                ),
                                              r.issuedAt &&
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'div',
                                                  {
                                                    className:
                                                      'text-[11px] text-slate-500 mt-1',
                                                    children: [
                                                      'Issued: ',
                                                      formatDate(r.issuedAt),
                                                    ],
                                                  },
                                                  void 0,
                                                  true,
                                                  {
                                                    fileName:
                                                      '[project]/pages/admin/batches/[id].tsx',
                                                    lineNumber: 441,
                                                    columnNumber: 23,
                                                  },
                                                  this,
                                                ),
                                            ],
                                          },
                                          r.id,
                                          true,
                                          {
                                            fileName:
                                              '[project]/pages/admin/batches/[id].tsx',
                                            lineNumber: 416,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                      ),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/pages/admin/batches/[id].tsx',
                                      lineNumber: 414,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName: '[project]/pages/admin/batches/[id].tsx',
                            lineNumber: 405,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: '[project]/pages/admin/batches/[id].tsx',
                      lineNumber: 373,
                      columnNumber: 9,
                    },
                    this,
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/pages/admin/batches/[id].tsx',
                lineNumber: 300,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                className:
                  'rounded-xl border border-slate-800 bg-slate-900/70 p-4',
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'h2',
                    {
                      className: 'text-sm font-semibold text-slate-200 mb-2',
                      children: 'Lab results (COAs)',
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/pages/admin/batches/[id].tsx',
                      lineNumber: 455,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  batch.labResults.length === 0
                    ? /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'text-xs text-slate-500',
                          children: 'No lab results linked to this batch yet.',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/pages/admin/batches/[id].tsx',
                          lineNumber: 459,
                          columnNumber: 11,
                        },
                        this,
                      )
                    : /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'overflow-x-auto',
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'table',
                            {
                              className:
                                'w-full text-xs text-left border-collapse',
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'thead',
                                  {
                                    children: /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'tr',
                                      {
                                        className:
                                          'border-b border-slate-800 text-slate-400',
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'th',
                                            {
                                              className: 'py-2 pr-3',
                                              children: 'Lab',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/pages/admin/batches/[id].tsx',
                                              lineNumber: 467,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'th',
                                            {
                                              className: 'py-2 pr-3',
                                              children: 'Tested at',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/pages/admin/batches/[id].tsx',
                                              lineNumber: 468,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'th',
                                            {
                                              className: 'py-2 pr-3',
                                              children: 'THC %',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/pages/admin/batches/[id].tsx',
                                              lineNumber: 469,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'th',
                                            {
                                              className: 'py-2 pr-3',
                                              children: 'CBD %',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/pages/admin/batches/[id].tsx',
                                              lineNumber: 470,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'th',
                                            {
                                              className: 'py-2 pr-3',
                                              children: 'Total cannabinoids %',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/pages/admin/batches/[id].tsx',
                                              lineNumber: 471,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'th',
                                            {
                                              className: 'py-2 pr-3',
                                              children: 'Overall',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/pages/admin/batches/[id].tsx',
                                              lineNumber: 472,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'th',
                                            {
                                              className: 'py-2 pr-3',
                                              children: 'COA',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/pages/admin/batches/[id].tsx',
                                              lineNumber: 473,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'th',
                                            {
                                              className: 'py-2 pr-3',
                                              children: 'Actions',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/pages/admin/batches/[id].tsx',
                                              lineNumber: 474,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          '[project]/pages/admin/batches/[id].tsx',
                                        lineNumber: 466,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/pages/admin/batches/[id].tsx',
                                    lineNumber: 465,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'tbody',
                                  {
                                    children: batch.labResults.map((lr) =>
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        'tr',
                                        {
                                          className:
                                            'border-b border-slate-900/70 hover:bg-slate-900/80',
                                          children: [
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'td',
                                              {
                                                className:
                                                  'py-2 pr-3 text-slate-100',
                                                children: lr.lab?.name || '—',
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/pages/admin/batches/[id].tsx',
                                                lineNumber: 483,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'td',
                                              {
                                                className:
                                                  'py-2 pr-3 text-slate-200',
                                                children: formatDate(
                                                  lr.testedAt,
                                                ),
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/pages/admin/batches/[id].tsx',
                                                lineNumber: 486,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'td',
                                              {
                                                className:
                                                  'py-2 pr-3 text-slate-200',
                                                children:
                                                  lr.thcPercent != null
                                                    ? `${lr.thcPercent.toFixed(2)}%`
                                                    : '—',
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/pages/admin/batches/[id].tsx',
                                                lineNumber: 489,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'td',
                                              {
                                                className:
                                                  'py-2 pr-3 text-slate-200',
                                                children:
                                                  lr.cbdPercent != null
                                                    ? `${lr.cbdPercent.toFixed(2)}%`
                                                    : '—',
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/pages/admin/batches/[id].tsx',
                                                lineNumber: 494,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'td',
                                              {
                                                className:
                                                  'py-2 pr-3 text-slate-200',
                                                children:
                                                  lr.totalCannabinoidsPercent !=
                                                  null
                                                    ? `${lr.totalCannabinoidsPercent.toFixed(2)}%`
                                                    : '—',
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/pages/admin/batches/[id].tsx',
                                                lineNumber: 499,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'td',
                                              {
                                                className: 'py-2 pr-3',
                                                children:
                                                  lr.passed == null
                                                    ? /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                                        'jsxDEV'
                                                      ])(
                                                        'span',
                                                        {
                                                          className:
                                                            'text-slate-500',
                                                          children: 'Unknown',
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            '[project]/pages/admin/batches/[id].tsx',
                                                          lineNumber: 506,
                                                          columnNumber: 25,
                                                        },
                                                        this,
                                                      )
                                                    : lr.passed
                                                      ? /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                                          'jsxDEV'
                                                        ])(
                                                          'span',
                                                          {
                                                            className:
                                                              'text-emerald-300',
                                                            children: 'Pass',
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              '[project]/pages/admin/batches/[id].tsx',
                                                            lineNumber: 508,
                                                            columnNumber: 25,
                                                          },
                                                          this,
                                                        )
                                                      : /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                                          'jsxDEV'
                                                        ])(
                                                          'span',
                                                          {
                                                            className:
                                                              'text-red-300',
                                                            children: 'Fail',
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              '[project]/pages/admin/batches/[id].tsx',
                                                            lineNumber: 510,
                                                            columnNumber: 25,
                                                          },
                                                          this,
                                                        ),
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/pages/admin/batches/[id].tsx',
                                                lineNumber: 504,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'td',
                                              {
                                                className:
                                                  'py-2 pr-3 text-slate-200',
                                                children: lr.uploadedDocument
                                                  ? lr.uploadedDocument.fileName
                                                  : '—',
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/pages/admin/batches/[id].tsx',
                                                lineNumber: 513,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'td',
                                              {
                                                className: 'py-2 pr-3',
                                                children: lr.uploadedDocument
                                                  ? /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                                      'jsxDEV'
                                                    ])(
                                                      'button',
                                                      {
                                                        onClick: () =>
                                                          handleDeleteLabResult(
                                                            lr.id,
                                                          ),
                                                        disabled:
                                                          deletingLabResultId ===
                                                          lr.id,
                                                        className:
                                                          'text-[11px] px-2 py-1 rounded-md border border-red-600/70 text-red-300 hover:bg-red-900/40 disabled:opacity-60',
                                                        children:
                                                          deletingLabResultId ===
                                                          lr.id
                                                            ? 'Deleting…'
                                                            : 'Delete COA',
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          '[project]/pages/admin/batches/[id].tsx',
                                                        lineNumber: 520,
                                                        columnNumber: 25,
                                                      },
                                                      this,
                                                    )
                                                  : /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                                      'jsxDEV'
                                                    ])(
                                                      'span',
                                                      {
                                                        className:
                                                          'text-[11px] text-slate-500',
                                                        children:
                                                          'No COA attached',
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          '[project]/pages/admin/batches/[id].tsx',
                                                        lineNumber: 530,
                                                        columnNumber: 25,
                                                      },
                                                      this,
                                                    ),
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/pages/admin/batches/[id].tsx',
                                                lineNumber: 518,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                          ],
                                        },
                                        lr.id,
                                        true,
                                        {
                                          fileName:
                                            '[project]/pages/admin/batches/[id].tsx',
                                          lineNumber: 479,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/pages/admin/batches/[id].tsx',
                                    lineNumber: 477,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                '[project]/pages/admin/batches/[id].tsx',
                              lineNumber: 464,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/pages/admin/batches/[id].tsx',
                          lineNumber: 463,
                          columnNumber: 11,
                        },
                        this,
                      ),
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/pages/admin/batches/[id].tsx',
                lineNumber: 454,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                className:
                  'rounded-xl border border-slate-800 bg-slate-900/70 p-4',
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'h2',
                    {
                      className: 'text-sm font-semibold text-slate-200 mb-2',
                      children: 'Locations (where seen / sold)',
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/pages/admin/batches/[id].tsx',
                      lineNumber: 545,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  batch.locations.length === 0
                    ? /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'text-xs text-slate-500',
                          children: 'No locations linked to this batch yet.',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/pages/admin/batches/[id].tsx',
                          lineNumber: 549,
                          columnNumber: 11,
                        },
                        this,
                      )
                    : /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'grid gap-2 md:grid-cols-2 text-xs',
                          children: batch.locations.map((bl) =>
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className:
                                  'border border-slate-800 rounded-md px-3 py-2',
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'div',
                                    {
                                      className: 'text-slate-100',
                                      children: bl.location.name,
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/pages/admin/batches/[id].tsx',
                                      lineNumber: 559,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'div',
                                    {
                                      className: 'text-slate-400',
                                      children: [
                                        bl.location.city || '—',
                                        ',',
                                        ' ',
                                        bl.location.state || '—',
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        '[project]/pages/admin/batches/[id].tsx',
                                      lineNumber: 562,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'div',
                                    {
                                      className:
                                        'text-[10px] text-slate-500 mt-1',
                                      children: ['Type: ', bl.location.type],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        '[project]/pages/admin/batches/[id].tsx',
                                      lineNumber: 566,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                ],
                              },
                              bl.id,
                              true,
                              {
                                fileName:
                                  '[project]/pages/admin/batches/[id].tsx',
                                lineNumber: 555,
                                columnNumber: 15,
                              },
                              this,
                            ),
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/pages/admin/batches/[id].tsx',
                          lineNumber: 553,
                          columnNumber: 11,
                        },
                        this,
                      ),
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/pages/admin/batches/[id].tsx',
                lineNumber: 544,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                className:
                  'rounded-xl border border-slate-800 bg-slate-900/70 p-4',
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'h2',
                    {
                      className: 'text-sm font-semibold text-slate-200 mb-2',
                      children: 'Ratings (5-star aggregate)',
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/pages/admin/batches/[id].tsx',
                      lineNumber: 577,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  batch.reviewAggregate
                    ? /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'text-sm text-slate-200 mb-2',
                          children: [
                            'Overall:',
                            ' ',
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'span',
                              {
                                className: 'text-emerald-300 font-semibold',
                                children: [
                                  '★ ',
                                  batch.reviewAggregate.ratingAvg.toFixed(1),
                                  ' / 5',
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  '[project]/pages/admin/batches/[id].tsx',
                                lineNumber: 583,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            ' ',
                            '(',
                            batch.reviewAggregate.ratingCount,
                            ' ',
                            batch.reviewAggregate.ratingCount === 1
                              ? 'rating'
                              : 'ratings',
                            ')',
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName: '[project]/pages/admin/batches/[id].tsx',
                          lineNumber: 581,
                          columnNumber: 11,
                        },
                        this,
                      )
                    : /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'text-xs text-slate-500 mb-2',
                          children:
                            'No aggregate rating computed for this batch yet.',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/pages/admin/batches/[id].tsx',
                          lineNumber: 593,
                          columnNumber: 11,
                        },
                        this,
                      ),
                  batch.ratingSources.length === 0
                    ? /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'text-xs text-slate-500',
                          children: 'No source-specific rating data available.',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/pages/admin/batches/[id].tsx',
                          lineNumber: 599,
                          columnNumber: 11,
                        },
                        this,
                      )
                    : /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'grid gap-2 md:grid-cols-3 text-xs',
                          children: batch.ratingSources.map((rs) =>
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className:
                                  'border border-slate-800 rounded-md px-3 py-2',
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'div',
                                    {
                                      className: 'text-slate-200',
                                      children: rs.source,
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/pages/admin/batches/[id].tsx',
                                      lineNumber: 609,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'div',
                                    {
                                      className: 'text-emerald-300',
                                      children: [
                                        '★ ',
                                        rs.ratingAvg.toFixed(1),
                                        ' / 5',
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        '[project]/pages/admin/batches/[id].tsx',
                                      lineNumber: 610,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'div',
                                    {
                                      className: 'text-slate-500',
                                      children: [
                                        rs.ratingCount,
                                        ' ',
                                        rs.ratingCount === 1
                                          ? 'rating'
                                          : 'ratings',
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        '[project]/pages/admin/batches/[id].tsx',
                                      lineNumber: 613,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                ],
                              },
                              rs.id,
                              true,
                              {
                                fileName:
                                  '[project]/pages/admin/batches/[id].tsx',
                                lineNumber: 605,
                                columnNumber: 15,
                              },
                              this,
                            ),
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/pages/admin/batches/[id].tsx',
                          lineNumber: 603,
                          columnNumber: 11,
                        },
                        this,
                      ),
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/pages/admin/batches/[id].tsx',
                lineNumber: 576,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                className:
                  'rounded-xl border border-slate-800 bg-slate-900/70 p-4',
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'h2',
                    {
                      className: 'text-sm font-semibold text-slate-200 mb-2',
                      children: 'Verification history',
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/pages/admin/batches/[id].tsx',
                      lineNumber: 625,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  batch.verifications.length === 0
                    ? /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'text-xs text-slate-500',
                          children: 'No verification events yet.',
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/pages/admin/batches/[id].tsx',
                          lineNumber: 629,
                          columnNumber: 11,
                        },
                        this,
                      )
                    : /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'space-y-2 text-xs',
                          children: batch.verifications.map((v) =>
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className:
                                  'border border-slate-800 rounded-md px-3 py-2',
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'div',
                                    {
                                      className:
                                        'flex items-center justify-between',
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'div',
                                          {
                                            className: 'text-slate-200',
                                            children: v.status,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/pages/admin/batches/[id].tsx',
                                            lineNumber: 640,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'div',
                                          {
                                            className: 'text-slate-500',
                                            children: [
                                              formatDate(v.createdAt),
                                              v.createdBy
                                                ? ` · ${v.createdBy}`
                                                : '',
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              '[project]/pages/admin/batches/[id].tsx',
                                            lineNumber: 641,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        '[project]/pages/admin/batches/[id].tsx',
                                      lineNumber: 639,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  v.reason &&
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'text-slate-300 mt-1',
                                        children: v.reason,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/pages/admin/batches/[id].tsx',
                                        lineNumber: 647,
                                        columnNumber: 19,
                                      },
                                      this,
                                    ),
                                ],
                              },
                              v.id,
                              true,
                              {
                                fileName:
                                  '[project]/pages/admin/batches/[id].tsx',
                                lineNumber: 635,
                                columnNumber: 15,
                              },
                              this,
                            ),
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/pages/admin/batches/[id].tsx',
                          lineNumber: 633,
                          columnNumber: 11,
                        },
                        this,
                      ),
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/pages/admin/batches/[id].tsx',
                lineNumber: 624,
                columnNumber: 7,
              },
              this,
            ),
          ],
        },
        void 0,
        true,
        {
          fileName: '[project]/pages/admin/batches/[id].tsx',
          lineNumber: 226,
          columnNumber: 5,
        },
        this,
      );
    }
    _s(AdminBatchDetail, '78Rmk7hIjMcXiV+OkBDtWLGFQ/o=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
          'useSession'
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__[
          'useRouter'
        ],
      ];
    });
    _c = AdminBatchDetail;
    var _c;
    __turbopack_context__.k.register(_c, 'AdminBatchDetail');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  '[next]/entry/page-loader.ts { PAGE => "[project]/pages/admin/batches/[id].tsx [client] (ecmascript)" } [client] (ecmascript)',
  (__turbopack_context__, module, exports) => {
    const PAGE_PATH = '/admin/batches/[id]';
    (window.__NEXT_P = window.__NEXT_P || []).push([
      PAGE_PATH,
      () => {
        return __turbopack_context__.r(
          '[project]/pages/admin/batches/[id].tsx [client] (ecmascript)',
        );
      },
    ]);
    // @ts-expect-error module.hot exists
    if (module.hot) {
      // @ts-expect-error module.hot exists
      module.hot.dispose(function () {
        window.__NEXT_P.push([PAGE_PATH]);
      });
    }
  },
  '[hmr-entry]/hmr-entry.js { ENTRY => "[project]/pages/admin/batches/[id].tsx" }',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.r(
      '[next]/entry/page-loader.ts { PAGE => "[project]/pages/admin/batches/[id].tsx [client] (ecmascript)" } [client] (ecmascript)',
    );
  },
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__78efa8c6._.js.map
