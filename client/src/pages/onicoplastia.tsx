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

  const { data: cases = [], isLoading, error } = useQuery<Case[]>({
    queryKey: ["/api/cases", { category: "onicoplastia" }],
  });

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]" role="alert">
        <p className="text-destructive">Error al cargar los casos. Por favor, intente más tarde.</p>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12" aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="text-4xl font-bold tracking-tight sm:text-6xl">
          Onicoplastia Profesional
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
          Transformamos uñas dañadas en uñas saludables y hermosas.
          Nuestro tratamiento profesional progresivo está diseñado para restaurar
          la salud y apariencia de tus uñas afectadas.
        </p>
      </section>

      {/* Treatment Description Section */}
      <section className="container max-w-5xl" aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="sr-only">Beneficios y Primera Sesión</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle>Beneficios del Tratamiento</CardTitle>
              <CardDescription>Ventajas de elegir nuestra Onicoplastia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3" role="list">
                <li className="flex items-start gap-2">
                  <span className="text-primary" aria-hidden="true">✓</span>
                  <span>Resultados visibles desde la primera sesión</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary" aria-hidden="true">✓</span>
                  <span>Procedimiento indoloro y no invasivo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary" aria-hidden="true">✓</span>
                  <span>Compatible con decoraciones (acrílico/gel)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary" aria-hidden="true">✓</span>
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
              <ul className="space-y-3" role="list">
                <li className="flex items-start gap-2">
                  <span className="text-primary" aria-hidden="true">1.</span>
                  <span>Evaluación personalizada completa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary" aria-hidden="true">2.</span>
                  <span>Limpieza y eliminación de áreas afectadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary" aria-hidden="true">3.</span>
                  <span>Plan de tratamiento personalizado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary" aria-hidden="true">4.</span>
                  <span>Recomendaciones para cuidado en casa</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="container max-w-6xl" aria-labelledby="transformations-heading">
        <h2 id="transformations-heading" className="text-2xl font-semibold mb-8 text-center">
          Transformaciones Reales
        </h2>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-muted-foreground">Cargando casos...</p>
          </div>
        ) : (
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
                            <button
                              onClick={() => {
                                setSelectedCase(case_);
                                setSelectedImage("before");
                              }}
                              className="w-full h-full"
                              aria-label={`Ver imagen antes del tratamiento - ${case_.title}`}
                            >
                              <img
                                src={case_.beforeImage}
                                alt={`Estado de las uñas antes del tratamiento - ${case_.title}`}
                                className="w-full h-full object-contain bg-black/5"
                              />
                            </button>
                          </div>
                        </TabsContent>
                        <TabsContent value="after">
                          <div className="aspect-square w-full overflow-hidden rounded-md">
                            <button
                              onClick={() => {
                                setSelectedCase(case_);
                                setSelectedImage("after");
                              }}
                              className="w-full h-full"
                              aria-label={`Ver imagen después del tratamiento - ${case_.title}`}
                            >
                              <img
                                src={case_.afterImage}
                                alt={`Resultado final después del tratamiento - ${case_.title}`}
                                className="w-full h-full object-contain bg-black/5"
                              />
                            </button>
                          </div>
                        </TabsContent>
                        <TabsContent value="collage">
                          <div className="aspect-square w-full overflow-hidden rounded-md">
                            <button
                              onClick={() => {
                                setSelectedCase(case_);
                                setSelectedImage("collage");
                              }}
                              className="w-full h-full"
                              aria-label={`Ver proceso del tratamiento - ${case_.title}`}
                            >
                              <img
                                src={case_.collageImage}
                                alt={`Proceso completo del tratamiento - ${case_.title}`}
                                className="w-full h-full object-contain bg-black/5"
                              />
                            </button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious aria-label="Ver caso anterior" />
            <CarouselNext aria-label="Ver siguiente caso" />
          </Carousel>
        )}
      </section>

      {/* Image Preview Dialog */}
      {selectedCase && (
        <Dialog 
          open={!!selectedCase} 
          onOpenChange={(open) => !open && setSelectedCase(null)}
        >
          <DialogContent className="max-w-3xl">
            <DialogTitle>
              {selectedCase.title}
            </DialogTitle>
            <DialogDescription>
              {selectedCase.description}
            </DialogDescription>
            <div className="w-full aspect-square">
              <img
                src={selectedCase[`${selectedImage}Image`]}
                alt={`${
                  selectedImage === "before"
                    ? "Estado inicial antes del tratamiento"
                    : selectedImage === "after"
                    ? "Resultado final después del tratamiento"
                    : "Proceso completo del tratamiento"
                } - ${selectedCase.title}`}
                className="w-full h-full object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* FAQ Section */}
      <section className="container max-w-3xl" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-semibold mb-8 text-center">
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
      <section className="text-center py-12 bg-primary/5 rounded-lg max-w-4xl mx-auto px-4" aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="text-3xl font-bold mb-6">
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
          aria-label="Reservar evaluación inicial en Booksy"
        >
          <Button size="lg" className="text-lg">
            ¡Reserva tu Evaluación Inicial!
          </Button>
        </a>
      </section>
    </div>
  );
}