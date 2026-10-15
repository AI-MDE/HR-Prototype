---
type: architecture
---

# Deployment Architecture

Deployment architecture is an application decision.

Record the selected deployment model when known. Do not implement multiple deployment models unless required.

Document the runtime topology, configuration, secrets handling, persistence and external connectivity, base paths or addressing where applicable, health/readiness behavior, and operational constraints relevant to the selected model.

The concrete hosting platform, packaging model, process topology, container technology, serverless platform, and deployment tooling are project configuration/architecture choices.

## Configuration and secrets

Configuration that differs by environment must be externalized from application code. Secrets must not be hardcoded or committed to source control.

The concrete configuration mechanism—environment variables, configuration service, secret store, files, platform bindings, or another mechanism—is a project choice and must be documented for operators.
