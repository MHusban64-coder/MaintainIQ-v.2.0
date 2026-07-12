# MaintainIQ Architecture

## Product boundary

MaintainIQ is a React 19 single-page application for QR-enabled asset maintenance. Firebase Authentication, Cloud Firestore, and Firebase Storage are the only backend services. React Router owns client routing; feature services are the sole layer that reads or writes Firebase.

## Source layout

```text
src/
  assets/                 Static brand assets
  components/
    common/               Design-system primitives and shared feedback UI
    layout/               Sidebar, top navigation, logo, and navigation pieces
    dashboard/            Dashboard cards, activity stream, and charts
    assets/               Asset cards, filters, form, QR display, and scanner
    maintenance/          Maintenance form and vertical timeline
    issues/               Issue form and issue card
  context/                Authentication and persisted theme providers
  firebase/               Firebase SDK initialization
  hooks/                  Reusable state and data hooks
  layouts/                Public/auth shell and protected application shell
  pages/                  Route-level pages grouped by feature
  routes/                 Route declarations and authentication guards
  services/               Firestore and Storage access functions
  styles/                 Global Tailwind layers and design tokens
  utils/                  Constants, date, error, and asset helpers
```

## Reusable design system

The shared component layer provides buttons, fields, selects, cards, badges, modal/dialog flows, skeletons, empty/error states, page headers, and search input. Colors, radii, shadows, focus treatments, type scale, and animation timing are defined centrally in Tailwind theme tokens and global styles. Feature components consume those primitives rather than defining competing visual patterns.

## Routing

Public routes are `/`, `/login`, `/register`, and `/forgot-password`. Authenticated app routes are `/dashboard`, `/assets`, `/assets/new`, `/assets/:assetId`, `/assets/:assetId/edit`, `/scanner`, `/maintenance`, `/issues`, `/profile`, and `/settings`. `ProtectedRoute` blocks unauthenticated access and `PublicRoute` sends signed-in users to the dashboard. A route-level `NotFoundPage` handles all unmatched URLs.

## Firebase and data model

`src/firebase/config.js` reads only `import.meta.env` values and exports `auth`, `db`, and `storage`. Services convert Firestore documents into `{ id, ...data }` objects and provide the CRUD boundary. Storage upload helpers return a download URL before the corresponding Firestore document is persisted.

Collections:

- `users/{uid}`: `name`, `email`, `role`, `photoURL`, `createdAt`, `updatedAt`
- `system/bootstrap`: one immutable `adminUid` record created atomically with the first profile; it makes the first registered user an Admin and keeps every later registration a Member.
- `assets/{id}`: `assetName`, `assetCode`, `category`, `serialNumber`, `purchaseDate`, `warrantyExpiry`, `assignedTo`, `location`, `status`, `image`, `qrId`, `notes`, `createdAt`, `updatedAt`, `createdBy`
- `maintenance/{id}`: `assetId`, `technician`, `maintenanceDate`, `description`, `nextMaintenanceDate`, `cost`, `status`, `attachments`, `createdAt`, `createdBy`
- `issues/{id}`: `assetId`, `reportedBy`, `priority`, `description`, `status`, `image`, `createdAt`, `createdBy`

Dates entered through forms are stored as ISO date strings for stable filtering and display; creation/update stamps use Firestore server timestamps. A QR payload is a stable JSON string containing the asset document id and its unique asset code. Scanner support accepts both this payload and a direct asset code.

## Application state

`AuthProvider` subscribes to Firebase session changes, persists browser-local authentication, exposes profile data, and is the source of auth loading state. `ThemeProvider` stores `light` or `dark` in local storage and controls the root `dark` class. Route pages own local loading and mutation state while services contain all Firebase operations.

## Role-based access

Roles are Firestore data, never hardcoded in the UI. Registration uses a Firestore transaction to create the immutable `system/bootstrap` document and the first `users/{uid}` profile as `Admin`; later profiles are `Member`. Security rules validate this bootstrap write with `getAfter`, prevent users from editing their own role, permit only Admins to promote other users, and protect `/admin` with an `AdminRoute` guard. The sidebar only renders Administration for profiles whose Firestore role is `Admin`.

## Delivery checks

The project is built with Vite after dependency installation. The review target is a responsive, keyboard-accessible UI with friendly empty/loading/error states for every networked feature, no hard-coded Firebase credentials in source, and Firebase rules suitable for authenticated user ownership.
