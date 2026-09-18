import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
    IconGitHub,
    IconLinkedIn,
    IconCode,
    IconBook,
    IconShield,
    IconServer,
    IconDatabase,
    IconTerminal,
    IconBrain,
    IconRocket,
} from "@/components/Icons";

export const metadata: Metadata = {
    title: "Về tôi — Duy Tran | xDev Asia",
    description:
        "Solution Architect với 10+ năm kinh nghiệm thiết kế hệ thống enterprise, microservices, cloud và AI. Người xây dựng xDev.asia.",
    alternates: { canonical: "https://blog.xdev.asia/pages/ve-toi/" },
};

function MailIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}

function UsersIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function BuildingIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
            <path d="M6 12H4a2 2 0 0 0-2 2v8h4" />
            <path d="M18 9h2a2 2 0 0 1 2 2v11h-4" />
            <path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" />
        </svg>
    );
}

function HeartPulseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
        </svg>
    );
}

function LayersIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
            <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
            <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
        </svg>
    );
}

const stats = [
    { value: "10+", label: "Năm kinh nghiệm", icon: <IconBook size={28} /> },
    { value: "20+", label: "Dự án lớn", icon: <BuildingIcon /> },
    { value: "16", label: "Thành viên dẫn dắt", icon: <UsersIcon /> },
    { value: "50M+", label: "Người dùng phục vụ", icon: <HeartPulseIcon /> },
];

const experiences = [
    {
        period: "2025 – Nay",
        role: "Solution Architect",
        domain: "Healthcare & Finance",
        description: "Thiết kế kiến trúc tổng thể cho các hệ thống enterprise quy mô quốc gia. Dẫn dắt cross-functional teams, đảm bảo compliance và hiệu năng cao.",
        tags: ["Microservices", "API Design", "Kubernetes", "Multi-cloud"],
    },
    {
        period: "2020 – 2025",
        role: "Product Development Lead",
        domain: "Healthcare Platform",
        description: "Dẫn dắt đội ngũ 16 người xây dựng và vận hành các nền tảng y tế số phục vụ hàng chục triệu người dùng.",
        tags: ["Team Leadership", "CI/CD", "DevOps", "Mobile & Web"],
    },
    {
        period: "2019 – 2020",
        role: "Team Leader",
        domain: "Mobile Development",
        description: "Phát triển ứng dụng di động, triển khai CI/CD pipeline, quản lý release trên App Store & Google Play.",
        tags: ["React Native", "App Center", "CodePush"],
    },
    {
        period: "2018 – 2019",
        role: "Full Stack Engineer & PM",
        domain: "MarTech / EdTech",
        description: "Lead developer cho CRM và Ad-Showcase platform. Product Manager cho công cụ sáng tạo quảng cáo động.",
        tags: ["ReactJS", "Node.js", "Product Management"],
    },
    {
        period: "2015 – 2018",
        role: "Software Developer",
        domain: "Enterprise Systems",
        description: "Xây dựng workflow duyệt dự án, tích hợp smart card, tối ưu hiệu suất web và hệ thống backend doanh nghiệp.",
        tags: ["PHP", "SQL Server", "Apache", "System Integration"],
    },
];

const expertise = [
    { icon: <LayersIcon />, title: "Systems Architecture", desc: "Thiết kế kiến trúc enterprise, SOA, event-driven", color: "from-blue-500 to-indigo-600" },
    { icon: <IconCode size={28} />, title: "Microservices & API", desc: "API design, service mesh, integration patterns", color: "from-violet-500 to-purple-600" },
    { icon: <IconServer size={28} />, title: "Cloud & Infrastructure", desc: "Multi-cloud, Kubernetes, hybrid patterns", color: "from-sky-500 to-blue-600" },
    { icon: <IconTerminal size={28} />, title: "DevOps & CI/CD", desc: "Pipeline, automation, container orchestration", color: "from-teal-500 to-emerald-600" },
    { icon: <IconShield size={28} />, title: "Security & Compliance", desc: "Zero trust, GDPR, identity management", color: "from-rose-500 to-red-600" },
    { icon: <IconBrain size={28} />, title: "MLOps & AI Systems", desc: "AI architecture, model serving, LLMOps", color: "from-amber-500 to-orange-600" },
    { icon: <IconRocket size={28} />, title: "Performance & Scale", desc: "Scalability, optimization, reliability engineering", color: "from-pink-500 to-rose-600" },
    { icon: <IconDatabase size={28} />, title: "Data Management", desc: "PostgreSQL, MongoDB, event streaming", color: "from-cyan-500 to-teal-600" },
];

const techStack = [
    { group: "Backend", color: "bg-blue-50 text-blue-700 border-blue-200", items: ["Java Spring Boot", "Python", "Go", "Keycloak", "Laravel", "PHP"] },
    { group: "Frontend", color: "bg-violet-50 text-violet-700 border-violet-200", items: ["React Native", "ReactJS", "Vue.js", "Angular"] },
    { group: "Database", color: "bg-emerald-50 text-emerald-700 border-emerald-200", items: ["PostgreSQL", "MongoDB", "MySQL", "SQL Server"] },
    { group: "DevOps", color: "bg-orange-50 text-orange-700 border-orange-200", items: ["Kubernetes", "Docker Swarm", "Jenkins", "SonarQube", "Harbor", "Vault"] },
    { group: "Infrastructure", color: "bg-rose-50 text-rose-700 border-rose-200", items: ["VMware vSphere", "OpenShift", "Nginx", "HAProxy"] },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="relative overflow-hidden hero-gradient py-20 lg:py-28">
                {/* Floating orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl animate-pulse" />
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-indigo-400/10 blur-3xl animate-pulse [animation-delay:1s]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-brand-300/5 blur-3xl" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    {/* Avatar with 3D ring effect */}
                    <div className="relative inline-block mb-8">
                        <div className="absolute inset-0 rounded-full bg-linear-to-br from-brand-400 to-indigo-500 blur-xl opacity-40 scale-110" />
                        <div className="relative w-32 h-32 mx-auto rounded-full ring-4 ring-white shadow-2xl overflow-hidden">
                            <Image
                                src="/avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg"
                                alt="Duy Tran"
                                width={128}
                                height={128}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                        {/* Online badge */}
                        <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white shadow-md" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 mb-3">
                        Duy Tran
                    </h1>
                    <p className="text-lg md:text-xl text-brand-600 font-semibold mb-2">
                        Solution Architect · 10+ Years
                    </p>
                    <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Thiết kế và triển khai hệ thống enterprise quy mô lớn trong lĩnh vực y tế &amp; tài chính.
                        Người xây dựng <strong className="text-zinc-700">xDev.asia</strong> — nơi chia sẻ kiến thức kỹ thuật thực chiến.
                    </p>

                    {/* CTA */}
                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                        <a
                            href="mailto:tdduy.dev@gmail.com"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm shadow-lg shadow-brand-500/30 hover:bg-brand-700 hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <MailIcon />
                            Liên hệ
                        </a>
                        <Link
                            href="/blog/"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-200 text-zinc-700 font-semibold text-sm hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <IconBook size={16} />
                            Đọc bài viết
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── STATS ────────────────────────────────────────────── */}
            <section className="py-14 bg-white border-b border-zinc-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((s) => (
                            <div
                                key={s.label}
                                className="group relative bg-white rounded-2xl p-6 text-center border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-brand-200 transition-all duration-300 cursor-default"
                                style={{ perspective: "600px" }}
                            >
                                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-brand-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative">
                                    <div className="flex justify-center mb-3 text-brand-500 group-hover:scale-110 group-hover:text-brand-600 transition-transform duration-300">
                                        {s.icon}
                                    </div>
                                    <div className="text-3xl font-extrabold gradient-text mb-1">{s.value}</div>
                                    <div className="text-xs text-zinc-500 font-medium leading-tight">{s.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── KINH NGHIỆM ──────────────────────────────────────── */}
            <section className="py-16 bg-surface-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-10 tracking-tight">
                        Kinh nghiệm
                    </h2>
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 top-0 bottom-0 w-px bg-linear-to-b from-brand-400 via-indigo-300 to-transparent hidden md:block" />

                        <div className="space-y-6">
                            {experiences.map((exp, i) => (
                                <div
                                    key={i}
                                    className="group relative md:pl-12 bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-brand-200 transition-all duration-300"
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-0 top-6 -translate-x-3 w-3 h-3 rounded-full bg-brand-500 ring-4 ring-white shadow hidden md:block group-hover:scale-125 transition-transform duration-200" />

                                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                        <div>
                                            <h3 className="font-bold text-zinc-900 text-base">{exp.role}</h3>
                                            <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">{exp.domain}</span>
                                        </div>
                                        <span className="text-xs font-medium text-zinc-400 bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-full shrink-0">{exp.period}</span>
                                    </div>
                                    <p className="text-sm text-zinc-600 leading-relaxed mb-3">{exp.description}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {exp.tags.map((tag) => (
                                            <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CHUYÊN MÔN ───────────────────────────────────────── */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-10 tracking-tight">
                        Chuyên môn
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {expertise.map((item) => (
                            <div
                                key={item.title}
                                className="group relative bg-white border border-zinc-100 rounded-2xl p-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-default overflow-hidden"
                                style={{ perspective: "400px", transformStyle: "preserve-3d" }}
                            >
                                {/* Gradient background on hover */}
                                <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                {/* Shine overlay */}
                                <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative">
                                    <div className="text-zinc-400 group-hover:text-white group-hover:scale-110 inline-block transition-all duration-300 mb-3">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-sm font-bold text-zinc-800 group-hover:text-white transition-colors duration-300 mb-1 leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-zinc-500 group-hover:text-white/80 transition-colors duration-300 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TECH STACK ───────────────────────────────────────── */}
            <section className="py-16 bg-surface-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-10 tracking-tight">
                        Tech Stack
                    </h2>
                    <div className="space-y-5">
                        {techStack.map((group) => (
                            <div key={group.group} className="flex flex-wrap items-center gap-3">
                                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 w-24 shrink-0">{group.group}</span>
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((item) => (
                                        <span
                                            key={item}
                                            className={`text-xs font-semibold px-3 py-1 rounded-lg border ${group.color} hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 cursor-default`}
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── LIÊN HỆ ──────────────────────────────────────────── */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-brand-800 via-brand-700 to-indigo-800 p-10 md:p-14 text-center shadow-2xl">
                        {/* Background orbs */}
                        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-indigo-400/10 blur-3xl translate-x-1/2 translate-y-1/2" />

                        <div className="relative">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                                Kết nối với mình
                            </h2>
                            <p className="text-blue-200/80 mb-8 max-w-md mx-auto">
                                Có dự án thú vị, câu hỏi kỹ thuật, hoặc muốn cộng tác? Mình sẵn sàng lắng nghe.
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <a
                                    href="mailto:tdduy.dev@gmail.com"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-brand-700 font-semibold text-sm hover:bg-brand-50 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
                                >
                                    <MailIcon />
                                    Email
                                </a>
                                <a
                                    href="https://linkedin.com/in/duytran-dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    <IconLinkedIn size={16} />
                                    LinkedIn
                                </a>
                                <a
                                    href="https://github.com/duytrandev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    <IconGitHub size={16} />
                                    GitHub
                                </a>
                                <a
                                    href="https://viblo.asia/u/duytran"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    <IconBook size={16} />
                                    Viblo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
