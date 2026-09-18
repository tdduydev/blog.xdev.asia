---
id: 019c9617-fd1b-734f-b44a-7c96d34f532c
title: Cài Đặt Harbor trên Ubuntu 24.04
slug: cai-dat-harbor-tren-ubuntu-24-04
excerpt: >-
  Hướng dẫn chi tiết cài đặt Harbor - private Docker registry trên Ubuntu 24.04,
  bao gồm HTTPS, bảo mật, backup và best practices.
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
---
<h2 id="gi%E1%BB%9Bi-thi%E1%BB%87u">Giới thiệu</h2><p>Harbor là một registry mã nguồn mở để lưu trữ và quản lý Docker images và Helm charts. Harbor mở rộng Docker Registry bằng cách thêm các chức năng như quản lý người dùng, quét bảo mật, và sao chép image giữa các registry.</p><h2 id="y%C3%AAu-c%E1%BA%A7u-h%E1%BB%87-th%E1%BB%91ng">Yêu cầu hệ thống</h2><ul><li><strong>Hệ điều hành</strong>: Ubuntu 24.04 LTS</li><li><strong>CPU</strong>: Tối thiểu 2 cores</li><li><strong>RAM</strong>: Tối thiểu 4GB (khuyến nghị 8GB)</li><li><strong>Ổ cứng</strong>: Tối thiểu 40GB dung lượng trống</li><li><strong>Quyền truy cập</strong>: Root hoặc sudo</li></ul><h2 id="c%C3%A1c-b%C6%B0%E1%BB%9Bc-c%C3%A0i-%C4%91%E1%BA%B7t">Các bước cài đặt</h2><h3 id="b%C6%B0%E1%BB%9Bc-1-c%E1%BA%ADp-nh%E1%BA%ADt-h%E1%BB%87-th%E1%BB%91ng">Bước 1: Cập nhật hệ thống</h3><p>Đầu tiên, cập nhật danh sách packages và nâng cấp hệ thống:</p><p>bash</p><pre><code class="language-bash">sudo apt update
sudo apt upgrade -y</code></pre><h3 id="b%C6%B0%E1%BB%9Bc-2-c%C3%A0i-%C4%91%E1%BA%B7t-docker">Bước 2: Cài đặt Docker</h3><p>Harbor yêu cầu Docker để chạy. Cài đặt Docker bằng các lệnh sau:</p><p>bash</p><pre><code class="language-bash"># Cài đặt Docker
sudo apt install -y docker.io

# Khởi động và kích hoạt Docker
sudo systemctl start docker
sudo systemctl enable docker

# Kiểm tra phiên bản Docker
docker --version</code></pre><h3 id="b%C6%B0%E1%BB%9Bc-3-c%C3%A0i-%C4%91%E1%BA%B7t-docker-compose">Bước 3: Cài đặt Docker Compose</h3><p>Docker Compose được sử dụng để quản lý các container của Harbor:</p><pre><code class="language-bash"># Tải Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Cấp quyền thực thi
sudo chmod +x /usr/local/bin/docker-compose

# Kiểm tra phiên bản
docker-compose --version</code></pre><h3 id="b%C6%B0%E1%BB%9Bc-4-t%E1%BA%A3i-xu%E1%BB%91ng-harbor">Bước 4: Tải xuống Harbor</h3><p>Di chuyển đến thư mục <code>/opt</code> và tải phiên bản Harbor mới nhất:</p><pre><code class="language-bash"># Di chuyển đến thư mục /opt
cd /opt

# Tải Harbor (phiên bản 2.11.2 - kiểm tra phiên bản mới nhất tại GitHub)
sudo wget https://github.com/goharbor/harbor/releases/download/v2.11.2/harbor-offline-installer-v2.11.2.tgz

# Giải nén
sudo tar xzvf harbor-offline-installer-v2.11.2.tgz</code></pre><h3 id="b%C6%B0%E1%BB%9Bc-5-c%E1%BA%A5u-h%C3%ACnh-harbor">Bước 5: Cấu hình Harbor</h3><p>Di chuyển vào thư mục Harbor và tạo file cấu hình:</p><pre><code class="language-bash">cd /opt/harbor
sudo cp harbor.yml.tmpl harbor.yml</code></pre><p>Chỉnh sửa file cấu hình <code>harbor.yml</code>:</p><pre><code class="language-bash">sudo nano harbor.yml</code></pre><p><strong>Các thông số cần cấu hình quan trọng:</strong></p><pre><code class="language-yaml"># Hostname - thay bằng IP hoặc domain của bạn
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
data_volume: /data</code></pre><p><strong>Lưu ý quan trọng:</strong></p><ol><li><strong>hostname</strong>: Phải là domain hoặc IP mà bạn sẽ truy cập Harbor</li><li><strong>harbor_admin_password</strong>: Đổi mật khẩu mặc định để bảo mật</li><li>Nếu chỉ test trên máy local, có thể để HTTP. Với production nên dùng HTTPS</li></ol><h3 id="b%C6%B0%E1%BB%9Bc-6-c%C3%A0i-%C4%91%E1%BA%B7t-harbor">Bước 6: Cài đặt Harbor</h3><p>Chạy script cài đặt:</p><pre><code class="language-bash"># Cài đặt Harbor cơ bản
sudo ./install.sh

# Hoặc cài đặt với các thành phần bổ sung
# sudo ./install.sh --with-trivy --with-chartmuseum</code></pre><p><strong>Các tùy chọn cài đặt:</strong></p><ul><li><code>--with-trivy</code>: Bật tính năng quét lỗ hổng bảo mật</li><li><code>--with-chartmuseum</code>: Bật hỗ trợ Helm chart repository</li><li><code>--with-notary</code>: Bật tính năng ký số content trust</li></ul><h3 id="b%C6%B0%E1%BB%9Bc-7-ki%E1%BB%83m-tra-tr%E1%BA%A1ng-th%C3%A1i">Bước 7: Kiểm tra trạng thái</h3><p>Sau khi cài đặt, kiểm tra các container Harbor:</p><pre><code class="language-bash">sudo docker-compose ps</code></pre><p>Bạn sẽ thấy các container đang chạy như:</p><ul><li>harbor-core</li><li>harbor-portal</li><li>harbor-db</li><li>harbor-redis</li><li>nginx</li><li>registry</li></ul><h3 id="b%C6%B0%E1%BB%9Bc-8-truy-c%E1%BA%ADp-harbor-web-ui">Bước 8: Truy cập Harbor Web UI</h3><p>Mở trình duyệt và truy cập:</p><pre><code>http://your-hostname-or-ip</code></pre><p><strong>Thông tin đăng nhập mặc định:</strong></p><ul><li>Username: <code>admin</code></li><li>Password: Mật khẩu bạn đã cấu hình trong <code>harbor.yml</code> (mặc định: <code>Harbor12345</code>)</li></ul><h2 id="qu%E1%BA%A3n-l%C3%BD-harbor">Quản lý Harbor</h2><h3 id="d%E1%BB%ABng-harbor">Dừng Harbor</h3><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose stop</code></pre><h3 id="kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-harbor">Khởi động Harbor</h3><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose start</code></pre><h3 id="kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-l%E1%BA%A1i-harbor">Khởi động lại Harbor</h3><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose restart</code></pre><h3 id="g%E1%BB%A1-c%C3%A0i-%C4%91%E1%BA%B7t-harbor">Gỡ cài đặt Harbor</h3><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose down -v</code></pre><h2 id="c%E1%BA%A5u-h%C3%ACnh-docker-client-%C4%91%E1%BB%83-s%E1%BB%AD-d%E1%BB%A5ng-harbor">Cấu hình Docker Client để sử dụng Harbor</h2><h3 id="v%E1%BB%9Bi-http-kh%C3%B4ng-ssl">Với HTTP (không SSL)</h3><p>Thêm Harbor vào danh sách insecure registries:</p><pre><code class="language-bash">sudo nano /etc/docker/daemon.json</code></pre><p>Thêm nội dung:</p><p>json</p><pre><code class="language-json">{
  "insecure-registries": ["your-harbor-ip:80"]
}</code></pre><p>Khởi động lại Docker:</p><pre><code class="language-bash">sudo systemctl restart docker</code></pre><h3 id="%C4%91%C4%83ng-nh%E1%BA%ADp-v%C3%A0o-harbor-t%E1%BB%AB-docker-cli">Đăng nhập vào Harbor từ Docker CLI</h3><pre><code class="language-bash">docker login your-harbor-ip
# Nhập username: admin
# Nhập password: your-password</code></pre><h3 id="push-image-l%C3%AAn-harbor">Push image lên Harbor</h3><pre><code class="language-bash"># Tag image
docker tag nginx:latest your-harbor-ip/library/nginx:latest

# Push image
docker push your-harbor-ip/library/nginx:latest</code></pre><h3 id="pull-image-t%E1%BB%AB-harbor">Pull image từ Harbor</h3><pre><code class="language-bash">docker pull your-harbor-ip/library/nginx:latest</code></pre><h2 id="c%E1%BA%A5u-h%C3%ACnh-https-cho-harbor-production">Cấu hình HTTPS cho Harbor (Production)</h2><h3 id="1-t%E1%BA%A1o-self-signed-certificate-cho-test">1. Tạo self-signed certificate (cho test)</h3><pre><code class="language-bash"># Tạo thư mục chứa certificate
sudo mkdir -p /opt/harbor/certs
cd /opt/harbor/certs

# Tạo private key
sudo openssl genrsa -out harbor.key 4096

# Tạo certificate signing request
sudo openssl req -new -key harbor.key -out harbor.csr

# Tạo self-signed certificate
sudo openssl x509 -req -days 365 -in harbor.csr -signkey harbor.key -out harbor.crt</code></pre><h3 id="2-c%E1%BA%ADp-nh%E1%BA%ADt-c%E1%BA%A5u-h%C3%ACnh-harbor">2. Cập nhật cấu hình Harbor</h3><p>Chỉnh sửa <code>/opt/harbor/harbor.yml</code>:</p><pre><code class="language-yaml">https:
  port: 443
  certificate: /opt/harbor/certs/harbor.crt
  private_key: /opt/harbor/certs/harbor.key</code></pre><h3 id="3-c%C3%A0i-%C4%91%E1%BA%B7t-l%E1%BA%A1i-harbor">3. Cài đặt lại Harbor</h3><pre><code class="language-bash">cd /opt/harbor
sudo ./prepare
sudo docker-compose down -v
sudo docker-compose up -d</code></pre><h2 id="backup-v%C3%A0-restore">Backup và Restore</h2><h3 id="backup-harbor">Backup Harbor</h3><pre><code class="language-bash"># Backup cơ sở dữ liệu và cấu hình
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
sudo docker-compose up -d</code></pre><h2 id="kh%E1%BA%AFc-ph%E1%BB%A5c-s%E1%BB%B1-c%E1%BB%91-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p">Khắc phục sự cố thường gặp</h2><h3 id="1-harbor-kh%C3%B4ng-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-%C4%91%C6%B0%E1%BB%A3c">1. Harbor không khởi động được</h3><p>Kiểm tra logs:</p><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose logs</code></pre><h3 id="2-kh%C3%B4ng-th%E1%BB%83-pushpull-image">2. Không thể push/pull image</h3><ul><li>Kiểm tra cấu hình <code>insecure-registries</code> trong <code>/etc/docker/daemon.json</code></li><li>Đảm bảo đã đăng nhập: <code>docker login your-harbor-ip</code></li><li>Kiểm tra firewall: <code>sudo ufw status</code></li></ul><h3 id="3-l%E1%BB%97i-x509-certificate-signed-by-unknown-authority">3. Lỗi "x509: certificate signed by unknown authority"</h3><p>Nếu dùng self-signed certificate, cần thêm certificate vào Docker:</p><pre><code class="language-bash">sudo mkdir -p /etc/docker/certs.d/your-harbor-ip
sudo cp /opt/harbor/certs/harbor.crt /etc/docker/certs.d/your-harbor-ip/ca.crt
sudo systemctl restart docker</code></pre><h3 id="4-port-%C4%91%C3%A3-%C4%91%C6%B0%E1%BB%A3c-s%E1%BB%AD-d%E1%BB%A5ng">4. Port đã được sử dụng</h3><p>Kiểm tra port đang sử dụng:</p><pre><code class="language-bash">sudo netstat -tulpn | grep :80</code></pre><p>Đổi port trong <code>harbor.yml</code> nếu cần.</p><h2 id="c%C3%A1c-t%C3%ADnh-n%C4%83ng-n%C3%A2ng-cao">Các tính năng nâng cao</h2><h3 id="1-qu%C3%A9t-l%E1%BB%97-h%E1%BB%95ng-b%E1%BA%A3o-m%E1%BA%ADt-v%E1%BB%9Bi-trivy">1. Quét lỗ hổng bảo mật với Trivy</h3><p>Sau khi cài đặt với <code>--with-trivy</code>, bạn có thể:</p><ul><li>Quét image tự động khi push</li><li>Xem báo cáo lỗ hổng trong Web UI</li><li>Chặn pull image có lỗ hổng nghiêm trọng</li></ul><h3 id="2-sao-ch%C3%A9p-replication">2. Sao chép (Replication)</h3><p>Harbor hỗ trợ sao chép image giữa các registry:</p><ul><li>Truy cập <strong>Administration</strong> → <strong>Replications</strong></li><li>Tạo endpoint đích</li><li>Tạo rule replication</li></ul><h3 id="3-qu%E1%BA%A3n-l%C3%BD-ng%C6%B0%E1%BB%9Di-d%C3%B9ng-v%C3%A0-ph%C3%A2n-quy%E1%BB%81n">3. Quản lý người dùng và phân quyền</h3><ul><li>Tạo projects riêng cho từng team</li><li>Phân quyền: Project Admin, Developer, Guest</li><li>Tích hợp LDAP/AD cho authentication</li></ul><h3 id="4-webhook">4. Webhook</h3><p>Cấu hình webhook để nhận thông báo khi:</p><ul><li>Image được push</li><li>Image được pull</li><li>Quét bảo mật hoàn thành</li></ul><h2 id="b%E1%BA%A3o-m%E1%BA%ADt-harbor">Bảo mật Harbor</h2><h3 id="best-practices">Best Practices</h3><ol><li><strong>Đổi mật khẩu admin mặc định</strong> ngay sau khi cài đặt</li><li><strong>Sử dụng HTTPS</strong> cho production environment</li><li><strong>Bật quét lỗ hổng bảo mật</strong> với Trivy</li><li><strong>Giới hạn truy cập</strong> bằng firewall</li><li><strong>Backup định kỳ</strong> data và cấu hình</li><li><strong>Cập nhật Harbor</strong> thường xuyên</li><li><strong>Sử dụng RBAC</strong> để quản lý quyền truy cập</li><li><strong>Bật audit log</strong> để theo dõi hoạt động</li></ol><h3 id="c%E1%BA%A5u-h%C3%ACnh-firewall">Cấu hình Firewall</h3><pre><code class="language-bash"># Cho phép HTTP (port 80)
sudo ufw allow 80/tcp

# Cho phép HTTPS (port 443)
sudo ufw allow 443/tcp

# Cho phép SSH
sudo ufw allow 22/tcp

# Kích hoạt firewall
sudo ufw enable</code></pre><h2 id="k%E1%BA%BFt-lu%E1%BA%ADn">Kết luận</h2><p>Bạn đã hoàn thành việc cài đặt Harbor trên Ubuntu 24.04. Harbor giờ đây có thể được sử dụng như một private Docker registry cho tổ chức của bạn với đầy đủ các tính năng quản lý, bảo mật và sao chép.</p><h2 id="t%C3%A0i-nguy%C3%AAn-tham-kh%E1%BA%A3o">Tài nguyên tham khảo</h2><ul><li><strong>Harbor Official Documentation</strong>: <a href="https://goharbor.io/docs/">https://goharbor.io/docs/</a></li><li><strong>GitHub Repository</strong>: <a href="https://github.com/goharbor/harbor">https://github.com/goharbor/harbor</a></li><li><strong>Community Forum</strong>: <a href="https://github.com/goharbor/harbor/discussions">https://github.com/goharbor/harbor/discussions</a></li></ul><h2 id="c%C3%A1c-l%E1%BB%87nh-h%E1%BB%AFu-%C3%ADch">Các lệnh hữu ích</h2><pre><code class="language-bash"># Kiểm tra phiên bản Harbor
docker exec harbor-core harbor version

# Xem logs của tất cả services
docker-compose logs -f

# Xem logs của một service cụ thể
docker-compose logs -f harbor-core

# Kiểm tra disk usage
df -h /data

# Clean up unused images (giải phóng dung lượng)
docker system prune -a</code></pre><hr><p><strong>Lưu ý</strong>: Hướng dẫn này áp dụng cho Harbor v2.11.2 trên Ubuntu 24.04. Một số chi tiết có thể thay đổi tùy theo phiên bản Harbor bạn sử dụng.</p>
