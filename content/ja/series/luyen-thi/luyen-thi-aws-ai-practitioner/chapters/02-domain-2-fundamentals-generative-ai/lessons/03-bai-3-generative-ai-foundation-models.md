---
id: 019c9619-lt01-d2-l03
title: 'レッスン3：生成AIと基盤モデル'
slug: bai-3-generative-ai-foundation-models
description: >-
  生成AIとは何か。基盤モデル：事前学習、ファインチューニング。
  種類：テキスト→テキスト、テキスト→画像、テキスト→コード。トークン化。
  モデルパラメータ、推論、Temperature、Top-p、Top-k。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: "ドメイン2：生成AIの基礎（24%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS認定AIプラクティショナー（AIF-C01）試験対策'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai3-foundation-model-lifecycle.webp" alt="基盤モデルのライフサイクル" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>基盤モデルのライフサイクル — 事前学習、ファインチューニング、RAG、プロンプトエンジニアリング</em></p>
</div>

<h2 id="overview"><strong>ドメイン2の概要</strong></h2>

<p>ドメイン2は<strong>試験の24%</strong>を占め、2番目に大きなドメインです。生成AI、基盤モデル、そして従来のMLとの違いをしっかり理解する必要があります。</p>

<h2 id="what-is-genai"><strong>1. 生成AIとは？</strong></h2>

<p><strong>生成AI</strong>とは、訓練データから学んだパターンに基づいて<strong>新しいコンテンツ</strong>（テキスト、画像、コード、音声、動画）を<strong>作成</strong>することに焦点を当てたAIの一分野です。</p>

<h3 id="discriminative-vs-generative"><strong>識別AIと生成AI</strong></h3>

<table>
<thead><tr><th>側面</th><th>識別AI</th><th>生成AI</th></tr></thead>
<tbody>
<tr><td><strong>機能</strong></td><td>分類 / 予測</td><td>作成 / 生成</td></tr>
<tr><td><strong>出力</strong></td><td>ラベル、カテゴリ、数値</td><td>新しいコンテンツ（テキスト、画像、コード）</td></tr>
<tr><td><strong>例</strong></td><td>「このメールはスパムか？」→ はい/いいえ</td><td>「～についてのメールを書いて」→ 新しいメール</td></tr>
<tr><td><strong>モデル</strong></td><td>ロジスティック回帰、SVM、CNN分類器</td><td>GPT、Claude、Stable Diffusion、DALL-E</td></tr>
</tbody>
</table>

<h3 id="genai-modalities"><strong>生成AIのモダリティ</strong></h3>

<table>
<thead><tr><th>入力 → 出力</th><th>例</th><th>モデル</th></tr></thead>
<tbody>
<tr><td><strong>テキスト → テキスト</strong></td><td>チャットボット、要約、翻訳</td><td>GPT-4、Claude、Llama</td></tr>
<tr><td><strong>テキスト → 画像</strong></td><td>説明文からの画像生成</td><td>DALL-E、Stable Diffusion、Titan Image Generator</td></tr>
<tr><td><strong>テキスト → コード</strong></td><td>コード生成、デバッグ</td><td>CodeWhisperer、Copilot</td></tr>
<tr><td><strong>テキスト → 音声</strong></td><td>音声合成、音楽生成</td><td>Amazon Polly（TTS）</td></tr>
<tr><td><strong>画像 → テキスト</strong></td><td>画像キャプション、ビジュアルQ&A</td><td>Claude（マルチモーダル）、GPT-4V</td></tr>
<tr><td><strong>音声 → テキスト</strong></td><td>書き起こし</td><td>Amazon Transcribe、Whisper</td></tr>
</tbody>
</table>

<h2 id="foundation-models"><strong>2. 基盤モデル</strong></h2>

<p><strong>基盤モデル（FM）</strong>とは、<strong>大規模なデータセットで事前訓練</strong>され、多くの異なる下流タスクに適応できる非常に大きなAIモデルです。</p>

<h3 id="fm-characteristics"><strong>主な特徴</strong></h3>

<ul>
<li><strong>大規模な事前学習</strong>：数十億のデータポイント（インターネット上のテキスト、書籍、コード）で訓練</li>
<li><strong>汎用性</strong>：タスク固有の訓練なしに複数のタスクを処理可能</li>
<li><strong>適応性</strong>：特定のユースケースに対してファインチューニングやプロンプトで適応可能</li>
<li><strong>訓練コストが高い</strong>：大量のコンピュート（GPU/TPUクラスター）が必要</li>
<li><strong>APIでアクセス</strong>：ユーザーは訓練不要 — API経由で利用（Amazon Bedrock）</li>
</ul>

<h3 id="fm-lifecycle"><strong>基盤モデルのライフサイクル</strong></h3>

<pre><code class="language-text">┌─────────────────┐     ┌──────────────┐     ┌──────────────┐
│ 1. 事前学習      │────→│ 2. ファイン   │────→│ 3. 推論      │
│ （大量データ、    │     │ チューニング  │     │ （APIまたは   │
│  数十億パラメータ、│     │ （特定の      │     │  エンドポイント│
│  非常に高コスト） │     │  ドメインに   │     │  経由で利用）  │
│                 │     │  適応）       │     │              │
└─────────────────┘     └──────────────┘     └──────────────┘
   モデルプロバイダー        あなた/組織           ユーザー
 （Anthropic、Meta、                        （アプリケーション）
  Amazon など）
</code></pre>

<h2 id="tokenization"><strong>3. トークン化</strong></h2>

<p><strong>トークン化</strong>とは、テキストをモデルが理解できる小さな単位（<strong>トークン</strong>）に分割するプロセスです。</p>

<pre><code class="language-text">Input:  "Machine learning is amazing!"
Tokens: ["Machine", " learning", " is", " amazing", "!"]
         token_1    token_2      token_3  token_4    token_5

または（サブワードトークン化）:
Tokens: ["Mach", "ine", " learn", "ing", " is", " amaz", "ing", "!"]
</code></pre>

<h3 id="token-key-points"><strong>試験の重要ポイント：</strong></h3>

<ul>
<li><strong>トークン ≠ 単語</strong>：トークンは単語の一部、単語全体、または句読点になりうる</li>
<li><strong>コンテキストウィンドウ</strong>：モデルが一度に処理できる最大トークン数（入力 + 出力）</li>
<li><strong>トークン制限</strong>：モデルが「見る」ことができるテキスト量と生成可能な量を決定</li>
<li><strong>料金</strong>：API呼び出しは通常トークン単位で課金（入力トークン + 出力トークン）</li>
</ul>

<blockquote>
<p><strong>試験のコツ：</strong>コンテキストウィンドウのサイズは重要です。大きなコンテキスト = より長い文書を処理可能。ただし、コストが高くなり、速度が遅くなる可能性があります。</p>
</blockquote>

<h2 id="model-parameters"><strong>4. モデルパラメータと推論設定</strong></h2>

<h3 id="model-params"><strong>4.1. モデルパラメータ（訓練中に学習）</strong></h3>

<ul>
<li><strong>パラメータ</strong> = ニューラルネットワークの重みとバイアス</li>
<li>GPT-4：約1.7兆パラメータ、Claude：非公開、Llama 3：8B/70B/405B</li>
<li>パラメータが多い → 一般的により高性能だが、コストも高い</li>
</ul>

<h3 id="inference-params"><strong>4.2. 推論パラメータ（ユーザーが設定）</strong></h3>

<p>モデルを呼び出す際に<strong>推論パラメータ</strong>を調整できます：</p>

<table>
<thead><tr><th>パラメータ</th><th>範囲</th><th>制御する内容</th></tr></thead>
<tbody>
<tr><td><strong>Temperature</strong></td><td>0.0 → 1.0+</td><td>ランダム性/創造性。低 = 決定論的、集中。高 = 創造的、多様。</td></tr>
<tr><td><strong>Top-p（Nucleus）</strong></td><td>0.0 → 1.0</td><td>累積確率閾値。低い → より集中した語彙。</td></tr>
<tr><td><strong>Top-k</strong></td><td>1 → ∞</td><td>考慮する上位トークン数。低い → より予測可能。</td></tr>
<tr><td><strong>Max tokens</strong></td><td>1 → 上限</td><td>生成される出力の最大長。</td></tr>
<tr><td><strong>Stop sequences</strong></td><td>文字列</td><td>モデルに生成を停止させるテキスト。</td></tr>
</tbody>
</table>

<h3 id="temperature-guide"><strong>試験向けTemperatureガイド</strong></h3>

<pre><code class="language-text">Temperature = 0  →  最も決定論的（事実ベースのQ&A、コード、データ抽出）
Temperature = 0.3 → やや創造的（ビジネス文書、要約）
Temperature = 0.7 → 創造的（物語、ブレインストーミング、マーケティングコピー）
Temperature = 1.0+ → 非常にランダム（詩、創作 — ハルシネーションが増える可能性）
</code></pre>

<blockquote>
<p><strong>試験のコツ：</strong>「企業がカスタマーFAQに一貫した正確な回答を求めている」→ <strong>低いTemperature</strong>を使用。「企業が創造的なマーケティングスローガンを求めている」→ <strong>高いTemperature</strong>を使用。</p>
</blockquote>

<h2 id="hallucination"><strong>5. ハルシネーション</strong></h2>

<p><strong>ハルシネーション</strong>とは、モデルが<strong>自信に満ちているが不正確</strong>な出力を生成すること — 存在しない事実、引用、情報を捏造します。</p>

<h3 id="hallucination-causes"><strong>原因：</strong></h3>
<ul>
<li>訓練データの欠落や古い情報</li>
<li>モデルは本当に事実を「知っている」わけではない — 可能性の高い次のトークンを予測</li>
<li>曖昧な、または自由度の高すぎるプロンプト</li>
<li>高いTemperature設定</li>
</ul>

<h3 id="hallucination-mitigation"><strong>対策：</strong></h3>
<table>
<thead><tr><th>戦略</th><th>効果</th></tr></thead>
<tbody>
<tr><td><strong>RAG</strong>（検索拡張生成）</td><td>ナレッジベースの実際のデータで回答を根拠づける</td></tr>
<tr><td><strong>低いTemperature</strong></td><td>生成のランダム性を削減</td></tr>
<tr><td><strong>Guardrails</strong></td><td>出力のフィルタリング/検証（Amazon Bedrock Guardrails）</td></tr>
<tr><td><strong>より良いプロンプト</strong></td><td>「提供されたコンテキストに基づいてのみ回答」/「不明な場合は分からないと回答」</td></tr>
<tr><td><strong>ファインチューニング</strong></td><td>ドメイン固有の正確なデータでモデルを訓練</td></tr>
<tr><td><strong>人間によるレビュー</strong></td><td>Human-in-the-loopによる検証</td></tr>
</tbody>
</table>

<h2 id="fm-on-aws"><strong>6. AWS上の基盤モデル（Amazon Bedrock）</strong></h2>

<p>Amazon Bedrockは様々なプロバイダーの基盤モデルへのアクセスを提供します：</p>

<table>
<thead><tr><th>プロバイダー</th><th>モデル</th><th>強み</th></tr></thead>
<tbody>
<tr><td><strong>Anthropic</strong></td><td>Claude 3（Haiku、Sonnet、Opus）</td><td>推論力、安全性、長いコンテキスト</td></tr>
<tr><td><strong>Meta</strong></td><td>Llama 3</td><td>オープンソース、多目的</td></tr>
<tr><td><strong>Amazon</strong></td><td>Titan（Text、Embeddings、Image）</td><td>AWSネイティブ、RAG用エンベディング</td></tr>
<tr><td><strong>Mistral AI</strong></td><td>Mistral、Mixtral</td><td>効率的、高速推論</td></tr>
<tr><td><strong>Stability AI</strong></td><td>Stable Diffusion</td><td>画像生成</td></tr>
<tr><td><strong>Cohere</strong></td><td>Command、Embed</td><td>エンタープライズNLP、エンベディング</td></tr>
<tr><td><strong>AI21 Labs</strong></td><td>Jurassic</td><td>テキスト生成</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>7. 練習問題</strong></h2>

<p><strong>Q1：</strong>従来のMLモデルと比較した場合、基盤モデルの主な利点は何ですか？</p>
<ul>
<li>A) より小さくて高速</li>
<li>B) タスク固有の訓練なしに複数の下流タスクに適応できる ✓</li>
<li>C) 不正確な出力を決して生成しない</li>
<li>D) コンピュートリソースを必要としない</li>
</ul>
<p><em>解説：基盤モデルは大規模なデータセットで事前訓練されており、プロンプトやファインチューニングを通じて多くの異なるタスクに適応できます。サイズは大きく、ハルシネーションの可能性があり、コンピュートは依然として必要です。</em></p>

<p><strong>Q2：</strong>ある企業が生成AIモデルを使用しており、もっともらしいが事実と異なる情報を時々生成することに気づきました。この現象は何と呼ばれますか？</p>
<ul>
<li>A) 過学習</li>
<li>B) データドリフト</li>
<li>C) ハルシネーション ✓</li>
<li>D) バイアス</li>
</ul>
<p><em>解説：ハルシネーションとは、生成AIモデルが自信に満ちているが事実と異なる出力を生成する現象です。</em></p>

<p><strong>Q3：</strong>開発者が、生成AIチャットボットに最小限の創造性で一貫した事実に基づく回答を提供させたいと考えています。どの推論パラメータを調整すべきですか？</p>
<ul>
<li>A) Max tokensを非常に高い値に設定</li>
<li>B) Temperatureを0に近い値に設定 ✓</li>
<li>C) Temperatureを1に近い値に設定</li>
<li>D) Top-kの値を増やす</li>
</ul>
<p><em>解説：低いTemperatureはモデルをより決定論的で集中的にし、応答のランダム性と創造性を削減します。</em></p>
