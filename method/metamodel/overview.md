# Specification Meta-Model

## Purpose

The meta-model gives different AI agents a shared grammar for persistent application knowledge without prescribing their internal reasoning process.

## Primary knowledge areas

- **Business** — what the business means, needs, allows, constrains, and expects.
- **Architecture** — durable engineering decisions, constraints, boundaries, principles, and technology choices that shape implementation across features.
- **Design** — application-specific realization of business requirements within the architecture.

## General conventions

1. One modeled object per file when the concept has an independent identity and lifecycle.
2. Use semantic lowercase-kebab-case filenames.
3. Do not invent numeric or sequential identifiers such as `UC-001` or `ENT-023` unless an external system requires them.
4. A modeled object's semantic filename is its default identifier.
5. Reference other modeled objects by semantic identifier or repository-relative path.
6. Preserve existing knowledge structure when updating it.
7. Omit irrelevant outline sections rather than filling them artificially.
8. Add new concept types only when existing types cannot naturally represent durable knowledge.
9. Relationships between concepts should be expressed explicitly, not by combining several independently meaningful concepts into one file.
10. Detailed implementation facts belong in code unless another developer or AI needs them to correctly understand, modify, extend, or verify the application.


## Ownership and customization

The Meta-model is shipped as part of the canonical MDE Method, but each application receives its
own complete Method copy during `mde init`.

The application therefore owns the Meta-model that governs its Specs. It may extend or modify
concept definitions, relationships, constraints, and conventions when its domain requires it.
Those changes are version-controlled with the application rather than hidden inside the central
MDE installation.

The central MDE Method remains the standard starting point for newly initialized applications.
Upgrading the MDE product must not silently replace an existing application's Meta-model.
