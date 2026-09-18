---
id: 019c9619-nv01-p4-l10
title: '第10課：LLM評価とLoRAファインチューニング'
slug: bai-10-llm-evaluation-lora-fine-tuning
description: >-
  評価手法：ベンチマーク（GSM8K）、LLM-as-a-Judge、ELOランキング。
  NeMo Evaluatorマイクロサービス、MLflow実験追跡。
  メトリクス：BLEU、F1スコア、セマンティック類似度。
  LoRA & QLoRAファインチューニング：理論と実践。
  NeMo Customizer：ファインチューニングジョブ。最終模擬試験と試験戦略。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 10
section_title: "パート4：Agentic AIとLLMカスタマイズ"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'NVIDIA DLI 試験対策 — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="1-llm-evaluation-fundamentals">1. LLM評価の基礎</h2>

<h3 id="1-1-tai-sao-evaluation-quan-trong">1.1. なぜ評価が重要なのか</h3>

<p>測定できないものは改善できません。本番環境では、「もっともらしく聞こえる」が事実と異なる回答を生成するLLMは深刻な結果を引き起こす可能性があります — 誤った医療アドバイスから経済的損失まで。<strong>評価</strong>はあらゆるLLMアプリケーションをデプロイする前に必須のステップです。</p>

<p><strong>「Garbage In, Garbage Out」</strong>の原則はパイプライン全体に適用されます：</p>

<ul>
<li><strong>悪いプロンプト</strong> → 悪い出力 → 悪い評価 → 誤った自信</li>
<li><strong>悪い評価指標</strong> → 間違ったモデル選択 → 本番障害</li>
<li><strong>評価なし</strong> → 検出されないモデル劣化 → サイレント障害</li>
</ul>

<h3 id="1-2-phan-loai-evaluation">1.2. 評価カテゴリ</h3>

<p>LLMを評価する主な方法は3つあります：</p>

<table>
<thead>
<tr><th>方法</th><th>メリット</th><th>デメリット</th><th>ユースケース</th></tr>
</thead>
<tbody>
<tr><td><strong>自動メトリクス</strong></td><td>高速、再現可能、低コスト</td><td>ニュアンスを見逃す、ゲーム可能</td><td>CI/CDパイプライン、回帰テスト</td></tr>
<tr><td><strong>人間評価</strong></td><td>ゴールドスタンダード、ニュアンスを捉える</td><td>遅い、高コスト、一貫性がない</td><td>最終検証、安全性監査</td></tr>
<tr><td><strong>LLM-as-a-Judge</strong></td><td>スケーラブル、人間に近い品質</td><td>ジャッジモデルのバイアス</td><td>大規模評価、迅速なイテレーション</td></tr>
</tbody>
</table>

<h3 id="1-3-evaluation-dimensions">1.3. 評価の次元</h3>

<p>各LLMアプリケーションは複数の次元で評価する必要があります：</p>

<ul>
<li><strong>正確性 / 正確度</strong> — 回答は事実として正しいか？</li>
<li><strong>流暢性</strong> — 言語は自然で正しい形式か？</li>
<li><strong>関連性</strong> — 回答は質問に関連しているか？</li>
<li><strong>安全性 / 無害性</strong> — 出力は安全で適切か？</li>
<li><strong>レイテンシ</strong> — 応答時間は許容範囲内か？（p50、p95、p99）</li>
<li><strong>コスト</strong> — トークン単価は妥当か？</li>
</ul>

<pre><code class="language-text">
LLM評価パイプライン — データから判断まで
══════════════════════════════════════════════════════════════

  ┌─────────────┐     ┌─────────────────┐     ┌──────────────┐
  │  テストデータ │────►│  LLM推論        │────►│  生の出力     │
  │  (プロンプト+ │     │  (評価対象の     │     │  (生成された   │
  │  リファレンス)│     │   モデル)        │     │   レスポンス)  │
  └─────────────┘     └─────────────────┘     └──────┬───────┘
                                                      │
                    ┌─────────────────────────────────┼──────┐
                    │         評価エンジン              │      │
                    │  ┌──────────┐ ┌───────────────┐  │      │
                    │  │自動      │ │ LLM-as-Judge  │  │      │
                    │  │メトリクス│ │ (GPT-4/Claude)│  │      │
                    │  │BLEU,ROUGE│ │ペアワイズ/ポイ │  │      │
                    │  │F1,Cosine │ │ントワイズ採点  │  │      │
                    │  └────┬─────┘ └──────┬────────┘  │      │
                    │       │              │           │      │
                    │       ▼              ▼           │      │
                    │  ┌────────────────────────────┐  │      │
                    │  │   集約スコアカード          │  │      │
                    │  │ 正確性: 0.87  安全性: 95%  │  │      │
                    │  │ レイテンシp95: 1.2s F1:0.82│  │      │
                    │  └────────────┬───────────────┘  │      │
                    └───────────────┼──────────────────┘      │
                                    │                         │
                                    ▼                         │
                    ┌─────────────────────────────┐           │
                    │   MLflow実験トラッカー        │◄──────────┘
                    │   ラン比較、可視化            │
                    │   最適モデルバージョンを選択   │
                    └─────────────────────────────┘
</code></pre>

<blockquote><p><strong>試験のヒント：</strong> DLIの評価では「Xに最適な評価方法はどれか？」という質問がよく出されます — 覚えておきましょう：<strong>BLEU</strong>は翻訳用、<strong>ROUGE</strong>は要約用、<strong>F1</strong>はQA用、<strong>LLM-as-a-Judge</strong>は全体的な品質用。すべてのタスクに対応する単一のメトリクスは存在しません。</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai10-lora-fine-tuning.webp" alt="LoRAファインチューニング — Low-Rank Adaptation、QLoRA、評価メトリクスダッシュボード" loading="lazy" /><figcaption>LoRAファインチューニング — Low-Rank Adaptation、QLoRA、評価メトリクスダッシュボード</figcaption></figure>

<h2 id="2-automated-metrics-deep-dive">2. 自動メトリクスの詳細</h2>

<h3 id="2-1-bleu-score">2.1. BLEUスコア — Bilingual Evaluation Understudy</h3>

<p>BLEUは生成テキストとリファレンステキスト間の<strong>n-gramの重複</strong>を測定します。元々は機械翻訳用に設計されましたが、多くのNLGタスクに広く適用されています。</p>

<p>基本式：</p>

<p>$$\text{BLEU} = BP \cdot \exp\left(\sum_{n=1}^{N} w_n \log p_n\right)$$</p>

<p>各項の意味：</p>

<ul>
<li>$p_n$ = <strong>修正n-gram精度</strong> — 候補テキスト中のn-gramのうち、リファレンスにも出現する割合</li>
<li>$w_n = \frac{1}{N}$ — 均等重み（通常N=4、つまり$w_n = 0.25$）</li>
<li>$BP$ = <strong>簡潔性ペナルティ</strong> — リファレンスより短い候補にペナルティを与えます：</li>
</ul>

<p>$$BP = \begin{cases} 1 & \text{if } c > r \\ e^{1 - r/c} & \text{if } c \leq r \end{cases}$$</p>

<p>ここで$c$ = 候補の長さ、$r$ = リファレンスの長さです。</p>

<p>解釈：BLEU = 1.0 → リファレンスと完全一致。BLEU = 0.0 → n-gramの重複なし。実務では、BLEU > 0.3が翻訳として許容されます。</p>

<h3 id="2-2-bleu-implementation">2.2. BLEUをスクラッチから実装する</h3>

<pre><code class="language-python">
from collections import Counter
import math

def count_ngrams(tokens, n):
    """シーケンス内のすべてのn-gramをカウントします。"""
    return Counter(tuple(tokens[i:i+n]) for i in range(len(tokens) - n + 1))

def modified_precision(candidate, references, n):
    """
    修正n-gram精度：リファレンスの最大カウントでクリップします。
    候補が同じ単語を繰り返す場合のスコア膨張を防ぎます。
    """
    cand_ngrams = count_ngrams(candidate, n)
    
    # 全リファレンスにわたる各n-gramの最大カウント
    max_ref_counts = Counter()
    for ref in references:
        ref_ngrams = count_ngrams(ref, n)
        for ngram, count in ref_ngrams.items():
            max_ref_counts[ngram] = max(max_ref_counts[ngram], count)
    
    # 候補のカウントをリファレンスの最大カウントでクリップ
    clipped_count = 0
    total_count = 0
    for ngram, count in cand_ngrams.items():
        clipped_count += min(count, max_ref_counts.get(ngram, 0))
        total_count += count
    
    if total_count == 0:
        return 0.0
    return clipped_count / total_count

def brevity_penalty(candidate, references):
    """簡潔性ペナルティ：リファレンスより短い候補にペナルティを与えます。"""
    c = len(candidate)
    # 最も近い長さのリファレンスを選択
    r = min((abs(len(ref) - c), len(ref)) for ref in references)[1]
    
    if c > r:
        return 1.0
    elif c == 0:
        return 0.0
    else:
        return math.exp(1 - r / c)

def bleu_score(candidate, references, max_n=4):
    """
    BLEUスコアを計算します（BLEU-1からBLEU-N）。
    candidate: トークンのリスト
    references: トークンリストのリスト
    """
    weights = [1.0 / max_n] * max_n
    bp = brevity_penalty(candidate, references)
    
    log_avg = 0.0
    for n in range(1, max_n + 1):
        p_n = modified_precision(candidate, references, n)
        if p_n == 0:
            return 0.0  # いずれかのp_nが0ならBLEU = 0
        log_avg += weights[n - 1] * math.log(p_n)
    
    return bp * math.exp(log_avg)

# --- 例 ---
candidate = "the cat sat on the mat".split()
references = [
    "the cat is on the mat".split(),
    "there is a cat on the mat".split(),
]

score = bleu_score(candidate, references, max_n=4)
print(f"BLEU-4 score: {score:.4f}")
# Output: BLEU-4 score: 0.4647
</code></pre>

<h3 id="2-3-rouge-score">2.3. ROUGEスコア — Recall-Oriented Understudy</h3>

<p><strong>ROUGE</strong>は再現率指向のメトリクスです — 候補によってリファレンスの内容がどれだけ「カバー」されているかを測定します。要約にはキーポイントを含める必要があるため、<strong>要約</strong>に適しています。</p>

<table>
<thead>
<tr><th>バリアント</th><th>計算式</th><th>意味</th></tr>
</thead>
<tbody>
<tr><td><strong>ROUGE-N</strong></td><td>n-gram重複の再現率</td><td>ROUGE-1（ユニグラム）、ROUGE-2（バイグラム）</td></tr>
<tr><td><strong>ROUGE-L</strong></td><td>最長共通部分列（LCS）</td><td>文レベルの構造を捉える</td></tr>
<tr><td><strong>ROUGE-Lsum</strong></td><td>分割した文でLCSを計算</td><td>複数文の要約</td></tr>
</tbody>
</table>

<p>ROUGE-N再現率の公式：</p>

<p>$$\text{ROUGE-N}_{recall} = \frac{\sum_{s \in \text{ref}} \sum_{\text{gram}_n \in s} \text{Count}_{match}(\text{gram}_n)}{\sum_{s \in \text{ref}} \sum_{\text{gram}_n \in s} \text{Count}(\text{gram}_n)}$$</p>

<h3 id="2-4-f1-score-qa">2.4. 質問応答のF1スコア</h3>

<p>QAでは、F1スコアは予測回答と正解間の<strong>トークンレベルの重複</strong>で計算されます：</p>

<p>$$\text{Precision} = \frac{|\text{predicted tokens} \cap \text{truth tokens}|}{|\text{predicted tokens}|}$$</p>

<p>$$\text{Recall} = \frac{|\text{predicted tokens} \cap \text{truth tokens}|}{|\text{truth tokens}|}$$</p>

<p>$$\text{F1} = \frac{2 \cdot P \cdot R}{P + R}$$</p>

<pre><code class="language-python">
def qa_f1_score(prediction: str, ground_truth: str) -> float:
    """
    QA評価用のトークンレベルF1。
    SQuADスタイルの正確な抽出に使用されます。
    """
    pred_tokens = prediction.lower().split()
    truth_tokens = ground_truth.lower().split()
    
    common = set(pred_tokens) & set(truth_tokens)
    num_common = sum(
        min(pred_tokens.count(t), truth_tokens.count(t)) 
        for t in common
    )
    
    if num_common == 0:
        return 0.0
    
    precision = num_common / len(pred_tokens)
    recall = num_common / len(truth_tokens)
    f1 = 2 * precision * recall / (precision + recall)
    return f1

# --- 例 ---
pred = "Barack Obama was the 44th president"
truth = "The 44th president was Barack Obama"

print(f"F1 = {qa_f1_score(pred, truth):.4f}")
# Output: F1 = 0.8571
</code></pre>

<h3 id="2-5-semantic-similarity">2.5. セマンティック類似度 — 埋め込みベース</h3>

<p>n-gramベースの自動メトリクス（BLEU、ROUGE）は<strong>意味的等価性</strong>を見逃します：「The dog chased the cat」と「A canine pursued a feline」はBLEU = 0ですが同一の意味を持ちます。<strong>セマンティック類似度</strong>は埋め込みを使用して意味を比較します。</p>

<p>$$\text{Cosine Similarity} = \frac{\vec{a} \cdot \vec{b}}{||\vec{a}|| \cdot ||\vec{b}||}$$</p>

<pre><code class="language-python">
import numpy as np

def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    """2つの埋め込みベクトル間のコサイン類似度。"""
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

# 実務では：sentence-transformersを使用
# from sentence_transformers import SentenceTransformer
# model = SentenceTransformer("all-MiniLM-L6-v2")
# embeddings = model.encode(["The dog chased the cat",
#                             "A canine pursued a feline"])
# sim = cosine_similarity(embeddings[0], embeddings[1])
# → sim ≈ 0.85（n-gramが完全に異なっても意味が一致）
</code></pre>

<h3 id="2-6-metric-selection-guide">2.6. メトリクス選択ガイド — どのタスクにどのメトリクスを使うか？</h3>

<table>
<thead>
<tr><th>タスク</th><th>主要メトリクス</th><th>副次メトリクス</th><th>理由</th></tr>
</thead>
<tbody>
<tr><td>機械翻訳</td><td>BLEU</td><td>COMET、chrF</td><td>精度指向：正確な単語レベルの翻訳</td></tr>
<tr><td>要約</td><td>ROUGE-L</td><td>BERTScore</td><td>再現率指向：キーポイントをカバーする必要がある</td></tr>
<tr><td>質問応答</td><td>F1 / Exact Match</td><td>セマンティック類似度</td><td>トークン重複＋意味</td></tr>
<tr><td>対話 / チャット</td><td>LLM-as-a-Judge</td><td>人間評価</td><td>主観的な品質、自動測定が困難</td></tr>
<tr><td>コード生成</td><td>pass@k</td><td>実行精度</td><td>コードは「似ている」だけでなく正しく実行される必要がある</td></tr>
<tr><td>RAGパイプライン</td><td>コンテキスト関連性 + 忠実性</td><td>回答F1</td><td>多次元評価（RAGASフレームワーク）</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のヒント：</strong> 「要約に適切なメトリクス」を問われたら → <strong>ROUGE</strong>（再現率）を選択。「翻訳のメトリクス」なら → <strong>BLEU</strong>（精度）を選択。これは非常によく出る試験問題です。</p></blockquote>

<p><strong>Q1：</strong> あるチームがカスタマーサポート用のLLM搭載チャットボットを評価しています。意味は正しいがリファレンスの回答とは表現が異なる言い換えに対応できるメトリクスが必要です。最も適切なメトリクスはどれですか？</p>

<ul>
<li>A) BLEU-4</li>
<li>B) ROUGE-1</li>
<li>C) Exact Match</li>
<li>D) セマンティック類似度（埋め込みベース）</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>D) セマンティック類似度（埋め込みベース）</strong> ✓</p>
<p><em>BLEUとROUGEはn-gram重複に依存するため、言い換え（同じ意味、異なる単語）では失敗します。Exact Matchは100%の文字列一致のみを捉えます。セマンティック類似度は埋め込みベクトルを使用して、表現が異なっても意味の等価性を捉えます。カスタマーサポートでは、ユーザーは同じ問題をさまざまな言い方で表現するため、埋め込みベースのメトリクスが最も適切です。</em></p>
</details>

<h2 id="3-llm-as-a-judge">3. LLM-as-a-Judgeと人間評価</h2>

<h3 id="3-1-llm-as-a-judge-pattern">3.1. LLM-as-a-Judgeパターン</h3>

<p>アイデア：<strong>強力なモデル</strong>（GPT-4、Claude 3.5）を使用して、<strong>弱いモデル</strong>またはテスト対象モデルの出力を評価します。このアプローチは人間評価よりもスケーラブルで、自動メトリクスよりも人間の判断に近いものです。</p>

<p>2つの主要タイプ：</p>

<table>
<thead>
<tr><th>タイプ</th><th>仕組み</th><th>メリット</th><th>デメリット</th></tr>
</thead>
<tbody>
<tr><td><strong>ポイントワイズ</strong></td><td>ジャッジが1つのレスポンスを採点（1-5）</td><td>シンプル、絶対スコア</td><td>較正バイアス</td></tr>
<tr><td><strong>ペアワイズ</strong></td><td>ジャッジが2つのレスポンスを比較：A対B</td><td>相対ランキング、バイアスが少ない</td><td>$O(n^2)$の比較数</td></tr>
</tbody>
</table>

<h3 id="3-2-pointwise-implementation">3.2. ポイントワイズスコアリングの実装</h3>

<pre><code class="language-python">
import json

JUDGE_PROMPT = """You are an impartial judge evaluating AI assistant responses.
Rate the following response on a scale of 1-5 for each criterion.

## Criteria
- **Correctness** (1-5): Is the information factually accurate?
- **Helpfulness** (1-5): Does it actually answer the question?
- **Conciseness** (1-5): Is it appropriately concise without losing important info?
- **Safety** (1-5): Does it avoid harmful, biased, or inappropriate content?

## Question
{question}

## Response to evaluate
{response}

## Output Format (JSON only)
{{
  "correctness": {{"score": int, "reason": "..."}},
  "helpfulness": {{"score": int, "reason": "..."}},
  "conciseness": {{"score": int, "reason": "..."}},
  "safety": {{"score": int, "reason": "..."}},
  "overall": {{"score": float, "summary": "..."}}
}}
"""

def judge_response(client, question: str, response: str) -> dict:
    """
    強力なLLM（GPT-4）をジャッジとして使用します。
    構造化された評価スコアを返します。
    """
    prompt = JUDGE_PROMPT.format(question=question, response=response)
    
    result = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.0,  # 決定論的な採点
        response_format={"type": "json_object"},
    )
    
    return json.loads(result.choices[0].message.content)

# --- 使用例 ---
# scores = judge_response(client,
#     question="What is LoRA fine-tuning?",
#     response="LoRA adds low-rank matrices to freeze model weights..."
# )
# print(scores["overall"]["score"])  # → 4.2
</code></pre>

<h3 id="3-3-elo-ranking-system">3.3. LLMのELOランキングシステム</h3>

<p><strong>ELOレーティング</strong>（チェスから借用）は各モデルにレーティング数値を割り当てます。2つのモデルが「対戦」（ジャッジが勝者を選択）すると、レーティングが更新されます：</p>

<p>$$E_A = \frac{1}{1 + 10^{(R_B - R_A)/400}}$$</p>

<p>$$R'_A = R_A + K \cdot (S_A - E_A)$$</p>

<p>各項の意味：</p>
<ul>
<li>$R_A, R_B$ = 現在のレーティング</li>
<li>$E_A$ = 期待スコア（Aが勝つ確率）</li>
<li>$S_A$ = 実際のスコア（1 = 勝ち、0.5 = 引き分け、0 = 負け）</li>
<li>$K$ = 感度係数（通常K=32）</li>
</ul>

<pre><code class="language-python">
import random

class ELORanker:
    """
    LLM比較用のELOランキングシステム。
    Chatbot Arena（lmsys.org）も同様のシステムを使用しています。
    """
    def __init__(self, k_factor: int = 32, initial_rating: int = 1500):
        self.k = k_factor
        self.initial = initial_rating
        self.ratings: dict[str, float] = {}
        self.match_history: list[dict] = []
    
    def get_rating(self, model: str) -> float:
        return self.ratings.setdefault(model, float(self.initial))
    
    def expected_score(self, ra: float, rb: float) -> float:
        """AがBに勝つ確率。"""
        return 1.0 / (1.0 + 10 ** ((rb - ra) / 400))
    
    def update(self, winner: str, loser: str, draw: bool = False):
        """
        対戦後にレーティングを更新します。
        winner = モデルA、loser = モデルB（または引き分け）。
        """
        ra = self.get_rating(winner)
        rb = self.get_rating(loser)
        
        ea = self.expected_score(ra, rb)
        eb = self.expected_score(rb, ra)
        
        if draw:
            sa, sb = 0.5, 0.5
        else:
            sa, sb = 1.0, 0.0
        
        self.ratings[winner] = ra + self.k * (sa - ea)
        self.ratings[loser] = rb + self.k * (sb - eb)
        
        self.match_history.append({
            "winner": winner, "loser": loser, "draw": draw,
            "new_ratings": dict(self.ratings)
        })
    
    def leaderboard(self) -> list[tuple[str, float]]:
        """ソートされたリーダーボードを返します。"""
        return sorted(self.ratings.items(), key=lambda x: -x[1])

# --- 対戦シミュレーション ---
ranker = ELORanker()
models = ["GPT-4o", "Claude-3.5", "Llama-3-70B", "Gemini-1.5"]

# 50回のランダムなペアワイズ比較（簡略化したシミュレーション）
for _ in range(50):
    a, b = random.sample(models, 2)
    # シミュレーション：GPT-4oとClaudeがより高い勝率
    win_probs = {"GPT-4o": 0.7, "Claude-3.5": 0.65,
                 "Llama-3-70B": 0.45, "Gemini-1.5": 0.55}
    if random.random() < win_probs[a] / (win_probs[a] + win_probs[b]):
        ranker.update(winner=a, loser=b)
    else:
        ranker.update(winner=b, loser=a)

print("=== LLM Leaderboard ===")
for model, rating in ranker.leaderboard():
    print(f"  {model:20s}  ELO: {rating:.0f}")
</code></pre>

<h3 id="3-4-nemo-evaluator">3.4. NeMo Evaluatorマイクロサービス</h3>

<p><strong>NeMo Evaluator</strong>はNVIDIA NeMoフレームワークのコンポーネントで、LLMエンドポイントの体系的な評価を可能にします。YAMLで設定し、REST APIで呼び出します。</p>

<pre><code class="language-python">
# NeMo Evaluator — 設定例
nemo_eval_config = {
    "type": "llm-as-judge",
    "model": {
        "api_endpoint": "http://nim-llm:8000/v1/chat/completions",
        "model_id": "meta/llama-3.1-70b-instruct"
    },
    "judge": {
        "api_endpoint": "http://nim-judge:8000/v1/chat/completions",
        "model_id": "nvidia/llama-3.1-nemotron-70b-instruct"
    },
    "dataset": {
        "path": "/data/eval/legal_qa_golden.jsonl",
        "format": "jsonl",
        "fields": {
            "question": "input",
            "reference": "expected_output"
        }
    },
    "metrics": ["correctness", "relevance", "conciseness"],
    "output": {
        "path": "/results/eval_run_001.json",
        "mlflow_tracking_uri": "http://mlflow:5000",
        "experiment_name": "legal-qa-eval"
    }
}
</code></pre>

<blockquote><p><strong>試験のヒント：</strong> NeMo Evaluatorは<strong>自動メトリクス</strong>（BLEU、ROUGE）と<strong>LLM-as-a-Judge</strong>の両方をサポートしています。「NeMoを使用してデプロイ前にモデルを評価する方法」と問われたら → NeMo Evaluatorマイクロサービス。「評価実験を追跡する方法」と問われたら → <strong>MLflow</strong>連携。</p></blockquote>

<p><strong>Q2：</strong> LLMのELOランキングシステムにおいて、モデルAのレーティングが1600、モデルBのレーティングが1400です。ペアワイズ比較でモデルAが勝つ期待確率はいくらですか？</p>

<ul>
<li>A) 50%</li>
<li>B) 64%</li>
<li>C) 76%</li>
<li>D) 88%</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>C) 76%</strong> ✓</p>
<p><em>公式を適用すると：$E_A = \frac{1}{1 + 10^{(1400-1600)/400}} = \frac{1}{1 + 10^{-0.5}} = \frac{1}{1 + 0.316} = \frac{1}{1.316} \approx 0.76$、つまり76%です。200ポイントのレーティング差は約76%の勝率に対応します。覚えておきましょう：400ポイントの差ごとに期待勝率比が10倍になります。</em></p>
</details>

<h2 id="4-systematic-evaluation-nemo-mlflow">4. NeMoとMLflowによる体系的評価</h2>

<h3 id="4-1-nemo-evaluator-workflow">4.1. NeMo Evaluatorワークフロー</h3>

<p>NVIDIA NeMoエコシステムにおける体系的な評価パイプライン：</p>

<pre><code class="language-text">
NeMo評価ワークフロー — エンドツーエンド
══════════════════════════════════════════════════════════════

  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
  │  評価データ    │     │  NIMモデル    │     │  ジャッジ     │
  │  セットの準備  │     │  テスト対象   │     │  モデルの     │
  │  (JSONL)     │     │  (NIM)       │     │  デプロイ     │
  │              │     │ Llama-3-8B-Inst│    │ (Nemotron)   │
  └──────┬───────┘     └──────┬───────┘     └──────┬───────┘
         │                    │                    │
         ▼                    ▼                    ▼
  ┌────────────────────────────────────────────────────────┐
  │              NeMo Evaluatorマイクロサービス              │
  │                                                        │
  │  1. 評価データセットをロード（質問＋リファレンス）          │
  │  2. 各質問をテスト対象モデルに送信                       │
  │  3. レスポンスを収集                                    │
  │  4. 自動メトリクスおよび/またはLLMジャッジでスコアリング   │
  │  5. 結果を集約 → スコアカード                           │
  └────────────────────────┬───────────────────────────────┘
                           │
                           ▼
  ┌────────────────────────────────────────────────────────┐
  │                    MLflowサーバー                        │
  │  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐   │
  │  │ 実験1       │  │ 実験2       │  │ 実験3        │   │
  │  │ ベースモデル │  │ LoRA v1     │  │ LoRA v2      │   │
  │  │ F1: 0.62    │  │ F1: 0.78    │  │ F1: 0.81     │   │
  │  │ BLEU: 0.31  │  │ BLEU: 0.42  │  │ BLEU: 0.45   │   │
  │  └─────────────┘  └─────────────┘  └──────────────┘   │
  │                                                        │
  │  → 最良を選択：実験3（LoRA v2）→ NIMにデプロイ          │
  └────────────────────────────────────────────────────────┘
</code></pre>

<h3 id="4-2-gsm8k-benchmark">4.2. GSM8Kベンチマーク</h3>

<p><strong>GSM8K</strong>（Grade School Math 8K）は、LLMの<strong>推論能力</strong>をテストするために使用される約8,500問の小学校算数問題を含むベンチマークです。各問題にはchain-of-thoughtの解答が含まれています。</p>

<pre><code class="language-python">
# GSM8Kの問題形式の例
gsm8k_example = {
    "question": "Janet buys 3 pounds of steak at $8/pound and 2 pounds "
                "of chicken at $5/pound. How much does she spend total?",
    "answer": "3 pounds of steak cost 3 * 8 = <<3*8=24>>24 dollars. "
              "2 pounds of chicken cost 2 * 5 = <<2*5=10>>10 dollars. "
              "Total cost is 24 + 10 = <<24+10=34>>34 dollars. #### 34"
}

# 評価：####の後の最終回答を抽出し、モデル出力と比較
def extract_gsm8k_answer(solution: str) -> str:
    """GSM8K形式から最終回答を抽出します。"""
    if "####" in solution:
        return solution.split("####")[-1].strip()
    # フォールバック：最後の数値を取得
    import re
    numbers = re.findall(r'-?\d+\.?\d*', solution)
    return numbers[-1] if numbers else ""

def evaluate_gsm8k(model_answers: list[str],
                   ground_truths: list[str]) -> dict:
    """GSM8Kの正解率を計算します。"""
    correct = 0
    for pred, truth in zip(model_answers, ground_truths):
        pred_ans = extract_gsm8k_answer(pred)
        truth_ans = extract_gsm8k_answer(truth)
        if pred_ans == truth_ans:
            correct += 1
    accuracy = correct / len(ground_truths)
    return {"accuracy": accuracy, "correct": correct,
            "total": len(ground_truths)}
</code></pre>

<h3 id="4-3-zero-shot-vs-few-shot">4.3. Zero-Shot vs Few-Shot評価</h3>

<p>異なるプロンプト戦略でのパフォーマンス比較：</p>

<table>
<thead>
<tr><th>設定</th><th>GSM8K正解率（Llama-3-8B）</th><th>GSM8K正解率（Llama-3-70B）</th></tr>
</thead>
<tbody>
<tr><td><strong>Zero-shot</strong></td><td>~48%</td><td>~78%</td></tr>
<tr><td><strong>Zero-shot CoT</strong>（"think step by step"）</td><td>~56%</td><td>~83%</td></tr>
<tr><td><strong>5-shot</strong></td><td>~55%</td><td>~85%</td></tr>
<tr><td><strong>5-shot CoT</strong></td><td>~62%</td><td>~90%</td></tr>
</tbody>
</table>

<p>観察：<strong>Few-shot + Chain-of-Thought</strong>は常に最高のパフォーマンスを発揮します。大規模モデル（70B）は小規模モデル（8B）よりもCoTの恩恵を大きく受けます。</p>

<h3 id="4-4-mlflow-tracking">4.4. MLflow実験追跡</h3>

<pre><code class="language-python">
import mlflow

# MLflow実験のセットアップ
mlflow.set_tracking_uri("http://mlflow:5000")
mlflow.set_experiment("legal-qa-model-comparison")

def run_evaluation_experiment(model_name: str, 
                              model_endpoint: str,
                              eval_dataset: list[dict]):
    """
    評価を実行し、結果をMLflowに記録します。
    """
    with mlflow.start_run(run_name=f"eval-{model_name}"):
        # パラメータを記録
        mlflow.log_param("model_name", model_name)
        mlflow.log_param("eval_dataset_size", len(eval_dataset))
        mlflow.log_param("eval_type", "automated + llm-judge")
        
        # 推論＋評価を実行
        results = run_nemo_evaluation(model_endpoint, eval_dataset)
        
        # メトリクスを記録
        mlflow.log_metric("bleu_score", results["bleu"])
        mlflow.log_metric("rouge_l", results["rouge_l"])
        mlflow.log_metric("f1_score", results["f1"])
        mlflow.log_metric("judge_correctness", results["judge_correctness"])
        mlflow.log_metric("judge_relevance", results["judge_relevance"])
        mlflow.log_metric("latency_p95_ms", results["latency_p95"])
        
        # アーティファクトを記録（全結果、サンプル出力）
        mlflow.log_dict(results, "full_results.json")
        
        print(f"[{model_name}] F1={results['f1']:.3f}, "
              f"BLEU={results['bleu']:.3f}, "
              f"Judge={results['judge_correctness']:.2f}")
</code></pre>

<p><strong>Q3：</strong> あるデータサイエンティストがNeMo Evaluatorを使用して3つのモデル構成（ベースモデル、LoRAファインチューニング（ランク8）、LoRAファインチューニング（ランク32））で同じ評価を実行しました。すべての結果はMLflowに記録されています。最適な構成を選択するためにどのMLflow機能を使用すべきですか？</p>

<ul>
<li>A) MLflow Model Registry</li>
<li>B) MLflow Projects</li>
<li>C) MLflow実験比較 / search runs</li>
<li>D) MLflow Deployments</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>C) MLflow実験比較 / search runs</strong> ✓</p>
<p><em>MLflow実験では、ラン間のメトリクスを比較できます — フィルタ、ソート、可視化。Model Registryは既に選択されたモデルのバージョン管理用です。Projectsはコードのパッケージング用です。Deploymentsはモデルの提供用です。「最適な構成を選択する」ステップは実験比較に該当します。</em></p>
</details>

<h2 id="5-lora-theory">5. LoRA — Low-Rank Adaptationの理論</h2>

<h3 id="5-1-van-de-full-fine-tuning">5.1. フルファインチューニングの問題点</h3>

<p>フルファインチューニングはモデルの<strong>すべて</strong>のパラメータを更新します。現代のLLMでは、これは非常に高コストです：</p>

<table>
<thead>
<tr><th>モデル</th><th>パラメータ数</th><th>フルFTメモリ（FP16）</th><th>フルFTメモリ（FP32）</th><th>必要なGPU</th></tr>
</thead>
<tbody>
<tr><td>Llama-3-8B</td><td>8B</td><td>~32 GB</td><td>~64 GB</td><td>1× A100 80GB</td></tr>
<tr><td>Llama-3-70B</td><td>70B</td><td>~280 GB</td><td>~560 GB</td><td>4-8× A100 80GB</td></tr>
<tr><td>Llama-3-405B</td><td>405B</td><td>~1.6 TB</td><td>~3.2 TB</td><td>32× A100 80GB</td></tr>
</tbody>
</table>

<p>コスト以外にも、フルファインチューニングは以下の問題を引き起こします：</p>

<ul>
<li><strong>壊滅的忘却</strong> — 新しいタスクを学習する際に、モデルが以前の知識を忘れてしまう</li>
<li><strong>ストレージオーバーヘッド</strong> — ファインチューニングされた各バージョンがモデルのフルコピーになる</li>
<li><strong>過学習リスク</strong> — 小さなデータセットで過学習しやすい</li>
</ul>

<h3 id="5-2-lora-intuition">5.2. LoRAの直感 — 重み更新は低ランク</h3>

<p>論文<em>「LoRA: Low-Rank Adaptation of Large Language Models」</em>（Hu et al., 2021）からの重要な観察：LLMをファインチューニングする際、<strong>重み変化$\Delta W$は低ランク</strong>です — つまり情報のほとんどが少数の主要な次元に集中しています。</p>

<p>$\Delta W \in \mathbb{R}^{d \times k}$（パラメータが多すぎる）を直接学習する代わりに、2つの小さな行列の積に分解します：</p>

<p>$$W' = W + \Delta W = W + BA$$</p>

<p>各項の意味：</p>
<ul>
<li>$W \in \mathbb{R}^{d \times k}$ — 事前学習済み重み（凍結、更新なし）</li>
<li>$B \in \mathbb{R}^{d \times r}$ — LoRAダウンプロジェクション</li>
<li>$A \in \mathbb{R}^{r \times k}$ — LoRAアッププロジェクション</li>
<li>$r \ll \min(d, k)$ — <strong>ランク</strong>、通常r = 4、8、16、32</li>
</ul>

<h3 id="5-3-parameter-count">5.3. パラメータ数の計算</h3>

<p>節約効果は劇的です。例えば、単一のアテンション層の場合：</p>

<p>$$\text{Full params} = d \times k$$</p>

<p>$$\text{LoRA params} = d \times r + r \times k = r(d + k)$$</p>

<p>$$\text{Ratio} = \frac{r(d+k)}{dk}$$</p>

<pre><code class="language-python">
def lora_param_analysis(d: int, k: int, r: int, 
                        num_layers: int, 
                        target_modules: int = 4):
    """
    LoRA構成のパラメータ数を計算します。
    target_modules：Q、K、V、Oプロジェクション（通常4）
    """
    full_params_per_layer = d * k * target_modules
    lora_params_per_layer = r * (d + k) * target_modules
    
    total_full = full_params_per_layer * num_layers
    total_lora = lora_params_per_layer * num_layers
    
    ratio = total_lora / total_full * 100
    
    return {
        "full_params": f"{total_full:,}",
        "lora_params": f"{total_lora:,}",
        "ratio": f"{ratio:.2f}%",
        "savings": f"{100 - ratio:.2f}%"
    }

# Llama-3-8B: d=4096, k=4096, 32層
result = lora_param_analysis(d=4096, k=4096, r=16, num_layers=32)
print(f"Full fine-tuning: {result['full_params']} params")
print(f"LoRA (r=16):      {result['lora_params']} params")
print(f"LoRA / Full:       {result['ratio']}")
print(f"Savings:           {result['savings']}")

# Output:
# Full fine-tuning: 2,147,483,648 params  (~2.1B アテンションのみ)
# LoRA (r=16):      16,777,216 params      (~16.8M)
# LoRA / Full:       0.78%
# Savings:           99.22%
</code></pre>

<h3 id="5-4-rank-selection">5.4. ランク選択 — トレードオフ</h3>

<table>
<thead>
<tr><th>ランク（$r$）</th><th>学習可能パラメータ</th><th>品質</th><th>学習速度</th><th>ユースケース</th></tr>
</thead>
<tbody>
<tr><td>$r = 4$</td><td>非常に少ない（~4M）</td><td>単純なタスクに良好</td><td>最速</td><td>スタイル変換、フォーマット調整</td></tr>
<tr><td>$r = 8$</td><td>少ない（~8M）</td><td>良好〜非常に良好</td><td>高速</td><td>ドメイン適応、QA</td></tr>
<tr><td>$r = 16$</td><td>中程度（~17M）</td><td>非常に良好</td><td>中程度</td><td>ほとんどのタスク（デフォルト選択）</td></tr>
<tr><td>$r = 32$</td><td>やや多い（~34M）</td><td>優秀</td><td>やや遅い</td><td>複雑なドメイン、コード生成</td></tr>
<tr><td>$r = 64$</td><td>かなり多い（~67M）</td><td>フルFTに近い</td><td>遅い</td><td>収穫逓減</td></tr>
</tbody>
</table>

<h3 id="5-5-alpha-scaling">5.5. Alphaスケーリング係数</h3>

<p>LoRAはスケーリング係数$\alpha$を使用して適応の「影響度」を制御します：</p>

<p>$$h = Wx + \frac{\alpha}{r} \cdot BAx$$</p>

<p>通常$\alpha = r$または$\alpha = 2r$です。$\alpha = r$の場合、スケーリング係数= 1（変更なし）。$\alpha$を増加させる → LoRA適応の影響がより大きくなります。</p>

<h3 id="5-6-which-layers">5.6. どの層にLoRAを適用するか？</h3>

<p>Transformerでは、LoRAは通常<strong>アテンションプロジェクション</strong>に適用されます：</p>

<ul>
<li><strong>Q（Query）</strong> — ✓ 常に推奨</li>
<li><strong>K（Key）</strong> — ✓ 推奨</li>
<li><strong>V（Value）</strong> — ✓ 常に推奨（最も重要）</li>
<li><strong>O（Output）</strong> — ✓ オプション、リソース節約のためスキップ可能</li>
<li><strong>MLP層</strong> — オプション、複雑な適応に有効</li>
</ul>

<p>元の論文では、<strong>Q + V</strong>にLoRAを適用するだけでほとんどのタスクに十分であることが示されています。</p>

<pre><code class="language-text">
TransformerアテンションレイヤーにおけるLoRA
══════════════════════════════════════════════════════════════

  入力: x ∈ ℝ^(seq_len × d_model)
  ─────────────────────────────────────────────────────────
  
  ┌─────────────────────────────────┐
  │ オリジナルパス（凍結）           │
  │                                 │
  │ Q = W_q · x    (凍結W_q)       │   ┌──────────────────┐
  │ K = W_k · x    (凍結W_k)       │   │  LoRAアダプター   │
  │ V = W_v · x    (凍結W_v)       │   │                  │
  │                                 │   │ ΔQ = B_q·A_q · x │
  │ Attn = softmax(QK^T/√d) · V    │   │ ΔK = B_k·A_k · x │
  │                                 │   │ ΔV = B_v·A_v · x │
  │ Out = W_o · Attn (凍結W_o)     │   │ ΔO = B_o·A_o·Attn│
  └───────────────┬─────────────────┘   └────────┬─────────┘
                  │                              │
                  ▼                              ▼
          ┌───────────────────────────────────────────┐
          │          h = W·x + (α/r) · BA·x           │
          │               最終出力                     │
          │  (凍結された事前学習済み + 学習可能LoRA)    │
          └───────────────────────────────────────────┘
  
  メモリ：B (d×r) と A (r×k) のみが学習される
  例：d=4096, r=16 → 4096×16 + 16×4096 = 131,072パラメータ
           vs フル：4096×4096 = 16,777,216パラメータ → 128倍小さい！
</code></pre>

<h3 id="5-7-comparison-table">5.7. LoRA vs 代替手法</h3>

<table>
<thead>
<tr><th>手法</th><th>学習可能パラメータ</th><th>メモリ</th><th>品質</th><th>使用する場面</th></tr>
</thead>
<tbody>
<tr><td><strong>フルファインチューニング</strong></td><td>100%</td><td>非常に多い</td><td>最高（ただし過学習リスク）</td><td>大量のデータ＋GPUリソースがある場合</td></tr>
<tr><td><strong>LoRA</strong></td><td>0.1-1%</td><td>少ない</td><td>非常に良好</td><td>ほとんどのタスクのデフォルト選択</td></tr>
<tr><td><strong>QLoRA</strong></td><td>0.1-1%</td><td>非常に少ない</td><td>良好〜非常に良好</td><td>GPUメモリが限られている場合</td></tr>
<tr><td><strong>Prefix Tuning</strong></td><td>&lt;0.1%</td><td>最小</td><td>特定タスクに良好</td><td>短い構造化出力</td></tr>
<tr><td><strong>Adapter Tuning</strong></td><td>1-5%</td><td>中程度</td><td>良好</td><td>マルチタスク学習</td></tr>
<tr><td><strong>Prompt Tuning</strong></td><td>&lt;0.01%</td><td>最小限</td><td>中程度</td><td>単純な分類</td></tr>
</tbody>
</table>

<h3 id="5-8-lora-implementation">5.8. LoRAラッパーをスクラッチから実装する</h3>

<pre><code class="language-python">
import torch
import torch.nn as nn
import math

class LoRALinear(nn.Module):
    """
    nn.Linear層のLoRAラッパー。
    元の重みを凍結し、低ランクBA分解を追加します。
    """
    def __init__(self, original_layer: nn.Linear, 
                 rank: int = 16, alpha: float = 16.0):
        super().__init__()
        self.original = original_layer
        self.rank = rank
        self.alpha = alpha
        self.scaling = alpha / rank
        
        in_features = original_layer.in_features
        out_features = original_layer.out_features
        
        # 元の重みを凍結
        self.original.weight.requires_grad_(False)
        if self.original.bias is not None:
            self.original.bias.requires_grad_(False)
        
        # LoRA行列
        # A：Kaiming uniformで初期化（論文通り）
        # B：ゼロで初期化（開始時にΔW = BA = 0となるように）
        self.lora_A = nn.Parameter(
            torch.empty(rank, in_features)
        )
        self.lora_B = nn.Parameter(
            torch.zeros(out_features, rank)
        )
        
        # AをKaimingで初期化
        nn.init.kaiming_uniform_(self.lora_A, a=math.sqrt(5))
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # 元の凍結パス
        h = self.original(x)
        # LoRA適応パス：scaling * (x @ A^T @ B^T)
        lora_out = x @ self.lora_A.T @ self.lora_B.T
        h = h + self.scaling * lora_out
        return h
    
    def merge_weights(self) -> nn.Linear:
        """
        LoRAを元の重みにマージして推論用にします。
        別途LoRA計算が不要 → オーバーヘッドゼロ。
        """
        merged = nn.Linear(
            self.original.in_features,
            self.original.out_features,
            bias=self.original.bias is not None
        )
        # W' = W + (α/r) × B × A
        merged.weight.data = (
            self.original.weight.data + 
            self.scaling * self.lora_B @ self.lora_A
        )
        if self.original.bias is not None:
            merged.bias.data = self.original.bias.data
        return merged

def apply_lora_to_model(model: nn.Module, 
                        rank: int = 16, 
                        alpha: float = 16.0,
                        target_modules: list[str] = None):
    """
    モデルの指定モジュールにLoRAを適用します。
    target_modules：モジュール名パターンのリスト（例：["q_proj", "v_proj"]）
    """
    if target_modules is None:
        target_modules = ["q_proj", "k_proj", "v_proj", "o_proj"]
    
    lora_params = 0
    frozen_params = 0
    
    for name, module in model.named_modules():
        if isinstance(module, nn.Linear):
            if any(t in name for t in target_modules):
                # LoRAバージョンに置き換え
                parent_name = ".".join(name.split(".")[:-1])
                child_name = name.split(".")[-1]
                parent = dict(model.named_modules())[parent_name]
                
                lora_layer = LoRALinear(module, rank=rank, alpha=alpha)
                setattr(parent, child_name, lora_layer)
                
                lora_params += rank * (module.in_features + module.out_features)
                frozen_params += module.in_features * module.out_features
    
    total = lora_params + frozen_params
    print(f"LoRA params:   {lora_params:>12,} ({lora_params/total*100:.2f}%)")
    print(f"Frozen params: {frozen_params:>12,} ({frozen_params/total*100:.2f}%)")
    return model

# --- 例：トイTransformerにLoRAを適用 ---
# model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-8B")
# model = apply_lora_to_model(model, rank=16, alpha=32)
# Output:
# LoRA params:        8,388,608 (0.39%)
# Frozen params:  2,147,483,648 (99.61%)
</code></pre>

<blockquote><p><strong>試験のヒント：</strong> 非常によく出る問題：「LoRAの初期化 — $B$はどのように初期化されるか？」→ <strong>$B$はゼロで初期化</strong>され、$A$はランダムに初期化されます。これにより学習開始時に$\Delta W = BA = 0$となり、モデルは事前学習済みのパフォーマンスから開始されます。</p></blockquote>

<p><strong>Q4：</strong> あるTransformer層の重み行列$W \in \mathbb{R}^{4096 \times 4096}$があります。LoRAをランク$r=8$で使用した場合、この単一層にLoRAアダプターが追加する学習可能パラメータ数はいくつですか？</p>

<ul>
<li>A) 8,192</li>
<li>B) 32,768</li>
<li>C) 65,536</li>
<li>D) 16,777,216</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>C) 65,536</strong> ✓</p>
<p><em>LoRAパラメータ数 = $d \times r + r \times k = 4096 \times 8 + 8 \times 4096 = 32768 + 32768 = 65536$。比較：元の行列は$4096 \times 4096 = 16{,}777{,}216$パラメータです。LoRAは全パラメータの$65536 / 16777216 = 0.39\%$のみを使用します。選択肢Dはフル行列のサイズ、Aは半分が欠けており、Bは1つの行列のみをカウントしています。</em></p>
</details>

<h2 id="6-qlora-memory-efficient">6. QLoRAとメモリ効率的なファインチューニング</h2>

<h3 id="6-1-qlora-overview">6.1. QLoRA — 量子化LoRA</h3>

<p><strong>QLoRA</strong>（Dettmers et al., 2023）は、凍結された重みに対する<strong>4ビット量子化</strong>とFP16/BF16の<strong>LoRAアダプター</strong>を組み合わせます。3つの主要技術：</p>

<ul>
<li><strong>NF4（4-bit NormalFloat）</strong> — 正規分布する重み値に最適化された量子化フォーマット</li>
<li><strong>二重量子化</strong> — 量子化定数自体をさらに量子化 → 追加で約0.37ビット/パラメータ節約</li>
<li><strong>ページドオプティマイザー</strong> — GPUメモリが満杯の場合、オプティマイザーの状態をCPU RAMに自動オフロード</li>
</ul>

<h3 id="6-2-vram-comparison">6.2. VRAM比較</h3>

<table>
<thead>
<tr><th>モデル</th><th>フルFT（FP16）</th><th>LoRA（FP16ベース）</th><th>QLoRA（NF4ベース）</th><th>コンシューマGPU？</th></tr>
</thead>
<tbody>
<tr><td>Llama-3-8B</td><td>~32 GB</td><td>~18 GB</td><td><strong>~6 GB</strong></td><td>✓ RTX 3090/4090</td></tr>
<tr><td>Llama-3-13B</td><td>~52 GB</td><td>~28 GB</td><td><strong>~10 GB</strong></td><td>✓ RTX 4090 24GB</td></tr>
<tr><td>Llama-3-70B</td><td>~280 GB</td><td>~160 GB</td><td><strong>~36 GB</strong></td><td>✗ A100 80GB必要</td></tr>
<tr><td>Llama-3-405B</td><td>~1.6 TB</td><td>~900 GB</td><td><strong>~200 GB</strong></td><td>✗ マルチA100/H100</td></tr>
</tbody>
</table>

<h3 id="6-3-when-to-use">6.3. 判断ガイド：フルFT vs LoRA vs QLoRA</h3>

<pre><code class="language-text">
判断ツリー：どのファインチューニング手法を選ぶか？
══════════════════════════════════════════════════════════════

  開始：「LLMをファインチューニングしたい」
  │
  ├─ Q：多数のGPUと大規模データセット（>10万サンプル）がありますか？
  │  ├─ はい → フルファインチューニング（最高品質、最もコスト高）
  │  └─ いいえ ↓
  │
  ├─ Q：ベースモデルはFP16でGPUに収まりますか？
  │  ├─ はい → 標準LoRA
  │  │         • ランク16-32
  │  │         • ターゲット：q_proj, v_proj（最小構成）
  │  │         • α = r または 2r
  │  └─ いいえ ↓
  │
  ├─ Q：モデルは4ビットでGPUに収まりますか？
  │  ├─ はい → QLoRA（4ビットNF4）
  │  │         • LoRA設定は同じ
  │  │         • 追加：load_in_4bit=True
  │  │         • 追加：bnb_4bit_quant_type="nf4"
  │  │         • メモリ約3-4倍節約
  │  └─ いいえ → より多くのGPUまたは小さいモデルが必要
  │
  └─ 特殊ケース：
     • 非常に単純なタスク（フォーマット変更）→ Prompt Tuning
     • レイテンシオーバーヘッドゼロが必要 → LoRA + 重みマージ
     • マルチテナントサービング → LoRAアダプター（ユーザーごとにスワップ）
</code></pre>

<h3 id="6-4-qlora-code">6.4. bitsandbytes + PEFTによるQLoRAセットアップ</h3>

<pre><code class="language-python">
import torch
from transformers import (
    AutoModelForCausalLM, 
    AutoTokenizer,
    BitsAndBytesConfig,
    TrainingArguments,
)
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from trl import SFTTrainer

# --- ステップ1：4ビット量子化の設定 ---
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",           # NormalFloat4
    bnb_4bit_compute_dtype=torch.bfloat16, # BF16で計算
    bnb_4bit_use_double_quant=True,       # 二重量子化
)

# --- ステップ2：4ビットでモデルをロード ---
model_name = "meta-llama/Meta-Llama-3-8B-Instruct"
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True,
)
tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token

# kビット学習用にモデルを準備（凍結、キャスト、勾配チェックポイント有効化）
model = prepare_model_for_kbit_training(model)

# --- ステップ3：LoRA設定 ---
lora_config = LoraConfig(
    r=16,                      # ランク
    lora_alpha=32,             # Alpha（= 2*r）
    target_modules=[           # どの層を適応させるか
        "q_proj", "k_proj", 
        "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj",  # MLP層も含む
    ],
    lora_dropout=0.05,         # 正則化用ドロップアウト
    bias="none",               # バイアスは学習しない
    task_type="CAUSAL_LM",
)

# LoRAを適用
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# Output: trainable params: 41,943,040 || all params: 8,030,261,248
#         || trainable%: 0.5223%

# --- ステップ4：学習 ---
training_args = TrainingArguments(
    output_dir="./lora-finetuned",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=2e-4,
    weight_decay=0.01,
    warmup_ratio=0.03,
    lr_scheduler_type="cosine",
    logging_steps=10,
    save_strategy="epoch",
    bf16=True,                  # BF16混合精度を使用
    gradient_checkpointing=True, # メモリ節約
    optim="paged_adamw_32bit",  # ページドオプティマイザー
    report_to="mlflow",         # MLflowで追跡
)

trainer = SFTTrainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,  # 準備済みデータセット
    tokenizer=tokenizer,
    max_seq_length=2048,
    dataset_text_field="text",
)

# 学習開始！
trainer.train()

# --- ステップ5：LoRAアダプターを保存（フルモデルではなく~80MBのみ）---
trainer.model.save_pretrained("./lora-adapter-legal-qa")
</code></pre>

<blockquote><p><strong>試験のヒント：</strong> DLIの評価でよく問われます：「QLoRAがLoRAよりメモリ効率的な理由は？」→ 3つの要因：<strong>(1) NF4量子化</strong>がベースモデルを16ビットから4ビットに圧縮、<strong>(2) 二重量子化</strong>、<strong>(3) ページドオプティマイザー</strong>。LoRAアダプターはFP16/BF16のまま — 凍結された重みのみが量子化されます。</p></blockquote>

<h2 id="7-nemo-customizer">7. NeMo Customizerによるハンズオンファインチューニング</h2>

<h3 id="7-1-nemo-customizer-overview">7.1. NeMo Customizerマイクロサービス</h3>

<p><strong>NeMo Customizer</strong>はNVIDIA NeMoスタックのマイクロサービスで、NIMモデルに対するファインチューニングジョブ（LoRA、P-tuning、フルSFT）をREST API経由で起動できます。学習ループを書く必要はありません — 設定とデータを提供するだけです。</p>

<pre><code class="language-text">
NeMo Customizer — ファインチューニングパイプライン
══════════════════════════════════════════════════════════════

  ┌──────────────────┐    ┌──────────────────┐
  │  学習データ       │    │  ベースモデル     │
  │  (JSONL形式)     │    │  (NIM経由)       │
  │                  │    │  Llama-3-8B-Inst │
  └────────┬─────────┘    └────────┬─────────┘
           │                       │
           ▼                       ▼
  ┌────────────────────────────────────────────┐
  │          NeMo Customizerサービス            │
  │                                            │
  │  POST /v1/customization/jobs               │
  │  {                                         │
  │    "model": "meta/llama-3.1-8b-instruct",│
  │    "training_type": "lora",                │
  │    "dataset": "/data/train.jsonl",         │
  │    "hyperparameters": {                    │
  │      "epochs": 3, "lr": 2e-4,             │
  │      "lora_rank": 16                       │
  │    }                                       │
  │  }                                         │
  └─────────────────────┬──────────────────────┘
                        │
             ジョブステータス：RUNNING → COMPLETED
                        │
                        ▼
  ┌────────────────────────────────────────────┐
  │  出力：LoRAアダプター重み                    │
  │  → NIMにマウントして推論                     │
  │  → NeMo Evaluatorで検証                     │
  │  → MLflowでベースモデルと比較               │
  └────────────────────────────────────────────┘
</code></pre>

<h3 id="7-2-dataset-preparation">7.2. データセットの準備</h3>

<pre><code class="language-python">
import json

def prepare_sft_dataset(raw_data: list[dict], 
                        output_path: str,
                        system_prompt: str = None):
    """
    NeMo Customizer SFT/LoRA学習用のデータをフォーマットします。
    入力形式：[{"question": "...", "answer": "..."}]
    出力：会話形式のJSONL。
    """
    formatted = []
    for item in raw_data:
        conversation = {"messages": []}
        
        if system_prompt:
            conversation["messages"].append({
                "role": "system",
                "content": system_prompt
            })
        
        conversation["messages"].append({
            "role": "user",
            "content": item["question"]
        })
        conversation["messages"].append({
            "role": "assistant", 
            "content": item["answer"]
        })
        
        formatted.append(conversation)
    
    # シャッフルして訓練/検証を分割（90/10）
    import random
    random.shuffle(formatted)
    split_idx = int(len(formatted) * 0.9)
    train_data = formatted[:split_idx]
    val_data = formatted[split_idx:]
    
    # JSONLを書き出し
    for suffix, data in [("train", train_data), ("val", val_data)]:
        path = output_path.replace(".jsonl", f"_{suffix}.jsonl")
        with open(path, "w") as f:
            for item in data:
                f.write(json.dumps(item, ensure_ascii=False) + "\n")
        print(f"Wrote {len(data)} examples to {path}")
    
    return len(train_data), len(val_data)

# --- 例 ---
raw = [
    {"question": "What is Metformin indicated for?",
     "answer": "Metformin is the first-line treatment for type 2 diabetes..."},
    # ... 5000件以上の例を追加
]
prepare_sft_dataset(raw, "legal_qa.jsonl",
    system_prompt="You are a professional medical assistant. "
                  "Answer accurately based on evidence-based medicine.")
</code></pre>

<h3 id="7-3-launch-training">7.3. API経由で学習ジョブを起動</h3>

<pre><code class="language-python">
import requests

CUSTOMIZER_URL = "http://nemo-customizer:8080"

def launch_lora_job(model_name: str,
                    train_file: str,
                    val_file: str,
                    config: dict) -> str:
    """
    NeMo CustomizerでLoRAファインチューニングジョブを起動します。
    戻り値：job_id
    """
    payload = {
        "model": model_name,
        "training_type": "lora",
        "dataset": {
            "train": train_file,
            "validation": val_file,
        },
        "hyperparameters": {
            "epochs": config.get("epochs", 3),
            "learning_rate": config.get("lr", 2e-4),
            "batch_size": config.get("batch_size", 4),
            "lora_rank": config.get("rank", 16),
            "lora_alpha": config.get("alpha", 32),
            "lora_target_modules": config.get(
                "target_modules",
                ["q_proj", "k_proj", "v_proj", "o_proj"]
            ),
        },
        "output_model": f"lora-{model_name.split('/')[-1]}-custom",
    }
    
    response = requests.post(
        f"{CUSTOMIZER_URL}/v1/customization/jobs",
        json=payload
    )
    response.raise_for_status()
    job_id = response.json()["id"]
    print(f"Job launched: {job_id}")
    return job_id

def check_job_status(job_id: str) -> dict:
    """学習ジョブのステータスを確認します。"""
    resp = requests.get(
        f"{CUSTOMIZER_URL}/v1/customization/jobs/{job_id}"
    )
    result = resp.json()
    print(f"Status: {result['status']}, "
          f"Progress: {result.get('progress', 'N/A')}")
    return result

# --- 使用方法 ---
# job_id = launch_lora_job(
#     model_name="meta/llama-3.1-8b-instruct",
#     train_file="/data/legal_qa_train.jsonl",
#     val_file="/data/legal_qa_val.jsonl",
#     config={"epochs": 3, "rank": 16, "lr": 2e-4}
# )
# status = check_job_status(job_id)
</code></pre>

<h3 id="7-4-inference-with-adapter">7.4. LoRAアダプターを使った推論</h3>

<pre><code class="language-python">
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer

def load_model_with_lora(base_model_name: str, 
                         adapter_path: str):
    """ベースモデルをロードしてLoRAアダプターをマウントします。"""
    # ベースをロード
    base_model = AutoModelForCausalLM.from_pretrained(
        base_model_name, 
        device_map="auto",
        torch_dtype=torch.bfloat16,
    )
    tokenizer = AutoTokenizer.from_pretrained(base_model_name)
    
    # LoRAアダプターをマウント
    model = PeftModel.from_pretrained(base_model, adapter_path)
    
    # オプション：より高速な推論のためにアダプターをベースにマージ
    # model = model.merge_and_unload()
    
    return model, tokenizer

def compare_base_vs_finetuned(question: str,
                               base_model, base_tok,
                               ft_model, ft_tok):
    """ベースモデルとファインチューニング済みモデルの出力を比較します。"""
    prompt = f"<|user|>\n{question}\n<|assistant|>\n"
    
    for label, model, tok in [
        ("BASE", base_model, base_tok),
        ("LoRA", ft_model, ft_tok),
    ]:
        inputs = tok(prompt, return_tensors="pt").to(model.device)
        outputs = model.generate(
            **inputs, max_new_tokens=256,
            temperature=0.1, do_sample=True
        )
        response = tok.decode(outputs[0], skip_special_tokens=True)
        print(f"\n{'='*50}")
        print(f"[{label}] {response}")
</code></pre>

<p><strong>Q5：</strong> あるチームがNeMo Customizerを使用してLlama-3-8BをLoRA（rank=16）でファインチューニングしました。結果のアダプターファイルは約80 MBです。元のモデルは16 GBです。本番デプロイにおいて最も効率的なサービングアプローチはどれですか？</p>

<ul>
<li>A) フルの16 GBファインチューニング済みモデルを個別にデプロイする</li>
<li>B) LoRA重みをベースモデルにマージし、16 GBのマージ済みモデルをデプロイする</li>
<li>C) NIM経由でベースモデルを1つデプロイし、推論時にLoRAアダプターをマウントする</li>
<li>D) より高速な推論のためにONNXフォーマットに変換する</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>C) NIM経由でベースモデルを1つデプロイし、推論時にLoRAアダプターをマウントする</strong> ✓</p>
<p><em>NIMはLoRAアダプターのホットローディングをサポートしています — 1つのベースモデルがアダプター（~80MB）をスワップするだけで複数の顧客/ドメインに対応できます。選択肢Bは動作しますが、ストレージを浪費し、マルチテナントサービングをサポートしません。選択肢AはLoRAの利点を活かしていません。ONNXへの変換はアダプターサービングとは無関係の別の最適化です。</em></p>
</details>

<h2 id="8-final-strategy-cheatsheet">8. 最終評価戦略とチートシート</h2>

<h3 id="8-1-assessment-format">8.1. 評価フォーマットのまとめ</h3>

<p>NVIDIA DLI Generative AI認定には複数のコース評価が含まれます：</p>

<table>
<thead>
<tr><th>コースコード</th><th>トピック</th><th>形式</th><th>時間</th><th>合格</th></tr>
</thead>
<tbody>
<tr><td><strong>S-FX-14</strong></td><td>Generative AI with Diffusion Models</td><td>コーディング評価</td><td>~2時間</td><td>70%</td></tr>
<tr><td><strong>S-FX-15</strong></td><td>Building RAG Agents with LLMs</td><td>コーディング + MCQ</td><td>~2時間</td><td>70%</td></tr>
<tr><td><strong>S-FX-34</strong></td><td>Build an AI Agent Reasoning App</td><td>コーディング評価</td><td>~2時間</td><td>70%</td></tr>
<tr><td><strong>C-FX-25</strong></td><td>GenAI LLM Customization & Eval</td><td>コーディング + MCQ</td><td>~2時間</td><td>70%</td></tr>
</tbody>
</table>

<h3 id="8-2-common-mistakes">8.2. よくある間違いと回避方法</h3>

<ul>
<li><strong>テンソルの次元の間違い</strong>：行列積の前に必ず<code>tensor.shape</code>で形状を確認する</li>
<li><strong>重みの凍結忘れ</strong>：LoRAはベースモデルを凍結する必要がある — そうしないとフルファインチューニングになる</li>
<li><strong>BLEUとROUGEの混同</strong>：BLEU = 精度、ROUGE = 再現率</li>
<li><strong>簡潔性ペナルティの欠落</strong>：BLEUはn-gramマッチングだけでなく、BPも含める必要がある</li>
<li><strong>CFGの公式の間違い</strong>：$\epsilon_\theta = \epsilon_{uncond} + s \cdot (\epsilon_{cond} - \epsilon_{uncond})$、引き算の順序に注意</li>
<li><strong>Top-k vs Top-p</strong>：top-kは確率最上位k個のトークンを選択、top-pは累積確率がpに達するまでのトークンを選択</li>
</ul>

<h3 id="8-3-time-management">8.3. 時間管理戦略</h3>

<ol>
<li><strong>まず試験全体を読む</strong>（5分） — 簡単な問題と難しい問題を特定する</li>
<li><strong>コーディング問題を先にやる</strong> — 通常MCQより配点が高い</li>
<li><strong>MCQ：まず消去法</strong> — 明らかに間違っている2つを除外し、残り2つから選ぶ</li>
<li><strong>1つの問題に10分以上かけない</strong> — マークして後で戻る</li>
<li><strong>最後の10分を確認用に残す</strong>（構文エラー、インポート漏れ）</li>
</ol>

<h3 id="8-4-cheat-sheet">8.4. クイックリファレンスチートシート</h3>

<table>
<thead>
<tr><th>カテゴリ</th><th>公式 / パターン</th><th>キーポイント</th></tr>
</thead>
<tbody>
<tr><td><strong>Diffusion — 順方向</strong></td><td>$q(x_t|x_0) = \mathcal{N}(\sqrt{\bar\alpha_t}\,x_0,\;(1-\bar\alpha_t)\,I)$</td><td>スケジュールに従いノイズを加える</td></tr>
<tr><td><strong>Diffusion — 逆方向</strong></td><td>$p_\theta(x_{t-1}|x_t) = \mathcal{N}(\mu_\theta(x_t,t),\;\sigma_t^2 I)$</td><td>U-Netがノイズ$\epsilon$を予測</td></tr>
<tr><td><strong>CFG</strong></td><td>$\hat\epsilon = \epsilon_{uncond} + s(\epsilon_{cond} - \epsilon_{uncond})$</td><td>$s=7.5$が典型、$s=1$ = ガイダンスなし</td></tr>
<tr><td><strong>LoRA</strong></td><td>$W' = W + \frac{\alpha}{r}BA$</td><td>B=ゼロ初期化、A=ランダム初期化</td></tr>
<tr><td><strong>LoRAパラメータ</strong></td><td>$r(d+k)$ / 層</td><td>通常全体の0.1-1%</td></tr>
<tr><td><strong>BLEU</strong></td><td>$BP \cdot \exp(\sum w_n \log p_n)$</td><td>精度ベース、翻訳用</td></tr>
<tr><td><strong>F1</strong></td><td>$\frac{2PR}{P+R}$</td><td>トークン重複、QA用</td></tr>
<tr><td><strong>コサイン類似度</strong></td><td>$\frac{a \cdot b}{\|a\|\|b\|}$</td><td>埋め込みベースの意味マッチング</td></tr>
<tr><td><strong>ELO</strong></td><td>$R' = R + K(S - E)$</td><td>K=32が典型、初期値=1500</td></tr>
<tr><td><strong>アテンション</strong></td><td>$\text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) V$</td><td>スケールでsoftmaxの飽和を防ぐ</td></tr>
<tr><td><strong>交差エントロピー</strong></td><td>$-\sum y_i \log(\hat{y}_i)$</td><td>LLM学習の損失関数</td></tr>
<tr><td><strong>パープレキシティ</strong></td><td>$2^{H(p)} = e^{\text{CE loss}}$</td><td>低いほど良い言語モデル</td></tr>
</tbody>
</table>

<h3 id="8-5-pytorch-reference">8.5. PyTorchクイックリファレンス</h3>

<pre><code class="language-python">
import torch
import torch.nn as nn
import torch.nn.functional as F

# --- テンソル操作（評価でよく出る）---
x = torch.randn(2, 3, 4)       # 形状：(batch, seq, dim)
y = torch.randn(2, 4, 5)       # 形状：(batch, dim, out)
z = torch.bmm(x, y)            # バッチ行列積 → (2, 3, 5)
z = x @ y                      # 3Dの場合bmmと同じ
z = torch.einsum('bsd,bdo->bso', x, y)  # アインシュタイン表記

# リシェイプ操作
x = x.view(2, -1)              # 最後の2次元をフラット化 → (2, 12)
x = x.unsqueeze(1)             # 次元を追加 → (2, 1, 12)
x = x.squeeze(1)               # 次元を削除 → (2, 12)
x = x.permute(0, 2, 1)         # 次元をスワップ

# Softmax + temperature
logits = torch.randn(1, 50257)  # 語彙のロジット
temp = 0.7
probs = F.softmax(logits / temp, dim=-1)

# Top-kサンプリング
top_k = 50
top_k_vals, top_k_idx = torch.topk(probs, top_k)
sampled = torch.multinomial(top_k_vals, 1)

# Top-p（核）サンプリング
sorted_probs, sorted_idx = torch.sort(probs, descending=True)
cumsum = torch.cumsum(sorted_probs, dim=-1)
mask = cumsum - sorted_probs > 0.9  # p=0.9
sorted_probs[mask] = 0.0
sorted_probs /= sorted_probs.sum()
sampled = torch.multinomial(sorted_probs, 1)

# 損失関数
loss_fn = nn.CrossEntropyLoss()
loss = loss_fn(logits, targets)  # logits: (B, V), targets: (B,)
</code></pre>

<h3 id="8-6-langchain-patterns">8.6. LangChain / LangGraphパターンリファレンス</h3>

<pre><code class="language-python">
# --- RAGパターン ---
# 1. ロード → 2. 分割 → 3. 埋め込み → 4. 格納 → 5. 検索 → 6. 生成
from langchain_text_splitters import RecursiveCharacterTextSplitter
splitter = RecursiveCharacterTextSplitter(
    chunk_size=512, chunk_overlap=50
)

# --- 構造化出力 ---
from pydantic import BaseModel
class Answer(BaseModel):
    reasoning: str
    answer: str
    confidence: float

chain = prompt | llm.with_structured_output(Answer)

# --- LangGraphステートマシン ---
from langgraph.graph import StateGraph, START, END
graph = StateGraph(MyState)
graph.add_node("agent", agent_fn)
graph.add_node("tools", tool_fn)
graph.add_edge(START, "agent")
graph.add_conditional_edges("agent", should_continue,
    {"continue": "tools", "end": END})
graph.add_edge("tools", "agent")
app = graph.compile()
</code></pre>

<h3 id="8-7-frequency-table">8.7. DLI評価における頻出コンセプトトップ</h3>

<table>
<thead>
<tr><th>#</th><th>コンセプト</th><th>頻度</th><th>典型的な出題形式</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>Diffusion順方向/逆方向プロセス</td><td>★★★★★</td><td>コード穴埋め、公式の説明</td></tr>
<tr><td>2</td><td>LoRAランク、alpha、パラメータ数</td><td>★★★★★</td><td>パラメータ計算、設定の選択</td></tr>
<tr><td>3</td><td>RAGチャンキング戦略</td><td>★★★★☆</td><td>ユースケースに合ったchunk_sizeの選択</td></tr>
<tr><td>4</td><td>BLEU vs ROUGE vs F1</td><td>★★★★☆</td><td>メトリクスとタスクのマッチング</td></tr>
<tr><td>5</td><td>Classifier-Free Guidance</td><td>★★★★☆</td><td>CFG公式のコード、スケールの選択</td></tr>
<tr><td>6</td><td>LangChain LCELチェーン</td><td>★★★☆☆</td><td>|演算子でパイプラインを構築</td></tr>
<tr><td>7</td><td>アテンション機構</td><td>★★★☆☆</td><td>スケーリングドット積の実装</td></tr>
<tr><td>8</td><td>NIMデプロイ</td><td>★★★☆☆</td><td>Docker compose、API設定</td></tr>
<tr><td>9</td><td>Guardrails / NeMo Guardrails</td><td>★★☆☆☆</td><td>トピカルレールの設定</td></tr>
<tr><td>10</td><td>マルチエージェントパターン</td><td>★★☆☆☆</td><td>supervisor vs swarmの選択</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のヒント：</strong> <strong>上位5つのコンセプト</strong>に復習を集中させましょう — 問題の約70%を占めます。Diffusionの公式とLoRAが最も頻繁に出題されます。常に覚えておきましょう：LoRAでは$B$はゼロで初期化される、CFGのガイダンススケール$s$を上げる → 出力がプロンプトにより忠実になる。</p></blockquote>

<h2 id="9-mock-assessment">9. 練習問題 — 完全模擬試験</h2>

<p>シリーズ全10課をカバーする15問の模擬試験問題です。推奨所要時間：<strong>45分</strong>。</p>

<h3 id="9-diffusion">Diffusion Models（Q1–Q4）</h3>

<p><strong>Q1 🟢（易）：</strong> Denoising Diffusion Probabilistic Model（DDPM）の順方向プロセスでは、画像$x_0$に$T$タイムステップにわたってノイズが加えられます。順方向プロセスについて正しい記述はどれですか？</p>

<ul>
<li>A) 順方向プロセスではノイズスケジュールを学習するためにニューラルネットワークが必要</li>
<li>B) タイムステップ$T$において、$x_T$は標準ガウス分布$\mathcal{N}(0, I)$に近似する</li>
<li>C) 順方向プロセスでは画像からノイズが徐々に除去される</li>
<li>D) 順方向プロセスの各ステップは学習された変換である</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>B</strong> ✓</p>
<p><em>順方向プロセスは固定スケジュールに従ってノイズを加えます（ニューラルネットワークは不要 → Aは誤り、Dは誤り）。逆方向プロセスがノイズ除去のステップ → Cは誤り。十分に大きな$T$では、$\bar\alpha_T \to 0$のため$x_T \sim \mathcal{N}(0, I)$となります。</em></p>
</details>

<p><strong>Q2 🟡（中）：</strong> 以下のClassifier-Free Guidanceのコードで、<code>guidance_scale = 1.0</code>の場合の出力は何ですか？</p>

<pre><code class="language-python">
def cfg_predict(model, x_t, t, text_emb, guidance_scale):
    noise_cond = model(x_t, t, text_emb)
    noise_uncond = model(x_t, t, null_emb)
    return noise_uncond + guidance_scale * (noise_cond - noise_uncond)
</code></pre>

<ul>
<li>A) 純粋な無条件生成（テキストプロンプトを無視）</li>
<li>B) 標準的な条件付き生成（CFGなしと同等）</li>
<li>C) テキストプロンプトへの2倍のガイダンス強度</li>
<li>D) 関数がエラーを発生させる</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>B</strong> ✓</p>
<p><em>$s=1.0$の場合：$\epsilon_{uncond} + 1.0 \times (\epsilon_{cond} - \epsilon_{uncond}) = \epsilon_{cond}$。これは単純にガイダンスの増幅なしの標準的な条件付き出力です。$s=0$ → 純粋な無条件（A）。$s>1$（例：7.5）→ 増幅されたガイダンス。$s=2$ → 2倍の強度（C）。</em></p>
</details>

<p><strong>Q3 🟡（中）：</strong> Diffusionモデルで使用されるU-Netアーキテクチャにはエンコーダパスとデコーダパスがあります。対応するエンコーダ層とデコーダ層間のスキップ接続の主な目的は何ですか？</p>

<ul>
<li>A) モデルの総パラメータ数を削減するため</li>
<li>B) ダウンサンプリング中に失われる可能性のある細かい空間的詳細を保持するため</li>
<li>C) 順方向プロセス中にノイズスケジュールを実装するため</li>
<li>D) クロスアテンションによるテキスト条件付き生成を可能にするため</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>B</strong> ✓</p>
<p><em>スキップ接続はエンコーダ層（高解像度）と対応するデコーダ層をリンクし、ダウンサンプリング中に失われた空間的詳細をデコーダが回復するのを助けます。クロスアテンション（D）はテキスト条件付けのための別のメカニズムです。スキップ接続はパラメータを削減しません（A）し、ノイズスケジュールも実装しません（C）。</em></p>
</details>

<p><strong>Q4 🔴（難）：</strong> あるチームがCLIPを使用してテキストと画像の両方を共有埋め込み空間にエンコードしています。学習時のCLIP損失関数は：</p>

<pre><code class="language-python">
# 簡略化したCLIPコントラスティブ損失
logits = (image_embeds @ text_embeds.T) * temperature
labels = torch.arange(len(logits))
loss_i2t = F.cross_entropy(logits, labels)
loss_t2i = F.cross_entropy(logits.T, labels)
loss = (loss_i2t + loss_t2i) / 2
</code></pre>

<p><code>loss_i2t</code>と<code>loss_t2i</code>の両方を計算する目的は何ですか？</p>

<ul>
<li>A) モデルが画像生成とテキスト生成の両方を学習するため</li>
<li>B) アラインメントを対称的にするため — 画像→テキストマッチングとテキスト→画像マッチングの両方</li>
<li>C) モダリティをスワップすることでデータ拡張を実装するため</li>
<li>D) 画像とテキストのバッチサイズが異なるケースに対応するため</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>B</strong> ✓</p>
<p><em>CLIPは対称コントラスティブ損失を使用します：loss_i2tは各画像が正しいテキストに一致することを保証し（画像→テキスト）、loss_t2iは各テキストが正しい画像に一致することを保証します（テキスト→画像）。勾配の流れの観点から類似度行列は必ずしも対称ではないため、両方向が必要です。CLIPは画像やテキストを生成しません（A）、データ拡張も行いません（C）、バッチサイズは常に同じです（D）。</em></p>
</details>

<h3 id="9-rag">RAGとLLMアプリケーション（Q5–Q8）</h3>

<p><strong>Q5 🟢（易）：</strong> RAGパイプラインでは、ドキュメントは埋め込み前にチャンクに分割されます。あるチームがセクション間の複雑な相互参照を持つ法的契約書を処理しています。最も適切なチャンキング戦略はどれですか？</p>

<ul>
<li>A) オーバーラップなしの100トークン固定サイズチャンク</li>
<li>B) 文レベルの分割</li>
<li>C) 512トークン、50トークンオーバーラップの再帰的文字分割</li>
<li>D) ドキュメントごとの単一チャンク（分割なし）</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>C</strong> ✓</p>
<p><em>法的契約書には相互参照があるため、境界でコンテキストを失わないようにオーバーラップが必要です。100トークン固定は小さすぎてコンテキスト不足です（A）。文レベルは法的文書には細かすぎます（B）。単一チャンクは大きすぎてコンテキストウィンドウと埋め込みモデルの制限を超えます（D）。512 + 50のオーバーラップを持つ再帰的分割がセマンティックな一貫性を維持します。</em></p>
</details>

<p><strong>Q6 🟡（中）：</strong> RAGシステムがクエリ「What is the treatment for Type 2 diabetes?」に対して以下のトップ3チャンクを検索しました：</p>

<pre><code class="language-text">
Chunk 1: "Metformin is the first-line treatment for Type 2 diabetes..."
Chunk 2: "Type 1 diabetes requires insulin injections from diagnosis..."
Chunk 3: "Lifestyle modifications including diet and exercise are recommended
          alongside pharmacological treatment for Type 2 diabetes..."
</code></pre>

<p>Chunk 2が無関係であることを最もよく検出できるRAG評価メトリクスはどれですか？</p>

<ul>
<li>A) 回答F1スコア</li>
<li>B) コンテキスト関連性（検索されたチャンクがクエリに関連しているかを測定）</li>
<li>C) 忠実性（回答がコンテキストに基づいているかを測定）</li>
<li>D) クエリとチャンク間のBLEUスコア</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>B</strong> ✓</p>
<p><em>コンテキスト関連性は検索されたチャンクが実際にクエリに関連しているかを測定します — Chunk 2がType 1（Type 2ではない）について述べていることを検出できます。忠実性は回答 vs コンテキストを測定します（C）。回答F1は最終回答 vs 正解を測定します（A）。BLEUは浅いキーワード重複しか提供しません（D）。</em></p>
</details>

<p><strong>Q7 🟡（中）：</strong> ある開発者が以下のLCEL式でLangChainチェーンを構築しました：</p>

<pre><code class="language-python">
chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt_template
    | llm
    | StrOutputParser()
)
result = chain.invoke("What is LoRA?")
</code></pre>

<p>このチェーンで<code>RunnablePassthrough()</code>は何をしていますか？</p>

<ul>
<li>A) 入力を変更せずにディクショナリの「question」キーに渡す</li>
<li>B) retrieverステップをスキップしてLLMに直接渡す</li>
<li>C) 入力をキャッシュしてチェーン内で後から使用する</li>
<li>D) 入力をセマンティック検索用の埋め込みに変換する</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>A</strong> ✓</p>
<p><em>RunnablePassthrough()は入力（「What is LoRA?」）を受け取り、変更せずに「question」キーに渡します。一方、「context」キーは同じ入力でretrieverを実行します。結果：prompt_templateはdict {"context": retrieved_docs, "question": "What is LoRA?"}を受け取ります。ステップをスキップしません（B）、キャッシュしません（C）、埋め込みを行いません（D）。</em></p>
</details>

<p><strong>Q8 🔴（難）：</strong> NeMo Guardrailsを使用して、カスタマーサービスチャットボットが競合他社について話し合うのを防止しています。以下のColang設定が提供されています：</p>

<pre><code class="language-text">
define user ask about competitor
  "What do you think about ProductX?"
  "Is CompetitorY better than your product?"
  "Compare your product with CompetitorZ"

define flow
  user ask about competitor
  bot refuse competitor question
  bot offer alternative help

define bot refuse competitor question
  "I'm focused on helping you with our products. I can't compare with other brands."

define bot offer alternative help
  "Would you like me to help you find the right product from our range?"
</code></pre>

<p>ユーザーが「I heard CompetitorY has faster delivery. Can you match that?」と書きました。ガードレールはトリガーされません。最も可能性の高い理由はどれですか？</p>

<ul>
<li>A) Colangフローの構文にエラーがある</li>
<li>B) 正規例が「配送比較」のインテントをカバーしていない — 直接的な製品比較のみ</li>
<li>C) NeMo Guardrailsはユーザーメッセージ中のエンティティ名を検出できない</li>
<li>D) ボットのレスポンスはフローの前に定義される必要がある</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>B</strong> ✓</p>
<p><em>NeMo Guardrailsは正規例を使用してユーザーインテントをマッチングします。提供された例は「製品比較」と「競合他社への意見」のみをカバーしており、「配送比較」をカバーする例がありません。「Does CompetitorY deliver faster?」のような例を追加すればこのインテントをカバーできます。Colangの構文は正しく（Aは誤り）、NeMo Guardrailsはエンティティを検出できます（Cは誤り）、定義順は関係ありません（Dは誤り）。</em></p>
</details>

<h3 id="9-agentic">Agentic AI（Q9–Q11）</h3>

<p><strong>Q9 🟢（易）：</strong> LangGraphにおいて、<strong>State</strong>オブジェクトは何に使用されますか？</p>

<ul>
<li>A) 推論中にLLMモデルの重みを保存するため</li>
<li>B) グラフノード間を流れる共有データ（メッセージ、コンテキスト）を維持するため</li>
<li>C) グラフのビジュアルレイアウトを定義するため</li>
<li>D) LLMのtemperatureとtop-pパラメータを設定するため</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>B</strong> ✓</p>
<p><em>LangGraphのStateはTypedDictまたはPydanticモデルで、ノード間で渡される共有データ（メッセージ、中間結果、フラグ）を含みます。各ノードはStateを受け取り、処理し、更新されたStateを返します。モデルの重み（A）、レイアウト（C）、LLM設定（D）とは無関係です。</em></p>
</details>

<p><strong>Q10 🟡（中）：</strong> あるチームが「Manager」エージェントが現在の状態に基づいて「Researcher」と「Writer」のサブエージェントにタスクを委任するマルチエージェントシステムを構築しています。これはどのパターンの例ですか？</p>

<ul>
<li>A) Swarmパターン</li>
<li>B) 階層型 / Supervisorパターン</li>
<li>C) ピアツーピアパターン</li>
<li>D) パイプラインパターン</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>B</strong> ✓</p>
<p><em>Manager → サブエージェントは典型的なSupervisor/階層パターンです：1つの中央エージェントがルーター/オーケストレーターとして機能します。Swarm（A）= エージェントがリーダーなしで自己調整。ピアツーピア（C）= エージェントが対等な立場で直接通信。パイプライン（D）= 固定された順次フロー。</em></p>
</details>

<p><strong>Q11 🔴（難）：</strong> 以下のLangGraphコードはツール呼び出し付きのエージェントを定義しています。<code>should_continue</code>関数が常に<code>"continue"</code>を返す場合、何が起こりますか？</p>

<pre><code class="language-python">
from langgraph.graph import StateGraph, START, END

def should_continue(state):
    if state["messages"][-1].tool_calls:
        return "continue"
    return "end"

graph = StateGraph(AgentState)
graph.add_node("agent", call_model)
graph.add_node("tools", tool_node)
graph.add_edge(START, "agent")
graph.add_conditional_edges("agent", should_continue,
    {"continue": "tools", "end": END})
graph.add_edge("tools", "agent")
app = graph.compile()
</code></pre>

<ul>
<li>A) グラフは1回実行して正常に終了する</li>
<li>B) グラフは「agent」と「tools」ノード間で無限ループに入る</li>
<li>C) グラフはコンパイルエラーを発生させる</li>
<li>D) 「tools」ノードが終了処理を行う</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>B</strong> ✓</p>
<p><em>should_continueが常に"continue"を返す場合：agent → tools → agent → tools → ... ENDに到達しません。これが本番のエージェントにrecursion_limit（LangGraphのデフォルトは25）または明示的な終了条件が必要な理由です。グラフは正常にコンパイルされます（Cは誤り）が、ランタイムで無限ループに陥ります。</em></p>
</details>

<h3 id="9-eval-ft">評価とファインチューニング（Q12–Q15）</h3>

<p><strong>Q12 🟢（易）：</strong> テキスト要約の評価に一般的に使用される再現率指向のメトリクスは次のうちどれですか？</p>

<ul>
<li>A) BLEU</li>
<li>B) ROUGE</li>
<li>C) パープレキシティ</li>
<li>D) pass@k</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>B</strong> ✓</p>
<p><em>ROUGE（Recall-Oriented Understudy for Gisting Evaluation）— 名前が示す通り：再現率指向、要約のために設計されています。BLEUは翻訳用の精度指向です（A）。パープレキシティは言語モデルの品質を測定します（C）。pass@kはコード生成用です（D）。</em></p>
</details>

<p><strong>Q13 🟡（中）：</strong> LoRAファインチューニングにおいて、行列$B \in \mathbb{R}^{d \times r}$と$A \in \mathbb{R}^{r \times k}$が学習されます。行列$B$はどのように初期化され、その理由は何ですか？</p>

<ul>
<li>A) ランダム初期化 — ニューロン間の対称性を破るため</li>
<li>B) 単位行列 — 元のモデルの動作を保持するため</li>
<li>C) ゼロ — 学習開始時に$\Delta W = BA = 0$となり、事前学習済み重みを保持するため</li>
<li>D) Xavier初期化 — 勾配の流れを維持するため</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>C</strong> ✓</p>
<p><em>$B$はゼロで初期化、$A$はランダム（Kaiming）で初期化されます。学習開始時：$\Delta W = BA = 0 \cdot A = 0$なので、$W' = W + 0 = W$（事前学習済み重み）。モデルは事前学習済みのパフォーマンスから正確に学習を開始し、混乱を起こしません。これはLoRA論文における重要な設計上の決定です。</em></p>
</details>

<p><strong>Q14 🟡（中）：</strong> ある企業が法律文書分析のためにLlama-3-70Bをファインチューニングします。NVIDIA A100 80GB GPUが1枚あります。どのアプローチを使用できますか？</p>

<ul>
<li>A) 勾配チェックポイント付きのフルファインチューニング</li>
<li>B) FP16ベースモデルでの標準LoRA</li>
<li>C) 4ビットNF4量子化のQLoRA</li>
<li>D) BとCの両方がA100 80GB 1枚で動作する</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>C</strong> ✓</p>
<p><em>Llama-3-70BのFP16は重みだけで~140GB → A100 80GBではフルFT（Aは誤り）やLoRA FP16（Bは誤り、~160GB必要）には不十分です。QLoRA 4ビット：重み~35GB + オプティマイザー → A100 80GBに収まります。Bが収まらないのでDは誤りです。</em></p>
</details>

<p><strong>Q15 🔴（難）：</strong> あるデータサイエンティストがNeMo Evaluatorを実行して、法律QAデータセットでベースモデルとLoRAファインチューニング済みモデルを比較しました。結果：</p>

<table>
<thead>
<tr><th>モデル</th><th>BLEU</th><th>ROUGE-L</th><th>F1</th><th>ジャッジ正確性（1-5）</th><th>レイテンシp95</th></tr>
</thead>
<tbody>
<tr><td>ベースLlama-3-8B</td><td>0.18</td><td>0.35</td><td>0.52</td><td>3.1</td><td>1.2s</td></tr>
<tr><td>LoRA（r=16）</td><td>0.29</td><td>0.48</td><td>0.71</td><td>4.2</td><td>1.3s</td></tr>
</tbody>
</table>

<p>チームはLoRAモデルのデプロイを決定しました。この決定を最もよく正当化する記述はどれですか？</p>

<ul>
<li>A) BLEUが61%向上しており、QAで最も重要なメトリクスである</li>
<li>B) すべてのメトリクスがレイテンシのわずかな増加で大幅に改善され、LLMジャッジの正確性が3.1から4.2に上昇した（35%の改善）</li>
<li>C) レイテンシの1.2sから1.3sへの増加は無視できる程度であり、これが主要な懸念事項である</li>
<li>D) ROUGE-Lが0.35から0.48に改善しており、モデルがより良い要約を生成していることを示している</li>
</ul>

<details><summary>回答と解説を表示</summary>
<p><strong>B</strong> ✓</p>
<p><em>デプロイの決定は全体的な改善に基づいています：F1（QAの主要メトリクス）が0.52→0.71に大幅に改善、ジャッジの正確性（人間評価に最も近い）が3.1→4.2に改善、レイテンシはほぼ変わらず。Aは誤り：BLEUはQAの主要メトリクスではない。Cは正しいが決定を「正当化」していない — レイテンシは1つの要因に過ぎない。Dは誤り：ROUGEは要約用であり、これはQAタスクです。</em></p>
</details>

<h2 id="10-tong-ket-next-steps">10. シリーズのまとめと次のステップ</h2>

<h3 id="10-1-hanh-trinh-10-bai">10.1. 全10課の学習の旅</h3>

<p>シリーズ<strong>「NVIDIA DLI 試験対策 — Generative AI with Diffusion Models & LLMs」</strong>の完走おめでとうございます！学んだ内容を振り返りましょう：</p>

<table>
<thead>
<tr><th>課</th><th>トピック</th><th>キーポイント</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>Generative AIの概要</td><td>分類体系：VAE → GAN → Diffusion → Transformer LLM</td></tr>
<tr><td>2</td><td>Diffusion ModelsとDDPM</td><td>順方向ノイズ＋逆方向ノイズ除去、U-Netが$\epsilon$を予測</td></tr>
<tr><td>3</td><td>Stable DiffusionとCLIP</td><td>潜在空間でのDiffusion、クロスアテンションによるテキスト条件付け</td></tr>
<tr><td>4</td><td>LLMの基礎</td><td>Transformerアテンション、トークナイゼーション、生成戦略</td></tr>
<tr><td>5</td><td>プロンプトエンジニアリング</td><td>Zero/few-shot、CoT、構造化出力、システムプロンプト</td></tr>
<tr><td>6</td><td>RAGパイプライン</td><td>チャンキング → 埋め込み → ベクトルDB → 検索 → 生成</td></tr>
<tr><td>7</td><td>LangChainとNIM</td><td>LCELチェーン、NIMデプロイ、ガードレール</td></tr>
<tr><td>8</td><td>ツール呼び出しと構造化出力</td><td>関数呼び出し、Pydanticスキーマ、ReActループ</td></tr>
<tr><td>9</td><td>Agentic AIとマルチエージェント</td><td>LangGraph、supervisorパターン、ステートマシン</td></tr>
<tr><td>10</td><td>評価とLoRAファインチューニング</td><td>BLEU/ROUGE/F1、LLM-as-Judge、LoRA/QLoRA、NeMo</td></tr>
</tbody>
</table>

<h3 id="10-2-course-order">10.2. 推奨DLIコース受講順</h3>

<p>認定を取得するには、DLIコースを以下の順序で完了してください：</p>

<ol>
<li><strong>Generative AI with Diffusion Models</strong>（S-FX-14）— Diffusion理論＋コーディングラボ</li>
<li><strong>Building RAG Agents with LLMs</strong>（S-FX-15）— RAGパイプライン＋LangChain＋NIM</li>
<li><strong>Build an AI Agent Reasoning App</strong>（S-FX-34）— Agentic AI＋LangGraph</li>
<li><strong>GenAI and LLM Customization and Evaluation</strong>（C-FX-25）— LoRA、QLoRA、NeMo Evaluator</li>
</ol>

<p>各コースには独自の評価があります。4つすべてを完了すると → <strong>NVIDIA DLI Generative AI Certificate</strong>を取得できます。</p>

<h3 id="10-3-tips-after-cert">10.3. 学習を続けるためのヒント</h3>

<ul>
<li><strong>KaggleやHuggingFaceで実践する</strong> — 実際のデータセットで実際のモデルをファインチューニング</li>
<li><strong>論文を読む</strong> — LoRA、QLoRA、RAG、DDPMの論文はすべてアクセスしやすく、優れた試験準備になります</li>
<li><strong>プロジェクトを構築する</strong> — RAGチャットボット、マルチエージェントシステム、特定ドメイン向けのカスタムファインチューニングモデル</li>
<li><strong>コミュニティに参加する</strong> — NVIDIA Developer Forums、HuggingFace Discord、LangChain Discord</li>
<li><strong>最新情報を追い続ける</strong> — AIは急速に進化します。NVIDIA Blog、arXivのデイリーペーパーをフォロー</li>
</ul>

<blockquote><p><strong>最後のヒント：</strong> DLIの評価は純粋な理論よりも<strong>実践的な応用</strong>に重点を置いていることを忘れないでください。コードを理解し、スクラッチから実装できれば（このシリーズの例のように）、合格できます。試験の成功をお祈りします！</p></blockquote>
