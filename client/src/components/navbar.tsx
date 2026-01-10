import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Calendar, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { motion } from "framer-motion";

const navigation: Array<{
  name: string;
  href: string;
  external?: boolean;
  highlight?: boolean;
}> = [
  { name: "Inicio", href: "/" },
  { name: "Onicoplastia", href: "/onicoplastia" },
  { 
    name: "Tienda", 
    href: "https://shop.neychasoto.com",
    external: true,
    highlight: true 
  },
  { name: "Contacto", href: "/contact" },
  { 
    name: "Reservar Cita", 
    href: "https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo",
    external: true 
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleExternalClick = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const renderNavItem = (item: typeof navigation[0]) => {
    if (item.external) {
      if (item.highlight) {
        return (
          <motion.div 
            key={item.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="default" 
              className="text-base bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2 relative"
              onClick={() => handleExternalClick(item.href)}
            >
              <ShoppingBag className="w-4 h-4" />
              {item.name}
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 animate-pulse" />
            </Button>
          </motion.div>
        );
      }
      
      return (
        <motion.div 
          key={item.name}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant="default" 
            className="text-base bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] transition-all duration-300 flex items-center gap-2"
            onClick={() => handleExternalClick(item.href)}
          >
            <Calendar className="w-4 h-4" />
            {item.name}
          </Button>
        </motion.div>
      );
    }

    const active = isActive(item.href);
    return (
      <Link 
        key={item.name} 
        href={item.href}
        className={`relative text-base px-4 py-2 rounded-md transition-all duration-300 ${
          active 
            ? "text-[#F2E6D8]" 
            : "text-white/80 hover:text-white"
        }`}
      >
        {item.name}
        {active && (
          <motion.div
            layoutId="navbar-active"
            className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#F2E6D8] rounded-full"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
      </Link>
    );
  };

  return (
    <motion.nav 
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled 
          ? "border-zinc-800 bg-black/98 backdrop-blur-lg shadow-lg" 
          : "border-zinc-800/50 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div 
          className="flex items-center ml-4"
          whileHover={{ scale: 1.02 }}
        >
          <Link 
            href="/"
            className="text-xl font-bold text-white hover:text-[#F2E6D8] transition-colors duration-300"
          >
            neychasoto.com
          </Link>
        </motion.div>

        <div className="hidden md:flex md:items-center md:space-x-6">
          {navigation.map(renderNavItem)}
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden mr-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10 transition-colors"
              >
                <Menu className="h-7 w-7" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-[280px] sm:w-[340px] border-r border-zinc-800 bg-black/98 backdrop-blur-lg"
            aria-describedby="navigation-menu-description"
          >
            <SheetHeader className="border-b border-zinc-800">
              <VisuallyHidden asChild>
                <SheetTitle>Menú de Navegación</SheetTitle>
              </VisuallyHidden>
              <div className="flex items-center justify-center py-6">
                <Link 
                  href="/"
                  className="text-xl font-bold text-white"
                  onClick={() => setIsOpen(false)}
                >
                  neychasoto.com
                </Link>
              </div>
            </SheetHeader>
            <VisuallyHidden id="navigation-menu-description">
              Navegación principal del sitio
            </VisuallyHidden>

            <div className="mt-8 px-2">
              <div className="space-y-4">
                {navigation.map((item, index) => {
                  const active = !item.external && isActive(item.href);
                  
                  if (item.external && item.highlight) {
                    return (
                      <motion.div 
                        key={item.name} 
                        className="w-full"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          variant="default"
                          className="w-full justify-center text-base font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105 transition-all duration-300 py-6 flex items-center gap-2 relative"
                          onClick={() => {
                            handleExternalClick(item.href);
                            setIsOpen(false);
                          }}
                        >
                          <ShoppingBag className="w-5 h-5" />
                          {item.name}
                          <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 animate-pulse" />
                        </Button>
                      </motion.div>
                    );
                  } else if (item.external && !item.highlight) {
                    return (
                      <motion.div 
                        key={item.name} 
                        className="w-full pt-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          variant="default"
                          className="w-full justify-center text-base font-medium bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] hover:scale-105 transition-all duration-300 py-6 flex items-center gap-2"
                          onClick={() => {
                            handleExternalClick(item.href);
                            setIsOpen(false);
                          }}
                        >
                          <Calendar className="w-5 h-5" />
                          {item.name}
                        </Button>
                      </motion.div>
                    );
                  } else {
                    return (
                      <motion.div 
                        key={item.name} 
                        className="w-full"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link 
                          href={item.href}
                          className={`flex w-full px-4 py-3 text-base rounded-md transition-all duration-300 ${
                            active 
                              ? "text-[#F2E6D8] bg-[#F2E6D8]/10 border-l-2 border-[#F2E6D8]" 
                              : "text-white hover:bg-white/10"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    );
                  }
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
}
