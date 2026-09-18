---
id: 02760001-ba01-4001-a004-000000000001
title: "負責任的 AI 需求：BA 為安全 AI 功能撰寫需求"
slug: responsible-ai-requirements-ba
excerpt: >-
  公平性、可解釋性、隱私和人類覆蓋不只是流行詞——當構建 AI 功能時，這些是 BA 必須擷取的真實需求。本指南教如何將 Responsible AI 需求寫入 BRD/SRS、用檢查清單驗證，並與 EU AI Act 和 NIST AI RMF 等框架對齊。
featured_image: /images/blog/responsible-ai-requirements.webp
type: blog
reading_time: 11
view_count: 0
meta: null
published_at: '2026-05-05T11:00:00.000000Z'
created_at: '2026-05-05T11:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Responsible AI, slug: responsible-ai}, {name: AI Governance, slug: ai-governance}, {name: Requirements, slug: requirements}]
comments: []
---

BA 常以為 Responsible AI 是 AI 團隊或法務的工作。但現實：**如果 BA 不在規格中擷取這些需求，開發人員也不會構建它們**。當本機有問題時，第一個問題會是：「這在需求中嗎？」

本指南幫助 BA 知道**寫什麼、擷取什麼**。無需理解演算法。

---

## 1. BA 必須擷取的 Responsible AI 四大支柱

### 1.1 公平性（Fairness）

AI 不得基於機密屬性而支持或歧視：性別、民族、年齡、收入。

**BA 必須擷取：**
- 領域中的受保護屬性（例如：Fintech → 無地區/收入歧視）
- 如何測量公平性：demographic parity、equal opportunity、equalized odds
- 偏差測試計劃：用多樣性代表性資料測試

**需求例子：**
> NFR-FAIR-01：信用評分模型在評估測試集時必須達成人口統計群組間 disparate impact ratio ≥ 0.8。go-live 前由 Data Science 團隊報告結果。

### 1.2 可解釋性（Explainability）

使用者和操作者必須理解 AI 做決定的**理由**。

**BA 必須擷取：**
- 使用者有權要求理由嗎？（特別是高風險決定）
- 解釋程度：「AI 因你之前...而推薦 X」對「你的分數是 720/1000」
- 何時需要完整審計線索

**需求例子：**
> REQ-EXPL-01：AI 拒絕貸款申請時，螢幕必須用終端使用者能理解的平文（非技術分數）顯示 ≥3 具體理由。理由以時戳記錄到審計線索。

### 1.3 隱私（Privacy）

使用者資料不能未明確同意就用來訓練模型。

**BA 必須擷取：**
- AI 使用哪些資料類型？PII/PHI 是否匿名化？
- 會話歷史用於微調嗎？若是，同意流程是什麼？
- 資料保留：會話日誌保留多久？

**需求例子：**
> REQ-PRIV-01：會話歷史只在使用者於登錄時明確選擇後才為產品改進保留。預設：退出。如果未選擇，日誌於 90 天後刪除。

### 1.4 人類覆蓋（Human Override）

使用者或操作者必須能在高風險情況覆蓋 AI 決定。

**BA 必須擷取：**
- 哪些 AI 決定可自動執行對必須人類批准
- 覆蓋機制：按鈕、表單、主管存取
- 覆蓋記錄：誰、何時、為什麼

**需求例子：**
> REQ-HUMAN-01：AI **不能**自動阻止帳戶。當詐欺風險 > 0.9 時，AI 只為 Fraud Team 審查標記。阻止行動需人類確認後才執行。

---

## 2. 風險等級 → 必要的 Responsible AI 需求

不是每個 AI 功能都需相同等級的保護措施。NIST AI RMF 和 EU AI Act 按風險分類：

| 風險等級 | 例子 | 必要需求 |
|---------|-----|--------|
| **最小** | AI 郵件自動完成 | 基本：不存儲不必要 PII |
| **有限** | AI 客服聊天機器人 | 透明度（揭露是 AI）、資料隱私 |
| **高** | AI 信用評分、招聘 | 完整：公平性測試、可解釋性、審計線索、人類監督 |
| **不可接受** | AI 社會信用評分 | 無法構建（EU AI Act 禁止） |

**實踐：** BA 在寫需求前應做 AI 風險評估。簡單範本：

| 問題 | 答案 | 風險點 |
|------|------|--------|
| AI 影響財務決定嗎？ | 是/否 | 是為 +3 |
| AI 使用機密屬性嗎？ | 是/否 | 是為 +2 |
| AI 決定可未審查執行嗎？ | 是/否 | 是為 +2 |
| AI 出錯時使用者可能受傷嗎？ | 是/否 | 是為 +3 |

分數 ≥ 5 → 高風險 → 需完整 Responsible AI 需求。

---

## 3. BA 用 Responsible AI 檢查清單

```
公平性
☐ 識別領域中的受保護屬性
☐ 在 NFR 部分納入偏差測試
☐ 定義公平性指標（非只「公平」）
☐ 誰負責偏差測試？

可解釋性
☐ 使用者有權知道 AI 決定理由
☐ 解釋格式是什麼？（技術或平文）
☐ 定義審計線索需求

隱私
☐ 資料最小化：AI 只用必要資料
☐ PII/PHI 處理（匿名化、假名化）
☐ AI 訓練使用同意流程
☐ 指定資料保留期間

人類覆蓋
☐ 需要人類批准的決定清單
☐ 覆蓋機制已設計
☐ 覆蓋日誌需求
☐ 升級路徑已定義

透明度
☐ 使用者知道他們在與 AI 談話（非假裝人）
☐ AI 的限制明確傳達
```

---

## 4. SRS 內的 Responsible AI 範本

```markdown
## 5. 非功能需求：Responsible AI

### 5.1 公平性需求
**NFR-FAIR-01：** [功能] 必須進行偏差測試...
**測試標準：** 在測試集上 disparate impact ratio ≥ [閾值]...
**所有者：** Data Science 團隊
**時間：** go-live 前及季度後測試

### 5.2 可解釋性需求
**REQ-EXPL-01：** 當 AI 做 [決定類型] 時，UI 顯示...
**格式：** [平文 / 結構清單 / 分數拆解]
**審計：** 日誌保留 [N] 天

### 5.3 隱私需求
**REQ-PRIV-01：** 會話/互動資料保留 [N] 天以內...
**REQ-PRIV-02：** PII [遮罩/匿名化] 於...

### 5.4 人類覆蓋需求
**REQ-HUMAN-01：** AI **無法**自動執行的決定：
  - [決定 1]
  - [決定 2]
**覆蓋機制：** [UI/工作流描述]
```

---

## 5. 在利益關係人會話中的 Responsible AI

BA 啟動 AI 功能時應問的問題：

- 「如果 AI 出錯且使用者受傷，業務如何承擔責任？」
- 「我們的使用者知道他們在與 AI 交談嗎？他們想知道嗎？」
- 「有特別容易被 AI 失敗傷害的使用者群體嗎？」
- 「Legal/Compliance 審查過此用例嗎？」
- 「當升級到新模型時，誰重新驗證公平性/安全性？」

---

## 總結

Responsible AI 不是 AI 團隊的工作。它是**BA 像任何其他功能需求一樣擷取的一套需求**。BA 若跳過此步驟，允許產品累積倫理與法律技術債。

開始於：風險評估 → 識別必要的保護措施 → 寫具體 NFR 配所有者與測試標準。不寫「系統必須公平」——寫「disparate impact ratio ≥ 0.8，go-live 前由 Data Science 團隊測試」。

這是負責任 BA 與不負責任 BA 的區別。
