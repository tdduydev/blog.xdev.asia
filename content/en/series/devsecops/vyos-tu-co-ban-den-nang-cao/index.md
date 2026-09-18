---
id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
title: VyOS from Basics to Advanced
slug: vyos-tu-co-ban-den-nang-cao
description: >-
  A comprehensive course on VyOS — a powerful open-source network operating system.
  From installation and basic configuration to firewall, VPN, advanced routing
  (BGP/OSPF), High Availability, VLANs, WireGuard, and real-world production deployment.
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
    title: VyOS from Basics to Advanced
    description: null
    sort_order: 0
    lessons:
      - id: 019d65ef-d36f-773e-bf0a-9e2fc23d52ba
        title: 'Lesson 1: Introduction to VyOS and Installation'
        slug: bai-1-gioi-thieu-vyos-va-cai-dat
        description: >-
          What is VyOS, its history (from Vyatta to VyOS), comparison with pfSense/OPNsense/MikroTik,
          system architecture, installation on bare-metal/VM (KVM, VirtualBox, Proxmox),
          basic CLI (configure/commit/save), and the configuration tree structure.
        duration_minutes: 150
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e30df834552
        title: 'Lesson 2: Interface Configuration and Basic IP'
        slug: bai-2-cau-hinh-interface-va-ip-co-ban
        description: >-
          Configuring Ethernet interfaces, setting static IPs and DHCP client,
          user and authentication management, SSH access, hostname/timezone/NTP,
          and system backup and restore configuration.
        duration_minutes: 120
        is_free: true
        sort_order: 2
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e31fc512de3
        title: 'Lesson 3: NAT — Source NAT, Destination NAT and Masquerade'
        slug: bai-3-nat-source-nat-destination-nat-va-masquerade
        description: >-
          NAT concepts in VyOS, configuring Source NAT (masquerade) for LAN internet access,
          Destination NAT (port forwarding), 1:1 NAT, NPTv6 (RFC6296),
          NAT rules ordering and troubleshooting.
        duration_minutes: 140
        is_free: true
        sort_order: 3
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3277a273b3
        title: 'Lesson 4: Basic Firewall — Rules, Chains and Groups'
        slug: bai-4-firewall-co-ban-rules-chains-va-groups
        description: >-
          VyOS firewall architecture (nftables), input/output/forward chains,
          firewall rules (accept/drop/reject), address-group, network-group,
          port-group, applying firewall to interfaces, default policy, and logging.
        duration_minutes: 180
        is_free: true
        sort_order: 4
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3347cefe91
        title: 'Lesson 5: Zone-based Firewall'
        slug: bai-5-zone-based-firewall
        description: >-
          Zone-policy concepts, designing zones (LAN/WAN/DMZ/GUEST),
          inter-zone traffic rules, zone-policy vs interface-based firewall,
          network segmentation best practices, and real-world examples for home
          and small business networks.
        duration_minutes: 160
        is_free: true
        sort_order: 5
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e34d7b36e63
        title: 'Lesson 6: DHCP Server, DNS Forwarding and NTP'
        slug: bai-6-dhcp-server-dns-forwarding-va-ntp
        description: >-
          Configuring DHCP Server (pools, static leases, options), DHCPv6,
          DHCP relay, DNS forwarding with cache, static DNS entries,
          NTP server, and system services management.
        duration_minutes: 130
        is_free: true
        sort_order: 6
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e354f8246f3
        title: 'Lesson 7: VLANs, Bonding and Bridge'
        slug: bai-7-vlans-bonding-va-bridge
        description: >-
          Configuring 802.1Q VLANs on VyOS, inter-VLAN routing,
          interface bonding (LACP), bridge interfaces, combining VLANs with firewall zones,
          trunk and access ports, and real-world network segmentation examples.
        duration_minutes: 150
        is_free: true
        sort_order: 7
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e36c62f858f
        title: 'Lesson 8: Static Routing and Policy-Based Routing'
        slug: bai-8-static-routing-va-policy-based-routing
        description: >-
          Static routes, default gateway, blackhole routes, failover routes,
          Policy-Based Routing (PBR) with route-map, routing tables,
          multiple uplinks, transparent proxy routing, and VRF basics.
        duration_minutes: 150
        is_free: true
        sort_order: 8
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e37dfd74e6b
        title: 'Lesson 9: Dynamic Routing — OSPF'
        slug: bai-9-dynamic-routing-ospf
        description: >-
          Introduction to OSPF (Open Shortest Path First), areas, configuring OSPF on VyOS,
          OSPF unnumbered with ECMP, redistributing routes, passive interfaces,
          authentication, troubleshooting OSPF neighbors, and verifying with show commands.
        duration_minutes: 170
        is_free: true
        sort_order: 9
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e387917d59e
        title: 'Lesson 10: Dynamic Routing — BGP'
        slug: bai-10-dynamic-routing-bgp
        description: >-
          Introduction to BGP (Border Gateway Protocol), iBGP vs eBGP,
          configuring BGP neighbors, route-maps and prefix-lists,
          AS-path prepending, BGP communities, Route Reflector,
          and BGP IPv6 unnumbered with extended nexthop.
        duration_minutes: 180
        is_free: true
        sort_order: 10
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3982d5a422
        title: 'Lesson 11: VPN — WireGuard and OpenVPN'
        slug: bai-11-vpn-wireguard-va-openvpn
        description: >-
          WireGuard site-to-site and remote access VPN, key generation,
          OpenVPN site-to-site with pre-shared key, OpenVPN remote access with certificates,
          WireGuard vs OpenVPN comparison, and routing traffic through VPN tunnels.
        duration_minutes: 170
        is_free: true
        sort_order: 11
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3a653e2f50
        title: 'Lesson 12: VPN — IPsec Site-to-Site'
        slug: bai-12-vpn-ipsec-site-to-site
        description: >-
          IPsec fundamentals (IKEv2, ESP, SA), policy-based vs route-based VPN,
          site-to-site IPsec with VyOS, IPsec to Cisco/Palo Alto/Azure,
          DMVPN dual hub, VTI interfaces, and troubleshooting IPsec tunnels.
        duration_minutes: 180
        is_free: true
        sort_order: 12
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3bbb16e57f
        title: 'Lesson 13: High Availability — VRRP and Conntrack Sync'
        slug: bai-13-high-availability-vrrp-va-conntrack-sync
        description: >-
          VRRP (Virtual Router Redundancy Protocol) on VyOS,
          active-passive HA with VRRP priorities, conntrack-sync to preserve sessions,
          config-sync between HA pair, failover testing,
          and HA design for production (VM primary + physical backup).
        duration_minutes: 160
        is_free: true
        sort_order: 13
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3cc2fa6f1e
        title: 'Lesson 14: WAN Load Balancing, QoS and Monitoring'
        slug: bai-14-wan-load-balancing-qos-va-monitoring
        description: >-
          WAN load balancing (distribute/failover), interface health checks,
          QoS with CAKE/HTB/shaper, traffic prioritization,
          NetFlow/sFlow monitoring, SNMP, Prometheus exporter,
          and logging with syslog over TLS.
        duration_minutes: 160
        is_free: true
        sort_order: 14
        video_url: null
      - id: 019d65ef-d36f-773e-bf0a-9e3dd57adcb1
        title: 'Lesson 15: Containers, Automation and Production Best Practices'
        slug: bai-15-containers-automation-va-production-best-practices
        description: >-
          Running containers (Podman) on VyOS, Ansible automation,
          VyOS API (HTTP API), scripting and custom commands,
          backup strategies, upgrade/rollback, security hardening,
          production checklist, and real-world deployment scenarios.
        duration_minutes: 170
        is_free: true
        sort_order: 15
        video_url: null
reviews: []
quizzes: []
---
<h2><strong>Lesson 1: Introduction to VyOS and Installation</strong></h2>
<ul>
<li>What is VyOS? History from Vyatta → VyOS</li>
<li>VyOS vs pfSense vs OPNsense vs MikroTik comparison</li>
<li>System architecture and configuration model (configuration tree)</li>
<li>Downloading and installing on VM (KVM/VirtualBox/Proxmox) and bare-metal</li>
<li>Basic CLI: configure, commit, save, show, compare</li>
<li>Lab: Install VyOS on VirtualBox, SSH in for management</li>
</ul>

<h2><strong>Lesson 2: Interface Configuration and Basic IP</strong></h2>
<ul>
<li>Configuring Ethernet interfaces (set interfaces ethernet ethX)</li>
<li>Static IP and DHCP client</li>
<li>User management, authentication, SSH keys</li>
<li>Hostname, timezone, NTP</li>
<li>System backup/restore configuration</li>
<li>Lab: Set up a 2-interface router (WAN + LAN)</li>
</ul>

<h2><strong>Lesson 3: NAT — Source NAT, Destination NAT and Masquerade</strong></h2>
<ul>
<li>What is NAT? Why do we need NAT?</li>
<li>Source NAT (masquerade) — for LAN to access the internet</li>
<li>Destination NAT — port forwarding to internal servers</li>
<li>1:1 NAT and NPTv6</li>
<li>NAT rules ordering and priority</li>
<li>Lab: Configure masquerade + HTTP/SSH port forwarding</li>
</ul>

<h2><strong>Lesson 4: Basic Firewall — Rules, Chains and Groups</strong></h2>
<ul>
<li>VyOS firewall architecture (nftables backend)</li>
<li>Input, output, forward chains</li>
<li>Firewall rules: accept, drop, reject, log</li>
<li>Address-group, network-group, port-group</li>
<li>Applying firewall to interfaces (in/out/local)</li>
<li>Default policy and rule ordering</li>
<li>Lab: Protect router + allow LAN to access the internet</li>
</ul>

<h2><strong>Lesson 5: Zone-based Firewall</strong></h2>
<ul>
<li>Zone-policy concepts in VyOS</li>
<li>Designing zones: LAN, WAN, DMZ, GUEST</li>
<li>Inter-zone traffic rules</li>
<li>Zone-based vs interface-based firewall comparison</li>
<li>Network segmentation best practices</li>
<li>Lab: Set up zone-policy for a 3-zone home network</li>
</ul>

<h2><strong>Lesson 6: DHCP Server, DNS Forwarding and NTP</strong></h2>
<ul>
<li>DHCP Server: pools, ranges, static leases, options</li>
<li>DHCPv6 server and SLAAC</li>
<li>DHCP relay</li>
<li>DNS forwarding with local cache</li>
<li>Static DNS entries (host overrides)</li>
<li>NTP server for LAN clients</li>
<li>Lab: Complete DHCP + DNS for an internal network</li>
</ul>

<h2><strong>Lesson 7: VLANs, Bonding and Bridge</strong></h2>
<ul>
<li>802.1Q VLANs: creating sub-interfaces (eth0.10, eth0.20)</li>
<li>Inter-VLAN routing (router-on-a-stick)</li>
<li>Interface bonding (LACP 802.3ad)</li>
<li>Bridge interfaces</li>
<li>Combining VLANs + firewall zones</li>
<li>Lab: Separate LAN/GUEST/IoT networks using VLANs</li>
</ul>

<h2><strong>Lesson 8: Static Routing and Policy-Based Routing</strong></h2>
<ul>
<li>Static routes and default gateway</li>
<li>Blackhole routes and failover routes</li>
<li>Policy-Based Routing (PBR): route-map, routing tables</li>
<li>Multiple uplinks: route by source IP</li>
<li>Transparent proxy routing</li>
<li>VRF (Virtual Routing and Forwarding) basics</li>
<li>Lab: Dual-WAN with PBR + failover</li>
</ul>

<h2><strong>Lesson 9: Dynamic Routing — OSPF</strong></h2>
<ul>
<li>OSPF fundamentals: areas, LSA, cost</li>
<li>Configuring OSPF on VyOS (single area and multi-area)</li>
<li>OSPF unnumbered with ECMP</li>
<li>Route redistribution</li>
<li>Passive interfaces and authentication</li>
<li>Troubleshooting: show ip ospf neighbor/route/database</li>
<li>Lab: OSPF with 3 VyOS routers, multi-area</li>
</ul>

<h2><strong>Lesson 10: Dynamic Routing — BGP</strong></h2>
<ul>
<li>BGP fundamentals: AS, iBGP vs eBGP</li>
<li>Configuring BGP neighbors on VyOS</li>
<li>Route-maps, prefix-lists, AS-path filtering</li>
<li>AS-path prepending and BGP communities</li>
<li>Route Reflector</li>
<li>BGP IPv6 unnumbered with extended nexthop</li>
<li>Lab: BGP peering between 2 ASes with route-map</li>
</ul>

<h2><strong>Lesson 11: VPN — WireGuard and OpenVPN</strong></h2>
<ul>
<li>WireGuard site-to-site: key generation, peer config</li>
<li>WireGuard remote access VPN</li>
<li>OpenVPN site-to-site with pre-shared key</li>
<li>OpenVPN remote access with certificates</li>
<li>WireGuard vs OpenVPN vs IPsec comparison</li>
<li>Routing traffic through VPN tunnels</li>
<li>Lab: WireGuard site-to-site between 2 VyOS routers</li>
</ul>

<h2><strong>Lesson 12: VPN — IPsec Site-to-Site</strong></h2>
<ul>
<li>IPsec fundamentals: IKEv2, ESP, SA, proposals</li>
<li>Policy-based vs route-based (VTI) VPN</li>
<li>Site-to-site IPsec between 2 VyOS routers</li>
<li>IPsec VPN to Cisco, Palo Alto, Azure</li>
<li>DMVPN dual hub topology</li>
<li>Troubleshooting IPsec tunnels</li>
<li>Lab: Route-based IPsec VPN with BGP overlay</li>
</ul>

<h2><strong>Lesson 13: High Availability — VRRP and Conntrack Sync</strong></h2>
<ul>
<li>VRRP (Virtual Router Redundancy Protocol)</li>
<li>Active-passive HA: priorities, preemption</li>
<li>Conntrack-sync to preserve sessions during failover</li>
<li>Configuration sync between HA pair</li>
<li>Failover testing and validation</li>
<li>HA design: VM primary + physical backup</li>
<li>Lab: HA pair VyOS with VRRP + conntrack-sync</li>
</ul>

<h2><strong>Lesson 14: WAN Load Balancing, QoS and Monitoring</strong></h2>
<ul>
<li>WAN load balancing: distribute, failover, weights</li>
<li>Interface health checks (ping/HTTP)</li>
<li>QoS with CAKE, HTB, traffic shaping</li>
<li>Traffic prioritization (VoIP, gaming, work)</li>
<li>NetFlow/sFlow monitoring</li>
<li>SNMP, Prometheus exporter, Telegraf</li>
<li>Syslog and syslog over TLS</li>
<li>Lab: Dual-WAN load balancing + QoS for home</li>
</ul>

<h2><strong>Lesson 15: Containers, Automation and Production Best Practices</strong></h2>
<ul>
<li>Running containers (Podman) on VyOS</li>
<li>Ansible automation for VyOS</li>
<li>VyOS HTTP API</li>
<li>Scripting and custom op-mode commands</li>
<li>Backup strategies and config versioning</li>
<li>Image upgrade and rollback</li>
<li>Security hardening checklist</li>
<li>Real-world production deployment scenarios</li>
<li>Lab: Ansible playbook to deploy full VyOS config</li>
</ul>
