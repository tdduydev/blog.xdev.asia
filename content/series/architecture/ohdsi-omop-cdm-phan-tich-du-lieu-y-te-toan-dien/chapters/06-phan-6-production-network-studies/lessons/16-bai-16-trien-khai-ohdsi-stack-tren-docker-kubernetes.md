---
id: 019e0b20-b216-7a01-e001-f1a7f8000016
title: "Bài 16: Triển khai OHDSI Stack trên Docker & Kubernetes"
slug: bai-16-trien-khai-ohdsi-stack-tren-docker-kubernetes
description: >-
  Docker Compose cho OHDSI stack (PostgreSQL, WebAPI, ATLAS),
  Kubernetes Helm charts, backup/restore CDM, monitoring
  với Prometheus/Grafana, performance tuning PostgreSQL.
duration_minutes: 130
is_free: true
video_url: null
sort_order: 16
section_title: "Phần 6: Production & Network Studies"
course:
  id: 019e0b20-b200-7a01-e001-f1a7f8000001
  title: "OHDSI & OMOP CDM — Phân tích Dữ liệu Y tế Toàn diện"
  slug: ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-2981" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-2981)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1076" cy="158" r="24" fill="#2dd4bf" opacity="0.13"/>
    <circle cx="1052" cy="114" r="32" fill="#2dd4bf" opacity="0.11"/>
    <circle cx="1028" cy="70" r="10" fill="#2dd4bf" opacity="0.09"/>
    <circle cx="1004" cy="286" r="18" fill="#2dd4bf" opacity="0.07"/>
    <circle cx="980" cy="242" r="26" fill="#2dd4bf" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <line x1="600" y1="98" x2="1100" y2="178" stroke="#2dd4bf" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="128" x2="1050" y2="198" stroke="#2dd4bf" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1026.5788383248864,181.5 1026.5788383248864,214.5 998,231 969.4211616751136,214.5 969.4211616751135,181.5 998,165" fill="none" stroke="#2dd4bf" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#2dd4bf"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#2dd4bf" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">🏗️ Kiến trúc — Bài 16</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 16: Triển khai OHDSI Stack trên Docker</tspan>
      <tspan x="60" dy="42">&amp; Kubernetes</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OHDSI &amp; OMOP CDM — Phân tích Dữ liệu Y tế Toàn diện</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 6: Production &amp; Network Studies</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 16: Triển khai OHDSI Stack trên Docker & Kubernetes](/storage/uploads/2026/03/ohdsi-bai-16-docker-kubernetes.webp)

## Giới thiệu

Bài này hướng dẫn triển khai **toàn bộ OHDSI stack** (PostgreSQL + WebAPI + ATLAS + ACHILLES) cho môi trường production, bao gồm Docker Compose cho single-node và Kubernetes Helm cho cluster.

```
OHDSI Production Stack:

┌─────────────────────────────────────────────────┐
│                  Reverse Proxy                   │
│              (Nginx / Traefik)                   │
│         :443 (HTTPS, SSL termination)            │
├──────────────┬──────────────────────────────────┤
│              │                                   │
│  ATLAS       │   WebAPI                          │
│  (Static     │   (Tomcat / Spring Boot)          │
│   SPA)       │   :8080                           │
│  :80         │                                   │
│              │   ┌──────────────┐                │
│              │   │ PostgreSQL   │                │
│              │   │ CDM + Results│                │
│              │   │ :5432        │                │
│              │   └──────────────┘                │
│              │                                   │
│              │   ┌──────────────┐                │
│              │   │ R Server     │                │
│              │   │ ACHILLES/DQD │                │
│              │   │ HADES        │                │
│              │   └──────────────┘                │
└──────────────┴──────────────────────────────────┘
```

---

## 1. Docker Compose

### 1.1 docker-compose.yml

```yaml
version: "3.8"

services:
  # ─── PostgreSQL CDM Database ───
  ohdsi-db:
    image: postgres:16-alpine
    container_name: ohdsi-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: ohdsi
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
      POSTGRES_DB: ohdsi
    volumes:
      - ohdsi-pgdata:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ohdsi"]
      interval: 10s
      timeout: 5s
      retries: 5
    secrets:
      - db_password
    deploy:
      resources:
        limits:
          memory: 4G
          cpus: "2.0"

  # ─── WebAPI ───
  ohdsi-webapi:
    image: ohdsi/webapi:latest
    container_name: ohdsi-webapi
    restart: unless-stopped
    environment:
      DATASOURCE_DRIVERCLASSNAME: org.postgresql.Driver
      DATASOURCE_URL: jdbc:postgresql://ohdsi-db:5432/ohdsi
      DATASOURCE_USERNAME: ohdsi_app
      DATASOURCE_PASSWORD_FILE: /run/secrets/app_password
      DATASOURCE_OHDSI_SCHEMA: ohdsi
      SPRING_JPA_PROPERTIES_HIBERNATE_DEFAULT_SCHEMA: ohdsi
      SPRING_BATCH_REPOSITORY_TABLEPREFIX: ohdsi.BATCH_
      FLYWAY_DATASOURCE_DRIVERCLASSNAME: org.postgresql.Driver
      FLYWAY_DATASOURCE_URL: jdbc:postgresql://ohdsi-db:5432/ohdsi
      FLYWAY_DATASOURCE_USERNAME: ohdsi_admin
      FLYWAY_DATASOURCE_PASSWORD_FILE: /run/secrets/admin_password
      FLYWAY_SCHEMAS: ohdsi
    ports:
      - "8080:8080"
    depends_on:
      ohdsi-db:
        condition: service_healthy
    secrets:
      - app_password
      - admin_password
    deploy:
      resources:
        limits:
          memory: 2G

  # ─── ATLAS ───
  ohdsi-atlas:
    image: ohdsi/atlas:latest
    container_name: ohdsi-atlas
    restart: unless-stopped
    volumes:
      - ./atlas-config/config-local.js:/usr/share/nginx/html/atlas/js/config-local.js:ro
    ports:
      - "80:80"
    depends_on:
      - ohdsi-webapi

  # ─── R Server (ACHILLES, DQD, HADES) ───
  ohdsi-r:
    image: ohdsi/broadsea-hades:latest
    container_name: ohdsi-r
    restart: unless-stopped
    environment:
      CDM_DB_SERVER: ohdsi-db/ohdsi
      CDM_DB_USER: ohdsi_app
      CDM_DB_PASS_FILE: /run/secrets/app_password
    volumes:
      - ./r-scripts:/scripts
      - ohdsi-r-output:/output
    depends_on:
      ohdsi-db:
        condition: service_healthy
    secrets:
      - app_password

volumes:
  ohdsi-pgdata:
    driver: local
  ohdsi-r-output:
    driver: local

secrets:
  db_password:
    file: ./secrets/db_password.txt
  app_password:
    file: ./secrets/app_password.txt
  admin_password:
    file: ./secrets/admin_password.txt
```

### 1.2 ATLAS Config

```javascript
// atlas-config/config-local.js
define([], function () {
  var configLocal = {};

  configLocal.api = {
    name: "OHDSI",
    url: "https://ohdsi.example.com/WebAPI/"
  };

  configLocal.cohortComparisonResultsEnabled = true;
  configLocal.userAuthenticationEnabled = false;
  configLocal.plpResultsEnabled = true;

  return configLocal;
});
```

### 1.3 Init Scripts

```sql
-- init-scripts/01-create-schemas.sql
CREATE SCHEMA IF NOT EXISTS cdm;
CREATE SCHEMA IF NOT EXISTS results;
CREATE SCHEMA IF NOT EXISTS ohdsi;

-- Tạo users riêng biệt (principle of least privilege)
CREATE USER ohdsi_admin WITH PASSWORD 'changeme_admin';
CREATE USER ohdsi_app WITH PASSWORD 'changeme_app';

-- Admin: DDL rights (cho Flyway migrations)
GRANT ALL ON SCHEMA ohdsi TO ohdsi_admin;
GRANT ALL ON SCHEMA cdm TO ohdsi_admin;
GRANT ALL ON SCHEMA results TO ohdsi_admin;

-- App: DML rights only
GRANT USAGE ON SCHEMA cdm TO ohdsi_app;
GRANT SELECT ON ALL TABLES IN SCHEMA cdm TO ohdsi_app;
GRANT USAGE ON SCHEMA results TO ohdsi_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA results TO ohdsi_app;
GRANT USAGE ON SCHEMA ohdsi TO ohdsi_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA ohdsi TO ohdsi_app;
```

### 1.4 Khởi động

```bash
# Tạo secrets
mkdir -p secrets
openssl rand -base64 32 > secrets/db_password.txt
openssl rand -base64 32 > secrets/app_password.txt
openssl rand -base64 32 > secrets/admin_password.txt

# Start stack
docker compose up -d

# Kiểm tra
docker compose ps
docker compose logs ohdsi-webapi --tail 50

# Test WebAPI
curl -s http://localhost:8080/WebAPI/info | jq .
```

---

## 2. Kubernetes Deployment

### 2.1 Namespace & Secrets

```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: ohdsi
  labels:
    app.kubernetes.io/name: ohdsi

---
# k8s/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: ohdsi-db-credentials
  namespace: ohdsi
type: Opaque
stringData:
  POSTGRES_PASSWORD: "${DB_PASSWORD}"
  OHDSI_ADMIN_PASSWORD: "${ADMIN_PASSWORD}"
  OHDSI_APP_PASSWORD: "${APP_PASSWORD}"
```

### 2.2 PostgreSQL StatefulSet

```yaml
# k8s/postgresql.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: ohdsi-postgresql
  namespace: ohdsi
spec:
  serviceName: ohdsi-postgresql
  replicas: 1
  selector:
    matchLabels:
      app: ohdsi-postgresql
  template:
    metadata:
      labels:
        app: ohdsi-postgresql
    spec:
      containers:
        - name: postgresql
          image: postgres:16-alpine
          ports:
            - containerPort: 5432
          env:
            - name: POSTGRES_USER
              value: "ohdsi"
            - name: POSTGRES_DB
              value: "ohdsi"
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: ohdsi-db-credentials
                  key: POSTGRES_PASSWORD
          resources:
            requests:
              memory: "2Gi"
              cpu: "1000m"
            limits:
              memory: "4Gi"
              cpu: "2000m"
          volumeMounts:
            - name: pgdata
              mountPath: /var/lib/postgresql/data
          livenessProbe:
            exec:
              command: ["pg_isready", "-U", "ohdsi"]
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            exec:
              command: ["pg_isready", "-U", "ohdsi"]
            initialDelaySeconds: 5
            periodSeconds: 5
  volumeClaimTemplates:
    - metadata:
        name: pgdata
      spec:
        accessModes: ["ReadWriteOnce"]
        storageClassName: fast-ssd
        resources:
          requests:
            storage: 100Gi
```

### 2.3 WebAPI Deployment

```yaml
# k8s/webapi.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ohdsi-webapi
  namespace: ohdsi
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ohdsi-webapi
  template:
    metadata:
      labels:
        app: ohdsi-webapi
    spec:
      containers:
        - name: webapi
          image: ohdsi/webapi:latest
          ports:
            - containerPort: 8080
          env:
            - name: DATASOURCE_URL
              value: "jdbc:postgresql://ohdsi-postgresql:5432/ohdsi"
            - name: DATASOURCE_USERNAME
              value: "ohdsi_app"
            - name: DATASOURCE_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: ohdsi-db-credentials
                  key: OHDSI_APP_PASSWORD
          resources:
            requests:
              memory: "1Gi"
              cpu: "500m"
            limits:
              memory: "2Gi"
              cpu: "1000m"
          readinessProbe:
            httpGet:
              path: /WebAPI/info
              port: 8080
            initialDelaySeconds: 60
            periodSeconds: 10
```

### 2.4 Ingress

```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ohdsi-ingress
  namespace: ohdsi
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/proxy-body-size: "50m"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - ohdsi.example.com
      secretName: ohdsi-tls
  rules:
    - host: ohdsi.example.com
      http:
        paths:
          - path: /WebAPI
            pathType: Prefix
            backend:
              service:
                name: ohdsi-webapi
                port:
                  number: 8080
          - path: /atlas
            pathType: Prefix
            backend:
              service:
                name: ohdsi-atlas
                port:
                  number: 80
```

---

## 3. Backup & Restore

### 3.1 Backup CDM

```bash
#!/bin/bash
# backup-cdm.sh

BACKUP_DIR="/backups/ohdsi"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/ohdsi_cdm_${DATE}.sql.gz"

mkdir -p "$BACKUP_DIR"

# pg_dump CDM + results schemas
docker exec ohdsi-db pg_dump \
  -U ohdsi \
  -d ohdsi \
  --schema=cdm \
  --schema=results \
  --schema=ohdsi \
  --format=custom \
  --compress=9 \
  --file="/tmp/backup.dump"

docker cp ohdsi-db:/tmp/backup.dump "$BACKUP_FILE"
docker exec ohdsi-db rm /tmp/backup.dump

# Xóa backup cũ hơn 30 ngày
find "$BACKUP_DIR" -name "*.dump" -mtime +30 -delete

echo "Backup completed: $BACKUP_FILE ($(du -h "$BACKUP_FILE" | cut -f1))"
```

### 3.2 Restore

```bash
#!/bin/bash
# restore-cdm.sh

BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: $0 <backup_file>"
  exit 1
fi

docker cp "$BACKUP_FILE" ohdsi-db:/tmp/restore.dump

docker exec ohdsi-db pg_restore \
  -U ohdsi \
  -d ohdsi \
  --clean \
  --if-exists \
  --no-owner \
  /tmp/restore.dump

docker exec ohdsi-db rm /tmp/restore.dump

echo "Restore completed from: $BACKUP_FILE"
```

---

## 4. Monitoring

### 4.1 Prometheus Metrics

```yaml
# docker-compose.monitoring.yml
services:
  postgres-exporter:
    image: prometheuscommunity/postgres-exporter:latest
    container_name: ohdsi-pg-exporter
    environment:
      DATA_SOURCE_URI: "ohdsi-db:5432/ohdsi?sslmode=disable"
      DATA_SOURCE_USER: ohdsi_monitor
      DATA_SOURCE_PASS_FILE: /run/secrets/monitor_password
    ports:
      - "9187:9187"
    depends_on:
      - ohdsi-db
    secrets:
      - monitor_password

  prometheus:
    image: prom/prometheus:latest
    container_name: ohdsi-prometheus
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana:latest
    container_name: ohdsi-grafana
    volumes:
      - ./monitoring/grafana/dashboards:/var/lib/grafana/dashboards
    ports:
      - "3000:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD__FILE: /run/secrets/grafana_password
    secrets:
      - grafana_password
```

### 4.2 Key Metrics

```
PostgreSQL Metrics:
┌────────────────────────────────┬──────────────┬──────────────┐
│ Metric                         │ Warning      │ Critical     │
├────────────────────────────────┼──────────────┼──────────────┤
│ Connections used               │ > 80%        │ > 95%        │
│ Cache hit ratio                │ < 95%        │ < 90%        │
│ Dead tuples ratio              │ > 10%        │ > 20%        │
│ Replication lag                │ > 30s        │ > 120s       │
│ Disk usage                     │ > 80%        │ > 90%        │
│ Long running queries           │ > 300s       │ > 600s       │
└────────────────────────────────┴──────────────┴──────────────┘

WebAPI Metrics:
  - Response time P95 < 2s
  - Error rate < 1%
  - Active sessions
  - Cohort generation queue size
```

---

## 5. Performance Tuning

### 5.1 PostgreSQL Config cho CDM

```ini
# postgresql.conf — optimized cho OHDSI workload

# Memory (server có 16GB RAM)
shared_buffers = 4GB
effective_cache_size = 12GB
work_mem = 256MB
maintenance_work_mem = 1GB

# Connections
max_connections = 100

# WAL
wal_buffers = 256MB
min_wal_size = 2GB
max_wal_size = 8GB

# Query planner
random_page_cost = 1.1          # SSD storage
effective_io_concurrency = 200  # SSD
default_statistics_target = 500 # better plans for CDM

# Parallel queries (quan trọng cho ACHILLES/DQD)
max_worker_processes = 8
max_parallel_workers = 8
max_parallel_workers_per_gather = 4
max_parallel_maintenance_workers = 4

# Autovacuum (CDM tables lớn)
autovacuum_max_workers = 4
autovacuum_vacuum_cost_limit = 800
autovacuum_vacuum_scale_factor = 0.05
autovacuum_analyze_scale_factor = 0.02

# Logging
log_min_duration_statement = 5000  # log queries > 5s
log_checkpoints = on
log_autovacuum_min_duration = 0
```

### 5.2 CDM Indexes

```sql
-- Indexes quan trọng cho ATLAS/WebAPI queries

-- Person
CREATE INDEX idx_person_gender ON cdm.person (gender_concept_id);
CREATE INDEX idx_person_year ON cdm.person (year_of_birth);

-- Condition
CREATE INDEX idx_cond_person ON cdm.condition_occurrence (person_id);
CREATE INDEX idx_cond_concept ON cdm.condition_occurrence (condition_concept_id);
CREATE INDEX idx_cond_date ON cdm.condition_occurrence (condition_start_date);

-- Drug exposure
CREATE INDEX idx_drug_person ON cdm.drug_exposure (person_id);
CREATE INDEX idx_drug_concept ON cdm.drug_exposure (drug_concept_id);
CREATE INDEX idx_drug_date ON cdm.drug_exposure (drug_exposure_start_date);

-- Measurement
CREATE INDEX idx_meas_person ON cdm.measurement (person_id);
CREATE INDEX idx_meas_concept ON cdm.measurement (measurement_concept_id);
CREATE INDEX idx_meas_date ON cdm.measurement (measurement_date);

-- Observation period
CREATE INDEX idx_obs_person ON cdm.observation_period (person_id);

-- Visit
CREATE INDEX idx_visit_person ON cdm.visit_occurrence (person_id);
CREATE INDEX idx_visit_concept ON cdm.visit_occurrence (visit_concept_id);

-- Concept (vocabulary queries)
CREATE INDEX idx_concept_code ON cdm.concept (concept_code);
CREATE INDEX idx_concept_vocab ON cdm.concept (vocabulary_id);
CREATE INDEX idx_concept_name ON cdm.concept USING gin (concept_name gin_trgm_ops);

-- ANALYZE sau khi tạo index
ANALYZE cdm.person;
ANALYZE cdm.condition_occurrence;
ANALYZE cdm.drug_exposure;
ANALYZE cdm.measurement;
ANALYZE cdm.visit_occurrence;
ANALYZE cdm.concept;
```

---

## Tóm tắt

| Component | Docker | Kubernetes |
|-----------|--------|-----------|
| PostgreSQL | Container + volume | StatefulSet + PVC |
| WebAPI | Container + env | Deployment (replicas) |
| ATLAS | Container + config-local.js | Deployment + ConfigMap |
| R Server | Container + mounted scripts | Job / CronJob |
| Secrets | Docker secrets | K8s Secrets |
| Networking | docker-compose network | Service + Ingress |
| Backup | cron + pg_dump | CronJob |
| Monitoring | postgres-exporter + Grafana | ServiceMonitor |

**Bài tiếp theo**: Network Studies & Best Practices — Nghiên cứu đa trung tâm
