---
type: navigation-diagram
title: HR-Prototype navigation
---

# HR-Prototype navigation

```mermaid
flowchart LR
  hr([HR Administrator]) --> home
  manager([People Manager]) --> home
  coordinator([Project Coordinator]) --> home
  home["Home"]
  click home "../page-set.md#home"
  employees["Employees"]
  click employees "../page-set.md#employees"
  employee["Employee profile"]
  click employee "../page-set.md#employee"
  reviews["Performance reviews"]
  click reviews "../page-set.md#reviews"
  review["Performance review"]
  click review "../page-set.md#review"
  clients["Clients"]
  click clients "../page-set.md#clients"
  client["Client profile"]
  click client "../page-set.md#client"
  projects["Projects"]
  click projects "../page-set.md#projects"
  project["Project profile"]
  click project "../page-set.md#project"
  establish["Establish employee record"]
  click establish "../page-set.md#establish"
  correct["Correct employee details"]
  click correct "../page-set.md#correct"
  discuss["Record performance discussion"]
  click discuss "../page-set.md#discuss"
  prepare["Prepare client project"]
  click prepare "../page-set.md#prepare"
  assign["Assign employee to project"]
  click assign "../page-set.md#assign"
  home -->|Browse employees| employees
  home -->|Browse reviews| reviews
  home -->|Browse clients| clients
  home -->|Browse projects| projects
  employees -->|Open employee| employee
  reviews -->|Open review| review
  clients -->|Open client| client
  projects -->|Open project| project
  client -->|Open related project| project
  project -->|Open client| client
  project -->|Open assigned employee| employee
  employee -->|Open permitted review| review
  employee -->|Open permitted project| project
  review -->|Open assessed employee or reviewer| employee
  home -->|Establish employee| establish
  home -->|Correct details| correct
  home -->|Record discussion| discuss
  home -->|Prepare project| prepare
  home -->|Assign employee| assign
  employee -->|Correct details| correct
  employee -->|Record discussion| discuss
  project -->|Assign employee| assign
  establish -->|Created or existing record| employee
  correct -->|Updated record| employee
  discuss -->|Recorded discussion| review
  prepare -->|Created or existing project| project
  assign -->|Assignment recorded| project
```

## Reading

The shared Home renders each role's launchers. Links appear only when authorized; arrows between related records do not grant access. The [page set](../page-set.md) owns every node. Forms return to their origin on cancellation and stay on the form on refusal. A shared Home link is available from every page.
