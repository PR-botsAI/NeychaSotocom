import { Button } from "@/components/ui/button";
import { Clock, MapPin, Instagram, Facebook, Sparkles, Calendar, ArrowRight, AlertTriangle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, TextReveal } from "@/components/motion-wrapper";
import { MagneticButton } from "@/components/magnetic-button";
import { ParallaxElement } from "@/components/parallax-element";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

const BOOKSY_URL = "https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo";
const WHATSAPP_URL = "https://wa.me/19394290292";

export default function Contact() {
  const handleBookingClick = () => {
    window.open(BOOKSY_URL, "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(242,230,216,0.06)_0%,transparent_50%)]" />

        <ParallaxElement speed={0.3} direction="up" className="absolute top-0 left-1/4">
          <motion.div
            className="w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </ParallaxElement>
        <ParallaxElement speed={0.4} direction="down" className="absolute bottom-0 right-1/4">
          <motion.div
            className="w-80 h-80 bg-[#F2E6D8]/5 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5], x: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </ParallaxElement>

        <div className="container mx-auto max-w-4xl relative z-10">
          <FadeIn className="text-center mb-12">
            <motion.img
              src="/assets/HeroLogoWhiteTrasparent.png"
              alt="Neycha Nails"
              className="h-20 mx-auto mb-6"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#F2E6D8]" />
              <span className="text-sm font-medium text-[#F2E6D8] tracking-widest uppercase">Contáctanos</span>
              <Sparkles className="w-5 h-5 text-[#F2E6D8]" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <TextReveal
                text="Estamos Para Ti"
                className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent"
              />
            </h1>
            <motion.p
              className="text-lg text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              La forma más rápida de agendar es directamente en Booksy.
              Las preguntas más frecuentes ya están respondidas más abajo.
            </motion.p>
          </FadeIn>

          {/* Primary CTA: Booksy */}
          <FadeIn delay={0.2}>
            <div className="flex justify-center items-center">
              <MagneticButton>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button
                    className="bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] text-lg sm:text-xl px-10 sm:px-14 py-7 font-bold shadow-2xl hover:shadow-[#F2E6D8]/30 transition-all duration-300 animate-pulse-glow"
                    onClick={handleBookingClick}
                  >
                    <Calendar className="w-6 h-6 mr-3" />
                    AGENDA TU CITA
                  </Button>
                </motion.div>
              </MagneticButton>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              Reserva en menos de 3 minutos — confirmación instantánea
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-xl" />

      {/* Location + Hours */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-3xl">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.1}>
            <StaggerItem>
              <motion.div
                className="p-6 rounded-xl bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 hover:border-[#F2E6D8]/30 transition-all duration-500 h-full"
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 25 } }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#F2E6D8]/10 rounded-lg flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[#F2E6D8]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Ubicación</h3>
                    <p className="text-gray-300 text-sm">Hatillo, Puerto Rico</p>
                    <p className="text-xs text-gray-500 mt-1">Dirección exacta se confirma al agendar — estudio privado</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                className="p-6 rounded-xl bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 hover:border-[#F2E6D8]/30 transition-all duration-500 h-full"
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 25 } }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#F2E6D8]/10 rounded-lg flex-shrink-0">
                    <Clock className="h-5 w-5 text-[#F2E6D8]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Horario</h3>
                    <p className="text-gray-300 text-sm">Martes a Sábado</p>
                    <p className="text-xs text-gray-500 mt-1">Solo con cita previa — no walk-ins</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-xl" />

      {/* FAQ — covers ALL services */}
      <section className="px-4 py-16 sm:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(242,230,216,0.02)_0%,transparent_60%)]" />
        <div className="container mx-auto max-w-3xl relative">
          <FadeIn>
            <div className="text-center mb-10">
              <motion.p
                className="text-sm font-medium text-[#F2E6D8]/60 tracking-widest uppercase mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Antes de Escribirnos
              </motion.p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <TextReveal text="Preguntas Frecuentes" className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent" />
              </h2>
              <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto">
                El 90% de las dudas se responden aquí abajo. Léelas antes de escribir — nos ahorras tiempo a las dos.
              </p>
            </div>
          </FadeIn>

          <Accordion type="single" collapsible className="space-y-3">
            {[
              {
                q: "¿Cuánto cuesta cada servicio?",
                a: "Onicoplastia: $120 primera sesión (hasta 2 hrs), $80 seguimientos. Manicura Premium: desde $35. Pedicura Spa: desde $60. Los precios son por sesión, no por uña. Todo incluido — no hay costos ocultos.",
              },
              {
                q: "¿Cómo agendo mi cita?",
                a: "Directamente en Booksy. Tienes el botón arriba y abajo de esta página. Reserva en menos de 3 minutos con confirmación instantánea. Ahí ves la disponibilidad real al día.",
              },
              {
                q: "¿Aceptan walk-ins?",
                a: "No. Trabajamos solo con cita previa para dedicarte la atención completa. Esto también nos permite preparar el estudio según tu servicio.",
              },
              {
                q: "¿Cuáles formas de pago aceptan?",
                a: "Efectivo, ATH Móvil y tarjeta de crédito/débito. El pago es el día de la cita.",
              },
              {
                q: "¿Aceptan plan médico?",
                a: "No. Somos servicio estético, no médico. Algunos planes HSA/FSA pueden cubrir tratamientos estéticos — consulta con tu plan.",
              },
              {
                q: "¿Es para hombres también?",
                a: "Sí. Aproximadamente la mitad de nuestros clientes son hombres — muchos llevan años sin usar chancletas en la playa por uñas dañadas. Atendemos sin prejuicios.",
              },
              {
                q: "¿Cómo me preparo para mi cita?",
                a: "Llega con las uñas naturales o con el producto previo (si tienes gel/acrílico, nosotros lo removemos). Evita aplicarte aceites el día de la cita. Puedes traer una foto de inspiración si tienes algo en mente.",
              },
              {
                q: "Tengo una condición especial (psoriasis, hongos, diabetes). ¿Pueden atenderme?",
                a: "En la mayoría de casos sí — la formación en enfermería nos ayuda a evaluar contraindicaciones. Si tu caso requiere precaución médica, te lo indicamos. Para condiciones de pie comprometido usamos línea Footlogix.",
              },
              {
                q: "¿Tengo que ir a Hatillo?",
                a: "Sí, el estudio está en Hatillo, Puerto Rico. Si vienes de lejos, asegúrate de revisar bien la disponibilidad en Booksy antes de agendar. La dirección exacta se confirma al reservar.",
              },
              {
                q: "¿Política de cancelación?",
                a: "Cancela o reagenda con al menos 24 horas de anticipación a través de Booksy. Cancelaciones de último minuto afectan a otros clientes en lista de espera.",
              },
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

      <div className="section-divider mx-auto max-w-xl" />

      {/* WhatsApp — strictly gated */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-2xl">
          <FadeIn>
            <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/60 p-7 sm:p-9">
              <div className="flex items-start gap-3 mb-5">
                <div className="p-2 bg-amber-500/10 rounded-lg flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">¿Tu pregunta no está arriba?</h3>
                  <p className="text-xs text-gray-400 mt-1">Antes de escribir por WhatsApp, lee las reglas:</p>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#F2E6D8] mt-0.5 flex-shrink-0">•</span>
                  <span><strong className="text-white">Solo mensajes de texto.</strong> No aceptamos llamadas ni notas de voz.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F2E6D8] mt-0.5 flex-shrink-0">•</span>
                  <span><strong className="text-white">No es para reservar.</strong> Reservas siempre en Booksy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F2E6D8] mt-0.5 flex-shrink-0">•</span>
                  <span><strong className="text-white">Respondemos cuando podemos.</strong> Estamos a máxima capacidad — la respuesta puede tardar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F2E6D8] mt-0.5 flex-shrink-0">•</span>
                  <span>Si tu pregunta ya está en las FAQs arriba, no la repetimos por WhatsApp.</span>
                </li>
              </ul>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366] text-sm font-semibold"
                  >
                    <SiWhatsapp className="w-4 h-4 mr-2" />
                    Escribir por WhatsApp (caso especial)
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-zinc-900 border-zinc-800 max-w-md">
                  <DialogTitle className="text-white">Confirma antes de continuar</DialogTitle>
                  <DialogDescription className="text-gray-400 text-sm pt-2 leading-relaxed">
                    Confirmas que: (1) ya leíste las FAQs arriba, (2) tu pregunta es específica de tu caso, y
                    (3) entiendes que solo recibimos mensajes de texto y respondemos cuando hay disponibilidad.
                  </DialogDescription>
                  <div className="pt-4 space-y-2">
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full bg-[#25D366] hover:bg-[#20bd59] text-white font-semibold">
                        <SiWhatsapp className="w-4 h-4 mr-2" />
                        Continuar a WhatsApp
                      </Button>
                    </a>
                    <p className="text-[10px] text-gray-600 text-center mt-2">
                      Solo texto · Sin llamadas · Sin notas de voz
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-xl" />

      {/* Social Media */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <motion.div
              className="p-8 rounded-xl bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 hover:border-zinc-700 text-center transition-all duration-500"
              whileHover={{ scale: 1.005 }}
            >
              <h3 className="text-lg font-semibold text-white mb-6">Síguenos en Redes Sociales</h3>
              <div className="flex justify-center gap-4 flex-wrap">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button
                    asChild
                    className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white px-5 py-5 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                  >
                    <a href="https://www.instagram.com/neychasoto_com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Instagram className="h-5 w-5" />
                      <span className="font-medium">@neychasoto_com</span>
                    </a>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button
                    asChild
                    className="bg-[#1877F2] hover:bg-[#166FE5] text-white px-5 py-5 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                  >
                    <a href="https://www.facebook.com/neychasotocom" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Facebook className="h-5 w-5" />
                      <span className="font-medium">Neycha Soto</span>
                    </a>
                  </Button>
                </motion.div>
              </div>
              <p className="text-sm text-gray-500 mt-5">
                Trabajos recientes, casos antes/después, y promociones
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-xl" />

      {/* Final CTA */}
      <FadeIn>
        <section className="px-4 py-24">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              className="relative rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-12 sm:p-16 text-center border border-zinc-800 overflow-hidden"
              whileHover={{ scale: 1.01, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
            >
              <motion.div
                className="absolute top-0 left-0 w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.7, 0.4, 0.7] }}
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
                  <span className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent">
                    ¿Listo Para Transformar Tus Uñas?
                  </span>
                </h2>

                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Reservas en Booksy. Confirmación instantánea. Sin llamadas.
                </p>

                <div className="pt-4">
                  <MagneticButton strength={0.3}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Button
                        className="bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] px-10 sm:px-14 py-7 text-lg sm:text-xl font-bold shadow-2xl hover:shadow-[#F2E6D8]/30 transition-all duration-300 animate-pulse-glow"
                        onClick={handleBookingClick}
                      >
                        <Calendar className="w-6 h-6 mr-3 flex-shrink-0" />
                        AGENDA TU CITA
                      </Button>
                    </motion.div>
                  </MagneticButton>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-400 pt-4">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Disponible vía Booksy &bull; Respuesta Inmediata
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
