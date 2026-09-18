---
id: 019d65ef-d36f-773e-bf0a-9e30df834552
title: '第2課：介面與基本 IP 設定'
slug: bai-2-cau-hinh-interface-va-ip-co-ban
description: >-
  在 VyOS 上設定 Ethernet 介面、靜態 IP、DHCP 客戶端、使用者管理、主機名稱、時區、NTP、DNS 及備份/還原設定的指南。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 2
section_title: "VyOS 從入門到進階"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS 從入門到進階
  slug: vyos-tu-co-ban-den-nang-cao
---

<img src="/storage/uploads/2026/04/vyos-02-interface-ip.webp" alt="介面設定 và IP cơ bản" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>Cấu hình Ethernet Interfaces</h2>

<p>Trong VyOS, mỗi interface vật lý hoặc ảo được quản lý qua configuration tree tại node <code>interfaces</code>. Ethernet interface thường có tên <code>eth0</code>, <code>eth1</code>,... tương ứng với thứ tự NIC được kernel detect.</p>

<h3>Gán IP tĩnh cho interface</h3>

<pre><code class="language-bash">configure

# Gán IP cho eth0 (WAN)
set interfaces ethernet eth0 address 203.0.113.10/24
set interfaces ethernet eth0 description 'WAN - Internet'

# Gán IP cho eth1 (LAN)
set interfaces ethernet eth1 address 192.168.1.1/24
set interfaces ethernet eth1 description 'LAN - Internal'

# Xem thay đổi trước khi commit
compare

save</code></pre>

<p>Một interface có thể có <strong>nhiều địa chỉ IP</strong> (secondary addresses):</p>

<pre><code class="language-bash">set interfaces ethernet eth1 address 192.168.1.1/24
set interfaces ethernet eth1 address 10.0.0.1/24</code></pre>

<h3>Cấu hình DHCP Client</h3>

<p>Khi interface WAN nhận IP từ ISP qua DHCP:</p>

<pre><code class="language-bash">set interfaces ethernet eth0 address dhcp

# Xem IP được cấp
show interfaces ethernet eth0</code></pre>

<img src="/storage/uploads/2026/04/vyos-02-interface-ip.webp" alt="介面設定 và IP cơ bản" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<pre><code class="language-bash"># Disable interface
set interfaces ethernet eth2 disable

# Enable lại (xóa disable flag)
delete interfaces ethernet eth2 disable

commit</code></pre>

<h3>Xem trạng thái interfaces</h3>

<pre><code class="language-bash"># Operational mode
show interfaces

# Output mẫu:
# Codes: S - State, L - Link, u - Up, D - Down
# Interface    IP Address       S/L  Description
# ---------    ----------       ---  -----------
# eth0         203.0.113.10/24  u/u  WAN - Internet
# eth1         192.168.1.1/24   u/u  LAN - Internal
# lo           127.0.0.1/8      u/u

# Xem chi tiết một interface
show interfaces ethernet eth0 brief</code></pre>

<h2>使用者管理 và Authentication</h2>

<h3>Tạo user mới</h3>

<pre><code class="language-bash">configure

# Tạo user admin với plaintext password (VyOS sẽ tự hash)
set system login user admin authentication plaintext-password 'MyStr0ngP@ss!'
set system login user admin level admin

# Hoặc dùng encrypted password (đã hash sẵn)
# Tạo hash: openssl passwd -6 'MyStr0ngP@ss!'
set system login user admin authentication encrypted-password '$6$rounds=...'

commit
save</code></pre>

<blockquote>
  <p><strong>Bảo mật</strong>: Sau khi commit, VyOS tự động chuyển plaintext-password thành encrypted-password trong config. Plaintext password không được lưu trữ.</p>
</blockquote>

<h3>Cấu hình SSH Key Authentication</h3>

<pre><code class="language-bash"># Thêm SSH public key cho user admin
set system login user admin authentication public-keys mykey@workstation type ssh-rsa
set system login user admin authentication public-keys mykey@workstation key 'AAAAB3NzaC1yc2EAAAA...'

commit
save</code></pre>

<h3>Xóa user</h3>

<pre><code class="language-bash">delete system login user old-admin
commit
save</code></pre>

<h2>Cấu hình System cơ bản</h2>

<h3>Hostname</h3>

<pre><code class="language-bash">configure
set system host-name vyos-gw01
set system domain-name lab.local
commit
save</code></pre>

<h3>Timezone</h3>

<pre><code class="language-bash"># Xem danh sách timezone
# Nhấn Tab sau 'set system time-zone'
set system time-zone Asia/Ho_Chi_Minh
commit
save</code></pre>

<h3>NTP — Đồng bộ thời gian</h3>

<pre><code class="language-bash"># Cấu hình NTP servers
set service ntp server pool.ntp.org
set service ntp server time.google.com

# Hoặc cấu hình chi tiết
set service ntp server 0.pool.ntp.org prefer
set service ntp server 1.pool.ntp.org

# Xem trạng thái NTP
show ntp

commit
save</code></pre>

<h3>System DNS (Name Server)</h3>

<p>Cấu hình DNS servers mà VyOS sẽ sử dụng để resolve tên miền:</p>

<pre><code class="language-bash"># DNS cho chính router
set system name-server 8.8.8.8
set system name-server 1.1.1.1

commit
save

# Kiểm tra
ping google.com</code></pre>

<h2>Bật SSH Service</h2>

<pre><code class="language-bash">configure

# Bật SSH trên port mặc định 22
set service ssh port 22

# Hoặc đổi port cho bảo mật
set service ssh port 2222

# Disable password login (chỉ cho key-based)
set service ssh disable-password-authentication

# Giới hạn SSH chỉ listen trên LAN interface
set service ssh listen-address 192.168.1.1

commit
save</code></pre>

<h2>Default Gateway và Static Routes</h2>

<pre><code class="language-bash">configure

# Đặt default gateway (cho WAN IP tĩnh)
set protocols static route 0.0.0.0/0 next-hop 203.0.113.1

# Thêm static route cho mạng khác
set protocols static route 10.10.0.0/16 next-hop 192.168.1.254

# Xem routing table
show ip route

commit
save</code></pre>

<h2>備份與還原 Config</h2>

<h3>Save / Load config</h3>

<pre><code class="language-bash"># Save config hiện tại (mặc định lưu vào /config/config.boot)
save

# Save ra file cụ thể
save /config/backup-2026-04-07.config

# Load config từ file
load /config/backup-2026-04-07.config
# Xem thay đổi
compare
# Nếu OK thì commit
commit
save</code></pre>

<h3>Save config ra remote server</h3>

<pre><code class="language-bash"># Save qua SCP
save scp://user@backup-server/path/to/vyos-backup.config

# Save qua TFTP
save tftp://tftp-server/vyos-backup.config

# Save qua FTP
save ftp://user:password@ftp-server/vyos-backup.config</code></pre>

<h3>Rollback config</h3>

<p>VyOS lưu lịch sử các lần commit. Bạn có thể rollback:</p>

<pre><code class="language-bash"># Xem lịch sử commit
show system commit

# Rollback về revision trước
rollback 1
compare
commit
save</code></pre>

<h2>實作練習: Setup Router 2 Interfaces WAN + LAN</h2>

<p>Topology:</p>

<pre><code class="language-bash">Internet --- [eth0 WAN: DHCP] VyOS Router [eth1 LAN: 192.168.100.1/24] --- LAN Clients</code></pre>

<h3>Bước 1: Cấu hình interfaces</h3>

<pre><code class="language-bash">configure

# WAN - nhận IP từ ISP
set interfaces ethernet eth0 description 'WAN'
set interfaces ethernet eth0 address dhcp

# LAN - IP tĩnh
set interfaces ethernet eth1 description 'LAN'
set interfaces ethernet eth1 address 192.168.100.1/24

commit</code></pre>

<h3>Bước 2: Cấu hình system</h3>

<pre><code class="language-bash"># Hostname
set system host-name vyos-home

# DNS
set system name-server 8.8.8.8
set system name-server 1.1.1.1

# Timezone
set system time-zone Asia/Ho_Chi_Minh

# NTP
set service ntp server pool.ntp.org

# SSH
set service ssh port 22

commit</code></pre>

<h3>Bước 3: Tạo user admin riêng</h3>

<pre><code class="language-bash"># Tạo admin user
set system login user admin authentication plaintext-password 'SecureP@ss2026!'
set system login user admin level admin

# Xóa default password của user vyos (đổi password)
set system login user vyos authentication plaintext-password 'NewVyOSP@ss!'

commit
save</code></pre>

<h3>Bước 4: Kiểm tra</h3>

<pre><code class="language-bash">exit

# Kiểm tra interfaces
show interfaces

# Kiểm tra DNS resolution
ping google.com

# Kiểm tra NTP
show ntp

# Kiểm tra config đã save
show configuration</code></pre>

<h2>總結</h2>

<p>Trong bài này, bạn đã học được:</p>

<ul>
  <li>Cách cấu hình ethernet interfaces: IP tĩnh, DHCP client, multiple addresses</li>
  <li>Quản lý users: tạo, xóa, đặt password, thêm SSH keys</li>
  <li>Thiết lập system basics: hostname, timezone, NTP, DNS</li>
  <li>Bật và bảo mật SSH service</li>
  <li>Cấu hình default gateway và static routes</li>
  <li>Backup, restore và rollback configuration</li>
  <li>實作練習: Setup router 2 interfaces WAN + LAN hoàn chỉnh</li>
</ul>

<p>Bài tiếp theo sẽ hướng dẫn cấu hình NAT — cho phép LAN clients truy cập Internet qua VyOS router.</p>
