import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Service } from "@db/schema";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const isOnicoplastia = service.category === 'Restauración Ungueal';

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {service.image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{service.name}</CardTitle>
        <div className="text-sm text-muted-foreground">
          ${(service.price / 100).toFixed(2)} • {service.duration} minutos
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{service.description}</p>

        {isOnicoplastia ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">El Proceso incluye:</h4>
              <p className="text-sm">✓ Evaluación personalizada completa</p>
              <p className="text-sm">✓ Limpieza y eliminación de áreas afectadas</p>
              <p className="text-sm">✓ Plan de tratamiento personalizado</p>
              <p className="text-sm">✓ Seguimiento regular para resultados óptimos</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Beneficios:</h4>
              <p className="text-sm">✓ Tratamiento indoloro y profesional</p>
              <p className="text-sm">✓ Productos antifúngicos hipoalergénicos</p>
              <p className="text-sm">✓ Compatible con decoraciones (acrílico, polygel)</p>
              <p className="text-sm">✓ Mejora visible desde la primera sesión</p>
            </div>

            <div className="bg-primary/10 p-3 rounded-md">
              <p className="text-sm font-medium">
                ⓘ Este es un tratamiento progresivo que requiere múltiples sesiones para resultados óptimos. Las citas de seguimiento deben realizarse dentro de 45 días.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {service.category === 'Cuidado de Manos' && (
              <>
                <p className="text-sm">✓ Técnicas exclusivas de embellecimiento</p>
                <p className="text-sm">✓ Productos premium para el cuidado</p>
                <p className="text-sm">✓ Experiencia relajante y renovadora</p>
              </>
            )}
            {service.category === 'Belleza para Pies' && (
              <>
                <p className="text-sm">✓ Spa completo para pies</p>
                <p className="text-sm">✓ Masaje relajante incluido</p>
                <p className="text-sm">✓ Cuidado detallado y duradero</p>
              </>
            )}
          </div>
        )}

        <a 
          href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <Button className="w-full">
            {isOnicoplastia ? '¡AGENDA TU EVALUACIÓN!' : '¡RESERVA AHORA!'}
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}