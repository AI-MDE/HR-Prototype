---
type: use-case-diagram
title: HR-Prototype use cases
---

# HR-Prototype use cases

```mermaid
flowchart LR
  hr_administrator["HR Administrator"]
  people_manager["People Manager"]
  project_coordinator["Project Coordinator"]
  subgraph employee_records["Employee Records"]
    establish_employee_record(["Establish employee record"])
    correct_employee_details(["Correct employee details"])
  end
  subgraph performance_management["Performance Management"]
    record_performance_discussion(["Record performance discussion"])
  end
  subgraph project_assignments["Project Assignments"]
    prepare_client_project(["Prepare client project"])
    assign_employee_to_project(["Assign employee to project"])
  end
  hr_administrator --> establish_employee_record
  hr_administrator --> correct_employee_details
  people_manager --> record_performance_discussion
  project_coordinator --> prepare_client_project
  project_coordinator --> assign_employee_to_project
```

## Reading

Rectangles are business roles; rounded nodes are goals. HR establishes and corrects employee records. Managers record performance discussions. Coordinators prepare projects and assign employees.
