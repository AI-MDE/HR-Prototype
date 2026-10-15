---
type: feature
kind: optional
id: standard-errors
name: Standard Errors
description: "Every refusal says why with a fixed code (invalid input, not allowed, not found, changed by someone else, duplicate, or a business rule) and never shows internals."
scope: [application]
appliedIn: [design]
aliases: [errors.standard]
---

# Standard Errors

Every refusal says why with a fixed code (invalid input, not allowed, not found, changed by someone else, duplicate, or a business rule) and never shows internals.

## Meaning

Refusals map to fixed codes: invalid input 400, unauthenticated 401, forbidden 403, not found 404, stale version 409 conflict, duplicate 409, business rule 422 naming the rule; no stack trace or SQL reaches the client.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:standard-errors/<promise>`.

- `fixed-codes` Each kind of refusal has its fixed status and code.
- `rule-named` A business-rule refusal names the rule.
- `no-internals` No refusal shows internals (stack, SQL).
