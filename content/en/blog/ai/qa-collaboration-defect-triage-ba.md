---
id: 02760001-ba02-4001-a008-000000000001
title: 'QA Collaboration & Defect Triage for BA: How to reduce operational errors?'
slug: qa-collaboration-defect-triage-ba
excerpt: >-
  BA and QA are an important couple to turn requirements into test scenarios.
  This article explains how to coordinate with QA, classify severity/priority,
  triage defects, and manage regression scope before release.
featured_image: /images/blog/user-story-acceptance-criteria.webp
type: blog
reading_time: 11
view_count: 0
meta: null
published_at: '2026-05-06T10:10:00.000000Z'
created_at: '2026-05-06T10:10:00.000000Z'
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
  - name: QA
    slug: qa
  - name: Defect
    slug: defect
  - name: UAT
    slug: uat
  - name: Agile
    slug: agile
comments: []
locale: en
---
BA writes requirements. QA verifies requirements. If these two roles do not work closely together, "wrong profession" bugs will appear a lot.

Business errors are usually not because of weak Dev or lack of QA testing. The root is usually:

- Acceptance criteria are not clear enough.
- Business rules are in the heads of stakeholders.
- Edge case not stated.
- QA is not allowed to participate in refinement.
- Defect triage only looks at technique, not business impact.

## 1. When should BA and QA coordinate?

From refinement, not end of sprint.

QA should be invited when:

- Story has complex business rules.
- There are many roles/permissions.
- Has integration/API.
- Has data migration.
- Have UAT or compliance.
- Has significant NFR.

If QA only sees requirements when the build is finished, they can only detect errors late.

## 2. From AC to test scenarios

Good acceptance criteria are the input for test scenarios.

Story:

> As a customer, I want to cancel my appointment so that I can free the slot when I cannot attend.

AC:

```gherkin
Given khách có lịch hẹn Confirmed
When khách hủy trước giờ hẹn ít nhất 4 tiếng
Then hệ thống cập nhật trạng thái thành Cancelled
And slot được mở lại cho khách khác đặt
And khách nhận email xác nhận hủy
```

Test scenarios:

| ID | Scenario | Expected |
|---|---|---|
| TC-001 | Cancel 4 hours in advance | Cancelled, slot reopened, email sent |
| TC-002 | Cancel in under 4 hours | Do not allow cancellation, show policy |
| TC-003 | Cancel scheduled Cancelled | No cancellation allowed |
| TC-004 | Email service error | Booking still canceled, email retry/log |
| TC-005 | Another user cancels the appointment | 403 or no permissions |

QA helps BA see cases that BA often misses.

## 3. Severity vs Priority

These two concepts are often confused.

- **Severity**: severity of system/functional error.
- **Priority**: level of urgent need to fix based on business/release context.

For example:

| Bugs | Severity | Priorities | Why |
|---|---|---|---|
| Payment is charged twice | Critical | P0 | Impact on money and trust |
| Logo offset 2px in internal admin | Low | P3 | Low impact |
| Wrong date format on invoice | Medium | P1 | Possible legal/accounting implications |
| Export CSV is missing an optional | column Medium | P2 | There are workarounds |

BA needs to participate in priority because BA understands business impact.

## 4. Defective triage meeting

Agenda 30 minutes:

```text
1. Review bug mới theo severity
2. Xác định business impact
3. Xác định workaround
4. Quyết định fix now / fix later / won't fix
5. Update release risk
6. Assign owner và deadline
```

Each defect should have:

- Steps to reproduce.
- Actual results.
- Expected results.
- Environment.
- Evidence screenshot/log.
- Related Requirement/AC.
- Impact.
- Severity.
- Priorities.
- Owner.

## 5. Defect triage matrix

| Impact | Workaround | Decision |
|---|---|---|
| High | No workarounds | Fix before release |
| High | Has workaround | Product/BA decides risk |
| Medium | No workarounds | Fix if capacity |
| Medium | Has workaround | Can defer |
| Low | Has workaround | Backlog |

Decisions should not be based on feelings. The reason must be clearly stated.

## 6. Regression scope

When requirements change, QA needs to know what to retest.

BA should write:

- Requirement changes.
- What business rules have changed?
- Which API/data is affected?
- Which role is affected?
- Which reports/dashboards are affected?
- Which UAT scenarios need updating?

For example:

```text
Change: Cho phép hủy lịch trước 2 tiếng thay vì 4 tiếng.

Regression scope:
- Cancel appointment flow
- Slot availability recalculation
- Email template
- Admin booking history
- UAT scenario UAT-03
```

## 7. How should BA read bugs?

When QA logs bugs, BA doesn't just ask "is the spec correct?" Ask:

- Is the Spec ambiguous?
- Does AC cover this case?
- Does the business rule have a source?
- Is this a bug or a change request?
- If not fixed, what is the business impact?
- Is there a workaround?
- Do I need to update SRS/RTM/test cases?

If a bug appears because of a missing requirement, the BA should take responsibility for improving the requirement, not just push it to the Dev.

## 8. UAT defects

Defects in UAT usually fall into 3 categories:

| Type | How to handle |
|---|---|
| Real bugs | Fix by severity/priority |
| Requirement gap | Change request or scope update |
| Training/process issue | Update guide, training, communication |

BA needs to differentiate clearly. Not every UAT response is a bug.

## 9. Full defect triage example

Feature: reschedule online consultation.

| Bugs | Description | Severity | Priorities | BA analysis | Decision |
|---|---|---|---|---|---|
| BUG-101 | Customers who reschedule for less than 4 hours are still successful. | High | P0 | Violation of BR-003, directly affecting consultant operations. | Fix before release, add regression test cutoff. |
| BUG-102 | Confirmation email sent twice when double clicked. | Medium | P1 | It could be due to lack of idempotency or the UI not disabling the button. | Fix in sprint, add test duplicate submit. |
| BUG-103 | The error message says "2 hours" instead of "4 hours". | Low | P0 | Severity is low but priority is high because it causes wrong policies for customers. | Fix copy before UAT sign-off. |
| BUG-104 | Consultant dashboard loads 5 seconds. | Medium | P2 | Not blocking release if below NFR threshold? Need to compare with NFR-PERF. | Engineer measures p95, if > NFR then fix. |
| BUG-105 | Customer service does not know how to change the customer's schedule. | Not bugs | P2 | This is a training/SOP issue, not a software defect. | Update SOP and training notes. |

BA should ask during triage:

- Which requirement/rule does this bug violate?
- Is there a workaround?
- Does it affect legal/compliance/customer trust?
- Do I need to update AC/test cases?
- Is this a bug, requirement gap or change request?

Good triage results must leave clear decisions: fix now, fix later, reject, convert to change request, or training issue.

## 10. Common errors

**Error 1: QA is not allowed to participate in refinement**

When QA comes in late, edge cases are discovered late.

**Error 2: BA did not update requirements after the bug**

If the bug specifies a new rule, the SRS/AC/test case must be updated. Otherwise, the same bug will return.

**Error 3: Prioritize bugs according to who shouts the loudest**

Priority must be based on impact, urgency, workaround and release risk.

## Practice exercises

Choose a story you once wrote. Create table:

- AC
- Test scenarios
- Expected results
- Data needed
- Role needed
- Edge cases

Then ask yourself: Can QA test without asking you again?

## Reference source

- Scrum Guide 2020: https://scrumguides.org/scrum-guide.html
- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/

## Conclusion

BA and QA protect quality from two perspectives: BA protects business significance, QA protects verifiability. When the two roles work early and structured, the team reduces bugs, reduces rework, and makes UAT much lighter.
