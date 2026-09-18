---
id: 019d8b30-b101-7001-c001-e0c5f8100101
title: 第 1 課：介紹 Keycloak - 企業中的 IAM 與 SSO
slug: bai-1-gioi-thieu-keycloak-iam-va-sso-trong-enterprise
description: 了解什麼是 Keycloak、為什麼需要 IAM、核心概念（領域、客戶端、使用者、角色、群組、會話）、Quarkus 上的 Keycloak 架構、與 Auth0/Okta/Azure AD 的比較以及企業中的真實用例。 Keycloak 26.x 版本概述。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 1
section_title: 第 1 部分：Keycloak 平台
course:
  id: 019d8b30-b100-7001-c001-e0c5f8100001
  title: 鑰匙斗篷從基礎到高級
  slug: keycloak-tu-co-ban-den-nang-cao
locale: zh-tw
---
<h2 id="1-keycloak-la-gi"><strong>1.什麼是Keycloak？</strong></h2>
<p><strong>鑰匙斗篷</strong>是一個開源身分和存取管理 (IAM) 解決方案，最初由 Red Hat 開發，現在是<strong>CNCF孵化</strong>（雲端原生運算基金會）。 Keycloak 為 Web 系統和 RESTful Web 服務提供單一登入 (SSO)、身分識別管理和應用程式安全性。</p>

<p>Keycloak 的目標是讓安全性變得簡單——開發人員通常需要自己編寫的安全功能可以開箱即用，並且可以根據組織需求進行客製化。</p>

<h3 id="lich-su-phat-trien"><strong>發展歷程</strong></h3>
<ul>
<li><p><strong>2014</strong>：Keycloak 是作為 JBoss/Red Hat 專案而誕生的</p></li>
<li><p><strong>2018</strong>：Keycloak 4.0 — 支援授權服務、UMA 2.0</p></li>
<li><p><strong>2020</strong>：Keycloak.X（基於Quarkus）預覽</p></li>
<li><p><strong>2022</strong>：Keycloak 20 - WildFly 發行版已刪除，正式切換到 Quarkus</p></li>
<li><p><strong>2024</strong>: Keycloak 成為 CNCF 孵化項目</p></li>
<li><p><strong>2026</strong>：Keycloak 26.5.x — 目前版本，支援工作流程、密碼、MCP</p></li>
</ul>

<h2 id="2-tai-sao-can-iam"><strong>2. 為什麼需要身分和存取管理？</strong></h2>
<p>在現代企業系統中，身分和存取管理在以下情況下變得複雜：</p>
<ul>
<li><p>許多應用程式需要通用身份驗證 (SSO)</p></li>
<li><p>需要與外部身分提供者（Google、Azure AD、LDAP）集成</p></li>
<li><p>需要多重身份驗證 (MFA) 以實現高安全性</p></li>
<li><p>複雜的權限管理（RBAC、ABAC、細粒度權限）</p></li>
<li><p>符合安全標準（OAuth 2.0、OIDC、SAML 2.0、FAPI 2.0）</p></li>
<li><p>SaaS 應用程式的多租戶</p></li>
</ul>

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/03/keycloak-sso-overview-2026.webp" alt="Keycloak IAM/SSO Overview" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Keycloak IAM/SSO 概述：應用程式 → Keycloak → 身分提供者</em></p>
</div>

<h2 id="3-cac-tinh-nang-chinh"><strong>3.Keycloak主要特點</strong></h2>
<ul>
<li><p><strong>單一登入 (SSO) 和單一登出</strong>對於瀏覽器應用程式</p></li>
<li><p><strong>OpenID 連接</strong>和<strong>OAuth 2.0</strong>支援</p></li>
<li><p><strong>SAML 2.0</strong>支援</p></li>
<li><p><strong>身份經紀</strong>— 透過外部 OIDC 或 SAML 身分提供者進行身分驗證</p></li>
<li><p><strong>社群登入</strong>— 使用 Google、GitHub、Facebook、Apple、Microsoft 登入</p></li>
<li><p><strong>使用者聯盟</strong>— 同步 LDAP 和 Active Directory 中的用戶</p></li>
<li><p><strong>Kerberos 橋</strong>— 自動驗證登入 Kerberos 伺服器的用戶</p></li>
<li><p><strong>管理控制台</strong>— 使用者、角色、客戶端、設定的集中管理</p></li>
<li><p><strong>帳戶控制台</strong>— 允許使用者管理自己的帳戶</p></li>
<li><p><strong>主題支持</strong>— 自訂登入、帳戶、管理、電子郵件介面</p></li>
<li><p><strong>雙重身份驗證</strong>— TOTP/HOTP、WebAuthn、金鑰</p></li>
<li><p><strong>授權服務</strong>— 詳細的策略和權限授權</p></li>
<li><p><strong>組織機構</strong>— CIAM 多租戶（B2B、B2B2C）</p></li>
<li><p><strong>工作流程</strong>— 管理自動化（IGA）</p></li>
<li><p><strong>代幣映射器</strong>— 自訂令牌中的聲明</p></li>
<li><p><strong>事件與審計</strong>— 審計日誌記錄和事件監聽器</p></li>
</ul>

<h2 id="4-khai-niem-cot-loi"><strong>4. 核心概念</strong></h2>

<h3 id="realms"><strong>領域</strong></h3>
<p>Realm 管理一組使用者、憑證、角色和群組。每個使用者都屬於並登入一個領域。領域相互隔離－只有屬於該領域的使用者才能被管理和驗證。</p>

<h3 id="clients"><strong>客戶</strong></h3>
<p>客戶端是需要Keycloak對使用者進行身份驗證的實體（應用程式、服務）。客戶端可以是 Web 應用程式、行動應用程式、REST API 或需要令牌來呼叫其他服務的服務。</p>

<h3 id="users"><strong>使用者</strong></h3>
<p>使用者是可以登入系統的實體。使用者俱有屬性（電子郵件、使用者名稱、電話等），屬於群組並被指派角色。</p>

<h3 id="roles"><strong>角色</strong></h3>
<p>角色決定使用者的類型或類別（管理員、使用者、經理）。該應用程式根據角色而不是單一使用者分配存取權限。</p>

<h3 id="groups"><strong>團體</strong></h3>
<p>群組管理用戶群組。組具有屬性和角色映射。使用者從群組繼承屬性和角色映射。</p>

<h3 id="sessions"><strong>會議</strong></h3>
<p>當使用者登入時，會建立一個會話來管理登入會話，包括有關登入時間和參與 SSO 的應用程式的資訊。</p>

<h2 id="5-kien-truc-keycloak"><strong>5. Quarkus 上的 Keycloak 架構</strong></h2>
<p>從版本 20+ 開始，Keycloak 完全在 Quarkus 框架上運行，提供：</p>
<ul>
<li><p><strong>啟動時間極快</strong>— 適用於容器和無伺服器</p></li>
<li><p><strong>記憶體佔用小</strong>- 針對雲端原生部署進行了最佳化</p></li>
<li><p><strong>建置時優化</strong>— 預編譯配置</p></li>
<li><p><strong>原生影像支援</strong>— 能夠原生運作 GraalVM</p></li>
</ul>

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/03/keycloak-architecture-2026.webp" alt="Keycloak Architecture on Quarkus" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Keycloak 架構：Quarkus 執行時期、Infinispan 快取、Hibernate ORM、管理/帳戶控制台</em></p>
</div>

<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>成分</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Quarkus 運作時</strong></td>
<td>應用伺服器（取代WildFly）</td>
</tr>
<tr>
<td><strong>無限跨度</strong></td>
<td>會話、令牌的分散式緩存</td>
</tr>
<tr>
<td><strong>休眠 ORM</strong></td>
<td>用於資料庫持久化的 ORM 層</td>
</tr>
<tr>
<td><strong>資料庫</strong></td>
<td>PostgreSQL（推薦）、MySQL、MariaDB、Oracle、MSSQL</td>
</tr>
<tr>
<td><strong>管理控制台</strong></td>
<td>基於 React 的 SPA (PatternFly 5)</td>
</tr>
<tr>
<td><strong>帳戶控制台</strong></td>
<td>基於 React 的 SPA，用於用戶自助服務</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->

<h2 id="6-so-sanh"><strong>6. 比較 Keycloak、Auth0、Okta 和 Azure AD</strong></h2>

<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>標準</th>
<th>鑰匙斗篷</th>
<th>授權0</th>
<th>奧克塔</th>
<th>Azure AD</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>執照</strong></td>
<td>阿帕契 2.0 (自由開源軟體)</td>
<td>商業的</td>
<td>商業的</td>
<td>商業的</td>
</tr>
<tr>
<td><strong>部署</strong></td>
<td>自託管</td>
<td>雲端軟體即服務</td>
<td>雲端軟體即服務</td>
<td>雲端軟體即服務</td>
</tr>
<tr>
<td><strong>費用</strong></td>
<td>免費（自營）</td>
<td>每月 35 美元起</td>
<td>從 2 美元/用戶/月起</td>
<td>從 $6 美元/用戶/月起</td>
</tr>
<tr>
<td><strong>客製化</strong></td>
<td>非常高（開源）</td>
<td>中等的</td>
<td>中等的</td>
<td>短的</td>
</tr>
<tr>
<td><strong>OIDC/OAuth2</strong></td>
<td>滿的</td>
<td>滿的</td>
<td>滿的</td>
<td>滿的</td>
</tr>
<tr>
<td><strong>SAML</strong></td>
<td>滿的</td>
<td>有</td>
<td>滿的</td>
<td>滿的</td>
</tr>
<tr>
<td><strong>LDAP/AD</strong></td>
<td>滿的</td>
<td>企業</td>
<td>滿的</td>
<td>本國的</td>
</tr>
<tr>
<td><strong>藝術碩士</strong></td>
<td>TOTP、WebAuthn、金鑰</td>
<td>滿的</td>
<td>滿的</td>
<td>滿的</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->

<h2 id="7-use-cases"><strong>7. 實際用例</strong></h2>
<ul>
<li><p><strong>企業單一登入</strong>：所有內部應用程式的單一登入</p></li>
<li><p><strong>客戶 IAM (CIAM)</strong>：與組織管理客戶身份</p></li>
<li><p><strong>API安全</strong>：使用 OAuth 2.0 令牌保護 REST API</p></li>
<li><p><strong>微服務認證</strong>：使用客戶端憑證進行服務到服務身份驗證</p></li>
<li><p><strong>社群登入</strong>：允許用戶使用Google、Facebook、GitHub登入</p></li>
<li><p><strong>LDAP/AD 聯合</strong>：整合現有目錄系統</p></li>
<li><p><strong>合規 MFA</strong>：符合 PCI-DSS、HIPAA、SOC 2 要求</p></li>
</ul>

<h2 id="8-tong-quan-khoa-hoc"><strong>八、課程概述</strong></h2>
<p>課程包括<strong>25節課</strong>分為<strong>7 部分</strong>，涵蓋所有 Keycloak 26.x 模組：</p>
<ul>
<li><p><strong>第 1 部分</strong>：平台（領域、使用者、群組、角色、權限）</p></li>
<li><p><strong>第2部分</strong>：SSO 協定（OIDC、SAML、客戶端範圍、令牌、DPoP）</p></li>
<li><p><strong>第三部分</strong>：身份驗證和 MFA（流程、OTP、WebAuthn、金鑰、身分代理）</p></li>
<li><p><strong>第 4 部分</strong>：聯合和授權（LDAP/AD、組織、授權服務、工作流程）</p></li>
<li><p><strong>第五部分</strong>：安全與客製化（主題、事件、強化、Vault）</p></li>
<li><p><strong>第 6 部分</strong>：實際整合（Spring Boot、React/Angular、Node.js、API Gateway）</p></li>
<li><p><strong>第7部分</strong>：生產營運（部署、HA、Kubernetes、監控）</p></li>
</ul>
