---
id: 019e1a40-a110-7001-d001-f0a1b2c30110
title: 'レッスン 10: PostgreSQL を使用した保存中および転送中のデータの暗号化'
slug: bai-10-ma-hoa-du-lieu-postgresql
description: >-
  PostgreSQL の包括的な暗号化の実装: 透過的データ暗号化 (TDE)、列レベル暗号化のための pgcrypto 拡張機能、相互 TLS を使用した
  SSL/TLS 証明書、HashiCorp Vault によるキー管理、エンベロープ暗号化パターン、医療データの暗号化方式の比較
  (AES-256-GCM、AES-256-CBC)。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 10
section_title: 'パート 3: データ層の構築 — ヘルスケア向け PostgreSQL'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🏗️ アーキテクチャ — レッスン 10</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 10: 保存時とデータの暗号化</tspan>
      <tspan x="60" dy="42">PostgreSQL による転送中</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 3: データ層の構築 — ヘルスケア向け PostgreSQL</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. 医療データの暗号化の概要

![医療データ暗号化の 4 層: ディスク、TDE、カラム、アプリケーション](/storage/uploads/2026/04/healthcare-encryption-layers.webp)

医療データ (PHI) は、保存中 (保存時) と転送中 (送信時) の **2 つの状態**で暗号化する必要があります。 HIPAA セキュリティ規則 §164.312(a)(2)(iv) および §164.312(e)(2)(ii) は、暗号化要件を具体的に規制しています。

＃＃＃１．１．暗号化レイヤー

![医療データ暗号化レイヤー — 転送中、保存中 (4 レベル)、バックアップ](/storage/uploads/2026/04/healthcare-encryption-layers.webp)

- **転送中**: アプリケーションとデータベース間の TLS 1.3
- **保存時レベル 1**: フルディスク暗号化 (LUKS/dm-crypt) - ディスク盗難時の保護
- **保存時レベル 2**: 透過的データ暗号化 (TDE) — データ ファイル、WAL、一時ファイルを暗号化します。
- **保存時レベル 3**: 列レベルの暗号化 (pgcrypto) — 個々の PHI フィールドを暗号化します
- **保存時レベル 4**: アプリケーション レベルの暗号化 — データベースに送信する前に暗号化します。
- **バックアップ**: 暗号化バックアップ → S3 (SSE-KMS)

＃＃＃１．２．暗号化方式の比較

|方法 |から守る |保護されていない |パフォーマンスへの影響 |
|---------------|---------------|---------------|------|
|フルディスク (LUKS) |物理的な盗難 | DB管理者、SQLインジェクション |最小限 (~2%) |
| TDE |不正なファイル アクセス |スーパーユーザー アクセス |低 (~5%) |
|列レベル (pgcrypto) | DB 管理者、特定の列に対する SQL インジェクション |アプリレベルの侵害 |中 (~10-20%) |
|アプリケーションレベル | DB を完全に侵害 |アプリレベルの侵害 |高 (~15-30%) |

**医療に推奨**: **TDE + 列レベルの暗号化**を組み合わせて最大限の保護を実現します。

## 2. 透過的データ暗号化 (TDE)

＃＃＃２．１． PostgreSQL 16+ TDE (実験的)

PostgreSQL 16 は TDE のサポートを開始します (オプションを使用してコンパイルする必要があります) `--with-ssl=openssl` およびパッチ)。ただし、運用環境では、多くの組織が代替ソリューションを使用しています。

＃＃＃２．２． LUKS フルディスク暗号化

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

## 3. pgcrypto を使用した列レベルの暗号化

＃＃＃３．１． pgcrypto をインストールする

```sql
-- Cài đặt extension (cần superuser)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Verify
SELECT * FROM pg_extension WHERE extname = 'pgcrypto';
```

＃＃＃３．２．対称暗号化 (AES-256)

アプリケーションによって頻繁に暗号化/復号化する必要があるデータに使用されます。

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

＃＃＃３．３．非対称暗号化 (RSA/PGP)

暗号化権限と復号化権限を分離する必要がある場合に使用されます (例: 看護師はデータを入力しますが、医師のみがそれを読み取ることができます)。

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

＃＃＃３．４． AES-256-GCM と AES-256-CBC の比較

|特長 | AES-256-GCM | AES-256-CBC |
|----------|---------------|---------------|
|認証済み |はい (AEAD) |いいえ |
|整合性チェック |内蔵 |もっと HMAC が必要 |
|並列処理 |はい |いいえ |
|パフォーマンス |より速く |遅い |
| pgcrypto サポート | pgp_sym_encrypt 経由 | encrypt() 経由 |
|推薦 | **優先度** |レガシー システム |

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

## 4. SSL/TLS - 転送中の暗号化

＃＃＃４．１．証明書生成の詳細

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

＃＃＃４．２． PostgreSQL SSL 構成

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

＃＃＃４．３． Quarkus mTLS 構成

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

## 5. HashiCorp Vault を使用したキー管理

＃＃＃５．１． Vault Transit Secrets エンジン

![Vault Transit を使用したエンベロープ暗号化パターン — DEK + KEK](/storage/uploads/2026/04/healthcare-vault-envelope-encryption.webp)

**エンベロープ暗号化プロセス:**

1. DEK (データ暗号化キー) を生成します — レコードごとまたはテーブルごと
2. DEK を使用してデータを暗号化する
3. ラッピングのために DEK を Vault Transit に送信します
4. HSM/KMS 経由で DEK (キー暗号化キー) を Vault ラップする
5. 暗号化されたデータ + ラップされた DEK を PostgreSQL に保存する

＃＃＃５．２．ボールトの構成

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

＃＃＃５．３． Quarkus + Vault の統合

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

＃＃＃５．４．ボールトの動的データベース認証情報

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

## 6. エンベロープ暗号化パターン - 実装

＃＃＃６．１． Javaの実装

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

＃＃＃６．２．エンベロープ暗号化のデータベース スキーマ

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

## 7. 暗号化されたバックアップ

＃＃＃７．１．暗号化付きの pg_dump

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

＃＃＃７．２．暗号化されたバックアップからの復元

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

## 8. キーローテーション戦略

### 8.1。キーローテーションプロセス

![キーのローテーション タイムライン — v1 → v2 → v3 90 日ごと (Vault 自動ローテーションあり)](/storage/uploads/2026/04/healthcare-key-rotation-timeline.webp)

- **0 ～ 90 日目**: キー v1 がアクティブ — 新しいデータを暗号化します
- **90 ～ 180 日目**: キー v2 がアクティブ — 古いデータを再暗号化します。v1 は引き続き復号化できます
- **180 日目以降**: キー v3 がアクティブ — v1 は廃止されましたが、v2 は引き続き復号化できます
- Vault は KEK を自動的にローテーションします。古いバージョンは依然として復号化され、新しいデータは最新のデータで暗号化されます。
- **再ラップ**: 新しい KEK バージョンで DEK を再暗号化します

### 8.2。バッチ再暗号化スクリプト

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

## 概要

このレッスンでは、PostgreSQL ヘルスケアに **エンドツーエンド暗号化** を実装しました。

1. **保存時の暗号化**: LUKS フルディスク暗号化 + pgcrypto 列レベル暗号化
2. **転送中の暗号化**: 相互 TLS (mTLS) 認証を使用した SSL/TLS
3. **pgcrypto**: 対称 (pgp_sym_encrypt) および非対称 (pgp_pub_encrypt) 暗号化
4. **キー管理**: エンベロープ暗号化パターンを備えた HashiCorp Vault Transit エンジン
5. **エンベロープ暗号化**: DEK の生成 → データの暗号化 → DEK を Vault KEK でラップ
6. **AES-256-GCM と CBC**: 認証された暗号化のおかげで GCM が優先されます
7. **動的認証情報**: パスワードを自動ローテーションするための Vault データベース シークレット エンジン
8. **暗号化バックアップ**: SSE-KMS を使用した pg_dump → GPG → S3
9. **キー ローテーション**: KEK ローテーション時の自動 DEK 再ラップ

重要な原則:

- **暗号化されたデータと一緒に暗号化キーを保存しないでください**
- **常に認証された暗号化を使用** (AES-GCM)
- **ダウンタイムゼロでキーローテーションを実装**
- **DEK の有効期間を最小限に抑える** - 各レコードまたはセッションには個別の DEK があります
- **使用後はキーをメモリから消去**

## 演習

1. **列レベルの暗号化**: 5 つの PHI フィールドに対して pgcrypto 暗号化を使用して患者テーブルを作成します。 SQL を作成して、暗号化されたデータを INSERT し、復号化されたデータを SELECT します。平文と比較したベンチマークのパフォーマンス。

2. **相互 TLS セットアップ**: 3 つのマイクロサービスに対して CA → サーバー証明書 → 3 つのクライアント証明書を作成します。 mTLS 接続のみを受け入れるように PostgreSQL を構成します。等しいことを検証する `pg_stat_ssl`。

3. **Vault Transit Integration**: HashiCorp Vault (開発モード) をセットアップし、トランジット キーを作成し、患者名と診断名と診断を暗号化/復号化する Quarkus サービスを書き込みます。リラップを使用してキーのローテーションをテストします。

4. **暗号化バックアップ パイプライン**: 暗号化バックアップ (pg_dump → gpg) を作成し、S3 にアップロードし、スクリプトを復元するスクリプトを作成します。復元後にデータの整合性を確認します。

---

---

<!-- SERIES-NAV:START -->
| ◀ 前の記事 |次の記事 ▶ |
|:---|---:|
| [レッスン 9: PostgreSQL のセキュリティ強化 - 包括的なセキュリティ構成](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-9-postgresql-security-hardening-toan-dien) | [レッスン 11: PHI の行レベルのセキュリティと列の暗号化](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-11-row-level-security-column-encryption-phi) |
<!-- SERIES-NAV:END -->
