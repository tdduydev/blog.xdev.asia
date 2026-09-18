---
id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
title: VyOS 從入門到進階
slug: vyos-tu-co-ban-den-nang-cao
description: >-
  關於 VyOS 的全面課程——強大的開源網路作業系統。從安裝、基本設定到防火牆、VPN、
  進階路由（BGP/OSPF）、高可用性、VLAN、WireGuard，以及實際正式環境部署。
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
    title: VyOS 從入門到進階
    description: null
    sort_order: 0
    lessons:
      - id: 019d65ef-d36f-773e-bf0a-9e2fc23d52ba
        title: '第1課：VyOS 介紹與安裝'
        slug: bai-1-gioi-thieu-vyos-va-cai-dat
        description: >-
          VyOS 是什麼、發展歷史（從 Vyatta 到 VyOS）、與 pfSense/OPNsense/MikroTik 的比較、
          系統架構、在裸機/VM（KVM、VirtualBox、Proxmox）上的安裝、
          基本 CLI（configure/commit/save）、設定樹結構。
        duration_minutes: 150
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e30df834552
        title: '第2課：介面設定與基本 IP'
        slug: bai-2-cau-hinh-interface-va-ip-co-ban
        description: >-
          設定 Ethernet 介面、設定靜態 IP 與 DHCP 用戶端、
          使用者與驗證管理、SSH 存取、主機名稱/時區/NTP、
          系統備份與還原設定。
        duration_minutes: 120
        is_free: true
        sort_order: 2
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e31fc512de3
        title: '第3課：NAT——來源 NAT、目的地 NAT 與 Masquerade'
        slug: bai-3-nat-source-nat-destination-nat-va-masquerade
        description: >-
          VyOS 中的 NAT 概念、為 LAN 網際網路存取設定來源 NAT（masquerade）、
          目的地 NAT（連接埠轉送）、1:1 NAT、NPTv6（RFC6296）、
          NAT 規則排序與問題排除。
        duration_minutes: 140
        is_free: true
        sort_order: 3
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3277a273b3
        title: '第4課：基本防火牆——規則、鏈結與群組'
        slug: bai-4-firewall-co-ban-rules-chains-va-groups
        description: >-
          VyOS 防火牆架構（nftables）、input/output/forward 鏈結、
          防火牆規則（accept/drop/reject）、address-group、network-group、
          port-group、在介面上套用防火牆、預設原則、記錄。
        duration_minutes: 180
        is_free: true
        sort_order: 4
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3347cefe91
        title: '第5課：區域型防火牆'
        slug: bai-5-zone-based-firewall
        description: >-
          區域原則概念、設計區域（LAN/WAN/DMZ/GUEST）、
          區域間流量規則、區域型對介面型防火牆的比較、
          網路分割最佳實踐、家庭與小型企業的實際範例。
        duration_minutes: 160
        is_free: true
        sort_order: 5
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e34d7b36e63
        title: '第6課：DHCP 伺服器、DNS 轉送與 NTP'
        slug: bai-6-dhcp-server-dns-forwarding-va-ntp
        description: >-
          設定 DHCP 伺服器（位址池、靜態租約、選項）、DHCPv6、
          DHCP 中繼、含快取的 DNS 轉送、靜態 DNS 項目、
          NTP 伺服器、系統服務管理。
        duration_minutes: 130
        is_free: true
        sort_order: 6
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e354f8246f3
        title: '第7課：VLAN、Bonding 與 Bridge'
        slug: bai-7-vlans-bonding-va-bridge
        description: >-
          在 VyOS 上設定 802.1Q VLAN、VLAN 間路由、
          介面 Bonding（LACP）、Bridge 介面、結合 VLAN 與防火牆區域、
          Trunk 與 Access 連接埠、實際網路分割範例。
        duration_minutes: 150
        is_free: true
        sort_order: 7
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e36c62f858f
        title: '第8課：靜態路由與原則路由'
        slug: bai-8-static-routing-va-policy-based-routing
        description: >-
          靜態路由、預設閘道、黑洞路由、容錯路由、
          原則路由（PBR）與 route-map、路由表、
          多條上行鏈路、透明代理路由、VRF 基礎。
        duration_minutes: 150
        is_free: true
        sort_order: 8
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e37dfd74e6b
        title: '第9課：動態路由——OSPF'
        slug: bai-9-dynamic-routing-ospf
        description: >-
          OSPF（Open Shortest Path First）介紹、區域、在 VyOS 上設定 OSPF、
          使用 ECMP 的 OSPF unnumbered、路由重分發、被動介面、
          驗證、OSPF 鄰居問題排除、使用 show 指令驗證。
        duration_minutes: 170
        is_free: true
        sort_order: 9
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e387917d59e
        title: '第10課：動態路由——BGP'
        slug: bai-10-dynamic-routing-bgp
        description: >-
          BGP（Border Gateway Protocol）介紹、iBGP 與 eBGP、
          在 VyOS 上設定 BGP 鄰居、route-map 與 prefix-list、
          AS-path prepending、BGP 社群、路由反射器、
          使用擴充 nexthop 的 BGP IPv6 unnumbered。
        duration_minutes: 180
        is_free: true
        sort_order: 10
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3982d5a422
        title: '第11課：VPN——WireGuard 與 OpenVPN'
        slug: bai-11-vpn-wireguard-va-openvpn
        description: >-
          WireGuard 站台間與遠端存取 VPN、金鑰產生、
          使用預先共用金鑰的 OpenVPN 站台間、使用憑證的 OpenVPN 遠端存取、
          WireGuard 與 OpenVPN 的比較、透過 VPN 隧道路由流量。
        duration_minutes: 170
        is_free: true
        sort_order: 11
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3a653e2f50
        title: '第12課：VPN——IPsec 站台間'
        slug: bai-12-vpn-ipsec-site-to-site
        description: >-
          IPsec 基礎（IKEv2、ESP、SA）、原則型與路由型（VTI）VPN、
          VyOS 間的站台間 IPsec、連接至 Cisco/Palo Alto/Azure 的 IPsec VPN、
          DMVPN 雙 Hub 拓撲、VTI 介面、IPsec 隧道問題排除。
        duration_minutes: 180
        is_free: true
        sort_order: 12
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3bbb16e57f
        title: '第13課：高可用性——VRRP 與 Conntrack Sync'
        slug: bai-13-high-availability-vrrp-va-conntrack-sync
        description: >-
          VyOS 上的 VRRP（Virtual Router Redundancy Protocol）、
          使用 VRRP 優先順序的主動-被動 HA、保持連線的 conntrack-sync、
          HA 配對間的設定同步、容錯移轉測試、
          正式環境的 HA 設計（VM 主節點 + 實體備援）。
        duration_minutes: 160
        is_free: true
        sort_order: 13
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3cc2fa6f1e
        title: '第14課：WAN 負載均衡、QoS 與監控'
        slug: bai-14-wan-load-balancing-qos-va-monitoring
        description: >-
          WAN 負載均衡（distribute/failover）、介面健康檢查、
          使用 CAKE/HTB/shaper 的 QoS、流量優先化、
          NetFlow/sFlow 監控、SNMP、Prometheus exporter、
          記錄與 TLS 上的 syslog。
        duration_minutes: 160
        is_free: true
        sort_order: 14
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3dd57adcb1
        title: '第15課：容器、自動化與正式環境最佳實踐'
        slug: bai-15-containers-automation-va-production-best-practices
        description: >-
          在 VyOS 上執行容器（Podman）、Ansible 自動化、
          VyOS API（HTTP API）、腳本與自訂指令、
          備份策略、升級/回滾、資安強化、
          正式環境檢查清單與實際部署情境。
        duration_minutes: 170
        is_free: true
        sort_order: 15
        video_url: null
reviews: []
quizzes: []
---
<h2><strong>第1課：VyOS 介紹與安裝</strong></h2>
<ul>
<li>VyOS 是什麼？從 Vyatta 到 VyOS 的歷史</li>
<li>VyOS vs pfSense vs OPNsense vs MikroTik 比較</li>
<li>系統架構與設定模型（設定樹）</li>
<li>在 VM（KVM/VirtualBox/Proxmox）與裸機上下載和安裝</li>
<li>基本 CLI：configure、commit、save、show、compare</li>
<li>實驗：在 VirtualBox 上安裝 VyOS，SSH 進行管理</li>
</ul>

<h2><strong>第2課：介面設定與基本 IP</strong></h2>
<ul>
<li>設定 Ethernet 介面（set interfaces ethernet ethX）</li>
<li>靜態 IP 與 DHCP 用戶端</li>
<li>使用者管理、驗證、SSH 金鑰</li>
<li>主機名稱、時區、NTP</li>
<li>系統備份/還原設定</li>
<li>實驗：建立 2 個介面的路由器（WAN + LAN）</li>
</ul>

<h2><strong>第3課：NAT——來源 NAT、目的地 NAT 與 Masquerade</strong></h2>
<ul>
<li>NAT 是什麼？為什麼需要 NAT？</li>
<li>來源 NAT（masquerade）——讓 LAN 存取網際網路</li>
<li>目的地 NAT——連接埠轉送至內部伺服器</li>
<li>1:1 NAT 與 NPTv6</li>
<li>NAT 規則排序與優先順序</li>
<li>實驗：設定 masquerade + HTTP/SSH 連接埠轉送</li>
</ul>

<h2><strong>第4課：基本防火牆——規則、鏈結與群組</strong></h2>
<ul>
<li>VyOS 防火牆架構（nftables 後端）</li>
<li>Input、output、forward 鏈結</li>
<li>防火牆規則：accept、drop、reject、log</li>
<li>Address-group、network-group、port-group</li>
<li>在介面上套用防火牆（in/out/local）</li>
<li>預設原則與規則排序</li>
<li>實驗：保護路由器 + 允許 LAN 存取網際網路</li>
</ul>

<h2><strong>第5課：區域型防火牆</strong></h2>
<ul>
<li>VyOS 中的 zone-policy 概念</li>
<li>設計區域：LAN、WAN、DMZ、GUEST</li>
<li>區域間流量規則</li>
<li>區域型與介面型防火牆的比較</li>
<li>網路分割最佳實踐</li>
<li>實驗：為 3 個區域的家庭網路設定 zone-policy</li>
</ul>

<h2><strong>第6課：DHCP 伺服器、DNS 轉送與 NTP</strong></h2>
<ul>
<li>DHCP 伺服器：位址池、範圍、靜態租約、選項</li>
<li>DHCPv6 伺服器與 SLAAC</li>
<li>DHCP 中繼</li>
<li>含本機快取的 DNS 轉送</li>
<li>靜態 DNS 項目（主機覆蓋）</li>
<li>LAN 用戶端的 NTP 伺服器</li>
<li>實驗：完整的內部網路 DHCP + DNS</li>
</ul>

<h2><strong>第7課：VLAN、Bonding 與 Bridge</strong></h2>
<ul>
<li>802.1Q VLAN：建立子介面（eth0.10、eth0.20）</li>
<li>VLAN 間路由（路由器單臂路由）</li>
<li>介面 Bonding（LACP 802.3ad）</li>
<li>Bridge 介面</li>
<li>結合 VLAN + 防火牆區域</li>
<li>實驗：使用 VLAN 分割 LAN/GUEST/IoT 網路</li>
</ul>

<h2><strong>第8課：靜態路由與原則路由</strong></h2>
<ul>
<li>靜態路由與預設閘道</li>
<li>黑洞路由與容錯路由</li>
<li>原則路由（PBR）：route-map、路由表</li>
<li>多條上行鏈路：按來源 IP 路由</li>
<li>透明代理路由</li>
<li>VRF（虛擬路由與轉送）基礎</li>
<li>實驗：使用 PBR + 容錯的雙 WAN</li>
</ul>

<h2><strong>第9課：動態路由——OSPF</strong></h2>
<ul>
<li>OSPF 基礎：區域、LSA、成本</li>
<li>在 VyOS 上設定 OSPF（單一區域與多區域）</li>
<li>使用 ECMP 的 OSPF unnumbered</li>
<li>路由重分發</li>
<li>被動介面與驗證</li>
<li>問題排除：show ip ospf neighbor/route/database</li>
<li>實驗：3 台 VyOS 路由器的 OSPF，多區域</li>
</ul>

<h2><strong>第10課：動態路由——BGP</strong></h2>
<ul>
<li>BGP 基礎：AS、iBGP 與 eBGP</li>
<li>在 VyOS 上設定 BGP 鄰居</li>
<li>Route-map、prefix-list、AS-path 過濾</li>
<li>AS-path prepending 與 BGP 社群</li>
<li>路由反射器</li>
<li>使用擴充 nexthop 的 BGP IPv6 unnumbered</li>
<li>實驗：使用 route-map 的 2 個 AS 間 BGP 對等</li>
</ul>

<h2><strong>第11課：VPN——WireGuard 與 OpenVPN</strong></h2>
<ul>
<li>WireGuard 站台間：金鑰產生、對等設定</li>
<li>WireGuard 遠端存取 VPN</li>
<li>使用預先共用金鑰的 OpenVPN 站台間</li>
<li>使用憑證的 OpenVPN 遠端存取</li>
<li>WireGuard 與 OpenVPN 與 IPsec 的比較</li>
<li>透過 VPN 隧道路由流量</li>
<li>實驗：2 台 VyOS 間的 WireGuard 站台間 VPN</li>
</ul>

<h2><strong>第12課：VPN——IPsec 站台間</strong></h2>
<ul>
<li>IPsec 基礎：IKEv2、ESP、SA、提案</li>
<li>原則型與路由型（VTI）VPN</li>
<li>2 台 VyOS 間的站台間 IPsec</li>
<li>連接至 Cisco、Palo Alto、Azure 的 IPsec VPN</li>
<li>DMVPN 雙 Hub 拓撲</li>
<li>IPsec 隧道問題排除</li>
<li>實驗：使用 BGP overlay 的路由型 IPsec VPN</li>
</ul>

<h2><strong>第13課：高可用性——VRRP 與 Conntrack Sync</strong></h2>
<ul>
<li>VRRP（Virtual Router Redundancy Protocol）</li>
<li>主動-被動 HA：優先順序、搶佔</li>
<li>容錯移轉時保持連線的 conntrack-sync</li>
<li>HA 配對間的設定同步</li>
<li>容錯移轉測試與驗證</li>
<li>HA 設計：VM 主節點 + 實體備援</li>
<li>實驗：使用 VRRP + conntrack-sync 的 VyOS HA 配對</li>
</ul>

<h2><strong>第14課：WAN 負載均衡、QoS 與監控</strong></h2>
<ul>
<li>WAN 負載均衡：distribute、failover、weights</li>
<li>介面健康檢查（ping/HTTP）</li>
<li>使用 CAKE、HTB、流量塑形的 QoS</li>
<li>流量優先化（VoIP、遊戲、工作）</li>
<li>NetFlow/sFlow 監控</li>
<li>SNMP、Prometheus exporter、Telegraf</li>
<li>Syslog 與 TLS 上的 syslog</li>
<li>實驗：家庭用雙 WAN 負載均衡 + QoS</li>
</ul>

<h2><strong>第15課：容器、自動化與正式環境最佳實踐</strong></h2>
<ul>
<li>在 VyOS 上執行容器（Podman）</li>
<li>VyOS 的 Ansible 自動化</li>
<li>VyOS HTTP API</li>
<li>腳本與自訂 op-mode 指令</li>
<li>備份策略與設定版本控制</li>
<li>映像升級與回滾</li>
<li>資安強化檢查清單</li>
<li>實際正式環境部署情境</li>
<li>實驗：部署完整 VyOS 設定的 Ansible Playbook</li>
</ul>
