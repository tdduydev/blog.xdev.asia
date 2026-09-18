---
id: 019e0b20-b208-7a01-e001-f1a7f8000008
title: "Bài 8: WebAPI — Cài đặt, Cấu hình & REST API"
slug: bai-8-webapi-cai-dat-cau-hinh-rest-api
description: >-
  Kiến trúc OHDSI WebAPI (Spring Boot), cài đặt từ source hoặc Docker,
  cấu hình kết nối CDM database, WebAPI REST endpoints (source, vocabulary,
  cohortdefinition, ir, estimation), authentication/authorization,
  và multi-source configuration.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 8
section_title: "Phần 3: Triển khai OHDSI Platform"
course:
  id: 019e0b20-b200-7a01-e001-f1a7f8000001
  title: "OHDSI & OMOP CDM — Phân tích Dữ liệu Y tế Toàn diện"
  slug: ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-6570" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-6570)"/>

  <!-- Decorations -->
  <g>
    <circle cx="978" cy="204" r="26" fill="#fbbf24" opacity="0.09"/>
    <circle cx="856" cy="262" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="734" cy="60" r="14" fill="#fbbf24" opacity="0.07"/>
    <circle cx="612" cy="118" r="8" fill="#fbbf24" opacity="0.11"/>
    <circle cx="990" cy="176" r="32" fill="#fbbf24" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <line x1="600" y1="144" x2="1100" y2="224" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="174" x2="1050" y2="244" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1077.7749907475932,224.5 1077.7749907475932,263.5 1044,283 1010.2250092524068,263.5 1010.2250092524068,224.5 1044,205" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ Kiến trúc — Bài 8</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 8: WebAPI — Cài đặt, Cấu hình &amp; REST</tspan>
      <tspan x="60" dy="42">API</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OHDSI &amp; OMOP CDM — Phân tích Dữ liệu Y tế Toàn diện</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 3: Triển khai OHDSI Platform</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 8: WebAPI — REST API Architecture](/storage/uploads/2026/03/ohdsi-bai-8-webapi-architecture.webp)

## Giới thiệu

**WebAPI** là backend REST API của ATLAS — viết bằng Java/Spring Boot, cung cấp toàn bộ analysis services cho hệ sinh thái OHDSI. ATLAS (frontend) giao tiếp với CDM database hoàn toàn thông qua WebAPI.

```
ATLAS (JavaScript) ──HTTP──→ WebAPI (Spring Boot) ──JDBC──→ CDM Database
```

---

## 1. Kiến trúc WebAPI

### 1.1 Components

```
┌──────────────────────────────────────────────────────┐
│                   OHDSI WebAPI                       │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │              REST Controllers                  │  │
│  │  /source  /vocabulary  /cohortdefinition       │  │
│  │  /ir  /estimation  /prediction  /pathway       │  │
│  └────────────────────────────────────────────────┘  │
│                       │                              │
│  ┌────────────────────┴───────────────────────────┐  │
│  │              Service Layer                     │  │
│  │  CohortService, VocabularyService,             │  │
│  │  IRAnalysisService, EstimationService          │  │
│  └────────────────────────────────────────────────┘  │
│                       │                              │
│  ┌────────────────────┴───────────────────────────┐  │
│  │              Data Access Layer                 │  │
│  │  Spring JDBC + SQL templates                   │  │
│  │  Multi-dialect: PostgreSQL, SQL Server, Oracle  │  │
│  └────────────────────────────────────────────────┘  │
│                       │                              │
│  ┌────────────────────┼───────────────────────────┐  │
│  │           Database Connections                 │  │
│  │  ┌─────────┐  ┌──────────┐  ┌──────────────┐  │  │
│  │  │WebAPI DB│  │CDM Source│  │CDM Source    │  │  │
│  │  │(config) │  │    #1    │  │    #2        │  │  │
│  │  └─────────┘  └──────────┘  └──────────────┘  │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

### 1.2 Hai Database

```
1. WebAPI Database (ohdsi_webapi)
   → Lưu cấu hình: source definitions, cohort definitions,
     analysis settings, user preferences
   → Được WebAPI tự tạo schema khi khởi động

2. CDM Database (ohdsi hoặc tên tuỳ chọn)
   → Chứa dữ liệu bệnh nhân đã chuẩn hóa OMOP CDM
   → WebAPI chỉ READ từ CDM schema
   → WebAPI WRITE vào Results schema (cohort tables)
```

---

## 2. Cài đặt WebAPI

### 2.1 Docker (Khuyến nghị)

```yaml
# docker-compose.yml
services:
  webapi-db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ohdsi_webapi
      POSTGRES_USER: ohdsi
      POSTGRES_PASSWORD: ${WEBAPI_DB_PASS}
    volumes:
      - webapi-db-data:/var/lib/postgresql/data
    healthcheck:
      test: pg_isready -U ohdsi
      interval: 10s
      retries: 5

  webapi:
    image: ohdsi/webapi:latest
    depends_on:
      webapi-db:
        condition: service_healthy
    ports:
      - "8080:8080"
    environment:
      # WebAPI internal database
      DATASOURCE_URL: jdbc:postgresql://webapi-db:5432/ohdsi_webapi
      DATASOURCE_USERNAME: ohdsi
      DATASOURCE_PASSWORD: ${WEBAPI_DB_PASS}
      DATASOURCE_OHDSI_SCHEMA: webapi
      SPRING_JPA_PROPERTIES_HIBERNATE_DEFAULT_SCHEMA: webapi

      # Flyway migration
      FLYWAY_DATASOURCE_URL: jdbc:postgresql://webapi-db:5432/ohdsi_webapi
      FLYWAY_DATASOURCE_USERNAME: ohdsi
      FLYWAY_DATASOURCE_PASSWORD: ${WEBAPI_DB_PASS}
      FLYWAY_SCHEMAS: webapi
      FLYWAY_BASELINE_ON_MIGRATE: "true"

      # Security (disable for development)
      SECURITY_ORIGIN: "*"
      SECURITY_PROVIDER: DisabledSecurity
    healthcheck:
      test: curl -f http://localhost:8080/WebAPI/info || exit 1
      interval: 30s
      retries: 10

volumes:
  webapi-db-data:
```

```bash
# Khởi chạy
docker compose up -d

# Verify
curl http://localhost:8080/WebAPI/info
# {"version":"2.14.0","buildInfo":...}
```

### 2.2 Build từ Source

```bash
# Clone repository
git clone https://github.com/OHDSI/WebAPI.git
cd WebAPI

# Build với Maven
mvn clean package -DskipTests \
  -P webapi-postgresql

# Output: target/WebAPI.war

# Deploy trên Tomcat hoặc chạy standalone
java -jar target/WebAPI.war \
  --datasource.url=jdbc:postgresql://localhost:5432/ohdsi_webapi \
  --datasource.username=ohdsi \
  --datasource.password=password \
  --flyway.datasource.url=jdbc:postgresql://localhost:5432/ohdsi_webapi
```

---

## 3. Cấu hình CDM Source

### 3.1 Thêm CDM Source qua REST API

```bash
# Đăng ký CDM database source
curl -X POST http://localhost:8080/WebAPI/source \
  -H "Content-Type: application/json" \
  -d '{
    "sourceKey": "HOSPITAL_XYZ",
    "sourceName": "Hospital XYZ Vietnam",
    "sourceDialect": "postgresql",
    "connectionString": "jdbc:postgresql://cdm-db:5432/ohdsi",
    "username": "ohdsi_app",
    "password": "app_password",
    "daimons": [
      {
        "daimonType": "CDM",
        "tableQualifier": "cdm",
        "priority": 1
      },
      {
        "daimonType": "Vocabulary",
        "tableQualifier": "cdm",
        "priority": 1
      },
      {
        "daimonType": "Results",
        "tableQualifier": "results",
        "priority": 1
      },
      {
        "daimonType": "Temp",
        "tableQualifier": "temp",
        "priority": 0
      }
    ]
  }'
```

### 3.2 Daimon Types

```
CDM Daimon:
  → Schema chứa clinical data (person, visit, condition, drug, measurement...)
  → READ ONLY

Vocabulary Daimon:
  → Schema chứa vocabulary tables (concept, concept_relationship...)
  → Thường cùng schema với CDM
  → READ ONLY

Results Daimon:
  → Schema chứa cohort, cohort_definition
  → WebAPI WRITE cohort results vào đây
  → READ/WRITE

Temp Daimon:
  → Schema cho temporary tables trong analysis
  → READ/WRITE
```

### 3.3 Multi-source Configuration

```
WebAPI hỗ trợ kết nối nhiều CDM databases:

┌───────────┐     ┌──────────────┐     ┌───────────────┐
│  WebAPI   │ ←→  │ CDM Source 1 │     │ Hospital A    │
│           │     │ (HOSPITAL_A) │     │ PostgreSQL    │
│           │     └──────────────┘     └───────────────┘
│           │
│           │     ┌──────────────┐     ┌───────────────┐
│           │ ←→  │ CDM Source 2 │     │ Hospital B    │
│           │     │ (HOSPITAL_B) │     │ SQL Server    │
│           │     └──────────────┘     └───────────────┘
│           │
│           │     ┌──────────────┐     ┌───────────────┐
│           │ ←→  │ CDM Source 3 │     │ Insurance     │
│           │     │ (INSURANCE)  │     │ Oracle        │
└───────────┘     └──────────────┘     └───────────────┘

→ ATLAS UI cho phép chuyển đổi giữa các sources
→ Chạy analysis trên cùng cohort definition, khác data sources
```

---

## 4. WebAPI REST Endpoints

### 4.1 Endpoints chính

```
GET  /WebAPI/info                          → Thông tin version
GET  /WebAPI/source                        → Danh sách CDM sources

Vocabulary:
GET  /WebAPI/vocabulary/{sourceKey}/concept/{id}     → Chi tiết concept
GET  /WebAPI/vocabulary/{sourceKey}/search            → Tìm concepts

Cohort Definition:
GET  /WebAPI/cohortdefinition                        → List tất cả cohorts
POST /WebAPI/cohortdefinition                        → Tạo cohort mới
GET  /WebAPI/cohortdefinition/{id}                   → Chi tiết cohort
POST /WebAPI/cohortdefinition/{id}/generate/{sourceKey} → Execute cohort

Incidence Rate:
GET  /WebAPI/ir                                      → List IR analyses
POST /WebAPI/ir                                      → Tạo IR analysis
POST /WebAPI/ir/{id}/execute/{sourceKey}             → Execute IR

Estimation:
GET  /WebAPI/estimation                              → List estimations
POST /WebAPI/estimation                              → Tạo estimation

Characterization:
GET  /WebAPI/cohort-characterization                 → List characterizations

Pathway:
GET  /WebAPI/pathway-analysis                        → List pathway analyses
```

### 4.2 Ví dụ API Calls

```bash
# List CDM Sources
curl http://localhost:8080/WebAPI/source
# [{"sourceId":1,"sourceName":"Hospital XYZ","sourceKey":"HOSPITAL_XYZ",...}]

# Search Vocabulary
curl "http://localhost:8080/WebAPI/vocabulary/HOSPITAL_XYZ/search" \
  -H "Content-Type: application/json" \
  -d '{"QUERY":"hypertension","DOMAIN_ID":["Condition"]}'

# Get Concept Details
curl http://localhost:8080/WebAPI/vocabulary/HOSPITAL_XYZ/concept/320128

# List Cohort Definitions
curl http://localhost:8080/WebAPI/cohortdefinition

# Generate Cohort
curl -X POST \
  http://localhost:8080/WebAPI/cohortdefinition/1/generate/HOSPITAL_XYZ
```

---

## 5. Security Configuration

### 5.1 Authentication Providers

```yaml
# application.properties hoặc environment variables

# Option 1: Disabled (development only)
SECURITY_PROVIDER: DisabledSecurity

# Option 2: Database authentication
SECURITY_PROVIDER: AtlasRegularSecurity
SECURITY_DB_DATASOURCE_URL: jdbc:postgresql://webapi-db:5432/ohdsi_webapi
SECURITY_DB_DATASOURCE_SCHEMA: webapi_security

# Option 3: LDAP/Active Directory
SECURITY_PROVIDER: AtlasRegularSecurity
SECURITY_LDAP_URL: ldap://ldap.hospital.local:389
SECURITY_LDAP_SEARCHBASE: dc=hospital,dc=local
SECURITY_LDAP_DN: cn=admin,dc=hospital,dc=local

# Option 4: OAuth2 (Google, GitHub)
SECURITY_PROVIDER: AtlasRegularSecurity
SECURITY_OAUTH_GOOGLE_APIKEY: your-google-client-id
SECURITY_OAUTH_GOOGLE_APISECRET: your-google-secret
```

### 5.2 Role-Based Access

```
WebAPI Roles:
- public    → Read-only access (xem cohort definitions)
- atlas     → Create/edit cohort definitions, run analyses
- admin     → Manage sources, users, permissions
```

---

## 6. Troubleshooting

```
Lỗi phổ biến:

1. "Source not found"
   → Kiểm tra source đã được đăng ký: GET /WebAPI/source
   → Kiểm tra connection string đúng chưa

2. "Schema 'cdm' does not exist"
   → Kiểm tra tableQualifier trong daimon configuration
   → Đảm bảo user có quyền access schema

3. "Vocabulary tables empty"
   → Vocabulary chưa được load vào CDM database
   → Chạy lại vocabulary import script

4. WebAPI khởi động chậm (~2-5 phút)
   → Bình thường: Flyway migration chạy lần đầu
   → Check logs: docker logs webapi -f

5. Cohort generation timeout
   → Tăng timeout: spring.mvc.async.request-timeout=600000
   → Kiểm tra indexes trên CDM tables
```

---

## Tóm tắt

| Khái niệm | Giải thích |
|-----------|-----------|
| WebAPI | Backend REST API cho ATLAS (Spring Boot/Java) |
| WebAPI DB | Database lưu cấu hình, cohort definitions, analysis settings |
| CDM Daimon | Schema chứa clinical data (read-only) |
| Results Daimon | Schema chứa cohort results (read/write) |
| Source | Một CDM database connection (multi-source supported) |
| Flyway | Database migration tool (tự tạo WebAPI schema) |

**Bài tiếp theo**: ATLAS — Cài đặt, Tích hợp WebAPI & Giao diện tổng quan
