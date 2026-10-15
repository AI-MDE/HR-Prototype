---
type: concept-type
title: Current Work
description: The bounded work currently being performed toward a Goal.
icon: 🔨
---

# Current Work

Current Work is the bounded work the user is doing now: what is being worked on, the active Strategy, and the expected output when useful. MDE does not require Phase, Work Package, or similar organizational labels; Scope is recorded only when the work is a slice of the application (below). Current Work records what was done and why; durable application knowledge belongs in Specs.

## Location

The `work/` area. These are the only things in it, whatever the Strategy:

| Path | What | Written by |
|---|---|---|
| `work/goal.md` | the [Goal](goal.md) | the user and the agent |
| `work/targets.json` | [Work Targets](targets.md): the Goal's Targets, a record per Target and scope (started, completed, verified, audited), what is delayed, and the user's waivers | the agent (dates also by `mde verify` and `mde audit`), agreed with the user |
| `work/current/README.md` | this concept (`type: current-work`): what is being worked on, the active Strategy | the agent |
| `work/current/status.md` | [Status](status.md) | the agent |
| `work/current/questions.md` | [Questions](questions.md) | the agent, answered by the user |
| `work/current/findings.md` | [Findings](finding.md) | the agent |
| `work/current/release-notes.md` | [Release Notes](release-notes.md), while a release is prepared | the agent |
| `work/current/method-update/` | the latest Method update's report, with MDE's versions of files to merge; removed once merged ([`mde update`](../../commands/update.md)) | `mde update-app`, run by the agent for `mde update` |
| `work/reviews/<id>.json` | [Reviews](review.md) | the user, in the Workbench |
| `work/notes/annotations.jsonl`, `work/notes/page-annotations.jsonl` | [Annotations](annotation.md) | the user, in the Workbench |
| `work/history/<work>/` | completed current work worth keeping (the files above, moved as they were) | the agent, when the work completes |

Nothing else goes in `work/`:

- **Scripts**: a one-off script the agent writes to make a change is temporary; delete it once it has run (or use a temporary folder outside the project). A script worth keeping is part of the application, in the App area, declared as a project operation.
- **Test output and logs**: they are evidence, written to `evidence/` by `mde verify` and the test suites; anything else is not kept.
- **The agent's own analysis** (an impact assessment, a recheck, a reconciliation): its conclusions go in `findings.md` and `status.md`, briefly; never as separate reports.
- **Durable knowledge**: a decision goes where it applies (the architecture, an Entity Design, the catalog, the page set), requirements in the requirements Specs; never in a notes file.
- **Copies** of Specs, Method files, or earlier versions: Git keeps history.

## Scope, slices, and the records

The Goal's scope is in `work/goal.md`. The slices the work is built in, what has been started and completed on each Target, what is delayed, and the user's waivers are in [`work/targets.json`](targets.md), a record per Target and scope. Current Work does not repeat them.

## Structure

`work/current/README.md`, with front matter `type: current-work`:

- What is being worked on, and the expected output
- Strategy: a link to the Method's Strategy file (`strategy/prototype.md`, `guided.md`, or `controlled.md`), the same one the Goal names
- Links to the status, questions, findings, and any open reviews
