---
id: 019c9619-lt03-l03
title: 'Bài 3: Data Pipeline — Dataflow, Pub/Sub, Dataproc'
slug: bai-3-data-pipeline
description: >-
  Apache Beam trên Dataflow cho batch/streaming ETL.
  Pub/Sub cho event-driven pipelines. Dataproc cho Spark.
  Cloud Composer (Airflow) cho orchestration.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 3
section_title: "Phần 2: Data Engineering & Feature Engineering"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Luyện thi Google Cloud Professional Machine Learning Engineer'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai3-data-pipeline.webp" alt="GCP Data Pipeline Architecture" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>GCP Data Pipeline: Pub/Sub, Dataflow, Dataproc, Cloud Composer và luồng dữ liệu cho ML</em></p>
</div>

<h2 id="gcp-data-pipeline"><strong>1. GCP Data Pipeline Services</strong></h2>

<table>
<thead><tr><th>Service</th><th>Type</th><th>When to Use</th></tr></thead>
<tbody>
<tr><td><strong>Pub/Sub</strong></td><td>Managed message queue</td><td>Event streaming, decouple producers/consumers</td></tr>
<tr><td><strong>Dataflow</strong></td><td>Managed Apache Beam runner</td><td>Unified batch + streaming ETL</td></tr>
<tr><td><strong>Dataproc</strong></td><td>Managed Spark / Hadoop</td><td>Existing Spark/Hadoop workloads, ML at scale</td></tr>
<tr><td><strong>Cloud Composer</strong></td><td>Managed Apache Airflow</td><td>Orchestrate multi-step ML workflows</td></tr>
<tr><td><strong>Cloud Storage</strong></td><td>Object store</td><td>Raw data landing zone, model artifacts</td></tr>
<tr><td><strong>BigQuery</strong></td><td>Data warehouse</td><td>Structured analysis, BigQuery ML</td></tr>
</tbody>
</table>

<h2 id="pubsub"><strong>2. Pub/Sub — Event Streaming</strong></h2>

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
<thead><tr><th>Feature</th><th>Details</th></tr></thead>
<tbody>
<tr><td><strong>Message retention</strong></td><td>7 days default (configurable)</td></tr>
<tr><td><strong>At-least-once delivery</strong></td><td>Idempotent subscribers needed</td></tr>
<tr><td><strong>Exactly-once</strong></td><td>Available in Pub/Sub Lite (same region)</td></tr>
<tr><td><strong>Ordering</strong></td><td>Enable message ordering with ordering key</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> Pub/Sub → Dataflow → BigQuery là pipeline pattern cực phổ biến trong đề thi. Pub/Sub ingest, Dataflow transform, BigQuery store + analyze.</p>
</blockquote>

<h2 id="dataflow"><strong>3. Cloud Dataflow — Apache Beam</strong></h2>

<p>Dataflow là managed runner cho <strong>Apache Beam</strong> — framework cho unified batch và streaming processing. Không cần quản lý servers.</p>

<table>
<thead><tr><th>Concept</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Pipeline</strong></td><td>Chuỗi transform operations</td></tr>
<tr><td><strong>PCollection</strong></td><td>Distributed data collection (bounded or unbounded)</td></tr>
<tr><td><strong>Transform</strong></td><td>ParDo, GroupByKey, Combine, Flatten, Partition</td></tr>
<tr><td><strong>Windowing</strong></td><td>Fixed, Sliding, Session windows cho streaming</td></tr>
<tr><td><strong>Watermarks</strong></td><td>Handle late-arriving data in streaming</td></tr>
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

<h2 id="dataproc"><strong>4. Cloud Dataproc — Managed Spark/Hadoop</strong></h2>

<table>
<thead><tr><th>Dataproc Feature</th><th>Details</th></tr></thead>
<tbody>
<tr><td><strong>Cluster lifecycle</strong></td><td>Create in 90 seconds, delete after job — cost efficient</td></tr>
<tr><td><strong>Ephemeral clusters</strong></td><td>Spin up → run job → shut down (per-job pricing)</td></tr>
<tr><td><strong>Preemptible VMs</strong></td><td>Use for worker nodes to reduce cost 60-80%</td></tr>
<tr><td><strong>Component gateway</strong></td><td>Access Jupyter, Zeppelin, Spark UI via browser</td></tr>
<tr><td><strong>ML libraries</strong></td><td>Spark MLlib, TensorFlow on Spark (TFoS)</td></tr>
</tbody>
</table>

<h2 id="composer"><strong>5. Cloud Composer — Workflow Orchestration</strong></h2>

<p>Cloud Composer là managed Apache Airflow. Dùng để orchestrate multi-step ML pipelines bao gồm data ingestion, preprocessing, training, và deployment.</p>

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

<h2 id="decision-guide"><strong>6. Data Pipeline Service Selection</strong></h2>

<table>
<thead><tr><th>Scenario</th><th>Recommended Service</th></tr></thead>
<tbody>
<tr><td>Real-time event streaming ingestion</td><td>Pub/Sub</td></tr>
<tr><td>Unified batch + streaming ETL (no infra mgmt)</td><td>Dataflow (Apache Beam)</td></tr>
<tr><td>Migrate existing Spark jobs to GCP</td><td>Dataproc</td></tr>
<tr><td>Complex ML DAG orchestration</td><td>Cloud Composer</td></tr>
<tr><td>Stream data into BigQuery</td><td>Pub/Sub → Dataflow → BigQuery</td></tr>
<tr><td>Serverless data processing (SQL)</td><td>BigQuery (ETL via SQL)</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A company receives millions of IoT sensor events per second from factory equipment. They need to process these events in real time, detect anomalies, and store results in BigQuery. Which pipeline architecture is MOST appropriate?</p>
<ul>
<li>A) Dataproc → Spark Streaming → BigQuery</li>
<li>B) Pub/Sub → Dataflow → BigQuery ✓</li>
<li>C) Cloud Functions → Cloud SQL</li>
<li>D) Batch upload to Cloud Storage → BigQuery import</li>
</ul>
<p><em>Explanation: Pub/Sub ingests high-volume streaming events reliably. Dataflow processes the stream in real time using Apache Beam (windowing, transformations, anomaly detection). BigQuery stores the results for analysis. This is the canonical GCP streaming analytics pattern.</em></p>

<p><strong>Q2:</strong> A data engineering team has an existing Apache Spark job that processes training data for ML models. They want to migrate it to GCP with minimal code changes. Which service should they use?</p>
<ul>
<li>A) Cloud Dataflow</li>
<li>B) Cloud Dataproc ✓</li>
<li>C) BigQuery ETL</li>
<li>D) Cloud Composer</li>
</ul>
<p><em>Explanation: Cloud Dataproc supports Apache Spark natively, allowing teams to run existing Spark jobs on GCP with minimal changes. Dataflow uses Apache Beam (different programming model). Dataproc is the lift-and-shift option for Spark workloads.</em></p>

<p><strong>Q3:</strong> A team needs to orchestrate a daily ML pipeline that includes data extraction from BigQuery, preprocessing, Vertex AI training, and deployment if accuracy exceeds 90%. Which service handles this workflow orchestration?</p>
<ul>
<li>A) Vertex AI Pipelines</li>
<li>B) Cloud Dataflow</li>
<li>C) Cloud Composer ✓</li>
<li>D) Pub/Sub triggers</li>
</ul>
<p><em>Explanation: Cloud Composer (managed Apache Airflow) is designed for complex DAG orchestration across multiple services. It handles scheduling, conditional branching (deploy only if accuracy > 90%), retry logic, and monitoring across heterogeneous services like BigQuery, Dataflow, and Vertex AI.</em></p>
