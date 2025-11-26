self.__BUILD_MANIFEST = {
  "/admin": [
    "static/chunks/pages/admin.js"
  ],
  "/admin/batches": [
    "static/chunks/pages/admin/batches.js"
  ],
  "/admin/lab-results": [
    "static/chunks/pages/admin/lab-results.js"
  ],
  "/admin/labs": [
    "static/chunks/pages/admin/labs.js"
  ],
  "/admin/states": [
    "static/chunks/pages/admin/states.js"
  ],
  "/admin/states/[stateCode]": [
    "static/chunks/pages/admin/states/[stateCode].js"
  ],
  "/admin/uploads": [
    "static/chunks/pages/admin/uploads.js"
  ],
  "/admin/uploads/[id]": [
    "static/chunks/pages/admin/uploads/[id].js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/admin",
    "/admin/batches",
    "/admin/batches/[id]",
    "/admin/brands",
    "/admin/dispensaries",
    "/admin/lab-results",
    "/admin/labs",
    "/admin/licenses",
    "/admin/locations",
    "/admin/recalls",
    "/admin/states",
    "/admin/states/[stateCode]",
    "/admin/uploads",
    "/admin/uploads/[id]",
    "/api/admin/batches",
    "/api/admin/batches/[id]",
    "/api/admin/brands",
    "/api/admin/dispensaries",
    "/api/admin/lab-results/[id]",
    "/api/admin/register-upload",
    "/api/admin/uploads",
    "/api/admin/uploads/[id]",
    "/api/algolia/reindex",
    "/api/auth/[...nextauth]",
    "/api/uploads-presign"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()