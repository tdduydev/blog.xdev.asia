---
id: 019d8b30-b102-7001-c001-e0c5f8100102
title: 'レッスン 2: Keycloak のインストール - スタンドアロン、Docker、Kubernetes'
slug: bai-2-cai-dat-keycloak-standalone-docker-va-kubernetes
description: Keycloak 26.x をベアメタル (Ubuntu/CentOS)、Docker Compose、および Kubernetes Operator にインストールする手順。データベース バックエンド (PostgreSQL、MySQL、MariaDB)、HTTPS/TLS、リバース プロキシ (Nginx、HAProxy)、ホスト名構成 v2 を構成し、開発モードと本番モードで Keycloak を実行します。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 2
section_title: 'パート 1: Keycloak プラットフォーム'
course:
  id: 019d8b30-b100-7001-c001-e0c5f8100001
  title: 基本から上級までの Keycloak
  slug: keycloak-tu-co-ban-den-nang-cao
locale: ja
---
<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/03/keycloak-deployment-options-2026.webp" alt="Keycloak Deployment Options" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>3 つの Keycloak 導入方法: スタンドアロン、Docker Compose、Kubernetes Operator</em></p>
</div>

<h2 id="1-yeu-cau-he-thong"><strong>1. システム要件</strong></h2>
<p>Keycloak 26.xをインストールする前に、システムが次の要件を満たしていることを確認してください。</p>

<ul>
<li><p><strong>ジャワ</strong>：JDK 17または21（OpenJDK 21推奨）</p></li>
<li><p><strong>データベース</strong>: PostgreSQL 13-16 (推奨)、MySQL 8.0 以降、MariaDB 10.6 以降</p></li>
<li><p><strong>ラム</strong>: 最小 512MB (本番環境には 2GB 以上を推奨)</p></li>
<li><p><strong>CPU</strong>: 最小 1 コア (本番環境では 2 コア以上を推奨)</p></li>
<li><p><strong>OS</strong>：Linux（Ubuntu 22.04/24.04、CentOS 9、RHEL 9）、macOS、Windows</p></li>
</ul>

<h2 id="2-cai-dat-bare-metal"><strong>2. ベアメタル (Ubuntu) にインストールする</strong></h2>

<h3 id="21-cai-dat-java"><strong>2.1. Java 21 をインストールする</strong></h3>
<pre><code class="language-bash">sudo apt update
sudo apt install -y openjdk-21-jdk
java -version</code></pre>

<h3 id="22-cai-dat-postgresql"><strong>2.2. PostgreSQLのインストール</strong></h3>
<pre><code class="language-bash">sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Tạo database và user cho Keycloak
sudo -u postgres psql -c "CREATE USER keycloak WITH PASSWORD 'keycloak_password';"
sudo -u postgres psql -c "CREATE DATABASE keycloak OWNER keycloak;"</code></pre>

<h3 id="23-tai-va-cai-dat-keycloak"><strong>2.3. Keycloakをダウンロードしてインストールします</strong></h3>
<pre><code class="language-bash"># Tải Keycloak 26.5.x
cd /opt
wget https://github.com/keycloak/keycloak/releases/download/26.5.6/keycloak-26.5.6.tar.gz
tar -xzf keycloak-26.5.6.tar.gz
ln -s keycloak-26.5.6 keycloak

# Cấu hình database
cat &gt; /opt/keycloak/conf/keycloak.conf &lt;&lt; 'EOF'
# Database
db=postgres
db-url-host=localhost
db-url-port=5432
db-url-database=keycloak
db-username=keycloak
db-password=keycloak_password

# Hostname
hostname=keycloak.example.com

# HTTP
http-enabled=true
http-port=8080
EOF

# Chạy development mode
/opt/keycloak/bin/kc.sh start-dev</code></pre>

<h3 id="24-tao-admin-user"><strong>2.4.管理者ユーザーの作成</strong></h3>
<pre><code class="language-bash"># Tạo admin user khi start
KEYCLOAK_ADMIN=admin KEYCLOAK_ADMIN_PASSWORD=admin \
  /opt/keycloak/bin/kc.sh start-dev

# Hoặc dùng lệnh bootstrap
/opt/keycloak/bin/kc.sh bootstrap-admin user \
  --username admin --password admin</code></pre>

<h2 id="3-cai-dat-docker"><strong>3. Docker と Docker Compose を使用してインストールする</strong></h2>

<h3 id="31-docker-don-gian"><strong>3.1.シンプルな Docker (開発)</strong></h3>
<pre><code class="language-bash">docker run -d --name keycloak \
  -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:26.5.6 \
  start-dev</code></pre>

<h3 id="32-docker-compose-production"><strong>3.2. Docker Compose (実稼働対応)</strong></h3>
<pre><code class="language-yaml"># docker-compose.yml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: keycloak
      POSTGRES_USER: keycloak
      POSTGRES_PASSWORD: keycloak_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - keycloak-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U keycloak"]
      interval: 10s
      timeout: 5s
      retries: 5

  keycloak:
    image: quay.io/keycloak/keycloak:26.5.6
    command: start
    environment:
      KC_DB: postgres
      KC_DB_URL_HOST: postgres
      KC_DB_URL_PORT: "5432"
      KC_DB_URL_DATABASE: keycloak
      KC_DB_USERNAME: keycloak
      KC_DB_PASSWORD: keycloak_password
      KC_HOSTNAME: keycloak.example.com
      KC_PROXY_HEADERS: xforwarded
      KC_HTTP_ENABLED: "true"
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin
    ports:
      - "8080:8080"
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - keycloak-network

volumes:
  postgres_data:

networks:
  keycloak-network:</code></pre>

<h2 id="4-kubernetes-operator"><strong>4. Kubernetes オペレーターのデプロイメント</strong></h2>

<h3 id="41-cai-dat-operator"><strong>4.1. Keycloakオペレーターをインストールする</strong></h3>
<pre><code class="language-bash"># Cài đặt Operator qua OperatorHub hoặc manifests
kubectl apply -f https://raw.githubusercontent.com/keycloak/keycloak-k8s-resources/26.5.6/kubernetes/keycloaks.k8s.keycloak.org-v1.yml
kubectl apply -f https://raw.githubusercontent.com/keycloak/keycloak-k8s-resources/26.5.6/kubernetes/keycloakrealmimports.k8s.keycloak.org-v1.yml
kubectl apply -f https://raw.githubusercontent.com/keycloak/keycloak-k8s-resources/26.5.6/kubernetes/kubernetes.yml</code></pre>

<h3 id="42-keycloak-cr"><strong>4.2. Keycloakカスタムリソース</strong></h3>
<pre><code class="language-yaml">apiVersion: k8s.keycloak.org/v2alpha1
kind: Keycloak
metadata:
  name: keycloak
spec:
  instances: 2
  db:
    vendor: postgres
    host: postgres-service
    usernameSecret:
      name: keycloak-db-secret
      key: username
    passwordSecret:
      name: keycloak-db-secret
      key: password
  hostname:
    hostname: keycloak.example.com
  http:
    httpEnabled: true
  proxy:
    headers: xforwarded
  truststores:
    my-truststore:
      secret:
        name: my-truststore-secret</code></pre>

<h2 id="5-dev-vs-prod"><strong>5. 開発モードと本番モード</strong></h2>

<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>基準</th>
<th>開発 (開始-開発)</th>
<th>生産（開始）</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>データベース</strong></td>
<td>H2 埋め込み (デフォルト)</td>
<td>PostgreSQL/MySQL (必須)</td>
</tr>
<tr>
<td><strong>HTTPS</strong></td>
<td>オプション</td>
<td>必須 (または代理)</td>
</tr>
<tr>
<td><strong>ホスト名</strong></td>
<td>ローカルホスト (自動)</td>
<td>ホスト名を設定する必要があります</td>
</tr>
<tr>
<td><strong>キャッシュ</strong></td>
<td>ローカルキャッシュ</td>
<td>分散キャッシュ (Infinispan)</td>
</tr>
<tr>
<td><strong>テーマキャッシュ</strong></td>
<td>無効 (ホットリロード)</td>
<td>有効</td>
</tr>
<tr>
<td><strong>建てる</strong></td>
<td>最初に構築する必要はありません</td>
<td>最初に kc.sh ビルドを実行する必要があります</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->

<h2 id="6-cau-hinh-https"><strong>6. HTTPS/TLS の構成</strong></h2>
<pre><code class="language-bash"># Tạo keystore với self-signed certificate
keytool -genkeypair -storepass password -storetype PKCS12 \
  -keyalg RSA -keysize 2048 -dname "CN=keycloak.example.com" \
  -alias server -ext "SAN:c=DNS:keycloak.example.com" \
  -keystore /opt/keycloak/conf/server.keystore

# Cấu hình trong keycloak.conf
# https-certificate-file=/path/to/cert.pem
# https-certificate-key-file=/path/to/key.pem
# Hoặc
# https-key-store-file=/opt/keycloak/conf/server.keystore
# https-key-store-password=password</code></pre>

<h2 id="7-reverse-proxy"><strong>7. リバースプロキシの構成 (Nginx)</strong></h2>
<pre><code class="language-nginx">upstream keycloak {
    server 127.0.0.1:8080;
}

server {
    listen 443 ssl http2;
    server_name keycloak.example.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    location / {
        proxy_pass http://keycloak;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
    }
}</code></pre>

<h2 id="8-systemd-service"><strong>8. Systemd サービスの作成</strong></h2>
<pre><code class="language-ini"># /etc/systemd/system/keycloak.service
[Unit]
Description=Keycloak Server
After=network.target postgresql.service

[Service]
Type=exec
User=keycloak
Group=keycloak
ExecStart=/opt/keycloak/bin/kc.sh start --optimized
ExecStop=/bin/kill -TERM $MAINPID
Restart=on-failure
RestartSec=10
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target</code></pre>
<pre><code class="language-bash">sudo systemctl daemon-reload
sudo systemctl enable keycloak
sudo systemctl start keycloak</code></pre>
