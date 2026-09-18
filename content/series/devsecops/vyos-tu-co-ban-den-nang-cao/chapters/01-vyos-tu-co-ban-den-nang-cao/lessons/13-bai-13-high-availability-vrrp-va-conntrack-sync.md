---
id: 019d65ef-d36f-773e-bf0a-9e3bbb16e57f
title: 'Bài 13: High Availability — VRRP và Conntrack Sync'
slug: bai-13-high-availability-vrrp-va-conntrack-sync
description: >-
  Hướng dẫn cấu hình High Availability trên VyOS với VRRP, conntrack-sync, NAT rules cho HA, kiểm tra failover, lab thực hành HA pair VyOS.
duration_minutes: 160
is_free: true
video_url: null
sort_order: 13
section_title: "VyOS từ Cơ bản đến Nâng cao"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS từ Cơ bản đến Nâng Cao
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-13-ha-vrrp.webp" alt="High Availability — VRRP và Conntrack Sync" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>High Availability trên VyOS: VRRP và Conntrack Sync</h2>
<p>Đảm bảo tính sẵn sàng cao (HA) là yêu cầu quan trọng cho hệ thống mạng. VyOS hỗ trợ VRRP (Virtual Router Redundancy Protocol) và conntrack-sync để đồng bộ trạng thái NAT/connection giữa các node.</p>
<h3>VRRP: Virtual Router Redundancy Protocol</h3>
<p>VRRP cho phép nhiều router chia sẻ một địa chỉ ảo (virtual IP), khi node chính gặp sự cố, node dự phòng sẽ tiếp quản IP này.</p>
<pre><code class="language-bash">set high-availability vrrp group G1 interface eth0
set high-availability vrrp group G1 virtual-address 192.168.100.254/24
set high-availability vrrp group G1 priority 200
set high-availability vrrp group G1 preempt true
set high-availability vrrp group G1 rfc-compatibility 3
</code></pre>
<h3>Conntrack Sync: Đồng bộ trạng thái NAT/Connection</h3>
<pre><code class="language-bash">set service conntrack-sync interface eth1
set service conntrack-sync accept-protocol vrrp
</code></pre>
<p>Đảm bảo các kết nối NAT không bị gián đoạn khi failover.</p>
<h3>Config Sync giữa HA Pair</h3>
<pre><code class="language-bash">set service config-sync peer 192.168.100.2
set service config-sync interface eth1
</code></pre>
<h3>NAT Rules cho HA</h3>
<p>Áp dụng NAT rule cho virtual IP:</p>
<pre><code class="language-bash">set nat source rule 100 outbound-interface eth0
set nat source rule 100 source address 192.168.100.0/24
set nat source rule 100 translation address masquerade
</code></pre>
<h3>Kiểm tra và kiểm soát Failover</h3>
<pre><code class="language-bash">show high-availability vrrp
show service conntrack-sync
</code></pre>
<h3>Thiết kế HA: VM primary + physical backup</h3>
<p>Khuyến nghị triển khai VyOS chính trên VM, backup trên thiết bị vật lý để tăng độ tin cậy.</p>
<h3>Lab thực hành: HA Pair VyOS với VRRP + Conntrack Sync</h3>
<ol>
  <li>Cấu hình VRRP group trên cả hai VyOS, chọn priority khác nhau.</li>
  <li>Cấu hình conntrack-sync trên interface kết nối nội bộ.</li>
  <li>Kiểm tra failover bằng cách shutdown node chính, quan sát virtual IP chuyển sang node dự phòng.</li>
  <li>Kiểm tra trạng thái NAT/connection sau failover.</li>
</ol>
<pre><code class="language-bash"># Kiểm tra trạng thái VRRP
show high-availability vrrp
# Kiểm tra đồng bộ conntrack
show service conntrack-sync
</code></pre>
<h3>Tổng kết</h3>
<p>Bài này giúp bạn cấu hình HA trên VyOS với VRRP, conntrack-sync, NAT rules, kiểm tra failover và thực hành lab thực tế. Đảm bảo hệ thống mạng luôn sẵn sàng, giảm downtime tối đa.</p>