---
type: audit-view
title: Audit — persistence-design
---

# Audit — persistence-design — COMPILED from features' `## Audit`

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

### Audit history  `[feature: audit-history]`

- For audited entities: are the audit fields and history present, set on the write path (marked), and not editable through the application?

### Optimistic locking  `[feature: optimistic-locking]`

- For concurrently editable entities: are updates version-guarded and incrementing (marked), and does a mismatch return a conflict with the current state?
- Does the design name each audited entity and its depth, and each concurrently editable entity and its version token (or say why it has none)?

### persistence-design rules  `[feature: persistence-design-rules]`

- Are keys, lifecycle, and the selected aspects' realizations explicit?
- Does the physical data model diagram account for every business entity and agree with the schema?

### Schema from entities  `[feature: schema-from-entities]`

- Do APIs and services avoid leaking raw database details?

### Physical data realization  `[feature: storage-view-model]`

- Does the physical mapping preserve the logical meaning and the required constraints?
- Does each persisted entity's storage follow from the catalog's convention, its Features, and its capability design's overrides, with no table or column listed that the convention already gives? Does every attribute have exactly one column, and does every other column say what it is (key, foreign key, audit, version)?
