# hooks/

### What Belongs Here
- Custom React hooks encapsulating stateful behavioral logic:
  - `useAuth.ts`: Consuming and managing authentication state.
  - `useTheme.ts`: Theme switching (light, dark, auto) and DOM synchronization.
  - `useReveal.ts`: Scroll-triggered reveal animations via IntersectionObserver.

### What Does NOT Belong Here
- Pure stateless utility functions (use `services/` or `utils/`).
- Direct DOM manipulation that bypasses React lifecycle or theme standards.
