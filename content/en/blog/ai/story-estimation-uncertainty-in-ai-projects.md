---
id: 02760001-ba01-4001-a003-000000000010
title: "Story Estimation & Uncertainty: How BA Estimates Story Points When AI Features Are Unpredictable"
slug: story-estimation-uncertainty-in-ai-projects
excerpt: >-
  AI stories are harder to estimate than regular features because they depend on
  data readiness, model iterations, and experiment uncertainty. A guide to adapted
  Planning Poker for AI work, 3-point estimation, spike stories, and how to
  communicate uncertainty to stakeholders.
featured_image: /images/blog/story-estimation-uncertainty.webp
type: blog
reading_time: 11
view_count: 0
meta: null
published_at: '2026-05-05T14:30:00.000000Z'
created_at: '2026-05-05T14:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Estimation, slug: estimation}, {name: Agile, slug: agile}, {name: Story Points, slug: story-points}, {name: AI, slug: ai}]
comments: []
---

"How many points should we estimate for this story?" — Easy for a standard CRUD feature. But for an AI feature, the answer is usually "it depends" — and that's not what stakeholders want to hear.

---

## 1. Why Are AI Stories Harder to Estimate?

AI work has 3 sources of uncertainty that regular features don't:

| Source of Uncertainty | Example | Impact |
|---|---|---|
| **Data readiness** | Data pipeline isn't ready yet | Blocks the entire story |
| **Model performance** | Will accuracy meet the threshold? | Requires more iteration |
| **Experiment branching** | Approach A fails, have to redo with approach B | Sprint scope changes |

---

## 2. Story Types in an AI Project

Distinguish 3 types of stories to estimate correctly:

### Type 1: Standard Implementation Story
Feature is well-defined, AI role is already designed:
```
"As an agent, I want to see AI suggestion in review UI 
 [UI already designed, API spec available]"
```
→ Estimate normally using Planning Poker

### Type 2: Spike Story (Research Story)
Approach unknown, needs investigation first:
```
"Spike: Evaluate 3 embedding models for customer query classification.
 Timebox: 2 days. Output: Recommendation doc."
```
→ Do not estimate story points — fixed timebox  
→ Output of Spike = input to estimate the Implementation story

### Type 3: Experiment Story
Needs to run experiments; outcome is uncertain:
```
"Experiment: Test GPT-4o-mini vs Claude Haiku for ticket categorization.
 Success criterion: Either model reaches 87% accuracy.
 Timebox: 3 days. If neither passes → escalate to team."
```
→ Timebox + success criterion, not story points

---

## 3. Adapted Planning Poker for AI Stories

### 3.1 Add an "Uncertainty Dimension" to the Estimate

Traditional Planning Poker: 1 number (effort)  
AI Adapted: 2 numbers (effort × confidence)

```
Estimate format: [Points] / [Confidence: H/M/L]

Example:
- Dev 1: "8 / M" — 8 points but medium confidence
- Dev 2: "13 / L" — 13 points with low confidence (many unknowns)
- BA: "5 / H" — 5 points, high confidence (requirements are clear)
```

When there's a large divergence → discuss the source of uncertainty before re-estimating.

### 3.2 Uncertainty Breakdown Discussion

When confidence is low, ask the team:
```
1. "Which part of this story is unclear?"
2. "What unknowns need to be resolved before we can estimate?"
3. "Do we need a Spike, or can we estimate with a buffer?"
```

---

## 4. Three-Point Estimation (PERT)

When uncertainty is high but you don't want a Spike, use 3-point estimation:

```
O = Optimistic (everything goes right)
M = Most Likely (normal conditions)
P = Pessimistic (things go wrong)

E (Expected) = (O + 4M + P) / 6

Example: AI model integration story
O = 3 days (API works as documented)
M = 5 days (1 round of debugging)
P = 10 days (API has bugs, need workaround)

E = (3 + 4×5 + 10) / 6 = (3 + 20 + 10) / 6 = 5.5 days
```

Report to stakeholder: "**Expected 5–6 days**, range 3–10 days depending on API stability"

---

## 5. Communicating Uncertainty to Stakeholders

### Principle: Commit to a range, not a precise point

**Avoid:**
```
"This feature will be done in sprint 3" (unsubstantiated)
```

**Say instead:**
```
"This feature has 3 parts:
1. UI implementation: High confidence, sprint 3 ✅
2. API integration: Medium confidence, sprint 3–4
3. Model accuracy validation: Low confidence — need Spike sprint 3, 
   re-estimate after Spike"
```

### Uncertainty Communication Template

```markdown
## Feature Estimate: [Feature Name]

### Confident Scope (commit)
- [Component 1]: X points — clear requirements ✅
- [Component 2]: Y points — proven tech ✅

### Uncertain Scope (indicative)
- [Component 3]: ~Z points — pending data validation
- [Component 4]: Need Spike first (2 days timebox)

### Dependencies / Blockers
- [ ] Data pipeline from [team] needed by [date]
- [ ] Model threshold confirmed by [stakeholder]

### Recommended Approach
Sprint N: Spike + Confident scope
Sprint N+1: Uncertain scope (estimate after Spike)
```

---

## 6. Definition of Ready for AI Stories

A story is ready to estimate when:
- [ ] Data dependency identified and confirmed available (or spike planned)
- [ ] AI/model approach confirmed (or spike planned for approach)
- [ ] Acceptance threshold agreed with stakeholder
- [ ] Fallback behavior defined

---

## Conclusion

Estimation accuracy matters less than **estimation honesty**. The BA's role in AI estimation is to structure uncertainty, propose Spikes when needed, and set realistic expectations with stakeholders — not to force a precise number out of thin air.

An AI team's sprint velocity is typically 20–30% lower than a traditional feature team due to Spike work. Build this into capacity planning from the start.
