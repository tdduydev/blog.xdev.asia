---
id: 019c9619-lt01-d3-l08
title: 'Bài 8: Amazon Bedrock Deep Dive'
slug: bai-8-amazon-bedrock-deep-dive
description: >-
  Amazon Bedrock: all features. Agents, Guardrails, Model Evaluation.
  PartyRock playground. Amazon Q Developer & Amazon Q Business.
  Choosing the right FM. Pricing models.
duration_minutes: 65
is_free: true
video_url: null
sort_order: 4
section_title: "Domain 3: Applications of Foundation Models (28%)"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'Luyện thi AWS Certified AI Practitioner (AIF-C01)'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai8-bedrock-architecture.webp" alt="Amazon Bedrock Architecture" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Amazon Bedrock Architecture — Foundation Models, Agents, Guardrails và Knowledge Bases</em></p>
</div>

<h2 id="bedrock-overview"><strong>1. Amazon Bedrock Overview</strong></h2>

<p><strong>Amazon Bedrock</strong> là fully managed service cung cấp access đến <strong>FMs từ nhiều providers</strong> qua single API, kèm theo tools để customize, deploy, và secure AI applications.</p>

<h3 id="bedrock-key-features"><strong>1.1. Key Value Propositions</strong></h3>

<ul>
<li><strong>Choice</strong>: Access FMs từ Amazon, Anthropic, Meta, Mistral, Cohere, Stability AI, AI21 Labs</li>
<li><strong>Customization</strong>: Fine-tuning, continued pre-training, RAG (Knowledge Bases)</li>
<li><strong>Security</strong>: Data stays in your AWS account, encrypted, not used to train models</li>
<li><strong>Serverless</strong>: No infrastructure to manage</li>
<li><strong>Integration</strong>: Native AWS service integration (IAM, CloudWatch, CloudTrail)</li>
</ul>

<h3 id="fm-providers"><strong>1.2. Foundation Model Providers on Bedrock</strong></h3>

<table>
<thead><tr><th>Provider</th><th>Models</th><th>Strengths</th></tr></thead>
<tbody>
<tr><td><strong>Amazon</strong></td><td>Titan Text, Titan Embeddings, Titan Image Generator</td><td>General purpose, embeddings, image gen</td></tr>
<tr><td><strong>Anthropic</strong></td><td>Claude 3 Haiku, Sonnet, Opus</td><td>Complex reasoning, analysis, vision</td></tr>
<tr><td><strong>Meta</strong></td><td>Llama 2, Llama 3</td><td>Open-source, customizable</td></tr>
<tr><td><strong>Mistral AI</strong></td><td>Mistral, Mixtral</td><td>Fast, efficient, multilingual</td></tr>
<tr><td><strong>Cohere</strong></td><td>Command, Embed</td><td>Enterprise text, multilingual embeddings</td></tr>
<tr><td><strong>Stability AI</strong></td><td>Stable Diffusion XL</td><td>Image generation</td></tr>
<tr><td><strong>AI21 Labs</strong></td><td>Jurassic</td><td>Text generation, summarization</td></tr>
</tbody>
</table>

<h2 id="bedrock-features"><strong>2. Bedrock Features Deep Dive</strong></h2>

<h3 id="bedrock-agents"><strong>2.1. Amazon Bedrock Agents</strong></h3>

<p>Agents cho phép FMs <strong>thực hiện multi-step tasks</strong> bằng cách tự động plan, execute actions, và use tools.</p>

<pre><code class="language-text">User: "Book a flight from Hanoi to Tokyo for next Friday"

Agent workflow:
1. PLAN: Need to search flights, check availability, book
2. ACTION: Call flight search API → find available flights
3. OBSERVE: Found 3 flights, cheapest is $450
4. ACTION: Call booking API → reserve the flight
5. RESPOND: "Booked VN flight HAN→NRT, Dec 20, $450"
</code></pre>

<h3 id="agent-components"><strong>Agent Components:</strong></h3>

<table>
<thead><tr><th>Component</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td><strong>Foundation Model</strong></td><td>Brain that reasons and plans</td></tr>
<tr><td><strong>Instructions</strong></td><td>System prompt defining agent's role</td></tr>
<tr><td><strong>Action Groups</strong></td><td>APIs the agent can call (Lambda functions or OpenAPI schemas)</td></tr>
<tr><td><strong>Knowledge Bases</strong></td><td>RAG data sources for information retrieval</td></tr>
<tr><td><strong>Guardrails</strong></td><td>Safety and compliance filters</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> "An AI assistant needs to look up order status, check inventory, and process returns" → <strong>Bedrock Agent</strong> with action groups connected to business APIs.</p>
</blockquote>

<h3 id="bedrock-guardrails"><strong>2.2. Amazon Bedrock Guardrails</strong></h3>

<p>Guardrails implement <strong>safety controls</strong> for AI applications:</p>

<table>
<thead><tr><th>Guardrail Type</th><th>What it does</th><th>Example</th></tr></thead>
<tbody>
<tr><td><strong>Content filters</strong></td><td>Block harmful content categories</td><td>Hate, violence, sexual, insults</td></tr>
<tr><td><strong>Denied topics</strong></td><td>Block specific topics</td><td>"Don't discuss competitor products"</td></tr>
<tr><td><strong>Word filters</strong></td><td>Block specific words/phrases</td><td>Profanity, banned terms</td></tr>
<tr><td><strong>PII filters</strong></td><td>Detect and redact PII</td><td>SSN, credit card numbers, emails</td></tr>
<tr><td><strong>Contextual grounding</strong></td><td>Check if response is grounded in context</td><td>Prevent hallucination in RAG</td></tr>
</tbody>
</table>

<pre><code class="language-text">Guardrails Flow:
User Input → [Input Guardrails] → FM Processing → [Output Guardrails] → User
              Check for:                          Check for:
              - Denied topics                     - Harmful content
              - Harmful input                     - PII in response
              - PII in input                      - Off-topic responses
                                                  - Grounding check
</code></pre>

<h3 id="bedrock-eval"><strong>2.3. Model Evaluation</strong></h3>

<p>Compare and evaluate FMs for your specific use case:</p>

<ul>
<li><strong>Automatic evaluation</strong>: BERTScore, accuracy, toxicity metrics</li>
<li><strong>Human evaluation</strong>: Custom criteria rated by human reviewers</li>
<li><strong>A/B comparison</strong>: Side-by-side model comparison</li>
<li><strong>Custom tasks</strong>: Upload your own test dataset</li>
</ul>

<h3 id="bedrock-playground"><strong>2.4. Bedrock Playgrounds</strong></h3>

<table>
<thead><tr><th>Playground</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>Text playground</strong></td><td>Test text models interactively</td></tr>
<tr><td><strong>Chat playground</strong></td><td>Test conversational models</td></tr>
<tr><td><strong>Image playground</strong></td><td>Test image generation models</td></tr>
</tbody>
</table>

<h2 id="partyrock"><strong>3. Amazon PartyRock</strong></h2>

<p><strong>PartyRock</strong> là <strong>free, no-code playground</strong> cho Bedrock — cho phép bất kỳ ai tạo GenAI apps mà không cần AWS account hay coding skills.</p>

<table>
<thead><tr><th>Feature</th><th>Detail</th></tr></thead>
<tbody>
<tr><td><strong>No AWS account needed</strong></td><td>Free to use with social login</td></tr>
<tr><td><strong>No coding</strong></td><td>Drag-and-drop app builder</td></tr>
<tr><td><strong>Shareable</strong></td><td>Share apps via URL</td></tr>
<tr><td><strong>Use case</strong></td><td>Learning, prototyping, experimentation</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> "A non-technical marketing team wants to experiment with generative AI without an AWS account" → <strong>PartyRock</strong>.</p>
</blockquote>

<h2 id="amazon-q"><strong>4. Amazon Q</strong></h2>

<h3 id="q-developer"><strong>4.1. Amazon Q Developer</strong></h3>

<p>AI coding assistant cho developers:</p>

<ul>
<li><strong>Code generation</strong>: Write code from natural language</li>
<li><strong>Code explanation</strong>: Explain existing code</li>
<li><strong>Code transformation</strong>: Upgrade Java versions, .NET migrations</li>
<li><strong>Debugging</strong>: Identify and fix bugs</li>
<li><strong>Security scanning</strong>: Find vulnerabilities in code</li>
<li><strong>IDE integration</strong>: VS Code, JetBrains, AWS Console</li>
</ul>

<h3 id="q-business"><strong>4.2. Amazon Q Business</strong></h3>

<p>AI assistant for business users:</p>

<ul>
<li><strong>Connect enterprise data</strong>: S3, SharePoint, Confluence, Salesforce, etc.</li>
<li><strong>Q&A on company data</strong>: Answers based on connected data sources</li>
<li><strong>Respects access controls</strong>: ACLs from connected systems</li>
<li><strong>Plugins</strong>: Create tickets (Jira), send emails, etc.</li>
</ul>

<h3 id="q-vs-bedrock"><strong>4.3. Amazon Q vs Bedrock</strong></h3>

<table>
<thead><tr><th>Feature</th><th>Amazon Q</th><th>Amazon Bedrock</th></tr></thead>
<tbody>
<tr><td><strong>Target user</strong></td><td>End users (devs, business)</td><td>Developers building AI apps</td></tr>
<tr><td><strong>Customization</strong></td><td>Limited (connect data sources)</td><td>Full (fine-tune, RAG, agents)</td></tr>
<tr><td><strong>Managed</strong></td><td>Fully managed assistant</td><td>API/SDK access to FMs</td></tr>
<tr><td><strong>Use case</strong></td><td>Productivity tool</td><td>Building custom AI applications</td></tr>
</tbody>
</table>

<h2 id="pricing"><strong>5. Bedrock Pricing Models</strong></h2>

<table>
<thead><tr><th>Pricing Model</th><th>How it works</th><th>Best For</th></tr></thead>
<tbody>
<tr><td><strong>On-Demand</strong></td><td>Pay per input/output token</td><td>Variable, unpredictable workloads</td></tr>
<tr><td><strong>Provisioned Throughput</strong></td><td>Reserved model units (hourly)</td><td>Consistent, production workloads</td></tr>
<tr><td><strong>Batch Inference</strong></td><td>Submit batch jobs (up to 50% cheaper)</td><td>Large-scale, non-real-time processing</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> "Cost-optimize a GenAI workload with predictable traffic?" → <strong>Provisioned Throughput</strong>. "Process thousands of documents overnight?" → <strong>Batch Inference</strong>.</p>
</blockquote>

<h2 id="choosing-fm"><strong>6. How to Choose the Right FM</strong></h2>

<pre><code class="language-text">Decision Framework:
┌─────────────────────────────────────────────────┐
│ 1. TASK TYPE                                    │
│    Text? Image? Code? Multi-modal?              │
├─────────────────────────────────────────────────┤
│ 2. COMPLEXITY                                   │
│    Simple classification → smaller model         │
│    Complex reasoning → larger model              │
├─────────────────────────────────────────────────┤
│ 3. LATENCY REQUIREMENTS                         │
│    Real-time → smaller/faster model (Haiku)      │
│    Batch processing → larger model (Opus)        │
├─────────────────────────────────────────────────┤
│ 4. COST CONSTRAINTS                             │
│    Budget limited → smaller model                │
│    Quality critical → larger model               │
├─────────────────────────────────────────────────┤
│ 5. CUSTOMIZATION NEEDS                          │
│    Fine-tuning needed? Check supported models    │
│    LoRA? Check compatibility                     │
├─────────────────────────────────────────────────┤
│ 6. EVALUATE with Model Evaluation               │
│    Test candidates side-by-side                  │
└─────────────────────────────────────────────────┘
</code></pre>

<h2 id="other-services"><strong>7. Other AWS GenAI Services</strong></h2>

<table>
<thead><tr><th>Service</th><th>What it does</th></tr></thead>
<tbody>
<tr><td><strong>Amazon CodeWhisperer</strong></td><td>Now part of Amazon Q Developer (code suggestions)</td></tr>
<tr><td><strong>AWS App Studio</strong></td><td>Build enterprise apps with natural language</td></tr>
<tr><td><strong>Amazon SageMaker JumpStart</strong></td><td>Deploy open-source FMs with SageMaker</td></tr>
<tr><td><strong>Amazon Comprehend</strong></td><td>NLP service (sentiment, entities, topics — pre-built)</td></tr>
<tr><td><strong>Amazon Transcribe</strong></td><td>Speech-to-text</td></tr>
<tr><td><strong>Amazon Polly</strong></td><td>Text-to-speech</td></tr>
<tr><td><strong>Amazon Translate</strong></td><td>Machine translation</td></tr>
<tr><td><strong>Amazon Rekognition</strong></td><td>Image/video analysis</td></tr>
<tr><td><strong>Amazon Textract</strong></td><td>Extract text from documents (OCR+)</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>8. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A retail company wants to build an AI assistant that can check inventory, process returns, and answer product questions from their catalog. Which Amazon Bedrock feature should they use?</p>
<ul>
<li>A) Bedrock Guardrails</li>
<li>B) Bedrock Knowledge Bases only</li>
<li>C) Bedrock Agents with Action Groups and Knowledge Bases ✓</li>
<li>D) Bedrock Model Evaluation</li>
</ul>
<p><em>Explanation: Bedrock Agents can orchestrate multi-step tasks by calling APIs (action groups for inventory/returns) and retrieving information (knowledge bases for product catalog).</em></p>

<p><strong>Q2:</strong> Which Amazon Bedrock feature should be used to prevent a generative AI application from discussing competitor products and to filter out personally identifiable information (PII)?</p>
<ul>
<li>A) Bedrock Knowledge Bases</li>
<li>B) Bedrock Custom Models</li>
<li>C) Bedrock Guardrails ✓</li>
<li>D) Bedrock Agents</li>
</ul>
<p><em>Explanation: Guardrails provide denied topic filtering (block competitor discussions) and PII detection/redaction. They can be applied to both input and output of FM calls.</em></p>

<p><strong>Q3:</strong> A company wants to process 50,000 customer reviews overnight for sentiment analysis using a foundation model. Which Bedrock pricing model is MOST cost-effective?</p>
<ul>
<li>A) On-Demand pricing</li>
<li>B) Provisioned Throughput</li>
<li>C) Batch Inference ✓</li>
<li>D) Free tier</li>
</ul>
<p><em>Explanation: Batch Inference is designed for large-scale, non-real-time workloads and offers up to 50% cost savings compared to on-demand pricing. Ideal for overnight processing.</em></p>
