---
id: e4b47f41-5ec0-552e-85bf-e35ee914e0ca
title: 'Bài 6: Naive Bayes: giả định sai mà vẫn dùng được'
slug: bai-6-naive-bayes-gia-dinh-sai-ma-van-dung-duoc
description: >-
  Giả định độc lập gần như luôn sai, nhưng thứ hạng xác suất vẫn đúng đủ để phân loại.
duration_minutes: 18
is_free: true
video_url: https://youtu.be/xB4Kd0SlA5I
sort_order: 2
section_title: 'Phần 2: Bốn họ thuật toán kinh điển'
course:
  id: a4a5696c-4ff1-522b-9564-dd4ea1c0da57
  title: ML nhìn là hiểu
  slug: ml-nhin-la-hieu
---

## Xem bản video

<div style="position:relative;padding-top:56.25%;margin:1.25rem 0;border-radius:12px;overflow:hidden;background:#0B1020;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/xB4Kd0SlA5I"
    title="Bài 6: Naive Bayes: giả định sai mà vẫn dùng được"
    loading="lazy"
    style="position:absolute;inset:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen></iframe>
</div>

Bản video 2:48. Bài viết dưới đây đi sâu hơn và có code chạy được.
Cả 13 tập ở [playlist](https://www.youtube.com/playlist?list=PLe9eqdcVq_qU), xếp sẵn theo thứ tự 1 → 13.

## Nó đếm, nó không vẽ ranh giới

Mọi thuật toán ở bài 3, 4, 5 đều dựng một ranh giới trong không gian đặc trưng. Naive
Bayes không. Nó **đếm**, rồi đảo ngược câu hỏi bằng định lý Bayes.

Bảng 60 căn hộ, chia khoảng thành hạng mục: diện tích nhỏ/vừa/lớn, khoảng cách gần/xa,
số phòng ít/nhiều. Prior — tỉ lệ trước khi xem đặc trưng nào: bán nhanh **45,0%**, bán
chậm **55,0%**.

Với truy vấn "lớn · gần trung tâm · nhiều phòng", đếm trong từng lớp:

| | bán nhanh | bán chậm |
|---|---|---|
| P(lớn \| lớp) | 8/27 = 0,296 | 4/33 = 0,121 |
| P(gần \| lớp) | 17/27 = 0,630 | 3/33 = 0,091 |
| P(nhiều phòng \| lớp) | 15/27 = 0,556 | 9/33 = 0,273 |

Nhân prior với ba likelihood, chuẩn hoá lại: **bán nhanh 94,9%**.

## Chỗ chữ "naive" nằm ở đâu

Phép nhân ba likelihood ở trên chỉ đúng nếu ba đặc trưng **độc lập** với nhau. Ở đây
chúng không độc lập: số phòng suy ra từ diện tích.

Đo mức phụ thuộc bằng chi-square trên bảng chéo diện tích × số phòng: **36,09**. Nếu
hai cột thật sự độc lập thì con số này quanh 2 (bậc tự do). `scipy.chi2_contingency` cho
p = **1,46 × 10⁻⁸** — nghĩa là gần như không thể quan sát được bảng lệch cỡ này nếu hai
cột độc lập.

Giả định naive sai, và sai **có bằng chứng**.

## Sai bao nhiêu thì đủ để sập?

Thay vì nhân rời, đếm cặp (diện tích, số phòng) **cùng nhau** — cách tôn trọng đúng sự
phụ thuộc:

| cách tính | bán nhanh |
|---|---|
| Naive Bayes (nhân rời) | 94,9% |
| đếm cặp thật | 90,4% |

Cùng kết luận. Naive tự tin hơn thật 4,5 điểm phần trăm — đó là cái giá của phép nhân
rời, và nó **không lật kết luận**.

Đây là lý do Naive Bayes vẫn sống trong sản xuất: phân loại chỉ cần **thứ hạng** đúng,
không cần xác suất đúng. Miễn là bạn đừng đem con số 94,9% đó đi báo cáo như một xác
suất thật.

## Khi một ô đếm bằng không

Nếu một hạng mục chưa từng xuất hiện trong một lớp thì likelihood bằng 0, và cả tích về
0 — một lần chưa từng thấy biến thành "không thể xảy ra". Làm mịn Laplace cộng α vào mọi
ô trước khi chia:

```python
p = (hits + alpha) / (len(rows) + alpha * len(values))
```

Ở truy vấn này **không có ô rỗng** nên làm mịn hầu như không đổi kết quả. Vẫn nên bật:
dữ liệu thật sẽ có ô rỗng, và lúc đó không có gì báo.

## Chạy thử

![Kết quả chạy ep06_naive_bayes](/images/blog/ml-nhin-la-hieu/ep06_naive_bayes.webp)

> Ảnh trên là output thật của `python scratch/ep06_naive_bayes.py`, không phải bảng vẽ lại.
> Code: [`scratch/ep06_naive_bayes.py`](https://github.com/tdduydev/ml-nhin-la-hieu/blob/main/scratch/ep06_naive_bayes.py) · [`library/ep06_naive_bayes.py`](https://github.com/tdduydev/ml-nhin-la-hieu/blob/main/library/ep06_naive_bayes.py)

## Dùng sklearn

`CategoricalNB(alpha=1.0)` — đúng loại cho đặc trưng rời rạc, và Laplace đã bật sẵn.
Nó ra đúng **94,9%**, cùng con số với bản viết tay.
