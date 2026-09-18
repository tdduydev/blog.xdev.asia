---
id: 02760001-aie1-4001-a010-000000000042
title: "Một nửa trò chơi 8 số không bao giờ giải được"
slug: khong-gian-trang-thai-tro-choi-8-so
excerpt: >-
  Trò chơi 8 số có 362 880 cách xếp. Duyệt hết không gian trạng thái thì chỉ chạm được
  181 440 — đúng một nửa. Nửa còn lại không phải khó, mà là không tồn tại đường đi.
featured_image: /images/blog/khong-gian-trang-thai-tro-choi-8-so.webp
type: blog
reading_time: 9
view_count: 0
meta: null
published_at: '2026-08-08T16:00:00.000000Z'
created_at: '2026-08-08T16:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: AI, slug: ai}, {name: Thuật toán, slug: thuat-toan}, {name: Tìm kiếm, slug: tim-kiem}, {name: BFS, slug: bfs}, {name: Không gian trạng thái, slug: khong-gian-trang-thai}]
comments: []
---

Trò chơi 8 số: bảng 3×3, tám ô đánh số và một ô trống, đẩy các ô về đúng thứ tự. Đây là
**câu hỏi 7** trong giáo trình Trí tuệ nhân tạo — xây dựng không gian trạng thái cho bài
toán n²−1 số.

Sách dừng ở chỗ biểu diễn trạng thái và sinh trạng thái mới. Bài này đi tiếp tới chỗ **đo
được**, và ở đó có một con số đáng nhớ: trong 362 880 cách xếp 9 ô, chỉ **181 440** cách là
giải được. Nửa còn lại không phải khó — mà là **không tồn tại đường đi**.

## Xem bản video

<div style="position:relative;padding-top:56.25%;margin:1.25rem 0;border-radius:12px;overflow:hidden;background:#0B1020;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/EQw1g5Siamo"
    title="Một nửa trò chơi 8 số không bao giờ giải được"
    loading="lazy"
    style="position:absolute;inset:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen></iframe>
</div>

Bản video 3:10, có phụ đề, bảng 3×3 trượt thật để thấy từng nước đi. Bài viết dưới đây có
code chạy được.

## Sau bài này bạn làm được gì?

- Biểu diễn trạng thái bài toán n²−1 số bằng ma trận, và hiểu vì sao ô trống ghi là `0`.
- Dựng không gian trạng thái như một **đồ thị** thay vì một danh sách trạng thái rời rạc.
- Duyệt rộng toàn bộ không gian và đọc được phân bố độ sâu.
- Biết vì sao đúng một nửa số cách xếp không bao giờ giải được, và kiểm chứng bằng code.

## Biểu diễn: một ma trận, ô trống là 0

Mỗi ô trên bảng đánh số từ 1 tới n²−1, ô trống đánh số 0. Trạng thái xuất phát trong sách:

```text
1 2 3
4 5 6
0 7 8
```

Viết thành ma trận:

```python
[[1, 2, 3], [4, 5, 6], [0, 7, 8]]
```

Vì sao ô trống phải có một con số riêng chứ không để `None` hay khoảng trắng: để trạng thái
trở thành **một dãy 9 số** — so sánh được, băm được, cất vào `set` được. Toàn bộ phần duyệt
phía sau dựa vào điều đó.

Trong code dưới đây tôi trải phẳng ma trận thành một tuple 9 phần tử. Vẫn là ma trận 3×3,
chỉ nhanh hơn khi làm khoá của `dict`.

## Một trạng thái chưa phải không gian trạng thái

Đây là chỗ dễ dừng sớm. Sách mô tả cách sinh trạng thái mới — đẩy ô trống lên, xuống, trái,
phải — rồi dừng. Nhưng **không gian trạng thái** là thứ khác: một **đồ thị**, trong đó mỗi
cách xếp là một đỉnh và mỗi nước đi là một cạnh nối hai đỉnh.

```python
N = 3

def neighbours(state):
    """Các trạng thái sinh ra bằng cách đẩy ô trống lên/xuống/trái/phải."""
    blank = state.index(0)
    row, col = divmod(blank, N)
    out = []
    for name, dr, dc in (("lên", -1, 0), ("xuống", 1, 0), ("trái", 0, -1), ("phải", 0, 1)):
        r, c = row + dr, col + dc
        if not (0 <= r < N and 0 <= c < N):
            continue
        swap = r * N + c
        nxt = list(state)
        nxt[blank], nxt[swap] = nxt[swap], nxt[blank]
        out.append((name, tuple(nxt)))
    return out
```

Chú ý hàm này chỉ đẩy **ô trống**. Đó không phải mẹo cài đặt mà là mô hình đúng: nhấc một ô
số lên rồi đặt chỗ khác là nước đi không tồn tại trong trò chơi.

Với trạng thái xuất phát ở trên, ô trống nằm góc dưới bên trái nên chỉ có **hai** nước hợp
lệ: đẩy lên, hoặc đẩy sang phải.

## Bậc của một đỉnh chỉ phụ thuộc chỗ ô trống

| Ô trống ở | Số nước đi | Số trạng thái |
|---|---|---|
| Góc | 2 | 80 640 |
| Cạnh | 3 | 80 640 |
| Giữa | 4 | 20 160 |

Bậc trung bình của cả đồ thị: **2,6667**. Không gian này **thưa** — mỗi trạng thái chỉ nối
với hai tới bốn trạng thái khác. Đó là lý do duyệt được toàn bộ nó trong hai giây.

## Duyệt rộng toàn bộ không gian

```python
from collections import deque

def bfs(start):
    """Duyệt rộng từ `start`, trả về {trạng thái: số nước đi ít nhất}."""
    dist = {start: 0}
    queue = deque([start])
    while queue:
        state = queue.popleft()
        for _, nxt in neighbours(state):
            if nxt not in dist:
                dist[nxt] = dist[state] + 1
                queue.append(nxt)
    return dist
```

Kết quả:

| | |
|---|---|
| Đỉnh — cách xếp tới được | **181 440** |
| Cạnh — nước đi | 241 920 |
| Bậc trung bình | 2,6667 |
| Sâu nhất | **31 nước** |

Sâu nhất 31 nghĩa là: xáo kiểu gì, nếu giải được thì **không bao giờ cần quá 31 nước**. Và
phần lớn trạng thái nằm ở khoảng giữa chứ không ở rìa — riêng độ sâu 24 đã có 24 047 trạng
thái, trong khi độ sâu 0 tới 5 cộng lại đúng 51 (1 + 2 + 4 + 8 + 16 + 20).

## Chỗ sách không nói: một nửa mất tích

Có 9! = **362 880** cách xếp 9 ô. Duyệt hết chỉ ra **181 440**. Một nửa còn lại không nằm
trong đồ thị — từ trạng thái xuất phát, không có dãy nước đi nào tới được chúng.

Lý do là một **bất biến**. Đếm số cặp nghịch thế (bỏ ô trống ra): với mọi nước đi hợp lệ,
**tính chẵn lẻ** của con số đó không đổi.

```python
def inversions(state):
    """Số cặp nghịch thế, BỎ ô trống. Đây là bất biến quyết định giải được hay không."""
    tiles = [t for t in state if t]
    return sum(1 for i in range(len(tiles)) for j in range(i + 1, len(tiles))
               if tiles[i] > tiles[j])
```

Với bảng 3×3 (n lẻ), đẩy ô trống ngang không đổi thứ tự các ô số nên nghịch thế giữ nguyên;
đẩy dọc thì một ô nhảy qua đúng hai ô khác, làm số nghịch thế đổi 0 hoặc ±2 — chẵn lẻ vẫn
không đổi.

Hệ quả thực dụng: **xáo bảng bằng tay là có một nửa cơ hội tạo ra một bài toán không có lời
giải.** Nếu bạn viết trò chơi này, đừng xáo ngẫu nhiên rồi đưa cho người chơi — hãy xuất phát
từ trạng thái đích và đi lùi một số nước ngẫu nhiên.

## Một chi tiết dễ bỏ qua

Trạng thái xuất phát trong sách nhìn có vẻ đã xáo:

```text
1 2 3
4 5 6
0 7 8
```

Duyệt ra thì nó chỉ cách đích **2 nước**: đẩy ô trống sang phải, rồi sang phải lần nữa. Ví dụ
trong sách là một trạng thái gần như đã giải xong — hợp lý cho việc minh hoạ cách sinh trạng
thái, nhưng dễ làm người đọc tưởng không gian này nhỏ.

## Chạy lại

Toàn bộ con số trong bài duyệt ra bằng một tệp Python 113 dòng, không phụ thuộc ngoài,
chạy hết hai giây:

```bash
python3 measure.py
```

![Kết quả chạy measure.py](/images/blog/khong-gian-trang-thai-tro-choi-8-so-terminal.webp)

Không con số nào trong bài chép từ sách. Muốn kiểm thì chạy lại — sẽ ra đúng từng con số.

## Mang gì đi

- **Không gian trạng thái là đồ thị**, không phải danh sách. Nghĩ theo đỉnh và cạnh thì các
  câu hỏi tiếp theo (đường ngắn nhất, độ sâu, tính liên thông) mới có chỗ để hỏi.
- **Đếm trước khi tối ưu.** Với 181 440 đỉnh và bậc 2,67, duyệt toàn bộ là chuyện hai giây —
  không cần heuristic. Với bảng 4×4 thì 16!/2 ≈ 10¹³ đỉnh, và câu chuyện đổi hoàn toàn.
- **Bất biến là công cụ rẻ nhất để loại việc.** Một phép đếm nghịch thế cho biết ngay bài toán
  có lời giải hay không, trước khi tốn một nước đi nào.
