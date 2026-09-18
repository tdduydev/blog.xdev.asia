---
id: 02760001-ba02-4001-a007-000000000001
title: 'Security, Privacy & Compliance Requirements for BA'
slug: security-privacy-compliance-requirements-ba
excerpt: >-
  BAs do not need to be a security engineer, but must know how to write
  requirements about authentication, authorization, audit log, data masking,
  consent, retention, PII/PHI/PCI and compliance to avoid missing the spec.
featured_image: /images/blog/responsible-ai-requirements.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T10:00:00.000000Z'
created_at: '2026-05-06T10:00:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9616-cat1-7001-a001-000000000001
  name: AI
  slug: ai
tags:
  - name: BA
    slug: ba
  - name: Security
    slug: security
  - name: Privacy
    slug: privacy
  - name: Compliance
    slug: compliance
  - name: Requirements
    slug: requirements
comments: []
locale: en
---
Many BAs think security/privacy is the job of the Tech Lead or Security team. Yes, they design and test extensively. But if the original requirement does not clearly state what data is sensitive, who can view it, who can export it, how long it will be saved, and what audits will be performed, then the technical team will easily build a flawed structure.

BAs do not need to know pentesting, but need to know how to ask the right questions and write requirements clearly enough.

## 1. What do BAs need to pay attention to?

Main requirement groups:

| Group | BA needs clarification |
|---|---|
| Authentication | How do users log in? SSO/MFA? |
| Authorization | Which role can do what? |
| Data classification | What data is PII/PHI/payment/confidential? |
| Privacy | Consent, retention, deletion, masking |
| Audit | Log what action, how long to keep? |
| Compliance | GDPR, PDPA, HIPAA, PCI-DSS or internal policy |
| Incident | How to escalate when there is a leak/wrong permissions? |

## 2. Authentication vs Authorization

Authentication replies: **who are you?**

Authorization answers: **what can you do?**

Example requirements:

```text
AUTHN-001:
User nội bộ phải đăng nhập bằng SSO công ty. Nếu user truy cập từ thiết bị mới, hệ thống yêu cầu MFA.

AUTHZ-001:
Chỉ role Finance Manager được approve refund trên 50 triệu VND.
```

Don't write in general terms:

> The system must be decentralized.

Let's write it in RBAC matrix.

## 3. RBAC matrix sample

| Role | View customers | Edit customer | Export customers | Delete customer |
|---|---:|---:|---:|---:|
| Support Agent | Yes, masked | No | No | No |
| Support Manager | Yes | Yes | No | No |
| Compliance Officer | Yes | No | Yes | No |
| Admin | Yes | Yes | Yes | Yes, with approval |

Requirement from table:

```text
AUTHZ-004:
Support Agent chỉ được xem email và số điện thoại ở dạng masked, ví dụ du***@mail.com và 090***123.
```

## 4. Data classification

BA should classify data right in SRS:

| Type | Example | How to handle |
|---|---|---|
| Public | Product name, FAQ | Can display wide |
| Internal | Operational report | Internal only |
| Confidential | Contract price, margin | Permission Restriction |
| PII | Email, phone number, CCCD | Masking, consent, retention |
| PHI | Health records | Strict regulations |
| Payment | Card data, transactions | PCI-DSS, tokenization |

Without classification, Dev/QA does not know which data needs to be masked, which logs should not record raw values, and which exports need approval.

## 5. Privacy requirements BA is forgetful

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

## 6. Audit log requirements

A good audit log should answer:

- Who did it?
- Doing what?
- When?
- From where?
- What is before/after data?
- What is the reason if the operation is sensitive?

For example:

```text
AUD-001:
Khi user export danh sách khách hàng, hệ thống phải ghi audit log gồm user_id, role, timestamp, IP, filter sử dụng, số dòng export và file_id.
```

Note: audit log should not record raw passwords, tokens, full card numbers or unnecessary sensitive data.

## 7. Compliance in requirements

BA is not a lawyer, but BA needs to bring compliance owner in at the right time.

Checklist:

- [ ] Which country/region does the data belong to?
- [ ] Is there child, health, financial, payment data?
- [ ] Does a vendor/third-party process the data?
- [ ] Is there cross-border transfer?
- [ ] Is there a request to delete data?
- [ ] Is there mandatory audit/reporting?
- [ ] Are there any internal policies that need to be followed?

## 8. Security acceptance criteria

Story example:

> As a Support Manager, I want to view customer profile so that I can resolve escalated tickets.

AC should have:

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

## 9. Common errors

**Error 1: Only write "according to authorization"**

Decentralization must have a matrix. Otherwise, everyone understands it differently.

**Error 2: Forgot to export**

Many screensaver systems look great but export CSV too widely.

**Error 3: Logging too much sensitive data**

Audit is necessary, but logging raw PII/token/password is a big risk.

**Error 4: Privacy later**

Leaving privacy behind often leads to costly changes to the data model, UI, consent flow and job retention.

## Security/privacy example for scheduling

Access matrix:

| Role | View calendar | Create calendar | Change/cancel schedule | View phone number | Export |
|---|---|---|---|---|---|
| Customers | Just my calendar | Yes | Just my calendar according to the cutoff rule | Mine | No |
| Consulting | Schedule assigned | No | No | Masked | No |
| Customer care | Customer Calendar | There is a change of guests | Yes as per SOP | Full if there is a reason to support | No |
| Sales Manager | Team dashboard | No | No | Masked | Yes, need audit |
| Admin | Full | Yes | Yes | Full | Yes, approval required |

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

| ID | Requirements |
|---|---|
| PRIV-001 | The booking form only collects full name, email, phone number and optional consultation reason. |
| PRIV-002 | Reasons why consultants should not request sensitive information if it is not needed for the service. |
| PRIV-003 | Appointment data is kept for 7 years according to internal policy, then anonymized if there is no legal obligation. |
| PRIV-004 | Email/SMS reminder does not contain sensitive information, only contains time, consultant and calendar management link. |
| AUD-001 | Every export of appointment data must record user_id, role, timestamp, filter, line number, reason. |

The BA should include this section in the SRS or security requirement section, without leaving the Dev wondering "which role can see what".

## Reference source

- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/
- IEEE/ISO/IEC 29148-2018: https://standards.ieee.org/ieee/29148/6937/

## Conclusion

Security, privacy and compliance are not part of requirements. With digital products, it's part of the quality. Good BAs don't consider themselves security experts, but know how to ask questions early, write clear requirements, and involve the right people in the review before the sprint begins.
