import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Case } from "@db/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function Onicoplastia() {
  const [selectedImage, setSelectedImage] = useState<"before" | "after" | "collage">("before");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const { data: cases = [] } = useQuery<Case[]>({
    queryKey: ["/api/cases", { category: "onicoplastia" }],
  });

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Onicoplastia Profesional
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
          Transformamos uñas dañadas en uñas saludables y hermosas.
          Nuestro tratamiento profesional progresivo está diseñado para restaurar
          la salud y apariencia de tus uñas afectadas.
        </p>
      </section>

      {/* Treatment Description Section */}
      <section className="container max-w-5xl">
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle>Beneficios del Tratamiento</CardTitle>
              <CardDescription>Ventajas de elegir nuestra Onicoplastia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Resultados visibles desde la primera sesión</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Procedimiento indoloro y no invasivo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Compatible con decoraciones (acrílico/gel)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Previene la reaparición de infecciones</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle>Primera Sesión</CardTitle>
              <CardDescription>Qué esperar en tu primera visita</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary">1.</span>
                  <span>Evaluación personalizada completa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">2.</span>
                  <span>Limpieza y eliminación de áreas afectadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">3.</span>
                  <span>Plan de tratamiento personalizado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">4.</span>
                  <span>Recomendaciones para cuidado en casa</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="container max-w-6xl">
        <h2 className="text-2xl font-semibold mb-8 text-center">Transformaciones Reales</h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {cases.map((case_) => (
              <CarouselItem key={case_.id}>
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>{case_.title}</CardTitle>
                    <CardDescription>{case_.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="before" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="before">Antes</TabsTrigger>
                        <TabsTrigger value="after">Después</TabsTrigger>
                        <TabsTrigger value="collage">Proceso</TabsTrigger>
                      </TabsList>
                      <TabsContent value="before">
                        <div className="aspect-square w-full overflow-hidden rounded-md">
                          <img
                            src={case_.beforeImage}
                            alt="Antes del tratamiento"
                            className="w-full h-full object-contain bg-black/5"
                            onClick={() => setSelectedCase(case_)}
                          />
                        </div>
                      </TabsContent>
                      <TabsContent value="after">
                        <div className="aspect-square w-full overflow-hidden rounded-md">
                          <img
                            src={case_.afterImage}
                            alt="Después del tratamiento"
                            className="w-full h-full object-contain bg-black/5"
                            onClick={() => setSelectedCase(case_)}
                          />
                        </div>
                      </TabsContent>
                      <TabsContent value="collage">
                        <div className="aspect-square w-full overflow-hidden rounded-md">
                          <img
                            src={case_.collageImage}
                            alt="Proceso del tratamiento"
                            className="w-full h-full object-contain bg-black/5"
                            onClick={() => setSelectedCase(case_)}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Image Preview Dialog */}
      {selectedCase && (
        <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
          <DialogContent>
            <DialogTitle className="sr-only">
              Vista Ampliada - {selectedCase.title}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Imagen ampliada del caso de tratamiento de onicoplastia
            </DialogDescription>
            <div className="w-full aspect-square">
              <img
                src={selectedCase[`${selectedImage}Image`]}
                alt={`Vista ampliada - ${selectedCase.title}`}
                className="w-full h-full object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* FAQ Section */}
      <section className="container max-w-3xl">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Preguntas Frecuentes
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>¿Cuánto dura el tratamiento?</AccordionTrigger>
            <AccordionContent>
              El tratamiento es progresivo y personalizado. Se realizan sesiones cada 45 días
              aproximadamente, y la duración total dependerá del estado inicial de tus uñas
              y tu respuesta al tratamiento.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>¿Es doloroso el procedimiento?</AccordionTrigger>
            <AccordionContent>
              No, el procedimiento es completamente indoloro y no invasivo. Utilizamos
              técnicas y productos especializados que respetan la integridad de tus uñas.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>¿Puedo aplicar esmalte durante el tratamiento?</AccordionTrigger>
            <AccordionContent>
              ¡Sí! Nuestro tratamiento es compatible con decoraciones como acrílico o gel.
              Sin embargo, es importante seguir las recomendaciones específicas de cuidado
              que te daremos en cada sesión.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>¿Cuándo veré resultados?</AccordionTrigger>
            <AccordionContent>
              Verás mejoras visibles desde la primera sesión. Sin embargo, para obtener
              resultados óptimos y duraderos, es importante completar el tratamiento según
              el plan personalizado que diseñaremos para ti.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 bg-primary/5 rounded-lg max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">
          ¿Lista para transformar tus uñas?
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Da el primer paso hacia uñas más saludables y hermosas.
        </p>
        <a
          href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Button size="lg" className="text-lg">
            ¡Reserva tu Evaluación Inicial!
          </Button>
        </a>
      </section>
    </div>
  );
}