# Frontend Agent Guidelines & Ownership

> **Welcome Agents & Developers:** This document defines architectural boundaries, module ownership, and development rules for the `frontend/` codebase.

---

## 1. Ownership & Roles

- **Front-end 1 (Owner):** Public website (`pages/public/`), Authentication pages (`pages/auth/`), UI design system (`components/ui/`, `components/risk/`, `components/layout/`), and design tokens (`styles/tokens.css`).
- **Front-end 2:** Private/Protected dashboard pages, verification flow pages, user history, and internal tools.
- **Back-end 1 & 2:** Django APIs, endpoints, authentication tokens/cookies, database schemas.
- **STRICT RULE:** **Do not modify another member's module without explicit agreement.** If you need changes to shared components or API contracts, coordinate first.

---

## 2. Token Policy: Single Source of Truth

- **`src/styles/tokens.css` is the SINGLE SOURCE OF TRUTH** for all visual properties:
  - Colors, typography, spacing, border radii, elevation/shadows.
- **CRITICAL:** **Do not edit `tokens.css` without announcing it to the entire group.** Other developers depend on these tokens for consistency.
- **NO HARD-CODED HEX VALUES:** Never use raw hex codes (e.g., `#ffffff`, `#4f46e5`) in component JSX or ad-hoc CSS. Always use token variables (e.g., `var(--primary)`, `var(--bg-surface)`).
- **SEMANTIC COLOR USAGE RULE:**
  - `success` (green), `warning` (amber), and `danger` (red) are strictly reserved for **`RiskBadge` and `RiskIndicator`**.
  - Form validation and input errors **MUST** use `feedback-error`.

---

## 3. Where to Put New Files & Naming Conventions

- `src/components/ui/`: Reusable, atomic primitives (Button, Input, Checkbox, Modal, Alert, Spinner, Badge, Card, Accordion). **Zero page-specific or business logic here.**
- `src/components/layout/`: Header, Footer, Logo, LanguageSwitch, ThemeToggle.
- `src/components/risk/`: Risk-specific visual indicators (`RiskBadge`, `RiskIndicator`).
- `src/components/home/`: Home-specific section compositions (`Hero`, `Limits`, `HowItWorks`, etc.).
- `src/pages/public/`: Public routes (`Home`, `Privacy`, `Terms`, `Contact`, `NotFound`).
- `src/pages/auth/`: Auth screens (`Login`, `Register`, `ForgotPassword`, `ResetPassword`).
- `src/services/`: HTTP calls, API schemas, and mock adapters. Components must **never** perform direct fetch calls.
- `src/locales/`: All user-facing strings in `fr.json` and `en.json`. **No hard-coded French or English text in JSX.**
- **Naming Conventions:**
  - Components: `PascalCase.tsx` (e.g., `RiskBadge.tsx`, `LanguageSwitch.tsx`).
  - Hooks: `useCamelCase.ts` (e.g., `useTheme.ts`, `useReveal.ts`).
  - Services / Utils: `camelCase.ts` (e.g., `httpClient.ts`, `endpoints.ts`).
  - Types: `kebab-case.ts` or `camelCase.ts` (e.g., `auth.ts`, `common.ts`).

---

## 4. Design, Themes & Localization Rules

1. **Dual Theme (Light & Dark):**
   - Default to system preference (`prefers-color-scheme`).
   - Support manual toggle: Light / Dark / Auto.
   - Dark theme applies via `[data-theme="dark"]` on `<html>`.
   - Section scope `[data-surface="dark"]` forces dark tokens regardless of global theme (used on "Limites" and auth split-screen).
2. **Bilingual (French / English):**
   - French by default.
   - English if browser language begins with `en`.
   - Toggle persists in `localStorage` and synchronizes `<html lang>`.
3. **Accessibility (a11y):**
   - 2px primary focus ring with 2px offset on all interactive elements.
   - Visible labels tied to inputs via `htmlFor` and `id`.
   - Errors tied to fields via `aria-describedby`.
   - Accordions with `aria-expanded` and modals with focus trap and `Escape` handling.
   - Respect `prefers-reduced-motion`.
4. **Motion:**
   - Keep motion subtle: scroll reveal max 8px translate + fade under 500ms.
   - Accordion transitions max 200ms. No heavy animation libraries.
