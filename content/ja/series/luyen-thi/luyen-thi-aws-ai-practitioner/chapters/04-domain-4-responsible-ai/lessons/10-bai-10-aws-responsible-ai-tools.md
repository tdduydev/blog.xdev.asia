---
id: 019c9619-lt01-d4-l10
title: 'レッスン10：AWS責任あるAIツール — Clarify、A2I、Guardrails'
slug: bai-10-aws-responsible-ai-tools
description: >-
  Amazon SageMaker Clarify（バイアス検出、説明可能性）。
  Amazon Augmented AI（A2I）— ヒューマンインザループ。
  Amazon Bedrock Guardrails徹底解説。コンテンツモデレーション。
duration_minutes: 50
is_free: true
video_url: null
sort_order: 2
section_title: "ドメイン4：責任あるAIのガイドライン（14%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS認定AIプラクティショナー（AIF-C01）試験対策'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai10-clarify-a2i-guardrails.webp" alt="AWS責任あるAIツール" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>AWS責任あるAIツール：SageMaker Clarify、Amazon A2I、Bedrock Guardrails</em></p>
</div>

<h2 id="sagemaker-clarify"><strong>1. Amazon SageMaker Clarify</strong></h2>

<p><strong>SageMaker Clarify</strong>は、データとモデルのバイアスを検出し、モデルの説明可能性を提供します — 責任あるAIのためのAWSの中核サービスです。</p>

<h3 id="clarify-capabilities"><strong>1.1. 3つのコア機能</strong></h3>

<table>
<thead><tr><th>機能</th><th>タイミング</th><th>内容</th></tr></thead>
<tbody>
<tr><td><strong>トレーニング前バイアス検出</strong></td><td>トレーニング前</td><td>人口統計グループ間のトレーニングデータの不均衡を検出</td></tr>
<tr><td><strong>トレーニング後バイアス検出</strong></td><td>トレーニング後</td><td>モデル予測のバイアスを検出（例：グループ間の精度の違い）</td></tr>
<tr><td><strong>説明可能性（SHAP）</strong></td><td>トレーニング後</td><td>各予測への特徴量の寄与を表示</td></tr>
</tbody>
</table>

<h3 id="clarify-bias-metrics"><strong>1.2. Clarifyの主要バイアス指標</strong></h3>

<table>
<thead><tr><th>指標</th><th>トレーニング前/後</th><th>測定内容</th></tr></thead>
<tbody>
<tr><td><strong>クラス不均衡（CI）</strong></td><td>トレーニング前</td><td>グループ間のクラス分布</td></tr>
<tr><td><strong>比率の差（DPL）</strong></td><td>トレーニング前</td><td>グループ間の正ラベルの比率</td></tr>
<tr><td><strong>KLダイバージェンス</strong></td><td>トレーニング前</td><td>グループ間の分布の乖離</td></tr>
<tr><td><strong>不均衡影響（DI）</strong></td><td>トレーニング後</td><td>グループ間の正予測の比率</td></tr>
<tr><td><strong>精度の差（AD）</strong></td><td>トレーニング後</td><td>グループ間の精度のギャップ</td></tr>
<tr><td><strong>処遇均等性（TE）</strong></td><td>トレーニング後</td><td>グループ間のFPとFNの比率</td></tr>
</tbody>
</table>

<h3 id="clarify-workflow"><strong>1.3. Clarifyのワークフロー</strong></h3>

<pre><code class="language-text">1. Clarifyジョブの設定
   ├── センシティブ属性を指定（性別、年齢、人種）
   ├── ファセット（比較するグループ）を定義
   └── 計算するバイアス指標を選択

2. トレーニング前分析の実行
   ├── トレーニングデータセットのアップロード
   └── データ分布のバイアスレポートを取得

3. モデルのトレーニング

4. トレーニング後分析の実行
   ├── グループ間の予測を比較
   └── 説明可能性のためのSHAP値を取得

5. SageMaker Model Monitorで監視
   └── 本番環境でのバイアスドリフトを経時的に検出
</code></pre>

<blockquote>
<p><strong>試験のポイント：</strong>「モデルが特定の人種グループに対してより多くのエラーを出しているかどうかを検出するAWSサービスは？」→ <strong>SageMaker Clarify</strong>（トレーニング後バイアス検出）。</p>
</blockquote>

<h2 id="a2i"><strong>2. Amazon Augmented AI（Amazon A2I）</strong></h2>

<p><strong>Amazon A2I</strong>は、AI予測のための<strong>ヒューマンインザループ（HITL）</strong>ワークフローを提供します — モデルの信頼度が低い場合や重要な判断に特に有用です。</p>

<h3 id="a2i-how"><strong>2.1. A2Iの仕組み</strong></h3>

<pre><code class="language-text">A2IによるAI予測フロー：
                                          ┌─────────────┐
ユーザーリクエスト → AIモデル → 確信あり？ YES → 結果を返す
                                 │
                                 NO（閾値以下）
                                 ↓
                        ┌──────────────────┐
                        │  人間レビュー     │
                        │  タスクを作成     │
                        │ （A2Iワークフロー）│
                        └────────┬─────────┘
                                 ↓
                        ┌──────────────────┐
                        │  人間のレビューアー│ ← AWS Mechanical Turk
                        │  がレビュー＆     │ ← プライベートワークフォース
                        │  修正             │ ← サードパーティベンダー
                        └────────┬─────────┘
                                 ↓
                        人間が検証した結果を返す
</code></pre>

<h3 id="a2i-components"><strong>2.2. A2Iのコンポーネント</strong></h3>

<table>
<thead><tr><th>コンポーネント</th><th>目的</th></tr></thead>
<tbody>
<tr><td><strong>ヒューマンレビューワークフロー</strong></td><td>いつ、どのように人間レビューをトリガーするかを定義</td></tr>
<tr><td><strong>ワーカータスクテンプレート</strong></td><td>人間レビューアーが判断するためのUI</td></tr>
<tr><td><strong>ワークフォース</strong></td><td>レビューする人（プライベート、Mechanical Turk、ベンダー）</td></tr>
<tr><td><strong>アクティベーション条件</strong></td><td>信頼度閾値トリガー（例：< 95%）</td></tr>
</tbody>
</table>

<h3 id="a2i-built-in"><strong>2.3. 組み込みA2I統合</strong></h3>

<table>
<thead><tr><th>サービス</th><th>A2Iのユースケース</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Textract</strong></td><td>低信頼度のドキュメント抽出をレビュー</td></tr>
<tr><td><strong>Amazon Rekognition</strong></td><td>低信頼度のコンテンツモデレーションをレビュー</td></tr>
<tr><td><strong>カスタムMLモデル</strong></td><td>任意のSageMakerモデルがA2Iをトリガー可能</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のポイント：</strong>「ヘルスケア企業がモデルの信頼度が90%未満の場合にAI診断を人間がレビューする必要がある」→ 信頼度 < 90%のアクティベーション条件を設定した<strong>Amazon A2I</strong>。</p>
</blockquote>

<h2 id="guardrails-deep"><strong>3. Amazon Bedrock Guardrails — 詳細解説</strong></h2>

<h3 id="guardrails-policies"><strong>3.1. Guardrailポリシー</strong></h3>

<table>
<thead><tr><th>ポリシー</th><th>仕組み</th><th>設定</th></tr></thead>
<tbody>
<tr><td><strong>コンテンツフィルタ</strong></td><td>カテゴリ + 重大度でブロック</td><td>各カテゴリ（ヘイト、侮辱、性的、暴力、不正行為）にNone/Low/Medium/High</td></tr>
<tr><td><strong>禁止トピック</strong></td><td>ブロックするトピックを定義</td><td>自然言語の説明 + サンプルフレーズ</td></tr>
<tr><td><strong>ワードフィルタ</strong></td><td>特定の単語をブロック</td><td>カスタム単語/フレーズリスト + 冒涜フィルタトグル</td></tr>
<tr><td><strong>機密情報（PII）</strong></td><td>PIIを検出してアクション</td><td>各PIIタイプ（SSN、メール、電話、名前、住所等）にBLOCKまたはANONYMIZE</td></tr>
<tr><td><strong>コンテキストグラウンディング</strong></td><td>回答がグラウンドされているか確認</td><td>グラウンディング閾値（0-1）+ 関連性閾値</td></tr>
</tbody>
</table>

<h3 id="guardrails-flow"><strong>3.2. Guardrailsのリクエスト処理フロー</strong></h3>

<pre><code class="language-text">ユーザー入力
    ↓
[入力GUARDRAILS]
    ├── コンテンツフィルタチェック
    ├── 禁止トピックチェック
    ├── ワードフィルタチェック
    ├── PII検出 → BLOCKまたはANONYMIZE
    ↓（すべてのチェックを通過した場合）
基盤モデルがレスポンスを生成
    ↓
[出力GUARDRAILS]
    ├── コンテンツフィルタチェック
    ├── 禁止トピックチェック
    ├── ワードフィルタチェック
    ├── PII検出 → BLOCKまたはANONYMIZE
    ├── コンテキストグラウンディングチェック
    ↓（すべてのチェックを通過した場合）
レスポンスをユーザーに返す

ブロックされた場合 → 設定された「ブロック」メッセージを返す
</code></pre>

<h3 id="guardrails-vs-system"><strong>3.3. Guardrails vs システムプロンプト</strong></h3>

<table>
<thead><tr><th>側面</th><th>システムプロンプト</th><th>Guardrails</th></tr></thead>
<tbody>
<tr><td><strong>強制力</strong></td><td>ソフト — モデルが無視する可能性</td><td>ハード — プラットフォームが強制</td></tr>
<tr><td><strong>バイパスリスク</strong></td><td>プロンプトインジェクションでバイパス可能</td><td>プロンプトではバイパス不可</td></tr>
<tr><td><strong>PII処理</strong></td><td>モデルにPIIを出力しないよう要求</td><td>プログラム的な検出と秘匿化</td></tr>
<tr><td><strong>監査可能性</strong></td><td>限定的</td><td>完全なログとメトリクス</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のポイント：</strong>「モデルの回答にPIIが含まれないことを保証する必要がある」→ <strong>Bedrock Guardrails</strong>（バイパス可能なシステムプロンプトではなく）。</p>
</blockquote>

<h2 id="content-moderation"><strong>4. AWS上のコンテンツモデレーション</strong></h2>

<table>
<thead><tr><th>サービス</th><th>コンテンツタイプ</th><th>ユースケース</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Rekognition</strong></td><td>画像＆動画</td><td>不適切なコンテンツ、顔、テキストの検出</td></tr>
<tr><td><strong>Amazon Comprehend</strong></td><td>テキスト</td><td>毒性検出、感情分析</td></tr>
<tr><td><strong>Bedrock Guardrails</strong></td><td>FM入出力</td><td>GenAIアプリでの有害コンテンツのフィルタ</td></tr>
<tr><td><strong>Amazon A2I</strong></td><td>すべて</td><td>エッジケースの人間レビュー</td></tr>
</tbody>
</table>

<h2 id="governance"><strong>5. AIガバナンス</strong></h2>

<h3 id="governance-framework"><strong>5.1. ガバナンスフレームワーク</strong></h3>

<table>
<thead><tr><th>領域</th><th>実装内容</th></tr></thead>
<tbody>
<tr><td><strong>ポリシー</strong></td><td>組織全体のAI倫理ガイドライン</td></tr>
<tr><td><strong>リスク評価</strong></td><td>AIシステムのデプロイ前にリスクを評価</td></tr>
<tr><td><strong>監視</strong></td><td>バイアス、パフォーマンスドリフトの継続的監視</td></tr>
<tr><td><strong>監査証跡</strong></td><td>説明責任のためにすべてのモデル判断を記録</td></tr>
<tr><td><strong>人間の監視</strong></td><td>重要な判断へのヒューマンインザループ</td></tr>
<tr><td><strong>ドキュメント</strong></td><td>モデルカード、AIサービスカード</td></tr>
</tbody>
</table>

<h3 id="sagemaker-governance"><strong>5.2. SageMaker MLガバナンス</strong></h3>

<ul>
<li><strong>SageMakerモデルカード</strong>：モデルの詳細と想定される使用方法を文書化</li>
<li><strong>SageMakerモデルダッシュボード</strong>：すべてのモデルステータスの一元的ビュー</li>
<li><strong>SageMaker Model Monitor</strong>：データドリフト、モデル品質劣化の検出</li>
<li><strong>SageMaker Role Manager</strong>：ML用のきめ細かなアクセス制御</li>
</ul>

<h2 id="practice-questions"><strong>6. 練習問題</strong></h2>

<p><strong>Q1：</strong>保険会社が、保険金請求承認モデルがすべての年齢の顧客を公平に扱うことを確認したいと考えています。モデルの予測における年齢ベースのバイアスを検出するために使用すべきAWSサービスはどれですか？</p>
<ul>
<li>A) Amazon Rekognition</li>
<li>B) Amazon SageMaker Clarify ✓</li>
<li>C) Amazon Bedrock Guardrails</li>
<li>D) Amazon Comprehend</li>
</ul>
<p><em>解説：SageMaker Clarifyは、Disparate ImpactやAccuracy Differenceなどの指標を使用して、年齢グループ間のモデル予測を比較するトレーニング後バイアス分析を実行できます。</em></p>

<p><strong>Q2：</strong>Amazon Textractを使用したドキュメント処理アプリケーションで、抽出されたデータの信頼度が低い場合に人間のレビューが必要です。この機能を提供するAWSサービスはどれですか？</p>
<ul>
<li>A) Amazon SageMaker Ground Truth</li>
<li>B) Amazon Augmented AI（A2I） ✓</li>
<li>C) Amazon Mechanical Turkを直接使用</li>
<li>D) Amazon Bedrock Agents</li>
</ul>
<p><em>解説：Amazon A2IはAmazon Textractとの組み込み統合を持ち、抽出信頼度が定義された閾値を下回った場合に自動的に人間レビューワークフローをトリガーできます。</em></p>

<p><strong>Q3：</strong>チャットボットが、ナレッジベースにデータが存在する場合でも、顧客のクレジットカード番号を回答に絶対に表示してはなりません。最も強力な保証を提供するアプローチはどれですか？</p>
<ul>
<li>A) システムプロンプトに「クレジットカード番号を出力しない」を追加</li>
<li>B) PIIを出力しないようにモデルをファインチューニング</li>
<li>C) PIIフィルタをBLOCKに設定したAmazon Bedrock Guardrailsを使用 ✓</li>
<li>D) ナレッジベースからクレジットカード番号を削除</li>
</ul>
<p><em>解説：PIIフィルタ付きのBedrock Guardrailsは、入力と出力の両方でクレジットカード番号のプログラム的な検出とブロックを提供します — システムプロンプトとは異なり、プロンプトインジェクションでバイパスされません。</em></p>
