---
type: feature
kind: build
id: thin-routes-fat-services
title: Thin routes, fat services
origin: mde
impacts:
  - server
default: n/a
---

# Thin routes, fat services

## Purpose

Keep business behavior in services/use-cases and data access in repositories — routes and UI
handlers stay thin.

## Applicability

Applies to relevant application implementation and runtime contracts. Follow the selected stack and Architecture; examples do not mandate a framework, folder layout or unsupported tool.

## Impact on server

- Routes and controllers stay thin. Business logic lives in services, use cases, or the domain, never in route bodies or UI handlers; data access lives in repositories or adapters, never in pages or route bodies.

## Audit

- Are routes thin, with logic in services and data access only in repositories?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on api

API routes delegate to services/use-cases; they do not embed business logic or direct
persistence.
