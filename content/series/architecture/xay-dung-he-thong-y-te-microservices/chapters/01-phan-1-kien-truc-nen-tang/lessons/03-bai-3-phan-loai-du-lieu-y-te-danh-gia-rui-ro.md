---
id: 019e1a40-a103-7001-d001-f0a1b2c30103
title: 'Bài 3: Phân loại Dữ liệu Y tế (PHI/ePHI) & Đánh giá Rủi ro'
slug: bai-3-phan-loai-du-lieu-y-te-danh-gia-rui-ro
description: >-
  Phân loại dữ liệu y tế theo mức độ nhạy cảm: PHI, ePHI, PII, dữ liệu
  lâm sàng, dữ liệu hành chính. Xây dựng Data Classification Policy,
  Data Flow Mapping, Risk Assessment theo NIST SP 800-30, và thiết lập
  Risk Register cho hệ thống microservices y tế.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 3
section_title: "Phần 1: Kiến trúc & Nền tảng"
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: Xây dựng Hệ thống Y tế Microservices — Quarkus, PostgreSQL, Keycloak chuẩn HIPAA
  slug: xay-dung-he-thong-y-te-microservices
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-461" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-461)"/>

  <!-- Decorations -->
  <g>
    <circle cx="653" cy="89" r="36" fill="#c084fc" opacity="0.14"/>
    <circle cx="706" cy="282" r="35" fill="#c084fc" opacity="0.13"/>
    <circle cx="759" cy="215" r="34" fill="#c084fc" opacity="0.12000000000000001"/>
    <circle cx="812" cy="148" r="33" fill="#c084fc" opacity="0.11"/>
    <circle cx="865" cy="81" r="32" fill="#c084fc" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <line x1="600" y1="119" x2="1100" y2="199" stroke="#c084fc" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="149" x2="1050" y2="219" stroke="#c084fc" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1048.444863728671,202 1048.444863728671,236 1019,253 989.555136271329,236 989.555136271329,202 1019,185" fill="none" stroke="#c084fc" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#c084fc"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#c084fc" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#c084fc">🏗️ Kiến trúc — Bài 3</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 3: Phân loại Dữ liệu Y tế (PHI/ePHI) &amp;</tspan>
      <tspan x="60" dy="42">Đánh giá Rủi ro</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Xây dựng Hệ thống Y tế Microservices — Quarkus, PostgreSQL, Keycloak chuẩn HIPAA</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 1: Kiến trúc &amp; Nền tảng</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. Data Classification Framework cho Y Tế

![Kim tự tháp phân loại dữ liệu y tế — 4 cấp độ từ Public đến Restricted](/storage/uploads/2026/04/healthcare-data-classification-pyramid.webp)

### 1.1. Tại sao cần phân loại dữ liệu?

Không phải tất cả dữ liệu đều cần cùng mức độ bảo vệ. Phân loại dữ liệu giúp:

- **Tối ưu chi phí bảo mật**: Tập trung resources vào dữ liệu quan trọng nhất
- **Tuân thủ pháp luật**: Áp dụng đúng controls theo yêu cầu quy định
- **Giảm attack surface**: Hạn chế phạm vi dữ liệu nhạy cảm
- **Incident response**: Ưu tiên xử lý khi xảy ra breach

### 1.2. Healthcare Data Classification Levels

![Kim tự tháp phân loại dữ liệu y tế — 4 mức từ Public đến Restricted](/storage/uploads/2026/04/healthcare-data-classification-levels.webp)

| Level | Tên | Ví dụ | Encryption | Access | Audit |
|-------|-----|--------|------------|--------|-------|
| **4 - RESTRICTED** | Hạn chế tối đa | HIV/AIDS, sức khỏe tâm thần, di truyền, điều trị nghiện, sức khỏe sinh sản | Required (AES-256) | Named individuals only | Full logging, real-time alerts |
| **3 - CONFIDENTIAL** | Bảo mật | Hồ sơ bệnh án, xét nghiệm, đơn thuốc, chẩn đoán hình ảnh, BHYT | Required (AES-256) | Role-based (treating clinicians) | Full logging |
| **2 - INTERNAL** | Nội bộ | Lịch hẹn, thống kê (ẩn danh), nhân viên y tế, cấu hình | Recommended | Department-based | Standard logging |
| **1 - PUBLIC** | Công khai | Danh mục dịch vụ, giờ làm việc, liên hệ bệnh viện, hướng dẫn SK | Not required | Public | Basic logging |

### 1.3. Data Classification trong PostgreSQL Schema

```sql
-- Data classification metadata table
CREATE TABLE data_classification (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    schema_name VARCHAR(100) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    column_name VARCHAR(100) NOT NULL,
    classification_level INTEGER NOT NULL CHECK (classification_level BETWEEN 1 AND 4),
    classification_label VARCHAR(50) NOT NULL,
    contains_phi BOOLEAN DEFAULT false,
    encryption_required BOOLEAN DEFAULT false,
    masking_rule VARCHAR(100),
    retention_days INTEGER,
    legal_basis TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ví dụ classification cho patient table
INSERT INTO data_classification (schema_name, table_name, column_name,
    classification_level, classification_label, contains_phi, encryption_required, masking_rule)
VALUES
    ('public', 'patients', 'id', 2, 'INTERNAL', false, false, NULL),
    ('public', 'patients', 'full_name', 3, 'CONFIDENTIAL', true, true, 'PARTIAL_MASK'),
    ('public', 'patients', 'date_of_birth', 3, 'CONFIDENTIAL', true, false, 'YEAR_ONLY'),
    ('public', 'patients', 'cccd_number', 3, 'CONFIDENTIAL', true, true, 'FULL_MASK'),
    ('public', 'patients', 'phone', 3, 'CONFIDENTIAL', true, true, 'PARTIAL_MASK'),
    ('public', 'patients', 'email', 3, 'CONFIDENTIAL', true, true, 'PARTIAL_MASK'),
    ('public', 'patients', 'address', 3, 'CONFIDENTIAL', true, true, 'CITY_ONLY'),
    ('public', 'patients', 'blood_type', 2, 'INTERNAL', false, false, NULL),
    ('public', 'patients', 'hiv_status', 4, 'RESTRICTED', true, true, 'FULL_MASK'),
    ('public', 'patients', 'insurance_number', 3, 'CONFIDENTIAL', true, true, 'PARTIAL_MASK');
```

## 2. Data Flow Mapping

### 2.1. PHI Data Flow trong Microservices

![Luồng dữ liệu PHI qua các microservices — từ Patient Portal qua API Gateway, Keycloak đến các services và databases](/storage/uploads/2026/04/healthcare-phi-data-flow.webp)

### 2.2. Data Flow Documentation Template

| # | Data Element | Source | Destination | Transport | Encryption | Classification |
|---|-------------|--------|-------------|-----------|------------|----------------|
| 1 | Patient Name | Portal | Patient Service | HTTPS/TLS 1.3 | In-transit + At-rest | L3 |
| 2 | Lab Results | Lab Instrument | Lab Service | HL7v2/MLLP over TLS | In-transit + At-rest | L3 |
| 3 | Diagnosis Code | Clinical Service | Billing Service | Kafka (SSL) | Application-level | L3 |
| 4 | HIV Status | Clinical Service | Clinical DB | JDBC/SSL | Column encryption | L4 |
| 5 | Audit Event | All Services | Audit Service | Kafka (SSL) | Event encryption | L2 |
| 6 | Appointment | Scheduling Service | Notification Service | Kafka (SSL) | In-transit | L2 |

## 3. Risk Assessment theo NIST SP 800-30

### 3.1. Risk Assessment Methodology

![6 bước đánh giá rủi ro theo NIST SP 800-30 — từ xác định Threats đến Risk Response](/storage/uploads/2026/04/healthcare-risk-assessment-steps.webp)

### 3.2. Threat Identification cho Healthcare Microservices

| Threat Category | Threat | Threat Source |
|----------------|--------|---------------|
| **External** | SQL Injection vào Patient Service | Attacker |
| **External** | Ransomware mã hóa database | Cybercriminal |
| **External** | MITM attack trên API calls | Network attacker |
| **External** | Credential stuffing vào Patient Portal | Bot network |
| **Internal** | Nhân viên truy cập PHI trái phép | Insider |
| **Internal** | Database admin export toàn bộ patient data | Privileged user |
| **Internal** | Developer hardcode credentials | Negligent employee |
| **Environmental** | Database corruption do hardware failure | Infrastructure |
| **Environmental** | Mất dữ liệu do thiên tai | Natural disaster |
| **Supply Chain** | Vulnerability trong Quarkus dependency | Third-party |

### 3.3. Vulnerability Assessment

```java
// Ví dụ: Checklist kiểm tra vulnerabilities trong Quarkus service
public class SecurityVulnerabilityChecklist {

    // V1: SQL Injection - Sử dụng parameterized queries
    // ❌ VULNERABLE
    String badQuery = "SELECT * FROM patients WHERE name = '" + userInput + "'";

    // ✅ SECURE
    @NamedQuery(name = "Patient.findByName",
                query = "SELECT p FROM Patient p WHERE p.name = :name")
    List<Patient> findByName(@Param("name") String name);

    // V2: Broken Authentication - Token validation
    // ❌ VULNERABLE: Không verify token
    String userId = jwt.getClaim("sub"); // Không verify expiration, issuer

    // ✅ SECURE: Quarkus OIDC tự động verify
    @Authenticated
    @RolesAllowed("doctor")
    public Response getPatient(UUID id) { ... }

    // V3: Sensitive Data Exposure in Logs
    // ❌ VULNERABLE
    log.info("Patient created: " + patient.toString()); // Logs PHI!

    // ✅ SECURE
    log.info("Patient created: id={}", patient.getId()); // Only log ID
}
```

### 3.4. Risk Matrix

![Ma trận đánh giá rủi ro 5x5 — Likelihood x Impact từ LOW đến CRITICAL](/storage/uploads/2026/04/healthcare-risk-matrix-heatmap.webp)

| | Negligible (1) | Low (2) | Medium (3) | High (4) | Critical (5) |
|-|----------------|---------|------------|----------|-------------|
| **Very High (5)** | LOW | MEDIUM | HIGH | CRITICAL | CRITICAL |
| **High (4)** | LOW | MEDIUM | HIGH | HIGH | CRITICAL |
| **Medium (3)** | LOW | LOW | MEDIUM | HIGH | HIGH |
| **Low (2)** | LOW | LOW | LOW | MEDIUM | MEDIUM |
| **Very Low (1)** | LOW | LOW | LOW | LOW | MEDIUM |

## 4. Risk Register cho Healthcare Microservices

### 4.1. Risk Register Template

| ID | Risk Description | Likelihood | Impact | Risk Level | Mitigation | Owner | Status |
|----|-----------------|------------|--------|------------|------------|-------|--------|
| R001 | SQL Injection vào Patient API | Medium (3) | Critical (5) | HIGH | Parameterized queries, input validation, WAF | Dev Team | Mitigated |
| R002 | Insider access PHI không authorized | High (4) | High (4) | HIGH | RBAC, RLS, Audit logging, DLP | Security Team | In Progress |
| R003 | Ransomware mã hóa patient_db | Medium (3) | Critical (5) | HIGH | Immutable backups, network segmentation, EDR | Ops Team | Mitigated |
| R004 | Keycloak token theft | Medium (3) | High (4) | HIGH | Short-lived tokens, mTLS, DPoP | Dev Team | In Progress |
| R005 | PHI exposure in logs | High (4) | High (4) | HIGH | Log sanitization, PHI detection in CI/CD | Dev Team | Open |
| R006 | Unencrypted PHI in Kafka | Medium (3) | High (4) | HIGH | Application-level encryption, Kafka SSL | Dev Team | Open |
| R007 | Database backup theft | Low (2) | Critical (5) | MEDIUM | Encrypted backups, key management | Ops Team | Mitigated |
| R008 | API key/credential exposure | Medium (3) | High (4) | HIGH | Vault secrets management, no hardcoded secrets | All Teams | In Progress |
| R009 | DDoS on patient portal | Medium (3) | Medium (3) | MEDIUM | Rate limiting, WAF, CDN | Ops Team | Mitigated |
| R010 | Third-party dependency CVE | High (4) | Medium (3) | HIGH | Automated scanning, Dependabot, SBOM | Dev Team | Ongoing |

### 4.2. Risk Treatment Plan

![4 chiến lược xử lý rủi ro — Mitigate, Transfer, Accept, Avoid](/storage/uploads/2026/04/healthcare-risk-response-strategies.webp)

- **MITIGATE** (Giảm thiểu) ← Preferred cho HIGH risks: Implement controls, giảm likelihood/impact
- **TRANSFER** (Chuyển giao): Cyber insurance, outsource cho specialist provider
- **ACCEPT** (Chấp nhận) ← Chỉ cho LOW risks: Document risk acceptance, monitor
- **AVOID** (Tránh): Loại bỏ nguồn rủi ro, thay đổi architecture

## 5. Data Retention Policy

### 5.1. Retention Requirements cho Y Tế Việt Nam

| Loại dữ liệu | Thời gian lưu trữ | Cơ sở pháp lý |
|---------------|-------------------|----------------|
| Hồ sơ bệnh án ngoại trú | 10 năm | Thông tư 46/2018/TT-BYT |
| Hồ sơ bệnh án nội trú | 20 năm | Thông tư 46/2018/TT-BYT |
| Hồ sơ bệnh án tử vong | 20 năm | Thông tư 46/2018/TT-BYT |
| Kết quả xét nghiệm | 10 năm | Quy định bệnh viện |
| Chẩn đoán hình ảnh | 10 năm | Quy định bệnh viện |
| Audit logs | 6 năm (HIPAA) | HIPAA §164.530(j) |
| Đơn thuốc | 5 năm | Luật Dược |
| Consent records | Lifetime + 6 years | HIPAA / NĐ 13/2023 |

### 5.2. Automated Retention trong PostgreSQL

```sql
-- Partition strategy for data retention
CREATE TABLE audit_events (
    id UUID DEFAULT gen_random_uuid(),
    event_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    event_type VARCHAR(50) NOT NULL,
    actor_id UUID NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id UUID,
    action VARCHAR(20) NOT NULL,
    outcome VARCHAR(20) NOT NULL,
    details JSONB
) PARTITION BY RANGE (event_time);

-- Create monthly partitions
CREATE TABLE audit_events_2026_01 PARTITION OF audit_events
    FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

CREATE TABLE audit_events_2026_02 PARTITION OF audit_events
    FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');

-- Automated partition management
-- Drop partitions older than retention period (6 years for HIPAA)
-- Archive to cold storage before dropping
```

## 6. Tổng kết

Trong bài học này, chúng ta đã:

- Xây dựng **Data Classification Framework** 4 cấp cho dữ liệu y tế
- Tạo **Data Flow Mapping** cho PHI qua microservices architecture
- Thực hiện **Risk Assessment** theo NIST SP 800-30 methodology
- Thiết lập **Risk Register** với risk treatment plans
- Định nghĩa **Data Retention Policy** theo quy định Việt Nam và HIPAA

## Bài tập

1. Phân loại tất cả tables/columns trong database hệ thống y tế của bạn theo 4 cấp
2. Vẽ Data Flow Diagram cho 3 use cases chính: đăng ký khám, ghi nhận kết quả xét nghiệm, kê đơn thuốc
3. Thực hiện Risk Assessment và tạo Risk Register cho ít nhất 15 risks
4. Xây dựng Data Retention Policy phù hợp với tổ chức

---

---

<!-- SERIES-NAV:START -->
| ◀ Bài trước | Bài tiếp theo ▶ |
|:---|---:|
| [Bài 2: Kiến trúc Microservices An toàn cho Y Tế với Quarkus Stack](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-2-kien-truc-microservices-an-toan-cho-y-te) | [Bài 4: Threat Modeling STRIDE/DREAD cho Health Information System](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-4-threat-modeling-stride-dread-cho-his) |
<!-- SERIES-NAV:END -->
