---
id: 019c9619-nv01-p1-l01
title: 'Bài 1: PyTorch & Neural Network Fundamentals'
slug: bai-1-pytorch-neural-network-fundamentals
description: >-
  PyTorch tensors, autograd, nn.Module. Build neural network from scratch.
  Training loop, loss functions, optimizers. GPU acceleration basics.
  CNN architecture, pooling, batch normalization.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 1
section_title: "Part 1: Deep Learning Foundations"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'Luyện thi NVIDIA DLI — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="gioi-thieu">1. Giới thiệu</h2>

<p>Bài học đầu tiên trong series luyện thi <strong>NVIDIA DLI — Generative AI</strong> sẽ trang bị cho bạn nền tảng <strong>PyTorch</strong> vững chắc. Đây là framework chính được sử dụng trong toàn bộ khóa học DLI, từ <strong>Diffusion Models</strong> đến <strong>Large Language Models (LLMs)</strong>.</p>

<p>Trong bài assessment của NVIDIA DLI, bạn sẽ phải viết code trực tiếp — không phải trắc nghiệm. Vì vậy, nắm vững các pattern cơ bản của PyTorch là điều kiện tiên quyết.</p>

<blockquote><p><strong>Exam tip:</strong> NVIDIA DLI assessment yêu cầu bạn viết và debug code PyTorch trực tiếp. Hãy chắc chắn bạn có thể viết <strong>training loop</strong>, <strong>nn.Module</strong>, và thao tác <strong>tensor</strong> mà không cần nhìn tài liệu.</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai1-neural-network-architecture.webp" alt="Kiến trúc Deep Neural Network — Input Layer, Hidden Layers, Output Layer, Backpropagation" loading="lazy" /><figcaption>Kiến trúc Deep Neural Network — Input Layer, Hidden Layers, Output Layer, Backpropagation</figcaption></figure>

<h2 id="pytorch-tensors-autograd">2. PyTorch Tensors & Autograd</h2>

<h3 id="tensor-basics">2.1 Tensor Basics</h3>

<p><strong>Tensor</strong> là cấu trúc dữ liệu cốt lõi của PyTorch — tương tự NumPy array nhưng có thể chạy trên <strong>GPU</strong> và hỗ trợ <strong>automatic differentiation</strong>.</p>

<pre><code class="language-python">import torch

# Tạo tensor từ list
x = torch.tensor([1.0, 2.0, 3.0])

# Tạo tensor với shape cụ thể
zeros = torch.zeros(3, 4)          # shape: (3, 4)
ones = torch.ones(2, 3, 4)         # shape: (2, 3, 4)
rand = torch.randn(64, 3, 32, 32)  # batch of 64 RGB 32x32 images

# Kiểm tra shape và dtype
print(rand.shape)   # torch.Size([64, 3, 32, 32])
print(rand.dtype)   # torch.float32
print(rand.device)  # cpu
</code></pre>

<h3 id="tensor-operations">2.2 Tensor Operations & Broadcasting</h3>

<p>PyTorch hỗ trợ <strong>broadcasting</strong> tương tự NumPy — cho phép thực hiện phép tính giữa tensors có shape khác nhau.</p>

<pre><code class="language-python"># Reshape operations
x = torch.randn(2, 3, 4)
y = x.view(2, 12)        # reshape thành (2, 12)
z = x.permute(0, 2, 1)   # swap dims: (2, 4, 3)
w = x.unsqueeze(0)        # thêm dim: (1, 2, 3, 4)

# Matrix multiplication
a = torch.randn(3, 4)
b = torch.randn(4, 5)
c = a @ b                 # shape: (3, 5)
# hoặc: c = torch.matmul(a, b)

# Broadcasting
x = torch.randn(64, 256)  # (batch, features)
bias = torch.randn(256)   # (features,)
result = x + bias          # bias được broadcast: (64, 256)
</code></pre>

<table>
<thead>
<tr><th>Operation</th><th>Syntax</th><th>Ghi chú</th></tr>
</thead>
<tbody>
<tr><td>Reshape</td><td><code>x.view()</code> / <code>x.reshape()</code></td><td><code>view</code> yêu cầu contiguous memory</td></tr>
<tr><td>Transpose</td><td><code>x.permute()</code> / <code>x.T</code></td><td><code>permute</code> linh hoạt hơn cho nhiều dims</td></tr>
<tr><td>Add dim</td><td><code>x.unsqueeze(dim)</code></td><td>Thường dùng để chuẩn bị broadcasting</td></tr>
<tr><td>Remove dim</td><td><code>x.squeeze(dim)</code></td><td>Xóa dim có size = 1</td></tr>
<tr><td>Matrix mul</td><td><code>a @ b</code></td><td>Equivalent to <code>torch.matmul</code></td></tr>
<tr><td>Concat</td><td><code>torch.cat([a, b], dim=0)</code></td><td>Nối theo dim chỉ định</td></tr>
</tbody>
</table>

<h3 id="autograd">2.3 Autograd — Automatic Differentiation</h3>

<p><strong>Autograd</strong> là hệ thống tự động tính gradient của PyTorch. Khi bạn set <code>requires_grad=True</code>, PyTorch sẽ theo dõi mọi phép tính trên tensor đó và xây dựng <strong>computational graph</strong>.</p>

<pre><code class="language-python"># Autograd cơ bản
x = torch.tensor([2.0, 3.0], requires_grad=True)
y = x ** 2 + 3 * x       # y = x² + 3x
loss = y.sum()            # scalar output
loss.backward()           # tính gradient

print(x.grad)  # dy/dx = 2x + 3 → tensor([7., 9.])
</code></pre>

<pre><code class="language-text">Computational Graph:

  x (requires_grad=True)
  │
  ├──→ x ** 2 ──→ + ──→ y ──→ sum() ──→ loss
  │                ↑                        │
  └──→ 3 * x ─────┘                   backward()
                                            │
                                       x.grad = 2x + 3
</code></pre>

<blockquote><p><strong>Exam tip:</strong> Trong DLI assessment, bạn có thể gặp lỗi "trying to backward through the graph a second time". Giải pháp: dùng <code>loss.backward(retain_graph=True)</code> hoặc tính lại forward pass. Đây là lỗi rất phổ biến khi làm bài.</p></blockquote>

<h2 id="nn-module">3. nn.Module & Building Networks</h2>

<h3 id="nn-module-pattern">3.1 nn.Module Pattern</h3>

<p>Mọi neural network trong PyTorch đều kế thừa từ <code>nn.Module</code>. Đây là pattern bắt buộc phải thuộc lòng:</p>

<pre><code class="language-python">import torch.nn as nn

class SimpleNet(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super().__init__()  # PHẢI gọi super().__init__()
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_dim, output_dim)

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x

# Sử dụng
model = SimpleNet(784, 256, 10)
x = torch.randn(32, 784)  # batch of 32
output = model(x)          # shape: (32, 10)
</code></pre>

<h3 id="common-layers">3.2 Common Layers</h3>

<table>
<thead>
<tr><th>Layer</th><th>Công dụng</th><th>Params chính</th></tr>
</thead>
<tbody>
<tr><td><code>nn.Linear(in, out)</code></td><td>Fully connected layer</td><td>in_features, out_features</td></tr>
<tr><td><code>nn.Conv2d(in_ch, out_ch, k)</code></td><td>2D convolution</td><td>in_channels, out_channels, kernel_size</td></tr>
<tr><td><code>nn.BatchNorm2d(ch)</code></td><td>Batch normalization</td><td>num_features</td></tr>
<tr><td><code>nn.GroupNorm(g, ch)</code></td><td>Group normalization</td><td>num_groups, num_channels</td></tr>
<tr><td><code>nn.ReLU()</code></td><td>Activation function</td><td>inplace (optional)</td></tr>
<tr><td><code>nn.Dropout(p)</code></td><td>Regularization</td><td>p = drop probability</td></tr>
<tr><td><code>nn.Embedding(V, D)</code></td><td>Token embedding</td><td>num_embeddings, embedding_dim</td></tr>
</tbody>
</table>

<h3 id="nn-sequential">3.3 nn.Sequential — Quick Models</h3>

<p>Với mô hình đơn giản, bạn có thể dùng <code>nn.Sequential</code> thay vì tạo class:</p>

<pre><code class="language-python"># Cách nhanh với nn.Sequential
model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(256, 128),
    nn.ReLU(),
    nn.Linear(128, 10)
)

# Kiểm tra model
print(model)
# Đếm parameters
total_params = sum(p.numel() for p in model.parameters())
print(f"Total params: {total_params:,}")
</code></pre>

<h3 id="mlp-mnist">3.4 Code: MLP cho MNIST</h3>

<pre><code class="language-python">import torch
import torch.nn as nn
from torchvision import datasets, transforms

# Data
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])
train_data = datasets.MNIST('./data', train=True, download=True,
                            transform=transform)
train_loader = torch.utils.data.DataLoader(train_data, batch_size=64,
                                           shuffle=True)

# Model
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

<h2 id="training-loop">4. Training Loop Pattern</h2>

<h3 id="loss-functions">4.1 Loss Functions</h3>

<table>
<thead>
<tr><th>Loss Function</th><th>Dùng khi</th><th>Input shape</th></tr>
</thead>
<tbody>
<tr><td><code>nn.CrossEntropyLoss()</code></td><td>Multi-class classification</td><td>logits (B, C), labels (B,)</td></tr>
<tr><td><code>nn.MSELoss()</code></td><td>Regression, diffusion noise prediction</td><td>(B, *) vs (B, *)</td></tr>
<tr><td><code>nn.BCEWithLogitsLoss()</code></td><td>Binary / multi-label classification</td><td>logits (B, C), labels (B, C)</td></tr>
<tr><td><code>nn.L1Loss()</code></td><td>Regression (robust to outliers)</td><td>(B, *) vs (B, *)</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> <code>nn.CrossEntropyLoss</code> đã bao gồm <strong>softmax</strong> bên trong — KHÔNG cần thêm softmax ở output layer. Đây là lỗi mà nhiều người mắc phải trong assessment. <code>nn.MSELoss</code> sẽ rất quan trọng khi bạn học <strong>Diffusion Models</strong> (predict noise).</p></blockquote>

<h3 id="optimizers">4.2 Optimizers</h3>

<pre><code class="language-python"># SGD — cơ bản, can thiệp learning rate thủ công
optimizer = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)

# Adam — phổ biến nhất, adaptive learning rate
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

# AdamW — Adam + weight decay đúng cách (dùng cho Transformers)
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4, weight_decay=0.01)
</code></pre>

<table>
<thead>
<tr><th>Optimizer</th><th>Khi nào dùng</th><th>Đặc điểm</th></tr>
</thead>
<tbody>
<tr><td><strong>SGD</strong></td><td>CNNs, khi cần kiểm soát tỉ mỉ</td><td>Cần tune lr cẩn thận, thêm momentum</td></tr>
<tr><td><strong>Adam</strong></td><td>Mặc định cho hầu hết tasks</td><td>Hội tụ nhanh, ít cần tune</td></tr>
<tr><td><strong>AdamW</strong></td><td>Transformers, LLMs, Diffusion</td><td>Weight decay tách riêng, chuẩn hơn Adam</td></tr>
</tbody>
</table>

<h3 id="full-training-loop">4.3 Full Training Loop</h3>

<p>Đây là pattern quan trọng nhất — bạn phải viết được training loop hoàn chỉnh trong assessment:</p>

<pre><code class="language-python">import torch
import torch.nn as nn

# Setup
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = MNISTClassifier().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

# Training loop
num_epochs = 10
for epoch in range(num_epochs):
    model.train()  # BẬT training mode (dropout, batchnorm active)
    total_loss = 0

    for batch_idx, (images, labels) in enumerate(train_loader):
        images, labels = images.to(device), labels.to(device)

        # Forward pass
        outputs = model(images)
        loss = criterion(outputs, labels)

        # Backward pass
        optimizer.zero_grad()  # QUAN TRỌNG: reset gradients
        loss.backward()        # tính gradients
        optimizer.step()       # update weights

        total_loss += loss.item()

    avg_loss = total_loss / len(train_loader)
    print(f"Epoch [{epoch+1}/{num_epochs}], Loss: {avg_loss:.4f}")

# Evaluation
model.eval()  # TẮT dropout, batchnorm dùng running stats
with torch.no_grad():  # KHÔNG tính gradients → tiết kiệm memory
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

<pre><code class="language-text">Training Loop Flow:

  ┌─────────────────────────────────────────────┐
  │              FOR EACH EPOCH                  │
  │  ┌────────────────────────────────────────┐  │
  │  │         FOR EACH BATCH                 │  │
  │  │                                        │  │
  │  │  1. images, labels = batch.to(device)  │  │
  │  │              │                         │  │
  │  │  2. outputs = model(images)   FORWARD  │  │
  │  │              │                         │  │
  │  │  3. loss = criterion(outputs, labels)  │  │
  │  │              │                         │  │
  │  │  4. optimizer.zero_grad()     RESET    │  │
  │  │              │                         │  │
  │  │  5. loss.backward()          BACKWARD  │  │
  │  │              │                         │  │
  │  │  6. optimizer.step()          UPDATE   │  │
  │  │              │                         │  │
  │  └──────────────┼─────────────────────────┘  │
  │                 ▼                             │
  │         Next Epoch                            │
  └─────────────────────────────────────────────┘
</code></pre>

<blockquote><p><strong>Exam tip:</strong> Thứ tự <code>zero_grad() → backward() → step()</code> là BẮT BUỘC. Quên <code>zero_grad()</code> sẽ khiến gradients bị tích lũy qua các batch — đây là bug #1 trong DLI assessment. Luôn nhớ <code>model.train()</code> trước training và <code>model.eval()</code> + <code>torch.no_grad()</code> trước evaluation.</p></blockquote>

<h3 id="gpu-acceleration">4.4 GPU Acceleration</h3>

<pre><code class="language-python"># Kiểm tra GPU
print(torch.cuda.is_available())        # True/False
print(torch.cuda.device_count())        # Số GPU
print(torch.cuda.get_device_name(0))    # Tên GPU

# Di chuyển model và data lên GPU
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)

# TRONG training loop — data cũng phải lên cùng device
images = images.to(device)
labels = labels.to(device)
</code></pre>

<blockquote><p><strong>Exam tip:</strong> Lỗi phổ biến: model trên GPU nhưng data vẫn trên CPU (hoặc ngược lại). PyTorch sẽ báo lỗi <em>"Expected all tensors to be on the same device"</em>. Luôn đảm bảo model và data cùng <code>device</code>.</p></blockquote>

<h2 id="cnn-architecture">5. CNN Architecture</h2>

<h3 id="conv-layers">5.1 Convolutional Layers</h3>

<p><strong>Convolution</strong> trượt một <strong>kernel (filter)</strong> qua input image để trích xuất features. Mỗi kernel phát hiện một pattern cụ thể (edges, textures, shapes).</p>

<pre><code class="language-python"># Conv2d cơ bản
conv = nn.Conv2d(
    in_channels=3,    # RGB input
    out_channels=32,  # 32 filters → 32 feature maps
    kernel_size=3,    # 3×3 kernel
    stride=1,         # bước nhảy
    padding=1          # zero-padding để giữ spatial size
)

# Output shape calculation:
# H_out = (H_in + 2*padding - kernel_size) / stride + 1
# Ví dụ: (32 + 2*1 - 3) / 1 + 1 = 32 (giữ nguyên size)
</code></pre>

<pre><code class="language-text">Convolution Operation:

Input (3 channels)          Kernel (3×3)         Output (1 feature map)
┌─────────────┐            ┌───────┐              ┌──────────┐
│ ■ ■ ■ ■ ■ ■│   ×        │ w w w │     =        │ ○ ○ ○ ○  │
│ ■ ■ ■ ■ ■ ■│            │ w w w │              │ ○ ○ ○ ○  │
│ ■ ■ ■ ■ ■ ■│            │ w w w │              │ ○ ○ ○ ○  │
│ ■ ■ ■ ■ ■ ■│            └───────┘              │ ○ ○ ○ ○  │
│ ■ ■ ■ ■ ■ ■│                                   └──────────┘
│ ■ ■ ■ ■ ■ ■│         32 kernels → 32 feature maps
└─────────────┘

Shape flow: (B, 3, 32, 32) → Conv2d(3, 32, 3, padding=1) → (B, 32, 32, 32)
</code></pre>

<h3 id="pooling">5.2 Pooling Layers</h3>

<p><strong>Pooling</strong> giảm spatial dimensions, giúp giảm computation và tăng receptive field:</p>

<table>
<thead>
<tr><th>Pooling</th><th>Cách hoạt động</th><th>Khi nào dùng</th></tr>
</thead>
<tbody>
<tr><td><code>nn.MaxPool2d(2)</code></td><td>Lấy giá trị max trong mỗi 2×2 window</td><td>Feature detection, CNNs thông thường</td></tr>
<tr><td><code>nn.AvgPool2d(2)</code></td><td>Lấy trung bình trong mỗi 2×2 window</td><td>Smoother features</td></tr>
<tr><td><code>nn.AdaptiveAvgPool2d((1,1))</code></td><td>Pool về size cố định bất kể input</td><td>Trước fully-connected layer</td></tr>
</tbody>
</table>

<h3 id="normalization">5.3 Batch Normalization vs Group Normalization</h3>

<p>Đây là kiến thức <strong>cực kỳ quan trọng</strong> cho phần <strong>Diffusion Models</strong> ở các bài sau.</p>

<table>
<thead>
<tr><th>Thuộc tính</th><th>BatchNorm</th><th>GroupNorm</th></tr>
</thead>
<tbody>
<tr><td>Normalize theo</td><td>Batch dimension (N)</td><td>Channel groups (C/G)</td></tr>
<tr><td>Phụ thuộc batch size</td><td>Có — batch nhỏ thì noisy</td><td>Không — hoạt động tốt mọi batch size</td></tr>
<tr><td>Training vs Inference</td><td>Khác nhau (running stats)</td><td>Giống nhau</td></tr>
<tr><td>Phổ biến trong</td><td>CNNs truyền thống (ResNet)</td><td><strong>Diffusion Models</strong>, nhóm nhỏ</td></tr>
<tr><td>Syntax</td><td><code>nn.BatchNorm2d(C)</code></td><td><code>nn.GroupNorm(G, C)</code></td></tr>
</tbody>
</table>

<pre><code class="language-python"># BatchNorm — normalize across batch
bn = nn.BatchNorm2d(64)         # 64 channels

# GroupNorm — normalize within groups of channels
gn = nn.GroupNorm(
    num_groups=32,    # chia 64 channels thành 32 groups (2 ch/group)
    num_channels=64
)

# Cả hai nhận input shape: (B, C, H, W)
x = torch.randn(8, 64, 16, 16)
print(bn(x).shape)  # (8, 64, 16, 16)
print(gn(x).shape)  # (8, 64, 16, 16)
</code></pre>

<pre><code class="language-text">BatchNorm vs GroupNorm:

BatchNorm: normalize theo ↓ (batch axis)   GroupNorm: normalize theo → (channel groups)
┌────────────────────────┐                  ┌────────────────────────┐
│  Sample 1: [c1 c2 c3 c4]│                  │  Sample 1: [c1 c2│c3 c4]│
│  Sample 2: [c1 c2 c3 c4]│  ← normalize    │            group1│group2 │ ← normalize
│  Sample 3: [c1 c2 c3 c4]│    mỗi column   │                  │       │   mỗi group
│  Sample 4: [c1 c2 c3 c4]│                  │  Sample 2: [c1 c2│c3 c4]│
└────────────────────────┘                  └────────────────────────┘

→ Diffusion Models dùng GroupNorm vì batch_size thường nhỏ
  và noise level thay đổi → BatchNorm statistics không ổn định
</code></pre>

<blockquote><p><strong>Exam tip:</strong> Khi xây dựng <strong>U-Net cho Diffusion Models</strong> (bài sau), bạn sẽ luôn dùng <strong>GroupNorm</strong> thay vì BatchNorm. Lý do: diffusion training thường dùng batch size nhỏ, và mỗi sample có noise level khác nhau → BatchNorm statistics bị noisy. Nhớ quy tắc: <strong>Diffusion = GroupNorm</strong>.</p></blockquote>

<h3 id="cnn-code">5.4 Code: Simple CNN cho Image Classification</h3>

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
            nn.AdaptiveAvgPool2d((1, 1))  # global average pooling
        )

        # Classifier
        self.classifier = nn.Linear(128, num_classes)

    def forward(self, x):
        x = self.block1(x)     # (B, 32, 14, 14)
        x = self.block2(x)     # (B, 64, 7, 7)
        x = self.block3(x)     # (B, 128, 1, 1)
        x = x.view(x.size(0), -1)  # (B, 128)
        x = self.classifier(x)     # (B, 10)
        return x
</code></pre>

<pre><code class="language-text">CNN Architecture Flow:

Input: (B, 1, 28, 28)
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
    │ Linear(128, 10)             │  Classifier
    └────┬────────────────────────┘
         │ (B, 10)
         ▼
      Output logits
</code></pre>

<h2 id="cheat-sheet">6. Cheat Sheet</h2>

<table>
<thead>
<tr><th>Concept</th><th>Code Pattern</th><th>Ghi nhớ</th></tr>
</thead>
<tbody>
<tr><td>Tạo model</td><td>class MyModel(nn.Module)</td><td>Luôn gọi <code>super().__init__()</code></td></tr>
<tr><td>Forward pass</td><td><code>output = model(x)</code></td><td>Gọi model như function, không gọi <code>.forward()</code> trực tiếp</td></tr>
<tr><td>Training mode</td><td><code>model.train()</code></td><td>Bật dropout, batchnorm training stats</td></tr>
<tr><td>Eval mode</td><td><code>model.eval()</code> + <code>torch.no_grad()</code></td><td>Tắt dropout, dùng running stats</td></tr>
<tr><td>Training loop</td><td>zero_grad → forward → loss → backward → step</td><td>Thứ tự QUAN TRỌNG</td></tr>
<tr><td>GPU transfer</td><td><code>.to(device)</code></td><td>Cả model VÀ data</td></tr>
<tr><td>Classification loss</td><td><code>nn.CrossEntropyLoss()</code></td><td>Đã bao gồm softmax</td></tr>
<tr><td>Diffusion loss</td><td><code>nn.MSELoss()</code></td><td>Predict noise, tính MSE</td></tr>
<tr><td>Diffusion norm</td><td><code>nn.GroupNorm(G, C)</code></td><td>Không phụ thuộc batch size</td></tr>
<tr><td>Transformer optimizer</td><td><code>AdamW</code></td><td>Weight decay đúng cách</td></tr>
</tbody>
</table>

<h2 id="practice-questions">7. Practice Questions</h2>

<p>Các câu hỏi sau mô phỏng dạng coding assessment của NVIDIA DLI — bạn cần đọc code, tìm lỗi, và viết code hoàn chỉnh.</p>

<h3 id="q1">Q1: Fix the broken training loop</h3>

<p>Đoạn code dưới đây có bug khiến model không hội tụ. Tìm và sửa lỗi:</p>

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
<summary>Xem đáp án Q1</summary>

<p><strong>Bug:</strong> Thiếu <code>optimizer.zero_grad()</code> trước <code>loss.backward()</code>. Không reset gradients sẽ khiến gradients tích lũy qua các batch, model không hội tụ hoặc hội tụ sai.</p>

<pre><code class="language-python">for epoch in range(10):
    model.train()
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        outputs = model(images)
        loss = criterion(outputs, labels)

        optimizer.zero_grad()  # ← THÊM DÒNG NÀY
        loss.backward()
        optimizer.step()
</code></pre>

<p>Thứ tự chuẩn: <code>zero_grad() → backward() → step()</code>. Trong thực tế, <code>zero_grad()</code> có thể đặt trước <code>forward</code> cũng được, nhưng PHẢI có trước <code>backward()</code>.</p>
</details>

<h3 id="q2">Q2: Implement a 3-layer CNN</h3>

<p>Viết một CNN class nhận input RGB images (3, 64, 64) và output 5 classes. Yêu cầu:</p>
<ul>
<li>3 convolutional blocks, mỗi block: Conv2d → BatchNorm2d → ReLU → MaxPool2d(2)</li>
<li>Channels: 3 → 32 → 64 → 128</li>
<li>Kết thúc bằng AdaptiveAvgPool2d + Linear</li>
</ul>

<details>
<summary>Xem đáp án Q2</summary>

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

# Verify
model = ThreeLayerCNN(num_classes=5)
x = torch.randn(4, 3, 64, 64)
print(model(x).shape)  # torch.Size([4, 5])
</code></pre>
</details>

<h3 id="q3">Q3: Trace tensor shapes through a network</h3>

<p>Cho model dưới đây và input shape <code>(8, 1, 32, 32)</code>. Ghi lại shape tại mỗi bước:</p>

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
<summary>Xem đáp án Q3</summary>

<p>Công thức output size: <code>H_out = (H_in + 2*padding - kernel_size) / stride + 1</code></p>

<pre><code class="language-text">Input:  (8, 1, 32, 32)

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

<p><strong>Key insight:</strong> <code>AdaptiveAvgPool2d</code> luôn output size cố định bất kể input — rất hữu ích khi input size có thể thay đổi.</p>
</details>

<h3 id="q4">Q4: GroupNorm vs BatchNorm — khi nào dùng gì?</h3>

<p>Bạn đang xây dựng một <strong>U-Net cho Diffusion Model</strong>. Mỗi block có Conv2d → ??? → SiLU. Bạn chọn normalization nào và tại sao? Viết code cho 1 block.</p>

<details>
<summary>Xem đáp án Q4</summary>

<p><strong>Chọn GroupNorm.</strong> Lý do:</p>
<ol>
<li><strong>Batch size nhỏ:</strong> Diffusion training thường dùng batch size 1-8 vì images lớn → BatchNorm statistics quá noisy</li>
<li><strong>Noise levels khác nhau:</strong> Mỗi sample trong batch có timestep (noise level) khác nhau → normalize across batch không hợp lý</li>
<li><strong>Inference consistency:</strong> GroupNorm hoạt động giống nhau ở train và inference</li>
</ol>

<pre><code class="language-python">class DiffusionBlock(nn.Module):
    def __init__(self, in_channels, out_channels, num_groups=32):
        super().__init__()
        self.conv = nn.Conv2d(in_channels, out_channels,
                              kernel_size=3, padding=1)
        self.norm = nn.GroupNorm(num_groups, out_channels)
        self.act = nn.SiLU()  # SiLU phổ biến hơn ReLU trong diffusion

    def forward(self, x):
        x = self.conv(x)
        x = self.norm(x)
        x = self.act(x)
        return x

# Ví dụ sử dụng
block = DiffusionBlock(64, 128, num_groups=32)
x = torch.randn(2, 64, 32, 32)  # batch_size = 2, nhỏ!
print(block(x).shape)  # (2, 128, 32, 32)
</code></pre>

<p><strong>Quy tắc:</strong> Trong mọi kiến trúc Diffusion (U-Net, DiT), luôn dùng <code>nn.GroupNorm</code>. Activation thường là <code>nn.SiLU()</code> (Swish) thay vì ReLU.</p>
</details>

<h3 id="q5">Q5: Debug gradient issue — detach() vs torch.no_grad()</h3>

<p>Đoạn code dưới đây có vấn đề gì? Output của <code>feature_extractor</code> không nên có gradient (freeze backbone), nhưng <code>classifier</code> vẫn cần train.</p>

<pre><code class="language-python">feature_extractor = pretrained_model.features
classifier = nn.Linear(512, 10).to(device)
optimizer = torch.optim.Adam(classifier.parameters(), lr=1e-3)

for images, labels in train_loader:
    images, labels = images.to(device), labels.to(device)

    # Extract features (should be frozen)
    with torch.no_grad():
        features = feature_extractor(images)

    # Classify
    outputs = classifier(features)
    loss = criterion(outputs, labels)

    optimizer.zero_grad()
    loss.backward()    # ← Có vấn đề?
    optimizer.step()
</code></pre>

<details>
<summary>Xem đáp án Q5</summary>

<p><strong>Vấn đề:</strong> Code này thực ra <strong>hoạt động đúng</strong> cho trường hợp này! <code>torch.no_grad()</code> ngăn gradient computation cho <code>feature_extractor</code>, và <code>features</code> tensor sẽ không có <code>requires_grad</code>. Gradient vẫn flow qua <code>classifier</code> bình thường.</p>

<p><strong>Tuy nhiên</strong>, có 2 cách tiếp cận và bạn cần hiểu sự khác biệt:</p>

<pre><code class="language-python"># Cách 1: torch.no_grad() — KHÔNG tính gradient, tiết kiệm memory
with torch.no_grad():
    features = feature_extractor(images)
# features.requires_grad = False
# Gradient KHÔNG flow ngược qua feature_extractor
# ✅ Dùng khi muốn freeze hoàn toàn, tiết kiệm GPU memory

# Cách 2: .detach() — tách tensor khỏi computational graph
features = feature_extractor(images).detach()
# features.requires_grad = False
# Feature extractor VẪN tính forward (tốn memory cho graph)
# nhưng gradient bị cắt tại .detach()
# ⚠️ Kém hiệu quả hơn vì vẫn build graph rồi mới cắt

# Cách 3: Freeze parameters — approach phổ biến nhất
for param in feature_extractor.parameters():
    param.requires_grad = False
# ✅ Rõ ràng nhất, thường dùng trong fine-tuning
</code></pre>

<table>
<thead>
<tr><th>Approach</th><th>Gradient flow</th><th>Memory</th><th>Khi nào dùng</th></tr>
</thead>
<tbody>
<tr><td><code>torch.no_grad()</code></td><td>Không tính graph</td><td>Tiết kiệm nhất</td><td>Inference, frozen features</td></tr>
<tr><td><code>.detach()</code></td><td>Cắt tại điểm detach</td><td>Tốn hơn</td><td>Khi cần partial gradient flow</td></tr>
<tr><td>Freeze params</td><td>Không update weights</td><td>Vẫn build graph</td><td>Fine-tuning rõ ràng</td></tr>
</tbody>
</table>
</details>

<h2 id="ket-luan">8. Kết luận</h2>

<p>Bài 1 đã trang bị cho bạn toàn bộ nền tảng PyTorch cần thiết cho khóa NVIDIA DLI Generative AI. Hãy chắc chắn bạn có thể:</p>

<ul>
<li>Viết <strong>training loop</strong> hoàn chỉnh mà không cần nhìn tài liệu</li>
<li>Tạo <strong>nn.Module</strong> class với <code>__init__</code> và <code>forward</code></li>
<li>Tính <strong>tensor shapes</strong> qua từng layer</li>
<li>Phân biệt <strong>GroupNorm vs BatchNorm</strong> — đặc biệt quan trọng cho Diffusion Models</li>
<li>Debug các lỗi phổ biến: thiếu <code>zero_grad()</code>, device mismatch, gradient issues</li>
</ul>

<p>Bài tiếp theo: <strong>Bài 2 — Sequence Models & Attention Mechanism</strong> — nền tảng cho Transformers và LLMs.</p>
