---
type: target
id: ui-design
title: UI design
applies_when:
  - the work generates or changes the application's pages, their composition, or navigation
  - the work sets the application's UI conventions, or how the required operations are covered by the UI
stage: design
needs:
  - ui
---

# UI design

<!-- COMPILED by compile-targets.mjs from features. Skeleton (Purpose +
     applies_when) is authored; the sections below are composed from the
     contributing features, each tagged [feature: <id>]. Do not hand-edit
     the composed sections — edit the feature and recompile. -->

## Purpose

What a good user interface looks like, and how to check it: a **functional, usable, consistent** application. Pages are generated from the requirements by the [UI conventions](../../architecture/ui.md#ui-conventions-the-pages-are-generated-not-designed), not designed one by one; the generated pages are the design. The built interface is checked by the [web UI](../app/web-ui.md) Target.

**You are the designer.** Generate the pages yourself by these rules; do not wait to be handed a layout or pattern, and do not write page specifications. Guidance here is for you to reason from and adapt to the case; statements that something *must* hold, or *is a defect*, are hard guardrails.

It governs: the application's pages and their navigation, and its UI conventions (its architecture).

## Outputs

| Output | Where | When |
|---|---|---|
| The pages | the application's frontend (for example `app/frontend/`) | per ABE, use case, and role |
| UI conventions that differ from the Method's | the application's architecture (`specs/architecture/`) | when one differs |
| A decision for one page | its line in the page set, `specs/design/page-set.md`, with its reason | when the conventions do not make it |

## Evidence

The rows of the Evidence Package this Target owns: what `mde verify` measures and reports for it, each by its id. Tools take a row's title and what it proves from here.

| Row | Title | Proves | Needs |
|---|---|---|---|
| page-set | Page set | The pages the application should have are recorded in the Specs, as what the pages built are measured against. | ui |
| navigation-diagram | Navigation diagram | The navigation diagram is delivered, and current if rendered from DOT. | ui |

## Composed behavior

### Page baseline recommendations  `[feature: page-defaulting]`

Generate the pages by the conventions: a list and a detail page per ABE, a flow per use case, a landing page per role (its dashboard when it has success factors). Understand the purpose, actors, inputs, actions, and navigation the requirements give before choosing patterns; parent-child, task, and matching pages are the conventions' shapes where a use case calls for them. No page specification is written: the generated pages are the design. A deviation for one page is noted on its line in the page set, with its reason.

### Role success factors and dashboards  `[feature: role-success-factors]`

- Each role with Critical Success Factors has a dashboard page (Canvas `Dashboard`, in the [page vocabulary](../../architecture/ui.md#canvas-types)), its starting page after sign-in unless the Design says why not.
- One panel per factor, in the role's order of importance: the measure's current value against its target, its status (on target, at risk, missed) shown by more than colour alone, and its trend over the measure's period when the business needs to see the direction.
- Each panel leads to where the role acts: the records behind the measure (the list, filtered to those that put it at risk) and the factor's action. A panel the role can only look at is a report, not a dashboard panel.
- A dashboard shows only that role's factors and the work waiting for it; it is not a catalogue of every count the data allows. Roles that share factors may share a dashboard.

### Actions and their target  `[feature: ui-design-actions-and-their-target]`

- Every modifying action belongs to one panel, resolves to a declared operation, and has exactly one target, derived from its panel context:

  | Panel context | Action target |
  |---|---|
  | In-place list edit | the row being edited |
  | Detail reached by `Selected` | the record selected in the source panel |
  | Routable profile or detail | the record identified by the route |
  | Add form or editor | the new draft owned by that panel |
  | Modal form or editor | the draft or record the modal was opened for |
  | Bulk list action | the checked record set |

- Where a selection is required, no selection means the dependent panel is empty or disabled and its modifying actions are disabled. It **must never** fall back to the first or a default record.
- Bulk actions state their partial-failure behavior.
- An action is terminal only for its declared panel context, never automatically for the page: `Cancel` may end `Add` or `Edit`, `Approve` or `Reject` may end a review; search, filter, select, open, and navigation continue or change context.
- An editing List panel declares one of the two List behaviors (navigate to edit, or edit in the row). One that offers `Edit` but declares neither is **incomplete**: resolve it before building.
- A lifecycle state change is part of `Edit`, committed by Save; `Operate` is for use-case actions only.

### Maintenance  `[feature: ui-design-maintenance]`

- Every entity in scope has at least one Maintenance panel: the canonical place it is maintained. Reference panels show context and `Open` that page when full maintenance is needed.
- A page maintains only its **subject**, the entity its task is about. Every other entity it touches is supporting: a Reference panel limited to `Select`, `Filter`, and `Open`, **never** a Maintenance panel with `Edit`, `Operate`, or create, update, delete, or status-change operations.
- A workflow or task canvas exposes only the maintenance its task needs; it never becomes a general editing surface for the lookups it consumes. If the task needs a supporting entity to exist first, the user creates it on that entity's own page and returns.
- A supporting entity with no page of its own is a **missing page**, not a licence to add its editing to the page that references it.

### Navigation diagram  `[feature: ui-design-navigation-diagram]`

- **The navigation diagram is required, in every Strategy, once the application has a user interface:** the [navigation diagram](../../metamodel/design/navigation-diagram.md) (`specs/design/diagrams/navigation.md`), drawn from the agreed page set (`specs/design/page-set.md`). Whether the pages built follow it is the web UI's ([architecture conformance](../../features/web-ui/architecture-conformance.md)).

### Operation coverage  `[feature: ui-design-operation-coverage]`

Derive the required UI operations from the users, use cases, and declared entity operations that need a UI, not from the pages that happen to exist. Each is offered by an action in the application, bound to its operation, as the authorization and the lifecycle allow. A non-UI or system operation is marked explicitly not applicable, so an intentional exclusion is distinguishable from a missing action.

### The built page  `[feature: ui-design-the-built-page]`

A built page realizes its use cases and entities with real behavior: usable labels, validation, and the loading, empty, error, success, and access-denied states that apply. It is never a generic placeholder screen, and it preserves the declared panel sources, selection, relationships, action targets, terminal scope, and business results, even when imitating a visual reference.

### The page set  `[feature: ui-design-the-page-set]`

Understand the purpose, actors, inputs, actions, and navigation before choosing pages. The page set follows from the actual users, business outcomes, entities, and use cases by the UI conventions: entity list and detail, parent and children, task, matching, and dashboard pages, as the use cases need them. Reuse existing pages and avoid unnecessary pages and duplicate interactions. The set is what the application routes; it is not recorded in a separate design document.

### UI page patterns (bounded-first composition)  `[feature: ui-patterns]`

Patterns are proven page shapes, not a substitute for business analysis: the use case supplies the purpose, subject, context, business objects, rules, and outcome; the pattern supplies the shape.

- Know the purpose, subject, primary transaction, entry context, and success outcome, from the use case, before choosing a pattern.
- Choose one preferred pattern as the foundation; compose no more than two unless the use case requires more.
- Adapt panels and placement without breaking the pattern's meaning.
- Use `Custom` only when no preferred pattern can satisfy the task, and note the unmet need and the reason on the page's line in the page set.
- A visual reference (a screenshot, an image in `specs/design/`) never overrides the page's business bindings or relationships.

MDE decides page purpose, pattern, canvas intent, panel sources, selection, relationships, actions, terminal scope, rules, and business effects. The selected UI profile (from the stack) decides standard component behavior, layout mechanics, responsive rules, accessibility, states, action hierarchy, and visual tokens.

### Use-case wizards  `[feature: use-case-wizards]`

- The page set has a **use-case launcher** for each role (a page, or a panel of the role's start page or dashboard): the use cases whose actors include the role, grouped by capability, each with its goal in plain words. The launcher is on the role's landing page.
- Each use case a user performs is a **wizard**: a shell with the use case's steps, derived from its Spec, and, for the current step, the application's own working page embedded in it.
  - **Choose** the subject: the existing list, filtered to records that meet the preconditions (a Submitted request); picking one is the step's result. Skipped when the use case creates its subject.
  - **Each step of the flow** embeds the page where that work is done: the form that creates the record, the record's page where its parties are added, the action that activates it. The page is the same one used outside the wizard, shown without the application's own menus.
  - **Outcome**: the record in its new state, as the use case states it, with a link to the record's own page.

  A step with nothing to do is skipped; an alternative flow is a branch the wizard offers where the Spec has it.
- **The words are the user's.** Steps, the goal, and the outcome are named as the Spec names them for a person ("Record parties and terms"), never as operation ids. The wizard does not list the operations it invokes.
- A step that needs a page the application does not have is a gap in the page set, built as a page of its own (and reachable outside the wizard), not drawn into the wizard alone.
- A use case also remains reachable where its subject is shown: the operation's action on the record's own page. The wizard is the guided way to it, not the only way.

## Verify and Audit

The Checks `mde verify` proves for this target compile to `targets/verification/ui-design.md`; what a second agent judges compiles to `targets/audit/`, under each Feature's first Target.
