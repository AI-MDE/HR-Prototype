# Release

Shipping a release once the work is done: deployment and the release itself, when the user asks for one (`mde release`). It follows the stage sequence rather than being one of its steps. A stage of the [Guided](../guided.md) and [Controlled](../controlled.md) Strategies.

**Targets:** [deployment](../../targets/app/deployment.md), [evidence](../../targets/app/evidence.md).

## Control

Git is authoritative for release and version history; do not keep a separate record of it.

The user has seen what is shipping and said go, and nothing known to be broken is left unmentioned. This gate never relaxes: moving fast elsewhere never means releasing something the user has not seen.

**Controlled:** before release, every applicable check of the Targets in scope has passed or been waived by the user, as shown by a current [Evidence Package](../../metamodel/evidence/evidence-package.md); any review the user set is complete; blocking findings are fixed or explicitly accepted by the user; and the work is consistent with the Goal and the Specs.

## Release instructions

To release (`mde release`):

1. Make sure every step is committed and the working tree is clean.
2. Invoke the dedicated verification activity for the release scope; run `mde verify` for the Targets' Checks and have a second agent audit their Audit (see [`mde verify`](../../commands/verify.md)). Read the resulting Evidence Package (`evidence/README.md`), including unexecuted checks and open findings. Controlled: every applicable check passed and the audit is clean, or each was explicitly waived, and any review the user set is complete. An earlier run does not verify later changes.
3. Prepare the [Release Notes](../../metamodel/work/release-notes.md) in `work/current/release-notes.md`, and make sure the guides in the App area's `docs/` match what ships ([Documentation](../../metamodel/documentation.md)).
4. Show the user what is shipping, what changed since the last release and anything known to be broken, and get their explicit go. Never infer it.
5. Tag the released commit in Git with the version, with the release notes as its message. The tag is the record.
6. Tell the user what was released and under which tag. Completed Current Work worth keeping may then move to `work/history/`.
