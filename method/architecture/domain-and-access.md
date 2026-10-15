---
type: architecture
---

# Domain, Application Behavior, and Access Control

## Domain and application behavior

### Business operations

Business behavior should be expressed through meaningful domain or application operations rather than spread unpredictably through transport, presentation, persistence, or event-handler code.

Business rules should be enforced in the authoritative application/domain path, not only in presentation layers.

### Transaction boundaries

A business operation that must succeed or fail atomically runs in one transaction, where the chosen persistence technology supports it: a use case that writes more than once, or across repositories, commits all of its writes or none.

- The service or use-case layer owns the transaction. Repositories accept the caller's transaction or connection (through the [request context](overview.md#13-cross-cutting-concerns)) rather than each opening its own or auto-committing per call, so the boundary is the business operation, not the individual query. Read-only use cases need none.
- A failure part-way rolls back the whole unit; no partial commit is left behind.
- Transactions are never opened in routes, controllers, or presentation code, and never held open across user think-time.

### Concurrency

Use an explicit concurrency strategy for mutable state when lost updates matter. Concurrency conflicts should produce a recognizable application outcome rather than silently overwriting another change.

The concrete concurrency mechanism is a project decision.

## Identity and access control

### Identity context

When identity is required, the acting principal is one identity context object: the acting user's id, roles, tenant, and any scope attributes the operations need. It is built once at the inbound boundary from the authenticated session or token and passed down through services and repositories as part of the [request context](overview.md#13-cross-cutting-concerns): never read from process globals, re-decoded from a token deeper in the stack, or rebuilt by individual features. Repositories receive the scope values they filter on, sourced from it.

This is not authentication (how a user proves who they are); it is the in-process representation of who is acting.

### Authentication

When authentication is required, resolve the identity source, session or token lifecycle, credential handling, recovery, and logout within the selected security architecture, reusing an external identity provider or a suitable runtime mechanism where chosen.

- Establish the authenticated context at the trusted boundary. Reject invalid and expired credentials, and distinguish unauthenticated from unauthorized access. Never disclose secrets in error messages.
- If local credentials are chosen, hash passwords appropriately and provision accounts in a controlled way. Store only the credential and session data the mechanism needs; external authentication does not imply local password storage.
- Logout and expiry invalidate access according to the mechanism. The UI provides login, logout, and unauthenticated states that fit it; a redirect to an identity provider can replace a local login form.

### Authorization enforcement

Authorization is enforced on the authoritative application boundary: every exposed operation enforces its permissions there. Hiding or disabling controls in the UI is a usability measure, not a security boundary; the UI reflects the permitted actions without being their only implementation.

Use one shared access-enforcement mechanism, so permission logic is applied consistently at every entry point. It consumes the identity context rather than building its own identity. Internal calls preserve the actor's context and never silently bypass the policy. Requirements own who may perform which operation; Architecture and Design choose how it is enforced.

### Business authorization

When authorization depends on business state or relationships, model it as durable business/application knowledge and enforce it through the same authoritative operation path as the business action.

### Development and test access

Any development/test-only identity bypass must be explicit, isolated from production, and modeled as intentional behavior when it materially affects how the application is exercised. It is configured separately, visibly limited, and disabled in production, and that is tested.

## Conformance checks

- Does each multi-write use case run in one transaction owned by the service or use-case layer, with repositories taking part rather than opening their own? Does a failure part-way roll back the whole unit (a failure-path test shows it), with no transaction opened in routes or held across user think-time?
- Is there one identity context, built at the boundary and passed through the layers, never read from globals or re-derived? Does the access enforcer consume it?
- Does the authentication mechanism establish real identity, reject invalid and expired access, and behave as specified on expiry and logout? Are locally held secrets protected, or the external identity contract correctly integrated?
- Are permitted and forbidden operations verified for the relevant roles and contexts, including direct API and internal calls? Do UI access states agree with the enforced decisions?
- If a development bypass exists, is production activation prevented, and tested?
