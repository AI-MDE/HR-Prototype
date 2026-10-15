# API — built and tested

Everything the server realizes, from the Specs. **Built**: the code for it exists. **Tested**: passing scenarios prove it through the API (a requirement a passing test proves is built). **Exercised**: the share of the backend's code lines the tests ran.

| | Want | Have | % |
|---|---|---|---|
| Requirements built | 26 | 0 | 0% |
| Requirements tested | 26 | 0 | 0% |
| Backend code exercised | 80% of its lines | not measured | — |

Nothing is deferred: everything the Specs state is in scope.

| Requirements | Want | Tested | Built, not tested | Failing | Deferred | Missed |
|---|---|---|---|---|---|---|
| Use cases | 5 | 0 | 0 | 0 | 0 | 5 |
| Business rules | 7 | 0 | 0 | 0 | 0 | 7 |
| Entity operations | 11 | 0 | 0 | 0 | 0 | 11 |
| Features | 3 | 0 | 0 | 0 | 0 | 3 |

## Use cases

| Requirement | State | Proven by |
|---|---|---|
| Correct employee details | ❌ missed | — |
| Establish employee record | ❌ missed | — |
| Record performance discussion | ❌ missed | — |
| Assign employee to project | ❌ missed | — |
| Prepare client project | ❌ missed | — |

## Business rules

| Requirement | State | Proven by |
|---|---|---|
| Assignment commitment | ❌ missed | — |
| Client code uniqueness | ❌ missed | — |
| Employee number uniqueness | ❌ missed | — |
| Employment interval | ❌ missed | — |
| Project code uniqueness | ❌ missed | — |
| Project interval | ❌ missed | — |
| Review interval | ❌ missed | — |

## Entity operations

| Requirement | State | Proven by |
|---|---|---|
| Client · read | ❌ missed | — |
| Client · create | ❌ missed | — |
| Employee · read | ❌ missed | — |
| Employee · create | ❌ missed | — |
| Employee · update | ❌ missed | — |
| PerformanceReview · read | ❌ missed | — |
| PerformanceReview · create | ❌ missed | — |
| ProjectAssignment · read | ❌ missed | — |
| ProjectAssignment · create | ❌ missed | — |
| Project · read | ❌ missed | — |
| Project · create | ❌ missed | — |

## Features

| Requirement | State | Proven by |
|---|---|---|
| foreign-key-indexes | ❌ missed | — |
| standard-errors | ❌ missed | — |
| storage-naming | ❌ missed | — |

## Code exercised by the tests

Not measured yet: no instrumented run of the backend left a coverage summary under `evidence/coverage/raw/`.
