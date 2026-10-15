# Frontend

Building the user interface: pages, navigation, and interactions, following the UI design, the resolved Architecture, and the stack's UI profile. A stage of the [Guided](../guided.md) and [Controlled](../controlled.md) Strategies.

**Targets:** [web UI](../../targets/app/web-ui.md).

## Control

Build against the Specs: generate the pages from the requirements (entities, use cases, roles, authorization) by the [UI conventions](../../architecture/ui.md#ui-conventions-the-pages-are-generated-not-designed); there are no page specifications. Every page action invokes a declared operation; the interface does not invent business policy or hide business logic. When a material decision would otherwise be made implicitly in code, surface it to the user. When the interface changes, update the user guide sections of the use cases it affects (see [Documentation](../../metamodel/documentation.md)).

Build incrementally; a prototype may come first and drive the design.

**A page is done only when it is proven.** What a page built here must prove is the [Testing baseline](../../targets/app/testing.md#baseline) (UI and Artifacts: its inventory entry, its browser scenarios with screenshots, its place in the [navigation diagram](../../metamodel/design/navigation-diagram.md)); its tests are written with the page, in every Strategy that keeps the Testing Target. A page without them is not built, as far as the evidence shows.

**Controlled:** before building a page, its use cases and design have passed their controls, and the UI design is accepted.

## Verify in the loop

As each Target of this stage is produced or changed, verify it yourself in the loop: `mde verify --current`, fix what it reports, and verify again until it passes ([How a stage runs](../guided.md#how-a-stage-runs)). Run it yourself, as part of the stage; never ask the user to. Report the stage only when its Targets pass, or with the Finding a repeated failure left.
