---
id: 02760001-ba02-4001-a010-000000000001
title: >-
  Stakeholder Workshop for BA: How to prepare, facilitate and finalize the
  decision
slug: stakeholder-workshop-facilitation-ba
excerpt: >-
  A good workshop is not a crowded meeting. This article guides BAs in preparing
  goals, agendas, questions, facilitation techniques, conflict resolution, and
  finalizing action items after the workshop.
featured_image: /images/blog/elicitation-ai-notes-ba.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-05-06T10:30:00.000000Z'
created_at: '2026-05-06T10:30:00.000000Z'
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
  - name: Stakeholder
    slug: stakeholder
  - name: Workshop
    slug: workshop
  - name: Elicitation
    slug: elicitation
comments: []
locale: en
---
Workshop is one of BA's most powerful elicitation techniques. But a workshop is also a place that can easily turn into a long meeting, with many opinions and few decisions.

A good workshop needs 3 things:

1. Clear goals.
2. The right people in the room.
3. Specific output after the session.

The BA is the one who designs the communication, not just the one who takes the minutes.

## 1. When should you use a workshop?

Workshop is suitable when:

- Need to align multiple stakeholders at the same time.
- There are process conflicts between teams.
- Need to unify scope.
- Need to map current/future process.
- Need to prioritize requirements.
- Need to finalize business rules.

Workshops should not be used when:

- Need sensitive personal information.
- Just ask someone.
- The person deciding cannot participate.
- The goal is unclear.

## 2. Prepare before the workshop

Checklist:

- [ ] What is the goal of the workshop?
- [ ] What is the output after the session?
- [ ] Who is the decision maker?
- [ ] Who is the subject matter expert?
- [ ] Who just needs to be informed?
- [ ] Has the pre-read been sent yet?
- [ ] Does Agenda have a timebox yet?
- [ ] Is there a template for capturing decisions?

Example of unknown goal:

> Discuss the scheduling feature.

Rewrite:

> Finalize the future-state process for the booking flow, including cancellation/rescheduling rules, step owners, and out-of-scope for MVP.

## 3. Sample Agenda 90 minutes

```text
0-10 phút: Mục tiêu, scope, rule of engagement
10-25 phút: Review current pain points
25-45 phút: Map current-state process
45-65 phút: Co-create future-state process
65-80 phút: Chốt business rules và open questions
80-90 phút: Decision recap, action items, owner/deadline
```

Rules of engagement:

- Focus on the problem before the solution.
- Each opinion needs to be accompanied by evidence or examples.
- If you can't close it, write an open question with the owner.
- Parking lot for topics outside the scope.

## 4. Facilitation technique

### 1-2-4-All

Used when the group is large and quiet people are overwhelmed.

1. Each person writes their own ideas.
2. Exchange pairing.
3. Group of 4 people gather ideas.
4. The whole group shares.

### Dot voting

Used to prioritize pain points or requirements.

Each person has 3 votes. Vote on the most important item. BA does not consider voting as the final decision, but is used to see trends.

### Parking lots

Used to keep the workshop on track.

For example: while discussing MVP scheduling, someone wants to discuss loyalty program. BA records it in the Parking Lot and makes another appointment.

### Decision log

Each decision needs:

- Decision ID.
- Content.
- Reason.
- Decider.
- Day.
- Impact.

## 5. Handle conflicts

Conflict is not bad. Conflict often indicates an important requirement.

For example:

- Sales wants customers to reschedule at any time.
- Operations wants to block rescheduling 24 hours in advance.
- Customer Support wants to be flexible before 4am.

BA handles it by:

1. Separate position from interest.
2. Ask about the impact of each option.
3. Use data if available.
4. Recommend options and trade-offs.
5. Final decision maker.

Templates:

```text
Option A: Cho đổi bất cứ lúc nào
Pros: UX tốt
Cons: Consultant bị động, no-show risk

Option B: Khóa trước 24h
Pros: Vận hành ổn định
Cons: Khách không linh hoạt

Option C: Cho đổi trước 4h
Pros: Cân bằng UX và vận hành
Cons: Cần rule rõ trong hệ thống
```

## 6. Output after the workshop

Within 24 hours, BA should send a recap:

```markdown
Subject: Recap Workshop - Booking MVP Future Process

1. Decisions
- DEC-001: MVP cho phép đổi lịch trước 4h.
- DEC-002: Payment online out of scope.

2. Business Rules
- BRULE-001: Slot đã confirmed không hiển thị cho khách khác.
- BRULE-002: Khách hủy dưới 4h phải gọi hotline.

3. Open Questions
- OQ-001: Có gửi SMS hay chỉ email? Owner: Marketing, Due: 2026-05-10.

4. Action Items
- BA: cập nhật BPMN và SRS.
- PO: xác nhận MVP scope.
- Tech Lead: review API impact.
```

## 7. Complete workshop output example

Workshop: Future-state appointment booking.

Decision log:

| ID | Decision | Rationale | Owner |
|---|---|---|---|
| DEC-001 | MVP only supports 1:1 scheduling, does not support group bookings. | 92% of current bookings are 1:1, reducing initial release scope. | PO |
| DEC-002 | Cutoff for rescheduling/cancellation is 4 hours. | Consultants need enough time to fill empty slots. | Ops Lead |
| DEC-003 | Send email first, SMS included in phase 2. | SMS costs need further approval. | Marketing |

Business rules:

| RuleID | Rule | Source |
|---|---|---|
| BR-001 | Confirmed Slot is not visible to other guests. | Ops Lead |
| BR-002 | Customers can only reschedule when the appointment begins at least 4 hours later. | Sales Manager |
| BR-003 | Customer service can change the customer's replacement schedule if there is a support reason. | Customer Service Lead |
| BR-004 | Consultants are not allowed to delete Confirmed customer calendars themselves. | Compliance |

Open questions:

| ID | Question | Owner | Due |
|---|---|---|---|
| OQ-001 | Do you need to send a calendar invite? `.ics` no? | Marketing | 2026-05-10 |
| OQ-002 | How long does a no-show take from the appointment time? | Ops Lead | 2026-05-11 |
| OQ-003 | How long does data appointment keep? | Compliance | 2026-05-12 |

Action items:

| Tasks | Owner | Output |
|---|---|---|
| Update BPMN future state | BA | Diagram v1.1 |
| Write lightweight SRS | BA | SRS v0.1 |
| Check slot holding API | Dev Lead | Feasibility note |
| Draft test scenarios | QA Lead | Test matrix |

## 8. Use AI after the workshop

AI is useful to:

- Summary of transcript.
- Insights group.
- Find contradictions.
- Draft recap.
- Create action items.

But BA must check:

- Does AI add ideas that were not included in the session?
- Is the decision approved by the right person?
- Is an open question automatically interpreted by AI as a decision?

## 9. Common errors

**Error 1: No decision maker**

The workshop pointed out the problem but did not finalize anything.

**Error 2: Agenda is too greedy**

One session cannot be both discovery, detailed design, and estimate.

**Error 3: BA is too neutral**

BA needs to be neutral about people, but not neutral about decision quality. If the requirement is vague, the BA must ask.

## Practice exercises

Preparing the workshop for the "reschedule appointment" feature:

- Workshop goals.
- List of people to invite.
- Agenda 60 minutes.
- 10 elicitation questions.
- Template decision log.
- Email recap template.

## Reference source

- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/
- PMI Business Analysis for Practitioners: https://www.pmi.org/shop/p-/book/business-analysis-for-practitioners-a-practice-guide/00101570601

## Conclusion

A good workshop helps BA greatly shorten alignment time. But a workshop is only good when it has a clear goal, appropriate facilitation techniques, and the output is broken down into decisions, business rules, open questions, and action items. Without output, a workshop is just a crowded meeting.
