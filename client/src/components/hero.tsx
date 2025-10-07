import { Button } from "@/components/ui/button";
import { Sparkles, Award, Calendar } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-black">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#F2E6D8]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Brand Logo */}
          <div className="mb-8 sm:mb-10 max-w-[300px] sm:max-w-lg mx-auto">
            <img 
              src="/assets/HeroLogoWhiteTrasparent.png"
              alt="Neycha Soto Nail Artist"
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
          
          {/* Trust Badge */}
          <div className="mb-8 sm:mb-10 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F2E6D8]/10 border border-[#F2E6D8]/20 px-4 py-2 text-sm font-semibold text-[#F2E6D8]">
              <Award className="w-4 h-4" />
              IBX® Certified
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F2E6D8]/10 border border-[#F2E6D8]/20 px-4 py-2 text-sm font-semibold text-[#F2E6D8]">
              <Sparkles className="w-4 h-4" />
              ⭐ 5.0/5 en Booksy
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent">
              Transforma tus Uñas
            </span>
          </h1>
          
          <p className="mt-4 sm:mt-6 text-xl sm:text-2xl font-semibold text-[#F2E6D8]">
            Onicoplastia & Nail Art Premium
          </p>
          
          <p className="mt-6 sm:mt-8 text-base sm:text-lg leading-relaxed text-gray-300 max-w-2xl mx-auto px-4">
            Restauración profesional certificada para tus uñas. Experiencia única y resultados excepcionales
            con nuestro servicio especializado en Hatillo, Puerto Rico.
          </p>

          {/* CTA Button */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button 
                className="w-full sm:w-auto text-lg px-8 py-6 font-semibold text-black bg-[#F2E6D8] hover:bg-[#E6D0B8] shadow-2xl hover:shadow-[#F2E6D8]/20 transition-all duration-300 group"
              >
                <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                ¡RESERVA AHORA!
              </Button>
            </a>
          </div>

          {/* Trust indicator */}
          <p className="mt-8 text-sm text-gray-400">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Disponible en Booksy • Hatillo, PR 00659
          </p>
        </div>
      </div>
    </div>
  );
}