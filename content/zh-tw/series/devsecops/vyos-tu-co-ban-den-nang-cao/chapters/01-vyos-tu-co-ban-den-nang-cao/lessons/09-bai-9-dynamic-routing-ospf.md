---
id: 019d65ef-d36f-773e-bf0a-9e37dfd74e6b
locale: zh-tw
title: '第9課：Dynamic Routing - OSPF'
slug: bai-9-dynamic-routing-ospf
description: >-
  在 VyOS 上設定 OSPF 動態路由，涵蓋理論、實務範例、實作實驗與總結。
duration_minutes: 170
is_free: true
video_url: null
sort_order: 9
section_title: "VyOS 從入門到進階"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS 從入門到進階
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-09-ospf.webp" alt="Dynamic Routing - OSPF" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>VyOS 上的 OSPF 介紹</h2>
<p>本課程將說明如何在 VyOS 1.4.x/1.5 rolling release 上設定 <strong>OSPF</strong>（Open Shortest Path First）。OSPF 是企業網路中常見且重要的動態路由協定。</p>

<h3>1. OSPF 基礎觀念</h3>
<ul>
  <li><strong>Area</strong>：用於切分 OSPF 網路的邏輯區域。</li>
  <li><strong>LSA</strong>：Link State Advertisement，包含 Type 1、2、3 等類型。</li>
  <li><strong>Cost</strong>：路徑權重，會影響路由選擇。</li>
  <li><strong>SPF</strong>：使用 Dijkstra 演算法計算最短路徑。</li>
</ul>

<h3>2. OSPF 基本設定</h3>
<pre><code class="language-bash">set protocols ospf area 0 network 192.168.10.0/24
set protocols ospf area 0 network 192.168.20.0/24
set protocols ospf area 1 network 10.10.10.0/24
set protocols ospf parameters router-id 1.1.1.1
set protocols ospf passive-interface eth2
set protocols ospf redistribute connected
set protocols ospf redistribute static
</code></pre>
<ul>
  <li><strong>OSPF Unnumbered 與 ECMP：</strong></li>
</ul>
<pre><code class="language-bash">set protocols ospf interface eth3 network-type point-to-point
set protocols ospf parameters ecmp-limit 4
</code></pre>

<h3>3. OSPF Authentication</h3>
<pre><code class="language-bash">set protocols ospf area 0 authentication md5
set protocols ospf area 0 authentication-key-id 1 md5-key "VyOSSecret"
</code></pre>

<h3>4. 檢查 OSPF 狀態</h3>
<pre><code class="language-bash">show ip ospf neighbor
show ip ospf route
show ip ospf database
</code></pre>

<h3>5. 範例網路拓撲</h3>
<pre><code>+---------+     +---------+     +---------+
| VyOS 1 |-----| VyOS 2 |-----| VyOS 3 |
| Area 0 |     | Area 0 |     | Area 1 |
+---------+     +---------+     +---------+
</code></pre>

<h3>6. 實作實驗：OSPF Multi-Area</h3>
<ol>
  <li>依照拓撲在 3 台 VyOS 路由器上設定 OSPF。</li>
  <li>設定 area、router-id、network、authentication。</li>
  <li>提交並儲存設定：</li>
</ol>
<pre><code class="language-bash">commit
save
</code></pre>
<ol start="4">
  <li>檢查 OSPF 狀態、鄰居與路由。</li>
</ol>
<pre><code class="language-bash">show ip ospf neighbor
show ip ospf route
</code></pre>

<h3>7. 總結</h3>
<p>你已學會在 VyOS 上設定 OSPF，並可應用於多區域、含驗證機制的企業級動態路由環境。</p>
