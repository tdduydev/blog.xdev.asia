---
id: 019e1a40-a112-7001-d001-f0a1b2c30112
title: 'Lesson 12: Audit Logging & CDC with pgAudit + Debezium'
slug: bai-12-audit-logging-cdc-pgaudit
description: >-
  Implementing Audit Logging for PostgreSQL medical: pgAudit extension
  configuration, statement-level vs object-level audit, audit log format and
  storage, Change Data Capture (CDC) with Debezium for event sourcing, immutable
  audit trail design, log shipping and archiving, and compliance reporting from
  audit logs.
duration_minutes: 150
is_free: true
video_url: null
sort_order: 12
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f472b6">🏗️ Architecture — Lesson 12</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 12: Audit Logging & CDC with pgAudit +</tspan>
      <tspan x="60" dy="42">Debezium</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Building a Microservices Healthcare System — Quarkus, PostgreSQL, Keycloak with HIPAA standards</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 3: Building Data Layer — PostgreSQL for Healthcare</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. Overview of Audit Logging for Healthcare

![Audit Logging architecture — pgAudit, Debezium CDC, Fluent Bit, ELK](/storage/uploads/2026/04/healthcare-audit-logging-stack.webp)

HIPAA Security Rule §164.312(b) requires **hardware, software, and/or procedural mechanisms that record and examine activity** in systems containing ePHI. Audit logging is not only a compliance requirement but also a tool to **detect intrusions, forensics, and accountability**.

### 1.1. Audit Requirements for Healthcare

| Request | Description |
|--------|--------|
| **WHO?** | User identity (Keycloak subject) |
| **WHAT?** | Action performed (SELECT, INSERT, UPDATE) |
| **WHEN?** | Timestamp (with timezone) |
| **WHERE?** | Source IP, application, service |
| **WHICH?** | Object accessed (table, column, row) |
| **HOW?** | Query text, parameters |
| **RESULT?** | Success/failure, rows affected |

**Additional requirements for Healthcare:**

- PHI access tracking
- Break-the-glass audit
- Before/After values for data changes
- Immutable audit trail (no tampering)
- 6-year retention (HIPAA minimum)

### 1.2. Audit Architecture

![Audit Stack — Quarkus + pgAudit + Debezium CDC → FluentBit → OpenSearch/S3/PostgreSQL](/storage/uploads/2026/04/healthcare-audit-architecture.webp)

**Audit Sources:**

- **Quarkus App Logs** → JSON logs
- **PostgreSQL pgAudit** → CSV/syslog
- **Debezium CDC** → Kafka events

**Pipeline:** All → **FluentBit** → deliver to:

- **OpenSearch/ELK** — Query & visualization
- **S3 Archive** — 7 years archive
- **PostgreSQL Audit DB** — Structured query

## 2. pgAudit - Installation & Configuration

### 2.1. Install pgAudit

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

### 2.2. postgresql.conf Configuration

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

### 2.3. Enable pgAudit Extension

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

## 3. Statement-Level vs Object-Level Audit

### 3.1. Statement-Level Audit

Statement-level audit log **all statements** by category. This is the simplest way.

```sql
-- Ví dụ: với pgaudit.log = 'write, ddl, role'

-- Statement này SẼ được log (write)
INSERT INTO patient_schema.patients (full_name_encrypted, ...) VALUES (...);

-- Statement này SẼ được log (ddl)
ALTER TABLE patient_schema.patients ADD COLUMN blood_type VARCHAR(5);

-- Statement này KHÔNG được log (read, không nằm trong config)
SELECT * FROM patient_schema.patients;
```

Audit log output (CSV format):

```
2025-01-15 10:30:45.123 ICT [12345] user=app_patient_svc,db=healthcare_db,app=patient-service,client=10.0.1.10
AUDIT: SESSION,1,1,WRITE,INSERT,,patient_schema.patients,
"INSERT INTO patient_schema.patients (...) VALUES ($1, $2, $3)",<parameters>,1
```

### 3.2. Object-Level Audit

Object-level audit allows for **more granular** control — auditing specific tables/columns instead of all.

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

### 3.3. Compare Statement vs Object Level

| Features | Statement-Level | Object-Level |
|--------|----------------|-------------|
| Granularity | Category (read/write/ddl) | Per-table, per-operation |
| Configuration | `pgaudit.log` parameters | `pgaudit.role` + GRANT |
| Overhead | Low-Medium | Medium-High |
| Use cases | General compliance | PHI table monitoring |
| Typical | healthcare DDL + Role changes | Patient + Medical records |

**Recommend**: Combine both — Statement-level for DDL/Role, Object-level for PHI tables.

## 4. Custom Audit Trigger Functions

pgAudit logs **SQL statements**, but does not capture:

- **Before/After values** (old vs new data)
- **Application-level context** (JWT user, IP)
- **Business-level events** (who viewed which patient record)

We need custom triggers to add.

### 4.1. Immutable Audit Table Design

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

Anti-tamper protection:

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

### 4.2. Generic Audit Trigger Function

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

### 4.3. Attach Audit Triggers

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

### 4.4. PHI Access Audit (SELECT Tracking)

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

## 5. Change Data Capture (CDC) with Debezium

### 5.1. CDC Architecture

![CDC Pipeline — PostgreSQL WAL → Debezium → Kafka → OpenSearch/S3/KSQL](/storage/uploads/2026/04/healthcare-cdc-pipeline.webp)

**CDC Flow:**

1. **PostgreSQL WAL** — Write-Ahead Log (logical replication)
2. **Logical Decoding** → **Debezium Connector** (Kafka Connect Source)
3. **JSON change events** → **Apache Kafka** Topics:
   - `healthcare.patient_schema.patients`
   - `healthcare.patient_schema.records`
   - `healthcare.audit_schema.changes`
4. **Consumers:**
   - **OpenSearch Sink Connect** — Full-text search
   - **Audit S3 Archive** — Long-term retention
   - **Alert Engine (KSQL)** — Real-time anomaly detection

### 5.2. PostgreSQL Configuration for CDC

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

### 5.3. Debezium Connector Configuration

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

### 5.4. Deploy and Verify Debezium

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

### 5.5. Debezium Change Event Format

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

### 5.6. Docker Compose for CDC Stack

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

## 6. Quarkus Application-Level Audit Logging

### 6.1. Audit Interceptor

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

### 6.2. Audit Log Service

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

### 6.3. Application Audit Table

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

## 7. Audit Log Storage & Retention

### 7.1. Auto-Partitioning with pg_partman

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

### 7.2. Log Shipping to S3

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

## 8. Compliance Reporting from Audit Logs

### 8.1. HIPAA Compliance Queries

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

### 8.2. Automated Compliance Monitoring

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

## 9. Monitoring Audit System Health

### 9.1. Health Check Queries

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

### 9.2. Prometheus Alerting Rules

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

## Summary

In this lesson, we built a **comprehensive Audit Logging system** for PostgreSQL healthcare:

1. **pgAudit Extension**: Statement-level (DDL, Role changes) + Object-level (PHI tables) logging
2. **Custom Audit Triggers**: Capture before/after values, changed columns, WHO/WHAT/WHEN/WHERE
3. **Immutable Audit Trail**: Append-only tables with rules against UPDATE/DELETE/DROP
4. **PHI Access Tracking**: Log each time PHI fields are decrypted/read
5. **Debezium CDC**: Real-time change streaming from WAL to Kafka
6. **Application-Level Audit**: Quarkus interceptor captures HTTP, JWT, business context
7. **Storage & Retention**: Monthly partitioning, encrypted S3 storage, 7-year retention
8. **Compliance Reporting**: Automated queries for anomaly detection, after-hours access, emergency access
9. **Monitoring**: Prometheus alerting for replication lag, trigger health, access anomalies

Overall architecture:

- **App Audit (Quarkus)** → Kafka → OpenSearch (real-time query) + S3 (archive 7+ years)
- **DB Audit (pgAudit)** → CSV → Fluent Bit → OpenSearch
- **Custom Triggers** → `audit_schema` tables → Compliance Reports
- **CDC (Debezium)** → Kafka → KSQL (anomaly detection)

## Exercises

1. **pgAudit Setup**: Install pgAudit on PostgreSQL (Docker or local). Configure statement-level audit for `write, ddl, role`. Configure object-level audit for `patients` and `medical_records` tables. tables. Run INSERT/UPDATE/SELECT and verify in audit log.

2. **Custom Audit Triggers**: Create `audit_schema.data_change_log` table (immutable, partitioned). Write a trigger function and attach it to 3 PHI tables. UPDATE a patient record and verify audit log containing correct old_data, new_data, changed_columns, and app session context.

3. **Debezium CDC Pipeline**: Setup Docker Compose (PostgreSQL + Kafka + Debezium). Register connector for healthcare tables. Perform INSERT/UPDATE on patients table and consume events from Kafka topic. Verify event format contains before/after values.

4. **Compliance Reporting**: Run 5 compliance queries from Section 8. Write additional query detect "same user accessed different patient records > 100 times in 1 day". Create scheduled script to export daily report as CSV.

---

---

<!-- SERIES-NAV:START -->
| ◀ Previous article | Next article ▶ |
|:---|---:|
| [Lesson 11: Row-Level Security & Column Encryption for PHI](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-11-row-level-security-column-encryption-phi) | [Lesson 13: Quarkus Security Architecture - OIDC Extension, JWT Propagation & RBAC](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-13-quarkus-security-oidc-jwt-rbac) |
<!-- SERIES-NAV:END -->
