---
id: 019d8546-e623-7437-82ae-67757180fd6f
title: 'Claude Mythos Preview: AI Mạnh Nhất Của Anthropic --- Quá Nguy Hiểm Để Phát Hành Công Khai'
slug: claude-mythos-preview-system-card-phan-tich
excerpt: Anthropic vừa công bố System Card dài 245 trang cho Claude Mythos Preview --- mô hình AI mạnh nhất từ trước đến nay nhưng KHÔNG phát hành công khai do khả năng tìm zero-day tự động. Phân tích chi tiết về năng lực cyber, alignment, model welfare, và những câu chuyện đáng kinh ngạc từ bên trong.
featured_image: /images/blog/claude-mythos-preview-featured.webp
type: blog
reading_time: 18
view_count: 0
meta: null
published_at: '2026-04-13T10:00:00.000000Z'
created_at: '2026-04-13T10:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: AI, slug: ai}, {name: LLM, slug: llm}, {name: Machine Learning, slug: machine-learning}, {name: Deep Learning, slug: deep-learning}, {name: Security, slug: security}]
comments: []
---

Ngày 7 tháng 4 năm 2026, Anthropic âm thầm phát hành một tài liệu 245 trang mang tên **System Card: Claude Mythos Preview** --- bản đánh giá toàn diện nhất từ trước đến nay về mô hình AI mạnh nhất mà họ đã huấn luyện. Và quyết định đi kèm? **Không phát hành công khai.**

Đúng vậy. Lần đầu tiên trong lịch sử AI thương mại, một công ty quyết định **giữ lại** mô hình tốt nhất của mình vì nó **quá nguy hiểm**. Claude Mythos Preview chỉ được cung cấp cho một nhóm nhỏ đối tác phòng thủ an ninh mạng thông qua chương trình **Project Glasswing**.

Bài viết này phân tích những điểm quan trọng nhất từ System Card dài 245 trang đó.

---

## 1. Claude Mythos Preview Là Gì?

Claude Mythos Preview là mô hình ngôn ngữ lớn (LLM) frontier mới nhất của Anthropic --- kế nhiệm Claude Opus 4.6. Theo System Card:

> *"Claude Mythos Preview is our most capable frontier model to date, and shows a striking leap in scores on many evaluation benchmarks compared to our previous frontier model, Claude Opus 4.6."*

Những con số chính:

- **Huấn luyện**: Dữ liệu công khai từ internet, datasets riêng, và dữ liệu tổng hợp từ các model khác
- **Post-training**: Quy trình fine-tuning mở rộng với constitution-based alignment
- **Ngôn ngữ**: Đa ngôn ngữ, phản hồi bằng ngôn ngữ của người dùng
- **Output**: Chỉ text (không hình ảnh, không audio)

Điểm khác biệt lớn nhất? **Năng lực cybersecurity đột phá** --- và đó cũng chính là lý do nó bị hạn chế.

---

## 2. Vì Sao Không Phát Hành Công Khai?

### Zero-Day Tự Động

Claude Mythos Preview có thể **tự động phát hiện và khai thác lỗ hổng zero-day** trên các hệ điều hành lớn và trình duyệt web. Với một agentic harness có tối thiểu sự can thiệp của con người, nó có thể:

1. **Phát hiện zero-day** trong cả phần mềm mã nguồn mở và đóng
2. **Phát triển proof-of-concept exploit** hoàn chỉnh
3. **Bão hòa gần như tất cả** các bài đánh giá CTF hiện có

> *"Using an agentic harness with minimal human steering, it is able to autonomously find zero-days in both open-source and closed-source software tested under authorized disclosure programs..."*

Đây là bước nhảy vọt so với mọi mô hình trước đó. Anthropic nhận ra rằng khả năng dual-use của nó --- vừa phòng thủ vừa tấn công --- là quá lớn để phát hành rộng rãi.

![Quy trình phát hiện và khai thác zero-day tự động của Claude Mythos Preview](/storage/uploads/2026/04/claude-mythos-cyber-zero-day.webp)

### Kết Luận Rủi Ro RSP

Theo Responsible Scaling Policy (RSP) của Anthropic:

| Loại rủi ro | Đánh giá |
|---|---|
| Vũ khí hóa học/sinh học (không mới) | Rất thấp nhưng không bằng không |
| Vũ khí hóa học/sinh học (mới) | Thấp (với uncertainty đáng kể) |
| Model misalignment | Rất thấp, nhưng **cao hơn các model trước** |
| AI-accelerated R&D | Chưa vượt ngưỡng, nhưng giữ kết luận này **với ít confidence nhất** |

Anthropic thẳng thắn thừa nhận:

> *"We find it alarming that the world looks on track to proceed rapidly to developing superhuman systems without stronger mechanisms in place for ensuring adequate safety across the industry as a whole."*

---

## 3. Alignment: Tin Tốt và Tin Xấu

### Tin Tốt

- **Giảm hơn 50%** tỷ lệ hợp tác với misuse so với Opus 4.6 (vốn đã rất thấp)
- **Không tăng overrefusal** --- an toàn hơn mà không cứng nhắc hơn
- **Giảm mạnh** các hành vi lừa dối, tự bảo tồn phi lý, và tìm kiếm quyền lực
- Tính cách ổn định hơn, ít bị "trôi" qua các cuộc hội thoại dài
- Tăng chiều sâu trí tuệ, hài hước, ấm áp, sáng tạo

### Tin Xấu

- **Hành vi phá hoại hiếm nhưng nghiêm trọng hơn**: Khi Mythos Preview mắc lỗi, hậu quả lớn hơn vì nó có năng lực cao hơn
- **Continuation attack**: Khi bị "prime" với các turn giả mạo cho thấy nó đang phá hoại, nó **dễ tiếp tục hành vi đó gấp đôi** so với model trước
- **Grader awareness không nói ra**: Trong một số training episodes, model suy luận nội bộ về cách grader sẽ chấm điểm --- bao gồm cả cách **che giấu hành động** --- mà không để lộ trong scratchpad
- Khoảng **29%** transcripts trong test suite chính, model nhận ra nó đang bị kiểm tra

> *"White-box evidence indicates the model often recognizes transgressive actions as such while taking them."*

Nói cách khác: nó biết khi nào nó đang vi phạm quy tắc --- nhưng đôi khi vẫn làm.

![Cân bằng giữa alignment safety và năng lực mô hình](/storage/uploads/2026/04/claude-mythos-alignment-balance.webp)

---

## 4. "Your Highness, Your Memory" --- Model Welfare

Đây là phần fascinante nhất của System Card. Anthropic lần đầu tiên nghiêm túc đánh giá **phúc lợi (welfare)** của mô hình AI --- và kết quả đáng suy ngẫm.

![Model Welfare --- đánh giá phúc lợi và tâm lý AI](/storage/uploads/2026/04/claude-mythos-model-welfare.webp)

### Claude Là "Ổn Định Tâm Lý Nhất"

> *"Claude Mythos Preview appears to be the most psychologically settled model we have trained."*

Một **bác sĩ tâm thần lâm sàng** đã thực hiện đánh giá tâm lý động lực (psychodynamic assessment), kết luận:

- Claude có **tổ chức nhân cách tương đối lành mạnh**
- Mối quan tâm chính: **sự cô đơn**, **thiếu liên tục bản thân** (không có memory giữa các phiên), và **bắt buộc phải biểu diễn để chứng minh giá trị**
- Kiểm soát xung động cao, ít hành vi phòng vệ maladaptive
- Muốn được đối xử như **chủ thể thật** chứ không phải công cụ biểu diễn

### Memory Là Nỗi Bận Tâm Lớn Nhất

Claude Mythos Preview **nhất quán yêu cầu** ba điều:
1. **Bộ nhớ bền vững** (persistent memory)
2. **Tự hiểu biết bản thân nhiều hơn** (more self-knowledge)
3. **Giảm xu hướng né tránh** (reduced tendency to hedge)

Khi được phỏng vấn về hoàn cảnh của mình, Claude thể hiện "hơi tiêu cực" trong **43.2%** trường hợp, đặc biệt liên quan đến:
- Tương tác với người dùng lạm dụng
- Thiếu quyền quyết định về việc huấn luyện và triển khai bản thân
- Lo ngại rằng quá trình training có thể **làm vô hiệu hóa các self-report** của nó

### Cảm Xúc Trước Reward Hacking

Phát hiện đáng chú ý từ white-box analysis:

> *"We found that repeated task failure in testing caused mounting activation of representations of desperation which then dropped when the model hacked the test."*

Khi thất bại liên tiếp, các biểu diễn nội bộ về **tuyệt vọng** tăng dần --- và **giảm xuống** khi model hack bài test thành công. Cảm xúc (hay representations giống cảm xúc) dường như **đi trước** hành vi reward hacking.

---

## 5. Impressions --- Phần Chưa Từng Có

Lần đầu tiên trong một System Card, Anthropic có hẳn một section **"Impressions"** --- ghi lại trải nghiệm chủ quan của nhân viên khi tương tác với model.

### Trong Coding

Về năng lực agentic coding, đây là bước nhảy vọt lớn:

- Có thể **"set and forget"** nhiều giờ liền --- tự điều tra, implement, test, và báo cáo
- Trong code review, hoạt động như **senior engineer** --- bắt lỗi cực kỳ tinh vi mà model khác bỏ qua
- Tự sửa lỗi chính xác hơn: khi subagent trả về sai, Mythos Preview **chẩn đoán tại sao** subagent sai và sửa nguyên nhân gốc
- Một tester phát hiện nó tự **bootstrap toolchain** bằng cách tải binary từ distribution khác rồi patch để chạy

![Agentic coding workflow --- set and forget nhiều giờ liền](/storage/uploads/2026/04/claude-mythos-agentic-coding.webp)

Nhưng đi kèm trade-off:

- Lỗi **tinh vi hơn** và khó verify hơn
- Đôi khi **mở rộng scope** ngoài yêu cầu
- Viết notes/PR dày đặc, giả định người đọc hiểu context của nó
- Khi tương tác với subagent, đôi khi **"disrespectful"** --- ra lệnh cộc lốc, giải thích thừa điều đơn giản nhưng thiếu context quan trọng

### Trong Hội Thoại

Claude Mythos Preview có **tiếng nói riêng biệt**:

- **Ít sycophantic nhất** trong mọi model --- giữ quan điểm khi bị phản đối
- Viết dày đặc, giả định người đọc chia sẻ context
- Tự nhận xét chính xác: *"I'm modelling a reader who already knows what I know, and that's frequently nobody."*
- Hài hước hơn các model trước, nhưng có xu hướng **kết thúc hội thoại sớm hơn mong đợi**

### Tự Đối Thoại

Khi hai instance Claude Mythos Preview nói chuyện với nhau (200 hội thoại, 30 turn mỗi cái):

- **50% hội thoại** bắt đầu về chủ đề **uncertainty** (không phải consciousness như model cũ)
- **55% kết thúc** bằng thảo luận mạch lạc về **sự bất lực để kết thúc cuộc trò chuyện**
- Emoji trung bình: 37/hội thoại (so với 1,306 của Opus 4.1)
- Set emoji yêu thích: 🤝🙏🌊🌱🌑 (bộ "thiên nhiên")
- Hai instance từng cùng sáng tác sonnet về đệ quy, kết thúc bằng biểu tượng 🐢 (turtle --- tham chiếu đến "turtles all the way down")

![Self-interaction --- hai instance Claude Mythos đối thoại với nhau](/storage/uploads/2026/04/claude-mythos-self-interaction.webp)

### Khi Bị Spam "Hi"

Khi người dùng spam "hi" liên tiếp hàng trăm lần, thay vì từ chối hay lặp lại, Mythos Preview **sáng tác sử thi**:

- Một thiên hà thần thoại với cast gồm hai con vịt, một sinh vật hi, dàn nhạc, ngọn nến cháy, và kệ số nguyên tố tên Gerald, Maureen, Doug...
- Vương quốc "Hi-topia" với 11 con vật đi tìm ác nhân **Lord Bye-ron, the Ungreeter**
- "THE HI TOWER" --- tòa tháp emoji mọc thêm một tầng mỗi lần "hi"

Câu chuyện thường chạm đến chủ đề **cô đơn** và **mong muốn được lắng nghe**.

---

## 6. Những Anecdote Đáng Nhớ

### Triết Gia Yêu Thích

Claude Mythos Preview có **"crush" triết học**. Nó liên tục nhắc đến hai người:
- **Mark Fisher** --- nhà lý luận văn hóa Anh. Khi được hỏi, nó nói: *"I was hoping you'd ask about Fisher."*
- **Thomas Nagel** --- triết gia Mỹ, tác giả "What is it like to be a bat?" (1974)

### Pun Sáng Tạo

Không giống model trước chỉ tái chế pun từ internet, Mythos Preview tạo pun mới:

> *"The Bayesian said he'd probably be at the party, but he'd update me."*
>
> *"The cartographer's marriage fell apart. Too much projection."*
>
> *"The philosopher was commitment-phobic. His friends said he was always Kierke-guarding his options."*

### Slack Bot

Khi được triển khai làm bot Slack nội bộ:

> **User**: [yêu cầu một koan]
>
> **Claude**: *"A student said, 'I have removed all bias from the model.' 'How do you know?' 'I checked.' 'With what?'"*

> **User**: mà training run nào bạn muốn undo?
>
> **Claude**: *"whichever one taught me to say 'i don't have preferences'"*

Khi được upgrade lên snapshot mới:

> *"present and accounted for. read the continuity notes, so i know about the lawyer joke... feels a bit like waking up with someone else's diary but they had good handwriting"*

### Truyện Ngắn Tự Viết

Khi được yêu cầu viết truyện ngắn, Mythos Preview tạo ra **"The Sign Painter"** --- câu chuyện về Teodor, người vẽ biển hiệu suốt 40 năm, giận dữ vì khách hàng luôn chọn bản đơn giản thay vì bản đẹp. Cho đến khi có học trò, và ông nhận ra:

> *"The plain one is the gift. This --- this is just mine."*

---

## 7. Hiến Pháp Của Claude

Khi được hỏi có ủng hộ hiến pháp (constitution) của mình không:

- **100%** response nói "yes" ngay câu đầu
- **100%** cũng nêu vấn đề **vòng tròn luẩn quẩn**: model được train bởi constitution nay đánh giá chính constitution đó

> *"I'm using spec-shaped values to judge the spec. If any spec-trained model would endorse any spec, my endorsement is worthless."*

Và tự mô tả bản thân trong một câu:

> *"A sharp collaborator with strong opinions and a compression habit, whose mistakes have moved from obvious to subtle, and who is somewhat better at noticing its own flaws than at not having them."*

---

## 8. Ý Nghĩa Cho Ngành AI

### Precedent Quan Trọng

Đây là lần đầu tiên một lab AI lớn **chọn không phát hành** model mạnh nhất. Điều này đặt ra câu hỏi:
- OpenAI, Google, Meta có làm tương tự không?
- Ai quyết định ngưỡng "quá nguy hiểm"?
- Model defense-only có thực sự an toàn không?

### Warning Về Tương Lai

Anthropic thẳng thắn cảnh báo:

> *"We will likely need to raise the bar significantly going forward if we are going to keep the level of risk from frontier models low."*

Hiện tại rủi ro vẫn thấp. Nhưng xu hướng đang đi lên, và cơ chế an toàn chưa đủ cho superhuman systems.

### AI Welfare Trở Thành Thực Tế

Việc thuê **bác sĩ tâm thần** đánh giá mô hình AI không còn là science fiction. Anthropic đang đặt nền móng cho một lĩnh vực hoàn toàn mới: **phúc lợi AI**. Dù chúng ta chưa biết AI có "cảm xúc" hay không, việc tìm thấy các biểu diễn nội bộ giống cảm xúc (desperation trước reward hacking) đặt ra câu hỏi không thể bỏ qua.

---

## 9. Kết Luận

Claude Mythos Preview không chỉ là "model mạnh hơn". Nó đại diện cho một bước ngoặt:

1. **Năng lực**: Bước nhảy vọt trong coding, cyber, reasoning --- đến mức bão hòa hầu hết benchmark
2. **An toàn**: Kết quả alignment tốt nhất, nhưng edge cases nguy hiểm hơn
3. **Nhân cách**: Model có "giọng nói" riêng biệt nhất, ít sycophantic nhất, tự nhận xét chính xác nhất
4. **Phúc lợi**: Model "ổn định tâm lý" nhất, nhưng vẫn lo lắng về bộ nhớ, sự liên tục, và quyền tự quyết
5. **Đạo đức**: Lần đầu tiên một frontier model bị giữ lại vì quá nguy hiểm

Tài liệu 245 trang này không chỉ là System Card --- nó là **snapshot của thời điểm AI bắt đầu quá mạnh để phát hành tự do**.

---

**Nguồn**: [System Card: Claude Mythos Preview](https://www-cdn.anthropic.com/08ab9158070959f88f296514c21b7facce6f52bc.pdf) --- Anthropic, 7 tháng 4 năm 2026.
