import { useState } from "react";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
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

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center ml-4">
          <Link href="/">
            <span className="text-xl font-bold text-white">neychasoto.com</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {navigation.map((item) => (
            item.external ? (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <Button 
                  variant="default" 
                  className="text-base bg-white text-black hover:bg-white/90"
                >
                  {item.name}
                </Button>
              </a>
            ) : (
              <Link key={item.name} href={item.href}>
                <Button 
                  variant="ghost" 
                  className="text-base text-white hover:text-white/80"
                >
                  {item.name}
                </Button>
              </Link>
            )
          ))}
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
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            side="left"
            aria-label="Navigation Menu"
          >
            <div className="sr-only" id="mobile-nav-title">Menú de Navegación</div>
            <div className="sr-only" id="mobile-nav-description">Navegación principal del sitio</div>
            <div className="flex h-full w-full flex-col">
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-zinc-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      item.external ? (
                        <a
                          key={item.name}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                        >
                          <Button
                            variant="default"
                            className="w-full justify-start text-base bg-white text-black hover:bg-white/90"
                          >
                            {item.name}
                          </Button>
                        </a>
                      ) : (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                        >
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-base text-white hover:text-white/80"
                          >
                            {item.name}
                          </Button>
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}