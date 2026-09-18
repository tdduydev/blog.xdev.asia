---
id: 02760001-ba01-4001-a024-000000000001
title: "給 BA 的 Make-or-Buy Decision：何時自己建，何時買現成 AI"
slug: make-or-buy-decision-for-ba
excerpt: >-
  Make-or-Buy 是 Strategy Analysis 中最重要的決策之一。到了 AI 情境，問題變得更複雜：
  該 build custom model、fine-tune foundation model，還是直接使用 API？本文提供
  一套 framework，協助 BA 分析選項並做出正確判斷。
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

「我們應該自己 build AI，還是買現成 solution？」- 這是 BA 在 AI 專案中很常遇到的問題。到了 2026 年，AI landscape 已經複雜到這不再是單純的 "build vs buy" 問題，而是一條從 full custom 到 turnkey solution 的 spectrum。

## AI Solution Spectrum

```text
FULL BUILD ←————————————————————————→ FULL BUY

[Train from Scratch] → [Fine-tune Open Source] → [Fine-tune Foundation Model] → [Prompt Engineering on API] → [SaaS AI Solution]

    Cao nhất                                                                                              Thấp nhất
    (Cost, Control, Flexibility, Data Privacy)
    
    Thấp nhất                                                                                             Cao nhất
    (Speed to Market, Ease of Use, Vendor Lock-in Risk)
```

沒有唯一的「最佳答案」，spectrum 上每個位置都有各自適合的 use case。

## AI Solution的5個Option

### Option 1: 從零開始Train Custom Model

- **何時適用**：Highly specialized domain、proprietary data、需要極高 privacy
- **範例**：大型醫院使用 proprietary scan data 建 medical imaging AI
- **Cost**：非常高（$500K-$5M+）
- **Timeline**：6-18 個月
- **需要的 team**：ML Engineers、Data Scientists、MLOps

### Option 2: Fine-tune Open Source Model

- **何時適用**：需要高度 customization，但 budget 有限，且 data 不算極度敏感
- **範例**：為特定 industry 的 customer support fine-tune Llama 3
- **Cost**：中等（$50K-$200K）
- **Timeline**：2-4 個月
- **需要的 team**：ML Engineer、Data Engineer

### Option 3: 在Foundation Model上做Fine-tune / RAG

- **何時適用**：需要 customization，但不想自行管理 infrastructure
- **範例**：在 GPT-4o / Claude 上用 company knowledge base 建 RAG
- **Cost**：低到中（$20K-$100K implementation + API cost）
- **Timeline**：4-8 週
- **需要的 team**：Backend Dev + BA（prompt engineering）

### Option 4: 在AI API上做Prompt Engineering

- **何時適用**：Use case 本身就適合 foundation model，且 speed to market 很重要
- **範例**：AI-assisted email drafting、document summarization、classification
- **Cost**：低（主要是 API cost：$0.01-$0.10/1K tokens）
- **Timeline**：1-4 週
- **需要的 team**：Backend Dev + BA（prompt design）

### Option 5: SaaS AI Solution

- **何時適用**：Commodity use case、需要 turnkey、team 沒有 AI expertise
- **範例**：Salesforce Einstein、Zendesk AI、HubSpot AI
- **Cost**：Subscription（$30-$200/user/month）
- **Timeline**：數天到數週
- **需要的 team**：Implementation consultant + Admin

## BA用的Make-or-Buy Framework

### Dimension 1: Strategic Differentiation

問自己：**「這個 AI capability 是 business 的核心 differentiator 嗎？」**

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

**分析例子：**

- Amazon 的 recommendation engine -> **Build**（核心競爭優勢）
- SME 的 document categorization -> **Buy/API**（不是 differentiator）
- Hospital 的 patient risk scoring -> **Fine-tune**（specialized domain + privacy）
- Startup 的 AI chatbot MVP -> **API**（speed to market 更重要）

### Dimension 2: Data Sensitivity

| 敏感程度 | Data 類型 | Recommendation |
| --- | --- | --- |
| **Highly sensitive** | PHI、financial、trade secrets | Option 1-2（on-premise 或 private cloud） |
| **Sensitive** | PII、internal business data | Option 2-3（搭配 data anonymization 或 enterprise contract） |
| **Non-sensitive** | Public data、non-PII | Option 3-5 |

**關於 AI API providers 的注意事項**：OpenAI、Anthropic、Google 都有附帶 data privacy commitments 的 enterprise plans。BA 需要 verify：

- 他們會不會把你的 data 用來 training？
- Data retention policy 是什麼？
- 是否符合 GDPR / local regulations？

### Dimension 3: Maturity & Timeline

| Situation | Recommendation |
| --- | --- |
| MVP / Proof of Concept | Option 4-5：快速、便宜，先驗證 hypothesis |
| Growing product、proven value | Option 3：當需要 customization 時使用 Fine-tune / RAG |
| Enterprise scale、differentiated | Option 1-2：在 ROI 被證明後投資 custom |

**Anti-pattern**：還沒驗證 business case 就直接跳到 Option 1（train from scratch）-> 很容易浪費 resources。

### Dimension 4: Total Cost of Ownership（TCO）

BA 常常只比較 **initial cost**，這是錯的。你應該看 3 年期 TCO：

| | Build Custom | API-based | SaaS |
| --- | --- | --- | --- |
| **Initial cost** | $$$$ | $ | $$ |
| **Annual maintenance** | $$$$ | API cost | Subscription |
| **Scaling cost** | 與 infra 線性增加 | 與 usage 線性增加 | Per-seat |
| **Update cost** | Team effort | Provider handles | Provider handles |
| **Lock-in risk** | Low | Medium（API changes） | High |
| **3-year TCO example** | $500K | $80K | $150K |

*TCO 會高度依賴 scale 與 use case，這裡只是參考範例。*

### Dimension 5: Internal Capability

誠實評估 current team：

| 你目前擁有 | Capability Level |
| --- | --- |
| ML Engineers、Data Scientists | ✅ 可以考慮 Build |
| Backend Developers | ✅ 可以處理 API / Fine-tune |
| Non-technical team | -> 選擇 no-code SaaS |
| 有 budget 招聘 | -> 6-12 個月內 Build |
| 有 outsource partner | -> 在 partner 支援下 Fine-tune |

## Decision Matrix Template

BA 可以使用 scoring matrix，用更客觀的方式呈現 decision：

| Criterion | Weight | Build Custom | Fine-tune | API | SaaS |
| --- | --- | --- | --- | --- | --- |
| Strategic differentiation | 25% | 9 | 7 | 4 | 2 |
| Data privacy requirements | 20% | 9 | 8 | 5 | 4 |
| Speed to market | 20% | 2 | 5 | 9 | 10 |
| Cost efficiency (3yr) | 20% | 3 | 6 | 8 | 7 |
| Internal capability | 15% | 2 | 5 | 8 | 9 |
| **Weighted Score** | 100% | **5.5** | **6.3** | **6.7** | **6.1** |

*Scores 為 1-10，請依 context 調整 weights 與 scores。*

## 實例：Fintech Company

**Scenario**：Fintech 想導入 AI fraud detection

**Analysis：**

- Strategic differentiation：**HIGH** - Fraud detection 是核心 risk function
- Data sensitivity：**VERY HIGH** - Transaction data、PII
- Team capability：**Medium** - 有 Data Scientists，但數量不多
- Timeline：**Urgent** - Fraud 正在增加

**Options considered：**

1. Train custom -> 12 個月、$800K - 太慢
2. Fine-tune open source LLM on fraud data -> 3 個月、$150K - 可行
3. Fine-tune a specialized fraud detection model（Stripe Radar-like）-> 2 個月、$100K - 最佳
4. API-based fraud detection service -> 2 週、$50K/year - 很快但較不 specialized
5. Turnkey fraud SaaS -> 1 週、$2/transaction - 短期可接受

**Recommendation：**

- **Immediate（Month 1-2）**：先上 Option 5（SaaS）止血
- **Medium-term（Month 3-6）**：接著做 Option 3（Fine-tune），建立 differentiated capability
- **Long-term（Month 6+）**：採混合策略，real-time 用 SaaS，risk scoring 用 custom model

## Hybrid Strategy：Best of Both Worlds

在實務中，很多 company 會採用 hybrid approach：

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

BA 的角色，就是定義 **哪一層** 處理哪一種 request，以及各 layers 之間的 **handoff logic**。

## Make-or-Buy提案中的Red Flags

🚩 「自己 build 長期一定更便宜」- 如果沒有 dedicated ML team，通常不成立
🚩 「我們一定要有 proprietary AI model」- 先問為什麼，proprietary 不等於 better
🚩 「SaaS vendor 一定會拿我們的 data 去 training」- 不要 assume，請 verify contract
🚩 「Fine-tune 很快，2 週就做完」- 真正的 fine-tuning 通常不只這麼短
🚩 「GPT-4o 對所有 use case 都夠用」- 不一定，必須逐個 use case 評估

## 結論

AI 的 Make-or-Buy 不是 binary choice，而是一條有多個停靠點的 spectrum。BA 的角色是：

1. **Clarify strategic intent** - Business 想在哪裡做 differentiation？
2. **Assess constraints** - Data privacy、budget、timeline、team capability
3. **Present options objectively** - 用 scoring matrix 與 TCO analysis 客觀呈現
4. **Recommend with rationale** - 不只是說「我選 X」，而是清楚說明 WHY

最好的 Make-or-Buy decision，通常是「先用 Buy/API 小步開始，驗證 value，等 business case 清楚後再投資 Build。」這種 approach 同時能降低 risk，也能加速 learning。