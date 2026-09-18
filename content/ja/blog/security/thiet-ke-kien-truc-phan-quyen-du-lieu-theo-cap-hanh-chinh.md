---
id: 019c9617-fd6f-7042-b48b-3770ede137bf
title: 管理レベル別のデータ分散のアーキテクチャ設計
slug: thiet-ke-kien-truc-phan-quyen-du-lieu-theo-cap-hanh-chinh
excerpt: この記事では、政府から多国籍企業、数千の支店を持つ小売チェーンに至るまで、階層構造システムのデータ分散化アーキテクチャを詳細に分析します。
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
  name: 安全
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
locale: ja
---
<blockquote>ピアユニットが相互に完全に分離されている一方で、上司がすべての部下のデータを監視できるシステムを構築するにはどうすればよいでしょうか?この記事では、政府から多国籍企業、数千の支店を持つ小売チェーンに至るまで、階層構造システムのデータ分散化アーキテクチャを詳細に分析します。</blockquote><hr><h2 id="ph%E1%BA%A7n-1-b%C3%A0i-to%C3%A1n-ph%C3%A2n-quy%E1%BB%81n-ph%C3%A2n-c%E1%BA%A5p">パート 1: 分散化の問題</h2><h3 id="11-%C4%91%E1%BA%B7c-%C4%91i%E1%BB%83m-c%E1%BB%A7a-h%E1%BB%87-th%E1%BB%91ng-ph%C3%A2n-c%E1%BA%A5p">1.1.階層構造の特徴</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/a-c-ie-m-cu-a-he-tho-ng-pha-n-ca-p-ca5b6eb2.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">階層構造の特徴</span></figcaption></figure><p>多くの組織は階層構造に従って運営されています。企業には子会社があり、子会社には支店があり、支店には部門があります。政府には省庁、州、地区、区、コミューンがあります。小売チェーンには地域、地域、店舗があります。</p><p>これらの構造に共通するのは人間関係です <strong>親子</strong> ユニット間で次の特性を持つツリーを形成します。</p><ul><li>各ユニット (ルートを除く) には親ユニットが 1 つだけあります</li><li>各ユニットには多くのサブユニットを含めることができます</li><li>ツリーの深さは枝によって異なる場合があります</li><li>時間の経過とともに構造が変化する可能性があります（合併、分割、再編）</li></ul><h3 id="12-y%C3%AAu-c%E1%BA%A7u-ph%C3%A2n-quy%E1%BB%81n-%C4%91%E1%BA%B7c-th%C3%B9">1.2.特定の許可が必要です</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/f350576b-00af-4f46-83f0-c7a776b08139-f55727ad.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">特定の許可が必要です</span></figcaption></figure><p>分散システムでは、フラットな許可モデルでは満たすことができない特別な許可要件が課されます。</p><p><strong>垂直アクセス:</strong> 上司はすべての部下のデータを参照できる必要があります。 CEO は、すべての子会社や関連会社を含む企業全体のレポートを確認する必要があります。地域マネージャーは、地域内のすべての店舗のデータを確認する必要があります。</p><p><strong>水平方向の分離:</strong> 同じレベルのユニットは、お互いのデータを参照することはできません。支店 A は、支店 B の収益を確認できません (両方が同じ子会社に属している場合でも)。これにより、公正な競争とビジネス情報のセキュリティが確保されます。</p><p><strong>コンテキストの範囲:</strong> 同じ役割ですが範囲が異なります。支店 A の「支店長」は支店 A のみを管理します。支店Bの「支店長」は支店Bを管理するだけです。役割も権限も同じですが、アクセスできるデータが全く異なります。</p><p><strong>境界のある継承:</strong> 権限は垂直方向に継承されますが、水平方向には継承されません。カントリーディレクターは、その国内では地域マネージャーのすべての権利を継承しますが、他の国では何も継承しません。</p><h3 id="13-t%E1%BA%A1i-sao-ph%C3%A2n-quy%E1%BB%81n-ph%E1%BA%B3ng-th%E1%BA%A5t-b%E1%BA%A1i">1.3.なぜフラットな分散化が失敗するのか</h3><p>フラットな分散モデルでは、階層の概念を使用せずに、ユーザーまたはロールに権限を直接割り当てます。階層に適用すると、多くの問題に直面します。</p><p><strong>役割の数が爆発的に増加:</strong> 10 種類のロールと 1,000 個のユニットがある場合、理論的には 10,000 個の個別のロールが必要になります (各ロール ユニットは組み合わせです)。新しいロール タイプを追加すると、1,000 個の新しいロールが作成されることになります。</p><p><strong>一貫性を維持するのが難しい:</strong> ユニットが再構築 (合併、分割) される場合、関連するすべての役割を手動で更新する必要があります。エラーはセキュリティ違反や有効なアクセス権の喪失につながります。</p><p><strong>自然継承はサポートされていません:</strong> 上司が下位データを表示するには、各下位ユニットに手動で権限を付与する必要があります。新しいユニットを追加するとき、上司に権限を与えるのを忘れがちです。</p><p><strong>複雑なクエリ:</strong> 各データ クエリには許可される単位の長いリストを含める必要があるため、クエリが複雑になり、時間がかかります。</p><h3 id="14-quy-m%C3%B4-v%C3%A0-%C4%91%E1%BB%99-ph%E1%BB%A9c-t%E1%BA%A1p">1.4.規模と複雑さ</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/ca-c-va-n-e-cu-a-mo-hi-nh-pha-n-quye-n-pha-ng-trong-he-tho-ng-pha-n-ca-p-ed77b822.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">規模と複雑さ</span></figcaption></figure><p>問題は次のように複雑になります。</p><ul><li><strong>ユニット数:</strong> 数十から数万まで</li><li><strong>ツリーの深さ:</strong> 2～3レベルから5～6レベル以上まで</li><li><strong>構造のダイナミクス:</strong> 固定構造と頻繁に変更される構造</li><li><strong>ユーザー数:</strong> 数百から数百万まで</li><li><strong>レイテンシー要件:</strong> リアルタイム アプリケーションの場合はミリ秒</li><li><strong>コンプライアンス要件:</strong> 監査証跡、データの保存場所、暗号化</li></ul><hr><h2 id="ph%E1%BA%A7n-2-n%E1%BB%81n-t%E1%BA%A3ng-l%C3%BD-thuy%E1%BA%BFt">パート 2: 理論的基礎</h2><h3 id="21-rbac-v%C3%A0-c%C3%A1c-bi%E1%BA%BFn-th%E1%BB%83-theo-chu%E1%BA%A9n-nist">2.1. NIST 標準に準拠した RBAC とバリアント</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/c3d5a155-acdf-4fc9-ae1b-90b45e7a0640-1-201-a-0df31065.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">NIST 標準に準拠した RBAC とバリアント</span></figcaption></figure><p>役割ベースのアクセス制御 (RBAC) は、ANSI/INCITS 359-2004 標準で NIST によって標準化されており、次の 4 つのレベルに分かれています。</p><p><strong>RBAC0 — コア RBAC:</strong> ユーザー、ロール、権限の 3 つのコンポーネントを含む基本モデル。ユーザーにはロールが割り当てられ、ロールには権限が割り当てられます。これは基礎ですが、継承の概念が欠けており、階層システムには適していません。</p><p><strong>RBAC1 — 階層型 RBAC:</strong> 役割階層が追加され、高レベルの役割が低レベルの役割のすべての権限を継承できるようになりました。例: シニア マネージャーはマネージャーから権限を継承し、マネージャーはスタッフから権限を継承します。これは階層的な組織構造に最も適したモデルです。</p><p>階層には 2 つのタイプがあります。</p><ul><li><strong>一般的な階層:</strong> 複数の継承が可能 - 1 つのロールが他の多くのロールから継承可能</li><li><strong>限定された階層:</strong> 単一の継承のみが許可されます。各ロールは単一のロールからのみ継承し、単純なツリーを作成します。</li></ul><p><strong>RBAC2 — 制約付き RBAC:</strong> 制約を追加します。最も重要なのは職務分離 (SoD) です。</p><ul><li><strong>静的 SoD:</strong> ユーザーが競合する役割を同時に保持できないようにします。たとえば、「注文作成者」と「注文承認者」の両方になることはできません。</li><li><strong>動的SoD:</strong> 複数の競合するロールを保持できますが、セッション内で同時にアクティブ化することはできません。ユーザーは「データ入力」と「承認」の両方の役割を持つことができますが、ログイン時にどちらかを選択する必要があります。</li></ul><p><strong>RBAC3 — 対称 RBAC:</strong> RBAC1 と RBAC2 を組み合わせて、完全な階層と制約を提供します。</p><h3 id="22-abac-%E2%80%94-attribute-based-access-control">2.2. ABAC — 属性ベースのアクセス制御</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/87de5d0d-0c9c-442f-b27e-1968c21773e6-1-201-a-7045abcd.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">ABAC — 属性ベースのアクセス制御</span></figcaption></figure><p>ABAC は、認可の決定を行うときに複数の属性を評価することで RBAC を拡張します。</p><ul><li><strong>件名の属性:</strong> ユーザープロパティ — 部門、役職、許可レベル、場所</li><li><strong>リソースの属性:</strong> リソースのプロパティ - 分類、所有者、作成日、機密レベル</li><li><strong>環境属性:</strong> コンテキスト プロパティ — 時刻、IP アドレス、デバイス タイプ、脅威レベル</li><li><strong>アクション属性:</strong> アクションの種類 - 読み取り、書き込み、削除、承認</li></ul><p>ポリシー ABAC はルールとして記述されます。たとえば:</p><pre><code>IF subject.department = resource.owner_department
AND subject.clearance_level &gt;= resource.sensitivity_level
AND environment.time IN business_hours
AND environment.ip_range IN corporate_network
THEN ALLOW action
</code></pre><p>ABAC は強力で柔軟性がありますが、展開が複雑でデバッグが難しく、ポリシーが複雑な場合はパフォーマンスに影響を与える可能性があります。完全な代替としてではなく、詳細な制御が必要な場合には、RBAC に加えて ABAC を使用することをお勧めします。</p><h3 id="23-multi-tenancy-v%C3%A0-c%C3%A1c-m%C3%B4-h%C3%ACnh">2.3.マルチテナンシーとモデル</h3><p>マルチテナンシーは、システムが分離されたデータを使用して複数の独立したテナント (ユニット/組織) にサービスを提供できるようにするアーキテクチャです。</p><p><strong>サイロ化モデル — テナントごとのデータベース:</strong> 各テナントには個別のデータベースがあります。完全な分離、テナントごとのカスタマイズが容易、データ常駐要件への準拠が容易。欠点: インフラストラクチャのコストが高い、テナントの数が多い場合の維持が困難、テナント間のレポートが複雑。</p><p><strong>ブリッジ モデル — テナントごとのスキーマ:</strong> テナントは同じデータベース インスタンスを共有しますが、各テナントには独自のスキーマがあります。分離と効率のバランス。欠点: 1 つのデータベース内のスキーマの数が限られている、移行が複雑。</p><p><strong>プールされたモデル — すべてを共有:</strong> すべてのテナントは同じデータベースとスキーマを共有し、tenant_id 列によって区別されます。コストが最も低く、拡張が容易で、保守も容易です。短所: アプリケーション層とデータベース層で強力な分離メカニズムが必要であり、1 つのバグがすべてのテナントに影響を与える可能性があります。</p><p><strong>推奨事項:</strong> ほとんどの場合、行レベル セキュリティ (RLS) を備えたプール モデル。データ常駐に特別な要件がある場合、またはテナントに詳細なカスタマイズが必要な場合にのみ、サイロ モデルを使用してください。</p><h3 id="24-hierarchical-multi-tenancy">2.4.階層型マルチテナンシー</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/hierarchical-multi-tenancy-b2a7cf53.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">階層型マルチテナンシー</span></figcaption></figure><p>以下はマルチテナントを階層構造に拡張したもので、テナントがフラット リストではなくツリーに編成されています。</p><pre><code>Root Tenant (Headquarters)
├── Sub-tenant: Region North
│   ├── Sub-sub-tenant: Branch A
│   ├── Sub-sub-tenant: Branch B
│   └── Sub-sub-tenant: Branch C
├── Sub-tenant: Region South
│   ├── Sub-sub-tenant: Branch D
│   └── Sub-sub-tenant: Branch E
└── Sub-tenant: Region West
    └── Sub-sub-tenant: Branch F
</code></pre><p><strong>アクセスルール:</strong></p><ul><li>親テナントはすべての子孫テナントのデータを表示できます</li><li>兄弟テナント (同じレベル、同じ親) はお互いのデータを表示できません</li><li>子テナントは親のデータを表示できません（明示的に共有されたデータを除く）</li></ul><p>このモデルは組織構造に自然にマッピングされ、権限管理が簡素化されます。各ユニットに権限を付与する代わりに、ツリー内でのユーザーの位置を決定するだけです。</p><hr><h2 id="ph%E1%BA%A7n-3-thi%E1%BA%BFt-k%E1%BA%BF-data-model-cho-hierarchy">パート 3: 階層のデータ モデルの設計</h2><h3 id="31-c%C3%A1c-c%C3%A1ch-bi%E1%BB%83u-di%E1%BB%85n-c%C3%A2y-trong-database">3.1.データベース内でツリーを表現する方法</h3><p>リレーショナル データベースでツリー構造を表現するには多くのアプローチがあり、それぞれに独自のトレードオフがあります。</p><p><strong>隣接リスト:</strong> 各ノードは、その親の ID を直接保存します。これが最もシンプルで自然な方法です。</p><p><em>利点:</em> 理解しやすく、実装も簡単で、挿入/更新/削除が簡単で、外部キーを使用して整合性を強制するのも簡単です。</p><p><em>短所:</em> すべての子孫または祖先を取得するためのクエリには再帰クエリ (SQL の WITH RECURSIVE) が必要ですが、深いツリーや大きなツリーでは時間がかかる可能性があります。</p><p><em>次の場合に適しています。</em> ツリーはあまり深くなく (< 10 レベル)、主に親子を直接クエリし、構造は頻繁に変更されます。</p><p><strong>ネストされたセット:</strong> 各ノードには、左と右の 2 つの値が保存されます。ノードのすべての子孫は範囲 (parent.left、parent.right) 内に left/right を持ちます。</p><p><em>利点:</em> 子孫のクエリは非常に高速で (BETWEEN 条件のみが必要)、再帰は必要ありません。</p><p><em>短所:</em> 挿入/更新/削除は、他の多くのノードの左側/右側を更新する必要があるため、非常に遅くなります。同時変更は複雑です。</p><p><em>次の場合に適しています。</em> ツリーはめったに変更されず、子孫を頻繁にクエリするため、書き込みパフォーマンスのトレードオフを受け入れることができます。</p><p><strong>クロージャテーブル:</strong> すべての祖先と子孫のペアを深さのある別のテーブルに保存します。たとえば、A → B → C の場合、クロージャ テーブルには (A,A,0)、(A,B,1)、(A,C,2)、(B,B,0)、(B,C,1)、(C,C,0) が含まれます。</p><p><em>利点:</em> クエリの祖先と子孫はどちらも高速であり、再帰の必要はありません。 「ノード X から深さ 2 のすべてのノード」などの複雑なクエリを適切にサポートします。</p><p><em>短所:</em> ストレージ容量を消費します (最悪の場合 O(n²))。挿入/削除では、クロージャ テーブル内の多くの行を更新する必要があります。</p><p><em>次の場合に適しています。</em> 祖先と子孫の両方を定期的にクエリする必要がありますが、ツリーは大きすぎず、トレードオフのストレージを受け入れることができます。</p><p><strong>実体化されたパス:</strong> 各ノードは、ルートからそれ自体へのパスを、通常は文字列 (例: "/1/5/12/") または配列 (例: [1, 5, 12]) として保存します。</p><p><em>利点:</em> 子孫を簡単にクエリします (LIKE '/1/5/%' または配列に含まれる)。挿入は簡単です (親のパスを知る必要があるだけです)。効率的にインデックスを作成できます。</p><p><em>短所:</em> サブツリーを移動するには、すべての子孫のパスを更新する必要があります。木々が深く茂り、道が長くなることもあります。</p><p><em>次の場合に適しています。</em> ツリー構造はめったに変更されず (移動/再親化はまれです)、子孫のクエリは頻繁に行われ、読み取りと書き込みのパフォーマンスのバランスが必要です。</p><h3 id="32-khuy%E1%BA%BFn-ngh%E1%BB%8B-materialized-path-v%E1%BB%9Bi-array">3.2.推奨: 配列を使用した実体化されたパス</h3><p>管理/組織階層については、 <strong>マテリアライズされたパスは配列を使用します</strong> 次の理由から、これは最適な選択です。</p><ul><li>組織構造の変更はまれです (年に数回)</li><li>「X のすべてのサブユニット」というクエリは非常に一般的です (委任の場合)</li><li>PostgreSQL と最新のデータベースは、効率的な GIN インデックスを備えた配列をサポートしています</li><li>RLS ポリシーと簡単に組み合わせることができます</li></ul><p><strong>Organizational_units テーブルを設計します。</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>コラム</th>
<th>種類</th>
<th>説明</th>
</tr>
</thead>
<tbody>
<tr>
<td>ID</td>
<td>UUID</td>
<td>主キー</td>
</tr>
<tr>
<td>コード</td>
<td>VARCHAR</td>
<td>ユニットコード（固有）</td>
</tr>
<tr>
<td>名前</td>
<td>VARCHAR</td>
<td>ユニット名</td>
</tr>
<tr>
<td>レベル</td>
<td>ENUM</td>
<td>レベル（本社、地域、支店など）</td>
</tr>
<tr>
<td>親ID</td>
<td>UUID</td>
<td>親への FK (ルートの場合は null 可能)</td>
</tr>
<tr>
<td>先祖のパス</td>
<td>UUID[]</td>
<td>ルートから親までの ID の配列</td>
</tr>
<tr>
<td>作成日</td>
<td>タイムスタンプ</td>
<td>作成時間</td>
</tr>
<tr>
<td>更新済み</td>
<td>タイムスタンプ</td>
<td>更新時間</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p><strong>データの例:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>ID</th>
<th>名前</th>
<th>レベル</th>
<th>親ID</th>
<th>先祖のパス</th>
</tr>
</thead>
<tbody>
<tr>
<td>uuid-1</td>
<td>本社</td>
<td>本社</td>
<td>ヌル</td>
<td>[]</td>
</tr>
<tr>
<td>uuid-2</td>
<td>北地域</td>
<td>地域。地域</td>
<td>uuid-1</td>
<td>[uuid-1]</td>
</tr>
<tr>
<td>uuid-3</td>
<td>支店A</td>
<td>枝。支店</td>
<td>uuid-2</td>
<td>[uuid-1、uuid-2]</td>
</tr>
<tr>
<td>uuid-4</td>
<td>ブランチB</td>
<td>枝。支店</td>
<td>uuid-2</td>
<td>[uuid-1、uuid-2]</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p><strong>リージョン North (uuid-2) のすべての子孫をクエリします。</strong></p><pre><code class="language-sql">SELECT * FROM organizational_units 
WHERE uuid-2 = ANY(ancestor_path);
</code></pre><p>このクエリは、ブランチ A とブランチ B、つまり、ancestor_path に uuid-2 を持つすべてのユニットを返します。</p><h3 id="33-indexing-strategy">3.3.インデックス戦略</h3><p>大規模なデータセットでパフォーマンスを確保するには:</p><p><strong>ancestor_path の GIN インデックス:</strong> クエリ「X = ANY(ancestor_path)」を迅速に実行できるようにします。</p><p><strong>parent_id の B ツリー インデックス:</strong> 親子を直接クエリしてみましょう。</p><p><strong>(レベル、parent_id) の複合インデックス:</strong> 「リージョン X に属するすべてのブランチ」というクエリが与えられます。</p><p><strong>アクティブなレコードの部分インデックス:</strong> 論理的な削除がある場合は、アクティブなレコードのみにインデックスを付けます。</p><h3 id="34-handling-structural-changes">3.4.構造変化への対応</h3><p>構造が変更される場合 (ユニットをある親から別の親に移動する場合)、そのユニットとすべての子孫の ancestor_path を更新する必要があります。</p><p><strong>ステップ 1:</strong> 新しい ancestor_path = [new_parent.ancestor_path, new_parent.id] を計算します。</p><p><strong>ステップ 2:</strong> 子孫ごとに、ancestor_path 内の古いプレフィックスを新しいプレフィックスに置き換えます。</p><p><strong>注:</strong> サブツリーが大きい場合、これは重い操作になります。オフピーク時間帯に実行する必要があり、バッチ処理と進行状況の追跡が必要になる場合があります。</p><hr><h2 id="ph%E1%BA%A7n-4-row-level-security-%E2%80%94-l%E1%BB%9Bp-b%E1%BA%A3o-v%E1%BB%87-cu%E1%BB%91i-c%C3%B9ng">パート 4: 行レベルのセキュリティ — 保護の最終層</h2><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/39e12b1e-55b1-4389-a24d-e23c3d20eb31-1-201-a-55082eb6.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1116" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">行レベルのセキュリティ — 保護の最終層</span></figcaption></figure><h3 id="41-t%E1%BA%A1i-sao-c%E1%BA%A7n-rls">4.1.なぜ RLS が必要なのでしょうか?</h3><p>アプリケーションレベルの認可では、アプリケーションコード内の権限がチェックされます。これは一般的な方法ですが、次のような弱点があります。</p><ul><li><strong>コードのバグ:</strong> 開発者が新しい API に権限チェックを追加するのを忘れました</li><li><strong>SQLインジェクション:</strong> 攻撃者はアプリケーション層をバイパスし、データベースに直接アクセス</li><li><strong>データベースへの直接アクセス:</strong> DBA、BI ツール、またはハッカーはデータベース アクセス資格情報を持っています</li><li><strong>マイクロサービスの複雑さ:</strong> 多くのサービスが同じデータベースにアクセスするため、すべてのサービスが正しいアクセス許可を確実にチェックすることが困難になります</li></ul><p>行レベル セキュリティ (RLS) は、行レベルでアクセス制御ポリシーを定義できるようにするデータベース (PostgreSQL、SQL Server、Oracle) の機能です。ポリシーはデータベース エンジンによって適用され、アプリケーションからバイパスすることはできません。</p><p><strong>多層防御:</strong> アプリケーションにバグがある場合でも、攻撃者が SQL インジェクションを行った場合でも、データベースは現在のユーザーが表示を許可されている行のみを返します。 RLS は保護の最後の層であり、アプリケーション レベルのチェックに代わるものではなく、追加のセキュリティ層を追加します。</p><h3 id="42-c%C3%A1ch-ho%E1%BA%A1t-%C4%91%E1%BB%99ng-c%E1%BB%A7a-rls">4.2. RLS の仕組み</h3><p><strong>ステップ 1 — ボード上で RLS を有効にします。</strong> デフォルトでは、RLS はオフになっています。有効にすると、そのテーブル上のすべてのクエリがポリシーによってフィルタリングされます。</p><p><strong>ステップ 2 — ポリシーの定義:</strong> ポリシーは、どの行にアクセスを許可するかを決定するブール式です。ポリシーは、SELECT、INSERT、UPDATE、DELETE に個別に、またはすべてに適用できます。</p><p><strong>ステップ 3 — セッションコンテキストを設定します。</strong> アプリケーションはクエリを実行する前にセッション変数 (current_user_id、current_org_unit_id など) を設定します。ポリシーはこれらの変数を使用してフィルタリングします。</p><p><strong>ステップ 4 — クエリの実行:</strong> データベースは、ポリシーの条件をすべてのクエリの WHERE 句に自動的に追加します。ユーザーはこれを変更する必要はありません (変更できません)。</p><h3 id="43-thi%E1%BA%BFt-k%E1%BA%BF-policy-cho-hierarchical-access">4.3.階層型アクセスのポリシー設計</h3><p>設計された ancestor_path モデルを使用すると、ポリシーにより階層アクセスが許可されます。</p><p><strong>ロジック:</strong> ユニット X に属するユーザーは、次の場合にレコードへのアクセスを許可されます。</p><ul><li>レコードはユニット X、またはに属します</li><li>ユニット X は、レコードを所有するユニットの ancestor_path にあります (つまり、X はそのユニットの祖先です)。</li></ul><p><strong>解釈:</strong></p><ul><li>ブランチ A のスタッフ (uuid-3) は、org_unit_id = uuid-3 のレコードのみを表示できます。</li><li>Manager リージョン北 (uuid-2) は、org_unit_id = uuid-2、uuid-3、uuid-4 (リージョンおよびリージョンに属するすべてのブランチ) のレコードを表示できます。</li><li>執行本部 (uuid-1) はすべての記録を表示できます</li></ul><h3 id="44-session-context-management">4.4.セッションコンテキスト管理</h3><p>RLS ポリシーは、「現在のユーザーがどのユニットに属しているか」を知る必要があります。この情報はセッション変数を通じて渡されます。</p><p><strong>PostgreSQL の場合:</strong> 使用する <code>セット</code> そして <code>現在の設定()</code>:</p><pre><code class="language-sql">-- Application set context sau khi xác thực user
SET LOCAL app.current_user_id = 'user-uuid';
SET LOCAL app.current_org_unit_id = 'uuid-3';

-- Policy đọc context
current_setting('app.current_org_unit_id', true)
</code></pre><p><strong>重要な注意事項:</strong></p><ul><li>使用する <code>ローカルに設定</code> (トランザクション内でのみ有効) 代わりに <code>セット</code> (セッション中に有効) リクエスト間のコンテキスト リークを避けるため</li><li>各トランザクションの開始時に常にコンテキストを設定する</li><li>コンテキストが設定されていない場合の処理 (デフォルトは拒否)</li></ul><h3 id="45-performance-considerations">4.5.パフォーマンスに関する考慮事項</h3><p>RLS ポリシーは行ごとに評価され、パフォーマンスに影響を与える可能性があります。</p><p><strong>ポリシーでインデックス付き列が使用されていることを確認してください。</strong> ポリシーチェックの場合 <code>org_unit_id = 任意(...)</code>、org_unit_id のインデックスが必要です。</p><p><strong>ポリシーでの複雑な関数呼び出しを回避します。</strong> 各行がその関数を呼び出します。関数がデータベースにクエリを実行すると、N+1 個の問題が発生します。</p><p><strong>STABLE/IMMUTABLE 関数を使用します。</strong> PostgreSQL がクエリ内の結果をキャッシュできるようにします。</p><p><strong>具体化されたアクセス許可を考慮してください。</strong> リアルタイムのアクセス許可を計算する代わりに、事前に計算して別のテーブルに保存することができ、ポリシーを検索するだけで済みます。</p><h3 id="46-bypass-rls-cho-admin-operations">4.6.管理操作の RLS をバイパスする</h3><p>場合によっては、RLS をバイパスする必要があります。</p><ul><li>システム移行</li><li>バッチ処理ジョブ</li><li>すべてのテナントにわたるレポート</li><li>緊急アクセス</li></ul><p><strong>安全な方法:</strong></p><ul><li>BYPASSRLS 権限を持つ別のデータベース ロールを作成する</li><li>このロールは特定のサービス アカウントによってのみ使用されます</li><li>このロールを使用するすべてのアクセスは詳細に記録されます</li><li>役割が乱用されていないことを確認するための定期的な監査</li></ul><hr><h2 id="ph%E1%BA%A7n-5-role-hierarchy-v%C3%A0-permission-design">パート 5: ロール階層と権限の設計</h2><h3 id="51-t%C3%A1ch-bi%E1%BB%87t-role-v%C3%A0-scope">5.1.役割と範囲を分ける</h3><p>よくある間違いは、ロールとスコープを同じエンティティに結合することです。たとえば、ロール「Branch_A_Manager」、「Branch_B_Manager」、「Region_North_Manager」を作成します。これにより、役割の数が爆発的に増加します。</p><p><strong>より良いデザイン:</strong> 役割 (機能) とスコープ (スコープ) の分離:</p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>ユーザー</th>
<th>役割</th>
<th>スコープ (組織単位)</th>
</tr>
</thead>
<tbody>
<tr>
<td>アリス</td>
<td>マネージャー</td>
<td>支店A</td>
</tr>
<tr>
<td>ボブ</td>
<td>マネージャー</td>
<td>ブランチB</td>
</tr>
<tr>
<td>キャロル</td>
<td>マネージャー</td>
<td>北地域</td>
</tr>
<tr>
<td>デイブ</td>
<td>アナリスト</td>
<td>本社</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p>同じ役割「マネージャー」ですが、範囲が異なります。マネージャーの権限は一度定義され、スコープによってどのデータへのアクセスが許可されるかが決まります。</p><h3 id="52-role-hierarchy-design">5.2.役割階層の設計</h3><p><strong>機能上の役割 (機能別):</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>役割</th>
<th>説明</th>
<th>一般的な権限</th>
</tr>
</thead>
<tbody>
<tr>
<td>ビューア</td>
<td>データとレポートを表示する</td>
<td>読む</td>
</tr>
<tr>
<td>オペレーター</td>
<td>日常業務の処理</td>
<td>読み取り、作成、更新</td>
</tr>
<tr>
<td>マネージャー</td>
<td>チーム管理、承認</td>
<td>読み取り、作成、更新、承認</td>
</tr>
<tr>
<td>管理者</td>
<td>構成管理</td>
<td>読み取り、作成、更新、削除、構成</td>
</tr>
<tr>
<td>監査役</td>
<td>監査</td>
<td>読み取り (監査ログを含む)</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p><strong>役割の継承:</strong></p><pre><code>Administrator
    ↓ inherits
Manager
    ↓ inherits
Operator
    ↓ inherits
Viewer
</code></pre><p>管理者には、マネージャー、オペレーター、閲覧者のすべての権限が自動的に付与されます。</p><p><strong>監査役</strong> 通常、この階層には特別な権限 (監査ログを参照) はありますが、変更権限がないため、この階層には含まれません。</p><h3 id="53-permission-granularity">5.3.許可の粒度</h3><p>権限はさまざまな詳細レベルで定義できます。</p><p><strong>粗粒度 (粗い):</strong></p><ul><li><code>レコード:読み取り</code> — あらゆる種類のレコードを読み取る</li><li><code>レコード:書き込み</code> — あらゆる種類のレコードを作成/編集します</li></ul><p><strong>きめ細かい (詳細):</strong></p><ul><li><code>customer_records:読み取り</code></li><li><code>customer_records:作成</code></li><li><code>customer_records:更新</code></li><li><code>customer_records:削除</code></li><li><code>財務記録:読み取り</code></li><li><code>財務記録:承認</code></li></ul><p><strong>推奨事項:</strong> 粗いものから始めて、実際に必要になったときに改良してください。最初から権限を過剰に設計すると、システムが複雑で管理が困難になります。</p><h3 id="54-separation-of-duties-implementation">5.4.職務分離の実施</h3><p>SoD は、複数の人がプロセスに参加することを要求することで、不正行為やエラーを防ぎます。</p><p><strong>静的 SoD — 競合する役割:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>役割A</th>
<th>役割B</th>
<th>理由</th>
</tr>
</thead>
<tbody>
<tr>
<td>依頼者</td>
<td>承認者</td>
<td>リクエストを自己承認しないでください</td>
</tr>
<tr>
<td>データ入力</td>
<td>監査役</td>
<td>監査人は独立していなければならない</td>
</tr>
<tr>
<td>開発者</td>
<td>デプロイヤー</td>
<td>開発と運用を分離する</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p>ユーザーにロールを割り当てるときは、そのユーザーが競合するロールをすでに持っているかどうかを確認してください。 「はい」の場合は、割り当てを拒否します。</p><p><strong>動的 SoD — 競合するアクティベーション:</strong></p><p>ユーザーが複数のロールを保持できるようにしますが、一度にアクティブになるのは 1 つのロールのみです。たとえば、ユーザーは「データ入力」と「レビュー担当者」の役割を持つことができますが、ログイン時にどちらかを選択する必要があります。これにより、特定のトランザクションが 1 人によって完全に制御されることがなくなりながら、柔軟性 (同じ人が複数のことを実行できる) が可能になります。</p><p><strong>トランザクションベースの SoD:</strong></p><p>各取引を確認してください。例: 注文にはフィールドがあります <code>作成者</code> そして <code>承認済み</code>。システムの施行 <code>承認済み != 作成済み</code>。アプリケーションの作成者がアプリケーション自体を承認した者になることはできません。</p><hr><h2 id="ph%E1%BA%A7n-6-handling-sensitive-data">パート 6: 機密データの処理</h2><h3 id="61-data-classification">6.1.データの分類</h3><p>すべてのデータに同じレベルの保護が必要なわけではありません。データの分類は最初のステップです。</p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>分類</th>
<th>例</th>
<th>保護レベル</th>
</tr>
</thead>
<tbody>
<tr>
<td>公共</td>
<td>会社名、公告等</td>
<td>最小限</td>
</tr>
<tr>
<td>内部</td>
<td>社内メモ、組織図</td>
<td>標準のアクセス制御</td>
</tr>
<tr>
<td>機密</td>
<td>財務報告書、顧客リスト</td>
<td>アクセス制限、監査ログ</td>
</tr>
<tr>
<td>敏感</td>
<td>PII、健康記録、給与情報</td>
<td>暗号化、厳格なアクセス、詳細な監査</td>
</tr>
<tr>
<td>制限付き</td>
<td>営業秘密、M&A計画</td>
<td>必知事項、特別承認</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="62-field-level-access-control">6.2.フィールドレベルのアクセス制御</h3><p>RLS は行レベルで制御します。ただし、場合によってはフィールド (列) レベルでの制御が必要になることがあります。</p><p><strong>たとえば:</strong> テーブル <code>従業員。従業員</code> ID、名前、電子メール、部門、給与、SSN の列があります。人事部はすべてを見ることができます。マネージャーはチームの ID、名前、電子メール、部門を確認できますが、給与と SSN は確認できません。</p><p><strong>実装アプローチ:</strong></p><p><strong>ビューベース:</strong> 各ロールの列のサブセットを含むビューを作成します。マネージャーのクエリ ビューには給与/SSN がありません。</p><p><strong>アプリケーションレベルの予測:</strong> ロールが表示を許可されているアプリケーションのみの SELECT 列。</p><p><strong>列レベルの暗号化:</strong> 機密列を暗号化し、キーを持つロールのみを復号化します。</p><p><strong>動的データマスキング:</strong> データベースは、完全なアクセス権を持たないロールに対してマスクされた値 (SSN の場合は xxx-xx-1234 など) を返します。</p><h3 id="63-encryption-strategies">6.3.暗号化戦略</h3><p><strong>保存時の暗号化:</strong> ディスク上のすべてのデータベース ファイルを暗号化します。物理的アクセス (盗難、不適切な廃棄) からの保護。アプリケーションに対して透過的 - コードを変更する必要はありません。</p><p><strong>透過的データ暗号化 (TDE):</strong> データベースは書き込み時に自動的に暗号化され、読み取り時に復号化されます。データ ファイルとバックアップを保護します。許可されたデータベース ユーザーからは保護されません。</p><p><strong>アプリケーションレベルの暗号化:</strong> アプリケーションはデータベースに送信する前に暗号化し、受信後に復号化します。データベース管理者およびデータベースにアクセスできるすべてのユーザーからの保護。欠点: 暗号化されたデータに対してクエリを実行することはできません (検索可能な暗号化を使用しない限り)。</p><p><strong>列レベルの暗号化:</strong> 特定の列のみを暗号化します。セキュリティと使いやすさのバランス。暗号化されていない列に対してクエリを実行できます。</p><p><strong>機密データに関する推奨事項:</strong></p><ul><li>保存時の暗号化: 常にオン (ベースライン保護)</li><li>アプリケーションレベルの暗号化: 機密性の高い分野 (SSN、健康データ)</li><li>列レベルの暗号化: 時折検索が必要な中程度の機密性のフィールド用</li></ul><h3 id="64-key-management">6.4.鍵の管理</h3><p>暗号化の強度はキー管理と同じくらいです。</p><p><strong>キーストレージ:</strong> キーをコード、構成ファイル、または暗号化されたデータと同じデータベースに保存しないでください。 AWS KMS、HashiCorp Vault、Azure Key Vault などの専用のキー管理システム (KMS) を使用します。</p><p><strong>キーのローテーション:</strong> 定期的 (たとえば、毎年) および問題が発生した場合 (キーが公開される可能性がある) にキーを変更します。新しいキーでデータを再暗号化します。</p><p><strong>主要な階層:</strong> マスターキーはデータキーを暗号化します。データキーは実際のデータを暗号化します。ローテーションが必要な場合は、新しいマスター キーを使用してデータ キーを再暗号化するだけでよく、すべてのデータを再暗号化する必要はありません。</p><p><strong>キーへのアクセス:</strong> 最小特権の原則。復号化する必要があるサービスのみがキーにアクセスできます。すべてのアクセスキーを監査します。</p><hr><h2 id="ph%E1%BA%A7n-7-audit-trail-v%C3%A0-compliance">パート 7: 監査証跡とコンプライアンス</h2><h3 id="71-what-to-log">7.1.ログに記録する内容</h3><p>監査ログでは、誰がどのリソースに何をしたか、いつ、どこから、そしてなぜ (可能な場合) に答えるのに十分な情報を収集する必要があります。</p><p><strong>認証イベント:</strong></p><ul><li>ログイン成功/失敗</li><li>ログアウト</li><li>パスワードの変更/リセット</li><li>MFA イベント</li><li>セッションタイムアウト</li></ul><p><strong>認可イベント:</strong></p><ul><li>アクセスが許可されました</li><li>アクセスが拒否されました</li><li>権限昇格の試行</li><li>役割/権限の変更</li></ul><p><strong>データアクセスイベント:</strong></p><ul><li>機密データの読み取り (必須)</li><li>通常データの読み取り (オプション、要件に基づく)</li><li>レコードの作成</li><li>レコードを更新します (前後の値を含む)</li><li>レコードの削除</li></ul><p><strong>構成の変更:</strong></p><ul><li>システム設定が変更されました</li><li>ユーザー/ロールの管理</li><li>ポリシーの変更</li><li>統合構成</li></ul><p><strong>異常:</strong></p><ul><li>異常なアクセスパターン</li><li>複数回失敗した試行</li><li>新しい場所/デバイスからのアクセス</li><li>一括データアクセス</li></ul><h3 id="72-log-entry-structure">7.2.ログエントリの構造</h3><p>各ログ エントリには次のものが含まれている必要があります。</p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>フィールド</th>
<th>説明</th>
<th>例</th>
</tr>
</thead>
<tbody>
<tr>
<td>タイムスタンプ</td>
<td>時間 (タイムゾーンあり)</td>
<td>2025-01-15T14:30:00Z</td>
</tr>
<tr>
<td>イベントID</td>
<td>一意の識別子</td>
<td>uuid</td>
</tr>
<tr>
<td>イベントの種類</td>
<td>イベントの種類</td>
<td>データアクセス</td>
</tr>
<tr>
<td>アクション。アクション</td>
<td>具体的な行動</td>
<td>読む</td>
</tr>
<tr>
<td>俳優ID</td>
<td>ユーザーがやります</td>
<td>ユーザーUID</td>
</tr>
<tr>
<td>俳優の役割</td>
<td>現在の役割</td>
<td>マネージャー</td>
</tr>
<tr>
<td>アクター組織ユニット</td>
<td>ユーザー単位</td>
<td>ブランチ UUID</td>
</tr>
<tr>
<td>リソースタイプ</td>
<td>リソースの種類</td>
<td>顧客レコード</td>
</tr>
<tr>
<td>リソースID</td>
<td>リソースID</td>
<td>レコード-uuid</td>
</tr>
<tr>
<td>resource_org_unit</td>
<td>所有ユニット</td>
<td>ブランチ UUID</td>
</tr>
<tr>
<td>結果。結果</td>
<td>結果</td>
<td>成功/拒否</td>
</tr>
<tr>
<td>ip_アドレス</td>
<td>送信元IP</td>
<td>192.168.1.100</td>
</tr>
<tr>
<td>ユーザーエージェント</td>
<td>顧客情報</td>
<td>モジラ/5.0...</td>
</tr>
<tr>
<td>セッションID</td>
<td>セッション識別子</td>
<td>セッション-uuid</td>
</tr>
<tr>
<td>詳細。詳細</td>
<td>追加情報</td>
<td>JSONオブジェクト</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="73-log-integrity-and-retention">7.3.ログの整合性と保持</h3><p><strong>不変性:</strong> 監査ログは不変でなければなりません。監査ログを変更または削除することはできません。使用:</p><ul><li>ライトワンスストレージ (WORM)</li><li>トリガーを備えた追加専用テーブルにより更新/削除が防止される</li><li>ブロックチェーンベースの検証</li><li>改ざんを検出するための通常のハッシュ チェーン</li></ul><p><strong>保持ポリシー:</strong></p><ul><li>アクティブ ストレージ: 90 日 (調査のための迅速なアクセス)</li><li>アーカイブ保管期間: 1 ～ 7 年 (コンプライアンス要件に応じて)</li><li>明確なポリシーを定義し、アーカイブ/パージを自動化する</li></ul><p><strong>ログのアクセス制御:</strong></p><ul><li>監査ログへのアクセスに対する個別の権限</li><li>セキュリティ/コンプライアンス チームのみがアクセスできる</li><li>監査ログへのログアクセス (メタ監査)</li></ul><h3 id="74-monitoring-v%C3%A0-alerting">7.4.監視と警告</h3><p>ログは誰も見なければ価値がありません。実装:</p><p><strong>リアルタイムアラート:</strong></p><ul><li>複数回のログイン試行失敗 → ブルートフォースの可能性</li><li>アクセス拒否の急増 → 不正アクセス試行の可能性</li><li>大量のデータアクセス → データ漏洩の可能性</li><li>通常とは異なる場所からのアクセス → アカウントが侵害された可能性</li><li>機密データへの時間外アクセス → 調査が必要</li></ul><p><strong>定期的なレビュー:</strong></p><ul><li>毎週: アクセス拒否パターンを確認する</li><li>毎月: 役割の割り当てを確認し、過剰な権限を持つアカウントを探します。</li><li>四半期ごと: フルアクセスのレビュー、未使用の権限の削除</li><li>毎年: ポリシーのレビュー、組織変更に基づいて更新</li></ul><hr><h2 id="ph%E1%BA%A7n-8-integration-patterns">パート 8: 統合パターン</h2><h3 id="81-identity-provider-integration">8.1.アイデンティティプロバイダーの統合</h3><p>ほとんどの組織は、Active Directory、Okta、Auth0、Keycloak などのアイデンティティ プロバイダー (IdP) をすでに持っています。分散型システムは以下を統合する必要があります。</p><p><strong>SAML 2.0:</strong> エンタープライズ SSO の標準。 IdP はユーザーを認証し、ユーザー ID と属性を含む SAML アサーションを送信します。サービス プロバイダー (アプリケーション) はアサーションを信頼し、セッションを作成します。</p><p><strong>OAuth 2.0 / OpenID Connect:</strong> Web やモバイルで人気の現代の標準。 IdP 発行の JWT トークンには、ユーザーに関するクレームが含まれています。アプリケーションはトークンを検証し、クレームを抽出します。</p><p><strong>トークンに含めるクレーム:</strong></p><ul><li>sub: ユーザー識別子</li><li>ロール: ロール名の配列</li><li>org_unit_id: プライマリ組織単位</li><li>org_unit_path: ルートから組織ユニットまでのフルパス</li><li>権限: (オプション) ロールから派生していない場合の明示的な権限</li></ul><h3 id="82-api-gateway-v%C3%A0-authorization">8.2. APIゲートウェイと認可</h3><p>API ゲートウェイは、すべての API リクエストのエントリ ポイントです。これは、最初の認可レイヤーを実装するのに理想的な場所です。</p><p><strong>トークンの検証:</strong> JWT 署名を検証し、有効期限を確認し、発行者を検証します。</p><p><strong>大まかな認可:</strong> ユーザーがこの API を呼び出す権限を持っているかどうかを確認します (トークン内のロールに基づいて)。</p><p><strong>レート制限:</strong> 悪用を防止し、役割ごとに制限を区別できます。</p><p><strong>コンテキストインジェクション:</strong> トークンからクレームを抽出し、ダウンストリーム サービスが使用するリクエスト ヘッダーに挿入します。</p><p><strong>注:</strong> API Gateway は大まかなチェックのみを実行する必要があります。きめ細かい承認 (たとえば、ユーザーがこの特定のレコードにアクセスする権限を持っているかどうか) は、アプリケーションとデータベース (RLS) によって処理される必要があります。</p><h3 id="83-service-to-service-authorization">8.3.サービス間の認可</h3><p>マイクロサービス アーキテクチャでは、サービスが相互に呼び出します。これらの呼び出しを承認する必要があります。</p><p><strong>サービスアカウント:</strong> 各サービスには独自の ID (サービス アカウント) があります。サービス A がサービス B を呼び出すと、サービス B は A の ID を検証し、A に権限があるかどうかを確認します。</p><p><strong>トークンの伝播:</strong> ユーザーのトークンは、あるサービスから別のサービスに転送されます。元のユーザーの権限に基づくダウンストリーム サービスの承認。</p><p><strong>ハイブリッドアプローチ:</strong> 両方を組み合わせます。サービス A は、サービス A の ID (サービス レベルの認証用) とユーザーのトークン (ユーザー レベルの認証用) の両方を使用してサービス B を呼び出します。サービス B は両方をチェックします。</p><h3 id="84-caching-authorization-decisions">8.4.認可決定のキャッシング</h3><p>承認チェックは、特に複雑な ABAC の場合、コストがかかる場合があります。キャッシュはパフォーマンスの向上に役立ちます。</p><p><strong>権限キャッシュ:</strong> 「ユーザー X に権限 Y があるか」という結果を短い TTL (数分) でキャッシュします。ロール/権限が変更された場合は無効になります。</p><p><strong>ポリシー決定キャッシュ:</strong> 複雑なABACポリシーの結果をキャッシュします。キー = 関係するすべての属性のハッシュ。</p><p><strong>ネガティブ キャッシュ:</strong> すべての「拒否」結果をキャッシュします。ただし、許可が与えられたばかりの場合は、偽陰性に注意してください。</p><p><strong>キャッシュ無効化戦略:</strong></p><ul><li>時間ベース: 短い TTL (1 ～ 5 分)</li><li>イベントベース: 役割の割り当てが変更されたときに無効化</li><li>ハイブリッド: TTL + イベントベースの無効化</li></ul><hr><h2 id="ph%E1%BA%A7n-9-testing-v%C3%A0-validation">パート 9: テストと検証</h2><h3 id="91-authorization-testing-pyramid">9.1.認可テストのピラミッド</h3><p><strong>単体テスト:</strong> 個々の権限チェック機能をテストします。ロール X を持つユーザーは、アクション Y を実行できますか?エッジケースをテストします: null 入力、無効なロール、期限切れのセッション。</p><p><strong>統合テスト:</strong> API からデータベースまでエンドツーエンドでテストします。 RLS ポリシーが正しく機能することを確認します。モックではなく実際のデータベースを使用してテストします。</p><p><strong>陰性検査:</strong> 陽性反応と同様に重要です。ユーザーがアクセスすべきではないものにアクセスできないことを確認します。見落とされがちですが、セキュリティにとって重要です。</p><p><strong>テナント間テスト:</strong> データの分離を確認します。テナント A のクエリのユーザーは、テナント B のデータを決して返してはなりません。</p><p><strong>権限昇格テスト:</strong> 認証をバイパスしようとします。データベースへの直接アクセス、トークンの操作、セッション コンテキストの構築を試してください。</p><h3 id="92-test-scenarios-for-hierarchical-access">9.2.階層アクセスのテスト シナリオ</h3><p><strong>シナリオ 1: 垂直アクセス</strong></p><ul><li>リージョンレベルのクエリのユーザー → リージョンデータとそのリージョン下のすべてのブランチデータを返す必要があります</li><li>ブランチレベルのクエリのユーザー → そのブランチのデータのみを返す必要があります</li></ul><p><strong>シナリオ 2: 水平方向の分離</strong></p><ul><li>ブランチ A クエリのユーザー → ブランチ B データを返すべきではありません</li><li>リージョン北クエリのユーザー → リージョン南データを返すべきではありません</li></ul><p><strong>シナリオ 3: 移動操作</strong></p><ul><li>ブランチをリージョン北からリージョン南に移転しました</li><li>リージョン北のユーザーのクエリ → 移動されたブランチ データを返さないようにする必要があります</li><li>リージョン南のユーザーのクエリ → 移動されたブランチ データを返す必要があります</li></ul><p><strong>シナリオ 4: 複数組織のユーザー</strong></p><ul><li>ユーザーが複数の組織単位に属している (まれですが、可能性があります)</li><li>クエリは、割り当てられたすべてのユニットからのデータの和集合を返す必要があります</li></ul><h3 id="93-security-testing">9.3.セキュリティテスト</h3><p><strong>侵入テスト:</strong></p><ul><li>外部チームを雇うか、OWASP ZAP、Burp Suite などのツールを使用する</li><li>認可バイパスの脆弱性に焦点を当てる</li><li>テストトークンの操作、パラメータの改ざん、オブジェクトの直接参照</li></ul><p><strong>コードレビュー:</strong></p><ul><li>認可関連のコードをすべて確認します。</li><li>新しいエンドポイントで認証チェックが欠落していないか確認する</li><li>RLS ポリシーが機密データを含むすべてのテーブルをカバーしていることを確認します</li></ul><p><strong>構成監査:</strong></p><ul><li>役割の定義と割り当てを確認する</li><li>過剰な権限を持つアカウントを探す</li><li>孤立したアクセス許可 (割り当てられているが使用されていない) を確認します。</li></ul><hr><h2 id="ph%E1%BA%A7n-10-operational-considerations">パート 10: 運用上の考慮事項</h2><h3 id="101-deployment-strategy">10.1.導入戦略</h3><p><strong>段階的ロールアウト:</strong></p><p><em>フェーズ 1 — 基礎 (1 ～ 2 か月目):</em></p><ul><li>組織単位階層モデルのデプロイ</li><li>ロール継承を使用した基本的な RBAC の実装</li><li>重要なテーブルで RLS を有効にする</li></ul><p><em>フェーズ 2 — 硬化 (3 ～ 4 か月目):</em></p><ul><li>包括的な監査ログ</li><li>SoD制約</li><li>機密データの暗号化</li><li>セキュリティテスト</li></ul><p><em>フェーズ 3 — アドバンスト (月 5 ～ 6):</em></p><ul><li>複雑なシナリオのためのABAC</li><li>フィールドレベルのアクセス制御</li><li>セルフサービスの許可リクエスト</li><li>分析と異常検出</li></ul><h3 id="102-handling-edge-cases">10.2.エッジケースの処理</h3><p><strong>組織単位を持たないユーザー:</strong> デフォルトの拒否。データにアクセスする前に、ユーザーには組織単位が割り当てられている必要があります。</p><p><strong>複数の組織単位を持つユーザー:</strong> アクセス可能なデータの結合。混乱を避けるために慎重な設計が必要です。</p><p><strong>組織単位の再構築:</strong> ダウンタイムを計画するか、段階的な移行を実施します。変更を伝えます。</p><p><strong>緊急アクセス:</strong> 緊急時の「ガラス割り」手順。大量にログが記録され、正当な理由が必要で、自動期限切れになります。</p><p><strong>孤立したデータ:</strong> 組織単位に属するデータが削除されました。ポリシーを定義します: アーカイブ、移行、または削除。</p><h3 id="103-monitoring-v%C3%A0-health-checks">10.3.モニタリングとヘルスチェック</h3><p><strong>追跡する指標:</strong></p><ul><li>認可決定のレイテンシ (P50、P95、P99)</li><li>キャッシュヒット率</li><li>アクセス拒否イベントの数</li><li>RLS ポリシーの実行時間</li><li>セッションコンテキストセットが失敗する</li></ul><p><strong>ヘルスチェック:</strong></p><ul><li>必要なすべてのテーブルで RLS ポリシーが有効になっている</li><li>すべてのリクエストに対してセッション コンテキストが適切に設定される</li><li>IdP接続</li><li>監査ログの取り込み率</li></ul><p><strong>アラートしきい値:</strong></p><ul><li>認証遅延 > 100ms (P95)</li><li>アクセス拒否率のスパイク > 200% ベースライン</li><li>RLS ポリシー評価エラー</li><li>監査ログのギャップ</li></ul><h3 id="104-disaster-recovery">10.4.災害復旧</h3><p><strong>バックアップ要件:</strong></p><ul><li>RLS ポリシーを備えたデータベース</li><li>IdP 構成 (ロール、グループ、マッピング)</li><li>アプリケーション認可の構成</li><li>監査ログ (コンプライアンスにとって重要)</li></ul><p><strong>回復手順:</strong></p><ul><li>データベースを復元し、RLS ポリシーが損なわれていないことを確認します</li><li>IdP同期を確認する</li><li>既知のシナリオで認可をテストする</li><li>監査ログを確認してギャップがないか確認する</li></ul><p><strong>緊急時の手順:</strong></p><ul><li>すべてのアクセスを迅速に取り消す手順 (侵害の場合)</li><li>特定のユーザーのアクセスを復元する手順</li><li>エスカレーション連絡先</li></ul><hr><h2 id="k%E1%BA%BFt-lu%E1%BA%ADn-principles-to-remember">結論: 覚えておくべき原則</h2><p>階層構造の分散システムの構築は複雑な問題ですが、適切な原則を使用すれば解決できます。</p><p><strong>多層防御:</strong> どのレイヤーも完全に信頼しないでください。 API ゲートウェイ + アプリケーション + データベース RLS は複数の保護層を作成します。</p><p><strong>最低特権:</strong> 必要最小限の権限を付与します。付与されたアクセス許可を取り消すよりも、アクセス許可を追加する方が簡単です。</p><p><strong>懸念事項の分離:</strong> ロール（機能）とスコープ（スコープ）を分ける。ロールは「何ができるか」を定義し、スコープは「どこで行うか」を定義します。</p><p><strong>階層的な継承:</strong> ツリー構造を利用して権限を自動的に取得します。上司は部下の閲覧権限を継承します。</p><p><strong>水平方向の分離:</strong> ピアユニットは完全に分離する必要があります。兄弟へのアクセス パスはありません。</p><p><strong>すべてを監査する:</strong> ログは「誰が、いつ、どこで何をしたか」を再現できるほど詳細に記録されます。これはコンプライアンスと調査の要件です。</p><p><strong>陰性の場合をテストする:</strong> 「アクセス可能」だけでなく「アクセス不能」も確認します。陰性検査は見逃されがちですが、重要です。</p><p><strong>変化の計画:</strong> 組織構造も変わります。柔軟性を考慮した設計: ユニットの追加、移動、階層の再構築が簡単です。</p><p>これらの原則と提案されたアーキテクチャ (階層型 RBAC + サブテナント + RLS + 包括的監査) を使用すると、あらゆる分散型組織向けに堅牢でスケーラブルで安全な分散型システムを構築できます。</p><p>コードデモはこちら <a href="https://github.com/xdev-asia-labs/spring-multitenant-rbac">https://github.com/xdev-asia-labs/spring-multitenant-rbac</a><br></p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/screenshot-2025-12-21-at-121935-3de8a3bf.webp" class="kg-image" alt="" loading="lazy" width="1020" height="590" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">技術スタック RBAC</span></figcaption></figure>
