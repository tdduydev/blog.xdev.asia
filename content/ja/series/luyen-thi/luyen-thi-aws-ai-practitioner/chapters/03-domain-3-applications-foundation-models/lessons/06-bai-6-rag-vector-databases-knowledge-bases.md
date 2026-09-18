---
id: 019c9619-lt01-d3-l06
title: 'レッスン6：RAG、ベクトルデータベース、Bedrock Knowledge Bases'
slug: bai-6-rag-vector-databases-knowledge-bases
description: >-
  Retrieval-Augmented Generation（RAG）アーキテクチャ。
  ベクトルデータベース、エンベディング、チャンキング戦略。
  Amazon Bedrock Knowledge Bases。RAGとファインチューニングの比較。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 2
section_title: "ドメイン3：基盤モデルの応用（28%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS認定AIプラクティショナー（AIF-C01）試験対策'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai6-rag-architecture.webp" alt="RAGアーキテクチャ" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>RAGアーキテクチャ — Amazon Bedrock Knowledge Basesを使用したインデックスフェーズとクエリフェーズ</em></p>
</div>

<h2 id="rag-overview"><strong>1. RAGとは？</strong></h2>

<p><strong>Retrieval-Augmented Generation（RAG）</strong>は、FMと<strong>外部知識ソース</strong>を組み合わせて、より正確な回答を提供し、ハルシネーションを削減し、モデルが知らない情報を取り込む技術です。</p>

<h3 id="why-rag"><strong>1.1. なぜRAGが必要？</strong></h3>

<table>
<thead><tr><th>課題</th><th>RAGによる解決策</th></tr></thead>
<tbody>
<tr><td>知識のカットオフ日</td><td>最新のドキュメントを検索</td></tr>
<tr><td>ハルシネーション</td><td>実際のデータに基づいて回答</td></tr>
<tr><td>ドメイン知識がない</td><td>企業固有のドキュメントを追加</td></tr>
<tr><td>一般的な回答</td><td>特定のソースを引用</td></tr>
<tr><td>プライバシー — FMトレーニングにデータを送れない</td><td>データを自社のベクトルDBに保持</td></tr>
</tbody>
</table>

<h3 id="rag-flow"><strong>1.2. RAGアーキテクチャ</strong></h3>

<pre><code class="language-text">RAGパイプライン：

┌─────────────────────────────────────────────────────────────┐
│  インデックス作成（一度/定期的に実行）                          │
│                                                             │
│  ドキュメント → チャンキング → エンベディングモデル → ベクトルDB  │
│  (PDF, web,    (テキスト    (Amazon Titan       (OpenSearch, │
│   S3等)        分割)        Embeddings)         Aurora       │
│                                                 pgvector)   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  検索と生成（クエリごと）                                     │
│                                                             │
│  ユーザークエリ → クエリ埋め込み → ベクトルDB検索 → Top-K文書   │
│                                                             │
│  拡張プロンプト = システムプロンプト + 検索文書 + クエリ         │
│                                                             │
│  拡張プロンプト → 基盤モデル → ソース付き回答                   │
└─────────────────────────────────────────────────────────────┘
</code></pre>

<h2 id="chunking"><strong>2. チャンキング戦略</strong></h2>

<p>エンベディングを作成する前に、ドキュメントを適切なサイズのセグメントに<strong>分割（チャンキング）</strong>する必要があります。</p>

<table>
<thead><tr><th>戦略</th><th>説明</th><th>最適な用途</th></tr></thead>
<tbody>
<tr><td><strong>固定サイズ</strong></td><td>N文字/トークンごとに分割</td><td>シンプルで均一なドキュメント</td></tr>
<tr><td><strong>文ベース</strong></td><td>文の境界で分割</td><td>ナラティブテキスト</td></tr>
<tr><td><strong>段落ベース</strong></td><td>段落の区切りで分割</td><td>構造化されたドキュメント</td></tr>
<tr><td><strong>セマンティック</strong></td><td>トピックの変化に基づいて分割</td><td>複雑なドキュメント</td></tr>
<tr><td><strong>階層的</strong></td><td>親子チャンクの関係</td><td>セクションのある長文ドキュメント</td></tr>
</tbody>
</table>

<h3 id="chunk-size"><strong>チャンクサイズのトレードオフ：</strong></h3>

<pre><code class="language-text">小さなチャンク（100-200トークン）：
  ✓ より精密な検索
  ✗ コンテキストを失う可能性
  ✗ 検索するチャンクが増える

大きなチャンク（500-1000トークン）：
  ✓ より多くのコンテキストを保持
  ✗ 無関係な情報を含む可能性
  ✗ チャンクが少なく、粒度が低い

オーバーラップ（例：チャンク間で20%）：
  ✓ 境界での情報損失を防止
  ✗ ストレージと計算量が増加
</code></pre>

<blockquote>
<p><strong>試験のポイント：</strong>「RAG検索の精度を向上させるには？」→ <strong>チャンクサイズ</strong>の調整、<strong>オーバーラップ</strong>の追加、<strong>セマンティックチャンキング</strong>の使用、<strong>エンベディングモデル</strong>の改善。</p>
</blockquote>

<h2 id="embeddings"><strong>3. RAG用エンベディング</strong></h2>

<h3 id="embedding-models"><strong>3.1. AWSエンベディングモデル</strong></h3>

<table>
<thead><tr><th>モデル</th><th>モダリティ</th><th>次元数</th><th>ユースケース</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Titan Text Embeddings V2</strong></td><td>テキスト</td><td>256/512/1024</td><td>セマンティック検索、RAG</td></tr>
<tr><td><strong>Amazon Titan Multimodal Embeddings</strong></td><td>テキスト + 画像</td><td>256/384/1024</td><td>クロスモーダル検索</td></tr>
<tr><td><strong>Cohere Embed</strong></td><td>テキスト</td><td>1024</td><td>多言語検索</td></tr>
</tbody>
</table>

<h3 id="vector-db"><strong>3.2. AWS上のベクトルデータベース</strong></h3>

<table>
<thead><tr><th>サービス</th><th>タイプ</th><th>主な特徴</th></tr></thead>
<tbody>
<tr><td><strong>Amazon OpenSearch Serverless</strong></td><td>マネージド</td><td>ベクトル検索コレクションタイプ、サーバーレス</td></tr>
<tr><td><strong>Amazon Aurora PostgreSQL</strong></td><td>RDB + ベクトル</td><td>pgvector拡張</td></tr>
<tr><td><strong>Amazon Neptune</strong></td><td>グラフ + ベクトル</td><td>ベクトル検索付きナレッジグラフ</td></tr>
<tr><td><strong>Amazon DocumentDB</strong></td><td>ドキュメント + ベクトル</td><td>MongoDB互換、ベクトル検索付き</td></tr>
<tr><td><strong>Amazon MemoryDB</strong></td><td>インメモリ + ベクトル</td><td>Redis互換、超低レイテンシー</td></tr>
<tr><td><strong>Pinecone（サードパーティ）</strong></td><td>専用ベクトルDB</td><td>人気、Bedrockと統合</td></tr>
</tbody>
</table>

<h2 id="bedrock-kb"><strong>4. Amazon Bedrock Knowledge Bases</strong></h2>

<p><strong>Bedrock Knowledge Bases</strong>は<strong>フルマネージドのRAGソリューション</strong>です。AWSがチャンキング、エンベディング、インデックス作成、検索を処理します — データソースを指定するだけです。</p>

<h3 id="kb-architecture"><strong>4.1. 仕組み</strong></h3>

<pre><code class="language-text">セットアップ：
┌───────────┐     ┌───────────────┐     ┌─────────────────┐
│ S3バケット │────→│ Bedrock       │────→│ ベクトルストア    │
│ (文書)     │     │ Knowledge Base│     │ (OpenSearch/     │
│           │     │ (自動チャンク, │     │  Aurora/Pinecone) │
│           │     │  自動埋め込み) │     │                  │
└───────────┘     └───────────────┘     └─────────────────┘

クエリ：
┌───────────┐     ┌───────────────┐     ┌─────────────────┐
│ ユーザー   │────→│ Knowledge Base│────→│ FM (Claude,      │
│ "...とは   │     │ 関連文書を     │     │  Titan等)        │
│  何？"     │     │ 検索          │     │ 回答を生成       │
└───────────┘     └───────────────┘     └─────────────────┘
</code></pre>

<h3 id="kb-data-sources"><strong>4.2. サポートされるデータソース</strong></h3>

<ul>
<li><strong>Amazon S3</strong>：PDF、TXT、MD、HTML、DOC、CSV</li>
<li><strong>Webクローラー</strong>：ウェブサイトを自動クロール</li>
<li><strong>Confluence</strong>：Atlassian Confluenceページ</li>
<li><strong>SharePoint</strong>：Microsoft SharePointドキュメント</li>
<li><strong>Salesforce</strong>：Salesforceナレッジ記事</li>
</ul>

<h3 id="kb-features"><strong>4.3. 主な機能</strong></h3>

<table>
<thead><tr><th>機能</th><th>メリット</th></tr></thead>
<tbody>
<tr><td><strong>マネージドチャンキング</strong></td><td>ドキュメントを自動分割（固定、セマンティック、階層的）</td></tr>
<tr><td><strong>自動同期</strong></td><td>データ変更時に定期的に再インデックス</td></tr>
<tr><td><strong>ソース帰属</strong></td><td>回答とともにソースドキュメントを返す</td></tr>
<tr><td><strong>メタデータフィルタリング</strong></td><td>カスタムメタデータフィールドでチャンクをフィルタ</td></tr>
<tr><td><strong>ハイブリッド検索</strong></td><td>セマンティック + キーワード検索を組み合わせ</td></tr>
<tr><td><strong>ガードレール統合</strong></td><td>RAG回答に安全フィルタを適用</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のポイント：</strong>「S3に保存された社内ドキュメントから質問に回答するチャットボットを、最小限のカスタムコードで構築したい」→ <strong>Amazon Bedrock Knowledge Bases</strong>。</p>
</blockquote>

<h2 id="rag-vs-finetuning"><strong>5. RAG vs ファインチューニング</strong></h2>

<table>
<thead><tr><th>要素</th><th>RAG</th><th>ファインチューニング</th></tr></thead>
<tbody>
<tr><td><strong>目的</strong></td><td>外部/最新データへのアクセス</td><td>新しいスキル/ドメインパターンの習得</td></tr>
<tr><td><strong>データの鮮度</strong></td><td>常に最新</td><td>トレーニング時点で固定</td></tr>
<tr><td><strong>トレーニング必要？</strong></td><td>モデルトレーニング不要</td><td>はい、ラベル付きデータ + 計算リソースが必要</td></tr>
<tr><td><strong>コスト</strong></td><td>ベクトルDB + 検索コスト</td><td>トレーニング計算 + ストレージ</td></tr>
<tr><td><strong>ハルシネーション</strong></td><td>削減（データに基づく）</td><td>まだハルシネーションの可能性あり</td></tr>
<tr><td><strong>レイテンシー</strong></td><td>やや高い（検索ステップ）</td><td>ベースモデルと同じ</td></tr>
<tr><td><strong>最適な用途</strong></td><td>Q&A、検索、ナレッジベース</td><td>スタイル、トーン、ドメイン固有パターン</td></tr>
<tr><td><strong>データプライバシー</strong></td><td>データは自社ベクトルDBに保持</td><td>データはトレーニングプロセスで使用</td></tr>
</tbody>
</table>

<h3 id="when-to-use"><strong>判断マトリクス：</strong></h3>

<pre><code class="language-text">「社内文書から回答が必要？」              → RAG
「リアルタイム/最新情報が必要？」          → RAG
「モデルの文体を変えたい？」              → ファインチューニング
「特定のフォーマットに従わせたい？」       → まずプロンプティング → 次にファインチューニング
「ドメイン固有の用語が必要？」            → RAG（文書内）またはファインチューニング（パターン）
「最小限の労力/コスト？」                → RAG > プロンプトエンジニアリング > ファインチューニング
</code></pre>

<h2 id="rag-evaluation"><strong>6. RAG品質の評価</strong></h2>

<table>
<thead><tr><th>指標</th><th>測定内容</th></tr></thead>
<tbody>
<tr><td><strong>忠実性（Faithfulness）</strong></td><td>回答が検索文書に基づいているか？（ハルシネーションなし）</td></tr>
<tr><td><strong>関連性（Relevance）</strong></td><td>検索されたドキュメントはクエリに関連しているか？</td></tr>
<tr><td><strong>回答の正確性</strong></td><td>最終的な回答は事実として正しいか？</td></tr>
<tr><td><strong>コンテキスト精度</strong></td><td>検索されたチャンクのうち実際に関連するものの割合は？</td></tr>
<tr><td><strong>コンテキスト再現率</strong></td><td>関連するチャンクをすべて検索できたか？</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>7. 練習問題</strong></h2>

<p><strong>Q1：</strong>ヘルスケア企業がAmazon S3に保存された最新の医学研究論文から質問に回答するAIアシスタントを求めています。情報は毎週更新されます。最も適切なアプローチはどれですか？</p>
<ul>
<li>A) 論文で基盤モデルをファインチューニングする</li>
<li>B) Amazon Bedrock Knowledge BasesでRAGを使用する ✓</li>
<li>C) 大きなコンテキストウィンドウでZero-shotプロンプティングを使用する</li>
<li>D) 医療データでカスタムモデルを事前トレーニングする</li>
</ul>
<p><em>解説：Bedrock Knowledge BasesによるRAGが理想的です。S3ドキュメントを自動的にインデックスし、クエリごとに関連情報を検索し、再トレーニングなしで回答を最新に保ちます。毎週の更新は自動同期で処理されます。</em></p>

<p><strong>Q2：</strong>RAGパイプラインでドキュメントをチャンキングする主な目的は何ですか？</p>
<ul>
<li>A) ストレージコストを削減するため</li>
<li>B) ドキュメントをエンベディングと検索のために管理可能な断片に分割するため ✓</li>
<li>C) 機密データを暗号化するため</li>
<li>D) ドキュメントを別のファイル形式に変換するため</li>
</ul>
<p><em>解説：チャンキングは大きなドキュメントを、個別に埋め込みと検索が可能な、意味的に意味のある小さな断片に分割します。これにより、ドキュメント全体を処理するのではなく、関連情報の精密な検索が可能になります。</em></p>

<p><strong>Q3：</strong>企業がRAGアプリケーションを構築しましたが、検索されたドキュメントに裏付けられていない回答を返すことがあります。改善に注力すべき指標はどれですか？</p>
<ul>
<li>A) コンテキスト再現率</li>
<li>B) 回答の長さ</li>
<li>C) 忠実性（Faithfulness） ✓</li>
<li>D) 応答レイテンシー</li>
</ul>
<p><em>解説：忠実性は、生成された回答が検索されたドキュメントに基づいているかどうかを測定します。忠実性が低い場合、モデルは検索されたコンテキストが裏付ける以上の情報を生成していることを意味します（RAGコンテキストでのハルシネーション）。</em></p>
