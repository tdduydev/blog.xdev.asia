---
id: 53fa302d-d4b6-483f-af7d-5c9b26bbf21e
title: '第6課：モデル評価と検証'
slug: bai-6-model-evaluation
description: >-
  指標：Accuracy、Precision、Recall、F1、AUC-ROC、RMSE、MAE、R²。
  混同行列。交差検証戦略。
  SageMaker Clarifyによるバイアス検出と説明可能性。
  Production VariantsによるA/Bテスト。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 6
section_title: "パート2：モデリング（36%）"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認定機械学習 - 専門知識 試験対策'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai6-model-evaluation.webp" alt="Model Evaluation Metrics" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>モデル評価：分類指標（AUC-ROC、F1）、回帰指標（RMSE、MAE）、混同行列</em></p>
</div>

<h2 id="classification-metrics"><strong>1. 分類指標</strong></h2>

<p>適切な指標を選択することはMLエンジニアの最も重要なスキルの1つです。MLS-C01試験ではシナリオが提示され、適切な指標が問われます。</p>

<h3 id="confusion-matrix"><strong>1.1. 混同行列</strong></h3>

<pre><code class="language-text">                 Predicted
                 Positive  Negative
Actual Positive │   TP   │   FN   │  ← Recall = TP / (TP + FN)
       Negative │   FP   │   TN   │

Precision  = TP / (TP + FP)   ← 予測Positiveのうち正解の割合
Recall     = TP / (TP + FN)   ← 実際のPositiveのうち捕捉できた割合
F1 Score   = 2 × (P × R) / (P + R)   ← 調和平均
Accuracy   = (TP + TN) / Total
</code></pre>

<table>
<thead><tr><th>指標</th><th>最適化する場面</th><th>実世界の例</th></tr></thead>
<tbody>
<tr><td><strong>Precision</strong></td><td>FPのコストが高い — 誤検知を避けたい</td><td>スパムフィルター（正当なメールをブロックしない）</td></tr>
<tr><td><strong>Recall（感度）</strong></td><td>FNのコストが高い — 陽性を見逃したくない</td><td>がん検出（すべてのがん患者を発見）</td></tr>
<tr><td><strong>F1スコア</strong></td><td>PrecisionとRecallのバランス、不均衡データ</td><td>不正検知</td></tr>
<tr><td><strong>Accuracy</strong></td><td>均衡クラスのみ</td><td>多クラス、均衡データセット</td></tr>
<tr><td><strong>AUC-ROC</strong></td><td>ランキング品質、閾値に依存しない</td><td>信用スコアリング、広告ランキング</td></tr>
<tr><td><strong>PR-AUC</strong></td><td>不均衡、少数クラスに注目</td><td>不正検知、医療診断</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> よくあるシナリオ — 「医療診断で、がんを見逃す方が偽陽性より危険」→ <strong>Recall</strong>を最適化。「スパム検出で、正当なメールのブロックが問題」→ <strong>Precision</strong>を最適化。不均衡データ → <strong>F1またはAUC-ROC</strong>を使用、Accuracyは使わない。</p>
</blockquote>

<h2 id="regression-metrics"><strong>2. 回帰指標</strong></h2>

<table>
<thead><tr><th>指標</th><th>式</th><th>外れ値への感度</th><th>ユースケース</th></tr></thead>
<tbody>
<tr><td><strong>RMSE</strong></td><td>√(mean(errors²))</td><td>高 — 大きな誤差をペナルティ</td><td>大きな誤差が許容できない場合（価格予測）</td></tr>
<tr><td><strong>MAE</strong></td><td>mean(|errors|)</td><td>低 — すべての誤差を均等に</td><td>外れ値にロバスト、需要予測</td></tr>
<tr><td><strong>R²（決定係数）</strong></td><td>1 - SS_res/SS_tot</td><td>中</td><td>説明された分散の割合（0〜1）</td></tr>
<tr><td><strong>MAPE</strong></td><td>mean(|error/actual|×100)</td><td>実測値が0に近い場合高い</td><td>パーセンテージ誤差、ビジネス解釈が容易</td></tr>
</tbody>
</table>

<h2 id="cross-validation"><strong>3. 交差検証</strong></h2>

<table>
<thead><tr><th>戦略</th><th>仕組み</th><th>最適な用途</th></tr></thead>
<tbody>
<tr><td><strong>ホールドアウト分割</strong></td><td>訓練/検証/テスト分割（例：70/15/15）</td><td>大規模データセット、高速評価</td></tr>
<tr><td><strong>K分割交差検証</strong></td><td>K個のサブセット、K-1で訓練、1で評価、K回繰り返し</td><td>中規模データセット、ロバストな推定</td></tr>
<tr><td><strong>層化K分割</strong></td><td>K分割と同じだが各フォールドでクラス比率を維持</td><td>不均衡な分類</td></tr>
<tr><td><strong>Leave-One-Out (LOOCV)</strong></td><td>N分割（各サンプルが1回テスト）</td><td>非常に小さいデータセット</td></tr>
<tr><td><strong>時系列分割</strong></td><td>訓練ウィンドウが前方に成長 — 訓練に将来データなし</td><td>時系列データ</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> 時系列データは必ず<strong>時間ベースの分割</strong>を使用し、シャッフルしてから通常のK分割を使用してはいけません — 将来のデータが訓練にリークします。</p>
</blockquote>

<h2 id="clarify"><strong>4. SageMaker Clarify — バイアスと説明可能性</strong></h2>

<p><strong>SageMaker Clarify</strong>はデータ/モデルのバイアスを検出し、<strong>SHAP値</strong>を使用したモデルの説明可能性を提供します。</p>

<table>
<thead><tr><th>機能</th><th>動作</th><th>出力</th></tr></thead>
<tbody>
<tr><td><strong>訓練前バイアス検出</strong></td><td>訓練前の生データを分析</td><td>バイアス指標：CI、DPL、KL、JS</td></tr>
<tr><td><strong>訓練後バイアス検出</strong></td><td>モデル予測のバイアスを評価</td><td>指標：DPPL、DI、DCO、RD</td></tr>
<tr><td><strong>モデル説明可能性</strong></td><td>特徴量の重要度のSHAP値</td><td>予測ごとの特徴量重み寄与</td></tr>
</tbody>
</table>

<pre><code class="language-text">SHAP Explainability Example (Loan Approval):

Feature            SHAP Value  Contribution
─────────────────────────────────────────────
credit_score       +0.42       ↑ approval
income             +0.28       ↑ approval
debt_ratio         -0.35       ↓ approval
employment_years   +0.15       ↑ approval
age                -0.02       minimal impact
</code></pre>

<h2 id="production-variants"><strong>5. Production VariantsによるA/Bテスト</strong></h2>

<p>SageMaker Endpointsは<strong>Production Variants</strong>をサポート — トラフィック分割による複数モデルバージョンの同時実行。</p>

<pre><code class="language-text">Endpoint with A/B Testing:

          ┌──────────────────────────────┐
 Request ─→  SageMaker Endpoint         │
          │                              │
          │  Variant A (v1): 80% traffic │──→ Model v1 (current)
          │  Variant B (v2): 20% traffic │──→ Model v2 (candidate)
          └──────────────────────────────┘
                        ↓
                 Compare metrics, shift traffic gradually
</code></pre>

<h2 id="cheat-sheet"><strong>6. チートシート — 評価指標</strong></h2>

<table>
<thead><tr><th>シナリオ</th><th>最適な指標</th></tr></thead>
<tbody>
<tr><td>医療診断（FNが致命的）</td><td>Recall（感度）</td></tr>
<tr><td>スパムフィルター（FPが致命的）</td><td>Precision</td></tr>
<tr><td>不均衡な不正検知</td><td>F1スコア、AUC-ROC</td></tr>
<tr><td>住宅価格予測（外れ値が重要）</td><td>RMSE</td></tr>
<tr><td>需要予測（ロバスト）</td><td>MAE</td></tr>
<tr><td>個別予測の説明</td><td>SHAP（SageMaker Clarify経由）</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. 練習問題</strong></h2>

<p><strong>Q1:</strong> ある病院が早期がん検出モデルを構築したいと考えています。実際のがん症例を見逃すことは偽陽性よりも危険です。どの指標を最適化すべきですか？</p>
<ul>
<li>A) Precision</li>
<li>B) Recall ✓</li>
<li>C) Accuracy</li>
<li>D) RMSE</li>
</ul>
<p><em>解説：Recall = TP / (TP + FN)。Recallを最適化すると偽陰性（見逃されたがん症例）が最小化されます。PrecisionはFPを最適化、Accuracyは不均衡な医療データでは誤解を招き、RMSEは回帰用です。</em></p>

<p><strong>Q2:</strong> ある企業が既存モデルをフォールバックとして維持しながら、本番で新しいモデルバージョンを段階的にテストしたいと考えています。これを実現するSageMaker機能はどれですか？</p>
<ul>
<li>A) SageMaker Experiments</li>
<li>B) SageMaker Pipelines</li>
<li>C) SageMaker Endpointsの Production Variants ✓</li>
<li>D) SageMaker Model Monitor</li>
</ul>
<p><em>解説：SageMaker EndpointsはProduction Variantsをサポートし、設定可能なトラフィックウェイトで複数のモデルバージョンを同時に実行できます。ダウンタイムなしのA/Bテストとカナリアデプロイメントを実現します。</em></p>

<p><strong>Q3:</strong> 住宅価格予測モデルのRMSE=50,000、MAE=20,000です。これは何を示していますか？</p>
<ul>
<li>A) 高バイアス</li>
<li>B) データリーケージ</li>
<li>C) 外れ値がRMSEを押し上げている ✓</li>
<li>D) 未学習</li>
</ul>
<p><em>解説：RMSEがMAEより大幅に高い場合、外れ値の存在を示します。RMSEは誤差を二乗するため、大きな誤差をMAEよりもはるかに重くペナルティします。このギャップ（50k対20k）は一部の予測に非常に大きな誤差があることを示唆しています。</em></p>
