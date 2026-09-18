---
id: 019e2a10-a103-7a01-b001-f1a2b3c4d503
title: 'レッスン 3: Quarkus REST — プロフェッショナルな RESTful API の構築'
slug: bai-3-quarkus-rest-xay-dung-restful-api-chuyen-nghiep
description: >-
  @Path、@GET、@POST、JSON シリアル化、CORS、OpenAPI および Swagger UI、API バージョン管理を備えた
  Quarkus REST (Jakarta REST)。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 2
section_title: 'パート 1: Quarkus プラットフォームとプロジェクトのセットアップ'
course:
  id: 019e2a10-a100-7a01-b001-f1a2b3c4d5e6
  title: 'Quarkus マイクロサービス: 基本から運用まで'
  slug: quarkus-microservices-tu-co-ban-den-production
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-3132" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#121a2b"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-3132)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1094" cy="92" r="32" fill="#f472b6" opacity="0.07"/>
    <circle cx="1088" cy="286" r="14" fill="#f472b6" opacity="0.09"/>
    <circle cx="1082" cy="220" r="26" fill="#f472b6" opacity="0.11"/>
    <circle cx="1076" cy="154" r="8" fill="#f472b6" opacity="0.13"/>
    <circle cx="1070" cy="88" r="20" fill="#f472b6" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <line x1="600" y1="212" x2="1100" y2="292" stroke="#f472b6" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="242" x2="1050" y2="312" stroke="#f472b6" stroke-width="0.5" opacity="0.08"/>
    <polygon points="935.3826859021799,98.5 935.3826859021799,125.5 912,139 888.6173140978201,125.5 888.6173140978201,98.5 912,85" fill="none" stroke="#f472b6" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f472b6"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f472b6" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f472b6">💻 プログラミング — レッスン 2</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 3: Quarkus REST — RESTful API の構築</tspan>
      <tspan x="60" dy="42">プロフェッショナル</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Quarkus マイクロサービス: 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 1: Quarkus プラットフォームとプロジェクトのセットアップ</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

Quarkus REST (以前は RESTEasy Reactive として知られていました) は、Quarkus の Jakarta REST のデフォルト実装です。戻り値の型に応じて **IO スレッド** (非ブロッキング) または **ワーカー スレッド** (ブロッキング) でリクエストを処理するように設計されており、複雑なリアクティブ コードを作成せずに高いスループットを提供します。

## Jakarta REST 基本アノテーション

### リソースクラス

```java
package com.xdev.ecommerce.product;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.util.List;

@Path("/api/v1/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @GET
    public List<ProductDTO> list(
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("20") int size,
            @QueryParam("category") String category) {
        // Trả về list → tự động serialize sang JSON
        return productService.findAll(page, size, category);
    }

    @GET
    @Path("/{id}")
    public ProductDTO getById(@PathParam("id") Long id) {
        return productService.findById(id);
    }

    @POST
    public Response create(CreateProductRequest request) {
        ProductDTO created = productService.create(request);
        return Response
                .created(URI.create("/api/v1/products/" + created.id()))
                .entity(created)
                .build();
    }

    @PUT
    @Path("/{id}")
    public ProductDTO update(@PathParam("id") Long id,
                             UpdateProductRequest request) {
        return productService.update(id, request);
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        productService.delete(id);
        return Response.noContent().build();
    }
}
```

### Java レコードを使用した DTO

```java
// Request DTOs
public record CreateProductRequest(
    String name,
    String description,
    BigDecimal price,
    Long categoryId,
    int stockQuantity
) {}

public record UpdateProductRequest(
    String name,
    String description,
    BigDecimal price,
    int stockQuantity
) {}

// Response DTO
public record ProductDTO(
    Long id,
    String name,
    String description,
    BigDecimal price,
    String categoryName,
    int stockQuantity,
    LocalDateTime createdAt
) {}
```

## ジャクソン JSON シリアル化

### ジャクソン構成

```properties
# application.properties
quarkus.jackson.date-format=yyyy-MM-dd'T'HH:mm:ss
quarkus.jackson.timezone=Asia/Ho_Chi_Minh
quarkus.jackson.serialization.indent-output=true
quarkus.jackson.serialization.write-dates-as-timestamps=false
```

### カスタム オブジェクトマッパー

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import io.quarkus.jackson.ObjectMapperCustomizer;
import jakarta.inject.Singleton;

@Singleton
public class RegisterCustomModuleCustomizer implements ObjectMapperCustomizer {

    @Override
    public void customize(ObjectMapper mapper) {
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }
}
```

## リクエスト/レスポンスのフィルタリング

### サーバーフィルター

```java
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import org.jboss.resteasy.reactive.server.ServerRequestFilter;
import org.jboss.resteasy.reactive.server.ServerResponseFilter;
import io.vertx.core.http.HttpServerRequest;

public class LoggingFilter {

    @ServerRequestFilter
    public void logRequest(ContainerRequestContext ctx,
                           HttpServerRequest request) {
        // Log incoming request
        String method = ctx.getMethod();
        String path = ctx.getUriInfo().getPath();
        String clientIp = request.remoteAddress().host();
        Log.infof("→ %s %s from %s", method, path, clientIp);
    }

    @ServerResponseFilter
    public void logResponse(ContainerResponseContext ctx) {
        int status = ctx.getStatus();
        Log.infof("← Response: %d", status);
    }
}
```

### カスタムヘッダーフィルター

```java
import org.jboss.resteasy.reactive.server.ServerResponseFilter;
import jakarta.ws.rs.container.ContainerResponseContext;

public class SecurityHeadersFilter {

    @ServerResponseFilter
    public void addSecurityHeaders(ContainerResponseContext response) {
        response.getHeaders().putSingle(
            "X-Content-Type-Options", "nosniff");
        response.getHeaders().putSingle(
            "X-Frame-Options", "DENY");
        response.getHeaders().putSingle(
            "Cache-Control", "no-store");
    }
}
```

## CORS 構成

```properties
# application.properties
quarkus.http.cors=true
quarkus.http.cors.origins=http://localhost:3000,https://ecommerce.xdev.asia
quarkus.http.cors.methods=GET,POST,PUT,DELETE,OPTIONS
quarkus.http.cors.headers=Content-Type,Authorization
quarkus.http.cors.exposed-headers=X-Total-Count
quarkus.http.cors.access-control-max-age=24H
```

## ページネーション応答パターン

```java
import jakarta.ws.rs.core.Response;

@GET
public Response list(@QueryParam("page") @DefaultValue("0") int page,
                     @QueryParam("size") @DefaultValue("20") int size) {

    PanacheQuery<Product> query = Product.findAll();
    List<ProductDTO> items = query
            .page(Page.of(page, size))
            .list()
            .stream()
            .map(ProductDTO::from)
            .toList();

    long total = query.count();

    return Response.ok(items)
            .header("X-Total-Count", total)
            .header("X-Page", page)
            .header("X-Page-Size", size)
            .header("X-Total-Pages", (total + size - 1) / size)
            .build();
}
```

## OpenAPI と Swagger UI

```properties
# Swagger UI tự động có sẵn ở dev mode
# http://localhost:8080/q/swagger-ui

# Tùy chỉnh OpenAPI info
quarkus.smallrye-openapi.info-title=Product Service API
quarkus.smallrye-openapi.info-version=1.0.0
quarkus.smallrye-openapi.info-description=API quản lý sản phẩm E-Commerce
quarkus.smallrye-openapi.info-contact-name=xdev.asia
quarkus.smallrye-openapi.info-contact-url=https://blog.xdev.asia

# Cho phép Swagger UI ở production (tùy chọn)
quarkus.swagger-ui.always-include=true
```

### OpenAPI アノテーション

```java
import org.eclipse.microprofile.openapi.annotations.*;
import org.eclipse.microprofile.openapi.annotations.media.*;
import org.eclipse.microprofile.openapi.annotations.parameters.*;
import org.eclipse.microprofile.openapi.annotations.responses.*;

@Path("/api/v1/products")
@Tag(name = "Products", description = "Quản lý sản phẩm")
public class ProductResource {

    @GET
    @Operation(summary = "Danh sách sản phẩm",
               description = "Lấy danh sách sản phẩm với phân trang")
    @APIResponse(responseCode = "200",
                 description = "Thành công",
                 content = @Content(
                     mediaType = "application/json",
                     schema = @Schema(
                         implementation = ProductDTO.class)))
    public List<ProductDTO> list(
            @Parameter(description = "Trang (bắt đầu từ 0)")
            @QueryParam("page") @DefaultValue("0") int page,
            @Parameter(description = "Số lượng mỗi trang")
            @QueryParam("size") @DefaultValue("20") int size) {
        // ...
    }

    @POST
    @Operation(summary = "Tạo sản phẩm mới")
    @APIResponse(responseCode = "201",
                 description = "Sản phẩm được tạo thành công")
    @APIResponse(responseCode = "400",
                 description = "Dữ liệu không hợp lệ")
    public Response create(
            @RequestBody(required = true,
                content = @Content(schema = @Schema(
                    implementation = CreateProductRequest.class)))
            CreateProductRequest request) {
        // ...
    }
}
```

## API バージョン管理戦略

### URI バージョニング (マイクロサービスに推奨)

```java
@Path("/api/v1/products")
public class ProductResourceV1 {
    @GET
    public List<ProductDTOv1> list() { /* ... */ }
}

@Path("/api/v2/products")
public class ProductResourceV2 {
    @GET
    public List<ProductDTOv2> list() { /* ... */ }
}
```

### ヘッダーのバージョニング

```java
@Path("/api/products")
public class ProductResource {

    @GET
    public Response list(@HeaderParam("X-API-Version") 
                         @DefaultValue("1") int version) {
        return switch (version) {
            case 2 -> Response.ok(listV2()).build();
            default -> Response.ok(listV1()).build();
        };
    }
}
```

## 演習

1.作成 `ProductResource` 完全な CRUD 操作を使用して
2. リクエスト/レスポンス DTO に Java レコードを使用する
3. ヘッダーによるページネーションのサポートを追加する `X-Total-Count`、 `X-Page`
4. CORS を構成する `http://localhost:3000`
5. Swagger UI にアクセスし、すべてのエンドポイントをテストします
6. 各エンドポイントの詳細を説明する OpenAPI アノテーションを追加します。

## 概要

- **Quarkus REST** は Jakarta REST アノテーションを使用します (`@Path`、 `@GET`、 `@POST`...)
- **Java Records** は不変 DTO に適しています
- **サーバー フィルター** (`@ServerRequestFilter`、 `@ServerResponseFilter`) 横断的な懸念事項について
- **CORS** で構成 `application.properties`
- **OpenAPI + Swagger UI** によりドキュメントが自動的に生成されます
- **API バージョニング** URI 経由 (`/api/v1/`、 `/api/v2/`) シンプルかつ明確

次の記事: PostgreSQL と Hibernate ORM Panache — 効果的なデータ層。
