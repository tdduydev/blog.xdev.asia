---
id: 019c9617-fd06-7322-b055-2e68380e39b2
title: Ansible を使用した PostgreSQL 高可用性クラスターの構築
slug: xay-dung-postgresql-high-availability-cluster-voi-ansible
excerpt: 完全に自動化された PostgreSQL HA クラスター ソリューションの導入とオープンソースの経験を共有する
featured_image: /images/blog/postgresql-ha-featured.webp
type: blog
reading_time: 14
view_count: 1
meta: null
published_at: '2025-11-25T16:47:20.000000Z'
created_at: '2026-02-25T18:38:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9617-faa6-70d6-8679-ee4de1f177b3
  name: DevOps
  slug: devops
tags:
  - name: postgresql
    slug: postgresql
  - name: patroni
    slug: patroni
  - name: etcd
    slug: etcd
  - name: devops
    slug: devops
  - name: cicd
    slug: cicd
  - name: highavailability
    slug: highavailability
  - name: ansible
    slug: ansible
  - name: infrastructure-as-code
    slug: infrastructure-as-code
comments: []
locale: ja
---
<h2 id="gi%E1%BB%9Bi-thi%E1%BB%87u">はじめに</h2><p>高可用性 (HA) は、実稼働環境のデータベース システムにとって必須の要件です。ただし、PostgreSQL HA クラスターを最初からデプロイするには多くの場合、多くの調査時間が必要となり、手動構成中にエラーが発生しやすく、環境間で一貫性を維持するのが困難です。</p><p>この記事では、PostgreSQL HA クラスターを迅速かつ確実にデプロイするのに役立つ、Ansible を使用した完全な自動化ソリューションの開発における私たちの経験を共有します。運用環境での使用に成功した後、このソリューションをコミュニティにオープンソースとして公開することにしました。</p><p><strong>リポジトリ</strong>: <a href="https://github.com/xdev-asia-labs/postgres-patroni-etcd-install">postgres-patroni-etcd-install</a></p><h3 id="c%C3%A1c-t%C3%ADnh-n%C4%83ng-ch%C3%ADnh">主な特長</h3><p><strong>自動化と導入</strong></p><ul><li>単一のコマンドでクラスター全体を自動的にデプロイします</li><li>70 を超える一元管理された環境変数を使用したコードとしての構成</li><li>複数環境のサポート (開発、ステージング、実稼働)</li></ul><p><strong>高可用性</strong></p><ul><li>Patroni による自動フェイルオーバー (変換時間 30 ～ 45 秒)</li><li>PostgreSQL 18.1 によるストリーミング レプリケーション</li><li>pg_rewind を使用して障害が発生したノードを自動的に復元する</li></ul><p><strong>パフォーマンスとスケーラビリティ</strong></p><ul><li>PgBouncerによる接続プーリング（多重化比13:1）</li><li>読み取りクエリの負荷分散をサポート</li><li>16GB ～ 64GB+ の RAM を搭載したシステム向けに最適化</li></ul><p><strong>DevOpsの統合</strong></p><ul><li>GitHub Actions を使用した CI/CD パイプライン</li><li>自動化されたテストと検証</li><li>統合されたセキュリティスキャン</li></ul><h2 id="b%E1%BB%91i-c%E1%BA%A3nh-v%C3%A0-%C4%91%E1%BB%99ng-l%E1%BB%B1c-ph%C3%A1t-tri%E1%BB%83n">コンテキストと開発のダイナミクス</h2><h3 id="v%E1%BA%A5n-%C4%91%E1%BB%81-th%E1%BB%B1c-t%E1%BA%BF">現実的な問題</h3><p>本番運用中、午前 2 時に PostgreSQL サーバーでハードウェア エラーが発生するという重大なインシデントが発生しました。その結果、アプリケーション全体が動作を停止し、バックアップからの復元に 45 分かかりました。この事件は収益の損失を引き起こしただけでなく、評判と顧客の信頼にも影響を与えました。</p><h3 id="th%C3%A1ch-th%E1%BB%A9c-khi-tri%E1%BB%83n-khai-ha">HA実装時の課題</h3><p>このインシデントの後、私たちは高可用性ソリューションを実装することを決定しました。ただし、手動構成では次のような多くの困難に直面します。</p><p><strong>高い複雑性</strong>: PostgreSQL レプリケーション、Patroni、etcd、およびそれらの間の相互作用についての深い理解が必要です。調査と構成のプロセスは、経験豊富なエンジニアであれば 2 ～ 3 日かかります。</p><p><strong>エラーのリスク</strong>: 手動構成ではノード間で不整合が発生しやすく、デバッグが困難な問題が発生します。構成ファイルに小さな間違いがあると、クラスター全体が正しく機能しなくなる可能性があります。</p><p><strong>維持が難しい</strong>: 構成を更新したり、クラスターをスケールしたりする必要がある場合は、各ノードで手動で行う必要がありますが、これは時間がかかり、エラーが発生しやすくなります。</p><p><strong>文書の不足</strong>: セットアップ プロセスに関する詳細なドキュメントがないため、新しいオンボード エンジニアがプロジェクトに参加することが困難になっています。</p><h3 id="gi%E1%BA%A3i-ph%C3%A1p">解決策</h3><p>上記の問題を解決するために、一連の Ansible Playbook を開発しました。</p><p><strong>コードとしてのインフラストラクチャ</strong>: すべての構成はバージョン管理されており、必要に応じて簡単に確認してロールバックできます。</p><p><strong>反復可能な展開</strong>: ファイルを変更するだけで、多くの異なる環境 (開発、ステージング、運用) に同一のクラスターをデプロイできます。 <code>.env</code>。</p><p><strong>自己文書化</strong>: Ansible コードは明確であり、詳細な README が付属しているため、新しいチームでも理解しやすく、使用しやすくなっています。</p><p><strong>CI/CDの統合</strong>: 導入前に構成を自動的に検証し、エラーのリスクを最小限に抑えます。</p><p>実稼働環境で 6 か月間以上正常に使用した後、このソリューションをオープンソースにしてコミュニティと共有することにしました。</p><h2 id="ki%E1%BA%BFn-tr%C3%BAc-h%E1%BB%87-th%E1%BB%91ng">システムアーキテクチャ</h2><h3 id="tech-stack">技術スタック</h3><p>このソリューションは、コミュニティで実証済みのテクノロジーを使用します。</p>
<!--kg-card-begin: html-->
<table class="sc-jTzLTM pLVjq" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word; font-size: 14px; line-height: 1.6; border-collapse: collapse; color: rgb(212, 212, 212); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(30, 30, 30); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><thead><tr><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">コンポーネント</th><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">バージョン</th><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">役割</th></tr></thead><tbody><tr><td style="padding: 5px 10px;">PostgreSQL</td><td style="padding: 5px 10px;">18.1</td><td style="padding: 5px 10px;">メインデータベースエンジン</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">パトローニ</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">4.1.0</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">HA オーケストレーションと自動フェイルオーバー</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">etcd</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">3.5.25</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">分散構成ストア</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Pgバウンサー</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">1.25.0</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">接続プーリング層</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">アンシブル</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">2.12+</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">インフラストラクチャの自動化</td></tr></tbody></table>
<!--kg-card-end: html-->
<h3 id="ki%E1%BA%BFn-tr%C3%BAc-t%E1%BB%95ng-quan">一般的なアーキテクチャ</h3><pre><code class="language-text">┌─────────────────────────────────────┐
│       Application Layer             │
│  (Spring Boot / Django / Node.js)   │
└──────────────┬──────────────────────┘
               │ Port 6432 (PgBouncer)
        ┌──────┴──────┬──────────┐
        ▼             ▼          ▼
   ┌────────┐    ┌────────┐   ┌────────┐
   │PgBouncer│   │PgBouncer│  │PgBouncer│
   │Node 1   │   │Node 2   │  │Node 3   │
   └────┬───┘    └────┬───┘   └────┬───┘
        │ Port 5432   │             │
   ┌────▼────┐   ┌───▼────┐   ┌────▼────┐
   │PostgreSQL│  │PostgreSQL│ │PostgreSQL│
   │ PRIMARY │  │ REPLICA  │ │ REPLICA  │
   │Read/Write│  │Read Only│ │Read Only │
   └────┬────┘   └────┬────┘  └────┬────┘
        │ Port 8008   │             │
   ┌────▼────┐   ┌────▼────┐  ┌────▼────┐
   │ Patroni │   │ Patroni │  │ Patroni │
   │HA Mgr   │   │HA Mgr   │  │ HA Mgr  │
   └────┬────┘   └────┬────┘  └────┬────┘
        │ Port 2379   │             │
        └──────┬──────┴─────────────┘
               ▼
        ┌──────────────────┐
        │   etcd Cluster   │
        │ (Leader Election)│
        └──────────────────┘
</code></pre><h3 id="gi%E1%BA%A3i-th%C3%ADch-c%C3%A1c-th%C3%A0nh-ph%E1%BA%A7n">成分説明</h3><p><strong>PgBouncer レイヤー</strong>: 接続プーリングを提供するために各ノードにデプロイされます。アプリケーションは任意のノードに接続できるため、単一障害点とネットワーク遅延が削減されます。</p><p><strong>PostgreSQL クラスター</strong>: 1 つのプライマリ ノード (読み取り/書き込み) と 2 つのレプリカ ノード (読み取り専用) でストリーミング レプリケーションを使用します。 Patroni はクラスターのライフサイクル全体を管理します。</p><p><strong>パトローニ</strong>: HA オーケストレーターとして機能し、継続的なヘルスチェックを実行し、プライマリに障害が発生した場合は自動的にフェイルオーバーし、分散コンセンサスを通じてデータの一貫性を確保します。</p><p><strong>etcdクラスタ</strong>: クラスター構成を保存し、リーダーの選出を実行します。スプリット ブレイン シナリオを回避するために、一度にプライマリ ノードが 1 つだけ存在するようにします。</p><h3 id="t%E1%BA%A1i-sao-3-nodes">なぜ 3 ノードなのか?</h3><p>HA クラスターの最小数は 3 ノードです。次の理由からです。</p><ul><li><strong>定員会</strong>: etcd はクォーラム (2/3) を達成するために少なくとも 3 つのノードを必要とし、1 つのノードの障害を許容します</li><li><strong>費用対効果の高い</strong>: インフラストラクチャに多額の費用をかけずに HA を確保するには十分です</li><li><strong>実証済みのパターン</strong>: PostgreSQL および etcd コミュニティによって推奨される標準の数です。</li></ul><h2 id="h%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-tri%E1%BB%83n-khai">実装ガイド</h2><h3 id="y%C3%AAu-c%E1%BA%A7u-h%E1%BB%87-th%E1%BB%91ng">システム要件</h3><p><strong>ハードウェア (ノードごと)</strong></p><p>ラボ/開発環境の最小要件:</p><ul><li>CPU：2コア</li><li>RAM: 4GB</li><li>ディスク: 20 GB (OS) + 20 GB (データ)</li><li>ネットワーク: 1 Gbps</li></ul><p>本番環境に推奨されるもの:</p><ul><li>CPU：4～8コア</li><li>RAM: 16-32 GB</li><li>ディスク: 50 GB SSD (OS) + 100+ GB NVMe SSD (データ)</li><li>ネットワーク: 10 Gbps</li></ul><p><strong>ソフトウェア</strong></p><p>制御ノード (Ansible を実行しているマシン):</p><ul><li>Ansible >= 2.12</li><li>Python >= 3.9</li></ul><p>ターゲットノード:</p><ul><li>Ubuntu 22.04 LTS / Debian 12 / Rocky Linux 9</li><li>root または sudo 権限による SSH アクセス</li><li>Python 3.xがインストールされている</li></ul><h3 id="c%C3%A1c-b%C6%B0%E1%BB%9Bc-tri%E1%BB%83n-khai">実装手順</h3><p><strong>ステップ 1: リポジトリを準備する</strong></p><pre><code class="language-bash">git clone https://github.com/xdev-asia-labs/postgres-patroni-etcd-install.git
cd postgres-patroni-etcd-install
</code></pre><p><strong>ステップ 2: 環境の構成</strong></p><p>テンプレートから構成ファイルを作成します。</p><pre><code class="language-bash">cp .env.example .env
</code></pre><p>重要なパラメータを編集します。</p><pre><code class="language-bash"># Địa chỉ IP của các nodes
NODE1_IP=10.0.0.11
NODE2_IP=10.0.0.12
NODE3_IP=10.0.0.13

# Mật khẩu PostgreSQL (bắt buộc phải thay đổi)
POSTGRESQL_SUPERUSER_PASSWORD=your_strong_password_here
POSTGRESQL_REPLICATION_PASSWORD=your_replication_password_here

# Performance tuning (ví dụ cho server 16GB RAM)
POSTGRESQL_SHARED_BUFFERS=4GB
POSTGRESQL_EFFECTIVE_CACHE_SIZE=12GB
POSTGRESQL_MAX_CONNECTIONS=100
PGBOUNCER_MAX_CLIENT_CONN=1000
</code></pre><p><strong>ステップ 3: インベントリの構成</strong></p><p>編集 <code>インベントリ/hosts.yml</code>:</p><pre><code class="language-yaml">all:
  children:
    postgres:
      hosts:
        pg-node1:
          ansible_host: 10.0.0.11
          patroni_name: node1
</code></pre><p><strong>ステップ 4: クラスターのデプロイ</strong></p><pre><code class="language-bash"># Load environment variables
set -a &amp;&amp; source .env &amp;&amp; set +a

# Deploy cluster
ansible-playbook playbooks/site.yml -i inventory/hosts.yml
</code></pre><p><strong>ステップ 5: 確認する</strong></p><pre><code class="language-bash">ssh root@10.0.0.11 "patronictl -c /etc/patroni/patroni.yml list"
</code></pre><h2 id="t%C3%ADnh-n%C4%83ng-n%E1%BB%95i-b%E1%BA%ADt">優れた機能</h2><h3 id="configuration-as-code">コードとしての構成</h3><p>すべての構成はファイルで管理されます <code>.env</code> 70 を超える変数を使用すると、次のことが可能になります。</p><ul><li>構成の管理と監査が簡単</li><li>ファイルを交換するだけで環境を切り替えることができます <code>.env</code></li><li>より優れたセキュリティ <code>.gitignore</code> 機密データ用</li><li>開発者にとって使いやすく、Ansible を深く理解する必要はありません</li></ul><h3 id="connection-pooling">接続プーリング</h3><p>PgBouncer は接続を最適化するように構成されています。</p><ul><li>13:1 の多重化比 (3000 クライアント → 225 バックエンド接続)</li><li>マルチホストサポートによる自動フェイルオーバー</li><li>PostgreSQL のメモリと CPU オーバーヘッドを削減する</li></ul><h3 id="zero-downtime-operations">ゼロダウンタイムオペレーション</h3><p><strong>計画的な切り替え</strong>: 計画されたプライマリ ノードの移行では、ダウンタイムはわずか 2 ～ 5 秒です。</p><p><strong>自動フェイルオーバー</strong>: プライマリに障害が発生した場合、30 ～ 45 秒で自動フェイルオーバーします。</p><p><strong>ローリングアップデート</strong>: サービスの可用性に影響を与えずに構成またはバージョンを更新します。</p><h2 id="cicd-pipeline">CI/CD パイプライン</h2><h3 id="automated-validation">自動検証</h3><p>GitHub Actions は各変更を自動的に検証します。</p><ul><li>YAML構文チェック</li><li>Ansible プレイブックの検証</li><li>セキュリティ スキャン (Trivy、TruffleHog)</li><li>コードの品質チェック</li></ul><h3 id="release-automation">リリースオートメーション</h3><p>新しいタグ (v1.0.0) を作成すると、GitHub Actions は自動的に次のことを行います。</p><ul><li>git 履歴から変更ログを生成する</li><li>リリースアーカイブを作成する</li><li>ドキュメントを含む GitHub リリースを公開する</li></ul><h2 id="performance">パフォーマンス</h2><p>3 ノード (16GB RAM、ノードあたり 5 コア) のテスト環境:</p><ul><li>読み取りQPS: 50,000-100,000</li><li>書き込みQPS: 10,000-20,000</li><li>フェイルオーバー時間: 30 ～ 45 秒</li><li>接続容量: 3,000クライアント</li><li>クエリ遅延: <5ms (単純なクエリ)</li></ul><h2 id="b%C3%A0i-h%E1%BB%8Dc-kinh-nghi%E1%BB%87m">学んだ教訓</h2><h3 id="1-s%E1%BB%AD-d%E1%BB%A5ng-proven-tools">1. 実績のあるツールを使用する</h3><p>独自に開発する代わりに、Patroni、etcd、PgBouncer などの実績のあるテクノロジーを使用します。これにより、車輪の再発明ではなく自動化に重点を置くことができます。</p><h3 id="2-configuration-as-code">2. コードとしての構成</h3><p>構成の外部化 <code>.env</code> Playbook でハードコードする代わりにファイルを使用することで、さまざまな環境に合わせたカスタマイズと保守が容易になります。</p><h3 id="3-security-first">3. セキュリティ第一</h3><p>最初から常にセキュリティを優先します。</p><ul><li>使用する <code>.gitignore</code> 機密ファイル用</li><li>強力なパスワードを生成する</li><li>ファイアウォールルールを自動的に構成する</li><li>セキュリティスキャンをCIに統合する</li></ul><h3 id="4-documentation-matters">4. 文書化に関する事項</h3><p>適切なドキュメントはオンボーディング時間を短縮し、プロジェクトのプロフェッショナリズムを実証します。当社では完全なドキュメントを英語とベトナム語の両方で管理しています。</p><h2 id="roadmap">ロードマップ</h2><p>開発中の機能:</p><ul><li>統合された Prometheus/Grafana モニタリング</li><li>pgBackRest による自動バックアップ</li><li>クラウド展開のための Terraform サポート</li><li>Docker/Kubernetes導入オプション</li><li>マルチリージョンレプリケーション</li></ul><h2 id="khi-n%C3%A0o-n%C3%AAn-s%E1%BB%AD-d%E1%BB%A5ng">いつ使用するべきですか?</h2><p><strong>以下に適しています:</strong></p><ul><li>アプリケーションには高可用性 (稼働時間 > 99.9%) が必要です。</li><li>システムは長時間にわたるダウンタイムを許容できません</li><li>複数の同時接続を備えたマルチテナント アプリケーション</li><li>Teams はコードとしてのインフラストラクチャを適用します</li></ul><p><strong>次の場合は必要ありません。</strong></p><ul><li>開発・テスト環境がシンプル</li><li>低トラフィックのアプリケーション</li><li>アプリケーションは時折のダウンタイムを許容する場合があります</li><li>予算の制約 (少なくとも 3 台のサーバーが必要)</li></ul><h2 id="k%E1%BA%BFt-lu%E1%BA%ADn">結論</h2><p>適切なツールとアプローチを使用すれば、PostgreSQL 高可用性クラスターの構築はもはや大きな課題ではなくなります。このソリューションは実稼働環境で実証されており、多くの重要なシステムの稼働時間を確保するのに役立ちます。</p><p>この一連の Ansible Playbook を使用すると、本番環境に対応したクラスターを 10 分でデプロイし、99.9% を超える稼働率を達成し、Infrastructure as Code メソッドに従ってインフラストラクチャを管理できます。</p><h3 id="%C4%91%C3%B3ng-g%C3%B3p">貢献する</h3><p>プロジェクトが役立つと思われる場合:</p><ul><li>⭐ スターリポジトリ</li><li>🐛 問題を報告する</li><li>💬 フィードバックを共有する</li><li>🤝 コードを提供する</li><li>📢 コミュニティと共有する</li></ul>
