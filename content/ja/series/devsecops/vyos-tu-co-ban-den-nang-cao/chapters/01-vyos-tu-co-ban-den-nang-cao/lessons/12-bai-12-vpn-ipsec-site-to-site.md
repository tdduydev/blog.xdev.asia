---
id: 019d65ef-d36f-773e-bf0a-9e3a653e2f50
locale: ja
title: '第12課：VPN - IPsec Site-to-Site'
slug: bai-12-vpn-ipsec-site-to-site
description: >-
  VyOS での IPsec site-to-site 設定、policy-based と route-based の違い、Cisco/Palo Alto 連携、BGP overlay ラボ、検証とトラブルシューティングを解説します。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 12
section_title: "VyOSの基礎から応用まで"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOSの基礎から応用まで
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-12-ipsec.webp" alt="VPN - IPsec Site-to-Site" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>VyOS における IPsec VPN の概要</h2>
<p><strong>IPsec</strong> は、拠点間 VPN を安全に構築するための業界標準です。VyOS は IKEv2、ESP、NAT-T、VTI を含む IPsec 機能を幅広くサポートしています。本レッスンでは site-to-site 構成、policy-based と route-based の違い、他ベンダー機器連携、BGP overlay ラボを扱います。</p>
<h3>IPsec の基礎</h3>
<ul>
  <li><strong>IKEv2</strong>: 鍵交換を行うプロトコルで、IKEv1 より安全性が高いです。</li>
  <li><strong>ESP</strong>: Encapsulating Security Payload。データを暗号化します。</li>
  <li><strong>SA</strong>: Security Association。接続ごとのセキュリティパラメータです。</li>
  <li><strong>Proposal</strong>: 暗号化方式と認証方式の組み合わせです。</li>
  <li><strong>DH Group</strong>: Diffie-Hellman グループ。鍵交換強度を決定します。</li>
</ul>
<h3>Policy-based と Route-based（VTI）VPN</h3>
<ul>
  <li><strong>Policy-based</strong>: ポリシーで指定したトラフィックのみを暗号化します。</li>
  <li><strong>Route-based (VTI)</strong>: 仮想インターフェース（vti）を使って柔軟にルーティングでき、BGP などの動的ルーティングにも対応しやすい方式です。</li>
</ul>
<h3>2 台の VyOS 間での IPsec Site-to-Site 設定</h3>
<pre><code class="language-bash"># Tạo proposal
set vpn ipsec esp-group ESP-GROUP proposal 1 encryption aes256
set vpn ipsec esp-group ESP-GROUP proposal 1 hash sha256
set vpn ipsec ike-group IKE-GROUP proposal 1 encryption aes256
set vpn ipsec ike-group IKE-GROUP proposal 1 dh-group 14
set vpn ipsec ike-group IKE-GROUP proposal 1 hash sha256

# Peer
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; authentication mode pre-shared-secret
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; authentication pre-shared-secret '&lt;secret&gt;'
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; ike-group IKE-GROUP
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; esp-group ESP-GROUP
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; local-address '&lt;local-wan-ip&gt;'
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; tunnel 1 local prefix '192.168.1.0/24'
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; tunnel 1 remote prefix '192.168.2.0/24'
</code></pre>
<h3>VTI を使った Route-based VPN</h3>
<pre><code class="language-bash">set interfaces vti vti0 address '10.100.100.1/30'
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; vti bind vti0
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; vti esp-group ESP-GROUP
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; vti ike-group IKE-GROUP
</code></pre>
<h3>Cisco/Palo Alto との IPsec 連携</h3>
<p>proposal、pre-shared key、local/remote subnet を一致させます。経路上に NAT がある場合は NAT-T を有効化してください。</p>
<h3>Azure への Route-based VPN + BGP</h3>
<pre><code class="language-bash">set interfaces vti vti1 address '169.254.21.2/30'
set protocols bgp 65001 neighbor 169.254.21.1 remote-as 65515
set protocols bgp 65001 neighbor 169.254.21.1 update-source vti1
</code></pre>
<h3>DMVPN Dual Hub の考え方</h3>
<p>VyOS は複数ハブによる DMVPN 構成に対応でき、可用性を高められます。基本は route-based 構成で peer を追加していく形です。</p>
<h3>IPsec の確認とトラブルシューティング</h3>
<pre><code class="language-bash">show vpn ipsec sa
show vpn ipsec status
run monitor vpn ipsec
</code></pre>
<p>トンネルが確立しない場合は、対象 peer のログを確認します。</p>
<pre><code class="language-bash">run monitor vpn ipsec log peer &lt;peer-wan-ip&gt;
</code></pre>
<h3>ハンズオンラボ: Route-based IPsec VPN と BGP overlay</h3>
<ol>
  <li>両方の VyOS に VTI インターフェースを設定します。</li>
  <li>IPsec peer、proposal、pre-shared key を設定します。</li>
  <li>VTI 上で BGP を設定し、ルートを交換します。</li>
  <li>トンネル状態とルーティング状態を確認します。</li>
</ol>
<pre><code class="language-bash"># Kiểm tra trạng thái IPsec
show vpn ipsec sa
# Kiểm tra VTI interface
show interfaces vti
# Kiểm tra BGP
show ip bgp summary
</code></pre>
<h3>まとめ</h3>
<p>このレッスンで、VyOS における IPsec の実装、policy-based と route-based の使い分け、他機器連携、BGP overlay 検証、実践的なトラブルシューティングを理解できます。</p>
