import { Facebook, Instagram } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6">
          {/* Social Media Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.facebook.com/neychanailscom"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Síguenos en Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/neychanails"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Síguenos en Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=19394290292"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors group relative"
              aria-label="Contáctanos por WhatsApp (Solo mensajes de texto)"
            >
              <SiWhatsapp className="h-5 w-5" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-background px-2 py-1 text-xs text-muted-foreground opacity-0 shadow transition-opacity group-hover:opacity-100">
                Solo mensajes de texto
              </span>
            </a>
          </div>

          {/* Divider */}
          <div className="w-full max-w-[120px] h-px bg-border" />

          {/* Copyright and Powered By */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm text-muted-foreground">
            <span>© 2025 Neycha Nails</span>
            <span>
              Powered by:{" "}
              <a
                href="https://prbots.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF00FF] hover:text-[#CC00CC] transition-colors"
              >
                PRbots.AI
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}