import { useState } from "react";
import Hero from "@/components/hero";
import NailConditionMatcher from "@/components/nail-condition-matcher";
import TestimonialCard from "@/components/testimonial-card";
import ShopPromotion from "@/components/shop-promotion";
import ShopAssistant from "@/components/shop-assistant";
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles } from "lucide-react";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const handleBookingClick = () => {
    window.open("https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo", "_blank");
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
            <div className="rounded-lg bg-zinc-900/50 p-8 space-y-4 h-full hover:bg-zinc-800/50 transition-colors">
              <h3 className="text-xl font-semibold text-white">Onicoplastia</h3>
              <p className="text-gray-300">
                Tratamiento progresivo profesional que restaura la salud y apariencia de tus uñas afectadas por hongos o daños.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">✓</span>
                  Resultados visibles desde la 1ra sesión
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">✓</span>
                  Procedimiento indoloro y no invasivo
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">✓</span>
                  Compatible con decoraciones (acrílico/gel)
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">⚡</span>
                  Evaluación inicial requerida
                </li>
              </ul>
              <Button 
                className="w-full mt-6 bg-[#F2E6D8] text-black hover:bg-[#E6D0B8]"
                onClick={handleBookingClick}
              >
                ¡AGENDA TU EVALUACIÓN!
              </Button>
            </div>

            {/* Manicura */}
            <div className="rounded-lg bg-zinc-900/50 p-8 space-y-4 h-full hover:bg-zinc-800/50 transition-colors">
              <h3 className="text-xl font-semibold text-white">Manicura</h3>
              <p className="text-gray-300">
                Transforma tus manos en obras de arte con nuestro servicio premium de belleza y cuidado personalizado.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">✓</span>
                  Técnicas exclusivas de embellecimiento
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">✓</span>
                  Productos premium para el cuidado
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">✓</span>
                  Experiencia relajante y renovadora
                </li>
              </ul>
              <Button 
                className="w-full mt-6 bg-[#F2E6D8] text-black hover:bg-[#E6D0B8]"
                onClick={handleBookingClick}
              >
                ¡RESERVA AHORA!
              </Button>
            </div>

            {/* Belleza para Pies */}
            <div className="rounded-lg bg-zinc-900/50 p-8 space-y-4 h-full hover:bg-zinc-800/50 transition-colors">
              <h3 className="text-xl font-semibold text-white">Belleza para Pies</h3>
              <p className="text-gray-300">
                Dale a tus pies el mimo que merecen con nuestro tratamiento integral de belleza y bienestar.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">✓</span>
                  Spa completo para pies
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">✓</span>
                  Masaje relajante incluido
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">✓</span>
                  Cuidado detallado y duradero
                </li>
              </ul>
              <Button 
                className="w-full mt-6 bg-[#F2E6D8] text-black hover:bg-[#E6D0B8]"
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
            ¡Calificación Perfecta 5.0/5 con 29 Reseñas Verificadas en Booksy!
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              name="Bixsa R."
              rating={5}
              comment="La mejor !! muy amable excelente trabajo en uñas de mano y pedicura recomendada!"
              service="Esmaltado en Pies"
              date="Noviembre 2024"
            />
            <TestimonialCard
              name="Wilmarie R."
              rating={5}
              comment="Hermosas Me encantan los diseños y el servicio profesional."
              service="Esmaltado en Manos"
              date="Julio 2024"
            />
            <TestimonialCard
              name="Esther R."
              rating={5}
              comment="Me encanta el trabajo y la atención. ¡El mejor servicio!"
              service="Esmaltado en Pies"
              date="Septiembre 2024"
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

      {/* Floating Chat Assistant Button */}
      {!isChatOpen && (
        <div className="fixed bottom-4 right-4 z-40 animate-bounce-in">
          <Button
            onClick={() => setIsChatOpen(true)}
            className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
            <div className="relative flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="hidden sm:inline text-sm font-medium">Asistente de Compras</span>
              <Sparkles className="h-3 w-3 text-yellow-300 absolute -top-1 -right-1" />
            </div>
          </Button>
        </div>
      )}

      {/* Shop Assistant Chat */}
      <ShopAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}