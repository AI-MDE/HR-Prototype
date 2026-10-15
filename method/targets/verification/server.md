---
type: verification-view
title: Verification — server
---

# Verification — server — COMPILED from features' `## Verify`

<!-- COMPILED by compile-targets.mjs. Do not hand-edit — edit each feature's ## Verify and
     recompile. These are the Checks `mde verify` proves by script or test run; what needs
     judgment is in targets/audit/. This is the VERIFICATION PART of the server target: these check blocks live
     HERE and nowhere else. targets/app\server.md holds the
     generation behavior; targets/audit/server.md holds the audit concerns. -->

### Capability vertical slices (source)  `[feature: capability-vertical-slices]`

- `capability-vertical-slices/slices-live` Is every slice live: mutations persist and the log shows the full route-to-query path (`mde verify`, Live slices row)?
- `capability-vertical-slices/layers-kept` Does each capability have a source folder of its own holding its slice (a route, a service, and a repository, each real code naming the capability's entities, never a placeholder), with data access (the database driver, SQL) only in the data layer and never in a route (`mde verify`, Slices and layers row)?

### Engineering for reuse  `[feature: engineering-for-reuse]`

- `engineering-for-reuse/features-implemented-once` Is every Feature the application applies implemented once, with no second implementation (`mde verify`, Reuse row), and is every promise proven by a passing scenario tagged `@feature:<id>/<promise>` on each object that applies it (`mde verify`, Features row)?
- `engineering-for-reuse/model-declared-once` Is each entity's model declared once, and is duplicated code below the threshold the Reuse row reports?

### Logging  `[feature: logging]`

- `logging/one-logger` Is there one shared logger, with no console output elsewhere in the backend, and does it write `correlationId` and `principalId` (`mde verify`, Logging row)?

### Source traceability  `[feature: source-trace-header]`

- `source-trace-header/operations-marked` Does every implemented entity operation carry the `// MDE: <entity>.<op>` marker at its route, service, and repository (`mde verify`, Operation markers row)?

### Stack-conformant source  `[feature: stack-conformant-source]`

- `stack-conformant-source/stack-dependencies` Are the declared stack's choices (backend, database, frontend, UI, build) among the application's dependencies (`mde verify`, Stack conformance row)?
- `stack-conformant-source/no-placeholders` Is no `TODO`, `FIXME`, or "not implemented" left in shipped source (`mde verify`, No placeholders row)?
