---
id: cka-d3-l06
title: '第6課：Services、Endpoints & CoreDNS'
slug: 06-services-endpoints-coredns
description: >-
  Service 類型詳解、Endpoints 物件、kube-proxy 模式。CoreDNS 設定與
  DNS 故障排除。ExternalName、Headless Service。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 6
section_title: "領域3: Services & Networking (20%)"
course:
  id: lt-cka-series-001
  title: 'CKA 認證備考 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai6-coredns.webp" alt="CoreDNS、kube-proxy 與 Kubernetes 服務發現" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="services-deep">1. Services & Endpoints</h2>

<p>建立 Service 時，Kubernetes 會自動建立包含符合 selector 的 Pod IP 清單的 <strong>Endpoints</strong> 物件。</p>

<pre><code class="language-text"># Service → Endpoints → Pods
kubectl get service my-app        # 虛擬 IP (ClusterIP)
kubectl get endpoints my-app      # 清單: 10.244.1.2:80, 10.244.1.3:80
kubectl describe endpoints my-app # 詳細

# Endpoints 為空 → selector 與 Pod 標籤不匹配
# 除錯: 比較 selector 和 Pod 標籤
kubectl get svc my-app -o jsonpath='{.spec.selector}'
kubectl get pods --show-labels | grep app=my-app</code></pre>

<h2 id="coredns">2. CoreDNS 設定</h2>

<pre><code class="language-text"># CoreDNS 在 kube-system 以 Deployment 運行
kubectl get pods -n kube-system -l k8s-app=kube-dns
kubectl get configmap coredns -n kube-system -o yaml

# 預設 Corefile:
.:53 {
    errors
    health { lameduck 5s }
    ready
    kubernetes cluster.local in-addr.arpa ip6.arpa {
       pods insecure
       fallthrough in-addr.arpa ip6.arpa
    }
    prometheus :9153
    forward . /etc/resolv.conf
    cache 30
    loop
    reload
    loadbalance
}</code></pre>

<blockquote><p><strong>考試重點：</strong>CoreDNS 故障排除步驟：1) 確認 CoreDNS Pod 運行中、2) 檢查 kube-system 中的 kube-dns Service、3) 在 Pod 內用 <code>kubectl exec -it pod -- nslookup kubernetes</code> 測試 DNS、4) 確認 Pod 的 <code>/etc/resolv.conf</code> 指向 kube-dns ClusterIP。</p></blockquote>

<h2 id="kube-proxy">3. kube-proxy 模式</h2>

<table>
<thead><tr><th>模式</th><th>機制</th><th>效能</th></tr></thead>
<tbody>
<tr><td><strong>iptables</strong>（預設）</td><td>Linux iptables 規則，隨機選擇 Pod</td><td>良好，O(n) 規則</td></tr>
<tr><td><strong>IPVS</strong></td><td>Linux IPVS（核心層，基於雜湊）</td><td>大規模叢集最佳</td></tr>
<tr><td><strong>userspace</strong>（已棄用）</td><td>使用者空間代理</td><td>較慢，舊版</td></tr>
</tbody>
</table>

<h2 id="headless-services">4. Headless Service</h2>

<pre><code class="language-text"># Headless: clusterIP: None
# DNS 直接回傳 Pod IP（無虛擬 IP）
apiVersion: v1
kind: Service
metadata:
  name: mysql-headless
spec:
  clusterIP: None
  selector:
    app: mysql
  ports:
  - port: 3306

# DNS 行為:
# mysql-headless → 多筆 A 記錄（每個 Pod IP 一筆）
# mysql-0.mysql-headless → 特定 Pod IP（StatefulSet）</code></pre>

<h2 id="debug-dns">5. DNS 故障排除指令</h2>

<pre><code class="language-text"># 從 Pod 內測試 DNS
kubectl run dns-test --image=busybox --rm -it -- nslookup kubernetes
kubectl run dns-test --image=busybox --rm -it -- nslookup my-service.namespace

# 確認 Pod 的 resolv.conf
kubectl exec -it my-pod -- cat /etc/resolv.conf
# 應顯示: nameserver 10.96.0.10 (kube-dns service IP)

# 檢查 CoreDNS 日誌
kubectl logs -n kube-system -l k8s-app=kube-dns

# 確認 kube-dns Service
kubectl get svc -n kube-system kube-dns</code></pre>

<h2 id="cheatsheet">6. 速查表</h2>

<table>
<thead><tr><th>問題</th><th>檢查方式</th></tr></thead>
<tbody>
<tr><td>Service 無法到達 Pod</td><td>kubectl get endpoints NAME</td></tr>
<tr><td>Endpoints 為空</td><td>Service selector 與 Pod 標籤不匹配</td></tr>
<tr><td>Pod 無法解析 DNS</td><td>/etc/resolv.conf + CoreDNS Pod 狀態</td></tr>
<tr><td>StatefulSet Pod DNS</td><td>需要與 serviceName 同名的 Headless Service</td></tr>
</tbody>
</table>

<h2 id="practice">7. 練習題</h2>

<p><strong>Q1：</strong>建立了 Service 但流量無法到達 Pod。Service 的 Endpoints 物件顯示 "no endpoints"。最可能的原因是？</p>
<ul>
<li>A) Service 連接埠與容器連接埠不匹配</li>
<li>B) Service selector 的標籤與 Pod 標籤不匹配 ✓</li>
<li>C) NetworkPolicy 封鎖了流量</li>
<li>D) Pod 在另一個叢集</li>
</ul>
<p><em>解析：Endpoints 為空表示 Service 找不到匹配的 Pod。原因是標籤 selector 不匹配。檢查方式：比較 kubectl get svc myapp -o jsonpath='{.spec.selector}' 和 kubectl get pods --show-labels。</em></p>

<p><strong>Q2：</strong>在 "frontend" Namespace 運行的 Pod 需要存取 "backend" Namespace 的 "payments" Service。正確的 DNS 名稱是？</p>
<ul>
<li>A) payments</li>
<li>B) payments.backend</li>
<li>C) payments.backend.svc.cluster.local ✓</li>
<li>D) backend.payments.cluster.local</li>
</ul>
<p><em>解析：跨 Namespace 的 DNS 需要指定完整的 Namespace：{service}.{namespace}.svc.cluster.local。短名稱只在同一 Namespace 內有效。B 和 C 都可以運作，但 C 是最明確且可靠的格式。</em></p>

<p><strong>Q3：</strong>CoreDNS 沒有回應。適當的診斷步驟是？</p>
<ul>
<li>A) 重新啟動整個叢集</li>
<li>B) 確認 CoreDNS Pod 運行中、檢查 kube-dns Service 的 ClusterIP、從 Pod 內用 nslookup 測試 ✓</li>
<li>C) 重新安裝 kube-proxy</li>
<li>D) 重建 kube-system Namespace</li>
</ul>
<p><em>解析：系統化 DNS 除錯：(1) kubectl get pods -n kube-system -l k8s-app=kube-dns、(2) 確認 kube-dns Service 有 ClusterIP、(3) 確認 Pod 的 /etc/resolv.conf 指向該 IP、(4) 從測試 Pod 執行 nslookup。</em></p>
