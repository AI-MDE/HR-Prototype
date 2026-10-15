---
type: audit-view
title: Audit — web-ui
---

# Audit — web-ui — COMPILED from features' `## Audit`

<!-- COMPILED by compile-targets.mjs. Do not hand-edit — edit each feature's ## Audit
     section and recompile. Each ## Audit speaks in GENERAL terms (what quality looks like
     for this concern). SCOPE is applied by the CALLER at run time, not authored here: an
     audit run for a plan adds "perform these checks for this plan's scope only"; an
     app-wide run adds none. The auditor is a FRESH session — it did not build this. -->

You did not build this. Do not trust that an artifact or control *exists* — judge whether
it *behaves*, by driving the real running app (or reading the specs, for BA/design targets)
and corroborating against a witness the author does not control (the app's own request/write
log, a read-back after a mutation, the spec's own content).

## How to report — every finding must be actionable

Do not write a vague narrative. For **each concern** you audit, produce one row:

| field | what it must contain |
|---|---|
| **concern** | the specific artifact/control/operation judged (name it: `client.create`, "Employee Directory save button", "review-period-constraint") — never "the API" or "the UI" in general |
| **verdict** | **genuine** · **fake** · **not-exercised** (you could not drive it — say why). For a Spec: genuine when it meets the concern, fake when it only appears to |
| **witness** | the concrete evidence you observed: a server-log line, a read-back result after a mutation, the missing route/operation, the placeholder text quoted. A verdict with no witness is not a finding |
| **severity** | **high** (core substance is fake — a mutating action that never persists, a rule not enforced) · **medium** · **low** |
| **fix** | the concrete next action to make it genuine (name the file + what to change) — so the finding is directly actionable in a repair plan |

End with a **summary**: counts (**N genuine · M fake · K not-exercised**), and the **fakes ranked
most-severe first** with their fix. A `fake` on an in-scope artifact is a real defect — state it
plainly; do not soften it to "could be improved". "It exists / it responded 200 / the section is
filled" is never a genuine verdict on its own.

### Actionable controls  `[feature: actionable-controls]`

- Is every visible control wired: actionable, disabled with an explanation, or a clear placeholder?

You did not build this UI. Do not trust that a control *exists* — judge whether it
*acts*. Drive the real running app in a browser and, for each mutating control (Save,
Create, Submit, approve, a status/lifecycle change):

- **Click it, then read the result back after a reload / fresh fetch.** Did the change
  actually persist, or did it vanish on reload? A change that survives only in React
  state is a fake — the classic "Save profile / change status / propose assignment
  updates local state, never calls the API" (observed: `EmployeeDirectory.tsx` save,
  `PerformanceWorkspace.tsx` acknowledge, `ProjectStaffing.tsx` propose).
- **Corroborate against the server's own log for the run** — a mutating click must
  leave a matching request/write in the app log. A control that changes the screen with
  no corresponding server activity did not operate; it repainted.
- **A control that always affects the same record** regardless of what you selected
  (e.g. "propose" always targets the same person) is mis-wired — try it against
  different rows and see whether it follows your selection.

Report each control as **operating** (change persisted across reload + a matching entry
in the server log), **placeholder** (screen changed but nothing persisted / no server
activity), or **mis-wired** (ignores your selection). "The button is there and the screen
changed" is not a pass.

### Configured data sources  `[feature: data-source-switch]`

- Do pages reach their data only through the one data-access module, from the source `.env` names (the runtime for a prototype on it, the application's own backend otherwise), with any other substitute explicit and its limits recorded?

### Human date display (business dates, no raw ISO)  `[feature: date-display-format]`

- Are business dates human-formatted by one shared helper, with storage and transport in ISO?

### Design-system styling  `[feature: design-system-styling]`

- Is styling composed from the design system and the stack's UI profile rather than re-declared inline?

### Login page (login UI)  `[feature: dev-login-page]`

- With roles or users: is there a `/login` page and one shared guard following the server-reported mode, with a server-validated session once a mechanism is on, a visible bypass indicator, no picker in a real production bundle, and server-side sign out?

Judge whether the selected identity is **actually propagated to the API** and **exercises
role-scoped behaviour** — not just displayed in the shell. The common gap: login stores a local
selected user used only for greeting/routing, while API calls never send that identity, so
role-scoped access is never truly tested.

Drive the running app: log in (pick a user, or enter a credential — whichever the mode presents),
then perform an action and inspect the request the app sends — does it carry the identity (session
cookie / header / token), and does the server log show the request attributed to that principal?
Then log in as a **different-role** user and confirm the app **behaves differently** where roles
matter (an action allowed for one role is blocked for another). If every role can do everything, or
the identity never leaves the browser, role scoping is not exercised.

When a **real mechanism** is on, also judge the guard's substance rather than its appearance: clear
the client state (or call the API directly with no session) and confirm protected routes and
endpoints actually refuse — a guard that only hides UI while the API answers anonymously is
**fake**. After sign-out, replay a prior authenticated request and confirm the server rejects it;
a session that still works after logout means logout is client-only.

Report identity as **propagated** (requests carry it, server attributes them, roles change
behaviour) or **cosmetic** (selected user only shown, API calls anonymous / role-agnostic). When
auth is real, report the guard as **enforced** (server refuses without a valid session) or
**decorative** (UI-only).

### Governed values from specs  `[feature: governed-values-from-specs]`

- **Governed values:** Does every categorical value used downstream resolve to one defined in the requirements?

### Guided workflows  `[feature: guided-workflows]`

- Do guided workflows, behind the development flag, follow the workflow's stages in order and route into the live pages, with missing stages reported as gaps?

### State Transition subpanel (governed lifecycle change)  `[feature: lifecycle-transition-control]`

- Does every lifecycle change go through a `StateTransition` subpanel showing current state, valid outcomes, impact, and rules, committed by the one declared model?

### Live-page navigation  `[feature: live-page-navigation]`

- Does each page link to the primary pages with real routing, every target existing?

### Object identity and metadata presentation  `[feature: object-info-metadata]`

- Is object metadata shown where tasks need it, accurate and access-controlled, with no secrets or internal paths exposed?

### Operations against data (not canned swaps)  `[feature: operations-against-data]`

- Is every visible control wired, does every persisting control call a real route with a payload backed by the data path, and does every modifying control act on its panel's declared object, disabled without its selection, never on a default record?
- Do filter, sort, and paging operate on the real result set?
- Driven in a browser: does every mutating control persist across reload with a matching server request, does each page offer all its intended operations, and does identity reach the server and change role-scoped behavior?

Judge whether each page realises **every operation it is meant to** — not just the easy
subset. A page that renders a list and detail but silently omits create, edit, transfer,
skill-management, the assignment summary, etc. looks coherent while being half-built.

Drive the running app and exercise the page's full set of operations: type in the filter and
watch the count change; sort and confirm order changes; open create/edit and complete it;
run each declared action. For each: does it operate on the **real data** (a filter that
actually narrows, not a canned result), and is the operation **present at all**? A control or
whole operation that is simply absent — no button, no path — is an incompleteness the presence
checks miss.

Report the page as **complete** (every intended operation is present and operates on real
data) or **partial** (name the missing/decorative operations). "The main list works" is not a
pass if half the page's operations are absent.

### Connected data presentation  `[feature: real-dataset]`

- Do pages render the actual dataset through the selected data source, with any substitute explicit and its limits visible?

### Related-entity display (Display Label)  `[feature: reference-display]`

- Do categorical values come from the requirements, are references shown and chosen by display label (with API responses carrying it, through a repository join), and are business dates human-formatted by one helper?

### Role / user switcher  `[feature: role-switcher]`

- Is the role switcher present when the project has roles, only behind the development flag, with every route still reachable?

### Row selection affordance (advisory)  `[feature: row-selection-affordance]`

- Where a row click selects, is a per-row Select button present only when selecting and opening genuinely differ?

### Reusable live pages  `[feature: single-tier-live-page]`

- Is each page one live page, the same in the prototype and the application?

### Stable selectors  `[feature: stable-selectors]`

- Do important elements carry stable selectors or accessible labels?
- Is every section of a page a named region, with the accessible name a person sees?
- In a section showing many records, is each row identified by its record's display label, under column headings, with named controls?

### UI states (empty/loading/error/success)  `[feature: ui-states]`

- Are empty, loading, error, success, and access-denied states represented where relevant?

### User profile in header (avatar, top-right)  `[feature: user-profile-header]`

- Does the shell show the acting user top right on every page, with sign out?

### Architecture conformance  `[feature: web-ui-architecture-conformance]`

- For each architecture decision the frontend realizes: where is it realized (paths or modules), how is it checked (a `mde verify` check, a test, or the auditor's judgment), and does the code conform (conforms, violates, or not checked), in the report's *Conformance* section? A decision not checked is shown as such, never as conforming; each violation is also a Finding.
- Does the frontend call the backend only as the architecture decides, through its boundaries, with every deviation recorded as an exception?
- Do the architecture and interaction diagrams agree with what the frontend does: its components, and the requests it makes, in order, on the main path and on the paths that change the outcome?
- Does the navigation diagram show every page of the application's page inventory and the links a person actually follows, and nothing else?

### Web UI checks across Features  `[feature: web-ui-checks]`

- Are empty, loading, error, success, and access-denied states represented, styling composed from the design system and the stack's UI profile, and important elements given stable selectors?
- Does each page link to the primary pages with real routing, does any rendered workflow match its stages, and does the shell show the acting user top right with sign out?
- Are the role switcher and guided workflows present when they apply and only behind the development flag? Do guided workflows follow the workflow's stages and route into the live pages?
