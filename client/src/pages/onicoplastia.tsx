import { useState, useEffect } from "react";
import type { Case } from "@/types/schema";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cases } from "@/data/cases";

type ImageType = "before" | "after" | "collage";

export default function Onicoplastia() {
  const [selectedImage, setSelectedImage] = useState<ImageType>("before");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [imageError, setImageError] = useState<Record<string, { error: boolean; message: string }>>({});

  const onicoplastiaCases = cases.filter(c => c.category === "onicoplastia");

  // Debug logs for image paths
  useEffect(() => {
    console.log('Current cases:', onicoplastiaCases.map(c => ({
      id: c.id,
      beforeImage: c.beforeImage,
      afterImage: c.afterImage,
      collageImage: c.collageImage
    })));
  }, []);

  const handleImageClick = (type: ImageType) => {
    setSelectedImage(type);
  };

  const handleImageError = (caseId: number, imageType: string) => {
    console.error(`Failed to load image for case ${caseId}, type: ${imageType}`);
    setImageError(prev => ({
      ...prev,
      [`${caseId}-${imageType}`]: {
        error: true,
        message: `No se pudo cargar la imagen ${
          imageType === "before" ? "inicial" : 
          imageType === "after" ? "final" : "del proceso"
        }`
      }
    }));
  };

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
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {onicoplastiaCases.map((case_) => (
              <CarouselItem key={case_.id} className="cursor-default select-none">
                <Card>
                  <CardHeader>
                    <CardTitle>{case_.title}</CardTitle>
                    <CardDescription>{case_.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-center gap-4">
                        <Button
                          variant={selectedImage === "before" ? "default" : "outline"}
                          onClick={() => handleImageClick("before")}
                          className="min-w-[100px] select-none"
                        >
                          Antes
                        </Button>
                        <Button
                          variant={selectedImage === "after" ? "default" : "outline"}
                          onClick={() => handleImageClick("after")}
                          className="min-w-[100px] select-none"
                        >
                          Después
                        </Button>
                        <Button
                          variant={selectedImage === "collage" ? "default" : "outline"}
                          onClick={() => handleImageClick("collage")}
                          className="min-w-[100px] select-none"
                        >
                          Proceso
                        </Button>
                      </div>

                      <div 
                        className="aspect-square w-full overflow-hidden rounded-md select-none relative"
                        onClick={() => !imageError[`${case_.id}-${selectedImage}`]?.error && setSelectedCase(case_)}
                        onDragStart={(e) => e.preventDefault()}
                        onMouseDown={(e) => e.preventDefault()}
                        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Ver detalle de ${case_.title}`}
                      >
                        {imageError[`${case_.id}-${selectedImage}`]?.error ? (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-black/5 p-4">
                            <p className="text-sm text-muted-foreground text-center">
                              {imageError[`${case_.id}-${selectedImage}`]?.message}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Reset error and retry loading
                                setImageError(prev => {
                                  const newState = { ...prev };
                                  delete newState[`${case_.id}-${selectedImage}`];
                                  return newState;
                                });
                              }}
                            >
                              Reintentar
                            </Button>
                          </div>
                        ) : (
                          <img
                            src={case_[`${selectedImage}Image`]}
                            alt={`${
                              selectedImage === "before"
                                ? "Estado inicial antes del tratamiento"
                                : selectedImage === "after"
                                ? "Resultado final después del tratamiento"
                                : "Proceso completo del tratamiento"
                            } - ${case_.title}`}
                            className="w-full h-full object-contain bg-black/5"
                            draggable="false"
                            onError={() => handleImageError(case_.id, selectedImage)}
                          />
                        )}
                      </div>
                    </div>
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
      <Dialog
        open={!!selectedCase}
        onOpenChange={(open) => !open && setSelectedCase(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogTitle>
            {selectedCase?.title}
          </DialogTitle>
          <DialogDescription>
            {selectedCase?.description}
          </DialogDescription>
          <div className="w-full aspect-square select-none">
            <img
              src={selectedCase?.[`${selectedImage}Image`]}
              alt={`${
                selectedImage === "before"
                  ? "Estado inicial antes del tratamiento"
                  : selectedImage === "after"
                  ? "Resultado final después del tratamiento"
                  : "Proceso completo del tratamiento"
              } - ${selectedCase?.title}`}
              className="w-full h-full object-contain"
              draggable="false"
            />
          </div>
        </DialogContent>
      </Dialog>

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