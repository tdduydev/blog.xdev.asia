---
id: 019d65ef-d36f-773e-bf0a-9e3277a273b3
title: '第4課：基本ファイアウォール——ルール、チェーンとグループ'
slug: bai-4-firewall-co-ban-rules-chains-va-groups
description: >-
  VyOSファイアウォールアーキテクチャ（nftables）、input/output/forwardチェーン、accept/drop/rejectルール、アドレス/ネットワーク/ポートグループ、ステートポリシー、トラブルシューティング。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 4
section_title: "VyOSの基礎から応用まで"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOSの基礎から応用まで
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-04-firewall.webp" alt="Firewall cơ bản — Rules, Chains và Groups" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />
<h2>Kiến trúc Firewall trên VyOS</h2>

<p>VyOS sử dụng <strong>nftables</strong> làm backend firewall (thay thế iptables từ phiên bản 1.4+). Tuy nhiên, bạn không cần viết nftables rules trực tiếp — VyOS CLI trừu tượng hóa toàn bộ qua configuration tree.</p>

<p>Firewall trên VyOS hoạt động dựa trên 3 loại traffic flow:</p>

<pre><code class="language-bash">                    ┌─────────────────┐
   Incoming ──────→ │   INPUT chain   │ ──→ VyOS Router (local processes)
   Traffic          └─────────────────┘
                    ┌─────────────────┐
   Through  ──────→ │  FORWARD chain  │ ──→ Out another interface
   Traffic          └─────────────────┘
                    ┌─────────────────┐
   From VyOS ─────→ │  OUTPUT chain   │ ──→ Outgoing Traffic
   Router           └─────────────────┘</code></pre>

<ul>
  <li><strong>input</strong>: Traffic đến chính VyOS router (SSH, DNS queries đến router, etc.)</li>
  <li><strong>forward</strong>: Traffic đi qua router từ interface này sang interface khác</li>
  <li><strong>output</strong>: Traffic xuất phát từ chính router (router ping ra ngoài, NTP sync, etc.)</li>
</ul>

<h2>Tạo Firewall Rules cơ bản</h2>

<h3>Cấu trúc firewall rule</h3>

<p>Trong VyOS 1.4+, firewall được cấu hình theo cấu trúc:</p>

<pre><code class="language-bash">set firewall ipv4 &lt;chain&gt; filter rule &lt;number&gt; ...

# chain: input, forward, output
# number: 1-999999 (xử lý từ nhỏ đến lớn)</code></pre>

<h3>Default Action</h3>

<p>Luôn đặt <strong>default-action</strong> cho mỗi chain. Best practice: <code>drop</code> (deny by default).</p>

<pre><code class="language-bash">configure

# Default drop cho input — chỉ cho phép traffic được khai báo rõ
set firewall ipv4 input filter default-action 'drop'

# Default drop cho forward
set firewall ipv4 forward filter default-action 'drop'

# Output thường để accept (router cần giao tiếp với bên ngoài)
set firewall ipv4 output filter default-action 'accept'</code></pre>

<h3>Rule Actions</h3>

<ul>
  <li><code>accept</code>: Cho phép packet đi qua</li>
  <li><code>drop</code>: Loại bỏ packet không thông báo (silent drop)</li>
  <li><code>reject</code>: Loại bỏ và gửi ICMP error về nguồn</li>
  <li><code>jump</code>: Nhảy sang chain khác để xử lý</li>
</ul>

<h2>State Policy — Established / Related</h2>

<p>Đây là rule <strong>quan trọng nhất</strong> trong mọi firewall configuration. Cho phép return traffic của các kết nối đã được thiết lập:</p>

<pre><code class="language-bash">configure

# Cho phép established/related traffic (INPUT)
set firewall ipv4 input filter rule 10 action 'accept'
set firewall ipv4 input filter rule 10 state 'established'
set firewall ipv4 input filter rule 10 state 'related'
set firewall ipv4 input filter rule 10 description 'Allow established/related input'

# Drop invalid state
set firewall ipv4 input filter rule 20 action 'drop'
set firewall ipv4 input filter rule 20 state 'invalid'
set firewall ipv4 input filter rule 20 description 'Drop invalid input'

# Tương tự cho FORWARD chain
set firewall ipv4 forward filter rule 10 action 'accept'
set firewall ipv4 forward filter rule 10 state 'established'
set firewall ipv4 forward filter rule 10 state 'related'
set firewall ipv4 forward filter rule 10 description 'Allow established/related forward'

set firewall ipv4 forward filter rule 20 action 'drop'
set firewall ipv4 forward filter rule 20 state 'invalid'
set firewall ipv4 forward filter rule 20 description 'Drop invalid forward'

commit</code></pre>

<blockquote>
  <p><strong>Tại sao cần state policy?</strong> Khi default-action là drop, nếu không có rule established/related, response traffic (ví dụ: reply từ web server khi bạn browse) sẽ bị drop. State policy cho phép return traffic mà không cần tạo rule riêng cho mỗi kết nối.</p>
</blockquote>

<h2>Firewall Rules theo Interface</h2>

<h3>Cho phép SSH đến router từ LAN</h3>

<pre><code class="language-bash"># Cho phép SSH (port 22) vào router chỉ từ LAN
set firewall ipv4 input filter rule 100 action 'accept'
set firewall ipv4 input filter rule 100 protocol 'tcp'
set firewall ipv4 input filter rule 100 destination port '22'
set firewall ipv4 input filter rule 100 inbound-interface name 'eth1'
set firewall ipv4 input filter rule 100 description 'Allow SSH from LAN'

commit</code></pre>

<h3>Cho phép ICMP (ping) đến router</h3>

<pre><code class="language-bash">set firewall ipv4 input filter rule 110 action 'accept'
set firewall ipv4 input filter rule 110 protocol 'icmp'
set firewall ipv4 input filter rule 110 description 'Allow ICMP to router'

commit</code></pre>

<h3>Cho phép LAN forward ra Internet</h3>

<pre><code class="language-bash"># LAN (eth1) → WAN (eth0): cho phép tất cả
set firewall ipv4 forward filter rule 100 action 'accept'
set firewall ipv4 forward filter rule 100 inbound-interface name 'eth1'
set firewall ipv4 forward filter rule 100 outbound-interface name 'eth0'
set firewall ipv4 forward filter rule 100 description 'Allow LAN to WAN'

commit</code></pre>

<h3>Cho phép port forwarding traffic</h3>

<pre><code class="language-bash"># WAN → LAN: chỉ cho phép HTTP/HTTPS đến web server
set firewall ipv4 forward filter rule 200 action 'accept'
set firewall ipv4 forward filter rule 200 inbound-interface name 'eth0'
set firewall ipv4 forward filter rule 200 protocol 'tcp'
set firewall ipv4 forward filter rule 200 destination port '80,443'
set firewall ipv4 forward filter rule 200 destination address '192.168.100.100'
set firewall ipv4 forward filter rule 200 description 'Allow HTTP/HTTPS to web server'

commit</code></pre>

<h2>Firewall Groups</h2>

<p>Firewall groups giúp tổ chức và tái sử dụng các tập hợp addresses, networks, ports trong nhiều rules:</p>

<h3>Address Group</h3>

<pre><code class="language-bash"># Tạo group chứa các IP của admin
set firewall group address-group ADMIN-IPS address '192.168.100.10'
set firewall group address-group ADMIN-IPS address '192.168.100.11'
set firewall group address-group ADMIN-IPS description 'Administrator IPs'

# Sử dụng trong rule
set firewall ipv4 input filter rule 100 source group address-group 'ADMIN-IPS'</code></pre>

<h3>Network Group</h3>

<pre><code class="language-bash"># Group các mạng nội bộ
set firewall group network-group INTERNAL-NETS network '192.168.1.0/24'
set firewall group network-group INTERNAL-NETS network '192.168.2.0/24'
set firewall group network-group INTERNAL-NETS network '10.0.0.0/8'
set firewall group network-group INTERNAL-NETS description 'Internal Networks'

# Sử dụng trong rule
set firewall ipv4 forward filter rule 100 source group network-group 'INTERNAL-NETS'</code></pre>

<h3>Port Group</h3>

<pre><code class="language-bash"># Group các ports web
set firewall group port-group WEB-PORTS port '80'
set firewall group port-group WEB-PORTS port '443'
set firewall group port-group WEB-PORTS port '8080'
set firewall group port-group WEB-PORTS description 'Web Service Ports'

# Sử dụng trong rule
set firewall ipv4 forward filter rule 200 destination group port-group 'WEB-PORTS'</code></pre>

<h2>Logging Firewall</h2>

<p>Bật logging để theo dõi traffic bị drop hoặc accept:</p>

<pre><code class="language-bash"># Log tất cả traffic bị drop bởi default-action
set firewall ipv4 input filter default-log

# Log cho rule cụ thể
set firewall ipv4 input filter rule 999 action 'drop'
set firewall ipv4 input filter rule 999 log
set firewall ipv4 input filter rule 999 description 'Log and drop all other input'

commit
save</code></pre>

<p>Xem logs:</p>

<pre><code class="language-bash"># Xem firewall logs real-time
monitor log | match firewall

# Hoặc xem từ syslog
show log | match firewall</code></pre>

<h2>Xem và quản lý Firewall Rules</h2>

<pre><code class="language-bash"># Xem tất cả firewall rules
show firewall

# Xem rules cho chain cụ thể
show firewall ipv4 input filter

# Xem firewall statistics (packet/byte counters)
show firewall ipv4 input filter rule 100

# Xem firewall groups
show firewall group</code></pre>

<h2>Troubleshooting Firewall</h2>

<h3>Các lỗi thường gặp</h3>

<ul>
  <li><strong>Bị lock khỏi SSH</strong>: Quên tạo rule cho phép SSH trước khi set default-action drop</li>
  <li><strong>LAN không ra Internet</strong>: Thiếu forward rule từ LAN sang WAN, hoặc thiếu state established/related</li>
  <li><strong>Port forward không hoạt động</strong>: Có DNAT nhưng thiếu firewall forward rule cho traffic đó</li>
</ul>

<blockquote>
  <p><strong>Mẹo an toàn</strong>: Khi thay đổi firewall rules qua SSH, luôn dùng <code>commit-confirm</code> thay vì <code>commit</code>. Lệnh này sẽ tự rollback sau 10 phút nếu bạn không confirm — tránh bị lock out.</p>
</blockquote>

<pre><code class="language-bash"># Commit với auto-rollback sau 10 phút
commit-confirm

# Nếu mọi thứ OK, confirm để giữ changes
confirm</code></pre>

<h3>Debug checklist</h3>

<pre><code class="language-bash"># 1. Kiểm tra interfaces
show interfaces

# 2. Kiểm tra routing table
show ip route

# 3. Kiểm tra NAT
show nat source rules
show nat destination rules

# 4. Kiểm tra firewall rules
show firewall ipv4 input filter
show firewall ipv4 forward filter

# 5. Kiểm tra conntrack
show conntrack table ipv4

# 6. Xem logs
show log | tail 50</code></pre>

<h2>ハンズオンラボ: Firewall hoàn chỉnh cho Home Router</h2>

<p>Tiếp tục từ lab NAT bài trước, thêm firewall rules:</p>

<pre><code class="language-bash">Internet
    |
[eth0: DHCP] VyOS Router [eth1: 192.168.100.1/24]
    |                          |
    |              +-----------+-----------+
    |              |                       |
    |         PC Client              Web Server
    |       192.168.100.10         192.168.100.100</code></pre>

<h3>Bước 1: Firewall groups</h3>

<pre><code class="language-bash">configure

# Tạo groups
set firewall group address-group WEB-SERVER address '192.168.100.100'
set firewall group port-group WEB-PORTS port '80'
set firewall group port-group WEB-PORTS port '443'

commit</code></pre>

<h3>Bước 2: Input chain (traffic đến router)</h3>

<pre><code class="language-bash"># Default drop
set firewall ipv4 input filter default-action 'drop'

# State policy
set firewall ipv4 input filter rule 10 action 'accept'
set firewall ipv4 input filter rule 10 state 'established'
set firewall ipv4 input filter rule 10 state 'related'

set firewall ipv4 input filter rule 20 action 'drop'
set firewall ipv4 input filter rule 20 state 'invalid'

# Allow ICMP
set firewall ipv4 input filter rule 30 action 'accept'
set firewall ipv4 input filter rule 30 protocol 'icmp'

# Allow SSH from LAN only
set firewall ipv4 input filter rule 100 action 'accept'
set firewall ipv4 input filter rule 100 protocol 'tcp'
set firewall ipv4 input filter rule 100 destination port '22'
set firewall ipv4 input filter rule 100 inbound-interface name 'eth1'

# Allow DHCP (nếu VyOS làm DHCP server)
set firewall ipv4 input filter rule 110 action 'accept'
set firewall ipv4 input filter rule 110 protocol 'udp'
set firewall ipv4 input filter rule 110 destination port '67,68'
set firewall ipv4 input filter rule 110 inbound-interface name 'eth1'

# Allow DNS (nếu VyOS làm DNS forwarder)
set firewall ipv4 input filter rule 120 action 'accept'
set firewall ipv4 input filter rule 120 protocol 'tcp_udp'
set firewall ipv4 input filter rule 120 destination port '53'
set firewall ipv4 input filter rule 120 inbound-interface name 'eth1'

commit</code></pre>

<h3>Bước 3: Forward chain</h3>

<pre><code class="language-bash"># Default drop
set firewall ipv4 forward filter default-action 'drop'

# State policy
set firewall ipv4 forward filter rule 10 action 'accept'
set firewall ipv4 forward filter rule 10 state 'established'
set firewall ipv4 forward filter rule 10 state 'related'

set firewall ipv4 forward filter rule 20 action 'drop'
set firewall ipv4 forward filter rule 20 state 'invalid'

# LAN → WAN: allow all
set firewall ipv4 forward filter rule 100 action 'accept'
set firewall ipv4 forward filter rule 100 inbound-interface name 'eth1'
set firewall ipv4 forward filter rule 100 outbound-interface name 'eth0'

# WAN → LAN: only allow web traffic to web server (port forward)
set firewall ipv4 forward filter rule 200 action 'accept'
set firewall ipv4 forward filter rule 200 inbound-interface name 'eth0'
set firewall ipv4 forward filter rule 200 protocol 'tcp'
set firewall ipv4 forward filter rule 200 destination group address-group 'WEB-SERVER'
set firewall ipv4 forward filter rule 200 destination group port-group 'WEB-PORTS'

commit
save</code></pre>

<h3>Bước 4: Kiểm tra</h3>

<pre><code class="language-bash">exit

# Xem firewall rules
show firewall ipv4 input filter
show firewall ipv4 forward filter

# Xem groups
show firewall group

# Test: SSH vào router từ LAN → OK
# Test: Ping 8.8.8.8 từ LAN client → OK
# Test: Truy cập web server từ Internet → OK
# Test: SSH vào router từ WAN → Blocked</code></pre>

<h2>まとめ</h2>

<p>Trong bài này, bạn đã nắm được:</p>

<ul>
  <li>Kiến trúc firewall VyOS với nftables backend và 3 chains: input, forward, output</li>
  <li>State policy (established/related) — rule quan trọng nhất</li>
  <li>Tạo firewall rules: action, protocol, port, interface, address matching</li>
  <li>Firewall groups: address-group, network-group, port-group — giúp quản lý dễ dàng</li>
  <li>Logging firewall events để monitoring</li>
  <li>Sử dụng <code>commit-confirm</code> để tránh bị lock out</li>
  <li>Troubleshooting checklist cho firewall</li>
</ul>

<p>Bài tiếp theo sẽ nâng cấp lên <strong>Zone-based Firewall</strong> — phương pháp quản lý firewall chuyên nghiệp hơn cho mạng nhiều zones.</p>
