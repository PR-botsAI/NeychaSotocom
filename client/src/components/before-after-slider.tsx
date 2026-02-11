import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    className?: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage, className = "" }: BeforeAfterSliderProps) {
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [sliderPos, setSliderPos] = useState(50);

    const handleMove = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
        if (!isResizing || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const position = ((x - rect.left) / rect.width) * 100;

        if (position >= 0 && position <= 100) {
            setSliderPos(position);
        }
    };

    const handleDown = () => setIsResizing(true);
    const handleUp = () => setIsResizing(false);

    useEffect(() => {
        if (isResizing) {
            window.addEventListener("mousemove", handleMove);
            window.addEventListener("mouseup", handleUp);
            window.addEventListener("touchmove", handleMove);
            window.addEventListener("touchend", handleUp);
        } else {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleUp);
            window.removeEventListener("touchmove", handleMove);
            window.removeEventListener("touchend", handleUp);
        }
        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleUp);
            window.removeEventListener("touchmove", handleMove);
            window.removeEventListener("touchend", handleUp);
        };
    }, [isResizing]);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden select-none rounded-xl border border-white/10 ${className}`}
            onMouseDown={handleDown}
            onTouchStart={handleDown}
        >
            {/* After Image (Full background) */}
            <img
                src={afterImage}
                alt="After"
                className="w-full h-full object-cover"
            />

            {/* Before Image (Clipped) */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
                <img
                    src={beforeImage}
                    alt="Before"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Slider Line */}
            <div
                className="absolute inset-y-0 w-0.5 bg-white/50 cursor-ew-resize group"
                style={{ left: `${sliderPos}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-white" />
                        <div className="w-1 h-1 rounded-full bg-white" />
                        <div className="w-1 h-1 rounded-full bg-white" />
                    </div>
                </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 pointer-events-none">
                <span className="bg-black/40 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded uppercase tracking-widest border border-white/10">
                    Antes
                </span>
            </div>
            <div className="absolute top-4 right-4 pointer-events-none">
                <span className="bg-[#F2E6D8]/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded uppercase tracking-widest border border-[#F2E6D8]/30">
                    Después
                </span>
            </div>
        </div>
    );
}
