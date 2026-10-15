---
type: audit-view
title: Audit — prototype
---

# Audit — prototype — COMPILED from features' `## Audit`

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

### Prototype in four visuals  `[feature: prototype]`

- Were the use-case diagram, the conceptual data model, and each ABE's logical data model rendered from the current requirements, shown, and confirmed before data was written?
- Does each primary entity have a data profile and connected, fictional sample data in the runtime's JSON data, browsable from its list to a record and its related records?
- Does the agreed page set give each role an entry and reach what each role needs, and is it recorded in `specs/design/page-set.md` with its approval linked from Current Work, including when no frontend was generated?
- When pages were generated: was the frontend generated from the agreed page set, in the stack's frontend technology and UI profile (or plain pages when none is chosen), calling only the runtime's API from the Workbench's root, with the role and the application (`folder`) on every request, both addresses from configuration? Does the App area's `mde:start` start it, with its address declared, so the Workbench's App view starts and opens it?
- Was each step shown to the user and confirmed before the next began, and does the prototype contain no backend code, SQL, or migrations?
