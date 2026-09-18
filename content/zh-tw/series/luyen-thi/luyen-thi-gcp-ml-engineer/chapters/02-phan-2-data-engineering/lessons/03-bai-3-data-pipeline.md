---
id: 019c9619-lt03-l03
title: '第3課：資料管線 — Dataflow、Pub/Sub、Dataproc'
slug: bai-3-data-pipeline
description: >-
  Dataflow上的Apache Beam進行批次/串流ETL。
  Pub/Sub進行事件驅動管線。Dataproc進行Spark。
  Cloud Composer（Airflow）進行協調排程。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 3
section_title: "領域2：資料工程與特徵工程"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer 考試準備'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai3-data-pipeline.webp" alt="GCP Data Pipeline Architecture" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>GCP資料管線：Pub/Sub、Dataflow、Dataproc、Cloud Composer與ML資料流</em></p>
</div>

<h2 id="gcp-data-pipeline"><strong>1. GCP資料管線服務</strong></h2>

<table>
<thead><tr><th>服務</th><th>類型</th><th>使用時機</th></tr></thead>
<tbody>
<tr><td><strong>Pub/Sub</strong></td><td>託管訊息佇列</td><td>事件串流、解耦生產者/消費者</td></tr>
<tr><td><strong>Dataflow</strong></td><td>託管Apache Beam執行器</td><td>統一批次 + 串流ETL</td></tr>
<tr><td><strong>Dataproc</strong></td><td>託管Spark / Hadoop</td><td>現有Spark/Hadoop工作負載、大規模ML</td></tr>
<tr><td><strong>Cloud Composer</strong></td><td>託管Apache Airflow</td><td>多步驟ML工作流程的協調排程</td></tr>
<tr><td><strong>Cloud Storage</strong></td><td>物件儲存</td><td>原始資料落地區、模型成品</td></tr>
<tr><td><strong>BigQuery</strong></td><td>資料倉儲</td><td>結構化分析、BigQuery ML</td></tr>
</tbody>
</table>

<h2 id="pubsub"><strong>2. Pub/Sub — 事件串流</strong></h2>

<pre><code class="language-text">Pub/Sub Architecture:

Data Source → Publisher → [Topic] → Subscription → Subscriber
(IoT devices,                         (Pull or            (Dataflow,
web clicks,                            Push)              Cloud Functions,
logs)                                                     BigQuery)

Key concepts:
- Topic: named resource where messages are sent
- Subscription: named resource attached to topic
- Publisher: sends messages to topic  
- Subscriber: receives messages from subscription
- At-least-once delivery (not exactly-once by default)
</code></pre>

<table>
<thead><tr><th>功能</th><th>詳細</th></tr></thead>
<tbody>
<tr><td><strong>訊息保留期間</strong></td><td>預設7天（可設定）</td></tr>
<tr><td><strong>At-least-once傳遞</strong></td><td>需要冪等的訂閱者</td></tr>
<tr><td><strong>Exactly-once</strong></td><td>在Pub/Sub Lite中可用（同一區域）</td></tr>
<tr><td><strong>排序</strong></td><td>使用排序金鑰啟用訊息排序</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> Pub/Sub → Dataflow → BigQuery是考試中非常常見的管線模式。Pub/Sub負責擷取、Dataflow負責轉換、BigQuery負責儲存和分析。</p>
</blockquote>

<h2 id="dataflow"><strong>3. Cloud Dataflow — Apache Beam</strong></h2>

<p>Dataflow是<strong>Apache Beam</strong>的託管執行器——用於統一批次和串流處理的框架，無需管理伺服器。</p>

<table>
<thead><tr><th>概念</th><th>說明</th></tr></thead>
<tbody>
<tr><td><strong>Pipeline</strong></td><td>一系列轉換操作</td></tr>
<tr><td><strong>PCollection</strong></td><td>分散式資料集合（有界或無界）</td></tr>
<tr><td><strong>Transform</strong></td><td>ParDo、GroupByKey、Combine、Flatten、Partition</td></tr>
<tr><td><strong>Windowing</strong></td><td>串流用的Fixed、Sliding、Session視窗</td></tr>
<tr><td><strong>Watermarks</strong></td><td>處理串流中遲到的資料</td></tr>
</tbody>
</table>

<pre><code class="language-text">Dataflow Windowing for Streaming ML:

Event stream: ──●──●──●──────●──●──●──────●──●──

Fixed Window (1 min):
├─── [W1] ──┤├─── [W2] ──┤├─── [W3] ──┤

Sliding Window (1 min, slide 30s):
├── [W1] ────┤
       ├── [W2] ────┤
              ├── [W3] ────┤

Session Window (2 min gap):
├── [S1] ──────────┤          ├── [S2] ──┤
     (user session)            (new session)
</code></pre>

<h2 id="dataproc"><strong>4. Cloud Dataproc — 託管Spark/Hadoop</strong></h2>

<table>
<thead><tr><th>Dataproc功能</th><th>詳細</th></tr></thead>
<tbody>
<tr><td><strong>叢集生命週期</strong></td><td>90秒建立，工作後刪除 — 節省成本</td></tr>
<tr><td><strong>臨時叢集</strong></td><td>啟動 → 執行工作 → 關閉（按工作計費）</td></tr>
<tr><td><strong>可搶佔式VM</strong></td><td>用於工作節點以減少60-80%成本</td></tr>
<tr><td><strong>元件閘道</strong></td><td>透過瀏覽器存取Jupyter、Zeppelin、Spark UI</td></tr>
<tr><td><strong>ML函式庫</strong></td><td>Spark MLlib、TensorFlow on Spark（TFoS）</td></tr>
</tbody>
</table>

<h2 id="composer"><strong>5. Cloud Composer — 工作流程協調</strong></h2>

<p>Cloud Composer是託管的Apache Airflow。用於協調包含資料擷取、前處理、訓練和部署的多步驟ML管線。</p>

<pre><code class="language-text">Cloud Composer ML Workflow:

[DAG: daily_ml_pipeline]
   Task 1: Extract data from BigQuery
       ↓
   Task 2: Run Dataflow preprocessing job
       ↓
   Task 3: Submit Vertex AI Training Job
       ↓
   Task 4: Evaluate model metrics
       ↓ (if metrics pass threshold)
   Task 5: Deploy to Vertex AI Endpoint
</code></pre>

<h2 id="decision-guide"><strong>6. 資料管線服務選擇</strong></h2>

<table>
<thead><tr><th>場景</th><th>推薦服務</th></tr></thead>
<tbody>
<tr><td>即時事件串流擷取</td><td>Pub/Sub</td></tr>
<tr><td>統一批次 + 串流ETL（無需基礎設施管理）</td><td>Dataflow（Apache Beam）</td></tr>
<tr><td>將現有Spark工作遷移到GCP</td><td>Dataproc</td></tr>
<tr><td>複雜的ML DAG協調</td><td>Cloud Composer</td></tr>
<tr><td>將資料串流至BigQuery</td><td>Pub/Sub → Dataflow → BigQuery</td></tr>
<tr><td>無伺服器資料處理（SQL）</td><td>BigQuery（SQL ETL）</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. 練習題</strong></h2>

<p><strong>Q1：</strong> 一家公司每秒從工廠設備接收數百萬個IoT感測器事件。他們需要即時處理這些事件、偵測異常並將結果儲存到BigQuery。最合適的管線架構是什麼？</p>
<ul>
<li>A) Dataproc → Spark Streaming → BigQuery</li>
<li>B) Pub/Sub → Dataflow → BigQuery ✓</li>
<li>C) Cloud Functions → Cloud SQL</li>
<li>D) 批次上傳至Cloud Storage → BigQuery匯入</li>
</ul>
<p><em>解說：Pub/Sub可靠地擷取大量串流事件。Dataflow使用Apache Beam即時處理串流（視窗化、轉換、異常偵測）。BigQuery儲存結果以供分析。這是GCP標準的串流分析模式。</em></p>

<p><strong>Q2：</strong> 資料工程團隊有一個現有的Apache Spark工作用來處理ML模型的訓練資料。他們想以最小的程式碼變更遷移到GCP。應使用哪個服務？</p>
<ul>
<li>A) Cloud Dataflow</li>
<li>B) Cloud Dataproc ✓</li>
<li>C) BigQuery ETL</li>
<li>D) Cloud Composer</li>
</ul>
<p><em>解說：Cloud Dataproc原生支援Apache Spark，允許團隊以最小的變更在GCP上執行現有的Spark工作。Dataflow使用Apache Beam（不同的程式設計模型）。Dataproc是Spark工作負載的直接遷移選項。</em></p>

<p><strong>Q3：</strong> 團隊需要協調一個日常ML管線，包含從BigQuery擷取資料、前處理、Vertex AI訓練，以及準確率超過90%時的部署。哪個服務處理此工作流程協調？</p>
<ul>
<li>A) Vertex AI Pipelines</li>
<li>B) Cloud Dataflow</li>
<li>C) Cloud Composer ✓</li>
<li>D) Pub/Sub觸發器</li>
</ul>
<p><em>解說：Cloud Composer（託管Apache Airflow）專為跨多個服務的複雜DAG協調而設計。它處理排程、條件分支（僅在準確率 > 90%時部署）、重試邏輯，以及BigQuery、Dataflow和Vertex AI等異質服務間的監控。</em></p>
