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
          Desde ${(service.price / 100).toFixed(2)}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isOnicoplastia ? (
          <>
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm">
                Tratamiento profesional progresivo diseñado para restaurar la salud y apariencia de tus uñas afectadas. 
                Combina técnicas avanzadas y productos antifúngicos hipoalergénicos.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Primera Cita - Evaluación:</h4>
                <ul className="space-y-1">
                  <li className="text-sm flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    Evaluación personalizada completa
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    Limpieza y eliminación de áreas afectadas
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    Plan de tratamiento personalizado
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Beneficios:</h4>
                <ul className="space-y-1">
                  <li className="text-sm flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    Procedimiento indoloro y no invasivo
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    Compatible con decoraciones (acrílico, polygel)
                  </li>
                  <li className="text-sm flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    Previene la reaparición de infecciones
                  </li>
                </ul>
              </div>

              <div className="bg-primary/5 p-3 rounded-md border border-primary/10">
                <h4 className="text-sm font-semibold mb-1">⚡ Importante:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Tratamiento progresivo con múltiples sesiones</li>
                  <li>• Seguimiento cada 45 días para óptimos resultados</li>
                  <li>• Evaluación inicial requerida para todas las clientas</li>
                </ul>
              </div>
            </div>

            <Button 
              asChild
              className="w-full font-semibold"
            >
              <a 
                href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
                target="_blank"
                rel="noopener noreferrer"
              >
                ¡AGENDA TU EVALUACIÓN INICIAL!
              </a>
            </Button>
          </>
        ) : (
          <>
            <p className="text-muted-foreground">{service.description}</p>
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
            <Button 
              asChild
              className="w-full"
            >
              <a 
                href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
                target="_blank"
                rel="noopener noreferrer"
              >
                ¡RESERVA AHORA!
              </a>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}