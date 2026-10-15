---
type: entity-design
title: Client design
---

# Client design

Realizes [Client](../../../../requirements/capabilities/project-assignments/client/client.md).

## Operations

- **Create** — Take clientCode and name; generate id and return the persisted client. Duplicate code selects no arbitrary record: report the conflict so the flow can use the existing client.
- **Read** — Return clients by list or id; follow clientId to related projects.
