---
type: concept-type
title: Work Targets
description: The Goal's Targets and what has been done to each, a record per Target and scope, as dates.
icon: 🎯
---

# Work Targets

`work/targets.json` is the one place the tools read what the work is held to and how far it has come: the [Goal](goal.md)'s Targets, and for each, a record per scope of the work saying when it was started, completed, verified, and audited, or that it is delayed or left out. It is a log of the work, kept as it happens. The Goal itself (`work/goal.md`) says the same for people, in words, and holds the Goal's scope.

## Structure

The first level is the Target (by its id); the second is a scope of the work on it; the value is that scope's record.

```json
{
  "business-requirements": {
    "*": { "started": "2026-10-08T09:00:00Z", "completed": "2026-10-08T15:02:00Z", "verified": "2026-10-08T15:40:00Z", "audited": "2026-10-08T16:10:00Z" }
  },
  "architecture": {
    "*": { "started": "2026-10-09T09:00:00Z", "completed": "2026-10-09T11:00:00Z", "verified": "2026-10-09T11:20:00Z" }
  },
  "api": {
    "client-management": { "started": "2026-10-10T09:00:00Z", "completed": "2026-10-10T18:30:00Z", "verified": "2026-10-10T18:45:00Z" },
    "engagements": { "started": "2026-10-11T09:00:00Z" },
    "billing": { "delayed": "until the next Goal: billing waits for the bank's API" }
  },
  "web-ui": {
    "client-management": {
      "started": "2026-10-11T10:00:00Z",
      "waived": [{ "check": "end-to-end-tests/use-cases-walked", "reason": "no use case has a screen yet", "date": "2026-10-11" }]
    }
  },
  "testing": { "*": {} },
  "deployment": { "*": { "leftOut": "no deployment in this Goal (agreed 2026-10-08)" } }
}
```

**The Targets.** Every Target the Goal takes is listed, and every one of the architecture's it does not: what the Strategy's logic keeps from the architecture's, as agreed with the user ([Strategy](strategy.md#which-targets-how-rigorously)). A Target the Strategy and architecture give that is not listed makes the Goal out of step. An empty file (`{}`) means the Goal's Targets are not settled yet (before the architecture is chosen): the tools derive them from the Strategy and the architecture, and the Evidence page says the Goal does not record them.

**The scopes.** Each record is for one scope of the work on its Target:

- `*`: the whole Goal. The Specs Targets (requirements, architecture, design) usually take one record for the whole.
- a capability's name (its folder name): a vertical slice of the Goal. A Target built slice by slice has one record per capability it has reached.
- one requirement: `use-case:<name>`, `page:<name>`, `pages` (every page), `operation:<Entity>.<operation>`, `rule:<slug>`, or `feature:<id>`.

The slice the work is on is what its records name, the delayed ones aside: a requirement of a capability or use case outside it is left for a later slice, not missed. With no record naming a capability or use case, the whole of the Goal's scope is in.

**The record.** Each field is written by whoever earns it; dates are ISO 8601.

| Field | Written by | When |
|---|---|---|
| `started` | the agent | it begins the work on that scope |
| `completed` | the agent | the work on that scope is done and `mde verify --current` passes for it: every Check it can meet is met, and nothing in that scope is left for it |
| `verified` | `mde verify` | after it was completed, a run in which all its Target's evidence passed (or was waived); a failing run leaves the last date |
| `audited` | the auditing agent ([`mde audit`](../../commands/audit.md)) | a second agent has judged it and written its Audit Report |
| `waived` | the agent, only when the user gives it explicitly | the user's [waivers](strategy.md#waivers): a box of the Evidence (`item`, its id) or a single Check (`check`, its id, as `targets/verification/<target>.md` shows it) accepted as not passing, each with the reason and the date |
| `delayed` | the agent, as agreed with the user | that scope is put off: until when, and why. Delayed on `*`, the whole Target waits |
| `leftOut` | the agent, as agreed with the user | on `*` only: the Goal does not take this Target at all, and why. It stays on the [Evidence Package](../evidence/evidence-package.md), named *left out by the Goal* |

A delay says *not yet*; a waiver says *accepted as it is*. Both are visible in the Evidence, and neither is ever counted as passed. A requirement in scope, not built and not delayed, is missed: [Coverage](../evidence/coverage.md) reports it, and it is a [Finding](finding.md).

The Goal's scope (the whole application, or the capabilities it covers) is in `work/goal.md`'s front matter, `scope`. Everything outside it is out of this Goal's scope: not built, not counted, and shown as such, never as missed.

## What the records decide

Each Target the Goal keeps is:

| State | When | Verify | Audit |
|---|---|---|---|
| **Completed** | every record started is `completed` | graded: its evidence sets the verdict; a failure after completion is a regression | audited |
| **In progress** | a record is `started` and not `completed` | measured and shown, never counted in the verdict; what `mde verify --current` checks | not audited unless named |
| **Later** | no record is started (or every one is delayed) | shown as later | not audited |
| **Not kept** | `leftOut` | shown, named left out | not audited |

A completed record whose `verified` or `audited` is missing or older than its `completed` is **stale**: the Evidence shows *not verified since* or *not audited since*. Changing completed work again (a fix, a new requirement) clears nothing: its `completed` is set anew when the change is done, which makes its verification and audit stale until they run again.

**Only dates, never statuses.** Whether a Target passes is the Evidence's, measured each run; the file records only when each thing last happened, so it cannot claim a pass the Evidence does not show.

## Keeping it

- Once the architecture is settled, the agent lists the Goal's Targets, each with `{ "*": {} }` until its work starts, and those left out with their reason, as agreed with the user.
- The agent sets `started` on a scope's record when it begins that work, and `completed` when the work is done and its own verification passes (`mde verify --current`, in the loop of [How a stage runs](../../strategy/guided.md#how-a-stage-runs)). It says so in [Status](status.md), and never sets `completed` for work that is not done, or does not pass, to get it graded. It never writes `verified` or `audited` by hand.
- A new slice is a new record: the capability's name under each Target it reaches, started as its work begins. The earlier records stay as history.
- `leftOut`, `delayed`, and the Goal's `scope` change only as the [Goal](goal.md#keeping-the-goal-in-step) does, agreed with the user.
- Git keeps the history of the file. An application with the file's first shape (`targets`, `leftOut`, `scope`, `slices`), or from before the file, is converted by [`mde update`](../../commands/update.md).
