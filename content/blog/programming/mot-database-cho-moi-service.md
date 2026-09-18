---
id: 019fed30-53d4-7a41-8db0-6d60b408749d
title: 'Một database cho mỗi service: chung server thì được, chung schema mới hỏng'
slug: mot-database-cho-moi-service
excerpt: >-
  Hai service không nên dùng chung một kho dữ liệu. Nhưng chỗ nhiều đội hiểu sai và bị chặn oan:
  dùng chung database server thì an toàn — chung schema hoặc chung bộ bảng mới là chỗ hỏng, vì đó
  là lúc bạn dùng chung lịch trình triển khai.
featured_image: /images/blog/mot-database-cho-moi-service/cover.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-08-11T03:00:00.000000Z'
created_at: '2026-08-11T03:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat2-7002-a002-000000000002, name: Lập trình, slug: programming}
tags: [{name: Microservices, slug: microservices}, {name: Database, slug: database}, {name: Kiến trúc, slug: kien-truc}, {name: Architecture, slug: architecture}]
comments: []
---

Chào anh em. [Bài trước](/blog/monolith-truoc-da-tam-thach-thuc) có nhắc tám thách thức của
microservices, và cái thứ năm là chuyện dữ liệu. Hôm nay mổ riêng nó.

Tài liệu Microsoft phát biểu luật này ngắn tới mức không có chỗ để hiểu sai:

> **Two services shouldn't share a data store.** Each service manages its own private data store, and
> other services can't access it directly.

Nghe thì ai cũng biết. Nhưng cái giá thật của việc vi phạm nó không nằm ở chỗ anh em nghĩ.

## Dùng chung schema là dùng chung lịch trình triển khai

Tài liệu nói vì sao có luật đó:

> This rule prevents **unintentional coupling** between services, which happens when services share
> the same underlying data schemas. **If the data schema changes, the change must be coordinated
> across every service that relies on that database.** Isolating each service's data store limits the
> scope of change and **preserves the agility of independent deployments.**

Chỗ đau không phải hiệu năng. Dùng chung schema tức là **dùng chung lịch trình triển khai**. Đổi một
cột là phải họp với tất cả các đội đọc bảng đó.

### Và tiêu chí số 4 của bài đầu tiên chết ở đúng đây

Trong [sáu tiêu chí kiểm ranh giới](/blog/ranh-gioi-microservices-chia-theo-cai-gi), tiêu chí thứ tư
là: *không có phụ thuộc nào bắt hai service trở lên phải deploy cùng nhau*. Tôi có nói đó là tiêu chí
không nói dối được.

Giờ thì rõ nó chết ở đâu. Và **cái chết đó im lặng**: nhìn sơ đồ kiến trúc vẫn thấy các hộp riêng, mỗi
hộp một repo, mỗi repo một pipeline. Không có gì trông sai cả — cho tới lần release sau, khi anh em
cần đổi một cột và phát hiện phải phối hợp bốn đội. Ràng buộc đó đã có ở đó từ lâu, chỉ là chưa ai
đụng vào.

### Lý do thứ hai, ít người nhắc

> Each microservice might also have unique data models, queries, or read and write patterns. **A
> shared data store limits each team's ability to optimize data storage for its specific service.**

Ngoài ghép chặt về lịch trình, kho dùng chung còn **khoá quyền chọn công cụ**. Service này ghi rất
nhiều nhưng đọc đơn giản; service kia cần join phức tạp và toàn vẹn tham chiếu. Nhét cả hai vào một
chỗ thì cả hai đều phải sống với đánh đổi của chỗ đó.

## Chỗ này sửa một hiểu sai rất đắt

Tài liệu có một Note mà tôi đoán nhiều đội chưa đọc:

> **Services can safely share the same physical database server.** Problems occur when services share
> **the same schema**, or they **read and write to the same set of database tables.**

Đọc lại. Chung **máy chủ** thì an toàn. Chung **schema**, hoặc chung **bảng**, mới là vấn đề.

Nghĩa là "mỗi service một database" **không** đòi anh em phải mua thêm hạ tầng, không đòi mỗi service
một cụm riêng. Ranh giới cần giữ là ranh giới **logic**. Tôi từng thấy đội hoãn cả việc tách service
vì tưởng phải xin thêm mấy con database server, mà thứ họ cần chỉ là mấy cái schema riêng trên đúng con
server đang có.

## Nhưng chia dữ liệu không miễn phí

Nói cái giá của việc dùng chung rồi, giờ phải nói cái giá của việc chia. Tài liệu liệt kê thẳng:

> First, **redundancy** can occur across data stores. The same data item might appear in multiple
> places… **Duplicated or partitioned data can lead to problems with data integrity and consistency.**
> When data relationships span multiple services, **traditional data management techniques can't
> enforce those relationships.**

**Không thể áp đặt.** Nghĩa là cái khoá ngoại mà anh em vẫn tin tưởng suốt bao năm, nó không còn ở đó.

### Một sự thật ở một chỗ — và anh em vừa từ bỏ nó

Câu so sánh hay nhất của cả trang:

> Traditional data modeling follows the rule of **one fact in one place**. Every entity appears exactly
> once in the schema… The main advantage of the traditional approach is that **updates occur in a
> single place**, which prevents data consistency problems.

Cái quy tắc *một sự thật ở một chỗ* chính là thứ mà database quan hệ tặng anh em **miễn phí** suốt bao
năm nay. Chia service là tự tay từ bỏ nó — đổi lấy quyền tự chủ, và trả bằng việc phải tự lo chuyện
nhất quán.

## Vậy làm gì: sáu hướng dẫn

Tài liệu mở phần này bằng một câu rất thật: *"**No single approach works for all cases.**"*

**1. Định nghĩa mức nhất quán cho từng thành phần, ưu tiên nhất quán sau cùng ở chỗ có thể.** Xác định
vùng nào cần nhất quán mạnh hoặc ACID, và vùng nào chấp nhận eventual.

Chỗ này đảo ngược cách hỏi. Câu hỏi không phải *"hệ thống của tôi có nhất quán không"*, mà là *"chỗ
nào trong hệ thống thật sự cần nhất quán mạnh"* — và với phần lớn hệ thống thì đó là một danh sách
ngắn hơn nhiều so với anh em tưởng.

**2. Dùng một nguồn sự thật duy nhất khi cần nhất quán mạnh.**

> One service might represent the source of truth for a given entity and expose it through an API.
> Other services might hold their own copy of the data… that's eventually consistent with the primary
> data **but not considered the source of truth.**

Ví dụ của tài liệu: service gợi ý nghe sự kiện từ service đơn hàng. Nhưng khi khách xin hoàn tiền thì
**service đơn hàng**, không phải service gợi ý, mới có lịch sử giao dịch đầy đủ.

Nên bản sao không phải xấu. **Bản sao mà không biết mình là bản sao mới xấu.**

**3. Áp các mẫu giao dịch để giữ nhất quán qua nhiều service** — Scheduler Agent Supervisor và
Compensating Transaction. Tôi mổ riêng chuyện này ở [bài về saga và bù trừ](/blog/saga-va-bu-tru).

**4. Chỉ lưu dữ liệu mà service cần.**

> in the shipping bounded context, you need to know which customer is associated with a specific
> delivery. But **you don't need the customer's billing address** because the accounts bounded context
> manages that information.

Câu hỏi *"service này cần biết gì về khách hàng"* là câu hỏi của bước phân tích miền, không phải câu
hỏi lúc viết migration.

**5. Xem các service có gắn kết và ghép lỏng không.**

> **If two services continually exchange information with each other and create chatty APIs, you might
> need to redraw your service boundaries.** Merge the two services or refactor their functionality.

Đây là **lần thứ ba** tài liệu nói đúng ý đó trong series này: bài 1 nêu nó thành tiêu chí kiểm, bài 2
giải thích cơ chế (lải nhải là triệu chứng của ghép chặt và kết dính thấp), bài 3 lặp lại trong hướng
dẫn về dữ liệu. Ba trang khác nhau, cùng một câu. Đó không phải tôi nhấn — chính tài liệu nhấn.

**6. Dùng kiến trúc điều khiển bởi sự kiện** — service phát sự kiện khi mô hình công khai của nó đổi;
service khác đăng ký nghe và có thể dựng **materialized view** phù hợp hơn cho truy vấn. Kèm hai cảnh
báo:

- **Công bố lược đồ cho sự kiện.** *"This approach avoids tight coupling between publishers and
  subscribers."*
- **Giảm nghẽn ở quy mô lớn.** *"At high scale, events can become a bottleneck on the system."* → cân
  nhắc gộp hoặc theo lô.

## Ví dụ đắt nhất: cùng một luồng, ba kho khác nhau

Vẫn ứng dụng giao hàng bằng drone. Ba service chọn ba kho hoàn toàn khác nhau — **không phải vì công
nghệ nào xịn hơn, mà vì kiểu đọc và ghi khác nhau.**

| Service | Nhu cầu | Hệ quả |
|---|---|---|
| **Delivery** | Thông lượng đọc/ghi hơn lưu dài hạn; chỉ lấy **trạng thái mới nhất**; không truy vấn phức tạp | Dữ liệu **ngắn hạn**. Sau khi chuyến xong, service lịch sử mới là **hệ thống bản ghi chính thức** |
| **Delivery History** | Hai tình huống khác nhau nên **hai kho** | Phân tích cần **lược đồ khi đọc** trên tập lớn; tra một đơn theo ID thì kho đó **không phục vụ được** |
| **Package** | Lưu dài hạn · ghi thông lượng cao · truy vấn theo ID, **không join phức tạp, không toàn vẹn tham chiếu** | Dữ liệu không quan hệ → kho **dạng tài liệu** |

Chi tiết đáng học nhất nằm ở service lịch sử. Vì sao kho phân tích không tra được một đơn?

> store time-series data… **partitioned by date. But this structure makes individual ID-based lookups
> inefficient. Unless you also know the timestamp, an ID lookup requires you to scan the entire
> collection.**

Nên họ lưu thêm một **tập con** vào kho thứ hai cho việc tra nhanh, rồi định kỳ chuyển bản cũ đi lưu
trữ. Một service, hai kho, vì hai câu hỏi.

Và để ý chi tiết ở service giao hàng: **quyền sở hữu dữ liệu chuyển tay theo thời gian.** Trong lúc
chuyến đang bay thì `Delivery` giữ; xong chuyến thì `Delivery History` thành nơi giữ bản ghi chính
thức.

Khuôn chung của cả ba lần: **đi từ câu hỏi mình sẽ đọc và ghi thế nào, rồi mới chọn kho.** Đó là điều
tài liệu gọi là *polyglot persistence*:

> One service might need the **schema-on-read** capabilities of a document database. Another service
> might need the **referential integrity** that an RDBMS provides. **Each team can choose the best
> option for its service.**

## Chỗ tôi cố tình không nói

Trang tài liệu tôi dùng có một hình minh hoạ gắn nhãn CQRS vẽ **cách làm sai**, nhưng nó **không định
nghĩa** CQRS. Nên tôi không giải thích CQRS trong bài này. Event sourcing thì trang này không nhắc, tôi
cũng không đưa vào.

Tôi biết hai chữ đó nghe rất chuyên nghiệp và nhét vào thì bài oai hơn, nhưng tôi chỉ nói được cái tôi
tra được. Cũng vậy với tên sản phẩm: tài liệu có nêu mấy dịch vụ cụ thể của Azure, tôi giữ ở mức *vì
sao chọn kho đó*, chứ không biến bài thành bài giới thiệu sản phẩm — anh em dùng PostgreSQL hay MySQL
vẫn phải áp dụng được cùng một lối suy nghĩ.

## Chốt ba câu

1. **Dùng chung máy chủ database thì an toàn; chung schema hoặc chung bảng mới là chỗ hỏng** — vì đó
   là lúc anh em dùng chung lịch trình triển khai.
2. **Chia dữ liệu không miễn phí.** Anh em đánh đổi quy tắc *một sự thật ở một chỗ* để lấy quyền tự
   chủ, và trả bằng nhất quán sau cùng cùng với việc mất khoá ngoại.
3. **Cách chọn kho là đi từ kiểu đọc và ghi**, không đi từ công nghệ nào đang thời thượng.

Và nếu chỉ nhớ một dấu hiệu duy nhất từ ba bài vừa rồi: **hai service nói chuyện với nhau liên tục là
dấu hiệu ranh giới sai** — tài liệu đã nhắc nó ba lần ở ba trang khác nhau.

## Nguồn

- [Data considerations for microservices](https://learn.microsoft.com/en-us/azure/architecture/microservices/design/data-considerations)
  — Azure Architecture Center. Luật, Note về database server, sáu hướng dẫn, và ví dụ ba kho.
