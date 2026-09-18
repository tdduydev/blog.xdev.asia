---
id: 019d65ef-d36f-773e-bf0a-9e3dd57adcb1
locale: ja
title: '第15課：Containers、Automation と Production Best Practices'
slug: bai-15-containers-automation-va-production-best-practices
description: >-
  VyOS でのコンテナ活用、Ansible/API による自動化、バックアップ、アップグレード、セキュリティ強化、実運用展開、Ansible playbook ラボを解説します。
duration_minutes: 170
is_free: true
video_url: null
sort_order: 15
section_title: "VyOSの基礎から応用まで"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOSの基礎から応用まで
  slug: vyos-tu-co-ban-den-nang-cao
---
<img src="/storage/uploads/2026/04/vyos-15-automation.webp" alt="Containers、Automation と Production Best Practices" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>VyOS における Containers、Automation と Production Best Practices</h2>
<p>VyOS 1.4/1.5 はコンテナ（Podman）をサポートしており、補助サービス、exporter、monitoring を実行できます。さらに、VyOS は API、Ansible、バックアップ、アップグレードに対応し、本番運用向けのベストプラクティスを提供します。</p>
<h3>VyOS 上の Containers</h3>
<pre><code class="language-bash">set container name prometheus-exporter image prom/node-exporter
set container name prometheus-exporter network bridge address 192.168.50.10/24
set container name prometheus-exporter health-check interval 30
</code></pre>
<p>bridge、macvlan、health-check をサポートし、Podman CLI で管理できます。</p>
<h3>Ansible による自動化</h3>
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
<h3>VyOS HTTP API と REST API</h3>
<pre><code class="language-bash">set service https api listen-address 0.0.0.0
set service https api port 8443
</code></pre>
<p>REST API 経由で設定コマンドを送信します。</p>
<pre><code class="language-bash">curl -k -u vyos:password -X POST https://vyos:8443/configure -d '{"op": "set", "path": ["interfaces", "ethernet", "eth0", "address"], "value": "192.168.1.2/24"}'
</code></pre>
<h3>Scripting と Custom Commands</h3>
<pre><code class="language-bash">set system login user vyos authentication plaintext-password 'password'
run show version
</code></pre>
<h3>Backup、Upgrade と Rollback</h3>
<pre><code class="language-bash"># Backup config
cp /config/config.boot /config/backup-$(date +%F).boot
# Upgrade image
add system image https://downloads.vyos.io/rolling/current/amd64/vyos-1.5-rolling.iso
# Rollback
set system image default-boot vyos-1.4-rolling
</code></pre>
<h3>Security Hardening Checklist</h3>
<ul>
  <li>SSH ポート変更、root login 無効化、鍵認証のみにします。</li>
  <li>不要サービスを停止します: <code>delete service telnet</code>、<code>delete service ftp</code>。</li>
  <li>VyOS 自身を保護する firewall を設定します。</li>
</ul>
<h3>Production Deployment Scenarios</h3>
<ul>
  <li>Home router: NAT、VPN、firewall、monitoring。</li>
  <li>Small business: dual-WAN、HA、container exporter。</li>
  <li>ISP edge: BGP、IPsec、automation、backup。</li>
</ul>
<h3>ハンズオンラボ: Ansible Playbook による VyOS 設定展開</h3>
<ol>
  <li>VyOS の IP を含む <code>ansible.cfg</code> と <code>hosts</code> を準備します。</li>
  <li><code>vyos_config</code> モジュールを使用した playbook を作成します。</li>
  <li>playbook を実行し、VyOS 側の状態を確認します。</li>
</ol>
<pre><code class="language-bash">ansible-playbook -i hosts playbook.yaml
</code></pre>
<h3>まとめ</h3>
<p>このレッスンで、コンテナ運用、Ansible 自動化、API 活用、バックアップ、アップグレード、セキュリティ強化を組み合わせた VyOS の本番運用パターンを実践できます。</p>
