# layouts/

### What Belongs Here
- Structural shell layouts wrapped around `<Outlet />`.
- `PublicLayout.tsx`: Header + page content + Footer.
- `AuthLayout.tsx`: Split screen with form on left and persistent dark panel (`[data-surface="dark"]`) on right.

### What Does NOT Belong Here
- Page-specific forms or content.
- Reusable UI primitives (use `components/ui/`).
