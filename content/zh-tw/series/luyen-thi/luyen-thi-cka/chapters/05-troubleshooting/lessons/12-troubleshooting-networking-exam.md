---
id: cka-d5-l12
title: '第12課：網路故障排除 & 考試策略'
slug: 12-troubleshooting-networking-exam
description: >-
  kube-proxy、CNI 與 Service 除錯。端對端故障排除。
  CKA 考試時間管理與實戰策略。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 12
section_title: "領域5: Troubleshooting (30%)"
course:
  id: lt-cka-series-001
  title: 'CKA 認證備考 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai12-network-debug.webp" alt="Kubernetes 網路除錯與 CKA 考試策略" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="network-debug">1. 網路故障排除流程</h2>

<pre><code class="language-text">Pod ──► Service ──► Endpoint ──► Pod（目標）

除錯順序：
1. Pod 可以到達自己嗎？         → kubectl exec pod -- curl localhost:PORT
2. Pod 可以到達其他 Pod 嗎？     → kubectl exec pod -- curl POD_IP:PORT
3. Pod 可以到達 Service 嗎？     → kubectl exec pod -- curl SERVICE:PORT
4. DNS 能解析嗎？               → kubectl exec pod -- nslookup SERVICE
5. NetworkPolicy 有阻擋嗎？     → kubectl get networkpolicy -n NS</code></pre>

<h2 id="kube-proxy-debug">2. kube-proxy 除錯</h2>

<pre><code class="language-text"># 確認 kube-proxy 運行中
kubectl get pods -n kube-system -l k8s-app=kube-proxy

# 檢查 kube-proxy 日誌
kubectl logs -n kube-system -l k8s-app=kube-proxy

# 確認 kube-proxy 模式
kubectl logs -n kube-system -l k8s-app=kube-proxy | grep "Using"
# "Using iptables Proxier" 或 "Using ipvs Proxier"

# 確認 kube-proxy ConfigMap
kubectl get configmap kube-proxy -n kube-system -o yaml

# iptables 規則除錯（在節點上）
iptables -t nat -L KUBE-SERVICES | grep my-service</code></pre>

<h2 id="cni-debug">3. CNI 除錯</h2>

<pre><code class="language-text"># 確認 CNI 外掛運行中
kubectl get pods -n kube-system | grep -E 'calico|flannel|cilium|weave'

# Pod IP 問題除錯
kubectl get pod -o wide   # 確認 Pod 有 IP

# 如果 Pod 沒有 IP：
# 1. 確認 CNI 二進位檔案存在
ls /opt/cni/bin/

# 2. 確認 CNI 設定
ls /etc/cni/net.d/

# 3. 檢查 kubelet 日誌中的 CNI 錯誤
journalctl -u kubelet | grep -i cni</code></pre>

<h2 id="service-debug">4. Service 端對端除錯</h2>

<pre><code class="language-text"># 情境：Pod 無法存取 Service
# 依序排除：

# 1. Service 存在嗎？
kubectl get svc my-service -n NS

# 2. Endpoints 有值嗎？
kubectl get endpoints my-service -n NS
# 空 → selector 不匹配

# 3. Pod 是否為 Ready？
kubectl get pods -l app=my-app

# 4. NetworkPolicy 阻擋？
kubectl get networkpolicy -n NS

# 5. 從 Pod 內測試連線
kubectl exec -it test-pod -- curl http://my-service:80
kubectl exec -it test-pod -- wget -qO- http://my-service:80 --timeout=3</code></pre>

<h2 id="exam-strategy">5. CKA 考試策略</h2>

<table>
<thead><tr><th>策略</th><th>說明</th></tr></thead>
<tbody>
<tr><td><strong>時間管理</strong></td><td>2 小時 17 題。每題約 7 分鐘。跳過困難題目（做標記後返回）</td></tr>
<tr><td><strong>切換 Context</strong></td><td>每題第一行都是 <code>kubectl config use-context ...</code>。絕對不要忘記！</td></tr>
<tr><td><strong>善用文件</strong></td><td>考試允許存取 k8s.io/docs。善用搜尋功能</td></tr>
<tr><td><strong>善用 alias</strong></td><td><code>alias k=kubectl</code>、<code>export do="--dry-run=client -o yaml"</code></td></tr>
<tr><td><strong>--dry-run</strong></td><td><code>kubectl run pod --image=nginx $do > pod.yaml</code> 快速產生 YAML</td></tr>
<tr><td><strong>自動完成</strong></td><td><code>source <(kubectl completion bash)</code>，Tab 補全 Pod 名稱</td></tr>
</tbody>
</table>

<pre><code class="language-text"># 考試開始時的快速設定
alias k=kubectl
export do="--dry-run=client -o yaml"
source <(kubectl completion bash)
complete -o default -F __start_kubectl k

# 常用快速指令
k run nginx --image=nginx $do > pod.yaml    # 產生 Pod YAML
k create deploy web --image=nginx $do       # 產生 Deployment YAML
k expose deploy web --port=80 $do           # 產生 Service YAML</code></pre>

<h2 id="exam-checklist">6. 考試檢查清單</h2>

<pre><code class="language-text">考前準備：
☑ 練習 kubectl 快捷鍵和 alias
☑ 熟悉 k8s.io/docs 搜尋
☑ 練習 vim/nano 編輯 YAML
☑ 熟悉 etcd backup/restore 流程
☑ 練習 kubeadm upgrade 流程

考試中：
☑ 切換 context（每題必做）
☑ 仔細讀題（確認 Namespace、叢集名稱）
☑ 先做簡單題（5 分鐘內可完成的）
☑ 用 --dry-run 產生 YAML 而非從零寫起
☑ 完成後驗證（kubectl get、describe）</code></pre>

<h2 id="cheatsheet">7. 速查表</h2>

<table>
<thead><tr><th>情境</th><th>指令</th></tr></thead>
<tbody>
<tr><td>確認 Service 連線</td><td><code>kubectl exec pod -- curl SVC:PORT</code></td></tr>
<tr><td>DNS 除錯</td><td><code>kubectl exec pod -- nslookup SVC</code></td></tr>
<tr><td>kube-proxy 狀態</td><td><code>kubectl get pods -n kube-system -l k8s-app=kube-proxy</code></td></tr>
<tr><td>iptables 規則</td><td><code>iptables -t nat -L KUBE-SERVICES</code></td></tr>
<tr><td>CNI 設定</td><td><code>ls /etc/cni/net.d/</code></td></tr>
</tbody>
</table>

<h2 id="practice">8. 練習題</h2>

<p><strong>Q1：</strong>Pod 可以透過 Pod IP 存取另一個 Pod，但透過 Service 名稱無法存取。可能的原因是？</p>
<ul>
<li>A) CNI 外掛故障</li>
<li>B) CoreDNS 未運行或 kube-proxy 規則異常 ✓</li>
<li>C) kubelet 停止</li>
<li>D) etcd 損壞</li>
</ul>
<p><em>解析：Pod IP 可以連通表示 CNI 正常。Service 名稱無法存取可能是 DNS（CoreDNS）或 kube-proxy（iptables 規則）的問題。依序檢查：CoreDNS Pod 狀態、nslookup 測試、kube-proxy Pod 狀態、Endpoints。</em></p>

<p><strong>Q2：</strong>CKA 考試中最重要的第一步是什麼？</p>
<ul>
<li>A) 設定 alias 和自動完成</li>
<li>B) 閱讀題目並切換到正確的 context ✓</li>
<li>C) 檢查叢集狀態</li>
<li>D) 備份 etcd</li>
</ul>
<p><em>解析：CKA 考試有多個叢集。每題需要切換到指定的 context。忘記切換 context 是常見的扣分原因 — 在錯誤的叢集操作等於白做。</em></p>

<p><strong>Q3：</strong>kubectl exec test-pod -- curl http://web-svc:80 超時。但 kubectl get endpoints web-svc 顯示有效的 endpoint IP。接下來應該檢查什麼？</p>
<ul>
<li>A) Pod 的 readinessProbe</li>
<li>B) NetworkPolicy 是否阻擋了從 test-pod 到 web-svc 的流量 ✓</li>
<li>C) 重新啟動 web-svc 的 Pod</li>
<li>D) 升級 Kubernetes 版本</li>
</ul>
<p><em>解析：Endpoints 有效但連線超時。排除：Service selector 正確（有 endpoint）、DNS 正常（名稱可以解析）。剩下的可能：NetworkPolicy 阻擋流量、kube-proxy 規則異常、目標 Pod 的應用程式不監聽指定連接埠。</em></p>
