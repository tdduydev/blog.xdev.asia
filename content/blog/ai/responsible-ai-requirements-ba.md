---
id: 02760001-ba01-4001-a004-000000000001
title: "Responsible AI Requirements: BA viết yêu cầu cho tính năng AI an toàn"
slug: responsible-ai-requirements-ba
excerpt: >-
  Fairness, explainability, privacy và human override không chỉ là buzzword — đây là
  requirements thực sự mà BA cần capture khi build AI feature. Bài này hướng dẫn cách
  viết yêu cầu Responsible AI vào BRD/SRS, kiểm tra bằng checklist và align với các
  framework như EU AI Act, NIST AI RMF.
featured_image: /images/blog/responsible-ai-requirements.webp
type: blog
reading_time: 11
view_count: 0
meta: null
published_at: '2026-05-05T11:00:00.000000Z'
created_at: '2026-05-05T11:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Responsible AI, slug: responsible-ai}, {name: AI Governance, slug: ai-governance}, {name: Requirements, slug: requirements}]
comments: []
---

BA thường nghĩ Responsible AI là việc của AI team hoặc Legal. Nhưng thực tế: **nếu BA không capture các yêu cầu này trong spec, dev cũng không build**. Và khi production có vấn đề, câu hỏi đầu tiên sẽ là: "Requirements có ghi không?"

Bài này giúp BA biết **viết gì, capture gì** — không cần hiểu sâu thuật toán.

---

## 1. Bốn trụ cột Responsible AI BA cần capture

### 1.1 Fairness (Công bằng)

AI không được ưu tiên hoặc phân biệt đối xử dựa trên thuộc tính nhạy cảm: giới tính, dân tộc, độ tuổi, thu nhập.

**BA cần capture:**
- Các thuộc tính protected trong domain (VD: Fintech → không phân biệt theo district/income bracket)
- Cách đo fairness: demographic parity, equal opportunity, equalized odds
- Bias testing plan: test với nhóm dữ liệu đại diện đủ đa dạng

**Ví dụ requirement:**
> NFR-FAIR-01: Model chấm điểm tín dụng phải có disparate impact ratio ≥ 0.8 giữa các nhóm demographic khi evaluated trên test set tháng 3/2026. Kết quả phải được Data Science team báo cáo trước go-live.

### 1.2 Explainability (Giải thích được)

Người dùng và operator phải hiểu *tại sao* AI ra quyết định đó.

**BA cần capture:**
- User có quyền hỏi lý do không? (Đặc biệt với high-stakes decisions)
- Mức độ explanation: "AI gợi ý X vì bạn từng..." vs "Score của bạn là 720/1000"
- Khi nào cần full audit trail

**Ví dụ requirement:**
> REQ-EXPL-01: Khi AI từ chối đơn vay, màn hình phải hiển thị ≥3 lý do cụ thể bằng ngôn ngữ người dùng cuối hiểu được (không phải technical score). Lý do phải được lưu vào audit log với timestamp.

### 1.3 Privacy (Quyền riêng tư)

Dữ liệu người dùng không được dùng để train model mà không có consent rõ ràng.

**BA cần capture:**
- Loại dữ liệu nào AI dùng? PII/PHI có được ẩn danh không?
- Conversation history có dùng để fine-tune không? Nếu có, consent flow là gì?
- Data retention: conversation log giữ bao lâu?

**Ví dụ requirement:**
> REQ-PRIV-01: Conversation history chỉ được lưu trữ để improve product sau khi user opt-in rõ ràng tại onboarding. Default: opt-out. Log bị xóa sau 90 ngày nếu user không opt-in.

### 1.4 Human Override (Quyền ghi đè của người thật)

Người dùng hoặc operator phải có khả năng override quyết định AI trong mọi tình huống high-stakes.

**BA cần capture:**
- Quyết định nào AI *có thể* tự thực hiện vs *phải* có human approve
- Cơ chế override: button, escalation form, supervisor access
- Log override: ai override, khi nào, lý do gì

**Ví dụ requirement:**
> REQ-HUMAN-01: AI KHÔNG được tự động block tài khoản. Khi AI detect fraud risk > 0.9, chỉ được flag cho Fraud Team review. Block action chỉ được thực hiện sau human confirmation.

---

## 2. Risk level → mức độ Responsible AI cần thiết

Không phải mọi AI feature đều cần cùng mức độ safeguard. NIST AI RMF và EU AI Act phân loại theo risk:

| Risk Level | Ví dụ | Requirements cần có |
|-----------|-------|-------------------|
| **Minimal Risk** | AI autocomplete email | Cơ bản: không store PII không cần thiết |
| **Limited Risk** | AI chatbot CSKH | Transparency (phải rõ là AI), data privacy |
| **High Risk** | AI chấm điểm tín dụng, tuyển dụng | Full: Fairness test, explainability, audit trail, human oversight |
| **Unacceptable Risk** | AI social scoring | Không được build (banned theo EU AI Act) |

**Thực hành:** BA nên làm AI Risk Assessment trước khi viết requirements. Template đơn giản:

| Câu hỏi | Trả lời | Risk points |
|---------|---------|------------|
| AI có ảnh hưởng đến quyết định tài chính? | Yes/No | +3 nếu Yes |
| AI có dùng sensitive attributes? | Yes/No | +2 nếu Yes |
| AI quyết định có thể không bị review? | Yes/No | +2 nếu Yes |
| User có thể bị harm nếu AI sai? | Yes/No | +3 nếu Yes |

Score ≥ 5 → High Risk → Cần full Responsible AI requirements.

---

## 3. Checklist Responsible AI cho BA

```
FAIRNESS
☐ Xác định protected attributes trong domain
☐ Bias testing requirement được ghi trong NFR
☐ Fairness metric được định nghĩa (không chỉ "fair")
☐ Ai chịu trách nhiệm chạy bias test?

EXPLAINABILITY
☐ User có quyền hỏi lý do quyết định AI
☐ Explanation format phù hợp với user (technical hay plain language)
☐ Audit trail requirement được ghi rõ

PRIVACY
☐ Data minimization: AI chỉ dùng dữ liệu cần thiết
☐ PII/PHI handling requirements (anonymize, pseudonymize)
☐ Consent flow cho AI training use
☐ Data retention period được định nghĩa

HUMAN OVERRIDE
☐ Danh sách quyết định cần human approval
☐ Override mechanism được thiết kế
☐ Override log requirements
☐ Escalation path khi AI fail

TRANSPARENCY
☐ User biết mình đang tương tác với AI (không giả làm người)
☐ Limitations của AI được communicate rõ
```

---

## 4. Template Requirements trong SRS

```markdown
## 5. Non-Functional Requirements: Responsible AI

### 5.1 Fairness Requirements
**NFR-FAIR-01:** [Feature] phải được kiểm tra bias...
**Test criteria:** Disparate impact ratio ≥ [threshold] trên test set...
**Owner:** Data Science team
**Timing:** Before go-live và quarterly post-launch

### 5.2 Explainability Requirements
**REQ-EXPL-01:** Khi AI đưa ra [loại quyết định], UI phải hiển thị...
**Format:** [plain text / structured list / score breakdown]
**Audit:** Log phải giữ [N] ngày

### 5.3 Privacy Requirements
**REQ-PRIV-01:** Conversation/interaction data chỉ được retain [N] ngày...
**REQ-PRIV-02:** PII phải được [masked/anonymized] trước khi...

### 5.4 Human Override Requirements
**REQ-HUMAN-01:** Danh sách quyết định AI KHÔNG được tự động execute:
  - [Quyết định 1]
  - [Quyết định 2]
**Override mechanism:** [Mô tả UI/workflow]
```

---

## 5. Responsible AI trong conversation với stakeholder

Câu hỏi BA nên hỏi stakeholder khi kick off AI feature:

- "Nếu AI ra quyết định sai và user bị ảnh hưởng, business chịu trách nhiệm như thế nào?"
- "User của chúng ta có biết họ đang tương tác với AI không? Họ cần biết không?"
- "Có nhóm người dùng nào đặc biệt dễ bị ảnh hưởng tiêu cực bởi AI sai không?"
- "Compliance/Legal đã review use case này chưa?"
- "Khi AI upgrade lên model mới, ai phải re-validate fairness/safety?"

---

## Tổng kết

Responsible AI không phải việc của AI team — đó là **requirements** mà BA cần capture và đưa vào spec như bất kỳ functional requirement nào. BA nào bỏ qua bước này đang để technical debt về đạo đức và pháp lý tích tụ cho sản phẩm.

Bắt đầu bằng: risk assessment → identify required safeguards → viết NFR cụ thể với owner và test criteria. Đừng viết "hệ thống phải công bằng" — viết "disparate impact ratio ≥ 0.8, tested by Data Science team trước go-live".
