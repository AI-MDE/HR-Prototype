---
type: feature
kind: build
id: enhanced-use-case
title: Enhanced use case
origin: mde
status: preview
since: 0.3.120
impacts:
  - business-requirements
  - prototype
---

# Enhanced use case

## Purpose

A use case whose Flow says, step by step, what the actor does, what the system does in response, and which entity operations each step runs; whose endings are named; and whose alternatives branch from the step where they happen. The prototype then walks it exactly, `mde authorization` reads who runs what from the steps themselves, and a reviewer sees each refusal, wait, and ending in its place.

A **preview**, on trial in this release (`status: preview`). A release may set `status: off`, which leaves it out of every Target, or remove it. Use cases written this way still read correctly without it: the tools read both forms.

## Applicability

Applies to every use case written or changed while this Feature is in the release. A use case written before it keeps working as written and is moved to this form when next changed.

## Impact on business-requirements

- **A step is one business interaction:** the actor acts, and the system responds, in one numbered step of the Flow. The actor's input and the system's response are the same step, not two ("The Coordinator proposes the assignment; the system checks the dates and capacity, and records it"). A step names its actor.
- **Each step lists the operations it runs**, as bullets indented under it, one entity per bullet, in the form of an Invoked Entity Operations line: a link to the entity, a dash, its operations as the entity declares them.

  ```markdown
  ## Flow

  1. The Coordinator selects the project to staff.
     - [Project](../project/project.md) — Read
  2. The Coordinator proposes the assignment (responsibility, dates, allocation); the system checks the dates and the employee's capacity, and records it.
     - [ProjectAssignment](../project/project-assignment.md) — Create
  3. The Coordinator sees the commitment on the project.
  ```

  A step that runs none (a result seen, a decision taken outside the application) has no bullets. **Invoked Entity Operations is not written:** it is the steps' operations together, and is read from them.
- **Waits are steps.** When the use case pauses until another actor acts or time passes, the step begins with **Waits** and says for whom, for what business event, and the deadline if there is one (`3. **Waits** for the People Manager's approval of the allocation, at most 3 working days.`). It names the business event, never a queue, poller, or webhook. What happens at the deadline is an alternative.
- **Outcome names each ending**, one bullet each, with what is then true: `- **Assigned** — the commitment exists for the employee, project, dates, and allocation.` The main Flow ends in the first. Postconditions and Output are said here, not in sections of their own.
- **Each alternative branches from a step and ends somewhere:** `- **At 2, the allocation would exceed 100%** — the system refuses and shows the employee's commitments → back to 2, or **Refused**.` It names the step it branches from (`At <n>`, or `At any step`), the condition in bold, what happens, and, after `→`, the step it returns to or the outcome it ends in. Every outcome but the first is reached by an alternative.
- **The journey:** when another use case must come first, Related Use Cases says so, with the outcome that makes this one possible: `- Preceded by [Prepare client project](prepare-client-project.md), outcome **Prepared**.`
- Input is said in the step where the actor gives it. Context and Related Pages are not written: what passes between steps, and the pages, are design.

## Impact on prototype

- The use case wizard walks the Flow step by step: each step shows the page of the operation it runs (its Create form, its records to choose from, the chosen record's form, or its state change run on a chosen record), a wait as a step of its own, and the alternatives that branch from that step; the last step shows the named outcomes.

## Audit

- Is each Flow step one business interaction, the actor's action and the system's response together, naming its actor?
- Does each step list exactly the operations it runs, as the entity declares them, and no step claim an effect ("records it", "approves") that no operation of it performs?
- Is every pause a **Waits** step naming its business event, its actor, and its deadline, with an alternative for the deadline passing?
- Are the outcomes named, each with what is then true, and is every outcome reached (the first by the Flow, the others by an alternative)?
- Does every alternative name the step it branches from, its condition, and where it ends (a step or an outcome)?
- Does a use case that depends on another say so (Preceded by), with an outcome of that use case that the other actually has?

## Detail

The fuller guidance behind what the Targets compile from this Feature. It compiles into no Target.

### Why a step carries its operations

A use case's Flow was prose, its operations a separate list: which step ran which operation was left to the reader, and the Workbench's wizard guessed it from the verbs. Writing each operation under its step makes the Flow the one source: the operations list, the Authorization (who runs what), the prototype's walk, and a test's steps all read the same thing.

### A whole use case

```markdown
## Flow

1. The Coordinator selects the project to staff.
   - [Project](../project/project.md) — Read
2. The Coordinator selects the employee and reviews their current assignments.
   - [Employee](../../employee-records/employee/employee.md) — Read
   - [ProjectAssignment](../project/project-assignment.md) — Read
3. The Coordinator proposes the assignment (responsibility, dates, allocation); the system checks the dates and the employee's capacity, and records it.
   - [ProjectAssignment](../project/project-assignment.md) — Create
4. The Coordinator sees the commitment on the project.

## Alternatives / Conditions

- **At 3, the allocation would exceed 100%** — the system refuses and shows the employee's current commitments → back to 3, or **Refused**.
- **At 3, the dates fall outside the project or the employment** — the system refuses → back to 3, or **Refused**.
- **At any step, the Coordinator cancels** → **Cancelled**.

## Outcome

- **Assigned** — the commitment exists for the employee, project, dates, and allocation.
- **Refused** — no new commitment; the Coordinator was told why.
- **Cancelled** — nothing changed.

## Related Use Cases

- Preceded by [Prepare client project](prepare-client-project.md), outcome **Prepared**.
```
