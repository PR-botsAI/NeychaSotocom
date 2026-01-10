import Hero from "@/components/hero";
import NailConditionMatcher from "@/components/nail-condition-matcher";
import TestimonialCard from "@/components/testimonial-card";
import ShopPromotion from "@/components/shop-promotion";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Calendar, ArrowUp, Sparkles, Heart, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { GlassmorphismCard } from "@/components/glassmorphism-card";
import { MagneticButton } from "@/components/magnetic-button";
import { ParallaxElement } from "@/components/parallax-element";
import { AnimatedCounter } from "@/components/animated-counter";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleBookingClick = () => {
    window.open("https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo", "_blank");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="space-y-24 pb-24 bg-black text-white">
      <Hero />

      <FadeIn delay={0.1}>
        <section className="px-4">
          <div className="container mx-auto">
            <NailConditionMatcher />
          </div>
        </section>
      </FadeIn>

      <section className="px-4">
        <div className="container mx-auto">
          <FadeIn>
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl mb-12">
              Nuestros Servicios
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.15}>
            <StaggerItem>
              <GlassmorphismCard className="p-8 space-y-6 h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2E6D8]/5 rounded-full blur-3xl group-hover:bg-[#F2E6D8]/10 transition-all"></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#F2E6D8]/10 rounded-lg">
                      <Sparkles className="w-6 h-6 text-[#F2E6D8]" />
                    </div>
                    <span className="text-xs font-semibold text-[#F2E6D8] bg-[#F2E6D8]/10 px-3 py-1 rounded-full">IBX® Certificado</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-[#F2E6D8]/80">Restauración Profesional</p>
                    <h3 className="text-2xl font-bold text-white">Onicoplastia</h3>
                    <p className="text-base font-medium text-gray-300">Recupera la confianza en tus uñas</p>
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Sistema avanzado IBX® para restaurar uñas afectadas por hongos, trauma o condiciones médicas. Resultados visibles desde la primera sesión.
                  </p>

                  <div className="mt-6 pt-6 border-t border-zinc-800 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F2E6D8] mt-2"></div>
                      <p className="text-sm text-gray-300">Tratamiento indoloro y no invasivo</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F2E6D8] mt-2"></div>
                      <p className="text-sm text-gray-300">Compatible con decoraciones (acrílico/gel)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F2E6D8] mt-2"></div>
                      <p className="text-sm text-gray-300">Incluye GEL Polish profesional</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-[#F2E6D8]/5 rounded-lg border border-[#F2E6D8]/20">
                    <p className="text-xs text-[#F2E6D8] font-medium">⚡ Evaluación personalizada requerida</p>
                  </div>
                </div>

                <MagneticButton className="w-full">
                  <Button 
                    className="w-full mt-6 bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                    onClick={handleBookingClick}
                  >
                    ¡AGENDA TU EVALUACIÓN!
                  </Button>
                </MagneticButton>
              </GlassmorphismCard>
            </StaggerItem>

            <StaggerItem>
              <GlassmorphismCard className="p-8 space-y-6 h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2E6D8]/5 rounded-full blur-3xl group-hover:bg-[#F2E6D8]/10 transition-all"></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#F2E6D8]/10 rounded-lg">
                      <Heart className="w-6 h-6 text-[#F2E6D8]" />
                    </div>
                    <span className="text-xs font-semibold text-[#F2E6D8] bg-[#F2E6D8]/10 px-3 py-1 rounded-full">⭐ 5.0/5</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-[#F2E6D8]/80">Ritual de Cuidado</p>
                    <h3 className="text-2xl font-bold text-white">Manicura</h3>
                    <p className="text-base font-medium text-gray-300">Más que belleza, es bienestar</p>
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Experiencia profesional que combina técnicas exclusivas, productos premium libres de tóxicos y acabados duraderos que realzan tu estilo personal.
                  </p>

                  <div className="mt-6 pt-6 border-t border-zinc-800 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F2E6D8] mt-2"></div>
                      <p className="text-sm text-gray-300">Técnicas exclusivas de embellecimiento</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F2E6D8] mt-2"></div>
                      <p className="text-sm text-gray-300">Nivelación perfecta y limpieza profunda</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F2E6D8] mt-2"></div>
                      <p className="text-sm text-gray-300">Acabado impecable que perdura</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-[#F2E6D8]/5 rounded-lg border border-[#F2E6D8]/20">
                    <p className="text-xs text-[#F2E6D8] font-medium">💅 Ambiente relajante y profesional</p>
                  </div>
                </div>

                <MagneticButton className="w-full">
                  <Button 
                    className="w-full mt-6 bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                    onClick={handleBookingClick}
                  >
                    ¡RESERVA AHORA!
                  </Button>
                </MagneticButton>
              </GlassmorphismCard>
            </StaggerItem>

            <StaggerItem>
              <GlassmorphismCard className="p-8 space-y-6 h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2E6D8]/5 rounded-full blur-3xl group-hover:bg-[#F2E6D8]/10 transition-all"></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#F2E6D8]/10 rounded-lg">
                      <Award className="w-6 h-6 text-[#F2E6D8]" />
                    </div>
                    <span className="text-xs font-semibold text-[#F2E6D8] bg-[#F2E6D8]/10 px-3 py-1 rounded-full">Spa Premium</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium text-[#F2E6D8]/80">Experiencia Spa</p>
                    <h3 className="text-2xl font-bold text-white">Belleza para Pies</h3>
                    <p className="text-base font-medium text-gray-300">Relájate mientras te embelleces</p>
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Tratamiento integral que combina pedicura profesional con terapia spa. Hidratación profunda, masaje relajante y acabado impecable de larga duración.
                  </p>

                  <div className="mt-6 pt-6 border-t border-zinc-800 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F2E6D8] mt-2"></div>
                      <p className="text-sm text-gray-300">Spa completo con masaje incluido</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F2E6D8] mt-2"></div>
                      <p className="text-sm text-gray-300">Hidratación y rejuvenecimiento</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F2E6D8] mt-2"></div>
                      <p className="text-sm text-gray-300">GEL Polish de larga duración</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-[#F2E6D8]/5 rounded-lg border border-[#F2E6D8]/20">
                    <p className="text-xs text-[#F2E6D8] font-medium">✨ Resultados que perduran semanas</p>
                  </div>
                </div>

                <MagneticButton className="w-full">
                  <Button 
                    className="w-full mt-6 bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                    onClick={handleBookingClick}
                  >
                    ¡RESERVA AHORA!
                  </Button>
                </MagneticButton>
              </GlassmorphismCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <FadeIn delay={0.1}>
        <ShopPromotion />
      </FadeIn>

      <section className="px-4">
        <div className="container mx-auto">
          <FadeIn>
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Lo Que Dicen Nuestras Bellezas
            </h2>
            <p className="mt-4 text-center text-lg text-gray-300">
              ¡Calificación Perfecta 5.0/5 con <AnimatedCounter value={40} suffix="+" className="font-bold text-[#F2E6D8]" /> Reseñas Verificadas en Booksy!
            </p>
          </FadeIn>
          
          <StaggerContainer className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.12}>
            <StaggerItem>
              <TestimonialCard
                name="Betty V."
                rating={5}
                comment="Excelente vibra desde que entras al spa y su servicio inigualable … altamente recomendada !!!"
                service="Gel Manos"
                date="Febrero 2025"
              />
            </StaggerItem>
            <StaggerItem>
              <TestimonialCard
                name="Lourdes R."
                rating={5}
                comment="Ella es amorosa no importa la clienta, te complace en lo que pides, que más puedo pedir, hasta café ☕️ te dan, es profesional en su trabajo"
                service="Esmaltado en Pies"
                date="Diciembre 2024"
              />
            </StaggerItem>
            <StaggerItem>
              <TestimonialCard
                name="Tana L."
                rating={5}
                comment="Un trabajo sin duda alguna de alta calidad y un trato excelente..💫"
                service="Gel Tips"
                date="Marzo 2024"
              />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <FadeIn>
        <section className="px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="relative rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-12 sm:p-16 text-center border border-zinc-800 overflow-hidden"
                whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
              >
                <motion.div 
                  className="absolute top-0 left-0 w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute bottom-0 right-0 w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
                  animate={{ 
                    scale: [1.1, 1, 1.1],
                    opacity: [0.8, 0.5, 0.8]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <div className="relative space-y-6">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-12 h-12 text-[#F2E6D8] mx-auto mb-4" />
                  </motion.div>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    <span className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent">
                      ¿Lista Para Transformar Tus Uñas?
                    </span>
                  </h2>
                  
                  <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    ¡No esperes más! Reserva tu cita ahora y déjanos crear la belleza que mereces
                  </p>
                  
                  <div className="pt-4">
                    <MagneticButton>
                      <Button
                        className="bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] px-10 py-6 text-lg font-bold shadow-2xl hover:shadow-[#F2E6D8]/30 transition-all hover:scale-105"
                        onClick={handleBookingClick}
                      >
                        <Calendar className="w-5 h-5 mr-2" />
                        ¡RESERVA TU CITA AHORA!
                      </Button>
                    </MagneticButton>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400 pt-4">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Disponible vía Booksy • Respuesta Inmediata
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </FadeIn>

      <AnimatePresence>
        <motion.div 
          className="fixed bottom-4 right-4 z-40 flex flex-col gap-3"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => window.open('https://shop.neychasoto.com', '_blank')}
              className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-4 py-3 shadow-2xl transition-all"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <span className="text-sm font-medium">Tienda</span>
              </div>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleBookingClick}
              className="group relative bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-full px-4 py-3 shadow-2xl transition-all"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-sm font-medium">Cita</span>
              </div>
            </Button>
          </motion.div>
          
          <AnimatePresence>
            {showScrollTop && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={scrollToTop}
                  className="group relative bg-gradient-to-r from-zinc-600 to-zinc-700 hover:from-zinc-700 hover:to-zinc-800 text-white rounded-full px-4 py-3 shadow-2xl transition-all"
                >
                  <div className="flex items-center gap-2">
                    <ArrowUp className="h-5 w-5" />
                    <span className="text-sm font-medium">Arriba</span>
                  </div>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
