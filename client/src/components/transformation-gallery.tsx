import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { CheckCircle, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import type { Case } from "@/types/schema";

interface TransformationGalleryProps {
  cases: Case[];
  onViewProcess?: (caseItem: Case) => void;
  className?: string;
}

const premiumEase = [0.16, 1, 0.3, 1] as const;

export function TransformationGallery({
  cases,
  onViewProcess,
  className = "",
}: TransformationGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const activeCase = cases[current];

  // Scroll thumbnail into view when current changes
  useEffect(() => {
    if (!thumbnailContainerRef.current) return;
    const container = thumbnailContainerRef.current;
    const activeThumb = container.children[current] as HTMLElement | undefined;
    if (!activeThumb) return;

    const containerRect = container.getBoundingClientRect();
    const thumbRect = activeThumb.getBoundingClientRect();

    // If the thumbnail is out of view, scroll it into center
    const offset =
      thumbRect.left -
      containerRect.left -
      containerRect.width / 2 +
      thumbRect.width / 2;

    container.scrollBy({ left: offset, behavior: "smooth" });
  }, [current]);

  const goTo = useCallback(
    (index: number) => {
      if (index === current || index < 0 || index >= cases.length) return;
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current, cases.length],
  );

  const goNext = useCallback(() => {
    goTo(current < cases.length - 1 ? current + 1 : 0);
  }, [current, cases.length, goTo]);

  const goPrev = useCallback(() => {
    goTo(current > 0 ? current - 1 : cases.length - 1);
  }, [current, cases.length, goTo]);

  // Swipe support for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  if (!cases.length || !activeCase) return null;

  // Animation variants for the main card transition
  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: 0.96,
      x: dir > 0 ? 40 : -40,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: 0.96,
      x: dir > 0 ? -40 : 40,
    }),
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Main showcase area */}
      <div className="relative max-w-2xl mx-auto">
        {/* Counter badge */}
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-xs sm:text-sm font-medium text-[#F2E6D8]/70 tracking-wide uppercase">
            Transformaciones Reales
          </span>
          <span className="text-xs font-semibold text-[#F2E6D8] bg-[#F2E6D8]/10 border border-[#F2E6D8]/20 px-3 py-1 rounded-full">
            Caso {current + 1} de {cases.length}
          </span>
        </div>

        {/* Main image container with navigation arrows */}
        <div className="relative group">
          {/* Previous arrow */}
          <button
            onClick={goPrev}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 hover:border-[#F2E6D8]/30 transition-all duration-300 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
            aria-label="Caso anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next arrow */}
          <button
            onClick={goNext}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 hover:border-[#F2E6D8]/30 transition-all duration-300 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
            aria-label="Caso siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Animated card with before/after slider */}
          <div
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeCase.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.4,
                  ease: premiumEase,
                }}
              >
                {/* Before/After Slider */}
                <div className="aspect-[4/3] sm:aspect-square w-full bg-zinc-950">
                  <BeforeAfterSlider
                    beforeImage={activeCase.beforeImage}
                    afterImage={activeCase.afterImage}
                    className="w-full h-full"
                  />
                </div>

                {/* Case info panel */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-white truncate">
                        {activeCase.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {activeCase.description}
                      </p>
                    </div>
                    {activeCase.category && (
                      <span className="text-[10px] sm:text-xs font-medium text-[#F2E6D8]/80 bg-[#F2E6D8]/10 px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 border border-[#F2E6D8]/15 uppercase tracking-wider">
                        {activeCase.category}
                      </span>
                    )}
                  </div>

                  {/* Highlights */}
                  {activeCase.highlights && activeCase.highlights.length > 0 && (
                    <motion.div
                      className="mt-4 flex flex-wrap gap-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4, ease: premiumEase }}
                    >
                      {activeCase.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 text-xs text-gray-300 bg-zinc-800/80 border border-zinc-700/50 px-3 py-1.5 rounded-full"
                        >
                          <CheckCircle className="w-3 h-3 text-[#F2E6D8] flex-shrink-0" />
                          {highlight}
                        </span>
                      ))}
                    </motion.div>
                  )}

                  {/* View process button */}
                  {onViewProcess && (
                    <motion.div
                      className="mt-5 pt-4 border-t border-zinc-800/50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      <button
                        onClick={() => onViewProcess(activeCase)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-medium text-[#F2E6D8] bg-[#F2E6D8]/8 hover:bg-[#F2E6D8]/15 border border-[#F2E6D8]/20 hover:border-[#F2E6D8]/40 px-5 py-2.5 rounded-lg transition-all duration-300 group/btn"
                      >
                        <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        Ver Proceso Completo
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Thumbnail navigation strip */}
        <div className="mt-5 relative">
          {/* Fade edges for scroll indication */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none rounded-l-lg" />
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none rounded-r-lg" />

          <div
            ref={thumbnailContainerRef}
            className="flex gap-2.5 overflow-x-auto pb-2 px-2 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {cases.map((caseItem, index) => (
              <motion.button
                key={caseItem.id}
                onClick={() => goTo(index)}
                className={`relative flex-shrink-0 w-14 h-14 sm:w-[68px] sm:h-[68px] rounded-lg overflow-hidden transition-all duration-300 ${
                  index === current
                    ? "ring-2 ring-[#F2E6D8] ring-offset-2 ring-offset-black shadow-lg shadow-[#F2E6D8]/15"
                    : "ring-1 ring-zinc-700 hover:ring-zinc-500 opacity-50 hover:opacity-90"
                }`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Ver caso ${index + 1}: ${caseItem.title}`}
              >
                <img
                  src={caseItem.afterImage}
                  alt={`Caso ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Active indicator overlay */}
                {index === current && (
                  <motion.div
                    className="absolute inset-0 bg-[#F2E6D8]/10"
                    layoutId="gallery-active-thumb"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}

                {/* Number label on thumbnail */}
                <span
                  className={`absolute bottom-0.5 right-0.5 text-[9px] font-bold px-1 rounded ${
                    index === current
                      ? "bg-[#F2E6D8] text-black"
                      : "bg-black/60 text-white/70"
                  }`}
                >
                  {index + 1}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Progress dots for mobile (visible when more than 4 cases) */}
        {cases.length > 4 && (
          <div className="flex justify-center gap-1.5 mt-3 sm:hidden">
            {cases.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-6 h-1.5 bg-[#F2E6D8]"
                    : "w-1.5 h-1.5 bg-zinc-600 hover:bg-zinc-500"
                }`}
                aria-label={`Ir al caso ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Swipe hint - shown briefly on mobile */}
        <p className="text-center text-xs text-gray-500 mt-3 sm:hidden">
          Desliza la imagen para comparar antes y después
        </p>
      </div>
    </div>
  );
}
