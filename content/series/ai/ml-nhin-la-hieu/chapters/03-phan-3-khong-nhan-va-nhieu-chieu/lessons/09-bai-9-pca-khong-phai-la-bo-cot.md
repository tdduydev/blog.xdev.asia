---
id: 27ff434b-ec88-5905-8c4c-1166b7d0bf8b
title: 'Bài 9: PCA không phải là bỏ cột'
slug: bai-9-pca-khong-phai-la-bo-cot
description: >-
  PCA tạo trục mới từ tổ hợp mọi cột. Không cột nào bị bỏ, và trục mới không có ý nghĩa vật lý.
duration_minutes: 18
is_free: true
video_url: https://youtu.be/ggmD-J7rqWQ
sort_order: 1
section_title: 'Phần 3: Không nhãn, và nhiều chiều'
course:
  id: a4a5696c-4ff1-522b-9564-dd4ea1c0da57
  title: ML nhìn là hiểu
  slug: ml-nhin-la-hieu
---

## Xem bản video

<div style="position:relative;padding-top:56.25%;margin:1.25rem 0;border-radius:12px;overflow:hidden;background:#0B1020;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/ggmD-J7rqWQ"
    title="Bài 9: PCA không phải là bỏ cột"
    loading="lazy"
    style="position:absolute;inset:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen></iframe>
</div>

Bản video 2:46. Bài viết dưới đây đi sâu hơn và có code chạy được.
Cả 13 tập ở [playlist](https://www.youtube.com/playlist?list=PLe9eqdcVq_qU), xếp sẵn theo thứ tự 1 → 13.

## Cách nghĩ đầu tiên, và vì sao nó sai

Năm cột thì không vẽ lên giấy được. Cách nghĩ đầu tiên: bỏ vài cột ít quan trọng đi.

PCA **không** làm vậy. Nó tạo ra trục **mới** bằng tổ hợp của **tất cả** các cột. Không
cột nào bị bỏ, và không trục mới nào còn ý nghĩa vật lý.

Xem loadings của PC1 trên bảng 120 căn hộ, năm cột:

| cột | trọng số trong PC1 |
|---|---|
| diện tích | +0,567 |
| số phòng | +0,557 |
| cách trung tâm | −0,112 |
| giá bán | +0,574 |
| tầng | −0,164 |

Mọi cột đều góp mặt, kể cả "tầng" với trọng số nhỏ. PC1 **không phải** "diện tích", cũng
không phải "giá" — nó là một trục mới không có tên trong thế giới thật. Bạn không thể nói
với đồng nghiệp "PC1 tăng một đơn vị" và mong họ hiểu.

## Phương sai là tiêu chí

PCA chọn trục theo phương sai giữ được:

| | PC1 | PC2 | PC3 | PC4 | PC5 |
|---|---|---|---|---|---|
| giữ được | 58,2% | 22,4% | 17,4% | 2,0% | 0,0% |
| tích luỹ | 58,2% | **80,6%** | **98,0%** | 100,0% | 100,0% |

Muốn giữ 80% phương sai thì 2 trục là đủ. Muốn 90% hay 95% thì cần 3 trục. Từ 5 chiều
xuống 3 chiều mà chỉ mất 2% — vì các cột tương quan mạnh nên chúng vốn đã trùng thông
tin nhau.

## Phân rã riêng, viết tay

PCA về bản chất là phân rã riêng ma trận hiệp phương sai. Cách viết tay dễ đọc nhất là
phép quay Jacobi: mỗi bước chọn một phần tử ngoài đường chéo rồi quay hai trục để triệt
tiêu nó.

```python
theta = (a[q][q] - a[p][p]) / (2 * a[p][q])
sign = 1.0 if theta >= 0 else -1.0
t = sign / (abs(theta) + math.sqrt(theta * theta + 1))
c = 1 / math.sqrt(t * t + 1)
s = t * c
```

Lặp đủ lâu thì mọi phần tử ngoài đường chéo về 0; đường chéo là trị riêng, ma trận quay
tích luỹ là véc-tơ riêng. Chậm hơn LAPACK rất nhiều, nhưng đọc được từ trên xuống dưới.

Một chi tiết: **véc-tơ riêng chỉ xác định tới một dấu**. Không cố định dấu thì cùng dữ
liệu có thể in ra hai bảng khác dấu nhau, và người đọc tưởng kết quả không ổn định. Ở
đây chọn dấu sao cho thành phần lớn nhất là dương.

## Chỗ nó hỏng: quên chuẩn hoá

Bỏ bước chia độ lệch chuẩn, chỉ trừ trung bình:

PC1 giữ **97,9%** phương sai, và nó **chính là cột diện tích**.

Lý do: diện tích tính bằng m² (hàng chục), giá tính bằng tỷ (một chữ số). Phương sai của
diện tích lớn hơn phương sai của giá hàng nghìn lần, nên PCA chỉ đi tìm cột nào có đơn vị
to nhất. Đây không phải phát hiện gì về dữ liệu — nó là phát hiện về đơn vị đo.

`PCA()` của sklearn **không** tự chuẩn hoá. Gọi nó trên dữ liệu thô là một lỗi im lặng.

## Chạy thử

![Kết quả chạy ep09_pca](/images/blog/ml-nhin-la-hieu/ep09_pca.webp)

> Ảnh trên là output thật của `python scratch/ep09_pca.py`, không phải bảng vẽ lại.
> Code: [`scratch/ep09_pca.py`](https://github.com/tdduydev/ml-nhin-la-hieu/blob/main/scratch/ep09_pca.py) · [`library/ep09_pca.py`](https://github.com/tdduydev/ml-nhin-la-hieu/blob/main/library/ep09_pca.py)

## PCA khác chọn lọc đặc trưng

Nếu điều bạn cần là **bỏ** đặc trưng — vì thu thập chúng tốn tiền, hay vì cần giải thích
được — thì PCA không làm việc đó. Lasso ở bài 12 mới làm: nó đưa hệ số về **đúng 0**, tức
loại hẳn đặc trưng khỏi mô hình.
