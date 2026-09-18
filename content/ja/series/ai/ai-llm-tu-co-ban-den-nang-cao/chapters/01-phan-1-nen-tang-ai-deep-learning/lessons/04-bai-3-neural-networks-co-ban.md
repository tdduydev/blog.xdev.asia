---
id: 019c9619-bb03-7003-c003-bb0300000003
title: 'レッスン 3: 基本的なニューラル ネットワーク — パーセプトロンと逆伝播'
slug: bai-3-neural-networks-co-ban
description: >-
  生物学的パーセプトロンから最新のニューラル ネットワークまで: 活性化関数、フォワード パス、バックプロパゲーションのステップバイステップ、および
  NumPy と PyTorch を使用した XOR 問題をゼロから解決するニューラル ネットワークの構築。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 2
section_title: 'パート 1: AI およびディープラーニング プラットフォーム'
course:
  id: 019c9619-aa01-7001-b001-aa0100000001
  title: 'AI と LLM: 基本から高度まで'
  slug: ai-llm-tu-co-ban-den-nang-cao
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-5454" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-5454)"/>

  <!-- Decorations -->
  <g>
    <circle cx="767" cy="131" r="20" fill="#a78bfa" opacity="0.060000000000000005"/>
    <circle cx="934" cy="78" r="11" fill="#a78bfa" opacity="0.07"/>
    <circle cx="601" cy="285" r="32" fill="#a78bfa" opacity="0.08"/>
    <circle cx="768" cy="232" r="23" fill="#a78bfa" opacity="0.09"/>
    <circle cx="935" cy="179" r="14" fill="#a78bfa" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <line x1="600" y1="141" x2="1100" y2="221" stroke="#a78bfa" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="171" x2="1050" y2="241" stroke="#a78bfa" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1072.1769145362398,223 1072.1769145362398,259 1041,277 1009.8230854637602,259 1009.8230854637602,223 1041,205" fill="none" stroke="#a78bfa" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#a78bfa"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#a78bfa" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🧠 AI と ML — レッスン 2</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 3: 基本的なニューラル ネットワーク — パーセプトロン</tspan>
      <tspan x="60" dy="42">バックプロパゲーションとバックプロパゲーション</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">AI と LLM: 基本から高度まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 1: AI およびディープラーニング プラットフォーム</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

ニューラル ネットワークは、画像認識モデルから ChatGPT に至るまで、**最新の AI の基礎**です。ニューラル ネットワークは **意思決定工場** と考えることができます。データが入力され、多くの処理ステップを経て、出力されます。

このレッスンでは、**ボトムアップ** の理解を構築します。まず、単一の「ワーカー」 (ニューロン) から始めて、それを「チーム」 (ネットワーク) に集め、最後にチームに「改善」する方法 (バックプロパゲーション) を教えます。

```python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
```

---

## 1. パーセプトロン: 生物学から数学まで

### 1.1 生物学的ニューロン — AI のインスピレーション

人間の脳には約 860 億個のニューロンがあります。各ニューロンは単純な**意思決定者**として機能します。

1. 樹状突起を介して **情報を取得** (複数の入力 – 複数の情報源から意見を聞くなど)
2. 細胞体/体細胞における **治療** (すべての意見を考慮)
3. **十分な刺激がある場合**、軸索を介して**信号を送信します(「はい」または「いいえ」の決定を下します)。

![生物学的ニューロンと人工ニューロンの比較（パーセプトロン）](/storage/uploads/2026/03/neuron-bio-vs-artificial.webp)

**実際の例:** 友達とディナーに出かけるかどうかを決めていると想像してください。

|係数 (入力) |重要度（重み） |今日の状況 |
|-----------------|--------------------------|---------------------|
|お金はありますか？ | w₁ = 0.4 (重要) | x₁ = 1 (はい) |
|いい天気ですか？ | w₂ = 0.1 (それほど重要ではありません) | x₂ = 0 (雨) |
|行くんですか、相棒？ | w₃ = 0.5 (非常に重要) | x₃ = 1 (はい) |

合計スコア: 0.4×1 + 0.1×0 + 0.5×1 = **0.9** → 閾値0.5を超える → **GO!** 🎉

### 1.2 パーセプトロン — 人工ニューロン (1958)

Frank Rosenblatt はニューロンを数式にモデル化しました。

```
z = w₁x₁ + w₂x₂ + ... + wₙxₙ + b = W·x + b
ŷ = f(z)    # f là activation function — quyết định "bắn" hay "không"
```

見覚えがあるでしょうか？これは、前の投稿の **内積** + 活性化関数です。

```python
class Perceptron:
    def __init__(self, n_inputs, learning_rate=0.1):
        # Khởi tạo trọng số ngẫu nhiên nhỏ
        self.weights = np.random.randn(n_inputs) * 0.01
        self.bias = 0.0
        self.lr = learning_rate

    def predict(self, x):
        z = np.dot(x, self.weights) + self.bias
        return 1 if z >= 0 else 0  # Step function: ≥0 → "có", <0 → "không"

    def train(self, X, y, epochs=100):
        for epoch in range(epochs):
            errors = 0
            for xi, yi in zip(X, y):
                ypred = self.predict(xi)
                error = yi - ypred
                # Perceptron update rule: sai → điều chỉnh trọng số
                self.weights += self.lr * error * xi
                self.bias    += self.lr * error
                errors += abs(error)
            if errors == 0:
                print(f"Converged at epoch {epoch}")
                break

# === Bài toán AND ===
# AND: chỉ cho 1 khi CẢ HAI input = 1
X_and = np.array([[0,0],[0,1],[1,0],[1,1]])
y_and = np.array([0, 0, 0, 1])

p = Perceptron(n_inputs=2)
p.train(X_and, y_and, epochs=50)
print("AND predictions:", [p.predict(x) for x in X_and])  # [0, 0, 0, 1] ✅
print(f"Trọng số học được: w={p.weights}, b={p.bias:.2f}")
```

> **💡 演習 1.2:** 
> 1. **OR** 問題 (x₁=0,x₂=0→0; x₁=0,x₂=1→1; x₁=1,x₂=0→1; x₁=1,x₂=1→1) 用にパーセプトロンをトレーニングします。何エポックで収束しますか?
> 2. パーセプトロンが学習した決定境界を描画します。ヒント: 場所にあります `w₁x₁ + w₂x₂ + b = 0`。

### 1.3 単一パーセプトロンの限界 — XOR 問題

単一のパーセプトロンは **線形データのみを分類**します。つまり、**直線**を描いてデータを分割することしかできません。

```
AND: có thể chia bằng 1 đường thẳng ✅     XOR: KHÔNG thể chia ❌
          x₂                                      x₂
     1  | 0   1                               1  | 1   0
        |  ╱                                      |
     0  | 0 ╱ 0                               0  | 0   1
        +--------                                 +--------
          0   1   x₁                               0   1   x₁
```

XOR: (0,0)→0、(0,1)→1、(1,0)→1、(1,1)→0 → 割り切れる直線はありません。

**解決策:** 複数のパーセプトロンを複数の **層** → 多層パーセプトロン (MLP) に配置します。各レイヤーは分割線を「描画」し、多くのレイヤーが連携して動作します → **任意の曲線**を描画できます。

> **💡 演習 1.3:** XOR 問題に対して単一パーセプトロンをトレーニングしてみます。収束するのか？最後のエラーは何ですか?

---

## 2. アクティベーション関数 — 「アクティベーションしきい値」

### なぜアクティベーション関数が必要なのでしょうか?

**通常の例:** 各クラスが乗算と加算 (線形) のみである場合、1000 個のクラスを積み重ねたとしても、**1 クラス** にすぎません。これは、連続する乗算 = 1 つの大きな乗算であるためです。

```
y = W₃(W₂(W₁x + b₁) + b₂) + b₃ = (W₃W₂W₁)x + ... = W'x + b'
→ 3 lớp linear = 1 lớp linear to hơn! Vô nghĩa!
```

アクティベーション関数は **非線形性** を生み出します。つまり、各決定ステップを単に「検討」しているだけでなく、「興味深い」または「拒否」しているようなものです。

### 2.1 共通のアクティベーション関数

```python
def sigmoid(x):
    """Nén mọi input vào khoảng (0, 1) — giống "xác suất" """
    return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

def sigmoid_derivative(x):
    s = sigmoid(x)
    return s * (1 - s)

def tanh(x):
    """Nén vào (-1, 1) — zero-centered, tốt hơn sigmoid"""
    return np.tanh(x)

def relu(x):
    """ReLU: giữ nguyên nếu dương, bỏ nếu âm — đơn giản mà hiệu quả"""
    return np.maximum(0, x)

def relu_derivative(x):
    return (x > 0).astype(float)

def gelu(x):
    """GELU: smooth version of ReLU — dùng trong GPT, BERT"""
    return 0.5 * x * (1 + np.tanh(np.sqrt(2/np.pi) * (x + 0.044715 * x**3)))

def leaky_relu(x, alpha=0.01):
    """Leaky ReLU: giống ReLU nhưng không "giết chết" neuron âm"""
    return np.where(x > 0, x, alpha * x)
```

### 2.2 比較 — いつ何を使用するか?

|アクティベーション |範囲 |利点 |問題 |使用場所 |
|----------|----------|----------|----------|----------|
| **シグモイド** | (0, 1) |出力は確率と同じです |消えるグラデーション |出力層 (バイナリ) |
| **タン** | (-1, 1) |ゼロ中心 |消えるグラデーション |隠れ層 (RNN) |
| **ReLU** | [0、∞) |高速計算、消失なし | Dying ReLU (ニューロンは永久に死ぬ) |隠れ層 (CNN、MLP) |
| **リーキー ReLU** | (-∞、∞) |死にかけているニューロンを修復する |ハイパーパラメータ α を追加 |非表示のレイヤー |
| **ゲル** |スムーズ |滑らかで自然 |少し高価 | **トランスフォーマー** (BERT、GPT) |
| **SiLU/スウィッシュ** |スムーズ |深いネットワークに適しています |高価 | LLaMA、PaLM |

> **経験則:** 
> - **Transformer/LLM** に取り組んでいますか? → **ジェル**を使用
> - **CNN/MLP のレギュラー**に取り組んでいますか? → **ReLU**を使用してください 
> - **出力層** 分類? → **Sigmoid** (2 レイヤー) または **Softmax** (マルチレイヤー) を使用します。

> **💡 演習 2:** 
> 1. 4 つの活性化関数 (Sigmoid、Tanh、ReLU、GELU) のグラフを同じ図上に描きます。提案: 使用する`plt.subplot(2,2,...)`。
> 2. 言葉で説明してください: なぜ ReLU は「勾配消失」を解決できるのに、シグモイドでは解決できないのでしょうか?

---

## 3. 多層パーセプトロン (MLP): フォワードパス

### 3.1 アーキテクチャ — 「意思決定工場」

![多層パーセプトロン アーキテクチャ: 入力 → 隠れ層 → 出力](/storage/uploads/2026/03/neural-network-architecture.webp)

MLP が注文処理 ** 工場 ** であると想像してください。

|ステップ |ニューラルネットワーク層 |工場事例 |
|------|---------------------|--------------|
| 1. 材料を入手 |入力層 (x₁, x₂) |注文を受ける: 数量、製品タイプ |
| 2. 予備治療 |隠れ層 1 + ReLU |検査部門：選別・フィルタリング |
| 3. 処理内容 |隠れ層 2 + ReLU |梱包部門：充電、商品の回収 |
| 4. 出力結果 |出力層 + シグモイド |輸出部門: 納品するかキャンセルするか? |

```
Input Layer → Hidden Layer 1 → Hidden Layer 2 → Output Layer
  (x₁,x₂)  →   ReLU(W₁x+b₁) →   ReLU(W₂h₁+b₂) → Sigmoid(W₃h₂+b₃)
```

### 3.2 フォワードパス — 「工場内を走る」

**フォワード パス**は、入力からすべてのレイヤーを介してデータを出力に運ぶプロセスです。各層は、**行列乗算 → バイアス加算 → 活性化関数** を実行します。

```python
# Ví dụ: MLP 2 → 4 → 4 → 1 cho bài toán XOR
np.random.seed(42)

# Khởi tạo tham số (ban đầu ngẫu nhiên — chưa biết đáp án)
W1 = np.random.randn(2, 4) * 0.5   # Lớp 1: 2 input → 4 neuron
b1 = np.zeros(4)
W2 = np.random.randn(4, 4) * 0.5   # Lớp 2: 4 → 4 neuron
b2 = np.zeros(4)
W3 = np.random.randn(4, 1) * 0.5   # Lớp output: 4 → 1 output
b3 = np.zeros(1)

def forward(X):
    """Chạy dữ liệu qua toàn bộ network"""
    # Layer 1: Nhận input, biến đổi
    z1 = X @ W1 + b1          # Nhân ma trận + bias → (N, 4)
    a1 = relu(z1)              # Activation → giữ phần dương → (N, 4)

    # Layer 2: Tiếp tục biến đổi
    z2 = a1 @ W2 + b2          # (N, 4)
    a2 = relu(z2)              # (N, 4)

    # Output layer: Ra kết quả cuối cùng
    z3 = a2 @ W3 + b3          # (N, 1)
    output = sigmoid(z3)       # Nén vào (0,1) → xác suất → (N, 1)

    return output, (z1, a1, z2, a2, z3)

# Dữ liệu XOR
X_xor = np.array([[0.,0.],[0.,1.],[1.,0.],[1.,1.]])
y_xor = np.array([[0.],[1.],[1.],[0.]])

output, cache = forward(X_xor)
print("Predictions (chưa train):", output.T)  # Ngẫu nhiên, chưa đúng!
```

> **💡 演習 3.2:** W1 = [[1, -1], [-1, 1]] および b1 = [0, 0] の場合:
> 1. レイヤ 1 を介した入力 [1, 0] のフォワード パスを手動で計算します (ReLU の前後)
> 2. 入力 [0, 0] について繰り返します。異なる結果は何ですか?

---

## 4. 損失関数 — 「間違った尺度」

**通常の生活の例:** あなたはアーチェリーを撃ちます。損失関数は **矢印から中心までの距離** を測定します。ロス=0の場合→中央にヒット。損失が大きいほど→乖離が大きくなります。

損失関数には一般的に 2 つのタイプがあります。

```python
def mse_loss(y_true, y_pred):
    """Mean Squared Error — cho bài toán dự đoán số (regression)
    Ví dụ: dự đoán giá nhà, nhiệt độ, doanh thu"""
    return np.mean((y_true - y_pred) ** 2)

def binary_cross_entropy(y_true, y_pred, eps=1e-15):
    """Binary Cross-Entropy — cho bài toán phân loại 2 lớp (classification)
    Ví dụ: spam/không spam, mèo/chó, XOR"""
    y_pred = np.clip(y_pred, eps, 1 - eps)  # Tránh log(0)
    return -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))

# So sánh: cùng dự đoán sai, BCE phạt NẶNG hơn MSE khi model "tự tin sai"
y_true = np.array([1.0])
y_pred_confident_wrong = np.array([0.01])  # 99% tự tin sai!
y_pred_unsure = np.array([0.4])            # Không chắc lắm

print(f"MSE (tự tin sai):  {mse_loss(y_true, y_pred_confident_wrong):.4f}")  # 0.98
print(f"MSE (không chắc):  {mse_loss(y_true, y_pred_unsure):.4f}")          # 0.36
print(f"BCE (tự tin sai):  {binary_cross_entropy(y_true, y_pred_confident_wrong):.4f}")  # 4.6!
print(f"BCE (không chắc):  {binary_cross_entropy(y_true, y_pred_unsure):.4f}")          # 0.92
```

> **結論:** BCE は、モデルが自信を持っているが間違っている場合に非常に厳しく「罰」します → モデルに注意を強います → 分類に適しています。

> **💡 演習 4:** y_true = [1, 0, 1, 0] および y_pred = [0.9, 0.1, 0.8, 0.2] の場合、MSE と BCE を手動で計算し、上記の関数の出力と比較します。

---

## 5. バックプロパゲーション: 「ネットワークに改善方法を教える」

### 5.1 主なアイデア

**通常の生活の例:** あなたはフォーを下手に調理します。 **主な原因**を知りたい場合:
- 軽いスープですか？ →次回は塩を追加します（＋効果大）
- 硬いフォー麺？ → 浸す時間を長くする (+中程度の効果)
- 玉ねぎはまだ香りがついていませんか？ →より上手に（＋効果小）

バックプロパゲーションも同じことを行います。**間違った結果** (損失) から、各層を**トレース**して、**各重みがどの程度の影響を与える**か、**調整方法**を知ることができます。

```
Forward:  Input → Layer 1 → Layer 2 → Output → Loss
                                                  ↓
Backward: dW₁ ← dW₂ ←── dW₃ ←──── dL/dOutput ←──┘
          (điều chỉnh mỗi W để loss giảm)
```

ヒント: 前のレッスンの **チェーン ルール** を使用してください。 `dLoss/dW₁ = dLoss/dOutput × dOutput/dLayer2 × dLayer2/dW₁`

### 5.2 数値例 — 2層MLP

各ステップを詳しく見てみましょう。

```python
# Mạng nhỏ để dễ theo dõi bằng tay
x = np.array([[1.0, 0.0]])   # Input: shape (1, 2)
y_true = np.array([[1.0]])    # Đáp án: 1

W1 = np.array([[0.5, -0.3], [0.2, 0.8]])  # Lớp 1: (2, 2)
W2 = np.array([[0.4], [-0.1]])              # Lớp 2: (2, 1)

# === FORWARD PASS === (đi xuôi: tính output)
z1 = x @ W1                      # [1,0] @ W1 = [0.5, -0.3]
a1 = sigmoid(z1)                 # [0.622, 0.426]
z2 = a1 @ W2                     # 0.622×0.4 + 0.426×(-0.1) = 0.206
y_pred = sigmoid(z2)             # sigmoid(0.206) = 0.551

loss = binary_cross_entropy(y_true, y_pred)
print(f"y_pred: {y_pred[0,0]:.6f}, loss: {loss:.6f}")

# === BACKWARD PASS === (đi ngược: tính gradient từng trọng số)
# Mục tiêu: tính dLoss/dW1 và dLoss/dW2

# Bước 1: dLoss/dy_pred — "loss thay đổi thế nào khi output thay đổi?"
dL_dypred = -(y_true / y_pred - (1 - y_true) / (1 - y_pred)) / len(y_true)

# Bước 2: dLoss/dz2 = dLoss/dy_pred × dy_pred/dz2 (chain rule!)
dL_dz2 = dL_dypred * sigmoid_derivative(z2)

# Bước 3: dLoss/dW2 = a1ᵀ × dLoss/dz2 — "W2 ảnh hưởng loss bao nhiêu?"
dL_dW2 = a1.T @ dL_dz2          # (2,1)

# Bước 4: Truyền gradient ngược qua lớp 2
dL_da1 = dL_dz2 @ W2.T          # (1,2)

# Bước 5: dLoss/dz1 (qua sigmoid' của lớp 1)
dL_dz1 = dL_da1 * sigmoid_derivative(z1)

# Bước 6: dLoss/dW1 — "W1 ảnh hưởng loss bao nhiêu?"
dL_dW1 = x.T @ dL_dz1           # (2,2)

print(f"\ndL/dW2:\n{dL_dW2}")
print(f"dL/dW1:\n{dL_dW1}")
# → Giờ ta biết cần điều chỉnh W1, W2 theo hướng nào!
```

> **💡 演習 5:** 
> 1. 上の例で、y_true = 0 (1 ではなく) を変更すると、勾配の符号はどのように変化しますか?なぜ？
> 2. グラデーションを作成した後、W1 と W2 を更新します。 `W_new = W_old - 0.1 × gradient`。再びフォワードパスを実行します – ロスは減少しますか？

---

## 6. ニューラル ネットワークを最初から構築する — XOR 問題を解決する

それでは、これらすべてを完全なクラスにまとめてみましょう。

```python
class NeuralNetwork:
    def __init__(self, layer_dims, learning_rate=0.1):
        """
        layer_dims: list kích thước mỗi layer
        Ví dụ: [2, 8, 1] = input 2 → hidden 8 neurons → output 1
        """
        self.lr = learning_rate
        self.params = {}
        self.L = len(layer_dims) - 1  # Số lớp có trọng số

        for l in range(1, self.L + 1):
            fan_in  = layer_dims[l-1]
            fan_out = layer_dims[l]
            # He initialization: đặc biệt cho ReLU — không quá lớn, không quá nhỏ
            self.params[f'W{l}'] = np.random.randn(fan_in, fan_out) * np.sqrt(2.0 / fan_in)
            self.params[f'b{l}'] = np.zeros(fan_out)

    def forward(self, X):
        """Forward pass: input → qua tất cả lớp → output"""
        self.cache = {'A0': X}
        A = X
        for l in range(1, self.L + 1):
            W = self.params[f'W{l}']
            b = self.params[f'b{l}']
            Z = A @ W + b
            # Lớp cuối dùng sigmoid (output xác suất), còn lại dùng ReLU
            A = sigmoid(Z) if l == self.L else relu(Z)
            self.cache[f'Z{l}'] = Z
            self.cache[f'A{l}'] = A
        return A

    def backward(self, y_true):
        """Backward pass: tính gradient cho tất cả trọng số"""
        m = y_true.shape[0]
        y_pred = self.cache[f'A{self.L}']
        grads = {}

        # Gradient tại output layer
        dA = -(y_true / (y_pred + 1e-15) - (1 - y_true) / (1 - y_pred + 1e-15)) / m

        for l in range(self.L, 0, -1):  # Đi ngược từ lớp cuối
            Z  = self.cache[f'Z{l}']
            A_prev = self.cache[f'A{l-1}']
            W  = self.params[f'W{l}']

            if l == self.L:
                dZ = dA * sigmoid_derivative(Z)
            else:
                dZ = dA * relu_derivative(Z)

            grads[f'dW{l}'] = A_prev.T @ dZ      # Gradient cho W
            grads[f'db{l}'] = np.sum(dZ, axis=0)  # Gradient cho b
            dA = dZ @ W.T                          # Truyền gradient cho lớp trước

        return grads

    def update(self, grads):
        """Cập nhật tham số: W_new = W_old - lr × gradient"""
        for l in range(1, self.L + 1):
            self.params[f'W{l}'] -= self.lr * grads[f'dW{l}']
            self.params[f'b{l}'] -= self.lr * grads[f'db{l}']

    def train(self, X, y, epochs=5000, verbose=True):
        """Vòng lặp huấn luyện: forward → loss → backward → update"""
        losses = []
        for epoch in range(epochs):
            # 1. Forward
            y_pred = self.forward(X)
            # 2. Tính loss
            loss = binary_cross_entropy(y, y_pred)
            # 3. Backward
            grads = self.backward(y)
            # 4. Update
            self.update(grads)
            
            losses.append(loss)
            if verbose and epoch % 1000 == 0:
                acc = np.mean((y_pred > 0.5) == y) * 100
                print(f"Epoch {epoch:5d} | Loss: {loss:.6f} | Acc: {acc:.1f}%")
        return losses

# === Huấn luyện giải XOR ===
X_xor = np.array([[0.,0.],[0.,1.],[1.,0.],[1.,1.]])
y_xor = np.array([[0.],[1.],[1.],[0.]])

nn = NeuralNetwork(layer_dims=[2, 8, 8, 1], learning_rate=0.5)
losses = nn.train(X_xor, y_xor, epochs=5000)

# Kiểm tra kết quả
predictions = nn.forward(X_xor)
print("\n🎯 Final predictions:")
for xi, yi, pi in zip(X_xor, y_xor, predictions):
    status = "✅" if (pi[0] > 0.5) == yi[0] else "❌"
    print(f"  Input: {xi} | True: {int(yi[0])} | Pred: {pi[0]:.4f} → {int(pi[0]>0.5)} {status}")
```

> **💡 演習 6:** 
> 1. 変更してみる `layer_dims` に `[2, 4, 1]` (ニューロンが少なくなります)。ネットワークはまだ XOR を解決できますか?エポックは何回必要ですか?
> 2. 試してみる `[2, 2, 1]` — ニューロンが少なすぎる → 解決できません!なぜ？
> 3. グラフを描く `losses` 時代に応じて。どの段階で損失が急激に減少しますか?

---

## 7. NumPy と PyTorch の比較

**本質**を理解するために、上記のコードは NumPy で書かれています。しかし実際には、**PyTorch** はすべてをわずか数行で実行します。

```python
import torch
import torch.nn as nn

# === PyTorch version — ngắn gọn hơn nhiều! ===
X_t = torch.FloatTensor([[0,0],[0,1],[1,0],[1,1]])
y_t = torch.FloatTensor([[0],[1],[1],[0]])

model = nn.Sequential(
    nn.Linear(2, 8),    # Lớp 1: 2 → 8
    nn.ReLU(),           # Activation
    nn.Linear(8, 8),     # Lớp 2: 8 → 8
    nn.ReLU(),
    nn.Linear(8, 1),     # Output: 8 → 1
    nn.Sigmoid()
)

optimizer = torch.optim.Adam(model.parameters(), lr=0.01)  # Adam! (từ bài 2)
criterion = nn.BCELoss()

for epoch in range(3000):
    optimizer.zero_grad()          # Xóa gradient cũ
    y_pred = model(X_t)            # Forward pass
    loss = criterion(y_pred, y_t)  # Tính loss
    loss.backward()                # Backward pass — TỰ ĐỘNG!
    optimizer.step()               # Update — TỰ ĐỘNG!

    if epoch % 1000 == 0:
        acc = ((y_pred > 0.5) == y_t).float().mean() * 100
        print(f"Epoch {epoch:5d} | Loss: {loss.item():.6f} | Acc: {acc.item():.1f}%")

# Kiểm tra
with torch.no_grad():
    preds = model(X_t)
    print("\nPyTorch predictions:", (preds > 0.5).int().squeeze().tolist())
```

**最大の違い:** PyTorch では、**forward pass** を記述するだけです。バックワードパス（勾配計算）+パラメータ更新はすべて**自動**です。

### NumPy ではなく PyTorch を使用する理由は何ですか?

|特長 |ナムピ |パイトーチ |
|----------|----------|----------|
| **Autograd** (自動勾配計算) | ❌ 手書きでなければなりません | ✅ `loss.backward()` |
| **GPU サポート** | ❌ | ✅ `model.cuda()` — **10 ～ 100 倍高速 ** |
| AI エコシステム |一般 | ✅ トランスフォーマー、ハギングフェイス... |
|デバッグが簡単 |平均 | ✅ 良い (熱心モード) |

**結論:** NumPy は **本質を理解する**のに役立ちます → 必要です。 PyTorch は **生産性向上**に役立ちます → 必須。 **両方を学びましょう**

> **💡 演習 7:** PyTorch を使用して MLP を構築し、データセットを分類する `make_moons` sklearn より (半円データ、2 クラス)。精度 > 95% を達成。提案する： `from sklearn.datasets import make_moons`。

---

## レッスンの概要

|コンセプト |簡単な理解 |次へお問い合わせください |
|----------|------|---------------|
| **パーセプトロン** | 1 人の従業員が意思決定を行う | GPT のニューロン |
| **アクティベーション** | 「トリガーしきい値」が非線形性を生み出す |トランスフォーマーのゲル |
| **MLP** |多階建ての工場 |トランスのフィードフォワード |
| **フォワードパス** |ファクトリー経由でデータを実行 |推論 = 前方パス |
| **損失関数** |出力の「エラーレベル」を測定する | LLM のクロスエントロピー |
| **バックプロパゲーション** |トレースバックしてエラーを見つけ、修正を提案します。トレーニング = 前進 + 後退 |
| **PyTorch** |逆方向 + GPU を自動化する | LLM 用の #1 ツール |

## 一般的な演習

1. ✅ 各セクションの小さな演習をすべて完了します (1.2、1.3、2、3.2、4、5、6、7)。
2. クラスを編集する `NeuralNetwork` ReLU の代わりに **Leaky ReLU** をサポートするには — どこを変更しますか?
3. **L2 正則化** (重み減衰) を損失に追加します。 `L = L_bce + λ × Σ||W||²`。なぜ正則化が必要なのでしょうか?
4. オプティマイザーの **Momentum** を実装します。 `v = β×v - α×grad; θ = θ + v`。収束速度をバニラの勾配降下法と比較します。
5. **(上級)** PyTorch を使用して、MNIST 分類 MLP (28×28 画像、10 桁のクラス) を構築します — >95% の精度を達成します

> **次の記事:** 深層学習の概要 — CNN、RNN、LSTM。なぜ特別なアーキテクチャを追加する必要があるのでしょうか?また、Transformer が誕生した理由は何ですか?
