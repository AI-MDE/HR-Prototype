---
type: feature
kind: build
id: commands-stay-target-agnostic
title: Commands stay target/feature-agnostic
origin: mde
impacts:
  - method-change
default: n/a
---

# Commands stay target/feature-agnostic

## Purpose

Enforce **the applicable owning contract "Commands are target-agnostic"** with an actual check, not just prose.
A command profile (`method/commands/*.md`) must operate over *whatever targets are loaded* —
it must never name or enumerate a specific target, feature, or target-mandated artifact, nor
hardcode a gate that belongs in a feature. The *what/when* lives in features (tagged to a
target); the command runs it generically. If a method change adds behaviour by editing a command,
that is the wrong file — the behaviour belongs in a feature whose target the command already
iterates.

## Applicability

Applies to maintenance of the Method itself. This is engineering guidance, not an application behavior requirement or an independently imposed gate.

## Impact on method-change

- **Commands** express intent and stay Target-agnostic: a command never names a specific Target, concept, or required artifact, or hard-codes a check. A new required artifact or check is added to the Target that owns it, and the command defers to the Targets in scope.

## Audit

- Is every changed command free of Target-, concept-, or artifact-specific logic?
