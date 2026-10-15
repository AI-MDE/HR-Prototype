# Test report — mde:build and mde:test

Result: **not passed**.

| Check | Result | Detail | Log |
|---|---|---|---|
| `mde:build` | passed | exit 0, 12.2s · built backend (app/dist, 4 files), frontend (app/frontend/dist, 93 files) | [build.log](logs/build.log) |
| `mde:test` | passed | exit 0, 19.6s · 5 of 5 tests passed (api) · 2 of 2 tests passed (browser) | [test.log](logs/test.log) |
| `diagrams-all` | partial | 14 of 15 required diagrams delivered (93%); to do: 1 physical data model |  |
| `design` | failed | 2 problems in the design |  |
| `features` | passed | 3 applications of 3 Features; no backend yet, so no promise is due |  |
| `reuse` | passed | no backend yet |  |
| `schema` | failed | 1 of 5 entities disagree (PerformanceReview: column `employee_id` is in the Storage View but not in the database; …) |  |
| `scenarios` | failed | 5 of 5 use cases have no scenario proving them; 7 of 7 business rules have no scenario |  |
| `use-cases` | passed | use cases and authorization agree |  |
| `requirements` | failed | 8 of 9 checks agree; short: Entity model |  |
| `architecture` | passed | 2 of 2 checks agree |  |
| `okf` | passed | 3 of 3 checks agree |  |
| `server-code` | partial | 0 of 6 checks agree; short: Slices and layers, Logging, Live slices, Stack conformance, No placeholders, Operation markers |  |
| `run-app` | passed | 3 of 3 checks agree |  |
| `dev-setup` | failed | 2 of 3 checks agree; short: Readiness logs |  |

A missing, skipped, or failed check is not a pass.
