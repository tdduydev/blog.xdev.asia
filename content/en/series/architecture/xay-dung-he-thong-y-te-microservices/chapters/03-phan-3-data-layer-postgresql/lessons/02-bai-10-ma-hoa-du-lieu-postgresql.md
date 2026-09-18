---
id: 019e1a40-a110-7001-d001-f0a1b2c30110
title: 'Lesson 10: Encrypting At-Rest & In-Transit Data with PostgreSQL'
slug: bai-10-ma-hoa-du-lieu-postgresql
description: >-
  Comprehensive encryption implementation for PostgreSQL: Transparent Data
  Encryption (TDE), pgcrypto extension for column-level encryption, SSL/TLS
  certificates with mutual TLS, Key Management with HashiCorp Vault, envelope
  encryption pattern, and comparison of encryption methods (AES-256-GCM,
  AES-256-CBC) for medical data.
duration_minutes: 180
is_free: true
video_url: null
sort_order: 10
section_title: 'Part 3: Building Data Layer — PostgreSQL for Healthcare'
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
    <linearGradient id="bg-4905" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-4905)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1077" cy="141" r="20" fill="#a78bfa" opacity="0.060000000000000005"/>
    <circle cx="1054" cy="178" r="11" fill="#a78bfa" opacity="0.07"/>
    <circle cx="1031" cy="215" r="32" fill="#a78bfa" opacity="0.08"/>
    <circle cx="1008" cy="252" r="23" fill="#a78bfa" opacity="0.09"/>
    <circle cx="985" cy="289" r="14" fill="#a78bfa" opacity="0.1"/>
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
    <line x1="600" y1="171" x2="1100" y2="251" stroke="#a78bfa" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="201" x2="1050" y2="271" stroke="#a78bfa" stroke-width="0.5" opacity="0.08"/>
    <polygon points="943.5166604983954,108 943.5166604983954,134 921,147 898.4833395016046,134 898.4833395016046,108 921,95" fill="none" stroke="#a78bfa" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#a78bfa"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#a78bfa" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🏗️ Architecture — Lesson 10</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 10: At-Rest & Data Encryption</tspan>
      <tspan x="60" dy="42">In-Transit with PostgreSQL</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Building a Microservices Healthcare System — Quarkus, PostgreSQL, Keycloak with HIPAA standards</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 3: Building Data Layer — PostgreSQL for Healthcare</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. Overview of Encryption for Medical Data

![4 layers of medical data encryption: Disk, TDE, Column, Application](/storage/uploads/2026/04/healthcare-encryption-layers.webp)

Medical data (PHI) requires encryption in **two states**: at-rest (when stored) and in-transit (when transmitted). HIPAA Security Rule §164.312(a)(2)(iv) and §164.312(e)(2)(ii) specifically regulate encryption requirements.

### 1.1. Encryption Layers

![Medical data encryption layers — In-Transit, At-Rest (4 levels), Backup](/storage/uploads/2026/04/healthcare-encryption-layers.webp)

- **In-Transit**: TLS 1.3 between Application and Database
- **At-Rest Level 1**: Full Disk Encryption (LUKS/dm-crypt) — protection when disk is stolen
- **At-Rest Level 2**: Transparent Data Encryption (TDE) — encrypt data files, WAL, temp files
- **At-Rest Level 3**: Column-Level Encryption (pgcrypto) — encrypt each individual PHI field
- **At-Rest Level 4**: Application-Level Encryption — encrypt before sending to database
- **Backup**: Encrypted Backup → S3 (SSE-KMS)

### 1.2. Compare encryption methods

| Method | Protect from | Unprotected | Performance Impact |
|-------------|-------------|-------------|------|
| Full Disk (LUKS) | Physical theft | DB admin, SQL injection | Minimal (~2%) |
| TDE | Unauthorized file access | Superuser access | Low (~5%) |
| Column-Level (pgcrypto) | DB admin, SQL injection for specific columns | App-level compromise | Medium (~10-20%) |
| Application-Level | DB compromise completely | App-level compromise | High (~15-30%) |

**Recommended for Healthcare**: Combine **TDE + Column-Level Encryption** for maximum protection.

## 2. Transparent Data Encryption (TDE)

### 2.1. PostgreSQL 16+ TDE (Experimental)

PostgreSQL 16 starts supporting TDE (need to compile with option `--with-ssl=openssl` and patches). However, in production, many organizations use alternative solutions.

### 2.2. LUKS Full Disk Encryption

```bash
#!/bin/bash
# setup-luks-pgdata.sh
# Encrypt PostgreSQL data volume với LUKS

# === Step 1: Tạo LUKS encrypted volume ===
# WARNING: Xóa toàn bộ dữ liệu trên device!
cryptsetup luksFormat --type luks2 \
    --cipher aes-xts-plain64 \
    --key-size 512 \
    --hash sha256 \
    --iter-time 5000 \
    /dev/sdb1

# === Step 2: Open encrypted volume ===
cryptsetup luksOpen /dev/sdb1 pg_encrypted

# === Step 3: Tạo filesystem ===
mkfs.ext4 /dev/mapper/pg_encrypted

# === Step 4: Mount cho PostgreSQL ===
mkdir -p /var/lib/postgresql/16/main
mount /dev/mapper/pg_encrypted /var/lib/postgresql/16/main
chown postgres:postgres /var/lib/postgresql/16/main

# === Step 5: Auto-mount khi boot (với key file hoặc TPM) ===
# Lưu key file (chỉ cho automated systems)
dd if=/dev/urandom of=/root/.pg_luks_key bs=512 count=1
chmod 400 /root/.pg_luks_key
cryptsetup luksAddKey /dev/sdb1 /root/.pg_luks_key

# /etc/crypttab
echo "pg_encrypted /dev/sdb1 /root/.pg_luks_key luks" >> /etc/crypttab

# /etc/fstab
echo "/dev/mapper/pg_encrypted /var/lib/postgresql/16/main ext4 defaults 0 2" >> /etc/fstab
```

## 3. Column-Level Encryption with pgcrypto

### 3.1. Install pgcrypto

```sql
-- Cài đặt extension (cần superuser)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Verify
SELECT * FROM pg_extension WHERE extname = 'pgcrypto';
```

### 3.2. Symmetric Encryption (AES-256)

Used for data that needs to be frequently encrypted/decrypted by the application.

```sql
-- =====================================================
-- SYMMETRIC ENCRYPTION VỚI pgcrypto
-- =====================================================

-- === pgp_sym_encrypt / pgp_sym_decrypt ===
-- Sử dụng OpenPGP symmetric encryption (AES-256 by default)

-- Tạo bảng patients với encrypted columns
CREATE TABLE patient_schema.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- Non-sensitive data (plaintext)
    hospital_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- PHI - Encrypted columns (stored as BYTEA)
    full_name_encrypted BYTEA NOT NULL,
    date_of_birth_encrypted BYTEA NOT NULL,
    national_id_encrypted BYTEA NOT NULL,   -- CCCD/CMND
    phone_encrypted BYTEA,
    address_encrypted BYTEA,
    
    -- Medical data - Encrypted
    diagnosis_encrypted BYTEA,
    blood_type_encrypted BYTEA,
    allergies_encrypted BYTEA,
    
    -- Search index (hashed, không thể reverse)
    national_id_hash TEXT UNIQUE,  -- Cho phép tìm kiếm
    phone_hash TEXT                -- Cho phép tìm kiếm
);

-- === INSERT với encryption ===
INSERT INTO patient_schema.patients (
    hospital_id,
    full_name_encrypted,
    date_of_birth_encrypted,
    national_id_encrypted,
    phone_encrypted,
    diagnosis_encrypted,
    national_id_hash,
    phone_hash
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    pgp_sym_encrypt('Nguyễn Văn A', 'encryption-key-from-vault', 'compress-algo=2, cipher-algo=aes256'),
    pgp_sym_encrypt('1990-05-15', 'encryption-key-from-vault', 'compress-algo=2, cipher-algo=aes256'),
    pgp_sym_encrypt('079090001234', 'encryption-key-from-vault', 'compress-algo=2, cipher-algo=aes256'),
    pgp_sym_encrypt('0901234567', 'encryption-key-from-vault', 'compress-algo=2, cipher-algo=aes256'),
    pgp_sym_encrypt('Tăng huyết áp độ 2, Đái tháo đường type 2', 'encryption-key-from-vault', 'compress-algo=2, cipher-algo=aes256'),
    encode(digest('079090001234', 'sha256'), 'hex'),
    encode(digest('0901234567', 'sha256'), 'hex')
);

-- === SELECT với decryption ===
SELECT 
    id,
    pgp_sym_decrypt(full_name_encrypted, 'encryption-key-from-vault') AS full_name,
    pgp_sym_decrypt(date_of_birth_encrypted, 'encryption-key-from-vault') AS date_of_birth,
    pgp_sym_decrypt(diagnosis_encrypted, 'encryption-key-from-vault') AS diagnosis
FROM patient_schema.patients
WHERE national_id_hash = encode(digest('079090001234', 'sha256'), 'hex');

-- === Tìm kiếm bằng hash (không cần decrypt) ===
SELECT id, created_at
FROM patient_schema.patients
WHERE phone_hash = encode(digest('0901234567', 'sha256'), 'hex');
```

### 3.3. Asymmetric Encryption (RSA/PGP)

Used when it is necessary to separate encrypt and decrypt permissions (for example: a nurse enters data but only a doctor can read it).

```sql
-- =====================================================
-- ASYMMETRIC ENCRYPTION VỚI pgcrypto
-- =====================================================

-- === Tạo PGP key pair ===
-- Thực hiện bên ngoài PostgreSQL
-- gpg --gen-key --batch << EOF
-- %no-protection
-- Key-Type: RSA
-- Key-Length: 4096
-- Name-Real: Healthcare DB
-- Name-Email: db@hospital.local
-- Expire-Date: 1y
-- EOF

-- Export keys
-- gpg --export --armor db@hospital.local > public.key
-- gpg --export-secret-keys --armor db@hospital.local > private.key

-- === Encrypt với public key (ai cũng có thể encrypt) ===
INSERT INTO patient_schema.sensitive_notes (
    patient_id,
    note_encrypted
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    pgp_pub_encrypt(
        'Bệnh nhân có tiền sử HIV, đang điều trị ARV',
        dearmor(pg_read_file('/etc/postgresql/keys/public.key'))
    )
);

-- === Decrypt với private key (chỉ authorized users) ===
SELECT 
    patient_id,
    pgp_pub_decrypt(
        note_encrypted,
        dearmor(pg_read_file('/etc/postgresql/keys/private.key')),
        'passphrase-for-private-key'
    ) AS note
FROM patient_schema.sensitive_notes
WHERE patient_id = '550e8400-e29b-41d4-a716-446655440000';
```

### 3.4. Compare AES-256-GCM vs AES-256-CBC

| Features | AES-256-GCM | AES-256-CBC |
|-----------|-------------|-------------|
| Authenticated | Yes (AEAD) | No |
| Integrity Check | Built-in | Need more HMAC |
| Parallel Processing | Yes | No |
| Performance | Faster | Slower |
| pgcrypto support | Via pgp_sym_encrypt | Via encrypt() |
| Recommendation | **Priority** | Legacy systems |

```sql
-- pgcrypto sử dụng AES-256 qua PGP format
-- cipher-algo=aes256 (CBC mode trong PGP)

-- Với raw encrypt() function (AES-CBC)
SELECT encrypt(
    'sensitive data'::bytea,
    'encryption-key-32-bytes-long!!!!'::bytea,  -- 256 bits
    'aes-cbc/pad:pkcs'
);

-- Decrypt
SELECT convert_from(
    decrypt(
        encrypted_data,
        'encryption-key-32-bytes-long!!!!'::bytea,
        'aes-cbc/pad:pkcs'
    ),
    'UTF8'
);
```

## 4. SSL/TLS - In-Transit Encryption

### 4.1. Certificate Generation details

```bash
#!/bin/bash
# setup-mutual-tls.sh
# Thiết lập mutual TLS cho PostgreSQL

SSL_DIR="/etc/postgresql/ssl"
mkdir -p $SSL_DIR && cd $SSL_DIR

# =====================================================
# STEP 1: Certificate Authority (CA)
# =====================================================
cat > ca.cnf << 'EOF'
[req]
distinguished_name = req_dn
x509_extensions = v3_ca
prompt = no

[req_dn]
C = VN
ST = Ho Chi Minh
L = Ho Chi Minh City
O = Hospital Healthcare Network
OU = IT Security
CN = Healthcare PostgreSQL CA

[v3_ca]
basicConstraints = critical, CA:TRUE, pathlen:1
keyUsage = critical, cRLSign, keyCertSign
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always, issuer
EOF

openssl genrsa -aes256 -out ca.key 4096
openssl req -new -x509 -days 3650 \
    -config ca.cnf \
    -key ca.key \
    -out ca.crt \
    -sha384

# =====================================================
# STEP 2: Server Certificate
# =====================================================
cat > server.cnf << 'EOF'
[req]
distinguished_name = req_dn
req_extensions = v3_req
prompt = no

[req_dn]
C = VN
ST = Ho Chi Minh
O = Hospital Healthcare Network
CN = db.hospital.local

[v3_req]
basicConstraints = CA:FALSE
keyUsage = critical, digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = db.hospital.local
DNS.2 = db-primary.hospital.local
DNS.3 = db-replica.hospital.local
DNS.4 = localhost
IP.1 = 10.0.1.100
IP.2 = 127.0.0.1
EOF

openssl genrsa -out server.key 2048
chmod 600 server.key
chown postgres:postgres server.key

openssl req -new -key server.key \
    -out server.csr \
    -config server.cnf

openssl x509 -req -in server.csr \
    -CA ca.crt -CAkey ca.key -CAcreateserial \
    -out server.crt -days 365 \
    -extfile server.cnf -extensions v3_req \
    -sha384

# =====================================================
# STEP 3: Client Certificate (per-service)
# =====================================================
create_client_cert() {
    local SERVICE_NAME=$1
    local DAYS=$2

    cat > client-${SERVICE_NAME}.cnf << EOF
[req]
distinguished_name = req_dn
req_extensions = v3_req
prompt = no

[req_dn]
C = VN
ST = Ho Chi Minh
O = Hospital Healthcare Network
CN = ${SERVICE_NAME}

[v3_req]
basicConstraints = CA:FALSE
keyUsage = critical, digitalSignature
extendedKeyUsage = clientAuth
EOF

    openssl genrsa -out client-${SERVICE_NAME}.key 2048
    openssl req -new -key client-${SERVICE_NAME}.key \
        -out client-${SERVICE_NAME}.csr \
        -config client-${SERVICE_NAME}.cnf

    openssl x509 -req -in client-${SERVICE_NAME}.csr \
        -CA ca.crt -CAkey ca.key -CAcreateserial \
        -out client-${SERVICE_NAME}.crt -days ${DAYS} \
        -extfile client-${SERVICE_NAME}.cnf -extensions v3_req \
        -sha384

    echo "Created client cert for ${SERVICE_NAME} (valid ${DAYS} days)"
}

# Tạo client certs cho từng service
create_client_cert "app_patient_svc" 90
create_client_cert "app_lab_svc" 90
create_client_cert "app_pharmacy_svc" 90
create_client_cert "dba_admin" 30

# =====================================================
# STEP 4: Verify certificates
# =====================================================
echo "=== Verify server cert ==="
openssl verify -CAfile ca.crt server.crt

echo "=== Verify client certs ==="
openssl verify -CAfile ca.crt client-app_patient_svc.crt
openssl verify -CAfile ca.crt client-dba_admin.crt

echo "=== Server cert details ==="
openssl x509 -in server.crt -text -noout | grep -A 3 "Subject Alternative Name"
```

### 4.2. PostgreSQL SSL Configuration

```ini
# postgresql.conf - SSL section
ssl = on
ssl_cert_file = '/etc/postgresql/ssl/server.crt'
ssl_key_file = '/etc/postgresql/ssl/server.key'
ssl_ca_file = '/etc/postgresql/ssl/ca.crt'
ssl_crl_file = '/etc/postgresql/ssl/ca.crl'
ssl_min_protocol_version = 'TLSv1.2'
ssl_ciphers = 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256'
ssl_prefer_server_ciphers = on
```

### 4.3. Quarkus mTLS Configuration

```properties
# application.properties - mutual TLS
quarkus.datasource.jdbc.url=jdbc:postgresql://db.hospital.local:5432/healthcare_db

# SSL mode: verify-full = verify cert + hostname
quarkus.datasource.jdbc.additional-jdbc-properties.ssl=true
quarkus.datasource.jdbc.additional-jdbc-properties.sslmode=verify-full
quarkus.datasource.jdbc.additional-jdbc-properties.sslrootcert=${SSL_CA_CERT:/etc/app/certs/ca.crt}
quarkus.datasource.jdbc.additional-jdbc-properties.sslcert=${SSL_CLIENT_CERT:/etc/app/certs/client.crt}
quarkus.datasource.jdbc.additional-jdbc-properties.sslkey=${SSL_CLIENT_KEY:/etc/app/certs/client.key}
```

```java
// Verify SSL connection trong Quarkus
@ApplicationScoped
public class SslVerificationService {

    @Inject
    AgroalDataSource dataSource;

    public SslConnectionInfo verifySslConnection() {
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(
                 "SELECT ssl, ssl_version, ssl_cipher " +
                 "FROM pg_stat_ssl WHERE pid = pg_backend_pid()")) {
            
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return new SslConnectionInfo(
                    rs.getBoolean("ssl"),
                    rs.getString("ssl_version"),
                    rs.getString("ssl_cipher")
                );
            }
            throw new SecurityException("Cannot verify SSL connection");
        }
    }

    public record SslConnectionInfo(
        boolean sslEnabled,
        String tlsVersion,
        String cipherSuite
    ) {}
}
```

## 5. Key Management with HashiCorp Vault

### 5.1. Vault Transit Secrets Engine

![Envelope Encryption Pattern with Vault Transit — DEK + KEK](/storage/uploads/2026/04/healthcare-vault-envelope-encryption.webp)

**Envelope Encryption Process:**

1. Generate DEK (Data Encryption Key) — per-record or per-table
2. Encrypt data with DEK
3. Send DEK to Vault Transit for wrapping
4. Vault wrap DEK with KEK (Key Encryption Key) via HSM/KMS
5. Save encrypted data + wrapped DEK in PostgreSQL

### 5.2. Vault Configuration

```bash
# === Enable Transit Secrets Engine ===
vault secrets enable transit

# === Tạo encryption keys ===
# Key cho patient data
vault write -f transit/keys/healthcare-patient-data \
    type=aes256-gcm96 \
    auto_rotate_period=90d \
    deletion_allowed=false

# Key cho lab results
vault write -f transit/keys/healthcare-lab-data \
    type=aes256-gcm96 \
    auto_rotate_period=90d \
    deletion_allowed=false

# Key cho prescriptions
vault write -f transit/keys/healthcare-pharmacy-data \
    type=aes256-gcm96 \
    auto_rotate_period=90d \
    deletion_allowed=false

# === Tạo policy cho mỗi service ===
cat > patient-svc-policy.hcl << 'EOF'
# Patient service chỉ được encrypt/decrypt với patient key
path "transit/encrypt/healthcare-patient-data" {
  capabilities = ["update"]
}
path "transit/decrypt/healthcare-patient-data" {
  capabilities = ["update"]
}
# Không được access raw key
path "transit/keys/*" {
  capabilities = ["deny"]
}
EOF

vault policy write patient-svc patient-svc-policy.hcl

# === Enable Kubernetes Auth ===
vault auth enable kubernetes
vault write auth/kubernetes/config \
    kubernetes_host="https://kubernetes.default.svc"

vault write auth/kubernetes/role/patient-svc \
    bound_service_account_names=patient-svc \
    bound_service_account_namespaces=healthcare \
    policies=patient-svc \
    ttl=1h
```

### 5.3. Quarkus + Vault Integration

```java
// pom.xml dependency
// <dependency>
//     <groupId>io.quarkus</groupId>
//     <artifactId>quarkus-vault</artifactId>
// </dependency>

@ApplicationScoped
public class VaultEncryptionService {

    @Inject
    VaultTransitSecretEngine transitEngine;

    private static final String PATIENT_KEY = "healthcare-patient-data";
    private static final String LAB_KEY = "healthcare-lab-data";

    /**
     * Encrypt sensitive data using Vault Transit
     */
    public String encryptPatientData(String plaintext) {
        // Vault handles: generate DEK → encrypt with KEK → return ciphertext
        return transitEngine.encrypt(PATIENT_KEY, plaintext);
        // Returns: vault:v1:base64encodedciphertext
    }

    /**
     * Decrypt sensitive data using Vault Transit
     */
    public String decryptPatientData(String ciphertext) {
        return transitEngine.decrypt(PATIENT_KEY, ciphertext).asString();
    }

    /**
     * Batch encrypt multiple fields
     */
    public Map<String, String> encryptPatientRecord(PatientRecord record) {
        Map<String, String> encrypted = new HashMap<>();
        
        encrypted.put("fullName", transitEngine.encrypt(PATIENT_KEY, record.fullName()));
        encrypted.put("nationalId", transitEngine.encrypt(PATIENT_KEY, record.nationalId()));
        encrypted.put("phone", transitEngine.encrypt(PATIENT_KEY, record.phone()));
        encrypted.put("diagnosis", transitEngine.encrypt(PATIENT_KEY, record.diagnosis()));
        
        return encrypted;
    }

    /**
     * Re-encrypt data khi key rotation
     * Vault tự động dùng key version mới nhất
     */
    public String rewrapCiphertext(String oldCiphertext) {
        return transitEngine.rewrap(PATIENT_KEY, oldCiphertext);
    }
}
```

### 5.4. Vault Dynamic Database Credentials

```bash
# === Enable Database Secrets Engine ===
vault secrets enable database

# === Configure PostgreSQL connection ===
vault write database/config/healthcare-db \
    plugin_name=postgresql-database-plugin \
    allowed_roles="patient-svc-role,lab-svc-role,readonly-role" \
    connection_url="postgresql://{{username}}:{{password}}@db.hospital.local:5432/healthcare_db?sslmode=verify-full" \
    username="vault_admin" \
    password="initial-password" \
    password_authentication="scram-sha-256"

# === Create role cho Patient Service ===
vault write database/roles/patient-svc-role \
    db_name=healthcare-db \
    creation_statements="CREATE ROLE \"{{name}}\" WITH LOGIN PASSWORD '{{password}}' VALID UNTIL '{{expiration}}' IN ROLE healthcare_app, phi_access; GRANT USAGE ON SCHEMA patient_schema TO \"{{name}}\";" \
    revocation_statements="REASSIGN OWNED BY \"{{name}}\" TO dba_admin; DROP OWNED BY \"{{name}}\"; DROP ROLE IF EXISTS \"{{name}}\";" \
    default_ttl="1h" \
    max_ttl="24h"

# === Application requests credentials ===
vault read database/creds/patient-svc-role
# Returns:
# username: v-patient-svc-role-abc123
# password: randomly-generated-strong-password
# lease_duration: 1h
# lease_id: database/creds/patient-svc-role/xyz789
```

```properties
# Quarkus application.properties - Vault dynamic credentials
quarkus.vault.url=https://vault.hospital.local:8200
quarkus.vault.authentication.kubernetes.role=patient-svc

# Dynamic database credentials từ Vault
quarkus.vault.credentials-provider.healthcare-db.database-credentials-role=patient-svc-role
quarkus.datasource.credentials-provider=healthcare-db
```

## 6. Envelope Encryption Pattern - Implementation

### 6.1. Java Implementation

```java
@ApplicationScoped
public class EnvelopeEncryptionService {

    @Inject
    VaultTransitSecretEngine vaultTransit;

    private static final String KEK_NAME = "healthcare-patient-data";

    /**
     * Envelope Encryption:
     * 1. Generate random DEK (Data Encryption Key)
     * 2. Encrypt data with DEK using AES-256-GCM
     * 3. Encrypt DEK with Vault KEK (Key Encryption Key)
     * 4. Return encrypted data + encrypted DEK
     */
    public EncryptedEnvelope encrypt(String plaintext) {
        // Step 1: Generate random DEK
        byte[] dek = new byte[32]; // 256 bits
        SecureRandom.getInstanceStrong().nextBytes(dek);

        // Step 2: Generate random IV
        byte[] iv = new byte[12]; // 96 bits for GCM
        SecureRandom.getInstanceStrong().nextBytes(iv);

        // Step 3: Encrypt data with DEK (AES-256-GCM)
        byte[] encryptedData = aesGcmEncrypt(plaintext.getBytes(UTF_8), dek, iv);

        // Step 4: Encrypt DEK with Vault KEK
        String encryptedDek = vaultTransit.encrypt(
            KEK_NAME,
            Base64.getEncoder().encodeToString(dek)
        );

        // Step 5: Clear DEK from memory
        Arrays.fill(dek, (byte) 0);

        return new EncryptedEnvelope(
            Base64.getEncoder().encodeToString(encryptedData),
            Base64.getEncoder().encodeToString(iv),
            encryptedDek
        );
    }

    /**
     * Envelope Decryption:
     * 1. Decrypt DEK using Vault
     * 2. Decrypt data using DEK
     */
    public String decrypt(EncryptedEnvelope envelope) {
        // Step 1: Decrypt DEK from Vault
        String dekBase64 = vaultTransit.decrypt(
            KEK_NAME,
            envelope.encryptedDek()
        ).asString();
        byte[] dek = Base64.getDecoder().decode(dekBase64);

        // Step 2: Decrypt data
        byte[] iv = Base64.getDecoder().decode(envelope.iv());
        byte[] encryptedData = Base64.getDecoder().decode(envelope.encryptedData());
        byte[] plaintext = aesGcmDecrypt(encryptedData, dek, iv);

        // Step 3: Clear DEK
        Arrays.fill(dek, (byte) 0);

        return new String(plaintext, UTF_8);
    }

    private byte[] aesGcmEncrypt(byte[] plaintext, byte[] key, byte[] iv) {
        try {
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            GCMParameterSpec spec = new GCMParameterSpec(128, iv);
            SecretKeySpec secretKey = new SecretKeySpec(key, "AES");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey, spec);
            return cipher.doFinal(plaintext);
        } catch (Exception e) {
            throw new EncryptionException("AES-GCM encryption failed", e);
        }
    }

    private byte[] aesGcmDecrypt(byte[] ciphertext, byte[] key, byte[] iv) {
        try {
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            GCMParameterSpec spec = new GCMParameterSpec(128, iv);
            SecretKeySpec secretKey = new SecretKeySpec(key, "AES");
            cipher.init(Cipher.DECRYPT_MODE, secretKey, spec);
            return cipher.doFinal(ciphertext);
        } catch (Exception e) {
            throw new EncryptionException("AES-GCM decryption failed", e);
        }
    }

    public record EncryptedEnvelope(
        String encryptedData,
        String iv,
        String encryptedDek
    ) {}
}
```

### 6.2. Database Schema for Envelope Encryption

```sql
-- =====================================================
-- TABLE DESIGN CHO ENVELOPE ENCRYPTION
-- =====================================================

CREATE TABLE patient_schema.patient_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patient_schema.patients(id),
    
    -- Non-sensitive metadata (plaintext, indexable)
    record_type VARCHAR(50) NOT NULL,  -- 'lab_result', 'prescription', 'note'
    department VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID NOT NULL,
    
    -- Encrypted envelope
    encrypted_data TEXT NOT NULL,       -- AES-256-GCM encrypted content
    encryption_iv TEXT NOT NULL,        -- Initialization Vector
    encrypted_dek TEXT NOT NULL,        -- Vault-encrypted Data Encryption Key
    key_version INT NOT NULL DEFAULT 1, -- Vault key version (for rotation)
    
    -- Search metadata (derived, non-PHI)
    record_date DATE,                  -- Extracted date (non-sensitive)
    icd_code VARCHAR(10)               -- Searchable but non-identifying
);

-- Index cho search
CREATE INDEX idx_patient_records_patient ON patient_schema.patient_records(patient_id);
CREATE INDEX idx_patient_records_type ON patient_schema.patient_records(record_type);
CREATE INDEX idx_patient_records_date ON patient_schema.patient_records(record_date);
```

## 7. Encrypted Backup

### 7.1. pg_dump with Encryption

```bash
#!/bin/bash
# encrypted-backup.sh
# Backup PostgreSQL với encryption

BACKUP_DIR="/var/backups/postgresql"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/healthcare_db_${DATE}.sql.gz.gpg"

# GPG key cho backup encryption
GPG_RECIPIENT="backup@hospital.local"

# Tạo backup → compress → encrypt pipeline
pg_dump \
    --host=db.hospital.local \
    --port=5432 \
    --username=dba_admin \
    --dbname=healthcare_db \
    --format=custom \
    --compress=9 \
    --file=- | \
gpg --encrypt \
    --recipient ${GPG_RECIPIENT} \
    --output ${BACKUP_FILE} \
    --trust-model always

# Verify backup
gpg --list-packets ${BACKUP_FILE} | head -5

# Upload to S3 với SSE-KMS
aws s3 cp ${BACKUP_FILE} \
    s3://hospital-backups/postgresql/ \
    --sse aws:kms \
    --sse-kms-key-id alias/healthcare-backup-key

# Cleanup local backup sau 7 ngày
find ${BACKUP_DIR} -name "*.gpg" -mtime +7 -delete

echo "Backup completed: ${BACKUP_FILE}"
```

### 7.2. Restore from Encrypted Backup

```bash
#!/bin/bash
# restore-encrypted-backup.sh

BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
    echo "Usage: $0 <backup_file.sql.gz.gpg>"
    exit 1
fi

# Download from S3 if needed
if [[ $BACKUP_FILE == s3://* ]]; then
    LOCAL_FILE="/tmp/restore_$(date +%s).gpg"
    aws s3 cp ${BACKUP_FILE} ${LOCAL_FILE}
    BACKUP_FILE=${LOCAL_FILE}
fi

# Decrypt → decompress → restore pipeline
gpg --decrypt ${BACKUP_FILE} | \
pg_restore \
    --host=db.hospital.local \
    --port=5432 \
    --username=dba_admin \
    --dbname=healthcare_db \
    --verbose \
    --clean \
    --if-exists

echo "Restore completed from: ${BACKUP_FILE}"
```

## 8. Key Rotation Strategy

### 8.1. Key Rotation Process

![Key Rotation Timeline — v1 → v2 → v3 every 90 days with Vault auto-rotation](/storage/uploads/2026/04/healthcare-key-rotation-timeline.webp)

- **Day 0–90**: Key v1 active — encrypt new data
- **Day 90–180**: Key v2 active — re-encrypt old data, v1 can still decrypt
- **Day 180+**: Key v3 active — v1 retired, v2 can still be decrypted
- Vault automatically rotates KEK, OLD versions still decrypt, NEW data encrypts with latest
- **Rewrap**: re-encrypt DEK with new KEK version

### 8.2. Batch Re-encryption Script

```java
@ApplicationScoped
public class KeyRotationService {

    @Inject
    VaultTransitSecretEngine vaultTransit;

    @Inject
    EntityManager entityManager;

    private static final Logger LOG = Logger.getLogger(KeyRotationService.class);

    /**
     * Re-wrap all DEKs with latest Vault key version
     * Chạy sau khi Vault key rotation
     */
    @Transactional
    public KeyRotationResult rewrapAllDeks(String keyName, int batchSize) {
        int totalRewrapped = 0;
        int totalFailed = 0;
        int currentKeyVersion = getLatestKeyVersion(keyName);

        LOG.infof("Starting DEK rewrap. Target key version: %d", currentKeyVersion);

        // Tìm records chưa được rewrap
        List<PatientRecord> outdatedRecords;
        do {
            outdatedRecords = entityManager.createQuery(
                "SELECT r FROM PatientRecord r WHERE r.keyVersion < :version",
                PatientRecord.class
            )
            .setParameter("version", currentKeyVersion)
            .setMaxResults(batchSize)
            .getResultList();

            for (PatientRecord record : outdatedRecords) {
                try {
                    // Rewrap DEK (Vault decrypts with old version, re-encrypts with new)
                    String newEncryptedDek = vaultTransit.rewrap(
                        keyName, record.getEncryptedDek()
                    );
                    record.setEncryptedDek(newEncryptedDek);
                    record.setKeyVersion(currentKeyVersion);
                    totalRewrapped++;
                } catch (Exception e) {
                    LOG.errorf("Failed to rewrap record %s: %s",
                        record.getId(), e.getMessage());
                    totalFailed++;
                }
            }
            entityManager.flush();
            entityManager.clear();

            LOG.infof("Rewrapped batch: %d records", outdatedRecords.size());
        } while (!outdatedRecords.isEmpty());

        return new KeyRotationResult(totalRewrapped, totalFailed, currentKeyVersion);
    }

    public record KeyRotationResult(
        int totalRewrapped,
        int totalFailed,
        int targetKeyVersion
    ) {}
}
```

## Summary

In this lesson, we implemented **end-to-end encryption** for PostgreSQL healthcare:

1. **At-Rest Encryption**: LUKS full disk encryption + pgcrypto column-level encryption
2. **In-Transit Encryption**: SSL/TLS with mutual TLS (mTLS) authentication
3. **pgcrypto**: Symmetric (pgp_sym_encrypt) and Asymmetric (pgp_pub_encrypt) encryption
4. **Key Management**: HashiCorp Vault Transit engine with envelope encryption pattern
5. **Envelope Encryption**: Generate DEK → encrypt data → wrap DEK with Vault KEK
6. **AES-256-GCM vs CBC**: GCM is preferred thanks to authenticated encryption
7. **Dynamic Credentials**: Vault Database secrets engine for auto-rotating passwords
8. **Encrypted Backup**: pg_dump → GPG → S3 with SSE-KMS
9. **Key Rotation**: Automated DEK rewrapping when KEK rotates

Important principles:

- **Never store encryption keys along with encrypted data**
- **Always use authenticated encryption** (AES-GCM)
- **Implement key rotation** with zero-downtime
- **Minimize DEK lifetime** - each record or session has a separate DEK
- **Clear keys from memory** after use

## Exercises

1. **Column-Level Encryption**: Create patients table with pgcrypto encryption for 5 PHI fields. Write SQL to INSERT encrypted data and SELECT decrypted data. Benchmark performance compared to plaintext.

2. **Mutual TLS Setup**: Create CA → server cert → 3 client certs for 3 microservices. Configure PostgreSQL to accept only mTLS connections. Verify equal `pg_stat_ssl`.

3. **Vault Transit Integration**: Setup HashiCorp Vault (dev mode), create transit key, write Quarkus service encrypt/decrypt patient name and diagnosis. Test key rotation with rewrap.

4. **Encrypted Backup Pipeline**: Write a script to create encrypted backup (pg_dump → gpg), upload to S3, and restore script. Verify data integrity after restore.

---

---

<!-- SERIES-NAV:START -->
| ◀ Previous article | Next article ▶ |
|:---|---:|
| [Lesson 9: PostgreSQL Security Hardening - Comprehensive Security Configuration](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-9-postgresql-security-hardening-toan-dien) | [Lesson 11: Row-Level Security & Column Encryption for PHI](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-11-row-level-security-column-encryption-phi) |
<!-- SERIES-NAV:END -->
