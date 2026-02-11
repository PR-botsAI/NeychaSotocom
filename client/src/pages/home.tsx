import Hero from "@/components/hero";
import TestimonialCard from "@/components/testimonial-card";
import MeetTheArtist from "@/components/meet-the-artist";
import { TransformationGallery } from "@/components/transformation-gallery";
import { Button } from "@/components/ui/button";
import { Calendar, Sparkles, Heart, Award, MessageSquare, CheckCircle, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { WhatsAppDialog } from "@/components/whatsapp-dialog";
import { cases } from "@/data/cases";
import { FadeIn, StaggerContainer, StaggerItem, TextReveal } from "@/components/motion-wrapper";
import { GlassmorphismCard } from "@/components/glassmorphism-card";
import { MagneticButton } from "@/components/magnetic-button";
import { AnimatedCounter } from "@/components/animated-counter";
import { Link } from "wouter";

export default function Home() {
  const handleBookingClick = () => {
    window.open("https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo", "_blank");
  };

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* 1. HERO - Emotional headline + Trust bar */}
      <Hero />

      {/* 2. TRANSFORMATIONS - Visual proof immediately after hook */}
      <div className="section-divider mx-auto max-w-xl" />
      <section className="px-4 py-20 sm:py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(242,230,216,0.02)_0%,transparent_60%)]" />
        <div className="container mx-auto relative">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <TextReveal text="Transformaciones que Hablan por Sí Solas" className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent" />
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <TransformationGallery cases={cases.filter(c => c.category === "onicoplastia").slice(0, 2)} />
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-8 text-center">
              <Link href="/onicoplastia">
                <span className="inline-flex items-center gap-2 text-sm text-[#F2E6D8]/70 hover:text-[#F2E6D8] transition-colors cursor-pointer animated-underline">
                  Ver todas las transformaciones <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. SERVICES - Benefit-focused with pricing */}
      <div className="section-divider mx-auto max-w-xl" />
      <section className="px-4 py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(242,230,216,0.03)_0%,transparent_70%)]" />

        <div className="container mx-auto relative">
          <FadeIn>
            <div className="text-center mb-16">
              <motion.p
                className="text-sm font-medium text-[#F2E6D8]/60 tracking-widest uppercase mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Experiencia Premium
              </motion.p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <TextReveal text="Nuestros Servicios" className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent" />
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.15}>
            {/* Onicoplastia - HIGH TICKET hero card with visual proof */}
            <StaggerItem>
              <Link href="/onicoplastia">
                <motion.div
                  className="relative h-full cursor-pointer group"
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 25 } }}
                >
                  {/* Animated glow border */}
                  <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#F2E6D8]/60 via-[#F2E6D8]/20 to-[#F2E6D8]/60 opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
                  <motion.div
                    className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-[#F2E6D8]/0 via-[#F2E6D8]/30 to-[#F2E6D8]/0 blur-md"
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: "200% 200%" }}
                  />

                  <div className="relative rounded-xl bg-zinc-950 overflow-hidden h-full">
                    {/* Before/After thumbnail — Case 5, different from gallery above */}
                    <div className="relative h-52 overflow-hidden">
                      <div className="absolute inset-0 grid grid-cols-2">
                        <div className="relative overflow-hidden">
                          <img src="/cases/Caso5_before.png" alt="Antes" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                          <span className="absolute bottom-2 left-2 text-[10px] font-bold uppercase bg-red-600/90 text-white px-2.5 py-1 rounded">Antes</span>
                        </div>
                        <div className="relative overflow-hidden">
                          <img src="/cases/Caso5_after.png" alt="Después" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                          <span className="absolute bottom-2 right-2 text-[10px] font-bold uppercase bg-[#F2E6D8] text-black px-2.5 py-1 rounded">Después</span>
                        </div>
                      </div>
                      {/* Center divider */}
                      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#F2E6D8] z-10 shadow-[0_0_12px_rgba(242,230,216,0.4)]" />
                    </div>

                    <div className="relative p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">Onicoplastia</h3>
                        <span className="text-[10px] font-bold text-black bg-[#F2E6D8] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          Servicio Estrella
                        </span>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed">
                        ¿Escondes tus pies o manos? Reconstrucción estética profesional con IBX® — vuelve a vivir sin limitaciones.
                      </p>

                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-[#F2E6D8]">$120</span>
                        <span className="text-xs text-gray-500">evaluación completa &bull; hasta 2 hrs</span>
                      </div>

                      {/* What's included */}
                      <div className="pt-3 border-t border-zinc-800 space-y-2">
                        {["Sin dolor &bull; Apariencia perfecta al salir", "Tratamiento IBX® + GEL Polish incluido", "Manos o pies &bull; Seguimiento desde $80"].map((text, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-[#F2E6D8] mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-gray-300" dangerouslySetInnerHTML={{ __html: text }} />
                          </div>
                        ))}
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#F2E6D8] text-[#F2E6D8]" />
                        ))}
                        <span className="text-[10px] text-gray-500 ml-1">40+ reseñas verificadas</span>
                      </div>

                      {/* CTA */}
                      <Button
                        className="w-full bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] font-semibold shadow-lg hover:shadow-xl hover:shadow-[#F2E6D8]/20 transition-all duration-300 hover:scale-[1.02]"
                      >
                        VER TRANSFORMACIONES <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>

            {/* Manicura */}
            <StaggerItem>
              <GlassmorphismCard className="p-8 space-y-6 h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2E6D8]/5 rounded-full blur-3xl group-hover:bg-[#F2E6D8]/10 transition-all duration-700" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#F2E6D8]/10 rounded-lg group-hover:bg-[#F2E6D8]/15 transition-colors duration-500">
                      <Heart className="w-6 h-6 text-[#F2E6D8]" />
                    </div>
                    <span className="text-xs font-semibold text-[#F2E6D8] bg-[#F2E6D8]/10 px-3 py-1 rounded-full">5.0/5</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-[#F2E6D8]/80">Ritual de Cuidado</p>
                    <h3 className="text-2xl font-bold text-white">Manicura Premium</h3>
                    <p className="text-base font-medium text-gray-300">Uñas que duran semanas, no días</p>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Técnicas exclusivas con productos libres de tóxicos. Acabado profesional que realza tu estilo personal y perdura.
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#F2E6D8]">Desde $35</span>
                    <span className="text-xs text-gray-500">según largo de uñas</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-zinc-800 space-y-2">
                    {["Nivelación perfecta + limpieza profunda", "Esmaltado en gel de larga duración", "Ambiente relajante y privado"].map((text, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#F2E6D8] mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-gray-300">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <MagneticButton className="w-full">
                  <Button
                    className="w-full mt-4 bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] font-semibold shadow-lg hover:shadow-xl hover:shadow-[#F2E6D8]/20 transition-all duration-300 hover:scale-[1.02]"
                    onClick={handleBookingClick}
                  >
                    AGENDA TU CITA
                  </Button>
                </MagneticButton>
              </GlassmorphismCard>
            </StaggerItem>

            {/* Pedicura Spa */}
            <StaggerItem>
              <GlassmorphismCard className="p-8 space-y-6 h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2E6D8]/5 rounded-full blur-3xl group-hover:bg-[#F2E6D8]/10 transition-all duration-700" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#F2E6D8]/10 rounded-lg group-hover:bg-[#F2E6D8]/15 transition-colors duration-500">
                      <Award className="w-6 h-6 text-[#F2E6D8]" />
                    </div>
                    <span className="text-xs font-semibold text-[#F2E6D8] bg-[#F2E6D8]/10 px-3 py-1 rounded-full">Spa Premium</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-[#F2E6D8]/80">Experiencia Spa</p>
                    <h3 className="text-2xl font-bold text-white">Pedicura Spa</h3>
                    <p className="text-base font-medium text-gray-300">Relájate mientras te embelleces</p>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Tratamiento integral con pedicura profesional, hidratación profunda, masaje relajante y acabado impecable de larga duración.
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#F2E6D8]">Desde $60</span>
                    <span className="text-xs text-gray-500">spa completo</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-zinc-800 space-y-2">
                    {["Masaje + hidratación incluidos", "Footlogix especializado disponible", "GEL Polish de larga duración"].map((text, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#F2E6D8] mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-gray-300">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <MagneticButton className="w-full">
                  <Button
                    className="w-full mt-4 bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] font-semibold shadow-lg hover:shadow-xl hover:shadow-[#F2E6D8]/20 transition-all duration-300 hover:scale-[1.02]"
                    onClick={handleBookingClick}
                  >
                    AGENDA TU CITA
                  </Button>
                </MagneticButton>
              </GlassmorphismCard>
            </StaggerItem>
          </StaggerContainer>

          {/* Price comparison anchor */}
          <FadeIn delay={0.3}>
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-500">
                Comparado con tratamiento láser ($699-$2,000), la onicoplastia ofrece resultados visibles inmediatos a una fracción del costo
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. MEET THE ARTIST - Trust + authority after they've seen services */}
      <div className="section-divider mx-auto max-w-xl" />
      <MeetTheArtist />

      {/* 5. TESTIMONIALS */}
      <div className="section-divider mx-auto max-w-xl" />
      <section className="px-4 py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(242,230,216,0.02)_0%,transparent_60%)]" />
        <div className="container mx-auto relative">
          <FadeIn>
            <div className="text-center">
              <motion.p
                className="text-sm font-medium text-[#F2E6D8]/60 tracking-widest uppercase mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Testimonios Reales de Booksy
              </motion.p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <TextReveal text="Lo Que Dicen Nuestros Clientes" className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent" />
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Calificación Perfecta 5.0/5 con <AnimatedCounter value={40} suffix="+" className="font-bold text-[#F2E6D8]" /> Reseñas Verificadas
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.12}>
            <StaggerItem>
              <TestimonialCard
                name="Betty V."
                rating={5}
                comment="Excelente vibra desde que entras al spa y su servicio inigualable ... altamente recomendada !!!"
                service="Gel Manos"
                date="Febrero 2025"
              />
            </StaggerItem>
            <StaggerItem>
              <TestimonialCard
                name="Lourdes R."
                rating={5}
                comment="Ella es amorosa, te complace en lo que pides. Qué más puedo pedir, hasta café te dan. Es profesional en su trabajo"
                service="Esmaltado en Pies"
                date="Diciembre 2024"
              />
            </StaggerItem>
            <StaggerItem>
              <TestimonialCard
                name="Tana L."
                rating={5}
                comment="Un trabajo sin duda alguna de alta calidad y un trato excelente.."
                service="Gel Tips"
                date="Marzo 2024"
              />
            </StaggerItem>
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="mt-8 text-center">
              <a
                href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#F2E6D8]/60 hover:text-[#F2E6D8] transition-colors animated-underline"
              >
                Ver todas las reseñas en Booksy &rarr;
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. FINAL CTA - Urgency driven */}
      <div className="section-divider mx-auto max-w-xl" />
      <FadeIn>
        <section className="px-4 py-24">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="relative rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-12 sm:p-16 text-center border border-zinc-800 overflow-hidden"
                whileHover={{ scale: 1.01, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4], x: [0, 20, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
                  animate={{ scale: [1.1, 1, 1.1], opacity: [0.7, 0.4, 0.7], x: [0, -20, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="relative space-y-6">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-12 h-12 text-[#F2E6D8] mx-auto mb-4" />
                  </motion.div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    <TextReveal
                      text="Listo Para Tu Transformación?"
                      className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent"
                    />
                  </h2>

                  <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    En Puerto Rico, cada día es día de sandalias.
                    No esperes más para sentir confianza con tus uñas.
                  </p>

                  {/* Dual CTA */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <MagneticButton>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <Button
                          className="w-full sm:w-auto bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] px-6 sm:px-10 py-6 text-base sm:text-lg font-bold shadow-2xl hover:shadow-[#F2E6D8]/30 transition-all duration-300 animate-pulse-glow"
                          onClick={handleBookingClick}
                        >
                          <Calendar className="w-5 h-5 mr-2 flex-shrink-0" />
                          AGENDA TU CITA
                        </Button>
                      </motion.div>
                    </MagneticButton>

                    <WhatsAppDialog message="¡Hola! Me gustaría agendar una cita.">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <Button variant="outline" className="text-base px-6 py-6 font-medium border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366] cursor-pointer">
                          <MessageSquare className="w-5 h-5 mr-2" />
                          WhatsApp
                        </Button>
                      </motion.div>
                    </WhatsAppDialog>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400 pt-4">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Estudio privado &bull; Solo con cita previa &bull; Disponibilidad limitada
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Bottom padding for sticky mobile CTA */}
      <div className="h-16 md:hidden" />
    </div>
  );
}
