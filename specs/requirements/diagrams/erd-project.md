---
type: logical-data-model-diagram
title: Project logical data model
---

# Project logical data model

```mermaid
erDiagram
  Project {
    uuid id PK
    string projectCode
    string name
    text description
    date startDate
    date endDate
  }
  ProjectAssignment {
    uuid id PK
    string responsibility
    date startDate
    date endDate
    decimal allocationPercent
  }
  Project }o..|| Client : "delivers work for"
  Project ||--o{ ProjectAssignment : "has assignments / belongs to"
  ProjectAssignment }o..|| Employee : "assigns"
```

## Reading

Project is primary and ProjectAssignment supports it. Every Project references one external Client and owns zero or more assignments. Every assignment belongs to one Project and assigns one external Employee. Employees can have many assignments.
