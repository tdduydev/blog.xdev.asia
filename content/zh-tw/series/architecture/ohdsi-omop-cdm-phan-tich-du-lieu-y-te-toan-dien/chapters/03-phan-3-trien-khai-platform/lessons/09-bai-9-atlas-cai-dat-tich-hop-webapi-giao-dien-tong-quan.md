---
id: 019e0b20-b209-7a01-e001-f1a7f8000009
title: 第 9 課：ATLAS — 安裝、WebAPI 整合與概覽介面
slug: bai-9-atlas-cai-dat-tich-hop-webapi-giao-dien-tong-quan
description: >-
  安裝 ATLAS Web 應用程式、設定 WebAPI
  連線、介面概述（資料來源、概念集、群組定義、特徵、發生率、估計、預測）、安全性配置（OAuth、LDAP）以及常見故障排除。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 9
section_title: 第 3 部分：部署 OHDSI 平台
course:
  id: 019e0b20-b200-7a01-e001-f1a7f8000001
  title: OHDSI 和 OMOP CDM — 綜合醫療數據分析
  slug: ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-1994" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-1994)"/>

  <!-- Decorations -->
  <g>
    <circle cx="781" cy="253" r="24" fill="#34d399" opacity="0.08"/>
    <circle cx="962" cy="154" r="17" fill="#34d399" opacity="0.11"/>
    <circle cx="643" cy="55" r="10" fill="#34d399" opacity="0.14"/>
    <circle cx="824" cy="216" r="33" fill="#34d399" opacity="0.07"/>
    <circle cx="1005" cy="117" r="26" fill="#34d399" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <line x1="600" y1="163" x2="1100" y2="243" stroke="#34d399" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="193" x2="1050" y2="263" stroke="#34d399" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1045.9089653438086,194 1045.9089653438086,232 1013,251 980.0910346561914,232 980.0910346561914,194 1013,175" fill="none" stroke="#34d399" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#34d399"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#34d399" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#34d399">🏗️ 建築 — 第 9 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 9 課：ATLAS — WebAPI 安裝、整合和</tspan>
      <tspan x="60" dy="42">概覽介面</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OHDSI 和 OMOP CDM — 綜合醫療數據分析</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 3 部分：部署 OHDSI 平台</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 9 課：ATLAS — 介面概覽](/storage/uploads/2026/03/ohdsi-bai-9-atlas-overview.webp)

## 簡介

**ATLAS** 是 OHDSI 生態系統的主要 Web 應用程式 - 用於探索資料、建立佇列定義、運行特徵分析、發病率、估計和預測的直覺介面。 ATLAS 演示公開： https://atlas-demo.ohdsi.org

---

## 1.安裝ATLAS

### 1.1 Docker Compose（全端）

```yaml
# docker-compose.yml — OHDSI Full Stack
services:
  # CDM Database
  cdm-db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ohdsi
      POSTGRES_USER: ohdsi_admin
      POSTGRES_PASSWORD: ${CDM_DB_PASS}
    volumes:
      - cdm-db-data:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d
    ports:
      - "5432:5432"

  # WebAPI Database
  webapi-db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ohdsi_webapi
      POSTGRES_USER: ohdsi
      POSTGRES_PASSWORD: ${WEBAPI_DB_PASS}
    volumes:
      - webapi-db-data:/var/lib/postgresql/data

  # WebAPI Backend
  webapi:
    image: ohdsi/webapi:latest
    depends_on:
      - webapi-db
    ports:
      - "8080:8080"
    environment:
      DATASOURCE_URL: jdbc:postgresql://webapi-db:5432/ohdsi_webapi
      DATASOURCE_USERNAME: ohdsi
      DATASOURCE_PASSWORD: ${WEBAPI_DB_PASS}
      DATASOURCE_OHDSI_SCHEMA: webapi
      SPRING_JPA_PROPERTIES_HIBERNATE_DEFAULT_SCHEMA: webapi
      FLYWAY_DATASOURCE_URL: jdbc:postgresql://webapi-db:5432/ohdsi_webapi
      FLYWAY_DATASOURCE_USERNAME: ohdsi
      FLYWAY_DATASOURCE_PASSWORD: ${WEBAPI_DB_PASS}
      FLYWAY_SCHEMAS: webapi
      FLYWAY_BASELINE_ON_MIGRATE: "true"
      SECURITY_PROVIDER: DisabledSecurity

  # ATLAS Frontend
  atlas:
    image: ohdsi/atlas:latest
    depends_on:
      - webapi
    ports:
      - "8088:8080"
    environment:
      WEBAPI_URL: http://localhost:8080/WebAPI/

volumes:
  cdm-db-data:
  webapi-db-data:
```

```bash
# Khởi chạy full stack
docker compose up -d

# Truy cập ATLAS
open http://localhost:8088/atlas
```

### 1.2 ATLAS配置

```javascript
// config-local.js — ATLAS configuration
define([], function () {
  var configLocal = {};

  // WebAPI URL
  configLocal.api = {
    name: 'OHDSI',
    url: 'http://localhost:8080/WebAPI/'
  };

  // Authentication
  configLocal.authProviders = [{
    "name": "Local Security",
    "url": "user/login/db",
    "ajax": true,
    "icon": "fa fa-database",
    "isUseCredentialsForm": true
  }];

  // Default CDM source
  configLocal.cohortComparisonResultsEnabled = true;
  configLocal.userAuthenticationEnabled = false;

  return configLocal;
});
```

---

## 2.ATLAS介面

### 2.1 導覽選單

```
┌──────────────────────────────────────────────────────────┐
│  ATLAS — OHDSI                              [Source: ▼]  │
│                                                          │
│  ┌──────────────────┐                                    │
│  │ 🏠 Home          │                                    │
│  │ 📊 Data Sources  │ ← Xem thống kê dữ liệu CDM       │
│  │ 🔍 Search        │ ← Tìm concepts trong vocabulary   │
│  │ 📋 Concept Sets  │ ← Tập hợp concepts (tái sử dụng) │
│  │ 👥 Cohort Defs   │ ← Định nghĩa nhóm bệnh nhân      │
│  │ 📈 Characterize  │ ← Mô tả đặc điểm cohort          │
│  │ 📉 Incidence     │ ← Tỷ lệ mới mắc                 │
│  │ 🎯 Estimation    │ ← So sánh hiệu quả điều trị      │
│  │ 🔮 Prediction    │ ← Dự đoán kết quả bệnh nhân      │
│  │ 🛤️ Pathways      │ ← Lộ trình điều trị               │
│  │ ⚙️ Configuration │ ← Cài đặt                         │
│  └──────────────────┘                                    │
└──────────────────────────────────────────────────────────┘
```

### 2.2 資料來源

```
ATLAS → Data Sources → Chọn CDM Source

Dashboard hiển thị:
┌──────────────────────────────────────────────────────┐
│  Data Source: Hospital XYZ Vietnam                    │
│                                                      │
│  Summary:                                            │
│  ├── Persons: 50,000                                 │
│  ├── Observation Period: 2018 - 2024                 │
│  ├── Conditions: 1,200,000 records                   │
│  ├── Drug Exposures: 800,000 records                 │
│  ├── Measurements: 2,500,000 records                 │
│  └── Visits: 350,000 records                         │
│                                                      │
│  Reports (từ ACHILLES):                              │
│  ├── Person: Age/Gender distribution                 │
│  ├── Visit: Visit types, duration                    │
│  ├── Condition: Top conditions by prevalence          │
│  ├── Drug: Top drugs by utilization                   │
│  └── Measurement: Test distributions                 │
└──────────────────────────────────────────────────────┘

Yêu cầu: ACHILLES phải được chạy trước (xem Bài 13)
```

### 2.3 搜尋 — 尋找概念

```
ATLAS → Search → Nhập "diabetes"

Kết quả:
┌──────────┬──────────────────────────────┬────────┬──────────┐
│ ID       │ Name                         │ Domain │ Standard │
├──────────┼──────────────────────────────┼────────┼──────────┤
│ 201820   │ Diabetes mellitus            │ Cond   │ S        │
│ 201826   │ Type 2 diabetes mellitus     │ Cond   │ S        │
│ 201254   │ Type 1 diabetes mellitus     │ Cond   │ S        │
│ 443238   │ Diabetic neuropathy          │ Cond   │ S        │
│ 4193704  │ Type 2 DM w/renal compl     │ Cond   │ S        │
└──────────┴──────────────────────────────┴────────┴──────────┘

Click vào concept → xem chi tiết:
- Hierarchical relationships (parents, children)
- Related concepts
- Record count trong CDM (nếu ACHILLES chạy rồi)
```

---

## 3. ATLAS 基本工作流程

### 3.1 建立概念集

```
Concept Set = tập hợp concepts có thể tái sử dụng
Ví dụ: "Bệnh tăng huyết áp" = tất cả concepts liên quan HTN

Bước 1: Concept Sets → New Concept Set
Bước 2: Đặt tên: "Hypertension Conditions"
Bước 3: Search → "hypertension" → Add concepts:
         ☑ 320128 Essential hypertension
         ☑ 316866 Hypertensive disorder (+ Include Descendants)
Bước 4: Save

Khi Include Descendants = ON:
  → Tự động bao gồm tất cả con/cháu trong SNOMED hierarchy
  → Malignant HTN, Renovascular HTN, Gestational HTN... đều được bao gồm
```

### 3.2 建立群組定義（摘要）

```
Cohort = nhóm bệnh nhân thỏa mãn tiêu chí

Ví dụ: Bệnh nhân tăng huyết áp mới khởi phát
  Initial Event: Condition = "Hypertension Conditions" (concept set)
  Inclusion:
    - Có ít nhất 365 ngày observation trước event
    - Không có HTN diagnosis trong 365 ngày trước
  Exit: End of observation period

→ Chi tiết ở Bài 10
```

---

## 4. CDM 來源之間的切換

```
ATLAS hỗ trợ multi-source:

Dropdown "Source" → Chọn:
  ☑ Hospital XYZ Vietnam (50K patients)
  ○ Hospital ABC Northern (100K patients)
  ○ Insurance Dataset (500K patients)

Khi chuyển source:
→ Search results thay đổi (record counts khác)
→ Cohort generation chạy trên source đó
→ Characterization results từ source đó

→ Cùng 1 cohort definition, chạy trên nhiều sources
→ So sánh kết quả cross-source
```

---

## 5. ATLAS 設定提示

```
Performance:
- WebAPI cần ít nhất 2GB RAM (4GB khuyến nghị)
- CDM database cần indexes đầy đủ
- ACHILLES results cache giúp Data Sources load nhanh

Security:
- Production PHẢI enable authentication
- Dùng HTTPS (reverse proxy: Nginx/Traefik)
- Restrict network access đến WebAPI

Usability:
- Bookmark cohort definitions, concept sets (shared via URL)
- Export/Import cohort definitions (JSON format)
- Cộng đồng OHDSI chia sẻ cohort definitions phổ biến
  trên forums.ohdsi.org
```

---

## 總結

|組件|目的|
|------------|---------|
|阿特拉斯 | OMOP CDM 資料分析的 Web UI |
|網頁API | REST API 後端連接 ATLAS ↔ CDM 資料庫 |
|資料來源| CDM 統計儀表板（需要 ACHILLES）|
|概念集|一組可重複使用的群組定義概念 |
|群組定義|使用臨床標準定義病患群體|

**下一篇文章**：ATLAS — 概念集與群組定義
