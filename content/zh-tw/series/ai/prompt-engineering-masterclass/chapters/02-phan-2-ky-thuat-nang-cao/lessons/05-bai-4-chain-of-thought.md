---
id: 019c9619-ee04-7004-f004-ee0400000004
title: 第 4 課：思維鏈 (CoT) — 讓人工智慧「思考”
slug: bai-4-chain-of-thought
description: 思路鏈提示：強制AI在回答前解釋每一步。零樣本 CoT 與少樣本 CoT。 CoT 何時會顯著提高準確性，何時將代幣費用顯著提高。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 3
section_title: 第 2 部分：先進技術
course:
  id: 019c9619-aa04-7004-b004-aa0400000004
  title: 即時工程大師班：向人工智慧發出命令的藝術
  slug: prompt-engineering-masterclass
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-7783" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-7783)"/>

  <!-- Decorations -->
  <g>
    <circle cx="607" cy="91" r="10" fill="#a78bfa" opacity="0.060000000000000005"/>
    <circle cx="614" cy="198" r="11" fill="#a78bfa" opacity="0.07"/>
    <circle cx="621" cy="45" r="12" fill="#a78bfa" opacity="0.08"/>
    <circle cx="628" cy="152" r="13" fill="#a78bfa" opacity="0.09"/>
    <circle cx="635" cy="259" r="14" fill="#a78bfa" opacity="0.1"/>
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
    <line x1="600" y1="61" x2="1100" y2="141" stroke="#a78bfa" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="91" x2="1050" y2="161" stroke="#a78bfa" stroke-width="0.5" opacity="0.08"/>
    <polygon points="992.1769145362398,143 992.1769145362398,179 961,197 929.8230854637602,179 929.8230854637602,143 961,125" fill="none" stroke="#a78bfa" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#a78bfa"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#a78bfa" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🧠 人工智慧與機器學習 — 第 3 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 4 課：思維鏈 (CoT) — Catch AI</tspan>
      <tspan x="60" dy="42">“思考”</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">即時工程大師班：向人工智慧發出命令的藝術</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 2 部分：先進技術</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![Chain-of-Thought: Direct Prompting vs Step-by-Step Reasoning](/storage/uploads/2026/04/pe-bai-4-chain-of-thought.webp)

## 簡介

您是否曾經向 ChatGPT 詢問過數學問題，而它的答案是…**錯誤**？但是當你添加行**“請逐步解釋”**時，突然它回答**正確**？

這就是**思想鏈**（CoT）－針對需要邏輯推理的問題的**最強**提示工程技術。

> **研究：** Google Brain (2022) 證明，CoT 在 GSM8K 數學問題上的準確性從 17.7% → **78.7%** 提高 - 只需添加“讓我們一步一步思考”。

---

## 1.什麼是思想鏈？

### 1.1 主要思想

**日常生活中的例子：** 你要求學生解決一道數學題：

- ** 無 CoT：** “答案是什麼？” → 學生隨機猜測，可能是錯誤的
- **CoT 包括：**「給出答案之前解釋每一步」→ 學生思考更仔細，犯的錯誤更少

人工智慧也！當你**讓人工智慧在做出反應之前「思考」時**，它的效果會更好。

### 1.2 比較：有和沒有 CoT

**❌ 無營業稅：**
```
Q: Một cửa hàng có 35 quả táo. Bán đi 20 quả vào buổi sáng,
   nhập thêm 15 quả vào buổi chiều. Hỏi cuối ngày có bao nhiêu?
A: 25 quả (có thể sai nếu model nhỏ)
```

**✅ 含 CoT：**
```
Q: Một cửa hàng có 35 quả táo. Bán đi 20 quả vào buổi sáng,
   nhập thêm 15 quả vào buổi chiều. Hỏi cuối ngày có bao nhiêu?
   Giải thích từng bước.

A: Hãy giải từng bước:
   1. Ban đầu: 35 quả
   2. Buổi sáng bán 20: 35 - 20 = 15 quả
   3. Buổi chiều nhập 15: 15 + 15 = 30 quả
   Đáp án: 30 quả ✅
```

---

## 2. CoT 的兩種類型

### 2.1 零射擊 CoT — “魔詞”

只需在提示末尾添加 **1 句話**：

```
[Câu hỏi]
Hãy suy nghĩ từng bước. / Let's think step by step.
```

最有效的「神奇短語」：

|片語|效率 |何時使用 |
|--------|----------|-------------|
| 「讓我們一步一步思考」 | ⭐⭐⭐⭐⭐ |所有邏輯問題|
| 「請解釋理由」| ⭐⭐⭐⭐ |越南語 |
| 「回答之前，先分析一下…」 | ⭐⭐⭐⭐ |分析|
| 「將其分解為子問題」 | ⭐⭐⭐⭐ |大問題|
| 「展示你的作品」| ⭐⭐⭐ |數學、密碼 |

### 2.2 Few-Shot CoT — 舉一個如何「思考」的例子

```
Giải bài toán, trình bày từng bước.

Q: Một shop bán 3 áo, mỗi áo 200k. Chi phí ship 30k. Tổng tiền?
Thinking:
- 3 áo × 200k = 600k
- Ship: 30k
- Tổng: 600k + 30k = 630k
A: 630,000 VNĐ

Q: Một nhóm 5 người ăn tối, bill 1.2 triệu. Chia đều, mỗi người
   tip thêm 10%. Mỗi người trả bao nhiêu?
Thinking:
- Bill chia đều: 1,200,000 ÷ 5 = 240,000/người
- Tip 10%: 240,000 × 0.1 = 24,000
- Tổng mỗi người: 240,000 + 24,000 = 264,000
A: 264,000 VNĐ

Q: [Bài toán mới của bạn]
```

### 2.3 零樣本與少樣本 CoT 的比較

| |零射擊 CoT |少樣本 CoT |
|--|-------------|-------------|
| **設定** |新增 1 句話 |寫2-3個範例|
| **準確度** |好 | **更好** |
| **何時** |熱門任務 |任務領域特定 |
| **努力** |低|平均 |
| **代幣成本** |低|更高 |

---

## 3. 用於程式碼和偵錯的 CoT

### 3.1 偵錯程式碼

```
Đoạn code sau bị lỗi. Phân tích TỪNG BƯỚC trước khi đưa ra fix:

1. Đọc code và hiểu intent
2. Trace execution step-by-step với input mẫu
3. Xác định chính xác dòng nào sai và tại sao
4. Đề xuất fix
5. Verify fix bằng cách trace lại

```蟒蛇
def avg_positive(nums):
    總計 = 0
    計數 = 0
    對於 nums 中的 n：
        如果 n > 0：
            總計 += n
    返回總數/計數
```
```

**AI輸出（帶CoT）：**
```
1. Intent: Tính trung bình các số dương
2. Trace với input [3, -1, 5, -2]:
   - n=3: total=3 (count không tăng!!)
   - n=-1: skip
   - n=5: total=8
   - n=-2: skip
   - return 8/0 → ZeroDivisionError! 💥
3. Bug: count KHÔNG ĐƯỢC TĂNG trong vòng lặp
4. Fix: thêm `count += 1` sau `total += n`
5. Verify: [3,-1,5,-2] → total=8, count=2 → 8/2=4.0 ✅
   Edge case: [] → count=0 → cần handle ZeroDivisionError
```

### 3.2 程式碼設計

```
Thiết kế hệ thống notification cho app e-commerce.

Trước khi code, hãy:
1. Liệt kê các loại notification cần hỗ trợ
2. Vẽ flow diagram (text-based)
3. Xác định design pattern phù hợp
4. Liệt kê edge cases
5. Sau đó mới viết code

Yêu cầu: Python, support email + SMS + push notification.
```

> **💡 練習 3：** 在您正在處理的程式碼中找出一個真正的錯誤。使用3.1中的CoT提示符進行偵錯。比較使用 CoT 與不使用 CoT 的輸出。

---

## 4. 用於分析和決策的 CoT

### 4.1 業務分析

```
Phân tích liệu công ty nên launch feature X. Suy nghĩ theo framework:

1. **Problem:** Feature X giải quyết vấn đề gì?
2. **Market:** Ai cần? Market size? Competitor có chưa?
3. **Effort:** Bao lâu? Bao nhiêu resource?
4. **Impact:** Revenue potential? User retention impact?
5. **Risks:** Điều gì có thể sai? Mitigation?
6. **Decision:** Go / No-Go / Need more data

Feature X: Tính năng "dark mode" cho app ngân hàng.
```

### 4.2 優缺點分析

```
Đánh giá quyết định: chuyển từ monolith sang microservices.

Phân tích theo framework SWOT, nghĩ kỹ từng điểm:

For each point:
1. State the point clearly
2. Explain WHY it matters
3. Give a concrete example
4. Rate impact: High/Medium/Low

Sau SWOT, đưa recommendation cuối cùng.
```

---

## 5. CoT 什麼時候無效？

CoT 並不是萬用藥**——在某些情況下它**沒有幫助**或**有害**：

|情況|科特有效嗎？ |原因 |
|------------|---------|--------|
|邏輯與數學問題| ✅ 非常有效 |需要多步驟推理 |
|程式碼調試| ✅ 非常有效 |需要追蹤執行 |
|決策| ✅ 有效 |需要考慮很多因素|
|翻譯 | ❌不需要|任務模式匹配，無需推理 |
|創意寫作| ⚠️ 視情況而定 |會限制創造力|
| 事實問答 | ❌不需要| “越南首都？” → 無需一步步 |
|簡單分類| ❌ 代幣費用 |情緒分析→零射擊就夠了|

> **規則：** CoT 非常適合需要 **多步驟推理** 的問題。當任務很簡單時，CoT **需要代幣**，但不會提高準確性。

### 5.1 營運成本成本

```
Không CoT:  Input 100 tokens + Output 50 tokens  = 150 tokens
Có CoT:     Input 100 tokens + Output 300 tokens  = 400 tokens (~2.7×)

→ CoT tốn gấp ~2-3× tokens. Chỉ dùng khi cần!
```

> **💡 練習 5：** 在 GPT-4o-mini 上執行相同的 CoT 是/否問題。計算輸出令牌。 CoT 需要多少額外費用？提高準確性值得嗎？

---

## 6. 進階 CoT 模式

### 6.1 自我驗證 CoT

讓人工智慧**檢查**自己的答案：

```
Giải bài toán sau. Sau khi giải xong:
1. Giải lần 1
2. Kiểm tra lại: thử đáp án vào đề bài, có khớp không?
3. Nếu sai, giải lại
4. Đưa đáp án cuối cùng

Bài: Tìm x: 2x + 5 = 17
```

### 6.2 辯論 CoT

讓人工智慧與自己**辯論**：

```
Câu hỏi: "React hay Vue tốt hơn cho startup?"

Hãy:
1. Lập luận ủng hộ React (3 điểm)
2. Lập luận ủng hộ Vue (3 điểm)
3. Phản biện mỗi lập luận
4. Đưa kết luận cuối cùng dựa trên specific context:
   team 3 người, app MVP, deadline 2 tháng
```

### 6.3 結構化 CoT 模板

```
Phân tích vấn đề theo framework:

## 🤔 Understanding
[Hiểu problem statement]

## 🔍 Analysis
[Phân tích từng khía cạnh]

## 💡 Options
[Liệt kê các giải pháp]

## ⚖️ Trade-offs
[So sánh pros/cons mỗi option]

## ✅ Recommendation
[Chọn option tốt nhất + giải thích]

## 🚀 Next Steps
[Action items cụ thể]
```

---

## 總結

|概念 |記住|
|--------|--------|
| **CoT** |讓AI先「思考」再「說話」 → 更高的準確度 |
| **零射擊 CoT** |加上「讓我們一步一步思考」|
| **少發CoT** |舉個例子來推理 |
| **有利於** |邏輯、數學、調試、分析、決策 |
| **無需給予** |翻譯、事實問答、簡單分類 |
| **成本** |花費 2-3× 代幣 — 僅在準確性很重要時使用 |

## 一般練習

1. ✅ 完成小練習（3、5）
2. **CoT 與 Direct：** 選擇 10 道邏輯/數學題。詢問 AI 有 2 種方式：直接詢問或 CoT。每種方式都準確地計數。
3. **自訂 CoT 範本：** 為工作中的任務建立 CoT 範本（審查設計、評估項目、分類錯誤）。測試5個案例。
4. **自我驗證：** 使用技巧 6.1 解決 5 個問題。比較有/沒有自我驗證的準確性。

> **下一篇：** 思想樹、自洽和後退－比 CoT 更先進的技術，探索多種推理途徑。
