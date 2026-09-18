---
id: 02770003-omop-cdm5-b001-000000000002
title: "OMOP、FHIR、i2b2、PCORnet、Sentinel 比較:該選哪一種 CDM"
slug: omop-vs-fhir-vs-i2b2-pcornet
excerpt: >-
  哪一套 Common Data Model 適合你的組織?本文針對 OMOP、FHIR、i2b2、PCORnet、Sentinel
  的 schema、詞彙、治理、工具、使用情境進行詳細比較,並提供選型決策樹。
featured_image: /images/blog/omop-vs-other-cdm-featured.webp
type: blog
reading_time: 13
view_count: 0
meta: null
published_at: '2026-05-07T15:30:00.000000Z'
created_at: '2026-05-07T15:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat7-7007-a007-000000000007, name: Kiến trúc hệ thống, slug: architecture}
tags: [{name: OMOP, slug: omop}, {name: HL7 FHIR, slug: hl7-fhir}, {name: Healthcare, slug: healthcare}, {name: CDM, slug: cdm}]
comments: []
---

「我們應該用 OMOP、FHIR 還是 i2b2?」 — 這是每個展開醫療資料旅程的組織都會遇到的問題。沒有「一招通用」的答案。本文協助你依使用情境做出正確選擇。

## 1. 醫療 CDM 全景圖

![1. 醫療 CDM 全景圖](/images/blog/diagrams/omop-vs-fhir-vs-i2b2-pcornet-d01.webp)

## 2. 比較表

| 項目 | OMOP | FHIR | i2b2 | PCORnet | Sentinel |
|---|---|---|---|---|---|
| 擁有者 | OHDSI(開放) | HL7(開放) | Harvard(開放) | PCORI(美) | FDA(美) |
| 起始年份 | 2008 | 2014 | 2007 | 2014 | 2008 |
| 主要目標 | 多來源 RWE | 營運交換 | 自助查詢 | 實用型試驗 | 藥物安全 |
| Schema | 37 張關聯式資料表 | Resource(REST) | 星形(fact + dim) | 表格扁平 | 表格扁平 |
| 詞彙 | Standard Concept(標準化) | CodeableConcept(彈性) | 院內 | 院內 + 標準 | 院內 |
| 開源工具 | ATLAS、HADES、DQD、ACHILLES | HAPI、Cerner SMART | i2b2 web client | 自行建置 | 封閉 |
| 即時 | ❌ | ✅ | ❌ | ❌ | ❌ |
| 聯邦網絡 | ✅ EHDEN、DARWIN、OHDSI | ⚠ 透過 Bulk Export | ✅ SHRINE | ✅ DRN | ✅ |
| 最適合 | 觀察性分析 | EHR/行動/雲端 | 醫院端查詢 | 實用型 RCT | 藥物監視 |
| 2026 採用 | 8 億病人 | 全產業 | ~200 站點 | ~70 站點 | FDA 內部 |
| 越南社群 | 起步中 | 快速發展 | 有限 | 無 | 無 |

## 3. 核心差異

### 3.1 Schema 哲學

![3.1 Schema 哲學](/images/blog/diagrams/omop-vs-fhir-vs-i2b2-pcornet-d02.webp)

OMOP = 標準化關聯式資料庫 → 為 SQL 分析最佳化。
FHIR = 文件導向 Resource → 為 API 交換最佳化。

### 3.2 詞彙

OMOP **強制**將每個代碼對應到 Standard Concept(例如 ICD-10 → SNOMED)。FHIR **不強制** — 只要內部一致,可以使用院內 code system。

→ OMOP 的 ETL 成本較高,但分析能力強上許多。

### 3.3 聯邦式 vs 集中式

OMOP 允許在不移動資料的情況下執行研究(R 研究包在每個夥伴本地執行,僅彙總結果)。對越南而言極為合適 — **越南個人資料保護法 2025**(2026 年 1 月 1 日生效,取代第 13/2023 號政令)要求敏感資料在境內儲存,並針對特定處理目的取得同意。

![3.3 聯邦式 vs 集中式](/images/blog/diagrams/omop-vs-fhir-vs-i2b2-pcornet-d03.webp)

## 4. 決策樹

![4. 決策樹](/images/blog/diagrams/omop-vs-fhir-vs-i2b2-pcornet-d04.webp)

## 5. 混合模式:FHIR + OMOP

這是 2026 年最普遍的模式:

![5. 混合模式:FHIR + OMOP](/images/blog/diagrams/omop-vs-fhir-vs-i2b2-pcornet-d05.webp)

→ 營運型 EHR 採用 FHIR(即時、適合 web/行動),研究型資料湖採用 OMOP(聯邦式分析)。請閱讀 [FHIR ↔ OMOP bridge](/blog/omop-fhir-mapping-bridge)。

## 6. 為何 OMOP 在 RWE 上勝出

![6. 為何 OMOP 在 RWE 上勝出](/images/blog/diagrams/omop-vs-fhir-vs-i2b2-pcornet-d06.webp)

對比:i2b2 社群較小、更新較少;PCORnet 較封閉於美國;Sentinel 僅 FDA 使用;CDISC 僅供試驗送審。

## 7. 何時**不要**選 OMOP?

- 需求**僅是即時 EHR 交換** → FHIR 即可
- **資料集很小**(數百名病人) → 直接 SQL 查詢更簡單
- **向 FDA 提交新藥** → 必須使用 SDTM
- **美國藥物監視** → Sentinel
- **沒有 data engineer 的組織** → OMOP ETL 需投入資源

## 8. 對越南的建議

| 組織類型 | 建議 |
|---|---|
| 大型公立醫院 | FHIR(營運) + OMOP(研究資料倉儲) |
| 私立醫院 | 起步用 FHIR 即可,有 RWE 研究時導入 OMOP |
| 研究機構 | 以 OMOP 為核心,從多家合作醫院 ETL |
| 全民健保/政府主管機關 | OMOP 作為國家資料湖,FHIR 作為與醫院的交換介面 |
| 醫療 AI 新創 | FHIR + OMOP — FHIR 作整合,OMOP 作訓練資料 |

## 9. CDM 之間的遷移

可從以下途徑遷移:
- **i2b2 → OMOP**:Georgia Tech 的 i2b2-to-OMOP 工具
- **PCORnet → OMOP**:Duke 提供現成 ETL
- **FHIR → OMOP**:FHIR-OMOP-on-FHIR(HL7 + OHDSI)
- **Sentinel → OMOP**:因需更深入的分析而轉換

OMOP 通常是最終目的地,因為其工具鏈最為豐富。

## 10. 社群資源

- **OHDSI Forum** — 24 小時內回覆
- **Book of OHDSI** — 免費教科書
- **EHDEN Academy** — 免費課程
- **OHDSI Symposium** — 年度研討會,提供虛擬參與
- **工作小組** — Vocabulary、Themis(ETL convention)、AI/ML、Vietnam(尚未成立,等待發起人!)

## 結論

CDM 並非 zero-sum。2026 年大多數組織同時使用 FHIR + OMOP:FHIR 作營運,OMOP 作分析。若你身在越南,想做 RWE、臨床 AI 訓練或公共衛生研究 — OMOP 是值得的投資。

下一篇:[Standardized Vocabularies 與 Athena — OMOP CDM 的心臟](/blog/omop-standardized-vocabularies-athena)。
