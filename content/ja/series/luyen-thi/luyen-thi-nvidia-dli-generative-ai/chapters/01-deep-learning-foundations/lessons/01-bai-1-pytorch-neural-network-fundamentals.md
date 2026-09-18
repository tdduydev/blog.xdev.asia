---
id: 019c9619-nv01-p1-l01
title: '第1課：PyTorchとニューラルネットワークの基礎'
slug: bai-1-pytorch-neural-network-fundamentals
description: >-
  PyTorchテンソル、autograd、nn.Module。ニューラルネットワークをゼロから構築。
  トレーニングループ、損失関数、オプティマイザ。GPUアクセラレーションの基礎。
  CNNアーキテクチャ、プーリング、バッチ正規化。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 1
section_title: "パート1：ディープラーニングの基礎"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'NVIDIA DLI 試験対策 — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="gioi-thieu">1. はじめに</h2>

<p><strong>NVIDIA DLI — Generative AI</strong> 試験対策シリーズの第1課では、<strong>PyTorch</strong> の基礎をしっかりと身につけます。これは、<strong>Diffusion Models</strong> から <strong>Large Language Models（LLMs）</strong>まで、DLIコース全体で使用される主要フレームワークです。</p>

<p>NVIDIA DLI の評価試験では、選択問題ではなく、直接コードを書く必要があります。そのため、PyTorch の基本パターンを習得することが前提条件となります。</p>

<blockquote><p><strong>試験のヒント：</strong> NVIDIA DLI の評価試験では、PyTorch コードを直接書いてデバッグする必要があります。ドキュメントを参照せずに <strong>トレーニングループ</strong>、<strong>nn.Module</strong>、<strong>テンソル</strong>操作を書けるようにしておきましょう。</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai1-neural-network-architecture.webp" alt="ディープニューラルネットワークアーキテクチャ — 入力層、隠れ層、出力層、バックプロパゲーション" loading="lazy" /><figcaption>ディープニューラルネットワークアーキテクチャ — 入力層、隠れ層、出力層、バックプロパゲーション</figcaption></figure>

<h2 id="pytorch-tensors-autograd">2. PyTorch テンソルと Autograd</h2>

<h3 id="tensor-basics">2.1 テンソルの基礎</h3>

<p><strong>テンソル</strong>は PyTorch の中核データ構造で、NumPy 配列に似ていますが、<strong>GPU</strong> 上で動作し、<strong>自動微分</strong>をサポートします。</p>

<pre><code class="language-python">import torch

# リストからテンソルを作成
x = torch.tensor([1.0, 2.0, 3.0])

# 特定の形状でテンソルを作成
zeros = torch.zeros(3, 4)          # shape: (3, 4)
ones = torch.ones(2, 3, 4)         # shape: (2, 3, 4)
rand = torch.randn(64, 3, 32, 32)  # 64枚のRGB 32x32画像のバッチ

# 形状とdtypeを確認
print(rand.shape)   # torch.Size([64, 3, 32, 32])
print(rand.dtype)   # torch.float32
print(rand.device)  # cpu
</code></pre>

<h3 id="tensor-operations">2.2 テンソル操作とブロードキャスティング</h3>

<p>PyTorch は NumPy と同様の<strong>ブロードキャスティング</strong>をサポートしており、異なる形状のテンソル間での演算が可能です。</p>

<pre><code class="language-python"># リシェイプ操作
x = torch.randn(2, 3, 4)
y = x.view(2, 12)        # (2, 12)にリシェイプ
z = x.permute(0, 2, 1)   # 次元を入れ替え: (2, 4, 3)
w = x.unsqueeze(0)        # 次元を追加: (1, 2, 3, 4)

# 行列乗算
a = torch.randn(3, 4)
b = torch.randn(4, 5)
c = a @ b                 # shape: (3, 5)
# または: c = torch.matmul(a, b)

# ブロードキャスティング
x = torch.randn(64, 256)  # (batch, features)
bias = torch.randn(256)   # (features,)
result = x + bias          # biasがブロードキャスト: (64, 256)
</code></pre>

<table>
<thead>
<tr><th>操作</th><th>構文</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>リシェイプ</td><td><code>x.view()</code> / <code>x.reshape()</code></td><td><code>view</code> は連続メモリが必要</td></tr>
<tr><td>転置</td><td><code>x.permute()</code> / <code>x.T</code></td><td><code>permute</code> は複数次元に対してより柔軟</td></tr>
<tr><td>次元追加</td><td><code>x.unsqueeze(dim)</code></td><td>ブロードキャスティングの準備によく使用</td></tr>
<tr><td>次元削除</td><td><code>x.squeeze(dim)</code></td><td>サイズ1の次元を削除</td></tr>
<tr><td>行列乗算</td><td><code>a @ b</code></td><td><code>torch.matmul</code> と同等</td></tr>
<tr><td>結合</td><td><code>torch.cat([a, b], dim=0)</code></td><td>指定した次元に沿って結合</td></tr>
</tbody>
</table>

<h3 id="autograd">2.3 Autograd — 自動微分</h3>

<p><strong>Autograd</strong> は PyTorch の自動勾配計算システムです。<code>requires_grad=True</code> を設定すると、PyTorch はそのテンソルに対するすべての操作を追跡し、<strong>計算グラフ</strong>を構築します。</p>

<pre><code class="language-python"># 基本的なautograd
x = torch.tensor([2.0, 3.0], requires_grad=True)
y = x ** 2 + 3 * x       # y = x² + 3x
loss = y.sum()            # スカラー出力
loss.backward()           # 勾配を計算

print(x.grad)  # dy/dx = 2x + 3 → tensor([7., 9.])
</code></pre>

<pre><code class="language-text">計算グラフ:

  x (requires_grad=True)
  │
  ├──→ x ** 2 ──→ + ──→ y ──→ sum() ──→ loss
  │                ↑                        │
  └──→ 3 * x ─────┘                   backward()
                                            │
                                       x.grad = 2x + 3
</code></pre>

<blockquote><p><strong>試験のヒント：</strong> DLI の評価試験では、「trying to backward through the graph a second time」というエラーに遭遇する場合があります。解決策：<code>loss.backward(retain_graph=True)</code> を使用するか、フォワードパスを再計算してください。これは評価試験で非常によくあるエラーです。</p></blockquote>

<h2 id="nn-module">3. nn.Module とネットワーク構築</h2>

<h3 id="nn-module-pattern">3.1 nn.Module パターン</h3>

<p>PyTorch のすべてのニューラルネットワークは <code>nn.Module</code> を継承します。これは必ず覚えるべきパターンです：</p>

<pre><code class="language-python">import torch.nn as nn

class SimpleNet(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super().__init__()  # 必ずsuper().__init__()を呼ぶこと
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_dim, output_dim)

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x

# 使用方法
model = SimpleNet(784, 256, 10)
x = torch.randn(32, 784)  # 32個のバッチ
output = model(x)          # shape: (32, 10)
</code></pre>

<h3 id="common-layers">3.2 よく使われるレイヤー</h3>

<table>
<thead>
<tr><th>レイヤー</th><th>用途</th><th>主なパラメータ</th></tr>
</thead>
<tbody>
<tr><td><code>nn.Linear(in, out)</code></td><td>全結合層</td><td>in_features, out_features</td></tr>
<tr><td><code>nn.Conv2d(in_ch, out_ch, k)</code></td><td>2D 畳み込み</td><td>in_channels, out_channels, kernel_size</td></tr>
<tr><td><code>nn.BatchNorm2d(ch)</code></td><td>バッチ正規化</td><td>num_features</td></tr>
<tr><td><code>nn.GroupNorm(g, ch)</code></td><td>グループ正規化</td><td>num_groups, num_channels</td></tr>
<tr><td><code>nn.ReLU()</code></td><td>活性化関数</td><td>inplace（オプション）</td></tr>
<tr><td><code>nn.Dropout(p)</code></td><td>正則化</td><td>p = ドロップ確率</td></tr>
<tr><td><code>nn.Embedding(V, D)</code></td><td>トークン埋め込み</td><td>num_embeddings, embedding_dim</td></tr>
</tbody>
</table>

<h3 id="nn-sequential">3.3 nn.Sequential — 簡易モデル構築</h3>

<p>シンプルなモデルの場合、クラスを作成する代わりに <code>nn.Sequential</code> を使用できます：</p>

<pre><code class="language-python"># nn.Sequentialによる簡易アプローチ
model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(256, 128),
    nn.ReLU(),
    nn.Linear(128, 10)
)

# モデルの確認
print(model)
# パラメータ数のカウント
total_params = sum(p.numel() for p in model.parameters())
print(f"Total params: {total_params:,}")
</code></pre>

<h3 id="mlp-mnist">3.4 コード：MNIST向けMLP</h3>

<pre><code class="language-python">import torch
import torch.nn as nn
from torchvision import datasets, transforms

# データ
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])
train_data = datasets.MNIST('./data', train=True, download=True,
                            transform=transform)
train_loader = torch.utils.data.DataLoader(train_data, batch_size=64,
                                           shuffle=True)

# モデル
class MNISTClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.flatten = nn.Flatten()
        self.layers = nn.Sequential(
            nn.Linear(28 * 28, 512),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(512, 256),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(256, 10)
        )

    def forward(self, x):
        x = self.flatten(x)   # (B, 1, 28, 28) → (B, 784)
        return self.layers(x)  # (B, 784) → (B, 10)
</code></pre>

<h2 id="training-loop">4. トレーニングループパターン</h2>

<h3 id="loss-functions">4.1 損失関数</h3>

<table>
<thead>
<tr><th>損失関数</th><th>用途</th><th>入力形状</th></tr>
</thead>
<tbody>
<tr><td><code>nn.CrossEntropyLoss()</code></td><td>多クラス分類</td><td>logits (B, C), labels (B,)</td></tr>
<tr><td><code>nn.MSELoss()</code></td><td>回帰、Diffusionノイズ予測</td><td>(B, *) vs (B, *)</td></tr>
<tr><td><code>nn.BCEWithLogitsLoss()</code></td><td>二値 / マルチラベル分類</td><td>logits (B, C), labels (B, C)</td></tr>
<tr><td><code>nn.L1Loss()</code></td><td>回帰（外れ値に強い）</td><td>(B, *) vs (B, *)</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のヒント：</strong> <code>nn.CrossEntropyLoss</code> は内部に <strong>softmax</strong> を含んでいるため、出力層にsoftmaxを追加しないでください。これは評価試験で多くの人が犯す間違いです。<code>nn.MSELoss</code> は <strong>Diffusion Models</strong>（ノイズ予測）を学ぶ際に非常に重要になります。</p></blockquote>

<h3 id="optimizers">4.2 オプティマイザ</h3>

<pre><code class="language-python"># SGD — 基本的、学習率を手動で管理
optimizer = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)

# Adam — 最も人気、適応的学習率
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

# AdamW — Adam + 適切なweight decay（Transformerに使用）
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4, weight_decay=0.01)
</code></pre>

<table>
<thead>
<tr><th>オプティマイザ</th><th>使用場面</th><th>特徴</th></tr>
</thead>
<tbody>
<tr><td><strong>SGD</strong></td><td>CNN、細かい制御が必要な場合</td><td>lr の慎重なチューニングが必要、momentumを追加</td></tr>
<tr><td><strong>Adam</strong></td><td>ほとんどのタスクのデフォルト</td><td>高速な収束、チューニングが最小限</td></tr>
<tr><td><strong>AdamW</strong></td><td>Transformers、LLMs、Diffusion</td><td>分離されたweight decay、Adamより正確</td></tr>
</tbody>
</table>

<h3 id="full-training-loop">4.3 完全なトレーニングループ</h3>

<p>これは最も重要なパターンです。評価試験では完全なトレーニングループを書けるようにしておく必要があります：</p>

<pre><code class="language-python">import torch
import torch.nn as nn

# セットアップ
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = MNISTClassifier().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

# トレーニングループ
num_epochs = 10
for epoch in range(num_epochs):
    model.train()  # トレーニングモードを有効化（dropout、batchnormが有効）
    total_loss = 0

    for batch_idx, (images, labels) in enumerate(train_loader):
        images, labels = images.to(device), labels.to(device)

        # フォワードパス
        outputs = model(images)
        loss = criterion(outputs, labels)

        # バックワードパス
        optimizer.zero_grad()  # 重要：勾配をリセット
        loss.backward()        # 勾配を計算
        optimizer.step()       # 重みを更新

        total_loss += loss.item()

    avg_loss = total_loss / len(train_loader)
    print(f"Epoch [{epoch+1}/{num_epochs}], Loss: {avg_loss:.4f}")

# 評価
model.eval()  # dropoutを無効化、batchnormはrunning statsを使用
with torch.no_grad():  # 勾配を計算しない → メモリ節約
    correct = 0
    total = 0
    for images, labels in test_loader:
        images, labels = images.to(device), labels.to(device)
        outputs = model(images)
        _, predicted = torch.max(outputs, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

    print(f"Accuracy: {100 * correct / total:.2f}%")
</code></pre>

<pre><code class="language-text">トレーニングループのフロー:

  ┌─────────────────────────────────────────────┐
  │              各エポック                       │
  │  ┌────────────────────────────────────────┐  │
  │  │         各バッチ                        │  │
  │  │                                        │  │
  │  │  1. images, labels = batch.to(device)  │  │
  │  │              │                         │  │
  │  │  2. outputs = model(images)   フォワード │  │
  │  │              │                         │  │
  │  │  3. loss = criterion(outputs, labels)  │  │
  │  │              │                         │  │
  │  │  4. optimizer.zero_grad()     リセット  │  │
  │  │              │                         │  │
  │  │  5. loss.backward()          バックワード│  │
  │  │              │                         │  │
  │  │  6. optimizer.step()          更新      │  │
  │  │              │                         │  │
  │  └──────────────┼─────────────────────────┘  │
  │                 ▼                             │
  │         次のエポック                           │
  └─────────────────────────────────────────────┘
</code></pre>

<blockquote><p><strong>試験のヒント：</strong> <code>zero_grad() → backward() → step()</code> の順序は必須です。<code>zero_grad()</code> を忘れると、勾配がバッチ間で蓄積され、モデルが収束しなくなります。これはDLI評価試験でのバグ第1位です。トレーニング前に <code>model.train()</code>、評価前に <code>model.eval()</code> + <code>torch.no_grad()</code> を必ず覚えておきましょう。</p></blockquote>

<h3 id="gpu-acceleration">4.4 GPUアクセラレーション</h3>

<pre><code class="language-python"># GPUの確認
print(torch.cuda.is_available())        # True/False
print(torch.cuda.device_count())        # GPUの数
print(torch.cuda.get_device_name(0))    # GPU名

# モデルとデータをGPUに移動
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)

# トレーニングループ内 — データも同じデバイスに配置する必要あり
images = images.to(device)
labels = labels.to(device)
</code></pre>

<blockquote><p><strong>試験のヒント：</strong> よくあるエラー：モデルはGPU上にあるが、データはまだCPU上にある（またはその逆）。PyTorch は <em>"Expected all tensors to be on the same device"</em> というエラーを出します。モデルとデータが同じ <code>device</code> にあることを必ず確認してください。</p></blockquote>

<h2 id="cnn-architecture">5. CNNアーキテクチャ</h2>

<h3 id="conv-layers">5.1 畳み込み層</h3>

<p><strong>畳み込み</strong>は入力画像上で<strong>カーネル（フィルタ）</strong>をスライドさせて特徴を抽出します。各カーネルは特定のパターン（エッジ、テクスチャ、形状）を検出します。</p>

<pre><code class="language-python"># 基本的なConv2d
conv = nn.Conv2d(
    in_channels=3,    # RGB入力
    out_channels=32,  # 32フィルタ → 32個の特徴マップ
    kernel_size=3,    # 3×3カーネル
    stride=1,         # ステップサイズ
    padding=1          # 空間サイズを維持するためのゼロパディング
)

# 出力形状の計算式:
# H_out = (H_in + 2*padding - kernel_size) / stride + 1
# 例: (32 + 2*1 - 3) / 1 + 1 = 32 (サイズが維持される)
</code></pre>

<pre><code class="language-text">畳み込み操作:

入力 (3チャンネル)            カーネル (3×3)        出力 (1特徴マップ)
┌─────────────┐            ┌───────┐              ┌──────────┐
│ ■ ■ ■ ■ ■ ■│   ×        │ w w w │     =        │ ○ ○ ○ ○  │
│ ■ ■ ■ ■ ■ ■│            │ w w w │              │ ○ ○ ○ ○  │
│ ■ ■ ■ ■ ■ ■│            │ w w w │              │ ○ ○ ○ ○  │
│ ■ ■ ■ ■ ■ ■│            └───────┘              │ ○ ○ ○ ○  │
│ ■ ■ ■ ■ ■ ■│                                   └──────────┘
│ ■ ■ ■ ■ ■ ■│         32カーネル → 32特徴マップ
└─────────────┘

形状の変化: (B, 3, 32, 32) → Conv2d(3, 32, 3, padding=1) → (B, 32, 32, 32)
</code></pre>

<h3 id="pooling">5.2 プーリング層</h3>

<p><strong>プーリング</strong>は空間次元を縮小し、計算量の削減と受容野の拡大に役立ちます：</p>

<table>
<thead>
<tr><th>プーリング</th><th>仕組み</th><th>使用場面</th></tr>
</thead>
<tbody>
<tr><td><code>nn.MaxPool2d(2)</code></td><td>各2×2ウィンドウ内の最大値を取得</td><td>特徴検出、標準的なCNN</td></tr>
<tr><td><code>nn.AvgPool2d(2)</code></td><td>各2×2ウィンドウ内の平均値を取得</td><td>より滑らかな特徴</td></tr>
<tr><td><code>nn.AdaptiveAvgPool2d((1,1))</code></td><td>入力に関係なく固定サイズにプーリング</td><td>全結合層の前</td></tr>
</tbody>
</table>

<h3 id="normalization">5.3 バッチ正規化 vs グループ正規化</h3>

<p>この知識は、後のレッスンの <strong>Diffusion Models</strong> セクションで<strong>極めて重要</strong>です。</p>

<table>
<thead>
<tr><th>特性</th><th>BatchNorm</th><th>GroupNorm</th></tr>
</thead>
<tbody>
<tr><td>正規化の対象</td><td>バッチ次元 (N)</td><td>チャンネルグループ (C/G)</td></tr>
<tr><td>バッチサイズへの依存</td><td>あり — 小さいバッチではノイズが多い</td><td>なし — どのバッチサイズでも安定</td></tr>
<tr><td>トレーニング vs 推論</td><td>異なる（running stats）</td><td>同じ</td></tr>
<tr><td>よく使われる場面</td><td>従来のCNN（ResNet）</td><td><strong>Diffusion Models</strong>、小グループ</td></tr>
<tr><td>構文</td><td><code>nn.BatchNorm2d(C)</code></td><td><code>nn.GroupNorm(G, C)</code></td></tr>
</tbody>
</table>

<pre><code class="language-python"># BatchNorm — バッチ全体で正規化
bn = nn.BatchNorm2d(64)         # 64チャンネル

# GroupNorm — チャンネルのグループ内で正規化
gn = nn.GroupNorm(
    num_groups=32,    # 64チャンネルを32グループに分割（2ch/グループ）
    num_channels=64
)

# 両方とも入力形状: (B, C, H, W)
x = torch.randn(8, 64, 16, 16)
print(bn(x).shape)  # (8, 64, 16, 16)
print(gn(x).shape)  # (8, 64, 16, 16)
</code></pre>

<pre><code class="language-text">BatchNorm vs GroupNorm:

BatchNorm: ↓方向（バッチ軸）で正規化      GroupNorm: →方向（チャンネルグループ）で正規化
┌────────────────────────┐                    ┌────────────────────────┐
│  Sample 1: [c1 c2 c3 c4]│                    │  Sample 1: [c1 c2│c3 c4]│
│  Sample 2: [c1 c2 c3 c4]│  ← 各列を         │            group1│group2 │ ← 各グループを
│  Sample 3: [c1 c2 c3 c4]│    正規化          │                  │       │   正規化
│  Sample 4: [c1 c2 c3 c4]│                    │  Sample 2: [c1 c2│c3 c4]│
└────────────────────────┘                    └────────────────────────┘

→ Diffusion Modelsではbatch_sizeが通常小さく、
  ノイズレベルが異なるため、BatchNormの統計が不安定になる
  → GroupNormを使用
</code></pre>

<blockquote><p><strong>試験のヒント：</strong> <strong>Diffusion Models用のU-Net</strong>（後のレッスン）を構築する際は、常にBatchNormではなく <strong>GroupNorm</strong> を使用します。理由：Diffusionのトレーニングは通常小さなバッチサイズを使用し、各サンプルのノイズレベルが異なるため、BatchNormの統計が不安定になります。ルール：<strong>Diffusion = GroupNorm</strong>。</p></blockquote>

<h3 id="cnn-code">5.4 コード：画像分類用のシンプルなCNN</h3>

<pre><code class="language-python">class SimpleCNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()

        # Convブロック1: (B, 1, 28, 28) → (B, 32, 14, 14)
        self.block1 = nn.Sequential(
            nn.Conv2d(1, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2)
        )

        # Convブロック2: (B, 32, 14, 14) → (B, 64, 7, 7)
        self.block2 = nn.Sequential(
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(2)
        )

        # Convブロック3: (B, 64, 7, 7) → (B, 128, 1, 1)
        self.block3 = nn.Sequential(
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(),
            nn.AdaptiveAvgPool2d((1, 1))  # グローバル平均プーリング
        )

        # 分類器
        self.classifier = nn.Linear(128, num_classes)

    def forward(self, x):
        x = self.block1(x)     # (B, 32, 14, 14)
        x = self.block2(x)     # (B, 64, 7, 7)
        x = self.block3(x)     # (B, 128, 1, 1)
        x = x.view(x.size(0), -1)  # (B, 128)
        x = self.classifier(x)     # (B, 10)
        return x
</code></pre>

<pre><code class="language-text">CNNアーキテクチャのフロー:

入力: (B, 1, 28, 28)
         │
    ┌────▼────────────────────────┐
    │ Conv2d(1→32, 3×3, pad=1)   │
    │ BatchNorm2d(32)             │  ブロック1
    │ ReLU                        │
    │ MaxPool2d(2)                │
    └────┬────────────────────────┘
         │ (B, 32, 14, 14)
    ┌────▼────────────────────────┐
    │ Conv2d(32→64, 3×3, pad=1)  │
    │ BatchNorm2d(64)             │  ブロック2
    │ ReLU                        │
    │ MaxPool2d(2)                │
    └────┬────────────────────────┘
         │ (B, 64, 7, 7)
    ┌────▼────────────────────────┐
    │ Conv2d(64→128, 3×3, pad=1) │
    │ BatchNorm2d(128)            │  ブロック3
    │ ReLU                        │
    │ AdaptiveAvgPool2d(1,1)      │
    └────┬────────────────────────┘
         │ (B, 128, 1, 1)
    ┌────▼────────────────────────┐
    │ Flatten → (B, 128)          │
    │ Linear(128, 10)             │  分類器
    └────┬────────────────────────┘
         │ (B, 10)
         ▼
      出力 logits
</code></pre>

<h2 id="cheat-sheet">6. チートシート</h2>

<table>
<thead>
<tr><th>概念</th><th>コードパターン</th><th>覚えるべきこと</th></tr>
</thead>
<tbody>
<tr><td>モデル作成</td><td>class MyModel(nn.Module)</td><td>必ず <code>super().__init__()</code> を呼ぶ</td></tr>
<tr><td>フォワードパス</td><td><code>output = model(x)</code></td><td>モデルを関数として呼ぶ、<code>.forward()</code> を直接呼ばない</td></tr>
<tr><td>トレーニングモード</td><td><code>model.train()</code></td><td>dropout、batchnormのトレーニング統計を有効化</td></tr>
<tr><td>評価モード</td><td><code>model.eval()</code> + <code>torch.no_grad()</code></td><td>dropoutを無効化、running statsを使用</td></tr>
<tr><td>トレーニングループ</td><td>zero_grad → forward → loss → backward → step</td><td>順序が重要</td></tr>
<tr><td>GPU転送</td><td><code>.to(device)</code></td><td>モデルとデータの両方</td></tr>
<tr><td>分類損失</td><td><code>nn.CrossEntropyLoss()</code></td><td>softmaxを内包</td></tr>
<tr><td>Diffusion損失</td><td><code>nn.MSELoss()</code></td><td>ノイズ予測、MSEを計算</td></tr>
<tr><td>Diffusion正規化</td><td><code>nn.GroupNorm(G, C)</code></td><td>バッチサイズに依存しない</td></tr>
<tr><td>Transformerオプティマイザ</td><td><code>AdamW</code></td><td>適切なweight decay</td></tr>
</tbody>
</table>

<h2 id="practice-questions">7. 練習問題</h2>

<p>以下の問題はNVIDIA DLIコーディング評価試験のスタイルを模擬しています。コードを読み、バグを見つけ、完全なコードを書く必要があります。</p>

<h3 id="q1">Q1：壊れたトレーニングループを修正する</h3>

<p>以下のコードにはモデルが収束しないバグがあります。エラーを見つけて修正してください：</p>

<pre><code class="language-python">for epoch in range(10):
    model.train()
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
</code></pre>

<details>
<summary>回答 Q1 を表示</summary>

<p><strong>バグ：</strong> <code>loss.backward()</code> の前に <code>optimizer.zero_grad()</code> がありません。勾配をリセットしないと、バッチ間で勾配が蓄積され、モデルが収束しないか、誤った収束をします。</p>

<pre><code class="language-python">for epoch in range(10):
    model.train()
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        outputs = model(images)
        loss = criterion(outputs, labels)

        optimizer.zero_grad()  # ← この行を追加
        loss.backward()
        optimizer.step()
</code></pre>

<p>標準的な順序：<code>zero_grad() → backward() → step()</code>。実際には、<code>zero_grad()</code> を <code>forward</code> の前に置くこともできますが、<code>backward()</code> の前には必ず置く必要があります。</p>
</details>

<h3 id="q2">Q2：3層CNNを実装する</h3>

<p>RGB画像 (3, 64, 64) を入力として5クラスを出力するCNNクラスを書いてください。要件：</p>
<ul>
<li>3つの畳み込みブロック、各ブロック：Conv2d → BatchNorm2d → ReLU → MaxPool2d(2)</li>
<li>チャンネル数：3 → 32 → 64 → 128</li>
<li>最後に AdaptiveAvgPool2d + Linear</li>
</ul>

<details>
<summary>回答 Q2 を表示</summary>

<pre><code class="language-python">class ThreeLayerCNN(nn.Module):
    def __init__(self, num_classes=5):
        super().__init__()
        self.features = nn.Sequential(
            # ブロック1: (B, 3, 64, 64) → (B, 32, 32, 32)
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2),

            # ブロック2: (B, 32, 32, 32) → (B, 64, 16, 16)
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(2),

            # ブロック3: (B, 64, 16, 16) → (B, 128, 8, 8)
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(),
            nn.MaxPool2d(2),
        )
        self.pool = nn.AdaptiveAvgPool2d((1, 1))
        self.classifier = nn.Linear(128, num_classes)

    def forward(self, x):
        x = self.features(x)        # (B, 128, 8, 8)
        x = self.pool(x)            # (B, 128, 1, 1)
        x = x.view(x.size(0), -1)   # (B, 128)
        x = self.classifier(x)      # (B, 5)
        return x

# 検証
model = ThreeLayerCNN(num_classes=5)
x = torch.randn(4, 3, 64, 64)
print(model(x).shape)  # torch.Size([4, 5])
</code></pre>
</details>

<h3 id="q3">Q3：ネットワークを通過するテンソルの形状を追跡する</h3>

<p>以下のモデルと入力形状 <code>(8, 1, 32, 32)</code> が与えられています。各ステップの形状を記録してください：</p>

<pre><code class="language-python">model = nn.Sequential(
    nn.Conv2d(1, 16, kernel_size=5, stride=2, padding=2),  # ステップA
    nn.ReLU(),
    nn.Conv2d(16, 32, kernel_size=3, stride=1, padding=0), # ステップB
    nn.ReLU(),
    nn.AdaptiveAvgPool2d((4, 4)),                           # ステップC
    nn.Flatten(),                                            # ステップD
    nn.Linear(32 * 4 * 4, 10),                              # ステップE
)
</code></pre>

<details>
<summary>回答 Q3 を表示</summary>

<p>出力サイズの計算式：<code>H_out = (H_in + 2*padding - kernel_size) / stride + 1</code></p>

<pre><code class="language-text">入力:  (8, 1, 32, 32)

ステップA: Conv2d(1, 16, k=5, s=2, p=2)
        H = (32 + 2*2 - 5) / 2 + 1 = 16
        → (8, 16, 16, 16)

ステップB: Conv2d(16, 32, k=3, s=1, p=0)
        H = (16 + 2*0 - 3) / 1 + 1 = 14
        → (8, 32, 14, 14)

ステップC: AdaptiveAvgPool2d((4, 4))
        → (8, 32, 4, 4)

ステップD: Flatten()
        → (8, 512)       # 32 * 4 * 4 = 512

ステップE: Linear(512, 10)
        → (8, 10)
</code></pre>

<p><strong>重要なポイント：</strong> <code>AdaptiveAvgPool2d</code> は入力に関係なく常に固定サイズを出力します — 入力サイズが変わる場合に非常に便利です。</p>
</details>

<h3 id="q4">Q4：GroupNorm vs BatchNorm — どちらをいつ使うか？</h3>

<p><strong>Diffusion Model用のU-Net</strong>を構築しています。各ブロックは Conv2d → ??? → SiLU です。どの正規化を選択しますか？理由は？1つのブロックのコードを書いてください。</p>

<details>
<summary>回答 Q4 を表示</summary>

<p><strong>GroupNormを選択します。</strong> 理由：</p>
<ol>
<li><strong>小さなバッチサイズ：</strong> Diffusionのトレーニングは通常バッチサイズ1〜8で、画像が大きいため → BatchNormの統計が不安定になる</li>
<li><strong>異なるノイズレベル：</strong> バッチ内の各サンプルは異なるタイムステップ（ノイズレベル）を持つ → バッチ全体での正規化は適切でない</li>
<li><strong>推論の一貫性：</strong> GroupNormはトレーニング時と推論時で同じ動作をする</li>
</ol>

<pre><code class="language-python">class DiffusionBlock(nn.Module):
    def __init__(self, in_channels, out_channels, num_groups=32):
        super().__init__()
        self.conv = nn.Conv2d(in_channels, out_channels,
                              kernel_size=3, padding=1)
        self.norm = nn.GroupNorm(num_groups, out_channels)
        self.act = nn.SiLU()  # DiffusionではReLUよりSiLUが一般的

    def forward(self, x):
        x = self.conv(x)
        x = self.norm(x)
        x = self.act(x)
        return x

# 使用例
block = DiffusionBlock(64, 128, num_groups=32)
x = torch.randn(2, 64, 32, 32)  # batch_size = 2、小さい！
print(block(x).shape)  # (2, 128, 32, 32)
</code></pre>

<p><strong>ルール：</strong> すべてのDiffusionアーキテクチャ（U-Net、DiT）では、常に <code>nn.GroupNorm</code> を使用します。活性化関数は通常、ReLUではなく <code>nn.SiLU()</code>（Swish）です。</p>
</details>

<h3 id="q5">Q5：勾配の問題をデバッグ — detach() vs torch.no_grad()</h3>

<p>以下のコードには何が問題がありますか？<code>feature_extractor</code> の出力に勾配があってはなりません（バックボーンをフリーズ）が、<code>classifier</code> はトレーニングする必要があります。</p>

<pre><code class="language-python">feature_extractor = pretrained_model.features
classifier = nn.Linear(512, 10).to(device)
optimizer = torch.optim.Adam(classifier.parameters(), lr=1e-3)

for images, labels in train_loader:
    images, labels = images.to(device), labels.to(device)

    # 特徴抽出（フリーズされるべき）
    with torch.no_grad():
        features = feature_extractor(images)

    # 分類
    outputs = classifier(features)
    loss = criterion(outputs, labels)

    optimizer.zero_grad()
    loss.backward()    # ← 問題はありますか？
    optimizer.step()
</code></pre>

<details>
<summary>回答 Q5 を表示</summary>

<p><strong>問題：</strong> このコードは実際にはこのケースでは<strong>正しく動作します</strong>！ <code>torch.no_grad()</code> は <code>feature_extractor</code> の勾配計算を防止し、<code>features</code> テンソルは <code>requires_grad</code> を持ちません。勾配は <code>classifier</code> を通じて正常に流れます。</p>

<p><strong>ただし</strong>、2つのアプローチがあり、その違いを理解する必要があります：</p>

<pre><code class="language-python"># アプローチ1: torch.no_grad() — 勾配を計算しない、メモリ節約
with torch.no_grad():
    features = feature_extractor(images)
# features.requires_grad = False
# 勾配はfeature_extractorには逆伝播しない
# ✅ 完全にフリーズしてGPUメモリを節約したい場合に使用

# アプローチ2: .detach() — テンソルを計算グラフから切り離す
features = feature_extractor(images).detach()
# features.requires_grad = False
# Feature extractorはフォワード計算を実行（グラフ用のメモリを使用）
# しかし勾配は.detach()で切断される
# ⚠️ グラフが構築されてから切断されるため効率が低い

# アプローチ3: パラメータをフリーズ — 最も一般的なアプローチ
for param in feature_extractor.parameters():
    param.requires_grad = False
# ✅ 最も明示的、ファインチューニングで一般的に使用
</code></pre>

<table>
<thead>
<tr><th>アプローチ</th><th>勾配の流れ</th><th>メモリ</th><th>使用場面</th></tr>
</thead>
<tbody>
<tr><td><code>torch.no_grad()</code></td><td>グラフは計算されない</td><td>最も効率的</td><td>推論、フリーズされた特徴</td></tr>
<tr><td><code>.detach()</code></td><td>detach地点で切断</td><td>より高コスト</td><td>部分的な勾配の流れが必要な場合</td></tr>
<tr><td>パラメータフリーズ</td><td>重みは更新されない</td><td>グラフは構築される</td><td>明示的なファインチューニング</td></tr>
</tbody>
</table>
</details>

<h2 id="ket-luan">8. まとめ</h2>

<p>第1課では、NVIDIA DLI Generative AI コースに必要なすべてのPyTorchの基礎を学びました。以下のことができるようにしておきましょう：</p>

<ul>
<li>ドキュメントを参照せずに完全な<strong>トレーニングループ</strong>を書ける</li>
<li><code>__init__</code> と <code>forward</code> を持つ <strong>nn.Module</strong> クラスを作成できる</li>
<li>各レイヤーを通過する<strong>テンソルの形状</strong>を追跡できる</li>
<li><strong>GroupNorm vs BatchNorm</strong> を区別できる — 特にDiffusion Modelsで重要</li>
<li>よくあるエラーをデバッグできる：<code>zero_grad()</code> の欠落、デバイスの不一致、勾配の問題</li>
</ul>

<p>次のレッスン：<strong>第2課 — TransformerアーキテクチャとAttentionメカニズム</strong> — TransformerとLLMsの基礎。</p>
