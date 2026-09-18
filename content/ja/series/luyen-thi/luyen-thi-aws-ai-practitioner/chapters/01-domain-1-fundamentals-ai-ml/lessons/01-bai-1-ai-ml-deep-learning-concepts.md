---
id: 019c9619-lt01-d1-l01
title: 'レッスン1：AI、ML、ディープラーニング — 概念と用語'
slug: bai-1-ai-ml-deep-learning-concepts
description: >-
  AI vs ML vs DL。教師あり・教師なし・強化学習。
  分類、回帰、クラスタリング。ニューラルネットワークの基礎。
  訓練・検証・テストセット。バイアス-バリアンスのトレードオフ。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: "ドメイン1：AIとMLの基礎（20%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS認定AIプラクティショナー（AIF-C01）試験対策'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai1-ai-ml-dl-hierarchy.webp" alt="AI、ML、ディープラーニングの階層構造" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>AI、ML、ディープラーニング — 入れ子構造と3つの機械学習パラダイム</em></p>
</div>

<h2 id="overview"><strong>ドメイン1の概要</strong></h2>

<p>ドメイン1は<strong>AIF-C01試験の20%</strong>を占めます。AI、ML、ディープラーニングの基本概念を理解する必要があります。コーディングは不要ですが、どのアプローチをいつ使用すべきかを見分けられる必要があります。</p>

<blockquote>
<p><strong>試験のコツ：</strong>このドメインでは「～に最も適した機械学習の種類はどれか」のような問題がよく出題されます。ユースケースに応じて適切なパラダイムを選択する必要があります。</p>
</blockquote>

<h2 id="ai-vs-ml-vs-dl"><strong>1. AI vs 機械学習 vs ディープラーニング</strong></h2>

<p>これら3つの概念には入れ子の関係があります：</p>

<pre><code class="language-text">┌─────────────────────────────────────────────┐
│  人工知能（AI）                               │
│  「人間の知能を模倣する機械」                    │
│  ┌───────────────────────────────────────┐   │
│  │  機械学習（ML）                        │   │
│  │  「明示的なプログラミングなしに            │   │
│  │   データから学習」                       │   │
│  │  ┌─────────────────────────────────┐  │   │
│  │  │  ディープラーニング（DL）          │  │   │
│  │  │  「多層のニューラルネットワーク」    │  │   │
│  │  └─────────────────────────────────┘  │   │
│  └───────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
</code></pre>

<table>
<thead><tr><th>概念</th><th>定義</th><th>例</th></tr></thead>
<tbody>
<tr><td><strong>AI</strong></td><td>広範な分野 — 通常は人間の知能を必要とするタスクを機械が実行</td><td>チャットボット、自動運転車、チェスエンジン</td></tr>
<tr><td><strong>ML</strong></td><td>AIのサブセット — アルゴリズムがデータからパターンを学習</td><td>スパムフィルター、レコメンドエンジン</td></tr>
<tr><td><strong>DL</strong></td><td>MLのサブセット — 多層のニューラルネットワーク</td><td>画像認識、言語翻訳</td></tr>
</tbody>
</table>

<h3 id="key-differences"><strong>試験における主な違い</strong></h3>

<ul>
<li><strong>従来のプログラミング</strong>：ルール + データ → 出力</li>
<li><strong>機械学習</strong>：データ + 出力 → ルール（モデルがルールを学習）</li>
<li><strong>ディープラーニング</strong>：生データから自動的に特徴を抽出（手動の特徴量エンジニアリング不要）</li>
</ul>

<h2 id="ml-paradigms"><strong>2. 3つのMLパラダイム</strong></h2>

<h3 id="supervised-learning"><strong>2.1. 教師あり学習</strong></h3>

<p>モデルは<strong>ラベル付きデータ</strong>から学習します。各入力には正解の出力（ラベル/ターゲット）が付属しています。</p>

<table>
<thead><tr><th>タスクの種類</th><th>出力</th><th>ユースケース</th><th>アルゴリズム</th></tr></thead>
<tbody>
<tr><td><strong>分類</strong></td><td>離散的なカテゴリ</td><td>スパム vs 非スパム、不正検出</td><td>ロジスティック回帰、ランダムフォレスト、SVM</td></tr>
<tr><td><strong>回帰</strong></td><td>連続的な数値</td><td>住宅価格予測、株価予測</td><td>線形回帰、XGBoost</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のコツ：</strong>問題文に「カテゴリを予測」「分類」とあれば → <strong>分類</strong>。「数値を予測」とあれば → <strong>回帰</strong>。</p>
</blockquote>

<h3 id="unsupervised-learning"><strong>2.2. 教師なし学習</strong></h3>

<p>モデルは<strong>ラベルなしデータ</strong>から学習します。データ中のパターンや構造を自ら発見します。</p>

<table>
<thead><tr><th>タスクの種類</th><th>内容</th><th>ユースケース</th></tr></thead>
<tbody>
<tr><td><strong>クラスタリング</strong></td><td>類似するデータポイントをグループ化</td><td>顧客セグメンテーション、文書のグループ化</td></tr>
<tr><td><strong>次元削減</strong></td><td>情報を保持しつつ特徴量を削減</td><td>データの可視化、ノイズ除去</td></tr>
<tr><td><strong>異常検出</strong></td><td>異常なデータポイントを発見</td><td>不正検出、機器の故障</td></tr>
<tr><td><strong>アソシエーション</strong></td><td>アイテム間のルールを発見</td><td>「Xを買った顧客はYも買った」</td></tr>
</tbody>
</table>

<h3 id="reinforcement-learning"><strong>2.3. 強化学習（RL）</strong></h3>

<p>エージェントが環境内で<strong>試行錯誤</strong>を通じて学習します。各アクションに対して<strong>報酬</strong>（正）または<strong>ペナルティ</strong>（負）を受け取ります。</p>

<pre><code class="language-text">エージェント → アクション → 環境 → 状態 + 報酬 → エージェント（ループ）
</code></pre>

<p><strong>ユースケース：</strong></p>
<ul>
<li>ゲームAI（AlphaGo）</li>
<li>ロボティクスのナビゲーション</li>
<li>自動運転</li>
<li>AWS DeepRacer（自動運転カーシミュレーション）</li>
</ul>

<h3 id="choosing-paradigm"><strong>2.4. 適切なパラダイムの選択 — 試験用決定木</strong></h3>

<pre><code class="language-text">ラベル付きデータがあるか？
├── はい → 教師あり学習
│   ├── カテゴリを予測？ → 分類
│   └── 数値を予測？ → 回帰
├── いいえ →
│   ├── グループやパターンを発見したい？ → 教師なし（クラスタリング）
│   └── 試行錯誤で学習？ → 強化学習
</code></pre>

<h2 id="data-concepts"><strong>3. MLのデータ概念</strong></h2>

<h3 id="data-types"><strong>3.1. データ型</strong></h3>

<table>
<thead><tr><th>型</th><th>説明</th><th>例</th></tr></thead>
<tbody>
<tr><td><strong>構造化</strong></td><td>行と列で整理（表形式）</td><td>CSV、データベーステーブル、スプレッドシート</td></tr>
<tr><td><strong>半構造化</strong></td><td>ある程度の構造はあるが柔軟</td><td>JSON、XML、ログファイル</td></tr>
<tr><td><strong>非構造化</strong></td><td>事前定義されたフォーマットなし</td><td>画像、動画、音声、自由テキスト</td></tr>
<tr><td><strong>時系列</strong></td><td>時間でインデックスされたデータポイント</td><td>株価、IoTセンサーの読み取り</td></tr>
</tbody>
</table>

<h3 id="labeled-unlabeled"><strong>3.2. ラベル付き vs ラベルなしデータ</strong></h3>

<ul>
<li><strong>ラベル付きデータ</strong>：各データポイントに正解（ラベル）が付属。例：メール + タグ「スパム」/「非スパム」。<strong>教師あり学習</strong>に使用。</li>
<li><strong>ラベルなしデータ</strong>：データのみでラベルなし。<strong>教師なし学習</strong>に使用。</li>
<li><strong>Amazon SageMaker Ground Truth</strong>：データのラベリングを支援するAWSサービス（人間 + ML支援によるラベリング）。</li>
</ul>

<h3 id="datasets"><strong>3.3. 訓練・検証・テストセット</strong></h3>

<pre><code class="language-text">┌────────────────────────────────────────────────┐
│              全データセット（100%）                │
├──────────────────┬──────────┬──────────────────┤
│  訓練（70%）      │ 検証(15%)│   テスト（15%）    │
│  モデルがこの     │ ハイパー  │ 最終評価           │
│  データから学習   │ パラメータ│ （訓練中に一度も   │
│                  │ の調整   │  見ていないデータ）  │
└──────────────────┴──────────┴──────────────────┘
</code></pre>

<ul>
<li><strong>訓練セット</strong>：モデルがこのデータからパターンを学習</li>
<li><strong>検証セット</strong>：ハイパーパラメータの調整と過学習防止に使用</li>
<li><strong>テストセット</strong>：最終評価 — モデルが一度も見たことのないデータ</li>
</ul>

<h2 id="neural-networks"><strong>4. ニューラルネットワークの基礎</strong></h2>

<h3 id="nn-architecture"><strong>4.1. アーキテクチャ</strong></h3>

<pre><code class="language-text">入力層 → 隠れ層 → 出力層
    x₁ ──┐     ┌── h₁ ──┐
    x₂ ──┼─────┼── h₂ ──┼──── ŷ（予測）
    x₃ ──┘     └── h₃ ──┘

各接続には重み（w）がある
各ニューロンは活性化関数を適用
</code></pre>

<p><strong>主要コンポーネント：</strong></p>
<ul>
<li><strong>重み</strong>：訓練中にモデルが学習するパラメータ</li>
<li><strong>バイアス</strong>：活性化関数をシフトさせる追加パラメータ</li>
<li><strong>活性化関数</strong>：ReLU、Sigmoid、Softmax — 非線形性を導入</li>
<li><strong>損失関数</strong>：モデルの予測がどれだけ間違っているかを測定</li>
<li><strong>オプティマイザ</strong>：損失を最小化するために重みを更新（例：SGD、Adam）</li>
</ul>

<h3 id="nn-types"><strong>4.2. ニューラルネットワークの種類</strong></h3>

<table>
<thead><tr><th>種類</th><th>最適な用途</th><th>AWSサービス</th></tr></thead>
<tbody>
<tr><td><strong>CNN</strong>（畳み込みNN）</td><td>画像、動画</td><td>Amazon Rekognition</td></tr>
<tr><td><strong>RNN/LSTM</strong>（再帰NN）</td><td>系列データ、時系列</td><td>Amazon Forecast</td></tr>
<tr><td><strong>Transformer</strong></td><td>NLP、テキスト生成</td><td>Amazon Bedrock（LLM）</td></tr>
<tr><td><strong>GAN</strong>（敵対的生成ネットワーク）</td><td>新しいデータ（画像）の生成</td><td>—</td></tr>
</tbody>
</table>

<h2 id="model-evaluation"><strong>5. モデル評価の概念</strong></h2>

<h3 id="overfitting-underfitting"><strong>5.1. 過学習 vs 未学習</strong></h3>

<table>
<thead><tr><th>問題</th><th>訓練精度</th><th>テスト精度</th><th>原因</th><th>解決策</th></tr></thead>
<tbody>
<tr><td><strong>過学習</strong></td><td>非常に高い</td><td>低い</td><td>モデルが訓練データを暗記</td><td>データの追加、正則化、ドロップアウト、早期終了</td></tr>
<tr><td><strong>未学習</strong></td><td>低い</td><td>低い</td><td>モデルが単純すぎる</td><td>特徴量の追加、より複雑なモデル、訓練時間の延長</td></tr>
<tr><td><strong>良好なフィット</strong></td><td>高い</td><td>高い</td><td>バランスの取れた複雑さ</td><td>—</td></tr>
</tbody>
</table>

<h3 id="bias-variance"><strong>5.2. バイアス-バリアンスのトレードオフ</strong></h3>

<ul>
<li><strong>高バイアス</strong> = 未学習（モデルが単純すぎてパターンを見逃す）</li>
<li><strong>高バリアンス</strong> = 過学習（モデルが複雑すぎてノイズに敏感）</li>
<li>目標：バイアスとバリアンスの<strong>最適なバランス</strong>を見つけること</li>
</ul>

<h3 id="metrics"><strong>5.3. 一般的な評価指標</strong></h3>

<p><strong>分類の指標：</strong></p>
<table>
<thead><tr><th>指標</th><th>計算式</th><th>使用場面</th></tr></thead>
<tbody>
<tr><td><strong>正解率</strong></td><td>(TP + TN) / 全体</td><td>バランスの取れたクラス</td></tr>
<tr><td><strong>適合率</strong></td><td>TP / (TP + FP)</td><td>「正常なものをスパムと判定しない」</td></tr>
<tr><td><strong>再現率</strong></td><td>TP / (TP + FN)</td><td>「不正を見逃さない」</td></tr>
<tr><td><strong>F1スコア</strong></td><td>2 × (P × R) / (P + R)</td><td>不均衡なクラス</td></tr>
<tr><td><strong>AUC-ROC</strong></td><td>ROC曲線下面積</td><td>二値分類全般</td></tr>
</tbody>
</table>

<p><strong>回帰の指標：</strong></p>
<ul>
<li><strong>RMSE</strong>（二乗平均平方根誤差）：大きな誤差にペナルティ</li>
<li><strong>MAE</strong>（平均絶対誤差）：平均的な誤差の大きさ</li>
<li><strong>R²</strong>：モデルが分散をどれだけ説明できるか（1.0 = 完璧）</li>
</ul>

<h2 id="key-terms"><strong>6. 重要用語チートシート</strong></h2>

<table>
<thead><tr><th>用語</th><th>定義（試験用）</th></tr></thead>
<tbody>
<tr><td><strong>特徴量</strong></td><td>予測に使用される入力変数（データの列）</td></tr>
<tr><td><strong>ラベル / ターゲット</strong></td><td>モデルに予測させたい答え</td></tr>
<tr><td><strong>ハイパーパラメータ</strong></td><td>訓練前に設定する設定値（学習率、エポック数）</td></tr>
<tr><td><strong>パラメータ</strong></td><td>訓練中にモデルが学習する値（重み、バイアス）</td></tr>
<tr><td><strong>エポック</strong></td><td>訓練データセット全体を1回通過すること</td></tr>
<tr><td><strong>バッチサイズ</strong></td><td>重みを更新する前に処理するサンプル数</td></tr>
<tr><td><strong>推論</strong></td><td>訓練済みモデルを使って新しいデータの予測を行うこと</td></tr>
<tr><td><strong>転移学習</strong></td><td>事前訓練済みモデルを新しいタスクに適応させること</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>7. 練習問題</strong></h2>

<p><strong>Q1：</strong>ある企業が、顧客がサブスクリプションを解約するかどうか（はい/いいえ）を予測したいと考えています。最も適切なMLアプローチはどれですか？</p>
<ul>
<li>A) 教師なし学習 — クラスタリング</li>
<li>B) 教師あり学習 — 回帰</li>
<li>C) 教師あり学習 — 分類 ✓</li>
<li>D) 強化学習</li>
</ul>
<p><em>解説：ラベル付きの履歴データを用いて二値の結果（はい/いいえ）を予測する = 教師あり分類。</em></p>

<p><strong>Q2：</strong>小売企業が購買データを持っていますが、事前定義されたグループはありません。ターゲットマーケティングのために顧客をグループに分けたいと考えています。どのアプローチを使用すべきですか？</p>
<ul>
<li>A) 教師あり学習 — 分類</li>
<li>B) 教師なし学習 — クラスタリング ✓</li>
<li>C) 強化学習</li>
<li>D) 教師あり学習 — 回帰</li>
</ul>
<p><em>解説：ラベルなし + データ内の自然なグループを発見 = 教師なしクラスタリング。</em></p>

<p><strong>Q3：</strong>あるモデルが訓練データで非常に良いパフォーマンス（精度99%）を示しますが、新しいデータでは低い結果（精度65%）となります。これは何と呼ばれますか？</p>
<ul>
<li>A) 未学習</li>
<li>B) 過学習 ✓</li>
<li>C) 高バイアス</li>
<li>D) 正則化</li>
</ul>
<p><em>解説：高い訓練精度 + 低いテスト精度 = 過学習（モデルが訓練データを暗記した）。</em></p>
