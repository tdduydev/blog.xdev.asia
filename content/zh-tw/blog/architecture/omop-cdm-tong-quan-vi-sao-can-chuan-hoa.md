---
id: 02770003-omop-cdm5-b001-000000000001
title: "OMOP CDM 總覽:為何醫療資料需要為 RWE 進行標準化"
slug: omop-cdm-tong-quan-vi-sao-can-chuan-hoa
excerpt: >-
  真實世界證據(RWE)正在改變 FDA、EMA 與各監管機構制定決策的方式。OMOP CDM 是一套資料標準,
  可讓單一研究同時在數百個機構上執行。本文介紹 OHDSI、CDM 5.4 以及越南脈絡。
featured_image: /images/blog/omop-overview-featured.webp
type: blog
reading_time: 14
view_count: 0
meta: null
published_at: '2026-05-07T15:00:00.000000Z'
created_at: '2026-05-07T15:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat7-7007-a007-000000000007, name: Kiến trúc hệ thống, slug: architecture}
tags: [{name: OMOP, slug: omop}, {name: OHDSI, slug: ohdsi}, {name: CDM, slug: cdm}, {name: Healthcare, slug: healthcare}]
comments: []
---

至 2026 年,全世界已有超過 **8 億名病人** 依 OMOP Common Data Model 完成標準化。FDA Sentinel、EMA DARWIN EU、EHDEN(歐洲 200+ 資料夥伴)、N3C(美國 COVID-19 計畫)都採用 OMOP。本文說明為何 OMOP 重要,以及在越南依《3516/QĐ-BYT 號決定》推動電子病歷(HSDT)時為何適用。

## 1. RWD 與 RWE — 核心差異

- **RWD(Real-World Data,真實世界資料)**:來自 EHR、越南全民健保(BHYT)申報、登錄資料庫、穿戴裝置、健康 App 的原始醫療資料
- **RWE(Real-World Evidence,真實世界證據)**:具備脈絡、科學嚴謹度,可用於臨床/監管決策的洞察

範例:
- 隨機對照試驗(RCT)回答「藥物 A 在 1000 名經篩選病人身上是否有效?」
- RWE 回答「藥物 A 在實務中對 100 萬名越南病人與 RCT 有何差異?與年齡、性別、共病的關係如何?」

RWE 之所以重要,是因為 RCT 只能涵蓋不到 5% 的重要臨床問題。

## 2. 為何需要 Common Data Model

![2. 為何需要 Common Data Model](/images/blog/diagrams/omop-cdm-tong-quan-vi-sao-can-chuan-hoa-d01.webp)

5 大效益:
1. **多來源分析**:單一研究可同時在 200 個機構上執行(federated)
2. **可重現性(Reproducibility)**:同一份 R/SQL 程式可在任何 CDM 上執行得到一致結果
3. **統一詞彙**:ICD/SNOMED/RxNorm/LOINC 已預先對應
4. **開源工具鏈**:ATLAS、HADES、DQD、Achilles 全部免費
5. **網絡(Network)**:加入 EHDEN、OHDSI 工作小組,有同儕支援

## 3. OMOP 與 OHDSI 歷史

![3. OMOP 與 OHDSI 歷史](/images/blog/diagrams/omop-cdm-tong-quan-vi-sao-can-chuan-hoa-d02.webp)

OHDSI = Observational Health Data Sciences and Informatics。它不是公司,而是開放社群(Apache 2.0),設有工作小組、網絡研究、年度研討會。

## 4. 2026 年 OHDSI 技術堆疊

![4. 2026 年 OHDSI 技術堆疊](/images/blog/diagrams/omop-cdm-tong-quan-vi-sao-can-chuan-hoa-d03.webp)

## 5. CDM 5.4 — 依分組的 37 張資料表

| 分組 | 代表性資料表 |
|---|---|
| **Clinical Data** | PERSON, VISIT_OCCURRENCE, CONDITION_OCCURRENCE, DRUG_EXPOSURE, PROCEDURE_OCCURRENCE, MEASUREMENT, OBSERVATION, DEVICE_EXPOSURE, NOTE, NOTE_NLP, SPECIMEN, DEATH, EPISODE |
| **Health System** | LOCATION, CARE_SITE, PROVIDER |
| **Health Economics** | PAYER_PLAN_PERIOD, COST |
| **Standardized Vocabularies** | CONCEPT, VOCABULARY, DOMAIN, CONCEPT_RELATIONSHIP, CONCEPT_ANCESTOR, CONCEPT_SYNONYM, CONCEPT_CLASS, RELATIONSHIP, DRUG_STRENGTH |
| **Derived Elements** | DRUG_ERA, DOSE_ERA, CONDITION_ERA, COHORT, COHORT_DEFINITION |
| **Metadata** | CDM_SOURCE, METADATA |

PERSON 為核心 — 所有臨床事件都以 `person_id` 作為外鍵關聯。

## 6. 詞彙(Vocabulary)— CDM 的心臟

OMOP 並不自創詞彙。它採用各國際標準,並為每個概念**選定唯一的 Standard Concept**:

| Domain | Standard Vocabulary | 常見來源 |
|---|---|---|
| Condition | SNOMED CT | ICD-10、ICD-9 |
| Drug | RxNorm(美國)/ RxNorm Extension | NDC、ATC、越南藥品目錄 |
| Procedure | SNOMED CT、CPT4、ICD-10-PCS | 越南 DVKT |
| Measurement | LOINC、SNOMED CT | 各院 lab code |
| Observation | SNOMED CT、LOINC | 院內 |
| Unit | UCUM | 院內 |
| Visit | SNOMED CT(visit subset) | 院內 |

ETL 必須將來源代碼對應到 standard concept_id。原始來源代碼仍會保留在 `*_source_value` 欄位以便追溯。

## 7. OMOP 使用情境

| 使用情境 | 實際範例 |
|---|---|
| **藥物安全(Drug safety)** | Sentinel 監控所有藥品上市後的副作用 |
| **比較性療效(Comparative effectiveness)** | Metformin + SGLT2 vs Metformin + DPP4 治療糖尿病 |
| **病人層級預測(Patient-Level Prediction)** | 預測 30 天內再住院機率 |
| **疾病特徵描述(Disease characterization)** | 描述罕見病的流行病學 |
| **健康經濟學(Health economics)** | 分析全民健保人口的就醫成本 |
| **AI/ML 訓練** | 標準化的世代資料作為臨床 LLM 的訓練資料集 |

## 8. 與其他 CDM 比較

| CDM | 社群 | 強項 | 較 OMOP 弱之處 |
|---|---|---|---|
| **OMOP** | OHDSI,開放 | Vocabulary、federated、工具鏈 | — |
| **i2b2** | Harvard/社群 | 內建 UI | 詞彙標準化較弱 |
| **PCORnet** | 美國 PCORI | 簡潔、適合 claim 資料 | 深入分析能力較弱 |
| **Sentinel** | 美國 FDA | 藥物安全與藥物監視 | 封閉,僅 FDA 使用 |
| **CDISC** | 試驗資料 | 臨床試驗送審 | 不適用 RWE |

OMOP 最為全面,且 FDA、EMA 均採用 — 這就是值得投入的理由。

## 9. 越南脈絡

3516/QĐ-BYT 號決定(2025/11)— 醫療數位轉型 2025-2030:
- 國家醫療資料系統
- VNeID 上的 HSDT(2026/1 已逾 3,400 萬筆紀錄)
- BHYT 電子化全面覆蓋
- 鼓勵以實證為基礎的研究

OMOP 非常適合作為國家研究資料湖:
- 可同時標準化多種來源(公立醫院、私立醫院、BHYT、登錄資料庫)
- 支援 federated 分析 — 敏感資料無需移動
- 開源 — 不被供應商綁定
- OHDSI 社群隨時提供支援

部分研究團隊(胡志明國家大學、河內醫科大學附設醫院、公共衛生研究院)已開始試行。先行者面對巨大的機會。

## 10. OMOP 會取代 FHIR 嗎?

不會 — 兩者互補。請參考 [HL7 FHIR Practitioner Roadmap](/roadmap/hl7-fhir):

| 標準 | FHIR | OMOP |
|---|---|---|
| 目標 | 營運交換 | 分析/RWE |
| Schema | 獨立 Resource(50+ 種) | 37 張關聯式正規化資料表 |
| 詞彙 | CodeableConcept,彈性 | Standard Concept 強制使用 |
| 傳輸 | REST API | DB 上的 SQL/檔案匯出 |
| 即時 | 有(Subscription、CDS Hooks) | 無(批次 ETL) |
| 使用情境 | EHR、行動、遠距醫療 | 網絡研究、ML、BI |

同一機構應同時採用兩者 — FHIR 作為營運層,OMOP 作為分析層。Bridge 詳見 [FHIR ↔ OMOP](/blog/omop-fhir-mapping-bridge)。

## 11. 從哪裡開始?

1. 閱讀 Book of OHDSI(免費、開源)
2. 安裝 Eunomia(R 套件中的 CDM 範例)練習 SQL
3. 在 Athena(athena.ohdsi.org)查詢 concept
4. 使用 Broadsea(Docker compose 包含 ATLAS + WebAPI + Postgres)
5. 加入 OHDSI 論壇

## 結論

OMOP CDM 是下一世代醫療研究的資料標準。OHDSI 社群開放、工具免費,而越南有絕佳機會打造國家研究資料湖。現在投入學習 OMOP,是恰逢其時的投資。

下一篇:[OMOP、FHIR、i2b2、PCORnet、Sentinel 比較 — 該選哪一種 CDM](/blog/omop-vs-fhir-vs-i2b2-pcornet) · 或閱讀 [OMOP CDM Practitioner Roadmap](/roadmap/omop-cdm)。
