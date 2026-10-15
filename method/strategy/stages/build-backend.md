# Backend

Building the server side on the skeleton: the API, business logic, persistence, and integrations, following the resolved Architecture and stack. A stage of the [Guided](../guided.md) and [Controlled](../controlled.md) Strategies.

**Targets:** [API](../../targets/app/api.md), [persistence](../../targets/app/persistence.md), [server](../../targets/app/server.md), [integration](../../targets/app/integration.md).

## Control

Build against the Specs. The code stays consistent with them, and when a material decision would otherwise be made implicitly in code, surface it to the user instead of leaving it as an unstated assumption.

Build incrementally against the requirements available, doing the design as the implementation takes shape.

**An operation is done only when it is proven.** What an operation built here must prove is the [Testing baseline](../../targets/app/testing.md#baseline) (Behavior, API, Persistence, Artifacts, as they apply); its tests are written with the operation, in every Strategy that keeps the Testing Target.

**Controlled:** before building a scope, its requirements and design have passed their controls, the Architecture and stack are resolved, and open decisions that code would otherwise embed have been put to the user.

## Verify in the loop

As each Target of this stage is produced or changed, verify it yourself in the loop: `mde verify --current`, fix what it reports, and verify again until it passes ([How a stage runs](../guided.md#how-a-stage-runs)). Run it yourself, as part of the stage; never ask the user to. Report the stage only when its Targets pass, or with the Finding a repeated failure left.
