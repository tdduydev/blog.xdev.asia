---
id: 019e0b20-b201-7a01-e001-f1a7f8000001
title: 'レッスン 1: OHDSI とは何ですか? — エコシステムの概要とビジョン'
slug: bai-1-ohdsi-la-gi-tong-quan-he-sinh-thai-va-tam-nhin
description: >-
  OHDSI (Observational Health Data Sciences and Informatics)、その目標とビジョン、ツール
  エコシステムの全体的なアーキテクチャ
  (Atlas、WebAPI、Athena、Usagi、ACHILLES、HADES)、および世界的な医療データ標準化における OMOP CDM
  の役割を紹介します。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: 'パート 1: OHDSI および OMOP CDM の概要'
course:
  id: 019e0b20-b200-7a01-e001-f1a7f8000001
  title: OHDSI および OMOP CDM — 包括的な医療データ分析
  slug: ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-7504" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-7504)"/>

  <!-- Decorations -->
  <g>
    <circle cx="659" cy="87" r="22" fill="#818cf8" opacity="0.12000000000000001"/>
    <circle cx="718" cy="106" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="777" cy="125" r="36" fill="#818cf8" opacity="0.060000000000000005"/>
    <circle cx="836" cy="144" r="13" fill="#818cf8" opacity="0.13"/>
    <circle cx="895" cy="163" r="20" fill="#818cf8" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <line x1="600" y1="157" x2="1100" y2="237" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="187" x2="1050" y2="257" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="934.712812921102,91 934.712812921102,123 907,139 879.287187078898,123 879.287187078898,91.00000000000001 907,75" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 1</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 1: OHDSI とは何ですか? — 一般的な生成関係</tspan>
      <tspan x="60" dy="42">姿勢とビジョン</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OHDSI および OMOP CDM — 包括的な医療データ分析</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 1: OHDSI および OMOP CDM の概要</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 1: OHDSI — エコシステムの概要](/storage/uploads/2026/03/ohdsi-bai-1-ecosystem-overview.webp)

## はじめに

世界の医療データは、病院、診療所、健康保険からの数十億件の記録という巨大な宝の山です。しかし、各システムは別個の形式で保存されています。病院 A の HIS (病院情報システム) は病院 B とは完全に異なり、ICD-10 疾患コードは SNOMED CT と一致せず、処方箋は国際有効成分ではなく商品名で保存されます。

**OHDSI** (Observational Health Data Sciences and Informatics — 「オデッセイ」と発音) は、この問題を解決するために作成されました。

---

## 1.OHDSIとは何ですか?

### 1.1 定義

OHDSI は、次のことを目的とした国際的なオープンソース研究プログラムです。

- **観察された健康データを共通のデータ モデルに標準化**
- **信頼性が高く、再現可能な分析方法を開発**
- 患者データを共有せずに多施設研究を **許可**

### 1.2 歴史

```
2008: OMOP (Observational Medical Outcomes Partnership)
      → Dự án FDA nghiên cứu tác dụng phụ thuốc trên dữ liệu thực tế
      → Phát triển Common Data Model (CDM)

2013: OMOP kết thúc → OHDSI ra đời
      → Kế thừa OMOP CDM, mở rộng thành cộng đồng mã nguồn mở
      → Mục tiêu: evidence-based medicine trên quy mô toàn cầu

2024: 800+ tổ chức, 100+ quốc gia
      → 1+ tỷ bản ghi bệnh nhân được chuẩn hóa
      → Hàng nghìn nghiên cứu được publish

2026: OHDSI tiếp tục mở rộng
      → OMOP CDM v5.4, v6.0 đang phát triển
      → Tích hợp AI/ML, genomics, wearable data
```

### 1.3 OHDSI の 3 つの柱

```
┌─────────────────────────────────────────────────────────┐
│                    OHDSI Mission                        │
│                                                         │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────────┐ │
│  │  Open       │ │  Open        │ │  Open            │ │
│  │  Science    │ │  Source      │ │  Community       │ │
│  │             │ │              │ │                  │ │
│  │ Transparent │ │ Free tools   │ │ Collaborative    │ │
│  │ Reproducible│ │ Peer-reviewed│ │ 800+ orgs        │ │
│  │ Published   │ │ GitHub       │ │ Global network   │ │
│  └─────────────┘ └──────────────┘ └──────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 2. OHDSI 問題が解決されました

### 2.1 断片化 — データの断片化

```
Bệnh viện A (HIS: eHospital)     Bệnh viện B (HIS: Telehealth)
┌─────────────────────────┐       ┌─────────────────────────┐
│ Patient: MA_BN_001      │       │ Patient: BN-2024-00123  │
│ Diagnosis: I10 (ICD-10) │       │ Diagnosis: 401.1 (ICD-9)│
│ Drug: Amlor 5mg         │       │ Drug: Amlodipine 5mg    │
│ Lab: Glucose: 126 mg/dL │       │ Lab: Đường huyết: 7.0   │
│ Date: 01/03/2024        │       │ Date: 2024-03-01        │
└─────────────────────────┘       └─────────────────────────┘

→ Cùng 1 bệnh nhân, cùng 1 bệnh (tăng huyết áp), cùng 1 thuốc
→ Nhưng KHÔNG THỂ truy vấn chung vì format khác nhau hoàn toàn
```

### 2.2 解決策: OMOP CDM

```
                    ETL (Extract - Transform - Load)
Bệnh viện A ─────┐                    ┌──────────────────────┐
                  ├─── Transform ───→  │   OMOP CDM Database  │
Bệnh viện B ─────┘                    │                      │
                                       │ person_id: 12345     │
                                       │ condition: 320128    │
                                       │   (Essential HTN)    │
                                       │ drug: 1332419        │
                                       │   (Amlodipine 5mg)   │
                                       │ measurement: 3004410 │
                                       │   (Glucose 126 mg/dL)│
                                       └──────────────────────┘

→ Cùng concept IDs cho cùng ý nghĩa y khoa
→ Cùng cấu trúc bảng → cùng SQL query
→ Có thể phân tích đa trung tâm
```

---

## 3. OHDSI エコシステム アーキテクチャ

```
┌─────────────────────────────────────────────────────────────────┐
│                     OHDSI Ecosystem                             │
│                                                                 │
│  ┌──── Data Standardization ─────────────────────────────────┐ │
│  │                                                           │ │
│  │  [Athena]          → Standardized Vocabularies            │ │
│  │  [WhiteRabbit]     → Scan source data                     │ │
│  │  [Rabbit-in-a-Hat] → Design ETL mapping                   │ │
│  │  [Usagi]           → Map source codes → standard concepts │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                           │ ETL                                │
│                           ▼                                    │
│  ┌──── OMOP CDM Database ────────────────────────────────────┐ │
│  │  PostgreSQL / SQL Server / Oracle / Spark                 │ │
│  └───────────────────────────────────────────────────────────┘ │
│                           │                                    │
│                           ▼                                    │
│  ┌──── Data Quality ────────────────────────────────────────┐  │
│  │  [ACHILLES]              → Data characterization          │  │
│  │  [Data Quality Dashboard]→ 1,500+ quality checks          │  │
│  └───────────────────────────────────────────────────────────┘ │
│                           │                                    │
│                           ▼                                    │
│  ┌──── Analytics Platform ──────────────────────────────────┐  │
│  │  [WebAPI]  → REST API backend (Spring Boot / Java)        │  │
│  │  [ATLAS]   → Web UI (JavaScript) cho phân tích            │  │
│  │  [HADES]   → R packages cho advanced analytics            │  │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 3.1 主なツール

|ツール |目的 |言語 |
|----------|----------|----------|
| **アテナ** |標準化された語彙を検索してダウンロード |ウェブアプリ |
| **ホワイトラビット** |ソース データをスキャンし、プロファイル レポートを作成 |ジャワ |
| **帽子をかぶったウサギ** | ETL マッピング設計 (GUI) |ジャワ |
| **うさぎ** |ソース コードのマップ → OMOP の概念 |ジャワ |
| **WebAPI** | ATLAS 用バックエンド REST API | Java/スプリングブート |
| **アトラス** | Web ベースの分析プラットフォーム | JavaScript |
| **アキレス** |データの特性評価とプロファイリング | R |
| **DQD** |データ品質ダッシュボード — 1,500 以上のチェック | R |
| **ハデス** |観察研究用の R パッケージ | R |

---

## 4. エンドツーエンドの OHDSI ワークフロー

```
Step 1: Vocabulary Preparation
  Athena → Download vocabularies (ICD-10, SNOMED, RxNorm, LOINC...)
                    │
Step 2: Source Data Profiling
  WhiteRabbit → Scan source database → Generate scan report
                    │
Step 3: ETL Design
  Rabbit-in-a-Hat → Design table & field mappings
  Usagi → Map source codes → Standard Concepts
                    │
Step 4: ETL Execution
  Custom ETL scripts (Python/SQL) → Load data into OMOP CDM
                    │
Step 5: Data Quality
  ACHILLES → Characterize CDM data
  DQD → Run 1,500+ quality checks
                    │
Step 6: Analytics
  WebAPI + ATLAS → Cohort Definitions, Characterization,
                   Incidence Rates, Estimation, Prediction
  HADES → Advanced R-based analytics
                    │
Step 7: Network Study
  Package study → Distribute to sites → Collect aggregate results
```

---

## 5. OHDSI ネットワーク — 分散型リサーチ

OHDSI の特徴: **患者データは決してサイト外に流出しません**。

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Site A     │    │   Site B     │    │   Site C     │
│ (500K pts)   │    │ (1M pts)     │    │ (200K pts)   │
│              │    │              │    │              │
│ OMOP CDM     │    │ OMOP CDM     │    │ OMOP CDM     │
│ WebAPI+ATLAS │    │ WebAPI+ATLAS │    │ WebAPI+ATLAS │
│              │    │              │    │              │
│ Run Study    │    │ Run Study    │    │ Run Study    │
│ Package ───┐ │    │ Package ───┐ │    │ Package ───┐ │
└────────────│─┘    └────────────│─┘    └────────────│─┘
             │                   │                    │
             └───── Aggregate ───┴──── Results ───────┘
                        │
                        ▼
              ┌─────────────────┐
              │ Central Analysis│
              │ (chỉ aggregate  │
              │  không có PII)  │
              └─────────────────┘
```

**なぜ重要なのでしょうか?**
- プライバシー規制（HIPAA、GDPR、ベトナム情報セキュリティ法）を遵守します。
- 各サイトはデータを完全に制御できます
- 数百万人の多国籍患者に関する研究はまだ可能です

---

## 6. 実用化

### 6.1 新型コロナウイルス感染症 (OHDSI 新型コロナウイルス感染症に関する勉強会)

```
Timeline:
- Tháng 3/2020: Đại dịch bùng phát
- Tháng 3/2020: OHDSI tổ chức Study-a-thon online
- 96 giờ: 300+ nhà nghiên cứu từ 30+ quốc gia
- Kết quả: Phân tích đặc điểm bệnh nhân COVID-19
  trên 5+ triệu bệnh nhân từ nhiều quốc gia
  → Published trong PNAS (top-tier journal)
```

### 6.2 医薬品の安全性監視

- 実データ（RWD）での薬物副作用の検出
- 薬物グループと対照グループを比較します。
- 例: ワクチン接種後の心筋炎のリスク分析

### 6.3 ベトナムでの申請

- 病院の HIS データを OMOP CDM に標準化する
- ICD-10 ベトナム → SNOMED CT のマッピング
- 社会保険データに関する疫学調査
- 多施設治療計画の有効性を評価する

---

## 概要

|コンセプト |説明 |
|----------|----------|
| OHDSI |世界的なオープンソースの医学研究コミュニティ |
| OMOP CDM |観察医療データの汎用データ モデル |
|標準化された語彙 |標準語彙セット (SNOMED、RxNorm、LOINC...) |
|分散型リサーチ |データをサイト外に流出させない多施設解析 |
| ETL |ソースデータ変換プロセス → OMOP CDM |

**次の記事**: OMOP 共通データ モデル — 構造、原則、ドメイン
