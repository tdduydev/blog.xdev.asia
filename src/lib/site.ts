/**
 * Hằng số cấp site, an toàn cho cả server lẫn client.
 *
 * Tách khỏi `@/lib/seo` vì file đó kéo theo `./image-size` vốn dùng `node:fs`;
 * import nó vào một client component sẽ lôi `node:fs` vào bundle trình duyệt.
 * `seo.ts` re-export lại `SITE_URL` nên mọi chỗ đang import từ đó không đổi gì.
 */
export const SITE_URL = "https://blog.xdev.asia";
