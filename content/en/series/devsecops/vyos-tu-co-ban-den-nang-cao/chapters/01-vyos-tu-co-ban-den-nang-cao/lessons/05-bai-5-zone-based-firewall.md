---
id: 019d65ef-d36f-773e-bf0a-9e3347cefe91
title: 'Lesson 5: Zone-based Firewall'
slug: bai-5-zone-based-firewall
description: >-
  Learn about zone-based firewall on VyOS: designing LAN/WAN/DMZ/GUEST zones, inter-zone rules, comparison with interface-based firewall, and a 3-zone hands-on lab.
duration_minutes: 160
is_free: true
video_url: null
sort_order: 5
section_title: "VyOS from Basics to Advanced"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS from Basics to Advanced
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-05-zone-firewall.webp" alt="Zone-based Firewall" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />
<h2>Zone-based Firewall là gì?</h2>

<p>Trong bài trước, chúng ta cấu hình firewall theo <strong>interface-based</strong> — gán rules trực tiếp vào từng interface với inbound/outbound direction. Phương pháp này hoạt động tốt nhưng trở nên phức tạp khi mạng có nhiều interfaces.</p>

<p><strong>Zone-based firewall</strong> là phương pháp tổ chức firewall theo <em>vùng mạng</em> (zones). Thay vì nghĩ về interfaces, bạn nghĩ về <strong>traffic flow giữa các zones</strong>. Đây là mô hình được Cisco, Juniper và nhiều enterprise firewall sử dụng.</p>

<h3>Nguyên tắc cơ bản</h3>

<ul>
  <li>Mỗi interface thuộc về <strong>đúng một zone</strong></li>
  <li>Traffic giữa các zones bị <strong>deny by default</strong> — phải tạo rule cho phép rõ ràng</li>
  <li>Traffic trong cùng zone (same-zone) mặc định được allow</li>
  <li>VyOS router bản thân là zone đặc biệt: <strong>local zone</strong></li>
</ul>

<h2>Zone-based vs Interface-based Firewall</h2>

<pre><code class="language-bash"># Interface-based: phải xác định direction trên mỗi interface
# → Phức tạp khi có 4-5 interfaces
#
# set firewall ipv4 forward filter rule X inbound-interface eth0
# set firewall ipv4 forward filter rule X outbound-interface eth1
# set firewall ipv4 forward filter rule Y inbound-interface eth0
# set firewall ipv4 forward filter rule Y outbound-interface eth2
# ... rất nhiều rules

# Zone-based: nhóm interfaces vào zones, viết policy giữa zones
# → Rõ ràng, dễ quản lý
#
# zone WAN:  eth0
# zone LAN:  eth1
# zone DMZ:  eth2
# policy: WAN→LAN: drop, LAN→WAN: accept, WAN→DMZ: allow HTTP only</code></pre>

<p>Ưu điểm của zone-based:</p>

<ul>
  <li><strong>Dễ hiểu</strong>: Mỗi policy mô tả rõ "traffic từ zone A đến zone B"</li>
  <li><strong>Scalable</strong>: Thêm interface mới chỉ cần gán vào zone có sẵn</li>
  <li><strong>Audit dễ</strong>: Xem nhanh ai được phép giao tiếp với ai</li>
  <li><strong>Best practice</strong>: Phù hợp với mô hình bảo mật enterprise</li>
</ul>

<h2>Thiết kế Zones</h2>

<p>Một mạng home/office điển hình có thể chia thành các zones sau:</p>

<pre><code class="language-bash">                        INTERNET
                           │
                    ┌──────┴──────┐
                    │  ZONE: WAN  │
                    │    eth0     │
                    └──────┬──────┘
                           │
                    ┌──────┴──────┐
                    │ VyOS Router │ ← ZONE: LOCAL (router itself)
                    └──┬────┬──┬──┘
                       │    │  │
              ┌────────┘    │  └────────┐
              │             │           │
       ┌──────┴──────┐ ┌───┴────┐ ┌────┴─────┐
       │  ZONE: LAN  │ │  DMZ   │ │  GUEST   │
       │    eth1     │ │  eth2  │ │   eth3   │
       └─────────────┘ └────────┘ └──────────┘
       Trusted          Servers    Untrusted
       192.168.1.0/24   10.0.1.0/24  192.168.10.0/24</code></pre>

<h3>Các zone phổ biến</h3>

<ul>
  <li><strong>WAN</strong>: Kết nối Internet — untrusted, tất cả inbound bị block trừ khi cho phép</li>
  <li><strong>LAN</strong>: Mạng nội bộ — trusted, được phép ra Internet và truy cập DMZ</li>
  <li><strong>DMZ</strong>: Vùng chứa servers public (web, mail) — semi-trusted</li>
  <li><strong>GUEST</strong>: WiFi khách — chỉ được ra Internet, không truy cập LAN/DMZ</li>
  <li><strong>LOCAL</strong>: VyOS router chính nó — quản lý SSH, DNS, DHCP services</li>
</ul>

<h2>Cấu hình Zone-based Firewall trên VyOS</h2>

<h3>Bước 1: Creating Firewall Rule Sets (ipv4 name)</h3>

<p>Trước tiên, tạo các bộ rules cho mỗi cặp zone. VyOS 1.4+ sử dụng <code>firewall ipv4 name</code> để định nghĩa named rule sets:</p>

<pre><code class="language-bash">configure

# === WAN → LAN: Block tất cả (chỉ allow established) ===
set firewall ipv4 name WAN-TO-LAN default-action 'drop'
set firewall ipv4 name WAN-TO-LAN rule 10 action 'accept'
set firewall ipv4 name WAN-TO-LAN rule 10 state 'established'
set firewall ipv4 name WAN-TO-LAN rule 10 state 'related'
set firewall ipv4 name WAN-TO-LAN rule 20 action 'drop'
set firewall ipv4 name WAN-TO-LAN rule 20 state 'invalid'

# === LAN → WAN: Allow tất cả ===
set firewall ipv4 name LAN-TO-WAN default-action 'accept'

# === WAN → DMZ: Chỉ allow HTTP/HTTPS ===
set firewall ipv4 name WAN-TO-DMZ default-action 'drop'
set firewall ipv4 name WAN-TO-DMZ rule 10 action 'accept'
set firewall ipv4 name WAN-TO-DMZ rule 10 state 'established'
set firewall ipv4 name WAN-TO-DMZ rule 10 state 'related'
set firewall ipv4 name WAN-TO-DMZ rule 20 action 'drop'
set firewall ipv4 name WAN-TO-DMZ rule 20 state 'invalid'
set firewall ipv4 name WAN-TO-DMZ rule 100 action 'accept'
set firewall ipv4 name WAN-TO-DMZ rule 100 protocol 'tcp'
set firewall ipv4 name WAN-TO-DMZ rule 100 destination port '80,443'

# === LAN → DMZ: Allow tất cả ===
set firewall ipv4 name LAN-TO-DMZ default-action 'accept'

# === DMZ → LAN: Block (servers không được truy cập LAN) ===
set firewall ipv4 name DMZ-TO-LAN default-action 'drop'
set firewall ipv4 name DMZ-TO-LAN rule 10 action 'accept'
set firewall ipv4 name DMZ-TO-LAN rule 10 state 'established'
set firewall ipv4 name DMZ-TO-LAN rule 10 state 'related'

# === DMZ → WAN: Allow (servers cần update, fetch data) ===
set firewall ipv4 name DMZ-TO-WAN default-action 'accept'

commit</code></pre>

<h3>Bước 2: Tạo zone-policy và gán interfaces</h3>

<pre><code class="language-bash"># Tạo zone WAN
set zone-policy zone WAN interface 'eth0'
set zone-policy zone WAN description 'Internet / Untrusted'

# Tạo zone LAN
set zone-policy zone LAN interface 'eth1'
set zone-policy zone LAN description 'Internal / Trusted'

# Tạo zone DMZ
set zone-policy zone DMZ interface 'eth2'
set zone-policy zone DMZ description 'DMZ / Servers'

# LOCAL zone (VyOS router)
set zone-policy zone LOCAL local-zone
set zone-policy zone LOCAL description 'VyOS Router'

commit</code></pre>

<h3>Bước 3: Gán firewall policies cho inter-zone traffic</h3>

<pre><code class="language-bash"># WAN → LAN
set zone-policy zone LAN from WAN firewall name 'WAN-TO-LAN'

# LAN → WAN
set zone-policy zone WAN from LAN firewall name 'LAN-TO-WAN'

# WAN → DMZ
set zone-policy zone DMZ from WAN firewall name 'WAN-TO-DMZ'

# LAN → DMZ
set zone-policy zone DMZ from LAN firewall name 'LAN-TO-DMZ'

# DMZ → LAN
set zone-policy zone LAN from DMZ firewall name 'DMZ-TO-LAN'

# DMZ → WAN
set zone-policy zone WAN from DMZ firewall name 'DMZ-TO-WAN'

commit
save</code></pre>

<h2>LOCAL Zone — Bảo vệ Router</h2>

<p>LOCAL zone kiểm soát traffic đến/từ chính VyOS router (SSH, DNS, DHCP, NTP...):</p>

<pre><code class="language-bash"># === WAN → LOCAL: Rất hạn chế ===
set firewall ipv4 name WAN-TO-LOCAL default-action 'drop'
set firewall ipv4 name WAN-TO-LOCAL rule 10 action 'accept'
set firewall ipv4 name WAN-TO-LOCAL rule 10 state 'established'
set firewall ipv4 name WAN-TO-LOCAL rule 10 state 'related'
set firewall ipv4 name WAN-TO-LOCAL rule 20 action 'drop'
set firewall ipv4 name WAN-TO-LOCAL rule 20 state 'invalid'

# === LAN → LOCAL: Cho phép SSH, DNS, DHCP ===
set firewall ipv4 name LAN-TO-LOCAL default-action 'drop'
set firewall ipv4 name LAN-TO-LOCAL rule 10 action 'accept'
set firewall ipv4 name LAN-TO-LOCAL rule 10 state 'established'
set firewall ipv4 name LAN-TO-LOCAL rule 10 state 'related'
set firewall ipv4 name LAN-TO-LOCAL rule 100 action 'accept'
set firewall ipv4 name LAN-TO-LOCAL rule 100 protocol 'tcp'
set firewall ipv4 name LAN-TO-LOCAL rule 100 destination port '22'
set firewall ipv4 name LAN-TO-LOCAL rule 100 description 'Allow SSH'
set firewall ipv4 name LAN-TO-LOCAL rule 110 action 'accept'
set firewall ipv4 name LAN-TO-LOCAL rule 110 protocol 'udp'
set firewall ipv4 name LAN-TO-LOCAL rule 110 destination port '53'
set firewall ipv4 name LAN-TO-LOCAL rule 110 description 'Allow DNS'
set firewall ipv4 name LAN-TO-LOCAL rule 120 action 'accept'
set firewall ipv4 name LAN-TO-LOCAL rule 120 protocol 'udp'
set firewall ipv4 name LAN-TO-LOCAL rule 120 destination port '67,68'
set firewall ipv4 name LAN-TO-LOCAL rule 120 description 'Allow DHCP'
set firewall ipv4 name LAN-TO-LOCAL rule 130 action 'accept'
set firewall ipv4 name LAN-TO-LOCAL rule 130 protocol 'icmp'
set firewall ipv4 name LAN-TO-LOCAL rule 130 description 'Allow Ping'

# === LOCAL → WAN: Cho phép (router cần NTP, DNS, updates) ===
set firewall ipv4 name LOCAL-TO-WAN default-action 'accept'

# === LOCAL → LAN: Cho phép ===
set firewall ipv4 name LOCAL-TO-LAN default-action 'accept'

# Gán vào zone-policy
set zone-policy zone LOCAL from WAN firewall name 'WAN-TO-LOCAL'
set zone-policy zone LOCAL from LAN firewall name 'LAN-TO-LOCAL'
set zone-policy zone WAN from LOCAL firewall name 'LOCAL-TO-WAN'
set zone-policy zone LAN from LOCAL firewall name 'LOCAL-TO-LAN'

commit
save</code></pre>

<h2>Best Practices cho Zone-based Firewall</h2>

<ul>
  <li><strong>Nguyên tắc least privilege</strong>: Default-action luôn là <code>drop</code>, chỉ mở những gì cần thiết</li>
  <li><strong>State policy trước tiên</strong>: Rule 10 luôn là accept established/related</li>
  <li><strong>Đánh số rule cách nhau</strong>: 10, 20, 100, 110... để dễ chèn thêm</li>
  <li><strong>Sử dụng groups</strong>: Dùng address-group, port-group cho dễ quản lý</li>
  <li><strong>Đặt tên rõ ràng</strong>: Rule set name theo format <code>SRC-TO-DST</code></li>
  <li><strong>Dùng commit-confirm</strong>: Đặc biệt khi cấu hình qua SSH</li>
  <li><strong>Document</strong>: Thêm description cho mỗi rule và zone</li>
  <li><strong>Log dropped traffic</strong>: Bật default-log cho các chain drop để monitoring</li>
</ul>

<h2>Thêm GUEST Zone</h2>

<p>GUEST zone cho WiFi khách — chỉ cho ra Internet, không cho truy cập LAN/DMZ/router:</p>

<pre><code class="language-bash">configure

# GUEST → WAN: Allow (khách vào Internet)
set firewall ipv4 name GUEST-TO-WAN default-action 'accept'

# GUEST → LAN: Block completely
set firewall ipv4 name GUEST-TO-LAN default-action 'drop'

# GUEST → DMZ: Block
set firewall ipv4 name GUEST-TO-DMZ default-action 'drop'

# GUEST → LOCAL: Chỉ DHCP và DNS
set firewall ipv4 name GUEST-TO-LOCAL default-action 'drop'
set firewall ipv4 name GUEST-TO-LOCAL rule 10 action 'accept'
set firewall ipv4 name GUEST-TO-LOCAL rule 10 state 'established'
set firewall ipv4 name GUEST-TO-LOCAL rule 10 state 'related'
set firewall ipv4 name GUEST-TO-LOCAL rule 100 action 'accept'
set firewall ipv4 name GUEST-TO-LOCAL rule 100 protocol 'udp'
set firewall ipv4 name GUEST-TO-LOCAL rule 100 destination port '53,67,68'
set firewall ipv4 name GUEST-TO-LOCAL rule 100 description 'Allow DNS and DHCP'

# Tạo zone và gán interface
set zone-policy zone GUEST interface 'eth3'
set zone-policy zone GUEST description 'Guest WiFi / Untrusted'

# Gán policies
set zone-policy zone WAN from GUEST firewall name 'GUEST-TO-WAN'
set zone-policy zone LAN from GUEST firewall name 'GUEST-TO-LAN'
set zone-policy zone DMZ from GUEST firewall name 'GUEST-TO-DMZ'
set zone-policy zone LOCAL from GUEST firewall name 'GUEST-TO-LOCAL'

commit
save</code></pre>

<h2>Hands-on Lab: Zone-policy 3 Zones cho Home Network</h2>

<p>Xây dựng mạng 3 zones hoàn chỉnh từ đầu:</p>

<pre><code class="language-bash">                   Internet
                      │
               ┌──────┴──────┐
               │  WAN (eth0) │
               │    DHCP     │
               └──────┬──────┘
                      │
               ┌──────┴──────┐
               │ VyOS Router │ LOCAL zone
               └──┬───────┬──┘
                  │       │
        ┌─────────┘       └─────────┐
        │                           │
  ┌─────┴─────┐              ┌─────┴─────┐
  │ LAN (eth1)│              │ DMZ (eth2)│
  │ 10.0.1.0  │              │ 10.0.2.0  │
  └───────────┘              └───────────┘
  Trusted                    Web Server
                             10.0.2.100</code></pre>

<h3>Bước 1: Interfaces</h3>

<pre><code class="language-bash">configure

set interfaces ethernet eth0 address dhcp
set interfaces ethernet eth0 description 'WAN'
set interfaces ethernet eth1 address '10.0.1.1/24'
set interfaces ethernet eth1 description 'LAN'
set interfaces ethernet eth2 address '10.0.2.1/24'
set interfaces ethernet eth2 description 'DMZ'

commit</code></pre>

<h3>Bước 2: NAT</h3>

<pre><code class="language-bash"># Masquerade cho cả LAN và DMZ ra Internet
set nat source rule 100 outbound-interface name 'eth0'
set nat source rule 100 source address '10.0.0.0/8'
set nat source rule 100 translation address masquerade

# Port forward HTTP/HTTPS vào DMZ web server
set nat destination rule 10 inbound-interface name 'eth0'
set nat destination rule 10 protocol 'tcp'
set nat destination rule 10 destination port '80,443'
set nat destination rule 10 translation address '10.0.2.100'

commit</code></pre>

<h3>Bước 3: Firewall rule sets</h3>

<pre><code class="language-bash"># WAN-TO-LAN
set firewall ipv4 name WAN-TO-LAN default-action 'drop'
set firewall ipv4 name WAN-TO-LAN rule 10 action 'accept'
set firewall ipv4 name WAN-TO-LAN rule 10 state 'established'
set firewall ipv4 name WAN-TO-LAN rule 10 state 'related'

# LAN-TO-WAN
set firewall ipv4 name LAN-TO-WAN default-action 'accept'

# WAN-TO-DMZ
set firewall ipv4 name WAN-TO-DMZ default-action 'drop'
set firewall ipv4 name WAN-TO-DMZ rule 10 action 'accept'
set firewall ipv4 name WAN-TO-DMZ rule 10 state 'established'
set firewall ipv4 name WAN-TO-DMZ rule 10 state 'related'
set firewall ipv4 name WAN-TO-DMZ rule 100 action 'accept'
set firewall ipv4 name WAN-TO-DMZ rule 100 protocol 'tcp'
set firewall ipv4 name WAN-TO-DMZ rule 100 destination port '80,443'
set firewall ipv4 name WAN-TO-DMZ rule 100 description 'Allow HTTP/HTTPS to DMZ'

# DMZ-TO-WAN
set firewall ipv4 name DMZ-TO-WAN default-action 'accept'

# LAN-TO-DMZ
set firewall ipv4 name LAN-TO-DMZ default-action 'accept'

# DMZ-TO-LAN
set firewall ipv4 name DMZ-TO-LAN default-action 'drop'
set firewall ipv4 name DMZ-TO-LAN rule 10 action 'accept'
set firewall ipv4 name DMZ-TO-LAN rule 10 state 'established'
set firewall ipv4 name DMZ-TO-LAN rule 10 state 'related'

# WAN-TO-LOCAL
set firewall ipv4 name WAN-TO-LOCAL default-action 'drop'
set firewall ipv4 name WAN-TO-LOCAL rule 10 action 'accept'
set firewall ipv4 name WAN-TO-LOCAL rule 10 state 'established'
set firewall ipv4 name WAN-TO-LOCAL rule 10 state 'related'

# LAN-TO-LOCAL
set firewall ipv4 name LAN-TO-LOCAL default-action 'drop'
set firewall ipv4 name LAN-TO-LOCAL rule 10 action 'accept'
set firewall ipv4 name LAN-TO-LOCAL rule 10 state 'established'
set firewall ipv4 name LAN-TO-LOCAL rule 10 state 'related'
set firewall ipv4 name LAN-TO-LOCAL rule 100 action 'accept'
set firewall ipv4 name LAN-TO-LOCAL rule 100 protocol 'tcp'
set firewall ipv4 name LAN-TO-LOCAL rule 100 destination port '22'
set firewall ipv4 name LAN-TO-LOCAL rule 110 action 'accept'
set firewall ipv4 name LAN-TO-LOCAL rule 110 protocol 'udp'
set firewall ipv4 name LAN-TO-LOCAL rule 110 destination port '53,67,68'
set firewall ipv4 name LAN-TO-LOCAL rule 120 action 'accept'
set firewall ipv4 name LAN-TO-LOCAL rule 120 protocol 'icmp'

# LOCAL-TO-WAN, LOCAL-TO-LAN, LOCAL-TO-DMZ
set firewall ipv4 name LOCAL-TO-WAN default-action 'accept'
set firewall ipv4 name LOCAL-TO-LAN default-action 'accept'
set firewall ipv4 name LOCAL-TO-DMZ default-action 'accept'

commit</code></pre>

<h3>Bước 4: Zone-policy</h3>

<pre><code class="language-bash"># Zones
set zone-policy zone WAN interface 'eth0'
set zone-policy zone LAN interface 'eth1'
set zone-policy zone DMZ interface 'eth2'
set zone-policy zone LOCAL local-zone

# Inter-zone policies
set zone-policy zone LAN from WAN firewall name 'WAN-TO-LAN'
set zone-policy zone WAN from LAN firewall name 'LAN-TO-WAN'
set zone-policy zone DMZ from WAN firewall name 'WAN-TO-DMZ'
set zone-policy zone WAN from DMZ firewall name 'DMZ-TO-WAN'
set zone-policy zone DMZ from LAN firewall name 'LAN-TO-DMZ'
set zone-policy zone LAN from DMZ firewall name 'DMZ-TO-LAN'
set zone-policy zone LOCAL from WAN firewall name 'WAN-TO-LOCAL'
set zone-policy zone LOCAL from LAN firewall name 'LAN-TO-LOCAL'
set zone-policy zone WAN from LOCAL firewall name 'LOCAL-TO-WAN'
set zone-policy zone LAN from LOCAL firewall name 'LOCAL-TO-LAN'
set zone-policy zone DMZ from LOCAL firewall name 'LOCAL-TO-DMZ'

commit
save</code></pre>

<h3>Bước 5: Kiểm tra</h3>

<pre><code class="language-bash">exit

# Xem zone-policy
show zone-policy

# Xem firewall
show firewall ipv4 name WAN-TO-DMZ
show firewall ipv4 name LAN-TO-WAN

# Test cases:
# 1. LAN client ping 8.8.8.8            → OK (LAN→WAN: accept)
# 2. LAN client SSH vào router           → OK (LAN→LOCAL: port 22 accept)
# 3. Internet truy cập web server :80    → OK (WAN→DMZ: port 80 accept)
# 4. Internet SSH vào router             → BLOCKED (WAN→LOCAL: drop)
# 5. DMZ server truy cập LAN             → BLOCKED (DMZ→LAN: drop)
# 6. DMZ server cập nhật từ Internet     → OK (DMZ→WAN: accept)</code></pre>

<h2>Summary</h2>

<p>Trong bài này, bạn đã nắm được:</p>

<ul>
  <li><strong>Zone-based firewall</strong>: Tổ chức firewall theo vùng mạng thay vì theo interface — rõ ràng, scalable</li>
  <li>Các zone phổ biến: WAN, LAN, DMZ, GUEST, LOCAL và vai trò của từng zone</li>
  <li>Cách tạo <strong>named firewall rule sets</strong> với format SRC-TO-DST</li>
  <li>Cấu hình <code>zone-policy</code> để gán interfaces vào zones và áp dụng inter-zone policies</li>
  <li><strong>LOCAL zone</strong>: Bảo vệ chính VyOS router khỏi truy cập trái phép</li>
  <li>Best practices: least privilege, state policy, commit-confirm, logging</li>
  <li>Hands-on Lab: Xây dựng hệ thống 3 zones (WAN/LAN/DMZ) hoàn chỉnh</li>
</ul>

<p>Đến đây bạn đã có nền tảng vững chắc về VyOS: từ cài đặt, cấu hình interface, NAT, firewall cơ bản đến zone-based firewall. Các bài tiếp theo sẽ đi vào các chủ đề nâng cao hơn như DHCP/DNS services, VPN (IPsec, WireGuard), routing protocols (OSPF, BGP) và High Availability.</p>
