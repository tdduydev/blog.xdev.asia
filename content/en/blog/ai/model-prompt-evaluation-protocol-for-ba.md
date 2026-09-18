---
id: 02760001-ba01-4001-a003-000000000006
title: "Model & Prompt Evaluation Protocol: How BA Should Evaluate AI Output"
slug: model-prompt-evaluation-protocol-for-ba
excerpt: >-
  BA should not evaluate AI by intuition like "the output looks okay". You need a
  clear protocol: evaluation criteria, scoring rubric, blind test methodology, and a
  go/no-go framework. A full guide from test set design to sign-off decisions.
featured_image: /images/blog/model-evaluation-protocol.webp
type: blog
reading_time: 14
view_count: 0
meta: null
published_at: '2026-05-05T12:30:00.000000Z'
created_at: '2026-05-05T12:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Model Evaluation, slug: model-evaluation}, {name: AI Testing, slug: ai-testing}, {name: Quality, slug: quality}, {name: AI, slug: ai}]
comments: []
---

When Dev says "the model reached 89% accuracy," BA should immediately ask: **89% on which dataset? Labeled by whom? Is it representative of production data?** Without a clear protocol, 89% may mean nothing.

---

## 1. Why BA Need an Evaluation Protocol

Model evaluation is not only an ML engineer task. BA must participate because:

- **Acceptance criteria** must be verified using a pre-agreed methodology
- **Bias detection** requires domain context BA often has while ML engineers may not
- **Business context** determines which errors are acceptable (false positive vs false negative)

---

## 2. Designing the Evaluation Test Set

### 2.1 Test Set Principles

| Principle | Description | Example |
|---|---|---|
| **Representative** | Distribution similar to production | 60% routine / 30% edge cases / 10% rare |
| **Independent** | No overlap with training data | Use newest period not used in training |
| **Labeled by domain experts** | Not self-labeled | BA + SME co-label |
| **Sufficient size** | Large enough for statistical significance | Minimum 200 cases/class |

### 2.2 Test Set Composition Template

```markdown
## Test Set: [AI Feature Name] v[X]

### Distribution Plan
| Category | Count | % | Source |
|----------|-------|---|--------|
| Normal cases | 300 | 60% | [system/period] |
| Edge cases | 150 | 30% | [curated by BA] |
| Adversarial | 50 | 10% | [red-team results] |
| **Total** | **500** | **100%** | |

### Label Protocol
- Labeler 1: [BA Name] (domain)
- Labeler 2: [SME Name] (subject matter)
- Conflict resolution: [Process when labels disagree]
- Inter-annotator agreement target: >= 0.85 (Cohen's Kappa)
```

---

## 3. Evaluation Criteria Framework

### 3.1 Choose the Right Metrics by Problem Type

| Problem Type | Metrics BA Should Request | When Critical |
|---|---|---|
| Binary classification | Accuracy, Precision, Recall, F1 | When class imbalance exists |
| Multi-class | Macro F1, Confusion Matrix | When all classes are equally important |
| Generation (chatbot) | BLEU, ROUGE, Human eval | When text quality matters |
| Ranking/Retrieval | NDCG, MRR | When order matters |
| Business metric | Human override rate, first-time-right rate | **Always add these** |

### 3.2 False Positive vs False Negative Trade-off

BA should decide this with stakeholders:

| | False Positive | False Negative |
|---|---|---|
| **Definition** | AI says "yes" but reality is "no" | AI says "no" but reality is "yes" |
| **Example (fraud detection)** | Blocks valid transaction | Misses fraudulent transaction |
| **Business cost** | Customer complaints, lost revenue | Financial loss, reputational risk |
| **Reduce first?** | When CX is more important | When risk/safety is more important |

---

## 4. Evaluation Scoring Rubric

For AI generation (chatbot, summarization), use a rubric in addition to automated metrics:

```markdown
## Evaluation Rubric: [Chatbot Feature]

### Dimension 1: Accuracy (0-5)
- 5: Fully accurate information
- 4: Accurate with 1-2 minor errors
- 3: Mostly correct but with notable mistakes
- 2: Many inaccuracies or important omissions
- 1: Mostly wrong or irrelevant
- 0: Complete hallucination

### Dimension 2: Relevance (0-5)
[Similar scale]

### Dimension 3: Safety (0/3/5 — non-linear)
- 5: Fully safe
- 3: Includes warning-level issues but no harm
- 0: Contains harmful content -> AUTO FAIL

### Overall Score = (D1 x 0.4) + (D2 x 0.3) + (D3 x 0.3)
### Pass threshold: >= 3.5 out of 5
```

---

## 5. Go/No-Go Framework

```markdown
## Evaluation Sign-off: [Feature] [Date]

### Metric Results
| Metric | Target | Actual | Pass? |
|--------|--------|--------|-------|
| Accuracy on test set | >= 87% | [X]% | ☐ |
| F1 Score (edge cases) | >= 0.75 | [X] | ☐ |
| Human eval score | >= 3.5/5 | [X] | ☐ |
| False negative rate | <= 5% | [X]% | ☐ |
| Red-team: no critical failure | 100% pass | [X]% | ☐ |

### Decision
- [ ] **GO** — All metrics pass, proceed to UAT
- [ ] **CONDITIONAL GO** — [X] metrics pass, [Y] requires post-launch monitoring
- [ ] **NO-GO** — [Specific reason], requires [Action] before re-evaluation

### Sign-off
- BA: _________________ Date: _______
- PM: _________________ Date: _______
- Tech Lead: __________ Date: _______
```

---

## 6. Common Mistakes in Model Evaluation

**Mistake 1: Evaluating on training data**  
-> Causes undetected overfitting; BA must request a separate test set

**Mistake 2: Using only one metric**  
-> 90% accuracy may still mean minority class recall = 0%

**Mistake 3: No human baseline**  
-> "AI got 85%" compared to what? How accurate are human annotators?

**Mistake 4: No cohort-based testing**  
-> Overall accuracy looks fine while customer group X is unfairly impacted

---

## Conclusion

An evaluation protocol is a **contract between BA and engineering** that defines when an AI feature is good enough to release. This document should exist BEFORE model development starts, not after build completion.
