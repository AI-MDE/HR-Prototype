---
type: conceptual-data-model-diagram
title: HR-Prototype conceptual data model
---

# HR-Prototype conceptual data model

```mermaid
flowchart LR
  subgraph ER[Employee records]
    Employee[Employee]
  end
  subgraph PM[Performance management]
    PerformanceReview[PerformanceReview]
  end
  subgraph PA[Project assignments]
    Client[Client]
    Project[Project]
  end
  PerformanceReview -->|assesses / reviewed by| Employee
  Project -->|delivers work for| Client
  Project -->|assigns through ProjectAssignment| Employee
```

## Reading

PerformanceReview assesses an Employee and names an Employee as reviewer. Project delivers work for Client. Its supporting ProjectAssignment connects it to Employee. Employee has one home, shared across capabilities. ProjectAssignment is inside Project, not a separate aggregate.

## Logical models

- [Employee](erd-employee.md)
- [PerformanceReview](erd-performance-review.md)
- [Client](erd-client.md)
- [Project and ProjectAssignment](erd-project.md)
