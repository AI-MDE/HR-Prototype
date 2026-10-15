# HR-Prototype

A local, fictional HR prototype using NestJS, PostgreSQL, React and Carbon.

From the project root, run `npm run mde:install`, then `npm run mde:start`. On first use, configuration creates a root `.env` from `.env.example` with a generated private database password. Existing settings are preserved. Docker Desktop must be running for the default database mode. Startup creates the configured database if absent, applies versioned SQL migrations, loads fictional data without replacing existing records, builds if necessary, and serves the UI and API together. No SQL setup is required.

The local address uses `HOST`, `WEB_PORT` and `BASE_PATH` from `.env`. Choose one of three demo roles on the welcome screen. This is a fictional-data demonstration, not production authentication. The server refuses non-loopback binding.

## Operations

- `npm run mde:install`: install the exact locked dependencies and Chromium for browser checks.
- `npm run mde:build`: typecheck and build backend and frontend.
- `npm run mde:start`: restart this application's process, migrate, seed and start; refuse unrelated port occupants.
- `npm run mde:health`: check the application and database.
- `npm run mde:stop`: stop the owned application process; retain the database and its data.
- `npm run mde:test`: run API/database, runtime and browser scenarios.
- `npm --prefix app run db:create`, `migrate`, `seed`: individual database operations.
- `npm --prefix app run db:reset`: explicit destructive demo reset; requires `HRPROTO_RESET_CONFIRM` equal to `DB_NAME`, the application stopped, and project-owned Docker mode. Ordinary start never resets data.

All records in `data/seed.json` are fictional. The seed uses stable UUIDs and inserts missing records only. No passwords or operational HR data belong in this dataset.

`app/logs/server.log` holds server output; `app/logs/run.json` records the owned process. Verification logs live in `evidence/tests/logs`. Unit/API and browser raw results are emitted by their test runners. The runtime tests briefly restart the application and use a separate disposable database; run them when a demo walkthrough is not in progress.

## Configuration

The root `.env.example` lists all settings. `WEB_PORT` and `API_PORT` match because one process serves both. `BASE_PATH` ends in `/`; `API_BASE` sits inside it. `SERVER_SOURCE=api` selects the real backend. `DB_MODE=docker` uses the named, workspace-labeled container and persistent volume; use `DB_MODE=external` only with an explicitly configured PostgreSQL server and credentials able to create the named database. Changing ports or paths requires rebuilding the frontend. Database passwords stay on the server.

The Method currently links named Checks through Cucumber-shaped results only. `scripts/test.mjs` executes both real suites, captures their output, and translates the current startup assertion and full-suite/log outcome into `evidence/checks/runtime-scenarios.json` for `tests/runtime.feature`. Missing, stale or failed results cannot pass this bridge; native Vitest and Playwright reports remain authoritative.
