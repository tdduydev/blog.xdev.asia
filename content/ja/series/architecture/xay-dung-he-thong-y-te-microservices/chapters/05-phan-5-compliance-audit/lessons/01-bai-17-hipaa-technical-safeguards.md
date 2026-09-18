---
id: 019e1a40-a117-7001-d001-f0a1b2c30117
title: 'レッスン 17: HIPAA 技術的保護措置 — 実装チェックリスト'
slug: bai-17-hipaa-technical-safeguards
description: >-
  HIPAA 技術的保護手段を完全に導入します: アクセス制御 (固有のユーザー ID、緊急アクセス、自動ログオフ、暗号化)、監査制御
  (ハードウェア、ソフトウェア、手順メカニズム)、整合性制御 (ePHI の認証)、個人認証、および送信セキュリティ。
  Quarkus、PostgreSQL、Keycloakを使用して各要件を特定の実装にマッピングします。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 17
section_title: 'パート 5: コンプライアンス、監査、データ保護'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 17</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 17: HIPAA の技術的保護措置 —</tspan>
      <tspan x="60" dy="42">導入チェックリスト</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 5: コンプライアンス、監査、データ保護</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. HIPAA セキュリティ規則 §164.312 の概要

![HIPAA Security Rule — Administrative, Physical, Technical Safeguards](/storage/uploads/2026/04/healthcare-hipaa-security-rule.webp)

HIPAA セキュリティ ルールでは、ePHI (電子的保護医療情報) を扱う組織に **技術的安全対策**、つまり電子医療データを保護するための技術的手段を実装することが求められています。これは開発者とエンジニアにとって最も重要な部分です。

＃＃＃１．１． HIPAA セキュリティ ルールの構造

**HIPAA セキュリティ規則 §164.302-318:**

- **§164.308 管理上の安全措置**
  - リスク分析
  - 従業員のセキュリティ
  - 情報アクセス管理
  - セキュリティ意識向上トレーニング
  - セキュリティインシデントの手順
  - 緊急時対応計画
  - 評価
- **§164.310 物理的保護措置**
  - 施設のアクセス制御
  - ワークステーションの使用とセキュリティ
  - デバイスとメディアのコントロール
- **§164.312 技術的保護措置** ← **この投稿**
  - アクセス制御 (§164.312(a))
  - 監査管理 (§164.312(b))
  - 整合性管理 (§164.312(c))
  - 個人/エンティティの認証 (§164.312(d))
  - 送信セキュリティ (§164.312(e))
- **§164.314 組織要件**
  - 業務提携契約 (BAA)
  - グループ健康計画の要件

＃＃＃１．２．必須かアドレス可能か

HIPAA では、実装仕様を次の 2 つのカテゴリに分類しています。

|タイプ |意味 |アクション |
|----------|-----------|----------|
| **必須 (R)** |必須の実装、例外なし |仕様を実装する必要があります |
| **アドレス可能 (A)** |合理的であれば評価して実装する必要があります。実装しない場合は、理由と代替措置を文書化する必要があります。

> **重要**: 「アドレス指定可能」は「オプション」を意味するものではありません。組織は代替案を評価、実装、または文書化する必要があります。

## 2. アクセス制御 — §164.312(a)(1)

標準: アクセス権を付与された個人またはソフトウェア プログラムのみにアクセスを許可する ePHI を維持する電子情報システムの技術ポリシーと手順を実装します。

＃＃＃２．１．固有のユーザー ID — §164.312(a)(2)(i) [必須]

> *「ユーザー ID を識別および追跡するために、一意の名前および/または番号を割り当てます。」*

**Keycloak を使用した実装:**

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

**Keycloak レルム構成:**

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

＃＃＃２．２．緊急アクセス手順 — §164.312(a)(2)(ii) [必須]

> *「緊急時に必要な ePHI を取得するための手順を確立 (および必要に応じて実装)」*

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

**緊急アクセス許可の主体:**

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

＃＃＃２．３．自動ログオフ — §164.312(a)(2)(iii) [アドレス指定可能]

> *「所定の非アクティブ時間が経過した後に電子セッションを終了する電子手順を実装します。」*

**Keycloakセッション構成:**

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

|設定 |値 |意味 |
|----------|-----------|----------|
| `ssoSessionIdleTimeout` | 900秒 (15分) |セッションは 15 分間非アクティブ状態が続くと自動的に期限切れになります。
| `ssoSessionMaxLifespan` | 28800 秒 (8 時間) |最大セッション 8 時間 (1 シフト) |
| `accessTokenLifespan` | 300 秒 (5 分) |公開期間を短縮するための短いアクセス トークン |
| `actionTokenGeneratedByUserLifespan` | 300年代 |パスワードをリセットするためのトークン、電子メールを確認する |

**Quarkus OIDC トークンのリフレッシュ:**

```properties
# application.properties - Session management
quarkus.oidc.token.refresh-expired=true
quarkus.oidc.token.refresh-token-time-skew=10S
quarkus.oidc.token.lifespan-grace=5
quarkus.oidc.logout.path=/api/v1/logout
quarkus.oidc.logout.post-logout-path=/
```

＃＃＃２．４．暗号化と復号化 — §164.312(a)(2)(iv) [アドレス指定可能]

> *「ePHI を暗号化および復号化するメカニズムを実装します。」*

詳細については、レッスン 15 (エンドツーエンド暗号化) で導入します。実装の概要:

|コンポーネント |暗号化方式 |キー管理 |
|----------|-----------|-----|
|データベース列 (PHI) | Vault Transit 経由の AES-256-GCM | HashiCorp ボールト KEK |
|サービス間通信 | JWE (RSA-OAEP-256 + A256GCM) |ボールト KV エンジン |
|カフカのメッセージ |エンベロープ暗号化 (DEK + KEK) |ヴォールト・トランジット |
|保存中のデータベース | PostgreSQL TDE またはディスク暗号化 | OS/クラウドKMS |
|バックアップ | pgBackRest 経由の AES-256-CBC |個別のバックアップ キー |
|交通機関 | TLS1.3 |認証局 |

## 3. 監査管理 — §164.312(b)

＃＃＃３．１．標準 [必須]

> *「ePHI を含む、または使用する情報システム内のアクティビティを記録および検査するハードウェア、ソフトウェア、および/または手順メカニズムを実装します。」*

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

**監査ログ エンティティ:**

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

**自動監査用の JAX-RS フィルタ:**

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

＃＃＃３．２．監査ログの SQL スキーマ

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

## 4. 整合性管理 — §164.312(c)(1)

＃＃＃４．１．標準 [必須]

> *「ePHI を不適切な変更や破壊から保護するためのポリシーと手順を実装します。」*

＃＃＃４．２． ePHI を認証するメカニズム — §164.312(c)(2) [アドレス指定可能]

> *「ePHI が不正な方法で変更または破壊されていないことを証明する電子メカニズムを実装します。」*

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

**整合性追跡のための PostgreSQL トリガー:**

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

## 5. 個人またはエンティティの認証 — §164.312(d)

＃＃＃５．１．標準 [必須]

> *「ePHI へのアクセスを求めている個人または団体が、記載されている人物または団体であることを確認する手順を実装します。」*

**Keycloak による多要素認証:**

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

|構成 |値 | HIPAA の目的 |
|----------|----------||-----|
| MFA が必要 | TOTP (6 桁、30 秒) |強力なアイデンティティ認証 |
|ブルートフォースプロテクション | 5 回失敗 → 15 分間ロック |ブルートフォース対策 |
|パスワードポリシー |最小 12 文字、大文字、数字、特殊 |強力なパスワード |
|セッションタイムアウト |アイドル状態で 15 分間、最大 8 時間 |自動ログオフ |
|アカウントのロックアウト | 5 回失敗しました |不正アクセスを防ぐ |

## 6. 送信セキュリティ — §164.312(e)(1)

＃＃＃６．１．標準 [必須]

> *「電子通信ネットワークを介して送信される ePHI への不正アクセスを防ぐための技術的セキュリティ対策を実装する。」*

＃＃＃６．２．整合性管理 — §164.312(e)(2)(i) [アドレス指定可能]

> *「電子的に送信される ePHI が廃棄されるまで検出されずに不正に変更されないようにするためのセキュリティ対策を実装します。」*

＃＃＃６．３．暗号化 — §164.312(e)(2)(ii) [アドレス指定可能]

> *「適切と考えられる場合は常に、ePHI を暗号化するメカニズムを実装します。」*

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

## 7. 包括的なコンプライアンス マトリックス

＃＃＃７．１． HIPAA 技術的保護措置のコンプライアンス マトリックス

| § |セーフガード |スペック | R/A |実装 |ステータス |
|---|----------|------|-----|-----|----------|
| 312(a)(1) |アクセス制御 |標準 | R | Keycloak OIDC + Quarkus RBAC | |
| 312(a)(2)(i) |固有のユーザー ID |スペック | R | Keycloak UUID (サブクレーム) | |
| 312(a)(2)(ii) |緊急アクセス |スペック | R |ガラス割りサービス | |
| 312(a)(2)(iii) |自動ログオフ |スペック |あ | Keycloak セッションのタイムアウト 15 分 | |
| 312(a)(2)(iv) |暗号化/復号化 |スペック |あ |ボールト トランジット AES-256-GCM | |
| 312(b) |監査管理 |標準 | R | AuditLogEntry + JAX-RS フィルター | |
| 312(c)(1) |誠実さ |標準 | R | HMAC-SHA256 + 変更追跡 | |
| 312(c)(2) | ePHI の認証 |スペック |あ | HMAC 検証 + トリガー | |
| 312(d) |本人認証 |標準 | R | Keycloak MFA (TOTP) | |
| 312(e)(1) |送信セキュリティ |標準 | R | TLS 1.3 + mTLS + HSTS | |
| 312(e)(2)(i) |整合性管理 |スペック |あ | TLS 整合性 + JWE | |
| 312(e)(2)(ii) |暗号化 |スペック |あ | TLS 1.3、AES-256-GCM 暗号 | |

＃＃＃７．２．自動コンプライアンスチェックスクリプト

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

## 8. BAA (業務提携契約) — 技術要件

### 8.1。 BAA の技術的義務

サードパーティ サービス (クラウド プロバイダー、SaaS) を使用する場合、BAA は次の技術保証を要求します。

**クラウドプロバイダー (AWS/GCP/Azure):**

- 保存時の暗号化: AES-256
- 転送中の暗号化: TLS 1.2+
- アクセスログ: CloudTrail/Cloud Audit Logs
- データの所在地: リージョンを指定します
- インシデント通知: ≤ 60 日

**データベース サービス (RDS/Cloud SQL):**

- 暗号化されたストレージボリューム + バックアップ
- 監査ログが有効になっています
- ネットワーク分離 (VPC)
- IAM認証

**監視サービス (Datadog/New Relic):**

- 送信前のPHIマスキング
- データ処理契約
- EU/米国のデータ常駐
- ログ保持制御

**電子メール サービス (SendGrid/SES):**

- TLS の強制
- 電子メールの内容に PHI が含まれていない
- 侵害通知機能

### 8.2。 BAA 準拠の検証

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

## 9. 政令 13/2023/ND-CP — ベトナムの個人データ保護

＃＃＃９．１．政令 13 の概要

個人データ保護に関する法令 13/2023/ND-CP (2023 年 7 月 1 日より発効) は、EU の GDPR と同様、ベトナム初のデータ保護に関する規制です。医療システムの場合、医療データは **機密性の高い個人データ** に該当します。

＃＃＃９．２．法令 13 と HIPAA コントロールのマッピング

|政令 13 |記事 | HIPAA 相当 |実装 |
|--------------|------|---------------------|--------------|
|データ処理への同意 |第11条 |認可 §164.508 |同意管理サービス |
|データアクセス権 |第9条 |アクセス権 §164.524 |患者ポータル API |
|データ削除の権利 |第 16 条 |該当なし (HIPAA は 6 年間保持されます) |論理的な削除 + 匿名化 |
|違反通知 |第 23 条 |違反通知 §164.408 |インシデント対応ワークフロー |
|影響評価 |第 24 条 |リスク分析 §1​​64.308(a)(1) | DPIA テンプレート |
|データセキュリティ |第 26 条 |技術的保護手段 §164.312 |暗号化 + アクセス制御 |
|国境を越えたデータ転送 |第 25 条 |該当なし |データ所在地の制御 |
| DPO (保護責任者) |第 28 条 |プライバシー責任者 |役割の割り当て |

＃＃＃９．３．同意管理サービス

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

＃＃＃９．４．データの所在地のチェック

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

## 概要

このレッスンでは、**HIPAA Technical Safeguards §164.312** を特定の実装に完全にマッピングしました。

1. **Access Control §164.312(a)**: Keycloak unique user IDs, Break-the-Glass emergency access, automatic logoff (15-min idle timeout), field-level encryption with Vault Transit
2. **Audit Controls §164.312(b)**: Comprehensive audit trail (WHO/WHAT/WHEN/WHERE/WHY), JAX-RS filter automatically logs PHI access, partitioned audit tables
3. **整合性コントロール §164.312(c)**: HMAC-SHA256 レコード整合性、変更追跡用の PostgreSQL トリガー、不変変更ログ
4. **個人認証 §164.312(d)**: Keycloak MFA (TOTP)、パスワード ポリシー、ブルート フォース保護、アカウント ロックアウト
5. **送信セキュリティ §164.312(e)**: TLS 1.3 のみ、強力な暗号スイート、HSTS、サービス間用の mTLS
6. **コンプライアンスの自動化**: 自動テスト スクリプト、コンプライアンス マトリックス、スコアリング
7. **BAA 技術要件**: クラウドプロバイダーの義務、サードパーティサービスの PHI マスキング
8. **政令 13/2023/ND-CP**: 同意管理、データ所在地管理、国境を越えた転送評価、HIPAA とのマッピング

## 演習

1. **コンプライアンス マトリックス**: プロジェクトの完全なコンプライアンス マトリックスを含むスプレッドシートまたはデータベース テーブルを作成します。 12 の HIPAA Technical Safeguard 仕様をすべて特定の実装にマッピングします。各項目のステータス (準拠/非準拠/進行中) を評価します。非準拠品目に対するアクションプランを作成します。

2. **緊急アクセス**: 完全なブレイク ザ グラス サービスを実装します。 REST APIの作成: POST `/api/v1/emergency-access` (アクセスを要求)、DELETE `/api/v1/emergency-access/{id}` (取り消し)。 Keycloakと統合して一時的なロールを付与します。監査ログに完全な情報が記録されていることを確認します。テスト: 緊急アクセスなしで PHI にアクセス → 403.

3. **自動コンプライアンス チェック**: スクリプトのカスタマイズ `hipaa-compliance-check.sh` あなたの環境のために。保存時のデータベースの暗号化、バックアップの暗号化、パスワード ポリシーの強度、MFA 登録の割合のチェックを追加します。 CI/CD パイプラインに統合します (デプロイメントごとに実行)。ダッシュボード監視用のレポートをJSON形式で出力します。

4. **同意管理 (法令 13)**: 同意管理のための REST API を実装します。治療、研究、データ共有の 3 つの目的に応じて同意書を作成します。実装: 同意の記録、同意の確認、同意の取り消し、同意のリストを作成します。同意履歴を表示する患者ポータル エンドポイントを作成します。確認: 同意が得られていない場合、PHI にアクセスできません。

---

---

<!-- SERIES-NAV:START -->
| ◀ 前の記事 |次の記事 ▶ |
|:---|---:|
| [レッスン 16: mTLS、サービス メッシュ、安全なサービス間通信](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-16-mtls-service-mesh-inter-service-communication) | [レッスン 18: OpenTelemetry と ELK スタックを使用した一元的な監査証跡](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-18-centralized-audit-trail-opentelemetry-elk) |
<!-- SERIES-NAV:END -->
