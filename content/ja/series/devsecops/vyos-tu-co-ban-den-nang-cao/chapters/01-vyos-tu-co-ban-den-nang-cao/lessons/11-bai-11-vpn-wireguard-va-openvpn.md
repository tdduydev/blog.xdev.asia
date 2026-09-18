---
id: 019d65ef-d36f-773e-bf0a-9e3982d5a422
locale: ja
title: '第11課：VPN - WireGuard と OpenVPN'
slug: bai-11-vpn-wireguard-va-openvpn
description: >-
  VyOS での WireGuard と OpenVPN を使った VPN 設定、性能とセキュリティ比較、site-to-site と remote access 実習、VPN 用 routing と firewall を解説します。
duration_minutes: 170
is_free: true
video_url: null
sort_order: 11
section_title: "VyOSの基礎から応用まで"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOSの基礎から応用まで
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-11-vpn-wireguard.webp" alt="VPN - WireGuard と OpenVPN" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>VyOS の VPN 入門: WireGuard と OpenVPN</h2>
<p>VPN（Virtual Private Network）は、拠点間接続やリモートアクセスを安全に実現するためのソリューションです。VyOS は WireGuard、OpenVPN、IPsec などの最新 VPN をサポートしています。本レッスンでは、性能・セキュリティ・柔軟性の観点でよく使われる WireGuard と OpenVPN に焦点を当てます。</p>
<h3>WireGuard: Site-to-Site VPN</h3>
<p><strong>WireGuard</strong> は、シンプルで高性能な最新 VPN プロトコルです。2 台の VyOS 間で site-to-site を構成する例を示します。</p>
<pre><code class="language-bash"># Tạo key pair trên mỗi VyOS
run generate wireguard key
# Lấy public key: run generate wireguard pubkey key &lt;private-key&gt;

# Cấu hình WireGuard interface
set interfaces wireguard wg0 address '10.10.10.1/24'
set interfaces wireguard wg0 port '51820'
set interfaces wireguard wg0 private-key '&lt;private-key&gt;'

# Thêm peer
set interfaces wireguard wg0 peer &lt;peer-public-key&gt; allowed-ips '10.10.10.2/32'
set interfaces wireguard wg0 peer &lt;peer-public-key&gt; endpoint 'WAN_IP_PEER:51820'
</code></pre>
<p>対向サイトでも同様に設定し、IP アドレスとキーを入れ替えます。</p>
<h3>WireGuard: Remote Access VPN</h3>
<p>クライアント（ノート PC、スマートフォン）から WireGuard 経由で内部ネットワークへアクセスできます。</p>
<pre><code class="language-bash">set interfaces wireguard wg0 address '10.10.20.1/24'
set interfaces wireguard wg0 port '51820'
set interfaces wireguard wg0 private-key '&lt;server-private-key&gt;'
set interfaces wireguard wg0 peer &lt;client-public-key&gt; allowed-ips '10.10.20.2/32'
</code></pre>
<p>クライアント側はサーバーの公開鍵に合わせて設定します。</p>
<h3>OpenVPN: Pre-Shared Key による Site-to-Site</h3>
<pre><code class="language-bash">set interfaces openvpn vtun0 mode site-to-site
set interfaces openvpn vtun0 local-address '10.20.20.1'
set interfaces openvpn vtun0 remote-address '10.20.20.2'
set interfaces openvpn vtun0 shared-secret-key-file '/config/auth/ovpn.key'
set interfaces openvpn vtun0 local-port '1194'
set interfaces openvpn vtun0 remote-host '&lt;peer-wan-ip&gt;'
</code></pre>
<h3>OpenVPN: 証明書ベースの Remote Access</h3>
<pre><code class="language-bash">set interfaces openvpn vtun1 mode server
set interfaces openvpn vtun1 server subnet '10.30.30.0/24'
set interfaces openvpn vtun1 tls ca-cert-file '/config/auth/ca.crt'
set interfaces openvpn vtun1 tls cert-file '/config/auth/server.crt'
set interfaces openvpn vtun1 tls key-file '/config/auth/server.key'
set interfaces openvpn vtun1 client-cert-required
</code></pre>
<h3>WireGuard、OpenVPN、IPsec の比較</h3>
<ul>
  <li><strong>WireGuard</strong>: 高性能、設定が簡潔、コードベースが小さく、VyOS 1.4/1.5 でのサポートが良好です。</li>
  <li><strong>OpenVPN</strong>: 柔軟でモードが多く証明書にも対応しますが、WireGuard より性能は低めです。</li>
  <li><strong>IPsec</strong>: 業界標準で統合性が高い一方、設定は比較的複雑です。</li>
</ul>
<h3>VPN 用の Routing と Firewall</h3>
<p>トンネル構築後は、トラフィックのルーティングと firewall 開放が必要です。</p>
<pre><code class="language-bash">set protocols static route 192.168.2.0/24 next-hop 10.10.10.2
set firewall name VPN-IN default-action accept
set interfaces wireguard wg0 firewall in name VPN-IN
</code></pre>
<h3>ハンズオンラボ: 2 台の VyOS 間 WireGuard Site-to-Site</h3>
<ol>
  <li>各 VyOS で鍵ペアを生成し、公開鍵を交換します。</li>
  <li>wg0 に専用アドレス、ポート、秘密鍵を設定します。</li>
  <li>対向サイトの公開鍵と endpoint を使って peer を追加します。</li>
  <li>内部ネットワークをトンネル経由でルーティングします。</li>
  <li><code>show interfaces wireguard</code> と <code>ping</code> で接続を確認します。</li>
</ol>
<pre><code class="language-bash"># Kiểm tra trạng thái WireGuard
show interfaces wireguard
# Kiểm tra routing
show ip route
</code></pre>
<h3>まとめ</h3>
<p>このレッスンでは、VyOS での WireGuard と OpenVPN の構成、両者の比較、site-to-site / remote access、さらに VPN 用 routing と firewall の実運用ポイントを習得できます。</p>
