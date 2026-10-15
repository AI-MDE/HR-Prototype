---
type: feature
kind: build
id: openapi-contract
title: OpenAPI contract
origin: mde
impacts:
  - api
default: n/a
---

# OpenAPI contract

## Purpose

The API's request/response contracts (`endpoint-contracts`) exist as real code and route markers,
but nothing machine-readable describes them app-wide. A governed, generated `openapi.yaml` is that
single machine-readable contract — for client generation, documentation, and conformance testing —
derived from the real routes rather than hand-maintained prose that drifts from the code.

## Applicability

Applies to exposed API operations and their contracts. Resolve protocols, error conventions and implementation techniques through the selected Architecture and API Design.

## External Standards

External standards are background references, not a declaration of compliance.

- **OpenAPI** — https://spec.openapis.org/oas/v3.2.0.html
  - API-OAS-07 (Machine-readable OpenAPI artifact)
  - API-OAS-08 (Validate implementation against OpenAPI)
  - API-OAS-09 (Generate documentation/client/test support)
  - API-OAS-10 (Pin supported OpenAPI version)

## Impact on api

- `openapi.yaml` is generated from the real routes, never hand-written: each marked route contributes one operation, with path, method, parameters, request body, response schemas, status codes, and the security scheme when authentication is in scope. A hand-written document that is never regenerated drifts silently from the code, and it is the one consumers trust.
- Pin the OpenAPI version the document targets (for example `3.1.0`) once, in the generator's configuration.
- Validate the implementation against its own contract: a conformance test checks that real requests and responses match the generated schemas. A swagger page, a generated client, or contract-test scaffolding are optional extras.

## Rationale

**Why generate rather than author.** A hand-written `openapi.yaml` that is never regenerated
from the routes is exactly the drift this feature exists to prevent: the document and the code
diverge silently, and the document is the one consumers trust.

**Why the contract must be validated.** A contract nobody validates against is decorative — the
same failure mode `gherkin-traceability` bans for `.feature` files that never run. The schema
passes review, the implementation drifts from it, and nothing fails.

## Verify

- `openapi-generated` Is `openapi.yaml` generated from the real routes, with a pinned OpenAPI version, and is the implementation validated against it?
