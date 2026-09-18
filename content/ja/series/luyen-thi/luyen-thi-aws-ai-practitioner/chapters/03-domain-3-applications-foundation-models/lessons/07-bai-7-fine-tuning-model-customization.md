---
id: 019c9619-lt01-d3-l07
title: 'レッスン7：ファインチューニングとモデルカスタマイズ'
slug: bai-7-fine-tuning-model-customization
description: >-
  事前トレーニング vs ファインチューニング vs RLHF。PEFTとLoRA。
  継続的事前トレーニング。Amazon Bedrockカスタムモデル。
  トレーニングデータの準備、評価、デプロイ。
duration_minutes: 50
is_free: true
video_url: null
sort_order: 3
section_title: "ドメイン3：基盤モデルの応用（28%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS認定AIプラクティショナー（AIF-C01）試験対策'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai7-finetuning-spectrum.webp" alt="モデルカスタマイズの範囲" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>モデルカスタマイズの範囲：プロンプトエンジニアリングからスクラッチでの事前トレーニングまで</em></p>
</div>

<h2 id="customization-spectrum"><strong>1. モデルカスタマイズの範囲</strong></h2>

<p>FMの動作をカスタマイズする方法は、シンプルなものから複雑なものまで多数あります：</p>

<pre><code class="language-text">最小の労力                                      最大の労力
──────────────────────────────────────────────────────────
プロンプト    Few-shot      RAG      ファイン    継続的       事前
エンジニア    プロンプ              チューニ    事前         トレー
リング        ティング              ング        トレーニング  ニング
──────────────────────────────────────────────────────────
トレーニング不要              ←                 →    フルトレーニング
$ 最安                       ←                 →    $$$$ 最高額
数分                         ←                 →    数週間/数ヶ月
</code></pre>

<h2 id="fine-tuning"><strong>2. ファインチューニング</strong></h2>

<p><strong>ファインチューニング</strong> = 既存のFMを<strong>特定のデータセット</strong>でさらにトレーニングし、ドメイン/タスクでのパフォーマンスを向上させること。</p>

<h3 id="when-fine-tune"><strong>2.1. いつファインチューニングするか？</strong></h3>

<table>
<thead><tr><th>ファインチューニングすべき場合</th><th>ファインチューニング不要な場合</th></tr></thead>
<tbody>
<tr><td>特定のスタイル、トーン、フォーマットが必要</td><td>事実に基づくQ&Aのみ必要（RAGを使用）</td></tr>
<tr><td>ドメイン固有の言語パターン</td><td>プロンプティングでタスクがうまくいく</td></tr>
<tr><td>特定タスクの精度を向上させたい</td><td>ラベル付きトレーニングデータがない</td></tr>
<tr><td>プロンプトサイズを削減（指示を内在化）</td><td>データが頻繁に変更される（RAGを使用）</td></tr>
<tr><td>一貫した出力フォーマットが必要</td><td>予算が限られている</td></tr>
</tbody>
</table>

<h3 id="fine-tune-types"><strong>2.2. ファインチューニングの種類</strong></h3>

<table>
<thead><tr><th>種類</th><th>内容</th><th>データ形式</th><th>ユースケース</th></tr></thead>
<tbody>
<tr><td><strong>指示ファインチューニング</strong></td><td>プロンプト-レスポンスペアでトレーニング</td><td>{"prompt": "...", "completion": "..."}</td><td>指示への追従を改善</td></tr>
<tr><td><strong>ドメイン適応</strong></td><td>ドメインテキストでトレーニング</td><td>ドメインドキュメント（医療、法律）</td><td>ドメイン用語の学習</td></tr>
<tr><td><strong>タスク固有</strong></td><td>特定のタスク例でトレーニング</td><td>タスクの入出力ペア</td><td>分類、抽出</td></tr>
</tbody>
</table>

<h2 id="peft"><strong>3. PEFTとLoRA</strong></h2>

<h3 id="peft-overview"><strong>3.1. パラメータ効率的ファインチューニング（PEFT）</strong></h3>

<p>フルファインチューニングは<strong>すべてのモデルパラメータ</strong>を更新します — 高コストで大量のGPUメモリが必要です。PEFT手法は<strong>パラメータの小さなサブセット</strong>のみを更新します。</p>

<pre><code class="language-text">フルファインチューニング：
  モデル: 70億パラメータ
  更新: 70億パラメータ (100%)
  GPUメモリ: 非常に大きい
  コスト: $$$$

PEFT (LoRA)：
  モデル: 70億パラメータ
  更新: ～1000万パラメータ (0.1%)
  GPUメモリ: はるかに少ない
  コスト: $$
</code></pre>

<h3 id="lora"><strong>3.2. LoRA（Low-Rank Adaptation）</strong></h3>

<p>LoRAは、すべての重みを更新する代わりに、モデルレイヤーに<strong>小さな学習可能な行列</strong>を追加します：</p>

<ul>
<li>元のモデルの重みを凍結</li>
<li>小さな「アダプター」行列（ランク分解）を追加</li>
<li>これらの小さなアダプターのみをトレーニング</li>
<li>推論時：アダプターを元の重みとマージ</li>
</ul>

<blockquote>
<p><strong>試験のポイント：</strong>「品質を維持しながらファインチューニングのコストを削減するテクニックはどれ？」→ <strong>LoRA / PEFT</strong>。重要コンセプト：全パラメータではなく、小さな割合のパラメータをトレーニングする。</p>
</blockquote>

<h2 id="continued-pretraining"><strong>4. 継続的事前トレーニング</strong></h2>

<p><strong>継続的事前トレーニング</strong>は、<strong>大量のラベルなしドメインデータ</strong>でFMをトレーニングし、タスク固有のデータでファインチューニングする<em>前に</em>モデルに新しい語彙と概念を教えます。</p>

<pre><code class="language-text">ワークフロー：
ベースFM → 継続的事前トレーニング → ファインチューニング → 評価
           (ドメインコーパス、          (ラベル付き      (ホールドアウト
            ラベルなし)                タスクデータ)     セットでテスト)

例：
ベースClaude → 10万件の医学論文でトレーニング → 医療Q&Aペアで
              (継続的事前トレーニング)          ファインチューニング
              学習：医学用語、                 学習：臨床的な質問に
              薬名、処置                       回答する方法
</code></pre>

<h3 id="cpt-vs-ft"><strong>継続的事前トレーニング vs ファインチューニング：</strong></h3>

<table>
<thead><tr><th>側面</th><th>継続的事前トレーニング</th><th>ファインチューニング</th></tr></thead>
<tbody>
<tr><td><strong>データ</strong></td><td>大量のラベルなしドメインテキスト</td><td>少量のラベル付きタスクデータ</td></tr>
<tr><td><strong>目的</strong></td><td>ドメイン知識の学習</td><td>タスク固有の動作の学習</td></tr>
<tr><td><strong>コスト</strong></td><td>より高コスト（データが大きい）</td><td>より低コスト</td></tr>
<tr><td><strong>タイミング</strong></td><td>モデルがドメイン語彙を欠いている場合</td><td>モデルに特定のタスクを実行させたい場合</td></tr>
</tbody>
</table>

<h2 id="rlhf"><strong>5. RLHF（人間のフィードバックからの強化学習）</strong></h2>

<p>RLHFは、モデルの出力を人間の好みに<strong>整合</strong>させるために使用されます — 出力をより有用で、真実で、無害にします。</p>

<pre><code class="language-text">RLHFパイプライン：
1. 人間のフィードバック収集  2. 報酬モデルのトレーニング 3. RLで最適化
   「どちらの回答が              学習：人間が何を          FMが生成 →
    良い？AかB？」               好むか                   報酬モデルがスコア →
                                                         FMの重みを更新
</code></pre>

<p>RLHFは主に<strong>FMプロバイダー</strong>（Anthropic、Meta、Amazon）が行います — 通常エンドユーザーは実施しません。ただし、試験のために概念を理解しておく必要があります。</p>

<h2 id="bedrock-custom"><strong>6. Amazon Bedrockカスタムモデル</strong></h2>

<p>Bedrockは2つのカスタマイズアプローチを提供します：</p>

<h3 id="bedrock-ft"><strong>6.1. Bedrockでのファインチューニング</strong></h3>

<table>
<thead><tr><th>機能</th><th>詳細</th></tr></thead>
<tbody>
<tr><td><strong>サポートモデル</strong></td><td>Amazon Titan、Meta Llama、Cohere</td></tr>
<tr><td><strong>データ形式</strong></td><td>プロンプト-完了ペアのJSONL</td></tr>
<tr><td><strong>データの場所</strong></td><td>Amazon S3</td></tr>
<tr><td><strong>出力</strong></td><td>Bedrock内のカスタムモデルバージョン</td></tr>
<tr><td><strong>プロビジョンドスループット</strong></td><td>ファインチューニング済みモデルの使用に必要</td></tr>
</tbody>
</table>

<h3 id="bedrock-cpt"><strong>6.2. Bedrockでの継続的事前トレーニング</strong></h3>

<table>
<thead><tr><th>機能</th><th>詳細</th></tr></thead>
<tbody>
<tr><td><strong>サポートモデル</strong></td><td>Amazon Titan、Meta Llama、Cohere</td></tr>
<tr><td><strong>データ形式</strong></td><td>プレーンテキストファイル（ラベルなし）</td></tr>
<tr><td><strong>ユースケース</strong></td><td>ファインチューニング前のドメイン適応</td></tr>
</tbody>
</table>

<h3 id="bedrock-training-data"><strong>6.3. トレーニングデータの準備</strong></h3>

<pre><code class="language-json">// ファインチューニングデータ形式 (JSONL)：
{"prompt": "Drug Xの推奨用量は？", "completion": "Drug Xの成人向け推奨用量は1日2回500mgです。"}
{"prompt": "Drug Xの副作用を列挙してください。", "completion": "一般的な副作用には頭痛、吐き気、めまいがあります。"}
</code></pre>

<h3 id="bedrock-model-eval"><strong>6.4. Bedrockでのモデル評価</strong></h3>

<p>Amazon Bedrockモデル評価ではモデルを比較できます：</p>

<ul>
<li><strong>自動評価</strong>：組み込み指標（精度、堅牢性、毒性）</li>
<li><strong>人間評価</strong>：人間のレビューアーがモデル出力を評価</li>
<li><strong>モデル比較</strong>：異なるFMの並列比較</li>
</ul>

<blockquote>
<p><strong>試験のポイント：</strong>「特定のユースケースで2つの基盤モデルの品質を比較する方法は？」→ <strong>Amazon Bedrockモデル評価</strong>。自動指標と人間評価の両方をサポート。</p>
</blockquote>

<h2 id="data-prep"><strong>7. トレーニングデータのベストプラクティス</strong></h2>

<table>
<thead><tr><th>プラクティス</th><th>理由</th></tr></thead>
<tbody>
<tr><td><strong>高品質データ</strong></td><td>ゴミを入れればゴミが出る</td></tr>
<tr><td><strong>多様な例</strong></td><td>狭いパターンへの過学習を防止</td></tr>
<tr><td><strong>バランスの取れたクラス</strong></td><td>多数クラスへの偏りを回避</td></tr>
<tr><td><strong>クリーンなデータ</strong></td><td>重複、エラー、PIIを除去</td></tr>
<tr><td><strong>十分な量</strong></td><td>ファインチューニングには通常1000+</td></tr>
<tr><td><strong>トレーニング/検証分割</strong></td><td>未見のデータで評価</td></tr>
<tr><td><strong>フォーマットの一貫性</strong></td><td>すべての例で同じ構造</td></tr>
</tbody>
</table>

<h2 id="summary-table"><strong>8. まとめ：いつ何を使うか</strong></h2>

<table>
<thead><tr><th>シナリオ</th><th>最適なアプローチ</th></tr></thead>
<tbody>
<tr><td>シンプルなタスク、モデルがすでに得意</td><td>プロンプトエンジニアリング</td></tr>
<tr><td>特定のパターンに従わせたい</td><td>Few-shotプロンプティング</td></tr>
<tr><td>社内ドキュメントからの回答が必要</td><td>RAG</td></tr>
<tr><td>特定のスタイル/トーン/フォーマットが必要</td><td>ファインチューニング</td></tr>
<tr><td>モデルがドメイン語彙を知らない</td><td>継続的事前トレーニング + ファインチューニング</td></tr>
<tr><td>人間の好みに整合</td><td>RLHF（FMプロバイダーが実施）</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>9. 練習問題</strong></h2>

<p><strong>Q1：</strong>法律事務所がAIアシスタントに事務所承認の特定の文体で法的文書を生成させたいと考えています。承認済みの文書が5,000件あります。最も適切なカスタマイズアプローチはどれですか？</p>
<ul>
<li>A) ナレッジベースによるRAG</li>
<li>B) Zero-shotプロンプティング</li>
<li>C) 承認済み文書例でのファインチューニング ✓</li>
<li>D) 法律教科書での継続的事前トレーニング</li>
</ul>
<p><em>解説：ファインチューニングは、ラベル付きの例でモデルに特定の文体を教えるのに理想的です。RAGは情報検索用であり、スタイルの学習ではありません。継続的事前トレーニングは法的概念を教えますが、事務所固有のスタイルは教えません。</em></p>

<p><strong>Q2：</strong>大規模言語モデルのパラメータの小さな割合のみを更新してファインチューニングできるテクニックはどれですか？</p>
<ul>
<li>A) フルファインチューニング</li>
<li>B) LoRA（Low-Rank Adaptation） ✓</li>
<li>C) 継続的事前トレーニング</li>
<li>D) RLHF</li>
</ul>
<p><em>解説：LoRAはPEFT（パラメータ効率的ファインチューニング）手法で、元のモデルの重みを凍結したまま小さな学習可能なアダプター行列を追加します。通常、全パラメータの1%未満を更新します。</em></p>

<p><strong>Q3：</strong>企業が基盤モデルをファインチューニングしましたが、トレーニングデータではうまく機能し、新しいデータでは性能が低いです。この問題は何と呼ばれますか？</p>
<ul>
<li>A) 過少適合（Underfitting）</li>
<li>B) 過学習（Overfitting） ✓</li>
<li>C) 高バイアス</li>
<li>D) データドリフト</li>
</ul>
<p><em>解説：過学習は、モデルが一般的なパターンを学習する代わりにトレーニングデータを暗記した場合に発生します。解決策：より多くのトレーニングデータ、正則化、低い学習率、早期停止、データ拡張。</em></p>
