---
id: 019c9619-ee05-7005-f005-ee0500000005
title: 第五課：思想樹、自洽與後退一步
slug: bai-5-tree-of-thoughts
description: 進階技巧：思想樹、自我一致性、後退提示。比較每種技術的有效性。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 4
section_title: 第 2 部分：先進技術
course:
  id: 019c9619-aa04-7004-b004-aa0400000004
  title: 即時工程大師班：向人工智慧發出命令的藝術
  slug: prompt-engineering-masterclass
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-513" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-513)"/>

  <!-- Decorations -->
  <g>
    <circle cx="788" cy="214" r="26" fill="#fbbf24" opacity="0.09"/>
    <circle cx="976" cy="102" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="664" cy="250" r="14" fill="#fbbf24" opacity="0.07"/>
    <circle cx="852" cy="138" r="8" fill="#fbbf24" opacity="0.11"/>
    <circle cx="1040" cy="286" r="32" fill="#fbbf24" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <line x1="600" y1="174" x2="1100" y2="254" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="204" x2="1050" y2="274" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="949.1147367097487,109.5 949.1147367097487,138.5 924,153 898.8852632902513,138.5 898.8852632902513,109.50000000000001 924,95" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🧠 人工智慧與機器學習 — 第 4 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第五課：思想樹，自洽</tspan>
      <tspan x="60" dy="42">& 後退一步</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">即時工程大師班：向人工智慧發出命令的藝術</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 2 部分：先進技術</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![Tree-of-Thoughts: IO vs CoT vs ToT — Multi-path Reasoning](/storage/uploads/2026/04/pe-bai-5-tree-of-thoughts.webp)

## 簡介

思想鏈（CoT）迫使人工智慧**以一種方式**思考。但很多問題都有**多個方向**需要解決－CoT只探索一個方向，可能會選擇錯誤的方向。

本文介紹了 3 種技術**比 CoT 更強大**：

|工程|想法 |現實生活中的例子|
|--------|---------|----------------|
| **思想樹** |探索多個方向，選擇最好的一個 | GPS：嘗試3條路線，選擇最快|
| **自我一致性** |多次解答，選擇最受歡迎的答案 |詢問5位醫生，獲得多數意見 |
| **後退一步** |在解決具體問題之前先提出一般性問題 |退後一步，先看大局，然後再畫細節 |

---

## 1. 思想樹 (ToT)

### 1.1 與 CoT 的比較

```
CoT (Chain):     A → B → C → D → Answer
                 1 đường duy nhất, nếu B sai → tất cả sai

ToT (Tree):      A → B1 → C1 → ✅ Answer 1 (score: 8/10)
                   → B2 → C2 → ❌ Dead end
                   → B3 → C3 → ✅ Answer 2 (score: 9/10) ← Winner!
                 Explore nhiều nhánh, chọn nhánh tốt nhất
```

### 1.2 ToT 提示模板

```
Bài toán: [vấn đề cần giải]

Hãy giải theo phương pháp Tree-of-Thoughts:

## Bước 1: Brainstorm (3 hướng tiếp cận)
- Hướng A: [mô tả]
- Hướng B: [mô tả]
- Hướng C: [mô tả]

## Bước 2: Đánh giá mỗi hướng (1-10)
Với mỗi hướng, phân tích:
- Feasibility (khả thi?)
- Quality (chất lượng kết quả?)
- Effort (tốn bao nhiêu effort?)

## Bước 3: Chọn hướng tốt nhất
Chọn hướng có score cao nhất và phát triển chi tiết.

## Bước 4: Giải chi tiết theo hướng đã chọn

## Bước 5: Verify
Kiểm tra lại đáp án, liệu có hướng nào tốt hơn không?
```

### 1.3 範例：架構設計

```
Thiết kế system architecture cho app chat real-time
(10K concurrent users).

Dùng Tree-of-Thoughts:

Hướng 1: WebSocket + Redis Pub/Sub + PostgreSQL
Hướng 2: SSE (Server-Sent Events) + Kafka + MongoDB
Hướng 3: gRPC streaming + NATS + CockroachDB

Với mỗi hướng, đánh giá:
- Scalability (1-10)
- Complexity (1-10, thấp = đơn giản hơn)
- Latency (1-10, cao = nhanh hơn)
- Cost (1-10, cao = rẻ hơn)

Chọn hướng tốt nhất, giải thích trade-offs.
Vẽ architecture diagram (text-based).
```

> **💡練習 1：** 使用 ToT 提示來解決：「為 MVP 個人費用管理應用程式選擇技術堆疊（行動優先，3 個月，2 個開發團隊）」。比較3個方向，選擇1。

---

## 2. 自洽

### 2.1 想法

**實際範例：** 您不確定 27 × 13 = 是什麼。你數3次：
- 第一次：351 ✅
- 第二次：341 ❌
- 第三次：351 ✅
→ **答案：351**（2/3 票）

自我一致性=以相同的提示**多次**調用AI，得到**最常見的**答案。

### 2.2 實施

```python
"""Self-Consistency: gọi API 5 lần, lấy đáp án đa số"""
from openai import OpenAI
from collections import Counter

client = OpenAI()

question = """
Một cửa hàng mua 100 quả cam với giá 5000đ/quả.
Bán lẻ 60 quả với giá 8000đ/quả.
Bán sỉ 30 quả với giá 6000đ/quả.
10 quả hỏng. Hỏi lãi/lỗ bao nhiêu?
Chỉ trả lời số tiền và lãi/lỗ.
"""

# Gọi 5 lần với temperature > 0 (để có diversity)
answers = []
for i in range(5):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        temperature=0.7,  # Cho phép variation
        messages=[
            {"role": "user", "content": question + "\nLet's think step by step."}
        ]
    )
    answer = response.choices[0].message.content
    answers.append(answer)
    print(f"Run {i+1}: {answer.strip()[:80]}")

# Lấy đáp số phổ biến nhất
print(f"\n{'='*40}")
print(f"5 answers collected → majority vote:")
# Trong thực tế, extract số từ text rồi đếm
```

### 2.3 何時使用自洽？

| ✅ 使用時 | ❌ 當 | 時請勿使用
|------------|------------|
|此題有 1 個正確答案 |創意寫作（寫作、腦力激盪）|
|需高度信心 |預算有限（通話 5× = 5× 成本）|
|難題，常常出錯|簡單問題（零樣本就夠了）|

---

## 3. 後退提示

### 3.1 想法

**不要**直接問一個具體問題，**退一步**並先問一個**更一般的**問題：

```
❌ Trực tiếp: "Nhiệt độ sôi của nước ở độ cao 3000m?"
   → AI có thể bịa

✅ Step-Back:
   Bước 1: "Quy luật nào ảnh hưởng nhiệt độ sôi?"
   → AI: "Áp suất. Áp suất thấp → nhiệt độ sôi giảm."
   
   Bước 2: "Vậy ở 3000m (áp suất ~70kPa), nhiệt độ sôi là?"
   → AI: "~90°C" ✅ (chính xác hơn nhiều!)
```

### 3.2 模板

```
Câu hỏi chính: [câu hỏi cụ thể]

Trước khi trả lời, hãy:
1. [STEP BACK] Xác định nguyên tắc/lý thuyết nền tảng liên quan
2. [CONTEXT] Áp dụng nguyên tắc vào bối cảnh cụ thể
3. [ANSWER] Trả lời chính xác câu hỏi
```

### 3.3 實際例子

**調試：**
```
Bug: App crash khi user upload file > 10MB.

Step-Back: Trước khi debug:
1. Những yếu tố nào ảnh hưởng file upload? (memory, timeout, server config, client validation)
2. Kiến trúc upload trong app này: client → API → S3?
3. Giới hạn nào đang được set? (nginx, express, multer)

Giờ hãy phân tích bug dựa trên framework trên.
```

**商業決策：**
```
Câu hỏi: Có nên mở chi nhánh ở Đà Nẵng?

Step-Back trước:
1. Những yếu tố nào quyết định mở chi nhánh thành công?
   (market size, competition, cost, talent pool, logistics)
2. Đà Nẵng đang ở đâu trên mỗi yếu tố này?
3. So sánh với alternatives (Cần Thơ, Hải Phòng, online expansion)?

Sau đó đưa recommendation.
```

> **💡 練習 3：** 使用 Step-Back 回答以下問題：「我的電子商務應用程式應該使用 PostgreSQL 還是 MongoDB？」— 迫使AI先確定選擇資料庫的原則，然後再具體比較。

---

## 4. 比較所有技術

|工程|準確度|代幣成本 |複雜度 |最適合 |
|--------|----------|------------|------------|---------|
| **零射擊** | ⭐⭐ | ⭐（至少）| ⭐（最簡單）|簡單的任務 |
| **少射** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |模式匹配|
| **CoT** | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐ |邏輯、數學 |
| **致T** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |設計、企劃|
| **自我一致性** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐（最貴）| ⭐⭐ |高風險精確度 |
| **後退一步** | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |複雜領域|

### 決策框架

```
Bạn cần gì?
├── Task đơn giản → Zero-shot / Few-shot
├── Cần suy luận logic → CoT
├── Cần explore nhiều hướng → ToT
├── Cần đáp án chính xác nhất → Self-Consistency
└── Bài toán domain phức tạp → Step-Back + CoT
```

---

## 5. 結合多種技術

### 5.1 CoT + 自我一致性

```python
# Gọi CoT 5 lần, lấy đa số
for i in range(5):
    response = call_ai(prompt + "\nThink step by step.")
    answers.append(extract_answer(response))
final = majority_vote(answers)
```

### 5.2 後退 + ToT

```
Bài toán: Thiết kế payment system cho marketplace.

Step-Back (nguyên tắc trước):
1. Những yếu tố quan trọng nhất trong payment system?
   (security, reliability, latency, compliance, cost)
2. Các pattern phổ biến? (escrow, direct, split payment)

Tree-of-Thoughts (explore):
Hướng A: Stripe Connect (hosted, simple)
Hướng B: Custom (PayOS + VNPay, localized)
Hướng C: Hybrid (Stripe international + VNPay domestic)

Đánh giá mỗi hướng theo 5 tiêu chí ở step 1.
Chọn hướng tốt nhất.
```

---

## 總結

|概念 |記住|
|--------|--------|
| **致T** |探索 3+ 個方向、評論、選擇最佳 |
| **自我一致性** |呼叫 N 次，多數投票 — 昂貴但準確 |
| **後退一步** |在具體解決之前先詢問一般原則 |
| **組合** |後退 + CoT 或 ToT + 自我一致性 |

## 一般練習

1. ✅ 完成小練習（1、3）
2. **技術比較：** 選擇一個設計問題（例如：「設計一個 URL 縮短器」）。解決方法：CoT、ToT、Step-Back+CoT。比較輸出品質。
3. **自我一致性測驗：** 選擇 5 個數學/邏輯問題。每題解決 5 次（溫度=0.7）。多數投票準確率與單次準確率？
4. **組合提示：** 針對實際用例建立結合 Step-Back + ToT 的「大型提示」。測試和迭代。

> **下一篇文章：** 結構化輸出 - JSON 模式、函數呼叫架構，以及如何強制 AI 以可解析格式回應自動化管道。
