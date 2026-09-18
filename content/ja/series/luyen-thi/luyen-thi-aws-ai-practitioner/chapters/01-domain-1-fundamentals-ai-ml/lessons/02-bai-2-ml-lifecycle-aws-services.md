---
id: 019c9619-lt01-d1-l02
title: 'レッスン2：ML開発ライフサイクルとAWS AIサービス概要'
slug: bai-2-ml-lifecycle-aws-services
description: >-
  MLパイプライン：データ収集→特徴量エンジニアリング→訓練→評価→デプロイ。
  AWS AI/MLサービススタック。SageMaker、Rekognition、Comprehend、Polly、
  Transcribe、Translate、Textract、Lex、Personalize、Forecast、Kendra。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 2
section_title: "ドメイン1：AIとMLの基礎（20%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS認定AIプラクティショナー（AIF-C01）試験対策'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai2-ml-lifecycle-pipeline.webp" alt="AWSにおけるML開発ライフサイクルパイプライン" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>ML開発ライフサイクルパイプラインとAWS AI/MLサービススタック</em></p>
</div>

<h2 id="ml-lifecycle"><strong>1. ML開発ライフサイクル</strong></h2>

<p>AIF-C01試験では、問題定義からデプロイ・監視までのML開発ライフサイクル全体を理解する必要があります。</p>

<pre><code class="language-text">┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│ 1. ビジネス  │───→│ 2. データ     │───→│ 3. 特徴量    │
│ 課題の定義   │    │ 収集と準備    │    │ エンジニア   │
│             │    │              │    │ リング       │
└─────────────┘    └──────────────┘    └──────────────┘
                                              │
┌─────────────┐    ┌──────────────┐    ┌──────┴───────┐
│ 6. 監視と    │←───│ 5. デプロイ   │←───│ 4. モデル    │
│ 再訓練       │    │ と推論       │    │ 訓練と評価   │
│             │    │              │    │              │
└─────────────┘    └──────────────┘    └──────────────┘
</code></pre>

<h3 id="step-1"><strong>ステップ1：ビジネス課題の定義</strong></h3>

<ul>
<li>その問題が本当にMLを必要とするか判断（ルールベースのアプローチで十分な場合もある）</li>
<li>成功指標（KPI）を定義</li>
<li>データの入手可能性を確認</li>
</ul>

<blockquote>
<p><strong>試験のコツ：</strong>「すべての問題にMLが必要なわけではない」。問題文が単純な問題を説明している場合、ルールベースのアプローチやルックアップテーブルで十分かもしれません。</p>
</blockquote>

<h3 id="step-2"><strong>ステップ2：データ収集と準備</strong></h3>

<ul>
<li><strong>データ収集</strong>：データベース、API、IoT、ログから収集</li>
<li><strong>データクレンジング</strong>：欠損値の処理、重複の除去、エラーの修正</li>
<li><strong>データラベリング</strong>：教師あり学習のためにデータにラベル付け → <strong>Amazon SageMaker Ground Truth</strong></li>
<li><strong>探索的データ分析（EDA）</strong>：分布や相関関係の可視化と理解</li>
</ul>

<h3 id="step-3"><strong>ステップ3：特徴量エンジニアリング</strong></h3>

<ul>
<li><strong>特徴量選択</strong>：重要な特徴量を選択し、ノイズを除去</li>
<li><strong>特徴量変換</strong>：正規化、スケーリング、エンコーディング</li>
<li><strong>特徴量作成</strong>：生データから新しい特徴量を作成</li>
<li>AWS：<strong>SageMaker Data Wrangler</strong>、<strong>SageMaker Feature Store</strong></li>
</ul>

<h3 id="step-4"><strong>ステップ4：モデル訓練と評価</strong></h3>

<ul>
<li>問題に適したアルゴリズムを選択</li>
<li>データを訓練/検証/テストセットに分割</li>
<li>モデルを訓練し、ハイパーパラメータを調整</li>
<li>適切な指標で評価（正解率、F1、RMSEなど）</li>
<li>AWS：<strong>Amazon SageMaker</strong>（完全なMLワークフロー向け）</li>
</ul>

<h3 id="step-5"><strong>ステップ5：デプロイと推論</strong></h3>

<ul>
<li><strong>リアルタイム推論</strong>：即時予測のためのエンドポイント</li>
<li><strong>バッチ推論</strong>：大量データをオフラインで処理</li>
<li><strong>エッジデプロイ</strong>：エッジデバイスでモデルを実行</li>
<li>AWS：<strong>SageMaker Endpoints</strong>、<strong>Lambda</strong>、<strong>IoT Greengrass</strong></li>
</ul>

<h3 id="step-6"><strong>ステップ6：監視と再訓練</strong></h3>

<ul>
<li><strong>モデルドリフト</strong>：データの変化に伴い時間とともにパフォーマンスが低下</li>
<li><strong>データドリフト</strong>：入力データの分布が変化</li>
<li><strong>コンセプトドリフト</strong>：入力と出力の関係が変化</li>
<li>対策：監視 → ドリフトの検出 → 新しいデータで再訓練</li>
<li>AWS：<strong>SageMaker Model Monitor</strong></li>
</ul>

<h2 id="aws-ai-stack"><strong>2. AWS AI/MLサービススタック</strong></h2>

<p>AWSは3層のAI/MLサービスを提供しています。高レベル（ML知識不要）から低レベル（フルコントロール）まで：</p>

<pre><code class="language-text">┌─────────────────────────────────────────────────────┐
│  レイヤー3：AIサービス（事前訓練済み、APIベース）        │
│  → Rekognition、Comprehend、Polly、Transcribe、      │
│    Translate、Textract、Lex、Personalize、Forecast    │
│  → ML専門知識不要                                    │
├─────────────────────────────────────────────────────┤
│  レイヤー2：MLサービス（マネージドプラットフォーム）      │
│  → Amazon SageMaker、SageMaker JumpStart             │
│  → Amazon Bedrock（GenAI）                           │
│  → ある程度のML専門知識が必要                          │
├─────────────────────────────────────────────────────┤
│  レイヤー1：MLフレームワークとインフラ                   │
│  → GPU/Inferentia搭載EC2、Deep Learning AMI、         │
│    Deep Learning Containers                          │
│  → 十分なML専門知識が必要                              │
└─────────────────────────────────────────────────────┘
</code></pre>

<h2 id="ai-services"><strong>3. AWS AIサービス — サマリーテーブル</strong></h2>

<p>このセクションは<strong>試験で非常に重要</strong>です。各サービスの機能と使用タイミングを知る必要があります。</p>

<h3 id="vision"><strong>3.1. コンピュータービジョン</strong></h3>

<table>
<thead><tr><th>サービス</th><th>機能</th><th>ユースケース</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Rekognition</strong></td><td>画像・動画の分析</td><td>顔検出、物体検出、コンテンツモデレーション、有名人認識、画像内テキスト（OCR）</td></tr>
<tr><td><strong>Amazon Textract</strong></td><td>文書からテキストとデータを抽出</td><td>請求書処理、ID書類の抽出、フォームデータ、表の抽出</td></tr>
<tr><td><strong>Amazon Lookout for Vision</strong></td><td>製造向け外観検査</td><td>組立ラインでの製品欠陥検出</td></tr>
</tbody>
</table>

<h3 id="nlp"><strong>3.2. 自然言語処理（NLP）</strong></h3>

<table>
<thead><tr><th>サービス</th><th>機能</th><th>ユースケース</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Comprehend</strong></td><td>NLP分析</td><td>感情分析、エンティティ抽出、キーフレーズ、言語検出、PII検出</td></tr>
<tr><td><strong>Amazon Translate</strong></td><td>ニューラル機械翻訳</td><td>リアルタイム翻訳、バッチ文書翻訳</td></tr>
<tr><td><strong>Amazon Kendra</strong></td><td>インテリジェントエンタープライズ検索</td><td>社内ナレッジ検索、FAQ、NLPによる文書検索</td></tr>
</tbody>
</table>

<h3 id="speech"><strong>3.3. 音声</strong></h3>

<table>
<thead><tr><th>サービス</th><th>機能</th><th>方向</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Polly</strong></td><td>テキスト読み上げ（TTS）</td><td>テキスト → 音声</td></tr>
<tr><td><strong>Amazon Transcribe</strong></td><td>音声認識（STT）</td><td>音声 → テキスト</td></tr>
<tr><td><strong>Amazon Lex</strong></td><td>対話型AI（チャットボット）</td><td>音声とテキストでチャットボットを構築（Alexaの基盤技術）</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のコツ：</strong>Polly = テキストから音声へ（Pollyが「話す」）。Transcribe = 音声からテキストへ（Transcribeが「書き起こす」）。</p>
</blockquote>

<h3 id="predictions"><strong>3.4. 予測とレコメンデーション</strong></h3>

<table>
<thead><tr><th>サービス</th><th>機能</th><th>ユースケース</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Personalize</strong></td><td>リアルタイムのパーソナライゼーションとレコメンデーション</td><td>商品レコメンデーション、パーソナライズコンテンツ</td></tr>
<tr><td><strong>Amazon Forecast</strong></td><td>時系列予測</td><td>需要計画、財務予測、リソースプランニング</td></tr>
<tr><td><strong>Amazon Fraud Detector</strong></td><td>オンライン不正検出</td><td>決済不正、偽アカウント、アカウント乗っ取り</td></tr>
</tbody>
</table>

<h2 id="sagemaker"><strong>4. Amazon SageMaker概要</strong></h2>

<p>SageMakerは<strong>フルマネージドMLプラットフォーム</strong>です。MLライフサイクル全体に必要なすべてを提供します。</p>

<h3 id="sagemaker-components"><strong>主要コンポーネント：</strong></h3>

<table>
<thead><tr><th>コンポーネント</th><th>目的</th></tr></thead>
<tbody>
<tr><td><strong>SageMaker Studio</strong></td><td>ML開発用IDE（Jupyterベース）</td></tr>
<tr><td><strong>SageMaker Ground Truth</strong></td><td>データラベリングサービス（人間 + ML支援）</td></tr>
<tr><td><strong>SageMaker Data Wrangler</strong></td><td>データ準備と変換（ノーコード）</td></tr>
<tr><td><strong>SageMaker Feature Store</strong></td><td>ML特徴量の保存と共有</td></tr>
<tr><td><strong>SageMaker Training</strong></td><td>ビルトインアルゴリズムによるマネージド訓練ジョブ</td></tr>
<tr><td><strong>SageMaker Autopilot</strong></td><td>AutoML — 自動モデル構築</td></tr>
<tr><td><strong>SageMaker JumpStart</strong></td><td>事前訓練済みモデルとソリューション（モデルハブ）</td></tr>
<tr><td><strong>SageMaker Endpoints</strong></td><td>リアルタイム推論のためのモデルデプロイ</td></tr>
<tr><td><strong>SageMaker Model Monitor</strong></td><td>デプロイ済みモデルのドリフト監視</td></tr>
<tr><td><strong>SageMaker Clarify</strong></td><td>バイアス検出とモデルの説明可能性</td></tr>
<tr><td><strong>SageMaker Canvas</strong></td><td>ビジネスユーザー向けノーコードML</td></tr>
</tbody>
</table>

<h3 id="sagemaker-decision"><strong>SageMaker vs AIサービスの使い分け</strong></h3>

<pre><code class="language-text">カスタムMLモデルが必要？ → SageMaker
事前訓練済みの機能が必要？ → AIサービス（Rekognition、Comprehendなど）
GenAI/基盤モデルが必要？ → Amazon Bedrock
ビジネスユーザー、ノーコード？ → SageMaker Canvas
</code></pre>

<h2 id="service-mapping"><strong>5. ユースケース → AWSサービスマッピング</strong></h2>

<p>これは試験で非常によく出題されるタイプの問題です：</p>

<table>
<thead><tr><th>ユースケース</th><th>AWSサービス</th></tr></thead>
<tbody>
<tr><td>写真の顔を検出</td><td>Amazon Rekognition</td></tr>
<tr><td>請求書からデータを抽出</td><td>Amazon Textract</td></tr>
<tr><td>カスタマーレビューの感情を分析</td><td>Amazon Comprehend</td></tr>
<tr><td>コンテンツを複数言語に翻訳</td><td>Amazon Translate</td></tr>
<tr><td>カスタマーサービスのチャットボットを構築</td><td>Amazon Lex</td></tr>
<tr><td>ブログ記事を音声に変換</td><td>Amazon Polly</td></tr>
<tr><td>会議の録音を書き起こし</td><td>Amazon Transcribe</td></tr>
<tr><td>商品レコメンデーション</td><td>Amazon Personalize</td></tr>
<tr><td>需要予測</td><td>Amazon Forecast</td></tr>
<tr><td>社内文書を検索</td><td>Amazon Kendra</td></tr>
<tr><td>不正取引を検出</td><td>Amazon Fraud Detector</td></tr>
<tr><td>訓練データにラベルを付ける</td><td>SageMaker Ground Truth</td></tr>
<tr><td>カスタムMLモデルを構築</td><td>Amazon SageMaker</td></tr>
<tr><td>ビジネスアナリスト向けノーコードML</td><td>SageMaker Canvas</td></tr>
<tr><td>LLMでテキストを生成</td><td>Amazon Bedrock</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>6. 練習問題</strong></h2>

<p><strong>Q1：</strong>ある企業が、スキャンした請求書からテキストと構造化データを自動的に抽出したいと考えています。どのAWSサービスを使用すべきですか？</p>
<ul>
<li>A) Amazon Comprehend</li>
<li>B) Amazon Rekognition</li>
<li>C) Amazon Textract ✓</li>
<li>D) Amazon Translate</li>
</ul>
<p><em>解説：Textractはスキャンした文書からテキスト、フォーム、テーブルを抽出するために特別に設計されています。Comprehendはテキストの意味を分析するもので、文書の抽出ではありません。Rekognitionは画像/動画の分析用です。</em></p>

<p><strong>Q2：</strong>データサイエンティストが、デプロイ済みモデルの予測精度がここ1ヶ月で低下していることに気づきました。入力データのパターンが変化しています。これは何と呼ばれますか？</p>
<ul>
<li>A) 過学習</li>
<li>B) 未学習</li>
<li>C) データドリフト ✓</li>
<li>D) 特徴量エンジニアリング</li>
</ul>
<p><em>解説：モデルの入力データの統計的特性が時間とともに変化し、パフォーマンスの低下を引き起こす場合、これをデータドリフトと呼びます。</em></p>

<p><strong>Q3：</strong>ML経験のないビジネスアナリストが、ビジュアルインターフェースを使ってMLモデルを構築できるAWSサービスはどれですか？</p>
<ul>
<li>A) SageMaker Studio</li>
<li>B) SageMaker Autopilot</li>
<li>C) SageMaker Canvas ✓</li>
<li>D) SageMaker JumpStart</li>
</ul>
<p><em>解説：SageMaker Canvasはビジネスアナリスト向けのノーコード、ビジュアルポイント&クリックインターフェースを提供します。Autopilotはモデル構築を自動化しますが、ある程度のML知識が必要です。JumpStartは事前訓練済みモデルを提供します。Studioは完全なML IDEです。</em></p>
