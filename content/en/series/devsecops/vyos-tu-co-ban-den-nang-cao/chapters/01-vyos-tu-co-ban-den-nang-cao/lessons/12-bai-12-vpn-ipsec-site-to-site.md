---
id: 019d65ef-d36f-773e-bf0a-9e3a653e2f50
locale: en
title: 'Lesson 12: VPN - IPsec Site-to-Site'
slug: bai-12-vpn-ipsec-site-to-site
description: >-
  Guide to configuring IPsec site-to-site on VyOS, differences between policy-based and route-based VPN, integration with Cisco/Palo Alto, BGP overlay lab, and troubleshooting.
duration_minutes: 180
is_free: true
video_url: null
sort_order: 12
section_title: "VyOS from Basics to Advanced"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS from Basics to Advanced
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-12-ipsec.webp" alt="VPN - IPsec Site-to-Site" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>Introduction to IPsec VPN on VyOS</h2>
<p><strong>IPsec</strong> is the industry-standard technology for secure VPN connectivity between sites. VyOS provides complete IPsec support with IKEv2, ESP, NAT-T, and VTI. This lesson covers site-to-site configuration, policy-based vs route-based designs, interoperability with other devices, and a BGP overlay lab.</p>
<h3>IPsec fundamentals</h3>
<ul>
  <li><strong>IKEv2</strong>: Key negotiation protocol with stronger security than IKEv1.</li>
  <li><strong>ESP</strong>: Encapsulating Security Payload for encrypted data transport.</li>
  <li><strong>SA</strong>: Security Association containing per-tunnel security parameters.</li>
  <li><strong>Proposal</strong>: Set of encryption and authentication algorithms.</li>
  <li><strong>DH Group</strong>: Diffie-Hellman group that determines key exchange strength.</li>
</ul>
<h3>Policy-based vs Route-based (VTI) VPN</h3>
<ul>
  <li><strong>Policy-based</strong>: Defines which traffic is encrypted by policy selectors.</li>
  <li><strong>Route-based (VTI)</strong>: Creates a virtual interface for flexible routing and supports dynamic protocols like BGP.</li>
</ul>
<h3>IPsec site-to-site configuration between 2 VyOS routers</h3>
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
<h3>Route-based VPN with VTI</h3>
<pre><code class="language-bash">set interfaces vti vti0 address '10.100.100.1/30'
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; vti bind vti0
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; vti esp-group ESP-GROUP
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; vti ike-group IKE-GROUP
</code></pre>
<h3>IPsec interop with Cisco/Palo Alto</h3>
<p>Synchronize proposals, pre-shared key, and local/remote subnets. Ensure NAT-T is enabled if NAT exists in the path.</p>
<h3>Route-based VPN to Azure with BGP</h3>
<pre><code class="language-bash">set interfaces vti vti1 address '169.254.21.2/30'
set protocols bgp 65001 neighbor 169.254.21.1 remote-as 65515
set protocols bgp 65001 neighbor 169.254.21.1 update-source vti1
</code></pre>
<h3>DMVPN dual-hub concept</h3>
<p>VyOS supports DMVPN with multiple hubs to improve availability. The configuration is similar to route-based VPN, with additional peers.</p>
<h3>IPsec verification and troubleshooting</h3>
<pre><code class="language-bash">show vpn ipsec sa
show vpn ipsec status
run monitor vpn ipsec
</code></pre>
<p>Debug a peer if the tunnel does not come up:</p>
<pre><code class="language-bash">run monitor vpn ipsec log peer &lt;peer-wan-ip&gt;
</code></pre>
<h3>Hands-on lab: Route-based IPsec VPN with BGP overlay</h3>
<ol>
  <li>Configure VTI interfaces on both VyOS routers.</li>
  <li>Configure IPsec peers, proposals, and pre-shared key.</li>
  <li>Set up BGP on the VTI interfaces for route exchange.</li>
  <li>Verify tunnel and routing status.</li>
</ol>
<pre><code class="language-bash"># Kiểm tra trạng thái IPsec
show vpn ipsec sa
# Kiểm tra VTI interface
show interfaces vti
# Kiểm tra BGP
show ip bgp summary
</code></pre>
<h3>Summary</h3>
<p>This lesson gives you a practical understanding of IPsec on VyOS, policy-based vs route-based designs, interoperability, BGP overlay labs, and real-world troubleshooting skills.</p>
