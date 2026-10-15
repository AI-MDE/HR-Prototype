# Release

`mde release [scope]` (said to the agent)

Releases the work: follow the [release instructions](../strategy/stages/release.md#release-instructions). In short: everything committed; verification run for the release scope (`mde verify` and the audit, through [`mde verify`](verify.md)); release notes prepared and the guides in step; the user shown what ships, what changed, and anything known to be broken, and their explicit go; the released commit tagged.

Nothing is released that the user has not seen and approved. Under the [Controlled](../strategy/controlled.md) Strategy, every applicable Check has passed or been waived first.
