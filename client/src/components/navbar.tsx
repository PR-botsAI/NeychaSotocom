import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Calendar, ShoppingBag, Sparkles, Scan, X } from "lucide-react";
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

const BOOKSY_URL = "https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo";
const SHOP_URL = "https://shop.neychasoto.com";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleExternalClick = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <motion.nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${
        scrolled
          ? "border-zinc-800/80 bg-black/95 backdrop-blur-xl shadow-lg shadow-black/20"
          : "border-zinc-800/30 bg-black/60 backdrop-blur-md"
      }`}
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center ml-4"
          whileHover={{ scale: 1.02 }}
        >
          <Link
            href="/"
            className="text-xl font-bold text-white hover:text-[#F2E6D8] transition-colors duration-300 animated-underline"
          >
            neychasoto.com
          </Link>
        </motion.div>

        {/* ─── DESKTOP NAV ─── */}
        <div className="hidden md:flex md:items-center md:gap-1">
          {/* Onicoplastia - highlighted as the key page */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/onicoplastia"
              className={`relative inline-flex items-center gap-1.5 text-sm font-medium px-3.5 py-2 rounded-lg transition-all duration-300 ${
                isActive("/onicoplastia")
                  ? "bg-[#F2E6D8]/20 text-[#F2E6D8] border border-[#F2E6D8]/30"
                  : "text-[#F2E6D8] hover:bg-[#F2E6D8]/10 border border-[#F2E6D8]/20 hover:border-[#F2E6D8]/40"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Onicoplastia
            </Link>
          </motion.div>

          {/* Other nav links */}
          {[
            { name: "Auto-Diagnóstico", href: "/diagnostico" },
            { name: "Contacto", href: "/contact" },
          ].map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm px-3 py-2 rounded-md transition-all duration-300 ${
                  active
                    ? "text-[#F2E6D8]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.name}
                {active && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-[#F2E6D8] to-transparent rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          {/* Divider */}
          <div className="w-px h-5 bg-zinc-700 mx-2" />

          {/* Shop */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              size="sm"
              className="text-sm border-[#F2E6D8]/40 text-[#F2E6D8] hover:bg-[#F2E6D8]/10 hover:border-[#F2E6D8] transition-all duration-300 gap-1.5"
              onClick={() => handleExternalClick(SHOP_URL)}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Tienda
            </Button>
          </motion.div>

          {/* Book - primary CTA */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="sm"
              className="text-sm bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] transition-all duration-300 gap-1.5 shadow-lg hover:shadow-[#F2E6D8]/20 font-semibold"
              onClick={() => handleExternalClick(BOOKSY_URL)}
            >
              <Calendar className="w-3.5 h-3.5" />
              Reservar
            </Button>
          </motion.div>
        </div>

        {/* ─── MOBILE MENU TRIGGER ─── */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden mr-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 transition-colors"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </motion.div>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-[300px] sm:w-[340px] border-r border-zinc-800 bg-black/98 backdrop-blur-xl p-0"
            aria-describedby="navigation-menu-description"
          >
            <SheetHeader className="border-b border-zinc-800 px-6">
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
              Navegación principal del sitio web
            </VisuallyHidden>

            <div className="px-5 py-6 space-y-6 overflow-y-auto">
              {/* ── ONICOPLASTIA: Hero CTA in mobile menu ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="/onicoplastia"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <div className={`relative rounded-xl p-4 border transition-all duration-300 overflow-hidden ${
                    isActive("/onicoplastia")
                      ? "bg-[#F2E6D8]/15 border-[#F2E6D8]/30"
                      : "bg-[#F2E6D8]/5 border-[#F2E6D8]/20 hover:bg-[#F2E6D8]/10"
                  }`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#F2E6D8]/10 rounded-full blur-2xl" />
                    <div className="relative flex items-center gap-3">
                      <div className="p-2.5 bg-[#F2E6D8]/15 rounded-lg">
                        <Sparkles className="w-5 h-5 text-[#F2E6D8]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-[#F2E6D8]">Onicoplastia</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Proceso, precios y resultados reales</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* ── PAGES ── */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-2 px-1">Servicios</p>
                <div className="space-y-0.5">
                  {[
                    { name: "Inicio", href: "/" },
                    { name: "Auto-Diagnóstico", href: "/diagnostico" },
                    { name: "Contacto", href: "/contact" },
                  ].map((item, index) => {
                    const active = isActive(item.href);
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={item.href}
                          className={`flex w-full items-center px-3 py-3 text-[15px] rounded-lg transition-all duration-300 ${
                            active
                              ? "text-[#F2E6D8] bg-[#F2E6D8]/10"
                              : "text-white/80 hover:text-white hover:bg-white/5"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                          {active && (
                            <motion.div
                              className="ml-auto w-1.5 h-1.5 rounded-full bg-[#F2E6D8]"
                              layoutId="mobile-nav-active"
                              transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* ── SHOP ── */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-2 px-1">Productos</p>
                <button
                  className="flex w-full items-center gap-3 px-3 py-3 text-[15px] rounded-lg transition-all duration-300 text-[#F2E6D8] hover:bg-[#F2E6D8]/10 group"
                  onClick={() => {
                    handleExternalClick(SHOP_URL);
                    setIsOpen(false);
                  }}
                >
                  <ShoppingBag className="w-4 h-4 text-[#F2E6D8]" />
                  <span>Tienda Online</span>
                  <Sparkles className="w-3 h-3 text-[#F2E6D8]/50 group-hover:text-[#F2E6D8] transition-colors ml-auto" />
                </button>
              </motion.div>

              {/* ── PRIMARY CTA ── */}
              <motion.div
                className="pt-2 border-t border-zinc-800"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Button
                  className="w-full justify-center text-base font-semibold bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] transition-all duration-300 py-6 flex items-center gap-2 rounded-xl shadow-lg hover:shadow-[#F2E6D8]/20"
                  onClick={() => {
                    handleExternalClick(BOOKSY_URL);
                    setIsOpen(false);
                  }}
                >
                  <Calendar className="w-5 h-5" />
                  Reservar Cita
                </Button>
                <p className="text-center text-[11px] text-gray-600 mt-2.5">
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
