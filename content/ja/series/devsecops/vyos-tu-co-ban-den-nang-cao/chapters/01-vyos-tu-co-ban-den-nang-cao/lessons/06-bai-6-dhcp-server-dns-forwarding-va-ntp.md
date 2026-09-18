---
id: 019d65ef-d36f-773e-bf0a-9e34d7b36e63
title: '第6課：DHCPサーバー、DNS転送とNTP'
slug: bai-6-dhcp-server-dns-forwarding-va-ntp
description: >-
  VyOSでのDHCPサーバー、DNS転送、NTPの設定。実践例、ハンズオンラボ、知識のまとめを含みます。
duration_minutes: 130
is_free: true
video_url: null
sort_order: 6
section_title: "VyOSの基礎から応用まで"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOSの基礎から応用まで
  slug: vyos-tu-co-ban-den-nang-cao
---

<img src="/storage/uploads/2026/04/vyos-06-dhcp-dns.webp" alt="DHCP Server, DNS Forwarding và NTP" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>Giới thiệu về DHCP Server, DNS Forwarding và NTP trên VyOS</h2>
<p>Trong bài học này, bạn sẽ tìm hiểu cách cấu hình <strong>DHCP Server</strong>, <strong>DNS Forwarding</strong> và <strong>NTP</strong> trên VyOS phiên bản 1.4.x/1.5 rolling release. Đây là các dịch vụ nền tảng giúp tự động cấp phát địa chỉ IP, chuyển tiếp truy vấn DNS và đồng bộ thời gian cho hệ thống mạng.</p>

<h3>1. DHCPサーバーの設定 trên VyOS</h3>
<p>DHCP Server giúp tự động cấp phát địa chỉ IP, gateway, DNS cho các thiết bị trong mạng LAN.</p>
<ul>
  <li><strong>Khởi tạo DHCP Server cho mạng LAN:</strong></li>
</ul>
<pre><code class="language-bash">set service dhcp-server shared-network-name LAN subnet 192.168.10.0/24 default-router 192.168.10.1
set service dhcp-server shared-network-name LAN subnet 192.168.10.0/24 dns-server 8.8.8.8
set service dhcp-server shared-network-name LAN subnet 192.168.10.0/24 range 0 start 192.168.10.100
set service dhcp-server shared-network-name LAN subnet 192.168.10.0/24 range 0 stop 192.168.10.200
</code></pre>
<ul>
  <li><strong>Gán IP tĩnh cho thiết bị dựa trên MAC:</strong></li>
</ul>
<pre><code class="language-bash">set service dhcp-server shared-network-name LAN subnet 192.168.10.0/24 static-mapping PC1 ip-address 192.168.10.50
set service dhcp-server shared-network-name LAN subnet 192.168.10.0/24 static-mapping PC1 mac-address 00:11:22:33:44:55
</code></pre>
<ul>
  <li><strong>Cấu hình DHCPv6 (IPv6):</strong></li>
</ul>
<pre><code class="language-bash">set service dhcpv6-server shared-network-name LAN6 subnet 2001:db8:1::/64 range 0 start 2001:db8:1::100
set service dhcpv6-server shared-network-name LAN6 subnet 2001:db8:1::/64 range 0 stop 2001:db8:1::200
set service dhcpv6-server shared-network-name LAN6 subnet 2001:db8:1::/64 name-server 2001:4860:4860::8888
</code></pre>
<ul>
  <li><strong>DHCP Relay:</strong> Chuyển tiếp yêu cầu DHCP tới server khác.</li>
</ul>
<pre><code class="language-bash">set service dhcp-relay interface eth1
set service dhcp-relay server 192.168.20.10
</code></pre>

<h3>2. DNS転送の設定</h3>
<p>DNS Forwarding giúp các thiết bị trong mạng LAN truy vấn DNS thông qua VyOS.</p>
<pre><code class="language-bash">set service dns forwarding listen-address 192.168.10.1
set service dns forwarding allow-from 192.168.10.0/24
set service dns forwarding cache-size 1000
set service dns forwarding name-server 8.8.8.8
set service dns forwarding static-host-mapping host-name server1.intra inet 192.168.10.10
</code></pre>
<ul>
  <li><strong>Kiểm tra trạng thái DNS Forwarding:</strong></li>
</ul>
<pre><code class="language-bash">show service dns forwarding
</code></pre>

<h3>3. NTPの設定 (Network Time Protocol)</h3>
<p>NTP giúp đồng bộ thời gian hệ thống với các máy chủ chuẩn.</p>
<pre><code class="language-bash">set service ntp server 0.pool.ntp.org
set service ntp server 1.pool.ntp.org
set service ntp listen-address 192.168.10.1
</code></pre>
<ul>
  <li><strong>Kiểm tra trạng thái NTP:</strong></li>
</ul>
<pre><code class="language-bash">show ntp
</code></pre>

<h3>4. 実践例 & sơ đồ mạng</h3>
<p>Giả sử bạn có sơ đồ mạng như sau:</p>
<pre><code>+-------------------+      +-------------------+
|   VyOS Router     |------|   Switch LAN      |
| 192.168.10.1/24   |      |                   |
+-------------------+      +-------------------+
           |                        |
      DHCP, DNS, NTP           Các PC, IoT
</code></pre>

<h3>5. ハンズオンラボ: Cấu hình DHCP, DNS, NTP</h3>
<ol>
  <li>Đăng nhập vào VyOS qua SSH hoặc console.</li>
  <li>Thực hiện các lệnh cấu hình DHCP, DNS, NTP như trên.</li>
  <li>Commit và save cấu hình:</li>
</ol>
<pre><code class="language-bash">commit
save
</code></pre>
<ol start="4">
  <li>Kết nối một PC vào mạng LAN, kiểm tra nhận IP, DNS, NTP tự động.</li>
  <li>Kiểm tra trạng thái dịch vụ:</li>
</ol>
<pre><code class="language-bash">show dhcp server leases
show service dns forwarding
show ntp
</code></pre>

<h3>6. まとめ</h3>
<p>Bạn đã nắm được cách cấu hình DHCP Server, DNS Forwarding và NTP trên VyOS, giúp tự động hóa cấp phát IP, truy vấn DNS và đồng bộ thời gian cho hệ thống mạng.</p>
