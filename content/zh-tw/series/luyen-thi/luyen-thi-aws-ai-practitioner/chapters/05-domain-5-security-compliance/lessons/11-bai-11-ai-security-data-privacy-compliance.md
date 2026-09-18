---
id: 019c9619-lt01-d5-l11
title: '第11課：AI安全性、資料隱私與合規'
slug: bai-11-ai-security-data-privacy-compliance
description: >-
  AI/ML工作負載的IAM。靜態與傳輸中加密。
  Bedrock/SageMaker的VPC端點。PII偵測。
  AWS合規計畫。AI的資料治理。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 1
section_title: "領域5：AI安全性、合規與治理（14%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS AI Practitioner（AIF-C01）認證備考'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai11-ai-security-layers.webp" alt="AWS上的AI安全層級" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>AI安全層級：AWS上的網路、身份、資料保護和AI特定控制</em></p>
</div>

<h2 id="security-overview"><strong>1. AWS上的AI安全——概覽</strong></h2>

<p>AI工作負載需要<strong>多層</strong>安全：資料、模型、基礎設施和應用程式。</p>

<pre><code class="language-text">AI安全層級：
┌─────────────────────────────────────────┐
│  應用程式安全                             │
│  Guardrails、輸入驗證、                   │
│  提示注入防護                             │
├─────────────────────────────────────────┤
│  模型安全                                │
│  模型存取控制、版本管理、                  │
│  模型完整性、對抗性防禦                    │
├─────────────────────────────────────────┤
│  資料安全                                │
│  加密、PII處理、資料存取                  │
│  控制、稽核日誌                           │
├─────────────────────────────────────────┤
│  基礎設施安全                             │
│  VPC、安全群組、端點、                    │
│  網路隔離、IAM                           │
└─────────────────────────────────────────┘
</code></pre>

<h2 id="iam"><strong>2. AI/ML工作負載的IAM</strong></h2>

<h3 id="iam-bedrock"><strong>2.1. Amazon Bedrock的IAM</strong></h3>

<table>
<thead><tr><th>權限</th><th>控制內容</th></tr></thead>
<tbody>
<tr><td><code>bedrock:InvokeModel</code></td><td>呼叫特定的FM</td></tr>
<tr><td><code>bedrock:InvokeModelWithResponseStream</code></td><td>串流模型呼叫</td></tr>
<tr><td><code>bedrock:CreateKnowledgeBase</code></td><td>建立RAG知識庫</td></tr>
<tr><td><code>bedrock:CreateGuardrail</code></td><td>建立安全防護機制</td></tr>
<tr><td><code>bedrock:CreateModelCustomizationJob</code></td><td>啟動微調作業</td></tr>
</tbody>
</table>

<h3 id="iam-principles"><strong>2.2. AI的IAM最佳實踐</strong></h3>

<ul>
<li><strong>最小權限</strong>：每個角色只授予所需的權限</li>
<li><strong>分離角色</strong>：資料科學家、ML工程師、管理員使用不同角色</li>
<li><strong>基於資源的政策</strong>：限制對特定模型的存取</li>
<li><strong>服務關聯角色</strong>：讓AWS服務根據需要承擔角色</li>
<li><strong>條件鍵</strong>：按IP、VPC、時間、MFA限制</li>
</ul>

<blockquote>
<p><strong>考試提示：</strong>「如何限制團隊在Bedrock中可以使用哪些基礎模型？」→ 使用<code>bedrock:InvokeModel</code>和特定模型的<strong>資源ARN</strong>的IAM政策。</p>
</blockquote>

<h2 id="encryption"><strong>3. 資料加密</strong></h2>

<h3 id="encryption-rest"><strong>3.1. 靜態加密</strong></h3>

<table>
<thead><tr><th>服務</th><th>預設加密</th><th>自訂金鑰（KMS）</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Bedrock</strong></td><td>AWS託管金鑰</td><td>客戶託管KMS金鑰</td></tr>
<tr><td><strong>SageMaker訓練</strong></td><td>AWS託管金鑰</td><td>客戶託管KMS金鑰</td></tr>
<tr><td><strong>SageMaker筆記本</strong></td><td>AWS託管金鑰</td><td>客戶託管KMS金鑰</td></tr>
<tr><td><strong>S3（訓練資料）</strong></td><td>SSE-S3</td><td>SSE-KMS、SSE-C</td></tr>
<tr><td><strong>Knowledge Bases向量</strong></td><td>取決於向量資料庫</td><td>支援KMS加密</td></tr>
</tbody>
</table>

<h3 id="encryption-transit"><strong>3.2. 傳輸中加密</strong></h3>

<ul>
<li>所有AWS API呼叫預設使用<strong>TLS 1.2+</strong></li>
<li>Bedrock API呼叫在傳輸中加密</li>
<li>SageMaker端點使用HTTPS</li>
<li>節點間訓練通訊：加密</li>
</ul>

<h3 id="kms"><strong>3.3. AI的AWS KMS</strong></h3>

<pre><code class="language-text">在以下情況使用AWS KMS：
✓ 需要控制加密金鑰
✓ 金鑰輪換政策
✓ CloudTrail金鑰使用稽核
✓ 跨帳戶金鑰共享
✓ 合規要求（HIPAA、PCI-DSS）
</code></pre>

<h2 id="network"><strong>4. 網路安全</strong></h2>

<h3 id="vpc-endpoints"><strong>4.1. AI服務的VPC端點</strong></h3>

<p><strong>VPC端點</strong>允許私有存取AWS AI服務——流量不經過網際網路。</p>

<pre><code class="language-text">沒有VPC端點：
VPC中的應用 → 網際網路閘道 → 公共網際網路 → Bedrock API

有VPC端點（PrivateLink）：
VPC中的應用 → VPC端點 → AWS私有網路 → Bedrock API
               （無需網際網路！）
</code></pre>

<table>
<thead><tr><th>服務</th><th>VPC端點類型</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Bedrock</strong></td><td>介面（PrivateLink）</td></tr>
<tr><td><strong>SageMaker Runtime</strong></td><td>介面（PrivateLink）</td></tr>
<tr><td><strong>SageMaker API</strong></td><td>介面（PrivateLink）</td></tr>
<tr><td><strong>Amazon S3</strong></td><td>閘道或介面</td></tr>
</tbody>
</table>

<h3 id="sagemaker-network"><strong>4.2. SageMaker網路隔離</strong></h3>

<ul>
<li><strong>VPC模式</strong>：在你的VPC內執行訓練/推理</li>
<li><strong>網路隔離</strong>：容器無網際網路存取（EnableNetworkIsolation=true）</li>
<li><strong>安全群組</strong>：控制進出流量</li>
<li><strong>私有子網路</strong>：無直接網際網路存取</li>
</ul>

<blockquote>
<p><strong>考試提示：</strong>「如何確保Bedrock API呼叫不經過公共網際網路？」→ Amazon Bedrock的<strong>VPC端點</strong>（AWS PrivateLink）。</p>
</blockquote>

<h2 id="pii"><strong>5. PII偵測與資料隱私</strong></h2>

<h3 id="pii-services"><strong>5.1. PII偵測服務</strong></h3>

<table>
<thead><tr><th>服務</th><th>PII功能</th><th>資料類型</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Comprehend</strong></td><td>偵測和遮蔽PII實體</td><td>文字</td></tr>
<tr><td><strong>Amazon Macie</strong></td><td>發現S3儲存桶中的PII</td><td>S3中的檔案</td></tr>
<tr><td><strong>Bedrock Guardrails</strong></td><td>在FM輸入/輸出中封鎖/匿名化PII</td><td>FM提示/回應</td></tr>
<tr><td><strong>AWS Glue DataBrew</strong></td><td>資料管線中的PII偵測</td><td>結構化資料</td></tr>
</tbody>
</table>

<h3 id="pii-types"><strong>5.2. 考試常見PII類型</strong></h3>

<table>
<thead><tr><th>PII類型</th><th>範例</th></tr></thead>
<tbody>
<tr><td><strong>直接識別符</strong></td><td>姓名、社會安全號碼、電子郵件、電話、護照號碼</td></tr>
<tr><td><strong>金融</strong></td><td>信用卡號碼、銀行帳號、稅務編號</td></tr>
<tr><td><strong>健康</strong></td><td>病歷號碼、健康狀況（PHI）</td></tr>
<tr><td><strong>位置</strong></td><td>住家地址、GPS座標</td></tr>
<tr><td><strong>數位</strong></td><td>IP位址、裝置ID、登入憑證</td></tr>
</tbody>
</table>

<h2 id="bedrock-security"><strong>6. Amazon Bedrock安全性</strong></h2>

<h3 id="bedrock-data"><strong>6.1. Bedrock中的資料隱私</strong></h3>

<ul>
<li><strong>資料隔離</strong>：你的資料不會被用來訓練基礎FM</li>
<li><strong>資料留在區域內</strong>：在你選擇的AWS區域處理</li>
<li><strong>自訂模型</strong>：微調的模型僅限你的帳戶私有</li>
<li><strong>無資料共享</strong>：你的提示/回應不會與模型供應商共享</li>
<li><strong>加密</strong>：所有資料在靜態和傳輸中都加密</li>
</ul>

<h3 id="bedrock-logging"><strong>6.2. 監控與日誌</strong></h3>

<table>
<thead><tr><th>服務</th><th>記錄內容</th></tr></thead>
<tbody>
<tr><td><strong>AWS CloudTrail</strong></td><td>API呼叫（誰呼叫了哪個模型、何時）</td></tr>
<tr><td><strong>Amazon CloudWatch</strong></td><td>模型呼叫指標（延遲、錯誤、token數）</td></tr>
<tr><td><strong>Bedrock Model Invocation Logging</strong></td><td>完整的提示和回應（至S3或CloudWatch）</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong>「如何稽核哪些使用者正在呼叫Bedrock模型？」→ <strong>CloudTrail</strong>。「如何記錄實際的提示和回應？」→ <strong>Bedrock Model Invocation Logging</strong>。</p>
</blockquote>

<h2 id="compliance"><strong>7. 合規與治理</strong></h2>

<h3 id="compliance-programs"><strong>7.1. AWS合規計畫</strong></h3>

<table>
<thead><tr><th>計畫</th><th>內容</th><th>相關AI服務</th></tr></thead>
<tbody>
<tr><td><strong>SOC 1/2/3</strong></td><td>安全控制稽核</td><td>Bedrock、SageMaker</td></tr>
<tr><td><strong>HIPAA</strong></td><td>醫療資料保護</td><td>SageMaker、Comprehend Medical</td></tr>
<tr><td><strong>GDPR</strong></td><td>歐盟資料隱私</td><td>所有AWS服務（資料駐留）</td></tr>
<tr><td><strong>PCI-DSS</strong></td><td>支付卡資料安全</td><td>SageMaker（搭配控制措施）</td></tr>
<tr><td><strong>FedRAMP</strong></td><td>美國政府雲端安全</td><td>GovCloud區域</td></tr>
<tr><td><strong>ISO 27001</strong></td><td>資訊安全管理</td><td>Bedrock、SageMaker</td></tr>
</tbody>
</table>

<h3 id="shared-responsibility"><strong>7.2. AI的共同責任模型</strong></h3>

<pre><code class="language-text">客戶責任（「雲端中的安全」）：
├── 訓練資料品質和偏差
├── 模型選擇和評估
├── 提示設計和guardrails設定
├── IAM權限和存取控制
├── PII處理和資料分類
├── 應用程式層級安全
└── 遵守行業法規

AWS責任（「雲端的安全」）：
├── 實體基礎設施安全
├── 網路和硬體安全
├── 基礎FM供應商管理
├── 服務可用性和可靠性
├── 加密實作
└── 合規認證
</code></pre>

<h2 id="data-governance"><strong>8. AI的資料治理</strong></h2>

<table>
<thead><tr><th>實踐</th><th>AWS服務</th></tr></thead>
<tbody>
<tr><td>資料編目</td><td>AWS Glue Data Catalog</td></tr>
<tr><td>資料分類</td><td>Amazon Macie</td></tr>
<tr><td>存取控制</td><td>AWS Lake Formation</td></tr>
<tr><td>資料血統</td><td>SageMaker ML Lineage Tracking</td></tr>
<tr><td>資料品質</td><td>SageMaker Data Wrangler、Glue DataBrew</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>9. 練習題</strong></h2>

<p><strong>Q1：</strong>一家金融服務公司想使用Amazon Bedrock，但要求API呼叫不經過公共網際網路。他們應該設定什麼？</p>
<ul>
<li>A) AWS Direct Connect</li>
<li>B) Bedrock的VPC端點（AWS PrivateLink） ✓</li>
<li>C) VPN連線</li>
<li>D) CloudFront分發</li>
</ul>
<p><em>解說：Amazon Bedrock的VPC介面端點（PrivateLink）允許從VPC內進行私有連線，流量無需經過網際網路。</em></p>

<p><strong>Q2：</strong>根據AWS共同責任模型，誰負責確保訓練資料不包含偏差？</p>
<ul>
<li>A) AWS</li>
<li>B) 基礎模型供應商</li>
<li>C) 客戶 ✓</li>
<li>D) AWS和客戶各承擔一半</li>
</ul>
<p><em>解說：在共同責任模型下，客戶負責「雲端中的安全」——包括訓練資料品質、偏差偵測和道德AI實踐。AWS負責基礎設施安全。</em></p>

<p><strong>Q3：</strong>一家公司需要在將資料用於ML訓練之前，發現哪些S3儲存桶包含個人身份資訊（PII）。他們應該使用哪個服務？</p>
<ul>
<li>A) Amazon Comprehend</li>
<li>B) Amazon Macie ✓</li>
<li>C) Amazon Inspector</li>
<li>D) AWS Config</li>
</ul>
<p><em>解說：Amazon Macie使用機器學習自動發現和分類存儲在Amazon S3儲存桶中的敏感資料（包括PII）。Comprehend偵測文字中的PII，但Macie是設計用於S3層級的發現。</em></p>
