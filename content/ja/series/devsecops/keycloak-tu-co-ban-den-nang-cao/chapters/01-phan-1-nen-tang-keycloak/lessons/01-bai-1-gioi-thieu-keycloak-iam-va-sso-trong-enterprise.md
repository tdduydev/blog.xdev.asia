---
id: 019d8b30-b101-7001-c001-e0c5f8100101
title: 'レッスン 1: Keycloak の紹介 - エンタープライズにおける IAM と SSO'
slug: bai-1-gioi-thieu-keycloak-iam-va-sso-trong-enterprise
description: Keycloak とは何か、IAM が必要な理由、中心的な概念 (レルム、クライアント、ユーザー、ロール、グループ、セッション)、Quarkus 上の Keycloak アーキテクチャ、Auth0/Okta/Azure AD との比較、企業での実際の使用例について学びます。 Keycloak 26.x バージョンの概要。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 1
section_title: 'パート 1: Keycloak プラットフォーム'
course:
  id: 019d8b30-b100-7001-c001-e0c5f8100001
  title: 基本から上級までの Keycloak
  slug: keycloak-tu-co-ban-den-nang-cao
locale: ja
---
<h2 id="1-keycloak-la-gi"><strong>1. Keycloakとは何ですか?</strong></h2>
<p><strong>キークローク</strong>は、オープンソースの ID およびアクセス管理 (IAM) ソリューションであり、当初は Red Hat によって開発され、現在は<strong>CNCFインキュベーション</strong>(クラウド ネイティブ コンピューティング財団)。 Keycloakは、WebシステムとRESTful Webサービスにシングル・サインオン(SSO)、アイデンティティ管理、アプリケーション・セキュリティを提供します。</p>

<p>Keycloak の目標は、セキュリティをシンプルにすることです。通常、開発者が自分で作成する必要があるセキュリティ機能は、すぐに利用でき、組織のニーズに合わせてカスタマイズできます。</p>

<h3 id="lich-su-phat-trien"><strong>開発の歴史</strong></h3>
<ul>
<li><p><strong>2014</strong>: Keycloak は JBoss/Red Hat プロジェクトとして誕生しました</p></li>
<li><p><strong>2018</strong>: Keycloak 4.0 — 認可サービス、UMA 2.0をサポート</p></li>
<li><p><strong>2020</strong>: Keycloak.X (Quarkus ベース) プレビュー</p></li>
<li><p><strong>2022</strong>: Keycloak 20 — WildFly ディストリビューションが削除され、正式に Quarkus に切り替えられました</p></li>
<li><p><strong>2024</strong>: KeycloakがCNCFインキュベーションプロジェクトになる</p></li>
<li><p><strong>2026</strong>: Keycloak 26.5.x — ワークフロー、パスキー、MCP をサポートする現在のバージョン</p></li>
</ul>

<h2 id="2-tai-sao-can-iam"><strong>2. ID とアクセス管理が必要なのはなぜですか?</strong></h2>
<p>最新のエンタープライズ システムでは、次の場合に ID とアクセスの管理が複雑になります。</p>
<ul>
<li><p>多くのアプリケーションは共通認証 (SSO) を必要とします。</p></li>
<li><p>外部 ID プロバイダー (Google、Azure AD、LDAP) との統合が必要</p></li>
<li><p>高度なセキュリティのために多要素認証 (MFA) が必要</p></li>
<li><p>複雑な権限管理 (RBAC、ABAC、きめ細かい権限)</p></li>
<li><p>セキュリティ標準（OAuth 2.0、OIDC、SAML 2.0、FAPI 2.0）に準拠</p></li>
<li><p>SaaS アプリケーションのマルチテナンシー</p></li>
</ul>

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/03/keycloak-sso-overview-2026.webp" alt="Keycloak IAM/SSO Overview" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Keycloak IAM/SSO の概要: アプリケーション → Keycloak → アイデンティティプロバイダー</em></p>
</div>

<h2 id="3-cac-tinh-nang-chinh"><strong>3. Keycloakの主な機能</strong></h2>
<ul>
<li><p><strong>シングル サインオン (SSO) とシングル サインアウト</strong>ブラウザアプリケーション用</p></li>
<li><p><strong>OpenID コネクト</strong>そして<strong>OAuth 2.0</strong>サポート</p></li>
<li><p><strong>SAML 2.0</strong>サポート</p></li>
<li><p><strong>ID ブローカーリング</strong>— 外部 OIDC または SAML ID プロバイダー経由で認証する</p></li>
<li><p><strong>ソーシャルログイン</strong>— Google、GitHub、Facebook、Apple、Microsoft でサインインします</p></li>
<li><p><strong>ユーザーフェデレーション</strong>— LDAP と Active Directory からユーザーを同期します</p></li>
<li><p><strong>ケルベロスブリッジ</strong>— Kerberosサーバーにログインしたユーザーを自動的に認証します</p></li>
<li><p><strong>管理コンソール</strong>— ユーザー、ロール、クライアント、構成の一元管理</p></li>
<li><p><strong>アカウントコンソール</strong>— ユーザーが自分のアカウントを管理できるようにします</p></li>
<li><p><strong>テーマのサポート</strong>— ログイン、アカウント、管理者、電子メールインターフェイスをカスタマイズします</p></li>
<li><p><strong>二要素認証</strong>— TOTP/HOTP、WebAuthn、パスキー</p></li>
<li><p><strong>認可サービス</strong>— ポリシーと権限による詳細な承認</p></li>
<li><p><strong>組織</strong>— CIAM のマルチテナント (B2B、B2B2C)</p></li>
<li><p><strong>ワークフロー</strong>— 管理自動化 (IGA)</p></li>
<li><p><strong>トークンマッパー</strong>— トークン内のクレームをカスタマイズする</p></li>
<li><p><strong>イベントと監査</strong>— 監査ログとイベント リスナー</p></li>
</ul>

<h2 id="4-khai-niem-cot-loi"><strong>4. 中心となる概念</strong></h2>

<h3 id="realms"><strong>レルム</strong></h3>
<p>レルムは、一連のユーザー、認証情報、ロール、およびグループを管理します。各ユーザーはレルムに属し、レルムにログインします。レルムは互いに分離されており、そのレルムに属するユーザーのみが管理および認証されます。</p>

<h3 id="clients"><strong>クライアント</strong></h3>
<p>クライアントは、Keycloakによるユーザーの認証を必要とするエンティティ（アプリケーション、サービス）です。クライアントは、Web アプリ、モバイル アプリ、REST API、または他のサービスを呼び出すためにトークンを必要とするサービスです。</p>

<h3 id="users"><strong>ユーザー</strong></h3>
<p>ユーザーはシステムにログインできるエンティティです。ユーザーには属性 (電子メール、ユーザー名、電話番号など) があり、グループに属し、役割が割り当てられます。</p>

<h3 id="roles"><strong>役割</strong></h3>
<p>ロールによって、ユーザーのタイプまたはカテゴリ (管理者、ユーザー、マネージャー) が決まります。アプリケーションは、個々のユーザーではなくロールに基づいてアクセス権を割り当てます。</p>

<h3 id="groups"><strong>グループ</strong></h3>
<p>グループはユーザーのグループを管理します。グループには属性と役割のマッピングがあります。ユーザーはグループから属性とロールのマッピングを継承します。</p>

<h3 id="sessions"><strong>セッション</strong></h3>
<p>ユーザーがログインすると、ログイン時間や SSO に参加したアプリケーションに関する情報など、ログイン セッションを管理するためのセッションが作成されます。</p>

<h2 id="5-kien-truc-keycloak"><strong>5. Quarkus の Keycloak アーキテクチャ</strong></h2>
<p>バージョン 20 以降では、Keycloak は完全に Quarkus フレームワーク上で実行され、以下を提供します。</p>
<ul>
<li><p><strong>起動時間が非常に速い</strong>— コンテナおよびサーバーレスに適しています</p></li>
<li><p><strong>メモリ使用量が小さい</strong>— クラウドネイティブの導入向けに最適化</p></li>
<li><p><strong>ビルド時の最適化</strong>— プリコンパイル済み構成</p></li>
<li><p><strong>ネイティブイメージのサポート</strong>— GraalVM をネイティブで実行する機能</p></li>
</ul>

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/03/keycloak-architecture-2026.webp" alt="Keycloak Architecture on Quarkus" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Keycloak アーキテクチャ: Quarkus ランタイム、Infinispan キャッシュ、Hibernate ORM、管理者/アカウント コンソール</em></p>
</div>

<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>成分</th>
<th>説明する</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Quarkus ランタイム</strong></td>
<td>アプリケーション サーバー (WildFly を置き換える)</td>
</tr>
<tr>
<td><strong>インフィニスパン</strong></td>
<td>セッション、トークンの分散キャッシュ</td>
</tr>
<tr>
<td><strong>休止状態 ORM</strong></td>
<td>データベース永続性のための ORM 層</td>
</tr>
<tr>
<td><strong>データベース</strong></td>
<td>PostgreSQL (推奨)、MySQL、MariaDB、Oracle、MSSQL</td>
</tr>
<tr>
<td><strong>管理コンソール</strong></td>
<td>React ベースの SPA (PatternFly 5)</td>
</tr>
<tr>
<td><strong>アカウントコンソール</strong></td>
<td>ユーザーのセルフサービスのための React ベースの SPA</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->

<h2 id="6-so-sanh"><strong>6. Keycloak、Auth0、Okta、Azure AD の比較</strong></h2>

<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>基準</th>
<th>キークローク</th>
<th>認証0</th>
<th>オクタ</th>
<th>Azure AD</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ライセンス</strong></td>
<td>Apache 2.0 (FOSS)</td>
<td>コマーシャル</td>
<td>コマーシャル</td>
<td>コマーシャル</td>
</tr>
<tr>
<td><strong>導入</strong></td>
<td>自己ホスト型</td>
<td>クラウドSaaS</td>
<td>クラウドSaaS</td>
<td>クラウドSaaS</td>
</tr>
<tr>
<td><strong>費用</strong></td>
<td>無料（自己運営）</td>
<td>月額 35 ドルから</td>
<td>ユーザーあたり月額 2 ドルから</td>
<td>ユーザーあたり月額 6 ドルから</td>
</tr>
<tr>
<td><strong>カスタマイズ</strong></td>
<td>非常に高い (オープンソース)</td>
<td>中くらい</td>
<td>中くらい</td>
<td>短い</td>
</tr>
<tr>
<td><strong>OIDC/OAuth2</strong></td>
<td>満杯</td>
<td>満杯</td>
<td>満杯</td>
<td>満杯</td>
</tr>
<tr>
<td><strong>SAML</strong></td>
<td>満杯</td>
<td>持っている</td>
<td>満杯</td>
<td>満杯</td>
</tr>
<tr>
<td><strong>LDAP/AD</strong></td>
<td>満杯</td>
<td>企業</td>
<td>満杯</td>
<td>ネイティブ</td>
</tr>
<tr>
<td><strong>MFA</strong></td>
<td>TOTP、WebAuthn、パスキー</td>
<td>満杯</td>
<td>満杯</td>
<td>満杯</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->

<h2 id="7-use-cases"><strong>7. 実際の使用例</strong></h2>
<ul>
<li><p><strong>エンタープライズ SSO</strong>: すべての内部アプリケーションに対するシングル サインオン</p></li>
<li><p><strong>顧客 IAM (CIAM)</strong>: 組織で顧客 ID を管理</p></li>
<li><p><strong>APIセキュリティ</strong>: OAuth 2.0 トークンを使用した安全な REST API</p></li>
<li><p><strong>マイクロサービス認証</strong>: クライアント資格情報を使用したサービス間認証</p></li>
<li><p><strong>ソーシャルログイン</strong>: ユーザーが Google、Facebook、GitHub でログインできるようにします</p></li>
<li><p><strong>LDAP/ADフェデレーション</strong>: 既存のディレクトリ システムを統合する</p></li>
<li><p><strong>コンプライアンスのためのMFA</strong>: PCI-DSS、HIPAA、SOC 2 要件に適合</p></li>
</ul>

<h2 id="8-tong-quan-khoa-hoc"><strong>8. コース概要</strong></h2>
<p>コースに含まれるもの<strong>25レッスン</strong>に分けられる<strong>7部</strong>、すべての Keycloak 26.x モジュールをカバーします。</p>
<ul>
<li><p><strong>パート 1</strong>: プラットフォーム (レルム、ユーザー、グループ、ロール、権限)</p></li>
<li><p><strong>パート 2</strong>: SSO プロトコル (OIDC、SAML、クライアント スコープ、トークン、DPoP)</p></li>
<li><p><strong>パート 3</strong>: 認証と MFA (フロー、OTP、WebAuthn、パスキー、ID ブローカリング)</p></li>
<li><p><strong>パート 4</strong>: フェデレーションと認可 (LDAP/AD、組織、認可サービス、ワークフロー)</p></li>
<li><p><strong>パート 5</strong>: セキュリティとカスタマイズ (テーマ、イベント、強化、ボールト)</p></li>
<li><p><strong>パート6</strong>: 実践的な統合 (Spring Boot、React/Angular、Node.js、API Gateway)</p></li>
<li><p><strong>パート 7</strong>: 本番運用 (デプロイメント、HA、Kubernetes、モニタリング)</p></li>
</ul>
