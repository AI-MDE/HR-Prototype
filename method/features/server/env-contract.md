---
type: feature
kind: build
id: env-contract
title: Application configuration contract
origin: mde
impacts:
  - dev-setup
default: n/a
---

# Application configuration contract

## Purpose

Make application configuration explicit, discoverable and appropriate to the selected runtime.

## Applicability

Applies to relevant application implementation and runtime contracts. Follow the selected stack and Architecture; examples do not mandate a framework, folder layout or unsupported tool.

## Impact on dev-setup

- Required values, defaults, secret sources, and validation are recorded in the technology Specs. Environment variables, configuration files, or managed configuration are all valid; `.env` is an option, not a universal production requirement. Use the databases and services actually selected.
- Bind addresses, ports, and external URLs come from configuration; missing required configuration is reported clearly.
- **Every port is set in one place: the `.env` at the project root**, next to `mde.json`, with `.env.example` committed listing each one with its default (`.env` itself is not committed). That covers each port the application listens on or connects to (`WEB_PORT` for the pages' server, `API_PORT` for the API, the database's, in `DB_PORT` or its connection URL) and the Workbench's own (`MDE_WORKBENCH_PORT`). Source, scripts, and tool configuration (a Vite config, a proxy target, a container file, `package.json`'s `"mde": { "url" }`, which may say `http://localhost:${WEB_PORT}`) read these and never hard-code a port, and an address one tier uses to reach another is built from them (a proxy target `http://localhost:${API_PORT}`). A tier in its own folder loads the project-root `.env` (a Vite app sets `envDir` to it), not a `.env` of its own. A server whose port is busy fails with that error; it never moves to another port (a Vite app sets `strictPort`), so the address the Workbench opens is the one the server runs on. In production the same names come from whatever configuration the deployment provides.
- **Where the pages get their data is set in `.env` too, spelled out:** `SERVER_SOURCE=api` (the application's own backend) or `SERVER_SOURCE=runtime` (the MDE runtime, for a prototype only), and `API_BASE` (the backend's path prefix, such as `/api`, proxied to `API_PORT`). The frontend reads its data only through its one data-access module ([configured data sources](../prototyping/data-source-switch.md)): with `api`, through `API_BASE`; with `runtime`, at `MDE_RUNTIME_URL` for the application `MDE_PROJECT`, which the Workbench sets when it starts the pages, so they are not written in `.env`. Once the application has its own backend, `SERVER_SOURCE` is `api`, and no frontend code calls the MDE runtime (`/data/…`, `/model`, the Workbench's port): `mde verify` fails the Server source row otherwise.
- Secrets never appear in source, browser payloads, or logs. The browser receives only browser-safe configuration; privileged credentials stay on the server.

## Verify

- `env-declares-source` Does `.env` declare `SERVER_SOURCE` and `API_BASE`, and, with the application's own backend, is `SERVER_SOURCE` `api` with no frontend code calling the MDE runtime (`mde verify`, Server source row)?
- `config-declared` Is every `.env` key listed in `.env.example`, `.env` not tracked by git, and no port or secret written in source, scripts, or tool configuration (`mde verify`, Configuration row)?

## Audit

- Are required configuration values documented and validated, and are secrets kept out of source, browser payloads, and logs?
- Is every port, and every address between tiers, set in the project-root `.env` and listed in `.env.example`, with no port hard-coded in source, scripts, or tool configuration?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on api

Resolve bind addresses, ports and external URLs through configured values; report missing required configuration clearly. Do not expose secrets.

### Impact on web-ui

Expose only browser-safe configuration and resolve API/base paths consistently with deployment. Keep privileged credentials server-side.
