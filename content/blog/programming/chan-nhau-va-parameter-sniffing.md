---
id: 019cb6f4-9e35-7c28-a751-3f9d5e2b8a66
title: 'Chặn nhau và parameter sniffing: cách chữa kinh điển đang tắt thuốc mới'
slug: chan-nhau-va-parameter-sniffing
excerpt: >-
  Tắt parameter sniffing bằng trace flag 4136 là cách chữa dân DBA làm mười mấy năm nay. Nhưng
  tài liệu Microsoft ghi rõ: parameter sniffing bị tắt thì PSPO của bản 2022 cũng tắt theo. Băng
  cũ chặn mất thuốc mới. Bài này cũng đính chính chỗ tôi nói chưa đủ về optimized locking.
featured_image: /images/blog/chan-nhau-parameter-sniffing/cover.webp
type: blog
reading_time: 15
view_count: 0
meta: null
published_at: '2026-08-10T21:00:00.000000Z'
created_at: '2026-08-10T21:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat2-7002-a002-000000000002, name: Lập trình, slug: programming}
tags: [{name: SQL Server, slug: sql-server}, {name: T-SQL, slug: t-sql}, {name: Database, slug: database}, {name: Performance, slug: performance}]
comments: []
---

Chào anh em. Bài trước tôi kết bằng câu: thấy ước lượng lệch thực tế thì hỏi vì sao lệch — thống kê cũ, **tham số bị sniff**, hay biểu thức khó ước lượng. Bài này mổ cái ở giữa.

Và tôi nói luôn cái đắt nhất ngay đầu, vì nó ảnh hưởng tới rất nhiều hệ thống: **cách chữa parameter sniffing kinh điển — tắt parameter sniffing đi — chính nó đang tắt luôn cái thuốc mới mà Microsoft đưa vào từ bản 2022.**

## Xem bản video

<div style="position:relative;padding-top:56.25%;margin:1.25rem 0;border-radius:12px;overflow:hidden;background:#080C18;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/ljtT750PL0M"
    title="Chặn nhau và parameter sniffing"
    loading="lazy"
    style="position:absolute;inset:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen></iframe>
</div>

## Phần 1 — chặn nhau

### Vì sao sửa nghìn dòng lại khoá cả bảng

Khoá tồn tại để hai giao dịch không cùng lúc sửa một chỗ dữ liệu. Cần thiết, nhưng tài liệu nói thẳng cái giá: giảm mức đồng thời, sinh deadlock, thêm phức tạp, và bản thân nó tốn tài nguyên.

Chưa có optimized locking, một câu `UPDATE` sửa **1.000 dòng** có thể cần **1.000 khoá `X` trên từng dòng, giữ tới hết giao dịch**. Hai hậu quả:

- **Tốn bộ nhớ khoá** — tài nguyên chung của cả instance.
- **Leo thang khoá.** Khi số khoá nhiều quá, engine đổi chiến lược: thay hàng nghìn khoá dòng bằng một khoá trên **cả bảng**. Anh em sửa 1.000 dòng trong bảng 10 triệu dòng, mà cả bảng đứng.

### TID locking

Optimized locking có hai thành phần chính. Thứ nhất là **transaction ID (TID) locking**.

TID là mã định danh của một giao dịch, và **mỗi dòng mang theo TID của giao dịch sửa nó gần nhất**. Thay vì giữ nhiều khoá trên từng dòng tới cuối giao dịch, engine giữ đúng **một khoá `X` trên TID**. Khoá dòng và khoá trang vẫn được lấy khi sửa, nhưng **thả ngay sau khi sửa xong từng dòng**.

Quay lại ví dụ 1.000 dòng: vẫn 1.000 khoá, nhưng mỗi khoá sống rất ngắn, và thứ duy nhất giữ tới cuối là **một** khoá trên TID. Bộ nhớ khoá giảm, và leo thang khoá — theo tài liệu — **ít xảy ra hơn nhiều**.

### Kiểm bằng mắt, mất ba phút

```sql
BEGIN TRANSACTION;

UPDATE t0 SET b = b + 10;

SELECT * FROM sys.dm_tran_locks
WHERE request_session_id = @@SPID
  AND resource_type IN ('PAGE','RID','KEY','XACT');

COMMIT TRANSACTION;
```

- **Bật** optimized locking: chỉ **một** khoá `X` trên resource `XACT`.
- **Không bật**, cùng ví dụ 3 dòng: **bốn** khoá — một `IX` trên trang, cộng ba `X` trên từng dòng.

### Lock after qualification (LAQ)

Thành phần thứ hai, và tôi thấy nó thông minh hơn cái đầu.

Bình thường engine quét từng dòng tìm dòng thoả `WHERE`, và **lấy khoá `U` trước khi kiểm**. Thoả thì nâng lên `X` rồi sửa, giữ tới cuối giao dịch. Nghĩa là những dòng anh em kiểm rồi bỏ đi cũng đã từng bị khoá.

Với LAQ: engine kiểm điều kiện **trên bản commit mới nhất của dòng, không lấy khoá nào**. Không thoả thì đi tiếp. Thoả thì mới lấy `X`, và **thả ngay khi sửa xong**.

Hệ quả: **hai truy vấn sửa hai dòng khác nhau không còn chặn nhau.**

### Nhưng LAQ đổi kết quả

Đây là chỗ tôi nghĩ phần lớn bài giới thiệu bỏ qua — và nó không phải chuyện hiệu năng, nó là chuyện **đúng sai**.

Bảng `t4` có một dòng `(a=1, b=1)`:

| Session 1 | Session 2 |
|---|---|
| `BEGIN TRAN T1;`<br>`UPDATE t4 SET b = 2 WHERE a = 1;` | |
| | `BEGIN TRAN T2;`<br>`UPDATE t4 SET b = 3 WHERE b = 2;` |
| `COMMIT;` | |
| | `COMMIT;` |

- **Không có LAQ**: T2 bị chặn, chờ T1 xong, thấy `b = 2` nên sửa thành 3 → **`b = 3`**.
- **Có LAQ**: T2 kiểm điều kiện trên bản commit mới nhất (lúc đó `b = 1`), không thoả, **bỏ qua dòng** và chạy xong không bị chặn → **`b = 2`**.

**Cùng một cặp giao dịch. Hai kết quả khác nhau.**

Tài liệu đóng khung một lưu ý quan trọng: kể cả **khi không có LAQ**, ứng dụng cũng không nên giả định engine bảo đảm thứ tự thực thi nghiêm ngặt khi dùng isolation dựa trên row versioning. Ai cần thứ tự nghiêm ngặt thì phải dùng `REPEATABLE READ` hoặc `SERIALIZABLE`.

### Đính chính: tôi nói chưa đủ ở hai bài trước

Hai bài trước tôi có nói optimized locking là tính năng đáng tiền nhất của bản 2025. Phần đó là **nhận định** của tôi và tôi vẫn giữ. Nhưng tôi đã bỏ qua ba điều:

1. **Ở SQL Server 2025 nó tắt mặc định.** Bảng availability của tài liệu ghi rõ *Enabled by default: No*, bật cho từng database bằng `ALTER DATABASE ... SET OPTIMIZED_LOCKING = ON`. Chỉ Azure SQL Database, Managed Instance và Fabric là luôn bật. SQL Server 2022 trở về trước: **không có**.
2. **Hai điều kiện tiên quyết**: phải bật **ADR** trước mới bật được nó (và muốn tắt ADR thì phải tắt optimized locking trước); còn **LAQ chỉ hoạt động khi bật RCSI**.
3. **Nó đổi được kết quả**, như phần trên.

Kiểm ba cột một lần:

```sql
SELECT database_id, name,
       is_accelerated_database_recovery_on,
       is_read_committed_snapshot_on,
       is_optimized_locking_on
FROM sys.databases WHERE name = DB_NAME();
```

### LAQ không phải lúc nào cũng chạy

Tài liệu liệt kê các trường hợp LAQ **không** được dùng:

- có hint xung đột: `UPDLOCK`, `READCOMMITTEDLOCK`, `XLOCK`, `HOLDLOCK`;
- isolation khác `READ COMMITTED`, hoặc `READ_COMMITTED_SNAPSHOT` đang tắt;
- bảng bị sửa **có columnstore index**;
- câu DML có **gán biến**;
- câu DML có `OUTPUT` chèn vào table variable hoặc trả về result set;
- câu DML dùng **hơn một** toán tử index seek/scan để đọc dòng cần sửa;
- câu `MERGE`;
- và khi **engine tự tắt** bằng heuristics.

Về cái cuối: nếu kế hoạch dùng toán tử không hỗ trợ kiểm lại điều kiện, engine **huỷ câu đó và chạy lại không dùng LAQ** — lúc đó extended event `lock_after_qual_stmt_abort` bắn ra. Xảy ra nhiều thì cơ chế phản hồi tự tắt LAQ cho khỏi tốn.

### Skip index locks

Thành phần thứ ba, ít được nhắc. Nếu không có truy vấn nào cần dòng đó ổn định (không ai chạy `REPEATABLE READ`/`SERIALIZABLE` trên nó), engine **bỏ luôn cả khoá dòng và khoá trang**, chỉ dùng một page latch.

| Áp dụng | Không áp dụng |
|---|---|
| `INSERT` trên heap | `DELETE` |
| `UPDATE` trên clustered index | dòng có cột LOB (`nvarchar(max)`, `json`…) |
| `UPDATE` trên nonclustered index | `UPDATE` trên heap khi dòng có forwarding pointer |
| `UPDATE` trên heap | dòng trên trang vừa split trong cùng giao dịch |

Tôi kể chi tiết này không phải để anh em học thuộc, mà để thấy: **mấy tính năng này có rất nhiều điều kiện — đừng giả định nó luôn hoạt động.**

## Phần 2 — parameter sniffing

### Bệnh là gì

Anh em có một thủ tục nhận tham số. Lần chạy đầu, SQL Server nhìn **giá trị cụ thể của lần đó**, lập kế hoạch tối ưu cho đúng giá trị đó, rồi cache lại.

Vấn đề nằm ở dữ liệu phân bố không đều. Khách hàng A có 10 đơn hàng, khách hàng B có 10 triệu. Kế hoạch tốt cho 10 đơn là nhảy vào index lấy từng dòng; kế hoạch tốt cho 10 triệu là quét thẳng. Lần đầu chạy với khách A → cache kế hoạch của khách A → khách B dùng đúng kế hoạch đó → sập.

Đây **không phải lỗi**. Nó là hệ quả của việc tái dùng kế hoạch.

### PSPO chữa bằng cách nào

Từ bản 2022, **Parameter Sensitive Plan optimization** làm thế này:

1. Lúc biên dịch lần đầu, engine đọc **biểu đồ thống kê** của cột để tìm chỗ phân bố lệch, và chọn ra **tối đa 3 predicate** đáng lo nhất — giới hạn 3 để plan cache và Query Store không phình.
2. Nó sinh ra một **dispatcher plan** — cái vỏ chứa logic phân luồng gọi là *dispatcher expression*.
3. Mỗi predicate được chia thành **3 khoảng số dòng** (thấp / trung / cao).
4. Tới lúc chạy, dispatcher nhìn giá trị tham số, tính xem rơi vào khoảng nào, rồi gọi đúng một **query variant** — mỗi variant có kế hoạch riêng trong cache.

Hai predicate, mỗi cái ba khoảng → **9 query variant**.

### Cái bẫy

PSPO cần **compatibility level 160** trở lên. Cái này nhiều người biết. Nhưng còn một điều kiện nữa, và đây là bẫy:

> **Nếu parameter sniffing đang bị tắt — bằng trace flag 4136, bằng cấu hình `PARAMETER_SNIFFING` ở mức database, hoặc bằng hint `USE HINT('DISABLE_PARAMETER_SNIFFING')` — thì PSPO cũng bị tắt theo.**

Tài liệu ghi rõ như vậy. Anh em thấy vấn đề chưa?

Tắt parameter sniffing chính là **cách chữa kinh điển** mà dân DBA làm mười mấy năm nay. Rất nhiều hệ thống đã bật trace flag đó từ thời SQL Server 2012 rồi không ai nhớ nữa. Nghĩa là anh em nâng cấp lên 2022 hay 2025, tưởng đã có thuốc mới, mà **thuốc đang bị cái băng cũ chặn lại**.

Đi kiểm trace flag của instance đi. Mất năm phút.

### Bản 2025 nới thêm

Với compatibility level **170**, PSPO có bốn cải tiến. Hai cái đáng kể nhất:

- Hỗ trợ **câu lệnh sửa dữ liệu** — `DELETE`, `INSERT`, `MERGE`, `UPDATE`. Trước đây chỉ làm với truy vấn đọc.
- Mở rộng hỗ trợ cho **`tempdb`**.

Nhưng vẫn còn hai giới hạn cần biết:

- PSPO **chỉ làm việc với predicate bằng** (`=`), không làm với `>` hay `<`.
- Mỗi variant chiếm một chỗ trong plan cache **và** trong Query Store. Query Store giới hạn số kế hoạch mỗi truy vấn (`max_plans_per_query`, mặc định **200**), và với PSPO thì con số đó tiêu nhanh hơn anh em tưởng.

Muốn xem quan hệ cha–con giữa dispatcher và variant thì tra `sys.query_store_query_variant`.

Tắt PSPO khi cần:

```sql
-- mức database
ALTER DATABASE SCOPED CONFIGURATION
  SET PARAMETER_SENSITIVE_PLAN_OPTIMIZATION = OFF;
```

Ở mức từng câu thì dùng query hint `DISABLE_PARAMETER_SENSITIVE_PLAN`.

## Ba việc làm được ngay

1. **Kiểm trace flag 4136 và `PARAMETER_SNIFFING`.** Nếu đang tắt parameter sniffing mà anh em ở bản 2022 trở lên, thì anh em đang tự chặn PSPO — cân nhắc bỏ băng cũ để dùng thuốc mới.
2. **Nếu chạy bản 2025, kiểm ba cột trong `sys.databases`**: ADR, RCSI, optimized locking. Chưa bật thì biết là mình chưa có nó — đừng tưởng nâng cấp là xong.
3. **Trước khi bật optimized locking trên hệ thống thật, đọc lại ví dụ `t4` ở trên.** LAQ bỏ chặn bằng cách đổi thời điểm kiểm điều kiện; với workload dựa vào thứ tự thực thi nghiêm ngặt thì nó đổi cả kết quả.

## Nguồn

- [Optimized Locking](https://learn.microsoft.com/en-us/sql/relational-databases/performance/optimized-locking) — Microsoft Learn
- [Parameter Sensitive Plan Optimization](https://learn.microsoft.com/en-us/sql/relational-databases/performance/parameter-sensitive-plan-optimization) — Microsoft Learn
- [ALTER DATABASE SET options](https://learn.microsoft.com/en-us/sql/t-sql/statements/alter-database-transact-sql-set-options) — Microsoft Learn
- Bài trước: [Đọc execution plan](/blog/doc-execution-plan-sql-server) · [SQL Server 2025 vs PostgreSQL 18](/blog/sql-server-2025-vs-postgresql-18) · [SQL Server 2019 → 2025](/blog/sql-server-2019-2022-2025-tung-ban-doi-gi)
