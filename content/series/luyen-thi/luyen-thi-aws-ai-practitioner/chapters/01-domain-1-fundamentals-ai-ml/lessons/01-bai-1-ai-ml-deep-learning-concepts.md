---
id: 019c9619-lt01-d1-l01
title: 'Bài 1: AI, ML & Deep Learning — Concepts and Terminology'
slug: bai-1-ai-ml-deep-learning-concepts
description: >-
  AI vs ML vs DL. Supervised, Unsupervised, Reinforcement Learning.
  Classification, Regression, Clustering. Neural Networks basics.
  Training, Validation, Test sets. Bias-Variance tradeoff.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: "Domain 1: Fundamentals of AI and ML (20%)"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'Luyện thi AWS Certified AI Practitioner (AIF-C01)'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai1-ai-ml-dl-hierarchy.webp" alt="AI, ML và Deep Learning Hierarchy" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>AI, ML và Deep Learning — quan hệ lồng nhau và ba paradigm học máy</em></p>
</div>

<h2 id="overview"><strong>Tổng quan Domain 1</strong></h2>

<p>Domain 1 chiếm <strong>20% đề thi AIF-C01</strong>. Bạn cần hiểu rõ các khái niệm nền tảng về AI, ML, và Deep Learning — không cần code, nhưng phải phân biệt được khi nào dùng approach nào.</p>

<blockquote>
<p><strong>Exam tip:</strong> Domain này thường có các câu hỏi dạng "Which type of machine learning is BEST suited for..." — yêu cầu bạn chọn đúng paradigm cho use case.</p>
</blockquote>

<h2 id="ai-vs-ml-vs-dl"><strong>1. AI vs Machine Learning vs Deep Learning</strong></h2>

<p>Ba khái niệm này có quan hệ lồng nhau (nested relationship):</p>

<pre><code class="language-text">┌─────────────────────────────────────────────┐
│  Artificial Intelligence (AI)               │
│  "Machines that mimic human intelligence"   │
│  ┌───────────────────────────────────────┐   │
│  │  Machine Learning (ML)               │   │
│  │  "Learning from data without         │   │
│  │   explicit programming"              │   │
│  │  ┌─────────────────────────────────┐  │   │
│  │  │  Deep Learning (DL)             │  │   │
│  │  │  "Neural networks with many     │  │   │
│  │  │   layers"                       │  │   │
│  │  └─────────────────────────────────┘  │   │
│  └───────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
</code></pre>

<table>
<thead><tr><th>Concept</th><th>Definition</th><th>Example</th></tr></thead>
<tbody>
<tr><td><strong>AI</strong></td><td>Broad field — machines performing tasks that typically require human intelligence</td><td>Chatbot, self-driving car, chess engine</td></tr>
<tr><td><strong>ML</strong></td><td>Subset of AI — algorithms learn patterns from data</td><td>Spam filter, recommendation engine</td></tr>
<tr><td><strong>DL</strong></td><td>Subset of ML — neural networks with multiple layers</td><td>Image recognition, language translation</td></tr>
</tbody>
</table>

<h3 id="key-differences"><strong>Key Differences for the Exam</strong></h3>

<ul>
<li><strong>Traditional Programming</strong>: Rules + Data → Output</li>
<li><strong>Machine Learning</strong>: Data + Output → Rules (model learns the rules)</li>
<li><strong>Deep Learning</strong>: Tự động extract features từ raw data (không cần manual feature engineering)</li>
</ul>

<h2 id="ml-paradigms"><strong>2. Three ML Paradigms</strong></h2>

<h3 id="supervised-learning"><strong>2.1. Supervised Learning</strong></h3>

<p>Model học từ <strong>labeled data</strong> — mỗi input đi kèm output đúng (label/target).</p>

<table>
<thead><tr><th>Task Type</th><th>Output</th><th>Use Case</th><th>Algorithms</th></tr></thead>
<tbody>
<tr><td><strong>Classification</strong></td><td>Discrete category</td><td>Spam vs Not Spam, Fraud detection</td><td>Logistic Regression, Random Forest, SVM</td></tr>
<tr><td><strong>Regression</strong></td><td>Continuous number</td><td>House price prediction, Stock forecast</td><td>Linear Regression, XGBoost</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> Nếu đề bài nói "predict a category" hoặc "classify" → <strong>Classification</strong>. Nếu nói "predict a number/value" → <strong>Regression</strong>.</p>
</blockquote>

<h3 id="unsupervised-learning"><strong>2.2. Unsupervised Learning</strong></h3>

<p>Model học từ <strong>unlabeled data</strong> — tự tìm patterns, structure trong dữ liệu.</p>

<table>
<thead><tr><th>Task Type</th><th>What it does</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>Clustering</strong></td><td>Group similar data points</td><td>Customer segmentation, Document grouping</td></tr>
<tr><td><strong>Dimensionality Reduction</strong></td><td>Reduce features while preserving info</td><td>Data visualization, noise reduction</td></tr>
<tr><td><strong>Anomaly Detection</strong></td><td>Find unusual data points</td><td>Fraud detection, equipment failure</td></tr>
<tr><td><strong>Association</strong></td><td>Find rules between items</td><td>"Customers who bought X also bought Y"</td></tr>
</tbody>
</table>

<h3 id="reinforcement-learning"><strong>2.3. Reinforcement Learning (RL)</strong></h3>

<p>Agent học bằng cách <strong>trial-and-error</strong> trong một environment. Nhận <strong>reward</strong> (positive) hoặc <strong>penalty</strong> (negative) cho mỗi action.</p>

<pre><code class="language-text">Agent → Action → Environment → State + Reward → Agent (loop)
</code></pre>

<p><strong>Use cases:</strong></p>
<ul>
<li>Game AI (AlphaGo)</li>
<li>Robotics navigation</li>
<li>Autonomous driving</li>
<li>AWS DeepRacer (self-driving car simulation)</li>
</ul>

<h3 id="choosing-paradigm"><strong>2.4. Choosing the Right Paradigm — Exam Decision Tree</strong></h3>

<pre><code class="language-text">Do you have labeled data?
├── YES → Supervised Learning
│   ├── Predicting a category? → Classification
│   └── Predicting a number? → Regression
├── NO →
│   ├── Want to find groups/patterns? → Unsupervised (Clustering)
│   └── Learning through trial & error? → Reinforcement Learning
</code></pre>

<h2 id="data-concepts"><strong>3. Data Concepts for ML</strong></h2>

<h3 id="data-types"><strong>3.1. Data Types</strong></h3>

<table>
<thead><tr><th>Type</th><th>Description</th><th>Examples</th></tr></thead>
<tbody>
<tr><td><strong>Structured</strong></td><td>Organized in rows & columns (tabular)</td><td>CSV, database tables, spreadsheets</td></tr>
<tr><td><strong>Semi-structured</strong></td><td>Has some organization but flexible</td><td>JSON, XML, log files</td></tr>
<tr><td><strong>Unstructured</strong></td><td>No predefined format</td><td>Images, videos, audio, free text</td></tr>
<tr><td><strong>Time-series</strong></td><td>Data points indexed by time</td><td>Stock prices, IoT sensor readings</td></tr>
</tbody>
</table>

<h3 id="labeled-unlabeled"><strong>3.2. Labeled vs Unlabeled Data</strong></h3>

<ul>
<li><strong>Labeled data</strong>: Mỗi data point có kèm answer (label). Ví dụ: email + tag "spam"/"not spam". Dùng cho <strong>Supervised Learning</strong>.</li>
<li><strong>Unlabeled data</strong>: Chỉ có data, không có label. Dùng cho <strong>Unsupervised Learning</strong>.</li>
<li><strong>Amazon SageMaker Ground Truth</strong>: Dịch vụ AWS giúp label data (human + ML-assisted labeling).</li>
</ul>

<h3 id="datasets"><strong>3.3. Training, Validation, Test Sets</strong></h3>

<pre><code class="language-text">┌────────────────────────────────────────────────┐
│              Full Dataset (100%)               │
├──────────────────┬──────────┬──────────────────┤
│  Training (70%)  │ Val(15%) │   Test (15%)     │
│  Model learns    │ Tune     │ Final evaluation │
│  from this data  │ hyper-   │ (never seen      │
│                  │ params   │  during training) │
└──────────────────┴──────────┴──────────────────┘
</code></pre>

<ul>
<li><strong>Training set</strong>: Model học patterns từ đây</li>
<li><strong>Validation set</strong>: Tune hyperparameters, chống overfitting</li>
<li><strong>Test set</strong>: Đánh giá cuối cùng — model chưa bao giờ thấy data này</li>
</ul>

<h2 id="neural-networks"><strong>4. Neural Networks Basics</strong></h2>

<h3 id="nn-architecture"><strong>4.1. Architecture</strong></h3>

<pre><code class="language-text">Input Layer → Hidden Layer(s) → Output Layer
    x₁ ──┐     ┌── h₁ ──┐
    x₂ ──┼─────┼── h₂ ──┼──── ŷ (prediction)
    x₃ ──┘     └── h₃ ──┘

Each connection has a weight (w)
Each neuron applies an activation function
</code></pre>

<p><strong>Key components:</strong></p>
<ul>
<li><strong>Weights</strong>: Parameters the model learns during training</li>
<li><strong>Bias</strong>: Additional parameter to shift the activation function</li>
<li><strong>Activation Function</strong>: ReLU, Sigmoid, Softmax — introduces non-linearity</li>
<li><strong>Loss Function</strong>: Measures how wrong the model's predictions are</li>
<li><strong>Optimizer</strong>: Updates weights to minimize loss (e.g., SGD, Adam)</li>
</ul>

<h3 id="nn-types"><strong>4.2. Types of Neural Networks</strong></h3>

<table>
<thead><tr><th>Type</th><th>Best For</th><th>AWS Service</th></tr></thead>
<tbody>
<tr><td><strong>CNN</strong> (Convolutional NN)</td><td>Images, video</td><td>Amazon Rekognition</td></tr>
<tr><td><strong>RNN/LSTM</strong> (Recurrent NN)</td><td>Sequential data, time series</td><td>Amazon Forecast</td></tr>
<tr><td><strong>Transformer</strong></td><td>NLP, text generation</td><td>Amazon Bedrock (LLMs)</td></tr>
<tr><td><strong>GAN</strong> (Generative Adversarial)</td><td>Generate new data (images)</td><td>—</td></tr>
</tbody>
</table>

<h2 id="model-evaluation"><strong>5. Model Evaluation Concepts</strong></h2>

<h3 id="overfitting-underfitting"><strong>5.1. Overfitting vs Underfitting</strong></h3>

<table>
<thead><tr><th>Problem</th><th>Training Accuracy</th><th>Test Accuracy</th><th>Cause</th><th>Solution</th></tr></thead>
<tbody>
<tr><td><strong>Overfitting</strong></td><td>Very High</td><td>Low</td><td>Model memorizes training data</td><td>More data, regularization, dropout, early stopping</td></tr>
<tr><td><strong>Underfitting</strong></td><td>Low</td><td>Low</td><td>Model too simple</td><td>More features, more complex model, longer training</td></tr>
<tr><td><strong>Good Fit</strong></td><td>High</td><td>High</td><td>Balanced complexity</td><td>—</td></tr>
</tbody>
</table>

<h3 id="bias-variance"><strong>5.2. Bias-Variance Tradeoff</strong></h3>

<ul>
<li><strong>High Bias</strong> = Underfitting (model quá đơn giản, bỏ qua patterns)</li>
<li><strong>High Variance</strong> = Overfitting (model quá phức tạp, nhạy cảm với noise)</li>
<li>Mục tiêu: tìm <strong>sweet spot</strong> giữa bias và variance</li>
</ul>

<h3 id="metrics"><strong>5.3. Common Metrics</strong></h3>

<p><strong>Classification metrics:</strong></p>
<table>
<thead><tr><th>Metric</th><th>Formula</th><th>When to use</th></tr></thead>
<tbody>
<tr><td><strong>Accuracy</strong></td><td>(TP + TN) / Total</td><td>Balanced classes</td></tr>
<tr><td><strong>Precision</strong></td><td>TP / (TP + FP)</td><td>"Don't flag innocent as spam"</td></tr>
<tr><td><strong>Recall</strong></td><td>TP / (TP + FN)</td><td>"Don't miss any fraud"</td></tr>
<tr><td><strong>F1 Score</strong></td><td>2 × (P × R) / (P + R)</td><td>Imbalanced classes</td></tr>
<tr><td><strong>AUC-ROC</strong></td><td>Area under ROC curve</td><td>Binary classification overall</td></tr>
</tbody>
</table>

<p><strong>Regression metrics:</strong></p>
<ul>
<li><strong>RMSE</strong> (Root Mean Square Error): Penalizes large errors</li>
<li><strong>MAE</strong> (Mean Absolute Error): Average error magnitude</li>
<li><strong>R²</strong>: How well model explains variance (1.0 = perfect)</li>
</ul>

<h2 id="key-terms"><strong>6. Key Terms Cheat Sheet</strong></h2>

<table>
<thead><tr><th>Term</th><th>Definition (for exam)</th></tr></thead>
<tbody>
<tr><td><strong>Feature</strong></td><td>Input variable used for prediction (column in data)</td></tr>
<tr><td><strong>Label / Target</strong></td><td>The answer we want the model to predict</td></tr>
<tr><td><strong>Hyperparameter</strong></td><td>Settings configured BEFORE training (learning rate, epochs)</td></tr>
<tr><td><strong>Parameter</strong></td><td>Values the model learns DURING training (weights, biases)</td></tr>
<tr><td><strong>Epoch</strong></td><td>One complete pass through the entire training dataset</td></tr>
<tr><td><strong>Batch Size</strong></td><td>Number of samples processed before updating weights</td></tr>
<tr><td><strong>Inference</strong></td><td>Using a trained model to make predictions on new data</td></tr>
<tr><td><strong>Transfer Learning</strong></td><td>Using a pre-trained model and adapting it for a new task</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>7. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A company wants to predict whether customers will cancel their subscription (yes/no). Which ML approach is most appropriate?</p>
<ul>
<li>A) Unsupervised Learning — Clustering</li>
<li>B) Supervised Learning — Regression</li>
<li>C) Supervised Learning — Classification ✓</li>
<li>D) Reinforcement Learning</li>
</ul>
<p><em>Explanation: Predicting a binary outcome (yes/no) with labeled historical data = supervised classification.</em></p>

<p><strong>Q2:</strong> A retail company has customer purchase data but NO predefined groups. They want to segment customers into groups for targeted marketing. Which approach should they use?</p>
<ul>
<li>A) Supervised Learning — Classification</li>
<li>B) Unsupervised Learning — Clustering ✓</li>
<li>C) Reinforcement Learning</li>
<li>D) Supervised Learning — Regression</li>
</ul>
<p><em>Explanation: No labels + finding natural groups in data = unsupervised clustering.</em></p>

<p><strong>Q3:</strong> A model performs extremely well on training data (99% accuracy) but poorly on new data (65% accuracy). What is this called?</p>
<ul>
<li>A) Underfitting</li>
<li>B) Overfitting ✓</li>
<li>C) High bias</li>
<li>D) Regularization</li>
</ul>
<p><em>Explanation: High training accuracy + low test accuracy = overfitting (model memorized training data).</em></p>
