---
type: audit-view
title: Audit — business-requirements
---

# Audit — business-requirements — COMPILED from features' `## Audit`

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

### ABEs  `[feature: business-requirements-abe]`

- Is every entity in an ABE folder under its home capability, with exactly one Primary Entity per ABE (the spec named after the folder), and entity names unique across the application?
- Does each Primary Entity's spec state the ABE's purpose, its cross-entity rules, and (when it has more detail than one level) its `## Levels`, and are only the entities at the application's level specified?
- Does every entity list its relationships as the table, each row with Role, Cardinality, Kind, and Cascade?
- Does each capability's overview list the ABEs it uses, its own first?

### Optional Features in the requirements  `[feature: business-requirements-aspects]`

- **Optional Features:** Was every in-scope concept considered against the Features that apply to it? Does each applied Feature name a catalog id (never a former name) valid for that kind of object and for the requirements, with its options chosen? Is each grounded in a business need, and is each unclear need an open question with a default?

### Business Event  `[feature: business-requirements-business-event]`

- **Business Event:** Does each event meet one of the selection criteria, rather than mirroring a state change?

### Business Rule  `[feature: business-requirements-business-rule]`

- **Business Rule:** Is the policy specific and non-circular, with a real business basis? Are inputs, conditions, results, violations, and exceptions explicit? Is each rule connected to its owning concepts and enforcement context? Do success, failure, and boundary scenarios demonstrate its meaning? Are unresolved policy and unsupported realization visible?

### Capability  `[feature: business-requirements-capability]`

- **Capability:** Does each define purpose, primary actors, outcomes, and (when applicable) a primary entity, with its related concepts linked? Is each specific and coherent rather than generic boilerplate?

### Diagrams  `[feature: business-requirements-diagrams]`

- **Diagrams:** Does every element in a diagram exist as a concept, and does every concept in scope appear? Does every ABE have its logical data model, and does every line between ABEs in the conceptual data model correspond to an entity relationship that crosses them? Is each diagram its own page, typed with its kind, and readable (split by capability when it is not)? Is each SVG rendered from its current DOT source (`mde render-diagrams --check`)?

### Domain  `[feature: business-requirements-domain]`

- **Domain:** Are the problem, goals, scope boundaries, assumptions, constraints, and stakeholders identified, with gaps marked as such?

### Entity  `[feature: business-requirements-entity]`

- **Entity:** Are required entities and relationships present and semantically complete? Are scoped operations explicit, including prohibited behavior and domain operations? Does every operation a role needs have a use case that invokes it with that role as actor, without invented roles? Is the spec free of design (no Authorization table, Design Semantics, or Storage View)? Do operations, rules, and access refer to concepts that are actually declared?

### Glossary  `[feature: business-requirements-glossary]`

- **Glossary:** Is every domain term used in the Specs defined, with renames applied?

### Role  `[feature: business-requirements-role]`

- **Role:** Does each define responsibility, goals, capabilities used, business-level permissions and constraints, and material approvals or decisions? Are roles shared at the top level and not duplicated inside capabilities?

### Use Case  `[feature: business-requirements-use-case]`

- **Use Case:**
  - Does each have a meaningful goal, valid actors or trigger, and an observable outcome?
  - Are entry conditions, normal flow, branches, waits, and handoffs coherent?
  - Do invoked operations exist and preserve rule, authorization, and state meaning?
  - Does every named actor participate, and is the primary actor's authority (or the required handoff) explicit?
  - Are acceptance situations and expected outcomes precise enough to verify?
  - Does the flow carry the triggering business condition through, and does the outcome resolve, reduce, defer, reject, or record it?
  - Is the goal a business outcome rather than a record create, update, or status change? Does it invoke more than one operation (`mde verify` reports one that does not)?
  - Is the driving object identified and carried through (or its absence justified), and are result, supporting, and impacted objects identified with their resulting states?
  - Do durable concepts implied by needs, quantities, history, or lifecycle resolve to entities, or have a recorded reason not to?
  - Where fulfilment is quantified, are requested, fulfilled, remaining, multiplicity, and reversal defined?
  - Does each complex or quantified transaction state its important situations as test conditions that agree with the entities, lifecycle, and rules?

### Workflow  `[feature: business-requirements-workflow]`

- **Workflow:** Is it in its capability's `workflows/` folder and linked from the overview? Is every step a row of the Steps table, with a role and what it does linked to specs that exist? Do consecutive steps' states follow the main record's lifecycle?

### Business transaction analysis  `[feature: business-transaction-analysis]`

- Does the main flow preserve the business condition named by the trigger and explicitly resolve,
  reduce, defer, reject, or record it in the outcome?
  · evidence: trigger + main flow + outcome
  · when: audit
- Is the driving business object identified and carried through the transaction, or is its absence
  explicitly justified because the trigger is an immediate event with no durable business object?
  · evidence: use-case object roles + entity model
  · when: audit
- Is the business goal expressed as a business outcome rather than only a record create/update or
  status-change operation?
  · evidence: Business Goal vs. Data Created / Changed / Viewed
  · when: audit
- Are result, supporting, and materially impacted objects identified, with their resulting states
  reconciled?
  · evidence: object roles + state-change table + outcome
  · when: audit
- Do durable concepts implied by needs, quantities, history, and lifecycle resolve to entities, or
  have a documented reason not to?
  · evidence: use-case wording vs. entity model + open questions
  · when: audit
- Where fulfilment is quantified, are requested, fulfilled, remaining, multiplicity, and reversal
  semantics defined?
  · evidence: use case + rules + entity properties
  · when: audit
- Does each complex or quantified transaction surface its important situations as **test
  conditions** (situation + one expected business result) that agree with the use case, entity
  cardinalities, lifecycle, and business rules — rather than forcing executable examples or
  per-step state tables into the business use case?
  · evidence: use-case Test Conditions section
  · when: static + audit

### Industry patterns  `[feature: industry-patterns]`

- Was the catalog consulted for the domain, and is the pattern and variant used (or that none matched, or that it could not be reached) recorded in the Domain's `## Industry patterns`?
- Is every concept taken from the catalog one the business needs, named in the business's own words, and is what the business needs beyond the common model added in the application's Specs rather than missing?
- Are the pattern's modeling questions that the requirements do not answer open Questions, each with a default?

### Role success factors and dashboards  `[feature: role-success-factors]`

- Does each role that owns outcomes state its Critical Success Factors, each with a measure defined from the model, a target, an at-risk threshold, and an action through a use case?
- Does every entity, attribute, state, and event a measure names exist in the requirements?
- Does each role with factors have a dashboard page with one panel per factor, showing value against target and status, and leading to the records behind it and the action?
