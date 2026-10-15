---
type: verification-view
title: Verification — persistence-design
---

# Verification — persistence-design — COMPILED from features' `## Verify`

<!-- COMPILED by compile-targets.mjs. Do not hand-edit — edit each feature's ## Verify and
     recompile. These are the Checks `mde verify` proves by script or test run; what needs
     judgment is in targets/audit/. This is the VERIFICATION PART of the persistence-design target: these check blocks live
     HERE and nowhere else. targets/design\persistence-design.md holds the
     generation behavior; targets/audit/persistence-design.md holds the audit concerns. -->

### Design in Features  `[feature: design-in-catalog-terms]`

- `design-in-catalog-terms/designs-use-catalog` Does every capability design apply only known Features and design vocabulary, each to what it applies to, with only its options, and only where its `appliedIn` allows, on entities and operations the requirements declare, delegating only to real operations (`mde verify`, Design row)?

### persistence-design rules  `[feature: persistence-design-rules]`

- `persistence-design-rules/database-matches-mapping` Does the actual database agree with the mapping (a schema dump read against the Storage Views)?

### Schema from entities  `[feature: schema-from-entities]`

- `schema-from-entities/migration-per-entity` For each touched entity, does a migration create its Storage View table with every declared column (`create table` and its columns against the entity's Storage View)?
