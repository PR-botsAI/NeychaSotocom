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
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag className="h-6 w-6" />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 animate-pulse" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg">¡Nueva Tienda Online!</h3>
              <p className="text-sm opacity-90">
                Productos exclusivos de nail art y cuidado profesional
              </p>
            </div>
          </div>
          
          <Button
            asChild
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold group"
          >
            <a
              href="https://shop.neychasoto.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Visitar Tienda
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}