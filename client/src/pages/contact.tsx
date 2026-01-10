import { Button } from "@/components/ui/button";
import { Clock, MapPin, MessageSquare, Instagram, Facebook, Sparkles, Calendar, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { GlassmorphismCard } from "@/components/glassmorphism-card";
import { MagneticButton } from "@/components/magnetic-button";
import { ParallaxElement } from "@/components/parallax-element";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Contact() {
  const handleBookingClick = () => {
    window.open("https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo", "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <ParallaxElement speed={0.3} direction="up" className="absolute top-0 left-1/4">
          <motion.div 
            className="w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 8,
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
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </ParallaxElement>

        <div className="container mx-auto max-w-4xl relative z-10">
          <FadeIn className="text-center mb-12">
            <img 
              src="/assets/HeroLogoWhiteTrasparent.png" 
              alt="Neycha Nails" 
              className="h-20 mx-auto mb-6"
            />
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#F2E6D8]" />
              <span className="text-sm font-medium text-[#F2E6D8] tracking-widest uppercase">Contáctanos</span>
              <Sparkles className="w-5 h-5 text-[#F2E6D8]" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent">
                Estamos Para Ti
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              ¿Tienes preguntas? Nos encantaría escucharte. Contáctanos por WhatsApp o síguenos en redes sociales.
            </p>
          </FadeIn>

          {/* WhatsApp Button - Prominent */}
          <FadeIn delay={0.2}>
            <Dialog>
              <DialogTrigger asChild>
                <MagneticButton className="max-w-md mx-auto block" strength={0.2}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd59] hover:to-[#0d7a6e] text-white text-lg py-8 rounded-xl shadow-2xl shadow-[#25D366]/20 transition-all"
                    >
                      <MessageSquare className="mr-3 h-6 w-6" />
                      Consultas por WhatsApp
                    </Button>
                  </motion.div>
                </MagneticButton>
              </DialogTrigger>
              <DialogContent className="bg-zinc-900 border-zinc-800">
                <DialogHeader>
                  <DialogTitle className="text-white flex items-center gap-2">
                    <Phone className="w-5 h-5 text-[#F2E6D8]" />
                    Mensaje Importante
                  </DialogTitle>
                  <DialogDescription className="text-gray-300">
                    Este número de WhatsApp es solo para mensajes de texto. No se aceptan llamadas ni mensajes de voz.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-6 flex justify-end">
                  <Button 
                    asChild
                    className="bg-[#F2E6D8] text-black hover:bg-[#E6D0B8]"
                  >
                    <a 
                      href="https://wa.me/19394290292"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Continuar a WhatsApp
                    </a>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </FadeIn>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
              ¿Cómo Podemos Ayudarte?
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
            <StaggerItem>
              <GlassmorphismCard className="p-8 h-full bg-gradient-to-br from-zinc-900/80 to-zinc-950/80">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2E6D8]/5 rounded-full blur-3xl group-hover:bg-[#F2E6D8]/10 transition-all"></div>
                
                <div className="relative">
                  <div className="p-3 bg-[#F2E6D8]/10 rounded-lg w-fit mb-4">
                    <MapPin className="h-6 w-6 text-[#F2E6D8]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Ubicación</h3>
                  <p className="text-gray-300">Hatillo, Puerto Rico</p>
                  <p className="text-sm text-gray-400 mt-2">Estudio privado con ambiente exclusivo</p>
                </div>
              </GlassmorphismCard>
            </StaggerItem>

            <StaggerItem>
              <GlassmorphismCard className="p-8 h-full bg-gradient-to-br from-zinc-900/80 to-zinc-950/80">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2E6D8]/5 rounded-full blur-3xl group-hover:bg-[#F2E6D8]/10 transition-all"></div>
                
                <div className="relative">
                  <div className="p-3 bg-[#F2E6D8]/10 rounded-lg w-fit mb-4">
                    <Clock className="h-6 w-6 text-[#F2E6D8]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Horario</h3>
                  <p className="text-gray-300">Martes a Sábado</p>
                  <p className="text-sm text-gray-400 mt-2">Solo con cita previa - No walk-ins</p>
                </div>
              </GlassmorphismCard>
            </StaggerItem>
          </StaggerContainer>

          {/* Social Media Section */}
          <FadeIn delay={0.3} className="mt-12">
            <GlassmorphismCard className="p-8 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80" tilt={false}>
              <ParallaxElement speed={0.2} direction="up" className="absolute top-0 left-0">
                <div className="w-64 h-64 bg-[#F2E6D8]/5 rounded-full blur-3xl"></div>
              </ParallaxElement>
              <ParallaxElement speed={0.3} direction="down" className="absolute bottom-0 right-0">
                <div className="w-64 h-64 bg-[#F2E6D8]/5 rounded-full blur-3xl"></div>
              </ParallaxElement>
              
              <div className="relative text-center">
                <h3 className="text-xl font-bold text-white mb-6">Síguenos en Redes Sociales</h3>
                <div className="flex justify-center gap-4 flex-wrap">
                  <MagneticButton strength={0.25}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        asChild 
                        className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white px-6 py-6 rounded-xl shadow-lg"
                      >
                        <a 
                          href="https://www.instagram.com/neychanails" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3"
                        >
                          <Instagram className="h-5 w-5" />
                          <span className="font-medium">@neychanails</span>
                        </a>
                      </Button>
                    </motion.div>
                  </MagneticButton>
                  
                  <MagneticButton strength={0.25}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        asChild 
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-6 rounded-xl shadow-lg"
                      >
                        <a 
                          href="https://www.facebook.com/neychanailscom" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3"
                        >
                          <Facebook className="h-5 w-5" />
                          <span className="font-medium">Neycha Nails</span>
                        </a>
                      </Button>
                    </motion.div>
                  </MagneticButton>
                </div>
                <p className="text-sm text-gray-400 mt-6">
                  Descubre nuestro trabajo, promociones y testimonios de clientes
                </p>
              </div>
            </GlassmorphismCard>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <FadeIn>
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <motion.div 
              className="relative rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-12 sm:p-16 text-center border border-zinc-800 overflow-hidden"
              whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            >
              <ParallaxElement speed={0.4} direction="up" className="absolute top-0 left-0">
                <motion.div 
                  className="w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
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
              </ParallaxElement>
              <ParallaxElement speed={0.5} direction="down" className="absolute bottom-0 right-0">
                <motion.div 
                  className="w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
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
              </ParallaxElement>
              
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
                  Agenda tu cita hoy y comienza tu transformación con Neycha Nails
                </p>
                
                <div className="pt-4">
                  <MagneticButton strength={0.3}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="w-full sm:w-auto bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] px-6 sm:px-10 py-6 text-base sm:text-lg font-bold shadow-2xl hover:shadow-[#F2E6D8]/30 transition-all"
                        onClick={handleBookingClick}
                      >
                        <Calendar className="w-5 h-5 mr-2 flex-shrink-0" />
                        ¡AGENDA TU CITA AHORA!
                      </Button>
                    </motion.div>
                  </MagneticButton>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-400 pt-4">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Disponible vía Booksy • Respuesta Inmediata
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
