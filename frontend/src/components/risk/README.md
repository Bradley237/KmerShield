# components/risk/

### What Belongs Here
- Specialized risk visualization components:
  - `RiskBadge.tsx`: Displays Low, Moderate, or High risk with text + icon + semantic color.
  - `RiskIndicator.tsx`: Visual meter/gauge strictly using semantic risk colors.
- **STRICT RULE:** Only components in this directory are authorized to use `--risk-success`, `--risk-warning`, and `--risk-danger`.

### What Does NOT Belong Here
- Form error messages (form errors must use `--feedback-error`).
- Generic UI badges without risk context (use `components/ui/Badge/`).
