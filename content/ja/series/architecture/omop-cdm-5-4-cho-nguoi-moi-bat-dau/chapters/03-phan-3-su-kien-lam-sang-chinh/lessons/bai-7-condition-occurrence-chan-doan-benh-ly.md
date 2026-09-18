---
id: 019f1a00-a107-7b01-e001-omopcdm54007
title: 'レッスン 7: CONDITION_OCCURRENCE — 診断と病理学'
slug: bai-7-condition-occurrence-chan-doan-benh-ly
description: >-
  診断、症状、病理学的兆候、condition_concept_id と source_value、condition_status
  (入院中/一次/二次)、訪問およびプロバイダーへのリンクを記録し、OBSERVATION テーブルと区別します。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 7
section_title: 'パート 3: 主要な臨床事象'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初心者向け OMOP CDM 5.4 — A to Z を理解する
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop07" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop07)"/>
  <g>
    <circle cx="659" cy="87" r="22" fill="#818cf8" opacity="0.12"/>
    <circle cx="718" cy="106" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="777" cy="125" r="36" fill="#818cf8" opacity="0.06"/>
    <circle cx="895" cy="163" r="20" fill="#818cf8" opacity="0.1"/>
    <line x1="600" y1="157" x2="1100" y2="237" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 7</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">CONDITION_OCCURRENCE</tspan>
    <tspan x="60" dy="42">診断と病理学</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初心者向け OMOP CDM 5.4 — A to Z を理解する</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 3: 主要な臨床事象</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![ICD-10 → CONDITION_OCCURRENCE の SNOMED マッピング プロセス](/storage/uploads/2026/04/omop-cdm-bai7-condition-mapping.webp)

## はじめに

**CONDITION_OCCURRENCE** は、医師が患者に対して記録したすべての医学的診断、症状、兆候を記録します。多くの場合、これは OMOP CDM で最も分析されるテーブルです。医学研究は多くの場合、「誰が何を得るのか?」という質問から始まるからです。

---

## 1. テーブル構造

|コラム |タイプ |必須 |説明 |
|-----|----------|----------|----------|
| `condition_occurrence_id` |整数 | ✅PK |固有の ID |
| `person_id` |整数 | ✅FK |患者 |
| `condition_concept_id` |整数 | ✅ |標準コンセプト (SNOMED) |
| `condition_start_date` |日付 | ✅ |診断開始日 |
| `condition_start_datetime` |日時 | |日付と時刻 |
| `condition_end_date` |日付 | |診断終了日 |
| `condition_end_datetime` |日時 | |終了日時 |
| `condition_type_concept_id` |整数 | ✅ |データソース |
| `condition_status_concept_id` |整数 | |ステータス (プライマリー、入学中...) |
| `stop_reason` | VARCHAR(20) | |診断を中止する理由 |
| `provider_id` |整数 | FK |診断医 |
| `visit_occurrence_id` |整数 | FK |関連する訪問 |
| `visit_detail_id` |整数 | FK |受診詳細（何科） |
| `condition_source_value` | VARCHAR(50) | |元のコード (例: "E11") |
| `condition_source_concept_id` |整数 | |オリジナルコンセプト |
| `condition_status_source_value` | VARCHAR(50) | |元の状態 |

---

## 2. CONDITION_OCCURRENCE には何が格納されますか?

＃＃＃２．１．保存すべきです

|タイプ |例 |語彙 |
|----------|----------|---------------|
|病気の診断 | 2 型糖尿病、肺炎 | SNOMED CT |
|症状 |発熱、腹痛、咳 | SNOMED CT |
|臨床症状 |足のむくみ、黄疸 | SNOMED CT |
|鑑別診断 |肺結核の疑い | SNOMED CT |

＃＃＃２．２．保存しないでください (別のテーブルに保存します)

|タイプ |宛先テーブル |理由 |
|------|-----------|------|
| 「糖尿病の歴史」 |観察 |ドメイン = 観察 |
| 「アレルギーはありません」 |観察 |不在→観察 |
| 「BMI = 28」 |測定 |ドメイン = 測定 |
|薬の副作用 |状態 + 薬物暴露 | ADRの条件、薬物を引き起こす薬物 |

---

## 3.condition_status_concept_id — 診断ステータス

|コンセプトID |ステータス |意味 |
|----------|----------|----------|
| 32902 |一次診断 |一次診断 |
| 32908 |二次診断 |二次診断 |
| 32903 |診断を認める |入院時診断 |
| 32904 |放電診断 |退院時の診断 |
| 32906 |仮診断 |仮診断 |
| 32907 |確定診断 |確定診断 |

```sql
-- Ví dụ: BN nhập viện
-- Chẩn đoán nhập viện: Nghi lao phổi (provisional)
INSERT INTO condition_occurrence VALUES (
    70001, 100001, 255848,       -- SNOMED: Pneumonia
    '2024-06-10', NULL,
    '2024-06-20', NULL,
    32817,                        -- EHR
    32903,                        -- Admitting diagnosis
    NULL, 5001, 50001, NULL,
    'J18.9', 0,                   -- ICD-10: Pneumonia, unspecified
    'admitting'
);

-- Chẩn đoán xuất viện: Viêm phổi do phế cầu (confirmed)
INSERT INTO condition_occurrence VALUES (
    70002, 100001, 257315,       -- SNOMED: Pneumococcal pneumonia
    '2024-06-10', NULL,
    '2024-06-20', NULL,
    32817,                        -- EHR
    32904,                        -- Discharge diagnosis
    NULL, 5001, 50001, NULL,
    'J13', 0,                     -- ICD-10
    'discharge'
);
```

---

## 4. ベトナム ICD-10 データの ETL

＃＃＃４．１．マッピングプロセス

```
  HIS: ma_benh = 'E11.65'  (ICD-10-CM)
       ten_benh = 'ĐTĐ type 2 có biến chứng mạch máu ngoại vi'
       │
       │ Bước 1: Tìm source concept
       ↓
  SOURCE CONCEPT: concept_id = 45591837
       vocabulary_id = ICD10CM
       concept_code = 'E11.65'
       │
       │ Bước 2: Tìm Standard Concept (Maps to)
       ↓
  STANDARD CONCEPT: concept_id = 201826
       vocabulary_id = SNOMED
       concept_name = 'Type 2 diabetes mellitus'
       domain_id = 'Condition'
```

```sql
-- SQL ETL
SELECT
    ROW_NUMBER() OVER() AS condition_occurrence_id,
    pm.person_id,
    COALESCE(cr.concept_id_2, 0) AS condition_concept_id,
    cd.ngay_chandoan AS condition_start_date,
    NULL AS condition_end_date,
    32817 AS condition_type_concept_id,
    CASE cd.loai_chandoan
        WHEN 'CHINH' THEN 32902   -- Primary
        WHEN 'PHU'   THEN 32908   -- Secondary
        ELSE 0
    END AS condition_status_concept_id,
    cd.ma_icd10 AS condition_source_value,
    COALESCE(c_source.concept_id, 0) AS condition_source_concept_id
FROM chandoan_his cd
JOIN person_mapping pm ON cd.ma_bn = pm.source_id
LEFT JOIN concept c_source
    ON cd.ma_icd10 = c_source.concept_code
    AND c_source.vocabulary_id = 'ICD10CM'
LEFT JOIN concept_relationship cr
    ON c_source.concept_id = cr.concept_id_1
    AND cr.relationship_id = 'Maps to'
LEFT JOIN concept c_std
    ON cr.concept_id_2 = c_std.concept_id
    AND c_std.standard_concept = 'S';
```

＃＃＃４．２．ベトナム特有のデータ処理

|問題 |ソリューション |
|----------|----------|
| ICD-10-VN は ICD-10-CM とは異なります | SOURCE_TO_CONCEPT_MAP によるマッピング |
| BV 内部コード |うさぎマッピングツール |
|終了日がありません |条件終了日 = NULL (有効) |
| 1 ICD マップの多くの SNOMED |最適なコンセプトを選択 |

---

## 5. 状態と観察を区別する

|基準 |条件発生 |観察 |
|----------|----------|---------------|
| **内容** |現在の病気・治療中 |先史時代、ライフスタイル、記録 |
| **例** | 「2型糖尿病」 | 「糖尿病の家族歴」 |
| **ドメイン** |条件 |観察 |
| **標準語彙** | SNOMED CT | SNOMED CT |
| **いつ?** |活動性疾患 |レコード情報 |

> **ルール:** Athena 上の標準コンセプトの **domain_id** を常に確認してください。ドメイン = "Observation" の場合、ソースが ICD-10 であっても、OBSERVATION に保存されます。

---

## 6. 一般的な SQL 分析

```sql
-- Top 10 chẩn đoán phổ biến nhất
SELECT
    c.concept_name AS condition_name,
    COUNT(DISTINCT co.person_id) AS patient_count,
    COUNT(*) AS record_count
FROM condition_occurrence co
JOIN concept c ON co.condition_concept_id = c.concept_id
WHERE co.condition_concept_id != 0
GROUP BY c.concept_name
ORDER BY patient_count DESC
LIMIT 10;

-- Tỉ lệ mắc bệnh theo giới tính
SELECT
    g.concept_name AS gender,
    c.concept_name AS condition_name,
    COUNT(DISTINCT co.person_id) AS patients
FROM condition_occurrence co
JOIN person p ON co.person_id = p.person_id
JOIN concept g ON p.gender_concept_id = g.concept_id
JOIN concept c ON co.condition_concept_id = c.concept_id
WHERE co.condition_concept_id = 201826  -- Type 2 DM
GROUP BY g.concept_name, c.concept_name;

-- Comorbidity: BN tiểu đường có tăng huyết áp?
SELECT
    COUNT(DISTINCT co_dm.person_id) AS dm_patients,
    COUNT(DISTINCT co_ht.person_id) AS dm_with_hypertension,
    ROUND(
        COUNT(DISTINCT co_ht.person_id) * 100.0 /
        NULLIF(COUNT(DISTINCT co_dm.person_id), 0), 1
    ) AS comorbidity_pct
FROM condition_occurrence co_dm
LEFT JOIN condition_occurrence co_ht
    ON co_dm.person_id = co_ht.person_id
    AND co_ht.condition_concept_id IN (
        SELECT descendant_concept_id
        FROM concept_ancestor
        WHERE ancestor_concept_id = 320128  -- Essential hypertension
    )
WHERE co_dm.condition_concept_id IN (
    SELECT descendant_concept_id
    FROM concept_ancestor
    WHERE ancestor_concept_id = 201826  -- Type 2 DM
);
```

---

## 概要

1. **CONDITION_OCCURRENCE** = 診断、症状、病理の兆候
2. **condition_concept_id** は標準コンセプト (SNOMED CT) を使用します
3. **condition_status**: 一次、二次、入院中、退院
4. **3 つの列のツリー**:concept_id /source_value /source_concept_id
5. **区別** CONDITION (現在の病気) vs OBSERVATION (病歴、記録)
6. **ETL VN**: ICD-10-VN → ソースコンセプト → マップ先 → 標準 SNOMED

**次の記事:** DRUG_EXPOSURE — OMOP CDM が医薬品、処方箋、ワクチンを記録する方法。

---

## 参考文献

- [OMOP CDM 5.4 — CONDITION_OCCURRENCE](https://ohdsi.github.io/CommonDataModel/cdm54.html#CONDITION_OCCURRENCE)
- [Athena — Condition Domain](https://athena.ohdsi.org/)
