---
id: 019d65ef-d36f-773e-bf0a-9e3cc2fa6f1e
locale: en
title: 'Lesson 14: WAN Load Balancing, QoS and Monitoring'
slug: bai-14-wan-load-balancing-qos-va-monitoring
description: >-
  Guide to configuring WAN load balancing, QoS, and traffic monitoring on VyOS, with a dual-WAN lab and NetFlow, SNMP, syslog, and Prometheus integration.
duration_minutes: 160
is_free: true
video_url: null
sort_order: 14
section_title: "VyOS from Basics to Advanced"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS from Basics to Advanced
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-14-wan-lb-qos.webp" alt="WAN Load Balancing, QoS and Monitoring" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>WAN Load Balancing, QoS and Monitoring on VyOS</h2>
<p>Stable Internet connectivity, bandwidth optimization, and traffic visibility are essential operational requirements. VyOS provides strong capabilities for WAN load balancing, QoS, and monitoring.</p>
<h3>WAN load balancing</h3>
<pre><code class="language-bash">set load-balancing wan rule 10 inbound-interface eth0
set load-balancing wan rule 10 interface eth1 weight 100
set load-balancing wan rule 10 interface eth2 weight 50
set load-balancing wan rule 10 failover
set load-balancing wan rule 10 exclude traffic source address 192.168.1.0/24
set load-balancing wan interface-health eth1 test 10 type ping target 8.8.8.8
set load-balancing wan interface-health eth2 test 10 type ping target 1.1.1.1
</code></pre>
<h3>QoS: traffic shaping and prioritization</h3>
<pre><code class="language-bash">set qos policy shaper SHAPER bandwidth 100mbit
set qos policy shaper SHAPER default bandwidth 80mbit
set qos policy shaper SHAPER class 10 match ip destination address 192.168.2.0/24
set qos policy shaper SHAPER class 10 bandwidth 20mbit
set interfaces ethernet eth0 qos policy shaper SHAPER
</code></pre>
<p>Prioritize VoIP and gaming traffic using CAKE or HTB.</p>
<h3>NetFlow/sFlow, SNMP, Syslog</h3>
<pre><code class="language-bash">set system flow-accounting interface eth0
set system flow-accounting netflow server 192.168.10.10 port 2055
set service snmp community public authorization ro
set service snmp listen-address 0.0.0.0
set system syslog host 192.168.10.20 facility all level info
set system syslog host 192.168.10.20 transport tls
</code></pre>
<h3>Prometheus monitoring integration</h3>
<p>VyOS can export metrics through SNMP or a containerized exporter.</p>
<h3>Hands-on lab: dual-WAN load balancing + QoS</h3>
<ol>
  <li>Configure two WAN interfaces (eth1, eth2) with load-balancing rules.</li>
  <li>Set up interface-health ping checks.</li>
  <li>Configure QoS shaper on eth0 and prioritize required traffic.</li>
  <li>Test failover by disconnecting one WAN link.</li>
  <li>Verify NetFlow, SNMP, and syslog delivery to monitoring servers.</li>
</ol>
<pre><code class="language-bash"># Kiểm tra trạng thái load balancing
show load-balancing wan
# Kiểm tra QoS
show qos
# Kiểm tra flow-accounting
show system flow-accounting
</code></pre>
<h3>Summary</h3>
<p>This lesson helps you deploy WAN load balancing, QoS, and monitoring on VyOS, with practical dual-WAN operations and integration with NetFlow, SNMP, syslog, and Prometheus for professional network operations.</p>
