# UI and tests — use cases and rules proven by scenarios

Pages are generated from the requirements by the UI conventions, so the UI is checked by what users can do: every use case is proven by a test scenario tagged with the use case (`@<use-case>`), or by a scenario for each operation it invokes (`@<entity>.<operation>`).

**Not proven.** 5 of 5 use cases have no scenario proving them; 7 of 7 business rules have no scenario.

| Use case | Tag | Proven by |
|---|---|---|
| [Correct employee details](../../specs/requirements/capabilities/employee-records/use-cases/correct-employee-details.md) | `@correct-employee-details` | ❌ missing `@employee.update` |
| [Establish employee record](../../specs/requirements/capabilities/employee-records/use-cases/establish-employee-record.md) | `@establish-employee-record` | ❌ missing `@employee.create` |
| [Record performance discussion](../../specs/requirements/capabilities/performance-management/use-cases/record-performance-discussion.md) | `@record-performance-discussion` | ❌ missing `@performance-review.create` |
| [Assign employee to project](../../specs/requirements/capabilities/project-assignments/use-cases/assign-employee-to-project.md) | `@assign-employee-to-project` | ❌ missing `@project-assignment.create` |
| [Prepare client project](../../specs/requirements/capabilities/project-assignments/use-cases/prepare-client-project.md) | `@prepare-client-project` | ❌ missing `@client.create`, `@project.create` |

## Not proven

- **Correct employee details**: tag a scenario `@correct-employee-details`, or one for each of `@employee.update`.
- **Establish employee record**: tag a scenario `@establish-employee-record`, or one for each of `@employee.create`.
- **Record performance discussion**: tag a scenario `@record-performance-discussion`, or one for each of `@performance-review.create`.
- **Assign employee to project**: tag a scenario `@assign-employee-to-project`, or one for each of `@project-assignment.create`.
- **Prepare client project**: tag a scenario `@prepare-client-project`, or one for each of `@client.create`, `@project.create`.

## Business rules

Each Business Rule of the requirements is proven by scenarios tagged with its id (`@rule:<id>`): one where it holds, and one where it is broken and refused, the refusal naming the rule.

| Rule | Where | Proven by |
|---|---|---|
| [Assignment commitment](../../specs/requirements/rules/assignment-commitment.md) | its own file | ❌ tag its scenarios `@rule:assignment-commitment` |
| [Client code uniqueness](../../specs/requirements/capabilities/project-assignments/client/client.md) | Client's Rules | ❌ tag its scenarios `@rule:client-code-uniqueness` |
| [Employee number uniqueness](../../specs/requirements/capabilities/employee-records/employee/employee.md) | Employee's Rules | ❌ tag its scenarios `@rule:employee-number-uniqueness` |
| [Employment interval](../../specs/requirements/capabilities/employee-records/employee/employee.md) | Employee's Rules | ❌ tag its scenarios `@rule:employment-interval` |
| [Project code uniqueness](../../specs/requirements/capabilities/project-assignments/project/project.md) | Project's Rules | ❌ tag its scenarios `@rule:project-code-uniqueness` |
| [Project interval](../../specs/requirements/capabilities/project-assignments/project/project.md) | Project's Rules | ❌ tag its scenarios `@rule:project-interval` |
| [Review interval](../../specs/requirements/capabilities/performance-management/performance-review/performance-review.md) | PerformanceReview's Rules | ❌ tag its scenarios `@rule:review-interval` |
