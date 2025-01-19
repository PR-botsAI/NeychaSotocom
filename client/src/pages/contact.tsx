import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, Clock, MapPin, MessageSquare, Instagram, Facebook } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-semibold mb-8">¿Cómo Podemos Ayudarte?</h2>

        <div className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <PhoneCall className="h-5 w-5" />
                  <span>939 429 0292</span>
                </div>
                <p className="text-sm text-zinc-400 ml-8">Prefiero mensajes de texto o WhatsApp 👋</p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-5 w-5" />
                  <span>Hatillo, Puerto Rico</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-5 w-5" />
                  <span>Martes a Sábado</span>
                </div>
                <p className="text-sm text-zinc-400 ml-8">Solo con cita previa - No walk-ins</p>
              </CardContent>
            </Card>
          </div>

          {/* Social Media */}
          <div className="mt-8">
            <h3 className="text-xl mb-4">Síguenos en Redes Sociales</h3>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span>Instagram</span>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* Appointment Booking */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl mb-4">¿Lista para transformar tus uñas?</h3>
            <p className="mb-6">Agenda tu cita hoy y comienza tu transformación</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#E6D5BA] text-black hover:bg-[#d4c3a8]"
              >
                ¡AGENDA TU CITA AHORA!
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-zinc-700 hover:bg-zinc-800"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Consultas por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}