# Phân tích kích thước site GitHub Pages

- Ngày đo: 2026-09-18
- Commit: cbe2868b (trước khi thêm Content API)
- Lệnh: `npm run build` sạch (`rm -rf .next out` trước)
- Trạng thái: **báo cáo, chưa sửa gì**

## 1. Con số đúng

| | |
|---|---|
| Apparent size (cái được upload) | **7.44 GB** |
| `du -sh out` (allocated blocks trên đĩa) | 9.2 GB |
| Số file | 95.477 |
| Số thư mục | 9.381 |
| Build local | 102 giây |

Chênh 1.76 GB giữa hai con số là block rounding của APFS trên 95k file và 9.4k thư
mục. **7.44 GB là con số phải dùng** khi nói về giới hạn của GitHub Pages; 9.2 GB
chỉ đúng với đĩa local.

## 2. Phân rã theo loại file

| Loại | Số file | Dung lượng | % site | Trung bình |
|---|---|---|---|---|
| `.txt` (RSC payload) | 84.132 | **4.343 MB** | 58% | 52,9 KB |
| `.html` | 8.977 | **1.977 MB** | 27% | 225,6 KB |
| `.png` | 2.206 | **1.281 MB** | 17% | 594,7 KB |
| `.js` | 87 | 5,3 MB | <1% | 62,2 KB |
| `.jpeg` | 25 | 5,4 MB | <1% | 220,1 KB |
| `.css`, `.woff2`, khác | 12 | 0,4 MB | <1% | |

## 3. Phân rã theo thư mục (chồng lấn với mục 2, không cộng dồn)

`du` allocated: zh-tw 1.8G · ja 1.8G · en 1.8G · lessons 1.3G · storage 1.0G ·
tags 581M · images 509M · blog 178M · series 81M · `_next` chỉ 6.5M.

Ba locale dịch (en/ja/zh-tw) chiếm 5.4/9.2 GB allocated — khoảng **58% site**.
Chúng chứa chính các file `.txt`/`.html` đã đếm ở mục 2, nên đây là cách cắt khác
của cùng một khối, không phải khoản cộng thêm.

## 4. Nguyên nhân gốc

Một bài blog duy nhất — `content/blog/ai/ai-trong-y-te-healthcare.md`, markdown
gốc khoảng 14 KB — sinh ra 9 file, tổng **2,1 MB**:

| File | Kích thước |
|---|---|
| `index.html` | 674 KB |
| `index.txt` | 488 KB |
| `__next._full.txt` | 488 KB |
| `__next.blog.$d$slug.__PAGE__.txt` | 337 KB |
| `__next._index.txt` | 144 KB |
| `__next._head.txt` | 5 KB |
| `__next._tree.txt` | 0,7 KB |
| `__next.blog.$d$slug.txt` | 0,6 KB |
| `__next.blog.txt` | 0,6 KB |

Hai điều đã kiểm chứng trực tiếp:

1. **`index.txt` và `__next._full.txt` giống nhau từng byte** (`cmp` xác nhận).
   Trên toàn site: 8.975 file mỗi loại, **1.446 MB mỗi loại** — tức 1.446 MB là
   bản sao y hệt.
2. **`index.html` chỉ có 15% là HTML thật.** Đo trên file trên: 619,6 KB nội dung,
   trong đó 525,8 KB là inline `<script>`, và 523,8 KB trong số đó là RSC flight
   payload (`self.__next_f`). HTML thật chỉ 93,8 KB.

Gộp lại: nội dung bài được serialize **năm lần** (một lần trong HTML, bốn lần trong
các file `.txt`). Ước tính phần RSC payload trên toàn site là
4.343 MB (`.txt`) + ~85% của 1.977 MB (`.html`) ≈ **6,0 GB, tức 81% site**.

Đây là hành vi mặc định của Next 16 App Router khi `output: "export"` — các file
`__next.*.txt` là payload prefetch theo segment.

## 5. Rủi ro hiện tại

| | Tài liệu GitHub | Thực tế |
|---|---|---|
| Published site | tối đa **1 GB** | **7,44 GB** — vượt 7,4 lần |
| Deployment timeout | **10 phút** | job `deploy` mất **7 phút 02** |
| Build | — | job `build` mất 13 phút 21 |

Deploy vẫn đang thành công (5 run gần nhất đều success), nhưng:

- Site vượt giới hạn công bố 7,4 lần. GitHub nói nếu vượt quota thì họ "may not be
  able to serve your site" — **[Unverified]** giới hạn 1 GB được cưỡng chế ở thời
  điểm nào, tài liệu không nói. Đây là rủi ro ngầm: chạy được cho tới lúc không.
- Job deploy đang ở 70% ngưỡng timeout cứng 10 phút. Nội dung còn tăng thì sẽ chạm.
  Đây là con số có thể dự đoán được, không phải chuyện may rủi.

## 6. Phương án cắt giảm

Xếp theo tỷ lệ lợi ích trên rủi ro. **Chưa cái nào được thực hiện.**

### A. Xoá `__next._full.txt` trước khi upload — ĐÃ LÀM, tiết kiệm 1.446 MB (19%)

File này giống `index.txt` từng byte. Thêm một step vào `.github/workflows/deploy.yml`
giữa build và upload:

```yaml
- name: Prune duplicate RSC payloads
  run: find out -name '__next._full.txt' -delete
```

**Đã test và đã triển khai ngày 2026-09-18.** Bằng chứng:

1. Client dựng tên file bằng `` function d(e){return `__next${e.replace(/\//g,".")}.txt`} ``
   trong `out/_next/static/chunks/*.js`, nên `_full` đúng là một segment key mà
   router *có thể* gọi — grep không đủ để kết luận, phải chạy thật.
2. Serve `out/` bằng static server, điều hướng qua trang chủ, danh sách blog, bài
   blog, series, tag và `/en/blog/`, cả prefetch lẫn click client-side.
   Access log: **698 request — 796 lượt 200, 33 lượt 304, 2 lượt 404**.
3. **App không gọi `__next._full.txt` lần nào.** Router gọi `__next._head.txt`,
   `__next.<segment>.txt` và `__next.<segment>.__PAGE__.txt`. Request `_full` duy
   nhất trong log là `curl` thủ công của người kiểm, trước khi xoá.
4. Hai lỗi 404 là `HEAD /en/series/domain/` và
   `HEAD /en/series/architecture/hl7-fhir-r5-chuyen-sau/` — hai series chưa dịch
   sang tiếng Anh, thiếu từ trước, không liên quan.
5. `grep -rn "prefetch" src/` không ra kết quả nào — không `Link` nào đặt prefetch
   tường minh, nên mọi link đều đi đúng đường mặc định mà bài test đã phủ.

Sau khi xoá: **7,44 GB → 6,02 GB**, 95.477 → 86.502 file.

Đã thêm step `Prune duplicate RSC payloads` vào `.github/workflows/deploy.yml`,
nằm giữa Build và Upload artifact, có in ra số MB tiết kiệm được để thấy trong log CI.

**Phải kiểm lại khi nâng cấp Next** — đây là hành vi nội bộ không được tài liệu hoá.

### B. Đưa ảnh ra khỏi Pages — tiết kiệm ~1,5 GB (20%)

`out/storage` 1.0 GB và `out/images` 509 MB đều là ảnh tĩnh, không cần nằm trong
artifact của Pages. Đưa lên R2/CDN rồi trỏ URL sang đó.

Thuận lợi: đã có sẵn một điểm nút duy nhất để đổi — `src/components/ContentRenderer.tsx`
đang chuẩn hoá mọi URL `/storage/` và `src/lib/content.ts` có danh sách
`legacyContentHosts`. Đổi origin ảnh là sửa tập trung chứ không rải rác.

Rủi ro: thấp về kỹ thuật, nhưng thêm một dịch vụ phải vận hành và trả tiền.

### C. Nén ảnh gốc — tiết kiệm ~0,9–1,0 GB (12–13%)

2.206 PNG, trung bình 594,7 KB. Trong đó OG image lành mạnh (1.296 file, 41 MB,
trung bình 32 KB). Phần phình là ~896 file còn lại trong `storage/uploads` và
`images/blog`: khoảng 1.240 MB, **trung bình ~1,4 MB/ảnh**, lớn nhất 8,5 MB
(`images/blog/ban-tin-ai-05-04-2026.png`).

Chuyển sang WebP/AVIF kèm giới hạn chiều rộng hợp lý thường cắt 70–85% → còn khoảng
200–370 MB. **[Inference]** — đây là khoảng giảm điển hình cho ảnh screenshot/diagram
chưa tối ưu, chưa đo trên chính bộ ảnh này.

Lưu ý: `next.config.ts` đang đặt `images.unoptimized: true` vì Pages không chạy được
Next image optimization, nên việc nén **phải làm ở nguồn**, không trông vào Next.

B và C độc lập nhau và nên làm cả hai: làm C trước thì B chỉ phải chuyển 300 MB thay
vì 1,5 GB.

### D. Ba locale dịch — tiết kiệm tới ~4,3 GB (58%)

en, ja, zh-tw chiếm 5,4/9,2 GB allocated. Đây là đòn bẩy lớn nhất về con số, nhưng
**là quyết định sản phẩm, không phải kỹ thuật**: nếu ba locale đó có lưu lượng thật
thì không được đụng. Cần số liệu analytics trước khi bàn.

Biến thể nhẹ hơn: giữ nội dung nhưng chỉ build locale nào có thay đổi, hoặc tách
mỗi locale sang một site Pages riêng để không cái nào chạm trần 1 GB.

### E. Trang tag — tiết kiệm vài trăm MB

`out/tags`: 682 tag × 9 file = 6.146 file, 454 MB, trung bình 75,7 KB/file. Mỗi
trang tag nhiều khả năng đang render lại danh sách bài đầy đủ. Phân trang hoặc giới
hạn số bài hiển thị sẽ cắt phần này. Cần đọc `src/app/tags/[tag]/page.tsx` để xác
nhận — **chưa làm**.

## 7. Những gì chưa xác minh

- Giới hạn 1 GB của Pages được cưỡng chế lúc nào, và vì sao site 7,44 GB vẫn phục vụ
  được. Tài liệu GitHub không nói.
- Có tắt được việc sinh `__next.*.txt` bằng cấu hình Next hay không. Docs đi kèm
  Next 16.2.1 không tài liệu hoá các file này.
- Xoá `__next._full.txt` có làm hỏng điều hướng client-side hay không (mục 6A).
- Nguyên nhân `out/tags` phình (mục 6E) — mới thấy triệu chứng, chưa đọc code.
- Mức nén thực tế đạt được trên bộ ảnh này (mục 6C).

## 8. Không liên quan tới Content API

Plan `docs/superpowers/plans/2026-09-18-content-api-blog-side.md` sẽ thêm ~100 MB
markdown thô. So với 7,44 GB thì đó là **1,3%** — không phải nguyên nhân và cũng
không phải thứ đáng chặn. Hai việc tách bạch.
