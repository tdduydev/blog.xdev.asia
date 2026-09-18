---
id: 019d0001-1008-7008-b008-000000000008
title: '工程師看的合規:ISO 27001、SOC 2、PCI DSS v4 與越南第13/2023號政令'
slug: compliance-iso27001-pci-nd13-cho-engineer
excerpt: >-
  工程師不必背下每條 control,但要知道如何把 control 對應到管線、並自動產生 evidence。
  本文整理 4 個常見框架,以及如何在 DevSecOps 中落實 compliance-as-code。
featured_image: /images/blog/compliance-engineer-featured.webp
type: blog
reading_time: 11
view_count: 0
meta: null
published_at: '2026-05-08T00:00:00.000000Z'
created_at: '2026-05-08T00:00:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9616-cat5-7005-a005-000000000005
  name: 資安
  slug: security
tags:
  - name: devsecops
    slug: devsecops
  - name: compliance
    slug: compliance
  - name: iso-27001
    slug: iso-27001
  - name: soc-2
    slug: soc-2
  - name: pci-dss
    slug: pci-dss
  - name: nghi-dinh-13
    slug: nghi-dinh-13
comments: []
locale: zh-tw
---
<blockquote>合規不是給稽核員看的 PowerPoint。做對時,每條 control 都會成為管線中的一個自動化片段——而 evidence 則是出貨軟體的副產品。</blockquote>

<h2 id="bon-khung-pho-bien">四個常見框架——本質是什麼?</h2>
<table>
  <thead><tr><th>框架</th><th>目標</th><th>適用情境</th></tr></thead>
  <tbody>
    <tr><td>ISO/IEC 27001:2022</td><td>Information Security Management System (ISMS)——整體治理</td><td>任何想取得國際資安治理認證的組織</td></tr>
    <tr><td>SOC 2 (AICPA)</td><td>Trust Service Criteria (Security、Availability、Confidentiality、Processing Integrity、Privacy)</td><td>美國 B2B SaaS;企業客戶常在 RFP 中要求</td></tr>
    <tr><td>PCI DSS v4.0</td><td>保護持卡人資料</td><td>任何儲存/處理/傳輸支付卡資料的組織</td></tr>
    <tr><td>越南第13/2023/NĐ-CP號政令</td><td>越南個人資料保護</td><td>處理越南公民 PII 的所有組織</td></tr>
  </tbody>
</table>

<h2 id="iso-27001">ISO 27001:2022——工程師需要掌握什麼?</h2>
<p>2022 版在 Annex A 有 93 條 control,分為 4 大主題:Organizational、People、Physical、Technological。多數「Technological」control 直接對應到 DevSecOps 管線:</p>
<ul>
  <li>A.8.8 Management of technical vulnerabilities → SCA + SBOM + Dependency-Track + 修復 SLA。</li>
  <li>A.8.25 Secure development life cycle → SDLC 文件、威脅模型、code review。</li>
  <li>A.8.28 Secure coding → SAST + linter + secure coding 訓練。</li>
  <li>A.8.29 Security testing → DAST、定期 pentest、IR 演練。</li>
  <li>A.8.32 Change management → branch protection、ticket 驅動的部署、稽核日誌。</li>
</ul>
<p>工程師不必背編號,但要知道自己的工具對應到哪條 control,當稽核員問起時,可以直接指向 dashboard/log。</p>

<h2 id="soc-2">SOC 2 Type II</h2>
<p>SOC 2 不是發「認證」,而是 CPA 出具的報告。Type II 比 Type I 更重要,因為它檢視 control 在一段期間內的有效性 (通常 6-12 個月)。工程師需要定期準備 evidence:</p>
<ul>
  <li>每季的 access review:誰擁有什麼權限、持續多久。</li>
  <li>Change ticket 與 PR/部署綁定:每個 production 變更都能追溯到請求來源。</li>
  <li>實際的 backup 測試 (不是只跑 backup)。</li>
  <li>依 SLA 的漏洞管理報告。</li>
  <li>IR 演練報告 (tabletop、post-mortem)。</li>
</ul>
<p>小提示:使用 <strong>compliance automation</strong> (Vanta、Drata、Secureframe) 自動從 AWS/GCP、GitHub、Okta、MDM 拉取 evidence——可減少 80% 的人工蒐集工作。</p>

<h2 id="pci-dss-v4">PCI DSS v4.0——工程師容易忽略的重點</h2>
<ul>
  <li><strong>Scope minimization</strong>:tokenization 並把支付外包給 payment processor,以縮小 Cardholder Data Environment (CDE),從而減少適用的 control 數量。</li>
  <li>v4 的 <strong>customised approach</strong>:允許自行設計 control 只要達成目標即可——適合 cloud-native 環境,但需要詳細文件。</li>
  <li><strong>處處 MFA</strong>:自 2025 年起,進入 CDE 的所有存取都強制 MFA。</li>
  <li><strong>Targeted Risk Analysis</strong>:v4 中許多 control 要求以 risk analysis 決定 review/test 頻率。</li>
  <li><strong>Software security</strong>:Req 6 擴大要求 bespoke + custom 軟體的盤點 (相當於內部程式碼的 SBOM)。</li>
</ul>

<h2 id="nghi-dinh-13-2023">越南第13/2023/NĐ-CP號政令與《個人資料保護法》</h2>
<p>工程師需要記住的核心要點:</p>
<ul>
  <li><strong>分類</strong>:基本個人資料與<em>敏感</em>個人資料 (健康、生物特徵、政治、宗教、財務、位置、犯罪紀錄等)。適用不同 control。</li>
  <li><strong>個人資料處理影響評估</strong> (相當於 DPIA):對規模/敏感度高的系統強制執行,需保存紀錄。</li>
  <li><strong>同意</strong>必須明確、可撤回,不得與其他條款綁在一起。</li>
  <li><strong>72 小時內通報資料外洩</strong>事件,自知悉起算,通報越南公安部 A05 局。</li>
  <li><strong>跨境資料傳輸</strong>:必須有評估文件,某些類型資料須在規定期限內保留於越南境內。</li>
</ul>
<p>對應到技術面:</p>
<ul>
  <li>在 DB 與資料目錄中加入 data classification tag。</li>
  <li>對敏感欄位採用 pseudonymization/encryption,並透過 KMS 管理金鑰。</li>
  <li>對敏感資料存取建立稽核日誌,依政策保存 retention。</li>
  <li>72 小時 breach runbook:誰發現 → triage → 通報 → 紀錄。</li>
  <li>當有新 PII 出現時,以 feature toggle 觸發 DPIA 範本。</li>
</ul>

<h2 id="compliance-as-code">Compliance-as-code:從管線產出 evidence</h2>
<p>不要等到稽核期才人工蒐集,而是把 evidence 當成管線的 artifact 自動產生:</p>
<ul>
  <li>Branch protection 截圖 → 每月透過 GitHub API 匯出,存入 evidence bucket。</li>
  <li>每次部署綁定 change ticket id 與 sign-off → 查詢 Loki/CloudTrail 自動產生報告。</li>
  <li>Access review 自動 dump IAM、Okta group、K8s RBAC → 與 HRIS 比對找出 orphan account。</li>
  <li>Backup 驗證任務每週實際 restore 到 ephemeral 環境並比對 checksum。</li>
  <li>Dependency-Track + DefectDojo 的漏洞儀表板直接成為「exhibit」。</li>
</ul>

<h2 id="control-mapping-mau">Control mapping 範例——一行 evidence</h2>
<table>
  <thead><tr><th>Control</th><th>工具</th><th>Evidence 檔案</th><th>頻率</th></tr></thead>
  <tbody>
    <tr><td>ISO A.8.8 / SOC2 CC7.1</td><td>Trivy + Dependency-Track</td><td>monthly-vuln-report.pdf</td><td>每月</td></tr>
    <tr><td>ISO A.8.32 / SOC2 CC8.1</td><td>GitHub branch protection</td><td>branch-protection.json</td><td>每季</td></tr>
    <tr><td>PCI Req 8 / SOC2 CC6.1</td><td>Okta + IdP report</td><td>access-review-Q&lt;n&gt;.csv</td><td>每季</td></tr>
    <tr><td>越南政令第13號 第25條</td><td>稽核日誌查詢</td><td>pii-access-log-monthly.json</td><td>每月</td></tr>
  </tbody>
</table>

<h2 id="ket-luan">結論</h2>
<p>合規是系統性投資的契機,而不是一年一次的事件。當你知道適用哪個框架、能對應到技術 control、自動產生 evidence 後,稽核期就只剩匯出報告而已。更重要的是:系統真的更安全——這正是 DevSecOps 追求的目標。</p>
