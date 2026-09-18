---
id: 82fb04d8-e74e-4cf3-8b90-cfa274629073
title: '第7課：模型部署 — 端點與推論'
slug: bai-7-model-deployment
description: >-
  即時端點、批次轉換、非同步推論、無伺服器推論。
  多模型端點、推論管線。
  Elastic Inference、SageMaker Neo（邊緣部署）。
  Production Variants的A/B測試。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 7
section_title: "第3部分：ML實作與維運（20%）"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認證機器學習 - 專業級 考試準備'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai7-deployment-options.webp" alt="SageMaker Model Deployment Options" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>SageMaker部署選項：即時端點、無伺服器、非同步推論與批次轉換</em></p>
</div>

<h2 id="deployment-options"><strong>1. SageMaker部署選項</strong></h2>

<p>SageMaker提供多種推論模式 — 每種適合不同的工作負載。此部分在MLS-C01考試中通常出5〜8題。</p>

<blockquote>
<p><strong>考試提示：</strong> 關鍵決策因素：延遲需求、流量、成本、有效負載大小。對應方式：即時（低延遲）→ 非同步（大型有效負載）→ 無伺服器（零星流量）→ 批次（無延遲需求）。</p>
</blockquote>

<table>
<thead><tr><th>部署類型</th><th>延遲</th><th>吞吐量</th><th>成本模式</th><th>最適用途</th></tr></thead>
<tbody>
<tr><td><strong>即時端點</strong></td><td>毫秒</td><td>高</td><td>持續運行（按小時計費）</td><td>互動式應用、API</td></tr>
<tr><td><strong>無伺服器推論</strong></td><td>秒（冷啟動）</td><td>不定</td><td>按調用計費</td><td>零星、不可預測的流量</td></tr>
<tr><td><strong>非同步推論</strong></td><td>分鐘</td><td>高（佇列式）</td><td>按處理計費</td><td>大型有效負載、非緊急</td></tr>
<tr><td><strong>批次轉換</strong></td><td>非即時</td><td>非常高</td><td>按批次工作計費</td><td>排程離線預測</td></tr>
</tbody>
</table>

<h2 id="realtime-endpoint"><strong>2. 即時推論</strong></h2>

<p>標準部署 — 持久端點持續運行，同步回應。</p>

<pre><code class="language-text">Real-time Endpoint Architecture:

Client ──→ HTTPS Request
              ↓
      SageMaker Endpoint
      ┌────────────────┐
      │  Model Server  │  ← Instance running 24/7
      │  (TorchServe,  │
      │  TensorFlow    │
      │  Serving, etc) │
      └────────────────┘
              ↓
         Response (ms)
</code></pre>

<h3 id="autoscaling"><strong>2.1. 端點自動擴展</strong></h3>

<p>端點可以透過Application Auto Scaling基於<strong>InvocationsPerInstance</strong>指標進行擴展。</p>

<h2 id="serverless"><strong>3. 無伺服器推論</strong></h2>

<p>適合流量<strong>不均勻、難以預測</strong>的情況。AWS自動擴展，包括在沒有流量時縮減至0。</p>

<table>
<thead><tr><th>功能</th><th>詳情</th></tr></thead>
<tbody>
<tr><td>冷啟動延遲</td><td>約1-2秒（閒置後的第一次請求）</td></tr>
<tr><td>記憶體配置</td><td>1 GB → 6 GB</td></tr>
<tr><td>最大有效負載</td><td>4 MB</td></tr>
<tr><td>定價</td><td>按推論請求 + 處理時間</td></tr>
</tbody>
</table>

<h2 id="async"><strong>4. 非同步推論</strong></h2>

<p>適合<strong>大型媒體檔案、長時間處理</strong>的情況。請求排入佇列，回應儲存至S3。</p>

<pre><code class="language-text">Async Inference Flow:

Client ──→ Upload payload to S3 ──→ Invoke Endpoint
                                          ↓
                                   Queue Request
                                          ↓
                               Process when instance available
                                          ↓
                                   Save output to S3
                                          ↓
                           SNS Notification → Client
</code></pre>

<table>
<thead><tr><th>功能</th><th>詳情</th></tr></thead>
<tbody>
<tr><td>最大有效負載</td><td>1 GB（即時為6 MB）</td></tr>
<tr><td>自動縮減至0</td><td>是 — 佇列為空時縮減</td></tr>
<tr><td>回應</td><td>S3輸出路徑 + SNS通知</td></tr>
</tbody>
</table>

<h2 id="batch-transform"><strong>5. 批次轉換</strong></h2>

<p>按排程對<strong>整個數據集</strong>執行預測。沒有端點 — 僅在需要時執行。</p>

<pre><code class="language-text">Batch Transform:

Input S3 ──→ Batch Transform Job ──→ Output S3
  (CSV/       (ephemeral compute)      (CSV/JSON
  JSON/                                predictions)
  Parquet)           ↑
               No persistent endpoint
               Pay only when running
</code></pre>

<h2 id="multi-model"><strong>6. 多模型端點（MME）</strong></h2>

<p><strong>MME</strong>允許在單一端點上託管<strong>多個模型</strong>，降低推論基礎設施成本。</p>

<table>
<thead><tr><th>功能</th><th>詳情</th></tr></thead>
<tbody>
<tr><td>成本節省</td><td>單一端點服務數千個模型</td></tr>
<tr><td>動態載入</td><td>模型按需載入記憶體、快取</td></tr>
<tr><td>使用情境</td><td>SaaS多租戶，每個客戶一個模型</td></tr>
</tbody>
</table>

<h2 id="neo"><strong>7. SageMaker Neo — 邊緣部署</strong></h2>

<p><strong>SageMaker Neo</strong>編譯模型並針對特定硬體（邊緣裝置、行動裝置）進行最佳化。</p>

<pre><code class="language-text">Neo Workflow:

Trained Model (S3)
       ↓
  Neo Compiler
  (optimizes for target hardware)
       ↓
 Optimized Model
       ↓
    ├── Deploy to IoT Greengrass (edge)
    ├── Deploy to ARM devices
    └── Deploy to mobile (Android/iOS)
</code></pre>

<h2 id="cheat-sheet"><strong>8. 速查表 — 部署決策</strong></h2>

<table>
<thead><tr><th>情境</th><th>部署類型</th></tr></thead>
<tbody>
<tr><td>行動應用，即時回應（&lt;100ms）</td><td>即時端點</td></tr>
<tr><td>流量零星（每小時幾個請求）</td><td>無伺服器推論</td></tr>
<tr><td>影片/音訊處理（大型檔案）</td><td>非同步推論</td></tr>
<tr><td>每晚對完整數據集進行預測</td><td>批次轉換</td></tr>
<tr><td>數千個客戶特定模型</td><td>多模型端點</td></tr>
<tr><td>IoT邊緣裝置部署</td><td>SageMaker Neo + Greengrass</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>9. 練習題</strong></h2>

<p><strong>Q1:</strong> 一家公司經營一個電商聊天機器人，在購物高峰期需要低於100毫秒的回應時間。應該使用哪種SageMaker推論類型？</p>
<ul>
<li>A) 批次轉換</li>
<li>B) 非同步推論</li>
<li>C) 無伺服器推論</li>
<li>D) 即時端點 ✓</li>
</ul>
<p><em>解析：即時端點提供持久的、持續運行的毫秒級延遲推論。無伺服器有冷啟動延遲，非同步是非同步的（非低於100毫秒），批次轉換用於排程離線處理。</em></p>

<p><strong>Q2:</strong> 一家媒體公司想對1 GB的影片檔案執行ML分類。處理時間不緊急。最適當的SageMaker推論選項是哪個？</p>
<ul>
<li>A) 即時端點</li>
<li>B) 無伺服器推論</li>
<li>C) 非同步推論 ✓</li>
<li>D) 批次轉換</li>
</ul>
<p><em>解析：非同步推論支援高達1 GB的有效負載並將請求排入佇列處理，非常適合大型媒體檔案。即時限制為6 MB有效負載，無伺服器限制為4 MB，批次轉換用於排程批量預測而非即時佇列。</em></p>

<p><strong>Q3:</strong> 一家SaaS公司為其10,000個企業客戶各提供獨立的ML模型。為每個模型託管單獨的端點太昂貴。最佳解決方案是什麼？</p>
<ul>
<li>A) 將所有模型合併為一個大型模型</li>
<li>B) 使用SageMaker多模型端點 ✓</li>
<li>C) 在單一批次轉換工作中部署所有模型</li>
<li>D) 為每個模型使用無伺服器推論</li>
</ul>
<p><em>解析：多模型端點（MME）在單一端點上託管多個模型，按需動態將它們載入記憶體。這正是為多租戶場景設計的，每個客戶有自己的模型，可大幅降低基礎設施成本。</em></p>
