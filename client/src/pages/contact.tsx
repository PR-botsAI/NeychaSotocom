import { Button } from "@/components/ui/button";
import { Clock, MapPin, MessageSquare, Instagram, Facebook, Sparkles, Calendar, HelpCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem, TextReveal } from "@/components/motion-wrapper";
import { MagneticButton } from "@/components/magnetic-button";
import { ParallaxElement } from "@/components/parallax-element";
import { WhatsAppDialog } from "@/components/whatsapp-dialog";

export default function Contact() {
  const handleBookingClick = () => {
    window.open("https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo", "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(242,230,216,0.06)_0%,transparent_50%)]" />

        <ParallaxElement speed={0.3} direction="up" className="absolute top-0 left-1/4">
          <motion.div
            className="w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </ParallaxElement>
        <ParallaxElement speed={0.4} direction="down" className="absolute bottom-0 right-1/4">
          <motion.div
            className="w-80 h-80 bg-[#F2E6D8]/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
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
              La forma más rápida de agendar es directamente en Booksy. ¿Quieres saber más sobre el tratamiento? Visita nuestra página de onicoplastia.
            </motion.p>
          </FadeIn>

          {/* Primary CTAs: Booksy + Diagnostic */}
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <MagneticButton>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button
                    className="bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] text-lg px-8 py-6 font-bold shadow-2xl hover:shadow-[#F2E6D8]/30 transition-all duration-300 animate-pulse-glow"
                    onClick={handleBookingClick}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    AGENDA TU CITA
                  </Button>
                </motion.div>
              </MagneticButton>

              <a href="/onicoplastia">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button variant="outline" className="text-base px-6 py-6 font-medium border-[#F2E6D8]/50 text-[#F2E6D8] hover:bg-[#F2E6D8]/10 hover:border-[#F2E6D8] cursor-pointer">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Ver Onicoplastia
                  </Button>
                </motion.div>
              </a>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              Reserva en menos de 3 minutos — confirmación instantánea
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-xl" />

      {/* Contact Information Cards */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-3xl">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center">
              <TextReveal text="¿Cómo Podemos Ayudarte?" className="text-white" />
            </h2>
          </FadeIn>

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
                    <p className="text-xs text-gray-500 mt-1">Estudio privado con ambiente exclusivo</p>
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
                    <p className="text-xs text-gray-500 mt-1">Solo con cita previa - No walk-ins</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>

          {/* WhatsApp - Last resort, deprioritized */}
          <FadeIn delay={0.25} className="mt-10">
            <motion.div
              className="p-6 rounded-xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/60 text-center"
              whileHover={{ scale: 1.005 }}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <HelpCircle className="w-4 h-4 text-gray-500" />
                <h3 className="text-sm font-medium text-gray-400">¿Tu caso es complejo y no encaja en lo anterior?</h3>
              </div>
              <p className="text-xs text-gray-500 mb-4 max-w-md mx-auto">
                Antes de escribir, verifica si tu pregunta se responde en nuestra página de <a href="/onicoplastia" className="text-[#F2E6D8]/70 hover:text-[#F2E6D8] underline underline-offset-2">onicoplastia</a> (proceso, precios, FAQs) o usa el <a href="/diagnostico" className="text-[#F2E6D8]/70 hover:text-[#F2E6D8] underline underline-offset-2">auto-diagnóstico</a> para orientación de síntomas. Si tu caso requiere atención especial:
              </p>
              <WhatsAppDialog message="¡Hola! Ya revisé la información en su web y tengo una pregunta específica sobre:">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="cursor-pointer text-sm px-5 py-2.5 rounded-lg border border-zinc-700 text-gray-400 hover:text-[#25D366] hover:border-[#25D366]/40 transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  <MessageSquare className="h-4 w-4" />
                  Escribir por WhatsApp — Solo casos especiales, respuesta en 24-48h
                </motion.button>
              </WhatsAppDialog>
            </motion.div>
          </FadeIn>

          {/* Social Media Section */}
          <FadeIn delay={0.3} className="mt-10">
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
                    <a
                      href="https://www.instagram.com/neychasoto_com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
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
                    <a
                      href="https://www.facebook.com/neychasotocom"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Facebook className="h-5 w-5" />
                      <span className="font-medium">Neycha Soto</span>
                    </a>
                  </Button>
                </motion.div>
              </div>
              <p className="text-sm text-gray-500 mt-5">
                Descubre nuestro trabajo, promociones y testimonios de clientes
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-xl" />

      {/* CTA Section */}
      <FadeIn>
        <section className="px-4 py-24">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              className="relative rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-12 sm:p-16 text-center border border-zinc-800 overflow-hidden"
              whileHover={{ scale: 1.01, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
            >
              <motion.div
                className="absolute top-0 left-0 w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.7, 0.4, 0.7],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
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
                  Agenda tu cita hoy y comienza tu transformación con Neycha Nails
                </p>

                <div className="pt-4">
                  <MagneticButton strength={0.3}>
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
