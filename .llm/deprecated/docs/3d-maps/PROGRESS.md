### ✅ **Phase 1: 3D Map Markers Implementation — 31/01 15:51**

- **Type System & API Interface:**
  - **Google Maps 3D Beta API Type Declarations:** Extended the global `google.maps` namespace in `src/server/types/Map.ts` to include complete TypeScript definitions for the beta 3D markers API. Added `Marker3DElement` class with constructor options, `Map3DElement.append()` method for attaching markers, and proper type definitions for `importLibrary("maps3d")` return type. These types are not yet available in `@types/google.maps` since the API is in preview.
  - **Marker Configuration Interface:** Defined `Marker3DElementOptions` with properties: `position` (required LatLngAltitudeLiteral), `altitudeMode` ("ABSOLUTE" | "CLAMP_TO_GROUND"), `extruded` (boolean for ground-to-marker line), and `label` (string).
  - **Map3DProps Extension:** Added `markers?: MapPosition[]` prop to the `Map3DProps` interface, making marker rendering opt-in with empty array as default.

- **Marker Rendering Engine (`src/components/map/Map3D.tsx`):**
  - **State Management with Refs:** Introduced `markersRef` using `useRef<google.maps.maps3d.Marker3DElement[]>([])` to track all marker instances for lifecycle management. This approach avoids re-renders while maintaining reference to DOM elements that need manual cleanup.
  - **`syncMarkers()` Function:** Implemented async callback that handles complete marker synchronization:
    - **Cleanup Phase:** Iterates through existing markers in `markersRef.current`, calls `.remove()` on each, with try-catch per marker to prevent cascading failures.
    - **Creation Phase:** Imports `Marker3DElement` from Google Maps library, iterates through `markers` prop, creates new instances with `CLAMP_TO_GROUND` altitude mode (simplest approach - markers stick to terrain/buildings), no extrusion, and optional labels.
    - **Attachment:** Uses `mapRef.current.append(marker)` to attach each marker to the 3D map DOM element.
    - **Error Isolation:** Individual try-catch blocks per marker ensure one failing marker doesn't break others.
  - **Marker Synchronization Effect:** Dedicated `useEffect` with `syncMarkers` as dependency that re-runs whenever the markers prop changes, ensuring dynamic marker updates.
  - **Cleanup Strategy:** Enhanced the existing map cleanup effect to also remove all markers before removing the map element itself, preventing memory leaks and DOM orphans.

- **Test Implementation (`src/app/map/page.tsx`):**
  - **Test Data Structure:** Created `TEST_MARKERS` constant with 3 geographically distributed San Francisco landmarks:
    - **Golden Gate Bridge** (37.8199, -122.4783): Northwest reference point, highly recognizable landmark for visual verification.
    - **Downtown SF** (37.7749, -122.4194): Center marker at the same coordinates as camera center, tests marker visibility at camera focus point.
    - **Coit Tower** (37.8024, -122.4058): East/Telegraph Hill location, completes triangulation for spatial distribution testing.
  - **Props Integration:** Passed `markers={TEST_MARKERS}` to Map3D component while maintaining existing camera configuration (tilt: 60°, heading: 45°, range: 3000m, HYBRID mode).
  - **Type Safety:** Imported `MapPosition` type to ensure test markers conform to schema validation (lat/lng bounds, required fields).

- **Technical Decisions & Rationale:**
  - **CLAMP_TO_GROUND vs ABSOLUTE:** Chose `CLAMP_TO_GROUND` altitude mode for initial implementation to avoid needing elevation data - markers automatically adjust to terrain height. ABSOLUTE mode would require accurate altitude values for each location.
  - **No Extrusion:** Set `extruded: false` to keep visual simplicity - no vertical lines from ground to marker. Can be enabled later for specific marker types.
  - **Error Handling Granularity:** Wrapped individual marker operations in try-catch rather than failing entire sync operation, ensuring partial marker sets can still render if one location has invalid coordinates.
  - **Ref-based Lifecycle:** Used refs instead of state to avoid triggering React re-renders during marker manipulation, since markers are imperative DOM elements managed outside React's virtual DOM.

- **Implementation Quality:**
  - **Memory Management:** Complete cleanup of marker instances in component unmount effect prevents DOM element leaks.
  - **API Loading Safety:** Marker sync only runs when `apiIsLoaded` is true, preventing race conditions with Google Maps library loading.
  - **Type Safety:** Full TypeScript coverage with no `any` types, proper namespace declarations for beta API.
  - **Separation of Concerns:** Type definitions in `types/Map.ts`, rendering logic in `Map3D.tsx`, test data in `page.tsx` - clean architectural boundaries.

### ✅ **Phase 2: tRPC Backend Integration & Authentication Cleanup — 31/01 16:06**

- **Backend Architecture - Location Service Layer:**
  - **`src/server/services/locations.ts`:** Created location data service with mock San Francisco dataset for development. Implemented three methods: `getAll()` returns all 6 mock locations, `getById(id: string)` performs find operation by ID with optional return type, `getByType(type)` filters locations by type enum ("poi" | "user" | "event"). Mock data includes diverse location types: 2 POIs (SF Downtown, Golden Gate Bridge, Golden Gate Park), 2 events (Fisherman's Wharf, Ferry Building), and 1 user location (Ghirardelli Square). All locations follow the `MapPosition` type schema with id, lat/lng coordinates, altitude: 0, label, and type.
  - **Service Pattern Rationale:** Separated data access logic from API router to enable easy migration from mock data to database queries later. Service exports object with methods rather than class to avoid unnecessary instantiation overhead for stateless operations.

- **Backend Architecture - tRPC Router:**
  - **`src/server/api/routers/locations-router.ts`:** Implemented tRPC router with three public procedures using Zod validation:
    - **`getAll` query:** No input validation, calls `locationsService.getAll()`, returns all locations array.
    - **`getById` query:** Validates input as `{ id: z.string() }`, returns single location or undefined if not found.
    - **`getByType` query:** Validates input with `z.enum(["poi", "user", "event"])` to match MapPosition type constraints, returns filtered array.
  - **Type Safety:** Zod schemas ensure runtime validation matches TypeScript types, preventing invalid query parameters from reaching service layer.
  - **Public Procedures Only:** All endpoints use `publicProcedure` - no authentication required for location data access.

- **Frontend Integration - Map Page Refactoring (`src/app/map/page.tsx`):**
  - **Removed Static Data:** Deleted `TEST_MARKERS` constant and replaced with dynamic tRPC query. Removed `MapPosition` type import as it's now inferred from tRPC return type.
  - **tRPC Query Hook:** Added `api.locations.getAll.useQuery()` which leverages React Query for automatic caching, refetching, and state management. Destructured `data` (renamed to `locations`), `isLoading`, and `error` from query result.
  - **Loading State UI:** Implemented dedicated loading screen that appears during data fetch (before map component loads). Shows larger spinner (h-12 w-12 vs h-8 w-8) with "Loading locations..." text to differentiate from the dynamic import loading state. Uses same Tailwind styling pattern (slate colors, flex centering).
  - **Error State UI:** Created user-friendly error display with SVG alert icon, "Failed to load locations" message, and detailed error message from tRPC error object. Prevents rendering broken map when backend is unreachable.
  - **Conditional Rendering Flow:** Three-tier rendering: loading state → error state → map with data. Ensures map component only mounts when valid location data exists.
  - **Safe Data Passing:** Used nullish coalescing `markers={locations ?? []}` to handle undefined data edge case (TypeScript safety), ensuring Map3D always receives array type.
  - **Preserved Camera Configuration:** Maintained SF downtown center (37.7749, -122.4194, altitude 500m), tilt 60°, heading 45°, range 3000m, HYBRID mode for visual consistency with Phase 1.

- **tRPC Configuration Cleanup (`src/server/api/trpc.ts`):**
  - **Removed Authentication Layer:** Deleted commented-out Better Auth import, removed `auth.api.getSession()` call from context creation, removed `session` and `user` from context type.
  - **Simplified Context:** `createTRPCContext` now only provides `headers` via Next.js `headers()` function. Kept `cache()` wrapper for React Server Components compatibility.
  - **Deleted Middleware:** Removed `isAuthenticated` middleware (session null check + UNAUTHORIZED throw), removed `isAdmin` middleware (role verification + FORBIDDEN throw). Eliminated 40+ lines of unused auth code.
  - **Cleaned Exports:** Removed `protectedProcedure` and `adminProcedure` exports. Only export `publicProcedure`, `createTRPCRouter`, and `createCallerFactory`.
  - **Preserved Core Features:** Kept superjson transformer for Date/Map/Set serialization, kept error formatter for consistent error shape across procedures.
  - **File Size Reduction:** Reduced from ~70 lines to ~30 lines, removing complexity for current public-only API requirements.

- **Data Flow Architecture:**
  - **End-to-End Flow:** User loads `/map` → `MapPage` component mounts → tRPC query triggers → Request goes through Next.js API route → tRPC context created with headers → `locationsRouter.getAll` procedure executes → `locationsService.getAll()` returns mock data → Response serialized with superjson → React Query caches result → Component re-renders with data → Map3D receives 6 markers → Google Maps 3D API renders markers.
  - **Type Safety Chain:** `locationsService` returns `MapPosition[]` → tRPC infers return type → Frontend `api.locations.getAll` hook infers `MapPosition[]` → Map3D `markers` prop receives typed array. No manual type casting needed.
  - **Caching Behavior:** React Query caches location data with default stale time, preventing unnecessary refetches on component re-mount. Cache key automatically generated from tRPC route path.

- **Technical Decisions & Rationale:**
  - **Mock Data Strategy:** Used hardcoded San Francisco locations (6 landmarks) to enable development without database. Service layer abstraction makes swapping to Prisma/Drizzle queries a single-file change.
  - **Public-Only API:** Removed auth complexity since current map use case doesn't require user-specific data. Simplifies development and reduces request overhead (no session lookup per request).
  - **Three-State Rendering:** Explicit loading and error states provide better UX than showing empty map or generic error. User always knows system state.
  - **Query Hook Positioning:** Placed tRPC query in page component rather than Map3D component to keep map component reusable - it receives data as props and doesn't know about backend.
  - **Service Pattern:** Chose service object over direct database calls in router to enable unit testing, maintain separation of concerns, and allow easy data source migration.

- **Implementation Quality:**
  - **Error Handling:** Query errors caught and displayed to user with error message detail. Frontend never crashes from backend failures.
  - **Type Safety:** Full end-to-end type inference from service → router → frontend hook. No `any` types, no manual type annotations needed.
  - **Code Cleanliness:** Removed 40+ lines of unused auth code, improving maintainability and reducing bundle size.
  - **React Query Integration:** Automatic caching, refetching on window focus, and error retry handled by tRPC's React Query integration.
  - **Separation of Concerns:** Service layer (data access) → Router layer (API interface) → Frontend layer (UI) with clear boundaries between each.