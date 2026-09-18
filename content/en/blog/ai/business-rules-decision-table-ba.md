---
id: 02760001-ba02-4001-a011-000000000001
title: >-
  Business Rules and Decision Table for BA: Write rules so that Dev/QA do not
  misunderstand
slug: business-rules-decision-table-ba
excerpt: >-
  Business rules are the part that is most likely to cause rework if the BA
  writes vaguely. This article guides how to classify rules, write atomic rules,
  use decision tables, for example approving loan applications and review
  checklists before putting them into SRS, user stories or test cases.
featured_image: /images/blog/business-requirements-checklist.webp
type: blog
reading_time: 15
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
  - name: Business Rules
    slug: business-rules
  - name: Decision Table
    slug: decision-table
  - name: Requirements
    slug: requirements
  - name: Software BA
    slug: software-ba
comments: []
locale: en
---
If the user story tells the system **what to do**, then the business rule tells the system **how to decide**.

A feature may look simple on the screen, but hidden behind it are many rules: who is approved, how much is the limit, what cases are blocked, when to escalate, what data is required, and what policy takes priority when two rules conflict.

If BA writes unclear rules, Dev often has to guess. QA test in a different way. Business said "that's not what I meant". This is a very expensive source of rework.

## 1. What are business rules?

A business rule is a constraint, policy or condition that determines how a business operates.

For example:

- Customers under 18 years old are not allowed to open investment accounts.
- Loan applications over 500 million require approval at department head level.
- Discount code only applies once per customer.
- Users can only cancel appointments at least 2 hours before the appointment time.
- Documents lacking required documents must be changed to "Need additional" status.

Good rules must be clear enough for Dev to implement and QA to write test cases. If the rule only sounds reasonable for business but cannot be tested, it is not good enough for Software BA.

## 2. Classify rules to ask the right questions

BA should group rules before writing details:

| Rule group | Questions to ask |
|---|---|
| Eligibility | Who is eligible? Who is not eligible? |
| Calculation | What is the calculation formula? How to round? |
| Validation | Which fields are required? What is the format/range/unique? |
| Authorization | Who can view, create, edit, approve, and delete? |
| State transition | Which state is transferred to which state? |
| SLA / timing | What is deadline, waiting time, cutoff time? |
| Exception | What to do when data is missing, incorrect, duplicated, or expired? |
| Compliance | Which rule comes from law, policy, audit or contract? |

Classification helps BA not ask random questions. For each group of rules, you know which stakeholders need to confirm and which artifacts need to be updated.

## 3. How to write atomic rules

An atomic rule is a rule that only states one condition or decision. Don't combine many ideas in one long sentence.

Bad example:

> Customers are eligible for a loan if they have a stable income, good credit score, no bad debt and complete records.

Rewrite:

| ID | Rule |
|---|---|
| BR-001 | Customers must have an average income of the last 3 months >= 15,000,000 VND. |
| BR-002 | Internal credit score must be >= 650. |
| BR-003 | Customers must not have debt groups 3, 4 or 5 in the last 24 months. |
| BR-004 | The application must have full CCCD, income statement and loan application. |

Each rule should have:

- Stable ID
- Source stakeholder or source document
- Version or effective date
- Owner approves
- Pass/fail example
- Test impact

## 4. When to use decision table?

Use a decision table when the decision depends on many conditions.

Example loan application approval feature:

| Conditions/Results | Rule 1 | Rule 2 | Rule 3 | Rule 4 |
|---|---:|---:|---:|---:|
| Income >= 15 million | Y | Y | Y | N |
| Credit score >= 650 | Y | Y | N | - |
| No bad debt | Y | N | - | - |
| Required documents complete | Y | Y | Y | Y |
| **Decision** | Auto approve | Manual review | Reject | Reject |
| **Reason code** | AP-001 | RV-002 | RJ-003 | RJ-004 |

Decision table helps the team see the combination of conditions. It also helps QA create test cases faster: each column is almost a group of test scenarios.

## 5. How to write a decision table that is easy to maintain

A good decision table needs:

- Explicit condition yes/no, range or enum.
- Sign `-` Use only when conditions do not affect the decision.
- Each column gives a unique decision.
- There is a reason code or message code if the system needs to display the reason.
- There is rule priority if multiple rules match.
- There is a default case for combinations that are not listed.

If the board is too large, don't try to cram it into one board. Let's separate by class:

1. Eligibility check.
2. Risk check.
3. Approval routing.
4. Notification/message.

## 6. From rules to user stories and test cases

User story example:

```gherkin
As a loan officer
I want the system to evaluate loan eligibility
So that I can reduce manual screening time.
```

Acceptance criteria:

```gherkin
Scenario: Auto approve eligible application
  Given the applicant has income >= 15,000,000 VND
  And credit score >= 650
  And no bad debt in the last 24 months
  And all required documents are complete
  When the officer submits the application
  Then the application status is "Auto Approved"
  And the reason code is "AP-001"
```

Traceability:

| AC | Rule | Test cases |
|---|---|---|
| AC-001 | BR-001, BR-002, BR-003, BR-004 | TC-LOAN-001 |
| AC-002 | BR-003 | TC-LOAN-006 |
| AC-003 | BR-004 | TC-LOAN-008 |

BA does not need to write the entire test case instead of QA, but BA must help the rule be clear enough so that QA converts it into test cases without having to guess.

## 7. Checklist review business rules

Before handoff, check:

- Does the rule have an ID?
- Does the rule have a source?
- Does the rule have owner approval?
- Does the rule have a pass/fail example?
- Does the rule conflict with other rules?
- Does the rule have a priority order?
- Does the rule have an exception/default case?
- Does the rule have a message or reason code?
- Does the rule impact data, API, UI, reports, audit log?
- Does the rule have a trace to AC/test case?

## 8. Common errors

**Error 1: Writing rules with vague words**

"Priority VIP customers" is not enough. Who is VIP? Prioritize by SLA, queue, discount or approval route?

**Error 2: Not asking default case**

Many bugs occur when data falls into a combination of conditions that no one mentioned.

**Error 3: No version rule**

Business rules change according to policy. Without version/effective date, it is difficult for the team to audit why the system made that decision at that time.

## More complete decision table example

Use case: customer changes consultation schedule.

Business rules:

| RuleID | Rule |
|---|---|
| BR-001 | Only customers who own an appointment can reschedule online. |
| BR-002 | Appointment must be in Confirmed state. |
| BR-003 | The appointment start time must be at least 4 hours away. |
| BR-004 | New slots must be available at the time of confirmation. |
| BR-005 | If rescheduling is successful, the old slot must be reopened. |

Decision table:

| Conditions/Results | R1 | R2 | R3 | R4 | R5 |
|---|---:|---:|---:|---:|---:|
| User is owner director | Y | N | Y | Y | Y |
| Status = Confirmed | Y | - | N | Y | Y |
| >= 4 hours remaining | Y | - | - | N | Y |
| New slots available | Y | - | - | - | N |
| **Decision** | Allow reschedule | Reject | Reject | Reject | Reject |
| **Reason code** | OK | NOT_OWNER | INVALID_STATUS | CUTOFF_EXPIRED | SLOT_UNAVAILABLE |
| **User message** | Reschedule successfully | You do not have the right to change this date | Appointment schedule cannot be changed | Schedule coming soon, please call hotline | This slot has just been placed |

Mapping to test cases:

| Rule columns | Test cases |
|---|---|
| R1 | TC-RS-001 rescheduled successfully |
| R2 | TC-RS-002 user changes someone else's schedule |
| R3 | TC-RS-003 appointment Cancelled cannot be changed |
| R4 | TC-RS-004 reschedule under 4 hours |
| R5 | TC-RS-005 new slot just booked |

## Practice exercises

Choose a feature you are familiar with like scheduling, applying discount codes or approving refunds. Write:

1. 10 atomic business rules.
2. A decision table has at least 4 decision columns.
3. 3 Gherkin acceptance criteria.
4. A traceability table from rule to AC.

## Reference source

- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/
- IEEE/ISO/IEC 29148-2018: https://standards.ieee.org/ieee/29148/6937/
- PMI Business Analysis for Practitioners: https://www.pmi.org/shop/p-/book/business-analysis-for-practitioners-a-practice-guide/00101570601

## Conclusion

Business rule is where BA turns policy into system behavior. Decision tables are a very powerful tool to reduce misunderstandings between business, Dev and QA. If the rule is clear, has an ID, has a source, has an example and has traceability, the team will reduce a lot of useless debates during the sprint.
