import { Calendar, Stethoscope, ShoppingBag, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <>
      {/* Primary sticky bottom bar - Mobile only */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="bg-black/95 backdrop-blur-xl border-t border-zinc-800/80 px-3 py-2.5">
          <div className="flex items-center gap-2">
            {/* Booking - Primary */}
            <a
              href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <motion.button
                className="w-full flex items-center justify-center gap-2 bg-[#F2E6D8] text-black font-bold py-3 rounded-xl text-sm shadow-lg shadow-[#F2E6D8]/10"
                whileTap={{ scale: 0.96 }}
              >
                <Calendar className="w-4 h-4" />
                Agenda Tu Cita
              </motion.button>
            </a>

            {/* Diagnostic tool */}
            <a href="/diagnostico" className="flex-shrink-0">
              <motion.button
                className="flex items-center justify-center gap-2 bg-[#F2E6D8]/15 text-[#F2E6D8] font-semibold py-3 px-4 rounded-xl text-sm border border-[#F2E6D8]/30"
                whileTap={{ scale: 0.96 }}
              >
                <Stethoscope className="w-4 h-4" />
                Evalúa
              </motion.button>
            </a>

            {/* Shop */}
            <motion.button
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-zinc-800 text-[#F2E6D8] border border-zinc-700"
              whileTap={{ scale: 0.92 }}
              onClick={() => window.open('https://shop.neychasoto.com', '_blank')}
              aria-label="Tienda"
            >
              <ShoppingBag className="w-4 h-4" />
            </motion.button>

            {/* Scroll to top */}
            <motion.button
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-zinc-800/60 text-gray-400 border border-zinc-700/50"
              whileTap={{ scale: 0.92 }}
              onClick={scrollToTop}
              aria-label="Volver arriba"
            >
              <ChevronUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Desktop floating nav - Right side pill */}
      <motion.div
        className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col items-center gap-1.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full p-2 shadow-2xl shadow-black/40">
          {/* Booking */}
          <motion.a
            href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] transition-colors duration-300"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            aria-label="Agendar cita"
          >
            <Calendar className="w-4 h-4" />
            <span className="absolute right-full mr-3 px-2.5 py-1 text-xs font-medium text-white bg-black/80 backdrop-blur-sm rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 border border-white/5">
              Agendar
            </span>
          </motion.a>

          {/* Diagnostic */}
          <motion.a
            href="/diagnostico"
            className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-[#F2E6D8] hover:bg-[#F2E6D8]/10 transition-colors duration-300"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            aria-label="Evalúa tus uñas"
          >
            <Stethoscope className="w-4 h-4" />
            <span className="absolute right-full mr-3 px-2.5 py-1 text-xs font-medium text-white bg-black/80 backdrop-blur-sm rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 border border-white/5">
              Evalúa
            </span>
          </motion.a>

          {/* Shop */}
          <motion.button
            className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-[#F2E6D8]/60 hover:text-[#F2E6D8] hover:bg-white/8 transition-colors duration-300"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => window.open('https://shop.neychasoto.com', '_blank')}
            aria-label="Tienda"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="absolute right-full mr-3 px-2.5 py-1 text-xs font-medium text-white bg-black/80 backdrop-blur-sm rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 border border-white/5">
              Tienda
            </span>
          </motion.button>

          {/* Scroll to top */}
          <AnimatePresence>
            {visible && (
              <motion.button
                onClick={scrollToTop}
                className="group relative flex items-center justify-center w-9 h-9 rounded-full text-white/30 hover:text-white/70 hover:bg-white/5 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Volver arriba"
              >
                <ChevronUp className="w-4 h-4" />
                <span className="absolute right-full mr-3 px-2.5 py-1 text-xs font-medium text-white bg-black/80 backdrop-blur-sm rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 border border-white/5">
                  Arriba
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
