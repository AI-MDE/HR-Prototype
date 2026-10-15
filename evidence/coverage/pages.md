# Pages — built, and what they cover

Pages are not designed one by one: the application reports the pages it generated, in its page inventory (the `pages` of `evidence/built/inventory.json`), and what each covers. What the Specs want is that their entities, operations and use cases are on pages, and tested there. **Built**: the page's file exists and it reads the real API. **Tested**: a passing end-to-end scenario uses it, with a screenshot after each step. **Exercised**: the share of the frontend's code lines the tests ran.

| | Want | Have | % |
|---|---|---|---|
| Pages built (of those reported) | not reported | not reported | — |
| Entities on pages | 5 | not reported | — |
| Operations on pages | 11 | not reported | — |
| Use cases on pages | 5 | not reported | — |
| Pages tested | not reported | not reported | — |
| Operations tested through pages | 11 | 0 | 0% |
| Use cases walked in the browser | 5 | 0 | 0% |
| Frontend code exercised | 80% of its lines | not measured | — |

Nothing is deferred: everything the Specs state is in scope. The application does not report its pages yet: until it does, no page, entity, operation or use case can be shown on a page.

## Entities

| Entity | On a page | Pages |
|---|---|---|
| Client | ❌ | — |
| Employee | ❌ | — |
| PerformanceReview | ❌ | — |
| ProjectAssignment | ❌ | — |
| Project | ❌ | — |

## Operations

| Operation | On a page | Tested through a page |
|---|---|---|
| Client.read | ❌ | — |
| Client.create | ❌ | — |
| Employee.read | ❌ | — |
| Employee.create | ❌ | — |
| Employee.update | ❌ | — |
| PerformanceReview.read | ❌ | — |
| PerformanceReview.create | ❌ | — |
| ProjectAssignment.read | ❌ | — |
| ProjectAssignment.create | ❌ | — |
| Project.read | ❌ | — |
| Project.create | ❌ | — |

## Use cases

| Use case | On a page | Walked in the browser by |
|---|---|---|
| Correct employee details | ❌ | — |
| Establish employee record | ❌ | — |
| Record performance discussion | ❌ | — |
| Assign employee to project | ❌ | — |
| Prepare client project | ❌ | — |

## Browser tests

Browser tests outside the end-to-end scenarios (a Playwright suite); tagged with a use case (`@<use-case>`), one walks it.

- ✅ Every page opens and all five workflows are usable (no use-case tag)
- ✅ Refusal preserves input, role routes deny access, and mobile navigation fits (no use-case tag)

## Code exercised by the tests

Not measured yet: no instrumented run of the frontend left a coverage summary under `evidence/coverage/raw/`.
