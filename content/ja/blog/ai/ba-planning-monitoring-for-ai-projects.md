---
id: 02760001-ba01-4001-a003-000000000001
title: "BA Planning & Monitoring：AIプロジェクトでBAの進捗を計画・追跡する方法"
slug: ba-planning-monitoring-for-ai-projects
excerpt: >-
  BA Planning はテンプレートにスコープを書くだけではありません。AI プロジェクトでは、
  BA 計画に反復チェックポイント、データ/モデルに関する仮説トラッキング、
  AI 機能の出力が要件からドリフトした場合のエスカレーション経路を組み込む必要があります。
  BA Monitoring Framework を使った実践ガイドです。
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

AI プロジェクトにおける BA Planning は、従来プロジェクトと本質的に異なります。核となる違いは **要件は静的だが、AI 出力は確率的** である点です。つまり、計画には直線的なマイルストーンだけでなく、検証ループが必要です。

---

## 1. AIプロジェクト向け BA Planning フレームワーク

### 1.1 AI 境界を明確にしたスコープ定義

計画前に BA が明確化すべき項目:

| 要素 | 主要な問い | 例 |
|---|---|---|
| **AI Scope** | フローのどこを AI が処理するか | "AI がチケットの 70% を自動分類" |
| **Human Scope** | 人がレビューするケースは何か | "confidence < 0.8 のチケットはエスカレーション" |
| **Data Dependency** | AI が正しく動くために必要なデータは何か | "ラベル済みチケット履歴 6 か月分" |
| **Acceptance Threshold** | どの条件で AI 機能を "done" とみなすか | "テストセットで Accuracy >= 85%" |

### 1.2 AI 機能向け WBS

AI 機能の Work Breakdown Structure は 5 つの作業群で構成します:

```
AI Feature: [機能名]
├── 1. Data & Requirements
│   ├── 1.1 Data audit (schema, volume, quality)
│   ├── 1.2 ステークホルダーへの Elicitation
│   └── 1.3 Acceptance criteria 作成
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

## 2. Waterfall ではなく反復チェックポイント

AI プロジェクトは通常 Agile/Sprint で進みます。BA はスプリント内にチェックポイントを埋め込む必要があります。

### Sprint Planning Checklist（BA 視点）
- [ ] このスプリントでデータは本当に準備済みか（「準備予定」ではない）
- [ ] Acceptance criteria は Given/When/Then 形式か
- [ ] Fallback path を Dev とレビューしたか
- [ ] 前スプリントから閾値に変更はあるか

### Mid-Sprint Check（5-7日目）
- [ ] AI 出力は期待閾値を満たしているか
- [ ] 新しい edge case は出現しているか
- [ ] ADR（Architecture Decision Record）に更新すべき仮説は何か

---

## 3. BA Monitoring：本番後の追跡

多くの BA は go-live で仕事が終わると考えますが、それは誤りです。AI 機能では monitoring framework が必要です。

### 3.1 追跡すべきメトリクス

| メトリクス種別 | 具体指標 | 警告閾値 |
|---|---|---|
| **Quality** | Accuracy / F1 / Precision | ベースライン比で 5% 超低下 |
| **Business** | Human override 率 | 初週比で 20% 超増加 |
| **Volume** | 1日あたりリクエスト数 | 3 倍超の急増 |
| **Feedback** | ユーザー苦情率 | 全リクエストの 2% 超 |

### 3.2 ドリフト検知

AI モデルは **concept drift** が起こり得ます。現実が変わっているのに、モデルは古いデータ前提で動き続ける状態です。BA は次を実施します:

1. go-live 前最終スプリントで **baseline** を定義
2. 再評価トリガーを設定（毎月、または指標低下時）
3. 責任者を明確化（RACI）

---

## 4. 実務向け BA Planning テンプレート

```markdown
## BA Plan: [機能名]
**Version:** 1.0 | **Date:** YYYY-MM-DD | **Owner:** [BA 名]

### Scope Summary
- AI handles: [短い説明]
- Human handles: [短い説明]
- Out of scope: [明確に列挙]

### Data Dependencies
| Data | Source | Owner | Status |
|------|--------|-------|--------|
| [data1] | [system] | [team] | ✅/❌ |

### Acceptance Criteria (top-level)
- [ ] AI accuracy >= [X]% on [Y] test cases
- [ ] Edge case coverage: [一覧] handled
- [ ] Human override rate <= [Z]%

### Monitoring Setup
- Dashboard: [link]
- Alert owner: [name]
- Review cadence: [weekly/monthly]
```

---

## 5. AI向け BA Planning のよくある失敗

**失敗 1：「Accuracy」と言うだけで、どのデータ集合か定義しない**  
-> 修正: 「[ソース] の [期間] テストセットでの accuracy」と明記

**失敗 2：仮説を追跡しない**  
-> 修正: 各仮説に ID・Owner・Review 日を付与

**失敗 3：AI 機能を通常機能と同じに扱う（done で終了）**  
-> 修正: Definition of Done に「Post-launch monitoring period: 4 weeks」を追加

---

## まとめ

AI 機能に対する BA Planning は、複雑さが増えるというより **二値思考ではなく確率思考** が必要になります。良い計画とは、仮説検証ループがあり、数値閾値が明確で、go-live 後 monitoring が設計されている計画です。

**次のステップ:** [Strategy Analysis](/blog/strategy-analysis-swot-pestle-for-ba) を読み、計画前のコンテキスト分析を学びましょう。
