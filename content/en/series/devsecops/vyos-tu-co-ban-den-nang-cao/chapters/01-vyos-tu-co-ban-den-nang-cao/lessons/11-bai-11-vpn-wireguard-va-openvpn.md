---
id: 019d65ef-d36f-773e-bf0a-9e3982d5a422
locale: en
title: 'Lesson 11: VPN - WireGuard and OpenVPN'
slug: bai-11-vpn-wireguard-va-openvpn
description: >-
  Guide to configuring VPN on VyOS with WireGuard and OpenVPN, including performance and security comparison, site-to-site and remote access labs, and routing and firewall for VPN.
duration_minutes: 170
is_free: true
video_url: null
sort_order: 11
section_title: "VyOS from Basics to Advanced"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS from Basics to Advanced
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-11-vpn-wireguard.webp" alt="VPN - WireGuard and OpenVPN" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>Introduction to VPN on VyOS: WireGuard and OpenVPN</h2>
<p>VPN (Virtual Private Network) is a secure connectivity solution for inter-site links and remote access. VyOS supports several modern VPN types such as WireGuard, OpenVPN, and IPsec. This lesson focuses on WireGuard and OpenVPN, two popular solutions with strong performance, security, and flexible deployment models.</p>
<h3>WireGuard: Site-to-Site VPN</h3>
<p><strong>WireGuard</strong> is a modern VPN protocol that is simple and high-performance. To configure site-to-site between two VyOS routers:</p>
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
<p>Do the same on the other site, changing IP addresses and keys.</p>
<h3>WireGuard: Remote Access VPN</h3>
<p>Allows clients (laptop, phone) to access the internal network through WireGuard:</p>
<pre><code class="language-bash">set interfaces wireguard wg0 address '10.10.20.1/24'
set interfaces wireguard wg0 port '51820'
set interfaces wireguard wg0 private-key '&lt;server-private-key&gt;'
set interfaces wireguard wg0 peer &lt;client-public-key&gt; allowed-ips '10.10.20.2/32'
</code></pre>
<p>The client is configured accordingly using the server public key.</p>
<h3>OpenVPN: Site-to-Site with Pre-Shared Key</h3>
<pre><code class="language-bash">set interfaces openvpn vtun0 mode site-to-site
set interfaces openvpn vtun0 local-address '10.20.20.1'
set interfaces openvpn vtun0 remote-address '10.20.20.2'
set interfaces openvpn vtun0 shared-secret-key-file '/config/auth/ovpn.key'
set interfaces openvpn vtun0 local-port '1194'
set interfaces openvpn vtun0 remote-host '&lt;peer-wan-ip&gt;'
</code></pre>
<h3>OpenVPN: Remote Access with Certificates</h3>
<pre><code class="language-bash">set interfaces openvpn vtun1 mode server
set interfaces openvpn vtun1 server subnet '10.30.30.0/24'
set interfaces openvpn vtun1 tls ca-cert-file '/config/auth/ca.crt'
set interfaces openvpn vtun1 tls cert-file '/config/auth/server.crt'
set interfaces openvpn vtun1 tls key-file '/config/auth/server.key'
set interfaces openvpn vtun1 client-cert-required
</code></pre>
<h3>WireGuard, OpenVPN, and IPsec comparison</h3>
<ul>
  <li><strong>WireGuard</strong>: High performance, simple configuration, small codebase, strong support on VyOS 1.4/1.5.</li>
  <li><strong>OpenVPN</strong>: Flexible with many modes and certificate support, but lower performance than WireGuard.</li>
  <li><strong>IPsec</strong>: Industry standard with deep integration, but typically more complex to configure.</li>
</ul>
<h3>Routing and Firewall for VPN</h3>
<p>After setting up the tunnel, route traffic correctly and open firewall policies:</p>
<pre><code class="language-bash">set protocols static route 192.168.2.0/24 next-hop 10.10.10.2
set firewall name VPN-IN default-action accept
set interfaces wireguard wg0 firewall in name VPN-IN
</code></pre>
<h3>Hands-on lab: WireGuard site-to-site between 2 VyOS routers</h3>
<ol>
  <li>On each VyOS router, generate a key pair and exchange public keys.</li>
  <li>Configure interface wg0 with private addressing, port, and private key.</li>
  <li>Add peers with public keys and endpoint of the opposite site.</li>
  <li>Route internal networks through the tunnel.</li>
  <li>Validate connectivity: <code>show interfaces wireguard</code>, <code>ping</code> through the tunnel.</li>
</ol>
<pre><code class="language-bash"># Kiểm tra trạng thái WireGuard
show interfaces wireguard
# Kiểm tra routing
show ip route
</code></pre>
<h3>Summary</h3>
<p>This lesson helps you master VPN configuration on VyOS with WireGuard and OpenVPN, compare trade-offs, and practice site-to-site and remote access with routing and firewall integration. Complete the lab to build practical operational confidence.</p>
