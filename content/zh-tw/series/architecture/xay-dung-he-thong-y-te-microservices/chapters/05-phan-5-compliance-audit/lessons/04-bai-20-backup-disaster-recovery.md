---
id: 019e1a40-a120-7001-d001-f0a1b2c30120
title: 第 20 課：備份、災難復原和業務連續性
slug: bai-20-backup-disaster-recovery
description: >-
  醫療保健資料的備份和災難復原策略：PostgreSQL
  備份策略（pg_dump、pg_basebackup、Barman、pgBackRest）、加密備份、時間點復原 (PITR)、跨區域複製、醫療保健的
  RTO/RPO 要求、DR 測試程序、業務連續性規劃以及 Patroni 的自動故障轉移。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 20
section_title: 第 5 部分：合規性、稽核與資料保護
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: 建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-4520" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-4520)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1078" cy="184" r="36" fill="#fbbf24" opacity="0.09"/>
    <circle cx="1056" cy="62" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="1034" cy="200" r="34" fill="#fbbf24" opacity="0.07"/>
    <circle cx="1012" cy="78" r="18" fill="#fbbf24" opacity="0.11"/>
    <circle cx="990" cy="216" r="32" fill="#fbbf24" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <line x1="600" y1="144" x2="1100" y2="224" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="174" x2="1050" y2="244" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="977.7749907475932,124.5 977.7749907475932,163.5 944,183 910.2250092524068,163.5 910.2250092524068,124.50000000000001 944,105" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ 建築 — 第 20 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 20 課：備份、災難復原和</tspan>
      <tspan x="60" dy="42">業務連續性</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 5 部分：合規性、稽核與資料保護</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 1. 醫療保健災難復原概述

![災難復原和業務連續性 - 衛生系統的 RPO/RTO](/storage/uploads/2026/04/healthcare-disaster-recovery.webp)

HIPAA 安全規則 §164.308(a)(7) 要求每個處理 ePHI 的組織都制定**應急計劃** — 針對緊急情況（自然災害、勒索軟體攻擊、硬體故障、人為錯誤）的應急計劃。在醫療保健領域，**停機時間會直接影響病患的生活**。

### 1.1。 HIPAA 緊急應變計劃要求

**HIPAA 應急計劃 — §164.308(a)(7)：**

1. **資料備份計畫** [必填]
   - 創建並維護 ePHI 的精確副本
   - 定期備份計劃
   - 備份驗證
2. **災難復原計畫** [必填]
   - 恢復遺失資料的程序
   - 從備份中恢復
   - 測試恢復程序
3. **緊急模式操作計畫** [必填]
   - 在緊急情況下繼續關鍵操作
   - 在緊急情況下保護 ePHI
   - 優先考慮病人安全系統
4. **測試和修訂程序** [可尋址]
   - 定期測試應急計劃
   - 根據測試結果更新計劃
5. **應用與資料關鍵性分析** [可尋址]
   - 識別關鍵應用程式
   - 優先恢復訂單

### 1.2。醫療保健領域的 RTO/RPO 要求

![RTO/RPO Timeline cho Healthcare Systems](/storage/uploads/2026/04/healthcare-rto-rpo-timeline.webp)

|系統|復原點目標 | RTO |關鍵性|
|--------|-----|-----|------------|
| EHR（病歷）| 0-1分鐘| <15min | Critical |
| Lab Results | <5min | <30min | Critical |
| Pharmacy | <5min | <30min | Critical |
| Patient Portal | <1hr | <4hr | Important |
| Billing | <4hr | <8hr | Standard |
| Analytics | <24hr | <24hr | Low |
| Audit Logs | 0 | <1hr | Critical (HIPAA) |

**Timeline:** ◄── RPO (Data loss window) ──┤ Disaster occurs ├── RTO (Downtime window) ──►

**Target cho Critical Healthcare:** RPO ≈ 0 (synchronous replication), RTO < 15 minutes (automated failover)

## 2. PostgreSQL Backup Strategies

### 2.1。比較備份方法

| Method | Type | RPO | Speed | Size | Complexity | Use Case |
|--------|------|-----|-------|------|-----------|----------|
| `pg_dump` | Logical | Hours | Slow | Small (compressed) | Low | Small DB, schema migration |
| `pg_basebackup` | Physical | Minutes | Medium | Full DB size | Medium | Standbys, PITR |
| **pgBackRest** | Physical | Seconds | Fast | Incremental | Medium | **Production healthcare** |
| Barman | Physical | Seconds | Fast | Incremental | High | Large enterprise |
| WAL archiving | Continuous | Seconds | Minimal | WAL files | Low | PITR supplement |
| Streaming replication | Continuous | ~0 | Real-time | Full replica | Medium | HA / Failover |

### 2.2. pg_dump — Logical Backup

```bash
#!/bin/bash
# pg-logical-backup.sh
# Logical backup cho healthcare database

set -euo pipefail

DB_NAME="healthcare"
DB_USER="backup_user"
BACKUP_DIR="/var/backups/postgresql"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/${DB_NAME}_${DATE}.dump"
ENCRYPTION_KEY_FILE="/etc/healthcare/backup-encryption-key"

# Backup
echo "[$(date)] Starting logical backup: ${DB_NAME}"

pg_dump \
    --host=localhost \
    --port=5432 \
    --username="${DB_USER}" \
    --format=custom \
    --compress=9 \
    --verbose \
    --file="${BACKUP_FILE}" \
    "${DB_NAME}"

# Encrypt backup (HIPAA requirement)
echo "[$(date)] Encrypting backup..."
openssl enc -aes-256-cbc -salt \
    -in "${BACKUP_FILE}" \
    -out "${BACKUP_FILE}.enc" \
    -pass file:"${ENCRYPTION_KEY_FILE}" \
    -pbkdf2 -iter 100000

# Remove unencrypted backup
rm -f "${BACKUP_FILE}"

# Verify backup integrity
echo "[$(date)] Verifying backup..."
VERIFY_FILE=$(mktemp)
openssl enc -d -aes-256-cbc \
    -in "${BACKUP_FILE}.enc" \
    -out "${VERIFY_FILE}" \
    -pass file:"${ENCRYPTION_KEY_FILE}" \
    -pbkdf2 -iter 100000

pg_restore --list "${VERIFY_FILE}" > /dev/null 2>&1
驗證狀態=$？
rm -f“${VERIFY_FILE}”

如果 [ ${VERIFY_STATUS} -eq 0 ];然後
    echo "[$(date)] 備份驗證：透過"
    # 計算校驗和
    SHA256=$(sha256sum "${BACKUP_FILE}.enc" | awk '{print $1}')
    echo "[$(日期)] SHA256: ${SHA256}"

    # 記錄審計
    echo "{\"事件\":\"backup_completed\",\"類型\":\"邏輯\",\"資料庫\":\"${DB_NAME}\",\"檔案\":\"${BACKUP_FILE}.enc\",\"sha256\":\"${BACKUP_FILE}."$",\"sha256\":\"${256",\" +"%Y-%m-%dT%H:%M:%SZ")\"}" \
        |記錄器-t 醫療保健備份
否則。否則
    echo "[$(date)] 備份驗證：失敗"
    1號出口
菲

# 保留：保留 30 天的每日備份
echo "[$(date)] 清理舊備份（>30 天）..."
尋找“${BACKUP_DIR}”-名稱“*.dump.enc”-mtime +30-刪除

echo "[$(date)] 備份完成：${BACKUP_FILE}.enc"
```

### 2.3. WAL Archiving Configuration

```特性。屬性
# postgresql.conf - PITR 的 WAL 歸檔

# === WAL 配置 ===
wal_level = 副本
max_wal_senders = 10
wal_keep_size = 1GB

# === 存檔模式 ===
存檔模式 = 打開
archive_command = 'pgbackrest --stanza=healthcare archive-push %p'
存檔逾時= 60

# === 檢查點調整 ===
檢查點超時= 15分鐘
檢查點完成目標 = 0.9
最大瓦爾大小 = 4GB
最小瓦爾大小 = 1GB
```

## 3. pgBackRest — Production Backup Solution

### 3.1。為什麼 pgBackRest 用於醫療保健？

pgBackRest 是**推薦用於生產 PostgreSQL** 的備份解決方案，因為：

- **增量備份**：僅備份自上次備份以來的變更→快速，節省儲存空間
- **並行備份/復原**：使用多個CPU核心→減少時間
- **Built-in encryption**: AES-256-CBC encryption → HIPAA compliant
- **備份驗證**：自動驗證備份完整性
- **PITR**：從任意時間點進行時間點恢復
- **遠端備份**：備份到遠端伺服器或物件儲存（S3、GCS）

### 3.2. pgBackRest Configuration

```.ini
# /etc/pgbackrest/pgbackrest.conf

[全球]
# === 儲存庫配置 ===
repo1-型別=s3
repo1-path=/healthcare-backups
repo1-s3-bucket=醫院資料庫備份
repo1-s3-endpoint=s3.ap-southeast-1.amazonaws.com
repo1-s3-region=ap-southeast-1
repo1-s3-key=AKIAIOSFODNN7範例
repo1-s3-key-secret=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

# === 加密（需要 HIPAA）===
repo1-密碼類型=aes-256-cbc
repo1-cipher-pass=STRONG_ENCRYPTION_PASSPHRASE_HERE

# === 保留政策 ===
repo1-保留-完整=4
repo1-保留-差異=14
repo1-保留-存檔=2
repo1-retention-archive-type=完整

# === 性能 ===
最大進程=4
壓縮類型=zst
壓縮等級=6
δ=y

# === 記錄 ===
日誌等級控制台=信息
日誌等級文件=詳細信息
日誌路徑=/var/log/pgbackrest

[醫療保健]
# === 節配置 ===
pg1-path=/var/lib/postgresql/16/main
pg1-埠=5432
pg1-用戶=postgres

# === 第二個儲存庫（DR 網站）===
# repo2-type=s3
# repo2-path=/healthcare-backups-dr
# repo2-s3-bucket=hospital-db-backups-dr
# repo2-s3-endpoint=s3.ap-northeast-1.amazonaws.com
# repo2-s3-region=ap-northeast-1
# repo2-cipher-type=aes-256-cbc
# repo2-cipher-pass=DR_ENCRYPTION_PASSPHRASE
```

### 3.3. Backup Schedule

```巴什
#!/bin/bash
# pgbackrest-schedule.sh
# 醫療保健自動備份計劃

设置-euo管道故障

斯坦扎=“醫療保健”
LOG_FILE =“/var/log/pgbackrest/schedule.log”

日志（）{
    echo "[$(日期 -u +"%Y-%m-%dT%H:%M:%SZ")] $1" | tee -a“$LOG_FILE”
}

案例“${1:-}”
    满）
        # 完整備份 — 每週運行一次（週日凌晨 2:00）
        記錄“開始完整備份...”
        pgbackrest --stanza="${STANZA}" --type=完整備份
        記錄“完整備份完成”
        ;;

    差异）
        # 差異備份 — 每天運作（凌晨 2:00）
        記錄“正在開始差異備份...”
        pgbackrest --stanza="${STANZA}" --type=diff 備份
        記錄“差異備份完成”
        ;;

    增量）
        # 增量備份 — 每小時執行一次
        記錄“開始增量備份...”
        pgbackrest --stanza="${STANZA}" --type=incr 備份
        日誌“增量備份完成”
        ;;

    驗證）
        # 验证备份完整性
        記錄“開始備份驗證...”
        pgbackrest --stanza="${STANZA}" 驗證
        记录“验证完成”
        ;;

    資訊）
        pgbackrest --stanza="${STANZA}" 訊息
        ;;

    *)
        echo "用法: $0 {full|diff|incr|verify|info}"
        1號出口
        ;;
埃萨克

# 記錄備份資訊以供審計跟踪
BACKUP_INFO=$(pgbackrest --stanza="${STANZA}" --output=json 訊息 2>/dev/null)
echo "{\"event\":\"backup_schedule\",\"type\":\"${1:-unknown}\",\"stanza\":\"${STANZA}\",\"timestamp\":\"$(date -u +"%Y-%m-%dT%H:%M) \;"
    |記錄器-t 醫療保健備份
```

**Crontab Configuration:**

```巴什
# /etc/cron.d/pgbackrest-healthcare

# 每小时增量备份
0 * * * * postgres /opt/scripts/pgbackrest-schedule.sh incr

# 每天凌晨 2:00 進行差異備份
0 2 * * 1-6 postgres /opt/scripts/pgbackrest-schedule.sh 差異

# 週日凌晨 2:00 完整備份
0 2 * * 0 postgres /opt/scripts/pgbackrest-schedule.sh 完整

# 每天早上 6:00 驗證備份
0 6 * * * postgres /opt/scripts/pgbackrest-schedule.sh 驗證
```

### 3.4. Point-in-Time Recovery (PITR)

```巴什
#!/bin/bash
#pitr-restore.sh
# 醫療保健資料庫的時間點恢復

设置-euo管道故障

斯坦扎=“醫療保健”
TARGET_TIME="${1:-}"
PG_DATA =“/var/lib/postgresql/16/main”

如果[-z“$TARGET_TIME”];然後
    迴音「用法：$0 <target_time>」
    echo "範例: $0 '2024-03-15 14:30:00+07'"
    迴聲“”
    echo“可用備份：”
    pgbackrest --stanza="${STANZA}" 訊息
    1號出口
菲

echo "=== 時間點恢復 ==="
echo "目標時間：${TARGET_TIME}"
echo "節：${STANZA}"
迴聲“”
echo「警告：這將替換目前資料庫！ 」
讀-p“你確定嗎？ （是/否）：「確認

if [ "$CONFIRM" != "是" ];然後
    迴聲「已中止」。
    出口0
菲

#1.停止 PostgreSQL
echo "[$(date)] 正在停止 PostgreSQL..."
systemctl 停止 postgresql

#2.執行 PITR 恢復
echo "[$(date)] 開始 PITR 恢復至：${TARGET_TIME}"
pgbackrest --stanza="${STANZA}" \
    --類型=時間\
    --target="${TARGET_TIME}" \
    --target-action=促進 \
    --德爾塔\
    恢復。恢復

＃3。啟動 PostgreSQL
echo "[$(date)] 正在啟動 PostgreSQL..."
systemctl 啟動 postgresql

# 4. 驗證資料庫
echo "[$(date)] 正在驗證資料庫..."
睡5
pg_isready -h 本機 -p 5432
如果 [ $? -eq 0]；然後
    echo "[$(date)] PostgreSQL 已準備就緒"

    # 驗證數據
    PATIENT_COUNT=$(psql -d 醫療保健 -tAc「從醫療保健.病患中選擇計數(*)」2>/dev/null)
    echo "[$(date)]病患記錄：${PATIENT_COUNT}"

    # 記錄復原事件
    echo "{\"事件\":\"pitr_restore\",\"target_time\":\"${TARGET_TIME}\",\"病人計數\":${PATIENT_COUNT},\"時間戳\":\"$(date -u +"%Y-%m-%dT%)\M
        |記錄器-t 醫療保健備份
否則。否則
    echo "[$(date)] 錯誤: PostgreSQL 恢復後無法啟動"
    1號出口
菲

echo "[$(date)] PITR 恢復成功完成"
```

## 4. Streaming Replication & Patroni

### 4.1. High Availability Architecture

```
┌──────────────────────────────────────────────────────────────┐
│ PostgreSQL HA 與 Patroni │
│ │
│ ┌──────────────────────── ──────────────────────────┐ │
│ │ HAProxy (VIP) │ │
│ │ 讀/寫 ──► 連接埠 5432 │ │
│ │ 只讀 ──► 埠 5433 │ │
│ └────────┬────────────── ────┬──────────────────────┘ │
│ │ │ │
│ ┌──────▼────────┐ ┌──────▼──────────┐ │
│ │ PostgreSQL │ │ PostgreSQL │ │
│ │ 主 │ │ 副本 │ │
│ │ (讀/寫) │ │ (唯讀) │ │
│ │ │ │ │ │
│ │ Patroni 代理程式 │ │ Patroni 代理程式 │ │
│ │ pg1:5432 │ │ pg2:5432 │ │
│ └──────┬──────────┘ └──────┬──────────┘ │
│ │ │ │
│ └────────┬────────────┘ │
│ │ │
│ ┌──────▼──────────┐ │
│ │ etcd 群集 │ │
│ │ （DCS - 共識）│ │
│ │ etcd1, etcd2, │ │
│ │ etcd3 │ │
│ └────────────────────┘ │
│ │
│ 故障轉移流程： │
│ 1. 主節點失敗 │
│ 2. Patroni 透過健康檢查進行檢測 │
│ 3. etcd 共識：選舉新的主節點 │
│ 4. Patroni 將副本提升為主 │
│ 5. HAProxy 將流量路由到新的主節點 │
│ 6.RTO < 30 seconds (automated)                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.2. Patroni Configuration

```yaml
# patroni.yml - Primary node

scope: healthcare-cluster
namespace: /healthcare/
name: pg1

restapi:
  listen: 0.0.0.0:8008
  connect_address: pg1:8008
  authentication:
    username: admin
    password: ${PATRONI_REST_PASSWORD}

etcd3:
  hosts:
    - etcd1:2379
    - etcd2:2379
    - etcd3:2379
  username: patroni
  password: ${ETCD_PASSWORD}

bootstrap:
  dcs:
    ttl: 30
    loop_wait: 10
    retry_timeout: 10
    maximum_lag_on_failover: 1048576  # 1MB WAL lag max
    synchronous_mode: true  # Synchronous replication (RPO = 0)
    synchronous_mode_strict: true
    postgresql:
      use_pg_rewind: true
      use_slots: true
      parameters:
        wal_level: replica
        max_wal_senders: 10
        max_replication_slots: 10
        wal_keep_size: 2GB
        hot_standby: "on"
        synchronous_commit: "on"  # RPO = 0 cho healthcare
        synchronous_standby_names: "*"
        # Audit logging
        log_statement: all
        log_connections: "on"
        log_disconnections: "on"
        log_line_prefix: '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h '

  initdb:
    - encoding: UTF8
    - data-checksums
    - locale: en_US.UTF-8

  pg_hba:
    - local all postgres peer
    - host replication replicator 10.0.0.0/8 scram-sha-256
    - host all all 10.0.0.0/8 scram-sha-256
    - host all all 0.0.0.0/0 reject

postgresql:
  listen: 0.0.0.0:5432
  connect_address: pg1:5432
  data_dir: /var/lib/postgresql/16/main
  bin_dir: /usr/lib/postgresql/16/bin

  authentication:
    superuser:
      username: postgres
      password: ${PG_SUPERUSER_PASSWORD}
    replication:
      username: replicator
      password: ${PG_REPLICATION_PASSWORD}

  parameters:
    # Performance
    shared_buffers: 4GB
    effective_cache_size: 12GB
    work_mem: 64MB
    maintenance_work_mem: 512MB

    # WAL
    wal_level: replica
    max_wal_senders: 10
    max_replication_slots: 10
    synchronous_commit: "on"

    # Archive
    archive_mode: "on"
    archive_command: "pgbackrest --stanza=healthcare archive-push %p"

    # SSL (HIPAA)
    ssl: "on"
    ssl_cert_file: /etc/ssl/certs/pg-server.crt
    ssl_key_file: /etc/ssl/private/pg-server.key
    ssl_ca_file: /etc/ssl/certs/ca.crt

  pgpass: /tmp/pgpass

tags:
  nofailover: false
  noloadbalance: false
  clonefrom: false
  nosync: false
```

### 4.3. HAProxy Configuration

```
# haproxy.cfg - Load balancing cho PostgreSQL

global
    maxconn 1000
    log stdout local0

defaults
    mode tcp
    log global
    retries 3
    timeout connect 10s
    timeout client 30m
    timeout server 30m
    timeout check 5s

# Primary (Read/Write)
listen healthcare-primary
    bind *:5432
    option httpchk OPTIONS /primary
    http-check expect status 200
    default-server inter 3s fall 3 rise 2 on-marked-down shutdown-sessions
    server pg1 pg1:5432 maxconn 500 check port 8008
    server pg2 pg2:5432 maxconn 500 check port 8008

# Replicas (Read-Only)
listen healthcare-replica
    bind *:5433
    option httpchk OPTIONS /replica
    http-check expect status 200
    balance roundrobin
    default-server inter 3s fall 3 rise 2 on-marked-down shutdown-sessions
    server pg1 pg1:5432 maxconn 300 check port 8008
    server pg2 pg2:5432 maxconn 300 check port 8008

# Patroni REST API
listen patroni-api
    bind *:8008
    mode http
    option httpchk GET /health
    default-server inter 5s fall 3 rise 2
    server pg1 pg1:8008 check
    server pg2 pg2:8008 check

# Stats
listen stats
    bind *:7000
    mode http
    stats enable
    stats uri /
    stats refresh 10s
```

### 4.4. Docker Compose cho HA Stack

```yaml
# docker-compose-ha.yml
version: '3.8'

services:
  # === etcd Cluster ===
  etcd1:
    image: quay.io/coreos/etcd:v3.5.12
    container_name: etcd1
    environment:
      ETCD_NAME: etcd1
      ETCD_INITIAL_ADVERTISE_PEER_URLS: http://etcd1:2380
      ETCD_LISTEN_PEER_URLS: http://0.0.0.0:2380
      ETCD_LISTEN_CLIENT_URLS: http://0.0.0.0:2379
      ETCD_ADVERTISE_CLIENT_URLS: http://etcd1:2379
      ETCD_INITIAL_CLUSTER: etcd1=http://etcd1:2380,etcd2=http://etcd2:2380,etcd3=http://etcd3:2380
      ETCD_INITIAL_CLUSTER_STATE: new
    volumes:
      - etcd1_data:/etcd-data

  etcd2:
    image: quay.io/coreos/etcd:v3.5.12
    container_name: etcd2
    environment:
      ETCD_NAME: etcd2
      ETCD_INITIAL_ADVERTISE_PEER_URLS: http://etcd2:2380
      ETCD_LISTEN_PEER_URLS: http://0.0.0.0:2380
      ETCD_LISTEN_CLIENT_URLS: http://0.0.0.0:2379
      ETCD_ADVERTISE_CLIENT_URLS: http://etcd2:2379
      ETCD_INITIAL_CLUSTER: etcd1=http://etcd1:2380,etcd2=http://etcd2:2380,etcd3=http://etcd3:2380
      ETCD_INITIAL_CLUSTER_STATE: new
    volumes:
      - etcd2_data:/etcd-data

  etcd3:
    image: quay.io/coreos/etcd:v3.5.12
    container_name: etcd3
    environment:
      ETCD_NAME: etcd3
      ETCD_INITIAL_ADVERTISE_PEER_URLS: http://etcd3:2380
      ETCD_LISTEN_PEER_URLS: http://0.0.0.0:2380
      ETCD_LISTEN_CLIENT_URLS: http://0.0.0.0:2379
      ETCD_ADVERTISE_CLIENT_URLS: http://etcd3:2379
      ETCD_INITIAL_CLUSTER: etcd1=http://etcd1:2380,etcd2=http://etcd2:2380,etcd3=http://etcd3:2380
      ETCD_INITIAL_CLUSTER_STATE: new
    volumes:
      - etcd3_data:/etcd-data

  # === PostgreSQL + Patroni ===
  pg1:
    image: postgres:16-bookworm
    container_name: pg1
    environment:
      PATRONI_SCOPE: healthcare-cluster
      PATRONI_NAME: pg1
      PATRONI_POSTGRESQL_DATA_DIR: /var/lib/postgresql/data
      PATRONI_POSTGRESQL_CONNECT_ADDRESS: pg1:5432
      PATRONI_RESTAPI_CONNECT_ADDRESS: pg1:8008
      PATRONI_ETCD3_HOSTS: "'etcd1:2379','etcd2:2379','etcd3:2379'"
      PG_SUPERUSER_PASSWORD: ${PG_SUPERUSER_PASSWORD}
      PG_REPLICATION_PASSWORD: ${PG_REPLICATION_PASSWORD}
    volumes:
      - pg1_data:/var/lib/postgresql/data
      - ./config/patroni.yml:/etc/patroni.yml
    ports:
      - "5432"
    depends_on:
      - etcd1
      - etcd2
      - etcd3

  pg2:
    image: postgres:16-bookworm
    container_name: pg2
    environment:
      PATRONI_SCOPE: healthcare-cluster
      PATRONI_NAME: pg2
      PATRONI_POSTGRESQL_DATA_DIR: /var/lib/postgresql/data
      PATRONI_POSTGRESQL_CONNECT_ADDRESS: pg2:5432
      PATRONI_RESTAPI_CONNECT_ADDRESS: pg2:8008
      PATRONI_ETCD3_HOSTS: "'etcd1:2379','etcd2:2379','etcd3:2379'"
      PG_SUPERUSER_PASSWORD: ${PG_SUPERUSER_PASSWORD}
      PG_REPLICATION_PASSWORD: ${PG_REPLICATION_PASSWORD}
    volumes:
      - pg2_data:/var/lib/postgresql/data
      - ./config/patroni.yml:/etc/patroni.yml
    ports:
      - "5432"
    depends_on:
      - etcd1
      - etcd2
      - etcd3

  # === HAProxy ===
  haproxy:
    image: haproxy:2.9
    container_name: haproxy
    volumes:
      - ./config/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg:ro
    ports:
      - "5432:5432"   # Primary (R/W)
      - "5433:5433"   # Replica (R/O)
      - "7000:7000"   # Stats
    depends_on:
      - pg1
      - pg2

volumes:
  etcd1_data:
  etcd2_data:
  etcd3_data:
  pg1_data:
  pg2_data:
```

## 5. Cross-Region Replication cho DR

### 5.1. Cross-Region Architecture

![Cross-Region DR Architecture — Singapore (Primary) → Tokyo (DR)](/storage/uploads/2026/04/healthcare-cross-region-dr.webp)

**PRIMARY REGION** (ap-southeast-1: Singapore):

- pg-primary (R/W) → pg-replica (R/O) — sync replication
- WAL 串流（非同步）到 DR 區域

**DR REGION** (ap-northeast-1: Tokyo):

- pg-dr (async replica, read-only) — Lag: < 1 minute
- pgBackRest S3 backup (encrypted)
- Standby microservices (cold/warm)

**Failover:** DNS switch + Patroni promote DR — **RPO < 1 minute**, **RTO < 15 minutes** (automated)

### 5.2. DR Replication Setup

```bash
#!/bin/bash
# setup-dr-replica.sh
# Setup cross-region DR replica

set -euo pipefail

PRIMARY_HOST="pg-primary.ap-southeast-1.hospital.internal"
DR_HOST="pg-dr.ap-northeast-1.hospital.internal"
REPLICATION_USER="replicator"
PG_DATA="/var/lib/postgresql/16/main"

echo "=== Setting up DR Replica ==="
echo "Primary: ${PRIMARY_HOST}"
echo "DR: ${DR_HOST}"

# 1. Stop PostgreSQL on DR node
systemctl stop postgresql

# 2. Backup existing data
if [ -d "${PG_DATA}" ]; then
    mv "${PG_DATA}" "${PG_DATA}.backup.$(date +%Y%m%d)"
fi

# 3. Base backup from primary
pg_basebackup \
    --host="${PRIMARY_HOST}" \
    --port=5432 \
    --username="${REPLICATION_USER}" \
    --pgdata="${PG_DATA}" \
    --wal-method=stream \
    --checkpoint=fast \
    --progress \
    --verbose

# 4. Configure as standby
cat > “${PG_DATA}/postgresql.auto.conf” << EOF
# DR Replica Configuration
primary_conninfo = 'host=${PRIMARY_HOST} port=5432 user=${REPLICATION_USER} password=${PG_REPLICATION_PASSWORD} sslmode=verify-full sslcert=/etc/ssl/certs/pg-client.crt sslkey=/etc/ssl/private/pg-client.key sslrootcert=/etc/ssl/certs/ca.crt application_name=dr-replica'
primary_slot_name = 'dr_replica'
recovery_target_timeline = 'latest'
restore_command = 'pgbackrest --stanza=healthcare archive-get %f "%p"'

# Performance
max_standby_streaming_delay = 30s
max_standby_archive_delay = 60s
hot_standby = on
hot_standby_feedback = on
EOF

# 5. Create standby signal
touch "${PG_DATA}/standby.signal"

# 6. Fix permissions
chown -R postgres:postgres "${PG_DATA}"
chmod 700 "${PG_DATA}"

# 7. Start PostgreSQL
systemctl start postgresql

# 8. Verify replication
sleep 5
REPLAY_LAG=$(psql -h localhost -tAc \
    "SELECT EXTRACT(EPOCH FROM replay_lag) FROM pg_stat_wal_receiver" 2>/dev/空)
echo "複製延遲: ${REPLAY_LAG:-N/A} 秒"

echo "==== DR 副本設定完成 =="
```

## 6. Microservices State Recovery

### 6.1. Recovery Scope

| Component | State | Recovery |
|-----------|-------|----------|
| PostgreSQL | Patient data (PHI) | PITR/Replica |
| Kafka | Consumer offsets | Reset offset |
| Kafka | Topic data | Replay logs |
| Keycloak | Realm, users, roles | Realm export |
| HashiCorp Vault | Encryption keys | Snapshot |
| Elasticsearch | Audit logs | Snapshot |
| Application Config | ConfigMaps, Secrets | Git + Velero |
| Container Images | Docker images | Registry |
| Certificates | TLS certs | cert-manager |

### 6.2. Kafka Consumer Offset Recovery

```巴什
#!/bin/bash
# kafka-recovery.sh
# 恢復 Kafka 消費者偏移量和主題

設定-euo管道故障

KAFKA_BOOTSTRAP="kafka.hospital.internal:9093"
GROUP_ID="病患服務"

echo "====卡夫卡恢復====

# 選項 1：重設為最新（跳過錯過的訊息）
echo“正在將消費者群組重置為最新...”
kafka-consumer-groups.sh\
    --bootstrap-server "${KAFKA_BOOTSTRAP}" \
    --group "${GROUP_ID}" \
    --重設偏移量\
    --到最新的\
    --所有主題\
    --執行\
    --command-config /etc/kafka/client.properties

# 選項 2：重設為特定時間戳
# kafka-consumer-groups.sh\
# --bootstrap-server "${KAFKA_BOOTSTRAP}" \
# --group "${GROUP_ID}" \
# --重設偏移量 \
# --to-datetime "2024-03-15T00:00:00.000" \
# --所有主題 \
#--執行\
# --command-config /etc/kafka/client.properties

# 選項 3：重設為特定偏移量
# kafka-consumer-groups.sh\
# --bootstrap-server "${KAFKA_BOOTSTRAP}" \
# --group "${GROUP_ID}" \
# --重設偏移量 \
# --to-offset 12345 \
# --topic Healthcare.Patent-events \
#--執行\
# --command-config /etc/kafka/client.properties

echo "目前消費群組狀態："
kafka-consumer-groups.sh\
    --bootstrap-server "${KAFKA_BOOTSTRAP}" \
    --group "${GROUP_ID}" \
    --描述\
    --command-config /etc/kafka/client.properties
```

### 6.3. Keycloak Realm Backup & Restore

```巴什
#!/bin/bash
# keycloak-backup.sh
# 備份Keycloak領域配置

設定-euo管道故障

KC_URL="${KEYCLOAK_URL:-http://keycloak:8080}」
領域=“醫療保健”
BACKUP_DIR =“/ var / backups / keycloak”
日期=$(日期+%Y%m%d_%H%M%S)

# 取得管理員令牌
TOKEN=$(curl -s -X POST "${KC_URL}/realms/master/protocol/openid-connect/token" \
    -d“client_id=admin-cli”\
    -d“用戶名=admin”\
    -d「密碼=${KC_ADMIN_PASSWORD}」\
    -d "grant_type=密碼" | jq -r '.access_token')

# 匯出領域（包括使用者、角色、客戶端、群組）
echo "正在導出領域: ${REALM}"
curl -s -H "授權：持有者 ${TOKEN}" \
    “${KC_URL}/admin/realms/${REALM}”\
    -o "${BACKUP_DIR}/realm-${REALM}-${DATE}.json"

# 單獨匯出使用者（具有完整復原的憑證）
curl -s -H "授權：持有者 ${TOKEN}" \
    “${KC_URL}/admin/realms/${REALM}/users?max=10000”\
    -o“${BACKUP_DIR}/users-${REALM}-${DATE}.json”

# 加密備份
openssl enc -aes-256-cbc -salt \
    -在「${BACKUP_DIR}/realm-${REALM}-${DATE}.json」\
    -out "${BACKUP_DIR}/realm-${REALM}-${DATE}.json.enc" \
    -pass 檔案：/etc/healthcare/備份加密金鑰\
    -pbkdf2 -iter 100000

rm "${BACKUP_DIR}/realm-${REALM}-${DATE}.json"

echo "Keycloak 領域備份：${BACKUP_DIR}/realm-${REALM}-${DATE}.json.enc"
```

## 7. 使用 Velero 進行 Kubernetes 災難復原

### 7.1. Velero Configuration

```yaml
# velero-install.yaml
api版本：v1
種類：命名空間
元數據：
  姓名：維萊羅
---
# Velero 安裝值
# helm 安裝 velero vmware-tanzu/velero -f velero-values.yaml -n velero
配置：
  備份儲存位置：
    - 名稱：預設
      提供者：AWS
      儲存桶：hospital-k8s-backups
      配置：
        區域：ap-southeast-1
        s3ForcePathStyle：true
  磁碟區快照位置：
    - 名稱：預設
      提供者：AWS
      配置：
        區域：ap-southeast-1

憑據：
  使用秘密：true
  秘密內容：
    雲：|
      [預設]
      aws_access_key_id=AKIAIOSFODNN7範例
      aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

初始容器：
  - 姓名：velero-plugin-for-aws
    圖：velero/velero-plugin-for-aws:v1.9.0
    體積安裝：
      - 名稱：插件
        掛載路徑：/目標

defaultVolumesToFsBackup：true

時間表：
  醫療保健日報：
    時間表：“0 3 * * *”
    模板：
      ttl: "720h0m0s" # 30 天
      包含的命名空間：
        - 醫療保健
      標籤選擇器：
        匹配標籤：
          備份：“真”
      快照磁碟區：true
      儲存位置：預設
```

### 7.2. Velero Backup & Restore Commands

```巴什
#!/bin/bash
#velero-healthcare.sh
# 用於醫療保健的 Kubernetes 災難復原操作

案例“${1:-}”
    備份）
        echo“建立醫療保健名稱空間備份...”
        velero 備份建立醫療保健-$(日期 +%Y%m%d-%H%M) \
            --include-命名空間醫療保健\
            --快照磁碟區 \
            --default-volumes-to-fs-backup \
            --等等
        ;;

    恢復）
        BACKUP_NAME="${2:-}"
        如果[-z“$BACKUP_NAME”];然後
            echo“可用備份：”
            velero 備份取得 | grep 醫療保健
            1號出口
        菲

        echo "從備份還原: ${BACKUP_NAME}"
        velero 恢復建立 \
            --from-backup "${BACKUP_NAME}" \
            --include-命名空間醫療保健\
            --恢復磁碟區\
            --等等
        ;;

    列表）
        echo "==== 備份 ==="
        velero 備份取得 | grep 醫療保健
        迴聲“”
        echo "=== 恢復 ===
        velero 恢復 取得 | grep 醫療保健
        ;;

    *)
        echo "用法: $0 {備份|恢復 <backup-name>|列表}”
        ;;
埃薩克
```

## 8. DR Testing & Validation

### 8.1. DR Test Runbook

**Healthcare DR Test Runbook:**

**Pre-Test (T-1 week):**

- [ ] Notify all stakeholders
- [ ] Verify backup integrity (`pgbackrest verify`)
- [ ] Confirm DR environment is ready
- [ ] Review escalation contacts
- [ ] Prepare rollback plan

**Test Execution:**

- [ ] T+0:00 — Simulate primary failure
- [ ] T+0:01 — Verify automated failover triggered
- [ ] T+0:05 — Verify DR database accessible
- [ ] T+0:10 — Verify application connectivity
- [ ] T+0:15 — Verify PHI data integrity (record counts)
- [ ] T+0:20 — Test critical operations: Patient lookup, Lab result entry, Prescription creation, Audit log writing
- [ ] T+0:30 — Verify audit trail continuity
- [ ] T+0:45 — Performance benchmarks

**Post-Test:**

- [ ] Document actual RTO achieved
- [ ] Document actual RPO (data loss)
- [ ] Document any issues encountered
- [ ] Update DR plan based on findings
- [ ] Failback to primary
- [ ] Verify failback successful
- [ ] Submit test report to compliance

**Frequency:** Quarterly (HIPAA Addressable §164.308(a)(7)(iv))

### 8.2. Automated DR Test Script

```巴什
#!/bin/bash
# 博士測試.sh
# 用於醫療保健系統的自動化 DR 測試腳本

設定-euo管道故障

DR_HOST="${DR_HOST:-pg-dr.hospital.internal}"
DR_PORT="${DR_PORT:-5432}"
DR_DB="醫療保健"
DR_USER="應用程式使用者"
REPORT_FILE="dr-test-report-$(日期 +%Y%m%d_%H%M%S).json"

通過=0
失敗=0
TOTAL_START=$(年代 +%s)

日誌測試（）{
    本地測試名稱=$1
    本地狀態=$2
    本地持續時間=$3
    本地詳細資料=$4

    如果[“$status”=“PASS”];然後（（透過++））；否則（（失敗++））；菲

    echo "{\"test\":\"${test_name}\",\"status\":\"${status}\",\"duration_ms\":${duration},\"details\":\"${details}\"}" >> "${REPORT_FILE}"
    echo "[$status] ${test_name} (${duration}ms): ${details}"
}

echo "=== 醫療保健 DR 測試 - $(date) ===" |三通“${REPORT_FILE}”

# 測試1：資料庫連接
開始=$(日期+%s%N)
如果 pg_isready -h "$DR_HOST" -p "$DR_PORT" -d "$DR_DB" > /dev/null 2>&1;然後
    持續時間=$((($(日期+%s%N) - 開始)/1000000))
    log_test“db_connectivity”“PASS”“$DURATION”“PostgreSQL 正在接受連接”
否則。否則
    持續時間=$((($(日期+%s%N) - 開始)/1000000))
    log_test“db_connectivity”“失敗”“$DURATION”“無法連接到災難復原資料庫”
菲

# 測試 2：病患資料完整性
開始=$(日期+%s%N)
PATIENT_COUNT=$(psql -h "$DR_HOST" -p "$DR_PORT" -U "$DR_USER" -d "$DR_DB" \
    -tAc「從醫療保健.病患中選擇計數（*）」2>/dev/null ||回顯「0」）
持續時間=$((($(日期+%s%N) - 開始)/1000000))
如果 [“$PATIENT_COUNT”-gt 0]；然後
    log_test "patent_data_integrity" "PASS" "$DURATION" "病患記錄：${PATIENT_COUNT}"
否則。否則
    log_test“patent_data_integrity”“失敗”“$DURATION”“未找到患者記錄”
菲

# 測試3：審核日誌完整性
開始=$(日期+%s%N)
AUDIT_COUNT=$(psql -h "$DR_HOST" -p "$DR_PORT" -U "$DR_USER" -d "$DR_DB" \
    -tAc「從compliance.audit_logs中選擇COUNT（*）」2>/dev/null ||回顯「0」）
持續時間=$((($(日期+%s%N) - 開始)/1000000))
如果[“$AUDIT_COUNT”-gt 0];然後
    log_test "audit_log_integrity" "PASS" "$DURATION" "審核日誌條目：${AUDIT_COUNT}"
否則。否則
    log_test“audit_log_integrity”“失敗”“$DURATION”“沒有審核日誌條目”
菲

# 測試 4：複製滯後
開始=$(日期+%s%N)
LAG=$(psql -h "$DR_HOST" -p "$DR_PORT" -U "$DR_USER" -d "$DR_DB" \
    -tAc「選擇擷取（從現在開始的紀元（）-pg_last_xact_replay_timestamp（））::INTEGER」2>/dev/null ||回顯「-1」）
持續時間=$((($(日期+%s%N) - 開始)/1000000))
如果[“$LAG”-ge 0]&&[“$LAG”-lt 300];然後
    log_test "replication_lag" "PASS" "$DURATION" "滯後：${LAG}s (< 5 min)"
else
    log_test "replication_lag" "FAIL" "$DURATION" "Lag: ${LAG}s (too high or unknown)"
fi

# Test 5: Encrypted columns readable
START=$(date +%s%N)
ENCRYPTED=$(psql -h "$DR_HOST" -p "$DR_PORT" -U "$DR_USER" -d "$DR_DB" \
    -tAc "SELECT full_name FROM healthcare.patients LIMIT 1" 2>/dev/null ||回顯「錯誤」）
持續時間=$((($(日期+%s%N) - 開始)/1000000))
if [[ "$ENCRYPTED" == 保險庫:* ]] || [“$ENCRYPTED”！ =“錯誤”];然後
    log_test“encrypted_data_access”“PASS”“$DURATION”“加密欄可存取”
否則。否則
    log_test“encrypted_data_access”“失敗”“$DURATION”“無法讀取加密列”
菲

# 測驗6：寫入能力（提升後）
開始=$(日期+%s%N)
WRITE_TEST=$(psql -h "$DR_HOST" -p "$DR_PORT" -U "$DR_USER" -d "$DR_DB" \
    -tAc "選擇 pg_is_in_recovery()" 2>/dev/null ||回顯「錯誤」）
持續時間=$((($(日期+%s%N) - 開始)/1000000))
如果[“$WRITE_TEST”=“f”];然後
    log_test "write_capability" "PASS" "$DURATION" "資料庫處於讀寫模式"
elif [“$WRITE_TEST”=“t”];然後
    log_test“write_capability”“PASS”“$DURATION”“資料庫正在恢復（副本）-寫入需要提升”
否則。否則
    log_test“write_capability”“失敗”“$DURATION”“無法確定資料庫模式”
菲

#總結
TOTAL_DURATION=$(( $(日期 +%s) - TOTAL_START ))
總計=$((通過 + 失敗))

迴聲“”
echo "==== DR 測試摘要 =="
echo "總測試數: ${TOTAL}"
echo "通過：${PASS}"
echo "失敗: ${FAIL}"
echo "持續時間: ${TOTAL_DURATION}s"

如果[“$FAIL”-eq 0];然後
    echo“結果：所有測試均已通過”
否則。否則
    echo "結果：${FAIL} 測試失敗 — 檢查並修復"
菲
```

## 9. Backup & DR Checklist

### 9.1. Comprehensive Healthcare DR Checklist

| # | Item | Frequency | Owner | Status |
|---|------|-----------|-------|--------|
| 1 | Full database backup (pgBackRest) | Weekly | DBA | |
| 2 | Differential backup | Daily | DBA | |
| 3 | Incremental backup | Hourly | Automated | |
| 4 | Backup encryption verification | Weekly | Security | |
| 5 | Backup integrity check (pgbackrest verify) | Daily | Automated | |
| 6 | PITR test restore | Monthly | DBA | |
| 7 | Replication lag monitoring | Real-time | Monitoring | |
| 8 | DR failover test | Quarterly | DR Team | |
| 9 | Full DR simulation | Annually | All Teams | |
| 10 | Keycloak realm backup | Daily | DevOps | |
| 11 | Vault snapshot | Daily | Security | |
| 12 | Kafka topic backup | Daily | DevOps | |
| 13 | Kubernetes state backup (Velero) | Daily | DevOps | |
| 14 | Audit log backup verification | Weekly | Compliance | |
| 15 | DR documentation review | Quarterly | DR Lead | |
| 16 | Backup retention check (6-year HIPAA) | Monthly | Compliance | |
| 17 | Cross-region backup sync | Real-time | Automated | |
| 18 | Emergency contact list update | Quarterly | Management | |
| 19 | RPO/RTO metrics review | Monthly | DR Lead | |
| 20 | Compliance report submission | Annually | CISO | |

### 9.2. Backup Monitoring Queries

```sql
-- 監控備份狀態與健康狀況

-- 1.檢查WAL歸檔狀態
選擇
    已歸檔計數，
    最後存檔的wal，
    最後存檔時間，
    失敗計數，
    最後失敗的沃爾，
    最後失敗時間
來自 pg_stat_archiver；

-- 2. 複製滯後
選擇
    客戶端地址，
    應用程式名稱，
    狀態，
    發送_LSN，
    寫_LSN，
    刷新_lsn，
    重播_lsn，
    pg_wal_lsn_diff(sent_lsn, replay_lsn) AS lag_bytes,
    寫入滯後，
    刷新滯後，
    重播延遲
來自 pg_stat_replication;

-- 3. 複製槽狀態
選擇
    插槽名稱，
    插槽類型，
    活躍,
    重新啟動_lsn，
    確認_flush_lsn，
    pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn) AS slot_lag_bytes
來自 pg_replication_slots；

-- 4. 資料庫大小（用於備份規劃）
選擇
    pg_database.datname AS 資料庫名稱，
    pg_size_pretty(pg_database_size(pg_database.datname)) AS 大小
來自 pg_database
ORDER BY pg_database_size(pg_database.datname) DESC;

-- 5. 表大小（決定用於備份最佳化的最大表）
選擇
    架構名 || '.' ||表名 AS 表名，
    pg_size_pretty(pg_total_relation_size(schemaname || '.' || 表名)) AS Total_size,
    pg_size_pretty(pg_relation_size(schemaname || '.' || 表名)) AS table_size,
    pg_size_pretty(pg_indexes_size(schemaname || '.' || 表名)) AS index_size
來自 pg_tables
WHERE schemaname IN ('醫療保健', '合規性')
ORDER BY pg_total_relation_size(schemaname || '.' || 表名) DESC
限制 20；
```

＃＃ 概括

在本課程中，我們為醫療保健建立了全面的**備份、災難復原和業務連續性**：

1. **HIPAA 緊急應變計畫**：資料備份計畫、災難復原計畫、緊急模式操作 — 符合 §164.308(a)(7)
2. **RTO/RPO 要求**：關鍵系統（EHR、實驗室）需要 RPO < 1 分鐘，RTO < 15 分鐘；確定關鍵級別
3. **PostgreSQL備份**：pg_dump（邏輯），pg_basebackup（物理），按RPO/速度/複雜性比較方法
4. **pgBackRest**：生產備份解決方案，具有增量備份、AES-256加密、S3儲存、自動調度（每小時/每天/每週）
5. **PITR**：從WAL存檔進行時間點復原－將資料庫還原到任何特定時間點
6. **Patroni HA**：具有 etcd 共識的自動故障轉移、同步複製 (RPO = 0)、HAProxy 負載平衡
7. **跨區域災難復原**：非同步複製到災難復原區域、加密的 WAL 流、故障轉移過程
8. **Microservices Recovery**: Kafka consumer offset reset, Keycloak realm export, Vault snapshots
9. **Kubernetes DR**: Velero backup cho namespace state, PV snapshots, scheduled backups
10. **DR Testing**: Quarterly test runbook, automated DR test scripts, validation checklist

＃＃ 鍛煉

1. **pgBackRest安裝**：在本地PostgreSQL上安裝pgBackRest。節配置 `醫療保健` 與本地存儲庫。建立全量備份、新增資料、建立增量備份。驗證備份 `pgbackrest 驗證`。測試PITR：將資料庫恢復到新增資料之前的時間。

2. **Patroni HA 叢集**：部署 Docker Compose 堆疊（etcd × 3、PostgreSQL × 2、HAProxy）。驗證主/副本角色 `贊助人名單`。驗證同步複製是否有效。 Test failover: stop primary container, verify replica self-promotes.測量故障轉移時間（目標 < 30 秒）。

3. **DR Test Script**: Customize script `dr-test.sh`適合您的環境。新增測試案例：SSL 憑證有效性、應用程式端點運作狀況、API 回應時間。運行測試腳本並產生報告。修復任何故障。使用 cron 每月運行一次計劃。

4. **端對端災難復原模擬**：備份整個醫療保健堆疊（PostgreSQL + Keycloak + 設定）。模擬災難：破壞主資料庫。從備份還原 (PITR)。恢復Keycloak領域。驗證：登入Keycloak，查詢患者，審核日誌完好。文件：實際 RPO、實際 RTO、經驗教訓。

---

---

<!-- SERIES-NAV:START -->
| ◀ 上一篇 |下一篇文章 ▶ |
|:---|---:|
| [第 19 課：PHI 的資料脫敏、匿名化與去識別化](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-19-data-masking-anonymization-de-identification) | [第 21 課：醫療保健系統的零信任架構](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-21-zero-trust-architecture-he-thong-y-te) |
<!-- SERIES-NAV:END -->
