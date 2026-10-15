---
type: audit-view
title: Audit — ui-design
---

# Audit — ui-design — COMPILED from features' `## Audit`

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

### Page baseline recommendations  `[feature: page-defaulting]`

- Does each generated page serve a real scoped outcome, follow the conventions (or a recorded decision), with the required operations covered and omissions visible, and no unnecessary pages or duplicate interactions?

### Actions and their target  `[feature: ui-design-actions-and-their-target]`

- Does every modifying action belong to a panel, resolve to a declared operation, and have one unambiguous target? Is it disabled when its required selection is missing, with no fallback to a first or default record, and is bulk partial-failure behavior declared?
- Is every terminal action scoped to the panel context it completes? Is `Profile` used only as a page pattern and `Tree` only as a panel type? Does every editing List declare its behavior?
- Are the required UI operations derived from the Specs, bound to the correct operations, roles, and record context, with non-UI exclusions marked?

### Maintenance  `[feature: ui-design-maintenance]`

- Does each page capture its structure at the depth its scope needs? With composition: does each canvas have a valid type and real panels, and each panel a resolvable source, type, purpose, placement, and services?
- Does every in-scope entity have a Maintenance panel, does each page maintain only its subject, and do Reference panels reach the target's own Maintenance page?
- Does the built page follow the UI conventions and its pattern, with real states, and no create, edit, or delete controls for an entity it only references?

### Navigation diagram  `[feature: ui-design-navigation-diagram]`

- Does the navigation diagram show every page of the agreed page set, each role's entry, and the links between them, and nothing else?

### UI page patterns (bounded-first composition)  `[feature: ui-patterns]`

- Does every page select one preferred pattern (no more than two composed unless the use case requires more), or document why `Custom` is needed?

### Use-case wizards  `[feature: use-case-wizards]`

- Does each role have a use-case launcher listing exactly the use cases whose actors include it, read from the Specs, in plain words, and updated when the role changes?
- Does each use case a user performs have a wizard whose steps follow its Spec, each step embedding the application's own working page for it, inside the wizard?
- Does the wizard never send the user elsewhere to do a step, never ask the user to type or confirm what a step's page did, and move on only when the page signals it has done its part?
- Does Cancel show which steps were already saved, and does an all-or-nothing use case write only in its final step?
