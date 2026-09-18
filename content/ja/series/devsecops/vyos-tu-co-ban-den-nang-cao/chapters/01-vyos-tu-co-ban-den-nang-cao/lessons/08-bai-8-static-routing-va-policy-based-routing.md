---
id: 019d65ef-d36f-773e-bf0a-9e36c62f858f
locale: ja
title: '第8課：Static Routing と Policy-Based Routing'
slug: bai-8-static-routing-va-policy-based-routing
description: >-
  VyOS における Static Routing と Policy-Based Routing の設定方法を、実践例、ラボ、まとめとともに解説します。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 8
section_title: "VyOSの基礎から応用まで"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOSの基礎から応用まで
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-08-routing-pbr.webp" alt="Static Routing と Policy-Based Routing" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>VyOS における Static Routing と Policy-Based Routing の概要</h2>
<p>このレッスンでは、VyOS 1.4.x/1.5 rolling release での <strong>Static Routing</strong>（静的ルーティング）と <strong>Policy-Based Routing</strong>（ポリシーベースルーティング）の設定を解説します。これらは、ネットワーク内でパケット経路を制御するための重要な技術です。</p>

<h3>1. 静的ルーティング（Static Routing）</h3>
<p>Static route を使用すると、宛先ネットワークへの固定経路を指定できます。</p>
<pre><code class="language-bash">set protocols static route 10.10.20.0/24 next-hop 192.168.10.2
set protocols static route 0.0.0.0/0 next-hop 192.168.10.254
set protocols static route 192.168.30.0/24 blackhole
</code></pre>
<ul>
  <li><strong>インターフェースヘルス連動のフェイルオーバールート:</strong></li>
</ul>
<pre><code class="language-bash">set protocols static route 0.0.0.0/0 next-hop 192.168.10.254
set protocols static route 0.0.0.0/0 next-hop 192.168.20.254 distance 10
set protocols static route 0.0.0.0/0 next-hop 192.168.20.254 check-gateway ping
</code></pre>

<h3>2. Policy-Based Routing（PBR）</h3>
<p>PBR を使うと、送信元、宛先、プロトコル、ポートに基づいてルーティングできます。</p>
<pre><code class="language-bash">set policy route PBR-OUT rule 10 source address 192.168.10.0/24
set policy route PBR-OUT rule 10 set table 100
set interfaces ethernet eth0 policy route PBR-OUT
set protocols static table 100 route 0.0.0.0/0 next-hop 203.0.113.1
</code></pre>
<ul>
  <li><strong>送信元ベースのマルチアップリンクルーティング:</strong></li>
</ul>
<pre><code class="language-bash">set policy route MULTI-WAN rule 20 source address 192.168.20.0/24
set policy route MULTI-WAN rule 20 set table 200
set protocols static table 200 route 0.0.0.0/0 next-hop 198.51.100.1
</code></pre>

<h3>3. 基本 VRF（Virtual Routing and Forwarding）</h3>
<pre><code class="language-bash">set vrf name VRF1 table 10
set interfaces ethernet eth2 vrf VRF1
set protocols static table 10 route 0.0.0.0/0 next-hop 10.10.10.2
</code></pre>

<h3>4. 実践例とネットワーク図</h3>
<pre><code>+-------------------+      +-------------------+
|   VyOS Router     |------|   ISP1           |
| 192.168.10.1/24   |      | 203.0.113.1      |
| 192.168.20.1/24   |      +------------------+
+-------------------+      +------------------+
           |                        |
      LAN, WAN1, WAN2           Internet
</code></pre>

<h3>5. ハンズオンラボ: Static Routing と PBR</h3>
<ol>
  <li>VyOS にログインし、インターフェースとアップリンクを確認します。</li>
  <li>上記のとおり static route、PBR、VRF を設定します。</li>
  <li>設定を commit / save します。</li>
</ol>
<pre><code class="language-bash">commit
save
</code></pre>
<ol start="4">
  <li>ルーティングを確認します。</li>
</ol>
<pre><code class="language-bash">show ip route
show policy route
show vrf
</code></pre>

<h3>6. まとめ</h3>
<p>このレッスンで、VyOS における静的ルーティング、policy-based routing、VRF の設定方法を理解できました。マルチアップリンク構成、ネットワーク分離、パケット経路制御のシナリオに適用できます。</p>
