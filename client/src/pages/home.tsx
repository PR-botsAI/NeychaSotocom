import Hero from "@/components/hero";
import NailConditionMatcher from "@/components/nail-condition-matcher";
import TestimonialCard from "@/components/testimonial-card";
import ShopPromotion from "@/components/shop-promotion";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Calendar, ArrowUp } from "lucide-react";
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
            <div className="rounded-lg bg-zinc-900/50 p-8 space-y-4 h-full hover:bg-zinc-800/50 transition-colors">
              <h3 className="text-xl font-semibold text-white">Onicoplastia</h3>
              <p className="text-gray-300">
                Tratamiento especializado para la restauración completa de uñas afectadas por hongos, trauma o condiciones médicas. Utilizamos el sistema IBX® certificado para fortalecer y reconstruir la estructura natural de tus uñas.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">✓</span>
                  Resultados visibles desde la primera sesión
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">✓</span>
                  Tratamiento indoloro y no invasivo
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">✓</span>
                  Compatible con decoraciones (acrílico/gel)
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">✓</span>
                  Incluye GEL Polish profesional
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">⚡</span>
                  Evaluación personalizada requerida
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
                Más que un servicio estético, es un ritual de cuidado profesional. Nuestras manicuras incluyen nivelación perfecta, limpieza profunda de cutículas y técnicas avanzadas que garantizan resultados duraderos y saludables para tus uñas.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">✓</span>
                  Técnicas exclusivas de embellecimiento
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">✓</span>
                  Productos premium libres de tóxicos
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">✓</span>
                  Duración superior con cuidado adecuado
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
                Cuidado integral para pies saludables y hermosos. Combinamos técnicas profesionales de pedicura con tratamientos spa que rejuvenecen, hidratan y embellecen, garantizando comodidad y resultados que duran.
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
                <li className="flex items-center text-gray-300">
                  <span className="mr-2">✓</span>
                  GEL Polish de larga duración
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