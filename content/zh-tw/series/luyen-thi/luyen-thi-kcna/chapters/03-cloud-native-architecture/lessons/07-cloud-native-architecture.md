---
id: kcna-d3-l07
title: '第7課：雲原生架構與設計模式'
slug: 07-cloud-native-architecture
description: >-
  雲原生原則、微服務 vs 單體式架構、Service Mesh、12-Factor App、
  不可變基礎設施與雲原生設計模式。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 7
section_title: "Domain 3: Cloud Native Architecture (16%)"
course:
  id: lt-kcna-series-001
  title: 'KCNA 認證備考 — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai7-cloud-native.webp" alt="雲原生架構 — 微服務 vs 單體式、12-Factor App" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="cloud-native">1. 雲原生 — CNCF 定義</h2>

<p>根據 <strong>CNCF（Cloud Native Computing Foundation）</strong>，雲原生是在公有雲、私有雲、混合雲等動態環境中建置和執行可擴展應用程式的方式，使用：<strong>容器、微服務、宣告式 API、不可變基礎設施</strong>。</p>

<table>
<thead><tr><th>原則</th><th>含義</th><th>範例</th></tr></thead>
<tbody>
<tr><td><strong>容器化</strong></td><td>將應用程式與相依套件打包</td><td>Docker image</td></tr>
<tr><td><strong>動態編排</strong></td><td>自動排程、擴展、自我修復</td><td>Kubernetes</td></tr>
<tr><td><strong>微服務</strong></td><td>鬆耦合、單一職責</td><td>Auth Service、Payment Service</td></tr>
<tr><td><strong>宣告式 API</strong></td><td>描述期望狀態，而非步驟</td><td>kubectl apply -f deployment.yaml</td></tr>
<tr><td><strong>不可變基礎設施</strong></td><td>不修改執行中的系統；改為替換</td><td>新映像版本 → Rolling Update</td></tr>
</tbody>
</table>

<h2 id="microservices-vs-monolith">2. 微服務 vs 單體式架構</h2>

<pre><code class="language-text">MONOLITH                          MICROSERVICES
─────────────────────             ──────────────────────────────
┌──────────────────┐              ┌────────┐ ┌────────┐ ┌─────┐
│  Auth    │  UI   │              │  Auth  │ │  Cart  │ │  UI │
│  Cart    │  API  │              │Service │ │Service │ │Svc  │
│  Payment │  DB   │              └────────┘ └────────┘ └─────┘
└──────────────────┘                   │          │         │
  Deploy as 1 unit                     └─── API Gateway ───┘
                                            │
                                       Client/Browser</code></pre>

<table>
<thead><tr><th>面向</th><th>單體式</th><th>微服務</th></tr></thead>
<tbody>
<tr><td>部署</td><td>全有或全無</td><td>每個服務獨立部署</td></tr>
<tr><td>擴展</td><td>整個應用一起擴展</td><td>僅擴展瓶頸服務</td></tr>
<tr><td>複雜度</td><td>低（單一程式碼庫）</td><td>高（分散式）</td></tr>
<tr><td>故障隔離</td><td>一個錯誤影響全部</td><td>故障侷限在服務內</td></tr>
<tr><td>技術選型</td><td>單一技術堆疊</td><td>多語言（每個服務最佳工具）</td></tr>
</tbody>
</table>

<h2 id="12-factor">3. 12-Factor App</h2>

<p><strong>12-Factor App</strong> 方法論定義了雲原生應用的最佳實踐：</p>

<table>
<thead><tr><th>#</th><th>因素</th><th>雲原生實踐</th></tr></thead>
<tbody>
<tr><td>1</td><td><strong>Codebase</strong></td><td>每個應用 1 個 repo，多次部署</td></tr>
<tr><td>2</td><td><strong>Dependencies</strong></td><td>明確宣告（package.json、go.mod）</td></tr>
<tr><td>3</td><td><strong>Config</strong></td><td>儲存在環境中（ConfigMap、Secrets）</td></tr>
<tr><td>4</td><td><strong>Backing services</strong></td><td>DB、快取 = 透過 URL 附加的資源</td></tr>
<tr><td>5</td><td><strong>Build/Release/Run</strong></td><td>嚴格分離（CI 建置，CD 部署）</td></tr>
<tr><td>6</td><td><strong>Processes</strong></td><td>無狀態程序，狀態儲存在外部</td></tr>
<tr><td>7</td><td><strong>Port binding</strong></td><td>透過連接埠匯出服務（無 Web 伺服器層）</td></tr>
<tr><td>8</td><td><strong>Concurrency</strong></td><td>透過程序模型擴展（HPA）</td></tr>
<tr><td>9</td><td><strong>Disposability</strong></td><td>快速啟動、優雅關閉</td></tr>
<tr><td>10</td><td><strong>Dev/Prod parity</strong></td><td>跨環境使用相同工具/服務</td></tr>
<tr><td>11</td><td><strong>Logs</strong></td><td>視為事件串流（stdout，非檔案）</td></tr>
<tr><td>12</td><td><strong>Admin processes</strong></td><td>以 Job 執行一次性管理任務</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試重點：</strong> 因素 3、6、9、11 在 KCNA 考題中經常出現。因素 3（環境中的組態）→ ConfigMap/Secret。因素 6（無狀態）→ 使用外部儲存的原因。因素 11（日誌為串流）→ stdout → 日誌聚合器。</p></blockquote>

<h2 id="service-mesh">4. Service Mesh</h2>

<p>當微服務增多時，需要管理：mTLS、重試、斷路器、可觀測性。<strong>Service Mesh</strong> 透過在每個 Pod 中注入 <strong>Sidecar Proxy</strong> 來解決這些問題。</p>

<pre><code class="language-text">Without Service Mesh:          With Service Mesh (Istio):
  App A ──────────────► App B    App A ──► [Envoy] ──► [Envoy] ──► App B
  (manual TLS, retry code)         sidecar           sidecar
                                 (auto mTLS, metrics, retry, tracing)</code></pre>

<table>
<thead><tr><th>功能</th><th>Service Mesh 提供</th></tr></thead>
<tbody>
<tr><td>mTLS 雙向驗證</td><td>自動加密服務間流量</td></tr>
<tr><td>流量管理</td><td>Canary、A/B、加權路由</td></tr>
<tr><td>可觀測性</td><td>自動指標、追蹤、存取日誌</td></tr>
<tr><td>韌性</td><td>重試、逾時、斷路器</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">5. 速查表</h2>

<table>
<thead><tr><th>考試問題</th><th>答案</th></tr></thead>
<tbody>
<tr><td>CNCF 定義的雲原生包含什麼？</td><td>容器、微服務、宣告式 API、不可變基礎設施</td></tr>
<tr><td>按 12-Factor 組態應儲存在哪？</td><td>環境變數（不要硬編碼）</td></tr>
<tr><td>按 12-Factor 日誌應如何處理？</td><td>視為串流（stdout/stderr）</td></tr>
<tr><td>Service Mesh 在 Pod 中注入什麼？</td><td><strong>Sidecar Proxy</strong>（Envoy）</td></tr>
<tr><td>微服務擴展哪個部分？</td><td>僅擴展有瓶頸的服務</td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習題</h2>

<p><strong>Q1:</strong> 根據 12-Factor App 方法論，應用程式應該如何儲存資料庫連接字串？</p>
<ul>
<li>A) 硬編碼在原始碼中</li>
<li>B) 存放在提交到儲存庫的設定檔中</li>
<li>C) 作為環境變數（Kubernetes ConfigMap 或 Secret） ✓</li>
<li>D) 在容器映像中作為建置參數</li>
</ul>
<p><em>解析：因素 3（Config）指出：「將組態儲存在環境中。」在 Kubernetes 中，這意味著使用 ConfigMap 存放非敏感組態，Secret 存放敏感值，以環境變數注入。</em></p>

<p><strong>Q2:</strong> 在微服務架構中使用 Service Mesh 的主要好處是什麼？</p>
<ul>
<li>A) 取代 Kubernetes 進行容器編排</li>
<li>B) 提供基礎設施層級的網路功能（mTLS、重試、可觀測性），無需修改應用程式碼 ✓</li>
<li>C) 儲存應用程式組態</li>
<li>D) 在容器重啟後保存應用程式狀態</li>
</ul>
<p><em>解析：Service Mesh 透過 Sidecar Proxy 將跨領域關注點（安全、可觀測性、韌性）移至基礎設施層。開發人員不需要在每個服務中實作重試邏輯或 mTLS。</em></p>

<p><strong>Q3:</strong> 「不可變基礎設施」與傳統基礎設施的區別特徵是什麼？</p>
<ul>
<li>A) 伺服器從不重新啟動</li>
<li>B) 替換執行中的系統而非就地修改 ✓</li>
<li>C) 組態變更需要人工審批</li>
<li>D) 基礎設施僅使用 YAML 檔案定義</li>
</ul>
<p><em>解析：不可變基礎設施意味著永遠不更新/修補正在執行的容器——而是建置新映像、部署它、替換舊容器。這消除了組態漂移並提高了可重複性。</em></p>
