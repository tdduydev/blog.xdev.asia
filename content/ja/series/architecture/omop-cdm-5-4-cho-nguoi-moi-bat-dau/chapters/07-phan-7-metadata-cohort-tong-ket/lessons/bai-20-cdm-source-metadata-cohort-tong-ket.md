---
id: 019f1a00-a120-7b01-e001-omopcdm54020
title: 'レッスン 20: CDM_SOURCE、METADATA、COHORT、および OMOP CDM 5.4 全体の概要'
slug: bai-20-cdm-source-metadata-cohort-tong-ket
description: >-
  テーブル CDM_SOURCE はデータ ソースを記述し、METADATA は追加情報を保存し、COHORT は研究グループを管理します。 37 個の
  OMOP CDM 5.4 テーブルすべての概要と次のロードマップ。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 20
section_title: 'パート 7: メタデータ、コホート、概要'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初心者向け OMOP CDM 5.4 — A to Z を理解する
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop20" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop20)"/>
  <g>
    <circle cx="700" cy="90" r="24" fill="#818cf8" opacity="0.12"/>
    <circle cx="800" cy="120" r="20" fill="#818cf8" opacity="0.08"/>
    <circle cx="880" cy="80" r="18" fill="#818cf8" opacity="0.07"/>
    <circle cx="950" cy="140" r="16" fill="#818cf8" opacity="0.06"/>
    <line x1="640" y1="160" x2="1100" y2="250" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="130" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 20</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">CDM_SOURCE、メタデータ、</tspan>
    <tspan x="60" dy="42">コホートと OMOP の概要 5.4</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初心者向け OMOP CDM 5.4 — A to Z を理解する</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 7: メタデータ、コホート、概要</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![OMOP CDM 5.4 の完全な概要 — 37 テーブル、7 グループ](/storage/uploads/2026/04/omop-cdm-bai20-complete-overview.webp)

## はじめに

シリーズ最終投稿！ **メタデータ** グループ (CDM_SOURCE、METADATA) と **COHORT** (研究グループ管理テーブル) について学びます。次に、37 以上の OMOP CDM 5.4 テーブルとさらなる学習ロードマップをすべて要約します。

---

## 1. CDM_SOURCE — データソース情報

＃＃＃１．１．テーブル構造

|コラム |タイプ |必須 |説明 |
|-----|----------|----------|----------|
| `cdm_source_name` | VARCHAR(255) | ✅ |データソース名 |
| `cdm_source_abbreviation` | VARCHAR(25) | ✅ |略称 |
| `cdm_holder` | VARCHAR(255) | |所有組織 |
| `source_description` |クロブ | |詳細な説明 |
| `source_documentation_reference` | VARCHAR(255) | |ドキュメントの URL |
| `cdm_etl_reference` | VARCHAR(255) | | URL ETL ドキュメント |
| `source_release_date` |日付 | |データ公開日 |
| `cdm_release_date` |日付 | | CDM 変換日 |
| `cdm_version` | VARCHAR(10) | | CDM バージョン (v5.4) |
| `cdm_version_concept_id` |整数 | | FK → コンセプト |
| `vocabulary_version` | VARCHAR(20) | |語彙バージョン |

＃＃＃１．２．ベトナムのデータ例

```sql
INSERT INTO cdm_source (
    cdm_source_name,
    cdm_source_abbreviation,
    cdm_holder,
    source_description,
    cdm_etl_reference,
    source_release_date,
    cdm_release_date,
    cdm_version,
    cdm_version_concept_id,
    vocabulary_version
) VALUES (
    'Bệnh viện Bạch Mai - Hệ thống HIS',
    'BACHMAI_HIS',
    'Bệnh viện Bạch Mai',
    'Dữ liệu EMR từ hệ thống HIS Bệnh viện Bạch Mai, '
    || 'bao gồm khám ngoại trú và nội trú từ 2020-2024. '
    || 'Chuyển đổi theo OMOP CDM 5.4 phục vụ nghiên cứu '
    || 'dịch tễ học lâm sàng.',
    'https://github.com/bachmai-etl/omop-cdm',
    '2024-06-30',       -- Ngày xuất dữ liệu nguồn
    '2024-09-15',       -- Ngày hoàn tất ETL
    'v5.4',
    756265,             -- CDM v5.4 concept_id
    'v5.0 30-AUG-24'   -- Vocabulary version từ Athena
);
```

＃＃＃１．３． CDM_SOURCE が重要なのはなぜですか?

- **トレーサビリティ**: データがどこから来たのか、ETL がいつなのかを知る
- **ネットワーク調査**: サイト間の結果を比較
- **再現性**: 研究結果を再現します。
- **コンプライアンス**: コンプライアンス監査

---

## 2. メタデータ — 追加情報

＃＃＃２．１．テーブル構造

|コラム |タイプ |必須 |説明 |
|-----|----------|----------|----------|
| `metadata_id` |整数 | ✅PK |固有の ID |
| `metadata_concept_id` |整数 | ✅ |タイプメタデータ (FK → CONCEPT) |
| `metadata_type_concept_id` |整数 | ✅ |タイプメタデータ |
| `name` | VARCHAR(250) | ✅ |キー名 |
| `value_as_string` | VARCHAR(250) | |テキスト値 |
| `value_as_concept_id` |整数 | |コンセプトバリュー |
| `value_as_number` |フロート | |数値 |
| `metadata_date` |日付 | |記録日 |
| `metadata_datetime` |日時 | |記録日時 |

＃＃＃２．２．使用例

```sql
-- Ghi nhận thông tin ETL
INSERT INTO metadata VALUES (1, 0, 0, 'ETL_TOOL', 'WhiteRabbit + RabbitInAHat', NULL, NULL, '2024-09-15', NULL);
INSERT INTO metadata VALUES (2, 0, 0, 'ETL_VERSION', '1.2.0', NULL, NULL, '2024-09-15', NULL);
INSERT INTO metadata VALUES (3, 0, 0, 'SOURCE_PATIENT_COUNT', NULL, NULL, 125000, '2024-09-15', NULL);
INSERT INTO metadata VALUES (4, 0, 0, 'CDM_PATIENT_COUNT', NULL, NULL, 118500, '2024-09-15', NULL);
INSERT INTO metadata VALUES (5, 0, 0, 'MAPPING_COVERAGE_PCT', NULL, NULL, 94.8, '2024-09-15', NULL);
INSERT INTO metadata VALUES (6, 0, 0, 'COUNTRY', 'Vietnam', NULL, NULL, '2024-09-15', NULL);
```

> METADATA は柔軟なキーと値のテーブルであり、CDM_SOURCE に収まらない情報を保存するために使用されます。

---

## 3. コホート — 研究チーム

＃＃＃３．１．テーブル構造

|コラム |タイプ |必須 |説明 |
|-----|----------|----------|----------|
| `cohort_definition_id` |整数 | ✅ | FK → COHORT_DEFINITION |
| `subject_id` |整数 | ✅ |エンティティ ID (通常 = person_id) |
| `cohort_start_date` |日付 | ✅ |コホート登録日 |
| `cohort_end_date` |日付 | ✅ |コホートのリリース日 |

＃＃＃３．２． COHORT_DEFINITION (レッスン 16 を思い出してください)

|コラム |タイプ |説明 |
|-----|--------|------|
| `cohort_definition_id` |整数 PK |定義ID |
| `cohort_definition_name` | VARCHAR(255) |コホート名 |
| `cohort_definition_description` |クロブ |説明 |
| `definition_type_concept_id` |整数 |タイプ |
| `cohort_definition_syntax` |クロブ |コホートを作成するロジック |
| `subject_concept_id` |整数 |オブジェクト |
| `cohort_initiation_date` |日付 |作成日 |

＃＃＃３．３．使用方法: 2 型糖尿病コホートを作成する

```sql
-- Bước 1: Định nghĩa cohort
INSERT INTO cohort_definition (
    cohort_definition_id,
    cohort_definition_name,
    cohort_definition_description,
    definition_type_concept_id,
    cohort_definition_syntax,
    subject_concept_id,
    cohort_initiation_date
) VALUES (
    101,
    'Tiểu đường Type 2 mới phát hiện 2023',
    'BN có chẩn đoán T2DM lần đầu trong 2023, '
    || 'có ít nhất 365 ngày observation trước đó, '
    || 'không có T1DM.',
    0,
    '{
        "PrimaryCriteria": {
            "CriteriaList": [{
                "ConditionOccurrence": {
                    "CodesetId": 201826
                }
            }],
            "ObservationWindow": {"PriorDays": 365}
        },
        "ExclusionCriteria": [{
            "ConditionOccurrence": {
                "CodesetId": 201254
            }
        }]
    }',
    0,
    '2024-09-15'
);

-- Bước 2: Populate cohort
INSERT INTO cohort (
    cohort_definition_id,
    subject_id,
    cohort_start_date,
    cohort_end_date
)
SELECT
    101 AS cohort_definition_id,
    co.person_id AS subject_id,
    MIN(co.condition_start_date) AS cohort_start_date,
    COALESCE(
        (SELECT MAX(op.observation_period_end_date)
         FROM observation_period op
         WHERE op.person_id = co.person_id),
        MIN(co.condition_start_date)
    ) AS cohort_end_date
FROM condition_occurrence co
JOIN concept_ancestor ca
    ON co.condition_concept_id = ca.descendant_concept_id
WHERE ca.ancestor_concept_id = 201826  -- Type 2 DM
  AND co.condition_start_date BETWEEN '2023-01-01' AND '2023-12-31'
  -- Phải có 365 ngày observation trước
  AND EXISTS (
      SELECT 1 FROM observation_period op
      WHERE op.person_id = co.person_id
        AND op.observation_period_start_date
            <= co.condition_start_date - INTERVAL '365 days'
  )
  -- Loại trừ T1DM
  AND NOT EXISTS (
      SELECT 1 FROM condition_occurrence co2
      JOIN concept_ancestor ca2
          ON co2.condition_concept_id = ca2.descendant_concept_id
      WHERE ca2.ancestor_concept_id = 201254  -- Type 1 DM
        AND co2.person_id = co.person_id
        AND co2.condition_start_date <= co.condition_start_date
  )
GROUP BY co.person_id;
```

＃＃＃３．４．コホートの分析

```sql
-- Tổng quan cohort T2DM 2023
SELECT
    cd.cohort_definition_name,
    COUNT(DISTINCT c.subject_id) AS patient_count,
    AVG(p.year_of_birth) AS avg_birth_year,
    ROUND(
        SUM(CASE WHEN p.gender_concept_id = 8507 THEN 1 ELSE 0 END)
        * 100.0 / COUNT(*), 1
    ) AS male_pct
FROM cohort c
JOIN cohort_definition cd
    ON c.cohort_definition_id = cd.cohort_definition_id
JOIN person p ON c.subject_id = p.person_id
WHERE c.cohort_definition_id = 101
GROUP BY cd.cohort_definition_name;
```

---

## 4. OMOP CDM 5.4 全体の概要

＃＃＃４．１． 37 以上のボードのグループ別リスト

```
  ╔═══════════════════════════════════════════════════╗
  ║            OMOP CDM 5.4 — 37+ Bảng               ║
  ╠═══════════════════════════════════════════════════╣
  ║                                                   ║
  ║  ▎ CLINICAL DATA (16 bảng)                        ║
  ║  ├── PERSON                    Bài 4              ║
  ║  ├── OBSERVATION_PERIOD        Bài 5              ║
  ║  ├── VISIT_OCCURRENCE          Bài 6              ║
  ║  ├── VISIT_DETAIL              Bài 6              ║
  ║  ├── CONDITION_OCCURRENCE      Bài 7              ║
  ║  ├── DRUG_EXPOSURE             Bài 8              ║
  ║  ├── PROCEDURE_OCCURRENCE      Bài 9              ║
  ║  ├── MEASUREMENT               Bài 10             ║
  ║  ├── OBSERVATION               Bài 11             ║
  ║  ├── DEVICE_EXPOSURE           Bài 12             ║
  ║  ├── SPECIMEN                  Bài 12             ║
  ║  ├── NOTE                      Bài 12             ║
  ║  ├── NOTE_NLP                  Bài 12             ║
  ║  ├── DEATH                     Bài 13             ║
  ║  ├── EPISODE                   Bài 13 (CDM 5.4)  ║
  ║  └── EPISODE_EVENT             Bài 13 (CDM 5.4)  ║
  ║                                                   ║
  ║  ▎ HEALTH SYSTEM DATA (3 bảng)                    ║
  ║  ├── LOCATION                  Bài 17             ║
  ║  ├── CARE_SITE                 Bài 17             ║
  ║  └── PROVIDER                  Bài 17             ║
  ║                                                   ║
  ║  ▎ HEALTH ECONOMICS DATA (2 bảng)                 ║
  ║  ├── PAYER_PLAN_PERIOD         Bài 18             ║
  ║  └── COST                      Bài 18             ║
  ║                                                   ║
  ║  ▎ STANDARDIZED VOCABULARIES (12 bảng)            ║
  ║  ├── CONCEPT                   Bài 3, 14          ║
  ║  ├── VOCABULARY                Bài 14             ║
  ║  ├── DOMAIN                    Bài 14             ║
  ║  ├── CONCEPT_CLASS             Bài 14             ║
  ║  ├── CONCEPT_RELATIONSHIP      Bài 15             ║
  ║  ├── RELATIONSHIP              Bài 15             ║
  ║  ├── CONCEPT_SYNONYM           Bài 15             ║
  ║  ├── CONCEPT_ANCESTOR          Bài 15             ║
  ║  ├── SOURCE_TO_CONCEPT_MAP     Bài 15             ║
  ║  ├── DRUG_STRENGTH             Bài 16             ║
  ║  ├── COHORT_DEFINITION         Bài 16, 20         ║
  ║  └── ATTRIBUTE_DEFINITION      Bài 16             ║
  ║                                                   ║
  ║  ▎ DERIVED ELEMENTS (3 bảng)                      ║
  ║  ├── CONDITION_ERA             Bài 19             ║
  ║  ├── DRUG_ERA                  Bài 19             ║
  ║  └── DOSE_ERA                  Bài 19             ║
  ║                                                   ║
  ║  ▎ METADATA (2 bảng)                              ║
  ║  ├── CDM_SOURCE                Bài 20             ║
  ║  └── METADATA                  Bài 20             ║
  ║                                                   ║
  ║  ▎ COHORT (1 bảng)                                ║
  ║  └── COHORT                    Bài 20             ║
  ║                                                   ║
  ╚═══════════════════════════════════════════════════╝
```

＃＃＃４．２． 5 つの設計原則 (繰り返し)

| # |原則 |意味 |
|---|-----------|------|
| 1 | **個人中心** | PERSON | に関するすべてのデータ
| 2 | **観察期間** |追跡期間中のみの分析 |
| 3 | **標準コンセプト** |語彙による標準化されたコード |
| 4 | **ドメインルーティング** |データはドメインに従ってテーブルに入力されます |
| 5 | **ソース値は保持されます** |元のソース コードをそのまま保持します |

＃＃＃４．３． CDM 5.4 — 重要な変更点 (5.3 と比較)

|変更 |詳細 |
|----------|----------|
| **エピソード / エピソード_イベント** |腫瘍学用の新しいテーブル |
| **measurement_event_id** | MEASUREMENT | ポリモーフィック FK
| **observation_event_id** | OBSERVATION におけるポリモーフィック FK |
| **手続き終了日/日時** |手順の終了日を追加 |
| **unit_source_concept_id** |測定値に追加 |
| **production_id** | DEVICE_EXPOSURE (UDI) を追加 |

---

## 5. データ品質チェック (DQD)

＃＃＃５．１． OHDSI データ品質ダッシュボード

```
  ┌──────────────────────────────────────────┐
  │         Data Quality Dashboard (DQD)      │
  │                                           │
  │  Kiểm tra 3500+ rules:                   │
  │                                           │
  │  1. Completeness  — Đầy đủ               │
  │     Bao nhiêu % records có concept != 0?  │
  │                                           │
  │  2. Conformance   — Tuân thủ              │
  │     Giá trị có hợp lệ? (date, range)     │
  │                                           │
  │  3. Plausibility  — Hợp lý               │
  │     Trẻ 5 tuổi có chẩn đoán Alzheimer?   │
  │                                           │
  │  Output: Bảng báo cáo PASS/FAIL          │
  │          cho từng rule                     │
  └──────────────────────────────────────────┘
```

＃＃＃５．２． SQLを使ったクイックチェック

```sql
-- Mapping completeness: % records có concept_id != 0
SELECT
    'condition_occurrence' AS table_name,
    COUNT(*) AS total,
    SUM(CASE WHEN condition_concept_id = 0 THEN 1 ELSE 0 END) AS unmapped,
    ROUND(
        SUM(CASE WHEN condition_concept_id != 0 THEN 1 ELSE 0 END)
        * 100.0 / COUNT(*), 1
    ) AS mapped_pct
FROM condition_occurrence

UNION ALL

SELECT 'drug_exposure', COUNT(*),
    SUM(CASE WHEN drug_concept_id = 0 THEN 1 ELSE 0 END),
    ROUND(SUM(CASE WHEN drug_concept_id != 0 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1)
FROM drug_exposure

UNION ALL

SELECT 'procedure_occurrence', COUNT(*),
    SUM(CASE WHEN procedure_concept_id = 0 THEN 1 ELSE 0 END),
    ROUND(SUM(CASE WHEN procedure_concept_id != 0 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1)
FROM procedure_occurrence

UNION ALL

SELECT 'measurement', COUNT(*),
    SUM(CASE WHEN measurement_concept_id = 0 THEN 1 ELSE 0 END),
    ROUND(SUM(CASE WHEN measurement_concept_id != 0 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1)
FROM measurement;
```

```sql
-- Kiểm tra orphan records
-- (records không có observation_period tương ứng)
SELECT 'condition_occurrence' AS src, COUNT(*) AS orphan_count
FROM condition_occurrence co
WHERE NOT EXISTS (
    SELECT 1 FROM observation_period op
    WHERE op.person_id = co.person_id
      AND co.condition_start_date BETWEEN
          op.observation_period_start_date
          AND op.observation_period_end_date
)

UNION ALL

SELECT 'drug_exposure', COUNT(*)
FROM drug_exposure de
WHERE NOT EXISTS (
    SELECT 1 FROM observation_period op
    WHERE op.person_id = de.person_id
      AND de.drug_exposure_start_date BETWEEN
          op.observation_period_start_date
          AND op.observation_period_end_date
);
```

---

## 6. OHDSI ツールのエコシステム

|ツール |役割 |
|----------|----------|
| **ホワイトラビット** |ソースデータをスキャン |
| **ウサギの帽子** | ETL マッピングを設計する |
| **うさぎ** |ソースコードマップ → 標準コンセプト |
| **アテナ** |語彙のダウンロード/検索 |
| **アトラス** |コホートの作成、分析、特徴付け |
| **WebAPI** | ATLAS 用バックエンド API |
| **アキレス** |データベースプロファイリングと DQD |
| **ハデス** |研究用 R パッケージ (PLE、PLP) |
| **データ品質ダッシュボード** |データ品質をチェックする |

---

## 7. 次のルート

```
  Bạn đã hoàn thành ✅
  ──────────────────────────────────
  OMOP CDM 5.4 — 37+ bảng, 7 nhóm
  ETL concepts, Vocabulary system
  VN-specific mapping patterns

  Bước tiếp theo 📘
  ──────────────────────────────────
  1. Thực hành ETL
     → Dùng WhiteRabbit + RabbitInAHat
     → Chuyển 1 bộ dữ liệu nhỏ sang OMOP

  2. ATLAS & Cohort Building
     → Cài ATLAS + WebAPI
     → Tạo cohort definitions UI

  3. Achilles + DQD
     → Chạy database profiling
     → Kiểm tra chất lượng dữ liệu

  4. Nghiên cứu với HADES
     → Population Level Estimation
     → Patient Level Prediction
     → Characterization

  5. Tham gia cộng đồng OHDSI
     → forums.ohdsi.org
     → OHDSI Symposium hàng năm
     → Study-a-thon
```

---

## 概要

1. **CDM_SOURCE**: データ ソース、CDM、および語彙のバージョンに関するメタデータ
2. **METADATA**: キーと値のテーブルには追加情報 (ETL ツール、カバレッジなど) が格納されます。
3. **COHORT + COHORT_DEFINITION**: 研究チームの管理、ATLAS の基盤
4. **OMOP CDM 5.4** には **7 つのグループ**に **37 以上のテーブル**が含まれており、すべて PERSON を中心に展開します
5. **新しい CDM 5.4**: EPISODE/EPISODE_EVENT、ポリモーフィック FK、procedure_end_date

**OMOP CDM 5.4 for Beginners** シリーズの完了おめでとうございます。ここから、国際標準に従ってベトナムの医療データの ETL に着手するための強固な基盤が得られます。

---

## 参考文献

- [OMOP CDM 5.4 — CDM_SOURCE](https://ohdsi.github.io/CommonDataModel/cdm54.html#CDM_SOURCE)
- [OMOP CDM 5.4 — METADATA](https://ohdsi.github.io/CommonDataModel/cdm54.html#METADATA)
- [OMOP CDM 5.4 — COHORT](https://ohdsi.github.io/CommonDataModel/cdm54.html#COHORT)
- [Book of OHDSI](https://ohdsi.github.io/TheBookOfOhdsi/)
- [OHDSI Data Quality Dashboard](https://github.com/OHDSI/DataQualityDashboard)
- [OHDSI Tools](https://www.ohdsi.org/software-tools/)
- [OHDSI Forums](https://forums.ohdsi.org/)
