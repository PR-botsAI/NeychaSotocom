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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-12 md:py-16 text-center" aria-labelledby="hero-heading">
        <div className="container mx-auto max-w-4xl">
          <h1 id="hero-heading" className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight">
            Onicoplastia Profesional
          </h1>
          <p className="mt-6 text-base md:text-lg leading-7 text-muted-foreground mx-auto">
            Como profesional certificada en IBX y RN, me dedico a ayudarte a recuperar la salud 
            de tus uñas. Nuestra misión es brindarte un tratamiento efectivo y accesible, 
            educándote en cada paso del proceso para que juntos superemos los problemas de hongos.
          </p>
        </div>
      </section>

      {/* Comprehensive Benefits Section */}
      <section className="px-4 py-8 md:py-12 bg-gradient-to-b from-primary/5 to-background" aria-labelledby="comprehensive-benefits">
        <div className="container mx-auto max-w-6xl">
          <h2 id="comprehensive-benefits" className="text-2xl md:text-3xl font-bold text-center mb-4">
            Beneficios del Tratamiento de Onicoplastia
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-base md:text-lg">
            Más que una mejora estética, es un tratamiento médico profesional que restaura la salud integral de tus uñas
            y te devuelve la confianza para disfrutar plenamente de la vida en la isla.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {/* Health Benefits */}
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">🦶</span>
                  Salud Integral
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-xs mt-1">✓</span>
                    <span>Eliminación completa de hongos y bacterias</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-xs mt-1">✓</span>
                    <span>Prevención de infecciones recurrentes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-xs mt-1">✓</span>
                    <span>Mejora en la estructura y grosor de la uña</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-xs mt-1">✓</span>
                    <span>Reducción de dolor y molestias</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Aesthetic Benefits */}
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">✨</span>
                  Belleza Natural
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-xs mt-1">✓</span>
                    <span>Apariencia natural desde la primera sesión</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-xs mt-1">✓</span>
                    <span>Acabado en GEL Polish incluido</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-xs mt-1">✓</span>
                    <span>Libertad para usar zapatos abiertos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-xs mt-1">✓</span>
                    <span>Confianza para caminar en la playa</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Lifestyle Benefits */}
            <Card className="group hover:shadow-lg transition-all duration-300 md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">🌴</span>
                  Vida Plena
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-xs mt-1">✓</span>
                    <span>Disfruta plenamente de actividades acuáticas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-xs mt-1">✓</span>
                    <span>Usa sandalias sin preocupaciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-xs mt-1">✓</span>
                    <span>Participa en eventos sociales con confianza</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-xs mt-1">✓</span>
                    <span>Mejora tu autoestima y bienestar</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Special Puerto Rico Section */}
          <Card className="bg-gradient-to-r from-blue-50/50 to-green-50/50 border-blue-200/50">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-xl">
                <span className="text-2xl">🏝️</span>
                Un Problema Real en Puerto Rico
              </CardTitle>
              <CardDescription className="text-base">
                Comprende por qué los hongos en las uñas son tan comunes en nuestra isla
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center max-w-4xl mx-auto">
                <p className="text-sm md:text-base leading-relaxed mb-6">
                  En Puerto Rico, <strong>la alta humedad, el clima tropical y nuestro estilo de vida playero</strong> 
                  crean las condiciones perfectas para el desarrollo de hongos en las uñas. <strong>No estás sola en esta situación</strong> - 
                  es una realidad que afecta a miles de personas en la isla debido a nuestro ambiente natural.
                </p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-3 text-center">
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-blue-600">85% Humedad</div>
                  <p className="text-xs text-muted-foreground">Ambiente ideal para hongos</p>
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-green-600">28°C Promedio</div>
                  <p className="text-xs text-muted-foreground">Temperatura constante tropical</p>
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-blue-500">Estilo Playero</div>
                  <p className="text-xs text-muted-foreground">Exposición frecuente a humedad</p>
                </div>
              </div>

              <div className="bg-white/50 p-4 rounded-lg border border-blue-200/30">
                <p className="text-sm leading-relaxed text-center">
                  <strong>Como RN certificada y especialista en IBX®</strong>, entiendo completamente este desafío. 
                  Mi experiencia médica me permite tratar no solo los síntomas, sino las causas fundamentales, 
                  ofreciéndote un plan integral adaptado a nuestro clima tropical.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Treatment Description Section */}
      <section className="px-4 py-8 md:py-12" aria-labelledby="benefits-heading">
        <div className="container mx-auto max-w-5xl">
          <h2 id="benefits-heading" className="sr-only">Beneficios y Primera Sesión</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-primary/5">
              <CardHeader>
                <CardTitle>Nuestro Compromiso</CardTitle>
                <CardDescription>Atención profesional y cercana</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3" role="list">
                  <li className="flex items-start gap-2">
                    <span className="text-primary" aria-hidden="true">✓</span>
                    <span>Atención profesional certificada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary" aria-hidden="true">✓</span>
                    <span>Ambiente acogedor y tranquilo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary" aria-hidden="true">✓</span>
                    <span>Explicación clara de cada paso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary" aria-hidden="true">✓</span>
                    <span>Acompañamiento durante el proceso</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-primary/5">
              <CardHeader>
                <CardTitle>Tu Primera Visita: Paso a Paso</CardTitle>
                <CardDescription>Un proceso cómodo, profesional y completamente indoloro</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Reassurance Section */}
                <div className="bg-green-50/50 p-4 rounded-lg border border-green-200/50">
                  <p className="text-sm leading-relaxed text-center">
                    <strong>💚 Siéntete tranquila</strong> - Este es un espacio seguro donde miles de personas han encontrado 
                    la solución. No hay nada de qué avergonzarse, y te acompañaré en cada paso del proceso.
                  </p>
                </div>

                {/* Detailed Process */}
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold">Evaluación Inicial Completa (15-20 min)</h4>
                      <p className="text-sm text-muted-foreground">
                        Conversamos sobre tu historial, evaluamos el estado actual de tus uñas y creamos un plan personalizado. 
                        <strong>Todo en un ambiente confidencial y profesional.</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold">Preparación y Limpieza Profesional (10-15 min)</h4>
                      <p className="text-sm text-muted-foreground">
                        Eliminamos cuidadosamente las áreas afectadas usando herramientas esterilizadas. 
                        <strong>Es completamente indoloro</strong> - similar a un manicure regular.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold">Aplicación de Prótesis Hipoalergénica (20-25 min)</h4>
                      <p className="text-sm text-muted-foreground">
                        Reconstruimos tu uña con material especializado que luce completamente natural. 
                        <strong>Podrás usar zapatos abiertos inmediatamente.</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold">Acabado con GEL Polish + Plan de Seguimiento (15 min)</h4>
                      <p className="text-sm text-muted-foreground">
                        Aplicamos GEL Polish en el color de tu preferencia (incluido en el precio) y diseñamos 
                        tu plan de tratamiento personalizado para las próximas sesiones.
                      </p>
                    </div>
                  </div>
                </div>

                {/* What to bring section */}
                <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-200/50">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span className="text-blue-600">📋</span>
                    Para tu evaluación, necesitamos:
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 text-xs mt-1">📸</span>
                      <span>Fotos de las uñas afectadas (indica cuántas uñas están dañadas)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 text-xs mt-1">📝</span>
                      <span>Información sobre cuándo y por qué comenzó el problema</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 text-xs mt-1">⚠️</span>
                      <span>Cualquier alergia que debamos tener en cuenta</span>
                    </li>
                  </ul>
                </div>

                {/* Duration and results */}
                <div className="text-center bg-gradient-to-r from-green-50/30 to-blue-50/30 p-4 rounded-lg">
                  <p className="text-sm font-medium">
                    ⏱️ <strong>Duración total:</strong> 60-75 minutos<br/>
                    ✨ <strong>Resultados:</strong> Inmediatos y visibles desde el primer día
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="px-4 py-8 md:py-12" aria-labelledby="transformations-heading">
        <div className="container mx-auto max-w-6xl">
          <h2 id="transformations-heading" className="text-2xl font-semibold mb-6 text-center">
            Transformaciones Reales
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Descubre cómo hemos ayudado a nuestros clientes a recuperar la salud de sus uñas
            y su confianza. Cada caso recibe un tratamiento personalizado.
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
                            {case_.id === 1 && "¡Descubre cómo podemos ayudarte a recuperar la salud natural de tus uñas!"}
                            {case_.id === 2 && "Un tratamiento seguro y efectivo que respeta la salud de tus uñas."}
                            {case_.id === 3 && "La belleza natural de tus uñas está más cerca de lo que piensas."}
                            {case_.id === 4 && "Únete a nuestros clientes satisfechos con resultados reales."}
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
            {selectedCase?.description || "Detalles del tratamiento de onicoplastia"}
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

      {/* Reassurance Section */}
      <section className="px-4 py-8 md:py-12 bg-gradient-to-b from-primary/3 to-background" aria-labelledby="reassurance-heading">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-pink-50/50 to-purple-50/50 border-pink-200/50">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl md:text-3xl font-bold">
                💜 Un Mensaje de Corazón
              </CardTitle>
              <CardDescription className="text-base md:text-lg">
                Para todas las mujeres que han sentido vergüenza por el estado de sus uñas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="max-w-3xl mx-auto space-y-4 text-center">
                <p className="text-base leading-relaxed">
                  <strong>Entiendo perfectamente lo que sientes.</strong> Como enfermera registrada y especialista certificada, 
                  he visto a cientos de mujeres que llegaron aquí sintiéndose avergonzadas, escondiéndose bajo zapatos cerrados, 
                  evitando la playa o las reuniones familiares.
                </p>
                
                <p className="text-base leading-relaxed">
                  <strong>Quiero que sepas que esto NO es tu culpa.</strong> Los hongos en las uñas son increíblemente comunes en Puerto Rico 
                  - nuestra humedad constante, el estilo de vida playero y el clima tropical hacen que sea una realidad para miles de mujeres. 
                  Es una condición médica legítima, no algo de lo que avergonzarse.
                </p>

                <div className="bg-white/60 p-6 rounded-lg border border-pink-200/30 my-6">
                  <p className="font-semibold text-lg mb-3">Tu transformación comienza aquí</p>
                  <p className="text-sm leading-relaxed">
                    En este espacio seguro y profesional, miles de mujeres han recuperado no solo la salud de sus uñas, 
                    sino también su confianza. <strong>Desde la primera sesión saldrás con uñas hermosas</strong>, 
                    listas para cualquier ocasión especial o simplemente para sentirte bien contigo misma.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 text-left">
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="text-pink-500">🤗</span>
                      Ambiente de Confianza
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Consulta privada y confidencial</li>
                      <li>• Ambiente relajado y acogedor</li>
                      <li>• Sin juicios, solo apoyo profesional</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="text-purple-500">🎯</span>
                      Resultados Garantizados
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Mejora visible desde el día uno</li>
                      <li>• Tratamiento médico profesional</li>
                      <li>• Plan personalizado para tu caso</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-8 md:py-12" aria-labelledby="faq-heading">
        <div className="container mx-auto max-w-3xl">
          <h2 id="faq-heading" className="text-2xl font-semibold mb-8 text-center">
            Preguntas Frecuentes
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>¿Qué incluye la primera sesión?</AccordionTrigger>
              <AccordionContent>
                En tu primera visita realizamos una limpieza completa y detallada, eliminando toda el área afectada 
                por hongos. Luego reconstruimos tu uña con nuestra prótesis hipoalergénica, permitiéndote lucir 
                zapatos abiertos inmediatamente. También diseñamos un plan de tratamiento personalizado para 
                continuar combatiendo el hongo en sesiones posteriores.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>¿Cuánto dura el tratamiento completo?</AccordionTrigger>
              <AccordionContent>
                La transformación estética es inmediata desde la primera sesión gracias a nuestra prótesis 
                hipoalergénica. El tratamiento posterior para combatir el hongo requiere sesiones adicionales 
                cada 45 días, y su duración dependerá de la severidad del caso. En cada sesión evaluamos el 
                progreso y ajustamos el tratamiento según sea necesario.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>¿Es doloroso el procedimiento?</AccordionTrigger>
              <AccordionContent>
                No, el procedimiento es completamente indoloro y no invasivo. Utilizamos
                técnicas y productos especializados que respetan la integridad de tus uñas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>¿Puedo usar zapatos abiertos después de la primera sesión?</AccordionTrigger>
              <AccordionContent>
                ¡Sí! Gracias a nuestra prótesis hipoalergénica, podrás lucir zapatos abiertos 
                desde la primera sesión. Mientras tanto, continuaremos con el tratamiento para 
                eliminar los hongos de manera progresiva y efectiva.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>¿Cuándo veré resultados?</AccordionTrigger>
              <AccordionContent>
                ¡Los resultados estéticos son inmediatos desde la primera sesión! Podrás lucir 
                zapatos abiertos el mismo día gracias a nuestra prótesis hipoalergénica. El 
                tratamiento completo para eliminar los hongos continuará en las siguientes 
                sesiones para asegurar resultados duraderos.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>¿Por qué los hongos son tan comunes en Puerto Rico?</AccordionTrigger>
              <AccordionContent>
                Nuestro clima tropical con 85% de humedad constante, temperaturas cálidas y el estilo de vida playero 
                crean las condiciones perfectas para el desarrollo de hongos. La exposición frecuente a la arena, 
                piscinas y duchas públicas, combinado con el uso de zapatos cerrados con pies húmedos, hace que 
                este sea un problema muy común en la isla. Como RN certificada, entiendo estos factores ambientales 
                y adapto el tratamiento específicamente para nuestro clima.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>¿Qué está incluido en el precio del tratamiento?</AccordionTrigger>
              <AccordionContent>
                Tu tratamiento de onicoplastia incluye: evaluación personalizada completa, limpieza profunda 
                y eliminación de áreas afectadas, aplicación de prótesis hipoalergénica, y acabado profesional 
                con GEL Polish en 1 color de tu elección - todo incluido en el precio. No hay costos adicionales 
                sorpresa. También recibes un plan de tratamiento personalizado para las siguientes sesiones.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>¿Es normal sentir vergüenza por esta condición?</AccordionTrigger>
              <AccordionContent>
                Absolutamente sí, y es completamente comprensible. Muchas de mis clientas han llegado sintiéndose 
                así - escondiéndose bajo zapatos cerrados, evitando actividades sociales. Como profesional de la salud, 
                quiero asegurarte que los hongos en las uñas son una condición médica muy común, especialmente en 
                nuestro clima. No es cuestión de higiene personal. Este es un espacio seguro donde recibirás el 
                cuidado profesional que mereces, sin juicios, solo apoyo y resultados.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger>¿Qué hace que este tratamiento sea diferente?</AccordionTrigger>
              <AccordionContent>
                Como enfermera registrada (RN) y especialista certificada en IBX®, combino conocimientos médicos 
                profundos con técnicas especializadas de restauración ungueal. Mi enfoque no solo trata los síntomas 
                visibles, sino que aborda las causas fundamentales adaptándose a nuestro clima tropical. Además, 
                cada tratamiento incluye educación sobre prevención específica para Puerto Rico, garantizando 
                resultados duraderos y tu bienestar integral.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-10">
              <AccordionTrigger>¿Cómo funciona el seguimiento después de la primera sesión?</AccordionTrigger>
              <AccordionContent>
                Después de tu primera transformación, programamos citas de seguimiento cada 45 días para reforzar el progreso. 
                En cada sesión eliminamos cualquier residuo, evaluamos la recuperación y ajustamos el tratamiento según sea necesario. 
                Si pasan más de 45 días desde tu última visita, realizaremos una nueva evaluación inicial para adaptar 
                el tratamiento al estado actual de tus uñas y garantizar los mejores resultados.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-11">
              <AccordionTrigger>¿Puedo hacer actividades normales después del tratamiento?</AccordionTrigger>
              <AccordionContent>
                ¡Absolutamente! Una de las grandes ventajas de nuestro tratamiento es que no hay tiempo de recuperación. 
                Desde la primera sesión puedes usar zapatos abiertos, ir a la playa, hacer ejercicio y continuar con 
                todas tus actividades normales. La prótesis hipoalergénica es resistente y duradera, diseñada 
                específicamente para soportar nuestro estilo de vida activo en Puerto Rico.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="px-4 py-12" aria-labelledby="cta-heading">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 md:p-12">
            <div className="text-center mb-8">
              <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold mb-4">
                ¿Lista para Recuperar la Confianza en tus Uñas?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Miles de mujeres en Puerto Rico ya han transformado sus vidas con nuestro tratamiento profesional. 
                Es tu momento de brillar con confianza.
              </p>
            </div>

            {/* Treatment Highlights */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <div className="text-2xl mb-2">💎</div>
                <p className="text-sm font-semibold">GEL Polish Incluido</p>
                <p className="text-xs text-muted-foreground">En el color que elijas</p>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <div className="text-2xl mb-2">⚡</div>
                <p className="text-sm font-semibold">Resultados Inmediatos</p>
                <p className="text-xs text-muted-foreground">Desde la primera sesión</p>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <div className="text-2xl mb-2">🩺</div>
                <p className="text-sm font-semibold">RN + IBX® Certificada</p>
                <p className="text-xs text-muted-foreground">Experiencia médica profesional</p>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <div className="text-2xl mb-2">😌</div>
                <p className="text-sm font-semibold">Completamente Indoloro</p>
                <p className="text-xs text-muted-foreground">Sin molestias ni dolor</p>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-yellow-50/50 border border-yellow-200/50 rounded-lg p-4 mb-8">
              <p className="text-center text-sm leading-relaxed">
                <strong>📌 Recordatorio Importante:</strong> Todos los clientes deben pasar por una evaluación inicial, 
                sin importar la condición de sus uñas. Esta primera cita es esencial para determinar el mejor plan de cuidado 
                y garantizar resultados óptimos adaptados a tu caso específico.
              </p>
            </div>

            {/* Call to Action */}
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <p className="text-lg font-semibold">
                  🌟 Transforma tu Vida Hoy Mismo
                </p>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  No permitas que los hongos en las uñas limiten tu libertad. Da el primer paso hacia uñas saludables 
                  y la confianza que mereces para disfrutar plenamente de nuestra hermosa isla.
                </p>
              </div>
              
              <Button
                size="lg"
                className="text-lg px-8 py-4 h-auto"
                asChild
              >
                <a
                  href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Reservar evaluación inicial en Booksy"
                >
                  ¡Reserva tu Evaluación Inicial!
                </a>
              </Button>

              <p className="text-xs text-muted-foreground">
                💬 ¿Tienes preguntas? Envíame un WhatsApp al +1 939-429-0292<br/>
                📍 Clínica ubicada en Hatillo, Puerto Rico
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}