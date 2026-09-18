---
id: 019c9619-lt01-d3-l05
title: 'Lesson 5: Prompt Engineering Techniques'
slug: bai-5-prompt-engineering-techniques
description: >-
  Zero-shot, few-shot, Chain-of-Thought prompting.
  System prompts, prompt templates, negative prompting.
  Prompt engineering best practices for the AWS AI Practitioner exam.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 1
section_title: "Domain 3: Applications of Foundation Models (28%)"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS Certified AI Practitioner (AIF-C01) Exam Prep'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai5-prompt-engineering.webp" alt="Prompt Engineering Techniques" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Prompt Engineering Techniques: Zero-shot, Few-shot, and Chain-of-Thought</em></p>
</div>

<h2 id="prompt-engineering"><strong>1. What is Prompt Engineering?</strong></h2>

<p><strong>Prompt Engineering</strong> is the art of designing input (prompts) to achieve desired outputs from Foundation Models. It is the <strong>cheapest and fastest</strong> way to customize FM behavior — no training or fine-tuning required.</p>

<h3 id="prompt-components"><strong>1.1. Components of a Prompt</strong></h3>

<pre><code class="language-text">┌────────────────────────────────────────────┐
│  SYSTEM PROMPT (optional)                  │
│  "You are a helpful AWS solutions          │
│   architect. Answer concisely."            │
├────────────────────────────────────────────┤
│  CONTEXT (optional)                        │
│  Background info, documents, data          │
├────────────────────────────────────────────┤
│  USER PROMPT (required)                    │
│  The actual question or instruction        │
├────────────────────────────────────────────┤
│  EXAMPLES (optional, for few-shot)         │
│  Input → Output pairs                     │
├────────────────────────────────────────────┤
│  OUTPUT FORMAT (optional)                  │
│  "Respond in JSON", "Use bullet points"    │
└────────────────────────────────────────────┘
</code></pre>

<h2 id="prompting-techniques"><strong>2. Prompting Techniques</strong></h2>

<h3 id="zero-shot"><strong>2.1. Zero-shot Prompting</strong></h3>

<p>Send a prompt <strong>without any examples</strong>. The model relies entirely on its pre-trained knowledge.</p>

<pre><code class="language-text">Prompt: "Classify the sentiment of this review:
'The product arrived damaged and customer service was unhelpful.'

Sentiment:"

Output: "Negative"
</code></pre>

<p><strong>When to use:</strong> Simple, well-defined tasks that the model already understands well.</p>

<h3 id="few-shot"><strong>2.2. Few-shot Prompting</strong></h3>

<p>Provide <strong>a few examples</strong> before presenting the actual task. This helps the model understand the expected format and logic.</p>

<pre><code class="language-text">Prompt: "Classify these reviews:

Review: 'Amazing quality, fast shipping!' → Positive
Review: 'Terrible experience, never again.' → Negative
Review: 'It's okay, nothing special.' → Neutral

Review: 'The product exceeded my expectations!' →"

Output: "Positive"
</code></pre>

<p><strong>When to use:</strong> When you need the model to follow a specific format or logic pattern that zero-shot doesn't achieve with sufficient quality.</p>

<h3 id="one-shot"><strong>2.3. One-shot Prompting</strong></h3>

<p>A variation of few-shot that provides only <strong>1 example</strong>. Used when you want to set a pattern but the context window is limited.</p>

<h3 id="cot"><strong>2.4. Chain-of-Thought (CoT) Prompting</strong></h3>

<p>Ask the model to <strong>think step-by-step</strong> before answering. Particularly effective for math, logic, and reasoning tasks.</p>

<pre><code class="language-text">WITHOUT CoT:
Q: "If a store has 3 boxes with 12 apples each, and gives
    away 15 apples, how many are left?"
A: "21" (might be wrong without reasoning)

WITH CoT:
Q: "Think step by step: If a store has 3 boxes with 12
    apples each, and gives away 15 apples, how many are left?"
A: "Step 1: Total apples = 3 × 12 = 36
    Step 2: After giving away = 36 - 15 = 21
    Answer: 21 apples"
</code></pre>

<blockquote>
<p><strong>Exam tip:</strong> "Which prompting technique improves reasoning accuracy?" → <strong>Chain-of-Thought</strong>. Key phrase: "think step by step" or "explain your reasoning".</p>
</blockquote>

<h2 id="system-prompts"><strong>3. System Prompts & Personas</strong></h2>

<p><strong>System prompt</strong> defines the model's role, behavior, constraints, and output format. It "sets the stage" before user interaction.</p>

<pre><code class="language-text">System Prompt:
"You are a financial advisor AI for XYZ Bank.
Rules:
- Only answer questions about banking and investments
- Never provide specific stock recommendations
- Always include a disclaimer
- Respond in a professional tone
- If asked about non-financial topics, politely redirect"
</code></pre>

<h3 id="system-prompt-use"><strong>System Prompt Best Practices:</strong></h3>

<table>
<thead><tr><th>Practice</th><th>Why</th></tr></thead>
<tbody>
<tr><td>Define a <strong>clear role</strong></td><td>Constrains model behavior to a domain</td></tr>
<tr><td>Set <strong>boundaries</strong></td><td>Prevents off-topic or harmful responses</td></tr>
<tr><td>Specify <strong>output format</strong></td><td>Ensures consistent, parseable outputs</td></tr>
<tr><td>Include <strong>examples</strong></td><td>Clarifies expected behavior</td></tr>
<tr><td>Add <strong>guardrails</strong></td><td>Prevents misuse (PII, harmful content)</td></tr>
</tbody>
</table>

<h2 id="advanced-techniques"><strong>4. Advanced Prompting Techniques</strong></h2>

<h3 id="negative-prompting"><strong>4.1. Negative Prompting</strong></h3>

<p>Explicitly specify what the model should <strong>NOT do</strong>. Especially useful in image generation.</p>

<pre><code class="language-text">Text generation:
"Summarize this article. Do NOT include opinions
or personal commentary. Do NOT exceed 100 words."

Image generation (Stable Diffusion):
Prompt: "Professional headshot, studio lighting"
Negative prompt: "blurry, cartoon, distorted, low quality"
</code></pre>

<h3 id="prompt-templates"><strong>4.2. Prompt Templates</strong></h3>

<p>Reusable prompt structures with <strong>placeholders</strong> for dynamic content:</p>

<pre><code class="language-text">Template:
"Given the following {document_type}:
---
{content}
---
Extract the following information:
- {field_1}
- {field_2}
- {field_3}
Respond in JSON format."
</code></pre>

<h3 id="prompt-chaining"><strong>4.3. Prompt Chaining</strong></h3>

<p>Break complex tasks into <strong>multiple sequential prompts</strong>, where the output of the previous prompt becomes the input for the next one.</p>

<pre><code class="language-text">Step 1: "Extract key entities from this document: {doc}"
         → Output: list of entities

Step 2: "For each entity {entities}, find the sentiment
         expressed about it in this text: {doc}"
         → Output: entity-sentiment pairs

Step 3: "Create a summary report of sentiment analysis
         for these entities: {entity_sentiments}"
         → Output: Final report
</code></pre>

<h2 id="comparison"><strong>5. Comparison Table for Exam</strong></h2>

<table>
<thead><tr><th>Technique</th><th>Examples Given?</th><th>Best For</th><th>Exam Keyword</th></tr></thead>
<tbody>
<tr><td><strong>Zero-shot</strong></td><td>None</td><td>Simple, well-known tasks</td><td>"no examples provided"</td></tr>
<tr><td><strong>One-shot</strong></td><td>1 example</td><td>Setting format with minimal context</td><td>"single example"</td></tr>
<tr><td><strong>Few-shot</strong></td><td>2-5 examples</td><td>Pattern following, classification</td><td>"examples provided", "demonstrations"</td></tr>
<tr><td><strong>Chain-of-Thought</strong></td><td>With reasoning steps</td><td>Math, logic, complex reasoning</td><td>"step by step", "reasoning"</td></tr>
<tr><td><strong>Negative prompting</strong></td><td>N/A</td><td>Avoiding unwanted outputs</td><td>"do not include", "avoid"</td></tr>
<tr><td><strong>Prompt chaining</strong></td><td>N/A</td><td>Complex multi-step tasks</td><td>"break into steps", "sequential"</td></tr>
</tbody>
</table>

<h2 id="inference-params"><strong>6. Inference Parameters Review</strong></h2>

<p>Prompt engineering also includes tuning inference parameters:</p>

<table>
<thead><tr><th>Parameter</th><th>Low Value</th><th>High Value</th></tr></thead>
<tbody>
<tr><td><strong>Temperature</strong></td><td>Deterministic, factual (0.0-0.3)</td><td>Creative, diverse (0.7-1.0)</td></tr>
<tr><td><strong>Top-p</strong></td><td>Focused vocabulary (0.1-0.3)</td><td>Diverse vocabulary (0.9-1.0)</td></tr>
<tr><td><strong>Top-k</strong></td><td>Limited choices (e.g., 10)</td><td>More choices (e.g., 250)</td></tr>
<tr><td><strong>Max tokens</strong></td><td>Short responses</td><td>Long responses</td></tr>
<tr><td><strong>Stop sequences</strong></td><td colspan="2">Define when to stop generating</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> "A customer support chatbot gives inconsistent answers" → Lower <strong>temperature</strong> (closer to 0). "A creative writing app produces boring text" → Raise <strong>temperature</strong> (closer to 1).</p>
</blockquote>

<h2 id="best-practices"><strong>7. Prompt Engineering Best Practices</strong></h2>

<ol>
<li><strong>Be specific</strong>: "Summarize in 3 bullet points" > "Summarize this"</li>
<li><strong>Provide context</strong>: Include relevant background information</li>
<li><strong>Define output format</strong>: JSON, markdown, table, bullet points</li>
<li><strong>Use delimiters</strong>: Separate sections with --- or ``` to avoid prompt injection</li>
<li><strong>Iterate</strong>: Test and refine prompts based on outputs</li>
<li><strong>Avoid ambiguity</strong>: Don't assume the model knows your intent</li>
<li><strong>Use examples</strong>: When zero-shot doesn't work, add few-shot examples</li>
</ol>

<h2 id="practice-questions"><strong>8. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A developer is working on a classification task, but the model's zero-shot responses are inconsistent. Which prompting technique should the developer try NEXT?</p>
<ul>
<li>A) Reduce the temperature to 0</li>
<li>B) Use few-shot prompting with example inputs and outputs ✓</li>
<li>C) Fine-tune the model on custom data</li>
<li>D) Switch to a different model provider</li>
</ul>
<p><em>Explanation: Few-shot prompting is the logical next step after zero-shot fails — providing examples helps the model understand the expected pattern. Fine-tuning is more expensive and complex. Temperature adjustment alone may not fix classification logic.</em></p>

<p><strong>Q2:</strong> A customer wants their AI application to solve complex mathematical word problems more accurately. Which prompting technique would MOST improve the results?</p>
<ul>
<li>A) Zero-shot prompting</li>
<li>B) Negative prompting</li>
<li>C) Chain-of-Thought prompting ✓</li>
<li>D) Prompt chaining</li>
</ul>
<p><em>Explanation: Chain-of-Thought prompting encourages the model to show its reasoning step by step, which significantly improves accuracy on mathematical and logical reasoning tasks.</em></p>

<p><strong>Q3:</strong> Which of the following is a benefit of using a system prompt in a generative AI application?</p>
<ul>
<li>A) It eliminates the need for user input</li>
<li>B) It reduces the model's inference cost</li>
<li>C) It defines the model's role, behavior, and constraints ✓</li>
<li>D) It replaces the need for fine-tuning</li>
</ul>
<p><em>Explanation: System prompts set the model's role, behavioral constraints, and output format — establishing consistent behavior across all user interactions without any model training.</em></p>
