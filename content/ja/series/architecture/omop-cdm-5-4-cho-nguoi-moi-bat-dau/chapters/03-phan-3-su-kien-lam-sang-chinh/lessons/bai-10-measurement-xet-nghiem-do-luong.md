---
id: 019f1a00-a110-7b01-e001-omopcdm54010
title: 'レッスン 10: 測定 — テストと測定'
slug: bai-10-measurement-xet-nghiem-do-luong
description: >-
  検査結果、バイタルサイン、臨床測定値を記録します。 value_as_number /
  value_as_concept_id、operator_concept_id、unit_concept_id、range_low /
  range_high、LOINC ボキャブラリー、measurement_event_id 新しい CDM 5.4。
duration_minutes: 65
is_free: true
video_url: null
sort_order: 10
section_title: 'パート 3: 主要な臨床事象'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初心者向け OMOP CDM 5.4 — A to Z を理解する
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop10" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop10)"/>
  <g>
    <circle cx="670" cy="85" r="20" fill="#818cf8" opacity="0.12"/>
    <circle cx="750" cy="115" r="28" fill="#818cf8" opacity="0.09"/>
    <circle cx="830" cy="95" r="35" fill="#818cf8" opacity="0.06"/>
    <circle cx="920" cy="155" r="22" fill="#818cf8" opacity="0.10"/>
    <line x1="610" y1="165" x2="1100" y2="245" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="130" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 10</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">測定</tspan>
    <tspan x="60" dy="42">試験と測定</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初心者向け OMOP CDM 5.4 — A to Z を理解する</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 3: 主要な臨床事象</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![医療検査と測定のダッシュボード](/storage/uploads/2026/04/omop-cdm-bai10-measurement-lab.webp)

## はじめに

**測定**は、すべての検査結果、バイタルサイン、臨床測定値、つまり**測定可能な値** (数値またはカテゴリー) を持つあらゆるデータの記録です。これは、ほとんどの OMOP データベースで最大のテーブルであり、各検査で多くの行が作成されるため、通常は総レコードの > 50% を占めます (例: 20 のインジケーターを持つ血液検査テーブル = 20 レコード)。

---

## 1. テーブル構造

|コラム |タイプ |必須 |説明 |
|-----|----------|----------|----------|
| `measurement_id` |整数 | ✅PK |固有の ID |
| `person_id` |整数 | ✅FK |患者 |
| `measurement_concept_id` |整数 | ✅ |スタンダードコンセプト（LOINC） |
| `measurement_date` |日付 | ✅ |試験日 |
| `measurement_datetime` |日時 | |日付と時刻 |
| `measurement_time` | VARCHAR(10) | |現在 (レガシー) |
| `measurement_type_concept_id` |整数 | ✅ |データソース |
| `operator_concept_id` |整数 | |演算子 (<, >、=、 <=, >=) |
| `value_as_number` |フロート | |数値 |
| `value_as_concept_id` |整数 | |カテゴリ値 |
| `unit_concept_id` |整数 | |ユニット (UCUM) |
| `range_low` |フロート | |正常の下限 |
| `range_high` |フロート | |通常の上限 |
| `provider_id` |整数 | FK |医師の指示 |
| `visit_occurrence_id` |整数 | FK |関連する訪問 |
| `visit_detail_id` |整数 | FK |訪問詳細 |
| `measurement_source_value` | VARCHAR(50) | |元のテストコード |
| `measurement_source_concept_id` |整数 | |オリジナルコンセプト |
| `unit_source_value` | VARCHAR(50) | |オリジナルユニット |
| `unit_source_concept_id` |整数 | |オリジナルユニットコンセプト |
| `value_source_value` | VARCHAR(50) | |元の値 |
| `measurement_event_id` |ビッグINT | | ⭐ 新しい CDM 5.4 |
| `meas_event_field_concept_id` |整数 | | ⭐ 新しい CDM 5.4 |

---

## 2. value_as_number と value_as_concept_id の比較

＃＃＃２．１． NUMBER 結果 → value_as_number

```sql
-- Glucose máu: 6.5 mmol/L
INSERT INTO measurement VALUES (
    110001, 100001, 3004501,         -- LOINC: Glucose [Mass/volume] in Blood
    '2024-06-15', NULL, NULL,
    32817,                            -- EHR
    4172703,                          -- = (equals)
    6.5,                              -- value_as_number
    NULL,                             -- no concept value
    8753,                             -- UCUM: mmol/L
    3.9, 6.1,                         -- range: 3.9-6.1
    5001, 50001, NULL,
    'GLU', 0, 'mmol/L', 0,
    '6.5', NULL, NULL
);
```

＃＃＃２．２．結果カテゴリ → value_as_concept_id

```sql
-- Xét nghiệm nhóm máu: O
INSERT INTO measurement VALUES (
    110002, 100001, 3003694,         -- LOINC: ABO group [Type] in Blood
    '2024-06-15', NULL, NULL,
    32817,                            -- EHR
    NULL,                             -- no operator
    NULL,                             -- no numeric value
    36308332,                         -- Concept: Blood group O
    NULL,                             -- no unit
    NULL, NULL,                       -- no range
    5001, 50001, NULL,
    'BLOOD_TYPE', 0, NULL, 0,
    'O', NULL, NULL
);
```

＃＃＃２．３．選択ルール

|結果 |数値としての値 |コンセプトとしての値 |
|--------|----------------|--------|
| 「6.5mmol/L」 | 6.5 | NULL |
| 「ポジティブ」 | NULL | 4181412 (ポジティブ) |
| 「ネガティブ」 | NULL | 4132135 (ネガティブ) |
| 「血液型はO型」 | NULL | 36308332 |
| > 100" | 100 | NULL + 演算子 = > |
| 「通常」 | NULL | 4069590 (ノーマル) |

---

## 3.operator_concept_id — 比較演算子

結果が正しくない場合に使用されます (例: "< 0.5", "> 100インチ）。

|コンセプトID |オペレーター |意味 |
|----------|-----------|----------|
| 4171756 | < |下 |
| 4171754 | <= | | 以下
| 4172703 | = |等しい (デフォルト) |
| 4172704 | >= | | 以上
| 4172702 | > |より高い |

```sql
-- Kết quả HBsAg: < 0.05 (dưới ngưỡng phát hiện)
INSERT INTO measurement (
    measurement_id, person_id, measurement_concept_id,
    measurement_date, measurement_type_concept_id,
    operator_concept_id, value_as_number,
    unit_concept_id, measurement_source_value
) VALUES (
    110003, 100001, 3013721,         -- LOINC: HBsAg
    '2024-06-15', 32817,
    4171756,                          -- operator: <
    0.05,                             -- value
    8647,                             -- IU/mL
    'HBSAG'
);
```

---

## 4. LOINC — 語彙テスト

＃＃＃４．１． LOINCの構造

```
LOINC Code = Component : Property : Time : System : Scale : Method
VD: 2345-7 = Glucose : MCnc : Pt : Ser/Plas : Qn

  Component  = Glucose         (đo gì)
  Property   = MCnc            (mass concentration)
  Time       = Pt              (point in time)
  System     = Ser/Plas        (huyết thanh/huyết tương)
  Scale      = Qn              (quantitative - số)
```

＃＃＃４．２． LOINCは人気です

| LOINC コード |コンセプトID |名前 |ベトナム |
|----------|----------||-----|-----|
| 2345-7 | 3004501 |血清中のグルコース [質量/体積] |血糖値 |
| 4548-4 | 3034639 | HbA1c | HbA1c |
| 2160-0 | 3016723 |血清中のクレアチニン |血中クレアチニン |
| 6768-6 | 3006923 |血清中のALT | ＳＧＰＴ |
| 33914-3 | 3027018 | GFR の推定値 | eGFR |
| 718-7 | 3000963 |ヘモグロビン |ヘモグロビン |
| 26515-7 | 3010813 |血小板 |血小板 |
| 2093-3 | 3027114 |総コレステロール |総コレステロール |

---

## 5.unit_concept_id — UCUM ユニット

|コンセプトID | UCUM コード |単位 |
|----------|----------|----------|
| 8840 | mg/dL |ミリグラム/デシリットル |
| 8753 |ミリモル/L |ミリモル/リットル |
| 8647 | IU/mL |国際単位/ミリリットル |
| 8554 | % |パーセント |
| 9529 | kg/m2 | BMI |
| 8876 | mm[Hg] |水銀ミリメートル |
| 8582 | /uL |マイクロリットルあたり (血球) |
| 8845 | mg/L |ミリグラム/リットル |

> **重要:** 同じテストですが、単位が異なるため、値も異なります。例: グルコース 100 mg/dL = 5.6 mmol/L。 ETL は単位を標準化する必要があります。

---

## 6. Measurement_event_id — CDM 5.4 の新機能

測定を他のイベントにリンクできるようにします。

```
  ┌──────────────────────────────┐
  │     MEASUREMENT              │
  │  "Lab: BUN = 35 mg/dL"      │
  │  measurement_event_id = 70001│
  │  meas_event_field_concept_id │
  │  = 1147127                   │──→ condition_occurrence
  │     (condition_occurrence_id)│     .condition_occurrence_id
  └──────────────────────────────┘     = 70001
```

アプリケーション: テストを、そのテストを要求した特定の診断または手順に関連付けます。

```sql
-- Xét nghiệm BUN liên quan đến chẩn đoán suy thận
INSERT INTO measurement (
    measurement_id, person_id, measurement_concept_id,
    measurement_date, measurement_type_concept_id,
    value_as_number, unit_concept_id,
    measurement_event_id,
    meas_event_field_concept_id
) VALUES (
    110010, 100001, 3013682,         -- LOINC: BUN
    '2024-06-15', 32817,
    35, 8840,                         -- 35 mg/dL
    70001,                            -- Liên kết condition_occurrence_id = 70001
    1147127                           -- Field = condition_occurrence.condition_occurrence_id
);
```

---

## 7. ETL テスト VN

＃＃＃７．１．よくある問題

|問題 |ソリューション |
|----------|----------|
| BV 内部試験コード | SOURCE_TO_CONCEPT_MAP → LOINC 経由で地図を作成 |
|テキスト結果「肯定的」 | value_as_concept_id | にマップします。
|「結果」< 0.5" | 個別の演算子 + value_as_number |
|非標準単位 | UCUMの地図 |
|範囲は研究室によって異なります |マシン/ラボから範囲を取得するには、 range_low/range_high | と入力します。
| 20 個のインジケーターのテスト表 = 1 行 | 20 の測定記録に分割 |

### 7.2. SQL ETL

```sql
-- Mỗi chỉ số xét nghiệm = 1 record MEASUREMENT
SELECT
    ROW_NUMBER() OVER() AS measurement_id,
    pm.person_id,
    COALESCE(stcm.target_concept_id, 0) AS measurement_concept_id,
    xn.ngay_xetnghiem AS measurement_date,
    32817 AS measurement_type_concept_id,
    -- Parse operator từ giá trị gốc
    CASE
        WHEN xn.gia_tri LIKE '<%' THEN 4171756    -- <
        WHEN xn.gia_tri LIKE '>%' THEN 4172702 -- >
        他 4172703 -- =
    END AS オペレーターコンセプト ID、
    -- 値から数値を解析します
    ケース
        WHEN xn.price ~ '^[<>]?[0-9.]+'
        THEN REGEXP_REPLACE(xn.value, '[^0-9.]', '', 'g')::FLOAT
        それ以外の場合は NULL
    END AS value_as_number、
    -- カテゴリの結果
    CASE xn.value
        「陽性」の場合 THEN 4181412 -- 陽性
        「ネガティブ」の場合 THEN 4132135 -- ネガティブ
        「通常」の場合 THEN 4069590 -- 通常
        それ以外の場合は NULL
    END AS value_as_concept_id、
    COALESCE(u.target_concept_id, 0) AS ユニットコンセプト ID,
    xn.gioi_han_duoi AS range_low、
    xn.gioi_han_tren AS range_high、
    xn.ma_xetnghiem AS 測定ソース値、
    xn.don_vi_goc ASのunit_source_value、
    xn.value AS value_source_value
xetnghiem_his xn から
JOIN person_mapping pm ON xn.ma_bn = pm.source_id
LEFT JOIN source_to_concept_map stcm
    ON xn.ma_xetnghiem = stcm.source_code
    かつ stcm.source_vocabulary_id = 'VN_LAB'
LEFT JOIN source_to_concept_map u
    ON xn.don_vi_goc = u.source_code
    かつ u.source_vocabulary_id = 'VN_UNIT';
```

---

## 8. 測定におけるバイタルサイン

|バイタルサイン |ロインク |コンセプトID |単位 |
|-----------|-------|-----------|--------|
|最高血圧 | 8480-6 | 3004249 | mmHg |
|拡張期血圧 | 8462-4 | 3012888 | mmHg |
|心拍数 | 8867-4 | 3027018 | /分 |
|温度 | 8310-5 | 3020891 | ℃ |
| SpO2 | 59408-5 | 40762499 | % |
|重量 | 29463-7 | 3025315 | kg |
|高さ | 8302-2 | 3036277 |センチ |
| BMI | 39156-5 | 3038553 | kg/m² |

```SQL
-- バイタルサインを記録します: 血圧 130/85、NT 80、体温 37.2、SpO2 97%
INSERT INTO 測定 (measurement_id、person_id、measurement_concept_id、
    測定日、測定タイプコンセプト ID、
    value_as_number、unit_concept_id、measurement_source_value)
価値観
    (120001, 100001, 3004249, '2024-06-15', 32817, 130, 8876, 'SBP'),
    (120002、100001、3012888、'2024-06-15'、32817、85、8876、'DBP')、
    (120003, 100001, 3027018, '2024-06-15', 32817, 80, 8541, 'HR'),
    (120004, 100001, 3020891, '2024-06-15', 32817, 37.2, 586323, 'TEMP'),
    (120005、100001、40762499、'2024-06-15'、32817、97、8554、'SPO2');
```

---

## 9. SQL 分析

```SQL
-- 集団内の HbA1c の分布
選択
    ケース
        WHEN m.value_as_number < 5.7 THEN 'Bình thường (<5.7%)'
        WHEN m.value_as_number BETWEEN 5.7 AND 6.4 THEN 'Tiền ĐTĐ (5.7-6.4%)'
        WHEN m.value_as_number >= 6.5 THEN '糖尿病 (>=6.5%)'
    hba1c_group として終了、
    COUNT(DISTINCT m.person_id) AS 患者、
    ROUND(AVG(m.value_as_number), 2) AS avg_hba1c
FROM測定m
WHERE m.measurement_concept_id = 3034639 -- HbA1c
  かつ、m.value_as_number が NULL ではありません
  AND m.value_as_number BETWEEN 2 AND 20 -- 外れ値を入力します
hba1c_group によるグループ化
hba1c_group で注文;

-- HbA1c の経時的傾向 (患者 1 名)
選択
    m.測定日、
    m.value_as_number AS hba1c、
    ケース
        WHEN m.value_as_number < 7.0 THEN '✅ Kiểm soát tốt'
        ELSE '⚠️ Cần cải thiện'
    END AS status
FROM measurement m
WHERE m.person_id = 100001
  AND m.measurement_concept_id = 3034639
ORDER BY m.measurement_date;

-- Xét nghiệm bất thường (ngoài range)
SELECT
    c.concept_name AS test_name,
    COUNT(*) AS abnormal_count,
    COUNT(DISTINCT m.person_id) AS patients
FROM measurement m
JOIN concept c ON m.measurement_concept_id = c.concept_id
WHERE m.value_as_number IS NOT NULL
  AND (m.value_as_number < m.range_low
       OR m.value_as_number > m.range_high)
  そして、m.range_low は NULL ではありません
  そして、m.range_high は NULL ではありません
c.concept_name によるグループ化
ORDER BY 異常数 DESC
リミット10;
```

---

## 概要

1. **測定** = 検査 + バイタルサイン + すべての測定値
2. 2 つの結果タイプ: **value_as_number** (数値) または **value_as_concept_id** (カテゴリ)
3. **operator_concept_id** の結果は「<」または「>」
4. **unit_concept_id** は UCUM を使用し、**measurement_concept_id** は LOINC を使用します
5. 通常の基準値の **range_low / range_high**
6. CDM 5.4: **measurement_event_id** はテストを別のイベントに関連付けます

**次の記事:** 観察 — 専門的な表ではカバーされていない臨床事象。

---

## 参考文献

- [OMOP CDM 5.4 — MEASUREMENT](https://ohdsi.github.io/CommonDataModel/cdm54.html#MEASUREMENT)
- [LOINC.org](https://loinc.org/)
- [UCUM — Unified Code for Units of Measure](https://ucum.org/)
