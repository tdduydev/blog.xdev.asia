# xdev-mobile — App + CI/CD + Store Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Một app React Native đọc nội dung xdev.asia, có pipeline tự động build cả iOS lẫn Android và đẩy lên store.

**Architecture:** Expo SDK 57 (React Native 0.86) với expo-router. Shell native, thân bài render bằng WebView để dùng lại highlight.js/mermaid của blog. Dữ liệu lấy từ Content API tĩnh trên `blog.xdev.asia`, cache offline. CI/CD dùng EAS Build gọi từ GitHub Actions, EAS Submit đẩy lên hai store.

**Tech Stack:** Expo SDK 57, React Native 0.86, TypeScript, expo-router, react-native-webview, fuse.js, zod, Vitest, EAS Build/Submit, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-18-xdev-mobile-content-api-reader-design.md` mục 6, 7, 8 (S1). Phần CI/CD và store là mở rộng ngoài spec, người dùng yêu cầu ngày 2026-09-18.

**Phụ thuộc:** Plan A (`2026-09-18-content-api-blog-side.md`). Task 5-8 của plan đó phải xong thì API mới sống. Task 1-4 của plan này chạy song song được; Task 5 trở đi cần API thật.

## Global Constraints

- Repo mới `tdduydev/xdev-mobile`, **public** (người dùng yêu cầu).
- Mọi dependency cài bằng bản mới nhất qua `npx expo install` (nó ghim đúng version tương thích SDK) hoặc `@latest` với gói ngoài Expo. Không ghim theo trí nhớ.
- Base URL của API nằm trong **một** constant duy nhất, đọc từ `EXPO_PUBLIC_API_BASE`. Mặc định `https://blog.xdev.asia/api/v1`.
- **Không secret nào vào repo.** Repo public. `EXPO_TOKEN`, ASC API key, Google service account JSON đều nằm ở GitHub Secrets hoặc EAS credentials.
- Đã xác minh 2026-09-18: `react-native-webview` nằm trong Expo Go (`inExpoGo: true`), nên Task 1-4 chạy được trên Expo Go, chưa cần development build.
- EAS free tier: 15 iOS + 15 Android build/tháng, hàng chờ thấp (có lúc chờ 90+ phút), timeout build 45 phút, 1 concurrency. Đừng thiết kế pipeline build mỗi lần push — sẽ cháy quota trong một tuần.

## Ranh giới trách nhiệm — đọc trước khi bắt đầu

Có những bước **chỉ người dùng làm được**, agent không làm thay:

- Tạo/đăng nhập tài khoản Apple Developer và Google Play Console
- Sinh ASC API Key (.p8) trong App Store Connect, và Google Service Account JSON trong Google Cloud Console
- Dán các giá trị đó vào GitHub Secrets và EAS
- Điền store listing, ảnh chụp màn hình, privacy policy, data safety, age rating
- Bấm nút submit for review

Agent viết toàn bộ code, workflow và cấu hình dẫn tới các bước đó, và ghi rõ chỗ nào cần cắm gì. Task 7 và 8 là danh sách việc cho người dùng, không phải việc agent tự chạy.

---

### Task 1: Khởi tạo repo và app chạy được

**Files:**
- Create: toàn bộ scaffold Expo trong `/Users/joinytran/Data/Work/xDev/xdev-mobile`
- Create: `.gitignore`, `README.md`, `app.json`
- Create: repo GitHub `tdduydev/xdev-mobile` (public)

**Interfaces:**
- Consumes: —
- Produces: app chạy được trên Expo Go; repo có commit đầu

- [ ] **Step 1: Tạo project**

```bash
cd /Users/joinytran/Data/Work/xDev
npx create-expo-app@latest xdev-mobile --template default
cd xdev-mobile
npx expo install --check
```

Ghi lại version Expo SDK và React Native mà nó cài ra — vào commit message.

- [ ] **Step 2: Chạy thử trên Expo Go**

```bash
npx expo start
```

Xác nhận app mặc định mở được trên điện thoại qua Expo Go. Đây là mốc "app chạy được" — chưa có gì của xdev, nhưng chứng minh toolchain thông.

- [ ] **Step 3: Đặt tên và identifier**

`app.json`: `name` = "xDev Asia", `slug` = "xdev-mobile", `scheme` = "xdevasia",
`ios.bundleIdentifier` = "asia.xdev.mobile", `android.package` = "asia.xdev.mobile".

Bundle identifier phải cố định từ đầu — đổi sau khi đã lên store là tạo app mới, không phải cập nhật.

- [ ] **Step 4: Tạo repo và push**

```bash
gh repo create tdduydev/xdev-mobile --public --source=. --remote=origin --push
```

- [ ] **Step 5: Commit**

Commit message ghi rõ Expo SDK version và RN version thực tế từ Step 1.

---

### Task 2: Data layer + contract test

**Files:**
- Create: `src/api/config.ts` — base URL, đọc `EXPO_PUBLIC_API_BASE`
- Create: `src/api/schema.ts` — schema zod cho manifest, index entry, series tree, taxonomy
- Create: `src/api/client.ts` — fetch + validate
- Create: `src/api/cache.ts` — AsyncStorage cho index, file system cho markdown
- Test: `tests/contract.test.ts`, `tests/cache.test.ts`

**Interfaces:**
- Consumes: Content API tại `https://blog.xdev.asia/api/v1` (đang sống, đã xác minh)
- Produces: `fetchManifest()`, `fetchIndex(locale)`, `fetchMarkdown(path)`, `getCachedIndex(locale)`

- [ ] **Step 1: Cài phụ thuộc**

```bash
npx expo install @react-native-async-storage/async-storage expo-file-system
npm install zod@latest fuse.js@latest
```

Vitest đã có sẵn từ Task 1, không cần cài lại.

**BẪY của Expo SDK 57 — đọc trước khi viết code file system.** `expo-file-system` đã đổi sang API class-based; API cũ nằm ở `expo-file-system/legacy` và đã deprecated:

```ts
import { File, Directory, Paths } from "expo-file-system";

const file = new File(Paths.cache, "example.txt");
file.create();
file.write("Hello");
file.textSync();
```

`Paths.cache` là nơi hệ thống có thể xoá khi máy thiếu dung lượng — đúng cho cache markdown. `Paths.document` là nơi không bị xoá. **Dùng API mới, không dùng `expo-file-system/legacy`.** Kiến thức sẵn có nhiều khả năng sẽ dẫn tới API cũ; `AGENTS.md` của repo yêu cầu đọc https://docs.expo.dev/versions/v57.0.0/ trước khi viết code.

- [ ] **Step 2: Viết schema zod từ shape ĐO THẬT trên API sống**

Đây là shape thật, lấy từ `https://blog.xdev.asia/api/v1/vi/index.json` ngày 2026-09-18 — không phải từ trí nhớ hay từ bản spec cũ:

```json
{
  "id": "019fefa0-60af-7818-8473-9d42ce7cdc28",
  "type": "blog",
  "locale": "vi",
  "slug": "idempotent-la-dieu-kien",
  "title": "Idempotent là điều kiện, không phải trang trí",
  "excerpt": "Cú gọi gốc có thể THÀNH CÔNG mà phản hồi không về được...",
  "featuredImage": "/images/blog/idempotent-la-dieu-kien/cover.png",
  "readingTime": 10,
  "publishedAt": "2026-08-11T08:00:00.000000Z",
  "author": { "id": "019c9616-...", "name": "Duy Tran", "avatar": "/avatars/....jpeg" },
  "tags": ["microservices", "kien-truc", "messaging", "architecture"],
  "category": { "slug": "programming", "name": "Lập trình" },
  "series": null,
  "path": "content/blog/programming/idempotent-la-dieu-kien.md",
  "url": "https://blog.xdev.asia/blog/idempotent-la-dieu-kien/"
}
```

Quy tắc mà schema phải phản ánh, mỗi cái đều là kết quả của một lỗi đã sửa ở phía API:

| Trường | Quy tắc |
|---|---|
| `author` | `{ id, name, avatar } \| null` — **nullable**. Nối theo `id`, không theo `name` |
| `featuredImage`, `avatar` | luôn bắt đầu bằng `/` hoặc là URL tuyệt đối, không bao giờ bare. Luôn CÓ MẶT với `null` tường minh → dùng `.nullable()`, không phải `.optional()` |
| `tags` | `string[]` gồm chuỗi khác rỗng; có thể là `[]`, không bao giờ chứa `null` |
| `category` | `{ slug, name } \| null` — đủ cả hai trường hoặc `null`, không bao giờ một nửa |
| `series` | `null` với `type: "blog"`; `{ slug, chapter, order }` với `type: "lesson"` |
| `path` | tương đối so với base API. Fetch `{API_BASE}/{path}` |

- [ ] **Step 3: Contract test — fetch API THẬT, và phải chạm nhánh nullable**

Số đo ngày 2026-09-18 cho locale `vi`: **0 author null, 0 category null, 0 tags rỗng**. Nghĩa là **contract test chỉ chạy `vi` sẽ không bao giờ đi qua một nhánh nullable nào** — schema có thể sai ở đó mà test vẫn xanh.

Các giá trị null nằm ở `ja` và `zh-tw` (10 entry mỗi locale có `author: null`, `category: null`, `tags: []`). Test **bắt buộc** phải chạy cả bốn locale.

```ts
const BASE = process.env.EXPO_PUBLIC_API_BASE ?? "https://blog.xdev.asia/api/v1";
const LOCALES = ["vi", "en", "ja", "zh-tw"] as const;

it.each(LOCALES)("index %s khớp schema", async (locale) => {
  const res = await fetch(`${BASE}/${locale}/index.json`);
  expect(res.status).toBe(200);
  expect(() => IndexSchema.parse(await res.json())).not.toThrow();
});

it("ja và zh-tw thật sự có entry author null — nếu không, test này vô nghĩa", async () => {
  const ja = IndexSchema.parse(await (await fetch(`${BASE}/ja/index.json`)).json());
  expect(ja.filter((e) => e.author === null).length).toBeGreaterThan(0);
});

it("mọi path fetch được qua HTTP", async () => {
  const index = IndexSchema.parse(await (await fetch(`${BASE}/vi/index.json`)).json());
  for (const entry of sample(index, 20)) {
    const head = await fetch(`${BASE}/${entry.path}`, { method: "HEAD" });
    expect(head.status).toBe(200);
  }
});
```

Test thứ hai là loại test canh chính bài test khác: nó đỏ nếu dữ liệu đổi tới mức nhánh nullable không còn được phủ, thay vì để test đầu tiên âm thầm mất tác dụng.

Lấy mẫu 20 entry cho test path, không quét cả 1655 — đủ phát hiện lỗi hệ thống, không đủ chậm để người ta tắt đi.

- [ ] **Step 4: Kích thước — ảnh hưởng thiết kế, không phải chuyện bên lề**

Đo thật: `vi/index.json` là **2,07 MB thô, 283 KB sau gzip**. GitHub Pages chỉ nén khi client gửi `Accept-Encoding: gzip`.

Hệ quả: chỉ tải index của **một** locale đang chọn. Tải cả bốn là hơn 1 MB. Xác minh trong test rằng client có yêu cầu nén.

- [ ] **Step 5-7:** implement client + cache cho tới khi test xanh; commit.

### Task 3: Màn hình và điều hướng

**Files:**
- Create: `app/(tabs)/index.tsx` (feed), `app/(tabs)/series.tsx`, `app/(tabs)/search.tsx`, `app/(tabs)/settings.tsx`
- Create: `app/post/[slug].tsx` — màn đọc bài
- Create: `src/components/ArticleWebView.tsx`

**Interfaces:**
- Consumes: Task 2
- Produces: app đọc được bài thật

- [ ] Feed: danh sách từ index đã cache, kéo để tải lại
- [ ] Tìm kiếm offline bằng fuse.js trên index của locale đang chọn
- [ ] Cài đặt: đổi locale (vi/en/ja/zh-tw), dark mode
- [ ] Màn đọc bài: `ArticleWebView` nhận markdown, chuyển sang HTML, nhúng CSS của blog, dùng lại highlight.js và mermaid
- [ ] Trạng thái lỗi theo spec mục 8: mất mạng chưa cache, cache cũ, markdown 404, manifest đổi version

---

### Task 4: CI cho pull request — kiểm tra, chưa build app

**Files:**
- Create: `.github/workflows/ci.yml`

Chạy trên mọi PR và push: `npm ci`, typecheck, lint, `npm test` (gồm contract test). **Không** gọi EAS Build ở đây — quota free chỉ 15 build/tháng mỗi nền.

Thêm một job cron hằng ngày chỉ chạy contract test, để blog đổi shape API là biết ngay mà không cần ai push gì.

---

### Task 5: EAS Build từ GitHub Actions

**Files:**
- Create: `eas.json`
- Create: `.github/workflows/build.yml`

**Phụ thuộc:** người dùng đã tạo tài khoản Expo và thêm `EXPO_TOKEN` vào GitHub Secrets.

- [ ] **Step 1: Khởi tạo EAS**

```bash
npm install -g eas-cli@latest
eas login
eas build:configure
```

- [ ] **Step 2: `eas.json` với ba profile**

`development` (dev client, internal), `preview` (APK cho Android, simulator build cho iOS, phân phối internal), `production` (AAB + IPA, để submit store).

- [ ] **Step 3: Workflow, chạy thủ công và theo tag**

```yaml
name: EAS Build
on:
  workflow_dispatch:
    inputs:
      platform:
        type: choice
        options: [all, ios, android]
      profile:
        type: choice
        options: [preview, production]
  push:
    tags: ['v*']

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm
      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: npm ci
      - run: eas build --platform ${{ inputs.platform || 'all' }} --profile ${{ inputs.profile || 'production' }} --non-interactive --no-wait
```

Cố ý **không** build trên mỗi push vào main. Free tier 15 build/nền/tháng, và hàng chờ thấp có lúc 90+ phút. Build theo tag và theo nút bấm là đủ.

---

### Task 6: EAS Submit

**Files:**
- Modify: `eas.json` (thêm khối `submit`)
- Create: `.github/workflows/submit.yml`

**Phụ thuộc:** các credential ở Task 7 và 8 đã sẵn sàng.

- [ ] Khối `submit.production` cho iOS: `ascAppId`, `appleTeamId`. API key nằm ở EAS credentials, không vào repo.
- [ ] Khối `submit.production` cho Android: `serviceAccountKeyPath` trỏ tới file do CI ghi ra từ secret, `track: internal`.
- [ ] Workflow `workflow_dispatch` chạy `eas submit --platform <p> --latest --non-interactive`
- [ ] Mặc định submit vào **internal testing track** (Android) và **TestFlight** (iOS), không phải production. Đẩy thẳng ra public là quyết định của người dùng, làm trong console.

---

### Task 7: Việc của người dùng — Apple

Không phải việc agent. Agent chỉ kiểm tra kết quả.

- [ ] Tạo App ID và app record trong App Store Connect với bundle identifier `asia.xdev.mobile`
- [ ] Sinh App Store Connect API Key (.p8), ghi lại Key ID và Issuer ID
- [ ] Ghi lại Apple Team ID
- [ ] Nạp vào EAS: `eas credentials` hoặc thêm vào GitHub Secrets theo tên trong workflow
- [ ] Chuẩn bị: icon 1024×1024, ảnh chụp màn hình theo từng kích thước máy, mô tả, từ khoá, URL privacy policy, thông tin liên hệ

---

### Task 8: Việc của người dùng — Google Play

- [ ] Tạo app trong Play Console với package `asia.xdev.mobile`
- [ ] Tạo Google Service Account, cấp quyền trong Play Console, tải JSON key
- [ ] Thêm JSON đó vào GitHub Secrets (một dòng base64), workflow ghi ra file lúc chạy
- [ ] Điền Data safety, content rating, target audience, privacy policy
- [ ] Lần upload đầu: `eas submit` tự tạo release ở track internal testing

---

### Task 9: App Check trước khi có người dùng thật

**Phụ thuộc:** Task 1-6 xong, trước khi app ra public.

Spec ghi App Check là việc của S3. App lên store thì nó thành bắt buộc sớm: Firebase AI Logic gọi thẳng từ client mà không có App Check thì quota Gemini ai dùng cũng được.

- [ ] Bật App Check trong Firebase Console: App Attest (iOS), Play Integrity (Android)
- [ ] `npx expo install @react-native-firebase/app-check` hoặc tương đương, khởi tạo trước lần gọi AI đầu tiên
- [ ] Bật enforcement cho Firebase AI Logic
- [ ] Kiểm: gọi AI từ một build không đăng ký phải bị từ chối

---

## Ngoài phạm vi plan này

Auth, Firestore sync, AI chat, push notification, quiz/roadmap, on-device model. Mỗi cái một slice riêng theo bản đồ trong spec.
