---
id: 02760001-ba01-4001-a003-000000000007
title: "Human-in-the-Loop Escalation Design：AIが人間判断を必要とする場面をBAが設計する"
slug: human-in-the-loop-escalation-design-for-ba
excerpt: >-
  Human-in-the-loop は「confirm ボタンを足す」だけではありません。BA は
  escalation threshold、routing rule、agent review の SLA、feedback loop を設計する
  必要があります。decision matrix と flow template 付きの実践 HITL ガイドです。
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

完璧な AI は存在しません。問いは「いつ AI が間違えるか」ではなく、「AI が間違えたときシステムはどう処理し、誰が責任を持つか」です。これが BA が解くべき HITL（Human-in-the-loop）設計課題です。

---

## 1. HITL とは何か、なぜ重要か

Human-in-the-loop とは、AI を完全自動で動かすのではなく、特定の意思決定ポイントで人間を組み込む設計パターンです。

**HITL が必要な 3 つの理由:**
1. **Confidence gap** -> AI の確信度が自動判断に足りない
2. **High-stakes decision** -> 誤りコストが高い（医療、金融、法務）
3. **Regulatory requirement** -> 一部業界では human review が法的に必須（GDPR Article 22）

---

## 2. Escalation Trigger の設計

### 2.1 Trigger の種類

| Trigger Type | 例 | エスカレーション先 |
|---|---|---|
| **Confidence threshold** | Score < 0.80 | 通常レビューキュー |
| **Sensitive category** | 入力に機微語句を含む | Senior reviewer |
| **High-value transaction** | 金額 > 50 million | Manager approval |
| **New entity** | 初回顧客/初回ケース | Manual onboarding flow |
| **Model uncertainty flag** | AI が「不確実」と自己申告 | Specialist team |
| **Time constraint** | SLA 期限が近い | Urgent queue |

### 2.2 Threshold Calibration

threshold は BA 単独で決めるものではなく、stakeholder と較正します。

```
確認すべき質問:
1. 「AI が 10 件中 1 件間違うことを business は許容できますか？」
   -> Threshold >= 0.9

2. 「false negative（見逃し）のコストはいくらですか？」
   -> 高コストなら threshold を上げ、escalation を増やす

3. 「review agent は 1 日何件処理できますか？」
   -> 処理能力が threshold 設計に逆影響する
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
               ├── AI recommendation + confidence を表示
               ├── 元入力/context を表示
               ├── Action: Approve / Reject / Edit / Escalate
               └── 必須: Comment（reject/edit 時）
                        ↓
               [Record Decision + Override Reason]
                        ↓
               [Feedback to Model (if applicable)]
```

---

## 4. Agent Review Interface の要件

BA は review UI 要件を具体化する必要があります。

```markdown
## Agent Review Screen — AC

### Must Show:
- [ ] 元入力/request 全文（truncate しない）
- [ ] AI recommendation と confidence score
- [ ] AI explanation（XAI がある場合）
- [ ] 関連 context（顧客履歴、類似ケース）
- [ ] SLA countdown（期限まで残り時間）

### Actions Required:
- [ ] Approve（1-click、comment 任意）
- [ ] Reject（理由必須: dropdown + free text）
- [ ] AI 出力を編集して corrected として submit
- [ ] 上位レベルへ escalate（理由付き）

### Audit Trail (auto-captured):
- [ ] Agent ID + timestamp
- [ ] Action taken
- [ ] Comment/reason
- [ ] Review 所要時間（start -> submit）
```

---

## 5. SLA と Capacity Planning

BA は workload 見積もりと SLA 定義を行います。

### SLA Matrix

| Escalation Level | Trigger | SLA | Breach Action |
|---|---|---|---|
| Standard | Confidence 0.7-0.8 | 4 business hours | Level 2 へ自動エスカレーション |
| Priority | Confidence < 0.7 or high-value | 1 hour | supervisor へ alert |
| Critical | Safety flag or regulatory | 15 minutes | on-call を呼び出し |

### Capacity Formula

```
Daily escalation volume = Total requests x Escalation rate
Agent capacity needed = Daily escalation volume ÷ (cases/agent/day)

例:
- 1000 requests/day x 15% escalation rate = 150 cases
- Agent が 30 cases/day 処理
- 最低 5 agents（+20% buffer = 6 agents）
```

---

## 6. Feedback Loop の設計

escalation は終点ではなく、学習ループに接続すべきです。

| Decision | フィードバックの用途 |
|---|---|
| Agent が AI 推奨を承認 | 正例シグナルとして強化 |
| Agent が AI 出力を上書き | 負例シグナル + 修正ラベル |
| Agent が上位へエスカレーション | 再学習データ収集のフラグ |
| 同カテゴリで上書き多発 | model review/retraining を発火 |

**BA が明示すべき項目:** feedback 頻度、labeling プロセス、retraining の責任者。

---

## まとめ

優れた HITL 設計があれば、人間の safety net により低め閾値でも早期リリースが可能です。逆に HITL 設計が不十分だと、agent burnout、SLA breach、最終的な AI 機能停止につながります。

BA は AI autonomy と human oversight のバランスを設計するアーキテクトです。
