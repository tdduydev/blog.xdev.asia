---
id: 019c9619-nv01-p1-l01
title: 'Lesson 1: PyTorch & Neural Network Fundamentals'
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
  title: 'NVIDIA DLI Exam Prep — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="gioi-thieu">1. Introduction</h2>

<p>The first lesson in the <strong>NVIDIA DLI — Generative AI</strong> exam prep series will equip you with a solid <strong>PyTorch</strong> foundation. This is the primary framework used throughout the entire DLI course, from <strong>Diffusion Models</strong> to <strong>Large Language Models (LLMs)</strong>.</p>

<p>In the NVIDIA DLI assessment, you will write code directly — not multiple-choice questions. Therefore, mastering the basic patterns of PyTorch is a prerequisite.</p>

<blockquote><p><strong>Exam tip:</strong> The NVIDIA DLI assessment requires you to write and debug PyTorch code directly. Make sure you can write a <strong>training loop</strong>, <strong>nn.Module</strong>, and perform <strong>tensor</strong> operations without referring to documentation.</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai1-neural-network-architecture.webp" alt="Deep Neural Network Architecture — Input Layer, Hidden Layers, Output Layer, Backpropagation" loading="lazy" /><figcaption>Deep Neural Network Architecture — Input Layer, Hidden Layers, Output Layer, Backpropagation</figcaption></figure>

<h2 id="pytorch-tensors-autograd">2. PyTorch Tensors & Autograd</h2>

<h3 id="tensor-basics">2.1 Tensor Basics</h3>

<p><strong>Tensor</strong> is the core data structure of PyTorch — similar to NumPy arrays but capable of running on <strong>GPU</strong> and supporting <strong>automatic differentiation</strong>.</p>

<pre><code class="language-python">import torch

# Create tensor from list
x = torch.tensor([1.0, 2.0, 3.0])

# Create tensor with specific shape
zeros = torch.zeros(3, 4)          # shape: (3, 4)
ones = torch.ones(2, 3, 4)         # shape: (2, 3, 4)
rand = torch.randn(64, 3, 32, 32)  # batch of 64 RGB 32x32 images

# Check shape and dtype
print(rand.shape)   # torch.Size([64, 3, 32, 32])
print(rand.dtype)   # torch.float32
print(rand.device)  # cpu
</code></pre>

<h3 id="tensor-operations">2.2 Tensor Operations & Broadcasting</h3>

<p>PyTorch supports <strong>broadcasting</strong> similar to NumPy — allowing operations between tensors with different shapes.</p>

<pre><code class="language-python"># Reshape operations
x = torch.randn(2, 3, 4)
y = x.view(2, 12)        # reshape to (2, 12)
z = x.permute(0, 2, 1)   # swap dims: (2, 4, 3)
w = x.unsqueeze(0)        # add dim: (1, 2, 3, 4)

# Matrix multiplication
a = torch.randn(3, 4)
b = torch.randn(4, 5)
c = a @ b                 # shape: (3, 5)
# or: c = torch.matmul(a, b)

# Broadcasting
x = torch.randn(64, 256)  # (batch, features)
bias = torch.randn(256)   # (features,)
result = x + bias          # bias is broadcast: (64, 256)
</code></pre>

<table>
<thead>
<tr><th>Operation</th><th>Syntax</th><th>Notes</th></tr>
</thead>
<tbody>
<tr><td>Reshape</td><td><code>x.view()</code> / <code>x.reshape()</code></td><td><code>view</code> requires contiguous memory</td></tr>
<tr><td>Transpose</td><td><code>x.permute()</code> / <code>x.T</code></td><td><code>permute</code> is more flexible for multiple dims</td></tr>
<tr><td>Add dim</td><td><code>x.unsqueeze(dim)</code></td><td>Commonly used to prepare for broadcasting</td></tr>
<tr><td>Remove dim</td><td><code>x.squeeze(dim)</code></td><td>Removes dim with size = 1</td></tr>
<tr><td>Matrix mul</td><td><code>a @ b</code></td><td>Equivalent to <code>torch.matmul</code></td></tr>
<tr><td>Concat</td><td><code>torch.cat([a, b], dim=0)</code></td><td>Concatenate along specified dim</td></tr>
</tbody>
</table>

<h3 id="autograd">2.3 Autograd — Automatic Differentiation</h3>

<p><strong>Autograd</strong> is PyTorch's automatic gradient computation system. When you set <code>requires_grad=True</code>, PyTorch tracks all operations on that tensor and builds a <strong>computational graph</strong>.</p>

<pre><code class="language-python"># Basic autograd
x = torch.tensor([2.0, 3.0], requires_grad=True)
y = x ** 2 + 3 * x       # y = x² + 3x
loss = y.sum()            # scalar output
loss.backward()           # compute gradient

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

<blockquote><p><strong>Exam tip:</strong> In the DLI assessment, you may encounter the error "trying to backward through the graph a second time". Solution: use <code>loss.backward(retain_graph=True)</code> or recompute the forward pass. This is a very common error during the assessment.</p></blockquote>

<h2 id="nn-module">3. nn.Module & Building Networks</h2>

<h3 id="nn-module-pattern">3.1 nn.Module Pattern</h3>

<p>Every neural network in PyTorch inherits from <code>nn.Module</code>. This is a pattern you must memorize:</p>

<pre><code class="language-python">import torch.nn as nn

class SimpleNet(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super().__init__()  # MUST call super().__init__()
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_dim, output_dim)

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x

# Usage
model = SimpleNet(784, 256, 10)
x = torch.randn(32, 784)  # batch of 32
output = model(x)          # shape: (32, 10)
</code></pre>

<h3 id="common-layers">3.2 Common Layers</h3>

<table>
<thead>
<tr><th>Layer</th><th>Purpose</th><th>Key Params</th></tr>
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

<p>For simple models, you can use <code>nn.Sequential</code> instead of creating a class:</p>

<pre><code class="language-python"># Quick approach with nn.Sequential
model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(256, 128),
    nn.ReLU(),
    nn.Linear(128, 10)
)

# Inspect model
print(model)
# Count parameters
total_params = sum(p.numel() for p in model.parameters())
print(f"Total params: {total_params:,}")
</code></pre>

<h3 id="mlp-mnist">3.4 Code: MLP for MNIST</h3>

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
<tr><th>Loss Function</th><th>Use Case</th><th>Input shape</th></tr>
</thead>
<tbody>
<tr><td><code>nn.CrossEntropyLoss()</code></td><td>Multi-class classification</td><td>logits (B, C), labels (B,)</td></tr>
<tr><td><code>nn.MSELoss()</code></td><td>Regression, diffusion noise prediction</td><td>(B, *) vs (B, *)</td></tr>
<tr><td><code>nn.BCEWithLogitsLoss()</code></td><td>Binary / multi-label classification</td><td>logits (B, C), labels (B, C)</td></tr>
<tr><td><code>nn.L1Loss()</code></td><td>Regression (robust to outliers)</td><td>(B, *) vs (B, *)</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> <code>nn.CrossEntropyLoss</code> already includes <strong>softmax</strong> internally — do NOT add softmax to the output layer. This is a mistake many people make in the assessment. <code>nn.MSELoss</code> will be very important when you learn <strong>Diffusion Models</strong> (predict noise).</p></blockquote>

<h3 id="optimizers">4.2 Optimizers</h3>

<pre><code class="language-python"># SGD — basic, manually manage learning rate
optimizer = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)

# Adam — most popular, adaptive learning rate
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

# AdamW — Adam + proper weight decay (used for Transformers)
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4, weight_decay=0.01)
</code></pre>

<table>
<thead>
<tr><th>Optimizer</th><th>When to Use</th><th>Characteristics</th></tr>
</thead>
<tbody>
<tr><td><strong>SGD</strong></td><td>CNNs, when fine-grained control is needed</td><td>Requires careful lr tuning, add momentum</td></tr>
<tr><td><strong>Adam</strong></td><td>Default for most tasks</td><td>Fast convergence, minimal tuning needed</td></tr>
<tr><td><strong>AdamW</strong></td><td>Transformers, LLMs, Diffusion</td><td>Decoupled weight decay, more correct than Adam</td></tr>
</tbody>
</table>

<h3 id="full-training-loop">4.3 Full Training Loop</h3>

<p>This is the most important pattern — you must be able to write a complete training loop in the assessment:</p>

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
    model.train()  # ENABLE training mode (dropout, batchnorm active)
    total_loss = 0

    for batch_idx, (images, labels) in enumerate(train_loader):
        images, labels = images.to(device), labels.to(device)

        # Forward pass
        outputs = model(images)
        loss = criterion(outputs, labels)

        # Backward pass
        optimizer.zero_grad()  # IMPORTANT: reset gradients
        loss.backward()        # compute gradients
        optimizer.step()       # update weights

        total_loss += loss.item()

    avg_loss = total_loss / len(train_loader)
    print(f"Epoch [{epoch+1}/{num_epochs}], Loss: {avg_loss:.4f}")

# Evaluation
model.eval()  # DISABLE dropout, batchnorm uses running stats
with torch.no_grad():  # DO NOT compute gradients → save memory
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

<blockquote><p><strong>Exam tip:</strong> The order <code>zero_grad() → backward() → step()</code> is MANDATORY. Forgetting <code>zero_grad()</code> will cause gradients to accumulate across batches — this is bug #1 in the DLI assessment. Always remember <code>model.train()</code> before training and <code>model.eval()</code> + <code>torch.no_grad()</code> before evaluation.</p></blockquote>

<h3 id="gpu-acceleration">4.4 GPU Acceleration</h3>

<pre><code class="language-python"># Check GPU
print(torch.cuda.is_available())        # True/False
print(torch.cuda.device_count())        # Number of GPUs
print(torch.cuda.get_device_name(0))    # GPU name

# Move model and data to GPU
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)

# IN training loop — data must also be on the same device
images = images.to(device)
labels = labels.to(device)
</code></pre>

<blockquote><p><strong>Exam tip:</strong> Common error: model is on GPU but data is still on CPU (or vice versa). PyTorch will throw <em>"Expected all tensors to be on the same device"</em>. Always ensure model and data are on the same <code>device</code>.</p></blockquote>

<h2 id="cnn-architecture">5. CNN Architecture</h2>

<h3 id="conv-layers">5.1 Convolutional Layers</h3>

<p><strong>Convolution</strong> slides a <strong>kernel (filter)</strong> across the input image to extract features. Each kernel detects a specific pattern (edges, textures, shapes).</p>

<pre><code class="language-python"># Basic Conv2d
conv = nn.Conv2d(
    in_channels=3,    # RGB input
    out_channels=32,  # 32 filters → 32 feature maps
    kernel_size=3,    # 3×3 kernel
    stride=1,         # step size
    padding=1          # zero-padding to preserve spatial size
)

# Output shape calculation:
# H_out = (H_in + 2*padding - kernel_size) / stride + 1
# Example: (32 + 2*1 - 3) / 1 + 1 = 32 (size preserved)
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

<p><strong>Pooling</strong> reduces spatial dimensions, helping reduce computation and increase receptive field:</p>

<table>
<thead>
<tr><th>Pooling</th><th>How It Works</th><th>When to Use</th></tr>
</thead>
<tbody>
<tr><td><code>nn.MaxPool2d(2)</code></td><td>Takes max value within each 2×2 window</td><td>Feature detection, standard CNNs</td></tr>
<tr><td><code>nn.AvgPool2d(2)</code></td><td>Takes average within each 2×2 window</td><td>Smoother features</td></tr>
<tr><td><code>nn.AdaptiveAvgPool2d((1,1))</code></td><td>Pools to fixed size regardless of input</td><td>Before fully-connected layer</td></tr>
</tbody>
</table>

<h3 id="normalization">5.3 Batch Normalization vs Group Normalization</h3>

<p>This knowledge is <strong>extremely important</strong> for the <strong>Diffusion Models</strong> section in later lessons.</p>

<table>
<thead>
<tr><th>Property</th><th>BatchNorm</th><th>GroupNorm</th></tr>
</thead>
<tbody>
<tr><td>Normalizes across</td><td>Batch dimension (N)</td><td>Channel groups (C/G)</td></tr>
<tr><td>Depends on batch size</td><td>Yes — noisy with small batches</td><td>No — works well with any batch size</td></tr>
<tr><td>Training vs Inference</td><td>Different (running stats)</td><td>Same</td></tr>
<tr><td>Commonly used in</td><td>Traditional CNNs (ResNet)</td><td><strong>Diffusion Models</strong>, small groups</td></tr>
<tr><td>Syntax</td><td><code>nn.BatchNorm2d(C)</code></td><td><code>nn.GroupNorm(G, C)</code></td></tr>
</tbody>
</table>

<pre><code class="language-python"># BatchNorm — normalize across batch
bn = nn.BatchNorm2d(64)         # 64 channels

# GroupNorm — normalize within groups of channels
gn = nn.GroupNorm(
    num_groups=32,    # split 64 channels into 32 groups (2 ch/group)
    num_channels=64
)

# Both accept input shape: (B, C, H, W)
x = torch.randn(8, 64, 16, 16)
print(bn(x).shape)  # (8, 64, 16, 16)
print(gn(x).shape)  # (8, 64, 16, 16)
</code></pre>

<pre><code class="language-text">BatchNorm vs GroupNorm:

BatchNorm: normalize along ↓ (batch axis)    GroupNorm: normalize along → (channel groups)
┌────────────────────────┐                    ┌────────────────────────┐
│  Sample 1: [c1 c2 c3 c4]│                    │  Sample 1: [c1 c2│c3 c4]│
│  Sample 2: [c1 c2 c3 c4]│  ← normalize      │            group1│group2 │ ← normalize
│  Sample 3: [c1 c2 c3 c4]│    each column     │                  │       │   each group
│  Sample 4: [c1 c2 c3 c4]│                    │  Sample 2: [c1 c2│c3 c4]│
└────────────────────────┘                    └────────────────────────┘

→ Diffusion Models use GroupNorm because batch_size is usually small
  and noise levels vary → BatchNorm statistics are unstable
</code></pre>

<blockquote><p><strong>Exam tip:</strong> When building <strong>U-Net for Diffusion Models</strong> (later lessons), you will always use <strong>GroupNorm</strong> instead of BatchNorm. Reason: diffusion training typically uses small batch sizes, and each sample has a different noise level → BatchNorm statistics become noisy. Remember the rule: <strong>Diffusion = GroupNorm</strong>.</p></blockquote>

<h3 id="cnn-code">5.4 Code: Simple CNN for Image Classification</h3>

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
<tr><th>Concept</th><th>Code Pattern</th><th>Remember</th></tr>
</thead>
<tbody>
<tr><td>Create model</td><td>class MyModel(nn.Module)</td><td>Always call <code>super().__init__()</code></td></tr>
<tr><td>Forward pass</td><td><code>output = model(x)</code></td><td>Call model as function, don't call <code>.forward()</code> directly</td></tr>
<tr><td>Training mode</td><td><code>model.train()</code></td><td>Enables dropout, batchnorm training stats</td></tr>
<tr><td>Eval mode</td><td><code>model.eval()</code> + <code>torch.no_grad()</code></td><td>Disables dropout, uses running stats</td></tr>
<tr><td>Training loop</td><td>zero_grad → forward → loss → backward → step</td><td>Order is CRITICAL</td></tr>
<tr><td>GPU transfer</td><td><code>.to(device)</code></td><td>Both model AND data</td></tr>
<tr><td>Classification loss</td><td><code>nn.CrossEntropyLoss()</code></td><td>Already includes softmax</td></tr>
<tr><td>Diffusion loss</td><td><code>nn.MSELoss()</code></td><td>Predict noise, compute MSE</td></tr>
<tr><td>Diffusion norm</td><td><code>nn.GroupNorm(G, C)</code></td><td>Independent of batch size</td></tr>
<tr><td>Transformer optimizer</td><td><code>AdamW</code></td><td>Proper weight decay</td></tr>
</tbody>
</table>

<h2 id="practice-questions">7. Practice Questions</h2>

<p>The following questions simulate the NVIDIA DLI coding assessment style — you need to read code, find bugs, and write complete code.</p>

<h3 id="q1">Q1: Fix the broken training loop</h3>

<p>The code below has a bug that prevents the model from converging. Find and fix the error:</p>

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
<summary>Show Answer Q1</summary>

<p><strong>Bug:</strong> Missing <code>optimizer.zero_grad()</code> before <code>loss.backward()</code>. Not resetting gradients causes them to accumulate across batches, preventing the model from converging or converging incorrectly.</p>

<pre><code class="language-python">for epoch in range(10):
    model.train()
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        outputs = model(images)
        loss = criterion(outputs, labels)

        optimizer.zero_grad()  # ← ADD THIS LINE
        loss.backward()
        optimizer.step()
</code></pre>

<p>Standard order: <code>zero_grad() → backward() → step()</code>. In practice, <code>zero_grad()</code> can be placed before <code>forward</code> as well, but it MUST come before <code>backward()</code>.</p>
</details>

<h3 id="q2">Q2: Implement a 3-layer CNN</h3>

<p>Write a CNN class that takes RGB images (3, 64, 64) and outputs 5 classes. Requirements:</p>
<ul>
<li>3 convolutional blocks, each block: Conv2d → BatchNorm2d → ReLU → MaxPool2d(2)</li>
<li>Channels: 3 → 32 → 64 → 128</li>
<li>End with AdaptiveAvgPool2d + Linear</li>
</ul>

<details>
<summary>Show Answer Q2</summary>

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

<p>Given the model below and input shape <code>(8, 1, 32, 32)</code>. Record the shape at each step:</p>

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
<summary>Show Answer Q3</summary>

<p>Output size formula: <code>H_out = (H_in + 2*padding - kernel_size) / stride + 1</code></p>

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

<p><strong>Key insight:</strong> <code>AdaptiveAvgPool2d</code> always outputs a fixed size regardless of input — very useful when input size can vary.</p>
</details>

<h3 id="q4">Q4: GroupNorm vs BatchNorm — when to use which?</h3>

<p>You are building a <strong>U-Net for a Diffusion Model</strong>. Each block has Conv2d → ??? → SiLU. Which normalization do you choose and why? Write code for one block.</p>

<details>
<summary>Show Answer Q4</summary>

<p><strong>Choose GroupNorm.</strong> Reasons:</p>
<ol>
<li><strong>Small batch size:</strong> Diffusion training typically uses batch size 1-8 because images are large → BatchNorm statistics are too noisy</li>
<li><strong>Different noise levels:</strong> Each sample in the batch has a different timestep (noise level) → normalizing across the batch is not appropriate</li>
<li><strong>Inference consistency:</strong> GroupNorm behaves the same during training and inference</li>
</ol>

<pre><code class="language-python">class DiffusionBlock(nn.Module):
    def __init__(self, in_channels, out_channels, num_groups=32):
        super().__init__()
        self.conv = nn.Conv2d(in_channels, out_channels,
                              kernel_size=3, padding=1)
        self.norm = nn.GroupNorm(num_groups, out_channels)
        self.act = nn.SiLU()  # SiLU is more common than ReLU in diffusion

    def forward(self, x):
        x = self.conv(x)
        x = self.norm(x)
        x = self.act(x)
        return x

# Example usage
block = DiffusionBlock(64, 128, num_groups=32)
x = torch.randn(2, 64, 32, 32)  # batch_size = 2, small!
print(block(x).shape)  # (2, 128, 32, 32)
</code></pre>

<p><strong>Rule:</strong> In all Diffusion architectures (U-Net, DiT), always use <code>nn.GroupNorm</code>. Activation is typically <code>nn.SiLU()</code> (Swish) instead of ReLU.</p>
</details>

<h3 id="q5">Q5: Debug gradient issue — detach() vs torch.no_grad()</h3>

<p>What's wrong with the code below? The output of <code>feature_extractor</code> should not have gradients (freeze backbone), but <code>classifier</code> still needs to be trained.</p>

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
    loss.backward()    # ← Is there a problem?
    optimizer.step()
</code></pre>

<details>
<summary>Show Answer Q5</summary>

<p><strong>Issue:</strong> This code actually <strong>works correctly</strong> for this case! <code>torch.no_grad()</code> prevents gradient computation for <code>feature_extractor</code>, and the <code>features</code> tensor will not have <code>requires_grad</code>. Gradients still flow through <code>classifier</code> normally.</p>

<p><strong>However</strong>, there are 2 approaches and you need to understand the difference:</p>

<pre><code class="language-python"># Approach 1: torch.no_grad() — DO NOT compute gradients, save memory
with torch.no_grad():
    features = feature_extractor(images)
# features.requires_grad = False
# Gradient DOES NOT flow back through feature_extractor
# ✅ Use when you want to fully freeze and save GPU memory

# Approach 2: .detach() — detach tensor from computational graph
features = feature_extractor(images).detach()
# features.requires_grad = False
# Feature extractor STILL computes forward (memory used for graph)
# but gradient is cut at .detach()
# ⚠️ Less efficient because graph is built then cut

# Approach 3: Freeze parameters — most common approach
for param in feature_extractor.parameters():
    param.requires_grad = False
# ✅ Most explicit, commonly used in fine-tuning
</code></pre>

<table>
<thead>
<tr><th>Approach</th><th>Gradient flow</th><th>Memory</th><th>When to use</th></tr>
</thead>
<tbody>
<tr><td><code>torch.no_grad()</code></td><td>No graph computed</td><td>Most efficient</td><td>Inference, frozen features</td></tr>
<tr><td><code>.detach()</code></td><td>Cut at detach point</td><td>More expensive</td><td>When partial gradient flow is needed</td></tr>
<tr><td>Freeze params</td><td>Weights not updated</td><td>Still builds graph</td><td>Explicit fine-tuning</td></tr>
</tbody>
</table>
</details>

<h2 id="ket-luan">8. Conclusion</h2>

<p>Lesson 1 has equipped you with all the PyTorch fundamentals needed for the NVIDIA DLI Generative AI course. Make sure you can:</p>

<ul>
<li>Write a complete <strong>training loop</strong> without referring to documentation</li>
<li>Create an <strong>nn.Module</strong> class with <code>__init__</code> and <code>forward</code></li>
<li>Trace <strong>tensor shapes</strong> through each layer</li>
<li>Distinguish <strong>GroupNorm vs BatchNorm</strong> — especially important for Diffusion Models</li>
<li>Debug common errors: missing <code>zero_grad()</code>, device mismatch, gradient issues</li>
</ul>

<p>Next lesson: <strong>Lesson 2 — Transformer Architecture & Attention Mechanism</strong> — the foundation for Transformers and LLMs.</p>
