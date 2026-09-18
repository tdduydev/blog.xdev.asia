---
id: 019e1a40-a115-7001-d001-f0a1b2c30115
title: 第 15 課：微服務中的端對端加密
slug: bai-15-ma-hoa-end-to-end-microservices
description: >-
  微服務中的端對端醫療資料加密：Quarkus 實體中的字段級加密、使用 HashiCorp Vault Transit 引擎的信封加密、用於服務間通訊的
  JWE（JSON Web 加密）、加密的 Kafka 訊息、金鑰輪換策略和 Quarkus Vault 擴充整合。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 15
section_title: 第 4 部分：使用 Quarkus 建構微服務
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: 建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🏗️ 建築 — 第 15 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 15 課：端對端加密</tspan>
      <tspan x="60" dy="42">微服務</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 4 部分：使用 Quarkus 建構微服務</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 1. 醫療保健端對端加密概述

![醫療保健微服務中的端對端加密 - 信封加密、Vault、Kafka](/storage/uploads/2026/04/healthcare-e2e-encryption-flow.webp)

在醫療微服務系統中，PHI 資料經過**多層**：從客戶端 → API 閘道 → 服務 → Kafka → 資料庫。端對端加密可確保資料在每個點**始終受到保護** — 不僅是傳輸中 (TLS)，還包括靜態和使用中的資料。

### 1.1。加密架構

![端對端加密架構 - 客戶端 → API 閘道 → 服務 → 帶有 Vault 的資料庫](/storage/uploads/2026/04/healthcare-e2e-encryption-flow.webp)

**加密流程：**

- **客戶端** → **API網關**：TLS 1.3（傳輸加密）+ JWT驗證
- **病患服務**：使用 Vault Transit Engine 進行現場級加密（SSN、診斷）
- **輸出**：PostgreSQL（AES-256-GCM 加密欄位）、Kafka（JWE 訊息）、實驗室服務（JWE 負載）
- **HashiCorp Vault**：傳輸引擎（加密金鑰）、KV 引擎（憑證）、PKI 引擎（TLS 憑證）、自動解封（雲端 KMS）

### 1.2。加密層

|層 |加密 |金鑰管理|當 |
|--------|---------|----------|--------|
|交通 | TLS 1.3 |憑證授權單位 |請求/回應 |
|現場級| AES-256-GCM |避難所運輸|保存資料庫之前|
|留言 | JWE（RSA-OAEP + AES）|避難所運輸 |服務間訊息傳送 |
|資料庫| pgcrypto/TDE | PostgreSQL 管理 |休息時|
|備份| AES-256 |知識管理系統 |備份檔案|

## 2. 使用 JPA AttributeConverter 進行字段級加密

### 2.1。為什麼要進行欄位級加密？

資料庫級加密（TDE - 透明資料加密）保護靜態數據，但在資料載入到記憶體或透過 SQL 查詢時**不保護**。欄位級加密可確保：

- 即使直接查詢，DBA 也無法讀取 PHI 字段
- 資料庫轉儲/備份仍然加密
- 每個欄位可以使用不同的**鍵**（關注點分離）

### 2.2。用於加密的 JPA AttributeConverter

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

### 2.3。具有加密欄位的實體

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

### 2.4。資料庫結構定義

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

## 3. 使用 HashiCorp Vault 傳輸引擎進行信封加密

### 3.1。信封加密模式

![信封加密模式 — DEK + KEK 與 Vault Transit](/storage/uploads/2026/04/healthcare-envelope-encryption.webp)

**流程：**

1. App產生隨機資料加密金鑰（DEK）
2.應用程式使用DEK（AES-256-GCM）加密明文
3. 應用程式將 DEK 送到 Vault Transit 進行包裝
4. Vault使用金鑰加密金鑰（KEK）加密DEK
5.應用程式商店： `encrypted_data` + `wrapped_DEK` 在資料庫中

### 3.2。 Vault 傳輸引擎設置

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

### 3.3。 Vault 傳輸加密服務

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

### 3.4。現場加密服務（使用 Vault Transit）

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

### 3.5。 Quarkus Vault 擴展配置

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

### 3.6。 Maven 依賴項

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

## 4. 用於服務間通訊的 JWE（JSON Web 加密）

### 4.1。 JWE概述

當微服務透過 HTTP（REST 呼叫）發送 PHI 資料時，JWT 僅**簽名**（JWS）但**未加密** - 任何人都可以解碼有效負載。 JWE 加密整個有效負載：

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

### 4.2。 JWE實施

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

### 4.3。密鑰管理服務

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

### 4.4。 JWE REST 用戶端過濾器

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

## 5. 加密的 Kafka 訊息

### 5.1。 Kafka 的加密架構

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

### 5.2。加密的 Kafka 序列化器

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

### 5.3。加密的 Kafka 反序列化器

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

### 5.4。卡夫卡配置

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

## 6. 關鍵輪替策略

### 6.1。金鑰輪換架構

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

### 6.2。關鍵輪調工作

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

### 6.3。關鍵旋轉 Vault 指令

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

## 7. 日誌和異常中的敏感資料處理

### 7.1。用於日誌記錄的 PHI 屏蔽

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

### 7.2。日誌過濾器的 application.properties

```properties
# Enable PHI masking filter
quarkus.log.filter."phi-masking-filter".if-starts-with=vn.hospital

# Structured JSON logging cho audit
quarkus.log.console.json=true
quarkus.log.console.json.additional-field."app".value=patient-service
quarkus.log.console.json.additional-field."env".value=${ENV:dev}
```

## 總結

在本課程中，我們為醫療保健微服務建立了全面的**端對端加密**：

1. **字段級加密**：JPA AttributeConverter 自動加密/解密 PHI 欄位 — DBA 無法讀取明文
2. **信封加密**：Vault Transit 引擎管理 KEK，應用程式使用 DEK — 金鑰管理分離
3. **Vault 整合**：Quarkus Vault 擴充功能、AppRole 驗證、Transit 加密/解密/重新包裝 API
4. **JWE**：用於服務間 REST 呼叫的 JSON Web 加密 — 負載加密端到端，而不僅僅是簽名
5. **加密的 Kafka**：具有信封加密的自訂序列化器/反序列化器 - 代理無法讀取訊息
6. **密鑰輪換**：自動重新包裝作業、零停機密鑰輪換、多版本密鑰支持
7. **PHI Masking**：日誌過濾器防止 PHI 洩漏到日誌中，異常清理

加密景觀：

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

## 練習

1. **字段級加密**：使用JPA + PostgreSQL建立Quarkus專案。實施 `EncryptedStringConverter` 使用 AES-256-GCM（本地金鑰優先）。創建 `PatientEntity` 帶有加密欄位（全名、ssn、電子郵件）。 INSERT/SELECT 患者並驗證資料庫中的資料是密文（使用 `psql` 直接查詢）。

2. **Vault Transit Integration**：設定 HashiCorp Vault (Docker)。啟用 Transit 引擎，產生金鑰 `phi-data`。配置 Quarkus Vault 擴充。而是 `EncryptedStringConverter` 使用避難所運輸。透過 Vault 測試加密/解密。驗證密文中的金鑰版本（`vault:v1:...`）。

3. **密鑰輪換**：輪換 Vault 中的密鑰（`vault write -f transit/keys/phi-data/rotate`）。使用 v2 驗證新插入。對現有資料實施重新包裝作業。驗證傳輸到 v2 的所有資料。套裝 `min_decryption_version=2` 並驗證。

4. **加密 Kafka**：設定 Kafka (Docker Compose)。實施 `EncryptedSerializer` 和 `EncryptedDeserializer` 與信封加密。發布 PatientEvent 加密訊息。消費並解密。驗證 Kafka (kafka-console-consumer) 中的訊息是二進位/加密的，不可讀。

---

---

<!-- SERIES-NAV:START -->
| ◀ 上一篇 |下一篇文章 ▶ |
|:---|---:|
| [第 14 課：API 網關安全 - 速率限制、輸入驗證和 WAF](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-14-api-gateway-rate-limiting-waf) | [第 16 課：mTLS、服務網格和安全服務間通信](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-16-mtls-service-mesh-inter-service-communication) |
<!-- SERIES-NAV:END -->
