---
id: 019c9619-lt03-l04
title: '第4課：特徴量エンジニアリングとVertex AI Feature Store'
slug: bai-4-feature-engineering
description: >-
  特徴量エンジニアリング技法。BigQueryによる特徴量計算。
  Vertex AI Feature Store：オンライン/オフラインサービング。
  特徴量モニタリング、学習/推論間の一貫性。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 4
section_title: "領域2：データエンジニアリングと特徴量エンジニアリング"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer 試験対策'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai4-feature-store.webp" alt="Vertex AI Feature Store" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>特徴量エンジニアリングとVertex AI Feature Store：ML向け特徴量の作成、保存、再利用</em></p>
</div>

<h2 id="feature-engineering"><strong>1. 特徴量エンジニアリング技法</strong></h2>

<table>
<thead><tr><th>技法</th><th>使用場面</th><th>例</th></tr></thead>
<tbody>
<tr><td><strong>正規化（Min-Max）</strong></td><td>有界範囲が必要（0-1）</td><td>画像ピクセル、確率</td></tr>
<tr><td><strong>標準化（Zスコア）</strong></td><td>正規分布に近い、境界なし</td><td>顧客年齢、取引金額</td></tr>
<tr><td><strong>対数変換</strong></td><td>偏った分布（価格、給与）</td><td>住宅のLog(price)</td></tr>
<tr><td><strong>One-Hotエンコーディング</strong></td><td>名義カテゴリカル（順序なし）</td><td>国、ブランド、色</td></tr>
<tr><td><strong>ラベルエンコーディング</strong></td><td>順序カテゴリカル（順序あり）</td><td>Low/Medium/High → 0/1/2</td></tr>
<tr><td><strong>特徴量クロス</strong></td><td>特徴量間の相互作用を捕捉</td><td>city × day_of_week</td></tr>
<tr><td><strong>バケット化</strong></td><td>連続値をカテゴリカルに変換</td><td>Age → age_group</td></tr>
<tr><td><strong>エンベディング</strong></td><td>高カーディナリティのカテゴリカル</td><td>UserID、ProductID</td></tr>
</tbody>
</table>

<h2 id="missing-values"><strong>2. 欠損値の処理</strong></h2>

<table>
<thead><tr><th>戦略</th><th>使用場面</th></tr></thead>
<tbody>
<tr><td><strong>平均値/中央値補完</strong></td><td>数値型、欠損率が低い場合</td></tr>
<tr><td><strong>最頻値補完</strong></td><td>カテゴリカル特徴量</td></tr>
<tr><td><strong>モデルベースの補完</strong></td><td>欠損率が高い、複雑なパターン</td></tr>
<tr><td><strong>インジケータ変数</strong></td><td>欠損自体が情報を持つ（is_missingフラグを追加）</td></tr>
<tr><td><strong>行の削除</strong></td><td>ターゲットの欠損/影響を受ける行が非常に少ない</td></tr>
<tr><td><strong>列の削除</strong></td><td>80%以上が欠損</td></tr>
</tbody>
</table>

<h2 id="training-serving-skew"><strong>3. 学習-推論スキュー</strong></h2>

<p><strong>学習-推論スキュー</strong>は深刻な問題です。特徴量が学習時と推論時で異なる方法で計算されるため、テスト指標が良好でも本番環境でモデルのパフォーマンスが低下します。</p>

<pre><code class="language-text">Training-Serving Skew Example:

TRAINING TIME:
  avg_purchase_last_30d = mean(all purchases in batch)  ← computed over full period

SERVING TIME:
  avg_purchase_last_30d = mean(last 5 purchases)        ← computed differently!

Result: Feature distribution mismatch → poor predictions

SOLUTION: Vertex AI Feature Store
  Same feature serve logic used at training AND serving time
</code></pre>

<h2 id="feature-store"><strong>4. Vertex AI Feature Store</strong></h2>

<table>
<thead><tr><th>コンポーネント</th><th>説明</th></tr></thead>
<tbody>
<tr><td><strong>Feature Store</strong></td><td>ML特徴量の集中型リポジトリ</td></tr>
<tr><td><strong>Entity Type</strong></td><td>追跡する対象のカテゴリ（User、Product）</td></tr>
<tr><td><strong>Feature</strong></td><td>エンティティの名前付き属性（user.avg_spend）</td></tr>
<tr><td><strong>Online Store</strong></td><td>低レイテンシサービング（ms）、リアルタイム予測用</td></tr>
<tr><td><strong>Offline Store</strong></td><td>BigQueryバックエンド、バッチトレーニングデータ取得用</td></tr>
</tbody>
</table>

<pre><code class="language-text">Vertex AI Feature Store Architecture:

Feature Ingestion (Batch or Streaming)
        ↓
┌──── Feature Store ────────────────┐
│  Offline Store (BigQuery)          │  ← Training data export
│  Online Store (Bigtable-backed)    │  ← Serving (ms latency)
└───────────────────────────────────┘
        ↑ Same features ↑
  Training      Inference
  Pipeline      Endpoint
</code></pre>

<h2 id="bigquery-features"><strong>5. BigQueryによる特徴量エンジニアリング</strong></h2>

<p>BigQueryはGCP上で大規模データセットから集約特徴量を計算するための最適なツールです。</p>

<table>
<thead><tr><th>特徴量パターン</th><th>BigQueryのアプローチ</th></tr></thead>
<tbody>
<tr><td>ローリングウィンドウ集約</td><td>ウィンドウ関数：AVG() OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN ...)</td></tr>
<tr><td>ユーザーアクティビティカウント</td><td>COUNT() GROUP BY user_id</td></tr>
<tr><td>カテゴリカルエンコーディング</td><td>CASE WHEN ... または ML.ONE_HOT_ENCODE()</td></tr>
<tr><td>ハッシュエンベディング（高カーディナリティ）</td><td>FARM_FINGERPRINT() mod N</td></tr>
<tr><td>特徴量の正規化</td><td>BigQuery MLのML.STANDARD_SCALER()</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> 「学習-推論の一貫性」や「複数モデル間での特徴量の再利用」→ <strong>Vertex AI Feature Store</strong>。「BigQueryデータから大規模に特徴量を計算」→ BigQueryウィンドウ関数 + スケジュールクエリ。</p>
</blockquote>

<h2 id="feature-monitoring"><strong>6. 特徴量ドリフトモニタリング</strong></h2>

<table>
<thead><tr><th>タイプ</th><th>何が変化するか</th><th>検出方法</th></tr></thead>
<tbody>
<tr><td><strong>特徴量スキュー</strong></td><td>学習時と推論時の特徴量分布が異なる</td><td>学習ベースラインと推論統計の比較</td></tr>
<tr><td><strong>特徴量ドリフト</strong></td><td>推論時の特徴量が時間とともに変化する</td><td>推論時の特徴量分布を毎日モニタリング</td></tr>
<tr><td><strong>ラベルドリフト</strong></td><td>ターゲット変数の分布が変化する</td><td>予測分布のシフトを追跡</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. 練習問題</strong></h2>

<p><strong>Q1：</strong> チームのMLモデルはテスト時に優れた精度を示しましたが、本番環境ではパフォーマンスが低下しています。調査の結果、平均購入額の特徴量がトレーニング時（過去のバッチデータを使用）とサービング時（リアルタイムルックアップを使用）で異なる方法で計算されていることが判明しました。この問題は何と呼ばれ、どのように解決すべきでしょうか？</p>
<ul>
<li>A) モデルドリフト — モデルをより頻繁に再トレーニングする</li>
<li>B) 学習-推論スキュー — Vertex AI Feature Storeを使用する ✓</li>
<li>C) データリーケージ — 購入額の特徴量を削除する</li>
<li>D) 過学習 — ドロップアウト層を追加する</li>
</ul>
<p><em>解説：学習-推論スキューは、特徴量が学習時と推論時で異なる方法で計算される場合に発生します。Vertex AI Feature Storeは、特徴量計算のための単一の信頼できるソースを提供し、学習データのエクスポートとオンラインサービングの両方で同じロジックが使用されることを保証します。</em></p>

<p><strong>Q2：</strong> ある特徴量の値が$10から$10,000,000の範囲で、強い右偏りの分布を持っています。線形モデルで使用する前に最も適切な変換はどれでしょうか？</p>
<ul>
<li>A) One-Hotエンコーディング</li>
<li>B) Min-Max正規化</li>
<li>C) 対数変換 ✓</li>
<li>D) ラベルエンコーディング</li>
</ul>
<p><em>解説：対数変換は偏った分布のスケールを圧縮し、より正規分布に近い形にして線形モデルに適したものにします。Min-Max正規化では偏りが保持されます。One-Hotエンコーディングはカテゴリカルデータ用です。</em></p>

<p><strong>Q3：</strong> リアルタイム予測エンドポイントにミリ秒レベルのレイテンシで特徴量を提供するために最適化されたVertex AI Feature Storeのストアタイプはどれでしょうか？</p>
<ul>
<li>A) Offline Store（BigQuery）</li>
<li>B) Online Store（Bigtableバックエンド） ✓</li>
<li>C) Feature Catalog</li>
<li>D) Cloud Memorystore</li>
</ul>
<p><em>解説：Vertex AI Feature StoreのOnline StoreはBigtableバックエンドで、100ms未満のレイテンシルックアップ向けに設計されており、リアルタイム予測エンドポイントに最新の特徴量値を提供します。Offline StoreはBigQueryを使用し、バッチトレーニングデータの取得用です。</em></p>
