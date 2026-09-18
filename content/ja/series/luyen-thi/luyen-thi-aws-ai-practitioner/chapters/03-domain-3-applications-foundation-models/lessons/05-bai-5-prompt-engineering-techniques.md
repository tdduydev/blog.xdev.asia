---
id: 019c9619-lt01-d3-l05
title: 'レッスン5：プロンプトエンジニアリングのテクニック'
slug: bai-5-prompt-engineering-techniques
description: >-
  Zero-shot、Few-shot、Chain-of-Thoughtプロンプティング。
  システムプロンプト、プロンプトテンプレート、ネガティブプロンプティング。
  AWS AIプラクティショナー試験向けプロンプトエンジニアリングのベストプラクティス。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 1
section_title: "ドメイン3：基盤モデルの応用（28%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS認定AIプラクティショナー（AIF-C01）試験対策'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai5-prompt-engineering.webp" alt="プロンプトエンジニアリングのテクニック" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>プロンプトエンジニアリングのテクニック：Zero-shot、Few-shot、Chain-of-Thought</em></p>
</div>

<h2 id="prompt-engineering"><strong>1. プロンプトエンジニアリングとは？</strong></h2>

<p><strong>プロンプトエンジニアリング</strong>とは、基盤モデルから望ましい出力を得るために入力（プロンプト）を設計する技術です。トレーニングやファインチューニングを必要とせず、FMの動作をカスタマイズする<strong>最も安価で最速</strong>の方法です。</p>

<h3 id="prompt-components"><strong>1.1. プロンプトの構成要素</strong></h3>

<pre><code class="language-text">┌────────────────────────────────────────────┐
│  SYSTEM PROMPT（システムプロンプト・任意）     │
│  「あなたは親切なAWSソリューション            │
│   アーキテクトです。簡潔に回答してください。」  │
├────────────────────────────────────────────┤
│  CONTEXT（コンテキスト・任意）                │
│  背景情報、ドキュメント、データ               │
├────────────────────────────────────────────┤
│  USER PROMPT（ユーザープロンプト・必須）       │
│  実際の質問や指示                            │
├────────────────────────────────────────────┤
│  EXAMPLES（例・任意、Few-shot用）            │
│  入力 → 出力のペア                          │
├────────────────────────────────────────────┤
│  OUTPUT FORMAT（出力形式・任意）              │
│  「JSONで回答」「箇条書きで」                 │
└────────────────────────────────────────────┘
</code></pre>

<h2 id="prompting-techniques"><strong>2. プロンプティングテクニック</strong></h2>

<h3 id="zero-shot"><strong>2.1. Zero-shotプロンプティング</strong></h3>

<p><strong>例を一切与えずに</strong>プロンプトを送信します。モデルは事前学習した知識のみに依存します。</p>

<pre><code class="language-text">プロンプト: "このレビューの感情を分類してください：
'商品が破損して届き、カスタマーサービスも役に立ちませんでした。'

感情："

出力: "ネガティブ"
</code></pre>

<p><strong>使用場面：</strong>モデルがすでに十分理解している、シンプルで明確に定義されたタスク。</p>

<h3 id="few-shot"><strong>2.2. Few-shotプロンプティング</strong></h3>

<p>実際のタスクを提示する前に<strong>いくつかの例を提供</strong>します。これにより、モデルが期待される形式やロジックを理解しやすくなります。</p>

<pre><code class="language-text">プロンプト: "以下のレビューを分類してください：

レビュー: '素晴らしい品質、迅速な配送！' → ポジティブ
レビュー: 'ひどい体験、二度と利用しない。' → ネガティブ
レビュー: 'まあまあ、特別ではない。' → ニュートラル

レビュー: '商品が期待を上回りました！' →"

出力: "ポジティブ"
</code></pre>

<p><strong>使用場面：</strong>Zero-shotでは十分な品質が得られない場合に、モデルに特定の形式やロジックパターンに従わせたいとき。</p>

<h3 id="one-shot"><strong>2.3. One-shotプロンプティング</strong></h3>

<p>Few-shotのバリエーションで、<strong>1つの例のみ</strong>を提供します。パターンを設定したいがコンテキストウィンドウが限られている場合に使用します。</p>

<h3 id="cot"><strong>2.4. Chain-of-Thought（CoT）プロンプティング</strong></h3>

<p>回答する前にモデルに<strong>ステップバイステップで考える</strong>よう求めます。数学、論理、推論タスクに特に効果的です。</p>

<pre><code class="language-text">CoTなし：
Q: "店に12個入りの箱が3つあり、15個を配ったら
    残りはいくつ？"
A: "21"（推論なしでは間違える可能性あり）

CoTあり：
Q: "ステップバイステップで考えてください：店に12個入りの
    箱が3つあり、15個を配ったら残りはいくつ？"
A: "ステップ1：合計のりんご = 3 × 12 = 36
    ステップ2：配った後 = 36 - 15 = 21
    答え：21個のりんご"
</code></pre>

<blockquote>
<p><strong>試験のポイント：</strong>「推論の精度を向上させるプロンプティングテクニックはどれ？」→ <strong>Chain-of-Thought</strong>。キーフレーズ：「ステップバイステップで考える」「推論を説明する」。</p>
</blockquote>

<h2 id="system-prompts"><strong>3. システムプロンプトとペルソナ</strong></h2>

<p><strong>システムプロンプト</strong>は、モデルの役割、動作、制約、出力形式を定義します。ユーザーとの対話前に「舞台を設定」します。</p>

<pre><code class="language-text">システムプロンプト：
"あなたはXYZ銀行のファイナンシャルアドバイザーAIです。
ルール：
- 銀行と投資に関する質問のみ回答する
- 特定の銘柄の推奨は絶対にしない
- 常に免責事項を含める
- プロフェッショナルなトーンで回答する
- 金融以外の話題を聞かれたら丁寧にリダイレクトする"
</code></pre>

<h3 id="system-prompt-use"><strong>システムプロンプトのベストプラクティス：</strong></h3>

<table>
<thead><tr><th>プラクティス</th><th>理由</th></tr></thead>
<tbody>
<tr><td><strong>明確な役割</strong>を定義</td><td>モデルの動作をドメインに制約する</td></tr>
<tr><td><strong>境界</strong>を設定</td><td>トピック外や有害な回答を防ぐ</td></tr>
<tr><td><strong>出力形式</strong>を指定</td><td>一貫性のある、パース可能な出力を保証する</td></tr>
<tr><td><strong>例</strong>を含める</td><td>期待される動作を明確にする</td></tr>
<tr><td><strong>ガードレール</strong>を追加</td><td>悪用を防ぐ（PII、有害コンテンツ）</td></tr>
</tbody>
</table>

<h2 id="advanced-techniques"><strong>4. 高度なプロンプティングテクニック</strong></h2>

<h3 id="negative-prompting"><strong>4.1. ネガティブプロンプティング</strong></h3>

<p>モデルが<strong>やってはいけないこと</strong>を明示的に指定します。画像生成で特に有用です。</p>

<pre><code class="language-text">テキスト生成：
"この記事を要約してください。意見や個人的な
コメントは含めないでください。100語を超えないでください。"

画像生成（Stable Diffusion）：
プロンプト: "プロフェッショナルなヘッドショット、スタジオ照明"
ネガティブプロンプト: "ぼやけ、漫画、歪み、低品質"
</code></pre>

<h3 id="prompt-templates"><strong>4.2. プロンプトテンプレート</strong></h3>

<p>動的コンテンツ用の<strong>プレースホルダー</strong>を含む再利用可能なプロンプト構造：</p>

<pre><code class="language-text">テンプレート：
"以下の{document_type}が与えられています：
---
{content}
---
以下の情報を抽出してください：
- {field_1}
- {field_2}
- {field_3}
JSON形式で回答してください。"
</code></pre>

<h3 id="prompt-chaining"><strong>4.3. プロンプトチェーン</strong></h3>

<p>複雑なタスクを<strong>複数の連続したプロンプト</strong>に分割し、前のプロンプトの出力が次のプロンプトの入力になります。</p>

<pre><code class="language-text">ステップ1: "この文書から主要なエンティティを抽出: {doc}"
            → 出力: エンティティのリスト

ステップ2: "各エンティティ{entities}について、このテキスト
            で表現されている感情を分析: {doc}"
            → 出力: エンティティ-感情ペア

ステップ3: "これらのエンティティの感情分析サマリーレポート
            を作成: {entity_sentiments}"
            → 出力: 最終レポート
</code></pre>

<h2 id="comparison"><strong>5. 試験用比較表</strong></h2>

<table>
<thead><tr><th>テクニック</th><th>例の提供</th><th>最適な用途</th><th>試験キーワード</th></tr></thead>
<tbody>
<tr><td><strong>Zero-shot</strong></td><td>なし</td><td>シンプルでよく知られたタスク</td><td>「例なし」</td></tr>
<tr><td><strong>One-shot</strong></td><td>1つの例</td><td>最小限のコンテキストでフォーマット設定</td><td>「単一の例」</td></tr>
<tr><td><strong>Few-shot</strong></td><td>2-5の例</td><td>パターン追従、分類</td><td>「例を提供」「デモンストレーション」</td></tr>
<tr><td><strong>Chain-of-Thought</strong></td><td>推論ステップ付き</td><td>数学、論理、複雑な推論</td><td>「ステップバイステップ」「推論」</td></tr>
<tr><td><strong>ネガティブプロンプティング</strong></td><td>該当なし</td><td>不要な出力の回避</td><td>「含めない」「避ける」</td></tr>
<tr><td><strong>プロンプトチェーン</strong></td><td>該当なし</td><td>複雑な多段階タスク</td><td>「ステップに分割」「連続的」</td></tr>
</tbody>
</table>

<h2 id="inference-params"><strong>6. 推論パラメータの確認</strong></h2>

<p>プロンプトエンジニアリングには推論パラメータのチューニングも含まれます：</p>

<table>
<thead><tr><th>パラメータ</th><th>低い値</th><th>高い値</th></tr></thead>
<tbody>
<tr><td><strong>Temperature</strong></td><td>決定論的、事実重視（0.0-0.3）</td><td>創造的、多様（0.7-1.0）</td></tr>
<tr><td><strong>Top-p</strong></td><td>限定的な語彙（0.1-0.3）</td><td>多様な語彙（0.9-1.0）</td></tr>
<tr><td><strong>Top-k</strong></td><td>選択肢が少ない（例：10）</td><td>選択肢が多い（例：250）</td></tr>
<tr><td><strong>Max tokens</strong></td><td>短い回答</td><td>長い回答</td></tr>
<tr><td><strong>Stop sequences</strong></td><td colspan="2">生成を停止するタイミングを定義</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のポイント：</strong>「カスタマーサポートチャットボットが一貫性のない回答をする」→ <strong>Temperature</strong>を下げる（0に近づける）。「クリエイティブライティングアプリがつまらないテキストを生成する」→ <strong>Temperature</strong>を上げる（1に近づける）。</p>
</blockquote>

<h2 id="best-practices"><strong>7. プロンプトエンジニアリングのベストプラクティス</strong></h2>

<ol>
<li><strong>具体的に</strong>：「3つの箇条書きで要約」＞「これを要約して」</li>
<li><strong>コンテキストを提供</strong>：関連する背景情報を含める</li>
<li><strong>出力形式を定義</strong>：JSON、マークダウン、テーブル、箇条書き</li>
<li><strong>区切り文字を使用</strong>：セクションを --- や ``` で区切り、プロンプトインジェクションを防ぐ</li>
<li><strong>反復改善</strong>：出力に基づいてプロンプトをテストし改良する</li>
<li><strong>曖昧さを避ける</strong>：モデルがあなたの意図を知っていると仮定しない</li>
<li><strong>例を使用</strong>：Zero-shotがうまくいかない場合、Few-shotの例を追加する</li>
</ol>

<h2 id="practice-questions"><strong>8. 練習問題</strong></h2>

<p><strong>Q1：</strong>開発者が分類タスクに取り組んでいますが、モデルのZero-shot回答が一貫していません。次にどのプロンプティングテクニックを試すべきですか？</p>
<ul>
<li>A) Temperatureを0に下げる</li>
<li>B) 入力と出力の例を使ったFew-shotプロンプティングを使用する ✓</li>
<li>C) カスタムデータでモデルをファインチューニングする</li>
<li>D) 別のモデルプロバイダーに切り替える</li>
</ul>
<p><em>解説：Few-shotプロンプティングはZero-shotが失敗した後の論理的な次のステップです。例を提供することでモデルが期待されるパターンを理解しやすくなります。ファインチューニングはより高コストで複雑です。Temperature調整だけでは分類ロジックを修正できない場合があります。</em></p>

<p><strong>Q2：</strong>顧客がAIアプリケーションで複雑な数学の文章問題をより正確に解きたいと考えています。結果を最も改善するプロンプティングテクニックはどれですか？</p>
<ul>
<li>A) Zero-shotプロンプティング</li>
<li>B) ネガティブプロンプティング</li>
<li>C) Chain-of-Thoughtプロンプティング ✓</li>
<li>D) プロンプトチェーン</li>
</ul>
<p><em>解説：Chain-of-Thoughtプロンプティングは、モデルにステップバイステップで推論を示すよう促し、数学的・論理的推論タスクの精度を大幅に向上させます。</em></p>

<p><strong>Q3：</strong>生成AIアプリケーションでシステムプロンプトを使用する利点はどれですか？</p>
<ul>
<li>A) ユーザー入力の必要性を排除する</li>
<li>B) モデルの推論コストを削減する</li>
<li>C) モデルの役割、動作、制約を定義する ✓</li>
<li>D) ファインチューニングの必要性を置き換える</li>
</ul>
<p><em>解説：システムプロンプトはモデルの役割、動作制約、出力形式を設定し、モデルトレーニングなしですべてのユーザーインタラクションで一貫した動作を確立します。</em></p>
