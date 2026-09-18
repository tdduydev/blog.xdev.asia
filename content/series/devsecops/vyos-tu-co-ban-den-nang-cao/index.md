---
id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
title: VyOS từ Cơ bản đến Nâng cao
slug: vyos-tu-co-ban-den-nang-cao
description: >-
  Khóa học toàn diện về VyOS — hệ điều hành mạng mã nguồn mở mạnh mẽ. Từ cài đặt,
  cấu hình cơ bản đến firewall, VPN, routing nâng cao (BGP/OSPF), High Availability,
  VLANs, WireGuard, và triển khai production thực tế.
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
    title: VyOS từ Cơ bản đến Nâng cao
    description: null
    sort_order: 0
    lessons:
      - id: 019d65ef-d36f-773e-bf0a-9e2fc23d52ba
        title: 'Bài 1: Giới thiệu VyOS và Cài đặt'
        slug: bai-1-gioi-thieu-vyos-va-cai-dat
        description: >-
          VyOS là gì, lịch sử phát triển (từ Vyatta đến VyOS), so sánh với pfSense/OPNsense/MikroTik,
          kiến trúc hệ thống, cài đặt trên bare-metal/VM (KVM, VirtualBox, Proxmox),
          CLI cơ bản (configure/commit/save), cấu trúc configuration tree.
        duration_minutes: 150
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e30df834552
        title: 'Bài 2: Cấu hình Interface và IP cơ bản'
        slug: bai-2-cau-hinh-interface-va-ip-co-ban
        description: >-
          Cấu hình Ethernet interfaces, đặt IP tĩnh và DHCP client,
          quản lý users và authentication, SSH access, hostname/timezone/NTP,
          system backup và restore configuration.
        duration_minutes: 120
        is_free: true
        sort_order: 2
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e31fc512de3
        title: 'Bài 3: NAT — Source NAT, Destination NAT và Masquerade'
        slug: bai-3-nat-source-nat-destination-nat-va-masquerade
        description: >-
          Khái niệm NAT trong VyOS, cấu hình Source NAT (masquerade) cho LAN ra internet,
          Destination NAT (port forwarding), 1:1 NAT, NPTv6 (RFC6296),
          NAT rules ordering và troubleshooting.
        duration_minutes: 140
        is_free: true
        sort_order: 3
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3277a273b3
        title: 'Bài 4: Firewall cơ bản — Rules, Chains và Groups'
        slug: bai-4-firewall-co-ban-rules-chains-va-groups
        description: >-
          Kiến trúc firewall VyOS (nftables), input/output/forward chains,
          firewall rules (accept/drop/reject), address-group, network-group,
          port-group, áp dụng firewall lên interfaces, default policy, logging.
        duration_minutes: 180
        is_free: true
        sort_order: 4
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3347cefe91
        title: 'Bài 5: Zone-based Firewall'
        slug: bai-5-zone-based-firewall
        description: >-
          Khái niệm zone-policy, thiết kế zones (LAN/WAN/DMZ/GUEST),
          inter-zone traffic rules, zone-policy vs interface-based firewall,
          best practices phân vùng mạng, ví dụ thực tế cho mạng gia đình và doanh nghiệp nhỏ.
        duration_minutes: 160
        is_free: true
        sort_order: 5
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e34d7b36e63
        title: 'Bài 6: DHCP Server, DNS Forwarding và NTP'
        slug: bai-6-dhcp-server-dns-forwarding-va-ntp
        description: >-
          Cấu hình DHCP Server (pools, static leases, options), DHCPv6,
          DHCP relay, DNS forwarding với cache, DNS entries tĩnh,
          NTP server, system services management.
        duration_minutes: 130
        is_free: true
        sort_order: 6
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e354f8246f3
        title: 'Bài 7: VLANs, Bonding và Bridge'
        slug: bai-7-vlans-bonding-va-bridge
        description: >-
          Cấu hình 802.1Q VLANs trên VyOS, inter-VLAN routing,
          interface bonding (LACP), bridge interfaces, kết hợp VLANs với firewall zones,
          trunk và access ports, ví dụ thực tế segmentation mạng.
        duration_minutes: 150
        is_free: true
        sort_order: 7
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e36c62f858f
        title: 'Bài 8: Static Routing và Policy-Based Routing'
        slug: bai-8-static-routing-va-policy-based-routing
        description: >-
          Static routes, default gateway, blackhole routes, failover routes,
          Policy-Based Routing (PBR) với route-map, routing tables,
          multiple uplinks, transparent proxy routing, VRF basics.
        duration_minutes: 150
        is_free: true
        sort_order: 8
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e37dfd74e6b
        title: 'Bài 9: Dynamic Routing — OSPF'
        slug: bai-9-dynamic-routing-ospf
        description: >-
          Giới thiệu OSPF (Open Shortest Path First), areas, cấu hình OSPF trên VyOS,
          OSPF unnumbered với ECMP, redistributing routes, passive interfaces,
          authentication, troubleshooting OSPF neighbors, verify với show commands.
        duration_minutes: 170
        is_free: true
        sort_order: 9
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e387917d59e
        title: 'Bài 10: Dynamic Routing — BGP'
        slug: bai-10-dynamic-routing-bgp
        description: >-
          Giới thiệu BGP (Border Gateway Protocol), iBGP vs eBGP, 
          cấu hình BGP neighbors, route-maps và prefix-lists,
          AS-path prepending, BGP communities, Route Reflector,
          BGP IPv6 unnumbered với extended nexthop.
        duration_minutes: 180
        is_free: true
        sort_order: 10
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3982d5a422
        title: 'Bài 11: VPN — WireGuard và OpenVPN'
        slug: bai-11-vpn-wireguard-va-openvpn
        description: >-
          WireGuard site-to-site và remote access VPN, key generation,
          OpenVPN site-to-site với pre-shared key, OpenVPN remote access với certificates,
          so sánh WireGuard vs OpenVPN, routing qua VPN tunnels.
        duration_minutes: 170
        is_free: true
        sort_order: 11
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3a653e2f50
        title: 'Bài 12: VPN — IPsec Site-to-Site'
        slug: bai-12-vpn-ipsec-site-to-site
        description: >-
          IPsec fundamentals (IKEv2, ESP, SA), policy-based vs route-based VPN,
          site-to-site IPsec với VyOS, IPsec tới Cisco/Palo Alto/Azure,
          DMVPN dual hub, VTI interfaces, troubleshooting IPsec tunnels.
        duration_minutes: 180
        is_free: true
        sort_order: 12
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3bbb16e57f
        title: 'Bài 13: High Availability — VRRP và Conntrack Sync'
        slug: bai-13-high-availability-vrrp-va-conntrack-sync
        description: >-
          VRRP (Virtual Router Redundancy Protocol) trên VyOS,
          active-passive HA với VRRP priorities, conntrack-sync để giữ sessions,
          config-sync giữa HA pair, failover testing,
          HA design cho production (VM primary + physical backup).
        duration_minutes: 160
        is_free: true
        sort_order: 13
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3cc2fa6f1e
        title: 'Bài 14: WAN Load Balancing, QoS và Monitoring'
        slug: bai-14-wan-load-balancing-qos-va-monitoring
        description: >-
          WAN load balancing (distribute/failover), interface health checks,
          QoS với CAKE/HTB/shaper, traffic prioritization,
          NetFlow/sFlow monitoring, SNMP, Prometheus exporter,
          logging và syslog over TLS.
        duration_minutes: 160
        is_free: true
        sort_order: 14
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3dd57adcb1
        title: 'Bài 15: Containers, Automation và Production Best Practices'
        slug: bai-15-containers-automation-va-production-best-practices
        description: >-
          Chạy containers (Podman) trên VyOS, Ansible automation,
          VyOS API (HTTP API), scripting và custom commands,
          backup strategies, upgrade/rollback, security hardening,
          production checklist và real-world deployment scenarios.
        duration_minutes: 170
        is_free: true
        sort_order: 15
        video_url: null
reviews: []
quizzes: []
---
<h2><strong>Bài 1: Giới thiệu VyOS và Cài đặt</strong></h2>
<ul>
<li>VyOS là gì? Lịch sử từ Vyatta → VyOS</li>
<li>So sánh VyOS vs pfSense vs OPNsense vs MikroTik</li>
<li>Kiến trúc hệ thống và mô hình cấu hình (configuration tree)</li>
<li>Tải và cài đặt trên VM (KVM/VirtualBox/Proxmox) và bare-metal</li>
<li>CLI cơ bản: configure, commit, save, show, compare</li>
<li>Lab: Cài đặt VyOS trên VirtualBox, SSH vào quản lý</li>
</ul>

<h2><strong>Bài 2: Cấu hình Interface và IP cơ bản</strong></h2>
<ul>
<li>Cấu hình Ethernet interfaces (set interfaces ethernet ethX)</li>
<li>IP tĩnh và DHCP client</li>
<li>Quản lý users, authentication, SSH keys</li>
<li>Hostname, timezone, NTP</li>
<li>System backup/restore configuration</li>
<li>Lab: Thiết lập router 2 interface (WAN + LAN)</li>
</ul>

<h2><strong>Bài 3: NAT — Source NAT, Destination NAT và Masquerade</strong></h2>
<ul>
<li>NAT là gì? Tại sao cần NAT?</li>
<li>Source NAT (masquerade) — cho LAN truy cập internet</li>
<li>Destination NAT — port forwarding vào server nội bộ</li>
<li>1:1 NAT và NPTv6</li>
<li>NAT rules ordering và priority</li>
<li>Lab: Cấu hình masquerade + port forward HTTP/SSH</li>
</ul>

<h2><strong>Bài 4: Firewall cơ bản — Rules, Chains và Groups</strong></h2>
<ul>
<li>Kiến trúc firewall VyOS (nftables backend)</li>
<li>Input, output, forward chains</li>
<li>Firewall rules: accept, drop, reject, log</li>
<li>Address-group, network-group, port-group</li>
<li>Áp dụng firewall lên interfaces (in/out/local)</li>
<li>Default policy và rule ordering</li>
<li>Lab: Bảo vệ router + cho phép LAN ra internet</li>
</ul>

<h2><strong>Bài 5: Zone-based Firewall</strong></h2>
<ul>
<li>Khái niệm zone-policy trong VyOS</li>
<li>Thiết kế zones: LAN, WAN, DMZ, GUEST</li>
<li>Inter-zone traffic rules</li>
<li>So sánh zone-based vs interface-based firewall</li>
<li>Best practices phân vùng mạng</li>
<li>Lab: Setup zone-policy cho mạng gia đình 3 zones</li>
</ul>

<h2><strong>Bài 6: DHCP Server, DNS Forwarding và NTP</strong></h2>
<ul>
<li>DHCP Server: pools, ranges, static leases, options</li>
<li>DHCPv6 server và SLAAC</li>
<li>DHCP relay</li>
<li>DNS forwarding với local cache</li>
<li>Static DNS entries (host overrides)</li>
<li>NTP server cho LAN clients</li>
<li>Lab: DHCP + DNS cho mạng nội bộ hoàn chỉnh</li>
</ul>

<h2><strong>Bài 7: VLANs, Bonding và Bridge</strong></h2>
<ul>
<li>802.1Q VLANs: tạo sub-interfaces (eth0.10, eth0.20)</li>
<li>Inter-VLAN routing (router-on-a-stick)</li>
<li>Interface bonding (LACP 802.3ad)</li>
<li>Bridge interfaces</li>
<li>Kết hợp VLANs + firewall zones</li>
<li>Lab: Tách mạng LAN/GUEST/IoT bằng VLANs</li>
</ul>

<h2><strong>Bài 8: Static Routing và Policy-Based Routing</strong></h2>
<ul>
<li>Static routes và default gateway</li>
<li>Blackhole routes và failover routes</li>
<li>Policy-Based Routing (PBR): route-map, routing tables</li>
<li>Multiple uplinks: định tuyến theo source IP</li>
<li>Transparent proxy routing</li>
<li>VRF (Virtual Routing and Forwarding) cơ bản</li>
<li>Lab: Dual-WAN với PBR + failover</li>
</ul>

<h2><strong>Bài 9: Dynamic Routing — OSPF</strong></h2>
<ul>
<li>OSPF fundamentals: areas, LSA, cost</li>
<li>Cấu hình OSPF trên VyOS (single area và multi-area)</li>
<li>OSPF unnumbered với ECMP</li>
<li>Route redistribution</li>
<li>Passive interfaces và authentication</li>
<li>Troubleshooting: show ip ospf neighbor/route/database</li>
<li>Lab: OSPF 3 routers VyOS, multi-area</li>
</ul>

<h2><strong>Bài 10: Dynamic Routing — BGP</strong></h2>
<ul>
<li>BGP fundamentals: AS, iBGP vs eBGP</li>
<li>Cấu hình BGP neighbors trên VyOS</li>
<li>Route-maps, prefix-lists, AS-path filtering</li>
<li>AS-path prepending và BGP communities</li>
<li>Route Reflector</li>
<li>BGP IPv6 unnumbered với extended nexthop</li>
<li>Lab: BGP peering giữa 2 AS với route-map</li>
</ul>

<h2><strong>Bài 11: VPN — WireGuard và OpenVPN</strong></h2>
<ul>
<li>WireGuard site-to-site: key generation, peer config</li>
<li>WireGuard remote access VPN</li>
<li>OpenVPN site-to-site với pre-shared key</li>
<li>OpenVPN remote access với certificates</li>
<li>So sánh WireGuard vs OpenVPN vs IPsec</li>
<li>Routing traffic qua VPN tunnels</li>
<li>Lab: WireGuard site-to-site giữa 2 VyOS</li>
</ul>

<h2><strong>Bài 12: VPN — IPsec Site-to-Site</strong></h2>
<ul>
<li>IPsec fundamentals: IKEv2, ESP, SA, proposals</li>
<li>Policy-based vs route-based (VTI) VPN</li>
<li>Site-to-site IPsec giữa 2 VyOS</li>
<li>IPsec VPN tới Cisco, Palo Alto, Azure</li>
<li>DMVPN dual hub topology</li>
<li>Troubleshooting IPsec tunnels</li>
<li>Lab: Route-based IPsec VPN với BGP overlay</li>
</ul>

<h2><strong>Bài 13: High Availability — VRRP và Conntrack Sync</strong></h2>
<ul>
<li>VRRP (Virtual Router Redundancy Protocol)</li>
<li>Active-passive HA: priorities, preemption</li>
<li>Conntrack-sync giữ sessions khi failover</li>
<li>Configuration sync giữa HA pair</li>
<li>Failover testing và validation</li>
<li>HA design: VM primary + physical backup</li>
<li>Lab: HA pair VyOS với VRRP + conntrack-sync</li>
</ul>

<h2><strong>Bài 14: WAN Load Balancing, QoS và Monitoring</strong></h2>
<ul>
<li>WAN load balancing: distribute, failover, weights</li>
<li>Interface health checks (ping/HTTP)</li>
<li>QoS với CAKE, HTB, traffic shaping</li>
<li>Traffic prioritization (VoIP, gaming, work)</li>
<li>NetFlow/sFlow monitoring</li>
<li>SNMP, Prometheus exporter, Telegraf</li>
<li>Syslog và syslog over TLS</li>
<li>Lab: Dual-WAN load balancing + QoS cho home</li>
</ul>

<h2><strong>Bài 15: Containers, Automation và Production Best Practices</strong></h2>
<ul>
<li>Chạy containers (Podman) trên VyOS</li>
<li>Ansible automation cho VyOS</li>
<li>VyOS HTTP API</li>
<li>Scripting và custom op-mode commands</li>
<li>Backup strategies và config versioning</li>
<li>Image upgrade và rollback</li>
<li>Security hardening checklist</li>
<li>Production deployment scenarios thực tế</li>
<li>Lab: Ansible playbook triển khai full VyOS config</li>
</ul>
