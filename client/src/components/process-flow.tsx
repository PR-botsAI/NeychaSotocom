import { useState } from "react";
import { motion } from "framer-motion";

/**
 * Interactive illustration of the studio's actual flow — toggles between a
 * first visit (with evaluation) and a follow-up (faster, no re-eval).
 * Pure UI/SVG, so it conveys the service without depending on photo quality.
 */

type IconName = "search" | "plan" | "clean" | "rebuild" | "polish" | "review";

const Icon = ({ name }: { name: IconName }) => {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "search":
      return (<svg {...common}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>);
    case "plan":
      return (<svg {...common}><path d="M9 4h6a1 1 0 0 1 1 1v1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2V5a1 1 0 0 1 1-1Z" /><path d="m9 13 2 2 4-4" /></svg>);
    case "clean":
      return (<svg {...common}><path d="M12 3s5 5.5 5 9a5 5 0 0 1-10 0c0-3.5 5-9 5-9Z" /></svg>);
    case "rebuild":
      return (<svg {...common}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z" /><path d="M12 12 4 7.5M12 12l8-4.5M12 12v9" /></svg>);
    case "polish":
      return (<svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></svg>);
    case "review":
      return (<svg {...common}><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 4v4h4" /></svg>);
  }
};

interface Step {
  icon: IconName;
  title: string;
  desc: string;
  time: string;
}

const FIRST: Step[] = [
  { icon: "search", title: "Análisis de la uña", desc: "Evaluamos tu caso — hongos, trauma, grosor o forma. Mayormente pies; también manos.", time: "~15 min" },
  { icon: "plan", title: "Plan personalizado", desc: "Diseñamos un plan para tu uña específica. No un protocolo genérico.", time: "incluido" },
  { icon: "clean", title: "Limpieza", desc: "Removemos el producto previo y preparamos la uña a fondo.", time: "~30 min" },
  { icon: "rebuild", title: "Reconstrucción", desc: "Reconstruimos con prótesis especializada y fortalecemos desde adentro.", time: "~60 min" },
  { icon: "polish", title: "Embellecimiento", desc: "Acabado profesional. Sales con apariencia natural el mismo día.", time: "~30 min" },
];

const FOLLOWUP: Step[] = [
  { icon: "review", title: "Revisión rápida", desc: "Vemos tu progreso y lo que ha cambiado desde la última visita.", time: "~10 min" },
  { icon: "clean", title: "Limpieza", desc: "Preparamos y limpiamos la uña.", time: "~20 min" },
  { icon: "rebuild", title: "Reconstrucción", desc: "Ajustamos y reforzamos la reconstrucción.", time: "~40 min" },
  { icon: "polish", title: "Embellecimiento", desc: "Acabado profesional. Lista de nuevo.", time: "~20 min" },
];

const TABS = [
  { id: "first", label: "Primera visita", price: "$120", steps: FIRST },
  { id: "follow", label: "Seguimiento", price: "$80", steps: FOLLOWUP },
] as const;

export function ProcessFlow() {
  const [active, setActive] = useState<"first" | "follow">("first");
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <div>
      {/* Toggle */}
      <div className="inline-flex p-1 border border-white/15 rounded-full mb-12 relative">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`relative z-10 px-5 sm:px-7 py-2.5 text-[11px] sm:text-xs tracking-[0.18em] uppercase rounded-full transition-colors duration-200 ${
              active === t.id ? "text-black" : "text-white/55 hover:text-white/85"
            }`}
          >
            {active === t.id && (
              <motion.span
                layoutId="proc-toggle"
                className="absolute inset-0 bg-[var(--cream)] rounded-full -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {t.label}
          </button>
        ))}
      </div>

      {/* Steps — keyed by tab so toggling remounts and replays the entrance */}
      <motion.ol
        key={active}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } } }}
        className="relative"
      >
        {/* connecting line */}
        <span className="absolute left-[19px] top-3 bottom-10 w-px bg-white/10" aria-hidden="true" />

        {tab.steps.map((s, i) => (
          <motion.li
            key={s.title}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="relative flex gap-5 sm:gap-7 pb-10 last:pb-0"
          >
              <div className="relative flex-shrink-0 w-10 h-10 rounded-full border border-[var(--gold)]/40 bg-[#0a0a0a] text-[var(--gold)] flex items-center justify-center">
                <Icon name={s.icon} />
              </div>
              <div className="pt-1.5 min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-display text-sm text-white/30">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-base sm:text-lg text-[#f5f1ea]">{s.title}</h3>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--gold)]/70">{s.time}</span>
                </div>
                <p className="text-sm font-light text-white/50 leading-relaxed mt-2 max-w-xl">{s.desc}</p>
              </div>
            </motion.li>
          ))}
      </motion.ol>

      {/* Price footnote follows the active tab */}
      <div className="mt-4 pt-6 border-t border-white/10 flex flex-wrap items-baseline gap-x-6 gap-y-1">
        <p className="text-sm font-light text-white/55">
          {tab.label}: <span className="text-[var(--cream)]">{tab.price}</span>
        </p>
        <p className="text-[11px] text-white/35">Pies o manos &mdash; cada servicio se cobra por separado.</p>
      </div>
    </div>
  );
}

export default ProcessFlow;
