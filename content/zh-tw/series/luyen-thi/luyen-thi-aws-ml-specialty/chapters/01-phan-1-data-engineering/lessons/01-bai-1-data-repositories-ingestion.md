---
id: 14a964b2-b4b7-46e5-95b0-7d91d9cacdf5
title: '第1課：Data Repositories & Ingestion — S3、Kinesis、Glue'
slug: bai-1-data-repositories-ingestion
description: >-
  S3作為ML數據湖。Kinesis Data Streams/Firehose用於串流攝取。
  AWS Glue ETL工作與Data Catalog。Lake Formation。Data Wrangler。
  儲存策略：Parquet、ORC、CSV、JSON。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: "第1部分：數據工程（20%）"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認證機器學習 - 專業級 考試準備'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai1-data-ingestion.webp" alt="AWS ML Data Repositories & Ingestion" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Data Repositories & Ingestion：ML管線中的S3、Kinesis、Glue、Lake Formation</em></p>
</div>

<h2 id="overview"><strong>1. MLS-C01數據工程概述</strong></h2>

<p>數據工程領域佔<strong>MLS-C01考試的20%</strong>。最常見的問題是「ML數據的攝取、儲存、轉換應該使用哪個服務？」</p>

<blockquote>
<p><strong>考試提示：</strong> 數據工程的大部分問題是情境式的，需要選擇適當的服務。主要模式：批次 → S3 + Glue、串流 → Kinesis、結構化/SQL → Athena、目錄 → Glue Data Catalog。</p>
</blockquote>

<h2 id="s3-ml"><strong>2. Amazon S3 — ML數據湖</strong></h2>

<p><strong>Amazon S3</strong>是AWS上ML數據儲存的基礎。所有ML管線都從S3開始、以S3結束：訓練數據、模型產出物、預測結果。</p>

<h3 id="s3-storage-classes"><strong>2.1. ML適用的S3儲存類別</strong></h3>

<table>
<thead><tr><th>儲存類別</th><th>使用情境</th><th>成本</th></tr></thead>
<tbody>
<tr><td><strong>S3 Standard</strong></td><td>活躍的訓練數據、頻繁存取</td><td>最高</td></tr>
<tr><td><strong>S3 Intelligent-Tiering</strong></td><td>混合存取模式（自動分層）</td><td>自動最佳化</td></tr>
<tr><td><strong>S3 Standard-IA</strong></td><td>備份數據集、低頻存取</td><td>低於Standard</td></tr>
<tr><td><strong>S3 Glacier Instant Retrieval</strong></td><td>封存數據集、偶爾取回</td><td>低</td></tr>
<tr><td><strong>S3 Glacier Deep Archive</strong></td><td>長期合規性封存</td><td>最低</td></tr>
</tbody>
</table>

<h3 id="s3-file-formats"><strong>2.2. ML適用的檔案格式</strong></h3>

<table>
<thead><tr><th>格式</th><th>類型</th><th>最適用途</th><th>壓縮</th></tr></thead>
<tbody>
<tr><td><strong>Parquet</strong></td><td>列式</td><td>分析、大型數據集、Feature Store</td><td>優秀</td></tr>
<tr><td><strong>ORC</strong></td><td>列式</td><td>Hive/EMR工作負載</td><td>優秀</td></tr>
<tr><td><strong>CSV</strong></td><td>行式</td><td>簡單、SageMaker訓練輸入</td><td>差</td></tr>
<tr><td><strong>JSON</strong></td><td>半結構化</td><td>巢狀數據、API</td><td>差</td></tr>
<tr><td><strong>RecordIO</strong></td><td>二進位</td><td>SageMaker Pipe Mode訓練</td><td>良好</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> 當問到大規模訓練的<em>效能最佳化</em>時，答案通常是轉換為<strong>Parquet</strong>（列式、壓縮）並在SageMaker中使用<strong>Pipe Mode</strong>（而非File Mode）。</p>
</blockquote>

<pre><code class="language-text">S3 Data Lake Architecture for ML:

┌─────────────────────────────────────────────────────────┐
│                    Amazon S3 Buckets                     │
├──────────────┬──────────────┬──────────────┬────────────┤
│  Raw Zone    │ Processed    │  Features    │  Models    │
│  (landing)   │  Zone        │  Zone        │  & Output  │
│              │              │              │            │
│  CSV/JSON    │  Parquet/ORC │  Feature     │  Model     │
│  original    │  cleaned     │  Store       │  Artifacts │
│  data        │  transformed │  snapshots   │  Predictions│
└──────────────┴──────────────┴──────────────┴────────────┘
       ↑                ↑                ↑
   Kinesis          AWS Glue         SageMaker
  (streaming)        (ETL)           Processing
</code></pre>

<h2 id="kinesis"><strong>3. Amazon Kinesis — 串流攝取</strong></h2>

<p>Kinesis是<strong>即時數據串流</strong>的服務家族。這是考試的重要主題，需要清楚區分4個服務。</p>

<table>
<thead><tr><th>服務</th><th>功能</th><th>目的地</th><th>ML使用情境</th></tr></thead>
<tbody>
<tr><td><strong>Kinesis Data Streams (KDS)</strong></td><td>自訂即時處理</td><td>自訂消費者</td><td>即時特徵工程</td></tr>
<tr><td><strong>Kinesis Data Firehose</strong></td><td>託管交付（無需程式碼）</td><td>S3、Redshift、ES、Splunk</td><td>批次載入至數據湖</td></tr>
<tr><td><strong>Kinesis Data Analytics</strong></td><td>串流上的SQL/Flink</td><td>S3、Redshift</td><td>即時彙總、異常檢測</td></tr>
<tr><td><strong>Kinesis Video Streams</strong></td><td>影片攝取</td><td>Rekognition、SageMaker</td><td>電腦視覺管線</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> 常見問題：「IoT感測器持續發送數據，想要無需自訂程式碼存入S3」→ Kinesis <strong>Data Firehose</strong>（託管、無需程式碼）。「需要自訂邏輯的即時處理」→ Kinesis <strong>Data Streams</strong>。</p>
</blockquote>

<h3 id="kinesis-shards"><strong>3.1. KDS分片與容量</strong></h3>

<pre><code class="language-text">Kinesis Data Streams Capacity:

┌─────────────────────────────────────────────┐
│  Each Shard:                                │
│  • Ingest:  1 MB/s OR 1,000 records/s       │
│  • Read:    2 MB/s                          │
│  • Retention: 24 hours (default) → 7 days  │
└─────────────────────────────────────────────┘

Stream with N shards:
• Total ingest: N × 1 MB/s
• Total read:   N × 2 MB/s
</code></pre>

<h2 id="glue"><strong>4. AWS Glue — ML的ETL</strong></h2>

<p><strong>AWS Glue</strong>是全託管ETL服務。在ML管線中用於訓練前的數據<strong>轉換和清理</strong>。</p>

<h3 id="glue-components"><strong>4.1. Glue元件</strong></h3>

<table>
<thead><tr><th>元件</th><th>功能</th></tr></thead>
<tbody>
<tr><td><strong>Glue Data Catalog</strong></td><td>中央元數據儲存庫 — 綱要、表格、分區</td></tr>
<tr><td><strong>Glue Crawlers</strong></td><td>從S3/RDS/Redshift自動發現綱要並註冊至Data Catalog</td></tr>
<tr><td><strong>Glue ETL Jobs</strong></td><td>Spark為基礎的轉換工作（Python/Scala）</td></tr>
<tr><td><strong>Glue DataBrew</strong></td><td>無程式碼視覺化數據準備（250+內建轉換）</td></tr>
<tr><td><strong>Glue Studio</strong></td><td>視覺化ETL工作建構器（拖放式）</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> <strong>Glue Data Catalog</strong>是Athena、EMR、Redshift Spectrum的共用元數據儲存。「集中式綱要管理」→ Glue Data Catalog。「無程式碼數據清理」→ Glue DataBrew。</p>
</blockquote>

<h2 id="lake-formation"><strong>5. AWS Lake Formation</strong></h2>

<p><strong>Lake Formation</strong>建構在S3 + Glue之上，管理<strong>數據湖的安全性和治理</strong>。主要功能：列級和行級存取控制。</p>

<pre><code class="language-text">Lake Formation Architecture:

  IAM Users ──→ Lake Formation ──→ S3 Data Lake
  IAM Roles       (Security         (Raw/Processed)
                   & Governance)
                       ↓
                  Column/Row
                  Level Access
                  Control
</code></pre>

<h2 id="cheat-sheet"><strong>6. 速查表 — 數據攝取服務</strong></h2>

<table>
<thead><tr><th>情境</th><th>服務</th></tr></thead>
<tbody>
<tr><td>串流 → S3（無需程式碼）</td><td>Kinesis Data Firehose</td></tr>
<tr><td>自訂邏輯的即時處理</td><td>Kinesis Data Streams</td></tr>
<tr><td>串流數據上的SQL</td><td>Kinesis Data Analytics (Flink)</td></tr>
<tr><td>批次ETL（Spark為基礎）</td><td>AWS Glue ETL Jobs</td></tr>
<tr><td>無程式碼視覺化數據準備</td><td>Glue DataBrew</td></tr>
<tr><td>S3的綱要發現</td><td>Glue Crawlers + Data Catalog</td></tr>
<tr><td>S3上的SQL查詢</td><td>Amazon Athena</td></tr>
<tr><td>數據湖治理</td><td>AWS Lake Formation</td></tr>
<tr><td>大規模Spark/Hadoop</td><td>Amazon EMR</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. 練習題</strong></h2>

<p><strong>Q1:</strong> 一家公司想要將IoT感測器數據攝取至Amazon S3用於ML訓練。數據持續到達且不需要自訂處理。最具成本效益的服務是哪個？</p>
<ul>
<li>A) Amazon Kinesis Data Streams搭配Lambda消費者</li>
<li>B) Amazon Kinesis Data Firehose ✓</li>
<li>C) Amazon EMR搭配Spark Streaming</li>
<li>D) 排程AWS Glue ETL工作</li>
</ul>
<p><em>解析：Kinesis Data Firehose是全託管且無需自訂程式碼。它直接將串流數據交付至S3、Redshift、Elasticsearch。Data Streams需要自訂消費者，EMR需要大規模管理，Glue是批次ETL。</em></p>

<p><strong>Q2:</strong> 數據工程師想要對S3中的原始CSV檔案執行SQL查詢，而無需載入到資料庫。應該使用哪個服務？</p>
<ul>
<li>A) Amazon RDS</li>
<li>B) Amazon DynamoDB</li>
<li>C) Amazon Athena ✓</li>
<li>D) Amazon Redshift</li>
</ul>
<p><em>解析：Amazon Athena是無伺服器的，可以直接對S3數據執行SQL查詢而無需載入。支援CSV、Parquet、ORC、JSON等格式。</em></p>

<p><strong>Q3:</strong> 對儲存在Amazon S3的大型ML數據集，哪種檔案格式能為列式分析查詢提供最佳效能？</p>
<ul>
<li>A) CSV</li>
<li>B) JSON</li>
<li>C) XML</li>
<li>D) Apache Parquet ✓</li>
</ul>
<p><em>解析：Parquet是列式格式，支援優秀的壓縮和謂詞下推。列式格式僅讀取所需的列，大幅減少分析查詢的I/O。</em></p>
