---
id: 019d65ef-d36f-773e-bf0a-9e3dd57adcb1
locale: en
title: 'Lesson 15: Containers, Automation and Production Best Practices'
slug: bai-15-containers-automation-va-production-best-practices
description: >-
  Guide to running containers on VyOS, automation with Ansible and API, backup, upgrade, security hardening, real deployments, and an Ansible playbook lab.
duration_minutes: 170
is_free: true
video_url: null
sort_order: 15
section_title: "VyOS from Basics to Advanced"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS from Basics to Advanced
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-15-automation.webp" alt="Containers, Automation and Production Best Practices" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>Containers, Automation and Production Best Practices on VyOS</h2>
<p>VyOS 1.4/1.5 supports containers (Podman), enabling auxiliary services such as exporters and monitoring components. In addition, VyOS provides API support, Ansible integration, backup, upgrades, and operational best practices for production environments.</p>
<h3>Containers on VyOS</h3>
<pre><code class="language-bash">set container name prometheus-exporter image prom/node-exporter
set container name prometheus-exporter network bridge address 192.168.50.10/24
set container name prometheus-exporter health-check interval 30
</code></pre>
<p>Supports bridge, macvlan, health checks, and management via Podman CLI.</p>
<h3>Automation with Ansible</h3>
<pre><code class="language-bash"># ansible.cfg
[defaults]
inventory = ./hosts
host_key_checking = False

# playbook.yaml
- hosts: vyos
  gather_facts: no
  tasks:
    - name: Push config
      vyos.vyos.vyos_config:
        lines:
          - set interfaces ethernet eth0 address 192.168.1.1/24
</code></pre>
<h3>VyOS HTTP API and REST API</h3>
<pre><code class="language-bash">set service https api listen-address 0.0.0.0
set service https api port 8443
</code></pre>
<p>Send configuration commands through REST API:</p>
<pre><code class="language-bash">curl -k -u vyos:password -X POST https://vyos:8443/configure -d '{"op": "set", "path": ["interfaces", "ethernet", "eth0", "address"], "value": "192.168.1.2/24"}'
</code></pre>
<h3>Scripting and custom commands</h3>
<pre><code class="language-bash">set system login user vyos authentication plaintext-password 'password'
run show version
</code></pre>
<h3>Backup, upgrade, and rollback</h3>
<pre><code class="language-bash"># Backup config
cp /config/config.boot /config/backup-$(date +%F).boot
# Upgrade image
add system image https://downloads.vyos.io/rolling/current/amd64/vyos-1.5-rolling.iso
# Rollback
set system image default-boot vyos-1.4-rolling
</code></pre>
<h3>Security hardening checklist</h3>
<ul>
  <li>Change SSH port, disable root login, and allow key-based auth only.</li>
  <li>Disable unused services: <code>delete service telnet</code>, <code>delete service ftp</code>.</li>
  <li>Set firewall policies to protect VyOS itself.</li>
</ul>
<h3>Production deployment scenarios</h3>
<ul>
  <li>Home router: NAT, VPN, firewall, monitoring.</li>
  <li>Small business: dual-WAN, HA, container exporter.</li>
  <li>ISP edge: BGP, IPsec, automation, backup.</li>
</ul>
<h3>Hands-on lab: Ansible playbook deployment for VyOS config</h3>
<ol>
  <li>Prepare <code>ansible.cfg</code> and <code>hosts</code> files with VyOS IP addresses.</li>
  <li>Write a playbook using <code>vyos_config</code> module to push configuration.</li>
  <li>Run the playbook and verify state on VyOS.</li>
</ol>
<pre><code class="language-bash">ansible-playbook -i hosts playbook.yaml
</code></pre>
<h3>Summary</h3>
<p>This lesson helps you apply containers, Ansible automation, APIs, backup, upgrades, security hardening, and production deployment patterns for VyOS in real-world operations.</p>
