import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion-wrapper";
import { AnimatedCounter } from "@/components/animated-counter";

export default function MeetTheArtist() {
  return (
    <section className="px-4 py-20 sm:py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(242,230,216,0.03)_0%,transparent_60%)]" />

      <div className="container mx-auto max-w-3xl relative">
        <FadeIn>
          <div className="text-center mb-14">
            <motion.p
              className="text-sm font-medium text-[#F2E6D8]/60 tracking-widest uppercase mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Tu Especialista
            </motion.p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
              Neycha Soto{" "}
              <span className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent">
                Nail Artist
              </span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="space-y-5">
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed text-center">
              Especialista en <strong className="text-[#F2E6D8]">onicoplastia</strong> y restauración
              de uñas con el sistema IBX®. Cada cliente recibe un plan de tratamiento personalizado
              en un ambiente privado y relajante.
            </p>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed text-center">
              Playa, sandalias, pies descalzos — devolvemos la confianza a hombres y mujeres
              que esconden sus uñas. Reconstrucción estética profesional. El café va por la casa.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-4 max-w-md mx-auto">
              <div className="text-center p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <div className="text-xl sm:text-2xl font-bold text-[#F2E6D8]"><AnimatedCounter value={40} suffix="+" /></div>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Reseñas 5.0</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <div className="text-xl sm:text-2xl font-bold text-[#F2E6D8]">100%</div>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Satisfacción</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <div className="text-xl sm:text-2xl font-bold text-[#F2E6D8]">IBX®</div>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Certificada</p>
              </div>
            </div>

            {/* Quote */}
            <motion.div
              className="p-4 bg-[#F2E6D8]/5 rounded-xl border border-[#F2E6D8]/10 max-w-lg mx-auto"
              whileHover={{ scale: 1.01 }}
            >
              <p className="text-sm text-gray-300 italic text-center">
                &ldquo;Cada cliente es único. Por eso trabajo solo con cita previa &mdash;
                para dedicarte toda mi atención y darte resultados excepcionales.&rdquo;
              </p>
              <p className="text-xs text-[#F2E6D8]/70 mt-2 font-medium text-center">&mdash; Neycha Soto</p>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
