---
id: 019c9617-fd38-703b-90ac-23190c3f1a08
title: Hướng Dẫn Toàn Diện về Backup và Restore PostgreSQL
slug: huong-dan-toan-dien-ve-backup-va-restore-postgresql
excerpt: >-
  Bài viết này sẽ giúp bạn nắm vững các phương pháp backup và restore PostgreSQL
  từ cơ bản đến nâng cao, kèm theo các best practices trong thực tế.
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
  name: DevOps
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
---
<h2 id="t%E1%BA%A1i-sao-backup-quan-tr%E1%BB%8Dng">Tại Sao Backup Quan Trọng?</h2><p>Trước khi đi vào chi tiết kỹ thuật, hãy cùng nhìn lại một câu chuyện có thật: Một startup công nghệ tại Việt Nam từng mất toàn bộ dữ liệu khách hàng vì không có backup đúng cách. Hệ quả? Họ mất 6 tháng để phục hồi niềm tin từ khách hàng và gần như phá sản.</p><p>Backup không chỉ là một công việc kỹ thuật, mà là một chiến lược bảo vệ doanh nghiệp của bạn.</p><h2 id="ph%E1%BA%A7n-1-c%C3%A1c-ph%C6%B0%C6%A1ng-ph%C3%A1p-backup-postgresql">Phần 1: Các Phương Pháp Backup PostgreSQL</h2><h3 id="11-logical-backup-v%E1%BB%9Bi-pgdump">1.1. Logical Backup với pg_dump</h3><p>Đây là phương pháp phổ biến nhất, phù hợp cho hầu hết các trường hợp.</p><h4 id="backup-m%E1%BB%99t-database-%C4%91%C6%A1n-l%E1%BA%BB">Backup một database đơn lẻ</h4><pre><code class="language-bash"># Format SQL plain text (dễ đọc, dễ edit)
pg_dump -U postgres -d myapp_db &gt; myapp_backup.sql

# Format custom (nén tốt, restore linh hoạt)
pg_dump -U postgres -d myapp_db -F c -f myapp_backup.dump

# Format directory (backup song song, nhanh nhất)
pg_dump -U postgres -d myapp_db -F d -j 4 -f myapp_backup_dir/
</code></pre><p><strong>So sánh các format:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Format</th>
<th>Ưu điểm</th>
<th>Nhược điểm</th>
<th>Khi nào dùng</th>
</tr>
</thead>
<tbody>
<tr>
<td>Plain SQL (-F p)</td>
<td>Dễ đọc, edit được</td>
<td>Không nén, restore chậm</td>
<td>Database nhỏ, cần xem nội dung</td>
</tr>
<tr>
<td>Custom (-F c)</td>
<td>Nén tốt, restore chọn lọc</td>
<td>Không đọc được trực tiếp</td>
<td>Hầu hết các trường hợp</td>
</tr>
<tr>
<td>Directory (-F d)</td>
<td>Backup song song, nhanh nhất</td>
<td>Tốn nhiều files</td>
<td>Database lớn (&gt;100GB)</td>
</tr>
<tr>
<td>Tar (-F t)</td>
<td>Nén được</td>
<td>Không restore song song</td>
<td>Ít dùng</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h4 id="backup-c%C3%B3-ch%E1%BB%8Dn-l%E1%BB%8Dc">Backup có chọn lọc</h4><pre><code class="language-bash"># Chỉ backup schema (cấu trúc tables, indexes, constraints)
pg_dump -U postgres -d myapp_db --schema-only &gt; schema.sql

# Chỉ backup data
pg_dump -U postgres -d myapp_db --data-only &gt; data.sql

# Backup một table cụ thể
pg_dump -U postgres -d myapp_db -t users -t orders &gt; important_tables.sql

# Backup tất cả trừ table logs (thường rất lớn)
pg_dump -U postgres -d myapp_db -T logs &gt; backup_no_logs.sql

# Backup theo schema
pg_dump -U postgres -d myapp_db -n public -n reporting &gt; selected_schemas.sql
</code></pre><h4 id="v%C3%AD-d%E1%BB%A5-th%E1%BB%B1c-t%E1%BA%BF-backup-database-production">Ví dụ thực tế: Backup database production</h4><pre><code class="language-bash">#!/bin/bash
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
</code></pre><h3 id="12-backup-to%C3%A0n-b%E1%BB%99-cluster-v%E1%BB%9Bi-pgdumpall">1.2. Backup toàn bộ cluster với pg_dumpall</h3><p>Khi bạn cần backup tất cả databases, roles, và tablespaces:</p><pre><code class="language-bash"># Backup toàn bộ
pg_dumpall -U postgres &gt; all_databases.sql

# Chỉ backup global objects (roles, tablespaces)
pg_dumpall -U postgres --globals-only &gt; globals.sql

# Chỉ backup roles
pg_dumpall -U postgres --roles-only &gt; roles.sql
</code></pre><p><strong>Khi nào dùng pg_dumpall?</strong></p><ul><li>Khi migrate toàn bộ PostgreSQL server sang máy mới</li><li>Khi cần backup cả user permissions và roles</li><li>Khi có nhiều databases liên quan đến nhau</li></ul><h3 id="13-physical-backup-v%E1%BB%9Bi-base-backup">1.3. Physical Backup với Base Backup</h3><p>Đây là phương pháp backup ở mức file system, phù hợp cho databases rất lớn.</p><pre><code class="language-bash"># Bước 1: Tạo base backup
pg_basebackup -U postgres -D /backups/base -F tar -z -P

# Bước 2: Configure WAL archiving (trong postgresql.conf)
wal_level = replica
archive_mode = on
archive_command = 'test ! -f /backups/wal/%f &amp;&amp; cp %p /backups/wal/%f'
max_wal_senders = 3
</code></pre><p><strong>Ưu điểm:</strong></p><ul><li>Rất nhanh cho database lớn (TB-level)</li><li>Hỗ trợ Point-in-Time Recovery (PITR)</li><li>Có thể dùng cho replication</li></ul><p><strong>Nhược điểm:</strong></p><ul><li>Phức tạp hơn logical backup</li><li>Phải backup cả cluster, không thể chọn database riêng lẻ</li><li>Yêu cầu cùng phiên bản PostgreSQL khi restore</li></ul><h2 id="ph%E1%BA%A7n-2-restore-postgresql">Phần 2: Restore PostgreSQL</h2><h3 id="21-restore-t%E1%BB%AB-sql-file">2.1. Restore từ SQL file</h3><pre><code class="language-bash"># Tạo database mới (nếu cần)
createdb -U postgres myapp_db_restored

# Restore từ SQL file
psql -U postgres -d myapp_db_restored &lt; myapp_backup.sql

# Restore với error handling
psql -U postgres -d myapp_db_restored \
    -v ON_ERROR_STOP=1 \
    --echo-errors \
    &lt; myapp_backup.sql
</code></pre><h3 id="22-restore-t%E1%BB%AB-customdirectory-format">2.2. Restore từ Custom/Directory format</h3><pre><code class="language-bash"># Restore cơ bản
pg_restore -U postgres -d myapp_db myapp_backup.dump

# Restore với clean (xóa objects cũ trước)
pg_restore -U postgres -d myapp_db -c myapp_backup.dump

# Restore song song (nhanh hơn nhiều)
pg_restore -U postgres -d myapp_db -j 4 myapp_backup.dump

# Restore chỉ một table
pg_restore -U postgres -d myapp_db -t users myapp_backup.dump

# Restore vào database mới
pg_restore -U postgres -d postgres -C myapp_backup.dump
</code></pre><h3 id="23-restore-script-ho%C3%A0n-ch%E1%BB%89nh">2.3. Restore Script hoàn chỉnh</h3><pre><code class="language-bash">#!/bin/bash
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
</code></pre><h2 id="ph%E1%BA%A7n-3-strategies-v%C3%A0-best-practices">Phần 3: Strategies và Best Practices</h2><h3 id="31-chi%E1%BA%BFn-l%C6%B0%E1%BB%A3c-backup-3-2-1">3.1. Chiến lược Backup 3-2-1</h3><p>Đây là quy tắc vàng trong backup:</p><ul><li><strong>3</strong> bản copies của dữ liệu</li><li><strong>2</strong> loại media khác nhau (ví dụ: disk và cloud)</li><li><strong>1</strong> bản offsite (ở vị trí vật lý khác)</li></ul><p>Ví dụ implementation:</p><pre><code class="language-bash">#!/bin/bash
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
</code></pre><h3 id="32-backup-schedule">3.2. Backup Schedule</h3><p>Đề xuất lịch backup cho các môi trường khác nhau:</p><p><strong>Development:</strong></p><pre><code class="language-bash"># Crontab: Backup hàng ngày lúc 2 giờ sáng
0 2 * * * /scripts/backup_dev.sh
</code></pre><p><strong>Staging:</strong></p><pre><code class="language-bash"># Backup mỗi 6 giờ
0 */6 * * * /scripts/backup_staging.sh
</code></pre><p><strong>Production:</strong></p><pre><code class="language-bash"># Full backup: Mỗi ngày lúc 2 giờ sáng
0 2 * * * /scripts/full_backup_prod.sh

# Incremental backup: Mỗi giờ
0 * * * * /scripts/incremental_backup_prod.sh

# WAL archiving: Continuous
</code></pre><h3 id="33-t%E1%BB%B1-%C4%91%E1%BB%99ng-h%C3%B3a-v%E1%BB%9Bi-systemd-timer">3.3. Tự động hóa với systemd timer</h3><pre><code class="language-ini"># /etc/systemd/system/postgresql-backup.service
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
</code></pre><p>Enable timer:</p><pre><code class="language-bash">sudo systemctl enable postgresql-backup.timer
sudo systemctl start postgresql-backup.timer
</code></pre><h3 id="34-monitoring-v%C3%A0-alerting">3.4. Monitoring và Alerting</h3><p>Script kiểm tra backup:</p><pre><code class="language-bash">#!/bin/bash
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
</code></pre><h3 id="35-testing-restore">3.5. Testing Restore</h3><p><strong>QUAN TRỌNG:</strong> Backup không có giá trị nếu bạn chưa bao giờ test restore!</p><pre><code class="language-bash">#!/bin/bash
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
</code></pre><h2 id="ph%E1%BA%A7n-4-troubleshooting">Phần 4: Troubleshooting</h2><h3 id="41-l%E1%BB%97i-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p-khi-backup">4.1. Lỗi thường gặp khi Backup</h3><p><strong>Lỗi: "permission denied"</strong></p><pre><code class="language-bash"># Solution: Chạy với user có quyền
sudo -u postgres pg_dump mydb &gt; backup.sql

# Hoặc grant quyền
GRANT CONNECT ON DATABASE mydb TO backup_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO backup_user;
</code></pre><p><strong>Lỗi: "could not connect to server"</strong></p><pre><code class="language-bash"># Kiểm tra PostgreSQL đang chạy
sudo systemctl status postgresql

# Kiểm tra port
netstat -tlnp | grep 5432

# Kiểm tra pg_hba.conf
sudo vim /etc/postgresql/14/main/pg_hba.conf
</code></pre><p><strong>Lỗi: Backup quá lâu</strong></p><pre><code class="language-bash"># Solution: Dùng format directory với parallel
pg_dump -F d -j 8 -f backup_dir/ mydb

# Hoặc exclude tables lớn
pg_dump -T large_log_table mydb &gt; backup.sql
</code></pre><h3 id="42-l%E1%BB%97i-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p-khi-restore">4.2. Lỗi thường gặp khi Restore</h3><p><strong>Lỗi: "database already exists"</strong></p><pre><code class="language-bash"># Solution 1: Drop database cũ
dropdb mydb
createdb mydb
pg_restore -d mydb backup.dump

# Solution 2: Dùng flag -c (clean)
pg_restore -c -d mydb backup.dump
</code></pre><p><strong>Lỗi: "role does not exist"</strong></p><pre><code class="language-bash"># Solution: Restore roles trước
pg_dumpall --roles-only &gt; roles.sql
psql -f roles.sql

# Sau đó restore data
pg_restore -d mydb backup.dump
</code></pre><p><strong>Lỗi: Out of disk space</strong></p><pre><code class="language-bash"># Check disk space trước khi restore
df -h

# Ước tính kích thước cần thiết (thường 2-3x backup file)
du -h backup.dump
</code></pre><h2 id="ph%E1%BA%A7n-5-advanced-topics">Phần 5: Advanced Topics</h2><h3 id="51-point-in-time-recovery-pitr">5.1. Point-in-Time Recovery (PITR)</h3><p>PITR cho phép bạn restore database về một thời điểm cụ thể trong quá khứ.</p><p><strong>Setup WAL archiving:</strong></p><pre><code class="language-bash"># postgresql.conf
wal_level = replica
archive_mode = on
archive_command = 'test ! -f /wal_archive/%f &amp;&amp; cp %p /wal_archive/%f'
archive_timeout = 300  # Force WAL rotation every 5 minutes
</code></pre><p><strong>Thực hiện PITR:</strong></p><pre><code class="language-bash"># Bước 1: Stop PostgreSQL
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
</code></pre><h3 id="52-continuous-archiving-v%E1%BB%9Bi-pgbackrest">5.2. Continuous Archiving với pgBackRest</h3><p>pgBackRest là công cụ backup enterprise-grade cho PostgreSQL:</p><pre><code class="language-bash"># Cài đặt
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
</code></pre><h3 id="53-backup-v%E1%BB%9Bi-docker">5.3. Backup với Docker</h3><pre><code class="language-bash"># Backup PostgreSQL trong Docker
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
</code></pre><h2 id="k%E1%BA%BFt-lu%E1%BA%ADn">Kết Luận</h2><p>Backup và restore không chỉ là một task kỹ thuật đơn thuần, mà là một phần quan trọng trong chiến lược bảo vệ dữ liệu của doanh nghiệp. Một số điểm quan trọng cần nhớ:</p><ol><li><strong>Luôn test restore</strong> - Backup chưa test = không có backup</li><li><strong>Automate everything</strong> - Đừng dựa vào việc nhớ chạy backup thủ công</li><li><strong>Follow 3-2-1 rule</strong> - 3 copies, 2 media types, 1 offsite</li><li><strong>Monitor và alert</strong> - Biết ngay khi có vấn đề</li><li><strong>Document everything</strong> - Team mới cũng phải biết cách restore</li></ol><h3 id="checklist-cu%E1%BB%91i-c%C3%B9ng">Checklist cuối cùng</h3><ul><li>[ ] Backup script đã được viết và test</li><li>[ ] Crontab/systemd timer đã được setup</li><li>[ ] Monitoring và alerting đã được cấu hình</li><li>[ ] Restore đã được test ít nhất 1 lần</li><li>[ ] Documentation đã được viết</li><li>[ ] Team đã được training về quy trình backup/restore</li><li>[ ] Offsite backup đã được setup</li><li>[ ] Retention policy đã được định nghĩa rõ ràng</li></ul><hr><p><strong>Nguồn tham khảo:</strong></p><ul><li><a href="https://www.postgresql.org/docs/current/backup.html">PostgreSQL Official Documentation - Backup and Restore</a></li><li><a href="https://pgbackrest.org/">pgBackRest Documentation</a></li><li><a href="https://wiki.postgresql.org/wiki/Backup_and_Recovery">PostgreSQL Backup Best Practices</a></li></ul><p><em>Bài viết này được cập nhật lần cuối: Tháng 12, 2024</em></p>
