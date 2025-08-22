import { ShoppingBag, Package, Truck, Star, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useShopData } from "@/hooks/use-shop-data";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShopPromotion() {
  const { data: shopData, isLoading, error } = useShopData();
  
  const features = [
    {
      icon: Package,
      title: "Productos Exclusivos",
      description: "Marcas profesionales certificadas"
    },
    {
      icon: Truck,
      title: "Envío a Todo PR",
      description: "Entrega rápida y segura"
    },
    {
      icon: Star,
      title: "Calidad Garantizada",
      description: "100% productos originales"
    }
  ];

  return (
    <section className="px-4 py-16 bg-gradient-to-b from-black to-zinc-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <ShoppingBag className="h-8 w-8 text-purple-500" />
            <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
              Nueva Tienda Online
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Lleva el Salón a Tu Casa
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Descubre nuestra colección exclusiva de productos profesionales para el cuidado
            y embellecimiento de tus uñas. Calidad de salón, ahora disponible online.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6 text-center">
                <feature.icon className="h-10 w-10 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Products Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Visita Nuestra Tienda Online
          </h3>
          
          {isLoading ? (
            // Loading state
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-zinc-900/50 border-zinc-800">
                  <Skeleton className="aspect-square bg-zinc-800" />
                  <CardContent className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4 bg-zinc-800" />
                    <Skeleton className="h-4 w-full bg-zinc-800" />
                    <Skeleton className="h-8 w-1/3 bg-zinc-800" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // Show simplified shop promotion
            <div className="max-w-2xl mx-auto">
              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-600">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <ShoppingBag className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-white mb-3">
                      Productos Profesionales de Nail Art
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Encuentra todo lo que necesitas para el cuidado profesional de tus uñas:
                    </p>
                    <ul className="text-left text-gray-300 space-y-2 max-w-md mx-auto mb-6">
                      <li className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-purple-400 flex-shrink-0" />
                        <span>Kits profesionales de onicoplastia</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-purple-400 flex-shrink-0" />
                        <span>Esmaltes premium IBX® certificados</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-purple-400 flex-shrink-0" />
                        <span>Aceites nutritivos y tratamientos</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-purple-400 flex-shrink-0" />
                        <span>Herramientas y accesorios profesionales</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                  >
                    <a
                      href="https://shop.neychasoto.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-5 w-5" />
                      Explorar Productos en la Tienda
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 text-lg"
          >
            <a
              href="https://shop.neychasoto.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ShoppingBag className="h-5 w-5" />
              Visitar Tienda Completa
            </a>
          </Button>
          <p className="mt-4 text-sm text-gray-400">
            Ofertas especiales para clientes del salón
          </p>
        </div>
      </div>
    </section>
  );
}