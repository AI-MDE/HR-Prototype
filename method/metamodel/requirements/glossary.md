---
type: concept-type
title: Glossary
description: The authoritative, plain-language definitions of the application's business terms.
icon: 📖
---

# Glossary

The Glossary defines the terms that carry business meaning in the application, so Specs, the user, and the agent use the same words for the same things. It is one file, `specs/requirements/glossary.md`, and is the Meta-model's explicit collection form: entries are terms, not separate concept files. Its rules and checks are in the [business-requirements](../../targets/requirements/business-requirements.md) Target.

## Entries

Alphabetical. Each entry has:

- **Term** — the canonical name, as used in Specs.
- **Definition** — the business meaning in plain language, not an implementation description.
- **Synonyms** — other names the business uses for the same thing, when there are any.
- **Not to be confused with** — near terms that mean something different, where confusion is likely.
- **Concept** — a link to the modeled concept when the term is one (an entity, role, capability, or use case). The entry then states the meaning in a sentence and links; the concept stays the source of detail.
