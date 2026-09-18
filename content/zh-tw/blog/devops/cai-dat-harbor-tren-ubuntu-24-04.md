---
id: 019c9617-fd1b-734f-b44a-7c96d34f532c
title: 在 Ubuntu 24.04 上安裝 Harbor
slug: cai-dat-harbor-tren-ubuntu-24-04
excerpt: 在 Ubuntu 24.04 上安裝 Harbor - 私人 Docker 註冊表的詳細說明，包括 HTTPS、安全性、備份和最佳實踐。
featured_image: /images/blog/harbor-ubuntu-featured.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2025-12-02T02:48:45.000000Z'
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
  - name: devops
    slug: devops
  - name: linux
    slug: linux
  - name: kubernetes
    slug: kubernetes
  - name: Docker
    slug: docker
  - name: harbor
    slug: harbor
  - name: Docker Registry
    slug: docker-registry
  - name: Ubuntu 24.04
    slug: ubuntu-2404
  - name: Container
    slug: container
  - name: CI/CD
    slug: cicd
  - name: Self-hosted
    slug: self-hosted
comments: []
locale: zh-tw
---
<h2 id="gi%E1%BB%9Bi-thi%E1%BB%87u">簡介</h2><p>Harbor 是一個用於儲存和管理 Docker 映像和 Helm 圖表的開源註冊表。 Harbor 透過新增使用者管理、安全掃描和登錄之間的映像複製等功能來擴充 Docker 註冊表。</p><h2 id="y%C3%AAu-c%E1%BA%A7u-h%E1%BB%87-th%E1%BB%91ng">系統需求</h2><ul><li><strong>作業系統</strong>：Ubuntu 24.04 LTS</li><li><strong>中央處理器</strong>：至少 2 核</li><li><strong>記憶體</strong>：最低 4GB（建議 8GB）</li><li><strong>硬碟</strong>：至少 40GB 可用空間</li><li><strong>訪問權</strong>：root 或 sudo</li></ul><h2 id="c%C3%A1c-b%C6%B0%E1%BB%9Bc-c%C3%A0i-%C4%91%E1%BA%B7t">安裝步驟</h2><h3 id="b%C6%B0%E1%BB%9Bc-1-c%E1%BA%ADp-nh%E1%BA%ADt-h%E1%BB%87-th%E1%BB%91ng">第 1 步：更新系統</h3><p>首先，更新軟體包清單並升級系統：</p><p>巴什</p><pre><code class="language-bash">sudo apt update
sudo apt upgrade -y</code></pre><h3 id="b%C6%B0%E1%BB%9Bc-2-c%C3%A0i-%C4%91%E1%BA%B7t-docker">步驟2：安裝Docker</h3><p>Harbor 需要 Docker 才能運作。使用以下命令安裝 Docker：</p><p>巴什</p><pre><code class="language-bash"># Cài đặt Docker
sudo apt install -y docker.io

# Khởi động và kích hoạt Docker
sudo systemctl start docker
sudo systemctl enable docker

# Kiểm tra phiên bản Docker
docker --version</code></pre><h3 id="b%C6%B0%E1%BB%9Bc-3-c%C3%A0i-%C4%91%E1%BA%B7t-docker-compose">第 3 步：安裝 Docker Compose</h3><p>Docker Compose 用於管理 Harbor 容器：</p><pre><code class="language-bash"># Tải Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Cấp quyền thực thi
sudo chmod +x /usr/local/bin/docker-compose

# Kiểm tra phiên bản
docker-compose --version</code></pre><h3 id="b%C6%B0%E1%BB%9Bc-4-t%E1%BA%A3i-xu%E1%BB%91ng-harbor">第四步：下載Harbor</h3><p>移至資料夾 <code>/選擇</code> 並下載最新版本的Harbor：</p><pre><code class="language-bash"># Di chuyển đến thư mục /opt
cd /opt

# Tải Harbor (phiên bản 2.11.2 - kiểm tra phiên bản mới nhất tại GitHub)
sudo wget https://github.com/goharbor/harbor/releases/download/v2.11.2/harbor-offline-installer-v2.11.2.tgz

# Giải nén
sudo tar xzvf harbor-offline-installer-v2.11.2.tgz</code></pre><h3 id="b%C6%B0%E1%BB%9Bc-5-c%E1%BA%A5u-h%C3%ACnh-harbor">第5步：配置Harbor</h3><p>進入 Harbor 資料夾並建立一個設定檔：</p><pre><code class="language-bash">cd /opt/harbor
sudo cp harbor.yml.tmpl harbor.yml</code></pre><p>編輯設定檔 <code>港口.yml</code>:</p><pre><code class="language-bash">sudo nano harbor.yml</code></pre><p><strong>要配置的重要參數：</strong></p><pre><code class="language-yaml"># Hostname - thay bằng IP hoặc domain của bạn
hostname: your-domain.com  # hoặc IP: 192.168.1.100

# Giao thức HTTP
http:
  port: 80

# Giao thức HTTPS (tùy chọn - khuyến nghị cho production)
# Bỏ comment nếu muốn sử dụng HTTPS
# https:
#   port: 443
#   certificate: /path/to/cert.crt
#   private_key: /path/to/cert.key

# Mật khẩu admin mặc định (NÊN ĐỔI)
harbor_admin_password: Harbor12345

# Cơ sở dữ liệu
database:
  password: root123
  max_idle_conns: 100
  max_open_conns: 900

# Thư mục lưu trữ data
data_volume: /data</code></pre><p><strong>重要提示：</strong></p><ol><li><strong>主機名稱</strong>：必須是您造訪Harbor的網域或IP</li><li><strong>港口管理員密碼</strong>：更改預設密碼以確保安全</li><li>如果您只在本機電腦上進行測試，則可以將其保留在 HTTP 上。對於生產，您應該使用 HTTPS</li></ol><h3 id="b%C6%B0%E1%BB%9Bc-6-c%C3%A0i-%C4%91%E1%BA%B7t-harbor">第6步：安裝Harbor</h3><p>運行安裝腳本：</p><pre><code class="language-bash"># Cài đặt Harbor cơ bản
sudo ./install.sh

# Hoặc cài đặt với các thành phần bổ sung
# sudo ./install.sh --with-trivy --with-chartmuseum</code></pre><p><strong>安裝選項：</strong></p><ul><li><code>--with-trivy</code>：啟用漏洞掃描</li><li><code>--with-chartmuseum</code>：啟用 Helm 圖表存儲庫支持</li><li><code>--與公證人</code>：啟用內容信任數位簽章功能</li></ul><h3 id="b%C6%B0%E1%BB%9Bc-7-ki%E1%BB%83m-tra-tr%E1%BA%A1ng-th%C3%A1i">第 7 步：檢查狀態</h3><p>安裝完成後，檢查Harbor容器：</p><pre><code class="language-bash">sudo docker-compose ps</code></pre><p>您將看到正在運行的容器，例如：</p><ul><li>港口核心</li><li>港口門戶</li><li>港口資料庫</li><li>港口Redis</li><li>nginx</li><li>註冊表。註冊表</li></ul><h3 id="b%C6%B0%E1%BB%9Bc-8-truy-c%E1%BA%ADp-harbor-web-ui">步驟8：存取Harbor Web UI</h3><p>打開瀏覽器並造訪：</p><pre><code>http://your-hostname-or-ip</code></pre><p><strong>預設登入資訊：</strong></p><ul><li>使用者名稱： <code>管理員。管理員</code></li><li>密碼：您在其中設定的密碼 <code>港口.yml</code> （預設： <code>港灣12345</code>）</li></ul><h2 id="qu%E1%BA%A3n-l%C3%BD-harbor">港口管理</h2><h3 id="d%E1%BB%ABng-harbor">停止港口</h3><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose stop</code></pre><h3 id="kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-harbor">發射港</h3><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose start</code></pre><h3 id="kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-l%E1%BA%A1i-harbor">重啟港口</h3><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose restart</code></pre><h3 id="g%E1%BB%A1-c%C3%A0i-%C4%91%E1%BA%B7t-harbor">卸載Harbor</h3><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose down -v</code></pre><h2 id="c%E1%BA%A5u-h%C3%ACnh-docker-client-%C4%91%E1%BB%83-s%E1%BB%AD-d%E1%BB%A5ng-harbor">配置 Docker 用戶端以使用 Harbor</h2><h3 id="v%E1%BB%9Bi-http-kh%C3%B4ng-ssl">使用 HTTP（無 SSL）</h3><p>將 Harbor 新增至不安全登錄清單：</p><pre><code class="language-bash">sudo nano /etc/docker/daemon.json</code></pre><p>添加內容：</p><p>json</p><pre><code class="language-json">{
  "insecure-registries": ["your-harbor-ip:80"]
}</code></pre><p>重新啟動 Docker：</p><pre><code class="language-bash">sudo systemctl restart docker</code></pre><h3 id="%C4%91%C4%83ng-nh%E1%BA%ADp-v%C3%A0o-harbor-t%E1%BB%AB-docker-cli">從 Docker CLI 登入 Harbor</h3><pre><code class="language-bash">docker login your-harbor-ip
# Nhập username: admin
# Nhập password: your-password</code></pre><h3 id="push-image-l%C3%AAn-harbor">將鏡像推送到Harbor</h3><pre><code class="language-bash"># Tag image
docker tag nginx:latest your-harbor-ip/library/nginx:latest

# Push image
docker push your-harbor-ip/library/nginx:latest</code></pre><h3 id="pull-image-t%E1%BB%AB-harbor">從 Harbor 拉取鏡像</h3><pre><code class="language-bash">docker pull your-harbor-ip/library/nginx:latest</code></pre><h2 id="c%E1%BA%A5u-h%C3%ACnh-https-cho-harbor-production">為 Harbor 配置 HTTPS（生產）</h2><h3 id="1-t%E1%BA%A1o-self-signed-certificate-cho-test">1.建立自簽名憑證（用於測試）</h3><pre><code class="language-bash"># Tạo thư mục chứa certificate
sudo mkdir -p /opt/harbor/certs
cd /opt/harbor/certs

# Tạo private key
sudo openssl genrsa -out harbor.key 4096

# Tạo certificate signing request
sudo openssl req -new -key harbor.key -out harbor.csr

# Tạo self-signed certificate
sudo openssl x509 -req -days 365 -in harbor.csr -signkey harbor.key -out harbor.crt</code></pre><h3 id="2-c%E1%BA%ADp-nh%E1%BA%ADt-c%E1%BA%A5u-h%C3%ACnh-harbor">2.更新Harbor配置</h3><p>編輯 <code>/opt/harbor/harbor.yml</code>:</p><pre><code class="language-yaml">https:
  port: 443
  certificate: /opt/harbor/certs/harbor.crt
  private_key: /opt/harbor/certs/harbor.key</code></pre><h3 id="3-c%C3%A0i-%C4%91%E1%BA%B7t-l%E1%BA%A1i-harbor">3.重新安裝Harbor</h3><pre><code class="language-bash">cd /opt/harbor
sudo ./prepare
sudo docker-compose down -v
sudo docker-compose up -d</code></pre><h2 id="backup-v%C3%A0-restore">備份與復原</h2><h3 id="backup-harbor">備份港</h3><pre><code class="language-bash"># Backup cơ sở dữ liệu và cấu hình
cd /opt/harbor
sudo docker-compose stop

# Backup data directory
sudo tar -czf harbor-backup-$(date +%Y%m%d).tar.gz /data /opt/harbor/harbor.yml

sudo docker-compose start</code></pre><h3 id="restore-harbor">恢復港口</h3><pre><code class="language-bash"># Stop Harbor
cd /opt/harbor
sudo docker-compose down

# Restore data
sudo tar -xzf harbor-backup-YYYYMMDD.tar.gz -C /

# Start Harbor
sudo docker-compose up -d</code></pre><h2 id="kh%E1%BA%AFc-ph%E1%BB%A5c-s%E1%BB%B1-c%E1%BB%91-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p">解決常見問題</h2><h3 id="1-harbor-kh%C3%B4ng-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-%C4%91%C6%B0%E1%BB%A3c">1.Harbor無法啟動</h3><p>檢查日誌：</p><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose logs</code></pre><h3 id="2-kh%C3%B4ng-th%E1%BB%83-pushpull-image">2. 無法推播/拉取鏡像</h3><ul><li>檢查配置 <code>不安全的註冊表</code> 在 <code>/etc/docker/daemon.json</code></li><li>確保您已登入： <code>docker 登入 your-harbor-ip</code></li><li>檢查防火牆： <code>須藤 ufw 狀態</code></li></ul><h3 id="3-l%E1%BB%97i-x509-certificate-signed-by-unknown-authority">3. 錯誤“x509：由未知頒發機構簽署的證書”</h3><p>如果使用自簽名證書，則需要將證書新增至Docker：</p><pre><code class="language-bash">sudo mkdir -p /etc/docker/certs.d/your-harbor-ip
sudo cp /opt/harbor/certs/harbor.crt /etc/docker/certs.d/your-harbor-ip/ca.crt
sudo systemctl restart docker</code></pre><h3 id="4-port-%C4%91%C3%A3-%C4%91%C6%B0%E1%BB%A3c-s%E1%BB%AD-d%E1%BB%A5ng">4. 連接埠已被使用</h3><p>檢查正在使用的連接埠：</p><pre><code class="language-bash">sudo netstat -tulpn | grep :80</code></pre><p>更改內部連接埠 <code>港口.yml</code> 如果需要的話。</p><h2 id="c%C3%A1c-t%C3%ADnh-n%C4%83ng-n%C3%A2ng-cao">進階功能</h2><h3 id="1-qu%C3%A9t-l%E1%BB%97-h%E1%BB%95ng-b%E1%BA%A3o-m%E1%BA%ADt-v%E1%BB%9Bi-trivy">1. 使用 Trivy 掃描安全漏洞</h3><p>安裝後 <code>--with-trivy</code>，您可以：</p><ul><li>按下時自動掃描影像</li><li>在 Web UI 中查看漏洞報告</li><li>阻止拉取存在嚴重漏洞的鏡像</li></ul><h3 id="2-sao-ch%C3%A9p-replication">2. 複製</h3><p>Harbor支援在registry之間複製鏡像：</p><ul><li>訪問 <strong>行政管理</strong> → <strong>複製</strong></li><li>建立目標端點</li><li>建立複製規則</li></ul><h3 id="3-qu%E1%BA%A3n-l%C3%BD-ng%C6%B0%E1%BB%9Di-d%C3%B9ng-v%C3%A0-ph%C3%A2n-quy%E1%BB%81n">3.用戶管理與授權</h3><ul><li>為每個團隊創建單獨的項目</li><li>權限：專案管理員、開發人員、訪客</li><li>整合 LDAP/AD 進行身份驗證</li></ul><h3 id="4-webhook">4.網絡鉤子</h3><p>配置 webhook 以在以下情況下接收通知：</p><ul><li>圖片已推送</li><li>圖像已拉取</li><li>安全掃描已完成</li></ul><h2 id="b%E1%BA%A3o-m%E1%BA%ADt-harbor">港口保安</h2><h3 id="best-practices">最佳實踐</h3><ol><li><strong>更改預設管理員密碼</strong> 安裝後立即</li><li><strong>使用 HTTPS</strong> 用於生產環境</li><li><strong>啟用漏洞掃描</strong> 與特里維</li><li><strong>訪問限制</strong> 透過防火牆</li><li><strong>定期備份</strong> 數據和配置</li><li><strong>港口更新</strong> 常</li><li><strong>使用角色控制</strong> 管理存取權限</li><li><strong>開啟審計日誌</strong> 追蹤活動</li></ol><h3 id="c%E1%BA%A5u-h%C3%ACnh-firewall">防火牆配置</h3><pre><code class="language-bash"># Cho phép HTTP (port 80)
sudo ufw allow 80/tcp

# Cho phép HTTPS (port 443)
sudo ufw allow 443/tcp

# Cho phép SSH
sudo ufw allow 22/tcp

# Kích hoạt firewall
sudo ufw enable</code></pre><h2 id="k%E1%BA%BFt-lu%E1%BA%ADn">結論</h2><p>您已完成在 Ubuntu 24.04 上安裝 Harbor。 Harbor 現在可以用作您組織的私人 Docker 註冊表，具有完整的管理、安全性和複製功能。</p><h2 id="t%C3%A0i-nguy%C3%AAn-tham-kh%E1%BA%A3o">參考資源</h2><ul><li><strong>港口官方文檔</strong>: <a href="https://goharbor.io/docs/">https://goharbor.io/docs/</a></li><li><strong>GitHub 儲存庫</strong>: <a href="https://github.com/goharbor/harbor">https://github.com/goharbor/harbor</a></li><li><strong>Community 論壇</strong>: <a href="https://github.com/goharbor/harbor/discussions">https://github.com/goharbor/harbor/discussions</a></li></ul><h2 id="c%C3%A1c-l%E1%BB%87nh-h%E1%BB%AFu-%C3%ADch">有用指令</h2><pre><code class="language-bash"># Kiểm tra phiên bản Harbor
docker exec harbor-core harbor version

# Xem logs của tất cả services
docker-compose logs -f

# Xem logs của một service cụ thể
docker-compose logs -f harbor-core

# Kiểm tra disk usage
df -h /data

# Clean up unused images (giải phóng dung lượng)
docker system prune -a</code></pre><hr><p><strong>注意事項</strong>：本指南適用於 Ubuntu 24.04 上的 Harbor v2.11.2。一些細節可能會根據您使用的 Harbor 版本而有所不同。</p>
