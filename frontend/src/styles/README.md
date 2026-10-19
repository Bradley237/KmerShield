# styles/

### What Belongs Here
- Global stylesheets and design tokens:
  - `tokens.css`: The SINGLE SOURCE OF TRUTH for all design tokens (colors, typography, radii, shadows, spacing).
  - `global.css`: Base resets, font declarations, accessibility focus rings, motion utilities.

### What Does NOT Belong Here
- Component-specific scoped styles (use CSS variables from `tokens.css` directly).
- Unannounced token modifications.
