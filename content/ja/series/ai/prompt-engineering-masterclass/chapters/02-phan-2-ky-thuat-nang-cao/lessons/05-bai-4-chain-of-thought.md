---
id: 019c9619-ee04-7004-f004-ee0400000004
title: 'レッスン 4: 思考連鎖 (CoT) — AI に「考える」ようにさせる'
slug: bai-4-chain-of-thought
description: >-
  思考連鎖プロンプト: 回答する前に AI に各ステップの説明を強制します。ゼロショット CoT と少数ショット CoT。 CoT
  の精度が大幅に向上するのはいつですか。また、トークン料金はいつ増加しますか。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 3
section_title: 'パート 2: 高度なテクニック'
course:
  id: 019c9619-aa04-7004-b004-aa0400000004
  title: 'プロンプト エンジニアリング マスタークラス: AI にコマンドを与える技術'
  slug: prompt-engineering-masterclass
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🧠 AI と ML — レッスン 3</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 4: 思考連鎖 (CoT) — AI をキャッチする</tspan>
      <tspan x="60" dy="42">「考える」</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">プロンプト エンジニアリング マスタークラス: AI にコマンドを与える技術</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 2: 高度なテクニック</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Chain-of-Thought: Direct Prompting vs Step-by-Step Reasoning](/storage/uploads/2026/04/pe-bai-4-chain-of-thought.webp)

## はじめに

ChatGPT に数学の問題を尋ねたときに、答えが...**間違っ** だったことがありますか?しかし、**「順を追って説明してください」** という行を追加すると、突然 **正解** と答えます。

それが **思考連鎖** (CoT) であり、論理的推論を必要とする問題に対する **最強**なプロンプト エンジニアリング テクニックです。

> **調査:** Google Brain (2022) は、「ステップごとに考えてみましょう」を追加するだけで、GSM8K 数学問題の精度が CoT によって 17.7% → **78.7%** に向上することを証明しています。

---

## 1. 思考連鎖とは何ですか?

### 1.1 主なアイデア

**通常の生活の例:** 生徒に数学の問題を解くように指示します。

- **CoT なし:** 「答えは何ですか?」 → 生徒はランダムに推測するため、間違っている可能性があります。
- **CoT が含まれます:** 「答えを言う前に各ステップを説明する」 → 生徒はより慎重に考え、間違いが減ります

AIも！ **応答する前に AI に「考えさせる」**と、動作が大幅に向上します。

### 1.2 比較: CoT ありとなし

**❌ CoT なし:**
```
Q: Một cửa hàng có 35 quả táo. Bán đi 20 quả vào buổi sáng,
   nhập thêm 15 quả vào buổi chiều. Hỏi cuối ngày có bao nhiêu?
A: 25 quả (có thể sai nếu model nhỏ)
```

**✅ CoT あり:**
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

## 2. 2 種類の CoT

### 2.1 ゼロショット CoT — 「魔法の言葉」

プロンプトの最後に **1 文**を追加するだけです。

```
[Câu hỏi]
Hãy suy nghĩ từng bước. / Let's think step by step.
```

最も効果的な「魔法のフレーズ」:

|フレーズ |効率 |いつ使用するか |
|----------|----------|---------------|
| 「一歩ずつ考えてみましょう」 | ⭐⭐⭐⭐⭐ |すべての論理問題 |
| 「推論を説明してください」 | ⭐⭐⭐⭐ |ベトナム語 |
| 「答える前に分析してください...」 | ⭐⭐⭐⭐ |分析 |
| 「これをサブ問題に分割します」 | ⭐⭐⭐⭐ |大きな問題 |
| 「あなたの作品を見せてください」 | ⭐⭐⭐ |数学、コード |

### 2.2 フューショット CoT — 「考える」方法の例を挙げる

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

### 2.3 ゼロショット CoT と少数ショット CoT の比較

| |ゼロショットCoT |少数ショットCoT |
|---|-------------|---------------|
| **セットアップ** | 1 文を追加 | 2 ～ 3 個の例を書いてください |
| **精度** |良い | **より良い** |
| **いつ** |人気のタスク |タスクドメイン固有 |
| **努力** |低い |平均 |
| **トークンコスト** |低い |より高い |

---

## 3. コードとデバッグの CoT

### 3.1 デバッグコード

```
Đoạn code sau bị lỗi. Phân tích TỪNG BƯỚC trước khi đưa ra fix:

1. Đọc code và hiểu intent
2. Trace execution step-by-step với input mẫu
3. Xác định chính xác dòng nào sai và tại sao
4. Đề xuất fix
5. Verify fix bằng cách trace lại

```パイソン
def avg_positive(数値):
    合計 = 0
    カウント = 0
    n を数値で表した場合:
        n > 0の場合:
            合計 += n
    合計/カウントを返す
```
```

**AI 出力 (CoT あり):**
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

### 3.2 コード設計

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

> **💡 演習 3:** 作業中のコード内の実際のバグを取り上げます。 3.1 の CoT プロンプトを使用してデバッグします。 CoT ありの出力と CoT なしの出力を比較します。

---

## 4. 分析と意思決定のための CoT

### 4.1 ビジネス分析

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

### 4.2 メリットとデメリットの分析

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

＃＃５．CoTが効果がないのはどんなときですか？

CoT は **万能薬ではありません**。**役に立たない**、または**害を及ぼす**場合があります。

|状況 | CoTは効果的ですか？ |理由 |
|----------|-----------|----------|
|論理と数学の問題 | ✅ 非常に効果的 |複数ステップの推論が必要 |
|コードのデバッグ | ✅ 非常に効果的 |トレースの実行が必要 |
|意思決定 | ✅ 効果的 |多くの要素を考慮する必要があります。
|翻訳 | ❌ 必要ありません |タスクのパターン マッチング、推論は不要 |
|クリエイティブライティング | ⚠️場合による |創造性が制限される可能性があります |
|事実に関するQ&A | ❌ 必要ありません | 「ベトナムの首都？」 → ステップバイステップは必要ありません |
|簡単な分類 | ❌ トークンの手数料 |感情分析 → ゼロショットで十分 |

> **ルール:** CoT は、**複数ステップの推論**を必要とする問題に適しています。タスクが単純な場合、CoT は精度を高めることなく **トークンのコスト** を要します。

### 5.1 CoT コスト

```
Không CoT:  Input 100 tokens + Output 50 tokens  = 150 tokens
Có CoT:     Input 100 tokens + Output 300 tokens  = 400 tokens (~2.7×)

→ CoT tốn gấp ~2-3× tokens. Chỉ dùng khi cần!
```

> **💡 演習 5:** 同じ CoT はい/いいえの質問を GPT-4o-mini で実行します。出力トークンをカウントします。 CoT の追加料金はいくらですか?精度を向上させることに価値はあるのでしょうか?

---

## 6. 高度な CoT パターン

### 6.1 自己検証 CoT

AI に独自の答えを **チェック**させます。

```
Giải bài toán sau. Sau khi giải xong:
1. Giải lần 1
2. Kiểm tra lại: thử đáp án vào đề bài, có khớp không?
3. Nếu sai, giải lại
4. Đưa đáp án cuối cùng

Bài: Tìm x: 2x + 5 = 17
```

### 6.2 議論のCoT

AI に AI 自身と**議論**させます:

```
Câu hỏi: "React hay Vue tốt hơn cho startup?"

Hãy:
1. Lập luận ủng hộ React (3 điểm)
2. Lập luận ủng hộ Vue (3 điểm)
3. Phản biện mỗi lập luận
4. Đưa kết luận cuối cùng dựa trên specific context:
   team 3 người, app MVP, deadline 2 tháng
```

### 6.3 構造化された CoT テンプレート

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

## 概要

|コンセプト |覚えておいてください |
|----------|----------|
| **CoT** | AIに「話す」前に「考える」→精度向上 |
| **ゼロショット CoT** | 「ステップバイステップで考えてみましょう」を追加 |
| **数ショット CoT** |推論の例を挙げてください |
| **良いこと** |ロジック、数学、デバッグ、分析、意思決定 |
| **与える必要はありません** |翻訳、事実Q/A、簡易分類 |
| **コスト** | 2 ～ 3 倍のトークンのコスト – 正確さが重要な場合にのみ使用 |

## 一般的な演習

1. ✅ 小さな演習 (3、5) を完了する
2. **CoT vs Direct:** 論理/数学の問題を 10 個選択します。 AI に 2 つの方法で質問します: 直接か CoT。それぞれの方法で正確に数えます。
3. **カスタム CoT テンプレート:** 作業中のタスク (設計のレビュー、プロジェクトの見積もり、バグの優先順位付け) の CoT テンプレートを作成します。 5 つのケースをテストします。
4. **自己検証:** 5 つの問題に対してテクニック 6.1 を使用します。自己検証あり/なしで精度を比較します。

> **次の記事:** 思考の木、自己一貫性、ステップバック — CoT よりも高度なテクニックで、推論の多くの道を探求します。
