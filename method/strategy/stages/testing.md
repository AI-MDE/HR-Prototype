# Testing

Proving that the application behaves as the Specs say, and keeping the proof as evidence. What must be proven, and what good tests and evidence look like, is in the Targets: the [Testing baseline](../../targets/app/testing.md#baseline) and the [evidence](../../targets/app/evidence.md) Target. This page says only when, and how strictly. A stage of the [Guided](../guided.md) and [Controlled](../controlled.md) Strategies.

**Targets:** [testing](../../targets/app/testing.md), [evidence](../../targets/app/evidence.md).

## Control

Test while building: the tests the Testing baseline calls for are written as each stage builds, in every Strategy that keeps the Testing Target. A commit may precede formal verification, but no stage that builds is complete until its tests exist and pass. Before a release, run the complete suite. Never delete, skip, or weaken a test to get a pass.

**Guided:** each Target is verified in the loop as it is built, by the agent; the verification of the whole (`mde verify` and the audit) runs when the user asks, and before a release; known gaps stay visible as Findings.

**Controlled:** every acceptance condition in scope is also proven by an executed scenario, and the stage is verified as it completes; it is complete when its Checks have passed or the user has waived them.

## Verify in the loop

As each Target of this stage is produced or changed, verify it yourself in the loop: `mde verify --current`, fix what it reports, and verify again until it passes ([How a stage runs](../guided.md#how-a-stage-runs)). Run it yourself, as part of the stage; never ask the user to. Report the stage only when its Targets pass, or with the Finding a repeated failure left.
