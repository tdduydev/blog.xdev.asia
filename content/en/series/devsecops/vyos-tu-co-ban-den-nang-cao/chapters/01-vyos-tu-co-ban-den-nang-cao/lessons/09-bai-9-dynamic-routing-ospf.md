---
id: 019d65ef-d36f-773e-bf0a-9e37dfd74e6b
locale: en
title: 'Lesson 9: Dynamic Routing - OSPF'
slug: bai-9-dynamic-routing-ospf
description: >-
  Configure OSPF dynamic routing on VyOS, including theory, practical examples, lab steps, and a summary.
duration_minutes: 170
is_free: true
video_url: null
sort_order: 9
section_title: "VyOS from Basics to Advanced"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS from Basics to Advanced
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-09-ospf.webp" alt="Dynamic Routing - OSPF" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>Introduction to OSPF on VyOS</h2>
<p>This lesson walks through configuring <strong>OSPF</strong> (Open Shortest Path First) on VyOS 1.4.x/1.5 rolling release. OSPF is a common dynamic routing protocol in enterprise networks.</p>

<h3>1. OSPF fundamentals</h3>
<ul>
  <li><strong>Area</strong>: A logical domain used to divide an OSPF network.</li>
  <li><strong>LSA</strong>: Link State Advertisement, with types such as Type 1, 2, 3, etc.</li>
  <li><strong>Cost</strong>: Path weight that influences route selection.</li>
  <li><strong>SPF</strong>: Dijkstra algorithm used to compute shortest paths.</li>
</ul>

<h3>2. Basic OSPF configuration</h3>
<pre><code class="language-bash">set protocols ospf area 0 network 192.168.10.0/24
set protocols ospf area 0 network 192.168.20.0/24
set protocols ospf area 1 network 10.10.10.0/24
set protocols ospf parameters router-id 1.1.1.1
set protocols ospf passive-interface eth2
set protocols ospf redistribute connected
set protocols ospf redistribute static
</code></pre>
<ul>
  <li><strong>OSPF Unnumbered and ECMP:</strong></li>
</ul>
<pre><code class="language-bash">set protocols ospf interface eth3 network-type point-to-point
set protocols ospf parameters ecmp-limit 4
</code></pre>

<h3>3. OSPF Authentication</h3>
<pre><code class="language-bash">set protocols ospf area 0 authentication md5
set protocols ospf area 0 authentication-key-id 1 md5-key "VyOSSecret"
</code></pre>

<h3>4. Verify OSPF status</h3>
<pre><code class="language-bash">show ip ospf neighbor
show ip ospf route
show ip ospf database
</code></pre>

<h3>5. Example network diagram</h3>
<pre><code>+---------+     +---------+     +---------+
| VyOS 1 |-----| VyOS 2 |-----| VyOS 3 |
| Area 0 |     | Area 0 |     | Area 1 |
+---------+     +---------+     +---------+
</code></pre>

<h3>6. Hands-on lab: OSPF Multi-Area</h3>
<ol>
  <li>Configure OSPF on three VyOS routers as shown in the diagram.</li>
  <li>Set area, router-id, networks, and authentication.</li>
  <li>Commit and save the configuration:</li>
</ol>
<pre><code class="language-bash">commit
save
</code></pre>
<ol start="4">
  <li>Check OSPF state, neighbors, and routes.</li>
</ol>
<pre><code class="language-bash">show ip ospf neighbor
show ip ospf route
</code></pre>

<h3>7. Summary</h3>
<p>You now know how to configure OSPF on VyOS and apply it to enterprise networks with multiple areas, authentication, and dynamic routing control.</p>
