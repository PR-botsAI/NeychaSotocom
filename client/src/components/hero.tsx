import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 py-12 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Brand Logo */}
          <div className="mb-6 sm:mb-8 max-w-[280px] sm:max-w-md mx-auto">
            <img 
              src="/assets/HeroLogoWhiteTrasparent.png"
              alt="Neycha Soto Nail Artist"
              className="w-full h-auto"
            />
          </div>
          <div className="mb-6 sm:mb-8">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs sm:text-sm font-semibold text-primary">
              IBX® Certified
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
            Transforma tus Uñas
          </h1>
          <p className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-primary">
            Onicoplastia & Nail Art Premium
          </p>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-300 px-2">
            Restauración Premium Exclusivo para tus uñas. Experiencia única y resultados excepcionales
            con nuestro servicio profesional certificado.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
            <a
              href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button 
                className="w-full sm:w-auto text-base sm:text-lg px-6 py-3 font-semibold text-black bg-primary hover:opacity-90"
              >
                ¡RESERVA AHORA!
              </Button>
            </a>
            <Link href="/servicios" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto text-base sm:text-lg px-6 py-3 text-primary border-primary hover:bg-primary/10"
              >
                Nuestros Servicios
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-black/70 backdrop-blur-sm" />
    </div>
  );
}