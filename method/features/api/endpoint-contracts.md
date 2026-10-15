---
type: feature
kind: build
id: endpoint-contracts
title: Endpoint contracts
origin: mde
impacts:
  - api
default: n/a
---

# Endpoint contracts

## Purpose

Request and response contracts are explicit and testable — not implicit shapes.

## Applicability

Applies to exposed API operations and their contracts. Resolve protocols, error conventions and implementation techniques through the selected Architecture and API Design.

## External Standards

External standards are background references, not a declaration of compliance.

- **OpenAPI** — https://spec.openapis.org/oas/v3.2.0.html
  - API-OAS-01 (Paths and operations)
  - API-OAS-02 (Request parameters and bodies)
  - API-OAS-03 (Response schemas)
  - API-OAS-05 (Authentication/security schemes)

## Impact on api

- Request and response contracts are explicit per endpoint. Authentication and authorization requirements are explicit when in scope, enforced by the shared access enforcer.

## Audit

- Are request and response contracts explicit per endpoint, without leaking persistence details?
