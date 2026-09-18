---
id: 02760001-ba01-4001-a003-000000000008
title: "AI Cost & FinOps Basics for BA: Token, Latency, and Budget Control in AI Projects"
slug: ai-cost-finops-basics-for-ba
excerpt: >-
  BA should understand AI costs well enough to estimate budgets, negotiate with
  stakeholders, and make make-or-buy decisions. This article explains token pricing,
  latency cost, cloud AI vs self-hosted options, and practical FinOps practices without
  requiring DevOps expertise.
featured_image: /images/blog/ai-cost-finops.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-05T13:30:00.000000Z'
created_at: '2026-05-05T13:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: FinOps, slug: finops}, {name: Cost, slug: cost}, {name: AI, slug: ai}, {name: Budget, slug: budget}]
comments: []
---

BA often leave "how much AI costs" to technical teams. That is a mistake. When stakeholders ask, "Is this feature worth investing in?" BA should have numbers ready, not answer "let me ask tech".

---

## 1. AI Cost Types You Need to Know

### 1.1 Token-based Pricing (LLM API)

Most LLM APIs charge by **token** (not characters, not words):

```
1 token ~= 4 English characters ~= 3/4 of a word
"Hello world" ~= 2 tokens
1 A4 page of text ~= 500-700 tokens
```

**Example pricing (reference, May 2026):**

| Model | Input | Output | When to use |
|---|---|---|---|
| GPT-4o mini | $0.15/1M tokens | $0.60/1M tokens | High volume, simple tasks |
| GPT-4o | $2.50/1M tokens | $10/1M tokens | Complex tasks, high quality |
| Claude Sonnet | $3/1M tokens | $15/1M tokens | Reasoning, coding, analysis |
| Gemini Flash | $0.075/1M tokens | $0.30/1M tokens | Lowest cost, enough for many tasks |

### 1.2 Cost Estimation Formula

```
Monthly cost = Daily requests x Avg tokens/request x Cost per token x 30 days

Example: Support chatbot
- 500 requests/day
- 800 input tokens + 400 output tokens = 1200 tokens/request
- Model: GPT-4o mini ($0.15 input, $0.60 output)

Cost = 500 x [(800 x $0.15) + (400 x $0.60)] / 1,000,000 x 30
     = 500 x [($0.00012) + ($0.00024)] x 30
     = 500 x $0.00036 x 30
     = $5.40/month (very low for chatbot)
```

---

## 2. Latency and Compute Cost

Beyond API cost, include:

| Cost Type | Description | What BA should know |
|---|---|---|
| **Compute (GPU)** | Running self-hosted models | $0.5-5 per GPU hour depending on type |
| **Embedding** | Vector search, RAG | $0.02/1M tokens (very low) |
| **Storage** | Vector DB, model weights | $20-100/month depending on volume |
| **Inference latency** | User waiting time -> UX cost | P95 latency < 3s is commonly acceptable |

---

## 3. Cloud AI API vs Self-hosted Model

| Criteria | Cloud API | Self-hosted |
|---|---|---|
| **Upfront cost** | $0 | $10K-100K+ (GPU) |
| **Variable cost** | Pay per token | Electricity + cloud GPU |
| **Latency** | 0.5-3s | 0.1-1s (local GPU) |
| **Data privacy** | Data goes to vendor | Data stays in-house |
| **Maintenance** | None | Requires MLOps team |
| **Best when** | MVP, low-medium volume | Large scale, sensitive data |

**BA rule of thumb:**
- < 1M tokens/month -> Cloud API is almost always cheaper
- > 100M tokens/month -> Self-hosted may reach positive ROI after 6-12 months
- Classified data (healthcare, finance) -> Self-hosted may be mandatory

---

## 4. FinOps Practices BA Can Propose

### 4.1 Cost Alert Setup

Ask the team to set:
```
Alert Level 1: Cost reaches 70% monthly budget -> Notify BA + PM
Alert Level 2: Cost reaches 90% monthly budget -> Notify leadership
Alert Level 3: Hard cap automatically disables non-critical features above 100%
```

### 4.2 Token Optimization Strategies

BA can propose these without coding:

| Strategy | Description | Potential savings |
|---|---|---|
| **Prompt caching** | Reuse system prompt across requests | 30-50% input tokens |
| **Model routing** | Use smaller model for simple tasks | 60-90% cost for routine tasks |
| **Context pruning** | Remove unnecessary conversation history | 20-40% per request |
| **Batch processing** | Group non-real-time requests | Up to 50% volume discount |
| **Output length limit** | Cap max output tokens | 20-30% output cost |

### 4.3 Cost per Business Metric

Do not track API cost alone. Track cost per business outcome:

```
Cost per resolved ticket = Monthly AI cost ÷ Tickets resolved by AI
Cost per qualified lead = Monthly AI cost ÷ Leads qualified by AI
Cost savings vs manual = (FTE hours saved x hourly rate) - AI cost
```

---

## 5. Budget Estimation Template for BA

```markdown
## AI Feature Cost Estimate
**Feature:** [Name] | **Date:** [YYYY-MM] | **Owner:** [BA]

### Volume Assumptions
| Parameter | Estimate | Source |
|-----------|----------|--------|
| Daily active users | [X] | Analytics/forecast |
| Requests per user per day | [Y] | UX assumption |
| Total daily requests | [XxY] | Calculated |

### Per-Request Cost
| Component | Cost | Notes |
|-----------|------|-------|
| LLM API (input) | $[X]/1K tokens | [Model name] |
| LLM API (output) | $[X]/1K tokens | [Model name] |
| Avg tokens per request | [X] input + [Y] output | Estimated from prototype |
| **Cost per request** | **$[total]** | |

### Monthly Projection
| Scenario | Cost | Notes |
|----------|------|-------|
| Conservative (50% of estimate) | $[X] | Low adoption |
| Base case | $[Y] | Expected |
| Peak (200% of estimate) | $[Z] | Viral/spike |

### ROI Estimate
- Manual cost replaced: $[X]/month
- AI cost: $[Y]/month
- Net savings: $[X-Y]/month
- Break-even: [N] months
```

---

## Conclusion

BA do not need cloud architecture expertise to estimate AI cost. Understanding token pricing, knowing when to use cloud vs self-hosted, and setting cost alerts are enough for BA to contribute to business cases and prevent budget overruns.

When stakeholders ask "How much does this AI feature cost?" you can answer within 30 minutes using this template.
