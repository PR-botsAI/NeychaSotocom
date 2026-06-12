import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const BOOKSY_URL = "https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo";

/**
 * Mobile-only frosted booking bar that appears once the visitor has
 * scrolled past the hero. One action, nothing else.
 */
export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.9);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 inset-x-0 z-40 md:hidden"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass-panel border-x-0 border-b-0 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <a
              href={BOOKSY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[var(--cream)] text-black py-3.5 text-xs font-medium tracking-[0.2em] uppercase active:scale-[0.98] transition-transform duration-150"
            >
              Agenda tu cita
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <p className="text-center text-[9px] tracking-[0.2em] uppercase text-white/35 mt-2">
              Primera sesión $120 &mdash; Solo con cita previa
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
