---
id: 019cb4a2-3e17-7b44-8c02-91f7d6ea5b38
title: 'SQL Server 2025 vs PostgreSQL 18: hai triết lý, không phải hai bảng tính năng'
slug: sql-server-2025-vs-postgresql-18
excerpt: Hai bản lớn cùng ra cuối 2025. SQL Server 2025 nhét AI vào trong engine; PostgreSQL 18 viết lại tầng I/O. So sánh này không kết luận cái nào hơn — nó chỉ ra hai bên trả lời khác nhau cho câu hỏi "database nên tự làm bao nhiêu".
featured_image: /images/blog/sql-server-vs-postgresql/cover.webp
type: blog
reading_time: 18
view_count: 0
meta: null
published_at: '2026-08-10T14:00:00.000000Z'
created_at: '2026-08-10T14:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat2-7002-a002-000000000002, name: Lập trình, slug: programming}
tags: [{name: SQL Server, slug: sql-server}, {name: PostgreSQL, slug: postgresql}, {name: Database, slug: database}, {name: T-SQL, slug: t-sql}, {name: Backend, slug: backend}]
comments: []
---

Chào anh em. Trước khi vào bài, tôi phải đính chính một chuyện về phiên bản, vì nó ảnh hưởng tới cả bài.

**Không có SQL Server 2026.** Bản mới nhất của Microsoft vẫn là **SQL Server 2025 (17.x)**, phát hành 18/11/2025. Tôi đã tra lại hôm nay, không thấy thông báo nào về bản kế tiếp. Còn PostgreSQL thì bản production hiện tại là **18.x** — 18.0 ra ngày 25/09/2025.

Hoá ra như vậy lại tốt: hai bản này ra cách nhau chưa tới hai tháng, nên so ngang hàng được, không phải so bản mới với bản cũ.

Và điểm tôi muốn nói ngay: **hai bản này không cạnh tranh trên cùng một danh sách tính năng.** SQL Server 2025 kéo AI vào trong engine. PostgreSQL 18 viết lại tầng I/O. Đó là hai câu trả lời khác nhau cho câu hỏi "database nên tự làm bao nhiêu việc" — và câu trả lời phù hợp phụ thuộc vào đội của anh em, không phụ thuộc vào bảng tính năng.

## Bảng đối chiếu nhanh

| | SQL Server 2025 | PostgreSQL 18 |
|---|---|---|
| Phát hành | 18/11/2025 | 25/09/2025 |
| Số hiệu | 17.x, compat level 170 | 18.x |
| Trọng tâm bản này | AI trong engine, optimized locking | Async I/O, skip scan |
| Vector / embedding | **có sẵn trong lõi** | qua extension |
| JSON kiểu nhị phân | mới có ở bản này | đã có từ lâu (`jsonb`) |
| Regex trong SQL | mới có ở bản này | đã có từ lâu |
| Mô hình mở rộng | tính năng do nhà sản xuất thêm | extension do cộng đồng thêm |
| Giấy phép | thương mại, chia theo ấn bản | mã nguồn mở, không giới hạn ấn bản |

## Chỗ khác nhau lớn nhất không nằm ở tính năng

Nhìn hai danh sách "what's new", anh em sẽ thấy một khuôn hình lặp lại:

- **SQL Server 2025** vừa thêm: kiểu `vector`, `VECTOR_DISTANCE`, `CREATE VECTOR INDEX`, `CREATE EXTERNAL MODEL`, `AI_GENERATE_EMBEDDINGS`, kiểu `json` nhị phân, và cả họ hàm regex `REGEXP_LIKE`/`REGEXP_REPLACE`/`REGEXP_SUBSTR`.
- **PostgreSQL 18** vừa thêm: hệ thống I/O bất đồng bộ, skip scan cho B-tree, `uuidv7()`, virtual generated columns, temporal constraint `WITHOUT OVERLAPS`, xác thực OAuth.

Để ý: mấy thứ SQL Server *mới* có — JSON nhị phân, regex — thì PostgreSQL đã có từ nhiều năm trước. Còn thứ PostgreSQL *mới* có — async I/O — thì SQL Server đã làm từ lâu ở tầng storage engine.

*[Nhận định của tôi]* Đó không phải chuyện bên nào đi trước bên nào. Đó là hệ quả của hai mô hình phát triển khác nhau:

- **SQL Server là sản phẩm.** Tính năng vào lõi theo lịch của Microsoft, đóng gói sẵn, hỗ trợ có hợp đồng. Anh em bật lên là dùng, không phải chọn.
- **PostgreSQL là nền tảng.** Lõi giữ nhỏ và chắc; phần lớn thứ hào nhoáng nằm ở extension. Anh em được chọn — và cũng buộc phải chọn.

Cùng một chuyện "làm vector search", hai bên trả lời khác nhau về **ai chịu trách nhiệm**.

## Vector và AI: có sẵn, hay tự lắp

SQL Server 2025 cho anh em kiểu `vector` ngay trong lõi, cộng với `CREATE EXTERNAL MODEL` để khai báo endpoint mô hình AI ngay trong database, rồi `AI_GENERATE_CHUNKS` cắt văn bản và `AI_GENERATE_EMBEDDINGS` sinh vector. Cả đường ống RAG viết bằng T-SQL, dữ liệu không rời database.

Nhưng phải đọc kỹ một chỗ mà nhiều bài giới thiệu bỏ qua: **`CREATE VECTOR INDEX` và `VECTOR_SEARCH` đòi bật `PREVIEW_FEATURES`** ở database scoped configuration. Nghĩa là ngay tại thời điểm bản 2025 phát hành chính thức, phần index vector vẫn chưa phải tính năng chính thức. Kiểu `vector` và các hàm tính khoảng cách thì đã chính thức.

Bên PostgreSQL, vector không nằm trong lõi — nó là extension. Đổi lại, anh em chọn được extension nào, nâng cấp nó độc lập với phiên bản database, và không phải chờ chu kỳ ba năm của nhà sản xuất.

**Chọn thế nào:** nếu đội anh em nhỏ, không có người chuyên lo hạ tầng database, thì "có sẵn trong lõi" đáng giá hơn nhiều so với vẻ ngoài của nó. Nếu đội có người vận hành PostgreSQL thạo, thì mô hình extension cho anh em đi nhanh hơn — và không bị kẹt khi nhà sản xuất đổi ý (nhớ Big Data Clusters).

## Hiệu năng: hai bên đang sửa hai chỗ khác nhau

### PostgreSQL 18 sửa tầng đọc đĩa

Đây là thay đổi lớn nhất của bản 18: **hệ thống I/O bất đồng bộ**, điều khiển bằng biến `io_method`, kèm `io_combine_limit` và `io_max_combine_limit`, và một view mới `pg_aios` để nhìn các file handle đang chạy. Nó cải thiện sequential scan, bitmap heap scan và vacuum.

Cùng bản còn có:

- **Skip scan cho B-tree nhiều cột** — index dùng được cả khi truy vấn không ràng buộc cột đầu. Trước đây index `(a, b)` mà `WHERE b = ...` thì gần như vô dụng.
- **Self-join elimination** — tự bỏ self-join thừa, tắt được bằng `enable_self_join_elimination`.
- Tối ưu hash join và `GROUP BY`, incremental sort cho merge join, partitionwise join rộng hơn.

### SQL Server 2025 sửa tầng khoá

Còn SQL Server 2025 đặt cược vào **optimized locking**: giảm chặn nhau, giảm bộ nhớ dành cho khoá, tránh leo thang khoá. Cộng thêm **tempdb space resource governance** chặn workload chạy loạn ngốn sạch `tempdb`, **ADR trong tempdb**, và `sp_executesql` tối ưu để giảm compilation storm.

*[Nhận định]* Việc hai bên sửa hai chỗ khác nhau nói lên chỗ đau của mỗi bên. PostgreSQL vốn mạnh về đồng thời nhờ MVCC nhưng tầng I/O thì cũ; SQL Server vốn mạnh về I/O và optimizer nhưng mô hình khoá mặc định gây chặn nhiều hơn. Mỗi bản mới, người ta vá đúng chỗ yếu của mình.

**Và đây là điều quan trọng hơn cả hai danh sách trên:** đừng lấy mấy con số hiệu năng trên mạng làm căn cứ. Tôi không đo, và bài nào đưa ra con số "nhanh gấp N lần" mà không kèm workload, phần cứng, cấu hình thì con số đó không dùng được cho anh em. Cách duy nhất là chạy thử workload của chính mình.

## Chuyện SQL viết hàng ngày

Bảng này là chỗ PostgreSQL 18 tôi thấy thích:

| Việc | PostgreSQL 18 | SQL Server 2025 |
|---|---|---|
| UUID sắp theo thời gian | `uuidv7()` | `NEWSEQUENTIALID()` (đã có từ lâu) |
| Trả về giá trị cũ **và** mới sau UPDATE | `RETURNING old.col, new.col` | `OUTPUT DELETED.col, INSERTED.col` |
| Khoá chính không chồng khoảng thời gian | `PRIMARY KEY (id, period WITHOUT OVERLAPS)` | không có tương đương trực tiếp |
| Cột sinh tính lúc đọc | virtual generated column (mặc định) | computed column không `PERSISTED` |
| Ràng buộc khai báo mà chưa áp | `NOT ENFORCED` | `WITH NOCHECK` |
| Regex | có từ lâu | mới có ở 2025 |

Cái `RETURNING old.new` của PostgreSQL 18 đáng khen: nó gọn hơn hẳn cú pháp `OUTPUT` với hai bảng ảo `DELETED`/`INSERTED`. Còn temporal constraint `WITHOUT OVERLAPS` thì giải một bài toán mà bên SQL Server anh em phải tự viết trigger hoặc check constraint — đặt phòng, hợp đồng, lịch làm việc, bất cứ thứ gì có khoảng thời gian không được chồng nhau.

Ngược lại, SQL Server 2025 vừa bổ sung `JSON_OBJECTAGG`, `JSON_ARRAYAGG`, `PRODUCT()`, `CURRENT_DATE`, `BASE64_ENCODE`/`DECODE`, và toán tử nối chuỗi `||` — mấy thứ mà dân PostgreSQL dùng đã lâu.

## Nâng cấp: chỗ PostgreSQL 18 tiến bộ rõ

`pg_upgrade` của bản 18 có ba cải tiến đáng kể:

- **Giữ lại thống kê của optimizer** khi nâng cấp (thống kê mở rộng thì không; tắt bằng `--no-statistics`). Trước đây nâng cấp xong là mất sạch thống kê, và database chạy chậm cho tới khi `ANALYZE` xong — đúng lúc người dùng vừa quay lại.
- **`--swap`** — tráo thư mục thay vì copy/clone/link, là cách nhanh nhất.
- **Kiểm tra song song** qua `--jobs` có sẵn.

Bên SQL Server, nâng cấp đi theo hướng khác: compatibility level. Anh em nâng engine trước, giữ compat level cũ, rồi nâng level sau khi đã thử. Mềm dẻo hơn cho việc gỡ lỗi, nhưng cũng là chỗ nhiều hệ thống mắc kẹt mười năm ở một level cũ mà không ai dám đụng.

Nói thêm một cái bẫy đã ghi trong [bài về EF Core](/lessons/dotnet-10-sql-server-chuyen-dich/linq-di-xuong-sql-server): với SQL Server 2025, đặt compat level từ **170** trở lên thì EF Core 10 tự chuyển cột JSON từ `nvarchar(max)` sang kiểu `json`, và migration kế tiếp sẽ đổi thật.

## Bảo mật và xác thực

PostgreSQL 18:

- **Xác thực OAuth** — phương thức `oauth` trong `pg_hba.conf`, cần build với `--with-libcurl`.
- **Data checksums bật mặc định** khi `initdb`. Đây là thay đổi tôi thấy đúng đắn nhất: phát hiện hỏng dữ liệu ở đĩa lẽ ra phải là mặc định từ lâu.
- **Cảnh báo khi đặt mật khẩu MD5** — MD5 đang trên đường bị bỏ.
- Cấu hình cipher cho TLS 1.3 qua `ssl_tls13_ciphers`; `ssl_groups` thay `ssl_ecdh_curve`.

SQL Server 2025:

- **TLS 1.3 với TDS 8.0** trải khắp: SQL Agent, `sqlcmd`, `bcp`, linked server, replication, log shipping, availability group.
- **PBKDF2 làm mặc định** cho băm mật khẩu.
- Xác thực bằng **Microsoft Entra ID**, và managed identity khi chạy qua Azure Arc.

*[Nhận định]* Hai bên đang giải cùng một bài toán "đừng lưu mật khẩu nữa" bằng hai hệ sinh thái danh tính khác nhau. Nếu tổ chức của anh em đã dùng Microsoft Entra ID thì SQL Server nối vào gần như không tốn công; nếu không, OAuth của PostgreSQL 18 là đường mở hơn.

## Tiền, và ràng buộc theo ấn bản

Đây là chỗ khác nhau rõ nhất và ít được nói nhất trong các bài so sánh kỹ thuật.

SQL Server 2025 chia theo ấn bản, và bản này có mấy thay đổi đáng chú ý:

- **Standard**: tối đa 4 socket hoặc 32 nhân, buffer pool 256 GB. Và **Resource Governor giờ có trong Standard** — trước đây là tính năng riêng của Enterprise.
- **Express**: trần database lên **50 GB**.
- **Web edition bị khai tử.**
- Thêm **Standard Developer** và **Enterprise Developer**, miễn phí cho mục đích phát triển.

PostgreSQL không có khái niệm ấn bản. Không có trần nhân, không có trần bộ nhớ, không có tính năng bị khoá sau giấy phép đắt hơn.

*[Nhận định]* Với hệ thống vừa và nhỏ, cái trần 32 nhân / 256 GB của Standard hiếm khi chạm tới, nên lập luận "PostgreSQL miễn phí" không mạnh bằng người ta hay nghĩ — chi phí thật thường nằm ở người vận hành, không ở giấy phép. Nhưng khi hệ thống lớn tới mức phải nhảy lên Enterprise, thì khoản chênh đủ để thuê hẳn một người chuyên PostgreSQL.

## Vậy chọn cái nào

Tôi không đưa ra câu trả lời chung, vì không có. Nhưng có mấy câu hỏi trả lời được:

**Chọn SQL Server khi:**

- Ứng dụng đã là .NET và đội quen T-SQL. Chỗ nối giữa EF Core và SQL Server là thứ được đầu tư nhiều nhất trong cả hai sản phẩm.
- Tổ chức đã đứng trong hệ Microsoft — Entra ID, Azure, Power BI, Fabric.
- Anh em cần vector search mà không muốn tự lắp và tự vận hành extension.
- Anh em cần một số điện thoại để gọi khi sập lúc ba giờ sáng.

**Chọn PostgreSQL khi:**

- Đội có người vận hành database thạo, hoặc dùng dịch vụ quản lý.
- Anh em cần chọn và nâng cấp từng mảnh độc lập với chu kỳ phát hành của nhà sản xuất.
- Hệ thống sẽ vượt trần của Standard edition, và anh em không muốn trả tiền Enterprise.
- Anh em muốn tránh rủi ro nhà sản xuất khai tử một tính năng mình đang xây trên đó.

**Và một điều đúng cho cả hai:** đừng chọn theo bảng tính năng. Dựng một bản sao, chạy đúng workload của mình, mở execution plan ra mà đọc. Mười danh sách "what's new" cộng lại không bằng một lần đo trên dữ liệu thật của anh em.

## Nguồn

- [What's New in SQL Server 2025](https://learn.microsoft.com/en-us/sql/sql-server/what-s-new-in-sql-server-2025?view=sql-server-ver17) — Microsoft Learn
- [SQL Server 2025 Release Notes](https://learn.microsoft.com/en-us/sql/sql-server/sql-server-2025-release-notes?view=sql-server-ver17) — Microsoft Learn
- [SQL Server 2025 is Now Generally Available](https://techcommunity.microsoft.com/blog/sqlserver/sql-server-2025-is-now-generally-available/4470570) — Microsoft Community Hub
- [PostgreSQL 18 Release Notes](https://www.postgresql.org/docs/18/release-18.html) — PostgreSQL Global Development Group
- [PostgreSQL 18.0 release](https://www.postgresql.org/docs/release/18.0/) — PostgreSQL Global Development Group
- Bài trước: [SQL Server 2019 → 2025, từng bản đổi gì](/blog/sql-server-2019-2022-2025-tung-ban-doi-gi)
