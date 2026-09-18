---
id: 1a81b42d-c09e-43ef-b9f6-3158ca64b6c1
title: 'Bài 3: Data Analysis & Visualization'
slug: bai-3-data-analysis
description: >-
  EDA trên SageMaker notebooks. Amazon Athena cho SQL analytics.
  Amazon QuickSight cho BI dashboards. Phát hiện data quality issues.
  Detect class imbalance, outliers, correlations, data drift.
duration_minutes: 45
is_free: true
video_url: null
sort_order: 3
section_title: "Phần 1: Data Engineering (20%)"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'Luyện thi AWS Certified Machine Learning - Specialty'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai3-eda-data-analysis.webp" alt="Exploratory Data Analysis trên AWS" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>EDA & Data Analysis: thống kê mô tả, phát hiện outliers, feature correlation trên AWS</em></p>
</div>

<h2 id="eda"><strong>1. Exploratory Data Analysis (EDA)</strong></h2>

<p><strong>EDA</strong> là bước phân tích dữ liệu ban đầu để hiểu structure, patterns, và anomalies trước khi modeling. SageMaker cung cấp nhiều tools để thực hiện EDA ở scale lớn.</p>

<h2 id="eda-tools"><strong>2. AWS Tools cho Data Analysis</strong></h2>

<table>
<thead><tr><th>Tool</th><th>Use Case</th><th>Interface</th></tr></thead>
<tbody>
<tr><td><strong>SageMaker Studio Notebooks</strong></td><td>Interactive EDA, Python/R analysis</td><td>JupyterLab-based IDE</td></tr>
<tr><td><strong>SageMaker Data Wrangler</strong></td><td>Visual data prep, 300+ transforms, auto-insights</td><td>Drag-and-drop GUI</td></tr>
<tr><td><strong>Amazon Athena</strong></td><td>SQL queries on S3 data</td><td>SQL console</td></tr>
<tr><td><strong>Amazon QuickSight</strong></td><td>BI dashboards, executive reports</td><td>Visual BI tool</td></tr>
<tr><td><strong>Amazon Redshift</strong></td><td>Large-scale data warehousing, SQL analytics</td><td>SQL</td></tr>
<tr><td><strong>AWS Glue DataBrew</strong></td><td>No-code data profiling và cleaning recipes</td><td>Visual tool</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> <strong>Data Wrangler</strong> = visual data prep cho ML (generates SageMaker Processing code). <strong>DataBrew</strong> = data analyst/BI (no ML context). <strong>QuickSight</strong> = BI dashboards for business users, không phải ML.</p>
</blockquote>

<h2 id="data-quality"><strong>3. Data Quality Issues</strong></h2>

<p>Đề thi thường hỏi về nhận biết và xử lý các vấn đề chất lượng data phổ biến.</p>

<table>
<thead><tr><th>Issue</th><th>Detection Method</th><th>Impact on Model</th></tr></thead>
<tbody>
<tr><td><strong>Missing Values</strong></td><td>Null counts, missing rate per column</td><td>Errors, biased results</td></tr>
<tr><td><strong>Outliers</strong></td><td>Box plots, Z-score > 3, IQR method</td><td>Skewed weights, poor generalization</td></tr>
<tr><td><strong>Class Imbalance</strong></td><td>Class distribution histogram</td><td>Biased toward majority class</td></tr>
<tr><td><strong>Feature Correlation</strong></td><td>Correlation matrix, VIF score</td><td>Multicollinearity → unstable coefficients</td></tr>
<tr><td><strong>Data Leakage</strong></td><td>Features with suspiciously high correlation to target</td><td>Over-optimistic eval, fails in production</td></tr>
<tr><td><strong>Distribution Skew</strong></td><td>Histogram, skewness metric</td><td>Violated model assumptions</td></tr>
</tbody>
</table>

<h3 id="data-leakage"><strong>3.1. Data Leakage — Critical Concept</strong></h3>

<p><strong>Data leakage</strong> là khi information từ outside the training set rò rỉ vào features, khiến model có accuracy cao trong training nhưng thất bại khi production.</p>

<pre><code class="language-text">Common Data Leakage Patterns:

❌ Target leakage:
   Feature "loan_default_flag" → predicting "credit_risk"
   (feature derived from target)

❌ Future data leakage:
   Using tomorrow's stock price to predict today's trade

❌ Train/test contamination:
   Scaling data BEFORE splitting (test mean leaks into train)

✅ Correct approach:
   Split data FIRST → fit scaler on train only → transform both
</code></pre>

<blockquote>
<p><strong>Exam tip:</strong> Always <strong>split before transforming</strong>. StandardScaler.fit() chỉ được gọi trên training set. Sau đó transform() trên cả train và test. Fit+transform trên toàn bộ dataset là data leakage.</p>
</blockquote>

<h2 id="athena"><strong>4. Amazon Athena</strong></h2>

<p>Athena cho phép chạy SQL queries directly trên S3 without loading data vào database. <strong>Pay per scan</strong> — tối ưu bằng cách dùng Parquet + partitioning.</p>

<pre><code class="language-text">Cost Optimization Tips:
┌────────────────────────────────────────────────┐
│  Partition data by date/region/category:       │
│  s3://bucket/data/year=2024/month=01/          │
│  → Query chỉ scan the required partitions      │
│                                                │
│  Use columnar formats (Parquet/ORC):           │
│  → Read only needed columns                   │
│                                               │
│  Compress data (Snappy, Gzip):                │
│  → Reduce scan size → reduce cost             │
└────────────────────────────────────────────────┘
</code></pre>

<h2 id="quicksight"><strong>5. Amazon QuickSight</strong></h2>

<p>QuickSight là <strong>BI service</strong>, không phải ML tool. Key feature: <strong>SPICE</strong> (in-memory engine) cho fast dashboards.</p>

<table>
<thead><tr><th>Feature</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>SPICE</strong></td><td>Super-fast Parallel In-memory Calculation Engine — cached dataset</td></tr>
<tr><td><strong>ML Insights</strong></td><td>Built-in anomaly detection, forecasting trên dashboards</td></tr>
<tr><td><strong>Q (NLQ)</strong></td><td>Natural language queries — "show me sales by region last month"</td></tr>
</tbody>
</table>

<h2 id="cheat-sheet"><strong>6. Cheat Sheet — Analysis Tools</strong></h2>

<table>
<thead><tr><th>Scenario</th><th>Tool</th></tr></thead>
<tbody>
<tr><td>Interactive Python EDA on large data</td><td>SageMaker Studio Notebooks</td></tr>
<tr><td>Visual no-code ML data prep</td><td>SageMaker Data Wrangler</td></tr>
<tr><td>SQL on S3 data (serverless)</td><td>Amazon Athena</td></tr>
<tr><td>Business dashboards và reporting</td><td>Amazon QuickSight</td></tr>
<tr><td>Large data warehouse SQL</td><td>Amazon Redshift</td></tr>
<tr><td>No-code data profiling recipes</td><td>AWS Glue DataBrew</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A data scientist standardized features using the mean and standard deviation of the ENTIRE dataset before splitting into train/test sets. What problem does this cause?</p>
<ul>
<li>A) Model underfitting</li>
<li>B) Slow training convergence</li>
<li>C) Data leakage from test set statistics into training ✓</li>
<li>D) Class imbalance</li>
</ul>
<p><em>Explanation: Fitting a scaler on the entire dataset causes data leakage — the test set statistics (mean, std) influence the training data transformation. Always fit transformers on training data only, then apply the fitted transformer to both train and test sets.</em></p>

<p><strong>Q2:</strong> A business analyst needs to create executive dashboards from S3 data with fast interactive visualizations. Which AWS service is BEST suited?</p>
<ul>
<li>A) Amazon SageMaker Studio</li>
<li>B) Amazon Athena</li>
<li>C) Amazon QuickSight ✓</li>
<li>D) AWS Glue DataBrew</li>
</ul>
<p><em>Explanation: Amazon QuickSight is the AWS BI service designed for business dashboards and visualizations with SPICE in-memory engine for fast interactive queries. SageMaker Studio is for ML development, Athena is SQL querying, DataBrew is data preparation.</em></p>

<p><strong>Q3:</strong> A model trained on customer churn data has 99% training accuracy but performs poorly on production data. Investigation shows "days_since_last_call" is more predictive than expected. What is the MOST likely cause?</p>
<ul>
<li>A) Overfitting due to too many features</li>
<li>B) Underfitting due to low model complexity</li>
<li>C) Data leakage — the feature is derived from post-churn activity ✓</li>
<li>D) Class imbalance</li>
</ul>
<p><em>Explanation: This is classic target leakage — "days_since_last_call" may reflect churn behavior after the fact (customers call to cancel). This future information isn't available in production, causing the model to fail.</em></p>
