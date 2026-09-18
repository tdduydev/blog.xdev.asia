---
id: 02760001-ba02-4001-a005-000000000001
title: "Requirements Traceability Matrix cho BA: RTM là gì và làm mẫu thế nào?"
slug: requirements-traceability-matrix-ba
excerpt: >-
  RTM giúp BA trace từ business objective đến requirement, user story, test case và release.
  Bài này hướng dẫn tạo RTM tối giản nhưng dùng được trong Agile, Waterfall và dự án
  có compliance.
featured_image: /images/blog/business-requirements-checklist.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-05-06T09:40:00.000000Z'
created_at: '2026-05-06T09:40:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Traceability, slug: traceability}, {name: Requirements, slug: requirements}, {name: QA, slug: qa}]
comments: []
---

RTM (Requirements Traceability Matrix) là bảng giúp BA trả lời 4 câu hỏi:

1. Requirement này đến từ mục tiêu kinh doanh nào?
2. Requirement này đã được chuyển thành story/spec nào?
3. Requirement này đã có test case kiểm chứng chưa?
4. Requirement này đã release chưa?

Nếu dự án nhỏ, RTM có thể là một sheet đơn giản. Nếu dự án lớn, RTM có thể nằm trong Jira, Azure DevOps, TestRail hoặc requirement management tool. Điểm quan trọng không phải tool, mà là **khả năng trace**.

## 1. Khi nào cần RTM?

Bạn nên có RTM khi:

- Có nhiều stakeholder.
- Requirement thay đổi nhiều.
- Dự án có compliance.
- Vendor hoặc nhiều team cùng build.
- BA cần chứng minh coverage với QA/UAT.
- Có nhiều version release.

Không cần làm RTM quá nặng cho mọi feature nhỏ. Nhưng với feature quan trọng, RTM giúp tránh sót requirement và tránh build thứ không còn value.

## 2. RTM tối giản gồm gì?

Template đơn giản:

| Field | Ý nghĩa |
|---|---|
| Business Objective ID | Mục tiêu kinh doanh |
| Requirement ID | Mã requirement |
| Requirement Description | Mô tả requirement |
| Source | Stakeholder, policy, meeting, document |
| Priority | Must/Should/Could hoặc MoSCoW |
| User Story / Spec | Link ticket hoặc SRS section |
| Test Case | Link test case |
| Status | Draft/Approved/In Dev/Tested/Released |
| Change Request | Link CR nếu có thay đổi |
| Owner | Người chịu trách nhiệm |

## 3. Ví dụ RTM

Feature: Đặt lịch tư vấn online.

| Objective | Req ID | Requirement | Source | Story | Test | Status |
|---|---|---|---|---|---|---|
| OBJ-01 Giảm hotline 30% | BR-001 | Khách tự đặt lịch online | Workshop CSKH | US-101 | TC-101 | Released |
| OBJ-01 | SR-001 | Hiển thị slot trống theo dịch vụ/ngày | SRS v1.0 | US-102 | TC-102 | Tested |
| OBJ-02 Giảm no-show | SR-002 | Gửi nhắc lịch trước 24h | Operation policy | US-110 | TC-110 | In Dev |
| OBJ-03 Compliance | NFR-003 | Audit log khi admin đổi lịch | Compliance review | US-120 | TC-120 | Approved |

Chỉ nhìn bảng này, bạn biết requirement nào đã có test, requirement nào còn đang dev, requirement nào trace tới compliance.

## 4. Trace forward và trace backward

### Forward trace

Từ business objective đi xuống:

```text
Objective -> Business Requirement -> System Requirement -> User Story -> Test Case -> Release
```

Dùng để hỏi: "Mục tiêu này đã được cover bởi những requirement nào?"

### Backward trace

Từ ticket hoặc test case đi ngược lên:

```text
Bug/Test/Story -> Requirement -> Objective
```

Dùng để hỏi: "Tại sao chúng ta build cái này?"

Nếu một story không trace được lên objective nào, có thể story đó là scope creep.

## 5. RTM trong Agile có cần không?

Có, nhưng nên nhẹ.

Trong Agile, bạn không nhất thiết tạo một file RTM formal dài. Bạn có thể trace bằng:

- Epic link.
- Jira issue link.
- Label.
- Requirement ID trong description.
- Test case link.
- Confluence spec page.

Ví dụ trong Jira story:

```markdown
Business Objective: OBJ-01
Requirement: SR-001
SRS: Booking SRS v1.2, section 3.1
Test Cases: TC-101, TC-102
UAT Scenario: UAT-05
```

## 6. Change control với RTM

Khi requirement thay đổi:

1. Tạo Change Request ID.
2. Ghi lý do thay đổi.
3. Đánh giá impact: story, test case, API, data, training, release.
4. Update RTM.
5. Xin approval nếu requirement đã baseline.

Ví dụ:

```text
CR-014: Cho phép khách hủy lịch trước 2h thay vì 4h.

Impact:
- BRULE-003 thay đổi.
- US-115 cần update.
- TC-115 cần update expected result.
- Email template hủy lịch cần update.
- Training CSKH cần cập nhật.
```

## 7. Checklist RTM

- [ ] Mỗi requirement có ID duy nhất.
- [ ] Mỗi requirement có source.
- [ ] Mỗi requirement có priority.
- [ ] Requirement quan trọng có test case.
- [ ] Requirement đã baseline có change history.
- [ ] Story/ticket trace ngược lên requirement.
- [ ] Test case trace ngược lên acceptance criteria.
- [ ] Release note trace được những requirement đã ship.
- [ ] Out-of-scope item được ghi riêng.

## 8. Lỗi thường gặp

**Lỗi 1: RTM quá chi tiết đến mức không ai cập nhật**

RTM tốt là RTM được dùng. Nếu team không cập nhật nổi 30 cột, hãy cắt xuống 8-10 cột quan trọng nhất.

**Lỗi 2: Không có source**

Requirement không có source rất nguy hiểm. Khi tranh luận xảy ra, BA không biết quay lại hỏi ai.

**Lỗi 3: Chỉ trace requirement đến story, không trace đến test**

Nếu không trace đến test, bạn chưa chứng minh được requirement đã được kiểm chứng.

## Ví dụ RTM đầy đủ hơn cho đặt lịch

| Req ID | Requirement | Rule | Design/API | Test case | UAT scenario | Status |
|---|---|---|---|---|---|---|
| REQ-001 | Khách xem slot còn trống trong 14 ngày tới. | BR-001 | `GET /consultants/{id}/slots` | TC-001 | UAT-001 | Approved |
| REQ-002 | Khách đặt slot còn trống. | BR-002 | `POST /appointments` | TC-002, TC-003 | UAT-002 | Approved |
| REQ-003 | Slot đã Confirmed không hiển thị cho khách khác. | BR-003 | Slot locking design | TC-004 | UAT-003 | Approved |
| REQ-004 | Khách đổi lịch trước giờ hẹn ít nhất 4 giờ. | BR-004 | `PATCH /appointments/{id}/reschedule` | TC-005, TC-006 | UAT-004 | In Review |
| REQ-005 | Khách hủy lịch trước giờ hẹn ít nhất 4 giờ. | BR-005 | `PATCH /appointments/{id}/cancel` | TC-007 | UAT-005 | In Review |
| REQ-006 | Hệ thống gửi email xác nhận sau khi đặt lịch. | BR-006 | Notification service | TC-008 | UAT-006 | Approved |
| REQ-007 | Consultant xem lịch hẹn theo ngày. | BR-007 | Consultant calendar page | TC-009 | UAT-007 | Draft |

Ví dụ change request:

> CR-014: Business muốn đổi rule reschedule từ 4 giờ xuống 2 giờ.

Impact từ RTM:

- `REQ-004` cần update.
- `BR-004` đổi threshold.
- API validation đổi ở `PATCH /appointments/{id}/reschedule`.
- `TC-005`, `TC-006`, `UAT-004` cần update expected result.
- UI copy trong message lỗi cần đổi từ "4 giờ" sang "2 giờ".
- SOP của CSKH cần cập nhật vì khách gọi dưới 2 giờ mới được hỗ trợ thủ công.

Đây là lý do RTM nên sống cùng backlog, không phải file làm cho có rồi bỏ quên.

## Bài tập thực hành

Chọn một feature có 5 user stories. Tạo RTM với các cột:

- Objective
- Requirement ID
- Requirement
- Source
- Story
- Acceptance Criteria
- Test Case
- Status

Sau đó tự kiểm tra: có story nào không trace lên objective không? Có requirement nào chưa có test case không?

## Nguồn tham khảo

- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/
- PMI Business Analysis for Practitioners: https://www.pmi.org/shop/p-/book/business-analysis-for-practitioners-a-practice-guide/00101570601
- IEEE/ISO/IEC 29148-2018: https://standards.ieee.org/ieee/29148/6937/

## Kết luận

RTM không phải giấy tờ hành chính. Nó là hệ thống định vị cho requirement. Khi scope thay đổi, release gần đến, defect xuất hiện hoặc stakeholder hỏi "tại sao build cái này", RTM giúp BA trả lời bằng bằng chứng thay vì trí nhớ.
