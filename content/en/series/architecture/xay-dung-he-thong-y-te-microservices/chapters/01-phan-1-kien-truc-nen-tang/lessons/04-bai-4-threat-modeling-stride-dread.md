---
id: 019e1a40-a104-7001-d001-f0a1b2c30104
title: 'Lesson 4: Threat Modeling STRIDE/DREAD for Healthcare Systems'
slug: bai-4-threat-modeling-stride-dread
description: >-
  Applying Threat Modeling to the healthcare system: STRIDE (Spoofing,
  Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege),
  DREAD scoring, Attack Trees, Data Flow Diagrams for healthcare microservices,
  OWASP Top 10 in healthcare context, and building Security Requirements from
  the threat model.
duration_minutes: 150
is_free: true
video_url: null
sort_order: 4
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
    <linearGradient id="bg-7408" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-7408)"/>

  <!-- Decorations -->
  <g>
    <circle cx="747" cy="131" r="10" fill="#a78bfa" opacity="0.060000000000000005"/>
    <circle cx="894" cy="78" r="11" fill="#a78bfa" opacity="0.07"/>
    <circle cx="1041" cy="285" r="12" fill="#a78bfa" opacity="0.08"/>
    <circle cx="688" cy="232" r="13" fill="#a78bfa" opacity="0.09"/>
    <circle cx="835" cy="179" r="14" fill="#a78bfa" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <line x1="600" y1="181" x2="1100" y2="261" stroke="#a78bfa" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="211" x2="1050" y2="281" stroke="#a78bfa" stroke-width="0.5" opacity="0.08"/>
    <polygon points="962.1769145362398,113 962.1769145362398,149 931,167 899.8230854637602,149 899.8230854637602,113.00000000000001 931,95" fill="none" stroke="#a78bfa" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#a78bfa"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#a78bfa" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🏗️ Architecture — Lesson 4</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 4: Threat Modeling STRIDE/DREAD for the System</tspan>
      <tspan x="60" dy="42">Health system</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Building a Microservices Healthcare System — Quarkus, PostgreSQL, Keycloak with HIPAA standards</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 1: Architecture & Platform</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. What is Threat Modeling?

![Threat Modeling STRIDE for Microservices Medical Systems](/storage/uploads/2026/04/healthcare-threat-model-stride.webp)

**Threat Modeling** is the systematic process of identifying, evaluating, and prioritizing potential security threats to a system. In healthcare, threat modeling is especially important because the consequences of an attack go beyond just losing data — it can affect **patients' lives**.

### 1.1. Threat Modeling Process

![6-step Threat Modeling process — from Define Scope to Validate & Iterate](/storage/uploads/2026/04/healthcare-threat-modeling-process.webp)

### 1.2. When is Threat Modeling needed?

- **New system design** (HIS, EMR, LIS)
- **Add new microservice** to the existing system
- **Architectural changes** (e.g. moving from monolith to microservices)
- **External system integration** (lab instruments, insurance APIs)
- **Regular review** (6 months or after each major release)

## 2. STRIDE Threat Model

### 2.1. Overview STRIDE

STRIDE is a threat classification framework developed by Microsoft:

| Letter | Threat | Property Violated | Examples in Health |
|--------|--------|-------------------|-------------------|
| **S** | Spoofing | Authentication | Impersonate a doctor to access patient records |
| **T** | Tampering | Integrity | Modify test results in database |
| **R** | Repudiation | Non-repudiation | Doctor denies prescribing wrong medicine |
| **I** | Information Disclosure | Confidentiality | Leaked list of HIV patients |
| **D** | Denial of Service | Availability | DDoS attack causes emergency system to stop working |
| **E** | Elevation of Privilege | Authorization | Nurses can access admin | functions

### 2.2. STRIDE Analysis for Healthcare Microservices

#### S - Spoofing (Identity spoofing)

![Spoofing Attack — spoof JWT token to access Patient API and prevention measures](/storage/uploads/2026/04/healthcare-stride-spoofing-attack.webp)

**Threat:** Attacker fakes JWT token to access Patient API

**Attack Vector:**

1. Steal JWT from browser localStorage
2. Forge JWT with modified claims (role: "admin")
3. Replay expired tokens

**Affected Components:** API Gateway, Patient Service, Clinical Service

**Mitigations:**

- **M1:** Keycloak OIDC token validation — quarkus-oidc auto-verifies signature
- **M2:** Short-lived access tokens (5 min) — reduces token theft window
- **M3:** DPoP (Proof-of-Possession) — token bound to client certificate
- **M4:** Refresh token rotation — one-time use refresh tokens
- **M5:** mTLS between services — service identity verification

#### T - Tampering (Data tampering)

![Tampering Attack — insider tampering with test results and data integrity measures](/storage/uploads/2026/04/healthcare-stride-tampering-integrity.webp)

**Threat:** Insider modified test results in lab_db

**Attack Vector:**

1. DBA directly UPDATE lab_results table
2. Exploit SQL injection to modify data
3. Intercept and modify API response

**Mitigations:**

- **M1:** pgAudit logging (log all DML)
- **M2:** Database triggers for change tracking
- **M3:** Digital signatures for lab results
- **M4:** Immutable audit log (append-only)
- **M5:** Dual control for critical changes
- **M6:** Row versioning with checksums

```sql
-- Integrity protection: Row versioning with checksum
CREATE TABLE lab_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL,
    test_code VARCHAR(20) NOT NULL,
    result_value NUMERIC,
    result_unit VARCHAR(20),
    status VARCHAR(20) DEFAULT 'PRELIMINARY',
    performed_by UUID NOT NULL,
    verified_by UUID,
    -- Integrity fields
    version INTEGER NOT NULL DEFAULT 1,
    data_checksum TEXT NOT NULL,  -- HMAC-SHA256 of all data fields
    previous_checksum TEXT,      -- Chain integrity
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to enforce integrity
CREATE OR REPLACE FUNCTION verify_lab_result_integrity()
RETURNS TRIGGER AS $$
BEGIN
    -- Verify previous record wasn't tampered
    IF TG_OP = 'UPDATE' THEN
        IF OLD.data_checksum != NEW.previous_checksum THEN
            RAISE EXCEPTION 'Integrity violation: checksum chain broken';
        END IF;
        NEW.version := OLD.version + 1;
    END IF;

    -- Calculate new checksum
    NEW.data_checksum := encode(
        hmac(
            concat(NEW.patient_id::text, NEW.test_code,
                   NEW.result_value::text, NEW.result_unit,
                   NEW.version::text),
            current_setting('app.hmac_key'),
            'sha256'
        ),
        'hex'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

#### I - Information Disclosure

```
Threat: PHI bị lộ qua error messages, logs, hoặc API responses
───────────────────────────────────────────────────────────
Attack Vector:
  1. Verbose error messages expose database schema
  2. Application logs contain patient names, SSN
  3. API returns more data than necessary
  4. Debug endpoints left enabled in production

Mitigations trong Quarkus:
```

```java
// ❌ BAD: Verbose error response exposes internals
@ServerExceptionMapper
public Response handleException(Exception e) {
    return Response.serverError()
        .entity(Map.of("error", e.getMessage(), // May contain SQL, PHI
                       "stackTrace", Arrays.toString(e.getStackTrace())))
        .build();
}

// ✅ GOOD: Generic error response with correlation ID
@ServerExceptionMapper
public Response handleException(Exception e) {
    String correlationId = UUID.randomUUID().toString();
    log.error("Internal error [correlationId={}]", correlationId, e);

    return Response.serverError()
        .entity(Map.of(
            "error", "An internal error occurred",
            "correlationId", correlationId,
            "timestamp", Instant.now().toString()))
        .build();
}
```

```java
// ❌ BAD: API returns all patient fields
@GET
@Path("/{id}")
public Patient getPatient(@PathParam("id") UUID id) {
    return patientRepository.findById(id); // Returns SSN, full address, etc.
}

// ✅ GOOD: DTO with minimal necessary fields
@GET
@Path("/{id}")
public PatientSummaryDTO getPatient(@PathParam("id") UUID id) {
    Patient patient = patientRepository.findById(id);
    return PatientSummaryDTO.from(patient); // Only name, DOB, MRN
}
```

#### D - Denial of Service

![DoS mitigation — 7 layers of anti-DDoS protection for healthcare systems](/storage/uploads/2026/04/healthcare-stride-dos-mitigation.webp)

**Threat:** DDoS attack causes the emergency system to stop working

**Impact in Healthcare:**

- Unable to look up drug allergies → wrong prescription → dangerous
- Unable to access lab results → slow diagnosis
- The scheduling system is down → patients cannot come for examination

**Mitigations:**

- **M1:** Rate limiting at API Gateway
- **M2:** Circuit breaker (Quarkus Fault Tolerance)
- **M3:** Auto-scaling Kubernetes pods
- **M4:** CDN/WAF (Cloudflare, AWS Shield)
- **M5:** Database connection pooling
- **M6:** Fallback mode / offline capability
- **M7:** Priority queuing for ER requests

#### E - Elevation of Privilege

```
Threat: Y tá nâng quyền lên doctor role để kê đơn thuốc
───────────────────────────────────────────────────────────
Attack Vector:
  1. Exploit IDOR (Insecure Direct Object Reference)
  2. Modify JWT claims locally
  3. Access admin API endpoints without authorization
  4. Exploit broken function-level authorization

Mitigations trong Keycloak + Quarkus:
```

```java
// Fine-grained authorization check
@Path("/api/v1/prescriptions")
@Authenticated
public class PrescriptionResource {

    @Inject
    SecurityIdentity identity;

    @Inject
    AuthorizationService authzService;

    @POST
    public Response createPrescription(PrescriptionRequest request) {
        // Check 1: Role-based - only doctors can prescribe
        if (!identity.hasRole("doctor")) {
            throw new ForbiddenException("Only doctors can create prescriptions");
        }

        // Check 2: Attribute-based - doctor must be assigned to patient
        boolean isAssigned = authzService.isDoctorAssignedToPatient(
            identity.getPrincipal().getName(),
            request.patientId()
        );
        if (!isAssigned) {
            auditService.logUnauthorizedAccess(identity, "PRESCRIPTION_CREATE",
                request.patientId());
            throw new ForbiddenException("Not assigned to this patient");
        }

        // Check 3: Department-based - only prescribe within specialty
        String doctorDepartment = identity.getAttribute("department");
        if (!authzService.canPrescribeForDepartment(doctorDepartment,
                request.medicationCategory())) {
            throw new ForbiddenException("Cannot prescribe outside specialty");
        }

        return prescriptionService.create(request);
    }
}
```

## 3. DREAD Scoring

### 3.1. DREAD Factors

| Factor | Description | 1 (Low) | 5 (Medium) | 10 (High) |
|--------|-------------|--------|-------------|-----------|
| **D**amage | Level of damage | Small data exposure | Significant data loss | Complete system compromise |
| **R**eproducibility | Easy to reproduce | Difficult, requires many conditions | Need authentication | Easy to reproduce |
| **E**xploitability | Easy to exploit | Need high expertise | Need tools | Script kiddie level |
| **A**affected Users | Number of people affected | Some users | A department | All patients |
| **D**iscoverability | Easily detect vulnerabilities | Hard to find | Needs effort | Publicly known |

### 3.2. DREAD Analysis for Healthcare Threats

| Threat | D | R | E | A | D | Total | Priorities |
|--------|---|---|---|---|---|-------|----------|
| SQL Injection in Patient Search | 10 | 8 | 7 | 10 | 8 | **8.6** | CRITICAL |
| Token theft via XSS | 8 | 7 | 6 | 8 | 7 | **7.2** | HIGH |
| Insider PHI access | 9 | 9 | 5 | 7 | 4 | **6.8** | HIGH |
| DDoS on ER system | 7 | 10 | 8 | 10 | 9 | **8.8** | CRITICAL |
| Unpatched Quarkus CVE | 8 | 6 | 7 | 10 | 8 | **7.8** | HIGH |
| Backup data theft | 10 | 3 | 4 | 10 | 3 | **6.0** | MEDIUM |

> **DREAD Score**: Total / 5. Score > 7 = Critical, 5-7 = High, 3-5 = Medium, < 3 = Low

## 4. OWASP Top 10 trong Healthcare Context

### 4.1. Mapping OWASP Top 10 cho Healthcare Microservices

| # | OWASP Vulnerability | Healthcare Impact | Quarkus/PostgreSQL/Keycloak Mitigation |
|---|---------------------|-------------------|----------------------------------------|
| A01 | Broken Access Control | Nurse reviews patient's psychiatric record | Keycloak RBAC + PostgreSQL RLS |
| A02 | Cryptographic Failures | PHI stored/transmitted unencrypted | pgcrypto + TLS 1.3 + Vault KMS |
| A03 | Injection | SQL injection expose patient data | Hibernate ORM parameterized queries |
| A04 | Insecure Design | No consent management | FHIR Consent resource + audit |
| A05 | Security Misconfiguration | Keycloak default admin credentials | Hardened configuration, no defaults |
| A06 | Vulnerable Components | Log4Shell in healthcare app | Quarkus BOM, Dependabot, SBOM |
| A07 | Auth Failures | Weak passwords for doctor accounts | Keycloak password policies + MFA |
| A08 | Software/Data Integrity | Tampered lab results | Digital signatures, pgAudit |
| A09 | Logging Failures | No audit trail for PHI access | OpenTelemetry + ELK + pgAudit |
| A10 | SSRF | Internal service access via FHIR proxy | URL allowlisting, network policies |

## 5. Attack Trees cho Healthcare

### 5.1. Attack Tree: Steal Patient Medical Records

![Attack Tree — attack vectors to steal patient records with DREAD scoring](/storage/uploads/2026/04/healthcare-attack-tree.webp)

**Goal: Steal Patient Medical Records**

| Attack Path | DREAD | Priority |
|---|---|---|
| 1.1.1 SQL Injection | 8.6 | CRITICAL |
| 1.1.2 XSS to steal session | 7.2 | HIGH |
| 1.1.3 IDOR to access other patients | 7.0 | HIGH |
| 1.2.1 Credential stuffing | 5.4 | MEDIUM |
| 1.2.2 Phishing doctor credentials | 6.8 | HIGH |
| 1.2.3 Brute force Keycloak | 3.2 | LOW |
| 1.3.1 MITM on API calls | 4.6 | MEDIUM |
| 1.3.2 DNS spoofing | 4.2 | MEDIUM |
| 2.1.1 DBA exports database | 6.8 | HIGH |
| 2.1.2 Admin disables audit | 5.6 | MEDIUM |
| 2.1.3 Doctor accesses non-patient | 6.0 | MEDIUM |
| 2.2.1 Shared workstation session | 6.2 | MEDIUM |
| 2.2.2 Post-it password | 5.0 | MEDIUM |
| 3.1 Compromised dependency | 7.8 | HIGH |
| 3.2 Malicious Docker image | 6.4 | HIGH |
| 3.3 Compromised CI/CD pipeline | 7.0 | HIGH |

## 6. From Threat Model to Security Requirements

### 6.1. Generating Security Requirements

| Threat | STRIDE | Requirement ID | Security Requirement | Implementation |
|--------|--------|---------------|---------------------|----------------|
| Token theft | S | SEC-001 | Access tokens MUST expire within 5 minutes | Keycloak realm settings |
| SQL injection | T, I | SEC-002 | All database queries MUST use parameterized statements | Hibernate ORM |
| PHI in logs | I | SEC-003 | Application logs MUST NOT contain any of 18 HIPAA identifiers | Log sanitization filter |
| No audit trail | R | SEC-004 | All PHI access MUST be logged with user ID, timestamp, resource | pgAudit + OpenTelemetry |
| DDoS | D | SEC-005 | API endpoints MUST have rate limiting (100 req/min/user) | Kong rate-limiting plugin |
| Privilege escalation | E | SEC-006 | Authorization MUST be checked at both Gateway and Service level | Keycloak + @RolesAllowed |
| Unencrypted PHI | I | SEC-007 | PHI at-rest MUST be encrypted with AES-256 | pgcrypto column encryption |
| No MFA | S | SEC-008 | Clinical users MUST use MFA for external access | Keycloak conditional MFA |

### 6.2. Security Requirements Traceability Matrix

```
Requirement → Implementation → Test → Compliance Mapping

SEC-001 → quarkus.oidc.token.age=300
        → Integration test: verify expired token rejected
        → HIPAA §164.312(d) - Authentication

SEC-002 → @NamedQuery with :params
        → SAST scan (Snyk, SonarQube)
        → OWASP A03 - Injection

SEC-003 → PhiLogFilter.java
        → Unit test: verify PHI patterns masked
        → HIPAA §164.312(b) - Audit Controls

SEC-004 → pgAudit + AuditInterceptor.java
        → Integration test: verify audit entry created
        → HIPAA §164.312(b) - Audit Controls
```

## 7. Threat Modeling Tools and Templates

### 7.1. Tools

- **Microsoft Threat Modeling Tool**: Free, STRIDE-based, DFD editor
- **OWASP Threat Dragon**: Open-source, web-based
- **IriusRisk**: Enterprise threat modeling platform
- **draw.io**: Data Flow Diagrams (free)

### 7.2. Threat Model Document Template

```markdown
# Threat Model: [System/Service Name]
## Version: [1.0] | Date: [2026-04-03] | Author: [Security Team]

### 1. System Description
- Purpose: [What does the system do?]
- Technology Stack: [Quarkus, PostgreSQL, Keycloak]
- Data Classification: [Level 3 - Confidential]

### 2. Architecture Diagram
[Include DFD with trust boundaries]

### 3. Assets
[List sensitive data and components]

### 4. Threat Enumeration (STRIDE)
[Table of all identified threats]

### 5. DREAD Scoring
[Risk prioritization]

### 6. Mitigations
[Countermeasures for each threat]

### 7. Security Requirements
[Generated requirements with traceability]

### 8. Action Items
[Prioritized list of security work items]

### 9. Review Schedule
[Next review date and trigger conditions]
```

## 8. Summary

In this lesson, we have:

- Understand and apply **STRIDE** to classify threats for healthcare microservices
- Use **DREAD** scoring to prioritize threats
- Build **Attack Trees** for healthcare-specific scenarios
- Mapping **OWASP Top 10** into medical context with specific mitigations
- Convert threats into **Security Requirements** that can be implemented and tested

## Exercise

1. Perform a full STRIDE analysis for Prescription Service (medication prescription)
2. Build an Attack Tree for the "Modify Lab Results" scenario with DREAD scoring
3. Create a Security Requirements Traceability Matrix for the 10 most important requirements
4. Use OWASP Threat Dragon to draw Data Flow Diagram for Patient Service

---

---

<!-- SERIES-NAV:START -->
| ◀ Previous article | Next article ▶ |
|:---|---:|
| [Lesson 3: Classification of Health Data (PHI/ePHI) and Risk Assessment](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-3-phan-loai-du-lieu-y-te-phi-va-danh-gia-rui-ro) | [Lesson 5: Designing Keycloak Realm for Medical standards - Multi-tenancy for Hospitals](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-5-thiet-ke-keycloak-realm-chuan-y-te) |
<!-- SERIES-NAV:END -->
