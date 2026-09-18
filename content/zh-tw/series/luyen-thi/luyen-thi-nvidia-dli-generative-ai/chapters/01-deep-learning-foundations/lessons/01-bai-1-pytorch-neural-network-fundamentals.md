---
id: 019c9619-nv01-p1-l01
title: '第1課：PyTorch與神經網路基礎'
slug: bai-1-pytorch-neural-network-fundamentals
description: >-
  PyTorch 張量、autograd、nn.Module。從零開始建構神經網路。
  訓練迴圈、損失函數、優化器。GPU 加速基礎。
  CNN 架構、池化、批次正規化。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 1
section_title: "第1部分：深度學習基礎"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'NVIDIA DLI 考試準備 — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="gioi-thieu">1. 簡介</h2>

<p><strong>NVIDIA DLI — Generative AI</strong> 考試準備系列的第一課將為您打下紮實的 <strong>PyTorch</strong> 基礎。這是整個 DLI 課程中使用的主要框架，從 <strong>Diffusion Models</strong> 到 <strong>Large Language Models (LLMs)</strong>。</p>

<p>在 NVIDIA DLI 評估中，您需要直接撰寫程式碼——而非選擇題。因此，掌握 PyTorch 的基本模式是先決條件。</p>

<blockquote><p><strong>考試提示：</strong> NVIDIA DLI 評估要求您直接撰寫和除錯 PyTorch 程式碼。確保您能在不查閱文件的情況下撰寫 <strong>training loop</strong>、<strong>nn.Module</strong> 以及執行 <strong>tensor</strong> 操作。</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai1-neural-network-architecture.webp" alt="Deep Neural Network Architecture — Input Layer, Hidden Layers, Output Layer, Backpropagation" loading="lazy" /><figcaption>深度神經網路架構 — 輸入層、隱藏層、輸出層、反向傳播</figcaption></figure>

<h2 id="pytorch-tensors-autograd">2. PyTorch Tensors 與 Autograd</h2>

<h3 id="tensor-basics">2.1 Tensor 基礎</h3>

<p><strong>Tensor</strong> 是 PyTorch 的核心資料結構——類似於 NumPy 陣列，但能在 <strong>GPU</strong> 上運行並支援<strong>自動微分</strong>。</p>

<pre><code class="language-python">import torch

# 從列表建立 tensor
x = torch.tensor([1.0, 2.0, 3.0])

# 建立指定形狀的 tensor
zeros = torch.zeros(3, 4)          # shape: (3, 4)
ones = torch.ones(2, 3, 4)         # shape: (2, 3, 4)
rand = torch.randn(64, 3, 32, 32)  # 64 張 RGB 32x32 影像的 batch

# 檢查 shape 和 dtype
print(rand.shape)   # torch.Size([64, 3, 32, 32])
print(rand.dtype)   # torch.float32
print(rand.device)  # cpu
</code></pre>

<h3 id="tensor-operations">2.2 Tensor 操作與 Broadcasting</h3>

<p>PyTorch 支援類似 NumPy 的 <strong>broadcasting</strong>——允許不同形狀的 tensor 之間進行運算。</p>

<pre><code class="language-python"># Reshape 操作
x = torch.randn(2, 3, 4)
y = x.view(2, 12)        # reshape 為 (2, 12)
z = x.permute(0, 2, 1)   # 交換維度: (2, 4, 3)
w = x.unsqueeze(0)        # 新增維度: (1, 2, 3, 4)

# 矩陣乘法
a = torch.randn(3, 4)
b = torch.randn(4, 5)
c = a @ b                 # shape: (3, 5)
# 或: c = torch.matmul(a, b)

# Broadcasting
x = torch.randn(64, 256)  # (batch, features)
bias = torch.randn(256)   # (features,)
result = x + bias          # bias 被廣播: (64, 256)
</code></pre>

<table>
<thead>
<tr><th>操作</th><th>語法</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td>Reshape</td><td><code>x.view()</code> / <code>x.reshape()</code></td><td><code>view</code> 需要記憶體連續</td></tr>
<tr><td>轉置</td><td><code>x.permute()</code> / <code>x.T</code></td><td><code>permute</code> 對多維度更靈活</td></tr>
<tr><td>新增維度</td><td><code>x.unsqueeze(dim)</code></td><td>常用於準備 broadcasting</td></tr>
<tr><td>移除維度</td><td><code>x.squeeze(dim)</code></td><td>移除大小為 1 的維度</td></tr>
<tr><td>矩陣乘法</td><td><code>a @ b</code></td><td>等同於 <code>torch.matmul</code></td></tr>
<tr><td>串接</td><td><code>torch.cat([a, b], dim=0)</code></td><td>沿指定維度串接</td></tr>
</tbody>
</table>

<h3 id="autograd">2.3 Autograd — 自動微分</h3>

<p><strong>Autograd</strong> 是 PyTorch 的自動梯度計算系統。當您設定 <code>requires_grad=True</code> 時，PyTorch 會追蹤該 tensor 上的所有操作，並建構一個<strong>計算圖</strong>。</p>

<pre><code class="language-python"># 基本 autograd
x = torch.tensor([2.0, 3.0], requires_grad=True)
y = x ** 2 + 3 * x       # y = x² + 3x
loss = y.sum()            # 純量輸出
loss.backward()           # 計算梯度

print(x.grad)  # dy/dx = 2x + 3 → tensor([7., 9.])
</code></pre>

<pre><code class="language-text">計算圖：

  x (requires_grad=True)
  │
  ├──→ x ** 2 ──→ + ──→ y ──→ sum() ──→ loss
  │                ↑                        │
  └──→ 3 * x ─────┘                   backward()
                                            │
                                       x.grad = 2x + 3
</code></pre>

<blockquote><p><strong>考試提示：</strong> 在 DLI 評估中，您可能會遇到 "trying to backward through the graph a second time" 的錯誤。解決方法：使用 <code>loss.backward(retain_graph=True)</code> 或重新計算 forward pass。這是評估中非常常見的錯誤。</p></blockquote>

<h2 id="nn-module">3. nn.Module 與建構網路</h2>

<h3 id="nn-module-pattern">3.1 nn.Module 模式</h3>

<p>PyTorch 中的每個神經網路都繼承自 <code>nn.Module</code>。這是您必須熟記的模式：</p>

<pre><code class="language-python">import torch.nn as nn

class SimpleNet(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super().__init__()  # 必須呼叫 super().__init__()
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_dim, output_dim)

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x

# 使用方式
model = SimpleNet(784, 256, 10)
x = torch.randn(32, 784)  # 32 個樣本的 batch
output = model(x)          # shape: (32, 10)
</code></pre>

<h3 id="common-layers">3.2 常用層</h3>

<table>
<thead>
<tr><th>層</th><th>用途</th><th>關鍵參數</th></tr>
</thead>
<tbody>
<tr><td><code>nn.Linear(in, out)</code></td><td>全連接層</td><td>in_features, out_features</td></tr>
<tr><td><code>nn.Conv2d(in_ch, out_ch, k)</code></td><td>2D 卷積</td><td>in_channels, out_channels, kernel_size</td></tr>
<tr><td><code>nn.BatchNorm2d(ch)</code></td><td>批次正規化</td><td>num_features</td></tr>
<tr><td><code>nn.GroupNorm(g, ch)</code></td><td>群組正規化</td><td>num_groups, num_channels</td></tr>
<tr><td><code>nn.ReLU()</code></td><td>激活函數</td><td>inplace（可選）</td></tr>
<tr><td><code>nn.Dropout(p)</code></td><td>正則化</td><td>p = 丟棄機率</td></tr>
<tr><td><code>nn.Embedding(V, D)</code></td><td>Token 嵌入</td><td>num_embeddings, embedding_dim</td></tr>
</tbody>
</table>

<h3 id="nn-sequential">3.3 nn.Sequential — 快速建模</h3>

<p>對於簡單模型，您可以使用 <code>nn.Sequential</code> 而不需建立類別：</p>

<pre><code class="language-python"># 使用 nn.Sequential 的快速方法
model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(256, 128),
    nn.ReLU(),
    nn.Linear(128, 10)
)

# 檢視模型
print(model)
# 計算參數量
total_params = sum(p.numel() for p in model.parameters())
print(f"Total params: {total_params:,}")
</code></pre>

<h3 id="mlp-mnist">3.4 程式碼：MNIST 的 MLP</h3>

<pre><code class="language-python">import torch
import torch.nn as nn
from torchvision import datasets, transforms

# 資料
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])
train_data = datasets.MNIST('./data', train=True, download=True,
                            transform=transform)
train_loader = torch.utils.data.DataLoader(train_data, batch_size=64,
                                           shuffle=True)

# 模型
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

<h2 id="training-loop">4. 訓練迴圈模式</h2>

<h3 id="loss-functions">4.1 損失函數</h3>

<table>
<thead>
<tr><th>損失函數</th><th>使用情境</th><th>輸入形狀</th></tr>
</thead>
<tbody>
<tr><td><code>nn.CrossEntropyLoss()</code></td><td>多類別分類</td><td>logits (B, C), labels (B,)</td></tr>
<tr><td><code>nn.MSELoss()</code></td><td>迴歸、diffusion 噪音預測</td><td>(B, *) vs (B, *)</td></tr>
<tr><td><code>nn.BCEWithLogitsLoss()</code></td><td>二元／多標籤分類</td><td>logits (B, C), labels (B, C)</td></tr>
<tr><td><code>nn.L1Loss()</code></td><td>迴歸（對離群值穩健）</td><td>(B, *) vs (B, *)</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試提示：</strong> <code>nn.CrossEntropyLoss</code> 內部已包含 <strong>softmax</strong>——請勿在輸出層再加 softmax。這是許多人在評估中犯的錯誤。<code>nn.MSELoss</code> 在學習 <strong>Diffusion Models</strong>（預測噪音）時非常重要。</p></blockquote>

<h3 id="optimizers">4.2 優化器</h3>

<pre><code class="language-python"># SGD — 基本款，需手動管理學習率
optimizer = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)

# Adam — 最受歡迎，自適應學習率
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

# AdamW — Adam + 正確的 weight decay（用於 Transformers）
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4, weight_decay=0.01)
</code></pre>

<table>
<thead>
<tr><th>優化器</th><th>適用場景</th><th>特性</th></tr>
</thead>
<tbody>
<tr><td><strong>SGD</strong></td><td>CNN、需要精細控制時</td><td>需要仔細調整 lr，加上 momentum</td></tr>
<tr><td><strong>Adam</strong></td><td>大多數任務的預設選擇</td><td>收斂快速，幾乎不需調參</td></tr>
<tr><td><strong>AdamW</strong></td><td>Transformers、LLMs、Diffusion</td><td>解耦的 weight decay，比 Adam 更正確</td></tr>
</tbody>
</table>

<h3 id="full-training-loop">4.3 完整訓練迴圈</h3>

<p>這是最重要的模式——您必須能在評估中撰寫完整的訓練迴圈：</p>

<pre><code class="language-python">import torch
import torch.nn as nn

# 設定
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = MNISTClassifier().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

# 訓練迴圈
num_epochs = 10
for epoch in range(num_epochs):
    model.train()  # 啟用訓練模式（dropout、batchnorm 生效）
    total_loss = 0

    for batch_idx, (images, labels) in enumerate(train_loader):
        images, labels = images.to(device), labels.to(device)

        # 前向傳播
        outputs = model(images)
        loss = criterion(outputs, labels)

        # 反向傳播
        optimizer.zero_grad()  # 重要：重置梯度
        loss.backward()        # 計算梯度
        optimizer.step()       # 更新權重

        total_loss += loss.item()

    avg_loss = total_loss / len(train_loader)
    print(f"Epoch [{epoch+1}/{num_epochs}], Loss: {avg_loss:.4f}")

# 評估
model.eval()  # 停用 dropout，batchnorm 使用 running stats
with torch.no_grad():  # 不計算梯度 → 節省記憶體
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

<pre><code class="language-text">訓練迴圈流程：

  ┌─────────────────────────────────────────────┐
  │              每個 EPOCH                       │
  │  ┌────────────────────────────────────────┐  │
  │  │         每個 BATCH                      │  │
  │  │                                        │  │
  │  │  1. images, labels = batch.to(device)  │  │
  │  │              │                         │  │
  │  │  2. outputs = model(images)   前向傳播  │  │
  │  │              │                         │  │
  │  │  3. loss = criterion(outputs, labels)  │  │
  │  │              │                         │  │
  │  │  4. optimizer.zero_grad()     重置     │  │
  │  │              │                         │  │
  │  │  5. loss.backward()          反向傳播  │  │
  │  │              │                         │  │
  │  │  6. optimizer.step()          更新     │  │
  │  │              │                         │  │
  │  └──────────────┼─────────────────────────┘  │
  │                 ▼                             │
  │         下一個 Epoch                           │
  └─────────────────────────────────────────────┘
</code></pre>

<blockquote><p><strong>考試提示：</strong> <code>zero_grad() → backward() → step()</code> 的順序是強制性的。忘記 <code>zero_grad()</code> 會導致梯度在批次間累積——這是 DLI 評估中的 #1 錯誤。務必記住在訓練前使用 <code>model.train()</code>，在評估前使用 <code>model.eval()</code> + <code>torch.no_grad()</code>。</p></blockquote>

<h3 id="gpu-acceleration">4.4 GPU 加速</h3>

<pre><code class="language-python"># 檢查 GPU
print(torch.cuda.is_available())        # True/False
print(torch.cuda.device_count())        # GPU 數量
print(torch.cuda.get_device_name(0))    # GPU 名稱

# 將模型和資料移至 GPU
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)

# 在訓練迴圈中——資料也必須在同一裝置上
images = images.to(device)
labels = labels.to(device)
</code></pre>

<blockquote><p><strong>考試提示：</strong> 常見錯誤：模型在 GPU 上但資料仍在 CPU（或反過來）。PyTorch 會拋出 <em>"Expected all tensors to be on the same device"</em> 錯誤。務必確保模型和資料在同一個 <code>device</code> 上。</p></blockquote>

<h2 id="cnn-architecture">5. CNN 架構</h2>

<h3 id="conv-layers">5.1 卷積層</h3>

<p><strong>卷積</strong>是將一個 <strong>kernel（濾波器）</strong>在輸入影像上滑動以擷取特徵。每個 kernel 偵測特定的模式（邊緣、紋理、形狀）。</p>

<pre><code class="language-python"># 基本 Conv2d
conv = nn.Conv2d(
    in_channels=3,    # RGB 輸入
    out_channels=32,  # 32 個濾波器 → 32 個特徵圖
    kernel_size=3,    # 3×3 kernel
    stride=1,         # 步幅
    padding=1          # 零填充以保持空間大小
)

# 輸出形狀計算：
# H_out = (H_in + 2*padding - kernel_size) / stride + 1
# 範例: (32 + 2*1 - 3) / 1 + 1 = 32（大小保持不變）
</code></pre>

<pre><code class="language-text">卷積操作：

輸入 (3 通道)               Kernel (3×3)         輸出 (1 個特徵圖)
┌─────────────┐            ┌───────┐              ┌──────────┐
│ ■ ■ ■ ■ ■ ■│   ×        │ w w w │     =        │ ○ ○ ○ ○  │
│ ■ ■ ■ ■ ■ ■│            │ w w w │              │ ○ ○ ○ ○  │
│ ■ ■ ■ ■ ■ ■│            │ w w w │              │ ○ ○ ○ ○  │
│ ■ ■ ■ ■ ■ ■│            └───────┘              │ ○ ○ ○ ○  │
│ ■ ■ ■ ■ ■ ■│                                   └──────────┘
│ ■ ■ ■ ■ ■ ■│         32 個 kernel → 32 個特徵圖
└─────────────┘

形狀變化: (B, 3, 32, 32) → Conv2d(3, 32, 3, padding=1) → (B, 32, 32, 32)
</code></pre>

<h3 id="pooling">5.2 池化層</h3>

<p><strong>池化</strong>用於降低空間維度，有助於減少計算量並增加感受野：</p>

<table>
<thead>
<tr><th>池化</th><th>運作方式</th><th>適用場景</th></tr>
</thead>
<tbody>
<tr><td><code>nn.MaxPool2d(2)</code></td><td>取每個 2×2 視窗中的最大值</td><td>特徵偵測、標準 CNN</td></tr>
<tr><td><code>nn.AvgPool2d(2)</code></td><td>取每個 2×2 視窗中的平均值</td><td>更平滑的特徵</td></tr>
<tr><td><code>nn.AdaptiveAvgPool2d((1,1))</code></td><td>無論輸入大小，池化至固定大小</td><td>全連接層之前使用</td></tr>
</tbody>
</table>

<h3 id="normalization">5.3 Batch Normalization 與 Group Normalization</h3>

<p>這個知識對後續課程中的 <strong>Diffusion Models</strong> 部分<strong>極為重要</strong>。</p>

<table>
<thead>
<tr><th>屬性</th><th>BatchNorm</th><th>GroupNorm</th></tr>
</thead>
<tbody>
<tr><td>正規化方向</td><td>批次維度 (N)</td><td>通道群組 (C/G)</td></tr>
<tr><td>依賴批次大小</td><td>是——小批次時雜訊大</td><td>否——任何批次大小都適用</td></tr>
<tr><td>訓練 vs 推論</td><td>不同（running stats）</td><td>相同</td></tr>
<tr><td>常用於</td><td>傳統 CNN（ResNet）</td><td><strong>Diffusion Models</strong>、小群組</td></tr>
<tr><td>語法</td><td><code>nn.BatchNorm2d(C)</code></td><td><code>nn.GroupNorm(G, C)</code></td></tr>
</tbody>
</table>

<pre><code class="language-python"># BatchNorm — 跨批次正規化
bn = nn.BatchNorm2d(64)         # 64 個通道

# GroupNorm — 在通道群組內正規化
gn = nn.GroupNorm(
    num_groups=32,    # 將 64 個通道分為 32 組（每組 2 個通道）
    num_channels=64
)

# 兩者都接受輸入形狀: (B, C, H, W)
x = torch.randn(8, 64, 16, 16)
print(bn(x).shape)  # (8, 64, 16, 16)
print(gn(x).shape)  # (8, 64, 16, 16)
</code></pre>

<pre><code class="language-text">BatchNorm vs GroupNorm：

BatchNorm: 沿 ↓（批次軸）正規化          GroupNorm: 沿 →（通道群組）正規化
┌────────────────────────┐                    ┌────────────────────────┐
│  樣本 1: [c1 c2 c3 c4]  │                    │  樣本 1: [c1 c2│c3 c4]  │
│  樣本 2: [c1 c2 c3 c4]  │  ← 正規化          │            group1│group2 │ ← 正規化
│  樣本 3: [c1 c2 c3 c4]  │    每一行           │                  │       │   每個群組
│  樣本 4: [c1 c2 c3 c4]  │                    │  樣本 2: [c1 c2│c3 c4]  │
└────────────────────────┘                    └────────────────────────┘

→ Diffusion Models 使用 GroupNorm，因為 batch_size 通常很小
  且噪音水準各異 → BatchNorm 統計量不穩定
</code></pre>

<blockquote><p><strong>考試提示：</strong> 在建構 <strong>U-Net for Diffusion Models</strong>（後續課程）時，您將始終使用 <strong>GroupNorm</strong> 而非 BatchNorm。原因：diffusion 訓練通常使用小批次大小，且每個樣本具有不同的噪音水準 → BatchNorm 統計量變得不穩定。記住規則：<strong>Diffusion = GroupNorm</strong>。</p></blockquote>

<h3 id="cnn-code">5.4 程式碼：簡單 CNN 影像分類</h3>

<pre><code class="language-python">class SimpleCNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()

        # Conv Block 1: (B, 1, 28, 28) → (B, 32, 14, 14)
        self.block1 = nn.Sequential(
            nn.Conv2d(1, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2)
        )

        # Conv Block 2: (B, 32, 14, 14) → (B, 64, 7, 7)
        self.block2 = nn.Sequential(
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(2)
        )

        # Conv Block 3: (B, 64, 7, 7) → (B, 128, 1, 1)
        self.block3 = nn.Sequential(
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(),
            nn.AdaptiveAvgPool2d((1, 1))  # 全域平均池化
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

<pre><code class="language-text">CNN 架構流程：

輸入: (B, 1, 28, 28)
         │
    ┌────▼────────────────────────┐
    │ Conv2d(1→32, 3×3, pad=1)   │
    │ BatchNorm2d(32)             │  Block 1
    │ ReLU                        │
    │ MaxPool2d(2)                │
    └────┬────────────────────────┘
         │ (B, 32, 14, 14)
    ┌────▼────────────────────────┐
    │ Conv2d(32→64, 3×3, pad=1)  │
    │ BatchNorm2d(64)             │  Block 2
    │ ReLU                        │
    │ MaxPool2d(2)                │
    └────┬────────────────────────┘
         │ (B, 64, 7, 7)
    ┌────▼────────────────────────┐
    │ Conv2d(64→128, 3×3, pad=1) │
    │ BatchNorm2d(128)            │  Block 3
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
      輸出 logits
</code></pre>

<h2 id="cheat-sheet">6. 速查表</h2>

<table>
<thead>
<tr><th>概念</th><th>程式碼模式</th><th>記住</th></tr>
</thead>
<tbody>
<tr><td>建立模型</td><td>class MyModel(nn.Module)</td><td>務必呼叫 <code>super().__init__()</code></td></tr>
<tr><td>前向傳播</td><td><code>output = model(x)</code></td><td>將模型當函式呼叫，不要直接呼叫 <code>.forward()</code></td></tr>
<tr><td>訓練模式</td><td><code>model.train()</code></td><td>啟用 dropout、batchnorm 訓練統計</td></tr>
<tr><td>評估模式</td><td><code>model.eval()</code> + <code>torch.no_grad()</code></td><td>停用 dropout，使用 running stats</td></tr>
<tr><td>訓練迴圈</td><td>zero_grad → forward → loss → backward → step</td><td>順序至關重要</td></tr>
<tr><td>GPU 轉移</td><td><code>.to(device)</code></td><td>模型和資料都要轉移</td></tr>
<tr><td>分類損失</td><td><code>nn.CrossEntropyLoss()</code></td><td>已包含 softmax</td></tr>
<tr><td>Diffusion 損失</td><td><code>nn.MSELoss()</code></td><td>預測噪音，計算 MSE</td></tr>
<tr><td>Diffusion 正規化</td><td><code>nn.GroupNorm(G, C)</code></td><td>不依賴批次大小</td></tr>
<tr><td>Transformer 優化器</td><td><code>AdamW</code></td><td>正確的 weight decay</td></tr>
</tbody>
</table>

<h2 id="practice-questions">7. 練習題</h2>

<p>以下題目模擬 NVIDIA DLI 程式碼評估的風格——您需要閱讀程式碼、找出錯誤並撰寫完整程式碼。</p>

<h3 id="q1">Q1：修復損壞的訓練迴圈</h3>

<p>以下程式碼有一個導致模型無法收斂的錯誤。找出並修復它：</p>

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
<summary>顯示答案 Q1</summary>

<p><strong>錯誤：</strong> 在 <code>loss.backward()</code> 之前缺少 <code>optimizer.zero_grad()</code>。不重置梯度會導致梯度在批次間累積，使模型無法收斂或收斂結果不正確。</p>

<pre><code class="language-python">for epoch in range(10):
    model.train()
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        outputs = model(images)
        loss = criterion(outputs, labels)

        optimizer.zero_grad()  # ← 加入這一行
        loss.backward()
        optimizer.step()
</code></pre>

<p>標準順序：<code>zero_grad() → backward() → step()</code>。實際上 <code>zero_grad()</code> 也可以放在 <code>forward</code> 之前，但必須在 <code>backward()</code> 之前。</p>
</details>

<h3 id="q2">Q2：實作 3 層 CNN</h3>

<p>撰寫一個 CNN 類別，接收 RGB 影像 (3, 64, 64) 並輸出 5 個類別。要求：</p>
<ul>
<li>3 個卷積區塊，每個區塊：Conv2d → BatchNorm2d → ReLU → MaxPool2d(2)</li>
<li>通道數：3 → 32 → 64 → 128</li>
<li>最後使用 AdaptiveAvgPool2d + Linear</li>
</ul>

<details>
<summary>顯示答案 Q2</summary>

<pre><code class="language-python">class ThreeLayerCNN(nn.Module):
    def __init__(self, num_classes=5):
        super().__init__()
        self.features = nn.Sequential(
            # Block 1: (B, 3, 64, 64) → (B, 32, 32, 32)
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2),

            # Block 2: (B, 32, 32, 32) → (B, 64, 16, 16)
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(2),

            # Block 3: (B, 64, 16, 16) → (B, 128, 8, 8)
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

# 驗證
model = ThreeLayerCNN(num_classes=5)
x = torch.randn(4, 3, 64, 64)
print(model(x).shape)  # torch.Size([4, 5])
</code></pre>
</details>

<h3 id="q3">Q3：追蹤網路中的 tensor 形狀</h3>

<p>給定以下模型和輸入形狀 <code>(8, 1, 32, 32)</code>。記錄每一步的形狀：</p>

<pre><code class="language-python">model = nn.Sequential(
    nn.Conv2d(1, 16, kernel_size=5, stride=2, padding=2),  # Step A
    nn.ReLU(),
    nn.Conv2d(16, 32, kernel_size=3, stride=1, padding=0), # Step B
    nn.ReLU(),
    nn.AdaptiveAvgPool2d((4, 4)),                           # Step C
    nn.Flatten(),                                            # Step D
    nn.Linear(32 * 4 * 4, 10),                              # Step E
)
</code></pre>

<details>
<summary>顯示答案 Q3</summary>

<p>輸出大小公式：<code>H_out = (H_in + 2*padding - kernel_size) / stride + 1</code></p>

<pre><code class="language-text">輸入:  (8, 1, 32, 32)

Step A: Conv2d(1, 16, k=5, s=2, p=2)
        H = (32 + 2*2 - 5) / 2 + 1 = 16
        → (8, 16, 16, 16)

Step B: Conv2d(16, 32, k=3, s=1, p=0)
        H = (16 + 2*0 - 3) / 1 + 1 = 14
        → (8, 32, 14, 14)

Step C: AdaptiveAvgPool2d((4, 4))
        → (8, 32, 4, 4)

Step D: Flatten()
        → (8, 512)       # 32 * 4 * 4 = 512

Step E: Linear(512, 10)
        → (8, 10)
</code></pre>

<p><strong>關鍵要點：</strong> <code>AdaptiveAvgPool2d</code> 無論輸入大小都會輸出固定大小——當輸入大小可能變化時非常實用。</p>
</details>

<h3 id="q4">Q4：GroupNorm 與 BatchNorm——何時使用哪一個？</h3>

<p>您正在建構一個 <strong>U-Net for Diffusion Model</strong>。每個區塊有 Conv2d → ??? → SiLU。您會選擇哪種正規化？為什麼？撰寫一個區塊的程式碼。</p>

<details>
<summary>顯示答案 Q4</summary>

<p><strong>選擇 GroupNorm。</strong> 原因：</p>
<ol>
<li><strong>小批次大小：</strong> Diffusion 訓練通常使用 batch size 1-8，因為影像較大 → BatchNorm 統計量雜訊太大</li>
<li><strong>不同噪音水準：</strong> 批次中的每個樣本具有不同的 timestep（噪音水準）→ 跨批次正規化不合適</li>
<li><strong>推論一致性：</strong> GroupNorm 在訓練和推論時行為一致</li>
</ol>

<pre><code class="language-python">class DiffusionBlock(nn.Module):
    def __init__(self, in_channels, out_channels, num_groups=32):
        super().__init__()
        self.conv = nn.Conv2d(in_channels, out_channels,
                              kernel_size=3, padding=1)
        self.norm = nn.GroupNorm(num_groups, out_channels)
        self.act = nn.SiLU()  # SiLU 在 diffusion 中比 ReLU 更常用

    def forward(self, x):
        x = self.conv(x)
        x = self.norm(x)
        x = self.act(x)
        return x

# 使用範例
block = DiffusionBlock(64, 128, num_groups=32)
x = torch.randn(2, 64, 32, 32)  # batch_size = 2，很小！
print(block(x).shape)  # (2, 128, 32, 32)
</code></pre>

<p><strong>規則：</strong> 在所有 Diffusion 架構（U-Net、DiT）中，始終使用 <code>nn.GroupNorm</code>。激活函數通常使用 <code>nn.SiLU()</code>（Swish）而非 ReLU。</p>
</details>

<h3 id="q5">Q5：除錯梯度問題 — detach() 與 torch.no_grad()</h3>

<p>以下程式碼有什麼問題？<code>feature_extractor</code> 的輸出不應有梯度（凍結骨幹網路），但 <code>classifier</code> 仍需要訓練。</p>

<pre><code class="language-python">feature_extractor = pretrained_model.features
classifier = nn.Linear(512, 10).to(device)
optimizer = torch.optim.Adam(classifier.parameters(), lr=1e-3)

for images, labels in train_loader:
    images, labels = images.to(device), labels.to(device)

    # 擷取特徵（應為凍結狀態）
    with torch.no_grad():
        features = feature_extractor(images)

    # 分類
    outputs = classifier(features)
    loss = criterion(outputs, labels)

    optimizer.zero_grad()
    loss.backward()    # ← 這裡有問題嗎？
    optimizer.step()
</code></pre>

<details>
<summary>顯示答案 Q5</summary>

<p><strong>問題：</strong> 這段程式碼在此情況下實際上<strong>可以正確運作</strong>！<code>torch.no_grad()</code> 阻止了 <code>feature_extractor</code> 的梯度計算，且 <code>features</code> tensor 不會有 <code>requires_grad</code>。梯度仍然會正常流經 <code>classifier</code>。</p>

<p><strong>然而</strong>，有 2 種方法，您需要理解其差異：</p>

<pre><code class="language-python"># 方法 1: torch.no_grad() — 不計算梯度，節省記憶體
with torch.no_grad():
    features = feature_extractor(images)
# features.requires_grad = False
# 梯度不會回流到 feature_extractor
# ✅ 當您想完全凍結並節省 GPU 記憶體時使用

# 方法 2: .detach() — 將 tensor 從計算圖中分離
features = feature_extractor(images).detach()
# features.requires_grad = False
# feature_extractor 仍會計算前向傳播（記憶體用於建構圖）
# 但梯度在 .detach() 處被截斷
# ⚠️ 效率較低，因為先建構圖再截斷

# 方法 3: 凍結參數 — 最常見的方法
for param in feature_extractor.parameters():
    param.requires_grad = False
# ✅ 最明確，常用於微調
</code></pre>

<table>
<thead>
<tr><th>方法</th><th>梯度流</th><th>記憶體</th><th>適用場景</th></tr>
</thead>
<tbody>
<tr><td><code>torch.no_grad()</code></td><td>不建構計算圖</td><td>最高效</td><td>推論、凍結特徵</td></tr>
<tr><td><code>.detach()</code></td><td>在 detach 處截斷</td><td>較高開銷</td><td>需要部分梯度流時</td></tr>
<tr><td>凍結參數</td><td>權重不更新</td><td>仍建構計算圖</td><td>明確的微調</td></tr>
</tbody>
</table>
</details>

<h2 id="ket-luan">8. 結論</h2>

<p>第 1 課已為您裝備了 NVIDIA DLI Generative AI 課程所需的所有 PyTorch 基礎。確保您能夠：</p>

<ul>
<li>在不查閱文件的情況下撰寫完整的<strong>訓練迴圈</strong></li>
<li>建立包含 <code>__init__</code> 和 <code>forward</code> 的 <strong>nn.Module</strong> 類別</li>
<li>追蹤 <strong>tensor 形狀</strong>通過每一層的變化</li>
<li>區分 <strong>GroupNorm 與 BatchNorm</strong>——這對 Diffusion Models 尤為重要</li>
<li>除錯常見錯誤：遺漏 <code>zero_grad()</code>、裝置不匹配、梯度問題</li>
</ul>

<p>下一課：<strong>第 2 課 — Transformer 架構與 Attention 機制</strong>——Transformers 和 LLMs 的基礎。</p>
