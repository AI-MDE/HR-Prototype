---
type: questions
---

# Questions

## Resolved

### Strategy — 2026-10-14

**Q:** Use the Prototype Strategy for employee records, performance management, and client-project assignments, starting with use-case and data-model diagrams?
**Answer:** Yes. User selected Prototype, retaining nest-carbon and starting with use-case and data-model diagrams. Recorded in Goal and Current Work.
**Default:** Prototype.

### Target selection ? resolved 2026-10-14

**Q:** Use business-requirements for the first step and the full-stack runnable baseline for the build, leaving the stack's formal Targets optional?
**Answer:** Accepted by mde proceed on 2026-10-14; recorded business-requirements and run-app, with other formal stack Targets left out.
**Default:** Prototype selection.

### Conceptual scope ? resolved 2026-10-14

**Q:** Does this first model cover the intended HR prototype?
**Answer:** mde proceed accepted the conceptual draft for this prototype slice.
**Default:** HR maintains employee identity, role and employment dates. Managers record narrative performance reviews, strengths and development actions for a period. Coordinators maintain clients/projects and dated percentage assignments. Payroll, recruiting, leave, billing, timesheets, automated matching and approval workflows are outside this slice. Employee is a business record, not a login identity.

### Performance and staffing policy ? resolved for this slice 2026-10-14

**Q:** Are scored reviews, employee acknowledgement, separate development goals, staffing demand or approvals needed?
**Answer:** Carry forward the shown conceptual defaults under the user's mde proceed; richer workflows remain outside this slice.
**Default:** Narrative reviews recorded by a manager, with no scoring or approval lifecycle. Direct assignments to projects, with no quantified demand/fulfilment process. Inclusive assignment dates; allocation is a percentage of nominal working capacity and concurrent total cannot exceed 100%. These assumptions are for conceptual review before implementation.

### Build checkpoint - resolved 2026-10-14

**Q:** Approve the minimal full-stack architecture, page set and design for implementation?
**Answer:** Approved by mde proceed at the checkpoint; implementation authorized.
**Default:** NestJS/React/Carbon/PostgreSQL; project-owned database container; 14 routes; fictional data and loopback-only demo role sessions. Operation grants come from use cases; each role reads all fictional records it is granted. Production authentication, manager-specific access scope, audit history, record-edit conflict UI and dashboards are outside this demo. Transaction locking still protects allocation and employment changes. Catalog adds storage naming, foreign-key indexes and standard errors. Proceeding authorized the build.

## Open: Method 0.3.118 Prototype Target expansion

**Q:** Add formal UI-design coverage, role Critical Success Factors and corresponding dashboard designs, or retain the previously approved Target scope?
**Answer:**
**Default:** Preserve the approved scope pending the user's decision. The update procedure requires a user decision for changes to the Goal's Targets or Strategy obligations. Dashboards were expressly excluded at the approved full-stack build checkpoint. This is an unresolved reconciliation item, not a waiver or a compliance claim.
