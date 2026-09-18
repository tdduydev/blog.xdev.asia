---
id: 019c9619-nv01-p2-l05
title: 'Bài 5: CLIP & Text-to-Image Pipeline'
slug: bai-5-clip-text-to-image-pipeline
description: >-
  CLIP: Contrastive Language-Image Pretraining.
  Text encoding, image encoding, contrastive loss.
  Cross-attention: inject text embeddings into U-Net.
  Full text-to-image pipeline. Latent Diffusion overview.
  Assessment prep: coding exercises & debug challenges.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 5
section_title: "Part 2: Generative AI with Diffusion Models"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'Luyện thi NVIDIA DLI — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="gioi-thieu">1. Giới thiệu: Từ Class Labels đến Text Prompts</h2>

<p>Bài trước bạn đã implement <strong>Classifier-Free Guidance (CFG)</strong> với class labels (số 0–9). Nhưng Stable Diffusion không dùng class labels — nó dùng <strong>text prompts</strong> tự do. Vậy làm cách nào để chuyển từ "a photo of a cat" thành tensor mà U-Net hiểu được?</p>

<p>Câu trả lời nằm ở <strong>CLIP (Contrastive Language-Image Pretraining)</strong> — model cầu nối giữa ngôn ngữ và hình ảnh, được OpenAI giới thiệu năm 2021. Đây là bài cuối cùng trong phần Diffusion Models, kết hợp tất cả kiến thức bạn đã học để xây dựng <strong>full text-to-image pipeline</strong>.</p>

<blockquote><p><strong>Exam tip:</strong> DLI assessment <strong>S-FX-14</strong> yêu cầu bạn kết hợp U-Net, DDPM, CFG, và text conditioning thành một pipeline hoàn chỉnh. Bài này là "tổng lực" — nếu bạn hiểu rõ từng thành phần ở Bài 3–4 và kết nối chúng ở Bài 5, bạn sẽ hoàn thành assessment nhanh hơn.</p></blockquote>

<pre><code class="language-text">
Roadmap: Class Label → Text Prompt Conditioning
════════════════════════════════════════════════

  Bài 3: U-Net backbone          → Kiến trúc denoiser
  Bài 4: DDPM + CFG              → Training & sampling với class labels
  Bài 5: CLIP + Cross-Attention  → Text-to-image pipeline ← BẠN ĐANG Ở ĐÂY
        │
        ▼
  ┌──────────────────────────────────────────────────────────┐
  │  "a sunset over mountains"                               │
  │         │                                                │
  │         ▼                                                │
  │   ┌──────────┐   ┌──────────────────┐   ┌──────────┐   │
  │   │   CLIP   │──►│  Cross-Attention  │──►│  U-Net   │   │
  │   │ Encoder  │   │  (K, V from text) │   │ Denoise  │   │
  │   └──────────┘   └──────────────────┘   └──────────┘   │
  │                                              │          │
  │                                              ▼          │
  │                                        [ 🖼️ Image ]     │
  └──────────────────────────────────────────────────────────┘
</code></pre>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai5-clip-text-to-image.webp" alt="CLIP và Text-to-Image Pipeline — Text Encoder, Cross-Attention, U-Net Denoiser" loading="lazy" /><figcaption>CLIP và Text-to-Image Pipeline — Text Encoder, Cross-Attention, U-Net Denoiser</figcaption></figure>

<h2 id="clip-architecture">2. CLIP — Contrastive Language-Image Pretraining</h2>

<h3 id="clip-dual-encoder">2.1 Dual-Encoder Architecture</h3>

<p><strong>CLIP</strong> gồm hai encoder được train cùng lúc trên 400 triệu cặp (text, image) từ internet:</p>

<ul>
<li><strong>Text Encoder</strong>: Transformer (giống GPT) — nhận text → output embedding vector (512-d hoặc 768-d)</li>
<li><strong>Image Encoder</strong>: ViT (Vision Transformer) hoặc ResNet — nhận image → output embedding cùng dimension</li>
</ul>

<p>Điểm mấu chốt: cả hai encoder đều output embedding <strong>cùng không gian vector</strong>. Điều này cho phép so sánh trực tiếp text và image bằng <strong>cosine similarity</strong>.</p>

<pre><code class="language-text">
CLIP Architecture — Dual Encoder
═════════════════════════════════

  TEXT BRANCH                          IMAGE BRANCH
  ───────────                          ────────────

  "a photo of    ┌───────────────┐     ┌─────┐   ┌───────────────┐
   a cat"    ──► │ Text Encoder  │     │ 🖼️  │──►│ Image Encoder │
                 │ (Transformer) │     │     │   │ (ViT / ResNet)│
                 └───────┬───────┘     └─────┘   └───────┬───────┘
                         │                                │
                         ▼                                ▼
                  ┌──────────────┐                 ┌──────────────┐
                  │ Text Embed.  │                 │ Image Embed. │
                  │ (768-dim)    │                 │ (768-dim)    │
                  └──────┬───────┘                 └──────┬───────┘
                         │                                │
                         └────────────┬───────────────────┘
                                      │
                                      ▼
                              ┌───────────────┐
                              │    Cosine      │
                              │  Similarity    │
                              │  sim(t, i)     │
                              └───────────────┘

  Training (400M image-text pairs):
  ┌──────────────────────────────────────────────────────┐
  │  Maximize sim(text_i, image_i)    ← matched pairs    │
  │  Minimize sim(text_i, image_j)    ← non-matched      │
  └──────────────────────────────────────────────────────┘
</code></pre>

<h3 id="contrastive-loss">2.2 Contrastive Loss</h3>

<p>CLIP sử dụng <strong>symmetric cross-entropy loss</strong> trên ma trận similarity NxN. Với batch N cặp (text, image):</p>

<pre><code class="language-text">
Contrastive Loss — Similarity Matrix
═════════════════════════════════════

  Batch N = 4 cặp (text, image):

              image_0   image_1   image_2   image_3
            ┌─────────┬─────────┬─────────┬─────────┐
  text_0    │  0.95 ✓ │  0.12   │  0.08   │  0.03   │
            ├─────────┼─────────┼─────────┼─────────┤
  text_1    │  0.10   │  0.91 ✓ │  0.15   │  0.07   │
            ├─────────┼─────────┼─────────┼─────────┤
  text_2    │  0.05   │  0.11   │  0.93 ✓ │  0.09   │
            ├─────────┼─────────┼─────────┼─────────┤
  text_3    │  0.08   │  0.06   │  0.12   │  0.89 ✓ │
            └─────────┴─────────┴─────────┴─────────┘

  Goal: đường chéo (✓) → cao, phần còn lại → thấp

  Loss = (CE_rows + CE_cols) / 2
       = cross_entropy(logits, labels) cho cả 2 chiều

  logits = temperature * text_embeds @ image_embeds.T
  labels = [0, 1, 2, ..., N-1]   ← identity matching
</code></pre>

<p><strong>Temperature parameter</strong> (learnable, khởi tạo ~0.07) kiểm soát sharpness của distribution. Temperature thấp → phân biệt rõ hơn giữa positive và negative pairs.</p>

<table>
<thead>
<tr><th>Component</th><th>Chi tiết</th><th>Trong CLIP</th></tr>
</thead>
<tbody>
<tr><td>Text Encoder</td><td>12-layer Transformer, BPE tokenizer</td><td>Max 77 tokens, output CLS embedding</td></tr>
<tr><td>Image Encoder</td><td>ViT-B/32 hoặc ViT-L/14</td><td>Chia image thành patches, output CLS</td></tr>
<tr><td>Embedding dim</td><td>512 (ViT-B/32) hoặc 768 (ViT-L/14)</td><td>Shared space giữa text & image</td></tr>
<tr><td>Training data</td><td>400M image-text pairs (WIT dataset)</td><td>Crawled từ internet</td></tr>
<tr><td>Loss function</td><td>Symmetric cross-entropy</td><td>InfoNCE / NT-Xent variant</td></tr>
<tr><td>Temperature</td><td>Learnable scalar τ</td><td>Init ≈ 0.07, learned during training</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> CLIP <strong>không generate</strong> images — nó chỉ encode text và image vào shared space. Trong text-to-image pipeline, ta chỉ dùng <strong>Text Encoder</strong> của CLIP để tạo conditioning signal cho U-Net. Image Encoder không được sử dụng trong quá trình generation.</p></blockquote>

<h2 id="using-clip">3. Sử dụng CLIP Encodings trong Code</h2>

<h3 id="clip-load">3.1 Load CLIP và Encode Text</h3>

<pre><code class="language-python">
import torch
import clip
from PIL import Image

# Load pretrained CLIP model
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# ── Encode text ──
text_prompts = ["a photo of a cat", "a sunset over mountains", "a red car"]
text_tokens = clip.tokenize(text_prompts).to(device)  # (3, 77) — padded to 77 tokens

with torch.no_grad():
    text_embeddings = model.encode_text(text_tokens)  # (3, 512)
    text_embeddings = text_embeddings / text_embeddings.norm(dim=-1, keepdim=True)  # L2 normalize

print(f"Text embeddings shape: {text_embeddings.shape}")  # (3, 512)
</code></pre>

<h3 id="clip-image">3.2 Encode Image và Compute Similarity</h3>

<pre><code class="language-python">
# ── Encode images ──
images = [preprocess(Image.open(f"img_{i}.jpg")).unsqueeze(0) for i in range(3)]
image_batch = torch.cat(images).to(device)  # (3, 3, 224, 224)

with torch.no_grad():
    image_embeddings = model.encode_image(image_batch)   # (3, 512)
    image_embeddings = image_embeddings / image_embeddings.norm(dim=-1, keepdim=True)

# ── Cosine similarity ──
similarity = text_embeddings @ image_embeddings.T  # (3, 3)
print(similarity)
# tensor([[ 0.31,  0.05,  0.02],    ← "cat" matches image_0
#         [ 0.04,  0.28,  0.06],    ← "sunset" matches image_1
#         [ 0.03,  0.07,  0.26]])   ← "red car" matches image_2
</code></pre>

<p>Kết quả: text và image cùng nội dung có similarity cao nhất. Đây chính là sức mạnh của <strong>shared embedding space</strong> — bạn có thể search image bằng text hoặc ngược lại.</p>

<h3 id="clip-for-diffusion">3.3 CLIP cho Diffusion Models: Sequence Embeddings</h3>

<p>Quan trọng: Stable Diffusion <strong>không dùng CLS embedding</strong> (1 vector duy nhất). Thay vào đó nó dùng <strong>sequence of token embeddings</strong> từ CLIP Text Encoder — output trước projection layer:</p>

<pre><code class="language-text">
CLS Embedding vs Sequence Embeddings
═════════════════════════════════════

  Text: "a photo of a cat"
  Tokenized: [SOS, "a", "photo", "of", "a", "cat", EOS, PAD, PAD, ...]

  CLIP Text Encoder output:
  ┌──────────────────────────────────────────────┐
  │  token_0 (SOS)  → [0.12, -0.34, 0.56, ...]  │
  │  token_1 ("a")  → [0.08, -0.21, 0.43, ...]  │
  │  token_2 ("photo") → [...]                   │
  │  token_3 ("of") → [...]                      │
  │  token_4 ("a")  → [...]                      │
  │  token_5 ("cat")→ [0.91, 0.15, -0.33, ...]  │  ← semantic info
  │  token_6 (EOS)  → [0.67, 0.42, -0.18, ...]  │  ← CLS (used by CLIP)
  │  ...                                         │
  │  token_76 (PAD) → [0.00, 0.00, 0.00, ...]   │
  └──────────────────────────────────────────────┘

  Stable Diffusion dùng: ALL 77 token embeddings → (1, 77, 768)
  CLIP zero-shot dùng:   CHỈ EOS token embedding → (1, 768)
</code></pre>

<table>
<thead>
<tr><th>Use case</th><th>Output</th><th>Shape</th><th>Lý do</th></tr>
</thead>
<tbody>
<tr><td>CLIP classification</td><td>CLS / EOS token</td><td>(B, 768)</td><td>So sánh similarity toàn cục</td></tr>
<tr><td>Stable Diffusion</td><td>Full token sequence</td><td>(B, 77, 768)</td><td>Cross-attention cần per-token info</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Nếu đề hỏi "What is the shape of the text conditioning input to the U-Net?", đáp án là <strong>(batch, 77, 768)</strong> — KHÔNG phải (batch, 768). Cross-attention cần sequence, không phải single vector.</p></blockquote>

<h2 id="cross-attention">4. Cross-Attention: Inject Text Embeddings vào U-Net</h2>

<h3 id="cross-attn-mechanism">4.1 Cơ chế Cross-Attention</h3>

<p>Ở Bài 3, U-Net đã dùng <strong>self-attention</strong> — Q, K, V đều từ image features. <strong>Cross-attention</strong> thay đổi nguồn K và V:</p>

<pre><code class="language-text">
Self-Attention vs Cross-Attention
═════════════════════════════════

  SELF-ATTENTION (trong U-Net):
  ───────────────────────────────
  Q = W_q · image_features    ← từ image
  K = W_k · image_features    ← từ image
  V = W_v · image_features    ← từ image

  Attention = softmax(Q · K^T / √d) · V

  CROSS-ATTENTION (text → image):
  ────────────────────────────────
  Q = W_q · image_features    ← từ image (queries)
  K = W_k · text_embeddings   ← từ CLIP text (keys)
  V = W_v · text_embeddings   ← từ CLIP text (values)

  Attention = softmax(Q_image · K_text^T / √d) · V_text

  ┌──────────────────────────────────────────────────┐
  │  Q shape: (B, H*W, d_model)    ← spatial pixels  │
  │  K shape: (B, 77, d_model)     ← text tokens      │
  │  V shape: (B, 77, d_model)     ← text tokens      │
  │  Score:   (B, H*W, 77)        ← pixel-to-token    │
  │  Output:  (B, H*W, d_model)    ← text-aware image │
  └──────────────────────────────────────────────────┘
</code></pre>

<p>Mỗi pixel "nhìn vào" tất cả 77 text tokens và quyết định nên attend token nào. Pixel ở vùng mèo sẽ attend mạnh vào token "cat", pixel ở vùng bầu trời attend vào "sky".</p>

<h3 id="cross-attn-unet-block">4.2 Cross-Attention trong U-Net Block</h3>

<pre><code class="language-text">
U-Net Block với Cross-Attention
════════════════════════════════

  Input: x (image features, shape: B×C×H×W)
  Condition: text_emb (CLIP output, shape: B×77×768)
  Timestep: t_emb (timestep embedding, shape: B×d)

  ┌─────────────────────────────────────────────┐
  │                U-Net Block                   │
  │                                             │
  │  x ──► [ResBlock + t_emb] ──► x'           │
  │              │                               │
  │              ▼                               │
  │     [Self-Attention]                         │
  │       Q,K,V ← x'                            │
  │              │                               │
  │              ▼                               │
  │     [Cross-Attention]   ◄── text_emb        │
  │       Q ← x'                                │
  │       K,V ← text_emb                        │
  │              │                               │
  │              ▼                               │
  │     [FFN / MLP]                              │
  │              │                               │
  │              ▼                               │
  │           output                             │
  └─────────────────────────────────────────────┘

  Thứ tự trong mỗi block: ResBlock → Self-Attn → Cross-Attn → FFN
</code></pre>

<h3 id="cross-attn-code">4.3 Implementation: CrossAttention Module</h3>

<pre><code class="language-python">
import torch
import torch.nn as nn
import torch.nn.functional as F

class CrossAttention(nn.Module):
    """
    Cross-attention: Q from image features, K/V from text embeddings.
    Used in U-Net blocks to inject text conditioning.
    """
    def __init__(self, d_model, context_dim, n_heads=8):
        super().__init__()
        self.n_heads = n_heads
        self.d_head = d_model // n_heads

        # Q from image, K/V from text
        self.to_q = nn.Linear(d_model, d_model, bias=False)
        self.to_k = nn.Linear(context_dim, d_model, bias=False)
        self.to_v = nn.Linear(context_dim, d_model, bias=False)
        self.out_proj = nn.Linear(d_model, d_model)
        self.norm = nn.LayerNorm(d_model)

    def forward(self, x, context):
        """
        Args:
            x: image features (B, H*W, d_model)
            context: text embeddings from CLIP (B, seq_len, context_dim)
        Returns:
            text-conditioned image features (B, H*W, d_model)
        """
        residual = x
        x = self.norm(x)

        B, N, _ = x.shape
        H = self.n_heads
        d = self.d_head

        # Project to Q, K, V
        Q = self.to_q(x).view(B, N, H, d).transpose(1, 2)       # (B, H, N, d)
        K = self.to_k(context).view(B, -1, H, d).transpose(1, 2) # (B, H, S, d)
        V = self.to_v(context).view(B, -1, H, d).transpose(1, 2) # (B, H, S, d)

        # Scaled dot-product attention
        scale = d ** -0.5
        attn = torch.matmul(Q, K.transpose(-2, -1)) * scale  # (B, H, N, S)
        attn = F.softmax(attn, dim=-1)

        # Weighted sum of values
        out = torch.matmul(attn, V)                     # (B, H, N, d)
        out = out.transpose(1, 2).contiguous().view(B, N, H * d)  # (B, N, d_model)
        out = self.out_proj(out)

        return out + residual  # residual connection
</code></pre>

<h3 id="unet-block-with-cross">4.4 U-Net Block kết hợp Self-Attention + Cross-Attention</h3>

<pre><code class="language-python">
class TransformerBlock(nn.Module):
    """Single transformer block: Self-Attn → Cross-Attn → FFN"""
    def __init__(self, d_model, context_dim, n_heads=8):
        super().__init__()
        self.self_attn = nn.MultiheadAttention(d_model, n_heads, batch_first=True)
        self.self_attn_norm = nn.LayerNorm(d_model)

        self.cross_attn = CrossAttention(d_model, context_dim, n_heads)

        self.ffn = nn.Sequential(
            nn.LayerNorm(d_model),
            nn.Linear(d_model, d_model * 4),
            nn.GELU(),
            nn.Linear(d_model * 4, d_model),
        )

    def forward(self, x, context):
        # Self-attention
        norm_x = self.self_attn_norm(x)
        attn_out, _ = self.self_attn(norm_x, norm_x, norm_x)
        x = x + attn_out

        # Cross-attention (inject text)
        x = self.cross_attn(x, context)

        # Feed-forward
        x = x + self.ffn(x)
        return x
</code></pre>

<blockquote><p><strong>Exam tip:</strong> Sai lầm phổ biến trong assessment: đặt K, V từ image thay vì từ text. Nếu cross-attention lấy K, V từ image features → text prompt sẽ không có tác dụng → output giống unconditional. Debug tip: kiểm tra <code>self.to_k</code> và <code>self.to_v</code> có nhận <strong>context</strong> (text) hay <strong>x</strong> (image).</p></blockquote>

<h2 id="full-pipeline">5. Full Text-to-Image Pipeline</h2>

<h3 id="pipeline-overview">5.1 Overview: Kết hợp tất cả Components</h3>

<pre><code class="language-text">
Full Text-to-Image Pipeline
════════════════════════════

  Input: "a golden retriever playing in snow"

  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │  Step 1: TEXT ENCODING                                       │
  │  ─────────────────────                                       │
  │  prompt ──► CLIP Tokenizer ──► CLIP Text Encoder             │
  │                                      │                       │
  │                               text_emb (1, 77, 768)         │
  │                                      │                       │
  │  Step 2: NOISE INITIALIZATION        │                       │
  │  ────────────────────────────        │                       │
  │  x_T ~ N(0, I)  (pure noise)        │                       │
  │       shape: (1, C, H, W)           │                       │
  │              │                        │                       │
  │  Step 3: REVERSE DIFFUSION LOOP     │                       │
  │  ───────────────────────────────     │                       │
  │  for t = T, T-1, ..., 1:            │                       │
  │    │                                  │                       │
  │    ├─► ε̂_uncond = UNet(x_t, t, ∅)   │  ← unconditional     │
  │    ├─► ε̂_cond = UNet(x_t, t, text_emb) ← conditional       │
  │    │                                                         │
  │    ├─► ε̂ = ε̂_uncond + w·(ε̂_cond − ε̂_uncond)   ← CFG      │
  │    │                                                         │
  │    └─► x_{t-1} = denoise_step(x_t, ε̂, t)                   │
  │              │                                               │
  │  Step 4: OUTPUT                                              │
  │  ──────────────                                              │
  │  x_0 = final denoised image                                 │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘
</code></pre>

<h3 id="pipeline-code">5.2 Implementation: Text-to-Image Sampling</h3>

<pre><code class="language-python">
@torch.no_grad()
def text_to_image_sample(
    unet, clip_model, prompt, schedule,
    guidance_scale=7.5, image_size=64, channels=3,
    device='cuda'
):
    """
    Complete text-to-image sampling pipeline.
    Combines CLIP encoding + CFG + DDPM reverse diffusion.
    """
    T = len(schedule['betas'])
    betas = schedule['betas'].to(device)
    alphas = schedule['alphas'].to(device)
    alpha_bar = schedule['alpha_bar'].to(device)

    # ── Step 1: Encode text prompt ──
    text_tokens = clip.tokenize([prompt]).to(device)           # (1, 77)
    text_emb = clip_model.encode_text_sequence(text_tokens)    # (1, 77, 768)

    # Null embedding for unconditional path (CFG)
    null_tokens = clip.tokenize([""]).to(device)
    null_emb = clip_model.encode_text_sequence(null_tokens)    # (1, 77, 768)

    # ── Step 2: Start from pure noise ──
    x_t = torch.randn(1, channels, image_size, image_size, device=device)

    # ── Step 3: Reverse diffusion with CFG ──
    for t in reversed(range(T)):
        t_batch = torch.tensor([t], device=device)

        # Conditional & unconditional predictions
        noise_cond = unet(x_t, t_batch, context=text_emb)     # ε̂_cond
        noise_uncond = unet(x_t, t_batch, context=null_emb)   # ε̂_uncond

        # Classifier-Free Guidance
        noise_pred = noise_uncond + guidance_scale * (noise_cond - noise_uncond)

        # DDPM denoise step
        alpha_t = alphas[t]
        alpha_bar_t = alpha_bar[t]
        beta_t = betas[t]

        # Predicted x_0
        x_0_pred = (x_t - (1 - alpha_bar_t).sqrt() * noise_pred) / alpha_bar_t.sqrt()
        x_0_pred = x_0_pred.clamp(-1, 1)

        if t > 0:
            alpha_bar_prev = alpha_bar[t - 1]
            # Posterior mean
            coeff1 = beta_t * alpha_bar_prev.sqrt() / (1 - alpha_bar_t)
            coeff2 = (1 - alpha_bar_prev) * alpha_t.sqrt() / (1 - alpha_bar_t)
            mean = coeff1 * x_0_pred + coeff2 * x_t

            # Posterior variance
            sigma = (beta_t * (1 - alpha_bar_prev) / (1 - alpha_bar_t)).sqrt()
            z = torch.randn_like(x_t)
            x_t = mean + sigma * z
        else:
            x_t = x_0_pred  # Final step: no noise

    return x_t  # Generated image (1, C, H, W)
</code></pre>

<h3 id="pipeline-components-table">5.3 Pipeline Components Summary</h3>

<table>
<thead>
<tr><th>Component</th><th>Vai trò</th><th>Input → Output</th><th>Trainable?</th></tr>
</thead>
<tbody>
<tr><td>CLIP Text Encoder</td><td>Encode text → embeddings</td><td>str → (B, 77, 768)</td><td>Frozen (pretrained)</td></tr>
<tr><td>U-Net (with Cross-Attn)</td><td>Predict noise ε̂</td><td>(x_t, t, text_emb) → ε̂</td><td>Yes — main training target</td></tr>
<tr><td>Noise Schedule</td><td>Define β_t, α_t, ᾱ_t</td><td>t → schedule values</td><td>No (fixed)</td></tr>
<tr><td>CFG</td><td>Combine cond/uncond</td><td>(ε̂_cond, ε̂_uncond, w) → ε̂</td><td>No (inference only)</td></tr>
<tr><td>DDPM Sampler</td><td>Denoise step-by-step</td><td>(x_t, ε̂, t) → x_{t-1}</td><td>No (fixed formula)</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Trong assessment, bạn sẽ nhận code skeleton có sẵn CLIP encoder và schedule. Nhiệm vụ của bạn là implement phần <strong>U-Net forward pass</strong> (có cross-attention) và <strong>sampling loop</strong> (có CFG). Đừng cố viết lại CLIP — nó đã được cung cấp.</p></blockquote>

<h2 id="latent-diffusion">6. Latent Diffusion — Stable Diffusion Overview</h2>

<h3 id="pixel-space-problem">6.1 Vấn đề của Pixel-Space Diffusion</h3>

<p>DDPM gốc thực hiện diffusion trực tiếp trên pixel space. Với ảnh 256×256 RGB, mỗi diffusion step xử lý <strong>196,608 dimensions</strong>. Điều này rất chậm và tốn bộ nhớ.</p>

<p><strong>Latent Diffusion Model (LDM)</strong> — nền tảng của Stable Diffusion — giải quyết vấn đề này bằng cách thực hiện diffusion trong <strong>latent space</strong> nhỏ hơn nhiều.</p>

<pre><code class="language-text">
Pixel Space vs Latent Space Diffusion
══════════════════════════════════════

  PIXEL SPACE (DDPM gốc):
  ────────────────────────
  Image: 256 × 256 × 3 = 196,608 dims
  U-Net phải xử lý tensor RẤT lớn
  ✗ Chậm  ✗ Tốn VRAM  ✗ 1000 steps

  LATENT SPACE (Stable Diffusion):
  ─────────────────────────────────
  Image ──► VAE Encoder ──► Latent: 32 × 32 × 4 = 4,096 dims
                                          │
                              48× NHỎ HƠN │
                                          ▼
                              Diffusion trong latent space
                                          │
                                          ▼
                            Latent ──► VAE Decoder ──► Image

  ┌───────────────────────────────────────────────────────┐
  │  Stable Diffusion Architecture:                       │
  │                                                       │
  │  "a golden retriever"                                 │
  │         │                                             │
  │         ▼                                             │
  │  ┌──────────┐                                         │
  │  │   CLIP   │──── text_emb (1, 77, 768)              │
  │  │ Encoder  │         │                               │
  │  └──────────┘         │                               │
  │                       ▼                               │
  │  z_T (noise) ──► U-Net (latent) ──► z_0 (latent)    │
  │  (1,4,32,32)    + cross-attn      (1,4,32,32)       │
  │                                        │              │
  │                                        ▼              │
  │                                 ┌──────────┐          │
  │                                 │   VAE    │          │
  │                                 │ Decoder  │          │
  │                                 └────┬─────┘          │
  │                                      │                │
  │                                      ▼                │
  │                               Image (1,3,256,256)     │
  └───────────────────────────────────────────────────────┘
</code></pre>

<h3 id="vae-component">6.2 VAE: Encoder & Decoder</h3>

<table>
<thead>
<tr><th>Component</th><th>Pixel Space</th><th>Latent Space</th><th>Compression</th></tr>
</thead>
<tbody>
<tr><td>Image size</td><td>256 × 256 × 3</td><td>32 × 32 × 4</td><td>48× fewer dims</td></tr>
<tr><td>512 × 512 × 3</td><td>786,432 dims</td><td>64 × 64 × 4 = 16,384</td><td>48× fewer dims</td></tr>
<tr><td>U-Net input</td><td>Full resolution pixels</td><td>Compressed latents</td><td>Much faster</td></tr>
<tr><td>Training cost</td><td>Rất cao (nhiều GPU-days)</td><td>Thấp hơn nhiều</td><td>Feasible on 1 GPU</td></tr>
</tbody>
</table>

<pre><code class="language-python">
# Latent Diffusion — sử dụng VAE + U-Net trong latent space
from diffusers import AutoencoderKL

# Load pretrained VAE
vae = AutoencoderKL.from_pretrained("stabilityai/sd-vae-ft-mse")
vae = vae.to(device).eval()

# ── Encode image → latent ──
with torch.no_grad():
    # image: (B, 3, 256, 256), normalized to [-1, 1]
    latent = vae.encode(image).latent_dist.sample()  # (B, 4, 32, 32)
    latent = latent * 0.18215  # scaling factor (Stable Diffusion convention)

# ── Diffusion happens in latent space ──
# x_T = torch.randn(1, 4, 32, 32)  ← noise in latent space
# ... reverse diffusion loop on latents ...

# ── Decode latent → image ──
with torch.no_grad():
    latent_decoded = latent / 0.18215
    image_out = vae.decode(latent_decoded).sample  # (B, 3, 256, 256)
    image_out = (image_out + 1) / 2  # [-1,1] → [0,1]
</code></pre>

<h3 id="ddim-scheduler">6.3 DDIM Scheduler: Fewer Steps</h3>

<p>DDPM cần <strong>1000 steps</strong> cho mỗi image. <strong>DDIM (Denoising Diffusion Implicit Models)</strong> cho phép <strong>deterministic sampling</strong> chỉ với 20–50 steps bằng cách skip timesteps:</p>

<table>
<thead>
<tr><th>Scheduler</th><th>Steps</th><th>Stochastic?</th><th>Quality</th><th>Tốc độ</th></tr>
</thead>
<tbody>
<tr><td>DDPM</td><td>1000</td><td>Yes (random z mỗi step)</td><td>Tốt</td><td>Rất chậm</td></tr>
<tr><td>DDIM</td><td>20–50</td><td>No (deterministic)</td><td>Tương đương</td><td>20–50× nhanh hơn</td></tr>
<tr><td>Euler</td><td>20–30</td><td>Optional</td><td>Tốt</td><td>Nhanh</td></tr>
<tr><td>DPM-Solver</td><td>10–25</td><td>Optional</td><td>Rất tốt</td><td>Nhanh nhất</td></tr>
</tbody>
</table>

<pre><code class="language-text">
DDPM (1000 steps) vs DDIM (50 steps)
═════════════════════════════════════

  DDPM:   x_1000 → x_999 → x_998 → ... → x_1 → x_0
          └──────────── 1000 U-Net calls ────────────┘

  DDIM:   x_1000 → x_980 → x_960 → ... → x_20 → x_0
          └──────────── 50 U-Net calls ──────────────┘
          (skip 20 steps mỗi lần)

  DDIM key insight: non-Markovian — x_{t-k} phụ thuộc x_t & x_0 (predicted)
  → Không cần đi qua từng step trung gian
  → Same quality, 20× faster
</code></pre>

<blockquote><p><strong>Exam tip:</strong> Nếu đề hỏi "Why does Stable Diffusion use 50 steps while DDPM uses 1000?", đáp án liên quan đến <strong>DDIM scheduler</strong> và <strong>latent space</strong>. Hai yếu tố cùng đóng góp: DDIM giảm số steps, latent space giảm kích thước mỗi step.</p></blockquote>

<h2 id="cheat-sheet">7. Cheat Sheet — Part 2 Tổng hợp</h2>

<table>
<thead>
<tr><th>Concept</th><th>Key Formula / Detail</th><th>Exam Focus</th></tr>
</thead>
<tbody>
<tr><td>CLIP Text Encoder</td><td>text → (B, 77, 768) embeddings</td><td>Shape, frozen vs trainable</td></tr>
<tr><td>Contrastive Loss</td><td>CE trên similarity matrix NxN</td><td>Matched pairs ↑, non-matched ↓</td></tr>
<tr><td>Cross-Attention Q</td><td>Q = W_q · image_features</td><td>Q từ image, NOT text</td></tr>
<tr><td>Cross-Attention K, V</td><td>K = W_k · text_emb, V = W_v · text_emb</td><td>K, V từ text, NOT image</td></tr>
<tr><td>Block order trong U-Net</td><td>ResBlock → Self-Attn → Cross-Attn → FFN</td><td>Coding order matters</td></tr>
<tr><td>CFG formula</td><td>ε̂ = ε̂_uncond + w·(ε̂_cond − ε̂_uncond)</td><td>w = 7.5 default, 2 forward passes</td></tr>
<tr><td>Latent space (SD)</td><td>256×256×3 → 32×32×4 via VAE</td><td>48× compression, 4-channel latent</td></tr>
<tr><td>DDIM vs DDPM</td><td>50 vs 1000 steps</td><td>Non-Markovian, deterministic</td></tr>
<tr><td>VAE scaling factor</td><td>0.18215</td><td>Multiply after encode, divide before decode</td></tr>
<tr><td>Pipeline order</td><td>Text → CLIP → U-Net(+CFG) → VAE Decode → Image</td><td>End-to-end flow</td></tr>
</tbody>
</table>

<h2 id="assessment-prep">8. Assessment Prep — DLI S-FX-14 Final Assessment</h2>

<h3 id="assessment-overview">8.1 Assessment Overview</h3>

<p>DLI assessment <strong>S-FX-14</strong> yêu cầu bạn hoàn thành coding tasks trong JupyterLab environment. Bạn sẽ nhận code skeleton với <code># TODO</code> markers và phải implement các phần còn thiếu.</p>

<table>
<thead>
<tr><th>Section</th><th>Nội dung</th><th>Tỷ trọng (ước tính)</th><th>Thời gian gợi ý</th></tr>
</thead>
<tbody>
<tr><td>U-Net architecture</td><td>Implement ResBlock, Attention, CrossAttention</td><td>~30%</td><td>25 phút</td></tr>
<tr><td>DDPM Training</td><td>Forward diffusion, training loop, loss</td><td>~25%</td><td>20 phút</td></tr>
<tr><td>Text conditioning</td><td>CLIP integration, cross-attention wiring</td><td>~25%</td><td>20 phút</td></tr>
<tr><td>Sampling pipeline</td><td>Reverse diffusion + CFG sampling</td><td>~20%</td><td>15 phút</td></tr>
</tbody>
</table>

<h3 id="common-pitfalls">8.2 Common Pitfalls & Fixes</h3>

<table>
<thead>
<tr><th>Pitfall</th><th>Triệu chứng</th><th>Fix</th></tr>
</thead>
<tbody>
<tr><td>Cross-attn K/V from image</td><td>Text prompt không ảnh hưởng output</td><td>Đảm bảo K, V nhận <code>context</code> (text), Q nhận <code>x</code> (image)</td></tr>
<tr><td>Quên L2 normalize CLIP</td><td>Similarity values lệch range</td><td>Thêm <code>/ embed.norm(dim=-1, keepdim=True)</code></td></tr>
<tr><td>CFG guidance_scale = 1.0</td><td>Ảnh chất lượng kém, không theo prompt</td><td>Dùng w = 7.5 hoặc theo đề yêu cầu</td></tr>
<tr><td>Sai shape khi reshape attention</td><td><code>RuntimeError: shape mismatch</code></td><td>Check (B, H, N, d) → (B, N, H*d) ordering</td></tr>
<tr><td>Quên <code>.no_grad()</code> khi sampling</td><td>Out of memory</td><td>Wrap sampling loop trong <code>torch.no_grad()</code></td></tr>
<tr><td>VAE scaling factor sai</td><td>Image output bị washed out hoặc saturated</td><td>Encode: × 0.18215, Decode: ÷ 0.18215</td></tr>
<tr><td>Timestep embedding sai dim</td><td>Size mismatch trong ResBlock</td><td>Verify t_emb dim matches channel dim</td></tr>
</tbody>
</table>

<h3 id="strategy">8.3 Assessment Strategy</h3>

<ol>
<li><strong>Đọc toàn bộ notebook trước</strong> (5 phút) — hiểu flow, xác định TODO blocks</li>
<li><strong>Implement theo thứ tự</strong>: U-Net blocks → forward diffusion → training loop → sampling</li>
<li><strong>Test từng phần</strong>: chạy cell sau mỗi TODO để confirm shape/output đúng</li>
<li><strong>Debug shape errors</strong>: thêm <code>print(tensor.shape)</code> tạm thời</li>
<li><strong>Không viết lại code đã cho</strong> — chỉ fill TODO, giữ nguyên phần khác</li>
</ol>

<blockquote><p><strong>Exam tip:</strong> Assessment cho phép bạn chạy code nhiều lần. Hãy <strong>test incrementally</strong>: implement 1 TODO → chạy cell → verify → tiếp TODO tiếp theo. Đừng cố implement hết rồi mới chạy — sẽ rất khó debug nếu có nhiều lỗi cùng lúc.</p></blockquote>

<h2 id="practice">9. Practice Questions — Coding Exercises</h2>

<p>Các câu hỏi dưới đây mô phỏng dạng bài trong DLI assessment. Hãy cố gắng tự giải trước khi xem đáp án.</p>

<p><strong>Q1: Implement CrossAttention module</strong></p>

<p>Complete the <code>CrossAttention</code> module. Q comes from image features, K and V come from text embeddings. Use multi-head attention with residual connection.</p>

<pre><code class="language-python">
class CrossAttention(nn.Module):
    def __init__(self, d_model=256, context_dim=768, n_heads=8):
        super().__init__()
        self.n_heads = n_heads
        self.d_head = d_model // n_heads
        # TODO: Define to_q, to_k, to_v, out_proj, and norm
        pass

    def forward(self, x, context):
        """
        x: (B, N, d_model) - image features
        context: (B, S, context_dim) - text embeddings
        Returns: (B, N, d_model)
        """
        # TODO: Implement cross-attention
        pass
</code></pre>

<details>
<summary>Xem đáp án Q1</summary>

<pre><code class="language-python">
class CrossAttention(nn.Module):
    def __init__(self, d_model=256, context_dim=768, n_heads=8):
        super().__init__()
        self.n_heads = n_heads
        self.d_head = d_model // n_heads
        self.to_q = nn.Linear(d_model, d_model, bias=False)
        self.to_k = nn.Linear(context_dim, d_model, bias=False)
        self.to_v = nn.Linear(context_dim, d_model, bias=False)
        self.out_proj = nn.Linear(d_model, d_model)
        self.norm = nn.LayerNorm(d_model)

    def forward(self, x, context):
        residual = x
        x = self.norm(x)
        B, N, _ = x.shape
        H, d = self.n_heads, self.d_head

        Q = self.to_q(x).view(B, N, H, d).transpose(1, 2)         # (B, H, N, d)
        K = self.to_k(context).view(B, -1, H, d).transpose(1, 2)   # (B, H, S, d)
        V = self.to_v(context).view(B, -1, H, d).transpose(1, 2)   # (B, H, S, d)

        scale = d ** -0.5
        attn = torch.matmul(Q, K.transpose(-2, -1)) * scale
        attn = F.softmax(attn, dim=-1)

        out = torch.matmul(attn, V)
        out = out.transpose(1, 2).contiguous().view(B, N, H * d)
        out = self.out_proj(out)
        return out + residual
</code></pre>

<p><em>Key point: <code>to_q</code> nhận <code>x</code> (image), <code>to_k</code> và <code>to_v</code> nhận <code>context</code> (text). Đây là điểm khác biệt duy nhất so với self-attention.</em></p>
</details>

<p><strong>Q2: Build full text-to-image sampling pipeline</strong></p>

<p>Given a trained U-Net with cross-attention, CLIP text encoder, and DDPM schedule, implement the complete sampling function with Classifier-Free Guidance.</p>

<pre><code class="language-python">
@torch.no_grad()
def sample_text_to_image(unet, clip_encoder, prompt, schedule,
                          guidance_scale=7.5, H=64, W=64, C=3,
                          device='cuda'):
    """
    Generate image from text prompt.
    Args:
        unet: U-Net with cross-attention (takes x_t, t, context)
        clip_encoder: encodes text → (1, 77, 768)
        prompt: string, e.g. "a cat sitting on a chair"
        schedule: dict with 'betas', 'alphas', 'alpha_bar'
        guidance_scale: CFG weight (w)
    Returns: generated image tensor (1, C, H, W)
    """
    # TODO: Implement full pipeline
    # 1. Encode prompt and null prompt with CLIP
    # 2. Initialize x_T as random noise
    # 3. Reverse diffusion loop with CFG
    # 4. Return x_0
    pass
</code></pre>

<details>
<summary>Xem đáp án Q2</summary>

<pre><code class="language-python">
@torch.no_grad()
def sample_text_to_image(unet, clip_encoder, prompt, schedule,
                          guidance_scale=7.5, H=64, W=64, C=3,
                          device='cuda'):
    T = len(schedule['betas'])
    betas = schedule['betas'].to(device)
    alphas = schedule['alphas'].to(device)
    alpha_bar = schedule['alpha_bar'].to(device)

    # 1. Encode text
    text_emb = clip_encoder.encode(prompt)       # (1, 77, 768)
    null_emb = clip_encoder.encode("")            # (1, 77, 768)

    # 2. Initialize noise
    x_t = torch.randn(1, C, H, W, device=device)

    # 3. Reverse diffusion
    for t in reversed(range(T)):
        t_tensor = torch.tensor([t], device=device)

        # CFG: two forward passes
        eps_cond = unet(x_t, t_tensor, context=text_emb)
        eps_uncond = unet(x_t, t_tensor, context=null_emb)
        eps = eps_uncond + guidance_scale * (eps_cond - eps_uncond)

        # DDPM reverse step
        ab_t = alpha_bar[t]
        a_t = alphas[t]
        b_t = betas[t]

        x0_pred = (x_t - (1 - ab_t).sqrt() * eps) / ab_t.sqrt()
        x0_pred = x0_pred.clamp(-1, 1)

        if t > 0:
            ab_prev = alpha_bar[t - 1]
            c1 = b_t * ab_prev.sqrt() / (1 - ab_t)
            c2 = (1 - ab_prev) * a_t.sqrt() / (1 - ab_t)
            mean = c1 * x0_pred + c2 * x_t
            sigma = (b_t * (1 - ab_prev) / (1 - ab_t)).sqrt()
            x_t = mean + sigma * torch.randn_like(x_t)
        else:
            x_t = x0_pred

    return x_t
</code></pre>

<p><em>Key points: (1) Null embedding cho CFG unconditional path, (2) hai lần forward qua U-Net mỗi step, (3) clamp x0_pred để tránh numerical instability, (4) t=0 không thêm noise.</em></p>
</details>

<p><strong>Q3: Explain why Latent Diffusion uses ~50 steps while DDPM needs 1000</strong></p>

<p>Write a short function that demonstrates the difference between DDPM and DDIM step selection, and explain in comments why DDIM can skip steps.</p>

<pre><code class="language-python">
def compare_schedulers(T=1000, ddim_steps=50):
    """
    Show the difference between DDPM and DDIM timestep selection.
    TODO: Return both timestep sequences and add comments explaining
    why DDIM can skip steps without quality loss.
    """
    # TODO: implement
    pass
</code></pre>

<details>
<summary>Xem đáp án Q3</summary>

<pre><code class="language-python">
import numpy as np

def compare_schedulers(T=1000, ddim_steps=50):
    """
    DDPM: must visit every timestep t = T-1, T-2, ..., 1, 0
      → each step is Markovian: x_{t-1} depends ONLY on x_t
      → cannot skip steps without breaking the Markov chain

    DDIM: can skip timesteps using a non-Markovian formulation
      → x_{t-k} = f(x_t, predicted_x_0) — depends on x_t AND predicted x_0
      → the "shortcut" through predicted x_0 allows jumping multiple steps
      → deterministic (no random noise z added at each step)
    """
    # DDPM: all 1000 steps
    ddpm_steps = list(range(T - 1, -1, -1))  # [999, 998, ..., 1, 0]

    # DDIM: evenly spaced subset
    step_size = T // ddim_steps  # 1000 // 50 = 20
    ddim_timesteps = list(range(T - 1, -1, -step_size))  # [999, 979, 959, ..., 19]

    print(f"DDPM: {len(ddpm_steps)} steps")
    print(f"  First 5: {ddpm_steps[:5]}")
    print(f"  Last  5: {ddpm_steps[-5:]}")

    print(f"\nDDIM: {len(ddim_timesteps)} steps")
    print(f"  First 5: {ddim_timesteps[:5]}")
    print(f"  Last  5: {ddim_timesteps[-5:]}")

    # Key reason: DDIM uses non-Markovian update rule:
    # x_{t-k} = sqrt(ᾱ_{t-k}) * predicted_x0 + sqrt(1 - ᾱ_{t-k}) * direction
    # This formula works for ANY t-k, not just t-1
    # → can skip from t=999 to t=979 directly

    return ddpm_steps, ddim_timesteps
</code></pre>

<p><em>Core insight: DDPM là Markovian (mỗi step chỉ phụ thuộc step trước), DDIM là non-Markovian (phụ thuộc cả predicted x_0). Non-Markovian formulation cho phép "nhảy" qua nhiều steps cùng lúc mà không mất quality đáng kể.</em></p>
</details>

<p><strong>Q4: Debug — Text prompt has no effect on generated image</strong></p>

<p>The following code generates images, but changing the text prompt does NOT change the output. Find and fix the bug.</p>

<pre><code class="language-python">
class BuggyUNetBlock(nn.Module):
    def __init__(self, d_model=256, context_dim=768, n_heads=8):
        super().__init__()
        self.self_attn = nn.MultiheadAttention(d_model, n_heads, batch_first=True)
        self.cross_attn_q = nn.Linear(d_model, d_model)
        self.cross_attn_k = nn.Linear(d_model, d_model)      # BUG HERE?
        self.cross_attn_v = nn.Linear(d_model, d_model)      # BUG HERE?
        self.cross_attn_out = nn.Linear(d_model, d_model)
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)

    def forward(self, x, context):
        # Self-attention
        norm_x = self.norm1(x)
        sa_out, _ = self.self_attn(norm_x, norm_x, norm_x)
        x = x + sa_out

        # Cross-attention
        norm_x = self.norm2(x)
        Q = self.cross_attn_q(norm_x)
        K = self.cross_attn_k(norm_x)    # ← THIS LINE
        V = self.cross_attn_v(norm_x)    # ← AND THIS LINE
        # ... attention computation ...
        return x
</code></pre>

<details>
<summary>Xem đáp án Q4</summary>

<pre><code class="language-python">
# BUG: cross_attn_k and cross_attn_v take norm_x (image features)
# instead of context (text embeddings).
# This makes "cross-attention" effectively another self-attention,
# so text prompt has ZERO effect on the output.

# FIX 1: Change Linear input dimensions
self.cross_attn_k = nn.Linear(context_dim, d_model)  # context_dim, not d_model
self.cross_attn_v = nn.Linear(context_dim, d_model)   # context_dim, not d_model

# FIX 2: Pass context instead of norm_x
K = self.cross_attn_k(context)    # ← FIX: use context, not norm_x
V = self.cross_attn_v(context)    # ← FIX: use context, not norm_x
</code></pre>

<p><em>Two bugs: (1) <code>cross_attn_k</code> và <code>cross_attn_v</code> có input dim = d_model thay vì context_dim, (2) K và V được compute từ <code>norm_x</code> (image) thay vì <code>context</code> (text). Kết quả: U-Net hoàn toàn bỏ qua text conditioning → output giống unconditional generation bất kể prompt.</em></p>
</details>

<p><strong>Q5: Integration test — Assemble working text-to-image system</strong></p>

<p>Given the following pre-built components, write the integration code that connects them into a working text-to-image system and generates one image.</p>

<pre><code class="language-python">
# Pre-built components (already defined):
# - clip_model: has .encode_text(tokens) → (B, 77, 768)
# - unet: has .forward(x_t, t_emb, context) → noise prediction
# - schedule: dict with 'betas', 'alphas', 'alpha_bar' (T=1000)
# - ddpm_reverse_step(x_t, noise_pred, t, schedule) → x_{t-1}

def generate_image(prompt: str, negative_prompt: str = "",
                   guidance_scale: float = 7.5, steps: int = 1000,
                   image_size: int = 64, channels: int = 3):
    """
    TODO: Wire all components together.
    Handle: CLIP encoding, null prompt for CFG, reverse loop, CFG combination.
    Return final image tensor.
    """
    pass
</code></pre>

<details>
<summary>Xem đáp án Q5</summary>

<pre><code class="language-python">
@torch.no_grad()
def generate_image(prompt: str, negative_prompt: str = "",
                   guidance_scale: float = 7.5, steps: int = 1000,
                   image_size: int = 64, channels: int = 3):
    device = next(unet.parameters()).device

    # ── 1. CLIP encode: positive and negative/null prompts ──
    pos_tokens = clip.tokenize([prompt]).to(device)
    neg_tokens = clip.tokenize([negative_prompt]).to(device)

    pos_emb = clip_model.encode_text(pos_tokens)     # (1, 77, 768)
    neg_emb = clip_model.encode_text(neg_tokens)     # (1, 77, 768)

    # ── 2. Initialize random noise ──
    x_t = torch.randn(1, channels, image_size, image_size, device=device)

    # ── 3. Reverse diffusion with CFG ──
    for t in reversed(range(steps)):
        t_tensor = torch.tensor([t], device=device)

        # Two forward passes for CFG
        noise_pos = unet(x_t, t_tensor, context=pos_emb)
        noise_neg = unet(x_t, t_tensor, context=neg_emb)

        # CFG combination
        noise_guided = noise_neg + guidance_scale * (noise_pos - noise_neg)

        # Denoise step
        x_t = ddpm_reverse_step(x_t, noise_guided, t, schedule)

    # ── 4. Post-process ──
    image = (x_t.clamp(-1, 1) + 1) / 2   # [-1,1] → [0,1]
    return image

# Generate!
img = generate_image("a golden retriever playing in snow", guidance_scale=7.5)
print(f"Output shape: {img.shape}")  # (1, 3, 64, 64)
</code></pre>

<p><em>Integration checklist: (1) Encode cả positive và negative prompt, (2) khởi tạo noise đúng shape, (3) loop ngược từ T-1 đến 0, (4) 2 forward passes mỗi step cho CFG, (5) combine với guidance_scale, (6) gọi denoise step, (7) post-process output. Negative prompt rỗng "" hoạt động như unconditional — đây là cách Stable Diffusion xử lý CFG.</em></p>
</details>
