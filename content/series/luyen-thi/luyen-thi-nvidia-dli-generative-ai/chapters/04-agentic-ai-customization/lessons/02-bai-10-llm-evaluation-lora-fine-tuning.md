---
id: 019c9619-nv01-p4-l10
title: 'Bài 10: LLM Evaluation & LoRA Fine-tuning'
slug: bai-10-llm-evaluation-lora-fine-tuning
description: >-
  Evaluation methods: benchmarks (GSM8K), LLM-as-a-Judge, ELO ranking.
  NeMo Evaluator microservice, MLflow experiment tracking.
  Metrics: BLEU, F1-score, semantic similarity.
  LoRA & QLoRA fine-tuning: theory and hands-on.
  NeMo Customizer: fine-tuning jobs. Final mock exam & exam strategy.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 10
section_title: "Part 4: Agentic AI & LLM Customization"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'Luyện thi NVIDIA DLI — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="1-llm-evaluation-fundamentals">1. LLM Evaluation Fundamentals</h2>

<h3 id="1-1-tai-sao-evaluation-quan-trong">1.1. Tại sao Evaluation quan trọng?</h3>

<p>Bạn không thể cải thiện thứ mà bạn không đo lường được. Trong production, một LLM sinh ra câu trả lời "nghe hợp lý" nhưng sai về mặt factual có thể gây hậu quả nghiêm trọng — từ tư vấn y tế sai đến mất tiền trong giao dịch tài chính. <strong>Evaluation</strong> là bước bắt buộc trước khi deploy bất kỳ LLM application nào.</p>

<p>Nguyên tắc <strong>"Garbage In, Garbage Out"</strong> áp dụng cho toàn bộ pipeline:</p>

<ul>
<li><strong>Bad prompt</strong> → bad output → bad evaluation → false confidence</li>
<li><strong>Bad evaluation metric</strong> → chọn sai model → production failure</li>
<li><strong>No evaluation</strong> → không biết model degradation → silent failure</li>
</ul>

<h3 id="1-2-phan-loai-evaluation">1.2. Phân loại Evaluation</h3>

<p>Có 3 phương pháp chính để đánh giá LLM:</p>

<table>
<thead>
<tr><th>Phương pháp</th><th>Ưu điểm</th><th>Nhược điểm</th><th>Use case</th></tr>
</thead>
<tbody>
<tr><td><strong>Automated Metrics</strong></td><td>Nhanh, reproducible, rẻ</td><td>Không bắt nuance, bị cheat</td><td>CI/CD pipeline, regression testing</td></tr>
<tr><td><strong>Human Evaluation</strong></td><td>Gold standard, bắt nuance</td><td>Chậm, đắt, inconsistent</td><td>Final validation, safety audit</td></tr>
<tr><td><strong>LLM-as-a-Judge</strong></td><td>Scalable, gần human quality</td><td>Bias từ judge model</td><td>Large-scale eval, rapid iteration</td></tr>
</tbody>
</table>

<h3 id="1-3-evaluation-dimensions">1.3. Evaluation Dimensions</h3>

<p>Mỗi LLM application cần đánh giá trên nhiều chiều:</p>

<ul>
<li><strong>Accuracy / Correctness</strong> — câu trả lời có đúng không?</li>
<li><strong>Fluency</strong> — ngôn ngữ có tự nhiên không?</li>
<li><strong>Relevance</strong> — câu trả lời có liên quan đến câu hỏi không?</li>
<li><strong>Safety / Harmlessness</strong> — output có an toàn không?</li>
<li><strong>Latency</strong> — thời gian response có chấp nhận được không? (p50, p95, p99)</li>
<li><strong>Cost</strong> — chi phí per-token có hợp lý không?</li>
</ul>

<pre><code class="language-text">
LLM Evaluation Pipeline — From Data to Decision
══════════════════════════════════════════════════════════════

  ┌─────────────┐     ┌─────────────────┐     ┌──────────────┐
  │  Test Data   │────►│  LLM Inference  │────►│  Raw Output  │
  │  (prompts +  │     │  (model under   │     │  (generated  │
  │  references) │     │   evaluation)   │     │   responses) │
  └─────────────┘     └─────────────────┘     └──────┬───────┘
                                                      │
                    ┌─────────────────────────────────┼──────┐
                    │         EVALUATION ENGINE        │      │
                    │  ┌──────────┐ ┌───────────────┐  │      │
                    │  │Automated │ │ LLM-as-Judge  │  │      │
                    │  │ Metrics  │ │ (GPT-4/Claude)│  │      │
                    │  │BLEU,ROUGE│ │Pairwise/Point │  │      │
                    │  │F1,Cosine │ │  wise scoring │  │      │
                    │  └────┬─────┘ └──────┬────────┘  │      │
                    │       │              │           │      │
                    │       ▼              ▼           │      │
                    │  ┌────────────────────────────┐  │      │
                    │  │   Aggregated Score Card    │  │      │
                    │  │ Accuracy: 0.87  Safety: 95%│  │      │
                    │  │ Latency p95: 1.2s  F1: 0.82│  │      │
                    │  └────────────┬───────────────┘  │      │
                    └───────────────┼──────────────────┘      │
                                    │                         │
                                    ▼                         │
                    ┌─────────────────────────────┐           │
                    │   MLflow Experiment Tracker  │◄──────────┘
                    │   Compare runs, visualize    │
                    │   Select best model version  │
                    └─────────────────────────────┘
</code></pre>

<blockquote><p><strong>Exam tip:</strong> DLI assessment thường hỏi "Which evaluation method is best for X?" — nhớ: <strong>BLEU</strong> cho translation, <strong>ROUGE</strong> cho summarization, <strong>F1</strong> cho QA, <strong>LLM-as-a-Judge</strong> cho chất lượng tổng thể. Không tồn tại một metric duy nhất cho mọi task.</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai10-lora-fine-tuning.webp" alt="LoRA Fine-tuning — Low-Rank Adaptation, QLoRA, Evaluation Metrics Dashboard" loading="lazy" /><figcaption>LoRA Fine-tuning — Low-Rank Adaptation, QLoRA, Evaluation Metrics Dashboard</figcaption></figure>

<h2 id="2-automated-metrics-deep-dive">2. Automated Metrics Deep-Dive</h2>

<h3 id="2-1-bleu-score">2.1. BLEU Score — Bilingual Evaluation Understudy</h3>

<p>BLEU đo mức độ <strong>n-gram overlap</strong> giữa generated text và reference text. Ban đầu thiết kế cho machine translation, nhưng áp dụng rộng rãi cho nhiều NLG task.</p>

<p>Công thức chính:</p>

<p>$$\text{BLEU} = BP \cdot \exp\left(\sum_{n=1}^{N} w_n \log p_n\right)$$</p>

<p>Trong đó:</p>

<ul>
<li>$p_n$ = <strong>modified n-gram precision</strong> — tỷ lệ n-gram trong candidate cũng xuất hiện trong reference</li>
<li>$w_n = \frac{1}{N}$ — trọng số đều (thường N=4, nên $w_n = 0.25$)</li>
<li>$BP$ = <strong>Brevity Penalty</strong> — phạt candidate ngắn hơn reference:</li>
</ul>

<p>$$BP = \begin{cases} 1 & \text{if } c > r \\ e^{1 - r/c} & \text{if } c \leq r \end{cases}$$</p>

<p>Trong đó $c$ = độ dài candidate, $r$ = độ dài reference.</p>

<p>Ý nghĩa: BLEU = 1.0 → hoàn toàn khớp reference. BLEU = 0.0 → không có n-gram nào trùng. Thực tế, BLEU > 0.3 là acceptable cho translation.</p>

<h3 id="2-2-bleu-implementation">2.2. Implement BLEU từ scratch</h3>

<pre><code class="language-python">
from collections import Counter
import math

def count_ngrams(tokens, n):
    """Đếm tất cả n-grams trong sequence."""
    return Counter(tuple(tokens[i:i+n]) for i in range(len(tokens) - n + 1))

def modified_precision(candidate, references, n):
    """
    Modified n-gram precision: clip count bởi max reference count.
    Tránh trường hợp candidate lặp cùng 1 từ nhiều lần.
    """
    cand_ngrams = count_ngrams(candidate, n)
    
    # Max count cho mỗi n-gram across all references
    max_ref_counts = Counter()
    for ref in references:
        ref_ngrams = count_ngrams(ref, n)
        for ngram, count in ref_ngrams.items():
            max_ref_counts[ngram] = max(max_ref_counts[ngram], count)
    
    # Clip candidate count bởi max reference count
    clipped_count = 0
    total_count = 0
    for ngram, count in cand_ngrams.items():
        clipped_count += min(count, max_ref_counts.get(ngram, 0))
        total_count += count
    
    if total_count == 0:
        return 0.0
    return clipped_count / total_count

def brevity_penalty(candidate, references):
    """Brevity penalty: phạt nếu candidate ngắn hơn reference."""
    c = len(candidate)
    # Chọn reference có length gần nhất
    r = min((abs(len(ref) - c), len(ref)) for ref in references)[1]
    
    if c > r:
        return 1.0
    elif c == 0:
        return 0.0
    else:
        return math.exp(1 - r / c)

def bleu_score(candidate, references, max_n=4):
    """
    Tính BLEU score (BLEU-1 đến BLEU-N).
    candidate: list of tokens
    references: list of list of tokens
    """
    weights = [1.0 / max_n] * max_n
    bp = brevity_penalty(candidate, references)
    
    log_avg = 0.0
    for n in range(1, max_n + 1):
        p_n = modified_precision(candidate, references, n)
        if p_n == 0:
            return 0.0  # Nếu bất kỳ p_n = 0, BLEU = 0
        log_avg += weights[n - 1] * math.log(p_n)
    
    return bp * math.exp(log_avg)

# --- Ví dụ ---
candidate = "the cat sat on the mat".split()
references = [
    "the cat is on the mat".split(),
    "there is a cat on the mat".split(),
]

score = bleu_score(candidate, references, max_n=4)
print(f"BLEU-4 score: {score:.4f}")
# Output: BLEU-4 score: 0.4647
</code></pre>

<h3 id="2-3-rouge-score">2.3. ROUGE Score — Recall-Oriented Understudy</h3>

<p><strong>ROUGE</strong> là metric recall-oriented — đo bao nhiêu phần của reference được "phủ" bởi candidate. Rất phù hợp cho <strong>summarization</strong> vì ta muốn tóm tắt phải bao gồm các ý chính.</p>

<table>
<thead>
<tr><th>Variant</th><th>Công thức</th><th>Ý nghĩa</th></tr>
</thead>
<tbody>
<tr><td><strong>ROUGE-N</strong></td><td>Recall of n-gram overlap</td><td>ROUGE-1 (unigram), ROUGE-2 (bigram)</td></tr>
<tr><td><strong>ROUGE-L</strong></td><td>Longest Common Subsequence (LCS)</td><td>Bắt sentence-level structure</td></tr>
<tr><td><strong>ROUGE-Lsum</strong></td><td>LCS tính trên split sentences</td><td>Multi-sentence summaries</td></tr>
</tbody>
</table>

<p>Công thức ROUGE-N Recall:</p>

<p>$$\text{ROUGE-N}_{recall} = \frac{\sum_{s \in \text{ref}} \sum_{\text{gram}_n \in s} \text{Count}_{match}(\text{gram}_n)}{\sum_{s \in \text{ref}} \sum_{\text{gram}_n \in s} \text{Count}(\text{gram}_n)}$$</p>

<h3 id="2-4-f1-score-qa">2.4. F1-Score cho Question Answering</h3>

<p>Trong QA, F1-score tính trên <strong>token-level overlap</strong> giữa predicted answer và ground truth:</p>

<p>$$\text{Precision} = \frac{|\text{predicted tokens} \cap \text{truth tokens}|}{|\text{predicted tokens}|}$$</p>

<p>$$\text{Recall} = \frac{|\text{predicted tokens} \cap \text{truth tokens}|}{|\text{truth tokens}|}$$</p>

<p>$$\text{F1} = \frac{2 \cdot P \cdot R}{P + R}$$</p>

<pre><code class="language-python">
def qa_f1_score(prediction: str, ground_truth: str) -> float:
    """
    Token-level F1 cho QA evaluation.
    Dùng cho SQuAD-style exact extraction.
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

# --- Ví dụ ---
pred = "Barack Obama was the 44th president"
truth = "The 44th president was Barack Obama"

print(f"F1 = {qa_f1_score(pred, truth):.4f}")
# Output: F1 = 0.8571
</code></pre>

<h3 id="2-5-semantic-similarity">2.5. Semantic Similarity — Embedding-Based</h3>

<p>Automated metrics dựa trên n-gram (BLEU, ROUGE) bỏ lỡ <strong>semantic equivalence</strong>: "The dog chased the cat" và "A canine pursued a feline" có BLEU = 0 nhưng ý nghĩa giống nhau. <strong>Semantic similarity</strong> dùng embedding để so sánh nghĩa.</p>

<p>$$\text{Cosine Similarity} = \frac{\vec{a} \cdot \vec{b}}{||\vec{a}|| \cdot ||\vec{b}||}$$</p>

<pre><code class="language-python">
import numpy as np

def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    """Cosine similarity giữa 2 embedding vectors."""
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

# Trong thực tế: dùng sentence-transformers
# from sentence_transformers import SentenceTransformer
# model = SentenceTransformer("all-MiniLM-L6-v2")
# embeddings = model.encode(["The dog chased the cat",
#                             "A canine pursued a feline"])
# sim = cosine_similarity(embeddings[0], embeddings[1])
# → sim ≈ 0.85 (semantic match dù n-gram khác hoàn toàn)
</code></pre>

<h3 id="2-6-metric-selection-guide">2.6. Metric Selection Guide — Chọn metric nào cho task nào?</h3>

<table>
<thead>
<tr><th>Task</th><th>Primary Metric</th><th>Secondary Metric</th><th>Lý do</th></tr>
</thead>
<tbody>
<tr><td>Machine Translation</td><td>BLEU</td><td>COMET, chrF</td><td>Precision-oriented: dịch chính xác từng từ</td></tr>
<tr><td>Summarization</td><td>ROUGE-L</td><td>BERTScore</td><td>Recall-oriented: phải cover key points</td></tr>
<tr><td>Question Answering</td><td>F1 / Exact Match</td><td>Semantic Sim</td><td>Token overlap + meaning</td></tr>
<tr><td>Dialogue / Chat</td><td>LLM-as-a-Judge</td><td>Human eval</td><td>Subjective quality, khó dùng auto metric</td></tr>
<tr><td>Code Generation</td><td>pass@k</td><td>Execution accuracy</td><td>Code phải chạy đúng, không chỉ "giống"</td></tr>
<tr><td>RAG Pipeline</td><td>Context Relevance + Faithfulness</td><td>Answer F1</td><td>Multi-dimensional eval (RAGAS framework)</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Nếu đề hỏi "metric phù hợp cho summarization" → chọn <strong>ROUGE</strong> (recall). Nếu hỏi "metric cho translation" → chọn <strong>BLEU</strong> (precision). Đây là câu hỏi rất hay gặp.</p></blockquote>

<p><strong>Q1:</strong> A team is evaluating an LLM-powered chatbot for customer support. They need a metric that can handle paraphrasing — where the meaning is correct but wording differs from reference answers. Which metric is MOST appropriate?</p>

<ul>
<li>A) BLEU-4</li>
<li>B) ROUGE-1</li>
<li>C) Exact Match</li>
<li>D) Semantic similarity (embedding-based)</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>D) Semantic similarity (embedding-based)</strong> ✓</p>
<p><em>BLEU và ROUGE dựa trên n-gram overlap → fail khi paraphrasing (cùng ý nhưng khác từ). Exact Match chỉ match 100% string. Semantic similarity dùng embedding vectors nên bắt được meaning equivalence dù wording khác. Trong customer support, user hỏi nhiều cách khác nhau cho cùng một vấn đề, nên embedding-based metric là phù hợp nhất.</em></p>
</details>

<h2 id="3-llm-as-a-judge">3. LLM-as-a-Judge &amp; Human Evaluation</h2>

<h3 id="3-1-llm-as-a-judge-pattern">3.1. LLM-as-a-Judge Pattern</h3>

<p>Ý tưởng: dùng một <strong>strong model</strong> (GPT-4, Claude 3.5) để đánh giá output của <strong>weaker model</strong> hoặc model đang được test. Phương pháp này scalable hơn human evaluation và gần với human judgment hơn automated metrics.</p>

<p>Hai kiểu chính:</p>

<table>
<thead>
<tr><th>Kiểu</th><th>Cách hoạt động</th><th>Ưu điểm</th><th>Nhược điểm</th></tr>
</thead>
<tbody>
<tr><td><strong>Pointwise</strong></td><td>Judge chấm điểm 1 response (1-5)</td><td>Đơn giản, absolute score</td><td>Calibration bias</td></tr>
<tr><td><strong>Pairwise</strong></td><td>Judge so sánh 2 responses: A vs B</td><td>Relative ranking, ít bias</td><td>$O(n^2)$ comparisons</td></tr>
</tbody>
</table>

<h3 id="3-2-pointwise-implementation">3.2. Pointwise Scoring Implementation</h3>

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
    Dùng strong LLM (GPT-4) làm judge.
    Returns structured evaluation scores.
    """
    prompt = JUDGE_PROMPT.format(question=question, response=response)
    
    result = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.0,  # Deterministic judging
        response_format={"type": "json_object"},
    )
    
    return json.loads(result.choices[0].message.content)

# --- Ví dụ sử dụng ---
# scores = judge_response(client,
#     question="What is LoRA fine-tuning?",
#     response="LoRA adds low-rank matrices to freeze model weights..."
# )
# print(scores["overall"]["score"])  # → 4.2
</code></pre>

<h3 id="3-3-elo-ranking-system">3.3. ELO Ranking System cho LLMs</h3>

<p><strong>ELO rating</strong> (lấy từ chess) gán mỗi model một rating number. Khi 2 model "đấu" (judge chọn winner), rating cập nhật:</p>

<p>$$E_A = \frac{1}{1 + 10^{(R_B - R_A)/400}}$$</p>

<p>$$R'_A = R_A + K \cdot (S_A - E_A)$$</p>

<p>Trong đó:</p>
<ul>
<li>$R_A, R_B$ = current ratings</li>
<li>$E_A$ = expected score (xác suất A thắng)</li>
<li>$S_A$ = actual score (1 = win, 0.5 = draw, 0 = loss)</li>
<li>$K$ = sensitivity factor (thường K=32)</li>
</ul>

<pre><code class="language-python">
import random

class ELORanker:
    """
    ELO ranking system cho LLM comparison.
    Chatbot Arena (lmsys.org) dùng hệ thống tương tự.
    """
    def __init__(self, k_factor: int = 32, initial_rating: int = 1500):
        self.k = k_factor
        self.initial = initial_rating
        self.ratings: dict[str, float] = {}
        self.match_history: list[dict] = []
    
    def get_rating(self, model: str) -> float:
        return self.ratings.setdefault(model, float(self.initial))
    
    def expected_score(self, ra: float, rb: float) -> float:
        """Xác suất A thắng B."""
        return 1.0 / (1.0 + 10 ** ((rb - ra) / 400))
    
    def update(self, winner: str, loser: str, draw: bool = False):
        """
        Cập nhật ratings sau 1 trận.
        winner = model A, loser = model B (hoặc draw).
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
        """Trả về sorted leaderboard."""
        return sorted(self.ratings.items(), key=lambda x: -x[1])

# --- Simulate matchups ---
ranker = ELORanker()
models = ["GPT-4o", "Claude-3.5", "Llama-3-70B", "Gemini-1.5"]

# 50 random pairwise comparisons (simplified simulation)
for _ in range(50):
    a, b = random.sample(models, 2)
    # Giả lập: GPT-4o và Claude thắng nhiều hơn
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

<h3 id="3-4-nemo-evaluator">3.4. NeMo Evaluator Microservice</h3>

<p><strong>NeMo Evaluator</strong> là thành phần trong NVIDIA NeMo framework, cho phép chạy evaluation có hệ thống trên LLM endpoints. Config bằng YAML, gọi qua REST API.</p>

<pre><code class="language-python">
# NeMo Evaluator — Config ví dụ
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

<blockquote><p><strong>Exam tip:</strong> NeMo Evaluator hỗ trợ cả <strong>automated metrics</strong> (BLEU, ROUGE) lẫn <strong>LLM-as-a-Judge</strong>. Khi đề hỏi "How to evaluate model before deployment using NeMo" → NeMo Evaluator microservice. Khi hỏi "How to track evaluation experiments" → <strong>MLflow</strong> integration.</p></blockquote>

<p><strong>Q2:</strong> In an ELO ranking system for LLMs, Model A has a rating of 1600 and Model B has a rating of 1400. What is the expected probability that Model A wins a pairwise comparison?</p>

<ul>
<li>A) 50%</li>
<li>B) 64%</li>
<li>C) 76%</li>
<li>D) 88%</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>C) 76%</strong> ✓</p>
<p><em>Áp dụng công thức: $E_A = \frac{1}{1 + 10^{(1400-1600)/400}} = \frac{1}{1 + 10^{-0.5}} = \frac{1}{1 + 0.316} = \frac{1}{1.316} \approx 0.76$ hay 76%. Rating difference 200 tương đương ~76% win probability. Nhớ: mỗi 400 điểm chênh lệch = 10x expected win ratio.</em></p>
</details>

<h2 id="4-systematic-evaluation-nemo-mlflow">4. Systematic Evaluation với NeMo &amp; MLflow</h2>

<h3 id="4-1-nemo-evaluator-workflow">4.1. NeMo Evaluator Workflow</h3>

<p>Pipeline evaluation có hệ thống trong NVIDIA NeMo ecosystem:</p>

<pre><code class="language-text">
NeMo Evaluation Workflow — End-to-End
══════════════════════════════════════════════════════════════

  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
  │  Prepare     │     │  Deploy NIM  │     │  Deploy      │
  │  Eval Dataset│     │  Model Under │     │  Judge Model │
  │  (JSONL)     │     │  Test (NIM)  │     │  (Nemotron)  │
  └──────┬───────┘     └──────┬───────┘     └──────┬───────┘
         │                    │                    │
         ▼                    ▼                    ▼
  ┌────────────────────────────────────────────────────────┐
  │              NeMo Evaluator Microservice                │
  │                                                        │
  │  1. Load eval dataset (questions + references)         │
  │  2. Send each question to Model Under Test             │
  │  3. Collect responses                                  │
  │  4. Score via automated metrics AND/OR LLM judge       │
  │  5. Aggregate results → score card                     │
  └────────────────────────┬───────────────────────────────┘
                           │
                           ▼
  ┌────────────────────────────────────────────────────────┐
  │                    MLflow Server                        │
  │  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐   │
  │  │ Experiment 1│  │ Experiment 2│  │ Experiment 3 │   │
  │  │ base model  │  │ LoRA v1     │  │ LoRA v2      │   │
  │  │ F1: 0.62    │  │ F1: 0.78    │  │ F1: 0.81     │   │
  │  │ BLEU: 0.31  │  │ BLEU: 0.42  │  │ BLEU: 0.45   │   │
  │  └─────────────┘  └─────────────┘  └──────────────┘   │
  │                                                        │
  │  → Select best: Experiment 3 (LoRA v2) → deploy to NIM│
  └────────────────────────────────────────────────────────┘
</code></pre>

<h3 id="4-2-gsm8k-benchmark">4.2. GSM8K Benchmark</h3>

<p><strong>GSM8K</strong> (Grade School Math 8K) là benchmark chứa ~8.5K bài toán tiểu học, dùng để test <strong>reasoning ability</strong> của LLM. Mỗi bài có chain-of-thought solution.</p>

<pre><code class="language-python">
# Ví dụ GSM8K question format
gsm8k_example = {
    "question": "Janet buys 3 pounds of steak at $8/pound and 2 pounds "
                "of chicken at $5/pound. How much does she spend total?",
    "answer": "3 pounds of steak cost 3 * 8 = <<3*8=24>>24 dollars. "
              "2 pounds of chicken cost 2 * 5 = <<2*5=10>>10 dollars. "
              "Total cost is 24 + 10 = <<24+10=34>>34 dollars. #### 34"
}

# Evaluation: extract final answer after ####, compare with model output
def extract_gsm8k_answer(solution: str) -> str:
    """Trích xuất final answer từ GSM8K format."""
    if "####" in solution:
        return solution.split("####")[-1].strip()
    # Fallback: lấy số cuối cùng
    import re
    numbers = re.findall(r'-?\d+\.?\d*', solution)
    return numbers[-1] if numbers else ""

def evaluate_gsm8k(model_answers: list[str],
                   ground_truths: list[str]) -> dict:
    """Tính accuracy trên GSM8K."""
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

<h3 id="4-3-zero-shot-vs-few-shot">4.3. Zero-Shot vs Few-Shot Evaluation</h3>

<p>So sánh performance khi prompting khác nhau:</p>

<table>
<thead>
<tr><th>Setting</th><th>GSM8K Accuracy (Llama-3-8B)</th><th>GSM8K Accuracy (Llama-3-70B)</th></tr>
</thead>
<tbody>
<tr><td><strong>Zero-shot</strong></td><td>~48%</td><td>~78%</td></tr>
<tr><td><strong>Zero-shot CoT</strong> ("think step by step")</td><td>~56%</td><td>~83%</td></tr>
<tr><td><strong>5-shot</strong></td><td>~55%</td><td>~85%</td></tr>
<tr><td><strong>5-shot CoT</strong></td><td>~62%</td><td>~90%</td></tr>
</tbody>
</table>

<p>Nhận xét: <strong>Few-shot + Chain-of-Thought</strong> luôn tốt nhất. Model lớn hơn (70B) benefit nhiều hơn từ CoT so với model nhỏ (8B).</p>

<h3 id="4-4-mlflow-tracking">4.4. MLflow Experiment Tracking</h3>

<pre><code class="language-python">
import mlflow

# Thiết lập MLflow experiment
mlflow.set_tracking_uri("http://mlflow:5000")
mlflow.set_experiment("legal-qa-model-comparison")

def run_evaluation_experiment(model_name: str, 
                              model_endpoint: str,
                              eval_dataset: list[dict]):
    """
    Chạy evaluation và log kết quả vào MLflow.
    """
    with mlflow.start_run(run_name=f"eval-{model_name}"):
        # Log parameters
        mlflow.log_param("model_name", model_name)
        mlflow.log_param("eval_dataset_size", len(eval_dataset))
        mlflow.log_param("eval_type", "automated + llm-judge")
        
        # Run inference + evaluation
        results = run_nemo_evaluation(model_endpoint, eval_dataset)
        
        # Log metrics
        mlflow.log_metric("bleu_score", results["bleu"])
        mlflow.log_metric("rouge_l", results["rouge_l"])
        mlflow.log_metric("f1_score", results["f1"])
        mlflow.log_metric("judge_correctness", results["judge_correctness"])
        mlflow.log_metric("judge_relevance", results["judge_relevance"])
        mlflow.log_metric("latency_p95_ms", results["latency_p95"])
        
        # Log artifacts (full results, sample outputs)
        mlflow.log_dict(results, "full_results.json")
        
        print(f"[{model_name}] F1={results['f1']:.3f}, "
              f"BLEU={results['bleu']:.3f}, "
              f"Judge={results['judge_correctness']:.2f}")
</code></pre>

<p><strong>Q3:</strong> A data scientist runs the same evaluation on three model configurations using NeMo Evaluator: base model, LoRA fine-tuned (rank 8), and LoRA fine-tuned (rank 32). All results are logged to MLflow. Which MLflow feature should they use to select the best configuration?</p>

<ul>
<li>A) MLflow Model Registry</li>
<li>B) MLflow Projects</li>
<li>C) MLflow Experiment comparison / search runs</li>
<li>D) MLflow Deployments</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>C) MLflow Experiment comparison / search runs</strong> ✓</p>
<p><em>MLflow Experiments cho phép so sánh metrics across runs — filter, sort, visualize. Model Registry là để versioning models đã chọn. Projects là để package code. Deployments là để serve models. Bước "chọn best config" thuộc về experiment comparison.</em></p>
</details>

<h2 id="5-lora-theory">5. LoRA — Low-Rank Adaptation Theory</h2>

<h3 id="5-1-van-de-full-fine-tuning">5.1. Vấn đề của Full Fine-tuning</h3>

<p>Full fine-tuning cập nhật <strong>toàn bộ</strong> parameters của model. Với LLM hiện đại, điều này cực kỳ tốn kém:</p>

<table>
<thead>
<tr><th>Model</th><th>Parameters</th><th>Full FT Memory (FP16)</th><th>Full FT Memory (FP32)</th><th>GPU Needed</th></tr>
</thead>
<tbody>
<tr><td>Llama-3-8B</td><td>8B</td><td>~32 GB</td><td>~64 GB</td><td>1× A100 80GB</td></tr>
<tr><td>Llama-3-70B</td><td>70B</td><td>~280 GB</td><td>~560 GB</td><td>4-8× A100 80GB</td></tr>
<tr><td>Llama-3-405B</td><td>405B</td><td>~1.6 TB</td><td>~3.2 TB</td><td>32× A100 80GB</td></tr>
</tbody>
</table>

<p>Ngoài chi phí, full fine-tuning còn gây:</p>

<ul>
<li><strong>Catastrophic forgetting</strong> — model quên kiến thức cũ khi học task mới</li>
<li><strong>Storage overhead</strong> — mỗi fine-tuned version là 1 bản copy đầy đủ</li>
<li><strong>Overfitting risk</strong> — dễ overfit trên dataset nhỏ</li>
</ul>

<h3 id="5-2-lora-intuition">5.2. LoRA Intuition — Weight Updates are Low-Rank</h3>

<p>Observation quan trọng từ paper <em>"LoRA: Low-Rank Adaptation of Large Language Models"</em> (Hu et al., 2021): khi fine-tuning LLM, <strong>weight changes $\Delta W$ có rank thấp</strong> — nghĩa là phần lớn thông tin nằm trong vài dimensions chính.</p>

<p>Thay vì học $\Delta W \in \mathbb{R}^{d \times k}$ (quá nhiều parameters), ta phân tích nó thành tích 2 matrix nhỏ hơn:</p>

<p>$$W' = W + \Delta W = W + BA$$</p>

<p>Trong đó:</p>
<ul>
<li>$W \in \mathbb{R}^{d \times k}$ — pretrained weight (frozen, không update)</li>
<li>$B \in \mathbb{R}^{d \times r}$ — LoRA down-projection</li>
<li>$A \in \mathbb{R}^{r \times k}$ — LoRA up-projection</li>
<li>$r \ll \min(d, k)$ — <strong>rank</strong>, thường r = 4, 8, 16, 32</li>
</ul>

<h3 id="5-3-parameter-count">5.3. Parameter Count Calculation</h3>

<p>Savings cực kỳ ấn tượng. Ví dụ với một attention layer:</p>

<p>$$\text{Full params} = d \times k$$</p>

<p>$$\text{LoRA params} = d \times r + r \times k = r(d + k)$$</p>

<p>$$\text{Ratio} = \frac{r(d+k)}{dk}$$</p>

<pre><code class="language-python">
def lora_param_analysis(d: int, k: int, r: int, 
                        num_layers: int, 
                        target_modules: int = 4):
    """
    Tính parameter count cho LoRA configuration.
    target_modules: Q, K, V, O projections (thường 4)
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

# Llama-3-8B: d=4096, k=4096, 32 layers
result = lora_param_analysis(d=4096, k=4096, r=16, num_layers=32)
print(f"Full fine-tuning: {result['full_params']} params")
print(f"LoRA (r=16):      {result['lora_params']} params")
print(f"LoRA / Full:       {result['ratio']}")
print(f"Savings:           {result['savings']}")

# Output:
# Full fine-tuning: 2,147,483,648 params  (~2.1B for attention only)
# LoRA (r=16):      16,777,216 params      (~16.8M)
# LoRA / Full:       0.78%
# Savings:           99.22%
</code></pre>

<h3 id="5-4-rank-selection">5.4. Rank Selection — Trade-offs</h3>

<table>
<thead>
<tr><th>Rank ($r$)</th><th>Trainable Params</th><th>Quality</th><th>Training Speed</th><th>Use case</th></tr>
</thead>
<tbody>
<tr><td>$r = 4$</td><td>Rất ít (~4M)</td><td>Good cho simple tasks</td><td>Nhanh nhất</td><td>Style transfer, format tuning</td></tr>
<tr><td>$r = 8$</td><td>Ít (~8M)</td><td>Good-Very Good</td><td>Nhanh</td><td>Domain adaptation, QA</td></tr>
<tr><td>$r = 16$</td><td>Vừa (~17M)</td><td>Very Good</td><td>Medium</td><td>Most tasks (default choice)</td></tr>
<tr><td>$r = 32$</td><td>Nhiều hơn (~34M)</td><td>Excellent</td><td>Chậm hơn</td><td>Complex domain, code gen</td></tr>
<tr><td>$r = 64$</td><td>Khá nhiều (~67M)</td><td>Near full FT</td><td>Chậm</td><td>Diminishing returns</td></tr>
</tbody>
</table>

<h3 id="5-5-alpha-scaling">5.5. Alpha Scaling Factor</h3>

<p>LoRA dùng scaling factor $\alpha$ để kiểm soát "mức ảnh hưởng" của adaptation:</p>

<p>$$h = Wx + \frac{\alpha}{r} \cdot BAx$$</p>

<p>Thường $\alpha = r$ hoặc $\alpha = 2r$. Khi $\alpha = r$, scaling factor = 1 (không thay đổi). Tăng $\alpha$ → LoRA adaptation ảnh hưởng lớn hơn.</p>

<h3 id="5-6-which-layers">5.6. Apply LoRA vào layers nào?</h3>

<p>Trong transformer, LoRA thường áp dụng vào <strong>attention projections</strong>:</p>

<ul>
<li><strong>Q (Query)</strong> — ✓ luôn nên apply</li>
<li><strong>K (Key)</strong> — ✓ nên apply</li>
<li><strong>V (Value)</strong> — ✓ luôn nên apply (quan trọng nhất)</li>
<li><strong>O (Output)</strong> — ✓ tùy chọn, có thể bỏ nếu cần tiết kiệm</li>
<li><strong>MLP layers</strong> — optional, giúp cho complex adaptations</li>
</ul>

<p>Paper gốc cho thấy: apply LoRA vào <strong>Q + V</strong> đã đủ tốt cho hầu hết tasks.</p>

<pre><code class="language-text">
LoRA within Transformer Attention Layer
══════════════════════════════════════════════════════════════

  Input: x ∈ ℝ^(seq_len × d_model)
  ─────────────────────────────────────────────────────────
  
  ┌─────────────────────────────────┐
  │ Original Path (Frozen)          │
  │                                 │
  │ Q = W_q · x    (frozen W_q)    │   ┌──────────────────┐
  │ K = W_k · x    (frozen W_k)    │   │  LoRA Adapters   │
  │ V = W_v · x    (frozen W_v)    │   │                  │
  │                                 │   │ ΔQ = B_q·A_q · x │
  │ Attn = softmax(QK^T/√d) · V    │   │ ΔK = B_k·A_k · x │
  │                                 │   │ ΔV = B_v·A_v · x │
  │ Out = W_o · Attn (frozen W_o)  │   │ ΔO = B_o·A_o·Attn│
  └───────────────┬─────────────────┘   └────────┬─────────┘
                  │                              │
                  ▼                              ▼
          ┌───────────────────────────────────────────┐
          │          h = W·x + (α/r) · BA·x           │
          │               Final Output                 │
          │  (frozen pretrained + trainable LoRA)      │
          └───────────────────────────────────────────┘
  
  Memory: Only B (d×r) and A (r×k) are trained
  Example: d=4096, r=16 → 4096×16 + 16×4096 = 131,072 params
           vs full: 4096×4096 = 16,777,216 params → 128× smaller!
</code></pre>

<h3 id="5-7-comparison-table">5.7. LoRA vs Alternatives</h3>

<table>
<thead>
<tr><th>Method</th><th>Trainable Params</th><th>Memory</th><th>Quality</th><th>Khi nào dùng</th></tr>
</thead>
<tbody>
<tr><td><strong>Full Fine-tuning</strong></td><td>100%</td><td>Rất cao</td><td>Best (nhưng overfit risk)</td><td>Có nhiều data + GPU resources</td></tr>
<tr><td><strong>LoRA</strong></td><td>0.1-1%</td><td>Thấp</td><td>Very Good</td><td>Default choice cho hầu hết tasks</td></tr>
<tr><td><strong>QLoRA</strong></td><td>0.1-1%</td><td>Rất thấp</td><td>Good-Very Good</td><td>Limited GPU memory</td></tr>
<tr><td><strong>Prefix Tuning</strong></td><td>&lt;0.1%</td><td>Thấp nhất</td><td>Good cho specific tasks</td><td>Short, structured outputs</td></tr>
<tr><td><strong>Adapter Tuning</strong></td><td>1-5%</td><td>Medium</td><td>Good</td><td>Multi-task learning</td></tr>
<tr><td><strong>Prompt Tuning</strong></td><td>&lt;0.01%</td><td>Minimal</td><td>Moderate</td><td>Simple classification</td></tr>
</tbody>
</table>

<h3 id="5-8-lora-implementation">5.8. Implement LoRA Wrapper từ Scratch</h3>

<pre><code class="language-python">
import torch
import torch.nn as nn
import math

class LoRALinear(nn.Module):
    """
    LoRA wrapper cho nn.Linear layer.
    Freezes original weight, adds low-rank BA decomposition.
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
        
        # Freeze original weights
        self.original.weight.requires_grad_(False)
        if self.original.bias is not None:
            self.original.bias.requires_grad_(False)
        
        # LoRA matrices
        # A: initialized with Kaiming uniform (like the paper)
        # B: initialized with zeros (so ΔW = BA = 0 at start)
        self.lora_A = nn.Parameter(
            torch.empty(rank, in_features)
        )
        self.lora_B = nn.Parameter(
            torch.zeros(out_features, rank)
        )
        
        # Initialize A with Kaiming
        nn.init.kaiming_uniform_(self.lora_A, a=math.sqrt(5))
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # Original frozen path
        h = self.original(x)
        # LoRA adaptation path: scaling * (x @ A^T @ B^T)
        lora_out = x @ self.lora_A.T @ self.lora_B.T
        h = h + self.scaling * lora_out
        return h
    
    def merge_weights(self) -> nn.Linear:
        """
        Merge LoRA vào original weight cho inference.
        Không cần tính LoRA riêng nữa → zero overhead.
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
    Apply LoRA to specified modules in a model.
    target_modules: list of module name patterns (e.g., ["q_proj", "v_proj"])
    """
    if target_modules is None:
        target_modules = ["q_proj", "k_proj", "v_proj", "o_proj"]
    
    lora_params = 0
    frozen_params = 0
    
    for name, module in model.named_modules():
        if isinstance(module, nn.Linear):
            if any(t in name for t in target_modules):
                # Replace with LoRA version
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

# --- Ví dụ: Apply LoRA to a toy transformer ---
# model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-8B")
# model = apply_lora_to_model(model, rank=16, alpha=32)
# Output:
# LoRA params:        8,388,608 (0.39%)
# Frozen params:  2,147,483,648 (99.61%)
</code></pre>

<blockquote><p><strong>Exam tip:</strong> Câu hỏi rất hay gặp: "LoRA initialization — how is $B$ initialized?" → <strong>$B$ khởi tạo bằng zeros</strong>, $A$ khởi tạo random. Điều này đảm bảo $\Delta W = BA = 0$ lúc bắt đầu training, nên model xuất phát từ pretrained performance.</p></blockquote>

<p><strong>Q4:</strong> A transformer layer has weight matrix $W \in \mathbb{R}^{4096 \times 4096}$. Using LoRA with rank $r=8$, how many trainable parameters does the LoRA adapter add for this single layer?</p>

<ul>
<li>A) 8,192</li>
<li>B) 32,768</li>
<li>C) 65,536</li>
<li>D) 16,777,216</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>C) 65,536</strong> ✓</p>
<p><em>LoRA params = $d \times r + r \times k = 4096 \times 8 + 8 \times 4096 = 32768 + 32768 = 65536$. So sánh: original matrix có $4096 \times 4096 = 16{,}777{,}216$ params. LoRA chỉ dùng $65536 / 16777216 = 0.39\%$ parameters. Đáp án D là full matrix size, A quên một nửa, B chỉ tính 1 matrix.</em></p>
</details>

<h2 id="6-qlora-memory-efficient">6. QLoRA &amp; Memory-Efficient Fine-tuning</h2>

<h3 id="6-1-qlora-overview">6.1. QLoRA — Quantized LoRA</h3>

<p><strong>QLoRA</strong> (Dettmers et al., 2023) kết hợp <strong>4-bit quantization</strong> cho frozen weights + <strong>LoRA adapters</strong> ở FP16/BF16. Ba kỹ thuật chính:</p>

<ul>
<li><strong>NF4 (4-bit NormalFloat)</strong> — quantization format tối ưu cho weight distributions theo dạng normal</li>
<li><strong>Double Quantization</strong> — quantize cả quantization constants → tiết kiệm thêm ~0.37 bit/param</li>
<li><strong>Paged Optimizers</strong> — khi GPU memory hết, tự động offload optimizer states sang CPU RAM</li>
</ul>

<h3 id="6-2-vram-comparison">6.2. VRAM Comparison</h3>

<table>
<thead>
<tr><th>Model</th><th>Full FT (FP16)</th><th>LoRA (FP16 base)</th><th>QLoRA (NF4 base)</th><th>Consumer GPU?</th></tr>
</thead>
<tbody>
<tr><td>Llama-3-8B</td><td>~32 GB</td><td>~18 GB</td><td><strong>~6 GB</strong></td><td>✓ RTX 3090/4090</td></tr>
<tr><td>Llama-3-13B</td><td>~52 GB</td><td>~28 GB</td><td><strong>~10 GB</strong></td><td>✓ RTX 4090 24GB</td></tr>
<tr><td>Llama-3-70B</td><td>~280 GB</td><td>~160 GB</td><td><strong>~36 GB</strong></td><td>✗ Need A100 80GB</td></tr>
<tr><td>Llama-3-405B</td><td>~1.6 TB</td><td>~900 GB</td><td><strong>~200 GB</strong></td><td>✗ Multi-A100/H100</td></tr>
</tbody>
</table>

<h3 id="6-3-when-to-use">6.3. Decision Guide: Full FT vs LoRA vs QLoRA</h3>

<pre><code class="language-text">
Decision Tree: Which Fine-tuning Method?
══════════════════════════════════════════════════════════════

  Start: "I want to fine-tune an LLM"
  │
  ├─ Q: Do you have MANY GPUs + large dataset (>100K samples)?
  │  ├─ YES → Full Fine-tuning (best quality, most expensive)
  │  └─ NO ↓
  │
  ├─ Q: Does your base model fit in FP16 on your GPU?
  │  ├─ YES → Standard LoRA
  │  │         • rank 16-32
  │  │         • target: q_proj, v_proj (minimum)
  │  │         • α = r or 2r
  │  └─ NO ↓
  │
  ├─ Q: Does your model fit in 4-bit on your GPU?
  │  ├─ YES → QLoRA (4-bit NF4)
  │  │         • Same LoRA config
  │  │         • Add: load_in_4bit=True
  │  │         • Add: bnb_4bit_quant_type="nf4"
  │  │         • ~3-4x memory savings
  │  └─ NO → Need more GPUs or smaller model
  │
  └─ Special cases:
     • Very simple task (format change) → Prompt tuning
     • Need zero latency overhead → LoRA + merge weights
     • Multi-tenant serving → LoRA adapters (swap per user)
</code></pre>

<h3 id="6-4-qlora-code">6.4. QLoRA Setup với bitsandbytes + PEFT</h3>

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

# --- Step 1: 4-bit Quantization Config ---
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",           # NormalFloat4
    bnb_4bit_compute_dtype=torch.bfloat16, # Compute in BF16
    bnb_4bit_use_double_quant=True,       # Double quantization
)

# --- Step 2: Load Model in 4-bit ---
model_name = "meta-llama/Meta-Llama-3-8B-Instruct"
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True,
)
tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token

# Prepare model for k-bit training (freeze, cast, enable gradient checkpointing)
model = prepare_model_for_kbit_training(model)

# --- Step 3: LoRA Config ---
lora_config = LoraConfig(
    r=16,                      # Rank
    lora_alpha=32,             # Alpha (= 2*r)
    target_modules=[           # Which layers to adapt
        "q_proj", "k_proj", 
        "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj",  # MLP layers too
    ],
    lora_dropout=0.05,         # Dropout for regularization
    bias="none",               # Don't train biases
    task_type="CAUSAL_LM",
)

# Apply LoRA
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# Output: trainable params: 41,943,040 || all params: 8,030,261,248
#         || trainable%: 0.5223%

# --- Step 4: Training ---
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
    bf16=True,                  # Use BF16 mixed precision
    gradient_checkpointing=True, # Save memory
    optim="paged_adamw_32bit",  # Paged optimizer
    report_to="mlflow",         # Track in MLflow
)

trainer = SFTTrainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,  # Your prepared dataset
    tokenizer=tokenizer,
    max_seq_length=2048,
    dataset_text_field="text",
)

# Launch training!
trainer.train()

# --- Step 5: Save LoRA adapter (only ~80MB, not full model) ---
trainer.model.save_pretrained("./lora-adapter-legal-qa")
</code></pre>

<blockquote><p><strong>Exam tip:</strong> DLI assessment thường hỏi: "What makes QLoRA more memory-efficient than LoRA?" → Ba yếu tố: <strong>(1) NF4 quantization</strong> giảm base model từ 16-bit xuống 4-bit, <strong>(2) Double quantization</strong>, <strong>(3) Paged optimizers</strong>. LoRA adapters vẫn ở FP16/BF16 — chỉ frozen weights bị quantize.</p></blockquote>

<h2 id="7-nemo-customizer">7. Hands-on Fine-tuning với NeMo Customizer</h2>

<h3 id="7-1-nemo-customizer-overview">7.1. NeMo Customizer Microservice</h3>

<p><strong>NeMo Customizer</strong> là microservice trong NVIDIA NeMo stack cho phép launch fine-tuning jobs (LoRA, P-tuning, full SFT) trên NIM models thông qua REST API. Không cần viết training loop — chỉ cần config và data.</p>

<pre><code class="language-text">
NeMo Customizer — Fine-tuning Pipeline
══════════════════════════════════════════════════════════════

  ┌──────────────────┐    ┌──────────────────┐
  │  Training Data   │    │  Base Model      │
  │  (JSONL format)  │    │  (via NIM)       │
  │                  │    │  Llama-3-8B-Inst │
  └────────┬─────────┘    └────────┬─────────┘
           │                       │
           ▼                       ▼
  ┌────────────────────────────────────────────┐
  │          NeMo Customizer Service           │
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
             Job Status: RUNNING → COMPLETED
                        │
                        ▼
  ┌────────────────────────────────────────────┐
  │  Output: LoRA Adapter Weights              │
  │  → Mount into NIM for inference            │
  │  → Run NeMo Evaluator to validate          │
  │  → Compare with base model in MLflow       │
  └────────────────────────────────────────────┘
</code></pre>

<h3 id="7-2-dataset-preparation">7.2. Dataset Preparation</h3>

<pre><code class="language-python">
import json

def prepare_sft_dataset(raw_data: list[dict], 
                        output_path: str,
                        system_prompt: str = None):
    """
    Format data cho NeMo Customizer SFT/LoRA training.
    Input format: [{"question": "...", "answer": "..."}]
    Output: JSONL với conversation format.
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
    
    # Shuffle và split train/val (90/10)
    import random
    random.shuffle(formatted)
    split_idx = int(len(formatted) * 0.9)
    train_data = formatted[:split_idx]
    val_data = formatted[split_idx:]
    
    # Write JSONL
    for suffix, data in [("train", train_data), ("val", val_data)]:
        path = output_path.replace(".jsonl", f"_{suffix}.jsonl")
        with open(path, "w") as f:
            for item in data:
                f.write(json.dumps(item, ensure_ascii=False) + "\n")
        print(f"Wrote {len(data)} examples to {path}")
    
    return len(train_data), len(val_data)

# --- Ví dụ ---
raw = [
    {"question": "Thuốc Metformin chỉ định cho bệnh gì?",
     "answer": "Metformin là thuốc first-line cho diabetes type 2..."},
    # ... thêm 5000+ examples
]
prepare_sft_dataset(raw, "legal_qa.jsonl",
    system_prompt="Bạn là trợ lý y tế chuyên nghiệp. "
                  "Trả lời chính xác dựa trên evidence-based medicine.")
</code></pre>

<h3 id="7-3-launch-training">7.3. Launch Training Job via API</h3>

<pre><code class="language-python">
import requests

CUSTOMIZER_URL = "http://nemo-customizer:8080"

def launch_lora_job(model_name: str,
                    train_file: str,
                    val_file: str,
                    config: dict) -> str:
    """
    Launch LoRA fine-tuning job trên NeMo Customizer.
    Returns: job_id
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
    """Kiểm tra trạng thái training job."""
    resp = requests.get(
        f"{CUSTOMIZER_URL}/v1/customization/jobs/{job_id}"
    )
    result = resp.json()
    print(f"Status: {result['status']}, "
          f"Progress: {result.get('progress', 'N/A')}")
    return result

# --- Usage ---
# job_id = launch_lora_job(
#     model_name="meta/llama-3.1-8b-instruct",
#     train_file="/data/legal_qa_train.jsonl",
#     val_file="/data/legal_qa_val.jsonl",
#     config={"epochs": 3, "rank": 16, "lr": 2e-4}
# )
# status = check_job_status(job_id)
</code></pre>

<h3 id="7-4-inference-with-adapter">7.4. Inference với LoRA Adapter</h3>

<pre><code class="language-python">
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer

def load_model_with_lora(base_model_name: str, 
                         adapter_path: str):
    """Load base model + mount LoRA adapter."""
    # Load base
    base_model = AutoModelForCausalLM.from_pretrained(
        base_model_name, 
        device_map="auto",
        torch_dtype=torch.bfloat16,
    )
    tokenizer = AutoTokenizer.from_pretrained(base_model_name)
    
    # Mount LoRA adapter
    model = PeftModel.from_pretrained(base_model, adapter_path)
    
    # Optional: merge adapter into base for faster inference
    # model = model.merge_and_unload()
    
    return model, tokenizer

def compare_base_vs_finetuned(question: str,
                               base_model, base_tok,
                               ft_model, ft_tok):
    """So sánh output của base model vs fine-tuned."""
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

<p><strong>Q5:</strong> A team fine-tunes Llama-3-8B using NeMo Customizer with LoRA (rank=16). The resulting adapter file is approximately 80 MB. The original model is 16 GB. For production deployment, what is the MOST efficient serving approach?</p>

<ul>
<li>A) Deploy the full 16 GB fine-tuned model separately</li>
<li>B) Merge LoRA weights into base model and deploy 16 GB merged model</li>
<li>C) Deploy base model once via NIM and mount LoRA adapter at inference time</li>
<li>D) Convert to ONNX format for faster inference</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>C) Deploy base model once via NIM and mount LoRA adapter at inference time</strong> ✓</p>
<p><em>NIM supports LoRA adapter hot-loading — 1 base model phục vụ nhiều customers/domains khác nhau chỉ bằng cách swap adapter (~80MB). Cách B hoạt động nhưng tốn storage và không multi-tenant. Cách A không tận dụng LoRA advantage. ONNX conversion là optimization riêng, không liên quan đến adapter serving.</em></p>
</details>

<h2 id="8-final-strategy-cheatsheet">8. Final Assessment Strategy &amp; Cheat Sheet</h2>

<h3 id="8-1-assessment-format">8.1. Assessment Format Recap</h3>

<p>NVIDIA DLI Generative AI certification bao gồm nhiều course assessments:</p>

<table>
<thead>
<tr><th>Course Code</th><th>Topic</th><th>Format</th><th>Thời gian</th><th>Pass</th></tr>
</thead>
<tbody>
<tr><td><strong>S-FX-14</strong></td><td>Generative AI with Diffusion Models</td><td>Coding assessment</td><td>~2 hours</td><td>70%</td></tr>
<tr><td><strong>S-FX-15</strong></td><td>Building RAG Agents with LLMs</td><td>Coding + MCQ</td><td>~2 hours</td><td>70%</td></tr>
<tr><td><strong>S-FX-34</strong></td><td>Build an AI Agent Reasoning App</td><td>Coding assessment</td><td>~2 hours</td><td>70%</td></tr>
<tr><td><strong>C-FX-25</strong></td><td>GenAI LLM Customization &amp; Eval</td><td>Coding + MCQ</td><td>~2 hours</td><td>70%</td></tr>
</tbody>
</table>

<h3 id="8-2-common-mistakes">8.2. Common Mistakes &amp; How to Avoid Them</h3>

<ul>
<li><strong>Sai dimension tensor</strong>: Luôn kiểm tra shape bằng <code>tensor.shape</code> trước khi matmul</li>
<li><strong>Quên freeze weights</strong>: LoRA phải freeze base model — nếu không sẽ full fine-tuning</li>
<li><strong>Nhầm BLEU và ROUGE</strong>: BLEU = precision, ROUGE = recall</li>
<li><strong>Thiếu brevity penalty</strong>: BLEU không chỉ là n-gram match, phải có BP</li>
<li><strong>Sai CFG formula</strong>: $\epsilon_\theta = \epsilon_{uncond} + s \cdot (\epsilon_{cond} - \epsilon_{uncond})$, chú ý thứ tự trừ</li>
<li><strong>Top-k vs Top-p</strong>: top-k chọn k tokens có probability cao nhất, top-p chọn tokens đến khi cumulative probability đạt p</li>
</ul>

<h3 id="8-3-time-management">8.3. Time Management Strategy</h3>

<ol>
<li><strong>Đọc toàn bộ đề trước</strong> (5 phút) — xác định bài dễ/khó</li>
<li><strong>Làm bài code trước</strong> — thường chiếm nhiều điểm hơn MCQ</li>
<li><strong>MCQ: eliminate trước</strong> — loại 2 đáp án sai rõ ràng, chọn giữa 2 còn lại</li>
<li><strong>Không stuck quá 10 phút</strong> cho 1 câu — đánh dấu và quay lại sau</li>
<li><strong>Dành 10 phút cuối</strong> review code (syntax errors, import missing)</li>
</ol>

<h3 id="8-4-cheat-sheet">8.4. Quick Reference Cheat Sheet</h3>

<table>
<thead>
<tr><th>Category</th><th>Formula / Pattern</th><th>Ghi nhớ</th></tr>
</thead>
<tbody>
<tr><td><strong>Diffusion — Forward</strong></td><td>$q(x_t|x_0) = \mathcal{N}(\sqrt{\bar\alpha_t}\,x_0,\;(1-\bar\alpha_t)\,I)$</td><td>Thêm noise theo schedule</td></tr>
<tr><td><strong>Diffusion — Reverse</strong></td><td>$p_\theta(x_{t-1}|x_t) = \mathcal{N}(\mu_\theta(x_t,t),\;\sigma_t^2 I)$</td><td>U-Net predict noise $\epsilon$</td></tr>
<tr><td><strong>CFG</strong></td><td>$\hat\epsilon = \epsilon_{uncond} + s(\epsilon_{cond} - \epsilon_{uncond})$</td><td>$s=7.5$ typical, $s=1$ = no guidance</td></tr>
<tr><td><strong>LoRA</strong></td><td>$W' = W + \frac{\alpha}{r}BA$</td><td>B=zeros init, A=random init</td></tr>
<tr><td><strong>LoRA params</strong></td><td>$r(d+k)$ per layer</td><td>Typically 0.1-1% of total</td></tr>
<tr><td><strong>BLEU</strong></td><td>$BP \cdot \exp(\sum w_n \log p_n)$</td><td>Precision-based, for translation</td></tr>
<tr><td><strong>F1</strong></td><td>$\frac{2PR}{P+R}$</td><td>Token overlap, for QA</td></tr>
<tr><td><strong>Cosine Sim</strong></td><td>$\frac{a \cdot b}{\|a\|\|b\|}$</td><td>Embedding-based semantic match</td></tr>
<tr><td><strong>ELO</strong></td><td>$R' = R + K(S - E)$</td><td>K=32 typical, initial=1500</td></tr>
<tr><td><strong>Attention</strong></td><td>$\text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) V$</td><td>Scale prevents softmax saturation</td></tr>
<tr><td><strong>Cross-Entropy</strong></td><td>$-\sum y_i \log(\hat{y}_i)$</td><td>LLM training loss function</td></tr>
<tr><td><strong>Perplexity</strong></td><td>$2^{H(p)} = e^{\text{CE loss}}$</td><td>Lower = better language model</td></tr>
</tbody>
</table>

<h3 id="8-5-pytorch-reference">8.5. PyTorch Quick Reference</h3>

<pre><code class="language-python">
import torch
import torch.nn as nn
import torch.nn.functional as F

# --- Tensor Operations (hay gặp trong assessment) ---
x = torch.randn(2, 3, 4)       # shape: (batch, seq, dim)
y = torch.randn(2, 4, 5)       # shape: (batch, dim, out)
z = torch.bmm(x, y)            # batch matmul → (2, 3, 5)
z = x @ y                      # same as bmm for 3D
z = torch.einsum('bsd,bdo->bso', x, y)  # Einstein notation

# Reshape operations
x = x.view(2, -1)              # Flatten last 2 dims → (2, 12)
x = x.unsqueeze(1)             # Add dim → (2, 1, 12)
x = x.squeeze(1)               # Remove dim → (2, 12)
x = x.permute(0, 2, 1)         # Swap dims

# Softmax + temperature
logits = torch.randn(1, 50257)  # vocab logits
temp = 0.7
probs = F.softmax(logits / temp, dim=-1)

# Top-k sampling
top_k = 50
top_k_vals, top_k_idx = torch.topk(probs, top_k)
sampled = torch.multinomial(top_k_vals, 1)

# Top-p (nucleus) sampling
sorted_probs, sorted_idx = torch.sort(probs, descending=True)
cumsum = torch.cumsum(sorted_probs, dim=-1)
mask = cumsum - sorted_probs > 0.9  # p=0.9
sorted_probs[mask] = 0.0
sorted_probs /= sorted_probs.sum()
sampled = torch.multinomial(sorted_probs, 1)

# Loss functions
loss_fn = nn.CrossEntropyLoss()
loss = loss_fn(logits, targets)  # logits: (B, V), targets: (B,)
</code></pre>

<h3 id="8-6-langchain-patterns">8.6. LangChain / LangGraph Patterns Reference</h3>

<pre><code class="language-python">
# --- RAG Pattern ---
# 1. Load → 2. Split → 3. Embed → 4. Store → 5. Retrieve → 6. Generate
from langchain_text_splitters import RecursiveCharacterTextSplitter
splitter = RecursiveCharacterTextSplitter(
    chunk_size=512, chunk_overlap=50
)

# --- Structured Output ---
from pydantic import BaseModel
class Answer(BaseModel):
    reasoning: str
    answer: str
    confidence: float

chain = prompt | llm.with_structured_output(Answer)

# --- LangGraph State Machine ---
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

<h3 id="8-7-frequency-table">8.7. Top Concepts by Frequency on DLI Assessments</h3>

<table>
<thead>
<tr><th>#</th><th>Concept</th><th>Frequency</th><th>Typical Question Type</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>Diffusion forward/reverse process</td><td>★★★★★</td><td>Fill in code, explain formula</td></tr>
<tr><td>2</td><td>LoRA rank, alpha, parameter count</td><td>★★★★★</td><td>Calculate params, choose config</td></tr>
<tr><td>3</td><td>RAG chunking strategy</td><td>★★★★☆</td><td>Choose chunk_size for use case</td></tr>
<tr><td>4</td><td>BLEU vs ROUGE vs F1</td><td>★★★★☆</td><td>Match metric to task</td></tr>
<tr><td>5</td><td>Classifier-Free Guidance</td><td>★★★★☆</td><td>Code CFG formula, choose scale</td></tr>
<tr><td>6</td><td>LangChain LCEL chains</td><td>★★★☆☆</td><td>Build pipeline with | operator</td></tr>
<tr><td>7</td><td>Attention mechanism</td><td>★★★☆☆</td><td>Implement scaled dot-product</td></tr>
<tr><td>8</td><td>NIM deployment</td><td>★★★☆☆</td><td>Docker compose, API config</td></tr>
<tr><td>9</td><td>Guardrails / NeMo Guardrails</td><td>★★☆☆☆</td><td>Config topical rails</td></tr>
<tr><td>10</td><td>Multi-agent patterns</td><td>★★☆☆☆</td><td>Choose supervisor vs swarm</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Tập trung revision vào <strong>top 5 concepts</strong> — chúng chiếm ~70% câu hỏi. Diffusion formulas và LoRA xuất hiện nhiều nhất. Luôn nhớ: $B$ initialized zeros trong LoRA, CFG guidance scale $s$ tăng → output adherent hơn với prompt.</p></blockquote>

<h2 id="9-mock-assessment">9. Practice Questions — Full Mock Assessment</h2>

<p>15 câu hỏi thi thử bao quát toàn bộ 10 bài trong series. Thời gian khuyến nghị: <strong>45 phút</strong>.</p>

<h3 id="9-diffusion">Diffusion Models (Q1–Q4)</h3>

<p><strong>Q1 🟢 (Easy):</strong> In a Denoising Diffusion Probabilistic Model (DDPM), during the forward process, noise is added to an image $x_0$ over $T$ timesteps. Which statement is TRUE about the forward process?</p>

<ul>
<li>A) The forward process requires a neural network to learn the noise schedule</li>
<li>B) At timestep $T$, $x_T$ approximates a standard Gaussian distribution $\mathcal{N}(0, I)$</li>
<li>C) The forward process removes noise gradually from the image</li>
<li>D) Each step in the forward process is a learned transformation</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>B</strong> ✓</p>
<p><em>Forward process là quá trình thêm noise theo schedule cố định (không cần neural network → A sai, D sai). Reverse process mới là bước khử noise → C sai. Tại $T$ đủ lớn, $x_T \sim \mathcal{N}(0, I)$ vì $\bar\alpha_T \to 0$.</em></p>
</details>

<p><strong>Q2 🟡 (Medium):</strong> Given the following Classifier-Free Guidance code, what is the output when <code>guidance_scale = 1.0</code>?</p>

<pre><code class="language-python">
def cfg_predict(model, x_t, t, text_emb, guidance_scale):
    noise_cond = model(x_t, t, text_emb)
    noise_uncond = model(x_t, t, null_emb)
    return noise_uncond + guidance_scale * (noise_cond - noise_uncond)
</code></pre>

<ul>
<li>A) Pure unconditional generation (ignores text prompt)</li>
<li>B) Standard conditional generation (equivalent to no CFG)</li>
<li>C) Double-strength guidance toward text prompt</li>
<li>D) The function will raise an error</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>B</strong> ✓</p>
<p><em>Khi $s=1.0$: $\epsilon_{uncond} + 1.0 \times (\epsilon_{cond} - \epsilon_{uncond}) = \epsilon_{cond}$. Đây chính là output conditional bình thường, không có guidance amplification. $s=0$ → pure unconditional (A). $s>1$ (e.g., 7.5) → amplified guidance. $s=2$ → double strength (C).</em></p>
</details>

<p><strong>Q3 🟡 (Medium):</strong> A U-Net architecture used in diffusion models has an encoder path and a decoder path. What is the PRIMARY purpose of skip connections between corresponding encoder and decoder layers?</p>

<ul>
<li>A) To reduce the total number of parameters in the model</li>
<li>B) To preserve fine-grained spatial details that may be lost during downsampling</li>
<li>C) To implement the noise schedule during the forward process</li>
<li>D) To enable text-conditional generation through cross-attention</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>B</strong> ✓</p>
<p><em>Skip connections nối encoder layer (high resolution) với decoder layer tương ứng, giúp decoder recover spatial details bị mất khi downsampling. Cross-attention (D) là mechanism riêng cho text conditioning. Skip connections không giảm params (A) hay implement noise schedule (C).</em></p>
</details>

<p><strong>Q4 🔴 (Hard):</strong> A team uses CLIP to encode both text and images into a shared embedding space. The CLIP loss function during training is:</p>

<pre><code class="language-python">
# Simplified CLIP contrastive loss
logits = (image_embeds @ text_embeds.T) * temperature
labels = torch.arange(len(logits))
loss_i2t = F.cross_entropy(logits, labels)
loss_t2i = F.cross_entropy(logits.T, labels)
loss = (loss_i2t + loss_t2i) / 2
</code></pre>

<p>What is the purpose of computing BOTH <code>loss_i2t</code> AND <code>loss_t2i</code>?</p>

<ul>
<li>A) To ensure the model learns both image generation and text generation</li>
<li>B) To make the alignment symmetric — image→text matching AND text→image matching</li>
<li>C) To implement data augmentation by swapping modalities</li>
<li>D) To handle cases where batch sizes differ between images and text</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>B</strong> ✓</p>
<p><em>CLIP dùng symmetric contrastive loss: loss_i2t đảm bảo mỗi image match đúng text (image→text), loss_t2i đảm bảo mỗi text match đúng image (text→image). Hai chiều này cần thiết vì similarity matrix không nhất thiết symmetric về gradient flow. CLIP không generate image hay text (A), không augment (C), batch size luôn bằng nhau (D).</em></p>
</details>

<h3 id="9-rag">RAG &amp; LLM Applications (Q5–Q8)</h3>

<p><strong>Q5 🟢 (Easy):</strong> In a RAG pipeline, documents are split into chunks before embedding. A team processes legal contracts with complex cross-references between sections. Which chunking strategy is MOST appropriate?</p>

<ul>
<li>A) Fixed-size chunks of 100 tokens with no overlap</li>
<li>B) Sentence-level splitting</li>
<li>C) Recursive character splitting with 512 tokens and 50 token overlap</li>
<li>D) Single chunk per document (no splitting)</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>C</strong> ✓</p>
<p><em>Legal contracts có cross-references nên cần overlap để không mất context tại boundary. Fixed 100 tokens quá nhỏ, không đủ context (A). Sentence-level quá nhỏ cho legal documents (B). Single chunk quá lớn, vượt context window và embedding model limit (D). Recursive splitting 512 + overlap 50 giữ semantic coherence.</em></p>
</details>

<p><strong>Q6 🟡 (Medium):</strong> A RAG system retrieves the following top-3 chunks for the query "What is the treatment for Type 2 diabetes?":</p>

<pre><code class="language-text">
Chunk 1: "Metformin is the first-line treatment for Type 2 diabetes..."
Chunk 2: "Type 1 diabetes requires insulin injections from diagnosis..."
Chunk 3: "Lifestyle modifications including diet and exercise are recommended
          alongside pharmacological treatment for Type 2 diabetes..."
</code></pre>

<p>Which RAG evaluation metric would BEST detect that Chunk 2 is irrelevant?</p>

<ul>
<li>A) Answer F1 score</li>
<li>B) Context Relevance (measures if retrieved chunks are relevant to query)</li>
<li>C) Faithfulness (measures if answer is grounded in context)</li>
<li>D) BLEU score between query and chunks</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>B</strong> ✓</p>
<p><em>Context Relevance đo xem retrieved chunks có thực sự liên quan đến query không — sẽ phát hiện Chunk 2 nói về Type 1 (không phải Type 2). Faithfulness đo answer vs context (C). Answer F1 đo final answer vs ground truth (A). BLEU cho keyword overlap quá nông (D).</em></p>
</details>

<p><strong>Q7 🟡 (Medium):</strong> A developer builds a LangChain chain with the following LCEL expression:</p>

<pre><code class="language-python">
chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt_template
    | llm
    | StrOutputParser()
)
result = chain.invoke("What is LoRA?")
</code></pre>

<p>What does <code>RunnablePassthrough()</code> do in this chain?</p>

<ul>
<li>A) It passes the input unchanged to the "question" key in the dictionary</li>
<li>B) It skips the retriever step and goes directly to the LLM</li>
<li>C) It caches the input for later use in the chain</li>
<li>D) It converts the input to embeddings for semantic search</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>A</strong> ✓</p>
<p><em>RunnablePassthrough() nhận input ("What is LoRA?") và truyền nguyên vẹn sang key "question". Trong khi đó, "context" key chạy retriever trên cùng input. Kết quả: prompt_template nhận dict {"context": retrieved_docs, "question": "What is LoRA?"}. Không skip steps (B), không cache (C), không embed (D).</em></p>
</details>

<p><strong>Q8 🔴 (Hard):</strong> NeMo Guardrails is used to prevent a customer service chatbot from discussing competitors. The following Colang config is provided:</p>

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

<p>A user writes: "I heard CompetitorY has faster delivery. Can you match that?" The guardrail does NOT trigger. Which is the MOST likely reason?</p>

<ul>
<li>A) The Colang flow syntax has an error</li>
<li>B) The canonical examples don't cover "delivery comparison" intent — only direct product comparison</li>
<li>C) NeMo Guardrails cannot detect entity names in user messages</li>
<li>D) The bot response needs to be defined before the flow</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>B</strong> ✓</p>
<p><em>NeMo Guardrails dùng canonical examples để match user intent. Các examples chỉ cover "compare products" và "opinion about competitor" — không có example về "delivery comparison". Cần thêm example như "Does CompetitorY deliver faster?" để cover intent này. Colang syntax đúng (A sai), NeMo Guardrails detect entities fine (C sai), order định nghĩa không ảnh hưởng (D sai).</em></p>
</details>

<h3 id="9-agentic">Agentic AI (Q9–Q11)</h3>

<p><strong>Q9 🟢 (Easy):</strong> In LangGraph, what is a <strong>State</strong> object used for?</p>

<ul>
<li>A) To store LLM model weights during inference</li>
<li>B) To maintain shared data (messages, context) that flows between graph nodes</li>
<li>C) To define the visual layout of the graph</li>
<li>D) To configure the LLM temperature and top-p parameters</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>B</strong> ✓</p>
<p><em>State trong LangGraph là TypedDict hoặc Pydantic model chứa shared data (messages, intermediate results, flags) được truyền giữa các nodes. Mỗi node nhận State, xử lý, và return updated State. Không liên quan đến model weights (A), layout (C), hay LLM config (D).</em></p>
</details>

<p><strong>Q10 🟡 (Medium):</strong> A team builds a multi-agent system where a "Manager" agent delegates tasks to "Researcher" and "Writer" sub-agents. The Manager decides which sub-agent to call based on the current state. This is an example of which pattern?</p>

<ul>
<li>A) Swarm pattern</li>
<li>B) Hierarchical / Supervisor pattern</li>
<li>C) Peer-to-peer pattern</li>
<li>D) Pipeline pattern</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>B</strong> ✓</p>
<p><em>Manager → sub-agents là classic Supervisor/Hierarchical pattern: 1 central agent làm router/orchestrator. Swarm (A) = agents tự coordinate không có leader. Peer-to-peer (C) = agents ngang hàng communicate trực tiếp. Pipeline (D) = fixed sequential flow.</em></p>
</details>

<p><strong>Q11 🔴 (Hard):</strong> The following LangGraph code defines an agent with tool calling. What happens if the <code>should_continue</code> function always returns <code>"continue"</code>?</p>

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
<li>A) The graph executes once and exits cleanly</li>
<li>B) The graph enters an infinite loop between "agent" and "tools" nodes</li>
<li>C) The graph raises a compilation error</li>
<li>D) The "tools" node handles the termination</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>B</strong> ✓</p>
<p><em>Nếu should_continue luôn trả "continue": agent → tools → agent → tools → ... không bao giờ đến END. Đây là lý do production agents cần recursion_limit (mặc định 25 trong LangGraph) hoặc explicit termination condition. Graph compile thành công (C sai), nhưng runtime bị infinite loop.</em></p>
</details>

<h3 id="9-eval-ft">Evaluation &amp; Fine-tuning (Q12–Q15)</h3>

<p><strong>Q12 🟢 (Easy):</strong> Which of the following is a recall-oriented metric commonly used for evaluating text summarization?</p>

<ul>
<li>A) BLEU</li>
<li>B) ROUGE</li>
<li>C) Perplexity</li>
<li>D) pass@k</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>B</strong> ✓</p>
<p><em>ROUGE (Recall-Oriented Understudy for Gisting Evaluation) — tên đã nói rõ: recall-oriented, thiết kế cho summarization. BLEU là precision-oriented cho translation (A). Perplexity đo language model quality (C). pass@k cho code generation (D).</em></p>
</details>

<p><strong>Q13 🟡 (Medium):</strong> In LoRA fine-tuning, matrices $B \in \mathbb{R}^{d \times r}$ and $A \in \mathbb{R}^{r \times k}$ are learned. How is matrix $B$ initialized and WHY?</p>

<ul>
<li>A) Random initialization — to break symmetry between neurons</li>
<li>B) Identity matrix — to preserve the original model behavior</li>
<li>C) Zeros — so that $\Delta W = BA = 0$ at training start, preserving pretrained weights</li>
<li>D) Xavier initialization — to maintain gradient flow</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>C</strong> ✓</p>
<p><em>$B$ initialized = zeros, $A$ initialized = random (Kaiming). Khi training bắt đầu: $\Delta W = BA = 0 \cdot A = 0$, nên $W' = W + 0 = W$ (pretrained weights). Model bắt đầu train từ chính xác pretrained performance, không bị disrupted. Đây là design decision quan trọng của LoRA paper.</em></p>
</details>

<p><strong>Q14 🟡 (Medium):</strong> A company fine-tunes Llama-3-70B for legal document analysis. They have a single NVIDIA A100 80GB GPU. Which approach can they use?</p>

<ul>
<li>A) Full fine-tuning with gradient checkpointing</li>
<li>B) Standard LoRA with FP16 base model</li>
<li>C) QLoRA with 4-bit NF4 quantization</li>
<li>D) Both B and C will work on a single A100 80GB</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>C</strong> ✓</p>
<p><em>Llama-3-70B FP16 = ~140GB cho weights alone → A100 80GB không đủ cho full FT (A sai) hay LoRA FP16 (B sai, cần ~160GB). QLoRA 4-bit: ~35GB cho weights + optimizer → vừa đủ A100 80GB. D sai vì B không fit.</em></p>
</details>

<p><strong>Q15 🔴 (Hard):</strong> A data scientist runs NeMo Evaluator to compare a base model and a LoRA fine-tuned model on a legal QA dataset. Results:</p>

<table>
<thead>
<tr><th>Model</th><th>BLEU</th><th>ROUGE-L</th><th>F1</th><th>Judge Correctness (1-5)</th><th>Latency p95</th></tr>
</thead>
<tbody>
<tr><td>Base Llama-3-8B</td><td>0.18</td><td>0.35</td><td>0.52</td><td>3.1</td><td>1.2s</td></tr>
<tr><td>LoRA (r=16)</td><td>0.29</td><td>0.48</td><td>0.71</td><td>4.2</td><td>1.3s</td></tr>
</tbody>
</table>

<p>The team decides to deploy the LoRA model. Which statement BEST justifies this decision?</p>

<ul>
<li>A) BLEU improved by 61%, which is the most important metric for QA</li>
<li>B) All metrics improved significantly with minimal latency increase, and LLM-judge correctness rose from 3.1 to 4.2 (35% improvement)</li>
<li>C) The latency increase from 1.2s to 1.3s is negligible, which is the primary concern</li>
<li>D) ROUGE-L improved from 0.35 to 0.48, indicating the model generates better summaries</li>
</ul>

<details><summary>Đáp án &amp; Giải thích</summary>
<p><strong>B</strong> ✓</p>
<p><em>Quyết định deploy dựa trên holistic improvement: F1 (primary cho QA) tăng mạnh 0.52→0.71, judge correctness (closest to human eval) tăng 3.1→4.2, latency gần như không đổi. A sai vì BLEU không phải primary metric cho QA. C đúng nhưng không "justify" — latency chỉ là 1 factor. D nhầm: ROUGE cho summarization, đây là QA task.</em></p>
</details>

<h2 id="10-tong-ket-next-steps">10. Tổng kết Series &amp; Next Steps</h2>

<h3 id="10-1-hanh-trinh-10-bai">10.1. Hành trình 10 bài học</h3>

<p>Chúc mừng bạn đã hoàn thành series <strong>"Luyện thi NVIDIA DLI — Generative AI with Diffusion Models &amp; LLMs"</strong>! Hãy điểm lại những gì đã học:</p>

<table>
<thead>
<tr><th>Bài</th><th>Chủ đề</th><th>Key Takeaway</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>Generative AI Overview</td><td>Taxonomy: VAE → GAN → Diffusion → Transformer LLM</td></tr>
<tr><td>2</td><td>Diffusion Models &amp; DDPM</td><td>Forward noise + Reverse denoise, U-Net predicts $\epsilon$</td></tr>
<tr><td>3</td><td>Stable Diffusion &amp; CLIP</td><td>Latent space diffusion, text conditioning via cross-attention</td></tr>
<tr><td>4</td><td>LLM Foundations</td><td>Transformer attention, tokenization, generation strategies</td></tr>
<tr><td>5</td><td>Prompt Engineering</td><td>Zero/few-shot, CoT, structured output, system prompts</td></tr>
<tr><td>6</td><td>RAG Pipeline</td><td>Chunking → Embedding → Vector DB → Retrieval → Generation</td></tr>
<tr><td>7</td><td>LangChain &amp; NIM</td><td>LCEL chains, NIM deployment, guardrails</td></tr>
<tr><td>8</td><td>Tool Calling &amp; Structured Output</td><td>Function calling, Pydantic schemas, ReAct loop</td></tr>
<tr><td>9</td><td>Agentic AI &amp; Multi-Agent</td><td>LangGraph, supervisor pattern, state machines</td></tr>
<tr><td>10</td><td>Evaluation &amp; LoRA Fine-tuning</td><td>BLEU/ROUGE/F1, LLM-as-Judge, LoRA/QLoRA, NeMo</td></tr>
</tbody>
</table>

<h3 id="10-2-course-order">10.2. Recommended DLI Course Order</h3>

<p>Để lấy certification, hoàn thành các DLI courses theo thứ tự sau:</p>

<ol>
<li><strong>Generative AI with Diffusion Models</strong> (S-FX-14) — diffusion theory + coding lab</li>
<li><strong>Building RAG Agents with LLMs</strong> (S-FX-15) — RAG pipeline + LangChain + NIM</li>
<li><strong>Build an AI Agent Reasoning App</strong> (S-FX-34) — agentic AI + LangGraph</li>
<li><strong>GenAI and LLM Customization and Evaluation</strong> (C-FX-25) — LoRA, QLoRA, NeMo Evaluator</li>
</ol>

<p>Mỗi course có assessment riêng. Hoàn thành cả 4 → đạt <strong>NVIDIA DLI Generative AI Certificate</strong>.</p>

<h3 id="10-3-tips-after-cert">10.3. Tips cho Continuing Learning</h3>

<ul>
<li><strong>Practice trên Kaggle / HuggingFace</strong> — fine-tune models thật trên dataset thật</li>
<li><strong>Đọc papers</strong> — LoRA, QLoRA, RAG, DDPM papers đều accessible và chuẩn bị tốt cho assessment</li>
<li><strong>Build projects</strong> — RAG chatbot, multi-agent system, custom fine-tuned model cho domain cụ thể</li>
<li><strong>Join community</strong> — NVIDIA Developer Forums, HuggingFace Discord, LangChain Discord</li>
<li><strong>Stay updated</strong> — AI thay đổi rất nhanh, theo dõi NVIDIA Blog, arXiv daily papers</li>
</ul>

<blockquote><p><strong>Final tip:</strong> Khi thi, nhớ rằng DLI assessments thiên về <strong>practical application</strong> hơn là theory thuần túy. Nếu bạn hiểu code và có thể implement từ scratch (như các ví dụ trong series này), bạn sẽ pass. Chúc bạn thi tốt! 🎯</p></blockquote>
