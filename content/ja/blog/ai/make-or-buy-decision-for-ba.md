---
id: 02760001-ba01-4001-a024-000000000001
title: "BAのためのMake-or-Buy Decision：AIを自作すべき時、買うべき時"
slug: make-or-buy-decision-for-ba
excerpt: >-
  Make-or-Buy は Strategy Analysis における最重要判断のひとつです。AI では
  custom model を build するのか、foundation model を fine-tune するのか、
  それとも API を使うのかという複雑な選択になります。本記事では BA が
  客観的に分析し、適切に判断するための framework を提供します。
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

「AI は自分たちで build すべきか、それとも既存 solution を buy すべきか？」- これは AI project で BA が非常によく直面する問いです。2026 年の AI landscape は十分に複雑で、この判断はもはや単純な "build vs buy" ではなく、full custom から turnkey solution までの spectrum になっています。

## AI Solution Spectrum

```text
FULL BUILD ←————————————————————————→ FULL BUY

[Train from Scratch] → [Fine-tune Open Source] → [Fine-tune Foundation Model] → [Prompt Engineering on API] → [SaaS AI Solution]

    Cao nhất                                                                                              Thấp nhất
    (Cost, Control, Flexibility, Data Privacy)
    
    Thấp nhất                                                                                             Cao nhất
    (Speed to Market, Ease of Use, Vendor Lock-in Risk)
```

「最善の答え」はひとつではありません。spectrum 上の各ポイントには、それぞれ適した use case があります。

## AI Solutionの5つのOption

### Option 1: Custom ModelをゼロからTrainする

- **どんなときか**: highly specialized domain、proprietary data、極めて厳しい privacy 要件がある場合
- **例**: proprietary scan data を持つ大規模病院の medical imaging AI
- **Cost**: 非常に高い（$500K-$5M+）
- **Timeline**: 6〜18か月
- **必要な team**: ML Engineers、Data Scientists、MLOps

### Option 2: Open Source ModelをFine-tuneする

- **どんなときか**: 高い customization が必要だが budget は限られ、data は極端には sensitive ではない場合
- **例**: 特定 industry の customer support 向けに Llama 3 を fine-tune する
- **Cost**: 中程度（$50K-$200K）
- **Timeline**: 2〜4か月
- **必要な team**: ML Engineer、Data Engineer

### Option 3: Foundation Model上でFine-tune / RAGを行う

- **どんなときか**: customization は必要だが infrastructure 管理はしたくない場合
- **例**: GPT-4o/Claude 上に company knowledge base を載せた RAG
- **Cost**: 低〜中（$20K-$100K implementation + API cost）
- **Timeline**: 4〜8週間
- **必要な team**: Backend Dev + BA（prompt engineering）

### Option 4: AI API上でPrompt Engineeringする

- **どんなときか**: use case が foundation model に合っており、speed to market が重要な場合
- **例**: AI-assisted email drafting、document summarization、classification
- **Cost**: 低い（主に API cost: $0.01-$0.10/1K tokens）
- **Timeline**: 1〜4週間
- **必要な team**: Backend Dev + BA（prompt design）

### Option 5: SaaS AI Solution

- **どんなときか**: commodity use case で、turnkey 導入が必要で、team に AI expertise がない場合
- **例**: Salesforce Einstein、Zendesk AI、HubSpot AI
- **Cost**: Subscription（$30-$200/user/month）
- **Timeline**: 数日〜数週間
- **必要な team**: Implementation consultant + Admin

## BA向けMake-or-Buy Framework

### Dimension 1: Strategic Differentiation

問いはこれです。**「この AI capability は business の core differentiator なのか？」**

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

**分析例:**

- Amazon の recommendation engine -> **Build**（core competitive advantage）
- SME の document categorization -> **Buy/API**（differentiator ではない）
- Hospital の patient risk scoring -> **Fine-tune**（specialized domain + privacy）
- Startup の AI chatbot MVP -> **API**（speed to market の方が重要）

### Dimension 2: Data Sensitivity

| 感度レベル | Data の種類 | Recommendation |
| --- | --- | --- |
| **Highly sensitive** | PHI、financial、trade secrets | Option 1-2（on-premise または private cloud） |
| **Sensitive** | PII、internal business data | Option 2-3（data anonymization または enterprise contract 前提） |
| **Non-sensitive** | Public data、non-PII | Option 3-5 |

**AI API providers に関する注意**: OpenAI、Anthropic、Google はいずれも data privacy commitments を含む enterprise plans を提供しています。BA は次を verify すべきです。

- あなたの data を training に使うか？
- Data retention policy はどうなっているか？
- GDPR / local regulations に準拠しているか？

### Dimension 3: Maturity & Timeline

| Situation | Recommendation |
| --- | --- |
| MVP / Proof of Concept | Option 4-5: 速く安く hypothesis を検証する |
| Growing product、proven value | Option 3: customization が必要になったら Fine-tune / RAG |
| Enterprise scale、differentiated | Option 1-2: ROI が証明されたら custom に投資 |

**Anti-pattern**: Business case を検証せずに Option 1（train from scratch）へ飛びつくこと -> resources の浪費につながります。

### Dimension 4: Total Cost of Ownership（TCO）

BA は **initial cost** だけを比較しがちですが、これは誤りです。3 年間の TCO を見る必要があります。

| | Build Custom | API-based | SaaS |
| --- | --- | --- | --- |
| **Initial cost** | $$$$ | $ | $$ |
| **Annual maintenance** | $$$$ | API cost | Subscription |
| **Scaling cost** | infra に比例 | usage に比例 | Per-seat |
| **Update cost** | Team effort | Provider handles | Provider handles |
| **Lock-in risk** | Low | Medium（API changes） | High |
| **3-year TCO example** | $500K | $80K | $150K |

*TCO は scale と use case に大きく依存します。これは参考例です。*

### Dimension 5: Internal Capability

Current team を正直に評価します。

| 持っているもの | Capability Level |
| --- | --- |
| ML Engineers、Data Scientists | ✅ Build を検討できる |
| Backend Developers | ✅ API / Fine-tune を実行できる |
| Non-technical team | -> No-code SaaS を選ぶ |
| 採用 budget | -> 6〜12か月で Build 可能 |
| Outsource partner | -> Partner 支援で Fine-tune |

## Decision Matrix Template

BA は scoring matrix を使って、より客観的に decision を提示できます。

| Criterion | Weight | Build Custom | Fine-tune | API | SaaS |
| --- | --- | --- | --- | --- | --- |
| Strategic differentiation | 25% | 9 | 7 | 4 | 2 |
| Data privacy requirements | 20% | 9 | 8 | 5 | 4 |
| Speed to market | 20% | 2 | 5 | 9 | 10 |
| Cost efficiency (3yr) | 20% | 3 | 6 | 8 | 7 |
| Internal capability | 15% | 2 | 5 | 8 | 9 |
| **Weighted Score** | 100% | **5.5** | **6.3** | **6.7** | **6.1** |

*Score は 1-10。weights と scores は context に合わせて調整してください。*

## 実例: Fintech Company

**Scenario**: Fintech が AI fraud detection を導入したい

**Analysis:**

- Strategic differentiation: **HIGH** - Fraud detection は core risk function
- Data sensitivity: **VERY HIGH** - Transaction data、PII
- Team capability: **Medium** - Data Scientists はいるが多くない
- Timeline: **Urgent** - Fraud が増加している

**Options considered:**

1. Train custom -> 12か月、$800K - 遅すぎる
2. Fine-tune open source LLM on fraud data -> 3か月、$150K - 現実的
3. Fine-tune a specialized fraud detection model（Stripe Radar-like）-> 2か月、$100K - 最適
4. API-based fraud detection service -> 2週間、$50K/year - 速いが specialized さは低い
5. Turnkey fraud SaaS -> 1週間、$2/transaction - 短期的には許容可能

**Recommendation:**

- **Immediate（Month 1-2）**: Option 5（SaaS）でまず損失拡大を止める
- **Medium-term（Month 3-6）**: Option 3（Fine-tune）で differentiated capability を構築する
- **Long-term（Month 6+）**: 両方を組み合わせる。real-time には SaaS、risk scoring には custom model

## Hybrid Strategy: Best of Both Worlds

実務では、多くの company が hybrid approach を採用しています。

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

BA の役割は、**どの layer がどの type の request を処理するか** と、layers 間の **handoff logic** を定義することです。

## Make-or-Buy提案で見るべきRed Flags

🚩 「長期的には自作の方が安い」- dedicated ML team がなければ通常は成り立ちません
🚩 「自社 proprietary AI model が必須だ」- なぜ必要かを問うべきです。proprietary = better ではありません
🚩 「SaaS vendor は必ず自社 data を training に使う」- assume せず contract を verify する
🚩 「Fine-tune はすぐ終わる。2 週間で十分」- 本来の fine-tuning はもっと時間がかかります
🚩 「GPT-4o はすべての use case に十分」- use case ごとの evaluation が必要です

## まとめ

AI における Make-or-Buy は binary choice ではなく、複数の停留点を持つ spectrum です。BA の役割は次の通りです。

1. **Strategic intent を明確にする** - business はどこで differentiate したいのか？
2. **Constraints を評価する** - Data privacy、budget、timeline、team capability
3. **Options を客観的に提示する** - Scoring matrix と TCO analysis を用いる
4. **Rationale を添えて recommendation する** - 「X を選ぶ」だけでなく WHY を説明する

最善の Make-or-Buy decision はしばしば次の形です。"Buy/API で小さく始め、value を検証し、business case が明確になった段階で Build に投資する。" この approach は risk を下げつつ learning を加速させます。