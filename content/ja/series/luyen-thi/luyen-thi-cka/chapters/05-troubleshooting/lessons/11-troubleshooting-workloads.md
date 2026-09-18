---
id: cka-d5-l11
title: 'レッスン11: ワークロードトラブルシューティング'
slug: 11-troubleshooting-workloads
description: >-
  Podのデバッグ: CrashLoopBackOff、ImagePullBackOff、Pending。Deploymentと
  Serviceのトラブルシュート。体系的なkubectlデバッグワークフロー。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 11
section_title: "ドメイン5: Troubleshooting (30%)"
course:
  id: lt-cka-series-001
  title: 'CKA認定試験対策 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai11-workload-debug.webp" alt="Podトラブルシューティングワークフロー — CrashLoopBackOff、ImagePullBackOff、OOMKilled" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="pod-debug-workflow">1. Podデバッグワークフロー</h2>

<pre><code class="language-text">体系的なPodトラブルシューティング:
  
  kubectl get pod POD_NAME
     │
     ├── Pending → ノード問題またはPVC未バインド
     ├── Running（動作しない）→ ログ確認、exec
     ├── CrashLoopBackOff → アプリがクラッシュ
     ├── ImagePullBackOff → イメージまたはレジストリ問題
     └── Error → 起動/初期化失敗
  
  すべての問題 → 次のステップ:
  kubectl describe pod POD_NAME
  （最下部のEventsセクションを確認！）
  
  ログの確認:
  kubectl logs POD_NAME
  kubectl logs POD_NAME --previous  （クラッシュ後）
  kubectl logs POD_NAME -c CONTAINER  （マルチコンテナ）</code></pre>

<h2 id="pod-issues">2. 一般的なPod問題</h2>

<table>
<thead><tr><th>状態</th><th>原因</th><th>デバッグ</th></tr></thead>
<tbody>
<tr><td><strong>Pending</strong></td><td>スケジュール不可</td><td>describe pod → Events: CPU/メモリ不足またはAffinityに一致するノードなし</td></tr>
<tr><td><strong>ImagePullBackOff</strong></td><td>イメージが存在しない / レジストリ認証</td><td>イメージ名のタイポ、imagePullSecretsを確認</td></tr>
<tr><td><strong>CrashLoopBackOff</strong></td><td>アプリが繰り返しクラッシュ</td><td>kubectl logs --previous、アプリの終了コードを確認</td></tr>
<tr><td><strong>OOMKilled</strong></td><td>メモリリミット超過</td><td>kubectl describe pod → Container Reason: OOMKilled</td></tr>
<tr><td><strong>CreateContainerError</strong></td><td>ボリュームマウント、ConfigMap、Secretが存在しない</td><td>describe podのEventsを確認</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント：</strong><code>kubectl describe pod</code>のEventsセクションがデバッグの最も重要な場所です。CKAのタスクでは壊れたPodの修正がよく求められます — 通常はイメージ名のタイポ、ConfigMap名の誤り、ポートの競合です。</p></blockquote>

<h2 id="exec-debug">3. Exec & デバッグ</h2>

<pre><code class="language-text"># 実行中のコンテナにexec
kubectl exec -it POD_NAME -- /bin/sh
kubectl exec -it POD_NAME -c CONTAINER_NAME -- bash

# エフェメラルコンテナでデバッグ（v1.23+）
kubectl debug -it POD_NAME --image=busybox --target=app

# Pod内外へのファイルコピー
kubectl cp POD_NAME:/var/log/app.log ./app.log
kubectl cp ./config.yaml POD_NAME:/tmp/config.yaml

# 素早いテストのためのport-forward
kubectl port-forward pod/POD_NAME 8080:80
kubectl port-forward svc/SERVICE_NAME 8080:80</code></pre>

<h2 id="deployment-debug">4. Deployment問題</h2>

<pre><code class="language-text"># Deploymentステータスの確認
kubectl rollout status deployment/myapp
kubectl get replicaset -l app=myapp  # RS履歴の確認

# Podテンプレートの問題: DeploymentがRSを作成するがPodが失敗
kubectl describe replicaset RS_NAME  # Podテンプレートエラーの確認

# Deploymentが進行中のままスタック？
kubectl describe deployment myapp | grep -A5 Conditions

# Deploymentレベルのイベント確認
kubectl get events --field-selector involvedObject.name=myapp --sort-by='.lastTimestamp'</code></pre>

<h2 id="service-debug">5. Service接続性デバッグ</h2>

<pre><code class="language-text">Service接続性のデバッグ:

1. Endpointsの確認
   kubectl get endpoints SERVICE_NAME
   → 空: セレクタの不一致

2. クラスタ内からテスト
   kubectl run test --image=busybox --rm -it -- wget -O- http://SERVICE_NAME:PORT

3. kube-proxyの確認
   kubectl get pods -n kube-system -l k8s-app=kube-proxy

4. iptablesの確認（ノード上）
   iptables -t nat -L KUBE-SERVICES | grep SERVICE_NAME</code></pre>

<h2 id="cheatsheet">6. チートシート</h2>

<table>
<thead><tr><th>タスク</th><th>コマンド</th></tr></thead>
<tbody>
<tr><td>前回コンテナのログ</td><td><code>kubectl logs POD --previous</code></td></tr>
<tr><td>Namespace内の全イベント</td><td><code>kubectl get events --sort-by='.lastTimestamp'</code></td></tr>
<tr><td>素早い接続テスト</td><td><code>kubectl run test --image=busybox --rm -it -- wget -qO- URL</code></td></tr>
<tr><td>Podの終了コード確認</td><td><code>kubectl describe pod | grep Exit Code</code></td></tr>
<tr><td>マルチコンテナのログ</td><td><code>kubectl logs POD -c CONTAINER</code></td></tr>
</tbody>
</table>

<h2 id="practice">7. 練習問題</h2>

<p><strong>Q1：</strong>PodがCrashLoopBackOff状態です。アプリケーションログに「Error: failed to connect to database at localhost:5432」と表示されています。問題は何ですか？</p>
<ul>
<li>A) データベースServiceの設定ミス</li>
<li>B) アプリがlocalhostでデータベースに到達しようとしているが、サイドカーコンテナにデータベースが動作していない ✓</li>
<li>C) Podのメモリが不足している</li>
<li>D) Secretのデータベースパスワードが不正</li>
</ul>
<p><em>解説：Pod内のコンテナはネットワーク名前空間を共有するため、「localhost」は同じPod内の他のコンテナにのみ到達します。データベースが別のPodにある場合、Service DNS名（例: pg-service.namespace.svc.cluster.local）を使用する必要があります。</em></p>

<p><strong>Q2：</strong>DeploymentのPodがImagePullBackOffでスタックしています。イメージ名は「mycompany/private-app:1.2」です。最初に確認すべきことは？</p>
<ul>
<li>A) Docker Hubにそのタグのイメージが存在するか</li>
<li>B) Deploymentにレジストリ認証情報を参照するimagePullSecretsがあるか ✓</li>
<li>C) ノードのディスク容量が十分か</li>
<li>D) Serviceが正しく設定されているか</li>
</ul>
<p><em>解説：プライベートレジストリは認証が必要です。Podにはレジストリ認証情報を含むSecret（type: kubernetes.io/dockerconfigjson）を参照するimagePullSecretsフィールドが必要です。イメージ名とタグが正しいかも確認します。</em></p>

<p><strong>Q3：</strong>「kubectl get endpoints myservice」の結果が「<none>」を表示します。最も可能性の高い問題は？</p>
<ul>
<li>A) Serviceポートの誤り</li>
<li>B) Serviceセレクタにマッチするラベルを持つReady状態のPodがない ✓</li>
<li>C) Ingressの設定ミス</li>
<li>D) kube-proxyが動作していない</li>
</ul>
<p><em>解説：EndpointsはPodがServiceセレクタにマッチし、かつReady状態の場合に設定されます。一般的な原因：ラベルの不一致（セレクタのタイポ）、全PodがPending/CrashLoopingのためReady状態でない、間違ったNamespace。kubectl get pods -l APP=LABEL --show-labelsで確認。</em></p>
