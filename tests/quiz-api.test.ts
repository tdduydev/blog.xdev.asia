import { describe, expect, it } from "vitest";
import { getQuizSlugs } from "@/lib/data";
import { buildQuizDetail, buildQuizIndex } from "@/lib/quiz-api";

describe("buildQuizIndex", () => {
  const index = buildQuizIndex();

  it("có đúng 7 đề, đúng số đã đo trong brief", () => {
    expect(index.length).toBe(7);
  });

  it("không kèm câu hỏi trong danh sách", () => {
    for (const entry of index) {
      expect(entry).not.toHaveProperty("questions");
    }
  });

  it("mọi slug trong danh sách đều fetch được đề đầy đủ qua buildQuizDetail", () => {
    const missing = index.filter((entry) => buildQuizDetail(entry.slug) === null);
    expect(missing.map((e) => e.slug)).toEqual([]);
  });

  it("mọi slug trong danh sách khớp getQuizSlugs() (nguồn generateStaticParams sẽ dùng)", () => {
    expect(index.map((e) => e.slug).sort()).toEqual(getQuizSlugs().sort());
  });

  it("mọi url đều là URL tuyệt đối (bắt đầu bằng http) — không có field ảnh nào khác trong Quiz/QuizIndex để kiểm (đã đo: `icon` chỉ là tên định danh, ví dụ \"award\"/\"gpu\", không phải path)", () => {
    for (const entry of index) {
      expect(entry.url.startsWith("http")).toBe(true);
    }
  });
});

describe("buildQuizDetail", () => {
  it("trả về null khi slug không tồn tại", () => {
    expect(buildQuizDetail("khong-ton-tai")).toBeNull();
  });

  it("questions_count đã khai khớp số câu hỏi thật, ở cả 7 đề — NẾU KHÔNG KHỚP, ĐÂY LÀ LỖI DỮ LIỆU CÓ SẴN, không phải lỗi builder (xem báo cáo Task 11)", () => {
    const mismatches: string[] = [];
    for (const slug of getQuizSlugs()) {
      const quiz = buildQuizDetail(slug);
      if (!quiz) continue;
      if (quiz.questions.length !== quiz.questions_count) {
        mismatches.push(
          `${slug}: questions_count=${quiz.questions_count} nhưng questions.length=${quiz.questions.length}`
        );
      }
    }
    expect(mismatches).toEqual([]);
  });

  it("mọi domain (khi có) đều có ít nhất 1 lesson, và mọi question đều có 1 domain hợp lệ hoặc null", () => {
    for (const slug of getQuizSlugs()) {
      const quiz = buildQuizDetail(slug);
      if (!quiz) continue;
      if (quiz.domains) {
        for (const domain of quiz.domains) {
          expect(domain.lessons.length).toBeGreaterThan(0);
        }
      }
      for (const question of quiz.questions) {
        expect(question.domain === null || typeof question.domain === "string").toBe(true);
      }
    }
  });
});
