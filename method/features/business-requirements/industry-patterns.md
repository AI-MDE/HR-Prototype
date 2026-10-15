---
type: feature
kind: build
id: industry-patterns
title: Industry patterns
origin: mde
impacts:
  - business-requirements
  - prototype
---

# Industry patterns

## Purpose

Elicit requirements from what is already known about the business and its industry. The [MDE Industry Patterns](https://github.com/AI-MDE/Industry-Patterns) catalog has two parts:

- **A canonical model of common business models**, organized by **subject** (`model/subjects/`): areas of reusable knowledge such as Parties and Roles, Agreements and Entitlements, Requests, Quotes, and Orders, Billing and Payments, Workforce, Scheduling and Reservations. Each subject holds ABEs, each ABE its entities. A concept has one page: its common definition and attributes, the names it is known by in industries (*Also known as*), and how each industry refines it (*In industries*). It carries only what recurs across businesses.
- **Industry patterns** (`industry-patterns/`, indexed by `catalog.md`): manufacturing, professional services, health care, insurance, crane rental, equipment service, travel, … Each selects concepts from the subjects and gives its roles, lifecycles, events, baseline rules, the questions worth asking, the mistakes to avoid, in Simple, Standard, and Enterprise variants, and the **concepts applications typically add**: what that kind of business needs that the common model does not carry. Modeling patterns (`modeling-patterns/`) give recurring structures across industries (case, approval, assignment, scheduling, data migration).

A model proposed from them starts closer to what the business needs, and asks the questions that matter. The catalog's own instructions for using it are in its `AGENTS.md` (*Using the catalog*).

## Impact on business-requirements

- When eliciting the requirements of a new domain or capability, consult the catalog before proposing the model: read its `catalog.md`, then the industry pattern (or patterns) closest to the business (a field-service business, equipment service; a crane or equipment rental business, crane rental orchestration; a firm selling its people's time, professional services). Choose the variant the Goal needs: Simple for a focused application or a prototype, Standard for normal operation, Enterprise only when the business asks for its scale. With no industry pattern close, start from the subjects themselves.
- Take the common concepts the pattern selects from their subject pages, and nothing because the pattern has it: the concepts and relationships the business confirms, their lifecycles and states, the pattern's baseline rules as candidate business rules, its roles. Use a page's *Also known as* and *In industries* to recognize the concept under the business's name, not to copy every industry's attributes. A subject usually becomes one or more of the application's capabilities; the concepts it takes with the ones that serve them become [ABEs](../../metamodel/requirements/abe.md), and the pattern's variants the ABEs' `## Levels`. Each becomes the application's own concept, named in the business's words: the catalog informs the meaning, never the vocabulary (the business's "job" stays a Job, not the catalog's "Work Order").
- Add what the business needs and the common model does not carry: the pattern's *concepts applications typically add* are the usual candidates, defined in the application's own Specs, each specializing the canonical concept the pattern names. A relationship the catalog marks `review` is an open question to decide for the application, not a given.
- Use the pattern's modeling questions to find the policy the business has not stated, and add them to the Questions with the default the pattern suggests ([Questions](../../metamodel/work/questions.md)). Check the model against the pattern's anti-patterns.
- Record what informed the model in the Domain's `## Industry patterns` section ([Domain](../../metamodel/requirements/domain.md)): each pattern and variant used, what was taken from it, and what was deliberately left out. When no pattern matches, say so there.
- When the catalog cannot be reached (no network, no access), say so to the user, record it in the Domain, and elicit without it.

## Impact on prototype

- The first step's conceptual model is proposed from the matching pattern's Simple variant and the common concepts it selects, so the user corrects a plausible model rather than building one from nothing; what the prototype leaves out stays listed in the Domain for later.

## Audit

- Was the catalog consulted for the domain, and is the pattern and variant used (or that none matched, or that it could not be reached) recorded in the Domain's `## Industry patterns`?
- Is every concept taken from the catalog one the business needs, named in the business's own words, and is what the business needs beyond the common model added in the application's Specs rather than missing?
- Are the pattern's modeling questions that the requirements do not answer open Questions, each with a default?
