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
  { name: "Onicoplastia", href: "/onicoplastia" },
  { name: "Contacto", href: "/contact" },
  { 
    name: "Reservar Cita", 
    href: "https://booksy.com",
    external: true 
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-xl font-bold text-primary">Neycha Soto</span>
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
                <Button variant="default" className="text-base">
                  {item.name}
                </Button>
              </a>
            ) : (
              <Link key={item.name} href={item.href}>
                <Button variant="ghost" className="text-base">
                  {item.name}
                </Button>
              </Link>
            )
          ))}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
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
                          className="w-full justify-start text-base"
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
                          className="w-full justify-start text-base"
                        >
                          {item.name}
                        </Button>
                      </Link>
                    )
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