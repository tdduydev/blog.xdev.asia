---
id: 019d65ef-d36f-773e-bf0a-9e3982d5a422
title: 'Bài 11: VPN — WireGuard và OpenVPN'
slug: bai-11-vpn-wireguard-va-openvpn
description: >-
  Hướng dẫn cấu hình VPN trên VyOS với WireGuard và OpenVPN, so sánh hiệu năng, bảo mật, thực hành site-to-site và remote access, routing và firewall cho VPN.
duration_minutes: 170
is_free: true
video_url: null
sort_order: 11
section_title: "VyOS từ Cơ bản đến Nâng cao"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS từ Cơ bản đến Nâng Cao
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-11-vpn-wireguard.webp" alt="VPN — WireGuard và OpenVPN" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>Giới thiệu VPN trên VyOS: WireGuard và OpenVPN</h2>
<p>VPN (Virtual Private Network) là giải pháp bảo mật kết nối giữa các site hoặc truy cập từ xa. VyOS hỗ trợ nhiều loại VPN hiện đại như WireGuard, OpenVPN và IPsec. Bài này tập trung vào WireGuard và OpenVPN, hai giải pháp phổ biến với ưu điểm về hiệu năng, bảo mật và cấu hình linh hoạt.</p>
<h3>WireGuard: Site-to-Site VPN</h3>
<p><strong>WireGuard</strong> là giao thức VPN hiện đại, đơn giản, hiệu năng cao. Để cấu hình site-to-site giữa hai VyOS:</p>
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
<p>Thực hiện tương tự ở site bên kia, đổi địa chỉ IP và key.</p>
<h3>WireGuard: Remote Access VPN</h3>
<p>Cho phép client (laptop, điện thoại) truy cập mạng nội bộ qua WireGuard:</p>
<pre><code class="language-bash">set interfaces wireguard wg0 address '10.10.20.1/24'
set interfaces wireguard wg0 port '51820'
set interfaces wireguard wg0 private-key '&lt;server-private-key&gt;'
set interfaces wireguard wg0 peer &lt;client-public-key&gt; allowed-ips '10.10.20.2/32'
</code></pre>
<p>Client cấu hình tương ứng với public key của server.</p>
<h3>OpenVPN: Site-to-Site với Pre-Shared Key</h3>
<pre><code class="language-bash">set interfaces openvpn vtun0 mode site-to-site
set interfaces openvpn vtun0 local-address '10.20.20.1'
set interfaces openvpn vtun0 remote-address '10.20.20.2'
set interfaces openvpn vtun0 shared-secret-key-file '/config/auth/ovpn.key'
set interfaces openvpn vtun0 local-port '1194'
set interfaces openvpn vtun0 remote-host '&lt;peer-wan-ip&gt;'
</code></pre>
<h3>OpenVPN: Remote Access với Certificates</h3>
<pre><code class="language-bash">set interfaces openvpn vtun1 mode server
set interfaces openvpn vtun1 server subnet '10.30.30.0/24'
set interfaces openvpn vtun1 tls ca-cert-file '/config/auth/ca.crt'
set interfaces openvpn vtun1 tls cert-file '/config/auth/server.crt'
set interfaces openvpn vtun1 tls key-file '/config/auth/server.key'
set interfaces openvpn vtun1 client-cert-required
</code></pre>
<h3>So sánh WireGuard, OpenVPN và IPsec</h3>
<ul>
  <li><strong>WireGuard</strong>: Hiệu năng cao, cấu hình đơn giản, mã nguồn nhỏ, hỗ trợ tốt trên VyOS 1.4/1.5.</li>
  <li><strong>OpenVPN</strong>: Linh hoạt, nhiều chế độ, hỗ trợ certificate, nhưng hiệu năng thấp hơn WireGuard.</li>
  <li><strong>IPsec</strong>: Chuẩn công nghiệp, tích hợp sâu, cấu hình phức tạp hơn.</li>
</ul>
<h3>Routing và Firewall cho VPN</h3>
<p>Sau khi thiết lập tunnel, cần định tuyến traffic và mở firewall:</p>
<pre><code class="language-bash">set protocols static route 192.168.2.0/24 next-hop 10.10.10.2
set firewall name VPN-IN default-action accept
set interfaces wireguard wg0 firewall in name VPN-IN
</code></pre>
<h3>Lab thực hành: WireGuard Site-to-Site giữa 2 VyOS</h3>
<ol>
  <li>Trên mỗi VyOS, tạo key pair và trao đổi public key.</li>
  <li>Cấu hình interface wg0 với địa chỉ riêng, port, private key.</li>
  <li>Thêm peer với public key và endpoint của site bên kia.</li>
  <li>Định tuyến mạng nội bộ qua tunnel.</li>
  <li>Kiểm tra kết nối: <code>show interfaces wireguard</code>, <code>ping</code> qua tunnel.</li>
</ol>
<pre><code class="language-bash"># Kiểm tra trạng thái WireGuard
show interfaces wireguard
# Kiểm tra routing
show ip route
</code></pre>
<h3>Tổng kết</h3>
<p>Bài này giúp bạn nắm vững cấu hình VPN với WireGuard và OpenVPN trên VyOS, so sánh ưu nhược điểm, thực hành site-to-site và remote access, routing và firewall cho VPN. Hãy thực hành lab để hiểu sâu hơn về vận hành thực tế.</p>