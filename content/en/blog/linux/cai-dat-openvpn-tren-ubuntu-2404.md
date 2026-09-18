---
id: 019c9617-fcc0-70c5-82f4-fdf4589ad9d1
title: Install OpenVPN on Ubuntu 24.04
slug: cai-dat-openvpn-tren-ubuntu-2404
excerpt: >-
  OpenVPN is the solution&nbsp;source code VPN solution&nbsp;Open, highly
  secure, commonly used&nbsp;to access us&nbsp;internal system&nbsp;remote (dev,
  staging, production)&nbsp;through encrypted channel.&nbsp;This
  article&nbsp;...
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
locale: en
---
<p>OpenVPN is a highly secure, open source VPN solution, commonly used to access internal systems remotely (dev, staging, production) through an encrypted channel. This article instructions on installing OpenVPN Server on Ubuntu 24.04 LTS with Easy-RSA to generate CA, certificate and UFW firewall configuration.</p><h2>Prepare the system</h2><ul><li><p>Requirements:</p><ul><li><p>Server <strong>Ubuntu 24.04</strong> (VPS or bare metal), sudo permissions.</p></li><li><p>Public IP, port <strong>1194/UDP</strong> open on firewall/router.</p></li><li><p>Clients: <strong>Windows/macOS/Linux</strong> or mobile with OpenVPN client.​</p></li></ul></li></ul><h2>Step 1: Update your system, operating system, here I use Ubuntu 22.04</h2><pre><code class="language-shell">sudo apt update &amp;&amp; sudo apt upgrade -y</code></pre><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-112808-1c3097f8.webp" alt="" width="2000" height="1206"><p><span>sudo apt update && sudo apt upgrade -y</span></p><h2>Step 2: Find and record your IP</h2><pre><code class="language-shell">ip a
ip a show eth0
</code></pre><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-113032-7f1f78dc.webp" alt="" width="2000" height="1225"><p><span>Find and record your IP</span></p><h2>Step 3: Download and run the file <a target="_blank" rel="noreferrer" class="editor-link" href="https://raw.githubusercontent.com/xdev-asia-labs/openvpn-install/main/openvpn-install.sh"><strong>openvpn-install.sh</strong></a> script</h2><pre><code class="language-shell">wget https://raw.githubusercontent.com/xdev-asia-labs/openvpn-install/main/openvpn-install.sh
chmod +x openvpn-install.sh</code></pre><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-152531-1-4014edb4.webp" alt="" width="1622" height="2156"><p><span>OpenVPN road warrior installer</span></p><p>Check to see if the service is working</p><pre><code class="language-shell">sudo systemctl status openvpn-server@server</code></pre><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-225327-38de1768.webp" alt="" width="2000" height="748"><p><span>sudo systemctl status openvpn-server@server</span></p><p>Check to see files <strong>.ovpn</strong> where</p><pre><code class="language-shell">sudo find / -iname "*.ovpn" -ls
</code></pre><h2>Install Open VPN Client for the device that needs VPN access</h2><ol><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="editor-link" href="https://apps.apple.com/us/app/openvpn-connect/id590379981">Apple IOS client</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="editor-link" href="https://play.google.com/store/apps/details?id=net.openvpn.openvpn&amp;hl=en">Android client</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="editor-link" href="https://openvpn.net/client-connect-vpn-for-mac-os/">Apple MacOS client</a></p></li><li><p><a target="_blank" rel="noreferrer" class="editor-link" href="https://openvpn.net/client/">OpenVPN Connect for Windows</a></p></li></ol><p>Here I use it <strong>Macbook Pro M3 Max </strong>and connected successfully</p><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-231139-54fcfde0.webp" alt="" width="1650" height="1776"><p>So I have successfully connected.</p><img class="editor-image" src="https://x-lms.test/storage/og/og-image-RbtCXTIh.png" alt="og-image"><p></p>
