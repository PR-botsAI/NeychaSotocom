import Hero from "@/components/hero";
import ServiceCard from "@/components/service-card";
import TestimonialCard from "@/components/testimonial-card";
import { useQuery } from "@tanstack/react-query";
import type { Service } from "@db/schema";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  return (
    <div className="space-y-24 pb-24 bg-black text-white">
      <Hero />

      {/* Onicoplastia Professional Section */}
      <section className="container">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Onicoplastia Profesional
        </h2>
        <p className="mt-4 text-center text-lg text-gray-300">
          Restaura la Salud y Belleza Natural de tus Uñas
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <img
              src="https://neychasoto.com/images/gallery/Onicosplatia%20images/Onicosplatia_cases_0000%20(7).png"
              alt="Tratamiento de Onicoplastia"
              className="rounded-lg shadow-xl"
            />
            <p className="text-center text-sm text-gray-300">
              Resultados reales de nuestro tratamiento profesional
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <p className="flex items-center text-lg">
                <span className="mr-2 text-primary">✓</span>
                ¿Quieres lucir sandalias con confianza? ¡Nosotros te ayudamos!
              </p>
              <p className="flex items-center text-lg">
                <span className="mr-2 text-primary">✓</span>
                ¿Problemas con hongos? ¡Tenemos la solución definitiva!
              </p>
              <p className="flex items-center text-lg">
                <span className="mr-2 text-primary">✓</span>
                ¡Resultados visibles desde la primera visita!
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-primary px-6 py-3 text-lg font-semibold text-black shadow-sm hover:opacity-90"
              >
                ¡RESERVA YA!
              </a>
              <Button variant="outline" size="lg" className="text-lg">
                Ver Detalles
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Nuestros Servicios
        </h2>
        <p className="mt-4 text-center text-lg text-gray-300">
          Experiencia Premium en el Cuidado de tus Uñas
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container">
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
      </section>

      {/* CTA Section */}
      <section className="container text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          ¿Lista Para Transformar Tus Uñas?
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          ¡No esperes más! Reserva tu cita ahora y déjanos crear la belleza que mereces
        </p>
        <a
          href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
          className="mt-8 inline-block rounded-md bg-primary px-6 py-3 text-lg font-semibold text-black shadow-sm hover:opacity-90"
          target="_blank"
          rel="noopener noreferrer"
        >
          ¡RESERVA TU CITA AHORA!
        </a>
      </section>
    </div>
  );
}