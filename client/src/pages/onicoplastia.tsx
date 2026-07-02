import { useRef } from "react";
import { ArrowRight, Star } from "lucide-react";
import { useEditorialMotion } from "@/hooks/use-editorial-motion";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { StillCompare } from "@/components/still-compare";
import { NailJourney } from "@/components/nail-journey";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cases } from "@/data/cases";

const BOOKSY_URL = "https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo";

const STATS = [
  { figure: "50+", label: "Reseñas 5 estrellas" },
  { figure: "5.0", label: "Calificación Booksy" },
  { figure: "0", label: "Dolor" },
];

const INCLUDED = [
  "Evaluación personalizada completa",
  "Tratamiento fortalecedor certificado",
  "Reconstrucción con prótesis especializada",
  "GEL Polish profesional incluido",
  "Plan de seguimiento personalizado",
];

const TESTIMONIALS = [
  {
    quote: "Llevaba años escondiendo mis pies. Neycha me devolvió la confianza — ahora voy a la playa, uso sandalias, vivo sin pensar en eso.",
    name: "María G.",
    service: "Onicoplastia",
  },
  {
    quote: "El tratamiento hizo una diferencia increíble. Mis uñas estaban dañadas por años de gel y ahora están más fuertes que nunca. Neycha es una profesional.",
    name: "Carmen L.",
    service: "Restauración de uñas",
  },
  {
    quote: "Después del trauma en mi uña pensé que nunca volvería a verse normal. Una visita con Neycha y no podía creer el resultado. Vale cada centavo.",
    name: "Ana P.",
    service: "Onicoplastia por Trauma",
  },
];

const FAQS = [
  { q: "¿Qué es la onicoplastia?", a: "Tratamiento profesional de restauración de uñas afectadas por hongos, trauma u otras condiciones. Utilizamos tecnología profesional de fortalecimiento para reconstruir la uña desde adentro." },
  { q: "¿Es doloroso?", a: "No. Es completamente indoloro — tan suave como un manicure regular." },
  { q: "¿Cuánto tiempo dura?", a: "Hasta 2 horas. Incluye evaluación, tratamiento fortalecedor, prótesis y GEL Polish. Sales perfecta el mismo día." },
  { q: "¿Cuál es la inversión?", a: "Primera evaluación: $120 (incluye todo, aplica para manos o pies). Seguimientos: $80. Comparado con láser ($699–$2,000), es una fracción del costo con resultados inmediatos." },
  { q: "¿Qué hace especial este tratamiento?", a: "Combinamos fortalecimiento desde adentro con reconstrucción profesional. No solo uñas hermosas — uñas saludables. Evaluación personalizada y seguimiento continuo incluido." },
  { q: "¿Cómo sé si mi caso necesita onicoplastia?", a: "Si tienes una uña con cambio de color, grosor, textura o forma por hongos, trauma u otra causa, es probable que la onicoplastia pueda ayudarte. Puedes mandarme una foto por WhatsApp antes de venir — te oriento sin compromiso si vale el viaje. O agenda directamente tu primera sesión ($120) para un diagnóstico definitivo en persona." },
  { q: "¿Puedo saber el costo total antes de ir?", a: "La primera sesión es $120 (incluye evaluación completa, tratamiento fortalecedor, reconstrucción y GEL Polish). Los seguimientos son $80 cada 45 días. El número de sesiones varía según tu caso — esto se determina en la primera visita. No hay costos ocultos." },
];

const STANDARDS = [
  { name: "HEMA-Free", why: "Sin el monómero más asociado con reacciones alérgicas en servicios de uñas." },
  { name: "Di-HEMA-Free", why: "Variante igualmente sensibilizante eliminada." },
  { name: "TPO-Free", why: "Cumple el estándar europeo más estricto (UE 2025)." },
  { name: "Vegano", why: "Sin ingredientes animales. Sin testeo animal." },
  { name: "Hipoalergénico", why: "Apto para piel sensible y con historial de reacciones." },
  { name: "Bajo Olor", why: "Ambiente respirable durante toda la sesión." },
];

export default function Onicoplastia() {
  const root = useRef<HTMLDivElement>(null);
  useEditorialMotion(root);

  const onicoplastiaCases = cases.filter((c) => c.category === "onicoplastia");

  return (
    <div ref={root} className="relative min-h-screen">
      {/* ════════ HERO — the photo first, the words on solid ground ════════ */}
      <section className="relative">
        <div className="wipe relative h-[52svh] min-h-[340px] sm:h-[62svh] overflow-hidden">
          <div className="wipe-inner absolute inset-0 will-change-transform">
            <StillCompare
              beforeImage="/cases/Caso2_before.webp"
              afterImage="/cases/Caso2_after.webp"
              className="w-full h-full"
              priority
              alt="Antes y después del tratamiento"
            />
          </div>
          <div className="absolute inset-x-0 top-0 h-20 pointer-events-none bg-gradient-to-b from-[#0a0a0a]/50 to-transparent" />
        </div>

        <div className="container mx-auto px-5 sm:px-8 max-w-3xl text-center pt-14 sm:pt-16 pb-6">
          <h1 className="font-display font-light text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] text-[#f5f1ea] mb-5">
            <span className="reveal-line line-mask"><span className="inline-block">Deja de esconder</span></span>
            <span className="reveal-line line-mask"><span className="inline-block">tus <em className="italic text-[var(--cream)]">uñas.</em></span></span>
          </h1>
          <p className="text-sm sm:text-base font-light text-white/65 leading-relaxed mb-9">
            Playa, sandalias, pies descalzos &mdash; vuelve a vivir sin limitaciones.
          </p>
          <a
            href={BOOKSY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[var(--cream)] text-black px-9 py-4 text-xs sm:text-sm font-medium tracking-[0.18em] uppercase transition-[transform,box-shadow] duration-200 hover:shadow-[0_12px_50px_rgba(242,230,216,0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Agendar mi primera sesión &mdash; $120
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ════════ PROOF BAR ════════ */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-5 sm:px-8 max-w-3xl">
          <div className="stagger-up grid grid-cols-3 border-t border-b border-white/10">
            {STATS.map((s) => (
              <div key={s.label} className="text-center py-7">
                <p className="font-display text-3xl sm:text-4xl text-[var(--cream)]">{s.figure}</p>
                <p className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/40 mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ TRANSFORMATION WALL — every case its own frame ════════ */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-5 sm:px-8 max-w-6xl">
          <p className="reveal-line line-mask text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
            <span className="inline-block">Casos reales</span>
          </p>
          <h2 className="font-display font-light text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] text-[#f5f1ea] mb-3">
            <span className="reveal-line line-mask"><span className="inline-block">Cada caso, una <em className="italic text-[var(--cream)]">transformación.</em></span></span>
          </h2>
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/35 mb-12">
            Desliza la línea para comparar
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {onicoplastiaCases.map((c, i) => (
              <div key={c.id} className="wipe border border-white/15 bg-[#0a0a0a]">
                <div className="wipe-inner relative aspect-[4/3] overflow-hidden will-change-transform">
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
                    <p className="font-display italic text-lg text-[#f5f1ea] truncate">{c.title}</p>
                    <p className="text-[11px] text-white/45 mt-0.5 truncate">{c.description}</p>
                  </div>
                  <span className="font-display text-xl text-white/25 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ PROCESS — interactive: first visit vs follow-up ════════ */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-5 sm:px-8 max-w-4xl">
          <p className="reveal-line line-mask text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
            <span className="inline-block">El proceso</span>
          </p>
          <h2 className="font-display font-light text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.05] text-[#f5f1ea] mb-4">
            <span className="reveal-line line-mask"><span className="inline-block">Así de <em className="italic text-[var(--cream)]">simple.</em></span></span>
          </h2>
          <p className="text-sm font-light text-white/45 mb-14 max-w-md">
            De una uña dañada a una apariencia natural — capa por capa, desde el lecho de la uña.
          </p>

          {/* Illustrated nail journey (side cross-section) */}
          <NailJourney />

          <p className="text-[11px] font-light text-white/35 mt-12 pt-6 border-t border-white/10">
            En seguimientos ($80) omitimos el análisis inicial — el resto del proceso es igual.
          </p>
        </div>
      </section>

      {/* ════════ OFFER — one glass panel, one price ════════ */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-5 sm:px-8 max-w-xl">
          <div className="glass-panel p-8 sm:p-12">
            <h3 className="font-display font-light text-2xl sm:text-3xl text-[#f5f1ea] text-center mb-10">
              Tu primera sesión <em className="italic text-[var(--cream)]">incluye</em>
            </h3>

            <div className="stagger-up mb-10">
              {INCLUDED.map((item) => (
                <div key={item} className="flex items-baseline gap-4 py-3 border-t border-white/10">
                  <span className="w-1 h-1 rounded-full bg-[var(--gold)] flex-shrink-0 translate-y-[-3px]" />
                  <span className="text-sm font-light text-white/75">{item}</span>
                </div>
              ))}
            </div>

            <div className="text-center border-t border-white/10 pt-8">
              <p className="font-display text-5xl sm:text-6xl text-[var(--cream)] mb-3">$120</p>
              <p className="text-xs text-white/50">Primera sesión completa &mdash; hasta 2 hrs</p>
              <p className="text-xs text-white/50 mt-1">Seguimientos: <span className="text-[var(--cream)]">$80</span></p>
              <p className="text-[11px] text-white/35 mt-3">Pies o manos &mdash; cada servicio se cobra por separado</p>
              <p className="text-[11px] italic text-white/35 mt-4">vs. tratamiento láser: $699&ndash;$2,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ TESTIMONIALS ════════ */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-5 sm:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-display font-light text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.05] text-[#f5f1ea] mb-4">
              <span className="reveal-line line-mask"><span className="inline-block">Lo que dicen <em className="italic text-[var(--cream)]">nuestros clientes.</em></span></span>
            </h2>
            <div className="flex items-center justify-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[var(--gold)] text-[var(--gold)]" />
              ))}
              <span className="text-xs text-white/45 ml-2">50+ reseñas verificadas</span>
            </div>
          </div>

          <div className="stagger-up grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="border-t border-white/10 pt-6">
                <blockquote className="text-sm font-light text-white/70 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-[11px] tracking-[0.15em] uppercase">
                  <span className="text-[var(--cream)]">{t.name}</span>
                  <span className="text-white/35"> &mdash; {t.service}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-5 sm:px-8 max-w-3xl">
          <h2 className="font-display font-light text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.05] text-[#f5f1ea] mb-10">
            <span className="reveal-line line-mask"><span className="inline-block">Preguntas <em className="italic text-[var(--cream)]">frecuentes.</em></span></span>
          </h2>

          <Accordion type="single" collapsible>
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-white/10"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-normal text-[#f5f1ea] hover:text-[var(--cream)] hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm font-light text-white/55 leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ════════ STANDARDS ════════ */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-5 sm:px-8 max-w-4xl">
          <h2 className="font-display font-light text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.05] text-[#f5f1ea] mb-6">
            <span className="reveal-line line-mask"><span className="inline-block">No es solo estética. <em className="italic text-[var(--cream)]">Es salud.</em></span></span>
          </h2>
          <p className="max-w-xl text-sm font-light text-white/60 leading-relaxed mb-12">
            Los productos que usamos están entre los más limpios disponibles en el mercado.
            Atender uñas y pies comprometidos exige ese estándar &mdash; y ese mismo cuidado se
            queda con cada cliente, sea cual sea su caso.
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

      {/* ════════ FINAL CTA ════════ */}
      <section className="py-24 sm:py-36">
        <div className="container mx-auto px-5 sm:px-8 text-center">
          <h2 className="font-display font-light text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.02] text-[#f5f1ea] mb-10">
            <span className="reveal-line line-mask"><span className="inline-block">Tu transformación <em className="italic text-[var(--cream)]">te espera.</em></span></span>
          </h2>

          <div className="flex flex-col items-center gap-6">
            <a
              href={BOOKSY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[var(--cream)] text-black px-12 py-5 text-sm font-medium tracking-[0.2em] uppercase transition-[transform,box-shadow] duration-200 hover:shadow-[0_12px_50px_rgba(242,230,216,0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Agendar mi primera sesión
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/35">
              Disponibilidad limitada &mdash; Solo con cita previa &mdash; Hatillo, PR
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
