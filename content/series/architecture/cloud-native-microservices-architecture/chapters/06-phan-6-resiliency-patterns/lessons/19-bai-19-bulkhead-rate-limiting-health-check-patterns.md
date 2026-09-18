---
id: 019d8a22-c319-7a10-b001-a1b2c3d4e519
title: "Bài 19: Bulkhead, Rate Limiting & Health Check Patterns"
slug: bai-19-bulkhead-rate-limiting-health-check-patterns
description: >-
  Bulkhead Pattern (thread pool isolation), Rate Limiting algorithms
  (Token Bucket, Sliding Window), Health Check pattern (liveness,
  readiness, startup probes), graceful degradation strategies.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 19
section_title: "Phần 6: Resiliency Patterns"
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: "Cloud Native Microservices Architecture"
  slug: cloud-native-microservices-architecture
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-9180" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-9180)"/>

  <!-- Decorations -->
  <g>
    <circle cx="741" cy="153" r="14" fill="#34d399" opacity="0.08"/>
    <circle cx="882" cy="194" r="17" fill="#34d399" opacity="0.11"/>
    <circle cx="1023" cy="235" r="20" fill="#34d399" opacity="0.14"/>
    <circle cx="664" cy="276" r="23" fill="#34d399" opacity="0.07"/>
    <circle cx="805" cy="57" r="26" fill="#34d399" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <line x1="600" y1="243" x2="1100" y2="323" stroke="#34d399" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="273" x2="1050" y2="343" stroke="#34d399" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1025.9089653438086,174 1025.9089653438086,212 993,231 960.0910346561914,212 960.0910346561914,174 993,155" fill="none" stroke="#34d399" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#34d399"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#34d399" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#34d399">🏗️ Kiến trúc — Bài 19</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 19: Bulkhead, Rate Limiting &amp; Health</tspan>
      <tspan x="60" dy="42">Check Patterns</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Cloud Native Microservices Architecture</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 6: Resiliency Patterns</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 19: Bulkhead, Rate Limiting & Health Check Patterns](/storage/uploads/2026/03/cn-bai-19-diagram.webp)

## Giới thiệu

Bài trước đã xử lý cascade failure từ downstream service. Bài này bổ sung ba pattern quan trọng khác:

- **Bulkhead** — cô lập resources để một loại request không ảnh hưởng loại khác
- **Rate Limiting** — kiểm soát tốc độ request để bảo vệ service
- **Health Check** — giúp Kubernetes biết khi nào service sẵn sàng hay cần restart

---

## 1. Bulkhead Pattern

### 1.1 Ý tưởng từ tàu thủy

Tàu thủy được chia thành nhiều ngăn kín nước (bulkhead). Nếu một ngăn rò rỉ, các ngăn khác vẫn nguyên vẹn — tàu không chìm.

Trong microservices:

```
Không có Bulkhead:
┌────────────────────────────────────────────┐
│            Order Service                   │
│  Thread Pool: 50 threads (shared)          │
│                                            │
│  Payment calls: 45 threads (blocked/slow) │
│  Inventory calls: 5 threads remaining     │
│                                            │
│  → Inventory calls cũng bị ảnh hưởng!    │
└────────────────────────────────────────────┘

Có Bulkhead:
┌────────────────────────────────────────────┐
│            Order Service                   │
│                                            │
│  ┌──────────────────┐ ┌──────────────────┐│
│  │ Payment Pool     │ │ Inventory Pool   ││
│  │ max: 20 threads  │ │ max: 20 threads  ││
│  │                  │ │                  ││
│  │ 19 blocked/slow  │ │ 0 blocked        ││
│  └──────────────────┘ └──────────────────┘│
│                      ↑ Hoàn toàn độc lập! │
└────────────────────────────────────────────┘
```

### 1.2 Thread Pool Bulkhead với Resilience4j

```java
// Cấu hình
BulkheadConfig bulkheadConfig = BulkheadConfig.custom()
    .maxConcurrentCalls(20)           // Tối đa 20 calls đồng thời
    .maxWaitDuration(Duration.ofMillis(100))  // Chờ tối đa 100ms nếu pool đầy
    .build();

// Hoặc ThreadPoolBulkhead (asynchronous, bounded queue)
ThreadPoolBulkheadConfig tpConfig = ThreadPoolBulkheadConfig.custom()
    .maxThreadPoolSize(20)
    .coreThreadPoolSize(10)
    .queueCapacity(100)
    .keepAliveDuration(Duration.ofMillis(20))
    .build();
```

```yaml
# application.yml
resilience4j:
  bulkhead:
    instances:
      payment-service:
        max-concurrent-calls: 20
        max-wait-duration: 100ms
      inventory-service:
        max-concurrent-calls: 30
        max-wait-duration: 50ms
  thread-pool-bulkhead:
    instances:
      notification-service:
        max-thread-pool-size: 10
        core-thread-pool-size: 5
        queue-capacity: 200
```

```java
@CircuitBreaker(name = "payment-service", fallbackMethod = "paymentFallback")
@Bulkhead(name = "payment-service", type = Bulkhead.Type.SEMAPHORE)
public PaymentResponse charge(ChargeRequest request) {
    return paymentClient.charge(request);
}

// Fallback khi bulkhead đầy
public PaymentResponse paymentFallback(ChargeRequest req, BulkheadFullException e) {
    log.warn("Bulkhead full for payment-service, rejecting request");
    throw new ServiceUnavailableException("Payment service busy, please retry");
}
```

### 1.3 Connection Pool Bulkhead

Database connection pool là bulkhead tự nhiên — nhưng cần cấu hình per-service:

```yaml
# Với HikariCP — connection pool cho Order Service
spring:
  datasource:
    hikari:
      maximum-pool-size: 20      # Max 20 connections
      minimum-idle: 5            # Luôn giữ 5 connections sẵn
      connection-timeout: 2000   # 2s timeout nếu không có connection
      idle-timeout: 600000       # Đóng connection không dùng sau 10 phút
      max-lifetime: 1800000      # Connection tồn tại tối đa 30 phút
      pool-name: "OrderServicePool"
```

---

## 2. Rate Limiting

### 2.1 Tại sao cần Rate Limiting?

```
Trường hợp cần:
- Ngăn một client/user gửi quá nhiều request (abuse)
- Bảo vệ downstream service khỏi overload
- Đảm bảo fair usage giữa các clients
- Monetization (free tier vs paid tier)

Ví dụ:
- API Gateway: 1000 req/min per API key
- Login endpoint: 5 attempts/minute per IP (brute force prevention)
- Webhook: 100 req/sec per tenant
```

### 2.2 Token Bucket Algorithm

```
┌────────────────────────────────────────────────────┐
│                  Token Bucket                      │
│                                                    │
│  Capacity: 100 tokens  ████████████████████        │
│  Refill rate: 10 tokens/second                     │
│                                                    │
│  Request đến → lấy 1 token                         │
│  Nếu có token: ✅ Allow                            │
│  Nếu trống:    ❌ Reject (429 Too Many Requests)   │
│                                                    │
│  Bucket tự refill theo thời gian                   │
└────────────────────────────────────────────────────┘

Ưu điểm:
- Cho phép burst ngắn (dùng hết tokens tích lũy)
- Smooth trong dài hạn
```

### 2.3 Sliding Window Algorithm

```
Window: 1 minute, limit: 100 requests

Timeline: |──────────────────────────────────|
          0s        20s        40s       60s

Requests: |||||||||||||||||||||||            |
          (100 requests trong 20s đầu)

Request thứ 101 tại 21s:
- Fixed window: ALLOW (window reset về 0)  ← Có thể bị abuse
- Sliding window: REJECT (70 requests trong 60s trước) ← Chính xác hơn
```

### 2.4 Rate Limiting tại API Gateway (Kong)

```yaml
# Kong Rate Limiting plugin
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: rate-limit-per-api-key
plugin: rate-limiting
config:
  minute: 1000          # 1000 req/min
  hour: 50000           # 50000 req/hour
  policy: redis          # Lưu counter trong Redis (cluster-aware)
  redis_host: redis.platform
  redis_port: 6379
  hide_client_headers: false  # Expose X-RateLimit-* headers to client
```

```yaml
# Gắn plugin vào một ingress route
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    konghq.com/plugins: rate-limit-per-api-key
```

### 2.5 Rate Limiting tại Service Level (Resilience4j)

```java
RateLimiterConfig config = RateLimiterConfig.custom()
    .limitForPeriod(100)                    // 100 permits per period
    .limitRefreshPeriod(Duration.ofSeconds(1))  // Refresh mỗi 1s
    .timeoutDuration(Duration.ofMillis(0))   // Reject ngay nếu không có permit
    .build();

RateLimiter rateLimiter = RateLimiterRegistry.of(config)
    .rateLimiter("order-creation");
```

```java
@RateLimiter(name = "order-creation", fallbackMethod = "rateLimitFallback")
public Order createOrder(CreateOrderRequest request) {
    return orderService.create(request);
}

public Order rateLimitFallback(CreateOrderRequest req, RequestNotPermitted e) {
    throw new TooManyRequestsException("Rate limit exceeded, please retry later");
}
```

### 2.6 Response Headers cho Rate Limiting

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 743
X-RateLimit-Reset: 1711879200

# Khi bị reject:
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1711879200
Retry-After: 47
Content-Type: application/json

{"error": "rate_limit_exceeded", "retry_after": 47}
```

---

## 3. Health Check Pattern

### 3.1 Ba loại Probe trong Kubernetes

```yaml
spec:
  containers:
    - name: order-service
      # Startup Probe: Service đã khởi động xong chưa?
      # K8s chờ startupProbe pass trước khi dùng liveness/readiness
      startupProbe:
        httpGet:
          path: /actuator/health/liveness
          port: 8080
        failureThreshold: 30    # 30 × 2s = 60s để start
        periodSeconds: 2

      # Liveness Probe: Service có đang chạy không?
      # Fail → K8s restart container
      livenessProbe:
        httpGet:
          path: /actuator/health/liveness
          port: 8080
        initialDelaySeconds: 0  # Sau khi startupProbe pass
        periodSeconds: 10
        failureThreshold: 3     # Restart sau 3 lần fail liên tiếp
        timeoutSeconds: 3

      # Readiness Probe: Service có sẵn sàng nhận traffic không?
      # Fail → K8s remove khỏi Service endpoints (không gửi traffic)
      readinessProbe:
        httpGet:
          path: /actuator/health/readiness
          port: 8080
        initialDelaySeconds: 0
        periodSeconds: 5
        failureThreshold: 3
        successThreshold: 1
        timeoutSeconds: 3
```

### 3.2 Liveness vs Readiness — Sự khác biệt quan trọng

```
LIVENESS: "Tôi có đang sống không?"
→ Fail → RESTART container
→ Check: không bị deadlock, heap không bị full, process không bị hang
→ Ví dụ fail: OutOfMemoryError, deadlock trong thread pool

READINESS: "Tôi có sẵn sàng nhận request không?"
→ Fail → REMOVE from load balancer (K8s Service endpoints)
→ Container không bị restart, vẫn chạy
→ Check: DB connection có sẵn, required caches đã warm, dependencies sẵn sàng
→ Ví dụ fail: DB connection pool full, warming up cache, throttled by upstream
```

### 3.3 Spring Boot Actuator Health

```java
// Tự động check:
// - Database connectivity
// - Disk space
// - Redis connectivity
// - Kafka connectivity (nếu dùng)

// Custom health indicator
@Component
public class OrderProcessorHealthIndicator implements HealthIndicator {

    private final OrderQueue queue;

    @Override
    public Health health() {
        int queueSize = queue.size();
        if (queueSize > 10000) {
            return Health.down()
                .withDetail("queue_size", queueSize)
                .withDetail("reason", "Queue backlog too large")
                .build();
        }

        return Health.up()
            .withDetail("queue_size", queueSize)
            .build();
    }
}
```

```yaml
# application.yml — cấu hình health groups
management:
  endpoint:
    health:
      show-details: always
      group:
        liveness:
          include: livenessState
          # Chỉ check internal state, không check external dependencies
        readiness:
          include: readinessState, db, redis, kafka
          # Check đủ dependencies trước khi nhận traffic
  health:
    db:
      enabled: true
    redis:
      enabled: true
```

Response `/actuator/health/readiness`:
```json
{
  "status": "UP",
  "components": {
    "db": { "status": "UP", "details": { "database": "PostgreSQL", "result": 1 } },
    "redis": { "status": "UP" },
    "kafka": { "status": "UP" },
    "readinessState": { "status": "UP" }
  }
}
```

### 3.4 Graceful Shutdown

```yaml
# application.yml
server:
  shutdown: graceful  # Chờ requests đang xử lý hoàn thành

spring:
  lifecycle:
    timeout-per-shutdown-phase: 30s  # Tối đa 30s chờ

# Kubernetes terminationGracePeriodSeconds phải > timeout-per-shutdown-phase
spec:
  terminationGracePeriodSeconds: 60
```

```java
@Bean
public GracefulShutdown gracefulShutdown() {
    return new GracefulShutdown();
}

// Sequence khi K8s gửi SIGTERM:
// 1. Readiness probe → FAIL (K8s ngừng gửi traffic)
// 2. Spring starts graceful shutdown
// 3. Hoàn thành requests đang xử lý
// 4. Close connections (DB, Kafka, Redis)
// 5. Application exit(0)
```

---

## 4. Combine All Patterns

Một service production-ready kết hợp tất cả:

```java
@Service
public class PaymentServiceClient {

    @Retry(name = "payment")
    @CircuitBreaker(name = "payment", fallbackMethod = "fallback")
    @Bulkhead(name = "payment", type = Type.SEMAPHORE)
    @RateLimiter(name = "payment-outbound")
    public PaymentResponse charge(ChargeRequest request) {
        return paymentClient.post("/charge", request, PaymentResponse.class);
    }

    public PaymentResponse fallback(ChargeRequest req, Throwable t) {
        if (t instanceof BulkheadFullException) {
            return PaymentResponse.queued(req.getOrderId());
        }
        if (t instanceof CallNotPermittedException) {
            return PaymentResponse.pending(req.getOrderId());
        }
        return PaymentResponse.failed(req.getOrderId(), t.getMessage());
    }
}
```

### Thứ tự thực thi (quan trọng!)

```
Request đến
    ↓
RateLimiter → Có đủ permit không?
    ↓
Bulkhead → Có slot không?
    ↓
CircuitBreaker → Circuit có CLOSED không?
    ↓
TimeLimiter → Đặt timeout
    ↓
Retry → Thực thi và retry nếu fail
    ↓
Actual call đến Payment Service
```

Khi wrap bằng annotations, thứ tự là reverse: Retry → CircuitBreaker → Bulkhead → RateLimiter.

---

## 5. Monitoring tổng hợp

```promql
# Bulkhead đang gần đầy
resilience4j_bulkhead_available_concurrent_calls{name="payment-service"} < 3

# Rate limiter đang throttle nhiều requests
rate(resilience4j_ratelimiter_waiting_threads{name="payment-outbound"}[5m]) > 0

# Restart count cao trong 1 giờ
increase(kube_pod_container_status_restarts_total{
  namespace="services-prod"
}[1h]) > 3
```

---

## Tóm tắt

| Pattern | Cơ chế | Bảo vệ khỏi |
|---------|--------|-------------|
| Bulkhead | Thread pool / semaphore isolation | Resource starvation chéo |
| Token Bucket | Token accumulation | Bursty traffic |
| Sliding Window | Rolling count | Sustained high traffic |
| Liveness Probe | Internal state check | Stuck/deadlock process |
| Readiness Probe | External dependency check | Traffic khi chưa sẵn sàng |
| Graceful Shutdown | Drain in-flight requests | Request loss khi deploy |

**Bài tiếp theo**: Chaos Engineering — Kiểm chứng độ tin cậy hệ thống
