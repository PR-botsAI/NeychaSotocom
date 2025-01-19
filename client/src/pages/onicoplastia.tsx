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
  CarouselPrevious,
  type CarouselApi
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
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [showGuide, setShowGuide] = useState(true);

  const onicoplastiaCases = cases.filter(c => c.category === "onicoplastia");

  const handleImageClick = (type: ImageType) => {
    setSelectedImage(type);
  };

  const handleImageError = (caseId: number, imageType: string) => {
    setImageError(prev => ({
      ...prev,
      [`${caseId}-${imageType}`]: true
    }));
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-hide guide after first interaction
  useEffect(() => {
    const timer = setTimeout(() => setShowGuide(false), 5000);
    return () => clearTimeout(timer);
  }, []);

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
      <section className="container max-w-6xl relative" aria-labelledby="transformations-heading">
        <h2 id="transformations-heading" className="text-2xl font-semibold mb-8 text-center">
          Transformaciones Reales
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Descubre cómo hemos ayudado a nuestras pacientes a recuperar la salud de sus uñas
          y su confianza. Cada caso es único y recibe un tratamiento personalizado.
        </p>

        <div className="relative">
          <Carousel
            setApi={setApi}
            className="w-full max-w-5xl mx-auto"
            opts={{
              loop: true,
              dragFree: true,
              skipSnaps: false,
              inViewThreshold: 0.5,
            }}
          >
            <CarouselContent>
              {onicoplastiaCases.map((case_, index) => (
                <CarouselItem key={case_.id} className="cursor-pointer select-none">
                  <Card className="transform transition-all duration-300 hover:scale-[1.02]">
                    <CardHeader>
                      <CardTitle className="text-xl">{case_.title}</CardTitle>
                      <CardDescription className="text-sm">{case_.description}</CardDescription>

                      {/* Highlights Section */}
                      <div className="mt-4 space-y-2">
                        {case_.highlights?.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span className="text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Image Selection Buttons */}
                      <div className="flex justify-center gap-4">
                        <Button
                          variant={selectedImage === "before" ? "default" : "outline"}
                          onClick={() => handleImageClick("before")}
                          className="min-w-[100px] select-none transition-all duration-200 hover:scale-105"
                        >
                          Antes
                        </Button>
                        <Button
                          variant={selectedImage === "after" ? "default" : "outline"}
                          onClick={() => handleImageClick("after")}
                          className="min-w-[100px] select-none transition-all duration-200 hover:scale-105"
                        >
                          Después
                        </Button>
                        <Button
                          variant={selectedImage === "collage" ? "default" : "outline"}
                          onClick={() => handleImageClick("collage")}
                          className="min-w-[100px] select-none transition-all duration-200 hover:scale-105"
                        >
                          Proceso
                        </Button>
                      </div>

                      {/* Image Display Container */}
                      <div
                        className="aspect-square w-full overflow-hidden rounded-md select-none relative group"
                        onClick={() => !imageError[`${case_.id}-${selectedImage}`] && setSelectedCase(case_)}
                        onDragStart={(e) => e.preventDefault()}
                        onMouseDown={(e) => e.preventDefault()}
                        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Ver detalle de ${case_.title}`}
                      >
                        {/* Mobile Navigation Overlay */}
                        <div className="absolute inset-0 pointer-events-none md:hidden">
                          <div className="absolute left-0 inset-y-0 w-12 bg-gradient-to-r from-black/20 to-transparent animate-pulse" />
                          <div className="absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-black/20 to-transparent animate-pulse" />
                        </div>

                        {imageError[`${case_.id}-${selectedImage}`] ? (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-black/5 p-4">
                            <p className="text-sm text-muted-foreground text-center">
                              No se pudo cargar la imagen {
                                selectedImage === "before" ? "inicial" :
                                  selectedImage === "after" ? "final" : "del proceso"
                              }
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={(e) => {
                                e.stopPropagation();
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
                          <>
                            <img
                              src={case_[`${selectedImage}Image`]}
                              alt={`${
                                selectedImage === "before"
                                  ? "Estado inicial antes del tratamiento"
                                  : selectedImage === "after"
                                    ? "Resultado final después del tratamiento"
                                    : "Proceso completo del tratamiento"
                              } - ${case_.title}`}
                              className="w-full h-full object-contain bg-black/5 transition-transform duration-500 group-hover:scale-105"
                              draggable="false"
                              onError={() => handleImageError(case_.id, selectedImage)}
                            />

                            {/* Hover Overlay with Animation */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                              <p className="text-white text-sm font-medium px-6 py-3 rounded-lg bg-black/40 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                Toca para ampliar
                              </p>
                            </div>
                          </>
                        )}

                        {/* Initial Navigation Guide */}
                        {showGuide && index === current && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-500">
                            <div className="text-white text-center p-6 space-y-3 transform scale-95 hover:scale-100 transition-transform duration-300">
                              <div className="flex items-center justify-center gap-6">
                                <span className="text-xl animate-pulse">←</span>
                                <p className="text-sm font-medium bg-black/20 px-4 py-2 rounded-full">
                                  Desliza para explorar más casos
                                </p>
                                <span className="text-xl animate-pulse">→</span>
                              </div>
                              <p className="text-xs opacity-75">
                                Toca cualquier parte para comenzar
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Educational Note */}
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                        <p className="text-sm text-muted-foreground">
                          {case_.id === 1 && "¿Buscas una solución natural? Descubre cómo podemos ayudarte a recuperar la salud de tus uñas."}
                          {case_.id === 2 && "Un tratamiento seguro y efectivo que respeta la salud natural de tus uñas."}
                          {case_.id === 3 && "La belleza natural de tus uñas está más cerca de lo que piensas."}
                          {case_.id === 4 && "Cada día más personas descubren los beneficios de nuestro tratamiento especializado."}
                          {case_.id === 5 && "Un proceso natural y efectivo para recuperar la salud de tus uñas."}
                          {case_.id === 6 && "Transforma tus uñas con un tratamiento seguro y personalizado."}
                          {case_.id === 7 && "Descubre cómo nuestro método progresivo puede ayudarte."}
                          {case_.id === 8 && "Da el primer paso hacia uñas más saludables. ¡Te acompañamos en el proceso!"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Position Indicators */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    index === current
                      ? "bg-primary w-8 scale-y-150"
                      : "bg-primary/30 w-4 hover:bg-primary/50 hover:w-6"
                  }`}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Ir a caso ${index + 1} de ${count}`}
                />
              ))}
            </div>

            {/* Desktop Navigation Buttons */}
            <div className="absolute -left-4 -right-4 top-1/2 hidden md:flex justify-between items-center -translate-y-1/2">
              <CarouselPrevious
                variant="outline"
                className="relative left-0 top-0 translate-y-0 h-10 w-10 rounded-full bg-background/80 hover:bg-background transition-all duration-300 hover:scale-110"
                aria-label="Ver caso anterior"
              />
              <CarouselNext
                variant="outline"
                className="relative right-0 top-0 translate-y-0 h-10 w-10 rounded-full bg-background/80 hover:bg-background transition-all duration-300 hover:scale-110"
                aria-label="Ver siguiente caso"
              />
            </div>
          </Carousel>

          {/* Case Counter and CTA */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Caso {current + 1} de {count} • Explora nuestra galería de transformaciones
            </p>
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-2 group hover:bg-primary/5 transition-colors duration-300"
              onClick={() => api?.scrollNext()}
            >
              Ver más casos de éxito
              <span className="transition-all duration-300 group-hover:translate-x-2">→</span>
            </Button>
          </div>
        </div>
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