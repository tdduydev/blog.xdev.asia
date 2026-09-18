---
id: 019c9617-fd1b-734f-b44a-7c96d34f532c
title: Ubuntu 24.04 に Harbor をインストールする
slug: cai-dat-harbor-tren-ubuntu-24-04
excerpt: >-
  Harbor - プライベート Docker レジストリを Ubuntu 24.04 にインストールするための詳細な手順
  (HTTPS、セキュリティ、バックアップ、ベスト プラクティスなど)。
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
locale: ja
---
<h2 id="gi%E1%BB%9Bi-thi%E1%BB%87u">はじめに</h2><p>Harbor は、Docker イメージと Helm チャートを保存および管理するためのオープン ソース レジストリです。 Harbor は、ユーザー管理、セキュリティ スキャン、レジストリ間のイメージ レプリケーションなどの機能を追加することにより、Docker レジストリを拡張します。</p><h2 id="y%C3%AAu-c%E1%BA%A7u-h%E1%BB%87-th%E1%BB%91ng">システム要件</h2><ul><li><strong>オペレーティングシステム</strong>：Ubuntu 24.04 LTS</li><li><strong>CPU</strong>：最低2コア</li><li><strong>RAM</strong>：最低4GB（8GB推奨）</li><li><strong>ハードドライブ</strong>：最低40GBの空き容量</li><li><strong>アクセス権</strong>: root または sudo</li></ul><h2 id="c%C3%A1c-b%C6%B0%E1%BB%9Bc-c%C3%A0i-%C4%91%E1%BA%B7t">インストール手順</h2><h3 id="b%C6%B0%E1%BB%9Bc-1-c%E1%BA%ADp-nh%E1%BA%ADt-h%E1%BB%87-th%E1%BB%91ng">ステップ 1: システムを更新する</h3><p>まず、パッケージ リストを更新し、システムをアップグレードします。</p><p>バッシュ</p><pre><code class="language-bash">sudo apt update
sudo apt upgrade -y</code></pre><h3 id="b%C6%B0%E1%BB%9Bc-2-c%C3%A0i-%C4%91%E1%BA%B7t-docker">ステップ 2: Docker をインストールする</h3><p>Harbor では Docker を実行する必要があります。次のコマンドを使用して Docker をインストールします。</p><p>バッシュ</p><pre><code class="language-bash"># Cài đặt Docker
sudo apt install -y docker.io

# Khởi động và kích hoạt Docker
sudo systemctl start docker
sudo systemctl enable docker

# Kiểm tra phiên bản Docker
docker --version</code></pre><h3 id="b%C6%B0%E1%BB%9Bc-3-c%C3%A0i-%C4%91%E1%BA%B7t-docker-compose">ステップ 3: Docker Compose をインストールする</h3><p>Docker Compose は、Harbor コンテナーの管理に使用されます。</p><pre><code class="language-bash"># Tải Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Cấp quyền thực thi
sudo chmod +x /usr/local/bin/docker-compose

# Kiểm tra phiên bản
docker-compose --version</code></pre><h3 id="b%C6%B0%E1%BB%9Bc-4-t%E1%BA%A3i-xu%E1%BB%91ng-harbor">ステップ 4: ハーバーをダウンロードする</h3><p>フォルダに移動 <code>/オプト</code> 最新バージョンの Harbor をダウンロードします。</p><pre><code class="language-bash"># Di chuyển đến thư mục /opt
cd /opt

# Tải Harbor (phiên bản 2.11.2 - kiểm tra phiên bản mới nhất tại GitHub)
sudo wget https://github.com/goharbor/harbor/releases/download/v2.11.2/harbor-offline-installer-v2.11.2.tgz

# Giải nén
sudo tar xzvf harbor-offline-installer-v2.11.2.tgz</code></pre><h3 id="b%C6%B0%E1%BB%9Bc-5-c%E1%BA%A5u-h%C3%ACnh-harbor">ステップ 5: ハーバーを構成する</h3><p>Harbor フォルダーに移動し、構成ファイルを作成します。</p><pre><code class="language-bash">cd /opt/harbor
sudo cp harbor.yml.tmpl harbor.yml</code></pre><p>設定ファイルを編集する <code>港.yml</code>:</p><pre><code class="language-bash">sudo nano harbor.yml</code></pre><p><strong>構成する重要なパラメータ:</strong></p><pre><code class="language-yaml"># Hostname - thay bằng IP hoặc domain của bạn
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
data_volume: /data</code></pre><p><strong>重要な注意事項:</strong></p><ol><li><strong>ホスト名</strong>: Harbor にアクセスするドメインまたは IP である必要があります</li><li><strong>港の管理者パスワード</strong>: セキュリティのためデフォルトのパスワードを変更します</li><li>ローカル マシンでのみテストする場合は、HTTP のままにすることができます。運用環境では、HTTPS を使用する必要があります</li></ol><h3 id="b%C6%B0%E1%BB%9Bc-6-c%C3%A0i-%C4%91%E1%BA%B7t-harbor">ステップ 6: ハーバーをインストールする</h3><p>インストール スクリプトを実行します。</p><pre><code class="language-bash"># Cài đặt Harbor cơ bản
sudo ./install.sh

# Hoặc cài đặt với các thành phần bổ sung
# sudo ./install.sh --with-trivy --with-chartmuseum</code></pre><p><strong>インストールオプション:</strong></p><ul><li><code>--with-トリビー</code>: 脆弱性スキャンを有効にする</li><li><code>--with-chartmuseum</code>: Helm チャート リポジトリのサポートを有効にする</li><li><code>--公証人付き</code>: コンテンツ信頼デジタル署名機能を有効にする</li></ul><h3 id="b%C6%B0%E1%BB%9Bc-7-ki%E1%BB%83m-tra-tr%E1%BA%A1ng-th%C3%A1i">ステップ 7: ステータスを確認する</h3><p>インストール後、Harbor コンテナを確認します。</p><pre><code class="language-bash">sudo docker-compose ps</code></pre><p>次のような実行中のコンテナが表示されます。</p><ul><li>ハーバーコア</li><li>ハーバーポータル</li><li>港データベース</li><li>ハーバーレディス</li><li>nginx</li><li>レジストリ。レジストリ</li></ul><h3 id="b%C6%B0%E1%BB%9Bc-8-truy-c%E1%BA%ADp-harbor-web-ui">ステップ 8: Harbor Web UI にアクセスする</h3><p>ブラウザを開いて以下にアクセスします。</p><pre><code>http://your-hostname-or-ip</code></pre><p><strong>デフォルトのログイン情報:</strong></p><ul><li>ユーザー名: <code>管理者。管理者</code></li><li>パスワード: で設定したパスワード <code>港.yml</code> (デフォルト: <code>ハーバー12345</code>）</li></ul><h2 id="qu%E1%BA%A3n-l%C3%BD-harbor">港湾管理</h2><h3 id="d%E1%BB%ABng-harbor">ストップハーバー</h3><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose stop</code></pre><h3 id="kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-harbor">ローンチハーバー</h3><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose start</code></pre><h3 id="kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-l%E1%BA%A1i-harbor">リスタートハーバー</h3><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose restart</code></pre><h3 id="g%E1%BB%A1-c%C3%A0i-%C4%91%E1%BA%B7t-harbor">ハーバーをアンインストールする</h3><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose down -v</code></pre><h2 id="c%E1%BA%A5u-h%C3%ACnh-docker-client-%C4%91%E1%BB%83-s%E1%BB%AD-d%E1%BB%A5ng-harbor">Harbor を使用するように Docker クライアントを構成する</h2><h3 id="v%E1%BB%9Bi-http-kh%C3%B4ng-ssl">HTTP あり (SSL なし)</h3><p>Harbor を安全でないレジストリのリストに追加します。</p><pre><code class="language-bash">sudo nano /etc/docker/daemon.json</code></pre><p>コンテンツを追加します:</p><p>json</p><pre><code class="language-json">{
  "insecure-registries": ["your-harbor-ip:80"]
}</code></pre><p>Docker を再起動します。</p><pre><code class="language-bash">sudo systemctl restart docker</code></pre><h3 id="%C4%91%C4%83ng-nh%E1%BA%ADp-v%C3%A0o-harbor-t%E1%BB%AB-docker-cli">Docker CLI から Harbor にログインする</h3><pre><code class="language-bash">docker login your-harbor-ip
# Nhập username: admin
# Nhập password: your-password</code></pre><h3 id="push-image-l%C3%AAn-harbor">イメージをハーバーにプッシュする</h3><pre><code class="language-bash"># Tag image
docker tag nginx:latest your-harbor-ip/library/nginx:latest

# Push image
docker push your-harbor-ip/library/nginx:latest</code></pre><h3 id="pull-image-t%E1%BB%AB-harbor">ハーバーからイメージをプルする</h3><pre><code class="language-bash">docker pull your-harbor-ip/library/nginx:latest</code></pre><h2 id="c%E1%BA%A5u-h%C3%ACnh-https-cho-harbor-production">Harbor 用の HTTPS の構成 (実稼働)</h2><h3 id="1-t%E1%BA%A1o-self-signed-certificate-cho-test">1. 自己署名証明書の作成（テスト用）</h3><pre><code class="language-bash"># Tạo thư mục chứa certificate
sudo mkdir -p /opt/harbor/certs
cd /opt/harbor/certs

# Tạo private key
sudo openssl genrsa -out harbor.key 4096

# Tạo certificate signing request
sudo openssl req -new -key harbor.key -out harbor.csr

# Tạo self-signed certificate
sudo openssl x509 -req -days 365 -in harbor.csr -signkey harbor.key -out harbor.crt</code></pre><h3 id="2-c%E1%BA%ADp-nh%E1%BA%ADt-c%E1%BA%A5u-h%C3%ACnh-harbor">2. ハーバー構成を更新する</h3><p>編集 <code>/opt/ハーバー/ハーバー.yml</code>:</p><pre><code class="language-yaml">https:
  port: 443
  certificate: /opt/harbor/certs/harbor.crt
  private_key: /opt/harbor/certs/harbor.key</code></pre><h3 id="3-c%C3%A0i-%C4%91%E1%BA%B7t-l%E1%BA%A1i-harbor">3. ハーバーを再インストールする</h3><pre><code class="language-bash">cd /opt/harbor
sudo ./prepare
sudo docker-compose down -v
sudo docker-compose up -d</code></pre><h2 id="backup-v%C3%A0-restore">バックアップと復元</h2><h3 id="backup-harbor">バックアップハーバー</h3><pre><code class="language-bash"># Backup cơ sở dữ liệu và cấu hình
cd /opt/harbor
sudo docker-compose stop

# Backup data directory
sudo tar -czf harbor-backup-$(date +%Y%m%d).tar.gz /data /opt/harbor/harbor.yml

sudo docker-compose start</code></pre><h3 id="restore-harbor">リストアハーバー</h3><pre><code class="language-bash"># Stop Harbor
cd /opt/harbor
sudo docker-compose down

# Restore data
sudo tar -xzf harbor-backup-YYYYMMDD.tar.gz -C /

# Start Harbor
sudo docker-compose up -d</code></pre><h2 id="kh%E1%BA%AFc-ph%E1%BB%A5c-s%E1%BB%B1-c%E1%BB%91-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p">一般的な問題のトラブルシューティング</h2><h3 id="1-harbor-kh%C3%B4ng-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-%C4%91%C6%B0%E1%BB%A3c">1. ハーバーが起動しない</h3><p>ログを確認します。</p><pre><code class="language-bash">cd /opt/harbor
sudo docker-compose logs</code></pre><h3 id="2-kh%C3%B4ng-th%E1%BB%83-pushpull-image">2. 画像のプッシュ/プルができない</h3><ul><li>構成を確認してください <code>安全でないレジストリ</code> で <code>/etc/docker/daemon.json</code></li><li>ログインしていることを確認してください: <code>docker ログイン your-harbor-ip</code></li><li>ファイアウォールを確認します。 <code>sudo ufwステータス</code></li></ul><h3 id="3-l%E1%BB%97i-x509-certificate-signed-by-unknown-authority">3. エラー「x509: 不明な機関によって署名された証明書」</h3><p>自己署名証明書を使用する場合は、証明書を Docker に追加する必要があります。</p><pre><code class="language-bash">sudo mkdir -p /etc/docker/certs.d/your-harbor-ip
sudo cp /opt/harbor/certs/harbor.crt /etc/docker/certs.d/your-harbor-ip/ca.crt
sudo systemctl restart docker</code></pre><h3 id="4-port-%C4%91%C3%A3-%C4%91%C6%B0%E1%BB%A3c-s%E1%BB%AD-d%E1%BB%A5ng">4. ポートはすでに使用されています</h3><p>使用されているポートを確認します。</p><pre><code class="language-bash">sudo netstat -tulpn | grep :80</code></pre><p>内部ポートの変更 <code>港.yml</code> 必要に応じて。</p><h2 id="c%C3%A1c-t%C3%ADnh-n%C4%83ng-n%C3%A2ng-cao">高度な機能</h2><h3 id="1-qu%C3%A9t-l%E1%BB%97-h%E1%BB%95ng-b%E1%BA%A3o-m%E1%BA%ADt-v%E1%BB%9Bi-trivy">1. Trivy でセキュリティの脆弱性をスキャンします。</h3><p>でインストールした後、 <code>--with-トリビー</code>、次のことができます。</p><ul><li>押すと画像を自動的にスキャン</li><li>Web UI で脆弱性レポートを表示する</li><li>深刻な脆弱性のあるイメージのプルをブロックする</li></ul><h3 id="2-sao-ch%C3%A9p-replication">2. レプリケーション</h3><p>Harbor は、レジストリ間でのイメージのコピーをサポートしています。</p><ul><li>アクセス <strong>管理</strong> → <strong>レプリケーション</strong></li><li>宛先エンドポイントの作成</li><li>レプリケーションルールの作成</li></ul><h3 id="3-qu%E1%BA%A3n-l%C3%BD-ng%C6%B0%E1%BB%9Di-d%C3%B9ng-v%C3%A0-ph%C3%A2n-quy%E1%BB%81n">3. ユーザーの管理と認可</h3><ul><li>チームごとに個別のプロジェクトを作成する</li><li>権限: プロジェクト管理者、開発者、ゲスト</li><li>認証のためにLDAP/ADを統合する</li></ul><h3 id="4-webhook">4.Webhook</h3><p>次の場合に通知を受信するように Webhook を構成します。</p><ul><li>画像がプッシュされました</li><li>画像が引っ張られてきました</li><li>セキュリティスキャンが完了しました</li></ul><h2 id="b%E1%BA%A3o-m%E1%BA%ADt-harbor">港湾警備</h2><h3 id="best-practices">ベストプラクティス</h3><ol><li><strong>デフォルトの管理者パスワードを変更する</strong> インストール直後</li><li><strong>HTTPSを使用する</strong> 実稼働環境用</li><li><strong>脆弱性スキャンを有効にする</strong> トリビー付き</li><li><strong>アクセス制限</strong> ファイアウォールによる</li><li><strong>定期的なバックアップ</strong> データと構成</li><li><strong>港のアップデート</strong> 頻繁に</li><li><strong>RBAC を使用する</strong> アクセス権を管理するため</li><li><strong>監査ログを有効にする</strong> アクティビティを追跡する</li></ol><h3 id="c%E1%BA%A5u-h%C3%ACnh-firewall">ファイアウォールの設定</h3><pre><code class="language-bash"># Cho phép HTTP (port 80)
sudo ufw allow 80/tcp

# Cho phép HTTPS (port 443)
sudo ufw allow 443/tcp

# Cho phép SSH
sudo ufw allow 22/tcp

# Kích hoạt firewall
sudo ufw enable</code></pre><h2 id="k%E1%BA%BFt-lu%E1%BA%ADn">結論</h2><p>Ubuntu 24.04 への Harbor のインストールが完了しました。 Harbor は、完全な管理、セキュリティ、レプリケーション機能を備えた組織のプライベート Docker レジストリとして使用できるようになりました。</p><h2 id="t%C3%A0i-nguy%C3%AAn-tham-kh%E1%BA%A3o">参考リソース</h2><ul><li><strong>港の公式文書</strong>: <a href="https://goharbor.io/docs/">https://goharbor.io/docs/</a></li><li><strong>GitHub リポジトリ</strong>: <a href="https://github.com/goharbor/harbor">https://github.com/goharbor/harbor</a></li><li><strong>Community フォーラム</strong>: <a href="https://github.com/goharbor/harbor/discussions">https://github.com/goharbor/harbor/discussions</a></li></ul><h2 id="c%C3%A1c-l%E1%BB%87nh-h%E1%BB%AFu-%C3%ADch">便利なコマンド</h2><pre><code class="language-bash"># Kiểm tra phiên bản Harbor
docker exec harbor-core harbor version

# Xem logs của tất cả services
docker-compose logs -f

# Xem logs của một service cụ thể
docker-compose logs -f harbor-core

# Kiểm tra disk usage
df -h /data

# Clean up unused images (giải phóng dung lượng)
docker system prune -a</code></pre><hr><p><strong>注記</strong>: このガイドは、Ubuntu 24.04 上の Harbor v2.11.2 に適用されます。使用する Harbor のバージョンによっては、一部の詳細が異なる場合があります。</p>
