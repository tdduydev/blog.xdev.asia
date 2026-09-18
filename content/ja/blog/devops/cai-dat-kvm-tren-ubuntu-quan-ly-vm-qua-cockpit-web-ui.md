---
id: 019c9617-fdce-72e3-9cdf-5eaadabfad1d
title: 'Ubuntu に KVM をインストールする: Cockpit Web UI を介して VM を管理する'
slug: cai-dat-kvm-tren-ubuntu-quan-ly-vm-qua-cockpit-web-ui
excerpt: >-
  Ubuntu に KVM をインストールし、Cockpit Web UI を介して VM を管理する手順。 2 ノード ホームラボのネットワーク
  ブリッジ、NAT 仮想ネットワーク、ストレージ プールを構成します。
featured_image: /images/blog/kvm-cockpit-featured.webp
type: blog
reading_time: 27
view_count: 2
meta: null
published_at: '2025-12-25T08:28:15.000000Z'
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
  - name: libvirt
    slug: libvirt
  - name: qemu
    slug: qemu
  - name: Homelab
    slug: homelab
comments: []
locale: ja
---
<p>強力で無料の直接統合された仮想化ソリューションをお探しの場合 <a href="/ja/tags/linux/">Linux</a> カーネル、その後 <a href="/ja/tags/kvm/"><strong>KVM (カーネルベースの仮想マシン)</strong></a> が答えです。 <a href="/ja/tags/kvm/">KVM</a> Linux を Type-1 に変える <a href="/ja/tags/hypervisor/">ハイパーバイザー</a>、たくさん走れるようになります <a href="/ja/tags/virtual-machines/">仮想マシン (VM)</a> ほぼネイティブのパフォーマンスを実現します。</p><p>この記事では、インストール方法を説明します <a href="/ja/tags/kvm/">KVM</a> 上のAからZまで <strong>物理サーバー 2 台</strong> 特定の構成の場合:</p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>ホスト名</th>
<th>IPアドレス</th>
<th>役割</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>kvm-node01</strong></td>
<td>192.168.1.10</td>
<td>KVM ホスト #1</td>
</tr>
<tr>
<td><strong>kvm-node02</strong></td>
<td>192.168.1.11</td>
<td>KVM ホスト #2</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p>この構成は、ホームラボの構築、Kubernetes クラスターの実行、または開発/テスト環境に適しています。</p><h2 id="t%E1%BA%A1i-sao-ch%E1%BB%8Dn-kvm">KVM を選択する理由</h2><p>インストールに入る前に、その理由を理解しましょう <a href="/ja/tags/kvm/">KVM</a> は一般的な選択肢です:</p><p><strong>仮想化ソリューションを比較します。</strong></p><pre><code>┌─────────────────┬──────────────┬─────────────┬──────────────┐
│     Tiêu chí    │     KVM      │   VMware    │  VirtualBox  │
├─────────────────┼──────────────┼─────────────┼──────────────┤
│ Chi phí         │ Miễn phí     │ Có phí      │ Miễn phí     │
│ Hiệu năng       │ Xuất sắc     │ Xuất sắc    │ Tốt          │
│ Tích hợp Linux  │ Native       │ Cần driver  │ Cần driver   │
│ Production-ready│ Có           │ Có          │ Không        │
│ Cloud providers │ AWS, GCP...  │ VMware Cloud│ Không        │
│ Nested Virt     │ Tốt          │ Tốt         │ Hạn chế      │
└─────────────────┴──────────────┴─────────────┴──────────────┘
</code></pre><p><a href="/ja/tags/kvm/">KVM</a> AWS、Google Cloud、DigitalOcean などの主要なクラウド プロバイダーによって使用されており、OpenStack、Proxmox VE の基盤です。</p><h2 id="y%C3%AAu-c%E1%BA%A7u-h%E1%BB%87-th%E1%BB%91ng">システム要件</h2><p><strong>2 つのサーバーの構成:</strong></p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/2aa8b659-cdb2-4840-b171-4a1459111f9a-1-201-a-e074b0df.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">システム要件</span></figcaption></figure><p><strong>ノードごとの最小要件:</strong></p><ul><li>ハードウェア対応CPU <a href="/ja/tags/virtualization/">仮想化</a> (インテル VT-x または AMD-V)</li><li>RAM: 8GB以上 (16GB以上を推奨)</li><li><a href="/ja/tags/storage/">ストレージ</a>: 100GB以上のSSD</li><li><a href="/ja/tags/ubuntu/">Ubuntu</a> サーバー 22.04 LTS または <a href="/ja/tags/ubuntu/">24.04LTS</a></li><li><a href="/ja/tags/networking/">ネットワーク</a>: 1 NIC (ストレージネットワーク用にNICを追加可能)</li></ul><h2 id="b%C6%B0%E1%BB%9Bc-1-ki%E1%BB%83m-tra-hardware-virtualization-support">ステップ 1: ハードウェア仮想化サポートを確認する</h2><blockquote>📚 上記を実行します <strong>両方のノード</strong>: kvm-node01 および kvm-node02</blockquote><p>まず、CPU がハードウェア仮想化をサポートしていることを確認する必要があります。これは最も重要なステップです。CPU がサポートしていない場合は使用できません。 <a href="/ja/tags/kvm/">KVM</a>。</p><p><strong>CPU フラグを確認します。</strong></p><pre><code class="language-bash"># Kiểm tra số lượng CPU cores hỗ trợ virtualization
egrep -c '(vmx|svm)' /proc/cpuinfo
</code></pre><p>0 より大きい数値を返す結果は、CPU が以下をサポートしていることを意味します。</p><ul><li><code>vmx</code> - インテル VT-x</li><li><code>SVM</code> - AMD-V</li></ul><p><strong>詳細を確認してください:</strong></p><pre><code class="language-bash"># Xem loại virtualization
lscpu | grep Virtualization

# Output mẫu:
# Virtualization:                     VT-x      (Intel)
# Virtualization:                     AMD-V     (AMD)
</code></pre><p><strong>kvm-ok ツールを使用します。</strong></p><pre><code class="language-bash"># Cài đặt cpu-checker
sudo apt update
sudo apt install -y cpu-checker

# Chạy kiểm tra
sudo kvm-ok
</code></pre><p>望ましい結果:</p><pre><code>INFO: /dev/kvm exists
KVM acceleration can be used
</code></pre><blockquote>⚠️ <strong>注:</strong> 結果に「KVM アクセラレーションは使用できません」と表示された場合は、BIOS/UEFI を確認し、Intel VT-x または AMD-V オプションを有効にしてください。</blockquote><h2 id="b%C6%B0%E1%BB%9Bc-2-c%C3%A0i-%C4%91%E1%BA%B7t-kvm-v%C3%A0-c%C3%A1c-packages">ステップ 2: KVM とパッケージをインストールする</h2><blockquote>📚 上記を実行します <strong>両方のノード</strong></blockquote><p>インストールを続行します <a href="/ja/tags/kvm/">KVM</a> および必要なパッケージ:</p><pre><code class="language-bash"># Update hệ thống
sudo apt update &amp;&amp; sudo apt upgrade -y

# Cài đặt KVM và toàn bộ dependencies
sudo apt install -y \
    qemu-kvm \
    libvirt-daemon-system \
    libvirt-clients \
    bridge-utils \
    virtinst \
    virt-manager \
    libguestfs-tools \
    libosinfo-bin \
    cloud-image-utils
</code></pre><p><strong>各パッケージの説明:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>パッケージ</th>
<th>機能</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>qemu-kvm</code></td>
<td><a href="/ja/tags/qemu/">QEMU</a> エミュレータ付き <a href="/ja/tags/kvm/">KVM</a> 加速.加速</td>
</tr>
<tr>
<td><code>libvirt デーモン システム</code></td>
<td><a href="/ja/tags/libvirt/">リブバート</a> デーモンは VM を管理します</td>
</tr>
<tr>
<td><code>libvirtクライアント</code></td>
<td>virsh などの CLI ツール</td>
</tr>
<tr>
<td><code>ブリッジユーティリティ</code></td>
<td>作成と管理 <a href="/ja/tags/networking/">ネットワーク</a> 橋。橋</td>
</tr>
<tr>
<td><code>バーティンスト</code></td>
<td>VM を作成するための virt-install ツール</td>
</tr>
<tr>
<td><code>仮想マネージャー</code></td>
<td>VM を管理するための GUI (オプション) <a href="/ja/tags/server/">サーバー。サーバー</a>）</td>
</tr>
<tr>
<td><code>libguestfs-tools</code></td>
<td>ディスクイメージを操作するためのツール</td>
</tr>
<tr>
<td><code>libosinfo-bin</code></td>
<td>OS情報のデータベース</td>
</tr>
<tr>
<td><code>クラウドイメージユーティリティ</code></td>
<td>ツールはクラウド画像を操作します</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p><strong>インストールを確認します。</strong></p><pre><code class="language-bash"># Kiểm tra KVM modules đã load
lsmod | grep kvm

# Output mẫu (Intel):
# kvm_intel             368640  0
# kvm                  1028096  1 kvm_intel

# Output mẫu (AMD):
# kvm_amd               139264  0
# kvm                  1028096  1 kvm_amd
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-3-c%E1%BA%A5u-h%C3%ACnh-user-v%C3%A0-services">ステップ 3: ユーザーとサービスを構成する</h2><blockquote>📚 上記を実行します <strong>両方のノード</strong></blockquote><p>使用するには <a href="/ja/tags/kvm/">KVM</a> コマンドごとに sudo を必要とせずに、ユーザーを必要なグループに追加します。</p><pre><code class="language-bash"># Thêm user hiện tại vào group libvirt và kvm
sudo usermod -aG libvirt $USER
sudo usermod -aG kvm $USER

# Verify groups
groups $USER
</code></pre><p><strong>libvirtd サービスを有効にして開始します。</strong></p><pre><code class="language-bash"># Enable service khởi động cùng hệ thống
sudo systemctl enable libvirtd

# Start service
sudo systemctl start libvirtd

# Kiểm tra status
sudo systemctl status libvirtd
</code></pre><p>望ましい出力:</p><pre><code>● libvirtd.service - Virtualization daemon
     Loaded: loaded (/lib/systemd/system/libvirtd.service; enabled; ...)
     Active: active (running) since ...
</code></pre><blockquote>💡 <strong>ヒント:</strong> ユーザーをグループに追加した後、ログアウトして再度ログインするか、次のコマンドを実行する必要があります。 <code>newgrp libvirt</code> すぐに申請すること。</blockquote><p><strong>libvirt 接続を確認します。</strong></p><pre><code class="language-bash"># Test virsh command
virsh list --all

# Nếu thành công, output sẽ là:
#  Id   Name   State
# ----------------------
# (empty - chưa có VM nào)
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-4-c%E1%BA%A5u-h%C3%ACnh-network-bridge">ステップ 4: ネットワークブリッジを構成する</h2><p>これは、VM が外部ネットワークと通信できるようにするための最も重要な手順です。静的 IP を使用して両方のサーバーのブリッジ ネットワークを構成します。</p><p><strong>ネットワーク インターフェイス名を決定します (両方のノードで実行)。</strong></p><pre><code class="language-bash"># Liệt kê các network interfaces
ip link show

# Tìm interface chính (thường là enp0s3, eth0, eno1, ens18...)
# Ghi nhớ tên này để dùng ở bước sau
</code></pre><p><strong>現在の構成をバックアップします。</strong></p><pre><code class="language-bash">sudo mkdir -p /etc/netplan/backup
sudo cp /etc/netplan/*.yaml /etc/netplan/backup/
</code></pre><h3 id="c%E1%BA%A5u-h%C3%ACnh-cho-kvm-node01-192168110">kvm-node01 (192.168.1.10) の構成</h3><pre><code class="language-bash">sudo nano /etc/netplan/01-bridge-config.yaml
</code></pre><pre><code class="language-yaml"># /etc/netplan/01-bridge-config.yaml - kvm-node01
network:
  version: 2
  renderer: networkd
  
  ethernets:
    enp0s3:  # ⚠️ Thay bằng tên interface thực tế
      dhcp4: false
      dhcp6: false
  
  bridges:
    br0:
      interfaces:
        - enp0s3  # ⚠️ Thay bằng tên interface thực tế
      addresses:
        - 192.168.1.10/24
      routes:
        - to: default
          via: 192.168.1.1
      nameservers:
        addresses:
          - 8.8.8.8
          - 8.8.4.4
      mtu: 1500
      parameters:
        stp: true
        forward-delay: 4
</code></pre><h3 id="c%E1%BA%A5u-h%C3%ACnh-cho-kvm-node02-192168111">kvm-node02 (192.168.1.11) の構成</h3><pre><code class="language-bash">sudo nano /etc/netplan/01-bridge-config.yaml
</code></pre><pre><code class="language-yaml"># /etc/netplan/01-bridge-config.yaml - kvm-node02
network:
  version: 2
  renderer: networkd
  
  ethernets:
    enp0s3:  # ⚠️ Thay bằng tên interface thực tế
      dhcp4: false
      dhcp6: false
  
  bridges:
    br0:
      interfaces:
        - enp0s3  # ⚠️ Thay bằng tên interface thực tế
      addresses:
        - 192.168.1.11/24
      routes:
        - to: default
          via: 192.168.1.1
      nameservers:
        addresses:
          - 8.8.8.8
          - 8.8.4.4
      mtu: 1500
      parameters:
        stp: true
        forward-delay: 4
</code></pre><p><strong>構成を適用します (両方のノードで実行):</strong></p><pre><code class="language-bash"># Kiểm tra syntax
sudo netplan try

# Nếu OK, áp dụng
sudo netplan apply

# Verify bridge đã tạo
ip addr show br0
brctl show
</code></pre><p>望ましい出力:</p><pre><code>bridge name     bridge id               STP enabled     interfaces
br0             8000.xxxxxxxxxxxx       yes             enp0s3
</code></pre><blockquote>⚠️ <strong>警告:</strong> SSH 経由でネットワーク ブリッジを構成すると、接続が失われることがあります。使用する <code>ネットプランを試す</code> 確認しないと、120 秒後に自動的にロールバックされます。</blockquote><h3 id="quy-ho%E1%BA%A1ch-ip-cho-vms">VM の IP プランニング</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>範囲</th>
<th>目的</th>
</tr>
</thead>
<tbody>
<tr>
<td>192.168.1.10 - 192.168.1.11</td>
<td>KVMホスト</td>
</tr>
<tr>
<td>192.168.1.20 - 192.168.1.49</td>
<td>インフラストラクチャ VM (DNS、DHCP など)</td>
</tr>
<tr>
<td>192.168.1.50 - 192.168.1.99</td>
<td>Kubernetes クラスター</td>
</tr>
<tr>
<td>192.168.1.100 - 192.168.1.149</td>
<td>kvm-node01 上の VM</td>
</tr>
<tr>
<td>192.168.1.150 - 192.168.1.199</td>
<td>kvm-node02 上の VM</td>
</tr>
<tr>
<td>192.168.1.200 - 192.168.1.250</td>
<td>予約済み / DHCP プール</td>
</tr>
<tr>
<td>192.168.1.1</td>
<td>ゲートウェイ</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="c%E1%BA%A5u-h%C3%ACnh-m%E1%BA%A1ng-%E1%BA%A3o-cho-vms-nat-network">VM の仮想ネットワーク (NAT ネットワーク) の構成</h3><p>ブリッジ ネットワークに加えて、もう 1 つ作成します。 <strong>プライベート仮想ネットワーク</strong> VMの場合。このネットワークは NAT を使用するため、VM はホスト経由でインターネットにアクセスできますが、物理ネットワークからは分離されています。</p><figure class="kg-card kg-image-card"><img src="/storage/uploads/2025/12/0ca2d616-5903-4604-9679-adfc4cb4013e-1-201-a-631e8e05.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"></figure><p><strong>仮想ネットワーク定義ファイルを作成します。</strong></p><pre><code class="language-bash"># Tạo file XML cho mạng ảo
sudo tee /tmp/vm-private-network.xml &lt;&lt; EOF
&lt;network&gt;
  &lt;name&gt;vm-private&lt;/name&gt;
  &lt;forward mode='nat'&gt;
    &lt;nat&gt;
      &lt;port start='1024' end='65535'/&gt;
    &lt;/nat&gt;
  &lt;/forward&gt;
  &lt;bridge name='virbr1' stp='on' delay='0'/&gt;
  &lt;ip address='10.10.10.1' netmask='255.255.255.0'&gt;
    &lt;dhcp&gt;
      &lt;range start='10.10.10.100' end='10.10.10.200'/&gt;
    &lt;/dhcp&gt;
  &lt;/ip&gt;
&lt;/network&gt;
EOF
</code></pre><p><strong>仮想ネットワークを作成してアクティブ化します (両方のノードで実行)。</strong></p><pre><code class="language-bash"># Define network từ XML
sudo virsh net-define /tmp/vm-private-network.xml

# Start network
sudo virsh net-start vm-private

# Enable autostart
sudo virsh net-autostart vm-private

# Verify
sudo virsh net-list --all
</code></pre><p>望ましい出力:</p><pre><code> Name          State    Autostart   Persistent
------------------------------------------------
 default       active   yes         yes
 vm-private    active   yes         yes
</code></pre><p><strong>仮想ネットワークの詳細を表示します。</strong></p><pre><code class="language-bash"># Xem cấu hình
sudo virsh net-dumpxml vm-private

# Xem DHCP leases
sudo virsh net-dhcp-leases vm-private

# Xem bridge interface
ip addr show virbr1
</code></pre><p><strong>両方のノードの仮想ネットワーク計画:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>ノード</th>
<th>仮想ネットワーク</th>
<th>サブネット</th>
<th>DHCP 範囲</th>
</tr>
</thead>
<tbody>
<tr>
<td>kvm-node01</td>
<td>vm-プライベート</td>
<td>10.10.10.0/24</td>
<td>10.10.10.100-149</td>
</tr>
<tr>
<td>kvm-node02</td>
<td>vm-プライベート</td>
<td>10.10.10.0/24</td>
<td>10.10.10.150-200</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<blockquote>💡 <strong>注:</strong> 両方のノードは同じサブネット 10.10.10.0/24 を共有しますが、IP の競合を避けるために異なる DHCP 範囲を共有します。 2 つのノード上の VM は、仮想ネットワーク経由で相互に直接通信できます。</blockquote><p><strong>kvm-node02 の仮想ネットワーク構成 (同じサブネット、異なる DHCP 範囲):</strong></p><pre><code class="language-bash"># Trên kvm-node02, tạo file XML với DHCP range khác
sudo tee /tmp/vm-private-network.xml &lt;&lt; EOF
&lt;network&gt;
  &lt;n&gt;vm-private&lt;/n&gt;
  &lt;forward mode='nat'&gt;
    &lt;nat&gt;
      &lt;port start='1024' end='65535'/&gt;
    &lt;/nat&gt;
  &lt;/forward&gt;
  &lt;bridge name='virbr1' stp='on' delay='0'/&gt;
  &lt;ip address='10.10.10.1' netmask='255.255.255.0'&gt;
    &lt;dhcp&gt;
      &lt;range start='10.10.10.150' end='10.10.10.200'/&gt;
    &lt;/dhcp&gt;
  &lt;/ip&gt;
&lt;/network&gt;
EOF

# Define và start
sudo virsh net-define /tmp/vm-private-network.xml
sudo virsh net-start vm-private
sudo virsh net-autostart vm-private
</code></pre><h3 id="c%C3%A0i-%C4%91%E1%BA%B7t-cockpit-%C4%91%E1%BB%83-qu%E1%BA%A3n-l%C3%BD-kvm-qua-web-ui">Web UI 経由で KVM を管理するには、Cockpit をインストールします</h3><p><a href="/ja/tags/cockpit/">コックピット</a> 管理に役立つWeb UIです <a href="/ja/tags/kvm/">KVM</a> 直感的で簡単です。上にインストールします <strong>両方のノード</strong>:</p><pre><code class="language-bash"># Cài đặt Cockpit và module KVM
sudo apt install -y cockpit cockpit-machines

# Enable và start Cockpit
sudo systemctl enable --now cockpit.socket

# Kiểm tra status
sudo systemctl status cockpit.socket

# Mở firewall (nếu có)
sudo ufw allow 9090/tcp
</code></pre><p><strong>コックピットにアクセスしてください:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>ノード</th>
<th>URL</th>
</tr>
</thead>
<tbody>
<tr>
<td>kvm-node01</td>
<td>https://192.168.1.10:9090</td>
</tr>
<tr>
<td>kvm-node02</td>
<td>https://192.168.1.11:9090</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p>ユーザーを使用してログインする <a href="/ja/tags/linux/">Linux</a> あなたのものです（sudo許可が必要です）。</p><p><strong>KVM 用コックピット インターフェイス:</strong></p><figure class="kg-card kg-image-card"><img src="/storage/uploads/2025/12/screenshot-2025-12-25-at-200341-f51721fe.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1159" sizes="(min-width: 720px) 720px"></figure><p><strong>KVM のコックピット機能:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>特長</th>
<th>説明</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>仮想マシン</strong></td>
<td>VMを直感的に作成、削除、開始、停止</td>
</tr>
<tr>
<td><strong>コンソール</strong></td>
<td>ブラウザ上で VNC/シリアル コンソールを直接操作</td>
</tr>
<tr>
<td><strong>ストレージプール</strong></td>
<td>ディスクイメージの管理、ISOのアップロード</td>
</tr>
<tr>
<td><strong>ネットワーク</strong></td>
<td>仮想ネットワーク（NAT、ブリッジ）の作成・編集</td>
</tr>
<tr>
<td><strong>スナップショット</strong></td>
<td>スナップショットの作成と復元</td>
</tr>
<tr>
<td><strong>リソースモニター</strong></td>
<td>CPU、RAM、ディスク、ネットワークをリアルタイムで監視</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="c%E1%BA%A5u-h%C3%ACnh-vxlan-overlay-network-m%E1%BA%A1ng-%E1%BA%A3o-chung-2-node">VXLANオーバーレイネットワーク（2ノード共通仮想ネットワーク）の構成</h3><p>2 つのノード上の VM が共通の仮想ネットワークを介して相互に直接通信できるようにするために、次を使用します。 <strong>VXLAN (仮想拡張可能 LAN)</strong>。 VXLAN は、物理ネットワーク全体にレイヤー 2 トンネルを作成し、異なるホスト上の VM が同じ仮想スイッチとして機能できるようにします。</p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/ffec6be7-8e8c-4e78-b9a9-03f9addbe1e7-1-201-a-cc0d27f1.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">VXLANオーバーレイネットワーク（2ノード共通仮想ネットワーク）の構成</span></figcaption></figure><p><strong>ステップ 1: kvm-node01 に VXLAN インターフェイスを作成します。</strong></p><pre><code class="language-bash"># Tạo VXLAN interface với VNI 100
sudo ip link add vxlan100 type vxlan id 100 \
    local 192.168.1.10 \
    remote 192.168.1.11 \
    dstport 4789 \
    dev br0

# Bật interface
sudo ip link set vxlan100 up
</code></pre><p><strong>ステップ 2: kvm-node02 に VXLAN インターフェイスを作成します。</strong></p><pre><code class="language-bash"># Tạo VXLAN interface với VNI 100
sudo ip link add vxlan100 type vxlan id 100 \
    local 192.168.1.11 \
    remote 192.168.1.10 \
    dstport 4789 \
    dev br0

# Bật interface
sudo ip link set vxlan100 up
</code></pre><p><strong>ステップ 3: VXLAN のブリッジを作成します (両方のノードで実行):</strong></p><pre><code class="language-bash"># Tạo bridge mới cho VXLAN
sudo ip link add vxlan-br0 type bridge
sudo ip link set vxlan-br0 up

# Gắn VXLAN interface vào bridge
sudo ip link set vxlan100 master vxlan-br0

# Verify
bridge link show
</code></pre><p><strong>ステップ 4: Netplan を使用して永続的な構成を構成します。</strong></p><p>ファイルの作成 <code>/etc/netplan/02-vxlan.yaml</code> 上 <strong>kvm-node01</strong>:</p><pre><code class="language-yaml">network:
  version: 2
  tunnels:
    vxlan100:
      mode: vxlan
      id: 100
      local: 192.168.1.10
      remote: 192.168.1.11
      port: 4789
      
  bridges:
    vxlan-br0:
      interfaces:
        - vxlan100
      mtu: 1450
      parameters:
        stp: false
        forward-delay: 0
</code></pre><p>ファイルの作成 <code>/etc/netplan/02-vxlan.yaml</code> 上 <strong>kvm-node02</strong>:</p><pre><code class="language-yaml">network:
  version: 2
  tunnels:
    vxlan100:
      mode: vxlan
      id: 100
      local: 192.168.1.11
      remote: 192.168.1.10
      port: 4789
      
  bridges:
    vxlan-br0:
      interfaces:
        - vxlan100
      mtu: 1450
      parameters:
        stp: false
        forward-delay: 0
</code></pre><p><strong>構成を適用します。</strong></p><pre><code class="language-bash">sudo netplan apply

# Verify VXLAN
ip -d link show vxlan100
bridge link show
</code></pre><p><strong>ステップ 5: libvirt の VXLAN ネットワークを定義します (両方のノード)。</strong></p><pre><code class="language-bash">sudo tee /tmp/vxlan-network.xml &lt;&lt; EOF
&lt;network&gt;
  &lt;name&gt;vxlan-net&lt;/name&gt;
  &lt;forward mode="bridge"/&gt;
  &lt;bridge name="vxlan-br0"/&gt;
&lt;/network&gt;
EOF

# Define và start network
sudo virsh net-define /tmp/vxlan-network.xml
sudo virsh net-start vxlan-net
sudo virsh net-autostart vxlan-net

# Verify
sudo virsh net-list --all
</code></pre><p><strong>ステップ 6: VXLAN ネットワークを使用して VM を作成します。</strong></p><pre><code class="language-bash"># Tạo VM với VXLAN network
sudo virt-install \
    --name vm-vxlan-01 \
    --memory 2048 \
    --vcpus 2 \
    --disk path=/var/lib/libvirt/images/vm-vxlan-01.qcow2,size=20 \
    --os-variant ubuntu22.04 \
    --network network=vxlan-net \
    --graphics vnc \
    --cdrom /var/lib/libvirt/images/ubuntu-22.04.3-live-server-amd64.iso \
    --noautoconsole
</code></pre><blockquote>⚠️ <strong>MTU に注意してください:</strong> VXLAN を使用する VM は、MTU = 1450 に設定する必要があります (VXLAN ヘッダーが約 50 バイトのため)。 VM での構成:</blockquote><p><strong>VXLAN 接続をテストします。</strong></p><pre><code class="language-bash"># Trên VM1 (kvm-node01) - IP: 10.10.10.101
ping 10.10.10.103  # Ping đến VM3 trên kvm-node02

# Kiểm tra VXLAN statistics
ip -s link show vxlan100
</code></pre><p><strong>仮想ネットワークの種類を比較します。</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>種類</th>
<th>ユースケース</th>
<th>VM はノード間で通信します</th>
<th>孤立</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>NAT (vm-プライベート)</strong></td>
<td>単純な開発/テスト</td>
<td>❌ いいえ</td>
<td>✅ はい</td>
</tr>
<tr>
<td><strong>橋 (br0)</strong></td>
<td>本番環境、LANアクセス</td>
<td>✅ LAN経由</td>
<td>❌ いいえ</td>
</tr>
<tr>
<td><strong>VXLAN オーバーレイ</strong></td>
<td>マルチノードクラスター</td>
<td>✅ ダイレクトL2</td>
<td>✅ はい</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h2 id="b%C6%B0%E1%BB%9Bc-5-c%E1%BA%A5u-h%C3%ACnh-storage-pool">ステップ 5: ストレージプールの構成</h2><blockquote>📚 上記を実行します <strong>両方のノード</strong></blockquote><p>ストレージ プールは、VM のディスク イメージが保存される場所です。</p><p><strong>保存フォルダーを作成します。</strong></p><pre><code class="language-bash"># Sử dụng thư mục mặc định
sudo mkdir -p /var/lib/libvirt/images

# Set permissions
sudo chown -R libvirt-qemu:kvm /var/lib/libvirt/images
sudo chmod -R 775 /var/lib/libvirt/images
</code></pre><p><strong>ストレージプールの定義:</strong></p><pre><code class="language-bash"># Tạo pool mới
sudo virsh pool-define-as \
    --name default \
    --type dir \
    --target /var/lib/libvirt/images

# Build và start pool
sudo virsh pool-build default
sudo virsh pool-start default
sudo virsh pool-autostart default

# Verify
sudo virsh pool-list --all
sudo virsh pool-info default
</code></pre><p>望ましい出力:</p><pre><code> Name      State    Autostart
-------------------------------
 default   active   yes
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-6-c%E1%BA%A5u-h%C3%ACnh-hostname-v%C3%A0-etchosts">ステップ 6: ホスト名と /etc/hosts を構成する</h2><p>2 つのノードがホスト名で相互に通信できるようにするには、構成が必要です <a href="/ja/tags/linux/">SSH</a> およびホスト名:</p><p><strong>kvm-node01 上:</strong></p><pre><code class="language-bash"># Set hostname
sudo hostnamectl set-hostname kvm-node01

# Cập nhật /etc/hosts
sudo nano /etc/hosts
</code></pre><pre><code>127.0.0.1       localhost
192.168.1.10       kvm-node01
192.168.1.11       kvm-node02
</code></pre><p><strong>kvm-node02 上:</strong></p><pre><code class="language-bash"># Set hostname
sudo hostnamectl set-hostname kvm-node02

# Cập nhật /etc/hosts
sudo nano /etc/hosts
</code></pre><pre><code>127.0.0.1       localhost
192.168.1.10       kvm-node01
192.168.1.11       kvm-node02
</code></pre><p><strong>2 つのノード間の接続をテストします。</strong></p><pre><code class="language-bash"># Từ kvm-node01
ping -c 3 kvm-node02

# Từ kvm-node02
ping -c 3 kvm-node01
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-7-t%E1%BA%A1o-virtual-machine-%C4%91%E1%BA%A7u-ti%C3%AAn">ステップ 7: 最初の仮想マシンを作成する</h2><p>インストール後 <a href="/ja/tags/kvm/">KVM</a> 完了したら、使用する最初の VM を作成します <strong>vm-プライベート仮想ネットワーク</strong>。</p><h3 id="ph%C6%B0%C6%A1ng-ph%C3%A1p-1-s%E1%BB%AD-d%E1%BB%A5ng-cloud-image-nhanh">方法 1: クラウド イメージを使用する (高速)</h3><p>クラウド イメージは OS がプレインストールされたディスク イメージであり、設定して起動するだけで済みます。</p><p><strong>kvm-node01 上:</strong></p><pre><code class="language-bash"># Download Ubuntu Cloud Image
cd /var/lib/libvirt/images
sudo wget https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img

# Tạo disk image cho VM
sudo qemu-img create -f qcow2 \
    -F qcow2 \
    -b jammy-server-cloudimg-amd64.img \
    vm-test-01.qcow2 20G
</code></pre><p><strong>Cloud-init 構成を作成します。</strong></p><pre><code class="language-bash"># Tạo thư mục cho cloud-init
sudo mkdir -p /var/lib/libvirt/cloud-init

# Tạo file meta-data
sudo tee /var/lib/libvirt/cloud-init/meta-data &lt;&lt; EOF
instance-id: vm-test-01
local-hostname: vm-test-01
EOF

# Tạo file user-data
sudo tee /var/lib/libvirt/cloud-init/user-data &lt;&lt; EOF
#cloud-config
hostname: vm-test-01
users:
  - name: ubuntu
    sudo: ALL=(ALL) NOPASSWD:ALL
    groups: users, admin
    home: /home/ubuntu
    shell: /bin/bash
    lock_passwd: false

chpasswd:
  list: |
    ubuntu:ubuntu123
  expire: false

package_update: true
packages:
  - qemu-guest-agent
  - curl
  - wget
  - vim

runcmd:
  - systemctl enable qemu-guest-agent
  - systemctl start qemu-guest-agent
EOF

# Tạo cloud-init ISO
sudo cloud-localds /var/lib/libvirt/images/vm-test-01-cidata.iso \
    /var/lib/libvirt/cloud-init/user-data \
    /var/lib/libvirt/cloud-init/meta-data
</code></pre><p><strong>vm-private 仮想ネットワークを使用して VM を作成します。</strong></p><pre><code class="language-bash">sudo virt-install \
    --name vm-test-01 \
    --memory 2048 \
    --vcpus 2 \
    --disk path=/var/lib/libvirt/images/vm-test-01.qcow2,format=qcow2 \
    --disk path=/var/lib/libvirt/images/vm-test-01-cidata.iso,device=cdrom \
    --os-variant ubuntu22.04 \
    --network network=vm-private \
    --graphics none \
    --import \
    --noautoconsole
</code></pre><blockquote>💡 <strong>注:</strong> 使用する <code>--network network=vm-private</code> 代わりに <code>--ネットワークブリッジ=br0</code> VM が仮想ネットワークに接続できるようにします。</blockquote><p><strong>VM を確認します。</strong></p><pre><code class="language-bash"># List VMs
virsh list --all

# Xem IP của VM (VM sẽ nhận IP từ DHCP 10.10.10.x)
virsh domifaddr vm-test-01

# Hoặc xem từ DHCP leases
sudo virsh net-dhcp-leases vm-private

# Console vào VM
virsh console vm-test-01
# Login: ubuntu / ubuntu123
# Thoát console: Ctrl + ]
</code></pre><p><strong>VM のネットワークを確認します。</strong></p><pre><code class="language-bash"># Sau khi login vào VM
ip addr show

# Output mẫu:
# eth0: 10.10.10.101/24  (mạng ảo)

# Test internet (qua NAT)
ping -c 3 google.com

# Test ping đến host
ping -c 3 10.10.10.1
</code></pre><h3 id="t%E1%BA%A1o-vm-v%E1%BB%9Bi-2-network-interfaces">2 つのネットワーク インターフェイスを持つ VM を作成する</h3><p>VM を仮想ネットワーク (内部) とブリッジ接続 (外部) の両方に接続する必要がある場合:</p><pre><code class="language-bash">sudo virt-install \
    --name vm-dual-nic \
    --memory 2048 \
    --vcpus 2 \
    --disk path=/var/lib/libvirt/images/vm-dual-nic.qcow2,size=20,format=qcow2 \
    --os-variant ubuntu22.04 \
    --network network=vm-private \
    --network bridge=br0 \
    --graphics vnc,listen=0.0.0.0 \
    --cdrom /var/lib/libvirt/images/ubuntu-22.04.3-live-server-amd64.iso \
    --boot cdrom,hd \
    --noautoconsole
</code></pre><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/1538512f-1ce9-4249-a7b8-a5fb644b295e-1-201-a-13b9a535.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1116" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">2 つのネットワーク インターフェイスを持つ VM を作成する</span></figcaption></figure><h3 id="ph%C6%B0%C6%A1ng-ph%C3%A1p-2-c%C3%A0i-%C4%91%E1%BA%B7t-t%E1%BB%AB-iso">方法 2: ISO からインストールする</h3><pre><code class="language-bash"># Download Ubuntu Server ISO (nếu chưa có)
cd /var/lib/libvirt/images
sudo wget https://releases.ubuntu.com/22.04/ubuntu-22.04.3-live-server-amd64.iso

# Tạo VM với mạng ảo
sudo virt-install \
    --name vm-ubuntu-01 \
    --memory 2048 \
    --vcpus 2 \
    --disk path=/var/lib/libvirt/images/vm-ubuntu-01.qcow2,size=20,format=qcow2 \
    --os-variant ubuntu22.04 \
    --network network=vm-private \
    --graphics vnc,listen=0.0.0.0,port=5901 \
    --cdrom /var/lib/libvirt/images/ubuntu-22.04.3-live-server-amd64.iso \
    --boot cdrom,hd \
    --noautoconsole
</code></pre><p><strong>VNC に接続してインストールします。</strong></p><pre><code class="language-bash"># Xem VNC port
sudo virsh vncdisplay vm-ubuntu-01
# Output: :1 (nghĩa là port 5901)

# Kết nối từ máy khác bằng VNC client
# Address: 192.168.1.10:5901
</code></pre><h3 id="so-s%C3%A1nh-c%C3%A1c-lo%E1%BA%A1i-network">ネットワークの種類を比較する</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>ネットワークの種類</th>
<th>ユースケース</th>
<th>VM IP</th>
<th>外部アクセス</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>vm-プライベート (NAT)</strong></td>
<td>開発、テスト</td>
<td>10.10.10.x</td>
<td>ポート転送が必要</td>
</tr>
<tr>
<td><strong>br0 (ブリッジ)</strong></td>
<td>生産、サービス</td>
<td>192.168.1.x</td>
<td>直接</td>
</tr>
<tr>
<td><strong>デュアルNIC</strong></td>
<td>DMZ、多層アプリ</td>
<td>両方</td>
<td>オプション</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h2 id="b%C6%B0%E1%BB%9Bc-8-qu%E1%BA%A3n-l%C3%BD-virtual-machines-v%E1%BB%9Bi-virsh">ステップ 8: virsh を使用して仮想マシンを管理する</h2><p>上記のVMを作成した後 <a href="/ja/tags/kvm/">KVM</a>、次のようにして管理します。 <code>バーシュ</code> コマンド。</p><h3 id="qu%E1%BA%A3n-l%C3%BD-virtual-networks">仮想ネットワークの管理</h3><pre><code class="language-bash"># Liệt kê tất cả networks
virsh net-list --all

# Xem thông tin network
virsh net-info vm-private

# Xem DHCP leases (IP đã cấp cho VMs)
virsh net-dhcp-leases vm-private

# Xem cấu hình XML của network
virsh net-dumpxml vm-private

# Start/Stop network
virsh net-start vm-private
virsh net-destroy vm-private

# Enable/Disable autostart
virsh net-autostart vm-private
virsh net-autostart --disable vm-private

# Xóa network
virsh net-undefine vm-private
</code></pre><h3 id="c%C3%A1c-l%E1%BB%87nh-c%C6%A1-b%E1%BA%A3n">基本コマンド</h3><p><strong>ライフサイクル管理:</strong></p><pre><code class="language-bash"># Liệt kê tất cả VMs
virsh list --all

# Start VM
virsh start vm-test-01

# Shutdown graceful
virsh shutdown vm-test-01

# Force stop (như rút điện)
virsh destroy vm-test-01

# Reboot
virsh reboot vm-test-01

# Suspend/Resume
virsh suspend vm-test-01
virsh resume vm-test-01

# Autostart khi host boot
virsh autostart vm-test-01
virsh autostart --disable vm-test-01
</code></pre><p><strong>VM情報:</strong></p><pre><code class="language-bash"># Thông tin tổng quan
virsh dominfo vm-test-01

# CPU và memory stats
virsh domstats vm-test-01

# Network interfaces
virsh domiflist vm-test-01

# Disk information
virsh domblklist vm-test-01

# IP address
virsh domifaddr vm-test-01
</code></pre><h3 id="snapshots">スナップショット</h3><pre><code class="language-bash"># Tạo snapshot
virsh snapshot-create-as vm-test-01 \
    --name "before-upgrade" \
    --description "Snapshot before system upgrade"

# Liệt kê snapshots
virsh snapshot-list vm-test-01

# Revert về snapshot
virsh snapshot-revert vm-test-01 before-upgrade

# Xóa snapshot
virsh snapshot-delete vm-test-01 before-upgrade
</code></pre><h3 id="clone-vm">VMのクローンを作成する</h3><pre><code class="language-bash"># Shutdown VM trước khi clone
virsh shutdown vm-test-01

# Clone VM
virt-clone \
    --original vm-test-01 \
    --name vm-test-02 \
    --auto-clone
</code></pre><h3 id="x%C3%B3a-vm">VMの削除</h3><pre><code class="language-bash"># Shutdown VM
virsh shutdown vm-test-01

# Xóa VM definition và storage
virsh undefine vm-test-01 --remove-all-storage
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-9-c%E1%BA%A5u-h%C3%ACnh-nested-virtualization-optional">ステップ 9: ネストされた仮想化の構成 (オプション)</h2><p>入れ子になった <a href="/ja/tags/virtualization/">仮想化</a> VM 内で VM を実行できる - テストする場合に便利 <a href="/ja/tags/kubernetes/">Kubernetes</a> または <a href="/ja/tags/docker/">ドッカー</a> VMで。</p><p><strong>インテル CPU の場合:</strong></p><pre><code class="language-bash"># Tạo file config
echo "options kvm_intel nested=1" | sudo tee /etc/modprobe.d/kvm-intel.conf

# Reload module
sudo modprobe -r kvm_intel
sudo modprobe kvm_intel

# Verify
cat /sys/module/kvm_intel/parameters/nested
# Output: Y hoặc 1
</code></pre><p><strong>AMD CPUの場合:</strong></p><pre><code class="language-bash"># Tạo file config
echo "options kvm_amd nested=1" | sudo tee /etc/modprobe.d/kvm-amd.conf

# Reload module
sudo modprobe -r kvm_amd
sudo modprobe kvm_amd

# Verify
cat /sys/module/kvm_amd/parameters/nested
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-10-troubleshooting">ステップ 10: トラブルシューティング</h2><h3 id="l%E1%BB%97i-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p">よくあるエラー</h3><p><strong>エラー: 「ストレージ ファイルにアクセスできません」</strong></p><pre><code class="language-bash"># Kiểm tra permissions
ls -la /var/lib/libvirt/images/

# Fix permissions
sudo chown libvirt-qemu:kvm /var/lib/libvirt/images/*.qcow2
sudo chmod 660 /var/lib/libvirt/images/*.qcow2
</code></pre><p><strong>エラー: VM には IP アドレスがありません</strong></p><pre><code class="language-bash"># Kiểm tra bridge
brctl show
ip addr show br0

# Trong VM, request DHCP
sudo dhclient -v
</code></pre><p><strong>エラー: virsh の実行時に「権限が拒否されました」</strong></p><pre><code class="language-bash"># Thêm vào groups
sudo usermod -aG libvirt,kvm $USER

# Logout và login lại
</code></pre><p><strong>ログを表示する:</strong></p><pre><code class="language-bash"># Libvirt logs
sudo journalctl -u libvirtd -f

# QEMU logs cho specific VM
sudo tail -f /var/log/libvirt/qemu/vm-test-01.log
</code></pre><h2 id="t%C3%A0i-li%E1%BB%87u-tham-kh%E1%BA%A3o">参考文献</h2><ul><li><a href="/ja/tags/kvm/">KVM に関するすべての記事</a></li><li><a href="/ja/tags/cockpit/">xdev.asia のコックピット</a></li><li><a href="/ja/tags/virtualization/">xdev.asia の仮想化</a></li><li><a href="/ja/tags/networking/">xdev.asia でのネットワーキング</a></li><li><a href="/ja/tags/qemu/">QEMU ドキュメント</a></li><li><a href="/ja/tags/libvirt/">xdev.asia の Libvirt</a></li><li><a href="/ja/tags/ubuntu/">Ubuntuサーバーガイド</a></li><li><a href="https://www.linux-kvm.org/page/Documents">KVM 公式ドキュメント</a></li><li><a href="https://www.kernel.org/doc/Documentation/networking/vxlan.txt">VXLAN - Linux カーネルのドキュメント</a></li></ul><hr><p><em>インストール中に問題が発生した場合は、以下にコメントを残してください。</em></p>
