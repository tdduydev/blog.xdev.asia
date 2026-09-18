---
id: 019fed32-ad9b-7df5-9ef5-b044e21569a6
title: 'Đồng bộ hay bất đồng bộ: async/await không làm kiến trúc bất đồng bộ'
slug: dong-bo-hay-bat-dong-bo
excerpt: >-
  HTTP là giao thức đồng bộ, dù client có dùng async I/O — tài liệu Microsoft nói thẳng câu đó. Mỗi
  cú gọi đồng bộ là một sợi dây ràng buộc độ sẵn sàng, và phần lớn người ta ký sợi dây đó mà không
  biết mình đang ký.
featured_image: /images/blog/dong-bo-hay-bat-dong-bo/cover.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-08-11T04:00:00.000000Z'
created_at: '2026-08-11T04:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat2-7002-a002-000000000002, name: Lập trình, slug: programming}
tags: [{name: Microservices, slug: microservices}, {name: Kiến trúc, slug: kien-truc}, {name: Messaging, slug: messaging}, {name: Architecture, slug: architecture}]
comments: []
---

Chào anh em. Ở [bài đầu tiên](/blog/ranh-gioi-microservices-chia-theo-cai-gi) tôi có dẫn một câu của
tài liệu rồi hứa sẽ mổ hẳn một bài cho nó:

> When microservices communicate **synchronously**, their runtime dependency often requires them to
> **share the same architecture characteristics.**

Hôm nay trả nợ câu đó. Nói trước kết luận để anh em biết đường đọc: đây **không** phải bài "bất đồng
bộ tốt hơn". Tài liệu liệt kê **sáu lợi thế và năm cái giá** cho bất đồng bộ, tôi nêu đủ cả hai phía.

## Hai định nghĩa, khác nhau ở đúng một chữ

> 1. **Synchronous communication.** …a service calls an API that another service exposes, using a
>    protocol such as HTTP or gRPC. This option is a synchronous messaging pattern because **the caller
>    waits for a response** from the receiver.
> 2. **Asynchronous message passing.** …a service sends message **without waiting for a response**, and
>    one or more services process the message asynchronously.

Chỉ khác nhau ở chữ **chờ**. Nhưng cái chữ đó quyết định gần hết mọi thứ sau đây, vì *chờ* nghĩa là số
phận của tôi gắn vào việc anh có sống hay không.

## Chỗ nhầm đắt nhất

Nếu anh em chỉ nhớ một đoạn của bài này thì nhớ đoạn này:

> It's important to **distinguish between asynchronous I/O and an asynchronous protocol**. Asynchronous
> I/O means the calling thread isn't blocked while the I/O completes. That's important for performance,
> but is **an implementation detail in terms of the architecture**. An asynchronous protocol means the
> sender doesn't wait for a response. **HTTP is a synchronous protocol, even though an HTTP client might
> use asynchronous I/O when it sends a request.**

Nghĩa là anh em rải `async`/`await` khắp codebase, bỏ hết chỗ blocking, và **kiến trúc vẫn đồng bộ y
như cũ**.

`async/await` cứu **luồng** của anh em. Nó không cứu **độ sẵn sàng**.

## Sợi dây ràng buộc độ sẵn sàng

Trong danh sách lợi thế của bất đồng bộ, mục *cách ly lỗi* có nửa sau mới là chỗ đau:

> If the consumer fails, the sender can still send messages. The messages are picked up when the
> consumer recovers… **Synchronous APIs, on the other hand, require the downstream service to be
> available or the operation fails.**

Đó là sợi dây. Anh em gọi đồng bộ vào tôi thì độ sẵn sàng của anh em **không bao giờ cao hơn của tôi
được nữa**.

Và về chuỗi gọi:

> if there's a chain of service dependencies (for example, service A calls B, which calls C), **waiting
> on synchronous calls can add unacceptable amounts of latency.**

**[Nhận định]** Tài liệu nói về độ trễ; phần này là tôi suy ra: trong một chuỗi đồng bộ thì **độ trễ
cộng vào nhau, còn xác suất lỗi nhân với nhau.** Cả hai đều đi theo chiều xấu khi chuỗi dài ra. Gọi năm
service đồng bộ thì độ sẵn sàng của anh em là **tích** của cả năm, không phải của cái tệ nhất.

## Bốn lợi thế còn lại

- **Giảm ghép chặt** — bên gửi không cần biết gì về bên tiêu thụ.
- **Nhiều bên đăng ký** — mô hình phát/đăng ký cho nhiều bên cùng nghe một sự kiện.
- **San tải** — *"A queue can act as a buffer to level the workload, so that receivers can process
  messages at their own rate."*
- **Luồng công việc** — *"Queues can be used to manage a workflow, by check-pointing the message after
  each step."* Cái này ít người nghĩ tới: queue không chỉ để truyền tin, nó còn **giữ được chỗ mình
  đang đứng** trong một quy trình nhiều bước.

## Nhưng bất đồng bộ không miễn phí: năm cái giá

Đến đây bài rất dễ trượt thành quảng cáo cho message queue, nên tôi nêu đủ năm cái giá tài liệu ghi.

| # | Cái giá | Nội dung |
|---|---|---|
| 1 | **Ghép chặt vào hạ tầng messaging** | *"It can be difficult to switch to another messaging infrastructure later."* Thoát ghép chặt giữa các service, rồi ghép chặt vào broker |
| 2 | **Độ trễ** | *"End-to-end latency for an operation might become high if the message queues fill up."* |
| 3 | **Chi phí** | *"At high throughputs, the monetary cost of the messaging infrastructure could be significant."* |
| 4 | **Độ phức tạp** | Phải tự xử lý **tin trùng**; **khó** cài request-response; cần **queue thứ hai** + cách **khớp** request với response |
| 5 | **Thông lượng** | Chính queue thành điểm nghẽn |

Cái thứ tư đáng đọc kỹ: đó không phải cấu hình, đó là **code anh em phải viết và bảo trì**.

Còn cái thứ năm là cái phản trực giác nhất, vì người ta hay nghĩ queue là thứ *giải quyết* nghẽn:

> If messages require *queue semantics*, the queue can become a bottleneck in the system. **Each message
> requires at least one queue operation and one dequeue operation.** Moreover, queue semantics generally
> require **some kind of locking** inside the messaging infrastructure… You can mitigate these issues by
> **batching messages, but that complicates the code.**

Và một lối ra: nếu tin **không** cần ngữ nghĩa queue thì có thể dùng **eventstream** thay cho queue.

## Ví dụ hay nhất: một hệ thống dùng cả hai, có lý do cho từng chỗ

Cái này dẹp được câu hỏi sai *"nên chọn cái nào"*. Vẫn hệ giao hàng bằng drone của ba bài trước:

- `Ingestion` phơi **REST công khai** cho client.
- `Ingestion → Scheduler` là **bất đồng bộ**, vì *"Asynchronous messages are necessary to implement the
  **load-leveling** that is required for ingestion."* Chọn async ở đây không phải vì nó hiện đại — vì
  khâu đó **cần vùng đệm**.
- `Scheduler →` các service phía sau là **REST đồng bộ**, và tài liệu ghi rõ lý do:

  > One reason to use synchronous APIs is that **the Scheduler needs to get a response from each of the
  > downstream services. A failure in any of the downstream services means the entire operation failed.**
  > However, a potential issue is **the amount of latency** that is introduced by calling the backend
  > services.

Đó là cách một tài liệu tử tế nói chuyện: nêu lý do chọn, rồi nêu luôn cái mình phải trả.

Nên **câu hỏi đúng cho từng cú gọi** không phải "đồng bộ hay bất đồng bộ", mà là: *tôi có cần biết kết
quả ngay để quyết định bước tiếp theo hay không?*

- Cần → đồng bộ, và chấp nhận sợi dây.
- Không cần → **đừng ký sợi dây đó.**

Và khi có lỗi không thoáng qua thì họ **đổi sang bất đồng bộ**: `Scheduler` gửi tin async cho
`Supervisor` để xếp [giao dịch bù trừ](/blog/saga-va-bu-tru). Cùng một hệ thống — đường đi chính đồng
bộ vì cần biết kết quả, đường xử lý hậu quả bất đồng bộ vì không ai cần chờ nó.

### Một điểm về mô hình miền

> delivery status events are **derived from** drone location events… The drone events convey the
> **physical location** of a drone. The delivery events represent **changes in the status of a delivery,
> which is a different business entity.**

Nối thẳng bài đầu: quản lý drone thuộc một bounded context khác. Nên **đừng phát tán sự kiện của
context khác ra ngoài** — dịch nó sang thực thể của context mình.

### Lợi thế lớn nhất, nói bằng thực tế

> because the Scheduler doesn't have to wait for a response, **adding more subscribers doesn't affect
> the main workflow path.**

Đó là thứ đồng bộ không cho anh em. Với đồng bộ, mỗi bên tiêu thụ mới là **một cú gọi mới trong đường đi
chính** — thêm độ trễ và thêm một chỗ có thể chết.

## Retry, và cái bẫy nằm ngay trong nó

> **Retry.** …the caller should typically retry the operation a specified number of times or until a
> configured timeout period elapses.

Nghe hợp lý. Nhưng ngay sau đó:

> **If an operation isn't idempotent, retries can cause unintended effects.** The original call might
> succeed, but the caller never gets a response. If the caller retries, the operation might be invoked
> twice. **Generally, it's not safe to retry POST or PATCH** methods because these operations aren't
> guaranteed to be idempotent.

Anh em nào đang có retry mặc định bật ở tầng HTTP client **cho mọi method**, thì đây là lúc đi kiểm lại.

## Circuit breaker: cái làm sập không phải service kia

Lý do tồn tại của circuit breaker thì tài liệu nói theo hướng tôi không ngờ:

> Too many failed requests can cause a bottleneck, as pending requests accumulate in the queue. **These
> blocked requests might hold critical system resources such as memory, threads, and database
> connections, which can cause cascading failures.**

Nghe kỹ: cái làm sập hệ thống **không phải** service kia chết, mà là **những request của chính anh em
đang xếp hàng chờ nó** — và chúng đang giữ bộ nhớ, luồng, kết nối database.

## Service mesh: nói tới đâu là đủ

Tài liệu trả lời "có cần service mesh không" bằng đúng hai chữ: **tuỳ**.

> You can solve problems like retry, circuit breaker, and distributed tracing **without** a service
> mesh, but a service mesh **moves these concerns out of the individual services and into a dedicated
> layer.** On the other hand, a service mesh **adds complexity** to the setup and configuration…
> **You should do thorough performance and load testing before deploying a service mesh in production.**

Nó **dời** việc chứ không **xoá** việc. Tôi không so sánh Linkerd với Istio, vì tài liệu nói cả hai đang
tiến hoá nhanh và tôi không có số đo.

## Chốt bốn câu

1. Đừng nhầm **async I/O** với **giao thức bất đồng bộ** — HTTP vẫn đồng bộ dù code anh em đầy `await`.
2. Mỗi cú gọi đồng bộ là **một sợi dây ràng buộc độ sẵn sàng**; trong một chuỗi thì độ trễ cộng, xác
   suất lỗi nhân.
3. Bất đồng bộ **đổi loại lỗi này lấy loại lỗi khác** — anh em trả bằng khử trùng tin, bằng việc khớp
   request với response, và bằng chuyện chính queue có thể thành điểm nghẽn.
4. Hỏi từng cú gọi: **tôi có cần biết kết quả ngay để quyết định bước tiếp theo không?**

## Nguồn

- [Interservice communication in microservices](https://learn.microsoft.com/en-us/azure/architecture/microservices/design/interservice-communication)
  — Azure Architecture Center. Định nghĩa, sáu lợi thế, năm cái giá, ví dụ drone, retry/circuit breaker,
  service mesh.
