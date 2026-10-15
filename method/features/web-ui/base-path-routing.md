---
type: feature
kind: build
id: base-path-routing
title: Base-path routing — one model for dev and Apache deploy
origin: mde
impacts:
  - run-app
default: n/a
---

# Base-path routing — one model for dev and Apache deploy

## Purpose

Every web + API surface must run under a **configurable base-path folder** (e.g. `/<app>/`,
`/<app>/api/`), not assume it owns the server root. The **same** model is used in local dev (where
the workbench is a single-port reverse proxy: `localhost:8081/<app>/`) and in production (where
Apache reverse-proxies the same folders). One model — dev mirrors prod — so a base-path bug shows up
locally, not only after deploy. The base path comes from configuration (`.env` / build var), with a
sensible default, never hardcoded.

This pairs with the **app-start contract** (the `mde:start` script + `/__mde/health` round-trip): the
proxy detects/starts/routes an app behind its folder using that contract.

## Applicability

Applies to relevant pages and UI interactions. Respect the selected UI architecture/profile; presentation guidance is advisory unless explicitly adopted as a requirement.

## Impact on run-app

Every web and API surface runs under a configurable base-path folder (for example `/<app>/` and `/<app>/api/`), never assuming it owns the server root. The same model is used in development (behind the Workbench's reverse proxy) and in production (behind the production reverse proxy), so a base-path bug shows up locally.

- The web application derives the base path from configuration and applies it wherever a URL is formed: the bundler's base (assets), the router's basename (client routes), and the API base.
- The API base is same-origin and folder-relative (`<base>/api/…`), never an absolute host such as `http://localhost:3001`: a cross-origin call works only in a standalone tab, breaks as soon as the application is framed or proxied, and forces CORS.
- Bundler environment variables live where the bundler reads them (its root or env directory). A required base never falls back silently to an empty string, which would turn the API base into a root-relative path hitting the proxy instead of the application.
- The API mounts under a configurable path prefix, with cookies, CORS, and redirects path-aware. It does not rely on CORS to work; where cross-origin access is genuinely needed, the allow-list comes from configuration, never a literal naming only the standalone development port.

## Rationale

**Why a hardcoded allow-list is a portability smell.** A same-origin request needs no CORS at
all, so a single-origin allow-list naming only the standalone dev port signals the frontend is
calling cross-origin — which works in dev and breaks under the framed/proxied origin. The
allow-list is not the defect; it is the symptom of a frontend bypassing the proxy.

## Verify

- `base-from-config` Does the API base come from configuration, with no hard-coded `/api` path and no fixed CORS origin in source (`mde verify`, Base path row)?

## Audit

- Do the web application and API run under a configurable base path, with a same-origin, folder-relative API base, no silent empty fallback, and no hard-coded CORS origin, working the same behind the development proxy and in production?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on web-ui

The web app derives its base path from config and applies it everywhere a URL is formed:
- the bundler base (e.g. Vite `base`), so assets load from `/<app>/…` not `/…`;
- the router `basename`, so client routes resolve under the folder;
- the API base URL, so calls go to `/<app>/api/…`.
A web app built this way works unchanged on a dev port behind the workbench proxy and under Apache —
nothing hardcodes root. The same build is portable across both.

**The API base must be SAME-ORIGIN and folder-relative — never a hardcoded host.**
The frontend calls its API at the base-path-prefixed **relative** path (`<base>/api/…`,
e.g. `/<app>/api/employee-records`), so the call goes to the app's *own* origin and the
reverse proxy (workbench in dev, Apache in prod) routes `/<app>/api/*` to the API tier. Do
**not** call an absolute cross-origin URL like `http://localhost:3001/api/…`: it only works
when the page is served from that exact origin (a standalone tab), breaks the moment the app
is framed/proxied at a different origin, and forces CORS. Same-origin needs no CORS at all.
Derive the API base from the same base-path config as assets/routes (bundler base / injected
base var), with a sensible default of the current origin + base — never a literal host:port.

**Bundler env must live where the bundler reads it.** Env the bundler injects (e.g. Vite's
`VITE_*`) is loaded from the **bundler's `root`/`envDir`**, not wherever a `.env` happens to
sit. A var placed in a directory the bundler does not scan is silently undefined, and a
`const base = import.meta.env.VITE_X || ''` fallback then changes behavior invisibly (an empty
API base becomes a root-relative `/api` that hits the *proxy* origin, not the app). Place the
bundler's env in its env dir, and do not paper over a missing required base with a silent
empty-string fallback.

### Impact on api

The API mounts under a **path prefix** (e.g. `/<app>/api`), read from config — not rooted at `/`.
Cookies/CORS/redirects are path-aware so they work behind the folder. The API is reachable at its
prefix both on its dev port (via the proxy) and under Apache.

The frontend calls the API **same-origin** through the proxy (see web-ui), so the API does
**not** rely on CORS for the app to function. Do not hardcode a single-origin allow-list (e.g.
only the standalone dev port); where cross-origin is genuinely needed, the allow-list is
config-driven, not a literal that only matches the standalone case.
