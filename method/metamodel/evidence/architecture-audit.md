---
type: concept-type
title: Architecture Audit
description: A second agent's judgment of each architecture decision: resolved, traceable to a need, and consistent with the stack and the other decisions.
icon: 🔬
---

# Architecture Audit

The architecture's [Audit Report](audit-report.md): `evidence/audit/architecture.md`. A second agent, a sub-agent or a fresh session that did not write the architecture, writes it when [`mde audit`](../../commands/audit.md) asks for the audit. It judges the architecture as an output of its own stage, from the Specs alone, so it can be done before any code exists.

## Content

- One row per decision in `specs/architecture/`: whether it is **resolved** (a concrete choice, nothing left to decide), **traceable** (to a need of the requirements, the stack, or a constraint), and **consistent** (with the stack and the other decisions); its status: sound, unsound (with why and the fix), or not judged.
- A short narrative for what the rows do not say: a gap between decisions, a decision the requirements need but the architecture lacks.

Whether the code follows the decisions is judged where the code is: in the *Conformance* section of the server's and the web UI's Audit Reports ([conformance](../../features/architecture/conformance.md)).

Its rules and checks are in the [evidence](../../targets/app/evidence.md) Target.
