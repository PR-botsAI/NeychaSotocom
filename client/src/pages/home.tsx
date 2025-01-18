import Hero from "@/components/hero";
import NailConditionMatcher from "@/components/nail-condition-matcher";
import TestimonialCard from "@/components/testimonial-card";

export default function Home() {
  return (
    <div className="space-y-24 pb-24 bg-black text-white">
      <Hero />

      {/* Interactive Nail Condition Matcher */}
      <section className="container py-12">
        <NailConditionMatcher />
      </section>

      {/* Services Section */}
      <section className="container">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl mb-12">
          Nuestros Servicios
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Onicoplastia Card */}
          <div className="rounded-lg bg-zinc-900/50 p-8 space-y-4">
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
            <a
              href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block w-full text-center rounded-md bg-[#F2E6D8] px-6 py-3 text-black font-semibold hover:bg-[#E6D0B8] transition-colors"
            >
              ¡AGENDA TU EVALUACIÓN!
            </a>
          </div>

          {/* Manicura Card */}
          <div className="rounded-lg bg-zinc-900/50 p-8 space-y-4">
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
            <a
              href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block w-full text-center rounded-md bg-[#F2E6D8] px-6 py-3 text-black font-semibold hover:bg-[#E6D0B8] transition-colors"
            >
              ¡RESERVA AHORA!
            </a>
          </div>

          {/* Pedicura Card */}
          <div className="rounded-lg bg-zinc-900/50 p-8 space-y-4">
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
            <a
              href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block w-full text-center rounded-md bg-[#F2E6D8] px-6 py-3 text-black font-semibold hover:bg-[#E6D0B8] transition-colors"
            >
              ¡RESERVA AHORA!
            </a>
          </div>
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
          className="mt-8 inline-block rounded-md bg-[#F2E6D8] px-6 py-3 text-lg font-semibold text-black shadow-sm hover:bg-[#E6D0B8] transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          ¡RESERVA TU CITA AHORA!
        </a>
      </section>
    </div>
  );
}