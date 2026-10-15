---
type: concept-type
title: Release Notes
description: What a release changes for its users, how to move to it, and what it knowingly leaves out.
icon: 📣
---

# Release Notes

Release Notes tell the people who use or run the application what a release changes for them. They are prepared in `work/current/release-notes.md` while the release is being readied, as part of [Current Work](current-work.md).

## Content

- **Changes** — the user-visible changes in the release, in the users' terms rather than the code's.
- **Migration** — what someone upgrading must do or should know: data migrations, configuration, changed behavior.
- **Known limitations** — gaps and accepted findings the release ships with, each one explicitly accepted by the user.
- **Verification** — a one-line summary of the evidence the release rests on, pointing to the Evidence Package.

Its rules and checks are in the [documentation](../../targets/app/documentation.md) Target. At release, the notes become the release tag's message.
