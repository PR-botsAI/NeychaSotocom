import { Button } from "@/components/ui/button";
import { Calendar, Award, Star } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, TextReveal } from "@/components/motion-wrapper";
import { MagneticButton } from "@/components/magnetic-button";
import { AnimatedCounter } from "@/components/animated-counter";

const BOOKSY_URL = "https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo";

export default function SobreMi() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(242,230,216,0.06)_0%,transparent_50%)]" />
        <motion.div
          className="absolute top-0 left-1/3 w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto max-w-4xl relative z-10">
          <FadeIn>
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Photo */}
              <div className="flex-shrink-0">
                <motion.div
                  className="w-52 h-52 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#F2E6D8]/20 shadow-2xl shadow-[#F2E6D8]/10"
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src="/assets/image_1737235247434.png"
                    alt="Neycha Soto — Enfermera y especialista en onicoplastia en Hatillo, PR"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Intro */}
              <div className="flex-1 text-center lg:text-left">
                <motion.p
                  className="text-sm font-medium text-[#F2E6D8]/60 tracking-widest uppercase mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Conoce a tu Especialista
                </motion.p>
                <motion.h1
                  className="text-3xl sm:text-5xl font-bold mb-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent">
                    Soy Neycha Soto
                  </span>
                </motion.h1>
                <motion.p
                  className="text-base sm:text-lg text-[#F2E6D8] font-medium mb-4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  Enfermera graduada y especialista en onicoplastia
                </motion.p>

                {/* Credential badges */}
                <motion.div
                  className="flex flex-wrap gap-2 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F2E6D8]/10 border border-[#F2E6D8]/20 px-3 py-1.5 text-xs font-semibold text-[#F2E6D8]">
                    <Award className="w-3 h-3" /> IBX® Certified
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F2E6D8]/10 border border-[#F2E6D8]/20 px-3 py-1.5 text-xs font-semibold text-[#F2E6D8]">
                    <Star className="w-3 h-3 fill-[#F2E6D8]" />
                    <AnimatedCounter value={40} suffix="+" /> Reseñas 5⭐
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F2E6D8]/10 border border-[#F2E6D8]/20 px-3 py-1.5 text-xs font-semibold text-[#F2E6D8]">
                    Hatillo, PR
                  </span>
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-xl" />

      {/* Story */}
      <section className="px-4 py-20 relative">
        <div className="container mx-auto max-w-2xl relative">
          <FadeIn>
            <div className="space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
              <p>
                Mi historia empieza en la UPRA — Universidad de Puerto Rico, Arecibo —
                donde estudié enfermería. Esa formación me dio algo que no se borra:
                disciplina, higiene clínica, atención al detalle, y un respeto profundo
                por el cuidado de otra persona.
              </p>
              <p>
                De ahí mi vida laboral me llevó a oficinas médicas y hospitales,
                conectando con personas todos los días. Pero nunca dejé de estudiar,
                nunca dejé de buscar. En el fondo sabía que mi camino estaba en otro lado.
              </p>
              <p className="text-[#F2E6D8] font-medium">
                Las uñas me salvaron.
              </p>
              <p>
                Encontré la combinación que estaba buscando: la precisión y los
                estándares que aprendí en salud, aplicados al arte. Devolverle la
                confianza a personas que llevaban años escondiendo sus uñas se
                convirtió en mi verdadera vocación.
              </p>
              <p className="text-gray-400">
                Porque eso es lo que hacen las uñas dañadas: te obligan a esconderte.
                A pensar dos veces antes de ponerte sandalias. A cruzar los pies en la playa.
                A evitar que alguien te vea las manos.
              </p>
              <p className="text-gray-300">
                Hoy soy una de las pocas técnicas IBX® certificadas en Puerto Rico,
                trabajando uno-a-uno en estudio privado en Hatillo. Mi credencial es
                verificable directamente con Famous Names (fabricante de IBX®) — y
                siempre te recomiendo preguntarle a tu técnica si está certificada,
                no importa con quién vayas.
              </p>
              <p className="text-gray-400">
                Cada cliente llega con una historia diferente: hongos después de años
                de tratamientos fallidos, traumas por accidentes, deformaciones,
                uñas destruidas por gel mal removido, pies comprometidos. Me siento
                con cada uno, evalúo el caso, y diseño un plan que funciona para esa
                uña específica — no un protocolo genérico.
              </p>

              <motion.div
                className="mt-8 p-6 bg-[#F2E6D8]/5 rounded-xl border border-[#F2E6D8]/10"
                whileHover={{ scale: 1.01 }}
              >
                <p className="text-base text-gray-200 italic">
                  &ldquo;Cada cliente es único. Por eso trabajo solo con cita previa &mdash;
                  para dedicarte toda mi atención y darte resultados excepcionales.&rdquo;
                </p>
                <p className="text-sm text-[#F2E6D8]/70 mt-3 font-medium">&mdash; Neycha Soto</p>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-xl" />

      {/* Credentials */}
      <section className="px-4 py-16 relative">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="text-2xl font-bold text-center mb-10">
              <TextReveal text="Formación y Credenciales" className="text-white" />
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.1}>
            {[
              { icon: "🎓", label: "Enfermería · UPRA Arecibo", desc: "Formación universitaria con prácticas clínicas — disciplina e higiene aplicadas a estética." },
              { icon: "🏅", label: "IBX® Certified", desc: "Una de las pocas técnicas certificadas en PR — verificable con Famous Names." },
              { icon: "⭐", label: "40+ Reseñas 5.0/5", desc: "Calificación perfecta en Booksy — clientes reales, resultados reales." },
              { icon: "🔬", label: "Estándares HEMA/TPO-Free", desc: "Productos sin los alérgenos más comunes en servicios de uñas." },
            ].map((c, i) => (
              <StaggerItem key={i}>
                <motion.div
                  className="flex items-start gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-[#F2E6D8]/30 transition-all duration-300"
                  whileHover={{ y: -2, transition: { type: "spring", stiffness: 300, damping: 25 } }}
                >
                  <span className="text-2xl flex-shrink-0">{c.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">{c.label}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{c.desc}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-xl" />

      {/* Mini gallery — work photos */}
      <section className="px-4 py-16 relative">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="text-2xl font-bold text-center mb-10">
              <TextReveal text="Casos Reales" className="text-white" />
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { before: "/cases/Caso1_before.png", after: "/cases/Caso1_After.png" },
              { before: "/cases/Caso3_before.png", after: "/cases/Caso3_after.png" },
              { before: "/cases/Caso4_before.png", after: "/cases/Caso4_after.png" },
              { before: "/cases/Caso6_before.png", after: "/cases/Caso6_after.png" },
            ].map((c, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div className="relative rounded-xl overflow-hidden border border-zinc-800 aspect-square group">
                  <img
                    src={c.before}
                    alt={`Caso ${i + 1} antes`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                    loading="lazy"
                  />
                  <img
                    src={c.after}
                    alt={`Caso ${i + 1} después`}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between">
                    <span className="text-[9px] font-bold uppercase bg-red-600/80 text-white px-1.5 py-0.5 rounded group-hover:opacity-0 transition-opacity">Antes</span>
                    <span className="text-[9px] font-bold uppercase bg-[#F2E6D8] text-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">Después</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <p className="text-center text-xs text-gray-600 mt-4">Pasa el cursor sobre cada imagen para ver el resultado</p>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-xl" />

      {/* CTA */}
      <FadeIn>
        <section className="px-4 py-24">
          <div className="container mx-auto max-w-3xl">
            <motion.div
              className="relative rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-12 sm:p-16 text-center border border-zinc-800 overflow-hidden"
              whileHover={{ scale: 1.01, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
            >
              <motion.div
                className="absolute top-0 left-0 w-80 h-80 bg-[#F2E6D8]/5 rounded-full blur-3xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-80 h-80 bg-[#F2E6D8]/5 rounded-full blur-3xl"
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.7, 0.4, 0.7] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative space-y-5">
                <h2 className="text-2xl sm:text-3xl font-bold">
                  <span className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent">
                    ¿Lista para tu transformación?
                  </span>
                </h2>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                  Agenda tu cita o mándame foto de tu uña antes. Sin compromiso.
                </p>

                <div className="flex justify-center items-center pt-2">
                  <MagneticButton>
                    <Button
                      className="bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] px-10 py-7 text-lg font-bold shadow-2xl hover:shadow-[#F2E6D8]/30 transition-all duration-300 animate-pulse-glow"
                      onClick={() => window.open(BOOKSY_URL, "_blank")}
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      AGENDA TU CITA
                    </Button>
                  </MagneticButton>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 pt-2">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Estudio privado &bull; Solo con cita previa &bull; Hatillo, PR
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </FadeIn>

      <div className="h-16 md:hidden" />
    </div>
  );
}
