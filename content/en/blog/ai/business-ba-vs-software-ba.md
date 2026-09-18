---
id: 02760001-ba02-4001-a001-000000000001
title: >-
  Business BA vs Software BA: What's the difference and what do you need to
  learn?
slug: business-ba-vs-software-ba
excerpt: >-
  Business BA and Software BA have many intersections but are not the same. This
  article explains the role, artifacts, skills, daily work examples, and
  learning paths so you know which direction you need to take.
featured_image: /images/blog/roadmap-ba-featured.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-05-06T09:00:00.000000Z'
created_at: '2026-05-06T09:00:00.000000Z'
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
  - name: Business Analysis
    slug: business-analysis
  - name: Software BA
    slug: software-ba
  - name: Career
    slug: career
comments: []
locale: en
---
Many new BA students often ask: "Is Business Analyst a business BA or a software BA?" The actual answer is: **both are BA**, but the scope and artifact depth are different.

If you misunderstand these two roles, it is easy to learn incorrectly. Some people learn too many Jira tools but don't understand the business. There are people who write very good business processes, but when they join the software team, they don't know what SRS, API, UAT, defect triage are.

This article helps you see more clearly.

## 1. What is BA?

THREE operations focus on **business problems**:

- What problems is the business facing?
- Where is the current process stuck?
- Who are the main stakeholders?
- What policies, regulations, and KPIs influence the decision?
- Does the solution create real value?

For example, an insurance company wants to reduce claim processing time from 5 days to 2 days. BA will analyze the current claims process, interview case processing staff, find bottlenecks, define the future process and propose directions for improvement.

Common Artifacts:

| Artifact | What to use |
|---|---|
| Stakeholder map | Know who influences, who decides, who needs to be asked |
| Current state / future state | Compare current process and desired process |
| Business cases | Explain why you should invest |
| Capability map | See which organizations lack capacity |
| Policy / rules catalog | Record business regulations |

## 2. What is Software BA?

Software BA translates business needs into buildable and testable system requirements.

Software BA still needs to understand business, but must go one more layer:

- How should the system behave?
- Are the user stories and acceptance criteria testable enough?
- Are there NFRs on performance, security, availability, accessibility?
- Which APIs/data are affected?
- Is the error case and permission case clear?
- What scenarios will UAT verify?

For example, with the insurance problem above, Software BA will write SRS for the claim intake module: record entry screen, rule for checking missing documents, record status, notification, API to get customer information, permission to view records, audit log and UAT scenarios.

Common Artifacts:

| Artifact | What to use |
|---|---|
| SRS | Software requirements specification |
| User stories + AC | Include requirements in the Agile backlog |
| BPMN/UML | Flow modeling and system interactions |
| RTM | Trace requirements to stories and test cases |
| UAT plan | Test plan accepted by business |
| API/data notes | Specify integration and validation |

## 3. Quick comparison

| Criteria | Business BA | Software BA |
|---|---|---|
| Focus | Business outcome, process, stakeholders | System behavior, requirements, testability |
| People who work a lot | Business owner, operations, compliance, PM | PO, UX, Dev, QA, Architect, Data |
| Main Artifact | Business case, process map, rule catalog | SRS, user stories, AC, RTM, UAT |
| Techniques you need to know | Facilitation, process analysis, strategy | SDLC, API/data basics, NFR, testing |
| Frequently asked questions | "Why is it necessary to change?" | "What should the system do in this situation?" |

Important point: Software BA cannot quit business. If you don't understand the business goals, you're just writing a ticket. Business BA should also not avoid software if the final solution is a digital product.

## 4. A sample work day

### Business BA

Morning:
- Review operational KPIs with business owner
- Interview operations team about bottlenecks
- Draw the current process and mark pain points

Afternoon:
- Facilitate workshop to choose improvement options
- Write a 1-page business case
- Update stakeholder concerns and assumption log

### Software BA

Morning:
- Refine user stories with PO, Dev, QA
- Clarify acceptance criteria and edge cases
- Review API/data impact with Tech Lead

Afternoon:
- Update SRS, RTM, change log
- Write UAT scenarios
- Triage defects with QA and business stakeholders

## 5. Which direction should you study first?

If you're completely new, learn in this order:

1. Business analysis foundation: problem framing, stakeholders, business process.
2. Requirements engineering: BRD, SRS, business rules, acceptance criteria.
3. SDLC and Agile/Scrum: how requirements pass through the software team.
4. Modeling: BPMN, UML, wireframe, data flow.
5. Technical literacy: API, basic SQL, NFR, security/privacy.
6. Delivery: backlog refinement, UAT, defect triage, release readiness.
7. Evaluation: KPI, dashboard, benefit tracking.

If you come from QA or Dev, you have an advantage in Software BA. Add a business analysis foundation to avoid getting stuck in ticket-level thinking.

If you come from operations or business domain, you have a business advantage. Add SDLC, SRS, API/data and testing to talk seamlessly with the software team.

## 6. Practice exercises

Choose a familiar feature, for example "make an online medical appointment".

Write 2 parts:

**Business BA perspective**
- Problem statements
- Stakeholder map
- Current state process
- Future state process
- Success metrics

**Software BA perspective**
- 5 user stories
- Acceptance criteria for each story
- 5 business rules
- 5 NFRs
- 5 UAT scenarios

After this exercise, you will see two different but complementary roles.

## 7. Common errors

**Error 1: Thinking BA is just the person taking minutes**

BA doesn't just record what stakeholders say. The BA must analyze, detect conflicts, ask again, suggest options and help the team make decisions.

**Error 2: Thinking Software BA must know deep coding**

No need to code like a developer. But you need to read and understand the API contract, data fields, error codes, permission model and testing approach at a sufficient level to write clear requirements.

**Error 3: Writing requirements without tracing the business value**

Each requirement should be able to answer: what goal does it serve, what users, what metrics.

## End-to-end example: schedule an online consultation

Suppose the company has a financial consulting team. Customers are calling the hotline to make an appointment, staff are manually entering it into Google Sheet. The problem is that the schedule overlaps, the customer forgets the schedule, and the manager has no no-show data.

### Output of Business BA

| Part | Good writing examples |
|---|---|
| Problem statement | It takes customers an average of 12 minutes to make an appointment via the hotline; 18% of schedules were entered incorrectly or changed multiple times, increasing customer service load and reducing consultation participation rates. |
| Business objective | 40% reduction in hotline calls related to scheduling for 3 months; Reduce double booking to less than 1%; increased attendance from 62% to 75%. |
| Stakeholders | Customers, customer service, consultant, sales manager, compliance, IT support. |
| Current process | Customer calls hotline -> Customer service checks sheet -> asks consultant -> enters schedule -> sends email manually. |
| Future process | Customers choose consultant/slot on the web -> slot holding system -> send email/SMS -> Customer service only handles exceptions. |
| Policy | Guests can reschedule at least 4 hours before the appointment time; Cancellations under 4 hours must call the hotline. |

### Output of Software BA

| Artifact | Example |
|---|---|
| User stories | As a customer, I want to book an available consultation slot online so that I can schedule without calling hotline. |
| Acceptance criteria | Given an empty slot, when the customer confirms the appointment, then the system creates the appointment in Confirmed state and sends a confirmation email. |
| Business rules | BR-001: Confirmed slot is not displayed to other customers. BR-002: Guests can only reschedule at least 4 hours before the appointment time. |
| Data fields | appointment_id, customer_id, consultant_id, slot_id, status, channel, confirmation_code, created_at. |
| touchpoint API | `POST /appointments`, `PATCH /appointments/{id}/reschedule`, `GET /consultants/{id}/slots`. |
| Error case | If the slot has just been booked by someone else, return it `SLOT_UNAVAILABLE` and displays 3 alternate slots. |
| UAT scenarios | Customer successfully booked, rescheduled before 4 hours, try rescheduling less than 4 hours, consultant sees today's schedule. |

Point to see: Business BA helps organizations unify **problems, values ​​and processes**. Software BA helps the build team unify **behavior, data, rules, API, errors and tests**.

## Reference source

- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/
- PMI Business Analysis for Practitioners: https://www.pmi.org/shop/p-/book/business-analysis-for-practitioners-a-practice-guide/00101570601
- Scrum Guide 2020: https://scrumguides.org/scrum-guide.html

## Conclusion

Business BA helps organizations **choose the right problem**. Software BA helps teams **build the right solution**. A strong BA in digital products needs to go through both: understanding the business deeply enough to not build in the wrong direction, and understanding the software well enough so that the requirements can be deployed, tested and operated.
