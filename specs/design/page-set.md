---
type: design
title: HR-Prototype page set
---

# HR-Prototype page set

## Prototype page set

All routes are relative to the configured base path. Home is one route with a landing view per role. Each form preserves input on refusal; cancellation returns to its origin without committing its final action. A Client explicitly registered during project preparation remains available. Menu and related links follow generated authorization.

<a id="home"></a>

### Home

`/` — Role-specific use-case launchers. Roles: All three roles. Links: [Employees](#employees) (browse employees), [Performance reviews](#reviews) (browse reviews), [Clients](#clients) (browse clients), [Projects](#projects) (browse projects), [Establish employee record](#establish) (establish employee), [Correct employee details](#correct) (correct details), [Record performance discussion](#discuss) (record discussion), [Prepare client project](#prepare) (prepare project), [Assign employee to project](#assign) (assign employee).

<a id="employees"></a>

### Employees

`/employees` — Employee list and selection. Roles: All three roles. Links: [Employee profile](#employee) (open employee).

<a id="employee"></a>

### Employee profile

`/employees/:id` — Employee detail; HR correction; permitted related records. Roles: All three roles. Links: [Performance review](#review) (open permitted review), [Project profile](#project) (open permitted project), [Correct employee details](#correct) (correct details), [Record performance discussion](#discuss) (record discussion).

<a id="reviews"></a>

### Performance reviews

`/performance-reviews` — Review list. Roles: People Manager. Links: [Performance review](#review) (open review).

<a id="review"></a>

### Performance review

`/performance-reviews/:id` — Review detail and assessed employee/reviewer links. Roles: People Manager. Links: [Employee profile](#employee) (open assessed employee or reviewer).

<a id="clients"></a>

### Clients

`/clients` — Client list. Roles: Project Coordinator. Links: [Client profile](#client) (open client).

<a id="client"></a>

### Client profile

`/clients/:id` — Client detail and related projects. Roles: Project Coordinator. Links: [Project profile](#project) (open related project).

<a id="projects"></a>

### Projects

`/projects` — Project list. Roles: Project Coordinator. Links: [Project profile](#project) (open project).

<a id="project"></a>

### Project profile

`/projects/:id` — Project detail with assignment panel and related client/employee links. Roles: Project Coordinator. Links: [Client profile](#client) (open client), [Employee profile](#employee) (open assigned employee), [Assign employee to project](#assign) (assign employee).

<a id="establish"></a>

### Establish employee record

`/establish-employee-record` — Employee entry, duplicate check, confirmation and result. Roles: HR Administrator. Links: [Employee profile](#employee) (created or existing record).

<a id="correct"></a>

### Correct employee details

`/correct-employee-details` — Select employee, edit, confirm and result. Roles: HR Administrator. Links: [Employee profile](#employee) (updated record).

<a id="discuss"></a>

### Record performance discussion

`/record-performance-discussion` — Select employees, read previous reviews, enter discussion, confirm and result. Roles: People Manager. Links: [Performance review](#review) (recorded discussion).

<a id="prepare"></a>

### Prepare client project

`/prepare-client-project` — Select/register client, enter project, confirm and result. Roles: Project Coordinator. Links: [Project profile](#project) (created or existing project).

<a id="assign"></a>

### Assign employee to project

`/assign-employee-to-project` — Select project/employee, inspect commitments, enter allocation, confirm and result. Roles: Project Coordinator. Links: [Project profile](#project) (assignment recorded).

## Source

[Requirements and use cases](../requirements/domain.md) define the business behavior; [authorization](authorization.json) supplies grants. [Navigation](diagrams/navigation.md) draws this page set.
