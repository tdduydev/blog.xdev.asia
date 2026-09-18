import { getAllQuizzes, getQuiz } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";
import type { Quiz, QuizDomain, QuizIndex, QuizQuestion } from "@/lib/types";

/**
 * Quiz/roadmap KHÔNG phân theo locale (dữ liệu chỉ có một bản) — khác với
 * `content-api.ts` (post/lesson/series đa ngôn ngữ). Vẫn cùng bẫy
 * "JSON.stringify nuốt `undefined` im lặng" (xem comment `orNull` trong
 * `content-api.ts`): `QuizIndex.series_slug` và `Quiz.domains` khai kiểu
 * optional, và đã đo ngày 2026-09-18 — `data/quizzes/aws-ml-specialty.json`
 * thật sự KHÔNG có khoá `domains` (6/7 file còn lại đều có). Nếu trải thẳng
 * object nguồn ra JSON, entry đó sẽ thiếu hẳn khoá `domains` thay vì có
 * `domains: null` — field xuất hiện không đều giữa các entry cùng mảng dễ
 * làm app tưởng nhầm là lỗi mạng/parse. Áp dụng `orNull` tại MỌI field vô
 * hướng nullable trong file này, không chỉ ở field đã đo được entry thiếu.
 */
function orNull<T>(value: T | null | undefined): T | null {
  return value ?? null;
}

export interface ApiQuizIndexEntry {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  provider: string;
  level: string;
  duration_minutes: number;
  passing_score: number;
  questions_count: number;
  tags: string[];
  series_slug: string | null;
  url: string;
}

export interface ApiQuizDomain {
  name: string;
  weight: number | null;
  lessons: { title: string; slug: string }[];
}

export interface ApiQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  domain: string | null;
}

export interface ApiQuizDetail extends ApiQuizIndexEntry {
  domains: ApiQuizDomain[] | null;
  questions: ApiQuizQuestion[];
}

function buildQuizIndexEntry(quiz: QuizIndex): ApiQuizIndexEntry {
  return {
    id: quiz.id,
    slug: quiz.slug,
    title: quiz.title,
    description: quiz.description,
    icon: quiz.icon,
    provider: quiz.provider,
    level: quiz.level,
    duration_minutes: quiz.duration_minutes,
    passing_score: quiz.passing_score,
    questions_count: quiz.questions_count,
    tags: quiz.tags,
    series_slug: orNull(quiz.series_slug),
    // Không phân locale nên không dùng `localePrefix` như content-api.ts —
    // trang quiz thật nằm ở `/luyen-thi/{slug}/` (xem
    // `src/app/luyen-thi/[slug]/page.tsx`), không có tiền tố locale.
    url: `${SITE_URL}/luyen-thi/${quiz.slug}/`,
  };
}

function buildQuizDomain(domain: QuizDomain): ApiQuizDomain {
  return {
    name: domain.name,
    weight: orNull(domain.weight),
    lessons: domain.lessons.map((lesson) => ({ title: lesson.title, slug: lesson.slug })),
  };
}

function buildQuizQuestion(question: QuizQuestion): ApiQuizQuestion {
  return {
    id: question.id,
    question: question.question,
    options: question.options,
    correct: question.correct,
    explanation: question.explanation,
    domain: orNull(question.domain),
  };
}

/** Danh sách đề — KHÔNG kèm câu hỏi (giữ nhẹ, giống lý do tách `index.json`
 * khỏi nội dung markdown: app không nên tải hết câu hỏi chỉ để hiện danh
 * sách). `getAllQuizzes()` (`src/lib/data.ts`) đã tự bỏ `questions`. */
export function buildQuizIndex(): ApiQuizIndexEntry[] {
  return getAllQuizzes().map(buildQuizIndexEntry);
}

/** Một đề đầy đủ kèm câu hỏi. `null` khi slug không tồn tại. */
export function buildQuizDetail(slug: string): ApiQuizDetail | null {
  const quiz: Quiz | null = getQuiz(slug);
  if (!quiz) return null;

  return {
    ...buildQuizIndexEntry(quiz),
    domains: quiz.domains ? quiz.domains.map(buildQuizDomain) : null,
    questions: quiz.questions.map(buildQuizQuestion),
  };
}
