import { ShoppingBag, Package, Truck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ShopPromotion() {
  const products = [
    {
      id: 1,
      name: "Kit Profesional de Onicoplastia",
      description: "Todo lo necesario para el cuidado profesional en casa",
      price: "$89.99",
      image: "/assets/shop-product-1.jpg"
    },
    {
      id: 2,
      name: "Esmaltes Premium IBX®",
      description: "Colección exclusiva de esmaltes certificados",
      price: "$24.99",
      image: "/assets/shop-product-2.jpg"
    },
    {
      id: 3,
      name: "Aceites Nutritivos",
      description: "Tratamiento intensivo para uñas dañadas",
      price: "$19.99",
      image: "/assets/shop-product-3.jpg"
    }
  ];

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

        {/* Featured Products Preview */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Productos Destacados
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="bg-zinc-900/50 border-zinc-800 overflow-hidden group hover:border-purple-600 transition-colors">
                <div className="aspect-square bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-8 flex items-center justify-center">
                  <Package className="h-24 w-24 text-purple-500/50" />
                </div>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-white mb-2">{product.name}</h4>
                  <p className="text-gray-400 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-400">{product.price}</span>
                    <span className="text-sm text-gray-500">Disponible</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
              Explorar Toda la Tienda
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