---
id: 02760001-ba02-4001-a013-000000000001
title: >-
  API and Data Contract for Software BA: How to read, ask and write integration
  requirements?
slug: api-data-contracts-software-ba
excerpt: >-
  Software BA does not need API code but needs to understand endpoint, payload,
  validation, error code, events, data lineage and contract. This article
  provides integration request templates, scheduling examples and checklists to
  help BA work better with Dev/Data/QA.
featured_image: /images/blog/rest-api-data-validation-ba.webp
type: blog
reading_time: 17
view_count: 0
meta: null
published_at: '2026-05-06T10:30:00.000000Z'
created_at: '2026-05-06T10:30:00.000000Z'
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
  - name: API
    slug: api
  - name: Data Contract
    slug: data-contract
  - name: Integration
    slug: integration
  - name: Software BA
    slug: software-ba
comments: []
locale: en
---
Software BA does not need to write backend code, but if you make digital products, you will constantly encounter questions about API and data:

- Which system sends the data?
- Which fields are required?
- What message should I return when there is an error?
- What source does the data come from?
- Is there a need to audit log?
- Is the API called again if it times out?
- Can an event be duplicated?

If BA avoids this part completely, the requirement will be gaping in the handoff area between business and engineering.

## 1. What is an API contract?

API contract is an agreement between the caller and the API provider.

A contract usually has:

- Endpoint or event name.
- Method: GET, POST, PUT, PATCH, DELETE.
- Request payload.
- Response payload.
- Validation rules.
- Error code/message.
- Authentication/authorization.
- Rate limit or quota.
- Versioning.
- SLA/availability.

The BA does not need to make all technical decisions, but the BA needs to ensure that the contract accurately reflects the business.

## 2. What is a data contract?

Data contract is an agreement about data to be exchanged or stored.

Field example `appointmentStatus`:

| Attributes | Value |
|---|---|
| Type | enum |
| Allowed values ​​| Pending, Confirmed, Cancelled, Completed, NoShow |
| Required | Yes |
| Source | Booking Service |
| Owner | Product Ops |
| Sensitive | No |
| Retention | 7 years |
| Used by | UI, report, notification, audit |

If the field has no owner, unknown source, unknown allowed values, the system will easily create discrepancies between UI, API, database and report.

## 3. Integration request template for BA

```markdown
# Integration Requirement

## 1. Business context
- Business process:
- Trigger:
- Actor/system:
- Success outcome:

## 2. Systems involved
- Source system:
- Target system:
- External dependency:

## 3. API / event
- Endpoint/event:
- Method:
- Authentication:
- Frequency:
- Idempotency requirement:

## 4. Request data
| Field | Type | Required | Validation | Source | Notes |

## 5. Response data
| Field | Type | Required | Meaning | UI/report usage |

## 6. Error handling
| Error | Cause | User message | Retry? | Escalation |

## 7. Non-functional requirements
- Performance:
- Availability:
- Security/privacy:
- Audit/logging:
- Monitoring:

## 8. Open questions
```

This template is light enough to use in Agile, but clear enough that Dev and QA don't have to figure it out themselves.

## 4. For example: make an appointment

Requirements:

> When the patient selects the slot and clicks confirm, the system must create an appointment if the slot is available and return the appointment code.

Suggested API:

```http
POST /appointments
```

Request:

```json
{
  "patientId": "PAT-123",
  "doctorId": "DOC-456",
  "slotId": "SLOT-789",
  "reason": "Follow-up consultation",
  "channel": "WEB"
}
```

Validation:

| Field | Rule |
|---|---|
| patientId | Required, must exist, active patient |
| doctorId | Required, must exist, accepting booking |
| slotId | Required, must be available at submit time |
| reasons | Optional, max 500 chars |
| channel | Required, enum WEB/MOBILE/CALL_CENTER |

Response success:

```json
{
  "appointmentId": "APT-20260506-001",
  "status": "Confirmed",
  "confirmationCode": "XDA-8821"
}
```

Errors:

| Code | Cause | User messages | THREE notes |
|---|---|---|---|
| SLOT_UNAVAILABLE | Slot was taken | This slot has just been placed. Please choose another time. | Must show alternative slots |
| PATIENT_BLOCKED | Patient cannot book | Your account needs to be supported before booking. | Route to support |
| VALIDATION_ERROR | Missing/invalid field | Please check the information again. | Highlight fields |
| SYSTEM_TIMEOUT | Service timeout | The system is busy. Please try again. | Need idempotency |

## 5. Questions BA should ask Dev/Data/QA

With API:

- API synchronous or asynchronous?
- Is an idempotency key needed to avoid duplication?
- How long is the timeout?
- Is there a retry? How many times to retry?
- Which errors can the user see, which errors can only be logged?
- Does the API have a version?
- Is there an audit log for important requests/responses?

With data:

- What system is Field source of truth?
- Can Field be null?
- Is there PII/PHI/financial data?
- What are retention and deletion rules?
- Report uses real-time or batch data?
- Is there data lineage from source to dashboard?

With QA:

- Is there contract testing?
- Are there test cases for duplicate requests?
- Are there test cases for stale data?
- Is there permission testing?
- Is there backward compatibility testing?

## 6. Checklist API/data requirements

- Endpoint/event is clearly named.
- Clear business trigger.
- Request/response has fields, type, required, validation.
- Error handling has code, cause, user message, retry/escalation.
- Clear permission.
- Sensitive data is marked.
- Clear audit/logging.
- Measurable performance and availability.
- Clear Idempotency/duplicate handling if there is a transaction.
- Contract has version or change policy.

## 7. Common errors

**Error 1: Only write screen, not data**

UI is just one part. If it is unclear where data comes from and where it goes, reports, notifications, audits and integration will be wrong.

**Error 2: No error description**

Happy path is usually easy. The new error is where user experience and support costs flare up.

**Error 3: Not asking for idempotency**

In order creation, payment, scheduling, and retry transactions, there may be duplicates. BA should ask early so that business rules and UX are not missing.

## More complete API contract example

Endpoints:

```http
PATCH /appointments/{appointment_id}/reschedule
```

Business rules:

- User must be the owner or customer service with support rights.
- Appointment must be in Confirmed state.
- Sales start time is at least 4 hours.
- New slots must be available.
- Request retry cannot be created multiple times.

Request:

```json
{
  "new_slot_id": "SLOT-20260507-1000",
  "reason": "Customer requested a later time",
  "idempotency_key": "a9c6d2f0-7e2b-4b15-a4b9-118e6f21c001"
}
```

Response success:

```json
{
  "appointment_id": "APT-20260506-001",
  "old_slot_id": "SLOT-20260507-0900",
  "new_slot_id": "SLOT-20260507-1000",
  "status": "Confirmed",
  "updated_at": "2026-05-06T10:30:00Z"
}
```

Validation and errors:

| Code | HTTP | Cause | User messages | Retry |
|---|---:|---|---|---|
| NOT_OWNER | 403 | User does not own sales | You do not have the right to change this schedule. | No |
| INVALID_STATUS | 409 | Appointment is not Confirmed | This appointment cannot be changed. | No |
| CUTOFF_EXPIRED | 409 | Less than 4 hours left | Schedule coming soon. Please call hotline. | No |
| SLOT_UNAVAILABLE | 409 | New slot just placed | This slot has just been placed. Please choose another time. | Yes, choose another slot |
| DUPLICATE_REQUEST | 200 | Same idempotency_key | Returns the result of the first request. | Safe |

Audit log:

| Field | Meaning |
|---|---|
| actor_id | Who changed the schedule |
| actor_role | Customer/Customer Service/Admin |
| appointment_id | Schedule changed |
| old_slot_id/new_slot_id | Before and after |
| reasons | Reason for change |
| timestamp | Time |

This is enough detail for Dev to implement, QA to write contract/negative tests, and business to understand why the system rejects each case.

## Reference source

- IEEE/ISO/IEC 29148-2018: https://standards.ieee.org/ieee/29148/6937/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/

## Conclusion

API/data literacy helps Software BA not be blind at the integration stage. You don't need to code, but you need to know how to ask the right questions about contracts, validation, errors, security, auditing and data ownership. This is the ability to distinguish BAs who write requirements for slides from BAs who write requirements for real software.
