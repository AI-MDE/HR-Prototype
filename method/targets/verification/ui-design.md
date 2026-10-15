---
type: verification-view
title: Verification — ui-design
---

# Verification — ui-design — COMPILED from features' `## Verify`

<!-- COMPILED by compile-targets.mjs. Do not hand-edit — edit each feature's ## Verify and
     recompile. These are the Checks `mde verify` proves by script or test run; what needs
     judgment is in targets/audit/. This is the VERIFICATION PART of the ui-design target: these check blocks live
     HERE and nowhere else. targets/design\ui-design.md holds the
     generation behavior; targets/audit/ui-design.md holds the audit concerns. -->

### Navigation diagram  `[feature: ui-design-navigation-diagram]`

- `ui-design-navigation-diagram/navigation-drawn` With a user interface, is the navigation diagram delivered, in `specs/design/diagrams/` (`mde verify`, Navigation diagram row)?

### Operation coverage  `[feature: ui-design-operation-coverage]`

- `ui-design-operation-coverage/use-cases-proven` Is every use case, and every operation it invokes, proven by a test scenario tagged with the use case or the `entity.op` (`mde verify`, Scenarios row)?
