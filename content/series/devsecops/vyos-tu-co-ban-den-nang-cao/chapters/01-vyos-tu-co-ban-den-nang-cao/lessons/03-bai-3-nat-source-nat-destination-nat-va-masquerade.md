---
id: 019d65ef-d36f-773e-bf0a-9e31fc512de3
title: 'Bài 3: NAT — Source NAT, Destination NAT và Masquerade'
slug: bai-3-nat-source-nat-destination-nat-va-masquerade
description: >-
  Hướng dẫn chi tiết về NAT trên VyOS: Source NAT, masquerade cho LAN,
  Destination NAT (port forwarding), 1:1 NAT, NPTv6, rule ordering và troubleshooting.
duration_minutes: 140
is_free: true
video_url: null
sort_order: 3
section_title: "VyOS từ Cơ bản đến Nâng cao"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS từ Cơ bản đến Nâng cao
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-03-nat.webp" alt="NAT — Source NAT, Destination NAT và Masquerade" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>NAT là gì?</h2>

<p><strong>Network Address Translation (NAT)</strong> là kỹ thuật thay đổi địa chỉ IP nguồn hoặc đích của gói tin khi đi qua router. NAT là thành phần thiết yếu trong mọi hệ thống mạng — cho phép nhiều thiết bị LAN chia sẻ một địa chỉ IP public để truy cập Internet.</p>

<p>VyOS hỗ trợ đầy đủ các loại NAT thông qua nftables backend:</p>

<ul>
  <li><strong>Source NAT (SNAT)</strong>: Thay đổi IP nguồn — dùng cho LAN truy cập Internet</li>
  <li><strong>Masquerade</strong>: Dạng đặc biệt của SNAT, tự động dùng IP của outbound interface</li>
  <li><strong>Destination NAT (DNAT)</strong>: Thay đổi IP đích — dùng cho port forwarding</li>
  <li><strong>1:1 NAT</strong>: Map 1 IP public sang 1 IP private và ngược lại</li>
  <li><strong>NPTv6</strong>: Network Prefix Translation cho IPv6</li>
</ul>

<h2>Source NAT — Cho LAN ra Internet</h2>

<h3>Topology cơ bản</h3>

<pre><code class="language-bash">LAN Clients              VyOS Router                Internet
192.168.1.0/24 --- [eth1: 192.168.1.1] [eth0: 203.0.113.10] --- ISP Gateway
                         Source NAT: 192.168.1.x → 203.0.113.10</code></pre>

<h3>Cấu hình Source NAT với IP tĩnh</h3>

<p>Khi WAN interface có IP tĩnh, sử dụng Source NAT với <code>translation address</code>:</p>

<pre><code class="language-bash">configure

set nat source rule 100 outbound-interface name 'eth0'
set nat source rule 100 source address '192.168.1.0/24'
set nat source rule 100 translation address '203.0.113.10'

commit
save</code></pre>

<p>Giải thích từng dòng:</p>

<ul>
  <li><code>rule 100</code>: Số thứ tự rule (1–999), VyOS xử lý từ nhỏ đến lớn</li>
  <li><code>outbound-interface name 'eth0'</code>: Áp dụng cho traffic đi ra interface eth0 (WAN)</li>
  <li><code>source address</code>: Traffic từ subnet LAN 192.168.1.0/24</li>
  <li><code>translation address</code>: Thay IP nguồn thành IP WAN tĩnh</li>
</ul>

<h3>Masquerade — SNAT tự động</h3>

<p>Khi WAN nhận IP qua DHCP (IP thay đổi), dùng <strong>masquerade</strong> thay vì chỉ định IP cụ thể:</p>

<pre><code class="language-bash">configure

set nat source rule 100 outbound-interface name 'eth0'
set nat source rule 100 source address '192.168.1.0/24'
set nat source rule 100 translation address masquerade

commit
save</code></pre>

<blockquote>
  <p><strong>Khi nào dùng masquerade vs SNAT?</strong> Dùng masquerade khi WAN IP là DHCP (thay đổi). Dùng SNAT với IP cụ thể khi WAN IP tĩnh — hiệu suất tốt hơn một chút vì không cần lookup IP mỗi packet.</p>
</blockquote>

<h2>Destination NAT — Port Forwarding</h2>

<p>Destination NAT cho phép chuyển tiếp traffic từ Internet vào server nội bộ. Ví dụ: forward port 80/443 từ WAN vào web server 192.168.1.100.</p>

<pre><code class="language-bash">configure

# Forward HTTP (port 80) vào web server
set nat destination rule 10 description 'HTTP to Web Server'
set nat destination rule 10 inbound-interface name 'eth0'
set nat destination rule 10 protocol 'tcp'
set nat destination rule 10 destination port '80'
set nat destination rule 10 translation address '192.168.1.100'

# Forward HTTPS (port 443) vào web server
set nat destination rule 20 description 'HTTPS to Web Server'
set nat destination rule 20 inbound-interface name 'eth0'
set nat destination rule 20 protocol 'tcp'
set nat destination rule 20 destination port '443'
set nat destination rule 20 translation address '192.168.1.100'

commit
save</code></pre>

<h3>Port Forwarding với đổi port</h3>

<p>Forward traffic đến port khác trên server nội bộ:</p>

<pre><code class="language-bash"># Forward port 8080 trên WAN vào port 80 trên server nội bộ
set nat destination rule 30 description 'Alt HTTP to Web Server'
set nat destination rule 30 inbound-interface name 'eth0'
set nat destination rule 30 protocol 'tcp'
set nat destination rule 30 destination port '8080'
set nat destination rule 30 translation address '192.168.1.100'
set nat destination rule 30 translation port '80'

commit
save</code></pre>

<h3>Forward nhiều ports cùng lúc</h3>

<pre><code class="language-bash"># Forward port range
set nat destination rule 40 description 'Game Server Ports'
set nat destination rule 40 inbound-interface name 'eth0'
set nat destination rule 40 protocol 'udp'
set nat destination rule 40 destination port '27015-27020'
set nat destination rule 40 translation address '192.168.1.200'

commit
save</code></pre>

<h2>1:1 NAT</h2>

<p>1:1 NAT map một IP public sang một IP private — cả chiều inbound lẫn outbound. Hữu ích khi bạn có nhiều IP public và muốn mỗi server có IP public riêng.</p>

<pre><code class="language-bash">configure

# Source NAT: server 192.168.1.100 đi ra với IP 203.0.113.20
set nat source rule 200 outbound-interface name 'eth0'
set nat source rule 200 source address '192.168.1.100'
set nat source rule 200 translation address '203.0.113.20'

# Destination NAT: traffic vào 203.0.113.20 chuyển đến 192.168.1.100
set nat destination rule 200 inbound-interface name 'eth0'
set nat destination rule 200 destination address '203.0.113.20'
set nat destination rule 200 translation address '192.168.1.100'

commit
save</code></pre>

<blockquote>
  <p><strong>Lưu ý</strong>: Để 1:1 NAT hoạt động, bạn cần đảm bảo IP 203.0.113.20 được route đến VyOS router (thường ISP cần cấu hình hoặc bạn dùng proxy ARP).</p>
</blockquote>

<h2>NPTv6 — Network Prefix Translation cho IPv6</h2>

<p>Trong IPv6, không sử dụng NAT truyền thống. Thay vào đó, VyOS hỗ trợ <strong>NPTv6</strong> để translate prefix:</p>

<pre><code class="language-bash">configure

set nat nptv6 rule 10 description 'NPTv6 for LAN'
set nat nptv6 rule 10 outbound-interface name 'eth0'
set nat nptv6 rule 10 source prefix 'fd00::/64'
set nat nptv6 rule 10 translation prefix '2001:db8:1::/64'

commit
save</code></pre>

<h2>NAT Rule Ordering</h2>

<p>Thứ tự xử lý NAT rules rất quan trọng:</p>

<ul>
  <li>VyOS xử lý rules theo <strong>số thứ tự tăng dần</strong> (rule 10 trước rule 100)</li>
  <li>Rule đầu tiên match sẽ được áp dụng, các rule sau bị bỏ qua</li>
  <li>Nên đánh số cách nhau (10, 20, 30...) để dễ chèn rule mới</li>
  <li>Destination NAT được xử lý <strong>trước</strong> routing decision</li>
  <li>Source NAT được xử lý <strong>sau</strong> routing decision</li>
</ul>

<pre><code class="language-bash"># Thứ tự xử lý packet trên VyOS:
#
# Incoming Packet
#       ↓
# Destination NAT (DNAT)   ← thay đổi IP đích
#       ↓
# Routing Decision          ← quyết định forward hay local
#       ↓
# Firewall Rules             ← filter traffic
#       ↓
# Source NAT (SNAT)          ← thay đổi IP nguồn
#       ↓
# Outgoing Packet</code></pre>

<h2>Exclude Traffic từ NAT</h2>

<p>Đôi khi bạn muốn một số traffic không bị NAT (ví dụ: VPN traffic):</p>

<pre><code class="language-bash"># Exclude VPN subnet từ Source NAT
set nat source rule 50 outbound-interface name 'eth0'
set nat source rule 50 source address '192.168.1.0/24'
set nat source rule 50 destination address '10.10.0.0/16'
set nat source rule 50 exclude

# Rule masquerade chung (rule 100, xử lý sau rule 50)
set nat source rule 100 outbound-interface name 'eth0'
set nat source rule 100 source address '192.168.1.0/24'
set nat source rule 100 translation address masquerade

commit
save</code></pre>

<h2>Troubleshooting NAT</h2>

<h3>Kiểm tra NAT rules</h3>

<pre><code class="language-bash"># Xem NAT rules đang hoạt động
show nat source rules
show nat destination rules

# Xem NAT translations đang active
show nat source translations
show nat destination translations

# Xem NAT statistics
show nat source statistics
show nat destination statistics</code></pre>

<h3>Các lỗi thường gặp</h3>

<ul>
  <li><strong>LAN không ra Internet</strong>: Kiểm tra Source NAT rule, outbound-interface đúng chưa, source address đúng subnet chưa</li>
  <li><strong>Port forwarding không hoạt động</strong>: Kiểm tra firewall có cho phép traffic đến port đó không, inbound-interface đúng chưa</li>
  <li><strong>Rule ordering sai</strong>: Rule exclude phải có số nhỏ hơn rule NAT chung</li>
</ul>

<pre><code class="language-bash"># Debug NAT
monitor log | match nat
# Hoặc xem conntrack
show conntrack table ipv4</code></pre>

<h2>Lab thực hành: NAT hoàn chỉnh</h2>

<p>Topology lab:</p>

<pre><code class="language-bash">Internet
    |
[eth0: DHCP] VyOS Router [eth1: 192.168.100.1/24]
                              |
              +---------------+---------------+
              |               |               |
         PC Client       Web Server      Game Server
       192.168.100.10   192.168.100.100  192.168.100.200</code></pre>

<h3>Bước 1: Masquerade cho LAN</h3>

<pre><code class="language-bash">configure

# Source NAT masquerade cho toàn bộ LAN
set nat source rule 100 outbound-interface name 'eth0'
set nat source rule 100 source address '192.168.100.0/24'
set nat source rule 100 translation address masquerade

commit</code></pre>

<h3>Bước 2: Port forward cho Web Server</h3>

<pre><code class="language-bash"># Forward HTTP/HTTPS vào web server
set nat destination rule 10 description 'HTTP Port Forward'
set nat destination rule 10 inbound-interface name 'eth0'
set nat destination rule 10 protocol 'tcp'
set nat destination rule 10 destination port '80'
set nat destination rule 10 translation address '192.168.100.100'

set nat destination rule 20 description 'HTTPS Port Forward'
set nat destination rule 20 inbound-interface name 'eth0'
set nat destination rule 20 protocol 'tcp'
set nat destination rule 20 destination port '443'
set nat destination rule 20 translation address '192.168.100.100'

commit</code></pre>

<h3>Bước 3: Port forward cho Game Server</h3>

<pre><code class="language-bash"># Forward game ports
set nat destination rule 30 description 'Game Server UDP'
set nat destination rule 30 inbound-interface name 'eth0'
set nat destination rule 30 protocol 'udp'
set nat destination rule 30 destination port '27015-27020'
set nat destination rule 30 translation address '192.168.100.200'

commit
save</code></pre>

<h3>Bước 4: Kiểm tra</h3>

<pre><code class="language-bash">exit

# Xem tất cả NAT rules
show nat source rules
show nat destination rules

# Từ PC Client, test Internet
# ping 8.8.8.8 (trên client)

# Xem NAT translations
show nat source translations</code></pre>

<h2>Tổng kết</h2>

<p>Trong bài này, bạn đã nắm được:</p>

<ul>
  <li><strong>Source NAT</strong>: Cho phép LAN truy cập Internet bằng cách thay IP nguồn</li>
  <li><strong>Masquerade</strong>: SNAT tự động — phù hợp khi WAN IP là DHCP</li>
  <li><strong>Destination NAT</strong>: Port forwarding từ Internet vào server nội bộ</li>
  <li><strong>1:1 NAT</strong>: Map hai chiều giữa IP public và IP private</li>
  <li><strong>NPTv6</strong>: Prefix translation cho IPv6</li>
  <li>NAT rule ordering và cách exclude traffic khỏi NAT</li>
  <li>Troubleshooting NAT bằng show commands và conntrack</li>
</ul>

<p>Bài tiếp theo sẽ đi vào <strong>Firewall</strong> — bước quan trọng nhất để bảo vệ mạng. NAT và Firewall luôn đi đôi với nhau trên VyOS.</p>