---
id: 019d65ef-d36f-773e-bf0a-9e3dd57adcb1
title: '第15課：容器、自動化和生產環境最佳實踐'
slug: bai-15-containers-automation-va-production-best-practices
description: >-
  在VyOS上使用容器、Ansible自動化、API、備份、升級、安全性和實際部署，Ansible playbook實驗室練習。
duration_minutes: 170
is_free: true
video_url: null
sort_order: 15
section_title: "VyOS：從基礎到進階"
course:
  id: 019d65ef-d36f-773e-bf0a-9e2efc5e19df
  title: VyOS：從基礎到進階
  slug: vyos-tu-co-ban-den-nang-cao
locale: zh-tw
---
<img src="/storage/uploads/2026/04/vyos-15-automation.webp" alt="容器、自動化和生產環境最佳實踐" style="display:block;margin:24px auto 32px auto;max-width:700px;width:100%;border-radius:18px;box-shadow:0 4px 32px #0002" loading="lazy" />

<h2>VyOS上的容器、自動化和生產環境最佳實踐</h2>
<p>VyOS 1.4/1.5支援容器（Podman），允許執行輔助服務、exporter、監控。此外，VyOS提供API、支援Ansible、備份、升級以及生產環境的最佳實踐。</p>
<h3>VyOS上的容器</h3>
<pre><code class="language-bash">set container name prometheus-exporter image prom/node-exporter
set container name prometheus-exporter network bridge address 192.168.50.10/24
set container name prometheus-exporter health-check interval 30
</code></pre>
<p>支援bridge、macvlan、health-check，使用Podman CLI管理。</p>
<h3>使用Ansible自動化</h3>
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
<h3>VyOS HTTP API和REST API</h3>
<pre><code class="language-bash">set service https api listen-address 0.0.0.0
set service https api port 8443
</code></pre>
<p>通過REST API發送配置命令：</p>
<pre><code class="language-bash">curl -k -u vyos:password -X POST https://vyos:8443/configure -d '{"op": "set", "path": ["interfaces", "ethernet", "eth0", "address"], "value": "192.168.1.2/24"}'
</code></pre>
<h3>指令碼和自訂命令</h3>
<pre><code class="language-bash">set system login user vyos authentication plaintext-password 'password'
run show version
</code></pre>
<h3>備份、升級和回滾</h3>
<pre><code class="language-bash"># 備份設定
cp /config/config.boot /config/backup-$(date +%F).boot
# 升級映像
add system image https://downloads.vyos.io/rolling/current/amd64/vyos-1.5-rolling.iso
# 回滾
set system image default-boot vyos-1.4-rolling
</code></pre>
<h3>安全加固檢查清單</h3>
<ul>
  <li>變更SSH連接埠，停用root登錄，僅允許金鑰。</li>
  <li>停用未使用的服務：<code>delete service telnet</code>、<code>delete service ftp</code>。</li>
  <li>建立防火牆以保護VyOS本身。</li>
</ul>
<h3>生產環境部署場景</h3>
<ul>
  <li>家庭路由器：NAT、VPN、防火牆、監控。</li>
  <li>小型企業：雙WAN、HA、容器exporter。</li>
  <li>ISP邊界：BGP、IPsec、自動化、備份。</li>
</ul>
<h3>實踐實驗室：Ansible Playbook部署VyOS設定</h3>
<ol>
  <li>準備<code>ansible.cfg</code>和<code>hosts</code>檔案，含VyOS IP。</li>
  <li>編寫playbook，使用<code>vyos_config</code>模組推送設定。</li>
  <li>執行playbook並檢查VyOS上的狀態。</li>
</ol>
<pre><code class="language-bash">ansible-playbook -i hosts playbook.yaml
</code></pre>
<h3>總結</h3>
<p>本課程幫助您應用容器、Ansible自動化、API使用、備份、升級、安全性，以及在實際生產環境中部署VyOS。</p>