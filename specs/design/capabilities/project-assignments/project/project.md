---
type: entity-design
title: Project design
---

# Project design

Realizes [Project](../../../../requirements/capabilities/project-assignments/project/project.md).

## Operations

- **Create** — Take project attributes and clientId; resolve the client and persist the project. A client registered earlier in the flow is a separate committed record, so cancelling the project leaves the client available.
- **Read** — Return projects and a project by id; load its assignments through ProjectAssignment.Read.
