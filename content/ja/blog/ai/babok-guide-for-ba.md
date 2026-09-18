---
id: 02760001-ba01-4001-a020-000000000001
title: "BAのためのBABOK Guide：Business Analysis実務の指針"
slug: babok-guide-for-ba
excerpt: >-
  BABOK（Business Analysis Body of Knowledge）は、IIBA が定義する
  プロフェッショナル BA の知識体系・スキル・技法をまとめた標準リファレンスです。
  本記事では 6 つの Knowledge Areas、50 以上の techniques、そして実際の AI
  プロジェクトで BABOK をどう適用するかを解説します。
featured_image: /images/blog/babok-guide-ba.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-05T09:00:00.000000Z'
created_at: '2026-05-05T09:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: BABOK, slug: babok}, {name: IIBA, slug: iiba}, {name: Business Analysis, slug: business-analysis}]
comments: []
---

BABOK（Business Analysis Body of Knowledge）は、IIBA（International Institute of Business Analysis）が発行する標準リファレンスであり、Project Manager にとっての PMBOK、Software Engineer にとっての SWEBOK に相当します。BA を専門職として実践したいなら、BABOK は**必ず**理解すべき基盤です。

## BABOKとは何か？

BABOK Guide（現行はバージョン 3.0）では、次を定義しています。

- **Business Analysis**: ニーズを特定し、stakeholder に価値をもたらす solution を提案するための活動の集合
- **6 Knowledge Areas**（KA）: BA の中核となる知識領域
- **50+ techniques**: 各 BA タスクを実行するための具体的なツールと方法

> BABOK は framework や process ではありません。これは **body of knowledge**、つまり知識体系です。Agile、Waterfall、Hybrid のいずれにも適用できます。

## BABOKの6つのKnowledge Areas

### 1. Business Analysis Planning & Monitoring

BA 活動全体を計画します。

- stakeholder を特定し、どのように関与してもらうかを決める
- 適切な methodology を選ぶ（Agile / plan-driven）
- BA activities の governance を定義する
- 進捗を追跡し、計画を調整する

**AI プロジェクトでは**: data discovery、model evaluation cycle、AI-specific risk assessment の計画も追加で必要です。

### 2. Elicitation & Collaboration

ニーズを理解するための情報収集と協働です。

- Interviews、workshops、surveys
- Observation、prototyping、document analysis
- Focus groups、brainstorming

**AI プロジェクトでは**: AI note-taking tools や AI interview summarizer により、BA は output を 3〜4 倍速く処理できます。

### 3. Requirements Life Cycle Management

requirements のライフサイクル全体を管理します。

- business need -> solution まで requirements を trace する
- requirements backlog を maintain し、prioritize する
- requirements が変わったときの impact を評価する
- requirements を approve し、baseline 化する

**AI プロジェクトでは**: business requirement -> AI capability requirement -> training data requirement -> evaluation metric までの traceability も必要です。

### 4. Strategy Analysis

正しい solution を定義するための戦略分析です。

- current state（AS-IS）を分析する
- future state（TO-BE）を定義する
- risk と feasibility を評価する
- change strategy を定義する

**AI プロジェクトでは**: AI readiness assessment、build vs buy vs partner の判断、data infrastructure gap analysis が重要になります。

### 5. Requirements Analysis & Design Definition (RADD)

requirements の詳細分析と設計を行います。

- requirements を model 化する（UML、BPMN、use cases）
- requirements を verify / validate する
- acceptance criteria を定義する
- prototype と mockup を作る

**AI プロジェクトでは**: expected outputs、edge cases、confidence thresholds、fallback scenarios を含む AI behavior specification を追加します。

### 6. Solution Evaluation

実装後の solution を評価します。

- solution performance を測定する
- performance gap を分析する
- solution limitations を評価する
- 改善を提案する

**AI プロジェクトでは**: AI feature adoption の追跡、model drift の監視、business value の測定も含まれます。

## Underlying Competencies（基礎能力）

6 つの KA に加えて、BABOK はすべての BA に必要な competency を定義しています。

| グループ | 例 |
|------|-------|
| **Analytical Thinking** | Problem decomposition、decision making、systems thinking |
| **Behavioral Characteristics** | Ethics、personal accountability、trustworthiness |
| **Business Knowledge** | Business principles、industry knowledge |
| **Communication Skills** | Oral、written、facilitation、negotiation |
| **Interaction Skills** | Facilitation、leadership、teamwork |
| **Tools & Technology** | Office tools、modeling tools、requirement management tools |

## BABOK Techniques（50以上の技法）

ここでは、AI プロジェクトに携わる BA に特に実用的な techniques を挙げます。

### Elicitation

| Technique | 使う場面 |
|----------|-------------|
| **Structured Interviews** | key stakeholders からニーズを引き出す |
| **Workshops** | 複数 stakeholders を同時に align する |
| **Observation (Job Shadowing)** | 実際の user workflow を理解する |
| **Prototyping** | build 前に AI UX を早期検証する |
| **Survey/Questionnaire** | 多人数からデータを集める |

### Analysis

| Technique | 使う場面 |
|----------|-------------|
| **Business Rules Analysis** | AI 向けの business logic を定義する |
| **Decision Analysis** | AI workflow の decision tree を作る |
| **SWOT Analysis** | AI strategy を評価する |
| **Process Modeling (BPMN)** | AI intervention を含む flow を可視化する |
| **Use Cases / User Stories** | AI features を specification 化する |

### Evaluation

| Technique | 使う場面 |
|----------|-------------|
| **Acceptance & Evaluation Criteria** | AI features の "done" を定義する |
| **Metrics & KPIs** | AI の business value を測る |
| **Risk Analysis** | AI deployment の risk を評価する |
| **Root Cause Analysis** | AI incidents を調査する |

## BABOK vs Agile Extension

IIBA は Agile 環境向けに **Agile Extension to the BABOK**（AgileBA）も公開しています。

| BABOK | Agile Extension |
|-------|----------------|
| Detailed requirements upfront | Just-in-time requirements |
| Formal documentation | Lightweight artifacts |
| Sequential approach | Iterative discovery |
| Separate BA phase | BA embedded in sprints |

現代の AI プロジェクトでは、両方を組み合わせるのが一般的です。sprint レベルの作業には Agile Extension を使い、strategic analysis には BABOK techniques を使います。

## 実際のAIプロジェクトでBABOKを適用する

### Week 1-2: Business Analysis Planning

```
1. Identify stakeholders (Product Owner, Data Scientist, End Users, Compliance)
2. Define BA approach (Agile sprints + lightweight documentation)
3. Set up requirements tool (Jira, Confluence, or Azure DevOps)
4. Create RACI matrix cho BA activities
```

### Week 3-4: Elicitation

```
1. Workshop với business stakeholders → define problem + success criteria
2. Job shadowing với end users → understand current workflow pain points
3. Interview Data Scientist → understand technical constraints
4. Synthesize insights với AI tool → cluster themes, identify gaps
```

### Sprint by Sprint: RADD + Solution Evaluation

```
Per sprint:
- Refine user stories với acceptance criteria
- Create AI behavior specification cho new features
- Validate with stakeholders
- Measure feature adoption post-release
```

## BABOKに関連するIIBA認定

| 認定 | 要件 | 対象 |
|-----------|---------|----------|
| **ECBA** | 21 PD、経験 0 年 | Entry-level BA |
| **CCBA** | 21 PD、経験 2 年 | Mid-level BA |
| **CBAP** | 35 PD、経験 5 年 | Senior BA |
| **AAC** | Agile focus | Agile teams の BA |

## BABOKを効率よく学ぶコツ

1. **最初から最後まで読まない** - BABOK は novel ではなく reference です。いま必要な KA から読みましょう。
2. **実務に結びつける** - BA タスクを行うたびに、BABOK がその task をどう定義しているか確認します。
3. **Techniques に集中する** - BABOK の Techniques セクションは非常に実践的です。まずはよく使う 20 個を押さえましょう。
4. **AI tools と組み合わせる** - BABOK は WHAT を定義し、AI tools は HOW を速くします。
5. **ECBA/CCBA の受験を目標に学ぶ** - 試験対策は BABOK を体系的に理解する助けになります。

## まとめ

BABOK は一度読んで終わる document ではなく、BA キャリアの中で何度も戻ってくる **reference guide** です。6 つの Knowledge Areas と 20〜30 の core techniques を押さえれば、十分に実務で力を発揮できます。残りは実務経験の中で自然に身についていきます。

AI 時代において、BABOK はますます重要です。AI tools は多くの BA tasks を自動化できますが、**analytical thinking** と **正しい問題を見極める力** は AI には置き換えられません。