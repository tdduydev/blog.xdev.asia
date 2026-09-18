---
id: 02760001-ba01-4001-a003-000000000002
title: "BAのためのStrategy Analysis：AI時代の SWOT・PESTLE・Impact Mapping・Value Stream"
slug: strategy-analysis-swot-pestle-for-ba
excerpt: >-
  Strategy Analysis は、BA が要件を書く前に組織コンテキストを理解するための土台です。
  本記事では SWOT、PESTLE、Impact Mapping、Value Stream Mapping を使った
  戦略分析を、AI 機能導入の文脈で実践的に解説します。
featured_image: /images/blog/strategy-analysis-swot.webp
type: blog
reading_time: 13
view_count: 0
meta: null
published_at: '2026-05-05T10:30:00.000000Z'
created_at: '2026-05-05T10:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Strategy, slug: strategy}, {name: SWOT, slug: swot}, {name: Analysis, slug: analysis}, {name: AI, slug: ai}]
comments: []
---

優れた BA は、要件を書く前に「組織が今どこにいて、どこへ向かい、AI がその旅路で何を担うか」を理解します。**Strategy Analysis** は、そのための実践ツールセットです。

---

## 1. なぜ AI 時代に Strategy Analysis がより重要なのか

多くの組織は「他社がやっているから」という理由で AI を導入します。BA が問うべきは次です。**この AI 機能は何の課題を、誰のために、何で測って解決するのか？**

この 3 つに明確な答えがないと、AI プロジェクトは 3 か月で失速します。

---

## 2. AI イニシアティブ向け SWOT

SWOT は全社戦略だけのものではありません。BA は AI 機能の実現可能性分析に使えます。

### 例：カスタマーサポート向け AI チャットボット

| | ポジティブ | ネガティブ |
|---|---|---|
| **内部要因（Internal）** | **Strengths:** 豊富なチケット履歴データ、ML エンジニア在籍、経営支援あり | **Weaknesses:** ナレッジベース未標準化、ground truth ラベル不足、サポートチームの AI 運用経験不足 |
| **外部要因（External）** | **Opportunities:** 24/7 サポート期待、競合に AI 未導入 | **Threats:** AI 開示規制、hallucination によるブランド毀損リスク |

**BA による SWOT 活用:**
- Strengths -> 既存データ/能力に基づいて優先順位付け
- Weaknesses -> Assumption Log に登録し go-live 前に解消
- Opportunities -> ステークホルダー投資判断の根拠にする
- Threats -> Risk Register に入れ mitigation 設計

---

## 3. AI 文脈での PESTLE

PESTLE は AI 施策に影響する外部環境を分析します。

| 要因 | BA が問うべきこと | 影響例 |
|---|---|---|
| **Political** | 国・業界の AI 政策は？ | 金融・医療での AI 規制 |
| **Economic** | 期待 ROI は？ 予算と効果は釣り合うか？ | X FTE 削減 = 年間 Y 億円 |
| **Social** | ユーザーは AI を信頼するか？ | 失職不安 -> 導入抵抗 |
| **Technology** | 現行インフラで十分か？ | GPU、cloud、data pipeline が必要 |
| **Legal** | GDPR・PCI・HIPAA の影響は？ | PII を学習に使えない |
| **Environmental** | 学習時のカーボン負荷は？ | ESG 報告要件 |

---

## 4. Impact Mapping：Goal から Feature へ

Impact Mapping が答える問いは **「なぜこの機能を作るのか」** です。

```
Goal (Business Outcome)
└── Who (Actors)
    └── Impact (Behavior Change)
        └── Deliverable (Feature / Requirement)
```

### 実例

```
Goal: 請求処理時間を 50% 短縮

├── Claims Adjuster
│   ├── Impact: 定型ケースの手動レビューを削減
│   └── Deliverable: 5M 未満かつ score > 0.92 の請求を AI 自動承認

├── Customer
│   ├── Impact: より早く結果を受け取れる
│   └── Deliverable: メール/アプリでリアルタイム進捗通知

└── Compliance Officer
    ├── Impact: AI 判断の監査証跡を完全化
    └── Deliverable: 理由付きで出力可能な decision log
```

Impact Mapping により **scope creep** を防げます。すべての機能は Goal と Impact にトレース可能であるべきです。

---

## 5. Value Stream Mapping：AI を注入すべき場所を見つける

Value Stream Mapping（VSM）は、入力から出力までの価値創出フローを時間付きで可視化します。

### VSM から AI 機会を読む

| 兆候 | 意味 | AI 解決策 |
|---|---|---|
| **Wait Time が高い** | 手作業ボトルネック | 当該ステップを AI 自動化 |
| **Error Rate が高い** | 判断のばらつき | AI で出力標準化 |
| **連携人数が多い** | コミュニケーション負荷 | AI で自動ルーティング/割当 |
| **反復データが多い** | パターン予測可能 | 手動参照を AI 予測に置換 |

---

## 6. AIプロジェクトの Strategy Analysis 実務フロー

```
1. PESTLE Scan (1-2日)
   -> 法規制制約を特定
   -> AI 機能のハード境界になる

2. SWOT with AI lens (半日ワークショップ)
   -> data maturity と technical readiness に集中
   -> Output: Go/No-go シグナル、前提条件リスト

3. Value Stream Mapping (1日)
   -> AI 注入ポイントを特定（全工程に入れない）
   -> 優先順位: impact x feasibility

4. Impact Mapping (半日)
   -> 機能一覧を business goal と整合
   -> Output: 優先度付き feature backlog
```

---

## まとめ

Strategy Analysis は「とりあえずの分析」ではありません。要件に意味を持たせる土台です。この工程を丁寧に行う BA は、組織が「課題違い・対象違い・タイミング違い」の AI 機能を作ることを防ぎます。

**次のステップ:** 戦略コンテキストが整ったら [BA Planning & Monitoring](/blog/ba-planning-monitoring-for-ai-projects) で実行計画を設計しましょう。
