---
id: 02760001-ba01-4001-a021-000000000001
title: "Business Requirements Checklist: A BA Checklist for Business Requirements"
slug: business-requirements-checklist-for-ba
excerpt: >-
  A business requirements checklist helps BA ensure that no critical condition is
  missed before handoff to the dev team. This article provides a full checklist
  for BA working on AI projects - from functional requirements to AI-specific
  constraints.
featured_image: /images/blog/business-requirements-checklist.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-05-05T09:00:00.000000Z'
created_at: '2026-05-05T09:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Requirements, slug: requirements}, {name: Checklist, slug: checklist}, {name: Business Analysis, slug: business-analysis}]
comments: []
---

One of the most common reasons projects fail is **incomplete requirements** - not because the BA failed to ask questions, but because there is no consistent framework to ensure every angle is covered. A business requirements checklist solves that problem.

## Why use a Checklist?

- **Cognitive load**: BA have to juggle many things at once -> details are easy to miss
- **Consistency**: Ensure every project is analyzed against the same standard
- **Handoff quality**: The dev team receives complete requirements -> fewer interruptions, less rework
- **Audit trail**: Evidence that the requirements were reviewed thoroughly

## Checklist Part 1: Business Context

### ✅ Problem Definition
- [ ] Problem statement is written clearly (What, Who, When, Impact)
- [ ] Root cause has been analyzed (not just symptoms)
- [ ] Business objectives are linked to organizational goals
- [ ] Success metrics are defined and measurable (SMART)
- [ ] Scope boundaries are clear - in-scope and out-of-scope

### ✅ Stakeholder Analysis
- [ ] All stakeholders have been identified (primary, secondary, key decision makers)
- [ ] RACI matrix has been created
- [ ] Stakeholder concerns and pain points have been documented
- [ ] Communication plan for each stakeholder group
- [ ] Sign-off authority has been defined clearly

### ✅ Assumptions & Constraints
- [ ] All business assumptions are recorded
- [ ] Technical constraints have been documented
- [ ] Regulatory/compliance constraints have been checked
- [ ] Budget and timeline constraints
- [ ] Resource constraints (team size, available skills)

## Checklist Part 2: Functional Requirements

### ✅ User Stories & Use Cases
- [ ] Each user story includes: Who (As a...) + What (I want...) + Why (So that...)
- [ ] Acceptance criteria follow the INVEST standard (Independent, Negotiable, Valuable, Estimable, Small, Testable)
- [ ] Happy path is fully documented
- [ ] Alternative flows (alternative paths) are covered
- [ ] Exception flows (error scenarios) are defined

### ✅ Business Rules
- [ ] All business rules are written explicitly (not implicit)
- [ ] Conditional logic is expressed clearly (if-then-else)
- [ ] Edge cases have been considered
- [ ] Conflicts between business rules have been resolved
- [ ] Business rules are traced to regulatory requirements (if any)

### ✅ Data Requirements
- [ ] Input data is defined (source, format, frequency)
- [ ] Output data is defined (destination, format, timing)
- [ ] Data validation rules are specified
- [ ] Data volume and peak load have been estimated
- [ ] Data retention policy has been defined

## Checklist Part 3: Non-Functional Requirements

### ✅ Performance
- [ ] Response time expectations are defined (p50, p95, p99)
- [ ] Throughput requirements (requests/second, transactions/day)
- [ ] Concurrent users estimate
- [ ] Peak load scenarios are documented

### ✅ Security & Compliance
- [ ] Authentication requirements (SSO, MFA, etc.)
- [ ] Authorization model (RBAC, ABAC)
- [ ] Data classification (PII, sensitive, public)
- [ ] Compliance requirements check (GDPR, HIPAA, local regulations)
- [ ] Audit logging requirements
- [ ] Data encryption requirements (at rest, in transit)

### ✅ Usability
- [ ] Target user personas are defined
- [ ] Accessibility requirements (WCAG level)
- [ ] Supported devices and browsers
- [ ] Language and localization requirements
- [ ] Onboarding and help documentation needs

### ✅ Reliability & Availability
- [ ] SLA requirements (uptime %)
- [ ] Recovery time objective (RTO)
- [ ] Recovery point objective (RPO)
- [ ] Disaster recovery requirements
- [ ] Maintenance window constraints

## Checklist Part 4: AI-Specific Requirements

This is the most important checklist section for BA working on AI projects - and often the one most frequently missed.

### ✅ AI Model Behavior
- [ ] Expected outputs are defined clearly (format, type, range)
- [ ] Confidence threshold is specified (when human review is required)
- [ ] Fallback behavior when the model is uncertain
- [ ] How edge cases and out-of-distribution inputs are handled
- [ ] Acceptable error rate is approved by stakeholders

### ✅ Human-in-the-Loop Requirements
- [ ] Escalation triggers are defined (when AI hands off to a human)
- [ ] Human review workflow is specified
- [ ] Override mechanism (human can override AI decision)
- [ ] Audit trail for AI decisions is required
- [ ] Labeling/feedback mechanism if continuous learning is needed

### ✅ AI Fairness & Ethics
- [ ] Demographic groups affected by the AI decision are identified
- [ ] Fairness metrics are defined (equal accuracy across groups?)
- [ ] Bias testing plan is prepared
- [ ] Explainability requirements (is a black box acceptable?)
- [ ] Impact assessment for decisions affecting individuals

### ✅ Data & Model Quality
- [ ] Training data requirements are specified (volume, quality, freshness)
- [ ] Minimum model performance metrics are agreed with stakeholders
- [ ] Model drift monitoring requirements
- [ ] Retraining trigger conditions are defined
- [ ] Data versioning requirements

### ✅ AI-Specific Non-Functional Requirements
- [ ] Inference latency requirements (real-time vs batch)
- [ ] Model serving infrastructure constraints
- [ ] Cost per inference estimate and budget
- [ ] Versioning and rollback requirements for models

## Checklist Part 5: Process & Handoff

### ✅ Dependencies
- [ ] External system dependencies are mapped
- [ ] API integrations are documented (endpoint, contract, SLA)
- [ ] Third-party vendors/services are identified
- [ ] Team dependencies (other squads, infra team) are clarified
- [ ] Data pipeline dependencies are documented

### ✅ Testing Requirements
- [ ] UAT scenarios are written from the BA perspective
- [ ] Test data requirements are specified
- [ ] Performance test scenarios are defined
- [ ] AI model testing criteria (accuracy, precision, recall targets)
- [ ] Regression test scope is agreed

### ✅ Documentation & Traceability
- [ ] Requirements are assigned unique IDs
- [ ] Traceability matrix: Business Req -> System Req -> Test Case
- [ ] Glossary of domain-specific terms is maintained
- [ ] Requirements change log is set up
- [ ] Sign-off received from key stakeholders

## Template: Requirements Review Sign-off

Before handing over a sprint backlog, the BA should obtain sign-off using this mini checklist:

```
REQUIREMENTS REVIEW SIGN-OFF
Sprint: ___________
Feature: ___________
BA: ___________
Date: ___________

✅ Functional requirements complete & approved
✅ Acceptance criteria testable & agreed
✅ Non-functional requirements defined
✅ AI-specific requirements reviewed (nếu applicable)  
✅ Dependencies identified & communicated
✅ Out-of-scope items documented

Stakeholder Sign-off:
Product Owner: ___________  Date: ___
Tech Lead: ___________      Date: ___
QA Lead: ___________        Date: ___
```

## How to use the Checklist effectively

1. **You do not need to tick everything** - Mark items N/A when they are not applicable, and state the reason clearly.
2. **Use it as a conversation guide** - The checklist helps you remember what to ask, not as a rigid form.
3. **Adapt it to the project context** - A startup sprint is not the same as an enterprise compliance project.
4. **Review it with the team** - Do not do it alone; review with the PO and Tech Lead.
5. **Store it centrally** - Keep it in Confluence/Notion so the team can access and improve it.

## Conclusion

Checklist is not bureaucracy - it is a **quality tool** that helps BA deliver requirements with fewer errors and less rework. In AI projects, the AI-specific checklist is especially important because this is still new territory for many teams.

Start with a simple checklist, then expand it gradually based on your team's real experience. The best checklist is the one used regularly - not the longest one.