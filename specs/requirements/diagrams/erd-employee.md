---
type: logical-data-model-diagram
title: Employee logical data model
---

# Employee logical data model

```mermaid
erDiagram
  Employee {
    uuid id PK
    string employeeNumber
    string fullName
    string email
    string jobTitle
    date startDate
    date endDate
  }
  Employee ||..o{ PerformanceReview : "is assessed in"
  Employee ||..o{ ProjectAssignment : "participates through"
```

## Reading

Employee is primary. It can be assessed in many reviews and participate in many assignments. External PerformanceReview belongs to its own aggregate; external ProjectAssignment belongs to Project.
