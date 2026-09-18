---
id: 02770003-omop-cdm5-b001-000000000009
title: "FHIR ↔ OMOP:營運層與分析層之間的橋樑"
slug: omop-fhir-mapping-bridge
excerpt: >-
  2026 年的組織通常同時擁有 FHIR(營運)與 OMOP(分析)。本文介紹 resource ↔ table 對應、
  FHIR-OMOP-on-FHIR 工作小組、Pathling、Bulk Data Export pipeline,以及越南的部署模式。
featured_image: /images/blog/omop-fhir-bridge-featured.webp
type: blog
reading_time: 14
view_count: 0
meta: null
published_at: '2026-05-07T19:00:00.000000Z'
created_at: '2026-05-07T19:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat7-7007-a007-000000000007, name: Kiến trúc hệ thống, slug: architecture}
tags: [{name: OMOP, slug: omop}, {name: HL7 FHIR, slug: hl7-fhir}, {name: Healthcare, slug: healthcare}, {name: Interoperability, slug: interoperability}]
comments: []
---

FHIR 是營運標準,OMOP 是分析標準。在 2026 年成熟的組織裡兩者並存。本文介紹如何橋接這兩個世界:對應、工具、pipeline。

## 1. 為何兩者都需要

![1. 為何兩者都需要](/images/blog/diagrams/omop-fhir-mapping-bridge-d01.webp)

FHIR 強於即時、JSON、REST;OMOP 強於批次 SQL、標準詞彙、網絡研究。各擅一面 → 互補而非取代。

## 2. resource ↔ table 對應

FHIR-OMOP-on-FHIR 社群(HL7 + OHDSI 聯合工作小組)維護官方對應。

### 2.1 基本對應表

| FHIR Resource | OMOP Table | 備註 |
|---|---|---|
| Patient | PERSON | identifier → person_source_value、gender → gender_concept_id |
| Encounter | VISIT_OCCURRENCE | class → visit_concept_id |
| Encounter (subVisit) | VISIT_DETAIL (CDM 5.4+) | 病房、科別 |
| Condition | CONDITION_OCCURRENCE | code (SNOMED) → condition_concept_id |
| MedicationRequest / MedicationStatement / MedicationDispense | DRUG_EXPOSURE | code (RxNorm) → drug_concept_id |
| MedicationAdministration | DRUG_EXPOSURE | drug_type_concept_id = Inpatient admin |
| Procedure | PROCEDURE_OCCURRENCE | code → procedure_concept_id |
| Observation (lab) | MEASUREMENT | code (LOINC) + valueQuantity |
| Observation (vital) | MEASUREMENT | code + valueQuantity |
| Observation (social, family hx) | OBSERVATION | code → observation_concept_id |
| AllergyIntolerance | OBSERVATION | concept = "Allergy to" |
| Immunization | DRUG_EXPOSURE / PROCEDURE_OCCURRENCE | 視情況 |
| Specimen | SPECIMEN | CDM 5.4 |
| DocumentReference / Composition | NOTE | text → note + NOTE_NLP |
| Coverage | PAYER_PLAN_PERIOD | BHYT、補充 BHYT |
| Practitioner | PROVIDER | |
| Organization (provider) | CARE_SITE | |
| Location | LOCATION | |

### 2.2 詳細對應 Encounter → Visit_Occurrence

![2.2 詳細對應 Encounter → Visit_Occurrence](/images/blog/diagrams/omop-fhir-mapping-bridge-d02.webp)

程式:
```python
def encounter_to_visit(enc):
    return {
        'visit_occurrence_id': hash_to_bigint(enc['id']),
        'person_id': lookup_person(enc['subject']['reference']),
        'visit_concept_id': map_class(enc['class']['code']),
        'visit_start_date': enc['period']['start'][:10],
        'visit_start_datetime': enc['period']['start'],
        'visit_end_date': enc['period'].get('end', enc['period']['start'])[:10],
        'visit_type_concept_id': 32817,  # EHR encounter
        'care_site_id': lookup_care_site(enc.get('serviceProvider')),
        'visit_source_value': enc['id']
    }

def map_class(class_code):
    return {
        'IMP': 9201,  # Inpatient
        'AMB': 9202,  # Outpatient
        'EMER': 9203, # ER
        'HH': 581476, # Home health
        'VR': 5083    # Virtual / telehealth
    }.get(class_code, 0)
```

## 3. FHIR ↔ OMOP coding system 對應

FHIR code system URL → OMOP vocabulary_id:

| FHIR System URL | OMOP vocabulary_id |
|---|---|
| http://snomed.info/sct | SNOMED |
| http://hl7.org/fhir/sid/icd-10-cm | ICD10CM |
| http://hl7.org/fhir/sid/icd-10 | ICD10 |
| http://www.nlm.nih.gov/research/umls/rxnorm | RxNorm |
| http://loinc.org | LOINC |
| http://www.ama-assn.org/go/cpt | CPT4 |
| urn:oid:2.16.840.1.113883.6.96 | SNOMED (OID) |

越南:
| FHIR System URL VN | OMOP vocabulary |
|---|---|
| https://terminology.kcb.vn/CodeSystem/icd10vn | ICD10VN custom |
| https://terminology.kcb.vn/CodeSystem/danhmucthuoc | VN_DRUG (custom) |

## 4. Pipeline 模式

### 4.1 Bulk Export → ETL → CDM

![4.1 Bulk Export → ETL → CDM](/images/blog/diagrams/omop-fhir-mapping-bridge-d03.webp)

優點:標準 FHIR,不需 FHIR 後端支援自訂匯出。請參考 [FHIR Bulk Data Export 與 CDS Hooks](/blog/fhir-bulk-data-export-cds-hooks)。

### 4.2 即時 CDC 模式

![4.2 即時 CDC 模式](/images/blog/diagrams/omop-fhir-mapping-bridge-d04.webp)

優點:FHIR 永遠 fresh;OMOP 每晚彙總。

## 5. Pathling — 以 OMOP 風格查詢 FHIR

[Pathling](https://pathling.csiro.au/)(澳洲 CSIRO 出品)讓你以分析風格查詢 FHIR 資料:

```sql
-- Bulk Pathling query
SELECT 
  patient.id, 
  patient.gender,
  count(condition) AS n_conditions
FROM patient
LEFT JOIN condition ON condition.subject = patient
WHERE condition.code.subsumes('SNOMED|73211009')  -- Diabetes
GROUP BY patient.id, patient.gender;
```

Pathling 將 FHIR 存於 Parquet,以 SparkSQL 查詢 → 分析速度接近 OMOP。若還不想完整建置 OMOP CDM,可作為暫時的 bridge。

## 6. FHIR-OMOP-on-FHIR

自 2020 年起為 HL7 + OHDSI 聯合工作小組。2026 年產出:
- 官方 Implementation Guide(ig.fhir.org/...)
- 持續維護的對應表
- HAPI FHIR plugin → 將 OMOP CDM 以 FHIR 介面查詢
- Georgia Tech 發布的 OMOP-on-FHIR 參考伺服器

→ 一個伺服器可以以 FHIR 介面提供 OMOP 資料,或自動將 FHIR 轉為 OMOP。

## 7. OHDSI Sql On FHIR (SOF)

Sql On FHIR(SOF)是新興專案(2024-2026),允許將 FHIR resource 暴露為 SQL view。功能類似 Pathling,但規範開放:
- ViewDefinition resource(R4 / R5)
- 參考實作:HAPI、Aidbox
- 輸出:扁平表格化 view → 易於匯入 OMOP

## 8. 越南的部署

### 8.1 建議模式

![8.1 建議模式](/images/blog/diagrams/omop-fhir-mapping-bridge-d05.webp)

### 8.2 須建置的轉接層(adapter)

- ICD-10 越南版 → SNOMED(USAGI 人工審查)
- 衛生部藥品目錄 → RxNorm
- DVKT 目錄 → SNOMED procedure
- 54 民族 → Custom Vocabulary
- BHYT 類型 → Payer concept(Custom)

延伸閱讀 [OMOP 越南篇 — BHYT、HSDT、越南 ICD-10、54 民族](/blog/omop-viet-nam-bhyt-hsdt)。

## 9. 對應陷阱

- ❌ MedicationRequest **尚未填藥** → 不要寫入 DRUG_EXPOSURE(避免與 MedicationStatement = 病人實際服用 混淆)
- ❌ Encounter status `cancelled` → 從 VISIT 中略過
- ❌ Observation `not-done` → 不寫入 MEASUREMENT
- ❌ FHIR 有 Subscription 通知 → **不**寫入 OMOP(僅供營運)
- ❌ Provenance / AuditEvent → 不對應到 OMOP
- ❌ Patient.identifier 有多筆 → 選 1 作為 `person_source_value`(假名化身分證字號)
- ❌ 多對 1 對應(例如同日 3 筆 MedicationAdministration) → 須依臨床邏輯彙整

## 10. 驗證 bridge

檢查:
- FHIR patient 數 == PERSON 數
- 總 Encounter 數 == 總 VISIT_OCCURRENCE 數
- 總 Condition 數 == 總 CONDITION_OCCURRENCE 數
- 新 CDM 通過 DQD
- 抽樣 100 名病人:正向(FHIR → OMOP)與反向追蹤

## 11. 混合模式

![11. 混合模式](/images/blog/diagrams/omop-fhir-mapping-bridge-d06.webp)

組織可從小起步,逐步擴展。不一定要一次建好 OMOP — 第一階段可採用 Pathling。

## 12. 延伸文件

- HL7 FHIR-to-OMOP Implementation Guide
- Pathling 文件:pathling.csiro.au
- Georgia Tech 的 OMOP-on-FHIR:github.com/Georgia-Tech-CSE
- OHDSI 工作小組「FHIR and OMOP」
- SOF(SQL on FHIR)規範
- 越南:社群 FHIR profile 與對應(發展中)

## 結論

FHIR + OMOP 不是抉擇 — 而是 2026 年的標準模式。良好的 bridge 讓同一組織可同時做即時營運與多來源 RWE 分析。越南有機會從一開始就建置整合堆疊,無需面對遺留系統遷移。

下一篇:[OMOP 越南篇 — BHYT、HSDT、越南 ICD-10、54 民族](/blog/omop-viet-nam-bhyt-hsdt)。
