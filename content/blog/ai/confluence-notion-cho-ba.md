---
id: 02760001-ba01-4001-a003-000000000003
title: "Confluence & Notion cho BA: Xây dựng knowledge base yêu cầu chuẩn trong team AI"
slug: confluence-notion-cho-ba
excerpt: >-
  BA dùng Confluence hay Notion không chỉ để lưu tài liệu — mà để tạo single source
  of truth cho toàn team. Hướng dẫn cấu trúc space, template BRD/FRD, linking
  requirements với Jira tickets, và quản lý assumption log trong dự án AI.
featured_image: /images/blog/confluence-notion-ba.webp
type: blog
reading_time: 11
view_count: 0
meta: null
published_at: '2026-05-05T11:00:00.000000Z'
created_at: '2026-05-05T11:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Confluence, slug: confluence}, {name: Notion, slug: notion}, {name: Documentation, slug: documentation}, {name: AI, slug: ai}]
comments: []
---

BA giỏi không chỉ viết requirement tốt — mà còn đảm bảo requirement **tìm được, hiểu được, và không bị duplicate** trong suốt vòng đời dự án. Đó là lý do Confluence và Notion không thể thiếu.

---

## 1. Tại sao BA cần knowledge base chuẩn?

Trong dự án AI, thông tin thay đổi nhanh:
- Acceptance threshold được điều chỉnh sau sprint review
- Assumption về data bị sai khi nhận data thực tế
- Stakeholder mới join cần catch-up nhanh

Không có single source of truth → team mỗi người hiểu khác nhau → rework đắt tiền.

---

## 2. Cấu trúc Confluence Space cho dự án AI

```
📁 [Product/Project Name]
├── 📄 Project Overview (mục đích, stakeholders, timeline)
├── 📁 Requirements
│   ├── 📄 BRD — Business Requirements Document
│   ├── 📄 FRD — Functional Requirements Document
│   ├── 📄 Non-functional Requirements (performance, security)
│   └── 📄 Assumption Log
├── 📁 AI Specifics
│   ├── 📄 AI Feature Inventory (tên, mục đích, owner)
│   ├── 📄 Model Evaluation Criteria
│   ├── 📄 Data Dictionary
│   └── 📄 Bias & Fairness Checklist
├── 📁 Design
│   ├── 📄 User Journey Maps
│   ├── 📄 Flow Diagrams (BPMN/UML)
│   └── 📄 Wireframes (link Figma)
├── 📁 Testing
│   ├── 📄 UAT Plan & Scripts
│   └── 📄 Bug/Issue Log
└── 📁 Decisions
    ├── 📄 ADR Log (Architecture Decision Records)
    └── 📄 Meeting Notes
```

---

## 3. Template BRD chuẩn cho dự án AI

```markdown
# Business Requirements Document
## [Feature Name] v[X.X]

| Field | Value |
|-------|-------|
| Author | [BA Name] |
| Status | Draft / In Review / Approved |
| Last Updated | YYYY-MM-DD |
| Stakeholders | [Danh sách] |

## 1. Problem Statement
[Vấn đề gì đang xảy ra? Cho ai? Tác động kinh doanh là gì?]

## 2. Business Objectives
- Mục tiêu 1: [Measurable]
- Mục tiêu 2: [Measurable]

## 3. Success Metrics
| Metric | Baseline | Target | Measurement Method |
|--------|----------|--------|--------------------|
| [metric] | [now] | [target] | [how] |

## 4. Scope
### In Scope
- [Item 1]

### Out of Scope
- [Item 1] — lý do: [why]

## 5. AI-Specific Requirements
| Aspect | Requirement |
|--------|-------------|
| Accuracy Threshold | ≥ X% trên test set Y |
| Fallback Behavior | Khi confidence < Z: [action] |
| Human Override | Ai có quyền? Trigger là gì? |
| Data Freshness | Model cần retrain mỗi [period] |

## 6. Assumption Log
| ID | Assumption | Owner | Review Date | Status |
|----|-----------|-------|-------------|--------|
| A001 | [assumption] | [name] | [date] | Active/Invalid |

## 7. Constraints
- Legal: [GDPR, industry regulation]
- Technical: [API limits, data retention]
- Budget: [budget ceiling]
```

---

## 4. Linking Requirements với Jira/Azure DevOps

Best practice: **mỗi requirement trong BRD phải có Jira ticket tương ứng**.

Trong Confluence, dùng Jira macro để embed ticket status:
```
Requirements Section 3.1 → PROJ-123 (Story: "As a user, I want...")
Acceptance Criteria 3.1.a → PROJ-124 (Test Case)
```

Khi ticket status thay đổi → Confluence page tự cập nhật trạng thái.

---

## 5. Notion thay thế Confluence: Khi nào nên dùng?

| Tiêu chí | Confluence | Notion |
|---|---|---|
| **Tích hợp Atlassian** | ✅ Native (Jira, Bitbucket) | ❌ Cần third-party |
| **AI Assistant** | ✅ Atlassian Intelligence | ✅ Notion AI mạnh hơn |
| **Flexibility** | ⚠️ Template-heavy | ✅ Rất linh hoạt |
| **Database/Spreadsheet** | ❌ Yếu | ✅ Mạnh (relational DB) |
| **Free tier** | ❌ Có phí | ✅ Generous free tier |
| **Phù hợp cho** | Enterprise, Jira team | Startup, small team |

### Notion Database cho Requirement Tracking:

Tạo database với properties:
- **Requirement ID** (Text)
- **Type** (Select: Functional/Non-functional/AI-specific)
- **Status** (Select: Draft/Approved/Implemented/Deprecated)
- **Priority** (Select: P0/P1/P2)
- **Linked Sprint** (Relation → Sprint database)
- **AC Count** (Number: số acceptance criteria)

---

## 6. Lỗi thường gặp và cách tránh

**Lỗi 1: Copy-paste requirement vào nhiều page**
→ Dùng Confluence "Include Page" macro hoặc Notion synced block

**Lỗi 2: Assumption không có owner**
→ Mỗi row trong Assumption Log phải có tên người chịu trách nhiệm validate

**Lỗi 3: Version cũ của BRD không archive rõ ràng**
→ Dùng Confluence Page History + đánh dấu "ARCHIVED" ở đầu page cũ

**Lỗi 4: Meeting notes không link về requirement liên quan**
→ Template meeting note có section "Requirements Impacted: [link]"

---

## Kết luận

Confluence/Notion là **memory của dự án**. BA đầu tư thời gian cấu trúc tốt từ đầu sẽ tiết kiệm hàng chục giờ clarification sau này — đặc biệt khi team AI phải giải thích "tại sao model làm thế" 6 tháng sau go-live.
