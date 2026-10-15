---
type: concept-type
title: Review
description: A review session the user conducts in the Workbench over the pages changed between two commits.
icon: 🔍
---

# Review

A review session the user conducts in the Workbench, to give feedback and corrections on the Specs at any time; it does not hold up the work unless the user asks for a review to wait on. It covers a scope of pages, compared between a baseline and a target commit, with each page's review status and the user's comments. How the agent responds to one is in the [Guided Strategy](../../strategy/guided.md#review).

## Location

`work/reviews/<id>.json`, one file per review, created and edited by the Workbench.

## Structure

- **id**, **title** — the review's id (equal to the filename) and name.
- **scope** — the areas under review (for example `requirements`, `design`, `architecture`, `app`).
- **baselineCommit**, **targetCommit** — the commits being compared; **changedFiles** — the pages that changed between them.
- **pages** — per page: its **status** (`Not reviewed`, `Looks correct`, `Needs change`, `Needs clarification`, `Not applicable`) and the user's **note**.
- **lifecycleStatus** (`active` or `closed`), **createdAt**, **closedAt**.
