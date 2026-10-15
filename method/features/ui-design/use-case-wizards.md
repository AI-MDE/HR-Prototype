---
type: feature
kind: build
id: use-case-wizards
title: Use-case wizards
origin: mde
impacts:
  - ui-design
  - web-ui
  - prototype
---

# Use-case wizards

## Purpose

A user should be able to start from what they want to do, not from where the data lives. Each use case a role performs is offered to that role as a wizard: chosen from a list of the use cases the current user's role may perform, and walked step by step to its outcome, **inside the wizard, on the application's own working pages**. The wizard is a frame around those pages: it shows the use case's steps from its Spec, embeds the real page for the current step, knows when that page has done its part, and moves on. The user never leaves the wizard to do a step, and never tells the wizard what happened: the page did it, so the wizard knows. This applies to every application with a user interface, prototype or built; a capability's workflow across several use cases is a [guided workflow](../prototyping/guided-workflows.md).

## Impact on ui-design

- The page set has a **use-case launcher** for each role (a page, or a panel of the role's start page or dashboard): the use cases whose actors include the role, grouped by capability, each with its goal in plain words. The launcher is on the role's landing page.
- Each use case a user performs is a **wizard**: a shell with the use case's steps, derived from its Spec, and, for the current step, the application's own working page embedded in it.
  - **Choose** the subject: the existing list, filtered to records that meet the preconditions (a Submitted request); picking one is the step's result. Skipped when the use case creates its subject.
  - **Each step of the flow** embeds the page where that work is done: the form that creates the record, the record's page where its parties are added, the action that activates it. The page is the same one used outside the wizard, shown without the application's own menus.
  - **Outcome**: the record in its new state, as the use case states it, with a link to the record's own page.

  A step with nothing to do is skipped; an alternative flow is a branch the wizard offers where the Spec has it.
- **The words are the user's.** Steps, the goal, and the outcome are named as the Spec names them for a person ("Record parties and terms"), never as operation ids. The wizard does not list the operations it invokes.
- A step that needs a page the application does not have is a gap in the page set, built as a page of its own (and reachable outside the wizard), not drawn into the wizard alone.
- A use case also remains reachable where its subject is shown: the operation's action on the record's own page. The wizard is the guided way to it, not the only way.

## Impact on web-ui

- **The shell and the embedded page.** The shell shows the steps and the current one, the subject chosen so far, and Back, Next, and Cancel. The current step's page is embedded as a nested view of the same application (a child route rendered in the shell, in an embedded mode without the application's navigation), not opened elsewhere. An `<iframe>` is used only when the page belongs to another application, on the same origin.
- **Context in, completion out.** The shell gives the page what the step needs through its address (the subject, values from earlier steps: `?subject=…&step=…`), so the page opens already focused on it. The page tells the shell when its part is done, with the result (the record saved, its id; the operation performed), by an event (or `postMessage` from an `<iframe>`); only then is Next enabled, and the shell carries the result into the next step.
- **Never "go there and come back".** A wizard never sends the user to another page to do a step, and never asks the user to type, choose, or confirm what a step's page did (no "step outcome" field, no "I did it" checkbox): the page's own completion is the step's result. A page that cannot signal its completion is not yet a wizard step; fix the page.
- **Writes happen where the page makes them,** as they would outside the wizard; the shell writes nothing itself. Back returns to an earlier step with what it recorded; Cancel stops the wizard and shows which steps were already saved, leaving them in place, never pretending nothing happened. When the use case's Spec makes the whole flow one transaction (all or nothing), its inputs are gathered across the steps and written in one final step that invokes its operations in order, instead.
- **A failed operation** is shown on its step, in the page, with the server's message; the user corrects it there and continues.
- **From the Specs, not copied.** The launcher's use cases, their actors, and their steps come from the use-case Specs: read at run time (from the MDE runtime's `GET /use-cases`) or generated from the Specs at build time. A hand-written list of use cases in the page is not allowed: it drifts from the Specs.
- **Filtered by role.** The launcher shows the use cases the current user's role may perform, and updates when the role changes (a role switch in a prototype, a sign-in in the application). Each step enforces the same authorization as the page it embeds; the server is the authority, the filter is a convenience.
- **Tested as walked.** Each wizard is walked by a passing end-to-end scenario in the browser, through every step's embedded page, with a screenshot of each step ([end-to-end tests](../testing/end-to-end-tests.md)).

## Impact on prototype

- When the prototype has pages (step 4), they include the use-case launcher and wizards, reading the use cases from the runtime's `GET /use-cases` (actors, preconditions, flow, operations, outcome), each step embedding the prototype's own page for it, the same way as in the built application. With no pages, the Workbench's Live use-case walkthrough plays this part.

## Audit

- Does each role have a use-case launcher listing exactly the use cases whose actors include it, read from the Specs, in plain words, and updated when the role changes?
- Does each use case a user performs have a wizard whose steps follow its Spec, each step embedding the application's own working page for it, inside the wizard?
- Does the wizard never send the user elsewhere to do a step, never ask the user to type or confirm what a step's page did, and move on only when the page signals it has done its part?
- Does Cancel show which steps were already saved, and does an all-or-nothing use case write only in its final step?
