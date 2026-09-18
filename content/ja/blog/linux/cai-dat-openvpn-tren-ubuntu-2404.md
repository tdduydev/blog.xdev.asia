---
id: 019c9617-fcc0-70c5-82f4-fdf4589ad9d1
title: Ubuntu 24.04 に OpenVPN をインストールする
slug: cai-dat-openvpn-tren-ubuntu-2404
excerpt: >-
  OpenVPN が解決策です&nbsp;ソースコード VPN
  ソリューション&nbsp;オープン、安全性が高く、よく使われる&nbsp;私たちにアクセスするには&nbsp;内部システム&nbsp;リモート
  (開発、ステージング、本番)&nbsp;暗号化されたチャネルを介して。&nbsp;この記事&nbsp;...
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
locale: ja
---
<p>OpenVPN は、安全性の高いオープンソースの VPN ソリューションであり、暗号化されたチャネルを通じて内部システム (開発、ステージング、本番) にリモートでアクセスするためによく使用されます。 この記事では、Easy-RSA を備えた Ubuntu 24.04 LTS に OpenVPN Server をインストールして CA、証明書、UFW ファイアウォール構成を生成する方法について説明します。</p><h2>システムを準備する</h2><ul><li><p>要件:</p><ul><li><p>サーバー <strong>Ubuntu 24.04</strong> （VPS またはベアメタル）、sudo 権限。</p></li><li><p>パブリックIP、ポート <strong>1194/UDP</strong> ファイアウォール/ルーター上で開いています。</p></li><li><p>クライアント: <strong>Windows/macOS/Linux</strong> または OpenVPN クライアントを備えたモバイル。</p></li></ul></li></ul><h2>ステップ 1: システム、オペレーティング システムを更新します。ここでは Ubuntu 22.04 を使用します。</h2><pre><code class="language-shell">sudo apt update &amp;&amp; sudo apt upgrade -y</code></pre><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-112808-1c3097f8.webp" alt="" width="2000" height="1206"><p><span>sudo apt update && sudo apt upgrade -y</span></p><h2>ステップ 2: IP を見つけて記録する</h2><pre><code class="language-shell">ip a
ip a show eth0
</code></pre><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-113032-7f1f78dc.webp" alt="" width="2000" height="1225"><p><span>IPを見つけて記録する</span></p><h2>ステップ 3: ファイルをダウンロードして実行する <a target="_blank" rel="noreferrer" class="editor-link" href="https://raw.githubusercontent.com/xdev-asia-labs/openvpn-install/main/openvpn-install.sh"><strong>openvpn-install.sh</strong></a> スクリプト</h2><pre><code class="language-shell">wget https://raw.githubusercontent.com/xdev-asia-labs/openvpn-install/main/openvpn-install.sh
chmod +x openvpn-install.sh</code></pre><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-152531-1-4014edb4.webp" alt="" width="1622" height="2156"><p><span>OpenVPN ロードウォリアー インストーラー</span></p><p>サービスが動作しているかどうかを確認する</p><pre><code class="language-shell">sudo systemctl status openvpn-server@server</code></pre><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-225327-38de1768.webp" alt="" width="2000" height="748"><p><span>sudo systemctl status openvpn-server@server</span></p><p>ファイルを確認するにはチェックを入れてください <strong>.ovpn</strong> どこで</p><pre><code class="language-shell">sudo find / -iname "*.ovpn" -ls
</code></pre><h2>VPN アクセスが必要なデバイスに Open VPN Client をインストールします。</h2><ol><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="editor-link" href="https://apps.apple.com/us/app/openvpn-connect/id590379981">Apple IOSクライアント</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="editor-link" href="https://play.google.com/store/apps/details?id=net.openvpn.openvpn&amp;hl=en">Androidクライアント</a></p></li><li><p><a target="_blank" rel="noopener noreferrer nofollow" class="editor-link" href="https://openvpn.net/client-connect-vpn-for-mac-os/">Apple MacOS クライアント</a></p></li><li><p><a target="_blank" rel="noreferrer" class="editor-link" href="https://openvpn.net/client/">Windows 用 OpenVPN Connect</a></p></li></ol><p>ここで私はそれを使います <strong>MacBook Pro M3 Max </strong>そして正常に接続されました</p><img class="editor-image" src="/storage/uploads/2025/11/screenshot-2025-11-21-at-231139-54fcfde0.webp" alt="" width="1650" height="1776"><p>ということで無事接続できました。</p><img class="editor-image" src="https://x-lms.test/storage/og/og-image-RbtCXTIh.png" alt="og-image"><p></p>
