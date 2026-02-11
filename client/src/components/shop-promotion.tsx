import { ShoppingBag, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/magnetic-button";

export default function ShopPromotion() {
  return (
    <section className="px-4">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="group relative rounded-xl bg-gradient-to-br from-purple-950 via-zinc-900 to-pink-950 p-10 sm:p-12 hover:from-purple-900/80 hover:via-zinc-800 hover:to-pink-900/80 transition-all duration-700 border border-purple-500/30 hover:border-purple-500/50 overflow-hidden"
            whileHover={{ scale: 1.005, transition: { duration: 0.4 } }}
          >
            {/* Animated decorative orbs */}
            <motion.div
              className="absolute top-0 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 right-10 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative text-center space-y-6">
              <motion.div
                className="flex items-center justify-center gap-3 mb-2"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Award className="h-8 w-8 text-yellow-400" />
                <Sparkles className="h-6 w-6 text-purple-400" />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                  Productos Que Uso en Mi Salón
                </span>
              </h2>

              <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                Los mismos productos profesionales que uso contigo,{" "}
                <strong className="text-white">ahora disponibles para tu hogar</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <MagneticButton>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Button
                      asChild
                      className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-6 sm:px-8 py-6 text-base sm:text-lg shadow-2xl hover:shadow-purple-500/30 transition-all duration-300"
                    >
                      <a
                        href="https://shop.neychasoto.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="h-5 w-5 flex-shrink-0" />
                        Descubre Los Productos
                      </a>
                    </Button>
                  </motion.div>
                </MagneticButton>

                <div className="flex items-center gap-2 text-purple-300 font-medium">
                  <span className="inline-block w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                  Certificado IBX® &bull; Probados y Aprobados
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
