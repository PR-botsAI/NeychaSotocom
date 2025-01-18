import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneCall, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Contáctanos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5" />
              Teléfono
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">+1 (787) XXX-XXXX</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">info@neychasoto.com</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Ubicación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">Hatillo, Puerto Rico</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <a
          href="https://booksy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Button size="lg" className="text-lg">
            Reserva tu Cita
          </Button>
        </a>
      </div>
    </div>
  );
}
