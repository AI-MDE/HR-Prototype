---
type: concept-type
title: Interaction Diagram
description: How the architecture's layers and components communicate, in order, for the main request path and each key scenario.
icon: 🔄
extends: diagram
---

# Interaction Diagram

Shows how the layers and components of the [architecture](architecture-diagram.md) communicate: who calls whom, by what means (a function call, HTTP, an event, a query), and in what order. One diagram follows the main request path through every layer (for a web application: the page, the API, the service, the repository, the database); further ones show the key scenarios that cross other boundaries, such as an integration or an asynchronous event. One per kind of communication, not one per operation.

## Owner and location

Architecture owns it. Place it in `specs/architecture/diagrams/interactions.md`.

## Content

- Participants: the architecture's layers and components, and the actors and external systems at its edges, named as in the architecture diagram.
- Messages in order, each with how it travels (call, request, event, query), including the failure or alternative paths that change the outcome.
- For a key scenario: the use case it illustrates, named so the link can be followed.

## Representation

A Mermaid `sequenceDiagram` in a Markdown fence. Use a `flowchart` when the communication is not message-ordered.

When to create and update it, and its checks, are in the [architecture](../../targets/design/architecture.md) Target.
