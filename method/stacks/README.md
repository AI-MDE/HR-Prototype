# Stacks

This folder contains reusable technology-stack presets that initiatives may select and resolve into Specs.

Stacks are implementation defaults, not architecture rules. Architecture remains technology-independent under [`architecture/`](../architecture/README.md).

## Selection

Record the selected preset, its concrete choices, and its Targets in scope in the application's Specs, following the [architecture Target](../features/architecture/resolve-selections-into-specs.md). For example, a selection of `web-default` resolves to its language, runtime, backend, API style, database, frontend, and build tools, with any application-specific overrides made explicit.

A preset identifier alone is a starting selection. Resolved Specs govern subsequent work; runtime configuration belongs in App. The root `mde.json` remains a locator. Later edits to this catalog do not automatically change an application's selected stack.

## Available presets

- `mde-runtime.yaml` — a prototype on the MDE runtime: the entity specs run against JSON data, no backend code or database; optional React pages calling the runtime's API. The [Prototyping Strategy](../strategy/prototype.md)'s stack; the build later selects one of the full stacks below, and the prototype's pages carry over to it.
- `web-default.yaml` — TypeScript, Node.js, Express, REST/JSON, PostgreSQL, React, Vite.
- `web-pug.yaml` — TypeScript, Node.js, Express, REST/JSON, PostgreSQL, Pug.
- `cloudflare.yaml` — TypeScript-oriented Cloudflare deployment using Workers-compatible services.
- `nest-carbon.yaml` — TypeScript, Node.js, NestJS, REST/JSON, PostgreSQL, React with IBM Carbon Design System.

Each preset ends with `targets:`, the [Targets](../targets/README.md) in scope for an application on that stack. The application records them with its resolved stack and may drop what it does not use (for example `web-ui` for a service with no interface); each stage chooses from them.

A stack may come with a UI profile, a short page the UI Targets defer to for component behavior and visual tokens: [Carbon](carbon-ui.md) for `ui: carbon`.

Keep this catalog small. Add a preset only when it represents a recurring project starting point.