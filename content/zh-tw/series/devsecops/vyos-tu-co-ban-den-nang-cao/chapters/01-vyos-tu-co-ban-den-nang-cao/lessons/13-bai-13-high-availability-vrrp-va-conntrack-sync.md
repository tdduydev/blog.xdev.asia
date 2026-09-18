---
id: 019d65ef-d36f-773e-bf0a-9e3bbb16e57f
title: '第13課：高可用性——VRRP和Conntrack Sync'
slug: bai-13-high-availability-vrrp-va-conntrack-sync
description: >-
  在VyOS上配置高可用性，使用VRRP、conntrack-sync、HA的NAT規則、故障轉移檢查、HA對VyOS實驗室練習。
duration_minutes: 160
is_free: true
video_url: null
sort_order: 13
section_title: "VyOS：從基礎到進階"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS：從基礎到進階
  slug: vyos-tu-co-ban-den-nang-cao
locale: zh-tw
---
<img src="/storage/uploads/2026/04/vyos-13-ha-vrrp.webp" alt="高可用性——VRRP和Conntrack Sync" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>VyOS上的高可用性：VRRP和Conntrack Sync</h2>
<p>確保高可用性是網路系統的重要要求。VyOS支援VRRP（虛擬路由器冗餘協定）和conntrack-sync，以在節點之間同步NAT/連接狀態。</p>
<h3>VRRP：虛擬路由器冗餘協定</h3>
<p>VRRP允許多個路由器共享一個虛擬位址，當主節點故障時，備用節點將接管該IP。</p>
<pre><code class="language-bash">set high-availability vrrp group G1 interface eth0
set high-availability vrrp group G1 virtual-address 192.168.100.254/24
set high-availability vrrp group G1 priority 200
set high-availability vrrp group G1 preempt true
set high-availability vrrp group G1 rfc-compatibility 3
</code></pre>
<h3>Conntrack Sync：同步NAT/連接狀態</h3>
<pre><code class="language-bash">set service conntrack-sync interface eth1
set service conntrack-sync accept-protocol vrrp
</code></pre>
<p>確保NAT連接在故障轉移時不被中斷。</p>
<h3>HA對之間的設定同步</h3>
<pre><code class="language-bash">set service config-sync peer 192.168.100.2
set service config-sync interface eth1
</code></pre>
<h3>HA的NAT規則</h3>
<p>為虛擬IP應用NAT規則：</p>
<pre><code class="language-bash">set nat source rule 100 outbound-interface eth0
set nat source rule 100 source address 192.168.100.0/24
set nat source rule 100 translation address masquerade
</code></pre>
<h3>檢查和控制故障轉移</h3>
<pre><code class="language-bash">show high-availability vrrp
show service conntrack-sync
</code></pre>
<h3>HA設計：VM主要 + 物理備用</h3>
<p>建議將VyOS主要部署在VM上，備用部署在物理設備上以提高可靠性。</p>
<h3>實踐實驗室：使用VRRP + Conntrack Sync的HA對</h3>
<ol>
  <li>在兩個VyOS上配置VRRP群組，選擇不同的優先級。</li>
  <li>在內部連接介面上配置conntrack-sync。</li>
  <li>通過關閉主節點測試故障轉移，觀察虛擬IP轉移到備用節點。</li>
  <li>檢查故障轉移後的NAT/連接狀態。</li>
</ol>
<pre><code class="language-bash"># 檢查VRRP狀態
show high-availability vrrp
# 檢查conntrack同步
show service conntrack-sync
</code></pre>
<h3>總結</h3>
<p>本課程幫助您在VyOS上配置HA（使用VRRP、conntrack-sync、NAT規則）、檢查故障轉移、進行實際的HA對實驗室練習，確保網路系統始終可用，將停機時間最小化。</p>