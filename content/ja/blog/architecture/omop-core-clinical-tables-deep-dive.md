---
id: 02770003-omop-cdm5-b001-000000000004
title: "OMOP コア臨床テーブル：Person、Visit、Condition、Drug、Measurement、Observation"
slug: omop-core-clinical-tables-deep-dive
excerpt: >-
  OMOP CDM 5.4 の最重要 7 テーブルを深掘り — スキーマ、FK、ETL 規約、混同しやすいポイント
  （Measurement vs Observation、Drug_Exposure vs Drug_Era）、そして RWE 解析でよく使う
  10 個の SQL パターンを紹介します。
featured_image: /images/blog/omop-core-tables-featured.webp
type: blog
reading_time: 18
view_count: 0
meta: null
published_at: '2026-05-07T16:30:00.000000Z'
created_at: '2026-05-07T16:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat7-7007-a007-000000000007, name: Kiến trúc hệ thống, slug: architecture}
tags: [{name: OMOP, slug: omop}, {name: CDM, slug: cdm}, {name: PostgreSQL, slug: postgresql}, {name: Healthcare, slug: healthcare}]
comments: []
---

OMOP CDM 5.4 には 37 テーブルありますが、RWE 解析の 90% は 7 つのコアテーブルしか触りません。本記事では各テーブルをスキーマ、ETL 規約（Themis）、実戦的な SQL パターンとともに掘り下げます。

## 1. Person 中心アーキテクチャ

![1. Person 中心アーキテクチャ](/images/blog/diagrams/omop-core-clinical-tables-deep-dive-d01.webp)

すべての臨床イベントは `person_id` を持ち、任意で `visit_occurrence_id` を持ちます。これが join のキーです。

## 2. PERSON

人口統計情報を保持（1 行 = 1 患者）：

```sql
CREATE TABLE person (
  person_id BIGINT PRIMARY KEY,
  gender_concept_id INTEGER NOT NULL,         -- 8507=Male, 8532=Female
  year_of_birth INTEGER NOT NULL,
  month_of_birth INTEGER,
  day_of_birth INTEGER,
  birth_datetime TIMESTAMP,
  race_concept_id INTEGER NOT NULL,
  ethnicity_concept_id INTEGER NOT NULL,
  location_id BIGINT,
  provider_id BIGINT,
  care_site_id BIGINT,
  person_source_value VARCHAR(50),            -- 元の患者 ID（pseudonymized CCCD）
  gender_source_value VARCHAR(50),
  gender_source_concept_id INTEGER,
  race_source_value VARCHAR(50),
  race_source_concept_id INTEGER,
  ethnicity_source_value VARCHAR(50),
  ethnicity_source_concept_id INTEGER
);
```

### 重要な ETL 規約：
- `person_id` は **BIGINT** にすること（大規模データセットに備えて）
- `year_of_birth` は必須、`month_of_birth/day_of_birth` は任意（プライバシー懸念があれば NULL もしくは 1）
- `race_concept_id` がない場合は `0`（concept Unknown）
- ベトナム：民族は `race_source_value` にマッピングし、race_concept_id は custom を使用（[Vocabulary](/blog/omop-standardized-vocabularies-athena) 参照）

## 3. OBSERVATION_PERIOD

患者がデータセット内で **観察されている** 期間：

```sql
CREATE TABLE observation_period (
  observation_period_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  observation_period_start_date DATE NOT NULL,
  observation_period_end_date DATE NOT NULL,
  period_type_concept_id INTEGER NOT NULL  -- 32817 = EHR derived, 32811 = claim
);
```

極めて重要：incidence/prevalence は患者がどれだけ観察されたかを知って初めて正確になります。

ETL 規約：
- 1 person が複数の `observation_period` を持つ場合あり（30 日超のギャップで分割）
- Start = データセット内の最初のイベント日、End = 最後のイベント日 + 30 日（または死亡日）

## 4. VISIT_OCCURRENCE

各受診：

```sql
CREATE TABLE visit_occurrence (
  visit_occurrence_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  visit_concept_id INTEGER NOT NULL,         -- 9201=Inpatient, 9202=Outpatient, 9203=ER
  visit_start_date DATE NOT NULL,
  visit_start_datetime TIMESTAMP,
  visit_end_date DATE NOT NULL,
  visit_end_datetime TIMESTAMP,
  visit_type_concept_id INTEGER NOT NULL,
  provider_id BIGINT,
  care_site_id BIGINT,
  visit_source_value VARCHAR(50),
  visit_source_concept_id INTEGER,
  admitted_from_concept_id INTEGER,
  admitted_from_source_value VARCHAR(50),
  discharged_to_concept_id INTEGER,
  discharged_to_source_value VARCHAR(50),
  preceding_visit_occurrence_id BIGINT
);
```

ベトナムでよく使う visit_concept_id：
| Source | concept_id | 名称 |
|---|---|---|
| 入院 | 9201 | Inpatient Visit |
| 外来 | 9202 | Outpatient Visit |
| 救急 | 9203 | Emergency Room Visit |
| Telehealth | 5083 | Telehealth |
| Long-term care | 42898160 | Nursing facility |

## 5. CONDITION_OCCURRENCE

診断／症状／病態：

```sql
CREATE TABLE condition_occurrence (
  condition_occurrence_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  condition_concept_id INTEGER NOT NULL,
  condition_start_date DATE NOT NULL,
  condition_start_datetime TIMESTAMP,
  condition_end_date DATE,
  condition_end_datetime TIMESTAMP,
  condition_type_concept_id INTEGER NOT NULL,  -- 32020=EHR diagnosis, 32035=Problem list
  condition_status_concept_id INTEGER,         -- 32902=admit, 32903=discharge, 32893=primary
  stop_reason VARCHAR(20),
  provider_id BIGINT,
  visit_occurrence_id BIGINT,
  visit_detail_id BIGINT,
  condition_source_value VARCHAR(50),          -- 元の ICD-10 コード
  condition_source_concept_id INTEGER,         -- ICD-10 source の concept_id
  condition_status_source_value VARCHAR(50)
);
```

ETL 規約：
- `condition_concept_id` は常に **Standard SNOMED** を使用
- `condition_source_concept_id` は元の ICD-10 を保持（ICD コードの concept_id）
- `condition_source_value` は raw 文字列「E11.9」

## 6. DRUG_EXPOSURE

各処方／調剤／投与：

```sql
CREATE TABLE drug_exposure (
  drug_exposure_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  drug_concept_id INTEGER NOT NULL,           -- RxNorm Standard
  drug_exposure_start_date DATE NOT NULL,
  drug_exposure_start_datetime TIMESTAMP,
  drug_exposure_end_date DATE NOT NULL,
  drug_exposure_end_datetime TIMESTAMP,
  verbatim_end_date DATE,
  drug_type_concept_id INTEGER NOT NULL,      -- 38000177=Prescription, 32428=Dispense
  stop_reason VARCHAR(20),
  refills INTEGER,
  quantity NUMERIC,
  days_supply INTEGER,
  sig TEXT,
  route_concept_id INTEGER,
  lot_number VARCHAR(50),
  provider_id BIGINT,
  visit_occurrence_id BIGINT,
  visit_detail_id BIGINT,
  drug_source_value VARCHAR(50),
  drug_source_concept_id INTEGER,
  route_source_value VARCHAR(50),
  dose_unit_source_value VARCHAR(50)
);
```

ETL 規約：
- `drug_concept_id` は **Clinical Drug** または **Branded Drug**（RxNorm）を使用、Ingredient は使わない（用量情報が失われる）
- `drug_exposure_end_date` = start + days_supply（end がない場合）
- ベトナム保健省医薬品リスト → USAGI を使って RxNorm にマッピング

## 7. MEASUREMENT vs OBSERVATION — 区別

最も混同しやすいポイントです。ルール：

| 観点 | MEASUREMENT | OBSERVATION |
|---|---|---|
| **検査標準を持つ** 定量／定性測定 | ✅ | ❌ |
| バイタル（BP、HR、T°） | ✅ | ❌ |
| 検査（Glucose、HbA1c、CBC） | ✅ | ❌ |
| 既往（喫煙、家族の癌歴） | ❌ | ✅ |
| ライフスタイル（BMI カテゴリ、運動） | ❌ | ✅ |
| 社会的決定要因 | ❌ | ✅ |
| 症状報告（胸痛） | ❌ | ✅（structured measure がない場合） |

### MEASUREMENT スキーマ

```sql
CREATE TABLE measurement (
  measurement_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  measurement_concept_id INTEGER NOT NULL,    -- LOINC standard
  measurement_date DATE NOT NULL,
  measurement_datetime TIMESTAMP,
  measurement_time VARCHAR(10),
  measurement_type_concept_id INTEGER NOT NULL,
  operator_concept_id INTEGER,                -- 4172703=>, 4172704=<, 4172756==
  value_as_number NUMERIC,
  value_as_concept_id INTEGER,                -- 結果が categorical の場合
  unit_concept_id INTEGER,                    -- UCUM
  range_low NUMERIC,
  range_high NUMERIC,
  provider_id BIGINT,
  visit_occurrence_id BIGINT,
  visit_detail_id BIGINT,
  measurement_source_value VARCHAR(50),
  measurement_source_concept_id INTEGER,
  unit_source_value VARCHAR(50),
  unit_source_concept_id INTEGER,
  value_source_value VARCHAR(50),
  measurement_event_id BIGINT,                -- CDM 5.4: specimen、episode と紐付け
  meas_event_field_concept_id INTEGER
);
```

### OBSERVATION スキーマ

```sql
CREATE TABLE observation (
  observation_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  observation_concept_id INTEGER NOT NULL,
  observation_date DATE NOT NULL,
  observation_datetime TIMESTAMP,
  observation_type_concept_id INTEGER NOT NULL,
  value_as_number NUMERIC,
  value_as_string VARCHAR(60),
  value_as_concept_id INTEGER,
  qualifier_concept_id INTEGER,
  unit_concept_id INTEGER,
  provider_id BIGINT,
  visit_occurrence_id BIGINT,
  visit_detail_id BIGINT,
  observation_source_value VARCHAR(50),
  observation_source_concept_id INTEGER,
  unit_source_value VARCHAR(50),
  qualifier_source_value VARCHAR(50),
  value_source_value VARCHAR(50),
  observation_event_id BIGINT,
  obs_event_field_concept_id INTEGER
);
```

## 8. PROCEDURE_OCCURRENCE

患者に対して実施された医療行為（手術、処置、ワクチン）：

```sql
CREATE TABLE procedure_occurrence (
  procedure_occurrence_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  procedure_concept_id INTEGER NOT NULL,    -- SNOMED, CPT4, ICD-10-PCS
  procedure_date DATE NOT NULL,
  procedure_datetime TIMESTAMP,
  procedure_end_date DATE,
  procedure_end_datetime TIMESTAMP,
  procedure_type_concept_id INTEGER NOT NULL,
  modifier_concept_id INTEGER,
  quantity INTEGER,
  provider_id BIGINT,
  visit_occurrence_id BIGINT,
  visit_detail_id BIGINT,
  procedure_source_value VARCHAR(50),
  procedure_source_concept_id INTEGER,
  modifier_source_value VARCHAR(50)
);
```

ベトナム：保健省 DVKT（医療技術サービス）リスト → SNOMED procedure にマッピング。

## 9. Drug_Era と Condition_Era — derived

![9. Drug_Era と Condition_Era — derived](/images/blog/diagrams/omop-core-clinical-tables-deep-dive-d02.webp)

`DRUG_ERA` は連続する Drug_Exposure を集約します（デフォルトのギャップは 30 日）：

```sql
CREATE TABLE drug_era (
  drug_era_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  drug_concept_id INTEGER NOT NULL,         -- INGREDIENT（product ではない）
  drug_era_start_date DATE NOT NULL,
  drug_era_end_date DATE NOT NULL,
  drug_exposure_count INTEGER,
  gap_days INTEGER
);
```

重要：Drug_Era の `drug_concept_id` は **Ingredient**（例：Metformin）であり、product（Metformin 500mg）ではありません。→ 用量を問わず「Metformin 服用中」を解析しやすくなります。

## 10. よく使う SQL パターン

### 10.1 性別ごとの患者総数

```sql
SELECT 
  c.concept_name AS gender,
  COUNT(*) AS n_patient
FROM person p
JOIN concept c ON p.gender_concept_id = c.concept_id
GROUP BY c.concept_name;
```

### 10.2 過去 90 日以内に Metformin を服用している 2 型糖尿病患者

```sql
WITH diabetes AS (
  SELECT DISTINCT person_id
  FROM condition_occurrence co
  JOIN concept_ancestor ca ON co.condition_concept_id = ca.descendant_concept_id
  WHERE ca.ancestor_concept_id = 201826  -- T2DM
),
metformin AS (
  SELECT DISTINCT person_id
  FROM drug_era de
  WHERE de.drug_concept_id = 1503297  -- Metformin Ingredient
    AND de.drug_era_end_date >= CURRENT_DATE - 90
)
SELECT COUNT(*) AS n
FROM diabetes d
JOIN metformin m ON d.person_id = m.person_id;
```

### 10.3 2026 年集団における疾患の Incidence rate

```sql
WITH new_cases AS (
  SELECT person_id, MIN(condition_start_date) AS first_dx
  FROM condition_occurrence co
  JOIN concept_ancestor ca ON co.condition_concept_id = ca.descendant_concept_id
  WHERE ca.ancestor_concept_id = 201826
  GROUP BY person_id
  HAVING MIN(condition_start_date) BETWEEN '2026-01-01' AND '2026-12-31'
),
person_time AS (
  SELECT person_id, 
    GREATEST(observation_period_start_date, '2026-01-01') AS pt_start,
    LEAST(observation_period_end_date, '2026-12-31') AS pt_end
  FROM observation_period
  WHERE observation_period_start_date <= '2026-12-31'
    AND observation_period_end_date >= '2026-01-01'
)
SELECT 
  COUNT(DISTINCT new_cases.person_id) AS new_dx,
  SUM(EXTRACT(EPOCH FROM (pt_end - pt_start)) / 86400 / 365.25) AS person_years,
  COUNT(DISTINCT new_cases.person_id) * 1000.0 / 
    SUM(EXTRACT(EPOCH FROM (pt_end - pt_start)) / 86400 / 365.25) AS rate_per_1000_PY
FROM person_time pt
LEFT JOIN new_cases ON pt.person_id = new_cases.person_id;
```

### 10.4 T2DM 患者の平均 HbA1c

```sql
WITH diabetes_pts AS (
  SELECT DISTINCT person_id
  FROM condition_occurrence co
  JOIN concept_ancestor ca ON co.condition_concept_id = ca.descendant_concept_id
  WHERE ca.ancestor_concept_id = 201826
),
hba1c AS (
  SELECT m.person_id, m.value_as_number, m.measurement_date
  FROM measurement m
  WHERE m.measurement_concept_id = 3004410  -- LOINC HbA1c
    AND m.value_as_number BETWEEN 3 AND 20  -- 妥当性チェック
)
SELECT 
  AVG(value_as_number) AS mean_hba1c,
  STDDEV(value_as_number) AS sd_hba1c,
  COUNT(*) AS n
FROM diabetes_pts d
JOIN hba1c h ON d.person_id = h.person_id;
```

## 11. インデックス推奨

```sql
CREATE INDEX idx_co_person ON condition_occurrence(person_id);
CREATE INDEX idx_co_concept ON condition_occurrence(condition_concept_id);
CREATE INDEX idx_co_date ON condition_occurrence(condition_start_date);

CREATE INDEX idx_de_person ON drug_exposure(person_id);
CREATE INDEX idx_de_concept ON drug_exposure(drug_concept_id);

CREATE INDEX idx_m_person_concept ON measurement(person_id, measurement_concept_id);
CREATE INDEX idx_m_date ON measurement(measurement_date);

-- Vocabulary
CREATE INDEX idx_concept_vocab_code ON concept(vocabulary_id, concept_code);
CREATE INDEX idx_ca_anc_desc ON concept_ancestor(ancestor_concept_id, descendant_concept_id);
```

OHDSI は `OMOPCDM_postgresql_5.4_indices.sql` で標準のインデックススクリプトを提供しています。

## 12. 落とし穴

- ❌ `condition_concept_id = 0`（unmapped）→ 患者がコホートから消える
- ❌ `JOIN concept_ancestor` を忘れる → コホートに亜型が抜ける
- ❌ HbA1c を `measurement_source_value` のテキストで検索 → 脆弱、`measurement_concept_id = 3004410` を使うべき
- ❌ Incidence 計算に `OBSERVATION_PERIOD` を使わない → 不正確
- ❌ `value_as_number BETWEEN ... AND ...` の妥当性チェックを忘れる → 外れ値で解析が崩れる
- ❌ `Drug_Exposure`（Clinical/Branded Drug）と `Drug_Era`（Ingredient）を混同 → 結果が誤る

## まとめ

7 つのコアテーブルだけで RWE 解析の 90% に対応できます。高度なテーブルに触れる前に、Person、Visit、Condition、Drug、Measurement、Observation、Procedure をしっかり理解しましょう。階層には常に `concept_ancestor` を使い、妥当性をバリデーションしましょう。

次の記事：[OMOP ETL Mastery — WhiteRabbit、RabbitInAHat、USAGI、Perseus](/blog/omop-etl-whiterabbit-usagi-perseus)。
