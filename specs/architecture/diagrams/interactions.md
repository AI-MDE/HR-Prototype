---
type: interaction-diagram
title: Assignment request interaction
---

# Assignment request interaction

```mermaid
sequenceDiagram
  actor Coordinator
  participant UI as React pages
  participant API as NestJS controllers
  participant Service as Capability service
  participant Repo as PostgreSQL repository
  participant DB as PostgreSQL
  Coordinator->>UI: Confirm assignment proposal
  UI->>API: HTTP POST assignment
  API->>API: Validate input and demo-session grant
  alt Input invalid or operation denied
    API-->>UI: Typed refusal
  else Request admitted
    API->>Service: Create assignment
    Service->>Repo: Begin transaction and lock Employee
    Repo->>DB: BEGIN, row lock and read references and commitments
    DB-->>Repo: Current employee, project and assignments
    Repo-->>Service: Current business context
    Service->>Service: Evaluate assignment rule
    alt Rule satisfied
      Service->>Repo: Insert assignment and commit
      Repo->>DB: INSERT and COMMIT
      DB-->>Repo: Persisted assignment
      Repo-->>Service: Assignment
      Service-->>API: Created assignment
      API-->>UI: 201 with persisted record
      UI-->>Coordinator: Open Project profile with new assignment
    else Missing reference or rule refused or storage failure
      Service->>Repo: Roll back
      Repo->>DB: ROLLBACK
      Service-->>API: Typed failure
      API-->>UI: Mapped error without internals
      UI-->>Coordinator: Preserve proposal and show reason
    end
  end
```

## Reading

Realizes [Assign employee to project](../../requirements/capabilities/project-assignments/use-cases/assign-employee-to-project.md). Other reads traverse the same API/service/repository boundary without a mutation. Employee updates share the employee lock before validating existing commitments.
