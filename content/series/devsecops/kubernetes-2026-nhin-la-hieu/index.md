---
id: 96d6e32d-791d-5d45-a901-e5a66dd85ee9
title: 'Kubernetes 2026 nhìn là hiểu'
slug: kubernetes-2026-nhin-la-hieu
description: >-
  Mười bảy bài về Kubernetes, dựng lại theo đúng tình hình 2026 — vì ba mốc trong năm nay làm
  phần lớn giáo trình đang lưu hành trở thành sai. Mỗi bài đúng một chỗ "tưởng đúng mà sai".
featured_image: images/blog/kubernetes-2026-nhin-la-hieu/cover.webp
level: intermediate
duration_hours: 4
lesson_count: 17
price: '0.00'
is_free: true
view_count: 0
average_rating: '0.00'
review_count: 0
enrollment_count: 0
meta: null
published_at: '2026-08-09T02:00:00.000000Z'
created_at: '2026-08-09T02:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9617-faa6-70d6-8679-ee4de1f177b3, name: DevOps, slug: devops}
tags: [{name: Kubernetes, slug: kubernetes}, {name: DevOps, slug: devops}, {name: Gateway API, slug: gateway-api}, {name: Hạ tầng, slug: ha-tang}, {name: Container, slug: container}, {name: SRE, slug: sre}, {name: bảo mật, slug: bao-mat}, {name: DRA, slug: dra}]
sections: [{id: section-01, title: 'Phần 1: Vì sao Kubernetes làm việc theo cách đó', description: 'Ba tập nền. Hiểu sai chỗ này thì mọi thứ sau đó đều đọc nhầm.', sort_order: 1, lessons: [{id: 27e7592c-b7a5-5235-9258-738744b31e0a, title: 'Bài 1: kubectl apply không ra lệnh cho cụm', slug: vong-lap-dieu-hoa, description: 'Câu lệnh chỉ ghi mong muốn vào sổ. Việc tạo container do một vòng lặp khác làm, và nó chạy mãi mãi.', duration_minutes: 14, is_free: true, sort_order: 0, video_url: https://youtu.be/7KtS1968JlY}, {id: d81706c6-1e79-5399-9fa3-cdaf8c8be4ee, title: 'Bài 2: Pod không phải là container', slug: pod-khong-phai-container, description: 'Pod là cái vỏ chia sẻ mạng, ổ đĩa và vòng đời. Và Pod trần thì không ai dựng lại.', duration_minutes: 15, is_free: true, sort_order: 1, video_url: https://youtu.be/0YqdGvhGzQM}, {id: 1ce87a92-bfe7-584b-a2a2-484152e54980, title: 'Bài 3: Đổi một dòng image thì chuyện gì xảy ra', slug: deployment-va-replicaset, description: 'Pod là bất biến. Deployment đẻ ra ReplicaSet mới, và hai cái sống song song lúc chuyển.', duration_minutes: 15, is_free: true, sort_order: 2, video_url: https://youtu.be/YY9BjHCddLs}]}, {id: section-02, title: 'Phần 2: Đưa lưu lượng vào cụm', description: 'Phần gấp nhất của năm 2026 — ingress-nginx đã ngừng phát triển.', sort_order: 2, lessons: [{id: f08e4158-d4d3-51aa-bcf8-d23dace7fbce, title: 'Bài 4: Service không phải là load balancer', slug: service-khong-phai-load-balancer, description: 'Không có tiến trình nào tên là Service. Nó là luật trên từng máy — và IPVS đã bị gỡ ở 1.36.', duration_minutes: 16, is_free: true, sort_order: 0, video_url: https://youtu.be/IqDjlnDBr3g}, {id: f0ab9f24-8d93-52bf-bb90-5d58491b5d9e, title: 'Bài 5: ingress-nginx đã đóng băng — việc phải làm', slug: ingress-nginx-da-dong-bang, description: 'Tháng 3/2026 dự án ngừng phát triển, repo chỉ đọc, không còn vá bảo mật. Và nó đứng ngay ở cửa vào.', duration_minutes: 13, is_free: true, sort_order: 1, video_url: https://youtu.be/ac8x0L-7zss}, {id: 49767adf-82f1-5303-b2a7-b9915b42bbe8, title: 'Bài 6: Gateway API không phải Ingress viết lại', slug: gateway-api, description: 'Điểm chính không nằm ở cú pháp mà ở chỗ chia việc cho ai — ba tài nguyên cho ba vai.', duration_minutes: 16, is_free: true, sort_order: 2, video_url: https://youtu.be/mq7sdWZLgvU}]}, {id: section-03, title: 'Phần 3: Cấu hình và dữ liệu', description: 'Secret, ổ đĩa, và những chỗ mất dữ liệu mà không ai báo.', sort_order: 3, lessons: [{id: 46ad042b-9eb3-5213-af77-325c6fd980a6, title: 'Bài 7: Secret không hề bí mật', slug: secret-khong-he-bi-mat, description: 'Mặc định chỉ là base64 trong etcd. Và quyền tạo Pod gần bằng quyền đọc mọi Secret trong namespace.', duration_minutes: 14, is_free: true, sort_order: 0, video_url: https://youtu.be/2CfCxFlKLJM}, {id: d2f08279-c4fc-5b53-9a32-d61d42fab0af, title: 'Bài 8: Volume, PV, PVC — ai mới là bên cấp', slug: volume-pv-pvc, description: 'PVC là đơn xin, StorageClass là bên cấp, PV là cái được cấp. Và xoá PVC là mất luôn đĩa.', duration_minutes: 15, is_free: true, sort_order: 1, video_url: https://youtu.be/n9kwJcQseiM}, {id: 7aff26ae-7927-5ef2-8daa-a64740d1c87e, title: 'Bài 9: StatefulSet — khi nào mới thật sự cần', slug: statefulset, description: 'Nó cho bạn danh tính, đúng ba thứ. Không nhân bản, không bầu leader, không sao lưu.', duration_minutes: 14, is_free: true, sort_order: 2, video_url: https://youtu.be/AJ_nqHbdsg4}]}, {id: section-04, title: 'Phần 4: Giữ cho nó không sập', description: 'Probe, tài nguyên, tự mở rộng, và bốn chỗ rơi request khi deploy.', sort_order: 4, lessons: [{id: cb1a2cdd-4230-56ed-b1a7-10c048afe86e, title: 'Bài 10: Ba loại probe, và cách đặt sai làm sập chính mình', slug: ba-loai-probe, description: 'Đặt liveness giống readiness là cách kinh điển tự tạo ra một vòng xoáy chết.', duration_minutes: 15, is_free: true, sort_order: 0, video_url: https://youtu.be/41F723tTS1g}, {id: 4395e690-7912-5e3d-a2d0-bac1ca8d62b3, title: 'Bài 11: requests, limits, và ai bị giết trước', slug: requests-limits-qos, description: 'CPU nén được nên vượt limit là bị bóp; bộ nhớ không nén được nên vượt là bị giết.', duration_minutes: 16, is_free: true, sort_order: 1, video_url: https://youtu.be/6q-aJRpkOEc}, {id: d57cc7cc-7d55-5ef0-b3ad-6006b81a00b6, title: 'Bài 12: Ba tầng tự mở rộng, và cái bẫy ở mức 0', slug: ba-tang-tu-mo-rong, description: 'HPA về 0 bật sẵn từ 1.36 — nhưng ở mức 0 thì HPA mù, và không thể tự bật lại bằng CPU.', duration_minutes: 15, is_free: true, sort_order: 2, video_url: https://youtu.be/KA-znkQPlGw}, {id: 1491ca18-a087-59c6-a891-d2965ea5e533, title: 'Bài 13: Cập nhật cuốn chiếu vẫn rơi request', slug: rollout-va-pdb, description: 'Bốn chỗ rơi, và cả bốn đều là chỗ Kubernetes cố tình không tự lo.', duration_minutes: 15, is_free: true, sort_order: 3, video_url: https://youtu.be/4UfzNkXfYWQ}]}, {id: section-05, title: 'Phần 5: Quyền, an toàn, và mở rộng', description: 'RBAC, cách ly container, CEL thay webhook, và cách xin GPU đã đổi.', sort_order: 5, lessons: [{id: ff900748-bf72-56bd-b77a-7479a2722e0a, title: 'Bài 14: RBAC — tai nạn đến từ ServiceAccount', slug: rbac-va-serviceaccount, description: 'Mỗi pod cũng là một danh tính. Và động từ list gần bằng quyền đọc nội dung.', duration_minutes: 14, is_free: true, sort_order: 0, video_url: https://youtu.be/_OfOl_F1eJQ}, {id: 1ed5e177-a77e-5995-af2e-661de23a177b, title: 'Bài 15: Container tưởng đã cách ly', slug: pod-security-va-networkpolicy, description: 'root trong container là root thật, cho tới khi bật user namespace. Và NetworkPolicy có thể im lặng không chặn gì.', duration_minutes: 16, is_free: true, sort_order: 1, video_url: https://youtu.be/t14Yq73Ub_Q}, {id: 9f8ab27f-f46e-5b97-a2a6-f9db029a6c8f, title: 'Bài 16: Mở rộng Kubernetes — và webhook giờ đã có cách thay', slug: crd-controller-va-cel, description: 'CRD một mình không làm gì. Và từ 1.36, cả hai pha kiểm duyệt viết được bằng CEL trong API server.', duration_minutes: 15, is_free: true, sort_order: 2, video_url: https://youtu.be/p-qr9IUXDrU}, {id: 8f58dc85-e48c-51bb-9acc-2f7ca7808d4f, title: 'Bài 17: DRA — cách xin GPU đã đổi hẳn', slug: dra-xin-gpu-theo-thuoc-tinh, description: 'Xin bằng một con số nguyên là xin mù. DRA xin theo thuộc tính — nhưng ổn định ≠ driver sẵn sàng.', duration_minutes: 15, is_free: true, sort_order: 3, video_url: https://youtu.be/Ib34VHwY1jA}]}]
---

## Vì sao làm lại, không chép giáo trình cũ

Ba mốc trong năm 2026 làm phần lớn hướng dẫn Kubernetes đang lưu hành trở thành sai:

| Mốc | Việc | Hệ quả |
|---|---|---|
| tháng 3/2026 | **ingress-nginx ngừng phát triển**, repo chỉ đọc, không còn vá bảo mật | Mọi bài dạy "cài ingress-nginx" giờ dạy người ta cài một thứ không ai vá nữa |
| tháng 3/2026 | **ingress2gateway 1.0**, dịch được hơn 30 annotation | Đường di trú đã có, không còn cớ hoãn |
| 22/04/2026 | **Kubernetes v1.36 "Haru"** | Gỡ `gitRepo` volume, gỡ **chế độ IPVS của kube-proxy**; DRA, User Namespaces, MutatingAdmissionPolicy, OCI volume, HPA scale-to-zero lên ổn định |

## Series này khác gì

Mỗi bài xoay quanh **đúng một chỗ "tưởng đúng mà sai"** — thứ mà đọc tài liệu chính thức thì
đúng, nhưng dùng thật thì vấp:

- `kubectl apply` không ra lệnh cho cụm, nó chỉ ghi vào sổ
- Service không phải load balancer — không có tiến trình nào tên là Service
- Secret không hề bí mật, và quyền tạo Pod gần bằng quyền đọc mọi Secret
- `ReadWriteOnce` là một **node**, không phải một pod
- PDB **không** chặn cập nhật cuốn chiếu
- HPA về 0 đã bật sẵn ở 1.36 — nhưng ở mức 0 thì nó **mù**

## Chỗ nào là mốc phiên bản thì có nguồn

Đây là series về một thứ đang đổi nhanh. Nên mọi khẳng định về phiên bản đều dẫn được tới nơi
công bố, và chỗ nào là **ước tính của người khác** thì ghi rõ là của ai — không trộn vào như thể
tôi đo được.

## Bạn sẽ học được gì

- Đọc mọi thứ trong Kubernetes qua một khuôn duy nhất: vòng lặp so mong muốn với hiện trạng
- Biết chỗ nào mất dữ liệu mà không ai báo lỗi
- Đặt probe, requests và limits mà không tự tạo ra sự cố cho chính mình
- Nhận ra mấy chỗ bảo mật chỉ *trông như* đã siết
- Biết cái gì ở 2026 đã đổi, và việc phải làm trước khi nâng cụm lên 1.36
