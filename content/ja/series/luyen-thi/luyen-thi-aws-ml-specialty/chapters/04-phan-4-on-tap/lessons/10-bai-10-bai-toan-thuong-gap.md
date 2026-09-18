---
id: f7a8daa0-e49a-4fac-b232-d6a8b998e120
title: '第10課：よくあるML問題パターン'
slug: bai-10-bai-toan-thuong-gap
description: >-
  不正検知、レコメンデーションシステム、NLPパイプライン、時系列予測、
  コンピュータビジョン — 問題パターンの認識と適切なAWSサービス/アルゴリズムの選択。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 10
section_title: "パート4：総合復習"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認定機械学習 - 専門知識 試験対策'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai10-ml-patterns.webp" alt="AWS ML Problem Patterns" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>ML問題パターン：不正検知、レコメンデーション、NLP、時系列、AWSでのコンピュータビジョン</em></p>
</div>

<h2 id="pattern-matching"><strong>1. 問題パターンの迅速な認識</strong></h2>

<p>MLS-C01の大半の問題は<strong>シナリオベース</strong>です：ビジネス問題の説明を読み、最も適切なAWSサービスまたはアルゴリズムを選択します。このレッスンでは迅速な認識のためのフレームワークを提供します。</p>

<pre><code class="language-text">ML Problem Recognition Framework:

READ SCENARIO
    ↓
Is output a CATEGORY?          → Classification
Is output a NUMBER?            → Regression
Is output a CLUSTER/GROUP?     → Clustering (no labels)
Is output a RANK/SCORE?        → Recommendation / Ranking
Is output a DETECTION (anomaly)? → Anomaly Detection
Is output a SEQUENCE?          → Time Series / Seq2Seq
</code></pre>

<h2 id="fraud-detection"><strong>2. 不正検知</strong></h2>

<p>不正検知は試験の典型的な問題です。主要な課題：<strong>極端なクラス不均衡</strong>（99.9%のトランザクションが正常）。</p>

<table>
<thead><tr><th>課題</th><th>解決策</th></tr></thead>
<tbody>
<tr><td>クラス不均衡</td><td>SMOTE、class_weight、<strong>precision-recall</strong>（accuracyではない）</td></tr>
<tr><td>リアルタイムスコアリング</td><td>SageMakerリアルタイムエンドポイント</td></tr>
<tr><td>教師なし不正検知（ラベルなし）</td><td><strong>Random Cut Forest</strong>（異常検知）</td></tr>
<tr><td>グラフベースの不正リング</td><td><strong>Amazon Neptune</strong> + GNN（GraphSAGE）</td></tr>
<tr><td>教師あり（ラベル付き履歴あり）</td><td><strong>XGBoost</strong>またはLinear Learner</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> 問題に「ラベルなし」「異常行動の検出」とある場合 → <strong>Random Cut Forest</strong>。ラベル付きの不正取引履歴がある場合 → 分類（XGBoost）。</p>
</blockquote>

<h2 id="recommendation"><strong>3. レコメンデーションシステム</strong></h2>

<table>
<thead><tr><th>タイプ</th><th>アルゴリズム</th><th>AWSサービス</th></tr></thead>
<tbody>
<tr><td>協調フィルタリング</td><td>Factorization Machines、Neural CF</td><td>SageMaker FM、<strong>Amazon Personalize</strong></td></tr>
<tr><td>コンテンツベース</td><td>TF-IDF、Embeddings</td><td>SageMaker KNN</td></tr>
<tr><td>ハイブリッド</td><td>FM + コンテンツ特徴量</td><td>Amazon Personalize（HRNN）</td></tr>
<tr><td>コールドスタート問題</td><td>コンテンツ特徴量、メタデータ</td><td>Personalizeコンテキストメタデータ</td></tr>
</tbody>
</table>

<p>試験では頻繁に問われます：<em>「eコマース向けリアルタイムパーソナライズドレコメンデーション」</em> → 回答はほぼ常に<strong>Amazon Personalize</strong>（マネージドサービス）です。</p>

<h2 id="nlp"><strong>4. NLPパイプライン</strong></h2>

<pre><code class="language-text">NLP Task Decision Tree:

Classify documents?
    → Text Classification → BlazingText (word2vec mode), Comprehend Custom

Extract entities from text?
    → Named Entity Recognition → Amazon Comprehend (NER)

Translate text?
    → Amazon Translate

Summarize documents?
    → Hugging Face on SageMaker (T5, BART)

Q&A / Generation?
    → SageMaker JumpStart foundation models (Llama, Falcon)

Toxic content detection?
    → Amazon Comprehend (Sentiment + custom classifier)
</code></pre>

<table>
<thead><tr><th>NLPタスク</th><th>アルゴリズム/サービス</th></tr></thead>
<tbody>
<tr><td>文書分類</td><td>BlazingText、Comprehend Custom</td></tr>
<tr><td>トピックモデリング</td><td><strong>Latent Dirichlet Allocation（LDA）</strong>、NTM</td></tr>
<tr><td>感情分析</td><td>Amazon Comprehend</td></tr>
<tr><td>言語検出</td><td>Amazon Comprehend</td></tr>
<tr><td>機械翻訳</td><td>Amazon Translate</td></tr>
<tr><td>会話AI</td><td>Amazon Lex（チャットボット） + Lambda</td></tr>
</tbody>
</table>

<h2 id="time-series"><strong>5. 時系列予測</strong></h2>

<table>
<thead><tr><th>サービス/アルゴリズム</th><th>ユースケース</th></tr></thead>
<tbody>
<tr><td><strong>DeepAR+</strong>（SageMaker組み込み）</td><td>複数の関連時系列、コールドスタート</td></tr>
<tr><td><strong>Amazon Forecast</strong></td><td>フルマネージド、ビジネス予測（需要、在庫）</td></tr>
<tr><td><strong>ARIMA</strong></td><td>単一の定常系列、古典的アプローチ</td></tr>
<tr><td><strong>Prophet</strong></td><td>季節性 + 祝日、Facebookのライブラリ</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> 「数千の製品の小売需要を予測」→ <strong>DeepAR+</strong>（複数の関連時系列）または<strong>Amazon Forecast</strong>（マネージド）。主な差別化要因：DeepAR+はすべてのアイテムに対して1つのモデルを訓練しますが、古典的手法は系列ごとに1つのモデルが必要です。</p>
</blockquote>

<h2 id="computer-vision"><strong>6. コンピュータビジョン</strong></h2>

<table>
<thead><tr><th>CVタスク</th><th>アルゴリズム</th><th>サービス</th></tr></thead>
<tbody>
<tr><td>画像分類</td><td><strong>Image Classification（ResNet）</strong></td><td>SageMaker組み込み</td></tr>
<tr><td>物体検出</td><td><strong>Object Detection（SSD/YOLO）</strong></td><td>SageMaker組み込み</td></tr>
<tr><td>セマンティックセグメンテーション</td><td><strong>Semantic Segmentation</strong></td><td>SageMaker組み込み</td></tr>
<tr><td>Rekognition（ML不要）</td><td>顔、物体、テキスト、モデレーション</td><td><strong>Amazon Rekognition</strong></td></tr>
<tr><td>画像のカスタムラベル</td><td>ファインチューニング</td><td>Rekognition Custom Labels</td></tr>
</tbody>
</table>

<h2 id="mapping-table"><strong>7. ビジネスドメイン → AWSサービスマッピング</strong></h2>

<table>
<thead><tr><th>業界/シナリオ</th><th>AWSサービス</th></tr></thead>
<tbody>
<tr><td>eコマースパーソナライゼーション</td><td>Amazon Personalize</td></tr>
<tr><td>コールセンター分析</td><td>Amazon Transcribe + Comprehend</td></tr>
<tr><td>医療画像分析</td><td>Amazon HealthLake + SageMaker（カスタムモデル）</td></tr>
<tr><td>文書理解（請求書、フォーム）</td><td><strong>Amazon Textract</strong></td></tr>
<tr><td>製品検索（セマンティック）</td><td>Amazon OpenSearch + KNN</td></tr>
<tr><td>IoT異常検知</td><td><strong>Amazon Lookout for Equipment</strong></td></tr>
<tr><td>製造欠陥検出</td><td><strong>Amazon Lookout for Vision</strong></td></tr>
<tr><td>財務予測（マネージド）</td><td>Amazon Forecast</td></tr>
<tr><td>離反予測</td><td>XGBoost（SageMaker）</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>8. 練習問題</strong></h2>

<p><strong>Q1:</strong> ある小売企業が祝日の季節性とプロモーションイベントを考慮して、10,000の個別製品の来四半期の売上を予測したいと考えています。最も適切なソリューションはどれですか？</p>
<ul>
<li>A) 10,000の製品それぞれに個別のARIMAモデルを訓練</li>
<li>B) 関連時系列データを含むAmazon Forecastを使用 ✓</li>
<li>C) トレンド分析にAmazon Comprehendを使用</li>
<li>D) 製品画像の分析にAmazon Rekognitionを使用</li>
</ul>
<p><em>解説：Amazon Forecastは大規模なビジネス需要予測向けに設計されており、数千の関連時系列を同時に処理でき、祝日やプロモーションなどの外部要因をサポートします。10,000の個別ARIMAモデルの訓練は非現実的で、系列間のパターンを見逃します。</em></p>

<p><strong>Q2:</strong> ある銀行がラベル付きの過去の不正データなしにリアルタイムで不正取引を検出する必要があります。どのアルゴリズムを使用すべきですか？</p>
<ul>
<li>A) XGBoost分類器</li>
<li>B) 二値分類のLinear Learner</li>
<li>C) Random Cut Forest ✓</li>
<li>D) BlazingText</li>
</ul>
<p><em>解説：ラベル付き不正データがない場合、これは教師なし異常検知問題です。Random Cut Forestはラベル付き例を必要とせずに異常（通常パターンから逸脱した取引）を検出します。XGBoostとLinear Learnerは教師ありであり、ラベル付き訓練データが必要です。</em></p>

<p><strong>Q3:</strong> ある企業がスキャンされた保険請求書フォーム（PDF）からキーバリューペアを抽出したいと考えています。カスタムML訓練は行われていません。どのAWSサービスを使用すべきですか？</p>
<ul>
<li>A) Amazon Comprehend</li>
<li>B) Amazon Textract ✓</li>
<li>C) SageMaker Object Detection</li>
<li>D) Amazon Rekognition</li>
</ul>
<p><em>解説：Amazon Textractは、PDFを含むスキャンされた文書からテキスト、フォーム（キーバリューペア）、テーブルを抽出するために特別に構築されています。ML訓練は不要です。Comprehendはテキストの意味を分析し、Rekognitionは画像を分析しますが、どちらもTextractのような構造化フォーム抽出を処理しません。</em></p>
