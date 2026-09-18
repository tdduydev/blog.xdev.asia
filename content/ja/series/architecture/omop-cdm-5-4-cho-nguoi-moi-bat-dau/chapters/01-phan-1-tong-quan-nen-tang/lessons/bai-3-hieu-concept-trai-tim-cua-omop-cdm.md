---
id: 019f1a00-a103-7b01-e001-omopcdm54003
title: 'レッスン 3: 概念を理解する — OMOP CDM の核心'
slug: bai-3-hieu-concept-trai-tim-cua-omop-cdm
description: >-
  コンセプトとは何か、標準コンセプトとソースコンセプトと分類コンセプト、コンセプトIDとソース値とソースコンセプトID、ドメイン、語彙、コンセプトクラス、およびAthenaの検索方法。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 3
section_title: 'パート 1: 概要と背景'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初心者向け OMOP CDM 5.4 — A to Z を理解する
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop03" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop03)"/>
  <g>
    <circle cx="659" cy="87" r="22" fill="#818cf8" opacity="0.12"/>
    <circle cx="718" cy="106" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="777" cy="125" r="36" fill="#818cf8" opacity="0.06"/>
    <circle cx="836" cy="144" r="13" fill="#818cf8" opacity="0.13"/>
    <circle cx="895" cy="163" r="20" fill="#818cf8" opacity="0.1"/>
    <line x1="600" y1="157" x2="1100" y2="237" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 3</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">コンセプトを理解する — ハート</tspan>
    <tspan x="60" dy="42">OMOP CDMの</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初心者向け OMOP CDM 5.4 — A to Z を理解する</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 1: 概要と背景</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![概念システム — 情報源、規格、分類](/storage/uploads/2026/04/omop-cdm-bai3-concept-system.webp)

## はじめに

OMOP CDM が家だとすると、**コンセプト** はレンガであり、すべてはコンセプトから構築されます。コンセプトを理解することが、CDM 全体を理解する鍵となります。

この記事では、「コンセプトとは何ですか?」について説明します。標準とソースの概念は異なりますか? Athena でコンセプトを検索するにはどうすればよいですか?そして「聖三位一体」 `concept_id` / `source_value` / `source_concept_id` どのように機能するのでしょうか?

---

＃＃１．コンセプトとは何でしょうか？

＃＃＃１．１．定義

**コンセプト** = **concept_id**と呼ばれる数字で表される固有の医療「コンセプト」。

医療で遭遇するすべてのものには、対応する概念があります。

|医療機関 |コンセプトID |コンセプト名 |語彙 |
|----------|-----------|--------------|----------|
|女性 | 8532 |女性 |性別 |
| 2型糖尿病 | 201826 | 2 型糖尿病 | SNOMED |
|メトホルミン 500mg 錠 | 1503297 |メトホルミン 500 MG 経口錠 | RxNorm |
| HbA1c検査 | 3004410 |血液中のヘモグロビン A1c/ヘモグロビン総量 |ロインク |
|パーセント単位 | 8554 |パーセント |ユーカム |
|外来診察 | 9202 |外来診察 |訪問 |
| EHR からのデータ | 32817 | EHR |タイプコンセプト |

＃＃＃１．２．コンセプトテーブル

各コンセプトはテーブル内の行として保存されます `CONCEPT`:

```sql
SELECT *
FROM concept
WHERE concept_id = 201826;
```

|コラム |値 |説明 |
|-----|----------|----------|
| `concept_id` | 201826 |固有の ID |
| `concept_name` | 2 型糖尿病 |表示名 |
| `domain_id` |条件 |どのドメインに属していますか |
| `vocabulary_id` | SNOMED |どの語彙 |
| `concept_class_id` |臨床所見 |コンセプトタイプ |
| `standard_concept` | S | **S** = 標準 |
| `concept_code` | 44054006 |語彙内の元のコード |
| `valid_start_date` | 1970-01-01 |有効開始日 |
| `valid_end_date` | 2099年12月31日 |有効期限 |
| `invalid_reason` | NULL |無効な理由 |

---

## 2. 標準コンセプト vs ソースコンセプト vs 分類

＃＃＃２．１． 3種類のコンセプト

```
  standard_concept column:
  ┌─────────────────────────────────────────────────────────────┐
  │                                                             │
  │  'S' = STANDARD CONCEPT                                    │
  │  → Dùng trong *_concept_id columns                          │
  │  → Là "đại diện chính thức" cho một khái niệm              │
  │  → VD: SNOMED 201826 "Type 2 diabetes mellitus"             │
  │                                                             │
  │  'C' = CLASSIFICATION CONCEPT                               │
  │  → Dùng để phân nhóm/phân cấp                              │
  │  → KHÔNG dùng trực tiếp trong clinical tables               │
  │  → VD: SNOMED parent concepts                               │
  │                                                             │
  │  NULL = NON-STANDARD (SOURCE) CONCEPT                       │
  │  → Mã từ vocabulary gốc                                     │
  │  → Lưu trong *_source_concept_id columns                    │
  │  → VD: ICD-10 E11 "Type 2 diabetes mellitus"               │
  │                                                             │
  └─────────────────────────────────────────────────────────────┘
```

＃＃＃２．２．具体例：「2型糖尿病」

```
  ICD-10-CM 'E11'                         SNOMED 44054006
  ┌──────────────────────┐    Maps to     ┌──────────────────────────┐
  │ concept_id = 443238  │ ──────────→    │ concept_id = 201826      │
  │ standard_concept=NULL│                │ standard_concept = 'S'    │
  │ vocabulary=ICD10CM   │                │ vocabulary = SNOMED       │
  │ (Source Concept)     │                │ (Standard Concept)        │
  └──────────────────────┘                └──────────────────────────┘

  Trong bảng CONDITION_OCCURRENCE:
  ┌────────────────────────────────────────────────────────────────────┐
  │ condition_concept_id        = 201826    ← Standard (SNOMED)       │
  │ condition_source_value      = 'E11'     ← Text gốc từ HIS        │
  │ condition_source_concept_id = 443238    ← Source Concept (ICD-10) │
  └────────────────────────────────────────────────────────────────────┘
```

＃＃＃２．３．聖三位一体

ほとんどの臨床テーブルには、概念フィールドごとに 3 つの列があります。

|コラム |目的 |値 |
|-----|----------|----------|
| `*_concept_id` | **分析** — 標準コンセプト |標準コンセプト ID (S) |
| `*_source_value` | **トレース** — 元のテキスト値 |元のテキスト (例: "E11"、"グルコファージ") |
| `*_source_concept_id` | **リバース マッピング** — オリジナルのコンセプト |非標準のコンセプト ID |

```
  ┌── Dùng để phân tích (SELECT, GROUP BY, JOIN)
  │
  condition_concept_id = 201826  ← Standard SNOMED
                                                    ├── Truy nguyên nguồn gốc
  condition_source_value = 'E11'  ← Text gốc HIS   │
  condition_source_concept_id = 443238  ← ICD-10 ───┘
```

---

## 3. ドメイン — Concept はどのテーブルに属しますか?

＃＃＃３．１．主要ドメイン

|ドメイン |宛先テーブル |例 |
|----------|-----------|----------|
|条件 |条件発生 |糖尿病、肺炎 |
|薬 | DRUG_EXPOSURE |メトホルミン、アモキシシリン |
|手順 | PROCEDURE_OCCURRENCE |内視鏡検査、外科 |
|測定 |測定 | HbA1c、血圧、BMI |
|観察 |観察 |喫煙、家族歴 |
|デバイス |デバイス_露出 |ステント、ペースメーカー |
|標本 |標本 |血液サンプル、組織サンプル |
|訪問 | VISIT_OCCURRENCE |外来診察・入院 |
|性別 |人物 |男性、女性 |
|レース |人物 |アジア人、白人 |
|タイプコンセプト |すべてのテーブル | EHR、クレーム、ラボ |
|単位 |測定 | mg/dL、%、mmHg |
|ルート | DRUG_EXPOSURE |経口、IV、局所 |

＃＃＃３．２．ドメインはなぜ重要ですか?

**レコードがどのテーブルにあるか**はドメインによって決定されます。コアの ETL ルールは次のとおりです。

```
  Dữ liệu nguồn: "ICD-10: Z87.891 — History of nicotine dependence"
  
  Bước 1: Tra cứu ICD-10 Z87.891 trên Athena
  Bước 2: Tìm Standard Concept → maps to SNOMED concept
  Bước 3: Standard Concept thuộc domain "Observation"
  Bước 4: Lưu vào bảng OBSERVATION (không phải CONDITION!)
  
  ⚠️ Dù ICD-10 thường gắn với Condition domain,
  nhưng "History of" map sang Observation domain
```

---

## 4. 語彙 — 概念の起源

＃＃＃４．１．重要な語彙

```
  ┌──────────────────────────────────────────────────────────────────┐
  │  VOCABULARY CHÍNH TRONG OMOP CDM                                 │
  │                                                                   │
  │  ┌─────────────┐   Conditions (diagnoses, symptoms)              │
  │  │  SNOMED CT  │   → Standard vocabulary cho Condition domain     │
  │  └─────────────┘                                                  │
  │                                                                   │
  │  ┌─────────────┐   Drugs (medications, vaccines)                  │
  │  │  RxNorm     │   → Standard vocabulary cho Drug domain          │
  │  └─────────────┘                                                  │
  │                                                                   │
  │  ┌─────────────┐   Measurements (lab tests, vitals)              │
  │  │   LOINC     │   → Standard vocabulary cho Measurement domain  │
  │  └─────────────┘                                                  │
  │                                                                   │
  │  ┌─────────────┐   Procedures                                     │
  │  │  SNOMED CT  │   → Standard vocabulary cho Procedure domain     │
  │  │  CPT4       │   → US-specific procedures                       │
  │  └─────────────┘                                                  │
  │                                                                   │
  │  SOURCE VOCABULARIES (Non-standard, cần mapping):                 │
  │  ICD-10-CM/VN, ICD-9-CM, NDC, HCPCS, ATC, Read, MedDRA         │
  └──────────────────────────────────────────────────────────────────┘
```

＃＃＃４．２．標準語彙と非標準語彙

|タイプ |例 |標準コンセプト |列 | で使用されます。
|----------|----------|----------|---------------|
| **標準** | SNOMED CT、RxNorm、LOINC | 'S' | `*_concept_id` |
| **非標準** | ICD-10、NDC、ATC、MedDRA | NULL | `*_source_concept_id` |
| **分類** | SNOMED 階層ノード | 'C' |階層クエリで使用 |

＃＃＃４．３．マッピングプロセス

```
  HIS: "E11" (ICD-10)
       │
       │  Tra bảng CONCEPT_RELATIONSHIP
       │  relationship_id = 'Maps to'
       ↓
  Source Concept: 443238 (ICD-10 E11)
       │
       │  Maps to
       ↓
  Standard Concept: 201826 (SNOMED Type 2 diabetes mellitus)
```

SQL ルックアップ マッピング:

```sql
-- Tìm Standard Concept từ ICD-10 code 'E11'
SELECT
    c1.concept_id   AS source_concept_id,
    c1.concept_name AS source_name,
    c1.vocabulary_id AS source_vocab,
    c2.concept_id   AS standard_concept_id,
    c2.concept_name AS standard_name,
    c2.vocabulary_id AS standard_vocab
FROM concept c1
JOIN concept_relationship cr
    ON c1.concept_id = cr.concept_id_1
    AND cr.relationship_id = 'Maps to'
JOIN concept c2
    ON cr.concept_id_2 = c2.concept_id
    AND c2.standard_concept = 'S'
WHERE c1.concept_code = 'E11'
  AND c1.vocabulary_id = 'ICD10CM';
```

---

## 5. 概念クラス — 詳細分類

各コンセプトは、どのレベルの語彙に属するかを示す **コンセプト クラス** に属します。

|ドメイン |コンセプトクラス |例 |
|------|------|------|
|条件 |臨床所見 | 2 型糖尿病 |
|薬 | **成分** |メトホルミン |
|薬 | **臨床薬** |メトホルミン 500 MG 経口錠 |
|薬 | **ブランド医薬品** |グルコファージ 500 MG 経口錠剤 |
|測定 |ラボテスト |ヘモグロビンA1c |
|測定 |臨床観察 |体重 |
|手順 |手順 |冠動脈バイパス移植 |
|観察 |コンテキスト依存 |臨床所見の歴史 |

### 医薬品コンセプトのクラス — 特に重要

RxNorm は薬物をレベル別に整理します。

```
  INGREDIENT (hoạt chất)
  └── Metformin (concept_id = 1503297)
       │
       ├── CLINICAL DRUG FORM
       │   └── Metformin Oral Tablet
       │        │
       │        ├── CLINICAL DRUG (hoạt chất + liều + dạng)
       │        │   └── Metformin 500 MG Oral Tablet
       │        │        │
       │        │        └── BRANDED DRUG (tên thương mại)
       │        │            └── Glucophage 500 MG Oral Tablet
       │        │
       │        └── CLINICAL DRUG
       │            └── Metformin 1000 MG Oral Tablet
       │
       └── CLINICAL DRUG FORM
           └── Metformin Extended Release Oral Tablet
```

---

## 6. Athena でコンセプトを調べる

＃＃＃６．１．アテナとは何ですか？

**アテナ** (https://athena.ohdsi.org/) は、標準化された語彙を検索するための無料の Web ツールです。

＃＃＃６．２．検索手順

**ステップ 1:** アクセス https://athena.ohdsi.org/ (無料アカウントを作成する必要があります)

**ステップ 2:** キーワードを入力します (例: 「2 型糖尿病」)

**ステップ 3:** 結果のフィルタリング:
- **標準コンセプト:** 標準コンセプトのみを表示するには、「標準」を選択します。
- **ドメイン:** 病気を検索する場合は「状態」を選択します
- **語彙:** 「SNOMED」または「ICD10CM」を選択します

**ステップ 4:** コンセプトの詳細を参照:
- コンセプトID、名前、クラス、ドメイン、語彙
- **関係** タブ: 「マップ先」、「である」、「コンポーネントがある」を参照してください。
- **階層** タブ: 父/子の概念を参照

＃＃＃６．３．人気のある検索の例

```
  Tìm bệnh tiểu đường type 2:
  → Search: "type 2 diabetes"
  → Filter: Domain=Condition, Standard=Standard
  → Kết quả: concept_id=201826, SNOMED "Type 2 diabetes mellitus"

  Tìm thuốc Metformin:
  → Search: "metformin"
  → Filter: Domain=Drug, Concept Class=Ingredient
  → Kết quả: concept_id=1503297, RxNorm "metformin"

  Tìm xét nghiệm HbA1c:
  → Search: "hemoglobin a1c"
  → Filter: Domain=Measurement, Standard=Standard
  → Kết quả: concept_id=3004410, LOINC "Hemoglobin A1c/Hemoglobin.total"
```

---

## 7. Concept_id = 0 — マッピングできない場合

ソース データを標準コンセプトにマッピングできない場合:

```sql
-- Một mã thuốc nội bộ bệnh viện không có trong RxNorm
drug_concept_id        = 0              -- Không map được!
drug_source_value      = 'THUOC_BV_001' -- Vẫn giữ mã gốc
drug_source_concept_id = 0              -- Cũng không có source concept
```

**これは完全に有効です。** OMOP CDM ではこれが許可されています `concept_id = 0`ただし、目標は、次のようにして、concept_id = 0 のレコードの数を**最小限に**することです。

1. カスタム マッピングには **SOURCE_TO_CONCEPT_MAP** を使用します
2. **Usagi** ツールを使用して半自動マッピングを行う
3. 語彙に新しい概念を追加するようコミュニティに依頼する

---

## 8. 練習: CDM レコードを読み取る

次のレコードについては、 `CONDITION_OCCURRENCE`:

```sql
condition_occurrence_id    = 50001
person_id                  = 12345
condition_concept_id       = 201826
condition_start_date       = '2024-06-10'
condition_start_datetime   = '2024-06-10 09:30:00'
condition_end_date         = NULL
condition_end_datetime     = NULL
condition_type_concept_id  = 32817
condition_status_concept_id = 32902
provider_id                = 5001
visit_occurrence_id        = V001
condition_source_value     = 'E11'
condition_source_concept_id = 443238
condition_status_source_value = 'admitting'
```

**デコード:**

|学校 |値 |意味 |
|----------|----------|----------|
|条件コンセプト ID = 201826 | SNOMED「2型糖尿病」 |標準診断 |
|条件タイプコンセプト ID = 32817 | 「EHR」 | EMR システムからのデータ |
|条件ステータスコンセプト ID = 32902 | 「一次診断」 |一次診断 |
|条件ソース値 = 'E11' | ICD-10-CM オリジナルコード | HIS からのオリジナル コード |
|条件ソースコンセプト ID = 443238 | 「E11」のICD-10-CMコンセプト |オリジナルコンセプト |
|プロバイダー ID = 5001 |診断医 |ルックアップテーブル PROVIDER |
|訪問発生ID = V001 |外来受診 | VISIT_OCCURRENCE | テーブルを検索します。

---

## 概要

この記事では、次のことを学びました。

1. **コンセプト** = 医療コンセプト。一意のconcept_idで表されます。
2. **3種類のコンセプト**: 標準(S)、分類(C)、ソース(NULL)
3. **トリプルカラム**: `*_concept_id` / `*_source_value` / `*_source_concept_id`
4. **ドメイン**により、レコードがどのテーブルに含まれるかが決まります
5. **語彙**: SNOMED (状態)、RxNorm (薬物)、LOINC (測定)
6. **概念クラス**: 詳細な分類 (成分 vs 臨床薬...)
7. **Athena**: 無料のコンセプト検索ツール
8. **concept_id = 0**: マップが不可能な場合に有効

**次の投稿:** まず、患者の人口統計情報が保存されている最初のテーブル **PERSON** を調べます。

---

## 参考文献

- [Athena — OHDSI Vocabulary Search](https://athena.ohdsi.org/)
- [The Book of OHDSI — Chapter 5: Standardized Vocabularies](https://ohdsi.github.io/TheBookOfOhdsi/StandardizedVocabularies.html)
- [OMOP CDM Wiki — Concept](https://ohdsi.github.io/CommonDataModel/cdm54.html#CONCEPT)
