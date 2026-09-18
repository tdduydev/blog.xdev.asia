---
id: 019d0001-1005-7005-b005-000000000005
title: '用 Kyverno 與 Falco 守護 Kubernetes:Admission Policy 與 Runtime Defense'
slug: kubernetes-admission-policy-kyverno-falco
excerpt: >-
  靜態映像檔掃描抓不到容器執行中的異常行為。用 admission policy (Kyverno) 擋下
  不合規 workload,再以 runtime monitor (Falco) 偵測 shell-in-container、
  lateral movement。
featured_image: /images/blog/k8s-kyverno-falco-featured.webp
type: blog
reading_time: 9
view_count: 0
meta: null
published_at: '2026-05-08T00:00:00.000000Z'
created_at: '2026-05-08T00:00:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9616-cat5-7005-a005-000000000005
  name: 資安
  slug: security
tags:
  - name: devsecops
    slug: devsecops
  - name: kubernetes
    slug: kubernetes
  - name: kyverno
    slug: kyverno
  - name: falco
    slug: falco
  - name: runtime-security
    slug: runtime-security
comments: []
locale: zh-tw
---
<blockquote>映像檔掃描與威脅模型在部署前提供保護。Admission policy 在 workload 進入叢集那一刻提供保護。Runtime monitor 則是在那之後監看一切的攝影機。</blockquote>

<h2 id="ba-lop-bao-ve">叢集中的三層防護</h2>
<table>
  <thead><tr><th>層級</th><th>職責</th><th>工具</th></tr></thead>
  <tbody>
    <tr><td>Pre-admission</td><td>Lint、掃描映像檔、驗證簽署</td><td>Trivy、Cosign</td></tr>
    <tr><td>Admission</td><td>擋下違反 policy 的 workload</td><td>Kyverno、OPA Gatekeeper</td></tr>
    <tr><td>Runtime</td><td>偵測異常行為、network policy</td><td>Falco、Cilium Tetragon、NetworkPolicy</td></tr>
  </tbody>
</table>

<h2 id="kyverno-vs-opa">Kyverno vs OPA Gatekeeper——選哪個?</h2>
<ul>
  <li><strong>Kyverno</strong>:用純 YAML 撰寫 policy,簡短易學。支援 mutate、generate、verifyImages keyless。多數場景都適用。</li>
  <li><strong>OPA Gatekeeper</strong>:以 Rego 撰寫,對複雜邏輯較強。適合已經有 OPA 生態系 (API gateway、microservice authz) 的環境。</li>
</ul>
<p>建議:新叢集從 Kyverno 開始。日後遷移不算困難,因為 policy 本身就是宣告式的。</p>

<h2 id="baseline-policy">應該具備的基線 policy</h2>
<ol>
  <li>在應用程式 namespace 套用 <strong>Pod Security Standards: restricted</strong>。</li>
  <li>禁止使用 <code>privileged: true</code>、<code>hostNetwork</code>、<code>hostPID</code> 的 Pod。</li>
  <li>要求映像檔來自內部 registry (allowlist)。</li>
  <li>要求每個 container 都有 <code>resources.requests/limits</code>。</li>
  <li>要求標準 label (team、env、cost-center) 以利成本追蹤與 IR。</li>
  <li>對 production 映像檔驗證 Cosign 簽署。</li>
</ol>

<h2 id="audit-truoc-enforce">安全部署:Audit → Fix → Enforce</h2>
<p>絕對不要在運行中的叢集上一次套用 <code>validationFailureAction: Enforce</code>。參考流程:</p>
<ol>
  <li>先以 <code>validationFailureAction: Audit</code> 套用 policy。</li>
  <li>透過 Kyverno PolicyReport CRD 在 1-2 週內量測違規數。</li>
  <li>為每個違規的 workload 開單修復,指派 owner。</li>
  <li>當 staging 環境違規數歸零後,依 dev → staging → prod 順序切換為 Enforce。</li>
</ol>
<p>建立明確的例外流程:特殊 workload (例如 privileged debug pod) 必須帶有 annotation 註明理由、到期日、owner。</p>

<h2 id="network-policy-default-deny">Network policy default-deny</h2>
<p>每個應用程式 namespace 都應從一條「deny all」policy 開始,再依實際需求逐步打開:</p>
<pre><code class="language-yaml">apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: payments
spec:
  podSelector: {}
  policyTypes: ["Ingress", "Egress"]
</code></pre>
<p>之後再逐條開放需要的連線:app → DB、app → service mesh、透過 egress gateway 連到外部 API。搭配 <strong>Cilium</strong>,policy 可做到 L7 (HTTP path、gRPC method、Kafka topic),比僅靠 port/IP 強大許多。</p>

<h2 id="falco-runtime-detection">Falco:容器的 runtime 偵測</h2>
<p>Falco 透過 kernel (eBPF 或 kernel module) 觀察 syscall。最有價值的幾條規則:</p>
<ul>
  <li><strong>容器內出現 shell</strong>:<code>shell_in_container</code>。Production 中很少有合理理由出現 shell。</li>
  <li><strong>修改 runtime 映像檔中的 binary</strong> (淪陷跡象)。</li>
  <li><strong>異常的對外連線</strong>到 allowlist 之外的 IP/網域。</li>
  <li><strong>讀取敏感檔案</strong>例如 <code>/etc/shadow</code>、kubeconfig。</li>
  <li><strong>掛載敏感路徑</strong>例如 <code>/var/run/docker.sock</code>、<code>/proc</code>。</li>
</ul>
<p>把高 severity 規則的 Falco 事件串到 Slack/PagerDuty,其他則送到 SIEM 做後續分析。</p>

<h2 id="cilium-tetragon">Cilium Tetragon:hardware-assisted、低額外負擔</h2>
<p>Tetragon 同樣使用 eBPF,但針對大型叢集做了效能優化,而且能<strong>直接執行 (enforce)</strong>而不只是偵測 (例如:當 syscall 違規時直接 kill process)。適合需要 in-kernel response time 的場景。</p>

<h2 id="khi-co-alert">當警報響起——簡短的 IR workflow</h2>
<ol>
  <li>15 分鐘內 triage:依 severity 分辨 true/false positive。</li>
  <li>用 <code>NetworkPolicy</code> 擋掉 egress 隔離 Pod,<strong>不要</strong>立刻刪除 (會丟失證據)。</li>
  <li>採取快照:<code>kubectl debug</code>、dump memory、複製日誌、匯出 audit trail。</li>
  <li>輪換 Pod 可能接觸過的憑證:ServiceAccount token、掛載的 secret。</li>
  <li>調查結束後:寫無責備 (blameless) 的 post-mortem,必要時新增 Falco 規則。</li>
</ol>

<h2 id="ket-luan">結論</h2>
<p>守護 Kubernetes 不只是 RBAC 與防火牆。需要三層:pre-admission (映像檔掃描、簽署)、admission (Kyverno)、runtime (Falco/Tetragon、NetworkPolicy)。從 audit 模式的基線 policy 開始,逐步轉為 enforce,並把 Falco 與 SIEM 整合——這就是 2026 年大多數 production 叢集足夠堅固的配置。</p>
