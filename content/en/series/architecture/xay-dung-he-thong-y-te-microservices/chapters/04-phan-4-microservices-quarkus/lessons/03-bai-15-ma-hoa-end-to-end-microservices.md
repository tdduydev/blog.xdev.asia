---
id: 019e1a40-a115-7001-d001-f0a1b2c30115
title: 'Lesson 15: End-to-End Encryption in Microservices'
slug: bai-15-ma-hoa-end-to-end-microservices
description: >-
  End-to-end medical data encryption in microservices: field-level encryption in
  Quarkus entities, envelope encryption with HashiCorp Vault Transit engine, JWE
  (JSON Web Encryption) for inter-service communication, encrypted Kafka
  messages, key rotation strategies, and Quarkus Vault extension integration.
duration_minutes: 180
is_free: true
video_url: null
sort_order: 15
section_title: 'Part 4: Building Microservices with Quarkus'
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🏗️ Architecture — Lesson 15</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 15: End-to-End encryption in</tspan>
      <tspan x="60" dy="42">Microservices</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Building a Microservices Healthcare System — Quarkus, PostgreSQL, Keycloak with HIPAA standards</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 4: Building Microservices with Quarkus</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. Overview of End-to-End Encryption for Healthcare

![End-to-End Encryption in Healthcare Microservices — Envelope Encryption, Vault, Kafka](/storage/uploads/2026/04/healthcare-e2e-encryption-flow.webp)

In the medical microservices system, PHI data moves through **many layers**: from client → API Gateway → Service → Kafka → Database. End-to-end encryption ensures data is **always protected** at every point — not just in-transit (TLS) but also at-rest and in-use.

### 1.1. Encryption Architecture

![End-to-End Encryption Architecture — Client → API Gateway → Services → Database with Vault](/storage/uploads/2026/04/healthcare-e2e-encryption-flow.webp)

**Encryption Flow:**

- **Client** → **API Gateway**: TLS 1.3 (transport encryption) + JWT validation
- **Patient Service**: Field-level encryption (SSN, diagnosis) with Vault Transit Engine
- **Outputs**: PostgreSQL (AES-256-GCM encrypted columns), Kafka (JWE messages), Lab Service (JWE payload)
- **HashiCorp Vault**: Transit Engine (encryption keys), KV Engine (credentials), PKI Engine (TLS certs), Auto-unseal (Cloud KMS)

### 1.2. Encryption Layers

| Layers | Encryption | Key Management | When |
|-------|-----------|----------|-------|
| Transportation | TLS 1.3 | Certificate Authority | Request/Response |
| Field-Level | AES-256-GCM | Vault Transit | Before saving DB |
| Message | JWE (RSA-OAEP + AES) | Vault Transit | Inter-service messaging |
| Database | pgcrypto/TDE | PostgreSQL managed | At-rest |
| Backups | AES-256 | KMS | Backup files |

## 2. Field-Level Encryption with JPA AttributeConverter

### 2.1. Why Field-Level Encryption?

Database-level encryption (TDE - Transparent Data Encryption) protects data at-rest but **does not protect** when data has been loaded into memory or queried via SQL. Field-level encryption ensures:

- DBA cannot read PHI fields even when querying directly
- Database dump / backup is still encrypted
- Each field can use a different **key** (separation of concerns)

### 2.2. JPA AttributeConverter for Encryption

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

### 2.3. Entity with Encrypted Fields

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

### 2.4. Database Schema

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

## 3. Envelope Encryption with HashiCorp Vault Transit Engine

### 3.1. Envelope Encryption Pattern

![Envelope Encryption Pattern — DEK + KEK with Vault Transit](/storage/uploads/2026/04/healthcare-envelope-encryption.webp)

**Process:**

1. App generates random Data Encryption Key (DEK)
2. App encrypts plaintext with DEK (AES-256-GCM)
3. App sends DEK to Vault Transit for wrapping
4. Vault encrypts DEK with Key Encryption Key (KEK)
5. App stores: `encrypted_data` + `wrapped_DEK` in database

### 3.2. Vault Transit Engine Setup

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

### 3.3. Vault Transit Encryption Service

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

### 3.4. Field Encryption Service (using Vault Transit)

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

### 3.5. Quarkus Vault Extension Configuration

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

### 3.6. Maven Dependencies

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

## 4. JWE (JSON Web Encryption) for Inter-Service Communication

### 4.1. JWE Overview

When microservices send PHI data over HTTP (REST calls), JWT is only **signed** (JWS) but **not encrypted** — anyone can decode the payload. JWE encrypts the entire payload:

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

### 4.2. JWE Implementation

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

### 4.3. Key Management Service

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

### 4.4. JWE REST Client Filter

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

## 5. Encrypted Kafka Messages

### 5.1. Encryption Architecture for Kafka

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

### 5.2. Encrypted Kafka Serializer

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

### 5.3. Encrypted Kafka Deserializer

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

### 5.4. Kafka Configuration

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

## 6. Key Rotation Strategies

### 6.1. Key Rotation Architecture

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

### 6.2. Key Rotation Job

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

### 6.3. Key Rotation Vault Commands

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

## 7. Sensitive Data Handling in Logs and Exceptions

### 7.1. PHI Masking for Logging

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

### 7.2. application.properties for Logging Filter

```properties
# Enable PHI masking filter
quarkus.log.filter."phi-masking-filter".if-starts-with=vn.hospital

# Structured JSON logging cho audit
quarkus.log.console.json=true
quarkus.log.console.json.additional-field."app".value=patient-service
quarkus.log.console.json.additional-field."env".value=${ENV:dev}
```

## Summary

In this lesson, we built a comprehensive **End-to-End Encryption** for healthcare microservices:

1. **Field-Level Encryption**: JPA AttributeConverter automatically encrypt/decrypt PHI columns — DBA cannot read plaintext
2. **Envelope Encryption**: Vault Transit engine manages KEK, application uses DEK — separation of key management
3. **Vault Integration**: Quarkus Vault extension, AppRole authentication, Transit encrypt/decrypt/rewrap APIs
4. **JWE**: JSON Web Encryption for inter-service REST calls — payload encrypted end-to-end, not just signed
5. **Encrypted Kafka**: Custom serializer/deserializer with envelope encryption — broker cannot read messages
6. **Key Rotation**: Automated rewrap job, zero-downtime key rotation, multi-version key support
7. **PHI Masking**: Logging filter prevents PHI from leaking into logs, exception sanitization

Encryption landscape:

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

## Exercises

1. **Field-Level Encryption**: Create Quarkus project with JPA + PostgreSQL. Implement `EncryptedStringConverter` Use AES-256-GCM (local key first). Create `PatientEntity` with encrypted fields (fullName, ssn, email). INSERT/SELECT patient and verify data in the database is ciphertext (use `psql` direct query).

2. **Vault Transit Integration**: Setup HashiCorp Vault (Docker). Enable Transit engine, generate key `phi-data`. Configure Quarkus Vault extension. Rather `EncryptedStringConverter` to use Vault Transit. Test encrypt/decrypt through Vault. Verify key version in ciphertext (`vault:v1:...`).

3. **Key Rotation**: Rotate key in Vault (`vault write -f transit/keys/phi-data/rotate`). Verify new inserts using v2. Implement rewrap job for existing data. Verify all data transferred to v2. Set `min_decryption_version=2` and verify.

4. **Encrypted Kafka**: Setup Kafka (Docker Compose). Implement `EncryptedSerializer` and `EncryptedDeserializer` with envelope encryption. Publish PatientEvent encrypted message. Consume and decrypt. Verify message in Kafka (kafka-console-consumer) is binary/encrypted, not readable.

---

---

<!-- SERIES-NAV:START -->
| ◀ Previous article | Next article ▶ |
|:---|---:|
| [Lesson 14: API Gateway Security - Rate Limiting, Input Validation & WAF](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-14-api-gateway-rate-limiting-waf) | [Lesson 16: mTLS, Service Mesh & Secure Inter-Service Communication](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-16-mtls-service-mesh-inter-service-communication) |
<!-- SERIES-NAV:END -->
