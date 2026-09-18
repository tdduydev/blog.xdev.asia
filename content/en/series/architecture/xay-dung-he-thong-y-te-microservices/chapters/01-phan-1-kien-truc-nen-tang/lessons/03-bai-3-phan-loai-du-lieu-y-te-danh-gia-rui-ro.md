---
id: 019e1a40-a103-7001-d001-f0a1b2c30103
title: 'Lesson 3: Health Data Classification (PHI/ePHI) & Risk Assessment'
slug: bai-3-phan-loai-du-lieu-y-te-danh-gia-rui-ro
description: >-
  Classify medical data according to sensitivity level: PHI, ePHI, PII, clinical
  data, administrative data. Develop Data Classification Policy, Data Flow
  Mapping, Risk Assessment according to NIST SP 800-30, and set up Risk Register
  for medical microservices system.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 3
section_title: 'Part 1: Architecture & Platform'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: >-
    Building a Microservices Healthcare System — Quarkus, PostgreSQL, Keycloak
    with HIPAA standards
  slug: xay-dung-he-thong-y-te-microservices
locale: en
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#c084fc">🏗️ Architecture — Lesson 3</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 3: Medical Data Classification (PHI/ePHI) &</tspan>
      <tspan x="60" dy="42">Risk Assessment</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Building a Microservices Healthcare System — Quarkus, PostgreSQL, Keycloak with HIPAA standards</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 1: Architecture & Platform</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. Data Classification Framework for Healthcare

![Medical data classification pyramid — 4 levels from Public to Restricted](/storage/uploads/2026/04/healthcare-data-classification-pyramid.webp)

### 1.1. Why is it necessary to classify data?

Not all data needs the same level of protection. Data classification helps:

- **Optimize security costs**: Focus resources on the most important data
- **Legal compliance**: Apply correct controls according to regulatory requirements
- **Reduce attack surface**: Limit the scope of sensitive data
- **Incident response**: Prioritize handling when a breach occurs

### 1.2. Healthcare Data Classification Levels

![Medical data classification pyramid — 4 levels from Public to Restricted](/storage/uploads/2026/04/healthcare-data-classification-levels.webp)

| Level | Name | Example | Encryption | Access | Audit |
|-------|-----|--------|-------|--------|-------|
| **4 - RESTRICTED** | Maximum restrictions | HIV/AIDS, mental health, genetics, addiction treatment, reproductive health | Required (AES-256) | Named individuals only | Full logging, real-time alerts |
| **3 - CONFIDENTIAL** | Security | Medical records, tests, prescriptions, diagnostic imaging, health insurance | Required (AES-256) | Role-based (treating clinicians) | Full logging |
| **2 - INTERNAL** | Internal | Appointment schedule, statistics (anonymous), medical staff, configuration | Recommended | Department-based | Standard logging |
| **1 - PUBLIC** | Public | List of services, working hours, hospital contacts, health instructions | Not required | Public | Basic logging |

### 1.3. Data Classification in PostgreSQL Schema

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

### 2.1. PHI Data Flow in Microservices

![Flow of PHI data across microservices — from Patient Portal through API Gateway, Keycloak to services and databases](/storage/uploads/2026/04/healthcare-phi-data-flow.webp)

### 2.2. Data Flow Documentation Template

| # | Data Element | Source | Destination | Transportation | Encryption | Classification |
|---|-------------|-------|-------------|-----------|-------------|----------|
| 1 | Patient Name | Portal | Patient Service | HTTPS/TLS 1.3 | In-transit + At-rest | L3 |
| 2 | Lab Results | Lab Instruments | Lab Service | HL7v2/MLLP over TLS | In-transit + At-rest | L3 |
| 3 | Diagnosis Code | Clinical Service | Billing Service | Kafka (SSL) | Application-level | L3 |
| 4 | HIV Status | Clinical Service | Clinical DB | JDBC/SSL | Column encryption | L4 |
| 5 | Audit Event | All Services | Audit Service | Kafka (SSL) | Event encryption | L2 |
| 6 | Appointments | Scheduling Service | Notification Service | Kafka (SSL) | In-transit | L2 |

## 3. Risk Assessment according to NIST SP 800-30

### 3.1. Risk Assessment Methodology

![6 steps to assess risk according to NIST SP 800-30 — from Identifying Threats to Risk Response](/storage/uploads/2026/04/healthcare-risk-assessment-steps.webp)

### 3.2. Threat Identification for Healthcare Microservices

| Threat Category | Threat | Threat Source |
|----------------|--------|---------------|
| **External** | SQL Injection into Patient Service | Attacker |
| **External** | Ransomware encrypts database | Cybercriminal |
| **External** | MITM attack on API calls | Network attacks |
| **External** | Credential stuffing into Patient Portal | Bot networks |
| **Internal** | Unauthorized employee access to PHI | Insider |
| **Internal** | Database admin exports all patient data | Privileged users |
| **Internal** | Developer hardcode credentials | Negligent employees |
| **Environmental** | Database corruption due to hardware failure | Infrastructure |
| **Environmental** | Data loss due to natural disasters | Natural disasters |
| **Supply Chain** | Vulnerability in Quarkus dependency | Third-party |

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

![5x5 risk assessment matrix — Likelihood x Impact from LOW to CRITICAL](/storage/uploads/2026/04/healthcare-risk-matrix-heatmap.webp)

| | Negligible (1) | Low (2) | Medium (3) | High (4) | Critical (5) |
|-|----------------|---------|-------------|----------|-------------|
| **Very High (5)** | LOW | MEDIUM | HIGH | CRITICAL | CRITICAL |
| **High (4)** | LOW | MEDIUM | HIGH | HIGH | CRITICAL |
| **Medium (3)** | LOW | LOW | MEDIUM | HIGH | HIGH |
| **Low (2)** | LOW | LOW | LOW | MEDIUM | MEDIUM |
| **Very Low (1)** | LOW | LOW | LOW | LOW | MEDIUM |

## 4. Risk Register for Healthcare Microservices

### 4.1. Risk Register Template

| ID | Risk Description | Likelihood | Impact | Risk Level | Mitigation | Owner | Status |
|----|-----------------|-----------|--------|-------------|------------|-------|--------|
| R001 | SQL Injection into Patient API | Medium (3) | Critical (5) | HIGH | Parameterized queries, input validation, WAF | Dev Team | Mitigation |
| R002 | Insider access PHI not authorized | High (4) | High (4) | HIGH | RBAC, RLS, Audit logging, DLP | Security Team | In Progress |
| R003 | Ransomware encrypts patient_db | Medium (3) | Critical (5) | HIGH | Immutable backups, network segmentation, EDR | Ops Team | Mitigation |
| R004 | Keycloak token theft | Medium (3) | High (4) | HIGH | Short-lived tokens, mTLS, DPoP | Dev Team | In Progress |
| R005 | PHI exposure in logs | High (4) | High (4) | HIGH | Log sanitization, PHI detection in CI/CD | Dev Team | Open |
| R006 | Unencrypted PHI in Kafka | Medium (3) | High (4) | HIGH | Application-level encryption, Kafka SSL | Dev Team | Open |
| R007 | Database backup theft | Low (2) | Critical (5) | MEDIUM | Encrypted backups, key management | Ops Team | Mitigation |
| R008 | API key/credential exposure | Medium (3) | High (4) | HIGH | Vault secrets management, no hardcoded secrets | All Teams | In Progress |
| R009 | DDoS on patient portal | Medium (3) | Medium (3) | MEDIUM | Rate limiting, WAF, CDN | Ops Team | Mitigation |
| R010 | Third-party dependency CVE | High (4) | Medium (3) | HIGH | Automated scanning, Dependabot, SBOM | Dev Team | Ongoing |

### 4.2. Risk Treatment Plan

![4 risk handling strategies — Mitigate, Transfer, Accept, Avoid](/storage/uploads/2026/04/healthcare-risk-response-strategies.webp)

- **MITIGATE** ← Preferred for HIGH risks: Implement controls, reduce likelihood/impact
- **TRANSFER** (Transfer): Cyber insurance, outsourcing to specialist provider
- **ACCEPT** (Accept) ← Only for LOW risks: Document risk acceptance, monitor
- **AVOID** (Avoid): Eliminate sources of risk, change architecture

## 5. Data Retention Policy

### 5.1. Retention Requirements for Vietnamese Health

| Data type | Storage time | Legal basis |
|---------------|-------------------|----------------|
| Outpatient medical records | 10 years | Circular 46/2018/TT-BYT |
| Inpatient medical records | 20 years | Circular 46/2018/TT-BYT |
| Death medical records | 20 years | Circular 46/2018/TT-BYT |
| Test results | 10 years | Hospital regulations |
| Diagnostic imaging | 10 years | Hospital regulations |
| Audit logs | 6 years (HIPAA) | HIPAA §164.530(j) |
| Prescription | 5 years | Pharmacy Law |
| Consent records | Lifetime + 6 years | HIPAA / Decree 13/2023 |

### 5.2. Automated Retention in PostgreSQL

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

## 6. Summary

In this lesson, we have:

- Develop a 4-level **Data Classification Framework** for medical data
- Create **Data Flow Mapping** for PHI via microservices architecture
- Perform **Risk Assessment** according to NIST SP 800-30 methodology
- Set up **Risk Register** with risk treatment plans
- Definition of **Data Retention Policy** according to Vietnamese regulations and HIPAA

## Exercises

1. Classify all tables/columns in your medical system database into 4 levels
2. Draw Data Flow Diagram for 3 main use cases: registering for examination, recording test results, prescribing medicine
3. Perform Risk Assessment and create Risk Register for at least 15 risks
4. Develop a Data Retention Policy suitable for the organization

---

---

<!-- SERIES-NAV:START -->
| ◀ Previous article | Next article ▶ |
|:---|---:|
| [Lesson 2: Safe Microservices Architecture for Healthcare with Quarkus Stack](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-2-kien-truc-microservices-an-toan-cho-y-te) | [Lesson 4: Threat Modeling STRIDE/DREAD for Health Information System](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-4-threat-modeling-stride-dread-cho-his) |
<!-- SERIES-NAV:END -->
