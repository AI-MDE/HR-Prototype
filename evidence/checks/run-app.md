# Run the application — what a script can prove

Its runtime scripts, its last start and health, and where its API base comes from.

| Check | Status | Result |
|---|---|---|
| [Runtime scripts](#runtime-scripts) | ✅ passed | 5 roles declared |
| [Start and health](#start-and-health) | ✅ passed | started; health names the application and its dependencies |
| [Base path](#base-path) | ✅ passed | the API base from configuration |

## Runtime scripts

<a id="runtime-scripts"></a>Every runtime role is a real script, and destructive resets are kept apart.

No problems.

## Start and health

<a id="start-and-health"></a>The last start succeeded, and health names the application and its dependencies.

No problems.

## Base path

<a id="base-path"></a>The API base comes from configuration: no hard-coded /api, and no fixed CORS origin.

No problems.
