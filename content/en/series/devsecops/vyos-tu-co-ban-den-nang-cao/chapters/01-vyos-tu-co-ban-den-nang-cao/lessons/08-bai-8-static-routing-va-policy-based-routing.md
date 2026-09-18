---
id: 019d65ef-d36f-773e-bf0a-9e36c62f858f
locale: en
title: 'Lesson 8: Static Routing and Policy-Based Routing'
slug: bai-8-static-routing-va-policy-based-routing
description: >-
  Configure Static Routing and Policy-Based Routing on VyOS, with practical examples, lab steps, and a summary.
duration_minutes: 150
is_free: true
video_url: null
sort_order: 8
section_title: "VyOS from Basics to Advanced"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS from Basics to Advanced
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-08-routing-pbr.webp" alt="Static Routing and Policy-Based Routing" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>Introduction to Static Routing and Policy-Based Routing on VyOS</h2>
<p>This lesson explains how to configure <strong>Static Routing</strong> and <strong>Policy-Based Routing</strong> on VyOS 1.4.x/1.5 rolling release. These are essential techniques for controlling packet paths in a network.</p>

<h3>1. Static Routing</h3>
<p>Static routes let you define fixed paths for destination networks.</p>
<pre><code class="language-bash">set protocols static route 10.10.20.0/24 next-hop 192.168.10.2
set protocols static route 0.0.0.0/0 next-hop 192.168.10.254
set protocols static route 192.168.30.0/24 blackhole
</code></pre>
<ul>
  <li><strong>Failover routes with interface health checks:</strong></li>
</ul>
<pre><code class="language-bash">set protocols static route 0.0.0.0/0 next-hop 192.168.10.254
set protocols static route 0.0.0.0/0 next-hop 192.168.20.254 distance 10
set protocols static route 0.0.0.0/0 next-hop 192.168.20.254 check-gateway ping
</code></pre>

<h3>2. Policy-Based Routing (PBR)</h3>
<p>PBR lets you route traffic based on source, destination, protocol, or port.</p>
<pre><code class="language-bash">set policy route PBR-OUT rule 10 source address 192.168.10.0/24
set policy route PBR-OUT rule 10 set table 100
set interfaces ethernet eth0 policy route PBR-OUT
set protocols static table 100 route 0.0.0.0/0 next-hop 203.0.113.1
</code></pre>
<ul>
  <li><strong>Multi-uplink routing by source:</strong></li>
</ul>
<pre><code class="language-bash">set policy route MULTI-WAN rule 20 source address 192.168.20.0/24
set policy route MULTI-WAN rule 20 set table 200
set protocols static table 200 route 0.0.0.0/0 next-hop 198.51.100.1
</code></pre>

<h3>3. Basic VRF (Virtual Routing and Forwarding)</h3>
<pre><code class="language-bash">set vrf name VRF1 table 10
set interfaces ethernet eth2 vrf VRF1
set protocols static table 10 route 0.0.0.0/0 next-hop 10.10.10.2
</code></pre>

<h3>4. Practical example and network diagram</h3>
<pre><code>+-------------------+      +-------------------+
|   VyOS Router     |------|   ISP1           |
| 192.168.10.1/24   |      | 203.0.113.1      |
| 192.168.20.1/24   |      +------------------+
+-------------------+      +------------------+
           |                        |
      LAN, WAN1, WAN2           Internet
</code></pre>

<h3>5. Hands-on lab: Static Routing & PBR</h3>
<ol>
  <li>Log in to VyOS and identify interfaces and uplinks.</li>
  <li>Configure static routes, PBR, and VRF as shown above.</li>
  <li>Commit and save the configuration:</li>
</ol>
<pre><code class="language-bash">commit
save
</code></pre>
<ol start="4">
  <li>Verify routing:</li>
</ol>
<pre><code class="language-bash">show ip route
show policy route
show vrf
</code></pre>

<h3>6. Summary</h3>
<p>You now know how to configure static routing, policy-based routing, and VRF on VyOS, and apply them to multi-uplink designs, network segmentation, and packet path control.</p>
