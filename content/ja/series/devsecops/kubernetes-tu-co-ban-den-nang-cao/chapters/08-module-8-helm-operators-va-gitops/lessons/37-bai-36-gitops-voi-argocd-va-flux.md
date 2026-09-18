---
id: 019c9618-0604-7000-8000-c1147ba22e16
title: 'レッスン 36: ARGOCD と FLUX を使用した GITOPS'
slug: bai-36-gitops-voi-argocd-va-flux
description: 'GitOps の原則: Git は唯一の真実の情報源です。 ArgoCD 3.x ハブアンドスポーク マルチクラスター、Flux 2.x 分散プルベース。 GitHub Actions + ArgoCD/Flux を使用した CI/CD パイプライン。アプリのアプリパターン。'
duration_minutes: 95
is_free: false
video_url: null
sort_order: 36
section_title: 'モジュール 8: ヘルム、オペレーター、GitOps'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'Kubernetes: 基本から高度まで'
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: ja
---
<h2>🎯 レッスンの目的</h2><p>GitOps の原則、ArgoCD と Flux のセットアップ方法、2 つのツールの違い、GitOps を使用した CI/CD パイプライン、GitOps ワークフローでのシークレット管理を理解します。</p>

<img src="/storage/uploads/2026/03/k8s-gitops-workflow-2026.webp" alt="GitOps with ArgoCD & Flux - Workflow Diagram" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1. GitOps 原則 (OpenGitOps)</h2>
<p>GitOps は、Git を「信頼できる唯一の情報源」として使用するアプリケーションのデプロイと操作の方法です:</p>
<ul>
  <li><strong>宣言</strong>: 望ましい状態は Git のコードとして記述されます (Kubernetes マニフェスト)</li>
  <li><strong>バージョン管理と不変</strong>: Git 履歴は完全な監査証跡</li>
  <li><strong>自動的にプル</strong>: GitOps エージェントは、CI/CD からプッシュされるのではなく、Git から変更をプルします</li>
  <li><strong>継続的に調整</strong>: エージェントは継続的にドリフトをチェックして修正します (誰かがクラスター内で直接変更します)</li>
</ul>
<p><strong>利点</strong>: セキュリティ (クラスターには CI/CD 資格情報は必要ありません)、監査証跡、単純なロールバック (git revert)、ドリフト検出。</p>

<h2>2. ArgoCD 3.x</h2>

<h3>2.1 アーキテクチャ</h3>
<ul>
  <li><strong>API サーバー</strong>: REST/gRPC API、Web UI、CLI</li>
  <li><strong>Repo サーバー</strong>: Git から Kubernetes マニフェストをクローンしてレンダリング</li>
  <li><strong>アプリケーション コントローラー</strong>: K8s リソースの監視、ドリフトの検出、同期</li>
</ul>

<h3>2.2 ArgoCD のインストール</h3>
___コードブロック_0___

<h3>2.3 アプリケーション CRD</h3>
___コードブロック_1___

<h3>2.4 アプリのアプリパターン</h3>
___コードブロック_2___

<h3>2.5 ApplicationSet — アプリケーションを動的に生成</h3>
___コードブロック_3___

<h2>3. Flux 2.x</h2>

<h3>3.1 Flux アーキテクチャ</h3>
<p>Flux は分散型 GitOps です。クラスターは中央ハブを使用せず、Git から自身をプルします。</p>
<ul>
  <li><strong>ソース コントローラー</strong>: Git リポジトリ、Helm リポジトリ、OCI アーティファクトを監視</li>
  <li><strong>コントローラーをカスタマイズ</strong>: カスタマイズ リソースを適用</li>
  <li><strong>Helm コントローラー</strong>: CRD 経由で Helm リリースを管理</li>
  <li><strong>通知コントローラー</strong>: Slack、Teams、GitHub にアラートを送信</li>
  <li><strong>画像オートメーション コントローラー</strong>: Git の画像タグを自動更新</li>
</ul>

<h3>3.2 Flux のインストール</h3>
___コードブロック_4___

<h3>3.3 GitRepository とカスタム化</h3>
___コードブロック_5___

<h3>3.4 HelmRelease</h3>
___コードブロック_6___

<h2>4. GitOps を使用した CI/CD パイプライン</h2>
___コードブロック_7___<h2>5. GitOps の秘密</h2>
<p>プレーンテキストのシークレットを Git にコミットしないでください。解決策:</p>
<ul>
  <li><strong>Sealed Secrets</strong>: 公開キーで暗号化します。クラスター内のコントローラーのみが復号化できます</li>
  <li><strong>SOPS</strong>: Mozilla SOPS + KMS (AWS KMS、GCP KMS、Azure Key Vault)</li>
  <li><strong>_外部シークレット オペレーター</strong>: 外部シークレット ストアからの同期 (推奨)</li>
</ul>
___コードブロック_8___

<h2>6. ArgoCD 対 Flux</h2>
___コードブロック_9___

<h2>概要</h2>
<ul>
  <li>GitOps: Git = 信頼できる唯一の情報源、プルベース、ドリフト検出</li>
  <li>_ArgoCD: 一元化された優れた UI、ハブアンドスポーク マルチクラスタ</li>
  <li>Flux: 分散型、Git からのクラスタープル、組み込みの画像自動化</li>
  <li>App of Apps (ArgoCD): 1 つのルート アプリで複数のアプリを管理</li>
  <li>シークレット: プレーンテキストをコミットせず、Sealed Secret、SOPS、または ESO を使用してください</li>
</ul>