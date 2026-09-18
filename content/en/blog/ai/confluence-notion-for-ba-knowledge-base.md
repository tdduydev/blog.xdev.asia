---
id: 02760001-ba01-4001-a003-000000000003
title: "Confluence & Notion for BA: Build a Standard Requirements Knowledge Base for AI Teams"
slug: confluence-notion-for-ba-knowledge-base
excerpt: >-
  BA use Confluence or Notion not just to store documents, but to create a single
  source of truth for the whole team. A guide to structuring spaces, BRD/FRD templates,
  linking requirements with Jira tickets, and managing an assumption log in AI projects.
featured_image: /images/blog/confluence-notion-ba.webp
type: blog
reading_time: 11
view_count: 0
meta: null
published_at: '2026-05-05T11:00:00.000000Z'
created_at: '2026-05-05T11:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Confluence, slug: confluence}, {name: Notion, slug: notion}, {name: Documentation, slug: documentation}, {name: AI, slug: ai}]
comments: []
---

Great BA work is not only writing requirements well; it is ensuring requirements are **findable, understandable, and not duplicated** across the project lifecycle. That is why Confluence and Notion are essential.

---

## 1. Why BA Need a Standard Knowledge Base

In AI projects, information changes quickly:
- Acceptance thresholds are adjusted after sprint reviews
- Data assumptions break when real data arrives
- New stakeholders join and need fast onboarding

Without a single source of truth -> each team member understands things differently -> expensive rework.

---

## 2. Confluence Space Structure for AI Projects

```
📁 [Product/Project Name]
├── 📄 Project Overview (purpose, stakeholders, timeline)
├── 📁 Requirements
│   ├── 📄 BRD — Business Requirements Document
│   ├── 📄 FRD — Functional Requirements Document
│   ├── 📄 Non-functional Requirements (performance, security)
│   └── 📄 Assumption Log
├── 📁 AI Specifics
│   ├── 📄 AI Feature Inventory (name, purpose, owner)
│   ├── 📄 Model Evaluation Criteria
│   ├── 📄 Data Dictionary
│   └── 📄 Bias & Fairness Checklist
├── 📁 Design
│   ├── 📄 User Journey Maps
│   ├── 📄 Flow Diagrams (BPMN/UML)
│   └── 📄 Wireframes (Figma links)
├── 📁 Testing
│   ├── 📄 UAT Plan & Scripts
│   └── 📄 Bug/Issue Log
└── 📁 Decisions
    ├── 📄 ADR Log (Architecture Decision Records)
    └── 📄 Meeting Notes
```

---

## 3. Standard BRD Template for AI Projects

```markdown
# Business Requirements Document
## [Feature Name] v[X.X]

| Field | Value |
|-------|-------|
| Author | [BA Name] |
| Status | Draft / In Review / Approved |
| Last Updated | YYYY-MM-DD |
| Stakeholders | [List] |

## 1. Problem Statement
[What problem is happening? For whom? What is the business impact?]

## 2. Business Objectives
- Objective 1: [Measurable]
- Objective 2: [Measurable]

## 3. Success Metrics
| Metric | Baseline | Target | Measurement Method |
|--------|----------|--------|--------------------|
| [metric] | [now] | [target] | [how] |

## 4. Scope
### In Scope
- [Item 1]

### Out of Scope
- [Item 1] — reason: [why]

## 5. AI-Specific Requirements
| Aspect | Requirement |
|--------|-------------|
| Accuracy Threshold | >= X% on test set Y |
| Fallback Behavior | When confidence < Z: [action] |
| Human Override | Who has authority? What trigger? |
| Data Freshness | Retraining every [period] |

## 6. Assumption Log
| ID | Assumption | Owner | Review Date | Status |
|----|-----------|-------|-------------|--------|
| A001 | [assumption] | [name] | [date] | Active/Invalid |

## 7. Constraints
- Legal: [GDPR, industry regulation]
- Technical: [API limits, data retention]
- Budget: [budget ceiling]
```

---

## 4. Linking Requirements with Jira/Azure DevOps

Best practice: **every requirement in BRD should map to a corresponding Jira ticket**.

In Confluence, use Jira macro to embed ticket status:
```
Requirements Section 3.1 -> PROJ-123 (Story: "As a user, I want...")
Acceptance Criteria 3.1.a -> PROJ-124 (Test Case)
```

When ticket status changes, Confluence updates automatically.

---

## 5. Notion as a Confluence Alternative: When to Use

| Criteria | Confluence | Notion |
|---|---|---|
| **Atlassian integration** | ✅ Native (Jira, Bitbucket) | ❌ Requires third-party |
| **AI Assistant** | ✅ Atlassian Intelligence | ✅ Notion AI is stronger |
| **Flexibility** | ⚠️ Template-heavy | ✅ Very flexible |
| **Database/Spreadsheet** | ❌ Limited | ✅ Strong (relational DB) |
| **Free tier** | ❌ Paid | ✅ Generous free tier |
| **Best for** | Enterprise, Jira-based teams | Startups, small teams |

### Notion Database for Requirement Tracking:

Create a database with properties:
- **Requirement ID** (Text)
- **Type** (Select: Functional/Non-functional/AI-specific)
- **Status** (Select: Draft/Approved/Implemented/Deprecated)
- **Priority** (Select: P0/P1/P2)
- **Linked Sprint** (Relation -> Sprint database)
- **AC Count** (Number: acceptance criteria count)

---

## 6. Common Mistakes and How to Avoid Them

**Mistake 1: Copy-pasting requirements across multiple pages**  
-> Use Confluence "Include Page" macro or Notion synced blocks

**Mistake 2: Assumptions without owner**  
-> Every row in Assumption Log must include a responsible validator

**Mistake 3: Old BRD versions not archived clearly**  
-> Use Confluence Page History and mark old pages as "ARCHIVED"

**Mistake 4: Meeting notes not linked back to impacted requirements**  
-> Meeting note template should include "Requirements Impacted: [link]"

---

## Conclusion

Confluence/Notion is the **project memory**. BA who invest early in structure save dozens of clarification hours later, especially when AI teams must explain "why the model behaved this way" six months after go-live.
