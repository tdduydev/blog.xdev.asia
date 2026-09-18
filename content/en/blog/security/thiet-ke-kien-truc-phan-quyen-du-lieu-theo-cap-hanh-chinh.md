---
id: 019c9617-fd6f-7042-b48b-3770ede137bf
title: Architecture Design of Data Decentralization by Administrative Level
slug: thiet-ke-kien-truc-phan-quyen-du-lieu-theo-cap-hanh-chinh
excerpt: >-
  This article analyzes in detail the data decentralization architecture for
  hierarchically structured systems — from governments, to multinational
  corporations, to retail chains with thousands of branches.
featured_image: /images/blog/phan-quyen-du-lieu-featured.webp
type: blog
reading_time: 37
view_count: 0
meta: null
published_at: '2025-12-20T06:11:57.000000Z'
created_at: '2026-02-25T18:38:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9617-fabb-72e7-91c2-a99abfb1cb8a
  name: Security
  slug: security
tags:
  - name: security
    slug: security
  - name: rbac
    slug: rbac
  - name: system-design
    slug: system-design
  - name: authorization
    slug: authorization
  - name: rls
    slug: rls
  - name: multi-tenant
    slug: multi-tenant
  - name: enterprise-architecture
    slug: enterprise-architecture
comments: []
locale: en
---
<blockquote>How to build a system where superiors can monitor all subordinate data, while peer units are completely isolated from each other? This article analyzes in detail the data decentralization architecture for hierarchically structured systems — from governments, to multinational corporations, to retail chains with thousands of branches.</blockquote><hr><h2 id="ph%E1%BA%A7n-1-b%C3%A0i-to%C3%A1n-ph%C3%A2n-quy%E1%BB%81n-ph%C3%A2n-c%E1%BA%A5p">Part 1: The Problem of Decentralization</h2><h3 id="11-%C4%91%E1%BA%B7c-%C4%91i%E1%BB%83m-c%E1%BB%A7a-h%E1%BB%87-th%E1%BB%91ng-ph%C3%A2n-c%E1%BA%A5p">1.1. Characteristics of hierarchy</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/a-c-ie-m-cu-a-he-tho-ng-pha-n-ca-p-ca5b6eb2.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Characteristics of hierarchy</span></figcaption></figure><p>Many organizations operate according to a hierarchical structure: corporations have subsidiaries, subsidiaries have branches, branches have departments. The government has ministries, provinces, districts, wards and communes. Retail chains have regions, regions, and stores.</p><p>What these structures have in common is relationships <strong>parent-child</strong> between units, forming a tree with the following characteristics:</p><ul><li>Each unit (except root) has exactly one parent unit</li><li>Each unit can have many sub-units</li><li>The depth of the tree may vary across branches</li><li>Structure can change over time (merger, split, restructuring)</li></ul><h3 id="12-y%C3%AAu-c%E1%BA%A7u-ph%C3%A2n-quy%E1%BB%81n-%C4%91%E1%BA%B7c-th%C3%B9">1.2. Requires specific authorization</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/f350576b-00af-4f46-83f0-c7a776b08139-f55727ad.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Requires specific authorization</span></figcaption></figure><p>The decentralized system imposes special permission requirements that the flat permission model cannot meet:</p><p><strong>Vertical Access:</strong> Superiors need to be able to see data of all subordinates. The CEO needs to see reports for the entire corporation, including all subsidiaries and affiliates. Regional Manager needs to see data for all stores in the region.</p><p><strong>Horizontal Isolation:</strong> Units at the same level are not allowed to view each other's data. Branch A cannot see Branch B's revenue, even though both belong to the same subsidiary. This ensures fair competition and business information security.</p><p><strong>Contextual Scope:</strong> Same role but different scope. "Branch Manager" in Branch A only manages Branch A; "Branch Manager" in Branch B only manages Branch B. The roles are the same, the powers are the same, but the data allowed to be accessed is completely different.</p><p><strong>Inheritance with Boundaries:</strong> Permissions are inherited vertically but not horizontally. The Country Director inherits all of the Regional Manager's rights within that country, but none in other countries.</p><h3 id="13-t%E1%BA%A1i-sao-ph%C3%A2n-quy%E1%BB%81n-ph%E1%BA%B3ng-th%E1%BA%A5t-b%E1%BA%A1i">1.3. Why flat decentralization fails</h3><p>The flat decentralization model directly assigns permissions to users or roles, without the concept of hierarchy. When applied to hierarchies, it faces many problems:</p><p><strong>Explosion in the number of roles:</strong> If there are 10 types of roles and 1,000 units, theoretically 10,000 separate roles are needed (each role-unit is a combination). Adding a new role type means creating 1,000 new roles.</p><p><strong>Difficult to maintain consistency:</strong> When a unit restructures (mergers, splits), all related roles need to be updated manually. Errors lead to security breaches or loss of valid access rights.</p><p><strong>Does not support natural inheritance:</strong> In order for superiors to view subordinate data, permissions to each subordinate unit must be granted manually. When adding a new unit, it's easy to forget to grant permissions to superiors.</p><p><strong>Complex queries:</strong> Each data query needs to include a long list of allowed units, making the query complex and slow.</p><h3 id="14-quy-m%C3%B4-v%C3%A0-%C4%91%E1%BB%99-ph%E1%BB%A9c-t%E1%BA%A1p">1.4. Scale and complexity</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/ca-c-va-n-e-cu-a-mo-hi-nh-pha-n-quye-n-pha-ng-trong-he-tho-ng-pha-n-ca-p-ed77b822.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Scale and complexity</span></figcaption></figure><p>The complexity of the problem increases with:</p><ul><li><strong>Number of units:</strong> From a few dozen to tens of thousands</li><li><strong>Tree depth:</strong> From 2-3 levels to 5-6 levels or more</li><li><strong>Dynamics of structure:</strong> Fixed structure vs frequently changing</li><li><strong>Number of users:</strong> From a few hundred to millions</li><li><strong>Latency requirements:</strong> Milliseconds for realtime applications</li><li><strong>Compliance requirements:</strong> Audit trail, data residency, encryption</li></ul><hr><h2 id="ph%E1%BA%A7n-2-n%E1%BB%81n-t%E1%BA%A3ng-l%C3%BD-thuy%E1%BA%BFt">Part 2: Theoretical Foundation</h2><h3 id="21-rbac-v%C3%A0-c%C3%A1c-bi%E1%BA%BFn-th%E1%BB%83-theo-chu%E1%BA%A9n-nist">2.1. RBAC and variants according to NIST standards</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/c3d5a155-acdf-4fc9-ae1b-90b45e7a0640-1-201-a-0df31065.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">RBAC and variants according to NIST standards</span></figcaption></figure><p>Role-Based Access Control (RBAC) is standardized by NIST in the ANSI/INCITS 359-2004 standard, divided into 4 levels:</p><p><strong>RBAC0 — Core RBAC:</strong> Base model with three components: Users, Roles, and Permissions. User is assigned to Role, Role is assigned Permission. This is the foundation but lacks the concept of inheritance and is not suitable for a hierarchical system.</p><p><strong>RBAC1 — Hierarchical RBAC:</strong> Added Role Hierarchy, allowing high-level roles to inherit all permissions of low-level roles. For example: Senior Manager inherits permission from Manager, Manager inherits permission from Staff. This is the most suitable model for a hierarchical organizational structure.</p><p>There are two types of hierarchy:</p><ul><li><strong>General Hierarchy:</strong> Allows multiple inheritance — one role can inherit from many other roles</li><li><strong>Limited Hierarchy:</strong> Only single inheritance is allowed — each role only inherits from a single role, creating a simple tree</li></ul><p><strong>RBAC2 — Constrained RBAC:</strong> Add constraints, the most important being Separation of Duties (SoD):</p><ul><li><strong>Static SoD:</strong> Prevent a user from simultaneously holding conflicting roles. For example, it is not possible to be both an "Order Creator" and an "Order Approver".</li><li><strong>Dynamic SoD:</strong> Allows multiple conflicting roles to be kept but not activated at the same time in a session. Users can have both "Data Entry" and "Approval" roles but must select one when logged in.</li></ul><p><strong>RBAC3 — Symmetric RBAC:</strong> Combines RBAC1 and RBAC2, providing full hierarchy and constraints.</p><h3 id="22-abac-%E2%80%94-attribute-based-access-control">2.2. ABAC — Attribute-Based Access Control</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/87de5d0d-0c9c-442f-b27e-1968c21773e6-1-201-a-7045abcd.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">ABAC — Attribute-Based Access Control</span></figcaption></figure><p>ABAC extends RBAC by evaluating multiple attributes when making authorization decisions:</p><ul><li><strong>Subject Attributes:</strong> User properties — department, job title, clearance level, location</li><li><strong>Resource Attributes:</strong> Resource properties — classification, owner, creation date, sensitivity level</li><li><strong>Environment Attributes:</strong> Context properties — time of day, IP address, device type, threat level</li><li><strong>Action Attributes:</strong> Action type — read, write, delete, approve</li></ul><p>Policy ABAC is written as rules. For example:</p><pre><code>IF subject.department = resource.owner_department
AND subject.clearance_level &gt;= resource.sensitivity_level
AND environment.time IN business_hours
AND environment.ip_range IN corporate_network
THEN ALLOW action
</code></pre><p>ABAC is powerful and flexible but is complex to deploy, difficult to debug, and can affect performance if the policy is complex. It is recommended to use ABAC in addition to RBAC in cases where detailed control is required, not as a complete replacement.</p><h3 id="23-multi-tenancy-v%C3%A0-c%C3%A1c-m%C3%B4-h%C3%ACnh">2.3. Multi-tenancy and models</h3><p>Multi-tenancy is an architecture that allows a system to serve multiple independent tenants (units/organizations) with isolated data:</p><p><strong>Siloed Model — Database per Tenant:</strong> Each tenant has a separate database. Absolute isolation, easy to customize per tenant, easy to comply with data residency requirements. Disadvantages: high infrastructure costs, difficult to maintain when the number of tenants is large, complex cross-tenant reporting.</p><p><strong>Bridge Model — Schema per Tenant:</strong> Tenants share the same database instance, but each tenant has its own schema. Balance between isolation and efficiency. Disadvantages: limited number of schemas in one database, complicated migration.</p><p><strong>Pooled Model — Shared Everything:</strong> All tenants share the same database and schema, differentiated by the tenant_id column. Lowest cost, easy to scale, easy to maintain. Disadvantage: needs strong isolation mechanism at application and database layer, one bug can affect all tenants.</p><p><strong>Recommendation:</strong> Pooled Model with Row-Level Security (RLS) for most cases. Only use Siloed Model when there are special requirements for data residency or the tenant needs deep customization.</p><h3 id="24-hierarchical-multi-tenancy">2.4. Hierarchical Multi-tenancy</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/hierarchical-multi-tenancy-b2a7cf53.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Hierarchical Multi-tenancy</span></figcaption></figure><p>Here's an extension of multi-tenancy to a hierarchical structure, where tenants are organized into trees instead of flat lists:</p><pre><code>Root Tenant (Headquarters)
├── Sub-tenant: Region North
│   ├── Sub-sub-tenant: Branch A
│   ├── Sub-sub-tenant: Branch B
│   └── Sub-sub-tenant: Branch C
├── Sub-tenant: Region South
│   ├── Sub-sub-tenant: Branch D
│   └── Sub-sub-tenant: Branch E
└── Sub-tenant: Region West
    └── Sub-sub-tenant: Branch F
</code></pre><p><strong>Access rules:</strong></p><ul><li>Parent tenant can view data of all descendant tenants</li><li>Sibling tenants (same level, same parent) cannot view each other's data</li><li>Child tenant cannot view parent's data (except data shared explicitly)</li></ul><p>This model maps naturally into the organizational structure and simplifies permission management: instead of granting permissions to each unit, just determine the user's position in the tree.</p><hr><h2 id="ph%E1%BA%A7n-3-thi%E1%BA%BFt-k%E1%BA%BF-data-model-cho-hierarchy">Part 3: Designing Data Model for Hierarchy</h2><h3 id="31-c%C3%A1c-c%C3%A1ch-bi%E1%BB%83u-di%E1%BB%85n-c%C3%A2y-trong-database">3.1. Ways to represent trees in databases</h3><p>Representing tree structures in relational databases has many approaches, each with its own trade-offs:</p><p><strong>Adjacency List:</strong> Each node stores the ID of its parent directly. This is the simplest and most natural way.</p><p><em>Advantages:</em> Easy to understand, easy to implement, simple insert/update/delete, integrity easy to enforce with foreign key.</p><p><em>Disadvantages:</em> Querying to retrieve all descendants or ancestors requires a recursive query (WITH RECURSIVE in SQL), which can be slow with deep or large trees.</p><p><em>Suitable when:</em> The tree is not too deep (< 10 levels), mainly queries parent-child directly, the structure changes frequently.</p><p><strong>Nested Set:</strong> Each node stores two values: left and right. All descendants of a node have left/right in the range (parent.left, parent.right).</p><p><em>Advantages:</em> Query descendants extremely fast (only needs BETWEEN condition), no recursion required.</p><p><em>Disadvantages:</em> Insert/update/delete is very slow because it has to update the left/right of many other nodes. Concurrent modification is complex.</p><p><em>Suitable when:</em> The tree rarely changes, queries descendants very often, can accept write performance trade-off.</p><p><strong>Closure Table:</strong> Store all ancestor-descendant pairs in a separate table, with depth. For example, if A → B → C, the closure table contains (A,A,0), (A,B,1), (A,C,2), (B,B,0), (B,C,1), (C,C,0).</p><p><em>Advantages:</em> Query ancestors and descendants are both fast, no need for recursion. Good support for complex queries like "all nodes at depth 2 from node X".</p><p><em>Disadvantages:</em> Consumes storage space (O(n²) in worst case). Insert/delete needs to update many rows in the closure table.</p><p><em>Suitable when:</em> Need to query both ancestors and descendants regularly, the tree is not too large, can accept trade-off storage.</p><p><strong>Materialized Path:</strong> Each node stores the path from the root to itself, usually as a string (e.g. "/1/5/12/") or array (e.g. [1, 5, 12]).</p><p><em>Advantages:</em> Query descendants easily (LIKE '/1/5/%' or array contains). Insert is simple (just need to know the parent's path). Can index effectively.</p><p><em>Disadvantages:</em> Moving subtree requires updating the path of all descendants. Paths can be long with deep trees.</p><p><em>Suitable when:</em> Tree structure changes rarely (move/reparent is rare), query descendants frequently, need balance between read and write performance.</p><h3 id="32-khuy%E1%BA%BFn-ngh%E1%BB%8B-materialized-path-v%E1%BB%9Bi-array">3.2. Recommended: Materialized Path with Array</h3><p>For administrative/organizational hierarchy, <strong>Materialized Path uses array</strong> is the optimal choice because:</p><ul><li>Organizational structure changes infrequently (several times/year)</li><li>The query "all sub-units of X" is very common (for delegation)</li><li>PostgreSQL and modern databases support arrays with efficient GIN indexes</li><li>Easy to combine with RLS policies</li></ul><p><strong>Design the organizational_units table:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Column</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>id</td>
<td>UUID</td>
<td>Primary key</td>
</tr>
<tr>
<td>code</td>
<td>VARCHAR</td>
<td>Unit code (unique)</td>
</tr>
<tr>
<td>name</td>
<td>VARCHAR</td>
<td>Unit name</td>
</tr>
<tr>
<td>level</td>
<td>ENUM</td>
<td>Level (headquarters, region, branch, ...)</td>
</tr>
<tr>
<td>parent_id</td>
<td>UUID</td>
<td>FK to parent (nullable for root)</td>
</tr>
<tr>
<td>ancestor_path</td>
<td>UUID[]</td>
<td>Array of IDs from root to parent</td>
</tr>
<tr>
<td>created_at</td>
<td>TIMESTAMP</td>
<td>Creation time</td>
</tr>
<tr>
<td>updated_at</td>
<td>TIMESTAMP</td>
<td>Update time</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p><strong>Data example:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>id</th>
<th>name</th>
<th>level</th>
<th>parent_id</th>
<th>ancestor_path</th>
</tr>
</thead>
<tbody>
<tr>
<td>uuid-1</td>
<td>Headquarters</td>
<td>hq</td>
<td>null</td>
<td>[]</td>
</tr>
<tr>
<td>uuid-2</td>
<td>Region North</td>
<td>region. region</td>
<td>uuid-1</td>
<td>[uuid-1]</td>
</tr>
<tr>
<td>uuid-3</td>
<td>Branch A</td>
<td>branch. branch</td>
<td>uuid-2</td>
<td>[uuid-1, uuid-2]</td>
</tr>
<tr>
<td>uuid-4</td>
<td>Branch B</td>
<td>branch. branch</td>
<td>uuid-2</td>
<td>[uuid-1, uuid-2]</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p><strong>Query all descendants of Region North (uuid-2):</strong></p><pre><code class="language-sql">SELECT * FROM organizational_units 
WHERE uuid-2 = ANY(ancestor_path);
</code></pre><p>This query returns Branch A and Branch B — all units with uuid-2 in the ancestor_path.</p><h3 id="33-indexing-strategy">3.3. Indexing Strategy</h3><p>To ensure performance with large datasets:</p><p><strong>GIN Index for ancestor_path:</strong> Allows query "X = ANY(ancestor_path)" to run quickly.</p><p><strong>B-tree Index for parent_id:</strong> Let query parent-child directly.</p><p><strong>Composite Index for (level, parent_id):</strong> Given query "all branches belonging to region X".</p><p><strong>Partial Index for active records:</strong> If there is soft-delete, index only active records.</p><h3 id="34-handling-structural-changes">3.4. Handling Structural Changes</h3><p>When the structure changes (moving a unit from one parent to another), it is necessary to update the ancestor_path of that unit and all descendants:</p><p><strong>Step 1:</strong> Calculate new ancestor_path = [new_parent.ancestor_path, new_parent.id]</p><p><strong>Step 2:</strong> For each descendant, replace the old prefix with the new prefix in the ancestor_path</p><p><strong>Note:</strong> This is a heavy operation if the subtree is large. Should be done during off-peak hours, may require batch processing and progress tracking.</p><hr><h2 id="ph%E1%BA%A7n-4-row-level-security-%E2%80%94-l%E1%BB%9Bp-b%E1%BA%A3o-v%E1%BB%87-cu%E1%BB%91i-c%C3%B9ng">Part 4: Row-Level Security — The Final Layer of Protection</h2><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/39e12b1e-55b1-4389-a24d-e23c3d20eb31-1-201-a-55082eb6.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1116" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Row-Level Security — The Final Layer of Protection</span></figcaption></figure><h3 id="41-t%E1%BA%A1i-sao-c%E1%BA%A7n-rls">4.1. Why is RLS needed?</h3><p>Application-level authorization checks permissions in the application code. This is a popular way but has weaknesses:</p><ul><li><strong>Bugs in code:</strong> A developer forgot to add permission checks to the new API</li><li><strong>SQL Injection:</strong> Attacker bypass application layer, access database directly</li><li><strong>Direct Database Access:</strong> DBA, BI tools, or hackers have database access credentials</li><li><strong>Microservices Complexity:</strong> Many services access the same database, making it difficult to ensure that they all check the correct permissions</li></ul><p>Row-Level Security (RLS) is a feature of databases (PostgreSQL, SQL Server, Oracle) that allows defining access control policies at the row level. Policy is enforced by the database engine and cannot be bypassed from the application.</p><p><strong>Defense in Depth:</strong> Even if the application has bugs, even if the attacker has SQL injection, the database still only returns rows that the current user is allowed to see. RLS is the final layer of protection, not replacing application-level checks but adding an additional layer of security.</p><h3 id="42-c%C3%A1ch-ho%E1%BA%A1t-%C4%91%E1%BB%99ng-c%E1%BB%A7a-rls">4.2. How RLS works</h3><p><strong>Step 1 — Enable RLS on the board:</strong> By default RLS is off. When enabled, all queries on that table will be filtered through policies.</p><p><strong>Step 2 — Policy Definition:</strong> Policy is a boolean expression that determines which rows are allowed to access. Policy can apply to SELECT, INSERT, UPDATE, DELETE separately or all.</p><p><strong>Step 3 — Set Session Context:</strong> Application sets session variables (eg current_user_id, current_org_unit_id) before executing queries. Policy uses these variables to filter.</p><p><strong>Step 4 — Query Execution:</strong> The database automatically adds conditions from the policy to the WHERE clause of every query. The user does not need (and cannot) change this.</p><h3 id="43-thi%E1%BA%BFt-k%E1%BA%BF-policy-cho-hierarchical-access">4.3. Policy design for Hierarchical Access</h3><p>With the designed ancestor_path model, the policy allows hierarchical access:</p><p><strong>Logic:</strong> Users belonging to unit X are allowed to access records if:</p><ul><li>Record belongs to the unit X, OR</li><li>Unit X is in the ancestor_path of the unit that owns the record (ie X is the ancestor of that unit)</li></ul><p><strong>Interpretation:</strong></p><ul><li>Branch A staff (uuid-3) can only view records with org_unit_id = uuid-3</li><li>Manager Region North (uuid-2) can view records with org_unit_id = uuid-2, uuid-3, uuid-4 (region and all branches belonging to the region)</li><li>Executive Headquarters (uuid-1) can view all records</li></ul><h3 id="44-session-context-management">4.4. Session Context Management</h3><p>RLS policy needs to know "which unit the current user belongs to". This information is passed through session variables:</p><p><strong>In PostgreSQL:</strong> Use <code>SET</code> and <code>current_setting()</code>:</p><pre><code class="language-sql">-- Application set context sau khi xác thực user
SET LOCAL app.current_user_id = 'user-uuid';
SET LOCAL app.current_org_unit_id = 'uuid-3';

-- Policy đọc context
current_setting('app.current_org_unit_id', true)
</code></pre><p><strong>Important note:</strong></p><ul><li>Use <code>SET LOCAL</code> (only valid in transactions) instead <code>SET</code> (valid during session) to avoid context leaks between requests</li><li>Always set context at the beginning of each transaction</li><li>Handling cases where context has not been set (default deny)</li></ul><h3 id="45-performance-considerations">4.5. Performance Considerations</h3><p>RLS policy is evaluated for each row, which may affect performance:</p><p><strong>Make sure the policy uses indexed columns:</strong> If policy checks <code>org_unit_id = ANY(...)</code>, need index on org_unit_id.</p><p><strong>Avoid complicated function calls in policies:</strong> Each row calls that function. If the function queries the database, there will be N+1 problems.</p><p><strong>Use STABLE/IMMUTABLE functions:</strong> Allows PostgreSQL to cache results in a query.</p><p><strong>Consider materialized permissions:</strong> Instead of calculating realtime permissions, it can be pre-computed and saved in a separate table, the policy only needs to be looked up.</p><h3 id="46-bypass-rls-cho-admin-operations">4.6. Bypass RLS for Admin Operations</h3><p>Some cases need to bypass RLS:</p><ul><li>System migrations</li><li>Batch processing jobs</li><li>Reporting across all tenants</li><li>Emergency access</li></ul><p><strong>Safe way:</strong></p><ul><li>Create separate database role with BYPASSRLS privilege</li><li>This role is only used by specific service accounts</li><li>All access using this role is logged in detail</li><li>Regular audit to ensure roles are not abused</li></ul><hr><h2 id="ph%E1%BA%A7n-5-role-hierarchy-v%C3%A0-permission-design">Part 5: Role Hierarchy and Permission Design</h2><h3 id="51-t%C3%A1ch-bi%E1%BB%87t-role-v%C3%A0-scope">5.1. Separate Role and Scope</h3><p>A common mistake is to combine roles and scopes into the same entity. For example, create roles "Branch_A_Manager", "Branch_B_Manager", "Region_North_Manager". This leads to an explosion in the number of roles.</p><p><strong>Better design:</strong> Separating role (function) and scope (scope):</p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>User</th>
<th>Role</th>
<th>Scope (Org Unit)</th>
</tr>
</thead>
<tbody>
<tr>
<td>Alice</td>
<td>Manager</td>
<td>Branch A</td>
</tr>
<tr>
<td>Bob</td>
<td>Manager</td>
<td>Branch B</td>
</tr>
<tr>
<td>Carol</td>
<td>Manager</td>
<td>Region North</td>
</tr>
<tr>
<td>Dave</td>
<td>Analyst</td>
<td>Headquarters</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p>Same role "Manager" but different scope. Manager's permission is defined once, the scope determines what data is allowed to access.</p><h3 id="52-role-hierarchy-design">5.2. Role Hierarchy Design</h3><p><strong>Functional Roles (by function):</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Role</th>
<th>Description</th>
<th>Typical Permissions</th>
</tr>
</thead>
<tbody>
<tr>
<td>Viewer</td>
<td>View data and reports</td>
<td>Read</td>
</tr>
<tr>
<td>Operator</td>
<td>Handling daily operations</td>
<td>Read, Create, Update</td>
</tr>
<tr>
<td>Manager</td>
<td>Team management, approval</td>
<td>Read, Create, Update, Approve</td>
</tr>
<tr>
<td>Administrator</td>
<td>Configuration management</td>
<td>Read, Create, Update, Delete, Configure</td>
</tr>
<tr>
<td>Auditor</td>
<td>Auditing</td>
<td>Read (including audit logs)</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p><strong>Role Inheritance:</strong></p><pre><code>Administrator
    ↓ inherits
Manager
    ↓ inherits
Operator
    ↓ inherits
Viewer
</code></pre><p>Administrator automatically has all permissions of Manager, Operator, and Viewer.</p><p><strong>Auditor</strong> Usually not in this hierarchy because it has special permissions (see audit logs) but does not have modify permissions.</p><h3 id="53-permission-granularity">5.3. Permission Granularity</h3><p>Permissions can be defined at many levels of detail:</p><p><strong>Coarse-grained (coarse):</strong></p><ul><li><code>records:read</code> — read all types of records</li><li><code>records:write</code> — create/edit all types of records</li></ul><p><strong>Fine-grained (details):</strong></p><ul><li><code>customer_records:read</code></li><li><code>customer_records:create</code></li><li><code>customer_records:update</code></li><li><code>customer_records:delete</code></li><li><code>financial_records:read</code></li><li><code>financial_records:approve</code></li></ul><p><strong>Recommendation:</strong> Start with coarse-grained, refine when there is actual need. Over-engineering permissions from the beginning leads to a complex, difficult-to-manage system.</p><h3 id="54-separation-of-duties-implementation">5.4. Separation of Duties Implementation</h3><p>SoD prevents fraud and errors by requiring multiple people to participate in a process.</p><p><strong>Static SoD — Conflicting Roles:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Role A</th>
<th>Role B</th>
<th>Reason</th>
</tr>
</thead>
<tbody>
<tr>
<td>Requester</td>
<td>Approver</td>
<td>Do not self-approve your request</td>
</tr>
<tr>
<td>Data Entry</td>
<td>Auditor</td>
<td>Auditor must be independent</td>
</tr>
<tr>
<td>Developer</td>
<td>Deployer</td>
<td>Separate dev and ops</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p>When assigning roles to users, check to see if the user already has a conflicting role. If yes, refuse assignment.</p><p><strong>Dynamic SoD — Conflicting Activations:</strong></p><p>Allows users to hold multiple roles but only active one role at a time. For example, a User can have the roles "Data Entry" and "Reviewer", but when logging in, they must choose one. This allows flexibility (the same person can do multiple things) while still ensuring that a particular transaction is not completely controlled by one person.</p><p><strong>Transaction-based SoD:</strong></p><p>Check each transaction. For example: Order has a field <code>created_by</code> and <code>approved_by</code>. System enforcement <code>approved_by != created_by</code>. The person who created the application cannot be the person who approved the application itself.</p><hr><h2 id="ph%E1%BA%A7n-6-handling-sensitive-data">Part 6: Handling Sensitive Data</h2><h3 id="61-data-classification">6.1. Data Classification</h3><p>Not all data needs the same level of protection. Data classification is the first step:</p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Classification</th>
<th>Examples</th>
<th>Protection Level</th>
</tr>
</thead>
<tbody>
<tr>
<td>Public</td>
<td>Company name, public announcements</td>
<td>Minimal</td>
</tr>
<tr>
<td>Internal</td>
<td>Internal memos, org charts</td>
<td>Standard access controls</td>
</tr>
<tr>
<td>Confidential</td>
<td>Financial reports, customer lists</td>
<td>Restricted access, audit logging</td>
</tr>
<tr>
<td>Sensitive</td>
<td>PII, health records, salary info</td>
<td>Encryption, strict access, detailed audit</td>
</tr>
<tr>
<td>Restricted</td>
<td>Trade secrets, M&A plans</td>
<td>Need-to-know basis, special approval</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="62-field-level-access-control">6.2. Field-Level Access Control</h3><p>RLS controls at the row level. But sometimes control is needed at the field (column) level:</p><p><strong>For example:</strong> Table <code>employees. employees</code> has columns: id, name, email, department, salary, ssn. HR can see it all. Manager can see his team's id, name, email, department but not salary and ssn.</p><p><strong>Implementation approaches:</strong></p><p><strong>View-based:</strong> Create views with subset of columns for each role. Manager query view does not have salary/ssn.</p><p><strong>Application-level projection:</strong> Application only SELECT columns that the role is allowed to view.</p><p><strong>Column-level encryption:</strong> Encrypt sensitive columns, only decrypt roles that have keys.</p><p><strong>Dynamic data masking:</strong> The database returns masked values (e.g. xxx-xx-1234 for SSN) for roles that do not have full access.</p><h3 id="63-encryption-strategies">6.3. Encryption Strategies</h3><p><strong>Encryption at Rest:</strong> Encrypt all database files on disk. Protection from physical access (theft, improper disposal). Transparent to the application — no need to change code.</p><p><strong>Transparent Data Encryption (TDE):</strong> Database automatically encrypts when writing, decrypts when reading. Protect data files and backups. Does not protect against authorized database users.</p><p><strong>Application-Level Encryption:</strong> Application encrypt before sending to database, decrypt after receiving. Protection from database admins and anyone with database access. Disadvantage: cannot query on encrypted data (unless using searchable encryption).</p><p><strong>Column-Level Encryption:</strong> Only encrypt specific columns. Balance between security and usability. Can query on non-encrypted columns.</p><p><strong>Recommendations for sensitive data:</strong></p><ul><li>Encryption at Rest: Always on (baseline protection)</li><li>Application-Level Encryption: For highly sensitive fields (SSN, health data)</li><li>Column-Level Encryption: For moderately sensitive fields that require occasional search</li></ul><h3 id="64-key-management">6.4. Key Management</h3><p>Encryption is only as strong as key management:</p><p><strong>Key Storage:</strong> Never store keys in code, config files, or in the same database as encrypted data. Use dedicated Key Management System (KMS) such as AWS KMS, HashiCorp Vault, Azure Key Vault.</p><p><strong>Key Rotation:</strong> Change keys periodically (for example, annually) and when there is a problem (keys may be exposed). Re-encrypt data with new key.</p><p><strong>Key Hierarchy:</strong> Master Key encrypts Data Keys. Data Keys encrypt actual data. If you need to rotate, just re-encrypt the Data Keys with the new Master Key, no need to re-encrypt all data.</p><p><strong>Access to Keys:</strong> Principle of least privilege. Only services that need to be decrypted will have access to keys. Audit all access keys.</p><hr><h2 id="ph%E1%BA%A7n-7-audit-trail-v%C3%A0-compliance">Part 7: Audit Trail and Compliance</h2><h3 id="71-what-to-log">7.1. What to Log</h3><p>Audit logging needs to capture enough information to answer: Who did What to Which resource, When, from Where, and Why (if available).</p><p><strong>Authentication Events:</strong></p><ul><li>Login success/failure</li><li>Logout</li><li>Password change/reset</li><li>MFA events</li><li>Session timeout</li></ul><p><strong>Authorization Events:</strong></p><ul><li>Access granted</li><li>Access denied</li><li>Privilege escalation attempts</li><li>Role/permission changes</li></ul><p><strong>Data Access Events:</strong></p><ul><li>Read sensitive data (mandatory)</li><li>Read normal data (optional, based on requirements)</li><li>Create records</li><li>Update records (with before/after values)</li><li>Delete records</li></ul><p><strong>Configuration Changes:</strong></p><ul><li>System settings modified</li><li>User/role management</li><li>Policy changes</li><li>Integration configurations</li></ul><p><strong>Anomalies:</strong></p><ul><li>Unusual access patterns</li><li>Multiple failed attempts</li><li>Access from new location/device</li><li>Bulk data access</li></ul><h3 id="72-log-entry-structure">7.2. Log Entry Structure</h3><p>Each log entry needs to contain:</p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td>timestamp</td>
<td>Time (with timezone)</td>
<td>2025-01-15T14:30:00Z</td>
</tr>
<tr>
<td>event_id</td>
<td>Unique identifier</td>
<td>uuid</td>
</tr>
<tr>
<td>event_type</td>
<td>Event type</td>
<td>DATA_ACCESS</td>
</tr>
<tr>
<td>action. action</td>
<td>Specific actions</td>
<td>READ</td>
</tr>
<tr>
<td>actor_id</td>
<td>User does it</td>
<td>user-uuid</td>
</tr>
<tr>
<td>actor_role</td>
<td>Current role</td>
<td>manager</td>
</tr>
<tr>
<td>actor_org_unit</td>
<td>Unit of user</td>
<td>branch-uuid</td>
</tr>
<tr>
<td>resource_type</td>
<td>Resource type</td>
<td>customer_record</td>
</tr>
<tr>
<td>resource_id</td>
<td>Resource ID</td>
<td>record-uuid</td>
</tr>
<tr>
<td>resource_org_unit</td>
<td>Owning unit</td>
<td>branch-uuid</td>
</tr>
<tr>
<td>result. result</td>
<td>Results</td>
<td>SUCCESS/DENIED</td>
</tr>
<tr>
<td>ip_address</td>
<td>Source IP</td>
<td>192.168.1.100</td>
</tr>
<tr>
<td>user_agent</td>
<td>Client info</td>
<td>Mozilla/5.0...</td>
</tr>
<tr>
<td>session_id</td>
<td>Session identifier</td>
<td>session-uuid</td>
</tr>
<tr>
<td>details. details</td>
<td>Additional information</td>
<td>JSON objects</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="73-log-integrity-and-retention">7.3. Log Integrity and Retention</h3><p><strong>Immutability:</strong> Audit logs must be immutable — no one is allowed to modify or delete them. Use:</p><ul><li>Write-once storage (WORM)</li><li>Append-only tables with triggers prevent update/delete</li><li>Blockchain-based verification</li><li>Regular hash chains to detect tampering</li></ul><p><strong>Retention Policy:</strong></p><ul><li>Active storage: 90 days (quick access for investigations)</li><li>Archive storage: 1-7 years (depending on compliance requirements)</li><li>Define clear policy and automate archiving/purging</li></ul><p><strong>Access Control for Logs:</strong></p><ul><li>Separate permission for audit log access</li><li>Only the security/compliance team has access</li><li>Log access to audit logs (meta-auditing)</li></ul><h3 id="74-monitoring-v%C3%A0-alerting">7.4. Monitoring and Alerting</h3><p>Logs have no value if no one sees them. Implement:</p><p><strong>Real-time Alerts:</strong></p><ul><li>Multiple failed login attempts → Possible brute force</li><li>Access denied spikes → Possible unauthorized access attempt</li><li>Bulk data access → Possible data exfiltration</li><li>Access from unusual location → Possible compromised account</li><li>Off-hours access to sensitive data → Needs investigation</li></ul><p><strong>Periodic Reviews:</strong></p><ul><li>Weekly: Review access denied patterns</li><li>Monthly: Review role assignments, look for over-privileged accounts</li><li>Quarterly: Full access review, remove unused permissions</li><li>Annually: Policy review, updated based on organizational changes</li></ul><hr><h2 id="ph%E1%BA%A7n-8-integration-patterns">Part 8: Integration Patterns</h2><h3 id="81-identity-provider-integration">8.1. Identity Provider Integration</h3><p>Most organizations already have an Identity Provider (IdP) such as Active Directory, Okta, Auth0, Keycloak. Decentralized systems need to integrate:</p><p><strong>SAML 2.0:</strong> Standard for enterprise SSO. IdP authenticates user, sends SAML Assertion containing user identity and attributes. Service Provider (application) trust assertion and create session.</p><p><strong>OAuth 2.0 / OpenID Connect:</strong> Modern standard, popular for web and mobile. IdP issue JWT tokens contain claims about the user. Application validate token and extract claims.</p><p><strong>Claims to Include in Token:</strong></p><ul><li>sub: User identifier</li><li>roles: Array of role names</li><li>org_unit_id: Primary organizational unit</li><li>org_unit_path: Full path from root to org unit</li><li>permissions: (Optional) Explicit permissions if not derived from roles</li></ul><h3 id="82-api-gateway-v%C3%A0-authorization">8.2. API Gateway and Authorization</h3><p>API Gateway is the entry point for all API requests. This is the ideal place to implement the first authorization layer:</p><p><strong>Token Validation:</strong> Verify JWT signature, check expiration, validate issuer.</p><p><strong>Coarse-grained Authorization:</strong> Check if the user has permission to call this API (based on roles in token).</p><p><strong>Rate Limiting:</strong> Prevent abuse, can be differentiated limits by role.</p><p><strong>Context Injection:</strong> Extract claims from token, inject into request headers for downstream services to use.</p><p><strong>Note:</strong> API Gateway should only do coarse-grained checks. Fine-grained authorization (for example, does the user have permission to access this specific record) should be handled by the application and database (RLS).</p><h3 id="83-service-to-service-authorization">8.3. Service-to-Service Authorization</h3><p>In microservices architecture, services call each other. Need to authorize these calls:</p><p><strong>Service Accounts:</strong> Each service has its own identity (service account). When Service A calls Service B, Service B verifies A's identity and checks whether A has permission.</p><p><strong>Token Propagation:</strong> User's token is forwarded from one service to another. Downstream service authorization based on original user's permissions.</p><p><strong>Hybrid Approach:</strong> Combine both. Service A calls Service B with both: Service A's identity (for service-level auth) and User's token (for user-level auth). Service B checks both.</p><h3 id="84-caching-authorization-decisions">8.4. Caching Authorization Decisions</h3><p>Authorization checks can be expensive, especially with complex ABAC. Caching helps improve performance:</p><p><strong>Permission Cache:</strong> Cache the result "does user X have permission Y" in short TTL (a few minutes). Invalidate when role/permission changes.</p><p><strong>Policy Decision Cache:</strong> Cache the results of complex ABAC policies. Key = hash of all attributes involved.</p><p><strong>Negative Caching:</strong> Cache all "denied" results. But be careful with false negatives if permission has just been granted.</p><p><strong>Cache Invalidation Strategy:</strong></p><ul><li>Time-based: Short TTL (1-5 minutes)</li><li>Event-based: Invalidate when role assignment changes</li><li>Hybrid: TTL + event-based invalidation</li></ul><hr><h2 id="ph%E1%BA%A7n-9-testing-v%C3%A0-validation">Part 9: Testing and Validation</h2><h3 id="91-authorization-testing-pyramid">9.1. Authorization Testing Pyramid</h3><p><strong>Unit Tests:</strong> Test individual permission check functions. Given user with role X, can they perform action Y? Test edge cases: null inputs, invalid roles, expired sessions.</p><p><strong>Integration Tests:</strong> Test end-to-end from API to database. Verify RLS policies work correctly. Test with real database, not mocks.</p><p><strong>Negative Tests:</strong> Equally important as positive tests. Verify user CANNOT access what they shouldn't. Easily overlooked but critical for security.</p><p><strong>Cross-tenant Tests:</strong> Verify data isolation. User of Tenant A query → should never return Tenant B data.</p><p><strong>Privilege Escalation Tests:</strong> Attempt to bypass authorization. Try direct database access, manipulate tokens, forge session context.</p><h3 id="92-test-scenarios-for-hierarchical-access">9.2. Test Scenarios for Hierarchical Access</h3><p><strong>Scenario 1: Vertical Access</strong></p><ul><li>User in Region level query → Should return Region data + all Branch data under that Region</li><li>User in Branch level query → Should return only that Branch's data</li></ul><p><strong>Scenario 2: Horizontal Isolation</strong></p><ul><li>User in Branch A query → Should NOT return Branch B data</li><li>User in Region North query → Should NOT return Region South data</li></ul><p><strong>Scenario 3: Move Operations</strong></p><ul><li>Branch moved from Region North to Region South</li><li>User in Region North query → Should NOT return moved Branch data anymore</li><li>User in Region South query → Should return moved Branch data</li></ul><p><strong>Scenario 4: Multi-org Users</strong></p><ul><li>User belongs to multiple org units (rare but possible)</li><li>Query should return union of data from all assigned units</li></ul><h3 id="93-security-testing">9.3. Security Testing</h3><p><strong>Penetration Testing:</strong></p><ul><li>Hire external team or use tools like OWASP ZAP, Burp Suite</li><li>Focus on authorization bypass vulnerabilities</li><li>Test token manipulation, parameter tampering, direct object references</li></ul><p><strong>Code Review:</strong></p><ul><li>Review all authorization-related code</li><li>Check for missing authorization checks in new endpoints</li><li>Verify RLS policies cover all tables with sensitive data</li></ul><p><strong>Configuration Audit:</strong></p><ul><li>Review role definitions and assignments</li><li>Look for over-privileged accounts</li><li>Check for orphaned permissions (assigned but not used)</li></ul><hr><h2 id="ph%E1%BA%A7n-10-operational-considerations">Part 10: Operational Considerations</h2><h3 id="101-deployment-strategy">10.1. Deployment Strategy</h3><p><strong>Phased Rollout:</strong></p><p><em>Phase 1 — Foundation (Month 1-2):</em></p><ul><li>Deploy org unit hierarchy model</li><li>Implement basic RBAC with role inheritance</li><li>Enable RLS on critical tables</li></ul><p><em>Phase 2 — Hardening (Month 3-4):</em></p><ul><li>Comprehensive audit logging</li><li>SoD constraints</li><li>Encryption for sensitive data</li><li>Security testing</li></ul><p><em>Phase 3 — Advanced (Month 5-6):</em></p><ul><li>ABAC for complex scenarios</li><li>Field-level access control</li><li>Self-service permission requests</li><li>Analytics and anomaly detection</li></ul><h3 id="102-handling-edge-cases">10.2. Handling Edge Cases</h3><p><strong>User with No Org Unit:</strong> Default deny. User must be assigned org unit before accessing data.</p><p><strong>User with Multiple Org Units:</strong> Union of accessible data. Need careful design to avoid confusion.</p><p><strong>Org Unit Restructuring:</strong> Plan downtime or implement gradual migration. Communicate changes.</p><p><strong>Emergency Access:</strong> "Break glass" procedure for emergencies. Heavily logged, requires justification, auto-expires.</p><p><strong>Orphaned Data:</strong> Data belonging to the org unit has been deleted. Define policy: archive, migrate, or delete.</p><h3 id="103-monitoring-v%C3%A0-health-checks">10.3. Monitoring and Health Checks</h3><p><strong>Metrics to Track:</strong></p><ul><li>Authorization decision latency (P50, P95, P99)</li><li>Cache hit rate</li><li>Number of access denied events</li><li>RLS policy execution time</li><li>Session context set fails</li></ul><p><strong>Health Checks:</strong></p><ul><li>RLS policies enabled on all required tables</li><li>Session context properly set for all requests</li><li>IdP connectivity</li><li>Audit log ingestion rate</li></ul><p><strong>Alerting Thresholds:</strong></p><ul><li>Authorization latency > 100ms (P95)</li><li>Access denied rate spike > 200% baseline</li><li>RLS policy evaluation errors</li><li>Audit log gaps</li></ul><h3 id="104-disaster-recovery">10.4. Disaster Recovery</h3><p><strong>Backup Requirements:</strong></p><ul><li>Database with RLS policies</li><li>IdP configuration (roles, groups, mappings)</li><li>Application authorization configuration</li><li>Audit logs (critical for compliance)</li></ul><p><strong>Recovery Procedures:</strong></p><ul><li>Restore database and verify RLS policies intact</li><li>Verify IdP sync</li><li>Test authorization with known scenarios</li><li>Review audit logs for gaps</li></ul><p><strong>Emergency Procedures:</strong></p><ul><li>Procedure to revoke all access quickly (in case of breach)</li><li>Procedure to restore specific user's access</li><li>Escalation contacts</li></ul><hr><h2 id="k%E1%BA%BFt-lu%E1%BA%ADn-principles-to-remember">Conclusion: Principles to Remember</h2><p>Building a decentralized system for a hierarchical structure is a complex problem but can be solved with the right principles:</p><p><strong>Defense in Depth:</strong> Do not trust any layer completely. API Gateway + Application + Database RLS creates multiple layers of protection.</p><p><strong>Least Privilege:</strong> Grant the minimum necessary permissions. It's easier to add permissions than to revoke granted permissions.</p><p><strong>Separation of Concerns:</strong> Separate role (function) and scope (scope). Role defines "what can be done", scope defines "where to do it".</p><p><strong>Hierarchical Inheritance:</strong> Leverage the tree structure to automatically derive permissions. The superior inherits the view rights of the subordinate.</p><p><strong>Horizontal Isolation:</strong> Peer units must be completely isolated. There is no access path to sibling.</p><p><strong>Audit Everything:</strong> The log is detailed enough to reconstruct "who did what, when, where". This is a requirement for compliance and investigation.</p><p><strong>Test Negative Cases:</strong> Verify not only "accessible" but also "inaccessible". Negative tests are often overlooked but are critical.</p><p><strong>Plan for Change:</strong> Organizational structures will change. Design for flexibility: easy to add units, move units, restructure hierarchy.</p><p>With these principles and the proposed architecture (Hierarchical RBAC + Sub-tenant + RLS + Comprehensive Audit), you can build a robust, scalable, and secure decentralized system for any decentralized organization.</p><p>Code Demo here <a href="https://github.com/xdev-asia-labs/spring-multitenant-rbac">https://github.com/xdev-asia-labs/spring-multitenant-rbac</a><br></p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/screenshot-2025-12-21-at-121935-3de8a3bf.webp" class="kg-image" alt="" loading="lazy" width="1020" height="590" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Tech Stack RBAC</span></figcaption></figure>
