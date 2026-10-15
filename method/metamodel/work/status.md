---
type: concept-type
title: Status
description: The current state of the work: what has been done and what comes next.
icon: 📍
---

# Status

Status records where the current work stands, so a person or an AI can pick it up without asking. It lives in `work/current/status.md` as part of [Current Work](current-work.md).

## Content

One section each, in this order: `## Stage`, `## Approved`, `## Progress`, `## Next`.

- **Stage** — the stage the work is in, and its state: **passed**, **failed** (still failing after one fix), or **blocked** on a question.
- **Progress** — what has been done, with the evidence for it.
- **Next** — the recommended next step, and why: usually the next stage; the user decides whether to move on.
- **Approved** — the stages the user moved on from, each with the date and its state at the time (passed, failed, or blocked, with what was left open). Moving on is the user's approval (see [Proceed](../../commands/proceed.md)); this is its record. Kept for the whole Goal.

Keep it short and current: replace stale entries rather than appending forever. Durable application knowledge belongs in Specs, not here, and open questions belong in [Questions](questions.md).

An older append-only `work/status.jsonl` (one JSON record per line) is still read by the Workbench for projects that have one.
