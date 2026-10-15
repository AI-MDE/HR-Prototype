---
type: feature
kind: build
id: status-code-discipline
title: Status code discipline
origin: mde
impacts:
  - api
default: n/a
---

# Status code discipline

## Purpose

Status codes are intentional and consistent — happy path, validation failure, business-rule
failure, and not-found/conflict each return the right code.

## Applicability

Applies to exposed API operations and their contracts. Resolve protocols, error conventions and implementation techniques through the selected Architecture and API Design.

## External Standards

External standards are background references, not a declaration of compliance.

- **OpenAPI** — https://spec.openapis.org/oas/v3.2.0.html
  - API-OAS-04 (Status codes and errors)

## Impact on api

- Status codes are intentional and consistent across endpoints: happy path, validation failure, business-rule failure, not found, and conflict each return their own.

## Audit

- Are status codes consistent, with API tests for the happy, validation-failure, rule-failure, and not-found or conflict paths?
