---
id: 019c9619-lt03-l01
title: '第1課：ML問題のフレーミング — 教師あり、教師なし、強化学習'
slug: bai-1-framing-ml-problems
description: >-
  問題にMLが必要かどうかの判断方法。適切なモデルタイプの選択。
  ビジネス指標 vs ML指標。データ可用性の評価。
  GoogleのMLベストプラクティス。
duration_minutes: 50
is_free: true
video_url: null
sort_order: 1
section_title: "領域1：ML問題のフレーミングとアーキテクチャ"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer 試験対策'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai1-problem-framing.webp" alt="ML Problem Framing Framework" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>ML問題のフレーミング：問題の特定、モデルタイプの選択、Google標準に基づくメトリクスの定義</em></p>
</div>

<h2 id="when-to-use-ml"><strong>1. いつMLを使うべきか？</strong></h2>

<p>Google ML認定試験では<strong>問題のフレーミング</strong>に関する問題が頻出します。つまり、その問題がMLの適用に適しているかどうか、適している場合はどの種類のMLを使うべきかを判断する能力です。これはプロフェッショナルMLエンジニアにとって重要なスキルです。</p>

<table>
<thead><tr><th>確認すべき質問</th><th>「はい」の場合</th><th>「いいえ」の場合</th></tr></thead>
<tbody>
<tr><td>データに複雑なパターンがあるか？</td><td>MLが有効</td><td>ルールベースのロジックで十分</td></tr>
<tr><td>十分なデータ（ラベル）があるか？</td><td>教師あり学習</td><td>教師なし学習、またはデータ追加収集</td></tr>
<tr><td>出力を明確に定義できるか？</td><td>教師ありML</td><td>ステークホルダーとの要件確認が必要</td></tr>
<tr><td>エージェントが環境と対話する必要があるか？</td><td>強化学習</td><td>教師あり/教師なし学習</td></tr>
</tbody>
</table>

<h2 id="ml-types"><strong>2. MLの種類と使い分け</strong></h2>

<pre><code class="language-text">Problem Framing Decision Tree:

Has labeled training data?
    YES → Supervised Learning
           ├── Output is category? → Classification
           └── Output is number? → Regression

    NO → Has examples, no labels?
           YES → Unsupervised Learning
                  ├── Find groups? → Clustering
                  └── Find patterns/anomalies? → Density estimation
           NO → Agent in environment?
                  YES → Reinforcement Learning
                  NO → Reconsider problem definition
</code></pre>

<table>
<thead><tr><th>MLの種類</th><th>使用場面</th><th>GCPサービス</th></tr></thead>
<tbody>
<tr><td><strong>教師あり分類</strong></td><td>メールスパム検出、画像ラベリング、解約予測</td><td>Vertex AI AutoML、BigQuery ML</td></tr>
<tr><td><strong>教師あり回帰</strong></td><td>価格予測、需要予測</td><td>Vertex AI、BigQuery ML BQML_REGRESSOR</td></tr>
<tr><td><strong>教師なしクラスタリング</strong></td><td>顧客セグメンテーション、トピック発見</td><td>Vertex AI Custom Training（k-means）</td></tr>
<tr><td><strong>強化学習</strong></td><td>ゲームエージェント、ロボティクス、広告入札</td><td>Vertex AI + カスタム環境</td></tr>
<tr><td><strong>自己教師あり学習</strong></td><td>LLM、基盤モデル</td><td>Vertex AI Model Garden</td></tr>
</tbody>
</table>

<h2 id="business-vs-ml-metrics"><strong>3. ビジネス指標 vs. ML指標</strong></h2>

<p>よくある間違いの一つは、<strong>誤った指標を最適化すること</strong>です。MLの目標はビジネスの目標と一致している必要があります。</p>

<table>
<thead><tr><th>ビジネス目標</th><th>誤ったML指標</th><th>正しいML指標</th></tr></thead>
<tbody>
<tr><td>不正による収益損失の削減</td><td>Accuracy（99%!）</td><td>Recall（より多くの不正を検出）</td></tr>
<tr><td>スパムメールによるユーザー体験の低下を防ぐ</td><td>Recall</td><td>Precision（偽陽性を少なく）</td></tr>
<tr><td>在庫の需要予測</td><td>MSE</td><td>MAPE（スケール非依存）</td></tr>
<tr><td>検索結果の商品ランキング</td><td>Accuracy</td><td>NDCG、MRR（ランキング指標）</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> Professional ML Engineer試験では「ビジネス目標に最も合致する指標はどれか」という問題が頻出します。不正検知/医療診断 → Recall。スパム/精度重視 → Precision。クラス不均衡 → F1またはAUC-ROC。</p>
</blockquote>

<h2 id="data-assessment"><strong>4. データ可用性の評価</strong></h2>

<table>
<thead><tr><th>データの状況</th><th>MLアプローチ</th></tr></thead>
<tbody>
<tr><td>ラベル付きデータが豊富</td><td>完全教師あり学習、ゼロからトレーニング</td></tr>
<tr><td>ラベル付きデータが少ない（1000未満）</td><td><strong>転移学習</strong>（事前学習済みモデル + ファインチューニング）</td></tr>
<tr><td>ラベルなし</td><td>教師なし学習、またはラベル収集（Vertex AI Data Labeling）</td></tr>
<tr><td>ラベル付けが高コスト</td><td><strong>能動学習</strong> — 不確実なサンプルを優先的にラベル付け</td></tr>
<tr><td>データの不均衡</td><td>オーバーサンプリング、アンダーサンプリング、クラス重み付け</td></tr>
</tbody>
</table>

<h2 id="google-ml-practices"><strong>5. GoogleのMLベストプラクティス</strong></h2>

<ul>
<li><strong>シンプルに始める</strong>：最もシンプルなモデルから始め、徐々に複雑化する</li>
<li><strong>ベースラインを確立する</strong>：MLを使う前にヒューリスティック/ルールと比較する</li>
<li><strong>データ品質を最優先</strong>：MLプロジェクトの80%の時間はデータ準備に費やされる</li>
<li><strong>再現性</strong>：パイプラインは同じデータで再現可能でなければならない</li>
<li><strong>本番環境でのモニタリング</strong>：モデルは時間とともに劣化する — 継続的なモニタリングが必要</li>
</ul>

<h2 id="practice"><strong>6. 練習問題</strong></h2>

<p><strong>Q1：</strong> ある企業が、今後30日以内にサブスクリプションをキャンセルする可能性が最も高い顧客を特定したいと考えています。解約イベントが記録された3年分の顧客行動履歴データがあります。どのMLアプローチを使用すべきでしょうか？</p>
<ul>
<li>A) 教師なしクラスタリングで顧客グループを発見する</li>
<li>B) 強化学習でリテンションキャンペーンを最適化する</li>
<li>C) 過去の解約ラベルを使った教師あり二値分類 ✓</li>
<li>D) 異常検知で異常な行動を発見する</li>
</ul>
<p><em>解説：これは典型的な教師あり分類問題です（解約 = はい/いいえ）。既知の結果（解約/非解約）を持つ過去のデータがラベルを提供します。クラスタリングでは個々の解約確率を予測できません。強化学習は予測ではなく、逐次的な意思決定に適しています。</em></p>

<p><strong>Q2：</strong> 医療画像MLモデルがテストデータで98%の精度を達成しましたが、ビジネスチームは満足していません。タスクは稀ながん細胞の検出（発生率1%）です。最も可能性の高い問題は何でしょうか？</p>
<ul>
<li>A) モデルがトレーニングデータに過学習している</li>
<li>B) Accuracyは誤った指標 — モデルがすべてに対して「がんなし」と予測している可能性がある ✓</li>
<li>C) モデルにさらなるトレーニングイテレーションが必要</li>
<li>D) テストデータセットが小さすぎる</li>
</ul>
<p><em>解説：発生率1%の場合、常に「がんなし」と予測するモデルでも99%のAccuracyを達成しますが、Recallは0% — すべてのがん症例を見逃します。稀なクラスの問題では、AccuracyではなくRecall（感度）が重要な指標です。</em></p>

<p><strong>Q3：</strong> あるスタートアップが、新しいカスタム分類タスク用に500枚のラベル付き商品画像を持っています。最も適切なトレーニングアプローチはどれでしょうか？</p>
<ul>
<li>A) 500枚の画像でディープラーニングCNNをゼロからトレーニングする</li>
<li>B) 画像メタデータにAutoML Tabularを使用する</li>
<li>C) 事前学習済み画像モデルからの転移学習を使用する ✓</li>
<li>D) データセットが小さいのでK-Meansクラスタリングを適用する</li>
</ul>
<p><em>解説：ラベル付き例が500枚しかない場合、ゼロからのトレーニングは深刻な過学習を引き起こします。転移学習は、数百万枚の画像（例：ImageNet）で事前学習されたモデルの特徴量を再利用し、新しいタスクで良好な精度を達成するために必要なデータ量を大幅に削減します。</em></p>
