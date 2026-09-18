---
id: 4f941f97-de13-5c6b-a580-838ffe20a9bc
title: 'Bài 4: KNN: thuật toán không huấn luyện gì cả'
slug: bai-4-knn-thuat-toan-khong-huan-luyen-gi-ca
description: >-
  Không có bước huấn luyện. Chi phí dồn hết sang lúc dự đoán.
duration_minutes: 18
is_free: true
video_url: https://youtu.be/crD3rycZll0
sort_order: 0
section_title: 'Phần 2: Bốn họ thuật toán kinh điển'
course:
  id: a4a5696c-4ff1-522b-9564-dd4ea1c0da57
  title: ML nhìn là hiểu
  slug: ml-nhin-la-hieu
---

## Xem bản video

<div style="position:relative;padding-top:56.25%;margin:1.25rem 0;border-radius:12px;overflow:hidden;background:#0B1020;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/crD3rycZll0"
    title="Bài 4: KNN: thuật toán không huấn luyện gì cả"
    loading="lazy"
    style="position:absolute;inset:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen></iframe>
</div>

Bản video 2:55. Bài viết dưới đây đi sâu hơn và có code chạy được.
Cả 13 tập ở [playlist](https://www.youtube.com/playlist?list=PLe9eqdcVq_qU), xếp sẵn theo thứ tự 1 → 13.

## Không có bước huấn luyện

KNN không có trọng số, không có hàm mất mát, không có gradient. `fit()` của nó chỉ cất
dữ liệu vào bộ nhớ. Toàn bộ chi phí dồn sang lúc dự đoán: mỗi lần đoán là một lần duyệt
toàn bộ tập huấn luyện.

Cách nó trả lời: tìm k điểm gần nhất, rồi bỏ phiếu.

## Chuẩn hoá — bước dễ bỏ nhất, và đắt nhất

Mười bốn căn hộ, cần đoán căn 75 m² cách trung tâm 4,0 km, với k = 5. Kết quả phụ thuộc
hoàn toàn vào việc bạn có chuẩn hoá hay không:

| | lá phiếu | kết luận |
|---|---|---|
| chưa chuẩn hoá | 2/5 nhanh | **chậm** |
| đã chuẩn hoá | 4/5 nhanh | **nhanh** |

Hai tập láng giềng chỉ trùng nhau **3/5** căn. Lý do đơn giản: diện tích chênh hàng
chục đơn vị, khoảng cách chênh vài đơn vị. Không chuẩn hoá thì `hypot` gần như chỉ đo
diện tích, và cột khoảng cách gần như không có tiếng nói.

Lá phiếu đổi chiều, mà không có gì báo. `KNeighborsClassifier` cũng không nhắc.

```python
def scaled_distance(row, query):
    return math.hypot(
        norm(row[0], AREA_RANGE) - norm(query[0], AREA_RANGE),
        norm(row[1], KM_RANGE) - norm(query[1], KM_RANGE),
    )
```

## k quyết định câu trả lời — nhưng phải tìm chỗ nó quyết định

Ở phần lớn mặt phẳng, mọi k đều cho cùng câu trả lời. Nên muốn cho thấy "k quan trọng"
thì phải **đi tìm** một điểm mà nó thật sự quan trọng, chứ không lấy điểm bất kỳ.

Quét lưới 1 m² × 0,1 km tìm được điểm 41 m², 5,2 km:

| k | phiếu | kết luận |
|---|---|---|
| 1 | 0 nhanh / 1 chậm | chậm |
| 3 | 1 / 2 | chậm |
| 5 | 2 / 3 | chậm |
| 9 | 5 / 4 | **nhanh** |
| 13 | 6 / 7 | chậm |

Cùng một điểm, cùng bộ dữ liệu. Chỉ đổi k là đổi kết luận — và nó còn đổi qua lại, chứ
không đơn điệu theo k.

## Lời nguyền số chiều

Ở nhiều chiều, "gần nhất" và "xa nhất" gần như bằng nhau. Rải 300 điểm trong khối đơn
vị rồi đo tỉ số khoảng cách xa nhất chia gần nhất:

| số chiều | tỉ số |
|---|---|
| 1 | ×622,5 |
| 2 | ×34,0 |
| 5 | ×6,14 |
| 20 | ×2,13 |
| 100 | ×1,38 |

Ở 100 chiều, điểm xa nhất chỉ cách xa hơn điểm gần nhất 1,38 lần. Khái niệm "láng giềng
gần nhất" mất hết ý nghĩa, và KNN không còn gì để dựa vào.

## Chạy thử

![Kết quả chạy ep04_knn](/images/blog/ml-nhin-la-hieu/ep04_knn.webp)

> Ảnh trên là output thật của `python scratch/ep04_knn.py`, không phải bảng vẽ lại.
> Code: [`scratch/ep04_knn.py`](https://github.com/tdduydev/ml-nhin-la-hieu/blob/main/scratch/ep04_knn.py) · [`library/ep04_knn.py`](https://github.com/tdduydev/ml-nhin-la-hieu/blob/main/library/ep04_knn.py)

## Khi nào KNN vẫn là lựa chọn tốt

Ít chiều, dữ liệu không quá lớn, và bạn cần một baseline dựng trong năm phút. Nó cũng
là thuật toán dễ giải thích nhất với người không làm kỹ thuật: "ba căn giống căn này
nhất đều bán nhanh".
