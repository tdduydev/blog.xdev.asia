---
id: 02760001-ba01-4001-a003-000000000003
title: "BA向け Confluence & Notion：AIチームの標準要件ナレッジベースを構築する"
slug: confluence-notion-for-ba-knowledge-base
excerpt: >-
  BA にとって Confluence や Notion は単なる文書保管ではなく、チーム全体の
  single source of truth を作るための基盤です。AI プロジェクト向けに、
  space 構造、BRD/FRD テンプレート、Jira 連携、assumption log 管理を解説します。
featured_image: /images/blog/confluence-notion-ba.webp
type: blog
reading_time: 11
view_count: 0
meta: null
published_at: '2026-05-05T11:00:00.000000Z'
created_at: '2026-05-05T11:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Confluence, slug: confluence}, {name: Notion, slug: notion}, {name: Documentation, slug: documentation}, {name: AI, slug: ai}]
comments: []
---

優れた BA は要件を書くだけではありません。要件が **見つけやすく、理解しやすく、重複しない** 状態をプロジェクト全体で維持します。そのために Confluence と Notion は不可欠です。

---

## 1. なぜ BA に標準ナレッジベースが必要か

AI プロジェクトでは情報変化が速いです。
- sprint review 後に acceptance threshold が調整される
- 実データ投入で data assumption が崩れる
- 新規 stakeholder が途中参加し、迅速なキャッチアップが必要

single source of truth がないと、チームの理解が分裂し、高コストな rework が発生します。

---

## 2. AIプロジェクト向け Confluence Space 構成

```
📁 [Product/Project Name]
├── 📄 Project Overview (目的、stakeholders、timeline)
├── 📁 Requirements
│   ├── 📄 BRD — Business Requirements Document
│   ├── 📄 FRD — Functional Requirements Document
│   ├── 📄 Non-functional Requirements (performance, security)
│   └── 📄 Assumption Log
├── 📁 AI Specifics
│   ├── 📄 AI Feature Inventory (名称、目的、owner)
│   ├── 📄 Model Evaluation Criteria
│   ├── 📄 Data Dictionary
│   └── 📄 Bias & Fairness Checklist
├── 📁 Design
│   ├── 📄 User Journey Maps
│   ├── 📄 Flow Diagrams (BPMN/UML)
│   └── 📄 Wireframes (Figma link)
├── 📁 Testing
│   ├── 📄 UAT Plan & Scripts
│   └── 📄 Bug/Issue Log
└── 📁 Decisions
    ├── 📄 ADR Log (Architecture Decision Records)
    └── 📄 Meeting Notes
```

---

## 3. AIプロジェクト向け標準 BRD テンプレート

```markdown
# Business Requirements Document
## [Feature Name] v[X.X]

| Field | Value |
|-------|-------|
| Author | [BA Name] |
| Status | Draft / In Review / Approved |
| Last Updated | YYYY-MM-DD |
| Stakeholders | [一覧] |

## 1. Problem Statement
[何が起きているか？誰に影響するか？ビジネス影響は何か？]

## 2. Business Objectives
- 目標1: [Measurable]
- 目標2: [Measurable]

## 3. Success Metrics
| Metric | Baseline | Target | Measurement Method |
|--------|----------|--------|--------------------|
| [metric] | [now] | [target] | [how] |

## 4. Scope
### In Scope
- [項目1]

### Out of Scope
- [項目1] — 理由: [why]

## 5. AI-Specific Requirements
| Aspect | Requirement |
|--------|-------------|
| Accuracy Threshold | >= X% on test set Y |
| Fallback Behavior | confidence < Z のとき: [action] |
| Human Override | 誰が権限を持つか？トリガーは何か？ |
| Data Freshness | [period] ごとに再学習 |

## 6. Assumption Log
| ID | Assumption | Owner | Review Date | Status |
|----|-----------|-------|-------------|--------|
| A001 | [assumption] | [name] | [date] | Active/Invalid |

## 7. Constraints
- Legal: [GDPR, 業界規制]
- Technical: [API limits, data retention]
- Budget: [budget ceiling]
```

---

## 4. Requirements と Jira/Azure DevOps の連携

ベストプラクティスは **BRD の各 requirement を Jira ticket と 1 対 1 で紐づけること** です。

Confluence では Jira macro を使ってステータスを埋め込みます。
```
Requirements Section 3.1 -> PROJ-123 (Story: "As a user, I want...")
Acceptance Criteria 3.1.a -> PROJ-124 (Test Case)
```

ticket ステータスが変わると Confluence 側も自動更新されます。

---

## 5. Confluence の代替として Notion を使う場面

| 観点 | Confluence | Notion |
|---|---|---|
| **Atlassian 連携** | ✅ Native (Jira, Bitbucket) | ❌ 外部連携が必要 |
| **AI Assistant** | ✅ Atlassian Intelligence | ✅ Notion AI はより強力 |
| **Flexibility** | ⚠️ Template-heavy | ✅ 非常に柔軟 |
| **Database/Spreadsheet** | ❌ 弱い | ✅ 強い（relational DB） |
| **Free tier** | ❌ 有料中心 | ✅ 無料枠が広い |
| **向いている組織** | Enterprise、Jira 中心チーム | Startup、小規模チーム |

### Notion Database での Requirement Tracking

推奨プロパティ:
- **Requirement ID** (Text)
- **Type** (Select: Functional/Non-functional/AI-specific)
- **Status** (Select: Draft/Approved/Implemented/Deprecated)
- **Priority** (Select: P0/P1/P2)
- **Linked Sprint** (Relation -> Sprint database)
- **AC Count** (Number: acceptance criteria 数)

---

## 6. よくある失敗と回避策

**失敗 1：要件を複数ページへコピペ**  
-> Confluence の "Include Page" macro、または Notion synced block を使用

**失敗 2：Assumption に owner がない**  
-> Assumption Log の各行に検証責任者を必ず設定

**失敗 3：BRD の旧バージョンが明確にアーカイブされていない**  
-> Confluence Page History を活用し、旧ページ先頭に "ARCHIVED" を明記

**失敗 4：Meeting notes が関連 requirement にリンクされていない**  
-> meeting note テンプレートに "Requirements Impacted: [link]" を追加

---

## まとめ

Confluence/Notion は **プロジェクトの記憶** です。初期段階で構造化に投資した BA は、後の clarification 工数を何十時間も削減できます。特に AI チームが go-live 6 か月後に「なぜモデルがこう判断したか」を説明する場面で効果が大きいです。
