---
id: 019c9617-fb66-7039-b71b-ae1b85a72eee
title: 'レッスン 3: Patroni と etcd の紹介'
slug: bai-3-gioi-thieu-patroni-va-etcd
description: Patroni の仕組み、DCS の役割 (etcd/Consul/ZooKeeper)、Raft コンセンサス アルゴリズム、自動リーダー選出メカニズムを理解します。
duration_minutes: 160
is_free: true
video_url: null
sort_order: 3
section_title: 'パート 1: 概要と背景'
course:
  id: 019c9617-fad7-7170-97f5-55c1940af2f5
  title: Patroni と etcd による PostgreSQL の高可用性
  slug: postgresql-high-availability-voi-patroni-etcd
locale: ja
---
<h2 id="m%E1%BB%A5c-ti%C3%AAu">目標</h2><p>このレッスンを終えると、次のことが理解できるようになります:</p><ul><li>Patroni とは何か、その仕組み_</li><li>DCS (分散構成ストア) - etcd/Consul/ZooKeeper</li><li>コンセンサス アルゴリズム(Raft)</li><li>リーダー選挙とフェイルオーバーメカニズム_</li><li>スプリットブレインの問題と解決策</li></ul><h2 id="1-patroni-l%C3%A0-g%C3%AC">1。 Patroni とは何ですか?</h2><h3 id="gi%E1%BB%9Bi-thi%E1%BB%87u">概要</h3><p>Patroni は、Zalando によって開発された PostgreSQL 用のオープンソース HA (高可用性) テンプレートです。次のような PostgreSQL クラスター管理を自動化します。_</p><ul><li><strong>_リーダー選出</strong>: プライマリ ノードを自動的に選択_</li><li><strong>自動フェイルオーバー</strong>: プロジェクト移行プライマリ時の自動バックアップ失敗</li><li><strong>構成管理</strong>: 一元化された構成管理</li><li><strong>ヘルスチェック</strong>: 関連ノードの正常性の監視継続</li></ul><h3 id="ki%E1%BA%BFn-tr%C3%BAc-patroni">Patroniアーキテクチャ</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/777e95e4-36b7-48af-912c-f23d5cebf3c6-1-201-a-ee2b08e0.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Patroni アーキテクチャは、PostgreSQL クラスターを管理するための一般的な選択肢です。</span></figcaption></figure><h3 id="c%C3%A1ch-ho%E1%BA%A1t-%C4%91%E1%BB%99ng-c%E1%BB%A7a-patroni">Patroni の仕組み動作_</h3><ol><li><strong>開始</strong>: 各 Patroni インスタンスが DCS (etcd) に接続</li><li><strong>リーダー選挙</strong>: ノードがリーダーになるために競合します。 DCS</li><li><strong>ロールの割り当て</strong>: リーダー ロックを獲得したノードは PostgreSQL をプライマリに昇格</li><li><strong>ヘルスモニタリング</strong>: Patroni は継続的にチェックします:<ul><li>PostgreSQL プロセス健全性_</li><li>レプリケーションステータス</li><li>DCS接続</li></ul></li><li><strong>自動フェイルオーバー</strong>: リーダーが失敗した場合、Patroniは自動的に:<ul><li>_検出問題</li><li>最適なレプリカの選択</li><li>新しいレプリカをプライマリに昇格</li><li>残りのレプリカを更新_</li></ul></li></ol><h3 id="c%C3%A1c-th%C3%A0nh-ph%E1%BA%A7n-ch%C3%ADnh">メインコンポーネント</h3><h4 id="patroni-daemon">_Patroniデーモン</h4><ul><li>各 PostgreSQL ノードで実行_</li><li>PostgreSQL のライフサイクルを管理_</li><li>ヘルスチェックを実装</li><li> DCS_</li></ul><h4 id="rest-api">REST API_</h4><ul><li>ヘルスチェックのエンドポイント:&nbsp;<code>http://node:8008/health</code></li><li>ヘルスチェックのエンドポイント読み取り専用:&nbsp;<code>http://node:8008/read-only</code></li><li>プライマリのエンドポイント:&nbsp;<code>http://node:8008/master</code>&nbsp;(非推奨)または<code>/プライマリ</code></li></ul><h4 id="patronictl">patronictl</h4><ul><li>クラスター管理用の CLI ツール</li><li>コマンド: リスト、スイッチオーバー、フェイルオーバー、再初期化、再起動、リロード_</li></ul><h2 id="2-dcsdistributed-configuration-store">2。 DCS - 分散構成ストア</h2><h3 id="vai-tr%C3%B2-c%E1%BB%A7a-dcs">DCS の役割</h3><p>DCS は Patroni クラスターの調整センターであり、以下を保存します。</p><ul><li><strong>リーダー キー</strong>: どのノードがリーダーであるかに関する情報(TTL ベース)</li><li><strong>構成</strong>: PostgreSQL と Patroni の構成_</li><li><strong>メンバー情報</strong>:クラスター_</li><li><strong>フェイルオーバー/スイッチオーバー状態</strong>: 切り替えステータス_</li></ul><h3 id="so-s%C3%A1nh-c%C3%A1c-dcs-ph%E1%BB%95-bi%E1%BA%BFn">一般的な DCS 変数の比較</h3>
<!--kg-card-begin: html-->
<table class="sc-jTzLTM pLVjq" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word; font-size: 14px; line-height: 1.6; border-collapse: collapse; color: rgb(212, 212, 212); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(30, 30, 30); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><thead><tr><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">計算関数</th><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">etcd</th><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">領事</th><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">ZooKeepe r_</th></tr></thead><tbody><tr><td style="padding: 5px 10px;"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">言語言語_</strong></td><td style="padding: 5px 10px;">Go</td><td style="padding: 5px 10px;">Go</td><td style="padding: 5px 10px;">_Java</td></tr>___HTMLTAG_18 4___<td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">コンセンサス</strong></td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Raft_</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">_Raft_</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">ZAB (Paxos 風)_</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">API_</strong></td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">gRPC、HTTP</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">HTTP、DNS</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">カスタムプロトコル_</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">_セットアップ_</strong></td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">単純_</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">中央平均</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">複雑その他_</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">パフォーマンス___HTMLTAG_223_ __</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">高</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">高</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">中平均_</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">_ドキュメント_</strong></td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">良い</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">とても良好</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">平均</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">使用状況</strong></td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Kubernetes、Patroni</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">サービスメッシュ、 HA</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Hadoop、Kafka</td></tr></tbody></table>
<!--kg-card-end: html-->
<p><strong>推奨</strong>: シンプルでパフォーマンスが高いため、ほとんどの場合 etcd を使用します。</p><h3 id="etcddistributed-key-value-store">etcd - 分散 Key-Value ストア_</h3><p><strong>機能main_</strong>:</p><ul><li>強い一貫性 (CAP 定理: CP)_</li><li>分散型および高可用性_</li><li>高速 (ミリ秒未満のレイテンシー)</li><li>シンプルな API</li><li>リアルタイム更新の監視メカニズム</li></ul><p><strong>etcd のデータ構造パトロニ_</strong>:</p><pre><code>/service/postgres/
├── config          # Cấu hình cluster
├── initialize      # Bootstrap token
├── leader          # Leader lock (TTL: 30s)
├── members/
│   ├── node1      # Thông tin node1
│   ├── node2      # Thông tin node2
│   └── node3      # Thông tin node3
├── optime/
│   └── leader     # LSN của leader
└── failover       # Failover/switchover instructions
</code></pre><h2 id="3-consensus-algorithmraft">3。コンセンサス アルゴリズム - Raft</h2><h3 id="raft-l%C3%A0-g%C3%AC">Raft とは何ですか?</h3><p>Raft は Paxos よりも理解しやすいように設計されたコンセンサス アルゴリズムであり、次のことが保証されています:</p><ul><li><strong>安全性</strong>: なしfalse の結果を返す</li><li><strong>Liveness</strong>: 常に進行中 (多数派ノードがアクティブな場合)</li><li><strong>Consistency</strong>: すべてのノードが同じように見える状態_</li></ul><h3 id="c%C3%A1c-vai-tr%C3%B2-trong-raft">Raft の役割</h3><ol><li><strong>リーダー</strong>:_<ul><li>すべてのクライアント要求を処理_</li><li>複製受信ログエントリのフォロワー</li><li>用語内で一意</li></ul></li><li><strong>フォロワー</strong>:<ul><li>パッシブ、からのリクエストのみを受信しますリーダー</li><li>ハートビートを受信しない場合は、候補者になります_</li></ul></li><li><strong>_候補者_</strong>:_<ul><li>フォロワーのタイムアウト候補者</li><li>他のノードからの投票をリクエスト</li><li>選挙に勝った場合→リーダー</li></ul></li></ol><h3 id="quy-tr%C3%ACnh-leader-election">リーダープロセス選挙_</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/5f8f0cd1-cf7c-456f-ae89-226a8adf5dfe-1-201-a-71258047.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">リーダー選挙プロセスは、分散システムの一貫性と可用性を確保するために非常に重要です。</span></figcaption></figure><p><strong>選挙詳細__HTMLTAG_354___:_</p><ol><li>選挙タイムアウト中にフォロワーがハートビートを受信しない (150 ～ 300 ミリ秒のランダム)</li><li>候補者に変換し、任期番号を増やす</li><li>投票する自分自身_</li><li>RequestVote RPC をすべてのノードに送信</li><li>多数決を受け取った場合 (n/2 + 1):<ul><li>リーダーになる_</li><li>すぐにハートビートを送信つまり</li></ul></li><li>タイムアウトまたは負けた場合:<ul><li>フォロワーに戻るか、新しく選挙を開始</li></ul></li></ol><h3 id="quorum-v%C3%A0-majority">クォーラムおよびマジョリティ_</h3><p><strong>クォーラム</strong>: システムが動的に動作するために必要なノードの最小数</p><pre><code>Cluster size | Quorum | Tolerated failures
-------------|--------|-------------------
     1       |   1    |        0
     3       |   2    |        1
     5       |   3    |        2
     7       |   4    |        3
</code></pre><p><strong>式</strong>: クォーラム = フロア(n/2) + 1</p><p><strong>3 つのノードの例</strong>:</p><ul><li>✅ 3 つのノードがアクティブ: クラスターは正常</li><li>✅ 2 つのノードがアクティブ: クラスターは動作 (クォーラムを満たす)</li><li>❌ 1 つのアクティブ ノード: クラスターが停止します (クォーラムなし)_</li></ul><p><strong>_推奨</strong>: 障害を最適化するために常に奇数のノード (3、5、7) を使用します。許容範囲。_</p><h2 id="4-leader-election-trong-patroni">4。 Patroni でのリーダー選挙</h2><h3 id="c%C6%A1-ch%E1%BA%BF-leader-lock">リーダー ロック メカニズム</h3><p>Patroni は DCS を使用して分散ロックを実装します:</p><p><strong>リーダー ロックプロパティ</strong>:</p><pre><code class="language-yaml">Key: /service/postgres/leader
Value: 
  {
    "version": "3.0.2",
    "conn_url": "postgres://node1:5432/postgres",
    "api_url": "http://node1:8008/patroni",
    "xlog_location": 123456789,
    "timeline": 2
  }
TTL: 30 seconds
</code></pre><h3 id="quy-tr%C3%ACnh-leader-election-1">リーダー選出プロセス</h3><p><strong>ステップ 1: 競合状態</strong></p><pre><code>Time: T0 - Leader crashes
Node1: Check DCS → No leader key exists
Node2: Check DCS → No leader key exists  
Node3: Check DCS → No leader key exists
</code></pre><p><strong>ステップ 2:ロックの取得の試行_</strong></p><pre><code>Time: T0 + 100ms
Node1: Try acquire lock → SUCCESS (first to write)
Node2: Try acquire lock → FAILED (key exists)
Node3: Try acquire lock → FAILED (key exists)
</code></pre><p><strong>ステップ 3: 役割の割り当て_</strong></p><pre><code>Node1: Promote PostgreSQL to Primary
Node2: Configure as Replica, point to Node1
Node3: Configure as Replica, point to Node1
</code></pre><p><strong>ステップ 4:メンテナンス_</strong></p><pre><code>Every 10 seconds:
Node1 (Leader): 
  - Renew lock (TTL extension)
  - Update xlog_location
  - Send heartbeat

Node2/3 (Followers):
  - Monitor leader key
  - Check replication lag
  - Ready to take over
</code></pre><h3 id="ti%C3%AAu-ch%C3%AD-ch%E1%BB%8Dn-best-replica">最適な選択基準レプリカ_</h3><p>_フェールオーバーの場合、Patroni は次の基準に基づいてレプリカを選択します。</p><ol><li><strong>レプリケーション状態</strong>:<ul><li><code>ストリーミング</code>&nbsp;&gt;&nbsp;<code>アーカイブ内リカバリ_</code></li></ul></li><li><strong>_タイムライン_</strong>: 上位のタイムラインが優先_</li><li><strong>XLog位置_</strong>:<ul><li>レプリカの LSN がプライマリに最も近い</li><li>データ損失が最も少ない</li></ul></li><li><strong>レプリケーションなしlag</strong>:<ul><li><code>pg_stat_replication.replay_lag = 0</code></li></ul></li><li><strong>明示的な候補</strong>: で設定します構成_</li></ol><p><strong>優先タグ</strong>:</p><pre><code class="language-yaml">tags:
  nofailover: false
  noloadbalance: false
  clonefrom: false
  nosync: false
</code></pre><p><strong>ウォレット例</strong>:</p><pre><code>Primary fails at LSN: 0/3000000

Replica1: LSN=0/3000000, lag=0s     ← BEST CHOICE
Replica2: LSN=0/2FFFFFF, lag=1s
Replica3: LSN=0/2FFFFFE, lag=2s

→ Patroni promotes Replica1
</code></pre><h2 id="5-failover-mechanism">5。フェイルオーバー メカニズム_</h2><h3 id="automatic-failover-process">自動フェイルオーバー プロセス</h3><p><strong>タイムラインの詳細詳細</strong>:</p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/failover-mechanism-431e5241.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">自動フェイルオーバープロセス_</span></figcaption></figure><h3 id="c%C3%A1c-b%C6%B0%E1%BB%9Bc-failover-chi-ti%E1%BA%BFt">フェイルオーバー手順の詳細</h3><p><strong>ステップ 1: 障害の検出</strong></p><pre><code class="language-python"># Patroni health check loop
while True:
    if not check_postgresql_health():
        log.error("PostgreSQL unhealthy")
        stop_renewing_leader_lock()
    
    if not check_dcs_connectivity():
        log.error("Lost connection to DCS")
        demote_if_leader()
    
    sleep(10)
</code></pre><p><strong>ステップ 2: リーダーのロック有効期限が切れます_</strong></p><pre><code class="language-bash"># In etcd
$ etcdctl get /service/postgres/leader
# After TTL: Key not found

# Patroni logs on former leader
WARN: Could not renew leader lock
INFO: Demoting PostgreSQL to standby
</code></pre><p><strong>ステップ 3: レプリカのプロモーション_</strong></p><pre><code class="language-bash"># Patroni on promoted replica
INFO: No leader found
INFO: Attempting to acquire leader lock
INFO: Lock acquired successfully
INFO: Promoting PostgreSQL instance
INFO: Updating configuration
INFO: Notifying other members
</code></pre><p><strong>ステップ 4:再構成</strong></p><pre><code class="language-sql">-- On promoted replica
SELECT pg_promote();

-- Changes primary_conninfo to null
-- Restarts as read-write
</code></pre><p><strong>ステップ 5: フォロワーの再ポイント_</strong></p><pre><code class="language-bash"># Other replicas
INFO: New leader detected: node2
INFO: Updating primary_conninfo
INFO: Restarting replication
</code></pre><h3 id="monitoring-failover">フェイルオーバーの監視_</h3><p><strong>重要指標_</strong>:_</p><ul><li><code>patroni_primary_timeline</code>: タイムラインの変更を検出</li><li><code>patroni_xlog_location</code>: WAL の位置を追跡</li><li><code>patroni_replication_lag</code>_:フェイルオーバー前のラグ_</li><li><code>patroni_failover_count</code>: フェイルオーバーの回数をカウントします</li></ul><h2 id="6-split-brain-problem">6。スプリット ブレインの問題_</h2><h3 id="split-brain-l%C3%A0-g%C3%AC">スプリット ブレインとは何ですか?</h3><p><strong>定義_</strong>: 2 つ以上のノードがプライマリであると認識し、異なるデータを記録している状況 → データ</p><h3 id="nguy%C3%AAn-nh%C3%A2n">原因</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/network-partition-325c19b8.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><b><strong style="white-space: pre-wrap;">ネットワークパーティション_</strong></b></figcaption></figure><ol><li><strong>ネットワークパーティション</strong></li><li><strong>DCSパーティション</strong>: etcdクラスタースプリット_</li><li><strong>遅いネットワーク</strong>: ハートビートがタイムアウトしたがノードはまだ生きている</li></ol><h3 id="h%E1%BA%ADu-qu%E1%BA%A3-c%E1%BB%A7a-split-brain">結果スプリット ブレイン</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/ha-u-qua-cu-a-split-brain-87165730.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">スプリット ブレインの結果</span></figcaption></figure><h3 id="patronis-split-brain-prevention">パトローニのスプリット ブレイン防止_</h3><p><strong>メカニズム 1: DCS ベースのロック (プライマリ)</strong></p><pre><code class="language-python">def maintain_leader_lock():
    while is_leader:
        # Must renew within TTL
        success = dcs.renew_lock(ttl=30)
        
        if not success:
            log.critical("Lost leader lock!")
            # Immediate demotion
            demote_to_standby()
            stop_accepting_writes()
            break
        
        sleep(10)
</code></pre><p><strong>メカニズム 2: リーダー キー検証_</strong></p><pre><code class="language-python">def before_handle_write():
    leader_key = dcs.get("/service/postgres/leader")
    
    if leader_key.owner != my_node_name:
        # I'm not the real leader!
        raise Exception("Not leader anymore")
        demote_immediately()
</code></pre><p><strong>メカニズム 3: タイムライン分岐検出_</strong></p><pre><code class="language-sql">-- PostgreSQL timeline
SELECT timeline_id FROM pg_control_checkpoint();

-- If timelines diverge:
-- Node1: timeline=5
-- Node2: timeline=6
-- → Data inconsistency detected
-- → Requires pg_rewind or rebuild
</code></pre><h3 id="quorum-requirement">クォーラム要件</h3><p><strong>_etcd 3 ノード_</strong>:</p><pre><code>Scenario 1: Network partition 1-2 split
  Partition A: Node1 (1 node)
    - Cannot get quorum (1 &lt; 2)
    - Cannot write to etcd
    - Demotes to standby ✓
  
  Partition B: Node2, Node3 (2 nodes)
    - Has quorum (2 ≥ 2)
    - Can elect leader
    - Node2 becomes primary ✓
  
Result: Only 1 primary exists ✓
</code></pre><p><strong>シナリオ 2: 完全な分離_</strong></p><pre><code>Node1: Isolated, loses DCS
  - Tries to renew lock → FAIL
  - Demotes PostgreSQL immediately
  - Stops accepting connections
  
Node2/3: See Node1 gone
  - Elect new leader
  - Only 1 primary in cluster ✓
</code></pre><h3 id="watchdog-timer-advanced-protection">ウォッチドッグ タイマー (高度な)保護)</h3><p><strong>ハードウェアウォッチドッグ</strong>:</p><pre><code class="language-yaml"># patroni.yml
watchdog:
  mode: required  # or automatic, off
  device: /dev/watchdog
  safety_margin: 5
</code></pre><p><strong>アクティブダイナミック</strong>:</p><ol><li>Patroni キックウォッチドッグ デバイスを 10 秒ごと_</li><li>Patroni がハングまたは DCS を失った場合 → キックを停止</li><li>タイムアウト後 → ウォッチドッグがノード全体を再起動</li><li>「ゾンビ プライマリ」を防止シナリオ_</li></ol><h3 id="best-practices-%C4%91%E1%BB%83-tr%C3%A1nh-split-brain">スプリット ブレインを回避するためのベスト プラクティス</h3><ol><li><strong>個別の DCS をデプロイ</strong>: 異なる AZ に etcd クラスター_</li><li><strong>_Monitor DCS の健全性_</strong>: etcd が健全でない場合のアラート</li><li><strong>ネットワークの冗長性</strong>: ノード間の複数のネットワーク パス</li><li><strong>適切タイムアウト_</strong>:_</li></ol><pre><code class="language-yaml">patroni:
  ttl: 30              # Leader lock TTL
  loop_wait: 10        # Check interval
  retry_timeout: 10    # DCS operation timeout
</code></pre><ol start="5"><li><strong>ウォッチドッグを有効にする_</strong>: ハードウェア保護レイヤー_</li><li><strong>モニタリング</strong>:</li></ol><pre><code class="language-bash"># Check for timeline divergence
patronictl list

# Expected: All nodes same timeline
+ Cluster: postgres (7001234567890123456) ----+----+-----------+
| Member | Host         | Role    | State   | TL | Lag in MB |
+--------+--------------+---------+---------+----+-----------+
| node1  | 10.0.1.1:5432| Leader  | running | 5  |           |
| node2  | 10.0.1.2:5432| Replica | running | 5  |         0 |
| node3  | 10.0.1.3:5432| Replica | running | 5  |         0 |
+--------+--------------+---------+---------+----+-----------+
</code></pre><h3 id="recovery-t%E1%BB%AB-split-brain">スプリット ブレインからの回復</h3><p>スプリット ブレインが発生した場合:</p><p><strong>ステップ 1:特定</strong></p><pre><code class="language-bash"># Check timeline
patronictl list
# node1: timeline=5
# node2: timeline=6  ← DIVERGED!
</code></pre><p><strong>ステップ 2: プライマリを選択_</strong></p><ul><li>重要なデータが含まれるノードをさらに選択</li><li>またはそれ以上のデータを持つノードを選択しますtimeline_</li></ul><p><strong>ステップ 3: 分岐レプリカを再構築</strong></p><pre><code class="language-bash"># Option 1: pg_rewind (if safe)
patronictl reinit postgres node2

# Option 2: Full rebuild
patronictl remove postgres node2
# Then: reinitialize from scratch
</code></pre><p><strong>ステップ 4: _</strong></p><pre><code class="language-bash">patronictl list
# All nodes same timeline ✓
</code></pre><h2 id="7-t%E1%BB%95ng-k%E1%BA%BFt">7 を確認します。概要</h2><h3 id="key-takeaways">重要なポイント</h3><p>✅&nbsp;<strong>Patroni</strong>: HA テンプレートは PostgreSQL 管理を自動化しますクラスター_</p><p>✅&nbsp;<strong>DCS (etcd)</strong>: 分散調整、ストア構成、リーダーロック_</p><p>✅&nbsp;<strong>Raft コンセンサス</strong>_: 一貫性の確保etcd でのリーダー選挙</p><p>✅&nbsp;<strong>リーダー選挙</strong>: 自動、高速 (~30 ～ 40 秒)、TTL に基づくロック</p><p>✅&nbsp;<strong>フェイルオーバー</strong>: プライマリ障害時に最適なレプリカを自動的に昇格</p><p>✅&nbsp;<strong>スプリットブレイン防止</strong>: DCS クォーラム+ TTL ロック + ウォッチドッグ_</p><h3 id="ki%E1%BA%BFn-tr%C3%BAc-t%E1%BB%95ng-h%E1%BB%A3p">一般的なアーキテクチャ</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/kien-truc-tong-hop-5f082dc1.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">一般的なアーキテクチャのケース_</span></figcaption></figure><h3 id="c%C3%A2u-h%E1%BB%8Fi-%C3%B4n-t%E1%BA%ADp">レビュー質問_</h3><ol><li>Patroni は純粋なストリーミング レプリケーションとどのように異なりますか?_</li><li>DCS が必要な理由は何ですか?データベースを使用して状態を保存することはできませんか?</li><li>5 ノードのクラスターのクォーラムとは何ですか?</li><li>Patroni はフェイルオーバー時に昇格するレプリカを選択しますか?</li><li>スプリット ブレインが発生しますが、Patroni はどのようにそれを防止しますか? PostgreSQL の __HTMLTAG_740___<li>タイムラインとは何ですか?</li><li>TTL 30 秒とは何ですか? TTL = 5 秒に設定してみてはいかがでしょうか?</li></ol><h3 id="chu%E1%BA%A9n-b%E1%BB%8B-cho-b%C3%A0i-ti%E1%BA%BFp-theo">次のレッスンの準備_</h3><p>レッスン 4 では、インフラストラクチャの準備について説明します。_</p><ul><li>セットアップ 3 VM/サーバー_</li><li>ネットワーク構成、ファイアウォール</li><li>SSH キー、時刻同期_</li><li>必要な依存関係__HTMLTAG_758___</ul>