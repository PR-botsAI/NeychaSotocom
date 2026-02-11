import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, TextReveal } from "@/components/motion-wrapper";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/magnetic-button";
import { AnimatedCounter } from "@/components/animated-counter";
import { TransformationGallery } from "@/components/transformation-gallery";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar, CheckCircle, Star, Sparkles, MessageCircle } from "lucide-react";
import { cases } from "@/data/cases";

const BOOKSY_URL = "https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo";

export default function Onicoplastia() {
  const onicoplastiaCases = cases.filter(c => c.category === "onicoplastia");

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ═══════════════════════════════════════════════
          HERO — Full-bleed before/after with headline overlay
          The image IS the hero. No fluff.
      ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Split before/after hero image */}
        <div className="relative w-full h-[70vh] sm:h-[80vh] max-h-[700px]">
          <div className="absolute inset-0 grid grid-cols-2">
            <div className="relative overflow-hidden">
              <img
                src="/cases/Caso2_before.png"
                alt="Antes del tratamiento"
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              <motion.span
                className="absolute top-6 left-6 text-sm font-bold uppercase bg-red-600/90 text-white px-4 py-2 rounded-lg tracking-wider"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Antes
              </motion.span>
            </div>
            <div className="relative overflow-hidden">
              <img
                src="/cases/Caso2_after.png"
                alt="Después del tratamiento"
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
              <motion.span
                className="absolute top-6 right-6 text-sm font-bold uppercase bg-[#F2E6D8] text-black px-4 py-2 rounded-lg tracking-wider"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Después
              </motion.span>
            </div>
          </div>

          {/* Center divider */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-[#F2E6D8] z-10 shadow-[0_0_20px_rgba(242,230,216,0.5)]" />

          {/* Bottom gradient overlay for text */}
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

          {/* Headline overlay at bottom */}
          <div className="absolute bottom-0 inset-x-0 z-20 px-4 pb-8 sm:pb-12">
            <div className="container mx-auto max-w-4xl text-center">
              <motion.h1
                className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="bg-gradient-to-r from-white via-[#F2E6D8] to-white bg-clip-text text-transparent">
                  Deja de Esconder Tus Uñas.
                </span>
              </motion.h1>
              <motion.p
                className="text-lg sm:text-xl text-gray-300 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Playa, sandalias, pies descalzos — vuelve a vivir sin limitaciones
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <MagneticButton>
                  <Button
                    size="lg"
                    className="bg-[#F2E6D8] hover:bg-[#E6D0B8] text-black font-bold text-base sm:text-lg px-8 sm:px-12 py-6 shadow-2xl hover:shadow-[#F2E6D8]/30 transition-all hover:scale-105 animate-pulse-glow"
                    asChild
                  >
                    <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      <Calendar className="w-5 h-5 flex-shrink-0" />
                      RESERVAR EVALUACIÓN — $120
                    </a>
                  </Button>
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SOCIAL PROOF COUNTER BAR — Big bold numbers
      ═══════════════════════════════════════════════ */}
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="container mx-auto px-4 py-10">
          <FadeIn>
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-[#F2E6D8]">
                  <AnimatedCounter value={40} suffix="+" />
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-2 uppercase tracking-wider">Reseñas 5 Estrellas</p>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-[#F2E6D8]">5.0</div>
                <p className="text-xs sm:text-sm text-gray-500 mt-2 uppercase tracking-wider">Calificación Booksy</p>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-[#F2E6D8]">0</div>
                <p className="text-xs sm:text-sm text-gray-500 mt-2 uppercase tracking-wider">Dolor</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TRANSFORMATION WALL — All cases, full gallery
          This IS the page. Let the work speak.
      ═══════════════════════════════════════════════ */}
      <section className="px-4 py-16 sm:py-20">
        <div className="container mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold">
                <TextReveal
                  text="Cada Caso, Una Transformación"
                  className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent"
                />
              </h2>
              <p className="text-gray-500 mt-3 text-sm">
                Desliza para comparar antes y después
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <TransformationGallery cases={onicoplastiaCases} />
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-12 text-center">
              <MagneticButton>
                <Button
                  size="lg"
                  className="bg-[#F2E6D8] hover:bg-[#E6D0B8] text-black font-bold text-base px-8 py-6 shadow-2xl hover:shadow-[#F2E6D8]/30 transition-all hover:scale-105"
                  asChild
                >
                  <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5 flex-shrink-0" />
                    QUIERO MI TRANSFORMACIÓN
                  </a>
                </Button>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          HOW IT WORKS — 3 steps, quick and clean
      ═══════════════════════════════════════════════ */}
      <section className="px-4 py-16 sm:py-20 bg-zinc-950/50 border-y border-zinc-800/50">
        <div className="container mx-auto max-w-5xl">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-14">
              <TextReveal
                text="Así de Simple"
                className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent"
              />
            </h2>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Evaluación", time: "15 min", desc: "Evaluamos tu caso y creamos un plan personalizado." },
              { step: "2", title: "Tratamiento IBX®", time: "45 min", desc: "Fortalecemos y sellamos la uña desde adentro." },
              { step: "3", title: "Resultado Perfecto", time: "30 min", desc: "Sales con uñas perfectas y GEL Polish incluido." },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="text-center">
                  <div className="bg-zinc-900/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-5 border border-zinc-800">
                    <span className="text-xl font-bold text-[#F2E6D8]">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-[#F2E6D8]/60 mb-3">~{item.time}</p>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          OFFER STACK — What's included + price anchor
      ═══════════════════════════════════════════════ */}
      <section className="px-4 py-16 sm:py-20">
        <div className="container mx-auto max-w-2xl">
          <FadeIn>
            <div className="rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 p-8 sm:p-10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#F2E6D8]/5 rounded-full blur-3xl" />

              <div className="relative">
                <h3 className="text-2xl font-bold text-center mb-8">
                  <span className="text-[#F2E6D8]">Tu Evaluación</span> Incluye
                </h3>

                <div className="space-y-3 mb-8">
                  {[
                    "Evaluación personalizada completa",
                    "Tratamiento IBX® certificado",
                    "Reconstrucción con prótesis especializada",
                    "GEL Polish profesional incluido",
                    "Plan de seguimiento personalizado",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.08 * i, duration: 0.4 }}
                    >
                      <CheckCircle className="w-5 h-5 text-[#F2E6D8] flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center pt-6 border-t border-zinc-800">
                  <div className="flex items-baseline justify-center gap-2 mb-1">
                    <span className="text-5xl font-bold text-[#F2E6D8]">$120</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Evaluación completa &bull; Hasta 2 hrs</p>
                  <p className="text-xs text-gray-500 mt-1">Seguimientos: <span className="text-[#F2E6D8] font-medium">$80</span></p>
                  <p className="text-xs text-gray-600 mt-3">Aplica para manos o pies &bull; Mismo precio</p>

                  <p className="text-xs text-gray-600 mt-4 italic">
                    vs. tratamiento láser: $699–$2,000
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TESTIMONIALS — Onicoplastia-specific reviews
      ═══════════════════════════════════════════════ */}
      <section className="px-4 py-16 sm:py-20">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2">
                <TextReveal
                  text="Lo Que Dicen Nuestros Clientes"
                  className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent"
                />
              </h2>
              <div className="flex items-center justify-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F2E6D8] text-[#F2E6D8]" />
                ))}
                <span className="text-sm text-gray-400 ml-2"><AnimatedCounter value={40} suffix="+" /> reseñas verificadas</span>
              </div>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Llevaba años escondiendo mis pies. Neycha me devolvió la confianza — ahora voy a la playa, uso sandalias, vivo sin pensar en eso.",
                name: "María G.",
                service: "Onicoplastia",
              },
              {
                quote: "El tratamiento IBX hizo una diferencia increíble. Mis uñas estaban dañadas por años de gel y ahora están más fuertes que nunca. Neycha es una profesional.",
                name: "Carmen L.",
                service: "Restauración IBX®",
              },
              {
                quote: "Después del trauma en mi uña pensé que nunca volvería a verse normal. Una visita con Neycha y no podía creer el resultado. Vale cada centavo.",
                name: "Ana P.",
                service: "Onicoplastia por Trauma",
              },
            ].map((t, i) => (
              <StaggerItem key={i}>
                <div className="bg-zinc-900/30 p-6 rounded-xl border border-zinc-800 h-full flex flex-col">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-[#F2E6D8] text-[#F2E6D8]" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic text-sm leading-relaxed flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-4 pt-3 border-t border-zinc-800/50">
                    <span className="text-[#F2E6D8] font-medium">{t.name}</span>
                    <span>&bull;</span>
                    <span>{t.service}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FAQ — Quick objection handling
      ═══════════════════════════════════════════════ */}
      <section className="px-4 py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#F2E6D8]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[#F2E6D8]/5 rounded-full blur-3xl" />

        <div className="container mx-auto max-w-3xl relative">
          <FadeIn>
            <div className="text-center mb-10">
              <MessageCircle className="w-10 h-10 text-[#F2E6D8] mx-auto mb-4" />
              <h2 className="text-3xl font-bold">
                <TextReveal
                  text="Preguntas Frecuentes"
                  className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent"
                />
              </h2>
            </div>
          </FadeIn>

          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: "¿Qué es la onicoplastia?", a: "Tratamiento profesional de restauración de uñas afectadas por hongos, trauma u otras condiciones. Utilizamos tecnología IBX® para reconstruir la uña desde adentro." },
              { q: "¿Es doloroso?", a: "No. Es completamente indoloro — tan suave como un manicure regular." },
              { q: "¿Cuánto tiempo dura?", a: "Hasta 2 horas. Incluye evaluación, tratamiento IBX®, prótesis y GEL Polish. Sales perfecta el mismo día." },
              { q: "¿Cuál es la inversión?", a: "Primera evaluación: $120 (incluye todo, aplica para manos o pies). Seguimientos: $80. Comparado con láser ($699–$2,000), es una fracción del costo con resultados inmediatos." },
              { q: "¿Qué hace especial este tratamiento?", a: "Combinamos IBX® con reconstrucción profesional. No solo uñas hermosas — uñas saludables. Evaluación personalizada y seguimiento continuo incluido." },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="group relative rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-[#F2E6D8]/30 transition-all duration-300 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-[#F2E6D8] py-5 relative text-sm sm:text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 leading-relaxed pb-5 relative text-sm">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FINAL CTA — One button. One action.
      ═══════════════════════════════════════════════ */}
      <section className="px-4 py-20 sm:py-24">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <div className="relative rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-12 sm:p-16 text-center border border-zinc-800 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
                animate={{ scale: [1.15, 1, 1.15], opacity: [0.5, 0.3, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative space-y-6">
                <Sparkles className="w-10 h-10 text-[#F2E6D8] mx-auto" />

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  <TextReveal
                    text="Tu Transformación Te Espera"
                    className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent"
                  />
                </h2>

                <MagneticButton>
                  <Button
                    size="lg"
                    className="bg-[#F2E6D8] hover:bg-[#E6D0B8] text-black font-bold text-base sm:text-lg px-8 sm:px-12 py-6 shadow-2xl hover:shadow-[#F2E6D8]/30 transition-all hover:scale-105 animate-pulse-glow"
                    asChild
                  >
                    <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      <Calendar className="w-5 h-5 flex-shrink-0" />
                      RESERVAR EVALUACIÓN
                    </a>
                  </Button>
                </MagneticButton>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Disponibilidad limitada &bull; Solo con cita previa &bull; Hatillo, PR
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="h-16 md:hidden" />
    </div>
  );
}
