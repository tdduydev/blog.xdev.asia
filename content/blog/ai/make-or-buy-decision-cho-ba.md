---
id: 02760001-ba01-4001-a024-000000000001
title: "Make-or-Buy Decision cho BA: Khi nào tự xây dựng, khi nào mua sẵn AI?"
slug: make-or-buy-decision-cho-ba
excerpt: >-
  Make-or-Buy là một quyết định quan trọng trong Strategy Analysis. Với AI, bài toán
  không chỉ là build hay buy, mà là cả một spectrum từ custom model đến SaaS AI.
  Bài viết này cung cấp framework để BA đánh giá và ra quyết định có cơ sở.
featured_image: /images/blog/make-or-buy-ai-ba.webp
type: blog
reading_time: 11
view_count: 0
meta: null
published_at: '2026-05-05T09:00:00.000000Z'
created_at: '2026-05-05T09:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Strategy Analysis, slug: strategy-analysis}, {name: AI Strategy, slug: ai-strategy}, {name: Decision Making, slug: decision-making}]
comments: []
---

“Nên tự build AI hay mua giải pháp có sẵn?” là câu hỏi BA sẽ gặp rất nhiều trong AI projects. Nhưng tới thời điểm hiện tại, đây không còn là lựa chọn nhị phân build vs buy đơn giản nữa. Nó là một spectrum kéo dài từ custom model đến turnkey SaaS.

## AI Solution Spectrum

```text
FULL BUILD <----------------------------------------------> FULL BUY

[Train from Scratch] -> [Fine-tune Open Source] -> [Fine-tune Foundation Model]
-> [Prompt Engineering on API] -> [SaaS AI Solution]

Build nhiều hơn  = kiểm soát cao hơn, privacy tốt hơn, linh hoạt hơn nhưng chậm và đắt hơn
Buy nhiều hơn    = ra thị trường nhanh hơn, dễ dùng hơn nhưng lock-in cao hơn
```

Không có một đáp án “đúng tuyệt đối”. Mỗi điểm trên spectrum phù hợp với một nhóm use case khác nhau.

## 5 options BA nên phân tích

### Option 1: Train custom model from scratch

- Phù hợp khi bài toán cực kỳ đặc thù, data rất nhạy cảm hoặc là lợi thế cạnh tranh cốt lõi
- Chi phí rất cao
- Timeline thường 6-18 tháng
- Cần ML Engineers, Data Scientists, MLOps

### Option 2: Fine-tune open source model

- Phù hợp khi cần customization cao nhưng vẫn muốn kiểm soát data
- Chi phí trung bình
- Timeline khoảng 2-4 tháng
- Cần ML Engineer và Data Engineer

### Option 3: Fine-tune / RAG trên foundation model

- Phù hợp khi cần customize nhưng không muốn tự gánh toàn bộ infrastructure
- Timeline khoảng 4-8 tuần
- Phù hợp nhiều team sản phẩm đang muốn đi nhanh nhưng vẫn giữ domain context

### Option 4: Prompt engineering trên AI API

- Phù hợp với use case đã tương thích tốt với foundation model
- Tốc độ triển khai nhanh nhất trong các phương án build nhẹ
- Thường hợp với drafting, summarization, classification

### Option 5: SaaS AI solution

- Phù hợp khi use case mang tính commodity
- Team chưa có AI expertise
- Cần go-live nhanh

## Framework Make-or-Buy cho BA

### 1. Strategic Differentiation

Hỏi câu đầu tiên: **AI capability này có phải core differentiator của business không?**

- Nếu là lợi thế cạnh tranh cốt lõi, xu hướng nghiêng về **build / fine-tune**.
- Nếu chỉ là năng lực phổ thông, nghiêng về **API / SaaS**.

Ví dụ:

- Recommendation engine của Amazon -> build
- Document categorization cho SME -> buy hoặc API
- Fraud detection của fintech -> hybrid hoặc fine-tune

### 2. Data Sensitivity

| Độ nhạy cảm | Gợi ý |
|------------|-------|
| **Rất cao** | Build riêng hoặc fine-tune trong private environment |
| **Trung bình** | Fine-tune / enterprise API với cam kết privacy |
| **Thấp** | API hoặc SaaS thường là đủ |

BA cần verify rõ:

- Provider có dùng data của mình cho training không?
- Retention policy là gì?
- Có đáp ứng compliance không?

### 3. Maturity & Timeline

| Tình huống | Recommendation |
|-----------|----------------|
| MVP / PoC | API hoặc SaaS để validate hypothesis nhanh |
| Product đã chứng minh value | Fine-tune / RAG nếu cần custom hơn |
| Enterprise scale | Cân nhắc build khi ROI đã rõ |

Anti-pattern phổ biến: chưa validate business case đã nhảy ngay vào train custom model.

### 4. Total Cost of Ownership

BA không nên chỉ nhìn **initial cost**. Cần so sánh ít nhất theo horizon 2-3 năm.

| | Build Custom | API-based | SaaS |
|---|---|---|---|
| Initial cost | Cao | Thấp | Trung bình |
| Maintenance | Cao | Theo usage | Theo subscription |
| Scaling cost | Gắn với infra | Gắn với volume | Gắn với license / seats |
| Lock-in risk | Thấp | Trung bình | Cao |

### 5. Internal Capability

Đánh giá rất thực tế xem team đang có gì:

- Có ML Engineers và MLOps chưa?
- Team backend có đủ mạnh để làm API integration và orchestration không?
- Có budget để tuyển thêm không?
- Có partner outsource đủ tin cậy không?

## Decision Matrix mẫu

| Criterion | Weight | Build | Fine-tune | API | SaaS |
|-----------|--------|-------|-----------|-----|------|
| Strategic differentiation | 25% | 9 | 7 | 4 | 2 |
| Data privacy | 20% | 9 | 8 | 5 | 4 |
| Speed to market | 20% | 2 | 5 | 9 | 10 |
| Cost efficiency | 20% | 3 | 6 | 8 | 7 |
| Internal capability | 15% | 2 | 5 | 8 | 9 |

Scoring matrix không thay thế judgment, nhưng nó buộc team phải tranh luận trên tiêu chí rõ ràng hơn.

## Ví dụ: Fintech muốn làm fraud detection

- Strategic differentiation: cao
- Data sensitivity: rất cao
- Timeline: gấp
- Internal capability: trung bình

Một recommendation hợp lý có thể là:

1. Ngắn hạn: dùng SaaS hoặc vendor solution để xử lý nhanh
2. Trung hạn: fine-tune model cho domain fraud riêng
3. Dài hạn: hybrid architecture để giữ phần cốt lõi có tính khác biệt

## Hybrid strategy thường là câu trả lời thực tế nhất

```text
Layer 1: Foundation Model API
  -> Summarization, drafting, general language tasks

Layer 2: Fine-tuned / domain layer
  -> Terminology, business logic, specialized reasoning

Layer 3: Rules engine
  -> Hard rules, compliance filters, deterministic checks

Layer 4: Human review
  -> High-stakes cases, appeals, overrides
```

Vai trò của BA là xác định request nào đi vào layer nào và logic handoff giữa các layers đó.

## Red flags BA nên cảnh giác

- “Tự build chắc chắn rẻ hơn về lâu dài”
- “Mình nhất định phải có proprietary model”
- “SaaS vendor chắc chắn dùng data của mình để train”
- “Fine-tune rất nhanh, vài tuần là xong”
- “Foundation model hiện tại đủ cho mọi use case”

Những statement này đều cần evidence, không nên coi là mặc định đúng.

## Kết luận

Make-or-Buy trong AI là bài toán Strategy Analysis điển hình. BA cần làm rõ:

1. Business muốn khác biệt ở đâu
2. Constraints thực tế là gì
3. Các options khác nhau có cost, risk, time như thế nào
4. Recommendation nào hợp lý nhất với giai đoạn hiện tại

Rất nhiều team sẽ có đáp án tốt nhất là: **bắt đầu bằng buy hoặc API để validate value, sau đó mới đầu tư build khi business case đủ rõ**. Đây thường là cách giảm rủi ro tốt mà vẫn học được nhanh.---
id: 02760001-ba01-4001-a024-000000000001
title: "Make-or-Buy Decision cho BA: Khi nào tự xây dựng, khi nào mua sẵn AI?"
slug: make-or-buy-decision-cho-ba
excerpt: >-
  Make-or-Buy là một trong những quyết định quan trọng nhất trong Strategy Analysis.
  Với AI, câu hỏi này càng phức tạp hơn: build custom model, fine-tune foundation model,
  hay dùng API? Bài này cung cấp framework để BA phân tích và đưa ra quyết định đúng.
featured_image: /images/blog/make-or-buy-ai-ba.webp
type: blog
reading_time: 11
view_count: 0
meta: null
published_at: '2026-05-05T09:00:00.000000Z'
created_at: '2026-05-05T09:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Strategy Analysis, slug: strategy-analysis}, {name: AI Strategy, slug: ai-strategy}, {name: Decision Making, slug: decision-making}]
comments: []
---

"Mình có nên tự build AI hay mua solution có sẵn?" — Đây là câu hỏi BA sẽ gặp rất thường trong dự án AI. Trong 2026, landscape AI đã đủ phức tạp để quyết định này không còn là "build vs buy" đơn giản nữa, mà là một spectrum từ full custom đến turnkey solution.

## AI Solution Spectrum

```
FULL BUILD ←————————————————————————→ FULL BUY

[Train from Scratch] → [Fine-tune Open Source] → [Fine-tune Foundation Model] → [Prompt Engineering on API] → [SaaS AI Solution]

    Cao nhất                                                                                              Thấp nhất
    (Cost, Control, Flexibility, Data Privacy)
    
    Thấp nhất                                                                                             Cao nhất
    (Speed to Market, Ease of Use, Vendor Lock-in Risk)
```

Không có đáp án "tốt nhất" — mỗi điểm trên spectrum có trường hợp dùng phù hợp.

## 5 Options cho AI Solution

### Option 1: Train Custom Model từ đầu
- **Khi nào**: Highly specialized domain, dữ liệu độc quyền, yêu cầu privacy tuyệt đối
- **Ví dụ**: Medical imaging AI tại bệnh viện lớn với proprietary scan data
- **Cost**: Cực cao ($500K–$5M+)
- **Timeline**: 6–18 tháng
- **Team cần**: ML Engineers, Data Scientists, MLOps

### Option 2: Fine-tune Open Source Model
- **Khi nào**: Cần customization cao nhưng budget giới hạn, data không quá nhạy cảm
- **Ví dụ**: Fine-tune Llama 3 cho customer support trong một industry cụ thể
- **Cost**: Trung bình ($50K–$200K)
- **Timeline**: 2–4 tháng
- **Team cần**: ML Engineer, Data Engineer

### Option 3: Fine-tune / RAG trên Foundation Model
- **Khi nào**: Cần customize nhưng không muốn manage infrastructure
- **Ví dụ**: RAG với company knowledge base trên top of GPT-4o/Claude
- **Cost**: Thấp–Trung bình ($20K–$100K implementation + API cost)
- **Timeline**: 4–8 tuần
- **Team cần**: Backend Dev + BA (prompt engineering)

### Option 4: Prompt Engineering trên AI API
- **Khi nào**: Use case phù hợp với foundation model, cần speed to market
- **Ví dụ**: AI-assisted email drafting, document summarization, classification
- **Cost**: Thấp (chủ yếu là API cost: $0.01–$0.10/1K tokens)
- **Timeline**: 1–4 tuần
- **Team cần**: Backend Dev + BA (prompt design)

### Option 5: SaaS AI Solution
- **Khi nào**: Commodity use case, cần turnkey, team không có AI expertise
- **Ví dụ**: Salesforce Einstein, Zendesk AI, HubSpot AI
- **Cost**: Subscription ($30–$200/user/month)
- **Timeline**: Days to weeks
- **Team cần**: Implementation consultant + Admin

## Framework Make-or-Buy cho BA

### Dimension 1: Strategic Differentiation

Hỏi: **"AI capability này có phải core differentiator của business không?"**

```
                    HIGH
                Strategic Value
                    |
Competitors     |       Build Custom
can't replicate |       (Option 1-2)
                |
────────────────┼────────────────────
                |
Commodity       |       Buy/API
capability      |       (Option 3-5)
                |
                    LOW
         LOW ←— Uniqueness of your data/domain —→ HIGH
```

**Ví dụ phân tích:**
- Amazon's recommendation engine → **Build** (core competitive advantage)
- SME's document categorization → **Buy/API** (không phải differentiator)
- Hospital's patient risk scoring → **Fine-tune** (specialized domain + privacy)
- Startup's AI chatbot MVP → **API** (speed to market quan trọng hơn)

### Dimension 2: Data Sensitivity

| Mức độ nhạy cảm | Data loại | Recommendation |
|-----------------|-----------|----------------|
| **Highly sensitive** | PHI, financial, trade secrets | Option 1-2 (on-premise hoặc private cloud) |
| **Sensitive** | PII, internal business data | Option 2-3 (với data anonymization hoặc enterprise contract) |
| **Non-sensitive** | Public data, non-PII | Option 3-5 |

**Lưu ý với AI API providers**: OpenAI, Anthropic, Google đều có enterprise plans với data privacy commitments. BA cần verify:
- Có dùng data của bạn để train không?
- Data retention policy là gì?
- GDPR/local regulations compliance?

### Dimension 3: Maturity & Timeline

| Situation | Recommendation |
|-----------|---------------|
| MVP / Proof of Concept | Option 4-5: Nhanh, cheap, validate hypothesis trước |
| Growing product, proven value | Option 3: Fine-tune/RAG khi cần customization |
| Enterprise scale, differentiated | Option 1-2: Invest vào custom khi ROI đã chứng minh |

**Anti-pattern**: Jump thẳng vào Option 1 (train from scratch) mà không validate business case → waste of resources.

### Dimension 4: Total Cost of Ownership (TCO)

BA thường chỉ so sánh **initial cost** — đây là sai lầm. Cần tính TCO 3 năm:

| | Build Custom | API-based | SaaS |
|--|---|---|---|
| **Initial cost** | $$$$ | $ | $$ |
| **Annual maintenance** | $$$$ | API cost | Subscription |
| **Scaling cost** | Linear với infra | Linear với usage | Per-seat |
| **Update cost** | Team effort | Provider handles | Provider handles |
| **Lock-in risk** | Low | Medium (API changes) | High |
| **3-year TCO example** | $500K | $80K | $150K |

*TCO phụ thuộc heavily vào scale và use case — đây chỉ là ví dụ tham chiếu.*

### Dimension 5: Internal Capability

Honest assessment về team hiện tại:

| Có gì | Capability Level |
|-------|----------------|
| ML Engineers, Data Scientists | ✅ Có thể consider Build |
| Backend Developers | ✅ Có thể làm API/Fine-tune |
| Non-technical team | → Chọn No-code SaaS |
| Budget để hire | → Build trong 6-12 tháng |
| Outsource partner | → Fine-tune với partner support |

## Decision Matrix Template

BA có thể dùng scoring matrix để present decision một cách khách quan:

| Criterion | Weight | Build Custom | Fine-tune | API | SaaS |
|-----------|--------|-------------|-----------|-----|------|
| Strategic differentiation | 25% | 9 | 7 | 4 | 2 |
| Data privacy requirements | 20% | 9 | 8 | 5 | 4 |
| Speed to market | 20% | 2 | 5 | 9 | 10 |
| Cost efficiency (3yr) | 20% | 3 | 6 | 8 | 7 |
| Internal capability | 15% | 2 | 5 | 8 | 9 |
| **Weighted Score** | 100% | **5.5** | **6.3** | **6.7** | **6.1** |

*Scores 1-10, adjust weights và scores theo context.*

## Ví dụ thực tế: Fintech Company

**Scenario**: Fintech muốn implement AI fraud detection

**Analysis:**
- Strategic differentiation: **HIGH** — Fraud detection là core risk function
- Data sensitivity: **VERY HIGH** — Transaction data, PII
- Team capability: **Medium** — Có Data Scientists nhưng không nhiều
- Timeline: **Urgent** — Fraud đang tăng

**Options considered:**
1. Train custom → 12 tháng, $800K — quá chậm
2. Fine-tune open source LLM trên fraud data → 3 tháng, $150K — viable
3. Fine-tune specialized fraud detection model (Stripe Radar-like) → 2 tháng, $100K — best
4. API-based fraud detection service → 2 tuần, $50K/year — nhanh nhưng less specialized
5. Turnkey fraud SaaS → 1 tuần, $2/transaction — acceptable short-term

**Recommendation:** 
- **Immediate (Month 1-2)**: Option 5 (SaaS) để stop bleeding ngay
- **Medium-term (Month 3-6)**: Option 3 (Fine-tune) để build differentiated capability
- **Long-term (Month 6+)**: Combine: SaaS cho real-time, custom model cho risk scoring

## Hybrid Strategy: Best of Both Worlds

Trong thực tế, nhiều company dùng hybrid approach:

```
Layer 1: Foundation Model API (GPT-4o, Claude)
  → General language tasks, summarization, draft generation

Layer 2: Fine-tuned model (company-specific)
  → Domain knowledge, terminology, custom logic

Layer 3: Rules engine (deterministic)
  → Compliance checks, hard business rules, safety filters

Layer 4: Human review
  → High-stakes decisions, edge cases, appeals
```

BA's role là define **which layer** handles which type of request và **handoff logic** giữa các layers.

## Red Flags khi nghe đề xuất Make-or-Buy

🚩 "Hãy tự build vì sẽ rẻ hơn về lâu dài" — Thường không đúng nếu không có dedicated ML team
🚩 "Chúng ta phải có AI proprietary model" — Hỏi tại sao, proprietary ≠ better
🚩 "SaaS vendor sẽ dùng data mình để train" — Verify contract, đừng assume
🚩 "Fine-tune nhanh lắm, 2 tuần là xong" — Fine-tuning đúng nghĩa mất nhiều hơn
🚩 "GPT-4o đủ cho mọi use case" — Không phải lúc nào cũng đúng, cần evaluate per use case

## Kết

Make-or-Buy trong AI không phải binary choice — đây là một spectrum với nhiều điểm dừng. Vai trò của BA là:

1. **Clarify strategic intent** — Business muốn differentiate ở đâu?
2. **Assess constraints** — Data privacy, budget, timeline, team capability
3. **Present options objectively** — Scoring matrix với TCO analysis
4. **Recommend with rationale** — Không chỉ nói "tôi chọn X", mà giải thích WHY

Quyết định Make-or-Buy tốt nhất thường là "start small với Buy/API, validate value, rồi invest vào Build khi business case đã clear." Đây là approach reduce risk và accelerate learning cùng một lúc.
