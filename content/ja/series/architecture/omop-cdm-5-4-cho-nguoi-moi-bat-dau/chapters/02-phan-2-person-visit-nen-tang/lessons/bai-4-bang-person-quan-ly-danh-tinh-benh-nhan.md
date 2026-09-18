---
id: 019f1a00-a104-7b01-e001-omopcdm54004
title: 'レッスン 4: PERSON テーブル — 患者 ID 管理'
slug: bai-4-bang-person-quan-ly-danh-tinh-benh-nhan
description: >-
  PERSON テーブル構造、必須フィールド
  (person_id、gender_concept_id、year_of_birth)、人口統計データ、LOCATION および PROVIDER
  とのリンク、ベトナム データの ETL 規約。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 4
section_title: 'パート 2: 人物と訪問 — データ プラットフォーム'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初心者向け OMOP CDM 5.4 — A to Z を理解する
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop04" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop04)"/>
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 4</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">PERSON テーブル — 管理</tspan>
    <tspan x="60" dy="42">患者の身元</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初心者向け OMOP CDM 5.4 — A to Z を理解する</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 2: 人物と訪問 — データ プラットフォーム</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![PERSON — すべての臨床パネルを接続する OMOP CDM の中心](/storage/uploads/2026/04/omop-cdm-bai4-person-centric.webp)

## はじめに

**PERSON** は OMOP CDM 全体の中心テーブルです - すべての臨床テーブルは PERSON を参照します `person_id`。ここに患者の人口統計情報が保存されます。

PERSON の各行 = **一意の患者** (一意の人物)。

---

## 1. PERSON テーブルの構造

＃＃＃１．１．完全な列リスト

|コラム |タイプ |必須 |説明 |
|-----|----------|----------|----------|
| `person_id` |整数 | ✅PK |各患者に固有の ID |
| `gender_concept_id` |整数 | ✅ |ジェンダー（標準コンセプト） |
| `year_of_birth` |整数 | ✅ |誕生年 |
| `month_of_birth` |整数 | |誕生月 |
| `day_of_birth` |整数 | |生年月日 |
| `birth_datetime` |日時 | |完全な生年月日と時刻 |
| `race_concept_id` |整数 | ✅ |レース（スタンダードコンセプト） |
| `ethnicity_concept_id` |整数 | ✅ |エスニシティ（標準コンセプト） |
| `location_id` |整数 | FK |住所 (参照場所) |
| `provider_id` |整数 | FK |主治医 (参照提供者) |
| `care_site_id` |整数 | FK |医療機関（CARE_SITE参照） |
| `person_source_value` | VARCHAR(50) | | HIS からのオリジナルの患者コード |
| `gender_source_value` | VARCHAR(50) | |元の性別 (例: "Nu"、"F") |
| `gender_source_concept_id` |整数 | |オリジナルの性別 ID コンセプト |
| `race_source_value` | VARCHAR(50) | |オリジンレース |
| `race_source_concept_id` |整数 | |オリジンレース ID コンセプト |
| `ethnicity_source_value` | VARCHAR(50) | |民族的起源 |
| `ethnicity_source_concept_id` |整数 | |概念の民族 ID |

＃＃＃１．２．エンティティ関係

```
  ┌──────────────┐       ┌──────────────┐       ┌──────────────┐
  │   LOCATION   │←──────│    PERSON    │──────→│   PROVIDER   │
  │ location_id  │       │  person_id   │       │ provider_id  │
  │ address_1    │       │  gender_*    │       │ provider_name│
  │ city         │       │  birth_*     │       │ specialty_*  │
  │ state        │       │  race_*      │       └──────────────┘
  │ zip          │       │  ethnicity_* │              ↑
  │ country_*    │       │  location_id │              │
  └──────────────┘       │  provider_id │       ┌──────┴───────┐
                         │  care_site_id│──────→│  CARE_SITE   │
                         └──────┬───────┘       │ care_site_id │
                                │               │ care_site_name│
                    ┌───────────┼───────────┐   └──────────────┘
                    ↓           ↓           ↓
             VISIT_OCC.    CONDITION    DRUG_EXPOSURE
             OBSERVATION   MEASUREMENT  ... (tất cả clinical)
```

---

## 2. 重要なフィールドの詳細

＃＃＃２．１． person_id

- **タイプ**: INTEGER、主キー
- **ルール**: 固有、変更なし、臨床的意義なし
- **ではありません** 元の患者コード (元の患者コードは、 `person_source_value`）

```sql
-- ĐÚNG: person_id là số tự tăng hoặc hash
person_id = 100001
person_source_value = 'BN-2024-00123'  -- Mã gốc từ HIS

-- SAI: Không dùng mã gốc làm person_id
-- person_id = 'BN-2024-00123'  ← SAI (phải là INTEGER)
```

＃＃＃２．２．ジェンダーコンセプトID

|コンセプトID |コンセプト名 |説明 |
|----------|--------------|------|
| 8507 |男性 |男性 |
| 8532 |女性 |女性 |
| 8551 |不明 |不明 |
| 8521 |その他 |その他 |

```sql
-- Ví dụ ETL cho dữ liệu Việt Nam
CASE
    WHEN gioi_tinh IN ('Nam', 'M', '1') THEN 8507    -- Male
    WHEN gioi_tinh IN ('Nữ', 'Nu', 'F', '2') THEN 8532  -- Female
    ELSE 8551  -- UNKNOWN
END AS gender_concept_id,
gioi_tinh AS gender_source_value
```

＃＃＃２．３．誕生年、誕生月、誕生日

- `year_of_birth`: **必須** — 存在しない場合は、患者をロードしません。
- `month_of_birth`、 `day_of_birth`: オプション — 存在しない場合は NULL を設定します
- `birth_datetime`: オプション — 小児科に役立ちます (正確な年齢計算)

```sql
-- Ví dụ: BN sinh ngày 15/03/1980
year_of_birth  = 1980
month_of_birth = 3
day_of_birth   = 15
birth_datetime = '1980-03-15 00:00:00'
```

＃＃＃２．４． Race_concept_id と民族性_concept_id

これらは、米国国勢調査の基準によると 2 つの学校です。ベトナムのデータの場合:

|学校 |ベトナムのおすすめ |
|------|------|
| `race_concept_id` | 8515 (アジア) |
| `race_source_value` | 「キン」、「タイ」、「ムオン」... |
| `ethnicity_concept_id` | 0 (一致する概念なし) |
| `ethnicity_source_value` |民族的出身があれば記録する |

> **注:** `race` そして `ethnicity` 米国規格 (OMB) に準拠した OMOP で。 ETL VN データの場合、値を設定する必要がありますが (マップできない場合は 0 を使用します)、元の情報は保持されます。 `*_source_value`。

---

## 3. 実際の例

＃＃＃３．１．ベトナム人患者

```sql
INSERT INTO person VALUES (
    100001,                    -- person_id
    8532,                      -- gender_concept_id (Female)
    1980,                      -- year_of_birth
    3,                         -- month_of_birth
    15,                        -- day_of_birth
    '1980-03-15 00:00:00',     -- birth_datetime
    8515,                      -- race_concept_id (Asian)
    0,                         -- ethnicity_concept_id (N/A)
    1001,                      -- location_id (→ LOCATION table)
    5001,                      -- provider_id (→ PROVIDER table)
    2001,                      -- care_site_id (→ CARE_SITE table)
    'BN-2024-00123',           -- person_source_value
    'Nữ',                      -- gender_source_value
    0,                         -- gender_source_concept_id
    'Kinh',                    -- race_source_value
    0,                         -- race_source_concept_id
    NULL,                      -- ethnicity_source_value
    0                          -- ethnicity_source_concept_id
);
```

＃＃＃３．２．基本的な SQL クエリ

```sql
-- Đếm bệnh nhân theo giới tính
SELECT
    c.concept_name AS gender,
    COUNT(*) AS patient_count
FROM person p
JOIN concept c ON p.gender_concept_id = c.concept_id
GROUP BY c.concept_name;

-- Phân bố tuổi
SELECT
    EXTRACT(YEAR FROM CURRENT_DATE) - year_of_birth AS age,
    COUNT(*) AS count
FROM person
GROUP BY 1
ORDER BY 1;

-- Tìm bệnh nhân có dữ liệu gốc
SELECT
    person_id,
    person_source_value AS ma_bn_goc,
    gender_source_value AS gioi_tinh_goc,
    race_source_value AS dan_toc
FROM person
WHERE person_source_value IS NOT NULL
LIMIT 10;
```

---

## 4. ETL 規約

＃＃＃４．１．重要なルール

|ルール |詳細 |
|----------|----------|
| **1 人 = 1 レコード** |重複はありません。重複排除が必要です。
| **誕生年は必須です** |誕生年がない場合は患者を無視する |
| **gender_concept_id が必要です** |不明な場合は 8551 (UNKNOWN) を入力します。
| **person_id には意味がありません** |オリジナルの患者コードや ID カード/CCCD は使用しないでください。
| **PII を直接保存しません** | PERSON | には名前、ID カード、または電話番号の列はありません。

＃＃＃４．２．匿名化

OMOP CDM **には、名前、ID/CCCD 番号、電話番号の列はありません**。これは意図的なデザインです:

```
  HIS gốc (có PII):                    OMOP CDM (de-identified):
  ┌─────────────────────────┐          ┌──────────────────────────┐
  │ ma_bn: BN-2024-00123    │    →     │ person_id: 100001        │
  │ ho_ten: Nguyễn Thị Lan  │    →     │ (không có cột tên!)      │
  │ cmnd: 079123456789      │    →     │ (không có cột CMND!)     │
  │ sdt: 0901234567         │    →     │ (không có cột SĐT!)     │
  │ ngay_sinh: 15/03/1980   │    →     │ year_of_birth: 1980      │
  │ gioi_tinh: Nữ           │    →     │ gender_concept_id: 8532  │
  └─────────────────────────┘          └──────────────────────────┘
```

> **注:** `person_source_value` 元の患者コード（追跡用）が含まれる場合があります。組織によっては、この値はハッシュ化または暗号化される場合があります。

＃＃＃４．３．重複の処理

患者が複数のシステムに 2 つ以上のコードを持っている場合:

```
  HIS BV Chợ Rẫy: BN-CR-001   ┐
  HIS BV Bạch Mai: BN-BM-555   ├──→ person_id = 100001
  BHXH: DN-7900123456789        ┘    (1 person duy nhất)
```

ETL は、PERSON にロードする前に **Patient Matching** (患者のマッチング) を実行する必要があります。

---

## 5. 他のテーブルとの関係

```sql
-- Tất cả dữ liệu lâm sàng của 1 bệnh nhân
SELECT 'Visits' AS data_type, COUNT(*) AS count
FROM visit_occurrence WHERE person_id = 100001
UNION ALL
SELECT 'Conditions', COUNT(*)
FROM condition_occurrence WHERE person_id = 100001
UNION ALL
SELECT 'Drugs', COUNT(*)
FROM drug_exposure WHERE person_id = 100001
UNION ALL
SELECT 'Measurements', COUNT(*)
FROM measurement WHERE person_id = 100001
UNION ALL
SELECT 'Observations', COUNT(*)
FROM observation WHERE person_id = 100001;
```

---

## 6. 一般的な ETL エラー

|エラー |結果 |修正方法 |
|-----|----------|------|
| person_id が重複しています |データを上書きする |一意の制約を確認する |
|誕生年 = NULL | NOT NULL | の違反無視または代入する |
| gender_concept_id が間違っています |ミスジェンダー分析 |正確なマッピング |
| PII をsource_value に入力します |匿名化の違反 |ハッシュまたは削除 |
|重複しないでください | 1人の患者が多くの人になる | ETL 前の患者マッチング |

---

## 概要

1. **PERSON** は中央テーブルです - すべての臨床テーブルが参照されます `person_id`
2. **必須フィールド**: person_id、gender_concept_id、year_of_birth、race_concept_id、esnicity_concept_id
3. **PII は含まれません** (名前、ID カード、電話番号) — 匿名化されたデザイン
4. **リンク**: LOCATION (住所)、CARE_SITE (施設)、PROVIDER (主治医)
5. **ETL VN**: 性別マッピング、人種 = アジア人 (8515)、民族 = 0

**次の記事:** OBSERVATION_PERIOD — 「監視期間」を知ることが重要な理由と、それがすべての分析にどのような影響を与えるか。

---

## 参考文献

- [OMOP CDM 5.4 — PERSON](https://ohdsi.github.io/CommonDataModel/cdm54.html#PERSON)
- [The Book of OHDSI — Chapter 4.1](https://ohdsi.github.io/TheBookOfOhdsi/CommonDataModel.html)
