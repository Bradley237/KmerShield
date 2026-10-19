# pages/auth/

### What Belongs Here
- Authentication pages using `AuthLayout`:
  - `Login.tsx`
  - `Register.tsx` (with live requirement checks and consent)
  - `ForgotPassword.tsx` (neutral confirmation)
  - `ResetPassword.tsx` (URL token validation, expired state, success state)

### What Does NOT Belong Here
- Dashboard or private member pages (owned by Front-end 2).
- Hardcoded fetch requests (use `services/authService.ts`).
- Direct token storage in `localStorage` or `sessionStorage`.
