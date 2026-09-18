---
id: cka-d5-l10
title: 'レッスン10: ノードトラブルシューティング'
slug: 10-troubleshooting-nodes
description: >-
  NotReadyノードのデバッグ: kubelet、コンテナランタイム、証明書。ノード条件、
  リソースプレッシャー、ディスクプレッシャー。体系的トラブルシューティング手法。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 10
section_title: "ドメイン5: Troubleshooting (30%)"
course:
  id: lt-cka-series-001
  title: 'CKA認定試験対策 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai10-node-debug.webp" alt="ノードトラブルシューティングの判断フロー — NotReadyデバッグワークフロー" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="node-conditions">1. ノード条件</h2>

<pre><code class="language-text">kubectl describe node node1 | grep -A20 Conditions

正常状態:
  Type              Status  
  ----              ------  
  MemoryPressure    False   ← 正常（True = メモリ不足）
  DiskPressure      False   ← 正常（True = ディスク不足）
  PIDPressure       False   ← 正常（True = プロセス過多）
  Ready             True    ← ノードは正常

異常状態:
  Ready             False   → kubeletが動作していない
  Ready             Unknown → ノードに到達できない（ネットワーク問題）</code></pre>

<h2 id="troubleshoot-not-ready">2. NotReadyノードのトラブルシューティング</h2>

<pre><code class="language-text">体系的なアプローチ — 順番に実行:

1. ノード状態の確認
   kubectl get nodes
   kubectl describe node NODE_NAME | tail -40

2. ノードにSSH
   ssh node1

3. kubeletサービスの確認
   systemctl status kubelet
   journalctl -u kubelet -n 50 --no-pager

4. コンテナランタイムの確認
   systemctl status containerd
   crictl ps           # 実行中のコンテナ一覧
   crictl pods         # Podサンドボックス一覧

5. 証明書の確認（クラスタ経過時間による一般的な問題）
   ls /var/lib/kubelet/pki/
   openssl x509 -in /var/lib/kubelet/pki/kubelet.crt -noout -dates

6. 必要に応じてサービスを再起動
   systemctl restart kubelet
   systemctl restart containerd</code></pre>

<blockquote><p><strong>試験のポイント：</strong>NotReadyデバッグ手順：<code>kubectl describe node</code> → SSH → <code>systemctl status kubelet</code> → <code>journalctl -u kubelet</code>。最も一般的な問題：kubelet停止、APIサーバーアドレスの誤り、証明書の期限切れ。</p></blockquote>

<h2 id="common-node-issues">3. 一般的なノード問題</h2>

<table>
<thead><tr><th>症状</th><th>原因</th><th>対処法</th></tr></thead>
<tbody>
<tr><td>Node NotReady</td><td>kubeletクラッシュ</td><td>systemctl restart kubelet</td></tr>
<tr><td>Node Unknown</td><td>ネットワーク分断</td><td>ノードネットワーク、ファイアウォールを確認</td></tr>
<tr><td>MemoryPressure: True</td><td>メモリ不足</td><td>Podの退避、ノードのスケール</td></tr>
<tr><td>DiskPressure: True</td><td>ディスク満杯</td><td>/var/log、/tmp、未使用イメージのクリーンアップ</td></tr>
<tr><td>Pods stuck Terminating</td><td>ノード到達不可</td><td>kubectl delete pod --force --grace-period=0</td></tr>
</tbody>
</table>

<h2 id="kubelet-config">4. kubelet設定</h2>

<pre><code class="language-text"># kubelet設定ファイルの場所
/var/lib/kubelet/config.yaml     # メイン設定
/etc/kubernetes/kubelet.conf     # kubeconfig（kubeletのAPIサーバー接続方法）
/var/lib/kubelet/kubeconfig      # 代替パス

# 一般的なkubelet設定問題:
# APIサーバーアドレスの誤り
cat /etc/kubernetes/kubelet.conf | grep server

# クラスタDNSの誤り
cat /var/lib/kubelet/config.yaml | grep clusterDNS

# kubeletの証明書確認
cat /var/lib/kubelet/config.yaml | grep client-certificate</code></pre>

<h2 id="node-cleanup">5. ノードイメージ & ディスククリーンアップ</h2>

<pre><code class="language-text"># ディスク使用量の確認
df -h
du -sh /var/log/*
du -sh /var/lib/containerd

# 未使用コンテナイメージの削除
crictl rmi --prune

# 古いログの削除
find /var/log/pods -mtime +7 -delete

# PIDプレッシャーの確認
ps aux | wc -l</code></pre>

<h2 id="cheatsheet">6. チートシート</h2>

<table>
<thead><tr><th>タスク</th><th>コマンド</th></tr></thead>
<tbody>
<tr><td>ノード健全性サマリー</td><td><code>kubectl describe node NAME</code></td></tr>
<tr><td>kubelet状態</td><td><code>systemctl status kubelet</code></td></tr>
<tr><td>kubeletログ</td><td><code>journalctl -u kubelet -n 100</code></td></tr>
<tr><td>ノード上の実行コンテナ</td><td><code>crictl ps</code></td></tr>
<tr><td>スタックしたPodの強制削除</td><td><code>kubectl delete pod NAME --force --grace-period=0</code></td></tr>
</tbody>
</table>

<h2 id="practice">7. 練習問題</h2>

<p><strong>Q1：</strong>ノードが「Ready: Unknown」ステータスを表示しています。最も可能性の高い原因は？</p>
<ul>
<li>A) ノード上のkubeletプロセスがクラッシュした</li>
<li>B) コントロールプレーンからノードに到達できない（ネットワーク問題） ✓</li>
<li>C) ノード上の全PodがOOM-killされた</li>
<li>D) ノードのCPUリソースが不足している</li>
</ul>
<p><em>解説：Ready: UnknownはAPIサーバーがkubeletからのハートビートを最近受信していないことを意味します。通常、ノードが到達不能（ネットワーク分断、ノードの電源OFF）であることを示します。Ready: Falseはkubeletに到達可能だが問題を報告している状態です。</em></p>

<p><strong>Q2：</strong>NotReadyノードにSSH後、「systemctl status kubelet」で「Active: failed」と表示されます。次に確認すべきは？</p>
<ul>
<li>A) kubectl get pods -n kube-system</li>
<li>B) journalctl -u kubelet -n 50 でエラーログを確認 ✓</li>
<li>C) ノードを削除して再作成</li>
<li>D) ノードでkubeadm resetを実行</li>
</ul>
<p><em>解説：kubeletが失敗した場合、journalctlは詳細なエラーを表示します：証明書問題、APIサーバーURLの誤り、/var/lib/kubelet/config.yamlの不在など。kubeletのダウンを確認した後の最初の診断ステップは常にこれです。</em></p>

<p><strong>Q3：</strong>ノードがDiskPressure: Trueを報告しています。ワークロードへの即座の影響は？</p>
<ul>
<li>A) 全Podが即座に削除される</li>
<li>B) ノードがスケジュール不可になり、BestEffort/BurstableのPodが退避される ✓</li>
<li>C) 新しいPodのスケジューリングのみが阻止される</li>
<li>D) kubeletサービスが停止する</li>
</ul>
<p><em>解説：ディスクプレッシャー下ではKubernetesがPod退避をトリガーします。BestEffort（リクエスト/リミットなし）から開始し、次にBurstable。GuaranteedのPodは最後に退避されます。ノードには新しいスケジューリングを防ぐTaintも付与されます。</em></p>
