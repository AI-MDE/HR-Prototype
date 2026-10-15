# Observability and Request Identity

## Decision
Application requests and business transactions should carry sufficient identity and trace context for their activity to be followed from entry through completion.

Distinguish principal identity, correlation identity, and session identity when those concepts apply. They serve different purposes and should not be conflated.

## Principal Identity
When authentication exists, use a stable application identity for the acting principal rather than a display label. Authentication technology and identity-provider choices belong to project configuration.

## Correlation Identity
Traceable inbound requests or transactions should carry one correlation identity through the operation and its operational records, as part of the one [request context](overview.md#13-cross-cutting-concerns) established at the boundary. A correlation identity is not business-object identity.

## Logging
Use a consistent structured operational logging facility. Include relevant trace context, operation, outcome, duration, and safe diagnostics. Sensitive credentials and unnecessary sensitive business data must not be recorded in operational logs.

## Business Audit vs Operational Logging
Operational logs diagnose system behavior and do not replace business audit history. Business-significant operations that require durable accountability should record who performed them, what changed, and when.
