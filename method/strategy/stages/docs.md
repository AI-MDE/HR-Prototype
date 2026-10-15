# Docs

The application's documentation: the user guides in the App area's `docs/`, and the user guide sections of the use cases, kept in step with what is built. A stage of the [Guided](../guided.md) and [Controlled](../controlled.md) Strategies.

**Targets:** [documentation](../../targets/app/documentation.md).

## Control

Documentation describes what the application does now: when a page or a use case changes, the guides that describe it change with it (see [Documentation](../../metamodel/documentation.md)). Write for the application's users, not about the Method.

**Controlled:** before release, the guides match what ships.

## Verify in the loop

As each Target of this stage is produced or changed, verify it yourself in the loop: `mde verify --current`, fix what it reports, and verify again until it passes ([How a stage runs](../guided.md#how-a-stage-runs)). Run it yourself, as part of the stage; never ask the user to. Report the stage only when its Targets pass, or with the Finding a repeated failure left.
