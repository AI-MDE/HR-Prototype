---
title: Guided
description: Build with momentum. Each Target is verified in the loop as it is built; the whole is verified and audited when the user asks, and before a release. Controls are advisory, except the Architecture choice, the testing baseline, and the release.
order: 2
targets: architecture
verification: delayed
---

# Guided Strategy

Use this Strategy when the current Goal is to build the application and the user wants momentum: work through the stages, keep known gaps visible, and decide as you go. Controls are advisory: when one is not met, say what is missing and keep working. The agent verifies each Target it builds as it goes (generate, verify, fix), running `mde verify --target` itself; the verification of the whole, with its Evidence and audit, is delayed: it runs when the user asks for it, and before a release. Two things never relax: a consequential technology choice is made explicit before it becomes costly to change, and nothing is released that the user has not seen. For verification after every stage, use the [Controlled Strategy](controlled.md), which builds on this one.

**The testing baseline is not advisory.** The [Testing Target's baseline](../targets/app/testing.md#baseline) holds here as in Controlled, wherever its conditions hold. Guided delays when it is verified, not whether its tests are written.

## Transition from Prototype

When switching from Prototype to Guided (or Controlled, which inherits this section), first assess the existing work against the new Goal and the applicable Targets. Record the selected Strategy and the assessment in Current Work; switching Strategy does not approve earlier outputs or verify prototype behavior.

- Select and record the Targets in scope in `specs/architecture/`, resolving architecture and stack choices needed for the Goal: a prototype on `mde-runtime` selects its full stack here. Then review the Goal: its `strategy`, its *Strategy* section, and its Targets (`work/targets.json`), now those this Strategy keeps ([Goal](../metamodel/work/goal.md#keeping-the-goal-in-step)).
- Compare existing Specs and App with those Targets' Outputs and the current Meta-model. For each applicable output, distinguish present and sufficient, present but incomplete or legacy-shaped, missing, and inapplicable with a reason. Include required concepts, their structure and relationships, unresolved decisions, and implementation gaps; do not create every Meta-model type regardless of relevance.
- Carry forward the agreed requirements, data profiles, recorded page set, and generated pages. Fill missing detail supported by existing decisions in its owning Specs; put business policy that needs the user in Questions. Retain known implementation and verification gaps as Findings, and record the remaining work and recommended stages in Status.
- Assess the two things a runtime prototype stands in for and the build does not keep. **Data:** the frontend's data-access module calls the runtime; the Frontend stage replaces it with one calling the application's own backend (`API_BASE`) and sets `SERVER_SOURCE=api`, the pages unchanged ([configured data sources](../features/prototyping/data-source-switch.md)); a page that calls the runtime itself is a gap. **Identity:** the runtime trusts the role and person each request names (`x-role`, `x-actor`); the build resolves the principal at the server's request boundary ([identity context](../architecture/domain-and-access.md#identity-context)) and enforces Authorization there, and the role switcher stays a development affordance, never the source of identity. Neither works in the build because it worked in the prototype.
- Use this assessment to choose the stages still needed. Do not skip Requirements or Design solely because a prototype runs. Existing approvals remain scoped to what the user saw; new consequential choices and stage progression follow the selected Strategy's controls.

The assessment is not a mandatory full verification run: Guided's verification of the whole remains delayed, while Controlled verifies the stages it completes. When resuming after the switch, use the recorded assessment and update it for changed scope rather than repeating it from scratch.

## Stages

The stages run in this order by default. From the Goal and this Strategy, the AI takes the stages the Goal needs, skips the rest, and says which; a Goal to fix a page may start at Frontend. A stage may revisit an earlier one when it finds a gap there.

| Stage | Covers | Targets |
|---|---|---|
| [Requirements](stages/requirements.md) | What the application means, needs, and allows | requirements |
| [Architecture](stages/architecture.md) | Goal, architecture, and technology stack; the Targets in scope | architecture |
| [Design](stages/design.md) | How the requirements are realized | application design, API design, UI design, persistence design |
| [App skeleton and tooling](stages/skeleton.md) | The runnable shell: layout, scripts, configuration, database | dev setup, run app |
| [Backend](stages/build-backend.md) | Server, API, persistence, integrations | API, persistence, server, integration |
| [Frontend](stages/build-frontend.md) | User interface | web UI |
| [Testing](stages/testing.md) | Proving the behavior | testing, evidence |
| [Docs](stages/docs.md) | User guides | documentation |

[Release](stages/release.md) follows the sequence when the user asks for one.

A stage names an outcome, not a kind of code: a stage the runtime or the stack already provides produces only what it still needs (see the [Prototype Strategy](prototype.md#stages-in-a-prototype)).

The stack lists candidate Targets; this Strategy selects those that apply, recorded as the Targets in scope (see [Architecture](stages/architecture.md)).

## How a stage runs

1. **Read** the Goal, Current Work, the Specs, and the App as they are.
2. **Plan**: decide what the stage produces (Specs, App, or both) and the activity, from the Goal and this Strategy. Take the Targets in scope whose *Applies when* matches what the stage produces; a stage that adds an endpoint and its table takes API and persistence.
3. **Produce** the output, guided by those Targets and shaped by the [Meta-model](../metamodel/README.md); follow the stage's control. Work in whole pieces: plan the change for a capability or a Target, then write each file whole, in as few edits as it takes, rather than one fragment per step. When the application's existing code disagrees with the Method or its Targets, the code is what is wrong: change it to the Method, never the other way. Ask a question when the work depends on something only the user knows (see [Questions](#questions)).
4. **Verify in the loop: generate, verify, fix.** Each time a Target's output is produced or changed, verify that Target yourself, never asking the user to: `mde verify --current` (quick: a Target whose output is Specs skips the build and the tests, and the Evidence Package is left as it is). Fix **everything** the run reports as failed or short, then verify once more: never one item per run, since each run builds and tests. Each failure gets one fix: when it remains after that fix (the run marks it *same as the last run*), stop working on it, record it as a [Finding](#findings), and leave the decision to the user. Never weaken a Check, a test, or a Target to get a pass, and never meet one with its shape alone. Set `started` on the Target's record in [`work/targets.json`](../metamodel/work/targets.md) as its work begins (the scope: `*`, a capability, or one requirement); only when the Target passes, and that work is done, set `completed`: from then on it is graded.
5. **Record** the work in Current Work, and keep what was created traceable to the Specs it realizes, as the Targets' traceability rules say.
6. **Verify the whole and audit**, when the Strategy says (in this Strategy, when the user asks, and before a release): `mde verify` over every Target, which writes the [Evidence](../metamodel/evidence/README.md) and each completed Target's `verified`, and a second agent's audit against their Audit ([`mde audit`](../commands/audit.md)), which writes their `audited`.
7. **Report** in [Status](../metamodel/work/status.md): passed, failed, or blocked on a question, with the recommended next step.
Carry the stage through: go on from one capability or Target to the next until the stage's Targets are completed, or a [Question](#questions) or a Finding blocks them. Do not stop to report after each piece; a passing suite that covers none of the stage's work is not progress.
8. **Commit** coherent work with its Specs references. A commit may contain work awaiting verification or a known gap; say so rather than calling it passed.

Moving to the next stage is the user's decision, and it is the approval of the stage before: the user says so, or uses [`mde proceed`](../commands/proceed.md), and Status records it under **Approved**. Never move on by inferring a go from silence or from the ability to continue.

A stage's control applies when the work it guards is attempted. If its condition is not met, do not silently bypass it: say what is missing and help the user resolve it. The user may waive a control explicitly; record the waiver with the current work.

Fix a failure in the concept or code that owns it; never hide it with compensating metadata.

## Questions

[Questions](../metamodel/work/questions.md) (`work/current/questions.md`) hold what the work needs from the user:

- Add a question when work depends on information the user has not given. Never invent the missing business policy: ask, and state the default assumed meanwhile, then continue on it.
- Keep open questions visible; never resolve or delete them silently.
- When the user answers, or asks to proceed ([Proceed](../commands/proceed.md)), put the resulting knowledge in the owning Spec, then move the entry under `## Resolved` with the outcome. Carry unresolved questions forward when the current work is archived.

## Findings

[Findings](../metamodel/work/finding.md) (`work/current/findings.md`) hold what verification, audit, or the user's review found:

- Record failures, gaps, or violations found during verification, audit, or review; keep known unresolved gaps visible during work.
- A finding stays open until it is fixed and verified, or the user accepts it. Only the user accepts a blocking finding, and the acceptance says why.
- A release needs every blocking finding fixed or explicitly accepted. Completed current work moves to `work/history/` with its findings.

## Review

A review is the user's feedback and corrections to the Specs, given at any time in the Workbench; it is not a step of the flow and does not hold it up. A [Review](../metamodel/work/review.md) marks pages between two commits as needing change or clarification, with a note; an [Annotation](../metamodel/work/annotation.md) attaches a request to a document or a page element. The agent never writes them. It reads the open ones, makes the requested changes, answers clarifications in the Specs or `questions.md`, records what it could not resolve as Findings, and marks annotations done with where the change went.

A formal review that the work waits for happens only when the user asks for one, for example by setting one at a checkpoint in their own Strategy; waiting for it is the user's decision.

## Work and Specs

Current Work records what was done and why; [its Location](../metamodel/work/current-work.md#location) lists everything `work/` may hold, and nothing else goes there. Specs hold durable application knowledge: work may create or change them.

## User authority

The user controls the project and may correct the flow at any time: redirect a stage, waive a control, or select another Strategy as the Goal changes. Never infer a waiver from silence, urgency, or the ability to continue technically; make the missing control visible and get explicit direction.

When the Goal looks achieved, say so with what shows it; the user decides, and sets the next Goal.
