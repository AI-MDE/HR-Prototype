---
type: entity-design
title: ProjectAssignment design
---

# ProjectAssignment design

Realizes [ProjectAssignment](../../../../requirements/capabilities/project-assignments/project/project-assignment.md).

## Operations

- **Create** — Take projectId, employeeId and the assignment attributes. Lock Employee, read Project and current commitments, evaluate the rule over actual dated assignments, then persist the assignment. A refusal creates nothing; do not silently reduce the requested allocation.
- **Read** — Return assignment fields with employee and project labels; support the Project profile and employee commitment context.
