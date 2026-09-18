---
id: 019d65ef-d36f-773e-bf0a-9e36c62f858f
locale: zh-tw
title: '第8課：Static Routing 與 Policy-Based Routing'
slug: bai-8-static-routing-va-policy-based-routing
description: >-
  在 VyOS 上設定 Static Routing 與 Policy-Based Routing，包含實務範例、實作實驗與重點總結。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 8
section_title: "VyOS 從入門到進階"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS 從入門到進階
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-08-routing-pbr.webp" alt="Static Routing 與 Policy-Based Routing" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>VyOS 上的 Static Routing 與 Policy-Based Routing 介紹</h2>
<p>本課程說明如何在 VyOS 1.4.x/1.5 rolling release 上設定 <strong>Static Routing</strong>（靜態路由）與 <strong>Policy-Based Routing</strong>（依政策路由）。這些技術是控制網路封包路徑的核心能力。</p>

<h3>1. 靜態路由（Static Routing）</h3>
<p>Static route 可讓你為目標網段指定固定路徑。</p>
<pre><code class="language-bash">set protocols static route 10.10.20.0/24 next-hop 192.168.10.2
set protocols static route 0.0.0.0/0 next-hop 192.168.10.254
set protocols static route 192.168.30.0/24 blackhole
</code></pre>
<ul>
  <li><strong>搭配介面健康檢查的備援路由：</strong></li>
</ul>
<pre><code class="language-bash">set protocols static route 0.0.0.0/0 next-hop 192.168.10.254
set protocols static route 0.0.0.0/0 next-hop 192.168.20.254 distance 10
set protocols static route 0.0.0.0/0 next-hop 192.168.20.254 check-gateway ping
</code></pre>

<h3>2. Policy-Based Routing（PBR）</h3>
<p>PBR 可依來源、目的地、協定或連接埠進行路由決策。</p>
<pre><code class="language-bash">set policy route PBR-OUT rule 10 source address 192.168.10.0/24
set policy route PBR-OUT rule 10 set table 100
set interfaces ethernet eth0 policy route PBR-OUT
set protocols static table 100 route 0.0.0.0/0 next-hop 203.0.113.1
</code></pre>
<ul>
  <li><strong>依來源進行多 uplink 路由：</strong></li>
</ul>
<pre><code class="language-bash">set policy route MULTI-WAN rule 20 source address 192.168.20.0/24
set policy route MULTI-WAN rule 20 set table 200
set protocols static table 200 route 0.0.0.0/0 next-hop 198.51.100.1
</code></pre>

<h3>3. 基礎 VRF（Virtual Routing and Forwarding）</h3>
<pre><code class="language-bash">set vrf name VRF1 table 10
set interfaces ethernet eth2 vrf VRF1
set protocols static table 10 route 0.0.0.0/0 next-hop 10.10.10.2
</code></pre>

<h3>4. 實務範例與網路拓撲</h3>
<pre><code>+-------------------+      +-------------------+
|   VyOS Router     |------|   ISP1           |
| 192.168.10.1/24   |      | 203.0.113.1      |
| 192.168.20.1/24   |      +------------------+
+-------------------+      +------------------+
           |                        |
      LAN, WAN1, WAN2           Internet
</code></pre>

<h3>5. 實作實驗：Static Routing 與 PBR</h3>
<ol>
  <li>登入 VyOS，確認各介面與 uplink。</li>
  <li>依上方範例設定 static route、PBR、VRF。</li>
  <li>提交並儲存設定：</li>
</ol>
<pre><code class="language-bash">commit
save
</code></pre>
<ol start="4">
  <li>檢查路由狀態：</li>
</ol>
<pre><code class="language-bash">show ip route
show policy route
show vrf
</code></pre>

<h3>6. 總結</h3>
<p>你已學會在 VyOS 上設定靜態路由、policy-based routing 與 VRF，並可應用於多 uplink、網段分流與封包路徑控制等場景。</p>
