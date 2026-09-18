---
id: 02760001-ba01-4001-a003-000000000001
title: "BA Planning & Monitoring：如何在 AI 專案中規劃與追蹤 BA 進度"
slug: ba-planning-monitoring-for-ai-projects
excerpt: >-
  BA Planning 不只是把 scope 填進模板。在 AI 專案中，BA 計畫必須整合迭代檢查點、
  data/model 假設追蹤，以及當 AI 功能輸出偏離需求時的 escalation path。
  本文提供可落地的 BA Monitoring Framework。
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

AI 專案中的 BA Planning 與傳統專案有一個核心差異：**需求是靜態的，但 AI 輸出是機率性的**。這表示你的計畫需要驗證迴圈，而不只是線性里程碑。

---

## 1. AI 專案的 BA Planning Framework

### 1.1 帶有 AI 邊界的 Scope Definition

在規劃之前，BA 必須明確定義：

| 組件 | 要回答的問題 | 範例 |
|---|---|---|
| **AI Scope** | AI 處理流程的哪一段？ | 「AI 自動分類 70% ticket」 |
| **Human Scope** | 哪些案例由人員審核？ | 「ticket confidence < 0.8 -> escalate」 |
| **Data Dependency** | AI 正確運作需要哪些資料？ | 「6 個月已標註 ticket 歷史」 |
| **Acceptance Threshold** | 何時判定 AI 功能為「done」？ | 「test set Accuracy >= 85%」 |

### 1.2 AI 功能的 WBS

AI 功能的 Work Breakdown Structure 可分 5 大工作群：

```
AI Feature: [Feature Name]
├── 1. Data & Requirements
│   ├── 1.1 Data audit (schema, volume, quality)
│   ├── 1.2 與 stakeholder 進行 Elicitation
│   └── 1.3 撰寫 Acceptance criteria
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

## 2. Iterative Checkpoint，不是 Waterfall

AI 專案通常採用 Agile/Sprint。BA 需要把檢查點嵌入每個 sprint：

### Sprint Planning Checklist（BA 視角）
- [ ] 本 sprint 的資料是否已就緒？（不是「將會就緒」）
- [ ] Acceptance criteria 是否用 Given/When/Then 格式？
- [ ] 是否已與 Dev 檢視 fallback path？
- [ ] threshold 與上個 sprint 相比是否有變更？

### Mid-Sprint Check（第 5-7 天）
- [ ] AI output 是否達到預期 threshold？
- [ ] 是否出現新的 edge case？
- [ ] 哪些假設需要更新到 ADR（Architecture Decision Record）？

---

## 3. BA Monitoring：AI 上線後的追蹤

很多 BA 認為 go-live 就結束了。這是錯的。對 AI 功能而言，BA 需要建立 monitoring framework：

### 3.1 需要追蹤的 Metrics

| Metric 類型 | 具體指標 | 警示門檻 |
|---|---|---|
| **Quality** | Accuracy / F1 / Precision | 相較 baseline 下降 > 5% |
| **Business** | Human override rate | 相較第一週增加 > 20% |
| **Volume** | 每日 request 數 | 突增 > 3x |
| **Feedback** | User complaint rate | > 總 request 的 2% |

### 3.2 Drift Detection

AI model 可能發生 **concept drift**：世界已改變，但 model 還在依舊資料模式運作。BA 應該：

1. 在 go-live 前最後一個 sprint 定義 **baseline**
2. 設定重新評估 trigger（每月，或當 metric 下滑）
3. 明確 owner：AI drift 時誰負責？（RACI）

---

## 4. 實用 BA Planning Template

```markdown
## BA Plan: [Feature Name]
**Version:** 1.0 | **Date:** YYYY-MM-DD | **Owner:** [BA Name]

### Scope Summary
- AI handles: [簡短描述]
- Human handles: [簡短描述]
- Out of scope: [明確列出]

### Data Dependencies
| Data | Source | Owner | Status |
|------|--------|-------|--------|
| [data1] | [system] | [team] | ✅/❌ |

### Acceptance Criteria (top-level)
- [ ] AI accuracy >= [X]% on [Y] test cases
- [ ] Edge case coverage: [list] handled
- [ ] Human override rate <= [Z]%

### Monitoring Setup
- Dashboard: [link]
- Alert owner: [name]
- Review cadence: [weekly/monthly]
```

---

## 5. AI 專案 BA Planning 常見錯誤

**錯誤 1：只寫「Accuracy」，未定義哪個資料集**  
-> 修正：明確寫出「來自 [source]、[time range] 的 test set accuracy」

**錯誤 2：沒有追蹤 assumption**  
-> 修正：每個 assumption 必須有 ID、owner、review date

**錯誤 3：把 AI feature 當一般功能，done 就結束**  
-> 修正：在 Definition of Done 加上「Post-launch monitoring period: 4 weeks」

---

## 結論

AI 功能的 BA Planning 並非更複雜，而是需要 **機率思維而非二元思維**。好的計畫要有 assumption 驗證迴圈、明確數值門檻，以及 go-live 後的 monitoring。

**下一步：**閱讀 [Strategy Analysis](/blog/strategy-analysis-swot-pestle-for-ba)，先做好規劃前的情境分析。
