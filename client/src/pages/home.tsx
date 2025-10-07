import Hero from "@/components/hero";
import NailConditionMatcher from "@/components/nail-condition-matcher";
import TestimonialCard from "@/components/testimonial-card";
import ShopPromotion from "@/components/shop-promotion";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Calendar, ArrowUp, Sparkles, Heart, Award } from "lucide-react";
import { useState, useEffect } from "react";

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

      {/* Interactive Nail Condition Matcher */}
      <section className="px-4">
        <div className="container mx-auto">
          <NailConditionMatcher />
        </div>
      </section>

      {/* Featured Services */}
      <section className="px-4">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl mb-12">
            Nuestros Servicios
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Onicoplastia */}
            <div className="group relative rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 space-y-6 h-full hover:from-zinc-800 hover:to-zinc-900 transition-all duration-300 border border-zinc-800 hover:border-[#F2E6D8]/30">
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

              <Button 
                className="w-full mt-6 bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={handleBookingClick}
              >
                ¡AGENDA TU EVALUACIÓN!
              </Button>
            </div>

            {/* Manicura */}
            <div className="group relative rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 space-y-6 h-full hover:from-zinc-800 hover:to-zinc-900 transition-all duration-300 border border-zinc-800 hover:border-[#F2E6D8]/30">
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

              <Button 
                className="w-full mt-6 bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={handleBookingClick}
              >
                ¡RESERVA AHORA!
              </Button>
            </div>

            {/* Belleza para Pies */}
            <div className="group relative rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 space-y-6 h-full hover:from-zinc-800 hover:to-zinc-900 transition-all duration-300 border border-zinc-800 hover:border-[#F2E6D8]/30">
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

              <Button 
                className="w-full mt-6 bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={handleBookingClick}
              >
                ¡RESERVA AHORA!
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Promotion Section */}
      <ShopPromotion />

      {/* Testimonials Section */}
      <section className="px-4">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Lo Que Dicen Nuestras Bellezas
          </h2>
          <p className="mt-4 text-center text-lg text-gray-300">
            ¡Calificación Perfecta 5.0/5 con 37 Reseñas Verificadas en Booksy!
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              name="Betty V."
              rating={5}
              comment="Excelente vibra desde que entras al spa y su servicio inigualable … altamente recomendada !!!"
              service="Gel Manos"
              date="Febrero 2025"
            />
            <TestimonialCard
              name="Lourdes R."
              rating={5}
              comment="Ella es amorosa no importa la clienta, te complace en lo que pides, que más puedo pedir, hasta café ☕️ te dan, es profesional en su trabajo"
              service="Esmaltado en Pies"
              date="Diciembre 2024"
            />
            <TestimonialCard
              name="Tana L."
              rating={5}
              comment="Un trabajo sin duda alguna de alta calidad y un trato excelente..💫"
              service="Gel Tips"
              date="Marzo 2024"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            ¿Lista Para Transformar Tus Uñas?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            ¡No esperes más! Reserva tu cita ahora y déjanos crear la belleza que mereces
          </p>
          <Button
            className="mt-8 bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] px-6 py-3 text-lg font-semibold"
            onClick={handleBookingClick}
          >
            ¡RESERVA TU CITA AHORA!
          </Button>
        </div>
      </section>

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3">
        {/* Shop Button */}
        <Button
          onClick={() => window.open('https://shop.neychasoto.com', '_blank')}
          className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-4 py-3 shadow-2xl transition-all hover:scale-110"
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <span className="text-sm font-medium">Tienda</span>
          </div>
        </Button>
        
        {/* Book Appointment Button */}
        <Button
          onClick={handleBookingClick}
          className="group relative bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-full px-4 py-3 shadow-2xl transition-all hover:scale-110"
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span className="text-sm font-medium">Cita</span>
          </div>
        </Button>
        
        {/* Scroll to Top Button - Only show when scrolled */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className="group relative bg-gradient-to-r from-zinc-600 to-zinc-700 hover:from-zinc-700 hover:to-zinc-800 text-white rounded-full px-4 py-3 shadow-2xl transition-all hover:scale-110 animate-in slide-in-from-bottom-5 duration-300"
          >
            <div className="flex items-center gap-2">
              <ArrowUp className="h-5 w-5" />
              <span className="text-sm font-medium">Arriba</span>
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}