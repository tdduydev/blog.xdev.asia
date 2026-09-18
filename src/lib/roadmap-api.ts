import { getRoadmap, getRoadmapList } from "@/lib/roadmaps";
import type {
  Roadmap,
  RoadmapFaq,
  RoadmapItem,
  RoadmapMeta,
  RoadmapPhase,
  RoadmapQuizQuestion,
  RoadmapTrack,
} from "@/lib/roadmap-shared";
import { SITE_URL } from "@/lib/seo";

/**
 * Cùng bẫy "JSON.stringify nuốt `undefined` im lặng" đã đo ở
 * `src/lib/quiz-api.ts` / `content-api.ts`. `RoadmapItem` có TỚI 11 field
 * vô hướng optional (`level`, `estimatedTime`, `outcomes`, `lab`,
 * `artifact`, `checklist`, `recommendedFor`, `resources`, `resourceLinks`,
 * `learningSteps`, `quiz`) — đã đo ngày 2026-09-18 bằng cách duyệt cả 5 file
 * `data/roadmaps/*.json`: khác item TRONG CÙNG MỘT phase thiếu khoá khác
 * nhau (vd `omop-cdm` phase "OMOP CDM 5.4 Tables Deep Dive" có item thiếu
 * `resources`/`resourceLinks`/`learningSteps`/`quiz`, item khác trong cùng
 * phase có đủ) — và trong `resourceLinks[]`, `label`/`title` cũng vắng mặt
 * không đều giữa các phần tử cùng mảng (`roadmap(ba)` phase 1 item 2: link
 * đầu thiếu `title`, link kế thiếu `title`, link cuối thiếu `label`). Áp
 * dụng `orNull` cho MỌI field vô hướng optional trong toàn bộ cây Roadmap,
 * không chỉ field đã đo được.
 */
function orNull<T>(value: T | null | undefined): T | null {
  return value ?? null;
}

export interface ApiRoadmapListEntry {
  slug: string;
  title: string;
  description: string;
  category: string | null;
  icon: string;
  theme: string;
  stats: { phases: number; duration: string; level: string; certs: string };
  tags: string[];
  url: string;
}

export interface ApiRoadmapResourceLink {
  label: string | null;
  title: string | null;
  url: string;
  type: string | null;
}

export interface ApiRoadmapQuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explanation: string | null;
}

export interface ApiRoadmapItem {
  name: string;
  detail: string;
  type: string;
  level: string | null;
  estimatedTime: string | null;
  outcomes: string[] | null;
  lab: string | null;
  artifact: string | null;
  checklist: string[] | null;
  recommendedFor: string[] | null;
  resources: string[] | null;
  resourceLinks: ApiRoadmapResourceLink[] | null;
  learningSteps: string[] | null;
  quiz: ApiRoadmapQuizQuestion[] | null;
}

export interface ApiRoadmapPhase {
  phase: number;
  title: string;
  subtitle: string;
  duration: string;
  theme: string;
  goals: string[] | null;
  deliverables: string[] | null;
  projects: string[] | null;
  items: ApiRoadmapItem[];
}

export interface ApiRoadmapTrack {
  id: string;
  label: string;
  target: string;
  weeklyHours: string;
  focusPhases: number[];
  outcomes: string[];
}

export interface ApiRoadmapFaq {
  question: string;
  answer: string;
}

export interface ApiRoadmapDetail extends ApiRoadmapListEntry {
  headline: string;
  intro: string | null;
  why_now: string | null;
  faq: ApiRoadmapFaq[] | null;
  tracks: ApiRoadmapTrack[] | null;
  phases: ApiRoadmapPhase[];
}

function buildRoadmapListEntry(meta: RoadmapMeta): ApiRoadmapListEntry {
  return {
    slug: meta.slug,
    title: meta.title,
    description: meta.description,
    category: orNull(meta.category),
    icon: meta.icon,
    theme: meta.theme,
    stats: {
      phases: meta.stats.phases,
      duration: meta.stats.duration,
      level: meta.stats.level,
      certs: meta.stats.certs,
    },
    tags: meta.tags,
    // Không phân locale — trang roadmap thật nằm ở `/roadmap/{slug}/` (xem
    // `src/app/roadmap/[slug]/page.tsx`), không có tiền tố locale.
    url: `${SITE_URL}/roadmap/${meta.slug}/`,
  };
}

function buildResourceLink(
  link: NonNullable<RoadmapItem["resourceLinks"]>[number]
): ApiRoadmapResourceLink {
  return {
    label: orNull(link.label),
    title: orNull(link.title),
    url: link.url,
    type: orNull(link.type),
  };
}

function buildRoadmapQuizQuestion(question: RoadmapQuizQuestion): ApiRoadmapQuizQuestion {
  return {
    q: question.q,
    options: question.options,
    answer: question.answer,
    explanation: orNull(question.explanation),
  };
}

function buildRoadmapItem(item: RoadmapItem): ApiRoadmapItem {
  return {
    name: item.name,
    detail: item.detail,
    type: item.type,
    level: orNull(item.level),
    estimatedTime: orNull(item.estimatedTime),
    outcomes: orNull(item.outcomes),
    lab: orNull(item.lab),
    artifact: orNull(item.artifact),
    checklist: orNull(item.checklist),
    recommendedFor: orNull(item.recommendedFor),
    resources: orNull(item.resources),
    resourceLinks: item.resourceLinks ? item.resourceLinks.map(buildResourceLink) : null,
    learningSteps: orNull(item.learningSteps),
    quiz: item.quiz ? item.quiz.map(buildRoadmapQuizQuestion) : null,
  };
}

function buildRoadmapPhase(phase: RoadmapPhase): ApiRoadmapPhase {
  return {
    phase: phase.phase,
    title: phase.title,
    subtitle: phase.subtitle,
    duration: phase.duration,
    theme: phase.theme,
    goals: orNull(phase.goals),
    deliverables: orNull(phase.deliverables),
    projects: orNull(phase.projects),
    items: phase.items.map(buildRoadmapItem),
  };
}

function buildRoadmapTrack(track: RoadmapTrack): ApiRoadmapTrack {
  return {
    id: track.id,
    label: track.label,
    target: track.target,
    weeklyHours: track.weeklyHours,
    focusPhases: track.focusPhases,
    outcomes: track.outcomes,
  };
}

function buildRoadmapFaq(faq: RoadmapFaq): ApiRoadmapFaq {
  return { question: faq.question, answer: faq.answer };
}

/** Danh sách roadmap — hình dạng gọn (RoadmapMeta), không kèm phases/tracks/faq. */
export function buildRoadmapList(): ApiRoadmapListEntry[] {
  return getRoadmapList().map(buildRoadmapListEntry);
}

/** Một roadmap đầy đủ. `null` khi slug không tồn tại. */
export function buildRoadmapDetail(slug: string): ApiRoadmapDetail | null {
  const roadmap: Roadmap | null = getRoadmap(slug);
  if (!roadmap) return null;

  return {
    ...buildRoadmapListEntry(roadmap),
    headline: roadmap.headline,
    intro: orNull(roadmap.intro),
    why_now: orNull(roadmap.why_now),
    faq: roadmap.faq ? roadmap.faq.map(buildRoadmapFaq) : null,
    tracks: roadmap.tracks ? roadmap.tracks.map(buildRoadmapTrack) : null,
    phases: roadmap.phases.map(buildRoadmapPhase),
  };
}
