import { ShoppingBag, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function ShopBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate banner appearance after page load
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className="container mx-auto px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              <Sparkles className="absolute -top-1 -right-1 h-2 w-2 text-yellow-300 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Productos Que Uso en Mi Salón</h3>
              <p className="text-xs opacity-90 hidden sm:block">
                Ahora disponibles para ti
              </p>
            </div>
          </div>
          
          <Button
            asChild
            size="sm"
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold group text-xs sm:text-sm"
          >
            <a
              href="https://shop.neychasoto.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 sm:gap-2"
            >
              Ver Tienda
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}