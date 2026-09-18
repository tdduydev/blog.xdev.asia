---
id: 14a964b2-b4b7-46e5-95b0-7d91d9cacdf5
title: 'Bài 1: Data Repositories & Ingestion — S3, Kinesis, Glue'
slug: bai-1-data-repositories-ingestion
description: >-
  S3 data lake cho ML. Kinesis Data Streams/Firehose cho streaming ingestion.
  AWS Glue ETL jobs và Data Catalog. Lake Formation. Data Wrangler.
  Chiến lược lưu trữ: Parquet, ORC, CSV, JSON.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: "Phần 1: Data Engineering (20%)"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'Luyện thi AWS Certified Machine Learning - Specialty'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai1-data-ingestion.webp" alt="AWS ML Data Repositories & Ingestion" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Data Repositories & Ingestion: S3, Kinesis, Glue và Lake Formation trong ML pipeline</em></p>
</div>

<h2 id="overview"><strong>1. Tổng quan Data Engineering trong MLS-C01</strong></h2>

<p>Domain Data Engineering chiếm <strong>20% đề thi MLS-C01</strong>. Đây là phần bắt buộc phải nắm vững — đề thi thường hỏi "Which service should be used to ingest/store/transform data for ML?"</p>

<blockquote>
<p><strong>Exam tip:</strong> Phần lớn câu hỏi Data Engineering sẽ cho một scenario và hỏi service phù hợp. Key pattern: batch → S3 + Glue; streaming → Kinesis; structured/SQL → Athena; catalog → Glue Data Catalog.</p>
</blockquote>

<h2 id="s3-ml"><strong>2. Amazon S3 — ML Data Lake</strong></h2>

<p><strong>Amazon S3</strong> là nền tảng lưu trữ dữ liệu ML trên AWS. Mọi pipeline ML đều bắt đầu và kết thúc từ S3: training data, model artifacts, predictions.</p>

<h3 id="s3-storage-classes"><strong>2.1. S3 Storage Classes cho ML</strong></h3>

<table>
<thead><tr><th>Storage Class</th><th>Use Case</th><th>Cost</th></tr></thead>
<tbody>
<tr><td><strong>S3 Standard</strong></td><td>Active training data, frequent access</td><td>Cao nhất</td></tr>
<tr><td><strong>S3 Intelligent-Tiering</strong></td><td>Mixed access patterns (tự động tier)</td><td>Tự động tối ưu</td></tr>
<tr><td><strong>S3 Standard-IA</strong></td><td>Backup datasets, infrequent access</td><td>Thấp hơn Standard</td></tr>
<tr><td><strong>S3 Glacier Instant Retrieval</strong></td><td>Archived datasets, occasional retrieval</td><td>Thấp</td></tr>
<tr><td><strong>S3 Glacier Deep Archive</strong></td><td>Long-term compliance archives</td><td>Thấp nhất</td></tr>
</tbody>
</table>

<h3 id="s3-file-formats"><strong>2.2. File Formats for ML</strong></h3>

<table>
<thead><tr><th>Format</th><th>Type</th><th>Best For</th><th>Compression</th></tr></thead>
<tbody>
<tr><td><strong>Parquet</strong></td><td>Columnar</td><td>Analytics, large datasets, feature stores</td><td>Excellent</td></tr>
<tr><td><strong>ORC</strong></td><td>Columnar</td><td>Hive/EMR workloads</td><td>Excellent</td></tr>
<tr><td><strong>CSV</strong></td><td>Row-based</td><td>Simple, SageMaker training input</td><td>Poor</td></tr>
<tr><td><strong>JSON</strong></td><td>Semi-structured</td><td>Nested data, APIs</td><td>Poor</td></tr>
<tr><td><strong>RecordIO</strong></td><td>Binary</td><td>SageMaker Pipe Mode training</td><td>Good</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> Khi đề hỏi về <em>performance optimization</em> cho large-scale training, đáp án thường là chuyển sang <strong>Parquet</strong> (columnar, compressed) và dùng <strong>Pipe Mode</strong> thay vì File Mode trong SageMaker.</p>
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

<h2 id="kinesis"><strong>3. Amazon Kinesis — Streaming Ingestion</strong></h2>

<p>Kinesis là họ dịch vụ cho <strong>real-time data streaming</strong>. Đây là topic quan trọng trong đề thi — cần phân biệt rõ 4 services.</p>

<table>
<thead><tr><th>Service</th><th>Function</th><th>Destination</th><th>ML Use Case</th></tr></thead>
<tbody>
<tr><td><strong>Kinesis Data Streams (KDS)</strong></td><td>Custom real-time processing</td><td>Custom consumers</td><td>Real-time feature engineering</td></tr>
<tr><td><strong>Kinesis Data Firehose</strong></td><td>Managed delivery (no code)</td><td>S3, Redshift, ES, Splunk</td><td>Batch loading to data lake</td></tr>
<tr><td><strong>Kinesis Data Analytics</strong></td><td>SQL/Flink on streams</td><td>S3, Redshift</td><td>Real-time aggregations, anomaly detect</td></tr>
<tr><td><strong>Kinesis Video Streams</strong></td><td>Video ingestion</td><td>Rekognition, SageMaker</td><td>Computer vision pipelines</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> Câu hỏi phổ biến: "IoT sensors gửi data liên tục, cần store vào S3 cho ML training mà không cần custom code?" → Kinesis <strong>Data Firehose</strong> (managed, no code). "Cần xử lý real-time với custom logic?" → Kinesis <strong>Data Streams</strong>.</p>
</blockquote>

<h3 id="kinesis-shards"><strong>3.1. KDS Shards & Capacity</strong></h3>

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

<h2 id="glue"><strong>4. AWS Glue — ETL for ML</strong></h2>

<p><strong>AWS Glue</strong> là fully managed ETL service. Trong ML pipeline, Glue dùng để <strong>transform và clean data</strong> trước khi đưa vào training.</p>

<h3 id="glue-components"><strong>4.1. Glue Components</strong></h3>

<table>
<thead><tr><th>Component</th><th>Function</th></tr></thead>
<tbody>
<tr><td><strong>Glue Data Catalog</strong></td><td>Central metadata repository — schemas, tables, partitions</td></tr>
<tr><td><strong>Glue Crawlers</strong></td><td>Auto-discover schema từ S3/RDS/Redshift và populate Data Catalog</td></tr>
<tr><td><strong>Glue ETL Jobs</strong></td><td>Spark-based transformation jobs (Python/Scala)</td></tr>
<tr><td><strong>Glue DataBrew</strong></td><td>No-code visual data preparation (250+ pre-built transforms)</td></tr>
<tr><td><strong>Glue Studio</strong></td><td>Visual ETL job builder (drag-and-drop)</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> <strong>Glue Data Catalog</strong> là metadata store chung cho Athena, EMR, Redshift Spectrum. Khi đề hỏi "centralized schema management" → Glue Data Catalog. Khi hỏi "no-code data cleaning" → Glue DataBrew.</p>
</blockquote>

<h2 id="lake-formation"><strong>5. AWS Lake Formation</strong></h2>

<p><strong>Lake Formation</strong> build trên S3 + Glue để management <strong>data lake security và governance</strong>. Key feature: column-level và row-level access control.</p>

<pre><code class="language-text">Lake Formation Architecture:

  IAM Users ──→ Lake Formation ──→ S3 Data Lake
  IAM Roles       (Security         (Raw/Processed)
                   & Governance)
                       ↓
                  Column/Row
                  Level Access
                  Control
</code></pre>

<h2 id="cheat-sheet"><strong>6. Cheat Sheet — Data Ingestion Services</strong></h2>

<table>
<thead><tr><th>Scenario</th><th>Service</th></tr></thead>
<tbody>
<tr><td>Streaming → S3 với no-code</td><td>Kinesis Data Firehose</td></tr>
<tr><td>Real-time processing với custom logic</td><td>Kinesis Data Streams</td></tr>
<tr><td>SQL on streaming data</td><td>Kinesis Data Analytics (Flink)</td></tr>
<tr><td>Batch ETL Spark-based</td><td>AWS Glue ETL Jobs</td></tr>
<tr><td>No-code visual data prep</td><td>Glue DataBrew</td></tr>
<tr><td>Schema discovery from S3</td><td>Glue Crawlers + Data Catalog</td></tr>
<tr><td>SQL queries on S3</td><td>Amazon Athena</td></tr>
<tr><td>Data lake governance</td><td>AWS Lake Formation</td></tr>
<tr><td>Large-scale Spark/Hadoop</td><td>Amazon EMR</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A company wants to ingest IoT sensor data into Amazon S3 for ML training. The data arrives continuously and no custom processing is required. Which service is the MOST cost-effective?</p>
<ul>
<li>A) Amazon Kinesis Data Streams with a Lambda consumer</li>
<li>B) Amazon Kinesis Data Firehose ✓</li>
<li>C) Amazon EMR with Spark Streaming</li>
<li>D) AWS Glue ETL jobs on a schedule</li>
</ul>
<p><em>Explanation: Kinesis Data Firehose is fully managed and requires no custom code — it directly delivers streaming data to S3, Redshift, or Elasticsearch. Data Streams requires custom consumers, EMR is heavy lift, and Glue is for batch ETL.</em></p>

<p><strong>Q2:</strong> A data engineer wants to query raw CSV files in S3 using SQL without loading them into a database. Which service should be used?</p>
<ul>
<li>A) Amazon RDS</li>
<li>B) Amazon DynamoDB</li>
<li>C) Amazon Athena ✓</li>
<li>D) Amazon Redshift</li>
</ul>
<p><em>Explanation: Amazon Athena is serverless and allows SQL queries directly on S3 data without loading. It reads files in-place and supports formats like CSV, Parquet, ORC, JSON.</em></p>

<p><strong>Q3:</strong> Which file format provides the BEST performance for columnar analytics queries on large ML datasets stored in Amazon S3?</p>
<ul>
<li>A) CSV</li>
<li>B) JSON</li>
<li>C) XML</li>
<li>D) Apache Parquet ✓</li>
</ul>
<p><em>Explanation: Parquet is a columnar format with excellent compression and predicate pushdown support. Columnar formats allow reading only the required columns, dramatically reducing I/O for analytical queries.</em></p>
