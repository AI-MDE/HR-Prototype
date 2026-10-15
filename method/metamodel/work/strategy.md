---
type: concept-type
title: Strategy
description: Reusable guidance describing how a goal or declared behavior should be approached.
icon: 🧭
---

# Strategy

Strategy is the behavioral realization of concerns declared by the model. It guides how an AI, human, or supporting tool approaches a Goal and Current Work.

The Method offers three Strategies, each one file in `strategy/`: [Prototype](../../strategy/prototype.md), [Guided](../../strategy/guided.md), and [Controlled](../../strategy/controlled.md), which builds on Guided. Guided and Controlled share the stage pages in `strategy/stages/`. Current Work links the active Strategy. A new Goal may select a different Strategy.

Every Strategy works through the same default sequence of stages (Requirements, Architecture, Design, App skeleton and tooling, Backend, Frontend, Testing, Docs), taking those the Goal needs; moving from one stage to the next is the user's decision. In every Strategy the agent verifies each Target it produces in the loop (generate, verify, fix), running it itself. The Strategies differ mainly in when the whole is verified and audited: delayed (Prototype, Guided: when the user asks, and before a release) or immediate (Controlled: at the end of every stage).

Strategy selects whether Targets are used, which outputs and checks are in scope, and the timing and rigor of verification and Evidence. It may define activities, controls, gates, dependencies, warnings, review expectations, release conditions, and waiver behavior.

Strategy does not define the knowledge types it operates on. It uses the applicable model.

## Who owns what

A standard is defined once, applied deliberately, and verified with real evidence:

| Responsibility | Owner |
|---|---|
| Work activities, the Targets that apply, sequencing, gates, verification timing and rigor, waivers | Strategy |
| What adequate output is, and the Checks that prove it (the Testing Target's [baseline](../../targets/app/testing.md#baseline) among them) | Target |
| Reusable guarantees, and the Checks they contribute to Targets | Feature |
| The application's business behavior | Requirements |
| The mechanisms chosen | Architecture and Design |
| What was checked, and with what result | Evidence |
| Approval, acceptance of exceptions, waivers | the user |

A Strategy refers to a Target's criteria; it never copies them, and a Target never creates a workflow gate by itself. A Feature contributes Checks to a Target without activating it.

**Architecture constrains behavior; Strategy guides behavior.**

Strategy may discover or refine Architecture, but must not silently override an established architectural decision.

## Which Targets, how rigorously

Each Strategy states, in its front matter, how it picks the Goal's Targets from the architecture's candidates, and how rigorously it verifies them:

```yaml
targets: architecture        # the architecture's Targets, each kept when its conditions hold
verification: delayed        # optional | delayed | immediate
```

- `targets: architecture` keeps every Target the architecture lists (`specs/architecture/overview.md`, from the stack) whose conditions hold for the application (its `needs`: a user interface, a database, an integration, a deployment). A list (`targets: [prototype, business-requirements]`) names them instead.
- `verification`: when the **whole** is verified (`mde verify` over every Target, writing the Evidence) and audited, and how much it gates the work: `optional` (the Evidence is information, never a gate), `delayed` (when the user asks, and before a release), or `immediate` (at the end of every stage). It never decides whether the agent checks its own work: in every Strategy, the agent verifies each Target it produces in the loop (`mde verify --current`), runs it itself, and fixes what it reports ([How a stage runs](../../strategy/guided.md#how-a-stage-runs)).

The result is recorded in [`work/targets.json`](targets.md) ([Goal](goal.md#keeping-the-goal-in-step)), so it is reviewed when this Strategy, or the architecture, changes. A Target not started yet is *later*, neither pending nor failed. Started, it is *in progress* (measured and shown, not graded) until the agent records its work completed; from then on it is graded ([What the records decide](targets.md#what-the-records-decide)). The Goal's scope, and the scopes the records name, then limit what each Target counts. The Strategy's own guidance, in its body, says the rest.

## Waivers

Only the user waives. A waiver names a box of the Evidence (an item id, such as `frontend-exercised`) or a single Check (its id, such as `end-to-end-tests/screenshots-left`), with the reason and the date, and is recorded in `work/targets.json`, under `waived` on the Target's record ([Work Targets](targets.md)). The agent records a waiver the user gives explicitly; it never infers one from silence or urgency. A waived box or Check is reported as **waived**, never as passed; the Strategy decides whether waived counts toward a gate (Controlled: passed or waived, before a release).

## Changing the Strategy

The user changes the Strategy by saying so, in plain words ("switch to Controlled", "let's just prototype this"); there is no command for it. The agent then:

1. **Records it**: `strategy` in `work/goal.md`'s front matter, the Goal's *Strategy* section, and Current Work's Strategy link, all three the same; and, in [Status](status.md), the change, its date, and why.
2. **Proposes the Goal's Targets anew**, from the new Strategy's logic ([Which Targets, how rigorously](#which-targets-how-rigorously)), and records them once the user agrees: in [`work/targets.json`](targets.md), a Target the new Strategy adds is listed with `{ "*": {} }`, and one it drops gets `leftOut` on `*`, with the reason. The records of work already done stay, as history; nothing is deleted.
3. **Brings the work up to the new rigor**, depending on the direction:
   - **Stricter** (Prototype to Guided or Controlled, Guided to Controlled). Approvals stay scoped to what the user saw, and switching approves nothing. From Prototype, follow Guided's [transition from Prototype](../../strategy/guided.md#transition-from-prototype): assess the work against the new Targets, then choose the stages still needed. To Controlled, before the next stage starts: a full `mde verify` and an `mde audit` of every completed Target whose verification or audit is missing or older than its completion (the Evidence marks them *not verified since*, *not audited since*). What fails is work, like any other.
   - **Looser** (Controlled to Guided, Guided or Controlled to Prototype). Nothing is redone: the gates relax from now on. A Target the looser Strategy drops is `leftOut` with the reason, so its work and records stay for a later switch back.
4. **Says what changed** in its reply: the Targets added and dropped, the verification and audits now due, and the stages still ahead.

A change of Strategy never changes the Goal's scope or its Specs on its own; when the new Strategy suggests one, the agent proposes it as it would any change to the Goal.