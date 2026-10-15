---
type: feature
kind: build
id: apache-folder-deploy
title: Apache folder deployment (reverse-proxy, not ports)
origin: mde
impacts:
  - deployment
default: off
---

# Apache folder deployment (reverse-proxy, not ports)

## Purpose

When `apache-folder` is explicitly selected, the app is served by **Apache under URL folders** (`https://host/<app>/`,
`https://host/<app>/api/`, `https://host/workbench/`) via **reverse proxy** — **not** by exposing raw
ports to users. Multiple apps live under one host as different folders, with no port juggling. This is
the production half of the one base-path model (the dev half is the workbench acting as the local
proxy); the routing is **identical** in both, so dev mirrors prod.

Each surface internally still listens on a port; Apache maps the public folder to that internal port.
The app/workbench must support the base path (see the `base-path-routing` capability) so assets and
routes resolve under the folder.

## Applicability

Applies when this deployment mechanism or operational concern is selected for the application. Resolve environment and tool choices in Architecture and Technology Specs.

## Impact on deployment

The application is served under URL folders behind a reverse proxy (`https://host/<app>/`, `https://host/<app>/api/`), never by exposing its ports: several applications share one host as folders, and only the proxy's 80 and 443 are public. The deployment produces the proxy configuration mapping each public folder to its surface's internal port, for example with Apache:

```apache
ProxyPass        /<app>/api/  http://127.0.0.1:API_PORT/<app>/api/
ProxyPassReverse /<app>/api/  http://127.0.0.1:API_PORT/<app>/api/
ProxyPass        /<app>/      http://127.0.0.1:WEB_PORT/<app>/
ProxyPassReverse /<app>/      http://127.0.0.1:WEB_PORT/<app>/
```

Ports come from the application's configuration, the same values development uses, and the folders match the base paths the application is built for ([serving under a base path](../web-ui/base-path-routing.md)): the same model as development, never a separate deploy-only scheme.

## Audit

- When reverse-proxy folders are selected: is the proxy configuration produced and committed, mapping each folder to its configured port, with only the proxy public and the folders matching the application's base paths?
