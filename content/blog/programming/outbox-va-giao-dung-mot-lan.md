---
id: 019fefa0-60a0-78df-b7cc-f0ead1e40887
title: 'Outbox: ghi database và gửi message là hai thao tác'
slug: outbox-va-giao-dung-mot-lan
excerpt: >-
  Broker chỉ bảo đảm cho message đã vào được nó. Khoảng trống nằm trước đó — giữa lúc database
  commit và lúc broker nhận — và không có tính năng nào của broker che được, vì lúc đó nó chưa biết
  message tồn tại.
featured_image: /images/blog/outbox-va-giao-dung-mot-lan/cover.webp
type: blog
reading_time: 11
view_count: 0
meta: null
published_at: '2026-08-11T07:00:00.000000Z'
created_at: '2026-08-11T07:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat2-7002-a002-000000000002, name: Lập trình, slug: programming}
tags: [{name: Microservices, slug: microservices}, {name: Messaging, slug: messaging}, {name: Kiến trúc, slug: kien-truc}, {name: Architecture, slug: architecture}]
comments: []
---

Chào anh em. Bài này bắt đầu bằng hai dòng code mà tôi đoán ai cũng từng viết:

```csharp
var result = _orderRepository.Create(order);                 // 1. ghi database
_messagingService.Publish(new OrderCreatedEvent(result));    // 2. gửi message
```

Nhìn thì hợp lý tới mức không có gì phải bàn. Và tài liệu Microsoft mô tả nó bằng đúng một câu:

> **This approach works until an error occurs between saving the order object and publishing the event.**

**Giữa.** Hai dòng đứng cạnh nhau trong file, nhưng chúng là hai thao tác riêng, và giữa chúng có một
khoảng trống.

## Ba thứ lỗi ở khoảng trống đó

Tài liệu liệt kê: **lỗi mạng · dịch vụ messaging ngừng hoạt động · host chết.** Ba thứ đó không lạ, chúng
là chuyện bình thường trong hệ phân tán.

> Regardless of the error, the system can't publish the `OrderCreated` event to the message bus, and
> **other services aren't notified that an order was created.** …**Lost events can cause data
> inconsistencies across the application.**

Để ý tình huống: đơn hàng **đã nằm trong database**, khách **đã thấy thành công**. Chỉ có kho, hoá đơn, và
mọi service khác là không biết gì.

### Cái giá về thiết kế mới là chỗ đau

> The `Ordering` service must now **handle concerns beyond its core business process.** It must **track
> which events need publishing when the message bus recovers.**

Cái service lo chuyện đặt hàng giờ phải mọc thêm một cái sổ theo dõi message chưa gửi, cộng cơ chế thử
lại, cộng chỗ lưu cái sổ đó. Đó là **việc của hạ tầng lọt vào logic nghiệp vụ** — và một khi đã lọt vào
thì nó ở đó mãi, lẫn với code tính giá và tính thuế.

## "Message queue lo hết chuyện tin cậy" là câu sai

Tôi nghe câu này nhiều: dùng Kafka hay RabbitMQ rồi thì chuyện tin cậy nó lo.

Không. Broker bảo đảm cho message **đã vào được** nó — có ghi bền, có nhân bản, có xác nhận, tất cả đều
thật. Nhưng khoảng trống mình đang nói tới nằm **trước** đó: giữa lúc database commit và lúc broker nhận.
Trong khoảng đó, **broker chưa hề biết message tồn tại.** Không có tính năng nào của nó che được khoảng
trống ấy, vì nó không thể bảo vệ một thứ nó chưa nghe nói tới.

Đây là chỗ tôi thấy nhiều đội mua một broker rất tốt rồi vẫn mất message, và không hiểu tại sao.

## Giải pháp: biến hai thao tác thành một

> This pattern **saves events in a data store that's typically in an outbox table in your database**
> before it pushes them to a message broker. When you save the business object and its events **within the
> same database transaction**, the system **guarantees no data loss.** The transaction **either commits
> everything or rolls back everything** if an error occurs.

Nghĩa là mình **không chống lỗi mạng** nữa. Mình **xoá bỏ khoảng trống**, bằng cách biến hai thao tác
thành một.

Rồi ai gửi?

> To publish the events, **a separate service or worker process** queries the outbox table for unhandled
> entries, publishes them, and marks them as processed.

**Riêng biệt** — đó là điểm hay thứ hai: logic nghiệp vụ của anh em không còn biết gì về chuyện gửi
message nữa. Nó chỉ ghi vào database, việc nó vốn đã làm. Và nếu tiến trình gửi chết thì message vẫn nằm
nguyên trong bảng chờ nó sống lại.

### Ở database quan hệ thì việc này DỄ

> In a relational database, **the implementation of the pattern is straightforward.** For example, when a
> service uses Entity Framework Core, it creates a database transaction by using an Entity Framework
> context, **saves the business object and event, and commits the transaction** or rolls it back.

Với EF Core thì cả chuyện này gói trong **một** `SaveChanges`. Anh em dùng PostgreSQL với EF Core thì đây
là việc của một buổi chiều, không phải của một quý.

## Nhưng chỗ khó là THỨ TỰ

> **In practice, implementation becomes more complex. You must preserve event order** so that the system
> publishes an `OrderCreated` event **before** an `OrderUpdated` event.

Đây là bài toán khác hẳn. **Outbox chống MẤT message. Nó không tự chống SAI THỨ TỰ.** Mà sai thứ tự thì
hậu quả có thể tệ hơn mất: bên nhận xử lý một bản cập nhật cho đơn hàng nó chưa biết là tồn tại, rồi tạo
ra dữ liệu rác, hoặc lỗi rồi bỏ luôn message.

## "Giao đúng một lần" là thứ mình tự dựng, không phải mua được

Xem chuyện gì xảy ra khi worker gặp lỗi:

> the library **restarts reading messages from the position where it successfully processed the last
> batch.** For example, if the application successfully processed 10,000 messages and encounters an error
> while it processes batch 10,001 to 10,025, the library **restarts at position 10,001.**

Hệ quả:

> When reprocessing occurs, **the application might have already sent some messages**… which **normally
> creates duplicate message processing.**

Nghĩa là **gửi lại không phải sự cố, nó là hành vi bình thường** của một hệ thống có khả năng hồi phục.
Anh em muốn không mất message thì phải chấp nhận có lúc gửi hai lần. Hai thứ đó là **một cặp đánh đổi**,
không phải hai lỗi riêng.

Nên "giao đúng một lần" không phải bảo đảm có sẵn — nó là thứ mình dựng từ hai mảnh: **ít nhất một lần,
cộng khử trùng.**

### Khử trùng bằng một id ỔN ĐỊNH

> Service Bus checks whether a message **already exists**… based on the **application-controlled
> `MessageId`** property of the message. That property is **set to the `ID` of the event document.** When
> Service Bus receives a duplicate message, it **ignores and drops** the message.

Mấu chốt: id phải **ổn định** — nó phải là id của **bản ghi outbox**, không phải một GUID sinh mới mỗi lần
gửi. Sinh mới mỗi lần gửi thì hai lần gửi cùng một sự kiện ra **hai id khác nhau**, và mọi cơ chế khử trùng
đều **mù**. Bug này rất khó thấy vì code trông đúng: có sinh id, có gửi id, bên nhận có kiểm id — chỉ có
điều id không ổn định.

### Thứ tự cần một khoá phân vùng

> Each Service Bus message includes a `SessionId` property. Sessions **preserve message order (FIFO)**,
> which ensures that events are processed **in the correct sequence.**

Trong mã mẫu, `SessionId` = `PartitionKey` = **id của thực thể**. Nghĩa là thứ tự được giữ **trong phạm vi
một khoá** — một đơn hàng, một khách — chứ không giữ toàn cục. Và đó là lựa chọn đúng: anh em chỉ cần
`OrderCreated` đến trước `OrderUpdated` của **cùng** một đơn.

## Dọn bảng outbox — và một cái bẫy về thời gian

> The primary consideration is to set a suitable `TTL` value… **when the background worker or the service
> bus are unavailable.** In a production environment, set a time span of **multiple days, like 10 days.**

Bài học tổng quát: **thời gian sống của bản ghi outbox không được ngắn hơn thời gian bên gửi có thể chết.**
Đặt ngắn quá là **tự tay tạo ra mất message** — đúng cái thứ mà outbox sinh ra để chống.

## Hai câu thẳng thắn của tài liệu

> **The sample code in this article isn't production-ready code.** It has limitations regarding
> **multithreading**, especially the way events are handled in the `DomainEntity` class.

> Alternatively, consider **using existing libraries that have this functionality built in, like
> NServiceBus or MassTransit.**

Một tài liệu chính thức tự nói mã mẫu của mình không dùng được thẳng cho production, và **tự khuyên đừng
tự viết.** Nghe hơi cụt so với bản năng "tự làm cho hiểu", nhưng nghĩ lại: outbox đúng là loại việc mà tự
viết thì sai ở chỗ khó thấy nhất — **đa luồng, khử trùng, thứ tự, resume sau khi chết.** Bốn chỗ đó đều
**không lộ ra trong lúc dev**; chúng lộ ra lúc có tải thật.

Nên: **hiểu cơ chế thì tự đọc, cài đặt thì dùng thư viện.**

## Một chi tiết nếu anh em không dùng RDBMS

> Azure Cosmos DB transactions, called *transactional batches*, **operate on a single logical
> partition**… **You can't save two documents in a transactional batch operation in different containers
> or logical partitions.**

Để làm outbox ở đó, bản ghi nghiệp vụ và bản ghi sự kiện phải nằm **cùng một phân vùng logic**. Ở database
quan hệ không có ràng buộc đó. Nêu chuyện này không để đi sâu vào một sản phẩm, mà để thấy: **chọn kho dữ
liệu ảnh hưởng tới cách cài outbox**, chứ không chỉ ảnh hưởng tới truy vấn.

## Chốt bốn câu

1. Ghi database và gửi message là **hai** thao tác, và khoảng trống giữa chúng là chỗ message biến mất —
   broker không che được vì nó chưa biết message tồn tại.
2. Outbox **xoá khoảng trống** bằng cách ghi message vào cùng một giao dịch với dữ liệu, rồi để một tiến
   trình riêng đi gửi.
3. "Giao đúng một lần" không phải bảo đảm mua được; nó là **ít nhất một lần + khử trùng theo id ổn định** —
   id của bản ghi outbox, không phải id sinh mới mỗi lần gửi.
4. Outbox chống **mất**, không tự chống **sai thứ tự**; muốn giữ thứ tự thì giữ trong phạm vi một khoá.

## Nguồn

- [Implement the Transactional Outbox pattern](https://learn.microsoft.com/en-us/azure/architecture/databases/guide/transactional-out-box-cosmos)
  — Azure Architecture Center.
