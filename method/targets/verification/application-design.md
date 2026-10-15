---
type: verification-view
title: Verification — application-design
---

# Verification — application-design — COMPILED from features' `## Verify`

<!-- COMPILED by compile-targets.mjs. Do not hand-edit — edit each feature's ## Verify and
     recompile. These are the Checks `mde verify` proves by script or test run; what needs
     judgment is in targets/audit/. This is the VERIFICATION PART of the application-design target: these check blocks live
     HERE and nowhere else. targets/design\application-design.md holds the
     generation behavior; targets/audit/application-design.md holds the audit concerns. -->

### Design in Features  `[feature: design-in-catalog-terms]`

- `design-in-catalog-terms/designs-use-catalog` Does every capability design apply only known Features and design vocabulary, each to what it applies to, with only its options, and only where its `appliedIn` allows, on entities and operations the requirements declare, delegating only to real operations (`mde verify`, Design row)?

### Engineering for reuse  `[feature: engineering-for-reuse]`

- `engineering-for-reuse/features-implemented-once` Is every Feature the application applies implemented once, with no second implementation (`mde verify`, Reuse row), and is every promise proven by a passing scenario tagged `@feature:<id>/<promise>` on each object that applies it (`mde verify`, Features row)?
- `engineering-for-reuse/model-declared-once` Is each entity's model declared once, and is duplicated code below the threshold the Reuse row reports?
