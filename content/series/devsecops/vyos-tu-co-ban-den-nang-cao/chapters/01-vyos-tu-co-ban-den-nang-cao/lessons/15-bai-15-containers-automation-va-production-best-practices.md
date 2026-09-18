---
id: 019d65ef-d36f-773e-bf0a-9e3dd57adcb1
title: 'Bài 15: Containers, Automation và Production Best Practices'
slug: bai-15-containers-automation-va-production-best-practices
description: >-
  Hướng dẫn sử dụng container trên VyOS, tự động hóa với Ansible, API, backup, upgrade, bảo mật và triển khai thực tế, lab thực hành Ansible playbook.
duration_minutes: 170
is_free: true
video_url: null
sort_order: 15
section_title: "VyOS từ Cơ bản đến Nâng cao"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS từ Cơ bản đến Nâng Cao
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-15-automation.webp" alt="Containers, Automation và Production Best Practices" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>Containers, Automation và Production Best Practices trên VyOS</h2>
<p>VyOS 1.4/1.5 hỗ trợ container (Podman) cho phép chạy dịch vụ phụ trợ, exporter, monitoring. Ngoài ra, VyOS cung cấp API, hỗ trợ Ansible, backup, upgrade và các best practices cho môi trường production.</p>
<h3>Containers trên VyOS</h3>
<pre><code class="language-bash">set container name prometheus-exporter image prom/node-exporter
set container name prometheus-exporter network bridge address 192.168.50.10/24
set container name prometheus-exporter health-check interval 30
</code></pre>
<p>Hỗ trợ bridge, macvlan, health-check, quản lý bằng Podman CLI.</p>
<h3>Tự động hóa với Ansible</h3>
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
<h3>VyOS HTTP API và REST API</h3>
<pre><code class="language-bash">set service https api listen-address 0.0.0.0
set service https api port 8443
</code></pre>
<p>Gửi lệnh cấu hình qua REST API:</p>
<pre><code class="language-bash">curl -k -u vyos:password -X POST https://vyos:8443/configure -d '{"op": "set", "path": ["interfaces", "ethernet", "eth0", "address"], "value": "192.168.1.2/24"}'
</code></pre>
<h3>Scripting và Custom Commands</h3>
<pre><code class="language-bash">set system login user vyos authentication plaintext-password 'password'
run show version
</code></pre>
<h3>Backup, Upgrade và Rollback</h3>
<pre><code class="language-bash"># Backup config
cp /config/config.boot /config/backup-$(date +%F).boot
# Upgrade image
add system image https://downloads.vyos.io/rolling/current/amd64/vyos-1.5-rolling.iso
# Rollback
set system image default-boot vyos-1.4-rolling
</code></pre>
<h3>Security Hardening Checklist</h3>
<ul>
  <li>Đổi port SSH, tắt root login, chỉ cho phép key.</li>
  <li>Tắt dịch vụ không dùng: <code>delete service telnet</code>, <code>delete service ftp</code>.</li>
  <li>Thiết lập firewall bảo vệ chính VyOS.</li>
</ul>
<h3>Production Deployment Scenarios</h3>
<ul>
  <li>Home router: NAT, VPN, firewall, monitoring.</li>
  <li>Small business: dual-WAN, HA, container exporter.</li>
  <li>ISP edge: BGP, IPsec, automation, backup.</li>
</ul>
<h3>Lab thực hành: Ansible Playbook triển khai VyOS config</h3>
<ol>
  <li>Chuẩn bị file <code>ansible.cfg</code> và <code>hosts</code> với IP VyOS.</li>
  <li>Viết playbook sử dụng module <code>vyos_config</code> để đẩy cấu hình.</li>
  <li>Chạy playbook và kiểm tra trạng thái trên VyOS.</li>
</ol>
<pre><code class="language-bash">ansible-playbook -i hosts playbook.yaml
</code></pre>
<h3>Tổng kết</h3>
<p>Bài này giúp bạn vận dụng container, tự động hóa với Ansible, sử dụng API, backup, upgrade, bảo mật và triển khai VyOS trong môi trường production thực tế.</p>