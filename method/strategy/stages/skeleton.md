# App skeleton and tooling

The application's runnable shell before features are built into it: the project layout from the chosen stack, its build, test, and start scripts, its configuration, and the database it creates and migrates. A stage of the [Guided](../guided.md) and [Controlled](../controlled.md) Strategies.

**Targets:** [dev setup](../../targets/app/dev-setup.md), [run app](../../targets/app/run-app.md).

## Control

The skeleton runs from a fresh clone with one command before any feature is built on it: `mde:install`, `mde:start` (creating the database when it is missing, migrating, seeding, starting every tier), and `mde:health`. Declare the application's `mde:build` and `mde:test` scripts so `mde verify` can run them. Run it and report what you ran and saw; when it fails, fix it rather than handing the user steps to make it start.

**Controlled:** the Architecture and stack are resolved and confirmed before the skeleton is generated.

## Verify in the loop

As each Target of this stage is produced or changed, verify it yourself in the loop: `mde verify --current`, fix what it reports, and verify again until it passes ([How a stage runs](../guided.md#how-a-stage-runs)). Run it yourself, as part of the stage; never ask the user to. Report the stage only when its Targets pass, or with the Finding a repeated failure left.
