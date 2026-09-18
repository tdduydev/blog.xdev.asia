---
id: 02760001-ba02-4001-a014-000000000001
title: >-
  Change Control, Baseline and Sign-off for BA: Manage requests without slowing
  down the team
slug: change-control-baseline-signoff-ba
excerpt: >-
  Requirement changes are normal, but uncontrolled changes will destroy the
  sprint, scope, testing and release. This article guides BAs in managing
  baselines, change requests, impact analysis, sign-off and traceability in both
  Agile environments and traditional projects.
featured_image: /images/blog/ba-planning-monitoring-ai-projects.webp
type: blog
reading_time: 16
view_count: 0
meta: null
published_at: '2026-05-06T10:40:00.000000Z'
created_at: '2026-05-06T10:40:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9616-cat1-7001-a001-000000000001
  name: AI
  slug: ai
tags:
  - name: BA
    slug: ba
  - name: Change Control
    slug: change-control
  - name: Traceability
    slug: traceability
  - name: Governance
    slug: governance
  - name: Software BA
    slug: software-ba
comments: []
locale: en
---
Requirement changes are not failures. The market changes, stakeholders learn more after the demo, laws change, technical constraints appear. The problem is not change, but **uncontrolled change**.

When there is no change control:

- Dev builds according to the old version.
- QA test according to old acceptance criteria.
- Business thought the scope included a new section.
- PO does not see impact on timeline.
- Release was delayed but no one knows when it was late.

BA is the one who keeps the requirements lifecycle so that change happens transparently.

## 1. What is Baseline?

Baseline is the version of requirements that has been agreed upon at a time for the team to use as a basis for building/testing.

Baseline does not mean "not redeemable". It means: if you change, you must know where to change from, why to change, who approves and what impact.

For example:

```text
SRS Appointment Booking v1.0
Baseline date: 2026-05-06
Approved by: Product Owner, Clinic Ops Lead, Engineering Lead, QA Lead
Scope: Search doctor, select slot, create appointment, cancel appointment
Out of scope: Payment, insurance claim, recurring appointment
```

## 2. When do you need to sign-off?

Not every user story needs a heavy signature. But there should be a clear sign-off when:

- Scope affects many teams/systems.
- Have vendor or contract.
- Have compliance, audit or legal.
- There is data migration.
- There are major business process changes.
- There is high go-live risk.

In Agile, sign-off can be lighter: PO approves backlog item, stakeholders confirm demo, team finalizes Definition of Ready. It is important to have decisive evidence.

## 3. What does the change request include?

Template change request:

```markdown
# Change Request

ID:
Requested by:
Date:
Current baseline:

## 1. Change summary
- What changes?
- Why now?
- Business value:

## 2. Requirement impact
- BRD/SRS:
- User stories:
- Business rules:
- Acceptance criteria:
- Wireframe:
- API/data:
- Reports:

## 3. Delivery impact
- Effort:
- Timeline:
- Dependencies:
- Test impact:
- Release impact:
- Risk:

## 4. Decision
- Approved / Rejected / Deferred:
- Decision owner:
- Decision date:
- Notes:
```

## 4. Impact analysis for BA

Impact analysis isn't just about asking Dev "how long will it take?". BA needs to look at all 6 layers:

| Class | Question |
|---|---|
| Business process | Has the process changed? Who is affected? |
| Requirements | Which BRD/SRS/user story/AC changed? |
| UX/UI | Which screen, message, empty state, error state change? |
| API/data | Which field, validation, event, report change? |
| QA/UAT | Which test case, regression, UAT script changes? |
| Release/ops | Which training, SOP, support, rollback will change? |

Change example:

> Business wants to allow patients to cancel 30 minutes in advance instead of 2 hours.

Impact:

- Business rules `BR-CANCEL-001` change.
- Cancellation API validation changed.
- UI copy changed.
- Notification template changed.
- Refund/no-show policy needs review.
- Test cases related to cutoff time must be updated.
- Support FAQ and SOP changes.

## 5. Traceability helps control change

If the requirement has traceability, change impact is much easier.

| Requirements | Rule | Story | API | Test cases |
|---|---|---|---|---|
| REQ-BOOK-010 | BR-CANCEL-001 | US-BOOK-12 | PATCH /appointments/{id}/cancel | TC-BOOK-044 |

When `BR-CANCEL-001` change, BA knows which stories, API requirements and test cases need to be updated.

Without traceability, each change request turns into a manual trace.

## 6. Change control in Agile

Agile does not mean that anyone who wants to change anything can change it right in the sprint.

Suggestions on how to do:

- Before the sprint: refine and finalize the Definition of Ready.
- During the sprint: small changes are decided by the PO/team; Big change brought to backlog.
- After demo: feedback is recorded as backlog item/change request.
- Before release: scope baseline and UAT scope are finalized.
- Only after release: change does it go into discovery or next iteration.

BA should help the team clearly state: is this a bug, clarification, change request or new scope.

## 7. Checklist governance is light

- Does Requirement have a version?
- Is baseline scope in/out-of-scope?
- Does Decision have an owner?
- Does the change request have reason/business value?
- Is impact analysis enough for Dev/QA/UX/Data/Ops?
- Are AC/test cases updated according to changes?
- Has the relevant stakeholder been notified?
- Do release notes/training/SOPs need to be updated?
- Is there a decision log for auditing?

## 8. Common errors

**Error 1: Calling every change a bug**

Bug is the system that does not comply with the specified requirements. If the business changes its mind, it is a change request or new scope.

**Error 2: No baseline**

Without a baseline, no one knows what "change" is compared to what.

**Error 3: Only ask for Dev effort**

A small change in code can be huge in terms of UAT, training, legal or support.

## Complete change request example

Change request:

| Field | Value |
|---|---|
| CR ID | CR-014 |
| Request | Changed reschedule/cancel cutoff from 4 hours to 2 hours. |
| Requested by | Sales Manager |
| Reason | Customers complain about lack of flexibility when consultation schedules change during the day. |
| Current baseline | SRS Appointment Booking v1.0 |
| Target release | v1.1 |

Impact analysis:

| Area | Impact |
|---|---|
| Business rules | BR-004, BR-005 changed threshold from 4h to 2h. |
| UX copy | Error message changed from "4 hours ago" to "2 hours ago". |
| API validation | `PATCH /reschedule` and `PATCH /cancel` change cutoff rule. |
| QA | Update TC-RS-004, TC-CAN-003, add boundary test exactly 2 hours. |
| UAT | Business user reruns UAT-004 and UAT-005. |
| Ops/SOP | Customer service only handles manual calls when customers call for less than 2 hours. |
| Risk | Consultants have little time to fill empty slots, and can increase idle time. |

Decision:

| Decision | Approved with pilot |
|---|---|
| Scope | Applicable to consulting groups in Ho Chi Minh City for 2 weeks. |
| Success metrics | No-show does not increase more than 3%; hotline complaints reduced by at least 15%. |
| Owner | PO tracks metrics, BA updates requirements, QA updates regression. |
| Rollback | If no-show increases > 3%, return to 4h cutoff using config. |

## Practice exercises

Take a requirement you once wrote. Create:

1. Baseline summary.
2. A hypothetical change request.
3. Impact analysis 6 layers.
4. Traceability matrix minimum 5 lines.
5. Decision log.

## Reference source

- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/
- IEEE/ISO/IEC 29148-2018: https://standards.ieee.org/ieee/29148/6937/
- Scrum Guide: https://scrumguides.org/scrum-guide.html
- PMI Business Analysis for Practitioners: https://www.pmi.org/shop/p-/book/business-analysis-for-practitioners-a-practice-guide/00101570601

## Conclusion

Good BAs don't do change control to lock the team down. BA does change control so that every change has context, impact, decision and traceability. Thanks to that, the team remains flexible but not chaotic.
