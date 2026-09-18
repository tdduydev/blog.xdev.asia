"use client";

import { useEffect, useRef } from "react";

interface ContentRendererProps {
    html: string;
    className?: string;
}

export default function ContentRenderer({ html, className = "" }: ContentRendererProps) {
    const ref = useRef<HTMLDivElement>(null);

    const normalizeMermaidSource = (source: string): string => {
        return source
            .replace(/\r\n?/g, "\n")
            .replace(/\u00A0/g, " ")
            .replace(/[\u200B-\u200D\uFEFF]/g, "")
            .trim();
    };

    useEffect(() => {
        if (!ref.current) return;

        const root = ref.current;

        const productionAssetHost = "https://xdev.asia";

        const repairContentImages = () => {
            const images = root.querySelectorAll("img");
            if (!images?.length) return;

            images.forEach((image) => {
                if (image.dataset.repairBound === "true") return;

                const originalSrc = image.getAttribute("src");
                if (!originalSrc) return;

                const normalizedSrc = originalSrc
                    .replace(/^https?:\/\/x-lms\.test\/storage\//, "/storage/")
                    .replace(/^https?:\/\/xdev\.asia\/storage\//, "/storage/")
                    .replace(/^https?:\/\/blog\.xdev\.asia\/storage\//, "/storage/");

                if (normalizedSrc !== originalSrc) {
                    image.setAttribute("src", normalizedSrc);
                }

                // Lazy load + skeleton shimmer
                image.loading = "lazy";
                const parent = image.parentElement;
                if (parent && !parent.classList.contains("skeleton-img-wrap")) {
                    parent.style.position = "relative";
                    const shimmer = document.createElement("div");
                    shimmer.className = "skeleton-shimmer skeleton-img-overlay";
                    parent.insertBefore(shimmer, image);
                    parent.classList.add("skeleton-img-wrap");

                    image.style.opacity = "0";
                    image.style.transition = "opacity 0.5s ease";

                    const revealImage = () => {
                        image.style.opacity = "1";
                        shimmer.remove();
                    };

                    const clearBrokenState = () => {
                        shimmer.remove();
                    };

                    if (image.complete && image.naturalWidth > 0) {
                        revealImage();
                    } else {
                        image.addEventListener("load", revealImage, { once: true });
                        image.addEventListener("error", clearBrokenState, { once: true });
                    }
                }

                image.dataset.repairBound = "true";

                image.addEventListener(
                    "error",
                    () => {
                        const currentSrc = image.getAttribute("src") ?? "";

                        if (
                            currentSrc.startsWith("/storage/") &&
                            image.dataset.remoteRetried !== "true"
                        ) {
                            image.dataset.remoteRetried = "true";
                            image.setAttribute("src", `${productionAssetHost}${currentSrc}`);
                            return;
                        }

                        if (image.dataset.missingNoticeShown === "true") return;

                        image.dataset.missingNoticeShown = "true";
                        image.classList.add("content-image-hidden");
                        image.parentElement?.querySelector(".skeleton-img-overlay")?.remove();

                        const notice = document.createElement("div");
                        notice.className = "content-image-missing";
                        notice.textContent = "Khong tai duoc anh noi dung. Asset nay chua duoc mirror vao static site.";

                        image.insertAdjacentElement("afterend", notice);
                    },
                    { once: false }
                );
            });
        };

        // Syntax highlighting with highlight.js
        const highlightCode = async () => {
            const hljs = (await import("highlight.js")).default;
            const codeBlocks = root.querySelectorAll("pre code");
            if (!codeBlocks) return;
            codeBlocks.forEach((block) => {
                const isMermaidBlock =
                    block.classList.contains("language-mermaid") ||
                    block.classList.contains("language-mmd");

                if (!block.classList.contains("hljs") && !isMermaidBlock) {
                    hljs.highlightElement(block as HTMLElement);
                }
            });
        };

        // Initialize Mermaid diagrams
        const initMermaid = async () => {
            const mermaid = (await import("mermaid")).default;
            const isDark = document.documentElement.classList.contains("dark");

            mermaid.initialize({
                startOnLoad: false,
                suppressErrorRendering: true,
                theme: "base",
                fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
                themeVariables: isDark
                    ? {
                        primaryColor: "#1e293b",
                        primaryTextColor: "#e2e8f0",
                        primaryBorderColor: "#3b82f6",
                        lineColor: "#60a5fa",
                        secondaryColor: "#0f172a",
                        tertiaryColor: "#111827",
                        background: "#0b1220",
                        mainBkg: "#0f172a",
                        secondBkg: "#111827",
                        tertiaryBkg: "#0b1220",
                        textColor: "#e2e8f0",
                        nodeBorder: "#3b82f6",
                        clusterBkg: "#0b1220",
                        clusterBorder: "#334155",
                        edgeLabelBackground: "#111827",
                        fontSize: "16px",
                    }
                    : {
                        primaryColor: "#eff6ff",
                        primaryTextColor: "#0f172a",
                        primaryBorderColor: "#2563eb",
                        lineColor: "#3b82f6",
                        secondaryColor: "#dbeafe",
                        tertiaryColor: "#f8fafc",
                        background: "#ffffff",
                        mainBkg: "#eff6ff",
                        secondBkg: "#dbeafe",
                        tertiaryBkg: "#f8fafc",
                        textColor: "#0f172a",
                        nodeBorder: "#2563eb",
                        clusterBkg: "#f8fafc",
                        clusterBorder: "#93c5fd",
                        edgeLabelBackground: "#ffffff",
                        fontSize: "16px",
                    },
                flowchart: {
                    htmlLabels: true,
                    curve: "basis",
                    nodeSpacing: 60,
                    rankSpacing: 70,
                    padding: 14,
                },
                sequence: {
                    useMaxWidth: false,
                    diagramMarginX: 36,
                    diagramMarginY: 28,
                    actorMargin: 70,
                    width: 180,
                    height: 68,
                    boxMargin: 12,
                    boxTextMargin: 8,
                    noteMargin: 14,
                    messageMargin: 42,
                },
                gantt: {
                    leftPadding: 110,
                    rightPadding: 48,
                    topPadding: 42,
                    gridLineStartPadding: 36,
                    fontSize: 14,
                },
                securityLevel: "loose",
            });

            const codeBlocks = root.querySelectorAll("pre code.language-mermaid, pre code.language-mmd");
            if (!codeBlocks?.length) return;

            for (let i = 0; i < codeBlocks.length; i++) {
                const codeEl = codeBlocks[i];
                const preEl = codeEl.parentElement;
                if (!preEl) continue;

                const graphDefinition = codeEl.textContent?.trim() ?? "";
                if (!graphDefinition) continue;

                try {
                    const normalizedGraphDefinition = normalizeMermaidSource(graphDefinition);
                    const parseResult = await mermaid.parse(normalizedGraphDefinition, { suppressErrors: true });

                    if (parseResult === false) {
                        continue;
                    }

                    const id = `mermaid-${Date.now()}-${i}`;
                    const { svg } = await mermaid.render(id, normalizedGraphDefinition);

                    if (svg.includes("Syntax error in text")) {
                        continue;
                    }

                    const wrapper = document.createElement("div");
                    wrapper.className = "mermaid-diagram my-10 flex justify-center overflow-x-auto rounded-2xl border border-brand-100 bg-gradient-to-b from-brand-50/50 to-white p-4 md:p-7 shadow-[0_8px_28px_rgba(37,99,235,0.08)] dark:border-zinc-700 dark:from-zinc-900 dark:to-zinc-950";
                    wrapper.innerHTML = svg;
                    preEl.replaceWith(wrapper);
                } catch {
                    // Leave original code block if mermaid fails
                }
            }
        };

        // Add a header bar to each code block with lang label + copy button
        const addCodeHeaders = () => {
            const pres = root.querySelectorAll("pre");
            if (!pres) return;

            pres.forEach((pre) => {
                if (pre.querySelector(".code-header")) return;

                const code = pre.querySelector("code");
                const langMatch = code?.className.match(/language-(\w+)/);
                const lang = langMatch ? langMatch[1] : "";

                // Build header row
                const header = document.createElement("div");
                header.className = "code-header";

                const langLabel = document.createElement("span");
                langLabel.className = "code-lang";
                langLabel.textContent = lang || "code";

                const copyBtn = document.createElement("button");
                copyBtn.className = "copy-btn";
                copyBtn.title = "Copy code";
                const iconCopy = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;
                const iconCheck = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
                copyBtn.innerHTML = iconCopy;

                copyBtn.addEventListener("click", async () => {
                    const text = pre.querySelector("code")?.textContent ?? "";
                    await navigator.clipboard.writeText(text);
                    copyBtn.innerHTML = iconCheck;
                    setTimeout(() => { copyBtn.innerHTML = iconCopy; }, 2000);
                });

                header.appendChild(langLabel);
                header.appendChild(copyBtn);
                pre.insertBefore(header, pre.firstChild);
            });
        };

        void (async () => {
            await initMermaid();
            await highlightCode();
            addCodeHeaders();
            repairContentImages();
        })();
    }, [html]);

    return (
        <div
            ref={ref}
            className={`article-content ${className}`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
