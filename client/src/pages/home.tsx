import { useLayoutEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Star } from "lucide-react";
import { gsap } from "@/lib/scroll";
import { useEditorialMotion } from "@/hooks/use-editorial-motion";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { cases } from "@/data/cases";

const BOOKSY_URL = "https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo";

const HERO_CASE = { before: "/cases/Caso5_before.webp", after: "/cases/Caso5_after.webp" };
const GALLERY_CASES = cases.slice(0, 4);

const STANDARDS = [
  { name: "HEMA-Free", why: "Sin el monómero más asociado con reacciones alérgicas." },
  { name: "Di-HEMA-Free", why: "Variante igualmente sensibilizante, eliminada de toda la formulación." },
  { name: "TPO-Free", why: "Cumple el estándar europeo más estricto (UE 2025)." },
  { name: "Vegano", why: "Sin ingredientes de origen animal. Sin testeo en animales." },
  { name: "Hipoalergénico", why: "Apto para piel sensible y con historial de reacciones." },
  { name: "Bajo Olor", why: "Ambiente respirable durante toda la sesión." },
];

const TRUST = [
  {
    figure: "RN",
    label: "Higiene de nivel clínico",
    desc: "Formación en enfermería (UPRA), aplicada a la limpieza y el detalle de cada sesión.",
  },
  {
    figure: "5.0",
    label: "50+ reseñas verificadas",
    desc: "Calificación perfecta en Booksy. Clientes reales, resultados reales.",
  },
  {
    figure: "1:1",
    label: "Estudio privado",
    desc: "Una clienta a la vez. Solo con cita previa.",
  },
];

export default function Home() {
  const root = useRef<HTMLDivElement>(null);

  useEditorialMotion(root);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ── Hero: scale-into-focus + line-by-line headline build.
              No blur filter — a frozen frame mid-entrance would leave
              the photo permanently soft. Scale alone degrades safely. ── */
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(".hero-media", { scale: 1.08 }, { scale: 1, duration: 1.2, ease: "power2.out" })
          .from(".hero-line > span", { yPercent: 110, duration: 0.9, stagger: 0.1, ease: "power4.out" }, "-=0.8")
          .from(".hero-meta", { opacity: 0, y: 14, duration: 0.45, stagger: 0.07 }, "-=0.5");

        /* Hero parallax: photo drifts slower than the page */
        gsap.to(".hero-media", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true },
        });

        /* ── Emotional section: faint gold glow drifts with scroll ── */
        gsap.to(".emotion-glow", {
          yPercent: -25,
          ease: "none",
          scrollTrigger: { trigger: ".emotion-section", start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative">
      {/* ════════ 1 · CINEMATIC HERO — full-bleed, draggable ════════ */}
      <section className="hero-section relative h-[100svh] min-h-[560px] overflow-hidden">
        <div className="hero-media absolute inset-0 will-change-transform">
          <BeforeAfterSlider
            beforeImage={HERO_CASE.before}
            afterImage={HERO_CASE.after}
            className="w-full h-full"
            priority
            alt="Reconstrucción estética de uñas"
          />
          {/* Scrims keep type legible without burying the work */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/15 to-[#0a0a0a]/40" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0a0a0a]/60 via-[#0a0a0a]/10 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-24 pointer-events-none bg-gradient-to-b from-[#0a0a0a]/60 to-transparent" />
        </div>

        {/* pointer-events-none so the slider underneath stays draggable;
            interactive children re-enable themselves */}
        <div className="hero-content relative z-10 h-full flex flex-col justify-end pb-24 sm:pb-24 pointer-events-none">
          <div className="container mx-auto px-5 sm:px-8">
            <p className="hero-meta text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[var(--cream)]/90 mb-5 [text-shadow:0_1px_12px_rgba(0,0,0,0.7)]">
              Estudio privado de onicoplastia &mdash; Hatillo, Puerto Rico
            </p>

            <h1 className="font-display font-light text-[clamp(2.6rem,8.5vw,7rem)] leading-[0.98] tracking-[-0.01em] text-[#f5f1ea] mb-6 [text-shadow:0_2px_28px_rgba(0,0,0,0.65)]">
              <span className="hero-line line-mask"><span className="inline-block">El arte de</span></span>
              <span className="hero-line line-mask">
                <span className="inline-block">
                  volver a <em className="font-normal italic text-[var(--cream)]">mostrarte.</em>
                </span>
              </span>
            </h1>

            <p className="hero-meta max-w-md text-sm sm:text-base font-light text-white/80 leading-relaxed mb-8 [text-shadow:0_1px_16px_rgba(0,0,0,0.7)]">
              Reconstrucción estética para uñas dañadas por hongos, trauma o años de gel.
              Sin dolor. Una clienta a la vez.
            </p>

            <div className="hero-meta flex flex-wrap items-center gap-5 pointer-events-auto">
              <a
                href={BOOKSY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel inline-flex items-center gap-3 px-7 py-4 text-sm tracking-[0.18em] uppercase text-[#f5f1ea] transition-[background-color,border-color,transform] duration-200 hover:bg-[var(--cream)] hover:text-black hover:border-transparent active:scale-[0.98]"
              >
                Agenda tu cita
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/onicoplastia"
                className="text-xs tracking-[0.2em] uppercase text-white/50 hover:text-[var(--cream)] transition-colors duration-200 border-b border-white/20 hover:border-[var(--cream)] pb-1"
              >
                Conoce el tratamiento
              </Link>
            </div>

            <p className="hero-meta mt-8 text-[10px] tracking-[0.25em] uppercase text-white/40 [text-shadow:0_1px_10px_rgba(0,0,0,0.8)]">
              Desliza la línea para ver la transformación
            </p>
          </div>
        </div>

        {/* Scroll affordance — phones need to know there's more below */}
        <div className="hero-meta absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none">
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/40">Scroll</span>
          <span className="block w-px h-6 bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* ════════ 2 · TRANSFORMATIONS — each case whole, framed, never cut ════════ */}
      <section className="relative pt-28 sm:pt-36 pb-8">
        <div className="container mx-auto px-5 sm:px-8 max-w-5xl">
          <p className="reveal-line line-mask text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
            <span className="inline-block">Casos reales &mdash; sin filtros</span>
          </p>
          <h2 className="font-display font-light text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.02] text-[#f5f1ea] max-w-3xl mb-3">
            <span className="reveal-line line-mask"><span className="inline-block">Cada uña cuenta</span></span>
            <span className="reveal-line line-mask"><span className="inline-block">una <em className="italic text-[var(--cream)]">transformación.</em></span></span>
          </h2>
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/35">
            Desliza la línea para comparar
          </p>
        </div>
      </section>

      <section className="relative pb-16 sm:pb-24">
        <div className="container mx-auto px-5 sm:px-8 max-w-5xl space-y-10 sm:space-y-14">
          {GALLERY_CASES.map((c, i) => (
            <div key={c.id} className="wipe border border-white/15 bg-[#0a0a0a]">
              <div className="wipe-inner relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden will-change-transform">
                <BeforeAfterSlider
                  beforeImage={c.beforeImage}
                  afterImage={c.afterImage}
                  className="w-full h-full"
                  alt={c.title}
                  hint={i === 0}
                />
              </div>
              <div className="flex items-baseline justify-between gap-4 border-t border-white/15 px-5 py-4">
                <div className="min-w-0">
                  <p className="font-display italic text-lg sm:text-xl text-[#f5f1ea] truncate">{c.title}</p>
                  <p className="text-[11px] text-white/45 mt-0.5 truncate">{c.description}</p>
                </div>
                <span className="font-display text-2xl text-white/25 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                  <span className="text-sm text-white/20"> / {String(GALLERY_CASES.length).padStart(2, "0")}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════ 3 · PHILOSOPHY — clean standards (stays high per brand) ════════ */}
      <section className="relative py-28 sm:py-40">
        <div className="container mx-auto px-5 sm:px-8 max-w-5xl">
          <p className="reveal-line line-mask text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
            <span className="inline-block">Filosofía del estudio</span>
          </p>
          <h2 className="font-display font-light text-[clamp(2rem,5vw,3.8rem)] leading-[1.05] text-[#f5f1ea] mb-6">
            <span className="reveal-line line-mask"><span className="inline-block">No es solo estética.</span></span>
            <span className="reveal-line line-mask"><span className="inline-block"><em className="italic text-[var(--cream)]">Es salud.</em></span></span>
          </h2>
          <p className="max-w-xl text-sm sm:text-base font-light text-white/60 leading-relaxed mb-16">
            En este estudio solo entran los productos más limpios del mercado. Las uñas
            que atendemos — sensibles, con historial, comprometidas — exigen ese estándar.
            Y lo que es seguro para esos casos, lo es para cualquier piel.
          </p>

          <div className="stagger-up grid grid-cols-1 sm:grid-cols-2 gap-x-14">
            {STANDARDS.map((s) => (
              <div key={s.name} className="flex items-baseline justify-between gap-6 py-5 border-t border-white/10">
                <h3 className="text-sm tracking-[0.12em] uppercase text-[#f5f1ea] whitespace-nowrap">{s.name}</h3>
                <p className="text-xs text-white/45 font-light text-right leading-relaxed">{s.why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ 4 · EMOTIONAL — whitespace, one message ════════ */}
      <section className="emotion-section relative py-36 sm:py-56 overflow-hidden">
        <div
          className="emotion-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vmin] h-[80vmin] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(201,169,106,0.08) 0%, transparent 65%)" }}
        />
        <div className="relative container mx-auto px-5 sm:px-8 text-center">
          <p className="reveal-line line-mask text-sm sm:text-base font-light text-white/45 mb-8">
            <span className="inline-block">Playa. Sandalias. Manos sobre la mesa.</span>
          </p>
          <h2 className="font-display font-light text-[clamp(2.4rem,7vw,5.5rem)] leading-[1.02] text-[#f5f1ea]">
            <span className="reveal-line line-mask"><span className="inline-block">No tienes que</span></span>
            <span className="reveal-line line-mask"><span className="inline-block"><em className="italic text-[var(--cream)]">esconderte</em> más.</span></span>
          </h2>
        </div>
      </section>

      {/* ════════ 5 · TRUST — glassmorphism cards ════════ */}
      <section className="relative py-24 sm:py-32">
        <div className="container mx-auto px-5 sm:px-8 max-w-5xl">
          <div className="stagger-up grid grid-cols-1 md:grid-cols-3 gap-5">
            {TRUST.map((t) => (
              <div
                key={t.label}
                className="glass-panel p-8 transition-transform duration-200 hover:-translate-y-1"
              >
                <p className="font-display text-4xl text-[var(--cream)] mb-5">{t.figure}</p>
                <h3 className="text-xs tracking-[0.2em] uppercase text-[#f5f1ea] mb-2">{t.label}</h3>
                <p className="text-sm font-light text-white/50 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-white/40">
            <span className="flex gap-1" aria-label="5 estrellas">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[var(--gold)] text-[var(--gold)]" />
              ))}
            </span>
            <span className="text-xs font-light tracking-wide">
              &ldquo;Llevaba años escondiendo mis pies. Neycha me devolvió la confianza.&rdquo; &mdash; María G.
            </span>
          </div>
        </div>
      </section>

      {/* ════════ 6 · BOOKING — static and stable, no reveal on the money button ════════ */}
      <section className="relative py-32 sm:py-44">
        <div className="container mx-auto px-5 sm:px-8 text-center">
          <h2 className="font-display font-light text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] text-[#f5f1ea] mb-6">
            <span className="reveal-line line-mask"><span className="inline-block">Tu cita <em className="italic text-[var(--cream)]">te espera.</em></span></span>
          </h2>
          <p className="text-sm font-light text-white/55 mb-12">
            Primera sesión <span className="text-[var(--cream)]">$120</span> &mdash; evaluación, reconstrucción y acabado incluidos.
            Seguimientos $80.
          </p>

          <div className="flex flex-col items-center gap-6">
            <a
              href={BOOKSY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[var(--cream)] text-black px-12 py-5 text-sm font-medium tracking-[0.2em] uppercase transition-[transform,box-shadow] duration-200 hover:shadow-[0_12px_50px_rgba(242,230,216,0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Agenda tu cita
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/35">
              Solo con cita previa &mdash; Hatillo, PR 00659
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
