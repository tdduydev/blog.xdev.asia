---
id: 019c9619-lt01-d5-l11
title: 'レッスン11：AIセキュリティ、データプライバシー、コンプライアンス'
slug: bai-11-ai-security-data-privacy-compliance
description: >-
  AI/MLワークロード用IAM。保存時と転送時の暗号化。
  Bedrock/SageMaker用VPCエンドポイント。PII検出。
  AWSコンプライアンスプログラム。AI用データガバナンス。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 1
section_title: "ドメイン5：AIのセキュリティ、コンプライアンス、ガバナンス（14%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS認定AIプラクティショナー（AIF-C01）試験対策'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai11-ai-security-layers.webp" alt="AWS上のAIセキュリティレイヤー" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>AIセキュリティレイヤー：AWS上のネットワーク、ID、データ保護、AI固有の制御</em></p>
</div>

<h2 id="security-overview"><strong>1. AWS上のAIセキュリティ — 概要</strong></h2>

<p>AIワークロードには<strong>複数レイヤー</strong>でのセキュリティが必要です：データ、モデル、インフラストラクチャ、アプリケーション。</p>

<pre><code class="language-text">AIセキュリティレイヤー：
┌─────────────────────────────────────────┐
│  アプリケーションセキュリティ              │
│  Guardrails、入力検証、                  │
│  プロンプトインジェクション防止            │
├─────────────────────────────────────────┤
│  モデルセキュリティ                       │
│  モデルアクセス制御、バージョニング、      │
│  モデルの完全性、敵対的攻撃防御           │
├─────────────────────────────────────────┤
│  データセキュリティ                       │
│  暗号化、PII処理、データアクセス          │
│  制御、監査ログ                          │
├─────────────────────────────────────────┤
│  インフラストラクチャセキュリティ           │
│  VPC、セキュリティグループ、エンドポイント、│
│  ネットワーク分離、IAM                    │
└─────────────────────────────────────────┘
</code></pre>

<h2 id="iam"><strong>2. AI/MLワークロード用IAM</strong></h2>

<h3 id="iam-bedrock"><strong>2.1. Amazon Bedrock用IAM</strong></h3>

<table>
<thead><tr><th>権限</th><th>制御内容</th></tr></thead>
<tbody>
<tr><td><code>bedrock:InvokeModel</code></td><td>特定のFMの呼び出し</td></tr>
<tr><td><code>bedrock:InvokeModelWithResponseStream</code></td><td>ストリーミングモデル呼び出し</td></tr>
<tr><td><code>bedrock:CreateKnowledgeBase</code></td><td>RAGナレッジベースの作成</td></tr>
<tr><td><code>bedrock:CreateGuardrail</code></td><td>安全ガードレールの作成</td></tr>
<tr><td><code>bedrock:CreateModelCustomizationJob</code></td><td>ファインチューニングジョブの開始</td></tr>
</tbody>
</table>

<h3 id="iam-principles"><strong>2.2. AI用IAMのベストプラクティス</strong></h3>

<ul>
<li><strong>最小権限</strong>：ロールごとに必要な権限のみを付与</li>
<li><strong>ロールの分離</strong>：データサイエンティスト、MLエンジニア、管理者で異なるロール</li>
<li><strong>リソースベースポリシー</strong>：特定のモデルへのアクセスを制限</li>
<li><strong>サービスリンクロール</strong>：AWSサービスが必要に応じてロールを引き受ける</li>
<li><strong>条件キー</strong>：IP、VPC、時間、MFAで制限</li>
</ul>

<blockquote>
<p><strong>試験のポイント：</strong>「Bedrockでチームが使用できる基盤モデルを制限するには？」→ <code>bedrock:InvokeModel</code>と特定モデルの<strong>リソースARN</strong>を持つIAMポリシー。</p>
</blockquote>

<h2 id="encryption"><strong>3. データ暗号化</strong></h2>

<h3 id="encryption-rest"><strong>3.1. 保存時の暗号化</strong></h3>

<table>
<thead><tr><th>サービス</th><th>デフォルト暗号化</th><th>カスタムキー（KMS）</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Bedrock</strong></td><td>AWSマネージドキー</td><td>カスタマーマネージドKMSキー</td></tr>
<tr><td><strong>SageMakerトレーニング</strong></td><td>AWSマネージドキー</td><td>カスタマーマネージドKMSキー</td></tr>
<tr><td><strong>SageMakerノートブック</strong></td><td>AWSマネージドキー</td><td>カスタマーマネージドKMSキー</td></tr>
<tr><td><strong>S3（トレーニングデータ）</strong></td><td>SSE-S3</td><td>SSE-KMS、SSE-C</td></tr>
<tr><td><strong>Knowledge Basesベクトル</strong></td><td>ベクトルDBに依存</td><td>KMS暗号化対応</td></tr>
</tbody>
</table>

<h3 id="encryption-transit"><strong>3.2. 転送時の暗号化</strong></h3>

<ul>
<li>すべてのAWS API呼び出しはデフォルトで<strong>TLS 1.2+</strong>を使用</li>
<li>Bedrock API呼び出しは転送時に暗号化</li>
<li>SageMakerエンドポイントはHTTPSを使用</li>
<li>ノード間トレーニング通信：暗号化済み</li>
</ul>

<h3 id="kms"><strong>3.3. AI用AWS KMS</strong></h3>

<pre><code class="language-text">AWS KMSが必要な場合：
✓ 暗号化キーの管理
✓ キーローテーションポリシー
✓ キー使用のCloudTrail監査
✓ クロスアカウントキー共有
✓ コンプライアンス要件（HIPAA、PCI-DSS）
</code></pre>

<h2 id="network"><strong>4. ネットワークセキュリティ</strong></h2>

<h3 id="vpc-endpoints"><strong>4.1. AIサービス用VPCエンドポイント</strong></h3>

<p><strong>VPCエンドポイント</strong>を使用すると、AWS AIサービスにプライベートにアクセスでき、トラフィックはインターネットを経由しません。</p>

<pre><code class="language-text">VPCエンドポイントなし：
VPC内のアプリ → インターネットゲートウェイ → パブリックインターネット → Bedrock API

VPCエンドポイント（PrivateLink）あり：
VPC内のアプリ → VPCエンドポイント → AWSプライベートネットワーク → Bedrock API
                （インターネットなし！）
</code></pre>

<table>
<thead><tr><th>サービス</th><th>VPCエンドポイントタイプ</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Bedrock</strong></td><td>インターフェース（PrivateLink）</td></tr>
<tr><td><strong>SageMaker Runtime</strong></td><td>インターフェース（PrivateLink）</td></tr>
<tr><td><strong>SageMaker API</strong></td><td>インターフェース（PrivateLink）</td></tr>
<tr><td><strong>Amazon S3</strong></td><td>ゲートウェイまたはインターフェース</td></tr>
</tbody>
</table>

<h3 id="sagemaker-network"><strong>4.2. SageMakerネットワーク分離</strong></h3>

<ul>
<li><strong>VPCモード</strong>：VPC内でトレーニング/推論を実行</li>
<li><strong>ネットワーク分離</strong>：コンテナへのインターネットアクセスなし（EnableNetworkIsolation=true）</li>
<li><strong>セキュリティグループ</strong>：インバウンド/アウトバウンドトラフィックの制御</li>
<li><strong>プライベートサブネット</strong>：直接的なインターネットアクセスなし</li>
</ul>

<blockquote>
<p><strong>試験のポイント：</strong>「Bedrock API呼び出しがパブリックインターネットを経由しないようにするには？」→ Amazon Bedrock用<strong>VPCエンドポイント</strong>（AWS PrivateLink）。</p>
</blockquote>

<h2 id="pii"><strong>5. PII検出とデータプライバシー</strong></h2>

<h3 id="pii-services"><strong>5.1. PII検出サービス</strong></h3>

<table>
<thead><tr><th>サービス</th><th>PII機能</th><th>データタイプ</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Comprehend</strong></td><td>PIIエンティティの検出と秘匿化</td><td>テキスト</td></tr>
<tr><td><strong>Amazon Macie</strong></td><td>S3バケット内のPIIの発見</td><td>S3内のファイル</td></tr>
<tr><td><strong>Bedrock Guardrails</strong></td><td>FM入出力でのPIIのブロック/匿名化</td><td>FMプロンプト/レスポンス</td></tr>
<tr><td><strong>AWS Glue DataBrew</strong></td><td>データパイプラインでのPII検出</td><td>構造化データ</td></tr>
</tbody>
</table>

<h3 id="pii-types"><strong>5.2. 試験で出る一般的なPIIタイプ</strong></h3>

<table>
<thead><tr><th>PIIタイプ</th><th>例</th></tr></thead>
<tbody>
<tr><td><strong>直接識別子</strong></td><td>氏名、SSN、メール、電話、パスポート番号</td></tr>
<tr><td><strong>金融</strong></td><td>クレジットカード番号、銀行口座、納税者番号</td></tr>
<tr><td><strong>健康</strong></td><td>診療記録番号、健康状態（PHI）</td></tr>
<tr><td><strong>位置情報</strong></td><td>自宅住所、GPS座標</td></tr>
<tr><td><strong>デジタル</strong></td><td>IPアドレス、デバイスID、ログイン資格情報</td></tr>
</tbody>
</table>

<h2 id="bedrock-security"><strong>6. Amazon Bedrockのセキュリティ</strong></h2>

<h3 id="bedrock-data"><strong>6.1. Bedrockのデータプライバシー</strong></h3>

<ul>
<li><strong>データ分離</strong>：お客様のデータはベースFMのトレーニングに使用されません</li>
<li><strong>データはリージョン内に保持</strong>：選択したAWSリージョンで処理</li>
<li><strong>カスタムモデル</strong>：ファインチューニングしたモデルはアカウントに対してプライベート</li>
<li><strong>データ共有なし</strong>：プロンプト/レスポンスはモデルプロバイダーと共有されません</li>
<li><strong>暗号化</strong>：すべてのデータが保存時と転送時に暗号化</li>
</ul>

<h3 id="bedrock-logging"><strong>6.2. 監視とログ</strong></h3>

<table>
<thead><tr><th>サービス</th><th>ログ内容</th></tr></thead>
<tbody>
<tr><td><strong>AWS CloudTrail</strong></td><td>API呼び出し（誰がどのモデルをいつ呼び出したか）</td></tr>
<tr><td><strong>Amazon CloudWatch</strong></td><td>モデル呼び出しメトリクス（レイテンシー、エラー、トークン）</td></tr>
<tr><td><strong>Bedrockモデル呼び出しログ</strong></td><td>完全なプロンプトとレスポンス（S3またはCloudWatchへ）</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のポイント：</strong>「どのユーザーがBedrockモデルを呼び出しているか監査するには？」→ <strong>CloudTrail</strong>。「実際のプロンプトとレスポンスをログに記録するには？」→ <strong>Bedrockモデル呼び出しログ</strong>。</p>
</blockquote>

<h2 id="compliance"><strong>7. コンプライアンスとガバナンス</strong></h2>

<h3 id="compliance-programs"><strong>7.1. AWSコンプライアンスプログラム</strong></h3>

<table>
<thead><tr><th>プログラム</th><th>内容</th><th>関連AIサービス</th></tr></thead>
<tbody>
<tr><td><strong>SOC 1/2/3</strong></td><td>セキュリティ制御の監査</td><td>Bedrock、SageMaker</td></tr>
<tr><td><strong>HIPAA</strong></td><td>ヘルスケアデータの保護</td><td>SageMaker、Comprehend Medical</td></tr>
<tr><td><strong>GDPR</strong></td><td>EUデータプライバシー</td><td>すべてのAWSサービス（データレジデンシー）</td></tr>
<tr><td><strong>PCI-DSS</strong></td><td>決済カードデータのセキュリティ</td><td>SageMaker（制御付き）</td></tr>
<tr><td><strong>FedRAMP</strong></td><td>米国政府クラウドセキュリティ</td><td>GovCloudリージョン</td></tr>
<tr><td><strong>ISO 27001</strong></td><td>情報セキュリティ管理</td><td>Bedrock、SageMaker</td></tr>
</tbody>
</table>

<h3 id="shared-responsibility"><strong>7.2. AI用共有責任モデル</strong></h3>

<pre><code class="language-text">お客様の責任（「クラウド内のセキュリティ」）：
├── トレーニングデータの品質とバイアス
├── モデルの選択と評価
├── プロンプト設計とガードレールの設定
├── IAM権限とアクセス制御
├── PII処理とデータ分類
├── アプリケーションレベルのセキュリティ
└── 業界規制への準拠

AWSの責任（「クラウドのセキュリティ」）：
├── 物理インフラストラクチャのセキュリティ
├── ネットワークとハードウェアのセキュリティ
├── ベースFMプロバイダーの管理
├── サービスの可用性と信頼性
├── 暗号化の実装
└── コンプライアンス認証
</code></pre>

<h2 id="data-governance"><strong>8. AI用データガバナンス</strong></h2>

<table>
<thead><tr><th>プラクティス</th><th>AWSサービス</th></tr></thead>
<tbody>
<tr><td>データカタログ</td><td>AWS Glue Data Catalog</td></tr>
<tr><td>データ分類</td><td>Amazon Macie</td></tr>
<tr><td>アクセス制御</td><td>AWS Lake Formation</td></tr>
<tr><td>データリネージュ</td><td>SageMaker MLリネージュトラッキング</td></tr>
<tr><td>データ品質</td><td>SageMaker Data Wrangler、Glue DataBrew</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>9. 練習問題</strong></h2>

<p><strong>Q1：</strong>金融サービス企業がAmazon Bedrockを使用したいが、API呼び出しがパブリックインターネットを経由しないことを要求しています。何を設定すべきですか？</p>
<ul>
<li>A) AWS Direct Connect</li>
<li>B) Bedrock用VPCエンドポイント（AWS PrivateLink） ✓</li>
<li>C) VPN接続</li>
<li>D) CloudFrontディストリビューション</li>
</ul>
<p><em>解説：Amazon Bedrock用のVPCインターフェースエンドポイント（PrivateLink）により、VPC内からインターネットを経由せずにプライベート接続が可能になります。</em></p>

<p><strong>Q2：</strong>AWSの共有責任モデルによると、トレーニングデータにバイアスが含まれないことを保証する責任は誰にありますか？</p>
<ul>
<li>A) AWS</li>
<li>B) 基盤モデルプロバイダー</li>
<li>C) お客様 ✓</li>
<li>D) AWSとお客様の両方が均等に</li>
</ul>
<p><em>解説：共有責任モデルでは、お客様は「クラウド内のセキュリティ」に責任があります — これにはトレーニングデータの品質、バイアス検出、倫理的なAIプラクティスが含まれます。AWSはインフラストラクチャのセキュリティに責任があります。</em></p>

<p><strong>Q3：</strong>企業がMLトレーニングにデータを使用する前に、どのS3バケットに個人識別情報（PII）が含まれているかを発見する必要があります。どのサービスを使用すべきですか？</p>
<ul>
<li>A) Amazon Comprehend</li>
<li>B) Amazon Macie ✓</li>
<li>C) Amazon Inspector</li>
<li>D) AWS Config</li>
</ul>
<p><em>解説：Amazon Macieは機械学習を使用して、Amazon S3バケットに保存された機密データ（PIIを含む）を自動的に検出・分類します。ComprehendはテキストのPIIを検出しますが、MacieはS3レベルの発見用に設計されています。</em></p>
