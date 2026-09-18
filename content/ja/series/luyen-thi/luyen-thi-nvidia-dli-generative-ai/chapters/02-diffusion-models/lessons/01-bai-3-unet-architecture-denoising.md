---
id: 019c9619-nv01-p2-l03
title: '第3課：U-Netアーキテクチャとデノイジングの基礎'
slug: bai-3-unet-architecture-denoising
description: >-
  U-Netのエンコーダ・デコーダとスキップ接続。
  PyTorchでU-Netをゼロから構築。デノイザーモデルの学習。
  Group Normalization、GELU活性化関数、Rearrange Pooling。
  タイムステップエンコーディングのためのSinusoidal Position Embeddings。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 3
section_title: "パート2：Diffusion Modelsによる生成AI"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'NVIDIA DLI 試験対策 — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="gioi-thieu">1. はじめに：なぜU-NetがDiffusion Modelsの心臓部なのか？</h2>

<p>前のレッスンでは、<strong>フォワードプロセス</strong>が各タイムステップで画像にノイズを加えることを理解しました。ここで問題となるのは、どのモデルが<strong>デノイジング</strong>（このプロセスを逆転させること）を学習するのかということです。その答えが<strong>U-Net</strong>です。</p>

<p><strong>U-Net</strong>は元々、医療画像における<strong>画像セグメンテーション</strong>のために設計されました（2015年、Ronneberger et al.）。エンコーダ・デコーダと<strong>スキップ接続</strong>を持つ特別なアーキテクチャにより、複数の抽象度レベルで特徴を学習しながら空間的な詳細を保持できます。これはまさにDiffusion Modelsが必要とするものです。</p>

<blockquote><p><strong>試験のヒント：</strong> 評価試験では、U-Netをゼロから実装する必要があります。各レイヤーを通るテンソルの次元を理解することが鍵です。NVIDIA DLIでは、理論を理解するだけでなく、動作するコードを書くことが求められます。</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai3-unet-architecture.webp" alt="U-Netアーキテクチャ — 画像デノイジングのためのスキップ接続付きエンコーダ・デコーダ" loading="lazy" /><figcaption>U-Netアーキテクチャ — 画像デノイジングのためのスキップ接続付きエンコーダ・デコーダ</figcaption></figure>

<h2 id="unet-architecture">2. U-Netアーキテクチャ：スキップ接続付きエンコーダ・デコーダ</h2>

<h3 id="tong-quan-kien-truc">2.1 アーキテクチャの概要</h3>

<p>U-Netは「U」字型をしており、3つの主要部分で構成されています：</p>

<ul>
<li><strong>エンコーダ（縮小パス）</strong>：空間解像度を下げ、チャネル数を増やす — 高レベルの抽象的な特徴を学習します</li>
<li><strong>ボトルネック</strong>：最小の空間解像度、最大のチャネル数 — グローバルなコンテキストを捉えます</li>
<li><strong>デコーダ（拡大パス）</strong>：空間解像度を上げ、チャネル数を減らす — 詳細を復元します</li>
<li><strong>スキップ接続</strong>：エンコーダの特徴を対応するデコーダに直接接続 — 細かい詳細を保持します</li>
</ul>

<pre><code class="language-text">
U-Net Architecture for Diffusion (input 64×64×1)
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

  + Timestep Embedding ──► 各ResidualBlockにlinear projectionで注入
</code></pre>

<h3 id="encoder-path">2.2 エンコーダパス（縮小）</h3>

<p>各エンコーダレベルでは以下の処理を行います：</p>

<ol>
<li><strong>畳み込み</strong>：3×3 conv、padding=1（空間サイズを維持）</li>
<li><strong>Group Normalization</strong>：バッチではなくグループ単位で正規化</li>
<li><strong>GELU活性化</strong>：ReLUよりも滑らかな非線形関数</li>
<li><strong>ダウンサンプル</strong>：空間解像度を2倍に縮小（stride=2 convまたはRearrange Poolingを使用）</li>
</ol>

<p>各レベルで<strong>チャネル数は2倍</strong>に、<strong>空間は半分</strong>になります。例えば：</p>

<table>
<thead>
<tr><th>レベル</th><th>入力形状</th><th>出力形状</th><th>操作</th></tr>
</thead>
<tbody>
<tr><td>0</td><td>B × 1 × 64 × 64</td><td>B × 64 × 64 × 64</td><td>初期Conv</td></tr>
<tr><td>1</td><td>B × 64 × 64 × 64</td><td>B × 128 × 32 × 32</td><td>ResBlock → Down</td></tr>
<tr><td>2</td><td>B × 128 × 32 × 32</td><td>B × 256 × 16 × 16</td><td>ResBlock → Down</td></tr>
<tr><td>3</td><td>B × 256 × 16 × 16</td><td>B × 512 × 8 × 8</td><td>ResBlock → Down</td></tr>
</tbody>
</table>

<h3 id="decoder-path">2.3 デコーダパス（拡大）</h3>

<p>エンコーダとは逆に、デコーダは<strong>空間を増加</strong>させ、<strong>チャネルを減少</strong>させます：</p>

<ol>
<li><strong>アップサンプル</strong>：空間解像度を2倍に拡大（通常<code>nn.Upsample</code>または<code>nn.ConvTranspose2d</code>を使用）</li>
<li>同じレベルのエンコーダからのスキップ接続と<strong>結合</strong></li>
<li><strong>畳み込み → GroupNorm → GELU</strong>：結合された特徴を処理</li>
</ol>

<blockquote><p><strong>試験のヒント：</strong> スキップ接続を結合する際、チャネル数は<strong>一時的に2倍</strong>になります。例えば：アップサンプル出力が256チャネル + スキップが256チャネル = convへの入力は512チャネル。これは実装でよくあるエラーです — concat後のconvの<code>in_channels</code>に注意してください！</p></blockquote>

<h3 id="skip-connections">2.4 スキップ接続 — なぜ重要なのか？</h3>

<p>スキップ接続がなければ、デコーダは8×8のボトルネックだけからすべての空間的詳細を「推測」しなければなりません — ほぼ不可能です。スキップ接続は以下を可能にします：</p>

<ul>
<li><strong>勾配の流れ</strong>：勾配が損失関数から深いエンコーダ層に直接流れる — 学習が容易になります</li>
<li><strong>詳細の保持</strong>：高レベルのエンコーダがエッジやテクスチャを保持 — デコーダは再学習する代わりにそれらを再利用します</li>
<li><strong>マルチスケール特徴</strong>：デコーダは高レベル（ボトルネックから）と低レベル（スキップから）の両方の特徴を受け取ります</li>
</ul>

<h2 id="key-components">3. 主要コンポーネント：GroupNorm、GELU、Rearrange Pooling</h2>

<h3 id="group-normalization">3.1 Group Normalization</h3>

<p>Diffusion Modelsでは、各画像が多くのGPUメモリを消費するため、<strong>バッチサイズは通常非常に小さい</strong>（4〜8）です。<strong>Batch Normalization</strong>は、バッチ全体で計算される統計量（平均、分散）が不安定になるため、小さいバッチでは性能が低下します。</p>

<p><strong>Group Normalization</strong>は、チャネルを<strong>グループ</strong>に分割し、<strong>各グループ内で、各サンプルを独立に</strong>正規化することでこの問題を解決します — バッチサイズに依存しません。</p>

<pre><code class="language-text">
Group Normalization vs Batch Normalization
══════════════════════════════════════════

Batch Normalization:              Group Normalization:
  N（バッチ）全体で正規化            Cのグループ内で正規化

  ┌───┬───┬───┬───┐               ┌───┬───┬───┬───┐
  │ N │   │   │   │               │   │   │   │   │  N (batch)
  ├───┼───┼───┼───┤               ├───┼───┼───┼───┤
  │   │   │   │   │  C            │ G1│ G1│ G2│ G2│  C (channels)
  ├───┼───┼───┼───┤  (channels)   ├───┼───┼───┼───┤  グループに分割
  │   │   │   │   │               │ G1│ G1│ G2│ G2│
  ├───┼───┼───┼───┤               ├───┼───┼───┼───┤
  │   │   │   │   │  H×W          │   │   │   │   │  H×W
  └───┴───┴───┴───┘               └───┴───┴───┴───┘
     ▲                                 ▲
     列を正規化（N全体）               ブロックを正規化（グループ内）
     ⚠ 小バッチ → 不安定               ✓ バッチサイズに依存しない
</code></pre>

<pre><code class="language-python">
import torch.nn as nn

# GroupNorm: 64チャネルを8グループに分割（各グループ8チャネル）
norm = nn.GroupNorm(num_groups=8, num_channels=64)

# 入力形状 (B, 64, 32, 32) の場合:
# - 64チャネルを8グループ、各8チャネルに分割
# - 各サンプル、各グループで (8, 32, 32) = 8192要素の平均・分散を計算
# - 各サンプル、各グループで独立に正規化

x = torch.randn(4, 64, 32, 32)
out = norm(x)  # shape: (4, 64, 32, 32) — 形状は変化しない
</code></pre>

<table>
<thead>
<tr><th>特徴</th><th>BatchNorm</th><th>GroupNorm</th><th>LayerNorm</th><th>InstanceNorm</th></tr>
</thead>
<tbody>
<tr><td>正規化の対象</td><td>バッチ (N)</td><td>チャネルグループ</td><td>全チャネル</td><td>各チャネル</td></tr>
<tr><td>バッチサイズ依存</td><td>あり ⚠</td><td>なし ✓</td><td>なし ✓</td><td>なし ✓</td></tr>
<tr><td>小バッチ性能</td><td>低い</td><td>良好</td><td>普通</td><td>普通</td></tr>
<tr><td>用途</td><td>分類</td><td>Diffusion、検出</td><td>Transformer (NLP)</td><td>スタイル変換</td></tr>
<tr><td>PyTorch API</td><td><code>nn.BatchNorm2d(C)</code></td><td><code>nn.GroupNorm(G, C)</code></td><td><code>nn.LayerNorm(shape)</code></td><td><code>nn.InstanceNorm2d(C)</code></td></tr>
</tbody>
</table>

<h3 id="gelu-activation">3.2 GELU活性化関数</h3>

<p><strong>GELU</strong>（Gaussian Error Linear Unit）は、現代のモデル（Transformer、Diffusion Models）における標準的な活性化関数です。「ハードな」ReLU（負の値を0に切り捨て）とは異なり、GELUは滑らかで、負の値の一部が「漏れる」ことを許容します。</p>

<p>数式：<strong>GELU(x) = x · Φ(x)</strong>、ここでΦ(x)は標準正規分布の累積分布関数です。</p>

<pre><code class="language-text">
活性化関数の比較
═══════════════════════════════

 出力                              出力
   │     ReLU                          │     GELU
   │      ╱                            │      ╱
   │     ╱                             │    ╱
   │    ╱                              │  ╱
───┼───╱────── 入力            ───┼──╱─────── 入力
   │  ╱                              ╱│
   │ ╱                              ╱ │
   │╱  (0でハードカットオフ)       ╱  │  (滑らかな曲線、小さな
   │                             ╱    │   負の値を許容)

 ReLU(x) = max(0, x)           GELU(x) = x · Φ(x)
 ⚠ 死んだニューロン問題          ✓ より滑らかな勾配の流れ
 ⚠ 0で微分不可能                 ✓ 深いネットワークに適している
</code></pre>

<pre><code class="language-python">
import torch.nn as nn

# 方法1: モジュールを使用
activation = nn.GELU()
out = activation(x)

# 方法2: functionalを使用
import torch.nn.functional as F
out = F.gelu(x)

# 方法3: 近似版（高速、DLIコースで使用）
activation = nn.GELU(approximate='tanh')
</code></pre>

<h3 id="rearrange-pooling">3.3 Rearrange Pooling（空間→チャネル変換）</h3>

<p><strong>Rearrange Pooling</strong>は、MaxPool/AvgPoolを置き換えるダウンサンプリング手法です。情報を捨てる（MaxPoolは最大値を選択、AvgPoolは平均を取る）代わりに、Rearrangeは空間次元をチャネル次元に「折り畳み」ます — <strong>すべて</strong>の情報を保持します。</p>

<pre><code class="language-text">
Rearrange Pooling: (B, C, 2H, 2W) → (B, 4C, H, W)
════════════════════════════════════════════════════

Input: (B, C, 4, 4)                   Output: (B, 4C, 2, 2)

Channel c:                             4チャネル（各「位置」に対応）:
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
空間: 4×4、チャネル: C                 ├───┼───┤       ├───┼───┤
                                       │ k │ o │       │ l │ p │
                                       └───┴───┘       └───┴───┘

                                       空間: 2×2、チャネル: 4C
                                       ✓ 情報の損失なし！
</code></pre>

<pre><code class="language-python">
from einops import rearrange

def rearrange_downsample(x):
    """空間次元をチャネルに再配置してダウンサンプル。
    (B, C, H, W) -> (B, 4C, H/2, W/2)
    """
    return rearrange(x, 'b c (h p1) (w p2) -> b (c p1 p2) h w', p1=2, p2=2)

# 例:
x = torch.randn(2, 64, 32, 32)
out = rearrange_downsample(x)
print(out.shape)  # torch.Size([2, 256, 16, 16])

# einopsなしで、純粋なPyTorchを使用:
def rearrange_downsample_pure(x):
    B, C, H, W = x.shape
    x = x.reshape(B, C, H // 2, 2, W // 2, 2)
    x = x.permute(0, 1, 3, 5, 2, 4)  # (B, C, 2, 2, H/2, W/2)
    x = x.reshape(B, C * 4, H // 2, W // 2)
    return x
</code></pre>

<table>
<thead>
<tr><th>ダウンサンプリング手法</th><th>情報の損失</th><th>チャネルの変化</th><th>Diffusionでの使用</th></tr>
</thead>
<tbody>
<tr><td>MaxPool2d</td><td>高い（最大値のみ保持）</td><td>変化なし</td><td>ほとんど使用されない</td></tr>
<tr><td>AvgPool2d</td><td>中程度（平均を取る）</td><td>変化なし</td><td>ほとんど使用されない</td></tr>
<tr><td>Stride-2 Conv</td><td>学習可能（訓練可能）</td><td>設定可能</td><td>一般的</td></tr>
<tr><td>Rearrange Pooling</td><td>なし ✓</td><td>×4</td><td>NVIDIA DLIコース ✓</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のヒント：</strong> NVIDIA DLIではMaxPoolの代わりに<strong>Rearrange Pooling</strong>を使用します。評価試験では、<code>einops.rearrange</code>または純粋なPyTorch（<code>reshape</code> + <code>permute</code>）でこの関数を実装する必要があるかもしれません。空間が各次元で2倍縮小すると、チャネルは<strong>4倍</strong>に増加することを覚えておいてください。</p></blockquote>

<h2 id="sinusoidal-embeddings">4. タイムステップのためのSinusoidal Position Embeddings</h2>

<h3 id="tai-sao-can-timestep">4.1 なぜTimestep Embeddingが必要なのか？</h3>

<p>U-Netは適切にデノイジングするために、拡散プロセスの中で現在どの<strong>タイムステップ</strong>にいるかを知る必要があります：</p>

<ul>
<li>大きなタイムステップ（tがTに近い）：画像はほぼ純粋なノイズ → モデルは全体的な構造を復元する必要があります</li>
<li>小さなタイムステップ（tが0に近い）：画像はほぼクリーン → モデルは小さな詳細を微調整するだけです</li>
</ul>

<p>整数のタイムステップ<strong>t</strong>を長さ<code>embed_dim</code>の<strong>連続的な埋め込みベクトル</strong>に変換し、U-Netの各レイヤーに注入します。</p>

<h3 id="sinusoidal-formula">4.2 Sinusoidal Embeddingの数式</h3>

<p>Transformerの<strong>Positional Encoding</strong>と同じです（「Attention Is All You Need」）：</p>

<pre><code class="language-text">
PE(t, 2i)   = sin(t / 10000^(2i/d))
PE(t, 2i+1) = cos(t / 10000^(2i/d))

ここで:
  t = タイムステップ（整数: 0, 1, 2, ..., T）
  d = 埋め込み次元（例: 128）
  i = 埋め込みベクトル内のインデックス（0, 1, 2, ..., d/2 - 1）

d=8の例:
  PE(t) = [sin(t/1), cos(t/1), sin(t/100), cos(t/100),
           sin(t/10000), cos(t/10000), sin(t/1000000), cos(t/1000000)]
  
  → 低周波成分（末尾）: ゆっくり変化 → 「大まかな」タイムステップをエンコード
  → 高周波成分（先頭）: 速く変化 → 細かいタイムステップの違いをエンコード
</code></pre>

<h3 id="implement-timestep-embedding">4.3 TimestepEmbeddingの実装</h3>

<pre><code class="language-python">
import torch
import torch.nn as nn
import math

class SinusoidalPositionEmbedding(nn.Module):
    """整数タイムステップをsinusoidal埋め込みベクトルに変換。"""
    
    def __init__(self, embed_dim):
        super().__init__()
        self.embed_dim = embed_dim
    
    def forward(self, timesteps):
        """
        Args:
            timesteps: (B,) — 整数タイムステップ
        Returns:
            embeddings: (B, embed_dim) — sinusoidal埋め込み
        """
        device = timesteps.device
        half_dim = self.embed_dim // 2
        
        # 周波数を計算: 1/10000^(2i/d)、i = 0, 1, ..., d/2-1
        exponent = torch.arange(half_dim, device=device).float() / half_dim
        freqs = torch.exp(-math.log(10000.0) * exponent)  # shape: (d/2,)
        
        # タイムステップと周波数を乗算: (B, 1) * (1, d/2) = (B, d/2)
        args = timesteps[:, None].float() * freqs[None, :]
        
        # sinとcosを結合: (B, d/2) cat (B, d/2) = (B, d)
        embeddings = torch.cat([torch.sin(args), torch.cos(args)], dim=-1)
        
        return embeddings  # shape: (B, embed_dim)


class TimestepMLPEmbedding(nn.Module):
    """Sinusoidal埋め込み + MLP射影（DLIコースで使用）。"""
    
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
            timesteps: (B,) — 整数タイムステップ
        Returns:
            (B, hidden_dim) — 射影されたタイムステップ埋め込み
        """
        x = self.sinusoidal(timesteps)  # (B, embed_dim)
        x = self.mlp(x)                 # (B, hidden_dim)
        return x
</code></pre>

<h3 id="inject-timestep-unet">4.4 U-Netへのタイムステップ注入</h3>

<p>タイムステップ埋め込みは、以下の方法で<strong>すべてのResidualBlock</strong>に注入されます：</p>

<ol>
<li>タイムステップ埋め込みを特徴マップのチャネル数に合わせて射影（<code>nn.Linear</code>を使用）</li>
<li>ブロードキャスト用に<code>(B, C, 1, 1)</code>にリシェイプ</li>
<li>最初のGroupNormの後に特徴マップに<strong>加算</strong></li>
</ol>

<pre><code class="language-text">
タイムステップ注入の流れ
═══════════════════════

timestep t ──► SinusoidalEmbed ──► MLP ──► t_emb (B, hidden_dim)
                                              │
                                    Linear(hidden_dim, C)
                                              │
                                         (B, C, 1, 1)   ← ブロードキャスト用にリシェイプ
                                              │
Feature Map: ─── Conv ─── GroupNorm ────── (+) ────── GELU ─── Conv ─── ...
                                          ここで加算
</code></pre>

<blockquote><p><strong>試験のヒント：</strong> タイムステップ埋め込みは特徴マップに<strong>加算</strong>されます。結合（concatenate）ではありません。注入は各ResidualBlockの<strong>GroupNormの後、GELUの前</strong>に行われます。これはDLIコースにおける固定パターンです。</p></blockquote>

<h2 id="build-unet-from-scratch">5. U-Netをゼロから構築 — ステップバイステップ</h2>

<h3 id="residual-block">5.1 ResidualBlock</h3>

<p>これが最も基本的な構成要素です。各ResidualBlockは2つのconvレイヤー + GroupNorm + GELUで構成され、<strong>残差接続</strong>と<strong>タイムステップ注入</strong>が含まれます。</p>

<pre><code class="language-python">
class ResidualBlock(nn.Module):
    """タイムステップ埋め込み注入付き残差ブロック。
    
    流れ: x → Conv1 → GN1 → (+t_emb) → GELU → Conv2 → GN2 → GELU → (+residual) → out
    """
    
    def __init__(self, in_channels, out_channels, time_emb_dim):
        super().__init__()
        
        # 第1畳み込みレイヤー
        self.conv1 = nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1)
        self.norm1 = nn.GroupNorm(num_groups=8, num_channels=out_channels)
        
        # 第2畳み込みレイヤー
        self.conv2 = nn.Conv2d(out_channels, out_channels, kernel_size=3, padding=1)
        self.norm2 = nn.GroupNorm(num_groups=8, num_channels=out_channels)
        
        # 活性化関数
        self.act = nn.GELU()
        
        # タイムステップ埋め込み射影: out_channelsに射影
        self.time_mlp = nn.Sequential(
            nn.GELU(),
            nn.Linear(time_emb_dim, out_channels),
        )
        
        # 残差接続: in_channels != out_channelsの場合、1x1 convが必要
        if in_channels != out_channels:
            self.residual_conv = nn.Conv2d(in_channels, out_channels, kernel_size=1)
        else:
            self.residual_conv = nn.Identity()
    
    def forward(self, x, t_emb):
        """
        Args:
            x: (B, in_channels, H, W) — 入力特徴マップ
            t_emb: (B, time_emb_dim) — タイムステップ埋め込み
        Returns:
            (B, out_channels, H, W)
        """
        residual = self.residual_conv(x)   # (B, out_channels, H, W)
        
        # 第1レイヤー
        h = self.conv1(x)                   # (B, out_channels, H, W)
        h = self.norm1(h)                   # 正規化
        
        # タイムステップ埋め込みを注入
        t = self.time_mlp(t_emb)            # (B, out_channels)
        t = t[:, :, None, None]             # (B, out_channels, 1, 1) ブロードキャスト
        h = h + t                           # タイムステップ情報を加算
        
        h = self.act(h)                     # GELU活性化
        
        # 第2レイヤー
        h = self.conv2(h)                   # (B, out_channels, H, W)
        h = self.norm2(h)                   # 正規化
        h = self.act(h)                     # GELU活性化
        
        return h + residual                  # 残差接続
</code></pre>

<h3 id="down-block">5.2 DownBlock（エンコーダレベル）</h3>

<pre><code class="language-python">
class DownBlock(nn.Module):
    """エンコーダブロック: ResidualBlock + Rearrangeダウンサンプル。"""
    
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
            skip: (B, out_channels, H, W) — スキップ接続用
            down: (B, out_channels*4, H/2, W/2) — 次のレベルへのダウンサンプル
        """
        skip = self.res_block(x, t_emb)    # (B, out_channels, H, W)
        down = self.downsample(skip)         # (B, out_channels*4, H/2, W/2)
        return skip, down
</code></pre>

<h3 id="up-block">5.3 UpBlock（デコーダレベル）</h3>

<pre><code class="language-python">
class UpBlock(nn.Module):
    """デコーダブロック: アップサンプル + スキップ結合 + ResidualBlock。"""
    
    def __init__(self, in_channels, skip_channels, out_channels, time_emb_dim):
        super().__init__()
        # in_channels = アップサンプル後の下位レベルからのチャネル数
        # スキップと結合後: in_channels + skip_channels
        self.res_block = ResidualBlock(
            in_channels + skip_channels, out_channels, time_emb_dim
        )
        self.upsample = nn.Upsample(scale_factor=2, mode='nearest')
    
    def forward(self, x, skip, t_emb):
        """
        Args:
            x: (B, in_channels, H, W) — 下位レベルから
            skip: (B, skip_channels, 2H, 2W) — エンコーダからのスキップ接続
            t_emb: (B, time_emb_dim)
        Returns:
            (B, out_channels, 2H, 2W)
        """
        x = self.upsample(x)               # (B, in_channels, 2H, 2W)
        x = torch.cat([x, skip], dim=1)     # (B, in_channels+skip_channels, 2H, 2W)
        x = self.res_block(x, t_emb)        # (B, out_channels, 2H, 2W)
        return x
</code></pre>

<h3 id="full-unet">5.4 完全なU-Netの組み立て</h3>

<pre><code class="language-python">
class UNet(nn.Module):
    """Diffusionデノイジングのための完全なU-Net。
    
    アーキテクチャ: 64×64×1 → エンコーダ(3レベル) → ボトルネック → デコーダ(3レベル) → 64×64×1
    チャネル推移: 1 → 64 → 128 → 256 → 512 (ボトルネック) → 256 → 128 → 64 → 1
    """
    
    def __init__(self, in_channels=1, base_channels=64, time_emb_dim=128):
        super().__init__()
        
        # タイムステップ埋め込み
        self.time_embed = TimestepMLPEmbedding(
            embed_dim=time_emb_dim, 
            hidden_dim=time_emb_dim * 4
        )
        t_dim = time_emb_dim * 4  # MLPの出力次元
        
        # 初期畳み込み: 1 → 64
        self.init_conv = nn.Conv2d(in_channels, base_channels, kernel_size=3, padding=1)
        
        # エンコーダパス
        # レベル1: 64ch, 64×64 → Rearrange → 256ch, 32×32
        self.down1 = DownBlock(base_channels, base_channels, t_dim)        # 64 → 64 (skip), 256 (down)
        
        # レベル2: 256ch, 32×32 → Rearrange → 512ch, 16×16  
        # Rearrangeで4倍チャネルになるため、先に1x1 convが必要
        self.down1_proj = nn.Conv2d(base_channels * 4, base_channels * 2, kernel_size=1)
        self.down2 = DownBlock(base_channels * 2, base_channels * 2, t_dim) # 128 → 128 (skip), 512 (down)
        
        # レベル3: 512ch, 16×16 → Rearrange → 1024ch, 8×8
        self.down2_proj = nn.Conv2d(base_channels * 8, base_channels * 4, kernel_size=1)
        self.down3 = DownBlock(base_channels * 4, base_channels * 4, t_dim) # 256 → 256 (skip), 1024 (down)
        
        # ボトルネック: 1024ch, 8×8 → 512ch, 8×8
        self.down3_proj = nn.Conv2d(base_channels * 16, base_channels * 8, kernel_size=1)
        self.bottleneck = ResidualBlock(base_channels * 8, base_channels * 8, t_dim)  # 512 → 512
        
        # デコーダパス
        # レベル3: 512を16×16にアップサンプル、skip(256)と結合 → 768 → 256
        self.up3 = UpBlock(base_channels * 8, base_channels * 4, base_channels * 4, t_dim)
        
        # レベル2: 256を32×32にアップサンプル、skip(128)と結合 → 384 → 128
        self.up2 = UpBlock(base_channels * 4, base_channels * 2, base_channels * 2, t_dim)
        
        # レベル1: 128を64×64にアップサンプル、skip(64)と結合 → 192 → 64
        self.up1 = UpBlock(base_channels * 2, base_channels, base_channels, t_dim)
        
        # 最終出力: 64 → 1
        self.final_conv = nn.Sequential(
            nn.GroupNorm(8, base_channels),
            nn.GELU(),
            nn.Conv2d(base_channels, in_channels, kernel_size=1),
        )
    
    def forward(self, x, timesteps):
        """
        Args:
            x: (B, 1, 64, 64) — ノイズ画像
            timesteps: (B,) — 整数タイムステップ
        Returns:
            (B, 1, 64, 64) — 予測されたクリーン画像（またはノイズ）
        """
        # タイムステップ埋め込み
        t_emb = self.time_embed(timesteps)    # (B, t_dim)
        
        # 初期conv
        x = self.init_conv(x)                 # (B, 64, 64, 64)
        
        # エンコーダ
        skip1, x = self.down1(x, t_emb)       # skip1: (B,64,64,64), x: (B,256,32,32)
        x = self.down1_proj(x)                 # (B, 128, 32, 32)
        
        skip2, x = self.down2(x, t_emb)       # skip2: (B,128,32,32), x: (B,512,16,16)
        x = self.down2_proj(x)                 # (B, 256, 16, 16)
        
        skip3, x = self.down3(x, t_emb)       # skip3: (B,256,16,16), x: (B,1024,8,8)
        x = self.down3_proj(x)                 # (B, 512, 8, 8)
        
        # ボトルネック
        x = self.bottleneck(x, t_emb)         # (B, 512, 8, 8)
        
        # デコーダ
        x = self.up3(x, skip3, t_emb)         # (B, 256, 16, 16)
        x = self.up2(x, skip2, t_emb)         # (B, 128, 32, 32)
        x = self.up1(x, skip1, t_emb)         # (B, 64, 64, 64)
        
        # 最終出力
        x = self.final_conv(x)                 # (B, 1, 64, 64)
        return x
</code></pre>

<p>テンソル形状を確認します：</p>

<pre><code class="language-python">
# 形状を確認
model = UNet(in_channels=1, base_channels=64, time_emb_dim=128)
x = torch.randn(2, 1, 64, 64)
t = torch.randint(0, 1000, (2,))
out = model(x, t)
print(f"Input:  {x.shape}")    # torch.Size([2, 1, 64, 64])
print(f"Output: {out.shape}")  # torch.Size([2, 1, 64, 64])
print(f"Params: {sum(p.numel() for p in model.parameters()):,}")
</code></pre>

<pre><code class="language-text">
U-Netを通るテンソル形状の流れ (base_channels=64)
═══════════════════════════════════════════════

レイヤー                   形状                    備考
──────────────────────────────────────────────────────────
Input                    (B, 1, 64, 64)
init_conv                (B, 64, 64, 64)        Conv2d(1, 64)
                                                
down1 ResBlock           (B, 64, 64, 64)        skip1 ─────────────────┐
down1 Rearrange          (B, 256, 32, 32)       チャネル4倍             │
down1_proj               (B, 128, 32, 32)       1×1 conv削減           │
                                                                        │
down2 ResBlock           (B, 128, 32, 32)       skip2 ──────────┐      │
down2 Rearrange          (B, 512, 16, 16)       チャネル4倍      │      │
down2_proj               (B, 256, 16, 16)       1×1 conv削減    │      │
                                                                 │      │
down3 ResBlock           (B, 256, 16, 16)       skip3 ───┐      │      │
down3 Rearrange          (B, 1024, 8, 8)        4倍ch    │      │      │
down3_proj               (B, 512, 8, 8)         削減     │      │      │
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

final_conv               (B, 1, 64, 64)         出力 = デノイズ画像
</code></pre>

<blockquote><p><strong>試験のヒント：</strong> 評価試験では、テンソル形状を正確に計算する必要があります。覚えるべきルール：<strong>Rearrange → チャネル×4、空間÷2</strong>。スキップ接続を結合した後のチャネル = アップサンプルのチャネル + スキップのチャネル。コーディング前にメモ用紙にこれらを書き出しましょう！</p></blockquote>

<h2 id="train-denoiser">6. デノイザーモデルの学習</h2>

<h3 id="denoising-task">6.1 シンプルなデノイジングタスク</h3>

<p>完全な拡散プロセス（複数のタイムステップ）を学ぶ前に、シンプルなタスクから始めます：<br/>
<strong>画像にガウスノイズを加える → U-Netに元の画像を復元させる</strong></p>

<pre><code class="language-text">
シンプルなデノイジングタスク
═════════════════════

元の画像              ノイズを加える            ノイズ画像          U-Net         デノイズ出力
   ┌──────┐          ┌──────┐                  ┌──────┐         ┌─────┐         ┌──────┐
   │ 🖼️   │    +     │ ░░░░ │  noise_level     │ ░🖼️░ │  ────► │U-Net│  ────►  │ 🖼️   │
   │      │          │ ░░░░ │  * N(0,1)        │ ░░░░ │         │     │         │      │
   └──────┘          └──────┘                  └──────┘         └─────┘         └──────┘
      x₀               ε                      x_noisy          x₀を           x̂₀
                                            = x₀ + σ·ε         予測

Loss = MSE(x̂₀, x₀) = ‖U-Net(x_noisy, t) - x₀‖²
</code></pre>

<h3 id="training-code">6.2 学習ループ</h3>

<pre><code class="language-python">
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

# ハイパーパラメータ
BATCH_SIZE = 32
LEARNING_RATE = 1e-4
EPOCHS = 50
NOISE_LEVEL = 0.5  # σ: ノイズの量を制御
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# データセット: MNIST（グレースケール 28×28 → 64×64にリサイズ）
transform = transforms.Compose([
    transforms.Resize((64, 64)),
    transforms.ToTensor(),           # [0, 1]
    transforms.Normalize([0.5], [0.5])  # [-1, 1]
])
dataset = datasets.MNIST(root='./data', train=True, transform=transform, download=True)
dataloader = DataLoader(dataset, batch_size=BATCH_SIZE, shuffle=True)

# モデル、オプティマイザ、損失関数
model = UNet(in_channels=1, base_channels=64, time_emb_dim=128).to(DEVICE)
optimizer = optim.Adam(model.parameters(), lr=LEARNING_RATE)
loss_fn = nn.MSELoss()

# 学習ループ
for epoch in range(EPOCHS):
    total_loss = 0
    for batch_idx, (images, _) in enumerate(dataloader):
        images = images.to(DEVICE)                    # (B, 1, 64, 64)
        
        # ランダムなタイムステップ（各サンプルに異なるタイムステップ）
        timesteps = torch.randint(0, 1000, (images.shape[0],), device=DEVICE)
        
        # タイムステップに応じてノイズレベルをスケーリング（シンプル：線形スケーリング）
        noise_scales = (timesteps.float() / 1000.0 * NOISE_LEVEL)  # (B,)
        noise_scales = noise_scales[:, None, None, None]             # (B,1,1,1)
        
        # ノイズを加える
        noise = torch.randn_like(images)                             # (B, 1, 64, 64)
        noisy_images = images + noise_scales * noise                 # (B, 1, 64, 64)
        
        # フォワードパス: クリーン画像を予測
        predicted_clean = model(noisy_images, timesteps)             # (B, 1, 64, 64)
        
        # 損失: 予測クリーン画像と実際のクリーン画像のMSE
        loss = loss_fn(predicted_clean, images)
        
        # バックワードパス
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
        total_loss += loss.item()
    
    avg_loss = total_loss / len(dataloader)
    print(f"Epoch [{epoch+1}/{EPOCHS}], Loss: {avg_loss:.6f}")
</code></pre>

<h3 id="visualize-results">6.3 結果の可視化</h3>

<pre><code class="language-python">
import matplotlib.pyplot as plt

@torch.no_grad()
def visualize_denoising(model, dataloader, noise_level=0.5, num_images=5):
    """表示: 元の画像 → ノイズ画像 → デノイズ画像。"""
    model.eval()
    images, _ = next(iter(dataloader))
    images = images[:num_images].to(DEVICE)
    
    # ノイズを加える
    timesteps = torch.full((num_images,), 500, device=DEVICE)
    noise = torch.randn_like(images) * noise_level
    noisy = images + noise
    
    # デノイズ
    denoised = model(noisy, timesteps)
    
    # プロット
    fig, axes = plt.subplots(3, num_images, figsize=(num_images * 3, 9))
    titles = ['元の画像', 'ノイズ画像', 'デノイズ画像']
    
    for i in range(num_images):
        for j, (img, title) in enumerate(zip(
            [images[i], noisy[i], denoised[i]], titles
        )):
            ax = axes[j][i]
            # 逆正規化: [-1,1] → [0,1]
            img_np = (img.cpu().squeeze() * 0.5 + 0.5).clamp(0, 1).numpy()
            ax.imshow(img_np, cmap='gray')
            ax.set_title(title if i == 0 else '')
            ax.axis('off')
    
    plt.tight_layout()
    plt.savefig('denoising_results.png', dpi=150)
    plt.show()

visualize_denoising(model, dataloader)
</code></pre>

<blockquote><p><strong>試験のヒント：</strong> 評価試験では、学習ループを完成させる必要があるかもしれません。3つの重要なステップを覚えてください：(1) クリーン画像にノイズを加える、(2) ノイズ画像 + タイムステップでU-Netのフォワードパス、(3) 予測と元の画像のMSE損失を計算。<strong>モデルにタイムステップを渡すことを忘れないでください！</strong></p></blockquote>

<h2 id="cheat-sheet">7. チートシート — U-Net & デノイジング</h2>

<table>
<thead>
<tr><th>概念</th><th>重要な詳細</th><th>コード/数式</th></tr>
</thead>
<tbody>
<tr><td>U-Net構造</td><td>エンコーダ → ボトルネック → デコーダ + スキップ接続</td><td>U字型、skip = concatenate</td></tr>
<tr><td>GroupNorm</td><td>グループごとに正規化、バッチサイズ非依存</td><td><code>nn.GroupNorm(8, channels)</code></td></tr>
<tr><td>GELU</td><td>滑らかな活性化、x·Φ(x)</td><td><code>nn.GELU()</code></td></tr>
<tr><td>Rearrange Pooling</td><td>(B,C,2H,2W) → (B,4C,H,W)、損失なし</td><td><code>rearrange(x, 'b c (h p1) (w p2) → b (c p1 p2) h w', p1=2, p2=2)</code></td></tr>
<tr><td>Sinusoidal Embed</td><td>さまざまな周波数のsin/cos</td><td><code>sin(t/10000^(2i/d))</code>、<code>cos(t/10000^(2i/d))</code></td></tr>
<tr><td>タイムステップ注入</td><td>GroupNormの後に特徴マップに加算</td><td><code>h = h + t_emb[:,:,None,None]</code></td></tr>
<tr><td>ResidualBlock</td><td>Conv→GN→(+t)→GELU→Conv→GN→GELU + skip</td><td>2つのconvレイヤー + 残差 + タイムステップ</td></tr>
<tr><td>デノイジング損失</td><td>予測クリーンと実際のクリーンのMSE</td><td><code>MSE(model(x_noisy, t), x_clean)</code></td></tr>
<tr><td>スキップ接続の役割</td><td>空間詳細の保持、勾配の流れの改善</td><td><code>torch.cat([upsample, skip], dim=1)</code></td></tr>
<tr><td>結合後のチャネル</td><td>アップサンプルのチャネル + スキップのチャネル</td><td>次のconvのin_channelsと一致必須</td></tr>
</tbody>
</table>

<h2 id="practice-questions">8. 練習問題</h2>

<p>以下の問題はNVIDIA DLIコーディング評価をシミュレートしています。解答を確認する前にコーディングしてみてください！</p>

<p><strong>Q1: タイムステップ注入付きResidualBlockの実装</strong></p>

<p>以下の<code>ResidualBlock</code>の<code>forward</code>メソッドを完成させてください。このブロックは2つのconvレイヤーにGroupNormとGELUを適用し、最初の正規化の後にタイムステップ埋め込みを注入し、残差接続を加える必要があります。</p>

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
        # TODO: このメソッドを実装してください
        pass
</code></pre>

<details>
<summary>Q1の解答を表示</summary>

<pre><code class="language-python">
def forward(self, x, t_emb):
    residual = self.res_conv(x)
    
    h = self.conv1(x)
    h = self.norm1(h)
    
    # タイムステップを注入: t_embをout_chに射影、ブロードキャスト用にリシェイプ、加算
    t = self.time_proj(t_emb)          # (B, out_ch)
    t = t[:, :, None, None]            # (B, out_ch, 1, 1)
    h = h + t
    
    h = self.act(h)
    
    h = self.conv2(h)
    h = self.norm2(h)
    h = self.act(h)
    
    return h + residual
</code></pre>

<p><em>解説：重要なポイント — (1) タイムステップは結合（concatenate）ではなく加算される、(2) (B, C, 1, 1)にリシェイプすることでH×W全体にブロードキャスト可能、(3) 注入はnorm1の後GELUの前に行う、(4) チャネル次元が異なる場合は残差に1×1 convを使用。</em></p>
</details>

<p><strong>Q2: U-Netからスキップ接続を削除するとどうなりますか？</strong></p>

<p>デコーダでスキップ接続を使用しない以下の修正版U-Netを考えてください：</p>

<pre><code class="language-python">
# オリジナル（スキップ接続あり）:
x = self.upsample(x)
x = torch.cat([x, skip], dim=1)  # スキップを結合
x = self.res_block(x, t_emb)

# 修正版（スキップ接続なし）:
x = self.upsample(x)
# スキップ接続が削除されています！
x = self.res_block(x, t_emb)
</code></pre>

<p>デノイズ出力にはどのような影響がありますか？該当するものをすべて選んでください：</p>

<ul>
<li>A) 出力がぼやけ、細かい詳細が失われる</li>
<li>B) 形状の不一致によりモデルがコンパイルに失敗する</li>
<li>C) 学習損失が大幅に増加する</li>
<li>D) 入力に関係なくモデルが同一の出力を生成する</li>
</ul>

<details>
<summary>Q2の解答を表示</summary>

<p><strong>AとCが正解です。</strong></p>

<p><em>解説：(A) スキップ接続がなければ、デコーダはボトルネック情報（512チャネルの8×8）のみから64×64の詳細を再構築しなければなりません — 細かいテクスチャやエッジが失われ、ぼやけた出力になります。(B) res_blockのin_channelsを適切に調整すれば形状の不一致は起こりません。(C) 正解 — 再構築に使える情報が少なくなるため、予測とクリーン画像間のMSE損失が高くなります。(D) これは情報ボトルネックが極端な場合にのみ起こります。モデルはボトルネック特徴から大まかな構造は捉えられます。</em></p>
</details>

<p><strong>Q3: 各U-Netレベルを通る出力形状を計算</strong></p>

<p>以下のU-Net設定で、欠けているテンソル形状を埋めてください：</p>

<pre><code class="language-python">
# 設定: in_channels=1, base_channels=32, image_size=32×32
# ダウンサンプリングにRearrange Poolingを使用

x = input                  # 形状: (B, 1, 32, 32)
x = init_conv(x)           # 形状: (B, 32, 32, 32)

# エンコーダレベル1
skip1, x = down1(x)        # skip1: (B, 32, 32, 32),  rearrange後のx: ???
x = proj1(x)               # 形状: ???

# エンコーダレベル2
skip2, x = down2(x)        # skip2: ???,  rearrange後のx: ???
x = proj2(x)               # 形状: ???

# ボトルネック
x = bottleneck(x)          # 形状: ???

# デコーダレベル2
x = upsample(x)            # 形状: ???
x = cat(x, skip2)          # 形状: ???
x = res_block(x)           # 形状: ???

# デコーダレベル1
x = upsample(x)            # 形状: ???
x = cat(x, skip1)          # 形状: ???
x = res_block(x)           # 形状: ???

x = final_conv(x)          # 形状: (B, 1, 32, 32)
</code></pre>

<details>
<summary>Q3の解答を表示</summary>

<pre><code class="language-python">
x = input                  # (B, 1, 32, 32)
x = init_conv(x)           # (B, 32, 32, 32)

# エンコーダレベル1
skip1 = res1(x)            # skip1: (B, 32, 32, 32)
x = rearrange(skip1)       # (B, 128, 16, 16)      ← 32×4=128, 32/2=16
x = proj1(x)               # (B, 64, 16, 16)       ← 1×1 conv削減

# エンコーダレベル2
skip2 = res2(x)            # skip2: (B, 64, 16, 16)
x = rearrange(skip2)       # (B, 256, 8, 8)         ← 64×4=256, 16/2=8
x = proj2(x)               # (B, 128, 8, 8)         ← 1×1 conv削減

# ボトルネック
x = bottleneck(x)          # (B, 128, 8, 8)

# デコーダレベル2
x = upsample(x)            # (B, 128, 16, 16)       ← 空間×2
x = cat(x, skip2)          # (B, 192, 16, 16)       ← 128+64=192
x = res_block(x)           # (B, 64, 16, 16)        ← チャネルを削減

# デコーダレベル1
x = upsample(x)            # (B, 64, 32, 32)        ← 空間×2
x = cat(x, skip1)          # (B, 96, 32, 32)        ← 64+32=96
x = res_block(x)           # (B, 32, 32, 32)        ← チャネルを削減

x = final_conv(x)          # (B, 1, 32, 32)
</code></pre>

<p><em>解説：重要なパターン — Rearrange Poolingはチャネルを4倍に増やし、空間次元を半分にします。スキップと結合後のチャネル = アップサンプルのチャネル + スキップのチャネル。各レイヤーの正しいin_channelsを設定するために、これらを注意深く追跡してください。</em></p>
</details>
