---
type: architecture
---

# API and External Interface Architecture

## Capability-aligned boundary

External interfaces should expose meaningful application/business operations and data at stable boundaries. Avoid leaking persistence mechanics or arbitrary internal structure directly into public contracts.

The protocol and implementation technology are project choices.

## Contracts

Every externally consumed operation must have a clear contract for request/input, response/output, validation, authorization, and failure behavior. Application-specific contracts belong under the application's design specifications.

## Boundary validation

Validate untrusted input at system boundaries. Validate or structurally guarantee output where doing so protects external contracts or prevents silent contract drift.

## Business-rule outcomes

Business-rule rejection is a normal domain/application outcome and should be distinguishable from infrastructure failures and malformed requests. Return useful, stable error information that allows callers to respond correctly.

## Protocol discipline

Use the selected protocol's success, failure, and status semantics consistently. Error responses should follow a consistent application-wide shape appropriate to that protocol.
