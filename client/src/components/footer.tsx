import { Facebook, Instagram } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion-wrapper";

export default function Footer() {
  const socialLinks = [
    {
      href: "https://www.facebook.com/neychasotocom",
      icon: <Facebook className="h-5 w-5" />,
      label: "Síguenos en Facebook",
    },
    {
      href: "https://www.instagram.com/neychasoto_com/",
      icon: <Instagram className="h-5 w-5" />,
      label: "Síguenos en Instagram",
    },
  ];

  return (
    <footer className="relative bg-background border-t border-zinc-800/50 overflow-hidden">
      {/* Subtle gradient accent at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F2E6D8]/20 to-transparent" />

      <div className="container mx-auto px-4 py-10">
        <FadeIn>
          <div className="flex flex-col items-center justify-between gap-8">
            {/* Social Media Links */}
            <div className="flex items-center gap-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[#F2E6D8] transition-colors duration-300 p-2 rounded-full hover:bg-[#F2E6D8]/10"
                  aria-label={link.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {link.icon}
                </motion.a>
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <motion.button
                    className="text-muted-foreground hover:text-[#F2E6D8] transition-colors duration-300 p-2 rounded-full hover:bg-[#F2E6D8]/10"
                    aria-label="Contáctanos por WhatsApp (Solo mensajes de texto)"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <SiWhatsapp className="h-5 w-5" />
                  </motion.button>
                </DialogTrigger>
                <DialogContent className="bg-zinc-900 border-zinc-800">
                  <DialogTitle className="text-white">Mensaje Importante</DialogTitle>
                  <DialogDescription className="py-4 text-gray-300">
                    Este número de WhatsApp es solo para mensajes de texto. No se aceptan llamadas ni mensajes de voz.
                  </DialogDescription>
                  <div className="flex justify-end">
                    <a
                      href="https://api.whatsapp.com/send/?phone=19394290292"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button className="bg-[#F2E6D8] text-black hover:bg-[#E6D0B8]">Continuar a WhatsApp</Button>
                    </a>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Divider */}
            <div className="w-full max-w-[120px] section-divider" />

            {/* Copyright and Powered By */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm text-muted-foreground">
              <span>&copy; {new Date().getFullYear()} Neycha Soto</span>
              <span>
                Powered by:{" "}
                <a
                  href="https://prbots.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF00FF] hover:text-[#CC00CC] transition-colors duration-300 animated-underline"
                >
                  PRbots.AI
                </a>
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
