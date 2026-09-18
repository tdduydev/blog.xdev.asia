import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content");

function listFiles(dir: string, exts: string[]): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(full, exts));
    else if (exts.some((e) => entry.name.endsWith(e))) out.push(full);
  }
  return out;
}

// Ảnh được tham chiếu nhưng file không tồn tại → ảnh vỡ trên site, im lặng:
// không lỗi build, không cảnh báo, chỉ người đọc đúng bài đó mới thấy.
//
// Danh sách dưới đây là những chỗ ĐÃ hỏng sẵn, phát hiện ngày 2026-09-18 khi
// chuyển ảnh sang WebP. Chúng là ảnh THIẾU HẲN chứ không phải sai đường dẫn,
// nên không tự sửa được — cần bổ sung ảnh hoặc bỏ thẻ ảnh khỏi bài, và đó là
// quyết định về nội dung.
//
// Giữ chúng ở đây thay vì tắt test: chặn được ảnh vỡ MỚI, đồng thời ghi lại
// cái đang hỏng thay vì giấu đi. Xoá khỏi danh sách khi xử lý xong.
const KNOWN_MISSING = [
    "/avatars/joiny.png",
    "/images/blog/gemma4-series-demo/05-chromadb-status.png",
    "/images/blog/gemma4-series-demo/05-ingestion-result.png",
    "/images/blog/gemma4-series-demo/06-retrieval-comparison.png",
    "/images/blog/gemma4-series-demo/07-eval-scores.png",
    "/images/blog/gemma4-series-demo/08-go-live-check.png",
    "/images/blog/gemma4-series-demo/08-security-check.png",
    "/storage/uploads/2026/04/k8s-cert-cka-bai3-rbac.png",
    "/storage/uploads/2026/04/k8s-cert-cka-bai7-ingress-netpol.png",
    "/storage/uploads/2026/04/k8s-cert-ckad-bai1-multi-container.png",
    "/storage/uploads/2026/04/k8s-cert-ckad-bai2-jobs-cronjobs.png",
    "/storage/uploads/2026/04/k8s-cert-ckad-bai2-jobs-resources.png",
    "/storage/uploads/2026/04/k8s-cert-ckad-bai3-rolling-updates.png",
    "/storage/uploads/2026/04/k8s-cert-ckad-bai5-probes-debugging.png",
    "/storage/uploads/2026/04/k8s-cert-ckad-banner.png",
    "/storage/uploads/2026/04/k8s-cert-kcna-bai4-rbac-security.png",
    "/storage/uploads/2026/04/k8s-cert-kcna-bai5-container-runtimes.png",
    "/storage/uploads/2026/04/k8s-cert-kcna-bai6-orchestration.png",
    "/storage/uploads/2026/05/his/bai-35-hoa-don-dien-tu-nd123-banner.png",
    "/storage/uploads/2026/05/his/bai-35-hoa-don-dien-tu-nd123-workflow.png",
    "/storage/uploads/2026/05/his/bai-36-bao-hiem-tu-nhan-eclaim-banner.png",
    "/storage/uploads/2026/05/his/bai-36-bao-hiem-tu-nhan-eclaim-workflow.png",
    "/storage/uploads/2026/05/his/bai-37-kho-vat-tu-y-te-banner.png",
    "/storage/uploads/2026/05/his/bai-37-kho-vat-tu-y-te-workflow.png",
    "/storage/uploads/2026/05/his/bai-38-trang-thiet-bi-y-te-banner.png",
    "/storage/uploads/2026/05/his/bai-38-trang-thiet-bi-y-te-workflow.png",
    "/storage/uploads/2026/05/his/bai-39-mua-sam-dau-thau-banner.png",
    "/storage/uploads/2026/05/his/bai-39-mua-sam-dau-thau-workflow.png",
    "/storage/uploads/2026/05/his/bai-40-dinh-duong-suat-an-banner.png",
    "/storage/uploads/2026/05/his/bai-40-dinh-duong-suat-an-workflow.png",
    "/storage/uploads/2026/05/his/bai-41-ngan-hang-mau-banner.png",
    "/storage/uploads/2026/05/his/bai-41-ngan-hang-mau-workflow.png",
    "/storage/uploads/2026/05/his/bai-42-qlcl-su-co-y-khoa-banner.png",
    "/storage/uploads/2026/05/his/bai-42-qlcl-su-co-y-khoa-workflow.png",
    "/storage/uploads/2026/05/his/bai-43-khao-sat-hai-long-workflow.png",
    "/storage/uploads/2026/05/his/bai-44-bao-cao-tt32-banner.png",
    "/storage/uploads/2026/05/his/bai-44-bao-cao-tt32-workflow.png",
    "/storage/uploads/2026/05/his/bai-45-dashboard-bi-banner.png",
    "/storage/uploads/2026/05/his/bai-45-dashboard-bi-workflow.png",
    "/storage/uploads/2026/05/his/bai-46-hie-hssk-lien-thong-banner.png",
    "/storage/uploads/2026/05/his/bai-46-hie-hssk-lien-thong-workflow.png",
    "/storage/uploads/2026/05/his/bai-47-mobile-app-banner.png",
    "/storage/uploads/2026/05/his/bai-47-mobile-app-workflow.png",
    "/storage/uploads/2026/05/his/bai-48-van-hanh-247-dr-downtime-banner.png",
    "/storage/uploads/2026/05/his/bai-48-van-hanh-247-dr-downtime-workflow.png",
    "/storage/uploads/2026/05/his/bai-49-khung-phap-ly-2026-banner.png",
    "/storage/uploads/2026/05/his/bai-49-khung-phap-ly-2026-workflow.png",
];

// Khớp CẢ dạng có dấu `/` đầu lẫn dạng không có.
//
// Bài học đắt giá ngày 2026-09-18: bản đầu của regex này chỉ khớp dạng tuyệt
// đối (`/images/blog/...`). Nhưng `featured_image` trong index.md của series
// viết dạng tương đối (`images/blog/...`). Khi 894 ảnh PNG bị xoá để thay bằng
// WebP, 14 đường dẫn dạng tương đối không được sửa theo — và test này vẫn XANH
// trong khi 149 entry lesson trỏ tới file không còn tồn tại.
//
// Một test canh chỉ phủ một dạng cú pháp thì nó canh đúng dạng đó, không canh
// bất biến mà ta tưởng.
const IMAGE_REF =
  /(?:^|[^a-zA-Z0-9._-])(\/?(?:storage\/uploads|images\/blog|images\/og|avatars)\/[^\s)"'>\]]+?\.(?:png|jpe?g|webp|svg|gif))/g;

describe("ảnh được tham chiếu trong content", () => {
  const files = listFiles(CONTENT_ROOT, [".md"]);

  it("tìm thấy file markdown để quét", () => {
    expect(files.length).toBeGreaterThan(6000);
  });

  it("mọi ảnh được tham chiếu đều tồn tại trong public/", () => {
    const missing = new Set<string>();

    for (const file of files) {
      const source = fs.readFileSync(file, "utf-8");
      for (const match of source.matchAll(IMAGE_REF)) {
        const ref = match[1];
        // So khớp danh sách miễn trừ theo dạng chuẩn hoá, để một mục không phải
        // khai hai lần chỉ vì khác dấu `/` đầu.
        const normalized = ref.startsWith("/") ? ref : `/${ref}`;
        if (KNOWN_MISSING.includes(normalized)) continue;
        if (!fs.existsSync(path.join(ROOT, "public", normalized))) missing.add(ref);
      }
    }

    expect([...missing].sort()).toEqual([]);
  });

  it("danh sách ảnh hỏng đã biết không tự lớn lên — mỗi mục vẫn đang thiếu thật", () => {
    // Canh chiều ngược: khi một ảnh trong danh sách được bổ sung, test đỏ và
    // nhắc dọn danh sách, thay vì để nó mục ra.
    const nowPresent = KNOWN_MISSING.filter((ref) =>
      fs.existsSync(path.join(ROOT, "public", ref))
    );
    expect(nowPresent).toEqual([]);
  });
});
