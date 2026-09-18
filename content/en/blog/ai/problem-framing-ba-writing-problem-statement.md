---
id: 02760001-ba01-4001-a001-000000000002
title: "Problem Framing for BA: How to Write a Problem Statement That Doesn't Waste a Sprint"
slug: problem-framing-ba-writing-problem-statement
excerpt: >-
  The most common BA mistake is jumping straight to a solution before understanding the problem. Learn how to write problem statements around business outcomes, distinguish problem vs symptom vs solution, and apply the SCQ framework to frame things correctly from day one.
featured_image: /images/blog/problem-framing-ba.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-05-05T08:30:00.000000Z'
created_at: '2026-05-05T08:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Requirements, slug: requirements}, {name: Product, slug: product}]
comments: []
---

"We need to build an AI chatbot for customer support."

Sound familiar? This is the **wrong** way to start a project. And it's the number one reason teams finish building something and still leave the business unsatisfied.

A great BA doesn't start with the **solution** — they start with the **problem**.

---

## 1. Problem, Symptom, Solution — Three Different Things

Understanding this distinction is the foundation of all business analysis:

| | Example |
|---|---|
| **Symptom** | "Customers are complaining a lot on social media" |
| **Problem** (root cause) | "Average ticket resolution time is 4 days, twice that of competitors" |
| **Solution** | "Build an AI chatbot to automatically handle 60% of simple tickets" |

Many BAs receive a **symptom** from a stakeholder and jump straight to a **solution**, skipping the step of analyzing the real **problem**.

The result: building the right solution for the **wrong problem**.

---

## 2. SCQ Framework — A Structure for Effective Problem Statements

McKinsey uses the **Situation → Complication → Question** framework to frame problems. Applied to BA:

### Situation (current state)
Describe the current state, who is affected, and the scale of impact.

> *"The customer support team currently handles 2,000 tickets/day with 15 agents."*

### Complication (what's going wrong)
Pinpoint exactly what is happening, with data where available.

> *"First Contact Resolution (FCR) rate is only 45%, while the industry benchmark is 70%. Each ticket requires an average of 1.8 rework cycles."*

### Question (the question to answer)
Pose a question that leads toward a direction — **not** a predetermined answer.

> *"How do we increase FCR to ≥ 65% by Q3 without adding headcount?"*

---

## 3. Checklist: What Makes a Good Problem Statement?

After writing one, run through this check:

- [ ] Contains measurable data (%, $, days, occurrences...)
- [ ] Describes **business impact** (not just symptoms)
- [ ] Does **not** name a specific solution
- [ ] Can be read aloud to stakeholders and they agree it describes their problem
- [ ] Identifies **who is affected** and **at what scale**

---

## 4. Real Example: Before and After Proper Framing

### ❌ Before (solution-first)
> "We need to integrate AI into the customer onboarding process to automate it."

### ✅ After (problem-first)
> "Onboarding completion rate within the first 7 days is only 38%, against a target of 60%. Analysis shows 62% of customers drop off at the document verification step due to the manual process taking 2–3 days. The goal is to reduce verification time to under 4 hours to improve completion rate to 55% by Q2."

---

## 5. The "5 Whys" Technique to Get to Root Causes

When you receive a request, ask "why?" five times:

1. "Need to build a chatbot" → **Why?** → "Because the support team is overwhelmed"
2. "Support team overwhelmed" → **Why?** → "Because ticket volume grew 40% in 6 months"
3. "Tickets grew 40%" → **Why?** → "Because the new product launched with many UX bugs"
4. "Many UX bugs" → **Why?** → "Because no usability research was done before launch"

**The real problem:** lack of user research, not lack of a chatbot.

> When you use 5 Whys, you may discover the real solution is far simpler and cheaper than the original request.

---

## 6. Problem Framing in an AI Context

For AI features, add one more layer of framing: **is AI actually necessary?**

Before agreeing to build an AI solution, the BA must ask:

- Can this problem be solved with simpler rule-based logic instead?
- Is the data needed to train/fine-tune AI available and of sufficient quality?
- If the AI is wrong, what is the impact on users and the business?
- What is the ROI of AI compared to a traditional solution?

AI isn't always the right answer. And the BA is the person expected to ask these questions.
