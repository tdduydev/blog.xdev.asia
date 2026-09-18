---
id: 02770003-omop-cdm5-b001-000000000008
title: "Production OMOP: Postgres tuning, partition, security cho VN"
slug: omop-production-postgres-tuning-deployment
excerpt: >-
  CDM 100M event vận hành thật khác hẳn dataset Eunomia. Bài viết hướng dẫn
  schema design, indexing, partition theo person_id, vacuum, backup, security
  theo Luật Bảo vệ dữ liệu cá nhân 2025 (hiệu lực 1/1/2026), audit log,
  vocabulary upgrade.
featured_image: /images/blog/omop-production-featured.webp
type: blog
reading_time: 14
view_count: 0
meta: null
published_at: '2026-05-07T18:30:00.000000Z'
created_at: '2026-05-07T18:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat7-7007-a007-000000000007, name: Kiến trúc hệ thống, slug: architecture}
tags: [{name: OMOP, slug: omop}, {name: PostgreSQL, slug: postgresql}, {name: DevOps, slug: devops}, {name: Healthcare, slug: healthcare}]
comments: []
---

CDM mẫu Eunomia có 2.700 người. CDM thật có thể 1-100 triệu. Khoảng cách kỹ thuật rất lớn. Bài viết này tổng hợp best practice production cho Postgres OMOP CDM ở quy mô VN.

## 1. Hardware sizing

| Quy mô | vCPU | RAM | SSD | RAM/data ratio |
|---|---|---|---|---|
| Dev (Eunomia) | 4 | 16 GB | 100 GB | n/a |
| 100K patient | 8 | 32 GB | 500 GB | 1:5 |
| 1M patient | 16 | 64 GB | 2 TB | 1:8 |
| 10M patient | 32 | 256 GB | 10 TB | 1:10 |
| 100M patient (BHYT scale) | 64+ | 512 GB+ | 50 TB+ | 1:15 |

Phân vùng:
- `pg_data`: SSD NVMe RAID 10
- `pg_wal`: SSD riêng (latency low)
- `pg_temp`: SSD riêng (sort/hash join spill)

## 2. PostgreSQL config

```ini
# postgresql.conf cho 64GB RAM
shared_buffers = 16GB              # 25% RAM
effective_cache_size = 48GB         # 75% RAM
work_mem = 256MB                    # per query, cẩn thận concurrent
maintenance_work_mem = 4GB
wal_buffers = 64MB
max_wal_size = 16GB
min_wal_size = 4GB
checkpoint_timeout = 30min
default_statistics_target = 500     # cao hơn vì OMOP nhiều skew
random_page_cost = 1.1              # SSD
effective_io_concurrency = 200      # SSD NVMe
max_parallel_workers_per_gather = 4
max_parallel_workers = 16
jit = on                            # PG12+ tốt cho analytics
```

Lưu ý `work_mem` × concurrent connection có thể vượt RAM → dùng pgBouncer transaction pooling, max 50 connection.

## 3. Indexing strategy

OHDSI publish DDL chuẩn: `OMOPCDM_postgresql_5.4_indices.sql`. Bổ sung tuỳ workload:

```sql
-- Bảng hot nhất: condition_occurrence, drug_exposure, measurement
CREATE INDEX idx_co_person ON condition_occurrence(person_id);
CREATE INDEX idx_co_concept ON condition_occurrence(condition_concept_id);
CREATE INDEX idx_co_date ON condition_occurrence USING BRIN(condition_start_date);  -- BRIN cho time-series

CREATE INDEX idx_co_concept_date ON condition_occurrence(condition_concept_id, condition_start_date);

-- Vocabulary
CREATE INDEX idx_concept_std ON concept(standard_concept) WHERE standard_concept = 'S';
CREATE INDEX idx_ca_anc_desc ON concept_ancestor(ancestor_concept_id, descendant_concept_id);

-- Cohort
CREATE INDEX idx_cohort_id_person ON cohort(cohort_definition_id, subject_id);

-- Statistics partial
ALTER TABLE condition_occurrence ALTER COLUMN condition_concept_id SET STATISTICS 1000;
ANALYZE condition_occurrence;
```

## 4. Partition cho dataset lớn

![4. Partition cho dataset lớn](/images/blog/diagrams/omop-production-postgres-tuning-deployment-d01.webp)

```sql
CREATE TABLE condition_occurrence (
  ...
) PARTITION BY RANGE (condition_start_date);

CREATE TABLE condition_occurrence_2026 
  PARTITION OF condition_occurrence
  FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

CREATE INDEX idx_co_2026_person ON condition_occurrence_2026(person_id);
```

Lợi ích:
- Pruning theo date → query nhanh hơn 10x
- Drop partition cũ rất nhanh (data retention 5 năm)
- Maintenance (VACUUM, REINDEX) song song

Alternative: partition by `person_id` HASH cho cohort query đa dạng date.

## 5. Vacuum và bloat

OMOP có nhiều UPDATE/DELETE khi re-ETL → bloat lớn.

```sql
-- Auto vacuum tuning
ALTER TABLE condition_occurrence SET (
  autovacuum_vacuum_scale_factor = 0.05,
  autovacuum_analyze_scale_factor = 0.02,
  fillfactor = 90
);

-- Manual cho big op
VACUUM ANALYZE condition_occurrence;
REINDEX TABLE CONCURRENTLY condition_occurrence;
```

Monitor bloat:
```sql
SELECT schemaname, relname, n_dead_tup, n_live_tup,
       round(n_dead_tup::numeric / NULLIF(n_live_tup, 0), 3) AS dead_ratio
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY dead_ratio DESC;
```

## 6. Backup & DR

![6. Backup & DR](/images/blog/diagrams/omop-production-postgres-tuning-deployment-d02.webp)

Pattern 2026:
- Streaming replication 1 standby same DC (failover < 30s)
- Async replication DR site
- pgBackRest weekly full + daily incremental + continuous WAL → S3
- RPO 5 phút, RTO < 1h

VN: dữ liệu y tế là *dữ liệu cá nhân nhạy cảm* theo **Luật Bảo vệ dữ liệu cá nhân 2025** (hiệu lực 1/1/2026) — phải lưu trong nước, không dùng S3 region nước ngoài. Dùng object storage Việt: VNG Cloud, Viettel IDC, FPT Cloud, CMC Cloud (đều có chứng nhận tuân thủ Luật BVDLCN).

## 7. Security theo Luật Bảo vệ dữ liệu cá nhân 2025

> **Cập nhật pháp lý 2026**: Luật Bảo vệ dữ liệu cá nhân (Quốc hội thông qua tháng 6/2025, hiệu lực 1/1/2026) thay thế và nâng cấp Nghị định 13/2023/NĐ-CP, kết hợp với **Luật Khám bệnh, chữa bệnh số 15/2023/QH15** (hiệu lực 1/1/2024) — quy định lưu trữ hồ sơ bệnh án, hồ sơ sức khoẻ điện tử.

Yêu cầu chính cho data y tế:
- Mã hoá at-rest và in-transit
- Audit log mọi truy cập PII/PHI
- Pseudonymize CCCD/BHYT
- Lưu trữ trong nước
- DPO (Data Protection Officer) chịu trách nhiệm
- Định kỳ đánh giá rủi ro

### 7.1 Encryption

```ini
# postgresql.conf
ssl = on
ssl_cert_file = '/etc/ssl/certs/postgres.crt'
ssl_key_file = '/etc/ssl/private/postgres.key'
ssl_ciphers = 'HIGH:!aNULL:!MD5'
```

At-rest: dùng LUKS / ZFS encryption / TDE (Postgres 18 native).

### 7.2 Pseudonymize person_source_value

```sql
-- Không lưu CCCD raw
person_source_value = encode(
  hmac(cccd::bytea, current_setting('app.pseudonym_secret')::bytea, 'sha256'),
  'hex'
);
```

Lưu key trong Vault / KMS riêng.

### 7.3 Row-level security

```sql
ALTER TABLE person ENABLE ROW LEVEL SECURITY;

CREATE POLICY person_policy ON person
  FOR SELECT
  TO research_user
  USING (location_id IN (
    SELECT location_id FROM user_location_access 
    WHERE user_id = current_user
  ));
```

### 7.4 Audit log

```sql
-- Extension pg_audit
CREATE EXTENSION pgaudit;
ALTER SYSTEM SET pgaudit.log = 'read,write,role,ddl';
```

Log gửi vào SIEM (Wazuh, Elasticsearch).

## 8. User & role pattern

```sql
-- Role separation
CREATE ROLE omop_owner;            -- DDL, ETL
CREATE ROLE omop_etl LOGIN;        -- ETL service account
CREATE ROLE omop_analyst LOGIN;    -- HADES, analytics
CREATE ROLE omop_atlas_webapi LOGIN;  -- WebAPI service
CREATE ROLE omop_readonly_external LOGIN;  -- DARWIN EU partner

-- Grant
GRANT USAGE ON SCHEMA cdm TO omop_analyst, omop_atlas_webapi;
GRANT SELECT ON ALL TABLES IN SCHEMA cdm TO omop_analyst, omop_atlas_webapi;

-- Cohort schema mới ghi được
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA results TO omop_atlas_webapi;
```

## 9. Vocabulary upgrade workflow

![9. Vocabulary upgrade workflow](/images/blog/diagrams/omop-production-postgres-tuning-deployment-d03.webp)

Tần suất: hàng quý. Lưu version log:

```sql
CREATE TABLE vocabulary_history (
  id SERIAL,
  vocabulary_version TEXT,
  installed_at TIMESTAMP,
  installed_by TEXT,
  rollback_available BOOLEAN
);
```

## 10. Monitoring stack

| Layer | Tool |
|---|---|
| Postgres metrics | pg_stat_statements + Postgres Exporter + Prometheus + Grafana |
| Slow query | pg_stat_statements top 100 |
| Lock | pg_locks query, alert idle_in_transaction > 10min |
| Replica lag | streaming_lag query |
| ETL job | Airflow / Prefect dashboard |
| DQD trend | scheduled DQD weekly + Grafana panel pct_failed |
| Security | SIEM alert role escalation, mass SELECT count |

## 11. Capacity planning

| Component | Growth indicator |
|---|---|
| `condition_occurrence` | ~3-5 row / patient / month |
| `drug_exposure` | ~5-10 / patient / month |
| `measurement` | ~10-20 / patient / month (lab + vital) |
| Vocabulary | +500MB / quarterly upgrade |
| Cohort table | +50MB / cohort generation |
| Audit log | 100MB-1GB / day tuỳ traffic |

Plan disk theo 3-5 năm forward.

## 12. Kubernetes / managed Postgres?

Lựa chọn:
- **Bare metal Postgres**: control tốt, cost thấp, ops nặng
- **Patroni + etcd cluster**: HA tự build
- **CloudNativePG / Zalando** trên K8s: modern, scaling tốt
- **Managed**: AWS RDS / GCP Cloud SQL / Azure Database — VN: Viettel IDC PaaS Postgres, VNG Cloud Database

OMOP scale lớn → bare metal hoặc CloudNativePG vẫn là lựa chọn hiệu suất nhất.

## 13. CI/CD cho schema migration

```bash
# Liquibase / Flyway thay vì raw SQL
flyway migrate -url=jdbc:postgresql://... -user=... -password=...
```

Mỗi migration version + script + rollback.

Thay đổi vocabulary tách workflow riêng (không phải schema migration).

## 14. Lessons learned

- Partition condition/drug/measurement theo year giúp query nhanh 5-10x
- BRIN index trên date column tiết kiệm disk
- pgBouncer transaction pooling bắt buộc khi >50 concurrent
- Vacuum aggressive cho hot table tránh bloat
- Vault tách secret khỏi config Postgres
- Test backup restore hàng quý — backup không test = không có backup
- Vocabulary upgrade gây outage 1-2h nếu không schema swap

## Kết luận

Production OMOP yêu cầu kỹ năng Postgres + DevOps + security. Đầu tư đúng từ ngày 1 giúp scale lên 100M+ event mà không phải refactor. Đặc biệt VN cần security theo **Luật Bảo vệ dữ liệu cá nhân 2025** (hiệu lực 1/1/2026) và **Luật KCB 15/2023** — pseudonymize, audit, lưu trong nước, DPO bắt buộc, DPIA cho mọi dự án nghiên cứu.

Bài tiếp: [FHIR ↔ OMOP — bridge giữa operational và analytics](/blog/omop-fhir-mapping-bridge).
