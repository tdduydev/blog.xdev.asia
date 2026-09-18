---
id: 1a81b42d-c09e-43ef-b9f6-3158ca64b6c1
title: '第3課：データ分析と可視化'
slug: bai-3-data-analysis
description: >-
  SageMakerノートブックでのEDA。SQL分析用Amazon Athena。
  BIダッシュボード用Amazon QuickSight。データ品質問題の検出。
  クラス不均衡、外れ値、相関、データドリフトの検出。
duration_minutes: 45
is_free: true
video_url: null
sort_order: 3
section_title: "パート1：データエンジニアリング（20%）"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認定機械学習 - 専門知識 試験対策'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai3-eda-data-analysis.webp" alt="Exploratory Data Analysis on AWS" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>EDAとデータ分析：記述統計、外れ値検出、AWS上での特徴量相関</em></p>
</div>

<h2 id="eda"><strong>1. 探索的データ分析（EDA）</strong></h2>

<p><strong>EDA</strong>はモデリング前にデータの構造、パターン、異常を理解するための初期分析ステップです。SageMakerは大規模なEDAを実行するための多くのツールを提供しています。</p>

<h2 id="eda-tools"><strong>2. データ分析用AWSツール</strong></h2>

<table>
<thead><tr><th>ツール</th><th>ユースケース</th><th>インターフェース</th></tr></thead>
<tbody>
<tr><td><strong>SageMaker Studio Notebooks</strong></td><td>インタラクティブEDA、Python/R分析</td><td>JupyterLabベースのIDE</td></tr>
<tr><td><strong>SageMaker Data Wrangler</strong></td><td>ビジュアルデータ準備、300以上の変換、自動インサイト</td><td>ドラッグ＆ドロップGUI</td></tr>
<tr><td><strong>Amazon Athena</strong></td><td>S3データ上のSQLクエリ</td><td>SQLコンソール</td></tr>
<tr><td><strong>Amazon QuickSight</strong></td><td>BIダッシュボード、経営レポート</td><td>ビジュアルBIツール</td></tr>
<tr><td><strong>Amazon Redshift</strong></td><td>大規模データウェアハウス、SQL分析</td><td>SQL</td></tr>
<tr><td><strong>AWS Glue DataBrew</strong></td><td>ノーコードデータプロファイリングとクリーニングレシピ</td><td>ビジュアルツール</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> <strong>Data Wrangler</strong> = ML向けビジュアルデータ準備（SageMaker Processingコードを生成）。<strong>DataBrew</strong> = データアナリスト/BI向け（MLコンテキストなし）。<strong>QuickSight</strong> = ビジネスユーザー向けBIダッシュボード、MLではない。</p>
</blockquote>

<h2 id="data-quality"><strong>3. データ品質の問題</strong></h2>

<p>試験ではデータ品質に関する一般的な問題の識別と対処方法がよく出題されます。</p>

<table>
<thead><tr><th>問題</th><th>検出方法</th><th>モデルへの影響</th></tr></thead>
<tbody>
<tr><td><strong>欠損値</strong></td><td>Null数、列ごとの欠損率</td><td>エラー、偏った結果</td></tr>
<tr><td><strong>外れ値</strong></td><td>箱ひげ図、Z-score > 3、IQR法</td><td>重みの歪み、汎化性能の低下</td></tr>
<tr><td><strong>クラス不均衡</strong></td><td>クラス分布ヒストグラム</td><td>多数クラスへの偏り</td></tr>
<tr><td><strong>特徴量相関</strong></td><td>相関行列、VIFスコア</td><td>多重共線性 → 不安定な係数</td></tr>
<tr><td><strong>データリーケージ</strong></td><td>ターゲットとの異常に高い相関を持つ特徴量</td><td>過大評価、本番で失敗</td></tr>
<tr><td><strong>分布の歪み</strong></td><td>ヒストグラム、歪度指標</td><td>モデルの仮定違反</td></tr>
</tbody>
</table>

<h3 id="data-leakage"><strong>3.1. データリーケージ — 重要概念</strong></h3>

<p><strong>データリーケージ</strong>は訓練セット外の情報が特徴量に漏れ込み、訓練時のaccuracyが高くなるが本番で失敗する現象です。</p>

<pre><code class="language-text">Common Data Leakage Patterns:

❌ Target leakage:
   Feature "loan_default_flag" → predicting "credit_risk"
   (feature derived from target)

❌ Future data leakage:
   Using tomorrow's stock price to predict today's trade

❌ Train/test contamination:
   Scaling data BEFORE splitting (test mean leaks into train)

✅ Correct approach:
   Split data FIRST → fit scaler on train only → transform both
</code></pre>

<blockquote>
<p><strong>試験のヒント：</strong> 常に<strong>変換前にデータを分割</strong>してください。StandardScaler.fit()は訓練セットのみで呼び出し、その後transform()を訓練セットとテストセットの両方に適用します。データセット全体でfit+transformするとデータリーケージになります。</p>
</blockquote>

<h2 id="athena"><strong>4. Amazon Athena</strong></h2>

<p>AthenaはデータベースにロードせずにS3上で直接SQLクエリを実行できます。<strong>スキャンあたりの課金</strong>のため、Parquet + パーティショニングで最適化します。</p>

<pre><code class="language-text">Cost Optimization Tips:
┌────────────────────────────────────────────────┐
│  Partition data by date/region/category:       │
│  s3://bucket/data/year=2024/month=01/          │
│  → Query chỉ scan the required partitions      │
│                                                │
│  Use columnar formats (Parquet/ORC):           │
│  → Read only needed columns                   │
│                                               │
│  Compress data (Snappy, Gzip):                │
│  → Reduce scan size → reduce cost             │
└────────────────────────────────────────────────┘
</code></pre>

<h2 id="quicksight"><strong>5. Amazon QuickSight</strong></h2>

<p>QuickSightは<strong>BIサービス</strong>であり、MLツールではありません。主要機能：<strong>SPICE</strong>（インメモリエンジン）による高速ダッシュボード。</p>

<table>
<thead><tr><th>機能</th><th>説明</th></tr></thead>
<tbody>
<tr><td><strong>SPICE</strong></td><td>Super-fast Parallel In-memory Calculation Engine — キャッシュされたデータセット</td></tr>
<tr><td><strong>ML Insights</strong></td><td>ダッシュボード上の組み込み異常検知、予測</td></tr>
<tr><td><strong>Q (NLQ)</strong></td><td>自然言語クエリ — 「先月の地域別売上を表示」</td></tr>
</tbody>
</table>

<h2 id="cheat-sheet"><strong>6. チートシート — 分析ツール</strong></h2>

<table>
<thead><tr><th>シナリオ</th><th>ツール</th></tr></thead>
<tbody>
<tr><td>大規模データのインタラクティブPython EDA</td><td>SageMaker Studio Notebooks</td></tr>
<tr><td>ビジュアルノーコードMLデータ準備</td><td>SageMaker Data Wrangler</td></tr>
<tr><td>S3データ上のSQL（サーバーレス）</td><td>Amazon Athena</td></tr>
<tr><td>ビジネスダッシュボードとレポート</td><td>Amazon QuickSight</td></tr>
<tr><td>大規模データウェアハウスSQL</td><td>Amazon Redshift</td></tr>
<tr><td>ノーコードデータプロファイリングレシピ</td><td>AWS Glue DataBrew</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. 練習問題</strong></h2>

<p><strong>Q1:</strong> データサイエンティストがデータセット全体の平均と標準偏差を使って特徴量を標準化してから、訓練/テストセットに分割しました。これはどのような問題を引き起こしますか？</p>
<ul>
<li>A) モデルの未学習</li>
<li>B) 訓練の収束が遅い</li>
<li>C) テストセットの統計量が訓練に漏れるデータリーケージ ✓</li>
<li>D) クラス不均衡</li>
</ul>
<p><em>解説：データセット全体でスケーラーをフィッティングすると、テストセットの統計量（平均、標準偏差）が訓練データの変換に影響するデータリーケージが発生します。常に訓練データのみでトランスフォーマーをフィットし、フィット済みトランスフォーマーを訓練とテスト両方に適用してください。</em></p>

<p><strong>Q2:</strong> ビジネスアナリストがS3データから高速なインタラクティブ可視化を備えた経営ダッシュボードを作成する必要があります。最適なAWSサービスはどれですか？</p>
<ul>
<li>A) Amazon SageMaker Studio</li>
<li>B) Amazon Athena</li>
<li>C) Amazon QuickSight ✓</li>
<li>D) AWS Glue DataBrew</li>
</ul>
<p><em>解説：Amazon QuickSightはSPICEインメモリエンジンによる高速なインタラクティブクエリを備えた、ビジネスダッシュボードと可視化のために設計されたAWS BIサービスです。</em></p>

<p><strong>Q3:</strong> 顧客離反データで訓練されたモデルが99%の訓練accuracyを達成しましたが、本番データでのパフォーマンスが低いです。調査の結果、「days_since_last_call」が予想以上に予測力が高いことがわかりました。最も可能性の高い原因は何ですか？</p>
<ul>
<li>A) 特徴量が多すぎることによる過学習</li>
<li>B) モデル複雑性の不足による未学習</li>
<li>C) データリーケージ — 特徴量が離反後の活動から導出されている ✓</li>
<li>D) クラス不均衡</li>
</ul>
<p><em>解説：これは典型的なターゲットリーケージです — 「days_since_last_call」は離反後の行動を反映している可能性があります（顧客が解約のために電話する）。この将来の情報は本番では利用できないため、モデルが失敗します。</em></p>
