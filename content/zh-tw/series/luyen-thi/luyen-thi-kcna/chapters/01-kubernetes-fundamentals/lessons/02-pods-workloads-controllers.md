---
id: kcna-d1-l02
title: '第2課：Pod、工作負載與控制器'
slug: 02-pods-workloads-controllers
description: >-
  Pod 生命週期。Deployment、ReplicaSet、StatefulSet、DaemonSet、
  Job、CronJob。標籤、選擇器、註解。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 2
section_title: "Domain 1: Kubernetes Fundamentals (46%)"
course:
  id: lt-kcna-series-001
  title: 'KCNA 認證備考 — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai2-pods-workloads.webp" alt="Kubernetes 工作負載控制器 — Deployment、StatefulSet、DaemonSet、Job" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="pod">1. Pod — 最小單位</h2>

<p><strong>Pod</strong> 是一組共享相同網路命名空間（相同 IP、Port 空間）和儲存卷的 1 個或多個容器。Pod 是 Kubernetes 中的排程單位。</p>

<pre><code class="language-text">┌─────────────────────────────────────┐
│              POD                    │
│  IP: 10.244.1.5                     │
│  ┌────────────┐  ┌───────────────┐  │
│  │  Container │  │  Sidecar      │  │
│  │   (app)    │  │  (log-agent)  │  │
│  └────────────┘  └───────────────┘  │
│       Shared Volume: /var/log       │
└─────────────────────────────────────┘</code></pre>

<h3 id="pod-lifecycle">Pod 生命週期</h3>

<table>
<thead><tr><th>階段</th><th>含義</th><th>除錯提示</th></tr></thead>
<tbody>
<tr><td><strong>Pending</strong></td><td>尚未被排程或正在拉取映像</td><td>檢查事件：kubectl describe pod</td></tr>
<tr><td><strong>Running</strong></td><td>正在執行，至少 1 個容器處於活動狀態</td><td>正常狀態</td></tr>
<tr><td><strong>Succeeded</strong></td><td>所有容器以代碼 0 退出</td><td>Job 已完成</td></tr>
<tr><td><strong>Failed</strong></td><td>至少 1 個容器以錯誤退出</td><td>kubectl logs --previous</td></tr>
<tr><td><strong>Unknown</strong></td><td>無法與節點通訊</td><td>節點網路問題</td></tr>
<tr><td><strong>CrashLoopBackOff</strong></td><td>容器持續崩潰並重啟</td><td>kubectl logs -p</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試重點：</strong> <strong>CrashLoopBackOff</strong> 不是正式的 Pod Phase——它是 Container 在 Waiting 狀態中的狀態。題目常區分「pod phase」與「container state」。</p></blockquote>

<h2 id="workloads">2. 工作負載控制器</h2>

<table>
<thead><tr><th>控制器</th><th>使用場景</th><th>主要特點</th></tr></thead>
<tbody>
<tr><td><strong>Deployment</strong></td><td>無狀態應用（Web 伺服器、API）</td><td>滾動更新、回滾、ReplicaSet 管理</td></tr>
<tr><td><strong>ReplicaSet</strong></td><td>確保 N 個副本（通常透過 Deployment 使用）</td><td>標籤選擇器，很少直接使用</td></tr>
<tr><td><strong>StatefulSet</strong></td><td>有狀態應用（資料庫、Kafka、Elasticsearch）</td><td>穩定的 Pod 名稱（web-0、web-1）、穩定的儲存、有序部署</td></tr>
<tr><td><strong>DaemonSet</strong></td><td>在每個節點上執行代理程式（日誌、監控、網路）</td><td>每節點 1 個 Pod，新節點加入時自動部署</td></tr>
<tr><td><strong>Job</strong></td><td>執行至完成的批次任務</td><td>completions、parallelism、backoffLimit</td></tr>
<tr><td><strong>CronJob</strong></td><td>定期批次任務</td><td>cron 語法、concurrencyPolicy、schedule</td></tr>
</tbody>
</table>

<h3 id="deployment-vs-statefulset">Deployment vs StatefulSet</h3>

<pre><code class="language-text">DEPLOYMENT (Stateless)          STATEFULSET (Stateful)
─────────────────────           ────────────────────────
Pod names: web-a1b2c3            Pod names: web-0, web-1, web-2
Any order scale up/down          Ordered: web-0 first, then web-1...
Shared or no storage             Each Pod gets its own PVC
Pod replaced = new identity      Pod replaced = same identity
Examples: nginx, api-server      Examples: MySQL, MongoDB, Kafka</code></pre>

<h2 id="labels">3. 標籤、選擇器與註解</h2>

<table>
<thead><tr><th>概念</th><th>用途</th><th>範例</th></tr></thead>
<tbody>
<tr><td><strong>Labels</strong></td><td>標記資源以便選擇和分組</td><td><code>app: frontend, env: prod</code></td></tr>
<tr><td><strong>Selectors</strong></td><td>根據標籤查詢資源</td><td><code>selector: {app: frontend}</code></td></tr>
<tr><td><strong>Annotations</strong></td><td>不用於選擇的中繼資料（建置資訊、聯繫方式）</td><td><code>maintainer: team@company.com</code></td></tr>
</tbody>
</table>

<blockquote><p><strong>考試重點：</strong> Service 透過 <strong>selector</strong> 匹配 Pod 的 <strong>labels</strong> 來尋找 Pod。如果 selector 不匹配，Service 將有空的 Endpoints → 流量無法到達 Pod。</p></blockquote>

<h2 id="daemonset-usecase">4. DaemonSet 使用案例</h2>

<pre><code class="language-text">NODE 1         NODE 2         NODE 3
┌──────┐       ┌──────┐       ┌──────┐
│fluentd│      │fluentd│      │fluentd│  ← Log collector DaemonSet
│ Pod  │       │ Pod  │       │ Pod  │
├──────┤       ├──────┤       ├──────┤
│calico│       │calico│       │calico│  ← CNI network plugin DaemonSet
│ Pod  │       │ Pod  │       │ Pod  │
└──────┘       └──────┘       └──────┘</code></pre>

<p>DaemonSet 常用於：<strong>Fluentd/Filebeat</strong>（日誌收集）、<strong>Prometheus Node Exporter</strong>（指標）、<strong>kube-proxy</strong>（網路）、<strong>CNI 外掛</strong>（Calico、Cilium）。</p>

<h2 id="cheatsheet">5. 速查表</h2>

<table>
<thead><tr><th>考試問題</th><th>答案</th></tr></thead>
<tbody>
<tr><td>有狀態應用，需要穩定身份？</td><td><strong>StatefulSet</strong></td></tr>
<tr><td>每節點 1 個 Pod（監控代理）？</td><td><strong>DaemonSet</strong></td></tr>
<tr><td>無狀態應用搭配滾動更新？</td><td><strong>Deployment</strong></td></tr>
<tr><td>一次性批次處理？</td><td><strong>Job</strong></td></tr>
<tr><td>排程批次（每晚備份）？</td><td><strong>CronJob</strong></td></tr>
<tr><td>StatefulSet 的 Pod 命名模式？</td><td><code>name-0, name-1, name-2</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習題</h2>

<p><strong>Q1:</strong> 一家公司需要在 Kubernetes 上部署 MySQL 資料庫，要求每個副本有穩定的網路身份和專用儲存。應使用哪種工作負載類型？</p>
<ul>
<li>A) 搭配 PersistentVolumeClaim 的 Deployment</li>
<li>B) StatefulSet ✓</li>
<li>C) DaemonSet</li>
<li>D) ReplicaSet</li>
</ul>
<p><em>解析：StatefulSet 提供穩定的 Pod 名稱（mysql-0、mysql-1）、有序的部署/擴展，且每個 Pod 透過 volumeClaimTemplates 獲得自己的 PVC。這些特性對資料庫至關重要。</em></p>

<p><strong>Q2:</strong> 哪種工作負載確保叢集中每個節點（包括未來加入的節點）上都恰好執行一個 Pod？</p>
<ul>
<li>A) 副本數與節點數匹配的 Deployment</li>
<li>B) 帶有 nodeSelector 的 ReplicaSet</li>
<li>C) DaemonSet ✓</li>
<li>D) StatefulSet</li>
</ul>
<p><em>解析：DaemonSet 自動在每個節點上部署一個 Pod，並監視叢集成員——當新節點加入時，DaemonSet 控制器立即在其上建立 Pod。</em></p>

<p><strong>Q3:</strong> 一個 Pod 處於 'Pending' 狀態。最可能的原因是什麼？</p>
<ul>
<li>A) 容器應用程式崩潰</li>
<li>B) 沒有節點滿足排程需求 ✓</li>
<li>C) 存活探測失敗</li>
<li>D) 容器映像已損壞</li>
</ul>
<p><em>解析：Pending 表示 Pod 已被接受但尚未啟動。最常見的原因：節點上 CPU/記憶體不足、不滿足節點親和性/Taint、或 PVC 未綁定。檢查 kubectl describe pod 事件。</em></p>
