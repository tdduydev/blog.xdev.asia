---
id: 019d65ef-d36f-773e-bf0a-9e354f8246f3
title: 'Lesson 7: VLANs, Bonding and Bridge'
slug: bai-7-vlans-bonding-va-bridge
description: >-
  Configuring VLANs, Bonding, and Bridge on VyOS — network segmentation practice, lab, and knowledge summary.
duration_minutes: 150
is_free: true
video_url: null
sort_order: 7
section_title: "VyOS from Basics to Advanced"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS from Basics to Advanced
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-07-vlans.webp" alt="VLANs, Bonding và Bridge" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>Giới thiệu về VLANs, Bonding và Bridge trên VyOS</h2>
<p>Bài học này hướng dẫn cấu hình <strong>VLANs (802.1Q)</strong>, <strong>Bonding</strong> (gộp nhiều interface vật lý) và <strong>Bridge</strong> (cầu nối mạng) trên VyOS 1.4.x/1.5 rolling release. Đây là các kỹ thuật quan trọng để phân đoạn, tối ưu và mở rộng mạng LAN.</p>

<h3>1. Cấu hình VLANs (802.1Q)</h3>
<p>VLAN giúp phân chia mạng vật lý thành nhiều mạng logic, tăng bảo mật và hiệu quả quản lý.</p>
<pre><code class="language-bash">set interfaces ethernet eth0 vif 10 address 192.168.10.1/24
set interfaces ethernet eth0 vif 20 address 192.168.20.1/24
</code></pre>
<ul>
  <li><strong>Router-on-a-stick (Inter-VLAN Routing):</strong></li>
</ul>
<pre><code class="language-bash">set interfaces ethernet eth0 vif 30 address 192.168.30.1/24
</code></pre>
<p>Trên switch, cấu hình trunk port cho eth0, access port cho các VLAN.</p>

<h3>2. Cấu hình Bonding (Gộp nhiều interface)</h3>
<p>Bonding giúp tăng băng thông và dự phòng bằng cách gộp nhiều interface vật lý.</p>
<pre><code class="language-bash">set interfaces bonding bond0 mode 802.3ad
set interfaces bonding bond0 member interface eth1
set interfaces bonding bond0 member interface eth2
set interfaces bonding bond0 address 10.10.10.1/24
</code></pre>
<p>Chế độ <strong>802.3ad (LACP)</strong> yêu cầu switch hỗ trợ LACP.</p>

<h3>3. Cấu hình Bridge Interface</h3>
<p>Bridge giúp kết nối nhiều interface vật lý hoặc VLAN thành một mạng logic.</p>
<pre><code class="language-bash">set interfaces bridge br0 member interface eth3
set interfaces bridge br0 member interface eth4
set interfaces bridge br0 address 192.168.50.1/24
</code></pre>

<h3>4. Kết hợp VLANs với Bridge và Firewall Zones</h3>
<p>Có thể kết hợp bridge với các VLAN để phân vùng mạng, ví dụ:</p>
<pre><code class="language-bash">set interfaces bridge br1 member interface eth0.10
set interfaces bridge br1 member interface eth5
set interfaces bridge br1 address 192.168.60.1/24
</code></pre>
<p>Kết hợp với firewall zone để kiểm soát truy cập giữa các phân đoạn.</p>

<h3>5. Thực hành: Phân đoạn LAN/GUEST/IoT</h3>
<pre><code>+-------------------+
|   VyOS Router     |
|                   |
|  eth0 (trunk)     |
+--------+----------+
         |
   +-----+-----+
   |   Switch  |
   +-----+-----+
         |
   +-----+-----+
   |   PC LAN  | (VLAN 10)
   +-----------+
   |   PC Guest| (VLAN 20)
   +-----------+
   |   IoT Dev | (VLAN 30)
   +-----------+
</code></pre>

<h3>6. Hands-on Lab: Cấu hình VLAN, Bonding, Bridge</h3>
<ol>
  <li>Đăng nhập VyOS, xác định các interface vật lý.</li>
  <li>Cấu hình VLANs, bonding, bridge như trên.</li>
  <li>Commit và save cấu hình:</li>
</ol>
<pre><code class="language-bash">commit
save
</code></pre>
<ol start="4">
  <li>Cấu hình switch trunk/access phù hợp.</li>
  <li>Kiểm tra kết nối giữa các VLAN, bridge.</li>
</ol>
<pre><code class="language-bash">show interfaces
show bridge br0
</code></pre>

<h3>7. Summary</h3>
<p>Bạn đã biết cách cấu hình VLANs, bonding và bridge trên VyOS, ứng dụng vào phân đoạn mạng, tăng dự phòng và tối ưu hệ thống.</p>