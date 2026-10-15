Feature: Runnable prototype verification
  The executable assertions live in api.test.ts and the full regression runner.
  The runner translates their current results for the Method's Cucumber-only Check reader.

  @feature:app-start-contract/one-command-start
  Scenario: Fresh database startup and safe restart
    Then the executable startup integration test proves database creation, seed, restart, health and unrelated-port refusal

  @feature:build-and-regression/test-log-present
  Scenario: Full regression output is captured
    Then both executable suites pass and the runner writes their current output and successful exit to test.log
