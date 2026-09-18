---
id: cka-d5-l09
title: 'レッスン9: etcdバックアップ & リストア'
slug: 09-etcd-backup-restore
description: >-
  etcdctlスナップショットによるetcdバックアップ。バックアップからのクラスタリストア。
  etcd用TLS証明書。CKA試験の重要タスク — 完全に習得が必要。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 9
section_title: "ドメイン5: Troubleshooting (30%)"
course:
  id: lt-cka-series-001
  title: 'CKA認定試験対策 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai9-etcd.webp" alt="etcdバックアップとリストア手順" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="etcd-overview">1. etcd — 概要</h2>

<p><strong>etcd</strong>はクラスタの全状態（Pods、Services、Secrets、ConfigMaps、Nodesなど）を保持する分散キーバリューストアです。etcdを失うことはクラスタ全体を失うことを意味します。</p>

<pre><code class="language-text">kube-apiserverマニフェストからのetcd情報:
  cat /etc/kubernetes/manifests/etcd.yaml

主要パス:
  --data-dir=/var/lib/etcd          # データディレクトリ
  --cert-file=/etc/kubernetes/pki/etcd/server.crt
  --key-file=/etc/kubernetes/pki/etcd/server.key
  --trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
  --listen-client-urls=https://127.0.0.1:2379</code></pre>

<h2 id="etcdctl-setup">2. etcdctlセットアップ</h2>

<pre><code class="language-text"># APIバージョンの設定（常にv3を使用）
export ETCDCTL_API=3

# etcd証明書の確認
ls /etc/kubernetes/pki/etcd/
# ca.crt, server.crt, server.key, healthcheck-client.*

# 接続テスト
etcdctl member list \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key</code></pre>

<blockquote><p><strong>試験のポイント：</strong>etcdctlを使用する前に<code>ETCDCTL_API=3</code>を設定する必要があります。API v2は異なるコマンドを使用し、互換性がありません。試験で証明書パスを忘れた場合：<code>cat /etc/kubernetes/manifests/etcd.yaml | grep cert</code>または<code>kubectl describe pod etcd -n kube-system</code>で確認できます。</p></blockquote>

<h2 id="backup">3. etcdバックアップ</h2>

<pre><code class="language-text">ETCDCTL_API=3 etcdctl snapshot save /opt/etcd-backup.db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key

# バックアップの検証
ETCDCTL_API=3 etcdctl snapshot status /opt/etcd-backup.db \
  --write-out=table

# 出力:
+----------+----------+------------+------------+
|   HASH   | REVISION | TOTAL KEYS | TOTAL SIZE |
+----------+----------+------------+------------+
| abcdef12 |    12345 |       1234 |     4.5 MB |
+----------+----------+------------+------------+</code></pre>

<h2 id="restore">4. etcdリストア</h2>

<pre><code class="language-text"># ステップ1: 新しいデータディレクトリにリストア
ETCDCTL_API=3 etcdctl snapshot restore /opt/etcd-backup.db \
  --data-dir=/var/lib/etcd-restore

# ステップ2: etcdマニフェストの更新（新しいデータディレクトリを使用）
vi /etc/kubernetes/manifests/etcd.yaml

# --data-dirとhostPathボリュームを変更:
spec:
  containers:
  - command:
    - --data-dir=/var/lib/etcd-restore  # 変更
  volumes:
  - hostPath:
      path: /var/lib/etcd-restore       # 変更
      type: DirectoryOrCreate
    name: etcd-data

# ステップ3: kubeletがマニフェストの変更を検知 → etcdを再起動
# etcdの再起動を待機（2-3分かかる場合あり）
kubectl get pods -n kube-system | grep etcd</code></pre>

<blockquote><p><strong>試験のポイント：</strong>リストア後、コントロールプレーン全体が再起動して同期するのを待つ必要があります。<code>systemctl restart kubelet</code>の実行が必要な場合もあります。APIサーバーが起動しない場合、ログを確認：<code>crictl logs $(crictl ps -a --name kube-apiserver -q)</code>。</p></blockquote>

<h2 id="cheatsheet">5. チートシート — etcdバックアップ/リストア</h2>

<pre><code class="language-text"># バックアップ（4つの必須フラグ）:
ETCDCTL_API=3 etcdctl snapshot save BACKUP_PATH \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=CA_CERT \
  --cert=SERVER_CERT \
  --key=SERVER_KEY

# リストア（最小限）:
ETCDCTL_API=3 etcdctl snapshot restore BACKUP_PATH \
  --data-dir=NEW_DATA_DIR

# 次にetcd.yamlを更新 → data-dir + volumeパス</code></pre>

<table>
<thead><tr><th>証明書ファイル</th><th>パス</th><th>フラグ</th></tr></thead>
<tbody>
<tr><td>CA証明書</td><td>/etc/kubernetes/pki/etcd/ca.crt</td><td>--cacert</td></tr>
<tr><td>サーバー証明書</td><td>/etc/kubernetes/pki/etcd/server.crt</td><td>--cert</td></tr>
<tr><td>サーバーキー</td><td>/etc/kubernetes/pki/etcd/server.key</td><td>--key</td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習問題</h2>

<p><strong>Q1：</strong>etcdスナップショットリストアを/var/lib/etcd-newに実行しました。クラスタが復旧しません。最も可能性の高い原因は？</p>
<ul>
<li>A) kubeadm initを再実行する必要がある</li>
<li>B) etcd静的Podマニフェストのdata-dirとボリュームパスを新しいディレクトリに更新する必要がある ✓</li>
<li>C) etcdctl restoreに--forceフラグが必要</li>
<li>D) kube-apiserver証明書をローテーションする必要がある</li>
</ul>
<p><em>解説：新しいディレクトリにリストアした後、etcd静的Podマニフェスト（/etc/kubernetes/manifests/etcd.yaml）を更新する必要があります：--data-dirフラグとhostPathボリュームパスの両方を新しいディレクトリに変更します。そうしないと、etcdは古い（壊れた）データディレクトリを読み込み続けます。</em></p>

<p><strong>Q2：</strong>etcdctl v3 APIコマンドを使用するために設定が必要な環境変数は？</p>
<ul>
<li>A) ETCD_VERSION=3</li>
<li>B) ETCDCTL_API=3 ✓</li>
<li>C) KUBECONFIG=/etc/kubernetes/etcd.conf</li>
<li>D) ETCD_ENDPOINT=localhost:2379</li>
</ul>
<p><em>解説：ETCDCTL_API=3はv3 APIコマンド（snapshot save、snapshot restore）を有効にします。設定しないと、etcdctlはv2をデフォルトとして使用し、コマンド構文が異なり、etcd v3クラスタ（全Kubernetesクラスタ）と互換性がありません。</em></p>

<p><strong>Q3：</strong>etcdctlがetcdサーバーと通信するために必要なTLS証明書はどこにありますか？</p>
<ul>
<li>A) /etc/kubernetes/pki/apiserver*.crt</li>
<li>B) /etc/kubernetes/pki/etcd/ ディレクトリ ✓</li>
<li>C) ~/.kube/config</li>
<li>D) /var/lib/etcd/certs/</li>
</ul>
<p><em>解説：etcd証明書は/etc/kubernetes/pki/etcd/に保存されています。重要なファイル: ca.crt（CA）、server.crtとserver.key（etcdctl用）。これらのパスはetcd静的Podマニフェストにも定義されています。</em></p>
