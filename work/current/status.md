---
type: status
---

# Status

## Stage

Full-stack prototype completed and running; ready for the user's review of the Goal.

## Approved

- 2026-10-14: User said mde proceed at the full-stack checkpoint, approving architecture, 14-route page set and design together and authorizing the build. At approval business-requirements was completed with passing loop checks, but no post-completion verified stamp or audit; run-app was not started.

- 2026-10-14: User selected Prototype and retained nest-carbon.
- 2026-10-14: `mde proceed` accepted the proposed Prototype Targets and conceptual draft. At approval, no Target was completed, verified since completion or audited; targeted verification was Partial solely because no Target was started. Recorded business-requirements and run-app, leaving other formal stack Targets out. This is progression from the recorded state, not a retroactive verification pass or waiver.

## Progress

- Implemented the approved 14 routes with React, Carbon and Vite, backed by a NestJS API and PostgreSQL. All five use cases were exercised in the browser: establish employee, correct details, record performance discussion, prepare client project and assign employee.
- Added versioned SQL migrations, connected fictional seed records, generated role grants enforced by server-side demo sessions, and employee-row locking for allocation and employment updates. Duplicate identifiers, invalid dates, missing records and unauthorized operations return explicit errors.
- Root runtime commands delegate to App. Startup creates a missing database, migrates, seeds without overwriting existing data, starts the application, logs health and restarts only its own recorded process. An unrelated occupied port is refused without killing it. The Docker database persists across application restarts.
- Preserved the workspace's updated HR-Prototype name. Existing root Workbench and web ports were retained; the API port/base were aligned with the approved single-server architecture. The app is running at http://127.0.0.1:5173/hrproto/.
- Upgraded the test runner after its dependency audit reported advisories; the subsequent npm install audit reported zero vulnerabilities. Fixed Carbon font paths so fonts are bundled locally.

## Verification

- Dependencies installed through mde:install; Playwright Chromium installed. Build typechecked both tiers and produced backend and frontend assets.
- First startup created the absent default PostgreSQL database. The executable runtime test additionally starts from a separate absent database, verifies seeded records and health, restarts the application, verifies a changed owned PID and unchanged seed count, and checks unrelated-port refusal. It removes only its disposable database and restores the normal running application.
- Latest `mde verify --current` on 2026-10-15: **Passed**, exit 0. Both build parts passed; all four run-app evidence rows and six named Checks passed.
- Five API/runtime tests passed, including persisted CRUD workflows, concurrent allocation, inclusive boundaries, invalid employment changes, error/access behavior, migration/index checks and startup. Two browser tests passed, visiting all 14 routes and completing all five workflows, with refusal/input retention, forbidden routes and mobile width checked. Test-created records are removed by the suites.
- Inspected desktop overview, project profile and mobile screenshots in evidence/tests/screenshots. No clipping or horizontal overflow in the inspected views.
- Initial targeted verification was Partial because the Method only associates named Check scenarios through Cucumber results. Added `app/scripts/test.mjs`, which executes the actual Vitest and Playwright suites and derives `evidence/checks/runtime-scenarios.json` strictly from current executable results and captured logs. It refuses missing/stale/failed results. Rerunning current verification then passed; no Check was weakened or waived.
- `git diff --check` passed. Root .env, dependencies, generated build folders and process logs are ignored by Git. No credential was committed.
- business-requirements and run-app are completed for this Prototype Goal. No full Evidence Package or audit was requested/performed; post-completion verified/audited stamps remain absent. Only the verification tool generated its diagnostic reports; the agent did not edit Evidence Package files.

## Limitations

This is a loopback-only demonstration with fictional data and a role selector, not production identity authentication. Payroll, leave, recruiting, billing, review approvals/scoring, deletion/cancellation, audit history, manager-specific record access and concurrent-edit conflict UI remain outside the accepted slice. Assignment and employment invariants are nevertheless protected by database transactions. Upstream Carbon Sass emits deprecation warnings, but compilation succeeds.

## Next

The user can review the running prototype and judge whether the Goal is achieved. Keep it running for that review; make requested corrections in their owning Specs and App, and verify again. Do not infer acceptance of the finished Goal or introduce release/deployment work.

## Method update ? 2026-10-15

Method 0.3.115 -> 0.3.120 installed with `mde update-app`: 24 upstream files updated, two added; no merge conflicts or saved upstream copies. Tool commit: e35637a. No application-specific Method edits needed merging.

- 0.3.116: runtime-only data-source changes do not apply to this approved full-stack implementation. The frontend calls its own API and configuration already declares SERVER_SOURCE=api.
- 0.3.117: retained the full-stack prototype because the user explicitly approved the NestJS/React/Carbon/PostgreSQL build checkpoint, beyond merely retaining a stack. No backend removal or runtime migration is required.
- 0.3.118: new formal UI-design coverage, role Critical Success Factors and dashboards conflict with the previously approved Target selection and dashboard exclusion. Recorded an open Question and requested the user's decision; Goal and Target selection remain unchanged pending that decision.
- 0.3.119: all five entity Specs now declare display labels matching the existing application: employee number/name, client code/name, project code/name, review period dates, assignment responsibility/start date. Review periods identify discussions within their employee context; no technical identifiers are used as labels. No schema or application change needed.
- 0.3.120: existing use cases are grandfathered. They were not changed in this update; use the enhanced form when next editing them.

Verification: `mde verify --current` and `mde verify --target business-requirements` both Passed. All 11 requirements rows and nine named Checks passed. Specs-only verification skipped builds/tests as designed; the application code was unchanged. Completed the separate entity-Feature update scope without rewriting earlier completion history. No full Evidence Package or audit was produced.

Method reconciled to 0.3.120, with the 0.3.118 Target expansion explicitly pending the open Question in questions.md. This records review of every entry, not completion of the pending scope decision. Prior application work remains uncommitted; the update tool committed only its Method changes.
