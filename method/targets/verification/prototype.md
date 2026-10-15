---
type: verification-view
title: Verification — prototype
---

# Verification — prototype — COMPILED from features' `## Verify`

<!-- COMPILED by compile-targets.mjs. Do not hand-edit — edit each feature's ## Verify and
     recompile. These are the Checks `mde verify` proves by script or test run; what needs
     judgment is in targets/audit/. This is the VERIFICATION PART of the prototype target: these check blocks live
     HERE and nowhere else. targets/app\prototype.md holds the
     generation behavior; targets/audit/prototype.md holds the audit concerns. -->

### ABEs  `[feature: business-requirements-abe]`

- `business-requirements-abe/entity-placement` Is every entity in an ABE folder under its home capability, with one Primary Entity per ABE (named after its folder), and is every entity name unique (`mde verify`, Entity placement row)?

### Prototype in four visuals  `[feature: prototype]`

- `prototype/authorization-current` For role-based behavior: is `specs/design/authorization.json` current with the use cases (`mde authorization --check`)?
