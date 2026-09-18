---
id: 02760001-ba02-4001-a006-000000000001
title: 'Software Handoff for BA: From SRS to Design, Dev and Test Cases'
slug: software-handoff-srs-design-test-cases-ba
excerpt: >-
  A good handoff helps Dev/QA understand the requirements correctly before the
  sprint starts. This article provides a handoff checklist, Three Amigos agenda,
  examples of converting acceptance criteria into test scenarios and how to
  manage open questions.
featured_image: /images/blog/user-story-acceptance-criteria.webp
type: blog
reading_time: 11
view_count: 0
meta: null
published_at: '2026-05-06T09:50:00.000000Z'
created_at: '2026-05-06T09:50:00.000000Z'
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
  - name: Handoff
    slug: handoff
  - name: QA
    slug: qa
  - name: Agile
    slug: agile
  - name: Software BA
    slug: software-ba
comments: []
locale: en
---
Handoff is the moment the requirement leaves the BA head and goes into the hands of UX, Dev, and QA. If the handoff is ambiguous, the sprint will pay:

- Dev builds according to its own understanding.
- QA writes test cases that lack business rules.
- Beautiful UX flow design but wrong policy.
- Stakeholder rejected in UAT because "it's not the right idea".

A good handoff is not a reading session. A good handoff is a structured alignment.

## 1. When does Handoff happen?

In Agile, handoffs often happen at refinement or before sprint planning. In plan-driven projects, handoffs occur after the SRS is baselined.

You need a handoff when:

- Story is about to enter sprint.
- SRS section is fully mature.
- UX design begins.
- QA starts writing test cases.
- There are major requirements changes.
- Has important integration or NFR.

## 2. Who should participate?

Minimum:

- BA
- Product owner or business owner
- Developer/Tech Lead
- QA

When needed:

- UX Designer
- Architect
- Data Engineer
- Security/Compliance
- Operations/Support

Don't overcrowd if you don't need to. But don't lack a decision maker.

## 3. Handoff checklist

Before the handoff, BA prepares:

- [ ] Problem and business value.
- [ ] Scope and out-of-scope.
- [ ] User stories or SRS section.
- [ ] Acceptance criteria.
- [ ] Business rules.
- [ ] Wireframe or flow if there is a UI.
- [ ] API/data impact.
- [ ] related NFR.
- [ ] Edge cases.
- [ ] Dependencies.
- [ ] Open questions.
- [ ] Sign-off or decision to close.

If there are too many items missing, you should not hand off yet. Let's go back to discovery/refinement.

## 4. Agenda Three Amigos 45 minutes

Three Amigos are usually BA, Dev, and QA reviewing the story together. PO/UX can be added if needed.

```text
0-5 phút: BA nhắc lại business value và scope
5-15 phút: Review flow chính và acceptance criteria
15-25 phút: Dev hỏi về API/data/NFR/dependency
25-35 phút: QA chuyển AC thành test scenarios, hỏi edge cases
35-40 phút: Chốt open questions, owner, deadline
40-45 phút: Quyết định story Ready hay chưa
```

Output at the end of the session:

- Story Ready / Not Ready.
- List of open questions.
- Test draft scenarios.
- Update needs to be done in SRS/story.

## 5. Example of converting AC into test scenarios

Story:

> As a customer, I want to reschedule my appointment so that I can choose another available time when my plan changes.

AC:

```gherkin
Given khách có lịch hẹn ở trạng thái Confirmed
When khách chọn đổi lịch sang slot còn trống trước giờ hẹn ít nhất 4 tiếng
Then hệ thống cập nhật lịch hẹn sang slot mới
And gửi email xác nhận lịch mới
```

Test scenarios:

| ID | Scenario | Expected |
|---|---|---|
| TC-001 | Change to available slot 4 hours in advance | Successful, email sent |
| TC-002 | Change to an already booked slot | Error message: slot is no longer available |
| TC-003 | Reschedule when less than 4 hours left | Do not allow changes, display policy |
| TC-004 | Email service error | Calendar still updated, email retry/log |
| TC-005 | User is not the owner of the calendar | 403 or unauthorized message |

This is how BA helps QA not only test the happy path.

## 6. Open question log

Not all questions are solved immediately. But the unanswered question is that there must be an owner.

Templates:

| ID | Question | Impact | Owner | Due | Status |
|---|---|---|---|---|---|
| OQ-01 | Is it possible to change the schedule during the day? | Business rules, UI, AC | Customer Service Lead | 2026-05-12 | Open |
| OQ-02 | Does failed email block bookings? | Error handling | Tech Lead | 2026-05-12 | Open |

Rule: story cannot enter sprint if open question is a blocker.

## 7. Handoff for UX

UX needs:

- Main Persona.
- User's goal.
- Main flow.
- Error/empty/loading states.
- Business rules affect UI.
- Content needs to be displayed.
- Accessibility/localization requirement.

BA does not design UI instead of UX, but BA must ensure UX understands business constraints.

## 8. Handoff for Dev

Devs need:

- Functional behavior.
- Data model or field impact.
- API interaction.
- Permission model.
- Error handling.
- NFR.
- Dependency.
- Feature flag or rollout constraints.

BA doesn't just say "make a booking screen". BA needs to clearly state "which slot is displayed, overlap rule, timezone, status, audit log".

## 9. Handoff for QA

QA needs:

- Acceptance criteria.
- Business rules.
- Test data.
- Role/permission matrix.
- UAT scenarios.
- Regression scope.
- Known risks.

If QA does not understand business rules, the test pass can still be wrong.

## 10. Full handoff pack example

Feature: Customer reschedules consultation appointment.

| Part | Handoff content |
|---|---|
| Business value | Reduce customer service calls when customers need to reschedule, but still protect the consultant's work schedule. |
| Scope | Customers can reschedule online at least 4 hours before the appointment time. |
| Out of scope | Change schedule for less than 4 hours, change consultant to different domain, change group schedule. |
| Business rules | BR-001: only owner manager can be changed. BR-002: only change if appointment status = Confirmed. BR-003: only change >= 4 hours before appointment time. |
| UX notes | If the change is successful, the new confirmation code will be displayed; If failed due to cutoff, display hotline. |
| API/data | `PATCH /appointments/{id}/reschedule`, request includes `new_slot_id`, `reason`, `idempotency_key`. |
| NFR | Response p95 under 2 seconds; write audit log old_slot/new_slot. |

Test scenario matrix:

| Scenario | Test data | Expected result |
|---|---|---|
| Change to available slot before 4 hours | appointment Confirmed, starts in 24h | Status is still Confirmed, old slot reopened, new slot locked. |
| Exchange under 4 hours | appointment starts in 3h30m | Do not change the schedule or display the hotline. |
| Change to the slot that was just placed | new_slot_id unavailable | Do not reschedule, suggest another slot. |
| User changes someone else's appointment | appointment_id is not part of user | Returns 403, writes security event. |
| Submitted twice due to double click | same idempotency_key | There is only one rescheduling. |

Open questions:

| ID | Question | Owner | Deadlines |
|---|---|---|---|
| OQ-001 | Reschedule to send SMS or just email? | Marketing | 2026-05-10 |
| OQ-002 | Can a consultant reject the changed schedule? | Ops Lead | 2026-05-10 |
| OQ-003 | Is there a no-show if the customer changes multiple times? | Sales Manager | 2026-05-11 |

## 11. Common errors

**Error 1: Handoff by sending Confluence link**

Link does not replace alignment. For important requirements, it is necessary to review live or async with a checklist.

**Error 2: Not inviting QA early**

When QA comes in late, edge cases are discovered late. Invite QA from refinement to help reduce defects.

**Error 3: Not recording decision**

The meeting was good, but without a decision log, a few days later everyone remembered differently.

## Reference source

- Scrum Guide 2020: https://scrumguides.org/scrum-guide.html
- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/

## Conclusion

Handoff is not a one-way handoff. Handoff is a joint clarification session between BA, PO, Dev, QA and related roles. When the handoff is good, the sprint asks fewer questions, QA tests more closely, UAT has fewer surprises, and stakeholders trust BA more.
