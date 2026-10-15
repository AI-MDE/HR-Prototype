# Schema — entities, Storage Views, and the database

Each entity's attributes against its Storage View, and its Storage View against the real database. Database: checked against the configured database.

| Entity | Table | Result |
|---|---|---|
| [Client](../../specs/requirements/capabilities/project-assignments/client/client.md) | `clients` | ✅ agrees |
| [Employee](../../specs/requirements/capabilities/employee-records/employee/employee.md) | `employees` | ✅ agrees |
| [PerformanceReview](../../specs/requirements/capabilities/performance-management/performance-review/performance-review.md) | `performance_reviews` | ❌ column `employee_id` is in the Storage View but not in the database; column `assessed_employee_id` is in the database but not in the Storage View; column `reviewer_id` is in the database but not in the Storage View |
| [ProjectAssignment](../../specs/requirements/capabilities/project-assignments/project/project-assignment.md) | `project_assignments` | ✅ agrees |
| [Project](../../specs/requirements/capabilities/project-assignments/project/project.md) | `projects` | ✅ agrees |
