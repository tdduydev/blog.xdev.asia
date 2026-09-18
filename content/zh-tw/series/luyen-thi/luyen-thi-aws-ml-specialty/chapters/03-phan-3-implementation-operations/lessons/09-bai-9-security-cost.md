---
id: bb3d4aa7-2e63-49f6-a751-6323c5919325
title: '第9課：安全性與成本最佳化'
slug: bai-9-security-cost
description: >-
  SageMaker的IAM角色和政策。VPC設定、PrivateLink。
  靜態加密（KMS）和傳輸加密。Spot Training Instances。
  S3生命週期政策。執行個體適當調整。
duration_minutes: 45
is_free: true
video_url: null
sort_order: 9
section_title: "第3部分：ML實作與維運（20%）"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認證機器學習 - 專業級 考試準備'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai9-security-architecture.webp" alt="AWS ML Security Architecture" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>AWS ML安全性：IAM角色、VPC隔離、KMS加密與Spot Instances成本最佳化</em></p>
</div>

<h2 id="iam-sagemaker"><strong>1. SageMaker的IAM</strong></h2>

<p>SageMaker使用<strong>IAM角色</strong>（而非使用者）來對AWS資源執行操作。這是考試中重要的安全模式。</p>

<table>
<thead><tr><th>角色類型</th><th>使用者</th><th>需要存取</th></tr></thead>
<tbody>
<tr><td><strong>執行角色</strong></td><td>SageMaker筆記本、訓練工作、端點</td><td>S3、ECR、CloudWatch、KMS</td></tr>
<tr><td><strong>SageMaker Studio角色</strong></td><td>Studio IDE使用者</td><td>數據、實驗、管線</td></tr>
<tr><td><strong>訓練工作角色</strong></td><td>訓練容器本身</td><td>輸入/輸出S3儲存桶</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> SageMaker訓練/推論容器沒有EC2執行個體憑證 — 它們使用跨帳戶IAM角色執行。務必為執行角色授予S3和ECR權限。</p>
</blockquote>

<h2 id="vpc-security"><strong>2. SageMaker的VPC設定</strong></h2>

<p>在<strong>VPC</strong>中執行SageMaker工作負載，確保流量不經過公共網際網路。</p>

<pre><code class="language-text">SageMaker Network Security:

Internet ──✗────────────────────────────────────────
                                                    │
          ┌─── Private VPC ──────────────────────┐ │
          │                                       │ │
          │  SageMaker Training Instance          │ │
          │          ↓ (VPC Endpoint)             │ │
          │  ┌──── S3 Gateway Endpoint ────────┐  │ │
          │  │   ECR VPC Endpoint              │  │ │
          │  │   SageMaker API VPC Endpoint    │  │ │
          │  └─────────────────────────────────┘  │ │
          └───────────────────────────────────────┘ │
</code></pre>

<table>
<thead><tr><th>功能</th><th>說明</th></tr></thead>
<tbody>
<tr><td><strong>VPC端點（PrivateLink）</strong></td><td>無需網際網路即可存取S3、ECR、SageMaker API</td></tr>
<tr><td><strong>安全群組</strong></td><td>控制訓練執行個體的入站/出站流量</td></tr>
<tr><td><strong>網路隔離</strong></td><td>訓練工作沒有網際網路存取（隔離模式）</td></tr>
<tr><td><strong>容器間加密</strong></td><td>加密分散式訓練流量</td></tr>
</tbody>
</table>

<h2 id="encryption"><strong>3. 加密</strong></h2>

<table>
<thead><tr><th>項目</th><th>方式</th><th>服務</th></tr></thead>
<tbody>
<tr><td><strong>S3靜態數據</strong></td><td>SSE-S3、SSE-KMS、SSE-C</td><td>S3 + KMS</td></tr>
<tr><td><strong>靜態模型產出物</strong></td><td>輸出S3儲存桶的KMS金鑰</td><td>KMS</td></tr>
<tr><td><strong>EBS磁碟區（訓練）</strong></td><td>執行個體儲存的KMS加密</td><td>KMS</td></tr>
<tr><td><strong>傳輸中數據</strong></td><td>所有API呼叫使用TLS 1.2/1.3</td><td>預設</td></tr>
<tr><td><strong>分散式訓練流量</strong></td><td>啟用容器間加密</td><td>SageMaker設定</td></tr>
</tbody>
</table>

<h2 id="cost-optimization"><strong>4. 成本最佳化策略</strong></h2>

<table>
<thead><tr><th>策略</th><th>節省幅度</th><th>方式</th></tr></thead>
<tbody>
<tr><td><strong>Spot Instances</strong></td><td>高達90%</td><td>訓練工作 + 檢查點</td></tr>
<tr><td><strong>適當調整</strong></td><td>20-40%</td><td>將執行個體類型與實際GPU/CPU使用量匹配</td></tr>
<tr><td><strong>無伺服器推論</strong></td><td>不定</td><td>按調用付費、無閒置成本</td></tr>
<tr><td><strong>SageMaker Savings Plans</strong></td><td>高達64%</td><td>承諾持續使用量</td></tr>
<tr><td><strong>S3 Intelligent-Tiering</strong></td><td>不定</td><td>自動分層舊訓練數據</td></tr>
<tr><td><strong>生命週期設定</strong></td><td>不定</td><td>自動停止閒置筆記本</td></tr>
</tbody>
</table>

<h3 id="s3-lifecycle"><strong>4.1. ML數據的S3生命週期政策</strong></h3>

<pre><code class="language-text">Data Lifecycle for ML:

  Active Training Data (S3 Standard)
           ↓ after 30 days unused
  S3 Intelligent-Tiering
           ↓ after 90 days
  S3 Standard-IA (Infrequent Access)
           ↓ after 180 days
  S3 Glacier Instant Retrieval
           ↓ after 1 year
  S3 Glacier Deep Archive (compliance)
</code></pre>

<h2 id="compliance"><strong>5. 合規框架</strong></h2>

<table>
<thead><tr><th>框架</th><th>ML相關性</th></tr></thead>
<tbody>
<tr><td><strong>HIPAA</strong></td><td>醫療ML — PHI數據加密、稽核日誌、需要BAA</td></tr>
<tr><td><strong>GDPR</strong></td><td>歐盟數據 — 被遺忘權、數據最小化、同意</td></tr>
<tr><td><strong>SOC 2</strong></td><td>SaaS ML產品的安全控制稽核</td></tr>
<tr><td><strong>PCI DSS</strong></td><td>ML模型中的支付卡數據</td></tr>
</tbody>
</table>

<h2 id="cheat-sheet"><strong>6. 速查表 — 安全性與成本</strong></h2>

<table>
<thead><tr><th>情境</th><th>解決方案</th></tr></thead>
<tbody>
<tr><td>SageMaker訓練無網際網路</td><td>VPC + 網路隔離 + VPC端點</td></tr>
<tr><td>加密S3上的訓練數據</td><td>SSE-KMS搭配客戶管理金鑰</td></tr>
<tr><td>降低70%以上訓練成本</td><td>Spot Instances + 檢查點</td></tr>
<tr><td>自動封存舊訓練數據集</td><td>S3生命週期政策</td></tr>
<tr><td>防止筆記本閒置成本</td><td>Studio生命週期設定 → 自動關閉</td></tr>
<tr><td>醫療數據（HIPAA）</td><td>KMS + VPC + CloudTrail + 與AWS簽訂BAA</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. 練習題</strong></h2>

<p><strong>Q1:</strong> 一家公司需要SageMaker訓練工作在存取S3數據時不經過公共網際網路，以符合安全合規要求。應該如何設定？</p>
<ul>
<li>A) VPC Flow Logs</li>
<li>B) SageMaker Training搭配VPC + S3 VPC Gateway Endpoint ✓</li>
<li>C) 帶IP限制的IAM政策</li>
<li>D) AWS Shield</li>
</ul>
<p><em>解析：設定SageMaker Training Jobs在VPC中執行，搭配S3 VPC Gateway Endpoint，確保所有S3流量留在AWS網路內而不經過公共網際網路。</em></p>

<p><strong>Q2:</strong> 機器學習團隊想要降低可中斷的長時間訓練工作成本。工作應該能從停止處恢復。最具成本效益的方法是什麼？</p>
<ul>
<li>A) 使用更大的執行個體來加快完成速度</li>
<li>B) 使用Reserved Instances</li>
<li>C) 使用Spot Instances搭配S3檢查點 ✓</li>
<li>D) 在本地執行訓練</li>
</ul>
<p><em>解析：Spot Instances可節省高達90%的成本。啟用檢查點（定期將模型狀態儲存至S3）後，被中斷的工作可從最後一個檢查點恢復，使Spot Instances適用於長時間訓練。</em></p>

<p><strong>Q3:</strong> 哪個AWS服務提供集中式金鑰管理，用於加密SageMaker訓練數據、模型產出物和EBS磁碟區？</p>
<ul>
<li>A) AWS Secrets Manager</li>
<li>B) AWS IAM</li>
<li>C) AWS KMS（Key Management Service） ✓</li>
<li>D) AWS Certificate Manager</li>
</ul>
<p><em>解析：AWS KMS提供靜態加密的金鑰管理，涵蓋S3數據（SSE-KMS）、訓練執行個體使用的EBS磁碟區和模型產出物。SageMaker在整個訓練和部署工作流中原生整合KMS。</em></p>
