---
id: 019c9617-fcc0-70c5-82f4-fdf4589ad9d1
title: 在 Ubuntu 24.04 上安裝 OpenVPN
slug: cai-dat-openvpn-tren-ubuntu-2404
excerpt: >-
  OpenVPN
  是解決方案&nbsp;VPN解決方案原始碼&nbsp;開放、安全高、常用&nbsp;訪問我們&nbsp;內部系統&nbsp;遠端（開發、登台、生產）&nbsp;透過加密通道。&nbsp;本文&nbsp;…
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
locale: zh-tw
---
<p>OpenVPN 是一種高度安全的開源 VPN 解決方案，通常用於透過加密通道遠端存取內部系統（開發、登台、生產）。 本文說明如何在 Ubuntu 24.04 LTS 上使用 Easy-RSA 安裝 OpenVPN Server 以產生 CA、憑證和 UFW 防火牆設定。</p><h2>準備系統</h2><ul><li><p>要求：</p><ul><li><p>伺服器 <strong>Ubuntu 24.04</strong> （VPS 或裸機）、sudo 權限。</p></li><li><p>公網IP、連接埠 <strong>1194/UDP</strong> 在防火牆/路由器上開啟。</p></li><li><p>客戶： <strong>Windows/macOS/Linux</strong> 或具有 OpenVPN 用戶端的行動裝置。號</p></li></ul></li></ul><h2>步驟1：更新你的系統，作業系統，這裡我使用Ubuntu 22.04</h2><pre><code class="language-shell">sudo apt update &amp;&amp; sudo apt upgrade -y</code></pre><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-112808-1c3097f8.webp" alt="" width="2000" height="1206"><p><span>sudo apt 更新 && sudo apt 升級 -y</span></p><h2>步驟2：尋找並記錄您的IP</h2><pre><code class="language-shell">ip a
ip a show eth0
</code></pre><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-113032-7f1f78dc.webp" alt="" width="2000" height="1225"><p><span>尋找並記錄您的IP</span></p><h2>第 3 步：下載並執行文件 <a target="_blank" rel="noreferrer" class="editor-link" href="https://raw.githubusercontent.com/xdev-asia-labs/openvpn-install/main/openvpn-install.sh"><strong>openvpn-install.sh</strong></a> 腳本</h2><pre><code class="language-shell">wget https://raw.githubusercontent.com/xdev-asia-labs/openvpn-install/main/openvpn-install.sh
chmod +x openvpn-install.sh</code></pre><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-152531-1-4014edb4.webp" alt="" width="1622" height="2156"><p><span>OpenVPN 公路戰士安裝程序</span></p><p>檢查服務是否正常運作</p><pre><code class="language-shell">sudo systemctl status openvpn-server@server</code></pre><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-225327-38de1768.webp" alt="" width="2000" height="748"><p><span>sudo systemctl 狀態 openvpn-server@server</span></p><p>檢查以查看文件 <strong>.ovpn</strong> 哪裡</p><pre><code class="language-shell">sudo find / -iname "*.ovpn" -ls
</code></pre><h2>為需要 VPN 存取的裝置安裝 Open VPN Client</h2><ol><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="editor-link" href="https://apps.apple.com/us/app/openvpn-connect/id590379981">蘋果IOS客戶端</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="editor-link" href="https://play.google.com/store/apps/details?id=net.openvpn.openvpn&amp;hl=en">安卓客戶端</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="editor-link" href="https://openvpn.net/client-connect-vpn-for-mac-os/">蘋果MacOS客戶端</a></p></li><li><p><a target="_blank" rel="noreferrer" class="editor-link" href="https://openvpn.net/client/">適用於 Windows 的 OpenVPN 連接</a></p></li></ol><p>這裡我用的是 <strong>Macbook Pro M3 Max </strong>並連接成功</p><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-231139-54fcfde0.webp" alt="" width="1650" height="1776"><p>這樣我就連結成功了。</p><img class="editor-image" src="https://x-lms.test/storage/og/og-image-RbtCXTIh.png" alt="og-image"><p></p>
