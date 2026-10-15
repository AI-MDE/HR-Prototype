# MDEX Markdown DSL

## Purpose

The MDEX Markdown DSL makes business and design specifications both human-readable and deterministically addressable by tools.

Markdown remains the source format. The DSL standardizes how concept identity, semantic sections, relationships, structured values, and executable examples are represented. It does not introduce an intermediate application model.

## Document Contract

Every concept document authored in this DSL has the following stricter contract, in addition to the base [OKF profile](metamodel/okf.md). Base OKF permits an omitted title; MDEX DSL concepts require one. Reserved structural files (`index.md`, `log.md`) are outside this document contract. A runtime that derives its own representation (e.g. JSON) from an authored document at load time is a rendering concern of that runtime, not a second authored format — see `metamodel/requirements/README.md`'s Entity section.

Every DSL concept document has:

1. YAML frontmatter identifying the concept.
2. One level-1 heading containing the human title.
3. Semantic level-2 sections defined by the concept type.
4. Ordinary Markdown inside sections.
5. Relative Markdown links for relationships to other concepts.

Example:

```markdown
---
type: entity
title: Employee
description: A person employed by the organization.
tags: [employee-management]
---

# Employee

## Purpose
...

## Attributes
...

## Relationships
...

## Operations
...

## Rules
...
```

## Core Syntax

### Identity

YAML frontmatter is the machine-readable document envelope.

Required:

- `type` — concept type.
- `title` — human-readable concept name.

Optional common properties:

- `description`
- `tags`

The file path is the durable repository address. Do not require numeric concept IDs.

### Work provenance

Evidence status such as `inferred`, `confirmed`, or `observed`, decision provenance,
and unresolved authoring questions belong in `work/`, not in concept documents.
Do not encode them as concept properties, table columns, section headings, inline
annotations, or Notes. Do not add links or reminders in concepts, including Notes,
that point to this work tracking. Work records may link to the affected concept
and section; the reference goes from Work to Specs.

Business lifecycle states and substantive business sources (such as a governing
policy) remain application knowledge. They are distinct from the evidence status
of the authoring work.

### Sections

A level-2 heading (`##`) identifies a semantic part of the concept.

Section names are part of the DSL vocabulary. Tools should match canonical section names case-insensitively and may support declared aliases, but should not infer unrelated headings.

Level-3 and deeper headings structure content within a semantic section.

### Structured Values

Use standard Markdown constructs rather than custom syntax:

- tables for records/attribute definitions;
- lists for collections;
- ordered lists for flows;
- fenced code blocks for executable or illustrative code;
- Mermaid fences for diagrams;
- links for semantic references.

### Relationships

A relative Markdown link is a semantic reference when it appears in a relationship-bearing section.

Example:

```markdown
- [Department](department.md) — optional organizational department.
- [Allocation Cap](../rules/allocation-cap.md)
```

Tools resolve the path; the link label is presentation text.

### Executable Blocks

Executable prototypes use fenced code blocks with a language identifier:

````markdown
```javascript
export function evaluate(context) {
  return { valid: true };
}
```
````

Executable code augments the specification; it does not replace the authoritative business statement.

## Concept Grammars

The meta-model is the source of truth for each concept type's sections. This document does not repeat them.

Each concept type is defined under a `## <Concept Name>` heading in a meta-model file ([requirements.md](metamodel/requirements/README.md), [design.md](metamodel/design/README.md)). Its grammar is the bullet list that follows the `Recommended outline:` line under that heading:

```markdown
## Business Rule

Recommended outline:
- Statement (required)
- Applies To (required)
- Constraint / Result (required)
- Exceptions
```

- The concept type is the heading in lowercase-kebab-case (`Business Rule` → `business-rule`), matching the frontmatter `type`.
- Each bullet is a canonical section name. Text after the name — a parenthetical or a comma clause — is explanation, not part of the name.
- `(required)` marks the required minimum for that type.
- Outline order is the recommended section order.

Tools, including the shared Markdown DSL library (the MDE tools' `src/markdown-dsl`), must read grammars from these outlines rather than keep their own copy. To add or change a concept's sections, edit its meta-model outline.

## Addressing

Tools may address a semantic part using:

```text
<document-path>#<canonical-section>
```

Examples:

```text
specs/requirements/capabilities/staffing/employee/employee.md#Attributes
specs/requirements/use-cases/assign-employee-to-project.md#Flow
specs/requirements/rules/allocation-cap.md#Standalone-Prototype
```

This is a logical DSL address, not a requirement to modify Markdown link syntax.

## Reader Behavior

A conforming reader should be able to:

1. Parse frontmatter.
2. Identify the concept type and title.
3. Split the document into canonical semantic sections.
4. Return a named section without interpreting unrelated prose.
5. Extract Markdown links and resolve repository-relative references.
6. Extract tables, lists, and fenced blocks within a section.
7. Validate required sections for the concept type.
8. Preserve unknown sections rather than discard them.
9. Report missing, duplicate, or ambiguous canonical sections.
10. Avoid inventing semantic content that is absent.

## Writer Behavior

A conforming writer should:

1. Preserve frontmatter and unknown sections unless intentionally changed.
2. Use canonical section headings.
3. Put business meaning in requirements and realization meaning in design.
4. Use links rather than duplicating another concept's semantics.
5. Keep generated/tooling representations subordinate to Markdown.
6. Make the smallest semantic change necessary.

## Extensibility

The DSL is intentionally open.

New concept types may define their own canonical and required sections. New optional sections may be added without invalidating existing readers. Readers must preserve unknown sections.

The framework meta-model is the registry of concept types and their section grammars.

## Design Principle

The DSL should remain readable as normal Markdown without MDEX tooling.

```text
Human-readable Markdown
        +
Small structural conventions
        =
MDEX Markdown DSL
```

The goal is deterministic navigation and validation, not a second programming language.
