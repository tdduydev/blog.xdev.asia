---
id: ckad-d2-l03
title: 'レッスン3: Rolling Updates, Rollbacks & Deployment Strategies'
slug: 03-rolling-updates-rollbacks
description: >-
  Deployment戦略: RollingUpdate vs Recreate。kubectl rolloutコマンド、
  maxUnavailable/maxSurge。Revision historyとCKAD向けロールバック技術。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 3
section_title: "ドメイン2: Application Deployment (20%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD試験対策 — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai3-rolling-update.webp" alt="Rolling UpdateとRollback — maxUnavailable、maxSurge、ReplicaSet history" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="strategies">1. Deployment戦略</h2>

<table>
<thead><tr><th>戦略</th><th>動作</th><th>ダウンタイム</th><th>使用場面</th></tr></thead>
<tbody>
<tr><td><strong>RollingUpdate</strong></td><td>Podを段階的に入れ替え、可用性を維持</td><td>なし</td><td>デフォルト、本番環境</td></tr>
<tr><td><strong>Recreate</strong></td><td>すべての古いPodを削除してから新しいPodを作成</td><td>あり</td><td>開発/テスト、破壊的変更</td></tr>
</tbody>
</table>

<pre><code class="language-text">spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1   # OR "25%"  — Max pods unavailable during update
      maxSurge: 1         # OR "25%"  — Max extra pods above desired count

      ┌─────────────────────────────────────────────────┐
      │ Desired: 4 pods                                  │
      │                                                  │
      │ maxUnavailable: 1 → min 3 pods must be running  │
      │ maxSurge: 1       → max 5 pods total at once    │
      │                                                  │
      │ Step 1: Create 1 new pod (5 total = desired+surge)│
      │ Step 2: Terminate 1 old pod (4 total)           │
      │ Step 3: Repeat until all replaced               │
      └─────────────────────────────────────────────────┘</code></pre>

<blockquote><p><strong>試験のポイント:</strong> <code>maxUnavailable</code>と<code>maxSurge</code>は<strong>同時に0にできません</strong>。ゼロダウンタイム更新には: <code>maxUnavailable: 0</code>と<code>maxSurge: 1</code>（またはそれ以上）を設定します。</p></blockquote>

<h2 id="rollout">2. kubectl rolloutコマンド</h2>

<pre><code class="language-text"># ロールアウト状態を確認
kubectl rollout status deployment/myapp

# リビジョン履歴を表示
kubectl rollout history deployment/myapp
kubectl rollout history deployment/myapp --revision=2

# 前のバージョンにロールバック
kubectl rollout undo deployment/myapp

# 特定のリビジョンにロールバック
kubectl rollout undo deployment/myapp --to-revision=2

# ロールアウトを一時停止
kubectl rollout pause deployment/myapp

# ロールアウトを再開
kubectl rollout resume deployment/myapp</code></pre>

<table>
<thead><tr><th>コマンド</th><th>用途</th></tr></thead>
<tbody>
<tr><td><code>rollout status</code></td><td>現在のロールアウト進捗を待機/表示</td></tr>
<tr><td><code>rollout history</code></td><td>リビジョン履歴を一覧表示</td></tr>
<tr><td><code>rollout undo</code></td><td>前の（または特定の）リビジョンにロールバック</td></tr>
<tr><td><code>rollout pause/resume</code></td><td>カナリアテスト用に一時停止、その後再開</td></tr>
<tr><td><code>rollout restart</code></td><td>全Podを強制再起動（ローリング）</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント:</strong> リビジョン履歴に<code>CHANGE-CAUSE</code>を記録するには、更新<strong>前に</strong>アノテーションを追加: <code>kubectl annotate deployment/myapp kubernetes.io/change-cause="Updated image to v2"</code>。または<code>--record</code>フラグを使用（非推奨ですが試験ではまだ動作します）。</p></blockquote>

<h2 id="trigger">3. アップデートのトリガーと監視</h2>

<pre><code class="language-text"># イメージを更新（rolling updateをトリガー）
kubectl set image deployment/myapp container-name=nginx:1.25

# ReplicaSet履歴を確認（各更新で新しいRSが作成される）
kubectl get rs
# NAME              DESIRED   CURRENT   READY
# myapp-7d9b8c      4         4         4     ← current
# myapp-6f5a2b      0         0         0     ← old (kept for rollback)

# Deploymentをスケール
kubectl scale deployment/myapp --replicas=6

# Deploymentを直接編集
kubectl edit deployment/myapp</code></pre>

<h2 id="revisionhistory">4. Revision History Limit</h2>

<pre><code class="language-text">spec:
  revisionHistoryLimit: 10  # Default: 10 old RS kept for rollback
                             # Set to 0 to disable rollback capability</code></pre>

<h2 id="cheatsheet">5. チートシート</h2>

<table>
<thead><tr><th>試験シナリオ</th><th>コマンド</th></tr></thead>
<tbody>
<tr><td>イメージ更新</td><td><code>kubectl set image deploy/app c=image:v2</code></td></tr>
<tr><td>ロールアウト確認</td><td><code>kubectl rollout status deploy/app</code></td></tr>
<tr><td>クイックロールバック</td><td><code>kubectl rollout undo deploy/app</code></td></tr>
<tr><td>rev 3にロールバック</td><td><code>kubectl rollout undo deploy/app --to-revision=3</code></td></tr>
<tr><td>ゼロダウンタイム設定</td><td><code>maxUnavailable: 0, maxSurge: 1</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習問題</h2>

<p><strong>Q1:</strong> 10レプリカのDeploymentがmaxUnavailable: 2、maxSurge: 3で設定されています。ローリングアップデート中に同時に存在できるPodの最大数はいくつですか？</p>
<ul>
<li>A) 10</li>
<li>B) 12</li>
<li>C) 13 ✓</li>
<li>D) 15</li>
</ul>
<p><em>解説: maxSurge=3は希望数(10)を超えて最大3つの追加Podが同時に存在できることを意味します。したがって最大 = 10 + 3 = 13 Pod。一方、maxUnavailable=2は少なくとも8つのPodが利用可能でなければならないことを意味します。</em></p>

<p><strong>Q2:</strong> Deploymentを更新した後、新しいバージョンにバグがあることに気づきました。前の動作するバージョンに素早く戻すコマンドはどれですか？</p>
<ul>
<li>A) <code>kubectl delete deployment myapp && kubectl apply -f old.yaml</code></li>
<li>B) <code>kubectl rollout undo deployment/myapp</code> ✓</li>
<li>C) <code>kubectl rollout history deployment/myapp</code></li>
<li>D) <code>kubectl set image deployment/myapp container=old-image</code></li>
</ul>
<p><em>解説: rollout undoは前のリビジョンに戻す最速の方法です。前のReplicaSetへの新しいローリングアップデートを作成します。選択肢Dも機能しますが、正確な旧イメージ名を知る必要があります。</em></p>

<p><strong>Q3:</strong> DeploymentがRecreate戦略を使用しています。更新時の動作はどうなりますか？</p>
<ul>
<li>A) Podが1つずつ置き換えられ、ダウンタイムなし</li>
<li>B) すべての既存Podが削除されてから新しいPodが作成され、ダウンタイムが発生する ✓</li>
<li>C) Podの半分が更新され、残り半分がトラフィックを処理する</li>
<li>D) 新しいPodが先に作成され、その後古いPodが削除される</li>
</ul>
<p><em>解説: Recreate戦略はすべての既存Podを同時に削除（スケール0）してから新しいPodを作成します。ダウンタイムが発生しますが、2つのバージョンが同時に実行されないことを保証します — 旧バージョンと新バージョンが共存できない場合に適しています。</em></p>
