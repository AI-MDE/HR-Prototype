# Meta-Model

The MDE Meta-Model is an OKF knowledge bundle, organized in folders by area. A type id is the definition's filename, wherever it sits in the tree: `type: entity` resolves to `requirements/entity.md`. A folder's `README.md` describes the area and may itself define the type named after the folder. Each definition owns its title, description, and icon; this index presents them for navigation.

## Core conventions

- [OKF Profile](okf.md) — representation and frontmatter rules.
- [OKF Model and Tooling Conventions](README.md) — models, type resolution, directory semantics, and tooling.
- [Overview](overview.md) — the knowledge areas and how they relate.

## Shared

- [📐 Diagram](diagram.md) — A version-controlled visual view of knowledge whose semantics remain owned by the concepts it depicts. Each diagram kind is defined in the area that owns it.
- [🧩 Feature](feature.md) — A reusable unit of engineering knowledge: a build Feature always applies through the Targets; an optional Feature applies where a Spec chooses it. See the [optional Feature catalog](../optional-features/index.md).

## [Requirements](requirements/README.md)

- [📋 Requirements](requirements/README.md) — Requirements describe what the application means, needs, allows, constrains, and expects.
- [🌐 Domain](requirements/domain.md) — The overall business domain, purpose, boundaries, and capability decomposition served by an application.
- [🧩 Capability](requirements/capability.md) — A meaningful business ability or area of responsibility supported by the application.
- [🧱 ABE](requirements/abe.md) — An Aggregate Business Entity, a cohesive set of entities around one primary business concept, under its capability.
- [📦 Entity](requirements/entity.md) — A durable business concept with identity, information, behavior, relationships, or lifecycle.
- [🎯 Use Case](requirements/use-case.md) — A behavioral specification describing how an actor or external trigger achieves a meaningful goal.
- [🔁 Workflow](requirements/workflow.md) — A durable end-to-end business process spanning multiple interactions, actors, or states.
- [⚖️ Business Rule](requirements/business-rule.md) — A durable constraint, derivation, authorization, eligibility condition, or policy governing business behavior.
- [👤 Role](requirements/role.md) — A business responsibility or actor classification relevant to permissions and use cases.
- [⚡ Business Event](requirements/business-event.md) — A business-significant fact that has occurred and that the business must recognize on its own.
- [📖 Glossary](requirements/glossary.md) — The authoritative, plain-language definitions of the application's business terms.
- [🎯 Use-Case Diagram](requirements/use-case-diagram.md) — The actors of the application and the use cases each performs.
- [🪜 Use-Case Behavior Diagram](requirements/use-case-behavior-diagram.md) — What happens inside one use case — its steps, branches, and outcomes.
- [🧭 Conceptual Data Model Diagram](requirements/conceptual-data-model-diagram.md) — The application's ABEs, grouped by capability, and how they relate.
- [🔗 Logical Data Model Diagram](requirements/logical-data-model-diagram.md) — The entities of one ABE, their business attributes, and their relationships, independent of storage technology.
- [🔀 State-Transition Diagram](requirements/state-transition-diagram.md) — The lifecycle states of an entity or workflow, with the events or operations and guards that move it between them.

## [Architecture](architecture/README.md)

- [🏗️ Architecture](architecture/README.md) — A durable engineering decision or constraint affecting multiple features, components, or future changes.
- [🏗️ Architecture Diagram](architecture/architecture-diagram.md) — The system's components or layers and the dependencies between them.
- [🔄 Interaction Diagram](architecture/interaction-diagram.md) — How the architecture's layers and components communicate, in order, for the main request path and each key scenario.

## [Design](design/README.md)

- [✏️ Design](design/README.md) — Application-specific realization choices within business requirements and architecture.
- [🔌 API Contract](design/api-contract.md) — A design contract defining a system operation exposed to consumers.
- [🔗 Integration](design/integration.md) — A design concept defining interaction with an external system.
- [📖 Design Catalog](design/design-catalog.md) — The application's design vocabulary: every term its design uses, defined once with what it means and how the application realizes it.
- [🛠️ Entity Design](design/entity-design.md) — How one entity's operations are realized, in short prose: what each takes and gives, what it records, what it calls, and how it fails.
- [🛠️ Capability Design](design/capability-design.md) — How one capability's entities and operations are realized, stated as the design catalog's terms.
- [🔐 Authorization](design/authorization.md) — Which roles may run each entity operation, derived from the use cases.
- [🗄️ Data Model](design/data-model.md) — The physical realization of business entities and relationships in the selected persistence technology.
- [🗄️ Physical Data Model Diagram](design/physical-data-model-diagram.md) — The persisted representation of the business entities in the selected persistence technology.
- [🗺️ Navigation Diagram](design/navigation-diagram.md) — How a person moves through the application: each role's entry page, the pages, and the links and actions between them.

## [Work](work/README.md)

- [🎯 Goal](work/goal.md) — The result the user is ultimately trying to achieve.
- [🎯 Work Targets](work/targets.md) — The Goal's Targets and what has been done to each, a record per Target and scope, as dates.
- [🔨 Current Work](work/current-work.md) — The bounded work currently being performed toward a Goal.
- [❓ Questions](work/questions.md) — Open questions about the work, with the user's answers and the defaults assumed until they answer.
- [📍 Status](work/status.md) — The current state of the work: what has been done and what comes next.
- [🚩 Finding](work/finding.md) — A failure, gap, or violation found by verification, and what was decided about it.
- [📣 Release Notes](work/release-notes.md) — What a release changes for its users, how to move to it, and what it knowingly leaves out.
- [🧭 Strategy](work/strategy.md) — Reusable guidance describing how a goal or declared behavior should be approached.
- [🔍 Review](work/review.md) — A review session the user conducts in the Workbench over the pages changed between two commits.
- [📌 Annotation](work/annotation.md) — A note the user attaches to a document or a page element in the Workbench, for the agent to act on.

## [Evidence](evidence/README.md)

- [🗂️ Evidence Package](evidence/evidence-package.md) — The one page a reviewer reads to judge the application: what was checked, the result, and where the details are.
- [🧪 Test Report](evidence/test-report.md) — The result of one test suite run, scenario by scenario, with logs and screenshots.
- [🧾 Coverage](evidence/coverage.md) — Is it built, and is it tested? For the API and the pages, each requirement tested, built but not tested, deferred to a later slice, or missed.
- [🕵️ Audit Report](evidence/audit-report.md) — A second agent's verdicts on one Target's Audit concerns, each with a witness and a fix.
- [🔬 Architecture Audit](evidence/architecture-audit.md) — A second agent's judgment of each architecture decision: resolved, traceable to a need, and consistent with the stack and the other decisions.

## Docs

- [📚 Documentation](documentation.md) — The guides that ship with the application, for its users, administrators, and operators.
