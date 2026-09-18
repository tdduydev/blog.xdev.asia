---
id: 019d65ef-d36f-773e-bf0a-9e36c62f858f
title: 'Bài 8: Static Routing và Policy-Based Routing'
slug: bai-8-static-routing-va-policy-based-routing
description: >-
  Cấu hình định tuyến tĩnh (Static Routing) và Policy-Based Routing trên VyOS, ví dụ thực tế, lab và tổng kết.
duration_minutes: 150
is_free: true
video_url: null
sort_order: 8
section_title: "VyOS từ Cơ bản đến Nâng cao"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS từ Cơ bản đến Nâng Cao
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-08-routing-pbr.webp" alt="Static Routing và Policy-Based Routing" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>Giới thiệu về Static Routing và Policy-Based Routing trên VyOS</h2>
<p>Bài học này hướng dẫn cấu hình <strong>Static Routing</strong> (định tuyến tĩnh) và <strong>Policy-Based Routing</strong> (định tuyến theo chính sách) trên VyOS 1.4.x/1.5 rolling release. Đây là các kỹ thuật quan trọng để kiểm soát đường đi của gói tin trong mạng.</p>

<h3>1. Định tuyến tĩnh (Static Routing)</h3>
<p>Static route cho phép chỉ định đường đi cố định cho các mạng đích.</p>
<pre><code class="language-bash">set protocols static route 10.10.20.0/24 next-hop 192.168.10.2
set protocols static route 0.0.0.0/0 next-hop 192.168.10.254
set protocols static route 192.168.30.0/24 blackhole
</code></pre>
<ul>
  <li><strong>Failover route với interface health:</strong></li>
</ul>
<pre><code class="language-bash">set protocols static route 0.0.0.0/0 next-hop 192.168.10.254
set protocols static route 0.0.0.0/0 next-hop 192.168.20.254 distance 10
set protocols static route 0.0.0.0/0 next-hop 192.168.20.254 check-gateway ping
</code></pre>

<h3>2. Policy-Based Routing (PBR)</h3>
<p>PBR cho phép định tuyến dựa trên nguồn, đích, giao thức hoặc cổng.</p>
<pre><code class="language-bash">set policy route PBR-OUT rule 10 source address 192.168.10.0/24
set policy route PBR-OUT rule 10 set table 100
set interfaces ethernet eth0 policy route PBR-OUT
set protocols static table 100 route 0.0.0.0/0 next-hop 203.0.113.1
</code></pre>
<ul>
  <li><strong>Routing nhiều uplink theo nguồn:</strong></li>
</ul>
<pre><code class="language-bash">set policy route MULTI-WAN rule 20 source address 192.168.20.0/24
set policy route MULTI-WAN rule 20 set table 200
set protocols static table 200 route 0.0.0.0/0 next-hop 198.51.100.1
</code></pre>

<h3>3. VRF (Virtual Routing and Forwarding) cơ bản</h3>
<pre><code class="language-bash">set vrf name VRF1 table 10
set interfaces ethernet eth2 vrf VRF1
set protocols static table 10 route 0.0.0.0/0 next-hop 10.10.10.2
</code></pre>

<h3>4. Ví dụ thực tế & sơ đồ mạng</h3>
<pre><code>+-------------------+      +-------------------+
|   VyOS Router     |------|   ISP1           |
| 192.168.10.1/24   |      | 203.0.113.1      |
| 192.168.20.1/24   |      +------------------+
+-------------------+      +------------------+
           |                        |
      LAN, WAN1, WAN2           Internet
</code></pre>

<h3>5. Lab thực hành: Static Routing & PBR</h3>
<ol>
  <li>Đăng nhập VyOS, xác định các interface và uplink.</li>
  <li>Cấu hình static route, PBR, VRF như trên.</li>
  <li>Commit và save cấu hình:</li>
</ol>
<pre><code class="language-bash">commit
save
</code></pre>
<ol start="4">
  <li>Kiểm tra định tuyến:</li>
</ol>
<pre><code class="language-bash">show ip route
show policy route
show vrf
</code></pre>

<h3>6. Tổng kết</h3>
<p>Bạn đã biết cách cấu hình định tuyến tĩnh, policy-based routing và VRF trên VyOS, ứng dụng vào các kịch bản đa uplink, phân đoạn mạng và kiểm soát đường đi gói tin.</p>