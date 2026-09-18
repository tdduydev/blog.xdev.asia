---
id: 019d65ef-d36f-773e-bf0a-9e3cc2fa6f1e
title: '第14課：WAN負載平衡、QoS和監控'
slug: bai-14-wan-load-balancing-qos-va-monitoring
description: >-
  在VyOS上配置WAN負載平衡、QoS、流量監控，雙WAN實驗室練習，NetFlow、SNMP、syslog、Prometheus配置。
duration_minutes: 160
is_free: true
video_url: null
sort_order: 14
section_title: "VyOS：從基礎到進階"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS：從基礎到進階
  slug: vyos-tu-co-ban-den-nang-cao
locale: zh-tw
---
<img src="/storage/uploads/2026/04/vyos-14-wan-lb-qos.webp" alt="WAN負載平衡、QoS和監控" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>VyOS上的WAN負載平衡、QoS和監控</h2>
<p>確保穩定的網際網路連接、最佳化頻寬和監控流量是重要要求。VyOS提供強大的WAN負載平衡、QoS和監控功能。</p>
<h3>WAN負載平衡</h3>
<pre><code class="language-bash">set load-balancing wan rule 10 inbound-interface eth0
set load-balancing wan rule 10 interface eth1 weight 100
set load-balancing wan rule 10 interface eth2 weight 50
set load-balancing wan rule 10 failover
set load-balancing wan rule 10 exclude traffic source address 192.168.1.0/24
set load-balancing wan interface-health eth1 test 10 type ping target 8.8.8.8
set load-balancing wan interface-health eth2 test 10 type ping target 1.1.1.1
</code></pre>
<h3>QoS：流量塑形和優先級</h3>
<pre><code class="language-bash">set qos policy shaper SHAPER bandwidth 100mbit
set qos policy shaper SHAPER default bandwidth 80mbit
set qos policy shaper SHAPER class 10 match ip destination address 192.168.2.0/24
set qos policy shaper SHAPER class 10 bandwidth 20mbit
set interfaces ethernet eth0 qos policy shaper SHAPER
</code></pre>
<p>使用CAKE或HTB優先級VoIP/遊戲流量。</p>
<h3>NetFlow/sFlow、SNMP、Syslog</h3>
<pre><code class="language-bash">set system flow-accounting interface eth0
set system flow-accounting netflow server 192.168.10.10 port 2055
set service snmp community public authorization ro
set service snmp listen-address 0.0.0.0
set system syslog host 192.168.10.20 facility all level info
set system syslog host 192.168.10.20 transport tls
</code></pre>
<h3>Prometheus監控整合</h3>
<p>VyOS支援通過SNMP或exporter容器匯出指標。</p>
<h3>實踐實驗室：雙WAN負載平衡 + QoS</h3>
<ol>
  <li>使用負載平衡規則配置兩個WAN介面（eth1、eth2）。</li>
  <li>設定介面健康檢查ping。</li>
  <li>為eth0配置QoS shaper，優先級必要的流量。</li>
  <li>通過斷開一個WAN測試故障轉移。</li>
  <li>檢查NetFlow、SNMP、syslog發送到監控伺服器。</li>
</ol>
<pre><code class="language-bash"># 檢查負載平衡狀態
show load-balancing wan
# 檢查QoS
show qos
# 檢查flow-accounting
show system flow-accounting
</code></pre>
<h3>總結</h3>
<p>本課程幫助您配置WAN負載平衡、QoS、流量監控，進行雙WAN實驗室練習、配置NetFlow、SNMP、syslog、Prometheus，以便在生產環境中專業地運營網路系統。</p>