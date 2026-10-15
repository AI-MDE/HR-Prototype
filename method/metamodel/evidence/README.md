# Evidence

The Evidence area (`evidence/`) shows what the application is: the result of building it, testing it, measuring coverage, checking it against its design (`mde verify`), and the judgment of a second agent that audited it. A reviewer reads one page, the [Evidence Package](evidence-package.md), instead of reading the code; everything else in the folder is the detail that page links to.

Evidence is distinct from Work and from the product's own documents: open [Findings](../work/finding.md) are kept in Work, and the user, administrator, and operations guides ([Documentation](../documentation.md)) in the App area's `docs/` folder. The Evidence Package links to both.

## Layout

```
evidence/
  README.md              the Evidence Package: verdict, provenance, every item, open findings
  package.json           the same package as data (written with it; the Workbench's dashboard reads it)
  checks/<check>.md      one report per conformance check of `mde verify`: design, terms, scenarios, use-cases, schema, reuse
  tests/<suite>.md       one Test Report per suite (api, e2e), and mde-test.md for the mde:build and mde:test run
  tests/screenshots/<suite>/…   the screenshots a suite's report shows
  tests/logs/            the latest run's logs
  tests/raw/<suite>.json the latest run's raw results per suite (Cucumber, Playwright or Vitest JSON), and build.json: what the build produced
  coverage/api.md        Coverage of the API: built and tested, requirement by requirement, and the backend code exercised
  coverage/pages.md      Coverage of the pages: built and tested, page by page, and the frontend code exercised
  built/inventory.json   what is built, as the application reports it from its own code: where each requirement is built, and its page inventory
  coverage/raw/<run>/    each instrumented run's coverage tool output, and its run.json
  audit/<target>.md      the second agent's Audit Report for each Target audited
  audit/architecture.md  the Architecture Audit
```

- [Evidence Package](evidence-package.md) — `evidence/README.md` (and `package.json`).
- [Test Report](test-report.md) — `evidence/tests/<suite>.md`: each suite's results, scenario by scenario, with logs and screenshots.
- [Coverage](coverage.md) — `evidence/coverage/api.md` and `pages.md`: for the API and for the pages, is each requirement built, and is it tested: tested, built but not tested, deferred to a later slice, or missed.
- [Audit Report](audit-report.md) — `evidence/audit/<target>.md`: a second agent's verdict on each Audit concern of a Target, with its witness.
- [Architecture Audit](architecture-audit.md) — `evidence/audit/architecture.md`: each architecture decision, resolved, traceable, and consistent; the code's conformance is in the server's and the web UI's reports.

**Reports and raw output.** People read the Markdown reports; the raw output of tools (logs, coverage files, runner JSON) is what reports are built from and link to, kept under `logs/` and `raw/`. Each run replaces its own logs and raw output, so nothing from an earlier run or an abandoned attempt accumulates beside the current one.

Only the Evidence Package records when it was produced and from which commit; the details it links to carry no provenance of their own.
