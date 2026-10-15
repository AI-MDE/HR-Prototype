---
type: concept-type
title: Finding
description: A failure, gap, or violation found by verification, and what was decided about it.
icon: 🚩
---

# Finding

A problem verification found: a failed test, an unproven requirement, a coverage shortfall, an inaccurate guide, or an architecture violation. Findings are work to do or decisions to take, so they live in Work: `work/current/findings.md`, as part of [Current Work](current-work.md). The [Evidence Package](../evidence/evidence-package.md) lists the open ones and links here.

## Form

A summary table first, one row per finding, then one `## F-NNN` section each:

| ID | Topic | Severity | Disposition |
|---|---|---|---|
| F-001 | Leave approval ignores overlap | blocking | Open |

Each section says what was found and where, with a link to the evidence that shows it.

- **Severity**: blocking or non-blocking.
- **Disposition**: Open, Fixed (with the commit), or Accepted. Only the user can accept a blocking finding, and the acceptance says why.

How findings are opened, kept, and closed is in the [Guided Strategy](../../strategy/guided.md#findings).
