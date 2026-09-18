---
id: 019d8a21-c507-7005-d001-e1f2a3b4c507
title: "Bài 7: Reconciliation & Settlement Engine"
slug: bai-7-reconciliation-settlement-engine
description: >-
  Thiết kế hệ thống đối soát (reconciliation) tự động. Matching
  algorithms cho transaction reconciliation. Settlement engine
  và payout processing. Handling discrepancies và exceptions.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 7
section_title: "Phần 2: Core Payment Engine"
course:
  id: 019d8a21-c500-7005-d001-e1f2a3b4c5d6
  title: "Kiến trúc FinTech & Payment Platform"
  slug: kien-truc-fintech-payment-platform
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-2902" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-2902)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1053" cy="109" r="16" fill="#c084fc" opacity="0.14"/>
    <circle cx="1006" cy="222" r="35" fill="#c084fc" opacity="0.13"/>
    <circle cx="959" cy="75" r="24" fill="#c084fc" opacity="0.12000000000000001"/>
    <circle cx="912" cy="188" r="13" fill="#c084fc" opacity="0.11"/>
    <circle cx="865" cy="41" r="32" fill="#c084fc" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <line x1="600" y1="119" x2="1100" y2="199" stroke="#c084fc" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="149" x2="1050" y2="219" stroke="#c084fc" stroke-width="0.5" opacity="0.08"/>
    <polygon points="948.444863728671,102 948.444863728671,136 919,153 889.555136271329,136 889.555136271329,102.00000000000001 919,85" fill="none" stroke="#c084fc" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#c084fc"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#c084fc" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#c084fc">🏗️ Kiến trúc — Bài 7</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 7: Reconciliation &amp; Settlement Engine</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Kiến trúc FinTech &amp; Payment Platform</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 2: Core Payment Engine</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 7: Reconciliation & Settlement Engine](/storage/uploads/2026/03/fintech-bai-7-diagram.webp)

## Giới thiệu

Reconciliation (đối soát) là quy trình so khớp giao dịch giữa hệ thống nội bộ và PSP/bank để đảm bảo tính chính xác của dữ liệu tài chính. Đây là chức năng critical nhưng thường bị overlooked trong payment systems.

---

## 1. Reconciliation là gì?

### 1.1 Tổng quan

```
Reconciliation = So khớp records giữa 2+ hệ thống

Internal Records (Our System)    External Records (PSP/Bank)
├── payment_001: 100,000 VND     ├── txn_abc: 100,000 VND     ✓ Match
├── payment_002: 200,000 VND     ├── txn_def: 200,000 VND     ✓ Match
├── payment_003: 150,000 VND     ├── (missing)                ✗ Unmatched
├── (missing)                    ├── txn_ghi: 50,000 VND      ✗ Extra
└── payment_004: 300,000 VND     └── txn_jkl: 310,000 VND     ✗ Mismatch
```

### 1.2 Types of Reconciliation

| Type | Mô tả | Frequency |
|------|--------|-----------|
| **Transaction Recon** | So khớp từng giao dịch | Daily |
| **Settlement Recon** | So khớp tổng settlement | Daily/Weekly |
| **Balance Recon** | So khớp số dư tài khoản | Daily |
| **Fee Recon** | Kiểm tra phí đúng hợp đồng | Monthly |
| **Cross-system Recon** | Giữa các internal services | Real-time |

---

## 2. Reconciliation Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              RECONCILIATION ENGINE                           │
│                                                              │
│  ┌────────────┐     ┌──────────────┐     ┌───────────────┐ │
│  │   File     │     │   Matching   │     │  Exception    │ │
│  │  Ingester  │────►│   Engine     │────►│  Manager      │ │
│  └────────────┘     └──────────────┘     └───────────────┘ │
│       │                    │                     │           │
│  ┌────▼────┐         ┌────▼────┐          ┌─────▼─────┐   │
│  │ Parser  │         │ Rules   │          │ Workflow  │   │
│  │ (CSV,   │         │ Engine  │          │ (Manual   │   │
│  │  SFTP,  │         │         │          │  Review)  │   │
│  │  API)   │         │         │          │           │   │
│  └─────────┘         └─────────┘          └───────────┘   │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Reporting & Dashboard                     │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 2.1 File Ingestion

```java
@Service
public class ReconciliationFileIngester {

    // PSPs provide settlement files in various formats
    public List<ExternalTransaction> ingest(PSPFileConfig config) {
        return switch (config.getFormat()) {
            case CSV -> parseCsv(config);
            case SFTP_CSV -> downloadAndParseCsv(config);
            case API -> fetchViaApi(config);
            case EXCEL -> parseExcel(config);
        };
    }

    // VNPay sends CSV via SFTP
    private List<ExternalTransaction> downloadAndParseCsv(PSPFileConfig config) {
        var file = sftpClient.download(
            config.getHost(), config.getPath(),
            config.getCredentials());
        return csvParser.parse(file, VNPayTransactionMapper.class);
    }
}
```

### 2.2 Matching Engine

```java
@Service
public class TransactionMatcher {

    public ReconciliationResult match(
            List<InternalTransaction> internal,
            List<ExternalTransaction> external) {

        var result = new ReconciliationResult();
        var externalMap = external.stream()
            .collect(Collectors.toMap(
                ExternalTransaction::getPspReference, Function.identity()));

        for (var txn : internal) {
            var ext = externalMap.remove(txn.getPspReference());

            if (ext == null) {
                result.addUnmatched(txn); // Missing on PSP side
            } else if (!txn.getAmount().equals(ext.getAmount())) {
                result.addMismatch(txn, ext); // Amount mismatch
            } else if (!txn.getCurrency().equals(ext.getCurrency())) {
                result.addMismatch(txn, ext); // Currency mismatch
            } else {
                result.addMatched(txn, ext); // Perfect match
            }
        }

        // Remaining external transactions = not in our system
        for (var ext : externalMap.values()) {
            result.addExtra(ext);
        }

        return result;
    }
}
```

---

## 3. Exception Handling

### 3.1 Exception Types

```
Reconciliation Exceptions:
├── MISSING_EXTERNAL: In our system, not in PSP
│   → PSP may not have processed yet (timing)
│   → PSP failed silently
│
├── MISSING_INTERNAL: In PSP, not in our system
│   → Our system crashed before recording
│   → Duplicate on PSP side
│
├── AMOUNT_MISMATCH: Different amounts
│   → Partial capture not reflected
│   → FX rate difference
│   → Fee deducted at PSP
│
└── STATUS_MISMATCH: Different statuses
    → Async update not received
    → Webhook missed
```

### 3.2 Resolution Workflow

```
Exception Detected
    │
    ▼
Auto-resolution possible?
    │
    ├── YES: Apply auto-fix
    │   ├── Timing issue → Wait and re-check
    │   ├── Missed webhook → Query PSP for status
    │   └── Known pattern → Apply standard fix
    │
    └── NO: Create manual review task
        ├── Assign to operations team
        ├── Set SLA (24h for critical, 72h for normal)
        └── Escalate if unresolved
```

---

## 4. Settlement & Payout

### 4.1 Merchant Payout Flow

```
Daily Settlement:
1. Aggregate captured transactions per merchant
2. Calculate fees (platform fee, PSP fee)
3. Calculate net payout amount
4. Create payout record
5. Submit bank transfer
6. Update settlement status

Payout Schedule:
├── T+1: Next business day (standard)
├── T+0: Same day (premium merchants)
├── Weekly: Every Monday (small merchants)
└── On-demand: Instant payout (with fee)
```

### 4.2 Payout Implementation

```java
@Service
public class PayoutService {

    @Scheduled(cron = "0 0 8 * * MON-FRI") // 8:00 AM weekdays
    public void processPayouts() {
        var pendingPayouts = payoutRepository
            .findByStatus(PayoutStatus.PENDING);

        for (var payout : pendingPayouts) {
            try {
                // Transfer via bank API
                var transferResult = bankApi.transfer(
                    payout.getMerchantBankAccount(),
                    payout.getNetAmount(),
                    payout.getReference());

                payout.markProcessed(transferResult.getReference());
                payoutRepository.save(payout);

                notificationService.notifyMerchant(
                    payout.getMerchantId(),
                    "Payout processed: " + payout.getNetAmount());

            } catch (BankApiException e) {
                payout.markFailed(e.getMessage());
                payoutRepository.save(payout);
                alertService.alert("Payout failed: " + payout.getId());
            }
        }
    }
}
```

---

## Tổng kết

Reconciliation & Settlement là backbone của FinTech operations:
- **Automated matching** giữa internal records và PSP data
- **Exception management** với auto-resolution và manual review
- **Settlement batch** daily với fee calculation
- **Payout processing** với bank integration

**Bài tiếp theo**: Digital Wallet Architecture — E-Wallet & Balance Management.
