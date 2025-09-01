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
import { Calendar, MessageCircle } from "lucide-react";
import { cases } from "@/data/cases";

type ImageType = "before" | "after" | "collage";

export default function Onicoplastia() {
  const [selectedImages, setSelectedImages] = useState<Record<number, ImageType>>({});
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const onicoplastiaCases = cases.filter(c => c.category === "onicoplastia");

  const handleImageClick = (caseId: number, type: ImageType) => {
    setSelectedImages(prev => ({
      ...prev,
      [caseId]: type
    }));
  };

  const getSelectedImage = (caseId: number): ImageType => {
    return selectedImages[caseId] || "before";
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-12">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Onicoplastia Profesional
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Tratamiento preventivo especializado para restaurar uñas afectadas por hongos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <a
                  href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Reservar Cita
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://wa.me/19394290292" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Consulta WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After Gallery - VISUAL FIRST */}
      <section className="px-4 py-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            Transformaciones Reales en Puerto Rico
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Desliza para ver más casos de éxito
          </p>

          <div className="relative">
            <Carousel
              setApi={setApi}
              className="w-full max-w-5xl mx-auto"
              opts={{
                loop: true,
                dragFree: true,
                skipSnaps: false,
              }}
            >
              <CarouselContent>
                {onicoplastiaCases.map((case_) => {
                  const currentImage = getSelectedImage(case_.id);
                  return (
                    <CarouselItem key={case_.id}>
                      <Card>
                        <CardHeader className="pb-4">
                          <CardTitle className="text-xl">{case_.title}</CardTitle>
                          <CardDescription>{case_.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-center gap-4 mb-4">
                            <Button
                              variant={currentImage === "before" ? "default" : "outline"}
                              onClick={() => handleImageClick(case_.id, "before")}
                              size="sm"
                            >
                              Antes
                            </Button>
                            <Button
                              variant={currentImage === "after" ? "default" : "outline"}
                              onClick={() => handleImageClick(case_.id, "after")}
                              size="sm"
                            >
                              Después
                            </Button>
                            <Button
                              variant={currentImage === "collage" ? "default" : "outline"}
                              onClick={() => handleImageClick(case_.id, "collage")}
                              size="sm"
                            >
                              Proceso
                            </Button>
                          </div>

                          <div
                            className="aspect-square w-full overflow-hidden rounded-md relative"
                            onClick={() => !imageError[`${case_.id}-${currentImage}`] && setSelectedCase(case_)}
                          >
                            {imageError[`${case_.id}-${currentImage}`] ? (
                              <div className="w-full h-full flex items-center justify-center bg-black/5">
                                <p className="text-sm text-muted-foreground">
                                  Imagen no disponible
                                </p>
                              </div>
                            ) : (
                              <img
                                src={case_[`${currentImage}Image`]}
                                alt={`${currentImage === "before" ? "Antes" : currentImage === "after" ? "Después" : "Proceso"} - ${case_.title}`}
                                className="w-full h-full object-contain bg-black/5 cursor-pointer hover:scale-105 transition-transform"
                                onError={() => handleImageError(case_.id, currentImage)}
                              />
                            )}
                          </div>

                          {case_.highlights && (
                            <div className="mt-4 space-y-2">
                              {case_.highlights.map((highlight, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <span className="text-primary text-sm">✓</span>
                                  <span className="text-sm">{highlight}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    className={`h-[3px] rounded-full transition-all ${
                      index === current
                        ? "bg-primary w-8"
                        : "bg-primary/30 w-4"
                    }`}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Ir a caso ${index + 1}`}
                  />
                ))}
              </div>

              <div className="absolute -left-4 -right-4 top-1/2 hidden md:flex justify-between -translate-y-1/2">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Why Puerto Rico - Concise */}
      <section className="px-4 py-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-blue-50/50 to-green-50/50 border-blue-200/50">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">
                🏝️ ¿Por qué es tan común en Puerto Rico?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 text-center mb-4">
                <div>
                  <div className="text-lg font-semibold text-blue-600">85% Humedad</div>
                  <p className="text-xs">Ambiente ideal para hongos</p>
                </div>
                <div>
                  <div className="text-lg font-semibold text-green-600">Clima Tropical</div>
                  <p className="text-xs">28°C constante todo el año</p>
                </div>
                <div>
                  <div className="text-lg font-semibold text-blue-500">Vida Playera</div>
                  <p className="text-xs">Exposición frecuente a humedad</p>
                </div>
              </div>
              <p className="text-sm text-center">
                <strong>No es tu culpa</strong> - Miles de personas en la isla enfrentan este problema. 
                Como especialista certificada IBX® y RN, tengo la solución adaptada a nuestro clima.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What to Expect - Strategic and Concise */}
      <section className="px-4 py-8">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-8">
            Tu Primera Visita - Qué Esperar
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>✨ Transformación Inmediata</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="text-primary font-bold">1.</span>
                    <div>
                      <p className="font-semibold">Evaluación Detallada (20 min)</p>
                      <p className="text-sm text-muted-foreground">Analizamos tu caso específico y planificamos el tratamiento</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary font-bold">2.</span>
                    <div>
                      <p className="font-semibold">Limpieza y Preparación (25 min)</p>
                      <p className="text-sm text-muted-foreground">Removemos áreas afectadas y preparamos la uña - sin dolor</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary font-bold">3.</span>
                    <div>
                      <p className="font-semibold">Proceso IBX® y Reconstrucción (30 min)</p>
                      <p className="text-sm text-muted-foreground">Sellamos, aplicamos primer y prótesis hipoalergénica anti-humedad</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary font-bold">4.</span>
                    <div>
                      <p className="font-semibold">Acabado con GEL Polish (15 min)</p>
                      <p className="text-sm text-muted-foreground">Aplicación profesional en el color de tu elección - incluido</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>💚 Lo Que Incluye</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Evaluación personalizada completa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Remoción del área afectada y sellado IBX®</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Prótesis hipoalergénica anti-humedad que elimina el ambiente ideal para hongos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>GEL Polish en 1 color (valor $25)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Plan de tratamiento personalizado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Seguimiento cada 45 días</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-yellow-50/50 rounded-lg">
                  <p className="text-sm font-semibold">⏱️ Duración: 90 minutos (1.5 horas)</p>
                  <p className="text-sm">💎 Sales con uñas perfectas el mismo día</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ - Only Essential Questions */}
      <section className="px-4 py-8">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Preguntas Frecuentes
          </h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>¿Es doloroso el procedimiento?</AccordionTrigger>
              <AccordionContent>
                No, es completamente indoloro. Similar a un manicure regular. Utilizamos técnicas 
                profesionales que no causan molestias.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>¿Puedo usar zapatos abiertos inmediatamente?</AccordionTrigger>
              <AccordionContent>
                ¡Sí! Desde la primera sesión sales con uñas hermosas gracias a la prótesis 
                hipoalergénica y el GEL Polish incluido. Listas para lucir.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>¿Cuánto dura el tratamiento completo?</AccordionTrigger>
              <AccordionContent>
                La transformación estética es inmediata. El tratamiento preventivo continúa con 
                sesiones cada 45 días. La cantidad de visitas depende del caso específico, las uñas 
                afectadas y el nivel de afectación. Cada persona es diferente.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>¿Qué incluye el precio?</AccordionTrigger>
              <AccordionContent>
                Primera evaluación $75 incluye: limpieza profunda, remoción de áreas afectadas, 
                proceso IBX® de sellado, prótesis hipoalergénica anti-humedad, GEL Polish en el 
                color que elijas y plan personalizado. Seguimientos $40-50.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>¿Cómo funciona el tratamiento?</AccordionTrigger>
              <AccordionContent>
                Removemos el área afectada, sellamos con IBX® y aplicamos una prótesis hipoalergénica 
                con función anti-humedad. Esto elimina el ambiente perfecto para que vivan los hongos, 
                atacando el problema desde la raíz. Como RN certificada en IBX®, adapto el tratamiento 
                al clima húmedo de Puerto Rico.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Strong CTA */}
      <section className="px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Lista para Transformar tus Uñas?
            </h2>
            <p className="text-lg mb-6">
              No dejes que los hongos limiten tu vida. Recupera la confianza hoy.
            </p>
            
            <div className="grid gap-3 md:grid-cols-4 mb-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl mb-1">💎</div>
                <p className="text-xs font-semibold">GEL Polish Incluido</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">⚡</div>
                <p className="text-xs font-semibold">Resultados Inmediatos</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🩺</div>
                <p className="text-xs font-semibold">IBX® Certificada</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">😌</div>
                <p className="text-xs font-semibold">Sin Dolor</p>
              </div>
            </div>

            <Button size="lg" className="text-lg px-8" asChild>
              <a
                href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
                target="_blank"
                rel="noopener noreferrer"
              >
                ¡RESERVA TU EVALUACIÓN AHORA!
              </a>
            </Button>
            
            <p className="text-sm text-muted-foreground mt-6">
              📍 Hatillo, Puerto Rico • 💬 WhatsApp: +1 939-429-0292
            </p>
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
            {selectedCase?.title || "Vista detallada"}
          </DialogTitle>
          <DialogDescription>
            {selectedCase?.description}
          </DialogDescription>
          <div className="w-full aspect-square">
            <img
              src={selectedCase?.[`${getSelectedImage(selectedCase?.id || 0)}Image`]}
              alt={`${getSelectedImage(selectedCase?.id || 0) === "before" ? "Antes" : getSelectedImage(selectedCase?.id || 0) === "after" ? "Después" : "Proceso"}`}
              className="w-full h-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}