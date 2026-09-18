---
id: 019c9617-fdce-72e3-9cdf-5eaadabfad1d
title: 在 Ubuntu 上安裝 KVM：透過 Cockpit Web UI 管理虛擬機
slug: cai-dat-kvm-tren-ubuntu-quan-ly-vm-qua-cockpit-web-ui
excerpt: 有關在 Ubuntu 上安裝 KVM 以及透過 Cockpit Web UI 管理 VM 的說明。為2節點家庭實驗室配置網橋、NAT虛擬網路、儲存池。
featured_image: /images/blog/kvm-cockpit-featured.png
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
  name: 開發營運
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
locale: zh-tw
---
<p>如果您正在尋找功能強大、免費且直接整合的虛擬化解決方案 <a href="/zh-tw/tags/linux/">Linux</a> 內核，那麼 <a href="/zh-tw/tags/kvm/"><strong>KVM（基於核心的虛擬機器）</strong></a> 就是答案。 <a href="/zh-tw/tags/kvm/">鍵盤虛擬機</a> 將 Linux 變成 Type-1 <a href="/zh-tw/tags/hypervisor/">管理程式</a>，讓你跑很多 <a href="/zh-tw/tags/virtual-machines/">虛擬機器 (VM)</a> 具有幾乎本機的性能。</p><p>在這篇文章中，我將引導您完成安裝 <a href="/zh-tw/tags/kvm/">鍵盤虛擬機</a> 從上面的 A-Z <strong>2台實體伺服器</strong> 具體配置：</p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>主機名稱</th>
<th>IP位址</th>
<th>角色</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>kvm節點01</strong></td>
<td>192.168.1.10</td>
<td>KVM 主機 #1</td>
</tr>
<tr>
<td><strong>kvm節點02</strong></td>
<td>192.168.1.11</td>
<td>KVM 主機 #2</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p>此配置適合建置家庭實驗室、運行 Kubernetes 叢集或開發/測試環境。</p><h2 id="t%E1%BA%A1i-sao-ch%E1%BB%8Dn-kvm">為什麼選擇KVM？</h2><p>在開始安裝之前，讓我們先了解一下原因 <a href="/zh-tw/tags/kvm/">鍵盤虛擬機</a> 是一個流行的選擇：</p><p><strong>比較虛擬化解決方案：</strong></p><pre><code>┌─────────────────┬──────────────┬─────────────┬──────────────┐
│     Tiêu chí    │     KVM      │   VMware    │  VirtualBox  │
├─────────────────┼──────────────┼─────────────┼──────────────┤
│ Chi phí         │ Miễn phí     │ Có phí      │ Miễn phí     │
│ Hiệu năng       │ Xuất sắc     │ Xuất sắc    │ Tốt          │
│ Tích hợp Linux  │ Native       │ Cần driver  │ Cần driver   │
│ Production-ready│ Có           │ Có          │ Không        │
│ Cloud providers │ AWS, GCP...  │ VMware Cloud│ Không        │
│ Nested Virt     │ Tốt          │ Tốt         │ Hạn chế      │
└─────────────────┴──────────────┴─────────────┴──────────────┘
</code></pre><p><a href="/zh-tw/tags/kvm/">鍵盤虛擬機</a> 被 AWS、Google Cloud、DigitalOcean 等主要雲端供應商使用，並且是 OpenStack、Proxmox VE 的基礎。</p><h2 id="y%C3%AAu-c%E1%BA%A7u-h%E1%BB%87-th%E1%BB%91ng">系統需求</h2><p><strong>配置我們的 2 台伺服器：</strong></p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/2aa8b659-cdb2-4840-b171-4a1459111f9a-1-201-a-e074b0df.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">系統需求</span></figcaption></figure><p><strong>每個節點的最低要求：</strong></p><ul><li>硬體支援CPU <a href="/zh-tw/tags/virtualization/">虛擬化</a> （英特爾 VT-x 或 AMD-V）</li><li>記憶體：8GB+（建議16GB+）</li><li><a href="/zh-tw/tags/storage/">儲存</a>: 100GB+ 固態硬碟</li><li><a href="/zh-tw/tags/ubuntu/">烏班圖</a> 伺服器 22.04 LTS 或 <a href="/zh-tw/tags/ubuntu/">24.04 長期支持</a></li><li><a href="/zh-tw/tags/networking/">網路</a>：1個網路卡（可新增網路卡用於儲存網路）</li></ul><h2 id="b%C6%B0%E1%BB%9Bc-1-ki%E1%BB%83m-tra-hardware-virtualization-support">第 1 步：檢查硬體虛擬化支援</h2><blockquote>📚 執行以上操作 <strong>兩個節點</strong>：kvm-node01 和 kvm-node02</blockquote><p>首先，需要確認CPU支援硬體虛擬化。這是最重要的一步──如果CPU不支持，就不能使用 <a href="/zh-tw/tags/kvm/">鍵盤虛擬機</a>。</p><p><strong>檢查CPU標誌：</strong></p><pre><code class="language-bash"># Kiểm tra số lượng CPU cores hỗ trợ virtualization
egrep -c '(vmx|svm)' /proc/cpuinfo
</code></pre><p>傳回大於 0 的數字表示 CPU 支援：</p><ul><li><code>虛擬機</code> - 英特爾VT-x</li><li><code>支援向量機</code> -AMD-V</li></ul><p><strong>查看更多詳細資訊：</strong></p><pre><code class="language-bash"># Xem loại virtualization
lscpu | grep Virtualization

# Output mẫu:
# Virtualization:                     VT-x      (Intel)
# Virtualization:                     AMD-V     (AMD)
</code></pre><p><strong>使用 kvm-ok 工具：</strong></p><pre><code class="language-bash"># Cài đặt cpu-checker
sudo apt update
sudo apt install -y cpu-checker

# Chạy kiểm tra
sudo kvm-ok
</code></pre><p>期望的結果：</p><pre><code>INFO: /dev/kvm exists
KVM acceleration can be used
</code></pre><blockquote>⚠️ <strong>注意：</strong> 如果結果顯示“KVM 加速無法使用”，請檢查 BIOS/UEFI 並啟用 Intel VT-x 或 AMD-V 選項。</blockquote><h2 id="b%C6%B0%E1%BB%9Bc-2-c%C3%A0i-%C4%91%E1%BA%B7t-kvm-v%C3%A0-c%C3%A1c-packages">步驟2：安裝KVM和軟體包</h2><blockquote>📚 執行以上操作 <strong>兩個節點</strong></blockquote><p>繼續安裝 <a href="/zh-tw/tags/kvm/">鍵盤虛擬機</a> 以及必要的包裝：</p><pre><code class="language-bash"># Update hệ thống
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
</code></pre><p><strong>各包說明：</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>套餐</th>
<th>功能</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>qemu-kvm</code></td>
<td><a href="/zh-tw/tags/qemu/">QEMU</a> 模擬器與 <a href="/zh-tw/tags/kvm/">鍵盤虛擬機</a> 加速度.加速度</td>
</tr>
<tr>
<td><code>libvirt 守護程式系統</code></td>
<td><a href="/zh-tw/tags/libvirt/">利布維爾特</a> 守護程式管理虛擬機</td>
</tr>
<tr>
<td><code>libvirt 用戶端</code></td>
<td>CLI 工具，如 virsh</td>
</tr>
<tr>
<td><code>橋接工具</code></td>
<td>創建和管理 <a href="/zh-tw/tags/networking/">網路</a> 橋樑。橋樑</td>
</tr>
<tr>
<td><code>維廷斯特</code></td>
<td>用於建立虛擬機器的虛擬安裝工具</td>
</tr>
<tr>
<td><code>虛擬管理器</code></td>
<td>用於管理虛擬機器的 GUI（對於 <a href="/zh-tw/tags/server/">伺服器。伺服器</a>）</td>
</tr>
<tr>
<td><code>libguestfs 工具</code></td>
<td>用於操作磁碟映像的工具</td>
</tr>
<tr>
<td><code>libosinfo-bin</code></td>
<td>作業系統資訊資料庫</td>
</tr>
<tr>
<td><code>雲圖像實用程式</code></td>
<td>工具可用於雲影像</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p><strong>驗證安裝：</strong></p><pre><code class="language-bash"># Kiểm tra KVM modules đã load
lsmod | grep kvm

# Output mẫu (Intel):
# kvm_intel             368640  0
# kvm                  1028096  1 kvm_intel

# Output mẫu (AMD):
# kvm_amd               139264  0
# kvm                  1028096  1 kvm_amd
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-3-c%E1%BA%A5u-h%C3%ACnh-user-v%C3%A0-services">步驟 3：設定使用者和服務</h2><blockquote>📚 執行以上操作 <strong>兩個節點</strong></blockquote><p>使用 <a href="/zh-tw/tags/kvm/">鍵盤虛擬機</a> 不需要每個命令都使用 sudo，將用戶添加到必要的群組中：</p><pre><code class="language-bash"># Thêm user hiện tại vào group libvirt và kvm
sudo usermod -aG libvirt $USER
sudo usermod -aG kvm $USER

# Verify groups
groups $USER
</code></pre><p><strong>啟用並啟動 libvirtd 服務：</strong></p><pre><code class="language-bash"># Enable service khởi động cùng hệ thống
sudo systemctl enable libvirtd

# Start service
sudo systemctl start libvirtd

# Kiểm tra status
sudo systemctl status libvirtd
</code></pre><p>期望的輸出：</p><pre><code>● libvirtd.service - Virtualization daemon
     Loaded: loaded (/lib/systemd/system/libvirtd.service; enabled; ...)
     Active: active (running) since ...
</code></pre><blockquote>💡 <strong>提示：</strong> 將使用者新增至群組後，需要登出並重新登錄，或執行 <code>新grp libvirt</code> 立即申請。</blockquote><p><strong>檢查 libvirt 連線：</strong></p><pre><code class="language-bash"># Test virsh command
virsh list --all

# Nếu thành công, output sẽ là:
#  Id   Name   State
# ----------------------
# (empty - chưa có VM nào)
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-4-c%E1%BA%A5u-h%C3%ACnh-network-bridge">步驟 4：設定網橋</h2><p>這是虛擬機器能夠與外部網路通訊的最重要的一步。我們將為兩台伺服器配置靜態 IP 的橋接網路。</p><p><strong>確定網路介面名稱（在兩個節點上完成）：</strong></p><pre><code class="language-bash"># Liệt kê các network interfaces
ip link show

# Tìm interface chính (thường là enp0s3, eth0, eno1, ens18...)
# Ghi nhớ tên này để dùng ở bước sau
</code></pre><p><strong>備份目前配置：</strong></p><pre><code class="language-bash">sudo mkdir -p /etc/netplan/backup
sudo cp /etc/netplan/*.yaml /etc/netplan/backup/
</code></pre><h3 id="c%E1%BA%A5u-h%C3%ACnh-cho-kvm-node01-192168110">kvm-node01 (192.168.1.10) 的配置</h3><pre><code class="language-bash">sudo nano /etc/netplan/01-bridge-config.yaml
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
</code></pre><h3 id="c%E1%BA%A5u-h%C3%ACnh-cho-kvm-node02-192168111">kvm-node02 (192.168.1.11) 的配置</h3><pre><code class="language-bash">sudo nano /etc/netplan/01-bridge-config.yaml
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
</code></pre><p><strong>應用配置（在兩個節點上完成）：</strong></p><pre><code class="language-bash"># Kiểm tra syntax
sudo netplan try

# Nếu OK, áp dụng
sudo netplan apply

# Verify bridge đã tạo
ip addr show br0
brctl show
</code></pre><p>期望的輸出：</p><pre><code>bridge name     bridge id               STP enabled     interfaces
br0             8000.xxxxxxxxxxxx       yes             enp0s3
</code></pre><blockquote>⚠️ <strong>警告：</strong> 透過 SSH 設定網橋時，您可能會失去連線。使用 <code>網路計劃嘗試</code> 如果您不確認，120秒後將自動回滾。</blockquote><h3 id="quy-ho%E1%BA%A1ch-ip-cho-vms">虛擬機器IP規劃</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>範圍</th>
<th>目的</th>
</tr>
</thead>
<tbody>
<tr>
<td>192.168.1.10 - 192.168.1.11</td>
<td>KVM主機</td>
</tr>
<tr>
<td>192.168.1.20 - 192.168.1.49</td>
<td>基礎設施虛擬機器（DNS、DHCP 等）</td>
</tr>
<tr>
<td>192.168.1.50 - 192.168.1.99</td>
<td>Kubernetes集群</td>
</tr>
<tr>
<td>192.168.1.100 - 192.168.1.149</td>
<td>kvm-node01 上的虛擬機</td>
</tr>
<tr>
<td>192.168.1.150 - 192.168.1.199</td>
<td>kvm-node02 上的虛擬機</td>
</tr>
<tr>
<td>192.168.1.200 - 192.168.1.250</td>
<td>保留/DHCP 池</td>
</tr>
<tr>
<td>192.168.1.1</td>
<td>閘道</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="c%E1%BA%A5u-h%C3%ACnh-m%E1%BA%A1ng-%E1%BA%A3o-cho-vms-nat-network">為虛擬機器配置虛擬網路（NAT 網路）</h3><p>除了橋接網路之外，我們還將創建一個 <strong>私人虛擬網絡</strong> 對於虛擬機器。此網路使用NAT，使得虛擬機器可以透過主機存取Internet，但與實體網路隔離。</p><figure class="kg-card kg-image-card"><img src="/storage/uploads/2025/12/0ca2d616-5903-4604-9679-adfc4cb4013e-1-201-a-631e8e05.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"></figure><p><strong>建立虛擬網路定義檔：</strong></p><pre><code class="language-bash"># Tạo file XML cho mạng ảo
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
</code></pre><p><strong>建立並啟動虛擬網路（在兩個節點上執行）：</strong></p><pre><code class="language-bash"># Define network từ XML
sudo virsh net-define /tmp/vm-private-network.xml

# Start network
sudo virsh net-start vm-private

# Enable autostart
sudo virsh net-autostart vm-private

# Verify
sudo virsh net-list --all
</code></pre><p>期望的輸出：</p><pre><code> Name          State    Autostart   Persistent
------------------------------------------------
 default       active   yes         yes
 vm-private    active   yes         yes
</code></pre><p><strong>查看虛擬網路詳細資訊：</strong></p><pre><code class="language-bash"># Xem cấu hình
sudo virsh net-dumpxml vm-private

# Xem DHCP leases
sudo virsh net-dhcp-leases vm-private

# Xem bridge interface
ip addr show virbr1
</code></pre><p><strong>兩個節點的虛擬網路規劃：</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>節點</th>
<th>虛擬網路</th>
<th>子網</th>
<th>DHCP 範圍</th>
</tr>
</thead>
<tbody>
<tr>
<td>kvm節點01</td>
<td>虛擬機器專用</td>
<td>10.10.10.0/24</td>
<td>10.10.10.100-149</td>
</tr>
<tr>
<td>kvm節點02</td>
<td>虛擬機器專用</td>
<td>10.10.10.0/24</td>
<td>10.10.10.150-200</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<blockquote>💡 <strong>注意：</strong> 兩個節點共享相同的子網路 10.10.10.0/24，但共享不同的 DHCP 範圍以避免 IP 衝突。 2 個節點上的虛擬機器可以透過虛擬網路直接相互通訊。</blockquote><p><strong>kvm-node02 的虛擬網路設定（相同子網，不同 DHCP 範圍）：</strong></p><pre><code class="language-bash"># Trên kvm-node02, tạo file XML với DHCP range khác
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
</code></pre><h3 id="c%C3%A0i-%C4%91%E1%BA%B7t-cockpit-%C4%91%E1%BB%83-qu%E1%BA%A3n-l%C3%BD-kvm-qua-web-ui">安装 Cockpit 以通过 Web UI 管理 KVM</h3><p><a href="/zh-tw/tags/cockpit/">駕駛艙</a> 是一个有助于管理的 Web UI <a href="/zh-tw/tags/kvm/">鍵盤虛擬機</a> 直观且简单。安装上面 <strong>兩個節點</strong>:</p><pre><code class="language-bash"># Cài đặt Cockpit và module KVM
sudo apt install -y cockpit cockpit-machines

# Enable và start Cockpit
sudo systemctl enable --now cockpit.socket

# Kiểm tra status
sudo systemctl status cockpit.socket

# Mở firewall (nếu có)
sudo ufw allow 9090/tcp
</code></pre><p><strong>访问驾驶舱：</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>節點</th>
<th>網址</th>
</tr>
</thead>
<tbody>
<tr>
<td>kvm節點01</td>
<td>https://192.168.1.10:9090</td>
</tr>
<tr>
<td>kvm節點02</td>
<td>https://192.168.1.11:9090</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p>使用用户登录 <a href="/zh-tw/tags/linux/">Linux</a> 你的（需要 sudo 许可）。</p><p><strong>KVM 的驾驶舱接口：</strong></p><figure class="kg-card kg-image-card"><img src="/storage/uploads/2025/12/screenshot-2025-12-25-at-200341-f51721fe.png" class="kg-image" alt="" loading="lazy" width="2000" height="1159" sizes="(min-width: 720px) 720px"></figure><p><strong>KVM 的驾驶舱功能：</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>特點</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>虛擬機</strong></td>
<td>直观地创建、删除、启动、停止VM</td>
</tr>
<tr>
<td><strong>主機</strong></td>
<td>浏览器中的 VNC/串行控制台</td>
</tr>
<tr>
<td><strong>存储池</strong></td>
<td>管理磁盘镜像、上传ISO</td>
</tr>
<tr>
<td><strong>網路</strong></td>
<td>建立/編輯虛擬網路（NAT、橋接器）</td>
</tr>
<tr>
<td><strong>快照</strong></td>
<td>创建和恢复快照</td>
</tr>
<tr>
<td><strong>資源監控器</strong></td>
<td>实时监控CPU、RAM、磁盘、网络</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="c%E1%BA%A5u-h%C3%ACnh-vxlan-overlay-network-m%E1%BA%A1ng-%E1%BA%A3o-chung-2-node">設定VXLAN Overlay網路（2節點公共虛擬網路）</h3><p>為了使 2 個節點上的虛擬機器可以透過公共虛擬網路直接相互通信，我們使用 <strong>VXLAN（虚拟可扩展局域网）</strong>。 VXLAN 在實體網路上建立第 2 層隧道，讓不同主機上的虛擬機器充當同一個虛擬交換器。</p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/ffec6be7-8e8c-4e78-b9a9-03f9addbe1e7-1-201-a-cc0d27f1.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">設定VXLAN Overlay網路（2節點公共虛擬網路）</span></figcaption></figure><p><strong>步骤1：在kvm-node01上创建VXLAN接口：</strong></p><pre><code class="language-bash"># Tạo VXLAN interface với VNI 100
sudo ip link add vxlan100 type vxlan id 100 \
    local 192.168.1.10 \
    remote 192.168.1.11 \
    dstport 4789 \
    dev br0

# Bật interface
sudo ip link set vxlan100 up
</code></pre><p><strong>步驟2：在kvm-node02上建立VXLAN介面：</strong></p><pre><code class="language-bash"># Tạo VXLAN interface với VNI 100
sudo ip link add vxlan100 type vxlan id 100 \
    local 192.168.1.11 \
    remote 192.168.1.10 \
    dstport 4789 \
    dev br0

# Bật interface
sudo ip link set vxlan100 up
</code></pre><p><strong>步驟 3：為 VXLAN 建立網橋（在兩個節點上執行）：</strong></p><pre><code class="language-bash"># Tạo bridge mới cho VXLAN
sudo ip link add vxlan-br0 type bridge
sudo ip link set vxlan-br0 up

# Gắn VXLAN interface vào bridge
sudo ip link set vxlan100 master vxlan-br0

# Verify
bridge link show
</code></pre><p><strong>步驟 4：使用 Netplan 設定持久性：</strong></p><p>建立文件 <code>/etc/netplan/02-vxlan.yaml</code> 上面 <strong>kvm節點01</strong>:</p><pre><code class="language-yaml">network:
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
</code></pre><p>建立文件 <code>/etc/netplan/02-vxlan.yaml</code> 上面 <strong>kvm節點02</strong>:</p><pre><code class="language-yaml">network:
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
</code></pre><p><strong>應用程式配置：</strong></p><pre><code class="language-bash">sudo netplan apply

# Verify VXLAN
ip -d link show vxlan100
bridge link show
</code></pre><p><strong>步驟 5：為 libvirt 定義 VXLAN 網路（兩個節點）：</strong></p><pre><code class="language-bash">sudo tee /tmp/vxlan-network.xml &lt;&lt; EOF
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
</code></pre><p><strong>步骤6：使用VXLAN网络创建虚拟机：</strong></p><pre><code class="language-bash"># Tạo VM với VXLAN network
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
</code></pre><blockquote>⚠️ <strong>注意MTU：</strong> 使用 VXLAN 的虛擬機器需要設定 MTU = 1450（由於 VXLAN 標頭約為 50 位元組）。虛擬機器中的配置：</blockquote><p><strong>测试VXLAN连接：</strong></p><pre><code class="language-bash"># Trên VM1 (kvm-node01) - IP: 10.10.10.101
ping 10.10.10.103  # Ping đến VM3 trên kvm-node02

# Kiểm tra VXLAN statistics
ip -s link show vxlan100
</code></pre><p><strong>比較虛擬網路類型：</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>類型</th>
<th>使用案例</th>
<th>虛擬機器跨節點通信</th>
<th>隔離</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>NAT（虛擬機器專用）</strong></td>
<td>简单的开发/测试</td>
<td>❌ 沒有</td>
<td>✅ 是的</td>
</tr>
<tr>
<td><strong>桥 (br0)</strong></td>
<td>生产、局域网接入</td>
<td>✅ 透過區域網</td>
<td>❌ 沒有</td>
</tr>
<tr>
<td><strong>VXLAN 覆蓋</strong></td>
<td>多節點叢集</td>
<td>✅ 直达L2</td>
<td>✅ 是的</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h2 id="b%C6%B0%E1%BB%9Bc-5-c%E1%BA%A5u-h%C3%ACnh-storage-pool">步骤5：配置存储池</h2><blockquote>📚 執行以上操作 <strong>兩個節點</strong></blockquote><p>儲存池是儲存虛擬機器磁碟鏡像的地方。</p><p><strong>建立儲存資料夾：</strong></p><pre><code class="language-bash"># Sử dụng thư mục mặc định
sudo mkdir -p /var/lib/libvirt/images

# Set permissions
sudo chown -R libvirt-qemu:kvm /var/lib/libvirt/images
sudo chmod -R 775 /var/lib/libvirt/images
</code></pre><p><strong>儲存池定義：</strong></p><pre><code class="language-bash"># Tạo pool mới
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
</code></pre><p>期望的輸出：</p><pre><code> Name      State    Autostart
-------------------------------
 default   active   yes
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-6-c%E1%BA%A5u-h%C3%ACnh-hostname-v%C3%A0-etchosts">步驟 6：設定主機名稱和 /etc/hosts</h2><p>為了使兩個節點能夠透過主機名稱相互通信，需要進行配置 <a href="/zh-tw/tags/linux/">SSH</a> 和主機名稱：</p><p><strong>在 kvm-node01 上：</strong></p><pre><code class="language-bash"># Set hostname
sudo hostnamectl set-hostname kvm-node01

# Cập nhật /etc/hosts
sudo nano /etc/hosts
</code></pre><pre><code>127.0.0.1       localhost
192.168.1.10       kvm-node01
192.168.1.11       kvm-node02
</code></pre><p><strong>在 kvm-node02 上：</strong></p><pre><code class="language-bash"># Set hostname
sudo hostnamectl set-hostname kvm-node02

# Cập nhật /etc/hosts
sudo nano /etc/hosts
</code></pre><pre><code>127.0.0.1       localhost
192.168.1.10       kvm-node01
192.168.1.11       kvm-node02
</code></pre><p><strong>測試2個節點之間的連接：</strong></p><pre><code class="language-bash"># Từ kvm-node01
ping -c 3 kvm-node02

# Từ kvm-node02
ping -c 3 kvm-node01
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-7-t%E1%BA%A1o-virtual-machine-%C4%91%E1%BA%A7u-ti%C3%AAn">第 7 步：建立第一個虛擬機</h2><p>安裝後 <a href="/zh-tw/tags/kvm/">鍵盤虛擬機</a> 完成後，我們將建立第一個要使用的虛擬機 <strong>vm-私有虛擬網絡</strong>。</p><h3 id="ph%C6%B0%C6%A1ng-ph%C3%A1p-1-s%E1%BB%AD-d%E1%BB%A5ng-cloud-image-nhanh">方法一：使用雲鏡像（快速）</h3><p>雲端鏡像是預先安裝作業系統的磁碟鏡像，只需配置並啟動即可：</p><p><strong>在 kvm-node01 上：</strong></p><pre><code class="language-bash"># Download Ubuntu Cloud Image
cd /var/lib/libvirt/images
sudo wget https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img

# Tạo disk image cho VM
sudo qemu-img create -f qcow2 \
    -F qcow2 \
    -b jammy-server-cloudimg-amd64.img \
    vm-test-01.qcow2 20G
</code></pre><p><strong>建立 cloud-init 配置：</strong></p><pre><code class="language-bash"># Tạo thư mục cho cloud-init
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
</code></pre><p><strong>使用 vm-private 虛擬網路建立 VM：</strong></p><pre><code class="language-bash">sudo virt-install \
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
</code></pre><blockquote>💡 <strong>注意：</strong> 使用 <code>--network 網路=vm-private</code> 相反 <code>--網橋=br0</code> 供虛擬機器連接到虛擬網路。</blockquote><p><strong>檢查虛擬機器：</strong></p><pre><code class="language-bash"># List VMs
virsh list --all

# Xem IP của VM (VM sẽ nhận IP từ DHCP 10.10.10.x)
virsh domifaddr vm-test-01

# Hoặc xem từ DHCP leases
sudo virsh net-dhcp-leases vm-private

# Console vào VM
virsh console vm-test-01
# Login: ubuntu / ubuntu123
# Thoát console: Ctrl + ]
</code></pre><p><strong>檢查虛擬機器中的網路：</strong></p><pre><code class="language-bash"># Sau khi login vào VM
ip addr show

# Output mẫu:
# eth0: 10.10.10.101/24  (mạng ảo)

# Test internet (qua NAT)
ping -c 3 google.com

# Test ping đến host
ping -c 3 10.10.10.1
</code></pre><h3 id="t%E1%BA%A1o-vm-v%E1%BB%9Bi-2-network-interfaces">建立具有 2 個網路介面的 VM</h3><p>如果您需要 VM 同時連接到虛擬網路（內部）和橋接連接（外部）：</p><pre><code class="language-bash">sudo virt-install \
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
</code></pre><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/1538512f-1ce9-4249-a7b8-a5fb644b295e-1-201-a-13b9a535.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1116" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">建立具有 2 個網路介面的 VM</span></figcaption></figure><h3 id="ph%C6%B0%C6%A1ng-ph%C3%A1p-2-c%C3%A0i-%C4%91%E1%BA%B7t-t%E1%BB%AB-iso">方法 2：從 ISO 安裝</h3><pre><code class="language-bash"># Download Ubuntu Server ISO (nếu chưa có)
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
</code></pre><p><strong>連接VNC進行安裝：</strong></p><pre><code class="language-bash"># Xem VNC port
sudo virsh vncdisplay vm-ubuntu-01
# Output: :1 (nghĩa là port 5901)

# Kết nối từ máy khác bằng VNC client
# Address: 192.168.1.10:5901
</code></pre><h3 id="so-s%C3%A1nh-c%C3%A1c-lo%E1%BA%A1i-network">比較網路類型</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>網路類型</th>
<th>使用案例</th>
<th>虛擬機器IP</th>
<th>外部訪問</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>虛擬機器專用 (NAT)</strong></td>
<td>開發、測試</td>
<td>10.10.10.x</td>
<td>需要連接埠轉送</td>
</tr>
<tr>
<td><strong>br0（橋）</strong></td>
<td>生產、服務</td>
<td>192.168.1.x</td>
<td>直接</td>
</tr>
<tr>
<td><strong>雙網卡</strong></td>
<td>DMZ、多層應用程式</td>
<td>兩者都</td>
<td>選項</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h2 id="b%C6%B0%E1%BB%9Bc-8-qu%E1%BA%A3n-l%C3%BD-virtual-machines-v%E1%BB%9Bi-virsh">步驟 8：使用 virsh 管理虛擬機</h2><p>創建完上述虛擬機器後 <a href="/zh-tw/tags/kvm/">鍵盤虛擬機</a>，你將管理它們 <code>維爾什</code> 命令。</p><h3 id="qu%E1%BA%A3n-l%C3%BD-virtual-networks">管理虛擬網絡</h3><pre><code class="language-bash"># Liệt kê tất cả networks
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
</code></pre><h3 id="c%C3%A1c-l%E1%BB%87nh-c%C6%A1-b%E1%BA%A3n">基本指令</h3><p><strong>生命週期管理：</strong></p><pre><code class="language-bash"># Liệt kê tất cả VMs
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
</code></pre><p><strong>虛擬機器資訊：</strong></p><pre><code class="language-bash"># Thông tin tổng quan
virsh dominfo vm-test-01

# CPU và memory stats
virsh domstats vm-test-01

# Network interfaces
virsh domiflist vm-test-01

# Disk information
virsh domblklist vm-test-01

# IP address
virsh domifaddr vm-test-01
</code></pre><h3 id="snapshots">快照</h3><pre><code class="language-bash"># Tạo snapshot
virsh snapshot-create-as vm-test-01 \
    --name "before-upgrade" \
    --description "Snapshot before system upgrade"

# Liệt kê snapshots
virsh snapshot-list vm-test-01

# Revert về snapshot
virsh snapshot-revert vm-test-01 before-upgrade

# Xóa snapshot
virsh snapshot-delete vm-test-01 before-upgrade
</code></pre><h3 id="clone-vm">克隆虛擬機</h3><pre><code class="language-bash"># Shutdown VM trước khi clone
virsh shutdown vm-test-01

# Clone VM
virt-clone \
    --original vm-test-01 \
    --name vm-test-02 \
    --auto-clone
</code></pre><h3 id="x%C3%B3a-vm">刪除虛擬機</h3><pre><code class="language-bash"># Shutdown VM
virsh shutdown vm-test-01

# Xóa VM definition và storage
virsh undefine vm-test-01 --remove-all-storage
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-9-c%E1%BA%A5u-h%C3%ACnh-nested-virtualization-optional">步驟 9：配置嵌套虛擬化（可選）</h2><p>嵌套 <a href="/zh-tw/tags/virtualization/">虛擬化</a> 允許在虛擬機器內運行虛擬機器 - 當您想要測試時很有用 <a href="/zh-tw/tags/kubernetes/">庫伯內斯</a> 或 <a href="/zh-tw/tags/docker/">碼頭工人</a> 在虛擬機器中。</p><p><strong>對於英特爾 CPU：</strong></p><pre><code class="language-bash"># Tạo file config
echo "options kvm_intel nested=1" | sudo tee /etc/modprobe.d/kvm-intel.conf

# Reload module
sudo modprobe -r kvm_intel
sudo modprobe kvm_intel

# Verify
cat /sys/module/kvm_intel/parameters/nested
# Output: Y hoặc 1
</code></pre><p><strong>對於 AMD CPU：</strong></p><pre><code class="language-bash"># Tạo file config
echo "options kvm_amd nested=1" | sudo tee /etc/modprobe.d/kvm-amd.conf

# Reload module
sudo modprobe -r kvm_amd
sudo modprobe kvm_amd

# Verify
cat /sys/module/kvm_amd/parameters/nested
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-10-troubleshooting">第 10 步：故障排除</h2><h3 id="l%E1%BB%97i-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p">常見錯誤</h3><p><strong>錯誤：“無法存取儲存檔案”</strong></p><pre><code class="language-bash"># Kiểm tra permissions
ls -la /var/lib/libvirt/images/

# Fix permissions
sudo chown libvirt-qemu:kvm /var/lib/libvirt/images/*.qcow2
sudo chmod 660 /var/lib/libvirt/images/*.qcow2
</code></pre><p><strong>錯誤：虛擬機器沒有 IP 位址</strong></p><pre><code class="language-bash"># Kiểm tra bridge
brctl show
ip addr show br0

# Trong VM, request DHCP
sudo dhclient -v
</code></pre><p><strong>執行 virsh 時發生錯誤：“權限被拒絕”</strong></p><pre><code class="language-bash"># Thêm vào groups
sudo usermod -aG libvirt,kvm $USER

# Logout và login lại
</code></pre><p><strong>查看日誌：</strong></p><pre><code class="language-bash"># Libvirt logs
sudo journalctl -u libvirtd -f

# QEMU logs cho specific VM
sudo tail -f /var/log/libvirt/qemu/vm-test-01.log
</code></pre><h2 id="t%C3%A0i-li%E1%BB%87u-tham-kh%E1%BA%A3o">參考文獻</h2><ul><li><a href="/zh-tw/tags/kvm/">所有關於 KVM 的文章</a></li><li><a href="/zh-tw/tags/cockpit/">xdev.asia 上的駕駛艙</a></li><li><a href="/zh-tw/tags/virtualization/">xdev.asia 上的虛擬化</a></li><li><a href="/zh-tw/tags/networking/">xdev.asia 上的網絡</a></li><li><a href="/zh-tw/tags/qemu/">QEMU 文檔</a></li><li><a href="/zh-tw/tags/libvirt/">xdev.asia 上的 Libvirt</a></li><li><a href="/zh-tw/tags/ubuntu/">Ubuntu 伺服器指南</a></li><li><a href="https://www.linux-kvm.org/page/Documents">KVM官方文檔</a></li><li><a href="https://www.kernel.org/doc/Documentation/networking/vxlan.txt">VXLAN - Linux 核心文檔</a></li></ul><hr><p><em>如果您在安裝過程中遇到問題，請在下方留言！</em></p>
