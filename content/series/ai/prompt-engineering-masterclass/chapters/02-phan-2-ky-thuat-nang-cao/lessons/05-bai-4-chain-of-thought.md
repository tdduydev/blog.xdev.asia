---
id: 019c9619-ee04-7004-f004-ee0400000004
title: 'Bài 4: Chain-of-Thought (CoT) — Bắt AI "Suy nghĩ"'
slug: bai-4-chain-of-thought
description: >-
  Chain-of-Thought prompting: bắt AI giải thích từng bước trước khi
  trả lời. Zero-shot CoT vs few-shot CoT. Khi nào CoT tăng accuracy
  đáng kể, khi nào phí tokens.
duration_minutes: 150
is_free: true
video_url: null
sort_order: 3
section_title: "Phần 2: Kỹ thuật Nâng cao"
course:
  id: 019c9619-aa04-7004-b004-aa0400000004
  title: "Prompt Engineering Masterclass: Nghệ thuật Ra lệnh cho AI"
  slug: prompt-engineering-masterclass
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🧠 AI &amp; ML — Bài 3</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 4: Chain-of-Thought (CoT) — Bắt AI</tspan>
      <tspan x="60" dy="42">&quot;Suy nghĩ&quot;</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Prompt Engineering Masterclass: Nghệ thuật Ra lệnh cho AI</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 2: Kỹ thuật Nâng cao</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Chain-of-Thought: Direct Prompting vs Step-by-Step Reasoning](/storage/uploads/2026/04/pe-bai-4-chain-of-thought.webp)

## Giới thiệu

Bạn có bao giờ hỏi ChatGPT một bài toán và nó trả lời... **sai**? Nhưng khi bạn thêm dòng **"Hãy giải thích từng bước"**, đột nhiên nó trả lời **đúng**?

Đó là **Chain-of-Thought** (CoT) — kỹ thuật prompt engineering **mạnh nhất** cho bài toán yêu cầu suy luận logic.

> **Nghiên cứu:** Google Brain (2022) chứng minh CoT tăng accuracy từ 17.7% → **78.7%** trên bài toán toán học GSM8K — chỉ bằng cách thêm "Let's think step by step."

---

## 1. Chain-of-Thought là gì?

### 1.1 Ý tưởng chính

**Ví dụ đời thường:** Bạn bảo học sinh giải bài toán:

- **Không CoT:** "Đáp án là gì?" → Học sinh đoán bừa, có thể sai
- **Có CoT:** "Giải thích từng bước trước khi cho đáp án" → Học sinh suy nghĩ kỹ hơn, ít sai hơn

AI cũng vậy! Khi bạn **bắt AI "nghĩ" trước khi trả lời**, nó hoạt động tốt hơn nhiều.

### 1.2 So sánh: Có và không CoT

**❌ Không CoT:**
```
Q: Một cửa hàng có 35 quả táo. Bán đi 20 quả vào buổi sáng,
   nhập thêm 15 quả vào buổi chiều. Hỏi cuối ngày có bao nhiêu?
A: 25 quả (có thể sai nếu model nhỏ)
```

**✅ Có CoT:**
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

## 2. Hai loại CoT

### 2.1 Zero-Shot CoT — "Magic words"

Chỉ cần thêm **1 câu** vào cuối prompt:

```
[Câu hỏi]
Hãy suy nghĩ từng bước. / Let's think step by step.
```

Các "magic phrases" hiệu quả nhất:

| Phrase | Hiệu quả | Khi nào dùng |
|--------|----------|-------------|
| "Let's think step by step" | ⭐⭐⭐⭐⭐ | Mọi bài toán logic |
| "Hãy giải thích reasoning" | ⭐⭐⭐⭐ | Tiếng Việt |
| "Before answering, analyze..." | ⭐⭐⭐⭐ | Bài phân tích |
| "Break this into sub-problems" | ⭐⭐⭐⭐ | Bài toán lớn |
| "Show your work" | ⭐⭐⭐ | Toán, code |

### 2.2 Few-Shot CoT — Cho ví dụ cách "nghĩ"

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

### 2.3 So sánh Zero-Shot vs Few-Shot CoT

| | Zero-Shot CoT | Few-Shot CoT |
|--|-------------|-------------|
| **Setup** | Thêm 1 câu | Viết 2-3 ví dụ |
| **Accuracy** | Tốt | **Tốt hơn** |
| **Khi nào** | Task phổ biến | Task domain-specific |
| **Effort** | Thấp | Trung bình |
| **Token cost** | Thấp | Cao hơn |

---

## 3. CoT cho Code & Debug

### 3.1 Debug code

```
Đoạn code sau bị lỗi. Phân tích TỪNG BƯỚC trước khi đưa ra fix:

1. Đọc code và hiểu intent
2. Trace execution step-by-step với input mẫu
3. Xác định chính xác dòng nào sai và tại sao
4. Đề xuất fix
5. Verify fix bằng cách trace lại

```python
def avg_positive(nums):
    total = 0
    count = 0
    for n in nums:
        if n > 0:
            total += n
    return total / count
```
```

**AI output (với CoT):**
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

### 3.2 Code Design

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

> **💡 Bài tập 3:** Lấy 1 bug thật trong code bạn đang làm. Dùng CoT prompt ở 3.1 để debug. So sánh output có CoT vs không CoT.

---

## 4. CoT cho Analysis & Decision Making

### 4.1 Business Analysis

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

### 4.2 Pros-Cons Analysis

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

## 5. Khi nào CoT KHÔNG hiệu quả?

CoT **không phải thuốc tiên** — có trường hợp nó **không giúp** hoặc **gây hại**:

| Tình huống | CoT hiệu quả? | Lý do |
|-----------|---------|-------|
| Bài toán logic, toán | ✅ Rất hiệu quả | Cần suy luận multi-step |
| Code debugging | ✅ Rất hiệu quả | Cần trace execution |
| Decision making | ✅ Hiệu quả | Cần cân nhắc nhiều yếu tố |
| Dịch thuật | ❌ Không cần | Task pattern matching, không cần suy luận |
| Creative writing | ⚠️ Tùy | Có thể limit sáng tạo |
| Factual Q&A | ❌ Không cần | "Thủ đô Việt Nam?" → không cần step-by-step |
| Phân loại đơn giản | ❌ Phí tokens | Sentiment analysis → zero-shot đủ |

> **Quy tắc:** CoT tốt cho bài toán cần **suy luận nhiều bước**. Khi task đơn giản, CoT **phí tokens** mà không tăng accuracy.

### 5.1 Chi phí CoT

```
Không CoT:  Input 100 tokens + Output 50 tokens  = 150 tokens
Có CoT:     Input 100 tokens + Output 300 tokens  = 400 tokens (~2.7×)

→ CoT tốn gấp ~2-3× tokens. Chỉ dùng khi cần!
```

> **💡 Bài tập 5:** Chạy cùng 1 câu hỏi có/không CoT trên GPT-4o-mini. Đếm tokens output. CoT tốn thêm bao nhiêu %? Accuracy cải thiện đáng không?

---

## 6. Advanced CoT Patterns

### 6.1 Self-Verification CoT

Bắt AI **kiểm tra lại** đáp án của chính nó:

```
Giải bài toán sau. Sau khi giải xong:
1. Giải lần 1
2. Kiểm tra lại: thử đáp án vào đề bài, có khớp không?
3. Nếu sai, giải lại
4. Đưa đáp án cuối cùng

Bài: Tìm x: 2x + 5 = 17
```

### 6.2 Debate CoT

Bắt AI **tranh luận** với chính nó:

```
Câu hỏi: "React hay Vue tốt hơn cho startup?"

Hãy:
1. Lập luận ủng hộ React (3 điểm)
2. Lập luận ủng hộ Vue (3 điểm)
3. Phản biện mỗi lập luận
4. Đưa kết luận cuối cùng dựa trên specific context:
   team 3 người, app MVP, deadline 2 tháng
```

### 6.3 Structured CoT Template

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

## Tóm tắt

| Concept | Ghi nhớ |
|---------|---------|
| **CoT** | Bắt AI "nghĩ" trước "nói" → accuracy cao hơn |
| **Zero-Shot CoT** | Thêm "Let's think step by step" |
| **Few-Shot CoT** | Cho ví dụ cách reasoning |
| **Tốt cho** | Logic, toán, debug, analysis, decision |
| **Không cần cho** | Dịch, factual Q/A, classification đơn giản |
| **Cost** | Tốn 2-3× tokens — chỉ dùng khi accuracy quan trọng |

## Bài tập tổng hợp

1. ✅ Hoàn thành bài tập nhỏ (3, 5)
2. **CoT vs Direct:** Chọn 10 bài toán logic/toán. Hỏi AI 2 cách: direct vs CoT. Đếm accuracy mỗi cách.
3. **Custom CoT Template:** Tạo CoT template cho 1 task trong công việc (review design, estimate project, triage bugs). Test 5 cases.
4. **Self-Verification:** Dùng kỹ thuật 6.1 cho 5 bài toán. So sánh accuracy có/không self-verify.

> **Bài tiếp theo:** Tree-of-Thoughts, Self-Consistency & Step-Back — các kỹ thuật nâng cao hơn CoT, explore nhiều hướng suy luận.
