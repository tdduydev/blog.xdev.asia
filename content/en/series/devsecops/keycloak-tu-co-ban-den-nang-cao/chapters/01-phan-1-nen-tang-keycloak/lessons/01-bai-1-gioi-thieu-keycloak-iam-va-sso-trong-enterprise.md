---
id: 019d8b30-b101-7001-c001-e0c5f8100101
title: 'Lesson 1: Introducing Keycloak - IAM and SSO in Enterprise'
slug: bai-1-gioi-thieu-keycloak-iam-va-sso-trong-enterprise
description: Learn what Keycloak is, why do you need IAM, core concepts (Realms, Clients, Users, Roles, Groups, Sessions), Keycloak architecture on Quarkus, comparison with Auth0/Okta/Azure AD, and real use cases in the enterprise. Keycloak 26.x version overview.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 1
section_title: 'Part 1: Keycloak Platform'
course:
  id: 019d8b30-b100-7001-c001-e0c5f8100001
  title: Keycloak from Basic to Advanced
  slug: keycloak-tu-co-ban-den-nang-cao
locale: en
---
<h2 id="1-keycloak-la-gi"><strong>1. What is Keycloak?</strong></h2>
<p><strong>Keycloak</strong> is an open source Identity and Access Management (IAM) solution, originally developed by Red Hat and now a <strong>CNCF Incubation</strong> (Cloud Native Computing Foundation) project. Keycloak provides Single Sign-On (SSO), identity management, and application security for web systems and RESTful web services.</p>

<p>Keycloak's goal is to make security simple — security features that developers would typically have to write themselves are available out-of-the-box and customizable to organizational requirements.</p>

<h3 id="lich-su-phat-trien"><strong>Development history</strong></h3>
<ul>
<li><p><strong>2014</strong>: Keycloak was born as a JBoss/Red Hat project</p></li>
<li><p><strong>2018</strong>: Keycloak 4.0 — supports Authorization Services, UMA 2.0</p></li>
<li><p><strong>2020</strong>: Keycloak.X (Quarkus-based) preview</p></li>
<li><p><strong>2022</strong>: Keycloak 20 — WildFly distribution removed, officially switched to Quarkus</p></li>
<li><p><strong>2024</strong>: Keycloak becomes CNCF Incubation project</p></li>
<li><p><strong>2026</strong>: Keycloak 26.5.x — current version with Workflows, Passkeys, MCP support</p></li>
</ul>

<h2 id="2-tai-sao-can-iam"><strong>2. Why do we need Identity and Access Management?</strong></h2>
<p>In modern enterprise systems, identity and access management becomes complicated when:</p>
<ul>
<li><p>Multiple apps need shared authentication (SSO)</p></li>
<li><p>Requires integration with external Identity Providers (Google, Azure AD, LDAP)</p></li>
<li><p>Needs Multi-Factor Authentication (MFA) for high security</p></li>
<li><p>Complicated permission management (RBAC, ABAC, fine-grained permissions)</p></li>
<li><p>Compliant with security standards (OAuth 2.0, OIDC, SAML 2.0, FAPI 2.0)</p></li>
<li><p>Multi-tenancy cho SaaS applications</p></li>
</ul>

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/03/keycloak-sso-overview-2026.webp" alt="Keycloak IAM/SSO Overview" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Keycloak IAM/SSO Overview: Apps → Keycloak → Identity Providers</em></p>
</div>

<h2 id="3-cac-tinh-nang-chinh"><strong>3. Keycloak</strong></h2> Key Features
<ul>
<li><p><strong>Single Sign-On (SSO) and Single Sign-Out</strong> for browser applications</p></li>
<li><p><strong>OpenID Connect</strong> and <strong>OAuth 2.0</strong> support</p></li>
<li><p><strong>SAML 2.0</strong> support</p></li>
<li><p><strong>Identity Brokering</strong> — authenticate via external OIDC or SAML Identity Providers</p></li>
<li><p><strong>Social Login</strong> — sign in with Google, GitHub, Facebook, Apple, Microsoft</p></li>
<li><p><strong>User Federation</strong> — synchronize users from LDAP and Active Directory</p></li>
<li><p><strong>Kerberos bridge</strong> — automatically authenticates users logged into the Kerberos server</p></li>
<li><p><strong>Admin Console</strong> — centralized management of users, roles, clients, configuration</p></li>
<li><p><strong>Account Console</strong> — allows users to manage their own accounts</p></li>
<li><p><strong>Theme support</strong> — customize login, account, admin, email interface</p></li>
<li><p><strong>Two-factor Authentication</strong> — TOTP/HOTP, WebAuthn, Passkeys</p></li>
<li><p><strong>Authorization Services</strong> — detailed authorization with policies and permissions</p></li>
<li><p><strong>Organizations</strong> — multi-tenancy cho CIAM (B2B, B2B2C)</p></li>
<li><p><strong>Workflows</strong> — administrative automation (IGA)</p></li>
<li><p><strong>Token Mappers</strong> — customize claims in tokens</p></li>
<li><p><strong>Events & Auditing</strong> — audit logging and event listeners</p></li>
</ul>

<h2 id="4-khai-niem-cot-loi"><strong>4. Core concepts</strong></h2>

<h3 id="realms"><strong>Realms</strong></h3>
<p>Realm manages a collection of users, credentials, roles and groups. Each user belongs to and is logged into a realm. Realms are isolated from each other — only users belonging to that realm can be managed and authenticated.</p>

<h3 id="clients"><strong>Clients</strong></h3>
<p>Clients are entities (applications, services) that require Keycloak to authenticate users. Clients can be web apps, mobile apps, REST APIs, or services that need tokens to call other services.</p>

<h3 id="users"><strong>Users</strong></h3>
<p>Users are entities that can log into the system. Users have attributes (email, username, phone, etc.), belong to groups and are assigned roles.</p>

<h3 id="roles"><strong>Roles</strong></h3>
<p>Roles identifies the type or category of the user (Admin, User, Manager). The application assigns access rights based on roles instead of individual users.</p>

<h3 id="groups"><strong>Groups</strong></h3>
<p>Groups manages user groups. Groups have attributes and role mappings. Users inherit attributes and role mappings from group.</p>

<h3 id="sessions"><strong>Sessions</strong></h3>
<p>When a user logs in, a session is created to manage the login session, including information about the login time and applications that participated in SSO.</p>

<h2 id="5-kien-truc-keycloak"><strong>5. Keycloak Architecture on Quarkus</strong></h2>
<p>From version 20+, Keycloak runs entirely on the Quarkus framework, providing:</p>
<ul>
<li><p><strong>Ultra-fast startup time</strong> — suitable for containers and serverless</p></li>
<li><p><strong>Small memory footprint</strong> — optimized for cloud-native deployments</p></li>
<li><p><strong>Build-time optimization</strong> — precompiled configuration</p></li>
<li><p><strong>Native image support</strong> — ability to run GraalVM native</p></li>
</ul>

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/03/keycloak-architecture-2026.webp" alt="Keycloak Architecture on Quarkus" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Keycloak Architecture: Quarkus Runtime, Infinispan Cache, Hibernate ORM, Admin/Account Console</em></p>
</div>

<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Component</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Quarkus Runtime</strong></td>
<td>Application server (replaces WildFly)</td>
</tr>
<tr>
<td><strong>Infinispan</strong></td>
<td>Distributed cache cho sessions, tokens</td>
</tr>
<tr>
<td><strong>Hibernate ORM</strong></td>
<td>ORM layer cho database persistence</td>
</tr>
<tr>
<td><strong>Database</strong></td>
<td>PostgreSQL (recommended), MySQL, MariaDB, Oracle, MSSQL</td>
</tr>
<tr>
<td><strong>Admin Console</strong></td>
<td>React-based SPA (PatternFly 5)</td>
</tr>
<tr>
<td><strong>Account Console</strong></td>
<td>React-based SPA cho user self-service</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->

<h2 id="6-so-sanh"><strong>6. Compare Keycloak vs Auth0 vs Okta vs Azure AD</strong></h2>

<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Criteria</th>
<th>Keycloak</th>
<th>Auth0</th>
<th>Okta</th>
<th>Azure AD</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>License</strong></td>
<td>Apache 2.0 (FOSS)</td>
<td>Commercial</td>
<td>Commercial</td>
<td>Commercial</td>
</tr>
<tr>
<td><strong>Deployment</strong></td>
<td>Self-hosted</td>
<td>Cloud SaaS</td>
<td>Cloud SaaS</td>
<td>Cloud SaaS</td>
</tr>
<tr>
<td><strong>Cost</strong></td>
<td>Free (self-operated)</td>
<td>From $35/month</td>
<td>From $2/user/month</td>
<td>From $6/user/month</td>
</tr>
<tr>
<td><strong>Customization</strong></td>
<td>Very high (open source)</td>
<td>Average</td>
<td>Average</td>
<td>Low</td>
</tr>
<tr>
<td><strong>OIDC/OAuth2</strong></td>
<td>Full</td>
<td>Full</td>
<td>Full</td>
<td>Full</td>
</tr>
<tr>
<td><strong>SAML</strong></td>
<td>Full</td>
<td>Yes</td>
<td>Full</td>
<td>Full</td>
</tr>
<tr>
<td><strong>LDAP/AD</strong></td>
<td>Full</td>
<td>Enterprise</td>
<td>Full</td>
<td>Native</td>
</tr>
<tr>
<td><strong>MFA</strong></td>
<td>TOTP, WebAuthn, Passkeys</td>
<td>Full</td>
<td>Full</td>
<td>Full</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->

<h2 id="7-use-cases"><strong>7. Actual use cases</strong></h2>
<ul>
<li><p><strong>Enterprise SSO</strong>: Single sign-on for all internal applications</p></li>
<li><p><strong>Customer IAM (CIAM)</strong>: Managing customer identities with Organizations</p></li>
<li><p><strong>API Security</strong>: Secure REST APIs with OAuth 2.0 tokens</p></li>
<li><p><strong>Microservices Authentication</strong>: Service-to-service authentication with client credentials</p></li>
<li><p><strong>Social Login</strong>: Allows users to log in with Google, Facebook, GitHub</p></li>
<li><p><strong>LDAP/AD Federation</strong>: Integrate existing directory system</p></li>
<li><p><strong>MFA for Compliance</strong>: Meets PCI-DSS, HIPAA, SOC requirements 2</p></li>
</ul>

<h2 id="8-tong-quan-khoa-hoc"><strong>8. Course overview</strong></h2>
<p>The course includes <strong>25 lessons</strong> divided into <strong>7 parts</strong>, covering all modules of Keycloak 26.x:</p>
<ul>
<li><p><strong>Part 1</strong>: Platform (Realms, Users, Groups, Roles, Permissions)</p></li>
<li><p><strong>Part 2</strong>: SSO Protocols (OIDC, SAML, Client Scopes, Tokens, DPoP)</p></li>
<li><p><strong>Part 3</strong>: Authentication & MFA (Flows, OTP, WebAuthn, Passkeys, Identity Brokering)</p></li>
<li><p><strong>Part 4</strong>: Federation & Authorization (LDAP/AD, Organizations, Authorization Services, Workflows)</p></li>
<li><p><strong>Part 5</strong>: Security & Customization (Themes, Events, Hardening, Vault)</p></li>
<li><p><strong>Part 6</strong>: Practical Integration (Spring Boot, React/Angular, Node.js, API Gateway)</p></li>
<li><p><strong>Part 7</strong>: Production Operations (Deployment, HA, Kubernetes, Monitoring)</p></li>
</ul>
