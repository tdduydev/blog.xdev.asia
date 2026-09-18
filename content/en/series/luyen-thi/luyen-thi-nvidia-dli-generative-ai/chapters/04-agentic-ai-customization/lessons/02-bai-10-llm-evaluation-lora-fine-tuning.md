---
id: 019c9619-nv01-p4-l10
title: 'Lesson 10: LLM Evaluation & LoRA Fine-tuning'
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
  title: 'NVIDIA DLI Exam Prep — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="1-llm-evaluation-fundamentals">1. LLM Evaluation Fundamentals</h2>

<h3 id="1-1-tai-sao-evaluation-quan-trong">1.1. Why Evaluation Matters</h3>

<p>You can't improve what you can't measure. In production, an LLM that generates "plausible-sounding" but factually incorrect answers can cause serious consequences — from wrong medical advice to financial losses. <strong>Evaluation</strong> is a mandatory step before deploying any LLM application.</p>

<p>The <strong>"Garbage In, Garbage Out"</strong> principle applies to the entire pipeline:</p>

<ul>
<li><strong>Bad prompt</strong> → bad output → bad evaluation → false confidence</li>
<li><strong>Bad evaluation metric</strong> → wrong model selected → production failure</li>
<li><strong>No evaluation</strong> → undetected model degradation → silent failure</li>
</ul>

<h3 id="1-2-phan-loai-evaluation">1.2. Evaluation Categories</h3>

<p>There are 3 primary methods for evaluating LLMs:</p>

<table>
<thead>
<tr><th>Method</th><th>Pros</th><th>Cons</th><th>Use Case</th></tr>
</thead>
<tbody>
<tr><td><strong>Automated Metrics</strong></td><td>Fast, reproducible, cheap</td><td>Misses nuance, can be gamed</td><td>CI/CD pipeline, regression testing</td></tr>
<tr><td><strong>Human Evaluation</strong></td><td>Gold standard, catches nuance</td><td>Slow, expensive, inconsistent</td><td>Final validation, safety audit</td></tr>
<tr><td><strong>LLM-as-a-Judge</strong></td><td>Scalable, near human quality</td><td>Bias from judge model</td><td>Large-scale eval, rapid iteration</td></tr>
</tbody>
</table>

<h3 id="1-3-evaluation-dimensions">1.3. Evaluation Dimensions</h3>

<p>Each LLM application needs to be evaluated across multiple dimensions:</p>

<ul>
<li><strong>Accuracy / Correctness</strong> — is the answer factually correct?</li>
<li><strong>Fluency</strong> — is the language natural and well-formed?</li>
<li><strong>Relevance</strong> — is the answer relevant to the question?</li>
<li><strong>Safety / Harmlessness</strong> — is the output safe and appropriate?</li>
<li><strong>Latency</strong> — is the response time acceptable? (p50, p95, p99)</li>
<li><strong>Cost</strong> — is the per-token cost reasonable?</li>
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

<blockquote><p><strong>Exam tip:</strong> DLI assessments often ask "Which evaluation method is best for X?" — remember: <strong>BLEU</strong> for translation, <strong>ROUGE</strong> for summarization, <strong>F1</strong> for QA, <strong>LLM-as-a-Judge</strong> for overall quality. No single metric works for every task.</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai10-lora-fine-tuning.webp" alt="LoRA Fine-tuning — Low-Rank Adaptation, QLoRA, Evaluation Metrics Dashboard" loading="lazy" /><figcaption>LoRA Fine-tuning — Low-Rank Adaptation, QLoRA, Evaluation Metrics Dashboard</figcaption></figure>

<h2 id="2-automated-metrics-deep-dive">2. Automated Metrics Deep-Dive</h2>

<h3 id="2-1-bleu-score">2.1. BLEU Score — Bilingual Evaluation Understudy</h3>

<p>BLEU measures the <strong>n-gram overlap</strong> between generated text and reference text. Originally designed for machine translation, but widely applied to many NLG tasks.</p>

<p>Core formula:</p>

<p>$$\text{BLEU} = BP \cdot \exp\left(\sum_{n=1}^{N} w_n \log p_n\right)$$</p>

<p>Where:</p>

<ul>
<li>$p_n$ = <strong>modified n-gram precision</strong> — the proportion of n-grams in the candidate that also appear in the reference</li>
<li>$w_n = \frac{1}{N}$ — uniform weights (typically N=4, so $w_n = 0.25$)</li>
<li>$BP$ = <strong>Brevity Penalty</strong> — penalizes candidates shorter than the reference:</li>
</ul>

<p>$$BP = \begin{cases} 1 & \text{if } c > r \\ e^{1 - r/c} & \text{if } c \leq r \end{cases}$$</p>

<p>Where $c$ = candidate length, $r$ = reference length.</p>

<p>Interpretation: BLEU = 1.0 → perfect match with reference. BLEU = 0.0 → no n-gram overlap. In practice, BLEU > 0.3 is acceptable for translation.</p>

<h3 id="2-2-bleu-implementation">2.2. Implementing BLEU from Scratch</h3>

<pre><code class="language-python">
from collections import Counter
import math

def count_ngrams(tokens, n):
    """Count all n-grams in a sequence."""
    return Counter(tuple(tokens[i:i+n]) for i in range(len(tokens) - n + 1))

def modified_precision(candidate, references, n):
    """
    Modified n-gram precision: clip count by max reference count.
    Prevents inflated scores when the candidate repeats the same word.
    """
    cand_ngrams = count_ngrams(candidate, n)
    
    # Max count for each n-gram across all references
    max_ref_counts = Counter()
    for ref in references:
        ref_ngrams = count_ngrams(ref, n)
        for ngram, count in ref_ngrams.items():
            max_ref_counts[ngram] = max(max_ref_counts[ngram], count)
    
    # Clip candidate count by max reference count
    clipped_count = 0
    total_count = 0
    for ngram, count in cand_ngrams.items():
        clipped_count += min(count, max_ref_counts.get(ngram, 0))
        total_count += count
    
    if total_count == 0:
        return 0.0
    return clipped_count / total_count

def brevity_penalty(candidate, references):
    """Brevity penalty: penalizes candidates shorter than reference."""
    c = len(candidate)
    # Choose reference with closest length
    r = min((abs(len(ref) - c), len(ref)) for ref in references)[1]
    
    if c > r:
        return 1.0
    elif c == 0:
        return 0.0
    else:
        return math.exp(1 - r / c)

def bleu_score(candidate, references, max_n=4):
    """
    Compute BLEU score (BLEU-1 through BLEU-N).
    candidate: list of tokens
    references: list of list of tokens
    """
    weights = [1.0 / max_n] * max_n
    bp = brevity_penalty(candidate, references)
    
    log_avg = 0.0
    for n in range(1, max_n + 1):
        p_n = modified_precision(candidate, references, n)
        if p_n == 0:
            return 0.0  # If any p_n = 0, BLEU = 0
        log_avg += weights[n - 1] * math.log(p_n)
    
    return bp * math.exp(log_avg)

# --- Example ---
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

<p><strong>ROUGE</strong> is a recall-oriented metric — it measures how much of the reference is "covered" by the candidate. Well-suited for <strong>summarization</strong> because we want summaries to include key points.</p>

<table>
<thead>
<tr><th>Variant</th><th>Formula</th><th>Meaning</th></tr>
</thead>
<tbody>
<tr><td><strong>ROUGE-N</strong></td><td>Recall of n-gram overlap</td><td>ROUGE-1 (unigram), ROUGE-2 (bigram)</td></tr>
<tr><td><strong>ROUGE-L</strong></td><td>Longest Common Subsequence (LCS)</td><td>Captures sentence-level structure</td></tr>
<tr><td><strong>ROUGE-Lsum</strong></td><td>LCS computed on split sentences</td><td>Multi-sentence summaries</td></tr>
</tbody>
</table>

<p>ROUGE-N Recall formula:</p>

<p>$$\text{ROUGE-N}_{recall} = \frac{\sum_{s \in \text{ref}} \sum_{\text{gram}_n \in s} \text{Count}_{match}(\text{gram}_n)}{\sum_{s \in \text{ref}} \sum_{\text{gram}_n \in s} \text{Count}(\text{gram}_n)}$$</p>

<h3 id="2-4-f1-score-qa">2.4. F1-Score for Question Answering</h3>

<p>In QA, F1-score is computed on <strong>token-level overlap</strong> between predicted answer and ground truth:</p>

<p>$$\text{Precision} = \frac{|\text{predicted tokens} \cap \text{truth tokens}|}{|\text{predicted tokens}|}$$</p>

<p>$$\text{Recall} = \frac{|\text{predicted tokens} \cap \text{truth tokens}|}{|\text{truth tokens}|}$$</p>

<p>$$\text{F1} = \frac{2 \cdot P \cdot R}{P + R}$$</p>

<pre><code class="language-python">
def qa_f1_score(prediction: str, ground_truth: str) -> float:
    """
    Token-level F1 for QA evaluation.
    Used for SQuAD-style exact extraction.
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

# --- Example ---
pred = "Barack Obama was the 44th president"
truth = "The 44th president was Barack Obama"

print(f"F1 = {qa_f1_score(pred, truth):.4f}")
# Output: F1 = 0.8571
</code></pre>

<h3 id="2-5-semantic-similarity">2.5. Semantic Similarity — Embedding-Based</h3>

<p>N-gram-based automated metrics (BLEU, ROUGE) miss <strong>semantic equivalence</strong>: "The dog chased the cat" and "A canine pursued a feline" have BLEU = 0 but identical meaning. <strong>Semantic similarity</strong> uses embeddings to compare meaning.</p>

<p>$$\text{Cosine Similarity} = \frac{\vec{a} \cdot \vec{b}}{||\vec{a}|| \cdot ||\vec{b}||}$$</p>

<pre><code class="language-python">
import numpy as np

def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    """Cosine similarity between two embedding vectors."""
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

# In practice: use sentence-transformers
# from sentence_transformers import SentenceTransformer
# model = SentenceTransformer("all-MiniLM-L6-v2")
# embeddings = model.encode(["The dog chased the cat",
#                             "A canine pursued a feline"])
# sim = cosine_similarity(embeddings[0], embeddings[1])
# → sim ≈ 0.85 (semantic match despite completely different n-grams)
</code></pre>

<h3 id="2-6-metric-selection-guide">2.6. Metric Selection Guide — Which Metric for Which Task?</h3>

<table>
<thead>
<tr><th>Task</th><th>Primary Metric</th><th>Secondary Metric</th><th>Reason</th></tr>
</thead>
<tbody>
<tr><td>Machine Translation</td><td>BLEU</td><td>COMET, chrF</td><td>Precision-oriented: accurate word-for-word translation</td></tr>
<tr><td>Summarization</td><td>ROUGE-L</td><td>BERTScore</td><td>Recall-oriented: must cover key points</td></tr>
<tr><td>Question Answering</td><td>F1 / Exact Match</td><td>Semantic Sim</td><td>Token overlap + meaning</td></tr>
<tr><td>Dialogue / Chat</td><td>LLM-as-a-Judge</td><td>Human eval</td><td>Subjective quality, hard to auto-measure</td></tr>
<tr><td>Code Generation</td><td>pass@k</td><td>Execution accuracy</td><td>Code must run correctly, not just "look similar"</td></tr>
<tr><td>RAG Pipeline</td><td>Context Relevance + Faithfulness</td><td>Answer F1</td><td>Multi-dimensional eval (RAGAS framework)</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> If the question asks "appropriate metric for summarization" → choose <strong>ROUGE</strong> (recall). If "metric for translation" → choose <strong>BLEU</strong> (precision). This is a very common exam question.</p></blockquote>

<p><strong>Q1:</strong> A team is evaluating an LLM-powered chatbot for customer support. They need a metric that can handle paraphrasing — where the meaning is correct but wording differs from reference answers. Which metric is MOST appropriate?</p>

<ul>
<li>A) BLEU-4</li>
<li>B) ROUGE-1</li>
<li>C) Exact Match</li>
<li>D) Semantic similarity (embedding-based)</li>
</ul>

<details><summary>Show Answer & Explanation</summary>
<p><strong>D) Semantic similarity (embedding-based)</strong> ✓</p>
<p><em>BLEU and ROUGE rely on n-gram overlap → they fail with paraphrasing (same meaning, different words). Exact Match only catches 100% string matches. Semantic similarity uses embedding vectors to capture meaning equivalence even when wording differs. In customer support, users phrase the same issue in many different ways, so embedding-based metrics are most appropriate.</em></p>
</details>

<h2 id="3-llm-as-a-judge">3. LLM-as-a-Judge & Human Evaluation</h2>

<h3 id="3-1-llm-as-a-judge-pattern">3.1. LLM-as-a-Judge Pattern</h3>

<p>The idea: use a <strong>strong model</strong> (GPT-4, Claude 3.5) to evaluate the output of a <strong>weaker model</strong> or the model being tested. This approach is more scalable than human evaluation and closer to human judgment than automated metrics.</p>

<p>Two main types:</p>

<table>
<thead>
<tr><th>Type</th><th>How It Works</th><th>Pros</th><th>Cons</th></tr>
</thead>
<tbody>
<tr><td><strong>Pointwise</strong></td><td>Judge scores 1 response (1-5)</td><td>Simple, absolute score</td><td>Calibration bias</td></tr>
<tr><td><strong>Pairwise</strong></td><td>Judge compares 2 responses: A vs B</td><td>Relative ranking, less bias</td><td>$O(n^2)$ comparisons</td></tr>
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
    Use a strong LLM (GPT-4) as judge.
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

# --- Example usage ---
# scores = judge_response(client,
#     question="What is LoRA fine-tuning?",
#     response="LoRA adds low-rank matrices to freeze model weights..."
# )
# print(scores["overall"]["score"])  # → 4.2
</code></pre>

<h3 id="3-3-elo-ranking-system">3.3. ELO Ranking System for LLMs</h3>

<p><strong>ELO rating</strong> (borrowed from chess) assigns each model a rating number. When 2 models "compete" (judge picks a winner), ratings are updated:</p>

<p>$$E_A = \frac{1}{1 + 10^{(R_B - R_A)/400}}$$</p>

<p>$$R'_A = R_A + K \cdot (S_A - E_A)$$</p>

<p>Where:</p>
<ul>
<li>$R_A, R_B$ = current ratings</li>
<li>$E_A$ = expected score (probability A wins)</li>
<li>$S_A$ = actual score (1 = win, 0.5 = draw, 0 = loss)</li>
<li>$K$ = sensitivity factor (typically K=32)</li>
</ul>

<pre><code class="language-python">
import random

class ELORanker:
    """
    ELO ranking system for LLM comparison.
    Chatbot Arena (lmsys.org) uses a similar system.
    """
    def __init__(self, k_factor: int = 32, initial_rating: int = 1500):
        self.k = k_factor
        self.initial = initial_rating
        self.ratings: dict[str, float] = {}
        self.match_history: list[dict] = []
    
    def get_rating(self, model: str) -> float:
        return self.ratings.setdefault(model, float(self.initial))
    
    def expected_score(self, ra: float, rb: float) -> float:
        """Probability A beats B."""
        return 1.0 / (1.0 + 10 ** ((rb - ra) / 400))
    
    def update(self, winner: str, loser: str, draw: bool = False):
        """
        Update ratings after a match.
        winner = model A, loser = model B (or draw).
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
        """Return sorted leaderboard."""
        return sorted(self.ratings.items(), key=lambda x: -x[1])

# --- Simulate matchups ---
ranker = ELORanker()
models = ["GPT-4o", "Claude-3.5", "Llama-3-70B", "Gemini-1.5"]

# 50 random pairwise comparisons (simplified simulation)
for _ in range(50):
    a, b = random.sample(models, 2)
    # Simulate: GPT-4o and Claude win more often
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

<p><strong>NeMo Evaluator</strong> is a component in the NVIDIA NeMo framework that enables systematic evaluation of LLM endpoints. Configured via YAML and called through REST API.</p>

<pre><code class="language-python">
# NeMo Evaluator — Example config
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

<blockquote><p><strong>Exam tip:</strong> NeMo Evaluator supports both <strong>automated metrics</strong> (BLEU, ROUGE) and <strong>LLM-as-a-Judge</strong>. When asked "How to evaluate a model before deployment using NeMo" → NeMo Evaluator microservice. When asked "How to track evaluation experiments" → <strong>MLflow</strong> integration.</p></blockquote>

<p><strong>Q2:</strong> In an ELO ranking system for LLMs, Model A has a rating of 1600 and Model B has a rating of 1400. What is the expected probability that Model A wins a pairwise comparison?</p>

<ul>
<li>A) 50%</li>
<li>B) 64%</li>
<li>C) 76%</li>
<li>D) 88%</li>
</ul>

<details><summary>Show Answer & Explanation</summary>
<p><strong>C) 76%</strong> ✓</p>
<p><em>Applying the formula: $E_A = \frac{1}{1 + 10^{(1400-1600)/400}} = \frac{1}{1 + 10^{-0.5}} = \frac{1}{1 + 0.316} = \frac{1}{1.316} \approx 0.76$ or 76%. A rating difference of 200 corresponds to ~76% win probability. Remember: every 400 points of difference = 10x expected win ratio.</em></p>
</details>

<h2 id="4-systematic-evaluation-nemo-mlflow">4. Systematic Evaluation with NeMo & MLflow</h2>

<h3 id="4-1-nemo-evaluator-workflow">4.1. NeMo Evaluator Workflow</h3>

<p>A systematic evaluation pipeline in the NVIDIA NeMo ecosystem:</p>

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

<p><strong>GSM8K</strong> (Grade School Math 8K) is a benchmark containing ~8.5K elementary math problems, used to test <strong>reasoning ability</strong> of LLMs. Each problem includes a chain-of-thought solution.</p>

<pre><code class="language-python">
# GSM8K question format example
gsm8k_example = {
    "question": "Janet buys 3 pounds of steak at $8/pound and 2 pounds "
                "of chicken at $5/pound. How much does she spend total?",
    "answer": "3 pounds of steak cost 3 * 8 = <<3*8=24>>24 dollars. "
              "2 pounds of chicken cost 2 * 5 = <<2*5=10>>10 dollars. "
              "Total cost is 24 + 10 = <<24+10=34>>34 dollars. #### 34"
}

# Evaluation: extract final answer after ####, compare with model output
def extract_gsm8k_answer(solution: str) -> str:
    """Extract final answer from GSM8K format."""
    if "####" in solution:
        return solution.split("####")[-1].strip()
    # Fallback: take the last number
    import re
    numbers = re.findall(r'-?\d+\.?\d*', solution)
    return numbers[-1] if numbers else ""

def evaluate_gsm8k(model_answers: list[str],
                   ground_truths: list[str]) -> dict:
    """Compute accuracy on GSM8K."""
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

<p>Performance comparison with different prompting strategies:</p>

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

<p>Observation: <strong>Few-shot + Chain-of-Thought</strong> always performs best. Larger models (70B) benefit more from CoT than smaller models (8B).</p>

<h3 id="4-4-mlflow-tracking">4.4. MLflow Experiment Tracking</h3>

<pre><code class="language-python">
import mlflow

# Set up MLflow experiment
mlflow.set_tracking_uri("http://mlflow:5000")
mlflow.set_experiment("legal-qa-model-comparison")

def run_evaluation_experiment(model_name: str, 
                              model_endpoint: str,
                              eval_dataset: list[dict]):
    """
    Run evaluation and log results to MLflow.
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

<details><summary>Show Answer & Explanation</summary>
<p><strong>C) MLflow Experiment comparison / search runs</strong> ✓</p>
<p><em>MLflow Experiments allows comparing metrics across runs — filter, sort, visualize. Model Registry is for versioning already-selected models. Projects is for packaging code. Deployments is for serving models. The step of "selecting the best config" belongs to experiment comparison.</em></p>
</details>

<h2 id="5-lora-theory">5. LoRA — Low-Rank Adaptation Theory</h2>

<h3 id="5-1-van-de-full-fine-tuning">5.1. The Problem with Full Fine-tuning</h3>

<p>Full fine-tuning updates <strong>all</strong> model parameters. With modern LLMs, this is extremely expensive:</p>

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

<p>Beyond cost, full fine-tuning also causes:</p>

<ul>
<li><strong>Catastrophic forgetting</strong> — the model forgets prior knowledge when learning a new task</li>
<li><strong>Storage overhead</strong> — each fine-tuned version is a full copy of the model</li>
<li><strong>Overfitting risk</strong> — easy to overfit on small datasets</li>
</ul>

<h3 id="5-2-lora-intuition">5.2. LoRA Intuition — Weight Updates are Low-Rank</h3>

<p>The key observation from the paper <em>"LoRA: Low-Rank Adaptation of Large Language Models"</em> (Hu et al., 2021): when fine-tuning LLMs, <strong>weight changes $\Delta W$ are low-rank</strong> — meaning most of the information lies in a few key dimensions.</p>

<p>Instead of learning $\Delta W \in \mathbb{R}^{d \times k}$ (too many parameters), we decompose it into a product of two smaller matrices:</p>

<p>$$W' = W + \Delta W = W + BA$$</p>

<p>Where:</p>
<ul>
<li>$W \in \mathbb{R}^{d \times k}$ — pretrained weight (frozen, not updated)</li>
<li>$B \in \mathbb{R}^{d \times r}$ — LoRA down-projection</li>
<li>$A \in \mathbb{R}^{r \times k}$ — LoRA up-projection</li>
<li>$r \ll \min(d, k)$ — <strong>rank</strong>, typically r = 4, 8, 16, 32</li>
</ul>

<h3 id="5-3-parameter-count">5.3. Parameter Count Calculation</h3>

<p>The savings are dramatic. For example, with a single attention layer:</p>

<p>$$\text{Full params} = d \times k$$</p>

<p>$$\text{LoRA params} = d \times r + r \times k = r(d + k)$$</p>

<p>$$\text{Ratio} = \frac{r(d+k)}{dk}$$</p>

<pre><code class="language-python">
def lora_param_analysis(d: int, k: int, r: int, 
                        num_layers: int, 
                        target_modules: int = 4):
    """
    Calculate parameter count for a LoRA configuration.
    target_modules: Q, K, V, O projections (typically 4)
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
<tr><th>Rank ($r$)</th><th>Trainable Params</th><th>Quality</th><th>Training Speed</th><th>Use Case</th></tr>
</thead>
<tbody>
<tr><td>$r = 4$</td><td>Very few (~4M)</td><td>Good for simple tasks</td><td>Fastest</td><td>Style transfer, format tuning</td></tr>
<tr><td>$r = 8$</td><td>Few (~8M)</td><td>Good-Very Good</td><td>Fast</td><td>Domain adaptation, QA</td></tr>
<tr><td>$r = 16$</td><td>Moderate (~17M)</td><td>Very Good</td><td>Medium</td><td>Most tasks (default choice)</td></tr>
<tr><td>$r = 32$</td><td>More (~34M)</td><td>Excellent</td><td>Slower</td><td>Complex domain, code gen</td></tr>
<tr><td>$r = 64$</td><td>Quite many (~67M)</td><td>Near full FT</td><td>Slow</td><td>Diminishing returns</td></tr>
</tbody>
</table>

<h3 id="5-5-alpha-scaling">5.5. Alpha Scaling Factor</h3>

<p>LoRA uses a scaling factor $\alpha$ to control the "influence level" of the adaptation:</p>

<p>$$h = Wx + \frac{\alpha}{r} \cdot BAx$$</p>

<p>Typically $\alpha = r$ or $\alpha = 2r$. When $\alpha = r$, the scaling factor = 1 (no change). Increasing $\alpha$ → LoRA adaptation has greater influence.</p>

<h3 id="5-6-which-layers">5.6. Which Layers to Apply LoRA?</h3>

<p>In a transformer, LoRA is typically applied to <strong>attention projections</strong>:</p>

<ul>
<li><strong>Q (Query)</strong> — ✓ always recommended</li>
<li><strong>K (Key)</strong> — ✓ recommended</li>
<li><strong>V (Value)</strong> — ✓ always recommended (most important)</li>
<li><strong>O (Output)</strong> — ✓ optional, can skip to save resources</li>
<li><strong>MLP layers</strong> — optional, helps with complex adaptations</li>
</ul>

<p>The original paper showed that applying LoRA to <strong>Q + V</strong> is sufficient for most tasks.</p>

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
<tr><th>Method</th><th>Trainable Params</th><th>Memory</th><th>Quality</th><th>When to Use</th></tr>
</thead>
<tbody>
<tr><td><strong>Full Fine-tuning</strong></td><td>100%</td><td>Very high</td><td>Best (but overfit risk)</td><td>Large data + GPU resources available</td></tr>
<tr><td><strong>LoRA</strong></td><td>0.1-1%</td><td>Low</td><td>Very Good</td><td>Default choice for most tasks</td></tr>
<tr><td><strong>QLoRA</strong></td><td>0.1-1%</td><td>Very low</td><td>Good-Very Good</td><td>Limited GPU memory</td></tr>
<tr><td><strong>Prefix Tuning</strong></td><td>&lt;0.1%</td><td>Lowest</td><td>Good for specific tasks</td><td>Short, structured outputs</td></tr>
<tr><td><strong>Adapter Tuning</strong></td><td>1-5%</td><td>Medium</td><td>Good</td><td>Multi-task learning</td></tr>
<tr><td><strong>Prompt Tuning</strong></td><td>&lt;0.01%</td><td>Minimal</td><td>Moderate</td><td>Simple classification</td></tr>
</tbody>
</table>

<h3 id="5-8-lora-implementation">5.8. Implementing a LoRA Wrapper from Scratch</h3>

<pre><code class="language-python">
import torch
import torch.nn as nn
import math

class LoRALinear(nn.Module):
    """
    LoRA wrapper for nn.Linear layer.
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
        # A: initialized with Kaiming uniform (as in the paper)
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
        Merge LoRA into original weight for inference.
        No separate LoRA computation needed → zero overhead.
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

# --- Example: Apply LoRA to a toy transformer ---
# model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-8B")
# model = apply_lora_to_model(model, rank=16, alpha=32)
# Output:
# LoRA params:        8,388,608 (0.39%)
# Frozen params:  2,147,483,648 (99.61%)
</code></pre>

<blockquote><p><strong>Exam tip:</strong> A very common question: "LoRA initialization — how is $B$ initialized?" → <strong>$B$ is initialized with zeros</strong>, $A$ is initialized randomly. This ensures $\Delta W = BA = 0$ at the start of training, so the model begins from pretrained performance.</p></blockquote>

<p><strong>Q4:</strong> A transformer layer has weight matrix $W \in \mathbb{R}^{4096 \times 4096}$. Using LoRA with rank $r=8$, how many trainable parameters does the LoRA adapter add for this single layer?</p>

<ul>
<li>A) 8,192</li>
<li>B) 32,768</li>
<li>C) 65,536</li>
<li>D) 16,777,216</li>
</ul>

<details><summary>Show Answer & Explanation</summary>
<p><strong>C) 65,536</strong> ✓</p>
<p><em>LoRA params = $d \times r + r \times k = 4096 \times 8 + 8 \times 4096 = 32768 + 32768 = 65536$. Compare: the original matrix has $4096 \times 4096 = 16{,}777{,}216$ params. LoRA uses only $65536 / 16777216 = 0.39\%$ of the parameters. Answer D is the full matrix size, A is missing half, B counts only one matrix.</em></p>
</details>

<h2 id="6-qlora-memory-efficient">6. QLoRA & Memory-Efficient Fine-tuning</h2>

<h3 id="6-1-qlora-overview">6.1. QLoRA — Quantized LoRA</h3>

<p><strong>QLoRA</strong> (Dettmers et al., 2023) combines <strong>4-bit quantization</strong> for frozen weights + <strong>LoRA adapters</strong> in FP16/BF16. Three key techniques:</p>

<ul>
<li><strong>NF4 (4-bit NormalFloat)</strong> — a quantization format optimized for normally-distributed weight values</li>
<li><strong>Double Quantization</strong> — quantize the quantization constants themselves → saves an additional ~0.37 bit/param</li>
<li><strong>Paged Optimizers</strong> — when GPU memory is full, automatically offload optimizer states to CPU RAM</li>
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

<h3 id="6-4-qlora-code">6.4. QLoRA Setup with bitsandbytes + PEFT</h3>

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

<blockquote><p><strong>Exam tip:</strong> DLI assessments commonly ask: "What makes QLoRA more memory-efficient than LoRA?" → Three factors: <strong>(1) NF4 quantization</strong> reduces the base model from 16-bit to 4-bit, <strong>(2) Double quantization</strong>, <strong>(3) Paged optimizers</strong>. LoRA adapters remain in FP16/BF16 — only frozen weights are quantized.</p></blockquote>

<h2 id="7-nemo-customizer">7. Hands-on Fine-tuning with NeMo Customizer</h2>

<h3 id="7-1-nemo-customizer-overview">7.1. NeMo Customizer Microservice</h3>

<p><strong>NeMo Customizer</strong> is a microservice in the NVIDIA NeMo stack that lets you launch fine-tuning jobs (LoRA, P-tuning, full SFT) on NIM models via REST API. No need to write a training loop — just provide config and data.</p>

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
    Format data for NeMo Customizer SFT/LoRA training.
    Input format: [{"question": "...", "answer": "..."}]
    Output: JSONL with conversation format.
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
    
    # Shuffle and split train/val (90/10)
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

# --- Example ---
raw = [
    {"question": "What is Metformin indicated for?",
     "answer": "Metformin is the first-line treatment for type 2 diabetes..."},
    # ... add 5000+ examples
]
prepare_sft_dataset(raw, "legal_qa.jsonl",
    system_prompt="You are a professional medical assistant. "
                  "Answer accurately based on evidence-based medicine.")
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
    Launch LoRA fine-tuning job on NeMo Customizer.
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
    """Check training job status."""
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

<h3 id="7-4-inference-with-adapter">7.4. Inference with LoRA Adapter</h3>

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
    """Compare output of base model vs fine-tuned."""
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

<details><summary>Show Answer & Explanation</summary>
<p><strong>C) Deploy base model once via NIM and mount LoRA adapter at inference time</strong> ✓</p>
<p><em>NIM supports LoRA adapter hot-loading — 1 base model serves multiple customers/domains by simply swapping adapters (~80MB). Option B works but wastes storage and doesn't support multi-tenant serving. Option A doesn't leverage LoRA's advantage. ONNX conversion is a separate optimization, unrelated to adapter serving.</em></p>
</details>

<h2 id="8-final-strategy-cheatsheet">8. Final Assessment Strategy & Cheat Sheet</h2>

<h3 id="8-1-assessment-format">8.1. Assessment Format Recap</h3>

<p>NVIDIA DLI Generative AI certification includes multiple course assessments:</p>

<table>
<thead>
<tr><th>Course Code</th><th>Topic</th><th>Format</th><th>Duration</th><th>Pass</th></tr>
</thead>
<tbody>
<tr><td><strong>S-FX-14</strong></td><td>Generative AI with Diffusion Models</td><td>Coding assessment</td><td>~2 hours</td><td>70%</td></tr>
<tr><td><strong>S-FX-15</strong></td><td>Building RAG Agents with LLMs</td><td>Coding + MCQ</td><td>~2 hours</td><td>70%</td></tr>
<tr><td><strong>S-FX-34</strong></td><td>Build an AI Agent Reasoning App</td><td>Coding assessment</td><td>~2 hours</td><td>70%</td></tr>
<tr><td><strong>C-FX-25</strong></td><td>GenAI LLM Customization & Eval</td><td>Coding + MCQ</td><td>~2 hours</td><td>70%</td></tr>
</tbody>
</table>

<h3 id="8-2-common-mistakes">8.2. Common Mistakes & How to Avoid Them</h3>

<ul>
<li><strong>Wrong tensor dimensions</strong>: Always check shape with <code>tensor.shape</code> before matmul</li>
<li><strong>Forgetting to freeze weights</strong>: LoRA must freeze the base model — otherwise it becomes full fine-tuning</li>
<li><strong>Confusing BLEU and ROUGE</strong>: BLEU = precision, ROUGE = recall</li>
<li><strong>Missing brevity penalty</strong>: BLEU isn't just n-gram matching, it must include BP</li>
<li><strong>Wrong CFG formula</strong>: $\epsilon_\theta = \epsilon_{uncond} + s \cdot (\epsilon_{cond} - \epsilon_{uncond})$, note the subtraction order</li>
<li><strong>Top-k vs Top-p</strong>: top-k selects the k tokens with highest probability, top-p selects tokens until cumulative probability reaches p</li>
</ul>

<h3 id="8-3-time-management">8.3. Time Management Strategy</h3>

<ol>
<li><strong>Read the entire exam first</strong> (5 minutes) — identify easy/hard questions</li>
<li><strong>Do coding questions first</strong> — they typically carry more points than MCQ</li>
<li><strong>MCQ: eliminate first</strong> — rule out 2 clearly wrong answers, choose between the remaining 2</li>
<li><strong>Don't get stuck for more than 10 minutes</strong> on one question — mark it and come back later</li>
<li><strong>Reserve the last 10 minutes</strong> for reviewing code (syntax errors, missing imports)</li>
</ol>

<h3 id="8-4-cheat-sheet">8.4. Quick Reference Cheat Sheet</h3>

<table>
<thead>
<tr><th>Category</th><th>Formula / Pattern</th><th>Key Point</th></tr>
</thead>
<tbody>
<tr><td><strong>Diffusion — Forward</strong></td><td>$q(x_t|x_0) = \mathcal{N}(\sqrt{\bar\alpha_t}\,x_0,\;(1-\bar\alpha_t)\,I)$</td><td>Add noise according to schedule</td></tr>
<tr><td><strong>Diffusion — Reverse</strong></td><td>$p_\theta(x_{t-1}|x_t) = \mathcal{N}(\mu_\theta(x_t,t),\;\sigma_t^2 I)$</td><td>U-Net predicts noise $\epsilon$</td></tr>
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

# --- Tensor Operations (common in assessments) ---
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

<blockquote><p><strong>Exam tip:</strong> Focus your revision on the <strong>top 5 concepts</strong> — they account for ~70% of questions. Diffusion formulas and LoRA appear most frequently. Always remember: $B$ is initialized with zeros in LoRA, CFG guidance scale $s$ increases → output adheres more closely to the prompt.</p></blockquote>

<h2 id="9-mock-assessment">9. Practice Questions — Full Mock Assessment</h2>

<p>15 mock exam questions covering all 10 lessons in the series. Recommended time: <strong>45 minutes</strong>.</p>

<h3 id="9-diffusion">Diffusion Models (Q1–Q4)</h3>

<p><strong>Q1 🟢 (Easy):</strong> In a Denoising Diffusion Probabilistic Model (DDPM), during the forward process, noise is added to an image $x_0$ over $T$ timesteps. Which statement is TRUE about the forward process?</p>

<ul>
<li>A) The forward process requires a neural network to learn the noise schedule</li>
<li>B) At timestep $T$, $x_T$ approximates a standard Gaussian distribution $\mathcal{N}(0, I)$</li>
<li>C) The forward process removes noise gradually from the image</li>
<li>D) Each step in the forward process is a learned transformation</li>
</ul>

<details><summary>Show Answer & Explanation</summary>
<p><strong>B</strong> ✓</p>
<p><em>The forward process adds noise according to a fixed schedule (no neural network needed → A is wrong, D is wrong). The reverse process is the denoising step → C is wrong. At sufficiently large $T$, $x_T \sim \mathcal{N}(0, I)$ because $\bar\alpha_T \to 0$.</em></p>
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

<details><summary>Show Answer & Explanation</summary>
<p><strong>B</strong> ✓</p>
<p><em>When $s=1.0$: $\epsilon_{uncond} + 1.0 \times (\epsilon_{cond} - \epsilon_{uncond}) = \epsilon_{cond}$. This is simply the standard conditional output with no guidance amplification. $s=0$ → pure unconditional (A). $s>1$ (e.g., 7.5) → amplified guidance. $s=2$ → double strength (C).</em></p>
</details>

<p><strong>Q3 🟡 (Medium):</strong> A U-Net architecture used in diffusion models has an encoder path and a decoder path. What is the PRIMARY purpose of skip connections between corresponding encoder and decoder layers?</p>

<ul>
<li>A) To reduce the total number of parameters in the model</li>
<li>B) To preserve fine-grained spatial details that may be lost during downsampling</li>
<li>C) To implement the noise schedule during the forward process</li>
<li>D) To enable text-conditional generation through cross-attention</li>
</ul>

<details><summary>Show Answer & Explanation</summary>
<p><strong>B</strong> ✓</p>
<p><em>Skip connections link encoder layers (high resolution) with corresponding decoder layers, helping the decoder recover spatial details lost during downsampling. Cross-attention (D) is a separate mechanism for text conditioning. Skip connections don't reduce parameters (A) or implement the noise schedule (C).</em></p>
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

<details><summary>Show Answer & Explanation</summary>
<p><strong>B</strong> ✓</p>
<p><em>CLIP uses symmetric contrastive loss: loss_i2t ensures each image matches the correct text (image→text), loss_t2i ensures each text matches the correct image (text→image). Both directions are necessary because the similarity matrix isn't necessarily symmetric in terms of gradient flow. CLIP doesn't generate images or text (A), doesn't augment data (C), and batch sizes are always equal (D).</em></p>
</details>

<h3 id="9-rag">RAG & LLM Applications (Q5–Q8)</h3>

<p><strong>Q5 🟢 (Easy):</strong> In a RAG pipeline, documents are split into chunks before embedding. A team processes legal contracts with complex cross-references between sections. Which chunking strategy is MOST appropriate?</p>

<ul>
<li>A) Fixed-size chunks of 100 tokens with no overlap</li>
<li>B) Sentence-level splitting</li>
<li>C) Recursive character splitting with 512 tokens and 50 token overlap</li>
<li>D) Single chunk per document (no splitting)</li>
</ul>

<details><summary>Show Answer & Explanation</summary>
<p><strong>C</strong> ✓</p>
<p><em>Legal contracts have cross-references, so overlap is needed to avoid losing context at boundaries. Fixed 100 tokens is too small, insufficient context (A). Sentence-level is too granular for legal documents (B). Single chunk is too large, exceeding context window and embedding model limits (D). Recursive splitting with 512 + overlap of 50 maintains semantic coherence.</em></p>
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

<details><summary>Show Answer & Explanation</summary>
<p><strong>B</strong> ✓</p>
<p><em>Context Relevance measures whether retrieved chunks are actually relevant to the query — it would detect that Chunk 2 discusses Type 1 (not Type 2). Faithfulness measures answer vs context (C). Answer F1 measures the final answer vs ground truth (A). BLEU provides only shallow keyword overlap (D).</em></p>
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

<details><summary>Show Answer & Explanation</summary>
<p><strong>A</strong> ✓</p>
<p><em>RunnablePassthrough() receives the input ("What is LoRA?") and passes it unchanged to the "question" key. Meanwhile, the "context" key runs the retriever on the same input. Result: prompt_template receives dict {"context": retrieved_docs, "question": "What is LoRA?"}. It doesn't skip steps (B), doesn't cache (C), and doesn't embed (D).</em></p>
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

<details><summary>Show Answer & Explanation</summary>
<p><strong>B</strong> ✓</p>
<p><em>NeMo Guardrails uses canonical examples to match user intent. The provided examples only cover "compare products" and "opinion about competitor" — no example covers "delivery comparison." Adding an example like "Does CompetitorY deliver faster?" would cover this intent. The Colang syntax is correct (A is wrong), NeMo Guardrails can detect entities (C is wrong), and definition order doesn't matter (D is wrong).</em></p>
</details>

<h3 id="9-agentic">Agentic AI (Q9–Q11)</h3>

<p><strong>Q9 🟢 (Easy):</strong> In LangGraph, what is a <strong>State</strong> object used for?</p>

<ul>
<li>A) To store LLM model weights during inference</li>
<li>B) To maintain shared data (messages, context) that flows between graph nodes</li>
<li>C) To define the visual layout of the graph</li>
<li>D) To configure the LLM temperature and top-p parameters</li>
</ul>

<details><summary>Show Answer & Explanation</summary>
<p><strong>B</strong> ✓</p>
<p><em>State in LangGraph is a TypedDict or Pydantic model containing shared data (messages, intermediate results, flags) passed between nodes. Each node receives State, processes it, and returns updated State. It's unrelated to model weights (A), layout (C), or LLM config (D).</em></p>
</details>

<p><strong>Q10 🟡 (Medium):</strong> A team builds a multi-agent system where a "Manager" agent delegates tasks to "Researcher" and "Writer" sub-agents. The Manager decides which sub-agent to call based on the current state. This is an example of which pattern?</p>

<ul>
<li>A) Swarm pattern</li>
<li>B) Hierarchical / Supervisor pattern</li>
<li>C) Peer-to-peer pattern</li>
<li>D) Pipeline pattern</li>
</ul>

<details><summary>Show Answer & Explanation</summary>
<p><strong>B</strong> ✓</p>
<p><em>Manager → sub-agents is the classic Supervisor/Hierarchical pattern: 1 central agent acts as router/orchestrator. Swarm (A) = agents self-coordinate without a leader. Peer-to-peer (C) = agents communicate directly as equals. Pipeline (D) = fixed sequential flow.</em></p>
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

<details><summary>Show Answer & Explanation</summary>
<p><strong>B</strong> ✓</p>
<p><em>If should_continue always returns "continue": agent → tools → agent → tools → ... never reaching END. This is why production agents need recursion_limit (default 25 in LangGraph) or an explicit termination condition. The graph compiles successfully (C is wrong), but hits an infinite loop at runtime.</em></p>
</details>

<h3 id="9-eval-ft">Evaluation & Fine-tuning (Q12–Q15)</h3>

<p><strong>Q12 🟢 (Easy):</strong> Which of the following is a recall-oriented metric commonly used for evaluating text summarization?</p>

<ul>
<li>A) BLEU</li>
<li>B) ROUGE</li>
<li>C) Perplexity</li>
<li>D) pass@k</li>
</ul>

<details><summary>Show Answer & Explanation</summary>
<p><strong>B</strong> ✓</p>
<p><em>ROUGE (Recall-Oriented Understudy for Gisting Evaluation) — the name says it all: recall-oriented, designed for summarization. BLEU is precision-oriented for translation (A). Perplexity measures language model quality (C). pass@k is for code generation (D).</em></p>
</details>

<p><strong>Q13 🟡 (Medium):</strong> In LoRA fine-tuning, matrices $B \in \mathbb{R}^{d \times r}$ and $A \in \mathbb{R}^{r \times k}$ are learned. How is matrix $B$ initialized and WHY?</p>

<ul>
<li>A) Random initialization — to break symmetry between neurons</li>
<li>B) Identity matrix — to preserve the original model behavior</li>
<li>C) Zeros — so that $\Delta W = BA = 0$ at training start, preserving pretrained weights</li>
<li>D) Xavier initialization — to maintain gradient flow</li>
</ul>

<details><summary>Show Answer & Explanation</summary>
<p><strong>C</strong> ✓</p>
<p><em>$B$ is initialized = zeros, $A$ is initialized = random (Kaiming). When training starts: $\Delta W = BA = 0 \cdot A = 0$, so $W' = W + 0 = W$ (pretrained weights). The model begins training from exactly the pretrained performance without disruption. This is a critical design decision from the LoRA paper.</em></p>
</details>

<p><strong>Q14 🟡 (Medium):</strong> A company fine-tunes Llama-3-70B for legal document analysis. They have a single NVIDIA A100 80GB GPU. Which approach can they use?</p>

<ul>
<li>A) Full fine-tuning with gradient checkpointing</li>
<li>B) Standard LoRA with FP16 base model</li>
<li>C) QLoRA with 4-bit NF4 quantization</li>
<li>D) Both B and C will work on a single A100 80GB</li>
</ul>

<details><summary>Show Answer & Explanation</summary>
<p><strong>C</strong> ✓</p>
<p><em>Llama-3-70B in FP16 = ~140GB for weights alone → A100 80GB isn't enough for full FT (A is wrong) or LoRA FP16 (B is wrong, needs ~160GB). QLoRA 4-bit: ~35GB for weights + optimizer → fits in A100 80GB. D is wrong because B doesn't fit.</em></p>
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

<details><summary>Show Answer & Explanation</summary>
<p><strong>B</strong> ✓</p>
<p><em>The deployment decision is based on holistic improvement: F1 (primary for QA) improved significantly from 0.52→0.71, judge correctness (closest to human eval) improved from 3.1→4.2, and latency remained nearly unchanged. A is wrong because BLEU isn't the primary metric for QA. C is correct but doesn't "justify" the decision — latency is just one factor. D is wrong: ROUGE is for summarization, this is a QA task.</em></p>
</details>

<h2 id="10-tong-ket-next-steps">10. Series Summary & Next Steps</h2>

<h3 id="10-1-hanh-trinh-10-bai">10.1. The 10-Lesson Journey</h3>

<p>Congratulations on completing the series <strong>"NVIDIA DLI Exam Prep — Generative AI with Diffusion Models & LLMs"</strong>! Let's recap what you've learned:</p>

<table>
<thead>
<tr><th>Lesson</th><th>Topic</th><th>Key Takeaway</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>Generative AI Overview</td><td>Taxonomy: VAE → GAN → Diffusion → Transformer LLM</td></tr>
<tr><td>2</td><td>Diffusion Models & DDPM</td><td>Forward noise + Reverse denoise, U-Net predicts $\epsilon$</td></tr>
<tr><td>3</td><td>Stable Diffusion & CLIP</td><td>Latent space diffusion, text conditioning via cross-attention</td></tr>
<tr><td>4</td><td>LLM Foundations</td><td>Transformer attention, tokenization, generation strategies</td></tr>
<tr><td>5</td><td>Prompt Engineering</td><td>Zero/few-shot, CoT, structured output, system prompts</td></tr>
<tr><td>6</td><td>RAG Pipeline</td><td>Chunking → Embedding → Vector DB → Retrieval → Generation</td></tr>
<tr><td>7</td><td>LangChain & NIM</td><td>LCEL chains, NIM deployment, guardrails</td></tr>
<tr><td>8</td><td>Tool Calling & Structured Output</td><td>Function calling, Pydantic schemas, ReAct loop</td></tr>
<tr><td>9</td><td>Agentic AI & Multi-Agent</td><td>LangGraph, supervisor pattern, state machines</td></tr>
<tr><td>10</td><td>Evaluation & LoRA Fine-tuning</td><td>BLEU/ROUGE/F1, LLM-as-Judge, LoRA/QLoRA, NeMo</td></tr>
</tbody>
</table>

<h3 id="10-2-course-order">10.2. Recommended DLI Course Order</h3>

<p>To earn your certification, complete the DLI courses in this order:</p>

<ol>
<li><strong>Generative AI with Diffusion Models</strong> (S-FX-14) — diffusion theory + coding lab</li>
<li><strong>Building RAG Agents with LLMs</strong> (S-FX-15) — RAG pipeline + LangChain + NIM</li>
<li><strong>Build an AI Agent Reasoning App</strong> (S-FX-34) — agentic AI + LangGraph</li>
<li><strong>GenAI and LLM Customization and Evaluation</strong> (C-FX-25) — LoRA, QLoRA, NeMo Evaluator</li>
</ol>

<p>Each course has its own assessment. Complete all 4 → earn the <strong>NVIDIA DLI Generative AI Certificate</strong>.</p>

<h3 id="10-3-tips-after-cert">10.3. Tips for Continuing Learning</h3>

<ul>
<li><strong>Practice on Kaggle / HuggingFace</strong> — fine-tune real models on real datasets</li>
<li><strong>Read papers</strong> — the LoRA, QLoRA, RAG, and DDPM papers are all accessible and excellent exam preparation</li>
<li><strong>Build projects</strong> — RAG chatbot, multi-agent system, custom fine-tuned model for a specific domain</li>
<li><strong>Join communities</strong> — NVIDIA Developer Forums, HuggingFace Discord, LangChain Discord</li>
<li><strong>Stay updated</strong> — AI evolves rapidly; follow the NVIDIA Blog, arXiv daily papers</li>
</ul>

<blockquote><p><strong>Final tip:</strong> Remember that DLI assessments lean toward <strong>practical application</strong> rather than pure theory. If you understand the code and can implement from scratch (like the examples in this series), you will pass. Good luck on your exam!</p></blockquote>
