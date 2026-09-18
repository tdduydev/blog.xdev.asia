---
id: 019d8b40-c401-7001-b004-django00000401
title: 'Bài 13: Django Admin Customization'
slug: bai-13-django-admin-customization
description: >-
  ModelAdmin nâng cao (list_display, list_filter, search_fields).
  Custom admin actions, inline models. Admin templates override,
  django-import-export, admin dashboard.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 13
section_title: "Phần 4: Advanced Features"
course:
  id: 019d8b40-c100-7001-b004-django00000001
  title: 'Django: Từ Cơ bản đến Nâng cao'
  slug: django-tu-co-ban-den-nang-cao
---

<h2 id="1-modeladmin"><strong>1. ModelAdmin Nâng cao</strong></h2>

<pre><code class="language-python">from django.contrib import admin
from django.utils.html import format_html
from .models import Product, ProductImage

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'stock', 'is_active', 'thumbnail']
    list_filter = ['category', 'is_active', 'created_at']
    search_fields = ['name', 'description']
    list_editable = ['price', 'stock', 'is_active']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'created_at'
    list_per_page = 50

    inlines = [ProductImageInline]

    fieldsets = (
        ('Thông tin chung', {
            'fields': ('name', 'slug', 'description', 'category'),
        }),
        ('Giá & Kho', {
            'fields': ('price', 'stock', 'discount_percent'),
        }),
        ('Trạng thái', {
            'fields': ('is_active', 'is_featured', 'created_at'),
            'classes': ('collapse',),
        }),
    )

    def thumbnail(self, obj):
        if obj.image:
            return format_html('&lt;img src="{}" width="50"/&gt;', obj.image.url)
        return '-'
    thumbnail.short_description = 'Ảnh'
</code></pre>

<h2 id="2-custom-actions"><strong>2. Custom Admin Actions</strong></h2>

<pre><code class="language-python">@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    actions = ['activate_products', 'deactivate_products', 'export_csv']

    @admin.action(description='Kích hoạt sản phẩm đã chọn')
    def activate_products(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f'{updated} sản phẩm đã được kích hoạt.')

    @admin.action(description='Export CSV')
    def export_csv(self, request, queryset):
        import csv
        from django.http import HttpResponse
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="products.csv"'
        writer = csv.writer(response)
        writer.writerow(['Name', 'Price', 'Stock'])
        for p in queryset:
            writer.writerow([p.name, p.price, p.stock])
        return response
</code></pre>

<h2 id="3-custom-queryset"><strong>3. Custom QuerySet & Autocomplete</strong></h2>

<pre><code class="language-python">@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    autocomplete_fields = ['category']

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related('category').annotate(
            review_count=Count('reviews')
        )
</code></pre>

<h2 id="4-import-export"><strong>4. django-import-export</strong></h2>

<pre><code class="language-python">from import_export import resources
from import_export.admin import ImportExportModelAdmin

class ProductResource(resources.ModelResource):
    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'stock', 'category__name')
        import_id_fields = ('id',)

@admin.register(Product)
class ProductAdmin(ImportExportModelAdmin):
    resource_class = ProductResource
</code></pre>

<p>Bài tiếp theo: <strong>Django Channels & WebSockets</strong>.</p>
