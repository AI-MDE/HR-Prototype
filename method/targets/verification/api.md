---
type: verification-view
title: Verification — api
---

# Verification — api — COMPILED from features' `## Verify`

<!-- COMPILED by compile-targets.mjs. Do not hand-edit — edit each feature's ## Verify and
     recompile. These are the Checks `mde verify` proves by script or test run; what needs
     judgment is in targets/audit/. This is the VERIFICATION PART of the api target: these check blocks live
     HERE and nowhere else. targets/app\api.md holds the
     generation behavior; targets/audit/api.md holds the audit concerns. -->

### API checks across Features  `[feature: api-checks]`

- `api-checks/endpoints-live` Is every endpoint live (persists, with a data-store path in the log) and every business rule enforced (violation rejected and not persisted)?

### Business-rule responses  `[feature: business-rule-responses]`

- `business-rule-responses/rule-identified` Do business-rule failures identify the violated rule in a structured field, with a test that asserts on that field?

### Capability API boundary  `[feature: capability-api-boundary]`

- `capability-api-boundary/every-operation-routed` Does every entity operation, including lifecycle operations, have a route handler marked `// MDE: <entity>.<op>`, and the same operation set a test scenario?

### OpenAPI contract  `[feature: openapi-contract]`

- `openapi-contract/openapi-generated` Is `openapi.yaml` generated from the real routes, with a pinned OpenAPI version, and is the implementation validated against it?
