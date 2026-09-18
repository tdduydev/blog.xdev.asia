---
id: 019c9617-fd38-703b-90ac-23190c3f1a08
title: 備份和還原 PostgreSQL 綜合指南
slug: huong-dan-toan-dien-ve-backup-va-restore-postgresql
excerpt: 本文將協助您掌握從基礎到進階的 PostgreSQL 備份和復原方法，以及實用的最佳實務。
featured_image: /images/blog/postgresql-backup-featured.webp
type: blog
reading_time: 13
view_count: 0
meta: null
published_at: '2025-12-08T09:33:46.000000Z'
created_at: '2026-02-25T18:38:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9617-faa6-70d6-8679-ee4de1f177b3
  name: 開發營運
  slug: devops
tags:
  - name: postgresql
    slug: postgresql
  - name: devops
    slug: devops
  - name: Database
    slug: database
  - name: backup
    slug: backup
  - name: SystemAdmin
    slug: systemadmin
  - name: DataManagement
    slug: datamanagement
  - name: Tutorial
    slug: tutorial
comments: []
locale: zh-tw
---
<h2 id="t%E1%BA%A1i-sao-backup-quan-tr%E1%BB%8Dng">為什麼備份很重要？</h2><p>在討論技術細節之前，讓我們先回顧一個真實的故事：越南的一家科技新創公司曾經因為沒有適當的備份而失去了所有客戶資料。結果？他們花了 6 個月的時間才恢復了客戶的信任，差點破產。</p><p>備份不僅是一項技術工作，更是保護您業務的策略。</p><h2 id="ph%E1%BA%A7n-1-c%C3%A1c-ph%C6%B0%C6%A1ng-ph%C3%A1p-backup-postgresql">第 1 部分：PostgreSQL 備份方法</h2><h3 id="11-logical-backup-v%E1%BB%9Bi-pgdump">1.1.使用 pg_dump 進行邏輯備份</h3><p>這是最常用的方法，適用於大多數情況。</p><h4 id="backup-m%E1%BB%99t-database-%C4%91%C6%A1n-l%E1%BA%BB">備份單一資料庫</h4><pre><code class="language-bash"># Format SQL plain text (dễ đọc, dễ edit)
pg_dump -U postgres -d myapp_db &gt; myapp_backup.sql

# Format custom (nén tốt, restore linh hoạt)
pg_dump -U postgres -d myapp_db -F c -f myapp_backup.dump

# Format directory (backup song song, nhanh nhất)
pg_dump -U postgres -d myapp_db -F d -j 4 -f myapp_backup_dir/
</code></pre><p><strong>比較格式：</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>格式</th>
<th>優點</th>
<th>缺點</th>
<th>何時使用</th>
</tr>
</thead>
<tbody>
<tr>
<td>普通 SQL (-F p)</td>
<td>易於閱讀和編輯</td>
<td>無壓縮，恢復速度慢</td>
<td>資料庫較小，需要查看內容</td>
</tr>
<tr>
<td>自訂 (-F c)</td>
<td>良好的壓縮，選擇性恢復</td>
<td>無法直接讀取</td>
<td>大多數情況</td>
</tr>
<tr>
<td>目錄 (-F d)</td>
<td>並行備份，最快</td>
<td>需要很多文件</td>
<td>大型資料庫（>100GB）</td>
</tr>
<tr>
<td>焦油 (-F t)</td>
<td>可壓縮</td>
<td>不要並行恢復</td>
<td>很少使用</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h4 id="backup-c%C3%B3-ch%E1%BB%8Dn-l%E1%BB%8Dc">選擇性備份</h4><pre><code class="language-bash"># Chỉ backup schema (cấu trúc tables, indexes, constraints)
pg_dump -U postgres -d myapp_db --schema-only &gt; schema.sql

# Chỉ backup data
pg_dump -U postgres -d myapp_db --data-only &gt; data.sql

# Backup một table cụ thể
pg_dump -U postgres -d myapp_db -t users -t orders &gt; important_tables.sql

# Backup tất cả trừ table logs (thường rất lớn)
pg_dump -U postgres -d myapp_db -T logs &gt; backup_no_logs.sql

# Backup theo schema
pg_dump -U postgres -d myapp_db -n public -n reporting &gt; selected_schemas.sql
</code></pre><h4 id="v%C3%AD-d%E1%BB%A5-th%E1%BB%B1c-t%E1%BA%BF-backup-database-production">實例：備份資料庫製作</h4><pre><code class="language-bash">#!/bin/bash
# Script: backup_production.sh

DB_NAME="myapp_production"
DB_USER="postgres"
DB_HOST="localhost"
BACKUP_DIR="/backups/postgresql"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_${DATE}.dump"

# Tạo thư mục nếu chưa có
mkdir -p $BACKUP_DIR

# Backup với compression level 9
pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME \
    -F c -Z 9 \
    -f $BACKUP_FILE \
    --verbose

# Check kết quả
if [ $? -eq 0 ]; then
    echo "✓ Backup thành công: $BACKUP_FILE"
    SIZE=$(du -h $BACKUP_FILE | cut -f1)
    echo "✓ Kích thước: $SIZE"
else
    echo "✗ Backup thất bại!"
    exit 1
fi

# Xóa backup cũ hơn 7 ngày
find $BACKUP_DIR -name "${DB_NAME}_*.dump" -mtime +7 -delete

echo "✓ Đã xóa backup cũ hơn 7 ngày"
</code></pre><h3 id="12-backup-to%C3%A0n-b%E1%BB%99-cluster-v%E1%BB%9Bi-pgdumpall">1.2.使用pg_dumpall備份整個集群</h3><p>當您需要備份所有資料庫、角色和表空間時：</p><pre><code class="language-bash"># Backup toàn bộ
pg_dumpall -U postgres &gt; all_databases.sql

# Chỉ backup global objects (roles, tablespaces)
pg_dumpall -U postgres --globals-only &gt; globals.sql

# Chỉ backup roles
pg_dumpall -U postgres --roles-only &gt; roles.sql
</code></pre><p><strong>何時使用 pg_dumpall？</strong></p><ul><li>將整個 PostgreSQL 伺服器遷移到新機器時</li><li>當您需要同時備份使用者權限和角色時</li><li>當有多個資料庫相互關聯時</li></ul><h3 id="13-physical-backup-v%E1%BB%9Bi-base-backup">1.3.實體備份與基礎備份</h3><p>這是一種檔案系統層級的備份方法，適用於非常大的資料庫。</p><pre><code class="language-bash"># Bước 1: Tạo base backup
pg_basebackup -U postgres -D /backups/base -F tar -z -P

# Bước 2: Configure WAL archiving (trong postgresql.conf)
wal_level = replica
archive_mode = on
archive_command = 'test ! -f /backups/wal/%f &amp;&amp; cp %p /backups/wal/%f'
max_wal_senders = 3
</code></pre><p><strong>優點：</strong></p><ul><li>對於大型資料庫（TB 級）非常快</li><li>時間點恢復 (PITR) 支持</li><li>可用於複製</li></ul><p><strong>缺點：</strong></p><ul><li>比邏輯備份更複雜</li><li>必須備份整個集群，不能選擇單一資料庫</li><li>復原時需要相同的 PostgreSQL 版本</li></ul><h2 id="ph%E1%BA%A7n-2-restore-postgresql">第 2 部分：復原 PostgreSQL</h2><h3 id="21-restore-t%E1%BB%AB-sql-file">2.1.從 SQL 檔案恢復</h3><pre><code class="language-bash"># Tạo database mới (nếu cần)
createdb -U postgres myapp_db_restored

# Restore từ SQL file
psql -U postgres -d myapp_db_restored &lt; myapp_backup.sql

# Restore với error handling
psql -U postgres -d myapp_db_restored \
    -v ON_ERROR_STOP=1 \
    --echo-errors \
    &lt; myapp_backup.sql
</code></pre><h3 id="22-restore-t%E1%BB%AB-customdirectory-format">2.2.從自訂/目錄格式恢復</h3><pre><code class="language-bash"># Restore cơ bản
pg_restore -U postgres -d myapp_db myapp_backup.dump

# Restore với clean (xóa objects cũ trước)
pg_restore -U postgres -d myapp_db -c myapp_backup.dump

# Restore song song (nhanh hơn nhiều)
pg_restore -U postgres -d myapp_db -j 4 myapp_backup.dump

# Restore chỉ một table
pg_restore -U postgres -d myapp_db -t users myapp_backup.dump

# Restore vào database mới
pg_restore -U postgres -d postgres -C myapp_backup.dump
</code></pre><h3 id="23-restore-script-ho%C3%A0n-ch%E1%BB%89nh">2.3.恢復完整腳本</h3><pre><code class="language-bash">#!/bin/bash
# Script: restore_database.sh

BACKUP_FILE=$1
NEW_DB_NAME=$2

if [ -z "$BACKUP_FILE" ] || [ -z "$NEW_DB_NAME" ]; then
    echo "Usage: $0 &lt;backup_file&gt; &lt;new_db_name&gt;"
    exit 1
fi

echo "→ Kiểm tra file backup..."
if [ ! -f "$BACKUP_FILE" ]; then
    echo "✗ File không tồn tại: $BACKUP_FILE"
    exit 1
fi

echo "→ Tạo database mới: $NEW_DB_NAME"
createdb -U postgres $NEW_DB_NAME

if [ $? -ne 0 ]; then
    echo "✗ Không thể tạo database"
    exit 1
fi

echo "→ Đang restore..."
pg_restore -U postgres -d $NEW_DB_NAME -j 4 --verbose $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo "✓ Restore thành công!"
    echo "→ Thông tin database:"
    psql -U postgres -d $NEW_DB_NAME -c "\dt"
else
    echo "✗ Restore thất bại!"
    exit 1
fi
</code></pre><h2 id="ph%E1%BA%A7n-3-strategies-v%C3%A0-best-practices">第 3 部分：策略與最佳實踐</h2><h3 id="31-chi%E1%BA%BFn-l%C6%B0%E1%BB%A3c-backup-3-2-1">3.1.備份策略3-2-1</h3><p>這是備份的黃金法則：</p><ul><li><strong>3</strong> 資料的副本</li><li><strong>2</strong> 不同的媒體類型（例如磁碟和雲端）</li><li><strong>1</strong> 異地版本（在另一個實體位置）</li></ul><p>實現範例：</p><pre><code class="language-bash">#!/bin/bash
# Script: backup_strategy_321.sh

DB_NAME="myapp_production"
LOCAL_BACKUP="/backups/local"
NAS_BACKUP="/mnt/nas/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="${DB_NAME}_${DATE}.dump"

# Backup 1: Local disk
echo "→ Creating local backup..."
pg_dump -U postgres -d $DB_NAME -F c -f "$LOCAL_BACKUP/$BACKUP_NAME"

# Backup 2: NAS (different media)
echo "→ Copying to NAS..."
cp "$LOCAL_BACKUP/$BACKUP_NAME" "$NAS_BACKUP/"

# Backup 3: Cloud (offsite) - AWS S3
echo "→ Uploading to S3..."
aws s3 cp "$LOCAL_BACKUP/$BACKUP_NAME" \
    s3://mycompany-backups/postgresql/ \
    --storage-class STANDARD_IA

echo "✓ 3-2-1 backup completed!"
</code></pre><h3 id="32-backup-schedule">3.2.備份計劃</h3><p>針對不同環境的建議備份計畫：</p><p><strong>發展：</strong></p><pre><code class="language-bash"># Crontab: Backup hàng ngày lúc 2 giờ sáng
0 2 * * * /scripts/backup_dev.sh
</code></pre><p><strong>分期：</strong></p><pre><code class="language-bash"># Backup mỗi 6 giờ
0 */6 * * * /scripts/backup_staging.sh
</code></pre><p><strong>生產：</strong></p><pre><code class="language-bash"># Full backup: Mỗi ngày lúc 2 giờ sáng
0 2 * * * /scripts/full_backup_prod.sh

# Incremental backup: Mỗi giờ
0 * * * * /scripts/incremental_backup_prod.sh

# WAL archiving: Continuous
</code></pre><h3 id="33-t%E1%BB%B1-%C4%91%E1%BB%99ng-h%C3%B3a-v%E1%BB%9Bi-systemd-timer">3.3.使用 systemd 計時器實現自動化</h3><pre><code class="language-ini"># /etc/systemd/system/postgresql-backup.service
[Unit]
Description=PostgreSQL Backup Service
After=postgresql.service

[Service]
Type=oneshot
User=postgres
ExecStart=/usr/local/bin/backup_postgres.sh
StandardOutput=journal
StandardError=journal
</code></pre><pre><code class="language-ini"># /etc/systemd/system/postgresql-backup.timer
[Unit]
Description=PostgreSQL Daily Backup Timer

[Timer]
OnCalendar=daily
OnCalendar=02:00
Persistent=true

[Install]
WantedBy=timers.target
</code></pre><p>啟用定時器：</p><pre><code class="language-bash">sudo systemctl enable postgresql-backup.timer
sudo systemctl start postgresql-backup.timer
</code></pre><h3 id="34-monitoring-v%C3%A0-alerting">3.4.監控和警報</h3><p>檢查備份的腳本：</p><pre><code class="language-bash">#!/bin/bash
# Script: check_backup_health.sh

BACKUP_DIR="/backups/postgresql"
MAX_AGE_HOURS=24
SLACK_WEBHOOK="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"

# Tìm backup mới nhất
LATEST_BACKUP=$(find $BACKUP_DIR -name "*.dump" -type f -printf '%T@ %p\n' | sort -n | tail -1 | cut -f2- -d" ")

if [ -z "$LATEST_BACKUP" ]; then
    MESSAGE="⚠️ CẢNH BÁO: Không tìm thấy backup nào!"
    curl -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"$MESSAGE\"}" \
        $SLACK_WEBHOOK
    exit 1
fi

# Kiểm tra tuổi của backup
BACKUP_TIME=$(stat -c %Y "$LATEST_BACKUP")
CURRENT_TIME=$(date +%s)
AGE_HOURS=$(( ($CURRENT_TIME - $BACKUP_TIME) / 3600 ))

if [ $AGE_HOURS -gt $MAX_AGE_HOURS ]; then
    MESSAGE="⚠️ CẢNH BÁO: Backup quá cũ! Age: ${AGE_HOURS}h\nFile: $LATEST_BACKUP"
    curl -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"$MESSAGE\"}" \
        $SLACK_WEBHOOK
    exit 1
fi

# Kiểm tra kích thước backup (phải &gt; 0)
SIZE=$(stat -c %s "$LATEST_BACKUP")
if [ $SIZE -eq 0 ]; then
    MESSAGE="⚠️ CẢNH BÁO: Backup có kích thước 0 bytes!\nFile: $LATEST_BACKUP"
    curl -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"$MESSAGE\"}" \
        $SLACK_WEBHOOK
    exit 1
fi

echo "✓ Backup health check passed"
echo "  Latest: $LATEST_BACKUP"
echo "  Age: ${AGE_HOURS}h"
echo "  Size: $(du -h $LATEST_BACKUP | cut -f1)"
</code></pre><h3 id="35-testing-restore">3.5.測試恢復</h3><p><strong>重要：</strong> 如果您從未測試過恢復，備份就沒有價值！</p><pre><code class="language-bash">#!/bin/bash
# Script: test_restore.sh

BACKUP_FILE=$1
TEST_DB="test_restore_$(date +%s)"

echo "→ Testing restore from: $BACKUP_FILE"

# Tạo test database
createdb -U postgres $TEST_DB

# Restore
pg_restore -U postgres -d $TEST_DB $BACKUP_FILE

# Kiểm tra
TABLES=$(psql -U postgres -d $TEST_DB -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public'")

if [ $TABLES -gt 0 ]; then
    echo "✓ Restore test PASSED: $TABLES tables restored"
    
    # Verify data
    psql -U postgres -d $TEST_DB -c "SELECT tablename, n_live_tup FROM pg_stat_user_tables ORDER BY n_live_tup DESC LIMIT 10"
else
    echo "✗ Restore test FAILED: No tables found"
fi

# Cleanup
dropdb -U postgres $TEST_DB

echo "✓ Test completed and cleaned up"
</code></pre><h2 id="ph%E1%BA%A7n-4-troubleshooting">第 4 部分：故障排除</h2><h3 id="41-l%E1%BB%97i-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p-khi-backup">4.1.備份時常見錯誤</h3><p><strong>錯誤：“權限被拒絕”</strong></p><pre><code class="language-bash"># Solution: Chạy với user có quyền
sudo -u postgres pg_dump mydb &gt; backup.sql

# Hoặc grant quyền
GRANT CONNECT ON DATABASE mydb TO backup_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO backup_user;
</code></pre><p><strong>錯誤：“無法連接到伺服器”</strong></p><pre><code class="language-bash"># Kiểm tra PostgreSQL đang chạy
sudo systemctl status postgresql

# Kiểm tra port
netstat -tlnp | grep 5432

# Kiểm tra pg_hba.conf
sudo vim /etc/postgresql/14/main/pg_hba.conf
</code></pre><p><strong>錯誤：備份時間太長</strong></p><pre><code class="language-bash"># Solution: Dùng format directory với parallel
pg_dump -F d -j 8 -f backup_dir/ mydb

# Hoặc exclude tables lớn
pg_dump -T large_log_table mydb &gt; backup.sql
</code></pre><h3 id="42-l%E1%BB%97i-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p-khi-restore">4.2.恢復時常見錯誤</h3><p><strong>錯誤：“資料庫已存在”</strong></p><pre><code class="language-bash"># Solution 1: Drop database cũ
dropdb mydb
createdb mydb
pg_restore -d mydb backup.dump

# Solution 2: Dùng flag -c (clean)
pg_restore -c -d mydb backup.dump
</code></pre><p><strong>錯誤：“角色不存在”</strong></p><pre><code class="language-bash"># Solution: Restore roles trước
pg_dumpall --roles-only &gt; roles.sql
psql -f roles.sql

# Sau đó restore data
pg_restore -d mydb backup.dump
</code></pre><p><strong>錯誤：磁碟空間不足</strong></p><pre><code class="language-bash"># Check disk space trước khi restore
df -h

# Ước tính kích thước cần thiết (thường 2-3x backup file)
du -h backup.dump
</code></pre><h2 id="ph%E1%BA%A7n-5-advanced-topics">第 5 部分：進階主題</h2><h3 id="51-point-in-time-recovery-pitr">5.1.時間點恢復 (PITR)</h3><p>PITR 可讓您將資料庫還原到過去的特定時間。</p><p><strong>設定 WAL 歸檔：</strong></p><pre><code class="language-bash"># postgresql.conf
wal_level = replica
archive_mode = on
archive_command = 'test ! -f /wal_archive/%f &amp;&amp; cp %p /wal_archive/%f'
archive_timeout = 300  # Force WAL rotation every 5 minutes
</code></pre><p><strong>實施 PITR：</strong></p><pre><code class="language-bash"># Bước 1: Stop PostgreSQL
sudo systemctl stop postgresql

# Bước 2: Restore base backup
rm -rf /var/lib/postgresql/14/main/*
tar -xzf /backups/base.tar.gz -C /var/lib/postgresql/14/main/

# Bước 3: Tạo recovery.conf (PostgreSQL &lt; 12) hoặc recovery.signal (&gt;= 12)
cat &gt; /var/lib/postgresql/14/main/recovery.signal &lt;&lt; EOF
restore_command = 'cp /wal_archive/%f %p'
recovery_target_time = '2024-01-15 14:30:00'
recovery_target_action = 'promote'
EOF

# Bước 4: Start PostgreSQL
sudo systemctl start postgresql
</code></pre><h3 id="52-continuous-archiving-v%E1%BB%9Bi-pgbackrest">5.2.使用 pgBackRest 進行連續歸檔</h3><p>pgBackRest 是 PostgreSQL 的企業級備份工具：</p><pre><code class="language-bash"># Cài đặt
sudo apt-get install pgbackrest

# Config /etc/pgbackrest/pgbackrest.conf
[global]
repo1-path=/var/lib/pgbackrest
repo1-retention-full=2

[mydb]
pg1-path=/var/lib/postgresql/14/main

# Full backup
pgbackrest --stanza=mydb --type=full backup

# Incremental backup
pgbackrest --stanza=mydb --type=incr backup

# Restore
pgbackrest --stanza=mydb restore
</code></pre><h3 id="53-backup-v%E1%BB%9Bi-docker">5.3.使用 Docker 進行備份</h3><pre><code class="language-bash"># Backup PostgreSQL trong Docker
docker exec my_postgres_container pg_dump -U postgres mydb &gt; backup.sql

# Restore
docker exec -i my_postgres_container psql -U postgres mydb &lt; backup.sql

# Docker Compose với automated backups
version: '3.8'
services:
  postgres:
    image: postgres:14
    volumes:
      - postgres_data:/var/lib/postgresql/data
      
  backup:
    image: prodrigestivill/postgres-backup-local
    environment:
      POSTGRES_HOST: postgres
      POSTGRES_DB: mydb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      SCHEDULE: "@daily"
    volumes:
      - ./backups:/backups
</code></pre><h2 id="k%E1%BA%BFt-lu%E1%BA%ADn">結論</h2><p>備份和復原不僅是一項簡單的技術任務，也是企業資料保護策略的重要組成部分。需要記住的一些要點：</p><ol><li><strong>始終測試恢復</strong> - 備份未測試 = 無備份</li><li><strong>自動化一切</strong> - 不要依賴記住運行手動備份</li><li><strong>遵循 3-2-1 規則</strong> - 3 份，2 種媒體類型，1 份異地</li><li><strong>監控和警報</strong> - 出現問題時立即知道</li><li><strong>記錄一切</strong> - 新團隊也必須懂得如何恢復</li></ol><h3 id="checklist-cu%E1%BB%91i-c%C3%B9ng">最終清單</h3><ul><li>[ ] 備份腳本已編寫並測試</li><li>[ ] crontab/systemd 定時器已設定</li><li>[ ] 監控警報已配置</li><li>[ ] 恢復已至少測試過一次</li><li>[ ] 文檔已經寫好</li><li>[ ] 團隊已接受備份/復原流程的培訓</li><li>[ ] 設定異地備份</li><li>[ ] 保留政策已明確定義</li></ul><hr><p><strong>參考來源：</strong></p><ul><li><a href="https://www.postgresql.org/docs/current/backup.html">PostgreSQL 官方文件-備份與恢復</a></li><li><a href="https://pgbackrest.org/">pgBackRest 文檔</a></li><li><a href="https://wiki.postgresql.org/wiki/Backup_and_Recovery">PostgreSQL 備份最佳實踐</a></li></ul><p><em>本文最後更新時間：2024 年 12 月</em></p>
