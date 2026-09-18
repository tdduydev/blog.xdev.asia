---
id: 02760001-ba02-4001-a007-000000000001
title: "Security, Privacy & Compliance Requirements cho BA"
slug: security-privacy-compliance-requirements-ba
excerpt: >-
  BA không cần làm security engineer, nhưng phải biết viết requirement về authentication,
  authorization, audit log, data masking, consent, retention, PII/PHI/PCI và compliance
  để tránh thiếu ngay từ spec.
featured_image: /images/blog/responsible-ai-requirements.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T10:00:00.000000Z'
created_at: '2026-05-06T10:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Security, slug: security}, {name: Privacy, slug: privacy}, {name: Compliance, slug: compliance}, {name: Requirements, slug: requirements}]
comments: []
---

Nhiều BA nghĩ security/privacy là việc của Tech Lead hoặc Security team. Đúng, họ thiết kế và kiểm tra chuyên sâu. Nhưng nếu requirement ban đầu không nói rõ dữ liệu nào nhạy cảm, ai được xem, ai được export, lưu bao lâu, audit gì, thì team kỹ thuật rất dễ build thiếu.

BA không cần biết pentest, nhưng cần biết hỏi đúng câu hỏi và viết requirement đủ rõ.

## 1. BA cần quan tâm gì?

Các nhóm requirement chính:

| Nhóm | BA cần làm rõ |
|---|---|
| Authentication | Người dùng đăng nhập bằng gì? SSO/MFA? |
| Authorization | Role nào được làm gì? |
| Data classification | Dữ liệu nào là PII/PHI/payment/confidential? |
| Privacy | Consent, retention, deletion, masking |
| Audit | Log hành động nào, giữ bao lâu? |
| Compliance | GDPR, PDPA, HIPAA, PCI-DSS hoặc policy nội bộ |
| Incident | Khi leak/sai quyền thì escalation thế nào? |

## 2. Authentication vs Authorization

Authentication trả lời: **bạn là ai?**

Authorization trả lời: **bạn được làm gì?**

Ví dụ requirement:

```text
AUTHN-001:
User nội bộ phải đăng nhập bằng SSO công ty. Nếu user truy cập từ thiết bị mới, hệ thống yêu cầu MFA.

AUTHZ-001:
Chỉ role Finance Manager được approve refund trên 50 triệu VND.
```

Đừng viết chung chung:

> Hệ thống phải có phân quyền.

Hãy viết bằng RBAC matrix.

## 3. RBAC matrix mẫu

| Role | View customer | Edit customer | Export customer | Delete customer |
|---|---:|---:|---:|---:|
| Support Agent | Yes, masked | No | No | No |
| Support Manager | Yes | Yes | No | No |
| Compliance Officer | Yes | No | Yes | No |
| Admin | Yes | Yes | Yes | Yes, with approval |

Requirement từ bảng:

```text
AUTHZ-004:
Support Agent chỉ được xem email và số điện thoại ở dạng masked, ví dụ du***@mail.com và 090***123.
```

## 4. Data classification

BA nên phân loại dữ liệu ngay trong SRS:

| Loại | Ví dụ | Cách xử lý |
|---|---|---|
| Public | Tên sản phẩm, FAQ | Có thể hiển thị rộng |
| Internal | Báo cáo vận hành | Chỉ nội bộ |
| Confidential | Giá hợp đồng, margin | Hạn chế quyền |
| PII | Email, số điện thoại, CCCD | Masking, consent, retention |
| PHI | Hồ sơ sức khỏe | Quy định nghiêm ngặt |
| Payment | Card data, transaction | PCI-DSS, tokenization |

Nếu không phân loại, Dev/QA không biết dữ liệu nào cần mask, log nào không được ghi raw value, export nào cần approval.

## 5. Privacy requirements BA hay quên

### Consent

```text
PRIV-001:
Trước khi dùng email khách hàng cho marketing, hệ thống phải ghi nhận explicit consent gồm user_id, timestamp, consent_version và channel.
```

### Retention

```text
PRIV-002:
Chat transcript chứa PII chỉ được lưu tối đa 180 ngày, sau đó phải anonymize hoặc xóa theo policy.
```

### Deletion request

```text
PRIV-003:
Khi khách gửi yêu cầu xóa dữ liệu, hệ thống tạo ticket DSAR và hoàn tất trong SLA 30 ngày nếu không có ràng buộc pháp lý giữ lại.
```

### Data minimization

```text
PRIV-004:
Form đặt lịch không được yêu cầu CCCD nếu quy trình chỉ cần tên, số điện thoại và email.
```

## 6. Audit log requirement

Audit log tốt cần trả lời:

- Ai làm?
- Làm gì?
- Khi nào?
- Từ đâu?
- Dữ liệu trước/sau là gì?
- Lý do là gì nếu thao tác nhạy cảm?

Ví dụ:

```text
AUD-001:
Khi user export danh sách khách hàng, hệ thống phải ghi audit log gồm user_id, role, timestamp, IP, filter sử dụng, số dòng export và file_id.
```

Lưu ý: audit log không nên ghi raw password, token, full card number hoặc dữ liệu nhạy cảm không cần thiết.

## 7. Compliance trong requirement

BA không phải luật sư, nhưng BA cần đưa compliance owner vào đúng lúc.

Checklist:

- [ ] Dữ liệu thuộc quốc gia/khu vực nào?
- [ ] Có dữ liệu trẻ em, sức khỏe, tài chính, payment không?
- [ ] Có vendor/third-party xử lý dữ liệu không?
- [ ] Có cross-border transfer không?
- [ ] Có yêu cầu xóa dữ liệu không?
- [ ] Có audit/reporting bắt buộc không?
- [ ] Có policy nội bộ nào cần tuân thủ không?

## 8. Security acceptance criteria

Ví dụ story:

> As a Support Manager, I want to view customer profile so that I can resolve escalated tickets.

AC nên có:

```gherkin
Scenario: Support Manager xem hồ sơ
Given user có role Support Manager
When user mở hồ sơ khách hàng
Then hệ thống hiển thị thông tin đầy đủ theo quyền
And ghi audit log hành động view_profile

Scenario: Support Agent xem hồ sơ
Given user có role Support Agent
When user mở hồ sơ khách hàng
Then email và số điện thoại được masked
And nút Export không hiển thị

Scenario: User không có quyền
Given user không thuộc team Support
When user truy cập URL hồ sơ khách hàng
Then hệ thống trả 403 và ghi security event
```

## 9. Lỗi thường gặp

**Lỗi 1: Chỉ ghi "theo phân quyền"**

Phân quyền phải có matrix. Nếu không, mỗi người hiểu một kiểu.

**Lỗi 2: Quên export**

Nhiều hệ thống bảo vệ màn hình xem rất tốt nhưng lại cho export CSV quá rộng.

**Lỗi 3: Log quá nhiều dữ liệu nhạy cảm**

Audit là cần thiết, nhưng log raw PII/token/password là rủi ro lớn.

**Lỗi 4: Privacy để sau**

Privacy để sau thường dẫn đến sửa data model, UI, consent flow và retention job rất tốn kém.

## Ví dụ security/privacy cho đặt lịch

Access matrix:

| Role | Xem lịch | Tạo lịch | Đổi/hủy lịch | Xem số điện thoại | Export |
|---|---|---|---|---|---|
| Customer | Chỉ lịch của mình | Có | Chỉ lịch của mình theo rule cutoff | Của mình | Không |
| Consultant | Lịch được assign | Không | Không | Masked | Không |
| CSKH | Lịch khách hàng | Có thay khách | Có theo SOP | Full nếu có lý do support | Không |
| Sales Manager | Team dashboard | Không | Không | Masked | Có, cần audit |
| Admin | Full | Có | Có | Full | Có, cần approval |

Security acceptance criteria:

```gherkin
Scenario: Customer tries to view another customer's appointment
  Given customer A is logged in
  When customer A opens /appointments/APT-of-customer-B
  Then the system returns 403
  And no appointment details are displayed
  And a security event is logged
```

Privacy requirements:

| ID | Requirement |
|---|---|
| PRIV-001 | Form đặt lịch chỉ thu thập họ tên, email, số điện thoại và lý do tư vấn tùy chọn. |
| PRIV-002 | Lý do tư vấn không được yêu cầu thông tin nhạy cảm nếu không cần cho dịch vụ. |
| PRIV-003 | Appointment data được giữ 7 năm theo policy nội bộ, sau đó anonymize nếu không còn nghĩa vụ pháp lý. |
| PRIV-004 | Email/SMS reminder không chứa thông tin nhạy cảm, chỉ chứa thời gian, consultant và link quản lý lịch. |
| AUD-001 | Mọi lần export dữ liệu lịch hẹn phải ghi user_id, role, timestamp, filter, số dòng, reason. |

BA nên đưa phần này vào SRS hoặc security requirement section, không để Dev tự hỏi "role nào xem được gì".

## Nguồn tham khảo

- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/
- IEEE/ISO/IEC 29148-2018: https://standards.ieee.org/ieee/29148/6937/

## Kết luận

Security, privacy và compliance không phải phần phụ của requirement. Với sản phẩm số, đó là một phần của chất lượng. BA giỏi không tự nhận mình là chuyên gia bảo mật, nhưng biết đặt câu hỏi sớm, viết requirement rõ và kéo đúng người vào review trước khi sprint bắt đầu.
