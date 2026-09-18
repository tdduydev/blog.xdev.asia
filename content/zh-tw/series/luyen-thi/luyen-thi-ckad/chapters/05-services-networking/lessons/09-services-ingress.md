---
id: ckad-d5-l09
title: '第9課: Services 與 Ingress'
slug: 09-services-ingress
description: >-
  四種 Service 類型: ClusterIP、NodePort、LoadBalancer、ExternalName。建立與測試
  Service。Ingress 的 L7 路由規則、TLS 設定與 pathType。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 9
section_title: "領域5: Services and Networking (20%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD 認證備考 — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai9-services-ingress.webp" alt="Services 與 Ingress — ClusterIP、NodePort、Ingress L7 路由" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="service-types">1. 四種 Service 類型</h2>

<table>
<thead><tr><th>類型</th><th>說明</th><th>使用場景</th></tr></thead>
<tbody>
<tr><td><strong>ClusterIP</strong>（預設）</td><td>內部 Cluster IP，僅叢集內可存取</td><td>微服務間通訊</td></tr>
<tr><td><strong>NodePort</strong></td><td>在每個節點的 IP:PORT 上開放</td><td>開發/測試環境的外部存取</td></tr>
<tr><td><strong>LoadBalancer</strong></td><td>透過雲端 LB 的外部 IP</td><td>生產環境的外部流量</td></tr>
<tr><td><strong>ExternalName</strong></td><td>將 Service 對應到外部 DNS 名稱</td><td>存取叢集外部的服務</td></tr>
</tbody>
</table>

<h2 id="service-yaml">2. Service YAML</h2>

<pre><code class="language-text"># ClusterIP（預設）
apiVersion: v1
kind: Service
metadata:
  name: backend-svc
spec:
  type: ClusterIP
  selector:
    app: backend         # 將流量導向 label 為 app=backend 的 Pod
  ports:
  - port: 80             # Service 暴露的 port
    targetPort: 8080     # Pod 中容器的 port
    protocol: TCP

# NodePort
apiVersion: v1
kind: Service
metadata:
  name: web-svc
spec:
  type: NodePort
  selector:
    app: web
  ports:
  - port: 80
    targetPort: 8080
    nodePort: 30080      # 可選: 範圍 30000-32767</code></pre>

<pre><code class="language-text"># 快速建立 Service
kubectl expose deployment myapp --port=80 --target-port=8080 --type=ClusterIP
kubectl expose deployment myapp --port=80 --target-port=8080 --type=NodePort

# 叢集內 DNS 存取
# &lt;service-name&gt;.&lt;namespace&gt;.svc.cluster.local
# 同 namespace: curl http://backend-svc
# 跨 namespace: curl http://backend-svc.production.svc.cluster.local</code></pre>

<h2 id="ingress">3. Ingress</h2>

<p>Ingress 提供 L7（HTTP/HTTPS）路由，將外部流量導向叢集內的 Service。</p>

<pre><code class="language-text">外部流量 → Ingress Controller → Ingress 規則 → Service → Pod

┌──────────────────── Ingress ──────────────────────┐
│                                                   │
│  shop.example.com/api  → api-svc:80               │
│  shop.example.com/web  → web-svc:80               │
│  blog.example.com      → blog-svc:80              │
│                                                   │
└───────────────────────────────────────────────────┘</code></pre>

<pre><code class="language-text">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  tls:                            # TLS 設定
  - hosts:
    - shop.example.com
    secretName: tls-secret        # 包含 tls.crt 和 tls.key 的 Secret
  rules:
  - host: shop.example.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: api-svc
            port:
              number: 80
      - path: /web
        pathType: Prefix
        backend:
          service:
            name: web-svc
            port:
              number: 80
  - host: blog.example.com       # 多域名
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: blog-svc
            port:
              number: 80</code></pre>

<table>
<thead><tr><th>pathType</th><th>行為</th><th>範例</th></tr></thead>
<tbody>
<tr><td><strong>Exact</strong></td><td>完全匹配 URL 路徑</td><td><code>/api</code> 僅匹配 <code>/api</code></td></tr>
<tr><td><strong>Prefix</strong></td><td>前綴匹配</td><td><code>/api</code> 匹配 <code>/api</code>、<code>/api/v1</code>、<code>/api/users</code></td></tr>
<tr><td><strong>ImplementationSpecific</strong></td><td>由 Ingress Controller 決定</td><td>依實作而定</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試重點:</strong> Ingress 需要先安裝 Ingress Controller（如 nginx、traefik）。CKAD 考試環境通常已安裝。建立 Ingress 時注意: <code>spec.ingressClassName</code> 指定使用的 controller。TLS Secret 必須包含 <code>tls.crt</code> 和 <code>tls.key</code>。</p></blockquote>

<h2 id="debugging-svc">4. Service 連線除錯</h2>

<pre><code class="language-text"># 確認 Service 存在且有 Endpoints
kubectl get svc
kubectl describe svc myservice    # 檢查 Endpoints 不為空
kubectl get endpoints myservice

# 確認 selector 符合 Pod labels
kubectl get pods --show-labels

# 從叢集內測試連線
kubectl run test --image=busybox --rm -it -- wget -O- http://backend-svc:80

# 常見問題:
# - Endpoints 為空 → selector 不匹配 Pod labels
# - Connection refused → targetPort 錯誤或容器沒有監聽
# - Pod 未在 endpoints → readinessProbe 失敗</code></pre>

<h2 id="cheatsheet">5. 速查表</h2>

<table>
<thead><tr><th>任務</th><th>指令</th></tr></thead>
<tbody>
<tr><td>建立 ClusterIP Service</td><td><code>kubectl expose deploy app --port=80 --target-port=8080</code></td></tr>
<tr><td>建立 NodePort Service</td><td><code>kubectl expose deploy app --port=80 --type=NodePort</code></td></tr>
<tr><td>檢查 Endpoints</td><td><code>kubectl get endpoints svc-name</code></td></tr>
<tr><td>建立 Ingress</td><td><code>kubectl create ingress name --rule="host/path=svc:port"</code></td></tr>
<tr><td>叢集內測試</td><td><code>kubectl run test --image=busybox --rm -it -- wget -O- url</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習題</h2>

<p><strong>Q1:</strong> 要讓叢集內的其他 Pod 透過穩定的 DNS 名稱存取 Deployment，最適合的 Service 類型是什麼？</p>
<ul>
<li>A) NodePort</li>
<li>B) LoadBalancer</li>
<li>C) ClusterIP ✓</li>
<li>D) ExternalName</li>
</ul>
<p><em>解析: ClusterIP（預設）為叢集內部通訊提供穩定的虛擬 IP 和 DNS 名稱（service-name.namespace.svc.cluster.local）。NodePort 和 LoadBalancer 會暴露外部存取，ExternalName 用於指向外部服務。</em></p>

<p><strong>Q2:</strong> 建立了 Service 但 Endpoints 為空。最可能的原因是什麼？</p>
<ul>
<li>A) Pod 還沒有啟動</li>
<li>B) Service 的 selector 與 Pod 的 labels 不匹配 ✓</li>
<li>C) Service 的 type 設定錯誤</li>
<li>D) Namespace 權限不足</li>
</ul>
<p><em>解析: Service 的 selector 必須匹配至少一個 Pod 的 labels 才能產生 Endpoints。可用 kubectl get pods --show-labels 確認，並與 kubectl describe svc 的 selector 比對。</em></p>

<p><strong>Q3:</strong> Ingress 規則使用 pathType: Prefix 設定路徑 /api。以下哪個請求會匹配？</p>
<ul>
<li>A) 僅 /api</li>
<li>B) /api、/api/、/api/v1/users ✓</li>
<li>C) /api 和 /apiVersion</li>
<li>D) 所有以 /a 開頭的路徑</li>
</ul>
<p><em>解析: Prefix pathType 按 URL 路徑元素匹配。/api 匹配 /api、/api/、/api/v1 等以 /api 路徑元素為前綴的路徑。不會匹配 /apiVersion，因為路徑元素不同。Exact 類型則只匹配 /api。</em></p>
