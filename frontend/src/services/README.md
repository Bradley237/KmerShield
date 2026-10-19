# services/

### What Belongs Here
- API communication and service layers:
  - `httpClient.ts`: Standardized fetch wrapper passing Django CSRF tokens and cookies.
  - `endpoints.ts`: Endpoint registry ("TO VALIDATE with Back-end 1").
  - `authService.ts`: Authentication methods (login, register, logout, reset).
  - `mockAuthAdapter.ts`: Local development mock adapter active when `VITE_USE_MOCK_API=true`.

### What Does NOT Belong Here
- React hooks or UI component state.
- Storing secrets or hard-coded authentication credentials.
- Direct localStorage token manipulation.
