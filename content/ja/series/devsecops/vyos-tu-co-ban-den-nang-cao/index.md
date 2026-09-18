---
id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
title: VyOSの基礎から応用まで
slug: vyos-tu-co-ban-den-nang-cao
description: >-
  VyOS の総合コース——強力なオープンソースネットワーク OS を基礎から学べます。インストール・基本設定から
  ファイアウォール・VPN・高度なルーティング（BGP/OSPF）・高可用性・VLAN・WireGuard、
  そして実際のプロダクション環境への導入まで網羅します。
featured_image: images/blog/vyos-series-featured.webp
level: beginner
duration_hours: 40
lesson_count: 15
price: '0.00'
is_free: true
view_count: 0
average_rating: '0.00'
review_count: 0
enrollment_count: 0
meta: null
published_at: '2026-04-07T12:00:00.000000Z'
created_at: '2026-04-07T12:00:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9617-faa6-70d6-8679-ee4de1f177b3
  name: DevSecOps
  slug: devsecops
tags:
  - name: VyOS
    slug: vyos
  - name: networking
    slug: networking
  - name: firewall
    slug: firewall
  - name: router
    slug: router
  - name: VPN
    slug: vpn
  - name: linux
    slug: linux
  - name: infrastructure
    slug: infrastructure
  - name: devops
    slug: devops
  - name: security
    slug: security
  - name: BGP
    slug: bgp
  - name: OSPF
    slug: ospf
  - name: WireGuard
    slug: wireguard
  - name: IPsec
    slug: ipsec
  - name: NAT
    slug: nat
  - name: VLAN
    slug: vlan
  - name: DHCP
    slug: dhcp
  - name: DNS
    slug: dns
  - name: highavailability
    slug: highavailability
  - name: opensource
    slug: opensource
  - name: HandsOn
    slug: handson
sections:
  - id: unsectioned
    title: VyOSの基礎から応用まで
    description: null
    sort_order: 0
    lessons:
      - id: 019d65ef-d36f-773e-bf0a-9e2fc23d52ba
        title: '第1課：VyOSの紹介とインストール'
        slug: bai-1-gioi-thieu-vyos-va-cai-dat
        description: >-
          VyOSとは何か、その歴史（VyattaからVyOSへ）、pfSense/OPNsense/MikroTikとの比較、
          システムアーキテクチャ、ベアメタル/VM（KVM、VirtualBox、Proxmox）へのインストール、
          基本CLI（configure/commit/save）、設定ツリー構造。
        duration_minutes: 150
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e30df834552
        title: '第2課：インターフェースの設定と基本IP'
        slug: bai-2-cau-hinh-interface-va-ip-co-ban
        description: >-
          Ethernetインターフェースの設定、固定IPとDHCPクライアントの設定、
          ユーザーと認証の管理、SSHアクセス、ホスト名/タイムゾーン/NTP、
          システムのバックアップとリストア設定。
        duration_minutes: 120
        is_free: true
        sort_order: 2
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e31fc512de3
        title: '第3課：NAT——Source NAT、Destination NATとMasquerade'
        slug: bai-3-nat-source-nat-destination-nat-va-masquerade
        description: >-
          VyOSにおけるNATの概念、LANのインターネットアクセスのためのSource NAT（masquerade）設定、
          Destination NAT（ポートフォワーディング）、1:1 NAT、NPTv6（RFC6296）、
          NATルールの順序とトラブルシューティング。
        duration_minutes: 140
        is_free: true
        sort_order: 3
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3277a273b3
        title: '第4課：基本ファイアウォール——ルール、チェーンとグループ'
        slug: bai-4-firewall-co-ban-rules-chains-va-groups
        description: >-
          VyOSファイアウォールアーキテクチャ（nftables）、input/output/forwardチェーン、
          ファイアウォールルール（accept/drop/reject）、address-group、network-group、
          port-group、インターフェースへのファイアウォール適用、デフォルトポリシー、ロギング。
        duration_minutes: 180
        is_free: true
        sort_order: 4
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3347cefe91
        title: '第5課：ゾーンベースファイアウォール'
        slug: bai-5-zone-based-firewall
        description: >-
          ゾーンポリシーの概念、ゾーン設計（LAN/WAN/DMZ/GUEST）、
          ゾーン間トラフィックルール、ゾーンベース対インターフェースベースファイアウォールの比較、
          ネットワーク分割のベストプラクティス、家庭・中小企業向けの実用例。
        duration_minutes: 160
        is_free: true
        sort_order: 5
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e34d7b36e63
        title: '第6課：DHCPサーバー、DNS転送とNTP'
        slug: bai-6-dhcp-server-dns-forwarding-va-ntp
        description: >-
          DHCPサーバーの設定（プール、スタティックリース、オプション）、DHCPv6、
          DHCPリレー、キャッシュ付きDNS転送、スタティックDNSエントリ、
          NTPサーバー、システムサービス管理。
        duration_minutes: 130
        is_free: true
        sort_order: 6
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e354f8246f3
        title: '第7課：VLAN、ボンディングとブリッジ'
        slug: bai-7-vlans-bonding-va-bridge
        description: >-
          VyOSでの802.1Q VLAN設定、VLAN間ルーティング、
          インターフェースボンディング（LACP）、ブリッジインターフェース、VLANとファイアウォールゾーンの組み合わせ、
          トランクとアクセスポート、実用的なネットワーク分割例。
        duration_minutes: 150
        is_free: true
        sort_order: 7
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e36c62f858f
        title: '第8課：スタティックルーティングとポリシーベースルーティング'
        slug: bai-8-static-routing-va-policy-based-routing
        description: >-
          スタティックルート、デフォルトゲートウェイ、ブラックホールルート、フェイルオーバールート、
          ポリシーベースルーティング（PBR）とroute-map、ルーティングテーブル、
          マルチアップリンク、透過プロキシルーティング、VRF基礎。
        duration_minutes: 150
        is_free: true
        sort_order: 8
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e37dfd74e6b
        title: '第9課：ダイナミックルーティング——OSPF'
        slug: bai-9-dynamic-routing-ospf
        description: >-
          OSPF（Open Shortest Path First）の紹介、エリア、VyOSでのOSPF設定、
          ECMPを使ったOSPF unnumbered、ルート再配布、パッシブインターフェース、
          認証、OSPFネイバーのトラブルシューティング、showコマンドによる確認。
        duration_minutes: 170
        is_free: true
        sort_order: 9
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e387917d59e
        title: '第10課：ダイナミックルーティング——BGP'
        slug: bai-10-dynamic-routing-bgp
        description: >-
          BGP（Border Gateway Protocol）の紹介、iBGPとeBGP、
          VyOSでのBGPネイバー設定、route-mapとprefix-list、
          AS-pathプリペンド、BGPコミュニティ、ルートリフレクター、
          拡張ネクストホップを使ったBGP IPv6 unnumbered。
        duration_minutes: 180
        is_free: true
        sort_order: 10
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3982d5a422
        title: '第11課：VPN——WireGuardとOpenVPN'
        slug: bai-11-vpn-wireguard-va-openvpn
        description: >-
          WireGuardサイト間およびリモートアクセスVPN、鍵生成、
          プリシェアードキーを使ったOpenVPNサイト間、証明書を使ったOpenVPNリモートアクセス、
          WireGuardとOpenVPNの比較、VPNトンネル経由のトラフィックルーティング。
        duration_minutes: 170
        is_free: true
        sort_order: 11
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3a653e2f50
        title: '第12課：VPN——IPsecサイト間'
        slug: bai-12-vpn-ipsec-site-to-site
        description: >-
          IPsecの基礎（IKEv2、ESP、SA）、ポリシーベースとルートベース（VTI）VPNの比較、
          VyOS間サイト間IPsec、Cisco/Palo Alto/AzureへのIPsec VPN、
          DMVPNデュアルハブ、VTIインターフェース、IPsecトンネルのトラブルシューティング。
        duration_minutes: 180
        is_free: true
        sort_order: 12
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3bbb16e57f
        title: '第13課：高可用性——VRRPとConntrack Sync'
        slug: bai-13-high-availability-vrrp-va-conntrack-sync
        description: >-
          VyOS上のVRRP（Virtual Router Redundancy Protocol）、
          VRRPプライオリティによるアクティブ-パッシブHA、セッション維持のためのconntrack-sync、
          HAペア間の設定同期、フェイルオーバーテスト、
          プロダクション向けHA設計（VM プライマリ + 物理バックアップ）。
        duration_minutes: 160
        is_free: true
        sort_order: 13
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3cc2fa6f1e
        title: '第14課：WAN負荷分散、QoSとモニタリング'
        slug: bai-14-wan-load-balancing-qos-va-monitoring
        description: >-
          WAN負荷分散（distribute/failover）、インターフェースヘルスチェック、
          CAKE/HTB/シェーパーによるQoS、トラフィック優先化、
          NetFlow/sFlowモニタリング、SNMP、Prometheusエクスポーター、
          ロギングとTLS経由のsyslog。
        duration_minutes: 160
        is_free: true
        sort_order: 14
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3dd57adcb1
        title: '第15課：コンテナ、自動化とプロダクションベストプラクティス'
        slug: bai-15-containers-automation-va-production-best-practices
        description: >-
          VyOS上でのコンテナ（Podman）実行、Ansibleによる自動化、
          VyOS HTTP API、スクリプティングとカスタムコマンド、
          バックアップ戦略、アップグレード/ロールバック、セキュリティ強化、
          プロダクションチェックリストと実際のデプロイシナリオ。
        duration_minutes: 170
        is_free: true
        sort_order: 15
        video_url: null
reviews: []
quizzes: []
---
<h2><strong>第1課：VyOSの紹介とインストール</strong></h2>
<ul>
<li>VyOSとは？VyattaからVyOSへの歴史</li>
<li>VyOS vs pfSense vs OPNsense vs MikroTikの比較</li>
<li>システムアーキテクチャと設定モデル（設定ツリー）</li>
<li>VM（KVM/VirtualBox/Proxmox）とベアメタルへのダウンロード・インストール</li>
<li>基本CLI：configure、commit、save、show、compare</li>
<li>ラボ：VirtualBoxにVyOSをインストール、SSHで管理</li>
</ul>

<h2><strong>第2課：インターフェースの設定と基本IP</strong></h2>
<ul>
<li>Ethernetインターフェースの設定（set interfaces ethernet ethX）</li>
<li>固定IPとDHCPクライアント</li>
<li>ユーザー管理、認証、SSHキー</li>
<li>ホスト名、タイムゾーン、NTP</li>
<li>システムバックアップ/リストア設定</li>
<li>ラボ：2インターフェースルーター（WAN + LAN）のセットアップ</li>
</ul>

<h2><strong>第3課：NAT——Source NAT、Destination NATとMasquerade</strong></h2>
<ul>
<li>NATとは？なぜNATが必要か？</li>
<li>Source NAT（masquerade）——LANからインターネットアクセスのため</li>
<li>Destination NAT——内部サーバーへのポートフォワーディング</li>
<li>1:1 NATとNPTv6</li>
<li>NATルールの順序と優先度</li>
<li>ラボ：masquerade + HTTP/SSHポートフォワードの設定</li>
</ul>

<h2><strong>第4課：基本ファイアウォール——ルール、チェーンとグループ</strong></h2>
<ul>
<li>VyOSファイアウォールアーキテクチャ（nftablesバックエンド）</li>
<li>Input、output、forwardチェーン</li>
<li>ファイアウォールルール：accept、drop、reject、log</li>
<li>Address-group、network-group、port-group</li>
<li>インターフェースへのファイアウォール適用（in/out/local）</li>
<li>デフォルトポリシーとルール順序</li>
<li>ラボ：ルーターの保護 + LANのインターネットアクセス許可</li>
</ul>

<h2><strong>第5課：ゾーンベースファイアウォール</strong></h2>
<ul>
<li>VyOSにおけるzone-policyの概念</li>
<li>ゾーン設計：LAN、WAN、DMZ、GUEST</li>
<li>ゾーン間トラフィックルール</li>
<li>ゾーンベース対インターフェースベースファイアウォールの比較</li>
<li>ネットワーク分割のベストプラクティス</li>
<li>ラボ：3ゾーンの家庭ネットワーク向けzone-policyのセットアップ</li>
</ul>

<h2><strong>第6課：DHCPサーバー、DNS転送とNTP</strong></h2>
<ul>
<li>DHCPサーバー：プール、レンジ、スタティックリース、オプション</li>
<li>DHCPv6サーバーとSLAAC</li>
<li>DHCPリレー</li>
<li>ローカルキャッシュ付きDNS転送</li>
<li>スタティックDNSエントリ（ホストオーバーライド）</li>
<li>LANクライアント向けNTPサーバー</li>
<li>ラボ：社内ネットワーク向け完全なDHCP + DNS</li>
</ul>

<h2><strong>第7課：VLAN、ボンディングとブリッジ</strong></h2>
<ul>
<li>802.1Q VLAN：サブインターフェースの作成（eth0.10、eth0.20）</li>
<li>VLAN間ルーティング（ルーターオンスティック）</li>
<li>インターフェースボンディング（LACP 802.3ad）</li>
<li>ブリッジインターフェース</li>
<li>VLANとファイアウォールゾーンの組み合わせ</li>
<li>ラボ：VLANを使ったLAN/GUEST/IoTネットワークの分割</li>
</ul>

<h2><strong>第8課：スタティックルーティングとポリシーベースルーティング</strong></h2>
<ul>
<li>スタティックルートとデフォルトゲートウェイ</li>
<li>ブラックホールルートとフェイルオーバールート</li>
<li>ポリシーベースルーティング（PBR）：route-map、ルーティングテーブル</li>
<li>マルチアップリンク：送信元IPによるルーティング</li>
<li>透過プロキシルーティング</li>
<li>VRF（Virtual Routing and Forwarding）の基礎</li>
<li>ラボ：PBR + フェイルオーバーを使ったデュアルWAN</li>
</ul>

<h2><strong>第9課：ダイナミックルーティング——OSPF</strong></h2>
<ul>
<li>OSPFの基礎：エリア、LSA、コスト</li>
<li>VyOSでのOSPF設定（シングルエリアとマルチエリア）</li>
<li>ECMPを使ったOSPF unnumbered</li>
<li>ルート再配布</li>
<li>パッシブインターフェースと認証</li>
<li>トラブルシューティング：show ip ospf neighbor/route/database</li>
<li>ラボ：3台のVyOSルーターでOSPF、マルチエリア</li>
</ul>

<h2><strong>第10課：ダイナミックルーティング——BGP</strong></h2>
<ul>
<li>BGPの基礎：AS、iBGP対eBGP</li>
<li>VyOSでのBGPネイバー設定</li>
<li>Route-map、prefix-list、AS-pathフィルタリング</li>
<li>AS-pathプリペンドとBGPコミュニティ</li>
<li>ルートリフレクター</li>
<li>拡張ネクストホップを使ったBGP IPv6 unnumbered</li>
<li>ラボ：route-mapを使った2AS間のBGPピアリング</li>
</ul>

<h2><strong>第11課：VPN——WireGuardとOpenVPN</strong></h2>
<ul>
<li>WireGuardサイト間：鍵生成、ピア設定</li>
<li>WireGuardリモートアクセスVPN</li>
<li>プリシェアードキーを使ったOpenVPNサイト間</li>
<li>証明書を使ったOpenVPNリモートアクセス</li>
<li>WireGuard対OpenVPN対IPsecの比較</li>
<li>VPNトンネル経由のトラフィックルーティング</li>
<li>ラボ：2台のVyOS間のWireGuardサイト間VPN</li>
</ul>

<h2><strong>第12課：VPN——IPsecサイト間</strong></h2>
<ul>
<li>IPsecの基礎：IKEv2、ESP、SA、プロポーザル</li>
<li>ポリシーベース対ルートベース（VTI）VPN</li>
<li>VyOS間のサイト間IPsec</li>
<li>Cisco、Palo Alto、AzureへのIPsec VPN</li>
<li>DMVPNデュアルハブトポロジー</li>
<li>IPsecトンネルのトラブルシューティング</li>
<li>ラボ：BGPオーバーレイを使ったルートベースIPsec VPN</li>
</ul>

<h2><strong>第13課：高可用性——VRRPとConntrack Sync</strong></h2>
<ul>
<li>VRRP（Virtual Router Redundancy Protocol）</li>
<li>アクティブ-パッシブHA：プライオリティ、プリエンプション</li>
<li>フェイルオーバー時のセッション維持のためのconntrack-sync</li>
<li>HAペア間の設定同期</li>
<li>フェイルオーバーテストと検証</li>
<li>HA設計：VMプライマリ + 物理バックアップ</li>
<li>ラボ：VRRP + conntrack-syncを使ったVyOS HAペア</li>
</ul>

<h2><strong>第14課：WAN負荷分散、QoSとモニタリング</strong></h2>
<ul>
<li>WAN負荷分散：distribute、failover、weights</li>
<li>インターフェースヘルスチェック（ping/HTTP）</li>
<li>CAKE、HTB、トラフィックシェーピングによるQoS</li>
<li>トラフィック優先化（VoIP、ゲーム、業務）</li>
<li>NetFlow/sFlowモニタリング</li>
<li>SNMP、Prometheusエクスポーター、Telegraf</li>
<li>SyslogとTLS経由のsyslog</li>
<li>ラボ：家庭向けデュアルWAN負荷分散 + QoS</li>
</ul>

<h2><strong>第15課：コンテナ、自動化とプロダクションベストプラクティス</strong></h2>
<ul>
<li>VyOS上でのコンテナ（Podman）実行</li>
<li>VyOS向けAnsible自動化</li>
<li>VyOS HTTP API</li>
<li>スクリプティングとカスタムop-modeコマンド</li>
<li>バックアップ戦略と設定バージョン管理</li>
<li>イメージのアップグレードとロールバック</li>
<li>セキュリティ強化チェックリスト</li>
<li>実際のプロダクションデプロイシナリオ</li>
<li>ラボ：完全なVyOS設定をデプロイするAnsibleプレイブック</li>
</ul>
