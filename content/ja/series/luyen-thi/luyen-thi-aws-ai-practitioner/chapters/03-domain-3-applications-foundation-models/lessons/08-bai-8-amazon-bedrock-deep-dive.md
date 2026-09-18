---
id: 019c9619-lt01-d3-l08
title: 'レッスン8：Amazon Bedrock 徹底解説'
slug: bai-8-amazon-bedrock-deep-dive
description: >-
  Amazon Bedrock：全機能。Agents、Guardrails、モデル評価。
  PartyRockプレイグラウンド。Amazon Q DeveloperとAmazon Q Business。
  適切なFMの選び方。料金モデル。
duration_minutes: 65
is_free: true
video_url: null
sort_order: 4
section_title: "ドメイン3：基盤モデルの応用（28%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS認定AIプラクティショナー（AIF-C01）試験対策'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai8-bedrock-architecture.webp" alt="Amazon Bedrockアーキテクチャ" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Amazon Bedrockアーキテクチャ — 基盤モデル、Agents、Guardrails、Knowledge Bases</em></p>
</div>

<h2 id="bedrock-overview"><strong>1. Amazon Bedrock概要</strong></h2>

<p><strong>Amazon Bedrock</strong>は、単一のAPIを通じて<strong>複数プロバイダーのFM</strong>へのアクセスを提供し、AIアプリケーションのカスタマイズ、デプロイ、セキュリティ保護のためのツールを備えたフルマネージドサービスです。</p>

<h3 id="bedrock-key-features"><strong>1.1. 主な価値提案</strong></h3>

<ul>
<li><strong>選択肢</strong>：Amazon、Anthropic、Meta、Mistral、Cohere、Stability AI、AI21 LabsのFMにアクセス</li>
<li><strong>カスタマイズ</strong>：ファインチューニング、継続的事前トレーニング、RAG（Knowledge Bases）</li>
<li><strong>セキュリティ</strong>：データはAWSアカウント内に保持、暗号化、モデルトレーニングに使用されない</li>
<li><strong>サーバーレス</strong>：管理するインフラなし</li>
<li><strong>統合</strong>：ネイティブAWSサービス統合（IAM、CloudWatch、CloudTrail）</li>
</ul>

<h3 id="fm-providers"><strong>1.2. Bedrock上の基盤モデルプロバイダー</strong></h3>

<table>
<thead><tr><th>プロバイダー</th><th>モデル</th><th>強み</th></tr></thead>
<tbody>
<tr><td><strong>Amazon</strong></td><td>Titan Text、Titan Embeddings、Titan Image Generator</td><td>汎用、エンベディング、画像生成</td></tr>
<tr><td><strong>Anthropic</strong></td><td>Claude 3 Haiku、Sonnet、Opus</td><td>複雑な推論、分析、ビジョン</td></tr>
<tr><td><strong>Meta</strong></td><td>Llama 2、Llama 3</td><td>オープンソース、カスタマイズ可能</td></tr>
<tr><td><strong>Mistral AI</strong></td><td>Mistral、Mixtral</td><td>高速、効率的、多言語</td></tr>
<tr><td><strong>Cohere</strong></td><td>Command、Embed</td><td>エンタープライズテキスト、多言語エンベディング</td></tr>
<tr><td><strong>Stability AI</strong></td><td>Stable Diffusion XL</td><td>画像生成</td></tr>
<tr><td><strong>AI21 Labs</strong></td><td>Jurassic</td><td>テキスト生成、要約</td></tr>
</tbody>
</table>

<h2 id="bedrock-features"><strong>2. Bedrock機能の詳細</strong></h2>

<h3 id="bedrock-agents"><strong>2.1. Amazon Bedrock Agents</strong></h3>

<p>Agentsにより、FMが自動的に計画、アクション実行、ツール使用を行い<strong>複数ステップのタスクを実行</strong>できます。</p>

<pre><code class="language-text">ユーザー: "来週金曜日にハノイから東京へのフライトを予約して"

Agentワークフロー：
1. 計画: フライト検索、空き確認、予約が必要
2. アクション: フライト検索API呼び出し → 利用可能なフライトを検索
3. 観察: 3便発見、最安値は$450
4. アクション: 予約API呼び出し → フライトを予約
5. 応答: "VN便 HAN→NRT、12月20日、$450を予約しました"
</code></pre>

<h3 id="agent-components"><strong>Agentの構成要素：</strong></h3>

<table>
<thead><tr><th>コンポーネント</th><th>目的</th></tr></thead>
<tbody>
<tr><td><strong>基盤モデル</strong></td><td>推論と計画を行う頭脳</td></tr>
<tr><td><strong>指示</strong></td><td>Agentの役割を定義するシステムプロンプト</td></tr>
<tr><td><strong>アクショングループ</strong></td><td>Agentが呼び出せるAPI（Lambda関数またはOpenAPIスキーマ）</td></tr>
<tr><td><strong>Knowledge Bases</strong></td><td>情報検索のためのRAGデータソース</td></tr>
<tr><td><strong>Guardrails</strong></td><td>安全性とコンプライアンスフィルタ</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のポイント：</strong>「AIアシスタントが注文状況の確認、在庫チェック、返品処理を行う必要がある」→ ビジネスAPIに接続されたアクショングループを持つ<strong>Bedrock Agent</strong>。</p>
</blockquote>

<h3 id="bedrock-guardrails"><strong>2.2. Amazon Bedrock Guardrails</strong></h3>

<p>GuardrailsはAIアプリケーションの<strong>安全性制御</strong>を実装します：</p>

<table>
<thead><tr><th>ガードレールタイプ</th><th>機能</th><th>例</th></tr></thead>
<tbody>
<tr><td><strong>コンテンツフィルタ</strong></td><td>有害コンテンツカテゴリをブロック</td><td>ヘイト、暴力、性的、侮辱</td></tr>
<tr><td><strong>禁止トピック</strong></td><td>特定のトピックをブロック</td><td>「競合製品について議論しない」</td></tr>
<tr><td><strong>ワードフィルタ</strong></td><td>特定の単語/フレーズをブロック</td><td>冒涜的表現、禁止用語</td></tr>
<tr><td><strong>PIIフィルタ</strong></td><td>PIIの検出と秘匿化</td><td>SSN、クレジットカード番号、メール</td></tr>
<tr><td><strong>コンテキストグラウンディング</strong></td><td>回答がコンテキストに基づいているか確認</td><td>RAGでのハルシネーション防止</td></tr>
</tbody>
</table>

<pre><code class="language-text">Guardrailsフロー：
ユーザー入力 → [入力Guardrails] → FM処理 → [出力Guardrails] → ユーザー
               チェック：                    チェック：
               - 禁止トピック                - 有害コンテンツ
               - 有害入力                   - 回答中のPII
               - 入力中のPII                - トピック外の回答
                                            - グラウンディングチェック
</code></pre>

<h3 id="bedrock-eval"><strong>2.3. モデル評価</strong></h3>

<p>特定のユースケースに対してFMを比較・評価：</p>

<ul>
<li><strong>自動評価</strong>：BERTScore、精度、毒性指標</li>
<li><strong>人間評価</strong>：人間のレビューアーによるカスタム基準評価</li>
<li><strong>A/B比較</strong>：モデルの並列比較</li>
<li><strong>カスタムタスク</strong>：独自のテストデータセットをアップロード</li>
</ul>

<h3 id="bedrock-playground"><strong>2.4. Bedrockプレイグラウンド</strong></h3>

<table>
<thead><tr><th>プレイグラウンド</th><th>ユースケース</th></tr></thead>
<tbody>
<tr><td><strong>テキストプレイグラウンド</strong></td><td>テキストモデルのインタラクティブテスト</td></tr>
<tr><td><strong>チャットプレイグラウンド</strong></td><td>会話モデルのテスト</td></tr>
<tr><td><strong>画像プレイグラウンド</strong></td><td>画像生成モデルのテスト</td></tr>
</tbody>
</table>

<h2 id="partyrock"><strong>3. Amazon PartyRock</strong></h2>

<p><strong>PartyRock</strong>はBedrockの<strong>無料、ノーコードのプレイグラウンド</strong>で、AWSアカウントやコーディングスキルなしで誰でもGenAIアプリを作成できます。</p>

<table>
<thead><tr><th>機能</th><th>詳細</th></tr></thead>
<tbody>
<tr><td><strong>AWSアカウント不要</strong></td><td>ソーシャルログインで無料利用</td></tr>
<tr><td><strong>コーディング不要</strong></td><td>ドラッグ&ドロップのアプリビルダー</td></tr>
<tr><td><strong>共有可能</strong></td><td>URLでアプリを共有</td></tr>
<tr><td><strong>ユースケース</strong></td><td>学習、プロトタイピング、実験</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のポイント：</strong>「技術に詳しくないマーケティングチームがAWSアカウントなしで生成AIを試したい」→ <strong>PartyRock</strong>。</p>
</blockquote>

<h2 id="amazon-q"><strong>4. Amazon Q</strong></h2>

<h3 id="q-developer"><strong>4.1. Amazon Q Developer</strong></h3>

<p>開発者向けAIコーディングアシスタント：</p>

<ul>
<li><strong>コード生成</strong>：自然言語からコードを記述</li>
<li><strong>コード説明</strong>：既存コードの説明</li>
<li><strong>コード変換</strong>：Javaバージョンアップグレード、.NETマイグレーション</li>
<li><strong>デバッグ</strong>：バグの特定と修正</li>
<li><strong>セキュリティスキャン</strong>：コードの脆弱性検出</li>
<li><strong>IDE統合</strong>：VS Code、JetBrains、AWSコンソール</li>
</ul>

<h3 id="q-business"><strong>4.2. Amazon Q Business</strong></h3>

<p>ビジネスユーザー向けAIアシスタント：</p>

<ul>
<li><strong>エンタープライズデータ接続</strong>：S3、SharePoint、Confluence、Salesforce等</li>
<li><strong>社内データへのQ&A</strong>：接続されたデータソースに基づいて回答</li>
<li><strong>アクセス制御を尊重</strong>：接続システムのACL</li>
<li><strong>プラグイン</strong>：チケット作成（Jira）、メール送信等</li>
</ul>

<h3 id="q-vs-bedrock"><strong>4.3. Amazon Q vs Bedrock</strong></h3>

<table>
<thead><tr><th>機能</th><th>Amazon Q</th><th>Amazon Bedrock</th></tr></thead>
<tbody>
<tr><td><strong>対象ユーザー</strong></td><td>エンドユーザー（開発者、ビジネス）</td><td>AIアプリを構築する開発者</td></tr>
<tr><td><strong>カスタマイズ</strong></td><td>限定的（データソース接続）</td><td>フル（ファインチューニング、RAG、Agent）</td></tr>
<tr><td><strong>マネージド</strong></td><td>フルマネージドアシスタント</td><td>FMへのAPI/SDKアクセス</td></tr>
<tr><td><strong>ユースケース</strong></td><td>生産性ツール</td><td>カスタムAIアプリケーションの構築</td></tr>
</tbody>
</table>

<h2 id="pricing"><strong>5. Bedrock料金モデル</strong></h2>

<table>
<thead><tr><th>料金モデル</th><th>仕組み</th><th>最適な用途</th></tr></thead>
<tbody>
<tr><td><strong>オンデマンド</strong></td><td>入出力トークンごとに課金</td><td>変動的で予測不能なワークロード</td></tr>
<tr><td><strong>プロビジョンドスループット</strong></td><td>予約済みモデルユニット（時間単位）</td><td>一定の本番ワークロード</td></tr>
<tr><td><strong>バッチ推論</strong></td><td>バッチジョブ送信（最大50%安価）</td><td>大規模、非リアルタイム処理</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のポイント：</strong>「予測可能なトラフィックのGenAIワークロードをコスト最適化？」→ <strong>プロビジョンドスループット</strong>。「数千のドキュメントを夜間処理？」→ <strong>バッチ推論</strong>。</p>
</blockquote>

<h2 id="choosing-fm"><strong>6. 適切なFMの選び方</strong></h2>

<pre><code class="language-text">意思決定フレームワーク：
┌─────────────────────────────────────────────────┐
│ 1. タスクタイプ                                   │
│    テキスト？画像？コード？マルチモーダル？           │
├─────────────────────────────────────────────────┤
│ 2. 複雑さ                                       │
│    単純な分類 → 小さなモデル                       │
│    複雑な推論 → 大きなモデル                       │
├─────────────────────────────────────────────────┤
│ 3. レイテンシー要件                               │
│    リアルタイム → 小さく高速なモデル (Haiku)        │
│    バッチ処理 → 大きなモデル (Opus)                │
├─────────────────────────────────────────────────┤
│ 4. コスト制約                                    │
│    予算限定 → 小さなモデル                        │
│    品質重視 → 大きなモデル                        │
├─────────────────────────────────────────────────┤
│ 5. カスタマイズニーズ                              │
│    ファインチューニング必要？サポートモデルを確認     │
│    LoRA？互換性を確認                             │
├─────────────────────────────────────────────────┤
│ 6. モデル評価で検証                               │
│    候補を並列比較                                 │
└─────────────────────────────────────────────────┘
</code></pre>

<h2 id="other-services"><strong>7. その他のAWS GenAIサービス</strong></h2>

<table>
<thead><tr><th>サービス</th><th>機能</th></tr></thead>
<tbody>
<tr><td><strong>Amazon CodeWhisperer</strong></td><td>Amazon Q Developerの一部に統合（コード提案）</td></tr>
<tr><td><strong>AWS App Studio</strong></td><td>自然言語でエンタープライズアプリを構築</td></tr>
<tr><td><strong>Amazon SageMaker JumpStart</strong></td><td>SageMakerでオープンソースFMをデプロイ</td></tr>
<tr><td><strong>Amazon Comprehend</strong></td><td>NLPサービス（感情分析、エンティティ、トピック — 組み込み）</td></tr>
<tr><td><strong>Amazon Transcribe</strong></td><td>音声からテキスト</td></tr>
<tr><td><strong>Amazon Polly</strong></td><td>テキストから音声</td></tr>
<tr><td><strong>Amazon Translate</strong></td><td>機械翻訳</td></tr>
<tr><td><strong>Amazon Rekognition</strong></td><td>画像/動画分析</td></tr>
<tr><td><strong>Amazon Textract</strong></td><td>ドキュメントからテキスト抽出（OCR+）</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>8. 練習問題</strong></h2>

<p><strong>Q1：</strong>小売企業がAIアシスタントを構築し、在庫確認、返品処理、カタログからの製品質問への回答を行いたいと考えています。どのAmazon Bedrock機能を使用すべきですか？</p>
<ul>
<li>A) Bedrock Guardrails</li>
<li>B) Bedrock Knowledge Basesのみ</li>
<li>C) アクショングループとKnowledge Basesを持つBedrock Agents ✓</li>
<li>D) Bedrockモデル評価</li>
</ul>
<p><em>解説：Bedrock Agentsは、API呼び出し（在庫/返品用のアクショングループ）と情報検索（製品カタログ用のKnowledge Bases）により複数ステップのタスクをオーケストレーションできます。</em></p>

<p><strong>Q2：</strong>生成AIアプリケーションが競合製品について議論することを防ぎ、個人識別情報（PII）をフィルタリングするために使用すべきAmazon Bedrock機能はどれですか？</p>
<ul>
<li>A) Bedrock Knowledge Bases</li>
<li>B) Bedrockカスタムモデル</li>
<li>C) Bedrock Guardrails ✓</li>
<li>D) Bedrock Agents</li>
</ul>
<p><em>解説：Guardrailsは禁止トピックフィルタリング（競合他社の議論をブロック）とPII検出/秘匿化を提供します。FM呼び出しの入力と出力の両方に適用できます。</em></p>

<p><strong>Q3：</strong>企業が基盤モデルを使用して50,000件の顧客レビューの感情分析を夜間処理したいと考えています。最もコスト効率の良いBedrock料金モデルはどれですか？</p>
<ul>
<li>A) オンデマンド料金</li>
<li>B) プロビジョンドスループット</li>
<li>C) バッチ推論 ✓</li>
<li>D) 無料利用枠</li>
</ul>
<p><em>解説：バッチ推論は大規模な非リアルタイムワークロード向けに設計されており、オンデマンド料金と比較して最大50%のコスト削減を提供します。夜間処理に最適です。</em></p>
