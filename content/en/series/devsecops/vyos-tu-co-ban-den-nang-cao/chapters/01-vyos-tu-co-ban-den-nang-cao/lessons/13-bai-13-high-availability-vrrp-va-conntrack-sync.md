---
id: 019d65ef-d36f-773e-bf0a-9e3bbb16e57f
locale: en
title: 'Lesson 13: High Availability - VRRP and Conntrack Sync'
slug: bai-13-high-availability-vrrp-va-conntrack-sync
description: >-
  Guide to configuring High Availability on VyOS with VRRP, conntrack-sync, NAT rules for HA, failover validation, and a hands-on HA pair lab.
duration_minutes: 160
is_free: true
video_url: null
sort_order: 13
section_title: "VyOS from Basics to Advanced"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS from Basics to Advanced
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-13-ha-vrrp.webp" alt="High Availability - VRRP and Conntrack Sync" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>High Availability on VyOS: VRRP and Conntrack Sync</h2>
<p>High availability (HA) is a critical requirement in network systems. VyOS supports VRRP (Virtual Router Redundancy Protocol) and conntrack-sync to synchronize NAT/connection state between nodes.</p>
<h3>VRRP: Virtual Router Redundancy Protocol</h3>
<p>VRRP allows multiple routers to share a virtual IP address. If the primary node fails, the standby node takes over that address.</p>
<pre><code class="language-bash">set high-availability vrrp group G1 interface eth0
set high-availability vrrp group G1 virtual-address 192.168.100.254/24
set high-availability vrrp group G1 priority 200
set high-availability vrrp group G1 preempt true
set high-availability vrrp group G1 rfc-compatibility 3
</code></pre>
<h3>Conntrack Sync: NAT/connection state synchronization</h3>
<pre><code class="language-bash">set service conntrack-sync interface eth1
set service conntrack-sync accept-protocol vrrp
</code></pre>
<p>This ensures NAT sessions are not interrupted during failover.</p>
<h3>Config sync between HA peers</h3>
<pre><code class="language-bash">set service config-sync peer 192.168.100.2
set service config-sync interface eth1
</code></pre>
<h3>NAT rules for HA</h3>
<p>Apply NAT rules for the virtual IP:</p>
<pre><code class="language-bash">set nat source rule 100 outbound-interface eth0
set nat source rule 100 source address 192.168.100.0/24
set nat source rule 100 translation address masquerade
</code></pre>
<h3>Failover monitoring and control</h3>
<pre><code class="language-bash">show high-availability vrrp
show service conntrack-sync
</code></pre>
<h3>HA design: VM primary + physical backup</h3>
<p>A recommended deployment is a primary VyOS VM with a physical backup appliance for stronger reliability.</p>
<h3>Hands-on lab: VyOS HA pair with VRRP + Conntrack Sync</h3>
<ol>
  <li>Configure a VRRP group on both VyOS nodes with different priorities.</li>
  <li>Configure conntrack-sync on the internal synchronization interface.</li>
  <li>Test failover by shutting down the primary node and observe virtual IP takeover.</li>
  <li>Verify NAT/connection state after failover.</li>
</ol>
<pre><code class="language-bash"># Kiểm tra trạng thái VRRP
show high-availability vrrp
# Kiểm tra đồng bộ conntrack
show service conntrack-sync
</code></pre>
<h3>Summary</h3>
<p>This lesson helps you build HA on VyOS with VRRP, conntrack-sync, and NAT design, then validate failover behavior in practical labs to minimize downtime.</p>
