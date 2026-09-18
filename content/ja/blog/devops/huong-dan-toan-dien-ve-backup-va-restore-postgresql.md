---
id: 019c9617-fd38-703b-90ac-23190c3f1a08
title: PostgreSQL のバックアップと復元の総合ガイド
slug: huong-dan-toan-dien-ve-backup-va-restore-postgresql
excerpt: この記事は、PostgreSQL のバックアップと復元の基本的な方法から高度な方法まで、実践的なベスト プラクティスを習得するのに役立ちます。
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
locale: ja
---
<h2 id="t%E1%BA%A1i-sao-backup-quan-tr%E1%BB%8Dng">バックアップはなぜ重要ですか?</h2><p>技術的な詳細に入る前に、実話を振り返ってみましょう。ベトナムのテクノロジー系スタートアップ企業は、適切なバックアップがなかったため、すべての顧客データを失ったことがあります。結果？顧客の信頼を回復するのに半年かかり、倒産寸前だった。</p><p>バックアップは単なる技術的な仕事ではなく、ビジネスを保護するための戦略です。</p><h2 id="ph%E1%BA%A7n-1-c%C3%A1c-ph%C6%B0%C6%A1ng-ph%C3%A1p-backup-postgresql">パート 1: PostgreSQL のバックアップ方法</h2><h3 id="11-logical-backup-v%E1%BB%9Bi-pgdump">1.1. pg_dump による論理バックアップ</h3><p>これは最も一般的な方法であり、ほとんどの場合に適しています。</p><h4 id="backup-m%E1%BB%99t-database-%C4%91%C6%A1n-l%E1%BA%BB">単一データベースをバックアップする</h4><pre><code class="language-bash"># Format SQL plain text (dễ đọc, dễ edit)
pg_dump -U postgres -d myapp_db &gt; myapp_backup.sql

# Format custom (nén tốt, restore linh hoạt)
pg_dump -U postgres -d myapp_db -F c -f myapp_backup.dump

# Format directory (backup song song, nhanh nhất)
pg_dump -U postgres -d myapp_db -F d -j 4 -f myapp_backup_dir/
</code></pre><p><strong>フォーマットを比較します。</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>フォーマット</th>
<th>利点</th>
<th>短所</th>
<th>いつ使用するか</th>
</tr>
</thead>
<tbody>
<tr>
<td>プレーン SQL (-F p)</td>
<td>読みやすく、編集しやすい</td>
<td>圧縮なし、復元が遅い</td>
<td>データベースが小さいため、コンテンツを表示する必要がある</td>
</tr>
<tr>
<td>カスタム (-F c)</td>
<td>優れた圧縮、選択的復元</td>
<td>直接読み取れない</td>
<td>ほとんどの場合</td>
</tr>
<tr>
<td>ディレクトリ (-F d)</td>
<td>並行バックアップ、最速</td>
<td>大量のファイルを必要とする</td>
<td>大規模なデータベース (>100GB)</td>
</tr>
<tr>
<td>タール (-F t)</td>
<td>圧縮可能</td>
<td>並行して復元しないでください</td>
<td>ほとんど使用されない</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h4 id="backup-c%C3%B3-ch%E1%BB%8Dn-l%E1%BB%8Dc">選択的バックアップ</h4><pre><code class="language-bash"># Chỉ backup schema (cấu trúc tables, indexes, constraints)
pg_dump -U postgres -d myapp_db --schema-only &gt; schema.sql

# Chỉ backup data
pg_dump -U postgres -d myapp_db --data-only &gt; data.sql

# Backup một table cụ thể
pg_dump -U postgres -d myapp_db -t users -t orders &gt; important_tables.sql

# Backup tất cả trừ table logs (thường rất lớn)
pg_dump -U postgres -d myapp_db -T logs &gt; backup_no_logs.sql

# Backup theo schema
pg_dump -U postgres -d myapp_db -n public -n reporting &gt; selected_schemas.sql
</code></pre><h4 id="v%C3%AD-d%E1%BB%A5-th%E1%BB%B1c-t%E1%BA%BF-backup-database-production">実践例：バックアップデータベースの構築</h4><pre><code class="language-bash">#!/bin/bash
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
</code></pre><h3 id="12-backup-to%C3%A0n-b%E1%BB%99-cluster-v%E1%BB%9Bi-pgdumpall">1.2. pg_dumpall を使用してクラスター全体をバックアップします。</h3><p>すべてのデータベース、ロール、テーブルスペースをバックアップする必要がある場合:</p><pre><code class="language-bash"># Backup toàn bộ
pg_dumpall -U postgres &gt; all_databases.sql

# Chỉ backup global objects (roles, tablespaces)
pg_dumpall -U postgres --globals-only &gt; globals.sql

# Chỉ backup roles
pg_dumpall -U postgres --roles-only &gt; roles.sql
</code></pre><p><strong>pg_dumpall をいつ使用するか?</strong></p><ul><li>PostgreSQL サーバー全体を新しいマシンに移行する場合</li><li>ユーザー権限とロールの両方をバックアップする必要がある場合</li><li>相互に関連するデータベースが多数ある場合</li></ul><h3 id="13-physical-backup-v%E1%BB%9Bi-base-backup">1.3.ベースバックアップを使用した物理バックアップ</h3><p>これはファイル システム レベルでのバックアップ方法であり、非常に大規模なデータベースに適しています。</p><pre><code class="language-bash"># Bước 1: Tạo base backup
pg_basebackup -U postgres -D /backups/base -F tar -z -P

# Bước 2: Configure WAL archiving (trong postgresql.conf)
wal_level = replica
archive_mode = on
archive_command = 'test ! -f /backups/wal/%f &amp;&amp; cp %p /backups/wal/%f'
max_wal_senders = 3
</code></pre><p><strong>利点:</strong></p><ul><li>大規模なデータベース (TB レベル) では非常に高速</li><li>ポイントインタイムリカバリ (PITR) のサポート</li><li>レプリケーションに使用可能</li></ul><p><strong>短所:</strong></p><ul><li>論理バックアップよりも複雑</li><li>クラスター全体をバックアップする必要があり、個々のデータベースを選択することはできません</li><li>復元時には同じ PostgreSQL バージョンが必要です</li></ul><h2 id="ph%E1%BA%A7n-2-restore-postgresql">パート 2: PostgreSQL の復元</h2><h3 id="21-restore-t%E1%BB%AB-sql-file">2.1. SQLファイルから復元</h3><pre><code class="language-bash"># Tạo database mới (nếu cần)
createdb -U postgres myapp_db_restored

# Restore từ SQL file
psql -U postgres -d myapp_db_restored &lt; myapp_backup.sql

# Restore với error handling
psql -U postgres -d myapp_db_restored \
    -v ON_ERROR_STOP=1 \
    --echo-errors \
    &lt; myapp_backup.sql
</code></pre><h3 id="22-restore-t%E1%BB%AB-customdirectory-format">2.2.カスタム/ディレクトリ形式からの復元</h3><pre><code class="language-bash"># Restore cơ bản
pg_restore -U postgres -d myapp_db myapp_backup.dump

# Restore với clean (xóa objects cũ trước)
pg_restore -U postgres -d myapp_db -c myapp_backup.dump

# Restore song song (nhanh hơn nhiều)
pg_restore -U postgres -d myapp_db -j 4 myapp_backup.dump

# Restore chỉ một table
pg_restore -U postgres -d myapp_db -t users myapp_backup.dump

# Restore vào database mới
pg_restore -U postgres -d postgres -C myapp_backup.dump
</code></pre><h3 id="23-restore-script-ho%C3%A0n-ch%E1%BB%89nh">2.3.完全なスクリプトを復元する</h3><pre><code class="language-bash">#!/bin/bash
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
</code></pre><h2 id="ph%E1%BA%A7n-3-strategies-v%C3%A0-best-practices">パート 3: 戦略とベストプラクティス</h2><h3 id="31-chi%E1%BA%BFn-l%C6%B0%E1%BB%A3c-backup-3-2-1">3.1.バックアップ戦略 3-2-1</h3><p>バックアップにおける黄金律は次のとおりです。</p><ul><li><strong>3</strong> データのコピー</li><li><strong>2</strong> さまざまなメディアタイプ (ディスクやクラウドなど)</li><li><strong>1</strong> オフサイト バージョン (別の物理的な場所)</li></ul><p>実装例:</p><pre><code class="language-bash">#!/bin/bash
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
</code></pre><h3 id="32-backup-schedule">3.2.バックアップスケジュール</h3><p>さまざまな環境に推奨されるバックアップ スケジュール:</p><p><strong>開発:</strong></p><pre><code class="language-bash"># Crontab: Backup hàng ngày lúc 2 giờ sáng
0 2 * * * /scripts/backup_dev.sh
</code></pre><p><strong>ステージング:</strong></p><pre><code class="language-bash"># Backup mỗi 6 giờ
0 */6 * * * /scripts/backup_staging.sh
</code></pre><p><strong>制作：</strong></p><pre><code class="language-bash"># Full backup: Mỗi ngày lúc 2 giờ sáng
0 2 * * * /scripts/full_backup_prod.sh

# Incremental backup: Mỗi giờ
0 * * * * /scripts/incremental_backup_prod.sh

# WAL archiving: Continuous
</code></pre><h3 id="33-t%E1%BB%B1-%C4%91%E1%BB%99ng-h%C3%B3a-v%E1%BB%9Bi-systemd-timer">3.3. systemd タイマーによる自動化</h3><pre><code class="language-ini"># /etc/systemd/system/postgresql-backup.service
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
</code></pre><p>タイマーを有効にする:</p><pre><code class="language-bash">sudo systemctl enable postgresql-backup.timer
sudo systemctl start postgresql-backup.timer
</code></pre><h3 id="34-monitoring-v%C3%A0-alerting">3.4.監視と警告</h3><p>バックアップを確認するスクリプト:</p><pre><code class="language-bash">#!/bin/bash
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
</code></pre><h3 id="35-testing-restore">3.5.復元のテスト</h3><p><strong>重要:</strong> 復元をテストしたことがない場合、バックアップは役に立ちません。</p><pre><code class="language-bash">#!/bin/bash
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
</code></pre><h2 id="ph%E1%BA%A7n-4-troubleshooting">パート 4: トラブルシューティング</h2><h3 id="41-l%E1%BB%97i-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p-khi-backup">4.1.バックアップ時の一般的なエラー</h3><p><strong>エラー: 「許可が拒否されました」</strong></p><pre><code class="language-bash"># Solution: Chạy với user có quyền
sudo -u postgres pg_dump mydb &gt; backup.sql

# Hoặc grant quyền
GRANT CONNECT ON DATABASE mydb TO backup_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO backup_user;
</code></pre><p><strong>エラー: 「サーバーに接続できませんでした」</strong></p><pre><code class="language-bash"># Kiểm tra PostgreSQL đang chạy
sudo systemctl status postgresql

# Kiểm tra port
netstat -tlnp | grep 5432

# Kiểm tra pg_hba.conf
sudo vim /etc/postgresql/14/main/pg_hba.conf
</code></pre><p><strong>エラー: バックアップに時間がかかりすぎました</strong></p><pre><code class="language-bash"># Solution: Dùng format directory với parallel
pg_dump -F d -j 8 -f backup_dir/ mydb

# Hoặc exclude tables lớn
pg_dump -T large_log_table mydb &gt; backup.sql
</code></pre><h3 id="42-l%E1%BB%97i-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p-khi-restore">4.2.復元時の一般的なエラー</h3><p><strong>エラー: 「データベースはすでに存在します」</strong></p><pre><code class="language-bash"># Solution 1: Drop database cũ
dropdb mydb
createdb mydb
pg_restore -d mydb backup.dump

# Solution 2: Dùng flag -c (clean)
pg_restore -c -d mydb backup.dump
</code></pre><p><strong>エラー: 「ロールが存在しません」</strong></p><pre><code class="language-bash"># Solution: Restore roles trước
pg_dumpall --roles-only &gt; roles.sql
psql -f roles.sql

# Sau đó restore data
pg_restore -d mydb backup.dump
</code></pre><p><strong>エラー: ディスク容量が不足しています</strong></p><pre><code class="language-bash"># Check disk space trước khi restore
df -h

# Ước tính kích thước cần thiết (thường 2-3x backup file)
du -h backup.dump
</code></pre><h2 id="ph%E1%BA%A7n-5-advanced-topics">パート 5: 高度なトピック</h2><h3 id="51-point-in-time-recovery-pitr">5.1.ポイントインタイムリカバリ (PITR)</h3><p>PITR を使用すると、データベースを過去の特定の時点に復元できます。</p><p><strong>WAL アーカイブをセットアップします。</strong></p><pre><code class="language-bash"># postgresql.conf
wal_level = replica
archive_mode = on
archive_command = 'test ! -f /wal_archive/%f &amp;&amp; cp %p /wal_archive/%f'
archive_timeout = 300  # Force WAL rotation every 5 minutes
</code></pre><p><strong>PITR を実装します。</strong></p><pre><code class="language-bash"># Bước 1: Stop PostgreSQL
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
</code></pre><h3 id="52-continuous-archiving-v%E1%BB%9Bi-pgbackrest">5.2. pgBackRest による継続的アーカイブ</h3><p>pgBackRest は、PostgreSQL 用のエンタープライズ グレードのバックアップ ツールです。</p><pre><code class="language-bash"># Cài đặt
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
</code></pre><h3 id="53-backup-v%E1%BB%9Bi-docker">5.3. Dockerを使ったバックアップ</h3><pre><code class="language-bash"># Backup PostgreSQL trong Docker
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
</code></pre><h2 id="k%E1%BA%BFt-lu%E1%BA%ADn">結論</h2><p>バックアップと復元は単なる技術的な作業ではなく、企業のデータ保護戦略の重要な部分です。覚えておくべきいくつかの重要な点:</p><ol><li><strong>常に復元をテストする</strong> - バックアップがテストされていない = バックアップなし</li><li><strong>すべてを自動化する</strong> - 手動バックアップを忘れずに実行することに依存しないでください。</li><li><strong>3-2-1 ルールに従う</strong> - 3 コピー、2 メディア タイプ、1 オフサイト</li><li><strong>監視と警告</strong> - 問題が発生した場合はすぐに知ることができます</li><li><strong>すべてを文書化する</strong> - 新しいチームは復元方法も知っておく必要があります</li></ol><h3 id="checklist-cu%E1%BB%91i-c%C3%B9ng">最終チェックリスト</h3><ul><li>[ ] バックアップ スクリプトが作成され、テストされました</li><li>[ ] Crontab/systemd タイマーが設定されました</li><li>[ ] モニタリングとアラートが設定されました</li><li>[ ] 復元は少なくとも 1 回テストされています</li><li>[ ] ドキュメントが作成されました</li><li>[ ] チームはバックアップ/復元プロセスのトレーニングを受けています</li><li>[ ] オフサイトバックアップが設定されました</li><li>[ ] 保持ポリシーが明確に定義されている</li></ul><hr><p><strong>参照元：</strong></p><ul><li><a href="https://www.postgresql.org/docs/current/backup.html">PostgreSQL 公式ドキュメント - バックアップと復元</a></li><li><a href="https://pgbackrest.org/">pgBackRest ドキュメント</a></li><li><a href="https://wiki.postgresql.org/wiki/Backup_and_Recovery">PostgreSQL バックアップのベスト プラクティス</a></li></ul><p><em>この記事の最終更新日: 2024 年 12 月</em></p>
