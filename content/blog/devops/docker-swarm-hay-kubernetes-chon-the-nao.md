---
id: 02760001-aie1-4001-a010-000000000043
title: "Docker Swarm hay Kubernetes — chọn thế nào"
slug: docker-swarm-hay-kubernetes-chon-the-nao
excerpt: >-
  Cả hai giải cùng một bài toán. Câu hỏi không phải cái nào mạnh hơn, mà là đội của bạn
  gánh được cái nào — và bạn có định tự vận hành cụm hay không.
featured_image: /images/blog/docker-swarm-hay-kubernetes.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-08-08T21:00:00.000000Z'
created_at: '2026-08-08T21:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category:
  id: 019c9617-faa6-70d6-8679-ee4de1f177b3
  name: DevOps
  slug: devops
tags: [{name: Docker Swarm, slug: docker-swarm}, {name: Kubernetes, slug: kubernetes}, {name: DevOps, slug: devops}, {name: Hạ tầng, slug: ha-tang}, {name: Container, slug: container}]
comments: []
---

> **Bài này là đánh giá, không phải số đo.** Các bài khác của kênh chỉ đưa con số đo được và
> kèm mã chạy lại được. Bài này dựa trên cách hai hệ thống được thiết kế và được dùng — không
> có phép đo nào trên máy tôi. Nếu bạn cần số hiệu năng, hãy tự đo trên **chính khối lượng
> công việc của mình**; số của người khác không thay được.

Docker Swarm và Kubernetes giải cùng một bài toán. Nên câu hỏi "cái nào mạnh hơn" gần như
luôn dẫn tới câu trả lời vô dụng. Câu hỏi dùng được là: **đội của bạn gánh được cái nào**.

## Xem bản video

<div style="position:relative;padding-top:56.25%;margin:1.25rem 0;border-radius:12px;overflow:hidden;background:#080C18;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/EWOB1c5y6fw"
    title="Docker Swarm hay Kubernetes — chọn thế nào"
    loading="lazy"
    style="position:absolute;inset:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen></iframe>
</div>

Bản video 3:07, có sơ đồ động: một máy chết rồi container tự nhảy sang máy khác, và hai cây
đối tượng đặt cạnh nhau.

## Cả hai đều trả lời bốn câu này

Bạn có nhiều máy và nhiều container. Ai đó phải quyết:

| Câu hỏi | Việc phải làm |
|---|---|
| Container nào chạy ở máy nào? | xếp việc lên cụm |
| Máy chết thì sao? | dựng lại chỗ khác, tự động |
| Dịch vụ tìm nhau kiểu gì? | tên nội bộ, cân tải |
| Đổi phiên bản mà không tắt? | cập nhật cuốn chiếu, quay lui được |

![Máy chết thì container đi đâu](/images/blog/swarm-k8s-dieu-phoi.webp)

Cả Swarm lẫn Kubernetes đều làm được cả bốn. **Khác nhau không nằm ở chỗ làm được gì** — nó
nằm ở cái giá phải trả để có chúng.

## Khác nhau căn bản: một chế độ, và một nền tảng

Đây là chỗ quyết định mọi thứ phía sau, và nó không phải danh sách tính năng.

**Docker Swarm là một *chế độ* có sẵn trong Docker Engine.** `docker swarm init` là xong; không
cài thêm thành phần nào. File cấu hình vẫn là compose bạn viết hàng ngày, thêm khối `deploy`:

```yaml
services:
  web:
    image: app:1.2
    deploy:
      replicas: 3
```

**Kubernetes là một *nền tảng* có API mở rộng được.** Bạn không chỉ dùng các loại tài nguyên có
sẵn — bạn định nghĩa loại mới rồi viết controller cho nó:

![Một chế độ so với một nền tảng](/images/blog/swarm-k8s-che-do-vs-nen-tang.webp)

Một bên là **tính năng của công cụ bạn đã dùng**. Bên kia là **nền tảng bạn xây lên trên**.

## Swarm được gì

**Ít thứ phải học.** Về cơ bản chỉ có `service`, `stack` và mạng overlay. Người vừa biết Docker
đọc hiểu cấu hình ngay, không phải học một từ vựng mới.

**Đổi lại: bạn tự vận hành cụm.** Không có nhà cung cấp lớn nào chạy control plane Swarm hộ bạn
như cách họ làm với Kubernetes.

## Swarm mất gì — và đây là phần quan trọng

Cập nhật cuốn chiếu, tự dựng lại khi máy chết, cân tải nội bộ — Swarm làm được hết. **Chuyện
không nằm ở đó.**

Chỗ hụt là **hệ sinh thái**. Phần lớn công cụ hạ tầng ngày nay viết cho Kubernetes trước:
service mesh, chính sách bảo mật, autoscaler, GitOps, operator cho cơ sở dữ liệu. Nhiều thứ
không có bản cho Swarm, và số còn lại thì tài liệu mỏng.

Đây là **rủi ro về đà**, không phải rủi ro kỹ thuật — công cụ, tài liệu, câu hỏi trên diễn đàn,
và người biết việc. Và theo tôi nó là loại rủi ro nặng hơn, vì nó không hiện ra trong bản demo;
nó hiện ra sau mười tám tháng khi bạn cần một thứ mà cả thế giới đã có sẵn cho K8s.

## Kubernetes được gì

**Chỗ để mở rộng.** Khai báo loại tài nguyên mới rồi viết controller — cơ sở dữ liệu, chứng chỉ,
hàng đợi, tất cả nói cùng một ngôn ngữ khai báo với phần còn lại của hạ tầng.

**Một chuẩn chung.** Nhà cung cấp nào cũng có bản dịch vụ quản lý, công cụ nào cũng hỗ trợ,
người biết việc dễ tuyển hơn hẳn. Lợi thế này **cộng dồn theo thời gian**: càng nhiều thứ nói
cùng ngôn ngữ, càng ít thứ bạn phải tự viết.

## Kubernetes mất gì

**Sự đơn giản.** Cùng một dịch vụ nhỏ, đặt hai cây cạnh nhau:

![Cùng một dịch vụ nhỏ, hai cây đối tượng](/images/blog/swarm-k8s-cay-doi-tuong.webp)

Nhiều nút vặn nghĩa là **nhiều chỗ vặn sai**. Theo kinh nghiệm của tôi, phần lớn sự cố trên
Kubernetes đến từ **cấu hình** chứ không từ mã ứng dụng — quyền RBAC thiếu, probe đặt sai,
resource limit quá tay, network policy chặn nhầm.

Và nếu bạn tự dựng cụm chứ không dùng dịch vụ quản lý, còn phải có người trực: nâng cấp phiên
bản, xoay chứng chỉ, chăm etcd.

## Bảng quyết định

Đọc theo hàng:

| | Swarm hợp khi | Kubernetes hợp khi |
|---|---|---|
| Đội có người chuyên hạ tầng? | không | có |
| Số dịch vụ | vài cái | vài chục trở lên |
| Cần phân quyền chi tiết, tự mở rộng? | không | có |
| Công cụ bạn cần chỉ có bản K8s? | không | có |
| Ai vận hành cụm? | chính bạn | nhà cung cấp, hoặc đội riêng |

Không hàng nào tự nó quyết. Nhưng nếu **ba hàng trở lên** nghiêng về một bên, đó là câu trả lời.

## Điểm hay bị bỏ qua

Lợi thế lớn nhất của Swarm là **ít phải vận hành**.

Nhưng nếu bạn dùng Kubernetes dạng **dịch vụ quản lý**, phần vận hành nặng nhất — control plane,
nâng cấp, etcd — đã có người khác gánh. Và khi đó lợi thế của Swarm teo lại rất nhiều, trong khi
cái giá của nó (hệ sinh thái mỏng) thì vẫn còn nguyên.

Nên câu hỏi thật không phải "Swarm hay Kubernetes". Nó là:

> **Bạn có định tự vận hành cụm không?**

Trả lời được câu đó thì hai lựa chọn kia gần như tự sắp xếp.

## Mang gì đi

- **Chọn theo đội, không theo bảng tính năng.** Cả hai làm được những việc cơ bản; thứ khác nhau
  là ai phải gánh phần vận hành và bạn có người đó không.
- **Rủi ro về đà là thật.** Một hệ thống hoạt động tốt hôm nay vẫn có thể là lựa chọn tệ nếu ba
  năm nữa không còn công cụ và không tuyển được người.
- **Dịch vụ quản lý làm đổi cả bài toán.** Trước khi so Swarm với Kubernetes, hãy quyết trước xem
  bạn có tự vận hành cụm hay không.
