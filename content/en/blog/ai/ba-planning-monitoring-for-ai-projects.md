---
id: 02760001-ba01-4001-a003-000000000001
title: "BA Planning & Monitoring: How to Plan and Track BA Progress in AI Projects"
slug: ba-planning-monitoring-for-ai-projects
excerpt: >-
  BA Planning is not just filling in scope in a template. In AI projects, the BA plan
  must include iterative checkpoints, assumption tracking for data/model behavior,
  and escalation paths when AI feature output drifts from requirements. A practical
  guide with a BA Monitoring Framework.
featured_image: /images/blog/ba-planning-monitoring.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-05T10:00:00.000000Z'
created_at: '2026-05-05T10:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Planning, slug: planning}, {name: Project Management, slug: project-management}, {name: AI, slug: ai}]
comments: []
---

BA Planning in AI projects is fundamentally different from traditional projects in one core way: **requirements are static, but AI output is probabilistic**. That means your plan needs validation loops, not only linear milestones.

---

## 1. BA Planning Framework for AI Projects

### 1.1 Scope Definition with AI Boundaries

Before planning, BA must clearly define:

| Component | Questions to Answer | Example |
|---|---|---|
| **AI Scope** | Which part of the flow does AI handle? | "AI auto-classifies 70% of tickets" |
| **Human Scope** | Which cases are reviewed by humans? | "Tickets with confidence < 0.8 -> escalate" |
| **Data Dependency** | What data is needed for AI to work correctly? | "6 months of labeled ticket history" |
| **Acceptance Threshold** | When is the AI feature considered "done"? | "Accuracy >= 85% on test set" |

### 1.2 WBS for AI Features

Work Breakdown Structure for an AI feature has 5 work groups:

```
AI Feature: [Feature Name]
├── 1. Data & Requirements
│   ├── 1.1 Data audit (schema, volume, quality)
│   ├── 1.2 Elicitation with stakeholders
│   └── 1.3 Acceptance criteria drafting
├── 2. Design & Modeling
│   ├── 2.1 Flow diagram (happy + fallback path)
│   ├── 2.2 Prompt/model design review
│   └── 2.3 HITL escalation design
├── 3. Development Checkpoint
│   ├── 3.1 Prototype review (BA + Dev)
│   └── 3.2 Edge case identification
├── 4. Testing & Validation
│   ├── 4.1 UAT script writing
│   ├── 4.2 Bias & fairness check
│   └── 4.3 Performance baseline
└── 5. Go-live & Monitoring
    ├── 5.1 Go-live criteria sign-off
    └── 5.2 Post-launch tracking setup
```

---

## 2. Iterative Checkpoints, Not Waterfall

AI projects usually run with Agile/Sprints. BA should embed checkpoints into each sprint:

### Sprint Planning Checklist (BA perspective)
- [ ] Is data ready for this sprint? (not "will be ready")
- [ ] Are acceptance criteria written in Given/When/Then format?
- [ ] Has fallback path been reviewed with Dev?
- [ ] Did thresholds change compared to the previous sprint?

### Mid-Sprint Check (day 5-7)
- [ ] Is AI output meeting expected thresholds?
- [ ] Are new edge cases appearing?
- [ ] Which assumptions should be updated in ADR (Architecture Decision Record)?

---

## 3. BA Monitoring: Tracking After AI Goes to Production

Many BA think work ends at go-live. Incorrect. For AI features, BA must set up a monitoring framework:

### 3.1 Metrics to Track

| Metric Type | Specific Metric | Alert Threshold |
|---|---|---|
| **Quality** | Accuracy / F1 / Precision | Drop > 5% vs baseline |
| **Business** | Human override rate | Increase > 20% vs week 1 |
| **Volume** | Requests per day | Sudden spike > 3x |
| **Feedback** | User complaint rate | > 2% of total requests |

### 3.2 Drift Detection

AI models can suffer **concept drift**: the world changes while the model still learns from old data. BA should:

1. **Define the baseline** in the final sprint before go-live
2. **Set re-evaluation triggers** (monthly, or when metrics drop)
3. **Assign clear ownership**: who is responsible when AI drifts? (RACI)

---

## 4. Practical BA Planning Template

```markdown
## BA Plan: [Feature Name]
**Version:** 1.0 | **Date:** YYYY-MM-DD | **Owner:** [BA Name]

### Scope Summary
- AI handles: [short description]
- Human handles: [short description]
- Out of scope: [explicit list]

### Data Dependencies
| Data | Source | Owner | Status |
|------|--------|-------|--------|
| [data1] | [system] | [team] | ✅/❌ |

### Acceptance Criteria (top-level)
- [ ] AI accuracy >= [X]% on [Y] test cases
- [ ] Edge case coverage: [list] handled
- [ ] Human override rate <= [Z]%

### Monitoring Setup
- Dashboard: [link]
- Alert owner: [name]
- Review cadence: [weekly/monthly]
```

---

## 5. Common BA Planning Mistakes in AI

**Mistake 1: Saying "accuracy" without defining which dataset**  
-> Fix: Specify "accuracy on test set from [source], within [time range]"

**Mistake 2: Not tracking assumptions**  
-> Fix: Every assumption has ID, owner, and review date

**Mistake 3: Treating AI feature like normal feature; done means done**  
-> Fix: Add "Post-launch monitoring period: 4 weeks" to Definition of Done

---

## Conclusion

Effective BA Planning for AI features is not more complicated, but it requires **probabilistic thinking instead of binary thinking**. A good plan includes assumption-validation loops, clear numeric thresholds, and post-launch monitoring.

**Next step:** Read [Strategy Analysis](/blog/strategy-analysis-swot-pestle-for-ba) to learn how to analyze context before planning.
