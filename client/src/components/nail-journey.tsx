import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/scroll";

/**
 * Animated onychoplasty "process film" — adapted from the brand's Claude Design
 * timeline. Side cross-section of a TOE TIP: the nail is seated in a real bed
 * under the cuticle fold and rebuilt with true thickness, layer by layer, then
 * sealed and polished. rAF loop, paused offscreen, reduced-motion fallback,
 * tappable steps. Mobile-first.
 */

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
function pw(t: number, xs: number[], ys: number[]) {
  if (t <= xs[0]) return ys[0];
  if (t >= xs[xs.length - 1]) return ys[ys.length - 1];
  for (let i = 0; i < xs.length - 1; i++) {
    if (t >= xs[i] && t <= xs[i + 1]) return ys[i] + (ys[i + 1] - ys[i]) * ((t - xs[i]) / (xs[i + 1] - xs[i]));
  }
  return ys[ys.length - 1];
}

const C = { gold: "#c8a063", goldHi: "#e6c684", cream: "#f3ead6" };
type Pt = [number, number];
const P = (p: Pt) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;

// ── Toe tip cross-section (viewBox 0 0 640 300, tip → right) ───────────────
const SKIN =
  "M 150 150 C 244 144, 356 142, 452 147 C 516 150, 560 168, 562 196 C 563 226, 526 248, 484 253 " +
  "C 402 262, 300 262, 224 256 C 188 253, 158 246, 150 236 C 146 208, 146 178, 150 150 Z";
// distal phalanx (faint, inside the pad)
const BONE = "M 182 196 C 238 184, 330 182, 404 188 C 448 192, 466 202, 458 212 C 392 224, 286 226, 212 220 C 188 218, 178 207, 182 196 Z";
// nail bed: the underside contour the nail grows on (cuticle → free-edge)
const BED: Pt[] = [[252, 150], [330, 145], [420, 147], [498, 156], [526, 161], [546, 169], [560, 180]];
// upward thickness profile (thin at cuticle + free edge, fullest mid-nail)
const OFF = [6, 31, 35, 30, 22, 15, 10];
const topPt = (i: number, b: number): Pt => [BED[i][0], BED[i][1] - OFF[i] * b];
function nailPath(b: number) {
  const T = BED.map((_, i) => topPt(i, b));
  return `M ${P(T[0])} C ${P(T[1])} ${P(T[2])} ${P(T[3])} C ${P(T[4])} ${P(T[5])} ${P(T[6])} ` +
    `L ${P(BED[6])} C ${P(BED[5])} ${P(BED[4])} ${P(BED[3])} C ${P(BED[2])} ${P(BED[1])} ${P(BED[0])} Z`;
}
function nailTopEdge(b: number) {
  const T = BED.map((_, i) => topPt(i, b));
  return `M ${P(T[0])} C ${P(T[1])} ${P(T[2])} ${P(T[3])} C ${P(T[4])} ${P(T[5])} ${P(T[6])}`;
}

function Leader({ from, to, label, anchor = "middle", opacity = 1 }: { from: Pt; to: Pt; label: string; anchor?: "start" | "middle" | "end"; opacity?: number }) {
  if (opacity <= 0.01) return null;
  return (
    <g opacity={opacity}>
      <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={C.gold} strokeWidth="1" opacity="0.6" />
      <circle cx={from[0]} cy={from[1]} r="3" fill={C.goldHi} />
      <text x={to[0]} y={to[1]} fill={C.cream} fontSize="15" letterSpacing="2.5" textAnchor={anchor} style={{ fontWeight: 500, textTransform: "lowercase" }}>{label}</text>
    </g>
  );
}
function Sparkle({ x, y, s, opacity }: { x: number; y: number; s: number; opacity: number }) {
  if (opacity <= 0.01) return null;
  const d = `M0 ${-6 * s} C ${0.8 * s} ${-1.6 * s} ${1.6 * s} ${-0.8 * s} ${6 * s} 0 C ${1.6 * s} ${0.8 * s} ${0.8 * s} ${1.6 * s} 0 ${6 * s} C ${-0.8 * s} ${1.6 * s} ${-1.6 * s} ${0.8 * s} ${-6 * s} 0 C ${-1.6 * s} ${-0.8 * s} ${-0.8 * s} ${-1.6 * s} 0 ${-6 * s} Z`;
  return <path d={d} transform={`translate(${x} ${y})`} fill="#fff" opacity={opacity} />;
}

function NailFigure({ t }: { t: number }) {
  const oldVis = clamp(pw(t, [3.6, 4.8, 14, 17.5], [0, 1, 1, 0]), 0, 1);
  const dmg = clamp(pw(t, [5.6, 7, 13.4, 14], [0, 1, 1, 0]), 0, 1);
  const seg = (a: number, b: number, d: number) => d * easeInOutCubic(clamp((t - a) / (b - a), 0, 1));
  let build = seg(22, 24.6, 0.4) + seg(25.6, 28, 0.33) + seg(28.8, 31.6, 0.27);
  build = clamp(build, 0, 1);
  const layer1 = clamp(pw(t, [22, 24.6], [0, 1]), 0, 1);
  const layer2 = clamp(pw(t, [25.6, 28], [0, 1]), 0, 1);
  const wipeActive = t > 22 && t < 31.8;
  const wipeT = wipeActive ? ((t - 22) % 3.2) / 3.2 : 0;
  const sealed = easeInOutSine(clamp((t - 34) / 4, 0, 1));
  const shine = t > 35 ? ((t - 35) % 3.6) / 3.6 : -1;
  const tw = (ph: number) => 0.4 + 0.6 * Math.abs(Math.sin(t * 1.6 + ph));
  const labProt = clamp(pw(t, [24, 25, 33, 34], [0, 1, 1, 0]), 0, 1);
  const labSell = clamp(pw(t, [36, 37, 41, 41.6], [0, 1, 1, 0]), 0, 1);
  const buildPath = nailPath(build);

  return (
    <svg viewBox="0 0 640 300" className="w-full h-auto" style={{ overflow: "visible" }} role="img" aria-label="Animación del proceso de onicoplastia">
      <defs>
        <linearGradient id="njSkin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4a3526" /><stop offset="0.5" stopColor="#33231a" /><stop offset="1" stopColor="#1d130d" /></linearGradient>
        <linearGradient id="njGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#efce8e" /><stop offset="0.5" stopColor="#cba564" /><stop offset="1" stopColor="#9c7a40" /></linearGradient>
        <linearGradient id="njCream" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fbf5e6" /><stop offset="0.55" stopColor="#f0e6cd" /><stop offset="1" stopColor="#d8c39c" /></linearGradient>
        <linearGradient id="njDam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b89a5f" /><stop offset="0.5" stopColor="#8d7038" /><stop offset="1" stopColor="#5f4a25" /></linearGradient>
        <clipPath id="njClip"><path d={buildPath} /></clipPath>
      </defs>

      {/* toe pad */}
      <path d={SKIN} fill="url(#njSkin)" />
      {/* distal phalanx hint */}
      <path d={BONE} fill="#5a4030" opacity="0.35" />
      {/* nail bed (the tissue the nail seats on) */}
      <path d={`${nailTopEdge(0)} L ${P(BED[6])} C ${P(BED[5])} ${P(BED[4])} ${P(BED[3])} C ${P(BED[2])} ${P(BED[1])} ${P(BED[0])} Z`} fill="#7a4f42" opacity="0.55" />
      {/* clean-bed sheen during limpieza */}
      <path d={nailTopEdge(0)} fill="none" stroke="rgba(255,240,210,0.18)" strokeWidth="2.4" opacity={clamp(pw(t, [16, 18, 21.5, 22.5], [0, 1, 1, 0]), 0, 1)} />
      {/* cuticle fold over the nail root */}
      <path d="M 238 150 C 250 142, 266 144, 270 156 C 262 162, 246 161, 238 154 Z" fill="url(#njSkin)" />

      {/* OLD damaged nail (thick, lumpy, discolored) */}
      <g opacity={oldVis}>
        <path d={nailPath(0.74)} fill="url(#njDam)" />
        <ellipse cx="412" cy="132" rx="30" ry="9" fill="#6f5226" opacity="0.5" />
        <ellipse cx="350" cy="138" rx="18" ry="6" fill="#7d5f2e" opacity="0.5" />
        <path d="M 470 150 l8 -2 -2 6 6 0 -4 6 -8 -2 z" fill="#5f4a25" />
        <g opacity={dmg}>
          <circle cx="420" cy="130" r="28" fill="none" stroke={C.goldHi} strokeWidth="1.4" opacity="0.85" />
          <circle cx="420" cy="130" r="28" fill="rgba(230,198,132,0.06)" />
        </g>
      </g>

      {/* NEW prosthesis — seated nail, building thickness */}
      {build > 0.001 && (
        <g>
          {/* underside shadow grounds the nail into the bed */}
          <path d={nailTopEdge(0)} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="3" transform="translate(0 2)" opacity={build} />
          <path d={buildPath} fill="url(#njGold)" />
          {layer1 > 0.99 && <path d={nailTopEdge(0.42)} fill="none" stroke="rgba(255,244,214,0.32)" strokeWidth="1.1" />}
          {layer2 > 0.6 && <path d={nailTopEdge(0.7)} fill="none" stroke="rgba(255,244,214,0.28)" strokeWidth="1.1" opacity={layer2} />}
          <path d={nailTopEdge(build)} fill="none" stroke="rgba(255,248,224,0.6)" strokeWidth="1.6" />
          {wipeActive && (
            <g clipPath="url(#njClip)"><rect x={200 + wipeT * 420 - 30} y="110" width="54" height="120" fill="rgba(255,250,232,0.3)" transform="skewX(-12)" /></g>
          )}
          {sealed > 0.01 && (
            <g opacity={sealed}>
              <path d={buildPath} fill="url(#njCream)" />
              <path d={nailTopEdge(build)} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" />
              {shine >= 0 && (
                <g clipPath="url(#njClip)"><rect x={200 + shine * 440 - 16} y="105" width="30" height="130" fill="rgba(255,255,255,0.45)" transform="skewX(-14)" /></g>
              )}
            </g>
          )}
          {sealed > 0.2 && <path d="M 546 168 C 556 173, 561 178, 562 184" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.2" strokeLinecap="round" opacity={sealed} />}
        </g>
      )}

      <Sparkle x={300} y={126} s={1.4} opacity={sealed * tw(0)} />
      <Sparkle x={460} y={120} s={1.05} opacity={sealed * tw(1.7)} />
      <Sparkle x={250} y={140} s={0.85} opacity={sealed * tw(3.1)} />

      <Leader from={[296, 150]} to={[280, 282]} label="lecho" opacity={dmg} />
      <Leader from={[428, 124]} to={[452, 282]} label="daño" opacity={dmg} />
      <Leader from={[450, 120]} to={[540, 84]} label="prótesis" anchor="start" opacity={labProt} />
      <Leader from={[346, 122]} to={[286, 80]} label="sellado" opacity={labSell} />
    </svg>
  );
}

// ── steps ──────────────────────────────────────────────────────────────────
const STEPS = [
  { n: 1, name: "Análisis", desc: "Evaluamos el daño desde la base — color, grosor, lecho y forma. Aquí empieza tu plan." },
  { n: 2, name: "Limpieza", desc: "Removemos el daño y el producto previo, y preparamos el lecho a fondo." },
  { n: 3, name: "Reconstrucción", desc: "Construimos capa por capa sobre el lecho — prótesis especializada que fortalece desde adentro." },
  { n: 4, name: "Embellecimiento", desc: "Sellamos y pulimos. Una superficie natural y con brillo, el mismo día." },
];
const STEP_SEEK = [5.6, 14.6, 22.6, 35.2];
function currentStep(t: number) {
  if (t < 14) return 1;
  if (t < 22) return 2;
  if (t < 34) return 3;
  return 4;
}

const LOOP_START = 4.4;
const LOOP_END = 43;

export function NailJourney() {
  const reduced = typeof window !== "undefined" && prefersReducedMotion();
  const [time, setTime] = useState(reduced ? 39 : LOOP_START);
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useRef(false);
  const last = useRef<number | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (reduced || !wrap.current) return;
    const io = new IntersectionObserver(([e]) => { inView.current = e.isIntersecting; }, { threshold: 0.25 });
    io.observe(wrap.current);
    const step = (ts: number) => {
      if (last.current == null) last.current = ts;
      const dt = (ts - last.current) / 1000;
      last.current = ts;
      if (inView.current && document.visibilityState === "visible") {
        setTime((tt) => { let next = tt + dt; if (next >= LOOP_END) next = LOOP_START + (next - LOOP_END); return next; });
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => { io.disconnect(); if (raf.current) cancelAnimationFrame(raf.current); last.current = null; };
  }, [reduced]);

  const seek = (i: number) => { last.current = null; setTime(STEP_SEEK[i]); };
  const step = currentStep(time);
  const active = STEPS[step - 1];

  return (
    <div ref={wrap}>
      <div className="mx-auto w-full max-w-[500px]">
        <NailFigure t={time} />
      </div>

      <div className="relative mx-auto mt-8 max-w-md">
        <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-px bg-white/12" aria-hidden="true" />
        <div className="relative flex justify-between">
          {STEPS.map((sp, i) => {
            const on = step === sp.n;
            const done = step > sp.n;
            return (
              <button
                key={sp.n}
                onClick={() => seek(i)}
                aria-label={sp.name}
                aria-current={on}
                className={`relative w-9 h-9 rounded-full border flex items-center justify-center font-display text-sm transition-colors duration-300 ${
                  on ? "border-[var(--gold)] bg-[var(--gold)] text-black" : done ? "border-[var(--gold)]/50 text-[var(--gold)]/80 bg-[#0a0a0a]" : "border-white/25 text-white/45 bg-[#0a0a0a]"
                }`}
              >
                {sp.n}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 text-center max-w-xl mx-auto min-h-[5.5rem]">
        <div className="flex items-baseline justify-center gap-3">
          <span className="font-display italic text-xl text-[var(--gold)]">0{step}</span>
          <h3 className="font-display text-2xl sm:text-3xl text-[#f5f1ea]">{active.name}</h3>
        </div>
        <p className="text-sm font-light text-white/55 leading-relaxed mt-3">{active.desc}</p>
      </div>
    </div>
  );
}

export default NailJourney;
