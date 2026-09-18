---
id: 019c9619-lt01-d2-l04
title: 'レッスン4：LLM、Transformer、マルチモーダルモデル'
slug: bai-4-llm-transformers-multimodal
description: >-
  Transformerアーキテクチャ：Attention機構、Self-Attention。
  GPT（デコーダのみ）、BERT（エンコーダのみ）、T5（エンコーダ-デコーダ）。
  マルチモーダルモデル。ハルシネーション：原因と対策。
  エンベディングとベクトル表現。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 2
section_title: "ドメイン2：生成AIの基礎（24%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS認定AIプラクティショナー（AIF-C01）試験対策'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai4-transformer-architecture.webp" alt="Transformerアーキテクチャ" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Transformerアーキテクチャ — エンコーダスタック、デコーダスタック、BERT/GPT/T5のバリアント</em></p>
</div>

<h2 id="transformer"><strong>1. Transformerアーキテクチャ</strong></h2>

<p>Transformerは<strong>NLPに革命をもたらした</strong>ニューラルネットワークアーキテクチャで、2017年の論文「Attention Is All You Need」で発表されました。現在のほぼすべてのLLMはTransformerに基づいています。</p>

<h3 id="attention"><strong>1.1. Self-Attention機構</strong></h3>

<p>Self-Attentionにより、モデルは距離に関係なく、入力内の<strong>すべての単語間の関係</strong>を考慮できます。</p>

<pre><code class="language-text">Input: "The cat sat on the mat because it was tired"

Self-Attentionが答える：「it」は何を指すか？
→ 「cat」に注目（高いAttentionスコア）
→ 「mat」ではない（低いAttentionスコア）

従来のRNNではこのような長距離依存関係の処理が困難でした。
</code></pre>

<h3 id="encoder-decoder"><strong>1.2. エンコーダ-デコーダアーキテクチャ</strong></h3>

<pre><code class="language-text">オリジナルのTransformer:
┌──────────────────────────┐
│        エンコーダ          │  ← 入力を理解
│  (Self-Attention +       │
│   Feed-Forward層)        │
├──────────────────────────┤
│        デコーダ            │  ← 出力を生成
│  (Masked Self-Attention +│
│   Cross-Attention +      │
│   Feed-Forward層)        │
└──────────────────────────┘
</code></pre>

<h3 id="transformer-types"><strong>1.3. 3種類のTransformer</strong></h3>

<table>
<thead><tr><th>種類</th><th>アーキテクチャ</th><th>最適な用途</th><th>モデル</th></tr></thead>
<tbody>
<tr><td><strong>エンコーダのみ</strong></td><td>エンコーダ</td><td>テキスト理解（分類、NER、感情分析）</td><td>BERT、RoBERTa、DistilBERT</td></tr>
<tr><td><strong>デコーダのみ</strong></td><td>デコーダ</td><td>テキスト生成（チャットボット、コンテンツ作成）</td><td>GPT-4、Claude、Llama</td></tr>
<tr><td><strong>エンコーダ-デコーダ</strong></td><td>両方</td><td>系列変換（翻訳、要約）</td><td>T5、BART</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のコツ：</strong>「テキスト生成に最適なアーキテクチャは？」→ <strong>デコーダのみ</strong>（GPT、Claude）。「テキスト分類に最適なアーキテクチャは？」→ <strong>エンコーダのみ</strong>（BERT）。</p>
</blockquote>

<h2 id="llm"><strong>2. 大規模言語モデル（LLM）</strong></h2>

<p>LLMはテキスト専用の基盤モデルで、大規模なテキストコーパスで訓練され、人間の言語を理解し生成します。</p>

<h3 id="llm-capabilities"><strong>2.1. LLMの能力</strong></h3>

<table>
<thead><tr><th>能力</th><th>説明</th><th>例</th></tr></thead>
<tbody>
<tr><td><strong>テキスト生成</strong></td><td>新しいテキストコンテンツを作成</td><td>記事、メール、物語</td></tr>
<tr><td><strong>要約</strong></td><td>長いテキストを凝縮</td><td>文書の要約</td></tr>
<tr><td><strong>翻訳</strong></td><td>言語間の変換</td><td>英語 → 日本語</td></tr>
<tr><td><strong>Q&A</strong></td><td>質問に回答</td><td>カスタマーサポート、FAQ</td></tr>
<tr><td><strong>コード生成</strong></td><td>コードの作成と説明</td><td>Amazon Q Developer</td></tr>
<tr><td><strong>テキスト分類</strong></td><td>テキストのカテゴリ分け</td><td>感情分析</td></tr>
<tr><td><strong>推論</strong></td><td>論理的分析</td><td>数学問題、ステップバイステップの推論</td></tr>
</tbody>
</table>

<h3 id="llm-limitations"><strong>2.2. LLMの制限</strong></h3>

<ul>
<li><strong>知識のカットオフ</strong>：訓練データのカットオフ日以降のイベントは知らない</li>
<li><strong>ハルシネーション</strong>：自信を持って誤った情報を生成する可能性</li>
<li><strong>コンテキストウィンドウの制限</strong>：無制限のテキストは処理できない</li>
<li><strong>リアルタイムデータなし</strong>：インターネットやライブデータにアクセス不可（拡張しない限り）</li>
<li><strong>高コスト</strong>：大規模モデルは推論に大量のコンピュートが必要</li>
<li><strong>バイアス</strong>：訓練データのバイアスを反映する可能性</li>
</ul>

<h2 id="embeddings"><strong>3. エンベディングとベクトル表現</strong></h2>

<p><strong>エンベディング</strong>はテキスト（または画像、音声）を機械が理解できる<strong>数値ベクトル</strong>に変換します。意味が似たテキストは多次元空間で互いに近いベクトルを持ちます。</p>

<pre><code class="language-text">Text: "King"     → [0.23, 0.87, -0.12, 0.45, ...]
Text: "Queen"    → [0.21, 0.89, -0.15, 0.43, ...]  ← 近いベクトル！
Text: "Banana"   → [0.91, -0.32, 0.67, -0.88, ...] ← 遠い

関係: King - Man + Woman ≈ Queen
</code></pre>

<h3 id="embeddings-use"><strong>試験でエンベディングが重要な理由：</strong></h3>

<ul>
<li><strong>セマンティック検索</strong>：意味に基づいて類似文書を検索（キーワードだけではなく）</li>
<li><strong>RAG</strong>：文書をエンベディングに変換、ベクトルDBに保存、関連コンテキストを取得</li>
<li><strong>クラスタリング</strong>：類似の文書/文をグループ化</li>
<li><strong>Amazon Titan Embeddings</strong>：テキストエンベディング作成専用のAWSモデル</li>
</ul>

<h3 id="vector-db"><strong>ベクトルデータベース</strong></h3>

<p>エンベディングを効率的に保存・検索：</p>

<table>
<thead><tr><th>ベクトルDB</th><th>備考</th></tr></thead>
<tbody>
<tr><td><strong>Amazon OpenSearch Serverless</strong></td><td>AWSマネージドのベクトル検索</td></tr>
<tr><td><strong>Amazon Aurora（pgvector）</strong></td><td>ベクトル拡張付きPostgreSQL</td></tr>
<tr><td><strong>Pinecone</strong></td><td>人気のサードパーティベクトルDB</td></tr>
<tr><td><strong>Amazon Bedrock Knowledge Bases</strong></td><td>マネージドRAG — 内部でベクトルストレージを管理</td></tr>
</tbody>
</table>

<h2 id="multimodal"><strong>4. マルチモーダルモデル</strong></h2>

<p><strong>マルチモーダルモデル</strong>は<strong>複数のデータタイプ</strong>（テキスト + 画像 + 音声 + 動画）のコンテンツを処理・生成できます。</p>

<h3 id="multimodal-examples"><strong>AWSでの例：</strong></h3>

<table>
<thead><tr><th>モデル</th><th>モダリティ</th><th>できること</th></tr></thead>
<tbody>
<tr><td><strong>Claude 3</strong>（Anthropic）</td><td>テキスト + 画像入力 → テキスト出力</td><td>画像の説明、チャートの分析、ビジュアルQ&A</td></tr>
<tr><td><strong>Amazon Titan Image Generator</strong></td><td>テキスト → 画像</td><td>テキストの説明から画像を生成</td></tr>
<tr><td><strong>Amazon Titan Multimodal Embeddings</strong></td><td>テキスト + 画像 → ベクトル</td><td>テキストと画像の横断検索</td></tr>
<tr><td><strong>Stable Diffusion</strong>（Stability AI）</td><td>テキスト → 画像</td><td>画像の生成と編集</td></tr>
</tbody>
</table>

<h3 id="multimodal-usecases"><strong>試験向けマルチモーダルのユースケース：</strong></h3>

<ul>
<li>「商品画像を分析して説明文を生成」→ マルチモーダルモデル（Claude 3 Vision）</li>
<li>「テキストの説明から商品画像を生成」→ テキスト→画像（Titan Image Generator、Stable Diffusion）</li>
<li>「テキスト文書と画像の両方を横断的に検索」→ マルチモーダルエンベディング</li>
</ul>

<h2 id="diffusion"><strong>5. 拡散モデル</strong></h2>

<p>拡散モデル（Stable Diffusionなど）の動作原理：</p>

<ol>
<li><strong>順方向プロセス</strong>：画像に徐々にノイズを追加し、純粋なノイズになるまで</li>
<li><strong>逆方向プロセス</strong>：ステップごとにノイズを除去し、新しい画像を生成</li>
</ol>

<pre><code class="language-text">訓練（順方向）:
クリーンな画像 → ノイズ追加 → さらにノイズ追加 → ... → 純粋なノイズ

生成（逆方向）:
純粋なノイズ → ノイズ除去 → さらにノイズ除去 → ... → 新しい画像
                           （テキストプロンプトによるガイド）
</code></pre>

<blockquote>
<p><strong>試験のコツ：</strong>詳細な数学は知る必要ありません。概念を理解してください：拡散モデルは<strong>テキストプロンプトに導かれて徐々にノイズを除去する</strong>ことで画像を生成します。</p>
</blockquote>

<h2 id="training-types"><strong>6. 事前学習 vs ファインチューニング vs プロンプティング</strong></h2>

<table>
<thead><tr><th>手法</th><th>内容</th><th>必要なデータ</th><th>コスト</th><th>使用タイミング</th></tr></thead>
<tbody>
<tr><td><strong>事前学習</strong></td><td>ゼロから訓練</td><td>数十億の例</td><td>$$$$</td><td>新しいFMの作成（プロバイダーが実施）</td></tr>
<tr><td><strong>ファインチューニング</strong></td><td>既存FMの追加訓練</td><td>数千の例</td><td>$$</td><td>ドメイン固有の知識</td></tr>
<tr><td><strong>プロンプトエンジニアリング</strong></td><td>より良い入力の作成</td><td>なし（少数の例）</td><td>$</td><td>迅速な適応、訓練不要</td></tr>
<tr><td><strong>RAG</strong></td><td>外部データで拡張</td><td>ナレッジベース</td><td>$</td><td>最新/独自データへのアクセス</td></tr>
</tbody>
</table>

<h3 id="decision-tree"><strong>試験向け決定木：</strong></h3>

<pre><code class="language-text">モデルに特定のドメイン知識が必要？
├── 知識は提供可能な文書にある？
│   └── はい → RAG（Bedrock Knowledge Bases）
│   └── いいえ、モデルがパターンを学習する必要がある →
│       ├── 数千の訓練例がある？ → ファインチューニング
│       └── 少数の例のみ？ → Few-shotプロンプティング
├── 一般知識で十分？ → プロンプトエンジニアリング（Zero-shot/Few-shot）
</code></pre>

<h2 id="practice-questions"><strong>7. 練習問題</strong></h2>

<p><strong>Q1：</strong>ある企業が、商品画像とテキストの説明の両方にわたって関連情報を検索したいと考えています。最も適切なモデルの種類はどれですか？</p>
<ul>
<li>A) テキストのみのLLM</li>
<li>B) マルチモーダルエンベディングモデル ✓</li>
<li>C) 拡散モデル</li>
<li>D) RNNモデル</li>
</ul>
<p><em>解説：マルチモーダルエンベディングモデルは、テキストと画像の両方を同じベクトル空間でベクトル表現に変換し、クロスモーダル検索を可能にします。</em></p>

<p><strong>Q2：</strong>チャットボットやコンテンツ作成などのテキスト生成タスクに最も適したTransformerアーキテクチャはどれですか？</p>
<ul>
<li>A) エンコーダのみ（BERT）</li>
<li>B) デコーダのみ（GPT、Claude） ✓</li>
<li>C) エンコーダ-デコーダ（T5）</li>
<li>D) 畳み込みニューラルネットワーク（CNN）</li>
</ul>
<p><em>解説：デコーダのみのアーキテクチャはトークンを1つずつ生成（自己回帰）し、現代のほとんどのチャットボットやテキストジェネレーターの基盤となっています。</em></p>

<p><strong>Q3：</strong>生成AIアプリケーションにおけるテキストエンベディングの目的は何ですか？</p>
<ul>
<li>A) ストレージ用にファイルを圧縮する</li>
<li>B) テキストを意味を捉えた数値ベクトルに変換する ✓</li>
<li>C) セキュリティのためにテキストを暗号化する</li>
<li>D) 言語間でテキストを翻訳する</li>
</ul>
<p><em>解説：エンベディングは意味を捉えたテキストの数値ベクトル表現です。類似したテキストは類似したベクトルを持ち、セマンティック検索、RAG、クラスタリングを可能にします。</em></p>
