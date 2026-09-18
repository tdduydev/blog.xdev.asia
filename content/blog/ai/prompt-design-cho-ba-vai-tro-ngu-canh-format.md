---
id: 02760001-ba01-4001-a003-000000000001
title: "Prompt Design cho BA: Viết prompt hiệu quả theo vai trò, ngữ cảnh và format"
slug: prompt-design-cho-ba-vai-tro-ngu-canh-format
excerpt: >-
  BA không cần biết fine-tuning hay embedding — nhưng cần biết viết prompt đủ tốt
  để dùng AI trong công việc hàng ngày và viết yêu cầu cho AI feature. Bài này hướng
  dẫn framework RPCF: Role, Purpose, Context, Format — cách BA thiết kế prompt có
  kiểm soát và lặp lại được.
featured_image: /images/blog/prompt-design-ba.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-05-05T10:30:00.000000Z'
created_at: '2026-05-05T10:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Prompt, slug: prompt}, {name: AI, slug: ai}, {name: LLM, slug: llm}]
comments: []
---

BA dùng AI ngày càng nhiều — tóm tắt tài liệu, draft acceptance criteria, review requirement, viết test case. Nhưng nếu prompt viết không cẩn thận, output AI sẽ chung chung, sai ngữ cảnh, hoặc thiếu format cần thiết.

Bài này không dạy AI engineering. Bài này dạy BA **viết prompt đủ tốt cho công việc hàng ngày**.

---

## 1. Framework RPCF

Bốn yếu tố của một prompt hiệu quả:

| Yếu tố | Ý nghĩa | Ví dụ |
|--------|---------|-------|
| **R**ole | AI đóng vai gì? | "Bạn là BA senior với 10 năm kinh nghiệm Fintech" |
| **P**urpose | Mục tiêu cụ thể của prompt | "Hãy review acceptance criteria sau đây" |
| **C**ontext | Ngữ cảnh cần thiết | "Dự án này là app ngân hàng mobile, user là khách hàng cá nhân" |
| **F**ormat | Định dạng output mong muốn | "Trả về dạng bullet list, tối đa 10 điểm" |

**Prompt không có RPCF:**
> "Review acceptance criteria của tôi."

**Prompt có RPCF:**
> "Bạn là BA senior với kinh nghiệm Agile. Hãy review acceptance criteria sau đây cho một tính năng chuyển tiền trong ứng dụng ngân hàng mobile. Mục tiêu là tìm edge case còn thiếu và mâu thuẫn logic. Trả về theo format: (1) Edge cases thiếu, (2) Mâu thuẫn, (3) Đề xuất bổ sung — mỗi phần tối đa 5 điểm.
> [PASTE AC]"

---

## 2. Prompt patterns BA dùng thường xuyên

### Pattern 1: Review & critique

```
Bạn là [vai trò]. Hãy review [tài liệu/artifact] theo tiêu chí [tiêu chí cụ thể].
Ngữ cảnh: [mô tả project/domain].
Trả về: [format output].
---
[PASTE CONTENT]
```

### Pattern 2: Generate first draft

```
Tạo [loại tài liệu] cho [đối tượng] với [điều kiện/ràng buộc].
Ngữ cảnh: [project context].
Format: [số lượng items, heading levels, ngôn ngữ].
Thêm [yếu tố đặc biệt nếu có, ví dụ: "edge cases cho AI feature"].
```

### Pattern 3: Transform format

```
Chuyển đổi [input format] thành [output format] sau đây.
Giữ nguyên: [những gì không được thay đổi].
Thêm: [những gì cần bổ sung nếu thiếu].
---
[PASTE CONTENT]
```

### Pattern 4: Q&A / Clarification simulation

```
Bạn là stakeholder [vai trò: PM/CTO/End User/Compliance].
Tôi sẽ trình bày requirements. Hãy đặt 5 câu hỏi khó nhất mà [vai trò đó] sẽ hỏi về requirements này.
---
[PASTE REQUIREMENTS]
```

---

## 3. Prompt cho công việc BA hàng ngày

### Tóm tắt tài liệu dài

```
Tóm tắt tài liệu sau theo góc nhìn BA cần để viết requirements:
- Key business objectives
- Stakeholders và vai trò
- Ràng buộc quan trọng (time, budget, compliance)
- Điểm mơ hồ cần clarify
Tối đa 300 từ.
---
[PASTE DOCUMENT]
```

### Tạo interview questions

```
Bạn sắp phỏng vấn [vai trò stakeholder] cho dự án [mô tả ngắn].
Tạo 10 câu hỏi discovery theo cấu trúc:
- 3 câu về as-is process
- 3 câu về pain points
- 2 câu về expectations/success criteria
- 2 câu về constraints

Tránh câu hỏi Yes/No. Ưu tiên câu hỏi open-ended.
```

### Review BRD / SRS

```
Review BRD sau đây và đánh giá:
1. Requirements nào mơ hồ hoặc không đo lường được?
2. Non-functional requirements còn thiếu?
3. Mâu thuẫn giữa các requirements?
4. Assumptions chưa được ghi rõ?

Trả về dạng bảng: | Requirement ID | Vấn đề | Đề xuất fix |
---
[PASTE BRD SECTION]
```

### Viết test scenarios từ AC

```
Từ acceptance criteria sau, viết test scenarios theo Given/When/Then:
- 3 happy path scenarios
- 3 error/edge case scenarios
- 2 performance/load scenarios

Context: [mô tả tính năng và môi trường]
---
[PASTE ACCEPTANCE CRITERIA]
```

---

## 4. Kỹ thuật nâng cao: Chain prompting

Với task phức tạp, đừng cố nhét tất cả vào 1 prompt. Chain thành nhiều bước:

**Ví dụ: Từ interview transcript → user stories**

```
Bước 1: "Tóm tắt transcript thành danh sách pain points có ưu tiên"
Bước 2: "Từ pain points này, tạo epics theo business domain"  
Bước 3: "Expand epic [X] thành 3-5 user stories theo INVEST"
Bước 4: "Với story [Y], viết acceptance criteria theo Given/When/Then"
```

Lợi ích: Output của mỗi bước được BA review trước khi đưa vào bước tiếp theo — giảm lỗi tích lũy.

---

## 5. Prompt cho AI features trong sản phẩm

Khi BA viết spec cho AI feature, cần định nghĩa prompt system của sản phẩm:

### System prompt template

```markdown
## System Prompt Template cho [Feature Name]

**Role assignment:**
Bạn là [vai trò AI trong product, VD: "assistant CSKH cho ứng dụng ngân hàng"].

**Scope:**
Chỉ trả lời các câu hỏi liên quan đến [domain cụ thể].
KHÔNG trả lời về [những gì ngoài scope].

**Tone & format:**
- Ngôn ngữ: Tiếng Việt, lịch sự, chuyên nghiệp
- Độ dài response: Tối đa [X] câu
- Format: [plain text / markdown / bullet list]

**Escalation:**
Nếu câu hỏi liên quan đến [danh sách trigger keywords], hãy:
"Tôi cần kết nối bạn với chuyên viên CSKH. Vui lòng giữ máy."

**Không bao giờ:**
- Đưa ra lời khuyên về [sensitive topics]
- Xác nhận thông tin tài khoản qua chat
- Hứa hẹn điều gì ngoài quy định
```

---

## 6. Đánh giá chất lượng prompt

Một prompt tốt khi:

| Tiêu chí | Câu hỏi kiểm tra |
|---------|-----------------|
| **Reproducible** | Chạy 3 lần ra kết quả nhất quán không? |
| **Specific** | Output có thể đánh giá đúng/sai không? |
| **Scoped** | AI có bị drifting ra ngoài chủ đề không? |
| **Actionable** | BA có thể dùng output ngay không? |
| **Safe** | AI có thể bị manipulate bởi input độc hại không? |

---

## Tổng kết

Prompt tốt không phải là viết dài nhất hay phức tạp nhất. Prompt tốt là **đủ Role + đủ Context + đủ Format** để AI trả lời đúng mục đích, với output BA có thể dùng ngay mà không cần edit nhiều.

Bắt đầu bằng framework RPCF, sau đó build thư viện prompt cho các task BA thường làm — review requirements, generate test cases, tóm tắt tài liệu, simulate stakeholder questions. Một thư viện 10–15 prompt được tune tốt sẽ tăng tốc công việc BA đáng kể.
