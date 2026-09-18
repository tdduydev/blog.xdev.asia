---
id: 019c9617-fcd8-70c2-9f38-389135ea238e
title: Ubuntu 24.04 に KVM をインストールする
slug: cai-dat-kvm-tren-ubuntu-24-04
excerpt: >-
  Cockpit または Kimchi Web 管理インターフェイスを使用して Ubuntu 24.04 LTS に KVM (カーネルベースの仮想マシン)
  をインストールする方法の詳細な手順。完全な仮想化環境をセットアップし、ネットワーク ブリッジを構成し、最初の仮想マシンを簡単に作成する方法を学びます。
featured_image: /images/blog/kvm-ubuntu-featured.webp
type: blog
reading_time: 9
view_count: 2
meta: null
published_at: '2025-11-24T15:26:53.000000Z'
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
  - name: kvm
    slug: kvm
  - name: virtualization
    slug: virtualization
  - name: ubuntu
    slug: ubuntu
  - name: ubuntu-24.04
    slug: ubuntu-2404
  - name: cockpit
    slug: cockpit
  - name: kimchi
    slug: kimchi
  - name: libvirt
    slug: libvirt
  - name: qemu
    slug: qemu
  - name: web-ui
    slug: web-ui
  - name: virtual-machines
    slug: virtual-machines
  - name: hypervisor
    slug: hypervisor
  - name: server
    slug: server
comments: []
locale: ja
---
<p>KVM (カーネルベースの仮想マシン) は、Linux 用の強力なオープンソース仮想化ソリューションです。 Cockpit や Kimchi などの Web ベースの管理インターフェイスと組み合わせると、仮想マシン管理が直感的になり、どこからでもアクセスできるようになります。このチュートリアルでは、Ubuntu 24.04 に KVM をインストールし、VM を簡単に管理できるように Web インターフェイスをセットアップする方法を説明します。</p><h2 id="y%C3%AAu-c%E1%BA%A7u-h%E1%BB%87-th%E1%BB%91ng">システム要件</h2><ul><li>Ubuntu 24.04 LTSがインストールされている</li><li>root または sudo アクセス</li><li>仮想化をサポートするCPU（Intel VT-xまたはAMD-V）</li><li>最小 4GB RAM (8GB 以上を推奨)</li><li>VM に十分なディスク容量</li></ul><h2 id="b%C6%B0%E1%BB%9Bc-1-ki%E1%BB%83m-tra-h%E1%BB%97-tr%E1%BB%A3-%E1%BA%A3o-h%C3%B3a-ph%E1%BA%A7n-c%E1%BB%A9ng">ステップ 1: ハードウェア仮想化サポートを確認する</h2><p>まず、CPU が仮想化をサポートしているかどうかを確認します。</p><pre><code class="language-bash">egrep -c '(vmx|svm)' /proc/cpuinfo
</code></pre><p>結果が次の場合 <code>0</code>、仮想化がサポートされていないか、BIOS で有効になっていません。どちらか大きい数字 <code>0</code> すべてが支持を示します。</p><p>次のものも使用できます。</p><pre><code class="language-bash">kvm-ok
</code></pre><p>もし <code>kvm-ok</code> まだインストールされていない場合は、最初にインストールしてください。</p><pre><code class="language-bash">sudo apt install cpu-checker
kvm-ok
</code></pre><p>期待される結果: <code>情報: /dev/kvm が存在します。 KVMアクセラレーションが使用可能</code></p><h2 id="b%C6%B0%E1%BB%9Bc-2-c%E1%BA%ADp-nh%E1%BA%ADt-c%C3%A1c-g%C3%B3i-h%E1%BB%87-th%E1%BB%91ng">ステップ 2: システム パッケージを更新する</h2><p>システムを更新して、すべてのパッケージが最新であることを確認します。</p><pre><code class="language-bash">sudo apt update
sudo apt upgrade -y
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-3-c%C3%A0i-%C4%91%E1%BA%B7t-kvm-v%C3%A0-c%C3%A1c-g%C3%B3i-li%C3%AAn-quan">ステップ 3: KVM および関連パッケージをインストールする</h2><p>必須の仮想化ツールとともに KVM をインストールします。</p><pre><code class="language-bash">sudo apt install -y qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virtinst virt-manager
</code></pre><p><strong>パッケージの説明:</strong></p><ul><li><code>qemu-kvm</code>: KVM および QEMU メイン パッケージ</li><li><code>libvirt デーモン システム</code>: 仮想化管理用の Libvirt デーモン</li><li><code>libvirtクライアント</code>: libvirt のクライアント側ユーティリティ</li><li><code>ブリッジユーティリティ</code>: ネットワークブリッジユーティリティ</li><li><code>バーティンスト</code>: VMを作成するコマンドラインツール</li><li><code>仮想マネージャー</code>: VM を管理するためのデスクトップ アプリケーション (オプション)</li></ul><h2 id="b%C6%B0%E1%BB%9Bc-4-k%C3%ADch-ho%E1%BA%A1t-v%C3%A0-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-d%E1%BB%8Bch-v%E1%BB%A5-libvirt">ステップ 4: Libvirt サービスをアクティブ化して開始する</h2><p>libvirt サービスが起動時に自動的に開始されるように有効にし、今すぐ開始します。</p><pre><code class="language-bash">sudo systemctl enable libvirtd
sudo systemctl start libvirtd
</code></pre><p>サービスが実行中であることを確認します。</p><pre><code class="language-bash">sudo systemctl status libvirtd
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-5-th%C3%AAm-user-v%C3%A0o-c%C3%A1c-nh%C3%B3m-c%E1%BA%A7n-thi%E1%BA%BFt">ステップ 5: 必要なグループにユーザーを追加する</h2><p>ユーザーをグループに追加する <code>リブバート</code> そして <code>kvm</code> sudo を使用せずに VM を管理するには:</p><pre><code class="language-bash">sudo usermod -aG libvirt $USER
sudo usermod -aG kvm $USER
</code></pre><p>グループの変更を有効にするためにログアウトしてから再度ログインするか、次のコマンドを実行します。</p><pre><code class="language-bash">newgrp libvirt
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-6-x%C3%A1c-minh-c%C3%A0i-%C4%91%E1%BA%B7t-kvm">ステップ 6: KVM 設定を確認する</h2><p>KVM が正しくインストールされていることを確認します。</p><pre><code class="language-bash">virsh list --all
</code></pre><p>このコマンドは、空の VM リストを返します (VM を作成していない場合)。</p><h2 id="b%C6%B0%E1%BB%9Bc-7-c%C3%A0i-%C4%91%E1%BA%B7t-giao-di%E1%BB%87n-webt%C3%B9y-ch%E1%BB%8Dn-1-cockpit-khuy%E1%BA%BFn-ngh%E1%BB%8B">ステップ 7: Web インターフェイスのインストール - オプション 1: コックピット (推奨)</h2><p>Cockpit は、KVM 仮想化を含む Linux サーバーを管理するための最新の軽量 Web インターフェイスです。</p><h3 id="c%C3%A0i-%C4%91%E1%BA%B7t-cockpit">コックピットの設定</h3><pre><code class="language-bash">sudo apt install -y cockpit cockpit-machines
</code></pre><h3 id="k%C3%ADch-ho%E1%BA%A1t-v%C3%A0-kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-cockpit">コックピットのアクティベーションと起動</h3><pre><code class="language-bash">sudo systemctl enable --now cockpit.socket
</code></pre><h3 id="truy-c%E1%BA%ADp-giao-di%E1%BB%87n-web-cockpit">コックピット Web インターフェイスにアクセスする</h3><p>Web ブラウザを開いて以下にアクセスします。</p><pre><code class="language-text">https://your-server-ip:9090
</code></pre><p>またはローカルにアクセスする場合:</p><pre><code class="language-text">https://localhost:9090
</code></pre><p>Ubuntu のユーザー名とパスワードを使用してログインします。に移動します <strong>仮想マシン</strong> 左側のサイドバーで KVM を管理します。</p><h3 id="cho-ph%C3%A9p-cockpit-qua-t%C6%B0%E1%BB%9Dng-l%E1%BB%ADa-n%E1%BA%BFu-ufw-%C4%91%C6%B0%E1%BB%A3c-b%E1%BA%ADt">ファイアウォール経由のコックピットを許可する (UFW が有効な場合)</h3><pre><code class="language-bash">sudo ufw allow 9090/tcp
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-8-c%C3%A0i-%C4%91%E1%BA%B7t-giao-di%E1%BB%87n-webt%C3%B9y-ch%E1%BB%8Dn-2-kimchi">ステップ 8: Web インターフェイスのインストール - オプション 2: キムチ</h2><p>Kimchi は、Wok 上で実行されるもう 1 つの Web ベースの仮想化管理ツールです。</p><h3 id="c%C3%A0i-%C4%91%E1%BA%B7t-c%C3%A1c-ph%E1%BB%A5-thu%E1%BB%99c">依存関係のインストール</h3><pre><code class="language-bash">sudo apt install -y git python3-pip nginx
</code></pre><h3 id="c%C3%A0i-%C4%91%E1%BA%B7t-wok-v%C3%A0-kimchi">中華鍋とキムチを設置します</h3><pre><code class="language-bash">sudo apt install -y wok kimchi
</code></pre><p>リポジトリにない場合は、ソースからインストールします。</p><pre><code class="language-bash"># Cài đặt các phụ thuộc
sudo apt install -y python3-cherrypy3 python3-cheetah python3-pam python3-m2crypto gettext

# Clone repositories
cd /tmp
git clone https://github.com/kimchi-project/wok.git
git clone https://github.com/kimchi-project/kimchi.git

# Cài đặt Wok
cd wok
sudo make install

# Cài đặt Kimchi
cd ../kimchi
sudo make install
</code></pre><h3 id="kh%E1%BB%9Fi-%C4%91%E1%BB%99ng-d%E1%BB%8Bch-v%E1%BB%A5-wok">中華鍋サービスを開始する</h3><pre><code class="language-bash">sudo systemctl enable wokd
sudo systemctl start wokd
</code></pre><h3 id="truy-c%E1%BA%ADp-giao-di%E1%BB%87n-web-kimchi">キムチ Web インターフェイスにアクセスする</h3><p>Web ブラウザを開いて以下にアクセスします。</p><pre><code class="language-text">https://your-server-ip:8001
</code></pre><p>Ubuntu のユーザー名とパスワードを使用してログインします。</p><h2 id="b%C6%B0%E1%BB%9Bc-9-c%E1%BA%A5u-h%C3%ACnh-network-bridge-t%C3%B9y-ch%E1%BB%8Dn">ステップ 9: ネットワークブリッジの構成 (オプション)</h2><p>VM に直接ネットワーク アクセスを許可するには、ネットワーク ブリッジを構成します。</p><h3 id="s%E1%BB%AD-d%E1%BB%A5ng-netplan-m%E1%BA%B7c-%C4%91%E1%BB%8Bnh-ubuntu-2404">Netplan の使用 (デフォルトの Ubuntu 24.04)</h3><p>ネットプラン構成を編集します。</p><pre><code class="language-bash">sudo nano /etc/netplan/00-installer-config.yaml
</code></pre><p>構成例:</p><pre><code class="language-yaml">network:
  version: 2
  ethernets:
    enp0s3:
      dhcp4: no
  bridges:
    br0:
      interfaces: [enp0s3]
      dhcp4: yes
      parameters:
        stp: false
        forward-delay: 0
</code></pre><p>交換する <code>enp0s3</code> 実際のネットワークインターフェース名で置き換えます（コマンドで検索します） <code>私は</code>）。</p><p>構成を適用します。</p><pre><code class="language-bash">sudo netplan apply
</code></pre><h3 id="x%C3%A1c-minh-bridge">ブリッジの検証</h3><pre><code class="language-bash">ip addr show br0
brctl show
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-10-t%E1%BA%A1o-m%C3%A1y-%E1%BA%A3o-%C4%91%E1%BA%A7u-ti%C3%AAn">ステップ 10: 最初の仮想マシンを作成する</h2><h3 id="s%E1%BB%AD-d%E1%BB%A5ng-giao-di%E1%BB%87n-web-cockpit">コックピット Web インターフェイスの使用</h3><ol><li>に移動します <strong>仮想マシン</strong> コックピット内</li><li>クリック <strong>VMの作成</strong></li><li>インストール ソース (ISO ファイル、URL、または PXE) を選択します</li><li>VM 設定 (CPU、RAM、ディスク) を構成する</li><li>インストールを開始する</li></ol><h3 id="s%E1%BB%AD-d%E1%BB%A5ng-d%C3%B2ng-l%E1%BB%87nh">コマンドラインの使用</h3><p>ISO ファイルをダウンロードします (例: Ubuntu サーバー)。</p><pre><code class="language-bash">cd /var/lib/libvirt/images/
sudo wget https://releases.ubuntu.com/24.04/ubuntu-24.04-live-server-amd64.iso
</code></pre><p>VM を作成します。</p><pre><code class="language-bash">sudo virt-install \
  --name ubuntu-vm \
  --ram 2048 \
  --vcpus 2 \
  --disk path=/var/lib/libvirt/images/ubuntu-vm.qcow2,size=20 \
  --os-variant ubuntu24.04 \
  --network bridge=virbr0 \
  --graphics vnc,listen=0.0.0.0 \
  --cdrom /var/lib/libvirt/images/ubuntu-24.04-live-server-amd64.iso
</code></pre><h2 id="x%E1%BB%AD-l%C3%BD-s%E1%BB%B1-c%E1%BB%91">トラブルシューティング</h2><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-permission-denied-quy%E1%BB%81n-b%E1%BB%8B-t%E1%BB%AB-ch%E1%BB%91i">問題: 権限が拒否されました</h3><p>権限エラーが発生した場合は、ユーザーが正しいグループに所属していることを確認してください。</p><pre><code class="language-bash">groups $USER
</code></pre><p>含める必要があります <code>リブバート</code> そして <code>kvm</code>。</p><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-d%E1%BB%8Bch-v%E1%BB%A5-libvirtd-th%E1%BA%A5t-b%E1%BA%A1i">問題: libvirtd サービスが失敗しました</h3><p>ログを確認します。</p><pre><code class="language-bash">sudo journalctl -u libvirtd
</code></pre><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-kh%C3%B4ng-th%E1%BB%83-truy-c%E1%BA%ADp-giao-di%E1%BB%87n-web">問題: Web インターフェイスにアクセスできない</h3><p>サービスが実行されているかどうかを確認します。</p><pre><code class="language-bash"># Với Cockpit
sudo systemctl status cockpit.socket

# Với Kimchi/Wok
sudo systemctl status wokd
</code></pre><p>ファイアウォールを確認します。</p><pre><code class="language-bash">sudo ufw status
</code></pre><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-kh%C3%B4ng-c%C3%B3-k%E1%BA%BFt-n%E1%BB%91i-m%E1%BA%A1ng-trong-vm">問題: VM にネットワーク接続がありません</h3><p>デフォルトのネットワークが機能していることを確認します。</p><pre><code class="language-bash">virsh net-list --all
sudo virsh net-start default
sudo virsh net-autostart default
</code></pre><h2 id="c%C3%A1c-v%E1%BA%A5n-%C4%91%E1%BB%81-b%E1%BA%A3o-m%E1%BA%ADt">セキュリティの問題</h2><ol><li><strong>ファイアウォール</strong>: 信頼されたネットワークに対してのみ Web インターフェイス ポートを開きます</li><li><strong>SSL/TLS</strong>: 運用環境に適切な証明書を使用します。</li><li><strong>ユーザーのアクセス権</strong>: 権限が制限された専用ユーザーを作成します</li><li><strong>アップデート</strong>: KVM と管理ツールを最新の状態に保ちます</li><li><strong>バックアップ</strong>: VM 構成とデータを定期的にバックアップします。</li></ol><h2 id="c%C3%A1c-l%E1%BB%87nh-h%E1%BB%AFu-%C3%ADch">便利なコマンド</h2><pre><code class="language-bash"># Liệt kê tất cả VM
virsh list --all

# Khởi động VM
virsh start vm-name

# Tắt VM
virsh shutdown vm-name

# Buộc tắt VM
virsh destroy vm-name

# Xóa VM
virsh undefine vm-name

# Chỉnh sửa cấu hình VM
virsh edit vm-name

# Xem console VM
virsh console vm-name

# Liệt kê các mạng
virsh net-list --all

# Liệt kê storage pools
virsh pool-list --all
</code></pre><h2 id="k%E1%BA%BFt-lu%E1%BA%ADn">結論</h2><p>これで、Web ベースの管理インターフェイスを備えた完全な KVM 仮想化環境が Ubuntu 24.04 上に完成しました。 Cockpit は仮想マシン管理用の最新の使いやすいインターフェイスを提供し、Kimchi はプロフェッショナル ユーザー向けにより高度な機能を提供します。ニーズに最も適したものを選択して、仮想マシンの効率的な作成と管理を始めてください。</p><h2 id="t%C3%A0i-nguy%C3%AAn-b%E1%BB%95-sung">追加リソース</h2><ul><li><a href="https://www.linux-kvm.org/">公式 KVM ドキュメント</a></li><li><a href="https://libvirt.org/docs.html">Libvirt ドキュメント</a></li><li><a href="https://cockpit-project.org/">コックピットプロジェクト</a></li><li><a href="https://ubuntu.com/server/docs">Ubuntuサーバーのドキュメント</a></li></ul>
