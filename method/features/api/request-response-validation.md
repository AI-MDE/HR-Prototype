---
type: feature
kind: build
id: request-response-validation
title: Request/response validation
origin: mde
impacts:
  - api
default: n/a
---

# Request/response validation

## Purpose

Validation failures are deterministic and testable — the same input always fails the same way.

## Applicability

Applies to exposed API operations and their contracts. Resolve protocols, error conventions and implementation techniques through the selected Architecture and API Design.

## External Standards

External standards are background references, not a declaration of compliance.

- **OpenAPI** — https://spec.openapis.org/oas/v3.2.0.html
  - API-OAS-02 (Request parameters and bodies)
- **OWASP ASVS** — https://owasp.org/www-project-application-security-verification-standard/
  - SEC-ASVS-05 (Input validation)

## Impact on api

- Validation happens at the API boundary ([server](../server/boundary-validation.md)) and is deterministic: the same input always fails the same way.

## Audit

- Are validation failures deterministic, with an API test covering one?
