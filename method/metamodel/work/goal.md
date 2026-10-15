---
type: concept-type
title: Goal
description: The result the user is ultimately trying to achieve.
icon: 🎯
---

# Goal

A Goal is the result the user is ultimately trying to achieve.

The user owns the Goal and controls the journey. AI may recommend useful next work but does not impose a rigid path.

When the Goal looks achieved, the AI says so, with what shows it; the user has the final word, and sets the next Goal.

## The contract: Goal, Strategy, Specs, implementation

The Goal sets the contract for the work, in layers, each with one job:

| Layer | Decides | Recorded in |
|---|---|---|
| Architecture | the candidate [Targets](../../targets/README.md), from the selected stack | `specs/architecture/overview.md` front matter (`stack`, `targets`) |
| **Goal** | **the scope**: the whole application, or part of it (capabilities), built in slices | `work/goal.md` front matter (`scope`) |
| **Strategy** (the Goal's) | which of the architecture's Targets apply, by its own logic, and how rigorously they are verified | `work/goal.md` front matter (`strategy`); the Strategy's own front matter (`targets`, `verification`) |
| **Targets** (the Goal's) | the Targets this Goal is held to: what the Strategy's logic keeps from the architecture's, as agreed with the user, and how far each has come (dates) | [`work/targets.json`](targets.md) (a record per Target and scope), and the Goal's *Targets* section |
| Specs | **how many**: the entities, use cases, pages, and applied Features in that scope (the *Want*) | the Specs |
| Implementation | **how many are done** (the *Have*), as `mde verify` measures it | the App area, measured into Evidence |

So the Goal and its Strategy set the foundation before the objects are known: for this scope, these kinds of things must exist and be proven (every use case walked in the browser, every write checked in the database, every applied Feature's promises proven). The Specs turn that into numbers as they are written; the implementation closes the gap. The [Evidence Package](../evidence/evidence-package.md#outline-want-and-have) shows exactly this: its boxes come from the Goal and Strategy, its Wants from the Specs, its Haves from `mde verify`.

## Structure

`work/goal.md` states the Goal for people: what is wanted, its Strategy, its scope, and its Targets, in words. Its front matter names the Strategy, and the scope when the Goal is part of the application; the Targets and how far each has come are for tools, in [`work/targets.json`](targets.md):

```markdown
---
type: goal
title: Customers and equipment, end to end
strategy: guided
---

# Goal

Build customer and equipment management end to end: the backend on the real database, the pages, and their proof.

## Strategy

[Guided](../method/strategy/guided.md): each Target is verified as it is built; the whole is verified and audited when asked, and before a release; the testing baseline is not advisory.

## Targets

The architecture's Targets ([overview](../specs/architecture/overview.md)), kept by the Guided Strategy, as of 2026-10-08:

- business-requirements, architecture, application-design, api-design, ui-design, persistence-design
- api, persistence, server, web-ui
- testing, evidence, documentation
- dev-setup, run-app

Left out: deployment (no deployment in this Goal, agreed 2026-10-08).
```

- `strategy`: the id of a Strategy in `method/strategy/` (`prototype`, `guided`, `controlled`).
- `scope`: left out for the whole application; else the capabilities the Goal covers, by their folder names (`scope:` then `  capabilities: [client-management, engagements]`). Everything outside it is out of this Goal's scope: not built, not counted, and shown as such, never as missed.

The *Targets* section and `work/targets.json` say the same: the section in words, with the date the Targets were settled and why any architecture Target is left out; the file as the Targets it lists, and `leftOut`. Which Targets are graded now is the records': those completed ([Work Targets](targets.md#what-the-records-decide)).

## Keeping the Goal in step

The Goal is written before the architecture exists, so `work/targets.json` starts empty, and either of the things it is built from can change after it is written. **The agent reviews `work/goal.md` whenever the Strategy or the architecture changes**, and before telling the user a Goal is achieved:

- **The architecture is settled** (the Architecture stage completes) or changes (another stack, a Target added to or removed from the overview's `targets`): propose the Goal's Targets anew from the Strategy's logic, and record them once the user agrees.
- **The Strategy changes** (the user says so, in plain words): follow [Changing the Strategy](strategy.md#changing-the-strategy).
- **The scope changes**: update `scope` in `work/goal.md`'s front matter, and say so in the text. A new slice is a new record in `work/targets.json`, not a change of the Goal.

The agent never changes the Goal's Targets silently: it says what changed and why, and the user agrees, as for any change to the Goal. A Goal whose Targets no longer match its Strategy and architecture is shown as out of step on the Evidence page until it is reviewed.

Within the Goal's scope, [`work/targets.json`](targets.md) records what has been done to each Target, scope by scope, and what is delayed; [Current Work](current-work.md) records what is being done.
