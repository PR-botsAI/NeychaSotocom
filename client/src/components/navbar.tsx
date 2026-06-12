import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion } from "framer-motion";

const BOOKSY_URL = "https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo";
const SHOP_URL = "https://shop.neychasoto.com";

const NAV_LINKS = [
  { name: "Onicoplastia", href: "/onicoplastia" },
  { name: "Sobre Mí", href: "/sobre-mi" },
  { name: "Contacto", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 24);
      setHidden(currentScrollY > lastScrollY.current && currentScrollY > 120);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <motion.nav
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 border-b ${
        scrolled
          ? "bg-[#0a0a0a]/70 backdrop-blur-xl border-white/[0.06]"
          : "bg-transparent border-transparent"
      }`}
      initial={false}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-5 sm:px-8 flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-base lg:text-lg text-[#f5f1ea] hover:text-[var(--cream)] transition-colors duration-200 mr-6 shrink-0"
        >
          Neychasoto.com
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-5 lg:gap-8">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-[11px] tracking-[0.22em] uppercase transition-colors duration-200 pb-1 ${
                  active ? "text-[var(--cream)]" : "text-white/60 hover:text-[#f5f1ea]"
                }`}
              >
                {item.name}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-px left-0 right-0 h-px bg-[var(--cream)]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </Link>
            );
          })}

          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[0.22em] uppercase text-white/60 hover:text-[#f5f1ea] transition-colors duration-200"
          >
            Tienda
          </a>

          <a
            href={BOOKSY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[0.22em] uppercase bg-[var(--cream)] text-black px-5 py-2.5 transition-[background-color,transform] duration-200 hover:bg-[#e6d0b8] active:scale-[0.98]"
          >
            Reservar
          </a>
        </div>

        {/* Mobile trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#f5f1ea] hover:bg-white/10 transition-colors"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-[300px] border-r border-white/[0.06] bg-[#0a0a0a]/95 backdrop-blur-2xl p-0"
            aria-describedby="navigation-menu-description"
          >
            <SheetHeader className="border-b border-white/[0.06] px-6">
              <VisuallyHidden asChild>
                <SheetTitle>Menú de Navegación</SheetTitle>
              </VisuallyHidden>
              <div className="flex items-center py-6">
                <Link
                  href="/"
                  className="font-display text-xl text-[#f5f1ea]"
                  onClick={() => setIsOpen(false)}
                >
                  Neycha Soto
                </Link>
              </div>
            </SheetHeader>
            <VisuallyHidden id="navigation-menu-description">
              Navegación principal del sitio web
            </VisuallyHidden>

            <div className="px-6 py-8 flex flex-col gap-1">
              {[{ name: "Inicio", href: "/" }, ...NAV_LINKS].map((item, index) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + index * 0.05, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      className={`block py-3.5 font-display text-2xl transition-colors duration-200 ${
                        active ? "text-[var(--cream)]" : "text-white/75 hover:text-[#f5f1ea]"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.a
                href={SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-3.5 font-display text-2xl text-white/75 hover:text-[#f5f1ea] transition-colors duration-200"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.24, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setIsOpen(false)}
              >
                Tienda
              </motion.a>

              <motion.div
                className="mt-8 pt-8 border-t border-white/[0.06]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.25 }}
              >
                <a
                  href={BOOKSY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center text-xs tracking-[0.22em] uppercase bg-[var(--cream)] text-black px-6 py-4 transition-transform duration-200 active:scale-[0.98]"
                  onClick={() => setIsOpen(false)}
                >
                  Reservar cita
                </a>
                <p className="text-center text-[10px] tracking-[0.2em] uppercase text-white/35 mt-3">
                  Solo con cita previa
                </p>
              </motion.div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
}
