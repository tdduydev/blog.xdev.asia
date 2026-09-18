---
id: 02760001-ba01-4001-a024-000000000001
title: "Make-or-Buy Decision for BA: When to Build and When to Buy AI"
slug: make-or-buy-decision-for-ba
excerpt: >-
  Make-or-Buy is one of the most important decisions in Strategy Analysis. With
  AI, the question becomes even more complex: build a custom model, fine-tune a
  foundation model, or use an API? This article provides a framework to help BA
  analyze the options and make the right decision.
featured_image: /images/blog/make-or-buy-ai-ba.webp
type: blog
reading_time: 11
view_count: 0
meta: null
published_at: '2026-05-05T09:00:00.000000Z'
created_at: '2026-05-05T09:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Strategy Analysis, slug: strategy-analysis}, {name: AI Strategy, slug: ai-strategy}, {name: Decision Making, slug: decision-making}]
comments: []
---

"Should we build AI ourselves or buy an existing solution?" - This is a question BA will face very often in AI projects. In 2026, the AI landscape is complex enough that this is no longer a simple "build vs buy" question, but a spectrum from fully custom to turnkey solution.

## AI Solution Spectrum

```text
FULL BUILD ←————————————————————————→ FULL BUY

[Train from Scratch] → [Fine-tune Open Source] → [Fine-tune Foundation Model] → [Prompt Engineering on API] → [SaaS AI Solution]

    Cao nhất                                                                                              Thấp nhất
    (Cost, Control, Flexibility, Data Privacy)
    
    Thấp nhất                                                                                             Cao nhất
    (Speed to Market, Ease of Use, Vendor Lock-in Risk)
```

There is no single "best" answer - each point on the spectrum fits a different use case.

## 5 Options for AI Solutions

### Option 1: Train a Custom Model from scratch

- **When**: Highly specialized domain, proprietary data, strict privacy requirements
- **Example**: Medical imaging AI in a large hospital with proprietary scan data
- **Cost**: Very high ($500K-$5M+)
- **Timeline**: 6-18 months
- **Team needed**: ML Engineers, Data Scientists, MLOps

### Option 2: Fine-tune an Open Source Model

- **When**: Need high customization but budget is limited, data is not overly sensitive
- **Example**: Fine-tune Llama 3 for customer support in a specific industry
- **Cost**: Medium ($50K-$200K)
- **Timeline**: 2-4 months
- **Team needed**: ML Engineer, Data Engineer

### Option 3: Fine-tune / RAG on a Foundation Model

- **When**: Need customization but do not want to manage infrastructure
- **Example**: RAG with a company knowledge base on top of GPT-4o/Claude
- **Cost**: Low-Medium ($20K-$100K implementation + API cost)
- **Timeline**: 4-8 weeks
- **Team needed**: Backend Dev + BA (prompt engineering)

### Option 4: Prompt Engineering on an AI API

- **When**: Use case already fits a foundation model, speed to market matters
- **Example**: AI-assisted email drafting, document summarization, classification
- **Cost**: Low (mostly API cost: $0.01-$0.10/1K tokens)
- **Timeline**: 1-4 weeks
- **Team needed**: Backend Dev + BA (prompt design)

### Option 5: SaaS AI Solution

- **When**: Commodity use case, need turnkey delivery, team has no AI expertise
- **Example**: Salesforce Einstein, Zendesk AI, HubSpot AI
- **Cost**: Subscription ($30-$200/user/month)
- **Timeline**: Days to weeks
- **Team needed**: Implementation consultant + Admin

## Make-or-Buy framework for BA

### Dimension 1: Strategic Differentiation

Ask: **"Is this AI capability a core business differentiator?"**

```text
                    HIGH
                Strategic Value
                    |
Competitors     |       Build Custom
can't replicate |       (Option 1-2)
                |
────────────────┼────────────────────
                |
Commodity       |       Buy/API
capability      |       (Option 3-5)
                |
                    LOW
         LOW ←— Uniqueness of your data/domain —→ HIGH
```

**Examples:**

- Amazon's recommendation engine -> **Build** (core competitive advantage)
- An SME's document categorization -> **Buy/API** (not a differentiator)
- A hospital's patient risk scoring -> **Fine-tune** (specialized domain + privacy)
- A startup's AI chatbot MVP -> **API** (speed to market matters more)

### Dimension 2: Data Sensitivity

| Sensitivity level | Data type | Recommendation |
| --- | --- | --- |
| **Highly sensitive** | PHI, financial, trade secrets | Option 1-2 (on-premise or private cloud) |
| **Sensitive** | PII, internal business data | Option 2-3 (with data anonymization or enterprise contract) |
| **Non-sensitive** | Public data, non-PII | Option 3-5 |

**Note for AI API providers**: OpenAI, Anthropic, and Google all offer enterprise plans with data privacy commitments. BA must verify:

- Do they use your data for training?
- What is the data retention policy?
- Do they comply with GDPR/local regulations?

### Dimension 3: Maturity & Timeline

| Situation | Recommendation |
| --- | --- |
| MVP / Proof of Concept | Option 4-5: Fast, cheap, validate the hypothesis first |
| Growing product, proven value | Option 3: Fine-tune/RAG when customization becomes necessary |
| Enterprise scale, differentiated | Option 1-2: Invest in custom when ROI is proven |

**Anti-pattern**: Jump straight to Option 1 (train from scratch) without validating the business case -> waste of resources.

### Dimension 4: Total Cost of Ownership (TCO)

BA often compare only **initial cost** - this is a mistake. You need a 3-year TCO view:

| | Build Custom | API-based | SaaS |
| --- | --- | --- | --- |
| **Initial cost** | $$$$ | $ | $$ |
| **Annual maintenance** | $$$$ | API cost | Subscription |
| **Scaling cost** | Linear with infra | Linear with usage | Per-seat |
| **Update cost** | Team effort | Provider handles | Provider handles |
| **Lock-in risk** | Low | Medium (API changes) | High |
| **3-year TCO example** | $500K | $80K | $150K |

*TCO depends heavily on scale and use case - this is only a reference example.*

### Dimension 5: Internal Capability

An honest assessment of the current team:

| What you have | Capability Level |
| --- | --- |
| ML Engineers, Data Scientists | ✅ Can consider Build |
| Backend Developers | ✅ Can do API/Fine-tune |
| Non-technical team | -> Choose no-code SaaS |
| Budget to hire | -> Build within 6-12 months |
| Outsource partner | -> Fine-tune with partner support |

## Decision Matrix Template

BA can use a scoring matrix to present the decision objectively:

| Criterion | Weight | Build Custom | Fine-tune | API | SaaS |
| --- | --- | --- | --- | --- | --- |
| Strategic differentiation | 25% | 9 | 7 | 4 | 2 |
| Data privacy requirements | 20% | 9 | 8 | 5 | 4 |
| Speed to market | 20% | 2 | 5 | 9 | 10 |
| Cost efficiency (3yr) | 20% | 3 | 6 | 8 | 7 |
| Internal capability | 15% | 2 | 5 | 8 | 9 |
| **Weighted Score** | 100% | **5.5** | **6.3** | **6.7** | **6.1** |

*Scores are 1-10; adjust weights and scores to fit the context.*

## Real example: Fintech Company

**Scenario**: A fintech company wants to implement AI fraud detection

**Analysis:**

- Strategic differentiation: **HIGH** - Fraud detection is a core risk function
- Data sensitivity: **VERY HIGH** - Transaction data, PII
- Team capability: **Medium** - There are Data Scientists, but not many
- Timeline: **Urgent** - Fraud is increasing

**Options considered:**

1. Train custom -> 12 months, $800K - too slow
2. Fine-tune open source LLM on fraud data -> 3 months, $150K - viable
3. Fine-tune a specialized fraud detection model (Stripe Radar-like) -> 2 months, $100K - best
4. API-based fraud detection service -> 2 weeks, $50K/year - fast but less specialized
5. Turnkey fraud SaaS -> 1 week, $2/transaction - acceptable short-term

**Recommendation:**

- **Immediate (Month 1-2)**: Option 5 (SaaS) to stop the bleeding right away
- **Medium-term (Month 3-6)**: Option 3 (Fine-tune) to build differentiated capability
- **Long-term (Month 6+)**: Combine both: SaaS for real-time, custom model for risk scoring

## Hybrid Strategy: Best of Both Worlds

In practice, many companies use a hybrid approach:

```text
Layer 1: Foundation Model API (GPT-4o, Claude)
  → General language tasks, summarization, draft generation

Layer 2: Fine-tuned model (company-specific)
  → Domain knowledge, terminology, custom logic

Layer 3: Rules engine (deterministic)
  → Compliance checks, hard business rules, safety filters

Layer 4: Human review
  → High-stakes decisions, edge cases, appeals
```

BA's role is to define **which layer** handles which type of request and the **handoff logic** between those layers.

## Red Flags in Make-or-Buy proposals

🚩 "Let's build it ourselves because it will be cheaper in the long run" - Usually false without a dedicated ML team
🚩 "We must have a proprietary AI model" - Ask why; proprietary does not automatically mean better
🚩 "The SaaS vendor will use our data for training" - Verify the contract; do not assume
🚩 "Fine-tuning is quick, it only takes 2 weeks" - Real fine-tuning takes more than that
🚩 "GPT-4o is enough for every use case" - Not always true; evaluate per use case

## Conclusion

Make-or-Buy in AI is not a binary choice - it is a spectrum with multiple stopping points. The role of BA is to:

1. **Clarify strategic intent** - Where does the business want to differentiate?
2. **Assess constraints** - Data privacy, budget, timeline, team capability
3. **Present options objectively** - A scoring matrix with TCO analysis
4. **Recommend with rationale** - Do not just say "I choose X"; explain WHY

The best Make-or-Buy decision is often: "Start small with Buy/API, validate value, then invest in Build when the business case is clear." This approach reduces risk and accelerates learning at the same time.
