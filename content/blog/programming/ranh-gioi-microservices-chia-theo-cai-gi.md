---
id: 019febf1-a14c-7404-ad40-97309e617df1
title: 'Ranh giới microservices: chia theo cái gì, và sáu tiêu chí để biết mình chia đúng'
slug: ranh-gioi-microservices-chia-theo-cai-gi
excerpt: >-
  Chia service theo tầng controller / service / repository là chia sai, và tài liệu kiến trúc của
  Microsoft bác bỏ thẳng cách đó trong một câu. Bài này đi từ phân tích miền tới sáu tiêu chí kiểm
  ranh giới, kèm câu chốt mà ít người chịu nghe: khi còn ngờ thì chia thô.
featured_image: /images/blog/ranh-gioi-microservices-chia-theo-cai-gi/cover.webp
type: blog
reading_time: 15
view_count: 0
meta: null
published_at: '2026-08-10T23:30:00.000000Z'
created_at: '2026-08-10T23:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat2-7002-a002-000000000002, name: Lập trình, slug: programming}
tags: [{name: Microservices, slug: microservices}, {name: Kiến trúc, slug: kien-truc}, {name: DDD, slug: ddd}, {name: Architecture, slug: architecture}]
comments: []
---

Chào anh em. Mở đầu series về microservices, và tôi muốn bắt đầu bằng đúng cái câu hỏi mà không ai
trả lời cho anh em trong lúc anh em cần nhất: **chia service theo cái gì.**

Tôi đoán nhiều anh em đã từng chia theo tầng — một service cho API, một service cho nghiệp vụ, một
service cho truy cập dữ liệu. Nghe rất gọn gàng. Và tài liệu kiến trúc của Microsoft bác bỏ thẳng
cái đó, trong một câu duy nhất:

> Design microservices around business capabilities, not horizontal layers like data access or
> messaging.

**Tầng ngang.** Đó chính là cái sơ đồ ba tầng mà anh em vừa vẽ.

Cả bài này để trả lời hai chuyện: nếu không chia theo tầng thì chia theo gì, và làm sao biết mình
chia đúng. Mọi khẳng định ở đây dẫn được về hai trang của Azure Architecture Center — liệt kê đầy đủ
ở cuối bài.

## Trước hết: không có quy trình máy móc nào

Nói ngay để anh em đừng chờ đợi sai. Tài liệu mở đầu bằng đúng cái tôi định nói:

> One of the biggest challenges of microservices is to define the boundaries of individual services.
> The general rule is that a service should do only one thing, but putting that rule into practice
> requires careful thought. **There's no mechanical process that produces the correct design.**

Không có quy trình máy móc nào cho ra thiết kế đúng. Nên nếu anh em đang tìm một công thức để nhập
vào là ra sơ đồ service, thì nó không tồn tại.

Hậu quả nếu bỏ qua bước suy nghĩ này thì tài liệu cũng nói thẳng: anh em có nguy cơ tạo ra một thiết
kế không có cấu trúc, với **phụ thuộc ẩn giữa các service, ghép chặt, hoặc giao diện thiết kế tồi.**

Và ranh giới không phải việc làm một lần rồi xong:

> Service boundary evaluation is an **ongoing effort** for evolving workloads.

## Hai thước đo, và cả hai đo được

Vậy lấy gì mà kiểm? Tài liệu đưa hai thước, và điểm hay là cả hai đều phát biểu dưới dạng **đo
được**, chứ không phải khẩu hiệu:

> Microservices are *loosely coupled* if you can **change one service without updating other
> services at the same time.** A microservice is *cohesive* if it has a **single, well-defined
> purpose**, like managing user accounts or tracking delivery history.

Anh em thử áp hai thước đó vào cái service tên là `Common` hoặc `Core` trong hệ thống của mình xem.
Nếu sửa nó là năm chỗ khác phải deploy theo, thì nó không ghép lỏng. Và nó cũng chẳng có mục đích
nào được định nghĩa rõ.

Còn một câu nữa tôi rất thích, vì nó chỉ ra thứ mà nhiều hệ thống làm ngược:

> Services should **encapsulate domain knowledge and abstract that knowledge from clients.** For
> example, a client can schedule a drone without knowledge of the scheduling algorithm or drone
> fleet management.

Rất nhiều API mà tôi từng đọc làm đúng chiều ngược: nó bắt phía gọi phải tự chọn tham số theo luật
nghiệp vụ, phải tự ghép ba cú gọi mới xong một việc. Khi phía gọi buộc phải biết luật nghiệp vụ của
bên trong, thì cái ranh giới đó đã rò rỉ — dù sơ đồ vẫn vẽ thành hai hộp riêng.

## Đặc tính kiến trúc đặt cho từng service, không đặt cho cả hệ thống

Điểm này thì tôi đoán ít anh em nghĩ tới, mà nó thay đổi cách chia thật:

> You must define architecture characteristics for **each microservice** to match its domain
> concerns, rather than define them for the entire system. For example, a customer-facing
> microservice might require performance, availability, fault tolerance, security, testability, and
> agility. A back-end microservice might require **only** fault tolerance and security.

Sáu đặc tính so với hai. Và đây là hệ quả mà tôi sẽ mổ hẳn một bài riêng cho nó:

> When microservices communicate **synchronously**, their runtime dependency often requires them to
> **share the same architecture characteristics.**

Nói kiểu anh em hay nói: anh gọi đồng bộ vào tôi thì tôi chết là anh chết.

## Bốn bước

Tài liệu dùng thiết kế theo miền nghiệp vụ (DDD), chia làm hai pha — **chiến lược** để dựng cấu trúc
hệ thống ở mức lớn, **chiến thuật** để dựng mô hình miền bên trong bằng các mẫu như thực thể,
aggregate và domain service. Trải ra thì đúng bốn bước:

1. Phân tích miền nghiệp vụ để hiểu yêu cầu chức năng.
2. Định nghĩa các **bounded context** của miền. Mỗi bounded context chứa một mô hình miền cho một
   subdomain.
3. Áp các mẫu chiến thuật bên trong một bounded context để định nghĩa thực thể, aggregate và domain
   service.
4. Dùng kết quả bước ba để nhận ra các microservice.

Kèm một câu đáng nhớ: *DDD is an iterative, ongoing process, so **service boundaries don't remain
fixed.***

### Bước một: vẽ bản đồ trước, chưa nói công nghệ

Bước này là chỗ nhiều đội bỏ qua vì nó không có code.

> Start by mapping all the business functions and the connections among them. This effort should
> involve domain experts, software architects, and other stakeholders. **You don't need to follow a
> specific formal method.**

Không cần phương pháp hình thức nào. Vẽ trên bảng cũng được. Vừa vẽ thì tìm ba dấu hiệu để nhận ra
subdomain:

- Những chức năng **liên quan chặt** với nhau.
- Những chức năng **cốt lõi** với nghiệp vụ, so với những chức năng chỉ đóng vai **hỗ trợ**.
- **Đồ thị phụ thuộc** giữa các chức năng.

Và một dòng dễ bỏ sót: ở giai đoạn này đừng tập trung vào công nghệ hay chi tiết cài đặt — nhưng
**phải xác định chỗ nào ứng dụng buộc phải tích hợp với hệ thống bên ngoài.**

### Ba loại subdomain — quyết định đầu tư ở đâu

Vẽ ra rồi thì phân loại, và đây là chỗ giúp anh em quyết định dồn công sức vào đâu:

| Loại | Định nghĩa tài liệu | Việc phải làm |
|---|---|---|
| **Cốt lõi** | Tạo ra lợi thế cạnh tranh | Mô hình hoá chi tiết, đầu tư đáng kể về người |
| **Hỗ trợ** | Giữ nghiệp vụ chạy được, nhưng không tạo khác biệt so với đối thủ | Vẫn phải tự làm, nhưng đừng dồn người giỏi nhất |
| **Chung chung** | Bài toán cả ngành đã giải xong | **Dùng giải pháp sẵn có, đừng tự xây** |

Trong ví dụ của tài liệu: vận chuyển và quản lý đội drone là **cốt lõi**; xuất hoá đơn là **hỗ trợ**;
tài khoản người dùng và tổng đài là **chung chung**.

Anh em thử soi lại hệ thống mình: mấy đội giỏi nhất đang ngồi ở subdomain loại nào?

## Luật Conway, và cái bẫy bị động

Tài liệu có một Tip mà tôi nghĩ đáng cả một bài riêng:

> Conway's law observes that systems tend to mirror the communication structures of the organizations
> that build them. **When that mirroring occurs passively, it can lead to architectures that reflect
> organizational charts rather than business domains.**

Anh em có bao giờ mở kiến trúc một hệ thống ra và nhận ra nó chính là danh sách các phòng ban chưa?

Cách tài liệu đề nghị là dùng luật đó theo chiều có lợi: định nghĩa ranh giới service bằng phân tích
miền **trước**, rồi mới xếp quyền sở hữu của các đội khớp vào ranh giới đó **một cách có chủ ý.**

Và nó cho luôn hai dấu hiệu để biết mình đang sai:

> If a **single team must own multiple unrelated bounded contexts**, or a **single bounded context
> requires coordination across many teams**, revisit either the boundaries or the team structure.

## Bounded context

Đến chữ quan trọng nhất. Định nghĩa gọn:

> **A bounded context defines the boundary within a domain where a specific domain model applies.**

Ví dụ của tài liệu dùng chính chiếc drone. Phần lo chuyện sửa chữa và dự đoán bảo dưỡng cần biết rất
nhiều đặc tính vật lý: lịch sử bảo dưỡng, số cây đã bay, tuổi, số model, các đặc tính vận hành.
Nhưng khi tới lúc xếp lịch một chuyến giao hàng thì tài liệu nói thẳng: **những chi tiết đó trở nên
không liên quan.** Phần xếp lịch chỉ cần biết drone có rảnh không và thời gian dự kiến.

Cùng một chiếc drone, hai mô hình khác nhau. Và đó **không phải sự trùng lặp cần dọn** — đó là thiết
kế đúng.

Tôi biết phản xạ của nhiều anh em ở đây là gì, vì nó cũng là phản xạ của tôi: hai chỗ cùng nói về
drone thì làm một `class Drone` dùng chung cho gọn. Tài liệu trả lời đúng chỗ đó, bằng hai lý do:

> Creating a **single model for both** subsystems introduces unnecessary complexity. The model also
> becomes **harder to evolve over time because changes need to satisfy multiple teams** that work on
> separate subsystems.

Cái `class Drone` dùng chung không tiết kiệm code — nó biến ba đội thành một cuộc họp.

### Ngôn ngữ chung

Một khái niệm nữa đi kèm bounded context, và nó giải thích rất nhiều cuộc tranh luận vô ích trong
phòng họp:

> Each bounded context can have **its own** ubiquitous language, which means that the **same word
> (like *account*) has different meanings in different contexts.**

Chữ "tài khoản" ở phòng kế toán và chữ "tài khoản" ở phòng sản phẩm không phải cùng một thứ. Tranh
luận xem "đúng ra thì tài khoản là gì" là tranh luận không có đáp án, vì câu hỏi thiếu mất phần
"trong context nào".

### Bounded context không phải hộp kín

Nói rõ để anh em đừng hiểu sai:

> Bounded contexts **aren't necessarily isolated** from one another… the solid lines that connect the
> bounded contexts represent places where two bounded contexts **interact.**

Chỗ hai bên gặp nhau thì tài liệu khuyên vẽ hẳn ra thành một **context map**, để ghi lại quan hệ,
làm rõ điểm tích hợp và làm rõ trách nhiệm. Bốn kiểu quan hệ:

- **Customer-Supplier** — một bên ở trên cung cấp dữ liệu hoặc dịch vụ cho bên ở dưới; hai đội
  thương lượng hợp đồng với nhau.
- **Open Host Service + Published Language** — bên trên phơi ra một API được định nghĩa rõ, mô tả
  bằng một định dạng dùng chung.
- **Anti-corruption Layer** — đội ở dưới tự xây một lớp dịch để bảo vệ mô hình của mình khỏi những
  thay đổi mô hình của bên trên.
- **Separate Ways** — hai context không tích hợp gì với nhau, mỗi bên tiến hoá độc lập.

Tài liệu nói thêm là trong microservices thì kiểu thứ hai **đặc biệt liên quan**, vì các microservice
giao tiếp qua API được định nghĩa rõ.

Còn một cảnh báo về hệ thống ngoài, đáng dán lên tường:

> When an application depends on an external system, the external system's **data schema or API
> might leak into the application.** This leakage can **compromise the architectural design.**

Cách chặn: **Strangler Fig** hoặc **Anti-Corruption Layer**.

## Từ mô hình sang service

Giờ tới bước cuối, và tài liệu cho một đường đi bốn nhịp.

**Nhịp một.** Bắt đầu từ một bounded context, và nói chung chức năng trong một microservice **không
nên trải rộng quá một bounded context** — theo định nghĩa, bounded context đánh dấu ranh giới của một
mô hình miền cụ thể. Rồi nó cho anh em một dấu hiệu để tự soi:

> If you find that a microservice mixes different domain models together, you might need to **go back
> and refine your domain analysis.**

Quay lại. Không phải sửa code, mà quay lại bước một.

**Nhịp hai.** Xem các **aggregate**, vì aggregate thường là ứng viên tốt cho microservice. Tài liệu
nói rõ vì sao, bằng bốn tính chất:

> - An aggregate is derived from **business requirements**, rather than technical concerns such as
>   data access or messaging.
> - An aggregate should have **high functional cohesion.**
> - An aggregate is a **boundary of persistence.**
> - Aggregates should be **loosely coupled.**

Cái thứ ba — **ranh giới của việc lưu trữ** — tôi đánh dấu ở đây, vì nó là hạt giống của bài về
chuyện mỗi service một database.

**Nhịp ba.** Domain service cũng là ứng viên tốt: đó là các thao tác **không mang trạng thái** trải
trên nhiều aggregate. Ví dụ điển hình là một luồng công việc đi qua nhiều microservice.

**Nhịp bốn**, và đây là nhịp phá cái ảo tưởng rằng ranh giới do domain quyết định hết:

> **Consider nonfunctional requirements.** Use factors such as team size, data types, technologies,
> scalability requirements, availability requirements, and security requirements. These factors might
> cause you to **break a microservice into multiple smaller services.** In other cases, they might
> cause you to **merge several microservices into a single microservice.**

**Gộp.** Tài liệu cho phép gộp, và nói ra như một việc hết sức bình thường. Tôi nhấn chỗ này vì
trong nghề, đề xuất gộp hai service lại thường bị nhìn như thừa nhận thất bại. Không phải. Nó là
bước bốn của đúng cái quy trình mà anh em đang theo.

### Hai service không sinh ra từ domain

Ví dụ của tài liệu cụ thể tới mức đáng kể lại. Ngoài các service sinh ra từ aggregate và domain
service, đội trong ví dụ tạo thêm hai service **không** có mặt trong mô hình miền:

- **Ingestion** — sinh ra sau khi đánh giá nhu cầu **thông lượng**. Nó nhận request từ phía gọi và
  thực hiện *load leveling* bằng cách đưa request vào một vùng đệm rồi mới xử lý.
- **Delivery History** — ban đầu đội tính gộp việc lưu lịch sử vào chính service giao hàng. Rồi họ
  đổi ý, vì *the data storage requirements for historical analysis differ from the requirements for
  in-flight operations.* Service mới nghe sự kiện `DeliveryTracking` rồi ghi vào lưu trữ dài hạn.

Một cái sinh ra từ thông lượng, một cái sinh ra từ cách dữ liệu cần được lưu. Đó là lý do bước bốn
không phải bước phụ.

## Sáu tiêu chí kiểm — phần mang đi dùng được ngay

Sau khi đã chia xong, tài liệu cho sáu tiêu chí để kiểm lại thiết kế:

1. Mỗi service có **một trách nhiệm duy nhất.**
2. **Không có những cú gọi lải nhải giữa các service.** Và câu này rất thẳng: *nếu tách một chức năng
   làm hai service mà hai bên gọi nhau quá nhiều, thì đó có thể là dấu hiệu hai chức năng đó thuộc về
   cùng một service.*
3. Mỗi service **nhỏ đủ để một đội nhỏ làm được một cách độc lập.**
4. **Không có phụ thuộc nào bắt hai service trở lên phải deploy cùng nhau.** Mỗi service phải deploy
   độc lập được mà không cần deploy lại các service khác.
5. Các service **không ghép chặt**, và **tiến hoá độc lập** được.
6. **Ranh giới được thiết kế để tránh rắc rối về tính nhất quán hoặc tính toàn vẹn dữ liệu.** Và tài
   liệu công nhận thẳng: có lúc muốn giữ nhất quán thì phải **gom chức năng liên quan vào cùng một
   service.**

Anh em thử chấm hệ thống hiện tại theo sáu tiêu chí đó xem được mấy điểm. Tôi đoán chỗ trượt nhiều
nhất là **tiêu chí số 4**, vì nó là tiêu chí không nói dối được: đến lúc release là biết ngay.

## Câu chốt

Còn câu chốt thì tôi để nguyên văn tài liệu, và nó là câu tôi muốn anh em mang về nhất:

> Above all, it's important to be **pragmatic**, and remember that domain-driven design is an
> **iterative** process. **When in doubt, start with more coarse-grained microservices. Splitting a
> microservice into two smaller services is easier than refactoring functionality across several
> existing microservices.**

Đọc lại lần nữa: **khi còn ngờ thì chia thô.** Chính tài liệu kiến trúc microservices nói câu đó.

Và câu đó là đề bài của bài tiếp theo trong series — bài về chuyện vì sao làm monolith trước thường
là đường ngắn hơn.

## Ba thứ tôi đã cân nhắc rồi bỏ khỏi bài này

Ghi ra để anh em biết đường tự tra, và để tôi không tự cho mình quyền nói thứ mình không kiểm được:

- ~~**"Things that change together belong together."**~~ **ĐÍNH CHÍNH (11/08/2026):** khi viết bài
  này tôi ghi là không tìm được câu đó trong tài liệu Microsoft nên đã bỏ. **Tôi tra chưa đủ.**
  Trang [Microservices architecture style](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices)
  có đúng ý đó trong mục Best practices, bằng chữ của Microsoft:

  > Services should have loose coupling and high functional cohesion. **Functions that are likely to
  > change together should be packaged and deployed together.** If they reside in separate services,
  > those services end up being **tightly coupled**, because a change in one service requires
  > updating the other service. **Overly chatty communication between two services might be a symptom
  > of tight coupling and low cohesion.**

  Câu cuối còn giải thích **vì sao** tiêu chí số 2 ở trên ("không gọi nhau lải nhải") là dấu hiệu
  xấu: lải nhải là triệu chứng của ghép chặt và kết dính thấp.
- **Nhãn "distributed monolith".** Tôi chưa tra ra định nghĩa trong nguồn có thẩm quyền. Thứ tài liệu
  có là *"hidden dependencies between services, tight coupling"* và tiêu chí số 4. Nên tôi nói bằng
  cơ chế, không dùng nhãn.
- **Mọi con số** — số dòng code, số service "đúng", phần trăm dự án thất bại. Không đo thì không đưa.

## Nguồn

- [Use domain analysis to model microservices](https://learn.microsoft.com/en-us/azure/architecture/microservices/model/domain-analysis)
  — Azure Architecture Center, Microsoft Learn.
- [Identify microservice boundaries](https://learn.microsoft.com/en-us/azure/architecture/microservices/model/microservice-boundaries)
  — Azure Architecture Center, Microsoft Learn.

Ví dụ chạy suốt hai trang là **Fabrikam**, công ty hư cấu của chính Microsoft.

Tài liệu cũng dẫn tới hai quyển sách nền — *Domain-Driven Design* của Eric Evans và *Learning
Domain-Driven Design* của Vlad Khononov. Tôi chưa đọc bản gốc nên trong bài này không trích nội dung
sách, chỉ ghi lại là tài liệu có dẫn tới.
