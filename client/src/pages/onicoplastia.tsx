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
import { Calendar, MessageCircle, Clock, CheckCircle, Star, Sparkles, Heart, Shield } from "lucide-react";
import { cases } from "@/data/cases";
import ShopPromotion from "@/components/shop-promotion";

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
    <div className="min-h-screen bg-black text-white">
      {/* Elegant Hero Section */}
      <section className="relative px-4 py-24">
        <div className="container mx-auto max-w-4xl text-center">
          {/* Logo */}
          <div className="mb-12">
            <img 
              src="/assets/HeroLogoWhiteTrasparent.png" 
              alt="Neycha Soto" 
              className="h-24 mx-auto mb-6 opacity-90"
            />
            <p className="text-[#F2E6D8] text-sm uppercase tracking-widest mb-2">
              IBX® Certified • RN Profesional
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
            Onicoplastia <span className="text-[#F2E6D8]">Premium</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-300 font-light">
            Restauración profesional de uñas con tratamiento IBX®
          </p>
          
          {/* Before/After Preview - Moved to top */}
          <div className="mb-12">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <p className="text-[#F2E6D8] font-light mb-4">Antes</p>
                <div className="aspect-square rounded-lg overflow-hidden bg-zinc-900/30 border border-zinc-800">
                  <img 
                    src="/cases/Caso1_before.png" 
                    alt="Antes del tratamiento" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div>
                <p className="text-[#F2E6D8] font-light mb-4">Después</p>
                <div className="aspect-square rounded-lg overflow-hidden bg-zinc-900/30 border border-zinc-800">
                  <img 
                    src="/cases/Caso1_after.png" 
                    alt="Después del tratamiento" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
            <p className="text-gray-400 mt-6 font-light">Transformación real en una sola sesión</p>
          </div>
          
          {/* Elegant Service Details */}
          <div className="bg-zinc-900/30 backdrop-blur border border-zinc-800 p-8 rounded-lg mb-12 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="text-left">
                <p className="text-[#F2E6D8] font-light mb-2">Duración</p>
                <p className="text-lg">Hasta 2 horas</p>
              </div>
              <div className="text-left">
                <p className="text-[#F2E6D8] font-light mb-2">Inversión</p>
                <p className="text-lg">Primera evaluación: $100</p>
                <p className="text-sm text-gray-400">Seguimientos: $60</p>
              </div>
            </div>
            
            <div className="text-left space-y-3 pt-6 border-t border-zinc-800">
              <p className="text-[#F2E6D8] font-light mb-4">Incluye:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#F2E6D8]" />
                  <span className="text-gray-300">Evaluación completa y personalizada</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#F2E6D8]" />
                  <span className="text-gray-300">Tratamiento IBX® certificado</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#F2E6D8]" />
                  <span className="text-gray-300">Reconstrucción con prótesis especializada</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-[#F2E6D8]" />
                  <span className="text-gray-300">GEL Polish profesional incluido</span>
                </div>
              </div>
            </div>
          </div>

          <Button 
            size="lg" 
            className="bg-[#F2E6D8] hover:bg-[#E6D0B8] text-black font-light text-lg px-12 py-6" 
            asChild
          >
            <a
              href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
              target="_blank"
              rel="noopener noreferrer"
            >
              RESERVAR EVALUACIÓN
            </a>
          </Button>
          
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#F2E6D8]" />
              <span>37 reseñas 5 estrellas</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#F2E6D8]" />
              <span>100% satisfacción</span>
            </div>
          </div>
        </div>
      </section>

      {/* About the Treatment */}
      <section className="px-4 py-16 bg-zinc-950">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16">
            El Arte de la <span className="text-[#F2E6D8]">Restauración</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-zinc-900/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 border border-zinc-800">
                <span className="text-2xl text-[#F2E6D8]">1</span>
              </div>
              <h3 className="text-xl font-light mb-3 text-[#F2E6D8]">Evaluación Completa</h3>
              <p className="text-gray-400 font-light">
                Evaluamos tu caso específico para identificar el problema 
                y crear un plan de tratamiento personalizado.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-zinc-900/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 border border-zinc-800">
                <span className="text-2xl text-[#F2E6D8]">2</span>
              </div>
              <h3 className="text-xl font-light mb-3 text-[#F2E6D8]">Tratamiento IBX®</h3>
              <p className="text-gray-400 font-light">
                Sistema de fortalecimiento que penetra y sella la uña desde adentro, 
                creando una barrera protectora duradera.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-zinc-900/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 border border-zinc-800">
                <span className="text-2xl text-[#F2E6D8]">3</span>
              </div>
              <h3 className="text-xl font-light mb-3 text-[#F2E6D8]">Resultado Inmediato</h3>
              <p className="text-gray-400 font-light">
                Sales con uñas perfectas en 90 minutos. Incluye GEL Polish profesional 
                en el color de tu preferencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-4">
            <span className="text-[#F2E6D8]">Transformaciones</span> Reales
          </h2>
          <p className="text-center text-gray-400 mb-12 font-light">
            Resultados de clientas en Puerto Rico
          </p>

          <div className="relative">
            <Carousel
              setApi={setApi}
              className="w-full max-w-5xl mx-auto"
              opts={{
                loop: true,
                dragFree: true,
              }}
            >
              <CarouselContent>
                {onicoplastiaCases.map((case_) => {
                  const currentImage = getSelectedImage(case_.id);
                  return (
                    <CarouselItem key={case_.id}>
                      <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-xl font-light text-[#F2E6D8]">{case_.title}</CardTitle>
                          <CardDescription className="text-gray-400">{case_.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-center gap-2 mb-4">
                            <Button
                              variant={currentImage === "before" ? "default" : "outline"}
                              onClick={() => handleImageClick(case_.id, "before")}
                              size="sm"
                              className={currentImage === "before" 
                                ? "bg-[#F2E6D8] text-black hover:bg-[#E6D0B8]" 
                                : "border-zinc-700 text-gray-300 hover:bg-zinc-800"}
                            >
                              Antes
                            </Button>
                            <Button
                              variant={currentImage === "after" ? "default" : "outline"}
                              onClick={() => handleImageClick(case_.id, "after")}
                              size="sm"
                              className={currentImage === "after" 
                                ? "bg-[#F2E6D8] text-black hover:bg-[#E6D0B8]" 
                                : "border-zinc-700 text-gray-300 hover:bg-zinc-800"}
                            >
                              Después
                            </Button>
                            <Button
                              variant={currentImage === "collage" ? "default" : "outline"}
                              onClick={() => handleImageClick(case_.id, "collage")}
                              size="sm"
                              className={currentImage === "collage" 
                                ? "bg-[#F2E6D8] text-black hover:bg-[#E6D0B8]" 
                                : "border-zinc-700 text-gray-300 hover:bg-zinc-800"}
                            >
                              Proceso
                            </Button>
                          </div>

                          <div
                            className="aspect-square w-full overflow-hidden rounded-md relative bg-zinc-950"
                            onClick={() => !imageError[`${case_.id}-${currentImage}`] && setSelectedCase(case_)}
                          >
                            {imageError[`${case_.id}-${currentImage}`] ? (
                              <div className="w-full h-full flex items-center justify-center">
                                <p className="text-sm text-gray-500">
                                  Imagen no disponible
                                </p>
                              </div>
                            ) : (
                              <img
                                src={case_[`${currentImage}Image`]}
                                alt={`${currentImage === "before" ? "Antes" : currentImage === "after" ? "Después" : "Proceso"} - ${case_.title}`}
                                className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform"
                                onError={() => handleImageError(case_.id, currentImage)}
                              />
                            )}
                          </div>

                          {case_.highlights && (
                            <div className="mt-4 space-y-2">
                              {case_.highlights.map((highlight, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-[#F2E6D8] mt-0.5" />
                                  <span className="text-sm text-gray-300">{highlight}</span>
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

              <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    className={`h-[2px] rounded-full transition-all ${
                      index === current
                        ? "bg-[#F2E6D8] w-8"
                        : "bg-zinc-700 w-4"
                    }`}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Ir a caso ${index + 1}`}
                  />
                ))}
              </div>

              <div className="absolute -left-4 -right-4 top-1/2 hidden md:flex justify-between -translate-y-1/2">
                <CarouselPrevious className="bg-zinc-900/80 border-zinc-700 text-white hover:bg-zinc-800" />
                <CarouselNext className="bg-zinc-900/80 border-zinc-700 text-white hover:bg-zinc-800" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 py-16 bg-zinc-950">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16">
            Beneficios del <span className="text-[#F2E6D8]">Tratamiento</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-zinc-900/30 p-8 rounded-lg border border-zinc-800">
              <h3 className="text-xl font-light mb-4 text-[#F2E6D8]">
                Resultados Visibles
              </h3>
              <p className="text-gray-400 font-light">
                Sales con uñas hermosas el mismo día. No tienes que esperar 
                meses para ver cambios - la transformación es inmediata.
              </p>
            </div>
            
            <div className="bg-zinc-900/30 p-8 rounded-lg border border-zinc-800">
              <h3 className="text-xl font-light mb-4 text-[#F2E6D8]">
                Tratamiento IBX®
              </h3>
              <p className="text-gray-400 font-light">
                Sistema profesional que fortalece y protege tus uñas desde adentro, 
                ayudando a prevenir futuros problemas.
              </p>
            </div>
            
            <div className="bg-zinc-900/30 p-8 rounded-lg border border-zinc-800">
              <h3 className="text-xl font-light mb-4 text-[#F2E6D8]">
                Sin Dolor
              </h3>
              <p className="text-gray-400 font-light">
                Procedimiento completamente indoloro y relajante. 
                Muchas clientas lo comparan con un spa para sus uñas.
              </p>
            </div>
            
            <div className="bg-zinc-900/30 p-8 rounded-lg border border-zinc-800">
              <h3 className="text-xl font-light mb-4 text-[#F2E6D8]">
                Seguimiento Incluido
              </h3>
              <p className="text-gray-400 font-light">
                Te acompañamos en todo el proceso con seguimientos mensuales 
                para asegurar que tus uñas se mantengan saludables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16">
            Palabras de Nuestras <span className="text-[#F2E6D8]">Clientas</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F2E6D8] text-[#F2E6D8]" />
                ))}
              </div>
              <p className="text-gray-300 italic font-light">
                "Excelente vibra desde que entras al spa y su servicio inigualable. 
                Altamente recomendada!"
              </p>
            </div>
            
            <div className="bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F2E6D8] text-[#F2E6D8]" />
                ))}
              </div>
              <p className="text-gray-300 italic font-light">
                "Profesional en su trabajo, te complace en lo que pides. 
                Un trato excepcional siempre."
              </p>
            </div>
            
            <div className="bg-zinc-900/30 p-6 rounded-lg border border-zinc-800">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F2E6D8] text-[#F2E6D8]" />
                ))}
              </div>
              <p className="text-gray-300 italic font-light">
                "Trabajo de alta calidad y un trato excelente. 
                Sin duda volveré siempre."
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-[#F2E6D8] font-light">
              37 reseñas verificadas • 5.0 de calificación en Booksy
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16 bg-zinc-950">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16">
            Preguntas <span className="text-[#F2E6D8]">Frecuentes</span>
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-zinc-900/30 border border-zinc-800 rounded-lg px-6">
              <AccordionTrigger className="text-left font-light hover:text-[#F2E6D8]">
                ¿Qué es la onicoplastia?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 font-light">
                La onicoplastia es un tratamiento profesional especializado para la restauración 
                de uñas afectadas por hongos u otras condiciones. Utilizamos técnicas avanzadas 
                y tecnología IBX® para eliminar el problema desde la raíz y reconstruir la uña.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-zinc-900/30 border border-zinc-800 rounded-lg px-6">
              <AccordionTrigger className="text-left font-light hover:text-[#F2E6D8]">
                ¿Es doloroso el tratamiento?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 font-light">
                No, el tratamiento es completamente indoloro. Es tan suave como un manicure regular. 
                Como enfermera registrada, mi prioridad es tu comodidad y bienestar durante todo el proceso.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-zinc-900/30 border border-zinc-800 rounded-lg px-6">
              <AccordionTrigger className="text-left font-light hover:text-[#F2E6D8]">
                ¿Cuánto tiempo dura el tratamiento?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 font-light">
                La sesión completa dura hasta 2 horas. Durante este tiempo realizamos 
                la evaluación, el tratamiento IBX®, la aplicación de la prótesis y el GEL Polish. 
                Sales con uñas perfectas el mismo día.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="bg-zinc-900/30 border border-zinc-800 rounded-lg px-6">
              <AccordionTrigger className="text-left font-light hover:text-[#F2E6D8]">
                ¿Cuál es la inversión?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 font-light">
                La primera evaluación completa es de $100 e incluye todo el tratamiento (hasta 2 horas) 
                con GEL Polish profesional. Los seguimientos mensuales tienen un costo de $60. 
                Es una inversión en tu salud y bienestar.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="bg-zinc-900/30 border border-zinc-800 rounded-lg px-6">
              <AccordionTrigger className="text-left font-light hover:text-[#F2E6D8]">
                ¿Qué hace especial este tratamiento?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 font-light">
                Combinamos el tratamiento IBX® con técnicas profesionales de reconstrucción. 
                Como enfermera registrada, entiendo la importancia de un tratamiento seguro y efectivo. 
                Nuestro enfoque integral asegura no solo uñas hermosas, sino también saludables.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Shop Promotion */}
      <ShopPromotion />

      {/* CTA Section */}
      <section className="px-4 py-24 bg-gradient-to-b from-black to-zinc-950">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-8">
            Comienza Tu <span className="text-[#F2E6D8]">Transformación</span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-12 font-light">
            Dale a tus uñas el cuidado profesional que merecen
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-[#F2E6D8] hover:bg-[#E6D0B8] text-black font-light text-lg px-12 py-6" 
              asChild
            >
              <a
                href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2 h-5 w-5" />
                RESERVAR CITA
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-zinc-700 text-white hover:bg-zinc-900 font-light text-lg px-12 py-6" 
              asChild
            >
              <a 
                href="https://wa.me/19394290292?text=Hola%20Neycha,%20me%20interesa%20el%20tratamiento%20de%20onicoplastia" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                CONSULTA POR WHATSAPP
              </a>
            </Button>
          </div>
          
          <div className="text-sm text-gray-500 space-y-2">
            <p>📍 166 Ave Dr Susoni, Hatillo, PR 00659</p>
            <p>🏥 RN Certificada • 🏆 IBX® Certificada • ⭐ 37 Reseñas 5 Estrellas</p>
          </div>
        </div>
      </section>

      {/* Image Preview Dialog */}
      <Dialog
        open={!!selectedCase}
        onOpenChange={(open) => !open && setSelectedCase(null)}
      >
        <DialogContent className="max-w-3xl bg-zinc-900 border-zinc-800">
          <DialogTitle className="text-[#F2E6D8] font-light">
            {selectedCase?.title || "Vista detallada"}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {selectedCase?.description}
          </DialogDescription>
          <div className="w-full aspect-square bg-black rounded-lg">
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