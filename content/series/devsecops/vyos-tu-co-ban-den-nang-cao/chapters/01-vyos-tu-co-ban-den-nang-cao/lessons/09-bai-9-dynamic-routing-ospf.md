---
id: 019d65ef-d36f-773e-bf0a-9e37dfd74e6b
title: 'Bài 9: Dynamic Routing — OSPF'
slug: bai-9-dynamic-routing-ospf
description: >-
  Cấu hình định tuyến động OSPF trên VyOS, lý thuyết, ví dụ thực tế, lab và tổng kết.
duration_minutes: 170
is_free: true
video_url: null
sort_order: 9
section_title: "VyOS từ Cơ bản đến Nâng cao"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS từ Cơ bản đến Nâng cao
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-09-ospf.webp" alt="Dynamic Routing — OSPF" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>Giới thiệu về OSPF trên VyOS</h2>
<p>Bài học này hướng dẫn cấu hình <strong>OSPF</strong> (Open Shortest Path First) trên VyOS 1.4.x/1.5 rolling release. OSPF là giao thức định tuyến động phổ biến trong các hệ thống mạng doanh nghiệp.</p>

<h3>1. Kiến thức cơ bản về OSPF</h3>
<ul>
  <li><strong>Area</strong>: Vùng logic để chia nhỏ mạng OSPF.</li>
  <li><strong>LSA</strong>: Link State Advertisement, các loại LSA (Type 1, 2, 3...)</li>
  <li><strong>Cost</strong>: Trọng số đường đi, ảnh hưởng đến lựa chọn đường.</li>
  <li><strong>SPF</strong>: Thuật toán Dijkstra tính đường đi ngắn nhất.</li>
</ul>

<h3>2. Cấu hình OSPF cơ bản</h3>
<pre><code class="language-bash">set protocols ospf area 0 network 192.168.10.0/24
set protocols ospf area 0 network 192.168.20.0/24
set protocols ospf area 1 network 10.10.10.0/24
set protocols ospf parameters router-id 1.1.1.1
set protocols ospf passive-interface eth2
set protocols ospf redistribute connected
set protocols ospf redistribute static
</code></pre>
<ul>
  <li><strong>OSPF Unnumbered & ECMP:</strong></li>
</ul>
<pre><code class="language-bash">set protocols ospf interface eth3 network-type point-to-point
set protocols ospf parameters ecmp-limit 4
</code></pre>

<h3>3. OSPF Authentication</h3>
<pre><code class="language-bash">set protocols ospf area 0 authentication md5
set protocols ospf area 0 authentication-key-id 1 md5-key "VyOSSecret"
</code></pre>

<h3>4. Kiểm tra trạng thái OSPF</h3>
<pre><code class="language-bash">show ip ospf neighbor
show ip ospf route
show ip ospf database
</code></pre>

<h3>5. Sơ đồ mạng ví dụ</h3>
<pre><code>+---------+     +---------+     +---------+
| VyOS 1 |-----| VyOS 2 |-----| VyOS 3 |
| Area 0 |     | Area 0 |     | Area 1 |
+---------+     +---------+     +---------+
</code></pre>

<h3>6. Lab thực hành: OSPF Multi-Area</h3>
<ol>
  <li>Cấu hình OSPF trên 3 router VyOS như sơ đồ.</li>
  <li>Thiết lập area, router-id, network, authentication.</li>
  <li>Commit và save cấu hình:</li>
</ol>
<pre><code class="language-bash">commit
save
</code></pre>
<ol start="4">
  <li>Kiểm tra trạng thái OSPF, neighbor, route.</li>
</ol>
<pre><code class="language-bash">show ip ospf neighbor
show ip ospf route
</code></pre>

<h3>7. Tổng kết</h3>
<p>Bạn đã biết cách cấu hình OSPF trên VyOS, ứng dụng vào các hệ thống mạng doanh nghiệp với nhiều area, authentication và kiểm soát định tuyến động.</p>