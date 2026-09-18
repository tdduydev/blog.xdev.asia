---
id: 02760001-ba01-4001-a001-000000000001
title: "BA, PO, PM and AI Engineer: Who Does What in an AI-Era Product Team?"
slug: ba-pm-po-ai-engineer-roles-in-product-team
excerpt: >-
  A clear breakdown of BA, Product Owner, Product Manager, and AI Engineer roles in a modern product team. Who writes acceptance criteria? Who decides the roadmap? Who's accountable when an AI feature goes wrong? A practical guide for BAs looking to position themselves correctly in the age of AI.
featured_image: /images/blog/ba-roles-ai-team.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-05T08:00:00.000000Z'
created_at: '2026-05-05T08:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Career, slug: career}, {name: AI, slug: ai}, {name: Product, slug: product}]
comments: []
---

As AI becomes embedded in products, many people — including seasoned BAs — are starting to feel lost: **what's my role on this team?** The AI Engineer writes prompts, the Data Scientist builds models, the PO prioritizes the backlog, the PM owns the roadmap… so where does the BA fit?

This article cuts straight to the point.

---

## 1. Role Map in an AI Product Team

First, let's look at the big picture of a team building AI features:

| Role | Core Responsibility | Decisions About |
|------|---------------------|-----------------|
| **BA** (Business Analyst) | Discover problems, gather requirements, write acceptance criteria, evaluate solutions | Are the business requirements correct? |
| **PO** (Product Owner) | Own the backlog, prioritize stories, represent the business in Agile | Which story gets built first? |
| **PM** (Product Manager) | Product strategy, go-to-market, pricing, adoption | What to build, for whom, and why? |
| **AI Engineer** | Design AI pipelines, write system prompts, integrate models | Which AI technical solution is feasible? |
| **ML Engineer / Data Scientist** | Train models, fine-tune, evaluate technical metrics | Which model performs better? |

---

## 2. BA in an AI Feature: What Exactly Do You Do?

### Before Building (Discovery)
- Interview stakeholders to understand the **real problem** — not just hear feature requests
- Write a **problem statement** backed by data (not "we need a chatbot," but "first-contact resolution rate is only 45%, 25% below target")
- Ask: is AI actually necessary here, or would a simpler rule-based approach work?

### During Build (Requirements)
- Write **user stories** and **acceptance criteria** for AI features — including edge cases and failure modes
- Define **guardrails**: when is AI allowed to respond, and when should it escalate to a human?
- Work with the AI Engineer to understand model limitations, then write realistic requirements

### After Go-Live (Evaluation)
- Evaluate the AI feature against the original business hypothesis
- Collect user feedback and synthesize it into an improvement backlog

---

## 3. The Most Common Confusion: BA vs PO

Many companies conflate BA and PO. But at their core:

**BA** = the person who digs deep into **problems** and **requirements** — outputs are analysis documents, detailed user stories, acceptance criteria, data mappings, and process flows.

**PO** = the person who manages the **backlog** and **prioritization** — outputs are a prioritized product backlog, sprint goals, and scope decisions.

In many small teams, one person wears both hats. In larger teams, the BA does deep analysis and the PO handles delivery prioritization.

---

## 4. How Much Does a BA Need to Know About AI?

You don't need to train models. You don't need to understand gradient descent. But you **must know**:

- **What hallucination is** and why it matters for acceptance criteria
- **RAG vs Fine-tuning**: when to use which, so you write the right type of requirement
- **Latency and cost**: AI isn't free — every token costs money, which affects flow design
- **Confidence threshold**: at what level does the AI become "uncertain" and require human review?
- **Data privacy**: can user inputs be used for training?

> A BA doesn't need to answer these questions — but **must know to ask them** of the technical team.

---

## 5. Summary: How Should a BA Position Themselves in the AI Era?

The AI-era BA keeps the same core — **understanding business problems more deeply than anyone else on the team** — but adds:

1. Asking the right questions about AI capabilities and limitations
2. Writing acceptance criteria for AI features (not just standard CRUD features)
3. Participating in AI output quality evaluation from a business perspective
4. Serving as the advocate for users when AI makes mistakes or causes harm

The role isn't disappearing — it's **leveling up**.
