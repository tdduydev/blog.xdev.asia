---
id: 019c9617-fdab-73bd-8068-2844f0fc9f58
title: Spring Boot 中的斷路器模式
slug: circuit-breaker-pattern-trong-spring-boot-huong-dan-chi-tiet-tu-a-z
excerpt: >-
  使用 Resilience4j 學習 Spring Boot 中的斷路器模式 -
  從操作原理、詳細配置、實際範例到最佳實踐。完整的指南可協助您建立彈性微服務系統，防止級聯故障並在服務遇到問題時自動復原。
featured_image: /images/blog/circuit-breaker-featured.webp
type: blog
reading_time: 35
view_count: 1
meta: null
published_at: '2025-12-23T16:06:16.000000Z'
created_at: '2026-02-25T18:38:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9617-faa6-70d6-8679-ee4de1f177b3
  name: 開發營運
  slug: devops
tags:
  - name: devops
    slug: devops
  - name: Microservices
    slug: microservices
  - name: java
    slug: java
  - name: Spring Boot
    slug: spring-boot
  - name: Resilience4j
    slug: resilience4j
  - name: Circuit Breaker
    slug: circuit-breaker
  - name: Fault Tolerance
    slug: fault-tolerance
  - name: Design Pattern
    slug: design-pattern
comments: []
locale: zh-tw
---
<h2 id="1-gi%E1%BB%9Bi-thi%E1%BB%87u">一、簡介</h2><p><strong>斷路器</strong> （斷路器）是微服務架構中的重要設計模式，其靈感來自於現實生活中的斷路器設備。就像斷路器在偵測到過載時自動切斷電路以保護電氣系統一樣，軟體中的斷路器會自動中斷對出現問題的服務的請求以保護整個系統。</p><h3 id="pattern-n%C3%A0y-gi%E1%BA%A3i-quy%E1%BA%BFt-v%E1%BA%A5n-%C4%91%E1%BB%81-g%C3%AC">這個模式解決什麼問題？</h3><p>在微服務架構中，服務之間相互依賴。當服務崩潰（緩慢或無回應）時，如果沒有保護機制：</p><pre><code>[Service A] ---&gt; [Service B (đang chết)] ---&gt; timeout 30s
     ↓
  Threads bị block
     ↓
  Resource exhaustion
     ↓
  Service A cũng chết (Cascading Failure)
</code></pre><p>斷路器透過以下方式防止這種骨牌效應 <strong>快速失敗</strong> - 立即返回錯誤而不是徒勞等待。</p><hr><h2 id="2-t%E1%BA%A1i-sao-c%E1%BA%A7n-circuit-breaker">2. 為什麼需要斷路器？</h2><h3 id="21-v%E1%BA%A5n-%C4%91%E1%BB%81-cascading-failure">2.1.級聯故障問題</h3><pre><code>┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Gateway   │────▶│  Order Svc  │────▶│ Payment Svc │ ← Đang chết
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │Inventory Svc│
                    └─────────────┘
</code></pre><p>當支付服務終止時：</p><ol><li>訂單服務等待回應→線程被阻塞</li><li>對 Order Service 的請求增加 → 執行緒池耗盡</li><li>Order Service 無法處理新請求 → 也“死了”</li><li>網關逾時 → 使用者體驗不佳</li></ol><h3 id="22-l%E1%BB%A3i-%C3%ADch-c%E1%BB%A7a-circuit-breaker">2.2.斷路器的好處</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>好處</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>快速失敗</strong></td>
<td>立即返回錯誤，無需等待超時</td>
</tr>
<tr>
<td><strong>保護資源</strong></td>
<td>自由線程、連接</td>
</tr>
<tr>
<td><strong>自動恢復</strong></td>
<td>服務恢復時自我檢測並恢復</td>
</tr>
<tr>
<td><strong>優雅的降級</strong></td>
<td>提供後備響應而不是完整的錯誤</td>
</tr>
<tr>
<td><strong>監控</strong></td>
<td>提供有關依賴項運作狀況的指標</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<hr><h2 id="3-nguy%C3%AAn-l%C3%BD-ho%E1%BA%A1t-%C4%91%E1%BB%99ng">三、工作原理</h2><h3 id="31-ba-tr%E1%BA%A1ng-th%C3%A1i-c%E1%BB%A7a-circuit-breaker">3.1.斷路器的三種狀態</h3><pre><code>                    ┌──────────────────────────────────────┐
                    │                                      │
                    ▼                                      │
┌─────────┐    failure     ┌─────────┐    wait timeout    ┌─────────────┐
│ CLOSED  │───────────────▶│  OPEN   │──────────────────▶│ HALF_OPEN   │
│(Đóng)   │  threshold     │ (Mở)    │                   │ (Nửa mở)    │
└─────────┘                └─────────┘                   └─────────────┘
     ▲                          ▲                              │
     │                          │                              │
     │    success               │         failure              │
     └──────────────────────────┴──────────────────────────────┘
</code></pre><h4 id="closed-%C4%91%C3%B3ngtr%E1%BA%A1ng-th%C3%A1i-b%C3%ACnh-th%C6%B0%E1%BB%9Dng">CLOSED（關閉）-正常狀態</h4><ul><li>所有請求均被允許透過</li><li>斷路器監控錯誤率</li><li>當故障率超過閾值→切換到OPEN</li></ul><h4 id="open-m%E1%BB%9Ftr%E1%BA%A1ng-th%C3%A1i-b%E1%BA%A3o-v%E1%BB%87">OPEN（開路）－保護狀態</h4><ul><li>所有請求立即被拒絕</li><li>返回後備響應或異常</li><li>一段時間後（等待時長）→切換到HALF_OPEN</li></ul><h4 id="halfopen-n%E1%BB%ADa-m%E1%BB%9Ftr%E1%BA%A1ng-th%C3%A1i-th%E1%BB%AD-nghi%E1%BB%87m">HALF_OPEN（半開）-測試狀態</h4><ul><li>允許一定數量的請求通過進行測試</li><li>如果成功→返回CLOSED</li><li>如果失敗→回傳OPEN</li></ul><h3 id="32-sliding-window">3.2.滑動窗口</h3><p>Circuit Breaker 使用滑動視窗來計算故障率：</p><p><strong>基於計數的滑動視窗：</strong></p><pre><code>[Request 1: ✓] [Request 2: ✗] [Request 3: ✓] [Request 4: ✗] [Request 5: ✗]
                                                              ↑
                                              Failure rate = 3/5 = 60%
</code></pre><p><strong>基於時間的滑動視窗：</strong></p><pre><code>|-------- 10 seconds --------|
| ✓ ✗ ✓ ✗ ✗ ✓ ✗ ✗ ✓ ✓ |
| Failure rate = 5/10 = 50%  |
</code></pre><hr><h2 id="4-c%C3%A0i-%C4%91%E1%BA%B7t-v%E1%BB%9Bi-spring-boot-v%C3%A0-resilience4j">4. 使用 Spring Boot 和 Resilience4j 安裝</h2><h3 id="41-t%E1%BA%A1i-sao-ch%E1%BB%8Dn-resilience4j">4.1.為什麼選擇 Resilience4j？</h3><p>Hystrix (Netflix) 自 2018 年起已被棄用。 <strong>彈性4j</strong> 是推薦的函式庫：</p><ul><li>輕量級，無傳遞依賴</li><li>專為 Java 8+ 設計，採用函數式編程</li><li>與 Spring Boot 良好集成</li><li>響應式支援（Reactor 專案、RxJava）</li></ul><h3 id="42-dependencies">4.2.依賴關係</h3><pre><code class="language-xml">&lt;!-- pom.xml --&gt;
&lt;dependencyManagement&gt;
    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
            &lt;artifactId&gt;spring-cloud-dependencies&lt;/artifactId&gt;
            &lt;version&gt;2023.0.3&lt;/version&gt;
            &lt;type&gt;pom&lt;/type&gt;
            &lt;scope&gt;import&lt;/scope&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;
&lt;/dependencyManagement&gt;

&lt;dependencies&gt;
    &lt;!-- Spring Boot Starter --&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;
    &lt;/dependency&gt;
    
    &lt;!-- Resilience4j Circuit Breaker --&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
        &lt;artifactId&gt;spring-cloud-starter-circuitbreaker-resilience4j&lt;/artifactId&gt;
    &lt;/dependency&gt;
    
    &lt;!-- AOP cho annotations --&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-aop&lt;/artifactId&gt;
    &lt;/dependency&gt;
    
    &lt;!-- Actuator cho monitoring --&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-actuator&lt;/artifactId&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;
</code></pre><p>或使用 Gradle：</p><pre><code class="language-groovy">// build.gradle
ext {
    springCloudVersion = "2023.0.3"
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.cloud:spring-cloud-starter-circuitbreaker-resilience4j'
    implementation 'org.springframework.boot:spring-boot-starter-aop'
    implementation 'org.springframework.boot:spring-boot-starter-actuator'
}

dependencyManagement {
    imports {
        mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
    }
}
</code></pre><hr><h2 id="5-c%E1%BA%A5u-h%C3%ACnh-chi-ti%E1%BA%BFt">5. 詳細配置</h2><h3 id="51-c%E1%BA%A5u-h%C3%ACnh-qua-applicationyml">5.1.透過 application.yml 配置</h3><pre><code class="language-yaml"># application.yml
resilience4j:
  circuitbreaker:
    configs:
      # Cấu hình mặc định cho tất cả circuit breakers
      default:
        # Số lượng calls trong sliding window để tính failure rate
        slidingWindowSize: 10
        
        # Loại sliding window: COUNT_BASED hoặc TIME_BASED
        slidingWindowType: COUNT_BASED
        
        # Số calls tối thiểu trước khi tính failure rate
        minimumNumberOfCalls: 5
        
        # Tỷ lệ lỗi (%) để chuyển sang OPEN
        failureRateThreshold: 50
        
        # Tỷ lệ slow calls (%) để chuyển sang OPEN
        slowCallRateThreshold: 100
        
        # Thời gian được coi là slow call (ms)
        slowCallDurationThreshold: 2000
        
        # Thời gian ở trạng thái OPEN trước khi chuyển sang HALF_OPEN
        waitDurationInOpenState: 30s
        
        # Số calls được phép trong trạng thái HALF_OPEN
        permittedNumberOfCallsInHalfOpenState: 3
        
        # Tự động chuyển từ OPEN sang HALF_OPEN
        automaticTransitionFromOpenToHalfOpenEnabled: true
        
        # Các exception được ghi nhận là failure
        recordExceptions:
          - java.io.IOException
          - java.net.ConnectException
          - java.util.concurrent.TimeoutException
          - org.springframework.web.client.HttpServerErrorException
        
        # Các exception KHÔNG được ghi nhận là failure
        ignoreExceptions:
          - com.example.BusinessException
    
    # Cấu hình cho từng circuit breaker cụ thể
    instances:
      # Circuit breaker cho Payment Service
      paymentService:
        baseConfig: default
        failureRateThreshold: 30
        waitDurationInOpenState: 20s
        slidingWindowSize: 20
      
      # Circuit breaker cho Inventory Service
      inventoryService:
        baseConfig: default
        failureRateThreshold: 60
        slowCallDurationThreshold: 3000

# Actuator endpoints
management:
  endpoints:
    web:
      exposure:
        include: health,circuitbreakers,circuitbreakerevents
  health:
    circuitbreakers:
      enabled: true
  endpoint:
    health:
      show-details: always
</code></pre><h3 id="52-gi%E1%BA%A3i-th%C3%ADch-c%C3%A1c-tham-s%E1%BB%91-quan-tr%E1%BB%8Dng">5.2.重要參數說明</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>參數</th>
<th>描述</th>
<th>建議值</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>滑動視窗大小</code></td>
<td>計算失敗率的呼叫次數</td>
<td>10-100 取決於交通狀況</td>
</tr>
<tr>
<td><code>滑動視窗類型</code></td>
<td>COUNT_BASED 或 TIME_BASED</td>
<td>COUNT_BASED（低流量）</td>
</tr>
<tr>
<td><code>最小呼叫次數</code></td>
<td>評估前最少呼叫次數</td>
<td>5-10</td>
</tr>
<tr>
<td><code>失敗率閾值</code></td>
<td>開路誤差%</td>
<td>50%是常見的</td>
</tr>
<tr>
<td><code>開啟狀態等待持續時間</code></td>
<td>重試前超時</td>
<td>30秒-60秒</td>
</tr>
<tr>
<td><code>半開放狀態中允許的呼叫數量</code></td>
<td>HALF_OPEN 中的測試呼叫數量</td>
<td>3-10</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<hr><h2 id="6-v%C3%AD-d%E1%BB%A5-th%E1%BB%B1c-t%E1%BA%BF">6. 實際例子</h2><h3 id="61-c%E1%BA%A5u-tr%C3%BAc-project">6.1.項目結構</h3><pre><code>order-service/
├── src/main/java/com/example/order/
│   ├── OrderServiceApplication.java
│   ├── config/
│   │   └── Resilience4jConfig.java
│   ├── controller/
│   │   └── OrderController.java
│   ├── service/
│   │   ├── OrderService.java
│   │   └── PaymentServiceClient.java
│   ├── dto/
│   │   ├── OrderRequest.java
│   │   ├── OrderResponse.java
│   │   └── PaymentResponse.java
│   └── exception/
│       └── ServiceUnavailableException.java
├── src/main/resources/
│   └── application.yml
└── pom.xml
</code></pre><h3 id="62-payment-service-client-v%E1%BB%9Bi-circuit-breaker">6.2.帶有斷路器的支付服務客戶端</h3><pre><code class="language-java">package com.example.order.service;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import io.github.resilience4j.timelimiter.annotation.TimeLimiter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentServiceClient {
    
    private final RestTemplate restTemplate;
    private static final String PAYMENT_SERVICE_URL = "http://payment-service:8080";
    
    /**
     * Gọi Payment Service với Circuit Breaker bảo vệ
     * 
     * Thứ tự xử lý: Retry -&gt; CircuitBreaker -&gt; TimeLimiter -&gt; Bulkhead
     */
    @CircuitBreaker(name = "paymentService", fallbackMethod = "processPaymentFallback")
    @Retry(name = "paymentService")
    @TimeLimiter(name = "paymentService")
    public CompletableFuture&lt;PaymentResponse&gt; processPayment(PaymentRequest request) {
        log.info("Calling Payment Service for order: {}", request.getOrderId());
        
        return CompletableFuture.supplyAsync(() -&gt; {
            PaymentResponse response = restTemplate.postForObject(
                PAYMENT_SERVICE_URL + "/api/payments",
                request,
                PaymentResponse.class
            );
            
            log.info("Payment processed successfully: {}", response);
            return response;
        });
    }
    
    /**
     * Fallback method khi Circuit Breaker OPEN hoặc có lỗi
     * 
     * Phải có cùng parameters + thêm Exception/Throwable
     */
    public CompletableFuture&lt;PaymentResponse&gt; processPaymentFallback(
            PaymentRequest request, 
            Throwable throwable) {
        
        log.warn("Payment Service unavailable. Triggering fallback for order: {}. Error: {}", 
                request.getOrderId(), 
                throwable.getMessage());
        
        // Option 1: Trả về response mặc định
        PaymentResponse fallbackResponse = PaymentResponse.builder()
                .orderId(request.getOrderId())
                .status("PENDING")
                .message("Payment will be processed when service is available")
                .fallback(true)
                .build();
        
        // Option 2: Có thể queue lại để xử lý sau
        // paymentQueue.add(request);
        
        return CompletableFuture.completedFuture(fallbackResponse);
    }
    
    /**
     * Ví dụ với synchronous call (không dùng TimeLimiter)
     */
    @CircuitBreaker(name = "paymentService", fallbackMethod = "getPaymentStatusFallback")
    @Retry(name = "paymentService")
    public PaymentResponse getPaymentStatus(String paymentId) {
        log.info("Getting payment status for: {}", paymentId);
        
        return restTemplate.getForObject(
            PAYMENT_SERVICE_URL + "/api/payments/" + paymentId,
            PaymentResponse.class
        );
    }
    
    public PaymentResponse getPaymentStatusFallback(String paymentId, Throwable throwable) {
        log.warn("Cannot get payment status for: {}. Error: {}", paymentId, throwable.getMessage());
        
        return PaymentResponse.builder()
                .paymentId(paymentId)
                .status("UNKNOWN")
                .message("Service temporarily unavailable")
                .fallback(true)
                .build();
    }
}
</code></pre><h3 id="63-order-service">6.3.訂單服務</h3><pre><code class="language-java">package com.example.order.service;

import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {
    
    private final PaymentServiceClient paymentClient;
    private final InventoryServiceClient inventoryClient;
    private final OrderRepository orderRepository;
    private final CircuitBreakerRegistry circuitBreakerRegistry;
    
    public OrderResponse createOrder(OrderRequest request) {
        log.info("Creating order: {}", request);
        
        // 1. Kiểm tra inventory
        InventoryResponse inventory = inventoryClient.checkInventory(request.getProductId());
        
        if (!inventory.isAvailable()) {
            throw new InsufficientInventoryException("Product not available");
        }
        
        // 2. Tạo order với status PENDING
        Order order = Order.builder()
                .customerId(request.getCustomerId())
                .productId(request.getProductId())
                .quantity(request.getQuantity())
                .status(OrderStatus.PENDING)
                .build();
        
        order = orderRepository.save(order);
        
        // 3. Xử lý payment (có Circuit Breaker bảo vệ)
        try {
            PaymentResponse payment = paymentClient.processPayment(
                PaymentRequest.builder()
                    .orderId(order.getId())
                    .amount(request.getAmount())
                    .build()
            ).get(); // Blocking call
            
            if (payment.isFallback()) {
                // Payment đang trong queue, cần xử lý sau
                order.setStatus(OrderStatus.PAYMENT_PENDING);
            } else if ("SUCCESS".equals(payment.getStatus())) {
                order.setStatus(OrderStatus.CONFIRMED);
            } else {
                order.setStatus(OrderStatus.PAYMENT_FAILED);
            }
            
        } catch (Exception e) {
            log.error("Payment processing failed", e);
            order.setStatus(OrderStatus.PAYMENT_PENDING);
        }
        
        order = orderRepository.save(order);
        
        return OrderResponse.from(order);
    }
    
    /**
     * Kiểm tra trạng thái Circuit Breaker programmatically
     */
    public CircuitBreakerStatus getCircuitBreakerStatus(String name) {
        CircuitBreaker circuitBreaker = circuitBreakerRegistry.circuitBreaker(name);
        CircuitBreaker.Metrics metrics = circuitBreaker.getMetrics();
        
        return CircuitBreakerStatus.builder()
                .name(name)
                .state(circuitBreaker.getState().name())
                .failureRate(metrics.getFailureRate())
                .slowCallRate(metrics.getSlowCallRate())
                .numberOfBufferedCalls(metrics.getNumberOfBufferedCalls())
                .numberOfFailedCalls(metrics.getNumberOfFailedCalls())
                .numberOfSuccessfulCalls(metrics.getNumberOfSuccessfulCalls())
                .numberOfSlowCalls(metrics.getNumberOfSlowCalls())
                .build();
    }
}
</code></pre><h3 id="64-c%E1%BA%A5u-h%C3%ACnh-programmatic-thay-th%E1%BA%BF-cho-yaml">6.4.程式設定（YAML 的替代方案）</h3><pre><code class="language-java">package com.example.order.config;

import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerConfig;
import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;
import io.github.resilience4j.common.circuitbreaker.configuration.CircuitBreakerConfigCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.net.ConnectException;
import java.time.Duration;
import java.util.concurrent.TimeoutException;

@Configuration
public class Resilience4jConfig {
    
    @Bean
    public CircuitBreakerConfigCustomizer paymentServiceCustomizer() {
        return CircuitBreakerConfigCustomizer.of("paymentService", builder -&gt; 
            builder
                .slidingWindowType(CircuitBreakerConfig.SlidingWindowType.COUNT_BASED)
                .slidingWindowSize(10)
                .minimumNumberOfCalls(5)
                .failureRateThreshold(50)
                .slowCallRateThreshold(80)
                .slowCallDurationThreshold(Duration.ofSeconds(2))
                .waitDurationInOpenState(Duration.ofSeconds(30))
                .permittedNumberOfCallsInHalfOpenState(3)
                .automaticTransitionFromOpenToHalfOpenEnabled(true)
                .recordExceptions(
                    IOException.class,
                    ConnectException.class,
                    TimeoutException.class
                )
        );
    }
    
    /**
     * Tạo Circuit Breaker programmatically với custom config
     */
    @Bean
    public CircuitBreaker customCircuitBreaker() {
        CircuitBreakerConfig config = CircuitBreakerConfig.custom()
                .slidingWindowSize(20)
                .failureRateThreshold(40)
                .waitDurationInOpenState(Duration.ofSeconds(60))
                .permittedNumberOfCallsInHalfOpenState(5)
                .build();
        
        CircuitBreakerRegistry registry = CircuitBreakerRegistry.of(config);
        
        CircuitBreaker circuitBreaker = registry.circuitBreaker("customService");
        
        // Đăng ký event listeners
        circuitBreaker.getEventPublisher()
                .onStateTransition(event -&gt; 
                    System.out.println("State transition: " + event.getStateTransition()))
                .onFailureRateExceeded(event -&gt; 
                    System.out.println("Failure rate exceeded: " + event.getFailureRate()))
                .onCallNotPermitted(event -&gt; 
                    System.out.println("Call not permitted"))
                .onError(event -&gt; 
                    System.out.println("Error: " + event.getThrowable().getMessage()));
        
        return circuitBreaker;
    }
}
</code></pre><h3 id="65-s%E1%BB%AD-d%E1%BB%A5ng-v%E1%BB%9Bi-webclient-reactive">6.5.與 WebClient 一起使用（反應式）</h3><pre><code class="language-java">package com.example.order.service;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.reactor.circuitbreaker.operator.CircuitBreakerOperator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentServiceReactiveClient {
    
    private final WebClient webClient;
    private final io.github.resilience4j.circuitbreaker.CircuitBreaker circuitBreaker;
    
    /**
     * Cách 1: Sử dụng annotation
     */
    @CircuitBreaker(name = "paymentService", fallbackMethod = "processPaymentFallback")
    public Mono&lt;PaymentResponse&gt; processPayment(PaymentRequest request) {
        return webClient.post()
                .uri("/api/payments")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(PaymentResponse.class)
                .doOnSuccess(response -&gt; log.info("Payment successful: {}", response))
                .doOnError(error -&gt; log.error("Payment failed: {}", error.getMessage()));
    }
    
    public Mono&lt;PaymentResponse&gt; processPaymentFallback(PaymentRequest request, Throwable t) {
        log.warn("Fallback triggered for payment: {}", request.getOrderId());
        return Mono.just(PaymentResponse.builder()
                .orderId(request.getOrderId())
                .status("PENDING")
                .fallback(true)
                .build());
    }
    
    /**
     * Cách 2: Sử dụng operator programmatically
     */
    public Mono&lt;PaymentResponse&gt; processPaymentWithOperator(PaymentRequest request) {
        return webClient.post()
                .uri("/api/payments")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(PaymentResponse.class)
                .transformDeferred(CircuitBreakerOperator.of(circuitBreaker))
                .onErrorResume(throwable -&gt; {
                    log.warn("Circuit breaker triggered fallback");
                    return Mono.just(PaymentResponse.builder()
                            .status("PENDING")
                            .fallback(true)
                            .build());
                });
    }
}
</code></pre><h3 id="66-rest-controller-v%E1%BB%9Bi-circuit-breaker-status">6.6。具有斷路器狀態的 REST 控制器</h3><pre><code class="language-java">package com.example.order.controller;

import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    
    private final OrderService orderService;
    private final CircuitBreakerRegistry circuitBreakerRegistry;
    
    @PostMapping
    public ResponseEntity&lt;OrderResponse&gt; createOrder(@RequestBody OrderRequest request) {
        OrderResponse response = orderService.createOrder(request);
        return ResponseEntity.ok(response);
    }
    
    /**
     * Endpoint kiểm tra trạng thái Circuit Breakers
     */
    @GetMapping("/circuit-breakers/status")
    public ResponseEntity&lt;Map&lt;String, Object&gt;&gt; getCircuitBreakersStatus() {
        Map&lt;String, Object&gt; status = new HashMap&lt;&gt;();
        
        circuitBreakerRegistry.getAllCircuitBreakers().forEach(cb -&gt; {
            CircuitBreaker.Metrics metrics = cb.getMetrics();
            Map&lt;String, Object&gt; cbStatus = new HashMap&lt;&gt;();
            cbStatus.put("state", cb.getState().name());
            cbStatus.put("failureRate", metrics.getFailureRate());
            cbStatus.put("slowCallRate", metrics.getSlowCallRate());
            cbStatus.put("bufferedCalls", metrics.getNumberOfBufferedCalls());
            cbStatus.put("failedCalls", metrics.getNumberOfFailedCalls());
            cbStatus.put("successfulCalls", metrics.getNumberOfSuccessfulCalls());
            cbStatus.put("notPermittedCalls", metrics.getNumberOfNotPermittedCalls());
            
            status.put(cb.getName(), cbStatus);
        });
        
        return ResponseEntity.ok(status);
    }
    
    /**
     * Endpoint để manually transition Circuit Breaker
     * (Chỉ dùng cho testing/debugging)
     */
    @PostMapping("/circuit-breakers/{name}/transition/{state}")
    public ResponseEntity&lt;String&gt; transitionCircuitBreaker(
            @PathVariable String name,
            @PathVariable String state) {
        
        CircuitBreaker circuitBreaker = circuitBreakerRegistry.circuitBreaker(name);
        
        switch (state.toUpperCase()) {
            case "OPEN":
                circuitBreaker.transitionToOpenState();
                break;
            case "CLOSED":
                circuitBreaker.transitionToClosedState();
                break;
            case "HALF_OPEN":
                circuitBreaker.transitionToHalfOpenState();
                break;
            default:
                return ResponseEntity.badRequest().body("Invalid state");
        }
        
        return ResponseEntity.ok("Transitioned to " + state);
    }
}
</code></pre><hr><h2 id="7-khi-n%C3%A0o-n%C3%AAn-%C3%A1p-d%E1%BB%A5ng-circuit-breaker">7. 什麼時候應該使用斷路器？</h2><h3 id="71-n%C3%AAn-s%E1%BB%AD-d%E1%BB%A5ng-circuit-breaker-khi">7.1.在下列情況下應使用斷路器：</h3><h4 id="%E2%9C%85-g%E1%BB%8Di-external-services">✅ 致電外部服務</h4><pre><code class="language-java">// Gọi Payment Gateway (Stripe, VNPay, MoMo)
@CircuitBreaker(name = "paymentGateway")
public PaymentResult processPayment(PaymentRequest request) {
    return paymentGatewayClient.charge(request);
}

// Gọi SMS/Email Provider
@CircuitBreaker(name = "notificationService")
public void sendNotification(NotificationRequest request) {
    twilioClient.sendSMS(request);
}
</code></pre><h4 id="%E2%9C%85-giao-ti%E1%BA%BFp-gi%E1%BB%AFa-microservices">✅ 微服務之間的通信</h4><pre><code class="language-java">// Order Service → Inventory Service
@CircuitBreaker(name = "inventoryService")
public InventoryStatus checkStock(String productId) {
    return inventoryClient.getStock(productId);
}

// User Service → Auth Service
@CircuitBreaker(name = "authService")
public TokenInfo validateToken(String token) {
    return authClient.validate(token);
}
</code></pre><h4 id="%E2%9C%85-truy-c%E1%BA%ADp-database-qua-network">✅ 透過網路存取資料庫</h4><pre><code class="language-java">// Database cluster có thể unavailable
@CircuitBreaker(name = "databaseOperation")
public List&lt;Order&gt; getOrderHistory(String customerId) {
    return orderRepository.findByCustomerId(customerId);
}
</code></pre><h4 id="%E2%9C%85-g%E1%BB%8Di-third-party-apis">✅ 呼叫第三方API</h4><pre><code class="language-java">// Weather API, Exchange Rate API, Social Login
@CircuitBreaker(name = "weatherApi")
public WeatherData getCurrentWeather(String location) {
    return weatherApiClient.fetch(location);
}
</code></pre><h3 id="72-kh%C3%B4ng-n%C3%AAn-s%E1%BB%AD-d%E1%BB%A5ng-circuit-breaker-khi">7.2.在下列情況下不應使用斷路器：</h3><h4 id="%E2%9D%8C-operations-n%E1%BB%99i-b%E1%BB%99-kh%C3%B4ng-c%C3%B3-network-call">❌ 內部操作沒有網路調用</h4><pre><code class="language-java">// Tính toán local - KHÔNG cần Circuit Breaker
public BigDecimal calculateDiscount(Order order) {
    return order.getTotal().multiply(DISCOUNT_RATE);
}

// Validate input - KHÔNG cần Circuit Breaker
public boolean validateEmail(String email) {
    return EMAIL_PATTERN.matcher(email).matches();
}
</code></pre><h4 id="%E2%9D%8C-%C4%91%C3%A3-c%C3%B3-timeout-v%C3%A0-retry-%C4%91%E1%BB%A7-t%E1%BB%91t">❌ 逾時和重試就夠了</h4><pre><code class="language-java">// Nếu đã có cơ chế retry với exponential backoff
// và timeout hợp lý, có thể không cần thêm Circuit Breaker
</code></pre><h4 id="%E2%9D%8C-critical-operations-kh%C3%B4ng-th%E1%BB%83-fail">❌ 關鍵操作不能失敗</h4><pre><code class="language-java">// Ví dụ: Ghi log audit bắt buộc
// Không nên dùng Circuit Breaker vì không thể skip
</code></pre><h3 id="73-decision-matrix">7.3.決策矩陣</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>情況</th>
<th>斷路器？</th>
<th>原因</th>
</tr>
</thead>
<tbody>
<tr>
<td>來電支付服務</td>
<td>✅ 是的</td>
<td>外部服務，可下載</td>
</tr>
<tr>
<td>呼叫內部緩存</td>
<td>❌ 沒有</td>
<td>本地，無網路延遲</td>
</tr>
<tr>
<td>呼叫資料庫主資料庫</td>
<td>⚠️考慮</td>
<td>根據設置，通常有一個連接池</td>
</tr>
<tr>
<td>呼叫訊息隊列</td>
<td>✅ 是的</td>
<td>網路調用，可能超時</td>
</tr>
<tr>
<td>讀取本地文件</td>
<td>❌ 沒有</td>
<td>本地 I/O，不需要</td>
</tr>
<tr>
<td>呼叫 OAuth 提供者</td>
<td>✅ 是的</td>
<td>外部服務，關鍵</td>
</tr>
<tr>
<td>CPU密集型運算</td>
<td>❌ 沒有</td>
<td>不是網路問題</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="74-k%E1%BA%BFt-h%E1%BB%A3p-v%E1%BB%9Bi-c%C3%A1c-pattern-kh%C3%A1c">7.4.與其他模式結合</h3><pre><code class="language-yaml"># Thứ tự áp dụng (từ ngoài vào trong):
# Retry -&gt; CircuitBreaker -&gt; RateLimiter -&gt; TimeLimiter -&gt; Bulkhead

resilience4j:
  retry:
    instances:
      paymentService:
        maxAttempts: 3
        waitDuration: 1s
        retryExceptions:
          - java.io.IOException
  
  circuitbreaker:
    instances:
      paymentService:
        failureRateThreshold: 50
        waitDurationInOpenState: 30s
  
  ratelimiter:
    instances:
      paymentService:
        limitForPeriod: 100
        limitRefreshPeriod: 1s
  
  timelimiter:
    instances:
      paymentService:
        timeoutDuration: 5s
  
  bulkhead:
    instances:
      paymentService:
        maxConcurrentCalls: 10
        maxWaitDuration: 500ms
</code></pre><hr><h2 id="8-monitoring-v%C3%A0-observability">8. 監控和可觀察性</h2><h3 id="81-actuator-endpoints">8.1.執行器端點</h3><pre><code class="language-yaml"># application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,circuitbreakers,circuitbreakerevents
  health:
    circuitbreakers:
      enabled: true
  endpoint:
    health:
      show-details: always
</code></pre><p><strong>可用端點：</strong></p><pre><code class="language-bash"># Xem tất cả circuit breakers
GET /actuator/circuitbreakers

# Xem events của circuit breaker cụ thể
GET /actuator/circuitbreakerevents
GET /actuator/circuitbreakerevents/{name}

# Health check bao gồm circuit breaker status
GET /actuator/health
</code></pre><p><strong>回應範例：</strong></p><pre><code class="language-json">// GET /actuator/circuitbreakers
{
  "circuitBreakers": {
    "paymentService": {
      "failureRate": "25.0%",
      "slowCallRate": "10.0%",
      "failureRateThreshold": "50.0%",
      "slowCallRateThreshold": "100.0%",
      "bufferedCalls": 20,
      "failedCalls": 5,
      "slowCalls": 2,
      "slowFailedCalls": 1,
      "notPermittedCalls": 0,
      "state": "CLOSED"
    }
  }
}
</code></pre><h3 id="82-t%C3%ADch-h%E1%BB%A3p-prometheus-grafana">8.2. Prometheus + Grafana 集成</h3><pre><code class="language-xml">&lt;!-- Thêm dependency --&gt;
&lt;dependency&gt;
    &lt;groupId&gt;io.micrometer&lt;/groupId&gt;
    &lt;artifactId&gt;micrometer-registry-prometheus&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><pre><code class="language-yaml"># application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,prometheus,circuitbreakers
  prometheus:
    metrics:
      export:
        enabled: true
</code></pre><p><strong>可用指標：</strong></p><pre><code class="language-prometheus"># Số lượng calls theo trạng thái
resilience4j_circuitbreaker_calls_total{name="paymentService",kind="successful"} 150
resilience4j_circuitbreaker_calls_total{name="paymentService",kind="failed"} 10
resilience4j_circuitbreaker_calls_total{name="paymentService",kind="not_permitted"} 5

# Trạng thái circuit breaker (0=CLOSED, 1=OPEN, 2=HALF_OPEN)
resilience4j_circuitbreaker_state{name="paymentService",state="closed"} 1

# Failure rate
resilience4j_circuitbreaker_failure_rate{name="paymentService"} 6.25

# Slow call rate
resilience4j_circuitbreaker_slow_call_rate{name="paymentService"} 2.5
</code></pre><h3 id="83-custom-event-handler">8.3.自訂事件處理程序</h3><pre><code class="language-java">package com.example.order.config;

import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;
import io.github.resilience4j.circuitbreaker.event.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;

@Configuration
@Slf4j
public class CircuitBreakerEventConfig {
    
    private final CircuitBreakerRegistry registry;
    private final AlertService alertService;
    
    public CircuitBreakerEventConfig(CircuitBreakerRegistry registry, 
                                      AlertService alertService) {
        this.registry = registry;
        this.alertService = alertService;
    }
    
    @PostConstruct
    public void registerEventConsumers() {
        registry.getAllCircuitBreakers().forEach(this::registerEventConsumer);
        
        // Đăng ký cho các circuit breakers được tạo sau
        registry.getEventPublisher()
                .onEntryAdded(event -&gt; registerEventConsumer(event.getAddedEntry()));
    }
    
    private void registerEventConsumer(CircuitBreaker circuitBreaker) {
        circuitBreaker.getEventPublisher()
                .onStateTransition(this::handleStateTransition)
                .onFailureRateExceeded(this::handleFailureRateExceeded)
                .onCallNotPermitted(this::handleCallNotPermitted)
                .onError(this::handleError)
                .onSuccess(this::handleSuccess);
    }
    
    private void handleStateTransition(CircuitBreakerOnStateTransitionEvent event) {
        String message = String.format(
            "Circuit Breaker '%s' transitioned from %s to %s",
            event.getCircuitBreakerName(),
            event.getStateTransition().getFromState(),
            event.getStateTransition().getToState()
        );
        
        log.warn(message);
        
        // Gửi alert khi chuyển sang OPEN
        if (event.getStateTransition().getToState() == CircuitBreaker.State.OPEN) {
            alertService.sendAlert(
                AlertLevel.HIGH,
                "Circuit Breaker OPENED",
                message
            );
        }
        
        // Gửi notification khi recovery (về CLOSED)
        if (event.getStateTransition().getToState() == CircuitBreaker.State.CLOSED 
            &amp;&amp; event.getStateTransition().getFromState() == CircuitBreaker.State.HALF_OPEN) {
            alertService.sendNotification(
                "Circuit Breaker RECOVERED",
                message
            );
        }
    }
    
    private void handleFailureRateExceeded(CircuitBreakerOnFailureRateExceededEvent event) {
        log.error("Failure rate exceeded for '{}': {}%", 
            event.getCircuitBreakerName(), 
            event.getFailureRate());
    }
    
    private void handleCallNotPermitted(CircuitBreakerOnCallNotPermittedEvent event) {
        log.debug("Call not permitted for '{}'", event.getCircuitBreakerName());
    }
    
    private void handleError(CircuitBreakerOnErrorEvent event) {
        log.error("Error in '{}': {}", 
            event.getCircuitBreakerName(), 
            event.getThrowable().getMessage());
    }
    
    private void handleSuccess(CircuitBreakerOnSuccessEvent event) {
        log.trace("Successful call to '{}' in {}ms", 
            event.getCircuitBreakerName(),
            event.getElapsedDuration().toMillis());
    }
}
</code></pre><hr><h2 id="9-best-practices">9. 最佳實踐</h2><h3 id="91-thi%E1%BA%BFt-k%E1%BA%BF-fallback-strategy">9.1.後備策略設計</h3><pre><code class="language-java">/**
 * Các chiến lược Fallback phổ biến
 */
public class FallbackStrategies {
    
    // 1. Trả về giá trị mặc định
    public ProductInfo getProductFallback(String productId, Throwable t) {
        return ProductInfo.builder()
                .id(productId)
                .name("Product information temporarily unavailable")
                .available(false)
                .build();
    }
    
    // 2. Trả về dữ liệu từ cache
    @Autowired
    private CacheManager cacheManager;
    
    public ProductInfo getProductFromCacheFallback(String productId, Throwable t) {
        Cache cache = cacheManager.getCache("products");
        ProductInfo cached = cache.get(productId, ProductInfo.class);
        
        if (cached != null) {
            cached.setFromCache(true);
            return cached;
        }
        
        return getProductFallback(productId, t);
    }
    
    // 3. Gọi service backup
    public ProductInfo getProductFromBackupServiceFallback(String productId, Throwable t) {
        try {
            return backupProductService.getProduct(productId);
        } catch (Exception e) {
            return getProductFromCacheFallback(productId, t);
        }
    }
    
    // 4. Queue để xử lý sau (async fallback)
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    public OrderResponse createOrderAsyncFallback(OrderRequest request, Throwable t) {
        // Lưu vào queue để xử lý sau
        rabbitTemplate.convertAndSend("order-retry-queue", request);
        
        return OrderResponse.builder()
                .status("QUEUED")
                .message("Your order is being processed")
                .estimatedProcessingTime("5 minutes")
                .build();
    }
    
    // 5. Graceful degradation - giảm tính năng
    public RecommendationResponse getRecommendationsFallback(String userId, Throwable t) {
        // Thay vì personalized recommendations, trả về popular items
        return RecommendationResponse.builder()
                .items(popularItemsCache.getTopItems(10))
                .type("POPULAR") // Thay vì "PERSONALIZED"
                .message("Showing popular items")
                .build();
    }
}
</code></pre><h3 id="92-tuning-parameters">9.2.調整參數</h3><pre><code class="language-yaml"># Development/Testing environment
resilience4j:
  circuitbreaker:
    configs:
      development:
        slidingWindowSize: 5           # Window nhỏ để test nhanh
        minimumNumberOfCalls: 3        # Ít calls để trigger sớm
        failureRateThreshold: 50
        waitDurationInOpenState: 10s   # Recovery nhanh
        permittedNumberOfCallsInHalfOpenState: 2

# Production environment
resilience4j:
  circuitbreaker:
    configs:
      production:
        slidingWindowSize: 100         # Window lớn hơn, ổn định hơn
        minimumNumberOfCalls: 20       # Cần nhiều data points
        failureRateThreshold: 50
        slowCallRateThreshold: 80      # Theo dõi slow calls
        slowCallDurationThreshold: 3s
        waitDurationInOpenState: 60s   # Chờ lâu hơn
        permittedNumberOfCallsInHalfOpenState: 10
</code></pre><h3 id="93-testing-circuit-breaker">9.3.測試斷路器</h3><pre><code class="language-java">package com.example.order.service;

import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
class PaymentServiceClientTest {
    
    @Autowired
    private PaymentServiceClient paymentClient;
    
    @Autowired
    private CircuitBreakerRegistry circuitBreakerRegistry;
    
    @MockBean
    private RestTemplate restTemplate;
    
    private CircuitBreaker circuitBreaker;
    
    @BeforeEach
    void setUp() {
        circuitBreaker = circuitBreakerRegistry.circuitBreaker("paymentService");
        circuitBreaker.reset(); // Reset state before each test
    }
    
    @Test
    void shouldReturnSuccessfulResponse() {
        // Given
        PaymentResponse expectedResponse = PaymentResponse.builder()
                .status("SUCCESS")
                .build();
        when(restTemplate.postForObject(any(), any(), any()))
                .thenReturn(expectedResponse);
        
        // When
        PaymentResponse response = paymentClient.processPayment(
                PaymentRequest.builder().orderId("123").build()
        ).join();
        
        // Then
        assertThat(response.getStatus()).isEqualTo("SUCCESS");
        assertThat(response.isFallback()).isFalse();
        assertThat(circuitBreaker.getState()).isEqualTo(CircuitBreaker.State.CLOSED);
    }
    
    @Test
    void shouldOpenCircuitAfterFailures() {
        // Given - Circuit breaker có threshold 50%, window size 10
        when(restTemplate.postForObject(any(), any(), any()))
                .thenThrow(new RuntimeException("Service unavailable"));
        
        // When - Gọi nhiều lần để trigger circuit breaker
        for (int i = 0; i &lt; 10; i++) {
            try {
                paymentClient.processPayment(
                        PaymentRequest.builder().orderId("123").build()
                ).join();
            } catch (Exception ignored) {
            }
        }
        
        // Then
        assertThat(circuitBreaker.getState()).isEqualTo(CircuitBreaker.State.OPEN);
    }
    
    @Test
    void shouldReturnFallbackWhenCircuitOpen() {
        // Given
        circuitBreaker.transitionToOpenState();
        
        // When
        PaymentResponse response = paymentClient.processPayment(
                PaymentRequest.builder().orderId("123").build()
        ).join();
        
        // Then
        assertThat(response.isFallback()).isTrue();
        assertThat(response.getStatus()).isEqualTo("PENDING");
        verify(restTemplate, never()).postForObject(any(), any(), any());
    }
    
    @Test
    void shouldTransitionToHalfOpenAfterWaitDuration() throws InterruptedException {
        // Given
        circuitBreaker.transitionToOpenState();
        
        // When - Chờ hết waitDurationInOpenState (đã config là 10s trong test profile)
        Thread.sleep(11000);
        
        // Then
        assertThat(circuitBreaker.getState()).isEqualTo(CircuitBreaker.State.HALF_OPEN);
    }
    
    @Test
    void shouldCloseAfterSuccessfulCallsInHalfOpen() {
        // Given
        circuitBreaker.transitionToHalfOpenState();
        when(restTemplate.postForObject(any(), any(), any()))
                .thenReturn(PaymentResponse.builder().status("SUCCESS").build());
        
        // When - Số calls thành công &gt;= permittedNumberOfCallsInHalfOpenState
        for (int i = 0; i &lt; 3; i++) {
            paymentClient.processPayment(
                    PaymentRequest.builder().orderId("123").build()
            ).join();
        }
        
        // Then
        assertThat(circuitBreaker.getState()).isEqualTo(CircuitBreaker.State.CLOSED);
    }
}
</code></pre><h3 id="94-common-mistakes-to-avoid">9.4.要避免的常見錯誤</h3><pre><code class="language-java">/**
 * ❌ SAI: Fallback method signature không đúng
 */
@CircuitBreaker(name = "service", fallbackMethod = "fallback")
public String callService(String param) {
    return service.call(param);
}

// ❌ Thiếu Throwable parameter
public String fallback(String param) {  // Sẽ không được gọi!
    return "default";
}

// ✅ ĐÚNG: Phải có Throwable/Exception
public String fallback(String param, Throwable t) {
    return "default";
}

/**
 * ❌ SAI: Catch exception trong method
 */
@CircuitBreaker(name = "service")
public String callService() {
    try {
        return service.call();
    } catch (Exception e) {
        return "error";  // Circuit Breaker không thấy failure!
    }
}

// ✅ ĐÚNG: Để exception propagate
@CircuitBreaker(name = "service", fallbackMethod = "fallback")
public String callService() {
    return service.call();  // Throw exception nếu fail
}

/**
 * ❌ SAI: Self-invocation (gọi method trong cùng class)
 */
@Service
public class MyService {
    
    @CircuitBreaker(name = "service")
    public String callService() {
        return externalService.call();
    }
    
    public String doSomething() {
        return callService();  // Circuit Breaker không work!
    }
}

// ✅ ĐÚNG: Gọi từ class khác hoặc inject self
@Service
public class MyService {
    
    @Autowired
    private MyService self;  // Hoặc inject từ ApplicationContext
    
    @CircuitBreaker(name = "service")
    public String callService() {
        return externalService.call();
    }
    
    public String doSomething() {
        return self.callService();  // Đi qua proxy, Circuit Breaker work!
    }
}

/**
 * ❌ SAI: Không set timeout, leading to thread exhaustion
 */
@CircuitBreaker(name = "service")
public String callSlowService() {
    return slowService.call();  // Có thể block 60s!
}

// ✅ ĐÚNG: Kết hợp với TimeLimiter
@CircuitBreaker(name = "service")
@TimeLimiter(name = "service")  // Timeout sau 5s
public CompletableFuture&lt;String&gt; callSlowService() {
    return CompletableFuture.supplyAsync(() -&gt; slowService.call());
}
</code></pre><hr><h2 id="10-k%E1%BA%BFt-lu%E1%BA%ADn">10. 結論</h2><h3 id="101-t%C3%B3m-t%E1%BA%AFt">10.1.總結</h3><p>斷路器是微服務架構中不可或缺的模式，可以：</p><ol><li><strong>防止級聯故障</strong> - 保護您的系統免受骨牌效應的影響</li><li><strong>快速失敗</strong> - 立即返回錯誤而不是等待超時</li><li><strong>自我修復</strong> - 當依賴服務再次工作時自動恢復</li><li><strong>優雅的降級</strong> - 提供後備方案而不是完全失敗</li></ol><h3 id="102-checklist-tri%E1%BB%83n-khai">10.2.部署清單</h3><ul><li>[ ] 識別需要保護的外部依賴項</li><li>[ ] 新增 Resilience4j 依賴項</li><li>[ ] 適當配置斷路器參數</li><li>[ ] 為所有斷路器實施回退方法</li><li>[ ] 使用Actuator + Prometheus添加監控</li><li>[ ] 設定狀態轉換警報</li><li>[ ] 為斷路器行為編寫單元測試</li><li>[ ] 根據生產指標調整參數</li></ul><h3 id="103-resources">10.3.資源</h3><ul><li><a href="https://resilience4j.readme.io/">Resilience4j 官方文檔</a></li><li><a href="https://spring.io/projects/spring-cloud-circuitbreaker">Spring Cloud 斷路器</a></li><li><a href="https://martinfowler.com/bliki/CircuitBreaker.html">馬丁福勒 - 斷路器</a></li><li><a href="https://pragprog.com/titles/mnee2/release-it-second-edition/">釋放它！ ——麥可‧尼加德</a></li></ul><hr><p><em>本文是為 Spring Boot 高級系列編寫的 - 適合想要建立彈性微服務系統的後端開發人員和 DevOps 工程師。</em></p>
