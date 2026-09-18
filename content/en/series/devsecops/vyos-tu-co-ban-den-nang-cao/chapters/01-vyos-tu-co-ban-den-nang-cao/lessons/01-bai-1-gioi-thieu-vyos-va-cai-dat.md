---
id: 019d65ef-d36f-773e-bf0a-9e2fc23d52ba
title: 'Lesson 1: Introduction to VyOS and Installation'
slug: bai-1-gioi-thieu-vyos-va-cai-dat
description: >-
  Learn what VyOS is, its history from Vyatta, comparison with pfSense/OPNsense/MikroTik, system architecture, and installation guide on KVM, VirtualBox, Proxmox, and bare-metal.
duration_minutes: 150
is_free: true
video_url: null
sort_order: 1
section_title: "VyOS from Basics to Advanced"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS from Basics to Advanced
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-01-intro-install.webp" alt="Giới thiệu VyOS và Cài đặt" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>What is VyOS?</h2>

<p>VyOS là một <strong>hệ điều hành mạng mã nguồn mở</strong> (network operating system) dựa trên nền tảng Debian Linux. VyOS cung cấp đầy đủ tính năng routing, firewall, VPN và các dịch vụ mạng enterprise — tất cả được quản lý qua một CLI thống nhất tương tự như Juniper JunOS hoặc Cisco IOS.</p>

<p>Điểm đặc biệt của VyOS: bạn có thể triển khai nó như một <strong>software router</strong> trên máy ảo, cloud instance, container hoặc phần cứng vật lý — hoàn toàn miễn phí với bản rolling release.</p>

<h2>Development History: Từ Vyatta đến VyOS</h2>

<p>Để hiểu VyOS, cần biết về Vyatta — dự án tiền thân:</p>

<ul>
  <li><strong>2005</strong>: Vyatta Inc. ra mắt Vyatta Core — hệ điều hành router mã nguồn mở đầu tiên</li>
  <li><strong>2012</strong>: Brocade Communications mua lại Vyatta, dần đóng mã nguồn</li>
  <li><strong>2013</strong>: Cộng đồng fork Vyatta Core thành <strong>VyOS</strong>, tiếp tục phát triển mã nguồn mở</li>
  <li><strong>2020+</strong>: VyOS chuyển sang mô hình rolling release (miễn phí) + LTS release (thương mại)</li>
  <li><strong>2024–2025</strong>: VyOS 1.4 Sagitta (LTS), 1.5 Circinus (rolling) với nftables backend mới</li>
</ul>

<h2>So sánh VyOS với các giải pháp khác</h2>

<h3>VyOS vs pfSense / OPNsense</h3>

<p>pfSense và OPNsense là các firewall/router dựa trên FreeBSD với giao diện web. VyOS khác biệt ở chỗ:</p>

<ul>
  <li><strong>CLI-first</strong>: VyOS được thiết kế cho quản trị qua dòng lệnh, hỗ trợ automation tốt hơn</li>
  <li><strong>Routing nâng cao</strong>: VyOS tích hợp FRRouting — hỗ trợ BGP, OSPF, IS-IS, MPLS đầy đủ</li>
  <li><strong>Linux-based</strong>: Dễ tích hợp với hệ sinh thái DevOps (Ansible, Terraform, containers)</li>
  <li><strong>Scalability</strong>: Phù hợp cho cả homelab lẫn datacenter với hàng nghìn routes</li>
</ul>

<h3>VyOS vs MikroTik RouterOS</h3>

<ul>
  <li>MikroTik: phần cứng chuyên dụng + phần mềm đóng, giá rẻ nhưng closed-source</li>
  <li>VyOS: chạy trên bất kỳ phần cứng/cloud nào, mã nguồn mở, cộng đồng lớn</li>
  <li>VyOS: CLI gần với Juniper JunOS — dễ chuyển đổi cho network engineers</li>
</ul>

<h2>Kiến trúc VyOS</h2>

<p>VyOS được xây dựng từ nhiều thành phần mã nguồn mở:</p>

<pre><code class="language-bash">+--------------------------------------------------+
|                   VyOS CLI                       |
|          (configd / configuration tree)           |
+--------------------------------------------------+
|   FRRouting     |   nftables    |   StrongSwan   |
|  (BGP, OSPF,   |  (firewall,   |   (IPsec VPN)  |
|   IS-IS, RIP)  |   NAT, QoS)   |                |
+--------------------------------------------------+
|              Debian Linux Kernel                  |
|           (custom build, hardened)                |
+--------------------------------------------------+
|         Hardware / VM / Cloud Instance            |
+--------------------------------------------------+</code></pre>

<p>Các thành phần chính:</p>

<ul>
  <li><strong>Debian Linux</strong>: Nền tảng OS ổn định, bảo mật</li>
  <li><strong>FRRouting (FRR)</strong>: Bộ routing protocols đầy đủ nhất trên Linux</li>
  <li><strong>nftables</strong>: Thay thế iptables, xử lý firewall và NAT hiệu suất cao</li>
  <li><strong>StrongSwan / WireGuard</strong>: IPsec và modern VPN</li>
  <li><strong>configd</strong>: Configuration daemon — quản lý cây cấu hình (configuration tree)</li>
</ul>

<h2>Install Image vs Live Boot</h2>

<p>VyOS có hai chế độ hoạt động:</p>

<ul>
  <li><strong>Live boot</strong>: Boot trực tiếp từ ISO, cấu hình chỉ tồn tại trong RAM. Mất khi reboot.</li>
  <li><strong>Install image</strong>: Cài đặt lên disk, cấu hình được lưu vĩnh viễn. Đây là chế độ production.</li>
</ul>

<blockquote>
  <p><strong>Lưu ý</strong>: Luôn dùng <code>install image</code> cho môi trường production. Live boot chỉ phù hợp để test nhanh.</p>
</blockquote>

<h2>Installing VyOS</h2>

<h3>Tải VyOS ISO</h3>

<p>VyOS rolling release (miễn phí) có thể tải từ: <strong>https://vyos.net/get/</strong>. Hoặc bạn có thể tự build ISO từ source code.</p>

<h3>Cài đặt trên KVM/libvirt</h3>

<pre><code class="language-bash"># Tạo VM với virt-install
virt-install \
  --name vyos-router \
  --ram 1024 \
  --vcpus 2 \
  --disk path=/var/lib/libvirt/images/vyos.qcow2,size=8 \
  --cdrom /path/to/vyos-rolling-latest.iso \
  --network bridge=br0 \
  --network bridge=br1 \
  --os-variant debian11 \
  --graphics vnc</code></pre>

<h3>Cài đặt trên VirtualBox</h3>

<p>Các bước cơ bản cho VirtualBox:</p>

<ul>
  <li>Tạo VM loại <strong>Linux / Debian 64-bit</strong>, RAM 1GB, disk 8GB</li>
  <li>Thêm 2 network adapters: Adapter 1 = NAT hoặc Bridged (WAN), Adapter 2 = Internal Network (LAN)</li>
  <li>Mount ISO và boot</li>
</ul>

<h3>Cài đặt trên Proxmox</h3>

<pre><code class="language-bash"># Upload ISO lên Proxmox storage
# Tạo VM:
# - OS Type: Linux, Version: 6.x - 2.6 Kernel
# - CPU: 2 cores, RAM: 1024MB
# - Disk: 8GB (VirtIO)
# - Network: 2x VirtIO NICs (vmbr0 cho WAN, vmbr1 cho LAN)
# Boot từ ISO</code></pre>

<h3>Cài đặt trên bare-metal</h3>

<p>VyOS hỗ trợ hầu hết phần cứng x86_64 với NIC Intel/Broadcom. Burn ISO ra USB bằng <code>dd</code> hoặc Balena Etcher, boot và cài đặt bình thường.</p>

<h3>Quá trình Install Image</h3>

<p>Sau khi boot từ ISO, login với user <code>vyos</code> / password <code>vyos</code>, rồi chạy:</p>

<pre><code class="language-bash">vyos@vyos:~$ install image
Welcome to VyOS installation!
# Chọn disk để cài đặt
Would you like to continue? (y/N): y
Partition (Auto/Parted/Skip) [Auto]: Auto
Install the image on? [sda]: sda
How big of a root partition should I create? (GB) [8]: 8
What would you like to name this image? [1.5-rolling-...]: Enter
Which one should I copy to sda? [/config/config.boot]: Enter
Enter password for user 'vyos': ********
# Đợi cài đặt hoàn tất
reboot</code></pre>

<h2>CLI cơ bản của VyOS</h2>

<p>VyOS có hai chế độ CLI:</p>

<ul>
  <li><strong>Operational mode</strong>: Xem trạng thái, chạy lệnh show, ping, traceroute (prompt: <code>$</code>)</li>
  <li><strong>Configuration mode</strong>: Thay đổi cấu hình (prompt: <code>#</code>)</li>
</ul>

<h3>Các lệnh quan trọng nhất</h3>

<pre><code class="language-bash"># Vào configuration mode
vyos@vyos:~$ configure

# Xem cấu hình hiện tại
vyos@vyos# show

# Thêm cấu hình
vyos@vyos# set interfaces ethernet eth0 address 192.168.1.1/24

# So sánh thay đổi chưa commit
vyos@vyos# compare

# Áp dụng cấu hình (chưa lưu vĩnh viễn)
vyos@vyos# commit

# Lưu cấu hình vĩnh viễn (survive reboot)
vyos@vyos# save

# Hủy thay đổi chưa commit
vyos@vyos# discard

# Xóa một cấu hình
vyos@vyos# delete interfaces ethernet eth0 address 192.168.1.1/24

# Thoát configuration mode
vyos@vyos# exit</code></pre>

<h3>Configuration Tree</h3>

<p>Toàn bộ cấu hình VyOS được tổ chức dạng <strong>cây phân cấp</strong> (hierarchical tree). Mỗi node trong cây đại diện cho một tính năng:</p>

<pre><code class="language-bash">vyos@vyos# show
interfaces {
    ethernet eth0 {
        address 192.168.1.1/24
        description "LAN"
    }
    ethernet eth1 {
        address dhcp
        description "WAN"
    }
}
system {
    host-name vyos-router
    login {
        user vyos {
            authentication {
                encrypted-password "..."
            }
        }
    }
}
service {
    ssh {
        port 22
    }
}</code></pre>

<p>Bạn có thể <strong>navigate</strong> vào từng nhánh để xem chi tiết:</p>

<pre><code class="language-bash"># Xem chỉ phần interfaces
vyos@vyos# show interfaces

# Xem chỉ interface eth0
vyos@vyos# show interfaces ethernet eth0</code></pre>

<h2>Tab Completion và Help</h2>

<p>CLI của VyOS hỗ trợ <strong>tab completion</strong> cực kỳ mạnh — giúp bạn không cần nhớ hết tất cả commands:</p>

<pre><code class="language-bash"># Nhấn Tab để xem các tùy chọn
vyos@vyos# set interfaces [Tab]
Possible completions:
  bonding       Bonding interface
  bridge        Bridge interface
  dummy         Dummy interface
  ethernet      Ethernet interface
  loopback      Loopback interface
  openvpn       OpenVPN interface
  tunnel        Tunnel interface
  vxlan         VXLAN interface
  wireguard     WireGuard interface
  wireless      Wireless interface

# Dùng ? để xem help
vyos@vyos# set interfaces ethernet eth0 ?</code></pre>

<h2>Hands-on Lab: Installing VyOS trên VirtualBox</h2>

<p>Thực hiện các bước sau để có một VyOS router hoạt động:</p>

<h3>Bước 1: Tạo VM</h3>
<ul>
  <li>Mở VirtualBox, tạo VM mới: Name = <code>vyos-lab</code>, Type = Linux, Version = Debian 64-bit</li>
  <li>RAM: 1024 MB, Disk: 8 GB (VDI, dynamically allocated)</li>
  <li>Adapter 1: NAT (sẽ là WAN), Adapter 2: Internal Network tên <code>lab-lan</code></li>
</ul>

<h3>Bước 2: Boot và Install</h3>
<pre><code class="language-bash"># Boot từ ISO, login: vyos / vyos
vyos@vyos:~$ install image
# Chọn tất cả mặc định, đặt password mới
# Sau khi xong: reboot
# Tháo ISO khỏi VM</code></pre>

<h3>Bước 3: Cấu hình cơ bản</h3>
<pre><code class="language-bash"># Login lại sau reboot
vyos@vyos:~$ configure

# Đặt hostname

set system host-name vyos-lab

# Cấu hình WAN (DHCP từ NAT)

set interfaces ethernet eth0 description 'WAN'
set interfaces ethernet eth0 address dhcp

# Cấu hình LAN

set interfaces ethernet eth1 description 'LAN'
set interfaces ethernet eth1 address 192.168.100.1/24

# Bật SSH

set service ssh port 22

# Commit và save

commit
save</code></pre>

<h3>Bước 4: Kiểm tra</h3>
<pre><code class="language-bash"># Thoát configure mode
exit

# Kiểm tra interfaces

show interfaces

# Kiểm tra kết nối WAN

ping 8.8.8.8

# Xem routing table

show ip route</code></pre>

<h2>Summary</h2>

<p>Trong bài học này, bạn đã nắm được:</p>

<ul>
  <li>VyOS là hệ điều hành mạng mã nguồn mở, phát triển từ Vyatta, chạy trên Debian Linux</li>
  <li>Kiến trúc VyOS gồm FRRouting (routing), nftables (firewall/NAT), StrongSwan (VPN)</li>
  <li>Sự khác biệt giữa VyOS với pfSense, OPNsense và MikroTik</li>
  <li>Cách cài đặt VyOS trên các nền tảng ảo hóa (KVM, VirtualBox, Proxmox) và bare-metal</li>
  <li>CLI cơ bản: <code>configure</code>, <code>set</code>, <code>commit</code>, <code>save</code>, <code>compare</code>, <code>show</code></li>
  <li>Khái niệm configuration tree — nền tảng để hiểu toàn bộ hệ thống VyOS</li>
</ul>

<p>Bài tiếp theo sẽ đi sâu vào cấu hình interfaces, IP addressing và các thiết lập hệ thống cơ bản.</p>
