---
id: 02760001-ba01-4001-a003-000000000007
title: "Human-in-the-Loop Escalation Design：BA 如何設計 AI 何時需要人工介入"
slug: human-in-the-loop-escalation-design-for-ba
excerpt: >-
  Human-in-the-loop 不只是「加一個 confirm 按鈕」。BA 需要設計 escalation threshold、
  routing rule、agent review SLA 與 feedback loop。本文提供 decision matrix 與
  escalation flow template 的完整 HITL 設計方法。
featured_image: /images/blog/human-in-the-loop-design.webp
type: blog
reading_time: 13
view_count: 0
meta: null
published_at: '2026-05-05T13:00:00.000000Z'
created_at: '2026-05-05T13:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: HITL, slug: hitl}, {name: Escalation, slug: escalation}, {name: AI Design, slug: ai-design}, {name: AI, slug: ai}]
comments: []
---

沒有任何 AI 是完美的。真正問題不是「AI 何時會錯」，而是「AI 出錯時系統怎麼處理、誰負責」。這就是 BA 必須解決的 HITL（Human-in-the-loop）設計問題。

---

## 1. 什麼是 HITL，為什麼重要？

Human-in-the-loop 是一種設計模式：在人機關鍵決策點引入人員，而不是讓 AI 全自動執行。

**HITL 必要的 3 個原因：**
1. **Confidence gap** -> AI 信心不足，不適合自動決策
2. **High-stakes decision** -> 錯誤代價過高（醫療、金融、法務）
3. **Regulatory requirement** -> 部分產業法規要求強制 human review（GDPR Article 22）

---

## 2. Escalation Trigger 設計

### 2.1 Trigger 類型

| Trigger Type | 範例 | Escalation 到 |
|---|---|---|
| **Confidence threshold** | Score < 0.80 | 一般審核隊列 |
| **Sensitive category** | Input 含敏感詞 | Senior reviewer |
| **High-value transaction** | 金額 > 50 million | Manager approval |
| **New entity** | 首次 customer/case | Manual onboarding flow |
| **Model uncertainty flag** | AI 自我標記「不確定」 | Specialist team |
| **Time constraint** | SLA 快到期 | Urgent queue |

### 2.2 Threshold Calibration

BA 不應單獨決定 threshold，必須與 stakeholder 校準：

```
應詢問的問題：
1.「如果 AI 每 10 件錯 1 件，business 能接受嗎？」
   -> Threshold >= 0.9

2.「false negative（漏判）的成本是多少？」
   -> 若成本高，threshold 要更高，接受更多 escalation

3.「agent review 每天能處理幾件？」
   -> capacity 會反向影響 threshold 設定
```

---

## 3. Escalation Flow Template

```
[AI Processing Complete]
         ↓
[Check Trigger Conditions]
    ↙         ↘
No trigger   Trigger detected
    ↓              ↓
[Auto Action]  [Determine Escalation Level]
               ├── Level 1: Standard Queue (SLA: 4h)
               ├── Level 2: Priority Queue (SLA: 1h)
               └── Level 3: Immediate Alert (SLA: 15min)
                        ↓
               [Route to Appropriate Reviewer]
               (by skill, availability, or round-robin)
                        ↓
               [Agent Review Interface]
               ├── 顯示 AI recommendation + confidence
               ├── 顯示原始 input/context
               ├── Action: Approve / Reject / Edit / Escalate
               └── Mandatory: Comment（若 reject/edit）
                        ↓
               [Record Decision + Override Reason]
                        ↓
               [Feedback to Model (if applicable)]
```

---

## 4. Agent Review Interface Requirements

BA 必須明確規格 agent review UI：

```markdown
## Agent Review Screen — AC

### Must Show:
- [ ] 完整 original input/request（不可 truncate）
- [ ] AI recommendation 與 confidence score
- [ ] AI explanation（若 model 支援 XAI）
- [ ] Relevant context（customer history、similar cases）
- [ ] SLA countdown（deadline 前剩餘時間）

### Actions Required:
- [ ] Approve（1-click，可選 comment）
- [ ] Reject（mandatory reason：dropdown + free text）
- [ ] Edit AI output 並 submit corrected 結果
- [ ] Escalate to higher level 並填寫 reason

### Audit Trail (auto-captured):
- [ ] Agent ID + timestamp
- [ ] Action taken
- [ ] Comment/reason
- [ ] Review 花費時間（start -> submit）
```

---

## 5. SLA 與 Capacity Planning

BA 需要估算工作量並定義 SLA：

### SLA Matrix

| Escalation Level | Trigger | SLA | Breach Action |
|---|---|---|---|
| Standard | Confidence 0.7-0.8 | 4 business hours | 自動升級到 Level 2 |
| Priority | Confidence < 0.7 or high-value | 1 hour | 通知 supervisor |
| Critical | Safety flag or regulatory | 15 minutes | 呼叫 on-call |

### Capacity Formula

```
Daily escalation volume = Total requests x Escalation rate
Agent capacity needed = Daily escalation volume ÷ (cases/agent/day)

範例：
- 1000 requests/day x 15% escalation rate = 150 cases
- 每位 agent 可處理 30 cases/day
- 至少需要 5 位（加 20% buffer = 6 位）
```

---

## 6. Feedback Loop 設計

Escalation 不是終點，必須形成 feedback loop：

| Decision | Feedback 用途 |
|---|---|
| Agent approves AI recommendation | 正向訊號，強化 model |
| Agent overrides AI output | 負向訊號 + 修正 label |
| Agent escalates higher | 標記為 retraining data 收集目標 |
| 同類別多次 override | 觸發 model review/retraining |

**BA 必須規範：**feedback 頻率、labeling 流程、retraining trigger 責任人。

---

## 結論

良好的 HITL 設計能讓 AI 在較低 threshold 也能較早上線，因為有人類 safety net。反之，HITL 設計不佳會導致 agent burnout、SLA breach，最後因「不可信」而停用 AI 功能。

BA 是平衡 AI autonomy 與 human oversight 的架構設計者。
