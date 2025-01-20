import { useState } from "react";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Onicopastia", href: "/onicoplastia" },
  { name: "Contacto", href: "/contact" },
  { 
    name: "Reservar Cita", 
    href: "https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo",
    external: true 
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleExternalClick = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const renderNavItem = (item: typeof navigation[0]) => {
    if (item.external) {
      return (
        <Button 
          key={item.name}
          variant="default" 
          className="text-base bg-white text-black hover:bg-white/90"
          onClick={() => handleExternalClick(item.href)}
        >
          {item.name}
        </Button>
      );
    }

    return (
      <Link 
        key={item.name} 
        href={item.href}
        className="text-base text-white hover:text-white/80 px-4 py-2 rounded-md"
      >
        {item.name}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center ml-4">
          <Link 
            href="/"
            className="text-xl font-bold text-white"
          >
            neychasoto.com
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {navigation.map(renderNavItem)}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden mr-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10 transition-colors"
            >
              <Menu className="h-7 w-7" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-[280px] sm:w-[340px] border-r border-zinc-800 bg-black/95 backdrop-blur-lg"
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
                {navigation.map((item) => (
                  <div key={item.name} className="w-full">
                    {item.external ? (
                      <Button
                        variant="default"
                        className="w-full justify-center text-base font-medium bg-white text-black hover:bg-white/90 transition-colors"
                        onClick={() => {
                          handleExternalClick(item.href);
                          setIsOpen(false);
                        }}
                      >
                        {item.name}
                      </Button>
                    ) : (
                      <Link 
                        href={item.href}
                        className="flex w-full px-4 py-3 text-base text-white hover:bg-white/10 rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}