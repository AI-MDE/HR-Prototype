---
type: domain
title: HR-Prototype
---

# HR-Prototype

## Purpose

Give HR, managers and project coordinators a shared view of employees, their performance discussions and commitments to client projects.

## Scope / Boundaries

Employee identity, job title and employment dates; narrative performance reviews and development actions; client projects and dated employee assignments with allocation percentages. Use fictional demonstration records.

Payroll, recruiting, leave, billing, time entry, contracts, approval workflows and automated matching are outside this slice. Employee business records are distinct from login identities. Detailed access policies and operational safeguards belong to the later design checkpoint.

## Capability Map

- [Employee records](capabilities/employee-records/overview.md)
- [Performance management](capabilities/performance-management/overview.md)
- [Project assignments](capabilities/project-assignments/overview.md)

## Diagrams

- [Use cases](diagrams/use-cases.md)
- [Conceptual data model](diagrams/erd.md)

## Glossary

[Business terminology](glossary.md)

## Industry patterns

The [Professional Services pattern](https://github.com/AI-MDE/Industry-Patterns/blob/main/industry-patterns/professional-services.md), Simple variant, informed Employee, Client and Project. ProjectAssignment is a scope-driven addition from its Standard variant. PerformanceReview is specific to HR-Prototype. Canonical Worker, Customer, Project and Assignment definitions were consulted. Engagements, tasks, time, expenses, rates, deliverables and finance are omitted. Projects reference clients directly; no contract management or staffing-demand process is implied.
