---
type: target
id: web-ui
title: Web UI
applies_when:
  - the work builds or changes pages, the application shell, navigation, or the login
stage: frontend
needs:
  - ui
---

# Web UI

<!-- COMPILED by compile-targets.mjs from features. Skeleton (Purpose +
     applies_when) is authored; the sections below are composed from the
     contributing features, each tagged [feature: <id>]. Do not hand-edit
     the composed sections — edit the feature and recompile. -->

## Purpose

What a good built user interface looks like, and how to check it: a **functional, usable, consistent** application that implements its page designs, not generic screens. Its design is governed by the [UI design](../design/ui-design.md) Target; this Target governs the built pages.

**You are the builder.** Build the design well within these rules; statements that something *must* hold, or *is a defect*, are hard guardrails, the rest is guidance to reason from.

There is one UI artifact, the **live page**. MDE has no separate hand-built mock-up tier: a prototype is the same live page rendered against a substitute data source when one is explicitly chosen ([data sources](../../features/prototyping/data-source-switch.md)).

It governs: The built pages, the application shell (header, navigation, login), and their behavior.

## Outputs

| Output | Where | When |
|---|---|---|
| Page | the web source, one module per page (for example `src/web/src/pages/<page>`) | per page |
| Operation surface | the page part that renders each entity operation | per role-permitted operation |
| Page screenshot | `evidence/tests/screenshots/` | per page |
| Login page and route guard | the application shell | when the application has roles or users |

## Evidence

The rows of the Evidence Package this Target owns: what `mde verify` measures and reports for it, each by its id. Tools take a row's title and what it proves from here.

| Row | Title | Proves | Needs |
|---|---|---|---|
| pages-built | Pages built | The pages the application reports it generated (its page inventory) exist and read the real API. | ui |
| specs-on-pages | Specs on pages | The Specs' entities, operations and use cases are on the pages built. | ui |
| server-source | Server source | The pages get their data where .env says (SERVER_SOURCE), and, with the application's own backend, never from the MDE runtime. | ui |

## Composed behavior

### Actionable controls  `[feature: actionable-controls]`

- Every visible control does something: actionable, disabled with an explanation, or replaced by a clear placeholder message. Filters and search visibly update the data; tabs, dialogs, confirmations, toasts, and inline validation respond; rule-bearing UI shows its warnings and errors.

### Configured data sources  `[feature: data-source-switch]`

**Every page reads and writes through one data-access module, and the module through the `.env` names, never through an address of its own.** A prototype on the MDE runtime sets `SERVER_SOURCE=runtime`, and its module calls the runtime (at `MDE_RUNTIME_URL`, for the application `MDE_PROJECT`, which the Workbench sets); the moment the application has its own backend, `SERVER_SOURCE=api` and the module is replaced by one calling `API_BASE`: every page moves together, never one entity at a time, and no runtime call stays behind beside the backend. The module offers the same operations and error contract from either source, so changing the source changes `.env` and that one module, never the pages. The runtime is a prototype's default source; on a full stack and once the application is built, its own backend is. Never infer that a backend is available from a file name, or substitute any other data source silently. A substitute, when explicitly chosen, is visible and records what it cannot verify. The same coherent [sample data](../../features/persistence/meaningful-seed-data.md) loads through the selected source, repeatably, apart from operational data.

### Human date display (business dates, no raw ISO)  `[feature: date-display-format]`

- Business dates (hire, due, start, end, review, effective) are shown human-readable (for example `Jan 15, 2025`), formatted by one shared helper, never as raw ISO; storage and transport stay ISO. System timestamps (`createdAt`, `updatedAt`, audit times) are not business dates and may be shown as date-time or relative time.

### Design-system styling  `[feature: design-system-styling]`

- Pages compose the design system's shared components and tokens (`specs/design/ui-design-system.md`) rather than re-declaring styling inline. The UI profile comes from the selected stack (for example [Carbon](../../stacks/carbon-ui.md)); project visual references in `specs/design/` specialize it without replacing it or the page spec.

### Login page (login UI)  `[feature: dev-login-page]`

When the application has roles or users, it has a `/login` page and one shared route guard, generated (never a shipped authentication library). Both follow the mode the server reports, never the page's own build flags:

| Server-reported mode | Front door | The guard checks |
|---|---|---|
| **no-auth** (no mechanism) | a picker of the seeded people | that an acting user is selected (a UX gate) |
| **bypassed** (real mechanism, development flag on) | the same picker, with a persistent visible bypass indicator | a server-validated session |
| **real** | a username and password form | a server-validated session |

- The picker lists the seeded people (from the roles and seed data) by display label and role. In no-auth it sets client identity state; in bypassed mode the selection is sent to the server, which issues a real session. Never collapse the two: a bypassed application setting browser-only identity is a defect.
- In real mode, a failed attempt shows the server's generic failure and sets no identity, and the picker is absent from the production bundle.
- Any route other than `/login` redirects there without an acting identity, then continues to the requested page. Once a real mechanism is on, a `401` from any call returns to `/login`, and sign out invalidates the session on the server before clearing client state.
- Turning authentication on is additive: the picker, the seeded people, and the guard survive; only where identity comes from changes.
- Tests log in through the page (or a documented shortcut establishing the same identity), using stable selectors for the chooser, the fields, and submit.

### End-to-end tests with screenshots  `[feature: end-to-end-tests]`

- Controls have accessible names (label, `aria-label`) that scenarios select by; a control a scenario cannot name is an accessibility gap, fixed in the page, not worked around with a CSS path.

### Governed values from specs  `[feature: governed-values-from-specs]`

- Every categorical value a page shows or seeds (roles, statuses, enumerations, departments) resolves to a value defined in the requirements; free text, names, and dates may be fictional.

### Guided workflows  `[feature: guided-workflows]`

- When the UI renders a workflow (a guide, rail, wizard, or stepper), it has one step per stage of the capability's workflow, in order and with matching labels; a stage with no page yet is reported as a gap, never dropped, merged, or renamed.

- **Guided workflows**: for each capability whose workflow defines stages, a guided tour stepping the user through the existing live pages in order, with instructions and progress, deriving from the workflow and its use cases and routing into the live pages, never re-implementing them. Built from a workflow catalog, with a `/workflows` library and an active-step rail on the live pages.

### State Transition subpanel (governed lifecycle change)  `[feature: lifecycle-transition-control]`

A lifecycle change (an operation of kind `lifecycle`) appears through a `StateTransition` subpanel owned by the action that proposes or commits it, showing the current state, only the valid reachable new states or decisions, the impact, and the rules (guards, permissions, validation, blocking conditions), drawn from the entity's lifecycle and operations.

- **Edit with state**: when state is one field of a broader record edit, the panel's Save commits it with the other edits.
- **Terminal decision**: Submit, Approve, Reject, Cancel, Acknowledge, Reopen, and similar decisions may commit as a named action after the required review or confirmation, ending only their panel context.

The UI conventions say which model applies (or, for one page, its line in the page set); never both. Abandoning the context discards the proposed change. Use-case operations that are not lifecycle changes stay ordinary `Operate` actions.

### Live-page navigation  `[feature: live-page-navigation]`

- Each page has real client-routing links to the primary pages (each role's landing page, and the lists of the Primary Entities the role works with), with the current page active and every target existing; a decorative menu with dead links does not count.

### Object identity and metadata presentation  `[feature: object-info-metadata]`

- Object metadata (identity, audit, provenance) is shown where the users' tasks need it, accurately and access-controlled; technical identifiers stay stable for navigation and tests but distinct from business labels; secrets and internal paths are never exposed.

### Operations against data (not canned swaps)  `[feature: operations-against-data]`

- A persisting control (Save, Create, Submit, approve, a use-case operation) performs a real, data-backed operation: a concrete API method and route, the payload it sends, a route, service, and repository path behind it, and optimistic version handling where the entity is versioned. A button that only changes component state, or posts to nothing, is a placeholder even though the screen changes; only the in-progress edit before Save is local state. Before the real API exists, a prototype still goes through the data path to its substitute.
- Each modifying control acts on the object its owning panel declares (inline row, selected record, route record, draft, checked set), is disabled when its required selection is absent, never falls back to a first or default record, and ends only its declared panel context. Bulk controls surface partial successes and failures.
- Filter, sort, and paging operate on the actual result set: a matching query returns fewer but non-zero rows containing the term, a non-matching one returns zero. A canned row or a sentence describing the result is a fake.

Drive the running application in a browser, and for each mutating control click it, then read the result back after a reload, and look for the matching request in the server log. A change that vanishes on reload, or leaves no server activity, is a placeholder; a control that always affects the same record whatever is selected is mis-wired. Exercise each page's full set of operations: a page that renders its list and detail but silently omits create, edit, or a declared action is partial. Log in as users of different roles and confirm requests carry the identity, the server attributes them, and role-scoped behavior differs; with a real mechanism, confirm protected endpoints refuse without a session and a request replayed after sign-out is rejected.

### Connected data presentation  `[feature: real-dataset]`

- Pages read records through the selected data source and render the actual dataset with meaningful labels and relationships; a substitute data source is used only by explicit choice, with its limits visible, and never proves the real backend works.

### Related-entity display (Display Label)  `[feature: reference-display]`

- A related entity is shown by its **display label** (the attributes its spec's `**Display label:**` names, such as a name, or first and last name together; [Entity](../../metamodel/requirements/entity.md)), never its technical id; a unique property appears only when it is the display label or to disambiguate. A form field that sets a reference is a selection control listing the related entity by display label, labelled by the entity (`Employee`, not `Employee ID`), submitting the id behind the scenes; never a text field for a raw id.
- So the page never needs a second lookup, every API response that returns a referencing resource (list, read, create, and update) carries the display label: the repository joins the referenced table and aliases its display label, and a create or update that already fetched the related entity returns it. A `row.employeeName ?? row.employeeId` fallback in the UI is the tell.

### Role / user switcher  `[feature: role-switcher]`

- **Role and user switcher**: a header control (inside the user-profile menu) to act as a role and, for roles scoped to their own or their team's data, as a specific seeded person; generated from the roles in the requirements and a role-to-navigation map. Navigation filtering by role is a soft view filter: every route stays reachable. Omitted when the project has no roles.

### Row selection affordance (advisory)  `[feature: row-selection-affordance]`

- Advice, not a rule: where clicking a row selects it, with a visible hover and selected state, a per-row Select button is redundant chrome; add one only when selecting and opening are genuinely different, and keep the distinction keyboard-accessible.

### Reusable live pages  `[feature: single-tier-live-page]`

- A page works the same in the prototype and the application; prototype status describes maturity, not a separate screen to replace later.

### Stable selectors  `[feature: stable-selectors]`

- Important elements carry stable selectors or accessible labels (`id` or `data-testid` first), which UI tests and annotations both rely on.
- Each section of a page (a panel, a card, a tab, a wizard step, a list) is a named region: a `section` or `role="region"` whose accessible name is its visible heading (`aria-labelledby`) or an `aria-label`, so a test finds it by the name a person sees ("the Contacts section"), never by a CSS path or its position among `div`s.
- In a section showing many records (a table, a list, cards), each row is identified by its record's data: its accessible name carries the record's display label, a table has column headings, and each row's controls are named for what they do ("Remove", not an icon alone), so a test finds "the Contacts row for Dana Reyes" and presses "Remove" in it, never "the third row".

### UI states (empty/loading/error/success)  `[feature: ui-states]`

- Empty, loading, error, success, and access-denied states are represented where relevant, each reachable and rendered.

### Use-case wizards  `[feature: use-case-wizards]`

- **The shell and the embedded page.** The shell shows the steps and the current one, the subject chosen so far, and Back, Next, and Cancel. The current step's page is embedded as a nested view of the same application (a child route rendered in the shell, in an embedded mode without the application's navigation), not opened elsewhere. An `<iframe>` is used only when the page belongs to another application, on the same origin.
- **Context in, completion out.** The shell gives the page what the step needs through its address (the subject, values from earlier steps: `?subject=…&step=…`), so the page opens already focused on it. The page tells the shell when its part is done, with the result (the record saved, its id; the operation performed), by an event (or `postMessage` from an `<iframe>`); only then is Next enabled, and the shell carries the result into the next step.
- **Never "go there and come back".** A wizard never sends the user to another page to do a step, and never asks the user to type, choose, or confirm what a step's page did (no "step outcome" field, no "I did it" checkbox): the page's own completion is the step's result. A page that cannot signal its completion is not yet a wizard step; fix the page.
- **Writes happen where the page makes them,** as they would outside the wizard; the shell writes nothing itself. Back returns to an earlier step with what it recorded; Cancel stops the wizard and shows which steps were already saved, leaving them in place, never pretending nothing happened. When the use case's Spec makes the whole flow one transaction (all or nothing), its inputs are gathered across the steps and written in one final step that invokes its operations in order, instead.
- **A failed operation** is shown on its step, in the page, with the server's message; the user corrects it there and continues.
- **From the Specs, not copied.** The launcher's use cases, their actors, and their steps come from the use-case Specs: read at run time (from the MDE runtime's `GET /use-cases`) or generated from the Specs at build time. A hand-written list of use cases in the page is not allowed: it drifts from the Specs.
- **Filtered by role.** The launcher shows the use cases the current user's role may perform, and updates when the role changes (a role switch in a prototype, a sign-in in the application). Each step enforces the same authorization as the page it embeds; the server is the authority, the filter is a convenience.
- **Tested as walked.** Each wizard is walked by a passing end-to-end scenario in the browser, through every step's embedded page, with a screenshot of each step ([end-to-end tests](../../features/testing/end-to-end-tests.md)).

### User profile in header (avatar, top-right)  `[feature: user-profile-header]`

- The shell shows who is acting: a user-profile control at the top right of the header on every page (in the shell, not per page), with an avatar (image, or initials as fallback) and the user's display label, and a menu with sign out and, where the role switcher applies, switch user. It shows the current identity; it is not authentication.

### Architecture conformance  `[feature: web-ui-architecture-conformance]`

The frontend follows the resolved architecture: its layers, the calls it makes to the backend (and only those), its boundaries, and cross-cutting mechanisms. A deviation is either fixed or recorded as an explicit exception in the architecture's Specs.

## Verify and Audit

The Checks `mde verify` proves for this target compile to `targets/verification/web-ui.md`; what a second agent judges compiles to `targets/audit/`, under each Feature's first Target.
