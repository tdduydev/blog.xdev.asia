---
id: 019d0001-1008-7008-b008-000000000008
title: 'エンジニアのためのコンプライアンス：ISO 27001、SOC 2、PCI DSS v4、ベトナム個人情報保護法 政令13/2023'
slug: compliance-iso27001-pci-nd13-cho-engineer
excerpt: >-
  エンジニアは各統制を暗記する必要はありませんが、統制をパイプラインにマッピングし、
  証跡を自動生成する方法を知っておく必要があります。本記事では4つの主要フレームワークと、
  DevSecOpsにおけるcompliance-as-codeの実装方法を要約します。
featured_image: /images/blog/compliance-engineer-featured.webp
type: blog
reading_time: 11
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
  - name: compliance
    slug: compliance
  - name: iso-27001
    slug: iso-27001
  - name: soc-2
    slug: soc-2
  - name: pci-dss
    slug: pci-dss
  - name: nghi-dinh-13
    slug: nghi-dinh-13
comments: []
locale: ja
---
<blockquote>コンプライアンスは監査人向けのPowerPointではありません。正しく行えば、各統制はパイプラインの中で自動化された一片となり——証跡はソフトウェアをリリースする活動の副産物として生成されます。</blockquote>

<h2 id="bon-khung-pho-bien">4つの主要フレームワーク——本質は何か？</h2>
<table>
  <thead><tr><th>フレームワーク</th><th>目的</th><th>適用シナリオ</th></tr></thead>
  <tbody>
    <tr><td>ISO/IEC 27001:2022</td><td>情報セキュリティマネジメントシステム（ISMS）——全体的なガバナンス</td><td>情報セキュリティガバナンスについて国際認証を取得したい組織</td></tr>
    <tr><td>SOC 2 (AICPA)</td><td>Trust Service Criteria（Security、Availability、Confidentiality、Processing Integrity、Privacy）</td><td>米国向けのB2B SaaS。エンタープライズ顧客のRFPで頻繁に要求される</td></tr>
    <tr><td>PCI DSS v4.0</td><td>カード会員データの保護</td><td>決済カードを保管・処理・送信するすべての事業者</td></tr>
    <tr><td>ベトナム個人情報保護法 政令13/2023/NĐ-CP</td><td>ベトナムにおける個人データの保護</td><td>ベトナム国民のPIIを処理するすべての組織</td></tr>
  </tbody>
</table>

<h2 id="iso-27001">ISO 27001:2022——エンジニアが押さえるべきこと</h2>
<p>2022年版にはAnnex Aに93統制があり、4つのテーマ（Organizational、People、Physical、Technological）に分類されています。「Technological」統制の大半はDevSecOpsパイプラインに直接マッピングできます：</p>
<ul>
  <li>A.8.8 Management of technical vulnerabilities → SCA + SBOM + Dependency-Track + 修正SLA。</li>
  <li>A.8.25 Secure development life cycle → SDLCドキュメント、脅威モデリング、コードレビュー。</li>
  <li>A.8.28 Secure coding → SAST + リンター + セキュアコーディング研修。</li>
  <li>A.8.29 Security testing → DAST、定期ペンテスト、IRドリル。</li>
  <li>A.8.32 Change management → ブランチ保護、チケット駆動デプロイ、監査ログ。</li>
</ul>
<p>エンジニアは番号を暗記する必要はありませんが、自分のどのツールがどの統制に貢献しているかを把握しておくと、監査人に質問されたときダッシュボード/ログを直接示せます。</p>

<h2 id="soc-2">SOC 2 Type II</h2>
<p>SOC 2は「認証」を発行するのではなく、CPAによるレポートです。Type IIはType Iより重要で、一定期間（通常6〜12ヶ月）における統制の有効性を検査します。エンジニアは定期的に証跡を準備する必要があります：</p>
<ul>
  <li>四半期ごとのアクセスレビュー：誰がどの権限をどれだけの期間持っているか。</li>
  <li>PR/デプロイに紐付くチェンジチケット：すべての本番変更は、要求元まで追跡可能であること。</li>
  <li>実際のバックアップテスト（バックアップを実行するだけではなく）。</li>
  <li>SLAに沿った脆弱性管理レポート。</li>
  <li>IRドリルレポート（テーブルトップ、ポストモーテム）。</li>
</ul>
<p>コツ：<strong>コンプライアンス自動化</strong>ツール（Vanta、Drata、Secureframe）を使い、AWS/GCP、GitHub、Okta、MDMから証跡を自動取得しましょう——手動収集の作業を80%削減できます。</p>

<h2 id="pci-dss-v4">PCI DSS v4.0——エンジニアが見落としやすいポイント</h2>
<ul>
  <li><strong>スコープの最小化</strong>：トークン化と決済プロセッサへのアウトソースでCardholder Data Environment（CDE）を縮小し、適用される統制数を減らす。</li>
  <li>v4の<strong>Customised Approach</strong>：目標を達成すれば独自設計の統制が許される——クラウドネイティブに適しているが、詳細な文書化が必要。</li>
  <li><strong>あらゆる場所でMFA</strong>：2025年から、CDEへのすべてのアクセスでMFA必須。</li>
  <li><strong>Targeted Risk Analysis</strong>：v4では多くの統制が、レビュー/テスト頻度を決めるためのリスク分析を要求。</li>
  <li><strong>ソフトウェアセキュリティ</strong>：Req 6が拡張され、bespoke + customソフトウェアのインベントリ（≈ 社内コードのSBOM）が必要に。</li>
</ul>

<h2 id="nghi-dinh-13-2023">ベトナム個人情報保護法 政令13/2023/NĐ-CPと個人データ法</h2>
<p>エンジニアが覚えておくべき要点：</p>
<ul>
  <li><strong>分類</strong>：基本的個人データと<em>機微</em>個人データ（健康、生体、政治、宗教、財務、位置情報、犯罪歴など）。それぞれ異なる統制を適用する。</li>
  <li><strong>個人データ処理影響評価</strong>（DPIA相当）：規模/機微性の高いシステムでは必須で、記録を保管。</li>
  <li><strong>同意</strong>は明確で撤回可能であり、他の条項とまとめてはいけない。</li>
  <li><strong>72時間以内の侵害通知</strong>：知った時から72時間以内に、A05（公安省）へ通知。</li>
  <li><strong>越境データ移転</strong>：評価書類を保持し、特定種類のデータは規定期間中ベトナム国内に保管する必要がある。</li>
</ul>
<p>技術へのマッピング：</p>
<ul>
  <li>DBとデータカタログでのデータ分類タグ。</li>
  <li>機微カラムに対する仮名化/暗号化 + KMSによる鍵管理。</li>
  <li>機微データへのアクセス監査ログ、ポリシーに沿ったリテンション。</li>
  <li>72時間侵害ランブック：誰が検出し → トリアージ → 通知 → 記録するか。</li>
  <li>新しいPIIが導入されたとき、フィーチャートグルから起動するDPIAテンプレート。</li>
</ul>

<h2 id="compliance-as-code">Compliance-as-code：パイプラインからの証跡</h2>
<p>監査時期に手動で集めるのではなく、証跡をパイプラインのアーティファクトとして生成します：</p>
<ul>
  <li>ブランチ保護のスクリーンショット → GitHub API経由で毎月エクスポートし、証跡バケットに保存。</li>
  <li>各デプロイにチェンジチケットIDとサインオフを紐付け → Loki/CloudTrailからクエリしてレポートを自動生成。</li>
  <li>アクセスレビュー：IAM、Oktaグループ、K8s RBACを自動ダンプし → HRISと突合してオーファンアカウントを検出。</li>
  <li>バックアップ検証ジョブ：実際にエフェメラル環境に復元し、毎週チェックサムを比較。</li>
  <li>Dependency-Track + DefectDojoの脆弱性ダッシュボードが、そのまま監査の「Exhibit」になる。</li>
</ul>

<h2 id="control-mapping-mau">統制マッピングの例——1行の証跡</h2>
<table>
  <thead><tr><th>統制</th><th>ツール</th><th>証跡ファイル</th><th>頻度</th></tr></thead>
  <tbody>
    <tr><td>ISO A.8.8 / SOC2 CC7.1</td><td>Trivy + Dependency-Track</td><td>monthly-vuln-report.pdf</td><td>毎月</td></tr>
    <tr><td>ISO A.8.32 / SOC2 CC8.1</td><td>GitHub branch protection</td><td>branch-protection.json</td><td>四半期ごと</td></tr>
    <tr><td>PCI Req 8 / SOC2 CC6.1</td><td>Okta + IdP report</td><td>access-review-Q&lt;n&gt;.csv</td><td>四半期ごと</td></tr>
    <tr><td>政令13 第25条</td><td>監査ログクエリ</td><td>pii-access-log-monthly.json</td><td>毎月</td></tr>
  </tbody>
</table>

<h2 id="ket-luan">結論</h2>
<p>コンプライアンスは年1回のイベントではなく、システムへの投資機会です。どのフレームワークが適用されるかを把握し、技術的統制にマッピングし、証跡を自動生成すれば、監査時期に必要なのはレポートのエクスポートだけになります。さらに重要なのは、システムが本当に安全になることです——それこそがDevSecOpsの追求する目標です。</p>
