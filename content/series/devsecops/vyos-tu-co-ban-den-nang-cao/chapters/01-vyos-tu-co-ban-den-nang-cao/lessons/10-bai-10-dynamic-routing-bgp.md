---
id: 019d65ef-d36f-773e-bf0a-9e387917d59e
title: 'Bài 10: Dynamic Routing — BGP'
slug: bai-10-dynamic-routing-bgp
description: >-
  Cấu hình định tuyến động BGP trên VyOS, lý thuyết, ví dụ thực tế, lab và tổng kết.
duration_minutes: 180
is_free: true
video_url: null
sort_order: 10
section_title: "VyOS từ Cơ bản đến Nâng cao"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS từ Cơ bản đến Nâng cao
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-10-bgp.webp" alt="Dynamic Routing — BGP" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>Giới thiệu về BGP trên VyOS</h2>
<p>Bài học này hướng dẫn cấu hình <strong>BGP</strong> (Border Gateway Protocol) trên VyOS 1.4.x/1.5 rolling release. BGP là giao thức định tuyến động tiêu chuẩn cho các hệ thống mạng lớn, ISP và kết nối đa nhà cung cấp.</p>

<h3>1. Kiến thức cơ bản về BGP</h3>
<ul>
  <li><strong>AS (Autonomous System)</strong>: Hệ thống tự trị.</li>
  <li><strong>iBGP vs eBGP</strong>: iBGP (nội bộ), eBGP (liên kết ngoài).</li>
  <li><strong>Path Selection</strong>: Quy tắc chọn đường đi tốt nhất.</li>
</ul>

<h3>2. Cấu hình BGP cơ bản</h3>
<pre><code class="language-bash">set protocols bgp 65001 parameters router-id 1.1.1.1
set protocols bgp 65001 neighbor 2.2.2.2 remote-as 65002
set protocols bgp 65001 neighbor 2.2.2.2 address-family ipv4-unicast
set protocols bgp 65001 network 192.168.10.0/24
set protocols bgp 65001 network 10.10.10.0/24
</code></pre>
<ul>
  <li><strong>Route-map, prefix-list, AS-path:</strong></li>
</ul>
<pre><code class="language-bash">set policy prefix-list PL-OUT rule 10 action permit prefix 192.168.10.0/24
set policy route-map RM-OUT rule 10 action permit
set policy route-map RM-OUT rule 10 match ip address prefix-list PL-OUT
set protocols bgp 65001 neighbor 2.2.2.2 route-map export RM-OUT
set protocols bgp 65001 neighbor 2.2.2.2 as-path-prepend '65001 65001'
</code></pre>

<h3>3. BGP Communities, Route Reflector, IPv6</h3>
<pre><code class="language-bash">set protocols bgp 65001 neighbor 3.3.3.3 remote-as 65001
set protocols bgp 65001 neighbor 3.3.3.3 route-reflector-client
set protocols bgp 65001 neighbor 2.2.2.2 address-family ipv6-unicast
set protocols bgp 65001 neighbor 2.2.2.2 extended-nexthop
set protocols bgp 65001 neighbor 2.2.2.2 soft-reconfiguration inbound
</code></pre>

<h3>4. Kiểm tra trạng thái BGP</h3>
<pre><code class="language-bash">show ip bgp summary
show ip bgp
show ip bgp neighbors
</code></pre>

<h3>5. Sơ đồ mạng ví dụ</h3>
<pre><code>+---------+     +---------+
| VyOS 1 |-----| VyOS 2 |
| AS65001|     | AS65002|
+---------+     +---------+
</code></pre>

<h3>6. Lab thực hành: BGP Peering 2 AS</h3>
<ol>
  <li>Cấu hình BGP trên 2 VyOS với AS khác nhau.</li>
  <li>Thiết lập neighbor, route-map, prefix-list, as-path-prepend.</li>
  <li>Commit và save cấu hình:</li>
</ol>
<pre><code class="language-bash">commit
save
</code></pre>
<ol start="4">
  <li>Kiểm tra trạng thái BGP, routes.</li>
</ol>
<pre><code class="language-bash">show ip bgp summary
show ip bgp
</code></pre>

<h3>7. Tổng kết</h3>
<p>Bạn đã biết cách cấu hình BGP trên VyOS, ứng dụng vào các hệ thống mạng lớn, đa nhà cung cấp, kiểm soát chính sách định tuyến động.</p>