interface StillCompareProps {
  beforeImage: string;
  afterImage: string;
  alt?: string;
  className?: string;
  /** Eager-load images (hero/LCP). Below-the-fold instances lazy-load. */
  priority?: boolean;
  labels?: boolean;
}

/**
 * Static 50/50 before/after comparison — a fixed center divider, no
 * interaction. Used where the photograph should simply be seen, clean
 * and prominent (heroes). The draggable version lives in the galleries.
 */
export function StillCompare({
  beforeImage,
  afterImage,
  alt = "Antes y después",
  className = "",
  priority = false,
  labels = true,
}: StillCompareProps) {
  const loading = priority ? "eager" : "lazy";

  return (
    <div className={`relative grid grid-cols-2 overflow-hidden ${className}`}>
      <div className="relative overflow-hidden">
        <img
          src={beforeImage}
          alt={`${alt} — antes`}
          className="absolute inset-0 w-full h-full object-cover"
          loading={loading}
          decoding="async"
          draggable={false}
        />
      </div>
      <div className="relative overflow-hidden">
        <img
          src={afterImage}
          alt={`${alt} — después`}
          className="absolute inset-0 w-full h-full object-cover"
          loading={loading}
          decoding="async"
          draggable={false}
        />
      </div>

      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-[#f5f1ea]/50 pointer-events-none" />

      {labels && (
        <>
          <span className="absolute bottom-4 left-4 pointer-events-none text-[10px] tracking-[0.25em] uppercase text-white/80 bg-black/30 backdrop-blur-sm px-2.5 py-1">
            Antes
          </span>
          <span className="absolute bottom-4 right-4 pointer-events-none text-[10px] tracking-[0.25em] uppercase text-[var(--cream)] bg-black/30 backdrop-blur-sm px-2.5 py-1">
            Después
          </span>
        </>
      )}
    </div>
  );
}

export default StillCompare;
