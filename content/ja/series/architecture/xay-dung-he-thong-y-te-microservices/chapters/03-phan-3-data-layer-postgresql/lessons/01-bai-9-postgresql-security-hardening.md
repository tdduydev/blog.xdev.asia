---
id: 019e1a40-a109-7001-d001-f0a1b2c30109
title: 'レッスン 9: PostgreSQL のセキュリティ強化 — 包括的な構成'
slug: bai-9-postgresql-security-hardening
description: >-
  医療データ向けの PostgreSQL の強化: pg_hba.conf 認証方法、SSL/TLS 構成、接続制限、パスワード
  ポリシー、ロール管理と最小権限、スキーマ分離、ネットワーク セキュリティ、postgresql.conf セキュリティ パラメーター、PostgreSQL
  準拠のための CIS ベンチマーク。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 9
section_title: 'パート 3: データ層の構築 — ヘルスケア向け PostgreSQL'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-4641" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-4641)"/>

  <!-- Decorations -->
  <g>
    <circle cx="869" cy="237" r="32" fill="#818cf8" opacity="0.12000000000000001"/>
    <circle cx="638" cy="46" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="907" cy="115" r="26" fill="#818cf8" opacity="0.060000000000000005"/>
    <circle cx="676" cy="184" r="23" fill="#818cf8" opacity="0.13"/>
    <circle cx="945" cy="253" r="20" fill="#818cf8" opacity="0.1"/>
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
    <line x1="600" y1="87" x2="1100" y2="167" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="117" x2="1050" y2="187" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1023.3730669589464,166 1023.3730669589464,208 987,229 950.6269330410536,208 950.6269330410536,166 987,145" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 9</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 9: PostgreSQL のセキュリティ強化 — 構造</tspan>
      <tspan x="60" dy="42">全体像</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 3: データ層の構築 — ヘルスケア向け PostgreSQL</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. 医療向け PostgreSQL セキュリティの概要

![医療データ用の PostgreSQL セキュリティ層 — TLS、pg_hba、RLS、pgcrypto](/storage/uploads/2026/04/healthcare-postgresql-security-layers.webp)

PostgreSQL は、その柔軟性、オープンソース、強力なセキュリティ機能のおかげで、医療システムによく選ばれています。ただし、PostgreSQL のデフォルト構成は、PHI (保護された医療情報) データに対して **十分に安全ではありません**。このレッスンでは、CIS ベンチマークとヘルスケアのベスト プラクティスに従って PostgreSQL を強化する方法を説明します。

＃＃＃１．１． PostgreSQL セキュリティ層

![PostgreSQL セキュリティの 7 層 — アプリケーションから OS 層まで](/storage/uploads/2026/04/healthcare-postgresql-security-layers.webp)

|レイヤー |名前 |成分 |
|----------|-----|----------|
| 7 |アプリケーション | Quarkus / Spring Boot + 接続プール |
| 6 |ネットワーク |ファイアウォール ルール + VPN/プライベート ネットワーク |
| 5 |認証 | pg_hba.conf + SSL/TLS + クライアント証明書 |
| 4 |認可 |ロール + 特権 + 行レベルのセキュリティ |
| 3 |暗号化 | TDE + 列暗号化 + バックアップ暗号化 |
| 2 |監査 | pgAudit + カスタム トリガー + ログ配布 |
| 1 |オペレーティング システム |ファイル権限 + SELinux/AppArmor |

＃＃＃１．２．セキュリティチェックリストを完了する必要があります

|カテゴリー |説明 |優先事項 |
|----------|----------|----------|
|認証 | scram-sha-256、クライアント証明書 |クリティカル |
| SSL/TLS |暗号化された接続 |クリティカル |
|役割管理 |最小権限の役割 |クリティカル |
|ネットワーク |リッスンアドレス、ファイアウォール |クリティカル |
| postgresql.conf |セキュリティパラメータ |高 |
|接続制限 |役割ごとの制限 |高 |
|スキーマの分離 |個別のスキーマ |中 |
|パスワードポリシー |回転、複雑さ |中 |
|ロギング |セキュリティ関連のイベント |高 |

## 2. pg_hba.conf - 認証設定

ファイル `pg_hba.conf` (ホストベース認証) は、**誰が接続**し、**どのような方法で**を制御します。これが防御の第一線です。

＃＃＃２．１． pg_hba.conf構造体

```
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# Giải thích:
# TYPE     = local (Unix socket), host (TCP/IP), hostssl (TCP/IP + SSL)
# DATABASE = tên database hoặc "all"
# USER     = tên role hoặc "all"
# ADDRESS  = CIDR range (cho host/hostssl)
# METHOD   = authentication method
```

＃＃＃２．２．認証方法 - 比較

|方法 |セキュリティレベル |説明 |用途 |
|----------|------|----------|----------|
| `trust` | **安全ではありません** |パスワードは必要ありません |ローカル開発のみ |
| `password` |低い |パスワードは平文で送信 | **使用しないでください** |
| `md5` |平均 | MD5 ハッシュ (クラックしやすい) |レガシー システム |
| `scram-sha-256` | **高** |スクラム認証 | **生産** |
| `cert` | **非常に高い** |クライアント証明書 | **ヘルスケア** |
| `gss` |曹操 | Kerberos/GSSAPI |エンタープライズ広告 |

＃＃＃２．３．ヘルスケア生産用の pg_hba.conf

```bash
# /etc/postgresql/16/main/pg_hba.conf
# =====================================================
# HEALTHCARE POSTGRESQL - PRODUCTION CONFIGURATION
# CIS Benchmark Compliant
# =====================================================

# === Rule 1: Deny ALL by default ===
# pg_hba.conf xử lý từ trên xuống, match đầu tiên thắng

# === Rule 2: Local socket - chỉ cho admin ===
# Chỉ postgres superuser được dùng Unix socket
local   all             postgres                                peer

# === Rule 3: Local socket - deny tất cả user khác ===
local   all             all                                     reject

# === Rule 4: SSL required cho application connections ===
# Application service account (Quarkus microservices)
hostssl healthcare_db   app_patient_svc   10.0.1.0/24          scram-sha-256
hostssl healthcare_db   app_lab_svc       10.0.1.0/24          scram-sha-256
hostssl healthcare_db   app_pharmacy_svc  10.0.1.0/24          scram-sha-256
hostssl healthcare_db   app_gateway_svc   10.0.1.0/24          scram-sha-256

# === Rule 5: SSL + Client Certificate cho admin access ===
hostssl all             dba_admin         10.0.100.0/24        cert

# === Rule 6: Read-only replica connections ===
hostssl healthcare_db   readonly_user     10.0.2.0/24          scram-sha-256

# === Rule 7: Monitoring ===
hostssl postgres        monitoring_user   10.0.3.0/24          scram-sha-256

# === Rule 8: Replication ===
hostssl replication     repl_user         10.0.10.0/24         cert

# === Rule 9: Deny everything else ===
host    all             all               0.0.0.0/0            reject
hostssl all             all               0.0.0.0/0            reject
```

＃＃＃２．４．重要なルールを説明する

**ルール 2 - `peer` 認証**: OS ユーザー名のマッピングを使用します。ユーザーでUnixソケットを使用してログインする場合 `postgres` OS では、PostgreSQL が自動的に認証します。

```bash
# Chỉ hoạt động khi login với OS user postgres
sudo -u postgres psql
```

**ルール 4 - `hostssl` + `scram-sha-256`**:

- `hostssl` = SSL/TLS が必要です
- `scram-sha-256` = PostgreSQL がサポートする最強のパスワード ハッシュ

**ルール 5 - `cert` 認証**: クライアントは、信頼された CA によって署名された TLS 証明書を提示する必要があります。管理者にとって最も強力な方法。

```bash
# Client cert connection
psql "host=db.hospital.local \
      port=5432 \
      dbname=healthcare_db \
      user=dba_admin \
      sslmode=verify-full \
      sslcert=/path/to/client.crt \
      sslkey=/path/to/client.key \
      sslrootcert=/path/to/ca.crt"
```

## 3. SSL/TLS 構成

＃＃＃３．１． SSL証明書の作成

```bash
#!/bin/bash
# generate-pg-certs.sh
# Tạo CA và certificates cho PostgreSQL

CERT_DIR="/etc/postgresql/ssl"
mkdir -p ${CERT_DIR}
cd ${CERT_DIR}

# === Step 1: Tạo Certificate Authority (CA) ===
openssl genrsa -aes256 -out ca.key 4096
openssl req -new -x509 -days 3650 -key ca.key \
    -out ca.crt \
    -subj "/C=VN/ST=HCMC/O=Hospital Network/CN=PostgreSQL CA"

# === Step 2: Tạo Server Certificate ===
openssl genrsa -out server.key 2048
chmod 600 server.key
chown postgres:postgres server.key

openssl req -new -key server.key \
    -out server.csr \
    -subj "/C=VN/ST=HCMC/O=Hospital Network/CN=db.hospital.local"

# SAN (Subject Alternative Names) cho multiple hostnames
cat > server-ext.cnf << EOF
[v3_req]
subjectAltName = @alt_names

[alt_names]
DNS.1 = db.hospital.local
DNS.2 = db-primary.hospital.local
DNS.3 = db-replica.hospital.local
IP.1 = 10.0.1.100
EOF

openssl x509 -req -in server.csr \
    -CA ca.crt -CAkey ca.key -CAcreateserial \
    -out server.crt -days 365 \
    -extfile server-ext.cnf -extensions v3_req

# === Step 3: Tạo Client Certificate (cho DBA admin) ===
openssl genrsa -out client-dba.key 2048
openssl req -new -key client-dba.key \
    -out client-dba.csr \
    -subj "/C=VN/ST=HCMC/O=Hospital Network/CN=dba_admin"

openssl x509 -req -in client-dba.csr \
    -CA ca.crt -CAkey ca.key -CAcreateserial \
    -out client-dba.crt -days 90

echo "Certificates generated successfully!"
```

＃＃＃３．２． postgresql.conf - SSL設定

```ini
# /etc/postgresql/16/main/postgresql.conf
# ======================================
# SSL/TLS Configuration
# ======================================

ssl = on
ssl_cert_file = '/etc/postgresql/ssl/server.crt'
ssl_key_file = '/etc/postgresql/ssl/server.key'
ssl_ca_file = '/etc/postgresql/ssl/ca.crt'

# TLS version - chỉ cho phép TLS 1.2 và 1.3
ssl_min_protocol_version = 'TLSv1.2'

# Cipher suites - chỉ strong ciphers
ssl_ciphers = 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256'

# Prefer server cipher order
ssl_prefer_server_ciphers = on

# CRL (Certificate Revocation List) - kiểm tra cert bị revoke
ssl_crl_file = '/etc/postgresql/ssl/ca.crl'
```

＃＃＃３．３． SSL接続の検証

```sql
-- Kiểm tra connection đang dùng SSL
SELECT 
    pid,
    usename,
    client_addr,
    ssl,
    ssl_version,
    ssl_cipher
FROM pg_stat_ssl 
JOIN pg_stat_activity USING (pid)
WHERE usename IS NOT NULL;

-- Kết quả mong muốn:
--  pid  | usename       | client_addr | ssl  | ssl_version | ssl_cipher
-- ------+---------------+-------------+------+-------------+---------------------------
--  1234 | app_patient   | 10.0.1.10   | true | TLSv1.3     | TLS_AES_256_GCM_SHA384
--  1235 | dba_admin     | 10.0.100.5  | true | TLSv1.3     | TLS_AES_256_GCM_SHA384
```

## 4. ロール管理 - 最低特権

＃＃＃４．１．医療における最小特権原則

![医療システムの PostgreSQL 役割階層](/storage/uploads/2026/04/healthcare-postgresql-role-hierarchy.webp)

- **postgres** (スーパーユーザー) ← メンテナンスのみに使用されます
  - **dba_admin** (CREATEDB、CREATEROLE) — スキーマ管理、バックアップ、監視
  - **app_roles** (ログイン、制限付き権限) — app_patient_svc、app_lab_svc、app_pharmacy_svc、app_gateway_svc
  - **readonly_role** (SELECT のみ) — readonly_analytics、readonly_reporting
  - **monitoring_user** (pg_monitor)

＃＃＃４．２．役割階層の作成

```sql
-- =====================================================
-- HEALTHCARE DATABASE ROLE SETUP
-- Run as: postgres superuser
-- =====================================================

-- === Step 1: Tạo Group Roles (không LOGIN) ===

-- Group role cho application services
CREATE ROLE healthcare_app NOLOGIN;
COMMENT ON ROLE healthcare_app IS 'Group role for all application services';

-- Group role cho read-only access
CREATE ROLE healthcare_readonly NOLOGIN;
COMMENT ON ROLE healthcare_readonly IS 'Group role for read-only access (analytics/reporting)';

-- Group role cho PHI access (extra audit)
CREATE ROLE phi_access NOLOGIN;
COMMENT ON ROLE phi_access IS 'Group role for PHI data access - extra audit logging';

-- === Step 2: Tạo Application Service Accounts ===

-- Patient Service
CREATE ROLE app_patient_svc LOGIN 
    PASSWORD 'CHANGE_ME_USE_VAULT'  -- Sẽ rotate qua Vault
    CONNECTION LIMIT 20
    IN ROLE healthcare_app, phi_access
    VALID UNTIL '2025-12-31';

-- Lab Service
CREATE ROLE app_lab_svc LOGIN 
    PASSWORD 'CHANGE_ME_USE_VAULT'
    CONNECTION LIMIT 15
    IN ROLE healthcare_app, phi_access
    VALID UNTIL '2025-12-31';

-- Pharmacy Service
CREATE ROLE app_pharmacy_svc LOGIN 
    PASSWORD 'CHANGE_ME_USE_VAULT'
    CONNECTION LIMIT 15
    IN ROLE healthcare_app
    VALID UNTIL '2025-12-31';

-- API Gateway (chỉ cần authenticate, không truy cập data trực tiếp)
CREATE ROLE app_gateway_svc LOGIN 
    PASSWORD 'CHANGE_ME_USE_VAULT'
    CONNECTION LIMIT 50
    VALID UNTIL '2025-12-31';

-- === Step 3: DBA Admin ===
CREATE ROLE dba_admin LOGIN 
    CREATEDB CREATEROLE
    CONNECTION LIMIT 3
    IN ROLE pg_monitor;

-- === Step 4: Read-only accounts ===
CREATE ROLE readonly_analytics LOGIN 
    PASSWORD 'CHANGE_ME'
    CONNECTION LIMIT 5
    IN ROLE healthcare_readonly
    VALID UNTIL '2025-06-30';

CREATE ROLE readonly_reporting LOGIN 
    PASSWORD 'CHANGE_ME'
    CONNECTION LIMIT 5
    IN ROLE healthcare_readonly
    VALID UNTIL '2025-06-30';

-- === Step 5: Monitoring ===
CREATE ROLE monitoring_user LOGIN 
    PASSWORD 'CHANGE_ME'
    CONNECTION LIMIT 3
    IN ROLE pg_monitor;
```

＃＃＃４．３．スキーマの分離

```sql
-- =====================================================
-- SCHEMA ISOLATION BY SERVICE
-- =====================================================

-- Tạo database
CREATE DATABASE healthcare_db 
    OWNER dba_admin
    ENCODING 'UTF8'
    LC_COLLATE 'en_US.UTF-8';

\c healthcare_db

-- Revoke default public access
REVOKE ALL ON DATABASE healthcare_db FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM PUBLIC;

-- === Tạo schemas cho từng service ===
CREATE SCHEMA patient_schema AUTHORIZATION dba_admin;
CREATE SCHEMA lab_schema AUTHORIZATION dba_admin;
CREATE SCHEMA pharmacy_schema AUTHORIZATION dba_admin;
CREATE SCHEMA audit_schema AUTHORIZATION dba_admin;
CREATE SCHEMA shared_schema AUTHORIZATION dba_admin;

-- === GRANT cho Patient Service ===
GRANT USAGE ON SCHEMA patient_schema TO app_patient_svc;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA patient_schema TO app_patient_svc;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA patient_schema TO app_patient_svc;

-- Shared schema (lookup tables)
GRANT USAGE ON SCHEMA shared_schema TO app_patient_svc;
GRANT SELECT ON ALL TABLES IN SCHEMA shared_schema TO app_patient_svc;

-- Default privileges cho tables tạo trong tương lai
ALTER DEFAULT PRIVILEGES IN SCHEMA patient_schema 
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_patient_svc;
ALTER DEFAULT PRIVILEGES IN SCHEMA patient_schema 
    GRANT USAGE, SELECT ON SEQUENCES TO app_patient_svc;

-- === GRANT cho Lab Service ===
GRANT USAGE ON SCHEMA lab_schema TO app_lab_svc;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA lab_schema TO app_lab_svc;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA lab_schema TO app_lab_svc;

-- Lab service cần đọc patient data
GRANT USAGE ON SCHEMA patient_schema TO app_lab_svc;
GRANT SELECT ON patient_schema.patients TO app_lab_svc;

-- === GRANT cho Pharmacy Service ===
GRANT USAGE ON SCHEMA pharmacy_schema TO app_pharmacy_svc;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA pharmacy_schema TO app_pharmacy_svc;

-- === GRANT cho Read-only ===
GRANT USAGE ON SCHEMA patient_schema, lab_schema, pharmacy_schema TO healthcare_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA patient_schema TO healthcare_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA lab_schema TO healthcare_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA pharmacy_schema TO healthcare_readonly;

-- Default privileges cho readonly
ALTER DEFAULT PRIVILEGES IN SCHEMA patient_schema 
    GRANT SELECT ON TABLES TO healthcare_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA lab_schema 
    GRANT SELECT ON TABLES TO healthcare_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA pharmacy_schema 
    GRANT SELECT ON TABLES TO healthcare_readonly;

-- === Audit schema - append only ===
GRANT USAGE ON SCHEMA audit_schema TO healthcare_app;
GRANT INSERT ON ALL TABLES IN SCHEMA audit_schema TO healthcare_app;
-- KHÔNG grant UPDATE, DELETE cho audit tables
```

＃＃＃４．４．パスワードポリシーとローテーション

```sql
-- Kiểm tra password encryption method
SHOW password_encryption;
-- Kết quả: scram-sha-256

-- Đặt valid_until cho password rotation
ALTER ROLE app_patient_svc VALID UNTIL '2025-06-30';

-- Script kiểm tra roles sắp hết hạn
SELECT 
    rolname,
    rolvaliduntil,
    CASE 
        WHEN rolvaliduntil IS NULL THEN 'No expiry set'
        WHEN rolvaliduntil < CURRENT_TIMESTAMP THEN 'EXPIRED!'
        WHEN rolvaliduntil < CURRENT_TIMESTAMP + INTERVAL '30 days' THEN 'Expiring soon'
        ELSE 'OK'
    END AS status
FROM pg_roles
WHERE rolcanlogin = true
ORDER BY rolvaliduntil NULLS LAST;
```

## 5. postgresql.conf - セキュリティパラメータ

＃＃＃５．１．コアセキュリティ設定

```ini
# /etc/postgresql/16/main/postgresql.conf
# =====================================================
# SECURITY CONFIGURATION - Healthcare Production
# =====================================================

# --- Authentication ---
password_encryption = 'scram-sha-256'   # CIS: Ensure scram-sha-256
authentication_timeout = '30s'           # Timeout cho authentication

# --- Connection Settings ---
listen_addresses = '10.0.1.100'         # CHỈ listen trên internal IP
                                         # KHÔNG dùng '*' trong production
port = 5432
max_connections = 200                    # Giới hạn tổng connections
superuser_reserved_connections = 3       # Reserve cho emergency admin

# --- Logging (Security-relevant) ---
log_destination = 'stderr'
logging_collector = on
log_directory = '/var/log/postgresql'
log_filename = 'postgresql-%Y-%m-%d.log'
log_file_mode = 0600                     # Chỉ postgres user đọc được

# Log connections và disconnections
log_connections = on                     # CIS: Required
log_disconnections = on                  # CIS: Required

# Log tất cả DDL statements
log_statement = 'ddl'                    # Options: none, ddl, mod, all
                                         # 'mod' hoặc 'all' cho audit cao hơn

# Log slow queries (performance + security)
log_min_duration_statement = 1000        # Log queries > 1 second

# Log line prefix - bao gồm đầy đủ context
log_line_prefix = '%m [%p] %q%u@%d from %h '
# %m = timestamp with milliseconds
# %p = process ID
# %u = user name
# %d = database name
# %h = remote host

# Log failed authentication
log_min_messages = 'warning'

# --- Row Security ---
row_security = on                        # Enable Row-Level Security

# --- Statement Timeout ---
statement_timeout = '60s'                # Kill queries chạy quá lâu
idle_in_transaction_session_timeout = '300s'  # Kill idle transactions

# --- Shared Preload Libraries ---
shared_preload_libraries = 'pgaudit,pg_stat_statements'
```

＃＃＃５．２．現在の構成を確認する

```sql
-- Script kiểm tra security settings
SELECT name, setting, unit, context
FROM pg_settings
WHERE name IN (
    'password_encryption',
    'ssl',
    'ssl_min_protocol_version',
    'log_connections',
    'log_disconnections',
    'log_statement',
    'listen_addresses',
    'row_security',
    'authentication_timeout',
    'statement_timeout'
)
ORDER BY name;

-- Kiểm tra roles có SUPERUSER (nên tối thiểu)
SELECT rolname, rolsuper, rolcreatedb, rolcreaterole, rolreplication
FROM pg_roles
WHERE rolsuper = true;

-- Kiểm tra roles không có password expiry
SELECT rolname, rolvaliduntil
FROM pg_roles
WHERE rolcanlogin = true
  AND (rolvaliduntil IS NULL OR rolvaliduntil = 'infinity');
```

## 6. 接続プーリングのセキュリティ - PgBouncer

＃＃＃６．１． PgBouncer が必要な理由

マイクロサービス システムでは、各サービス インスタンスが独自の接続プールを作成します。 PgBouncer は次のことに役立ちます。

- PostgreSQL への総接続数を減らす
- 認証レイヤーを追加する
- レート制限
- 接続ルーティング

![PgBouncer 接続プーリング — 140 の接続を 50 に削減](/storage/uploads/2026/04/healthcare-pgbouncer-connection-pooling.webp)

＃＃＃６．２． PgBouncer の構成

```ini
; /etc/pgbouncer/pgbouncer.ini

[databases]
; database = host=addr port=port dbname=name
healthcare_db = host=10.0.1.100 port=5432 dbname=healthcare_db

[pgbouncer]
; === Connection Settings ===
listen_addr = 10.0.1.50
listen_port = 6432
auth_type = scram-sha-256
auth_file = /etc/pgbouncer/userlist.txt

; === TLS Settings ===
; Client-side TLS (app → PgBouncer)
client_tls_sslmode = require
client_tls_key_file = /etc/pgbouncer/ssl/pgbouncer.key
client_tls_cert_file = /etc/pgbouncer/ssl/pgbouncer.crt
client_tls_ca_file = /etc/pgbouncer/ssl/ca.crt
client_tls_protocols = tlsv1.2,tlsv1.3

; Server-side TLS (PgBouncer → PostgreSQL)
server_tls_sslmode = verify-full
server_tls_key_file = /etc/pgbouncer/ssl/client.key
server_tls_cert_file = /etc/pgbouncer/ssl/client.crt
server_tls_ca_file = /etc/pgbouncer/ssl/ca.crt

; === Pool Settings ===
pool_mode = transaction              ; transaction pooling cho microservices
default_pool_size = 20
min_pool_size = 5
reserve_pool_size = 5
max_client_conn = 200
max_db_connections = 50

; === Security Limits ===
max_user_connections = 30            ; Per-user connection limit
query_timeout = 60                   ; Kill queries > 60s
client_idle_timeout = 300            ; Disconnect idle clients
server_idle_timeout = 600

; === Logging ===
log_connections = 1
log_disconnections = 1
log_pooler_errors = 1
stats_period = 60

; === Admin ===
admin_users = pgbouncer_admin
stats_users = pgbouncer_monitor
```

＃＃＃６．３． PgBouncer 認証ファイル

```bash
# /etc/pgbouncer/userlist.txt
# Format: "username" "password_hash"
# Generate hash: psql -c "SELECT concat('\"', usename, '\" \"', passwd, '\"') FROM pg_shadow"

"app_patient_svc" "SCRAM-SHA-256$4096:salt$StoredKey:ServerKey"
"app_lab_svc" "SCRAM-SHA-256$4096:salt$StoredKey:ServerKey"
"app_pharmacy_svc" "SCRAM-SHA-256$4096:salt$StoredKey:ServerKey"
"readonly_analytics" "SCRAM-SHA-256$4096:salt$StoredKey:ServerKey"
```

## 7. ネットワークセキュリティ

＃＃＃７．１．ファイアウォール ルール (iptables)

```bash
#!/bin/bash
# postgresql-firewall.sh
# Firewall rules cho PostgreSQL server

# Flush existing rules
iptables -F INPUT

# Allow established connections
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow loopback
iptables -A INPUT -i lo -j ACCEPT

# Allow SSH from admin network
iptables -A INPUT -p tcp --dport 22 -s 10.0.100.0/24 -j ACCEPT

# Allow PostgreSQL from application subnet
iptables -A INPUT -p tcp --dport 5432 -s 10.0.1.0/24 -j ACCEPT

# Allow PostgreSQL from PgBouncer
iptables -A INPUT -p tcp --dport 5432 -s 10.0.1.50/32 -j ACCEPT

# Allow replication from replica servers
iptables -A INPUT -p tcp --dport 5432 -s 10.0.10.0/24 -j ACCEPT

# Allow monitoring
iptables -A INPUT -p tcp --dport 5432 -s 10.0.3.0/24 -j ACCEPT

# Drop everything else to PostgreSQL port
iptables -A INPUT -p tcp --dport 5432 -j DROP

# Default drop
iptables -P INPUT DROP

# Save rules
iptables-save > /etc/iptables/rules.v4
```

＃＃＃７．２． Kubernetes ネットワーク ポリシー

```yaml
# network-policy-postgresql.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: postgresql-network-policy
  namespace: healthcare-db
spec:
  podSelector:
    matchLabels:
      app: postgresql
  policyTypes:
    - Ingress
    - Egress
  ingress:
    # Cho phép từ application namespace
    - from:
        - namespaceSelector:
            matchLabels:
              name: healthcare-app
          podSelector:
            matchLabels:
              role: microservice
      ports:
        - port: 5432
          protocol: TCP
    # Cho phép từ PgBouncer
    - from:
        - podSelector:
            matchLabels:
              app: pgbouncer
      ports:
        - port: 5432
          protocol: TCP
    # Cho phép từ monitoring
    - from:
        - namespaceSelector:
            matchLabels:
              name: monitoring
          podSelector:
            matchLabels:
              app: prometheus
      ports:
        - port: 9187  # postgres_exporter
          protocol: TCP
  egress:
    # DNS
    - to: []
      ports:
        - port: 53
          protocol: UDP
    # Replication
    - to:
        - podSelector:
            matchLabels:
              app: postgresql
      ports:
        - port: 5432
          protocol: TCP
```

## 8. PostgreSQL の CIS ベンチマーク チェックリスト

### 8.1。自動コンプライアンスチェックスクリプト

```sql
-- =====================================================
-- CIS BENCHMARK COMPLIANCE CHECK
-- PostgreSQL 16 for Healthcare
-- =====================================================

-- 1. Ensure login via local UNIX Domain Socket is restricted
SELECT 
    'CIS 1.1 - Unix Domain Socket' AS check_item,
    CASE 
        WHEN count(*) = 0 THEN 'PASS'
        ELSE 'FAIL - Found trust/password auth on local'
    END AS result
FROM pg_hba_file_rules
WHERE type = 'local' 
  AND auth_method IN ('trust', 'password');

-- 2. Ensure password_encryption is scram-sha-256
SELECT 
    'CIS 2.1 - Password Encryption' AS check_item,
    CASE 
        WHEN setting = 'scram-sha-256' THEN 'PASS'
        ELSE 'FAIL - Current: ' || setting
    END AS result
FROM pg_settings 
WHERE name = 'password_encryption';

-- 3. Ensure SSL is enabled
SELECT 
    'CIS 3.1 - SSL Enabled' AS check_item,
    CASE 
        WHEN setting = 'on' THEN 'PASS'
        ELSE 'FAIL'
    END AS result
FROM pg_settings 
WHERE name = 'ssl';

-- 4. Ensure TLS version is >= 1.2
SELECT 
    'CIS 3.2 - TLS Min Version' AS check_item,
    CASE 
        WHEN setting IN ('TLSv1.2', 'TLSv1.3') THEN 'PASS'
        ELSE 'FAIL - Current: ' || setting
    END AS result
FROM pg_settings 
WHERE name = 'ssl_min_protocol_version';

-- 5. Ensure log_connections is enabled
SELECT 
    'CIS 4.1 - Log Connections' AS check_item,
    CASE 
        WHEN setting = 'on' THEN 'PASS'
        ELSE 'FAIL'
    END AS result
FROM pg_settings 
WHERE name = 'log_connections';

-- 6. Ensure log_disconnections is enabled
SELECT 
    'CIS 4.2 - Log Disconnections' AS check_item,
    CASE 
        WHEN setting = 'on' THEN 'PASS'
        ELSE 'FAIL'
    END AS result
FROM pg_settings 
WHERE name = 'log_disconnections';

-- 7. Ensure log_statement is set
SELECT 
    'CIS 4.3 - Log Statement' AS check_item,
    CASE 
        WHEN setting IN ('ddl', 'mod', 'all') THEN 'PASS - ' || setting
        ELSE 'FAIL - Not logging statements'
    END AS result
FROM pg_settings 
WHERE name = 'log_statement';

-- 8. Ensure no roles use md5 password
SELECT 
    'CIS 5.1 - No MD5 Passwords' AS check_item,
    CASE 
        WHEN count(*) = 0 THEN 'PASS'
        ELSE 'FAIL - ' || count(*) || ' roles with md5'
    END AS result
FROM pg_shadow 
WHERE passwd LIKE 'md5%';

-- 9. Ensure superuser count is minimal
SELECT 
    'CIS 6.1 - Superuser Count' AS check_item,
    CASE 
        WHEN count(*) <= 1 THEN 'PASS - ' || count(*) || ' superuser(s)'
        ELSE 'WARNING - ' || count(*) || ' superusers'
    END AS result
FROM pg_roles 
WHERE rolsuper = true;

-- 10. Ensure row_security is enabled
SELECT 
    'CIS 7.1 - Row Security' AS check_item,
    CASE 
        WHEN setting = 'on' THEN 'PASS'
        ELSE 'FAIL'
    END AS result
FROM pg_settings 
WHERE name = 'row_security';
```

### 8.2。 CIS コントロールの概要表

| # |コントロール |設定 |リクエスト値 |
|---|--------|--------|------|
| 1 |パスワードの暗号化 | `password_encryption` | `scram-sha-256` |
| 2 | SSL 有効 | `ssl` | `on` |
| 3 |最小 TLS バージョン | `ssl_min_protocol_version` | `TLSv1.2` |
| 4 |接続のログ | `log_connections` | `on` |
| 5 |切断をログに記録する | `log_disconnections` | `on` |
| 6 |ログステートメント | `log_statement` | `ddl` または `mod` |
| 7 |リッスンアドレス | `listen_addresses` |特定の IP (いいえ `*`) |
| 8 |認証タイムアウト | `authentication_timeout` | `≤ 60s` |
| 9 |ステートメントのタイムアウト | `statement_timeout` | `> 0` |
| 10 |行セキュリティ | `row_security` | `on` |

## 9. OS レベルのセキュリティ

＃＃＃９．１．ファイルのアクセス許可

```bash
#!/bin/bash
# check-pg-permissions.sh
# Kiểm tra file permissions cho PostgreSQL

PGDATA="/var/lib/postgresql/16/main"
PGCONF="/etc/postgresql/16/main"

echo "=== Checking PGDATA permissions ==="
# PGDATA directory phải có mode 700
stat -c '%a %U:%G %n' $PGDATA
# Expected: 700 postgres:postgres

echo "=== Checking config file permissions ==="
stat -c '%a %U:%G %n' $PGCONF/postgresql.conf
# Expected: 600 postgres:postgres

stat -c '%a %U:%G %n' $PGCONF/pg_hba.conf
# Expected: 600 postgres:postgres

echo "=== Checking SSL key permissions ==="
stat -c '%a %U:%G %n' /etc/postgresql/ssl/server.key
# Expected: 600 postgres:postgres

echo "=== Checking log directory permissions ==="
stat -c '%a %U:%G %n' /var/log/postgresql
# Expected: 700 postgres:postgres

echo "=== Checking for world-readable data files ==="
find $PGDATA -perm /o+r -type f | head -20
# Expected: No output (no world-readable files)
```

＃＃＃９．２． systemd の強化

```ini
# /etc/systemd/system/postgresql.service.d/hardening.conf
[Service]
# Restrict filesystem access
ProtectHome = true
ProtectSystem = strict
ReadWritePaths = /var/lib/postgresql /var/log/postgresql /run/postgresql

# Restrict capabilities
CapabilityBoundingSet = CAP_NET_BIND_SERVICE
NoNewPrivileges = true

# Restrict network
RestrictAddressFamilies = AF_INET AF_INET6 AF_UNIX

# Memory protection
MemoryDenyWriteExecute = true

# Restrict system calls
SystemCallFilter = @system-service
SystemCallArchitectures = native
```

## 10. Quarkus アプリケーションの構成

### 10.1。 application.properties - 安全なデータベース接続

```properties
# src/main/resources/application.properties
# =====================================================
# PostgreSQL Security Configuration for Quarkus
# =====================================================

# --- Connection ---
quarkus.datasource.db-kind=postgresql
quarkus.datasource.jdbc.url=jdbc:postgresql://pgbouncer.hospital.local:6432/healthcare_db?currentSchema=patient_schema

# --- Credentials (from Vault or Environment) ---
quarkus.datasource.username=${DB_USERNAME}
quarkus.datasource.password=${DB_PASSWORD}

# --- SSL/TLS ---
quarkus.datasource.jdbc.additional-jdbc-properties.ssl=true
quarkus.datasource.jdbc.additional-jdbc-properties.sslmode=verify-full
quarkus.datasource.jdbc.additional-jdbc-properties.sslrootcert=/etc/app/certs/ca.crt
quarkus.datasource.jdbc.additional-jdbc-properties.sslcert=/etc/app/certs/client.crt
quarkus.datasource.jdbc.additional-jdbc-properties.sslkey=/etc/app/certs/client.key

# --- Connection Pool ---
quarkus.datasource.jdbc.min-size=5
quarkus.datasource.jdbc.max-size=20
quarkus.datasource.jdbc.idle-removal-interval=PT5M
quarkus.datasource.jdbc.max-lifetime=PT30M

# --- Validation ---
quarkus.datasource.jdbc.validation-query-sql=SELECT 1
quarkus.datasource.jdbc.background-validation-interval=PT2M
```

## 概要

このレッスンでは、医療システム向けに包括的な **PostgreSQL セキュリティ強化**を実装しました。

1. **pg_hba.conf** - 認証を構成します。 `scram-sha-256` そして `cert`、デフォルトですべての接続を拒否します
2. **SSL/TLS** - TLS 1.2+ および強力な暗号スイートを使用して CA、サーバー証明書、クライアント証明書を作成します
3. **ロール管理** - スキーマ分離による最小権限に従ってロール階層を設計します。
4. **postgresql.conf** - ロギング、タイムアウト、暗号化設定などのセキュリティ パラメータ
5. **PgBouncer** - SSL 双方向による接続プーリング (クライアント → PgBouncer → PostgreSQL)
6. **ネットワーク セキュリティ** - ファイアウォール ルールと Kubernetes ネットワーク ポリシー
7. **CIS ベンチマーク** - 自動化されたコンプライアンス チェック スクリプト
8. **OS レベル** - ファイル権限と systemd の強化

基本原則:

- **多層防御**: 多くの重なり合うセキュリティ層
- **最低特権**: 各役割には必要最小限の権限のみが与えられます。
- **すべてを暗号化**: すべての接続に SSL/TLS
- **すべてをログに記録**: セキュリティ関連のアクティビティをすべてログに記録します。
- **常に検証**: CIS ベンチマーク チェックを定期的に実行します。

## 演習

1. **pg_hba.conf のセットアップ**: Docker Compose を使用した開発環境用の pg_hba.conf ファイルを作成します。必ず使用してください。 `scram-sha-256` そして `hostssl` すべてのアプリケーション接続用。 SSL を使用せずに接続を試みてテストします。

2. **ロール階層の作成**: SQL スクリプトを記述して、5 つのマイクロサービスを含む HIS システムの完全なロール階層を作成します。クロススキーマアクセスを試行して確認します (拒否する必要があります)。

3. **SSL 証明書チェーン**: CA → サーバー証明書 → クライアント証明書チェーンを作成します。相互 TLS を使用するように PostgreSQL を構成します。等しいことを検証する `pg_stat_ssl`。

4. **CIS ベンチマーク監査**: 現在の PostgreSQL インストールで CIS 準拠チェック スクリプトを実行します。すべての不合格項目を修正し、すべてが合格するまで再実行します。

---

---

<!-- SERIES-NAV:START -->
| ◀ 前の記事 |次の記事 ▶ |
|:---|---:|
| [レッスン 8: MFA、パスキー、医療スタッフの緊急アクセス](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-8-mfa-passkeys-emergency-access-nhan-vien-y-te) | [レッスン 10: PostgreSQL を使用した保存中および転送中のデータの暗号化](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-10-ma-hoa-du-lieu-at-rest-in-transit-postgresql) |
<!-- SERIES-NAV:END -->
