import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              IBX® Certified
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Transforma tus Uñas
          </h1>
          <p className="mt-4 text-xl font-semibold text-primary">
            Onicoplastia & Nail Art Premium
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Restauración Premium Exclusivo para tus uñas. Experiencia única y resultados excepcionales
            con nuestro servicio profesional certificado.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-primary px-6 py-3 text-lg font-semibold text-white shadow-sm hover:opacity-90"
            >
              ¡RESERVA AHORA!
            </a>
            <Link href="/servicios">
              <Button variant="outline" size="lg" className="text-lg">
                Descubre el Proceso
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: "url('https://neychasoto.com/images/logos/neychasoto_logo_hero_img.png')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      <div className="absolute inset-0 -z-10 bg-white/70 backdrop-blur-sm" />
    </div>
  );
}