import { useLayoutEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Star } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/scroll";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { cases } from "@/data/cases";

const BOOKSY_URL = "https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo";

const HERO_CASE = { before: "/cases/Caso5_before.png", after: "/cases/Caso5_after.png" };
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
    label: "Formación en enfermería",
    desc: "UPRA — disciplina e higiene clínica aplicadas a cada sesión.",
  },
  {
    figure: "5.0",
    label: "40+ reseñas verificadas",
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
  const counterRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ── Hero: scale-into-focus + line-by-line headline build ── */
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(
            ".hero-media",
            { scale: 1.12, filter: "blur(14px)" },
            { scale: 1, filter: "blur(0px)", duration: 1.4, ease: "power2.out" }
          )
          .from(".hero-line > span", { yPercent: 110, duration: 0.9, stagger: 0.1, ease: "power4.out" }, "-=1.0")
          .from(".hero-meta", { opacity: 0, y: 14, duration: 0.45, stagger: 0.07 }, "-=0.5");

        /* Hero parallax: media drifts slower than the page */
        gsap.to(".hero-media", {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-content", {
          yPercent: -10,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: ".hero-section", start: "top top", end: "85% top", scrub: true },
        });

        /* ── Generic building blocks (used sparingly, on purpose) ── */
        gsap.utils.toArray<HTMLElement>(".reveal-line > span").forEach((el) => {
          gsap.from(el, {
            yPercent: 110,
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: { trigger: el.parentElement, start: "top 85%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>(".wipe").forEach((el) => {
          const img = el.querySelector("img, .wipe-inner");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top 78%", once: true },
          });
          tl.fromTo(
            el,
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 1.05, ease: "power3.inOut" }
          );
          if (img) tl.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 1.05, ease: "power3.inOut" }, 0);
        });

        gsap.utils.toArray<HTMLElement>(".stagger-up").forEach((group) => {
          gsap.from(group.children, {
            opacity: 0,
            y: 28,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 82%", once: true },
          });
        });

        /* ── Pinned transformation gallery: cases wipe through while pinned ── */
        const slides = gsap.utils.toArray<HTMLElement>(".case-slide");
        if (slides.length > 1) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".gallery-pin",
              start: "top top",
              // function form re-evaluates on every refresh; px values keep
              // the pin distance immune to early-layout measurement races
              end: () => `+=${Math.round(window.innerHeight * slides.length * 0.85)}`,
              pin: true,
              scrub: 0.6,
              onUpdate(self) {
                if (!counterRef.current) return;
                const i = Math.min(slides.length - 1, Math.round(self.progress * (slides.length - 1)));
                const next = String(i + 1).padStart(2, "0");
                if (counterRef.current.textContent !== next) counterRef.current.textContent = next;
              },
            },
          });
          slides.forEach((slide, i) => {
            if (i === 0) return;
            tl.fromTo(
              slide,
              { clipPath: "inset(100% 0 0 0)" },
              { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "none" },
              i - 0.45
            ).fromTo(
              slide.querySelector(".case-inner"),
              { scale: 1.08 },
              { scale: 1, duration: 1, ease: "none" },
              "<"
            );
          });
          tl.to({}, { duration: 0.4 }); // hold on the last case before unpinning
        }

        /* ── Emotional section: faint gold glow drifts with scroll ── */
        gsap.to(".emotion-glow", {
          yPercent: -25,
          ease: "none",
          scrollTrigger: { trigger: ".emotion-section", start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, root);

    // Re-measure once webfonts and hero images have settled — pin geometry
    // captured against a half-loaded layout would otherwise stick
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="relative">
      {/* ════════ 1 · CINEMATIC HERO ════════ */}
      <section className="hero-section relative h-[100svh] min-h-[560px] overflow-hidden">
        <div className="hero-media absolute inset-0 will-change-transform">
          <BeforeAfterSlider
            beforeImage={HERO_CASE.before}
            afterImage={HERO_CASE.after}
            className="absolute inset-0"
            priority
            alt="Reconstrucción estética de uñas"
          />
          {/* Scrims keep type legible without burying the work */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/35 to-[#0a0a0a]/60" />
          <div className="absolute inset-x-0 top-0 h-24 pointer-events-none bg-gradient-to-b from-[#0a0a0a]/70 to-transparent" />
        </div>

        <div className="hero-content relative z-10 h-full flex flex-col justify-end pb-20 sm:pb-24">
          <div className="container mx-auto px-5 sm:px-8">
            <p className="hero-meta text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[var(--cream)]/80 mb-5">
              Estudio privado de onicoplastia &mdash; Hatillo, Puerto Rico
            </p>

            <h1 className="font-display font-light text-[clamp(2.6rem,8.5vw,7rem)] leading-[0.98] tracking-[-0.01em] text-[#f5f1ea] mb-6">
              <span className="hero-line line-mask"><span className="inline-block">El arte de</span></span>
              <span className="hero-line line-mask">
                <span className="inline-block">
                  volver a <em className="font-normal italic text-[var(--cream)]">mostrarte.</em>
                </span>
              </span>
            </h1>

            <p className="hero-meta max-w-md text-sm sm:text-base font-light text-white/70 leading-relaxed mb-8">
              Reconstrucción estética para uñas dañadas por hongos, trauma o años de gel.
              Sin dolor. Una clienta a la vez.
            </p>

            <div className="hero-meta flex flex-wrap items-center gap-5">
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

            <p className="hero-meta mt-8 text-[10px] tracking-[0.25em] uppercase text-white/35">
              Desliza la línea para ver la transformación
            </p>
          </div>
        </div>
      </section>

      {/* ════════ 2 · PINNED TRANSFORMATION GALLERY ════════ */}
      <section className="relative pt-28 sm:pt-36 pb-10">
        <div className="container mx-auto px-5 sm:px-8">
          <p className="reveal-line line-mask text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
            <span className="inline-block">Casos reales &mdash; sin filtros</span>
          </p>
          <h2 className="font-display font-light text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.02] text-[#f5f1ea] max-w-3xl">
            <span className="reveal-line line-mask"><span className="inline-block">Cada uña cuenta</span></span>
            <span className="reveal-line line-mask"><span className="inline-block">una <em className="italic text-[var(--cream)]">transformación.</em></span></span>
          </h2>
        </div>
      </section>

      <section className="gallery-pin relative overflow-hidden" style={{ height: "100svh" }}>
        {GALLERY_CASES.map((c, i) => (
          <div
            key={c.id}
            className="case-slide absolute inset-0"
            style={{ zIndex: i, clipPath: i === 0 ? undefined : "inset(100% 0 0 0)" }}
          >
            <div className="case-inner absolute inset-0 will-change-transform">
              <BeforeAfterSlider
                beforeImage={c.beforeImage}
                afterImage={c.afterImage}
                className="absolute inset-0"
                alt={c.title}
                hint={i === 0}
              />
              <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-[#0a0a0a]/85 to-transparent" />
              <div className="absolute bottom-8 left-5 sm:left-8 pointer-events-none">
                <p className="font-display italic text-2xl sm:text-3xl text-[#f5f1ea]">{c.title}</p>
                <p className="text-xs text-white/55 mt-1 max-w-xs">{c.description}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Case counter */}
        <div className="absolute bottom-8 right-5 sm:right-8 z-20 pointer-events-none flex items-baseline gap-1.5 text-[#f5f1ea]">
          <span ref={counterRef} className="font-display text-3xl sm:text-4xl">01</span>
          <span className="text-xs text-white/45 tracking-widest">/ {String(GALLERY_CASES.length).padStart(2, "0")}</span>
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

          <div className="stagger-up mt-10 flex flex-wrap items-center justify-center gap-2 text-white/40">
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

      {/* ════════ 6 · BOOKING ════════ */}
      <section className="relative py-32 sm:py-44">
        <div className="container mx-auto px-5 sm:px-8 text-center">
          <h2 className="font-display font-light text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] text-[#f5f1ea] mb-6">
            <span className="reveal-line line-mask"><span className="inline-block">Tu cita <em className="italic text-[var(--cream)]">te espera.</em></span></span>
          </h2>
          <p className="text-sm font-light text-white/55 mb-12">
            Primera sesión <span className="text-[var(--cream)]">$120</span> &mdash; evaluación, reconstrucción y acabado incluidos.
            Seguimientos $80.
          </p>

          <div className="stagger-up flex flex-col items-center gap-6">
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
