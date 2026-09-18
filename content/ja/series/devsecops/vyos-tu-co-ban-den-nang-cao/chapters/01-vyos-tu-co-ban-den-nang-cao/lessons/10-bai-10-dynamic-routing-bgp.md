---
id: 019d65ef-d36f-773e-bf0a-9e387917d59e
locale: ja
title: '第10課：Dynamic Routing - BGP'
slug: bai-10-dynamic-routing-bgp
description: >-
  VyOS における BGP 動的ルーティングの設定を、理論、実践例、ラボ、まとめとともに解説します。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 10
section_title: "VyOSの基礎から応用まで"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOSの基礎から応用まで
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-10-bgp.webp" alt="Dynamic Routing - BGP" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>VyOS における BGP の概要</h2>
<p>このレッスンでは、VyOS 1.4.x/1.5 rolling release での <strong>BGP</strong>（Border Gateway Protocol）設定を解説します。BGP は大規模ネットワーク、ISP、マルチプロバイダー接続で標準的に使われる動的ルーティングプロトコルです。</p>

<h3>1. BGP の基礎知識</h3>
<ul>
  <li><strong>AS (Autonomous System)</strong>: 自律システム。</li>
  <li><strong>iBGP vs eBGP</strong>: iBGP（内部）、eBGP（外部ピアリング）。</li>
  <li><strong>Path Selection</strong>: 最適経路を選択するルール。</li>
</ul>

<h3>2. BGP の基本設定</h3>
<pre><code class="language-bash">set protocols bgp 65001 parameters router-id 1.1.1.1
set protocols bgp 65001 neighbor 2.2.2.2 remote-as 65002
set protocols bgp 65001 neighbor 2.2.2.2 address-family ipv4-unicast
set protocols bgp 65001 network 192.168.10.0/24
set protocols bgp 65001 network 10.10.10.0/24
</code></pre>
<ul>
  <li><strong>Route-map、prefix-list、AS-path:</strong></li>
</ul>
<pre><code class="language-bash">set policy prefix-list PL-OUT rule 10 action permit prefix 192.168.10.0/24
set policy route-map RM-OUT rule 10 action permit
set policy route-map RM-OUT rule 10 match ip address prefix-list PL-OUT
set protocols bgp 65001 neighbor 2.2.2.2 route-map export RM-OUT
set protocols bgp 65001 neighbor 2.2.2.2 as-path-prepend '65001 65001'
</code></pre>

<h3>3. BGP Communities、Route Reflector、IPv6</h3>
<pre><code class="language-bash">set protocols bgp 65001 neighbor 3.3.3.3 remote-as 65001
set protocols bgp 65001 neighbor 3.3.3.3 route-reflector-client
set protocols bgp 65001 neighbor 2.2.2.2 address-family ipv6-unicast
set protocols bgp 65001 neighbor 2.2.2.2 extended-nexthop
set protocols bgp 65001 neighbor 2.2.2.2 soft-reconfiguration inbound
</code></pre>

<h3>4. BGP 状態の確認</h3>
<pre><code class="language-bash">show ip bgp summary
show ip bgp
show ip bgp neighbors
</code></pre>

<h3>5. ネットワーク構成例</h3>
<pre><code>+---------+     +---------+
| VyOS 1 |-----| VyOS 2 |
| AS65001|     | AS65002|
+---------+     +---------+
</code></pre>

<h3>6. ハンズオンラボ: 2 AS 間 BGP Peering</h3>
<ol>
  <li>異なる AS を持つ 2 台の VyOS に BGP を設定します。</li>
  <li>neighbor、route-map、prefix-list、as-path-prepend を設定します。</li>
  <li>設定を commit / save します。</li>
</ol>
<pre><code class="language-bash">commit
save
</code></pre>
<ol start="4">
  <li>BGP 状態とルートを確認します。</li>
</ol>
<pre><code class="language-bash">show ip bgp summary
show ip bgp
</code></pre>

<h3>7. まとめ</h3>
<p>このレッスンで、VyOS 上の BGP 設定と、大規模・マルチプロバイダー環境における動的ルーティングポリシー制御の適用方法を理解できました。</p>
