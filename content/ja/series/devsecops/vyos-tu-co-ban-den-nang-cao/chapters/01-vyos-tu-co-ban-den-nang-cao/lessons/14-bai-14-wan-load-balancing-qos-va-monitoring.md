---
id: 019d65ef-d36f-773e-bf0a-9e3cc2fa6f1e
locale: ja
title: '第14課：WAN Load Balancing、QoS と Monitoring'
slug: bai-14-wan-load-balancing-qos-va-monitoring
description: >-
  VyOS における WAN 負荷分散、QoS、トラフィック監視の設定を、dual-WAN 実習、NetFlow、SNMP、syslog、Prometheus とともに解説します。
duration_minutes: 160
is_free: true
video_url: null
sort_order: 14
section_title: "VyOSの基礎から応用まで"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOSの基礎から応用まで
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-14-wan-lb-qos.webp" alt="WAN Load Balancing、QoS と Monitoring" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>VyOS における WAN Load Balancing、QoS と Monitoring</h2>
<p>安定したインターネット接続、帯域最適化、トラフィック可視化は重要な運用要件です。VyOS は WAN 負荷分散、QoS、monitoring のための強力な機能を提供します。</p>
<h3>WAN Load Balancing</h3>
<pre><code class="language-bash">set load-balancing wan rule 10 inbound-interface eth0
set load-balancing wan rule 10 interface eth1 weight 100
set load-balancing wan rule 10 interface eth2 weight 50
set load-balancing wan rule 10 failover
set load-balancing wan rule 10 exclude traffic source address 192.168.1.0/24
set load-balancing wan interface-health eth1 test 10 type ping target 8.8.8.8
set load-balancing wan interface-health eth2 test 10 type ping target 1.1.1.1
</code></pre>
<h3>QoS: Traffic Shaping と優先制御</h3>
<pre><code class="language-bash">set qos policy shaper SHAPER bandwidth 100mbit
set qos policy shaper SHAPER default bandwidth 80mbit
set qos policy shaper SHAPER class 10 match ip destination address 192.168.2.0/24
set qos policy shaper SHAPER class 10 bandwidth 20mbit
set interfaces ethernet eth0 qos policy shaper SHAPER
</code></pre>
<p>VoIP や gaming トラフィックは CAKE または HTB で優先制御できます。</p>
<h3>NetFlow/sFlow、SNMP、Syslog</h3>
<pre><code class="language-bash">set system flow-accounting interface eth0
set system flow-accounting netflow server 192.168.10.10 port 2055
set service snmp community public authorization ro
set service snmp listen-address 0.0.0.0
set system syslog host 192.168.10.20 facility all level info
set system syslog host 192.168.10.20 transport tls
</code></pre>
<h3>Prometheus Monitoring Integration</h3>
<p>VyOS は SNMP または exporter コンテナ経由でメトリクスを公開できます。</p>
<h3>ハンズオンラボ: Dual-WAN Load Balancing + QoS</h3>
<ol>
  <li>2 本の WAN インターフェース（eth1、eth2）に負荷分散ルールを設定します。</li>
  <li>ping による interface-health チェックを設定します。</li>
  <li>eth0 に QoS shaper を設定し、必要なトラフィックを優先化します。</li>
  <li>片方の WAN を切断して failover を確認します。</li>
  <li>NetFlow、SNMP、syslog が監視サーバーへ送信されることを確認します。</li>
</ol>
<pre><code class="language-bash"># Kiểm tra trạng thái load balancing
show load-balancing wan
# Kiểm tra QoS
show qos
# Kiểm tra flow-accounting
show system flow-accounting
</code></pre>
<h3>まとめ</h3>
<p>このレッスンで、VyOS における WAN 負荷分散、QoS、トラフィック監視を実践的に構成し、dual-WAN 運用と NetFlow/SNMP/syslog/Prometheus 連携を理解できます。</p>
