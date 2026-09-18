---
id: 019f1a00-a117-7b01-e001-omopcdm54017
title: 'レッスン 17: LOCATION、CARE_SITE、PROVIDER — 医療施設システム'
slug: bai-17-location-care-site-provider
description: >-
  3 つの医療システム データ テーブル: LOCATION (地理)、CARE_SITE (医療施設)、PROVIDER
  (医師、医療スタッフ)、およびそれらが臨床データにリンクする方法。
duration_minutes: 45
is_free: true
video_url: null
sort_order: 17
section_title: 'パート 6: 医療システム、経済および派生要素'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初心者向け OMOP CDM 5.4 — A to Z を理解する
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop17" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop17)"/>
  <g>
    <circle cx="750" cy="80" r="24" fill="#818cf8" opacity="0.12"/>
    <circle cx="850" cy="120" r="20" fill="#818cf8" opacity="0.08"/>
    <circle cx="680" cy="150" r="18" fill="#818cf8" opacity="0.07"/>
    <line x1="600" y1="100" x2="1100" y2="260" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="130" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 17</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">場所、ケアサイト、および</tspan>
    <tspan x="60" dy="42">プロバイダー — 医療施設システム</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初心者向け OMOP CDM 5.4 — A to Z を理解する</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 6: 医療システム、経済および派生要素</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![医療システムの階層: 場所 → ケアサイト → プロバイダー](/storage/uploads/2026/04/omop-cdm-bai17-health-system.webp)

## はじめに

**医療システム データ** グループには、医療サービスを *どこ* と *誰* が提供するかを説明する 3 つのテーブルが含まれています。ベトナムの病院では、医療施設（中央、省、地区）、診療科、担当医師の情報がここに保管されています。

---

## 1. 場所 — 地理的位置

＃＃＃１．１．テーブル構造

|コラム |タイプ |必須 |説明 |
|-----|----------|----------|----------|
| `location_id` |整数 | ✅PK |固有の ID |
| `address_1` | VARCHAR(50) | |住所行 1 |
| `address_2` | VARCHAR(50) | |行 2 のアドレス |
| `city` | VARCHAR(50) | |市 / 地区 / 地区 |
| `state` | VARCHAR(2) | |州/県 (米国: 2 文字) |
| `zip` | VARCHAR(9) | |郵便番号 |
| `county` | VARCHAR(20) | |郡 |
| `location_source_value` | VARCHAR(50) | |ソースコード |
| `country_concept_id` |整数 | | FK → CONCEPT (国) |
| `country_source_value` | VARCHAR(80) | |ソース国コード |
| `latitude` |フロート | |緯度 |
| `longitude` |フロート | |経度 |

＃＃＃１．２．ベトナム向けETL

```sql
INSERT INTO location (
    location_id,
    address_1,
    city,
    state,
    zip,
    country_concept_id,
    country_source_value,
    latitude,
    longitude
) VALUES (
    1001,
    '78 Giải Phóng',
    'Hai Bà Trưng',
    'HN',            -- Mã tỉnh 2 ký tự
    '100000',        -- Mã bưu điện VN
    4330442,         -- concept_id cho 'Viet Nam'
    'VN',
    21.0024,         -- Latitude
    105.8432         -- Longitude
);
```

> **VN に注意してください:** 学校 `state` 2 文字のみ - 短縮された州コード (HN、HCM、DN...) を使用します。
> 完全なものが必要な場合は、使用します `location_source_value` 「ハノイ」を救え。

---

## 2. CARE_SITE — 健康診断および治療施設

＃＃＃２．１．テーブル構造

|コラム |タイプ |必須 |説明 |
|-----|----------|----------|----------|
| `care_site_id` |整数 | ✅PK |固有の ID |
| `care_site_name` | VARCHAR(255) | |施設名 |
| `place_of_service_concept_id` |整数 | |施設タイプ（FK→CONCEPT） |
| `location_id` |整数 | | FK → 場所 |
| `care_site_source_value` | VARCHAR(50) | |ソースコード |
| `place_of_service_source_value` | VARCHAR(50) | |ソースタイプコード |

＃＃＃２．２．医療機関の種類 (place_of_service_concept_id)

|コンセプトID |コンセプト名 | VN の例 |
|---------------|---------------|----------|
| 8717 |入院病院 |内科 |
| 8756 |外来病院 |外来診療 |
| 8940 |オフィス |プライベートクリニック |
| 8883 |介護施設 | 介護施設介護施設 |
| 8716 |ホームヘルスエージェンシー |ホームケア |
| 8761 |緊急治療室 |救急部門 |
| 581382 |遠隔医療 |遠隔診察 |

＃＃＃２．３．ベトナムの病院データからの ETL の例

```sql
-- Bệnh viện Bạch Mai
INSERT INTO care_site VALUES (
    2001,                        -- care_site_id
    'Bệnh viện Bạch Mai',       -- care_site_name
    8717,                        -- Inpatient Hospital
    1001,                        -- location_id (78 GP, HBT)
    'BV-BACHMAI-001',            -- care_site_source_value
    'TUYEN_TW'                   -- place_of_service_source_value
);

-- Khoa Nội tiêu hóa - Bạch Mai
INSERT INTO care_site VALUES (
    2002,
    'Khoa Nội Tiêu hóa - BV Bạch Mai',
    8756,                        -- Outpatient Hospital
    1001,                        -- cùng location
    'BV-BM-NOI-TIEUHOA',
    'KHOA_NOITRU'
);
```

＃＃＃２．４．ベトナム分散型モデル

```
  CARE_SITE (Tuyến TW)
  ├── BV Bạch Mai (care_site_id = 2001)
  │   ├── Khoa Nội Tiêu hóa (2002)
  │   ├── Khoa Tim mạch (2003)
  │   └── Khoa Cấp cứu (2004)
  │
  CARE_SITE (Tuyến Tỉnh)
  ├── BV Đa khoa Hà Nội (2010)
  │   ├── Khoa Ngoại (2011)
  │   └── Khoa Sản (2012)
  │
  CARE_SITE (Tuyến Huyện)
  └── TTYT Hoàng Mai (2020)
      └── Phòng khám đa khoa (2021)
```

> **注意:** OMOP CDM には CARE_SITE の親子構造がありません。階層が必要な場合は、命名規則を使用するか、別のマッピング テーブルを追加します。

---

## 3. 提供者 — 医療スタッフ

＃＃＃３．１．テーブル構造

|コラム |タイプ |必須 |説明 |
|-----|----------|----------|----------|
| `provider_id` |整数 | ✅PK |固有の ID |
| `provider_name` | VARCHAR(255) | |名前 (匿名化を推奨) |
| `npi` | VARCHAR(20) | |国内プロバイダー識別子 (米国) |
| `dea` | VARCHAR(20) | | DEA 番号 (米国) |
| `specialty_concept_id` |整数 | |専門（FK→CONCEPT） |
| `care_site_id` |整数 | | FK → CARE_SITE |
| `year_of_birth` |整数 | |誕生年 |
| `gender_concept_id` |整数 | |性別 |
| `provider_source_value` | VARCHAR(50) | |ソースコード |
| `specialty_source_value` | VARCHAR(50) | |ソース特殊コード |
| `specialty_source_concept_id` |整数 | | FK → コンセプト |
| `gender_source_value` | VARCHAR(50) | |ソースの性別 |
| `gender_source_concept_id` |整数 | | FK → コンセプト |

＃＃＃３．２． OMOPの専門分野

```sql
-- Tìm specialty concepts phổ biến
SELECT
    c.concept_id,
    c.concept_name,
    c.vocabulary_id
FROM concept c
WHERE c.domain_id = 'Provider'
  AND c.standard_concept = 'S'
  AND c.concept_name LIKE '%Cardiol%'
ORDER BY c.concept_name;
-- 38004451 | Cardiology | Medicare Specialty
```

＃＃＃３．３．ベトナム人医師向けETL

```sql
INSERT INTO provider (
    provider_id,
    provider_name,
    specialty_concept_id,
    care_site_id,
    provider_source_value,
    specialty_source_value
) VALUES (
    3001,
    NULL,                    -- De-identify: không lưu tên
    38004451,                -- Cardiology
    2003,                    -- Khoa Tim mạch - BV Bạch Mai
    'BS-BM-TM-001',         -- Mã bác sĩ nội bộ
    'TIM_MACH'               -- Chuyên khoa nguồn
);
```

> **匿名化:** ベトナムでは、研究データを医師の匿名化が必要になることがよくあります。セット `provider_name = NULL` そしてそのままにしておいてください `provider_source_value` 暗号化。

---

## 4. 医療システムの 3 つのテーブルの関係

```
  ┌──────────┐
  │ LOCATION │  ← Địa lý (tỉnh, thành phố, tọa độ)
  │ 1001     │
  └────┬─────┘
       │ location_id
       ↓
  ┌──────────┐
  │CARE_SITE │  ← Cơ sở y tế (BV, Khoa)
  │ 2001     │
  └────┬─────┘
       │ care_site_id
       ↓
  ┌──────────┐
  │ PROVIDER │  ← Bác sĩ, nhân viên y tế
  │ 3001     │
  └──────────┘

  Ba bảng này được tham chiếu từ:
  ┌───────────────────────┐
  │ PERSON               │ ← location_id, care_site_id, provider_id
  │ VISIT_OCCURRENCE     │ ← care_site_id, provider_id
  │ CONDITION_OCCURRENCE │ ← provider_id
  │ DRUG_EXPOSURE        │ ← provider_id
  │ ... (tất cả bảng     │
  │      clinical)       │
  └───────────────────────┘
```

---

## 5. 分析クエリ

＃＃＃５．１．医療機関別の患者分布

```sql
SELECT
    cs.care_site_name,
    c.concept_name AS facility_type,
    COUNT(DISTINCT vo.person_id) AS patient_count,
    COUNT(vo.visit_occurrence_id) AS visit_count
FROM visit_occurrence vo
JOIN care_site cs ON vo.care_site_id = cs.care_site_id
JOIN concept c ON cs.place_of_service_concept_id = c.concept_id
GROUP BY cs.care_site_name, c.concept_name
ORDER BY visit_count DESC;
```

＃＃＃５．２．医師の専門分野ごとの分析

```sql
SELECT
    c_spec.concept_name AS specialty,
    COUNT(DISTINCT p.provider_id) AS provider_count,
    COUNT(DISTINCT co.person_id) AS patient_count,
    COUNT(*) AS diagnosis_count
FROM condition_occurrence co
JOIN provider p ON co.provider_id = p.provider_id
JOIN concept c_spec ON p.specialty_concept_id = c_spec.concept_id
GROUP BY c_spec.concept_name
ORDER BY diagnosis_count DESC
LIMIT 10;
```

＃＃＃５．３．患者の地理的分布 (VN)

```sql
SELECT
    l.state AS province_code,
    l.city,
    COUNT(DISTINCT per.person_id) AS patient_count
FROM person per
JOIN location l ON per.location_id = l.location_id
WHERE l.country_concept_id = 4330442  -- Vietnam
GROUP BY l.state, l.city
ORDER BY patient_count DESC;
```

---

## 概要

1. **場所**: 地理 (VN: 2 桁の州番号 + 郵便番号)
2. **CARE_SITE**: 医療機関 `place_of_service_concept_id` 分類
3. **提供者**: 医療スタッフ、研究において匿名化が必要
4. 関係: LOCATION → CARE_SITE → PROVIDER (階層)
5. すべての臨床表が参照されています `provider_id` そして `care_site_id`

**次の記事:** PAYER_PLAN_PERIOD & COST — 医療費と保険費。

---

## 参考文献

- [OMOP CDM 5.4 — LOCATION](https://ohdsi.github.io/CommonDataModel/cdm54.html#LOCATION)
- [OMOP CDM 5.4 — CARE_SITE](https://ohdsi.github.io/CommonDataModel/cdm54.html#CARE_SITE)
- [OMOP CDM 5.4 — PROVIDER](https://ohdsi.github.io/CommonDataModel/cdm54.html#PROVIDER)
