---
type: verification-view
title: Verification — architecture
---

# Verification — architecture — COMPILED from features' `## Verify`

<!-- COMPILED by compile-targets.mjs. Do not hand-edit — edit each feature's ## Verify and
     recompile. These are the Checks `mde verify` proves by script or test run; what needs
     judgment is in targets/audit/. This is the VERIFICATION PART of the architecture target: these check blocks live
     HERE and nowhere else. targets/design\architecture.md holds the
     generation behavior; targets/audit/architecture.md holds the audit concerns. -->

### Content  `[feature: architecture-content]`

- `architecture-content/decisions-stated` Is every architecture decision (each leaf section) stated, none left as an empty heading (`mde verify`, Architecture decisions row)?

### Diagrams  `[feature: architecture-diagrams]`

- `architecture-diagrams/architecture-interaction-diagrams` Are the architecture and interaction diagrams delivered with the architecture, in `specs/architecture/diagrams/` (`mde verify`, Architecture diagrams row)?

### Resolve selections into Specs  `[feature: architecture-resolve-selections-into-specs]`

- `architecture-resolve-selections-into-specs/overview-resolved` Does the overview name a stack of the Method and Targets the Method has, with no placeholder (TBD, TODO, "not yet decided") left in the architecture (`mde verify`, Architecture overview row)?
