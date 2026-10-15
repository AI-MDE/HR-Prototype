---
type: verification-view
title: Verification — business-requirements
---

# Verification — business-requirements — COMPILED from features' `## Verify`

<!-- COMPILED by compile-targets.mjs. Do not hand-edit — edit each feature's ## Verify and
     recompile. These are the Checks `mde verify` proves by script or test run; what needs
     judgment is in targets/audit/. This is the VERIFICATION PART of the business-requirements target: these check blocks live
     HERE and nowhere else. targets/requirements\business-requirements.md holds the
     generation behavior; targets/audit/business-requirements.md holds the audit concerns. -->

### ABEs  `[feature: business-requirements-abe]`

- `business-requirements-abe/entity-placement` Is every entity in an ABE folder under its home capability, with one Primary Entity per ABE (named after its folder), and is every entity name unique (`mde verify`, Entity placement row)?

### Business Rule  `[feature: business-requirements-business-rule]`

- `business-requirements-business-rule/rule-ids` Is every rule of its own file linked from an entity it governs, and every rule id used once (`mde verify`, Business rules row)?

### Capability  `[feature: business-requirements-capability]`

- `business-requirements-capability/overview-lists` Does each capability's overview list the ABEs it uses, its own first, and link each of its workflows (`mde verify`, Capabilities row)?

### Domain  `[feature: business-requirements-domain]`

- `business-requirements-domain/domain-written` Are the Domain's Purpose and Scope written, not left as "Not yet described" (`mde verify`, Domain row)?
- `business-requirements-domain/links-resolve` Does every link inside the requirements resolve (`mde verify`, Requirement links row)?

### Entity  `[feature: business-requirements-entity]`

- `business-requirements-entity/entity-model` Does every entity have an attributes table with types of the Method and a key, a Display label naming its attributes (not the bare id), its relationships as the table (Related, Role, Cardinality, Kind, Cascade) with valid values linking real entities, transitions only between its declared states, and an enum attribute holding those states (`mde verify`, Entity model row)?
- `business-requirements-entity/operations-used` Is every operation that changes something invoked by some use case (`mde verify`, Operations used row)?

### Role  `[feature: business-requirements-role]`

- `business-requirements-role/roles` Are roles kept only at the top level (`specs/requirements/roles/`), each the actor of some use case (`mde verify`, Roles row)?

### Use Case  `[feature: business-requirements-use-case]`

- `business-requirements-use-case/use-case-references` Does every use case name roles that exist as its actors, and invoke only operations its entities declare (`mde verify`, Use case references row)?
