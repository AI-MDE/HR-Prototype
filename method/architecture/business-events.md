---
type: architecture
---

# Business Event Recording

How accepted business events are recorded at runtime. Which facts are business events is decided in the requirements ([Business Event](../metamodel/requirements/business-event.md)); this topic decides how an occurrence is recorded.

## One shared recorder

Every producer records through one shared method, `recordBusinessEvent(transaction, event)`; none invents its own event tables, envelopes, ids, or conventions. The recorder:

- validates that the event type is declared and its data matches its contract version;
- assigns the occurrence id and adds source, subject, time, correlation, and causation;
- appends to the journal, **taking part in the same transaction as the business change**;
- returns the recorded identity, for evidence and correlation.

Like the access enforcer, it is generated from the declared events and names, at each branch, the declared event it serves, so a reviewer can see which are recorded. A declared event the recorder does not mention is not recorded, whatever the requirements say. One recorder keeps ids, subjects, timestamps, correlation, and causation consistent across producers, so the journal can be read as one record of what happened.

## The journal is immutable; delivery is separate

| Store | Holds | Mutable |
|---|---|---|
| Business event journal | what happened | never |
| Event delivery records | destination, attempts, status, error, acknowledgement | yes |

Publishing, retrying, acknowledging, or abandoning a delivery never modifies the recorded fact; one occurrence may have several delivery records. Never collapse delivery into a `published` flag on the event, which would let an operational concern rewrite history. The journal is not the source of truth for entity state: recording events does not imply event sourcing.

The journal is one logical append-only store; its physical form (table, collection, log) is the stack's choice. It records at least: occurrence id, event type, contract version, source, subject type and business key, occurrence and recording time, actor where relevant, correlation and causation ids, and the event data.

## Recording is required; delivery is not

An accepted business event must be recorded. It does not require a dispatcher, broker, listener, or notification; those are separate design choices per event, each with its own obligations, and an unchosen one creates none.

## Transactions

When an event is the result of a state-changing operation, the entity change and the event record must never disagree: commit both atomically, or use a mechanism that cannot lose a committed fact. When a change must lead to asynchronous publication, prefer the **transactional outbox**: the change and the outbox record commit in one local transaction, and a separate publisher delivers afterwards. Publishing after commit, outside the transaction, is an unsafe dual write: the commit succeeds, the publish fails, and the fact is lost with nothing to detect it.

## Evidence

The journal is the evidence that an event works: an occurrence appears in it with the expected subject and facts when its producing use case runs. A test that only checks an operation succeeded has not shown the event was recorded.

## Conformance checks

- Does one shared recorder exist, and does every producer of a declared event record through it rather than writing event rows or publishing directly?
- Does the recorder take part in the business transaction, so the entity change and the event record cannot disagree?
- Is the journal append-only, with delivery state stored separately: no update or delete of a recorded occurrence and no mutable delivery flag on it?
- Does the journal record the required fields?
- Is every declared event observed in the journal at least once when its producing use case runs?
