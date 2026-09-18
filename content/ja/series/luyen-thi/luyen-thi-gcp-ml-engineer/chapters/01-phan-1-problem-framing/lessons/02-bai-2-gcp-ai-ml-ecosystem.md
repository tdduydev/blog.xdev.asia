---
id: 019c9619-lt03-l02
title: '第2課：GCP AI/MLエコシステムの概要'
slug: bai-2-gcp-ai-ml-ecosystem
description: >-
  Vertex AIプラットフォームの概要。AutoML vs カスタムトレーニング。
  BigQuery ML。事前学習済みAPI（Vision、NLP、Translation）。
  どのサービスをいつ使うか — デシジョンツリー。
duration_minutes: 50
is_free: true
video_url: null
sort_order: 2
section_title: "領域1：ML問題のフレーミングとアーキテクチャ"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer 試験対策'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai2-gcp-ecosystem.webp" alt="GCP AI/ML Ecosystem" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>GCP AI/MLエコシステム：Vertex AI、AutoML、BigQuery ML、事前学習済みAPIとその使い分け</em></p>
</div>

<h2 id="gcp-ml-landscape"><strong>1. GCP MLの全体像</strong></h2>

<pre><code class="language-text">GCP ML Capability Spectrum:

LOW CODE ◄────────────────────────────────────► HIGH CONTROL
  │                        │                           │
  ▼                        ▼                           ▼
Pre-trained APIs      Vertex AI AutoML        Custom Training
(Vision, NLP,         (no code needed,        (full control,
Translation)          you bring data)         you bring code)
  │                        │                           │
No ML expertise       Some domain              ML expertise
needed                expertise               required

BigQuery ML ────── SQL interface for ML on warehouse data
</code></pre>

<h2 id="vertex-ai"><strong>2. Vertex AI — 統合MLプラットフォーム</strong></h2>

<p>Vertex AIはGCPのMLライフサイクル全体を統合するプラットフォームです。各コンポーネントを理解することは試験で必須です。</p>

<table>
<thead><tr><th>コンポーネント</th><th>目的</th></tr></thead>
<tbody>
<tr><td><strong>Vertex AI Workbench</strong></td><td>データサイエンティスト向けのマネージドJupyterノートブック</td></tr>
<tr><td><strong>Vertex AI Training</strong></td><td>カスタムトレーニングジョブ（CPU、GPU、TPU）</td></tr>
<tr><td><strong>Vertex AI AutoML</strong></td><td>ノーコードモデルトレーニング（Tabular、Image、Text、Video）</td></tr>
<tr><td><strong>Vertex AI Endpoints</strong></td><td>オンライン予測用のモデルデプロイ</td></tr>
<tr><td><strong>Vertex AI Batch Prediction</strong></td><td>非同期バッチスコアリング</td></tr>
<tr><td><strong>Vertex AI Feature Store</strong></td><td>学習/推論間で一貫した特徴量の提供</td></tr>
<tr><td><strong>Vertex AI Pipelines</strong></td><td>Kubeflow PipelinesベースのMLワークフローオーケストレーション</td></tr>
<tr><td><strong>Vertex AI Experiments</strong></td><td>実行の追跡、メトリクスの比較</td></tr>
<tr><td><strong>Vertex AI Model Registry</strong></td><td>モデルのバージョン管理</td></tr>
<tr><td><strong>Vertex AI Model Monitoring</strong></td><td>特徴量スキューと予測ドリフトの検出</td></tr>
</tbody>
</table>

<h2 id="automl-vs-custom"><strong>3. AutoML vs. カスタムトレーニング</strong></h2>

<table>
<thead><tr><th>基準</th><th>AutoML</th><th>カスタムトレーニング</th></tr></thead>
<tbody>
<tr><td>必要なML専門知識</td><td>最小限</td><td>必要</td></tr>
<tr><td>トレーニング時間</td><td>数時間（自動化）</td><td>可変（制御可能）</td></tr>
<tr><td>モデルの解釈可能性</td><td>限定的</td><td>完全制御</td></tr>
<tr><td>コスト</td><td>モデルあたり高額</td><td>使用した計算リソース分のみ</td></tr>
<tr><td>最適な用途</td><td>迅速なプロトタイプ、標準的なタスク</td><td>カスタムアーキテクチャ、研究</td></tr>
<tr><td>対応データ型</td><td>Tabular、Image、Text、Video</td><td>任意（コードを記述）</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> 「チームにML専門知識がない」や「最短でデプロイ」→ AutoML。「カスタムニューラルアーキテクチャ」や「トレーニングループの完全制御」→ カスタムトレーニング。</p>
</blockquote>

<h2 id="bigquery-ml"><strong>4. BigQuery ML</strong></h2>

<p>BigQuery MLはSQLでMLモデルのトレーニングとサービングを可能にします — BigQueryからデータをエクスポートする必要はありません。</p>

<table>
<thead><tr><th>モデルタイプ</th><th>SQLキーワード</th><th>ユースケース</th></tr></thead>
<tbody>
<tr><td>線形回帰</td><td>LINEAR_REG</td><td>価格予測</td></tr>
<tr><td>ロジスティック回帰</td><td>LOGISTIC_REG</td><td>分類</td></tr>
<tr><td>K-Meansクラスタリング</td><td>KMEANS</td><td>顧客セグメンテーション</td></tr>
<tr><td>XGBoost</td><td>BOOSTED_TREE_CLASSIFIER/REGRESSOR</td><td>テーブルデータの分類/回帰</td></tr>
<tr><td>ディープニューラルネットワーク</td><td>DNN_CLASSIFIER/DNN_REGRESSOR</td><td>複雑なパターン</td></tr>
<tr><td>行列分解</td><td>MATRIX_FACTORIZATION</td><td>レコメンデーション</td></tr>
<tr><td>インポートしたTFモデル</td><td>TENSORFLOW</td><td>カスタムTFモデル</td></tr>
</tbody>
</table>

<h2 id="pre-trained-apis"><strong>5. 事前学習済みAI API</strong></h2>

<table>
<thead><tr><th>API</th><th>機能</th><th>ユースケース</th></tr></thead>
<tbody>
<tr><td><strong>Cloud Vision API</strong></td><td>ラベル、OCR、顔検出、ロゴ、セーフサーチ</td><td>トレーニング不要の画像分析</td></tr>
<tr><td><strong>Cloud Natural Language API</strong></td><td>エンティティ、感情分析、構文解析、カテゴリ</td><td>テキスト分析</td></tr>
<tr><td><strong>Cloud Translation API</strong></td><td>100以上の言語ペア</td><td>多言語コンテンツ</td></tr>
<tr><td><strong>Cloud Speech-to-Text</strong></td><td>文字起こし、話者分離</td><td>音声処理</td></tr>
<tr><td><strong>Cloud Text-to-Speech</strong></td><td>WaveNet音声、SSML</td><td>音声UI、アクセシビリティ</td></tr>
<tr><td><strong>Document AI</strong></td><td>フォーム解析、請求書抽出</td><td>ドキュメント自動化</td></tr>
<tr><td><strong>Recommendations AI</strong></td><td>リアルタイム商品レコメンデーション</td><td>ECパーソナライゼーション</td></tr>
</tbody>
</table>

<h2 id="decision-tree"><strong>6. サービス選択デシジョンツリー</strong></h2>

<pre><code class="language-text">WHICH GCP ML SERVICE?

Do you have LABELED DATA?
│
├── NO → Pre-trained API sufficient for your task (Vision, NLP)?
│         YES → Use Pre-trained API
│         NO  → Vertex AI Custom Training (unsupervised)
│
└── YES → Is your data already IN BigQuery?
          │
          ├── YES → BigQuery ML (SQL-based, fast, no export)
          │
          └── NO → Need rapid prototyping, no ML team?
                    │
                    ├── YES → Vertex AI AutoML
                    │
                    └── NO  → Vertex AI Custom Training
</code></pre>

<h2 id="practice"><strong>7. 練習問題</strong></h2>

<p><strong>Q1：</strong> データ分析チームはBigQueryにペタバイト規模の顧客取引データを持っています。既存のSQLスキルを活用し、データをエクスポートせずに解約予測モデルを構築したいと考えています。最適なアプローチはどれでしょうか？</p>
<ul>
<li>A) Cloud Storageにエクスポートしてから、Vertex AIカスタムトレーニングを使用する</li>
<li>B) Cloud Natural Language APIを使用する</li>
<li>C) BigQuery MLでCREATE MODEL LOGISTIC_REGRESSIONを使用する ✓</li>
<li>D) Vertex AI AutoML Tabularを使用する</li>
</ul>
<p><em>解説：BigQuery MLは、既存のデータインフラとスキルを活用して、SQLで直接BigQueryデータ上で分類モデルをトレーニングできます。データがすでにBigQueryにある場合、これが最速のパスです。</em></p>

<p><strong>Q2：</strong> 小規模なスタートアップが顧客レビューに感情分析を追加したいと考えています。MLチームはなく、ラベル付き感情データもありません。最も少ない労力で実現できるソリューションはどれでしょうか？</p>
<ul>
<li>A) Vertex AI AutoML Text Sentiment</li>
<li>B) Vertex AI上でカスタムBERTモデルをトレーニングする</li>
<li>C) Cloud Natural Language APIの感情分析 ✓</li>
<li>D) BigQuery ML DNNクラシファイア</li>
</ul>
<p><em>解説：Cloud Natural Language APIは、トレーニングデータ、ML専門知識、インフラのセットアップが不要な、事前学習済みのフルマネージドサービスです。APIを呼び出すだけです。AutoMLにはラベル付き感情データが必要で、カスタムBERTにはかなりの専門知識が必要です。</em></p>

<p><strong>Q3：</strong> モデルのトレーニング時に使用された特徴量の値が予測時にも同一であることを保証するために、チームが使用すべきVertex AIコンポーネントはどれでしょうか？</p>
<ul>
<li>A) Vertex AI Experiments</li>
<li>B) Vertex AI Feature Store ✓</li>
<li>C) Vertex AI Model Registry</li>
<li>D) Vertex AI Pipelines</li>
</ul>
<p><em>解説：Vertex AI Feature Storeは、ML特徴量の保存、提供、共有のための集中型リポジトリを提供します。トレーニングとオンライン/バッチ予測の両方で同じ特徴量定義と値を使用することで、学習-推論の一貫性を確保し、学習-推論スキューを防止します。</em></p>
