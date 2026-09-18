---
id: ckad-d4-l06
title: 'レッスン6: ConfigMaps & Secrets'
slug: 06-configmaps-secrets
description: >-
  ConfigMapとSecretの作成方法（imperative/declarative）。環境変数（envFrom/valueFrom）と
  ボリュームマウントによるPodへの注入。自動更新の動作と制限。
duration_minutes: 50
is_free: true
video_url: null
sort_order: 6
section_title: "ドメイン4: Application Environment, Configuration and Security (25%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD試験対策 — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai6-configmap-secret.webp" alt="ConfigMaps & Secrets — 環境変数注入とボリュームマウント" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="configmap">1. ConfigMap</h2>

<pre><code class="language-text"># Imperative — コマンドで素早く作成
kubectl create configmap app-config \
  --from-literal=DB_HOST=mysql \
  --from-literal=DB_PORT=3306

kubectl create configmap app-config --from-file=config.properties

# Declarative — YAMLファイルで作成
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DB_HOST: mysql
  DB_PORT: "3306"         # 値は常に文字列
  app.properties: |       # マルチラインデータ
    server.port=8080
    logging.level=INFO</code></pre>

<h2 id="secrets">2. Secrets</h2>

<pre><code class="language-text"># Imperative
kubectl create secret generic db-secret \
  --from-literal=username=admin \
  --from-literal=password=s3cr3t

# Declarative（値はbase64エンコードが必要）
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  username: YWRtaW4=       # echo -n "admin" | base64
  password: czNjcjN0       # echo -n "s3cr3t" | base64

# stringDataを使用（プレーンテキスト、Kubernetes側で自動エンコード）
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
stringData:
  username: admin
  password: s3cr3t</code></pre>

<table>
<thead><tr><th>Secretタイプ</th><th>用途</th></tr></thead>
<tbody>
<tr><td><strong>Opaque</strong>（デフォルト）</td><td>任意のkey-valueデータ</td></tr>
<tr><td><strong>kubernetes.io/dockerconfigjson</strong></td><td>Dockerレジストリの認証情報</td></tr>
<tr><td><strong>kubernetes.io/tls</strong></td><td>TLS証明書（cert + key）</td></tr>
<tr><td><strong>kubernetes.io/basic-auth</strong></td><td>Basic認証（username + password）</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント:</strong> Secretはbase64で<strong>エンコード</strong>されていますが、<strong>暗号化</strong>されていません。base64は誰でもデコードできます。本番環境ではEncryption at Restを有効にするか、External Secrets Operatorを使用すべきです。CKADでは<code>stringData</code>（プレーンテキスト）と<code>data</code>（base64）の使い分けがよく出題されます。</p></blockquote>

<h2 id="inject-env">3. 環境変数として注入</h2>

<pre><code class="language-text"># envFrom — ConfigMap/Secretの全キーを環境変数として注入
env:
  envFrom:
  - configMapRef:
      name: app-config
  - secretRef:
      name: db-secret

# valueFrom — 特定のキーを1つずつ環境変数として注入
env:
- name: DATABASE_HOST
  valueFrom:
    configMapKeyRef:
      name: app-config
      key: DB_HOST
- name: DATABASE_PASSWORD
  valueFrom:
    secretKeyRef:
      name: db-secret
      key: password</code></pre>

<h2 id="inject-volume">4. ボリュームとして注入</h2>

<pre><code class="language-text">spec:
  containers:
  - name: app
    image: myapp
    volumeMounts:
    - name: config-volume
      mountPath: /etc/config     # 各キーがファイルになる
      readOnly: true
    - name: secret-volume
      mountPath: /etc/secrets
      readOnly: true
  volumes:
  - name: config-volume
    configMap:
      name: app-config
  - name: secret-volume
    secret:
      secretName: db-secret

# ボリュームマウント後のファイル構造:
# /etc/config/DB_HOST        → ファイル内容: "mysql"
# /etc/config/DB_PORT        → ファイル内容: "3306"
# /etc/secrets/username      → ファイル内容: "admin"
# /etc/secrets/password      → ファイル内容: "s3cr3t"</code></pre>

<h2 id="auto-update">5. 自動更新の動作</h2>

<table>
<thead><tr><th>注入方法</th><th>自動更新</th><th>備考</th></tr></thead>
<tbody>
<tr><td>環境変数（envFrom/valueFrom）</td><td>されない</td><td>Pod再起動が必要</td></tr>
<tr><td>ボリュームマウント</td><td>される（遅延あり）</td><td>kubeletの同期間隔に依存（デフォルト約60秒）</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">6. チートシート</h2>

<table>
<thead><tr><th>タスク</th><th>コマンド / YAML</th></tr></thead>
<tbody>
<tr><td>ConfigMapを素早く作成</td><td><code>kubectl create cm name --from-literal=k=v</code></td></tr>
<tr><td>Secretを素早く作成</td><td><code>kubectl create secret generic name --from-literal=k=v</code></td></tr>
<tr><td>全キーを環境変数に注入</td><td><code>envFrom: configMapRef/secretRef</code></td></tr>
<tr><td>ファイルとしてマウント</td><td><code>volumes: configMap/secret + volumeMounts</code></td></tr>
<tr><td>base64エンコード</td><td><code>echo -n "text" | base64</code></td></tr>
<tr><td>base64デコード</td><td><code>echo "encoded" | base64 -d</code></td></tr>
</tbody>
</table>

<h2 id="practice">7. 練習問題</h2>

<p><strong>Q1:</strong> ConfigMap "app-config"の全キーを環境変数としてPodに注入する正しいYAML構文はどれですか？</p>
<ul>
<li>A) <code>env: - configMapRef: name: app-config</code></li>
<li>B) <code>envFrom: - configMapRef: name: app-config</code> ✓</li>
<li>C) <code>envFrom: - configMap: name: app-config</code></li>
<li>D) <code>env: - valueFrom: configMapRef: name: app-config</code></li>
</ul>
<p><em>解説: envFromはConfigMapまたはSecretの全キーを環境変数として一括注入します。正しいキーはconfigMapRef（ConfigMapの場合）またはsecretRef（Secretの場合）です。valueFromは個別のキーを1つずつ注入する場合に使用します。</em></p>

<p><strong>Q2:</strong> Secret YAMLのdataフィールドに値を設定する際、値はどの形式で記述する必要がありますか？</p>
<ul>
<li>A) プレーンテキスト</li>
<li>B) base64エンコード ✓</li>
<li>C) SHA256ハッシュ</li>
<li>D) AES暗号化</li>
</ul>
<p><em>解説: Secretのdataフィールドの値はbase64エンコードが必要です。プレーンテキストで記述したい場合はstringDataフィールドを使用します。base64はエンコードであり暗号化ではないことに注意 — セキュリティのためではなくバイナリデータの格納のための仕様です。</em></p>

<p><strong>Q3:</strong> ConfigMapをボリュームマウントでPodに注入しています。ConfigMapの値を更新した後、Podを再起動せずに変更が反映されますか？</p>
<ul>
<li>A) いいえ、常にPodの再起動が必要</li>
<li>B) はい、ボリュームマウントの場合はkubeletの同期間隔後に自動更新される ✓</li>
<li>C) はい、即座に反映される</li>
<li>D) ConfigMapは一度作成すると変更できない（immutable）</li>
</ul>
<p><em>解説: ボリュームマウントの場合、kubeletが定期的にConfigMapの変更を検出してファイルを更新します（デフォルト約60秒の遅延）。ただし環境変数（envFrom/valueFrom）として注入した場合は自動更新されず、Podの再起動が必要です。</em></p>
