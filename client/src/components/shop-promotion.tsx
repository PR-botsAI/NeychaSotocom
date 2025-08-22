import { ShoppingBag, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ShopPromotion() {
  return (
    <section className="px-4 py-16 bg-gradient-to-b from-black to-zinc-900">
      <div className="container mx-auto">
        {/* Compact, High-Impact CTA */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Award className="h-10 w-10 text-yellow-400" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Productos Que Uso en Mi Salón
                </h2>
              </div>
              
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                Los mismos productos profesionales que uso contigo, 
                <strong className="text-white"> ahora disponibles para tu hogar</strong>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg"
                >
                  <a
                    href="https://shop.neychasoto.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Descubre Los Productos
                  </a>
                </Button>
                
                <p className="text-purple-400 font-medium">
                  ✨ Certificada IBX® • Probados y Aprobados
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}