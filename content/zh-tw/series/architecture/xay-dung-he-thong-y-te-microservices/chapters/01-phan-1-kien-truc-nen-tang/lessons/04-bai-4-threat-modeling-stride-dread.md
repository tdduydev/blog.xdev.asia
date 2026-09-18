---
id: 019e1a40-a104-7001-d001-f0a1b2c30104
title: 第 4 課：醫療保健系統的威脅建模 STRIDE/DREAD
slug: bai-4-threat-modeling-stride-dread
description: >-
  將威脅建模應用於醫療保健系統：STRIDE（欺騙、篡改、否認、資訊外洩、DoS、特權提升）、DREAD
  評分、攻擊樹、醫療保健微服務的資料流程圖、醫療保健環境中的 OWASP Top 10 以及根據威脅模型建立安全要求。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 4
section_title: 第 1 部分：架構與平台
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: 建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🏗️ 建築 — 第 4 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 4 課：系統威脅建模 STRIDE/DREAD</tspan>
      <tspan x="60" dy="42">衛生系統</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 1 部分：架構與平台</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 1.什麼是威脅建模？

![微服務醫療系統的威脅建模 STRIDE](/storage/uploads/2026/04/healthcare-threat-model-stride.webp)

**威脅建模**是識別、評估系統潛在安全威脅並確定其優先順序的系統流程。在醫療保健領域，威脅建模尤其重要，因為攻擊的後果不僅僅是丟失數據，它還可能影響**患者的生活**。

### 1.1。威脅建模過程

![6 步驟威脅建模流程 — 從定義範圍到驗證和迭代](/storage/uploads/2026/04/healthcare-threat-modeling-process.webp)

### 1.2。什麼時候需要威脅建模？

- **新系統設計**（HIS、EMR、LIS）
- **為現有系統新增新的微服務**
- **架構變化**（例如從整體轉向微服務）
- **外部系統整合**（實驗室儀器、保險 API）
- **定期審查**（6 個月或每次主要發布後）

## 2. STRIDE 威脅模型

### 2.1。概覽 跨步

STRIDE是微軟開發的威脅分類框架：

|信|威脅|侵害財產|健康方面的例子|
|--------|--------|--------------------|--------------------|
| **S** |欺騙 |認證|冒充醫生存取病患記錄 |
| **T** |篡改 |誠信|修改資料庫中的測試結果 |
| **R** |否認|不可否認性|醫生否認開錯藥|
| **我** |資訊公開|保密 |洩漏的愛滋病患者名單|
| **D** |拒絕服務 |可用性 | DDoS 攻擊導致緊急系統停止運作 |
| **E** |特權提升|授權|護理師可以存取管理員|功能

### 2.2。醫療保健微服務的 STRIDE 分析

#### S - 欺騙（身分欺騙）

![欺騙攻擊－欺騙 JWT 令牌存取病患 API 和預防措施](/storage/uploads/2026/04/healthcare-stride-spoofing-attack.webp)

**威脅：** 攻擊者偽造 JWT 令牌來存取病患 API

**攻擊向量：**

1.從瀏覽器localStorage竊取JWT
2. 使用修改後的聲明偽造 JWT（角色：“admin”）
3. 重播過期的令牌

**受影響的組件：** API 閘道、病患服務、臨床服務

**緩解措施：**

- **M1:** Keycloak OIDC 令牌驗證 — quarkus-oidc 自動驗證簽名
- **M2：** 短期存取權杖（5 分鐘）— 減少令牌竊盜窗口
- **M3:** DPoP（所有權證明）— 綁定到客戶端憑證的令牌
- **M4:** 刷新令牌輪換 — 一次使用刷新令牌
- **M5:** 服務之間的 mTLS — 服務驗證

#### T - 篡改（資料篡改）

![篡改攻擊－內部人員篡改測試結果和資料完整性措施](/storage/uploads/2026/04/healthcare-stride-tampering-integrity.webp)

**威脅：** 內部人員修改了 lab_db 中的測試結果

**攻擊向量：**

1. DBA直接UPDATE lab_results表
2.利用SQL注入修改數據
3. 攔截並修改API回應

**緩解措施：**

- **M1:** pgAudit 日誌記錄（記錄所有 DML）
- **M2：** 用於更改追蹤的資料庫觸發器
- **M3：** 實驗室結果的數位簽名
- **M4:** 不可變的審核日誌（僅附加）
- **M5：** 關鍵變化的雙重控制
- **M6：** 帶校驗和的行版本控制

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

#### I-資訊揭露

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

#### D - 拒絕服務

![DoS 緩解 — 為醫療保健系統提供 7 層反 DDoS 保護](/storage/uploads/2026/04/healthcare-stride-dos-mitigation.webp)

**威脅：** DDoS 攻擊導致緊急系統停止運作

**對醫療保健的影響：**

- 無法查詢藥物過敏→處方錯誤→危險
- 無法進入實驗室結果 → 診斷緩慢
- 預約系統故障→病人無法前來檢查

**緩解措施：**

- **M1:** API 閘道的速率限制
- **M2：** 斷路器（Quarkus 容錯）
- **M3：** 自動縮放 Kubernetes Pod
- **M4：** CDN/WAF（Cloudflare、AWS Shield）
- **M5:** 資料庫連線池
- **M6：** 回退模式/離線功能
- **M7：** ER 請求優先排隊

#### E - 特權提升

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

## 3. 可怕的評分

### 3.1。恐懼因素

|因素 |描述 | 1（低）| 5（中）| 10（高）|
|--------|-------------|--------|-------------|------------|
| **D**圖片|損壞程度|小數據曝光 |嚴重資料遺失 |完整的系統妥協|
| **R**可生產性|易於重現|困難，需要很多條件|需要認證 |易於重現|
| **E**可利用性 |容易被利用 |需要高專業知識|需要工具|腳本小子等級 |
| **A**受影響的使用者 |受影響人數 |部分使用者|一個部門|所有病患|
| **D**可發現性 |輕鬆檢測漏洞 |很難找|需要努力|眾所周知 |

### 3.2。醫療保健威脅的 DREAD 分析

|威脅| d |右 |電子|一個 | d |總計 |優先事項 |
|--------|---|---|---|---|---|--------|------------|
|病患搜尋中的 SQL 注入10 | 10 8 | 7 | 10 | 10 8 | **8.6** |關鍵 |
|經 XSS 竊取代幣 | 8 | 7 | 6 | 8 | 7 | **7.2** |高|
|內部 PHI 存取 | 9 | 9 | 5 | 7 | 4 | **6.8** |高|
| ER 系統上的 DDoS | 7 | 10 | 10 8 | 10 | 10 9 | **8.8** |關鍵 |
|未打補丁的 Quarkus CVE | 8 | 6 | 7 | 10 | 10 8 | **7.8** |高|
|備份資料被竊| 10 | 10 3 | 4 | 10 | 10 3 | **6.0** |中 |

> **恐懼分數**：總和 / 5。分數 > 7 = 嚴重，5-7 = 高，3-5 = 中， < 3 = Low

## 4. OWASP Top 10 trong Healthcare Context

### 4.1. Mapping OWASP Top 10 cho Healthcare Microservices

| # | OWASP Vulnerability | Healthcare Impact | Quarkus/PostgreSQL/Keycloak Mitigation |
|---|---------------------|-------------------|----------------------------------------|
| A01 |存取控制被破壞 |護理師審查病人的精神記錄| Keycloak RBAC + PostgreSQL RLS | Keycloak RBAC + PostgreSQL RLS | Keycloak RBAC + PostgreSQL RLS |
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

![攻擊樹 — 透過 DREAD 分數竊取受害者記錄的攻擊向量](/storage/uploads/2026/04/healthcare-attack-tree.webp)

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

## 6. 從威脅模型到安全要求

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

## 7. 威脅建模工具與模板

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

## 8. 總結

在本課中，我們有：

- 了解並應用 **STRIDE** 對醫療保健微服務的威脅進行分類
- 使用 **DREAD** 評分來確定威脅的優先級
- 為醫療保健特定場景建立**攻擊樹**
- 將 **OWASP Top 10** 映射到醫療環境中並採取具體的緩解措施
- 將威脅轉化為可以實施和測試的**安全要求**

＃＃ 鍛煉

1. 對處方服務（藥物處方）執行完整的 STRIDE 分析
2. 使用 DREAD 評分為「修改實驗室結果」情境建構攻擊樹
3. 為 10 個最重要的需求創建安全需求可追溯性矩陣
4. 使用 OWASP Threat Dragon 繪製病患服務資料流程圖

---

---

<!-- SERIES-NAV:START -->
| ◀ 上一篇 |下一篇文章 ▶ |
|:---|---:|
| [第 3 課：健康資料分類 (PHI/ePHI) 與風險評估](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-3-phan-loai-du-lieu-y-te-phi-va-danh-gia-rui-ro) | [第 5 課：根據醫療標準設計 Keycloak Realm - 醫院多租戶](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-5-thiet-ke-keycloak-realm-chuan-y-te) |
<!-- SERIES-NAV:END -->
