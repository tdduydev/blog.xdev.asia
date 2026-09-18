---
id: 019c9617-fdce-72e3-9cdf-5eaadabfad1d
title: 'Install KVM on Ubuntu: Manage VMs via Cockpit Web UI'
slug: cai-dat-kvm-tren-ubuntu-quan-ly-vm-qua-cockpit-web-ui
excerpt: >-
  Instructions for installing KVM on Ubuntu and managing VM via Cockpit Web UI.
  Configure network bridge, NAT virtual network, storage pool for 2 node
  homelab.
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
locale: en
---
<p>If you're looking for a powerful, free, and directly integrated virtualization solution <a href="/en/tags/linux/">Linux</a> kernel, then <a href="/en/tags/kvm/"><strong>KVM (Kernel-based Virtual Machine)</strong></a> is the answer. <a href="/en/tags/kvm/">KVM</a> turns Linux into a Type-1 <a href="/en/tags/hypervisor/">hypervisor</a>, allowing you to run a lot <a href="/en/tags/virtual-machines/">virtual machines (VMs)</a> with almost native performance.</p><p>In this article, I will guide you through the installation <a href="/en/tags/kvm/">KVM</a> from A-Z above <strong>2 physical servers</strong> with specific configuration:</p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Hostname</th>
<th>IP Address</th>
<th>Role</th>
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
<p>This configuration is suitable for building a homelab, running a Kubernetes cluster, or a development/testing environment.</p><h2 id="t%E1%BA%A1i-sao-ch%E1%BB%8Dn-kvm">Why choose KVM?</h2><p>Before jumping into the installation, let's understand why <a href="/en/tags/kvm/">KVM</a> is a popular choice:</p><p><strong>Compare virtualization solutions:</strong></p><pre><code>┌─────────────────┬──────────────┬─────────────┬──────────────┐
│     Tiêu chí    │     KVM      │   VMware    │  VirtualBox  │
├─────────────────┼──────────────┼─────────────┼──────────────┤
│ Chi phí         │ Miễn phí     │ Có phí      │ Miễn phí     │
│ Hiệu năng       │ Xuất sắc     │ Xuất sắc    │ Tốt          │
│ Tích hợp Linux  │ Native       │ Cần driver  │ Cần driver   │
│ Production-ready│ Có           │ Có          │ Không        │
│ Cloud providers │ AWS, GCP...  │ VMware Cloud│ Không        │
│ Nested Virt     │ Tốt          │ Tốt         │ Hạn chế      │
└─────────────────┴──────────────┴─────────────┴──────────────┘
</code></pre><p><a href="/en/tags/kvm/">KVM</a> used by major cloud providers such as AWS, Google Cloud, DigitalOcean, and is the foundation for OpenStack, Proxmox VE.</p><h2 id="y%C3%AAu-c%E1%BA%A7u-h%E1%BB%87-th%E1%BB%91ng">System requirements</h2><p><strong>Configuring our 2 servers:</strong></p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/2aa8b659-cdb2-4840-b171-4a1459111f9a-1-201-a-e074b0df.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">System requirements</span></figcaption></figure><p><strong>Minimum requirements per node:</strong></p><ul><li>Hardware supported CPU <a href="/en/tags/virtualization/">Virtualization</a> (Intel VT-x or AMD-V)</li><li>RAM: 8GB+ (16GB+ recommended)</li><li><a href="/en/tags/storage/">Storage</a>: 100GB+ SSD</li><li><a href="/en/tags/ubuntu/">Ubuntu</a> Server 22.04 LTS or <a href="/en/tags/ubuntu/">24.04 LTS</a></li><li><a href="/en/tags/networking/">Network</a>: 1 NIC (can add NIC for storage network)</li></ul><h2 id="b%C6%B0%E1%BB%9Bc-1-ki%E1%BB%83m-tra-hardware-virtualization-support">Step 1: Check Hardware Virtualization Support</h2><blockquote>📚 Do the above <strong>both nodes</strong>: kvm-node01 and kvm-node02</blockquote><p>First, you need to confirm that the CPU supports hardware virtualization. This is the most important step - if the CPU doesn't support it, you can't use it <a href="/en/tags/kvm/">KVM</a>.</p><p><strong>Check CPU flags:</strong></p><pre><code class="language-bash"># Kiểm tra số lượng CPU cores hỗ trợ virtualization
egrep -c '(vmx|svm)' /proc/cpuinfo
</code></pre><p>A result that returns a number greater than 0 means the CPU supports:</p><ul><li><code>vmx</code> - Intel VT-x</li><li><code>svm</code> - AMD-V</li></ul><p><strong>Check out more details:</strong></p><pre><code class="language-bash"># Xem loại virtualization
lscpu | grep Virtualization

# Output mẫu:
# Virtualization:                     VT-x      (Intel)
# Virtualization:                     AMD-V     (AMD)
</code></pre><p><strong>Use the kvm-ok tool:</strong></p><pre><code class="language-bash"># Cài đặt cpu-checker
sudo apt update
sudo apt install -y cpu-checker

# Chạy kiểm tra
sudo kvm-ok
</code></pre><p>Desired results:</p><pre><code>INFO: /dev/kvm exists
KVM acceleration can be used
</code></pre><blockquote>⚠️ <strong>Note:</strong> If the result says "KVM acceleration can NOT be used", check BIOS/UEFI and enable the Intel VT-x or AMD-V option.</blockquote><h2 id="b%C6%B0%E1%BB%9Bc-2-c%C3%A0i-%C4%91%E1%BA%B7t-kvm-v%C3%A0-c%C3%A1c-packages">Step 2: Install KVM and Packages</h2><blockquote>📚 Do the above <strong>both nodes</strong></blockquote><p>Proceed with installation <a href="/en/tags/kvm/">KVM</a> and necessary packages:</p><pre><code class="language-bash"># Update hệ thống
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
</code></pre><p><strong>Explanation of each package:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Package</th>
<th>Function</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>qemu-kvm</code></td>
<td><a href="/en/tags/qemu/">QEMU</a> emulator with <a href="/en/tags/kvm/">KVM</a> acceleration.acceleration</td>
</tr>
<tr>
<td><code>libvirt-daemon-system</code></td>
<td><a href="/en/tags/libvirt/">Libvirt</a> daemon manages VMs</td>
</tr>
<tr>
<td><code>libvirt-clients</code></td>
<td>CLI tools like virsh</td>
</tr>
<tr>
<td><code>bridge-utils</code></td>
<td>Create and manage <a href="/en/tags/networking/">network</a> bridges. bridges</td>
</tr>
<tr>
<td><code>virtinst</code></td>
<td>Virt-install tool to create VMs</td>
</tr>
<tr>
<td><code>virt-manager</code></td>
<td>GUI for managing VMs (optional for <a href="/en/tags/server/">server. server</a>)</td>
</tr>
<tr>
<td><code>libguestfs-tools</code></td>
<td>Tools for manipulating disk images</td>
</tr>
<tr>
<td><code>libosinfo-bin</code></td>
<td>Database of OS information</td>
</tr>
<tr>
<td><code>cloud-image-utils</code></td>
<td>Tools work with cloud images</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p><strong>Verify installation:</strong></p><pre><code class="language-bash"># Kiểm tra KVM modules đã load
lsmod | grep kvm

# Output mẫu (Intel):
# kvm_intel             368640  0
# kvm                  1028096  1 kvm_intel

# Output mẫu (AMD):
# kvm_amd               139264  0
# kvm                  1028096  1 kvm_amd
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-3-c%E1%BA%A5u-h%C3%ACnh-user-v%C3%A0-services">Step 3: Configure Users and Services</h2><blockquote>📚 Do the above <strong>both nodes</strong></blockquote><p>To use <a href="/en/tags/kvm/">KVM</a> without needing sudo for every command, add the user to the necessary groups:</p><pre><code class="language-bash"># Thêm user hiện tại vào group libvirt và kvm
sudo usermod -aG libvirt $USER
sudo usermod -aG kvm $USER

# Verify groups
groups $USER
</code></pre><p><strong>Enable and start libvirtd service:</strong></p><pre><code class="language-bash"># Enable service khởi động cùng hệ thống
sudo systemctl enable libvirtd

# Start service
sudo systemctl start libvirtd

# Kiểm tra status
sudo systemctl status libvirtd
</code></pre><p>Desired output:</p><pre><code>● libvirtd.service - Virtualization daemon
     Loaded: loaded (/lib/systemd/system/libvirtd.service; enabled; ...)
     Active: active (running) since ...
</code></pre><blockquote>💡 <strong>Tip:</strong> After adding users to groups, you need to logout and login again, or run <code>newgrp libvirt</code> to apply immediately.</blockquote><p><strong>Check libvirt connection:</strong></p><pre><code class="language-bash"># Test virsh command
virsh list --all

# Nếu thành công, output sẽ là:
#  Id   Name   State
# ----------------------
# (empty - chưa có VM nào)
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-4-c%E1%BA%A5u-h%C3%ACnh-network-bridge">Step 4: Configure Network Bridge</h2><p>This is the most important step for VMs to be able to communicate with the outside network. We will configure the bridge network for both servers with static IPs.</p><p><strong>Determine the network interface name (done on both nodes):</strong></p><pre><code class="language-bash"># Liệt kê các network interfaces
ip link show

# Tìm interface chính (thường là enp0s3, eth0, eno1, ens18...)
# Ghi nhớ tên này để dùng ở bước sau
</code></pre><p><strong>Backup current config:</strong></p><pre><code class="language-bash">sudo mkdir -p /etc/netplan/backup
sudo cp /etc/netplan/*.yaml /etc/netplan/backup/
</code></pre><h3 id="c%E1%BA%A5u-h%C3%ACnh-cho-kvm-node01-192168110">Configuration for kvm-node01 (192.168.1.10)</h3><pre><code class="language-bash">sudo nano /etc/netplan/01-bridge-config.yaml
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
</code></pre><h3 id="c%E1%BA%A5u-h%C3%ACnh-cho-kvm-node02-192168111">Configuration for kvm-node02 (192.168.1.11)</h3><pre><code class="language-bash">sudo nano /etc/netplan/01-bridge-config.yaml
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
</code></pre><p><strong>Apply configuration (done on both nodes):</strong></p><pre><code class="language-bash"># Kiểm tra syntax
sudo netplan try

# Nếu OK, áp dụng
sudo netplan apply

# Verify bridge đã tạo
ip addr show br0
brctl show
</code></pre><p>Desired output:</p><pre><code>bridge name     bridge id               STP enabled     interfaces
br0             8000.xxxxxxxxxxxx       yes             enp0s3
</code></pre><blockquote>⚠️ <strong>Warning:</strong> When configuring a network bridge via SSH, you may lose connection. Use <code>netplan try</code> will automatically rollback after 120 seconds if you do not confirm.</blockquote><h3 id="quy-ho%E1%BA%A1ch-ip-cho-vms">IP planning for VMs</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Range</th>
<th>Purpose</th>
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
<td>VMs on kvm-node01</td>
</tr>
<tr>
<td>192.168.1.150 - 192.168.1.199</td>
<td>VMs on kvm-node02</td>
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
<h3 id="c%E1%BA%A5u-h%C3%ACnh-m%E1%BA%A1ng-%E1%BA%A3o-cho-vms-nat-network">Configure Virtual Network for VMs (NAT Network)</h3><p>In addition to the bridge network, we will create one more <strong>private virtual network</strong> for VMs. This network uses NAT so that VMs can access the internet through the host, but are isolated from the physical network.</p><figure class="kg-card kg-image-card"><img src="/storage/uploads/2025/12/0ca2d616-5903-4604-9679-adfc4cb4013e-1-201-a-631e8e05.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"></figure><p><strong>Create virtual network definition file:</strong></p><pre><code class="language-bash"># Tạo file XML cho mạng ảo
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
</code></pre><p><strong>Create and activate virtual network (performed on both nodes):</strong></p><pre><code class="language-bash"># Define network từ XML
sudo virsh net-define /tmp/vm-private-network.xml

# Start network
sudo virsh net-start vm-private

# Enable autostart
sudo virsh net-autostart vm-private

# Verify
sudo virsh net-list --all
</code></pre><p>Desired output:</p><pre><code> Name          State    Autostart   Persistent
------------------------------------------------
 default       active   yes         yes
 vm-private    active   yes         yes
</code></pre><p><strong>View virtual network details:</strong></p><pre><code class="language-bash"># Xem cấu hình
sudo virsh net-dumpxml vm-private

# Xem DHCP leases
sudo virsh net-dhcp-leases vm-private

# Xem bridge interface
ip addr show virbr1
</code></pre><p><strong>Virtual network planning for both nodes:</strong></p>
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
<blockquote>💡 <strong>Note:</strong> Both nodes share the same subnet 10.10.10.0/24 but share different DHCP ranges to avoid IP conflicts. VMs on 2 nodes can communicate directly with each other over a virtual network.</blockquote><p><strong>Virtual network configuration for kvm-node02 (same subnet, different DHCP range):</strong></p><pre><code class="language-bash"># Trên kvm-node02, tạo file XML với DHCP range khác
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
</code></pre><h3 id="c%C3%A0i-%C4%91%E1%BA%B7t-cockpit-%C4%91%E1%BB%83-qu%E1%BA%A3n-l%C3%BD-kvm-qua-web-ui">Install Cockpit to manage KVM via Web UI</h3><p><a href="/en/tags/cockpit/">Cockpit</a> is a web UI that helps with management <a href="/en/tags/kvm/">KVM</a> intuitive and easy. Install above <strong>both nodes</strong>:</p><pre><code class="language-bash"># Cài đặt Cockpit và module KVM
sudo apt install -y cockpit cockpit-machines

# Enable và start Cockpit
sudo systemctl enable --now cockpit.socket

# Kiểm tra status
sudo systemctl status cockpit.socket

# Mở firewall (nếu có)
sudo ufw allow 9090/tcp
</code></pre><p><strong>Visit Cockpit:</strong></p>
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
<p>Login using user <a href="/en/tags/linux/">Linux</a> yours (needs sudo permission).</p><p><strong>Cockpit interface for KVM:</strong></p><figure class="kg-card kg-image-card"><img src="/storage/uploads/2025/12/screenshot-2025-12-25-at-200341-f51721fe.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1159" sizes="(min-width: 720px) 720px"></figure><p><strong>Cockpit features for KVM:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Features</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Virtual Machines</strong></td>
<td>Create, delete, start, stop VMs intuitively</td>
</tr>
<tr>
<td><strong>Console</strong></td>
<td>VNC/Serial console right in the browser</td>
</tr>
<tr>
<td><strong>Storage Pools</strong></td>
<td>Manage disk images, upload ISO</td>
</tr>
<tr>
<td><strong>Networks</strong></td>
<td>Create/edit virtual networks (NAT, Bridge)</td>
</tr>
<tr>
<td><strong>Snapshots</strong></td>
<td>Create and restore snapshots</td>
</tr>
<tr>
<td><strong>Resource Monitor</strong></td>
<td>Monitor CPU, RAM, Disk, Network real-time</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="c%E1%BA%A5u-h%C3%ACnh-vxlan-overlay-network-m%E1%BA%A1ng-%E1%BA%A3o-chung-2-node">Configure VXLAN Overlay Network (2-node common virtual network)</h3><p>So that VMs on 2 nodes can communicate directly with each other over a common virtual network, we use <strong>VXLAN (Virtual Extensible LAN)</strong>. VXLAN creates Layer 2 tunnels across the physical network, allowing VMs on different hosts to act as the same virtual switch.</p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/ffec6be7-8e8c-4e78-b9a9-03f9addbe1e7-1-201-a-cc0d27f1.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Configure VXLAN Overlay Network (2-node common virtual network)</span></figcaption></figure><p><strong>Step 1: Create VXLAN interface on kvm-node01:</strong></p><pre><code class="language-bash"># Tạo VXLAN interface với VNI 100
sudo ip link add vxlan100 type vxlan id 100 \
    local 192.168.1.10 \
    remote 192.168.1.11 \
    dstport 4789 \
    dev br0

# Bật interface
sudo ip link set vxlan100 up
</code></pre><p><strong>Step 2: Create VXLAN interface on kvm-node02:</strong></p><pre><code class="language-bash"># Tạo VXLAN interface với VNI 100
sudo ip link add vxlan100 type vxlan id 100 \
    local 192.168.1.11 \
    remote 192.168.1.10 \
    dstport 4789 \
    dev br0

# Bật interface
sudo ip link set vxlan100 up
</code></pre><p><strong>Step 3: Create bridge for VXLAN (performed on both nodes):</strong></p><pre><code class="language-bash"># Tạo bridge mới cho VXLAN
sudo ip link add vxlan-br0 type bridge
sudo ip link set vxlan-br0 up

# Gắn VXLAN interface vào bridge
sudo ip link set vxlan100 master vxlan-br0

# Verify
bridge link show
</code></pre><p><strong>Step 4: Configure persistent with Netplan:</strong></p><p>Create files <code>/etc/netplan/02-vxlan.yaml</code> above <strong>kvm-node01</strong>:</p><pre><code class="language-yaml">network:
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
</code></pre><p>Create files <code>/etc/netplan/02-vxlan.yaml</code> above <strong>kvm-node02</strong>:</p><pre><code class="language-yaml">network:
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
</code></pre><p><strong>Apply configuration:</strong></p><pre><code class="language-bash">sudo netplan apply

# Verify VXLAN
ip -d link show vxlan100
bridge link show
</code></pre><p><strong>Step 5: Define VXLAN network for libvirt (both nodes):</strong></p><pre><code class="language-bash">sudo tee /tmp/vxlan-network.xml &lt;&lt; EOF
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
</code></pre><p><strong>Step 6: Create VM using VXLAN network:</strong></p><pre><code class="language-bash"># Tạo VM với VXLAN network
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
</code></pre><blockquote>⚠️ <strong>Note MTU:</strong> VMs using VXLAN need to set MTU = 1450 (due to VXLAN header ~50 bytes). Configuration in VM:</blockquote><p><strong>Test VXLAN connection:</strong></p><pre><code class="language-bash"># Trên VM1 (kvm-node01) - IP: 10.10.10.101
ping 10.10.10.103  # Ping đến VM3 trên kvm-node02

# Kiểm tra VXLAN statistics
ip -s link show vxlan100
</code></pre><p><strong>Compare virtual network types:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Type</th>
<th>Use Case</th>
<th>VMs communicate cross-node</th>
<th>Isolation</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>NAT (vm-private)</strong></td>
<td>Simple Dev/Test</td>
<td>❌ No</td>
<td>✅ Yes</td>
</tr>
<tr>
<td><strong>Bridge (br0)</strong></td>
<td>Production, LAN access</td>
<td>✅ Via LAN</td>
<td>❌ No</td>
</tr>
<tr>
<td><strong>VXLAN Overlay</strong></td>
<td>Multi-node clusters</td>
<td>✅ Direct L2</td>
<td>✅ Yes</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h2 id="b%C6%B0%E1%BB%9Bc-5-c%E1%BA%A5u-h%C3%ACnh-storage-pool">Step 5: Configure Storage Pool</h2><blockquote>📚 Do the above <strong>both nodes</strong></blockquote><p>Storage pool is where disk images of VMs are stored.</p><p><strong>Create storage folder:</strong></p><pre><code class="language-bash"># Sử dụng thư mục mặc định
sudo mkdir -p /var/lib/libvirt/images

# Set permissions
sudo chown -R libvirt-qemu:kvm /var/lib/libvirt/images
sudo chmod -R 775 /var/lib/libvirt/images
</code></pre><p><strong>Storage pool definition:</strong></p><pre><code class="language-bash"># Tạo pool mới
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
</code></pre><p>Desired output:</p><pre><code> Name      State    Autostart
-------------------------------
 default   active   yes
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-6-c%E1%BA%A5u-h%C3%ACnh-hostname-v%C3%A0-etchosts">Step 6: Configure Hostname and /etc/hosts</h2><p>In order for two nodes to be able to communicate with each other by hostname, configuration is needed <a href="/en/tags/linux/">SSH</a> and hostname:</p><p><strong>On kvm-node01:</strong></p><pre><code class="language-bash"># Set hostname
sudo hostnamectl set-hostname kvm-node01

# Cập nhật /etc/hosts
sudo nano /etc/hosts
</code></pre><pre><code>127.0.0.1       localhost
192.168.1.10       kvm-node01
192.168.1.11       kvm-node02
</code></pre><p><strong>On kvm-node02:</strong></p><pre><code class="language-bash"># Set hostname
sudo hostnamectl set-hostname kvm-node02

# Cập nhật /etc/hosts
sudo nano /etc/hosts
</code></pre><pre><code>127.0.0.1       localhost
192.168.1.10       kvm-node01
192.168.1.11       kvm-node02
</code></pre><p><strong>Test connection between 2 nodes:</strong></p><pre><code class="language-bash"># Từ kvm-node01
ping -c 3 kvm-node02

# Từ kvm-node02
ping -c 3 kvm-node01
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-7-t%E1%BA%A1o-virtual-machine-%C4%91%E1%BA%A7u-ti%C3%AAn">Step 7: Create the first Virtual Machine</h2><p>After installation <a href="/en/tags/kvm/">KVM</a> done, we will create the first VM to use <strong>vm-private virtual network</strong>.</p><h3 id="ph%C6%B0%C6%A1ng-ph%C3%A1p-1-s%E1%BB%AD-d%E1%BB%A5ng-cloud-image-nhanh">Method 1: Use Cloud Image (Fast)</h3><p>Cloud images are disk images with pre-installed OS, just need to configure and boot:</p><p><strong>On kvm-node01:</strong></p><pre><code class="language-bash"># Download Ubuntu Cloud Image
cd /var/lib/libvirt/images
sudo wget https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img

# Tạo disk image cho VM
sudo qemu-img create -f qcow2 \
    -F qcow2 \
    -b jammy-server-cloudimg-amd64.img \
    vm-test-01.qcow2 20G
</code></pre><p><strong>Create cloud-init configuration:</strong></p><pre><code class="language-bash"># Tạo thư mục cho cloud-init
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
</code></pre><p><strong>Create VM with vm-private virtual network:</strong></p><pre><code class="language-bash">sudo virt-install \
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
</code></pre><blockquote>💡 <strong>Note:</strong> Use <code>--network network=vm-private</code> instead <code>--network bridge=br0</code> for the VM to connect to the virtual network.</blockquote><p><strong>Check VM:</strong></p><pre><code class="language-bash"># List VMs
virsh list --all

# Xem IP của VM (VM sẽ nhận IP từ DHCP 10.10.10.x)
virsh domifaddr vm-test-01

# Hoặc xem từ DHCP leases
sudo virsh net-dhcp-leases vm-private

# Console vào VM
virsh console vm-test-01
# Login: ubuntu / ubuntu123
# Thoát console: Ctrl + ]
</code></pre><p><strong>Check network in VM:</strong></p><pre><code class="language-bash"># Sau khi login vào VM
ip addr show

# Output mẫu:
# eth0: 10.10.10.101/24  (mạng ảo)

# Test internet (qua NAT)
ping -c 3 google.com

# Test ping đến host
ping -c 3 10.10.10.1
</code></pre><h3 id="t%E1%BA%A1o-vm-v%E1%BB%9Bi-2-network-interfaces">Create VM with 2 Network Interfaces</h3><p>If you need the VM to connect to both a virtual network (internal) and a bridge connection (external):</p><pre><code class="language-bash">sudo virt-install \
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
</code></pre><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/1538512f-1ce9-4249-a7b8-a5fb644b295e-1-201-a-13b9a535.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1116" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Create VM with 2 Network Interfaces</span></figcaption></figure><h3 id="ph%C6%B0%C6%A1ng-ph%C3%A1p-2-c%C3%A0i-%C4%91%E1%BA%B7t-t%E1%BB%AB-iso">Method 2: Install from ISO</h3><pre><code class="language-bash"># Download Ubuntu Server ISO (nếu chưa có)
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
</code></pre><p><strong>Connect VNC to install:</strong></p><pre><code class="language-bash"># Xem VNC port
sudo virsh vncdisplay vm-ubuntu-01
# Output: :1 (nghĩa là port 5901)

# Kết nối từ máy khác bằng VNC client
# Address: 192.168.1.10:5901
</code></pre><h3 id="so-s%C3%A1nh-c%C3%A1c-lo%E1%BA%A1i-network">Compare Network types</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Network Type</th>
<th>Use Case</th>
<th>VM IP</th>
<th>External access</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>vm-private (NAT)</strong></td>
<td>Development, Testing</td>
<td>10.10.10.x</td>
<td>Need port forwarding</td>
</tr>
<tr>
<td><strong>br0 (Bridge)</strong></td>
<td>Production, Services</td>
<td>192.168.1.x</td>
<td>Directly</td>
</tr>
<tr>
<td><strong>Dual NICs</strong></td>
<td>DMZ, Multi-tier apps</td>
<td>Both</td>
<td>Options</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h2 id="b%C6%B0%E1%BB%9Bc-8-qu%E1%BA%A3n-l%C3%BD-virtual-machines-v%E1%BB%9Bi-virsh">Step 8: Manage Virtual Machines with virsh</h2><p>After creating the above VM <a href="/en/tags/kvm/">KVM</a>, you will manage them with <code>virsh</code> command.</p><h3 id="qu%E1%BA%A3n-l%C3%BD-virtual-networks">Managing Virtual Networks</h3><pre><code class="language-bash"># Liệt kê tất cả networks
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
</code></pre><h3 id="c%C3%A1c-l%E1%BB%87nh-c%C6%A1-b%E1%BA%A3n">Basic commands</h3><p><strong>Lifecycle management:</strong></p><pre><code class="language-bash"># Liệt kê tất cả VMs
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
</code></pre><p><strong>VM information:</strong></p><pre><code class="language-bash"># Thông tin tổng quan
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
</code></pre><h3 id="x%C3%B3a-vm">Delete VMs</h3><pre><code class="language-bash"># Shutdown VM
virsh shutdown vm-test-01

# Xóa VM definition và storage
virsh undefine vm-test-01 --remove-all-storage
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-9-c%E1%BA%A5u-h%C3%ACnh-nested-virtualization-optional">Step 9: Configure Nested Virtualization (Optional)</h2><p>Nested <a href="/en/tags/virtualization/">virtualization</a> allows running VMs inside VMs - useful when you want to test <a href="/en/tags/kubernetes/">Kubernetes</a> or <a href="/en/tags/docker/">Docker</a> in VM.</p><p><strong>For Intel CPUs:</strong></p><pre><code class="language-bash"># Tạo file config
echo "options kvm_intel nested=1" | sudo tee /etc/modprobe.d/kvm-intel.conf

# Reload module
sudo modprobe -r kvm_intel
sudo modprobe kvm_intel

# Verify
cat /sys/module/kvm_intel/parameters/nested
# Output: Y hoặc 1
</code></pre><p><strong>For AMD CPUs:</strong></p><pre><code class="language-bash"># Tạo file config
echo "options kvm_amd nested=1" | sudo tee /etc/modprobe.d/kvm-amd.conf

# Reload module
sudo modprobe -r kvm_amd
sudo modprobe kvm_amd

# Verify
cat /sys/module/kvm_amd/parameters/nested
</code></pre><h2 id="b%C6%B0%E1%BB%9Bc-10-troubleshooting">Step 10: Troubleshooting</h2><h3 id="l%E1%BB%97i-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p">Common errors</h3><p><strong>Error: "Cannot access storage file"</strong></p><pre><code class="language-bash"># Kiểm tra permissions
ls -la /var/lib/libvirt/images/

# Fix permissions
sudo chown libvirt-qemu:kvm /var/lib/libvirt/images/*.qcow2
sudo chmod 660 /var/lib/libvirt/images/*.qcow2
</code></pre><p><strong>Error: VM does not have an IP address</strong></p><pre><code class="language-bash"># Kiểm tra bridge
brctl show
ip addr show br0

# Trong VM, request DHCP
sudo dhclient -v
</code></pre><p><strong>Error: "Permission denied" when running virsh</strong></p><pre><code class="language-bash"># Thêm vào groups
sudo usermod -aG libvirt,kvm $USER

# Logout và login lại
</code></pre><p><strong>View logs:</strong></p><pre><code class="language-bash"># Libvirt logs
sudo journalctl -u libvirtd -f

# QEMU logs cho specific VM
sudo tail -f /var/log/libvirt/qemu/vm-test-01.log
</code></pre><h2 id="t%C3%A0i-li%E1%BB%87u-tham-kh%E1%BA%A3o">References</h2><ul><li><a href="/en/tags/kvm/">All articles about KVM</a></li><li><a href="/en/tags/cockpit/">Cockpit on xdev.asia</a></li><li><a href="/en/tags/virtualization/">Virtualization on xdev.asia</a></li><li><a href="/en/tags/networking/">Networking on xdev.asia</a></li><li><a href="/en/tags/qemu/">QEMU Documentation</a></li><li><a href="/en/tags/libvirt/">Libvirt on xdev.asia</a></li><li><a href="/en/tags/ubuntu/">Ubuntu Server Guides</a></li><li><a href="https://www.linux-kvm.org/page/Documents">KVM Official Documentation</a></li><li><a href="https://www.kernel.org/doc/Documentation/networking/vxlan.txt">VXLAN - Linux Kernel Documentation</a></li></ul><hr><p><em>If you encounter problems during the installation process, please leave a comment below!</em></p>
