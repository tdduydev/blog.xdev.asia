---
id: 019e1a40-a109-7001-d001-f0a1b2c30109
title: 第9課：PostgreSQL安全加固－綜合配置
slug: bai-9-postgresql-security-hardening
description: >-
  針對醫療資料強化 PostgreSQL：pg_hba.conf 驗證方法、SSL/TLS
  設定、連線限制、密碼原則、角色管理和最小權限、架構隔離、網路安全、postgresql.conf 安全參數以及 PostgreSQL 合規性的 CIS
  基準。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 9
section_title: 第 3 部分：建立資料層 — 用於醫療保健的 PostgreSQL
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: 建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 9 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 9 課：PostgreSQL 安全增強－結構</tspan>
      <tspan x="60" dy="42">綜合形象</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 3 部分：建立資料層 — 用於醫療保健的 PostgreSQL</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 1. PostgreSQL 醫療保健安全性概述

![醫療資料的 PostgreSQL 安全層 — TLS、pg_hba、RLS、pgcrypto](/storage/uploads/2026/04/healthcare-postgresql-security-layers.webp)

PostgreSQL 因其靈活性、開源和強大的安全功能而成為醫療保健系統的熱門選擇。然而，PostgreSQL 的預設配置對於 PHI（受保護的健康資訊）資料來說**不夠安全**。本課程將指導您根據 CIS 基準和醫療保健最佳實踐強化 PostgreSQL。

### 1.1。 PostgreSQL 安全層

![PostgreSQL 的 7 層安全性 — 從應用程式層到作業系統層](/storage/uploads/2026/04/healthcare-postgresql-security-layers.webp)

|層 |名稱 |成分|
|--------|-----|------------|
| 7 |應用 | Quarkus / Spring Boot + 連接池 |
| 6 |網路|防火牆規則+VPN/專用網路|
| 5 |認證| pg_hba.conf + SSL/TLS + 用戶端憑證 |
| 4 |授權|角色+權限+行級安全|
| 3 |加密 | TDE+列加密+備份加密|
| 2 |稽核| pgAudit + 自訂觸發器 + 日誌傳送 |
| 1 |作業系統 |檔案權限 + SELinux/AppArmor |

### 1.2。需要完成安全檢查表

|類別 |描述 |優先事項 |
|----------|--------|----------|
|認證| scram-sha-256，客戶端憑證 |關鍵|
| SSL/TLS |加密連線 |關鍵|
|角色管理 |最小權限角色 |關鍵|
|網路|監聽位址、防火牆|關鍵|
| postgresql.conf |安全參數|高|
|連線限制 |每個角色的限制 |高|
|架構隔離|單獨的模式 |中等|
|密碼政策 |旋轉，複雜性|中|
|記錄 |安全相關事件 |高|

## 2. pg_hba.conf - 驗證配置

文件 `pg_hba.conf` （基於主機的身份驗證）控制**誰連接**以及**通過什麼方法**。這是第一道防線。

### 2.1。 pg_hba.conf 結構

```
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# Giải thích:
# TYPE     = local (Unix socket), host (TCP/IP), hostssl (TCP/IP + SSL)
# DATABASE = tên database hoặc "all"
# USER     = tên role hoặc "all"
# ADDRESS  = CIDR range (cho host/hostssl)
# METHOD   = authentication method
```

### 2.2。身份驗證方法 - 比較

|方法|安全等級|描述 |用於 |
|--------|-------------|--------|---------|
| `trust` | **不安全** |無密碼 |僅限本地開發 |
| `password` |低|密碼發送明文 | **請勿使用** |
| `md5` |平均 | MD5哈希（容易破解） |遺留系統|
| `scram-sha-256` | **高** | SCRAM認證| **生產** |
| `cert` | **非常高** |客戶證書| **醫療保健** |
| `gss` |曹 | Kerberos/GSSAPI |企業廣告|

### 2.3。用於醫療保健生產的 pg_hba.conf

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

### 2.4。解釋重要規則

**規則 2 - `peer` 身份驗證**：使用作業系統使用者名稱映射。使用 Unix 套接字與使用者登入時 `postgres` 在作業系統上，PostgreSQL 會自動進行身份驗證。

```bash
# Chỉ hoạt động khi login với OS user postgres
sudo -u postgres psql
```

**規則 4 - `hostssl` + `scram-sha-256`**：

- `hostssl` = 需要 SSL/TLS
- `scram-sha-256` = PostgreSQL 支援的最強密碼哈希

**規則 5 - `cert` 驗證**：用戶端必須提供由受信任的 CA 簽署的 TLS 憑證。最強大的管理方法。

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

## 3.SSL/TLS 配置

### 3.1。建立 SSL 憑證

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

### 3.2。 postgresql.conf - SSL 設定

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

### 3.3。驗證 SSL 連接

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

## 4. 角色管理 - 最小權限

### 4.1。醫療保健最小特權原則

![醫療保健系統的 PostgreSQL 角色層次結構](/storage/uploads/2026/04/healthcare-postgresql-role-hierarchy.webp)

- **postgres**（超級使用者）← 僅用於維護
  - **dba_admin** (CREATEDB, CREATEROLE) — 模式管理、備份、監控
  - **app_roles**（登錄，有限權限）— app_ Patient_svc、app_lab_svc、app_pharmacy_svc、app_gateway_svc
  - **readonly_role**（僅限 SELECT）- readonly_analytics、readonly_reporting
  - **監控使用者** (pg_monitor)

### 4.2。建立角色層次結構

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

### 4.3。模式隔離

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

### 4.4。密碼政策和輪換

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

## 5. postgresql.conf - 安全參數

### 5.1。核心安全設定

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

### 5.2。檢查當前配置

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

## 6. 連線池安全 - PgBouncer

### 6.1。為什麼需要 PgBouncer

在微服務系統中，每個服務實例都會建立自己的連線池。 PgBouncer 幫助：

- 減少 PostgreSQL 的連線總數
- 新增身份驗證層
- 速率限制
- 連接路由

![PgBouncer 連線池 — 將 140 個連線減少到 50 個](/storage/uploads/2026/04/healthcare-pgbouncer-connection-pooling.webp)

### 6.2。 PgBouncer 配置

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

### 6.3。 PgBouncer 驗證文件

```bash
# /etc/pgbouncer/userlist.txt
# Format: "username" "password_hash"
# Generate hash: psql -c "SELECT concat('\"', usename, '\" \"', passwd, '\"') FROM pg_shadow"

"app_patient_svc" "SCRAM-SHA-256$4096:salt$StoredKey:ServerKey"
"app_lab_svc" "SCRAM-SHA-256$4096:salt$StoredKey:ServerKey"
"app_pharmacy_svc" "SCRAM-SHA-256$4096:salt$StoredKey:ServerKey"
"readonly_analytics" "SCRAM-SHA-256$4096:salt$StoredKey:ServerKey"
```

## 7. 網路安全

### 7.1。防火牆規則 (iptables)

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

### 7.2。 Kubernetes 網路策略

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

## 8. PostgreSQL 的 CIS 基準檢查表

### 8.1。自動合規性檢查腳本

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

### 8.2。 CIS 控制總表

| ＃|控制|設定|請求值 |
|---|--------|---------|-----------------|
| 1 |密碼加密 | `password_encryption` | `scram-sha-256` |
| 2 | SSL 已啟用 | `ssl` | `on` |
| 3 |最低 TLS 版本 | `ssl_min_protocol_version` | `TLSv1.2` |
| 4 |日誌連線 | `log_connections` | `on` |
| 5 |日誌斷開 | `log_disconnections` | `on` |
| 6 |日誌語句 | `log_statement` | `ddl` 或 `mod` |
| 7 |收聽地址 | `listen_addresses` |特定IP（無 `*`)|
| 8 |身份驗證逾時 | `authentication_timeout` | `≤ 60s` |
| 9 |語句超時 | `statement_timeout` | `> 0` |
| 10 | 10行安全| `row_security` | `on` |

## 9. 作業系統級安全性

### 9.1。文件權限

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

### 9.2。系統強化

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

## 10.Quarkus 應用程式配置

### 10.1。 application.properties - 安全資料庫連接

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

## 總結

在本課中，我們為醫療保健系統實施了全面的 **PostgreSQL 安全強化**：

1. **pg_hba.conf** - 設定身份驗證 `scram-sha-256` 和 `cert`,預設拒絕所有連接
2. **SSL/TLS** - 使用 TLS 1.2+ 和強大的密碼套件建立 CA、伺服器憑證、用戶端憑證
3. **角色管理** - 根據最小權限和模式隔離設計角色層次結構
4. **postgresql.conf** - 安全參數，包括日誌記錄、逾時和加密設定
5. **PgBouncer** - 雙向 SSL 連線池（客戶端 → PgBouncer → PostgreSQL）
6. **網路安全** - 防火牆規則和 Kubernetes 網路策略
7. **CIS Benchmark** - 自動合規性檢查腳本
8. **作業系統等級** - 檔案權限和 systemd 強化

核心原則：

- **深度防禦**：許多重疊的安全層
- **最小權限**：每個角色只擁有最低限度的必要權限
- **加密一切**：所有連接的 SSL/TLS
- **記錄一切**：記錄所有與安全相關的活動
- **始終驗證**：定期檢查 CIS 基準

## 練習

1. **設定pg_hba.conf**：使用Docker Compose為開發環境建立pg_hba.conf文件，確保使用 `scram-sha-256` 和 `hostssl` 對於所有應用程式連接。透過嘗試不使用 SSL 進行連線進行測試。

2. **建立角色層次結構**：編寫SQL腳本為具有5個微服務的HIS系統建立完整的角色層次結構。透過嘗試跨架構存取進行驗證（必須拒絕）。

3. **SSL憑證鏈**：建立CA→伺服器憑證→客戶端憑證鏈。將 PostgreSQL 設定為使用相互 TLS。驗證相等 `pg_stat_ssl`。

4. **CIS 基準審核**：在目前 PostgreSQL 安裝上執行 CIS 合規性檢查腳本。修復所有 FAIL 項並再次運行，直到所有 PASS。

---

---

<!-- SERIES-NAV:START -->
| ◀ 上一篇 |下一篇文章 ▶ |
|:---|---:|
| [第 8 課：MFA、萬能鑰匙和醫務人員的緊急通道](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-8-mfa-passkeys-emergency-access-nhan-vien-y-te) | [第 10 課：使用 PostgreSQL 加密靜態和傳輸中的數據](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-10-ma-hoa-du-lieu-at-rest-in-transit-postgresql) |
<!-- SERIES-NAV:END -->
