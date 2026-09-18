---
id: 019c9617-fd1b-734f-b44a-7c96d34f532c
title: Install Harbor on Ubuntu 24.04
slug: cai-dat-harbor-tren-ubuntu-24-04
excerpt: >-
  Detailed instructions for installing Harbor - private Docker registry on
  Ubuntu 24.04, including HTTPS, security, backup and best practices.
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
  name: DevOps
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
locale: en
---
<h2 id="gi%E1%BB%9Bi-thi%E1%BB%87u">Introduction</h2><p>Harbor is an open source registry for storing and managing Docker images and Helm charts. Harbor extends Docker Registry by adding functionality such as user management, security scanning, and image replication between registries.</p><h2 id="y%C3%AAu-c%E1%BA%A7u-h%E1%BB%87-th%E1%BB%91ng">System requirements</h2><ul><li><strong>Operating system</strong>: Ubuntu 24.04 LTS</li><li><strong>CPU</strong>: Minimum 2 cores</li><li><strong>RAM</strong>: Minimum 4GB (recommended 8GB)</li><li><strong>Hard drive</strong>: Minimum 40GB free space</li><li><strong>Access rights</strong>: Root or sudo</li></ul><h2 id="c%C3%A1c-b%C6%B0%E1%BB%9Bc-c%C3%A0i-%C4%91%E1%BA%B7t">Installation steps</h2><h3 id="b%C6%B0%E1%BB%9Bc-1-c%E1%BA%ADp-nh%E1%BA%ADt-h%E1%BB%87-th%E1%BB%91ng">Step 1: Update the system</h3><p>First, update the packages list and upgrade the system:</p><p>bash</p><pre><code class="language-bash">sudo apt update
sudo apt upgrade -y</code></pre><h3 id="b%C6%B0%E1%BB%9Bc-2-c%C3%A0i-%C4%91%E1%BA%B7t-docker">Step 2: Install Docker</h3><p>Harbor requires Docker to run. Install Docker using the following commands:</p><p>bash</p><pre><code class="language-bash"># Cài đặt Docker
sudo apt install -y docker.io

# Khởi động và kích hoạt Docker
sudo systemctl start docker
sudo systemctl enable docker

# Kiểm tra phiên bản Docker
docker --version</code></pre><h3 id="b%C6%B0%E1%BB%9Bc-3-c%C3%A0i-%C4%91%E1%BA%B7t-docker-compose">Step 3: Install Docker Compose</h3><p>Docker Compose is used to manage Harbor containers:</p><pre><code class="language-bash"># Tải Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Cấp quyền thực thi
sudo chmod +x /usr/local/bin/docker-compose

# Kiểm tra phiên bản
docker-compose --version</code></pre><h3 id="b%C6%B0%E1%BB%9Bc-4-t%E1%BA%A3i-xu%E1%BB%91ng-harbor">Step 4: Download Harbor</h3><p>Move to folder <code>/opt</code> and download the latest version of Harbor:</p><pre><code class="language-bash"># Di chuyển đến thư mục /opt
cd /opt

# Tải Harbor (phiên bản 2.11.2 - kiểm tra phiên bản mới nhất tại GitHub)
sudo wget https://github.com/goharbor/harbor/releases/download/v2.11.2/harbor-offline-installer-v2.11.2.tgz

# Giải nén
sudo tar xzvf harbor-offline-installer-v2.11.2.tgz</code></pre><h3 id="b%C6%B0%E1%BB%9Bc-5-c%E1%BA%A5u-h%C3%ACnh-harbor">Step 5: Configure Harbor</h3><p>Move into the Harbor folder and create a configuration file:</p><pre><code class="language-bash">cd /opt/harbor
sudo cp harbor.yml.tmpl harbor.yml</code></pre><p>Edit configuration file <code>harbor.yml</code>:</p><pre><code class="language-bash">sudo nano harbor.yml</code></pre><p><strong>Important parameters to configure:</strong></p><pre><code class="language-yaml"># Hostname - thay bằng IP hoặc domain của bạn
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
data_volume: /data</code></pre><p><strong>Important note:</strong></p><ol><li><strong>hostname</strong>: Must be the domain or IP from which you will access Harbor</li><li><strong>harbor_admin_password</strong>: Change the default password for security</li><li>If you only test on the local machine, you can leave it on HTTP. For production, you should use HTTPS</li></ol><h3 id="b%C6%B0%E1%BB%9Bc-6-c%C3%A0i-%C4%91%E1%BA%B7t-harbor">Step 6: Install Harbor</h3><p>Run the installation script:</p><pre><code class="language-bash"># Cài đặt Harbor cơ bản
sudo ./install.sh

# Hoặc cài đặt với các thành phần bổ sung
# sudo ./install.sh --with-trivy --with-chartmuseum</code></pre><p><strong>Installation options:</strong></p><ul><li><code>--with-trivy</code>: Enable vulnerability scanning</li><li><code>--with-chartmuseum</code>: Enable Helm chart repository support</li><li><code>--with-notary</code>: Enable content trust digital signing feature</li></ul><h3 id="b%C6%B0%E1%BB%9Bc-7-ki%E1%BB%83m-tra-tr%E1%BA%A1ng-th%C3%A1i">Step 7: Check status</h3><p>After installation, check the Harbor containers:</p><pre><code class="language-bash">sudo docker-compose ps</code></pre><p>You will see running containers like:</p><ul><li>harbor-core</li><li>harbor-portal</li><li>harbor-db</li><li>harbor-redis</li><li>nginx</li><li>registry. registry</li></ul><h3 id="b%C6%B0%E1%BB%9Bc-8-truy-c%E1%BA%ADp-harbor-web-ui">Step 8: Access Harbor Web UI</h3><p>Open a browser and access:</p><pre><code>http://your-hostname-or-ip</code></pre><p><strong>Default login information:</strong></p><ul><li>Username: <code>admin. admin</code></li><li>Password: The password you configured in <code>harbor.yml</code> (default: <code>Harbor12345</code>)</li></ul><h2 id="qu%E1%BA%A3n-l%C3%BD-harbor">Harbor Management</h2><h3 id="d%E1%BB%ABng-harbor">Stop Harbor</h3><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose stop</code></pre><h3 id="kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-harbor">Launch Harbor</h3><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose start</code></pre><h3 id="kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-l%E1%BA%A1i-harbor">Restart Harbor</h3><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose restart</code></pre><h3 id="g%E1%BB%A1-c%C3%A0i-%C4%91%E1%BA%B7t-harbor">Uninstall Harbor</h3><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose down -v</code></pre><h2 id="c%E1%BA%A5u-h%C3%ACnh-docker-client-%C4%91%E1%BB%83-s%E1%BB%AD-d%E1%BB%A5ng-harbor">Configure Docker Client to use Harbor</h2><h3 id="v%E1%BB%9Bi-http-kh%C3%B4ng-ssl">With HTTP (no SSL)</h3><p>Add Harbor to the list of insecure registries:</p><pre><code class="language-bash">sudo nano /etc/docker/daemon.json</code></pre><p>Add content:</p><p>json</p><pre><code class="language-json">{
  "insecure-registries": ["your-harbor-ip:80"]
}</code></pre><p>Restart Docker:</p><pre><code class="language-bash">sudo systemctl restart docker</code></pre><h3 id="%C4%91%C4%83ng-nh%E1%BA%ADp-v%C3%A0o-harbor-t%E1%BB%AB-docker-cli">Login to Harbor from Docker CLI</h3><pre><code class="language-bash">docker login your-harbor-ip
# Nhập username: admin
# Nhập password: your-password</code></pre><h3 id="push-image-l%C3%AAn-harbor">Push image to Harbor</h3><pre><code class="language-bash"># Tag image
docker tag nginx:latest your-harbor-ip/library/nginx:latest

# Push image
docker push your-harbor-ip/library/nginx:latest</code></pre><h3 id="pull-image-t%E1%BB%AB-harbor">Pull image from Harbor</h3><pre><code class="language-bash">docker pull your-harbor-ip/library/nginx:latest</code></pre><h2 id="c%E1%BA%A5u-h%C3%ACnh-https-cho-harbor-production">Configuring HTTPS for Harbor (Production)</h2><h3 id="1-t%E1%BA%A1o-self-signed-certificate-cho-test">1. Create self-signed certificate (for testing)</h3><pre><code class="language-bash"># Tạo thư mục chứa certificate
sudo mkdir -p /opt/harbor/certs
cd /opt/harbor/certs

# Tạo private key
sudo openssl genrsa -out harbor.key 4096

# Tạo certificate signing request
sudo openssl req -new -key harbor.key -out harbor.csr

# Tạo self-signed certificate
sudo openssl x509 -req -days 365 -in harbor.csr -signkey harbor.key -out harbor.crt</code></pre><h3 id="2-c%E1%BA%ADp-nh%E1%BA%ADt-c%E1%BA%A5u-h%C3%ACnh-harbor">2. Update Harbor configuration</h3><p>Edit <code>/opt/harbor/harbor.yml</code>:</p><pre><code class="language-yaml">https:
  port: 443
  certificate: /opt/harbor/certs/harbor.crt
  private_key: /opt/harbor/certs/harbor.key</code></pre><h3 id="3-c%C3%A0i-%C4%91%E1%BA%B7t-l%E1%BA%A1i-harbor">3. Reinstall Harbor</h3><pre><code class="language-bash">cd /opt/harbor
sudo ./prepare
sudo docker-compose down -v
sudo docker-compose up -d</code></pre><h2 id="backup-v%C3%A0-restore">Backup and Restore</h2><h3 id="backup-harbor">Backup Harbor</h3><pre><code class="language-bash"># Backup cơ sở dữ liệu và cấu hình
cd /opt/harbor
sudo docker-compose stop

# Backup data directory
sudo tar -czf harbor-backup-$(date +%Y%m%d).tar.gz /data /opt/harbor/harbor.yml

sudo docker-compose start</code></pre><h3 id="restore-harbor">Restore Harbor</h3><pre><code class="language-bash"># Stop Harbor
cd /opt/harbor
sudo docker-compose down

# Restore data
sudo tar -xzf harbor-backup-YYYYMMDD.tar.gz -C /

# Start Harbor
sudo docker-compose up -d</code></pre><h2 id="kh%E1%BA%AFc-ph%E1%BB%A5c-s%E1%BB%B1-c%E1%BB%91-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p">Troubleshoot common problems</h2><h3 id="1-harbor-kh%C3%B4ng-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-%C4%91%C6%B0%E1%BB%A3c">1. Harbor fails to start</h3><p>Check logs:</p><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose logs</code></pre><h3 id="2-kh%C3%B4ng-th%E1%BB%83-pushpull-image">2. Cannot push/pull images</h3><ul><li>Check configuration <code>insecure-registries</code> in <code>/etc/docker/daemon.json</code></li><li>Make sure you're logged in: <code>docker login your-harbor-ip</code></li><li>Check the firewall: <code>sudo ufw status</code></li></ul><h3 id="3-l%E1%BB%97i-x509-certificate-signed-by-unknown-authority">3. Error "x509: certificate signed by unknown authority"</h3><p>If using a self-signed certificate, you need to add the certificate to Docker:</p><pre><code class="language-bash">sudo mkdir -p /etc/docker/certs.d/your-harbor-ip
sudo cp /opt/harbor/certs/harbor.crt /etc/docker/certs.d/your-harbor-ip/ca.crt
sudo systemctl restart docker</code></pre><h3 id="4-port-%C4%91%C3%A3-%C4%91%C6%B0%E1%BB%A3c-s%E1%BB%AD-d%E1%BB%A5ng">4. Port is already in use</h3><p>Check the port being used:</p><pre><code class="language-bash">sudo netstat -tulpn | grep :80</code></pre><p>Change internal port <code>harbor.yml</code> if needed.</p><h2 id="c%C3%A1c-t%C3%ADnh-n%C4%83ng-n%C3%A2ng-cao">Advanced features</h2><h3 id="1-qu%C3%A9t-l%E1%BB%97-h%E1%BB%95ng-b%E1%BA%A3o-m%E1%BA%ADt-v%E1%BB%9Bi-trivy">1. Scan for security vulnerabilities with Trivy</h3><p>After installing with <code>--with-trivy</code>, you can:</p><ul><li>Scan images automatically when pushed</li><li>View vulnerability reports in Web UI</li><li>Block pulling images with serious vulnerabilities</li></ul><h3 id="2-sao-ch%C3%A9p-replication">2. Replication</h3><p>Harbor supports copying images between registries:</p><ul><li>Access <strong>Administration</strong> → <strong>Replications</strong></li><li>Create destination endpoint</li><li>Create replication rule</li></ul><h3 id="3-qu%E1%BA%A3n-l%C3%BD-ng%C6%B0%E1%BB%9Di-d%C3%B9ng-v%C3%A0-ph%C3%A2n-quy%E1%BB%81n">3. User management and authorization</h3><ul><li>Create separate projects for each team</li><li>Permissions: Project Admin, Developer, Guest</li><li>Integrate LDAP/AD for authentication</li></ul><h3 id="4-webhook">4. Webhooks</h3><p>Configure webhooks to receive notifications when:</p><ul><li>Image is pushed</li><li>Image is pulled</li><li>Security scan completed</li></ul><h2 id="b%E1%BA%A3o-m%E1%BA%ADt-harbor">Harbor Security</h2><h3 id="best-practices">Best Practices</h3><ol><li><strong>Change the default admin password</strong> immediately after installation</li><li><strong>Use HTTPS</strong> for production environments</li><li><strong>Enable vulnerability scanning</strong> with Trivy</li><li><strong>Access restrictions</strong> by firewall</li><li><strong>Periodic backups</strong> data and configuration</li><li><strong>Harbor Update</strong> often</li><li><strong>Use RBAC</strong> to manage access rights</li><li><strong>Turn on audit log</strong> to track activity</li></ol><h3 id="c%E1%BA%A5u-h%C3%ACnh-firewall">Firewall configuration</h3><pre><code class="language-bash"># Cho phép HTTP (port 80)
sudo ufw allow 80/tcp

# Cho phép HTTPS (port 443)
sudo ufw allow 443/tcp

# Cho phép SSH
sudo ufw allow 22/tcp

# Kích hoạt firewall
sudo ufw enable</code></pre><h2 id="k%E1%BA%BFt-lu%E1%BA%ADn">Conclusion</h2><p>You have completed installing Harbor on Ubuntu 24.04. Harbor can now be used as a private Docker registry for your organization with full management, security, and replication features.</p><h2 id="t%C3%A0i-nguy%C3%AAn-tham-kh%E1%BA%A3o">Reference resources</h2><ul><li><strong>Harbor Official Documentation</strong>: <a href="https://goharbor.io/docs/">https://goharbor.io/docs/</a></li><li><strong>GitHub Repository</strong>: <a href="https://github.com/goharbor/harbor">https://github.com/goharbor/harbor</a></li><li><strong>Community Forum</strong>: <a href="https://github.com/goharbor/harbor/discussions">https://github.com/goharbor/harbor/discussions</a></li></ul><h2 id="c%C3%A1c-l%E1%BB%87nh-h%E1%BB%AFu-%C3%ADch">Useful commands</h2><pre><code class="language-bash"># Kiểm tra phiên bản Harbor
docker exec harbor-core harbor version

# Xem logs của tất cả services
docker-compose logs -f

# Xem logs của một service cụ thể
docker-compose logs -f harbor-core

# Kiểm tra disk usage
df -h /data

# Clean up unused images (giải phóng dung lượng)
docker system prune -a</code></pre><hr><p><strong>Note</strong>: This guide applies to Harbor v2.11.2 on Ubuntu 24.04. Some details may vary depending on the version of Harbor you use.</p>
