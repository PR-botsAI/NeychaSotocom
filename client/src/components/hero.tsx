import { Button } from "@/components/ui/button";
import { Award, Calendar, Star, MessageSquare, Lock, Sparkles } from "lucide-react";
import { WhatsAppDialog } from "@/components/whatsapp-dialog";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/magnetic-button";
import { AnimatedCounter } from "@/components/animated-counter";
import { TextReveal } from "@/components/motion-wrapper";

const BOOKSY_URL = "https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo";

// Collage images — mix of before/after to create a visual wall of proof
const collageImages = [
  { src: "/cases/Caso1_before.png", label: "antes" },
  { src: "/cases/Caso1_After.png", label: "después" },
  { src: "/cases/Caso2_before.png", label: "antes" },
  { src: "/cases/Caso2_after.png", label: "después" },
  { src: "/cases/Caso3_before.png", label: "antes" },
  { src: "/cases/Caso3_after.png", label: "después" },
];

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-black">
      {/* Background collage mosaic */}
      <div className="absolute inset-0 grid grid-cols-3 sm:grid-cols-6 opacity-30">
        {collageImages.map((img, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>
        ))}
      </div>

      {/* Heavy overlay so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black z-[1]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          {/* Logo */}
          <motion.div
            className="mb-6 sm:mb-8 max-w-[220px] sm:max-w-sm mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/assets/HeroLogoWhiteTrasparent.png"
              alt="Neycha Soto"
              className="w-full h-auto drop-shadow-2xl"
            />
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mb-6 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F2E6D8]/10 border border-[#F2E6D8]/20 px-3 py-1.5 text-xs font-semibold text-[#F2E6D8]">
              <Award className="w-3 h-3" />
              IBX® Certified
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F2E6D8]/10 border border-[#F2E6D8]/20 px-3 py-1.5 text-xs font-semibold text-[#F2E6D8]">
              <Star className="w-3 h-3 fill-[#F2E6D8]" />
              5.0/5 &bull; <AnimatedCounter value={40} suffix="+" /> Reseñas
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-3">
            <TextReveal
              text="Vuelve a Usar Sandalias con Confianza"
              className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent pb-2 animate-gradient"
              delay={0.5}
            />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-3 sm:mt-5 text-lg sm:text-2xl font-semibold text-[#F2E6D8]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Onicoplastia &bull; Manicura &bull; Pedicura Spa
          </motion.p>

          {/* Description */}
          <motion.p
            className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            ¿Escondes tus pies o manos? Devolvemos la apariencia natural a tus uñas
            para que vivas sin limitaciones. Estudio privado en Hatillo, Puerto Rico.
          </motion.p>

          {/* Dual CTA */}
          <motion.div
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton>
              <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button className="text-base sm:text-lg px-6 sm:px-8 py-6 font-semibold text-black bg-[#F2E6D8] hover:bg-[#E6D0B8] shadow-2xl hover:shadow-[#F2E6D8]/30 transition-all duration-500 group animate-pulse-glow">
                    <Calendar className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    AGENDA TU CITA
                  </Button>
                </motion.div>
              </a>
            </MagneticButton>

            <WhatsAppDialog message="¡Hola! Me interesa conocer más sobre sus servicios.">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Button variant="outline" className="text-sm sm:text-base px-5 py-6 font-medium border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366] cursor-pointer">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </motion.div>
            </WhatsAppDialog>
          </motion.div>

          {/* Availability */}
          <motion.p
            className="mt-6 text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse" />
            Disponible en Booksy &bull; Hatillo, PR 00659 &bull; Solo con cita previa
          </motion.p>
        </div>
      </div>

      {/* Trust strip */}
      <motion.div
        className="relative z-10 border-t border-[#F2E6D8]/10 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <div className="container mx-auto px-4 py-3.5">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#F2E6D8]" /> IBX® Certificado</span>
            <span className="hidden sm:block w-px h-3 bg-zinc-800" />
            <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-[#F2E6D8] fill-[#F2E6D8]" /> 5.0/5 Booksy</span>
            <span className="hidden sm:block w-px h-3 bg-zinc-800" />
            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#F2E6D8]" /> Apariencia Natural</span>
            <span className="hidden sm:block w-px h-3 bg-zinc-800" />
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-[#F2E6D8]" /> Estudio Privado</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
