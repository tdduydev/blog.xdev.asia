---
id: 019f1a00-a102-7b01-e001-omopcdm54002
title: 'レッスン 2: OMOP CDM 5.4 の全体的なアーキテクチャ — テーブル グループと設計原則'
slug: bai-2-kien-truc-tong-the-omop-cdm-5-4-nhom-bang-nguyen-ly-thiet-ke
description: >-
  OMOP CDM 5.4 の 37 のテーブル、6 つの主要なテーブル グループ
  (臨床データ、医療システム、医療経済、標準化された語彙、派生要素、メタデータ)、個人中心モデル、および中核となる設計原則の概要。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 2
section_title: 'パート 1: 概要と背景'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初心者向け OMOP CDM 5.4 — A to Z を理解する
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop02" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop02)"/>
  <g>
    <circle cx="659" cy="87" r="22" fill="#818cf8" opacity="0.12"/>
    <circle cx="718" cy="106" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="777" cy="125" r="36" fill="#818cf8" opacity="0.06"/>
    <circle cx="836" cy="144" r="13" fill="#818cf8" opacity="0.13"/>
    <circle cx="895" cy="163" r="20" fill="#818cf8" opacity="0.1"/>
    <line x1="600" y1="157" x2="1100" y2="237" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="187" x2="1050" y2="257" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 2</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">OMOP CDM 5.4 の全体的なアーキテクチャ</tspan>
    <tspan x="60" dy="42">テーブルグループと設計原則</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初心者向け OMOP CDM 5.4 — A to Z を理解する</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 1: 概要と背景</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![6 OMOP CDM 5.4 テーブル グループのアーキテクチャは PERSON を中心に展開します](/storage/uploads/2026/04/omop-cdm-bai2-architecture-6-groups.webp)

## はじめに

前回の記事では、OMOP CDM が必要な **理由** を理解できました。この記事では、次の質問に答えます: **CDM 5.4 はどのようなものですか?** — 37 のテーブルは、どのようなグループに、どのような設計原則に従ってどのように編成されていますか。

次の記事で各表に入る前に、CDM 全体の「鳥瞰図」を理解します。

---

## 1. 6 つのテーブル グループの概要

OMOP CDM 5.4 には、**6 つのグループ** (グループ) に分割された **37 のテーブル**が含まれています。

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        OMOP CDM 5.4 — 37 Tables                        │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  1. CLINICAL DATA (16 bảng)                                     │    │
│  │  person, observation_period, visit_occurrence, visit_detail,     │    │
│  │  condition_occurrence, drug_exposure, procedure_occurrence,      │    │
│  │  device_exposure, measurement, observation, death, note,         │    │
│  │  note_nlp, specimen, fact_relationship, episode, episode_event   │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                         │
│  ┌──────────────────────────┐  ┌──────────────────────────────────┐    │
│  │  2. HEALTH SYSTEM (3)    │  │  3. HEALTH ECONOMICS (2)         │    │
│  │  location, care_site,    │  │  payer_plan_period, cost          │    │
│  │  provider                │  │                                   │    │
│  └──────────────────────────┘  └──────────────────────────────────┘    │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  4. STANDARDIZED VOCABULARIES (12 bảng)                          │   │
│  │  concept, vocabulary, domain, concept_class, concept_relationship,│   │
│  │  relationship, concept_synonym, concept_ancestor,                 │   │
│  │  source_to_concept_map, drug_strength, cohort, cohort_definition │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────┐   ┌───────────────────────────────────┐   │
│  │  5. DERIVED ELEMENTS (3) │   │  6. METADATA (2)                  │   │
│  │  drug_era, dose_era,     │   │  cdm_source, metadata              │   │
│  │  condition_era           │   │                                    │   │
│  └─────────────────────────┘   └───────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

＃＃＃１．１．臨床データテーブル (16 テーブル)

これは**最大かつ最も重要**なグループであり、すべての臨床データが含まれています。

|表 |簡単な説明 |レッスン |
|----------|---------------|----------|
| `person` |患者の人口統計情報 |レッスン 4 |
| `observation_period` |フォローアップ間隔 |レッスン 5 |
| `visit_occurrence` |訪問・入院 |レッスン 6 |
| `visit_detail` |詳細は訪問で |レッスン 6 |
| `condition_occurrence` |診断、病理学 |レッスン 7 |
| `drug_exposure` |医薬品、処方箋、ワクチン |レッスン 8 |
| `procedure_occurrence` |手順、手術 |レッスン 9 |
| `measurement` |検査、バイタルサイン |レッスン 10 |
| `observation` |臨床観察、歴史 |レッスン 11 |
| `device_exposure` |医療機器 |レッスン 12 |
| `specimen` |患者サンプル |レッスン 12 |
| `note` |テキストメモ |レッスン 12 |
| `note_nlp` | NLP の結果は note |レッスン 12 |
| `death` |死亡情報 |レッスン 13 |
| `episode` |疾患段階 (新しい CDM 5.4) |レッスン 13 |
| `episode_event` |イベント エピソードのリンク (新しい CDM 5.4) |レッスン 13 |

＃＃＃１．２．医療システム データ テーブル (3 つのテーブル)

|表 |説明 |
|------|------|
| `location` |場所 (住所、座標) |
| `care_site` |医療機関（病院、診療所） |
| `provider` |医療スタッフ（医師・看護師） |

＃＃＃１．３．医療経済データ表（2表）

|表 |説明 |
|------|------|
| `payer_plan_period` |健康保険情報の推移 |
| `cost` |あらゆる臨床イベントに関連するコスト |

＃＃＃１．４．標準化された語彙 (12 ボード)

|表 |説明 |
|------|------|
| `concept` |中央テーブル — 1,000 万を超える概念が含まれています。
| `vocabulary` |語彙ソースのリスト (SNOMED、ICD-10...) |
| `domain` |ドメイン (状態、薬剤、処置...) |
| `concept_class` |概念分類 (臨床所見、成分...) |
| `concept_relationship` |概念間の関係 |
| `relationship` |関係タイプの定義 |
| `concept_synonym` |コンセプトの別名 |
| `concept_ancestor` |概念の階層的系譜 |
| `source_to_concept_map` |ソースコード→標準コンセプトのマッピング |
| `drug_strength` |薬物含有量と濃度 |
| `cohort` |基準別の患者リスト |
| `cohort_definition` |コホート基準の定義 |

＃＃＃１．５。派生要素 (3 つのテーブル)

|表 |説明 |
|------|------|
| `drug_era` |薬物曝露を成分ごとにグループ化 |
| `dose_era` |薬を安定用量で使用する段階 |
| `condition_era` |継続的な条件を時代に結合する |

＃＃＃１．６．メタデータ (2 テーブル)

|表 |説明 |
|------|------|
| `cdm_source` |データ ソース情報、CDM バージョン |
| `metadata` |オプションの追加メタデータ |

---

## 2. 中心となる設計原則

＃＃＃２．１．パーソンセントリック（患者中心）

すべての臨床テーブルは、キーを介して **PERSON** にリンクされています。 `person_id`:

```
                           ┌─────────────────────┐
                           │      PERSON          │
                           │  person_id (PK)      │
                           │  gender_concept_id   │
                           │  year_of_birth       │
                           └──────────┬──────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
   ┌──────────┴──────────┐  ┌────────┴────────┐  ┌──────────┴──────────┐
   │ OBSERVATION_PERIOD   │  │ VISIT_OCCURRENCE │  │ CONDITION_OCCURRENCE│
   │ person_id (FK)       │  │ person_id (FK)   │  │ person_id (FK)     │
   └─────────────────────┘  └──────┬──────────┘  └────────────────────┘
                                    │
              ┌────────────────────┼────────────────────┐
              │                    │                     │
   ┌──────────┴──────┐  ┌────────┴────────┐  ┌────────┴────────┐
   │ DRUG_EXPOSURE    │  │ PROCEDURE_OCC.  │  │ MEASUREMENT     │
   │ person_id (FK)   │  │ person_id (FK)  │  │ person_id (FK)  │
   │ visit_occ_id(FK) │  │ visit_occ_id(FK)│  │ visit_occ_id(FK)│
   └─────────────────┘  └────────────────┘  └────────────────┘
```

**ルール:** データラインを接続できない場合 `person_id`、**臨床表には含まれていません**。

＃＃＃２．２．イベントベース

各医療イベントは、対応するテーブルに**個別のレコード**を作成します。

```
Ngày 10/06: Khám ngoại trú → 1 record trong VISIT_OCCURRENCE
  ├── Chẩn đoán tiểu đường  → 1 record trong CONDITION_OCCURRENCE
  ├── Chẩn đoán tăng HA      → 1 record trong CONDITION_OCCURRENCE
  ├── Kê Metformin 500mg      → 1 record trong DRUG_EXPOSURE
  ├── Kê Amlodipine 5mg       → 1 record trong DRUG_EXPOSURE
  ├── XN HbA1c = 7.8%         → 1 record trong MEASUREMENT
  └── XN Creatinine = 1.1     → 1 record trong MEASUREMENT
```

＃＃＃２．３．コンセプト主導 (標準コンセプトに基づく)

各臨床値は、標準化された語彙の **concept_id** でエンコードされます。

```
  Cột trong bảng CDM              Concept                    Vocabulary
  ─────────────────────────────────────────────────────────────────────
  gender_concept_id = 8532     →  "Female"                   [Gender]
  condition_concept_id = 201826 → "Type 2 diabetes mellitus" [SNOMED CT]
  drug_concept_id = 1503297    → "Metformin 500 MG Oral Tab" [RxNorm]
  measurement_concept_id = 3004410 → "Hemoglobin A1c"        [LOINC]
  unit_concept_id = 8554       → "percent (%)"               [UCUM]
```

＃＃＃２．４． Source Value Preservation (元の値を保持)

OMOP CDM は、標準の概念に加えて **常に元の値を保持します**。

```sql
-- Ví dụ: Bảng CONDITION_OCCURRENCE
condition_concept_id    = 201826        -- Standard Concept (SNOMED)
condition_source_value  = 'E11'         -- Mã gốc ICD-10 từ HIS
condition_source_concept_id = 443238    -- Concept ID của ICD-10 'E11'
```

各概念フィールドの 3 列モデル:

|コラム |説明 |必須 |
|-----|----------|----------|
| `*_concept_id` |標準コンセプト ID (SNOMED、RxNorm...) | ✅ |
| `*_source_value` |テキストとしての元の値 |いいえ |
| `*_source_concept_id` |元のコンセプト ID (語彙に存在する場合) |いいえ |

＃＃＃２．５。ドメインベースのルーティング

各概念は **ドメイン**に属し、ドメインによってレコードがどの **テーブル**に含まれるかが決定されます。

```
  Concept "Type 2 diabetes"
    → Domain = "Condition"
    → Lưu vào CONDITION_OCCURRENCE

  Concept "Metformin 500mg"
    → Domain = "Drug"
    → Lưu vào DRUG_EXPOSURE

  Concept "Hemoglobin A1c"
    → Domain = "Measurement"
    → Lưu vào MEASUREMENT

  Concept "Smoking status"
    → Domain = "Observation"
    → Lưu vào OBSERVATION
```

> **重要な注意:** ソース コードがあるドメインにあるのに、標準コンセプトが別のドメインにある場合があります。例: ICD-10 コード `Z87.891` (ニコチン依存症の歴史) 条件に属しますが、標準概念を観察領域にマップ → テーブルに保存 `OBSERVATION`、そうではありません `CONDITION_OCCURRENCE`。

---

## 3. 一般的な実体関係図

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           HEALTH SYSTEM                                  │
│                                                                          │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────┐                   │
│  │ LOCATION │←───│  CARE_SITE   │───→│   PROVIDER   │                   │
│  │          │    │              │    │              │                   │
│  └────┬─────┘    └──────────────┘    └──────┬───────┘                   │
│       │                                      │                          │
└───────┼──────────────────────────────────────┼──────────────────────────┘
        │                                      │
        ↓                                      ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLINICAL DATA                                  │
│                                                                          │
│  ┌───────────┐       ┌───────────────────┐                              │
│  │  PERSON   │←──────│ OBSERVATION_PERIOD│                              │
│  │           │       └───────────────────┘                              │
│  └─────┬─────┘                                                          │
│        │                                                                 │
│        ├──→ VISIT_OCCURRENCE ──→ VISIT_DETAIL                           │
│        │       │                                                         │
│        │       ├──→ CONDITION_OCCURRENCE                                 │
│        │       ├──→ DRUG_EXPOSURE                                        │
│        │       ├──→ PROCEDURE_OCCURRENCE                                 │
│        │       ├──→ MEASUREMENT                                          │
│        │       ├──→ OBSERVATION                                          │
│        │       ├──→ DEVICE_EXPOSURE                                      │
│        │       ├──→ NOTE ──→ NOTE_NLP                                   │
│        │       └──→ SPECIMEN                                             │
│        │                                                                 │
│        ├──→ DEATH                                                        │
│        ├──→ EPISODE ──→ EPISODE_EVENT                                   │
│        └──→ FACT_RELATIONSHIP                                           │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
        │
        ↓
┌─────────────────────────────────────────────────────────────────────────┐
│  HEALTH ECONOMICS                                                        │
│  PAYER_PLAN_PERIOD ←── PERSON                                           │
│  COST ←── (bất kỳ clinical event nào)                                   │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  DERIVED ELEMENTS                                                        │
│  DRUG_ERA, DOSE_ERA, CONDITION_ERA ←── tính toán từ clinical data       │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  STANDARDIZED VOCABULARIES                                               │
│  CONCEPT ←→ CONCEPT_RELATIONSHIP ←→ CONCEPT_ANCESTOR                   │
│  VOCABULARY, DOMAIN, CONCEPT_CLASS, RELATIONSHIP                        │
│  SOURCE_TO_CONCEPT_MAP, DRUG_STRENGTH, CONCEPT_SYNONYM                 │
│  COHORT, COHORT_DEFINITION                                              │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  METADATA: CDM_SOURCE, METADATA                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. CDM 5.4 の重要な規約

＃＃＃４．１．共通フィールド

ほとんどの臨床テーブルには次のフィールドがあります。

|学校 |タイプ |説明 |
|----------|----------|----------|
| `*_id` (PK) |整数 |主キー、一意 |
| `person_id` (FK) |整数 |人物へのリンク |
| `*_concept_id` |整数 |標準コンセプト ID |
| `*_date` |日付 |イベント日 |
| `*_datetime` |日時 |イベントの日付と時刻 (ある場合) |
| `*_type_concept_id` |整数 |データの出所 (EHR、クレーム、自己申告...) |
| `*_source_value` | VARCHAR(50) |ソース システムからの元の値 |
| `*_source_concept_id` |整数 |オリジナルIDコンセプト |
| `visit_occurrence_id` (FK) |整数 | VISIT_OCCURRENCE へのリンク |
| `provider_id` (FK) |整数 |医師・スタッフ |

＃＃＃４．２．コンセプト ID の規則

|値 |意味 |
|----------|----------|
| `0` |マッピングできません (一致するコンセプトがありません) |
| `> 0` |コンセプトは CONCEPT | で有効です。テーブル
| `NULL` |該当なし、または情報がありません |

＃＃＃４．３．日付/日時の規則

- `*_date` (DATE): **必須** — イベントの日付
- `*_datetime` (DATETIME): **オプション** — 時間がない場合は、設定します `*_datetime = *_date + 00:00:00`
- 終了日: イベントが 1 日の場合、 `end_date = start_date`

＃＃＃４．４．タイプコンセプトの規則

`*_type_concept_id` レコードの**起源**を示します:

|タイプコンセプト ID |意味 |
|-----------------|-----------|
| 32817 | EHR (電子医療記録) |
| 32810 |請求（保険） |
| 32856 |ラボテスト (テスト) |
| 32883 |アンケート（アンケート） |
| 32865 |患者の自己申告 |

---

## 5. CDM 5.4 — 5.3 と比較した新しい点

|変更 |詳細 |
|----------|----------|
| **エピソード表** |病気のエピソードを記録します (例: がん治療ライン 1、2、3) |
| **EPISODE_EVENT テーブル** |臨床事象とエピソードを関連付ける |
| **measurement_event_id** |測定を元のイベントにリンクできるようにします (例: どの標本からの測定)。
| **observation_event_id** |観察も同様 |
| **production_id** (DEVICE_EXPOSURE) |固有のデバイス識別子 (UDI) |
| **数量** (DEVICE_EXPOSURE) |デバイスの数 |

---

## 6. どこから始めればよいでしょうか?

このシリーズを読むためのロードマップ:

```
Bài 1-3: Nền tảng (bạn đang ở đây)
    ↓
Bài 4-6: PERSON → OBSERVATION_PERIOD → VISIT
    ↓        (xây nền móng)
Bài 7-10: CONDITION → DRUG → PROCEDURE → MEASUREMENT
    ↓        (sự kiện lâm sàng chính)
Bài 11-13: OBSERVATION → DEVICE/NOTE/SPECIMEN → DEATH/EPISODE
    ↓        (bảng mở rộng)
Bài 14-16: Vocabulary system
    ↓        (hiểu concept sâu hơn)
Bài 17-19: Health System, Economics, Era tables
    ↓        (hạ tầng & tổng hợp)
Bài 20: Tổng kết & bước tiếp theo
```

---

## 概要

この記事では、次のことを学びました。

1. OMOP CDM 5.4 の **37 テーブル**、**6 つのグループ**に分割
2. **5 つの設計原則**: 個人中心、イベントベース、コンセプト主導、ソース保存、ドメイン ルーティング
3. **一般的な ER 図** — パネルがどのように相互接続されているか
4. **共通規則** — 共通フィールド、概念 ID ルール、日付/日時、型概念
5. **新しい CDM 5.4** — EPISODE、イベントリンケージ、デバイストラッキング

**次の記事:** OMOP CDM の中心である **コンセプト** について、標準とソースのコンセプト、ドメイン、語彙、および Athena の調べ方について詳しく説明します。

---

## 参考文献

- [OMOP CDM 5.4 Specification](https://ohdsi.github.io/CommonDataModel/cdm54.html)
- [CDM 5.4 Changes](https://ohdsi.github.io/CommonDataModel/cdm54Changes.html)
- [The Book of OHDSI — Chapter 4: The Common Data Model](https://ohdsi.github.io/TheBookOfOhdsi/CommonDataModel.html)
