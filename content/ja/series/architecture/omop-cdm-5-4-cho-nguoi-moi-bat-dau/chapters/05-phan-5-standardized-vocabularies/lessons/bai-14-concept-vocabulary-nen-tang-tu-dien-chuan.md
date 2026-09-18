---
id: 019f1a00-a114-7b01-e001-omopcdm54014
title: 'レッスン 14: 概念と語彙 — 標準辞書の基礎'
slug: bai-14-concept-vocabulary-nen-tang-tu-dien-chuan
description: >-
  2 つのテーブルは Vocabulary システムの中心です。CONCEPT にはすべての医学概念が含まれ、VOCABULARY は起源を管理します。
  standard_concept、domain_id、concept_class_id、vocabulary_id、および Athena
  の検索方法を学びます。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 14
section_title: 'パート 5: 標準化された語彙'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初心者向け OMOP CDM 5.4 — A to Z を理解する
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop14" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop14)"/>
  <g>
    <circle cx="690" cy="88" r="22" fill="#818cf8" opacity="0.11"/>
    <circle cx="770" cy="108" r="30" fill="#818cf8" opacity="0.08"/>
    <circle cx="850" cy="130" r="26" fill="#818cf8" opacity="0.07"/>
    <line x1="630" y1="160" x2="1100" y2="240" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="130" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 14</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">コンセプトと語彙</tspan>
    <tspan x="60" dy="42">標準辞書プラットフォーム</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初心者向け OMOP CDM 5.4 — A to Z を理解する</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 5: 標準化された語彙</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![語彙エコシステム — コンセプト、語彙、関係、祖先](/storage/uploads/2026/04/omop-cdm-bai14-vocabulary-ecosystem.webp)

## はじめに

**標準化語彙** システムは OMOP CDM の「頭脳」であり、すべての臨床データがここにリンクされています。この記事では、**CONCEPT** (約 1,000 万の医療概念を含む) と **VOCABULARY** (70 以上の辞書ソースを管理) という 2 つの中央テーブルに焦点を当てます。これら 2 つのテーブルを理解することが、OMOP をマスターする鍵となります。

---

## 1. コンセプトテーブル

＃＃＃１．１．構造

|コラム |タイプ |説明 |例 |
|-----|----------|------|----------|
| `concept_id` |整数 | PK — グローバルに一意の ID | 201826 |
| `concept_name` | VARCHAR(255) |コンセプト名 | 「2型糖尿病」 |
| `domain_id` | VARCHAR(20) |ドメイン (どのテーブル) | 「状態」 |
| `vocabulary_id` | VARCHAR(20) | FK → 語彙 | 「SNOMED」 |
| `concept_class_id` | VARCHAR(20) |語彙における分類 | 「臨床所見」 |
| `standard_concept` | VARCHAR(1) | S=標準、C=分類、NULL | "S" |
| `concept_code` | VARCHAR(50) |語彙内の元のコード | "44054006" |
| `valid_start_date` |日付 |有効開始日 | 2002-01-31 |
| `valid_end_date` |日付 |有効期限 | 2099年12月31日 |
| `invalid_reason` | VARCHAR(1) | NULL=有効、U=更新、D=削除 | NULL |

＃＃＃１．２． standard_concept — 3 種類のコンセプト

```
  ┌─────────────────────────────────────────────────────┐
  │ standard_concept = 'S' (Standard)                    │
  │ → Concept "chính thống" dùng trong *_concept_id     │
  │ → VD: SNOMED 201826 "Type 2 diabetes mellitus"      │
  │ → Dùng cho condition_concept_id                      │
  └──────────────────────┬──────────────────────────────┘
                         │ Maps to (nguồn → đích)
  ┌──────────────────────┴──────────────────────────────┐
  │ standard_concept = NULL (Non-standard / Source)      │
  │ → Concept nguồn từ ICD, CPT4, ATC...               │
  │ → VD: ICD10CM 45591837 "E11 - Type 2 DM"           │
  │ → Dùng cho *_source_concept_id                       │
  └─────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────┐
  │ standard_concept = 'C' (Classification)              │
  │ → Concept dùng cho phân cấp / ancestor              │
  │ → VD: MedDRA PT "Diabetes mellitus"                 │
  └─────────────────────────────────────────────────────┘
```

＃＃＃１．３． domain_id — ターゲットテーブルを識別します

|ドメインID | CDM テーブル |例 |
|----------|-----------|----------|
|条件 |条件発生 |病気、症状 |
|薬 | DRUG_EXPOSURE |医学 |
|手順 | PROCEDURE_OCCURRENCE |ヒント |
|測定 |測定 |テスト |
|観察 |観察 |謝辞 |
|デバイス |デバイス_露出 |設備 |
|解剖学的部位の仕様 |標本 |サンプリング場所 |
|訪問 | VISIT_OCCURRENCE | 「訪問 |」と入力します。
|タイプコンセプト | *_type_concept_id |データソース |
|性別 |人物 |性別 |
|レース |人物 |レース |
|単位 |測定単位 |単位 |
|ルート | DRUG_EXPOSURE.ルート |投与経路 |

---

## 2. 語彙表

＃＃＃２．１．構造

|コラム |タイプ |説明 |
|-----|--------|------|
| `vocabulary_id` | VARCHAR(20) | PK — ID ボキャブラリー |
| `vocabulary_name` | VARCHAR(255) |フルネーム |
| `vocabulary_reference` | VARCHAR(255) |参考URL |
| `vocabulary_version` | VARCHAR(255) |バージョン |
| `vocabulary_concept_id` |整数 | FK → 代表コンセプト |

＃＃＃２．２．人気の語彙

|語彙ID |名前 |メインドメイン |役割 |
|--------------|-----|---------------|----------|
| **SNOMED** | SNOMED-CT |状態、手順、観察 |臨床使用の標準 |
| **RxNorm** | RxNorm |薬 |医療の標準 |
| **ロインク** |ロインク |測定 |テストの標準 |
| **ICD10CM** | ICD-10-CM |条件 |ソースコンセプト診断 |
| **ICD10PCS** | ICD-10-PCS |手順 |ソースコンセプトのヒント |
| **CPT4** | CPT-4 |手順・測定 |ソース請求コード |
| **ATC** | ATC |薬 |医薬品の分類 |
| **UCUM** |ユーカム |単位 |測定単位 |
| **性別** | OMOP 性別 |性別 |性別 |
| **レース** |レース |レース |レース |
| **CVX** |ワクチン |薬 |ワクチンコード |

---

## 3. Athena でコンセプトを調べる

＃＃＃３．１．ルックアップステップ

```
  1. Vào athena.ohdsi.org
  2. Gõ từ khóa: "Type 2 diabetes"
  3. Filter:
     - Standard Concept: Standard ✓
     - Domain: Condition ✓
     - Vocabulary: SNOMED ✓
  4. Kết quả:
     concept_id:     201826
     concept_name:   Type 2 diabetes mellitus
     vocabulary_id:  SNOMED
     concept_code:   44054006
     standard_concept: S
     domain_id: Condition
```

＃＃＃３．２． SQLルックアップ

```sql
-- Tìm Standard Concept cho "tiểu đường type 2"
SELECT concept_id, concept_name, vocabulary_id,
       domain_id, standard_concept, concept_code
FROM concept
WHERE LOWER(concept_name) LIKE '%type 2 diabetes%'
  AND standard_concept = 'S'
  AND domain_id = 'Condition'
ORDER BY concept_name;

-- Tìm Source Concept (ICD-10) mapping đến Standard
SELECT
    c_src.concept_id AS source_concept_id,
    c_src.concept_code AS icd10_code,
    c_src.concept_name AS icd10_name,
    c_std.concept_id AS standard_concept_id,
    c_std.concept_name AS standard_name,
    c_std.vocabulary_id AS standard_vocab
FROM concept c_src
JOIN concept_relationship cr
    ON c_src.concept_id = cr.concept_id_1
    AND cr.relationship_id = 'Maps to'
JOIN concept c_std
    ON cr.concept_id_2 = c_std.concept_id
    AND c_std.standard_concept = 'S'
WHERE c_src.concept_code = 'E11'
  AND c_src.vocabulary_id = 'ICD10CM';
```

---

## 4. Concept_class_id — 語彙における分類

＃＃＃４．１． SNOMED

|コンセプトクラスID |意味 |例 |
|------|------|------|
|臨床所見 |病気、症状 |タイプ 2 DM |
|手順 |ヒント |虫垂切除術 |
|体の構造 |体の構造 |肝臓 |
|物質 |品質 |グルコース |
|観測可能なエンティティ |測定数量 |血圧 |
|修飾子の値 |付加価値 |深刻な |

＃＃＃４．２． RxNorm

|コンセプトクラスID |レベル |例 |
|------|-------|------|
|成分 (IN) |有効成分 |メトホルミン |
|臨床薬剤フォーム (CDF) | HC + 剤形 |メトホルミン経口錠 |
|臨床薬 (CD) | HC + 用量 + フォーム |メトホルミン 500mg 錠 |
|ブランドドラッグ (BD) |商号 |グルコファージ 500mg 錠 |
|臨床医薬品コンプ (CDC) | HC + 投与量 |メトホルミン500mg |
|ブランド名 (BN) |商号 |グルコファージ |
|用量フォーム (DF) |剤形 |経口錠剤 |

---

## 5. ドメインテーブル

|コラム |タイプ |説明 |
|-----|--------|------|
| `domain_id` | VARCHAR(20) | PK |
| `domain_name` | VARCHAR(255) |ドメイン名 |
| `domain_concept_id` |整数 | FK → コンセプト |

---

## 6. CONCEPT_CLASS テーブル

|コラム |タイプ |説明 |
|-----|--------|------|
| `concept_class_id` | VARCHAR(20) | PK |
| `concept_class_name` | VARCHAR(255) |クラス名 |
| `concept_class_concept_id` |整数 | FK → コンセプト |

---

## 7. Concept_id = 0 — 特別な意味

|コンセプト |意味 |いつ使用するか |
|----------|----------|---------------|
|コンセプトID = 0 | 「一致するコンセプトがありません」 |マッピングできません |
|コンセプト名 | 「一致するコンセプトがありません」 | |
|ドメインID | NULL | |
|語彙ID | 「なし」 | |

```sql
-- Kiểm tra % records không map được
SELECT
    'condition_occurrence' AS table_name,
    COUNT(*) AS total_records,
    SUM(CASE WHEN condition_concept_id = 0 THEN 1 ELSE 0 END) AS unmapped,
    ROUND(SUM(CASE WHEN condition_concept_id = 0 THEN 1 ELSE 0 END) * 100.0
          / COUNT(*), 1) AS unmapped_pct
FROM condition_occurrence
UNION ALL
SELECT 'drug_exposure', COUNT(*),
    SUM(CASE WHEN drug_concept_id = 0 THEN 1 ELSE 0 END),
    ROUND(SUM(CASE WHEN drug_concept_id = 0 THEN 1 ELSE 0 END) * 100.0
          / COUNT(*), 1)
FROM drug_exposure
UNION ALL
SELECT 'measurement', COUNT(*),
    SUM(CASE WHEN measurement_concept_id = 0 THEN 1 ELSE 0 END),
    ROUND(SUM(CASE WHEN measurement_concept_id = 0 THEN 1 ELSE 0 END) * 100.0
          / COUNT(*), 1)
FROM measurement;
```

---

## 概要

1. **コンセプト**: 最大 1,000 万件のレコード、各医療コンセプトには固有のコンセプト ID があります
2. **standard_concept**: S = 標準 (主に使用)、C = 分類、NULL = ソース
3. **domain_id** により、データがどの CDM テーブルに保存されるかが決まります
4. **語彙**: 70 以上の辞書ソース (SNOMED、RxNorm、LOINC、ICD-10...)
5. **concept_id = 0**: 「マッピングできません」 — ETL が標準コンセプトを見つけられない場合に使用されます
6. **athena.ohdsi.org** を検索するか、CONCEPT テーブルを直接クエリします。

**次の記事:** CONCEPT_RELATIONSHIP と CONCEPT_ANCESTOR — コンセプト間の関係と階層。

---

## 参考文献

- [OMOP CDM 5.4 — CONCEPT](https://ohdsi.github.io/CommonDataModel/cdm54.html#CONCEPT)
- [OMOP CDM 5.4 — VOCABULARY](https://ohdsi.github.io/CommonDataModel/cdm54.html#VOCABULARY)
- [Athena](https://athena.ohdsi.org/)
- [Book of OHDSI — Chapter 5: Standardized Vocabularies](https://ohdsi.github.io/TheBookOfOhdsi/StandardizedVocabularies.html)
