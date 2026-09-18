---
id: 019d65ef-d36f-773e-bf0a-9e3bbb16e57f
locale: ja
title: '第13課：High Availability - VRRP と Conntrack Sync'
slug: bai-13-high-availability-vrrp-va-conntrack-sync
description: >-
  VyOS の High Availability を VRRP、conntrack-sync、HA 向け NAT 設定、failover 検証、HA ペア実習とともに解説します。
duration_minutes: 160
is_free: true
video_url: null
sort_order: 13
section_title: "VyOSの基礎から応用まで"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOSの基礎から応用まで
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-13-ha-vrrp.webp" alt="High Availability - VRRP と Conntrack Sync" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>VyOS の High Availability: VRRP と Conntrack Sync</h2>
<p>高可用性（HA）は、ネットワークシステムにおける重要要件です。VyOS は VRRP（Virtual Router Redundancy Protocol）と conntrack-sync を提供し、ノード間で NAT/接続状態を同期できます。</p>
<h3>VRRP: Virtual Router Redundancy Protocol</h3>
<p>VRRP により、複数ルーターで仮想 IP（virtual IP）を共有できます。プライマリ障害時には、スタンバイノードがこの IP を引き継ぎます。</p>
<pre><code class="language-bash">set high-availability vrrp group G1 interface eth0
set high-availability vrrp group G1 virtual-address 192.168.100.254/24
set high-availability vrrp group G1 priority 200
set high-availability vrrp group G1 preempt true
set high-availability vrrp group G1 rfc-compatibility 3
</code></pre>
<h3>Conntrack Sync: NAT/接続状態の同期</h3>
<pre><code class="language-bash">set service conntrack-sync interface eth1
set service conntrack-sync accept-protocol vrrp
</code></pre>
<p>これにより、failover 時にも NAT セッションが途切れにくくなります。</p>
<h3>HA ペア間の Config Sync</h3>
<pre><code class="language-bash">set service config-sync peer 192.168.100.2
set service config-sync interface eth1
</code></pre>
<h3>HA 向け NAT ルール</h3>
<p>virtual IP に対して NAT ルールを適用します。</p>
<pre><code class="language-bash">set nat source rule 100 outbound-interface eth0
set nat source rule 100 source address 192.168.100.0/24
set nat source rule 100 translation address masquerade
</code></pre>
<h3>Failover の確認と制御</h3>
<pre><code class="language-bash">show high-availability vrrp
show service conntrack-sync
</code></pre>
<h3>HA 設計: VM primary + physical backup</h3>
<p>信頼性を高めるため、プライマリを VM、バックアップを物理機器で構成する設計が推奨されます。</p>
<h3>ハンズオンラボ: VRRP + Conntrack Sync での VyOS HA ペア</h3>
<ol>
  <li>2 台の VyOS に VRRP group を設定し、異なる priority を指定します。</li>
  <li>内部同期用インターフェースで conntrack-sync を設定します。</li>
  <li>プライマリ停止で failover をテストし、virtual IP の引き継ぎを確認します。</li>
  <li>failover 後の NAT/接続状態を確認します。</li>
</ol>
<pre><code class="language-bash"># Kiểm tra trạng thái VRRP
show high-availability vrrp
# Kiểm tra đồng bộ conntrack
show service conntrack-sync
</code></pre>
<h3>まとめ</h3>
<p>このレッスンで、VyOS の VRRP、conntrack-sync、NAT 設計による HA 構成と、実運用に近い failover 検証手順を習得できます。</p>
