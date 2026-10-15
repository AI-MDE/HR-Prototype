---
type: architecture
---

# Testing Architecture

## Tests required for changes

Every change that adds or modifies a use case, business rule, external contract, or other durable behavior must be accompanied by executable tests covering that behavior.

## Tests by responsibility and risk

Choose test style according to responsibility and risk rather than forcing every behavior through one technique.

Typical layers include:
- domain/unit tests for business behavior;
- integration tests for persistence and infrastructure boundaries;
- contract tests for external behavior;
- UI tests for critical user interactions;
- end-to-end tests for important cross-layer journeys.

The selected testing frameworks and tools belong to project configuration.

## Persistence integration testing

Persistence behavior that depends on constraints, schema evolution, transactions, locking, or query semantics should be tested against the real persistence technology or a sufficiently faithful environment.

## Behavioral specifications and traceability

Behavioral tests must trace to the use cases, business rules, or acceptance criteria they verify using semantic identifiers or specification paths. Requirements coverage is assessed against the requirements inventory; untested requirements are visible gaps.

The test language, runner, and reporting tools are selected in project configuration. Projects choosing Gherkin and Cucumber follow the [Gherkin traceability](../features/testing/gherkin-traceability.md) Feature.

## UI operation coverage

Business operations required by interactive use cases should be reachable through the intended UI when the product requires a UI path. This is a coverage property, not a requirement that every application operation have a UI control.

## Coverage and evidence

Apply coverage obligations and thresholds from the applicable Strategy, project governance, or explicit project overrides — there is no universal default percentage; determine the appropriate rigor from the Goal, risk, and governance in effect. A passing percentage does not by itself establish behavioral completeness.

When coverage is required, preserve machine-readable and human-readable reports in a documented location. Preserve test results and requirement traceability for applicable checks. UI screenshots and other diagnostic evidence should be captured where required by the selected profile or project, or where they materially help verify behavior.

Report checks that could not run as unavailable or incomplete; do not present missing evidence as a pass.
