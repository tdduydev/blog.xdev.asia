---
id: 019c9619-lt01-d1-l02
title: 'Lesson 2: ML Development Lifecycle & AWS AI Services Overview'
slug: bai-2-ml-lifecycle-aws-services
description: >-
  ML pipeline: data collection → feature engineering → training → evaluation → deployment.
  AWS AI/ML service stack. SageMaker, Rekognition, Comprehend, Polly,
  Transcribe, Translate, Textract, Lex, Personalize, Forecast, Kendra.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 2
section_title: "Domain 1: Fundamentals of AI and ML (20%)"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS Certified AI Practitioner (AIF-C01) Exam Prep'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai2-ml-lifecycle-pipeline.webp" alt="ML Development Lifecycle Pipeline on AWS" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>ML Development Lifecycle Pipeline and AWS AI/ML Service Stack</em></p>
</div>

<h2 id="ml-lifecycle"><strong>1. ML Development Lifecycle</strong></h2>

<p>The AIF-C01 exam requires you to understand the full ML development lifecycle — from problem definition to deployment and monitoring.</p>

<pre><code class="language-text">┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│ 1. Business │───→│ 2. Data      │───→│ 3. Feature   │
│ Problem     │    │ Collection & │    │ Engineering  │
│ Definition  │    │ Preparation  │    │              │
└─────────────┘    └──────────────┘    └──────────────┘
                                              │
┌─────────────┐    ┌──────────────┐    ┌──────┴───────┐
│ 6. Monitor  │←───│ 5. Deploy    │←───│ 4. Model     │
│ & Retrain   │    │ & Inference  │    │ Training &   │
│             │    │              │    │ Evaluation   │
└─────────────┘    └──────────────┘    └──────────────┘
</code></pre>

<h3 id="step-1"><strong>Step 1: Business Problem Definition</strong></h3>

<ul>
<li>Determine whether the problem actually requires ML (sometimes rule-based approaches are sufficient)</li>
<li>Define success metrics (KPIs)</li>
<li>Determine data availability</li>
</ul>

<blockquote>
<p><strong>Exam tip:</strong> "Not every problem needs ML." If the question describes a simple problem, a rule-based approach or lookup table might be enough.</p>
</blockquote>

<h3 id="step-2"><strong>Step 2: Data Collection & Preparation</strong></h3>

<ul>
<li><strong>Data Collection</strong>: Gather from databases, APIs, IoT, logs</li>
<li><strong>Data Cleaning</strong>: Handle missing values, remove duplicates, fix errors</li>
<li><strong>Data Labeling</strong>: Label data for supervised learning → <strong>Amazon SageMaker Ground Truth</strong></li>
<li><strong>Exploratory Data Analysis (EDA)</strong>: Visualize, understand distributions, correlations</li>
</ul>

<h3 id="step-3"><strong>Step 3: Feature Engineering</strong></h3>

<ul>
<li><strong>Feature selection</strong>: Select important features, remove noise</li>
<li><strong>Feature transformation</strong>: Normalization, scaling, encoding</li>
<li><strong>Feature creation</strong>: Create new features from raw data</li>
<li>AWS: <strong>SageMaker Data Wrangler</strong>, <strong>SageMaker Feature Store</strong></li>
</ul>

<h3 id="step-4"><strong>Step 4: Model Training & Evaluation</strong></h3>

<ul>
<li>Choose algorithm appropriate for the problem</li>
<li>Split data into training/validation/test sets</li>
<li>Train model, tune hyperparameters</li>
<li>Evaluate using appropriate metrics (accuracy, F1, RMSE...)</li>
<li>AWS: <strong>Amazon SageMaker</strong> for full ML workflow</li>
</ul>

<h3 id="step-5"><strong>Step 5: Deployment & Inference</strong></h3>

<ul>
<li><strong>Real-time inference</strong>: Endpoint for instant predictions</li>
<li><strong>Batch inference</strong>: Process large datasets offline</li>
<li><strong>Edge deployment</strong>: Run model on edge devices</li>
<li>AWS: <strong>SageMaker Endpoints</strong>, <strong>Lambda</strong>, <strong>IoT Greengrass</strong></li>
</ul>

<h3 id="step-6"><strong>Step 6: Monitoring & Retraining</strong></h3>

<ul>
<li><strong>Model drift</strong>: Performance degrades over time as data changes</li>
<li><strong>Data drift</strong>: Input data distribution changes</li>
<li><strong>Concept drift</strong>: Relationship between input and output changes</li>
<li>Solution: Monitor → detect drift → retrain with new data</li>
<li>AWS: <strong>SageMaker Model Monitor</strong></li>
</ul>

<h2 id="aws-ai-stack"><strong>2. AWS AI/ML Service Stack</strong></h2>

<p>AWS provides 3 layers of AI/ML services — from high-level (no ML knowledge needed) to low-level (full control):</p>

<pre><code class="language-text">┌─────────────────────────────────────────────────────┐
│  Layer 3: AI Services (Pre-trained, API-based)      │
│  → Rekognition, Comprehend, Polly, Transcribe,      │
│    Translate, Textract, Lex, Personalize, Forecast   │
│  → NO ML expertise needed                           │
├─────────────────────────────────────────────────────┤
│  Layer 2: ML Services (Managed platform)            │
│  → Amazon SageMaker, SageMaker JumpStart            │
│  → Amazon Bedrock (GenAI)                           │
│  → SOME ML expertise needed                         │
├─────────────────────────────────────────────────────┤
│  Layer 1: ML Frameworks & Infrastructure            │
│  → EC2 with GPU/Inferentia, Deep Learning AMIs,     │
│    Deep Learning Containers                         │
│  → FULL ML expertise needed                         │
└─────────────────────────────────────────────────────┘
</code></pre>

<h2 id="ai-services"><strong>3. AWS AI Services — Summary Table</strong></h2>

<p>This section is <strong>very important for the exam</strong> — you need to know what each service does and when to use it.</p>

<h3 id="vision"><strong>3.1. Computer Vision</strong></h3>

<table>
<thead><tr><th>Service</th><th>What it does</th><th>Use Cases</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Rekognition</strong></td><td>Image and video analysis</td><td>Face detection, object detection, content moderation, celebrity recognition, text in images (OCR)</td></tr>
<tr><td><strong>Amazon Textract</strong></td><td>Extract text & data from documents</td><td>Invoice processing, ID document extraction, form data, table extraction</td></tr>
<tr><td><strong>Amazon Lookout for Vision</strong></td><td>Visual inspection for manufacturing</td><td>Defect detection in products on assembly line</td></tr>
</tbody>
</table>

<h3 id="nlp"><strong>3.2. Natural Language Processing (NLP)</strong></h3>

<table>
<thead><tr><th>Service</th><th>What it does</th><th>Use Cases</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Comprehend</strong></td><td>NLP analysis</td><td>Sentiment analysis, entity extraction, key phrases, language detection, PII detection</td></tr>
<tr><td><strong>Amazon Translate</strong></td><td>Neural machine translation</td><td>Real-time translation, batch document translation</td></tr>
<tr><td><strong>Amazon Kendra</strong></td><td>Intelligent enterprise search</td><td>Internal knowledge search, FAQ, document search powered by NLP</td></tr>
</tbody>
</table>

<h3 id="speech"><strong>3.3. Speech</strong></h3>

<table>
<thead><tr><th>Service</th><th>What it does</th><th>Direction</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Polly</strong></td><td>Text-to-Speech (TTS)</td><td>Text → Audio</td></tr>
<tr><td><strong>Amazon Transcribe</strong></td><td>Speech-to-Text (STT)</td><td>Audio → Text</td></tr>
<tr><td><strong>Amazon Lex</strong></td><td>Conversational AI (chatbot)</td><td>Build chatbots with voice & text (powers Alexa)</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> Polly = text TO speech (Polly "speaks"). Transcribe = speech TO text (Transcribe "writes down").</p>
</blockquote>

<h3 id="predictions"><strong>3.4. Predictions & Recommendations</strong></h3>

<table>
<thead><tr><th>Service</th><th>What it does</th><th>Use Cases</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Personalize</strong></td><td>Real-time personalization & recommendations</td><td>Product recommendations, personalized content</td></tr>
<tr><td><strong>Amazon Forecast</strong></td><td>Time-series forecasting</td><td>Demand planning, financial forecasting, resource planning</td></tr>
<tr><td><strong>Amazon Fraud Detector</strong></td><td>Detect online fraud</td><td>Payment fraud, fake accounts, account takeover</td></tr>
</tbody>
</table>

<h2 id="sagemaker"><strong>4. Amazon SageMaker Overview</strong></h2>

<p>SageMaker is a <strong>fully managed ML platform</strong> — it provides everything needed for the entire ML lifecycle.</p>

<h3 id="sagemaker-components"><strong>Key Components:</strong></h3>

<table>
<thead><tr><th>Component</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td><strong>SageMaker Studio</strong></td><td>IDE for ML development (Jupyter-based)</td></tr>
<tr><td><strong>SageMaker Ground Truth</strong></td><td>Data labeling service (human + ML-assisted)</td></tr>
<tr><td><strong>SageMaker Data Wrangler</strong></td><td>Data preparation & transformation (no code)</td></tr>
<tr><td><strong>SageMaker Feature Store</strong></td><td>Store & share ML features</td></tr>
<tr><td><strong>SageMaker Training</strong></td><td>Managed training jobs with built-in algorithms</td></tr>
<tr><td><strong>SageMaker Autopilot</strong></td><td>AutoML — automatic model building</td></tr>
<tr><td><strong>SageMaker JumpStart</strong></td><td>Pre-trained models & solutions (model hub)</td></tr>
<tr><td><strong>SageMaker Endpoints</strong></td><td>Deploy models for real-time inference</td></tr>
<tr><td><strong>SageMaker Model Monitor</strong></td><td>Monitor deployed models for drift</td></tr>
<tr><td><strong>SageMaker Clarify</strong></td><td>Bias detection & model explainability</td></tr>
<tr><td><strong>SageMaker Canvas</strong></td><td>No-code ML for business users</td></tr>
</tbody>
</table>

<h3 id="sagemaker-decision"><strong>When to use SageMaker vs AI Services?</strong></h3>

<pre><code class="language-text">Need custom ML model? → SageMaker
Need pre-trained capability? → AI Services (Rekognition, Comprehend, etc.)
Need GenAI/Foundation Models? → Amazon Bedrock
Business user, no code? → SageMaker Canvas
</code></pre>

<h2 id="service-mapping"><strong>5. Use Case → AWS Service Mapping</strong></h2>

<p>This is a very common question type on the exam:</p>

<table>
<thead><tr><th>Use Case</th><th>AWS Service</th></tr></thead>
<tbody>
<tr><td>Detect faces in photos</td><td>Amazon Rekognition</td></tr>
<tr><td>Extract data from invoices</td><td>Amazon Textract</td></tr>
<tr><td>Analyze customer review sentiment</td><td>Amazon Comprehend</td></tr>
<tr><td>Translate content to multiple languages</td><td>Amazon Translate</td></tr>
<tr><td>Build a customer service chatbot</td><td>Amazon Lex</td></tr>
<tr><td>Convert blog posts to audio</td><td>Amazon Polly</td></tr>
<tr><td>Transcribe meeting recordings</td><td>Amazon Transcribe</td></tr>
<tr><td>Product recommendations</td><td>Amazon Personalize</td></tr>
<tr><td>Demand forecasting</td><td>Amazon Forecast</td></tr>
<tr><td>Search internal documents</td><td>Amazon Kendra</td></tr>
<tr><td>Detect fraudulent transactions</td><td>Amazon Fraud Detector</td></tr>
<tr><td>Label training data</td><td>SageMaker Ground Truth</td></tr>
<tr><td>Build custom ML model</td><td>Amazon SageMaker</td></tr>
<tr><td>No-code ML for business analysts</td><td>SageMaker Canvas</td></tr>
<tr><td>Generate text with LLM</td><td>Amazon Bedrock</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>6. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A company wants to automatically extract text and structured data from scanned invoices. Which AWS service should they use?</p>
<ul>
<li>A) Amazon Comprehend</li>
<li>B) Amazon Rekognition</li>
<li>C) Amazon Textract ✓</li>
<li>D) Amazon Translate</li>
</ul>
<p><em>Explanation: Textract is specifically designed to extract text, forms, and tables from scanned documents. Comprehend analyzes text meaning, not document extraction. Rekognition is for image/video analysis.</em></p>

<p><strong>Q2:</strong> A data scientist notices that their deployed model's prediction accuracy has decreased over the past month. The input data patterns have changed. What is this called?</p>
<ul>
<li>A) Overfitting</li>
<li>B) Underfitting</li>
<li>C) Data drift ✓</li>
<li>D) Feature engineering</li>
</ul>
<p><em>Explanation: When the statistical properties of model input data change over time, causing performance degradation, this is called data drift.</em></p>

<p><strong>Q3:</strong> Which AWS service allows business analysts with no ML experience to build ML models using a visual interface?</p>
<ul>
<li>A) SageMaker Studio</li>
<li>B) SageMaker Autopilot</li>
<li>C) SageMaker Canvas ✓</li>
<li>D) SageMaker JumpStart</li>
</ul>
<p><em>Explanation: SageMaker Canvas provides a no-code, visual point-and-click interface for business analysts. Autopilot automates model building but requires some ML knowledge. JumpStart provides pre-trained models. Studio is the full ML IDE.</em></p>
