---
id: 019d8a22-c318-7a10-b001-a1b2c3d4e518
title: "Bài 18: Circuit Breaker & Retry Patterns"
slug: bai-18-circuit-breaker-retry-patterns
description: >-
  Circuit Breaker states (Closed, Open, Half-Open), Retry với
  Exponential Backoff & Jitter, Timeout pattern, fallback strategies,
  implementation với Resilience4j/Polly, cascade failure prevention.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 18
section_title: "Phần 6: Resiliency Patterns"
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: "Cloud Native Microservices Architecture"
  slug: cloud-native-microservices-architecture
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-7192" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-7192)"/>

  <!-- Decorations -->
  <g>
    <circle cx="832" cy="166" r="10" fill="#f87171" opacity="0.11"/>
    <circle cx="1064" cy="38" r="26" fill="#f87171" opacity="0.07"/>
    <circle cx="796" cy="170" r="12" fill="#f87171" opacity="0.13"/>
    <circle cx="1028" cy="42" r="28" fill="#f87171" opacity="0.09"/>
    <circle cx="760" cy="174" r="14" fill="#f87171" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <line x1="600" y1="186" x2="1100" y2="266" stroke="#f87171" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="216" x2="1050" y2="286" stroke="#f87171" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1071.507041555162,215.5 1071.507041555162,256.5 1036,277 1000.492958444838,256.5 1000.492958444838,215.5 1036,195" fill="none" stroke="#f87171" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f87171"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f87171" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ Kiến trúc — Bài 18</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 18: Circuit Breaker &amp; Retry Patterns</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Cloud Native Microservices Architecture</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 6: Resiliency Patterns</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 18: Circuit Breaker & Retry Patterns](/storage/uploads/2026/03/cn-bai-18-diagram.webp)

## Giới thiệu

Trong microservices, **failure là chuyện bình thường** — service sẽ timeout, crash, bị overloaded. Câu hỏi không phải là "liệu có failure không?" mà là "failure được xử lý như thế nào?".

Nếu không có cơ chế bảo vệ, một service bị lỗi có thể làm sập toàn bộ hệ thống qua **cascade failure**. Bài này trình bày các pattern thiết yếu để xây dựng hệ thống resilient.

---

## 1. Cascade Failure — Vấn đề cốt lõi

### 1.1 Kịch bản cascade failure điển hình

```
Normal flow:
API Gateway → Order Service → Payment Service → DB

Payment Service chậm (DB overloaded):
        ↓
Order Service gọi Payment, chờ... timeout sau 30s
Threads của Order Service bị block 30s mỗi request
        ↓
New requests vào Order Service không có thread để xử lý
Order Service trở nên không phản hồi
        ↓
API Gateway không nhận response từ Order Service
API Gateway threads bị block
        ↓
Toàn bộ hệ thống đóng băng
```

**Cascade failure xảy ra vì**: Resources (threads, connections, memory) bị hold bởi calls đến downstream service bị lỗi.

### 1.2 Giải pháp tổng thể

```
┌─────────────────────────────────────────────────────┐
│              Resiliency Patterns                    │
│                                                     │
│  Timeout         — Không chờ vô thời hạn            │
│  Retry           — Thử lại khi lỗi tạm thời         │
│  Circuit Breaker — Ngừng gọi khi downstream lỗi    │
│  Bulkhead        — Cô lập resources theo group      │
│  Fallback        — Trả về giá trị mặc định          │
└─────────────────────────────────────────────────────┘
```

---

## 2. Timeout Pattern

### 2.1 Timeout ở mọi network call

**Rule**: Mọi outbound network call đều phải có timeout.

```java
// Không có timeout — NGUY HIỂM
HttpClient client = HttpClient.newHttpClient();
HttpResponse resp = client.send(request, BodyHandlers.ofString());

// Có timeout — ĐÚNG
HttpClient client = HttpClient.newBuilder()
    .connectTimeout(Duration.ofSeconds(2))
    .build();

HttpResponse resp = client.send(
    request.timeout(Duration.ofSeconds(5)),
    BodyHandlers.ofString()
);
```

### 2.2 Timeout Hierarchy

```
User Request Timeout:     30s  (tổng budget cho request)
API Gateway Timeout:      25s  (dư 5s buffer)
Service Call Timeout:     10s  (mỗi downstream call)
DB Query Timeout:          5s
Cache Timeout:             1s

Luật: Mỗi layer phải có timeout nhỏ hơn layer cha
để không bao giờ "child đã timeout trước khi parent biết"
```

### 2.3 Đặt timeout bao nhiêu?

```
Phân tích baseline:
1. Đo p99 latency của operation khi bình thường: 150ms
2. Thêm buffer: 150ms × 3 = 450ms
3. Set timeout: 500ms

Không đặt quá lớn: timeout = 30s → thread bị block 30s
Không đặt quá nhỏ: timeout = 50ms → false positives khi GC pause
```

---

## 3. Retry Pattern

### 3.1 Khi nào nên Retry?

```
Nên retry:
✅ Network timeout (tạm thời)
✅ 503 Service Unavailable
✅ 429 Too Many Requests
✅ Connection reset

Không retry:
❌ 400 Bad Request (lỗi input, retry cũng vô ích)
❌ 401/403 Unauthorized (cần fix auth, không phải retry)
❌ 404 Not Found
❌ Operation gây side effects (đừng retry POST payment!)
```

### 3.2 Exponential Backoff

```
Không có backoff — THUNDERING HERD:
  Attempt 1: T+0ms   → Fail
  Attempt 2: T+0ms   → Fail (tất cả clients retry cùng lúc → server càng quá tải)
  Attempt 3: T+0ms   → Fail

Exponential Backoff:
  Attempt 1: T+0ms      → Fail
  Attempt 2: T+100ms    → Fail
  Attempt 3: T+400ms    → Fail
  Attempt 4: T+1600ms   → Success ✓

  delay(n) = baseDelay × 2^(n-1)
```

### 3.3 Jitter — Phân tán retry

```
Không có Jitter — vẫn thundering herd:
  10.000 clients đều retry tại T+100ms → spike

Với Jitter (Full Jitter):
  delay(n) = random(0, baseDelay × 2^(n-1))
  Clients retry tại các thời điểm khác nhau → hệ thống phục hồi dần
```

### 3.4 Triển khai với Resilience4j (Java)

```java
// Config
RetryConfig retryConfig = RetryConfig.custom()
    .maxAttempts(4)
    .waitDuration(Duration.ofMillis(100))
    .intervalFunction(IntervalFunction.ofExponentialRandomBackoff(
        Duration.ofMillis(100),  // initial delay
        2.0,                     // multiplier
        Duration.ofSeconds(10)   // max delay
    ))
    // Chỉ retry với các exception phù hợp
    .retryOnException(e ->
        e instanceof ConnectTimeoutException ||
        (e instanceof HttpStatusCodeException se && se.getStatusCode() == 503)
    )
    // Không retry nếu đây là non-retryable error
    .ignoreExceptions(BadRequestException.class, UnauthorizedException.class)
    .build();

RetryRegistry registry = RetryRegistry.of(retryConfig);
Retry retry = registry.retry("payment-service");

// Sử dụng
Supplier<PaymentResponse> supplier = Retry.decorateSupplier(
    retry,
    () -> paymentClient.charge(request)
);

// Log retry attempts
retry.getEventPublisher().onRetry(event ->
    log.warn("Retry attempt {} for payment-service: {}",
        event.getNumberOfRetryAttempts(),
        event.getLastThrowable().getMessage())
);
```

---

## 4. Circuit Breaker Pattern

### 4.1 Ba trạng thái

```
  ┌─────────────────────────────────────────────────────────────────┐
  │                                                                 │
  │         CLOSED                                                  │
  │    (Normal operation)                                           │
  │    - Requests flow through                                      │
  │    - Count failures                                             │
  │         │                                                       │
  │         │ failures > threshold (e.g., 50% in 10s window)       │
  │         ▼                                                       │
  │          OPEN                                                   │
  │    (Fail fast)                                                   │
  │    - Requests rejected immediately                              │
  │    - Return fallback response                                   │
  │    - No calls to downstream                                     │
  │         │                                                       │
  │         │ after wait duration (e.g., 30s)                      │
  │         ▼                                                       │
  │       HALF-OPEN                                                 │
  │    (Testing recovery)                                           │
  │    - Allow N probe requests through                             │
  │    - If success → CLOSED                                        │
  │    - If failure → OPEN again                                    │
  │                                                                 │
  └─────────────────────────────────────────────────────────────────┘
```

### 4.2 Implementation với Resilience4j

```java
CircuitBreakerConfig cbConfig = CircuitBreakerConfig.custom()
    // Sliding window: đánh giá trên 10 calls gần nhất
    .slidingWindowType(SlidingWindowType.COUNT_BASED)
    .slidingWindowSize(10)
    // Mở circuit khi > 50% calls fail
    .failureRateThreshold(50)
    // Mở circuit khi > 50% calls slow (> 2s)
    .slowCallRateThreshold(50)
    .slowCallDurationThreshold(Duration.ofSeconds(2))
    // Ở trạng thái OPEN trong 30s trước khi thử lại
    .waitDurationInOpenState(Duration.ofSeconds(30))
    // Cho 5 probe requests khi HALF-OPEN
    .permittedNumberOfCallsInHalfOpenState(5)
    // Cần ít nhất 10 calls trước khi đánh giá
    .minimumNumberOfCalls(10)
    .build();

CircuitBreakerRegistry registry = CircuitBreakerRegistry.of(cbConfig);
CircuitBreaker cb = registry.circuitBreaker("payment-service");

// Kết hợp Circuit Breaker + Retry + Timeout
CircuitBreaker circuitBreaker = registry.circuitBreaker("payment-service");
TimeLimiter timeLimiter = TimeLimiter.of(Duration.ofSeconds(2));
Retry retry = RetryRegistry.ofDefaults().retry("payment-service");

// Thứ tự quan trọng: Retry → CircuitBreaker → TimeLimiter
Supplier<CompletableFuture<PaymentResponse>> supplier = TimeLimiter
    .decorateFutureSupplier(timeLimiter,
        CircuitBreaker.decorateSupplier(circuitBreaker,
            () -> CompletableFuture.supplyAsync(
                () -> paymentClient.charge(request)
            )
        )
    );

// Fallback
Try<PaymentResponse> result = Try.ofSupplier(
    Retry.decorateSupplier(retry, supplier.get()::get)
).recover(throwable -> {
    log.error("Payment service unavailable, using fallback", throwable);
    return PaymentResponse.pending(request.getOrderId());
});
```

### 4.3 Annotation-based (dễ hơn)

```java
@Service
public class PaymentServiceClient {

    @CircuitBreaker(name = "payment-service", fallbackMethod = "paymentFallback")
    @Retry(name = "payment-service")
    @TimeLimiter(name = "payment-service")
    public CompletableFuture<PaymentResponse> charge(ChargeRequest request) {
        return CompletableFuture.supplyAsync(
            () -> paymentClient.post("/charge", request, PaymentResponse.class)
        );
    }

    // Fallback phải có cùng signature + Throwable parameter
    public CompletableFuture<PaymentResponse> paymentFallback(
            ChargeRequest request, CallNotPermittedException e) {
        log.warn("Circuit OPEN for payment-service, returning pending response");
        return CompletableFuture.completedFuture(
            PaymentResponse.pending(request.getOrderId())
        );
    }

    public CompletableFuture<PaymentResponse> paymentFallback(
            ChargeRequest request, TimeoutException e) {
        log.error("Payment service timeout", e);
        return CompletableFuture.completedFuture(
            PaymentResponse.timeout(request.getOrderId())
        );
    }
}
```

```yaml
# application.yml
resilience4j:
  circuitbreaker:
    instances:
      payment-service:
        sliding-window-size: 10
        failure-rate-threshold: 50
        wait-duration-in-open-state: 30s
        permitted-number-of-calls-in-half-open-state: 5
        minimum-number-of-calls: 10
        register-health-indicator: true  # Expose vào /actuator/health
  retry:
    instances:
      payment-service:
        max-attempts: 3
        wait-duration: 100ms
        exponential-backoff-multiplier: 2
        enable-exponential-backoff: true
  timelimiter:
    instances:
      payment-service:
        timeout-duration: 2s
```

---

## 5. Fallback Strategies

### 5.1 Các loại Fallback

```
1. Static Fallback
   → Trả về hardcoded giá trị mặc định
   → Ví dụ: Recommendation service down → trả top 10 sản phẩm best-seller cố định

2. Cache Fallback
   → Trả về data từ cache (có thể stale)
   → Ví dụ: Product catalog down → trả data từ Redis cache (refresh mỗi 1 phút)

3. Graceful Degradation
   → Disable tính năng, hiển thị thông báo
   → Ví dụ: Review service down → ẩn phần reviews, vẫn cho phép đặt hàng

4. Pending/Async Fallback
   → Nhận request, lưu vào queue xử lý sau
   → Ví dụ: Notification service down → lưu vào database, retry sau
```

### 5.2 Ví dụ thực tế

```java
@Service
public class ProductRecommendationService {

    @CircuitBreaker(name = "recommendation", fallbackMethod = "getCachedRecommendations")
    public List<Product> getRecommendations(String userId) {
        return recommendationEngine.getPersonalized(userId);
    }

    // Cache fallback — trả data cũ hơn thay vì lỗi
    public List<Product> getCachedRecommendations(String userId, Exception e) {
        log.warn("Recommendation engine unavailable, using cached data");

        List<Product> cached = cache.get("recommendations:" + userId);
        if (cached != null) return cached;

        // Nếu không có cache cá nhân hóa → dùng best-sellers
        return cache.get("best-sellers:top-10");
    }
}
```

---

## 6. Testing Resiliency

### 6.1 Unit Test với Resilience4j

```java
@Test
void whenPaymentServiceDown_shouldRetryAndFallback() {
    // Mock payment service liên tục fail
    when(paymentClient.charge(any()))
        .thenThrow(new ConnectTimeoutException("Connection refused"))
        .thenThrow(new ConnectTimeoutException("Connection refused"))
        .thenReturn(PaymentResponse.success());

    PaymentResponse result = subject.charge(request);

    // Verify retry happened
    verify(paymentClient, times(3)).charge(any());

    // Verify result is correct
    assertThat(result.getStatus()).isEqualTo("SUCCESS");
}

@Test
void whenCircuitIsOpen_shouldReturnFallbackImmediately() {
    // Force circuit OPEN
    CircuitBreaker cb = CircuitBreakerRegistry.ofDefaults()
        .circuitBreaker("payment-service");
    cb.transitionToOpenState();

    long start = System.currentTimeMillis();
    PaymentResponse result = subject.charge(request);
    long duration = System.currentTimeMillis() - start;

    // Phải return ngay lập tức (fail fast)
    assertThat(duration).isLessThan(50);
    // Phải là fallback response
    assertThat(result.getStatus()).isEqualTo("PENDING");
}
```

---

## 7. Monitoring Circuit Breakers

Expose circuit breaker state qua Prometheus:

```yaml
# Spring Boot Actuator + Micrometer tự động export
# Metrics có sẵn:
resilience4j_circuitbreaker_state{name="payment-service"}  # 0=CLOSED, 1=OPEN, 2=HALF_OPEN
resilience4j_circuitbreaker_calls_total{name, kind, result}
resilience4j_circuitbreaker_failure_rate{name}
```

```promql
# Alert khi circuit OPEN
resilience4j_circuitbreaker_state{name="payment-service"} == 1
```

```yaml
# Grafana panel: Circuit Breaker Status
- CLOSED: ✅ Xanh lá
- HALF-OPEN: ⚠️ Vàng
- OPEN: 🔴 Đỏ + Alert
```

---

## Tóm tắt

| Pattern | Vấn đề giải quyết | Khi nào dùng |
|---------|------------------|-------------|
| Timeout | Thread starvation | Mọi network call |
| Retry + Backoff + Jitter | Transient failures | Idempotent operations |
| Circuit Breaker | Cascade failure | External service calls |
| Fallback | Degraded experience | Khi failure không thể tránh |

**Thứ tự áp dụng**: Timeout → Retry → Circuit Breaker → Fallback

**Bài tiếp theo**: Bulkhead, Rate Limiting & Health Check Patterns
