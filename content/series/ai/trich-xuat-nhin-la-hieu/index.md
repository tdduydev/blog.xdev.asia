---
id: 633cc57d-b370-5726-b9a1-daa2c263d7ed
title: 'Trích xuất nhìn là hiểu'
slug: trich-xuat-nhin-la-hieu
description: >-
  Bảy bài về trích xuất thông tin từ văn bản tiếng Việt, NER là ca cụ thể. Mỗi bài một chỗ
  "tưởng đúng mà sai", và mọi con số đều đo được — kèm repo Python thuần chạy lại được từng
  con số xuất hiện trong video.
featured_image: images/blog/trich-xuat-nhin-la-hieu/ep07_tran_cua_mo_hinh.webp
level: intermediate
duration_hours: 2
lesson_count: 7
price: '0.00'
is_free: true
view_count: 0
average_rating: '0.00'
review_count: 0
enrollment_count: 0
meta: null
published_at: '2026-08-08T02:00:00.000000Z'
created_at: '2026-08-08T02:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9618-bb00-7000-b000-bb0000000001, name: AI & Machine Learning, slug: ai-machine-learning}
tags: [{name: NER, slug: ner}, {name: NLP, slug: nlp}, {name: trích xuất thông tin, slug: trich-xuat-thong-tin}, {name: tiếng Việt, slug: tieng-viet}, {name: Python, slug: python}, {name: span F1, slug: span-f1}, {name: BIO tagging, slug: bio-tagging}, {name: Viterbi, slug: viterbi}, {name: gán nhãn dữ liệu, slug: gan-nhan-du-lieu}]
sections: [{id: section-01, title: 'Phần 1: Đo cho đúng', description: 'Ba bài về việc chọn độ đo — phần quyết định mọi thứ sau đó có nghĩa hay không.', sort_order: 1, lessons: [{id: 9c0534c0-76bd-58fe-a047-5bf673db4af3, title: 'Bài 1: Accuracy 93% mà không lấy ra được gì', slug: bai-1-accuracy-93-ma-khong-lay-ra-duoc-gi, description: 'Mô hình trả O cho mọi token đạt 93,16%, và trích xuất được 0 thực thể.', duration_minutes: 14, is_free: true, sort_order: 0, video_url: https://youtu.be/JhwB2LO8P7A}, {id: c64f42b4-6752-5f4d-9b5c-4f51315f1007, title: 'Bài 2: Token đúng không có nghĩa là span đúng', slug: bai-2-token-dung-khong-co-nghia-la-span-dung, description: '62 token gán sai nhãn sinh ra 108 đoạn sai. Một token sai làm hỏng cả đoạn.', duration_minutes: 16, is_free: true, sort_order: 1, video_url: https://youtu.be/RG4iICECpjM}, {id: fa0a2b39-e730-532b-9721-acec3f19a3da, title: 'Bài 3: Một dự đoán, hai con số F1', slug: bai-3-mot-du-doan-hai-con-so-f1, description: 'Token F1 96,14 và span F1 85,97 trên cùng một dự đoán. Khoảng cách lớn dần theo độ dài đoạn.', duration_minutes: 15, is_free: true, sort_order: 2, video_url: https://youtu.be/2f3eAxhkEeI}]}, {id: section-02, title: 'Phần 2: Hai cách làm, hai cách gãy', description: 'Từ điển, mô hình học, và chỗ mỗi cái sập.', sort_order: 2, lessons: [{id: a5c80d95-26ac-5abd-af47-02a646a6021d, title: 'Bài 4: Từ điển mạnh tới đâu, sập ở đâu', slug: bai-4-tu-dien-manh-toi-dau-sap-o-dau, description: 'Precision 93,58 nhưng recall 72,61. Tập đóng thì từ điển ăn, tập mở thì sập.', duration_minutes: 15, is_free: true, sort_order: 0, video_url: https://youtu.be/wm28XNAf9iA}, {id: 26a17703-5d59-56d8-81e1-cd123499ce0c, title: 'Bài 5: Chuỗi nhãn không thể tồn tại', slug: bai-5-chuoi-nhan-khong-the-ton-tai, description: '61 chỗ mô hình sinh ra chuỗi nhãn sai luật BIO, mà accuracy 99,71% không thấy.', duration_minutes: 15, is_free: true, sort_order: 1, video_url: https://youtu.be/G595SAFuofM}, {id: 68da1dad-af17-5dd6-9f5b-b24669fb914c, title: 'Bài 6: Cùng mô hình, đổi cách giải mã', slug: bai-6-cung-mo-hinh-doi-cach-giai-ma, description: 'Không thêm đặc trưng, không thêm dữ liệu: span F1 tăng 13,26 điểm còn accuracy chỉ nhích 0,26.', duration_minutes: 16, is_free: true, sort_order: 2, video_url: https://youtu.be/I3PDU3ulPns}]}, {id: section-03, title: 'Phần 3: Chỗ không sửa được bằng mô hình', description: 'Giới hạn của cách gán nhãn, và trần do người đặt ra.', sort_order: 3, lessons: [{id: e0293b55-9dd4-53e2-af46-fff2574cf547, title: 'Bài 7: Chỗ BIO sập, và chỗ hai người không đồng ý', slug: bai-7-cho-bio-sap-va-cho-hai-nguoi-khong-dong-y, description: 'Cùng một dự đoán: span F1 99,23 với người gán nhãn này, 76,63 với người kia.', duration_minutes: 17, is_free: true, sort_order: 0, video_url: https://youtu.be/88aNnOOERMs}]}]
---

## Series này khác gì

Phần lớn tài liệu về NER bắt đầu bằng kiến trúc mô hình. Series này bắt đầu bằng **cách đo** —
vì ở bài toán trích xuất, chọn sai độ đo thì mọi thứ sau đó vô nghĩa.

Bài 1 dựng một mô hình không học gì và cho nó đạt **93,16%** độ chính xác
trong khi lấy ra **0** thực thể. Bài cuối cho thấy con số **99,23** của
một mô hình tốt tụt xuống **76,63** chỉ vì đổi người viết nhãn chuẩn.

Ở giữa là năm bài về những chỗ bài toán này gãy: span so với token, từ điển so với mô hình học,
chuỗi nhãn không thể tồn tại, và cách sửa nó mà không cần mô hình to hơn.

## Mọi con số đều đo được

Repo kèm theo là **Python thuần, không phụ thuộc ngoài**. `python3 measure.py` in ra toàn bộ
bảng số của bảy bài trong dưới một giây, và `python3 run_tests.py` khẳng định chúng không đổi.

Con số trên khung video và con số trong bài viết đọc từ **cùng một file** do `measure.py` xuất
ra — nên chúng không thể lệch nhau.

## Về dữ liệu

> **Dữ liệu ở đây là tổng hợp.** Corpus 1 200 câu tiếng Việt sinh bằng mã, không
> phải corpus thật — môi trường dựng series không có mạng để tải corpus NER tiếng Việt. Các
> hiện tượng bài này đo là hệ quả của **cấu trúc** bài toán nên tái hiện đúng trên dữ liệu
> tổng hợp; nhưng **mức tuyệt đối không so được** với số công bố trên corpus thật, và series
> không so. Tên tổ chức trong dữ liệu là hư cấu.

Bản đầu của corpus phải dựng lại: entity chiếm 48% token (corpus thật 2–5%) và mô hình đạt
điểm **1.0 tuyệt đối** ở mọi độ đo. Điểm tuyệt đối không phải tin tốt — nó là dấu hiệu dữ liệu
rò đáp án qua ngữ cảnh. Bản dùng thật cố ý có bốn thứ: chữ nền chiếm đa số, tên chưa từng gặp
ở tập kiểm, chuỗi vừa là địa điểm vừa là tên tổ chức, và bẫy viết hoa không phải thực thể.

## Bạn sẽ học được gì

- Chọn độ đo theo câu hỏi người dùng hỏi, không theo cái dễ tính
- Đọc khoảng cách giữa token F1 và span F1, và biết nó đến từ đâu
- Biết khi nào từ điển là lựa chọn đúng, và khi nào nó chắc chắn sập
- Phát hiện lỗi cấu trúc mà accuracy và F1 đều không thấy
- Sửa lỗi đó bằng cách giải mã, không bằng mô hình to hơn
- Đặt mục tiêu theo mức đồng thuận của người gán nhãn, không theo 100
