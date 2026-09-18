---
id: 019fefa0-60af-7818-8473-9d42ce7cdc28
title: 'Idempotent là điều kiện, không phải trang trí'
slug: idempotent-la-dieu-kien
excerpt: >-
  Cú gọi gốc có thể THÀNH CÔNG mà phản hồi không về được. Từ phía bên gọi, "chưa làm" và "làm rồi mà
  tôi không biết" trông y hệt nhau — nên retry có an toàn hay không là câu hỏi về bên nhận, không
  phải về cấu hình của bên gọi.
featured_image: /images/blog/idempotent-la-dieu-kien/cover.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-08-11T08:00:00.000000Z'
created_at: '2026-08-11T08:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat2-7002-a002-000000000002, name: Lập trình, slug: programming}
tags: [{name: Microservices, slug: microservices}, {name: Kiến trúc, slug: kien-truc}, {name: Messaging, slug: messaging}, {name: Architecture, slug: architecture}]
comments: []
---

Chào anh em. Bài này về một chữ mà tôi nghĩ đang bị đối xử sai: **idempotent**. Nó thường bị coi là thứ
*hay-thì-có*, kiểu best practice ghi vào tài liệu nội bộ rồi không ai làm.

Nhưng qua ba bài vừa rồi anh em đã thấy nó xuất hiện ở **bốn** chỗ khác nhau: [bù trừ](/blog/saga-va-bu-tru)
cần nó, phục hồi tiến độ cần nó, [outbox](/blog/outbox-va-giao-dung-mot-lan) cần nó. Ba trang tài liệu khác
nhau, cùng đòi một điều kiện.

## Định nghĩa, và mảnh thứ ba người ta bỏ qua

> An operation is **idempotent** if it can be called multiple times **without producing additional
> side-effects after the first call.** Essentially, the downstream service should **ignore duplicate
> calls**, which means the service must be able to **detect** duplicate calls.

Ba mảnh trong một câu:

1. Gọi nhiều lần **không sinh tác dụng phụ thêm** sau lần đầu.
2. Bên nhận **bỏ qua** cú gọi trùng.
3. Muốn bỏ qua thì phải **PHÁT HIỆN** được là trùng.

Mảnh thứ ba là mảnh người ta bỏ qua — và nó là **việc phải làm**.

### Nên nó không phải tính chất tự nhiên

Nhiều người coi idempotent như một tính chất mà thao tác vốn có hoặc vốn không, kiểu số chẵn hay số lẻ.
Không phải. Theo đúng định nghĩa trên thì nó là một **cơ chế phải xây**: phải có một chỗ nhớ để biết *"cú
gọi này tôi đã thấy rồi"*.

Nghĩa là nó **luôn có chi phí** — chi phí lưu danh sách id đã xử lý, và chi phí quyết định giữ danh sách đó
bao lâu. Tài liệu cũng không giả vờ nó dễ:

> **It's not always straightforward to implement idempotent methods.**

## Cái bẫy: cú gọi gốc THÀNH CÔNG

> **If an operation isn't idempotent, retries can cause unintended effects.** The original call might
> **succeed**, but the caller **never gets a response.** If the caller retries, the operation might be
> **invoked twice.**

Đọc lại chỗ giữa: **cú gọi gốc thành công.** Không phải nó lỗi. Nó chạy xong, đã trừ tiền, đã tạo đơn. Chỉ
có cái **phản hồi** là không về được tới bên gọi.

### Và đây là chìa khoá

Từ phía bên gọi, hai tình huống **"chưa làm"** và **"làm rồi mà tôi không biết"** trông **y hệt nhau**:
cùng một hiện tượng hết thời gian chờ, không có phản hồi. **Không có cách nào phân biệt được từ bên ngoài.**

Nên câu hỏi *"retry có an toàn không"*:

- **không** phải câu hỏi về bên gọi
- **không** phải câu hỏi về cấu hình HTTP client
- **không** phải câu hỏi về thư viện

Nó là câu hỏi về **BÊN NHẬN**: bên nhận có phát hiện được cú gọi trùng hay không. Bên gọi làm gì cũng không
thay đổi được câu trả lời đó.

### POST và PATCH

> Generally, **it's not safe to retry POST or PATCH** methods because these operations aren't guaranteed to
> be idempotent.

Anh em nào đang có retry bật mặc định ở tầng HTTP client cho **mọi** method, thì đây là lúc đi kiểm lại.

Tôi nói rõ về nguồn: tôi chỉ nói theo tài liệu Azure ở đây. Tôi **chưa tra spec HTTP**, nên không khẳng
định method nào idempotent theo spec — chỉ nhắc lại đúng câu tài liệu nói về `POST` và `PATCH`.

### Và nó nổ đúng lúc xấu nhất

**[Nhận định]** Phần này là tôi suy ra, không phải câu trích: cái bẫy retry này **không nổ trong lúc dev**,
không nổ trong lúc test, vì lúc đó mạng tốt và phản hồi luôn về. Nó nổ đúng lúc mạng xấu, lúc một service
quá tải, lúc host vừa restart — tức là **đúng lúc anh em đang bận chữa một sự cố khác và ít quan sát nhất.**

Nên chi phí thật của việc không idempotent không phải *"có thể tạo đơn hai lần"*. Nó là *"tạo đơn hai lần
vào đúng lúc anh em không nhìn tới nó"*.

## Bốn chỗ tài liệu đòi idempotent

**Trong bù trừ — hai lần trong cùng một trang:**

> **Compensating transactions are eventually consistent operations and can fail**… A step might run
> multiple times when retried, so **design each step as an idempotent command.**

> **Compensating transactions don't always work.** Define the steps in a compensating transaction as
> **idempotent commands** so that you can repeat them if the compensating transaction itself fails.

**Trong phục hồi tiến độ — và đây là chỗ đáng nhất:**

> One approach is to **save a checkpoint** to a durable store after each step… **However, writing
> checkpoints can create a performance overhead.**
> **Another option is to design all operations to be idempotent.**

Tài liệu đặt idempotent **ngang hàng với checkpoint**, như hai đường **thay thế nhau** để giải cùng một bài
toán. Đó không phải vị trí của một lời khuyên phụ.

**Trong outbox:** worker restart từ lô cuối nên có thể gửi lại → khử trùng dựa trên id do **ứng dụng** kiểm
soát, đặt bằng **id của bản ghi sự kiện**.

Bốn chỗ, bốn ngữ cảnh, một điều kiện. Khi một tài liệu nhắc cùng một thứ bốn lần ở bốn chỗ, đó là nó đang
nói rằng thứ đó **không tuỳ chọn**.

## Cài ở đâu

**1. Ở phía nhận, theo id ổn định** — cách outbox làm: mỗi thao tác mang một id do **bên gọi** sinh và
**giữ nguyên qua mọi lần retry**; bên nhận ghi lại id đã xử lý và bỏ qua id đã thấy.

**2. Ở broker**, nếu broker có phát hiện trùng — nó so cũng theo đúng id đó.

Cả hai đều đòi **một chỗ nhớ**, nên cả hai có chi phí. Không có cách nào miễn phí — và đó là lý do người ta
hay bỏ qua nó cho tới lúc gặp sự cố.

### Mấu chốt: id phải ỔN ĐỊNH

Nó phải là id của **bản ghi**, sinh **một lần** khi tạo ra thao tác đó. Nếu anh em sinh một GUID mới ở mỗi
lần gửi thì hai lần gửi cùng một sự kiện mang **hai id khác nhau**, và mọi cơ chế khử trùng đều **mù** — nó
nhìn hai id khác nhau và kết luận đây là hai thao tác khác nhau.

Bug này rất khó thấy, vì code trông đúng: có sinh id, có gửi id, bên nhận có kiểm id. Chỉ có điều id không
ổn định, nên **cả cơ chế thành trang trí**.

## Hai chỗ hay bị lẫn

| | |
|---|---|
| **Idempotent ≠ giao hoán** | Idempotent nói về việc **gọi lại cùng một** thao tác. Thứ tự giữa các thao tác **khác nhau** là bài toán riêng — giữ FIFO trong phạm vi một khoá, xem [bài outbox](/blog/outbox-va-giao-dung-mot-lan) |
| **Idempotent ≠ thuần khiết** | Thao tác **vẫn được** có tác dụng phụ ở **lần đầu** — vẫn trừ tiền, vẫn tạo đơn. Điều kiện chỉ là **từ lần thứ hai** trở đi không sinh thêm |

## Chỗ tôi cố tình không nói

Hai thứ tôi bỏ, vì cả hai đều là thứ tôi có thể nói cho oai mà không tra được:

- **Định nghĩa idempotent method trong spec HTTP.** Kế hoạch series của tôi có ghi ý sẽ đối chiếu spec,
  nhưng tôi **chưa tra**.
- **Header `Idempotency-Key`** mà nhiều API lớn dùng. Đó là thực hành rất phổ biến, nhưng tôi chưa tra ra
  nguồn có thẩm quyền định nghĩa nó — nên tôi nói bằng **cơ chế** (id ổn định do bên gọi sinh), không đặt
  tên một header cụ thể như thể đó là chuẩn.

## Chốt bốn câu

1. Idempotent **không phải tính chất tự nhiên** của thao tác — nó là cơ chế phải xây, và phần khó nhất là
   **phát hiện** được cú gọi trùng.
2. Từ phía bên gọi, *"chưa làm"* và *"làm rồi mà tôi không biết"* trông y hệt nhau — nên retry an toàn hay
   không là câu hỏi về **bên nhận**.
3. **Id phải ổn định**, sinh một lần theo bản ghi; sinh mới mỗi lần gửi là biến cả cơ chế thành trang trí.
4. Nó là **móng chứ không phải trang trí** — tài liệu đòi nó ở bốn chỗ, và có chỗ đặt nó ngang hàng với
   checkpoint.

## Nguồn

- [Interservice communication in microservices](https://learn.microsoft.com/en-us/azure/architecture/microservices/design/interservice-communication)
  — định nghĩa idempotent, retry, POST/PATCH, checkpoint vs idempotent.
- [Compensating Transaction pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction)
- [Implement the Transactional Outbox pattern](https://learn.microsoft.com/en-us/azure/architecture/databases/guide/transactional-out-box-cosmos)
