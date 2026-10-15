---
type: verification-view
title: Verification — method-change
---

# Verification — method-change — COMPILED from features' `## Verify`

<!-- COMPILED by compile-targets.mjs. Do not hand-edit — edit each feature's ## Verify and
     recompile. These are the Checks `mde verify` proves by script or test run; what needs
     judgment is in targets/audit/. This is the VERIFICATION PART of the method-change target: these check blocks live
     HERE and nowhere else. targets/method-change.md holds the
     generation behavior; targets/audit/method-change.md holds the audit concerns. -->

### Method change checks across Features  `[feature: method-change-checks]`

- `method-change-checks/references-resolve` Do all references resolve, and were the indexes and documentation updated with the definitions?

### Method internal consistency  `[feature: method-internal-consistency]`

- `method-internal-consistency/types-shape-only` Does every type definition stay shape only (the contract test passes), and does each rule live in exactly one layer?
- `method-internal-consistency/version-bumped` Were the Method's version and changelog (and the tools', if changed) incremented for this change?

### Semantic references  `[feature: semantic-references]`

- `semantic-references/references-resolve` Do all references resolve to their owning documents?
