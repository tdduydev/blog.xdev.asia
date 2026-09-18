---
id: 02760001-ba02-4001-a002-000000000001
title: 'SDLC, BABOK and Agile/Scrum for BA: How to learn without getting confused?'
slug: sdlc-babok-agile-scrum-cho-ba
excerpt: >-
  New BAs often learn BABOK, SDLC, Scrum, BRD, SRS, and user stories in pieces,
  so it's easy to get confused. This article maps the whole thing into a
  practical work flow from idea to release.
featured_image: /images/blog/babok-guide-ba.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T09:10:00.000000Z'
created_at: '2026-05-06T09:10:00.000000Z'
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
  - name: SDLC
    slug: sdlc
  - name: BABOK
    slug: babok
  - name: Agile
    slug: agile
  - name: Scrum
    slug: scrum
comments: []
locale: en
---
A very common mistake in studying BA is to study in pieces:

- Learned BABOK but don't know how to use it in sprints.
- Learned Scrum but thought BA only wrote user stories.
- Learn SDLC but don't know what artifact each stage needs.
- Learn SRS but don't know when you need SRS and when you just need stories.

This article is compiled into an easy-to-understand map.

## 1. SDLC is the "pathway" of software

SDLC (Software Development Life Cycle) describes the software development life cycle. Stage names can vary from company to company, but the general logic is usually:

1. Idea / Need
2. Discovery
3. Requirements
4. Design
5. Development
6. Testing
7. Release
8. Operation / Evaluation

The BA role is not just in the Requirements phase. BA touches almost the entire lifecycle:

| SDLC stage | What BA needs to do |
|---|---|
| Idea / Need | Clarify problem, goal, stakeholders, metrics |
| Discovery | Interview, workshop, process analysis, current/future state |
| Requirements | BRD, SRS, user stories, AC, NFR, business rules |
| Design | Review wireframes, BPMN/UML, API/data impact |
| Development | Clarify requirements, manage change requests |
| Testing | Supports test scenarios, defect triage, UAT |
| Release | Go/no-go, training, release notes, readiness |
| Evaluation | KPI, benefit tracking, optimization backlog |

## 2. BABOK is "BA career knowledge set"

BABOK is not a hard process. BABOK is the body of knowledge: a collection of concepts, tasks, techniques and competencies that BA uses depending on the context.

The 6 knowledge areas in BABOK can be mapped into the SDLC as follows:

| BABOK Knowledge Area | Used in SDLC |
|---|---|
| Planning & Monitoring | From start to finish project |
| Elicitation & Collaboration | Discovery, requirements, UAT |
| Requirements Life Cycle Management | Requirements, development, change control |
| Strategy Analysis | Idea, discovery, business case |
| Requirements Analysis & Design Definition | Requirements, design, backlog |
| Solution Evaluation | Operation, evaluation, optimization |

Simply put: SDLC tells you **where** you are. BABOK tells you **which BA technique to use**.

## 3. Agile/Scrum is "the way delivery works"

In a Scrum environment, work is divided into sprints. The Product Backlog is a to-do list, the Product Owner is responsible for maximizing value, and the Scrum Team is responsible for creating valuable Increments.

BA is not an official role in the Scrum Guide, but BA is often deeply involved:

- Support PO to clarify Product Backlog Items.
- Facilitate refinement with Dev/QA/UX.
- Write or review acceptance criteria.
- Clarify dependency, assumption, risk.
- Support UAT and stakeholder feedback.

Point to remember: in Scrum, requirements do not have to be written from the beginning. But "not writing everything from the beginning" does not mean "writing superficially". Requirement needs to be clear enough at the right time.

## 4. Artifact map for BA

Here is the actual artifact map:

| When | Artifact | Level of detail |
|---|---|---|
| Proposed initiative | Problem statement | 1 page |
| Need budget | Business cases | 1-5 pages |
| Discovery | Stakeholder map, process map | Enough to align |
| Before build | BRD/SRS or lightweight spec | Depending on complexity |
| Agile delivery | Epic, story, AC, DoR/DoD | According to sprint |
| There are many requirements | RTM | Trace table |
| Yes UI | Wireframes, prototype notes | Low or mid fidelity |
| Has integration | API/data impact notes | Field, endpoint, error |
| Test/UAT | Test scenarios, UAT plan | Business readable |
| Go-live | Release readiness checklist | Go/no-go |
| After launch | KPI report, benefit tracking | 30/60/90 days |

## 5. Waterfall, Agile, Hybrid: What does BA do differently?

### Waterfall / plan-driven

Suitable when:
- Scope is relatively stable.
- High compliance.
- Contract needs a clear baseline.
- Multiple vendors or multiple legacy systems.

BAs often write more detailed documents: BRD, SRS, RTM, sign-off formal.

### Agile

Suitable when:
- The product needs to learn quickly from the user.
- Scope changed.
- Cross-functional teams.
- Release incremental.

BAs often write lightweight artifacts: epic, story, AC, flow diagram, decision log.

### Hybrid

Very popular in businesses:
- Discovery and governance can be formal.
- Delivery runs in sprints.
- Release has clear UAT and sign-off.

BA needs to be flexible: don't force everything into pure Scrum or pure Waterfall.

## 6. Definition of Ready and Definition of Done

These two concepts make it easier for BA to talk to Dev/QA.

### Definition of Ready for story

Story is ready for sprint when:

- Has clear business value.
- Scope is small enough.
- Acceptance criteria testable.
- Dependency has been stated.
- Data/API impact has been checked.
- UI/wireframe available if needed.
- The relevant NFR is clear.
- Open questions no longer have blockers.

### Definition of Done for increment

A job is only "done" when:

- Code completed.
- Test pass.
- AC pass.
- NFR critical is not violated.
- Documentation/release notes are updated if necessary.
- Product/BA/QA reviewed according to team conventions.

The BA does not own the Definition of Done alone, but the BA should help the team ensure DoD reflects true business quality.

## 7. Short case study

Feature: Customers schedule consultation online.

**Idea**
- Problem: many customers call the hotline just to make an appointment, causing overload.
- Metric: 30% reduction in scheduling calls for 3 months.

**Discovery**
- Stakeholder: customer, call center, consultant, admin.
- Process: select service -> select empty calendar -> enter information -> confirm -> receive calendar reminder.

**Requirements**
- BRD: goal, scope, reschedule/cancellation policy.
- SRS: booking status, validation, notification, permission.
- Story: As a customer, I want to reschedule my appointment...
- AC: Given/When/Then for bookings, cancellations, overlapping schedules, and overdue dates.

**Design**
- Wireframe booking flow.
- API impact: GET available slots, POST booking, PATCH reschedule.

**Testing/UAT**
- UAT scenarios: booking successful, slot running out, cancellation close to time, consultant rescheduling.

**Evaluation**
- Dashboard: online booking number, hotline calls, no-show rate.

## 8. Practice exercises

Create a table with 8 SDLC lines. For each line, enter:

- THREE activities
- Artifact
- Reviewer
- Risky if ignored

Then choose a feature you know and fill it in. If you can't fill it in, it's a gap that needs studying.

## End-to-end example according to SDLC: appointment booking

| Phase | What do BAs do | Sample Artifact | Who reviews |
|---|---|---|---|
| Discover | Interview customer service staff, consultants, sales managers; Get double booking/no-show data. | Problem statement, stakeholder map, current-state BPMN. | Ops Lead, PO. |
| Analyze | Compare 3 options: upgrade sheet, buy scheduling tool, build in customer portal. | Business case, option analysis, risk log. | PO, Engineering Lead, Finance. |
| Define | Closing MVP scope: search slot, book, reschedule, cancel, notification. | BRD lightweight, SRS, business rules, NFR. | Business stakeholders, Dev, QA. |
| Design | Review wireframe, sequence API, state appointment diagram. | Wireframe notes, API/data contract, state transition table. | UX, Dev, QA. |
| Build | Clarify tickets during the sprint, handle changes and open questions. | Jira stories, AC, decision log. | Scrum team. |
| Test | Mapping AC to test scenarios, supporting defect triage. | Test scenario matrix, defect triage notes. | QA, BA, PO. |
| Release | UAT preparation, customer service training, go/no-go. | UAT plan, readiness checklist, release notes. | PO, Ops, Support. |
| Evaluate | Compare post-release metrics with objectives. | Benefits realization report. | Product, Business sponsor. |

A story that is "Ready" enough before the sprint:

```gherkin
Feature: Customer books a consultation slot

Business value:
- Reduce hotline booking calls
- Prevent double booking

Rules:
- BR-001: A confirmed slot cannot be booked by another customer
- BR-002: Customer can reschedule only if appointment starts in more than 4 hours

Acceptance criteria:
Scenario: Book available slot
  Given the customer selects an available slot
  When the customer confirms the booking
  Then the appointment status is Confirmed
  And the selected slot is locked
  And confirmation email is sent within 1 minute
```

Here's how to connect BABOK, SDLC and Scrum: BABOK helps BA know which analysis activities to do; The SDLC shows where the activity is located; Scrum helps package output into backlog items that can be built/tested.

## Reference source

- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/
- PMI Business Analysis for Practitioners: https://www.pmi.org/shop/p-/book/business-analysis-for-practitioners-a-practice-guide/00101570601
- Scrum Guide 2020: https://scrumguides.org/scrum-guide.html
- IEEE/ISO/IEC 29148-2018: https://standards.ieee.org/ieee/29148/6937/

## Conclusion

If you have to remember one sentence: **SDLC is the life cycle, BABOK is the body of knowledge, Scrum is the way to operate delivery**. Good BAs don't study them as three separate subjects. Good BAs know how to use the right things, at the right time, at the right level of detail.
