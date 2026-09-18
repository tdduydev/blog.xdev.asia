"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/components/AuthProvider";
import { gemini } from "@/lib/firebase";

interface Message {
    role: "user" | "ai";
    content: string;
}

interface GlobalChatbotProps {
    /** JSON string of all site content for AI context */
    siteContext: string;
}

const SUGGESTED_QUESTIONS = [
    "Có bài nào về Docker không?",
    "Hướng dẫn học Go từ đầu",
    "So sánh PostgreSQL vs MySQL",
    "Cách deploy lên server",
];

export default function GlobalChatbot({ siteContext }: GlobalChatbotProps) {
    const { user, openLoginModal } = useAuth();
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showLoginHint, setShowLoginHint] = useState(false);
    const [showSpeedDial, setShowSpeedDial] = useState(false);
    const [showSupportPopup, setShowSupportPopup] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const speedDialRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [open]);

    const handleSend = useCallback(async () => {
        if (!input.trim()) return;
        if (!user) {
            openLoginModal();
            return;
        }

        const userMsg = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
        setLoading(true);

        try {
            const conversationHistory = messages
                .slice(-8)
                .map((m) => `${m.role === "user" ? "Người dùng" : "AI"}: ${m.content}`)
                .join("\n");

            const prompt = `Bạn là xDev AI — trợ lý thông minh cho blog kỹ thuật xDev Asia (https://blog.xdev.asia).

Chức năng:
- Trả lời câu hỏi về lập trình, DevOps, AI, Cloud, Security, Database, Linux
- Gợi ý bài viết phù hợp từ danh sách bài trên site
- Giải thích khái niệm kỹ thuật
- Hỗ trợ debug code đơn giản

Quy tắc:
- Trả lời bằng tiếng Việt, ngắn gọn, rõ ràng
- Khi gợi ý bài viết, luôn kèm link dạng https://blog.xdev.asia/blog/slug/ hoặc https://blog.xdev.asia/series/category/slug/
- Nếu không tìm thấy bài viết liên quan, vẫn trả lời câu hỏi kỹ thuật
- Giữ giọng văn thân thiện, chuyên nghiệp
- Sử dụng markdown để format câu trả lời: **bold**, *italic*, \`code\`, code block, danh sách, link

Danh sách nội dung trên site:
${siteContext}

${conversationHistory ? `Lịch sử hội thoại:\n${conversationHistory}\n\n` : ""}Người dùng: ${userMsg}`;

            const result = await gemini.generateContent(prompt);
            const text = result.response.text();

            setMessages((prev) => [
                ...prev,
                { role: "ai", content: text || "Xin lỗi, tôi không thể trả lời lúc này." },
            ]);
        } catch (err) {
            console.error("Global chat error:", err);
            setMessages((prev) => [
                ...prev,
                { role: "ai", content: "Có lỗi xảy ra. Vui lòng thử lại sau." },
            ]);
        } finally {
            setLoading(false);
        }
    }, [input, messages, user, openLoginModal, siteContext]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSuggest = (q: string) => {
        setInput(q);
        inputRef.current?.focus();
    };

    const handleClear = () => {
        setMessages([]);
    };

    // Close speed dial on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (speedDialRef.current && !speedDialRef.current.contains(e.target as Node)) {
                setShowSpeedDial(false);
            }
        };
        if (showSpeedDial) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [showSpeedDial]);

    return (
        <>
            {/* Support popup */}
            {showSupportPopup && (
                <div className="fixed bottom-22 right-6 z-50 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 p-5 w-72 animate-fade-in-up">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Ủng hộ tác giả ☕</h3>
                        <button onClick={() => setShowSupportPopup(false)} className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
                        Nếu bạn thấy nội dung hữu ích, hãy ủng hộ mình một ly cà phê để duy trì và phát triển blog nhé!
                    </p>
                    <div className="space-y-2">
                        <a href="https://github.com/sponsors/tdduydev" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl text-sm font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 transition-opacity">
                            <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            GitHub Sponsors
                        </a>
                        <a href="https://buymeacoffee.com/tdduydev" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber-400 text-amber-900 hover:bg-amber-500 transition-colors">
                            <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.185-1.756.205-.656.023-1.313-.001-1.969-.056a16.16 16.16 0 01-1.53-.19c-.289-.053-.577-.11-.862-.18-.457-.11-.68-.456-.777-.91-.125-.584-.152-1.186-.203-1.776-.024-.297-.042-.593-.066-.89a.256.256 0 00-.256-.245.266.266 0 00-.247.27c-.015.166-.028.332-.037.497-.036.696-.045 1.395-.072 2.093-.019.503-.064.989-.292 1.457-.169.345-.466.552-.815.665a5.06 5.06 0 01-.788.192 16.632 16.632 0 01-1.87.178c-.586.022-1.173.008-1.759-.042a12.38 12.38 0 01-.788-.089c-.326-.049-.649-.11-.965-.2-.392-.112-.612-.408-.662-.816-.042-.34-.041-.686-.051-1.03-.016-.496-.026-.992-.037-1.489 0-.025.001-.049.002-.074a.255.255 0 00-.256-.26.254.254 0 00-.247.26c-.003.1-.005.198-.007.297-.01.535-.023 1.07-.035 1.604-.008.361-.013.72-.061 1.08-.036.266-.123.508-.373.657-.165.099-.352.152-.541.185a7.05 7.05 0 01-.787.09c-.503.021-1.006.014-1.508-.018-.361-.023-.72-.051-1.077-.1-.334-.047-.661-.121-.952-.29-.267-.154-.405-.395-.432-.695-.026-.3-.022-.6-.029-.901-.009-.402-.016-.803-.022-1.205 0-.096-.002-.192-.003-.288a.254.254 0 00-.255-.257.256.256 0 00-.247.262c-.003.21-.003.42-.007.63-.008.412-.016.825-.03 1.237-.008.243-.018.489-.068.727-.082.381-.301.634-.695.746-.32.091-.652.145-.986.177-.633.062-1.27.06-1.906.027a11.78 11.78 0 01-.764-.074c-.293-.039-.582-.096-.857-.196-.279-.102-.462-.284-.509-.582-.038-.246-.037-.497-.037-.746V12.4z" /></svg>
                            Buy Me a Coffee
                        </a>
                    </div>
                    <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-white dark:bg-zinc-900 border-r border-b border-zinc-200 dark:border-zinc-700 rotate-45" />
                </div>
            )}

            {/* Login hint tooltip */}
            {showLoginHint && !user && (
                <div className="fixed bottom-22 right-6 z-50 bg-zinc-800 text-white text-sm px-4 py-2.5 rounded-xl shadow-xl max-w-[220px] leading-snug"
                    style={{ animation: "fadeIn 0.2s ease-out" }}>
                    <div className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-amber-400">
                            <path d="M12 9v4" />
                            <path d="M12 17h.01" />
                            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                        <span>Vui lòng đăng nhập để sử dụng AI Chatbot</span>
                    </div>
                    <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-zinc-800 rotate-45" />
                </div>
            )}

            {/* FAB + Speed Dial */}
            <div ref={speedDialRef} className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
                {/* Speed dial actions */}
                {showSpeedDial && !open && (
                    <div className="flex flex-col items-end gap-2 pb-1" style={{ animation: "speedDialIn 0.2s ease-out" }}>
                        {/* Support action */}
                        <button
                            onClick={() => { setShowSupportPopup(v => !v); setShowSpeedDial(false); }}
                            className="group flex items-center gap-2"
                        >
                            <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-zinc-800 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Ủng hộ tác giả
                            </span>
                            <span className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-110 transition-all">
                                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                            </span>
                        </button>

                        {/* AI Chat action */}
                        <button
                            onClick={() => {
                                if (!user) {
                                    setShowLoginHint(true);
                                    setTimeout(() => setShowLoginHint(false), 3000);
                                    openLoginModal();
                                    setShowSpeedDial(false);
                                    return;
                                }
                                setOpen(true);
                                setShowSpeedDial(false);
                            }}
                            className="group flex items-center gap-2"
                        >
                            <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-zinc-800 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {user ? "Hỏi AI" : "Đăng nhập để chat AI"}
                            </span>
                            <span className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-110 transition-all">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                                </svg>
                            </span>
                        </button>
                    </div>
                )}

                {/* Main FAB */}
                <button
                    onClick={() => {
                        if (open) {
                            setOpen(false);
                        } else {
                            setShowSpeedDial((v) => !v);
                            setShowSupportPopup(false);
                        }
                    }}
                    className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${open
                        ? "bg-zinc-700 hover:bg-zinc-800 scale-90"
                        : showSpeedDial
                            ? "bg-zinc-700 hover:bg-zinc-800 rotate-45"
                            : "bg-linear-to-br from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 hover:shadow-2xl hover:scale-105"
                        }`}
                    title="xDev — Menu"
                    aria-label="Menu hành động"
                >
                    {open ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : showSpeedDial ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Scrim when speed dial is open */}
            {showSpeedDial && (
                <div
                    className="fixed inset-0 z-30 bg-black/10 dark:bg-black/30 transition-opacity"
                    onClick={() => { setShowSpeedDial(false); setShowSupportPopup(false); }}
                />
            )}

            {/* Chat panel */}
            {open && (
                <div className={`fixed z-50 shadow-2xl border border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-700 flex flex-col overflow-hidden transition-all duration-300 ${expanded
                    ? "inset-4 rounded-3xl"
                    : "bottom-22 right-6 w-96 max-w-[calc(100vw-2rem)] rounded-2xl"
                    }`} style={expanded ? undefined : { height: "520px" }}>
                    {/* Header */}
                    <div className="px-4 py-3 bg-linear-to-r from-brand-600 to-brand-700 text-white flex items-center gap-3 shrink-0">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold">xDev AI</div>
                            <div className="text-[10px] opacity-80">Trợ lý lập trình thông minh</div>
                        </div>
                        <div className="flex items-center gap-1">
                            {messages.length > 0 && (
                                <button
                                    onClick={handleClear}
                                    className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                                    title="Xóa lịch sử chat"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6" />
                                    </svg>
                                </button>
                            )}
                            <button
                                onClick={() => setExpanded((v) => !v)}
                                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                                title={expanded ? "Thu nhỏ" : "Phóng to"}
                            >
                                {expanded ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="4 14 10 14 10 20" />
                                        <polyline points="20 10 14 10 14 4" />
                                        <line x1="14" y1="10" x2="21" y2="3" />
                                        <line x1="3" y1="21" x2="10" y2="14" />
                                    </svg>
                                ) : (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 3 21 3 21 9" />
                                        <polyline points="9 21 3 21 3 15" />
                                        <line x1="21" y1="3" x2="14" y2="10" />
                                        <line x1="3" y1="21" x2="10" y2="14" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.length === 0 && (
                            <div className="text-center py-6">
                                <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-500">
                                        <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200 mb-1">Xin chào! Tôi là xDev AI</h3>
                                <p className="text-xs text-zinc-400 mb-5 leading-relaxed px-4">
                                    Hỏi tôi bất kỳ điều gì về lập trình, DevOps, AI, hoặc tìm bài viết trên xDev Asia.
                                </p>
                                <div className="flex flex-wrap gap-1.5 justify-center px-2">
                                    {SUGGESTED_QUESTIONS.map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => handleSuggest(q)}
                                            className="text-xs px-3 py-1.5 rounded-full bg-brand-50 text-brand-600 hover:bg-brand-100 transition-colors dark:bg-brand-950 dark:text-brand-400 dark:hover:bg-brand-900"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                {msg.role === "ai" && (
                                    <div className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center shrink-0 mr-2 mt-1">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-600">
                                            <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
                                        </svg>
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                        ? "bg-brand-600 text-white rounded-br-md whitespace-pre-wrap"
                                        : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 rounded-bl-md chat-markdown"
                                        }`}
                                >
                                    {msg.role === "ai" ? (
                                        <ReactMarkdown
                                            components={{
                                                a: ({ ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 underline hover:no-underline" />,
                                                code: ({ className, children, ...props }) => {
                                                    const isBlock = className?.includes("language-");
                                                    return isBlock ? (
                                                        <pre className="bg-zinc-900 text-zinc-100 rounded-lg p-3 my-2 overflow-x-auto text-xs"><code {...props}>{children}</code></pre>
                                                    ) : (
                                                        <code className="bg-zinc-200 dark:bg-zinc-700 px-1 py-0.5 rounded text-xs" {...props}>{children}</code>
                                                    );
                                                },
                                                pre: ({ children }) => <>{children}</>,
                                            }}
                                        >{msg.content}</ReactMarkdown>
                                    ) : (
                                        msg.content
                                    )}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center shrink-0 mr-2 mt-1">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-600">
                                        <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
                                    </svg>
                                </div>
                                <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-3 rounded-2xl rounded-bl-md">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-zinc-100 dark:border-zinc-700 shrink-0">
                        <div className="flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Hỏi xDev AI..."
                                disabled={loading}
                                className="flex-1 px-3 py-2.5 text-sm rounded-xl border border-zinc-200 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-600 disabled:opacity-50"
                            />
                            <button
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                className="px-3 py-2.5 rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-2 text-center">
                            <span className="text-[10px] text-zinc-300 dark:text-zinc-600">Powered by Gemini 2.5 Flash</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
