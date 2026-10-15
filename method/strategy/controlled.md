---
title: Controlled
description: Specification-driven. Verification is immediate: every stage is verified before the next; choices are confirmed and releases verified.
order: 3
targets: architecture
verification: immediate
---

# Controlled Strategy

Use this Strategy when the current Goal is to build the application and the user wants rigor: every stage verified as it completes, explicit choices, and verified releases.

Follow the [Guided Strategy](guided.md) (its stages, how a stage runs, questions, findings, review, and user authority) with these changes. Where a stage page has a **Controlled** line, it replaces that stage's Guided behavior.

- **Immediate verification.** Each Target is verified in the loop as it is built, as in Guided; and every stage also ends with the verification of the whole: its output is verified against the Checks of its Targets (`mde verify`) and audited by a second agent against their Audit, and the result kept as Evidence (see [`mde verify`](../commands/verify.md)). On a failure, fix it once and verify again; if it still fails, the stage stops as failed, recorded as a Finding, until the user decides. A stage is complete when its Checks pass and its audit finds nothing fake, or the user explicitly waives them; known gaps stay visible either way.
- **Questions wait.** An open question waits for an answer when it would otherwise become implementation behavior; a stated default is not enough.
- **Choices are confirmed.** A proposed default (a technology, a design, a requirement) is not a decision until the user confirms it.
- **Verified releases.** Before release, every applicable Check of the Targets in scope has passed and their audit is clean, as shown by a current [Evidence Package](../metamodel/evidence/evidence-package.md), or has been explicitly waived.

Review is as in Guided: the user's feedback and corrections, at any time. A formal review the work waits for happens only when the user sets one.
