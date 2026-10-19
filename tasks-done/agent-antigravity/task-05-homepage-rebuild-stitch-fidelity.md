# Task 05: KmerShield Homepage Rebuild & Stitch Design Fidelity

- **Contributor / Agent:** Antigravity Agent
- **Date Completed:** 2026-10-19
- **Branch / Module:** frontend (Homepage UI & Design System Integration)

---

### 1. Overview (What was done)

- **Step 0: CSS Diagnosis & Tailwind v4 Integration Fixes:**
  - Diagnosed why the initial homepage appeared cramped, unstyled, and detached from the approved Stitch designs.
  - Resolved Tailwind CSS v4 token integration by configuring the `@theme` block directly inside [global.css](file:///c:/Users/DELL/Desktop/KmerShield/frontend/src/styles/global.css) with references to `:root` design tokens (`--color-primary`, `--color-background`, `--color-surface`, `--color-text`, `--color-muted`, `--color-border`, etc.).
  - Eliminated a destructive CSS reset (`*, *::before, *::after { margin: 0; padding: 0; }`) that was stripping standard layout rhythm.
  - Implemented custom utility classes and keyframe animations: `.wavy-danger` (wavy SVG red underlines for suspicious text), `.bg-dotted-pattern`, `.bg-dotted-pattern-cta`, `.nav-hover-link`, `@keyframes floatY`, and `@keyframes pulseSubtle`.
  - Built an accessible [Button.tsx](file:///c:/Users/DELL/Desktop/KmerShield/frontend/src/components/ui/Button.tsx) component supporting `primary`, `secondary`, `outline`, and `ghost` variants with full AA contrast and 2px outline focus states.

- **Section-by-Section Homepage Reconstruction:**
  1. **Header ([Header.tsx](file:///c:/Users/DELL/Desktop/KmerShield/frontend/src/components/layout/Header.tsx)):**
     - Rebuilt navigation bar with backdrop blur (`backdrop-blur-md bg-background/85`), active anchor navigation, responsive mobile drawer toggle with animated hamburger, rounded-full pill [LanguageSwitch.tsx](file:///c:/Users/DELL/Desktop/KmerShield/frontend/src/components/layout/LanguageSwitch.tsx), and accessible [ThemeToggle.tsx](file:///c:/Users/DELL/Desktop/KmerShield/frontend/src/components/layout/ThemeToggle.tsx).
  2. **Hero Section ([Hero.tsx](file:///c:/Users/DELL/Desktop/KmerShield/frontend/src/components/home/Hero.tsx)):**
     - Left column: Pill badge ("Nouveau"), high-impact headline ("Avant d'envoyer de l'argent, vérifiez."), subheadline, dual action buttons ("Vérifier un message", "Voir la démo"), and 3 reassurance items (100% gratuit, 0 installation, Données protégées).
     - Right column: 3-layer narrative visual composition featuring:
       - WhatsApp-style simulated chat bubble with wavy red underlined suspicious strings ("URGENT", "gagné 500 000 FCFA", "frais de déblocage 15 000 FCFA").
       - Floating analysis card with a 3-segment risk gauge (Faible, Vigilance, Élevé), detected signals, and recommendation.
       - Floating guarantee pill chip ("Analyse en temps réel · Sans inscription") and "Exemple fictif" pill.
  3. **Le Problème Section ([Problem.tsx](file:///c:/Users/DELL/Desktop/KmerShield/frontend/src/components/home/Problem.tsx)):**
     - Section tag: "Le Problème". Title: "Trois situations que vous connaissez déjà."
     - 3 real-world Cameroonian scam scenario cards with realistic message previews:
       - Card 1: Faux transfert Mobile Money (SMS Orange Money / MTN MoMo with fake transaction reference).
       - Card 2: Loterie WhatsApp inattendue (WhatsApp forward notification with urgency cues).
       - Card 3: Commande Marketplace douteuse (Fake deposit slip / receipt preview with courier fee request).
     - Bottom gradient question banner: "Un doute sur un message que vous venez de recevoir ?" with quick action button.
  4. **Comment ça marche Section ([HowItWorks.tsx](file:///c:/Users/DELL/Desktop/KmerShield/frontend/src/components/home/HowItWorks.tsx)):**
     - Part 1 (3 étapes simples):
       - Step 1: "Collez le message" (numbered circle, icon, description).
       - Step 2: "Notre modèle analyse" (AI spark icon, Cameroonian fraud heuristics).
       - Step 3: "Décidez en confiance" (shield check icon, clear recommendation).
       - Connected with a dashed horizontal progression line on desktop.
     - Part 2 (Trois niveaux, jamais de pourcentage):
       - Explanatory subhead clarifying why KmerShield avoids confusing probability percentages (e.g. "73% de risque").
       - 3 interactive risk-level cards:
         - **Niveau 1: Faible (Vert):** "Aucun signal d'alerte détecté." Badge "RISQUE FAIBLE".
         - **Niveau 2: Vigilance (Ambre):** "Plusieurs incohérences détectées." Badge "VIGILANCE".
         - **Niveau 3: Élevé (Rouge):** "Caractéristiques typiques d'une tentative d'arnaque." Badge "RISQUE ÉLEVÉ".
  5. **Limites du service ([Limits.tsx](file:///c:/Users/DELL/Desktop/KmerShield/frontend/src/components/home/Limits.tsx)):**
     - Scoped permanently to dark theme with `[data-surface="dark"]` (`bg-[#101116]`), ensuring high-contrast transparency and trust regardless of global theme toggle.
     - 2 side-by-side comparison cards:
       - "Ce que fait KmerShield" (Check icons, green accents: pattern analysis, signal detection, pedagogical explanations).
       - "Ce que KmerShield ne fait pas" (X-circle icons, amber/rose accents: not a legal certificate, does not intercept private messages, does not guarantee 100% certainty).
     - 3 bottom transparency commitments (Pas de conservation de données personnelles, Algorithme transparent, Projet communautaire à but non lucratif).
  6. **FAQ Section ([Faq.tsx](file:///c:/Users/DELL/Desktop/KmerShield/frontend/src/components/home/Faq.tsx)):**
     - Two-column layout: Sticky left column with title, subtitle, and contact email link card.
     - Right column: Interactive accordion with 5 comprehensive questions, smooth SVG chevron rotation, and accessible `aria-expanded` and `aria-controls` bindings (first item expanded by default).
  7. **Final CTA Band ([FinalCta.tsx](file:///c:/Users/DELL/Desktop/KmerShield/frontend/src/components/home/FinalCta.tsx)):**
     - Full-width rounded container with primary brand gradient and subtle dotted background pattern.
     - Strong headline: "Votre prochaine décision mérite un second avis."
     - Dual buttons: Primary white button "Tester avec un exemple" and secondary outlined white button "Partager à un proche".
  8. **Footer ([Footer.tsx](file:///c:/Users/DELL/Desktop/KmerShield/frontend/src/components/layout/Footer.tsx)):**
     - 4-column organized footer: Brand mission, Product navigation anchors, Legal links, and Contact & emergency numbers (ANTIC, Consommateur).
     - Bottom bar with copyright and "Fait pour le Cameroun".
  9. **Bilingual Translations:**
     - Updated both [fr.json](file:///c:/Users/DELL/Desktop/KmerShield/frontend/src/locales/fr.json) and [en.json](file:///c:/Users/DELL/Desktop/KmerShield/frontend/src/locales/en.json) with comprehensive, professionally translated keys across all rebuilt sections.

---

### 2. Motivation & Objective (Why it was done)

The approved Stitch reference designs (`design/stitch/final/`) defined a high-trust, visually polished, and pedagogically sound layout for KmerShield. The prior homepage had styling regressions, broken CSS resets, and missing components that caused the page to look cramped and generic.

This rebuild was necessary to:
- Faithfully reflect the approved designs without using raw inline hex codes or copy-pasting unmaintainable HTML.
- Provide clear visual indicators for Cameroonian fraud vectors (MTN MoMo, Orange Money, fake lotteries, marketplace scams).
- Communicate the service's transparency and limits with maximum clarity and zero ambiguity.

---

### 3. Implementation Details (How it was done)

- **Architecture:** All homepage sections are modularized in `src/components/home/` and mounted cleanly in `src/pages/public/Home.tsx`.
- **Design Tokens:** Strict adherence to CSS variables defined in `src/styles/tokens.css` and mapped via `@theme` in `src/styles/global.css`.
- **Accessibility:** 
  - Color contrast meets WCAG AA standards across both light and dark themes.
  - Interactive accordion supports full keyboard navigation and screen-reader ARIA states.
  - All button and link states feature visible outline focus rings with 2px offset.
- **Responsiveness:**
  - Mobile (360px): Stacked single-column layouts, mobile drawer navigation, comfortable touch targets (min 44px).
  - Tablet (768px): 2-column or adapted grid layouts.
  - Desktop (1200px+): Full multi-column grids, narrative layered hero, and sticky sidebar navigation.

---

### 4. Critical Factors & Keys (Important for Team Members)

- **Design Tokens Rule:** Never use raw hex colors or inline styles in components. Use Tailwind semantic classes (`bg-surface`, `bg-background`, `text-text`, `text-muted`, `border-border`, `text-primary`, `bg-primary`, `text-risk-low`, `text-risk-medium`, `text-risk-high`).
- **Semantic Color Separation:** Risk colors (`--color-risk-low`, `--color-risk-medium`, `--color-risk-high`) are exclusively reserved for risk assessment displays. Form validation states must always use `--color-feedback-error`.
- **Limits Dark Surface:** The `<Limits />` component is explicitly scoped with `data-surface="dark"`. Even when the global theme is set to light mode, this section renders with dark slate styling to maintain its distinct visual contrast.
- **Internationalization:** Any newly added string must be added to both `src/locales/fr.json` and `src/locales/en.json`.

---

### 5. Problems Encountered & How They Were Solved

1. **Problem:** Tailwind v4 utility classes (`bg-surface`, `bg-background`, `border-border`) produced no styling in Vite build.
   - **Cause:** Tailwind CSS v4 does not read `tailwind.config.js`. Theme tokens must be mapped using the `@theme` directive in CSS.
   - **Solution:** Added a comprehensive `@theme` block in `src/styles/global.css` that maps all semantic CSS variables to Tailwind utility classes.

2. **Problem:** Elements appeared smashed and without vertical flow.
   - **Cause:** A blanket CSS reset (`*, *::before, *::after { margin: 0; padding: 0; }`) in `global.css` had wiped out standard browser layout pacing.
   - **Solution:** Replaced with a modern reset that preserves block element defaults and applies sensible standard box-sizing.

3. **Problem:** TypeScript compiler (`tsc -b`) threw type errors on `toBeInTheDocument` in Vitest tests.
   - **Cause:** Missing `@testing-library/jest-dom/vitest` type definitions in `tsconfig.app.json`.
   - **Solution:** Added `"@testing-library/jest-dom/vitest"` to the `"types"` array in `tsconfig.app.json` and configured `setup.ts`.

---

### 6. Verification & Testing

- **Linter Check:**
  ```bash
  npm run lint
  # Result: Found 0 warnings and 0 errors across 40 files.
  ```
- **Type Check:**
  ```bash
  npm run typecheck
  # Result: tsc --noEmit passed cleanly with 0 type errors.
  ```
- **Automated Tests:**
  ```bash
  npm test
  # Result: Vitest test suite passed 100% (Foundation.test.tsx passed).
  ```
- **Production Build:**
  ```bash
  npm run build
  # Result: tsc -b && vite build completed with 0 errors, outputting optimized client bundles.
  ```
