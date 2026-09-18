---
id: 8a7a5367-e4a4-4796-8aab-68326c1dc574
title: '第5課：訓練とハイパーパラメータチューニング'
slug: bai-5-training-hyperparameter-tuning
description: >-
  SageMaker Training Jobs：インスタンスタイプ、Pipe Mode vs File Mode。
  分散訓練：データ並列 vs モデル並列。
  自動モデルチューニング（HPO）：ベイズ vs ランダム vs グリッドサーチ。
  コスト削減のためのSpot Instance Training。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 5
section_title: "パート2：モデリング（36%）"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認定機械学習 - 専門知識 試験対策'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai5-training-hpo.webp" alt="SageMaker Training & Hyperparameter Tuning" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>SageMaker Training JobsとHPO：分散訓練、Spot Instances、HPO戦略</em></p>
</div>

<h2 id="training-jobs"><strong>1. SageMaker Training Jobs</strong></h2>

<p><strong>SageMaker Training Jobs</strong>はマネージドコンピュートインフラストラクチャ上でML訓練コードを実行します。訓練はエフェメラルインスタンス上で行われ、実行時間のみ課金されます。</p>

<pre><code class="language-text">Training Job Lifecycle:

  Submit Job ──→ Provision Instances ──→ Download Data
                                              ↓
                                       Run Training Code
                                              ↓
                                       Save Model to S3
                                              ↓
                                       Terminate Instances  
</code></pre>

<h2 id="instance-types"><strong>2. 訓練用インスタンスタイプ</strong></h2>

<table>
<thead><tr><th>インスタンスファミリー</th><th>ハードウェア</th><th>最適な用途</th></tr></thead>
<tbody>
<tr><td><strong>ml.c5</strong></td><td>CPU最適化</td><td>テーブルML、XGBoost、sklearn</td></tr>
<tr><td><strong>ml.m5</strong></td><td>汎用CPU</td><td>軽量訓練、データ処理</td></tr>
<tr><td><strong>ml.p3</strong></td><td>V100 GPU</td><td>ディープラーニング訓練</td></tr>
<tr><td><strong>ml.p4d</strong></td><td>A100 GPU（8基）</td><td>大規模DL、分散訓練</td></tr>
<tr><td><strong>ml.g4dn</strong></td><td>T4 GPU（コスト効率）</td><td>小〜中規模DLモデル</td></tr>
<tr><td><strong>ml.trn1</strong></td><td>AWS Trainium</td><td>LLM訓練、コスト最適化</td></tr>
</tbody>
</table>

<h2 id="distributed-training"><strong>3. 分散訓練</strong></h2>

<p>モデルまたはデータセットが1つのインスタンスに収まらない場合、複数インスタンスでの<strong>分散訓練</strong>が必要です。</p>

<table>
<thead><tr><th>戦略</th><th>仕組み</th><th>使用場面</th></tr></thead>
<tbody>
<tr><td><strong>データ並列</strong></td><td>各インスタンスにモデルのコピーがあり、データのサブセットで訓練、勾配を同期</td><td>データセットが大きすぎるが、モデルは1つのGPUに収まる場合</td></tr>
<tr><td><strong>モデル並列</strong></td><td>モデルをインスタンス間で分割、各インスタンスが一部を保持</td><td>モデルが1つのGPUに収まらない場合（LLM）</td></tr>
</tbody>
</table>

<pre><code class="language-text">Data Parallelism:

Instance 1 [Full Model] ──→ Train on data shard A ──→ ↓
Instance 2 [Full Model] ──→ Train on data shard B ──→ ↓  AllReduce
Instance 3 [Full Model] ──→ Train on data shard C ──→ ↓  (sync gradients)
                                                          ↓
                                              Updated Model Weights

Model Parallelism:

Instance 1 [Layers 1-4]  ──→ forward pass ──→
Instance 2 [Layers 5-8]  ──→ forward pass ──→
Instance 3 [Layers 9-12] ──→ forward pass ──→ output
</code></pre>

<blockquote>
<p><strong>試験のヒント：</strong> SageMakerは<strong>SageMaker Distributed</strong>ライブラリを2つのモジュールで提供：(1) <code>smdistributed.dataparallel</code> — 最適化されたAllReduce；(2) <code>smdistributed.modelparallel</code> — 自動パイプライン並列。「大規模モデル訓練」→ モデル並列。</p>
</blockquote>

<h2 id="hpo"><strong>4. 自動モデルチューニング（HPO）</strong></h2>

<p><strong>ハイパーパラメータ最適化（HPO）</strong>は異なる設定で複数の訓練ジョブを実行し、最適なハイパーパラメータを自動的に見つけます。</p>

<table>
<thead><tr><th>戦略</th><th>仕組み</th><th>トレードオフ</th></tr></thead>
<tbody>
<tr><td><strong>ランダムサーチ</strong></td><td>範囲からハイパーパラメータをランダムにサンプリング</td><td>高速、良いベースライン</td></tr>
<tr><td><strong>グリッドサーチ</strong></td><td>すべての組み合わせを試行</td><td>網羅的、高コスト、大きな探索空間には不向き</td></tr>
<tr><td><strong>ベイズ最適化</strong></td><td>結果の確率モデル、次の最適な設定を提案</td><td>効率的、過去の試行から学習 — SageMakerのデフォルト</td></tr>
<tr><td><strong>Hyperband</strong></td><td>パフォーマンスの低い試行を早期停止</td><td>リソース効率が良い、高速</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> SageMaker AMT（Automatic Model Tuning）はデフォルトで<strong>ベイズ最適化</strong>を使用します。前回のジョブの結果を参照して次のハイパーパラメータセットを提案します — ブルートフォースではなくインテリジェントな探索です。</p>
</blockquote>

<h2 id="spot-training"><strong>5. Spot Instance Training</strong></h2>

<p>SageMakerは訓練ジョブに<strong>EC2 Spot Instances</strong>の使用をサポートし、オンデマンドと比較して最大<strong>90%のコスト削減</strong>を実現します。</p>

<table>
<thead><tr><th>機能</th><th>詳細</th></tr></thead>
<tbody>
<tr><td><strong>MaxWaitTimeInSeconds</strong></td><td>Spotキャパシティを待つ最大時間</td></tr>
<tr><td><strong>チェックポイント</strong></td><td>定期的にモデルをS3に保存 — 中断後に再開</td></tr>
<tr><td><strong>use_spot_instances=True</strong></td><td>SageMaker Estimatorのパラメータ</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> 「訓練コストを削減する」と問われた場合、正解は通常<strong>チェックポイント付きSpot Instances</strong>です。チェックポイントはSpotインスタンスが終了された場合の進捗損失を防ぐために重要です。</p>
</blockquote>

<h2 id="bias-variance"><strong>6. バイアス-バリアンストレードオフ</strong></h2>

<table>
<thead><tr><th>問題</th><th>症状</th><th>原因</th><th>解決策</th></tr></thead>
<tbody>
<tr><td><strong>高バイアス（未学習）</strong></td><td>訓練誤差が高い、テスト誤差も高い</td><td>モデルが単純すぎる</td><td>モデル複雑性の増加、特徴量追加、正則化の減少</td></tr>
<tr><td><strong>高バリアンス（過学習）</strong></td><td>訓練誤差が低い、テスト誤差が高い</td><td>モデルが複雑すぎる</td><td>データ追加、ドロップアウト、正則化、特徴量選択</td></tr>
<tr><td><strong>バランス良好</strong></td><td>訓練誤差が低い、テスト誤差も低い（近い値）</td><td>良いフィット</td><td>モデルをデプロイ</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. 練習問題</strong></h2>

<p><strong>Q1:</strong> ある企業が1つのGPUインスタンスに収まらない大規模ディープラーニングモデルを訓練しています。どのSageMaker分散訓練戦略を使用すべきですか？</p>
<ul>
<li>A) データ並列</li>
<li>B) モデル並列 ✓</li>
<li>C) パイプライン並列のみ</li>
<li>D) バッチサイズの増加</li>
</ul>
<p><em>解説：モデル並列はモデル自体を複数のGPUインスタンスに分割し、1つのGPUのメモリに収まらないモデルの訓練を可能にします。データ並列は各インスタンスに完全なモデルコピーを保持するため、モデル自体が大きすぎる場合は役に立ちません。</em></p>

<p><strong>Q2:</strong> チームが500のハイパーパラメータチューニングジョブの実行コストを最小化したいと考えています。訓練は中断を許容できます。最もコスト効率の良いアプローチはどれですか？</p>
<ul>
<li>A) より大きなインスタンスでジョブを高速に実行</li>
<li>B) チェックポイント有効化のSpot Instances ✓</li>
<li>C) ベイズ最適化の代わりにグリッドサーチを使用</li>
<li>D) エポック数を削減</li>
</ul>
<p><em>解説：Spot Instancesはオンデマンド価格と比較して最大90%のコスト削減を実現できます。チェックポイントを有効にすると、中断されたジョブがS3に状態を保存し再開できるため、長時間のHPOジョブにSpot Instancesが実用的になります。</em></p>

<p><strong>Q3:</strong> モデルが訓練データで95%のaccuracyを達成しましたが、テストセットでは62%です。これはどのような問題を示していますか？</p>
<ul>
<li>A) 未学習 / 高バイアス</li>
<li>B) 過学習 / 高バリアンス ✓</li>
<li>C) データリーケージ</li>
<li>D) クラス不均衡</li>
</ul>
<p><em>解説：訓練accuracy（95%）とテストaccuracy（62%）の大きなギャップは過学習（高バリアンス）の典型的な兆候です。モデルが訓練データを暗記したが汎化に失敗しています。解決策：データ追加、正則化（L1/L2、ドロップアウト）、モデル複雑性の削減。</em></p>
