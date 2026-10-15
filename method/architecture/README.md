# Architecture

Durable, technology-independent architecture guidance for applications built with MDE: [the overview](overview.md) (shape, layering, dependency direction) and one document per topic (API, persistence, UI, validation, domain and access, observability and identity, deployment, testing, governance). Technology choices belong to the [stacks](../stacks/README.md), not here.

## Choosing an architecture

A file here whose frontmatter has a `name` is an architecture a project can choose; `mde init` and the setup wizard list them. Today there is one, [`mdex-application`](overview.md), the default MDEX layering. Its frontmatter gives the name, a one-line description, and the layers shown to the user. Add another only for a recurring, genuinely distinct architectural shape.

## Using it

Record the chosen architecture in the application's Specs, then resolve its layers, dependency direction, constraints, and exceptions as described in the [architecture Target](../features/architecture/resolve-selections-into-specs.md), at the depth the work needs; see the [Architecture stage](../strategy/stages/architecture.md) of the Strategy. Choosing it adopts the guidance as a starting point, not every topic as a settled decision. The application's resolved Specs are authoritative; later edits here do not change an application's decisions.
