---
id: 019d65ef-d36f-773e-bf0a-9e3a653e2f50
title: 'Bài 12: VPN — IPsec Site-to-Site'
slug: bai-12-vpn-ipsec-site-to-site
description: >-
  Hướng dẫn cấu hình IPsec site-to-site trên VyOS, phân biệt policy-based và route-based, tích hợp với Cisco/Palo Alto, lab thực hành với BGP overlay, kiểm tra và khắc phục sự cố.
duration_minutes: 180
is_free: true
video_url: null
sort_order: 12
section_title: "VyOS từ Cơ bản đến Nâng cao"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS từ Cơ bản đến Nâng Cao
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-12-ipsec.webp" alt="VPN — IPsec Site-to-Site" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>Giới thiệu IPsec VPN trên VyOS</h2>
<p><strong>IPsec</strong> là chuẩn công nghiệp cho VPN bảo mật giữa các site. VyOS hỗ trợ đầy đủ IPsec với IKEv2, ESP, NAT-T, VTI. Bài này hướng dẫn cấu hình site-to-site, phân biệt policy-based và route-based, tích hợp với thiết bị khác và thực hành lab với BGP overlay.</p>
<h3>Kiến thức nền tảng IPsec</h3>
<ul>
  <li><strong>IKEv2</strong>: Giao thức thương lượng key, bảo mật hơn IKEv1.</li>
  <li><strong>ESP</strong>: Encapsulating Security Payload, mã hóa dữ liệu.</li>
  <li><strong>SA</strong>: Security Association, thông số bảo mật cho mỗi kết nối.</li>
  <li><strong>Proposal</strong>: Tập hợp thuật toán mã hóa, xác thực.</li>
  <li><strong>DH Group</strong>: Diffie-Hellman group, xác định độ mạnh key exchange.</li>
</ul>
<h3>Policy-based vs Route-based (VTI) VPN</h3>
<ul>
  <li><strong>Policy-based</strong>: Định nghĩa traffic nào sẽ được mã hóa dựa trên policy.</li>
  <li><strong>Route-based (VTI)</strong>: Tạo interface ảo (vti) để routing linh hoạt, hỗ trợ dynamic routing như BGP.</li>
</ul>
<h3>Cấu hình IPsec Site-to-Site giữa 2 VyOS</h3>
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
<h3>Route-based VPN với VTI</h3>
<pre><code class="language-bash">set interfaces vti vti0 address '10.100.100.1/30'
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; vti bind vti0
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; vti esp-group ESP-GROUP
set vpn ipsec site-to-site peer &lt;peer-wan-ip&gt; vti ike-group IKE-GROUP
</code></pre>
<h3>Kết nối IPsec với Cisco/Palo Alto</h3>
<p>Chỉ cần đồng bộ proposal, pre-shared key, local/remote subnet. Đảm bảo NAT-T bật nếu có NAT.</p>
<h3>Route-based VPN tới Azure với BGP</h3>
<pre><code class="language-bash">set interfaces vti vti1 address '169.254.21.2/30'
set protocols bgp 65001 neighbor 169.254.21.1 remote-as 65515
set protocols bgp 65001 neighbor 169.254.21.1 update-source vti1
</code></pre>
<h3>DMVPN Dual Hub Concept</h3>
<p>VyOS hỗ trợ DMVPN với nhiều hub, tăng tính sẵn sàng. Cấu hình tương tự route-based, thêm nhiều peer.</p>
<h3>Kiểm tra và khắc phục sự cố IPsec</h3>
<pre><code class="language-bash">show vpn ipsec sa
show vpn ipsec status
run monitor vpn ipsec
</code></pre>
<p>Debug peer nếu không lên tunnel:</p>
<pre><code class="language-bash">run monitor vpn ipsec log peer &lt;peer-wan-ip&gt;
</code></pre>
<h3>Lab thực hành: Route-based IPsec VPN với BGP overlay</h3>
<ol>
  <li>Cấu hình VTI interface trên cả hai VyOS.</li>
  <li>Cấu hình IPsec peer, proposal, pre-shared key.</li>
  <li>Thiết lập BGP trên VTI interface để trao đổi route.</li>
  <li>Kiểm tra trạng thái tunnel và routing.</li>
</ol>
<pre><code class="language-bash"># Kiểm tra trạng thái IPsec
show vpn ipsec sa
# Kiểm tra VTI interface
show interfaces vti
# Kiểm tra BGP
show ip bgp summary
</code></pre>
<h3>Tổng kết</h3>
<p>Bài này giúp bạn hiểu rõ IPsec trên VyOS, phân biệt policy-based và route-based, tích hợp với thiết bị khác, thực hành lab với BGP overlay và kỹ năng kiểm tra, khắc phục sự cố thực tế.</p>