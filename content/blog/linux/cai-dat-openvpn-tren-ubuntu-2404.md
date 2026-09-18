---
id: 019c9617-fcc0-70c5-82f4-fdf4589ad9d1
title: Cài đặt OpenVPN trên Ubuntu 24.04
slug: cai-dat-openvpn-tren-ubuntu-2404
excerpt: >-
  OpenVPN là giải&nbsp;pháp VPN mã nguồn&nbsp;mở, bảo mật cao, thường
  dùng&nbsp;để truy cập hệ&nbsp;thống nội bộ&nbsp;từ xa (dev, staging,
  production)&nbsp;thông qua kênh mã hóa.&nbsp;Bài viết này&nbsp;...
featured_image: /images/blog/openvpn-ubuntu-featured.webp
type: blog
reading_time: 5
view_count: 1
meta: null
published_at: '2025-11-20T08:37:00.000000Z'
created_at: '2026-02-25T18:38:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9617-fab8-72ea-9289-fc13a3eaa969
  name: Linux
  slug: linux
tags:
  - name: linux
    slug: linux
  - name: security
    slug: security
  - name: openvpn
    slug: openvpn
  - name: vpn-server
    slug: vpn-server
  - name: easy-rsa
    slug: easy-rsa
  - name: roeadwarrior
    slug: roeadwarrior
comments: []
---
<p>OpenVPN là giải&nbsp;pháp VPN mã nguồn&nbsp;mở, bảo mật cao, thường dùng&nbsp;để truy cập hệ&nbsp;thống nội bộ&nbsp;từ xa (dev, staging, production)&nbsp;thông qua kênh mã hóa.&nbsp;Bài viết này&nbsp;hướng dẫn cài&nbsp;đặt OpenVPN Server&nbsp;trên Ubuntu&nbsp;24.04 LTS với&nbsp;Easy-RSA để sinh&nbsp;CA, certificate&nbsp;và cấu hình UFW firewall.</p><h2>Chuẩn&nbsp;bị hệ thống</h2><ul><li><p>Yêu cầu:</p><ul><li><p>Máy chủ <strong>Ubuntu&nbsp;24.04</strong> (VPS hoặc&nbsp;bare metal),&nbsp;quyền sudo.</p></li><li><p>Public IP, cổng <strong>1194/UDP</strong>&nbsp;mở trên firewall/router.</p></li><li><p>Client: <strong>Windows/macOS/Linux</strong> hoặc&nbsp;mobile có OpenVPN client.​</p></li></ul></li></ul><h2>Bước 1: Cập nhật hệ thống, hệ điều hành của bạn, ở đây mình sử dụng Ubuntu 22.04</h2><pre><code class="language-shell">sudo apt update &amp;&amp; sudo apt upgrade -y</code></pre><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-112808-1c3097f8.webp" alt="" width="2000" height="1206"><p><span>sudo apt update &amp;&amp; sudo apt upgrade -y</span></p><h2>Bước 2: Tìm và ghi nhận lại ip của bạn</h2><pre><code class="language-shell">ip a
ip a show eth0
</code></pre><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-113032-7f1f78dc.webp" alt="" width="2000" height="1225"><p><span>Tìm và ghi nhận lại ip của bạn</span></p><h2>Bước 3: Tải và chạy file <a target="_blank" rel="noreferrer" class="editor-link" href="https://raw.githubusercontent.com/xdev-asia-labs/openvpn-install/main/openvpn-install.sh"><strong>openvpn-install.sh</strong></a> script</h2><pre><code class="language-shell">wget https://raw.githubusercontent.com/xdev-asia-labs/openvpn-install/main/openvpn-install.sh
chmod +x openvpn-install.sh</code></pre><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-152531-1-4014edb4.webp" alt="" width="1622" height="2156"><p><span>OpenVPN road warrior installer</span></p><p>Kiểm tra xem service hoạt động chưa</p><pre><code class="language-shell">sudo systemctl status openvpn-server@server</code></pre><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-225327-38de1768.webp" alt="" width="2000" height="748"><p><span>sudo systemctl status openvpn-server@server</span></p><p>Kiểm tra xem file <strong>.ovpn</strong> ở đâu</p><pre><code class="language-shell">sudo find / -iname "*.ovpn" -ls
</code></pre><h2>Cài đặt Open VPN Client cho máy cần vào VPN</h2><ol><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="editor-link" href="https://apps.apple.com/us/app/openvpn-connect/id590379981">Apple IOS client</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="editor-link" href="https://play.google.com/store/apps/details?id=net.openvpn.openvpn&amp;hl=en">Android client</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="editor-link" href="https://openvpn.net/client-connect-vpn-for-mac-os/">Apple MacOS client</a></p></li><li><p><a target="_blank" rel="noreferrer" class="editor-link" href="https://openvpn.net/client/">OpenVPN Connect for Windows</a></p></li></ol><p>Ở đây mình sử dụng <strong>Macbook Pro M3 Max </strong>và kết nối thành công</p><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-231139-54fcfde0.webp" alt="" width="1650" height="1776"><p>Như vậy mình đã kết nối thành công rồi đấy.</p><img class="editor-image" src="https://x-lms.test/storage/og/og-image-RbtCXTIh.png" alt="og-image"><p></p>
