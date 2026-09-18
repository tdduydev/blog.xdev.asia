---
id: 82fb04d8-e74e-4cf3-8b90-cfa274629073
title: '第7課：モデルデプロイ — エンドポイントと推論'
slug: bai-7-model-deployment
description: >-
  リアルタイムエンドポイント、バッチ変換、非同期推論、サーバーレス推論。
  マルチモデルエンドポイント、推論パイプライン。
  Elastic Inference、SageMaker Neo（エッジデプロイ）。
  Production VariantsによるA/Bテスト。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 7
section_title: "パート3：ML実装とオペレーション（20%）"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認定機械学習 - 専門知識 試験対策'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai7-deployment-options.webp" alt="SageMaker Model Deployment Options" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>SageMakerデプロイ：リアルタイムエンドポイント、サーバーレス、非同期推論、バッチ変換</em></p>
</div>

<h2 id="deployment-options"><strong>1. SageMakerデプロイオプション</strong></h2>

<p>SageMakerは複数の推論パターンを提供し、それぞれ異なるワークロードに適しています。MLS-C01試験では通常5〜8問出題されます。</p>

<blockquote>
<p><strong>試験のヒント：</strong> 主要な判断要素：レイテンシ要件、ボリューム、コスト、ペイロードサイズ。マッピング：リアルタイム（低レイテンシ）→ 非同期（大きなペイロード）→ サーバーレス（散発的）→ バッチ（レイテンシ不要）。</p>
</blockquote>

<table>
<thead><tr><th>デプロイタイプ</th><th>レイテンシ</th><th>スループット</th><th>コストモデル</th><th>最適な用途</th></tr></thead>
<tbody>
<tr><td><strong>リアルタイムエンドポイント</strong></td><td>ミリ秒</td><td>高</td><td>常時稼働（時間課金）</td><td>インタラクティブアプリ、API</td></tr>
<tr><td><strong>サーバーレス推論</strong></td><td>秒（コールドスタート）</td><td>可変</td><td>呼び出し課金</td><td>散発的、予測不可能なトラフィック</td></tr>
<tr><td><strong>非同期推論</strong></td><td>分</td><td>高（キュー）</td><td>処理課金</td><td>大きなペイロード、非緊急</td></tr>
<tr><td><strong>バッチ変換</strong></td><td>リアルタイムなし</td><td>非常に高</td><td>バッチジョブ課金</td><td>スケジュールされたオフライン予測</td></tr>
</tbody>
</table>

<h2 id="realtime-endpoint"><strong>2. リアルタイム推論</strong></h2>

<p>標準的なデプロイ — 永続エンドポイントが常時稼働し、同期的に応答します。</p>

<pre><code class="language-text">Real-time Endpoint Architecture:

Client ──→ HTTPS Request
              ↓
      SageMaker Endpoint
      ┌────────────────┐
      │  Model Server  │  ← Instance running 24/7
      │  (TorchServe,  │
      │  TensorFlow    │
      │  Serving, etc) │
      └────────────────┘
              ↓
         Response (ms)
</code></pre>

<h3 id="autoscaling"><strong>2.1. エンドポイントのオートスケーリング</strong></h3>

<p>エンドポイントはApplication Auto Scalingを通じて<strong>InvocationsPerInstance</strong>メトリクスに基づいてスケールできます。</p>

<h2 id="serverless"><strong>3. サーバーレス推論</strong></h2>

<p>トラフィックが<strong>不均一で予測困難</strong>な場合に適しています。AWSが自動スケールし、トラフィックがない場合は0までスケールダウンします。</p>

<table>
<thead><tr><th>機能</th><th>詳細</th></tr></thead>
<tbody>
<tr><td>コールドスタートレイテンシ</td><td>約1〜2秒（アイドル期間後の最初）</td></tr>
<tr><td>メモリ設定</td><td>1 GB → 6 GB</td></tr>
<tr><td>最大ペイロード</td><td>4 MB</td></tr>
<tr><td>料金</td><td>推論リクエスト + 処理時間あたり</td></tr>
</tbody>
</table>

<h2 id="async"><strong>4. 非同期推論</strong></h2>

<p><strong>大きなメディアファイル、長い処理時間</strong>に適しています。リクエストはキューに入り、レスポンスはS3に保存されます。</p>

<pre><code class="language-text">Async Inference Flow:

Client ──→ Upload payload to S3 ──→ Invoke Endpoint
                                          ↓
                                   Queue Request
                                          ↓
                               Process when instance available
                                          ↓
                                   Save output to S3
                                          ↓
                           SNS Notification → Client
</code></pre>

<table>
<thead><tr><th>機能</th><th>詳細</th></tr></thead>
<tbody>
<tr><td>最大ペイロード</td><td>1 GB（リアルタイムの6 MBに対して）</td></tr>
<tr><td>0までスケールダウン</td><td>可 — キューが空の場合スケールダウン</td></tr>
<tr><td>レスポンス</td><td>S3出力パス + SNS通知</td></tr>
</tbody>
</table>

<h2 id="batch-transform"><strong>5. バッチ変換</strong></h2>

<p><strong>データセット全体</strong>に対してスケジュールに従い予測を実行します。エンドポイントなし — 必要な時のみ実行。</p>

<pre><code class="language-text">Batch Transform:

Input S3 ──→ Batch Transform Job ──→ Output S3
  (CSV/       (ephemeral compute)      (CSV/JSON
  JSON/                                predictions)
  Parquet)           ↑
               No persistent endpoint
               Pay only when running
</code></pre>

<h2 id="multi-model"><strong>6. マルチモデルエンドポイント（MME）</strong></h2>

<p><strong>MME</strong>は1つのエンドポイントで<strong>複数のモデル</strong>をホストし、推論インフラストラクチャのコストを削減します。</p>

<table>
<thead><tr><th>機能</th><th>詳細</th></tr></thead>
<tbody>
<tr><td>コスト削減</td><td>1つのエンドポイントで数千のモデルに対応</td></tr>
<tr><td>動的ロード</td><td>モデルはオンデマンドでメモリにロード、キャッシュ</td></tr>
<tr><td>ユースケース</td><td>顧客ごとのモデルを持つSaaSマルチテナント</td></tr>
</tbody>
</table>

<h2 id="neo"><strong>7. SageMaker Neo — エッジデプロイ</strong></h2>

<p><strong>SageMaker Neo</strong>はモデルをコンパイルし、特定のハードウェア（エッジデバイス、モバイル）向けに最適化します。</p>

<pre><code class="language-text">Neo Workflow:

Trained Model (S3)
       ↓
  Neo Compiler
  (optimizes for target hardware)
       ↓
 Optimized Model
       ↓
    ├── Deploy to IoT Greengrass (edge)
    ├── Deploy to ARM devices
    └── Deploy to mobile (Android/iOS)
</code></pre>

<h2 id="cheat-sheet"><strong>8. チートシート — デプロイ判断</strong></h2>

<table>
<thead><tr><th>シナリオ</th><th>デプロイタイプ</th></tr></thead>
<tbody>
<tr><td>モバイルアプリ、リアルタイム応答（100ms未満）</td><td>リアルタイムエンドポイント</td></tr>
<tr><td>トラフィックが散発的（数リクエスト/時間）</td><td>サーバーレス推論</td></tr>
<tr><td>動画/音声処理（大きなファイル）</td><td>非同期推論</td></tr>
<tr><td>毎晩のデータセット全体への予測</td><td>バッチ変換</td></tr>
<tr><td>顧客固有の数千のモデル</td><td>マルチモデルエンドポイント</td></tr>
<tr><td>IoTエッジデバイスデプロイ</td><td>SageMaker Neo + Greengrass</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>9. 練習問題</strong></h2>

<p><strong>Q1:</strong> ある企業がピークショッピング時に100ms未満の応答時間を要求するeコマースチャットボットを運用しています。どのSageMaker推論タイプを使用すべきですか？</p>
<ul>
<li>A) バッチ変換</li>
<li>B) 非同期推論</li>
<li>C) サーバーレス推論</li>
<li>D) リアルタイムエンドポイント ✓</li>
</ul>
<p><em>解説：リアルタイムエンドポイントはミリ秒レイテンシの永続的な常時稼働推論を提供します。サーバーレスはコールドスタート遅延があり、非同期は非同期（100ms未満ではない）、バッチ変換はスケジュールされたオフライン処理用です。</em></p>

<p><strong>Q2:</strong> メディア企業が1GBの動画ファイルにML分類を実行したいと考えています。処理時間は緊急ではありません。最も適切なSageMaker推論オプションはどれですか？</p>
<ul>
<li>A) リアルタイムエンドポイント</li>
<li>B) サーバーレス推論</li>
<li>C) 非同期推論 ✓</li>
<li>D) バッチ変換</li>
</ul>
<p><em>解説：非同期推論は最大1GBのペイロードをサポートし、リクエストをキューに入れて処理するため、大きなメディアファイルに最適です。リアルタイムは6MBペイロード制限、サーバーレスは4MB制限です。</em></p>

<p><strong>Q3:</strong> あるSaaS企業が10,000のエンタープライズ顧客それぞれに個別のMLモデルを提供しています。各モデルを別々のエンドポイントでホストするとコストが高すぎます。最善の解決策はどれですか？</p>
<ul>
<li>A) すべてのモデルを1つの大きなモデルに統合</li>
<li>B) SageMakerマルチモデルエンドポイントを使用 ✓</li>
<li>C) 単一のバッチ変換ジョブですべてのモデルをデプロイ</li>
<li>D) 各モデルにサーバーレス推論を使用</li>
</ul>
<p><em>解説：マルチモデルエンドポイント（MME）は単一のエンドポイントで複数のモデルをホストし、オンデマンドで動的にメモリにロードします。各顧客が独自のモデルを持つマルチテナントシナリオ向けに設計されています。</em></p>
