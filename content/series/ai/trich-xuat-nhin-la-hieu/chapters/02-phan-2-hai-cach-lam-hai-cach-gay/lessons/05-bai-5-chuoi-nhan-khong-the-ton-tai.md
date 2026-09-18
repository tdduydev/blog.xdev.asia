---
id: 26a17703-5d59-56d8-81e1-cd123499ce0c
title: 'Bài 5: Chuỗi nhãn không thể tồn tại'
slug: bai-5-chuoi-nhan-khong-the-ton-tai
description: >-
  61 chỗ mô hình sinh ra chuỗi nhãn sai luật BIO, mà accuracy 99,71% không thấy.
duration_minutes: 15
is_free: true
video_url: https://youtu.be/G595SAFuofM
sort_order: 4
section_title: 'Phần 2: Hai cách làm, hai cách gãy'
course:
  id: 633cc57d-b370-5726-b9a1-daa2c263d7ed
  title: 'Trích xuất nhìn là hiểu'
  slug: trich-xuat-nhin-la-hieu
---

## Xem bản video

<div style="position:relative;padding-top:56.25%;margin:1.25rem 0;border-radius:12px;overflow:hidden;background:#0B1020;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/G595SAFuofM"
    title="Bài 5: Chuỗi nhãn không thể tồn tại"
    loading="lazy"
    style="position:absolute;inset:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen></iframe>
</div>

Bài viết dưới đây đi sâu hơn bản video và có code chạy được.

## Một loại lỗi mà không độ đo nào ở trên nhìn thấy

Accuracy token **99,71%**. Span F1 **85,97**. Cả hai đều
không thấy chuyện này: **61 chỗ** mà chuỗi nhãn mô hình sinh ra
không thể tồn tại.

## Luật BIO cấm những gì

`I-X` chỉ được đứng sau `B-X` hoặc `I-X` — **cùng loại**.

| | |
|---|---|
| Số nhãn | 7 (`O` + B/I cho ba loại) |
| Cặp viết ra được | 49 |
| Cặp hợp luật | 34 |
| Cặp **bất khả thi** | **15** |

15 cặp đó không xuất hiện trong dữ liệu gán nhãn — không phải vì ít gặp, mà vì
**không có nghĩa**. Và mô hình vẫn sinh ra chúng.

## Hai ca thật

```text
token :  Dương    Thư      rời      Tân      Hưng
đoán  :  B-PER    I-PER    I-ORG    B-ORG    I-ORG
thật  :  B-PER    I-PER    O        B-ORG    I-ORG
                           ▲ I-ORG ngay sau I-PER — không thể tồn tại
```

Mô hình gán **động từ `rời`** là phần bên trong một tên tổ chức, ngay sau một tên người.

```text
token :  đồng     quản     trị      Hồng     Lĩnh
đoán  :  O        O        I-ORG    B-ORG    I-ORG
thật  :  O        O        O        B-ORG    I-ORG
                           ▲ một đoạn bắt đầu bằng chữ I
```

## Đếm trên toàn tập kiểm

| Kiểu | Số chỗ |
|---|---|
| Đổi loại ngay giữa một đoạn | **60** |
| `I` mà không có `B` trước nó | 1 |
| **Tổng** | **61** |

Và chúng không dồn vào vài câu: rải ra **52 / 300** câu, tức
17,3% số câu kiểm chứa ít nhất một chuỗi nhãn không thể tồn tại.

## Vì sao mô hình làm được chuyện đó

Nó chọn nhãn cho **từng token một cách độc lập**: cho điểm mọi nhãn ở vị trí 1, lấy cao nhất;
sang vị trí 2, lấy cao nhất — không nhìn vị trí 1 đã chọn gì; lặp tới hết câu.

Không bước nào kiểm chuỗi kết quả có hợp luật hay không. Không có gì **ngăn** nó viết ra chuỗi
vô nghĩa, nên nó viết.

Đây không phải mô hình yếu. Đây là **cách giải mã** không có ràng buộc — và bài sau sửa đúng
chỗ đó mà không đụng gì tới mô hình.

## Chạy lại mọi con số

Repo Python thuần, không phụ thuộc ngoài, không cần cài gì:

```bash
git clone https://github.com/tdduydev/ner-nhin-la-hieu
cd ner-nhin-la-hieu
python3 scratch/ep05_chuoi_bat_kha_thi.py
```

![Kết quả chạy ep05_chuoi_bat_kha_thi](/images/blog/trich-xuat-nhin-la-hieu/ep05_chuoi_bat_kha_thi.webp)

Toàn bộ số của bảy bài: `python3 measure.py`. Khẳng định số không đổi: `python3 run_tests.py`.

> **Dữ liệu ở đây là tổng hợp.** Corpus 1 200 câu tiếng Việt sinh bằng mã, không
> phải corpus thật — môi trường dựng series không có mạng để tải corpus NER tiếng Việt. Các
> hiện tượng bài này đo là hệ quả của **cấu trúc** bài toán nên tái hiện đúng trên dữ liệu
> tổng hợp; nhưng **mức tuyệt đối không so được** với số công bố trên corpus thật, và series
> không so. Tên tổ chức trong dữ liệu là hư cấu.
