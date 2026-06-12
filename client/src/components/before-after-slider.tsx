import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/scroll";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt?: string;
  className?: string;
  /** Eager-load images (hero/LCP). Below-the-fold instances lazy-load. */
  priority?: boolean;
  /** One-time divider nudge when the slider enters the viewport. */
  hint?: boolean;
  labels?: boolean;
}

/**
 * Draggable before/after comparison. All drag work happens through refs and
 * direct style writes inside one rAF lerp loop — React never re-renders
 * during interaction, so the divider glides at the display's frame rate.
 */
export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  alt = "Transformación de uñas",
  className = "",
  priority = false,
  hint = true,
  labels = true,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const pos = useRef(50);
  const target = useRef(50);
  const rafId = useRef<number | null>(null);
  const dragging = useRef(false);
  const interacted = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const clip = clipRef.current;
    const line = lineRef.current;
    if (!container || !clip || !line) return;

    const apply = (p: number) => {
      clip.style.clipPath = `inset(0 ${100 - p}% 0 0)`;
      line.style.left = `${p}%`;
    };

    const loop = () => {
      pos.current += (target.current - pos.current) * 0.16;
      apply(pos.current);
      if (dragging.current || Math.abs(target.current - pos.current) > 0.05) {
        rafId.current = requestAnimationFrame(loop);
      } else {
        rafId.current = null;
      }
    };

    const startLoop = () => {
      if (rafId.current === null) rafId.current = requestAnimationFrame(loop);
    };

    const setFromClientX = (clientX: number) => {
      const rect = container.getBoundingClientRect();
      target.current = gsap.utils.clamp(2, 98, ((clientX - rect.left) / rect.width) * 100);
      startLoop();
    };

    const onPointerDown = (e: PointerEvent) => {
      interacted.current = true;
      dragging.current = true;
      container.setPointerCapture(e.pointerId);
      setFromClientX(e.clientX);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (dragging.current) setFromClientX(e.clientX);
    };
    const endDrag = () => {
      dragging.current = false;
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", endDrag);
    container.addEventListener("pointercancel", endDrag);

    // One-time nudge so visitors discover the drag without a tooltip
    let observer: IntersectionObserver | undefined;
    let hintTween: gsap.core.Tween | undefined;
    if (hint && !prefersReducedMotion()) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting || interacted.current) return;
          observer?.disconnect();
          hintTween = gsap.to(target, {
            current: 62,
            duration: 0.9,
            delay: 0.5,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 1,
            onUpdate: startLoop,
          });
        },
        { threshold: 0.6 }
      );
      observer.observe(container);
    }

    apply(pos.current);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", endDrag);
      container.removeEventListener("pointercancel", endDrag);
      observer?.disconnect();
      hintTween?.kill();
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [hint]);

  const loading = priority ? "eager" : "lazy";

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none cursor-ew-resize ${className}`}
      style={{ touchAction: "pan-y" }}
      role="slider"
      aria-label="Comparar antes y después"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* After — full background */}
      <img
        src={afterImage}
        alt={`${alt} — después`}
        className="absolute inset-0 w-full h-full object-cover"
        loading={loading}
        decoding="async"
        draggable={false}
      />

      {/* Before — clipped from the left */}
      <div ref={clipRef} className="absolute inset-0" style={{ clipPath: "inset(0 50% 0 0)" }}>
        <img
          src={beforeImage}
          alt={`${alt} — antes`}
          className="absolute inset-0 w-full h-full object-cover"
          loading={loading}
          decoding="async"
          draggable={false}
        />
      </div>

      {/* Divider */}
      <div
        ref={lineRef}
        className="absolute inset-y-0 z-10 pointer-events-none"
        style={{ left: "50%" }}
      >
        <div className="absolute inset-y-0 -translate-x-1/2 w-px bg-[#f5f1ea]/70" />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-panel flex items-center justify-center">
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
            <path d="M5 1 1 5l4 4M13 1l4 4-4 4" stroke="#f5f1ea" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {labels && (
        <>
          <span className="absolute bottom-4 left-4 z-10 pointer-events-none text-[10px] tracking-[0.25em] uppercase text-white/80 bg-black/30 backdrop-blur-sm px-2.5 py-1">
            Antes
          </span>
          <span className="absolute bottom-4 right-4 z-10 pointer-events-none text-[10px] tracking-[0.25em] uppercase text-[var(--cream)] bg-black/30 backdrop-blur-sm px-2.5 py-1">
            Después
          </span>
        </>
      )}
    </div>
  );
}

export default BeforeAfterSlider;
