---
id: 02770003-omop-cdm5-b001-000000000010
title: "OMOP 越南篇:BHYT、HSDT、越南 ICD-10、54 民族、3516/QĐ-BYT 號決定、越南個人資料保護法 2025"
slug: omop-viet-nam-bhyt-hsdt
excerpt: >-
  OMOP CDM 為何適合越南?本文分析政策脈絡(3516/QĐ-BYT 號決定、越南個人資料保護法 2025、
  第 15/2023 號醫療法、VNeID 上的 HSDT)、衛生部目錄對應、custom vocabulary,
  以及國家研究資料湖的路線圖。
featured_image: /images/blog/omop-vietnam-featured.webp
type: blog
reading_time: 15
view_count: 0
meta: null
published_at: '2026-05-07T19:30:00.000000Z'
created_at: '2026-05-07T19:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat7-7007-a007-000000000007, name: Kiến trúc hệ thống, slug: architecture}
tags: [{name: OMOP, slug: omop}, {name: Vietnam Health, slug: vietnam-health}, {name: Healthcare, slug: healthcare}, {name: RWE, slug: rwe}]
comments: []
---

2026 年越南有 3 個因素匯聚,為 OMOP 帶來巨大機會:政策(3516/QĐ-BYT 號決定)、資料規模(VNeID 上的 HSDT 逾 3,400 萬筆,BHYT 全面覆蓋)以及開放的 OHDSI 社群。本文分析從政策到程式如何在越南落實 OMOP。

## 1. 2026 年政策脈絡

![1. 2026 年政策脈絡](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d01.webp)

### 1.1 3516/QĐ-BYT 號決定(2025/11)

2030 年目標:
- 100% 公立醫療機構導入 HIS、EMR
- 統一的國家醫療資料系統
- 鼓勵醫療領域 AI、big data
- 串接衛生部 - 社會保險 - VNeID 資料
- 鼓勵以 RWD 進行實證研究

OMOP 是達成 RWD/RWE 目標的**自然選擇**。

### 1.2 越南個人資料保護法 2025(2026 年 1 月 1 日生效)

> **2026 年更新**:越南個人資料保護法(國會第 9 屆會議於 2025 年 6 月 26 日通過)自 2026 年 1 月 1 日起 **取代並升級第 13/2023 號政令**,加重行政罰則(最高至年營收 5%)、強制資料保護影響評估(DPIA),並更嚴格規範跨境資料傳輸。

醫療資料(屬敏感個人資料 — *sensitive personal data*)處理要求:
- 對每個目的取得明確、分離的同意(研究同意)
- 強制靜態與傳輸中加密
- 所有存取均需稽核紀錄,至少保存 5 年
- 境內儲存;傳輸至境外須取得同意並通報資料保護機關
- 大規模處理機構必須設置 DPO
- 啟動新目的前必須執行 DPIA
- 提供資料刪除/修改機制

OMOP `person_source_value` 中假名化身分證字號 / BHYT 號為強制要求。

### 1.3 第 15/2023/QH15 號醫療法(2024 年 1 月 1 日生效)

- 強制醫療機構依時程導入電子病歷(EMR)
- 個人健康資料屬於病人權利 → 共享給研究須取得同意
- 在依正確流程假名化的前提下,允許將醫療資料用於科學研究
- 與越南個人資料保護法相結合 → 為建置國家研究 OMOP CDM 提供充分的法律基礎。

## 2. 越南可用於 OMOP 的資料來源

![2. 越南可用於 OMOP 的資料來源](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d02.webp)

## 3. 越南詞彙對應

### 3.1 已具備標準的目錄

| 越南目錄 | 對應標準 | 來源 |
|---|---|---|
| 越南 ICD-10(衛生部) | ICD-10 → SNOMED via Maps to | 衛生部更新,源自 WHO |
| 學名藥名 | RxNorm Ingredient | ATC → RxNorm 對應 |
| 活性成分名 | RxNorm Ingredient | |
| 度量單位 | UCUM | 大多符合 |
| LOINC 檢驗 | LOINC | 部分醫院檢驗室已使用 |

### 3.2 須建立 custom vocabulary

| 越南目錄 | custom 原因 | 策略 |
|---|---|---|
| 54 民族 | 無對應 concept | 建立 `VN_DANTOC` vocabulary(54 個 concept) |
| 省/縣/鄉 | 無對應標準 | 三層 `VN_GEO` vocabulary |
| BHYT 類型 | 與美式 Payer 不符 | 建立 `VN_BHYT` vocabulary(強制 BHYT、家戶、學生等) |
| 醫院等級 | 無對應 concept | 自訂 care_site setting |
| 衛生部 2025 年版藥品目錄 | 須對應 → RxNorm | USAGI 對應 + 為傳統藥建立 custom |
| DVKT 目錄 | Custom procedure code | USAGI → SNOMED procedure |

### 3.3 建立 VN_DANTOC vocabulary

```sql
INSERT INTO vocabulary (vocabulary_id, vocabulary_name, vocabulary_reference, vocabulary_version, vocabulary_concept_id) VALUES
  ('VN_DANTOC', '越南民族目錄', 'TCVN 54', '1.0', 2000000001);

INSERT INTO concept VALUES
  (2000000001, 'Vietnamese ethnicities (vocabulary)', 'Metadata', 'VN_DANTOC', 'Vocabulary', 'C', 'OMOP generated', NULL, NULL, NULL, NULL),
  (2000001001, 'Kinh', 'Race', 'VN_DANTOC', 'Race', 'S', '01', NULL, NULL, NULL, NULL),
  (2000001002, 'Tày', 'Race', 'VN_DANTOC', 'Race', 'S', '02', NULL, NULL, NULL, NULL),
  (2000001003, 'Thái', 'Race', 'VN_DANTOC', 'Race', 'S', '03', NULL, NULL, NULL, NULL),
  -- ... 54 個民族
  (2000001054, '其他民族', 'Race', 'VN_DANTOC', 'Race', 'S', '99', NULL, NULL, NULL, NULL);
```

Concept_id 從 20 億起跳(OHDSI 為 custom 保留的範圍)。

### 3.4 傳統醫藥(YHCT)詞彙

越南有許多傳統醫藥(YHCT)沒有 RxNorm 對應。建立 `VN_YHCT` custom vocabulary:

```sql
INSERT INTO concept VALUES
  (2000020001, 'Cảm xuyên hương', 'Drug', 'VN_YHCT', 'Branded Drug', 'S', 'YHCT001', ...),
  (2000020002, 'Hoạt huyết Nhất Nhất', 'Drug', 'VN_YHCT', 'Branded Drug', 'S', 'YHCT002', ...);
```

需與衛生部傳統醫藥管理局合作以推動標準化。

## 4. 電子病歷(HSDT,VNeID)的 ETL 模式

VNeID 上的電子病歷(HSDT,Hồ sơ sức khoẻ điện tử)結構與 FHIR 相對接近:

![4. 電子病歷(HSDT,VNeID)的 ETL 模式](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d03.webp)

注意事項:
- HSDT 僅為摘要 — 並非完整 EMR
- → 由 HSDT 建出的 CDM 只有高層級的 visit/condition,缺乏 drug/measurement 細節
- 須由醫院 EMR 補足細節

## 5. 越南全民健保(BHYT)的 ETL 模式

![5. 越南全民健保(BHYT)的 ETL 模式](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d04.webp)

BHYT 資料的優勢:
- 涵蓋率大(~9,500 萬人)
- 編碼完整(依衛生部規範)
- 歷史悠久(>10 年)

限制:
- 沒有生命徵象、檢驗值
- 沒有症狀(只有診斷)
- 偏差:只能看到使用 BHYT 就醫的人

→ 需與 EMR 配對才能形成完整 RWE。

## 6. 越南 RWE 使用情境

| 問題 | 來源資料 | 方法 |
|---|---|---|
| 越南人最佳的高血壓治療策略 | EMR + BHYT | CohortMethod (PLE) |
| 預測糖尿病人口的中風風險 | EMR + lab | PatientLevelPrediction (PLP) |
| 描述各區域癌症的流行病學 | BHYT + Registry | Characterization |
| 監控 COVID 疫苗副作用 | HSDT + EMR | SCCS |
| 不適當抗生素處方比例 | EMR + 藥物指引 | 自訂分析 |
| 依共病分析就醫成本 | BHYT + Cost | Health economics |
| 加入 DARWIN EU 罕病研究 | OMOP CDM | Strategus + 分享彙總結果 |

## 7. 國家資料湖路線圖

![7. 國家資料湖路線圖](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d05.webp)

試行模式:
1. 選 5-10 家代表性醫院(地區、等級、專科)
2. 每家醫院建置 OMOP CDM(聯邦式)
3. 中央協調者執行網絡研究
4. 發表示範研究以證明價值
5. 逐步擴展

## 8. 治理模式

![8. 治理模式](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d06.webp)

越南需成立 **OHDSI Vietnam chapter** — 在 OHDSI 註冊為官方工作小組。

## 9. 假名化 person ID

```sql
-- 不存原始身分證字號
person_source_value = encode(
  hmac(
    cccd::bytea, 
    current_setting('app.cccd_secret')::bytea, 
    'sha256'
  ),
  'hex'
);

-- 金鑰存放於獨立 Vault
-- 反假名化(re-identification)需多方核准(DPO + IRB)
```

各醫院使用相同雜湊演算法 + secret → **可以連結紀錄**而不會洩漏身分證字號。

## 10. 越南資源

| 資源 | 備註 |
|---|---|
| 3516/QĐ-BYT 號決定 2025 | 醫療數位轉型 2025-2030 政策 |
| 越南個人資料保護法 2025 | 2026 年 1 月 1 日生效,取代第 13/2023 號政令 |
| 第 15/2023/QH15 號醫療法 | 2024 年 1 月 1 日生效,EMR 強制 |
| 第 13/2023 號政令 | 過渡基礎(自 2026 年起被新法取代) |
| 越南 SNOMED CT 入口 | 註冊 affiliate(免費) |
| 越南 ICD-10 目錄 | 衛生部發布 |
| 衛生部藥品目錄 | 每年更新 |
| DVKT 目錄 | 衛生部發布 |
| OHDSI forum | 加入越南討論串(剛起步) |
| Book of OHDSI | 免費教科書 |
| EHDEN Academy | 免費 OMOP 課程 |

## 11. 越南個人學習路線

1. 閱讀 Book of OHDSI(1 個月)
2. 安裝 Eunomia + 練 SQL(2 週)
3. 在本地安裝 Broadsea(1 週)
4. 用 1000 名 mock 越南病人資料試做 CDM(1 個月)
5. 用 USAGI 將越南 ICD-10 對應到 SNOMED(2 週)
6. 執行 ATLAS + DQD + ACHILLES(1 週)
7. 學習 HADES R:CohortMethod、PLP(2 個月)
8. 參加 OHDSI Symposium(年度,虛擬參與免費)
9. 在越南 CDM 上主導 1 個小型研究(3-6 個月)
10. 提議成立 OHDSI Vietnam chapter

## 12. 待建立的社群

![12. 待建立的社群](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d07.webp)

## 13. 越南特有陷阱

- ❌ 直接將越南 ICD-10 對應到 `condition_concept_id` 而不經 SNOMED → 分析無法做網絡比對
- ❌ 忘記假名化身分證字號 → 違反越南個人資料保護法 2025(罰則最高至年營收 5%)
- ❌ Custom concept ID 小於 20 億 → 與標準衝突
- ❌ 未備份詞彙版本 → 舊研究無法重現
- ❌ 將資料儲存於境外 → 違反跨境資料規定
- ❌ 忽略傳統藥(YHCT) → 偏差,藥物暴露被低估
- ❌ 忘記 BHYT 有多種類型 → 分析無法正確分層

## 結論

2026-2030 年越南有機會在 OMOP 上建置國家醫療研究資料湖 — 開源、聯邦式、適合網絡研究,並符合**越南個人資料保護法 2025(2026 年 1 月 1 日生效)**、**第 15/2023 號醫療法**及**3516/QĐ-BYT 號決定**。需要投入越南詞彙、治理與社群建設。OHDSI Vietnam chapter 將是越南與 EHDEN 及 DARWIN EU 平起平坐的動力。

→ 回到 [OMOP CDM Practitioner Roadmap](/roadmap/omop-cdm) 查看 5-9 個月的系統化學習計畫。
