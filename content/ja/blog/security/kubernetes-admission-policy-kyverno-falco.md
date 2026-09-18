---
id: 019d0001-1005-7005-b005-000000000005
title: 'KyvernoとFalcoによるKubernetesアドミッションポリシーとランタイム防御'
slug: kubernetes-admission-policy-kyverno-falco
excerpt: >-
  静的なイメージスキャンでは、コンテナ稼働中の異常な振る舞いは検知できません。アドミッション
  ポリシー（Kyverno）でコンプライアンス違反のワークロードをブロックし、ランタイム
  モニター（Falco）でコンテナ内シェルやラテラルムーブメントを検知する組み合わせが必要です。
featured_image: /images/blog/k8s-kyverno-falco-featured.webp
type: blog
reading_time: 9
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
  name: セキュリティ
  slug: security
tags:
  - name: devsecops
    slug: devsecops
  - name: kubernetes
    slug: kubernetes
  - name: kyverno
    slug: kyverno
  - name: falco
    slug: falco
  - name: runtime-security
    slug: runtime-security
comments: []
locale: ja
---
<blockquote>イメージスキャンと脅威モデリングはデプロイ前を守ります。アドミッションポリシーはワークロードがクラスタに入る瞬間（moment of truth）を守ります。ランタイムモニターはその後に起こるすべてを記録する監視カメラです。</blockquote>

<h2 id="ba-lop-bao-ve">クラスタ内の3つの防御レイヤー</h2>
<table>
  <thead><tr><th>レイヤー</th><th>役割</th><th>ツール</th></tr></thead>
  <tbody>
    <tr><td>プリアドミッション</td><td>Lint、イメージスキャン、署名検証</td><td>Trivy、Cosign</td></tr>
    <tr><td>アドミッション</td><td>ポリシー違反のワークロードをブロック</td><td>Kyverno、OPA Gatekeeper</td></tr>
    <tr><td>ランタイム</td><td>異常な挙動の検知、ネットワークポリシー</td><td>Falco、Cilium Tetragon、NetworkPolicy</td></tr>
  </tbody>
</table>

<h2 id="kyverno-vs-opa">Kyverno vs OPA Gatekeeper——どちらを選ぶか？</h2>
<ul>
  <li><strong>Kyverno</strong>：純粋なYAMLでポリシーを記述でき、短く、学習が容易。Mutate、Generate、verifyImagesキーレスをサポート。多くのケースに適しています。</li>
  <li><strong>OPA Gatekeeper</strong>：Regoで記述し、複雑なロジックに強力。OPAエコシステム（APIゲートウェイ、マイクロサービス認可）が既にある場合に適しています。</li>
</ul>
<p>推奨：新しいクラスタはKyvernoから始めましょう。ポリシーは宣言的なので、後から両者間で移行するのは難しくありません。</p>

<h2 id="baseline-policy">用意すべきベースラインポリシー</h2>
<ol>
  <li>アプリ用ネームスペースに<strong>Pod Security Standards: restricted</strong>を適用。</li>
  <li><code>privileged: true</code>、<code>hostNetwork</code>、<code>hostPID</code>で実行されるPodをブロック。</li>
  <li>イメージは社内レジストリ（許可リスト）からのみ要求。</li>
  <li>すべてのコンテナに<code>resources.requests/limits</code>を要求。</li>
  <li>標準ラベル（team、env、cost-center）をコスト追跡とIRのために要求。</li>
  <li>本番イメージのCosign署名を検証。</li>
</ol>

<h2 id="audit-truoc-enforce">安全な展開：Audit → Fix → Enforce</h2>
<p>稼働中のクラスタに対して、いきなり<code>validationFailureAction: Enforce</code>を適用してはいけません。参考プロセス：</p>
<ol>
  <li><code>validationFailureAction: Audit</code>でポリシーを適用。</li>
  <li>1〜2週間、Kyverno PolicyReport CRDで違反を測定。</li>
  <li>違反した各ワークロードに対し、オーナー付きの修正チケットを作成。</li>
  <li>ステージング環境で違反が0になったら、dev → staging → prodの順にEnforceに切り替え。</li>
</ol>
<p>明確な例外プロセスを用意しましょう：特殊なワークロード（特権デバッグPodなど）には、理由・有効期限・オーナーを記載したアノテーションを必須にします。</p>

<h2 id="network-policy-default-deny">デフォルト拒否のネットワークポリシー</h2>
<p>各アプリ用ネームスペースは「すべて拒否」ポリシーから始め、実際の要件に応じて段階的に開放しましょう：</p>
<pre><code class="language-yaml">apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: payments
spec:
  podSelector: {}
  policyTypes: ["Ingress", "Egress"]
</code></pre>
<p>その後、必要な接続を1つずつ開放します：アプリ → DB、アプリ → サービスメッシュ、外部APIへのエグレスはエグレスゲートウェイ経由など。<strong>Cilium</strong>を使えばL7（HTTPパス、gRPCメソッド、Kafkaトピック）でのポリシーが可能で、ポート/IPだけよりはるかに強力です。</p>

<h2 id="falco-runtime-detection">Falco：コンテナのランタイム検知</h2>
<p>Falcoはカーネル（eBPFまたはカーネルモジュール）にフックしてシステムコールを観察します。最も価値のあるルールの一例：</p>
<ul>
  <li><strong>コンテナ内シェル</strong>：<code>shell_in_container</code>。本番環境でシェルが正当な理由を持つことは稀です。</li>
  <li>ランタイムイメージ内の<strong>バイナリファイル改変</strong>（侵害の兆候）。</li>
  <li>許可リスト外のIP/ドメインへの<strong>異常な外向き接続</strong>。</li>
  <li><code>/etc/shadow</code>やkubeconfigなど<strong>機密ファイルの読み取り</strong>。</li>
  <li><code>/var/run/docker.sock</code>や<code>/proc</code>などの<strong>機密パスのマウント</strong>。</li>
</ul>
<p>高重要度ルールのFalcoイベントはSlack/PagerDutyへ、その後の分析用にはSIEMへストリームしましょう。</p>

<h2 id="cilium-tetragon">Cilium Tetragon：ハードウェア支援、低オーバーヘッド</h2>
<p>TetragonもeBPFを使いますが、大規模クラスタ向けに性能が最適化されており、検知だけでなく<strong>強制（enforce）</strong>も可能です（例：違反するシステムコール時にプロセスをkill）。インカーネルでの応答時間が必要な場合に適しています。</p>

<h2 id="khi-co-alert">アラートが鳴ったら——簡潔なIRワークフロー</h2>
<ol>
  <li>15分以内にトリアージ：重要度に応じて真陽性/偽陽性を分類。</li>
  <li><code>NetworkPolicy</code>でPodを隔離してエグレスをブロック。すぐに削除しないこと（証拠が失われる）。</li>
  <li>スナップショットを取得：<code>kubectl debug</code>、メモリダンプ、ログコピー、監査証跡のエクスポート。</li>
  <li>Podがアクセスできた可能性のあるクレデンシャル（ServiceAccountトークン、シークレットマウント）をローテーション。</li>
  <li>調査後：blamelessなポストモーテムを書き、必要なら新しいFalcoルールを追加。</li>
</ol>

<h2 id="ket-luan">結論</h2>
<p>Kubernetesの保護はRBACとファイアウォールだけではありません。3つのレイヤーが必要です：プリアドミッション（イメージスキャン、署名）、アドミッション（Kyverno）、ランタイム（Falco/Tetragon、NetworkPolicy）。Auditモードのベースラインポリシーから始めて段階的にEnforceし、FalcoをSIEMと組み合わせる——これが2026年の本番クラスタの大半に十分なほど堅牢な構成です。</p>
