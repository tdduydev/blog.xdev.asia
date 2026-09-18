---
id: 019e1a40-a112-7001-d001-f0a1b2c30112
title: 'レッスン 12: pgAudit + Debezium を使用した監査ログと CDC'
slug: bai-12-audit-logging-cdc-pgaudit
description: >-
  PostgreSQL 医療用の監査ログの実装: pgAudit 拡張機能の構成、ステートメント レベルとオブジェクト
  レベルの監査、監査ログの形式とストレージ、イベント ソーシングのための Debezium を使用した変更データ キャプチャ
  (CDC)、不変の監査証跡の設計、ログ配布とアーカイブ、監査ログからのコンプライアンス レポート。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 12
section_title: 'パート 3: データ層の構築 — ヘルスケア向け PostgreSQL'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-5463" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-5463)"/>

  <!-- Decorations -->
  <g>
    <circle cx="784" cy="82" r="32" fill="#f472b6" opacity="0.07"/>
    <circle cx="968" cy="186" r="14" fill="#f472b6" opacity="0.09"/>
    <circle cx="652" cy="30" r="26" fill="#f472b6" opacity="0.11"/>
    <circle cx="836" cy="134" r="8" fill="#f472b6" opacity="0.13"/>
    <circle cx="1020" cy="238" r="20" fill="#f472b6" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <line x1="600" y1="82" x2="1100" y2="162" stroke="#f472b6" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="112" x2="1050" y2="182" stroke="#f472b6" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1064.0429399400243,213.5 1064.0429399400243,250.5 1032,269 999.9570600599758,250.5 999.9570600599758,213.5 1032,195" fill="none" stroke="#f472b6" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f472b6"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f472b6" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f472b6">🏗️ アーキテクチャ — レッスン 12</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 12: pgAudit + を使用した監査ログと CDC</tspan>
      <tspan x="60" dy="42">デベジウム</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 3: データ層の構築 — ヘルスケア向け PostgreSQL</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. 医療向け監査ログの概要

![監査ログ アーキテクチャ — pgAudit、Debezium CDC、Fluent Bit、ELK](/storage/uploads/2026/04/healthcare-audit-logging-stack.webp)

HIPAA セキュリティ ルール §164.312(b) では、ePHI を含むシステムにおける **アクティビティを記録および検査するためのハードウェア、ソフトウェア、および/または手順メカニズム**が必要です。監査ログはコンプライアンス要件であるだけでなく、**侵入、フォレンジック、アカウンタビリティ**を検出するためのツールでもあります。

＃＃＃１．１．医療の監査要件

|リクエスト |説明 |
|----------|----------|
| **誰?** |ユーザー ID (Keycloak サブジェクト) |
| **何?** |実行されたアクション (SELECT、INSERT、UPDATE) |
| **いつ?** |タイムスタンプ (タイムゾーン付き) |
| **どこ?** |ソース IP、アプリケーション、サービス |
| **どれ?** |アクセスされたオブジェクト (テーブル、列、行) |
| **どうやって?** |クエリテキスト、パラメータ |
| **結果は?** |成功/失敗、影響を受ける行 |

**医療に関する追加要件:**

- PHI アクセス追跡
- ガラス張りの監査
- データ変更の前後の値
- 不変の監査証跡 (改ざんなし)
- 6 年間の保持 (HIPAA 最低)

＃＃＃１．２．監査アーキテクチャ

![Audit Stack — Quarkus + pgAudit + Debezium CDC → FluentBit → OpenSearch/S3/PostgreSQL](/storage/uploads/2026/04/healthcare-audit-architecture.webp)

**監査情報源:**

- **Quarkus アプリ ログ** → JSON ログ
- **PostgreSQL pgAudit** → CSV/syslog
- **Debezium CDC** → Kafka イベント

**パイプライン:** すべて → **FluentBit** → 配信先:

- **OpenSearch/ELK** — クエリと視覚化
- **S3 アーカイブ** — 7 年間のアーカイブ
- **PostgreSQL 監査 DB** — 構造化クエリ

## 2. pgAudit - インストールと構成

＃＃＃２．１． pgAuditをインストールする

```bash
# === Ubuntu/Debian ===
sudo apt-get install postgresql-16-pgaudit

# === RHEL/CentOS ===
sudo dnf install pgaudit_16

# === Docker ===
# Dockerfile
FROM postgres:16-bookworm
RUN apt-get update && apt-get install -y postgresql-16-pgaudit && rm -rf /var/lib/apt/lists/*
```

＃＃＃２．２． postgresql.confの構成

```ini
# /etc/postgresql/16/main/postgresql.conf
# =====================================================
# pgAudit Configuration for Healthcare
# =====================================================

# Load pgAudit extension
shared_preload_libraries = 'pgaudit'

# === Statement-Level Audit ===
# Log tất cả categories sau:
pgaudit.log = 'write, ddl, role'
# Categories:
#   read     = SELECT, COPY FROM
#   write    = INSERT, UPDATE, DELETE, TRUNCATE, COPY TO
#   function = Function calls, DO blocks
#   role     = GRANT, REVOKE, CREATE/ALTER/DROP ROLE
#   ddl      = CREATE, ALTER, DROP (tables, schemas, etc.)
#   misc     = DISCARD, FETCH, CHECKPOINT, etc.
#   all      = Tất cả

# === Object-Level Audit (chi tiết hơn) ===
# Audit tất cả operations trên objects thuộc auditor role
pgaudit.role = 'pg_auditor'

# === Log Format ===
pgaudit.log_catalog = off          # Không log system catalog queries
pgaudit.log_client = off           # Không show audit messages cho client
pgaudit.log_level = 'log'          # Log level: debug5..log
pgaudit.log_parameter = on         # Log query parameters
pgaudit.log_parameter_max_size = 0  # 0 = unlimited
pgaudit.log_relation = on          # Log mỗi relation (table) riêng
pgaudit.log_rows = on              # Log số rows affected
pgaudit.log_statement = on         # Log statement text
pgaudit.log_statement_once = off   # Log statement ở mỗi sub-statement

# === PostgreSQL Logging (support pgAudit) ===
log_line_prefix = '%m [%p] user=%u,db=%d,app=%a,client=%h '
log_destination = 'csvlog'
logging_collector = on
log_directory = '/var/log/postgresql'
log_filename = 'postgresql-audit-%Y-%m-%d.csv'
log_rotation_age = '1d'
log_rotation_size = 0
```

＃＃＃２．３． pgAudit 拡張機能を有効にする

```sql
-- Kết nối vào healthcare database
\c healthcare_db

-- Tạo extension
CREATE EXTENSION IF NOT EXISTS pgaudit;

-- Verify
SELECT extname, extversion
FROM pg_extension
WHERE extname = 'pgaudit';
```

## 3. ステートメントレベルの監査とオブジェクトレベルの監査

＃＃＃３．１．ステートメントレベルの監査

カテゴリ別のステートメント レベルの監査ログ **すべてのステートメント**。これが最も簡単な方法です。

```sql
-- Ví dụ: với pgaudit.log = 'write, ddl, role'

-- Statement này SẼ được log (write)
INSERT INTO patient_schema.patients (full_name_encrypted, ...) VALUES (...);

-- Statement này SẼ được log (ddl)
ALTER TABLE patient_schema.patients ADD COLUMN blood_type VARCHAR(5);

-- Statement này KHÔNG được log (read, không nằm trong config)
SELECT * FROM patient_schema.patients;
```

監査ログ出力（CSV形式）：

```
2025-01-15 10:30:45.123 ICT [12345] user=app_patient_svc,db=healthcare_db,app=patient-service,client=10.0.1.10
AUDIT: SESSION,1,1,WRITE,INSERT,,patient_schema.patients,
"INSERT INTO patient_schema.patients (...) VALUES ($1, $2, $3)",<parameters>,1
```

＃＃＃３．２．オブジェクトレベルの監査

オブジェクト レベルの監査により、**より詳細な** 制御が可能になり、すべてではなく特定のテーブル/列を監査できます。

```sql
-- =====================================================
-- OBJECT-LEVEL AUDIT SETUP
-- =====================================================

-- Step 1: Tạo auditor role
CREATE ROLE pg_auditor NOLOGIN;

-- Step 2: GRANT access cho auditor role trên tables cần audit
-- (pgAudit sẽ log mọi operation trên objects mà pg_auditor có access)

-- Audit TẤT CẢ operations trên patients table
GRANT ALL ON patient_schema.patients TO pg_auditor;

-- Audit TẤT CẢ operations trên medical records
GRANT ALL ON patient_schema.medical_records TO pg_auditor;

-- Audit CHỈ SELECT trên staff table
GRANT SELECT ON patient_schema.staff TO pg_auditor;

-- Audit INSERT trên emergency_access_log
GRANT INSERT ON patient_schema.emergency_access_log TO pg_auditor;

-- Step 3: Verify configuration
SELECT
    relname AS table_name,
    has_table_privilege('pg_auditor', oid, 'SELECT') AS audit_select,
    has_table_privilege('pg_auditor', oid, 'INSERT') AS audit_insert,
    has_table_privilege('pg_auditor', oid, 'UPDATE') AS audit_update,
    has_table_privilege('pg_auditor', oid, 'DELETE') AS audit_delete
FROM pg_class
WHERE relnamespace = 'patient_schema'::regnamespace
  AND relkind = 'r'
ORDER BY relname;
```

＃＃＃３．３．ステートメントとオブジェクトレベルの比較

|特長 |ステートメントレベル |オブジェクトレベル |
|----------|----------------|---------------|
|粒度 |カテゴリ (読み取り/書き込み/DDL) |テーブルごと、操作ごと |
|構成 | `pgaudit.log` パラメータ | `pgaudit.role` + 許可 |
|オーバーヘッド |低～中 |中～高 |
|使用例 |一般的なコンプライアンス | PHI テーブルの監視 |
|典型的な |ヘルスケア DDL + 役割の変更 |患者 + 医療記録 |

**推奨**: DDL/ロールの場合はステートメント レベル、PHI テーブルの場合はオブジェクト レベルの両方を組み合わせます。

## 4. カスタム監査トリガー関数

pgAudit は **SQL ステートメント**をログに記録しますが、次のものはキャプチャしません。

- **変更前/変更後の値** (古いデータと新しいデータ)
- **アプリケーションレベルのコンテキスト** (JWT ユーザー、IP)
- **ビジネスレベルのイベント** (誰がどの患者記録を閲覧したか)

追加するカスタム トリガーが必要です。

＃＃＃４．１．不変の監査テーブルの設計

```sql
-- =====================================================
-- IMMUTABLE AUDIT TABLE
-- Append-only, không UPDATE/DELETE
-- =====================================================

CREATE SCHEMA IF NOT EXISTS audit_schema;

-- Main audit table (partitioned by month)
CREATE TABLE audit_schema.data_change_log (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    -- WHEN
    event_timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    -- WHO
    db_user TEXT DEFAULT current_user,
    app_user_id TEXT DEFAULT current_setting('app.current_user_id', true),
    app_user_role TEXT DEFAULT current_setting('app.current_role', true),

    -- WHERE
    client_ip INET DEFAULT inet_client_addr(),
    client_port INT DEFAULT inet_client_port(),
    application_name TEXT DEFAULT current_setting('application_name', true),

    -- WHAT
    schema_name TEXT NOT NULL,
    table_name TEXT NOT NULL,
    operation TEXT NOT NULL,  -- INSERT, UPDATE, DELETE

    -- WHICH
    row_id TEXT,  -- Primary key of affected row

    -- DATA (before/after)
    old_data JSONB,
    new_data JSONB,
    changed_columns TEXT[],

    -- CONTEXT
    query_text TEXT,
    transaction_id BIGINT DEFAULT txid_current()
) PARTITION BY RANGE (event_timestamp);

-- Tạo partitions cho 2025
CREATE TABLE audit_schema.dcl_2025_01 PARTITION OF audit_schema.data_change_log
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
CREATE TABLE audit_schema.dcl_2025_02 PARTITION OF audit_schema.data_change_log
    FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');
CREATE TABLE audit_schema.dcl_2025_03 PARTITION OF audit_schema.data_change_log
    FOR VALUES FROM ('2025-03-01') TO ('2025-04-01');
CREATE TABLE audit_schema.dcl_2025_04 PARTITION OF audit_schema.data_change_log
    FOR VALUES FROM ('2025-04-01') TO ('2025-05-01');
CREATE TABLE audit_schema.dcl_2025_05 PARTITION OF audit_schema.data_change_log
    FOR VALUES FROM ('2025-05-01') TO ('2025-06-01');
CREATE TABLE audit_schema.dcl_2025_06 PARTITION OF audit_schema.data_change_log
    FOR VALUES FROM ('2025-06-01') TO ('2025-07-01');
-- ... tiếp tục cho các tháng còn lại

-- === SECURITY: Make table append-only ===
REVOKE UPDATE, DELETE ON audit_schema.data_change_log FROM PUBLIC;
GRANT INSERT ON audit_schema.data_change_log TO healthcare_app;
GRANT USAGE ON SCHEMA audit_schema TO healthcare_app;

-- Indexes
CREATE INDEX idx_audit_timestamp ON audit_schema.data_change_log(event_timestamp);
CREATE INDEX idx_audit_user ON audit_schema.data_change_log(app_user_id);
CREATE INDEX idx_audit_table ON audit_schema.data_change_log(schema_name, table_name);
CREATE INDEX idx_audit_row ON audit_schema.data_change_log(row_id);
CREATE INDEX idx_audit_operation ON audit_schema.data_change_log(operation);
```

改ざん防止保護:

```sql
-- Rule chặn UPDATE
CREATE RULE prevent_audit_update AS ON UPDATE TO audit_schema.data_change_log
    DO INSTEAD NOTHING;

-- Rule chặn DELETE
CREATE RULE prevent_audit_delete AS ON DELETE TO audit_schema.data_change_log
    DO INSTEAD NOTHING;

-- Event trigger chặn DROP audit tables
CREATE OR REPLACE FUNCTION audit_schema.prevent_audit_drop()
RETURNS event_trigger AS $$
DECLARE
    obj RECORD;
BEGIN
    FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
    LOOP
        IF obj.schema_name = 'audit_schema' THEN
            RAISE EXCEPTION 'Cannot drop or truncate audit tables. Contact security team.';
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

CREATE EVENT TRIGGER prevent_audit_table_drop ON sql_drop
    WHEN TAG IN ('DROP TABLE')
    EXECUTE FUNCTION audit_schema.prevent_audit_drop();
```

＃＃＃４．２．汎用監査トリガー機能

```sql
-- =====================================================
-- GENERIC AUDIT TRIGGER FUNCTION
-- Tự động log before/after values cho mọi table
-- =====================================================

CREATE OR REPLACE FUNCTION audit_schema.audit_trigger_func()
RETURNS TRIGGER AS $$
DECLARE
    v_old_data JSONB;
    v_new_data JSONB;
    v_changed_cols TEXT[];
    v_row_id TEXT;
    v_key_col TEXT;
BEGIN
    -- Xác định primary key column name
    SELECT a.attname INTO v_key_col
    FROM pg_index i
    JOIN pg_attribute a ON a.attrelid = i.indrelid
        AND a.attnum = ANY(i.indkey)
    WHERE i.indrelid = TG_RELID AND i.indisprimary
    LIMIT 1;

    IF (TG_OP = 'DELETE') THEN
        v_old_data = to_jsonb(OLD);
        v_row_id = v_old_data ->> v_key_col;

        INSERT INTO audit_schema.data_change_log (
            schema_name, table_name, operation, row_id,
            old_data, new_data, changed_columns
        ) VALUES (
            TG_TABLE_SCHEMA, TG_TABLE_NAME, TG_OP, v_row_id,
            v_old_data, NULL, NULL
        );
        RETURN OLD;

    ELSIF (TG_OP = 'UPDATE') THEN
        v_old_data = to_jsonb(OLD);
        v_new_data = to_jsonb(NEW);
        v_row_id = v_new_data ->> v_key_col;

        -- Tìm columns đã thay đổi
        SELECT array_agg(key) INTO v_changed_cols
        FROM jsonb_each(v_new_data) n
        FULL OUTER JOIN jsonb_each(v_old_data) o USING (key)
        WHERE n.value IS DISTINCT FROM o.value;

        -- Chỉ log nếu có thay đổi thực sự
        IF v_changed_cols IS NOT NULL AND array_length(v_changed_cols, 1) > 0 THEN
            INSERT INTO audit_schema.data_change_log (
                schema_name, table_name, operation, row_id,
                old_data, new_data, changed_columns
            ) VALUES (
                TG_TABLE_SCHEMA, TG_TABLE_NAME, TG_OP, v_row_id,
                v_old_data, v_new_data, v_changed_cols
            );
        END IF;
        RETURN NEW;

    ELSIF (TG_OP = 'INSERT') THEN
        v_new_data = to_jsonb(NEW);
        v_row_id = v_new_data ->> v_key_col;

        INSERT INTO audit_schema.data_change_log (
            schema_name, table_name, operation, row_id,
            old_data, new_data, changed_columns
        ) VALUES (
            TG_TABLE_SCHEMA, TG_TABLE_NAME, TG_OP, v_row_id,
            NULL, v_new_data, NULL
        );
        RETURN NEW;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

＃＃＃４．３．監査トリガーの接続

```sql
-- =====================================================
-- ATTACH AUDIT TRIGGERS TO PHI TABLES
-- =====================================================

-- Patients table
CREATE TRIGGER audit_patients
    AFTER INSERT OR UPDATE OR DELETE ON patient_schema.patients
    FOR EACH ROW EXECUTE FUNCTION audit_schema.audit_trigger_func();

-- Medical records
CREATE TRIGGER audit_medical_records
    AFTER INSERT OR UPDATE OR DELETE ON patient_schema.medical_records
    FOR EACH ROW EXECUTE FUNCTION audit_schema.audit_trigger_func();

-- Doctor-patient relationships
CREATE TRIGGER audit_doctor_patient
    AFTER INSERT OR UPDATE OR DELETE ON patient_schema.doctor_patient
    FOR EACH ROW EXECUTE FUNCTION audit_schema.audit_trigger_func();

-- Staff changes
CREATE TRIGGER audit_staff
    AFTER INSERT OR UPDATE OR DELETE ON patient_schema.staff
    FOR EACH ROW EXECUTE FUNCTION audit_schema.audit_trigger_func();

-- Emergency access log (audit the audit!)
CREATE TRIGGER audit_emergency_access
    AFTER INSERT ON patient_schema.emergency_access_log
    FOR EACH ROW EXECUTE FUNCTION audit_schema.audit_trigger_func();

-- Verify all triggers
SELECT
    tgname AS trigger_name,
    tgrelid::regclass AS table_name,
    CASE tgenabled
        WHEN 'O' THEN 'ENABLED'
        WHEN 'D' THEN 'DISABLED'
    END AS status
FROM pg_trigger
WHERE tgfoid = 'audit_schema.audit_trigger_func'::regproc
ORDER BY tgrelid::regclass::text;
```

＃＃＃４．４． PHI アクセス監査 (SELECT 追跡)

```sql
-- =====================================================
-- PHI ACCESS TRACKING
-- =====================================================

CREATE TABLE audit_schema.phi_access_log (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    access_timestamp TIMESTAMPTZ DEFAULT NOW(),
    user_id TEXT DEFAULT current_setting('app.current_user_id', true),
    user_role TEXT DEFAULT current_setting('app.current_role', true),
    client_ip INET DEFAULT inet_client_addr(),
    patient_id UUID,
    accessed_fields TEXT[],
    access_purpose TEXT,    -- 'treatment', 'payment', 'operations', 'emergency'
    record_count INT DEFAULT 1
);

-- Immutable
REVOKE UPDATE, DELETE ON audit_schema.phi_access_log FROM PUBLIC;
GRANT INSERT ON audit_schema.phi_access_log TO healthcare_app;

-- Indexes
CREATE INDEX idx_phi_access_ts ON audit_schema.phi_access_log(access_timestamp);
CREATE INDEX idx_phi_access_user ON audit_schema.phi_access_log(user_id);
CREATE INDEX idx_phi_access_patient ON audit_schema.phi_access_log(patient_id);

-- Helper function
CREATE OR REPLACE FUNCTION audit_schema.log_phi_access(
    p_patient_id UUID,
    p_fields TEXT[],
    p_purpose TEXT DEFAULT 'treatment',
    p_count INT DEFAULT 1
) RETURNS VOID AS $$
BEGIN
    INSERT INTO audit_schema.phi_access_log (
        patient_id, accessed_fields, access_purpose, record_count
    ) VALUES (
        p_patient_id, p_fields, p_purpose, p_count
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## 5. Debezium を使用した変更データ キャプチャ (CDC)

＃＃＃５．１． CDC アーキテクチャ

![CDC Pipeline — PostgreSQL WAL → Debezium → Kafka → OpenSearch/S3/KSQL](/storage/uploads/2026/04/healthcare-cdc-pipeline.webp)

**CDC フロー:**

1. **PostgreSQL WAL** — 先行書き込みログ (論理レプリケーション)
2. **論理デコーディング** → **Debezium コネクタ** (Kafka 接続ソース)
3. **JSON 変更イベント** → **Apache Kafka** トピック:
   - `healthcare.patient_schema.patients`
   - `healthcare.patient_schema.records`
   - `healthcare.audit_schema.changes`
4. **消費者:**
   - **OpenSearch Sink Connect** — 全文検索
   - **監査 S3 アーカイブ** — 長期保存
   - **アラート エンジン (KSQL)** — リアルタイムの異常検出

＃＃＃５．２． CDC 用の PostgreSQL 構成

```ini
# postgresql.conf
wal_level = logical                    # Required cho logical decoding
max_replication_slots = 4              # Ít nhất 1 per connector
max_wal_senders = 4                    # Ít nhất 1 per connector
```

```sql
-- Tạo replication user cho Debezium
CREATE ROLE debezium_user LOGIN
    REPLICATION
    PASSWORD 'CHANGE_ME_USE_VAULT'
    CONNECTION LIMIT 3;

-- Grant select
GRANT USAGE ON SCHEMA patient_schema TO debezium_user;
GRANT SELECT ON ALL TABLES IN SCHEMA patient_schema TO debezium_user;
GRANT USAGE ON SCHEMA audit_schema TO debezium_user;
GRANT SELECT ON ALL TABLES IN SCHEMA audit_schema TO debezium_user;

-- Tạo publication
CREATE PUBLICATION healthcare_cdc FOR TABLE
    patient_schema.patients,
    patient_schema.medical_records,
    patient_schema.doctor_patient,
    patient_schema.emergency_access_log;

-- Verify
SELECT * FROM pg_publication_tables WHERE pubname = 'healthcare_cdc';
```

＃＃＃５．３． Debezium コネクタの構成

```json
{
    "name": "healthcare-postgres-connector",
    "config": {
        "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
        "database.hostname": "db.hospital.local",
        "database.port": "5432",
        "database.user": "debezium_user",
        "database.password": "${vault:secret/debezium:password}",
        "database.dbname": "healthcare_db",
        "topic.prefix": "healthcare",
        "plugin.name": "pgoutput",
        "publication.name": "healthcare_cdc",
        "schema.include.list": "patient_schema,audit_schema",
        "table.include.list": "patient_schema.patients,patient_schema.medical_records,patient_schema.doctor_patient",
        "slot.name": "healthcare_debezium_slot",
        "slot.drop.on.stop": false,
        "key.converter": "org.apache.kafka.connect.json.JsonConverter",
        "key.converter.schemas.enable": false,
        "value.converter": "org.apache.kafka.connect.json.JsonConverter",
        "value.converter.schemas.enable": false,
        "tombstones.on.delete": false,
        "provide.transaction.metadata": true,
        "database.sslmode": "verify-full",
        "database.sslrootcert": "/etc/debezium/certs/ca.crt",
        "heartbeat.interval.ms": 60000,
        "snapshot.mode": "initial"
    }
}
```

＃＃＃５．４． Debezium のデプロイと検証

```bash
# Register connector
curl -X POST http://kafka-connect:8083/connectors \
    -H "Content-Type: application/json" \
    -d @healthcare-postgres-connector.json

# Check status
curl http://kafka-connect:8083/connectors/healthcare-postgres-connector/status | jq .

# List topics
kafka-topics --bootstrap-server kafka:9092 --list | grep healthcare
# healthcare.patient_schema.patients
# healthcare.patient_schema.medical_records
# healthcare.patient_schema.doctor_patient

# Consume events
kafka-console-consumer --bootstrap-server kafka:9092 \
    --topic healthcare.patient_schema.patients \
    --from-beginning | jq .
```

＃＃＃５．５。 Debezium変更イベント形式

```json
{
    "before": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "patient_code": "BN-2025-00001",
        "status": "active"
    },
    "after": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "patient_code": "BN-2025-00001",
        "status": "discharged"
    },
    "source": {
        "version": "2.5.0.Final",
        "connector": "postgresql",
        "name": "healthcare",
        "ts_ms": 1705312245123,
        "db": "healthcare_db",
        "schema": "patient_schema",
        "table": "patients",
        "txId": 987654,
        "lsn": 123456789
    },
    "op": "u",
    "ts_ms": 1705312245456
}
```

＃＃＃５．６． CDC スタック用の Docker Compose

```yaml
# docker-compose-cdc.yml
version: '3.8'

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
    networks:
      - healthcare-net

  kafka:
    image: confluentinc/cp-kafka:7.5.0
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_LOG_RETENTION_HOURS: 168
    ports:
      - "9092:9092"
    networks:
      - healthcare-net

  kafka-connect:
    image: debezium/connect:2.5
    depends_on:
      - kafka
    environment:
      BOOTSTRAP_SERVERS: kafka:9092
      GROUP_ID: healthcare-connect
      CONFIG_STORAGE_TOPIC: healthcare_connect_configs
      OFFSET_STORAGE_TOPIC: healthcare_connect_offsets
      STATUS_STORAGE_TOPIC: healthcare_connect_statuses
    ports:
      - "8083:8083"
    volumes:
      - ./certs:/etc/debezium/certs:ro
    networks:
      - healthcare-net

networks:
  healthcare-net:
    driver: bridge
```

## 6. Quarkus アプリケーションレベルの監査ログ

＃＃＃６．１．監査インターセプタ

```java
@Interceptor
@AuditLog
@Priority(Interceptor.Priority.APPLICATION)
public class AuditLogInterceptor {

    @Inject
    JsonWebToken jwt;

    @Inject
    SecurityIdentity identity;

    @Inject
    HttpServerRequest request;

    @Inject
    AuditLogService auditLogService;

    @AroundInvoke
    Object auditLog(InvocationContext ctx) throws Exception {
        AuditEntry entry = AuditEntry.builder()
            .timestamp(Instant.now())
            .userId(jwt.getSubject())
            .userName(jwt.getClaim("preferred_username"))
            .userRole(extractPrimaryRole())
            .hospitalId(jwt.getClaim("hospital_id"))
            .clientIp(request.remoteAddress().host())
            .userAgent(request.getHeader("User-Agent"))
            .method(ctx.getMethod().getName())
            .resource(extractResourcePath(ctx))
            .action(extractAction(ctx))
            .build();

        try {
            Object result = ctx.proceed();
            entry.setResult("SUCCESS");
            entry.setResponseSummary(summarizeResponse(result));
            return result;
        } catch (Exception e) {
            entry.setResult("FAILURE");
            entry.setErrorMessage(e.getMessage());
            throw e;
        } finally {
            auditLogService.logAsync(entry);
        }
    }

    private String extractPrimaryRole() {
        Set<String> roles = identity.getRoles();
        if (roles.contains("doctor")) return "doctor";
        if (roles.contains("nurse")) return "nurse";
        if (roles.contains("admin")) return "admin";
        if (roles.contains("patient")) return "patient";
        return "unknown";
    }

    private String extractAction(InvocationContext ctx) {
        if (ctx.getMethod().isAnnotationPresent(jakarta.ws.rs.GET.class)) return "READ";
        if (ctx.getMethod().isAnnotationPresent(jakarta.ws.rs.POST.class)) return "CREATE";
        if (ctx.getMethod().isAnnotationPresent(jakarta.ws.rs.PUT.class)) return "UPDATE";
        if (ctx.getMethod().isAnnotationPresent(jakarta.ws.rs.DELETE.class)) return "DELETE";
        return "UNKNOWN";
    }

    private String extractResourcePath(InvocationContext ctx) {
        jakarta.ws.rs.Path classPath = ctx.getTarget().getClass()
            .getAnnotation(jakarta.ws.rs.Path.class);
        jakarta.ws.rs.Path methodPath = ctx.getMethod()
            .getAnnotation(jakarta.ws.rs.Path.class);
        String base = classPath != null ? classPath.value() : "";
        String method = methodPath != null ? methodPath.value() : "";
        return base + method;
    }

    private String summarizeResponse(Object result) {
        if (result == null) return "null";
        if (result instanceof java.util.Collection<?> c) {
            return "Collection[size=" + c.size() + "]";
        }
        return result.getClass().getSimpleName();
    }
}

// Custom annotation
@InterceptorBinding
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface AuditLog {}
```

＃＃＃６．２．監査ログサービス

```java
@ApplicationScoped
public class AuditLogService {

    @Inject
    @Channel("audit-log-out")
    Emitter<AuditEntry> kafkaEmitter;

    @Inject
    AgroalDataSource dataSource;

    private static final Logger LOG = Logger.getLogger(AuditLogService.class);

    public void logAsync(AuditEntry entry) {
        // 1. Kafka (real-time processing)
        try {
            kafkaEmitter.send(entry);
        } catch (Exception e) {
            LOG.warnf("Failed to send audit to Kafka: %s", e.getMessage());
        }

        // 2. PostgreSQL (compliance queries)
        persistToDatabase(entry);

        // 3. Structured log (Fluent Bit / ELK)
        LOG.infof("AUDIT: user=%s role=%s action=%s resource=%s result=%s",
            entry.getUserId(), entry.getUserRole(),
            entry.getAction(), entry.getResource(), entry.getResult());
    }

    private void persistToDatabase(AuditEntry entry) {
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(
                 "INSERT INTO audit_schema.application_audit_log " +
                 "(event_timestamp, user_id, user_name, user_role, hospital_id, " +
                 " client_ip, user_agent, http_method, resource_path, action, " +
                 " result, response_summary, error_message) " +
                 "VALUES (?, ?, ?, ?, ?, ?::inet, ?, ?, ?, ?, ?, ?, ?)")) {

            ps.setTimestamp(1, Timestamp.from(entry.getTimestamp()));
            ps.setString(2, entry.getUserId());
            ps.setString(3, entry.getUserName());
            ps.setString(4, entry.getUserRole());
            ps.setString(5, entry.getHospitalId());
            ps.setString(6, entry.getClientIp());
            ps.setString(7, entry.getUserAgent());
            ps.setString(8, entry.getMethod());
            ps.setString(9, entry.getResource());
            ps.setString(10, entry.getAction());
            ps.setString(11, entry.getResult());
            ps.setString(12, entry.getResponseSummary());
            ps.setString(13, entry.getErrorMessage());
            ps.executeUpdate();
        } catch (SQLException e) {
            // NEVER fail the main request
            LOG.errorf("Failed to persist audit log: %s", e.getMessage());
        }
    }
}
```

＃＃＃６．３．アプリケーション監査テーブル

```sql
CREATE TABLE audit_schema.application_audit_log (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    event_timestamp TIMESTAMPTZ NOT NULL,
    user_id TEXT,
    user_name TEXT,
    user_role TEXT,
    hospital_id TEXT,
    client_ip INET,
    user_agent TEXT,
    http_method TEXT,
    resource_path TEXT,
    action TEXT,
    result TEXT,
    response_summary TEXT,
    error_message TEXT
);

REVOKE UPDATE, DELETE ON audit_schema.application_audit_log FROM PUBLIC;
GRANT INSERT ON audit_schema.application_audit_log TO healthcare_app;

CREATE INDEX idx_app_audit_ts ON audit_schema.application_audit_log(event_timestamp);
CREATE INDEX idx_app_audit_user ON audit_schema.application_audit_log(user_id);
CREATE INDEX idx_app_audit_action ON audit_schema.application_audit_log(action, result);
CREATE INDEX idx_app_audit_resource ON audit_schema.application_audit_log(resource_path);
```

## 7. 監査ログのストレージと保持

＃＃＃７．１． pg_partman による自動パーティショニング

```sql
CREATE EXTENSION IF NOT EXISTS pg_partman;

SELECT partman.create_parent(
    p_parent_table := 'audit_schema.data_change_log',
    p_control := 'event_timestamp',
    p_type := 'native',
    p_interval := 'monthly',
    p_premake := 3
);

-- Retention: 84 months (7 years) cho HIPAA
UPDATE partman.part_config
SET retention = '84 months',
    retention_keep_table = false,
    retention_keep_index = false
WHERE parent_table = 'audit_schema.data_change_log';
```

＃＃＃７．２． S3 へのログ配布

```bash
#!/bin/bash
# ship-audit-logs.sh

LOG_DIR="/var/log/postgresql"
S3_BUCKET="s3://hospital-audit-logs/postgresql"
YESTERDAY=$(date -v-1d +%Y-%m-%d)

AUDIT_FILE="${LOG_DIR}/postgresql-audit-${YESTERDAY}.csv"

if [ -f "${AUDIT_FILE}" ]; then
    # Compress + Encrypt + Upload
    gzip -c "${AUDIT_FILE}" | \
    gpg --encrypt --recipient audit-archive@hospital.local | \
    aws s3 cp - "${S3_BUCKET}/${YESTERDAY}/pgaudit.csv.gz.gpg" \
        --sse aws:kms \
        --sse-kms-key-id alias/audit-archive-key \
        --storage-class GLACIER_IR

    echo "$(date): Shipped pgaudit logs for ${YESTERDAY}"
fi

# Export audit DB tables
psql -h localhost -U dba_admin -d healthcare_db -c "
    COPY (
        SELECT * FROM audit_schema.data_change_log
        WHERE event_timestamp >= '${YESTERDAY}'::DATE
          AND event_timestamp < '${YESTERDAY}'::DATE + INTERVAL '1 day'
    ) TO STDOUT WITH (FORMAT CSV, HEADER true)
" | gzip | \
gpg --encrypt --recipient audit-archive@hospital.local | \
aws s3 cp - "${S3_BUCKET}/${YESTERDAY}/data-change-log.csv.gz.gpg" \
    --sse aws:kms \
    --sse-kms-key-id alias/audit-archive-key
```

## 8. 監査ログからのコンプライアンスレポート

### 8.1。 HIPAA 準拠に関する問い合わせ

```sql
-- === Report 1: PHI Access Summary (Monthly) ===
SELECT
    DATE_TRUNC('day', access_timestamp) AS access_date,
    user_role,
    COUNT(*) AS total_accesses,
    COUNT(DISTINCT user_id) AS unique_users,
    COUNT(DISTINCT patient_id) AS unique_patients
FROM audit_schema.phi_access_log
WHERE access_timestamp >= DATE_TRUNC('month', CURRENT_DATE)
GROUP BY DATE_TRUNC('day', access_timestamp), user_role
ORDER BY access_date, user_role;

-- === Report 2: Unusual Access Patterns ===
SELECT
    user_id,
    user_role,
    COUNT(*) AS access_count,
    COUNT(DISTINCT patient_id) AS patients_accessed,
    MIN(access_timestamp) AS first_access,
    MAX(access_timestamp) AS last_access
FROM audit_schema.phi_access_log
WHERE access_timestamp >= NOW() - INTERVAL '24 hours'
GROUP BY user_id, user_role
HAVING COUNT(DISTINCT patient_id) > 50
ORDER BY patients_accessed DESC;

-- === Report 3: After-Hours Access ===
SELECT
    user_id,
    user_role,
    access_timestamp,
    patient_id,
    accessed_fields,
    access_purpose
FROM audit_schema.phi_access_log
WHERE access_timestamp >= NOW() - INTERVAL '7 days'
  AND (
    EXTRACT(HOUR FROM access_timestamp) < 6
    OR EXTRACT(HOUR FROM access_timestamp) > 22
  )
ORDER BY access_timestamp DESC;

-- === Report 4: Emergency Access Review ===
SELECT
    ea.staff_id,
    s.full_name AS staff_name,
    s.role AS staff_role,
    ea.patient_id,
    ea.reason,
    ea.access_time,
    ea.expires_at,
    ea.approved_by,
    CASE
        WHEN ea.approved_by IS NULL THEN 'PENDING REVIEW'
        ELSE 'APPROVED'
    END AS approval_status
FROM patient_schema.emergency_access_log ea
JOIN patient_schema.staff s ON s.id = ea.staff_id
WHERE ea.access_time >= DATE_TRUNC('month', CURRENT_DATE)
ORDER BY ea.access_time DESC;

-- === Report 5: Data Modification Summary ===
SELECT
    table_name,
    operation,
    app_user_role,
    COUNT(*) AS change_count,
    COUNT(DISTINCT app_user_id) AS unique_users,
    MIN(event_timestamp) AS first_change,
    MAX(event_timestamp) AS last_change
FROM audit_schema.data_change_log
WHERE event_timestamp >= DATE_TRUNC('month', CURRENT_DATE)
GROUP BY table_name, operation, app_user_role
ORDER BY table_name, operation;

-- === Report 6: Failed Operations ===
SELECT
    event_timestamp,
    user_id,
    user_role,
    resource_path,
    action,
    error_message,
    client_ip
FROM audit_schema.application_audit_log
WHERE result = 'FAILURE'
  AND event_timestamp >= NOW() - INTERVAL '7 days'
ORDER BY event_timestamp DESC;
```

### 8.2。自動化されたコンプライアンス監視

```java
@ApplicationScoped
public class ComplianceMonitorService {

    @Inject
    AgroalDataSource dataSource;

    @Inject
    AlertService alertService;

    private static final Logger LOG = Logger.getLogger(ComplianceMonitorService.class);

    @Scheduled(every = "1h")
    public void hourlyAnomalyCheck() {
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(
                 "SELECT user_id, user_role, COUNT(DISTINCT patient_id) AS cnt " +
                 "FROM audit_schema.phi_access_log " +
                 "WHERE access_timestamp >= NOW() - INTERVAL '1 hour' " +
                 "GROUP BY user_id, user_role " +
                 "HAVING COUNT(DISTINCT patient_id) > 50")) {

            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                alertService.sendSecurityAlert(
                    "UNUSUAL_PHI_ACCESS",
                    String.format("User %s (%s) accessed %d patients in 1 hour",
                        rs.getString("user_id"),
                        rs.getString("user_role"),
                        rs.getInt("cnt"))
                );
            }
        } catch (SQLException e) {
            LOG.error("Compliance check failed", e);
        }
    }

    @Scheduled(cron = "0 0 7 * * ?")
    public void dailyAuditHealthCheck() {
        // Verify audit triggers enabled
        // Verify replication slot active
        // Generate daily compliance summary email
    }
}
```

## 9. 監査システムの健全性の監視

＃＃＃９．１．ヘルスチェックのクエリ

```sql
-- Audit table sizes
SELECT
    schemaname, tablename,
    pg_size_pretty(pg_total_relation_size(schemaname || '.' || tablename)) AS total_size,
    n_live_tup AS row_count
FROM pg_stat_user_tables
WHERE schemaname = 'audit_schema'
ORDER BY pg_total_relation_size(schemaname || '.' || tablename) DESC;

-- Debezium replication slot lag
SELECT
    slot_name, active,
    pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn)) AS lag
FROM pg_replication_slots;

-- Audit triggers status
SELECT
    tgname, tgrelid::regclass AS table_name,
    CASE tgenabled WHEN 'O' THEN 'ENABLED' WHEN 'D' THEN 'DISABLED' END AS status
FROM pg_trigger
WHERE tgfoid = 'audit_schema.audit_trigger_func'::regproc;

-- pgAudit configuration
SELECT name, setting FROM pg_settings WHERE name LIKE 'pgaudit%';

-- Today's audit event summary
SELECT operation, COUNT(*) AS cnt, MAX(event_timestamp) AS latest
FROM audit_schema.data_change_log
WHERE event_timestamp >= CURRENT_DATE
GROUP BY operation;
```

＃＃＃９．２． Prometheus アラート ルール

```yaml
groups:
  - name: postgresql-audit-alerts
    rules:
      - alert: AuditReplicationLagHigh
        expr: pg_replication_slot_lag_bytes > 104857600
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Debezium replication lag > 100MB"

      - alert: AuditTriggerDisabled
        expr: pg_audit_triggers_disabled > 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Audit trigger disabled - HIPAA compliance violation"

      - alert: UnusualPHIAccessRate
        expr: rate(phi_access_total[1h]) > 100
        for: 15m
        labels:
          severity: warning
        annotations:
          summary: "PHI access rate unusually high"
```

## 概要

このレッスンでは、PostgreSQL ヘルスケア用の **包括的な監査ログ システム** を構築しました。

1. **pgAudit 拡張機能**: ステートメントレベル (DDL、ロールの変更) + オブジェクトレベル (PHI テーブル) のロギング
2. **カスタム監査トリガー**: 前後の値、変更された列、WHO/WHAT/WHEN/WHERE をキャプチャします。
3. **不変監査証跡**: UPDATE/DELETE/DROP に対するルールを備えた追加専用テーブル
4. **PHI アクセス追跡**: PHI フィールドが復号化/読み取られるたびにログを記録します
5. **Debezium CDC**: WAL から Kafka へのリアルタイム変更ストリーミング
6. **アプリケーションレベルの監査**: Quarkus インターセプターは HTTP、JWT、ビジネス コンテキストをキャプチャします
7. **ストレージと保持**: 月単位のパーティショニング、暗号化された S3 ストレージ、7 年間の保持
8. **コンプライアンスレポート**: 異常検出、時間外アクセス、緊急アクセスのための自動クエリ
9. **モニタリング**: Prometheus によるレプリケーション ラグ、トリガーの健全性、アクセス異常のアラート

全体的なアーキテクチャ:

- **アプリ監査 (Quarkus)** → Kafka → OpenSearch (リアルタイム クエリ) + S3 (7 年以上のアーカイブ)
- **DB 監査 (pgAudit)** → CSV → Fluent Bit → OpenSearch
- **カスタム トリガー** → `audit_schema` テーブル → コンプライアンスレポート
- **CDC (Debezium)** → Kafka → KSQL (異常検出)

## 演習

1. **pgAudit のセットアップ**: pgAudit を PostgreSQL (Docker またはローカル) にインストールします。ステートメントレベルの監査を構成する `write, ddl, role`。オブジェクトレベルの監査を構成する `patients` そして `medical_records` テーブル。テーブル。 INSERT/UPDATE/SELECT を実行し、監査ログで確認します。

2. **カスタム監査トリガー**: 作成 `audit_schema.data_change_log` テーブル (不変、パーティション化)。トリガー関数を作成し、それを 3 つの PHI テーブルにアタッチします。患者記録を更新し、正しい old_data、new_data、changed_columns、アプリ セッション コンテキストが含まれる監査ログを確認します。

3. **Debezium CDC パイプライン**: Docker Compose (PostgreSQL + Kafka + Debezium) をセットアップします。医療テーブル用の登録コネクタ。患者テーブルで INSERT/UPDATE を実行し、Kafka トピックからのイベントを消費します。イベント形式に前後の値が含まれていることを確認します。

4. **コンプライアンス レポート**: セクション 8 の 5 つのコンプライアンス クエリを実行します。「同じユーザーが 1 日に 100 回以上異なる患者記録にアクセスした」ことを検出する追加のクエリを作成します。日次レポートを CSV としてエクスポートするスケジュールされたスクリプトを作成します。

---

---

<!-- SERIES-NAV:START -->
| ◀ 前の記事 |次の記事 ▶ |
|:---|---:|
| [レッスン 11: PHI の行レベルのセキュリティと列の暗号化](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-11-row-level-security-column-encryption-phi) | [レッスン 13: Quarkus セキュリティ アーキテクチャ - OIDC 拡張機能、JWT 伝播、RBAC](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-13-quarkus-security-oidc-jwt-rbac) |
<!-- SERIES-NAV:END -->
