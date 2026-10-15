---
type: feature
kind: build
id: traceability-to-business-specs
title: Traceability to business specs
origin: mde
impacts:
  - application-design
default: n/a
---

# Traceability to business specs

## Purpose

Every design artifact must trace back to business specs (capability, entity, use case, or
rule) — design is the bridge, not a new source of truth.

## Applicability

Applies to the scoped application design concerns. Reuse resolved decisions and the current Meta-model; do not require a separate artifact where the owning concept already records the design.

## External Standards

External standards are background references, not a declaration of compliance.

- **ISO/IEC/IEEE 42010** — https://standards.ieee.org/ieee/42010/6846/
  - ARC-42010-09 (Maintain correspondence between views)
- **arc42** — https://arc42.org/overview
  - ARC42-01 (Introduction and goals)

## Impact on application-design

Design is the bridge from requirements to code, not a new source of truth.

- Every design artifact traces to the requirement it realizes: a capability, entity, use case, or business rule. Design entities match the business entities they implement; business logic stays in the domain, not in the UI or persistence.
- A use case's trace runs out of its `usecase` block: attach to a step by its step id, never its sequence number, and resolve each step's `operation.target` to a declared entity operation or page. A step never references a business rule; rules govern the operation it invokes, and rule coverage comes from execution evidence.
- Design may resolve references and add each condition's test layers, but never silently changes a use case's actor, intent, steps, or a condition's situation or expected result. If behavior must change, change the use case first.
- A "traces to" line is not traceability: the artifact must actually mirror what it cites (names, fields, operations, behavior).

## Audit

- Does each design artifact actually mirror the requirement it cites, does every in-scope requirement have a design counterpart, and is logic in the right layer? Report the design as grounded, or name the drift.

Judge whether the design **actually derives from the business specs** — not just that a
"traceable to X" line was written. Read the design artifacts against the BA they claim to
implement, looking for real correspondence, drift, and gaps.

For a sample of design artifacts (entities, pages, decisions): does each reflect a *specific*
business entity/use-case/rule, with matching names, fields, and behaviour — or is the trace a
nominal citation to a spec the design doesn't actually mirror (a design entity missing fields
the business entity declares; a page whose operations don't match the capability's; a decision
citing a requirement it doesn't address)? Conversely, is any in-scope business concept **absent**
from the design (a use case with no page, an entity with no design counterpart)? And is business
logic correctly *placed* — not smuggled into the UI or persistence layer.

Report the design as **grounded** (each artifact genuinely mirrors its business source, no
in-scope concept missing) or **drifted** (name the artifacts whose trace is nominal, the missing
concepts, or the mislayered logic). A "traces to …" annotation is not traceability if the design
doesn't match what it cites.

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on application-design

Design is the bridge from requirements to code, not a new source of truth.

- Every design artifact traces to the requirement it realizes: a capability, entity, use case, or business rule. Design entities match the business entities they implement; business logic stays in the domain, not in the UI or persistence. Each diagram lives in the `diagrams/` folder of the section it depicts (requirements, architecture, or design), a view tracing to its source.
- A "traces to" line is not traceability: the artifact must actually mirror what it cites (names, fields, operations, behavior).

**Use-case trace.** The use case's ```usecase DSL block is the behavioural source of truth
(the [Use Case](../../metamodel/requirements/use-case.md) concept), and the trace runs out of it:

- a **step** joins to everything that attaches to it by its **step id** — never by its sequence
  number, which is derived narrative and shifts whenever a step is inserted;
- a **condition** attaches to a step by `at-step` (an id) or to the use case itself, and joins to
  the scenarios that `prove` it by title;
- a step **invokes** an entity operation or a page through `operation.target` — a logical id design
  resolves to a declared entity operation (use-case realization, in the [Design](../../metamodel/design/README.md) concept);
- a step **never** references a business rule: rules govern the operation it invokes, and rule
  coverage comes from execution evidence.

Design may resolve logical references and add each condition's `test-layers`, but must **not
silently change** the actor, business intent, steps, or a condition's situation / expected result.
If design discovers the behaviour must change, the DSL is updated first, through the governed
change process.
