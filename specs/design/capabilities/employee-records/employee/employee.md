---
type: entity-design
title: Employee design
---

# Employee design

Realizes [Employee](../../../../requirements/capabilities/employee-records/employee/employee.md).

## Operations

- **Create** — Take all required business attributes from the employee form; generate the UUID and persist the record.
- **Update** — Take the employee id and the complete editable attribute set. Acquire the employee lock, re-read assignments, validate against current commitments, and persist the accepted changes. No assignment is changed implicitly.
- **Read** — Return employee attributes. Related reviews and assignments are fetched separately under their own read grants.
