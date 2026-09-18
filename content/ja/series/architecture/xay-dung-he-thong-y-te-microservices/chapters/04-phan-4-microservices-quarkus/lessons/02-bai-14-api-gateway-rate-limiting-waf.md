---
id: 019e1a40-a114-7001-d001-f0a1b2c30114
title: 'レッスン 14: API ゲートウェイ — レート制限、検証、WAF'
slug: bai-14-api-gateway-rate-limiting-waf
description: >-
  ヘルスケア API の API ゲートウェイ セキュリティ: Quarkus による API ゲートウェイ パターン、Redis によるレート制限
  (固定ウィンドウ、スライディング ウィンドウ、トークン バケット)、FHIR リソースの入力検証とサニタイズ、リクエスト/レスポンス
  フィルタリング、CORS 構成、コンテンツ セキュリティ ポリシー、Web アプリケーション ファイアウォールの統合、API
  バージョン管理のセキュリティに関する考慮事項。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 14
section_title: 'パート 4: Quarkus を使用したマイクロサービスの構築'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-3056" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-3056)"/>

  <!-- Decorations -->
  <g>
    <circle cx="872" cy="126" r="30" fill="#f87171" opacity="0.11"/>
    <circle cx="644" cy="158" r="26" fill="#f87171" opacity="0.07"/>
    <circle cx="916" cy="190" r="22" fill="#f87171" opacity="0.13"/>
    <circle cx="688" cy="222" r="18" fill="#f87171" opacity="0.09"/>
    <circle cx="960" cy="254" r="14" fill="#f87171" opacity="0.05"/>
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
    <line x1="600" y1="106" x2="1100" y2="186" stroke="#f87171" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="136" x2="1050" y2="206" stroke="#f87171" stroke-width="0.5" opacity="0.08"/>
    <polygon points="991.507041555162,135.5 991.507041555162,176.5 956,197 920.492958444838,176.5 920.492958444838,135.5 956,115" fill="none" stroke="#f87171" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f87171"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f87171" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ アーキテクチャ — レッスン 14</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 14: API ゲートウェイ — レート制限、</tspan>
      <tspan x="60" dy="42">検証とWAF</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 4: Quarkus を使用したマイクロサービスの構築</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. ヘルスケア向けの API ゲートウェイ パターン

![API Gateway Reference Architecture — WAF, Nginx, Quarkus Gateway](/storage/uploads/2026/04/healthcare-api-gateway-architecture.webp)


API ゲートウェイは、医療マイクロサービス システム全体の **単一のエントリ ポイント**として機能します。各サービスが独自に実装するのではなく、認証、レート制限、入力検証、監査ログ、セキュリティ ヘッダーなどの横断的な問題に焦点を当てています。

＃＃＃１．１．ゲートウェイのアーキテクチャ

```
┌─────────────────────────────────────────────────────────────┐
│                    Internet / Hospital Network               │
└───────────────────────────┬─────────────────────────────────┘
                            │
                     ┌──────▼──────┐
                     │   WAF       │  ◄── OWASP CRS Rules
                     │  (ModSec)   │      SQL Injection, XSS
                     └──────┬──────┘
                            │
                     ┌──────▼──────┐
                     │   Nginx     │  ◄── TLS Termination
                     │  Reverse    │      Rate Limiting (L7)
                     │  Proxy      │      Request Size Limit
                     └──────┬──────┘
                            │
              ┌─────────────▼─────────────┐
              │    Quarkus API Gateway     │
              │                            │
              │  ┌────────────────────┐    │
              │  │ OIDC Authentication│    │  ◄── JWT Verify
              │  └────────┬───────────┘    │
              │  ┌────────▼───────────┐    │
              │  │ Rate Limiter       │    │  ◄── Redis Backend
              │  │ (per-user/client)  │    │
              │  └────────┬───────────┘    │
              │  ┌────────▼───────────┐    │
              │  │ Input Validator    │    │  ◄── FHIR Validation
              │  │ + Sanitizer        │    │      JSON Schema
              │  └────────┬───────────┘    │
              │  ┌────────▼───────────┐    │
              │  │ Security Headers   │    │  ◄── CSP, HSTS
              │  └────────┬───────────┘    │
              │  ┌────────▼───────────┐    │
              │  │ Audit Logger       │    │  ◄── Kafka
              │  └────────┬───────────┘    │
              └───────────┼────────────────┘
                          │
           ┌──────────────┼──────────────┐
           ▼              ▼              ▼
    ┌────────────┐ ┌────────────┐ ┌────────────┐
    │ Patient    │ │ Lab        │ │ Pharmacy   │
    │ Service    │ │ Service    │ │ Service    │
    └────────────┘ └────────────┘ └────────────┘
```

＃＃＃１．２．ゲートウェイの責任

|レイヤー |責任 |ツール/実装 |
|------|------|----------|
|ネットワーク | TLS 終端 | Nginx/Envoy |
|周囲 | WAF ルール | ModSecurity + OWASP CRS |
|認証 | JWT 検証 |クォーカス OIDC |
|レート制限 |スロットリング | Redis + カスタムフィルター |
|検証 |入力のサニタイズ |ジャカルタ検証 + カスタム |
|ヘッダー |セキュリティヘッダー | JAX-RSフィルター |
|監査 |リクエストログ | Kafka + 構造化ログ |
|ルーティング |サービスディスカバリ | Quarkus REST クライアント |

## 2. Redis を使用したレート制限の実装

＃＃＃２．１．レート制限アルゴリズム - 比較

|アルゴリズム |利点 |デメリット |用途 |
|----------|-----------|---------------|----------|
|固定ウィンドウ |シンプル、低メモリ |窓の端でバースト | 写真 窓の端でバースト一般的な API |
|スライディングウィンドウ |より正確に |メモリを増やす |ヘルスケア API |
|トークンバケット |適切なバーストを許可する |より複雑な | FHIR エンドポイント |
|漏れやすいバケツ |交通をスムーズにする |バーストなし |リアルタイムデータ |

＃＃＃２．２． Redis の依存関係

```xml
<!-- pom.xml -->
<dependencies>
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-redis-client</artifactId>
    </dependency>
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-resteasy-reactive</artifactId>
    </dependency>
</dependencies>
```

＃＃＃２．３．スライディング ウィンドウ レート リミッター

```java
package vn.hospital.gateway.ratelimit;

import io.quarkus.redis.datasource.RedisDataSource;
import io.quarkus.redis.datasource.sortedset.SortedSetCommands;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.time.Instant;
import java.util.UUID;

@ApplicationScoped
public class SlidingWindowRateLimiter {

    @Inject
    RedisDataSource redis;

    /**
     * Sliding window rate limiter sử dụng Redis Sorted Set.
     *
     * @param key        Rate limit key (e.g., "rl:user:dr.nguyen:/api/v1/patients")
     * @param maxRequests Số request tối đa trong window
     * @param windowMs   Window size in milliseconds
     * @return RateLimitResult chứa allowed/denied và metadata
     */
    public RateLimitResult checkRateLimit(String key, int maxRequests,
                                           long windowMs) {
        SortedSetCommands<String, String> sortedSet =
            redis.sortedSet(String.class, String.class);

        long now = Instant.now().toEpochMilli();
        long windowStart = now - windowMs;

        // 1. Remove expired entries (outside window)
        sortedSet.zremrangebyscore(key, Double.NEGATIVE_INFINITY, windowStart);

        // 2. Count current entries in window
        long currentCount = sortedSet.zcard(key);

        if (currentCount >= maxRequests) {
            // Rate limit exceeded
            long oldestEntry = (long) sortedSet.zrangebyscoreWithScores(key, 
                windowStart, Double.POSITIVE_INFINITY)
                .stream().findFirst()
                .map(sv -> sv.score())
                .orElse((double) now);

            long retryAfterMs = (long) oldestEntry + windowMs - now;

            return new RateLimitResult(
                false,
                maxRequests,
                0,
                retryAfterMs / 1000  // seconds
            );
        }

        // 3. Add current request
        String member = UUID.randomUUID().toString();
        sortedSet.zadd(key, now, member);

        // 4. Set expiry on the key
        redis.key(String.class).expire(key, windowMs / 1000 + 10);

        return new RateLimitResult(
            true,
            maxRequests,
            (int) (maxRequests - currentCount - 1),
            0
        );
    }

    public record RateLimitResult(
        boolean allowed,
        int limit,
        int remaining,
        long retryAfterSeconds
    ) {}
}
```

＃＃＃２．４．レート制限の設定

```java
package vn.hospital.gateway.ratelimit;

import java.util.Map;

public class RateLimitConfig {

    // Rate limits per endpoint category
    public static final Map<String, RateLimit> ENDPOINT_LIMITS = Map.of(
        // FHIR endpoints - lower limits (sensitive data)
        "/api/v1/patients", new RateLimit(100, 60_000),     // 100/min
        "/api/v1/medical-records", new RateLimit(50, 60_000), // 50/min
        "/api/v1/prescriptions", new RateLimit(30, 60_000),  // 30/min

        // Lab results - moderate limits
        "/api/v1/lab-results", new RateLimit(200, 60_000),   // 200/min

        // Search endpoints - stricter limits
        "/api/v1/search", new RateLimit(20, 60_000),         // 20/min

        // Health check - generous limits
        "/health", new RateLimit(1000, 60_000)               // 1000/min
    );

    // Default rate limit
    public static final RateLimit DEFAULT = new RateLimit(300, 60_000);

    // Per-client rate limits (API keys)
    public static final Map<String, RateLimit> CLIENT_LIMITS = Map.of(
        "ehr-system", new RateLimit(5000, 60_000),     // EHR integration
        "mobile-app", new RateLimit(500, 60_000),      // Mobile app
        "third-party", new RateLimit(100, 60_000)      // Third-party apps
    );

    public record RateLimit(int maxRequests, long windowMs) {}
}
```

＃＃＃２．５。レート制限フィルター (JAX-RS)

```java
package vn.hospital.gateway.filter;

import io.quarkus.security.identity.SecurityIdentity;
import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import org.jboss.logging.Logger;
import vn.hospital.gateway.ratelimit.RateLimitConfig;
import vn.hospital.gateway.ratelimit.SlidingWindowRateLimiter;

import java.io.IOException;

@Provider
public class RateLimitFilter implements ContainerRequestFilter, ContainerResponseFilter {

    private static final Logger LOG = Logger.getLogger(RateLimitFilter.class);

    @Inject
    SlidingWindowRateLimiter rateLimiter;

    @Inject
    SecurityIdentity identity;

    @Override
    public void filter(ContainerRequestContext request) throws IOException {
        String path = request.getUriInfo().getPath();
        String userId = resolveUserId();
        String clientId = request.getHeaderString("X-API-Key");

        // 1. Per-user rate limit
        RateLimitConfig.RateLimit userLimit = resolveEndpointLimit(path);
        String userKey = "rl:user:" + userId + ":" + normalizePath(path);

        SlidingWindowRateLimiter.RateLimitResult userResult =
            rateLimiter.checkRateLimit(userKey, userLimit.maxRequests(),
                                       userLimit.windowMs());

        if (!userResult.allowed()) {
            LOG.warnf("Rate limit exceeded: user=%s, path=%s", userId, path);
            request.abortWith(
                Response.status(429)
                    .header("Retry-After", userResult.retryAfterSeconds())
                    .header("X-RateLimit-Limit", userResult.limit())
                    .header("X-RateLimit-Remaining", 0)
                    .entity("{\"error\":\"Rate limit exceeded\",\"retryAfter\":"
                            + userResult.retryAfterSeconds() + "}")
                    .build()
            );
            return;
        }

        // 2. Per-client rate limit (if API key present)
        if (clientId != null) {
            RateLimitConfig.RateLimit clientLimit =
                RateLimitConfig.CLIENT_LIMITS.getOrDefault(
                    clientId, RateLimitConfig.DEFAULT);
            String clientKey = "rl:client:" + clientId;

            SlidingWindowRateLimiter.RateLimitResult clientResult =
                rateLimiter.checkRateLimit(clientKey, clientLimit.maxRequests(),
                                           clientLimit.windowMs());

            if (!clientResult.allowed()) {
                request.abortWith(
                    Response.status(429)
                        .header("Retry-After", clientResult.retryAfterSeconds())
                        .entity("{\"error\":\"Client rate limit exceeded\"}")
                        .build()
                );
                return;
            }
        }

        // Store result for response headers
        request.setProperty("rateLimitResult", userResult);
    }

    @Override
    public void filter(ContainerRequestContext request,
                       ContainerResponseContext response) throws IOException {
        // Add rate limit headers to response
        SlidingWindowRateLimiter.RateLimitResult result =
            (SlidingWindowRateLimiter.RateLimitResult) request.getProperty("rateLimitResult");

        if (result != null) {
            response.getHeaders().add("X-RateLimit-Limit", result.limit());
            response.getHeaders().add("X-RateLimit-Remaining", result.remaining());
        }
    }

    private String resolveUserId() {
        if (identity != null && !identity.isAnonymous()) {
            return identity.getPrincipal().getName();
        }
        return "anonymous";
    }

    private RateLimitConfig.RateLimit resolveEndpointLimit(String path) {
        return RateLimitConfig.ENDPOINT_LIMITS.entrySet().stream()
            .filter(e -> path.startsWith(e.getKey()))
            .map(java.util.Map.Entry::getValue)
            .findFirst()
            .orElse(RateLimitConfig.DEFAULT);
    }

    private String normalizePath(String path) {
        // Normalize path: /api/v1/patients/123 → /api/v1/patients
        // Remove UUIDs and numeric IDs
        return path.replaceAll(
            "/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", "/{id}")
            .replaceAll("/\\d+", "/{id}");
    }
}
```

＃＃＃２．６． Redis の構成

```properties
# application.properties - Redis cho Rate Limiting
quarkus.redis.hosts=redis://redis.hospital.internal:6379
quarkus.redis.password=${REDIS_PASSWORD}
quarkus.redis.max-pool-size=20
quarkus.redis.max-pool-waiting=50

# TLS cho Redis
quarkus.redis.tls.enabled=true
quarkus.redis.tls.trust-store-path=classpath:redis-truststore.p12
quarkus.redis.tls.trust-store-password=${REDIS_TRUSTSTORE_PASSWORD}

# Dev profile
%dev.quarkus.redis.hosts=redis://localhost:6379
%dev.quarkus.redis.devservices.enabled=true
```

## 3. 入力の検証とサニタイズ

＃＃＃３．１． Quarkus RESTEasy 検証用リアクティブフィルター

```java
package vn.hospital.gateway.filter;

import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import org.jboss.logging.Logger;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Provider
public class InputValidationFilter implements ContainerRequestFilter {

    private static final Logger LOG = Logger.getLogger(InputValidationFilter.class);

    private static final int MAX_REQUEST_SIZE = 1_048_576; // 1MB
    private static final int MAX_HEADER_SIZE = 8192;       // 8KB

    @Inject
    InputSanitizer sanitizer;

    @Override
    public void filter(ContainerRequestContext request) throws IOException {
        // 1. Request size validation
        String contentLength = request.getHeaderString("Content-Length");
        if (contentLength != null) {
            try {
                long size = Long.parseLong(contentLength);
                if (size > MAX_REQUEST_SIZE) {
                    request.abortWith(
                        Response.status(413)
                            .entity("{\"error\":\"Request body too large\"}")
                            .build()
                    );
                    return;
                }
            } catch (NumberFormatException e) {
                request.abortWith(
                    Response.status(400)
                        .entity("{\"error\":\"Invalid Content-Length\"}")
                        .build()
                );
                return;
            }
        }

        // 2. Content-Type validation
        String contentType = request.getHeaderString("Content-Type");
        if (request.hasEntity() && !isAllowedContentType(contentType)) {
            request.abortWith(
                Response.status(415)
                    .entity("{\"error\":\"Unsupported media type\"}")
                    .build()
            );
            return;
        }

        // 3. Header injection prevention
        for (String headerName : request.getHeaders().keySet()) {
            for (String headerValue : request.getHeaders().get(headerName)) {
                if (headerValue.length() > MAX_HEADER_SIZE) {
                    request.abortWith(
                        Response.status(431)
                            .entity("{\"error\":\"Header too large\"}")
                            .build()
                    );
                    return;
                }
                if (containsHeaderInjection(headerValue)) {
                    LOG.warnf("Header injection detected: %s", headerName);
                    request.abortWith(
                        Response.status(400)
                            .entity("{\"error\":\"Invalid header value\"}")
                            .build()
                    );
                    return;
                }
            }
        }

        // 4. Query parameter sanitization
        request.getUriInfo().getQueryParameters().forEach((key, values) -> {
            values.forEach(value -> {
                if (containsSQLInjection(value) || containsXSS(value)) {
                    LOG.warnf("Malicious query param detected: %s=%s", key, value);
                }
            });
        });

        // 5. Body sanitization (for JSON payloads)
        if (request.hasEntity() && isJsonContent(contentType)) {
            byte[] body = request.getEntityStream().readAllBytes();
            String bodyStr = new String(body, StandardCharsets.UTF_8);

            if (containsSQLInjection(bodyStr)) {
                LOG.warn("SQL injection attempt detected in request body");
                request.abortWith(
                    Response.status(400)
                        .entity("{\"error\":\"Invalid request content\"}")
                        .build()
                );
                return;
            }

            String sanitized = sanitizer.sanitizeJson(bodyStr);
            request.setEntityStream(
                new ByteArrayInputStream(sanitized.getBytes(StandardCharsets.UTF_8)));
        }
    }

    private boolean isAllowedContentType(String contentType) {
        if (contentType == null) return true;
        return contentType.contains("application/json") ||
               contentType.contains("application/fhir+json") ||
               contentType.contains("application/xml") ||
               contentType.contains("application/fhir+xml") ||
               contentType.contains("multipart/form-data");
    }

    private boolean isJsonContent(String contentType) {
        return contentType != null &&
               (contentType.contains("application/json") ||
                contentType.contains("application/fhir+json"));
    }

    private boolean containsHeaderInjection(String value) {
        return value.contains("\r") || value.contains("\n");
    }

    private boolean containsSQLInjection(String input) {
        String upper = input.toUpperCase();
        // Basic SQL injection patterns
        return upper.matches(".*('\\s*(OR|AND)\\s*'?\\s*[\\d]\\s*=\\s*[\\d]).*") ||
               upper.matches(".*(UNION\\s+SELECT).*") ||
               upper.matches(".*(DROP\\s+TABLE).*") ||
               upper.matches(".*(INSERT\\s+INTO).*") ||
               upper.matches(".*(-{2}|/\\*|\\*/).*") ||
               upper.matches(".*(;\\s*(DELETE|UPDATE|INSERT|DROP|ALTER)).*");
    }

    private boolean containsXSS(String input) {
        return input.matches(".*<\\s*script[^>]*>.*") ||
               input.matches(".*javascript\\s*:.*") ||
               input.matches(".*on(load|error|click|mouseover)\\s*=.*");
    }
}
```

＃＃＃３．２．入力サニタイザー

```java
package vn.hospital.gateway.filter;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.TextNode;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.Iterator;
import java.util.Map;

@ApplicationScoped
public class InputSanitizer {

    @Inject
    ObjectMapper objectMapper;

    public String sanitizeJson(String json) {
        try {
            JsonNode root = objectMapper.readTree(json);
            sanitizeNode(root);
            return objectMapper.writeValueAsString(root);
        } catch (Exception e) {
            // If JSON is malformed, return as-is (validation will catch it)
            return json;
        }
    }

    private void sanitizeNode(JsonNode node) {
        if (node.isObject()) {
            ObjectNode obj = (ObjectNode) node;
            Iterator<Map.Entry<String, JsonNode>> fields = obj.fields();
            while (fields.hasNext()) {
                Map.Entry<String, JsonNode> field = fields.next();
                if (field.getValue().isTextual()) {
                    String sanitized = sanitizeString(field.getValue().asText());
                    obj.set(field.getKey(), new TextNode(sanitized));
                } else {
                    sanitizeNode(field.getValue());
                }
            }
        } else if (node.isArray()) {
            for (JsonNode element : node) {
                sanitizeNode(element);
            }
        }
    }

    public String sanitizeString(String input) {
        if (input == null) return null;

        // Remove null bytes
        String result = input.replace("\0", "");

        // Escape HTML entities
        result = result.replace("&", "&amp;")
                       .replace("<", "&lt;")
                       .replace(">", "&gt;")
                       .replace("\"", "&quot;")
                       .replace("'", "&#x27;");

        // Remove control characters (except newline, tab)
        result = result.replaceAll("[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]", "");

        return result;
    }
}
```

＃＃＃３．３． FHIR リソースの検証

```java
package vn.hospital.gateway.validation;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@ApplicationScoped
public class FhirResourceValidator {

    @Inject
    ObjectMapper objectMapper;

    // Allowed FHIR resource types
    private static final Set<String> ALLOWED_RESOURCE_TYPES = Set.of(
        "Patient", "Practitioner", "Observation", "MedicationRequest",
        "DiagnosticReport", "Encounter", "Condition", "AllergyIntolerance",
        "Immunization", "Procedure", "Bundle"
    );

    // Required fields per resource type
    private static final java.util.Map<String, Set<String>> REQUIRED_FIELDS = java.util.Map.of(
        "Patient", Set.of("resourceType", "name"),
        "Observation", Set.of("resourceType", "status", "code"),
        "MedicationRequest", Set.of("resourceType", "status", "intent", "medicationCodeableConcept")
    );

    public ValidationResult validate(String jsonBody, String expectedResourceType) {
        List<String> errors = new ArrayList<>();

        try {
            JsonNode root = objectMapper.readTree(jsonBody);

            // 1. Check resourceType
            JsonNode resourceType = root.get("resourceType");
            if (resourceType == null || !resourceType.isTextual()) {
                errors.add("Missing or invalid 'resourceType' field");
                return new ValidationResult(false, errors);
            }

            String type = resourceType.asText();
            if (!ALLOWED_RESOURCE_TYPES.contains(type)) {
                errors.add("Unknown resource type: " + type);
                return new ValidationResult(false, errors);
            }

            if (expectedResourceType != null && !expectedResourceType.equals(type)) {
                errors.add("Expected resource type " + expectedResourceType +
                           " but got " + type);
                return new ValidationResult(false, errors);
            }

            // 2. Check required fields
            Set<String> required = REQUIRED_FIELDS.getOrDefault(type, Set.of("resourceType"));
            for (String field : required) {
                if (!root.has(field) || root.get(field).isNull()) {
                    errors.add("Missing required field: " + field);
                }
            }

            // 3. Validate identifier format
            if (root.has("identifier")) {
                validateIdentifiers(root.get("identifier"), errors);
            }

            // 4. Check for dangerous extensions
            validateExtensions(root, errors);

            // 5. Validate narrative (text) doesn't contain XSS
            if (root.has("text")) {
                validateNarrative(root.get("text"), errors);
            }

        } catch (Exception e) {
            errors.add("Invalid JSON: " + e.getMessage());
        }

        return new ValidationResult(errors.isEmpty(), errors);
    }

    private void validateIdentifiers(JsonNode identifiers, List<String> errors) {
        if (!identifiers.isArray()) {
            errors.add("'identifier' must be an array");
            return;
        }

        for (JsonNode id : identifiers) {
            if (id.has("value")) {
                String value = id.get("value").asText();
                // Check for injection in identifier values
                if (value.length() > 256) {
                    errors.add("Identifier value too long (max 256 chars)");
                }
            }
        }
    }

    private void validateExtensions(JsonNode node, List<String> errors) {
        if (node.has("extension")) {
            for (JsonNode ext : node.get("extension")) {
                String url = ext.has("url") ? ext.get("url").asText() : "";
                // Only allow known extension URLs
                if (!url.startsWith("http://hl7.org/fhir/") &&
                    !url.startsWith("https://hospital.internal/fhir/")) {
                    errors.add("Unknown extension URL: " + url);
                }
            }
        }
    }

    private void validateNarrative(JsonNode text, List<String> errors) {
        if (text.has("div")) {
            String div = text.get("div").asText();
            // Check for script tags in narrative
            if (div.toLowerCase().contains("<script") ||
                div.toLowerCase().contains("javascript:") ||
                div.toLowerCase().contains("onerror=")) {
                errors.add("Narrative contains potentially dangerous content");
            }
        }
    }

    public record ValidationResult(boolean valid, List<String> errors) {}
}
```

## 4. ヘルスケア Web アプリの CORS 構成

＃＃＃４．１． Quarkus CORS 構成

```properties
# application.properties - CORS Configuration

# === CORS cho Healthcare Web App ===
quarkus.http.cors=true

# Allowed origins - chỉ trusted domains
quarkus.http.cors.origins=\
  https://portal.hospital-a.vn,\
  https://portal.hospital-b.vn,\
  https://admin.hospital.internal

# Allowed methods
quarkus.http.cors.methods=GET,POST,PUT,DELETE,PATCH,OPTIONS

# Allowed headers
quarkus.http.cors.headers=\
  Authorization,\
  Content-Type,\
  Accept,\
  X-Requested-With,\
  X-Tenant-ID,\
  X-Request-ID,\
  X-API-Key

# Exposed headers (accessible by JavaScript)
quarkus.http.cors.exposed-headers=\
  X-RateLimit-Limit,\
  X-RateLimit-Remaining,\
  X-Request-ID,\
  Location

# Allow credentials (cookies, authorization headers)
quarkus.http.cors.access-control-allow-credentials=true

# Preflight cache (seconds)
quarkus.http.cors.access-control-max-age=3600

# Dev profile - more permissive
%dev.quarkus.http.cors.origins=http://localhost:3000,http://localhost:5173
```

## 5. セキュリティヘッダー

＃＃＃５．１．セキュリティヘッダーフィルター

```java
package vn.hospital.gateway.filter;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.ext.Provider;

import java.io.IOException;

@Provider
public class SecurityHeadersFilter implements ContainerResponseFilter {

    @Override
    public void filter(ContainerRequestContext request,
                       ContainerResponseContext response) throws IOException {

        // --- Strict-Transport-Security ---
        // Force HTTPS cho 1 year, include subdomains
        response.getHeaders().add(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains; preload"
        );

        // --- Content-Security-Policy ---
        // Restrict resource loading sources
        response.getHeaders().add(
            "Content-Security-Policy",
            "default-src 'self'; " +
            "script-src 'self'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data: https://hospital.internal; " +
            "font-src 'self'; " +
            "connect-src 'self' https://keycloak.hospital.internal; " +
            "frame-ancestors 'none'; " +
            "base-uri 'self'; " +
            "form-action 'self'"
        );

        // --- X-Content-Type-Options ---
        // Prevent MIME type sniffing
        response.getHeaders().add("X-Content-Type-Options", "nosniff");

        // --- X-Frame-Options ---
        // Prevent clickjacking
        response.getHeaders().add("X-Frame-Options", "DENY");

        // --- X-XSS-Protection ---
        // Enable browser XSS filter (legacy, CSP is preferred)
        response.getHeaders().add("X-XSS-Protection", "1; mode=block");

        // --- Referrer-Policy ---
        // Don't leak referrer to external sites
        response.getHeaders().add("Referrer-Policy", "strict-origin-when-cross-origin");

        // --- Permissions-Policy ---
        // Restrict browser features
        response.getHeaders().add(
            "Permissions-Policy",
            "camera=(), microphone=(), geolocation=(), " +
            "payment=(), usb=(), magnetometer=()"
        );

        // --- Cache-Control ---
        // No caching for API responses containing PHI
        String path = request.getUriInfo().getPath();
        if (path.startsWith("/api/")) {
            response.getHeaders().add("Cache-Control",
                "no-store, no-cache, must-revalidate, private");
            response.getHeaders().add("Pragma", "no-cache");
            response.getHeaders().add("Expires", "0");
        }

        // --- X-Request-ID ---
        // Trace request across services
        String requestId = request.getHeaderString("X-Request-ID");
        if (requestId != null) {
            response.getHeaders().add("X-Request-ID", requestId);
        }
    }
}
```

＃＃＃５．２．セキュリティヘッダーのチェックリスト

|ヘッダー |値 |目的 |
|----------|----------|----------|
|厳格な輸送セキュリティ |最大年齢=31536000 | HTTPS を強制する |
|コンテンツ セキュリティ ポリシー |デフォルトソース 'self' |アンチ XSS |
| X-コンテンツ-タイプ-オプション |ノスニフ |アンチ MIME スニッフィング |
| X フレーム オプション |拒否 |クリックジャッキング対策 |
|リファラーポリシー |厳密な原点 | URL 漏洩保護 |
|アクセス許可ポリシー |カメラ=(), ... |ブラウザー API を制限する |
|キャッシュ制御 |無店舗 | PHI をキャッシュしない |

## 6. Web アプリケーション ファイアウォール (WAF)

＃＃＃６．１． OWASP CRS を使用した ModSecurity

```nginx
# /etc/nginx/nginx.conf - Nginx với ModSecurity WAF

load_module modules/ngx_http_modsecurity_module.so;

http {
    modsecurity on;
    modsecurity_rules_file /etc/nginx/modsecurity/main.conf;

    upstream api_gateway {
        server quarkus-gateway:8080;
        keepalive 32;
    }

    server {
        listen 443 ssl http2;
        server_name api.hospital.internal;

        # TLS Configuration
        ssl_certificate /etc/nginx/ssl/hospital-api.crt;
        ssl_certificate_key /etc/nginx/ssl/hospital-api.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
        ssl_prefer_server_ciphers off;

        # Request size limits
        client_max_body_size 1m;
        client_body_buffer_size 16k;
        client_header_buffer_size 1k;
        large_client_header_buffers 4 8k;

        # Timeouts
        client_body_timeout 10s;
        client_header_timeout 10s;
        send_timeout 10s;

        # Rate limiting (nginx-level)
        limit_req_zone $binary_remote_addr zone=api:10m rate=100r/s;
        limit_req zone=api burst=50 nodelay;
        limit_req_status 429;

        location /api/ {
            proxy_pass http://api_gateway;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-Request-ID $request_id;

            # Hide server info
            proxy_hide_header X-Powered-By;
            proxy_hide_header Server;
        }

        # Block common attack paths
        location ~* ^/(\.env|\.git|wp-admin|phpmyadmin|\.well-known/openid) {
            return 404;
        }

        # Health check (bypass WAF)
        location /health {
            modsecurity off;
            proxy_pass http://api_gateway;
        }
    }
}
```

＃＃＃６．２． ModSecurityの構成

```
# /etc/nginx/modsecurity/main.conf

Include /etc/nginx/modsecurity/modsecurity.conf
Include /usr/share/modsecurity-crs/crs-setup.conf
Include /usr/share/modsecurity-crs/rules/*.conf

# === Healthcare-specific rules ===

# Rule: Block requests with SSN patterns in URL/params
SecRule ARGS|ARGS_NAMES|REQUEST_URI "@rx \b\d{3}-?\d{2}-?\d{4}\b" \
    "id:100001,\
    phase:2,\
    deny,\
    status:400,\
    msg:'SSN pattern detected in request',\
    tag:'HEALTHCARE/PHI-LEAK',\
    severity:'CRITICAL',\
    logdata:'Matched Data: %{MATCHED_VAR}'"

# Rule: Block bulk data export without admin role
SecRule REQUEST_URI "@streq /api/v1/patients/export" \
    "id:100002,\
    phase:1,\
    chain"
    SecRule REQUEST_HEADERS:Authorization "!@contains admin" \
        "deny,\
        status:403,\
        msg:'Bulk export requires admin role',\
        tag:'HEALTHCARE/BULK-EXPORT'"

# Rule: Detect and log PHI-related endpoints
SecRule REQUEST_URI "@rx /api/v1/(patients|medical-records|prescriptions)" \
    "id:100003,\
    phase:1,\
    pass,\
    msg:'PHI endpoint accessed',\
    tag:'HEALTHCARE/PHI-ACCESS',\
    log"

# Rule: Limit JSON depth (prevent DoS via deep nesting)
SecRule REQUEST_BODY "@rx (\{[^}]*){20}" \
    "id:100004,\
    phase:2,\
    deny,\
    status:400,\
    msg:'JSON nesting too deep',\
    tag:'HEALTHCARE/INPUT-VALIDATION'"

# Rule: Block common injection in FHIR resource fields
SecRule REQUEST_BODY "@rx (\\x27|\\x22)\\s*(OR|AND|UNION|SELECT|DROP)" \
    "id:100005,\
    phase:2,\
    deny,\
    status:400,\
    msg:'SQL injection in request body',\
    tag:'HEALTHCARE/SQL-INJECTION'"
```

＃＃＃６．３．ヘルスケア向けの OWASP CRS チューニング

```
# /etc/nginx/modsecurity/crs-healthcare-tuning.conf

# Increase anomaly scoring threshold (reduce false positives)
SecAction "id:900110,phase:1,nolog,pass,t:none,\
    setvar:tx.inbound_anomaly_score_threshold=10,\
    setvar:tx.outbound_anomaly_score_threshold=5"

# Whitelist FHIR content types
SecRule REQUEST_HEADERS:Content-Type "@rx application/fhir\\+(json|xml)" \
    "id:900200,phase:1,pass,nolog,\
    ctl:ruleRemoveById=920420"

# Allow larger request bodies for FHIR Bundles
SecAction "id:900300,phase:1,nolog,pass,t:none,\
    setvar:tx.max_file_size=5242880"

# Disable body inspection for file uploads (radiology images)
SecRule REQUEST_URI "@rx /api/v1/imaging/upload" \
    "id:900400,phase:1,pass,nolog,\
    ctl:requestBodyAccess=Off"
```

## 7. API キーの管理

＃＃＃７．１． API キー検証フィルター

```java
package vn.hospital.gateway.filter;

import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import org.jboss.logging.Logger;

@Provider
@Priority(Priorities.AUTHENTICATION - 10)
public class ApiKeyFilter implements ContainerRequestFilter {

    private static final Logger LOG = Logger.getLogger(ApiKeyFilter.class);

    @Inject
    ApiKeyService apiKeyService;

    @Override
    public void filter(ContainerRequestContext request) {
        String path = request.getUriInfo().getPath();

        // Skip API key check for health endpoints
        if (path.startsWith("/health") || path.startsWith("/ready")) {
            return;
        }

        // Check for external API consumers (non-OIDC clients)
        String apiKey = request.getHeaderString("X-API-Key");
        if (apiKey == null) {
            apiKey = request.getUriInfo().getQueryParameters()
                .getFirst("api_key");
        }

        if (apiKey != null) {
            // Validate API key
            ApiKeyInfo keyInfo = apiKeyService.validate(apiKey);
            if (keyInfo == null) {
                LOG.warnf("Invalid API key from %s",
                    request.getHeaderString("X-Forwarded-For"));
                request.abortWith(
                    Response.status(401)
                        .entity("{\"error\":\"Invalid API key\"}")
                        .build()
                );
                return;
            }

            // Check if key is expired
            if (keyInfo.isExpired()) {
                request.abortWith(
                    Response.status(401)
                        .entity("{\"error\":\"API key expired\"}")
                        .build()
                );
                return;
            }

            // Check allowed endpoints
            if (!keyInfo.isAllowedPath(path)) {
                request.abortWith(
                    Response.status(403)
                        .entity("{\"error\":\"API key not authorized for this endpoint\"}")
                        .build()
                );
                return;
            }

            // Set client info for downstream use
            request.setProperty("apiKeyClient", keyInfo.getClientName());
            request.setProperty("apiKeyScopes", keyInfo.getScopes());
        }
    }
}
```

## 8. ヘルスチェックエンドポイントセキュリティ

### 8.1。安全なヘルスチェック

```java
package vn.hospital.gateway.health;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/health")
@Produces(MediaType.APPLICATION_JSON)
public class HealthResource {

    @Inject
    HealthCheckService healthService;

    // Public: liveness probe (Kubernetes)
    // Chỉ trả về status, không leak internal info
    @GET
    @Path("/live")
    @PermitAll
    public Response liveness() {
        return Response.ok("{\"status\":\"UP\"}").build();
    }

    // Public: readiness probe (Kubernetes)
    @GET
    @Path("/ready")
    @PermitAll
    public Response readiness() {
        boolean ready = healthService.isReady();
        int status = ready ? 200 : 503;
        return Response.status(status)
            .entity("{\"status\":\"" + (ready ? "UP" : "DOWN") + "\"}")
            .build();
    }

    // Protected: detailed health (có thông tin internal)
    @GET
    @Path("/detailed")
    @RolesAllowed("admin")
    public Response detailedHealth() {
        // Trả về chi tiết: DB connection, Redis, Keycloak status
        // Chỉ admin mới được xem
        return Response.ok(healthService.getDetailedHealth()).build();
    }
}
```

## 9. 監査のためのリクエスト/レスポンスのログ記録

＃＃＃９．１．監査ログフィルター

```java
package vn.hospital.gateway.filter;

import io.quarkus.security.identity.SecurityIdentity;
import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.ext.Provider;
import org.jboss.logging.Logger;

import java.io.IOException;
import java.time.Instant;
import java.util.UUID;

@Provider
public class AuditLoggingFilter implements ContainerRequestFilter, ContainerResponseFilter {

    private static final Logger LOG = Logger.getLogger(AuditLoggingFilter.class);

    @Inject
    SecurityIdentity identity;

    @Override
    public void filter(ContainerRequestContext request) throws IOException {
        String requestId = UUID.randomUUID().toString();
        request.setProperty("requestId", requestId);
        request.setProperty("requestStart", Instant.now().toEpochMilli());

        // Add request ID header for tracing
        request.getHeaders().add("X-Request-ID", requestId);
    }

    @Override
    public void filter(ContainerRequestContext request,
                       ContainerResponseContext response) throws IOException {
        String requestId = (String) request.getProperty("requestId");
        long startTime = (long) request.getProperty("requestStart");
        long duration = Instant.now().toEpochMilli() - startTime;

        String user = identity != null && !identity.isAnonymous()
            ? identity.getPrincipal().getName()
            : "anonymous";

        // Structured log cho audit
        LOG.infof(
            "AUDIT requestId=%s method=%s path=%s status=%d user=%s " +
            "clientIp=%s duration=%dms userAgent=%s",
            requestId,
            request.getMethod(),
            request.getUriInfo().getPath(),
            response.getStatus(),
            user,
            request.getHeaderString("X-Forwarded-For"),
            duration,
            request.getHeaderString("User-Agent")
        );
    }
}
```

## 概要

このレッスンでは、ヘルスケア マイクロサービス向けの包括的な **API ゲートウェイ セキュリティ**を構築しました。

1. **API ゲートウェイ パターン**: 一元化されたセキュリティ層 - 認証、レート制限、検証、監査を 1 か所で行う
2. **レート制限**: Redis を使用したスライディング ウィンドウ アルゴリズム — ユーザーごと、クライアントごと、エンドポイントごとの制限により悪用を防止します
3. **入力検証**: リクエスト サイズ制限、コンテンツ タイプ検証、SQL インジェクション / XSS 検出、FHIR リソース検証
4. **セキュリティ ヘッダー**: HSTS、CSP、X-Frame-Options、PHI 応答の Cache-Control no-store
5. **CORS**: 厳密なオリジン ホワイトリスト、認証情報のサポート、プリフライト キャッシュ
6. **WAF**: ModSecurity + OWASP CRS、カスタム ヘルスケア ルール (SSN 検出、PHI エンドポイント監視)
7. **API キー管理**: 外部コンシューマー向けの検証、有効期限、スコープベースのアクセス制御
8. **ヘルスチェックセキュリティ**: 公衆の活性/準備状態、詳細な健康状態の保護 - 内部情報漏洩なし
9. **監査ログ**: サービス全体にわたるリクエスト ID トレースによる構造化ログ

多層防御アーキテクチャ:
```
Internet ──► WAF (ModSecurity) ──► Nginx (TLS, rate limit) ──►
  ──► Quarkus Gateway (OIDC, validation, rate limit, audit) ──►
  ──► Microservices (RBAC, business logic) ──► Database (RLS)
```

## 演習

1. **レート リミッター**: Redis を使用してスライディング ウィンドウ レート リミッターを実装します。 Quarkusプロジェクトを作成します `quarkus-redis-client`。ユーザーごとのレート制限を 100 req/min に適用するフィルターを作成する `/api/v1/patients`、20 リクエスト/分 `/api/v1/search`。 150 リクエストを送信してテストし、ステータス 429 を確認します `Retry-After` ヘッダー。ヘッダ。

2. **入力検証フィルター**: 書き込み `InputValidationFilter` リクエスト サイズ (最大 1MB)、Content-Type ホワイトリスト、SQL インジェクション パターン、XSS パターンを確認します。書く `FhirResourceValidator` FHIR 患者リソース (必須フィールド、識別子の形式) を検証します。悪意のあるペイロードを使用してテストします。 `{'name': "'; DROP TABLE patients; --"}`。

3. **セキュリティ ヘッダー**: 実装する `SecurityHeadersFilter` すべてのヘッダーをチェックリストに追加します (HSTS、CSP、X-Frame-Options など)。でテストします `curl -I` 各ヘッダーが存在することを確認します。使用する [securityheaders.com](https://securityheaders.com) URL をスキャンします (デプロイされている場合)。

4. **WAF セットアップ**: Docker Compose セットアップ: Nginx + ModSecurity + OWASP CRS + Quarkus Gateway。ヘルスケア用の 3 つのカスタム ModSecurity ルール (SSN 検出、一括エクスポート制限、JSON 深さ制限) を作成します。 WAF ブロックのテスト: クエリ パラメーターでの SQL インジェクション、POST 本体での XSS、URL での SSN。

---

---

<!-- SERIES-NAV:START -->
| ◀ 前の記事 |次の記事 ▶ |
|:---|---:|
| [レッスン 13: Quarkus セキュリティ アーキテクチャ - OIDC 拡張機能、JWT 伝播、RBAC](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-13-quarkus-security-oidc-jwt-rbac) | [レッスン 15: マイクロサービスにおけるエンドツーエンドのデータ暗号化](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-15-ma-hoa-du-lieu-end-to-end-microservices) |
<!-- SERIES-NAV:END -->
