---
id: 8d704042-9cc5-478e-b198-d80ea70c22c5
title: '第4課：SageMaker組み込みアルゴリズム'
slug: bai-4-sagemaker-built-in-algorithms
description: >-
  XGBoost、Linear Learner、Random Cut Forest、K-Means、KNN。
  BlazingText、Seq2Seq、DeepAR、Object Detection、Semantic Segmentation。
  どのアルゴリズムをいつ使うか — 詳細判断テーブル。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 4
section_title: "パート2：モデリング（36%）"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認定機械学習 - 専門知識 試験対策'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai4-sagemaker-algorithms.webp" alt="SageMaker Built-in Algorithms" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>SageMaker組み込みアルゴリズム：XGBoost、Linear LearnerからDeepAR、Image Classificationまで</em></p>
</div>

<h2 id="overview"><strong>1. SageMaker組み込みアルゴリズムの概要</strong></h2>

<p>SageMakerは18以上の<strong>組み込みアルゴリズム</strong>を提供し、AWSインフラストラクチャ上で分散実行するために最適化されています。これはMLS-C01で<strong>非常に重要なトピック</strong>で、通常8〜12問出題されます。</p>

<blockquote>
<p><strong>試験のヒント：</strong> 「問題タイプ → アルゴリズム」の表を暗記してください。試験では常にシナリオが提示され、適切なアルゴリズムが問われます。主要パターン：時系列 → DeepAR、異常 → Random Cut Forest、NLP分類 → BlazingText、テーブルデータ → XGBoost。</p>
</blockquote>

<h2 id="supervised-table"><strong>2. 教師あり学習アルゴリズム</strong></h2>

<table>
<thead><tr><th>アルゴリズム</th><th>問題タイプ</th><th>入力</th><th>主な特徴</th></tr></thead>
<tbody>
<tr><td><strong>XGBoost</strong></td><td>分類、回帰</td><td>テーブルデータ（CSV/LibSVM）</td><td>テーブルデータの最高性能、勾配ブースティング</td></tr>
<tr><td><strong>Linear Learner</strong></td><td>二値/多クラス分類、回帰</td><td>RecordIO、CSV</td><td>高速、スケーラブル、正則化内蔵</td></tr>
<tr><td><strong>Factorization Machines</strong></td><td>二値分類、回帰</td><td>RecordIO-protobuf（疎データ）</td><td>疎データ、レコメンデーション、CTR予測</td></tr>
<tr><td><strong>KNN（k近傍法）</strong></td><td>分類、回帰</td><td>RecordIO-protobuf</td><td>インスタンスベース、訓練不要、遅延学習</td></tr>
<tr><td><strong>DeepAR</strong></td><td>時系列予測</td><td>JSON Lines</td><td>複数の関連時系列、確率的予測</td></tr>
<tr><td><strong>Object2Vec</strong></td><td>Embeddings</td><td>ペア入力</td><td>単語、製品、ユーザーの埋め込みを学習</td></tr>
</tbody>
</table>

<h2 id="nlp-algorithms"><strong>3. NLPアルゴリズム</strong></h2>

<table>
<thead><tr><th>アルゴリズム</th><th>出力</th><th>ユースケース</th></tr></thead>
<tbody>
<tr><td><strong>BlazingText</strong></td><td>単語ベクトルまたはテキスト分類</td><td>感情分析、スパム検出、エンティティ分類</td></tr>
<tr><td><strong>Seq2Seq</strong></td><td>系列 → 系列</td><td>機械翻訳、要約、Q&amp;A</td></tr>
<tr><td><strong>LDA（Latent Dirichlet Allocation）</strong></td><td>文書ごとのトピック</td><td>トピックモデリング、文書分類</td></tr>
<tr><td><strong>NTM（Neural Topic Model）</strong></td><td>潜在表現</td><td>ニューラルネットワークによるトピックモデリング</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> <strong>BlazingText</strong>には2つのモードがあります：(1) <code>Word2Vec</code>モード — 教師なし、単語埋め込みを生成；(2) <code>Text Classification</code>モード — 教師あり、FastTextに類似。問題を読む際に明確に区別してください。</p>
</blockquote>

<h2 id="unsupervised-algorithms"><strong>4. 教師なし学習アルゴリズム</strong></h2>

<table>
<thead><tr><th>アルゴリズム</th><th>問題タイプ</th><th>ユースケース</th></tr></thead>
<tbody>
<tr><td><strong>K-Means</strong></td><td>クラスタリング</td><td>顧客セグメンテーション、文書グルーピング</td></tr>
<tr><td><strong>PCA（主成分分析）</strong></td><td>次元削減</td><td>高次元データ、特徴量圧縮</td></tr>
<tr><td><strong>Random Cut Forest (RCF)</strong></td><td>異常検知</td><td>不正検知、IoT異常、時系列異常</td></tr>
<tr><td><strong>IP Insights</strong></td><td>異常検知</td><td>異常なIP-エンティティ関係の検出、セキュリティ</td></tr>
</tbody>
</table>

<h2 id="computer-vision"><strong>5. コンピュータビジョンアルゴリズム</strong></h2>

<table>
<thead><tr><th>アルゴリズム</th><th>タスク</th><th>出力</th></tr></thead>
<tbody>
<tr><td><strong>Image Classification</strong></td><td>多クラス分類</td><td>クラスラベル + 信頼度</td></tr>
<tr><td><strong>Object Detection</strong></td><td>オブジェクトの位置特定 + 分類</td><td>バウンディングボックス + ラベル</td></tr>
<tr><td><strong>Semantic Segmentation</strong></td><td>ピクセルレベルの分類</td><td>セグメンテーションマスク</td></tr>
</tbody>
</table>

<h2 id="algorithm-decision"><strong>6. アルゴリズム選択の決定木</strong></h2>

<pre><code class="language-text">What is the problem type?
│
├── Tabular data, classification/regression?
│   └── XGBoost (best general choice)
│
├── Sparse features, recommendation, ad CTR?
│   └── Factorization Machines
│
├── Time series forecasting (multiple related series)?
│   └── DeepAR
│
├── Anomaly detection on time series / IoT?
│   └── Random Cut Forest (RCF)
│
├── Text classification / sentiment?
│   └── BlazingText (supervised mode)
│
├── Sequence-to-sequence (translation / summarization)?
│   └── Seq2Seq
│
├── Topic modeling?
│   └── LDA or NTM
│
├── Clustering?
│   └── K-Means
│
├── Dimensionality reduction?
│   └── PCA
│
└── Image tasks?
    ├── Classification only → Image Classification
    ├── Locate objects → Object Detection
    └── Pixel mask → Semantic Segmentation
</code></pre>

<h2 id="training-modes"><strong>7. 訓練入力モード</strong></h2>

<table>
<thead><tr><th>モード</th><th>仕組み</th><th>最適な用途</th></tr></thead>
<tbody>
<tr><td><strong>File Mode</strong></td><td>開始前にデータセット全体を訓練インスタンスにダウンロード</td><td>小〜中規模データセット</td></tr>
<tr><td><strong>Pipe Mode</strong></td><td>訓練中にS3から直接データをストリーミング</td><td>超大規模データセット — ディスクボトルネックなし</td></tr>
<tr><td><strong>FastFile Mode</strong></td><td>S3をローカルファイルシステムのようにアクセス（FUSE経由）</td><td>ランダムアクセスパターン</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> 「大規模データセットの訓練時間を短縮する」と問われた場合、正解は通常<strong>Pipe Mode</strong>と<strong>RecordIOフォーマット</strong>への切り替えです。Pipe Modeはデータセット全体をダウンロードせず、S3から直接ストリーミングします。</p>
</blockquote>

<h2 id="cheat-sheet"><strong>8. チートシート — クイックリファレンス</strong></h2>

<table>
<thead><tr><th>問題のキーワード</th><th>アルゴリズム</th></tr></thead>
<tbody>
<tr><td>「テーブルデータ」「構造化データ」</td><td>XGBoost</td></tr>
<tr><td>「時系列」「予測」</td><td>DeepAR</td></tr>
<tr><td>「異常検知」</td><td>Random Cut Forest</td></tr>
<tr><td>「レコメンデーション」「疎な特徴量」</td><td>Factorization Machines</td></tr>
<tr><td>「テキスト分類」「感情分析」</td><td>BlazingText（教師ありモード）</td></tr>
<tr><td>「単語埋め込み」</td><td>BlazingText（Word2Vecモード）</td></tr>
<tr><td>「翻訳」「要約」</td><td>Seq2Seq</td></tr>
<tr><td>「トピックモデリング」</td><td>LDAまたはNTM</td></tr>
<tr><td>「クラスタリング」「セグメンテーション」</td><td>K-Means</td></tr>
<tr><td>「次元削減」</td><td>PCA</td></tr>
<tr><td>「バウンディングボックス」「物体検出」</td><td>Object Detection</td></tr>
<tr><td>「ピクセルレベル」「セグメンテーションマスク」</td><td>Semantic Segmentation</td></tr>
<tr><td>「IPアドレス異常」「不正ログイン」</td><td>IP Insights</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>9. 練習問題</strong></h2>

<p><strong>Q1:</strong> 小売企業が5,000の製品カテゴリについて今後30日間の需要を予測したいと考えています。最適なSageMakerアルゴリズムはどれですか？</p>
<ul>
<li>A) K-Means</li>
<li>B) Linear Learner</li>
<li>C) DeepAR ✓</li>
<li>D) Seq2Seq</li>
</ul>
<p><em>解説：DeepARは複数の関連時系列にわたる時系列予測に特化して設計されています。5,000の全系列からグローバルパターンを同時に学習し、確率的予測を提供します。</em></p>

<p><strong>Q2:</strong> IoTシステムがサーバーのCPU使用率を監視しています。チームは異常なスパイクを自動検出したいと考えています。どのSageMaker組み込みアルゴリズムを使用すべきですか？</p>
<ul>
<li>A) XGBoost</li>
<li>B) Random Cut Forest ✓</li>
<li>C) BlazingText</li>
<li>D) PCA</li>
</ul>
<p><em>解説：Random Cut Forest（RCF）はSageMakerの組み込み異常検知アルゴリズムです。各データポイントに異常スコアを割り当て、CPU使用率のスパイクなどの時系列異常検知に適しています。</em></p>

<p><strong>Q3:</strong> データサイエンティストが500GBのデータセットでモデルを訓練しています。訓練インスタンスへのデータダウンロードに時間がかかりすぎて訓練が非常に遅いです。パフォーマンスを最も改善する変更はどれですか？</p>
<ul>
<li>A) CSVからJSONフォーマットに切り替え</li>
<li>B) 訓練インスタンスのサイズを増加</li>
<li>C) Pipe ModeとRecordIO-protobufフォーマットに切り替え ✓</li>
<li>D) 訓練エポック数を増加</li>
</ul>
<p><em>解説：Pipe Modeは訓練中にS3からデータを直接ストリーミングし、事前ダウンロードなしで大規模データセットのI/Oボトルネックを排除します。RecordIO-protobufフォーマットと組み合わせることで、起動時間が劇的に短縮されます。</em></p>
