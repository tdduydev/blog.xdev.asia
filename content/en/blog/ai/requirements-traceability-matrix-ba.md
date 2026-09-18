---
id: 02760001-ba02-4001-a005-000000000001
title: 'Requirements Traceability Matrix for BA: What is RTM and how to model it?'
slug: requirements-traceability-matrix-ba
excerpt: >-
  RTM helps BA trace from business objective to requirements, user stories, test
  cases and release. This article shows you how to create a minimalistic RTM
  that can be used in Agile, Waterfall, and compliance projects.
featured_image: /images/blog/business-requirements-checklist.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-05-06T09:40:00.000000Z'
created_at: '2026-05-06T09:40:00.000000Z'
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
  - name: Traceability
    slug: traceability
  - name: Requirements
    slug: requirements
  - name: QA
    slug: qa
comments: []
locale: en
---
RTM (Requirements Traceability Matrix) is a table that helps BA answer 4 questions:

1. What business goal does this Requirement come from?
2. Which story/spec has this Requirement been converted into?
3. Has this Requirement been verified by test cases?
4. Has this Requirement been released yet?

If the project is small, RTM can be a simple sheet. If the project is large, RTM may reside in Jira, Azure DevOps, TestRail or a requirements management tool. The important point is not the tool, but the **tracing ability**.

## 1. When is RTM needed?

You should have RTM when:

- There are many stakeholders.
- Requirements change a lot.
- The project has compliance.
- Vendor or multiple teams building together.
- BA needs to prove coverage with QA/UAT.
- There are many release versions.

There's no need to make RTM too heavy for every small feature. But with important features, RTM helps avoid missing requirements and avoid building things that are no longer valuable.

## 2. What does minimalist RTM include?

Simple templates:

| Field | Meaning |
|---|---|
| Business Objective ID | Business goals |
| Requirement ID | Requirement code |
| Requirement Description | Description of requirement |
| Source | Stakeholder, policy, meeting, document |
| Priorities | Must/Should/Could or MoSCoW |
| User Story / Spec | Link ticket or SRS section |
| Test Cases | Link test cases |
| Status | Draft/Approved/In Dev/Tested/Released |
| Change Request | CR link if any changes |
| Owner | Person responsible |

## 3. RTM example

Feature: Schedule an online consultation.

| Objective | Req ID | Requirements | Source | Story | Test | Status |
|---|---|---|---|---|---|---|
| OBJ-01 Hotline discount 30% | BR-001 | Customers book their own appointments online | Customer Care Workshop | US-101 | TC-101 | Released |
| OBJ-01 | SR-001 | Show available slots by service/day | SRS v1.0 | US-102 | TC-102 | Tested |
| OBJ-02 No-show reduction | SR-002 | Send calendar reminders 24 hours in advance | Operation policy | US-110 | TC-110 | In Dev |
| OBJ-03 Compliance | NFR-003 | Audit log when admin changes schedule | Compliance review | US-120 | TC-120 | Approved |

Just looking at this table, you know which requirements have been tested, which requirements are still in development, and which requirements are being traced to compliance.

## 4. Trace forward and trace backward

### Forward trace

From business objective down:

```text
Objective -> Business Requirement -> System Requirement -> User Story -> Test Case -> Release
```

Used to ask: "What requirements are covered by this goal?"

### Backward trace

From ticket or test case go up:

```text
Bug/Test/Story -> Requirement -> Objective
```

Used to ask: "Why are we building this?"

If a story cannot be traced to any objective, it is possible that the story is scope creep.

## 5. Is RTM necessary in Agile?

Yes, but it should be light.

In Agile, you don't necessarily need to create a long formal RTM file. You can trace with:

- Epic links.
- Jira issue link.
- Label.
- Requirement ID in description.
- Test case link.
- Confluence spec page.

Example in Jira stories:

```markdown
Business Objective: OBJ-01
Requirement: SR-001
SRS: Booking SRS v1.2, section 3.1
Test Cases: TC-101, TC-102
UAT Scenario: UAT-05
```

## 6. Change control with RTM

When requirements change:

1. Create Change Request ID.
2. Record the reason for the change.
3. Assess impact: story, test cases, API, data, training, release.
4. Update RTM.
5. Apply for approval if the requirement is baseline.

For example:

```text
CR-014: Cho phép khách hủy lịch trước 2h thay vì 4h.

Impact:
- BRULE-003 thay đổi.
- US-115 cần update.
- TC-115 cần update expected result.
- Email template hủy lịch cần update.
- Training CSKH cần cập nhật.
```

## 7. Checklist RTM

- [ ] Each requirement has a unique ID.
- [ ] Each requirement has a source.
- [ ] Each requirement has a priority.
- [ ] Important requirements include test cases.
- [ ] Requirement has a baseline with change history.
- [ ] Story/ticket trace back to requirement.
- [ ] Test case traces back to acceptance criteria.
- [ ] Release note traces shipped requirements.
- [ ] Out-of-scope items are recorded separately.

## 8. Common errors

**Error 1: RTM is so detailed that no one updates it**

Good RTM is RTM that is used. If the team can't update 30 columns, cut down to the 8-10 most important columns.

**Error 2: No source**

Requirement without source is very dangerous. When an argument occurs, BA doesn't know who to turn to and ask.

**Error 3: Only trace requirements to stories, not trace to tests**

If you do not trace to the test, you have not proven that the requirement has been verified.

## More complete RTM example for booking

| Req ID | Requirements | Rule | Design/API | Test cases | UAT scenarios | Status |
|---|---|---|---|---|---|---|
| REQ-001 | Guests view available slots in the next 14 days. | BR-001 | `GET /consultants/{id}/slots` | TC-001 | UAT-001 | Approved |
| REQ-002 | Customers book available slots. | BR-002 | `POST /appointments` | TC-002, TC-003 | UAT-002 | Approved |
| REQ-003 | Confirmed slots are not visible to other customers. | BR-003 | Slot locking design | TC-004 | UAT-003 | Approved |
| REQ-004 | Customers reschedule at least 4 hours before appointment time. | BR-004 | `PATCH /appointments/{id}/reschedule` | TC-005, TC-006 | UAT-004 | Print Review |
| REQ-005 | Customers cancel appointments at least 4 hours before appointment. | BR-005 | `PATCH /appointments/{id}/cancel` | TC-007 | UAT-005 | Print Review |
| REQ-006 | The system sends a confirmation email after booking. | BR-006 | Notification service | TC-008 | UAT-006 | Approved |
| REQ-007 | Consultant views appointment schedule by day. | BR-007 | Consulting calendar page | TC-009 | UAT-007 | Draft |

Change request example:

> CR-014: Business wants to change the reschedule rule from 4 hours to 2 hours.

Impact from RTM:

- `REQ-004` need update.
- `BR-004` change threshold.
- Validation API changed `PATCH /appointments/{id}/reschedule`.
- `TC-005`, `TC-006`, `UAT-004` need to update expected result.
- UI copy in error message needs to be changed from "4 hours" to "2 hours".
- Customer service SOP needs to be updated because customers call less than 2 hours before receiving manual support.

This is why RTM should live with the backlog, not a file that you just created and then forgot about.

## Practice exercises

Choose a feature that has 5 user stories. Create RTM with columns:

- Objective
- Requirement ID
- Requirement
- Source
- Stories
- Acceptance Criteria
- Test Cases
- Status

Then check yourself: is there any story that doesn't trace to the objective? Are there any requirements that don't have test cases yet?

## Reference source

- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/
- PMI Business Analysis for Practitioners: https://www.pmi.org/shop/p-/book/business-analysis-for-practitioners-a-practice-guide/00101570601
- IEEE/ISO/IEC 29148-2018: https://standards.ieee.org/ieee/29148/6937/

## Conclusion

RTM is not an administrative document. It is a positioning system for requirement. When scope changes, release nears, defects appear or stakeholders ask "why build this", RTM helps BA answer with evidence instead of memory.
