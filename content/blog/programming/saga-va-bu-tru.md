---
id: 019fefa0-6091-76fe-8ea0-74cea4487efa
title: 'Saga và hành động bù trừ: bù trừ không phải rollback'
slug: saga-va-bu-tru
excerpt: >-
  Bù trừ không đưa hệ thống về trạng thái cũ — nó làm một việc nghiệp vụ mới để trung hoà việc đã
  làm. Và khôi phục trạng thái ban đầu có thể ghi đè lên thay đổi của người khác, tức là sinh ra
  một lỗi thứ hai tệ hơn lỗi đầu.
featured_image: /images/blog/saga-va-bu-tru/cover.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-08-11T06:00:00.000000Z'
created_at: '2026-08-11T06:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat2-7002-a002-000000000002, name: Lập trình, slug: programming}
tags: [{name: Microservices, slug: microservices}, {name: Kiến trúc, slug: kien-truc}, {name: Saga, slug: saga}, {name: Architecture, slug: architecture}]
comments: []
---

Chào anh em. [Bài trước](/blog/dong-bo-hay-bat-dong-bo) có nhắc: khi một service phía dưới lỗi kiểu
không thoáng qua, service xếp lịch gửi tin bất đồng bộ sang Supervisor để xếp các **giao dịch bù trừ**.
Hôm nay mổ chữ đó.

Và tôi bắt đầu bằng việc phá một cách hiểu mà tôi từng có: **bù trừ không phải rollback.** Không phải
cách nói khác của rollback, không phải rollback thủ công. Nó là một thứ khác về bản chất — và tài liệu
Microsoft nói chuyện đó thẳng tới **ba lần** theo ba cách.

## Lần một: không phải lúc nào cũng rollback được

> **you can't always roll back the data because other concurrent application instances might change the
> data.** Even when concurrent instances don't change the data, **it can be more complex to undo a step
> than to restore the original state.** You might need to apply business-specific rules.

Rollback trong một database là chuyện engine làm hộ, vì nó độc quyền giữ dữ liệu đó và nó có log. Ở đây
thì dữ liệu nằm ở service khác, và trong lúc anh em định hoàn tác thì người khác đã ghi lên đó rồi.

## Lần hai: khôi phục trạng thái cũ là ghi đè lên việc của người khác

> You might think that you can simply restore the system to its original state, but **this approach can
> overwrite changes from other concurrent application instances.** Instead, the compensating transaction
> must **intelligently account for concurrent work.** This process is **usually application specific.**

Đây là câu đau nhất. Cái mà anh em tưởng là *sửa lỗi* thực ra có thể là **một lỗi thứ hai, tệ hơn cái
đầu** — vì lỗi đầu chỉ là một giao dịch dở dang, còn cái này là xoá mất việc của người khác.

## Lần ba: định nghĩa chính xác

> **A compensating transaction doesn't necessarily return the system data to its state at the start of
> the original operation.** Instead, the transaction **compensates for the work that the operation
> completes successfully before it failed.**

Hai chuyện khác nhau hoàn toàn:

- **Rollback** nói: *hãy như chưa từng có gì xảy ra.*
- **Bù trừ** nói: *đã có việc xảy ra rồi, và tôi sẽ làm một việc nghiệp vụ MỚI để trung hoà nó.*

Ví dụ dễ nhất là tiền. Rollback một lần chuyển tiền là xoá nó khỏi lịch sử. Bù trừ là **ghi thêm một bút
toán ngược lại**. Sổ sách nhìn khác nhau hoàn toàn — và cái thứ hai mới là cái đúng.

## Ba chỗ phá vỡ trực giác "làm ngược lại là xong"

> - A compensating transaction **might not need to undo the work in the exact reverse order** of the
>   original operation.
> - You might be able to perform **some undo steps in parallel.**
> - You might need to apply business-specific rules. For example, **canceling a flight reservation might
>   not entitle the customer to a complete refund.**

Cái thứ ba đáng dừng lại. Nếu bù trừ chỉ là làm ngược lại thì huỷ vé phải trả lại đúng số tiền đã thu.
Nghiệp vụ thật không chạy như thế.

Và lý do thứ tự có thể khác: *nếu một kho dữ liệu **nhạy cảm với sự không nhất quán hơn** kho khác thì
hoàn tác ở kho đó **trước**.*

## Ví dụ hay nhất — và nó là quyết định sản phẩm, không phải code

> …a customer books flights F1, F2, and F3 but **fails to reserve a room at hotel H1. Offering the
> customer a room at a different hotel is preferable to canceling the flights.** The customer can still
> choose to cancel… **However, the customer should make this decision, not the system.**

Phản xạ kỹ thuật của mình là gì? Một bước lỗi → huỷ hết → bù trừ ba vé. Tài liệu nói **ngược lại**.

Và nó nói tiếp một câu tôi ít thấy trong tài liệu kỹ thuật:

> **When decisions are high impact or hard to automate reliably, include a human in the decision-making
> process.**

Một tài liệu kiến trúc cloud khuyên đưa **con người** vào vòng quyết định. Và nó đúng, vì cái đang bàn
không phải lỗi kỹ thuật — nó là câu hỏi nghiệp vụ: *khách này muốn gì hơn?*

**[Nhận định]** Đây là chỗ tôi thấy nhiều hệ thống làm sai theo hướng "kỹ thuật quá": tự động huỷ sạch
cho hệ thống nhất quán, rồi mất khách. Nhất quán dữ liệu không phải mục tiêu cuối cùng — nó là phương
tiện.

## Bù trừ cũng lỗi được

Chỗ này làm mọi thứ khó hơn một bậc, và bỏ qua nó thì thiết kế hỏng đúng lúc cần nhất:

> **Compensating transactions are eventually consistent operations and can fail.** The system should
> **record progress so that it can resume the compensating transaction from the point of failure.** A step
> might run multiple times when retried, so **design each step as an idempotent command.**

> **Compensating transactions don't always work.** Define the steps in a compensating transaction as
> **idempotent commands** so that you can repeat them if the compensating transaction itself fails.

Nên [idempotent](/blog/idempotent-la-dieu-kien) không phải thứ *hay-thì-có*. Nó là **điều kiện** để bù
trừ hoạt động: bù trừ có thể lỗi → lỗi thì phải thử lại → thử lại thì bước đó chạy nhiều lần. Nếu bước
bù trừ không idempotent thì **cơ chế cứu hệ thống lại chính là cái làm hỏng thêm**.

Và khi không còn cách nào:

> Sometimes **manual intervention is the only way** to recover from a failed step. In these situations,
> the system should **raise an alert that includes detailed information** about the reason for the failure.

Tôi thích câu này vì nó thực tế: nó không hứa hệ thống tự lành. Nó nói sẽ có lúc chỉ người mới gỡ được,
nên **nhiệm vụ của anh em là làm cho người đó có đủ thông tin.** Alert phải mang theo *lý do*, không chỉ
mang chữ `failed`.

## Bốn vấn đề khi cài đặt

**1. Bước không lỗi mà BỊ TREO.**

> A step might not fail immediately but instead **get blocked.** You might need to implement a **timeout
> mechanism.**

Không lỗi, không thành công, chỉ đứng đó. Và cả cơ chế bù trừ không khởi động được vì nó đang chờ một câu
trả lời sẽ không bao giờ tới. Timeout ở đây không phải tối ưu hoá — nó là **điều kiện để hệ thống biết
mình đang ở trạng thái nào.**

**2. Logic bù trừ không tổng quát hoá được.**

> **It's not easy to generalize compensation logic.** A compensating transaction is **application
> specific.** It relies on the application having **sufficient information to undo** the effects of each
> step.

Đừng mơ một framework bù trừ dùng chung cho mọi luồng. Cái dùng chung được là **bộ khung điều phối** —
ghi tiến độ, thử lại, gọi bù trừ, báo động. Nội dung mỗi hành động bù trừ là nghiệp vụ.

Và để ý nửa sau: ứng dụng phải có **đủ thông tin** để hoàn tác. Nghĩa là lúc làm bước **tiến**, anh em đã
phải ghi lại đủ thứ cho bước **lùi**.

**3. Hạ tầng phải chịu được cả hai chiều** — chịu lỗi ở *cả* thao tác gốc *và* giao dịch bù trừ, không
làm mất thông tin cần để bù trừ, và:

> Compensating transactions run **after the original operations commit**, and other transactions might
> change intermediate states. Therefore, ensure that you can **correlate and audit both the original
> operation and its compensation end-to-end.**

**4. Khoá ngắn hạn có timeout** trên từng tài nguyên, **giành trước** rồi mới làm việc.

## Retry trước, bù trừ sau

Thứ tự này nhiều người làm ngược:

> Retry logic that treats more errors as transient can help **minimize failures that trigger a
> compensating transaction.** …**Only stop the operation and trigger compensation if the step fails
> repeatedly** or you can't recover it.

Trong ví dụ triển khai của tài liệu:

> This model uses **retries first to preserve forward progress**… **Compensation is invoked only when
> forward progress becomes impossible.** …This approach treats **compensation as a last resort** and lets
> domain rules drive recovery decisions.

## Điểm không quay lại

Đây là lời khuyên thiết kế cụ thể nhất của cả trang, và là thứ đáng mang về nhất:

> **Define clear *points of no return* and irreversible steps.** In complex workflows, **you can't safely
> or meaningfully undo some operations**, such as **external side effects or legally binding actions.**
> Identify **compensable versus irreversible** steps. **Design the workflow so that irreversible steps
> occur only after all critical validations succeed.**

Đây **không** phải mẹo code. Đây là **thứ tự các bước trong quy trình nghiệp vụ**. Gửi email cho khách,
xuất hoá đơn, ký hợp đồng — xếp chúng xuống sau, không vì kỹ thuật, mà vì **không hoàn tác được**.

## Và khi nào ĐỪNG dùng bù trừ

Mục này quan trọng ngang mục trên:

> - **Operations can be safely retried and most failures are transient.** Retry logic alone is often
>   sufficient in these cases, and **compensating transactions add unnecessary complexity.**
> - The system **can't tolerate temporary inconsistency**, or **compensation can't reliably restore a
>   valid state.** Use strong consistency mechanisms or **atomic transactions** across all steps instead.

Saga không phải câu trả lời cho mọi thứ. Có bài toán mà câu trả lời đúng vẫn là **một giao dịch trong một
database.**

## Về saga, tôi nói đúng mức tài liệu nói

> This approach is **similar to the Saga distributed transactions pattern.** …**Saga uses compensating
> transactions for failure recovery.**

Saga là mẫu quản lý nhất quán qua nhiều service, và nó **dùng** bù trừ để hồi phục khi lỗi. Tôi **không**
đi vào phân loại *orchestration* với *choreography* — trang tôi tra không có, và tôi chưa tra trang saga
riêng. Khi nào tra thì tôi viết một bài cho nó.

## Chốt bốn câu

1. **Bù trừ không phải rollback** — nó không đưa về trạng thái cũ, nó làm một việc nghiệp vụ mới; và ghi
   đè trạng thái cũ có thể xoá mất việc của người khác.
2. **Bù trừ cũng lỗi được** → phải ghi tiến độ, và mỗi bước phải **idempotent**. Idempotent là điều kiện,
   không phải hay-thì-có.
3. **Retry trước, bù trừ sau** — bù trừ là phương án cuối, không phải phản xạ đầu tiên.
4. **Xác định các điểm không quay lại**, rồi xếp chúng xuống sau mọi kiểm tra quan trọng.

## Nguồn

- [Compensating Transaction pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction)
  — Azure Architecture Center.
- [Interservice communication in microservices](https://learn.microsoft.com/en-us/azure/architecture/microservices/design/interservice-communication)
  — phần transient vs nontransient, và mẫu Scheduler Agent Supervisor.
