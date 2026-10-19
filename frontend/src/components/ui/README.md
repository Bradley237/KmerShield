# components/ui/

### What Belongs Here
- Pure, reusable UI primitives: `Button`, `Input`, `Checkbox`, `Alert`, `Modal`, `Spinner`, `Badge`, `Card`, `Accordion`.
- Zero page logic, zero network calls, zero route assumptions.
- Must be fully accessible (focus ring, ARIA attributes, keyboard navigation).

### What Does NOT Belong Here
- Page-specific compositions (use `components/home/` or `pages/`).
- Layout headers/footers (use `components/layout/`).
- Direct risk logic (use `components/risk/`).
