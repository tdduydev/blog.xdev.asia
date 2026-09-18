---
id: 019d65ef-d36f-773e-bf0a-9e387917d59e
locale: en
title: 'Lesson 10: Dynamic Routing - BGP'
slug: bai-10-dynamic-routing-bgp
description: >-
  Configure BGP dynamic routing on VyOS, including theory, practical examples, lab steps, and a summary.
duration_minutes: 180
is_free: true
video_url: null
sort_order: 10
section_title: "VyOS from Basics to Advanced"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS from Basics to Advanced
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-10-bgp.webp" alt="Dynamic Routing - BGP" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>Introduction to BGP on VyOS</h2>
<p>This lesson explains how to configure <strong>BGP</strong> (Border Gateway Protocol) on VyOS 1.4.x/1.5 rolling release. BGP is the standard dynamic routing protocol for large networks, ISPs, and multi-provider connectivity.</p>

<h3>1. BGP fundamentals</h3>
<ul>
  <li><strong>AS (Autonomous System)</strong>: A distinct administrative routing domain.</li>
  <li><strong>iBGP vs eBGP</strong>: iBGP (internal), eBGP (external peering).</li>
  <li><strong>Path Selection</strong>: Rules to choose the best path.</li>
</ul>

<h3>2. Basic BGP configuration</h3>
<pre><code class="language-bash">set protocols bgp 65001 parameters router-id 1.1.1.1
set protocols bgp 65001 neighbor 2.2.2.2 remote-as 65002
set protocols bgp 65001 neighbor 2.2.2.2 address-family ipv4-unicast
set protocols bgp 65001 network 192.168.10.0/24
set protocols bgp 65001 network 10.10.10.0/24
</code></pre>
<ul>
  <li><strong>Route-map, prefix-list, AS-path:</strong></li>
</ul>
<pre><code class="language-bash">set policy prefix-list PL-OUT rule 10 action permit prefix 192.168.10.0/24
set policy route-map RM-OUT rule 10 action permit
set policy route-map RM-OUT rule 10 match ip address prefix-list PL-OUT
set protocols bgp 65001 neighbor 2.2.2.2 route-map export RM-OUT
set protocols bgp 65001 neighbor 2.2.2.2 as-path-prepend '65001 65001'
</code></pre>

<h3>3. BGP Communities, Route Reflector, and IPv6</h3>
<pre><code class="language-bash">set protocols bgp 65001 neighbor 3.3.3.3 remote-as 65001
set protocols bgp 65001 neighbor 3.3.3.3 route-reflector-client
set protocols bgp 65001 neighbor 2.2.2.2 address-family ipv6-unicast
set protocols bgp 65001 neighbor 2.2.2.2 extended-nexthop
set protocols bgp 65001 neighbor 2.2.2.2 soft-reconfiguration inbound
</code></pre>

<h3>4. Verify BGP status</h3>
<pre><code class="language-bash">show ip bgp summary
show ip bgp
show ip bgp neighbors
</code></pre>

<h3>5. Example network diagram</h3>
<pre><code>+---------+     +---------+
| VyOS 1 |-----| VyOS 2 |
| AS65001|     | AS65002|
+---------+     +---------+
</code></pre>

<h3>6. Hands-on lab: BGP peering between 2 ASes</h3>
<ol>
  <li>Configure BGP on two VyOS routers with different AS numbers.</li>
  <li>Set neighbor, route-map, prefix-list, and as-path-prepend.</li>
  <li>Commit and save the configuration:</li>
</ol>
<pre><code class="language-bash">commit
save
</code></pre>
<ol start="4">
  <li>Verify BGP status and routes.</li>
</ol>
<pre><code class="language-bash">show ip bgp summary
show ip bgp
</code></pre>

<h3>7. Summary</h3>
<p>You now know how to configure BGP on VyOS and apply it to large, multi-provider networks with policy-based dynamic routing control.</p>
