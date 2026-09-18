---
id: 02770003-omop-cdm5-b001-000000000009
title: "FHIR ↔ OMOP：オペレーション層と分析層を橋渡しする"
slug: omop-fhir-mapping-bridge
excerpt: >-
  2026 年の組織は FHIR（オペレーション）と OMOP（分析）の両方を持つことが一般的です。本記事では
  Resource ↔ Table のマッピング、FHIR-OMOP-on-FHIR ワーキンググループ、Pathling、Bulk Data Export パイプライン、
  そしてベトナム向け実装パターンを解説します。
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

FHIR はオペレーション（業務）の標準。OMOP は分析の標準。2026 年の成熟した組織では、この 2 つは共存します。本記事では 2 つの世界を橋渡しする方法（マッピング、ツール、パイプライン）を解説します。

## 1. なぜ両方が必要か

![1. なぜ両方が必要か](/images/blog/diagrams/omop-fhir-mapping-bridge-d01.webp)

FHIR はリアルタイム、JSON、REST に強い。OMOP はバッチ SQL、標準 vocabulary、ネットワーク研究に強い。それぞれが異なる戦線を担当する → 置き換えではなく橋渡しが必要です。

## 2. Resource ↔ Table マッピング

FHIR-OMOP-on-FHIR コミュニティ（HL7 + OHDSI 共同ワーキンググループ）が公式マッピングを維持しています。

### 2.1 基本マッピング表

| FHIR Resource | OMOP テーブル | 注記 |
|---|---|---|
| Patient | PERSON | identifier → person_source_value、gender → gender_concept_id |
| Encounter | VISIT_OCCURRENCE | class → visit_concept_id |
| Encounter（subVisit） | VISIT_DETAIL（CDM 5.4+） | 病棟、診療科 |
| Condition | CONDITION_OCCURRENCE | code（SNOMED）→ condition_concept_id |
| MedicationRequest / MedicationStatement / MedicationDispense | DRUG_EXPOSURE | code（RxNorm）→ drug_concept_id |
| MedicationAdministration | DRUG_EXPOSURE | drug_type_concept_id = 入院投与 |
| Procedure | PROCEDURE_OCCURRENCE | code → procedure_concept_id |
| Observation（lab） | MEASUREMENT | code（LOINC）+ valueQuantity |
| Observation（vital） | MEASUREMENT | code + valueQuantity |
| Observation（社会歴、家族歴） | OBSERVATION | code → observation_concept_id |
| AllergyIntolerance | OBSERVATION | concept = "Allergy to" |
| Immunization | DRUG_EXPOSURE / PROCEDURE_OCCURRENCE | ケースによる |
| Specimen | SPECIMEN | CDM 5.4 |
| DocumentReference / Composition | NOTE | text → note + NOTE_NLP |
| Coverage | PAYER_PLAN_PERIOD | BHYT、補助 BHYT |
| Practitioner | PROVIDER | |
| Organization（プロバイダー） | CARE_SITE | |
| Location | LOCATION | |

### 2.2 Encounter → Visit_Occurrence マッピング詳細

![2.2 Encounter → Visit_Occurrence マッピング詳細](/images/blog/diagrams/omop-fhir-mapping-bridge-d02.webp)

コード：
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

## 3. コーディングシステム FHIR ↔ OMOP マップ

FHIR コードシステム URL → OMOP vocabulary_id：

| FHIR System URL | OMOP vocabulary_id |
|---|---|
| http://snomed.info/sct | SNOMED |
| http://hl7.org/fhir/sid/icd-10-cm | ICD10CM |
| http://hl7.org/fhir/sid/icd-10 | ICD10 |
| http://www.nlm.nih.gov/research/umls/rxnorm | RxNorm |
| http://loinc.org | LOINC |
| http://www.ama-assn.org/go/cpt | CPT4 |
| urn:oid:2.16.840.1.113883.6.96 | SNOMED (OID) |

ベトナム：
| ベトナム FHIR System URL | OMOP vocabulary |
|---|---|
| https://terminology.kcb.vn/CodeSystem/icd10vn | ICD10VN custom |
| https://terminology.kcb.vn/CodeSystem/danhmucthuoc | VN_DRUG (custom) |

## 4. パイプラインパターン

### 4.1 Bulk Export → ETL → CDM

![4.1 Bulk Export → ETL → CDM](/images/blog/diagrams/omop-fhir-mapping-bridge-d03.webp)

メリット：標準 FHIR で済み、FHIR バックエンドが custom export をサポートする必要がない。[FHIR Bulk Data Export と CDS Hooks](/blog/fhir-bulk-data-export-cds-hooks) も参照。

### 4.2 リアルタイム CDC パターン

![4.2 リアルタイム CDC パターン](/images/blog/diagrams/omop-fhir-mapping-bridge-d04.webp)

メリット：FHIR は常に最新、OMOP は夜間に集約。

## 5. Pathling — FHIR を OMOP のようにクエリ

[Pathling](https://pathling.csiro.au/)（オーストラリア CSIRO）は FHIR データを analytics スタイルでクエリできます：

```sql
-- Bulk Pathling クエリ
SELECT 
  patient.id, 
  patient.gender,
  count(condition) AS n_conditions
FROM patient
LEFT JOIN condition ON condition.subject = patient
WHERE condition.code.subsumes('SNOMED|73211009')  -- Diabetes
GROUP BY patient.id, patient.gender;
```

Pathling は FHIR を Parquet で保管し、SparkSQL でクエリ → 解析速度は OMOP に近い。完全な OMOP CDM 構築前の暫定ブリッジとして使えます。

## 6. FHIR-OMOP-on-FHIR

2020 年からの HL7 + OHDSI 合同ワーキンググループ。2026 年時点での成果物：
- 公式 Implementation Guide（ig.fhir.org/...）
- メンテナンスされたマッピングテーブル
- HAPI FHIR プラグイン → OMOP CDM を FHIR としてクエリ
- OMOP-on-FHIR サーバーリファレンス（Georgia Tech）

→ 1 つのサーバーが OMOP データを FHIR インターフェースで提供したり、FHIR → OMOP 自動変換したりできます。

## 7. OHDSI Sql On FHIR (SOF)

Sql On FHIR (SOF) は新しいプロジェクト（2024-2026）で、FHIR Resource を SQL ビューとして公開できます。Pathling に似ていますが仕様がオープンです：
- ViewDefinition Resource（R4 / R5）
- リファレンス実装：HAPI、Aidbox
- 出力：フラットな表形式ビュー → OMOP へのロードが容易

## 8. ベトナム向けの実装

### 8.1 推奨パターン

![8.1 推奨パターン](/images/blog/diagrams/omop-fhir-mapping-bridge-d05.webp)

### 8.2 構築すべきアダプタ

- ICD-10 VN → SNOMED（USAGI 手動レビュー）
- 保健省医薬品リスト → RxNorm
- DVKT リスト → SNOMED procedure
- 54 民族 → Custom Vocabulary
- BHYT 種別 → Payer concept（Custom）

[OMOP for VN — BHYT、HSDT、ICD-10 VN、54 民族](/blog/omop-viet-nam-bhyt-hsdt) も参照してください。

## 9. マッピングの落とし穴

- ❌ MedicationRequest が **未調剤** → DRUG_EXPOSURE に入れない（MedicationStatement = 患者が実際に服用、と混同しない）
- ❌ Encounter status が `cancelled` → VISIT から除外
- ❌ Observation `not-done` → MEASUREMENT に入れない
- ❌ FHIR Subscription 通知 → OMOP に入れない（オペレーション専用）
- ❌ Provenance / AuditEvent → OMOP にマップしない
- ❌ Patient.identifier が複数 → 1 つを `person_source_value` に選ぶ（pseudonymized CCCD）
- ❌ N対1マッピング（例：1 日に 3 回の MedicationAdministration）→ 臨床ロジックでグルーピングが必要

## 10. ブリッジの検証

チェック項目：
- FHIR の Patient 数 == PERSON 数
- Encounter 合計 == VISIT_OCCURRENCE 合計
- Condition 合計 == CONDITION_OCCURRENCE 合計
- 新 CDM で DQD パス
- 100 患者をサンプル：順方向（FHIR → OMOP）と逆方向の両方をトレース

## 11. ハイブリッドパターン

![11. ハイブリッドパターン](/images/blog/diagrams/omop-fhir-mapping-bridge-d06.webp)

組織は小さく始めて段階的に拡大できます。最初から OMOP を構築する必要はなく、フェーズ 1 では Pathling を使うこともできます。

## 12. さらに学ぶための資料

- HL7 FHIR-to-OMOP Implementation Guide
- Pathling docs：pathling.csiro.au
- OMOP-on-FHIR Georgia Tech：github.com/Georgia-Tech-CSE
- OHDSI Working Group「FHIR and OMOP」
- SOF（SQL on FHIR）spec
- ベトナム：FHIR プロファイルとコミュニティマッピング（開発中）

## まとめ

FHIR + OMOP は選択肢ではなく、2026 年の標準パターンです。良いブリッジがあれば、リアルタイム業務とマルチソース RWE 解析を同じ組織で実現できます。ベトナムにはレガシーマイグレーション不要で最初から統合スタックを構築できる絶好の機会があります。

次の記事：[OMOP for VN — BHYT、HSDT、ICD-10 VN、54 民族](/blog/omop-viet-nam-bhyt-hsdt)。
