# Design

How the requirements are realized within the selected architecture and stack, captured as the [Design](../../metamodel/design/README.md) concepts define. What good design looks like (design activity, decisions and traceability, optional Feature realization, sample data, verifying requirements and design) is in its Targets. A stage of the [Guided](../guided.md) and [Controlled](../controlled.md) Strategies.

**Targets:** [application design](../../targets/design/application-design.md), [API design](../../targets/design/api-design.md), [UI design](../../targets/design/ui-design.md), [persistence design](../../targets/design/persistence-design.md).

## Control

The AI performs design for the requested scope. Missing business policy is surfaced to the user, never invented as a design choice.

Design is thinking done before or while building the affected behavior, not a separate phase; it may evolve through a prototype. Record decisions as they settle.

**Controlled:** before a concept is built, its requirements exist, its design is captured (on the owning concept or as a design concept), consequential decisions are explicit, and the user has accepted the design for the scope by moving on. When design is reviewed, report it as grounded in its requirements, or name the drift.

## Verify in the loop

As each Target of this stage is produced or changed, verify it yourself in the loop: `mde verify --current`, fix what it reports, and verify again until it passes ([How a stage runs](../guided.md#how-a-stage-runs)). Run it yourself, as part of the stage; never ask the user to. Report the stage only when its Targets pass, or with the Finding a repeated failure left.
