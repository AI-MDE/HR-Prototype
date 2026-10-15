---
type: concept-type
title: Domain
description: The overall business domain, purpose, boundaries, and capability decomposition served by an application.
icon: 🌐
---

# Domain

Domain represents the overall business domain served by the application: its purpose, scope and boundaries, and areas of responsibility. Its rules and checks are in the [business-requirements](../../targets/requirements/business-requirements.md) Target.

## Location

One per application: `specs/requirements/domain.md`.

## Structure

- Purpose
- Scope / Boundaries
- Capability Map
- Glossary, when useful
- Features (application-level [optional Features](../feature.md), such as `inbox` or `annotations`, from the [catalog](../../optional-features/index.md); the retired `## Aspects` section is not read)
- Inputs, when the user gave any: the files the requirements are drawn from (briefs, notes, spreadsheets, screenshots), kept as given in `specs/requirements/inputs/` and listed here with links. Read them before writing the requirements; they are source material, not Specs, and a requirement taken from one traces to it.
- Industry patterns: each industry pattern and variant from the [Industry Patterns](https://github.com/AI-MDE/Industry-Patterns) catalog that informed the model, the common concepts taken from its subjects, what was added beyond them, and what was left out (or that none matched)
