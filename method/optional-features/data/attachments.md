---
type: feature
kind: optional
id: attachments
name: Attachments
description: "Files are attached to a record and downloaded again."
scope: [attribute]
appliedIn: [requirements, design]
aliases: [attachment]
---

# Attachments

Files are attached to a record and downloaded again.

## Meaning

An attachment attribute holds files with their name, type and size; they are stored outside the row and served only to those who may see the record.

## Realizations

- **object-storage**: Files in object storage, metadata in the row.
- **database-blob**: Files as blobs, for small volumes.

An application chooses one, or its own, and records it in its catalog (`specs/design/catalog.json`).

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:attachments/<promise>`.

- `upload-download` An attached file is downloaded unchanged.
- `access-checked` Only those who may see the record can download its files.
