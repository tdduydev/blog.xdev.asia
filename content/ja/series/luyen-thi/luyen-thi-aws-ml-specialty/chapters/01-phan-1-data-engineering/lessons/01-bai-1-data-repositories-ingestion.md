---
id: 14a964b2-b4b7-46e5-95b0-7d91d9cacdf5
title: '第1課：Data Repositories & Ingestion — S3、Kinesis、Glue'
slug: bai-1-data-repositories-ingestion
description: >-
  MLデータレイクとしてのS3。ストリーミング取り込み用Kinesis Data Streams/Firehose。
  AWS Glue ETLジョブとData Catalog。Lake Formation。Data Wrangler。
  ストレージ戦略：Parquet、ORC、CSV、JSON。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: "パート1：データエンジニアリング（20%）"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認定機械学習 - 専門知識 試験対策'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai1-data-ingestion.webp" alt="AWS ML Data Repositories & Ingestion" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Data Repositories & Ingestion：MLパイプラインにおけるS3、Kinesis、Glue、Lake Formation</em></p>
</div>

<h2 id="overview"><strong>1. MLS-C01におけるデータエンジニアリングの概要</strong></h2>

<p>データエンジニアリングドメインは<strong>MLS-C01試験の20%</strong>を占めます。「ML向けデータの取り込み・保存・変換にどのサービスを使うべきか？」という質問が頻出します。</p>

<blockquote>
<p><strong>試験のヒント：</strong> データエンジニアリングの問題の大半はシナリオが提示され、適切なサービスを選ぶ形式です。主要パターン：バッチ → S3 + Glue、ストリーミング → Kinesis、構造化/SQL → Athena、カタログ → Glue Data Catalog。</p>
</blockquote>

<h2 id="s3-ml"><strong>2. Amazon S3 — MLデータレイク</strong></h2>

<p><strong>Amazon S3</strong>はAWS上のMLデータストレージの基盤です。すべてのMLパイプラインはS3から始まりS3で終わります：訓練データ、モデルアーティファクト、予測結果。</p>

<h3 id="s3-storage-classes"><strong>2.1. ML向けS3ストレージクラス</strong></h3>

<table>
<thead><tr><th>ストレージクラス</th><th>ユースケース</th><th>コスト</th></tr></thead>
<tbody>
<tr><td><strong>S3 Standard</strong></td><td>アクティブな訓練データ、頻繁なアクセス</td><td>最も高い</td></tr>
<tr><td><strong>S3 Intelligent-Tiering</strong></td><td>アクセスパターンが混在（自動階層化）</td><td>自動最適化</td></tr>
<tr><td><strong>S3 Standard-IA</strong></td><td>バックアップデータセット、低頻度アクセス</td><td>Standardより低い</td></tr>
<tr><td><strong>S3 Glacier Instant Retrieval</strong></td><td>アーカイブデータセット、時折の取得</td><td>低い</td></tr>
<tr><td><strong>S3 Glacier Deep Archive</strong></td><td>長期コンプライアンスアーカイブ</td><td>最も低い</td></tr>
</tbody>
</table>

<h3 id="s3-file-formats"><strong>2.2. ML向けファイルフォーマット</strong></h3>

<table>
<thead><tr><th>フォーマット</th><th>タイプ</th><th>最適な用途</th><th>圧縮</th></tr></thead>
<tbody>
<tr><td><strong>Parquet</strong></td><td>カラムナー</td><td>分析、大規模データセット、Feature Store</td><td>優秀</td></tr>
<tr><td><strong>ORC</strong></td><td>カラムナー</td><td>Hive/EMRワークロード</td><td>優秀</td></tr>
<tr><td><strong>CSV</strong></td><td>行ベース</td><td>シンプル、SageMaker訓練入力</td><td>悪い</td></tr>
<tr><td><strong>JSON</strong></td><td>半構造化</td><td>ネストデータ、API</td><td>悪い</td></tr>
<tr><td><strong>RecordIO</strong></td><td>バイナリ</td><td>SageMaker Pipe Mode訓練</td><td>良い</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> 大規模訓練の<em>パフォーマンス最適化</em>について問われた場合、正解は通常<strong>Parquet</strong>（カラムナー、圧縮）への変換とSageMakerでの<strong>Pipe Mode</strong>（File Modeの代わり）の使用です。</p>
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

<h2 id="kinesis"><strong>3. Amazon Kinesis — ストリーミング取り込み</strong></h2>

<p>Kinesisは<strong>リアルタイムデータストリーミング</strong>のサービスファミリーです。試験で重要なトピックであり、4つのサービスを明確に区別する必要があります。</p>

<table>
<thead><tr><th>サービス</th><th>機能</th><th>送信先</th><th>MLユースケース</th></tr></thead>
<tbody>
<tr><td><strong>Kinesis Data Streams (KDS)</strong></td><td>カスタムリアルタイム処理</td><td>カスタムコンシューマー</td><td>リアルタイム特徴量エンジニアリング</td></tr>
<tr><td><strong>Kinesis Data Firehose</strong></td><td>マネージド配信（コード不要）</td><td>S3、Redshift、ES、Splunk</td><td>データレイクへのバッチロード</td></tr>
<tr><td><strong>Kinesis Data Analytics</strong></td><td>ストリーム上のSQL/Flink</td><td>S3、Redshift</td><td>リアルタイム集計、異常検知</td></tr>
<tr><td><strong>Kinesis Video Streams</strong></td><td>動画取り込み</td><td>Rekognition、SageMaker</td><td>コンピュータビジョンパイプライン</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> よくある質問：「IoTセンサーが継続的にデータを送信し、カスタムコードなしでS3に保存したい」→ Kinesis <strong>Data Firehose</strong>（マネージド、コード不要）。「カスタムロジックでリアルタイム処理が必要」→ Kinesis <strong>Data Streams</strong>。</p>
</blockquote>

<h3 id="kinesis-shards"><strong>3.1. KDSシャードとキャパシティ</strong></h3>

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

<h2 id="glue"><strong>4. AWS Glue — ML向けETL</strong></h2>

<p><strong>AWS Glue</strong>はフルマネージドETLサービスです。MLパイプラインでは、訓練前のデータの<strong>変換とクリーニング</strong>に使用します。</p>

<h3 id="glue-components"><strong>4.1. Glueコンポーネント</strong></h3>

<table>
<thead><tr><th>コンポーネント</th><th>機能</th></tr></thead>
<tbody>
<tr><td><strong>Glue Data Catalog</strong></td><td>中央メタデータリポジトリ — スキーマ、テーブル、パーティション</td></tr>
<tr><td><strong>Glue Crawlers</strong></td><td>S3/RDS/Redshiftからスキーマを自動検出しData Catalogに登録</td></tr>
<tr><td><strong>Glue ETL Jobs</strong></td><td>Sparkベースの変換ジョブ（Python/Scala）</td></tr>
<tr><td><strong>Glue DataBrew</strong></td><td>ノーコードビジュアルデータ準備（250以上の組み込み変換）</td></tr>
<tr><td><strong>Glue Studio</strong></td><td>ビジュアルETLジョブビルダー（ドラッグ＆ドロップ）</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> <strong>Glue Data Catalog</strong>はAthena、EMR、Redshift Spectrumの共通メタデータストアです。「一元的なスキーマ管理」→ Glue Data Catalog。「ノーコードデータクリーニング」→ Glue DataBrew。</p>
</blockquote>

<h2 id="lake-formation"><strong>5. AWS Lake Formation</strong></h2>

<p><strong>Lake Formation</strong>はS3 + Glueの上に構築され、<strong>データレイクのセキュリティとガバナンス</strong>を管理します。主要機能：カラムレベルおよび行レベルのアクセス制御。</p>

<pre><code class="language-text">Lake Formation Architecture:

  IAM Users ──→ Lake Formation ──→ S3 Data Lake
  IAM Roles       (Security         (Raw/Processed)
                   & Governance)
                       ↓
                  Column/Row
                  Level Access
                  Control
</code></pre>

<h2 id="cheat-sheet"><strong>6. チートシート — データ取り込みサービス</strong></h2>

<table>
<thead><tr><th>シナリオ</th><th>サービス</th></tr></thead>
<tbody>
<tr><td>ストリーミング → S3（コード不要）</td><td>Kinesis Data Firehose</td></tr>
<tr><td>カスタムロジックのリアルタイム処理</td><td>Kinesis Data Streams</td></tr>
<tr><td>ストリーミングデータ上のSQL</td><td>Kinesis Data Analytics (Flink)</td></tr>
<tr><td>バッチETL（Sparkベース）</td><td>AWS Glue ETL Jobs</td></tr>
<tr><td>ノーコードビジュアルデータ準備</td><td>Glue DataBrew</td></tr>
<tr><td>S3からのスキーマ検出</td><td>Glue Crawlers + Data Catalog</td></tr>
<tr><td>S3上のSQLクエリ</td><td>Amazon Athena</td></tr>
<tr><td>データレイクガバナンス</td><td>AWS Lake Formation</td></tr>
<tr><td>大規模Spark/Hadoop</td><td>Amazon EMR</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. 練習問題</strong></h2>

<p><strong>Q1:</strong> ある企業がIoTセンサーデータをML訓練のためにAmazon S3に取り込みたいと考えています。データは継続的に到着し、カスタム処理は不要です。最もコスト効率の良いサービスはどれですか？</p>
<ul>
<li>A) Amazon Kinesis Data StreamsとLambdaコンシューマー</li>
<li>B) Amazon Kinesis Data Firehose ✓</li>
<li>C) Amazon EMRとSpark Streaming</li>
<li>D) スケジュールされたAWS Glue ETLジョブ</li>
</ul>
<p><em>解説：Kinesis Data Firehoseはフルマネージドでカスタムコードが不要です。ストリーミングデータをS3、Redshift、Elasticsearchに直接配信します。Data Streamsはカスタムコンシューマーが必要、EMRは大規模な管理が必要、GlueはバッチETL向けです。</em></p>

<p><strong>Q2:</strong> データエンジニアがS3内の生のCSVファイルをデータベースにロードせずにSQLでクエリしたいと考えています。どのサービスを使うべきですか？</p>
<ul>
<li>A) Amazon RDS</li>
<li>B) Amazon DynamoDB</li>
<li>C) Amazon Athena ✓</li>
<li>D) Amazon Redshift</li>
</ul>
<p><em>解説：Amazon Athenaはサーバーレスで、ロードなしにS3データに対して直接SQLクエリを実行できます。CSV、Parquet、ORC、JSONなどのフォーマットをサポートしています。</em></p>

<p><strong>Q3:</strong> Amazon S3に保存された大規模MLデータセットに対するカラムナー分析クエリで最高のパフォーマンスを提供するファイルフォーマットはどれですか？</p>
<ul>
<li>A) CSV</li>
<li>B) JSON</li>
<li>C) XML</li>
<li>D) Apache Parquet ✓</li>
</ul>
<p><em>解説：Parquetは優れた圧縮とプレディケートプッシュダウンをサポートするカラムナーフォーマットです。カラムナーフォーマットは必要なカラムのみを読み取るため、分析クエリのI/Oを劇的に削減します。</em></p>
