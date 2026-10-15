---
type: feature
kind: build
id: business-rule-responses
title: Business-rule responses
origin: mde
impacts:
  - api
default: n/a
---

# Business-rule responses

## Purpose

Business-rule failures return useful, intentional responses — not generic errors.

## Applicability

Applies to exposed API operations and their contracts. Resolve protocols, error conventions and implementation techniques through the selected Architecture and API Design.

## External Standards

External standards are background references, not a declaration of compliance.

- **OpenAPI** — https://spec.openapis.org/oas/v3.2.0.html
  - API-OAS-04 (Status codes and errors)

## Impact on api

- **A business-rule rejection identifies the rule it violated** in a structured field (for example `error.rule`): the rule's id ([Business Rule](../../metamodel/requirements/business-rule.md#identity): its name as an id when it is held in its entity's `## Rules`, else its file name), plus a readable reason. One rejection names exactly one rule. A bare status code or prose message cannot be asserted against; the structured field is what lets a test prove that the specific rule fired, not merely that something was refused.

- **Business rules**: for each rule, deliberately submit input that violates it. The application must reject it, and the bad state must not persist (read it back). A rule shown in the UI or the docs but never applied is decorative, not enforced.

## Rationale

**Why a structured field rather than a message.** A bare status code or free-text message alone
cannot be asserted against: the consumer — and the business-rule test — must be able to read
*which* rule fired from a stable field, not by string-matching prose that any wording change
breaks.

**What this buys the test suite.** It is what lets a business-rule test prove the *specific*
rule discriminates, rather than merely proving the endpoint refused something. A test asserting
only "returns 4xx" passes against an endpoint that rejects everything, including valid input.

## Verify

- `rule-identified` Do business-rule failures identify the violated rule in a structured field, with a test that asserts on that field?

## Audit

Judge whether business rules are **enforced**, not merely **displayed**. A rule shown as
helpful UI text or a doc paragraph, but that the app never actually applies, is the common
fake ("the UI says checks are ready" but proposes anyway; guidance text with no rejection).

For each business rule, drive the running app to **violate it deliberately** — submit the
disallowed input (a transfer that breaks the constraint, a review out of its window, a
duplicate, an out-of-order lifecycle step). The app must **reject** it: an error response /
blocked action / validation message, *and* the bad state must **not** persist (read back
after — it should not be there). Corroborate against the server log that the request
reached the server and was refused.

Report each rule as **enforced** (violation rejected + not persisted, server-corroborated)
or **decorative** (stated in text/spec but the violating input goes through). A rule you can
break is not enforced, however prominently it is described.
