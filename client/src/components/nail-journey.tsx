import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { prefersReducedMotion } from "@/lib/scroll";

/**
 * Illustrated, interactive "nail journey" — a refined SIDE cross-section of a
 * toe/fingertip. The nail is rebuilt layer by layer from the bed up across the
 * four treatment stages. Pure SVG (gradients + shading for depth), so it stays
 * crisp and weightless while telling the story without any photo dependency.
 */

interface Stage {
  key: string;
  label: string;
  desc: string;
  nail: string; // natural nail-plate fill
  damage: number;
  marker: number; // "lecho" + "daño" callouts
  build: number; // reconstruction opacity
  grow: number; // reconstruction scaleY (grows up from the bed)
  goldEdge: number;
  protLabel: number; // "prótesis" callout
  gloss: number;
  sealLabel: number; // "sellado" callout
  sparkle: number;
}

const STAGES: Stage[] = [
  { key: "analisis", label: "Análisis", desc: "Evaluamos el daño desde la base — color, grosor, lecho y forma. Aquí empieza tu plan.", nail: "#c7b074", damage: 1, marker: 1, build: 0, grow: 0.25, goldEdge: 0, protLabel: 0, gloss: 0, sealLabel: 0, sparkle: 0 },
  { key: "limpieza", label: "Limpieza", desc: "Removemos el producto previo y preparamos el lecho a fondo.", nail: "#e3d2bd", damage: 0.22, marker: 0, build: 0, grow: 0.25, goldEdge: 0, protLabel: 0, gloss: 0, sealLabel: 0, sparkle: 0 },
  { key: "reconstruccion", label: "Reconstrucción", desc: "Construimos capa por capa sobre el lecho — prótesis especializada que fortalece desde adentro.", nail: "#ecdac6", damage: 0, marker: 0, build: 1, grow: 1, goldEdge: 1, protLabel: 1, gloss: 0.12, sealLabel: 0, sparkle: 0 },
  { key: "embellecimiento", label: "Embellecimiento", desc: "Sellamos y pulimos. Una superficie natural y con brillo, el mismo día.", nail: "#f4e6d8", damage: 0, marker: 0, build: 1, grow: 1, goldEdge: 0.45, protLabel: 0, gloss: 0.55, sealLabel: 1, sparkle: 1 },
];

const T = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };

export function NailJourney() {
  const [active, setActive] = useState(0);
  const touched = useRef(false);
  const wrap = useRef<HTMLDivElement>(null);
  const s = STAGES[active];

  useEffect(() => {
    if (prefersReducedMotion() || !wrap.current) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !touched.current && timer === undefined) {
          timer = window.setInterval(() => {
            if (touched.current) return;
            setActive((a) => (a + 1) % STAGES.length);
          }, 2700);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(wrap.current);
    return () => { io.disconnect(); if (timer) clearInterval(timer); };
  }, []);

  const pick = (i: number) => { touched.current = true; setActive(i); };

  return (
    <div ref={wrap} className="grid md:grid-cols-[minmax(0,420px)_1fr] gap-10 lg:gap-16 items-center">
      {/* ── The nail, in side cross-section ── */}
      <div className="mx-auto w-full max-w-[420px]">
        <svg viewBox="0 0 340 230" className="w-full h-auto" role="img" aria-label={`Etapa: ${s.label}`}>
          <defs>
            <radialGradient id="nj-pad" cx="34%" cy="32%" r="85%">
              <stop offset="0%" stopColor="#4a382e" />
              <stop offset="55%" stopColor="#2c211b" />
              <stop offset="100%" stopColor="#160f0c" />
            </radialGradient>
            <linearGradient id="nj-bed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8c5f50" />
              <stop offset="100%" stopColor="#5e3e34" />
            </linearGradient>
            <linearGradient id="nj-plate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
            </linearGradient>
            <linearGradient id="nj-build" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8ecdf" />
              <stop offset="100%" stopColor="#e6d3bf" />
            </linearGradient>
            <linearGradient id="nj-gloss" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="nj-shadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ambient contact shadow */}
          <ellipse cx="150" cy="196" rx="135" ry="20" fill="url(#nj-shadow)" />

          {/* fingertip pad (profile, tip → right) */}
          <path d="M 18 96 L 172 90 C 228 90 272 108 272 130 C 272 156 228 174 172 174 L 18 178 Z" fill="url(#nj-pad)" />
          {/* soft rim light on the pad */}
          <path d="M 30 100 C 90 94 150 95 198 104" fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="6" strokeLinecap="round" />

          {/* nail bed — warm layer the nail grows on */}
          <path d="M 130 92 C 180 84 226 86 262 108 C 264 110 264 114 262 116 C 226 96 180 94 132 100 Z" fill="url(#nj-bed)" opacity="0.85" />

          {/* cuticle fold at the base */}
          <path d="M 124 88 C 131 86 136 90 134 99 C 128 99 123 95 124 88 Z" fill="#1f1611" />

          {/* natural nail plate */}
          <motion.path
            d="M 128 88 C 180 79 228 81 266 107 C 272 111 273 118 267 122 C 262 118 258 116 254 114 C 228 98 180 96 134 100 C 128 98 125 93 128 88 Z"
            animate={{ fill: s.nail }}
            transition={T}
          />
          {/* plate shading overlay (kept constant for depth) */}
          <path d="M 128 88 C 180 79 228 81 266 107 C 272 111 273 118 267 122 C 262 118 258 116 254 114 C 228 98 180 96 134 100 C 128 98 125 93 128 88 Z" fill="url(#nj-plate)" />

          {/* damage — discoloration + crumbly, lifted free edge */}
          <motion.g animate={{ opacity: s.damage }} transition={T}>
            <ellipse cx="188" cy="90" rx="20" ry="6.5" fill="#a9842f" opacity="0.5" />
            <ellipse cx="224" cy="95" rx="13" ry="5.5" fill="#84621f" opacity="0.5" />
            <path d="M 250 112 l8 -2 2 5 6 -3 1 6 -10 2 z" fill="#7c5a22" opacity="0.7" />
            <path d="M 254 114 C 262 113 268 117 270 122 C 263 119 257 118 251 117 Z" fill="#000" opacity="0.4" />
          </motion.g>

          {/* reconstruction — builds up from the bed (grows on entry) */}
          <motion.g
            style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
            animate={{ opacity: s.build, scaleY: s.grow }}
            transition={T}
          >
            <path d="M 126 83 C 180 73 230 75 270 105 C 277 110 278 118 271 123 C 266 119 261 117 257 115 C 230 96 180 93 132 97 C 126 94 123 88 126 83 Z" fill="url(#nj-build)" />
            {/* hairline that hints at the layered build */}
            <path d="M 138 92 C 184 84 228 86 260 104" fill="none" stroke="#000000" strokeOpacity="0.07" strokeWidth="1" />
          </motion.g>
          {/* gold leading edge of the prosthesis */}
          <motion.path
            d="M 126 83 C 180 73 230 75 270 105 C 277 110 278 118 271 123"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1.6"
            strokeLinecap="round"
            animate={{ opacity: s.goldEdge }}
            transition={T}
          />

          {/* sealed gloss sweep */}
          <motion.path
            d="M 150 80 C 188 73 224 75 252 90 C 224 81 188 79 152 86 Z"
            fill="url(#nj-gloss)"
            animate={{ opacity: s.gloss }}
            transition={T}
          />

          {/* final sparkle + specular dot */}
          <motion.g animate={{ opacity: s.sparkle }} transition={T} fill="#fff">
            <path d="M 168 84 l1.9 5.2 5.2 1.9 -5.2 1.9 -1.9 5.2 -1.9 -5.2 -5.2 -1.9 5.2 -1.9 Z" />
            <circle cx="210" cy="92" r="1.8" />
          </motion.g>

          {/* ── callouts that change per stage ── */}
          {/* lecho (stage 1) */}
          <motion.g animate={{ opacity: s.marker }} transition={{ duration: 0.4 }}>
            <circle cx="200" cy="92" r="17" fill="none" stroke="var(--gold)" strokeWidth="1.1" />
            <line x1="128" y1="96" x2="86" y2="132" stroke="var(--gold)" strokeWidth="0.8" />
            <circle cx="86" cy="132" r="2.4" fill="var(--gold)" />
            <text x="82" y="135" fontSize="10" fill="var(--gold)" textAnchor="end" letterSpacing="1.5">lecho</text>
            <text x="200" y="138" fontSize="10" fill="var(--gold)" textAnchor="middle" letterSpacing="1.5">daño</text>
          </motion.g>
          {/* prótesis (stage 3) */}
          <motion.g animate={{ opacity: s.protLabel }} transition={{ duration: 0.4 }}>
            <line x1="220" y1="86" x2="262" y2="58" stroke="var(--gold)" strokeWidth="0.8" />
            <circle cx="262" cy="58" r="2.4" fill="var(--gold)" />
            <text x="268" y="61" fontSize="10" fill="var(--gold)" textAnchor="start" letterSpacing="1.5">prótesis</text>
          </motion.g>
          {/* sellado (stage 4) */}
          <motion.g animate={{ opacity: s.sealLabel }} transition={{ duration: 0.4 }}>
            <line x1="200" y1="80" x2="240" y2="54" stroke="var(--gold)" strokeWidth="0.8" />
            <circle cx="240" cy="54" r="2.4" fill="var(--gold)" />
            <text x="246" y="57" fontSize="10" fill="var(--gold)" textAnchor="start" letterSpacing="1.5">sellado</text>
          </motion.g>
        </svg>
      </div>

      {/* ── The stages ── */}
      <div>
        <ol className="relative">
          <span className="absolute left-[15px] top-3 bottom-9 w-px bg-white/10" aria-hidden="true" />
          {STAGES.map((st, i) => {
            const on = i === active;
            return (
              <li key={st.key}>
                <button
                  onClick={() => pick(i)}
                  className="group w-full text-left flex gap-5 pb-7 last:pb-0"
                  aria-current={on}
                >
                  <span
                    className={`relative z-10 flex-shrink-0 mt-0.5 w-8 h-8 rounded-full border flex items-center justify-center font-display text-sm transition-colors duration-300 ${
                      on ? "border-[var(--gold)] bg-[var(--gold)] text-black" : "border-white/20 bg-[#0a0a0a] text-white/40 group-hover:border-white/40"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-base sm:text-lg transition-colors duration-300 ${on ? "text-[#f5f1ea]" : "text-white/45 group-hover:text-white/70"}`}>
                      {st.label}
                    </span>
                    <motion.span
                      initial={false}
                      animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="block overflow-hidden"
                    >
                      <span className="block text-sm font-light text-white/55 leading-relaxed pt-2 max-w-md">{st.desc}</span>
                    </motion.span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default NailJourney;
