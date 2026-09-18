---
id: 019d8b30-b102-7001-c001-e0c5f8100102
title: 第 2 課：安裝 Keycloak - 獨立版、Docker 和 Kubernetes
slug: bai-2-cai-dat-keycloak-standalone-docker-va-kubernetes
description: 在裸機 (Ubuntu/CentOS)、Docker Compose 和 Kubernetes Operator 上安裝 Keycloak 26.x 的說明。設定資料庫後端（PostgreSQL、MySQL、MariaDB）、HTTPS/TLS、反向代理（Nginx、HAProxy）、主機名稱配置 v2 並在開發與生產模式下執行 Keycloak。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 2
section_title: 第 1 部分：Keycloak 平台
course:
  id: 019d8b30-b100-7001-c001-e0c5f8100001
  title: 鑰匙斗篷從基礎到高級
  slug: keycloak-tu-co-ban-den-nang-cao
locale: zh-tw
---
<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/03/keycloak-deployment-options-2026.webp" alt="Keycloak Deployment Options" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>3種Keycloak部署方式：Standalone、Docker Compose、Kubernetes Operator</em></p>
</div>

<h2 id="1-yeu-cau-he-thong"><strong>1. 系統要求</strong></h2>
<p>在安裝 Keycloak 26.x 之前，請確保您的系統符合以下要求：</p>

<ul>
<li><p><strong>爪哇</strong>：JDK 17 或 21（推薦 OpenJDK 21）</p></li>
<li><p><strong>資料庫</strong>：PostgreSQL 13-16（推薦）、MySQL 8.0+、MariaDB 10.6+</p></li>
<li><p><strong>記憶體</strong>：至少 512MB（建議 2GB+ 用於生產）</p></li>
<li><p><strong>中央處理器</strong>：至少 1 個核心（建議生產時使用 2 個以上核心）</p></li>
<li><p><strong>作業系統</strong>：Linux（Ubuntu 22.04/24.04、CentOS 9、RHEL 9）、macOS、Windows</p></li>
</ul>

<h2 id="2-cai-dat-bare-metal"><strong>2. 在裸機上安裝 (Ubuntu)</strong></h2>

<h3 id="21-cai-dat-java"><strong>2.1.安裝Java 21</strong></h3>
<pre><code class="language-bash">sudo apt update
sudo apt install -y openjdk-21-jdk
java -version</code></pre>

<h3 id="22-cai-dat-postgresql"><strong>2.2.安裝 PostgreSQL</strong></h3>
<pre><code class="language-bash">sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Tạo database và user cho Keycloak
sudo -u postgres psql -c "CREATE USER keycloak WITH PASSWORD 'keycloak_password';"
sudo -u postgres psql -c "CREATE DATABASE keycloak OWNER keycloak;"</code></pre>

<h3 id="23-tai-va-cai-dat-keycloak"><strong>2.3.下載並安裝Keycloak</strong></h3>
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

<h3 id="24-tao-admin-user"><strong>2.4.建立管理員用戶</strong></h3>
<pre><code class="language-bash"># Tạo admin user khi start
KEYCLOAK_ADMIN=admin KEYCLOAK_ADMIN_PASSWORD=admin \
  /opt/keycloak/bin/kc.sh start-dev

# Hoặc dùng lệnh bootstrap
/opt/keycloak/bin/kc.sh bootstrap-admin user \
  --username admin --password admin</code></pre>

<h2 id="3-cai-dat-docker"><strong>3. 使用 Docker 和 Docker Compose 安裝</strong></h2>

<h3 id="31-docker-don-gian"><strong>3.1.簡單的 Docker（開發）</strong></h3>
<pre><code class="language-bash">docker run -d --name keycloak \
  -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:26.5.6 \
  start-dev</code></pre>

<h3 id="32-docker-compose-production"><strong>3.2. Docker Compose（生產就緒）</strong></h3>
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

<h2 id="4-kubernetes-operator"><strong>4. Kubernetes Operator部署</strong></h2>

<h3 id="41-cai-dat-operator"><strong>4.1.安裝Keycloak Operator</strong></h3>
<pre><code class="language-bash"># Cài đặt Operator qua OperatorHub hoặc manifests
kubectl apply -f https://raw.githubusercontent.com/keycloak/keycloak-k8s-resources/26.5.6/kubernetes/keycloaks.k8s.keycloak.org-v1.yml
kubectl apply -f https://raw.githubusercontent.com/keycloak/keycloak-k8s-resources/26.5.6/kubernetes/keycloakrealmimports.k8s.keycloak.org-v1.yml
kubectl apply -f https://raw.githubusercontent.com/keycloak/keycloak-k8s-resources/26.5.6/kubernetes/kubernetes.yml</code></pre>

<h3 id="42-keycloak-cr"><strong>4.2. Keycloak 自訂資源</strong></h3>
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

<h2 id="5-dev-vs-prod"><strong>5. 開發模式與生產模式</strong></h2>

<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>標準</th>
<th>開發（啟動-開發）</th>
<th>生產（開始）</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>資料庫</strong></td>
<td>H2 嵌入（預設）</td>
<td>PostgreSQL/MySQL（必要）</td>
</tr>
<tr>
<td><strong>HTTPS</strong></td>
<td>選修的</td>
<td>必需（或代理）</td>
</tr>
<tr>
<td><strong>主機名稱</strong></td>
<td>本機（自動）</td>
<td>必須配置主機名</td>
</tr>
<tr>
<td><strong>快取</strong></td>
<td>本機快取</td>
<td>分散式快取（Infinispan）</td>
</tr>
<tr>
<td><strong>主題緩存</strong></td>
<td>禁用（熱重載）</td>
<td>啟用</td>
</tr>
<tr>
<td><strong>建造</strong></td>
<td>無需先構建</td>
<td>你應該先運行 kc.sh build</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->

<h2 id="6-cau-hinh-https"><strong>6.配置HTTPS/TLS</strong></h2>
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

<h2 id="7-reverse-proxy"><strong>7. 設定反向代理（Nginx）</strong></h2>
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

<h2 id="8-systemd-service"><strong>8.創建Systemd服務</strong></h2>
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
