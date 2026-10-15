# Features — applied, realized, and proven on each object

**Agrees.** 3 applications of 3 Features; no backend yet, so no promise is due.

Each optional Feature the application applies, on each object it applies it to: where it is applied (requirements, design, or a catalog default), and its promises, each proven only by a passing scenario tagged `@feature:<id>/<promise>` that performs an operation of that object, in the last test report (2026-10-15T16:11:46.000Z). A promise proven on one object proves nothing for another.

## Applications

| Feature | On | Applied in | Promises proven |
|---|---|---|---|
| `storage-naming` | the application | default | 0 of 1 |
| `foreign-key-indexes` | the application | default | 0 of 1 |
| `standard-errors` | the application | default | 0 of 3 |

### `storage-naming` on the application

- ➖ `names-follow-model` Every table and column is named by the convention, or by the design where it differs.

### `foreign-key-indexes` on the application

- ➖ `indexed` Every foreign-key column has an index in the migrated database.

### `standard-errors` on the application

- ➖ `fixed-codes` Each kind of refusal has its fixed status and code.
- ➖ `rule-named` A business-rule refusal names the rule.
- ➖ `no-internals` No refusal shows internals (stack, SQL).
