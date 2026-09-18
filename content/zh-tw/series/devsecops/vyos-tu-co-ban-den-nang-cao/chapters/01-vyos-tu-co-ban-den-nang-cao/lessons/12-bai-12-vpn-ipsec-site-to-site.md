---
id: 019d65ef-d36f-773e-bf0a-9e3a653e2f50
title: '第12課：VPN——IPsec 站點間連接'
slug: bai-12-vpn-ipsec-site-to-site
description: >-
  在VyOS上設定IPsec站點間連接，區分基於政策和基於路由的方式，與Cisco/Palo Alto整合，使用BGP疊層的實驗室練習，故障排除。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 12
section_title: "VyOS：從基礎到進階"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS：從基礎到進階
  slug: vyos-tu-co-ban-den-nang-cao
locale: zh-tw
---
<img src="/storage/uploads/2026/04/vyos-12-ipsec.webp" alt="VPN——IPsec 站點間連接" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>VyOS上的IPsec VPN簡介</h2>
<p><strong>IPsec</strong>是站點間安全VPN的業界標準。VyOS全面支援IPsec，包括IKEv2、ESP、NAT-T、VTI。本課程指導您設定站點間連接，區分基於政策和基於路由的方式，與其他設備整合，以及使用BGP疊層的實驗室練習。</p>
<h3>IPsec基礎知識</h3>
<ul>
  <li><strong>IKEv2</strong>：金鑰協商協定，安全性高於IKEv1。</li>
  <li><strong>ESP</strong>：封裝安全有效負載，資料加密。</li>
  <li><strong>SA</strong>：安全關聯，每個連接的安全參數。</li>
  <li><strong>Proposal</strong>：加密和身份驗證演算法的集合。</li>
  <li><strong>DH Group</strong>：Diffie-Hellman群組，決定金鑰交換的強度。</li>
</ul>
<h3>基於政策vs基於路由（VTI）VPN</h3>
<ul>
  <li><strong>基於政策</strong>：根據政策定義哪些流量將被加密。</li>
  <li><strong>基於路由（VTI）</strong>：建立虛擬介面（vti）用於靈活路由，支援BGP等動態路由。</li>
</ul>
<h3>在兩個VyOS之間配置IPsec站點間連接</h3>
<pre><code class="language-bash"># 建立proposal
set vpn ipsec esp-group ESP-GROUP proposal 1 encryption aes256
set vpn ipsec esp-group ESP-GROUP proposal 1 hash sha256
set vpn ipsec ike-group IKE-GROUP proposal 1 encryption aes256
set vpn ipsec ike-group IKE-GROUP proposal 1 dh-group 14
set vpn ipsec ike-group IKE-GROUP proposal 1 hash sha256

# 對等體
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; authentication mode pre-shared-secret
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; authentication pre-shared-secret '&lt;secret&gt;'
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; ike-group IKE-GROUP
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; esp-group ESP-GROUP
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; local-address '&lt;local-wan-ip&gt;'
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; tunnel 1 local prefix '192.168.1.0/24'
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; tunnel 1 remote prefix '192.168.2.0/24'
</code></pre>
<h3>使用VTI的基於路由的VPN</h3>
<pre><code class="language-bash">set interfaces vti vti0 address '10.100.100.1/30'
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; vti bind vti0
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; vti esp-group ESP-GROUP
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; vti ike-group IKE-GROUP
</code></pre>
<h3>與Cisco/Palo Alto的IPsec連接</h3>
<p>只需同步proposal、預共享金鑰、本地/遠端子網。如果有NAT，確保NAT-T已啟用。</p>
<h3>使用BGP連接到Azure的基於路由的VPN</h3>
<pre><code class="language-bash">set interfaces vti vti1 address '169.254.21.2/30'
set protocols bgp 65001 neighbor 169.254.21.1 remote-as 65515
set protocols bgp 65001 neighbor 169.254.21.1 update-source vti1
</code></pre>
<h3>DMVPN雙中樞概念</h3>
<p>VyOS支援使用多個中樞的DMVPN，提高可用性。配置類似於基於路由的方式，但要新增多個對等體。</p>
<h3>檢查和排除IPsec故障</h3>
<pre><code class="language-bash">show vpn ipsec sa
show vpn ipsec status
run monitor vpn ipsec
</code></pre>
<p>如果隧道未啟動，調試對等體：</p>
<pre><code class="language-bash">run monitor vpn ipsec log peer &lt;peer-wan-ip&gt;
</code></pre>
<h3>實踐實驗室：使用BGP疊層的基於路由的IPsec VPN</h3>
<ol>
  <li>在兩個VyOS上配置VTI介面。</li>
  <li>配置IPsec對等體、proposal、預共享金鑰。</li>
  <li>在VTI介面上建立BGP以交換路由。</li>
  <li>檢查隧道狀態和路由。</li>
</ol>
<pre><code class="language-bash"># 檢查IPsec狀態
show vpn ipsec sa
# 檢查VTI介面
show interfaces vti
# 檢查BGP
show ip bgp summary
</code></pre>
<h3>總結</h3>
<p>本課程幫助您深入瞭解VyOS上的IPsec、區分基於政策和基於路由的方式、與其他設備整合、使用BGP疊層進行實驗室練習，以及檢查和排除故障的實際技能。</p>