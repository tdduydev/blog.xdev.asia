---
id: 019d65ef-d36f-773e-bf0a-9e37dfd74e6b
locale: ja
title: '第9課：Dynamic Routing - OSPF'
slug: bai-9-dynamic-routing-ospf
description: >-
  VyOS における OSPF 動的ルーティングの設定を、理論、実践例、ラボ、まとめとともに解説します。
duration_minutes: 170
is_free: true
video_url: null
sort_order: 9
section_title: "VyOSの基礎から応用まで"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOSの基礎から応用まで
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-09-ospf.webp" alt="Dynamic Routing - OSPF" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>VyOS における OSPF の概要</h2>
<p>このレッスンでは、VyOS 1.4.x/1.5 rolling release 上で <strong>OSPF</strong>（Open Shortest Path First）を設定する方法を学びます。OSPF は企業ネットワークで広く利用される代表的な動的ルーティングプロトコルです。</p>

<h3>1. OSPF の基礎知識</h3>
<ul>
  <li><strong>Area</strong>: OSPF ネットワークを分割するための論理領域です。</li>
  <li><strong>LSA</strong>: Link State Advertisement。Type 1、2、3 などの種類があります。</li>
  <li><strong>Cost</strong>: 経路選択に影響するメトリックです。</li>
  <li><strong>SPF</strong>: 最短経路を計算する Dijkstra アルゴリズムです。</li>
</ul>

<h3>2. OSPF の基本設定</h3>
<pre><code class="language-bash">set protocols ospf area 0 network 192.168.10.0/24
set protocols ospf area 0 network 192.168.20.0/24
set protocols ospf area 1 network 10.10.10.0/24
set protocols ospf parameters router-id 1.1.1.1
set protocols ospf passive-interface eth2
set protocols ospf redistribute connected
set protocols ospf redistribute static
</code></pre>
<ul>
  <li><strong>OSPF Unnumbered と ECMP:</strong></li>
</ul>
<pre><code class="language-bash">set protocols ospf interface eth3 network-type point-to-point
set protocols ospf parameters ecmp-limit 4
</code></pre>

<h3>3. OSPF Authentication</h3>
<pre><code class="language-bash">set protocols ospf area 0 authentication md5
set protocols ospf area 0 authentication-key-id 1 md5-key "VyOSSecret"
</code></pre>

<h3>4. OSPF 状態の確認</h3>
<pre><code class="language-bash">show ip ospf neighbor
show ip ospf route
show ip ospf database
</code></pre>

<h3>5. ネットワーク構成例</h3>
<pre><code>+---------+     +---------+     +---------+
| VyOS 1 |-----| VyOS 2 |-----| VyOS 3 |
| Area 0 |     | Area 0 |     | Area 1 |
+---------+     +---------+     +---------+
</code></pre>

<h3>6. ハンズオンラボ: OSPF Multi-Area</h3>
<ol>
  <li>図の構成に従って、3 台の VyOS ルーターに OSPF を設定します。</li>
  <li>area、router-id、network、authentication を設定します。</li>
  <li>設定を commit / save します。</li>
</ol>
<pre><code class="language-bash">commit
save
</code></pre>
<ol start="4">
  <li>OSPF の状態、neighbor、route を確認します。</li>
</ol>
<pre><code class="language-bash">show ip ospf neighbor
show ip ospf route
</code></pre>

<h3>7. まとめ</h3>
<p>このレッスンで、VyOS 上の OSPF 設定手順と、複数 area・認証・動的ルーティング制御を含む企業ネットワークでの適用方法を理解できました。</p>
