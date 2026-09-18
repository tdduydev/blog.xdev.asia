---
id: a5c80d95-26ac-5abd-af47-02a646a6021d
title: 'Bài 4: Từ điển mạnh tới đâu, sập ở đâu'
slug: bai-4-tu-dien-manh-toi-dau-sap-o-dau
description: >-
  Precision 93,58 nhưng recall 72,61. Tập đóng thì từ điển ăn, tập mở thì sập.
duration_minutes: 15
is_free: true
video_url: https://youtu.be/wm28XNAf9iA
sort_order: 3
section_title: 'Phần 2: Hai cách làm, hai cách gãy'
course:
  id: 633cc57d-b370-5726-b9a1-daa2c263d7ed
  title: 'Trích xuất nhìn là hiểu'
  slug: trich-xuat-nhin-la-hieu
---

## Xem bản video

<div style="position:relative;padding-top:56.25%;margin:1.25rem 0;border-radius:12px;overflow:hidden;background:#0B1020;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/wm28XNAf9iA"
    title="Bài 4: Từ điển mạnh tới đâu, sập ở đâu"
    loading="lazy"
    style="position:absolute;inset:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen></iframe>
</div>

Bài viết dưới đây đi sâu hơn bản video và có code chạy được.

## Cách xưa nhất, và nó không tệ

Bỏ mô hình học đi. Gom mọi chuỗi thực thể trong 900 câu huấn luyện thành một từ
điển 418 mục, rồi với câu mới thì quét từ trái và lấy **chuỗi khớp dài
nhất**.

| | Từ điển | Mô hình học (bài 3) |
|---|---|---|
| Span precision | **93,58** | 81,48 |
| Span recall | 72,61 | **91,00** |
| Span F1 | 81,77 | 85,97 |

Precision **cao hơn** mô hình học. Vấn đề của từ điển không phải đoán sai — mà là **không thấy**.

## Chỗ nó ăn và chỗ nó sập, đo theo loại

| Loại | Lấy đúng | Recall | Đoạn dựng sai |
|---|---|---|---|
| LOC — địa điểm | 165 / 165 | 100% | 26 |
| ORG — tổ chức | 198 / 224 | 88% | 0 |
| PER — tên người | 16 / 133 | **12%** | 0 |

Cùng một từ điển, cùng một tập kiểm, ba kết cục hoàn toàn khác nhau.

**Địa điểm và tổ chức là tập đóng.** Số tỉnh thành đếm được; số doanh nghiệp lớn cũng đếm được.
Một danh sách đủ tốt là gần như đủ.

**Tên người là tập mở.** Mỗi ngày có tên mới, và không danh sách nào đóng lại được. Thêm dữ
liệu huấn luyện đẩy vấn đề đi xa hơn một chút, không giải quyết nó.

Đo trực tiếp: **22,41%** chuỗi thực thể ở tập kiểm chưa từng xuất hiện khi
huấn luyện — 117 trên 522 đoạn.

## Chỗ sập thứ hai, tinh hơn

Một chuỗi có thể là hai loại tuỳ ngữ cảnh. Trong corpus này:

| Chuỗi | Là địa điểm | Là tên tổ chức |
|---|---|---|
| Bình Dương | 26 lần | 13 lần |
| Cửu Long | 27 lần | 14 lần |
| Sài Gòn | 29 lần | 18 lần |

Từ điển **không có ngữ cảnh** nên buộc phải chọn một loại cho *mọi* lần xuất hiện, và nó chọn
cái gặp nhiều hơn. Hậu quả đo được: **26 đoạn ORG** bị gọi thành LOC,
và LOC nhận thêm **26 đoạn sai**.

Đó là giới hạn thật của từ điển: nó **tra chuỗi**, nó không đọc câu.

## Nhưng đừng bỏ từ điển

Nó vẫn là lựa chọn đúng khi:

- **danh mục đóng và cố định** — mã sản phẩm, tên tỉnh, mã sân bay: thêm mục là xong, không
  huấn luyện lại;
- **precision quan trọng hơn recall** — khớp thì gần như luôn đúng;
- **cần giải thích được** vì sao một cái tên được lấy ra, bằng một dòng trong bảng.

Trong hệ thống thật, từ điển thường **đứng cạnh** mô hình chứ không thay nó: từ điển giữ phần
chắc chắn, mô hình lo phần còn lại. Hai cách gãy khác nhau nên ghép lại thì bù cho nhau.

## Chạy lại mọi con số

Repo Python thuần, không phụ thuộc ngoài, không cần cài gì:

```bash
git clone https://github.com/tdduydev/ner-nhin-la-hieu
cd ner-nhin-la-hieu
python3 scratch/ep04_tu_dien.py
```

![Kết quả chạy ep04_tu_dien](/images/blog/trich-xuat-nhin-la-hieu/ep04_tu_dien.webp)

Toàn bộ số của bảy bài: `python3 measure.py`. Khẳng định số không đổi: `python3 run_tests.py`.

> **Dữ liệu ở đây là tổng hợp.** Corpus 1 200 câu tiếng Việt sinh bằng mã, không
> phải corpus thật — môi trường dựng series không có mạng để tải corpus NER tiếng Việt. Các
> hiện tượng bài này đo là hệ quả của **cấu trúc** bài toán nên tái hiện đúng trên dữ liệu
> tổng hợp; nhưng **mức tuyệt đối không so được** với số công bố trên corpus thật, và series
> không so. Tên tổ chức trong dữ liệu là hư cấu.
