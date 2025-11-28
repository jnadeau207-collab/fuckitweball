# Repository review

## UI and globe experience
- The public home page renders `AdminStateExplorer`, which centers a square globe container within a flex layout and reserves the entire viewport for it (`min-h-screen`, flex column with a flex-1 globe wrapper). The halo and rounded container help keep the globe visually isolated while overlays (quick-jump, detail card) are positioned off to the left edge or via fixed coordinates that avoid the central area.【F:components/AdminStateExplorer.tsx†L156-L510】
- `GlobeStates` loads US state and world country polygons, applies metallic textures, and supports region focusing, hover lift, and click selection. It reports altitude changes so the quick-jump is gated to zoom-in levels and uses click coordinates to place the floating detail card away from the globe center.【F:components/GlobeStates.tsx†L12-L338】【F:components/AdminStateExplorer.tsx†L214-L510】

## Data and pipeline readiness
- Admin APIs for batches, state summaries, uploads, etc. are already wired to Prisma with filtering and CRUD endpoints. They authenticate via NextAuth sessions but currently only enforce presence of a session; role checks are missing on several admin routes despite a helper that can enforce `admin`.【F:pages/api/admin/batches.ts†L1-L191】【F:pages/api/admin/state-summary.ts†L1-L70】【F:lib/require-admin.ts†L1-L9】【F:pages/api/auth/[...nextauth].ts†L1-L59】
- The Prisma schema defines core entities for batches, lab results, uploaded documents, recalls, ratings, and relationships to brands/locations, which gives the data model necessary for a collection pipeline (COA uploads link to lab results, batches link to brands/locations, recalls reference batches).【F:prisma/schema.prisma†L1-L190】【F:prisma/schema.prisma†L200-L320】
- Front-end admin pages (e.g., uploads) already call these endpoints and provide forms for uploading COA PDFs, viewing parsed metadata, and linking to batches and labs, indicating the UI is in place to exercise the pipeline once back-end data sources are connected.【F:pages/admin/uploads.tsx†L1-L120】

## Auth and access planning
- NextAuth is configured with credential-based login storing the user role in JWT and session objects, but most admin APIs only check for a session, not role. The existing `requireAdmin` helper performs a role check and should be applied consistently to prevent non-admin access.【F:pages/api/auth/[...nextauth].ts†L8-L59】【F:lib/require-admin.ts†L1-L9】【F:pages/api/admin/batches.ts†L13-L190】
- Upload presigning already restricts to `admin` role; similar enforcement should be added to all admin routes along with structured error handling and logging for traceability.【F:pages/api/uploads-presign.ts†L1-L36】

## Gaps / next steps
- Centering/obstruction: the globe is centered and fills up to `80vw/80vh`, but fixed overlays (quick-jump sidebar, floating detail panel) can overlap the viewport at smaller widths; consider responsive adjustments to keep the globe unobstructed on mobile or narrow layouts.【F:components/AdminStateExplorer.tsx†L312-L509】
- Data connectivity: endpoints currently use illustrative snapshots; connecting live data will require wiring ingestion (S3 upload events → parsing → Prisma writes) and Algolia indexing, as hinted by existing helpers. Role-based guards and audit logging should be added before exposing admin APIs externally.【F:components/AdminStateExplorer.tsx†L199-L485】【F:pages/api/admin/batches.ts†L1-L191】【F:pages/api/auth/[...nextauth].ts†L8-L59】
