import { Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface WhatsAppDialogProps {
  children: React.ReactNode;
  message?: string;
}

export function WhatsAppDialog({ children, message = "¡Hola! Me gustaría agendar una cita." }: WhatsAppDialogProps) {
  const encodedMessage = encodeURIComponent(message);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-800 max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#F2E6D8]" />
            Mensaje Importante
          </DialogTitle>
          <DialogDescription className="text-gray-300 pt-2">
            Este número de WhatsApp es solo para mensajes de texto. No se aceptan llamadas ni mensajes de voz.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end">
          <Button
            asChild
            className="bg-[#25D366] hover:bg-[#20bd59] text-white font-semibold"
          >
            <a
              href={`https://wa.me/19394290292?text=${encodedMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <SiWhatsapp className="w-4 h-4" />
              Continuar a WhatsApp
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
