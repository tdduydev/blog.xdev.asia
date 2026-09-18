---
id: 019fece3-9335-7525-9375-bca4ea2ddb4a
title: 'Monolith trước đã: tám thách thức tài liệu bảo phải cân nhắc TRƯỚC KHI chia service'
slug: monolith-truoc-da-tam-thach-thuc
excerpt: >-
  Câu hỏi không phải microservices hay monolith, mà là đã hiểu domain đủ để đặt ranh giới chưa.
  Bài này đi qua đủ tám thách thức mà Azure Architecture Center bảo phải cân nhắc trước khi chia,
  trong đó hai cái là điều kiện về người chứ không phải về kỹ thuật.
featured_image: /images/blog/monolith-truoc-da-tam-thach-thuc/cover.webp
type: blog
reading_time: 13
view_count: 0
meta: null
published_at: '2026-08-11T02:00:00.000000Z'
created_at: '2026-08-11T02:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat2-7002-a002-000000000002, name: Lập trình, slug: programming}
tags: [{name: Microservices, slug: microservices}, {name: Kiến trúc, slug: kien-truc}, {name: DDD, slug: ddd}, {name: Architecture, slug: architecture}]
comments: []
---

Chào anh em. [Bài trước](/blog/ranh-gioi-microservices-chia-theo-cai-gi) kết bằng đúng một câu của
tài liệu Microsoft, và cả bài này là để mổ câu đó:

> When in doubt, start with more coarse-grained microservices.

Nói trước để anh em đừng đọc lệch: đây **không** phải bài chê microservices. Tôi sẽ nêu đủ bảy lợi
ích mà tài liệu ghi, không bớt cái nào. Chuyện tôi muốn nói là chuyện **thứ tự** — chia lúc nào,
chứ không phải chia hay không chia.

## Trước hết, một chỗ tôi nói sai ở bài trước

Ở bài trước tôi ghi rằng câu "things that change together belong together" xuất hiện đầy trên blog
nhưng tôi không tìm được nó trong tài liệu Microsoft, nên đã bỏ. **Tôi tra chưa đủ.** Trang
[Microservices architecture style](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices)
có đúng ý đó, trong mục Best practices:

> Services should have loose coupling and high functional cohesion. **Functions that are likely to
> change together should be packaged and deployed together.** If they reside in separate services,
> those services end up being **tightly coupled**, because a change in one service requires updating
> the other service. **Overly chatty communication between two services might be a symptom of tight
> coupling and low cohesion.**

Câu cuối vá đúng một lỗ hổng tôi để lại. Bài trước tôi đưa ra tiêu chí "không có những cú gọi lải
nhải giữa các service" mà không giải thích được **vì sao** lải nhải là xấu — tôi chỉ nói là tài liệu
bảo thế. Giờ thì có lý do: **lải nhải không phải bệnh, nó là triệu chứng.** Bệnh là hai chức năng
thuộc về nhau mà bị tách ra hai bên ranh giới, nên chúng phải nói chuyện liên tục để làm xong một
việc.

## Antipattern số một

Tài liệu có một danh sách antipattern, và cái đứng đầu là cái này:

> **Implementing microservices without a deep understanding of the business domain results in poorly
> aligned service boundaries and undermines the intended benefits.**

Để ý cách nó phát biểu. Không nói "sẽ khó bảo trì hơn", không nói "sẽ tốn công refactor". Nó nói
**mất luôn lợi ích được kỳ vọng**. Nghĩa là anh em vẫn trả đủ giá của hệ phân tán, nhưng cái mua
bằng số tiền đó thì không nhận được. Trả tiền rồi mà không có hàng.

## "Trước khi", không phải "sau khi thấy chậm"

Tài liệu mở mục thách thức bằng một chữ đáng chú ý:

> The benefits of microservices come with trade-offs. Consider the following challenges **before you
> create** a microservices architecture.

Tám thách thức, tôi đi qua đủ.

### 1. Mỗi service đơn giản hơn, cả hệ thống phức tạp hơn

> A microservices application has more moving parts than the equivalent monolithic application.
> **Each service is simpler, but the entire system as a whole is more complex.**

Hai câu đó không mâu thuẫn, và đó là chỗ nhiều người bị lừa: mở một repo service ra, thấy nó gọn
gàng, ba trăm dòng, rồi kết luận kiến trúc này đơn giản. Nhưng độ phức tạp **không nằm trong file
nào cả** — nó nằm ở giữa các service. Tài liệu liệt kê luôn chỗ nó nằm: service discovery, tính nhất
quán dữ liệu, quản lý giao dịch, và giao tiếp giữa các service.

### 2. Refactor qua ranh giới service là chuyện khó

> Existing tools aren't always designed to work with service dependencies. **Refactoring across
> service boundaries can be difficult.**

Đây là chỗ đánh trực tiếp vào lý do người ta hay đưa ra để chia sớm: "chia sẵn cho khỏi phải sửa
sau". Trong một monolith, đổi ranh giới giữa hai module là việc của IDE — đổi tên, kéo class, ba mươi
giây. Sau khi chia thành hai service, đúng việc đó biến thành: đổi hợp đồng API, đổi lược đồ dữ liệu,
phối hợp hai lần triển khai, và có thể là hai đội.

**Nên nếu anh em chia lúc chưa hiểu domain, thì đúng lúc cần sửa ranh giới nhất lại là lúc sửa nó
đắt nhất.**

### 3. Thiếu quản trị

> You might end up with **so many different languages and frameworks that the application becomes
> hard to maintain.**

Tài liệu khuyên đặt vài chuẩn chung cho cả dự án mà không bó tay các đội quá mức — đặc biệt cho
những thứ cắt ngang như ghi log.

### 4. Độ trễ dây chuyền

> if the chain of service dependencies gets too long (service A calls B, which calls C...), the extra
> latency can become a problem. …**Avoid overly chatty APIs.**

### 5. Toàn vẹn dữ liệu

> When more than one microservice is involved in persisting new or changed data, **it's unlikely that
> the complete data change could be considered an ACID transaction.** Instead, the technique is more
> aligned to BASE… **Embrace eventual consistency where possible.**

Chia service không phải chỉ chia code. Nó là chia luôn cái bảo đảm mà database vẫn cho anh em không
mất tiền. Tôi mổ riêng chuyện này ở [bài về mỗi service một database](/blog/mot-database-cho-moi-service).

### 6 và 8. Hai thách thức về NGƯỜI

Hai cái này không nói về code, và tôi muốn anh em đọc kỹ nhất:

> **Management:** A successful microservice architecture requires a **mature DevOps culture.**

> **Skill set:** Microservices are highly distributed systems. **Carefully evaluate whether the team
> has the skills and experience to be successful.**

Trưởng thành. Không phải "có Jenkins", không phải "có Kubernetes". Đây là chỗ tài liệu nói thẳng cái
ít ai nói trong buổi thuyết trình kiến trúc: **microservices có điều kiện về người, không chỉ điều
kiện về hệ thống.** Nếu đội chưa có văn hoá triển khai độc lập thì chia service không tạo ra văn hoá
đó — nó chỉ chuyển chỗ đau từ merge conflict sang sự cố lúc chạy.

### 7. Phiên bản

> Updates to a service **must not break** services that depend on it. Multiple services could be
> updated at any given time, so without careful design, you might have problems with backward or
> forward compatibility.

Gắn với tiêu chí "deploy độc lập" ở bài trước. Deploy độc lập không chỉ là pipeline chạy riêng — nó
là chuyện hợp đồng API của anh em có chịu được việc hai bên lên phiên bản khác nhau ở hai thời điểm
khác nhau hay không. Cái đó không công cụ nào tặng; phải thiết kế.

## Nhưng monolith cũng có giá, và giá đó tăng dần

Nếu dừng ở trên thì tôi đang dựng người bù nhìn. Tài liệu có một câu về monolith đáng đọc nguyên văn:

> In a monolithic application, code dependencies often become **tangled over time.** Adding a new
> feature might require changes in many parts of the codebase.

**Theo thời gian** — đó là chữ quan trọng. Monolith không miễn phí; nó chỉ có cái giá trả chậm. Và
tài liệu chỉ ra chỗ đau nhất: một con bug ở một phần có thể **chặn cả quy trình phát hành**, vì phải
tích hợp, kiểm thử và phát hành bản sửa lỗi đó.

## Bảy lợi ích, nêu đủ

| # | Lợi ích | Nội dung |
|---|---|---|
| 1 | Tính linh hoạt | Cập nhật một service mà không triển khai lại cả ứng dụng; roll back được |
| 2 | Đội nhỏ và tập trung | Một service nên nhỏ đủ để một đội tính năng xây, kiểm thử, triển khai |
| 3 | Codebase nhỏ | Không chia sẻ code hay kho dữ liệu → ít phụ thuộc rối |
| 4 | Trộn công nghệ | Mỗi đội chọn stack phù hợp service của mình |
| 5 | Cách ly lỗi | Một service chết không sập cả ứng dụng — **miễn là bên gọi được thiết kế chịu lỗi** |
| 6 | Mở rộng riêng | Nhân bản phần cần, không nhân bản cả ứng dụng |
| 7 | Cách ly dữ liệu | Đổi lược đồ đơn giản hơn vì chỉ một service bị ảnh hưởng |

## Chỗ tôi không có số

Anh em có thể đang chờ tôi đưa con số: bao nhiêu phần trăm dự án microservices thất bại, đội bao
nhiêu người thì nên chia, một hệ thống trung bình có mấy service.

**Tôi không có những số đó, và tôi sẽ không bịa ra để bài nghe có sức nặng hơn.** Cái tôi có là cơ
chế, lấy từ tài liệu — và cơ chế thì dùng được để suy luận cho hệ thống cụ thể của anh em, còn một
con số trung bình lấy từ hệ thống của người khác thì không. Nếu anh em thấy ai đưa ra ngưỡng kiểu
"dưới mười người thì đừng làm microservices", hãy hỏi họ số đó đo ở đâu.

## Vậy làm gì với monolith đang có

Tài liệu không nói "viết lại từ đầu". Nó nhắc hai mẫu ở chỗ nói về hệ thống ngoài:
[Strangler Fig](https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig) và
[Anti-Corruption Layer](https://learn.microsoft.com/en-us/azure/architecture/patterns/anti-corruption-layer).
Ý của Strangler Fig là dựng cái mới bao quanh cái cũ và chuyển dần từng phần, chứ không thay một lần.

Còn thứ tự thì bài trước đã cho: phân tích miền → định nghĩa bounded context → áp mẫu chiến thuật →
rồi mới nhận ra service. **Bốn bước đó không đòi anh em phải có hệ thống mới.** Chúng làm được trên
hệ thống đang chạy, và làm xong thì anh em biết chỗ nào nên cắt trước.

### Ba dấu hiệu chọn chỗ cắt trước

**[Nhận định]** Phần này là tôi rút ra từ các câu đã dẫn ở trên, **không phải câu trích** của tài
liệu. Một phần đáng tách sớm khi:

1. Nó là **subdomain cốt lõi** — chỗ tạo lợi thế cạnh tranh, nên đáng đầu tư.
2. Nó có **yêu cầu phi chức năng khác rõ rệt** với phần còn lại, như thông lượng hoặc cách lưu dữ
   liệu. Giống hệt hai service `Ingestion` và `Delivery History` trong ví dụ ở bài trước — cả hai
   không sinh ra từ mô hình miền.
3. Nó **đã ghép lỏng sẵn** với phần còn lại, tức tách ra không kéo theo một chuỗi thay đổi.

Ngược lại: phần nào mà anh em **còn đang tranh luận xem nó thuộc về đâu**, thì đó đúng là phần chưa
nên tách. Vì tranh luận đó chính là dấu hiệu chưa hiểu domain — mà đó là antipattern số một.

## Chốt

Câu hỏi không phải microservices hay monolith, mà là **anh em đã hiểu domain đủ để đặt ranh giới
chưa.** Chưa hiểu thì mọi ranh giới đặt ra đều là phỏng đoán, và phỏng đoán đó bị đóng cứng thành
hợp đồng API cùng lược đồ dữ liệu — tức thành thứ đắt nhất để sửa.

Nên nhắc lại câu chốt của tài liệu, và thêm một câu nữa của nó: **ranh giới service không cố định**,
việc đánh giá lại ranh giới là nỗ lực liên tục. Nghĩa là chia thô ban đầu **không phải nợ kỹ thuật**
— nó là giữ quyền chọn lại khi mình hiểu hơn.

## Nguồn

- [Microservices architecture style](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices)
  — Azure Architecture Center. Tám thách thức, bảy lợi ích, danh sách antipattern, best practices.
- [Identify microservice boundaries](https://learn.microsoft.com/en-us/azure/architecture/microservices/model/microservice-boundaries)
  — câu chốt "when in doubt, start with more coarse-grained microservices".

Một nguồn tôi **cố ý không trích**: bài "Monolith First" của Martin Fowler. Nó là nguồn nổi tiếng
nhất cho đúng luận điểm của bài này, nhưng là bài blog cá nhân, không phải tài liệu chuẩn. Tôi nhắc
để anh em tự tìm nếu muốn, chứ không dựng nó thành thẩm quyền.
