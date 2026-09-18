---
id: 02760001-ba02-4001-a009-000000000001
title: 'UAT & Business Readiness for Software BA: From test plan to go/no-go'
slug: uat-business-readiness-software-ba
excerpt: >-
  UAT is not just about letting users test a few screens. This article guides BA
  to create a UAT plan, select scenarios, prepare test data, manage defects,
  training, rollout and decide to go/no-go.
featured_image: /images/blog/uat-business-readiness-ai.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T10:20:00.000000Z'
created_at: '2026-05-06T10:20:00.000000Z'
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
  - name: UAT
    slug: uat
  - name: Business Readiness
    slug: business-readiness
  - name: Release
    slug: release
comments: []
locale: en
---
UAT (User Acceptance Testing) is not "QA test one more time". UAT is to check whether the solution meets business needs in a real usage context.

If UAT does it poorly, risks often appear after go-live:

- User doesn't know how to use it.
- The new process does not work properly.
- Data migration is missing.
- Report does not serve decision.
- Business rule is wrong but QA doesn't know because the spec is missing.

Software BA is usually the person who coordinates UAT with PO, QA and business users.

## 1. How is UAT different from QA testing?

| QA Testing | UAT |
|---|---|
| Check if the system is up to spec | Check if the solution can be used for business |
| Conducted by QA/technical team | Done by business user/key user |
| Focus on technical and functional defects | Focus on process, policy, outcome |
| Use detailed test cases | Use business scenarios |
| Can run continuously in sprint | Usually before release/go-live |

QA answers: "Does the system meet the requirements?"

UAT answers: "Does Business accept this solution?"

## 2. What does the UAT plan include?

Templates:

```markdown
# UAT Plan

## 1. Objective
- UAT để xác nhận điều gì?

## 2. Scope
- In scope
- Out of scope

## 3. Participants
- Business users
- BA
- QA
- Product Owner
- Support/Operations

## 4. Entry Criteria
- Build deployed to UAT environment
- Critical QA defects closed
- Test data ready
- UAT scenarios approved

## 5. Test Scenarios

## 6. Defect Management
- Tool
- Severity/Priority rules
- SLA fix

## 7. Exit Criteria
- Must-have scenarios pass
- No open P0/P1 defects
- Business owner sign-off

## 8. Go/No-Go Criteria
```

## 3. Select UAT scenarios

Don't copy entire QA test cases. UAT should focus on the business journey.

Example scheduling feature:

| Scenario | Why is it important |
|---|---|
| Customer booked successfully | Core business flow |
| Guests reschedule | Popular Flow |
| Guest canceled close to time | Sensitive Policy |
| Admin handles duplicate schedules | Operational exception |
| Consultant views the day's schedule | Role other than customer |
| Report booking number | Business tracking |

Each scenario should have:

- Persona/role.
- Preconditions.
- Steps.
- Expected business outcomes.
- Data needed.
- Pass/fail criteria.

## 4. Test data

UAT fails a lot because the test data is not standard.

Checklist:

- [ ] There are users for each role.
- [ ] Has normal, edge, invalid data.
- [ ] There are different status data.
- [ ] Has large enough data if test report is needed.
- [ ] Data does not contain actual PII without permission.
- [ ] Data can be reset between test rounds.

For example:

| Data | Purpose |
|---|---|
| Customer A has a Confirmed | calendar Test cancel/change |
| Customer B has no schedule yet | New set test |
| Slot is full | Test empty/error |
| Admin user | Administration Test |
| Consultant user | Test view calendar |

## 5. Entry and exit criteria

### Entry criteria

Only start UAT when:

- Build is stable.
- QA has passed the critical path.
- Known issues have been announced.
- UAT scenarios approved.
- Test data and account ready.
- Business users already know the testing schedule.

### Exit criteria

UAT is complete when:

- 100% must-have scenarios pass.
- No more P0/P1 defect.
- P2 has a workaround and the business accepts it.
- Training/release notes are ready.
- Business owner sign-off.

## 6. How to handle defects in UAT?

When the user reports an error:

1. THREE confirms the reproduction step.
2. QA checks whether there is a technical bug or not.
3. BA determines business impact.
4. PO/Business owner decides priority.
5. Team fix or defer.
6. BA updates UAT status and release risks.

Classification:

| Type | Example | How to handle |
|---|---|---|
| Bugs | Cancel appointment but slot does not reopen | Fix |
| Requirement gap | Business wants to add cancellation reason | Change request |
| Usability issue | User does not see the reschedule button | UX adjustments |
| Training issue | User does not know filter report | Update guide |

## 7. Business readiness

UAT pass does not guarantee go-live. Business readiness includes:

- User training.
- New SOPs.
- Support scripts.
- FAQ.
- Rollback plan.
- Communication plan.
- Monitoring dashboard.
- Owner after go-live.

Go-live checklist:

```text
☐ UAT sign-off
☐ Release note
☐ Training done
☐ Support team ready
☐ Monitoring/alert ready
☐ Rollback/fallback plan
☐ Business owner approves go-live
```

## 8. Go/No-Go decision

Go/No-Go should not be emotional. Use scorecards:

| Criteria | Status | Notes |
|---|---|---|
| Critical UAT scenarios | Pass | December 12 |
| P0/P1 defects | Pass | 0 open |
| P2 defects | At risk | 2 open, workaround exists |
| Training | Pass | 30 users trained |
| Support readiness | Pass | SOP updated |
| Monitoring | Pass | Dashboard live |
| Business approval | Pending | Waiting Head of Ops |

If there is "At risk", owner and mitigation must be recorded.

## 9. Full UAT script example

UAT scenario: Customer books and reschedules a consultation.

| Field | Value |
|---|---|
| Scenario ID | UAT-BOOK-002 |
| Personas | Existing customer |
| Objective | Confirm that guests can book and reschedule 4 hours before cutoff. |
| Preconditions | Customer active, consultant A has slots 09:00 and 10:00 tomorrow, email service enabled. |
| Test data | customer_id = CUS-1001, consultant_id = CON-2001, slot_09 = SLOT-0900, slot_10 = SLOT-1000. |

Steps:

| Step | Action | Expected result | Evidence |
|---|---|---|---|
| 1 | Customer opens the booking page. | The list of consultants and empty slots displays in less than 2 seconds. | Screenshot slot list. |
| 2 | Select consultant A, slot 09:00. | Confirmation button enabled, calendar information is correct. | Screenshot confirmation page. |
| 3 | Click confirm. | Appointment created with status Confirmed, with confirmation code. | Appointment ID. |
| 4 | Check email. | The confirmation email arrives within 1 minute, containing no sensitive data. | Email screenshot. |
| 5 | Reschedule to 10:00 slot. | Old slot reopened, new slot Confirmed, audit log records old/new slot. | Audit log ID. |
| 6 | Try rescheduling to another user's appointment. | Pay system 403. | Error screenshot. |

Exit criteria for this scenario:

- There is no High/Critical severity defect.
- Business users confirm that the wording is easy to understand.
- Customer service confirms exception handling SOP in under 4 hours.
- QA confirms regression for duplicate booking pass.

## 10. What should I add to the AI ​​feature?

If the feature has AI, UAT needs to add:

- Golden test set.
- Output quality threshold.
- Hallucination/fallback scenarios.
- Human override flow.
- Bias/safety review if high impact.
- Monitoring after go-live.

But don't let the entire UAT revolve around AI. Business still needs to check the end-to-end journey.

## Reference source

- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/
- Scrum Guide 2020: https://scrumguides.org/scrum-guide.html

## Conclusion

Good UAT is not about testing a lot, but testing the right business scenarios, the right users, the right data and making clear decisions. Software BA plays a bridge role: turning requirements into UAT plans, turning feedback into defects/changes, and helping businesses confidently go-live.
