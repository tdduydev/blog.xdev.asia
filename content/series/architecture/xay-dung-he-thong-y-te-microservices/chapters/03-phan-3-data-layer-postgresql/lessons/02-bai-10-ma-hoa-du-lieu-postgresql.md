---
id: 019e1a40-a110-7001-d001-f0a1b2c30110
title: 'Bài 10: Mã hóa Dữ liệu At-Rest & In-Transit với PostgreSQL'
slug: bai-10-ma-hoa-du-lieu-postgresql
description: >-
  Triển khai mã hóa toàn diện cho PostgreSQL: Transparent Data Encryption (TDE),
  pgcrypto extension cho column-level encryption, SSL/TLS certificates
  với mutual TLS, Key Management với HashiCorp Vault, envelope encryption
  pattern, và so sánh các phương pháp mã hóa (AES-256-GCM, AES-256-CBC)
  cho dữ liệu y tế.
duration_minutes: 180
is_free: true
video_url: null
sort_order: 10
section_title: "Phần 3: Xây dựng Data Layer — PostgreSQL cho Y tế"
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: Xây dựng Hệ thống Y tế Microservices — Quarkus, PostgreSQL, Keycloak chuẩn HIPAA
  slug: xay-dung-he-thong-y-te-microservices
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🏗️ Kiến trúc — Bài 10</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 10: Mã hóa Dữ liệu At-Rest &amp;</tspan>
      <tspan x="60" dy="42">In-Transit với PostgreSQL</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Xây dựng Hệ thống Y tế Microservices — Quarkus, PostgreSQL, Keycloak chuẩn HIPAA</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 3: Xây dựng Data Layer — PostgreSQL cho Y tế</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. Tổng quan Encryption cho Dữ liệu Y Tế

![4 lớp mã hóa dữ liệu y tế: Disk, TDE, Column, Application](/storage/uploads/2026/04/healthcare-encryption-layers.webp)

Dữ liệu y tế (PHI) yêu cầu mã hóa ở **hai trạng thái**: at-rest (khi lưu trữ) và in-transit (khi truyền). HIPAA Security Rule §164.312(a)(2)(iv) và §164.312(e)(2)(ii) quy định cụ thể về encryption requirements.

### 1.1. Encryption Layers

![Các lớp mã hóa dữ liệu y tế — In-Transit, At-Rest (4 levels), Backup](/storage/uploads/2026/04/healthcare-encryption-layers.webp)

- **In-Transit**: TLS 1.3 giữa Application và Database
- **At-Rest Level 1**: Full Disk Encryption (LUKS/dm-crypt) — bảo vệ khi disk bị đánh cắp
- **At-Rest Level 2**: Transparent Data Encryption (TDE) — encrypt data files, WAL, temp files
- **At-Rest Level 3**: Column-Level Encryption (pgcrypto) — encrypt từng field PHI riêng biệt
- **At-Rest Level 4**: Application-Level Encryption — encrypt trước khi gửi tới database
- **Backup**: Encrypted Backup → S3 (SSE-KMS)

### 1.2. So sánh các phương pháp mã hóa

| Phương pháp | Bảo vệ khỏi | Không bảo vệ | Performance Impact |
|-------------|-------------|--------------|-------------------|
| Full Disk (LUKS) | Physical theft | DB admin, SQL injection | Minimal (~2%) |
| TDE | Unauthorized file access | Superuser access | Low (~5%) |
| Column-Level (pgcrypto) | DB admin, SQL injection cho specific columns | App-level compromise | Medium (~10-20%) |
| Application-Level | DB compromise hoàn toàn | App-level compromise | High (~15-30%) |

**Khuyến nghị cho Healthcare**: Kết hợp **TDE + Column-Level Encryption** cho maximum protection.

## 2. Transparent Data Encryption (TDE)

### 2.1. PostgreSQL 16+ TDE (Experimental)

PostgreSQL 16 bắt đầu hỗ trợ TDE (cần compile với option `--with-ssl=openssl` và patches). Tuy nhiên, trong production, nhiều tổ chức dùng giải pháp thay thế.

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

## 3. Column-Level Encryption với pgcrypto

### 3.1. Cài đặt pgcrypto

```sql
-- Cài đặt extension (cần superuser)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Verify
SELECT * FROM pg_extension WHERE extname = 'pgcrypto';
```

### 3.2. Symmetric Encryption (AES-256)

Dùng cho dữ liệu cần encrypt/decrypt thường xuyên bởi application.

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

Dùng khi cần tách biệt quyền encrypt và decrypt (ví dụ: nurse nhập data nhưng chỉ doctor mới đọc được).

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

### 3.4. So sánh AES-256-GCM vs AES-256-CBC

| Đặc điểm | AES-256-GCM | AES-256-CBC |
|-----------|-------------|-------------|
| Authenticated | Có (AEAD) | Không |
| Integrity Check | Built-in | Cần thêm HMAC |
| Parallel Processing | Có | Không |
| Performance | Nhanh hơn | Chậm hơn |
| pgcrypto support | Qua pgp_sym_encrypt | Qua encrypt() |
| Recommendation | **Ưu tiên** | Legacy systems |

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

### 4.1. Certificate Generation chi tiết

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

## 5. Key Management với HashiCorp Vault

### 5.1. Vault Transit Secrets Engine

![Envelope Encryption Pattern với Vault Transit — DEK + KEK](/storage/uploads/2026/04/healthcare-vault-envelope-encryption.webp)

**Quy trình Envelope Encryption:**

1. Generate DEK (Data Encryption Key) — per-record hoặc per-table
2. Encrypt data with DEK
3. Gửi DEK tới Vault Transit để wrap
4. Vault wrap DEK với KEK (Key Encryption Key) qua HSM/KMS
5. Lưu encrypted data + wrapped DEK trong PostgreSQL

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

### 6.2. Database Schema cho Envelope Encryption

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

### 7.1. pg_dump với Encryption

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

### 7.2. Restore từ Encrypted Backup

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

### 8.1. Quy trình Key Rotation

![Key Rotation Timeline — v1 → v2 → v3 mỗi 90 ngày với Vault auto-rotation](/storage/uploads/2026/04/healthcare-key-rotation-timeline.webp)

- **Day 0–90**: Key v1 active — encrypt new data
- **Day 90–180**: Key v2 active — re-encrypt old data, v1 vẫn decrypt được
- **Day 180+**: Key v3 active — v1 retired, v2 vẫn decrypt được
- Vault tự động rotate KEK, OLD versions vẫn decrypt, NEW data encrypt bằng latest
- **Rewrap**: re-encrypt DEK với new KEK version

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

## Tổng kết

Trong bài học này, chúng ta đã triển khai **mã hóa toàn diện** cho PostgreSQL healthcare:

1. **At-Rest Encryption**: LUKS full disk encryption + pgcrypto column-level encryption
2. **In-Transit Encryption**: SSL/TLS với mutual TLS (mTLS) authentication
3. **pgcrypto**: Symmetric (pgp_sym_encrypt) và Asymmetric (pgp_pub_encrypt) encryption
4. **Key Management**: HashiCorp Vault Transit engine với envelope encryption pattern
5. **Envelope Encryption**: Generate DEK → encrypt data → wrap DEK với Vault KEK
6. **AES-256-GCM vs CBC**: GCM được ưu tiên nhờ authenticated encryption
7. **Dynamic Credentials**: Vault Database secrets engine cho auto-rotating passwords
8. **Encrypted Backup**: pg_dump → GPG → S3 với SSE-KMS
9. **Key Rotation**: Automated DEK rewrapping khi KEK rotate

Nguyên tắc quan trọng:

- **Never store encryption keys cùng với encrypted data**
- **Always use authenticated encryption** (AES-GCM)
- **Implement key rotation** với zero-downtime
- **Minimize DEK lifetime** - mỗi record hoặc session một DEK riêng
- **Clear keys from memory** sau khi sử dụng

## Bài tập

1. **Column-Level Encryption**: Tạo bảng patients với pgcrypto encryption cho 5 PHI fields. Viết SQL để INSERT encrypted data và SELECT decrypted data. Benchmark performance so với plaintext.

2. **Mutual TLS Setup**: Tạo CA → server cert → 3 client certs cho 3 microservices. Cấu hình PostgreSQL accept chỉ mTLS connections. Verify bằng `pg_stat_ssl`.

3. **Vault Transit Integration**: Setup HashiCorp Vault (dev mode), tạo transit key, viết Quarkus service encrypt/decrypt patient name và diagnosis. Test key rotation với rewrap.

4. **Encrypted Backup Pipeline**: Viết script tạo encrypted backup (pg_dump → gpg), upload S3, và restore script. Verify data integrity sau restore.

---

---

<!-- SERIES-NAV:START -->
| ◀ Bài trước | Bài tiếp theo ▶ |
|:---|---:|
| [Bài 9: PostgreSQL Security Hardening - Cấu hình Bảo mật Toàn diện](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-9-postgresql-security-hardening-toan-dien) | [Bài 11: Row-Level Security & Column Encryption cho PHI](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-11-row-level-security-column-encryption-phi) |
<!-- SERIES-NAV:END -->
