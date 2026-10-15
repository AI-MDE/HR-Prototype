---
type: target
id: business-requirements
title: Business requirements
applies_when:
  - the work performs business analysis, or defines or refines requirements
  - the work defines or changes capabilities, entities, use cases, business rules, roles, business events, workflows, or the glossary
  - the work imports or reconciles upstream business specifications
stage: requirements
---

# Business requirements

<!-- COMPILED by compile-targets.mjs from features. Skeleton (Purpose +
     applies_when) is authored; the sections below are composed from the
     contributing features, each tagged [feature: <id>]. Do not hand-edit
     the composed sections — edit the feature and recompile. -->

## Purpose

What good requirements look like, and how to check them. Requirements describe what the business needs and how the application supports it at a business level, clearly enough to drive design, pages, prototypes, building, and tests. Their shape is defined by the [Requirements](../../metamodel/requirements/README.md) concepts.

It governs: [Domain](../../metamodel/requirements/domain.md), [Capability](../../metamodel/requirements/capability.md), [Entity](../../metamodel/requirements/entity.md), [Use Case](../../metamodel/requirements/use-case.md), [Business Rule](../../metamodel/requirements/business-rule.md), [Role](../../metamodel/requirements/role.md), [Workflow](../../metamodel/requirements/workflow.md), [Business Event](../../metamodel/requirements/business-event.md), [Glossary](../../metamodel/requirements/glossary.md), the [optional Features](../../metamodel/feature.md) applied to them, and the requirements diagrams: [Use-Case Diagram](../../metamodel/requirements/use-case-diagram.md), [Use-Case Behavior Diagram](../../metamodel/requirements/use-case-behavior-diagram.md), [Logical Data Model Diagram](../../metamodel/requirements/logical-data-model-diagram.md), [State-Transition Diagram](../../metamodel/requirements/state-transition-diagram.md).

## Outputs

Each where its concept's *Location* says.

| Output | Per | When |
|---|---|---|
| Domain overview | application | always |
| Capability | capability | always: every ABE lives under one |
| ABE (a folder, with its Primary Entity) | ABE | always |
| Entity | entity | always |
| Use Case | use case | always |
| Business Rule | business rule | always |
| Role | role | always |
| Business Event | business event | when events are in scope |
| Workflow | workflow | when a process spans several use cases |
| Glossary | application | always |
| Use-case diagram, conceptual data model diagram | application | always |
| Logical data model diagram | ABE | always |
| Use-case behavior diagram | use case | always |
| State-transition diagram | entity or workflow with states | when it has states |

Open questions go to `work/current/questions.md`, not into the requirements. Before claiming requirements are complete, review material ambiguity in actors, entity boundaries, cardinality, quantities, lifecycle, exceptions, concurrency, and scope, and make sure no unresolved policy has silently become implementation behavior.

## Evidence

The rows of the Evidence Package this Target owns: what `mde verify` measures and reports for it, each by its id. Tools take a row's title and what it proves from here.

| Row | Title | Proves | Needs |
|---|---|---|---|
| okf-requirements | OKF compliance | Every requirement Spec is as the [OKF profile](../../metamodel/okf.md) requires: front matter naming a concept type the Meta-model defines, the reserved files, semantic identifiers, and links that resolve. | — |
| diagrams | Requirements diagrams | The diagrams the Method requires of the requirements are delivered (data models, use cases, states), and those rendered from DOT are current. | — |
| entity-placement | Entity placement | Every entity is in an ABE folder under its capability, each ABE has its Primary Entity, and entity names are unique. | — |
| entity-model | Entity model | Each entity has typed attributes and a key, its relationships as the table linking real entities, and transitions between its declared states, held by an enum attribute. | — |
| requirement-links | Requirement links | Every link inside the requirements resolves. | — |
| use-case-references | Use case references | Every use case names roles that exist as its actors, and invokes operations its entities declare. | — |
| operations-used | Operations used | Every operation that changes something is invoked by some use case. | — |
| roles | Roles | Roles are kept at the top level, each the actor of some use case. | — |
| business-rules | Business rules | Each rule of its own file is linked from an entity it governs, and each rule id is used once. | — |
| capabilities | Capabilities | Each capability's overview lists its ABEs, its own first, and links its workflows. | — |
| domain | Domain | The Domain's Purpose and Scope are written. | — |

## Composed behavior

### ABEs  `[feature: business-requirements-abe]`

- **Find the ABEs first.** For each capability, name its primary business concepts: the things the business is about and a user starts from (a Service Request, a Customer, a Resource). Each is an ABE, named after its Primary Entity, in a folder of that name under the capability that is its home (`capabilities/<capability>/<abe>/`). Then give each ABE its supporting entities: those that exist to describe or serve the primary one (a Resource's Availability and Qualification), and that would not be looked for on their own.
- **One home.** An ABE lives under one capability, the one whose work it mostly serves. Another capability that uses it lists it in its overview's `## ABEs` and links to its entities where they are; it never gets a copy.
- **The Primary Entity carries the ABE.** Its spec (named after the folder) states the ABE's Purpose, the Rules that span the ABE's entities, and its `## Levels`. Entity names are unique across the application.
- **Levels of detail.** When an ABE has more detail than every application needs, list in `## Levels` which supporting entities belong to `Standard` and to `Enterprise`; the rest is `Simple`. Specify and build only the entities at the level the Goal needs (Simple for a prototype), and list the others there for later.
- **Relationships as a table.** Every relationship is a row of the entity's Relationships table, with its Role, Cardinality, Kind, and Cascade ([Entity](../../metamodel/requirements/entity.md)). A supporting entity is normally a `composition` of its Primary Entity, and a link to another ABE a `reference` or `association`. A relationship that crosses into another ABE is what links two ABEs in the [Conceptual Data Model Diagram](../../metamodel/requirements/conceptual-data-model-diagram.md).

### Optional Features in the requirements  `[feature: business-requirements-aspects]`

Explore the [optional Feature catalog](../../optional-features/index.md) (its index, `optional-features/catalog.json`) for every concept in scope; never wait to be asked. For the application, each entity, its attributes and relationships, its operations, and each use case, go through the Features whose `scope` includes that kind of object and whose `appliedIn` includes `requirements`, and decide, from the business need:

- **Apply it** when the business needs it, with the options chosen, in the concept's `## Features` section (or the attribute table's `Features` column), by its id:
  - an entity edited concurrently needs `optimistic-concurrency`;
  - one whose changes need accountability needs `audit-trail` (with `createdBy`, `updatedBy`, `history` as required);
  - one that must not be physically deleted needs `soft-delete`;
  - a lifecycle needs `state-machine`;
  - a large collection needs `pagination` and `search`;
  - children kept in an order the user sets (an order's line items) need `ordering`;
  - an entity whose instances form a tree through a parent of the same kind needs `hierarchy`;
  - instances users label freely to find them again need `tags`.
  
  An attribute that identifies a record to people, or a business key, is a property of the model (its label, a unique key), not a Feature.
- **Leave it out** when the business does not need it. Never apply a Feature to fill a checklist, or because the catalog has it.
- **Ask** when the need is genuinely unclear (should approvals notify the requester; may employees be deleted, or only deactivated): add a question with the default assumed meanwhile ([Questions](../../metamodel/work/questions.md)).

Read a Feature's file once you apply it: its meaning, parameters and promises are what the requirement now asks for. Applying a Feature states a requirement; its realization is designed and checked separately ([realization](../../features/application-design/aspect-realization.md)). The retired `## Aspects` section is not read; `mde migrate-features` converts an application that still uses it.

### Business Event  `[feature: business-requirements-business-event]`

A state change may produce a business event; it is not an event by itself. Select events deliberately: an occurrence qualifies only when it hands work to another actor or transaction, creates an obligation or authorization, materially affects another entity, must reach an external party, carries contractual, regulatory, or reporting weight, marks a business milestone, or flags an exception needing separate handling. Do not derive events mechanically from entity transitions, saves, or endpoint calls. Recording events at runtime is an architecture concern ([Business Event Recording](../../architecture/business-events.md)).

### Business Rule  `[feature: business-requirements-business-rule]`

- Define business meaning precisely enough to implement and test, without prescribing an algorithm; enforcement mechanisms belong in Design.
- Identify rules governing operations, events, lifecycle transitions, relationships, and derived values. A rule is valid even without a user-facing use case.
- Associate each rule with its owning concepts and the contexts where it is enforced. Use cases invoke governed operations; they do not repeat rule logic.
- For quantified policies, state amounts, periods, aggregation, thresholds, cardinality, and remaining or fulfilled quantities precisely. Examples clarify a policy but do not settle an open business decision.
- Provide satisfying, violating, and boundary scenarios where applicable, including who may grant an exception.

### Capability  `[feature: business-requirements-capability]`

- It states its purpose, primary actors, business outcomes, its primary entity when that helps define the boundary, and links to its workflows, its conceptual data model, the ABEs it uses (its own first, each by its Primary Entity), its rules, use cases, and pages.
- The overview points rather than contains: a short purpose, then links. The content of its workflows, ABEs, and use cases stays in their own files, so the overview is cheap to read and the rest is read only when the work needs it.
- It says something real and specific about this business: concrete operations, constraints, and decisions a builder could implement without guessing. A template with every section present but vague content ("manages records") is not a requirement. Its purpose is reflected in its operations and rules, and capabilities do not read as copies of one another.

### Diagrams  `[feature: business-requirements-diagrams]`

Diagrams are views; they never hold meaning the concepts lack. Each diagram is its own page, typed with its kind; split one that grows unreadable into one page per capability, as its kind says. Where a kind is drawn in DOT, the DOT file is the source, rendered to SVG with `mde render-diagrams`; never edit an SVG by hand.

- **Use-case diagram:** create it with the first use case; update it whenever a use case or role is added, renamed, removed, or changes actor.
- **Use-case behavior diagram:** update it whenever the use case's steps, branches, or outcomes change.
- **Conceptual data model diagram** (`erd.md`, the ABEs by capability): create it with the first ABEs; update it whenever an ABE is added, renamed, or removed, or a relationship starts or stops crossing between two ABEs.
- **Logical data model diagram** (`erd-<abe>.md`, one per ABE): create it with the ABE; update it whenever one of its entities, attributes, or relationships changes, or the application's level of detail changes.
- **State-transition diagram:** create it when the concept defines its states; update it whenever states, transitions, or guards change.

### Domain  `[feature: business-requirements-domain]`

The Domain overview identifies the business problem or opportunity, the business goals, what is in and out of scope, assumptions, constraints, and stakeholders. Missing or deferred items are marked explicitly rather than presented as complete.

### Entity  `[feature: business-requirements-entity]`

- Preserve meaningful relationship labels, roles, cardinalities, temporal meaning, and ownership: each relationship is a row of the Relationships table with its Role, Cardinality, Kind, and Cascade ([Entity](../../metamodel/requirements/entity.md)), never a bare link. Use business identifiers when the business uses them; do not fabricate identifiers to suit a database design.
- Review durable objects that are referenced repeatedly for entities that are missing.
- Operations are explicit: the applicable Create, Read, Update, and Delete, stating when one is prohibited, then domain operations such as Submit or Approve, each saying what it requires and its lifecycle effect. Its inputs and realization are design, in its capability's [Capability Design](../../metamodel/design/capability-design.md); who may run it is derived from the use cases that invoke it ([Authorization](../../metamodel/design/authorization.md)). The entity spec holds neither, so the requirements stay the business meaning only. Operations remain subject to rules, authorization, and lifecycle constraints. An internal or system operation needs no user-facing use case, but its trigger and verification must still be explicit.
- Use cases invoke entity operations; they do not duplicate entity rules. Storage mapping belongs in Design (the design catalog's naming convention and the capability design's overrides); declaring an entity does not implement it.

### Glossary  `[feature: business-requirements-glossary]`

Cover domain nouns, roles, statuses, and key processes; leave out generic English and technical jargon. When a term is renamed in Specs, rename it in the glossary too.

### Role  `[feature: business-requirements-role]`

Each role states its business responsibility, the goals and outcomes it owns, the capabilities and use cases it uses, the decisions, approvals, confirmations, or information it supplies, and its business-level permissions, constraints, and scope. Roles are shared at the top level, never duplicated inside a capability; the role id is the key entity operations and use cases reference.

### Use Case  `[feature: business-requirements-use-case]`

- Steps express business interactions and system responsibilities, not only pages or internal function calls: who acts, what is requested, the relevant context, the operation actually invoked, and its outcome.
- Distinguish the initiating trigger from later decisions. Record alternate, rejected, cancelled, and waiting outcomes where they matter; do not collapse a durable handoff or wait into an immediate function call.
- Invoke declared entity operations and preserve their authorization, rule, and lifecycle meaning. Do not duplicate business rules or invent permissions.
- A use case is not a single operation. It is what a person sets out to do, and it invokes several operations, often on several entities. An action that is one operation (submit, accept, cancel a record) is the entity's operation, invoked by the use cases that need it; viewing a record is the page that shows it. Neither is a use case of its own.
- Its actors and Invoked Entity Operations are who may run what: authorization is derived from them ([Authorization](../../metamodel/design/authorization.md)), so a role that needs an operation is an actor of a use case that invokes it. The use case carries no design: its realization is in Design.
- Connect successive interactions through compatible postconditions and preconditions. State acceptance conditions as business situations with expected results.
- Every actor named participates explicitly: the primary actor initiates and has authority to pursue the goal; a supporting actor supplies information, decides, approves, confirms, receives, or is notified. When the outcome needs another actor's approval, state the handoff and the resulting intermediate state; do not call the outcome complete before that actor acts.

### Workflow  `[feature: business-requirements-workflow]`

Create a workflow only when a meaningful process spans several use cases, actors, or states over time.

- A workflow belongs to the capability whose goal it serves, in that capability's `workflows/` folder, and the capability's overview links it.
- Its Steps are a table, `Step | Role | Does | Reaches`, one row per step in order: the role links its Role, Does links the use case (or the entity operation, when no more is involved) the step runs, and Reaches is the state it leaves the main record in. The Workbench draws the workflow from this table; it is also what a later BPMN realization is generated from. Decisions and other paths stay prose.
- A workflow describes; it does not execute.

### Business transaction analysis  `[feature: business-transaction-analysis]`

**Business transaction.** A use case expresses a real business objective, not a generic record operation. A structurally complete use case is still defective when its trigger disappears from the flow, or its outcome only says a record was created. For every non-trivial use case, work out:

- **Business condition** — the real situation that causes the transaction.
- **Objects involved, by role** — not a flat noun list:

  | Role | Meaning |
  |---|---|
  | Driving | Carries the business need and anchors the transaction |
  | Result | Created or changed to achieve the goal |
  | Supporting | Selected, consulted, or validated |
  | Impacted | Materially changed as a consequence (records, balances, totals, availability, lifecycle states) |

- **State change** — before, change, and after, for the driving, result, and impacted objects.
- **Outcome reconciliation** — how the business condition ends: resolved, partially resolved, deferred, rejected, or still open.

Trigger, preconditions, flow, alternatives, objects, and outcome tell one causally connected story.

- **Goal states a business result.** "Fulfil all or part of an approved staffing demand", not "Create a project assignment". Record creation and status changes belong in the result.
- **Find the missing driving object.** When a trigger, rule, step, quantity, or outcome refers to something with identity, state, history, quantities, or lifecycle (a demand, request, application, case, order, claim, reservation), check whether the entity model is missing it. Do not force it into a result entity because that one is convenient to persist.
- **One trigger per use case.** Different triggers needing a different driving object, decision, goal, or outcome are separate use cases. Alternate flows vary the same transaction; they do not add a later lifecycle goal.
- **Quantified fulfilment.** Where a need is measured (staffing, orders, payments, capacity, inventory, budget, quotas), define the requested amount and unit, fulfilled and remaining amounts, whether fulfilment is partial or additive, whether several results may fulfil one need or one result several needs, the over-fulfilment policy, and reconciliation after cancellation or reversal.
- **Situations become test conditions.** State the important situations (completion, partial fulfilment, exceptions, cancellation, insufficient capacity, unauthorized participation) as conditions with one expected business result each: "the candidate has only 40% available against a 60% demand" → "a 40% assignment is created and the demand stays open for 20%". Concrete values, state tables, and API or UI mechanics belong to the use-case realization in Design.

### Governed values from specs  `[feature: governed-values-from-specs]`

Every categorical value (roles, statuses, enumerations, departments) is defined once in the requirements (entity attributes and states, roles, rules) and used from there by design, pages, and sample data; none is invented downstream.

### Industry patterns  `[feature: industry-patterns]`

- When eliciting the requirements of a new domain or capability, consult the catalog before proposing the model: read its `catalog.md`, then the industry pattern (or patterns) closest to the business (a field-service business, equipment service; a crane or equipment rental business, crane rental orchestration; a firm selling its people's time, professional services). Choose the variant the Goal needs: Simple for a focused application or a prototype, Standard for normal operation, Enterprise only when the business asks for its scale. With no industry pattern close, start from the subjects themselves.
- Take the common concepts the pattern selects from their subject pages, and nothing because the pattern has it: the concepts and relationships the business confirms, their lifecycles and states, the pattern's baseline rules as candidate business rules, its roles. Use a page's *Also known as* and *In industries* to recognize the concept under the business's name, not to copy every industry's attributes. A subject usually becomes one or more of the application's capabilities; the concepts it takes with the ones that serve them become [ABEs](../../metamodel/requirements/abe.md), and the pattern's variants the ABEs' `## Levels`. Each becomes the application's own concept, named in the business's words: the catalog informs the meaning, never the vocabulary (the business's "job" stays a Job, not the catalog's "Work Order").
- Add what the business needs and the common model does not carry: the pattern's *concepts applications typically add* are the usual candidates, defined in the application's own Specs, each specializing the canonical concept the pattern names. A relationship the catalog marks `review` is an open question to decide for the application, not a given.
- Use the pattern's modeling questions to find the policy the business has not stated, and add them to the Questions with the default the pattern suggests ([Questions](../../metamodel/work/questions.md)). Check the model against the pattern's anti-patterns.
- Record what informed the model in the Domain's `## Industry patterns` section ([Domain](../../metamodel/requirements/domain.md)): each pattern and variant used, what was taken from it, and what was deliberately left out. When no pattern matches, say so there.
- When the catalog cannot be reached (no network, no access), say so to the user, record it in the Domain, and elicit without it.

### Role success factors and dashboards  `[feature: role-success-factors]`

- For each role that owns outcomes (not one that only supplies information), elicit its Critical Success Factors in the role's `## Critical Success Factors` section ([Role](../../metamodel/requirements/role.md)): few (three to five), each stated as the outcome in the business's words.
- Give each factor:
  - **Measure:** the indicator that shows it, defined from the model: what is counted, summed, averaged, or timed, over which entity, in which states, and over what period (for example the share of urgent Service Requests assigned within 60 minutes of being raised, this week). Every entity, attribute, state, and event a measure names exists in the requirements; when it needs one that does not (the time a request was assigned), add it to the model, or the factor cannot be measured.
  - **Target:** the value that means success, and the threshold at which the role is in trouble (for example 95%, at risk below 90%).
  - **Action:** what the role does when the factor is at risk, and the use case it does it with (assign the waiting requests: Schedule and Assign Service Request). A factor the role cannot act on belongs to another role.
- A factor whose target the business has not stated is an open question with the default assumed meanwhile ([Questions](../../metamodel/work/questions.md)).

## Verify and Audit

The Checks `mde verify` proves for this target compile to `targets/verification/business-requirements.md`; what a second agent judges compiles to `targets/audit/`, under each Feature's first Target.
