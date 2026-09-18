---
id: ba51dd89-d828-5172-927f-5613f096639d
title: 'Bài 2: Linear Regression: đường thẳng đó tìm ra bằng cách nào'
slug: bai-2-linear-regression-duong-thang-do-tim-ra-bang-cach-nao
description: >-
  Mô hình chỉ là hai con số. MSE là thước đo, và bình phương không phải lựa chọn thẩm mỹ.
duration_minutes: 18
is_free: true
video_url: https://youtu.be/z1gNnOYSKkI
sort_order: 1
section_title: 'Phần 1: Bản đồ và hai mô hình nền'
course:
  id: a4a5696c-4ff1-522b-9564-dd4ea1c0da57
  title: ML nhìn là hiểu
  slug: ml-nhin-la-hieu
---

## Xem bản video

<div style="position:relative;padding-top:56.25%;margin:1.25rem 0;border-radius:12px;overflow:hidden;background:#0B1020;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/z1gNnOYSKkI"
    title="Bài 2: Linear Regression: đường thẳng đó tìm ra bằng cách nào"
    loading="lazy"
    style="position:absolute;inset:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen></iframe>
</div>

Bản video 3:11. Bài viết dưới đây đi sâu hơn và có code chạy được.
Cả 13 tập ở [playlist](https://www.youtube.com/playlist?list=PLe9eqdcVq_qU), xếp sẵn theo thứ tự 1 → 13.

## Mô hình chỉ có hai con số

Bảy căn hộ, diện tích từ 45 tới 105 m², giá từ 2,1 tới 4,7 tỷ. Vẽ lên giấy thì thấy
ngay chúng gần như nằm trên một đường thẳng. Mô hình Linear Regression **chính là**
đường thẳng đó, và nó chỉ gồm hai con số: độ dốc `a` và hệ số chặn `b`.

Với bộ này, nghiệm là `a = 0,0428` và `b = 0,166`. Đọc ra tiếng Việt: mỗi mét vuông
thêm khoảng 42,8 triệu đồng.

## Phần dư, và vì sao phải bình phương

Để nói một đường thẳng sai bao nhiêu, ta lấy giá thật trừ giá đoán ở từng điểm — đó là
**phần dư**. Câu hỏi là gộp bảy phần dư ấy thành một con số bằng cách nào.

Thử ba cách trên một đường cố tình vẽ sai:

| cách gộp | kết quả | vấn đề |
|---|---|---|
| tổng có dấu | −0,04 | gần triệt tiêu — đường sai mà tưởng đúng |
| tổng trị tuyệt đối | 1,38 | đo được, nhưng gãy đạo hàm tại 0 |
| tổng bình phương | 0,373 | đo được và đạo hàm được ở mọi điểm |

Tổng có dấu vô dụng vì phần dư âm và dương triệt tiêu nhau. Trị tuyệt đối thì đo được,
nhưng hàm `|x|` không có đạo hàm tại 0 — mà đạo hàm là thứ mọi phương pháp tối ưu cần.

Bình phương giữ được cả hai: luôn dương, và trơn ở mọi điểm. Chia cho số điểm thì
thành **MSE**, và với đường thử này MSE = 0,053.

## Giải thẳng ra nghiệm

Vì hàm mất mát là bình phương, đạo hàm theo `a` và `b` cho một hệ hai phương trình bậc
nhất — giải ra được ngay, không cần vòng lặp:

```python
def ols(rows):
    n = len(rows)
    mean_x = sum(x for x, _ in rows) / n
    mean_y = sum(y for _, y in rows) / n
    sxy = sum((x - mean_x) * (y - mean_y) for x, y in rows)
    sxx = sum((x - mean_x) ** 2 for x, _ in rows)
    a = sxy / sxx
    return a, mean_y - a * mean_x
```

Đây là toàn bộ Linear Regression một biến. Không learning rate, không số vòng lặp,
không chỗ nào để chỉnh sai.

MSE của đường đã khớp là 0,0010 — nhỏ hơn đường thử **55 lần**. RMSE (căn của MSE) là
0,031 tỷ, tức sai số điển hình khoảng 31 triệu đồng một căn.

## Chạy thử

Mọi con số ở trên đều in ra từ một lệnh:

![Kết quả chạy ep02_linear_regression](/images/blog/ml-nhin-la-hieu/ep02_linear_regression.webp)

> Ảnh trên là output thật của `python scratch/ep02_linear_regression.py`, không phải bảng vẽ lại.
> Code: [`scratch/ep02_linear_regression.py`](https://github.com/tdduydev/ml-nhin-la-hieu/blob/main/scratch/ep02_linear_regression.py) · [`library/ep02_linear_regression.py`](https://github.com/tdduydev/ml-nhin-la-hieu/blob/main/library/ep02_linear_regression.py)

## Chỗ nó hỏng

**Quan hệ cong.** Đường thẳng chỉ mô tả được quan hệ thẳng. Giá căn hộ thực tế thoải
dần ở phân khúc cao — bài 10 dùng đúng tính chất đó để cho boosting có việc làm.

**Điểm ngoại lai.** Vì phạt bình phương, một điểm lệch xa bị phạt rất nặng và kéo cả
đường về phía nó. Đó là cái giá của việc chọn bình phương thay vì trị tuyệt đối: được
nghiệm đóng, mất tính bền với ngoại lai.

## Thư viện làm hộ cái gì

```python
from sklearn.linear_model import LinearRegression
model = LinearRegression().fit(X, y)
```

Hai dòng, và ra đúng `a = 0,042836`, `b = 0,185219` — cùng nghiệm với hàm `ols` ở trên.
Thư viện làm hộ đúng phép giải hệ hai phương trình.

Nó **không** chọn hộ bạn: dùng đặc trưng nào, đo bằng metric nào, và con số này có đáng
tin trên dữ liệu chưa thấy hay không. Bài 12 và 13 nói về chỗ đó.
