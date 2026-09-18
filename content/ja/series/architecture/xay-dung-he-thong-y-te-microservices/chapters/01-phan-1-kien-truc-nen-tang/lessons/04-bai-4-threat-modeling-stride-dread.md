---
id: 019e1a40-a104-7001-d001-f0a1b2c30104
title: 'レッスン 4: 医療システム向けの STRIDE/DREAD の脅威モデリング'
slug: bai-4-threat-modeling-stride-dread
description: >-
  医療システムへの脅威モデリングの適用: STRIDE (スプーフィング、改ざん、否認、情報開示、DoS、特権昇格)、DREAD
  スコアリング、攻撃ツリー、医療マイクロサービスのデータ フロー図、医療コンテキストにおける OWASP トップ
  10、脅威モデルからのセキュリティ要件の構築。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 4
section_title: 'パート 1: アーキテクチャとプラットフォーム'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🏗️ アーキテクチャ — レッスン 4</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 4: システムの脅威モデリング STRIDE/DREAD</tspan>
      <tspan x="60" dy="42">医療システム</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 1: アーキテクチャとプラットフォーム</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. 脅威モデリングとは何ですか?

![マイクロサービス医療システム向けの脅威モデリング STRIDE](/storage/uploads/2026/04/healthcare-threat-model-stride.webp)

**脅威モデリング** は、システムに対する潜在的なセキュリティ脅威を特定、評価し、優先順位を付ける体系的なプロセスです。医療分野では、攻撃の影響はデータの損失だけではなく、**患者の命**に影響を及ぼす可能性があるため、脅威モデリングは特に重要です。

＃＃＃１．１．脅威モデリングプロセス

![6 段階の脅威モデリング プロセス — 範囲の定義から検証と反復まで](/storage/uploads/2026/04/healthcare-threat-modeling-process.webp)

＃＃＃１．２．脅威モデリングが必要になるのはどのような場合ですか?

- **新しいシステム設計** (HIS、EMR、LIS)
- **新しいマイクロサービスを既存のシステムに追加**
- **アーキテクチャの変更** (例: モノリスからマイクロサービスへの移行)
- **外部システム統合** (実験器具、保険 API)
- **定期レビュー** (6 か月または各メジャー リリース後)

## 2. STRIDE 脅威モデル

＃＃＃２．１．概要 ストライド

STRIDE は、Microsoft によって開発された脅威分類フレームワークです。

|手紙 |脅威 |プロパティの違反 |健康における例 |
|--------|--------|--------|--------|
| **S** |スプーフィング |認証 |医師になりすまして患者記録にアクセスする |
| **T** |改ざん |誠実さ |データベース内のテスト結果を変更する |
| **R** |否認 |否認防止 |医師は間違った薬の処方を否定 |
| **私** |情報開示 |機密保持 |流出したHIV患者リスト |
| **D** |サービス拒否 |可用性 | DDoS 攻撃により緊急システムが停止 |
| **E** |特権の昇格 |認可 |看護師は管理者にアクセスできます |機能

＃＃＃２．２．ヘルスケア マイクロサービス向けの STRIDE 分析

#### S - スプーフィング (ID スプーフィング)

![スプーフィング攻撃 - 患者 API にアクセスするための JWT トークンのスプーフィングと防止策](/storage/uploads/2026/04/healthcare-stride-spoofing-attack.webp)

**脅威:** 攻撃者は JWT トークンを偽造して患者 API にアクセスします

**攻撃ベクトル:**

1. ブラウザの localStorage から JWT を盗む
2. クレームを変更して JWT を鍛造する (役割: "管理者")
3. 期限切れのトークンを再生する

**影響を受けるコンポーネント:** API ゲートウェイ、患者サービス、臨床サービス

**緩和策:**

- **M1:** Keycloak OIDC トークンの検証 — quarkus-oidc による署名の自動検証
- **M2:** 有効期間の短いアクセス トークン (5 分) — トークンの盗難ウィンドウを短縮します
- **M3:** DPoP (所有証明) — クライアント証明書にバインドされたトークン
- **M4:** リフレッシュ トークンのローテーション — 1 回限りのリフレッシュ トークンを使用
- **M5:** サービス間の mTLS — サービス ID 検証

#### T - 改ざん (データ改ざん)

![改ざん攻撃 — 内部関係者によるテスト結果とデータ整合性対策の改ざん](/storage/uploads/2026/04/healthcare-stride-tampering-integrity.webp)

**脅威:** 内部関係者が lab_db のテスト結果を変更しました

**攻撃ベクトル:**

1. DBA が lab_results テーブルを直接更新します
2. SQL インジェクションを利用してデータを変更する
3. API レスポンスをインターセプトして変更する

**緩和策:**

- **M1:** pgAudit ログ (すべての DML をログに記録)
- **M2:** 変更追跡のためのデータベース トリガー
- **M3:** ラボ結果のデジタル署名
- **M4:** 不変監査ログ (追加のみ)
- **M5:** 重要な変更のためのデュアルコントロール
- **M6:** チェックサムを使用した行のバージョン管理

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

#### I - 情報開示

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

#### D - サービス拒否攻撃

![DoS 軽減 — 医療システム向けの 7 層の DDoS 対策保護](/storage/uploads/2026/04/healthcare-stride-dos-mitigation.webp)

**脅威:** DDoS 攻撃により緊急システムが停止します

**医療への影響:**

- 薬のアレルギーが調べられない → 処方間違い → 危険
- 検査結果にアクセスできない → 診断が遅い
- スケジュールシステムがダウン → 患者が診察に来られない

**緩和策:**

- **M1:** API ゲートウェイでのレート制限
- **M2:** サーキットブレーカー (Quarkus フォールトトレランス)
- **M3:** 自動スケーリング Kubernetes ポッド
- **M4:** CDN/WAF (Cloudflare、AWS Shield)
- **M5:** データベース接続プーリング
- **M6:** フォールバック モード / オフライン機能
- **M7:** ER リクエストの優先キューイング

#### E - 特権の昇格

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

## 3. 恐怖のスコアリング

＃＃＃３．１．恐怖の要因

|係数 |説明 | 1 (低) | 5 (中) | 10 (高) |
|----------|---------------|----------|-------------|----------|
| **ひどい**被害 |被害レベル |小規模なデータ漏洩 |重大なデータ損失 |完全なシステム侵害 |
| **R**再現性 |再現が簡単 |難しい、多くの条件が必要 |認証が必要 |再現が簡単 |
| **悪用可能性 |悪用しやすい |高度な専門知識が必要 |ツールが必要 |スクリプト子供レベル |
| **A**影響を受けるユーザー |影響を受けた人の数 |一部のユーザー |部門 |すべての患者 |
| **D**発見可能性 |脆弱性を簡単に検出 |見つけるのが難しい |努力が必要 |公知 |

＃＃＃３．２．医療脅威に対する DREAD 分析

|脅威 | D | R | E |あ | D |合計 |優先事項 |
|--------|---|---|---|---|---|----------|----------|
|患者検索における SQL インジェクション | 10 | 8 | 7 | 10 | 8 | **8.6** |クリティカル |
| XSS によるトークンの盗難 | 8 | 7 | 6 | 8 | 7 | **7.2** |高い |
|インサイダー PHI アクセス | 9 | 9 | 5 | 7 | 4 | **6.8** |高い |
| ER システム上の DDoS | 7 | 10 | 8 | 10 | 9 | **8.8** |クリティカル |
|パッチが適用されていない Quarkus CVE | 8 | 6 | 7 | 10 | 8 | **7.8** |高い |
|バックアップデータの盗難 | 10 | 3 | 4 | 10 | 3 | **6.0** |中 |

> **DREAD スコア**: 合計 / 5。スコア > 7 = クリティカル、5-7 = 高、3-5 = 中、 < 3 = Low

## 4. OWASP Top 10 trong Healthcare Context

### 4.1. Mapping OWASP Top 10 cho Healthcare Microservices

| # | OWASP Vulnerability | Healthcare Impact | Quarkus/PostgreSQL/Keycloak Mitigation |
|---|---------------------|-------------------|----------------------------------------|
| A01 |壊れたアクセス制御 |看護師が患者の精神科記録をレビュー | Keycloak RBAC + PostgreSQL RLS |
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

![攻撃ツリー — DREAD スコアリングを使用して患者記録を盗む攻撃ベクトル](/storage/uploads/2026/04/healthcare-attack-tree.webp)

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

## 6. 脅威モデルからセキュリティ要件まで

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

## 7. 脅威モデリングツールとテンプレート

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

## 8. まとめ

このレッスンでは次のことを行います。

- **STRIDE** を理解し、適用して医療マイクロサービスの脅威を分類する
- **DREAD** スコアリングを使用して脅威に優先順位を付けます
- 医療固有のシナリオ向けに **攻撃ツリー** を構築
- **OWASP トップ 10** を特定の緩和策を用いて医療関連にマッピングする
- 脅威を実装およびテストできる **セキュリティ要件**に変換します

＃＃ エクササイズ

1. 処方サービス (薬の処方) の完全な STRIDE 分析を実行します。
2. DREAD スコアを使用して「ラボ結果の変更」シナリオの攻撃ツリーを構築する
3. 最も重要な 10 個の要件に関するセキュリティ要件トレーサビリティ マトリックスを作成する
4. OWASP Threat Dragon を使用して患者サービスのデータ フロー図を作成する

---

---

<!-- SERIES-NAV:START -->
| ◀ 前の記事 |次の記事 ▶ |
|:---|---:|
| [レッスン 3: 健康データの分類 (PHI/ePHI) とリスク評価](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-3-phan-loai-du-lieu-y-te-phi-va-danh-gia-rui-ro) | [レッスン 5: 医療標準に合わせた Keycloak レルムの設計 - 病院向けのマルチテナント](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-5-thiet-ke-keycloak-realm-chuan-y-te) |
<!-- SERIES-NAV:END -->
