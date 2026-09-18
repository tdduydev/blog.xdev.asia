---
id: 019e1a40-a117-7001-d001-f0a1b2c30117
title: 第 17 課：HIPAA 技術保障 — 實施清單
slug: bai-17-hipaa-technical-safeguards
description: >-
  全面部署 HIPAA 技術保障：存取控制（唯一使用者 ID、緊急存取、自動登出、加密）、審核控制（硬體、軟體、程式機制）、完整性控制（ePHI
  驗證）、人員身分驗證和傳輸安全。使用 Quarkus、PostgreSQL、Keycloak 將每個需求對應到特定實作。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 17
section_title: 第 5 部分：合規性、稽核與資料保護
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: 建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-7407" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-7407)"/>

  <!-- Decorations -->
  <g>
    <circle cx="839" cy="47" r="32" fill="#818cf8" opacity="0.12000000000000001"/>
    <circle cx="1078" cy="226" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="817" cy="145" r="26" fill="#818cf8" opacity="0.060000000000000005"/>
    <circle cx="1056" cy="64" r="23" fill="#818cf8" opacity="0.13"/>
    <circle cx="795" cy="243" r="20" fill="#818cf8" opacity="0.1"/>
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
    <line x1="600" y1="197" x2="1100" y2="277" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="227" x2="1050" y2="297" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1074.712812921102,231 1074.712812921102,263 1047,279 1019.287187078898,263 1019.287187078898,231 1047,215" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 17 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 17 課：HIPAA 技術保障 —</tspan>
      <tspan x="60" dy="42">部署清單</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 5 部分：合規性、稽核與資料保護</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 1. HIPAA 安全規則概述 §164.312

![HIPAA Security Rule — Administrative, Physical, Technical Safeguards](/storage/uploads/2026/04/healthcare-hipaa-security-rule.webp)

HIPAA 安全規則要求處理 ePHI（電子受保護健康資訊）的組織實施**技術保障** — 保護電子健康資料的技術措施。這對於開發人員和工程師來說是最重要的部分。

### 1.1。 HIPAA 安全規則結構

**HIPAA 安全規則 §164.302-318：**

- **§164.308 行政保障**
  - 風險分析
  - 勞動力安全
  - 資訊存取管理
  - 安全意識培訓
  - 安全事故處理程序
  - 緊急應變計劃
  - 評價
- **§164.310 實體保障**
  - 設施門禁控制
  - 工作站使用和安全
  - 設備和媒體控制
- **§164.312 技術保障** ← **此貼文**
  - 存取控制（§164.312(a)）
  - 審計控制（§164.312(b)）
  - 完整性控制（§164.312(c)）
  - 個人/實體身分驗證（§164.312(d)）
  - 傳輸安全（§164.312(e)）
- **§164.314 組織要求**
  - 商業夥伴協議 (BAA)
  - 團體健康計畫要求

### 1.2。必需與可尋址

HIPAA 將實施規範分為兩類：

|類型 |意義|行動|
|--------|---------|------------|
| **必需 (R)** |必須實施，無一例外 |必須執行規範|
| **可尋址 (A)** |如果合理，必須進行評估和實施 如果不實施，必須記錄原因和替代措施 |

> **重要**：「可尋址」並不意味著「可選」。組織必須評估、實施或記錄替代方案。

## 2. 存取控制 — §164.312(a)(1)

標準：對維護 ePHI 的電子資訊系統實施技術政策和程序，僅允許那些已被授予存取權限的人員或軟體程式進行存取。

### 2.1。唯一使用者識別 — §164.312(a)(2)(i) [必需]

> *「指派唯一的名稱和/或號碼以識別和追蹤使用者身分。」*

**使用Keycloak實作：**

```java
package vn.hospital.compliance.access;

import io.quarkus.security.identity.SecurityIdentity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.logging.Logger;

/**
 * HIPAA §164.312(a)(2)(i) - Unique User Identification
 * Mỗi user phải có unique identifier để tracking.
 */
@ApplicationScoped
public class UniqueUserIdentificationService {

    private static final Logger LOG = Logger.getLogger(UniqueUserIdentificationService.class);

    @Inject
    JsonWebToken jwt;

    @Inject
    SecurityIdentity identity;

    /**
     * Lấy unique user ID từ JWT token (Keycloak sub claim).
     * Format: UUID assigned bởi Keycloak, không trùng lặp.
     */
    public String getUniqueUserId() {
        String userId = jwt.getSubject(); // Keycloak UUID
        if (userId == null || userId.isBlank()) {
            throw new SecurityException("HIPAA Violation: No unique user ID in token");
        }
        return userId;
    }

    /**
     * Lấy username (preferred_username) cho audit display.
     */
    public String getUsername() {
        return jwt.getClaim("preferred_username");
    }

    /**
     * Lấy toàn bộ user context cho audit trail.
     */
    public UserAuditContext getAuditContext() {
        return new UserAuditContext(
            jwt.getSubject(),
            jwt.getClaim("preferred_username"),
            jwt.getClaim("email"),
            jwt.getGroups(),
            jwt.getClaim("department"),
            jwt.getClaim("facility_id"),
            jwt.getIssuedAtTime(),
            jwt.getExpirationTime()
        );
    }
}
```

**Keycloak領域配置：**

```json
{
  "realm": "healthcare",
  "registrationAllowed": false,
  "editUsernameAllowed": false,
  "duplicateEmailsAllowed": false,
  "loginWithEmailAllowed": false,
  "attributes": {
    "userProfileEnabled": "true"
  },
  "users": [
    {
      "username": "dr.nguyen",
      "enabled": true,
      "email": "dr.nguyen@hospital.vn",
      "firstName": "Nguyễn",
      "lastName": "Văn A",
      "attributes": {
        "employee_id": ["EMP-2024-0001"],
        "department": ["cardiology"],
        "facility_id": ["HOSP-HCM-01"],
        "npi_number": ["1234567890"],
        "license_number": ["VN-MD-2020-12345"]
      },
      "credentials": [
        {
          "type": "password",
          "value": "CHANGE_ME",
          "temporary": true
        }
      ],
      "requiredActions": ["UPDATE_PASSWORD", "CONFIGURE_TOTP"],
      "realmRoles": ["physician"],
      "clientRoles": {
        "patient-service": ["patient_read", "patient_write"],
        "lab-service": ["lab_order", "lab_read"]
      }
    }
  ]
}
```

### 2.2。緊急存取程序 — §164.312(a)(2)(ii) [必需]

> *「建立（並根據需要實施）程序以在緊急情況下獲取必要的 ePHI。」*

```java
package vn.hospital.compliance.access;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import org.jboss.logging.Logger;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

/**
 * HIPAA §164.312(a)(2)(ii) - Emergency Access Procedure
 * "Break the Glass" mechanism cho trường hợp khẩn cấp.
 */
@ApplicationScoped
public class EmergencyAccessService {

    private static final Logger LOG = Logger.getLogger(EmergencyAccessService.class);
    private static final Duration EMERGENCY_ACCESS_DURATION = Duration.ofHours(4);

    @Inject
    EntityManager entityManager;

    @Inject
    AuditService auditService;

    @Inject
    NotificationService notificationService;

    /**
     * "Break the Glass" - cấp quyền truy cập khẩn cấp.
     * Automatic audit + notification cho Privacy Officer.
     */
    @Transactional
    public EmergencyAccessGrant grantEmergencyAccess(EmergencyAccessRequest request) {
        // 1. Validate request
        validateEmergencyRequest(request);

        // 2. Create emergency access grant
        EmergencyAccessGrant grant = new EmergencyAccessGrant();
        grant.setId(UUID.randomUUID());
        grant.setUserId(request.getUserId());
        grant.setPatientId(request.getPatientId());
        grant.setReason(request.getReason());
        grant.setEmergencyType(request.getEmergencyType());
        grant.setGrantedAt(Instant.now());
        grant.setExpiresAt(Instant.now().plus(EMERGENCY_ACCESS_DURATION));
        grant.setActive(true);

        entityManager.persist(grant);

        // 3. Audit log - CRITICAL priority
        auditService.logEmergencyAccess(
            request.getUserId(),
            request.getPatientId(),
            request.getReason(),
            request.getEmergencyType(),
            grant.getId()
        );

        // 4. Notify Privacy Officer và Security Team
        notificationService.notifyEmergencyAccess(grant);

        LOG.warnf("EMERGENCY ACCESS GRANTED: User=%s, Patient=%s, Reason=%s, Grant=%s",
            request.getUserId(), request.getPatientId(),
            request.getReason(), grant.getId());

        return grant;
    }

    /**
     * Kiểm tra user có emergency access đang active không.
     */
    public boolean hasActiveEmergencyAccess(String userId, UUID patientId) {
        Long count = entityManager.createQuery(
            "SELECT COUNT(g) FROM EmergencyAccessGrant g " +
            "WHERE g.userId = :userId AND g.patientId = :patientId " +
            "AND g.active = true AND g.expiresAt > :now",
            Long.class)
            .setParameter("userId", userId)
            .setParameter("patientId", patientId)
            .setParameter("now", Instant.now())
            .getSingleResult();
        return count > 0;
    }

    /**
     * Revoke emergency access (sau khi tình huống khẩn cấp kết thúc).
     */
    @Transactional
    public void revokeEmergencyAccess(UUID grantId, String revokedBy, String reason) {
        EmergencyAccessGrant grant = entityManager.find(EmergencyAccessGrant.class, grantId);
        if (grant != null && grant.isActive()) {
            grant.setActive(false);
            grant.setRevokedAt(Instant.now());
            grant.setRevokedBy(revokedBy);
            grant.setRevocationReason(reason);

            auditService.logEmergencyAccessRevoked(grantId, revokedBy, reason);
        }
    }

    private void validateEmergencyRequest(EmergencyAccessRequest request) {
        if (request.getReason() == null || request.getReason().length() < 20) {
            throw new IllegalArgumentException(
                "Emergency access reason must be detailed (min 20 characters)");
        }
        if (request.getEmergencyType() == null) {
            throw new IllegalArgumentException("Emergency type is required");
        }
    }
}
```

**緊急訪問補助金實體：**

```java
@Entity
@Table(name = "emergency_access_grants", schema = "compliance")
public class EmergencyAccessGrant {

    @Id
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "patient_id", nullable = false)
    private UUID patientId;

    @Column(name = "reason", nullable = false, columnDefinition = "TEXT")
    private String reason;

    @Column(name = "emergency_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private EmergencyType emergencyType;

    @Column(name = "granted_at", nullable = false)
    private Instant grantedAt;

    @Column(name = "expires_at", nullable = false)
    private Instant expiresAt;

    @Column(name = "active", nullable = false)
    private boolean active;

    @Column(name = "revoked_at")
    private Instant revokedAt;

    @Column(name = "revoked_by")
    private String revokedBy;

    @Column(name = "revocation_reason")
    private String revocationReason;

    // Getters, setters omitted
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public UUID getPatientId() { return patientId; }
    public void setPatientId(UUID patientId) { this.patientId = patientId; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    public EmergencyType getEmergencyType() { return emergencyType; }
    public void setEmergencyType(EmergencyType emergencyType) { this.emergencyType = emergencyType; }
    public Instant getGrantedAt() { return grantedAt; }
    public void setGrantedAt(Instant grantedAt) { this.grantedAt = grantedAt; }
    public Instant getExpiresAt() { return expiresAt; }
    public void setExpiresAt(Instant expiresAt) { this.expiresAt = expiresAt; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public void setRevokedAt(Instant revokedAt) { this.revokedAt = revokedAt; }
    public void setRevokedBy(String revokedBy) { this.revokedBy = revokedBy; }
    public void setRevocationReason(String reason) { this.revocationReason = reason; }
}

enum EmergencyType {
    LIFE_THREATENING,        // Tình huống đe dọa tính mạng
    NATURAL_DISASTER,        // Thiên tai
    SYSTEM_FAILURE,          // Sự cố hệ thống
    PUBLIC_HEALTH_EMERGENCY  // Dịch bệnh
}
```

### 2.3。自動註銷 — §164.312(a)(2)(iii) [可尋址]

> *“實施電子程序，在預定的不活動時間後終止電子會話。”*

**Keycloak 會話配置：**

```json
{
  "realm": "healthcare",
  "ssoSessionIdleTimeout": 900,
  "ssoSessionMaxLifespan": 28800,
  "accessTokenLifespan": 300,
  "accessTokenLifespanForImplicitFlow": 300,
  "offlineSessionIdleTimeout": 2592000,
  "offlineSessionMaxLifespan": 5184000,
  "clientSessionIdleTimeout": 900,
  "clientSessionMaxLifespan": 28800,
  "actionTokenGeneratedByUserLifespan": 300
}
```

|設定|價值|意義|
|--------|---------|---------|
| `ssoSessionIdleTimeout` | 900 秒（15 分鐘）| 15 分鐘不活動後會話自動過期 |
| `ssoSessionMaxLifespan` | 28800秒（8小時）|最長會話 8 小時（1 班）|
| `accessTokenLifespan` | 300 秒（5 分鐘）|縮短存取權令牌以減少暴露視窗 |
| `actionTokenGeneratedByUserLifespan` | 300 年代 |重設密碼、驗證電子郵件的令牌 |

**Quarkus OIDC 令牌刷新：**

```properties
# application.properties - Session management
quarkus.oidc.token.refresh-expired=true
quarkus.oidc.token.refresh-token-time-skew=10S
quarkus.oidc.token.lifespan-grace=5
quarkus.oidc.logout.path=/api/v1/logout
quarkus.oidc.logout.post-logout-path=/
```

### 2.4。加密與解密 — §164.312(a)(2)(iv) [可尋址]

> *「實施加密解密 ePHI 的機制。」*

第 15 課（端對端加密）中詳細部署。實施概要：

|元件|加密方式 |金鑰管理|
|----------|----------|----------------|
|資料庫列 (PHI) |透過 Vault Transit 的 AES-256-GCM | HashiCorp Vault KEK |
|服務間通訊| JWE（RSA-OAEP-256 + A256GCM）| Vault KV 引擎 |
|卡夫卡訊息|信封加密（DEK + KEK）|避難所運輸 |
|靜態資料庫 | PostgreSQL TDE 或磁碟加密 |作業系統/雲端KMS |
|備份|透過 pgBackRest 的 AES-256-CBC |單獨的備份金鑰|
|交通 | TLS 1.3 |憑證授權單位 |

## 3. 審計控制 — §164.312(b)

### 3.1。標準【必填】

> *「實施硬體、軟體和/或程式機制來記錄和檢查包含或使用 ePHI 的資訊系統中的活動。」*

```java
package vn.hospital.compliance.audit;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.jboss.logging.Logger;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

/**
 * HIPAA §164.312(b) - Audit Controls
 * Record and examine all ePHI access activity.
 */
@ApplicationScoped
public class HipaaAuditService {

    private static final Logger LOG = Logger.getLogger(HipaaAuditService.class);

    @Inject
    EntityManager entityManager;

    /**
     * Log mọi access event vào audit trail.
     * HIPAA yêu cầu: WHO, WHAT, WHEN, WHERE, WHY.
     */
    @Transactional
    public void logAccess(AuditEvent event) {
        AuditLogEntry entry = new AuditLogEntry();
        entry.setId(UUID.randomUUID());
        entry.setTimestamp(Instant.now());

        // WHO - Unique User Identification
        entry.setUserId(event.getUserId());
        entry.setUsername(event.getUsername());
        entry.setUserRole(event.getUserRole());
        entry.setDepartment(event.getDepartment());

        // WHAT - Action performed
        entry.setAction(event.getAction());
        entry.setResourceType(event.getResourceType());
        entry.setResourceId(event.getResourceId());

        // WHEN - Timestamp (UTC)
        entry.setTimestamp(Instant.now());

        // WHERE - Source information
        entry.setSourceIp(event.getSourceIp());
        entry.setUserAgent(event.getUserAgent());
        entry.setServiceName(event.getServiceName());

        // WHY - Reason/context
        entry.setReason(event.getReason());
        entry.setEmergencyAccess(event.isEmergencyAccess());

        // Result
        entry.setOutcome(event.getOutcome());
        entry.setErrorMessage(event.getErrorMessage());

        entityManager.persist(entry);

        // Structured log cho ELK
        LOG.infof("AUDIT: action=%s user=%s resource=%s/%s outcome=%s",
            event.getAction(), event.getUsername(),
            event.getResourceType(), event.getResourceId(),
            event.getOutcome());
    }
}
```

**審核日誌實體：**

```java
@Entity
@Table(name = "audit_logs", schema = "compliance",
    indexes = {
        @Index(name = "idx_audit_timestamp", columnList = "timestamp"),
        @Index(name = "idx_audit_user", columnList = "user_id"),
        @Index(name = "idx_audit_resource", columnList = "resource_type, resource_id"),
        @Index(name = "idx_audit_action", columnList = "action")
    })
public class AuditLogEntry {

    @Id
    private UUID id;

    @Column(nullable = false)
    private Instant timestamp;

    // WHO
    @Column(name = "user_id", nullable = false)
    private String userId;
    @Column(nullable = false)
    private String username;
    @Column(name = "user_role")
    private String userRole;
    @Column
    private String department;

    // WHAT
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AuditAction action;
    @Column(name = "resource_type", nullable = false)
    private String resourceType;
    @Column(name = "resource_id")
    private String resourceId;

    // WHERE
    @Column(name = "source_ip")
    private String sourceIp;
    @Column(name = "user_agent")
    private String userAgent;
    @Column(name = "service_name")
    private String serviceName;

    // WHY
    @Column
    private String reason;
    @Column(name = "emergency_access")
    private boolean emergencyAccess;

    // RESULT
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AuditOutcome outcome;
    @Column(name = "error_message")
    private String errorMessage;

    // Getters, setters omitted
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getUserRole() { return userRole; }
    public void setUserRole(String userRole) { this.userRole = userRole; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public AuditAction getAction() { return action; }
    public void setAction(AuditAction action) { this.action = action; }
    public String getResourceType() { return resourceType; }
    public void setResourceType(String resourceType) { this.resourceType = resourceType; }
    public String getResourceId() { return resourceId; }
    public void setResourceId(String resourceId) { this.resourceId = resourceId; }
    public String getSourceIp() { return sourceIp; }
    public void setSourceIp(String sourceIp) { this.sourceIp = sourceIp; }
    public String getUserAgent() { return userAgent; }
    public void setUserAgent(String userAgent) { this.userAgent = userAgent; }
    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    public boolean isEmergencyAccess() { return emergencyAccess; }
    public void setEmergencyAccess(boolean emergencyAccess) { this.emergencyAccess = emergencyAccess; }
    public AuditOutcome getOutcome() { return outcome; }
    public void setOutcome(AuditOutcome outcome) { this.outcome = outcome; }
    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }
}

enum AuditAction {
    CREATE, READ, UPDATE, DELETE,
    LOGIN, LOGOUT, LOGIN_FAILED,
    EXPORT, PRINT, DOWNLOAD,
    EMERGENCY_ACCESS, PERMISSION_CHANGE,
    ENCRYPTION, DECRYPTION,
    BACKUP, RESTORE
}

enum AuditOutcome {
    SUCCESS, FAILURE, DENIED, ERROR
}
```

**用於自動審核的 JAX-RS 過濾器：**

```java
package vn.hospital.compliance.audit;

import jakarta.annotation.Priority;
import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.ext.Provider;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.io.IOException;

/**
 * Automatic audit logging cho mọi API request liên quan đến PHI.
 */
@Provider
@Priority(100)
public class AuditRequestFilter implements ContainerRequestFilter, ContainerResponseFilter {

    @Inject
    HipaaAuditService auditService;

    @Inject
    JsonWebToken jwt;

    @Override
    public void filter(ContainerRequestContext request) throws IOException {
        // Store start time cho response timing
        request.setProperty("audit.startTime", System.currentTimeMillis());
    }

    @Override
    public void filter(ContainerRequestContext request,
                       ContainerResponseContext response) throws IOException {
        String path = request.getUriInfo().getPath();

        // Chỉ audit PHI-related endpoints
        if (!isPhiEndpoint(path)) return;

        AuditAction action = mapHttpMethodToAction(request.getMethod());
        AuditOutcome outcome = response.getStatus() < 400
            ? AuditOutcome.SUCCESS
            : (response.getStatus() == 403 ? AuditOutcome.DENIED : AuditOutcome.FAILURE);

        AuditEvent event = new AuditEvent();
        event.setUserId(jwt.getSubject());
        event.setUsername(jwt.getClaim("preferred_username"));
        event.setUserRole(String.join(",", jwt.getGroups()));
        event.setDepartment(jwt.getClaim("department"));
        event.setAction(action);
        event.setResourceType(extractResourceType(path));
        event.setResourceId(extractResourceId(path));
        event.setSourceIp(request.getHeaderString("X-Forwarded-For"));
        event.setUserAgent(request.getHeaderString("User-Agent"));
        event.setServiceName("patient-service");
        event.setOutcome(outcome);

        auditService.logAccess(event);
    }

    private boolean isPhiEndpoint(String path) {
        return path.startsWith("api/v1/patients")
            || path.startsWith("api/v1/medical-records")
            || path.startsWith("api/v1/lab-results")
            || path.startsWith("api/v1/prescriptions");
    }

    private AuditAction mapHttpMethodToAction(String method) {
        return switch (method) {
            case "GET" -> AuditAction.READ;
            case "POST" -> AuditAction.CREATE;
            case "PUT", "PATCH" -> AuditAction.UPDATE;
            case "DELETE" -> AuditAction.DELETE;
            default -> AuditAction.READ;
        };
    }

    private String extractResourceType(String path) {
        String[] parts = path.split("/");
        return parts.length >= 3 ? parts[2] : "unknown";
    }

    private String extractResourceId(String path) {
        String[] parts = path.split("/");
        return parts.length >= 4 ? parts[3] : null;
    }
}
```

### 3.2。稽核日誌的 SQL 架構

```sql
-- Schema cho HIPAA Audit Trail
CREATE SCHEMA IF NOT EXISTS compliance;

CREATE TABLE compliance.audit_logs (
    id              UUID PRIMARY KEY,
    timestamp       TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- WHO
    user_id         VARCHAR(255) NOT NULL,
    username        VARCHAR(255) NOT NULL,
    user_role       VARCHAR(500),
    department      VARCHAR(100),

    -- WHAT
    action          VARCHAR(50) NOT NULL,
    resource_type   VARCHAR(100) NOT NULL,
    resource_id     VARCHAR(255),

    -- WHERE
    source_ip       VARCHAR(45),
    user_agent      TEXT,
    service_name    VARCHAR(100),

    -- WHY
    reason          TEXT,
    emergency_access BOOLEAN DEFAULT FALSE,

    -- RESULT
    outcome         VARCHAR(20) NOT NULL,
    error_message   TEXT
) PARTITION BY RANGE (timestamp);

-- Partition theo tháng cho performance
CREATE TABLE compliance.audit_logs_2024_01
    PARTITION OF compliance.audit_logs
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE compliance.audit_logs_2024_02
    PARTITION OF compliance.audit_logs
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');

-- Index cho queries thường dùng
CREATE INDEX idx_audit_timestamp ON compliance.audit_logs (timestamp);
CREATE INDEX idx_audit_user_id ON compliance.audit_logs (user_id);
CREATE INDEX idx_audit_resource ON compliance.audit_logs (resource_type, resource_id);
CREATE INDEX idx_audit_action ON compliance.audit_logs (action);
CREATE INDEX idx_audit_outcome ON compliance.audit_logs (outcome);

-- HIPAA yêu cầu giữ audit logs tối thiểu 6 năm
-- KHÔNG DELETE audit logs trong 6 năm
-- Sử dụng tablespace riêng cho audit data

-- Prevent deletion of audit records
REVOKE DELETE ON compliance.audit_logs FROM PUBLIC;
-- Chỉ superuser mới được DELETE (và phải theo retention policy)
```

## 4. 完整性控制 — §164.312(c)(1)

### 4.1。標準【必填】

> *「實施政策和程序以保護 ePHI 免受不當更改或破壞。」*

### 4.2。 ePHI 驗證機制 — §164.312(c)(2) [可尋址]

> *「實施電子機制以證實 ePHI 未被以未經授權的方式更改或銷毀。」*

```java
package vn.hospital.compliance.integrity;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;

/**
 * HIPAA §164.312(c)(2) - ePHI Integrity Verification
 * Đảm bảo dữ liệu không bị sửa đổi trái phép.
 */
@ApplicationScoped
public class EphiIntegrityService {

    private static final Logger LOG = Logger.getLogger(EphiIntegrityService.class);
    private static final String HMAC_ALGORITHM = "HmacSHA256";

    @Inject
    @io.quarkus.vault.runtime.config.VaultConfigSource
    String integrityKey; // Lấy từ Vault

    /**
     * Tính HMAC-SHA256 cho record integrity verification.
     * HMAC bao gồm tất cả PHI fields + metadata.
     */
    public String computeRecordHmac(PatientRecord record) {
        try {
            String dataToSign = String.join("|",
                record.getId().toString(),
                record.getMrn(),
                record.getFullName(),
                record.getSsn() != null ? record.getSsn() : "",
                record.getDateOfBirth() != null ? record.getDateOfBirth() : "",
                record.getDiagnosisCodes() != null ? record.getDiagnosisCodes() : "",
                record.getLastModifiedBy(),
                record.getLastModifiedAt().toString()
            );

            Mac mac = Mac.getInstance(HMAC_ALGORITHM);
            SecretKeySpec keySpec = new SecretKeySpec(
                integrityKey.getBytes(StandardCharsets.UTF_8), HMAC_ALGORITHM);
            mac.init(keySpec);
            byte[] hmacBytes = mac.doFinal(dataToSign.getBytes(StandardCharsets.UTF_8));

            return Base64.getEncoder().encodeToString(hmacBytes);
        } catch (Exception e) {
            throw new RuntimeException("HMAC computation failed", e);
        }
    }

    /**
     * Verify record integrity - so sánh stored HMAC với computed HMAC.
     */
    public boolean verifyRecordIntegrity(PatientRecord record) {
        String storedHmac = record.getIntegrityHash();
        if (storedHmac == null) {
            LOG.warnf("No integrity hash for record: %s", record.getId());
            return false;
        }

        String computedHmac = computeRecordHmac(record);
        return MessageDigest.isEqual(
            storedHmac.getBytes(StandardCharsets.UTF_8),
            computedHmac.getBytes(StandardCharsets.UTF_8)
        );
    }
}
```

**用於完整性追蹤的 PostgreSQL 觸發器：**

```sql
-- Trigger function để track mọi thay đổi trên PHI records
CREATE OR REPLACE FUNCTION compliance.track_phi_changes()
RETURNS TRIGGER AS $$
DECLARE
    changes JSONB;
BEGIN
    -- Build changes JSON
    IF TG_OP = 'UPDATE' THEN
        changes = jsonb_build_object(
            'operation', 'UPDATE',
            'table_name', TG_TABLE_SCHEMA || '.' || TG_TABLE_NAME,
            'record_id', NEW.id,
            'old_values', to_jsonb(OLD),
            'new_values', to_jsonb(NEW),
            'changed_by', current_setting('app.current_user_id', true),
            'changed_at', NOW()
        );
    ELSIF TG_OP = 'DELETE' THEN
        changes = jsonb_build_object(
            'operation', 'DELETE',
            'table_name', TG_TABLE_SCHEMA || '.' || TG_TABLE_NAME,
            'record_id', OLD.id,
            'deleted_values', to_jsonb(OLD),
            'changed_by', current_setting('app.current_user_id', true),
            'changed_at', NOW()
        );
    ELSIF TG_OP = 'INSERT' THEN
        changes = jsonb_build_object(
            'operation', 'INSERT',
            'table_name', TG_TABLE_SCHEMA || '.' || TG_TABLE_NAME,
            'record_id', NEW.id,
            'new_values', to_jsonb(NEW),
            'changed_by', current_setting('app.current_user_id', true),
            'changed_at', NOW()
        );
    END IF;

    -- Insert vào change log (immutable)
    INSERT INTO compliance.data_change_log (id, change_data, created_at)
    VALUES (gen_random_uuid(), changes, NOW());

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Apply trigger cho patients table
CREATE TRIGGER trg_patients_phi_changes
    AFTER INSERT OR UPDATE OR DELETE ON healthcare.patients
    FOR EACH ROW EXECUTE FUNCTION compliance.track_phi_changes();

-- Change log table (append-only, no UPDATE/DELETE)
CREATE TABLE compliance.data_change_log (
    id          UUID PRIMARY KEY,
    change_data JSONB NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
) PARTITION BY RANGE (created_at);

REVOKE UPDATE, DELETE ON compliance.data_change_log FROM PUBLIC;
```

## 5. 個人或實體身分驗證 — §164.312(d)

### 5.1。標準【必填】

> *「實施程序以驗證尋求存取 ePHI 的個人或實體是否為所述個人或實體。」*

**使用 Keycloak 進行多重身份驗證：**

```json
{
  "realm": "healthcare",
  "browserFlow": "healthcare-browser-flow",
  "authenticationFlows": [
    {
      "alias": "healthcare-browser-flow",
      "description": "Healthcare MFA browser flow",
      "providerId": "basic-flow",
      "topLevel": true,
      "builtIn": false,
      "authenticationExecutions": [
        {
          "authenticatorFlow": false,
          "authenticator": "auth-cookie",
          "requirement": "ALTERNATIVE",
          "priority": 10
        },
        {
          "authenticatorFlow": true,
          "flowAlias": "healthcare-forms",
          "requirement": "ALTERNATIVE",
          "priority": 20
        }
      ]
    },
    {
      "alias": "healthcare-forms",
      "description": "Username/password + TOTP",
      "providerId": "basic-flow",
      "topLevel": false,
      "authenticationExecutions": [
        {
          "authenticator": "auth-username-password-form",
          "requirement": "REQUIRED",
          "priority": 10
        },
        {
          "authenticator": "auth-otp-form",
          "requirement": "REQUIRED",
          "priority": 20
        }
      ]
    }
  ],
  "requiredActions": [
    {
      "alias": "CONFIGURE_TOTP",
      "name": "Configure OTP",
      "providerId": "CONFIGURE_TOTP",
      "enabled": true,
      "defaultAction": true,
      "priority": 10
    }
  ],
  "otpPolicyType": "totp",
  "otpPolicyAlgorithm": "HmacSHA256",
  "otpPolicyDigits": 6,
  "otpPolicyPeriod": 30,
  "otpPolicyInitialCounter": 0,
  "bruteForceProtected": true,
  "maxFailureWaitSeconds": 900,
  "failureFactor": 5,
  "waitIncrementSeconds": 60,
  "maxDeltaTimeSeconds": 43200
}
```

|配置|價值| HIPAA 目的 |
|------------|---------|----------------|
|需要 MFA | TOTP（6 位數字，30 秒）|強身份認證 |
|暴力保護| 5 次失敗嘗試 → 15 分鐘鎖定 |防暴力破解 |
|密碼政策 |最少 12 個字元、大寫、數字、特殊 |強密碼 |
|會話逾時 |閒置 15 分鐘，最多 8 小時 |自動登出|
|帳號鎖定 | 5 次失敗的嘗試 |防止未經授權的存取 |

## 6. 傳輸安全 — §164.312(e)(1)

### 6.1。標準【必填】

> *「實施技術安全措施，防止對透過電子通訊網路傳輸的 ePHI 進行未經授權的存取。」*

### 6.2。完整性控制 — §164.312(e)(2)(i) [可尋址]

> *「實施安全措施，確保以電子方式傳輸的 ePHI 在處置之前不會在未被檢測到的情況下被不當修改。」*

### 6.3。加密 — §164.312(e)(2)(ii) [可尋址]

> *「只要認為合適，就實施一種加密 ePHI 的機制。」*

```properties
# application.properties - Transmission Security

# === TLS 1.3 Only ===
quarkus.http.ssl.protocols=TLSv1.3
quarkus.http.insecure-requests=disabled
quarkus.http.ssl-port=8443

# === Strong Cipher Suites ===
quarkus.http.ssl.cipher-suites=\
  TLS_AES_256_GCM_SHA384,\
  TLS_AES_128_GCM_SHA256,\
  TLS_CHACHA20_POLY1305_SHA256

# === HSTS Header ===
quarkus.http.header."Strict-Transport-Security".value=max-age=31536000; includeSubDomains; preload
quarkus.http.header."Strict-Transport-Security".path=/

# === Certificate Configuration ===
quarkus.http.ssl.certificate.key-store-file=${TLS_KEYSTORE_PATH}
quarkus.http.ssl.certificate.key-store-password=${TLS_KEYSTORE_PASSWORD}
quarkus.http.ssl.certificate.key-store-file-type=PKCS12

# === REST Client TLS ===
quarkus.rest-client."vn.hospital.client.LabServiceClient".trust-store=${TLS_TRUSTSTORE_PATH}
quarkus.rest-client."vn.hospital.client.LabServiceClient".trust-store-password=${TLS_TRUSTSTORE_PASSWORD}
```

## 7. 全面的合規矩陣

### 7.1。 HIPAA 技術保障合規矩陣

| § |保障|規格|收/收 |實施|狀態 |
|---|-----------|--------|-----|----------------|--------|
| 312(a)(1) | 312(a)(1)存取控制|標準|右 | Keycloak OIDC + Quarkus RBAC | |
| 312(a)(2)(i) | 312(a)(2)(i)唯一的使用者ID |規格|右 | Keycloak UUID（子宣告）| |
| 312(a)(2)(ii) | 312(a)(2)(ii)緊急通道 |規格|右 |打破玻璃服務 | |
| 312(a)(2)(iii) | 312(a)(2)(iii)自動登出 |規格|一個 | Keycloak 會話逾時 15 分鐘 | |
| 312(a)(2)(iv) | 312(a)(2)(iv) | 312(a)(2)(iv)加密/解密|規格|一個 |避難所運輸 AES-256-GCM | |
| 312(b) | 312(b)稽核控制|標準|右 | AuditLogEntry + JAX-RS 過濾器 | |
| 312(c)(1) | 312(c)(1)誠信|標準|右 | HMAC-SHA256 + 變更追蹤 | |
| 312(c)(2) | 312(c)(2)驗證 ePHI |規格|一個 | HMAC 驗證+觸發器 | |
| 312（d）|個人認證 |標準|右 | Keycloak MFA（TOTP）| |
| 312（e）（1）|傳輸安全 |標準|右 | TLS 1.3 + mTLS + HSTS | |
| 312(e)(2)(i) | 312(e)(2)(i)完整性控制|規格|一個 | TLS 完整性 + JWE | |
| 312(e)(2)(ii) | 312(e)(2)(ii)加密 |規格|一個 | TLS 1.3、AES-256-GCM 密碼 | |

### 7.2。自動合規性檢查腳本

```bash
#!/bin/bash
# hipaa-compliance-check.sh
# Script tự động kiểm tra HIPAA Technical Safeguards compliance

set -euo pipefail

REPORT_FILE="hipaa-compliance-report-$(date +%Y%m%d).txt"
PASS=0
FAIL=0
WARN=0

log_result() {
    local status=$1
    local section=$2
    local check=$3
    local detail=$4

    echo "[$status] §164.$section - $check: $detail" | tee -a "$REPORT_FILE"
    case $status in
        PASS) ((PASS++)) ;;
        FAIL) ((FAIL++)) ;;
        WARN) ((WARN++)) ;;
    esac
}

echo "=== HIPAA Technical Safeguards Compliance Check ===" | tee "$REPORT_FILE"
echo "Date: $(date -u +"%Y-%m-%dT%H:%M:%SZ")" | tee -a "$REPORT_FILE"
echo "=================================================" | tee -a "$REPORT_FILE"

# --- §164.312(a)(2)(i) Unique User Identification ---
echo "" | tee -a "$REPORT_FILE"
echo "--- Access Control ---" | tee -a "$REPORT_FILE"

# Check Keycloak user configuration
KC_USERS=$(curl -s -H "Authorization: Bearer $KC_ADMIN_TOKEN" \
    "$KEYCLOAK_URL/admin/realms/healthcare/users?max=1" | jq length 2>/dev/null || echo "ERROR")
if [ "$KC_USERS" != "ERROR" ]; then
    log_result "PASS" "312(a)(2)(i)" "Unique User ID" "Keycloak users configured"
else
    log_result "FAIL" "312(a)(2)(i)" "Unique User ID" "Cannot verify Keycloak users"
fi

# --- §164.312(a)(2)(iii) Automatic Logoff ---
KC_SESSION_TIMEOUT=$(curl -s -H "Authorization: Bearer $KC_ADMIN_TOKEN" \
    "$KEYCLOAK_URL/admin/realms/healthcare" | jq '.ssoSessionIdleTimeout' 2>/dev/null || echo "0")
if [ "$KC_SESSION_TIMEOUT" -le 900 ] && [ "$KC_SESSION_TIMEOUT" -gt 0 ]; then
    log_result "PASS" "312(a)(2)(iii)" "Automatic Logoff" \
        "Session idle timeout: ${KC_SESSION_TIMEOUT}s (≤15min)"
else
    log_result "FAIL" "312(a)(2)(iii)" "Automatic Logoff" \
        "Session idle timeout: ${KC_SESSION_TIMEOUT}s (should be ≤900s)"
fi

# --- §164.312(a)(2)(iv) Encryption ---
# Check TLS version
TLS_VERSION=$(echo | openssl s_client -connect "$APP_HOST:8443" -tls1_3 2>/dev/null \
    | grep "Protocol" | awk '{print $NF}' || echo "UNKNOWN")
if [ "$TLS_VERSION" = "TLSv1.3" ]; then
    log_result "PASS" "312(a)(2)(iv)" "Encryption - TLS" "TLS 1.3 enabled"
else
    log_result "FAIL" "312(a)(2)(iv)" "Encryption - TLS" \
        "TLS version: $TLS_VERSION (should be TLSv1.3)"
fi

# Check Vault Transit
VAULT_KEY=$(vault read -format=json transit/keys/phi-data 2>/dev/null | \
    jq -r '.data.type' || echo "NONE")
if [ "$VAULT_KEY" = "aes256-gcm96" ]; then
    log_result "PASS" "312(a)(2)(iv)" "Encryption - Vault" "Transit key: aes256-gcm96"
else
    log_result "FAIL" "312(a)(2)(iv)" "Encryption - Vault" \
        "Vault Transit key not found or wrong type"
fi

# --- §164.312(b) Audit Controls ---
AUDIT_TABLE=$(psql "$DB_URL" -tAc \
    "SELECT COUNT(*) FROM information_schema.tables \
     WHERE table_schema='compliance' AND table_name='audit_logs'" 2>/dev/null || echo "0")
if [ "$AUDIT_TABLE" = "1" ]; then
    log_result "PASS" "312(b)" "Audit Controls" "Audit log table exists"
else
    log_result "FAIL" "312(b)" "Audit Controls" "Audit log table NOT found"
fi

# Check audit log has recent entries
RECENT_AUDITS=$(psql "$DB_URL" -tAc \
    "SELECT COUNT(*) FROM compliance.audit_logs \
     WHERE timestamp > NOW() - INTERVAL '24 hours'" 2>/dev/null || echo "0")
if [ "$RECENT_AUDITS" -gt 0 ]; then
    log_result "PASS" "312(b)" "Audit Controls - Active" \
        "$RECENT_AUDITS audit entries in last 24h"
else
    log_result "WARN" "312(b)" "Audit Controls - Active" \
        "No audit entries in last 24h"
fi

# --- §164.312(c) Integrity Controls ---
CHANGE_LOG=$(psql "$DB_URL" -tAc \
    "SELECT COUNT(*) FROM information_schema.tables \
     WHERE table_schema='compliance' AND table_name='data_change_log'" 2>/dev/null || echo "0")
if [ "$CHANGE_LOG" = "1" ]; then
    log_result "PASS" "312(c)" "Integrity Controls" "Change log table exists"
else
    log_result "FAIL" "312(c)" "Integrity Controls" "Change log table NOT found"
fi

# --- §164.312(d) Person Authentication ---
KC_OTP=$(curl -s -H "Authorization: Bearer $KC_ADMIN_TOKEN" \
    "$KEYCLOAK_URL/admin/realms/healthcare" | jq -r '.otpPolicyType' 2>/dev/null || echo "NONE")
if [ "$KC_OTP" = "totp" ]; then
    log_result "PASS" "312(d)" "Person Authentication" "MFA enabled (TOTP)"
else
    log_result "FAIL" "312(d)" "Person Authentication" "MFA NOT configured"
fi

# --- §164.312(e) Transmission Security ---
# Check if insecure HTTP is disabled
HTTP_REDIRECT=$(curl -s -o /dev/null -w "%{http_code}" \
    "http://$APP_HOST:8080/health" 2>/dev/null || echo "000")
if [ "$HTTP_REDIRECT" = "000" ] || [ "$HTTP_REDIRECT" = "301" ]; then
    log_result "PASS" "312(e)" "Transmission Security" \
        "HTTP disabled/redirected (code: $HTTP_REDIRECT)"
else
    log_result "FAIL" "312(e)" "Transmission Security" \
        "HTTP still accessible (code: $HTTP_REDIRECT)"
fi

# --- Summary ---
echo "" | tee -a "$REPORT_FILE"
echo "=== COMPLIANCE SUMMARY ===" | tee -a "$REPORT_FILE"
echo "PASS: $PASS" | tee -a "$REPORT_FILE"
echo "FAIL: $FAIL" | tee -a "$REPORT_FILE"
echo "WARN: $WARN" | tee -a "$REPORT_FILE"
TOTAL=$((PASS + FAIL + WARN))
if [ $TOTAL -gt 0 ]; then
    SCORE=$((PASS * 100 / TOTAL))
    echo "Score: ${SCORE}%" | tee -a "$REPORT_FILE"
fi

if [ $FAIL -gt 0 ]; then
    echo "STATUS: NON-COMPLIANT" | tee -a "$REPORT_FILE"
    exit 1
else
    echo "STATUS: COMPLIANT" | tee -a "$REPORT_FILE"
fi
```

## 8. BAA（業務夥伴協議）－技術要求

### 8.1。 BAA 技術義務

在使用第三方服務（雲端提供者、SaaS）時，BAA要求以下技術保證：

**雲端提供者（AWS/GCP/Azure）：**

- 靜態加密：AES-256
- 傳輸中加密：TLS 1.2+
- 存取日誌記錄：CloudTrail/雲端審核日誌
- 資料駐留：指定區域
- 事件通知：≤ 60 天

**資料庫服務（RDS/Cloud SQL）：**

- 加密儲存卷+備份
- 啟用審核日誌記錄
- 網路隔離（VPC）
- IAM身份驗證

**監控服務（Datadog/New Relic）：**

- 發送前屏蔽 PHI
- 資料處理協議
- 歐盟/美國資料駐留
- 日誌保留控制

**電子郵件服務（SendGrid/SES）：**

- TLS 強制執行
- 電子郵件內容不含 PHI
- 違規通知功能

### 8.2。 BAA 合規性驗證

```java
package vn.hospital.compliance.baa;

import jakarta.enterprise.context.ApplicationScoped;
import java.time.LocalDate;
import java.util.List;

/**
 * Track Business Associate Agreements và technical compliance.
 */
@ApplicationScoped
public class BaaComplianceService {

    /**
     * Danh sách Business Associates cần BAA.
     */
    public List<BusinessAssociate> getBusinessAssociates() {
        return List.of(
            new BusinessAssociate(
                "AWS", "Cloud Infrastructure",
                "BAA-AWS-2024-001", LocalDate.of(2024, 1, 15),
                List.of("AES-256 at rest", "TLS 1.2+ in transit",
                         "CloudTrail logging", "VPC isolation")
            ),
            new BusinessAssociate(
                "Elastic Cloud", "Log Management (ELK)",
                "BAA-ELASTIC-2024-002", LocalDate.of(2024, 2, 1),
                List.of("Encrypted clusters", "RBAC", "Audit logging",
                         "Data residency controls")
            ),
            new BusinessAssociate(
                "HashiCorp Cloud", "Vault (Key Management)",
                "BAA-HASHI-2024-003", LocalDate.of(2024, 3, 1),
                List.of("FIPS 140-2 HSMs", "SOC 2 Type II",
                         "Encryption in transit", "Access logging")
            )
        );
    }
}

record BusinessAssociate(
    String name,
    String serviceDescription,
    String baaId,
    LocalDate effectiveDate,
    List<String> technicalSafeguards
) {}
```

## 9. 第 13/2023/ND-CP 號法令 — 越南個人資料保護

### 9.1。第 13 號法令概述

關於個人資料保護的第 13/2023/ND-CP 號法令（自 2023 年 7 月 1 日起生效）是越南首個資料保護法規，類似於歐盟的 GDPR。對於衛生系統，健康資料屬於**敏感個人資料**。

### 9.2。將法令 13 與 HIPAA 控制措施對應起來

|法令 13 |文章| HIPAA 同等標準 |實施|
|--------------|-------|--------------------------------|----------------|
|同意資料處理 |第 11 條 |授權§164.508 |同意管理服務|
|資料存取權 |第九條|存取權 §164.524 |病患入口網站 API |
|資料刪除權 |第 16 條 |不適用（HIPAA 有效期限為 6 年）|軟體刪除+匿名化 |
|違規通知 |第 23 條 |違規通知§164.408 |事件回應工作流程 |
|影響評估|第 24 條 |風險分析§164.308(a)(1) | DPIA 範本 |
|資料安全 |第 26 條 |技術保障§164.312 |加密+存取控制|
|跨境資料傳輸 |第 25 條 |不適用 |資料駐留控制 |
| DPO（保護官）|第 28 條 |隱私權官 |角色分配|

### 9.3。同意管理服務

```java
package vn.hospital.compliance.consent;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

/**
 * Nghị định 13 Điều 11 - Đồng ý xử lý dữ liệu cá nhân.
 * Bệnh nhân phải đồng ý trước khi xử lý dữ liệu sức khỏe.
 */
@ApplicationScoped
public class ConsentManagementService {

    @Inject
    EntityManager entityManager;

    /**
     * Ghi nhận consent của bệnh nhân.
     */
    @Transactional
    public ConsentRecord recordConsent(ConsentRequest request) {
        ConsentRecord record = new ConsentRecord();
        record.setId(UUID.randomUUID());
        record.setPatientId(request.getPatientId());
        record.setPurpose(request.getPurpose());
        record.setScope(request.getScope());
        record.setConsentGiven(request.isConsentGiven());
        record.setConsentMethod(request.getConsentMethod());
        record.setConsentedAt(Instant.now());
        record.setExpiresAt(request.getExpiresAt());
        record.setVersion(request.getConsentFormVersion());

        entityManager.persist(record);
        return record;
    }

    /**
     * Kiểm tra bệnh nhân đã consent cho mục đích cụ thể chưa.
     */
    public boolean hasValidConsent(UUID patientId, String purpose) {
        Long count = entityManager.createQuery(
            "SELECT COUNT(c) FROM ConsentRecord c " +
            "WHERE c.patientId = :patientId AND c.purpose = :purpose " +
            "AND c.consentGiven = true AND c.revokedAt IS NULL " +
            "AND (c.expiresAt IS NULL OR c.expiresAt > :now)",
            Long.class)
            .setParameter("patientId", patientId)
            .setParameter("purpose", purpose)
            .setParameter("now", Instant.now())
            .getSingleResult();
        return count > 0;
    }

    /**
     * Thu hồi consent (Điều 12 - Quyền rút lại đồng ý).
     */
    @Transactional
    public void revokeConsent(UUID consentId, String revokedBy, String reason) {
        ConsentRecord record = entityManager.find(ConsentRecord.class, consentId);
        if (record != null) {
            record.setRevokedAt(Instant.now());
            record.setRevokedBy(revokedBy);
            record.setRevocationReason(reason);
        }
    }

    /**
     * Lấy tất cả consent records cho một bệnh nhân.
     * Nghị định 13 Điều 9 - Quyền truy cập dữ liệu.
     */
    public List<ConsentRecord> getPatientConsents(UUID patientId) {
        return entityManager.createQuery(
            "SELECT c FROM ConsentRecord c WHERE c.patientId = :patientId " +
            "ORDER BY c.consentedAt DESC", ConsentRecord.class)
            .setParameter("patientId", patientId)
            .getResultList();
    }
}
```

### 9.4。數據駐留檢查

```java
package vn.hospital.compliance.residency;

import jakarta.enterprise.context.ApplicationScoped;
import org.jboss.logging.Logger;

import java.util.Set;

/**
 * Nghị định 13 Điều 25 - Chuyển dữ liệu cá nhân ra nước ngoài.
 * Yêu cầu đánh giá tác động trước khi transfer.
 */
@ApplicationScoped
public class DataResidencyService {

    private static final Logger LOG = Logger.getLogger(DataResidencyService.class);

    // Danh sách regions được phép lưu trữ dữ liệu y tế VN
    private static final Set<String> ALLOWED_REGIONS = Set.of(
        "ap-southeast-1",   // Singapore (gần VN, có BAA)
        "ap-east-1"         // Hong Kong
        // VN region khi available
    );

    /**
     * Kiểm tra region có được phép lưu trữ dữ liệu không.
     */
    public boolean isAllowedRegion(String region) {
        return ALLOWED_REGIONS.contains(region);
    }

    /**
     * Validate trước khi cross-border transfer.
     */
    public TransferAssessment assessCrossBorderTransfer(
            String sourceRegion, String targetRegion, String dataType) {

        boolean allowed = ALLOWED_REGIONS.contains(targetRegion);

        return new TransferAssessment(
            sourceRegion, targetRegion, dataType,
            allowed,
            allowed ? "Transfer allowed" :
                "Transfer requires DPIA and regulatory approval per Nghị định 13 Điều 25"
        );
    }
}

record TransferAssessment(
    String sourceRegion,
    String targetRegion,
    String dataType,
    boolean allowed,
    String assessment
) {}
```

## 總結

在本課程中，我們已將 **HIPAA 技術保障§164.312** 完全對應到具體實施：

1. **存取控制§164.312(a)**：Keycloak 唯一使用者 ID、打破玻璃緊急存取、自動登出（15 分鐘空閒逾時）、使用 Vault Transit 進行現場級加密
2. **審計控制§164.312(b)**：全面的審計追蹤（誰/什麼/何時/何地/為什麼），JAX-RS過濾器自動記錄PHI訪問，分區審計表
3. **完整性控制§164.312(c)**：HMAC-SHA256 記錄完整性、用於更改追蹤的 PostgreSQL 觸發器、不可變更改日誌
4. **個人驗證 §164.312(d)**：Keycloak MFA (TOTP)、密碼原則、暴力保護、帳號鎖定
5. **傳輸安全性§164.312(e)**：僅限 TLS 1.3、強密碼套件、HSTS、用於服務間的 mTLS
6. **合規自動化**：自動測試腳本、合規矩陣、評分
7. **BAA 技術要求**：雲端提供者義務、第三方服務的 PHI 屏蔽
8. **第 13/2023/ND-CP 號法令**：同意管理、資料駐留控制、跨境傳輸評估、與 HIPAA 映射

## 練習

1. **合規矩陣**：建立包含專案完整合規矩陣的電子表格或資料庫表。將所有 12 個 HIPAA 技術保障規格對應到具體實施。評估每個項目的狀態（合規/不合規/進行中）。針對不合規項目制定行動計畫。

2. **緊急訪問**：實施完整的「打破玻璃」服務。建立 REST API：POST `/api/v1/emergency-access` （請求存取），刪除 `/api/v1/emergency-access/{id}` （撤銷）。與 Keycloak 整合以授予臨時角色。驗證審核日誌記錄的完整資訊。測試：無需緊急訪問即可存取 PHI → 403。

3. **自動合規性檢查**：自訂腳本 `hipaa-compliance-check.sh` 為了您的環境。新增檢查：靜態資料庫加密、備份加密、密碼原則強度​​、MFA 註冊百分比。整合到 CI/CD 管道（每次部署運行）。以 JSON 格式輸出報告，用於儀表板監控。

4. **同意管理（法令 13）**：實作 REST API 進行同意管理。創建同意書有 3 個目的：治療、研究、資料共享。實施：記錄同意、檢查同意、撤銷同意、列出同意。建立顯示同意歷史記錄的病患入口網站端點。驗證：未經同意無法存取 PHI。

---

---

<!-- SERIES-NAV:START -->
| ◀ 上一篇 |下一篇文章 ▶ |
|:---|---:|
| [第 16 課：mTLS、服務網格和安全服務間通信](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-16-mtls-service-mesh-inter-service-communication) | [第 18 課：使用 OpenTelemetry 和 ELK Stack 進行集中審計追蹤](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-18-centralized-audit-trail-opentelemetry-elk) |
<!-- SERIES-NAV:END -->
