---
type: feature
kind: build
id: release-notes
title: Release notes
origin: mde
impacts:
  - documentation
default: n/a
---

# Release notes

## Purpose

Explain user-visible changes, migration implications, and known limitations in a release.

## Applicability

Applies to documentation and evidence relevant to the requested scope. Durable application meaning belongs in Specs; execution findings and evidence belong in Work or configured reports.

## Impact on documentation

- Derive the notes from the Git range since the previous release, the actual outputs, and the verification results; never from intentions or plans.
- Do not repeat Git history commit by commit: group and explain what matters to a user, and give the reason behind each change.
- Disclose every known limitation the release ships with, each one accepted by the user.
- At release, the notes become the release tag's message, the lasting record. A project that keeps a `CHANGELOG.md` adds each release's notes to it, newest first; Git stays authoritative for versions.

## Audit

- Do the release notes describe the actual release scope, matching the Git range, with every known limitation disclosed and accepted?
