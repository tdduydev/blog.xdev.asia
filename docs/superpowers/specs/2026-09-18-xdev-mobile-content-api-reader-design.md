# xdev-mobile — Slice 1: Content API + RN Reader

- Ngày: 2026-09-18
- Trạng thái: chờ review
- Phạm vi: 2 repo — `blog.xdev.asia` (hiện có) và `xdev-mobile` (tạo mới)

## 1. Bối cảnh

`blog.xdev.asia` là Next.js 16.2.1 `output: "export"`, deploy tĩnh lên GitHub Pages
(`.github/workflows/deploy.yml`). Không có server, không có API JSON. Thứ duy nhất
máy đọc được hiện nay: `/feed.xml`, `/llms.txt`, `/llms-full.txt`, `/news-sitemap.xml`
— đều sinh bằng `route.ts` + `export const dynamic = "force-static"`.

Đã xác minh `https://blog.xdev.asia/llms.txt` phục vụ thật trong production, nên
pattern route handler + static export chạy được cho API.

Nội dung: 6480 file markdown, 101 MB (92 MB markdown), 4 locale — vi (130 blog +
1603 lesson), en/ja/zh-tw mỗi locale ~1525. 274 series. Series lớn nhất 75 bài /
2.2 MB. Trung bình ~14 KB/bài.

Firebase project `xdev-asia` đã tồn tại và đang dùng ở web (`src/lib/firebase.ts`):
Auth, Firestore, Firebase AI Logic (`gemini-2.5-flash`), Performance.
`firestore.rules` đã có rule cho `viewCounts`, `comments`, `users/{uid}/bookmarks`,
`users/{uid}/progress`, `users/{uid}/roadmapProgress`, `reviews`, `quizResults`,
`fcmTokens`.

## 2. Bản đồ sub-project

| # | Sub-project | Phụ thuộc |
|---|---|---|
| S0.5 | Chuẩn hoá canonical domain sang `blog.xdev.asia` | — |
| S0 | Content API tĩnh trên blog | S0.5 |
| S1 | RN app shell + reader | S0 |
| S2 | Auth + sync cá nhân (bookmark, progress, review) | S1 |
| S3 | AI trợ lý theo ngữ cảnh bài | S1 |
| S4 | Học tập: series, roadmap, quiz | S1, S2 |
| S5 | RAG toàn blog | S3, S4 |
| S6 | Push notification (FCM) | S2 |
| S7 | On-device model (native module) | S3 |

**Spec này chỉ cover S0, S0.5 và S1.** Mỗi sub-project còn lại có spec riêng.

## 3. Tiêu chí hoàn thành slice 1

Cầm điện thoại mở app, đọc được bài thật từ `blog.xdev.asia`, chuyển được giữa 4
locale, tìm kiếm offline trong locale đang chọn, và bài đã mở vẫn đọc được khi mất
mạng. Chưa có đăng nhập, chưa có AI.

Slice 1 không dùng Firebase.

## 4. S0 — Content API

### 4.1 Nguyên tắc

Hai cơ chế tách bạch, mỗi cái đúng việc:

- **JSON qua route handler** — ít file, tái dùng trực tiếp `src/lib/data.ts` và
  `src/lib/types.ts`, có type checking.
- **Markdown thô qua copy step** — không render gì, chỉ copy. Đây là lý do build
  không nặng thêm đáng kể.

Phương án sinh JSON cho từng bài (6480 route handler) đã bị loại: gần như nhân đôi
thời gian `next build`, và cái giá đó phải trả mỗi lần viết một bài blog mới.

### 4.2 Endpoint

Base: `https://blog.xdev.asia/api/v1/`

| Đường dẫn | Nội dung |
|---|---|
| `manifest.json` | `version`, `generatedAt`, `locales[]`, `counts` theo locale |
| `{locale}/index.json` | mọi post + lesson của locale, metadata đầy đủ |
| `{locale}/series.json` | cây series → chapter → lesson (slug + title + order) |
| `{locale}/taxonomy.json` | categories, tags, authors — đã lọc xuống đúng những gì locale đó dùng |
| `content/**/*.md` | markdown thô, mirror nguyên cấu trúc `content/` |

`{locale}` ∈ `vi | en | ja | zh-tw`. Tổng 13 file JSON sinh lúc build, qua
`[locale]` + `generateStaticParams`.

### 4.3 Shape

`manifest.json`:

```json
{
  "version": "<git sha ngắn>",
  "generatedAt": "2026-09-18T10:00:00.000Z",
  "locales": ["vi", "en", "ja", "zh-tw"],
  "counts": { "vi": { "posts": 130, "lessons": 1603, "series": 73 } }
}
```

Một entry trong `{locale}/index.json`:

```json
{
  "id": "019c9619-b3d2-7c03-d004-e5f6a7b8c9d0",
  "type": "blog",
  "locale": "vi",
  "slug": "ai-trong-y-te-healthcare",
  "title": "AI trong Y tế: ...",
  "excerpt": "...",
  "featuredImage": "/images/blog/ai-trong-y-te-featured.png",
  "readingTime": 35,
  "publishedAt": "2026-04-01T08:00:00.000000Z",
  "author": { "id": "019c9616-d2b4-713f-9b2c-40e2e92a05cf", "name": "Duy Tran", "avatar": "/avatars/....jpeg" },
  "tags": ["ai", "healthcare"],
  "category": { "slug": "ai-machine-learning", "name": "AI & Machine Learning" },
  "series": null,
  "path": "content/blog/ai/ai-trong-y-te-healthcare.md",
  "url": "https://blog.xdev.asia/blog/ai/ai-trong-y-te-healthcare/"
}
```

Với `type: "lesson"`, `series` là `{ "slug": "...", "chapter": "...", "order": 12 }`.

`author` nối theo `id`, không theo `name` — slug/tên hiển thị không đảm bảo
duy nhất hay ổn định giữa các nguồn dữ liệu (xem `taxonomy.authors[]` ở
mục 4.2). `author` có thể là `null` khi entry không có tác giả trong
frontmatter, thay vì một object tác giả rỗng giả (`{ id: "", ... }`).

Mọi trường đường dẫn asset (`featuredImage`, `avatar`) luôn ở một trong hai
dạng: root-relative bắt đầu bằng `/` (vd `/images/blog/....png`), hoặc một
URL tuyệt đối (`http://`/`https://`) — không bao giờ là chuỗi bare không dấu
`/` đầu. App ghép `SITE_URL + value` cho dạng root-relative; dùng nguyên
`value` khi đã là URL tuyệt đối.

`path` là đường dẫn tương đối so với base API: app fetch
`{API_BASE}/{path}` để lấy markdown. Mọi `path` phải trỏ tới file có thật —
đây là invariant được test.

`url` được sinh từ `SITE_URL` trong `src/lib/seo.ts`. Giá trị đó hiện vẫn là
`https://xdev.asia`, nên **S0.5 phải xong trước S0** — nếu không mọi `url` trong
`index.json` sẽ trỏ sai domain. Đây là lý do S0 phụ thuộc S0.5 ở bảng mục 2, dù
hai việc không liên quan về mặt code.

Ước lượng: ~1600 entry/locale × ~400 byte ≈ 650 KB, còn ~170 KB sau gzip.
GitHub Pages phục vụ gzip.

### 4.4 Thực thi

- `src/app/api/v1/manifest.json/route.ts`
- `src/app/api/v1/[locale]/index.json/route.ts` + `generateStaticParams`
- `src/app/api/v1/[locale]/series.json/route.ts`
- `src/app/api/v1/[locale]/taxonomy.json/route.ts`
- `scripts/build-content-api.mjs` — copy `content/**/*.md` → `public/api/v1/content/`
- `package.json`: `"build": "node scripts/build-content-api.mjs && next build"`
- `.gitignore`: thêm `/public/api/`

Ràng buộc bắt buộc từ `AGENTS.md`: Next 16.2.1 có breaking changes so với kiến thức
sẵn có. Trước khi viết route handler phải `npm ci` rồi đọc
`node_modules/next/dist/docs/` (hiện chưa cài nên chưa đọc được).

### 4.5 Rủi ro phải đo, không đoán

Artifact GitHub Pages tăng khoảng 100 MB mỗi lần deploy. Phải đo thời gian build và
thời gian upload ở lần chạy CI đầu tiên.

Nếu vượt ngưỡng chịu được: chuyển phần markdown sang branch hoặc repo phục vụ riêng.
**Không đúng khi nói contract của app không đổi vì base URL nằm trong một
biến môi trường duy nhất.** `path` trong mỗi entry (vd `content/blog/ai/foo.md`)
được resolve tương đối so với CÙNG một base API mà `index.json`/`series.json`/
`taxonomy.json` cũng được fetch từ đó (`{API_BASE}/{path}`, xem mục 4.3) — JSON
và markdown không phải hai thứ độc lập, chúng chia sẻ một base URL. Vì vậy JSON
và markdown chỉ có thể di chuyển CÙNG NHAU dưới một biến môi trường duy nhất;
tách markdown sang host/repo riêng trong khi JSON vẫn ở `blog.xdev.asia` sẽ phá
mọi `path` hiện có, tức là phá contract, không phải giữ nguyên nó.

## 5. S0.5 — Canonical domain

Production phục vụ ở `blog.xdev.asia` nhưng repo sinh link sang `xdev.asia`
(`data/settings.json:9`, `src/lib/seo.ts:7`). Chốt: `blog.xdev.asia` là canonical.

Phải sửa:

- `src/lib/seo.ts:7` — `SITE_URL`
- `data/settings.json` — `site_url`, `profile_url`
- `src/app/robots.ts:12-13` — URL sitemap
- fallback trong `src/app/llms.txt/route.ts:15`, `feed.xml/route.ts:17`,
  `llms-full.txt/route.ts:34`
- `scripts/preflight-checklist.mjs:10`
- `src/components/GlobalChatbot.tsx:71,81` — text prompt

Cải thiện kèm theo (6 file đang tự khai `const SITE_URL` trùng lặp — nguồn gốc của
chính sự lệch này): `src/app/series/[category]/[slug]/page.tsx:24`,
`roadmap/[slug]/page.tsx:10`, `tags/[tag]/page.tsx:16`, `[topic]/page.tsx:13`,
`pages/[slug]/page.tsx:19`, `pages/ve-toi/page.tsx:21` — đổi sang import
`SITE_URL` từ `@/lib/seo`.

**Không** sửa:

- 44 file trong `content/` — `src/lib/content.ts:12` (`legacyContentHosts`) và
  `src/components/ContentRenderer.tsx:26` đã chuẩn hoá `https://xdev.asia/storage/`
  về đường dẫn tương đối. Giữ `xdev.asia` trong danh sách legacy, và **thêm**
  `blog.xdev.asia` vào đó để link asset viết theo domain mới cũng được chuẩn hoá.
- `src/lib/showcase-data.ts:137,150` — link homepage của showcase, không phải
  canonical của blog.

Đây là thay đổi SEO thật (canonical, OG, sitemap, RSS), không chỉ phục vụ app. Tách
thành commit riêng, không trộn với S0.

## 6. S1 — App

### 6.1 Stack

- Repo mới `xdev-mobile` tại `/Users/joinytran/Data/Work/xDev/xdev-mobile`
- Expo SDK 57 (React Native 0.86), TypeScript, expo-router, npm
- Slice 1 không có native module → chạy được trên Expo Go, chưa cần EAS Build

**Phải xác minh trước khi viết implementation plan**: `react-native-webview`
(mục 6.4) có nằm trong runtime của Expo Go ở SDK 57 hay không. Nếu không thì cần
development build và câu "chưa cần EAS Build" ở trên là sai — việc này đổi bước đầu
tiên của plan, nên phải chốt trước, không để phát hiện giữa chừng.

### 6.2 Màn hình

Trang chủ (feed) · Series · Tìm kiếm · Cài đặt (locale, dark mode).

### 6.3 Data layer

- Khởi động: `GET manifest.json` → so `version` với bản đã lưu → khác thì tải lại
  `index.json`, `series.json`, `taxonomy.json` của locale đang chọn
- Chỉ tải index của **một** locale, không tải cả 4
- Index lưu AsyncStorage, giữ trong memory khi app chạy
- Tìm kiếm offline bằng `fuse.js` (web đã dùng; ~1600 entry là vừa sức)
- Mở bài: `GET {API_BASE}/{path}` → cache file qua `expo-file-system`
- Base URL nằm trong một constant duy nhất, đọc từ `EXPO_PUBLIC_API_BASE`

### 6.4 Render bài

WebView (`react-native-webview`): markdown → HTML, nhúng CSS lấy từ blog, dùng lại
`highlight.js` và `mermaid`.

Lý do: đây là blog kỹ thuật — code block, bảng, mermaid chiếm phần lớn nội dung.
Viết lại bằng component RN là re-implement cả một renderer và phải maintain song
song với web.

Đánh đổi đã chấp nhận: WebView nặng hơn và cuộn kém "native" hơn. Shell (danh sách,
navigation, tìm kiếm) vẫn là native.

## 7. Chống lệch contract giữa 2 repo

Repo riêng nên không share type trực tiếp được. Thay vào đó:

- App có `src/api/schema.ts` định nghĩa schema bằng zod
- Contract test fetch API thật (`https://blog.xdev.asia/api/v1/manifest.json`,
  `vi/index.json`) rồi validate
- Chạy trong CI của app + cron hằng ngày

Blog đổi shape → test app đỏ, biết ngay thay vì đợi user báo.

## 8. Error handling

| Tình huống | Hành vi |
|---|---|
| Mất mạng, chưa có cache | Empty state + nút thử lại |
| Index tải lỗi, có cache | Dùng cache, hiện banner "dữ liệu cũ" |
| Markdown 404 | Báo lỗi + nút mở bài trên web |
| `manifest.version` đổi | Tải lại index chạy nền, không chặn UI |
| JSON sai schema | Từ chối, giữ cache cũ, log |

## 9. Testing

Theo TDD: test trước, code sau.

**Blog (S0):** unit test cho generator chạy trên một thư mục content fixture nhỏ.
Assert: số lượng entry đúng theo locale; shape khớp type; mọi `path` trong index
trỏ tới file có thật sau khi copy.

**Blog (S0.5):** test rằng không còn `https://xdev.asia` hardcode trong `src/`,
`scripts/`, `data/`, trừ đúng hai chỗ được miễn ở mục 5 — danh sách legacy host
(`src/lib/content.ts`, `src/components/ContentRenderer.tsx`) và
`src/lib/showcase-data.ts`.

**App (S1):** contract test trên API thật; test data layer (cache hit, cache miss,
stale, schema sai); smoke test render một bài.

Contract test phải kiểm cả **`path` qua HTTP thật**, không chỉ qua filesystem: lấy
một số `path` từ live index rồi assert 200 + body khác rỗng. Test filesystem ở S0
không bắt được trường hợp tên file sống được trên đĩa nhưng hỏng khi thành URL —
rủi ro có thật với slug tiếng Việt trên 6480 file và 4 locale.

## 10. Ràng buộc phiên bản

Mọi dependency dùng **bản stable mới nhất** tại thời điểm implement, không dùng bản
ghim theo trí nhớ.

Quy tắc: trước khi viết bất kỳ dòng code nào chạm tới một thư viện, phải xác minh
phiên bản hiện hành từ nguồn chính thức (registry hoặc docs của chính nó), không suy
từ kiến thức sẵn có.

Đã xác minh ngày 2026-09-18:

- Expo SDK **57.0.0**, kèm React Native **0.86** (docs.expo.dev)

Chưa xác minh, phải kiểm trước khi dùng: `expo-router`, `react-native-webview`,
`expo-file-system`, `fuse.js`, `zod`, và toàn bộ dependency phía blog khi đụng vào
(`next` hiện đang 16.2.1 trong `package.json`).

Cùng ràng buộc này áp cho `AGENTS.md`: đọc `node_modules/next/dist/docs/` sau khi
`npm ci`, vì Next 16.2.1 khác với kiến thức sẵn có.

## 11. Ngoài phạm vi

Auth · Firestore sync · AI chat · push · quiz · roadmap · on-device model · bundle
series để đọc offline cả cụm · RAG.

Ghi chú để dành cho S3: gọi Firebase AI Logic trực tiếp từ client cần bật App Check,
nếu không quota Gemini có thể bị lạm dụng.

Ghi chú để dành cho S2/S3/S6: Auth, Firestore, FCM nằm trong Spark (free).
[Unverified] Cloud Functions cần Blaze plan — thiết kế các slice sau nên tránh phụ
thuộc vào nó.
