---
id: 02760001-ba01-4001-a003-000000000003
title: "BA 的 Confluence & Notion：打造 AI 團隊標準化需求知識庫"
slug: confluence-notion-for-ba-knowledge-base
excerpt: >-
  BA 使用 Confluence 或 Notion，不只是存文件，而是建立團隊 single source of truth。
  本文說明 AI 專案中的 space 結構、BRD/FRD 模板、需求與 Jira ticket 連結，以及
  assumption log 管理方式。
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

優秀的 BA 不只會寫需求，還要確保需求在整個專案生命週期中 **找得到、看得懂、不重複**。這就是為什麼 Confluence 與 Notion 很關鍵。

---

## 1. 為什麼 BA 需要標準化 knowledge base？

在 AI 專案中，資訊變化很快：
- sprint review 後會調整 acceptance threshold
- 收到真實資料後，原本的 data assumption 可能失效
- 新 stakeholder 加入時需要快速追上脈絡

若沒有 single source of truth -> 團隊理解分歧 -> rework 成本高。

---

## 2. AI 專案的 Confluence Space 結構

```
📁 [Product/Project Name]
├── 📄 Project Overview (目標、stakeholders、timeline)
├── 📁 Requirements
│   ├── 📄 BRD — Business Requirements Document
│   ├── 📄 FRD — Functional Requirements Document
│   ├── 📄 Non-functional Requirements (performance, security)
│   └── 📄 Assumption Log
├── 📁 AI Specifics
│   ├── 📄 AI Feature Inventory (名稱、目的、owner)
│   ├── 📄 Model Evaluation Criteria
│   ├── 📄 Data Dictionary
│   └── 📄 Bias & Fairness Checklist
├── 📁 Design
│   ├── 📄 User Journey Maps
│   ├── 📄 Flow Diagrams (BPMN/UML)
│   └── 📄 Wireframes (Figma 連結)
├── 📁 Testing
│   ├── 📄 UAT Plan & Scripts
│   └── 📄 Bug/Issue Log
└── 📁 Decisions
    ├── 📄 ADR Log (Architecture Decision Records)
    └── 📄 Meeting Notes
```

---

## 3. AI 專案標準 BRD 模板

```markdown
# Business Requirements Document
## [Feature Name] v[X.X]

| Field | Value |
|-------|-------|
| Author | [BA Name] |
| Status | Draft / In Review / Approved |
| Last Updated | YYYY-MM-DD |
| Stakeholders | [清單] |

## 1. Problem Statement
[發生了什麼問題？影響誰？商業影響是什麼？]

## 2. Business Objectives
- 目標 1: [Measurable]
- 目標 2: [Measurable]

## 3. Success Metrics
| Metric | Baseline | Target | Measurement Method |
|--------|----------|--------|--------------------|
| [metric] | [now] | [target] | [how] |

## 4. Scope
### In Scope
- [Item 1]

### Out of Scope
- [Item 1] — 原因: [why]

## 5. AI-Specific Requirements
| Aspect | Requirement |
|--------|-------------|
| Accuracy Threshold | >= X% on test set Y |
| Fallback Behavior | confidence < Z 時: [action] |
| Human Override | 誰有權限？trigger 是什麼？ |
| Data Freshness | model 每 [period] retrain |

## 6. Assumption Log
| ID | Assumption | Owner | Review Date | Status |
|----|-----------|-------|-------------|--------|
| A001 | [assumption] | [name] | [date] | Active/Invalid |

## 7. Constraints
- Legal: [GDPR, industry regulation]
- Technical: [API limits, data retention]
- Budget: [budget ceiling]
```

---

## 4. 將 Requirements 與 Jira/Azure DevOps 連結

最佳實務：**BRD 中每條 requirement 都要對應一張 Jira ticket**。

在 Confluence 中可用 Jira macro 嵌入 ticket 狀態：
```
Requirements Section 3.1 -> PROJ-123 (Story: "As a user, I want...")
Acceptance Criteria 3.1.a -> PROJ-124 (Test Case)
```

當 ticket 狀態改變時，Confluence 會自動更新。

---

## 5. Notion 何時可替代 Confluence？

| 評估項目 | Confluence | Notion |
|---|---|---|
| **Atlassian 整合** | ✅ Native（Jira、Bitbucket） | ❌ 需第三方 |
| **AI Assistant** | ✅ Atlassian Intelligence | ✅ Notion AI 較強 |
| **Flexibility** | ⚠️ 偏 template-heavy | ✅ 高度彈性 |
| **Database/Spreadsheet** | ❌ 較弱 | ✅ 強（relational DB） |
| **Free tier** | ❌ 多為付費 | ✅ 免費額度較寬鬆 |
| **適合團隊** | Enterprise、Jira 團隊 | Startup、小團隊 |

### Notion Database 用於 Requirement Tracking

可建立以下 properties：
- **Requirement ID**（Text）
- **Type**（Select: Functional/Non-functional/AI-specific）
- **Status**（Select: Draft/Approved/Implemented/Deprecated）
- **Priority**（Select: P0/P1/P2）
- **Linked Sprint**（Relation -> Sprint database）
- **AC Count**（Number：acceptance criteria 數量）

---

## 6. 常見錯誤與避免方式

**錯誤 1：把同一份需求複製貼上到多個頁面**  
-> 使用 Confluence 的 Include Page macro，或 Notion synced block

**錯誤 2：Assumption 沒有 owner**  
-> Assumption Log 每一列都必須指定負責驗證的人

**錯誤 3：舊版 BRD 沒有明確封存**  
-> 使用 Confluence Page History，並在舊頁首標示「ARCHIVED」

**錯誤 4：Meeting notes 沒有連回受影響需求**  
-> 在會議模板加入「Requirements Impacted: [link]」

---

## 結論

Confluence/Notion 是 **專案記憶體**。BA 若一開始就把結構搭好，後續可省下大量澄清時間，尤其 AI 團隊在 go-live 六個月後還要解釋「為什麼 model 這樣判斷」時更顯重要。
