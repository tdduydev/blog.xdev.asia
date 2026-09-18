---
id: 02760001-ba01-4001-a021-000000000001
title: "Business Requirements Checklist cho BA"
slug: business-requirements-checklist-ba
excerpt: >-
  Một checklist requirements tốt giúp BA tránh sót thông tin quan trọng trước khi handoff
  sang dev team. Bài viết này tổng hợp checklist đầy đủ cho BA làm dự án AI, từ business
  context, functional requirements đến các AI-specific constraints.
featured_image: /images/blog/business-requirements-checklist.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-05-05T09:00:00.000000Z'
created_at: '2026-05-05T09:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Requirements, slug: requirements}, {name: Checklist, slug: checklist}, {name: Business Analysis, slug: business-analysis}]
comments: []
---

Một trong những nguyên nhân phổ biến nhất khiến dự án trượt hướng là **requirements không đầy đủ**. Vấn đề không hẳn vì BA không hỏi kỹ, mà vì không có một khung kiểm tra nhất quán để đảm bảo mọi góc nhìn quan trọng đều được cover. Business Requirements Checklist là cách đơn giản nhưng rất hiệu quả để giảm rủi ro đó.

## Vì sao BA cần checklist?

- **Cognitive load cao**: BA phải xử lý nhiều đầu việc cùng lúc, nên rất dễ sót chi tiết.
- **Consistency**: mọi initiative được review theo cùng một chuẩn.
- **Handoff quality tốt hơn**: dev team nhận requirements rõ hơn, ít rework hơn.
- **Audit trail**: có bằng chứng rằng requirements đã được review đủ kỹ.

## Phần 1: Business Context

### ✅ Problem Definition

- [ ] Problem statement được viết rõ: What, Who, When, Impact
- [ ] Root cause đã được phân tích, không chỉ dừng ở symptoms
- [ ] Business objectives liên kết với goals của tổ chức
- [ ] Success metrics được định nghĩa theo hướng đo được
- [ ] Scope boundaries rõ in-scope và out-of-scope

### ✅ Stakeholder Analysis

- [ ] Đã identify đủ stakeholders: primary, secondary, decision makers
- [ ] Có RACI matrix
- [ ] Pain points và concerns của từng stakeholder group đã được ghi nhận
- [ ] Có communication plan tương ứng
- [ ] Sign-off authority được xác định rõ

### ✅ Assumptions & Constraints

- [ ] Các giả định nghiệp vụ đã được ghi lại
- [ ] Technical constraints được document
- [ ] Regulatory / compliance constraints đã được kiểm tra
- [ ] Budget và timeline constraints rõ ràng
- [ ] Resource constraints như team size, skill gaps đã được làm rõ

## Phần 2: Functional Requirements

### ✅ User Stories & Use Cases

- [ ] Mỗi user story đều có As a / I want / So that
- [ ] Acceptance criteria đạt chuẩn INVEST
- [ ] Happy path đã được mô tả đầy đủ
- [ ] Alternative flows được cover
- [ ] Exception flows được định nghĩa

### ✅ Business Rules

- [ ] Tất cả business rules đều được viết rõ, không để implicit
- [ ] Conditional logic được diễn đạt rõ ràng
- [ ] Edge cases đã được cân nhắc
- [ ] Conflicts giữa các business rules đã được xử lý
- [ ] Rules đã trace được về compliance hoặc policy nếu có

### ✅ Data Requirements

- [ ] Input data được mô tả rõ source, format, frequency
- [ ] Output data được mô tả rõ destination, format, timing
- [ ] Data validation rules đã được xác định
- [ ] Data volume và peak load đã được ước lượng
- [ ] Data retention policy đã được thống nhất

## Phần 3: Non-Functional Requirements

### ✅ Performance

- [ ] Đã có target cho response time như p50, p95, p99
- [ ] Throughput requirements rõ ràng
- [ ] Concurrent users estimate hợp lý
- [ ] Peak scenarios được document

### ✅ Security & Compliance

- [ ] Authentication requirements: SSO, MFA...
- [ ] Authorization model: RBAC, ABAC...
- [ ] Data classification: public, internal, sensitive, PII...
- [ ] Compliance obligations: GDPR, HIPAA hoặc local rules
- [ ] Audit logging requirements
- [ ] Encryption at rest và in transit

### ✅ Usability

- [ ] Target personas đã rõ
- [ ] Accessibility requirements được xác định
- [ ] Supported devices và browsers được thống nhất
- [ ] Language / localization requirements được cover
- [ ] Onboarding và help docs needs đã được cân nhắc

### ✅ Reliability & Availability

- [ ] SLA requirements
- [ ] RTO / RPO nếu có
- [ ] Disaster recovery expectations
- [ ] Maintenance window constraints

## Phần 4: AI-Specific Requirements

Đây là phần checklist BA rất hay bỏ sót trong dự án AI.

### ✅ AI Model Behavior

- [ ] Expected outputs được định nghĩa rõ về format, type, range
- [ ] Confidence threshold đã được chỉ rõ
- [ ] Fallback behavior khi model không chắc chắn đã có
- [ ] Cách xử lý edge cases và out-of-distribution inputs đã được nêu
- [ ] Acceptable error rate đã được stakeholders đồng ý

### ✅ Human-in-the-Loop

- [ ] Escalation triggers rõ ràng
- [ ] Human review workflow đã được mô tả
- [ ] Có override mechanism cho human
- [ ] Có audit trail cho AI decisions
- [ ] Nếu có continuous learning, feedback / labeling flow đã được tính đến

### ✅ AI Fairness & Ethics

- [ ] Đã identify nhóm người bị ảnh hưởng bởi AI decision
- [ ] Có fairness metrics phù hợp
- [ ] Có plan kiểm tra bias
- [ ] Explainability requirement được làm rõ
- [ ] Có impact assessment cho các decision ảnh hưởng trực tiếp đến con người

### ✅ Data & Model Quality

- [ ] Training data requirements rõ về volume, freshness, quality
- [ ] Minimum performance metrics được stakeholders chấp thuận
- [ ] Có monitoring cho model drift
- [ ] Retraining triggers được định nghĩa
- [ ] Có versioning requirements cho data và model

### ✅ AI-Specific Non-Functional

- [ ] Inference latency đã được xác định
- [ ] Constraints cho serving infrastructure đã rõ
- [ ] Cost per inference và budget đã được tính
- [ ] Rollback strategy cho model versions đã có

## Phần 5: Process & Handoff

### ✅ Dependencies

- [ ] External system dependencies được map đầy đủ
- [ ] API integrations có endpoint, contract, SLA tương ứng
- [ ] Third-party vendors/services đã được identify
- [ ] Team dependencies với squad khác hoặc infra team đã rõ
- [ ] Data pipeline dependencies được document

### ✅ Testing Requirements

- [ ] UAT scenarios được viết từ góc nhìn business
- [ ] Test data requirements được xác định
- [ ] Performance testing scenarios rõ ràng
- [ ] AI testing criteria như accuracy, precision, recall đã được định nghĩa
- [ ] Regression scope đã được agree

### ✅ Documentation & Traceability

- [ ] Requirements có unique IDs
- [ ] Có traceability matrix từ business req -> system req -> test case
- [ ] Glossary cho domain terms được duy trì
- [ ] Change log đã được thiết lập
- [ ] Key stakeholders đã sign-off

## Mini template cho sign-off

```text
REQUIREMENTS REVIEW SIGN-OFF
Sprint: ___________
Feature: ___________
BA: ___________
Date: ___________

✅ Functional requirements complete & approved
✅ Acceptance criteria testable & agreed
✅ Non-functional requirements defined
✅ AI-specific requirements reviewed (nếu applicable)
✅ Dependencies identified & communicated
✅ Out-of-scope items documented

Stakeholder Sign-off:
Product Owner: ___________  Date: ___
Tech Lead: ___________      Date: ___
QA Lead: ___________        Date: ___
```

## Cách dùng checklist hiệu quả

1. **Không cần tick tất cả bằng mọi giá**. Mục nào không áp dụng thì ghi N/A và nêu lý do.
2. **Dùng như conversation guide**, không phải form máy móc.
3. **Tùy chỉnh theo context**. Startup sprint và enterprise compliance project là hai bài toán khác nhau.
4. **Review cùng team**. BA không nên checklist một mình; nên review cùng PO, Tech Lead, QA.
5. **Lưu tập trung** trên Confluence / Notion để team tái sử dụng và cải tiến dần.

## Kết luận

Checklist không phải bureaucracy. Nó là một **quality tool** giúp BA bàn giao requirements ít lỗi hơn, ít rework hơn và nhất quán hơn. Trong dự án AI, phần AI-specific checklist gần như là bắt buộc vì đây vẫn là vùng nhiều team còn mới.

Hãy bắt đầu bằng checklist ngắn nhưng dùng được thường xuyên. Checklist tốt nhất không phải checklist dài nhất, mà là checklist mà team thực sự dùng.---
id: 02760001-ba01-4001-a021-000000000001
title: "Business Requirements Checklist: Danh sách kiểm tra yêu cầu nghiệp vụ cho BA"
slug: business-requirements-checklist-ba
excerpt: >-
  Checklist yêu cầu nghiệp vụ giúp BA đảm bảo không bỏ sót điều kiện quan trọng
  trước khi bàn giao cho dev team. Bài này cung cấp checklist đầy đủ cho BA làm việc
  trong dự án AI — từ functional requirements đến AI-specific constraints.
featured_image: /images/blog/business-requirements-checklist.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-05-05T09:00:00.000000Z'
created_at: '2026-05-05T09:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Requirements, slug: requirements}, {name: Checklist, slug: checklist}, {name: Business Analysis, slug: business-analysis}]
comments: []
---

Một trong những lý do phổ biến nhất khiến dự án thất bại là **requirements không đầy đủ** — không phải vì BA không hỏi, mà vì không có một framework nhất quán để đảm bảo mọi góc độ đều được cover. Checklist yêu cầu nghiệp vụ giải quyết vấn đề này.

## Tại sao cần Checklist?

- **Cognitive load**: BA phải juggle nhiều thứ cùng lúc → dễ bỏ sót
- **Consistency**: Đảm bảo mọi project đều được phân tích với cùng tiêu chuẩn
- **Handoff quality**: Dev team nhận requirements đầy đủ → ít interruptions, ít rework
- **Audit trail**: Có bằng chứng requirements đã được review kỹ

## Checklist Phần 1: Business Context

### ✅ Problem Definition
- [ ] Problem statement được viết rõ ràng (What, Who, When, Impact)
- [ ] Root cause đã được phân tích (không chỉ treat symptoms)
- [ ] Business objectives được liên kết với organizational goals
- [ ] Success metrics được định nghĩa và đo lường được (SMART)
- [ ] Scope boundaries rõ ràng — in-scope và out-of-scope

### ✅ Stakeholder Analysis
- [ ] Tất cả stakeholders đã được identify (primary, secondary, key decision makers)
- [ ] RACI matrix đã được tạo
- [ ] Stakeholder concerns và pain points đã được ghi nhận
- [ ] Communication plan cho từng nhóm stakeholder
- [ ] Sign-off authority đã được xác định rõ

### ✅ Assumptions & Constraints
- [ ] Tất cả business assumptions được ghi lại
- [ ] Technical constraints đã được document
- [ ] Regulatory/compliance constraints đã được check
- [ ] Budget và timeline constraints
- [ ] Resource constraints (team size, skills available)

## Checklist Phần 2: Functional Requirements

### ✅ User Stories & Use Cases
- [ ] Mỗi user story có đủ: Who (As a...) + What (I want...) + Why (So that...)
- [ ] Acceptance criteria viết theo chuẩn INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable)
- [ ] Happy path được document đầy đủ
- [ ] Alternative flows (alternative paths) được cover
- [ ] Exception flows (error scenarios) được define

### ✅ Business Rules
- [ ] Tất cả business rules được viết ra tường minh (không implicit)
- [ ] Conditional logic được diễn đạt rõ ràng (if-then-else)
- [ ] Edge cases đã được consider
- [ ] Conflict giữa các business rules đã được resolve
- [ ] Business rules được trace tới regulatory requirements (nếu có)

### ✅ Data Requirements
- [ ] Input data được định nghĩa (source, format, frequency)
- [ ] Output data được định nghĩa (destination, format, timing)
- [ ] Data validation rules được specify
- [ ] Data volume và peak load đã được estimate
- [ ] Data retention policy được xác định

## Checklist Phần 3: Non-Functional Requirements

### ✅ Performance
- [ ] Response time expectations được define (p50, p95, p99)
- [ ] Throughput requirements (requests/second, transactions/day)
- [ ] Concurrent users estimate
- [ ] Peak load scenarios được document

### ✅ Security & Compliance
- [ ] Authentication requirements (SSO, MFA, etc.)
- [ ] Authorization model (RBAC, ABAC)
- [ ] Data classification (PII, sensitive, public)
- [ ] Compliance requirements check (GDPR, HIPAA, local regulations)
- [ ] Audit logging requirements
- [ ] Data encryption requirements (at rest, in transit)

### ✅ Usability
- [ ] Target user personas được define
- [ ] Accessibility requirements (WCAG level)
- [ ] Supported devices và browsers
- [ ] Language và localization requirements
- [ ] Onboarding và help documentation needs

### ✅ Reliability & Availability
- [ ] SLA requirements (uptime %)
- [ ] Recovery time objective (RTO)
- [ ] Recovery point objective (RPO)
- [ ] Disaster recovery requirements
- [ ] Maintenance window constraints

## Checklist Phần 4: AI-Specific Requirements

Đây là phần checklist đặc biệt quan trọng cho BA làm dự án AI — thường bị bỏ sót nhất.

### ✅ AI Model Behavior
- [ ] Expected outputs được define rõ ràng (format, type, range)
- [ ] Confidence threshold được specify (khi nào cần human review)
- [ ] Fallback behavior khi model uncertain
- [ ] Edge cases và out-of-distribution inputs được handle thế nào
- [ ] Acceptable error rate được stakeholders approve

### ✅ Human-in-the-Loop Requirements
- [ ] Escalation triggers được define (khi nào AI handoff sang human)
- [ ] Human review workflow được specify
- [ ] Override mechanism (human can override AI decision)
- [ ] Audit trail cho AI decisions được require
- [ ] Labeling/feedback mechanism nếu cần continuous learning

### ✅ AI Fairness & Ethics
- [ ] Demographic groups affected bởi AI decision được identify
- [ ] Fairness metrics được define (equal accuracy across groups?)
- [ ] Bias testing plan được lập
- [ ] Explainability requirements (Black box acceptable không?)
- [ ] Impact assessment cho decisions affecting individuals

### ✅ Data & Model Quality
- [ ] Training data requirements được specify (volume, quality, freshness)
- [ ] Minimum model performance metrics được agree với stakeholders
- [ ] Model drift monitoring requirements
- [ ] Retraining trigger conditions được define
- [ ] Data versioning requirements

### ✅ AI-specific Non-Functional
- [ ] Inference latency requirements (real-time vs batch)
- [ ] Model serving infrastructure constraints
- [ ] Cost per inference estimate và budget
- [ ] Versioning và rollback requirements cho models

## Checklist Phần 5: Process & Handoff

### ✅ Dependencies
- [ ] External system dependencies được map
- [ ] API integrations được document (endpoint, contract, SLA)
- [ ] Third-party vendors/services được identify
- [ ] Team dependencies (other squads, infra team) được clarify
- [ ] Data pipeline dependencies được document

### ✅ Testing Requirements
- [ ] UAT scenarios được viết từ BA perspective
- [ ] Test data requirements được specify
- [ ] Performance test scenarios được define
- [ ] AI model testing criteria (accuracy, precision, recall targets)
- [ ] Regression test scope được agree

### ✅ Documentation & Traceability
- [ ] Requirements được assign unique IDs
- [ ] Traceability matrix: Business Req → System Req → Test Case
- [ ] Glossary của domain-specific terms được maintain
- [ ] Requirements change log được setup
- [ ] Sign-off received từ key stakeholders

## Template: Requirements Review Sign-off

Trước khi bàn giao sprint backlog, BA nên lấy sign-off với checklist mini:

```
REQUIREMENTS REVIEW SIGN-OFF
Sprint: ___________
Feature: ___________
BA: ___________
Date: ___________

✅ Functional requirements complete & approved
✅ Acceptance criteria testable & agreed
✅ Non-functional requirements defined
✅ AI-specific requirements reviewed (nếu applicable)  
✅ Dependencies identified & communicated
✅ Out-of-scope items documented

Stakeholder Sign-off:
Product Owner: ___________  Date: ___
Tech Lead: ___________      Date: ___
QA Lead: ___________        Date: ___
```

## Cách sử dụng Checklist hiệu quả

1. **Không cần tick hết** — Đánh dấu N/A cho các mục không applicable, và ghi rõ lý do
2. **Dùng như conversation guide** — Checklist giúp bạn nhớ cần hỏi gì, không phải form cứng nhắc
3. **Adapt cho project context** — Startup sprint ≠ Enterprise compliance project
4. **Review cùng team** — Đừng tự làm một mình, review với PO và Tech Lead
5. **Store centrally** — Lưu trong Confluence/Notion để team có thể access và improve

## Kết

Checklist không phải bureaucracy — đây là **quality tool** giúp BA deliver requirements với ít lỗi hơn, ít rework hơn. Trong dự án AI, phần AI-specific checklist đặc biệt quan trọng vì đây là territory mới mà nhiều team chưa có kinh nghiệm.

Bắt đầu với checklist đơn giản, rồi dần bổ sung theo kinh nghiệm thực tế của team bạn. Checklist tốt nhất là checklist được dùng thường xuyên — không phải checklist dài nhất.
