import { ShoppingBag, Package, Star, CheckCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ShopPromotion() {
  const benefits = [
    {
      icon: Award,
      title: "Probado en Mi Salón",
      description: "Productos que uso diariamente en mis tratamientos profesionales"
    },
    {
      icon: CheckCircle,
      title: "Resultados Comprobados",
      description: "Meses de pruebas con mis clientas antes de recomendarlos"
    },
    {
      icon: Star,
      title: "Estándares Profesionales",
      description: "Solo productos que cumplen mis exigencias de calidad"
    }
  ];

  return (
    <section className="px-4 py-16 bg-gradient-to-b from-black to-zinc-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Award className="h-8 w-8 text-purple-500" />
            <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
              Recomendaciones Profesionales
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Productos Que Uso y Recomiendo
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Como profesional certificada, he probado estos productos durante meses en mi salón. 
            Ahora los comparto contigo para que puedas mantener la calidad de mis tratamientos en casa.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6 text-center">
                <benefit.icon className="h-10 w-10 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main CTA Card */}
        <div className="max-w-3xl mx-auto mb-12">
          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-600">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Mi Selección Personal de Productos
                </h3>
                <p className="text-gray-300 mb-6">
                  Después de años probando diferentes marcas, estos son los únicos productos 
                  que han pasado mis rigurosas pruebas de calidad y durabilidad en el salón.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Limas Nano Glass Premium</p>
                      <p className="text-gray-400 text-sm">Las que uso en cada tratamiento</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Aceites de Cutícula Dadi' Oil</p>
                      <p className="text-gray-400 text-sm">Mi recomendación #1 para casa</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Guantes UV Protectores</p>
                      <p className="text-gray-400 text-sm">Protección que uso y recomiendo</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Aceites LEpro Profesionales</p>
                      <p className="text-gray-400 text-sm">Probados en cientos de clientas</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                asChild
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4"
              >
                <a
                  href="https://shop.neychasoto.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Ver Mis Recomendaciones
                </a>
              </Button>
              
              <p className="mt-4 text-sm text-purple-400">
                Productos probados y aprobados por una profesional IBX®
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}