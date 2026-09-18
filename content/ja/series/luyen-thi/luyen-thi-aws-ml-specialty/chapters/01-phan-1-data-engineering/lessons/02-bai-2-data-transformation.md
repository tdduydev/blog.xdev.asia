---
id: 621b7555-2901-469d-8b0b-a800506c8212
title: '第2課：データ変換と特徴量エンジニアリング'
slug: bai-2-data-transformation
description: >-
  SageMaker Processing Jobsによるデータ準備。SageMaker Feature Store。
  欠損値処理、エンコーディング、正規化、スケーリング。
  テキスト前処理、不均衡データのテクニック。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 2
section_title: "パート1：データエンジニアリング（20%）"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認定機械学習 - 専門知識 試験対策'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai2-feature-engineering.webp" alt="AWS ML Data Transformation Pipeline" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>特徴量エンジニアリングとデータ変換：Glue、SageMaker Data Wrangler、欠損値処理</em></p>
</div>

<h2 id="overview"><strong>1. MLパイプラインにおけるデータ変換</strong></h2>

<p>モデル訓練の前に、生データは多くの変換ステップを経る必要があります。有名な格言「Garbage in, garbage out」の所以です。MLS-C01試験ではデータ処理技術と適切なツールについて頻繁に出題されます。</p>

<h2 id="processing-jobs"><strong>2. SageMaker Processing Jobs</strong></h2>

<p><strong>SageMaker Processing Jobs</strong>は、エフェメラルなコンピュートクラスター上でデータ処理スクリプト（Python、Spark）を実行するマネージドサービスです。</p>

<table>
<thead><tr><th>プロセッサータイプ</th><th>フレームワーク</th><th>ユースケース</th></tr></thead>
<tbody>
<tr><td><strong>ScriptProcessor</strong></td><td>カスタムDockerコンテナ</td><td>任意のカスタムスクリプト</td></tr>
<tr><td><strong>SKLearnProcessor</strong></td><td>scikit-learn</td><td>従来のML前処理</td></tr>
<tr><td><strong>PySparkProcessor</strong></td><td>Apache Spark</td><td>大規模分散処理</td></tr>
<tr><td><strong>FrameworkProcessor</strong></td><td>TensorFlow/PyTorch</td><td>ディープラーニングデータ準備</td></tr>
</tbody>
</table>

<pre><code class="language-text">SageMaker Processing Job Flow:

S3 (input data)
      ↓
┌─────────────────────┐
│  Processing Job     │
│  (compute cluster)  │
│                     │
│  - Preprocess data  │
│  - Feature engineer │
│  - Split train/test │
└─────────────────────┘
      ↓
S3 (output: train/, validation/, test/)
</code></pre>

<h2 id="missing-values"><strong>3. 欠損値の処理</strong></h2>

<table>
<thead><tr><th>戦略</th><th>方法</th><th>使用場面</th></tr></thead>
<tbody>
<tr><td><strong>削除</strong></td><td>行/列の削除</td><td>MCAR、欠損が少ない（&lt;5%）</td></tr>
<tr><td><strong>平均/中央値補完</strong></td><td>平均値で補完</td><td>数値、MCAR/MAR</td></tr>
<tr><td><strong>最頻値補完</strong></td><td>最も頻繁な値で補完</td><td>カテゴリカル</td></tr>
<tr><td><strong>KNN補完</strong></td><td>最近傍K個を使用</td><td>データにパターンがあり、大きすぎない場合</td></tr>
<tr><td><strong>モデルベース（MICE）</strong></td><td>多重代入法</td><td>複雑な欠損パターン</td></tr>
<tr><td><strong>インジケーター特徴量</strong></td><td>is_missing列を追加</td><td>欠損自体に情報がある場合</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> 欠損データの3タイプ：<strong>MCAR</strong>（完全にランダムな欠損）— 削除が安全；<strong>MAR</strong>（ランダムな欠損）— 補完が適切；<strong>MNAR</strong>（非ランダムな欠損）— インジケーター特徴量またはドメイン知識が必要。</p>
</blockquote>

<h2 id="encoding"><strong>4. カテゴリカルエンコーディング</strong></h2>

<table>
<thead><tr><th>エンコーディング</th><th>方法</th><th>使用場面</th><th>問題点</th></tr></thead>
<tbody>
<tr><td><strong>One-Hot Encoding</strong></td><td>カテゴリごとにバイナリ列</td><td>名義尺度（順序なし）、カテゴリ数が少ない</td><td>高カーディナリティ → 次元の呪い</td></tr>
<tr><td><strong>Label Encoding</strong></td><td>0, 1, 2, 3...</td><td>順序尺度（順序あり）</td><td>名義尺度に偽の順序を暗示</td></tr>
<tr><td><strong>Target Encoding</strong></td><td>カテゴリごとのターゲット平均</td><td>高カーディナリティの名義尺度</td><td>注意しないとデータリーケージのリスク</td></tr>
<tr><td><strong>Embeddings</strong></td><td>密なベクトル表現</td><td>テキスト、高カーディナリティ</td><td>学習に十分なデータが必要</td></tr>
</tbody>
</table>

<h2 id="scaling"><strong>5. 正規化とスケーリング</strong></h2>

<table>
<thead><tr><th>テクニック</th><th>式</th><th>出力範囲</th><th>最適な用途</th></tr></thead>
<tbody>
<tr><td><strong>Min-Max正規化</strong></td><td>(x - min) / (max - min)</td><td>[0, 1]</td><td>ニューラルネットワーク、距離ベース</td></tr>
<tr><td><strong>標準化（Z-score）</strong></td><td>(x - mean) / std</td><td>Mean=0, SD=1</td><td>線形モデル、SVM、PCA</td></tr>
<tr><td><strong>Robust Scaler</strong></td><td>(x - median) / IQR</td><td>中心化</td><td>外れ値がある場合</td></tr>
<tr><td><strong>対数変換</strong></td><td>log(x)</td><td>圧縮</td><td>歪んだ分布</td></tr>
</tbody>
</table>

<h2 id="imbalanced"><strong>6. 不均衡データの処理</strong></h2>

<p>クラス不均衡（例：不正検知で99%が正常、1%が不正）はモデルを多数クラスに偏らせます。</p>

<table>
<thead><tr><th>テクニック</th><th>方法</th><th>方向</th></tr></thead>
<tbody>
<tr><td><strong>オーバーサンプリング</strong></td><td>少数クラスのサンプルを複製</td><td>↑ 少数クラス</td></tr>
<tr><td><strong>SMOTE</strong></td><td>合成少数オーバーサンプリング — 合成サンプル生成</td><td>↑ 少数クラス</td></tr>
<tr><td><strong>アンダーサンプリング</strong></td><td>多数クラスのサンプルを削除</td><td>↓ 多数クラス</td></tr>
<tr><td><strong>クラス重み付け</strong></td><td>少数クラスの誤分類をより重くペナルティ</td><td>データ変更なし</td></tr>
<tr><td><strong>アンサンブル手法</strong></td><td>BalancedBagging、EasyEnsemble</td><td>アルゴリズムレベル</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> 不均衡データに適した指標：<strong>F1スコア、AUC-ROC、Precision-Recall</strong> — Accuracyは使用しない（誤解を招く）。AWS SageMaker Clarifyでクラス不均衡を検出できます。</p>
</blockquote>

<h2 id="feature-store"><strong>7. SageMaker Feature Store</strong></h2>

<p><strong>SageMaker Feature Store</strong>はML特徴量を保存、共有、再利用するための一元的なリポジトリです。</p>

<pre><code class="language-text">Feature Store Architecture:

          Feature Groups
         ┌──────────────────────────────┐
         │  user_features               │
         │  ┌──────┬────────┬────────┐  │
         │  │ id   │ age    │ recency│  │
         │  └──────┴────────┴────────┘  │
         └──────────────────────────────┘
               ↓ writes              ↑ reads
    ┌──────────────────┐   ┌──────────────────┐
    │  Offline Store   │   │  Online Store    │
    │  (S3 - training) │   │  (DynamoDB -     │
    │  batch reads     │   │  low-latency     │
    │                  │   │  inference)      │
    └──────────────────┘   └──────────────────┘
</code></pre>

<h2 id="cheat-sheet"><strong>8. チートシート — 特徴量エンジニアリング</strong></h2>

<table>
<thead><tr><th>問題</th><th>解決策</th></tr></thead>
<tbody>
<tr><td>高カーディナリティのカテゴリカル</td><td>Target EncodingまたはEmbeddings</td></tr>
<tr><td>欠損値（数値）</td><td>中央値補完 + インジケーター特徴量</td></tr>
<tr><td>歪んだ分布</td><td>対数変換またはBox-Cox</td></tr>
<tr><td>外れ値</td><td>Robust Scalerまたはクリッピング/ウィンソライズ</td></tr>
<tr><td>不均衡クラス</td><td>SMOTE + クラス重み付け + AUC指標</td></tr>
<tr><td>チーム間での特徴量再利用</td><td>SageMaker Feature Store</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>9. 練習問題</strong></h2>

<p><strong>Q1:</strong> 不正検知用データセットは98%が陰性（非不正）、2%が陽性（不正）です。モデル評価に最も適切な指標はどれですか？</p>
<ul>
<li>A) Accuracy</li>
<li>B) R-squared</li>
<li>C) AUC-ROC ✓</li>
<li>D) Mean Absolute Error</li>
</ul>
<p><em>解説：Accuracyは不均衡データでは誤解を招きます（すべて陰性と予測しても98%のAccuracyになる）。AUC-ROCはすべての閾値においてモデルのクラス識別能力を測定するため、不均衡な分類に理想的です。</em></p>

<p><strong>Q2:</strong> クラス不均衡に対処するために合成サンプルを生成するテクニックはどれですか？</p>
<ul>
<li>A) ランダムアンダーサンプリング</li>
<li>B) SMOTE（Synthetic Minority Oversampling Technique） ✓</li>
<li>C) クラス重み付け</li>
<li>D) 特徴量スケーリング</li>
</ul>
<p><em>解説：SMOTEは既存の少数クラスサンプル間を補間して新しい合成サンプルを作成します。単純な複製ではありません。</em></p>

<p><strong>Q3:</strong> ある企業が訓練パイプラインとリアルタイム推論サービス間でエンジニアリングされた特徴量を共有したいと考えています。これに対応するSageMaker機能はどれですか？</p>
<ul>
<li>A) SageMaker Processing Jobs</li>
<li>B) SageMaker Experiments</li>
<li>C) SageMaker Feature Store ✓</li>
<li>D) SageMaker Data Wrangler</li>
</ul>
<p><em>解説：SageMaker Feature Storeはオフラインストア（S3、バッチ訓練用）とオンラインストア（DynamoDBバックエンド、低レイテンシリアルタイム推論用）の両方を提供し、訓練とサービング間の特徴量の一貫性を確保します。</em></p>
