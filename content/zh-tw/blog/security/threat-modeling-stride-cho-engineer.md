---
id: 019d0001-1002-7002-b002-000000000002
title: '工程師的實用威脅模型:60 分鐘內用 STRIDE 跑過 DFD'
slug: threat-modeling-stride-cho-engineer
excerpt: >-
  威脅模型不必是 50 頁的文件。一場 60 分鐘的會議,搭配 DFD level 1、STRIDE 與
  風險登錄表,就足以避開稽核與 pentest 中常見的設計缺陷類型。
featured_image: /images/blog/threat-modeling-stride-featured.webp
type: blog
reading_time: 9
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
  - name: threat-modeling
    slug: threat-modeling
  - name: stride
    slug: stride
  - name: secure-design
    slug: secure-design
comments: []
locale: zh-tw
---
<blockquote>大多數嚴重漏洞都源自設計階段,而非寫程式階段。一個及早做、有 owner 的輕量威脅模型,價值遠勝過上線後一份 100 頁的 pentest 報告。</blockquote>

<h2 id="threat-model-la-gi">什麼是威脅模型?</h2>
<p>威脅模型是回答 Adam Shostack 四個問題的過程:</p>
<ol>
  <li><strong>What are we working on?</strong> — 畫出資料流程圖 (DFD)。</li>
  <li><strong>What can go wrong?</strong> — 套用 STRIDE 列出威脅。</li>
  <li><strong>What are we going to do about it?</strong> — 緩解措施,或由人負責的「accept risk」。</li>
  <li><strong>Did we do a good job?</strong> — 部署後再檢視。</li>
</ol>

<h2 id="stride-mot-phut-hieu">一分鐘看懂 STRIDE</h2>
<table>
  <thead><tr><th>威脅</th><th>違反屬性</th><th>範例</th></tr></thead>
  <tbody>
    <tr><td>Spoofing (假冒)</td><td>Authentication</td><td>偽造使用者、token 被重用</td></tr>
    <tr><td>Tampering (竄改)</td><td>Integrity</td><td>修改請求、修改 DB 中資料</td></tr>
    <tr><td>Repudiation (否認)</td><td>Non-repudiation</td><td>稽核日誌不足以證明操作</td></tr>
    <tr><td>Information disclosure (資訊洩漏)</td><td>Confidentiality</td><td>洩漏 PII、透過日誌洩漏金鑰</td></tr>
    <tr><td>Denial of service (阻斷服務)</td><td>Availability</td><td>暴力破解、slowloris、昂貴查詢</td></tr>
    <tr><td>Elevation of privilege (權限提升)</td><td>Authorization</td><td>IDOR、跳出 sandbox、容器逃逸</td></tr>
  </tbody>
</table>

<h2 id="ve-dfd-dung-cap">畫出正確層級的 DFD</h2>
<p>DFD 上需要四種元素:</p>
<ul>
  <li><strong>External entity</strong>:使用者、第三方 API。</li>
  <li><strong>Process</strong>:服務、函式。</li>
  <li><strong>Data store</strong>:資料庫、S3、queue。</li>
  <li><strong>Data flow</strong>:元素之間的箭頭。</li>
</ul>
<p>最重要的是<strong>信任邊界 (trust boundary)</strong>:不同信任等級區域之間的界線 (Internet ↔ web tier、app ↔ DB、租戶 A ↔ 租戶 B)。每條穿越信任邊界的箭頭,都是需要驗證、檢核、加密的點。</p>
<p>從 DFD level 1 開始 (1 個服務 + 直接相依)。不要畫過於籠統的 level 0,也不要鑽到 level 3——既花時間,又不會產生新的決策資訊。</p>

<h2 id="apply-stride-tren-tung-element">在每個元素上套用 STRIDE</h2>
<p>實用小技巧:對 DFD 上每個元素,問 6 個 STRIDE 問題。不必每個格子都硬擠出威脅——不合理就略過。記入下表:</p>
<pre><code>| Element        | Threat | 描述                                     | Mitigation             | Owner | Severity |
| -------------- | ------ | ---------------------------------------- | ---------------------- | ----- | -------- |
| Login endpoint | S      | 對帳號暴力破解                           | Rate limit + MFA       | @team | High     |
| Login endpoint | I      | 透過錯誤訊息洩漏使用者列舉               | Generic error message  | @team | Medium   |
| Upload service | T      | 儲存體上的檔案 replace race              | Versioning + checksum  | @team | Medium   |
| Order DB       | E      | 查詢 /orders/{id} 時的 IDOR              | 依 owner 做 authz 檢查 | @team | High     |
</code></pre>

<h2 id="cham-diem-rui-ro">風險評分</h2>
<p>兩個常見方案:</p>
<ul>
  <li><strong>CVSS v3.1/v4</strong>:業界標準,適合具體漏洞,有可分享的標準 vector。</li>
  <li><strong>OWASP Risk Rating</strong>:簡單 (Likelihood × Impact),容易向非技術 stakeholder 解釋。</li>
</ul>
<p>在組織內統一選 1 種,並寫入手冊。不要讓每個團隊各自發明評分標準——之後無法相互比較。</p>

<h2 id="risk-register-la-tai-san-song">風險登錄表是活的資產</h2>
<p>威脅模型不是一次性文件。風險登錄表需要:</p>
<ul>
  <li>每個風險都有 owner。</li>
  <li>有緩解 deadline 或接受風險的理由。</li>
  <li>每季或在重大架構變動時重新檢視。</li>
  <li>連結到 issue tracker,讓 mitigation 真的有 ticket 可追。</li>
</ul>

<h2 id="khi-nao-can-linddun-pasta">什麼時候該用 LINDDUN、PASTA?</h2>
<p>預設使用 STRIDE。可考慮加入:</p>
<ul>
  <li><strong>LINDDUN</strong>:當服務處理大量 PII/PHI、需要針對隱私做威脅建模時 (Linkability、Identifiability、Non-repudiation、Detectability、Disclosure、Unawareness、Non-compliance)。</li>
  <li><strong>PASTA</strong>:需要把威脅模型與商業風險細節綁在一起時,有 7 個正式階段——適合銀行、醫療等關鍵系統。</li>
</ul>

<h2 id="ket-luan">結論</h2>
<p>威脅模型不是魔法。一場 60 分鐘的會議搭配 DFD level 1、STRIDE 檢查表與風險登錄表,就足以幫一個服務避開大部分設計缺陷。定期重複、有 owner、寫入 ADR——這就是把威脅模型變成技術習慣,而不是年度活動的方式。</p>
