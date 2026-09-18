---
id: 019c9617-fdce-72e3-9cdf-5eaadabfad1d
title: 'Cài đặt KVM trên Ubuntu: Quản lý VM qua Cockpit Web UI'
slug: cai-dat-kvm-tren-ubuntu-quan-ly-vm-qua-cockpit-web-ui
excerpt: >-
  Hướng dẫn cài đặt KVM trên Ubuntu và quản lý VM qua Cockpit Web UI. Cấu hình
  network bridge, mạng ảo NAT, storage pool cho homelab 2 node.
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
---
<p>Nếu bạn đang tìm kiếm giải pháp ảo hóa mạnh mẽ, miễn phí và được tích hợp trực tiếp vào <a href="/tags/linux/">Linux</a> kernel, thì <a href="/tags/kvm/"><strong>KVM (Kernel-based Virtual Machine)</strong></a> chính là câu trả lời. <a href="/tags/kvm/">KVM</a> biến Linux thành một Type-1 <a href="/tags/hypervisor/">hypervisor</a>, cho phép bạn chạy nhiều <a href="/tags/virtual-machines/">máy ảo (VMs)</a> với hiệu năng gần như native.</p><p>Trong bài viết này, mình sẽ hướng dẫn bạn cài đặt <a href="/tags/kvm/">KVM</a> từ A-Z trên <strong>2 máy chủ vật lý</strong> với cấu hình cụ thể:</p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Hostname</th>
<th>IP Address</th>
<th>Vai trò</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>kvm-node01</strong></td>
<td>192.168.1.10</td>
<td>KVM Host #1</td>
</tr>
<tr>
<td><strong>kvm-node02</strong></td>
<td>192.168.1.11</td>
<td>KVM Host #2</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p>Cấu hình này phù hợp cho việc xây dựng homelab, chạy Kubernetes cluster, hoặc môi trường development/testing.</p><h2 id="t%E1%BA%A1i-sao-ch%E1%BB%8Dn-kvm">Tại sao chọn KVM?</h2><p>Trước khi bắt tay vào cài đặt, hãy hiểu tại sao <a href="/tags/kvm/">KVM</a> là lựa chọn phổ biến:</p><p><strong>So sánh các giải pháp ảo hóa:</strong></p><pre><code>┌─────────────────┬──────────────┬─────────────┬──────────────┐
│     Tiêu chí    │     KVM      │   VMware    │  VirtualBox  │
├─────────────────┼──────────────┼─────────────┼──────────────┤
│ Chi phí         │ Miễn phí     │ Có phí      │ Miễn phí     │
│ Hiệu năng       │ Xuất sắc     │ Xuất sắc    │ Tốt          │
│ Tích hợp Linux  │ Native       │ Cần driver  │ Cần driver   │
│ Production-ready│ Có           │ Có          │ Không        │
│ Cloud providers │ AWS, GCP...  │ VMware Cloud│ Không        │
│ Nested Virt     │ Tốt          │ Tốt         │ Hạn chế      │
└─────────────────┴──────────────┴─────────────┴──────────────┘
</code></pre><p><a href="/tags/kvm/">KVM</a> được sử dụng bởi các cloud providers lớn như AWS, Google Cloud, DigitalOcean, và là nền tảng cho OpenStack, Proxmox VE.</p><h2 id="y%C3%AAu-c%E1%BA%A7u-h%E1%BB%87-th%E1%BB%91ng">Yêu cầu hệ thống</h2><p><strong>Cấu hình 2 máy chủ của chúng ta:</strong></p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/2aa8b659-cdb2-4840-b171-4a1459111f9a-1-201-a-e074b0df.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Yêu cầu hệ thống</span></figcaption></figure><p><strong>Yêu cầu tối thiểu mỗi node:</strong></p><ul><li>CPU hỗ trợ Hardware <a href="/tags/virtualization/">Virtualization</a> (Intel VT-x hoặc AMD-V)</li><li>RAM: 8GB+ (khuyến nghị 16GB+)</li><li><a href="/tags/storage/">Storage</a>: 100GB+ SSD</li><li><a href="/tags/ubuntu/">Ubuntu</a> Server 22.04 LTS hoặc <a href="/tags/ubuntu/">24.04 LTS</a></li><li><a href="/tags/networking/">Network</a>: 1 NIC (có thể thêm NIC cho storage network)</li></ul><h2 id="b%C6%B0%E1%BB%9Bc-1-ki%E1%BB%83m-tra-hardware-virtualization-support">Bước 1: Kiểm tra Hardware Virtualization Support</h2><blockquote>📚 Thực hiện trên <strong>cả 2 node</strong>: kvm-node01 và kvm-node02</blockquote><p>Đầu tiên, bạn cần xác nhận CPU hỗ trợ ảo hóa phần cứng. Đây là bước quan trọng nhất - nếu CPU không hỗ trợ, bạn không thể sử dụng <a href="/tags/kvm/">KVM</a>.</p><p><strong>Kiểm tra CPU flags:</strong></p><pre><code class="language-bash"># Kiểm tra số lượng CPU cores hỗ trợ virtualization
egrep -c '(vmx|svm)' /proc/cpuinfo
</code></pre><p>Kết quả trả về số lớn hơn 0 nghĩa là CPU hỗ trợ:</p><ul><li><code>vmx</code> - Intel VT-x</li><li><code>svm</code> - AMD-V</li></ul><p><strong>Kiểm tra chi tiết hơn:</strong></p><pre><code class="language-bash"># Xem loại virtualization
lscpu | grep Virtualization

# Output mẫu:
# Virtualization:                     VT-x      (Intel)
# Virtualization:                     AMD-V     (AMD)
</code></pre><p><strong>Sử dụng công cụ kvm-ok:</strong></p><pre><code class="language-bash"># Cài đặt cpu-checker
sudo apt update
sudo apt install -y cpu-checker

# Chạy kiểm tra
sudo kvm-ok
</code></pre><p>Kết quả mong muốn:</p><pre><code>INFO: /dev/kvm exists
KVM acceleration can be used
</code></pre><blockquote>⚠️ <strong>Lưu ý:</strong> Nếu kết quả báo "KVM acceleration can NOT be used", hãy kiểm tra BIOS/UEFI và enable tùy chọn Intel VT-x hoặc AMD-V.</blockquote><h2 id="b%C6%B0%E1%BB%9Bc-2-c%C3%A0i-%C4%91%E1%BA%B7t-kvm-v%C3%A0-c%C3%A1c-packages">Bước 2: Cài đặt KVM và các Packages</h2><blockquote>📚 Thực hiện trên <strong>cả 2 node</strong></blockquote><p>Tiến hành cài đặt <a href="/tags/kvm/">KVM</a> và các packages cần thiết:</p><pre><code class="language-bash"># Update hệ thống
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
</code></pre><p><strong>Giải thích từng package:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Package</th>
<th>Chức năng</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>qemu-kvm</code></td>
<td><a href="/tags/qemu/">QEMU</a> emulator với <a href="/tags/kvm/">KVM</a> acceleration</td>
</tr>
<tr>
<td><code>libvirt-daemon-system</code></td>
<td><a href="/tags/libvirt/">Libvirt</a> daemon quản lý VMs</td>
</tr>
<tr>
<td><code>libvirt-clients</code></td>
<td>CLI tools như virsh</td>
</tr>
<tr>
<td><code>bridge-utils</code></td>
<td>Tạo và quản lý <a href="/tags/networking/">network</a> bridges</td>
</tr>
<tr>
<td><code>virtinst</code></td>
<td>Công cụ virt-install để tạo VMs</td>
</tr>
<tr>
<td><code>virt-manager</code></td>
<td>GUI quản lý VMs (optional cho <a href="/tags/server/">server</a>)</td>
</tr>
<tr>
<td><code>libguestfs-tools</code></td>
<td>Tools thao tác với disk images</td>
</tr>
<tr>
<td><code>libosinfo-bin</code></td>
<td>Database thông tin các OS</td>
</tr>
<tr>
<td><code>cloud-image-utils</code></td>
<td>Tools làm việc với cloud images</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p><strong>Verify cài đặt:</strong></p><pre><code class="language-bash"># Kiểm tra KVM modules đã load
lsmod | grep kvm

# Output mẫu (Intel):
# kvm_intel             368640  0
# kvm                  1028096  1 kvm_intel

# Output mẫu (AMD):
# kvm_amd               139264  0
# kvm                  1028096  1 kvm_amd
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-3-c%E1%BA%A5u-h%C3%ACnh-user-v%C3%A0-services">Bước 3: Cấu hình User và Services</h2><blockquote>📚 Thực hiện trên <strong>cả 2 node</strong></blockquote><p>Để sử dụng <a href="/tags/kvm/">KVM</a> mà không cần sudo cho mọi lệnh, thêm user vào các groups cần thiết:</p><pre><code class="language-bash"># Thêm user hiện tại vào group libvirt và kvm
sudo usermod -aG libvirt $USER
sudo usermod -aG kvm $USER

# Verify groups
groups $USER
</code></pre><p><strong>Enable và start libvirtd service:</strong></p><pre><code class="language-bash"># Enable service khởi động cùng hệ thống
sudo systemctl enable libvirtd

# Start service
sudo systemctl start libvirtd

# Kiểm tra status
sudo systemctl status libvirtd
</code></pre><p>Output mong muốn:</p><pre><code>● libvirtd.service - Virtualization daemon
     Loaded: loaded (/lib/systemd/system/libvirtd.service; enabled; ...)
     Active: active (running) since ...
</code></pre><blockquote>💡 <strong>Tip:</strong> Sau khi thêm user vào groups, bạn cần logout và login lại, hoặc chạy <code>newgrp libvirt</code> để áp dụng ngay.</blockquote><p><strong>Kiểm tra kết nối libvirt:</strong></p><pre><code class="language-bash"># Test virsh command
virsh list --all

# Nếu thành công, output sẽ là:
#  Id   Name   State
# ----------------------
# (empty - chưa có VM nào)
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-4-c%E1%BA%A5u-h%C3%ACnh-network-bridge">Bước 4: Cấu hình Network Bridge</h2><p>Đây là bước quan trọng nhất để VMs có thể giao tiếp với mạng bên ngoài. Chúng ta sẽ cấu hình bridge network cho cả 2 máy chủ với IP tĩnh.</p><p><strong>Xác định tên network interface (thực hiện trên cả 2 node):</strong></p><pre><code class="language-bash"># Liệt kê các network interfaces
ip link show

# Tìm interface chính (thường là enp0s3, eth0, eno1, ens18...)
# Ghi nhớ tên này để dùng ở bước sau
</code></pre><p><strong>Backup config hiện tại:</strong></p><pre><code class="language-bash">sudo mkdir -p /etc/netplan/backup
sudo cp /etc/netplan/*.yaml /etc/netplan/backup/
</code></pre><h3 id="c%E1%BA%A5u-h%C3%ACnh-cho-kvm-node01-192168110">Cấu hình cho kvm-node01 (192.168.1.10)</h3><pre><code class="language-bash">sudo nano /etc/netplan/01-bridge-config.yaml
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
</code></pre><h3 id="c%E1%BA%A5u-h%C3%ACnh-cho-kvm-node02-192168111">Cấu hình cho kvm-node02 (192.168.1.11)</h3><pre><code class="language-bash">sudo nano /etc/netplan/01-bridge-config.yaml
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
</code></pre><p><strong>Áp dụng cấu hình (thực hiện trên cả 2 node):</strong></p><pre><code class="language-bash"># Kiểm tra syntax
sudo netplan try

# Nếu OK, áp dụng
sudo netplan apply

# Verify bridge đã tạo
ip addr show br0
brctl show
</code></pre><p>Output mong muốn:</p><pre><code>bridge name     bridge id               STP enabled     interfaces
br0             8000.xxxxxxxxxxxx       yes             enp0s3
</code></pre><blockquote>⚠️ <strong>Cảnh báo:</strong> Khi cấu hình network bridge qua SSH, bạn có thể bị mất kết nối. Sử dụng <code>netplan try</code> sẽ tự động rollback sau 120 giây nếu bạn không confirm.</blockquote><h3 id="quy-ho%E1%BA%A1ch-ip-cho-vms">Quy hoạch IP cho VMs</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Range</th>
<th>Mục đích</th>
</tr>
</thead>
<tbody>
<tr>
<td>192.168.1.10 - 192.168.1.11</td>
<td>KVM Hosts</td>
</tr>
<tr>
<td>192.168.1.20 - 192.168.1.49</td>
<td>Infrastructure VMs (DNS, DHCP, etc.)</td>
</tr>
<tr>
<td>192.168.1.50 - 192.168.1.99</td>
<td>Kubernetes Cluster</td>
</tr>
<tr>
<td>192.168.1.100 - 192.168.1.149</td>
<td>VMs trên kvm-node01</td>
</tr>
<tr>
<td>192.168.1.150 - 192.168.1.199</td>
<td>VMs trên kvm-node02</td>
</tr>
<tr>
<td>192.168.1.200 - 192.168.1.250</td>
<td>Reserved / DHCP Pool</td>
</tr>
<tr>
<td>192.168.1.1</td>
<td>Gateway</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="c%E1%BA%A5u-h%C3%ACnh-m%E1%BA%A1ng-%E1%BA%A3o-cho-vms-nat-network">Cấu hình Mạng Ảo cho VMs (NAT Network)</h3><p>Ngoài bridge network, chúng ta sẽ tạo thêm một <strong>mạng ảo riêng</strong> cho các VMs. Mạng này sử dụng NAT để VMs có thể truy cập internet thông qua host, nhưng được cô lập khỏi mạng vật lý.</p><figure class="kg-card kg-image-card"><img src="/storage/uploads/2025/12/0ca2d616-5903-4604-9679-adfc4cb4013e-1-201-a-631e8e05.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"></figure><p><strong>Tạo file định nghĩa mạng ảo:</strong></p><pre><code class="language-bash"># Tạo file XML cho mạng ảo
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
</code></pre><p><strong>Tạo và kích hoạt mạng ảo (thực hiện trên cả 2 node):</strong></p><pre><code class="language-bash"># Define network từ XML
sudo virsh net-define /tmp/vm-private-network.xml

# Start network
sudo virsh net-start vm-private

# Enable autostart
sudo virsh net-autostart vm-private

# Verify
sudo virsh net-list --all
</code></pre><p>Output mong muốn:</p><pre><code> Name          State    Autostart   Persistent
------------------------------------------------
 default       active   yes         yes
 vm-private    active   yes         yes
</code></pre><p><strong>Xem thông tin chi tiết mạng ảo:</strong></p><pre><code class="language-bash"># Xem cấu hình
sudo virsh net-dumpxml vm-private

# Xem DHCP leases
sudo virsh net-dhcp-leases vm-private

# Xem bridge interface
ip addr show virbr1
</code></pre><p><strong>Quy hoạch mạng ảo cho cả 2 nodes:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Node</th>
<th>Virtual Network</th>
<th>Subnet</th>
<th>DHCP Range</th>
</tr>
</thead>
<tbody>
<tr>
<td>kvm-node01</td>
<td>vm-private</td>
<td>10.10.10.0/24</td>
<td>10.10.10.100-149</td>
</tr>
<tr>
<td>kvm-node02</td>
<td>vm-private</td>
<td>10.10.10.0/24</td>
<td>10.10.10.150-200</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<blockquote>💡 <strong>Lưu ý:</strong> Cả 2 node dùng chung subnet 10.10.10.0/24 nhưng chia DHCP range khác nhau để tránh xung đột IP. VMs trên 2 node có thể giao tiếp trực tiếp với nhau qua mạng ảo.</blockquote><p><strong>Cấu hình mạng ảo cho kvm-node02 (cùng subnet, khác DHCP range):</strong></p><pre><code class="language-bash"># Trên kvm-node02, tạo file XML với DHCP range khác
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
</code></pre><h3 id="c%C3%A0i-%C4%91%E1%BA%B7t-cockpit-%C4%91%E1%BB%83-qu%E1%BA%A3n-l%C3%BD-kvm-qua-web-ui">Cài đặt Cockpit để quản lý KVM qua Web UI</h3><p><a href="/tags/cockpit/">Cockpit</a> là web UI giúp quản lý <a href="/tags/kvm/">KVM</a> trực quan và dễ dàng. Cài đặt trên <strong>cả 2 node</strong>:</p><pre><code class="language-bash"># Cài đặt Cockpit và module KVM
sudo apt install -y cockpit cockpit-machines

# Enable và start Cockpit
sudo systemctl enable --now cockpit.socket

# Kiểm tra status
sudo systemctl status cockpit.socket

# Mở firewall (nếu có)
sudo ufw allow 9090/tcp
</code></pre><p><strong>Truy cập Cockpit:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Node</th>
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
<p>Login bằng user <a href="/tags/linux/">Linux</a> của bạn (cần quyền sudo).</p><p><strong>Giao diện Cockpit cho KVM:</strong></p><figure class="kg-card kg-image-card"><img src="/storage/uploads/2025/12/screenshot-2025-12-25-at-200341-f51721fe.png" class="kg-image" alt="" loading="lazy" width="2000" height="1159" sizes="(min-width: 720px) 720px"></figure><p><strong>Tính năng Cockpit cho KVM:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Tính năng</th>
<th>Mô tả</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Virtual Machines</strong></td>
<td>Tạo, xóa, start, stop VMs trực quan</td>
</tr>
<tr>
<td><strong>Console</strong></td>
<td>VNC/Serial console ngay trong browser</td>
</tr>
<tr>
<td><strong>Storage Pools</strong></td>
<td>Quản lý disk images, upload ISO</td>
</tr>
<tr>
<td><strong>Networks</strong></td>
<td>Tạo/sửa virtual networks (NAT, Bridge)</td>
</tr>
<tr>
<td><strong>Snapshots</strong></td>
<td>Tạo và restore snapshots</td>
</tr>
<tr>
<td><strong>Resource Monitor</strong></td>
<td>Theo dõi CPU, RAM, Disk, Network real-time</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="c%E1%BA%A5u-h%C3%ACnh-vxlan-overlay-network-m%E1%BA%A1ng-%E1%BA%A3o-chung-2-node">Cấu hình VXLAN Overlay Network (Mạng ảo chung 2 node)</h3><p>Để VMs trên 2 node có thể giao tiếp trực tiếp với nhau qua mạng ảo chung, chúng ta sử dụng <strong>VXLAN (Virtual Extensible LAN)</strong>. VXLAN tạo tunnel Layer 2 qua mạng vật lý, cho phép VMs trên các host khác nhau như cùng một switch ảo.</p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/ffec6be7-8e8c-4e78-b9a9-03f9addbe1e7-1-201-a-cc0d27f1.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Cấu hình VXLAN Overlay Network (Mạng ảo chung 2 node)</span></figcaption></figure><p><strong>Bước 1: Tạo VXLAN interface trên kvm-node01:</strong></p><pre><code class="language-bash"># Tạo VXLAN interface với VNI 100
sudo ip link add vxlan100 type vxlan id 100 \
    local 192.168.1.10 \
    remote 192.168.1.11 \
    dstport 4789 \
    dev br0

# Bật interface
sudo ip link set vxlan100 up
</code></pre><p><strong>Bước 2: Tạo VXLAN interface trên kvm-node02:</strong></p><pre><code class="language-bash"># Tạo VXLAN interface với VNI 100
sudo ip link add vxlan100 type vxlan id 100 \
    local 192.168.1.11 \
    remote 192.168.1.10 \
    dstport 4789 \
    dev br0

# Bật interface
sudo ip link set vxlan100 up
</code></pre><p><strong>Bước 3: Tạo bridge cho VXLAN (thực hiện trên cả 2 node):</strong></p><pre><code class="language-bash"># Tạo bridge mới cho VXLAN
sudo ip link add vxlan-br0 type bridge
sudo ip link set vxlan-br0 up

# Gắn VXLAN interface vào bridge
sudo ip link set vxlan100 master vxlan-br0

# Verify
bridge link show
</code></pre><p><strong>Bước 4: Cấu hình persistent với Netplan:</strong></p><p>Tạo file <code>/etc/netplan/02-vxlan.yaml</code> trên <strong>kvm-node01</strong>:</p><pre><code class="language-yaml">network:
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
</code></pre><p>Tạo file <code>/etc/netplan/02-vxlan.yaml</code> trên <strong>kvm-node02</strong>:</p><pre><code class="language-yaml">network:
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
</code></pre><p><strong>Áp dụng cấu hình:</strong></p><pre><code class="language-bash">sudo netplan apply

# Verify VXLAN
ip -d link show vxlan100
bridge link show
</code></pre><p><strong>Bước 5: Định nghĩa VXLAN network cho libvirt (cả 2 node):</strong></p><pre><code class="language-bash">sudo tee /tmp/vxlan-network.xml &lt;&lt; EOF
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
</code></pre><p><strong>Bước 6: Tạo VM sử dụng VXLAN network:</strong></p><pre><code class="language-bash"># Tạo VM với VXLAN network
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
</code></pre><blockquote>⚠️ <strong>Lưu ý MTU:</strong> VMs sử dụng VXLAN cần đặt MTU = 1450 (do VXLAN header ~50 bytes). Cấu hình trong VM:</blockquote><p><strong>Test kết nối VXLAN:</strong></p><pre><code class="language-bash"># Trên VM1 (kvm-node01) - IP: 10.10.10.101
ping 10.10.10.103  # Ping đến VM3 trên kvm-node02

# Kiểm tra VXLAN statistics
ip -s link show vxlan100
</code></pre><p><strong>So sánh các loại mạng ảo:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Loại</th>
<th>Use Case</th>
<th>VMs giao tiếp cross-node</th>
<th>Cô lập</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>NAT (vm-private)</strong></td>
<td>Dev/Test đơn giản</td>
<td>❌ Không</td>
<td>✅ Có</td>
</tr>
<tr>
<td><strong>Bridge (br0)</strong></td>
<td>Production, LAN access</td>
<td>✅ Qua LAN</td>
<td>❌ Không</td>
</tr>
<tr>
<td><strong>VXLAN Overlay</strong></td>
<td>Multi-node cluster</td>
<td>✅ Trực tiếp L2</td>
<td>✅ Có</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h2 id="b%C6%B0%E1%BB%9Bc-5-c%E1%BA%A5u-h%C3%ACnh-storage-pool">Bước 5: Cấu hình Storage Pool</h2><blockquote>📚 Thực hiện trên <strong>cả 2 node</strong></blockquote><p>Storage pool là nơi lưu trữ các disk images của VMs.</p><p><strong>Tạo thư mục lưu trữ:</strong></p><pre><code class="language-bash"># Sử dụng thư mục mặc định
sudo mkdir -p /var/lib/libvirt/images

# Set permissions
sudo chown -R libvirt-qemu:kvm /var/lib/libvirt/images
sudo chmod -R 775 /var/lib/libvirt/images
</code></pre><p><strong>Định nghĩa storage pool:</strong></p><pre><code class="language-bash"># Tạo pool mới
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
</code></pre><p>Output mong muốn:</p><pre><code> Name      State    Autostart
-------------------------------
 default   active   yes
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-6-c%E1%BA%A5u-h%C3%ACnh-hostname-v%C3%A0-etchosts">Bước 6: Cấu hình Hostname và /etc/hosts</h2><p>Để 2 node có thể giao tiếp với nhau bằng hostname, cần cấu hình <a href="/tags/linux/">SSH</a> và hostname:</p><p><strong>Trên kvm-node01:</strong></p><pre><code class="language-bash"># Set hostname
sudo hostnamectl set-hostname kvm-node01

# Cập nhật /etc/hosts
sudo nano /etc/hosts
</code></pre><pre><code>127.0.0.1       localhost
192.168.1.10       kvm-node01
192.168.1.11       kvm-node02
</code></pre><p><strong>Trên kvm-node02:</strong></p><pre><code class="language-bash"># Set hostname
sudo hostnamectl set-hostname kvm-node02

# Cập nhật /etc/hosts
sudo nano /etc/hosts
</code></pre><pre><code>127.0.0.1       localhost
192.168.1.10       kvm-node01
192.168.1.11       kvm-node02
</code></pre><p><strong>Test kết nối giữa 2 node:</strong></p><pre><code class="language-bash"># Từ kvm-node01
ping -c 3 kvm-node02

# Từ kvm-node02
ping -c 3 kvm-node01
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-7-t%E1%BA%A1o-virtual-machine-%C4%91%E1%BA%A7u-ti%C3%AAn">Bước 7: Tạo Virtual Machine đầu tiên</h2><p>Sau khi cài đặt <a href="/tags/kvm/">KVM</a> xong, chúng ta sẽ tạo VM đầu tiên sử dụng <strong>mạng ảo vm-private</strong>.</p><h3 id="ph%C6%B0%C6%A1ng-ph%C3%A1p-1-s%E1%BB%AD-d%E1%BB%A5ng-cloud-image-nhanh">Phương pháp 1: Sử dụng Cloud Image (Nhanh)</h3><p>Cloud images là disk images đã cài đặt sẵn OS, chỉ cần configure và boot:</p><p><strong>Trên kvm-node01:</strong></p><pre><code class="language-bash"># Download Ubuntu Cloud Image
cd /var/lib/libvirt/images
sudo wget https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img

# Tạo disk image cho VM
sudo qemu-img create -f qcow2 \
    -F qcow2 \
    -b jammy-server-cloudimg-amd64.img \
    vm-test-01.qcow2 20G
</code></pre><p><strong>Tạo cloud-init configuration:</strong></p><pre><code class="language-bash"># Tạo thư mục cho cloud-init
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
</code></pre><p><strong>Tạo VM với mạng ảo vm-private:</strong></p><pre><code class="language-bash">sudo virt-install \
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
</code></pre><blockquote>💡 <strong>Lưu ý:</strong> Sử dụng <code>--network network=vm-private</code> thay vì <code>--network bridge=br0</code> để VM kết nối vào mạng ảo.</blockquote><p><strong>Kiểm tra VM:</strong></p><pre><code class="language-bash"># List VMs
virsh list --all

# Xem IP của VM (VM sẽ nhận IP từ DHCP 10.10.10.x)
virsh domifaddr vm-test-01

# Hoặc xem từ DHCP leases
sudo virsh net-dhcp-leases vm-private

# Console vào VM
virsh console vm-test-01
# Login: ubuntu / ubuntu123
# Thoát console: Ctrl + ]
</code></pre><p><strong>Kiểm tra network trong VM:</strong></p><pre><code class="language-bash"># Sau khi login vào VM
ip addr show

# Output mẫu:
# eth0: 10.10.10.101/24  (mạng ảo)

# Test internet (qua NAT)
ping -c 3 google.com

# Test ping đến host
ping -c 3 10.10.10.1
</code></pre><h3 id="t%E1%BA%A1o-vm-v%E1%BB%9Bi-2-network-interfaces">Tạo VM với 2 Network Interfaces</h3><p>Nếu bạn cần VM vừa kết nối mạng ảo (internal) vừa kết nối bridge (external):</p><pre><code class="language-bash">sudo virt-install \
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
</code></pre><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/1538512f-1ce9-4249-a7b8-a5fb644b295e-1-201-a-13b9a535.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1116" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Tạo VM với 2 Network Interfaces</span></figcaption></figure><h3 id="ph%C6%B0%C6%A1ng-ph%C3%A1p-2-c%C3%A0i-%C4%91%E1%BA%B7t-t%E1%BB%AB-iso">Phương pháp 2: Cài đặt từ ISO</h3><pre><code class="language-bash"># Download Ubuntu Server ISO (nếu chưa có)
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
</code></pre><p><strong>Kết nối VNC để cài đặt:</strong></p><pre><code class="language-bash"># Xem VNC port
sudo virsh vncdisplay vm-ubuntu-01
# Output: :1 (nghĩa là port 5901)

# Kết nối từ máy khác bằng VNC client
# Address: 192.168.1.10:5901
</code></pre><h3 id="so-s%C3%A1nh-c%C3%A1c-lo%E1%BA%A1i-network">So sánh các loại Network</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Loại Network</th>
<th>Use Case</th>
<th>VM IP</th>
<th>Truy cập từ bên ngoài</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>vm-private (NAT)</strong></td>
<td>Development, Testing</td>
<td>10.10.10.x</td>
<td>Cần port forwarding</td>
</tr>
<tr>
<td><strong>br0 (Bridge)</strong></td>
<td>Production, Services</td>
<td>192.168.1.x</td>
<td>Trực tiếp</td>
</tr>
<tr>
<td><strong>Dual NIC</strong></td>
<td>DMZ, Multi-tier apps</td>
<td>Cả hai</td>
<td>Tùy chọn</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h2 id="b%C6%B0%E1%BB%9Bc-8-qu%E1%BA%A3n-l%C3%BD-virtual-machines-v%E1%BB%9Bi-virsh">Bước 8: Quản lý Virtual Machines với virsh</h2><p>Sau khi tạo VM trên <a href="/tags/kvm/">KVM</a>, bạn sẽ quản lý chúng bằng <code>virsh</code> command.</p><h3 id="qu%E1%BA%A3n-l%C3%BD-virtual-networks">Quản lý Virtual Networks</h3><pre><code class="language-bash"># Liệt kê tất cả networks
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
</code></pre><h3 id="c%C3%A1c-l%E1%BB%87nh-c%C6%A1-b%E1%BA%A3n">Các lệnh cơ bản</h3><p><strong>Lifecycle management:</strong></p><pre><code class="language-bash"># Liệt kê tất cả VMs
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
</code></pre><p><strong>Thông tin VM:</strong></p><pre><code class="language-bash"># Thông tin tổng quan
virsh dominfo vm-test-01

# CPU và memory stats
virsh domstats vm-test-01

# Network interfaces
virsh domiflist vm-test-01

# Disk information
virsh domblklist vm-test-01

# IP address
virsh domifaddr vm-test-01
</code></pre><h3 id="snapshots">Snapshots</h3><pre><code class="language-bash"># Tạo snapshot
virsh snapshot-create-as vm-test-01 \
    --name "before-upgrade" \
    --description "Snapshot before system upgrade"

# Liệt kê snapshots
virsh snapshot-list vm-test-01

# Revert về snapshot
virsh snapshot-revert vm-test-01 before-upgrade

# Xóa snapshot
virsh snapshot-delete vm-test-01 before-upgrade
</code></pre><h3 id="clone-vm">Clone VM</h3><pre><code class="language-bash"># Shutdown VM trước khi clone
virsh shutdown vm-test-01

# Clone VM
virt-clone \
    --original vm-test-01 \
    --name vm-test-02 \
    --auto-clone
</code></pre><h3 id="x%C3%B3a-vm">Xóa VM</h3><pre><code class="language-bash"># Shutdown VM
virsh shutdown vm-test-01

# Xóa VM definition và storage
virsh undefine vm-test-01 --remove-all-storage
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-9-c%E1%BA%A5u-h%C3%ACnh-nested-virtualization-optional">Bước 9: Cấu hình Nested Virtualization (Optional)</h2><p>Nested <a href="/tags/virtualization/">virtualization</a> cho phép chạy VMs bên trong VMs - hữu ích khi bạn muốn test <a href="/tags/kubernetes/">Kubernetes</a> hoặc <a href="/tags/docker/">Docker</a> trong VM.</p><p><strong>Cho Intel CPU:</strong></p><pre><code class="language-bash"># Tạo file config
echo "options kvm_intel nested=1" | sudo tee /etc/modprobe.d/kvm-intel.conf

# Reload module
sudo modprobe -r kvm_intel
sudo modprobe kvm_intel

# Verify
cat /sys/module/kvm_intel/parameters/nested
# Output: Y hoặc 1
</code></pre><p><strong>Cho AMD CPU:</strong></p><pre><code class="language-bash"># Tạo file config
echo "options kvm_amd nested=1" | sudo tee /etc/modprobe.d/kvm-amd.conf

# Reload module
sudo modprobe -r kvm_amd
sudo modprobe kvm_amd

# Verify
cat /sys/module/kvm_amd/parameters/nested
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-10-troubleshooting">Bước 10: Troubleshooting</h2><h3 id="l%E1%BB%97i-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p">Lỗi thường gặp</h3><p><strong>Lỗi: "Cannot access storage file"</strong></p><pre><code class="language-bash"># Kiểm tra permissions
ls -la /var/lib/libvirt/images/

# Fix permissions
sudo chown libvirt-qemu:kvm /var/lib/libvirt/images/*.qcow2
sudo chmod 660 /var/lib/libvirt/images/*.qcow2
</code></pre><p><strong>Lỗi: VM không có IP address</strong></p><pre><code class="language-bash"># Kiểm tra bridge
brctl show
ip addr show br0

# Trong VM, request DHCP
sudo dhclient -v
</code></pre><p><strong>Lỗi: "Permission denied" khi chạy virsh</strong></p><pre><code class="language-bash"># Thêm vào groups
sudo usermod -aG libvirt,kvm $USER

# Logout và login lại
</code></pre><p><strong>Xem logs:</strong></p><pre><code class="language-bash"># Libvirt logs
sudo journalctl -u libvirtd -f

# QEMU logs cho specific VM
sudo tail -f /var/log/libvirt/qemu/vm-test-01.log
</code></pre><h2 id="t%C3%A0i-li%E1%BB%87u-tham-kh%E1%BA%A3o">Tài liệu tham khảo</h2><ul><li><a href="/tags/kvm/">Tất cả bài viết về KVM</a></li><li><a href="/tags/cockpit/">Cockpit trên xdev.asia</a></li><li><a href="/tags/virtualization/">Virtualization trên xdev.asia</a></li><li><a href="/tags/networking/">Networking trên xdev.asia</a></li><li><a href="/tags/qemu/">QEMU Documentation</a></li><li><a href="/tags/libvirt/">Libvirt trên xdev.asia</a></li><li><a href="/tags/ubuntu/">Ubuntu Server Guides</a></li><li><a href="https://www.linux-kvm.org/page/Documents">KVM Official Documentation</a></li><li><a href="https://www.kernel.org/doc/Documentation/networking/vxlan.txt">VXLAN - Linux Kernel Documentation</a></li></ul><hr><p><em>Nếu bạn gặp vấn đề trong quá trình cài đặt, hãy để lại comment bên dưới!</em></p>
