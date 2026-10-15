---
type: concept-type
title: Audit Report
description: A second agent's verdicts on one Target's Audit concerns, each with a witness and a fix.
icon: 🕵️
---

# Audit Report

What a second agent found when it audited the work for one Target: `evidence/audit/<target>.md`. The agent is a sub-agent or a fresh session that did not build the work; [`mde audit`](../../commands/audit.md) asks it to judge the Target's Audit concerns (`targets/audit/<target>.md`), limited to the scope, by reading the Specs and driving the running application. The [Evidence Package](evidence-package.md) counts its verdicts and links to it. The architecture's report is the [Architecture Audit](architecture-audit.md).

Audit is distinct from verification and from review: `mde verify` proves the Checks a script settles; the audit judges what no script can; the user's review is their decision on the work.

## Content

- The scope audited, and the Targets' audit views it judged against.
- One row per concern: the **concern** (the artifact, control, or operation, named), the **verdict** (genuine, fake, or not-exercised, with why it could not be driven), the **witness** (what was observed: a server-log line, a read-back after a mutation, the text quoted), the **severity**, and the **fix**.
- A summary line, *N genuine · M fake · K not-exercised*, then the fakes, most severe first, with their fix.
- For an output that realizes the architecture (the server, the web UI), a *Conformance* section: one row per architecture decision it realizes, with where it is realized (paths or modules), how it is checked, and its status (conforms, violates, or not checked); and a diagram of the code's actual dependencies (Graphviz DOT rendered to SVG with `mde render-diagrams`) next to the intended [Architecture Diagram](../architecture/architecture-diagram.md), when the stack can produce one.

Each fake on an in-scope concern is also recorded as a [Finding](../work/finding.md).

Its rules and checks are in the [evidence](../../targets/app/evidence.md) Target.
