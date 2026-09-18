---
id: 019d0001-1001-7001-b001-000000000001
title: 'DevSecOps 與 Shift-Left：為何資安該在管線中執行，而不是放到最後關頭'
slug: devsecops-shift-left-mindset
excerpt: >-
  Shift-left 並不是把工作丟給開發者,而是把資安控制自動化到最容易產生缺陷的地方,
  讓團隊能快速修復,並讓資安成為系統的預設屬性。
featured_image: /images/blog/devsecops-shift-left-featured.webp
type: blog
reading_time: 8
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
  - name: shift-left
    slug: shift-left
  - name: sdlc
    slug: sdlc
  - name: security
    slug: security
comments: []
locale: zh-tw
---
<blockquote>在許多組織中,資安審查仍是上線前最後一道關卡。等到那時才發現漏洞,修復成本是在程式碼審查階段發現的 30-100 倍。Shift-left 解決這個問題的方式,不是拿掉最後檢查,而是把控制點往生命週期的更早階段推進。</blockquote>

<h2 id="vi-sao-can-shift-left">為什麼需要 shift-left?</h2>
<p>「資安即關卡」模式——在 SDLC 末端放一道人工審查——無法跟上現代發布節奏。當 CI/CD 團隊一天部署多次時,不可能等一位資安工程師審查每個 pull request。常見後果:</p>
<ul>
  <li>資安成為瓶頸,開發團隊想方設法繞過。</li>
  <li>缺陷晚發現,修復成本高,有時甚至需要重做架構。</li>
  <li>稽核報告厚厚一本,卻無法反映系統真實狀態。</li>
</ul>
<p>Shift-left 的解法是把<em>末端檢查</em>轉換為<em>持續守門 (guardrail)</em>:SDLC 的每個階段都有合適、自動化的資安控制,並在開發者工作的當下就提供回饋。</p>

<h2 id="shift-left-khong-phai-la-gi">Shift-left 不是什麼</h2>
<p>幾個常見誤解:</p>
<ul>
  <li><strong>不是把所有責任推給開發者。</strong>開發者寫程式,但資安團隊提供工具、規則集、威脅模型範本與輔導。Champion 模式是擴展知識的關鍵。</li>
  <li><strong>不是取消最終 pentest。</strong>Pentest、red team、bug bounty 仍是抓邏輯漏洞與 0-day 不可或缺的環節。Shift-left 只是減少送到 pentester 手上的基礎缺陷數量。</li>
  <li><strong>不是一次打開所有工具。</strong>同時在 100 個 repo 上開啟 SAST + DAST + SCA + secret scan,只會造成警報疲勞並讓計畫失去支持。</li>
</ul>

<h2 id="ban-do-control-theo-sdlc">沿著 SDLC 的控制地圖</h2>
<p>從左到右的參考對照:</p>
<table>
  <thead><tr><th>階段</th><th>典型控制</th><th>工具範例</th></tr></thead>
  <tbody>
    <tr><td>需求</td><td>輕量威脅模型、abuse case</td><td>OWASP Threat Dragon、Microsoft TMT</td></tr>
    <tr><td>設計</td><td>安全設計審查、資料分級</td><td>Architecture Decision Record (ADR)</td></tr>
    <tr><td>程式碼</td><td>Linter、SAST、pre-commit secret scan</td><td>Semgrep、Gitleaks、ESLint security plugin</td></tr>
    <tr><td>建置</td><td>SCA、SBOM、容器掃描、簽署</td><td>Trivy、Grype、Syft、Cosign</td></tr>
    <tr><td>部署</td><td>IaC 掃描、admission policy</td><td>Checkov、Kyverno、OPA Gatekeeper</td></tr>
    <tr><td>執行階段</td><td>WAF、runtime detection、稽核日誌</td><td>Falco、Cilium Tetragon、SIEM</td></tr>
    <tr><td>維運</td><td>定期 DAST、IR、post-mortem</td><td>OWASP ZAP、PagerDuty、Sigma</td></tr>
  </tbody>
</table>

<h2 id="bat-dau-tu-dau">如果公司還什麼都沒有,該從哪裡開始?</h2>
<p>根據成本/效益權衡的優先順序:</p>
<ol>
  <li><strong>Secret scanning</strong> 在 pre-commit 與 CI 端。便宜、容易快速見效,能阻擋成本最高的事故類型。</li>
  <li><strong>SCA + SBOM</strong>,讓你知道系統用了哪些套件。當新 CVE 公布時,能在幾分鐘而非幾天內回答「我們是否受影響?」</li>
  <li><strong>Branch protection + signed commit + pinned action SHA</strong>。保護管線本身免於 pipeline attack——成本幾乎為零。</li>
  <li>對最關鍵的服務做<strong>一頁式威脅模型</strong>。光是在簡單 DFD 上跑 STRIDE,就能避開一整類設計缺陷。</li>
  <li>之後再擴展 SAST、DAST、容器與 IaC 掃描。</li>
</ol>

<h2 id="ket-noi-voi-maturity-model">與 maturity model 連結</h2>
<p>要知道自己在哪、下一步怎麼走,可用 <strong>OWASP SAMM 2.0</strong> 或 <strong>BSIMM</strong> 對 5-15 個關鍵 practice 評分。目標不是讓所有 practice 都到 Level 3,而是每季挑 2-3 個重點領域從 Level 1 升到 Level 2。搭配可量化的指標與 OKR (漏洞 MTTR、掃描覆蓋率、有威脅模型的服務比例),能讓管理層看見價值並持續投資。</p>

<h2 id="ket-luan">結論</h2>
<p>Shift-left 是策略,不是工具。目標是把資安變成<em>自動化守門</em>,有指標、有 owner、在缺陷產生當下就回饋。從幾個快速勝利開始 (secret、SCA、branch protection),再依 maturity 擴展。當一切上手後,資安不再是阻擋發布的關卡,而是管線的自然節奏。</p>
