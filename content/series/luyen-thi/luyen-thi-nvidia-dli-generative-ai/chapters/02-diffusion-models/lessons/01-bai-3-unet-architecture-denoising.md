---
id: 019c9619-nv01-p2-l03
title: 'Bài 3: U-Net Architecture & Denoising Basics'
slug: bai-3-unet-architecture-denoising
description: >-
  U-Net encoder-decoder with skip connections.
  Build U-Net from scratch in PyTorch. Train denoiser model.
  Group Normalization, GELU activation, Rearrange Pooling.
  Sinusoidal Position Embeddings for timestep encoding.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 3
section_title: "Part 2: Generative AI with Diffusion Models"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'Luyện thi NVIDIA DLI — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="gioi-thieu">1. Giới thiệu: Tại sao U-Net là trái tim của Diffusion Models?</h2>

<p>Trong bài trước, bạn đã hiểu <strong>forward process</strong> thêm noise vào ảnh theo từng timestep. Bây giờ câu hỏi là: mô hình nào sẽ học cách <strong>khử noise</strong> (denoise) — tức là đảo ngược quá trình đó? Câu trả lời là <strong>U-Net</strong>.</p>

<p><strong>U-Net</strong> ban đầu được thiết kế cho bài toán <strong>image segmentation</strong> trong y khoa (2015, Ronneberger et al.). Kiến trúc đặc biệt của nó — encoder-decoder với <strong>skip connections</strong> — giúp bảo toàn chi tiết spatial trong khi học được features ở nhiều mức độ trừu tượng. Đây chính xác là điều diffusion models cần.</p>

<blockquote><p><strong>Exam tip:</strong> Trong assessment, bạn sẽ phải implement U-Net từ đầu. Hiểu rõ chiều tensor qua mỗi layer là chìa khóa. NVIDIA DLI yêu cầu bạn viết code chạy đúng, không chỉ hiểu lý thuyết.</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai3-unet-architecture.webp" alt="Kiến trúc U-Net — Encoder-Decoder với Skip Connections cho Image Denoising" loading="lazy" /><figcaption>Kiến trúc U-Net — Encoder-Decoder với Skip Connections cho Image Denoising</figcaption></figure>

<h2 id="unet-architecture">2. U-Net Architecture: Encoder-Decoder với Skip Connections</h2>

<h3 id="tong-quan-kien-truc">2.1 Tổng quan kiến trúc</h3>

<p>U-Net có hình chữ "U" với 3 phần chính:</p>

<ul>
<li><strong>Encoder (Contracting Path)</strong>: giảm spatial resolution, tăng số channels — học features trừu tượng cao</li>
<li><strong>Bottleneck</strong>: spatial nhỏ nhất, channels lớn nhất — nắm bắt global context</li>
<li><strong>Decoder (Expanding Path)</strong>: tăng spatial resolution, giảm số channels — khôi phục chi tiết</li>
<li><strong>Skip Connections</strong>: nối trực tiếp encoder features sang decoder tương ứng — bảo toàn fine-grained details</li>
</ul>

<pre><code class="language-text">
U-Net Architecture cho Diffusion (input 64×64×1)
═══════════════════════════════════════════════

          ENCODER                              DECODER
     (Contracting Path)                   (Expanding Path)

  ┌─────────────────┐                 ┌─────────────────┐
  │  64 × 64 × 1    │   Input Image   │  64 × 64 × 1    │  Output (denoised)
  └────────┬────────┘                 └────────▲────────┘
           │                                    │
           ▼                                    │
  ┌─────────────────┐  skip connection  ┌─────────────────┐
  │  64 × 64 × 64   │ ───────────────► │  64 × 64 × 64   │  UpBlock + Concat
  │  Conv→GN→GELU   │   (concatenate)   │  Conv→GN→GELU   │
  └────────┬────────┘                 └────────▲────────┘
           │ Downsample                        │ Upsample
           ▼                                    │
  ┌─────────────────┐  skip connection  ┌─────────────────┐
  │  32 × 32 × 128  │ ───────────────► │  32 × 32 × 128  │  UpBlock + Concat
  │  Conv→GN→GELU   │   (concatenate)   │  Conv→GN→GELU   │
  └────────┬────────┘                 └────────▲────────┘
           │ Downsample                        │ Upsample
           ▼                                    │
  ┌─────────────────┐  skip connection  ┌─────────────────┐
  │  16 × 16 × 256  │ ───────────────► │  16 × 16 × 256  │  UpBlock + Concat
  │  Conv→GN→GELU   │   (concatenate)   │  Conv→GN→GELU   │
  └────────┬────────┘                 └────────▲────────┘
           │ Downsample                        │ Upsample
           ▼                                    │
  ┌──────────────────────────────────────────────┐
  │              8 × 8 × 512                      │
  │           BOTTLENECK                          │
  │     Conv → GN → GELU → Conv → GN             │
  │  (smallest spatial, largest channels)         │
  └───────────────────────────────────────────────┘

  + Timestep Embedding ──► inject vào MỌI ResidualBlock qua linear projection
</code></pre>

<h3 id="encoder-path">2.2 Encoder Path (Contracting)</h3>

<p>Mỗi level của encoder thực hiện:</p>

<ol>
<li><strong>Convolution</strong>: 3×3 conv với padding=1 (giữ nguyên spatial size)</li>
<li><strong>Group Normalization</strong>: normalize theo groups thay vì batch</li>
<li><strong>GELU Activation</strong>: non-linearity mượt hơn ReLU</li>
<li><strong>Downsample</strong>: giảm spatial resolution đi 2× (có thể dùng stride=2 conv hoặc Rearrange Pooling)</li>
</ol>

<p>Qua mỗi level, số <strong>channels tăng gấp đôi</strong> và <strong>spatial giảm đi một nửa</strong>. Ví dụ:</p>

<table>
<thead>
<tr><th>Level</th><th>Input Shape</th><th>Output Shape</th><th>Operation</th></tr>
</thead>
<tbody>
<tr><td>0</td><td>B × 1 × 64 × 64</td><td>B × 64 × 64 × 64</td><td>Initial Conv</td></tr>
<tr><td>1</td><td>B × 64 × 64 × 64</td><td>B × 128 × 32 × 32</td><td>ResBlock → Down</td></tr>
<tr><td>2</td><td>B × 128 × 32 × 32</td><td>B × 256 × 16 × 16</td><td>ResBlock → Down</td></tr>
<tr><td>3</td><td>B × 256 × 16 × 16</td><td>B × 512 × 8 × 8</td><td>ResBlock → Down</td></tr>
</tbody>
</table>

<h3 id="decoder-path">2.3 Decoder Path (Expanding)</h3>

<p>Ngược lại với encoder, decoder <strong>tăng spatial</strong> và <strong>giảm channels</strong>:</p>

<ol>
<li><strong>Upsample</strong>: tăng spatial resolution lên 2× (thường dùng <code>nn.Upsample</code> hoặc <code>nn.ConvTranspose2d</code>)</li>
<li><strong>Concatenate</strong> với skip connection từ encoder cùng level</li>
<li><strong>Convolution → GroupNorm → GELU</strong>: xử lý features concat</li>
</ol>

<blockquote><p><strong>Exam tip:</strong> Khi concatenate skip connection, số channels sẽ <strong>gấp đôi</strong> tạm thời. Ví dụ: upsample output có 256 channels + skip có 256 channels = 512 channels đầu vào conv. Đây là lỗi phổ biến khi implement — chú ý <code>in_channels</code> của conv sau concat!</p></blockquote>

<h3 id="skip-connections">2.4 Skip Connections — Tại sao quan trọng?</h3>

<p>Không có skip connections, decoder phải "đoán" lại tất cả chi tiết spatial chỉ từ bottleneck 8×8 — gần như không thể. Skip connections cho phép:</p>

<ul>
<li><strong>Gradient flow</strong>: gradient chảy trực tiếp từ loss về encoder layers sâu — training dễ hơn</li>
<li><strong>Detail preservation</strong>: encoder ở level cao giữ edges, textures — decoder dùng lại thay vì phải học lại</li>
<li><strong>Multi-scale features</strong>: decoder nhận cả high-level (từ bottleneck) và low-level (từ skip) features</li>
</ul>

<h2 id="key-components">3. Key Components: GroupNorm, GELU, Rearrange Pooling</h2>

<h3 id="group-normalization">3.1 Group Normalization</h3>

<p>Trong diffusion models, <strong>batch size thường rất nhỏ</strong> (4-8) vì mỗi image chiếm nhiều GPU memory. <strong>Batch Normalization</strong> hoạt động kém với small batch vì statistics (mean, variance) tính trên batch không ổn định.</p>

<p><strong>Group Normalization</strong> giải quyết bằng cách chia channels thành <strong>groups</strong> và normalize <strong>trong mỗi group, cho từng sample riêng biệt</strong> — không phụ thuộc batch size.</p>

<pre><code class="language-text">
Group Normalization vs Batch Normalization
══════════════════════════════════════════

Batch Normalization:              Group Normalization:
  normalize theo N (batch)          normalize theo group trong C

  ┌───┬───┬───┬───┐               ┌───┬───┬───┬───┐
  │ N │   │   │   │               │   │   │   │   │  N (batch)
  ├───┼───┼───┼───┤               ├───┼───┼───┼───┤
  │   │   │   │   │  C            │ G1│ G1│ G2│ G2│  C (channels)
  ├───┼───┼───┼───┤  (channels)   ├───┼───┼───┼───┤  chia thành groups
  │   │   │   │   │               │ G1│ G1│ G2│ G2│
  ├───┼───┼───┼───┤               ├───┼───┼───┼───┤
  │   │   │   │   │  H×W          │   │   │   │   │  H×W
  └───┴───┴───┴───┘               └───┴───┴───┴───┘
     ▲                                 ▲
     normalize cột (across N)          normalize block (within group)
     ⚠ batch nhỏ → unstable           ✓ independent of batch size
</code></pre>

<pre><code class="language-python">
import torch.nn as nn

# GroupNorm: chia 64 channels thành 8 groups (mỗi group 8 channels)
norm = nn.GroupNorm(num_groups=8, num_channels=64)

# Với input shape (B, 64, 32, 32):
# - Chia 64 channels thành 8 groups, mỗi group 8 channels
# - Tính mean, var trên (8, 32, 32) = 8192 elements per group per sample
# - Normalize riêng cho mỗi sample, mỗi group

x = torch.randn(4, 64, 32, 32)
out = norm(x)  # shape: (4, 64, 32, 32) — không đổi shape
</code></pre>

<table>
<thead>
<tr><th>Feature</th><th>BatchNorm</th><th>GroupNorm</th><th>LayerNorm</th><th>InstanceNorm</th></tr>
</thead>
<tbody>
<tr><td>Normalize across</td><td>Batch (N)</td><td>Channel groups</td><td>All channels</td><td>Each channel</td></tr>
<tr><td>Batch size dependency</td><td>Yes ⚠</td><td>No ✓</td><td>No ✓</td><td>No ✓</td></tr>
<tr><td>Small batch performance</td><td>Poor</td><td>Good</td><td>OK</td><td>OK</td></tr>
<tr><td>Use case</td><td>Classification</td><td>Diffusion, Detection</td><td>Transformers (NLP)</td><td>Style Transfer</td></tr>
<tr><td>PyTorch API</td><td><code>nn.BatchNorm2d(C)</code></td><td><code>nn.GroupNorm(G, C)</code></td><td><code>nn.LayerNorm(shape)</code></td><td><code>nn.InstanceNorm2d(C)</code></td></tr>
</tbody>
</table>

<h3 id="gelu-activation">3.2 GELU Activation</h3>

<p><strong>GELU</strong> (Gaussian Error Linear Unit) là activation function tiêu chuẩn trong các mô hình hiện đại (Transformers, Diffusion Models). Khác với ReLU "cứng" (cắt âm về 0), GELU mượt và cho phép một phần giá trị âm "rò rỉ" qua.</p>

<p>Công thức: <strong>GELU(x) = x · Φ(x)</strong>, trong đó Φ(x) là CDF của standard normal distribution.</p>

<pre><code class="language-text">
Activation Functions Comparison
═══════════════════════════════

 Output                              Output
   │     ReLU                          │     GELU
   │      ╱                            │      ╱
   │     ╱                             │    ╱
   │    ╱                              │  ╱
───┼───╱────── Input            ───┼──╱─────── Input
   │  ╱                              ╱│
   │ ╱                              ╱ │
   │╱  (hard cutoff at 0)         ╱  │  (smooth curve, allows
   │                             ╱    │   small negative values)

 ReLU(x) = max(0, x)           GELU(x) = x · Φ(x)
 ⚠ Dead neurons problem         ✓ Smoother gradient flow
 ⚠ Not differentiable at 0      ✓ Better for deep networks
</code></pre>

<pre><code class="language-python">
import torch.nn as nn

# Cách 1: dùng module
activation = nn.GELU()
out = activation(x)

# Cách 2: dùng functional
import torch.nn.functional as F
out = F.gelu(x)

# Cách 3: approximate (nhanh hơn, DLI course dùng cách này)
activation = nn.GELU(approximate='tanh')
</code></pre>

<h3 id="rearrange-pooling">3.3 Rearrange Pooling (Space-to-Channel)</h3>

<p><strong>Rearrange Pooling</strong> là kỹ thuật downsample thay thế cho MaxPool/AvgPool. Thay vì loại bỏ thông tin (MaxPool chọn max, AvgPool lấy trung bình), Rearrange "gấp" spatial dimensions vào channel dimension — giữ lại <strong>toàn bộ</strong> thông tin.</p>

<pre><code class="language-text">
Rearrange Pooling: (B, C, 2H, 2W) → (B, 4C, H, W)
════════════════════════════════════════════════════

Input: (B, C, 4, 4)                   Output: (B, 4C, 2, 2)

Channel c:                             4 channels (mỗi cái là 1 "vị trí"):
┌───┬───┬───┬───┐                     Channel c_0:    Channel c_1:
│ a │ b │ e │ f │                     ┌───┬───┐       ┌───┬───┐
├───┼───┼───┼───┤                     │ a │ e │       │ b │ f │
│ c │ d │ g │ h │      ────►         ├───┼───┤       ├───┼───┤
├───┼───┼───┼───┤   Rearrange        │ i │ m │       │ j │ n │
│ i │ j │ m │ n │                     └───┴───┘       └───┴───┘
├───┼───┼───┼───┤
│ k │ l │ o │ p │                     Channel c_2:    Channel c_3:
└───┴───┴───┴───┘                     ┌───┬───┐       ┌───┬───┐
                                       │ c │ g │       │ d │ h │
Spatial: 4×4, Channels: C             ├───┼───┤       ├───┼───┤
                                       │ k │ o │       │ l │ p │
                                       └───┴───┘       └───┴───┘

                                       Spatial: 2×2, Channels: 4C
                                       ✓ KHÔNG mất thông tin!
</code></pre>

<pre><code class="language-python">
from einops import rearrange

def rearrange_downsample(x):
    """Downsample by rearranging spatial dims into channels.
    (B, C, H, W) -> (B, 4C, H/2, W/2)
    """
    return rearrange(x, 'b c (h p1) (w p2) -> b (c p1 p2) h w', p1=2, p2=2)

# Ví dụ:
x = torch.randn(2, 64, 32, 32)
out = rearrange_downsample(x)
print(out.shape)  # torch.Size([2, 256, 16, 16])

# Nếu không dùng einops, dùng PyTorch thuần:
def rearrange_downsample_pure(x):
    B, C, H, W = x.shape
    x = x.reshape(B, C, H // 2, 2, W // 2, 2)
    x = x.permute(0, 1, 3, 5, 2, 4)  # (B, C, 2, 2, H/2, W/2)
    x = x.reshape(B, C * 4, H // 2, W // 2)
    return x
</code></pre>

<table>
<thead>
<tr><th>Downsampling Method</th><th>Information Loss</th><th>Channel Change</th><th>Use in Diffusion</th></tr>
</thead>
<tbody>
<tr><td>MaxPool2d</td><td>High (chỉ giữ max)</td><td>Không đổi</td><td>Ít dùng</td></tr>
<tr><td>AvgPool2d</td><td>Medium (lấy trung bình)</td><td>Không đổi</td><td>Ít dùng</td></tr>
<tr><td>Stride-2 Conv</td><td>Learned (trainable)</td><td>Tuỳ config</td><td>Phổ biến</td></tr>
<tr><td>Rearrange Pooling</td><td>None ✓</td><td>×4</td><td>NVIDIA DLI course ✓</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> NVIDIA DLI sử dụng <strong>Rearrange Pooling</strong> thay vì MaxPool. Trong assessment, bạn có thể cần implement hàm này bằng <code>einops.rearrange</code> hoặc PyTorch thuần (<code>reshape</code> + <code>permute</code>). Nhớ rằng channels tăng <strong>4 lần</strong> khi spatial giảm 2× mỗi chiều.</p></blockquote>

<h2 id="sinusoidal-embeddings">4. Sinusoidal Position Embeddings cho Timestep</h2>

<h3 id="tai-sao-can-timestep">4.1 Tại sao cần Timestep Embedding?</h3>

<p>U-Net cần biết đang ở <strong>timestep nào</strong> trong quá trình diffusion để denoise phù hợp:</p>

<ul>
<li>Timestep lớn (t gần T): ảnh gần như pure noise → model cần khôi phục cấu trúc tổng thể</li>
<li>Timestep nhỏ (t gần 0): ảnh gần sạch → model chỉ cần tinh chỉnh chi tiết nhỏ</li>
</ul>

<p>Ta chuyển integer timestep <strong>t</strong> thành một <strong>continuous embedding vector</strong> có chiều dài <code>embed_dim</code>, inject vào mọi layer của U-Net.</p>

<h3 id="sinusoidal-formula">4.2 Công thức Sinusoidal Embedding</h3>

<p>Giống hệt <strong>Positional Encoding</strong> trong Transformer ("Attention Is All You Need"):</p>

<pre><code class="language-text">
PE(t, 2i)   = sin(t / 10000^(2i/d))
PE(t, 2i+1) = cos(t / 10000^(2i/d))

Trong đó:
  t = timestep (integer: 0, 1, 2, ..., T)
  d = embedding dimension (e.g., 128)
  i = index trong embedding vector (0, 1, 2, ..., d/2 - 1)

Ví dụ với d=8:
  PE(t) = [sin(t/1), cos(t/1), sin(t/100), cos(t/100),
           sin(t/10000), cos(t/10000), sin(t/1000000), cos(t/1000000)]
  
  → Low frequency terms (cuối): thay đổi chậm → encode "big picture" timestep
  → High frequency terms (đầu): thay đổi nhanh → encode fine timestep differences
</code></pre>

<h3 id="implement-timestep-embedding">4.3 Implement TimestepEmbedding</h3>

<pre><code class="language-python">
import torch
import torch.nn as nn
import math

class SinusoidalPositionEmbedding(nn.Module):
    """Chuyển integer timestep thành sinusoidal embedding vector."""
    
    def __init__(self, embed_dim):
        super().__init__()
        self.embed_dim = embed_dim
    
    def forward(self, timesteps):
        """
        Args:
            timesteps: (B,) — integer timesteps
        Returns:
            embeddings: (B, embed_dim) — sinusoidal embeddings
        """
        device = timesteps.device
        half_dim = self.embed_dim // 2
        
        # Tính frequencies: 1/10000^(2i/d) cho i = 0, 1, ..., d/2-1
        exponent = torch.arange(half_dim, device=device).float() / half_dim
        freqs = torch.exp(-math.log(10000.0) * exponent)  # shape: (d/2,)
        
        # Nhân timestep với frequencies: (B, 1) * (1, d/2) = (B, d/2)
        args = timesteps[:, None].float() * freqs[None, :]
        
        # Concat sin và cos: (B, d/2) cat (B, d/2) = (B, d)
        embeddings = torch.cat([torch.sin(args), torch.cos(args)], dim=-1)
        
        return embeddings  # shape: (B, embed_dim)


class TimestepMLPEmbedding(nn.Module):
    """Sinusoidal embedding + MLP projection (dùng trong DLI course)."""
    
    def __init__(self, embed_dim, hidden_dim=None):
        super().__init__()
        if hidden_dim is None:
            hidden_dim = embed_dim * 4
        
        self.sinusoidal = SinusoidalPositionEmbedding(embed_dim)
        self.mlp = nn.Sequential(
            nn.Linear(embed_dim, hidden_dim),
            nn.GELU(),
            nn.Linear(hidden_dim, hidden_dim),
        )
    
    def forward(self, timesteps):
        """
        Args:
            timesteps: (B,) — integer timesteps
        Returns:
            (B, hidden_dim) — projected timestep embeddings
        """
        x = self.sinusoidal(timesteps)  # (B, embed_dim)
        x = self.mlp(x)                 # (B, hidden_dim)
        return x
</code></pre>

<h3 id="inject-timestep-unet">4.4 Inject Timestep vào U-Net</h3>

<p>Timestep embedding được inject vào <strong>mỗi ResidualBlock</strong> bằng cách:</p>

<ol>
<li>Project timestep embedding về cùng số channels với feature map (dùng <code>nn.Linear</code>)</li>
<li>Reshape thành <code>(B, C, 1, 1)</code> để broadcast</li>
<li><strong>Cộng</strong> vào feature map sau GroupNorm đầu tiên</li>
</ol>

<pre><code class="language-text">
Timestep Injection Flow
═══════════════════════

timestep t ──► SinusoidalEmbed ──► MLP ──► t_emb (B, hidden_dim)
                                              │
                                    Linear(hidden_dim, C)
                                              │
                                         (B, C, 1, 1)   ← reshape để broadcast
                                              │
Feature Map: ─── Conv ─── GroupNorm ────── (+) ────── GELU ─── Conv ─── ...
                                          add here
</code></pre>

<blockquote><p><strong>Exam tip:</strong> Timestep embedding được <strong>cộng (add)</strong> chứ không phải concatenate vào feature map. Inject xảy ra <strong>sau GroupNorm, trước GELU</strong> trong mỗi ResidualBlock. Đây là pattern cố định trong DLI course.</p></blockquote>

<h2 id="build-unet-from-scratch">5. Build U-Net from Scratch — Step by Step</h2>

<h3 id="residual-block">5.1 ResidualBlock</h3>

<p>Đây là building block cơ bản nhất. Mỗi ResidualBlock gồm 2 lớp conv + GroupNorm + GELU, cộng với <strong>residual connection</strong> và <strong>timestep injection</strong>.</p>

<pre><code class="language-python">
class ResidualBlock(nn.Module):
    """Residual block with timestep embedding injection.
    
    Flow: x → Conv1 → GN1 → (+t_emb) → GELU → Conv2 → GN2 → GELU → (+residual) → out
    """
    
    def __init__(self, in_channels, out_channels, time_emb_dim):
        super().__init__()
        
        # First conv layer
        self.conv1 = nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1)
        self.norm1 = nn.GroupNorm(num_groups=8, num_channels=out_channels)
        
        # Second conv layer
        self.conv2 = nn.Conv2d(out_channels, out_channels, kernel_size=3, padding=1)
        self.norm2 = nn.GroupNorm(num_groups=8, num_channels=out_channels)
        
        # Activation
        self.act = nn.GELU()
        
        # Timestep embedding projection: project to out_channels
        self.time_mlp = nn.Sequential(
            nn.GELU(),
            nn.Linear(time_emb_dim, out_channels),
        )
        
        # Residual connection: nếu in_channels != out_channels, cần 1x1 conv
        if in_channels != out_channels:
            self.residual_conv = nn.Conv2d(in_channels, out_channels, kernel_size=1)
        else:
            self.residual_conv = nn.Identity()
    
    def forward(self, x, t_emb):
        """
        Args:
            x: (B, in_channels, H, W) — input feature map
            t_emb: (B, time_emb_dim) — timestep embedding
        Returns:
            (B, out_channels, H, W)
        """
        residual = self.residual_conv(x)   # (B, out_channels, H, W)
        
        # First layer
        h = self.conv1(x)                   # (B, out_channels, H, W)
        h = self.norm1(h)                   # normalize
        
        # Inject timestep embedding
        t = self.time_mlp(t_emb)            # (B, out_channels)
        t = t[:, :, None, None]             # (B, out_channels, 1, 1) broadcast
        h = h + t                           # add timestep info
        
        h = self.act(h)                     # GELU activation
        
        # Second layer
        h = self.conv2(h)                   # (B, out_channels, H, W)
        h = self.norm2(h)                   # normalize
        h = self.act(h)                     # GELU activation
        
        return h + residual                  # residual connection
</code></pre>

<h3 id="down-block">5.2 DownBlock (Encoder Level)</h3>

<pre><code class="language-python">
class DownBlock(nn.Module):
    """Encoder block: ResidualBlock + Rearrange Downsample."""
    
    def __init__(self, in_channels, out_channels, time_emb_dim):
        super().__init__()
        self.res_block = ResidualBlock(in_channels, out_channels, time_emb_dim)
    
    def downsample(self, x):
        """Rearrange pooling: (B, C, H, W) -> (B, 4C, H/2, W/2)"""
        B, C, H, W = x.shape
        x = x.reshape(B, C, H // 2, 2, W // 2, 2)
        x = x.permute(0, 1, 3, 5, 2, 4).reshape(B, C * 4, H // 2, W // 2)
        return x
    
    def forward(self, x, t_emb):
        """
        Args:
            x: (B, in_channels, H, W)
            t_emb: (B, time_emb_dim)
        Returns:
            skip: (B, out_channels, H, W) — for skip connection
            down: (B, out_channels*4, H/2, W/2) — downsampled for next level
        """
        skip = self.res_block(x, t_emb)    # (B, out_channels, H, W)
        down = self.downsample(skip)         # (B, out_channels*4, H/2, W/2)
        return skip, down
</code></pre>

<h3 id="up-block">5.3 UpBlock (Decoder Level)</h3>

<pre><code class="language-python">
class UpBlock(nn.Module):
    """Decoder block: Upsample + Concat skip + ResidualBlock."""
    
    def __init__(self, in_channels, skip_channels, out_channels, time_emb_dim):
        super().__init__()
        # in_channels = channels from below level after upsample
        # After concat with skip: in_channels + skip_channels
        self.res_block = ResidualBlock(
            in_channels + skip_channels, out_channels, time_emb_dim
        )
        self.upsample = nn.Upsample(scale_factor=2, mode='nearest')
    
    def forward(self, x, skip, t_emb):
        """
        Args:
            x: (B, in_channels, H, W) — from below level
            skip: (B, skip_channels, 2H, 2W) — skip connection from encoder
            t_emb: (B, time_emb_dim)
        Returns:
            (B, out_channels, 2H, 2W)
        """
        x = self.upsample(x)               # (B, in_channels, 2H, 2W)
        x = torch.cat([x, skip], dim=1)     # (B, in_channels+skip_channels, 2H, 2W)
        x = self.res_block(x, t_emb)        # (B, out_channels, 2H, 2W)
        return x
</code></pre>

<h3 id="full-unet">5.4 Full U-Net Assembly</h3>

<pre><code class="language-python">
class UNet(nn.Module):
    """Complete U-Net for diffusion denoising.
    
    Architecture: 64×64×1 → encoder (3 levels) → bottleneck → decoder (3 levels) → 64×64×1
    Channel progression: 1 → 64 → 128 → 256 → 512 (bottleneck) → 256 → 128 → 64 → 1
    """
    
    def __init__(self, in_channels=1, base_channels=64, time_emb_dim=128):
        super().__init__()
        
        # Timestep embedding
        self.time_embed = TimestepMLPEmbedding(
            embed_dim=time_emb_dim, 
            hidden_dim=time_emb_dim * 4
        )
        t_dim = time_emb_dim * 4  # output dim of MLP
        
        # Initial convolution: 1 → 64
        self.init_conv = nn.Conv2d(in_channels, base_channels, kernel_size=3, padding=1)
        
        # Encoder path
        # Level 1: 64ch, 64×64 → Rearrange → 256ch, 32×32
        self.down1 = DownBlock(base_channels, base_channels, t_dim)        # 64 → 64 (skip), 256 (down)
        
        # Level 2: 256ch, 32×32 → Rearrange → 512ch, 16×16  
        # Cần 1x1 conv trước vì Rearrange tạo 4×channels
        self.down1_proj = nn.Conv2d(base_channels * 4, base_channels * 2, kernel_size=1)
        self.down2 = DownBlock(base_channels * 2, base_channels * 2, t_dim) # 128 → 128 (skip), 512 (down)
        
        # Level 3: 512ch, 16×16 → Rearrange → 1024ch, 8×8
        self.down2_proj = nn.Conv2d(base_channels * 8, base_channels * 4, kernel_size=1)
        self.down3 = DownBlock(base_channels * 4, base_channels * 4, t_dim) # 256 → 256 (skip), 1024 (down)
        
        # Bottleneck: 1024ch, 8×8 → 512ch, 8×8
        self.down3_proj = nn.Conv2d(base_channels * 16, base_channels * 8, kernel_size=1)
        self.bottleneck = ResidualBlock(base_channels * 8, base_channels * 8, t_dim)  # 512 → 512
        
        # Decoder path
        # Level 3: upsample 512 to 16×16, concat skip(256) → 768 → 256
        self.up3 = UpBlock(base_channels * 8, base_channels * 4, base_channels * 4, t_dim)
        
        # Level 2: upsample 256 to 32×32, concat skip(128) → 384 → 128
        self.up2 = UpBlock(base_channels * 4, base_channels * 2, base_channels * 2, t_dim)
        
        # Level 1: upsample 128 to 64×64, concat skip(64) → 192 → 64
        self.up1 = UpBlock(base_channels * 2, base_channels, base_channels, t_dim)
        
        # Final output: 64 → 1
        self.final_conv = nn.Sequential(
            nn.GroupNorm(8, base_channels),
            nn.GELU(),
            nn.Conv2d(base_channels, in_channels, kernel_size=1),
        )
    
    def forward(self, x, timesteps):
        """
        Args:
            x: (B, 1, 64, 64) — noisy image
            timesteps: (B,) — integer timesteps
        Returns:
            (B, 1, 64, 64) — predicted clean image (or noise)
        """
        # Timestep embedding
        t_emb = self.time_embed(timesteps)    # (B, t_dim)
        
        # Initial conv
        x = self.init_conv(x)                 # (B, 64, 64, 64)
        
        # Encoder
        skip1, x = self.down1(x, t_emb)       # skip1: (B,64,64,64), x: (B,256,32,32)
        x = self.down1_proj(x)                 # (B, 128, 32, 32)
        
        skip2, x = self.down2(x, t_emb)       # skip2: (B,128,32,32), x: (B,512,16,16)
        x = self.down2_proj(x)                 # (B, 256, 16, 16)
        
        skip3, x = self.down3(x, t_emb)       # skip3: (B,256,16,16), x: (B,1024,8,8)
        x = self.down3_proj(x)                 # (B, 512, 8, 8)
        
        # Bottleneck
        x = self.bottleneck(x, t_emb)         # (B, 512, 8, 8)
        
        # Decoder
        x = self.up3(x, skip3, t_emb)         # (B, 256, 16, 16)
        x = self.up2(x, skip2, t_emb)         # (B, 128, 32, 32)
        x = self.up1(x, skip1, t_emb)         # (B, 64, 64, 64)
        
        # Final output
        x = self.final_conv(x)                 # (B, 1, 64, 64)
        return x
</code></pre>

<p>Kiểm tra tensor shapes:</p>

<pre><code class="language-python">
# Verify shapes
model = UNet(in_channels=1, base_channels=64, time_emb_dim=128)
x = torch.randn(2, 1, 64, 64)
t = torch.randint(0, 1000, (2,))
out = model(x, t)
print(f"Input:  {x.shape}")    # torch.Size([2, 1, 64, 64])
print(f"Output: {out.shape}")  # torch.Size([2, 1, 64, 64])
print(f"Params: {sum(p.numel() for p in model.parameters()):,}")
</code></pre>

<pre><code class="language-text">
Tensor Shape Flow qua U-Net (base_channels=64)
═══════════════════════════════════════════════

Layer                    Shape                  Notes
──────────────────────────────────────────────────────────
Input                    (B, 1, 64, 64)
init_conv                (B, 64, 64, 64)        Conv2d(1, 64)
                                                
down1 ResBlock           (B, 64, 64, 64)        skip1 ─────────────────┐
down1 Rearrange          (B, 256, 32, 32)       4× channels            │
down1_proj               (B, 128, 32, 32)       1×1 conv reduce        │
                                                                        │
down2 ResBlock           (B, 128, 32, 32)       skip2 ──────────┐      │
down2 Rearrange          (B, 512, 16, 16)       4× channels     │      │
down2_proj               (B, 256, 16, 16)       1×1 conv reduce │      │
                                                                 │      │
down3 ResBlock           (B, 256, 16, 16)       skip3 ───┐      │      │
down3 Rearrange          (B, 1024, 8, 8)        4× ch    │      │      │
down3_proj               (B, 512, 8, 8)         reduce   │      │      │
                                                          │      │      │
bottleneck               (B, 512, 8, 8)                   │      │      │
                                                          │      │      │
up3 Upsample             (B, 512, 16, 16)                │      │      │
up3 Concat skip3         (B, 768, 16, 16) ◄──────────────┘      │      │
up3 ResBlock             (B, 256, 16, 16)                        │      │
                                                                  │      │
up2 Upsample             (B, 256, 32, 32)                        │      │
up2 Concat skip2         (B, 384, 32, 32) ◄─────────────────────┘      │
up2 ResBlock             (B, 128, 32, 32)                               │
                                                                         │
up1 Upsample             (B, 128, 64, 64)                               │
up1 Concat skip1         (B, 192, 64, 64) ◄────────────────────────────┘
up1 ResBlock             (B, 64, 64, 64)

final_conv               (B, 1, 64, 64)         Output = denoised image
</code></pre>

<blockquote><p><strong>Exam tip:</strong> Trong assessment, bạn sẽ cần tính toán chính xác tensor shapes. Quy tắc nhớ: <strong>Rearrange → channels ×4, spatial ÷2</strong>. Sau concat skip connection, số channels = channels từ upsample + channels từ skip. Ghi ra giấy nháp trước khi code!</p></blockquote>

<h2 id="train-denoiser">6. Train Denoiser Model</h2>

<h3 id="denoising-task">6.1 Bài toán Denoising đơn giản</h3>

<p>Trước khi học full diffusion process (nhiều timesteps), ta bắt đầu với bài toán đơn giản:<br/>
<strong>Thêm Gaussian noise vào ảnh → train U-Net khôi phục ảnh gốc</strong></p>

<pre><code class="language-text">
Simple Denoising Task
═════════════════════

Original Image        Add Noise                Noisy Image        U-Net         Denoised Output
   ┌──────┐          ┌──────┐                  ┌──────┐         ┌─────┐         ┌──────┐
   │ 🖼️   │    +     │ ░░░░ │  noise_level     │ ░🖼️░ │  ────► │U-Net│  ────►  │ 🖼️   │
   │      │          │ ░░░░ │  * N(0,1)        │ ░░░░ │         │     │         │      │
   └──────┘          └──────┘                  └──────┘         └─────┘         └──────┘
      x₀               ε                      x_noisy          predict          x̂₀
                                            = x₀ + σ·ε           x₀

Loss = MSE(x̂₀, x₀) = ‖U-Net(x_noisy, t) - x₀‖²
</code></pre>

<h3 id="training-code">6.2 Training Loop</h3>

<pre><code class="language-python">
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

# Hyperparameters
BATCH_SIZE = 32
LEARNING_RATE = 1e-4
EPOCHS = 50
NOISE_LEVEL = 0.5  # σ: controls how much noise to add
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Dataset: MNIST (grayscale 28×28 → resize to 64×64)
transform = transforms.Compose([
    transforms.Resize((64, 64)),
    transforms.ToTensor(),           # [0, 1]
    transforms.Normalize([0.5], [0.5])  # [-1, 1]
])
dataset = datasets.MNIST(root='./data', train=True, transform=transform, download=True)
dataloader = DataLoader(dataset, batch_size=BATCH_SIZE, shuffle=True)

# Model, optimizer, loss
model = UNet(in_channels=1, base_channels=64, time_emb_dim=128).to(DEVICE)
optimizer = optim.Adam(model.parameters(), lr=LEARNING_RATE)
loss_fn = nn.MSELoss()

# Training loop
for epoch in range(EPOCHS):
    total_loss = 0
    for batch_idx, (images, _) in enumerate(dataloader):
        images = images.to(DEVICE)                    # (B, 1, 64, 64)
        
        # Random timesteps (mỗi sample một timestep khác nhau)
        timesteps = torch.randint(0, 1000, (images.shape[0],), device=DEVICE)
        
        # Scale noise level theo timestep (đơn giản: linear scaling)
        noise_scales = (timesteps.float() / 1000.0 * NOISE_LEVEL)  # (B,)
        noise_scales = noise_scales[:, None, None, None]             # (B,1,1,1)
        
        # Add noise
        noise = torch.randn_like(images)                             # (B, 1, 64, 64)
        noisy_images = images + noise_scales * noise                 # (B, 1, 64, 64)
        
        # Forward pass: predict clean image
        predicted_clean = model(noisy_images, timesteps)             # (B, 1, 64, 64)
        
        # Loss: MSE between predicted clean and actual clean
        loss = loss_fn(predicted_clean, images)
        
        # Backward pass
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
        total_loss += loss.item()
    
    avg_loss = total_loss / len(dataloader)
    print(f"Epoch [{epoch+1}/{EPOCHS}], Loss: {avg_loss:.6f}")
</code></pre>

<h3 id="visualize-results">6.3 Visualize Results</h3>

<pre><code class="language-python">
import matplotlib.pyplot as plt

@torch.no_grad()
def visualize_denoising(model, dataloader, noise_level=0.5, num_images=5):
    """Hiển thị: Original → Noisy → Denoised."""
    model.eval()
    images, _ = next(iter(dataloader))
    images = images[:num_images].to(DEVICE)
    
    # Add noise
    timesteps = torch.full((num_images,), 500, device=DEVICE)
    noise = torch.randn_like(images) * noise_level
    noisy = images + noise
    
    # Denoise
    denoised = model(noisy, timesteps)
    
    # Plot
    fig, axes = plt.subplots(3, num_images, figsize=(num_images * 3, 9))
    titles = ['Original', 'Noisy', 'Denoised']
    
    for i in range(num_images):
        for j, (img, title) in enumerate(zip(
            [images[i], noisy[i], denoised[i]], titles
        )):
            ax = axes[j][i]
            # Denormalize: [-1,1] → [0,1]
            img_np = (img.cpu().squeeze() * 0.5 + 0.5).clamp(0, 1).numpy()
            ax.imshow(img_np, cmap='gray')
            ax.set_title(title if i == 0 else '')
            ax.axis('off')
    
    plt.tight_layout()
    plt.savefig('denoising_results.png', dpi=150)
    plt.show()

visualize_denoising(model, dataloader)
</code></pre>

<blockquote><p><strong>Exam tip:</strong> Trong assessment, bạn có thể cần hoàn thành training loop. Nhớ 3 bước quan trọng: (1) thêm noise vào clean image, (2) forward pass qua U-Net với noisy image + timestep, (3) tính MSE loss giữa predicted và original. <strong>Đừng quên truyền timestep vào model!</strong></p></blockquote>

<h2 id="cheat-sheet">7. Cheat Sheet — U-Net &amp; Denoising</h2>

<table>
<thead>
<tr><th>Concept</th><th>Key Detail</th><th>Code/Formula</th></tr>
</thead>
<tbody>
<tr><td>U-Net Structure</td><td>Encoder → Bottleneck → Decoder + Skip Connections</td><td>Hình chữ U, skip = concatenate</td></tr>
<tr><td>GroupNorm</td><td>Normalize per group, batch-size independent</td><td><code>nn.GroupNorm(8, channels)</code></td></tr>
<tr><td>GELU</td><td>Smooth activation, x·Φ(x)</td><td><code>nn.GELU()</code></td></tr>
<tr><td>Rearrange Pooling</td><td>(B,C,2H,2W) → (B,4C,H,W), lossless</td><td><code>rearrange(x, 'b c (h p1) (w p2) → b (c p1 p2) h w', p1=2, p2=2)</code></td></tr>
<tr><td>Sinusoidal Embed</td><td>sin/cos at varying frequencies</td><td><code>sin(t/10000^(2i/d))</code>, <code>cos(t/10000^(2i/d))</code></td></tr>
<tr><td>Timestep Injection</td><td>Add to feature maps after GroupNorm</td><td><code>h = h + t_emb[:,:,None,None]</code></td></tr>
<tr><td>ResidualBlock</td><td>Conv→GN→(+t)→GELU→Conv→GN→GELU + skip</td><td>2 conv layers + residual + timestep</td></tr>
<tr><td>Denoising Loss</td><td>MSE between predicted clean &amp; actual clean</td><td><code>MSE(model(x_noisy, t), x_clean)</code></td></tr>
<tr><td>Skip Connection Role</td><td>Preserve spatial details, improve gradient flow</td><td><code>torch.cat([upsample, skip], dim=1)</code></td></tr>
<tr><td>Channels after Concat</td><td>Channels from upsample + channels from skip</td><td>Phải match in_channels của conv tiếp theo</td></tr>
</tbody>
</table>

<h2 id="practice-questions">8. Practice Questions</h2>

<p>Các câu hỏi dưới đây mô phỏng coding assessment trong NVIDIA DLI. Hãy thử code trước khi xem đáp án!</p>

<p><strong>Q1: Implement ResidualBlock with Timestep Injection</strong></p>

<p>Complete the <code>forward</code> method of the <code>ResidualBlock</code> below. The block should apply two conv layers with GroupNorm and GELU, inject the timestep embedding after the first normalization, and add a residual connection.</p>

<pre><code class="language-python">
class ResidualBlock(nn.Module):
    def __init__(self, in_ch, out_ch, t_dim):
        super().__init__()
        self.conv1 = nn.Conv2d(in_ch, out_ch, 3, padding=1)
        self.norm1 = nn.GroupNorm(8, out_ch)
        self.conv2 = nn.Conv2d(out_ch, out_ch, 3, padding=1)
        self.norm2 = nn.GroupNorm(8, out_ch)
        self.act = nn.GELU()
        self.time_proj = nn.Linear(t_dim, out_ch)
        self.res_conv = nn.Conv2d(in_ch, out_ch, 1) if in_ch != out_ch else nn.Identity()
    
    def forward(self, x, t_emb):
        # TODO: implement this method
        pass
</code></pre>

<details>
<summary>Show Answer Q1</summary>

<pre><code class="language-python">
def forward(self, x, t_emb):
    residual = self.res_conv(x)
    
    h = self.conv1(x)
    h = self.norm1(h)
    
    # Inject timestep: project t_emb to out_ch, reshape for broadcasting, add
    t = self.time_proj(t_emb)          # (B, out_ch)
    t = t[:, :, None, None]            # (B, out_ch, 1, 1)
    h = h + t
    
    h = self.act(h)
    
    h = self.conv2(h)
    h = self.norm2(h)
    h = self.act(h)
    
    return h + residual
</code></pre>

<p><em>Explanation: Key points — (1) timestep is ADDED not concatenated, (2) reshape to (B, C, 1, 1) enables broadcasting across H×W, (3) injection happens after norm1 before GELU, (4) residual uses 1×1 conv if channel dimensions mismatch.</em></p>
</details>

<p><strong>Q2: What happens if you remove skip connections from U-Net?</strong></p>

<p>Consider the following modified U-Net that does NOT use skip connections in the decoder:</p>

<pre><code class="language-python">
# Original (with skip connections):
x = self.upsample(x)
x = torch.cat([x, skip], dim=1)  # concat skip
x = self.res_block(x, t_emb)

# Modified (WITHOUT skip connections):
x = self.upsample(x)
# skip connection removed!
x = self.res_block(x, t_emb)
</code></pre>

<p>What will happen to the denoised output? Choose all that apply:</p>

<ul>
<li>A) Output will be blurry, losing fine details</li>
<li>B) Model fails to compile due to shape mismatch</li>
<li>C) Training loss will increase significantly</li>
<li>D) Model produces identical output regardless of input</li>
</ul>

<details>
<summary>Show Answer Q2</summary>

<p><strong>A and C are correct.</strong></p>

<p><em>Explanation: (A) Without skip connections, the decoder only has bottleneck information (8×8 at 512 channels) to reconstruct 64×64 details — fine-grained textures and edges are lost, resulting in blurry outputs. (B) Incorrect if in_channels of res_block is adjusted — no shape mismatch if properly configured. (C) Correct — the model has less information to reconstruct from, so MSE loss between prediction and clean image will be higher. (D) This would only happen in extreme cases like total information bottleneck. The model can still capture rough structure from the bottleneck features.</em></p>
</details>

<p><strong>Q3: Calculate output shapes through each U-Net level</strong></p>

<p>Given the following U-Net configuration, fill in the missing tensor shapes:</p>

<pre><code class="language-python">
# Config: in_channels=1, base_channels=32, image_size=32×32
# Using Rearrange Pooling for downsampling

x = input                  # Shape: (B, 1, 32, 32)
x = init_conv(x)           # Shape: (B, 32, 32, 32)

# Encoder Level 1
skip1, x = down1(x)        # skip1: (B, 32, 32, 32),  x after rearrange: ???
x = proj1(x)               # Shape: ???

# Encoder Level 2
skip2, x = down2(x)        # skip2: ???,  x after rearrange: ???
x = proj2(x)               # Shape: ???

# Bottleneck
x = bottleneck(x)          # Shape: ???

# Decoder Level 2
x = upsample(x)            # Shape: ???
x = cat(x, skip2)          # Shape: ???
x = res_block(x)           # Shape: ???

# Decoder Level 1
x = upsample(x)            # Shape: ???
x = cat(x, skip1)          # Shape: ???
x = res_block(x)           # Shape: ???

x = final_conv(x)          # Shape: (B, 1, 32, 32)
</code></pre>

<details>
<summary>Show Answer Q3</summary>

<pre><code class="language-python">
x = input                  # (B, 1, 32, 32)
x = init_conv(x)           # (B, 32, 32, 32)

# Encoder Level 1
skip1 = res1(x)            # skip1: (B, 32, 32, 32)
x = rearrange(skip1)       # (B, 128, 16, 16)      ← 32×4=128, 32/2=16
x = proj1(x)               # (B, 64, 16, 16)       ← 1×1 conv reduce

# Encoder Level 2
skip2 = res2(x)            # skip2: (B, 64, 16, 16)
x = rearrange(skip2)       # (B, 256, 8, 8)         ← 64×4=256, 16/2=8
x = proj2(x)               # (B, 128, 8, 8)         ← 1×1 conv reduce

# Bottleneck
x = bottleneck(x)          # (B, 128, 8, 8)

# Decoder Level 2
x = upsample(x)            # (B, 128, 16, 16)       ← spatial ×2
x = cat(x, skip2)          # (B, 192, 16, 16)       ← 128+64=192
x = res_block(x)           # (B, 64, 16, 16)        ← project down

# Decoder Level 1
x = upsample(x)            # (B, 64, 32, 32)        ← spatial ×2
x = cat(x, skip1)          # (B, 96, 32, 32)        ← 64+32=96
x = res_block(x)           # (B, 32, 32, 32)        ← project down

x = final_conv(x)          # (B, 1, 32, 32)
</code></pre>

<p><em>Explanation: The key pattern — Rearrange Pooling multiplies channels by 4 and halves spatial dimensions. After concat with skip, channels = upsample_channels + skip_channels. Track these carefully to set correct in_channels for each layer.</em></p>
</details>

<p><strong>Q4: Implement SinusoidalPositionEmbedding class</strong></p>

<p>Implement the <code>forward</code> method that converts integer timesteps to sinusoidal embeddings:</p>

<pre><code class="language-python">
class SinusoidalPositionEmbedding(nn.Module):
    def __init__(self, embed_dim):
        super().__init__()
        self.embed_dim = embed_dim  # must be even
    
    def forward(self, timesteps):
        """
        Args:
            timesteps: (B,) — integer timesteps
        Returns:
            (B, embed_dim) — sinusoidal embeddings
        """
        # TODO: implement using formula:
        # PE(t, 2i) = sin(t / 10000^(2i/d))
        # PE(t, 2i+1) = cos(t / 10000^(2i/d))
        pass
</code></pre>

<details>
<summary>Show Answer Q4</summary>

<pre><code class="language-python">
import math

def forward(self, timesteps):
    device = timesteps.device
    half_dim = self.embed_dim // 2
    
    # Step 1: Compute frequency terms
    # exp(-log(10000) * i/(d/2)) = 1/10000^(i/(d/2)) for i in [0, d/2)
    freqs = torch.exp(
        -math.log(10000.0) * torch.arange(half_dim, device=device).float() / half_dim
    )
    
    # Step 2: Outer product of timesteps and frequencies
    # (B, 1) * (1, d/2) → (B, d/2)
    args = timesteps[:, None].float() * freqs[None, :]
    
    # Step 3: Apply sin and cos, concatenate
    embeddings = torch.cat([torch.sin(args), torch.cos(args)], dim=-1)
    # Result shape: (B, embed_dim)
    
    return embeddings
</code></pre>

<p><em>Explanation: Three key steps — (1) compute frequency terms using exp(-log(10000) * i/half_dim) which is equivalent to 1/10000^(2i/d), (2) multiply each timestep by all frequencies via broadcasting, (3) apply sin to first half and cos to second half then concatenate. The math.log(10000.0) formulation is numerically more stable than computing 10000**(2i/d) directly.</em></p>
</details>

<p><strong>Q5: Debug U-Net — Output is always the mean of the training set</strong></p>

<p>A student implemented a U-Net for denoising but the output always looks like the blurry average of MNIST digits regardless of input. Review the code below and find the bug:</p>

<pre><code class="language-python">
class BuggyUpBlock(nn.Module):
    def __init__(self, in_channels, out_channels, time_emb_dim):
        super().__init__()
        self.upsample = nn.Upsample(scale_factor=2, mode='nearest')
        # BUG: Notice in_channels here — where is the skip connection?
        self.res_block = ResidualBlock(in_channels, out_channels, time_emb_dim)
    
    def forward(self, x, skip, t_emb):
        x = self.upsample(x)
        # BUG: skip connection is received but never used!
        x = self.res_block(x, t_emb)
        return x


class BuggyUNet(nn.Module):
    def __init__(self):
        super().__init__()
        # ... encoder and bottleneck (correct) ...
        
        # Decoder — uses BuggyUpBlock
        self.up3 = BuggyUpBlock(512, 256, t_dim)  # skip not concatenated
        self.up2 = BuggyUpBlock(256, 128, t_dim)   # skip not concatenated
        self.up1 = BuggyUpBlock(128, 64, t_dim)    # skip not concatenated
</code></pre>

<p>What is the bug and how do you fix it?</p>

<details>
<summary>Show Answer Q5</summary>

<p><strong>Bug:</strong> The <code>skip</code> tensor is passed to <code>forward()</code> but <strong>never concatenated</strong> with <code>x</code>. The decoder only sees bottleneck features (heavily compressed, 8×8) and cannot reconstruct spatial details → output converges to dataset mean.</p>

<pre><code class="language-python">
class FixedUpBlock(nn.Module):
    def __init__(self, in_channels, skip_channels, out_channels, time_emb_dim):
        super().__init__()
        self.upsample = nn.Upsample(scale_factor=2, mode='nearest')
        # FIX: in_channels = in_channels + skip_channels (after concat)
        self.res_block = ResidualBlock(
            in_channels + skip_channels, out_channels, time_emb_dim
        )
    
    def forward(self, x, skip, t_emb):
        x = self.upsample(x)
        x = torch.cat([x, skip], dim=1)  # FIX: concatenate skip connection!
        x = self.res_block(x, t_emb)
        return x
</code></pre>

<p><em>Explanation: This is a common and subtle bug. The model still trains and produces output of correct shape, but without skip connections the decoder is a pure upsampling network with only bottleneck features. Since the 8×8 bottleneck captures global statistics but not spatial details, the model learns to output the average image (minimum MSE solution when lacking detail info). Two fixes: (1) add <code>torch.cat([x, skip], dim=1)</code> in forward, (2) change ResidualBlock in_channels to account for concatenated skip channels.</em></p>
</details>

<blockquote><p><strong>Exam tip:</strong> Trong real assessment, debugging exercises thường liên quan đến <strong>shape mismatches</strong> hoặc <strong>missing connections</strong>. Khi model output trông "bình thường" nhưng blurry và giống nhau cho mọi input — nghĩ ngay đến skip connections bị thiếu hoặc sai. Luôn in tensor shapes ở mỗi layer khi debug!</p></blockquote>
