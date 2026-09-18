---
id: bb3d4aa7-2e63-49f6-a751-6323c5919325
title: '第9課：セキュリティとコスト最適化'
slug: bai-9-security-cost
description: >-
  SageMaker向けIAMロールとポリシー。VPC設定、PrivateLink。
  保存時の暗号化（KMS）と転送中の暗号化。Spot Training Instances。
  MLデータ向けS3ライフサイクルポリシー。インスタンスの適正化。
duration_minutes: 45
is_free: true
video_url: null
sort_order: 9
section_title: "パート3：ML実装とオペレーション（20%）"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認定機械学習 - 専門知識 試験対策'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai9-security-architecture.webp" alt="AWS ML Security Architecture" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>AWS MLにおけるセキュリティ：IAMロール、VPC分離、KMS暗号化、Spot Instancesによるコスト最適化</em></p>
</div>

<h2 id="iam-sagemaker"><strong>1. SageMaker向けIAM</strong></h2>

<p>SageMakerは<strong>IAMロール</strong>（ユーザーではなく）を使用してAWSリソースに対するアクションを実行します。これは試験で重要なセキュリティパターンです。</p>

<table>
<thead><tr><th>ロールタイプ</th><th>使用者</th><th>アクセスが必要なリソース</th></tr></thead>
<tbody>
<tr><td><strong>Execution Role</strong></td><td>SageMakerノートブック、Training Jobs、エンドポイント</td><td>S3、ECR、CloudWatch、KMS</td></tr>
<tr><td><strong>SageMaker Studio Role</strong></td><td>Studio IDEユーザー</td><td>データ、実験、パイプライン</td></tr>
<tr><td><strong>Training Job Role</strong></td><td>訓練コンテナ自体</td><td>入出力S3バケット</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> SageMakerの訓練/推論コンテナはEC2インスタンス認証情報を持ちません — IAMロールのクロスアカウントで実行されます。実行ロールにはS3とECRの権限を常に付与する必要があります。</p>
</blockquote>

<h2 id="vpc-security"><strong>2. SageMaker向けVPC設定</strong></h2>

<p>SageMakerワークロードを<strong>VPC</strong>内で実行し、トラフィックがパブリックインターネットを経由しないようにします。</p>

<pre><code class="language-text">SageMaker Network Security:

Internet ──✗────────────────────────────────────────
                                                    │
          ┌─── Private VPC ──────────────────────┐ │
          │                                       │ │
          │  SageMaker Training Instance          │ │
          │          ↓ (VPC Endpoint)             │ │
          │  ┌──── S3 Gateway Endpoint ────────┐  │ │
          │  │   ECR VPC Endpoint              │  │ │
          │  │   SageMaker API VPC Endpoint    │  │ │
          │  └─────────────────────────────────┘  │ │
          └───────────────────────────────────────┘ │
</code></pre>

<table>
<thead><tr><th>機能</th><th>説明</th></tr></thead>
<tbody>
<tr><td><strong>VPC Endpoints（PrivateLink）</strong></td><td>インターネットなしでS3、ECR、SageMaker APIにアクセス</td></tr>
<tr><td><strong>セキュリティグループ</strong></td><td>訓練インスタンスのインバウンド/アウトバウンドトラフィックを制御</td></tr>
<tr><td><strong>ネットワーク分離</strong></td><td>訓練ジョブにインターネットアクセスなし（分離モード）</td></tr>
<tr><td><strong>コンテナ間暗号化</strong></td><td>分散訓練のトラフィックを暗号化</td></tr>
</tbody>
</table>

<h2 id="encryption"><strong>3. 暗号化</strong></h2>

<table>
<thead><tr><th>対象</th><th>方法</th><th>サービス</th></tr></thead>
<tbody>
<tr><td><strong>S3データ（保存時）</strong></td><td>SSE-S3、SSE-KMS、SSE-C</td><td>S3 + KMS</td></tr>
<tr><td><strong>モデルアーティファクト（保存時）</strong></td><td>出力S3バケット用KMSキー</td><td>KMS</td></tr>
<tr><td><strong>EBSボリューム（訓練）</strong></td><td>インスタンスストレージのKMS暗号化</td><td>KMS</td></tr>
<tr><td><strong>転送中のデータ</strong></td><td>すべてのAPI呼び出しにTLS 1.2/1.3</td><td>デフォルト</td></tr>
<tr><td><strong>分散訓練トラフィック</strong></td><td>コンテナ間暗号化を有効化</td><td>SageMaker設定</td></tr>
</tbody>
</table>

<h2 id="cost-optimization"><strong>4. コスト最適化戦略</strong></h2>

<table>
<thead><tr><th>戦略</th><th>削減率</th><th>方法</th></tr></thead>
<tbody>
<tr><td><strong>Spot Instances</strong></td><td>最大90%</td><td>Training Jobs + チェックポイント</td></tr>
<tr><td><strong>適正化</strong></td><td>20-40%</td><td>実際のGPU/CPU使用率に合わせたインスタンスタイプ</td></tr>
<tr><td><strong>サーバーレス推論</strong></td><td>可変</td><td>呼び出し課金、アイドルコストなし</td></tr>
<tr><td><strong>SageMaker Savings Plans</strong></td><td>最大64%</td><td>一貫した使用量のコミット</td></tr>
<tr><td><strong>S3 Intelligent-Tiering</strong></td><td>可変</td><td>古い訓練データの自動階層化</td></tr>
<tr><td><strong>ライフサイクル設定</strong></td><td>可変</td><td>アイドルノートブックの自動停止</td></tr>
</tbody>
</table>

<h3 id="s3-lifecycle"><strong>4.1. MLデータ向けS3ライフサイクルポリシー</strong></h3>

<pre><code class="language-text">Data Lifecycle for ML:

  Active Training Data (S3 Standard)
           ↓ after 30 days unused
  S3 Intelligent-Tiering
           ↓ after 90 days
  S3 Standard-IA (Infrequent Access)
           ↓ after 180 days
  S3 Glacier Instant Retrieval
           ↓ after 1 year
  S3 Glacier Deep Archive (compliance)
</code></pre>

<h2 id="compliance"><strong>5. コンプライアンスフレームワーク</strong></h2>

<table>
<thead><tr><th>フレームワーク</th><th>MLへの関連性</th></tr></thead>
<tbody>
<tr><td><strong>HIPAA</strong></td><td>ヘルスケアML — PHIデータ暗号化、監査ログ、BAA必須</td></tr>
<tr><td><strong>GDPR</strong></td><td>EUデータ — 消去権、データ最小化、同意</td></tr>
<tr><td><strong>SOC 2</strong></td><td>SaaS ML製品のセキュリティコントロール監査</td></tr>
<tr><td><strong>PCI DSS</strong></td><td>MLモデルにおける決済カードデータ</td></tr>
</tbody>
</table>

<h2 id="cheat-sheet"><strong>6. チートシート — セキュリティとコスト</strong></h2>

<table>
<thead><tr><th>シナリオ</th><th>解決策</th></tr></thead>
<tbody>
<tr><td>インターネットなしのSageMaker訓練</td><td>VPC + ネットワーク分離 + VPCエンドポイント</td></tr>
<tr><td>S3上の訓練データの暗号化</td><td>カスタマー管理キーによるSSE-KMS</td></tr>
<tr><td>訓練コストを70%以上削減</td><td>Spot Instances + チェックポイント</td></tr>
<tr><td>古い訓練データセットの自動アーカイブ</td><td>S3ライフサイクルポリシー</td></tr>
<tr><td>ノートブックのアイドルコスト防止</td><td>Studioライフサイクル設定 → 自動シャットダウン</td></tr>
<tr><td>ヘルスケアデータ（HIPAA）</td><td>KMS + VPC + CloudTrail + AWSとのBAA</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. 練習問題</strong></h2>

<p><strong>Q1:</strong> ある企業がセキュリティコンプライアンスのため、SageMaker訓練ジョブがパブリックインターネットを経由せずにS3のデータにアクセスする必要があります。何を設定すべきですか？</p>
<ul>
<li>A) VPCフローログ</li>
<li>B) VPC + S3 VPCゲートウェイエンドポイントでのSageMaker訓練 ✓</li>
<li>C) IP制限付きIAMポリシー</li>
<li>D) AWS Shield</li>
</ul>
<p><em>解説：SageMaker Training JobsをVPC内で実行し、S3 VPCゲートウェイエンドポイントと組み合わせることで、すべてのS3トラフィックがパブリックインターネットを経由せずAWSネットワーク内に留まります。</em></p>

<p><strong>Q2:</strong> MLチームが中断可能な長時間の訓練ジョブのコストを削減したいと考えています。ジョブは停止した場所から再開できる必要があります。最もコスト効率の良いアプローチはどれですか？</p>
<ul>
<li>A) より大きなインスタンスで高速に完了</li>
<li>B) リザーブドインスタンスを使用</li>
<li>C) S3へのチェックポイント付きSpot Instancesを使用 ✓</li>
<li>D) ローカルで訓練を実行</li>
</ul>
<p><em>解説：Spot Instancesはオンデマンド価格と比較して最大90%のコスト削減を実現できます。チェックポイントを有効にすると（定期的にモデル状態をS3に保存）、中断されたジョブが最後のチェックポイントから再開でき、長時間の訓練でSpot Instancesが実用的になります。</em></p>

<p><strong>Q3:</strong> SageMakerの訓練データ、モデルアーティファクト、EBSボリュームの暗号化のための一元的なキー管理を提供するAWSサービスはどれですか？</p>
<ul>
<li>A) AWS Secrets Manager</li>
<li>B) AWS IAM</li>
<li>C) AWS KMS（Key Management Service） ✓</li>
<li>D) AWS Certificate Manager</li>
</ul>
<p><em>解説：AWS KMSはS3データ（SSE-KMS）、訓練インスタンスが使用するEBSボリューム、モデルアーティファクトの保存時暗号化のための暗号鍵管理を提供します。SageMakerは訓練からデプロイまでのワークフロー全体でKMSとネイティブに統合されています。</em></p>
