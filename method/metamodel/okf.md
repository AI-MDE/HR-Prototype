# OKF Profile

## Purpose

The `/specs` knowledge base must be maintained in conformance with the Open Knowledge Format (OKF) model adopted by this repository.

This file defines the repository-level compliance rules. The other files in `method/metamodel/` define the concrete concept types, folder structure, and expected anatomy used to apply those rules. How MDE extends OKF (models, type definitions, `extends`, directory semantics) is the contract in [README.md](README.md#how-mde-extends-okf); these rules apply to knowledge under `/specs`.

## Compliance rules

1. Represent durable knowledge as explicit typed concepts rather than as undifferentiated documents.
2. Give independently meaningful modeled concepts independent semantic identity.
3. Use semantic identifiers and names; do not invent sequential identifiers such as `UC-001` unless required by an external system.
4. Represent relationships between concepts explicitly rather than relying on prose location or file co-location to imply them.
5. Keep concept type, identity, meaning, and relationships stable when reorganizing files.
6. Store each independently meaningful modeled object in its own file unless the meta-model explicitly defines a collection form.
7. Use the folder structure in `folder-catalog.json` and the concept types defined in this model.
8. Do not create new concept types casually. First determine whether the knowledge is an instance, relationship, property, or specialization of an existing concept.
9. If a concept is required but is not part of the adopted OKF model, identify it explicitly as an **extension** in the meta-model before using it throughout `/specs`.
10. Do not redefine an OKF concept locally with incompatible semantics. Extend it explicitly when additional project semantics are required.

## Editing rule

Before creating or editing anything under `/specs`, an agent must identify the knowledge type being changed and apply the corresponding meta-model definition.

If the correct representation is unclear, preserve the knowledge without inventing a competing structure and raise the ambiguity for resolution.

## Verification

`mde verify` proves what a script can, per output, each on the Target that writes those Specs (the *OKF compliance* rows of business-requirements, architecture, and application-design): every concept file's front matter names a concept type this model defines (a `type: concept-type` file, by its name; a folder's `README.md` names the folder's type), `index.md` and `log.md` follow §9.3, no sequential identifiers, and every relative link resolves. The rest is the audit's.

OKF compliance includes checking that:

- specification objects use recognized concept types;
- independently meaningful objects have stable semantic identities;
- files are placed according to the meta-model;
- relationships are explicit and resolvable;
- no duplicate competing representation of the same concept has been introduced;
- extensions are declared as extensions;
- no specification structure silently contradicts the adopted OKF profile;
- files conform to the frontmatter rules in §9 (every non-reserved `.md` file has a parseable frontmatter block with a non-empty, correctly-cased `type`; reserved filenames follow the §9.3 structure when present);
- recommended fields (§9.4) are populated where the information is readily available, even though their absence alone does not make a file non-conformant;
- for each capability, whether a workflow, more than one differentiated role, or a cross-entity/derived business rule was actually considered — and either represented as its own concept file or explicitly noted in the capability as not applicable to this business (the modeling-complexity check). A capability with only single-entity, single-role, single-field-validation content and no note that broader complexity was considered and ruled out should be treated as unverified, not assumed complete.

## §9 Frontmatter

This repository's profile is an application of the Open Knowledge Format (OKF v0.1,
`https://okf.md/spec/`). §9.1–§9.3 restate that upstream specification's required and
reserved-file rules; §9.4 adds the recommended fields upstream OKF defines but leaves
optional, which this repository asks concept files to populate; §9.5 states this
repository's additional, stricter conventions layered on top of the permissive upstream
spec (these do not contradict OKF — OKF allows a profile to add stricter conventions,
provided unknown/absent fields are still tolerated by consumers).

### §9.1 Concept files

Every Markdown file under `/specs`, other than `index.md` and `log.md` (see §9.3), is a concept file and must open with a YAML frontmatter block:

```markdown
---
type: <concept-type>
---
```

Per upstream OKF: "OKF requires exactly one thing of every concept: a `type` field."

### §9.2 Type value

The frontmatter `type` field must be present and non-empty. Use the concept type that the file represents, as defined in this model, in lowercase-kebab-case, e.g. `domain`, `diagram`, `capability`, `entity`, `use-case`, `workflow`, `business-rule`, `role`, `page`, `api-contract`, `integration`, `architecture`. Declare project-specific types as extensions per the editing rule above rather than inventing untyped files.

Upstream OKF treats `type` as "a short string identifying the concept's type" without mandating a casing convention; the lowercase-kebab-case requirement is this repository's own stricter convention (see §9.5).

### §9.3 index.md and log.md

`index.md` and `log.md` are OKF's reserved filenames. They are structural, not concepts, and are exempt from §9.1/§9.2:

- `index.md` must not carry a populated frontmatter block (an empty `---\n---` block is permitted). Per upstream OKF, an `index.md` "lists the directory's contents for progressive disclosure" — one or more headed sections grouping concepts, with entries that should include the linked concept's `description`. It may appear in any directory; producers may generate it, and consumers may synthesize one on the fly when absent.
- `log.md` must not carry a frontmatter block at all. Per upstream OKF, a `log.md` "may appear at any level of the hierarchy to record the change history at that scope": a flat list of prose entries grouped by date, most recent first, with date headings in ISO 8601 `YYYY-MM-DD` format.
- Neither file is required to exist. Their absence does not make a directory non-conformant.

### §9.4 Recommended fields

Upstream OKF recommends these additional frontmatter fields on concept files, in priority order. They are optional — a concept file lacking them is still conformant — but should be populated when the information is readily known, since other tooling (index generation, search, previews) is defined against them:

- `title` — human-readable name; if omitted, consumers may derive one from the filename.
- `description` — a single sentence summarizing the concept; used by `index.md` entries, search snippets, and previews.
- `tags` — a YAML list of short strings for cross-cutting categorization.
- `timestamp` — ISO 8601 datetime of the last significant change to the concept.
- `resource` — a URI uniquely identifying the asset the concept describes, when the concept describes a concrete asset rather than an abstract idea; normally absent for business/design concepts in this repository.

Example:

```markdown
---
type: role
title: Consultant Administrator
description: Maintains staff, client, project, and assignment records for the application.
tags: [business, role]
---
```

### §9.5 This repository's additional conventions

For concepts authored using the [MDEX Markdown DSL](../markdown-dsl.md), `title` is required in addition to `type`, together with the DSL document and section contract. The optional-title rule in §9.4 describes base OKF conformance; it does not waive the stricter DSL contract. Runtime-facing JSON concepts follow their JSON authoring contracts instead. Reserved `index.md` and `log.md` files remain structural and are not DSL concept documents.

These go beyond what upstream OKF requires, and exist to keep `/specs` navigable across many concept files in one repository. They must not be treated as loosening or overriding the upstream rules above:

- `type` values must be lowercase-kebab-case and defined in this model (§9.2).
- One independently meaningful modeled object per file (see the Compliance rules above), rather than upstream OKF's silence on file granularity.
