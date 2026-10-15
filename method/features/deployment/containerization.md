---
type: feature
kind: build
id: containerization
title: Containerization (Docker)
origin: mde
impacts:
  - deployment
default: off
---

# Containerization (Docker)

## Purpose

When `container` is explicitly selected, the application builds into a **container image** by a committed, reproducible recipe — so it
runs the same way on any host, with no "works on my machine" drift.

## Applicability

Applies when this deployment mechanism or operational concern is selected for the application. Resolve environment and tool choices in Architecture and Technology Specs.

## Impact on deployment

A committed, reproducible recipe (for example a `Dockerfile` with `.dockerignore`) builds the image through the standard install and build, runs it with the standard start, exposes the documented ports, and takes configuration and secrets from the environment. Base images are pinned and dependencies declared. When the application needs a database, a multi-service local bring-up (for example `docker-compose.yml`) matches the documented install, migrate, seed, and start path.

## Audit

- When containers are selected: is the recipe committed and reproducible, built through the standard operations, with pinned bases and configuration from the environment?
