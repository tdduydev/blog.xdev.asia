---
id: 019c9617-fd06-7322-b055-2e68380e39b2
title: 使用 Ansible 建立 PostgreSQL 高可用性叢集
slug: xay-dung-postgresql-high-availability-cluster-voi-ansible
excerpt: 分享部署與開源全自動PostgreSQL HA叢集解決方案的經驗
featured_image: /images/blog/postgresql-ha-featured.webp
type: blog
reading_time: 14
view_count: 1
meta: null
published_at: '2025-11-25T16:47:20.000000Z'
created_at: '2026-02-25T18:38:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9617-faa6-70d6-8679-ee4de1f177b3
  name: 開發營運
  slug: devops
tags:
  - name: postgresql
    slug: postgresql
  - name: patroni
    slug: patroni
  - name: etcd
    slug: etcd
  - name: devops
    slug: devops
  - name: cicd
    slug: cicd
  - name: highavailability
    slug: highavailability
  - name: ansible
    slug: ansible
  - name: infrastructure-as-code
    slug: infrastructure-as-code
comments: []
locale: zh-tw
---
<h2 id="gi%E1%BB%9Bi-thi%E1%BB%87u">簡介</h2><p>高可用性（HA）是生產環境中任何資料庫系統的基本要求。然而，從頭開始部署PostgreSQL HA叢集往往需要大量的研究時間，手動設定時容易出錯，難以保持跨環境的一致性。</p><p>本文分享了我們使用 Ansible 開發完整自動化解決方案的經驗，有助於快速可靠地部署 PostgreSQL HA 叢集。在生產中成功使用後，我們決定向社群開源解決方案。</p><p><strong>儲存庫</strong>: <a href="https://github.com/xdev-asia-labs/postgres-patroni-etcd-install">postgres-patroni-etcd-安裝</a></p><h3 id="c%C3%A1c-t%C3%ADnh-n%C4%83ng-ch%C3%ADnh">主要特點</h3><p><strong>自動化與部署</strong></p><ul><li>使用單一命令自動部署整個集群</li><li>配置即程式碼，具有 70 多個集中管理的環境變數</li><li>多環境支援（開發、暫存、生產）</li></ul><p><strong>高可用性</strong></p><ul><li>使用 Patroni 自動故障轉移（轉換時間 30-45 秒）</li><li>使用 PostgreSQL 18.1 進行串流複製</li><li>使用 pg_rewind 自動恢復失敗的節點</li></ul><p><strong>性能和可擴展性</strong></p><ul><li>與 PgBouncer 的連線池（複用比 13:1）</li><li>支援讀取查詢的負載平衡</li><li>針對 RAM 從 16GB 到 64GB+ 的系統進行了最佳化</li></ul><p><strong>開發營運集成</strong></p><ul><li>帶有 GitHub Actions 的 CI/CD 管道</li><li>自動化測試和驗證</li><li>整合安全掃描</li></ul><h2 id="b%E1%BB%91i-c%E1%BA%A3nh-v%C3%A0-%C4%91%E1%BB%99ng-l%E1%BB%B1c-ph%C3%A1t-tri%E1%BB%83n">背景和發展動態</h2><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-th%E1%BB%B1c-t%E1%BA%BF">實際問題</h3><p>在生產作業過程中，我們經歷了一次嚴重的事件，PostgreSQL 伺服器在凌晨 2 點出現硬體錯誤。結果，整個應用程式停止工作，並且需要 45 分鐘才能從備份還原。該事件不僅造成收入損失，也影響聲譽和客戶信任。</p><h3 id="th%C3%A1ch-th%E1%BB%A9c-khi-tri%E1%BB%83n-khai-ha">實施 HA 時的挑戰</h3><p>事件發生後，我們決定實施高可用性解決方案。然而，手動配置面臨許多困難：</p><p><strong>高複雜度</strong>：需要深入了解 PostgreSQL 複製、Patroni、etcd 以及它們之間的交互作用。對於經驗豐富的工程師來說，研究和配置過程需要 2-3 天。</p><p><strong>錯誤風險</strong>：手動配置容易導致節點之間不一致，造成難以調試的問題。設定檔中的一個小錯誤可能會導致整個叢集無法正常運作。</p><p><strong>維護困難</strong>：當需要更新配置或擴展叢集時，必須在每個節點上手動完成，既耗時又容易出錯。</p><p><strong>缺乏文檔</strong>：沒有關於設定過程的詳細文檔，導致新的工程師很難加入專案。</p><h3 id="gi%E1%BA%A3i-ph%C3%A1p">解決方案</h3><p>我們開發了一套 Ansible playbook 來解決上述問題：</p><p><strong>基礎設施即程式碼</strong>：所有配置均受版本控制，易於在需要時查看和回滾。</p><p><strong>可重複部署</strong>：只需更改文件即可在許多不同的環境（開發、登台、生產）上部署相同的叢集 <code>.env</code>。</p><p><strong>自我記錄</strong>：Ansible程式碼清晰，附有詳細的README，方便新團隊瞭解與使用。</p><p><strong>持續集成/持續交付集成</strong>：在部署之前自動驗證配置，最大限度地減少錯誤風險。</p><p>在生產中成功使用該解決方案超過 6 個月後，我們決定開源解決方案以與社區分享。</p><h2 id="ki%E1%BA%BFn-tr%C3%BAc-h%E1%BB%87-th%E1%BB%91ng">系統架構</h2><h3 id="tech-stack">技術堆疊</h3><p>該解決方案使用了社區中成熟的技術：</p>
<!--kg-card-begin: html-->
<table class="sc-jTzLTM pLVjq" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word; font-size: 14px; line-height: 1.6; border-collapse: collapse; color: rgb(212, 212, 212); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(30, 30, 30); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><thead><tr><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">組件</th><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">版本</th><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">角色</th></tr></thead><tbody><tr><td style="padding: 5px 10px;">PostgreSQL</td><td style="padding: 5px 10px;">18.1</td><td style="padding: 5px 10px;">主資料庫引擎</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">派特羅尼</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">4.1.0</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">HA 編排與自動故障轉移</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">等</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">3.5.25</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">分散式配置儲存</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">保鑣</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">1.25.0</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">連接池層</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">安西布爾</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">2.12+</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">基礎設施自動化</td></tr></tbody></table>
<!--kg-card-end: html-->
<h3 id="ki%E1%BA%BFn-tr%C3%BAc-t%E1%BB%95ng-quan">整體架構</h3><pre><code class="language-text">┌─────────────────────────────────────┐
│       Application Layer             │
│  (Spring Boot / Django / Node.js)   │
└──────────────┬──────────────────────┘
               │ Port 6432 (PgBouncer)
        ┌──────┴──────┬──────────┐
        ▼             ▼          ▼
   ┌────────┐    ┌────────┐   ┌────────┐
   │PgBouncer│   │PgBouncer│  │PgBouncer│
   │Node 1   │   │Node 2   │  │Node 3   │
   └────┬───┘    └────┬───┘   └────┬───┘
        │ Port 5432   │             │
   ┌────▼────┐   ┌───▼────┐   ┌────▼────┐
   │PostgreSQL│  │PostgreSQL│ │PostgreSQL│
   │ PRIMARY │  │ REPLICA  │ │ REPLICA  │
   │Read/Write│  │Read Only│ │Read Only │
   └────┬────┘   └────┬────┘  └────┬────┘
        │ Port 8008   │             │
   ┌────▼────┐   ┌────▼────┐  ┌────▼────┐
   │ Patroni │   │ Patroni │  │ Patroni │
   │HA Mgr   │   │HA Mgr   │  │ HA Mgr  │
   └────┬────┘   └────┬────┘  └────┬────┘
        │ Port 2379   │             │
        └──────┬──────┴─────────────┘
               ▼
        ┌──────────────────┐
        │   etcd Cluster   │
        │ (Leader Election)│
        └──────────────────┘
</code></pre><h3 id="gi%E1%BA%A3i-th%C3%ADch-c%C3%A1c-th%C3%A0nh-ph%E1%BA%A7n">成分說明</h3><p><strong>PgBouncer層</strong>：部署在每個節點上，提供連線池。應用程式可以連接到任何節點，減少單點故障和網路延遲。</p><p><strong>PostgreSQL 叢集</strong>：使用具有一個主節點（讀/寫）和兩個副本節點（唯讀）的串流複製。 Patroni 管理集群的整個生命週期。</p><p><strong>派特羅尼</strong>：充當HA編排器，執行持續的健康檢查，當主伺服器發生故障時自動進行故障轉移，並透過分散式共識確保資料一致性。</p><p><strong>etcd集群</strong>：儲存叢集配置並執行領導者選舉。確保一次只有一個主節點，避免出現裂腦狀況。</p><h3 id="t%E1%BA%A1i-sao-3-nodes">為什麼是 3 個節點？</h3><p>3 個節點的數量是 HA 群集的最少數量，因為：</p><ul><li><strong>法定人數</strong>：etcd 至少需要 3 個節點才能達到法定人數 (2/3)，並且可以容忍 1 個節點故障</li><li><strong>成本效益</strong>：足以保證HA，無需在基礎設施上花費太多</li><li><strong>經過驗證的模式</strong>: 是 PostgreSQL 和 etcd 社群推薦的標準數量</li></ul><h2 id="h%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-tri%E1%BB%83n-khai">實施指南</h2><h3 id="y%C3%AAu-c%E1%BA%A7u-h%E1%BB%87-th%E1%BB%91ng">系統需求</h3><p><strong>硬體（每個節點）</strong></p><p>實驗室/開發環境的最低要求：</p><ul><li>CPU：2核心</li><li>記憶體：4GB</li><li>磁碟：20 GB（作業系統）+ 20 GB（資料）</li><li>網路：1 Gbps</li></ul><p>推薦用於生產：</p><ul><li>CPU：4-8核</li><li>記憶體：16-32 GB</li><li>磁碟：50 GB SSD（作業系統）+ 100+ GB NVMe SSD（資料）</li><li>網路：10 Gbps</li></ul><p><strong>軟體</strong></p><p>控制節點（運行 Ansible 的機器）：</p><ul><li>安塞布爾 >= 2.12</li><li>Python >= 3.9</li></ul><p>目標節點：</p><ul><li>Ubuntu 22.04 LTS / Debian 12 / Rocky Linux 9</li><li>使用 root 或 sudo 權限進行 SSH 訪問</li><li>已安裝 Python 3.x</li></ul><h3 id="c%C3%A1c-b%C6%B0%E1%BB%9Bc-tri%E1%BB%83n-khai">實施步驟</h3><p><strong>第 1 步：準備儲存庫</strong></p><pre><code class="language-bash">git clone https://github.com/xdev-asia-labs/postgres-patroni-etcd-install.git
cd postgres-patroni-etcd-install
</code></pre><p><strong>步驟2：配置環境</strong></p><p>從範本建立設定檔：</p><pre><code class="language-bash">cp .env.example .env
</code></pre><p>編輯重要參數：</p><pre><code class="language-bash"># Địa chỉ IP của các nodes
NODE1_IP=10.0.0.11
NODE2_IP=10.0.0.12
NODE3_IP=10.0.0.13

# Mật khẩu PostgreSQL (bắt buộc phải thay đổi)
POSTGRESQL_SUPERUSER_PASSWORD=your_strong_password_here
POSTGRESQL_REPLICATION_PASSWORD=your_replication_password_here

# Performance tuning (ví dụ cho server 16GB RAM)
POSTGRESQL_SHARED_BUFFERS=4GB
POSTGRESQL_EFFECTIVE_CACHE_SIZE=12GB
POSTGRESQL_MAX_CONNECTIONS=100
PGBOUNCER_MAX_CLIENT_CONN=1000
</code></pre><p><strong>第 3 步：配置庫存</strong></p><p>編輯 <code>庫存/hosts.yml</code>:</p><pre><code class="language-yaml">all:
  children:
    postgres:
      hosts:
        pg-node1:
          ansible_host: 10.0.0.11
          patroni_name: node1
</code></pre><p><strong>第四步：部署集群</strong></p><pre><code class="language-bash"># Load environment variables
set -a &amp;&amp; source .env &amp;&amp; set +a

# Deploy cluster
ansible-playbook playbooks/site.yml -i inventory/hosts.yml
</code></pre><p><strong>第 5 步：驗證</strong></p><pre><code class="language-bash">ssh root@10.0.0.11 "patronictl -c /etc/patroni/patroni.yml list"
</code></pre><h2 id="t%C3%ADnh-n%C4%83ng-n%E1%BB%95i-b%E1%BA%ADt">突出特點</h2><h3 id="configuration-as-code">配置即程式碼</h3><p>所有設定都在文件中管理 <code>.env</code> 具有 70 多個變量，有助於：</p><ul><li>輕鬆管理和審核配置</li><li>只需交換文件即可在環境之間切換 <code>.env</code></li><li>更好的安全性 <code>.gitignore</code> 對於敏感數據</li><li>對開發人員友好，無需深入了解 Ansible</li></ul><h3 id="connection-pooling">連接池</h3><p>PgBouncer 配置為優化連線：</p><ul><li>13:1 復用比（3000 個客戶端 → 225 個後端連接）</li><li>具有多主機支援的自動故障轉移</li><li>減少 PostgreSQL 上的記憶體和 CPU 開銷</li></ul><h3 id="zero-downtime-operations">零停機操作</h3><p><strong>計畫切換</strong>：規劃主節點遷移，停機時間僅2-5秒。</p><p><strong>自動故障轉移</strong>：當主資料庫發生故障時，30-45 秒內自動進行故障轉移。</p><p><strong>捲動更新</strong>：更新配置或版本而不影響服務可用性。</p><h2 id="cicd-pipeline">持續集成/持續交付管道</h2><h3 id="automated-validation">自動驗證</h3><p>GitHub Actions 自動驗證每個變更：</p><ul><li>YAML 語法檢查</li><li>Ansible 劇本驗證</li><li>安全掃描（Trivy、TruffleHog）</li><li>代碼品質檢查</li></ul><h3 id="release-automation">發布自動化</h3><p>建立新標籤（v1.0.0）時，GitHub Actions 會自動：</p><ul><li>從 git 歷史記錄產生變更日誌</li><li>建立發布檔案</li><li>發布帶有文件的 GitHub 版本</li></ul><h2 id="performance">效能</h2><p>在具有 3 個節點的測試環境中（16GB RAM，每個節點 5 個核心）：</p><ul><li>讀取QPS：50,000-100,000</li><li>寫入QPS：10,000-20,000</li><li>故障轉移時間：30-45秒</li><li>連線容量：3,000 個客戶端</li><li>查詢延遲：<5ms（簡單查詢）</li></ul><h2 id="b%C3%A0i-h%E1%BB%8Dc-kinh-nghi%E1%BB%87m">經驗教訓</h2><h3 id="1-s%E1%BB%AD-d%E1%BB%A5ng-proven-tools">1.使用經過驗證的工具</h3><p>我們沒有發展自己的技術，而是使用經過驗證的技術，例如 Patroni、etcd 和 PgBouncer。這有助於專注於自動化，而不是重新發明輪子。</p><h3 id="2-configuration-as-code">2. 配置即程式碼</h3><p>外部化配置 <code>.env</code> 檔案而不是劇本中的硬編碼可以輕鬆針對不同環境進行自訂和維護。</p><h3 id="3-security-first">3.安全第一</h3><p>從一開始就始終優先考慮安全性：</p><ul><li>使用 <code>.gitignore</code> 對於敏感文件</li><li>產生強密碼</li><li>自動配置防火牆規則</li><li>將安全掃描整合到 CI 中</li></ul><h3 id="4-documentation-matters">4. 文件事宜</h3><p>良好的文件可以減少入職時間並展示專案的專業性。我們保留英語和越南語的完整文件。</p><h2 id="roadmap">路線圖</h2><p>開發中的特點：</p><ul><li>整合 Prometheus/Grafana 監控</li><li>使用 pgBackRest 自動備份</li><li>Terraform 支援雲端部署</li><li>Docker/Kubernetes 部署選項</li><li>多區域複製</li></ul><h2 id="khi-n%C3%A0o-n%C3%AAn-s%E1%BB%AD-d%E1%BB%A5ng">什麼時候應該使用它？</h2><p><strong>適合：</strong></p><ul><li>應用程式需要高可用性（正常運行時間 > 99.9%）</li><li>系統不能容忍長時間停機</li><li>具有多個並發連接的多租戶應用程式</li><li>團隊應用基礎架構即程式碼</li></ul><p><strong>在以下情況下不需要：</strong></p><ul><li>開發/測試環境簡單</li><li>低流量應用</li><li>應用程式可以接受偶爾的停機</li><li>預算限制（至少需要 3 台伺服器）</li></ul><h2 id="k%E1%BA%BFt-lu%E1%BA%ADn">結論</h2><p>使用正確的工具和方法，建立 PostgreSQL 高可用性叢集不再是一個巨大的挑戰。該解決方案已在生產中得到驗證，有助於確保許多重要係統的正常運作時間。</p><p>借助這套 Ansible playbook，您可以在 10 分鐘內部署一個生產就緒的集群，實現超過 99.9% 的正常運行時間，並根據基礎設施即程式碼方法管理基礎設施。</p><h3 id="%C4%91%C3%B3ng-g%C3%B3p">貢獻</h3><p>如果您發現該項目有用：</p><ul><li>⭐ 明星庫</li><li>🐛 報告問題</li><li>💬 分享回饋</li><li>🤝 貢獻程式碼</li><li>📢 與社區分享</li></ul>
