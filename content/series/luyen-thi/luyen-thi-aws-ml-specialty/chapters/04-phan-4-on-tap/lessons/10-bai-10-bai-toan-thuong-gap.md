---
id: f7a8daa0-e49a-4fac-b232-d6a8b998e120
title: 'Bài 10: Các Bài Toán ML Thường Gặp'
slug: bai-10-bai-toan-thuong-gap
description: >-
  Fraud detection, recommendation systems, NLP pipeline, time series forecasting,
  computer vision — nhận dạng bài toán và chọn đúng AWS service/algorithm.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 10
section_title: "Phần 4: Ôn Tập Tổng Hợp"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'Luyện thi AWS Certified Machine Learning - Specialty'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai10-ml-patterns.webp" alt="AWS ML Problem Patterns" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>ML Problem Patterns: Fraud detection, Recommendation, NLP, Time Series, và Computer Vision trên AWS</em></p>
</div>

<h2 id="pattern-matching"><strong>1. Nhận Dạng Bài Toán Nhanh</strong></h2>

<p>Phần lớn câu hỏi MLS-C01 là <strong>scenario-based</strong>: đọc mô tả business problem, chọn AWS service hoặc algorithm phù hợp nhất. Bài học này cung cấp framework để nhận dạng nhanh.</p>

<pre><code class="language-text">ML Problem Recognition Framework:

READ SCENARIO
    ↓
Is output a CATEGORY?          → Classification
Is output a NUMBER?            → Regression
Is output a CLUSTER/GROUP?     → Clustering (no labels)
Is output a RANK/SCORE?        → Recommendation / Ranking
Is output a DETECTION (anomaly)? → Anomaly Detection
Is output a SEQUENCE?          → Time Series / Seq2Seq
</code></pre>

<h2 id="fraud-detection"><strong>2. Fraud Detection</strong></h2>

<p>Fraud detection là bài toán điển hình trong đề thi. Key challenge: <strong>extreme class imbalance</strong> (99.9% transactions là legitimate).</p>

<table>
<thead><tr><th>Challenge</th><th>Solution</th></tr></thead>
<tbody>
<tr><td>Class imbalance</td><td>SMOTE, class_weight, <strong>precision-recall</strong> (not accuracy)</td></tr>
<tr><td>Real-time scoring</td><td>SageMaker Real-time Endpoint</td></tr>
<tr><td>Unsupervised fraud (no labels)</td><td><strong>Random Cut Forest</strong> (anomaly detection)</td></tr>
<tr><td>Graph-based fraud rings</td><td><strong>Amazon Neptune</strong> + GNN (GraphSAGE)</td></tr>
<tr><td>Supervised (labeled history)</td><td><strong>XGBoost</strong> or Linear Learner</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> Khi câu hỏi nói "không có nhãn fraud" hoặc "phát hiện hành vi bất thường" → <strong>Random Cut Forest</strong>. Khi có lịch sử giao dịch gian lận đã được gán nhãn → Classification (XGBoost).</p>
</blockquote>

<h2 id="recommendation"><strong>3. Recommendation Systems</strong></h2>

<table>
<thead><tr><th>Type</th><th>Algorithm</th><th>AWS Service</th></tr></thead>
<tbody>
<tr><td>Collaborative Filtering</td><td>Factorization Machines, Neural CF</td><td>SageMaker FM, <strong>Amazon Personalize</strong></td></tr>
<tr><td>Content-Based</td><td>TF-IDF, Embeddings</td><td>SageMaker Knn</td></tr>
<tr><td>Hybrid</td><td>FM + content features</td><td>Amazon Personalize (HRNN)</td></tr>
<tr><td>Cold Start Problem</td><td>Content features, metadata</td><td>Personalize context metadata</td></tr>
</tbody>
</table>

<p>Đề thi thường hỏi: <em>"Real-time personalized recommendations for e-commerce"</em> → câu trả lời gần như luôn là <strong>Amazon Personalize</strong> (managed service).</p>

<h2 id="nlp"><strong>4. NLP Pipeline</strong></h2>

<pre><code class="language-text">NLP Task Decision Tree:

Classify documents?
    → Text Classification → BlazingText (word2vec mode), Comprehend Custom

Extract entities from text?
    → Named Entity Recognition → Amazon Comprehend (NER)

Translate text?
    → Amazon Translate

Summarize documents?
    → Hugging Face on SageMaker (T5, BART)

Q&A / Generation?
    → SageMaker JumpStart foundation models (Llama, Falcon)

Toxic content detection?
    → Amazon Comprehend (Sentiment + custom classifier)
</code></pre>

<table>
<thead><tr><th>NLP Task</th><th>Algorithm/Service</th></tr></thead>
<tbody>
<tr><td>Document classification</td><td>BlazingText, Comprehend Custom</td></tr>
<tr><td>Topic modeling</td><td><strong>Latent Dirichlet Allocation (LDA)</strong>, NTM</td></tr>
<tr><td>Sentiment analysis</td><td>Amazon Comprehend</td></tr>
<tr><td>Language detection</td><td>Amazon Comprehend</td></tr>
<tr><td>Machine translation</td><td>Amazon Translate</td></tr>
<tr><td>Conversational AI</td><td>Amazon Lex (chatbot) + Lambda</td></tr>
</tbody>
</table>

<h2 id="time-series"><strong>5. Time Series Forecasting</strong></h2>

<table>
<thead><tr><th>Service/Algorithm</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>DeepAR+</strong> (SageMaker built-in)</td><td>Multiple related time series, cold start</td></tr>
<tr><td><strong>Amazon Forecast</strong></td><td>Fully managed, business forecasting (demand, inventory)</td></tr>
<tr><td><strong>ARIMA</strong></td><td>Single stationary series, classic approach</td></tr>
<tr><td><strong>Prophet</strong></td><td>Seasonality + holidays, Facebook's library</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> "Predict retail demand for thousands of products" → <strong>DeepAR+</strong> (multiple related series) or <strong>Amazon Forecast</strong> (managed). Key differentiator: DeepAR+ trains one model for ALL items, while classical methods need one model per series.</p>
</blockquote>

<h2 id="computer-vision"><strong>6. Computer Vision</strong></h2>

<table>
<thead><tr><th>CV Task</th><th>Algorithm</th><th>Service</th></tr></thead>
<tbody>
<tr><td>Image Classification</td><td><strong>Image Classification (ResNet)</strong></td><td>SageMaker built-in</td></tr>
<tr><td>Object Detection</td><td><strong>Object Detection (SSD/YOLO)</strong></td><td>SageMaker built-in</td></tr>
<tr><td>Semantic Segmentation</td><td><strong>Semantic Segmentation</strong></td><td>SageMaker built-in</td></tr>
<tr><td>Rekognition (no ML needed)</td><td>Faces, objects, text, moderation</td><td><strong>Amazon Rekognition</strong></td></tr>
<tr><td>Custom labels in images</td><td>Fine-tuning</td><td>Rekognition Custom Labels</td></tr>
</tbody>
</table>

<h2 id="mapping-table"><strong>7. Business Domain → AWS Service Mapping</strong></h2>

<table>
<thead><tr><th>Industry / Scenario</th><th>AWS Service</th></tr></thead>
<tbody>
<tr><td>E-commerce personalization</td><td>Amazon Personalize</td></tr>
<tr><td>Call center analytics</td><td>Amazon Transcribe + Comprehend</td></tr>
<tr><td>Medical image analysis</td><td>Amazon HealthLake + SageMaker (custom model)</td></tr>
<tr><td>Document understanding (invoices, forms)</td><td><strong>Amazon Textract</strong></td></tr>
<tr><td>Product search (semantic)</td><td>Amazon OpenSearch + KNN</td></tr>
<tr><td>IoT anomaly detection</td><td><strong>Amazon Lookout for Equipment</strong></td></tr>
<tr><td>Manufacturing defect detection</td><td><strong>Amazon Lookout for Vision</strong></td></tr>
<tr><td>Financial forecasting (managed)</td><td>Amazon Forecast</td></tr>
<tr><td>Churn prediction</td><td>XGBoost (SageMaker)</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>8. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A retail company wants to predict next quarter's sales for 10,000 individual products, incorporating holiday seasonality and promotional events. Which solution is MOST appropriate?</p>
<ul>
<li>A) Train separate ARIMA models for each of the 10,000 products</li>
<li>B) Use Amazon Forecast with related time series data ✓</li>
<li>C) Use Amazon Comprehend for trend analysis</li>
<li>D) Use Amazon Rekognition to analyze product images</li>
</ul>
<p><em>Explanation: Amazon Forecast is designed for business demand forecasting at scale, can handle thousands of related time series simultaneously, and supports external factors like holidays and promotions. Training 10,000 separate ARIMA models would be impractical and miss cross-series patterns.</em></p>

<p><strong>Q2:</strong> A bank needs to detect fraudulent transactions in real time WITHOUT having labeled historical fraud data. Which algorithm should they use?</p>
<ul>
<li>A) XGBoost classifier</li>
<li>B) Linear Learner with binary classification</li>
<li>C) Random Cut Forest ✓</li>
<li>D) BlazingText</li>
</ul>
<p><em>Explanation: Without labeled fraud data, this is an unsupervised anomaly detection problem. Random Cut Forest detects anomalies (transactions that deviate from normal patterns) without requiring labeled examples. XGBoost and Linear Learner are supervised and require labeled training data.</em></p>

<p><strong>Q3:</strong> A company wants to extract key-value pairs from scanned insurance claim forms (PDFs). No custom ML training has been done. Which AWS service should they use?</p>
<ul>
<li>A) Amazon Comprehend</li>
<li>B) Amazon Textract ✓</li>
<li>C) SageMaker Object Detection</li>
<li>D) Amazon Rekognition</li>
</ul>
<p><em>Explanation: Amazon Textract is purpose-built for extracting text, forms (key-value pairs), and tables from scanned documents including PDFs. It requires no ML training. Comprehend analyzes text meaning; Rekognition analyzes images; neither handles structured form extraction like Textract.</em></p>
