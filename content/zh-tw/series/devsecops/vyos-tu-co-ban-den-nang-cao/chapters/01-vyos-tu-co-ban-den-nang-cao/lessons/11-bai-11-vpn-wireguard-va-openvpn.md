---
id: 019d65ef-d36f-773e-bf0a-9e3982d5a422
locale: zh-tw
title: '第11課：VPN - WireGuard 與 OpenVPN'
slug: bai-11-vpn-wireguard-va-openvpn
description: >-
  在 VyOS 上以 WireGuard 與 OpenVPN 建置 VPN，包含效能與安全比較、site-to-site 與 remote access 實作，以及 VPN 路由與防火牆設定。
duration_minutes: 170
is_free: true
video_url: null
sort_order: 11
section_title: "VyOS 從入門到進階"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS 從入門到進階
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-11-vpn-wireguard.webp" alt="VPN - WireGuard 與 OpenVPN" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>VyOS VPN 介紹：WireGuard 與 OpenVPN</h2>
<p>VPN（Virtual Private Network）可用於站點間安全連線與遠端存取。VyOS 支援多種現代 VPN 類型，如 WireGuard、OpenVPN 與 IPsec。本課重點放在 WireGuard 與 OpenVPN，這兩者在效能、安全與設定彈性上都很常用。</p>
<h3>WireGuard：Site-to-Site VPN</h3>
<p><strong>WireGuard</strong> 是現代化且高效能的 VPN 協定。以下是兩台 VyOS 之間 site-to-site 的設定方式：</p>
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
<p>對端站點同樣設定，並替換 IP 與金鑰。</p>
<h3>WireGuard：Remote Access VPN</h3>
<p>可讓用戶端（筆電、手機）透過 WireGuard 連入內部網路：</p>
<pre><code class="language-bash">set interfaces wireguard wg0 address '10.10.20.1/24'
set interfaces wireguard wg0 port '51820'
set interfaces wireguard wg0 private-key '&lt;server-private-key&gt;'
set interfaces wireguard wg0 peer &lt;client-public-key&gt; allowed-ips '10.10.20.2/32'
</code></pre>
<p>用戶端需依伺服器 public key 進行對應設定。</p>
<h3>OpenVPN：Pre-Shared Key Site-to-Site</h3>
<pre><code class="language-bash">set interfaces openvpn vtun0 mode site-to-site
set interfaces openvpn vtun0 local-address '10.20.20.1'
set interfaces openvpn vtun0 remote-address '10.20.20.2'
set interfaces openvpn vtun0 shared-secret-key-file '/config/auth/ovpn.key'
set interfaces openvpn vtun0 local-port '1194'
set interfaces openvpn vtun0 remote-host '&lt;peer-wan-ip&gt;'
</code></pre>
<h3>OpenVPN：憑證式 Remote Access</h3>
<pre><code class="language-bash">set interfaces openvpn vtun1 mode server
set interfaces openvpn vtun1 server subnet '10.30.30.0/24'
set interfaces openvpn vtun1 tls ca-cert-file '/config/auth/ca.crt'
set interfaces openvpn vtun1 tls cert-file '/config/auth/server.crt'
set interfaces openvpn vtun1 tls key-file '/config/auth/server.key'
set interfaces openvpn vtun1 client-cert-required
</code></pre>
<h3>WireGuard、OpenVPN 與 IPsec 比較</h3>
<ul>
  <li><strong>WireGuard</strong>：效能高、設定簡潔、程式碼量小，在 VyOS 1.4/1.5 支援良好。</li>
  <li><strong>OpenVPN</strong>：彈性高、模式多、支援憑證，但效能通常低於 WireGuard。</li>
  <li><strong>IPsec</strong>：業界標準、整合度高，但設定相對複雜。</li>
</ul>
<h3>VPN 的路由與防火牆</h3>
<p>完成 tunnel 後，需設定路由並開放必要防火牆規則：</p>
<pre><code class="language-bash">set protocols static route 192.168.2.0/24 next-hop 10.10.10.2
set firewall name VPN-IN default-action accept
set interfaces wireguard wg0 firewall in name VPN-IN
</code></pre>
<h3>實作實驗：2 台 VyOS 的 WireGuard Site-to-Site</h3>
<ol>
  <li>在每台 VyOS 產生金鑰對並交換 public key。</li>
  <li>設定 wg0 介面位址、port 與 private key。</li>
  <li>加入 peer，指定對端 public key 與 endpoint。</li>
  <li>將內部網段路由經由 tunnel。</li>
  <li>以 <code>show interfaces wireguard</code> 與 <code>ping</code> 驗證連線。</li>
</ol>
<pre><code class="language-bash"># Kiểm tra trạng thái WireGuard
show interfaces wireguard
# Kiểm tra routing
show ip route
</code></pre>
<h3>總結</h3>
<p>本課協助你掌握 VyOS 上 WireGuard 與 OpenVPN 的 VPN 建置、優缺點比較，以及 site-to-site、remote access、路由與防火牆的實務操作。</p>
