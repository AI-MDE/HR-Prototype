# AI Agent Instructions

Read `bootstrap.md` before doing anything else in this project.

The MDE commands are text the user types to you, in any agent: `mde proceed`, `mde verify`, `mde audit`, `mde review`, `mde release`, `mde update`. Each is a page of the Method's `commands/`; the bootstrap says where.

Verify your own work as you go, in every Strategy: each time you produce or change a Target's output, run `mde verify --current` yourself, fix what it reports, and run it again until it passes. Never ask the user to run `mde verify`, or any check, test, or build you can run.
