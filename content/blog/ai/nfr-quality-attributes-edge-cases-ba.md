---
id: 02760001-ba02-4001-a004-000000000001
title: "NFR, Quality Attributes và Edge Cases: BA viết sao cho Dev/QA test được?"
slug: nfr-quality-attributes-edge-cases-ba
excerpt: >-
  Functional requirement nói hệ thống làm gì, còn NFR nói hệ thống làm tốt đến mức nào.
  Bài này hướng dẫn BA viết NFR đo được, quality attribute scenario, edge cases và
  checklist review trước sprint.
featured_image: /images/blog/business-requirements-checklist.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T09:30:00.000000Z'
created_at: '2026-05-06T09:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: NFR, slug: nfr}, {name: Requirements, slug: requirements}, {name: QA, slug: qa}, {name: Software BA, slug: software-ba}]
comments: []
---

Functional requirement trả lời: **hệ thống làm gì?**

Non-functional requirement (NFR) trả lời: **hệ thống làm tốt đến mức nào, trong điều kiện nào?**

Nhiều dự án thất bại không phải vì thiếu chức năng, mà vì thiếu NFR:

- Feature có đủ button, nhưng quá chậm.
- Login chạy được, nhưng audit log thiếu.
- API trả đúng data, nhưng không xử lý rate limit.
- Form submit được, nhưng người dùng screen reader không dùng được.

BA không cần trở thành architect, nhưng BA phải biết hỏi và viết NFR đủ rõ.

## 1. NFR gồm những nhóm nào?

Các nhóm BA hay gặp:

| Nhóm | Câu hỏi BA cần hỏi |
|---|---|
| Performance | Nhanh cỡ nào? Với bao nhiêu user? |
| Availability | Hệ thống cần uptime bao nhiêu? |
| Reliability | Lỗi thì recover thế nào? |
| Security | Ai được quyền làm gì? |
| Privacy | Dữ liệu nào nhạy cảm? Lưu bao lâu? |
| Usability | Người dùng có hoàn thành task dễ không? |
| Accessibility | Người khuyết tật có dùng được không? |
| Scalability | Khi traffic tăng thì sao? |
| Observability | Có log/metric/alert đủ để điều tra không? |
| Maintainability | Dễ cấu hình, thay đổi rule, support không? |

## 2. Cách viết NFR đo được

Đừng viết:

> Hệ thống phải nhanh.

Hãy viết:

> Trang danh sách đơn hàng phải tải trong dưới 2 giây ở p95 với 500 concurrent users và dữ liệu 100.000 đơn hàng.

Đừng viết:

> Hệ thống phải bảo mật.

Hãy viết:

> Chỉ role Finance Manager được export báo cáo giao dịch. Mọi lần export phải ghi audit log gồm user_id, timestamp, filter, số dòng export và IP.

Template:

```text
[Đối tượng] phải [hành vi/chất lượng] trong [điều kiện] với [ngưỡng đo] và [cách kiểm chứng].
```

## 3. Quality attribute scenario

Một cách viết rất rõ:

| Thành phần | Ví dụ |
|---|---|
| Stimulus | 1.000 user truy cập đồng thời |
| Environment | Giờ cao điểm, dữ liệu 6 tháng |
| Response | Hệ thống trả trang search |
| Response measure | p95 latency < 2.5 giây, error rate < 1% |

Viết thành requirement:

```text
Khi có 1.000 user search đơn hàng đồng thời trong giờ cao điểm, hệ thống phải trả kết quả trong p95 < 2.5 giây và error rate < 1%.
```

## 4. Edge cases BA không nên bỏ qua

### Data edge cases

- Null hoặc missing field.
- Duplicate record.
- Date ở timezone khác.
- Giá trị âm trong field không được âm.
- Tên rất dài.
- Ký tự đặc biệt.

### Permission edge cases

- User chưa đăng nhập.
- User hết session.
- User có role A nhưng truy cập chức năng role B.
- Admin bị revoke quyền giữa lúc đang thao tác.

### Integration edge cases

- API timeout.
- API trả 500.
- API trả schema khác dự kiến.
- Vendor rate limit.
- Retry gây duplicate request.

### UX edge cases

- Empty state.
- Loading lâu.
- User bấm submit 2 lần.
- Upload file sai định dạng.
- Người dùng quay lại browser back.

## 5. Ví dụ đầy đủ

Feature: Upload hóa đơn.

Functional requirement:

```text
FR-001: User có thể upload hóa đơn dạng PDF hoặc ảnh để hệ thống lưu vào hồ sơ thanh toán.
```

NFR và edge cases:

```text
NFR-001 Performance:
File dưới 10MB phải upload xong trong p95 < 5 giây trên mạng 4G ổn định.

NFR-002 Security:
File upload phải được virus scan trước khi user khác có thể tải xuống.

NFR-003 Privacy:
File hóa đơn có thể chứa PII, chỉ role Finance và Owner của hồ sơ được xem.

EC-001:
Nếu user upload file > 10MB, hệ thống hiển thị lỗi "File vượt quá dung lượng 10MB" và không lưu file.

EC-002:
Nếu user bấm Submit hai lần, hệ thống chỉ tạo một record hóa đơn.

EC-003:
Nếu virus scan fail, file bị quarantine, user thấy trạng thái "Đang chờ kiểm tra bảo mật".
```

## 6. Checklist NFR cho BA

Trước khi story vào sprint:

- [ ] Performance có số đo không?
- [ ] Security có role/permission rõ không?
- [ ] Privacy có data classification không?
- [ ] Audit log cần gì?
- [ ] Error case quan trọng đã có AC chưa?
- [ ] Retry có gây duplicate không?
- [ ] Empty state đã có chưa?
- [ ] Accessibility cần tiêu chí nào?
- [ ] Monitoring/alert cần metric gì?
- [ ] QA biết cách test NFR chưa?

## 7. AI-assisted prompt để tìm edge cases

Bạn có thể dùng AI để gợi ý, nhưng phải review lại:

```text
Bạn là Senior Software BA và QA Lead.
Đây là user story và acceptance criteria:
[paste]

Hãy liệt kê:
1. Data edge cases
2. Permission edge cases
3. Integration failure cases
4. UX empty/loading/error states
5. NFR còn thiếu
6. Test scenarios đề xuất

Trả về bảng: Case, Why it matters, Suggested AC, Test approach.
```

## 8. Lỗi thường gặp

**Lỗi 1: NFR viết như slogan**

"Bảo mật cao", "dễ dùng", "nhanh" đều không test được. Hãy thêm ngưỡng, điều kiện, metric.

**Lỗi 2: Đẩy hết NFR cho architect**

Architect giúp thiết kế giải pháp, nhưng BA phải đảm bảo nhu cầu business, compliance và user expectation được nêu rõ.

**Lỗi 3: Chỉ viết happy path**

Happy path thường dễ. Phần gây production incident nằm ở edge case.

## Ví dụ NFR đầy đủ cho feature đặt lịch

| ID | Quality attribute | Requirement đo được | Cách test/verify |
|---|---|---|---|
| NFR-PERF-001 | Performance | Trang danh sách slot phải load dưới 2 giây ở p95 khi có 300 concurrent users và 10.000 slot/ngày. | Load test trước release, theo dõi p95 latency trên dashboard. |
| NFR-AVAIL-001 | Availability | Chức năng đặt lịch cần availability 99.5% trong giờ làm việc 08:00-20:00. | Monitoring uptime, incident report. |
| NFR-SEC-001 | Security | Chỉ customer sở hữu appointment mới được xem/đổi/hủy appointment đó. | Permission test, negative test với appointment_id của user khác. |
| NFR-AUDIT-001 | Auditability | Mỗi lần tạo, đổi, hủy lịch phải ghi actor, timestamp, old_status, new_status, reason. | Kiểm tra audit log trong test case. |
| NFR-ACC-001 | Accessibility | Form đặt lịch thao tác được bằng keyboard và screen reader đọc được label/error. | WCAG checklist, keyboard-only test. |
| NFR-OBS-001 | Observability | Có metric cho booking_success, slot_unavailable, notification_failed. | Dashboard có đủ metric sau staging test. |

Edge case catalog:

| Edge case | Expected behavior |
|---|---|
| Hai khách xác nhận cùng một slot trong vòng 1 giây | Chỉ một appointment được Confirmed; request còn lại nhận `SLOT_UNAVAILABLE`. |
| Customer đổi lịch khi còn đúng 4 giờ | Nếu policy là "ít nhất 4 giờ", hệ thống cho phép tại mốc >= 4 giờ. |
| Email service lỗi | Appointment vẫn Confirmed, notification retry 3 lần và tạo alert nếu fail. |
| Consultant bị inactive sau khi khách đang xem slot | Submit bị chặn, hiển thị consultant không còn khả dụng. |
| User mở link hủy lịch đã hết hạn | Hệ thống hiển thị hướng dẫn gọi hotline, không hủy tự động. |

## Nguồn tham khảo

- IEEE/ISO/IEC 29148-2018: https://standards.ieee.org/ieee/29148/6937/
- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/

## Kết luận

NFR và edge cases là nơi Software BA tạo khác biệt. Một story có thể nhìn nhỏ, nhưng nếu thiếu performance, security, privacy, error handling và observability, nó có thể tạo rework rất lớn sau release. BA giỏi giúp team thấy rủi ro đó trước khi code bắt đầu.
