---
id: 019c9619-lt03-l07
title: '第7課：模型部署與預測'
slug: bai-7-model-deployment
description: >-
  Vertex AI Endpoints：線上預測、批次預測。
  模型版本管理、流量分割。邊緣部署（Edge Manager）。
  擴展設定、GPU分配。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 7
section_title: "領域4：模型部署與MLOps"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer 考試準備'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai7-deployment.webp" alt="Vertex AI Model Deployment" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Vertex AI部署：線上預測、批次預測、流量分割與邊緣部署</em></p>
</div>

<h2 id="deployment-types"><strong>1. Vertex AI上的預測類型</strong></h2>

<table>
<thead><tr><th>類型</th><th>延遲</th><th>使用時機</th></tr></thead>
<tbody>
<tr><td><strong>線上預測</strong></td><td>毫秒級（同步）</td><td>即時應用程式、面向使用者的API</td></tr>
<tr><td><strong>批次預測</strong></td><td>分鐘/小時（非同步）</td><td>大型資料集、排程評分</td></tr>
<tr><td><strong>串流預測</strong></td><td>近即時</td><td>Pub/Sub事件 + Dataflow + Vertex AI</td></tr>
</tbody>
</table>

<h2 id="vertex-endpoints"><strong>2. Vertex AI Endpoints</strong></h2>

<pre><code class="language-text">Vertex AI Endpoint Architecture:

Client Request
    ↓
Vertex AI Endpoint (load balancer)
    ├── Model Version A (70% traffic)
    │       └── Deployed Model (e.g., v1.0)
    └── Model Version B (30% traffic)  ← Canary/A-B test
            └── Deployed Model (e.g., v1.1)
</code></pre>

<p>每個Endpoint可以有<strong>多個模型版本</strong>配合<strong>流量分割</strong>——用於A/B測試和金絲雀部署。</p>

<table>
<thead><tr><th>功能</th><th>詳細</th></tr></thead>
<tbody>
<tr><td><strong>專用端點</strong></td><td>專用資源、最低延遲、較高成本</td></tr>
<tr><td><strong>共享端點</strong></td><td>多租戶、較低成本、可能有冷啟動</td></tr>
<tr><td><strong>可解釋性</strong></td><td>為每個部署的模型啟用Vertex Explainability</td></tr>
<tr><td><strong>最小/最大副本數</strong></td><td>根據請求率自動擴展</td></tr>
<tr><td><strong>GPU分配</strong></td><td>為每次部署指定GPU類型（NVIDIA T4、A100）</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> Vertex AI Endpoints的流量分割是實作<strong>金絲雀部署</strong>或<strong>A/B測試</strong>的方式。題目問「安全推出新模型版本」→ 流量分割（例如：90%舊版、10%新版）。</p>
</blockquote>

<h2 id="batch-prediction"><strong>3. 批次預測</strong></h2>

<table>
<thead><tr><th>屬性</th><th>值</th></tr></thead>
<tbody>
<tr><td><strong>輸入</strong></td><td>Cloud Storage（CSV、JSON、JSONL、TFRecords、Avro）</td></tr>
<tr><td><strong>輸出</strong></td><td>Cloud Storage（JSON/CSV格式的預測結果）</td></tr>
<tr><td><strong>不需要端點</strong></td><td>直接從Model Registry執行，不需要持久化端點</td></tr>
<tr><td><strong>自動擴展</strong></td><td>完成後縮減至零（成本效益高）</td></tr>
<tr><td><strong>加速器</strong></td><td>支援GPU/TPU進行批次推論</td></tr>
</tbody>
</table>

<h2 id="model-versioning"><strong>4. 模型版本管理與Registry</strong></h2>

<pre><code class="language-text">Vertex AI Model Registry:

Model: churn-predictor
├── v1 (Logistic Regression)  ← Champion in production
│   - Accuracy: 0.87
│   - Deployed to: endpoint/prod (70% traffic)
│
└── v2 (XGBoost)              ← Challenger
    - Accuracy: 0.91
    - Deployed to: endpoint/prod (30% traffic)

After validation: promote v2 to Champion
</code></pre>

<h2 id="edge-deployment"><strong>5. 邊緣部署</strong></h2>

<table>
<thead><tr><th>平台</th><th>解決方案</th></tr></thead>
<tbody>
<tr><td>行動裝置（Android/iOS）</td><td>TFLite + Vertex AI模型匯出</td></tr>
<tr><td>邊緣裝置（IoT）</td><td>TFLite Micro / Edge TPU（Coral）</td></tr>
<tr><td>本地伺服器</td><td>Docker容器中的TF Serving</td></tr>
<tr><td>Kubernetes</td><td>GKE上的KServe（前身KFServing）</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>6. 練習題</strong></h2>

<p><strong>Q1：</strong> 一家公司需要對5,000萬筆客戶記錄進行流失風險評分。結果需要在2小時內完成，但不需要即時。哪種Vertex AI預測選項最具成本效益？</p>
<ul>
<li>A) 高副本數的線上預測</li>
<li>B) 批次預測 ✓</li>
<li>C) 透過Dataflow的串流預測</li>
<li>D) 部署在專用GPU端點上</li>
</ul>
<p><em>解說：批次預測專為大規模非同步評分設計。在工作期間擴展運算資源，完成後縮減至零，無持久化端點成本。既然不需要即時回應，線上預測會是浪費。</em></p>

<p><strong>Q2：</strong> 團隊正在部署新的模型版本。他們想逐步將10%的生產流量路由到新版本，而舊版本處理90%，在全面推出前比較效能指標。哪個Vertex AI功能實現此目的？</p>
<ul>
<li>A) Model Registry版本管理</li>
<li>B) Vertex AI Endpoints流量分割 ✓</li>
<li>C) 批次預測比較</li>
<li>D) Vertex AI Experiments</li>
</ul>
<p><em>解說：Vertex AI Endpoints支援同時部署多個模型版本，配合可設定的流量分割（例如90%/10%）。這使得金絲雀部署和A/B測試能夠在全面推出前比較即時效能。</em></p>

<p><strong>Q3：</strong> 一家零售公司想在沒有雲端網路連線的工廠車間偵測產品缺陷。應使用哪種部署方式？</p>
<ul>
<li>A) Vertex AI線上預測端點</li>
<li>B) 使用TFLite部署到裝置的AutoML Edge Model ✓</li>
<li>C) BigQuery ML批次預測</li>
<li>D) Cloud Run上的TF Serving</li>
</ul>
<p><em>解說：使用TFLite（或AutoML Edge Model）的邊緣部署可以在裝置上本地執行推論，不需要網路連線。TFLite支援電腦視覺模型的裝置端推論，適合沒有網路的工廠車間設備。</em></p>
