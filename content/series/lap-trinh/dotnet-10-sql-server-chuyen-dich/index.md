---
id: 575460f7-881d-59ea-9452-15ced18c53b5
title: '.NET 10 × SQL Server — chuyện dịch'
slug: dotnet-10-sql-server-chuyen-dich
description: >-
  Chữ "translation" trong .NET có hai nghĩa, và cả hai đều dẫn tới cùng một chỗ: SQL Server.
  Một là EF Core dịch cây biểu thức LINQ thành T-SQL. Hai là dịch nghĩa của phép so chuỗi giữa
  hai bên — chỗ mà cùng một dòng code cho hai kết quả khác nhau mà không ai báo lỗi.
featured_image: images/blog/dotnet-10-sql-server-chuyen-dich/cover.webp
level: intermediate
duration_hours: 1
lesson_count: 2
price: '0.00'
is_free: true
view_count: 0
average_rating: '0.00'
review_count: 0
enrollment_count: 0
meta: null
published_at: '2026-08-09T14:00:00.000000Z'
created_at: '2026-08-09T14:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9617-facb-72da-8191-e6d44b88fb3e, name: Lập Trình, slug: lap-trinh}
tags:
  - name: .NET
    slug: dotnet
  - name: EF Core
    slug: ef-core
  - name: SQL Server
    slug: sql-server
is_published: true
sections: [{id: section-01, title: 'Hai nghĩa của chữ translation', description: 'Hai bài độc lập, đọc bài nào trước cũng được.', sort_order: 1, lessons: [{id: da3557cb-45dd-5f26-a925-c5f859b9b9b2, title: 'Bài 1: LINQ đi xuống SQL Server bằng đường nào', slug: linq-di-xuong-sql-server, description: 'EF không gửi LINQ xuống database. Nó dịch — và bản dịch đó quyết định SQL Server có tái dùng được kế hoạch thực thi hay không.', duration_minutes: 13, is_free: true, sort_order: 0, video_url: https://youtu.be/wmBW12ShbS8}, {id: aa49abe6-bb5c-5935-80ad-7407dd28d6d1, title: 'Bài 2: Cùng một phép so chuỗi, hai kết quả', slug: chuoi-va-collation, description: 'name == "duy" chạy trong bộ nhớ ra một dòng, chạy trên SQL Server ra ba dòng. EF dịch thẳng == thành =, và đó là cố ý.', duration_minutes: 12, is_free: true, sort_order: 1, video_url: https://youtu.be/XpZCh57MbAo}]}]
---

# .NET 10 × SQL Server — chuyện dịch

EF Core không phải hộp đen dịch LINQ ra SQL cho vui. Nó thay bạn ra một quyết định đánh đổi giữa
việc cho SQL Server tái dùng kế hoạch thực thi, và việc cho SQL Server biết đủ thông tin để lập
kế hoạch cho tốt. EF 10 vừa chọn lại điểm cân bằng đó — lần thứ ba trong ba bản liên tiếp.

Series dựng theo **EF Core 10 / .NET 10**. Mọi khẳng định đều dẫn được về tài liệu Microsoft;
nguồn nằm ở cuối mỗi bài.
