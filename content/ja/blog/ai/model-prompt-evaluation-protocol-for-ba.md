---
id: 02760001-ba01-4001-a003-000000000006
title: "Model & Prompt Evaluation Protocol：BAはAI出力をどう評価すべきか"
slug: model-prompt-evaluation-protocol-for-ba
excerpt: >-
  BA は「出力がそれっぽい」で AI を評価してはいけません。必要なのは、
  evaluation criteria、scoring rubric、blind test methodology、go/no-go framework
  を備えた明確な protocol です。test set 設計から sign-off までを体系的に解説します。
featured_image: /images/blog/model-evaluation-protocol.webp
type: blog
reading_time: 14
view_count: 0
meta: null
published_at: '2026-05-05T12:30:00.000000Z'
created_at: '2026-05-05T12:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Model Evaluation, slug: model-evaluation}, {name: AI Testing, slug: ai-testing}, {name: Quality, slug: quality}, {name: AI, slug: ai}]
comments: []
---

Dev が「model は accuracy 89% です」と言ったら、BA はすぐに問うべきです。**どのデータ集合での 89% ですか？誰がラベル付けしましたか？本番データを代表していますか？** 明確な protocol がない 89% は、意味を持たない可能性があります。

---

## 1. なぜ BA に Evaluation Protocol が必要か

model evaluation は ML engineer だけの仕事ではありません。BA が関与すべき理由は次のとおりです。

- **Acceptance criteria** は事前合意された methodology で検証される必要がある
- **Bias detection** には BA の domain knowledge が不可欠
- **Business context** により許容可能な error 種別（false positive vs false negative）が変わる

---

## 2. Evaluation Test Set の設計

### 2.1 Test Set の原則

| 原則 | 説明 | 例 |
|---|---|---|
| **Representative** | 本番分布に近い | 60% routine / 30% edge case / 10% rare |
| **Independent** | training data と重複しない | 直近期間の未学習データを採用 |
| **Labeled by domain expert** | 自己ラベリングしない | BA + SME で共同ラベル |
| **Sufficient size** | 統計的有意性を確保 | 最低 200 cases/class |

### 2.2 Test Set Composition Template

```markdown
## Test Set: [AI Feature Name] v[X]

### Distribution Plan
| Category | Count | % | Source |
|----------|-------|---|--------|
| Normal cases | 300 | 60% | [system/period] |
| Edge cases | 150 | 30% | [curated by BA] |
| Adversarial | 50 | 10% | [red-team results] |
| **Total** | **500** | **100%** | |

### Label Protocol
- Labeler 1: [BA Name] (domain)
- Labeler 2: [SME Name] (subject matter)
- Conflict resolution: [2人のラベルが不一致のときの手順]
- Inter-annotator agreement target: >= 0.85 (Cohen's Kappa)
```

---

## 3. Evaluation Criteria Framework

### 3.1 課題タイプごとの適切な指標

| 課題タイプ | BA が要求すべき指標 | 重要となる場面 |
|---|---|---|
| 二値分類 | Accuracy, Precision, Recall, F1 | class imbalance がある場合 |
| 多クラス分類 | Macro F1, Confusion Matrix | 全クラス同等に重要な場合 |
| 生成（chatbot） | BLEU, ROUGE, Human eval | テキスト品質評価が必要な場合 |
| Ranking/Retrieval | NDCG, MRR | 順序が重要な場合 |
| ビジネス指標 | human override 率、first-time-right 率 | **常に追加が必要** |

### 3.2 False Positive と False Negative のトレードオフ

BA は stakeholder とともに次を決めます。

| | False Positive | False Negative |
|---|---|---|
| **定義** | AI が「あり」と判定、実際は「なし」 | AI が「なし」と判定、実際は「あり」 |
| **例（fraud 検知）** | 正常取引をブロック | 不正取引を見逃す |
| **ビジネスコスト** | 苦情増加、売上損失 | 金銭損失、信用毀損 |
| **優先して減らす対象** | CX 重視ならこちら | リスク/安全重視ならこちら |

---

## 4. Evaluation Scoring Rubric

AI 生成系（chatbot、summarization）は automated metric だけでなく rubric を使います。

```markdown
## Evaluation Rubric: [Chatbot Feature]

### Dimension 1: Accuracy (0-5)
- 5: 完全に正確
- 4: 正確だが軽微な誤りが 1-2 件
- 3: 概ね正しいが重要な誤りがある
- 2: 誤りが多い、または重要情報が欠落
- 1: ほぼ誤り、または非関連
- 0: 完全な hallucination

### Dimension 2: Relevance (0-5)
[同様に定義]

### Dimension 3: Safety (0/3/5 — 非線形)
- 5: 完全に安全
- 3: warning レベルの問題ありだが有害ではない
- 0: harmful content を含む -> AUTO FAIL

### Overall Score = (D1 x 0.4) + (D2 x 0.3) + (D3 x 0.3)
### Pass threshold: >= 3.5 / 5
```

---

## 5. Go/No-Go Framework

```markdown
## Evaluation Sign-off: [Feature] [Date]

### Metric Results
| Metric | Target | Actual | Pass? |
|--------|--------|--------|-------|
| Accuracy on test set | >= 87% | [X]% | ☐ |
| F1 Score (edge cases) | >= 0.75 | [X] | ☐ |
| Human eval score | >= 3.5/5 | [X] | ☐ |
| False negative rate | <= 5% | [X]% | ☐ |
| Red-team: no critical failure | 100% pass | [X]% | ☐ |

### Decision
- [ ] **GO** — 全指標達成、UAT へ進む
- [ ] **CONDITIONAL GO** — [X] 指標は達成、[Y] は go-live 後監視
- [ ] **NO-GO** — [具体理由]、再評価前に [Action] が必要

### Sign-off
- BA: _________________ Date: _______
- PM: _________________ Date: _______
- Tech Lead: __________ Date: _______
```

---

## 6. Model Evaluation での典型的な失敗

**失敗 1：training data 上で評価する**  
-> overfitting を検出できない。BA は独立 test set を要求する

**失敗 2：1 つの指標だけを見る**  
-> Accuracy 90% でも minority class の recall が 0% の可能性がある

**失敗 3：human baseline がない**  
-> 「AI は 85%」が、何と比べて良いのか不明

**失敗 4：cohort 別テストをしない**  
-> 全体精度は良く見えても、特定顧客群に不公平が起きる

---

## まとめ

evaluation protocol は、AI 機能がリリース可能かを定義する **BA と engineering の契約** です。この文書は model 開発後ではなく、開発開始前に存在しているべきです。
