---
id: 019d0001-1007-7007-b007-000000000007
title: 'DevSecOps 中的 Detection Engineering 與 Incident Response'
slug: incident-response-detection-engineering-devsecops
excerpt: >-
  良好的防禦需要三件事:結構化日誌、對應到 ATT&CK 的偵測規則,以及演練過的 IR
  runbook。本文整理 DevSecOps 團隊如何打造 detection-as-code 計畫與
  blameless 的 post-mortem。
featured_image: /images/blog/detection-ir-devsecops-featured.webp
type: blog
reading_time: 10
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
  - name: detection-engineering
    slug: detection-engineering
  - name: sigma
    slug: sigma
  - name: mitre-attack
    slug: mitre-attack
  - name: incident-response
    slug: incident-response
comments: []
locale: zh-tw
---
<blockquote>有日誌不代表有偵測,有警報不代表有回應。Detection engineering 是把原始事件轉化為可行動、有 owner、可量測 MTTD/MTTR 訊號的過程。</blockquote>

<h2 id="logging-truoc-khi-noi-detection">先談 logging,再談 detection</h2>
<p>沒有結構的日誌無法擴展。四個原則:</p>
<ul>
  <li><strong>結構化 JSON</strong>,使用標準欄位:<code>timestamp</code>、<code>service</code>、<code>env</code>、<code>request_id</code>、<code>user_id</code> (已 hash/redact)、<code>action</code>、<code>result</code>。</li>
  <li><strong>Correlation ID</strong> 貫穿服務、gateway、queue——使用 W3C Trace Context。</li>
  <li><strong>不要 log 原始 secret/PII</strong>。在共用 SDK 輸出 stdout 之前就 redact。</li>
  <li>敏感操作 (admin action、key access、資料匯出) 要有<strong>獨立的稽核日誌</strong>——schema 不同、retention 較長 (12-36 個月)。</li>
</ul>

<h2 id="nguon-log-quan-trong">應該串到 SIEM 的關鍵日誌來源</h2>
<table>
  <thead><tr><th>來源</th><th>偵測價值</th></tr></thead>
  <tbody>
    <tr><td>Cloud audit (CloudTrail、Activity Log)</td><td>異常 IAM、key 建立、出現於陌生 region</td></tr>
    <tr><td>K8s audit log (Metadata level)</td><td>RBAC 變更、exec 進入 pod、secret 存取</td></tr>
    <tr><td>Identity provider (Okta、Azure AD)</td><td>暴力破解、impossible travel、MFA 繞過</td></tr>
    <tr><td>應用程式稽核日誌</td><td>權限提升、大量資料匯出</td></tr>
    <tr><td>Falco / Tetragon</td><td>容器 runtime 行為</td></tr>
    <tr><td>WAF、CDN、gateway</td><td>暴力破解、scraping、anomaly</td></tr>
  </tbody>
</table>

<h2 id="sigma-detection-as-code">Sigma:detection-as-code</h2>
<p>Sigma 是用來描述偵測規則的標準 YAML 格式,獨立於 SIEM (可轉換為 Splunk SPL、ELK Lucene、Sentinel KQL 等)。範例:</p>
<pre><code class="language-yaml">title: K8s exec into production pod
id: 1f0e3aa8-...
status: stable
logsource:
  product: kubernetes
  service: audit
detection:
  selection:
    verb: create
    objectRef.subresource: exec
    objectRef.namespace|startswith: prod-
  condition: selection
level: high
tags:
  - attack.execution
  - attack.t1609   # container administration command
</code></pre>
<p>把規則存在 git 中,透過 PR 審查,加上 CI 測試 (positive/negative case)。這就是<strong>detection-as-code</strong>。</p>

<h2 id="map-mitre-attack">對應到 MITRE ATT&CK</h2>
<p>ATT&CK 把攻擊者行為分為 tactic (目標) 與 technique (手法)。把偵測對應到 ATT&CK 的好處:</p>
<ul>
  <li>知道自己在哪些 tactic 缺乏偵測 (例如 Initial Access 強,但 Lateral Movement、Exfiltration 弱)。</li>
  <li>對照 threat intel:鎖定我們所在產業的 APT 群組常用什麼 technique → 優先補上對應偵測。</li>
  <li>向管理層報告覆蓋率時更具體:「對我們的技術堆疊相關 technique 覆蓋率達 65%」。</li>
</ul>

<h2 id="ir-runbook-tabletop">IR runbook 與 tabletop 演練</h2>
<p>NIST PICERL 應變週期:Preparation → Identification → Containment → Eradication → Recovery → Lessons learned。每份 runbook 都應包含:</p>
<ul>
  <li><strong>Severity matrix</strong>:SEV1/2/3 對應的回應 SLA。</li>
  <li>明確的 <strong>on-call rotation</strong> 與升級路徑。</li>
  <li><strong>溝通範本</strong>:status page、客戶通知、主管機關通知 (越南個人資料保護法 第13/2023/NĐ-CP 號政令:72 小時)。</li>
  <li><strong>證據保全</strong>:磁碟/記憶體快照、複製日誌、匯出稽核——在刪除/還原<em>之前</em>。</li>
  <li>依事件類型的 <strong>containment playbook</strong>:secret 外洩、帳號淪陷、ransomware、資料外流。</li>
</ul>
<p>每季舉辦 1-2 次 tabletop 演練,每次 60-90 分鐘,使用 1 個真實情境。量測:偵測時間 (MTTD)、抑制時間 (MTTC)、還原時間 (MTTR)。</p>

<h2 id="post-mortem-blameless">無責備 post-mortem</h2>
<p>目標不是找人懲罰,而是找出讓事故發生的<em>系統條件</em>。參考範本:</p>
<ul>
  <li><strong>摘要</strong> (3-5 行)。</li>
  <li><strong>Timeline</strong>:誰、做了什麼、何時 (UTC timestamp)。</li>
  <li><strong>Impact</strong>:使用者、資料、財務。</li>
  <li><strong>Root cause</strong>:contributing factor (通常多個,而非單一)。</li>
  <li><strong>What went well</strong>:承認做得好的地方以強化。</li>
  <li><strong>Action item</strong>:有 owner、實際 deadline,進入 sprint backlog。</li>
</ul>
<p>無責備文化需要領導者保護——若回報者被懲罰,下次就沒人敢誠實說了。</p>

<h2 id="bug-bounty-purple-team">Bug bounty 與 purple team</h2>
<p>內部偵測之外的補強:</p>
<ul>
  <li>透過 <code>security.txt</code> + <code>security@</code> email 提供 <strong>responsible disclosure</strong>:便宜又免費。</li>
  <li>使用 HackerOne/Intigriti 或在地平台的 <strong>bug bounty</strong>:scope 與 payout 明確。</li>
  <li><strong>Purple team 演練</strong>:red team 跑一個 technique,blue team 量測是否能偵測,然後一起 tune 規則。互相學習,不計分數。</li>
</ul>

<h2 id="metric-can-do">應該量測的指標</h2>
<ul>
  <li>依事件類型的 MTTD。</li>
  <li>依 severity 的漏洞 MTTR,以及符合 SLA 的比例。</li>
  <li>警報 true positive 率 (預防警報疲勞)。</li>
  <li>依 tactic 的 ATT&CK 覆蓋率。</li>
  <li>Tabletop 頻率、post-mortem action item 準時完成的比例。</li>
</ul>

<h2 id="ket-luan">結論</h2>
<p>Detection engineering 與 IR 是 DevSecOps 與 SOC 交會的地方。把規則當程式碼 (Sigma + git + CI)、把 runbook 當產品 (審查、版本化、量測 MTTR),並守護無責備文化。如此一來,每場事故都會成為改善系統的燃料,而不是引起恐慌的事件。</p>
