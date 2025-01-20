import { useState } from "react";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

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
      <span key={item.name}>
        <Link href={item.href}>
          <a className="text-base text-white hover:text-white/80 px-4 py-2 rounded-md">
            {item.name}
          </a>
        </Link>
      </span>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center ml-4">
          <Link href="/">
            <a className="text-xl font-bold text-white">neychasoto.com</a>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {navigation.map(renderNavItem)}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-[280px] sm:w-[340px]"
          >
            <SheetTitle>Menú de Navegación</SheetTitle>
            <SheetDescription>
              Navegación principal del sitio
            </SheetDescription>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-zinc-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <div key={item.name} className="w-full">
                      {item.external ? (
                        <Button
                          variant="default"
                          className="w-full justify-start text-base bg-white text-black hover:bg-white/90"
                          onClick={() => {
                            handleExternalClick(item.href);
                            setIsOpen(false);
                          }}
                        >
                          {item.name}
                        </Button>
                      ) : (
                        <Link href={item.href}>
                          <a
                            className="block w-full px-4 py-2 text-base text-white hover:bg-zinc-800 rounded-md"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </a>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}