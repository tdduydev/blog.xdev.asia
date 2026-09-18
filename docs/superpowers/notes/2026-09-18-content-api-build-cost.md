# Chi phí build của Content API

- Ngày đo: 2026-09-18
- Baseline: commit `cbe2868b` (trước Task 1), cây sạch, `rm -rf .next out` rồi `npm run build`
- Sau: commit `dc23725e` (sau Task 7)

## Kết quả

| | Baseline | Sau Content API | Thay đổi |
|---|---|---|---|
| Apparent size của `out/` | 7,44 GB | **7,53 GB** | **+1,2%** |
| Số file trong `out/` | 95.477 | **101.970** | +6.493 |
| Thời gian build local | 102 giây | **134 giây** | **+31%** |

Chênh 6.493 file khớp chính xác: 6.480 file markdown (Task 7) + 13 file JSON (Task 4-6).

## Đối chiếu ngưỡng

Ngưỡng tương đối đặt ở Ruling 4, thay cho ngưỡng tuyệt đối "700 MB" vốn vô nghĩa khi
baseline đã là 7,44 GB:

| Ngưỡng | Giới hạn | Thực tế | |
|---|---|---|---|
| Tăng dung lượng | < 10% | +1,2% | **đạt** |
| Tăng thời gian build | < 50% | +31% | **đạt** |

Phương án copy markdown vào GitHub Pages **dùng được**. Không cần tách markdown sang
nơi khác.

## Thời gian build tăng do đâu

Ba mốc đo được:

| Mốc | Build |
|---|---|
| Baseline, chưa có gì | 102s |
| Sau Task 6 — có 13 route handler, chưa copy | 118-123s |
| Sau Task 7 — có cả copy | 134s |

Nên route handler tốn khoảng **16-21s**, bước copy tốn khoảng **11-16s**.

Báo cáo của Task 7 ban đầu quy toàn bộ phần tăng cho route handler và coi bước copy là
không đáng kể, dẫn chứng script tự đo 1,3-1,7s. Con số tự đo đó chỉ tính vòng lặp của
chính script; nó không tính phần `next build` copy 92 MB từ `public/` sang `out/`, và
đó mới là phần lớn chi phí của bước này. Kết luận không đổi — copy vẫn rẻ — nhưng quy
kết thì đã sửa.

## Rủi ro còn lại: timeout của job deploy

Đây là thứ đáng lo hơn dung lượng.

| | |
|---|---|
| Timeout cứng của GitHub Pages deployment | **10 phút** |
| Job `deploy` lần đo gần nhất (run 32147932521) | **7 phút 02** |
| Job `build` lần đó | 13 phút 21 |

Job deploy đang ở 70% ngưỡng. Content API thêm 92 MB và 6.493 file vào artifact. Nếu
phần đó đẩy job deploy qua 10 phút thì deploy fail — và đó là phát hiện phải ghi lại,
không phải lỗi vặt để thử lại.

Chưa đo được con số này ở local: nó chỉ xuất hiện khi chạy thật trên GitHub Actions.
Lần push đầu tiên là phép đo đó.

## Bối cảnh: site đã lớn sẵn từ trước

Content API chỉ thêm 1,2%. Bản thân site đã 7,44 GB trước khi có nó, trong khi giới hạn
công bố của GitHub Pages là **1 GB** — vượt 7,4 lần. Phân tích riêng và các phương án
cắt giảm nằm ở `docs/superpowers/notes/2026-09-18-pages-site-size-analysis.md`. Phương
án A trong đó đã làm (commit `494984f7`, xoá `__next._full.txt` trùng lặp trước khi
upload), giúp artifact thực tế đẩy lên Pages nhỏ hơn con số local khoảng 1,4 GB.
