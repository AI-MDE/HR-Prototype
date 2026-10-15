# Requirements — what a script can prove

Structure, references, and completeness of the requirement Specs. Whether their content is right (a specific rule, a coherent capability, a complete transaction) is the audit's.

| Check | Status | Result |
|---|---|---|
| [Entity placement](#entity-placement) | ✅ passed | 5 entities placed |
| [Entity model](#entity-model) | ✅ passed | 5 entities well formed |
| [Requirement links](#requirement-links) | ✅ passed | 78 links resolve |
| [Use case references](#use-case-references) | ✅ passed | 5 use cases reference real roles and operations |
| [Operations used](#operations-used) | ✅ passed | 6 of 6 operations invoked by a use case |
| [Roles](#roles) | ✅ passed | 3 roles, each an actor |
| [Business rules](#business-rules) | ✅ passed | 7 rules, each id once |
| [Capabilities](#capabilities) | ✅ passed | 3 capabilities with their overview |
| [Domain](#domain) | ✅ passed | Purpose and Scope written |

## Entity placement

<a id="entity-placement"></a>Every entity is in an ABE folder under its capability, each ABE has its Primary Entity, and entity names are unique.

No problems.

## Entity model

<a id="entity-model"></a>Each entity has typed attributes and a key, its relationships as the table linking real entities, and transitions between its declared states, held by an enum attribute.

No problems.

## Requirement links

<a id="requirement-links"></a>Every link inside the requirements resolves.

No problems.

## Use case references

<a id="use-case-references"></a>Every use case names roles that exist as its actors, and invokes operations its entities declare.

No problems.

## Operations used

<a id="operations-used"></a>Every operation that changes something is invoked by some use case.

No problems.

## Roles

<a id="roles"></a>Roles are kept at the top level, each the actor of some use case.

No problems.

## Business rules

<a id="business-rules"></a>Each rule of its own file is linked from an entity it governs, and each rule id is used once.

No problems.

## Capabilities

<a id="capabilities"></a>Each capability's overview lists its ABEs, its own first, and links its workflows.

No problems.

## Domain

<a id="domain"></a>The Domain's Purpose and Scope are written.

No problems.
