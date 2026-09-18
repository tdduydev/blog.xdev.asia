---
id: 019c9617-fd8a-7311-bebd-480161450db5
title: Hướng Dẫn Upgrade PostgreSQL 17.6 lên 18.1 (Chuẩn Production)
slug: huong-dan-upgrade-postgresql-17-6-len-18-1-chuan-production
excerpt: >-
  Hướng dẫn chi tiết upgrade PostgreSQL 17.6 lên 18.1 cho môi trường production
  với downtime tối thiểu. Bao gồm pg_upgrade, logical replication, rollback
  plan, và các best practices được cập nhật cho PostgreSQL 18 với Async I/O,
  Statistics Preservation, và pg_upgrade --swap mode mới.
featured_image: /images/blog/postgresql-upgrade-featured.webp
type: blog
reading_time: 15
view_count: 0
meta: null
published_at: '2025-12-23T05:02:11.000000Z'
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
  - name: linux
    slug: linux
  - name: production
    slug: production
  - name: Database
    slug: database
  - name: PostgreSQL 18
    slug: postgresql-18
  - name: Database Migration
    slug: database-migration
  - name: pg_upgrade
    slug: pg-upgrade
  - name: System Administration
    slug: system-administration
comments: []
---
<hr><p>PostgreSQL 18 chính thức ra mắt vào ngày 25/9/2025, đánh dấu một trong những bản release quan trọng nhất trong lịch sử PostgreSQL. Với việc giới thiệu <strong>Asynchronous I/O subsystem</strong>, hiệu năng đọc từ storage được cải thiện lên đến <strong>3 lần</strong>, cùng nhiều tính năng mới như <strong>UUIDv7</strong>, <strong>Virtual Generated Columns</strong>, và <strong>OAuth 2.0 authentication</strong>.</p><p>Bài viết này sẽ hướng dẫn chi tiết cách upgrade từ PostgreSQL 17.6 lên 18.1 theo chuẩn production, đảm bảo <strong>downtime tối thiểu</strong> và <strong>rollback an toàn</strong>.</p><hr><h2 id="1-t%E1%BA%A1i-sao-n%C3%AAn-upgrade-l%C3%AAn-postgresql-18">1. Tại Sao Nên Upgrade Lên PostgreSQL 18?</h2><h3 id="11-c%C3%A1c-t%C3%ADnh-n%C4%83ng-n%E1%BB%95i-b%E1%BA%ADt">1.1. Các Tính Năng Nổi Bật</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Tính năng</th>
<th>Mô tả</th>
<th>Lợi ích</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Asynchronous I/O</strong></td>
<td>Hệ thống I/O bất đồng bộ mới</td>
<td>Tăng tốc sequential scan, bitmap heap scan lên đến 3x</td>
</tr>
<tr>
<td><strong>Statistics Preservation</strong></td>
<td>Giữ lại planner statistics khi upgrade</td>
<td>Không cần chạy ANALYZE sau upgrade</td>
</tr>
<tr>
<td><strong>Skip Scan</strong></td>
<td>Lookup trên multicolumn B-tree indexes</td>
<td>Query nhanh hơn khi bỏ qua điều kiện <code>=</code> trên prefix columns</td>
</tr>
<tr>
<td><strong>UUIDv7</strong></td>
<td>Native <code>uuidv7()</code> function</td>
<td>UUID có timestamp, tốt hơn cho indexing</td>
</tr>
<tr>
<td><strong>Virtual Generated Columns</strong></td>
<td>Computed columns tại query time</td>
<td>Linh hoạt hơn trong schema design</td>
</tr>
<tr>
<td><strong>OAuth 2.0</strong></td>
<td>Authentication với identity providers</td>
<td>Tích hợp SSO dễ dàng</td>
</tr>
<tr>
<td><strong>pg_upgrade --swap</strong></td>
<td>Chế độ swap mới</td>
<td>Upgrade nhanh hơn, không cần copy files</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="12-breaking-changes-c%E1%BA%A7n-l%C6%B0u-%C3%BD">1.2. Breaking Changes Cần Lưu Ý</h3><pre><code class="language-text">⚠️ QUAN TRỌNG - Các thay đổi không tương thích ngược:

1. Data Checksums mặc định BẬT (initdb)
   - Cần matching checksum settings khi pg_upgrade
   
2. MD5 authentication DEPRECATED
   - Nên migrate sang SCRAM-SHA-256
   
3. Time zone abbreviation handling thay đổi
   - Session timezone được ưu tiên trước timezone_abbreviations
</code></pre><hr><h2 id="2-chu%E1%BA%A9n-b%E1%BB%8B-tr%C6%B0%E1%BB%9Bc-khi-upgrade">2. Chuẩn Bị Trước Khi Upgrade</h2><h3 id="21-checklist-pre-upgrade">2.1. Checklist Pre-Upgrade</h3><pre><code class="language-bash">#!/bin/bash
# pre-upgrade-checklist.sh

echo "=== PostgreSQL Upgrade Checklist ==="

# 1. Kiểm tra version hiện tại
echo "1. Current PostgreSQL Version:"
psql -c "SELECT version();"

# 2. Kiểm tra disk space
echo "2. Disk Space (cần ít nhất 2x data directory size):"
df -h /var/lib/postgresql

# 3. Kiểm tra data directory size
echo "3. Data Directory Size:"
du -sh /var/lib/postgresql/17/main

# 4. Kiểm tra checksum status
echo "4. Data Checksum Status:"
pg_controldata /var/lib/postgresql/17/main | grep "Data page checksum"

# 5. Kiểm tra extensions
echo "5. Installed Extensions:"
psql -c "SELECT extname, extversion FROM pg_extension ORDER BY extname;"

# 6. Kiểm tra replication slots
echo "6. Replication Slots:"
psql -c "SELECT slot_name, slot_type, active FROM pg_replication_slots;"

# 7. Kiểm tra prepared transactions
echo "7. Prepared Transactions (should be empty):"
psql -c "SELECT * FROM pg_prepared_xacts;"
</code></pre><h3 id="22-backup-strategy">2.2. Backup Strategy</h3><p><strong>QUAN TRỌNG:</strong> Luôn backup trước khi upgrade!</p><pre><code class="language-bash"># 1. Full backup với pg_dumpall (logical backup)
pg_dumpall -U postgres -h localhost -f /backup/full_backup_$(date +%Y%m%d).sql

# 2. Base backup (physical backup) - khuyến nghị
pg_basebackup -D /backup/basebackup_$(date +%Y%m%d) \
  -Ft -z -P \
  -U replication \
  -h localhost

# 3. Backup configuration files
cp /etc/postgresql/17/main/postgresql.conf /backup/
cp /etc/postgresql/17/main/pg_hba.conf /backup/
cp /etc/postgresql/17/main/pg_ident.conf /backup/
</code></pre><h3 id="23-c%C3%A0i-%C4%91%E1%BA%B7t-postgresql-181">2.3. Cài Đặt PostgreSQL 18.1</h3><pre><code class="language-bash"># Ubuntu/Debian
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" &gt; /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install postgresql-18

# RHEL/Rocky Linux
sudo dnf install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-9-x86_64/pgdg-redhat-repo-latest.noarch.rpm
sudo dnf -qy module disable postgresql
sudo dnf install -y postgresql18-server postgresql18-contrib
</code></pre><hr><h2 id="3-c%C3%A1c-ph%C6%B0%C6%A1ng-ph%C3%A1p-upgrade">3. Các Phương Pháp Upgrade</h2><h3 id="31-so-s%C3%A1nh-c%C3%A1c-ph%C6%B0%C6%A1ng-ph%C3%A1p">3.1. So Sánh Các Phương Pháp</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Phương pháp</th>
<th>Downtime</th>
<th>Use Case</th>
<th>Độ phức tạp</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>pg_upgrade</strong></td>
<td>Phút</td>
<td>Same host, brief pause</td>
<td>Thấp</td>
</tr>
<tr>
<td><strong>pg_upgrade --link</strong></td>
<td>Giây - Phút</td>
<td>Same filesystem, nhanh nhất</td>
<td>Thấp</td>
</tr>
<tr>
<td><strong>pg_upgrade --swap</strong> (PG18 mới)</td>
<td>Giây - Phút</td>
<td>Swap directories</td>
<td>Thấp</td>
</tr>
<tr>
<td><strong>Logical Replication</strong></td>
<td>Giây</td>
<td>24x7 apps, zero-downtime</td>
<td>Cao</td>
</tr>
<tr>
<td><strong>pg_dump/restore</strong></td>
<td>Giờ - Ngày</td>
<td>Small DBs, cross-platform</td>
<td>Thấp</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="32-khuy%E1%BA%BFn-ngh%E1%BB%8B-cho-production">3.2. Khuyến Nghị Cho Production</h3><pre><code>┌─────────────────────────────────────────────────────────────┐
│                    DECISION FLOWCHART                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Database size &lt; 100GB?                                      │
│     YES → pg_upgrade --link hoặc --swap                     │
│     NO  ↓                                                   │
│                                                              │
│  Zero-downtime required?                                     │
│     YES → Logical Replication                                │
│     NO  → pg_upgrade --link với maintenance window           │
│                                                              │
│  Cross-platform migration?                                   │
│     YES → pg_dump/restore                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
</code></pre><hr><h2 id="4-upgrade-v%E1%BB%9Bi-pgupgrade-recommended">4. Upgrade Với pg_upgrade (Recommended)</h2><h3 id="41-kh%E1%BB%9Fi-t%E1%BA%A1o-cluster-m%E1%BB%9Bi">4.1. Khởi Tạo Cluster Mới</h3><pre><code class="language-bash"># Tạo data directory cho PostgreSQL 18
sudo mkdir -p /var/lib/postgresql/18/main
sudo chown postgres:postgres /var/lib/postgresql/18/main

# Chuyển sang user postgres
sudo -i -u postgres

# Kiểm tra checksum của cluster cũ
pg_controldata /var/lib/postgresql/17/main | grep "Data page checksum"
# Output: Data page checksum version: 0 (disabled) hoặc 1 (enabled)

# Init cluster mới với MATCHING checksum setting
# Nếu cluster cũ KHÔNG có checksum:
/usr/lib/postgresql/18/bin/initdb \
  -D /var/lib/postgresql/18/main \
  --no-data-checksums \
  --encoding=UTF8 \
  --locale=en_US.UTF-8

# Nếu cluster cũ CÓ checksum (hoặc muốn enable):
/usr/lib/postgresql/18/bin/initdb \
  -D /var/lib/postgresql/18/main \
  --data-checksums \
  --encoding=UTF8 \
  --locale=en_US.UTF-8
</code></pre><h3 id="42-pre-upgrade-check">4.2. Pre-Upgrade Check</h3><pre><code class="language-bash"># Set environment variables
export PGBINOLD=/usr/lib/postgresql/17/bin
export PGBINNEW=/usr/lib/postgresql/18/bin
export PGDATAOLD=/var/lib/postgresql/17/main
export PGDATANEW=/var/lib/postgresql/18/main

# Chạy check mode TRƯỚC
/usr/lib/postgresql/18/bin/pg_upgrade \
  --old-datadir=$PGDATAOLD \
  --new-datadir=$PGDATANEW \
  --old-bindir=$PGBINOLD \
  --new-bindir=$PGBINNEW \
  --check

# Expected output:
# Performing Consistency Checks
# -----------------------------
# Checking cluster versions                         ok
# Checking database connection settings             ok
# Checking database user is the install user        ok
# Checking for prepared transactions                ok
# ...
# *Clusters are compatible*
</code></pre><h3 id="43-stop-services-upgrade">4.3. Stop Services &amp; Upgrade</h3><pre><code class="language-bash"># 1. Stop ứng dụng kết nối đến database
# (tùy thuộc vào setup của bạn)

# 2. Stop PostgreSQL 17
sudo systemctl stop postgresql@17-main

# 3. Verify PostgreSQL 17 đã stop
pg_isready -p 5432
# Output: no response

# 4. Thực hiện upgrade với --link mode (nhanh nhất)
cd /var/lib/postgresql
/usr/lib/postgresql/18/bin/pg_upgrade \
  --old-datadir=$PGDATAOLD \
  --new-datadir=$PGDATANEW \
  --old-bindir=$PGBINOLD \
  --new-bindir=$PGBINNEW \
  --link \
  --jobs=$(nproc)

# Hoặc với --swap mode (PostgreSQL 18 mới)
/usr/lib/postgresql/18/bin/pg_upgrade \
  --old-datadir=$PGDATAOLD \
  --new-datadir=$PGDATANEW \
  --old-bindir=$PGBINOLD \
  --new-bindir=$PGBINNEW \
  --swap \
  --jobs=$(nproc)
</code></pre><h3 id="44-copy-configuration-files">4.4. Copy Configuration Files</h3><pre><code class="language-bash"># Copy các config files từ cluster cũ
cp /etc/postgresql/17/main/postgresql.conf /etc/postgresql/18/main/
cp /etc/postgresql/17/main/pg_hba.conf /etc/postgresql/18/main/
cp /etc/postgresql/17/main/pg_ident.conf /etc/postgresql/18/main/

# Hoặc nếu dùng data directory cho config
cp $PGDATAOLD/postgresql.conf $PGDATANEW/
cp $PGDATAOLD/pg_hba.conf $PGDATANEW/

# Cập nhật port trong postgresql.conf nếu cần
# (nếu muốn chạy song song cả 2 version)
sed -i 's/port = 5432/port = 5433/' /etc/postgresql/18/main/postgresql.conf
</code></pre><h3 id="45-start-postgresql-18-verify">4.5. Start PostgreSQL 18 &amp; Verify</h3><pre><code class="language-bash"># Start PostgreSQL 18
sudo systemctl start postgresql@18-main

# Verify connection
psql -p 5432 -c "SELECT version();"
# Output: PostgreSQL 18.1 on x86_64-pc-linux-gnu...

# Verify databases
psql -c "\l"

# Verify table counts (sample)
psql -d your_database -c "SELECT schemaname, COUNT(*) FROM pg_tables GROUP BY schemaname;"
</code></pre><hr><h2 id="5-post-upgrade-tasks">5. Post-Upgrade Tasks</h2><h3 id="51-statistics-handling-postgresql-18-t%E1%BB%B1-%C4%91%E1%BB%99ng-preserve">5.1. Statistics Handling (PostgreSQL 18 tự động preserve)</h3><pre><code class="language-bash"># PostgreSQL 18 tự động preserve statistics!
# Chỉ cần chạy cho extended statistics nếu có:

/usr/lib/postgresql/18/bin/vacuumdb \
  --all \
  --analyze-in-stages \
  --missing-stats-only

# Hoặc chạy đầy đủ nếu muốn
vacuumdb --all --analyze
</code></pre><h3 id="52-extension-updates">5.2. Extension Updates</h3><pre><code class="language-bash"># Kiểm tra extensions cần update
psql -c "SELECT * FROM pg_extension WHERE extversion != (SELECT default_version FROM pg_available_extensions WHERE name = extname);"

# Update tất cả extensions
psql -c "SELECT format('ALTER EXTENSION %I UPDATE;', extname) FROM pg_extension;" | psql

# Hoặc update từng extension
psql -c "ALTER EXTENSION pg_stat_statements UPDATE;"
psql -c "ALTER EXTENSION postgis UPDATE;"
</code></pre><h3 id="53-cleanup">5.3. Cleanup</h3><pre><code class="language-bash"># Xóa cluster cũ (CHỈ SAU KHI VERIFY HOÀN TẤT!)
# pg_upgrade tạo script delete_old_cluster.sh
./delete_old_cluster.sh

# Hoặc thủ công
rm -rf /var/lib/postgresql/17/main

# Disable PostgreSQL 17 service
sudo systemctl disable postgresql@17-main
</code></pre><h3 id="54-performance-validation">5.4. Performance Validation</h3><pre><code class="language-sql">-- Kiểm tra query plan của các query quan trọng
EXPLAIN (ANALYZE, BUFFERS, VERBOSE) 
SELECT * FROM your_critical_table WHERE your_condition;

-- So sánh với baseline trước upgrade
-- Lưu ý: PostgreSQL 18 EXPLAIN ANALYZE tự động include BUFFERS

-- Kiểm tra AIO settings (PostgreSQL 18)
SHOW io_method;
-- Output: io_uring (Linux) hoặc worker

-- Monitor với pg_stat_io (mới trong PG16, cải thiện PG18)
SELECT * FROM pg_stat_io WHERE reads &gt; 0;
</code></pre><hr><h2 id="6-upgrade-v%E1%BB%9Bi-logical-replication-zero-downtime">6. Upgrade Với Logical Replication (Zero-Downtime)</h2><h3 id="61-t%E1%BB%95ng-quan-architecture">6.1. Tổng Quan Architecture</h3><pre><code>┌──────────────────────┐         ┌──────────────────────┐
│   PostgreSQL 17.6    │         │   PostgreSQL 18.1    │
│     (Publisher)      │  ─────► │    (Subscriber)      │
│   Primary/Source     │   WAL   │   Target/Replica     │
│     Port: 5432       │         │     Port: 5433       │
└──────────────────────┘         └──────────────────────┘
                                          │
                                          ▼
                                   Cutover (DNS/HAProxy)
</code></pre><h3 id="62-setup-publisher-postgresql-17">6.2. Setup Publisher (PostgreSQL 17)</h3><pre><code class="language-sql">-- 1. Enable logical replication trong postgresql.conf
-- wal_level = logical
-- max_replication_slots = 10
-- max_wal_senders = 10

-- 2. Tạo publication
CREATE PUBLICATION pg18_migration FOR ALL TABLES;

-- 3. Tạo replication user
CREATE USER repl_user WITH REPLICATION PASSWORD 'secure_password';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO repl_user;

-- 4. Cập nhật pg_hba.conf
-- host    all    repl_user    subscriber_ip/32    scram-sha-256
-- host    replication    repl_user    subscriber_ip/32    scram-sha-256
</code></pre><h3 id="63-setup-subscriber-postgresql-18">6.3. Setup Subscriber (PostgreSQL 18)</h3><pre><code class="language-bash"># 1. Dump schema only (không data)
pg_dump -h old_server -U postgres -s -d your_db &gt; schema.sql

# 2. Restore schema vào PostgreSQL 18
psql -d your_db -f schema.sql
</code></pre><pre><code class="language-sql">-- 3. Tạo subscription
CREATE SUBSCRIPTION pg18_sub
CONNECTION 'host=old_server port=5432 dbname=your_db user=repl_user password=secure_password'
PUBLICATION pg18_migration;

-- 4. Monitor sync progress
SELECT * FROM pg_stat_subscription;
SELECT * FROM pg_subscription_rel;

-- 5. Kiểm tra lag
SELECT 
  slot_name,
  pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), confirmed_flush_lsn)) as lag
FROM pg_replication_slots;
</code></pre><h3 id="64-cutover-process">6.4. Cutover Process</h3><pre><code class="language-bash">#!/bin/bash
# cutover.sh - Zero-downtime cutover script

echo "=== Starting Cutover Process ==="

# 1. Stop writes to old server (application level)
echo "1. Stopping application writes..."
# kubectl scale deployment/app --replicas=0
# hoặc update HAProxy/PgBouncer

# 2. Wait for replication to catch up
echo "2. Waiting for replication lag to be 0..."
while true; do
  LAG=$(psql -h new_server -p 5433 -t -c \
    "SELECT pg_wal_lsn_diff(pg_current_wal_lsn(), confirmed_flush_lsn) FROM pg_replication_slots WHERE slot_name='pg18_sub'")
  if [ "$LAG" -eq 0 ]; then
    break
  fi
  sleep 1
done

# 3. Disable subscription
echo "3. Disabling subscription..."
psql -h new_server -p 5433 -c "ALTER SUBSCRIPTION pg18_sub DISABLE;"
psql -h new_server -p 5433 -c "DROP SUBSCRIPTION pg18_sub;"

# 4. Reset sequences (quan trọng!)
echo "4. Resetting sequences..."
psql -h new_server -p 5433 -c "SELECT setval(c.oid, s.last_value) FROM pg_class c JOIN pg_sequences s ON c.relname = s.sequencename WHERE s.last_value IS NOT NULL;"

# 5. Switch traffic to new server
echo "5. Switching traffic..."
# Update DNS, HAProxy, PgBouncer, etc.

echo "=== Cutover Complete ==="
</code></pre><hr><h2 id="7-rollback-plan">7. Rollback Plan</h2><h3 id="71-rollback-t%E1%BB%AB-pgupgradelink">7.1. Rollback Từ pg_upgrade --link</h3><pre><code class="language-bash"># QUAN TRỌNG: Với --link mode, bạn KHÔNG THỂ rollback sau khi start cluster mới!
# Do đó, LUÔN test kỹ trước khi start

# Nếu chưa start PostgreSQL 18:
# Chỉ cần start lại PostgreSQL 17
sudo systemctl start postgresql@17-main
</code></pre><h3 id="72-rollback-t%E1%BB%AB-pgupgradecopy">7.2. Rollback Từ pg_upgrade --copy</h3><pre><code class="language-bash"># Nếu dùng --copy mode, cluster cũ vẫn còn nguyên
# Chỉ cần switch về cluster cũ

sudo systemctl stop postgresql@18-main
sudo systemctl start postgresql@17-main
</code></pre><h3 id="73-rollback-t%E1%BB%AB-logical-replication">7.3. Rollback Từ Logical Replication</h3><pre><code class="language-sql">-- Trên subscriber (PostgreSQL 18)
ALTER SUBSCRIPTION pg18_sub DISABLE;
DROP SUBSCRIPTION pg18_sub;

-- Switch traffic về PostgreSQL 17
-- Update DNS/HAProxy/PgBouncer
</code></pre><hr><h2 id="8-monitoring-troubleshooting">8. Monitoring &amp; Troubleshooting</h2><h3 id="81-monitoring-script">8.1. Monitoring Script</h3><pre><code class="language-bash">#!/bin/bash
# monitor-upgrade.sh

echo "=== PostgreSQL 18 Health Check ==="

# 1. Version
psql -c "SELECT version();"

# 2. Uptime
psql -c "SELECT pg_postmaster_start_time(), now() - pg_postmaster_start_time() as uptime;"

# 3. Active connections
psql -c "SELECT count(*) as active_connections FROM pg_stat_activity WHERE state = 'active';"

# 4. Database sizes
psql -c "SELECT datname, pg_size_pretty(pg_database_size(datname)) FROM pg_database ORDER BY pg_database_size(datname) DESC;"

# 5. Long running queries
psql -c "SELECT pid, now() - pg_stat_activity.query_start AS duration, query FROM pg_stat_activity WHERE state = 'active' AND now() - pg_stat_activity.query_start &gt; interval '5 minutes';"

# 6. Replication status (if applicable)
psql -c "SELECT * FROM pg_stat_replication;"

# 7. I/O statistics (PostgreSQL 18)
psql -c "SELECT backend_type, reads, writes, extends FROM pg_stat_io WHERE reads &gt; 0 OR writes &gt; 0;"
</code></pre><h2 id="9-best-practices-summary">9. Best Practices Summary</h2><h3 id="91-pre-upgrade">9.1. Pre-Upgrade</h3><ul><li>[ ] Đọc kỹ <a href="https://www.postgresql.org/docs/18/release-18.html">Release Notes PostgreSQL 18</a></li><li>[ ] Test upgrade trên staging/development environment</li><li>[ ] Backup đầy đủ (logical + physical)</li><li>[ ] Document rollback plan</li><li>[ ] Notify stakeholders về maintenance window</li><li>[ ] Kiểm tra compatibility của tất cả extensions</li></ul><h3 id="92-during-upgrade">9.2. During Upgrade</h3><ul><li>[ ] Sử dụng <code>pg_upgrade --check</code> trước khi upgrade thực sự</li><li>[ ] Monitor disk space trong quá trình upgrade</li><li>[ ] Giữ terminal session với <code>screen</code> hoặc <code>tmux</code></li><li>[ ] Log tất cả output để troubleshoot</li></ul><h3 id="93-post-upgrade">9.3. Post-Upgrade</h3><ul><li>[ ] Verify data integrity</li><li>[ ] Test critical queries và so sánh với baseline</li><li>[ ] Update extensions</li><li>[ ] Monitor performance 24-48 giờ</li><li>[ ] Cleanup old cluster sau khi verify hoàn tất</li><li>[ ] Update documentation và runbooks</li></ul><hr><h2 id="10-k%E1%BA%BFt-lu%E1%BA%ADn">10. Kết Luận</h2><p>PostgreSQL 18 mang đến nhiều cải tiến đáng giá, đặc biệt là <strong>Asynchronous I/O</strong> và <strong>Statistics Preservation</strong> giúp upgrade mượt mà hơn bao giờ hết. Với việc lập kế hoạch kỹ càng và follow đúng quy trình, bạn có thể upgrade production database với <strong>downtime tối thiểu</strong> và <strong>risk thấp</strong>.</p><p><strong>Tài liệu tham khảo:</strong></p><ul><li><a href="https://www.postgresql.org/docs/18/release-18.html">PostgreSQL 18 Release Notes</a></li><li><a href="https://www.postgresql.org/docs/current/pgupgrade.html">pg_upgrade Documentation</a></li><li><a href="https://www.postgresql.org/docs/current/upgrading.html">Upgrading PostgreSQL Cluster</a></li></ul><hr><p><em>Nếu bài viết hữu ích, hãy chia sẻ và để lại comment bên dưới! 👇</em></p>
