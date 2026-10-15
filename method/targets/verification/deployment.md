---
type: verification-view
title: Verification — deployment
---

# Verification — deployment — COMPILED from features' `## Verify`

<!-- COMPILED by compile-targets.mjs. Do not hand-edit — edit each feature's ## Verify and
     recompile. These are the Checks `mde verify` proves by script or test run; what needs
     judgment is in targets/audit/. This is the VERIFICATION PART of the deployment target: these check blocks live
     HERE and nowhere else. targets/app\deployment.md holds the
     generation behavior; targets/audit/deployment.md holds the audit concerns. -->

### Production runtime baseline  `[feature: production-runtime]`

- `production-runtime/runtime-exercised` Was the production-like runtime actually exercised (build, start, migrate, health, smoke, backup and restore, rollback, teardown) where its engine is available?
