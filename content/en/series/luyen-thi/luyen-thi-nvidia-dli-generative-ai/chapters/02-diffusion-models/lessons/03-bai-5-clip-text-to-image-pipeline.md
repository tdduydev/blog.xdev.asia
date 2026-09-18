---
id: 019c9619-nv01-p2-l05
title: 'Lesson 5: CLIP & Text-to-Image Pipeline'
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
  title: 'NVIDIA DLI Exam Prep — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="gioi-thieu">1. Introduction: From Class Labels to Text Prompts</h2>

<p>In the previous lesson, you implemented <strong>Classifier-Free Guidance (CFG)</strong> with class labels (digits 0–9). But Stable Diffusion doesn't use class labels — it uses free-form <strong>text prompts</strong>. So how do we convert "a photo of a cat" into a tensor that U-Net can understand?</p>

<p>The answer lies in <strong>CLIP (Contrastive Language-Image Pretraining)</strong> — the bridge model between language and images, introduced by OpenAI in 2021. This is the final lesson in the Diffusion Models section, combining all the knowledge you've learned to build a <strong>full text-to-image pipeline</strong>.</p>

<blockquote><p><strong>Exam tip:</strong> DLI assessment <strong>S-FX-14</strong> requires you to combine U-Net, DDPM, CFG, and text conditioning into a complete pipeline. This lesson is the "grand synthesis" — if you thoroughly understand each component from Lessons 3–4 and connect them in Lesson 5, you'll complete the assessment faster.</p></blockquote>

<pre><code class="language-text">
Roadmap: Class Label → Text Prompt Conditioning
════════════════════════════════════════════════

  Lesson 3: U-Net backbone          → Denoiser architecture
  Lesson 4: DDPM + CFG              → Training & sampling with class labels
  Lesson 5: CLIP + Cross-Attention  → Text-to-image pipeline ← YOU ARE HERE
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

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai5-clip-text-to-image.webp" alt="CLIP and Text-to-Image Pipeline — Text Encoder, Cross-Attention, U-Net Denoiser" loading="lazy" /><figcaption>CLIP and Text-to-Image Pipeline — Text Encoder, Cross-Attention, U-Net Denoiser</figcaption></figure>

<h2 id="clip-architecture">2. CLIP — Contrastive Language-Image Pretraining</h2>

<h3 id="clip-dual-encoder">2.1 Dual-Encoder Architecture</h3>

<p><strong>CLIP</strong> consists of two encoders trained simultaneously on 400 million (text, image) pairs from the internet:</p>

<ul>
<li><strong>Text Encoder</strong>: Transformer (similar to GPT) — takes text → outputs embedding vector (512-d or 768-d)</li>
<li><strong>Image Encoder</strong>: ViT (Vision Transformer) or ResNet — takes image → outputs embedding of the same dimension</li>
</ul>

<p>The key point: both encoders output embeddings in the <strong>same vector space</strong>. This allows direct comparison of text and images using <strong>cosine similarity</strong>.</p>

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

<p>CLIP uses a <strong>symmetric cross-entropy loss</strong> on an NxN similarity matrix. With a batch of N (text, image) pairs:</p>

<pre><code class="language-text">
Contrastive Loss — Similarity Matrix
═════════════════════════════════════

  Batch N = 4 pairs (text, image):

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

  Goal: diagonal (✓) → high, rest → low

  Loss = (CE_rows + CE_cols) / 2
       = cross_entropy(logits, labels) for both dimensions

  logits = temperature * text_embeds @ image_embeds.T
  labels = [0, 1, 2, ..., N-1]   ← identity matching
</code></pre>

<p><strong>Temperature parameter</strong> (learnable, initialized ~0.07) controls the sharpness of the distribution. Lower temperature → clearer distinction between positive and negative pairs.</p>

<table>
<thead>
<tr><th>Component</th><th>Details</th><th>In CLIP</th></tr>
</thead>
<tbody>
<tr><td>Text Encoder</td><td>12-layer Transformer, BPE tokenizer</td><td>Max 77 tokens, outputs CLS embedding</td></tr>
<tr><td>Image Encoder</td><td>ViT-B/32 or ViT-L/14</td><td>Splits image into patches, outputs CLS</td></tr>
<tr><td>Embedding dim</td><td>512 (ViT-B/32) or 768 (ViT-L/14)</td><td>Shared space between text & image</td></tr>
<tr><td>Training data</td><td>400M image-text pairs (WIT dataset)</td><td>Crawled from the internet</td></tr>
<tr><td>Loss function</td><td>Symmetric cross-entropy</td><td>InfoNCE / NT-Xent variant</td></tr>
<tr><td>Temperature</td><td>Learnable scalar τ</td><td>Init ≈ 0.07, learned during training</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> CLIP does <strong>not generate</strong> images — it only encodes text and images into a shared space. In the text-to-image pipeline, we only use CLIP's <strong>Text Encoder</strong> to create the conditioning signal for U-Net. The Image Encoder is not used during generation.</p></blockquote>

<h2 id="using-clip">3. Using CLIP Encodings in Code</h2>

<h3 id="clip-load">3.1 Load CLIP and Encode Text</h3>

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

<h3 id="clip-image">3.2 Encode Image and Compute Similarity</h3>

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

<p>Result: text and images with matching content have the highest similarity. This is the power of the <strong>shared embedding space</strong> — you can search images by text or vice versa.</p>

<h3 id="clip-for-diffusion">3.3 CLIP for Diffusion Models: Sequence Embeddings</h3>

<p>Important: Stable Diffusion does <strong>not use the CLS embedding</strong> (a single vector). Instead, it uses the <strong>sequence of token embeddings</strong> from CLIP Text Encoder — the output before the projection layer:</p>

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

  Stable Diffusion uses: ALL 77 token embeddings → (1, 77, 768)
  CLIP zero-shot uses:   ONLY the EOS token embedding → (1, 768)
</code></pre>

<table>
<thead>
<tr><th>Use Case</th><th>Output</th><th>Shape</th><th>Reason</th></tr>
</thead>
<tbody>
<tr><td>CLIP classification</td><td>CLS / EOS token</td><td>(B, 768)</td><td>Global similarity comparison</td></tr>
<tr><td>Stable Diffusion</td><td>Full token sequence</td><td>(B, 77, 768)</td><td>Cross-attention needs per-token info</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> If the question asks "What is the shape of the text conditioning input to the U-Net?", the answer is <strong>(batch, 77, 768)</strong> — NOT (batch, 768). Cross-attention needs a sequence, not a single vector.</p></blockquote>

<h2 id="cross-attention">4. Cross-Attention: Injecting Text Embeddings into U-Net</h2>

<h3 id="cross-attn-mechanism">4.1 Cross-Attention Mechanism</h3>

<p>In Lesson 3, U-Net used <strong>self-attention</strong> — Q, K, V all come from image features. <strong>Cross-attention</strong> changes the source of K and V:</p>

<pre><code class="language-text">
Self-Attention vs Cross-Attention
═════════════════════════════════

  SELF-ATTENTION (in U-Net):
  ───────────────────────────────
  Q = W_q · image_features    ← from image
  K = W_k · image_features    ← from image
  V = W_v · image_features    ← from image

  Attention = softmax(Q · K^T / √d) · V

  CROSS-ATTENTION (text → image):
  ────────────────────────────────
  Q = W_q · image_features    ← from image (queries)
  K = W_k · text_embeddings   ← from CLIP text (keys)
  V = W_v · text_embeddings   ← from CLIP text (values)

  Attention = softmax(Q_image · K_text^T / √d) · V_text

  ┌──────────────────────────────────────────────────┐
  │  Q shape: (B, H*W, d_model)    ← spatial pixels  │
  │  K shape: (B, 77, d_model)     ← text tokens      │
  │  V shape: (B, 77, d_model)     ← text tokens      │
  │  Score:   (B, H*W, 77)        ← pixel-to-token    │
  │  Output:  (B, H*W, d_model)    ← text-aware image │
  └──────────────────────────────────────────────────┘
</code></pre>

<p>Each pixel "looks at" all 77 text tokens and decides which token to attend to. Pixels in the cat region will strongly attend to the "cat" token, pixels in the sky region attend to "sky".</p>

<h3 id="cross-attn-unet-block">4.2 Cross-Attention in U-Net Block</h3>

<pre><code class="language-text">
U-Net Block with Cross-Attention
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

  Order within each block: ResBlock → Self-Attn → Cross-Attn → FFN
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

<h3 id="unet-block-with-cross">4.4 U-Net Block Combining Self-Attention + Cross-Attention</h3>

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

<blockquote><p><strong>Exam tip:</strong> A common mistake in the assessment: setting K, V from image instead of text. If cross-attention takes K, V from image features → the text prompt will have no effect → output will be the same as unconditional generation. Debug tip: check whether <code>self.to_k</code> and <code>self.to_v</code> receive <strong>context</strong> (text) or <strong>x</strong> (image).</p></blockquote>

<h2 id="full-pipeline">5. Full Text-to-Image Pipeline</h2>

<h3 id="pipeline-overview">5.1 Overview: Combining All Components</h3>

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
<tr><th>Component</th><th>Role</th><th>Input → Output</th><th>Trainable?</th></tr>
</thead>
<tbody>
<tr><td>CLIP Text Encoder</td><td>Encode text → embeddings</td><td>str → (B, 77, 768)</td><td>Frozen (pretrained)</td></tr>
<tr><td>U-Net (with Cross-Attn)</td><td>Predict noise ε̂</td><td>(x_t, t, text_emb) → ε̂</td><td>Yes — main training target</td></tr>
<tr><td>Noise Schedule</td><td>Define β_t, α_t, ᾱ_t</td><td>t → schedule values</td><td>No (fixed)</td></tr>
<tr><td>CFG</td><td>Combine cond/uncond</td><td>(ε̂_cond, ε̂_uncond, w) → ε̂</td><td>No (inference only)</td></tr>
<tr><td>DDPM Sampler</td><td>Denoise step-by-step</td><td>(x_t, ε̂, t) → x_{t-1}</td><td>No (fixed formula)</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> In the assessment, you'll receive a code skeleton with the CLIP encoder and schedule already provided. Your task is to implement the <strong>U-Net forward pass</strong> (with cross-attention) and the <strong>sampling loop</strong> (with CFG). Don't try to rewrite CLIP — it's already provided.</p></blockquote>

<h2 id="latent-diffusion">6. Latent Diffusion — Stable Diffusion Overview</h2>

<h3 id="pixel-space-problem">6.1 The Problem with Pixel-Space Diffusion</h3>

<p>The original DDPM performs diffusion directly in pixel space. For a 256×256 RGB image, each diffusion step processes <strong>196,608 dimensions</strong>. This is very slow and memory-intensive.</p>

<p><strong>Latent Diffusion Model (LDM)</strong> — the foundation of Stable Diffusion — solves this by performing diffusion in a much smaller <strong>latent space</strong>.</p>

<pre><code class="language-text">
Pixel Space vs Latent Space Diffusion
══════════════════════════════════════

  PIXEL SPACE (original DDPM):
  ────────────────────────
  Image: 256 × 256 × 3 = 196,608 dims
  U-Net must process a VERY large tensor
  ✗ Slow  ✗ High VRAM  ✗ 1000 steps

  LATENT SPACE (Stable Diffusion):
  ─────────────────────────────────
  Image ──► VAE Encoder ──► Latent: 32 × 32 × 4 = 4,096 dims
                                          │
                              48× SMALLER  │
                                          ▼
                              Diffusion in latent space
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
<tr><td>Training cost</td><td>Very high (many GPU-days)</td><td>Much lower</td><td>Feasible on 1 GPU</td></tr>
</tbody>
</table>

<pre><code class="language-python">
# Latent Diffusion — using VAE + U-Net in latent space
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

<p>DDPM requires <strong>1000 steps</strong> per image. <strong>DDIM (Denoising Diffusion Implicit Models)</strong> enables <strong>deterministic sampling</strong> with only 20–50 steps by skipping timesteps:</p>

<table>
<thead>
<tr><th>Scheduler</th><th>Steps</th><th>Stochastic?</th><th>Quality</th><th>Speed</th></tr>
</thead>
<tbody>
<tr><td>DDPM</td><td>1000</td><td>Yes (random z each step)</td><td>Good</td><td>Very slow</td></tr>
<tr><td>DDIM</td><td>20–50</td><td>No (deterministic)</td><td>Comparable</td><td>20–50× faster</td></tr>
<tr><td>Euler</td><td>20–30</td><td>Optional</td><td>Good</td><td>Fast</td></tr>
<tr><td>DPM-Solver</td><td>10–25</td><td>Optional</td><td>Very good</td><td>Fastest</td></tr>
</tbody>
</table>

<pre><code class="language-text">
DDPM (1000 steps) vs DDIM (50 steps)
═════════════════════════════════════

  DDPM:   x_1000 → x_999 → x_998 → ... → x_1 → x_0
          └──────────── 1000 U-Net calls ────────────┘

  DDIM:   x_1000 → x_980 → x_960 → ... → x_20 → x_0
          └──────────── 50 U-Net calls ──────────────┘
          (skip 20 steps each time)

  DDIM key insight: non-Markovian — x_{t-k} depends on x_t & x_0 (predicted)
  → No need to go through each intermediate step
  → Same quality, 20× faster
</code></pre>

<blockquote><p><strong>Exam tip:</strong> If the question asks "Why does Stable Diffusion use 50 steps while DDPM uses 1000?", the answer relates to the <strong>DDIM scheduler</strong> and <strong>latent space</strong>. Both factors contribute: DDIM reduces the number of steps, latent space reduces the size of each step.</p></blockquote>

<h2 id="cheat-sheet">7. Cheat Sheet — Part 2 Summary</h2>

<table>
<thead>
<tr><th>Concept</th><th>Key Formula / Detail</th><th>Exam Focus</th></tr>
</thead>
<tbody>
<tr><td>CLIP Text Encoder</td><td>text → (B, 77, 768) embeddings</td><td>Shape, frozen vs trainable</td></tr>
<tr><td>Contrastive Loss</td><td>CE on NxN similarity matrix</td><td>Matched pairs ↑, non-matched ↓</td></tr>
<tr><td>Cross-Attention Q</td><td>Q = W_q · image_features</td><td>Q from image, NOT text</td></tr>
<tr><td>Cross-Attention K, V</td><td>K = W_k · text_emb, V = W_v · text_emb</td><td>K, V from text, NOT image</td></tr>
<tr><td>Block order in U-Net</td><td>ResBlock → Self-Attn → Cross-Attn → FFN</td><td>Coding order matters</td></tr>
<tr><td>CFG formula</td><td>ε̂ = ε̂_uncond + w·(ε̂_cond − ε̂_uncond)</td><td>w = 7.5 default, 2 forward passes</td></tr>
<tr><td>Latent space (SD)</td><td>256×256×3 → 32×32×4 via VAE</td><td>48× compression, 4-channel latent</td></tr>
<tr><td>DDIM vs DDPM</td><td>50 vs 1000 steps</td><td>Non-Markovian, deterministic</td></tr>
<tr><td>VAE scaling factor</td><td>0.18215</td><td>Multiply after encode, divide before decode</td></tr>
<tr><td>Pipeline order</td><td>Text → CLIP → U-Net(+CFG) → VAE Decode → Image</td><td>End-to-end flow</td></tr>
</tbody>
</table>

<h2 id="assessment-prep">8. Assessment Prep — DLI S-FX-14 Final Assessment</h2>

<h3 id="assessment-overview">8.1 Assessment Overview</h3>

<p>DLI assessment <strong>S-FX-14</strong> requires you to complete coding tasks in a JupyterLab environment. You'll receive a code skeleton with <code># TODO</code> markers and must implement the missing parts.</p>

<table>
<thead>
<tr><th>Section</th><th>Content</th><th>Estimated Weight</th><th>Suggested Time</th></tr>
</thead>
<tbody>
<tr><td>U-Net architecture</td><td>Implement ResBlock, Attention, CrossAttention</td><td>~30%</td><td>25 minutes</td></tr>
<tr><td>DDPM Training</td><td>Forward diffusion, training loop, loss</td><td>~25%</td><td>20 minutes</td></tr>
<tr><td>Text conditioning</td><td>CLIP integration, cross-attention wiring</td><td>~25%</td><td>20 minutes</td></tr>
<tr><td>Sampling pipeline</td><td>Reverse diffusion + CFG sampling</td><td>~20%</td><td>15 minutes</td></tr>
</tbody>
</table>

<h3 id="common-pitfalls">8.2 Common Pitfalls & Fixes</h3>

<table>
<thead>
<tr><th>Pitfall</th><th>Symptom</th><th>Fix</th></tr>
</thead>
<tbody>
<tr><td>Cross-attn K/V from image</td><td>Text prompt has no effect on output</td><td>Ensure K, V receive <code>context</code> (text), Q receives <code>x</code> (image)</td></tr>
<tr><td>Forgot L2 normalize CLIP</td><td>Similarity values out of expected range</td><td>Add <code>/ embed.norm(dim=-1, keepdim=True)</code></td></tr>
<tr><td>CFG guidance_scale = 1.0</td><td>Low quality images, doesn't follow prompt</td><td>Use w = 7.5 or as specified in the problem</td></tr>
<tr><td>Wrong shape when reshaping attention</td><td><code>RuntimeError: shape mismatch</code></td><td>Check (B, H, N, d) → (B, N, H*d) ordering</td></tr>
<tr><td>Forgot <code>.no_grad()</code> during sampling</td><td>Out of memory</td><td>Wrap sampling loop in <code>torch.no_grad()</code></td></tr>
<tr><td>Wrong VAE scaling factor</td><td>Image output looks washed out or saturated</td><td>Encode: × 0.18215, Decode: ÷ 0.18215</td></tr>
<tr><td>Timestep embedding wrong dim</td><td>Size mismatch in ResBlock</td><td>Verify t_emb dim matches channel dim</td></tr>
</tbody>
</table>

<h3 id="strategy">8.3 Assessment Strategy</h3>

<ol>
<li><strong>Read the entire notebook first</strong> (5 minutes) — understand the flow, identify TODO blocks</li>
<li><strong>Implement in order</strong>: U-Net blocks → forward diffusion → training loop → sampling</li>
<li><strong>Test each part</strong>: run the cell after each TODO to confirm correct shape/output</li>
<li><strong>Debug shape errors</strong>: temporarily add <code>print(tensor.shape)</code></li>
<li><strong>Don't rewrite provided code</strong> — only fill in TODOs, keep everything else unchanged</li>
</ol>

<blockquote><p><strong>Exam tip:</strong> The assessment allows you to run code multiple times. <strong>Test incrementally</strong>: implement 1 TODO → run cell → verify → move to next TODO. Don't try to implement everything before running — it will be very difficult to debug if there are multiple errors at once.</p></blockquote>

<h2 id="practice">9. Practice Questions — Coding Exercises</h2>

<p>The questions below simulate the format of the DLI assessment. Try to solve them yourself before checking the answers.</p>

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
<summary>Show Answer Q1</summary>

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

<p><em>Key point: <code>to_q</code> receives <code>x</code> (image), <code>to_k</code> and <code>to_v</code> receive <code>context</code> (text). This is the only difference compared to self-attention.</em></p>
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
<summary>Show Answer Q2</summary>

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

<p><em>Key points: (1) Null embedding for CFG unconditional path, (2) two forward passes through U-Net per step, (3) clamp x0_pred to avoid numerical instability, (4) no noise at t=0.</em></p>
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
<summary>Show Answer Q3</summary>

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
    # x_{t-k} = sqrt(ᾱ_{t-k}) * predicted_x0 + sqrt(1 - ᾱ_{t-k}) * direction
    # This formula works for ANY t-k, not just t-1
    # → can skip from t=999 to t=979 directly

    return ddpm_steps, ddim_timesteps
</code></pre>

<p><em>Core insight: DDPM is Markovian (each step depends only on the previous step), while DDIM is non-Markovian (depends on predicted x_0 as well). The non-Markovian formulation allows "jumping" through multiple steps at once without significant quality loss.</em></p>
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
<summary>Show Answer Q4</summary>

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

<p><em>Two bugs: (1) <code>cross_attn_k</code> and <code>cross_attn_v</code> have input dim = d_model instead of context_dim, (2) K and V are computed from <code>norm_x</code> (image) instead of <code>context</code> (text). Result: the U-Net completely ignores text conditioning → output is the same as unconditional generation regardless of the prompt.</em></p>
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
<summary>Show Answer Q5</summary>

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

<p><em>Integration checklist: (1) Encode both positive and negative prompts, (2) initialize noise with correct shape, (3) loop in reverse from T-1 to 0, (4) two forward passes per step for CFG, (5) combine with guidance_scale, (6) call denoise step, (7) post-process output. An empty negative prompt "" acts as unconditional — this is how Stable Diffusion handles CFG.</em></p>
</details>
