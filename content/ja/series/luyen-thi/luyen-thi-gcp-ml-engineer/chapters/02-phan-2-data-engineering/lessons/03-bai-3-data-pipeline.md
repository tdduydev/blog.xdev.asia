---
id: 019c9619-lt03-l03
title: '第3課：データパイプライン — Dataflow、Pub/Sub、Dataproc'
slug: bai-3-data-pipeline
description: >-
  Dataflow上のApache Beamによるバッチ/ストリーミングETL。
  Pub/Subによるイベント駆動パイプライン。DataprocによるSpark。
  Cloud Composer（Airflow）によるオーケストレーション。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 3
section_title: "領域2：データエンジニアリングと特徴量エンジニアリング"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer 試験対策'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai3-data-pipeline.webp" alt="GCP Data Pipeline Architecture" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>GCPデータパイプライン：Pub/Sub、Dataflow、Dataproc、Cloud ComposerとML向けデータフロー</em></p>
</div>

<h2 id="gcp-data-pipeline"><strong>1. GCPデータパイプラインサービス</strong></h2>

<table>
<thead><tr><th>サービス</th><th>タイプ</th><th>使用場面</th></tr></thead>
<tbody>
<tr><td><strong>Pub/Sub</strong></td><td>マネージドメッセージキュー</td><td>イベントストリーミング、プロデューサー/コンシューマーの分離</td></tr>
<tr><td><strong>Dataflow</strong></td><td>マネージドApache Beamランナー</td><td>統合バッチ + ストリーミングETL</td></tr>
<tr><td><strong>Dataproc</strong></td><td>マネージドSpark / Hadoop</td><td>既存のSpark/Hadoopワークロード、大規模ML</td></tr>
<tr><td><strong>Cloud Composer</strong></td><td>マネージドApache Airflow</td><td>マルチステップMLワークフローのオーケストレーション</td></tr>
<tr><td><strong>Cloud Storage</strong></td><td>オブジェクトストア</td><td>生データのランディングゾーン、モデルアーティファクト</td></tr>
<tr><td><strong>BigQuery</strong></td><td>データウェアハウス</td><td>構造化分析、BigQuery ML</td></tr>
</tbody>
</table>

<h2 id="pubsub"><strong>2. Pub/Sub — イベントストリーミング</strong></h2>

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
<thead><tr><th>機能</th><th>詳細</th></tr></thead>
<tbody>
<tr><td><strong>メッセージ保持期間</strong></td><td>デフォルト7日（設定可能）</td></tr>
<tr><td><strong>At-least-once配信</strong></td><td>冪等なサブスクライバーが必要</td></tr>
<tr><td><strong>Exactly-once</strong></td><td>Pub/Sub Liteで利用可能（同一リージョン）</td></tr>
<tr><td><strong>順序付け</strong></td><td>オーダリングキーでメッセージの順序付けを有効化</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> Pub/Sub → Dataflow → BigQueryは試験で非常に頻出するパイプラインパターンです。Pub/Subで取り込み、Dataflowで変換、BigQueryで保存・分析。</p>
</blockquote>

<h2 id="dataflow"><strong>3. Cloud Dataflow — Apache Beam</strong></h2>

<p>Dataflowは<strong>Apache Beam</strong>のマネージドランナーです。統合バッチ・ストリーミング処理のフレームワークで、サーバー管理は不要です。</p>

<table>
<thead><tr><th>概念</th><th>説明</th></tr></thead>
<tbody>
<tr><td><strong>Pipeline</strong></td><td>一連の変換操作</td></tr>
<tr><td><strong>PCollection</strong></td><td>分散データコレクション（有界または無界）</td></tr>
<tr><td><strong>Transform</strong></td><td>ParDo、GroupByKey、Combine、Flatten、Partition</td></tr>
<tr><td><strong>Windowing</strong></td><td>ストリーミング用のFixed、Sliding、Sessionウィンドウ</td></tr>
<tr><td><strong>Watermarks</strong></td><td>ストリーミングでの遅延データの処理</td></tr>
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

<h2 id="dataproc"><strong>4. Cloud Dataproc — マネージドSpark/Hadoop</strong></h2>

<table>
<thead><tr><th>Dataprocの機能</th><th>詳細</th></tr></thead>
<tbody>
<tr><td><strong>クラスタライフサイクル</strong></td><td>90秒で作成、ジョブ後に削除 — コスト効率的</td></tr>
<tr><td><strong>エフェメラルクラスタ</strong></td><td>起動 → ジョブ実行 → シャットダウン（ジョブごとの課金）</td></tr>
<tr><td><strong>プリエンプティブルVM</strong></td><td>ワーカーノードに使用してコストを60-80%削減</td></tr>
<tr><td><strong>コンポーネントゲートウェイ</strong></td><td>ブラウザからJupyter、Zeppelin、Spark UIにアクセス</td></tr>
<tr><td><strong>MLライブラリ</strong></td><td>Spark MLlib、TensorFlow on Spark（TFoS）</td></tr>
</tbody>
</table>

<h2 id="composer"><strong>5. Cloud Composer — ワークフローオーケストレーション</strong></h2>

<p>Cloud ComposerはマネージドApache Airflowです。データ取り込み、前処理、トレーニング、デプロイメントを含むマルチステップMLパイプラインのオーケストレーションに使用します。</p>

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

<h2 id="decision-guide"><strong>6. データパイプラインサービスの選択</strong></h2>

<table>
<thead><tr><th>シナリオ</th><th>推奨サービス</th></tr></thead>
<tbody>
<tr><td>リアルタイムイベントストリーミングの取り込み</td><td>Pub/Sub</td></tr>
<tr><td>統合バッチ + ストリーミングETL（インフラ管理不要）</td><td>Dataflow（Apache Beam）</td></tr>
<tr><td>既存のSparkジョブをGCPに移行</td><td>Dataproc</td></tr>
<tr><td>複雑なML DAGオーケストレーション</td><td>Cloud Composer</td></tr>
<tr><td>データをBigQueryにストリーミング</td><td>Pub/Sub → Dataflow → BigQuery</td></tr>
<tr><td>サーバーレスデータ処理（SQL）</td><td>BigQuery（SQLによるETL）</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. 練習問題</strong></h2>

<p><strong>Q1：</strong> ある企業が工場の設備から毎秒数百万のIoTセンサーイベントを受信しています。これらのイベントをリアルタイムで処理し、異常を検知し、結果をBigQueryに保存する必要があります。最も適切なパイプラインアーキテクチャはどれでしょうか？</p>
<ul>
<li>A) Dataproc → Spark Streaming → BigQuery</li>
<li>B) Pub/Sub → Dataflow → BigQuery ✓</li>
<li>C) Cloud Functions → Cloud SQL</li>
<li>D) Cloud Storageへのバッチアップロード → BigQueryインポート</li>
</ul>
<p><em>解説：Pub/Subは大量のストリーミングイベントを確実に取り込みます。Dataflowは Apache Beamを使用してストリームをリアルタイムで処理します（ウィンドウ処理、変換、異常検知）。BigQueryは分析用に結果を保存します。これはGCPの標準的なストリーミング分析パターンです。</em></p>

<p><strong>Q2：</strong> データエンジニアリングチームが、MLモデルのトレーニングデータを処理する既存のApache Sparkジョブを持っています。最小限のコード変更でGCPに移行したいと考えています。どのサービスを使用すべきでしょうか？</p>
<ul>
<li>A) Cloud Dataflow</li>
<li>B) Cloud Dataproc ✓</li>
<li>C) BigQuery ETL</li>
<li>D) Cloud Composer</li>
</ul>
<p><em>解説：Cloud DataprocはApache Sparkをネイティブにサポートしており、既存のSparkジョブを最小限の変更でGCP上で実行できます。DataflowはApache Beam（異なるプログラミングモデル）を使用します。DataprocはSparkワークロードのリフト＆シフトオプションです。</em></p>

<p><strong>Q3：</strong> チームが、BigQueryからのデータ抽出、前処理、Vertex AIトレーニング、精度が90%を超えた場合のデプロイメントを含む日次MLパイプラインをオーケストレーションする必要があります。このワークフローオーケストレーションを処理するサービスはどれでしょうか？</p>
<ul>
<li>A) Vertex AI Pipelines</li>
<li>B) Cloud Dataflow</li>
<li>C) Cloud Composer ✓</li>
<li>D) Pub/Subトリガー</li>
</ul>
<p><em>解説：Cloud Composer（マネージドApache Airflow）は、複数のサービスにまたがる複雑なDAGオーケストレーション向けに設計されています。スケジューリング、条件分岐（精度が90%を超えた場合のみデプロイ）、リトライロジック、BigQuery、Dataflow、Vertex AIなどの異種サービス間のモニタリングを処理します。</em></p>
