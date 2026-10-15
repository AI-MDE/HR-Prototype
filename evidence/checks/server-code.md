# Server — what a script can prove about the code

Slices and layers, logging, live requests, the stack, placeholders, and operation markers. Whether the code is right (thin routes, logic in services, correct validation) is the audit's.

| Check | Status | Result |
|---|---|---|
| [Slices and layers](#slices-and-layers) | ➖ missing | no backend source yet |
| [Logging](#logging) | ➖ missing | no backend source yet |
| [Live slices](#live-slices) | ➖ missing | no backend source yet |
| [Stack conformance](#stack-conformance) | ➖ missing | no backend source yet |
| [No placeholders](#no-placeholders) | ➖ missing | no backend source yet |
| [Operation markers](#operation-markers) | ➖ missing | no backend source yet |

## Slices and layers

<a id="slices-and-layers"></a>Each capability has its own source folder, and data access is only in the data layer, never in a route.

no backend source yet

## Logging

<a id="logging"></a>One shared logger, no console output elsewhere, and request lines carrying correlationId and principalId.

no backend source yet

## Live slices

<a id="live-slices"></a>The API suite's captured server log shows the requests its scenarios made, each with a correlation id.

no backend source yet

## Stack conformance

<a id="stack-conformance"></a>The application's dependencies are the declared stack's.

no backend source yet

## No placeholders

<a id="no-placeholders"></a>No TODO, FIXME, or "not implemented" is left in shipped source.

no backend source yet

## Operation markers

<a id="operation-markers"></a>With traceability on, every entity operation is marked at its route, service, and repository.

no backend source yet
