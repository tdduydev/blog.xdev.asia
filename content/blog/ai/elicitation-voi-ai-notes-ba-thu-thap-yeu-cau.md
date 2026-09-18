---
id: 02760001-ba01-4001-a002-000000000001
title: "Elicitation với AI: Cách BA thu thập yêu cầu nhanh hơn mà không mất ngữ cảnh"
slug: elicitation-voi-ai-notes-ba-thu-thap-yeu-cau
excerpt: >-
  Kỹ thuật Elicitation truyền thống mất nhiều giờ note-taking và synthesis. Bài này
  hướng dẫn BA dùng AI để tóm tắt interview, tự động nhóm insight, phát hiện gap yêu
  cầu và tạo action items — giữ nguyên chất lượng mà tiết kiệm 60% thời gian xử lý.
featured_image: /images/blog/elicitation-ai-notes-ba.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-05-05T09:00:00.000000Z'
created_at: '2026-05-05T09:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Requirements, slug: requirements}, {name: AI, slug: ai}, {name: Elicitation, slug: elicitation}]
comments: []
---

Elicitation — thu thập yêu cầu — là kỹ năng cốt lõi nhất của BA. Nhưng phần mất thời gian nhất không phải là *hỏi*, mà là *xử lý* sau khi hỏi: nghe lại recording, gõ notes, nhóm insight, viết summary, tìm gap, gửi follow-up. Một workshop 2 tiếng có thể mất thêm 3–4 tiếng synthesis.

AI không thay thế BA trong phòng họp — nhưng AI **có thể làm phần lớn công việc synthesis** sau đó.

---

## 1. Elicitation là gì và tại sao phức tạp?

Elicitation là quá trình BA **kéo ra** (không phải *thu thập* thụ động) thông tin từ stakeholder: nhu cầu, mục tiêu, ràng buộc, kỳ vọng và cả những điều họ *chưa nói ra*.

Kỹ thuật phổ biến:
- **Phỏng vấn 1-1**: Khai thác chiều sâu từng vai trò
- **Workshop nhóm**: Align đa stakeholder cùng lúc
- **Observation / Job shadowing**: Quan sát thực tế người dùng làm việc
- **Document analysis**: Đọc SOP, báo cáo, complaint log
- **Survey**: Thu thập dữ liệu số lượng lớn

Vấn đề: Sau mỗi session, BA phải *kết nối* nhiều nguồn thông tin, phát hiện mâu thuẫn, xác định độ ưu tiên — tất cả bằng tay.

---

## 2. AI giúp được gì trong Elicitation?

AI không ngồi phỏng vấn thay bạn. Nhưng AI rất giỏi ở các bước **sau session**:

| Bước | Truyền thống | Với AI |
|------|-------------|-------|
| Transcribe recording | Nghe lại, gõ tay | Auto-transcribe (Whisper, Otter.ai) |
| Tóm tắt nội dung | Đọc lại, highlight | Prompt → structured summary |
| Nhóm insight theo chủ đề | Post-it + Miro | Prompt → affinity clusters |
| Phát hiện gap / mâu thuẫn | Kinh nghiệm BA | Prompt cross-check nhiều transcript |
| Tạo action items | Tự viết | Prompt → draft follow-up list |
| Draft follow-up email | Viết từ đầu | Prompt → email template |

---

## 3. Workflow thực tế: Từ recording → requirements

### Bước 1: Transcribe

Dùng **Whisper** (local, free) hoặc **Otter.ai / Fireflies** (cloud). Output: file `.txt` hoặc `.srt`.

```bash
# Local Whisper
whisper interview.mp3 --language Vietnamese --output_format txt
```

### Bước 2: Summary prompt

```
Bạn là Business Analyst. Đây là transcript phỏng vấn stakeholder:
[PASTE TRANSCRIPT]

Hãy tóm tắt theo format sau:
1. Mục tiêu stakeholder (bullet points)
2. Pain points hiện tại (bullet points)
3. Yêu cầu chức năng ngầm định (bullet points)
4. Ràng buộc đã đề cập (thời gian, budget, pháp lý)
5. Câu hỏi cần clarify thêm
```

### Bước 3: Affinity clustering

Khi có nhiều transcript từ nhiều stakeholder:

```
Đây là 3 summary từ 3 stakeholder khác nhau:
[SUMMARY 1] [SUMMARY 2] [SUMMARY 3]

Nhóm các insight theo chủ đề. Với mỗi chủ đề:
- Stakeholder nào đồng thuận
- Stakeholder nào có quan điểm khác nhau
- Điểm mâu thuẫn cần resolve
```

### Bước 4: Gap detection

```
Đây là requirements đã có từ session trước:
[EXISTING REQUIREMENTS]

Đây là insight mới từ workshop hôm nay:
[NEW INSIGHTS]

Hãy xác định:
- Requirements nào bị thay đổi
- Gap mới phát sinh
- Mâu thuẫn với requirements cũ
- Câu hỏi cần hỏi lại stakeholder
```

---

## 4. Prompt pack cho Interview Elicitation

### Discovery interview (lần đầu gặp stakeholder)

```
As-is process questions:
- "Bạn đang làm bước này như thế nào hiện tại?"
- "Điều gì mất nhiều thời gian nhất?"
- "Khi nào thì quy trình này fail?"
- "Ai khác bị ảnh hưởng khi việc này xảy ra?"

To-be vision questions:
- "Nếu bạn có thể thay đổi 1 điều, đó là gì?"
- "Thành công trông như thế nào sau 6 tháng?"
- "Điều gì KHÔNG thể thay đổi?"
```

### Follow-up clarification template

```
Cảm ơn bạn đã dành thời gian hôm nay. Tôi có vài điểm muốn xác nhận lại:

1. [ĐIỂM CẦN CLARIFY 1] — Tôi hiểu là [DIỄN GIẢI CỦA BẠN], có đúng không?
2. [ĐIỂM CẦN CLARIFY 2] — Bạn có thể cho ví dụ cụ thể không?
3. [MÂU THUẪN] — [STAKEHOLDER A] nói X, trong khi bạn đề cập Y. Ai có thể quyết định hướng nào?

Deadline để phản hồi: [DATE]
```

---

## 5. Kiểm soát chất lượng AI output

AI có thể **hallucinate** — tạo ra "insight" không thực sự có trong transcript. BA cần:

1. **Luôn cross-check với raw transcript**: Nếu AI bảo stakeholder nói X, tìm chính xác câu đó trong transcript.
2. **Đánh dấu mức độ confidence**: High (stakeholder nói rõ) / Medium (ngầm định) / Low (AI suy luận).
3. **Không dùng AI output thay thế sign-off**: Summary AI vẫn cần stakeholder confirm.

```
[CHECKLIST XÁC NHẬN ELICITATION]
☐ Mỗi requirement có nguồn gốc (stakeholder + session + quote)
☐ Mâu thuẫn được ghi nhận, chưa tự ý resolve
☐ Stakeholder đã review và confirm summary
☐ Action items có owner và deadline
☐ Recording/transcript được lưu trữ đúng nơi
```

---

## 6. Tools BA nên biết

| Tool | Dùng để | Free? |
|------|---------|-------|
| **Whisper** (OpenAI) | Transcribe local, hỗ trợ tiếng Việt | ✅ |
| **Otter.ai** | Live transcription, có speaker detection | Freemium |
| **Fireflies.ai** | Tích hợp Google Meet/Zoom, AI summary | Freemium |
| **Miro AI** | Affinity diagram tự động từ notes | Freemium |
| **Notion AI** | Tóm tắt trang, viết follow-up email | Freemium |
| **Claude / ChatGPT** | Phân tích transcript, detect gap | Freemium |

---

## 7. Dấu hiệu Elicitation chưa đủ

Nhiều BA nghĩ đã đủ requirement nhưng thực ra chưa. Dấu hiệu cảnh báo:

- **"Tôi nghĩ stakeholder muốn..."** — Không có evidence
- **Tất cả requirements là HIGH priority** — Chưa force ranking
- **Không có ràng buộc nào** — Chưa khai thác đủ
- **Không có non-functional requirement** — Thiếu performance, security, scalability
- **0 mâu thuẫn giữa stakeholders** — Chưa đào sâu đủ

---

## Tổng kết

Elicitation tốt = Hỏi đúng câu hỏi + Xử lý insight nhanh + Phát hiện gap sớm + Confirm với stakeholder.

AI không thay bạn hỏi, nhưng AI giúp bạn **từ raw notes thành structured requirements nhanh hơn 3–4 lần**. Điều quan trọng là BA vẫn giữ trách nhiệm kiểm soát chất lượng output — AI chỉ là accelerator, không phải decision maker.
