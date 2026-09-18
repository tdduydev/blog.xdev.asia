---
id: 019c9617-fb5e-71a4-b3a1-a77a7c225818
title: 'レッスン 1: PostgreSQL の高可用性の概要'
slug: bai-1-tong-quan-ve-postgresql-high-availability
description: 高可用性が必要な理由を学び、一般的な HA ソリューション (Patroni、Repmgr、Pacemaker) を比較し、PostgreSQL HA システムの全体的なアーキテクチャを習得します。
duration_minutes: 110
is_free: true
video_url: null
sort_order: 1
section_title: 'パート 1: 概要と背景'
course:
  id: 019c9617-fad7-7170-97f5-55c1940af2f5
  title: Patroni と etcd による PostgreSQL の高可用性
  slug: postgresql-high-availability-voi-patroni-etcd
locale: ja
---
<h2 id="m%E1%BB%A5c-ti%C3%AAu-b%C3%A0i-h%E1%BB%8Dc">レッスンの目的</h2><p>このレッスンを終えると、次のことができるようになります:</p><ul><li>高可用性 (HA) がデータベース システムにとって重要である理由を理解する_</li><li>PostgreSQL の HA 実装方法をマスター_</li><li>Patroni、Repmgr、およびPacemaker_</li><li>PostgreSQL システム HA</li></ul><hr><h2 id="1-t%E1%BA%A1i-sao-c%E1%BA%A7n-high-availability">1 の全体的なアーキテクチャを理解します。高可用性が必要な理由</h2><h3 id="11-v%E1%BA%A5n-%C4%91%E1%BB%81-v%E1%BB%9Bi-single-point-of-failure-spof">1.1。単一点障害 (SPOF) の問題</h3><p>単一サーバーを備えた従来のデータベース システムの場合:</p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/single-point-of-failure-spof-93370e03.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">単一障害点 (SPOF)</span></figcaption></figure><p><strong>次の場合の結果データベース サーバーがクラッシュするエラー:</strong></p><ul><li><strong>ダウンタイム</strong>: アプリケーションがデータにアクセスできない</li><li><strong>収益損失</strong>: ダウンタイムが発生すると、1 分ごとに数百万ドルの損失が発生します。ドン</li><li><strong>評判の損失</strong>: ユーザーはサービスを使用できなくなります</li><li><strong>データ損失</strong>: タイムリーなバックアップ時間がない場合</li></ul><h3 id="12-c%C3%A1c-nguy%C3%AAn-nh%C3%A2n-g%C3%A2y-downtime-ph%E1%BB%95-bi%E1%BA%BFn">1.2。ダウンタイムの一般的な原因</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>原因__HTMLTAG_57___
<th>評価</th>
<th>影響</th>
</tr>
</thead>
<tbody>
<tr>
<td>ハードウェア エラー (ディスク、RAM、CPU)</td>
<td>30%</td>
<td>高</td>
</tr>
<tr>
<td>ネットワーク エラー</td>
<td>20%</td>
<td>平均</td>
</tr>
<tr>
<td>ソフトウェア エラー/バグ__HTMLTAG_83___
<td>25%</td>
<td>高</td>
</tr>
<tr>
<td>メンテナンスには計画があります__HTMLTAG_91___
<td>15%</td>
<td>制御可能</td>
</tr>
<tr>
<td>人的エラー__HTMLTAG_99___
<td>10%</td>
<td>高</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="13-high-availability-l%C3%A0-g%C3%AC">1.3.高可用性とは何ですか?</h3><p><strong>高可用性 (HA)</strong> は、1 つ以上のコンポーネントに障害が発生した場合でもシステムが継続的な動作を維持できる能力です。</p><p><strong>測定インジケーター HA:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>利用可能状況</th>
<th>ダウンタイム/年</th>
<th>ダウンタイム/月</th>
<th>レベル</th>
</tr>
</thead>
<tbody>
<tr>
<td>99% (2 ナイン)</td>
<td>3.65 日</td>
<td>7.2 時間</td>
<td>低</td>
___HTMLタグ_142___
<tr>
<td>99.9% (スリーナイン)</td>
<td>8.76 時間</td>
<td>43.2 分</td>
<td>平均</td>
</tr>
<tr>
<td>99.99% (フォーナイン)</td>
<td>52.56 分__HTMLTAG_157___
<td>4.32 分__HTMLTAG_159___
<td>高</td>
</tr>
<tr>
<td>99.999% (ファイブナイン)</td>
<td>5.26 分</td>
<td>25.9 秒</td>
<td>非常に高い</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="14-l%E1%BB%A3i-%C3%ADch-c%E1%BB%A7a-ha">1.4。 HA の利点</h3><p><strong>ビジネス上の利点:</strong></p><ul><li>ダウンタイムと収益損失を最小限に抑える_</li><li>システムの信頼性を向上_</li><li>ユーザーの向上エクスペリエンス_</li><li>SLA (サービス レベル アグリーメント) を満たす_</li></ul><p><strong>技術的利点:_</strong></p><ul><li>プライマリ サーバーに問題__HTMLTAG_198___<li>_ゼロダウンタイムメンテナンス_</li><li>_読み取りクエリのロード</li><li>災害復旧</li><li>データ保護</li></ul><hr><h2 id="2-c%C3%A1c-ph%C6%B0%C6%A1ng-ph%C3%A1p-ha-cho-postgresql">2。 PostgreSQL</h2><h3 id="21-log-shipping-wal-shipping">2.1 の HA メソッド。ログ配送 (WAL 配送)_</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/log-shipping-wal-shipping-1-d17d26c9.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">_ログ配送 (WAL 配送)_</span></figcaption></figure><p><strong>使い方動作:_</strong></p><ul><li>プライマリ サーバーが WAL (先行書き込みログ) ファイルを書き込む</li><li>WAL ファイルがスタンバイ サーバーにコピーされる</li><li>スタンバイ サーバーが WAL を再生して同期するデータ_</li></ul><p><strong>利点ポイント:</strong></p><ul><li>シンプルでセットアップが簡単</li><li>リソース消費量が少ないオリジナル</li></ul><p><strong>短所:</strong></p><ul><li>目標復旧時間 (RTO) が高い (分→時間)</li><li>自動なしフェイルオーバー</li><li>データ損失が発生する可能性があります__HTMLTAG_252___<li>スタンバイをクエリできません (ウォームスタンバイ)</li></ul><h3 id="22-streaming-replication">2.2。ストリーミング レプリケーション</h3><p><strong>仕組み:</strong></p><ul><li>プライマリ ストリーム WAL がスタンバイにリアルタイムで記録_</li><li>スタンバイが変更を適用すぐに</li><li>スタンバイは読み取りクエリを処理できます (ホットスタンバイ)</li></ul><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/log-shipping-wal-shipping-14c7348d.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">ログ配布 (WAL)送料)</span></figcaption></figure><p><strong>利点:</strong></p><ul><li>低遅延 (&lと; 1 秒)_</li><li>ホット スタンバイは読み取りクエリを処理できます</li><li>同期モードによりデータ損失が軽減されます__HTMLTAG_287___</ul><p><strong>_欠点ポイント:_</strong></p><ul><li>手動フェイルオーバーがまだ必要_</li><li>自動化のための外部ツールが必要_</li></ul><h3 id="23-logical-replication">2.3。論理レプリケーション</h3><p><strong>仕組み:</strong></p><ul><li>論理レベル (テーブル、行) で複製</li><li>選択的レプリケーションを有効にするデータ_</li><li>パブリッシャー → サブスクライバー モデル</li></ul><p><strong>長所:</strong></p><ul><li>異なる PostgreSQL 間のレプリケーションバージョン_</li><li>_選択的レプリケーション (一部のテーブルのみ)_</li><li>_マルチマスター可能 ( BDR)_</li></ul><p><strong>短所:_</strong></p><ul><li>物理レプリケーションよりもオーバーヘッドが高い</li><li>なし メインの HA ソリューション (通常はデータに使用)配布)</li></ul><h3 id="24-shared-storage-san">2.4。共有ストレージ (SAN)_</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/shared-storage-san-c198e575.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">共有ストレージ(SAN)</span></figcaption></figure><p><strong>利点:</strong></p><ul><li>フェイルオーバーが速い (PostgreSQL を起動するだけ)_</li><li>データなし損失_</li></ul><p><strong>短所:</strong></p><ul><li>高価 (SAN インフラストラクチャが必要)</li><li>SAN が単一ポイントになる失敗</li><li>保守が複雑</li></ul><hr><h2 id="3-so-s%C3%A1nh-patroni-vs-repmgr-vs-pacemaker">3。比較: Patroni vs Repmgr vs Pacemaker</h2><h3 id="31-patroni">3.1。 Patroni_</h3><p><strong>特徴:_</strong></p><ul><li>_Python ベース_</li><li>DCS (etcd、Consul、ZooKeeper) を使用してクラスターを保存状態_</li><li>管理用 REST API</li><li>自動スマート フェイルオーバー_</li><li>テンプレート ベース構成_</li></ul><p><strong>利点:</strong></p><ul><li>✅ インストールと構成が簡単 画像</li><li>✅ 強力な REST API_</li><li>✅ Kubernetes との優れた統合_</li><li>✅ 活発な開発、大規模なコミュニティ__HTMLTAG_399___<li>✅ 自動リーダー選出</li><li>✅ ローリングリスタート、ゼロダウンタイムアップデート_</li></ul><p><strong>欠点:</strong></p><ul><li>❌ DCSに依存(コンポーネントの追加)</li><li>❌ DCSの学習が必要(etcd/領事)</li></ul><p><strong>適切なケースを使用してください:</strong></p><ul><li>クラウドネイティブ アプリケーション</li><li>Kubernetes デプロイメント</li><li>マイクロサービス アーキテクチャ</li><li>高いニーズ自動化</li></ul><h3 id="32-repmgr">3.2。 Repmgr</h3><p><strong>機能:</strong></p><ul><li>2ndQuadrant (EnterpriseDB) のオープンソース ツール</li><li>スタンドアロン ツール、 DCS_</li><li>クォーラム投票用の監視ノード_</li><li>コマンドラインベース管理_</li></ul><p><strong>利点:</strong></p><ul><li>✅ 外部 DCS の追加が不要</li><li>✅ より簡単Patroni_</li><li>✅ 優れたドキュメント</li><li>✅ 成熟した、安定</li></ul><p><strong>短所:</strong></p><ul><li>❌ 自動化機能が少ない Patroni</li><li>❌ REST がないAPI_</li><li>❌ 小規模コミュニティ</li><li>❌ 複雑なフェイルオーバーの詳細</li></ul><p><strong>適切なケースを使用する:</strong></p><ul><li>_従来型インフラストラクチャ</li><li>単一のシンプルで少数のノード</li><li>DCS を追加したくない</li></ul><h3 id="33-pacemaker-corosync">3.3。 Pacemaker + Corosync_</h3><p><strong>機能:_</strong></p><ul><li>高可用性クラスターフレームワーク (Linux-HA)</li><li>さまざまなタイプのリソースの管理PostgreSQL_</li><li>投票クォーラムメカニズム</li><li>スプリットブレインを回避するためのフェンシング/STONITH_</li></ul><p><strong>長所スコア:</strong></p><ul><li>✅ 成熟し、本番環境で実証済み (20 年以上)</li><li>✅ 多くのサービス (PostgreSQL、Web サーバーなど) を管理</li><li>✅ 強力なフェンシングメカニズム_</li><li>✅ 共有ストレージをサポート</li></ul><p><strong>欠点:_</strong></p><ul><li>❌ セットアップと設定が非常に複雑保守_</li><li>❌ 学習曲線が高い_</li><li>❌ XML 構成の読み取りが難しい</li><li>❌ デバッグが難しい</li></ul><p><strong>ユースケースが適しているケース:</strong></p><ul><li>エンタープライズ環境_</li><li>多くのサービスを管理する必要がある</li><li>共有ストレージ (SAN) がある</li><li>チームには経験があるペースメーカー_</li></ul><h3 id="34-b%E1%BA%A3ng-so-s%C3%A1nh-t%E1%BB%95ng-quan">3.4。概要比較表</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>基準</th>
<th>パトローニ</th>
<th>_Repmgr</th>
<th>ペースメーカー</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>_複雑さ</strong></td>
<td>平均</td>
<td>低</td>
<td>高</td>
</tr>
<tr>
<td><strong>学習曲線</strong></td>
<td>平均</td>
<td>低</td>
<td>非常に高い</td>
</tr>
<tr>
<td><strong>セットアップ時間</strong></td>
<td>ニャン</td>
<td>ニャン</td>
<td>遅い</td>
</tr>
<tr>
<td><strong>自動フェイルオーバー</strong></td>
<td>✅ 素晴らしい</td>
<td>_✅ 良い</td>
<td>✅ 素晴らしい</td>
</tr>
<tr>
<td><strong>_REST API</strong></td>
<td>✅ はい</td>
<td>❌ いいえ</td>
<td>❌ いいえ_</td>
</tr>
<tr>
<td><strong>_Kubernetes サポート</strong></td>
<td>✅ 素晴らしい</td>
<td>⚠️ 限定</td>
<td>❌ いいえ</td>
</tr>
<tr>
<td><strong>コミュニティ</strong></td>
<td>_⭐⭐⭐⭐⭐</td>
<td>_⭐⭐⭐</td>
<td>_⭐⭐⭐⭐</td>
</tr>
<tr>
<td><strong>ドキュメント</strong></td>
<td>_⭐⭐⭐⭐⭐</td>
<td>⭐⭐⭐⭐</td>
<td>_⭐⭐⭐_</td>
</tr>
<tr>
<td><strong>依存関係_</strong></td>
<td>DCS (etcd/領事)</td>
<td>なし</td>
<td>なし</td>
</tr>
<tr>
<td><strong>_最適</strong></td>
<td>モダン/クラウド</td>
<td>簡単なセットアップ</td>
<td>エンタープライズ/複合施設</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="35-khuy%E1%BA%BFn-ngh%E1%BB%8B">3.5。推奨_</h3><p><strong>次の場合は Patroni を選択してください:</strong></p><ul><li>クラウドまたは Kubernetes にデプロイ_</li><li>自動化と REST API が必要</li><li>_チーム最新の DevOps ツールの使用経験がある</li><li>✅ <strong>これが現在最も人気のあるオプションではありません</strong></li></ul><p><strong>_Repmgr を選択してくださいif:</strong></p><ul><li>簡単なセットアップ、少数のノード (2 ～ 3)</li><li>DCS に依存したくない</li><li>チームは従来の PostgreSQL に精通していますツール_</li></ul><p><strong>次の場合はペースメーカーを選択してください:</strong></p><ul><li>複雑なエンタープライズ環境</li><li>Pacemakerインフラストラクチャはすでに利用可能___HTMLTAG_721__HTMLTAG_722____多くのサービスを同時に管理する必要がある_</li><li>共有ストレージが利用可能(SAN)</li></ul><hr><h2 id="4-ki%E1%BA%BFn-tr%C3%BAc-t%E1%BB%95ng-quan-h%E1%BB%87-th%E1%BB%91ng-patroni-etcd">4。システム概要アーキテクチャ Patroni + etcd</h2><h3 id="41-ki%E1%BA%BFn-tr%C3%BAc-3-node-cluster">4.1。 3 ノード クラスター アーキテクチャ_</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/kie-n-tru-c-to-ng-quan-he-tho-ng-patroni-etcd-d34eb94c.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">システム概要アーキテクチャ Patroni + etcd</span></figcaption></figure><h3 id="42-c%C3%A1c-th%C3%A0nh-ph%E1%BA%A7n-ch%C3%ADnh">4.2。メインコンポーネント_</h3><h4 id="postgresql"><strong>PostgreSQL</strong></h4><ul><li>データベースメインエンジン_</li><li>1 つのノードがリーダー (読み取り/書き込み)</li><li>他のノードがレプリカ(読み取り専用)</li><li>ストリーミング レプリケーションを使用してセットを同期</li></ul><h4 id="patroni"><strong>Patroni</strong></h4><ul><li>PostgreSQL ライフサイクル管理_</li><li>_ノードの健全性の監視_</li><li>自動フェイルオーバーの実行____HTMLTAG_765__HTMLTAG_766___REST API (:8008) を公開してクラスター状態をクエリ_</li><li>構成の読み取り/書き込みDCS</li></ul><h4 id="etcd-dcsdistributed-configuration-store"><strong>etcd (DCS - 分散構成ストア)</strong></h4><ul><li>クラスターの状態と構成の保存</li><li>リーダーの選出 (どのノードがリーダー)</li><li>分散ロック機構</li><li>3 ノードなどがクォーラムを形成 (多数決)_</li></ul><h4 id="haproxy-optional-nh%C6%B0ng-khuy%E1%BA%BFn-ngh%E1%BB%8B"><strong>HAProxy (オプションですが、推奨)_</strong></h4><ul><li>_ロードバランサー</li><li>書き込みトラフィックのルート→リーダー</li><li>読み取りトラフィックのルート→レプリカ(ラウンドロビン)</li><li>ヘルスチェックと自動ルーティングフェイルオーバー</li></ul><h3 id="43-lu%E1%BB%93ng-ho%E1%BA%A1t-%C4%91%E1%BB%99ng">4.3。アクティビティ フロー_</h3><p><strong>1。通常操作_</strong></p><pre><code>1. Application gửi query → HAProxy
2. HAProxy kiểm tra health check
3. Route write → Leader, read → Replicas
4. Patroni trên mỗi node:
   - Gửi heartbeat vào etcd mỗi 10s
   - Update health status
   - Maintain leader lease
</code></pre><p><strong>2。リーダー障害の検出</strong></p><pre><code>1. Node 1 (Leader) gặp sự cố → stop heartbeat
2. etcd phát hiện: leader lease expired (30s)
3. Patroni trên Node 2 và Node 3 nhận ra
4. Leader election được trigger
</code></pre><p><strong>3。自動フェイルオーバー プロセス_</strong></p><pre><code>Timeline: 0s  ──────────► 30s ──────► 45s ──────► 60s
          │              │           │            │
      Leader dies    etcd detects  New leader  Applications
                     lease expire   elected     reconnect
                                   (Node 2)
                                   
Node 1:   LEADER ──────► DOWN ──────────────────► STANDBY (sau khi recover)
Node 2:   REPLICA ─────────────────► LEADER ────► LEADER
Node 3:   REPLICA ──────────────────────────────► REPLICA
</code></pre><p><strong>4。フェイルオーバー後</strong></p><pre><code>- Node 2 trở thành Leader mới
- Node 3 vẫn là Replica, đổi replication source sang Node 2
- HAProxy tự động detect và route traffic sang Node 2
- Node 1 (khi recover) sẽ join lại như Replica
</code></pre><h3 id="44-c%C3%A1c-scenario-quan-tr%E1%BB%8Dng">4.4。重要なシナリオ</h3><h4 id="scenario-1-planned-switchover"><strong>シナリオ 1: 計画的な切り替え</strong></h4><pre><code class="language-bash"># Admin muốn maintenance Node 1 (Leader)
$ patronictl switchover postgres-cluster

# Patroni sẽ:
1. Tạm dừng ghi vào Leader hiện tại
2. Đợi Replica sync hoàn toàn (zero lag)
3. Promote Replica → Leader
4. Demote Leader cũ → Replica
5. Zero data loss, downtime &lt; 5s
</code></pre><h4 id="scenario-2-split-brain-prevention"><strong>シナリオ 2: スプリット ブレイン予防_</strong></h4><pre><code>Tình huống: Network partition giữa nodes

etcd quorum (3 nodes):
- Partition A: Node 1, Node 2 (2 nodes = majority)
- Partition B: Node 3 (1 node = minority)

Kết quả:
✅ Partition A: Tiếp tục hoạt động, có thể elect leader
❌ Partition B: Không thể elect leader (không đủ quorum)

→ Tránh được 2 leaders cùng tồn tại!
</code></pre><h4 id="scenario-3-node-recovery"><strong>_シナリオ 3: ノードの回復_</strong></h4><pre><code>Node 1 recover sau khi die:

1. Patroni start và đọc cluster state từ etcd
2. Nhận ra Node 2 đang là Leader
3. Tự động rejoin như Replica
4. Sử dụng pg_rewind để sync data nếu có divergence
5. Bắt đầu streaming replication từ Node 2
</code></pre><h3 id="45-c%E1%BA%A5u-h%C3%ACnh-timeline-th%C3%B4ng-s%E1%BB%91-quan-tr%E1%BB%8Dng">4.5。タイムライン設定 (重要なパラメータ)_</h3><pre><code class="language-yaml"># patroni.yml
bootstrap:
  dcs:
    ttl: 30                    # Leader lease time (30s)
    loop_wait: 10              # Check interval (10s)
    retry_timeout: 10          # Retry time
    maximum_lag_on_failover: 1048576  # Max lag for failover candidate (1MB)
</code></pre><p><strong>説明:_</strong></p><ul><li><code>ttl: 30</code>: リーダーは更新する必要があります30 秒ごとにリースします。そうでない場合は、デッドとみなされます</li><li><code>loop_wait: 10</code>: Patroni は 10 秒ごとに健全性をチェック</li><li>フェイルオーバー トリガー: (ttl -loop_wait) が終了したとき → ～20～30代</li></ul><hr><h2 id="5-t%E1%BB%95ng-k%E1%BA%BFt">5。概要_</h2><h3 id="key-takeaways">重要なポイント_</h3><ol><li><strong>高可用性は必須__HTMLTAG_857___実稼働システムでダウンタイムとデータ損失を削減するには</li><li><strong>ストリーミング レプリケーション + 自動フェイルオーバー_</strong> は、PostgreSQL で最も一般的な HA 方法です_</li><li><strong>Patroni が最良の選択__HTMLTAG_865___ 現在のほとんどのユースケースには次のとおりです:_<ul><li>_セットアップと保守が簡単_</li><li>_自動スマートフェイルオーバー__HTMLTAG_870___<li>_REST 強力な API__HTMLTAG_872___<li>_クラウド/K8 との優れた統合</li></ul></li><li><strong>3 ノード アーキテクチャ</strong> (Patroni + etcd による) _<ul><li>自動フェイルオーバー (RTO < 30 秒)</li><li>同期レプリケーションによるデータ損失ゼロ</li><li>スプリットブレイン防止</li><li>読み取りのスケーラビリティワークロード</li></ul></li></ol><h3 id="b%C3%A0i-t%E1%BA%ADp-v%E1%BB%81-nh%C3%A0">宿題_</h3><ol><li>さまざまな可用性レベル (99%、99.9%、99.99%) でのシステムのダウンタイムを計算</li><li>特定のユースケース (ノード数、データセンター、RTO/RPO 要件) の HA アーキテクチャ</li><li>HA を使用する場合とビジネスのダウンタイムを許容する場合のコストを比較</li></ol><h3 id="chu%E1%BA%A9n-b%E1%BB%8B-cho-b%C3%A0i-ti%E1%BA%BFp-theo">次のレッスンの準備</h3><p>レッスン 2 で詳しく説明します。 <strong>ストリーミング レプリケーション_</strong> - PostgreSQL HA の基礎:</p><ul><li>WAL の詳細な動作メカニズム</li><li>_同期レプリケーションと非同期レプリケーション_</li><li>レプリケーションスロット_</li><li>ラボ: 手動レプリケーション設定_</li></ul><hr><h2 id="t%C3%A0i-li%E1%BB%87u-tham-kh%E1%BA%A3o">_参考資料_</h2><ul><li><a href="https://www.postgresql.org/docs/current/high-availability.html">_PostgreSQL 公式ドキュメント - 高可用性_</a></li><li><a href="https://github.com/patroni/patroni">Patroni GitHub リポジトリ_</a></li><li><a href="https://etcd.io/docs/">etcd ドキュメント</a></li><li><a href="https://www.postgresql.org/docs/current/warm-standby.html">PostgreSQL ストリーミングレプリケーション_</a></li></ul>