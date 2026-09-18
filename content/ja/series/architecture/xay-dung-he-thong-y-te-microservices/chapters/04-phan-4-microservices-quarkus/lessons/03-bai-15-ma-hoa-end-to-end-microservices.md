---
id: 019e1a40-a115-7001-d001-f0a1b2c30115
title: 'レッスン 15: マイクロサービスにおけるエンドツーエンドの暗号化'
slug: bai-15-ma-hoa-end-to-end-microservices
description: >-
  マイクロサービスでのエンドツーエンドの医療データ暗号化: Quarkus エンティティでのフィールドレベルの暗号化、HashiCorp Vault
  Transit エンジンによるエンベロープ暗号化、サービス間通信用の JWE (JSON Web Encryption)、暗号化された Kafka
  メッセージ、キー ローテーション戦略、および Quarkus Vault 拡張機能の統合。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 15
section_title: 'パート 4: Quarkus を使用したマイクロサービスの構築'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-986" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-986)"/>

  <!-- Decorations -->
  <g>
    <circle cx="650" cy="260" r="18" fill="#38bdf8" opacity="0.05"/>
    <circle cx="700" cy="250" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="750" cy="240" r="28" fill="#38bdf8" opacity="0.05"/>
    <circle cx="800" cy="230" r="18" fill="#38bdf8" opacity="0.05"/>
    <circle cx="850" cy="220" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <line x1="600" y1="100" x2="1100" y2="180" stroke="#38bdf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="130" x2="1050" y2="200" stroke="#38bdf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="980.3108891324554,132.5 980.3108891324554,167.5 950,185 919.6891108675446,167.5 919.6891108675446,132.5 950,115" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#38bdf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#38bdf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🏗️ アーキテクチャ — レッスン 15</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 15: エンドツーエンドの暗号化</tspan>
      <tspan x="60" dy="42">マイクロサービス</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 4: Quarkus を使用したマイクロサービスの構築</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. 医療向けのエンドツーエンド暗号化の概要

![ヘルスケア マイクロサービスにおけるエンドツーエンド暗号化 — エンベロープ暗号化、Vault、Kafka](/storage/uploads/2026/04/healthcare-e2e-encryption-flow.webp)

医療マイクロサービス システムでは、PHI データは、クライアント → API ゲートウェイ → サービス → Kafka → データベースという **多くのレイヤー** を通過します。エンドツーエンドの暗号化により、転送中 (TLS) だけでなく、保存中および使用中のあらゆる時点でデータが**常に保護**されます。

＃＃＃１．１．暗号化アーキテクチャ

![エンドツーエンドの暗号化アーキテクチャ — クライアント → API ゲートウェイ → サービス → データベースと Vault](/storage/uploads/2026/04/healthcare-e2e-encryption-flow.webp)

**暗号化フロー:**

- **クライアント** → **API ゲートウェイ**: TLS 1.3 (トランスポート暗号化) + JWT 検証
- **患者サービス**: Vault Transit Engine によるフィールドレベルの暗号化 (SSN、診断)
- **出力**: PostgreSQL (AES-256-GCM 暗号化列)、Kafka (JWE メッセージ)、Lab Service (JWE ペイロード)
- **HashiCorp Vault**: トランジット エンジン (暗号化キー)、KV エンジン (認証情報)、PKI エンジン (TLS 証明書)、自動解凍 (Cloud KMS)

＃＃＃１．２．暗号化レイヤー

|レイヤー |暗号化 |キー管理 |いつ |
|----------|----------|----------|----------|
|交通機関 | TLS1.3 |認証局 |リクエスト/レスポンス |
|フィールドレベル | AES-256-GCM |ヴォールト・トランジット | DB保存前 |
|メッセージ | JWE (RSA-OAEP + AES) |ヴォールト・トランジット |サービス間メッセージング |
|データベース | pgcrypto/TDE | PostgreSQL 管理 |静止中 |
|バックアップ | AES-256 | KMS |バックアップファイル |

## 2. JPA AttributeConverter を使用したフィールドレベルの暗号化

＃＃＃２．１．なぜフィールドレベル暗号化なのか?

データベース レベルの暗号化 (TDE - 透過的データ暗号化) は保存時のデータを保護しますが、データがメモリにロードされているとき、または SQL 経由でクエリされたときは**保護されません**。フィールドレベルの暗号化により、次のことが保証されます。

- DBA は、直接クエリを実行する場合でも PHI フィールドを読み取ることができません
- データベースのダンプ/バックアップは引き続き暗号化されます
- 各フィールドは異なる **キー** を使用できます (懸念事項の分離)

＃＃＃２．２．暗号化用の JPA AttributeConverter

```java
package vn.hospital.encryption;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import jakarta.inject.Inject;

@Converter
public class EncryptedStringConverter implements AttributeConverter<String, String> {

    @Inject
    FieldEncryptionService encryptionService;

    @Override
    public String convertToDatabaseColumn(String plaintext) {
        if (plaintext == null) return null;
        return encryptionService.encrypt(plaintext);
    }

    @Override
    public String convertToEntityAttribute(String ciphertext) {
        if (ciphertext == null) return null;
        return encryptionService.decrypt(ciphertext);
    }
}
```

＃＃＃２．３．暗号化されたフィールドを持つエンティティ

```java
package vn.hospital.entity;

import jakarta.persistence.*;
import vn.hospital.encryption.EncryptedStringConverter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "patients", schema = "healthcare")
public class PatientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "mrn", unique = true, nullable = false)
    private String mrn;  // Medical Record Number - not encrypted (used for lookups)

    @Column(name = "full_name", nullable = false)
    @Convert(converter = EncryptedStringConverter.class)
    private String fullName;  // PHI - encrypted

    @Column(name = "ssn")
    @Convert(converter = EncryptedStringConverter.class)
    private String ssn;  // PHI - encrypted

    @Column(name = "date_of_birth")
    @Convert(converter = EncryptedStringConverter.class)
    private String dateOfBirth;  // PHI - encrypted (stored as string)

    @Column(name = "phone_number")
    @Convert(converter = EncryptedStringConverter.class)
    private String phoneNumber;  // PHI - encrypted

    @Column(name = "email")
    @Convert(converter = EncryptedStringConverter.class)
    private String email;  // PHI - encrypted

    @Column(name = "address", columnDefinition = "TEXT")
    @Convert(converter = EncryptedStringConverter.class)
    private String address;  // PHI - encrypted

    @Column(name = "diagnosis_codes", columnDefinition = "TEXT")
    @Convert(converter = EncryptedStringConverter.class)
    private String diagnosisCodes;  // PHI - encrypted (JSON array)

    @Column(name = "hospital_id", nullable = false)
    private String hospitalId;  // Not encrypted - used for row-level filtering

    @Column(name = "department", nullable = false)
    private String department;  // Not encrypted - used for access control

    @Column(name = "created_at", nullable = false)
    private LocalDate createdAt;

    // Getters, setters omitted for brevity
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getMrn() { return mrn; }
    public void setMrn(String mrn) { this.mrn = mrn; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getSsn() { return ssn; }
    public void setSsn(String ssn) { this.ssn = ssn; }
    public String getDateOfBirth() { return dateOfBirth; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getEmail() { return email; }
    public String getAddress() { return address; }
    public String getDiagnosisCodes() { return diagnosisCodes; }
    public String getHospitalId() { return hospitalId; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
}
```

＃＃＃２．４．データベーススキーマ

```sql
-- Encrypted columns sử dụng TEXT type vì ciphertext dài hơn plaintext
CREATE TABLE healthcare.patients (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mrn           VARCHAR(50) NOT NULL UNIQUE,
    full_name     TEXT NOT NULL,          -- encrypted
    ssn           TEXT,                   -- encrypted
    date_of_birth TEXT,                   -- encrypted
    phone_number  TEXT,                   -- encrypted
    email         TEXT,                   -- encrypted
    address       TEXT,                   -- encrypted
    diagnosis_codes TEXT,                 -- encrypted (JSON)
    hospital_id   VARCHAR(50) NOT NULL,
    department    VARCHAR(100) NOT NULL,
    created_at    DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index trên non-encrypted columns (có thể query)
CREATE INDEX idx_patients_hospital ON healthcare.patients(hospital_id);
CREATE INDEX idx_patients_department ON healthcare.patients(department);
CREATE INDEX idx_patients_mrn ON healthcare.patients(mrn);

-- KHÔNG THỂ index encrypted columns!
-- Nếu cần tìm kiếm theo encrypted field, dùng blind index
CREATE TABLE healthcare.patients_blind_index (
    patient_id    UUID REFERENCES healthcare.patients(id),
    field_name    VARCHAR(50) NOT NULL,
    blind_hash    BYTEA NOT NULL,  -- HMAC-SHA256 of plaintext
    PRIMARY KEY (patient_id, field_name)
);
CREATE INDEX idx_blind_hash ON healthcare.patients_blind_index(field_name, blind_hash);
```

## 3. HashiCorp Vault Transit Engine を使用したエンベロープ暗号化

＃＃＃３．１．エンベロープ暗号化パターン

![エンベロープ暗号化パターン — DEK + KEK (Vault Transit を使用)](/storage/uploads/2026/04/healthcare-envelope-encryption.webp)

**プロセス:**

1. アプリはランダムなデータ暗号化キー (DEK) を生成します
2. アプリは DEK (AES-256-GCM) で平文を暗号化します。
3. アプリはラッピングのために DEK を Vault Transit に送信します
4. Vault はキー暗号化キー (KEK) を使用して DEK を暗号化します。
5. アプリストア: `encrypted_data` + `wrapped_DEK` データベース内

＃＃＃３．２． Vault トランジット エンジンのセットアップ

```bash
# === Vault Setup ===

# Enable Transit secrets engine
vault secrets enable transit

# Create encryption keys cho healthcare
vault write -f transit/keys/phi-data \
    type=aes256-gcm96 \
    auto_rotate_period=720h  # Rotate every 30 days

vault write -f transit/keys/ssn-data \
    type=aes256-gcm96 \
    auto_rotate_period=720h

vault write -f transit/keys/medical-records \
    type=aes256-gcm96 \
    auto_rotate_period=720h

# Create policy cho Patient Service
vault policy write patient-service - << EOF
# Transit encrypt/decrypt
path "transit/encrypt/phi-data" {
  capabilities = ["update"]
}
path "transit/decrypt/phi-data" {
  capabilities = ["update"]
}
path "transit/encrypt/ssn-data" {
  capabilities = ["update"]
}
path "transit/decrypt/ssn-data" {
  capabilities = ["update"]
}

# Rewrap (key rotation)
path "transit/rewrap/phi-data" {
  capabilities = ["update"]
}
path "transit/rewrap/ssn-data" {
  capabilities = ["update"]
}

# Key info (read-only)
path "transit/keys/phi-data" {
  capabilities = ["read"]
}

# DENY: delete keys, export keys
path "transit/keys/*/config" {
  capabilities = ["deny"]
}
path "transit/export/*" {
  capabilities = ["deny"]
}
EOF

# Create AppRole for Patient Service
vault auth enable approle

vault write auth/approle/role/patient-service \
    token_policies="patient-service" \
    token_ttl=1h \
    token_max_ttl=4h \
    secret_id_ttl=720h
```

＃＃＃３．３．ボールト転送暗号化サービス

```java
package vn.hospital.encryption;

import io.quarkus.vault.VaultTransitSecretEngine;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@ApplicationScoped
public class VaultTransitEncryptionService {

    private static final Logger LOG = Logger.getLogger(VaultTransitEncryptionService.class);

    @Inject
    VaultTransitSecretEngine transitEngine;

    // Default key for PHI data
    private static final String PHI_KEY = "phi-data";
    private static final String SSN_KEY = "ssn-data";

    /**
     * Encrypt plaintext using Vault Transit engine.
     * Returns: vault:v1:base64encoded_ciphertext
     */
    public String encrypt(String plaintext) {
        return encrypt(plaintext, PHI_KEY);
    }

    public String encrypt(String plaintext, String keyName) {
        if (plaintext == null || plaintext.isEmpty()) return plaintext;

        try {
            // Vault Transit expects base64-encoded plaintext
            String base64Plaintext = Base64.getEncoder()
                .encodeToString(plaintext.getBytes(StandardCharsets.UTF_8));

            String ciphertext = transitEngine.encrypt(keyName, base64Plaintext);
            // Returns: vault:v1:xxxxx... or vault:v2:xxxxx...
            return ciphertext;
        } catch (Exception e) {
            LOG.errorf(e, "Vault encryption failed for key: %s", keyName);
            throw new EncryptionException("Failed to encrypt data", e);
        }
    }

    /**
     * Decrypt ciphertext using Vault Transit engine.
     */
    public String decrypt(String ciphertext) {
        return decrypt(ciphertext, PHI_KEY);
    }

    public String decrypt(String ciphertext, String keyName) {
        if (ciphertext == null || ciphertext.isEmpty()) return ciphertext;

        try {
            // Vault returns base64-encoded plaintext
            String base64Plaintext = transitEngine.decrypt(keyName, ciphertext);
            return new String(
                Base64.getDecoder().decode(base64Plaintext),
                StandardCharsets.UTF_8
            );
        } catch (Exception e) {
            LOG.errorf(e, "Vault decryption failed for key: %s", keyName);
            throw new EncryptionException("Failed to decrypt data", e);
        }
    }

    /**
     * Rewrap ciphertext with latest key version (for key rotation).
     * Old ciphertext (encrypted with v1) → new ciphertext (encrypted with v2)
     * WITHOUT exposing plaintext.
     */
    public String rewrap(String ciphertext, String keyName) {
        if (ciphertext == null) return null;

        try {
            return transitEngine.rewrap(keyName, ciphertext);
        } catch (Exception e) {
            LOG.errorf(e, "Vault rewrap failed for key: %s", keyName);
            throw new EncryptionException("Failed to rewrap data", e);
        }
    }

    /**
     * Encrypt SSN with dedicated key.
     */
    public String encryptSSN(String ssn) {
        return encrypt(ssn, SSN_KEY);
    }

    public String decryptSSN(String encryptedSSN) {
        return decrypt(encryptedSSN, SSN_KEY);
    }
}
```

＃＃＃３．４．フィールド暗号化サービス (Vault Transit を使用)

```java
package vn.hospital.encryption;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class FieldEncryptionService {

    @Inject
    VaultTransitEncryptionService vaultService;

    public String encrypt(String plaintext) {
        return vaultService.encrypt(plaintext);
    }

    public String decrypt(String ciphertext) {
        return vaultService.decrypt(ciphertext);
    }
}
```

＃＃＃３．５。 Quarkus Vault 拡張機能の構成

```properties
# application.properties - Vault Configuration

# === Vault Connection ===
quarkus.vault.url=https://vault.hospital.internal:8200
quarkus.vault.authentication.approle.role-id=${VAULT_ROLE_ID}
quarkus.vault.authentication.approle.secret-id=${VAULT_SECRET_ID}

# TLS for Vault connection
quarkus.vault.tls.ca-cert=classpath:vault-ca.pem
quarkus.vault.tls.use-kubernetes-ca-cert=false

# === Transit Engine ===
quarkus.vault.transit.enabled=true

# === Token Renewal ===
quarkus.vault.renew-grace-period=1H
quarkus.vault.secret-config-cache-period=10M

# === Vault KV for secrets (optional) ===
quarkus.vault.secret-config-kv-path=healthcare/patient-service

# === Dev Profile ===
%dev.quarkus.vault.url=http://localhost:8200
%dev.quarkus.vault.authentication.client-token=dev-root-token
%dev.quarkus.vault.devservices.enabled=true
%dev.quarkus.vault.devservices.image-name=hashicorp/vault:1.15
```

＃＃＃３．６． Maven の依存関係

```xml
<!-- pom.xml - Vault Extension -->
<dependencies>
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-vault</artifactId>
    </dependency>
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-vault-transit</artifactId>
    </dependency>
</dependencies>
```

## 4. サービス間通信のための JWE (JSON Web 暗号化)

＃＃＃４．１． JWEの概要

マイクロサービスが HTTP (REST 呼び出し) 経由で PHI データを送信する場合、JWT は **署名** (JWS) されるだけで、**暗号化されません**。つまり、誰でもペイロードをデコードできます。 JWE はペイロード全体を暗号化します。

```
┌─────────────────────────────────────────────────────────┐
│  JWS (JSON Web Signature) - chỉ signed                  │
│                                                          │
│  Header.Payload.Signature                                │
│  │       │         │                                     │
│  │       │         └── Verify integrity                  │
│  │       └──────────── Base64 decode = readable!         │
│  └──────────────────── Algorithm info                    │
│                                                          │
│  JWE (JSON Web Encryption) - encrypted                   │
│                                                          │
│  Header.EncKey.IV.Ciphertext.AuthTag                     │
│  │       │     │      │         │                        │
│  │       │     │      │         └── Authentication tag   │
│  │       │     │      └──────────── Encrypted payload    │
│  │       │     └─────────────────── Initialization vec   │
│  │       └───────────────────────── Encrypted content key│
│  └───────────────────────────────── Algorithm info       │
└─────────────────────────────────────────────────────────┘
```

＃＃＃４．２． JWEの実装

```java
package vn.hospital.encryption;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.*;
import com.nimbusds.jose.jwk.*;
import com.nimbusds.jose.jwk.gen.*;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;

@ApplicationScoped
public class JweService {

    private static final Logger LOG = Logger.getLogger(JweService.class);

    @Inject
    KeyManagementService keyService;

    /**
     * Encrypt payload to JWE compact serialization.
     * Algorithm: RSA-OAEP-256 + A256GCM
     */
    public String encrypt(String payload, String recipientServiceId) {
        try {
            // Get recipient's public key
            RSAKey recipientPublicKey = keyService.getPublicKey(recipientServiceId);

            // Create JWE header
            JWEHeader header = new JWEHeader.Builder(
                    JWEAlgorithm.RSA_OAEP_256,  // Key encryption
                    EncryptionMethod.A256GCM      // Content encryption
                )
                .contentType("JSON")
                .keyID(recipientPublicKey.getKeyID())
                .build();

            // Create JWE object
            JWEObject jwe = new JWEObject(header, new Payload(payload));

            // Encrypt with recipient's public key
            jwe.encrypt(new RSAEncrypter(recipientPublicKey));

            return jwe.serialize();
        } catch (JOSEException e) {
            LOG.error("JWE encryption failed", e);
            throw new EncryptionException("Failed to create JWE", e);
        }
    }

    /**
     * Decrypt JWE compact serialization.
     */
    public String decrypt(String jweString) {
        try {
            JWEObject jwe = JWEObject.parse(jweString);

            // Get our private key
            RSAKey privateKey = keyService.getPrivateKey();

            // Decrypt
            jwe.decrypt(new RSADecrypter(privateKey));

            return jwe.getPayload().toString();
        } catch (Exception e) {
            LOG.error("JWE decryption failed", e);
            throw new EncryptionException("Failed to decrypt JWE", e);
        }
    }
}
```

＃＃＃４．３．鍵管理サービス

```java
package vn.hospital.encryption;

import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.gen.RSAKeyGenerator;
import io.quarkus.vault.VaultKVSecretEngine;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import java.util.Map;

@ApplicationScoped
public class KeyManagementService {

    private static final Logger LOG = Logger.getLogger(KeyManagementService.class);

    @Inject
    VaultKVSecretEngine kvEngine;

    @ConfigProperty(name = "app.service-id")
    String serviceId;

    private RSAKey cachedPrivateKey;

    /**
     * Get public key for a recipient service.
     * Keys are stored in Vault KV engine.
     */
    public RSAKey getPublicKey(String serviceId) {
        try {
            Map<String, String> secret = kvEngine.readSecret(
                "healthcare/jwe-keys/" + serviceId);
            String jwkJson = secret.get("public_key");
            return RSAKey.parse(jwkJson);
        } catch (Exception e) {
            LOG.errorf(e, "Failed to get public key for service: %s", serviceId);
            throw new EncryptionException("Public key not found", e);
        }
    }

    /**
     * Get our private key (cached).
     */
    public RSAKey getPrivateKey() {
        if (cachedPrivateKey == null) {
            try {
                Map<String, String> secret = kvEngine.readSecret(
                    "healthcare/jwe-keys/" + serviceId);
                String jwkJson = secret.get("private_key");
                cachedPrivateKey = RSAKey.parse(jwkJson);
            } catch (Exception e) {
                LOG.error("Failed to get private key", e);
                throw new EncryptionException("Private key not found", e);
            }
        }
        return cachedPrivateKey;
    }

    /**
     * Generate and store new RSA key pair for a service.
     * Run this during service provisioning.
     */
    public void generateAndStoreKeyPair(String serviceId) {
        try {
            RSAKey rsaKey = new RSAKeyGenerator(4096)
                .keyID(serviceId + "-" + System.currentTimeMillis())
                .generate();

            // Store private key (full JWK)
            // Store public key (public JWK only)
            kvEngine.writeSecret("healthcare/jwe-keys/" + serviceId,
                Map.of(
                    "private_key", rsaKey.toJSONString(),
                    "public_key", rsaKey.toPublicJWK().toJSONString()
                )
            );

            LOG.infof("Generated JWE key pair for service: %s", serviceId);
        } catch (Exception e) {
            throw new EncryptionException("Key generation failed", e);
        }
    }
}
```

＃＃＃４．４． JWE REST クライアント フィルター

```java
package vn.hospital.client;

import jakarta.inject.Inject;
import jakarta.ws.rs.client.ClientRequestContext;
import jakarta.ws.rs.client.ClientRequestFilter;
import jakarta.ws.rs.client.ClientResponseContext;
import jakarta.ws.rs.client.ClientResponseFilter;
import vn.hospital.encryption.JweService;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

/**
 * JAX-RS Client filter that encrypts request bodies and decrypts response bodies
 * for inter-service communication.
 */
public class JweClientFilter implements ClientRequestFilter, ClientResponseFilter {

    @Inject
    JweService jweService;

    private final String recipientServiceId;

    public JweClientFilter(String recipientServiceId) {
        this.recipientServiceId = recipientServiceId;
    }

    @Override
    public void filter(ClientRequestContext request) throws IOException {
        if (request.hasEntity()) {
            String body = request.getEntity().toString();
            String encrypted = jweService.encrypt(body, recipientServiceId);
            request.setEntity(encrypted);
            request.getHeaders().putSingle("Content-Type", "application/jose");
        }
    }

    @Override
    public void filter(ClientRequestContext request,
                       ClientResponseContext response) throws IOException {
        String contentType = response.getHeaderString("Content-Type");
        if ("application/jose".equals(contentType) && response.hasEntity()) {
            byte[] body = response.getEntityStream().readAllBytes();
            String jweString = new String(body, StandardCharsets.UTF_8);
            String decrypted = jweService.decrypt(jweString);
            response.setEntityStream(
                new ByteArrayInputStream(decrypted.getBytes(StandardCharsets.UTF_8)));
            response.getHeaders().putSingle("Content-Type", "application/json");
        }
    }
}
```

## 5. 暗号化された Kafka メッセージ

＃＃＃５．１． Kafka の暗号化アーキテクチャ

```
┌─────────────────────────────────────────────────────────┐
│           Encrypted Kafka Message Flow                   │
│                                                          │
│  Producer (Patient Service)                              │
│    │                                                     │
│    ├── 1. Serialize PatientEvent → JSON                  │
│    ├── 2. Generate random DEK (AES-256)                  │
│    ├── 3. Encrypt JSON with DEK                          │
│    ├── 4. Wrap DEK with Vault Transit                    │
│    ├── 5. Create envelope: {wrapped_dek, iv, ciphertext} │
│    └── 6. Publish to Kafka                               │
│                                                          │
│  Kafka Broker                                            │
│    │  Messages are encrypted — broker cannot read        │
│    │                                                     │
│  Consumer (Lab Service)                                  │
│    │                                                     │
│    ├── 1. Read envelope from Kafka                       │
│    ├── 2. Unwrap DEK with Vault Transit                  │
│    ├── 3. Decrypt ciphertext with DEK                    │
│    ├── 4. Deserialize JSON → PatientEvent                │
│    └── 5. Process event                                  │
└─────────────────────────────────────────────────────────┘
```

＃＃＃５．２．暗号化された Kafka シリアライザー

```java
package vn.hospital.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.vault.VaultTransitSecretEngine;
import org.apache.kafka.common.serialization.Serializer;
import org.jboss.logging.Logger;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Map;

public class EncryptedSerializer<T> implements Serializer<T> {

    private static final Logger LOG = Logger.getLogger(EncryptedSerializer.class);
    private static final String TRANSIT_KEY = "kafka-messages";
    private static final int GCM_TAG_LENGTH = 128;
    private static final int IV_LENGTH = 12;

    private ObjectMapper objectMapper;
    private VaultTransitSecretEngine transitEngine;

    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
        this.objectMapper = (ObjectMapper) configs.get("object.mapper");
        this.transitEngine = (VaultTransitSecretEngine) configs.get("vault.transit");
    }

    @Override
    public byte[] serialize(String topic, T data) {
        if (data == null) return null;

        try {
            // 1. Serialize to JSON
            String json = objectMapper.writeValueAsString(data);

            // 2. Generate random DEK
            KeyGenerator keyGen = KeyGenerator.getInstance("AES");
            keyGen.init(256);
            SecretKey dek = keyGen.generateKey();

            // 3. Generate random IV
            byte[] iv = new byte[IV_LENGTH];
            new SecureRandom().nextBytes(iv);

            // 4. Encrypt with DEK (AES-256-GCM)
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(Cipher.ENCRYPT_MODE, dek, new GCMParameterSpec(GCM_TAG_LENGTH, iv));
            byte[] ciphertext = cipher.doFinal(json.getBytes(StandardCharsets.UTF_8));

            // 5. Wrap DEK with Vault Transit
            String dekBase64 = Base64.getEncoder().encodeToString(dek.getEncoded());
            String wrappedDek = transitEngine.encrypt(TRANSIT_KEY, dekBase64);

            // 6. Build envelope: [wrappedDekLength][wrappedDek][iv][ciphertext]
            byte[] wrappedDekBytes = wrappedDek.getBytes(StandardCharsets.UTF_8);
            ByteBuffer envelope = ByteBuffer.allocate(
                4 + wrappedDekBytes.length + IV_LENGTH + ciphertext.length);
            envelope.putInt(wrappedDekBytes.length);
            envelope.put(wrappedDekBytes);
            envelope.put(iv);
            envelope.put(ciphertext);

            return envelope.array();
        } catch (Exception e) {
            LOG.error("Kafka message encryption failed", e);
            throw new RuntimeException("Encryption failed", e);
        }
    }
}
```

＃＃＃５．３．暗号化された Kafka デシリアライザー

```java
package vn.hospital.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.vault.VaultTransitSecretEngine;
import org.apache.kafka.common.serialization.Deserializer;
import org.jboss.logging.Logger;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

public class EncryptedDeserializer<T> implements Deserializer<T> {

    private static final Logger LOG = Logger.getLogger(EncryptedDeserializer.class);
    private static final String TRANSIT_KEY = "kafka-messages";
    private static final int GCM_TAG_LENGTH = 128;
    private static final int IV_LENGTH = 12;

    private ObjectMapper objectMapper;
    private VaultTransitSecretEngine transitEngine;
    private Class<T> targetType;

    @Override
    @SuppressWarnings("unchecked")
    public void configure(Map<String, ?> configs, boolean isKey) {
        this.objectMapper = (ObjectMapper) configs.get("object.mapper");
        this.transitEngine = (VaultTransitSecretEngine) configs.get("vault.transit");
        this.targetType = (Class<T>) configs.get("target.type");
    }

    @Override
    public T deserialize(String topic, byte[] data) {
        if (data == null) return null;

        try {
            ByteBuffer buffer = ByteBuffer.wrap(data);

            // 1. Read wrapped DEK
            int wrappedDekLength = buffer.getInt();
            byte[] wrappedDekBytes = new byte[wrappedDekLength];
            buffer.get(wrappedDekBytes);
            String wrappedDek = new String(wrappedDekBytes, StandardCharsets.UTF_8);

            // 2. Read IV
            byte[] iv = new byte[IV_LENGTH];
            buffer.get(iv);

            // 3. Read ciphertext
            byte[] ciphertext = new byte[buffer.remaining()];
            buffer.get(ciphertext);

            // 4. Unwrap DEK with Vault Transit
            String dekBase64 = transitEngine.decrypt(TRANSIT_KEY, wrappedDek);
            byte[] dekBytes = Base64.getDecoder().decode(dekBase64);
            SecretKeySpec dek = new SecretKeySpec(dekBytes, "AES");

            // 5. Decrypt with DEK
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(Cipher.DECRYPT_MODE, dek, new GCMParameterSpec(GCM_TAG_LENGTH, iv));
            byte[] plaintext = cipher.doFinal(ciphertext);

            // 6. Deserialize JSON
            return objectMapper.readValue(plaintext, targetType);
        } catch (Exception e) {
            LOG.error("Kafka message decryption failed", e);
            throw new RuntimeException("Decryption failed", e);
        }
    }
}
```

＃＃＃５．４．カフカの構成

```properties
# application.properties - Encrypted Kafka

# === Kafka Connection ===
kafka.bootstrap.servers=kafka.hospital.internal:9093

# SSL for Kafka connection
kafka.security.protocol=SSL
kafka.ssl.truststore.location=/etc/kafka/truststore.p12
kafka.ssl.truststore.password=${KAFKA_TRUSTSTORE_PASSWORD}
kafka.ssl.keystore.location=/etc/kafka/keystore.p12
kafka.ssl.keystore.password=${KAFKA_KEYSTORE_PASSWORD}

# === Outgoing Channel (Producer) ===
mp.messaging.outgoing.patient-events.connector=smallrye-kafka
mp.messaging.outgoing.patient-events.topic=healthcare.patient-events
mp.messaging.outgoing.patient-events.value.serializer=vn.hospital.kafka.EncryptedSerializer

# === Incoming Channel (Consumer) ===
mp.messaging.incoming.patient-events-in.connector=smallrye-kafka
mp.messaging.incoming.patient-events-in.topic=healthcare.patient-events
mp.messaging.incoming.patient-events-in.value.deserializer=vn.hospital.kafka.EncryptedDeserializer
mp.messaging.incoming.patient-events-in.group.id=lab-service
```

## 6. 主要なローテーション戦略

＃＃＃６．１．キーローテーションのアーキテクチャ

```
┌─────────────────────────────────────────────────────────┐
│              Key Rotation Strategy                       │
│                                                          │
│  Phase 1: Rotate KEK in Vault                            │
│    vault write -f transit/keys/phi-data/rotate           │
│    → New version v2 created                              │
│    → Old v1 still active for decrypt                     │
│                                                          │
│  Phase 2: Rewrap existing data                           │
│    SELECT * FROM patients WHERE encrypted_col             │
│      LIKE 'vault:v1:%'                                   │
│    → For each row: vault rewrap                          │
│    → vault:v1:xxx → vault:v2:yyy (no plaintext exposed) │
│                                                          │
│  Phase 3: Disable old key version                        │
│    vault write transit/keys/phi-data/config              │
│      min_decryption_version=2                            │
│                                                          │
│  Timeline:                                               │
│  ├── Day 0: Rotate key                                   │
│  ├── Day 1-7: Rewrap all data                            │
│  ├── Day 8: Verify no v1 data remains                    │
│  └── Day 9: Disable v1                                   │
└─────────────────────────────────────────────────────────┘
```

＃＃＃６．２．キーローテーションジョブ

```java
package vn.hospital.encryption;

import io.quarkus.scheduler.Scheduled;
import io.quarkus.vault.VaultTransitSecretEngine;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.jboss.logging.Logger;

import java.util.List;

@ApplicationScoped
public class KeyRotationJob {

    private static final Logger LOG = Logger.getLogger(KeyRotationJob.class);

    @Inject
    VaultTransitSecretEngine transitEngine;

    @Inject
    EntityManager entityManager;

    @Inject
    VaultTransitEncryptionService encryptionService;

    /**
     * Rewrap data encrypted with old key versions.
     * Runs daily at 2 AM.
     */
    @Scheduled(cron = "0 0 2 * * ?")
    @Transactional
    public void rewrapOldData() {
        LOG.info("Starting key rotation rewrap job");

        int totalRewrapped = 0;
        int batchSize = 100;

        // Rewrap patients table
        totalRewrapped += rewrapTable(
            "healthcare.patients",
            List.of("full_name", "ssn", "date_of_birth", "phone_number",
                     "email", "address", "diagnosis_codes"),
            "phi-data",
            batchSize
        );

        LOG.infof("Key rotation complete: %d fields rewrapped", totalRewrapped);
    }

    @SuppressWarnings("unchecked")
    private int rewrapTable(String tableName, List<String> columns,
                             String keyName, int batchSize) {
        int totalRewrapped = 0;

        // Get current key version
        // Vault Transit ciphertext format: vault:vN:base64data
        // We want to rewrap anything not on latest version

        for (String column : columns) {
            // Find rows with old key versions
            String sql = String.format(
                "SELECT id, %s FROM %s WHERE %s IS NOT NULL " +
                "AND %s NOT LIKE 'vault:v%%' LIMIT %d",
                column, tableName, column, column, batchSize);

            // Note: In production, determine latest version dynamically
            List<Object[]> rows = entityManager.createNativeQuery(sql)
                .getResultList();

            for (Object[] row : rows) {
                String id = row[0].toString();
                String ciphertext = (String) row[1];

                try {
                    String rewrapped = encryptionService.rewrap(ciphertext, keyName);

                    if (!rewrapped.equals(ciphertext)) {
                        String updateSql = String.format(
                            "UPDATE %s SET %s = ?1 WHERE id = ?2::uuid",
                            tableName, column);
                        entityManager.createNativeQuery(updateSql)
                            .setParameter(1, rewrapped)
                            .setParameter(2, id)
                            .executeUpdate();
                        totalRewrapped++;
                    }
                } catch (Exception e) {
                    LOG.errorf(e, "Rewrap failed for %s.%s id=%s",
                        tableName, column, id);
                }
            }
        }

        return totalRewrapped;
    }
}
```

＃＃＃６．３．キーローテーションボールトコマンド

```bash
# === Rotate encryption key ===
# Tạo key version mới (old versions vẫn dùng để decrypt)
vault write -f transit/keys/phi-data/rotate

# Check key versions
vault read transit/keys/phi-data
# latest_version: 2
# min_decryption_version: 1
# min_encryption_version: 0 (latest)

# === After rewrap complete ===
# Set minimum decryption version (disable old versions)
vault write transit/keys/phi-data/config \
    min_decryption_version=2

# === Emergency: Disable a compromised key version ===
vault write transit/keys/phi-data/config \
    min_decryption_version=3  # Skip compromised v2

# === Key rotation audit ===
vault audit list
vault read sys/audit
```

## 7. ログと例外での機密データの処理

＃＃＃７．１．ロギング用の PHI マスキング

```java
package vn.hospital.logging;

import io.quarkus.logging.LoggingFilter;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.logging.Filter;
import java.util.logging.LogRecord;
import java.util.regex.Pattern;

@ApplicationScoped
@LoggingFilter(name = "phi-masking-filter")
public class PhiMaskingFilter implements Filter {

    // Patterns for PHI data
    private static final Pattern SSN_PATTERN =
        Pattern.compile("\\b\\d{3}-?\\d{2}-?\\d{4}\\b");
    private static final Pattern PHONE_PATTERN =
        Pattern.compile("\\b(\\+?\\d{1,3}[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}\\b");
    private static final Pattern EMAIL_PATTERN =
        Pattern.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
    private static final Pattern MRN_PATTERN =
        Pattern.compile("\\bMRN[:\\s]*[A-Z0-9]{6,15}\\b");

    @Override
    public boolean isLoggable(LogRecord record) {
        if (record.getMessage() != null) {
            String masked = maskPHI(record.getMessage());
            record.setMessage(masked);
        }
        return true;
    }

    public static String maskPHI(String input) {
        if (input == null) return null;

        String result = input;
        result = SSN_PATTERN.matcher(result).replaceAll("***-**-****");
        result = PHONE_PATTERN.matcher(result).replaceAll("***-***-****");
        result = EMAIL_PATTERN.matcher(result).replaceAll("***@***.***");
        result = MRN_PATTERN.matcher(result).replaceAll("MRN:***");

        return result;
    }
}
```

＃＃＃７．２．ロギングフィルターの application.properties

```properties
# Enable PHI masking filter
quarkus.log.filter."phi-masking-filter".if-starts-with=vn.hospital

# Structured JSON logging cho audit
quarkus.log.console.json=true
quarkus.log.console.json.additional-field."app".value=patient-service
quarkus.log.console.json.additional-field."env".value=${ENV:dev}
```

## 概要

このレッスンでは、医療マイクロサービス向けの包括的な **エンドツーエンド暗号化**を構築しました。

1. **フィールドレベルの暗号化**: JPA AttributeConverter は PHI 列を自動的に暗号化/復号化します - DBA は平文を読み取ることができません
2. **エンベロープ暗号化**: Vault Transit エンジンが KEK を管理し、アプリケーションは DEK を使用します — キー管理の分離
3. **Vault 統合**: Quarkus Vault 拡張機能、AppRole 認証、トランジット暗号化/復号化/再ラップ API
4. **JWE**: サービス間 REST 呼び出し用の JSON Web 暗号化 - ペイロードは署名されるだけでなくエンドツーエンドで暗号化されます
5. **暗号化された Kafka**: エンベロープ暗号化を使用したカスタム シリアライザー/デシリアライザー — ブローカーはメッセージを読み取ることができません
6. **キー ローテーション**: 自動再ラップ ジョブ、ダウンタイムなしのキー ローテーション、マルチバージョン キーのサポート
7. **PHI マスキング**: ロギング フィルターは、ログへの PHI の漏洩を防ぎ、サニタイズを例外とします。

暗号化の状況:

```
Client ──[TLS 1.3]──► Gateway ──[TLS]──► Service
                                              │
                                   ┌──────────┼──────────┐
                                   │          │          │
                              Field-Level  JWE       Encrypted
                              Encryption  payloads   Kafka
                                   │          │          │
                                   └──────────┼──────────┘
                                              │
                                    Vault Transit (KEK)
```

## 演習

1. **フィールドレベル暗号化**: JPA + PostgreSQL を使用して Quarkus プロジェクトを作成します。実装する `EncryptedStringConverter` AES-256-GCM (ローカルキーが最初) を使用します。作成 `PatientEntity` 暗号化されたフィールド (フルネーム、SSN、電子メール) を使用します。患者を INSERT/SELECT し、データベース内のデータが暗号文であることを確認します (使用 `psql` 直接問い合わせます）。

2. **Vault Transit Integration**: HashiCorp Vault (Docker) をセットアップします。トランジット エンジンを有効にし、キーを生成します `phi-data`。 Quarkus Vault 拡張機能を構成します。むしろ `EncryptedStringConverter` Vault Transit を使用します。 Vault を介して暗号化/復号化をテストします。暗号文内のキーのバージョンを確認します (`vault:v1:...`）。

3. **キーのローテーション**: Vault 内のキーをローテーションします (`vault write -f transit/keys/phi-data/rotate`）。 v2 を使用して新しい挿入を確認します。既存のデータの再ラップ ジョブを実装します。 v2 に転送されたすべてのデータを確認します。セット `min_decryption_version=2` そして検証してください。

4. **暗号化された Kafka**: Kafka をセットアップします (Docker Compose)。実装する `EncryptedSerializer` そして `EncryptedDeserializer` エンベロープ暗号化を使用します。 PatientEvent 暗号化メッセージを公開します。消費して復号化します。 Kafka (kafka-console-consumer) のメッセージがバイナリ/暗号化されており、読み取り不可能であることを確認します。

---

---

<!-- SERIES-NAV:START -->
| ◀ 前の記事 |次の記事 ▶ |
|:---|---:|
| [レッスン 14: API ゲートウェイのセキュリティ - レート制限、入力検証、WAF](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-14-api-gateway-rate-limiting-waf) | [レッスン 16: mTLS、サービス メッシュ、安全なサービス間通信](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-16-mtls-service-mesh-inter-service-communication) |
<!-- SERIES-NAV:END -->
