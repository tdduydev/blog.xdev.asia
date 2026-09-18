"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * HeroCinematic — 4-layer parallax animation running at 60fps via CSS.
 *
 * Layers (back → front):
 *   1. Nebula — slow gentle drift + scale pulse
 *   2. Neural network — medium orbit rotation
 *   3. AI brain core — subtle float + slow spin
 *   4. Particles — fast drift + twinkle opacity
 *
 * Each layer is a GPU-composited <div> with will-change: transform
 * so animations stay on the compositor thread (no layout/paint = 60fps).
 */

const LAYERS = [
    {
        src: "/storage/uploads/2026/04/hero-layers/layer-1-nebula.webp",
        alt: "Nebula background",
        className: "hero-layer hero-layer-nebula",
    },
    {
        src: "/storage/uploads/2026/04/hero-layers/layer-2-network.webp",
        alt: "Neural network",
        className: "hero-layer hero-layer-network",
    },
    {
        src: "/storage/uploads/2026/04/hero-layers/layer-3-core.webp",
        alt: "AI Core",
        className: "hero-layer hero-layer-core",
    },
    {
        src: "/storage/uploads/2026/04/hero-layers/layer-4-particles.webp",
        alt: "Particles",
        className: "hero-layer hero-layer-particles",
    },
];

export default function HeroCinematic({ className = "" }: { className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            // Normalize mouse to -1..1 relative to container center
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            setMouseOffset({ x, y });
        };

        document.addEventListener("mousemove", onMove, { passive: true });
        return () => document.removeEventListener("mousemove", onMove);
    }, []);

    // Parallax depth multiplier per layer (back=small, front=large)
    const depths = [4, 10, 18, 28];

    return (
        <div
            ref={containerRef}
            className={`hero-cinematic ${className}`}
            aria-hidden="true"
        >
            {LAYERS.map((layer, i) => (
                <div
                    key={i}
                    className={layer.className}
                    style={{
                        transform: `translate(${mouseOffset.x * depths[i]}px, ${mouseOffset.y * depths[i]}px)`,
                    }}
                >
                    <Image
                        src={layer.src}
                        alt={layer.alt}
                        width={1024}
                        height={1024}
                        className="w-full h-full object-contain"
                        loading="eager"
                        priority={i === 2} // Core is most important
                    />
                </div>
            ))}
        </div>
    );
}
