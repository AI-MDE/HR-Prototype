---
type: feature
kind: build
id: application-design-aspect-realization
title: Optional Feature realization
origin: mde
impacts:
  - application-design
---

# Optional Feature realization

## Purpose

The rules of the application-design Target for realizing [optional Features](../../metamodel/feature.md): those the requirements apply, and those the design chooses itself.

## Impact on application-design

The requirements may apply an optional Feature, with its options; the design says how the chosen runtime or stack realizes it. The Method's [catalog](../../optional-features/index.md) defines each Feature's meaning, parameters, known realizations and promises; it does not promise that every Feature has an implementation. For each optional Feature in scope, record in the application's [catalog](../../metamodel/design/design-catalog.md) the realization chosen and the one component that implements it, and identify:

- the requirement and the concepts or operations it applies to;
- the implementation mechanism and its owning component, including how the application reaches it;
- configuration and defaults, required model or storage contributions (`adds`), and where it is invoked in the operations;
- API and UI behavior, authorization, failure handling, and its stated constraints with the operation and with other Features (*Before*, *After*, *Atomic*, *After commit*);
- the scenarios that prove each of its promises, on each object that applies it.

A design may apply an optional Feature the requirements did not ask for, as a technical choice, when its `appliedIn` includes `design`; that is recorded in the capability design, not in the requirements. Reference an existing shared implementation rather than duplicating it per entity. Check actual support in the selected runtime or stack: a catalog entry or a checkbox is not support. Where support is missing, specify the reusable capability or application implementation needed. Known gaps and evidence of support are tracked in Work. A design for future implementation is not evidence that the Feature works.

When the stack's Architecture declares an invocation convention (where an entity's implementation lives, and how a Feature call is marked), follow it; `mde verify` checks it ([Architecture](../../metamodel/architecture/README.md)).

## Audit

- Does the design cover the scoped normal, alternate, and failure behavior?
- For each applied optional Feature: is the realization recorded, and is its support in the stack checked rather than assumed?
- Is each capability design index a thin set of references rather than a copy of the detail?
