---
id: 019e3a00-0000-7001-e001-hl7r5000001
title: 'HL7 FHIR R5 Chuyên Sâu — Reference & Thực hành'
slug: hl7-fhir-r5-chuyen-sau
description: 'Khóa học chuyên sâu HL7 FHIR R5 (Fast Healthcare Interoperability Resources): nguyên tắc thiết kế FHIR, RESTful API, Resource Model & Architecture, Search/CRUD, Data Types, Deep-dive Resources (Clinical/Administrative/Specialized/Infrastructure), Profiling & Validation, Operations & Messaging, Security & Privacy, Terminology, và phần Hands-on xây dựng hệ thống FHIR microservices với HAPI FHIR. Cập nhật theo FHIR R5 (v5.0.0).'
featured_image: uploads/2026/03/hl7-fhir-series-banner.png
level: intermediate
duration_hours: 25
lesson_count: 74
price: '0.00'
is_free: true
view_count: 0
average_rating: '0.00'
review_count: 0
enrollment_count: 0
meta: null
published_at: '2026-07-05T14:00:00.000000Z'
created_at: '2026-07-05T14:00:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: 'Duy Tran'
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9616-cat7-7007-a007-000000000007
  name: 'Kiến trúc hệ thống'
  slug: architecture
tags:
  - name: 'HL7'
    slug: hl7
  - name: 'FHIR'
    slug: fhir
  - name: 'FHIR R5'
    slug: fhir-r5
  - name: 'healthcare'
    slug: healthcare
  - name: 'interoperability'
    slug: interoperability
  - name: 'RESTful API'
    slug: rest-api
  - name: 'Terminology'
    slug: terminology
  - name: 'HAPI-FHIR'
    slug: hapi-fhir
  - name: 'SMART-on-FHIR'
    slug: smart-on-fhir
  - name: 'Profiling'
    slug: profiling
  - name: 'Security'
    slug: security
sections:
  - id: section-01
    title: 'Phần 1: Giới thiệu HL7 R5'
    sort_order: 1
    lessons:
      - id: 08eb4ac6-7688-47cf-a0cc-21ea2ca09e65
        title: 'Tổng quan về FHIR R5'
        slug: tong-quan-ve-fhir-r5
        description: 'FHIR (Fast Healthcare Interoperability Resources) là tiêu chuẩn trao đổi dữ'
        duration_minutes: 15
        is_free: true
        sort_order: 1
        video_url: null
      - id: dab3692b-510d-449a-aff7-7f00fe5163a8
        title: 'Nguyên tắc thiết kế FHIR'
        slug: nguyen-tac-thiet-ke-fhir
        description: 'Nguyên tắc thiết kế FHIR: Nền tảng của tiêu chuẩn y tế hiện đại'
        duration_minutes: 15
        is_free: true
        sort_order: 2
        video_url: null
      - id: b40353f5-82e7-4b48-ba5e-63a7ddb90b61
        title: 'Lịch sử FHIR đến R5'
        slug: lich-su-fhir-den-r5
        description: 'FHIR (Fast Healthcare Interoperability Resources) đã trải qua một hành trình phát triển đáng kinh ngạc kể từ khi ra đời. Bài viết này sẽ đưa bạn qua quá trình tiến hóa của FHIR từ những ngày đầu cho đến phiên bản R5…'
        duration_minutes: 15
        is_free: true
        sort_order: 3
        video_url: null
  - id: section-02
    title: 'Phần 2: RESTful API & FHIR'
    sort_order: 2
    lessons:
      - id: 446fdc08-dcc6-4669-a49f-c3ae2708ae16
        title: 'REST Fundamentals'
        slug: rest-fundamentals
        description: 'REST (Representational State Transfer) là một kiến trúc phần mềm dùng để thiết kế các API. Được Roy Fielding giới thiệu năm 2000 trong luận án tiến sĩ của mình, REST đã trở thành tiêu chuẩn de facto cho việc phát triển…'
        duration_minutes: 15
        is_free: true
        sort_order: 1
        video_url: null
      - id: 7c40ccc8-c6ce-47f2-ae99-221b54d640c9
        title: 'HTTP & FHIR REST API'
        slug: http-and-fhir-rest-api
        description: 'HIR (Fast Healthcare Interoperability Resources) là tiêu chuẩn trao đổi dữ liệu y tế được phát triển bởi HL7 International. FHIR kết hợp các ưu điểm của các tiêu chuẩn HL7 trước đó (v2.x, v3, CDA) và áp dụng các phương…'
        duration_minutes: 15
        is_free: true
        sort_order: 2
        video_url: null
      - id: b78af483-c058-4805-984d-d78e88dab1e1
        title: 'Content Negotiation FHIR'
        slug: content-negotiation-fhir
        description: 'Content Negotiation là một khía cạnh quan trọng của FHIR (Fast Healthcare Interoperability Resources), cho phép clients và servers thỏa thuận về định dạng nội dung tốt nhất để trao đổi. Trong bài viết này, chúng ta sẽ…'
        duration_minutes: 15
        is_free: true
        sort_order: 3
        video_url: null
  - id: section-03
    title: 'Phần 3: Mô hình Resource & Kiến trúc FHIR'
    sort_order: 3
    lessons:
      - id: 5c14d8f8-f665-4845-99dc-7191982991e2
        title: 'FHIR R5 Model Resources'
        slug: fhir-r5-model-resources
        description: 'FHIR (Fast Healthcare Interoperability Resources) là một tiêu chuẩn được phát triển bởi HL7 nhằm tạo điều kiện thuận lợi cho việc trao đổi dữ liệu y tế giữa các hệ thống khác nhau. Phiên bản R5 là bản cập nhật mới nhất…'
        duration_minutes: 15
        is_free: true
        sort_order: 1
        video_url: null
      - id: 18612601-535f-4573-98b2-e43ffff6e2d9
        title: 'FHIR R5 Resource Classification'
        slug: fhir-r5-resource-classification
        description: 'FHIR (Fast Healthcare Interoperability Resources) là tiêu chuẩn hiện đại nhất cho việc trao đổi dữ liệu y tế điện tử. Với phiên bản R5, FHIR đã mở rộng và hoàn thiện hơn với nhiều loại tài nguyên giúp mô hình hóa hầu…'
        duration_minutes: 15
        is_free: true
        sort_order: 2
        video_url: null
      - id: 64e84a03-0e78-49f5-adf2-7acafc3517c3
        title: 'New FHIR R5 Resources'
        slug: new-fhir-r5-resources
        description: 'Trong bài viết này, chúng ta sẽ đi sâu vào các tài nguyên mới của FHIR R5, phân tích cấu trúc, cách sử dụng và ví dụ cụ thể cho từng tài nguyên. Bài viết hướng tới các nhà phát triển và kiến trúc sư giải pháp đang làm…'
        duration_minutes: 25
        is_free: true
        sort_order: 3
        video_url: null
      - id: a6ab3b7d-a743-4a3a-9888-ae0bd1926313
        title: 'Exporing FHIR R5 Servers'
        slug: exporing-fhir-r5-servers
        description: 'FHIR (Fast Healthcare Interoperability Resources) phiên bản R5 là tiêu chuẩn mới nhất cho việc trao đổi dữ liệu y tế, được HL7 chính thức phát hành vào năm 2023. Với nhiều cải tiến đáng kể so với các phiên bản trước…'
        duration_minutes: 28
        is_free: true
        sort_order: 4
        video_url: null
  - id: section-04
    title: 'Phần 4: Search & CRUD trong FHIR R5'
    sort_order: 4
    lessons:
      - id: 2437c035-8300-4ee8-a2e0-434328f1a2f1
        title: 'CRUD Operations in FHIR R5'
        slug: crud-operations-in-fhir-r5
        description: 'FHIR là một tiêu chuẩn RESTful, áp dụng các nguyên tắc kiến trúc REST cho dữ liệu y tế. Mỗi tài nguyên FHIR (như Patient, Observation, Medication) có một URL duy nhất và có thể được thao tác thông qua các phương thức…'
        duration_minutes: 15
        is_free: true
        sort_order: 1
        video_url: null
      - id: c3068ae9-78be-4789-a645-fefa7fbe1958
        title: 'Search in FHIR R5'
        slug: search-in-fhir-r5
        description: 'Khả năng tìm kiếm (Search) là một trong những tính năng mạnh mẽ nhất của FHIR. Nó cho phép các ứng dụng truy vấn dữ liệu từ máy chủ FHIR một cách linh hoạt và hiệu quả. Trong R5, khả năng tìm kiếm này đã được mở rộng và…'
        duration_minutes: 15
        is_free: true
        sort_order: 2
        video_url: null
      - id: 712e065a-8610-492b-bea1-6b79b74450a2
        title: 'Bundles & Transactions in FHIR R5'
        slug: bundles-and-transactions-in-fhir-r5
        description: 'Bundle là một tài nguyên FHIR đặc biệt được sử dụng để nhóm nhiều tài nguyên thành một đơn vị duy nhất. Nó làm nhiều vai trò khác nhau, từ việc đóng gói kết quả tìm kiếm đến thực hiện nhiều thao tác trong một giao dịch…'
        duration_minutes: 40
        is_free: true
        sort_order: 3
        video_url: null
      - id: 61e05786-f7d6-4b7f-8ba4-90d6cd1f8b6d
        title: 'Operations in FHIR R5'
        slug: operations-in-fhir-r5
        description: 'Operations trong FHIR là các chức năng đặc biệt vượt ra ngoài khuôn khổ của các thao tác CRUD cơ bản (Create, Read, Update, Delete). Chúng được thiết kế để thực hiện các hoạt động phức tạp hơn như kiểm tra, biến đổi…'
        duration_minutes: 16
        is_free: true
        sort_order: 4
        video_url: null
  - id: section-05
    title: 'Phần 5: Cấu trúc dữ liệu FHIR R5'
    sort_order: 5
    lessons:
      - id: 57c40667-0a85-480c-8cf3-a52850bf2af0
        title: 'Data Types In FHIR R5'
        slug: data-types-in-fhir-r5
        description: 'Nếu bạn đã làm việc với các phiên bản FHIR trước đây, bạn sẽ thấy R5 mang đến nhiều cải tiến đáng kể. Còn nếu bạn mới làm quen với FHIR, đây là thời điểm tuyệt vời để bắt đầu với phiên bản mới nhất và đầy đủ nhất.'
        duration_minutes: 26
        is_free: true
        sort_order: 1
        video_url: null
      - id: 73df50be-e901-44d8-b34f-af19fb4e0716
        title: 'Extensions & ElementDefinition'
        slug: extensions-and-elementdefinition
        description: 'Sau khi tìm hiểu về Data Types, hôm nay chúng ta sẽ đi sâu vào một khía cạnh cực kỳ quan trọng của FHIR: Extensions và ElementDefinition.'
        duration_minutes: 20
        is_free: true
        sort_order: 2
        video_url: null
      - id: 403c6a62-7be1-4987-9dfd-05fef1082def
        title: 'Metadata & Control Elements'
        slug: metadata-and-control-elements
        description: 'Hôm nay chúng ta sẽ đi sâu vào một khía cạnh quan trọng nhưng thường bị bỏ qua: Metadata và Control Elements. Đây là những thành phần không chứa dữ liệu y tế trực tiếp, nhưng lại đóng vai trò thiết yếu trong việc quản…'
        duration_minutes: 15
        is_free: true
        sort_order: 3
        video_url: null
      - id: c6d7feb0-e441-42e9-a616-d609605bfe0c
        title: 'Narrative & Text'
        slug: narrative-and-text
        description: 'Hôm nay chúng ta sẽ tìm hiểu về một khía cạnh đặc biệt quan trọng nhưng thường bị bỏ qua: Narrative và Text phần hiển thị có thể đọc được của tài nguyên FHIR.Tôi nhận thấy rằng hiểu rõ về narrative không chỉ đơn thuần…'
        duration_minutes: 15
        is_free: true
        sort_order: 4
        video_url: null
  - id: section-06
    title: 'Phần 6: Đào sâu Resource FHIR R5'
    sort_order: 6
    lessons:
      - id: 163ddace-b43b-473a-912c-f38edeafe6c6
        title: 'Clinical Resources in R5'
        slug: clinical-resources-in-r5
        description: 'Tiếp tục series về FHIR, hôm nay chúng ta sẽ đi sâu vào các Clinical Resources (Tài nguyên lâm sàng) trong FHIR R5. Đây là nhóm tài nguyên quan trọng nhất của FHIR, đại diện cho thông tin y tế cốt lõi của bệnh nhân và…'
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null
      - id: b1770c1f-dff1-4d81-82d3-e38e164fdfb0
        title: 'Administrative Resources'
        slug: administrative-resources
        description: 'Fast Healthcare Interoperability Resources (FHIR) là tiêu chuẩn được phát triển bởi HL7, nhằm đơn giản hóa việc trao đổi dữ liệu giữa các hệ thống thông tin y tế. Khác với HL7 v2.x mà chúng ta đã tìm hiểu trước đây (với…'
        duration_minutes: 26
        is_free: true
        sort_order: 2
        video_url: null
      - id: f2b1f79f-7c3a-4861-bfc9-9f96c215bd97
        title: 'Specialized Resources'
        slug: specialized-resources
        description: 'Chào các bạn! Trong bài viết ngày hôm nay, tôi sẽ giới thiệu về các loại tài nguyên đặc biệt (Specialized Resources) trong FHIR phiên bản R5 với nhiều ví dụ thực tế, giúp bạn dễ dàng hiểu và áp dụng vào công việc.'
        duration_minutes: 15
        is_free: true
        sort_order: 3
        video_url: null
      - id: f0be1e21-5b69-4adc-8a86-483a51564e80
        title: 'Infrastructure Resources'
        slug: infrastructure-resources
        description: 'Xin chào các bạn! Trong bài viết hôm nay, chúng ta sẽ cùng tìm hiểu về các Infrastructure Resources (Tài nguyên hạ tầng) trong FHIR R5. Đây là những tài nguyên rất quan trọng, cung cấp nền tảng vững chắc cho các hệ…'
        duration_minutes: 15
        is_free: true
        sort_order: 4
        video_url: null
  - id: section-07
    title: 'Phần 7: Profiling & Validation trong FHIR R5'
    sort_order: 7
    lessons:
      - id: bc87e84c-dd49-44c3-8e6e-10a497644d5d
        title: 'Conformance Resources in R5'
        slug: conformance-resources-in-r5
        description: 'Xin chào các bạn! Trong bài viết hôm nay, chúng ta sẽ khám phá về các Conformance Resources (Tài nguyên tuân thủ) trong FHIR R5. Đây là những tài nguyên đóng vai trò quan trọng trong việc định nghĩa cấu trúc, quy tắc và…'
        duration_minutes: 26
        is_free: true
        sort_order: 1
        video_url: null
      - id: e232efbc-df95-4058-ab53-2bb1a3c42569
        title: 'Creating & Use FHIR R5 Profiles'
        slug: creating-and-use-fhir-r5-profiles
        description: 'Xin chào các bạn! Trong bài viết này, chúng ta sẽ tìm hiểu cách tạo và sử dụng FHIR Profiles trong phiên bản R5. Đây là công cụ mạnh mẽ giúp bạn tùy chỉnh tài nguyên FHIR phù hợp với nhu cầu riêng, đồng thời vẫn tuân…'
        duration_minutes: 23
        is_free: true
        sort_order: 2
        video_url: null
      - id: 5f655894-9612-461c-bbf8-239f6926bfee
        title: 'FHIRPath & FluentPath FHIR R5'
        slug: fhirpath-and-fluentpath-fhir-r5
        description: 'FHIRPath và FluentPath là những công cụ mạnh mẽ giúp bạn truy vấn, lọc và điều hướng trong dữ liệu FHIR. Trong bài viết này, chúng ta sẽ khám phá chi tiết cách sử dụng các công cụ quan trọng này trong FHIR R5, cùng với…'
        duration_minutes: 15
        is_free: true
        sort_order: 3
        video_url: null
      - id: 11efe43d-50cf-426d-a0a8-361c8f045a50
        title: 'Validation in FHIR R5'
        slug: validation-in-fhir-r5
        description: 'Xin chào các bạn! Hôm nay chúng ta sẽ tìm hiểu về việc kiểm tra tính hợp lệ (validation) của dữ liệu trong FHIR phiên bản R5. Tôi sẽ trình bày theo cách đơn giản và dễ hiểu nhất, kèm theo những ví dụ thực tế để bạn có…'
        duration_minutes: 15
        is_free: true
        sort_order: 4
        video_url: null
      - id: 07215244-67b9-4384-b2b0-5a174c4c8ebf
        title: 'Implementation Guides in R5'
        slug: implementation-guides-in-r5
        description: 'Xin chào các bạn! Hôm nay chúng ta sẽ cùng khám phá về Implementation Guides (Hướng dẫn triển khai) trong FHIR R5. Implementation Guides (IGs) là tài liệu thiết yếu giúp đảm bảo các hệ thống y tế có thể giao tiếp và…'
        duration_minutes: 15
        is_free: true
        sort_order: 5
        video_url: null
  - id: section-08
    title: 'Phần 8: Operations & Messaging trong FHIR R5'
    sort_order: 8
    lessons:
      - id: dfc8cd12-86f2-4cd7-ac76-e4142c998417
        title: 'Operations R5 Updates'
        slug: operations-r5-updates
        description: 'Operations trong FHIR là các phương thức mở rộng ngoài CRUD chuẩn (Create, Read, Update, Delete), cho phép thực hiện các hành động phức tạp hơn trên tài nguyên FHIR. Với phiên bản R5, FHIR đã đưa ra nhiều cải tiến quan…'
        duration_minutes: 15
        is_free: true
        sort_order: 1
        video_url: null
      - id: de8fd6c1-b8bf-4ed5-8441-ec2e1dd4bbe8
        title: 'FHIR Messaging in R5'
        slug: fhir-messaging-in-r5
        description: 'FHIR Messaging là một trong ba paradigm chính của FHIR (cùng với RESTful API và Documents), cho phép các hệ thống trao đổi thông tin theo cơ chế gửi và nhận tin nhắn. Paradigm này đặc biệt phù hợp với các quy trình làm…'
        duration_minutes: 15
        is_free: true
        sort_order: 2
        video_url: null
      - id: 836c57e8-ca39-4ca0-971d-ae9a554315c9
        title: 'Event-based Communication In FHIR R5'
        slug: event-based-communication-in-fhir-r5
        description: 'Giao tiếp dựa trên sự kiện là một mẫu thiết kế quan trọng trong các hệ thống phân tán, cho phép các thành phần khác nhau phản ứng khi có thay đổi mà không cần liên tục truy vấn để kiểm tra. Trong FHIR R5, cơ chế này đã…'
        duration_minutes: 15
        is_free: true
        sort_order: 3
        video_url: null
      - id: 64351a61-4f7c-48ef-9a54-20ee02e8444a
        title: 'FHIR Documents In R5'
        slug: fhir-documents-in-r5
        description: 'FHIR Documents là một cơ chế để tổng hợp và trình bày thông tin lâm sàng dưới dạng một tài liệu có cấu trúc, có thể đọc được và có khả năng trao đổi giữa các hệ thống. Tài liệu FHIR bao gồm nhiều tài nguyên (resources)…'
        duration_minutes: 15
        is_free: true
        sort_order: 4
        video_url: null
      - id: aaa0d652-7198-474f-bdcd-80daeabb53e3
        title: 'GraphQL FHIR R5'
        slug: graphql-fhir-r5
        description: 'GraphQL là một ngôn ngữ truy vấn và thao tác dữ liệu được phát triển bởi Facebook (nay là Meta), cung cấp một cách tiếp cận linh hoạt và hiệu quả hơn so với REST truyền thống. Khi kết hợp với FHIR R5, GraphQL mang lại…'
        duration_minutes: 29
        is_free: true
        sort_order: 5
        video_url: null
  - id: section-09
    title: 'Phần 9: Bảo mật & Quyền riêng tư trong FHIR R5'
    sort_order: 9
    lessons:
      - id: cd53c397-00e4-45c4-a1d6-a633ee19e26a
        title: 'FHIR Security trong R5'
        slug: fhir-security-trong-r5
        description: 'Chào các bạn! Hôm nay chúng ta sẽ đi sâu vào chủ đề bảo mật FHIR trong phiên bản mới nhất R5. Bài viết này sẽ giúp bạn hiểu rõ những thay đổi quan trọng về bảo mật trong phiên bản mới, cùng với các hướng dẫn thực tiễn…'
        duration_minutes: 39
        is_free: true
        sort_order: 1
        video_url: null
      - id: 85805368-c76d-41a3-a6e7-4f8d3b5290e1
        title: 'Consent & Data Segmentation In FHIR R5'
        slug: consent-and-data-segmentation-in-fhir-r5
        description: 'Trong thế giới y tế kỹ thuật số, việc đảm bảo dữ liệu bệnh nhân được sử dụng đúng mục đích và tuân thủ sự đồng ý của bệnh nhân là vô cùng quan trọng. Bài viết này sẽ đi sâu vào các cải tiến về Consent (sự đồng ý) và…'
        duration_minutes: 29
        is_free: true
        sort_order: 2
        video_url: null
      - id: 29f22486-9f74-48b5-a948-7b5325ed78ce
        title: 'Provenance & Audit'
        slug: provenance-and-audit
        description: 'Trong hệ sinh thái y tế số, việc biết chính xác dữ liệu đến từ đâu, ai đã truy cập hay thay đổi nó, và liệu dữ liệu có được xác thực hay không là vô cùng quan trọng. FHIR R5 đã có những cải tiến đáng kể trong lĩnh vực…'
        duration_minutes: 39
        is_free: true
        sort_order: 3
        video_url: null
      - id: 73248d2e-6da9-4bfd-99b9-dacfe6620658
        title: 'FHIR Data Security'
        slug: fhir-data-security
        description: 'FHIR (Fast Healthcare Interoperability Resources) đã trở thành tiêu chuẩn hàng đầu cho việc trao đổi dữ liệu y tế, cho phép các hệ thống khác nhau "giao tiếp" với nhau một cách liền mạch. Tuy nhiên, khi dữ liệu được…'
        duration_minutes: 25
        is_free: true
        sort_order: 4
        video_url: null
  - id: section-10
    title: 'Phần 10: Terminology trong FHIR R5'
    sort_order: 10
    lessons:
      - id: 4f7810b0-692b-4234-90c5-9606a016161a
        title: 'CodeSystem & ValueSet'
        slug: codesystem-and-valueset
        description: 'Phiên bản FHIR R5 đã mang lại những cải tiến đáng kể cho CodeSystem và ValueSet hai thành phần nền tảng trong quản lý thuật ngữ y tế. Hãy cùng tìm hiểu chi tiết về các nâng cấp này qua những ví dụ cụ thể và dễ hiểu.'
        duration_minutes: 15
        is_free: true
        sort_order: 1
        video_url: null
      - id: d91ef72a-006f-46b1-b32c-92d951fc6201
        title: 'Terminology Operations'
        slug: terminology-operations
        description: 'Với phiên bản FHIR R5, các thao tác Terminology (Thuật ngữ) đã được cải tiến đáng kể, giúp việc làm việc với mã và bộ giá trị trở nên mạnh mẽ và linh hoạt hơn. Bài viết này sẽ giải thích chi tiết về các thao tác này qua…'
        duration_minutes: 25
        is_free: true
        sort_order: 2
        video_url: null
      - id: a86fb46a-ee35-4afe-af45-624e9565fae4
        title: 'Terminology Service'
        slug: terminology-service
        description: 'Triển khai một Terminology Service là một thách thức quan trọng trong hệ sinh thái FHIR. Bài viết này sẽ hướng dẫn chi tiết về cách xây dựng, triển khai và tối ưu hóa một Terminology Service theo chuẩn FHIR R5, bao gồm…'
        duration_minutes: 32
        is_free: true
        sort_order: 3
        video_url: null
      - id: 69dbcace-5aef-4605-9140-1ec272f0ec35
        title: 'Terminology Bindings'
        slug: terminology-bindings
        description: 'Terminology Bindings (Ràng buộc thuật ngữ) là một trong những khía cạnh quan trọng nhất của FHIR, cho phép kết nối dữ liệu có cấu trúc với các hệ thống mã hóa chuẩn. Trong FHIR R5, cơ chế này đã được cải tiến đáng kể để…'
        duration_minutes: 28
        is_free: true
        sort_order: 4
        video_url: null
  - id: section-11
    title: 'Phần 11: Kiến trúc & Thiết kế (Hands-on)'
    sort_order: 11
    lessons:
      - id: 95219252-fae2-485d-8d3e-35bb9d3237e6
        title: 'Microservices Architecture'
        slug: microservices-architecture
        description: 'Kiến trúc microservices cho hệ thống y tế thông minh dựa trên HL7 FHIR R5 được thiết kế nhằm tạo ra một nền tảng y tế số linh hoạt, có khả năng mở rộng cao và khả năng tích hợp mạnh mẽ. Hệ thống được phân chia thành các…'
        duration_minutes: 15
        is_free: true
        sort_order: 1
        video_url: null
      - id: 2a9fe81a-2cd2-44b3-8dfc-c394d58ff58b
        title: 'FHIR resources & extensions'
        slug: fhir-resources-and-extensions
        description: 'FHIR R5 cung cấp một bộ resources được chuẩn hóa để mô tả dữ liệu y tế. Mỗi resource là một đơn vị thông tin có thể được trao đổi độc lập. Các resources này được tổ chức thành các nhóm chính:'
        duration_minutes: 15
        is_free: true
        sort_order: 2
        video_url: null
      - id: 4aa6b1b0-6b5e-45d3-8923-d4823504436d
        title: 'Data Modeling with PostgreSQL'
        slug: data-modeling-with-postgresql
        description: 'Tài liệu này trình bày phương pháp tối ưu để thiết kế cơ sở dữ liệu PostgreSQL'
        duration_minutes: 15
        is_free: true
        sort_order: 3
        video_url: null
      - id: cd790487-b559-4c55-87f2-f684b2b03075
        title: 'Security & OAuth2 with Keycloak'
        slug: security-and-oauth2-with-keycloak
        description: 'Trong lĩnh vực y tế, việc bảo mật dữ liệu bệnh nhân là một yêu cầu thiết yếu. Khi triển khai hệ thống dựa trên tiêu chuẩn HL7 FHIR phiên bản 5, việc thiết lập một hệ thống xác thực và phân quyền mạnh mẽ trở nên cực kỳ…'
        duration_minutes: 15
        is_free: true
        sort_order: 4
        video_url: null
      - id: 756d4252-ea88-4eb7-9817-0aec9b3a77f7
        title: '10 Design patterns for FHIR'
        slug: design-patterns-for-fhir
        description: '10 cách tổ chức mã nguồn khi làm ứng dụng FHIR'
        duration_minutes: 20
        is_free: true
        sort_order: 5
        video_url: null
      - id: 2d165b2f-809a-43f1-a068-4f581c580a05
        title: 'HAPI FHIR'
        slug: hapi-fhir-java-library
        description: 'HAPI FHIR là một bộ thư viện Java mã nguồn mở triển khai tiêu chuẩn HL7 FHIR (Fast Healthcare Interoperability Resources), giúp các nhà phát triển xây dựng ứng dụng y tế hiện đại với khả năng tương tác cao. Dưới đây là…'
        duration_minutes: 15
        is_free: true
        sort_order: 6
        video_url: null
      - id: e0460cd3-7755-4a8c-8477-fc07fdc27159
        title: 'hapi-fhir-base'
        slug: hapi-fhir-base
        description: 'hapifhirbase là thư viện nền tảng trong hệ sinh thái HAPI FHIR, đóng vai trò là xương sống cho tất cả các thư viện HAPI FHIR khác. Được phát triển bởi University Health Network (Toronto), thư viện này cung cấp các thành…'
        duration_minutes: 15
        is_free: true
        sort_order: 7
        video_url: null
      - id: ddae5cd6-ec8f-4c2b-b9b0-a17c88662692
        title: 'hapi-fhir-structures-r5'
        slug: hapi-fhir-structures-r5
        description: 'hapifhirstructuresr5 là thư viện Java cung cấp các lớp mô hình (model classes) cho phiên bản FHIR R5 (phiên bản 5.0.0), phát hành chính thức vào đầu năm 2023. Thư viện này triển khai đầy đủ các resource, datatype và các…'
        duration_minutes: 25
        is_free: true
        sort_order: 8
        video_url: null
      - id: 1074ca0c-42e4-4f7f-96be-524b9eaa52d2
        title: 'hapi-fhir-validation'
        slug: hapi-fhir-validation
        description: 'Thư viện hapifhirvalidation là một thành phần quan trọng trong hệ sinh thái HAPI FHIR, cung cấp các cơ chế toàn diện để kiểm tra tính hợp lệ (validation) của FHIR resources. Validation là một quá trình thiết yếu trong…'
        duration_minutes: 27
        is_free: true
        sort_order: 9
        video_url: null
      - id: beffaf06-6dc0-45cd-b055-acb2fce19028
        title: 'hapi-fhir-client'
        slug: hapi-fhir-client
        description: 'hapifhirclient là một thành phần trong hệ sinh thái HAPI FHIR, được phát triển để đơn giản hóa việc tương tác với FHIR servers thông qua RESTful API. Thư viện này được thiết kế với triết lý "fluent interface", cho phép…'
        duration_minutes: 15
        is_free: true
        sort_order: 10
        video_url: null
      - id: 849a7082-91d4-45ab-a871-e1ecf6317b0b
        title: 'hapi-fhir-client-okhttp'
        slug: hapi-fhir-client-okhttp
        description: 'Trong hệ sinh thái HAPI FHIR, thư viện hapifhirclientokhttp đóng vai trò quan trọng bằng cách tích hợp OkHttp một HTTP client mạnh mẽ của Square vào framework của HAPI FHIR. Từ phiên bản 5.0 trở đi, OkHttp đã trở thành…'
        duration_minutes: 15
        is_free: true
        sort_order: 11
        video_url: null
      - id: 072e45c1-5e2d-4e28-ba7d-a6293ed41367
        title: 'hapi-fhir-client-apache'
        slug: hapi-fhir-client-apache
        description: 'Trong hệ sinh thái HAPI FHIR, thư viện hapifhirclientapache đóng vai trò quan trọng bằng cách cung cấp một HTTP client dựa trên Apache HttpClient một thư viện HTTP client trưởng thành, đáng tin cậy và đã được kiểm chứng…'
        duration_minutes: 15
        is_free: true
        sort_order: 12
        video_url: null
      - id: 2c0be99e-86e7-44ec-991d-2f262b6d9263
        title: 'hapi-fhir-server'
        slug: hapi-fhir-server
        description: 'HAPI FHIR Server là một triển khai mã nguồn mở, toàn diện của tiêu chuẩn HL7 FHIR (Fast Healthcare Interoperability Resources), được xây dựng trên nền tảng Java. Là một phần của dự án HAPI FHIR, server này cung cấp một…'
        duration_minutes: 15
        is_free: true
        sort_order: 13
        video_url: null
      - id: 43b02598-c3cf-4faf-a840-45fd60650aa3
        title: 'hapi-fhir-jpaserver-base'
        slug: hapi-fhir-jpaserver-base
        description: 'hapifhirjpaserverbase là một thành phần trọng tâm trong hệ sinh thái HAPI FHIR, cung cấp triển khai đầy đủ của FHIR Server dựa trên JPA (Java Persistence API). Thư viện này cung cấp một giải pháp "outofthebox" để lưu…'
        duration_minutes: 16
        is_free: true
        sort_order: 14
        video_url: null
      - id: f1cdf4b6-359e-42fd-ba6b-8d0cdb875a39
        title: 'hapi-fhir-jpaserver-elasticsearch'
        slug: hapi-fhir-jpaserver-elasticsearch
        description: 'hapifhirjpaserverelasticsearch là một module mở rộng quan trọng trong hệ sinh thái HAPI FHIR, kết hợp sức mạnh của cơ sở dữ liệu quan hệ (qua JPA) với khả năng tìm kiếm mạnh mẽ của Elasticsearch. Module này giải quyết…'
        duration_minutes: 25
        is_free: true
        sort_order: 15
        video_url: null
      - id: f4a7a02b-4c9f-494d-9126-318312adef66
        title: 'hapi-fhir-jpaserver-starter'
        slug: hapi-fhir-jpaserver-starter
        description: 'hapifhirjpaserverstarter là một dự án mẫu (template project) được phát triển bởi đội ngũ HAPI FHIR, cung cấp một FHIR server hoàn chỉnh, sẵn sàng để triển khai với cấu hình tối thiểu. Đây là điểm khởi đầu lý tưởng cho…'
        duration_minutes: 25
        is_free: true
        sort_order: 16
        video_url: null
      - id: 3ae4f876-a1c7-42d4-9242-e297ef529f34
        title: 'hapi-fhir-converter'
        slug: hapi-fhir-converter
        description: 'hapifhirconverter là một thành phần quan trọng trong hệ sinh thái HAPI FHIR, được thiết kế đặc biệt để chuyển đổi dữ liệu giữa các phiên bản FHIR khác nhau (R2/DSTU2, R3/STU3, R4, R4B và R5) cũng như chuyển đổi giữa…'
        duration_minutes: 25
        is_free: true
        sort_order: 17
        video_url: null
      - id: 9a7daff5-1c04-4b8a-806e-2031e12239c0
        title: 'hapi-fhir-testpage-overlay'
        slug: hapi-fhir-testpage-overlay
        description: 'hapifhirtestpageoverlay là một thành phần của hệ sinh thái HAPI FHIR cung cấp giao diện web đơn giản, trực quan cho phép nhà phát triển và người dùng tương tác, kiểm thử và khám phá FHIR server. Thành phần này được…'
        duration_minutes: 22
        is_free: true
        sort_order: 18
        video_url: null
      - id: 2d742e3e-2b2c-41aa-a641-85ac69c600d4
        title: 'hapi-fhir-validation-resources'
        slug: hapi-fhir-validation-resources
        description: 'hapifhirvalidationresources là thư viện cung cấp các tài nguyên cần thiết cho việc validation FHIR resources, bao gồm các StructureDefinition, ValueSet, CodeSystem và các tài nguyên terminologies khác. Thư viện này đóng…'
        duration_minutes: 15
        is_free: true
        sort_order: 19
        video_url: null
      - id: 3ebfc6a4-ffd7-4d16-96c4-683f781c58da
        title: 'hapi-fhir-spring-boot'
        slug: hapi-fhir-spring-boot
        description: 'HAPI FHIR là một thư viện mã nguồn mở Java cung cấp nhiều công cụ để làm việc với tiêu chuẩn HL7 FHIR. Nó hỗ trợ đầy đủ từ FHIR DSTU2 đến R5, hiện đang ở phiên bản 6.4.0 (tính đến thời điểm viết bài). Kết hợp với Spring…'
        duration_minutes: 27
        is_free: true
        sort_order: 20
        video_url: null
      - id: 2498cfc1-2c0c-442d-8f2b-002bd72e77fd
        title: 'hapi-fhir-oauth2'
        slug: hapi-fhir-oauth2
        description: 'OAuth2 là một giao thức xác thực và ủy quyền tiêu chuẩn được sử dụng rộng rãi trong các ứng dụng hiện đại, bao gồm cả hệ thống y tế. Khi kết hợp HAPI FHIR với OAuth2, bạn có thể xây dựng ứng dụng y tế tuân thủ SMART on…'
        duration_minutes: 25
        is_free: true
        sort_order: 21
        video_url: null
      - id: ca51fa2e-5272-4f04-a1a2-c66cfb3d3c83
        title: 'hapi-fhir-caching-caffeine'
        slug: hapi-fhir-caching-caffeine
        description: 'Caffeine là một thư viện caching hiệu suất cao cho Java, được phát triển để thay thế cho Guava Cache. Caffeine cung cấp các tính năng mạnh mẽ như:'
        duration_minutes: 41
        is_free: true
        sort_order: 22
        video_url: null
      - id: cb00ebba-618c-40c1-b6a9-fc019ea5678c
        title: 'hapi-fhir-terminology'
        slug: hapi-fhir-terminology
        description: 'Để xây dựng các ứng dụng y tế hiện đại tuân thủ chuẩn FHIR, việc quản lý thuật ngữ (terminology) đóng vai trò cốt yếu. Module hapifhirterminology cung cấp các công cụ mạnh mẽ để làm việc với hệ thống mã hóa y tế, giúp…'
        duration_minutes: 42
        is_free: true
        sort_order: 23
        video_url: null
      - id: 153d0a9d-c55e-4675-a7cf-c4cf00d129fd
        title: 'hapi-fhir-jpaserver-subscription'
        slug: hapi-fhir-jpaserver-subscription
        description: 'HAPI FHIR JPA Server Subscription là một thành phần quan trọng trong hệ sinh thái HAPI FHIR, cung cấp khả năng triển khai các FHIR Subscriptions một cơ chế thông báo thời gian thực giúp các ứng dụng được cập nhật khi có…'
        duration_minutes: 15
        is_free: true
        sort_order: 24
        video_url: null
      - id: b7e4784b-4de8-47c5-bef8-0aa5573603e8
        title: 'Smile CDR'
        slug: smile-cdr
        description: 'Smile CDR (Clinical Data Repository) là một nền tảng FHIR mã nguồn mở được phát triển bởi Smile Digital Health (trước đây là HAPI FHIR). Đây là một triển khai đầy đủ tính năng của tiêu chuẩn HL7 FHIR, cung cấp giải pháp…'
        duration_minutes: 15
        is_free: true
        sort_order: 25
        video_url: null
      - id: 606d1ce7-a8fa-4909-914f-b58369a05a0f
        title: 'Synthea'
        slug: synthea
        description: 'Synthea là một dự án mã nguồn mở được phát triển để tạo ra dữ liệu y tế tổng hợp nhưng chân thực. Công cụ này sinh ra các hồ sơ bệnh nhân hoàn chỉnh với lịch sử y tế, chẩn đoán, thuốc, và các thông tin lâm sàng khác…'
        duration_minutes: 15
        is_free: true
        sort_order: 26
        video_url: null
      - id: 4dec9542-6b19-4330-a184-7e12602f0f4d
        title: 'Cliniko UI'
        slug: cliniko-ui
        description: 'Cliniko UI là một thư viện giao diện người dùng chuyên biệt được thiết kế dành riêng cho các ứng dụng y tế. Tập hợp các thành phần và mẫu thiết kế này giúp các nhà phát triển nhanh chóng xây dựng giao diện chuyên…'
        duration_minutes: 15
        is_free: true
        sort_order: 27
        video_url: null
      - id: 7e11e30e-d9e6-4fd3-be45-4c3e9a2f3e2e
        title: 'Keycloak for SMART'
        slug: keycloak-for-smart
        description: 'Keycloak là một giải pháp quản lý danh tính và truy cập mã nguồn mở mạnh mẽ, có thể cấu hình để hỗ trợ giao thức xác thực SMART on FHIR (Substitutable Medical Applications and Reusable Technologies) cho các ứng dụng y…'
        duration_minutes: 15
        is_free: true
        sort_order: 28
        video_url: null
  - id: section-12
    title: 'Phần 12: Implementation Guide (Hands-on)'
    sort_order: 12
    lessons:
      - id: 590a5210-5f8a-4b90-9e00-877d19ee8f38
        title: 'Development environment'
        slug: setup-a-development-environment
        description: 'Trong bài viết này, chúng ta sẽ thiết lập một môi trường cơ bản cho hệ thống Y tế dựa trên HL7 FHIR R5, tập trung vào việc cài đặt và cấu hình HAPI FHIR Server, PostgreSQL (phiên bản mới nhất) và Keycloak, tất cả đều…'
        duration_minutes: 15
        is_free: true
        sort_order: 1
        video_url: null
      - id: 23bfd230-a893-4fe2-bcd7-7eb22900c0fc
        title: 'Initialize Single-SPA 6'
        slug: initialize-single-spa-6
        description: 'Trong bài viết này, tôi sẽ hướng dẫn chi tiết cách cài đặt môi trường phát triển cho ứng dụng Micro Frontend tích hợp HL7 FHIR, sử dụng SingleSPA 6, ReactJS, Redux và Keycloak SMART on FHIR. Hãy cùng đi qua các bước…'
        duration_minutes: 15
        is_free: true
        sort_order: 2
        video_url: null
      - id: 651faa5e-ddb7-421b-a1be-ed6693d0d1c4
        title: 'Discovery Service'
        slug: discovery-service
        description: 'Service discovery đóng vai trò then chốt trong hệ thống microservices, giúp các service tìm thấy và giao tiếp với nhau mà không cần hardcode địa chỉ. Theo kiến trúc đã thiết kế, discoveryservice sẽ chạy trên cổng 8761…'
        duration_minutes: 15
        is_free: true
        sort_order: 3
        video_url: null
      - id: f0205d47-46a1-4339-9ad2-d629eef4aa52
        title: 'API Gateway'
        slug: api-gateway
        description: 'API Gateway đóng vai trò quan trọng trong kiến trúc microservices của ứng dụng y tế dựa trên FHIR R5. API Gateway hoạt động như một điểm vào duy nhất cho tất cả các yêu cầu từ client, sau đó định tuyến chúng đến các…'
        duration_minutes: 17
        is_free: true
        sort_order: 4
        video_url: null
      - id: 126793a7-07a3-49ac-9265-d3f830344982
        title: 'Config Server'
        slug: config-server
        description: 'Trong hệ thống microservices phức tạp như một ứng dụng y tế dựa trên FHIR R5, việc quản lý cấu hình một cách hiệu quả và khám phá dịch vụ là vô cùng quan trọng. Bài viết này sẽ trình bày cách kết hợp Spring Cloud Config…'
        duration_minutes: 15
        is_free: true
        sort_order: 5
        video_url: null
      - id: 7263ef8f-d321-47bc-8991-059d4545e545
        title: 'Terminology Service'
        slug: terminology-service-mongodb
        description: 'Xây dựng Terminology Service cho Hệ thống Y tế FHIR R5 với MongoDB'
        duration_minutes: 26
        is_free: true
        sort_order: 6
        video_url: null
---

# HL7 FHIR R5 Chuyên Sâu — Reference & Thực hành

Khóa học chuyên sâu HL7 FHIR R5 (Fast Healthcare Interoperability Resources): nguyên tắc thiết kế FHIR, RESTful API, Resource Model & Architecture, Search/CRUD, Data Types, Deep-dive Resources (Clinical/Administrative/Specialized/Infrastructure), Profiling & Validation, Operations & Messaging, Security & Privacy, Terminology, và phần Hands-on xây dựng hệ thống FHIR microservices với HAPI FHIR. Cập nhật theo FHIR R5 (v5.0.0).

> Nội dung được biên soạn từ tài liệu HL7 FHIR R5 (hl7.akitect.io), cập nhật theo phiên bản chính thức FHIR R5 (v5.0.0) của HL7 International.
