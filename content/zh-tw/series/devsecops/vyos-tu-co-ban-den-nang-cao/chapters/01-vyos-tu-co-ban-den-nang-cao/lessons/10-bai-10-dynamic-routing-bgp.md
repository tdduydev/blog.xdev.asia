---
id: 019d65ef-d36f-773e-bf0a-9e387917d59e
locale: zh-tw
title: '第10課：Dynamic Routing - BGP'
slug: bai-10-dynamic-routing-bgp
description: >-
  在 VyOS 上設定 BGP 動態路由，涵蓋理論、實務範例、實作實驗與總結。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 10
section_title: "VyOS 從入門到進階"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS 從入門到進階
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-10-bgp.webp" alt="Dynamic Routing - BGP" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>VyOS 上的 BGP 介紹</h2>
<p>本課程將說明如何在 VyOS 1.4.x/1.5 rolling release 上設定 <strong>BGP</strong>（Border Gateway Protocol）。BGP 是大型網路、ISP 與多供應商互聯的標準動態路由協定。</p>

<h3>1. BGP 基礎觀念</h3>
<ul>
  <li><strong>AS (Autonomous System)</strong>：自治系統。</li>
  <li><strong>iBGP vs eBGP</strong>：iBGP（內部）、eBGP（外部互聯）。</li>
  <li><strong>Path Selection</strong>：最佳路徑選擇規則。</li>
</ul>

<h3>2. BGP 基本設定</h3>
<pre><code class="language-bash">set protocols bgp 65001 parameters router-id 1.1.1.1
set protocols bgp 65001 neighbor 2.2.2.2 remote-as 65002
set protocols bgp 65001 neighbor 2.2.2.2 address-family ipv4-unicast
set protocols bgp 65001 network 192.168.10.0/24
set protocols bgp 65001 network 10.10.10.0/24
</code></pre>
<ul>
  <li><strong>Route-map、prefix-list、AS-path：</strong></li>
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

<h3>4. 檢查 BGP 狀態</h3>
<pre><code class="language-bash">show ip bgp summary
show ip bgp
show ip bgp neighbors
</code></pre>

<h3>5. 範例網路拓撲</h3>
<pre><code>+---------+     +---------+
| VyOS 1 |-----| VyOS 2 |
| AS65001|     | AS65002|
+---------+     +---------+
</code></pre>

<h3>6. 實作實驗：2 個 AS 的 BGP Peering</h3>
<ol>
  <li>在 2 台不同 AS 的 VyOS 上設定 BGP。</li>
  <li>設定 neighbor、route-map、prefix-list、as-path-prepend。</li>
  <li>提交並儲存設定：</li>
</ol>
<pre><code class="language-bash">commit
save
</code></pre>
<ol start="4">
  <li>檢查 BGP 狀態與路由。</li>
</ol>
<pre><code class="language-bash">show ip bgp summary
show ip bgp
</code></pre>

<h3>7. 總結</h3>
<p>你已學會在 VyOS 上設定 BGP，並可應用於大型、多供應商網路中的動態路由策略控制。</p>
