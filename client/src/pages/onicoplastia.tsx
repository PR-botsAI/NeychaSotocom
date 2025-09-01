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
import { Calendar, MessageCircle, Clock, CheckCircle, XCircle, ArrowRight } from "lucide-react";
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
      {/* Hero - Hormozi Style Dream Outcome */}
      <section className="relative px-4 py-16 bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <p className="text-yellow-400 font-bold text-sm mb-4 uppercase tracking-wider">
              ⚠️ Para Mujeres Con Hongos en las Uñas en Puerto Rico
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Elimina Los Hongos En <span className="text-yellow-400">90 Minutos</span><br/>
              Y Luce Uñas Perfectas <span className="underline">HOY MISMO</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Sin dolor • Sin químicos agresivos • Sin esperar meses<br/>
              <span className="text-yellow-400 font-semibold">Garantizado o seguimos trabajando gratis</span>
            </p>
            
            {/* Value Stack Preview */}
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl mb-8 max-w-2xl mx-auto text-left">
              <p className="text-yellow-400 font-bold mb-4">Lo que obtienes HOY:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Diagnóstico profesional por RN certificada ($150 valor)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Tratamiento IBX® exclusivo ($200 valor)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>GEL Polish profesional incluido ($25 valor)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Plan de mantenimiento personalizado ($75 valor)</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Valor Total:</span>
                  <span className="text-xl line-through text-gray-400">$450</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-yellow-400 font-bold">Tu Inversión Hoy:</span>
                  <span className="text-3xl font-bold text-yellow-400">Solo $100</span>
                </div>
              </div>
            </div>

            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xl px-12 py-6 shadow-2xl" asChild>
              <a
                href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
                target="_blank"
                rel="noopener noreferrer"
              >
                SÍ, QUIERO MIS UÑAS PERFECTAS HOY
                <ArrowRight className="ml-2 h-6 w-6" />
              </a>
            </Button>
            
            <p className="text-sm text-gray-400 mt-4">
              ⏰ Solo 3 espacios disponibles esta semana
            </p>
          </div>
        </div>
      </section>

      {/* The Problem - Massive Pain Point */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            El Costo Real de NO Tratar Tus Hongos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800">
                  <XCircle className="w-6 h-6 inline mr-2" />
                  Lo Que Pierdes Cada Día
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li>❌ <strong>$300+/año</strong> en cremas que no funcionan</li>
                  <li>❌ <strong>365 días</strong> escondiendo tus pies</li>
                  <li>❌ <strong>52 fines de semana</strong> sin ir a la playa</li>
                  <li>❌ <strong>Incontables momentos</strong> de vergüenza</li>
                  <li>❌ <strong>Tu confianza</strong> destruida día a día</li>
                  <li>❌ <strong>El hongo empeora</strong> y se extiende más</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">
                  <CheckCircle className="w-6 h-6 inline mr-2" />
                  Lo Que Ganas HOY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li>✅ <strong>Uñas perfectas</strong> en 90 minutos</li>
                  <li>✅ <strong>Libertad inmediata</strong> para usar sandalias</li>
                  <li>✅ <strong>Confianza restaurada</strong> instantáneamente</li>
                  <li>✅ <strong>Playa y piscina</strong> sin complejos</li>
                  <li>✅ <strong>Ahorro de $300+</strong> en tratamientos inútiles</li>
                  <li>✅ <strong>Problema eliminado</strong> desde la raíz</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Card className="bg-yellow-50 border-yellow-300 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <p className="text-2xl font-bold text-gray-900 mb-4">
                  La Matemática Es Simple:
                </p>
                <div className="text-lg text-gray-700">
                  <p>Seguir sufriendo = <span className="text-red-600 font-bold">-$300/año + vergüenza diaria</span></p>
                  <p className="mt-2">Mi tratamiento = <span className="text-green-600 font-bold">$100 una vez + libertad para siempre</span></p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Visual Proof - Before & After Gallery */}
      <section className="px-4 py-16 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Resultados REALES de Clientas en Puerto Rico
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Todas salieron con uñas perfectas el MISMO DÍA
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

      {/* The Grand Slam Offer - Hormozi Style Value Stack */}
      <section className="px-4 py-16 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            La Oferta Que No Puedes Rechazar
          </h2>
          <p className="text-center text-xl mb-12 text-gray-300">
            Todo lo que necesitas para eliminar los hongos PARA SIEMPRE
          </p>
          
          <div className="space-y-6 mb-12">
            {/* Component 1 */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-yellow-400 mb-2">
                      #1: Diagnóstico Profesional por Enfermera Registrada
                    </h3>
                    <p className="text-gray-300">
                      Como RN certificada, evalúo tu salud completa, no solo las uñas. 
                      Identifico la causa raíz y creo un plan personalizado.
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-gray-400 line-through">Valor: $150</p>
                    <p className="text-green-400 font-bold">INCLUIDO</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Component 2 */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-yellow-400 mb-2">
                      #2: Tratamiento IBX® Exclusivo (Solo 1% lo domina)
                    </h3>
                    <p className="text-gray-300">
                      Técnica alemana de última generación que sella y protege la uña. 
                      Soy la ÚNICA certificada en el área oeste de PR.
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-gray-400 line-through">Valor: $200</p>
                    <p className="text-green-400 font-bold">INCLUIDO</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Component 3 */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-yellow-400 mb-2">
                      #3: Prótesis Anti-Humedad de Última Generación
                    </h3>
                    <p className="text-gray-300">
                      Elimina el ambiente húmedo donde viven los hongos. 
                      Específicamente diseñada para el clima de Puerto Rico.
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-gray-400 line-through">Valor: $100</p>
                    <p className="text-green-400 font-bold">INCLUIDO</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Component 4 */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-yellow-400 mb-2">
                      #4: GEL Polish Profesional en Tu Color Favorito
                    </h3>
                    <p className="text-gray-300">
                      Sales con uñas perfectas y listas para lucir HOY MISMO. 
                      Elige entre más de 50 colores disponibles.
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-gray-400 line-through">Valor: $25</p>
                    <p className="text-green-400 font-bold">INCLUIDO</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* BONUS 1 */}
            <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-400">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-yellow-400 font-bold text-sm mb-2">🎁 BONUS ESPECIAL</p>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Plan de Mantenimiento Personalizado
                    </h3>
                    <p className="text-gray-300">
                      Instrucciones exactas para mantener tus uñas perfectas. 
                      Acceso directo a mi WhatsApp para consultas.
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-gray-400 line-through">Valor: $75</p>
                    <p className="text-green-400 font-bold">GRATIS HOY</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* BONUS 2 */}
            <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-400">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-yellow-400 font-bold text-sm mb-2">🎁 BONUS EXCLUSIVO</p>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Garantía "Uñas Perfectas o Seguimos Gratis"
                    </h3>
                    <p className="text-gray-300">
                      Si no quedas 100% satisfecha, seguimos trabajando sin costo adicional 
                      hasta que estés completamente feliz.
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-gray-400 line-through">Valor: Invaluable</p>
                    <p className="text-green-400 font-bold">INCLUIDO</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Total Value */}
          <Card className="bg-yellow-400 text-black">
            <CardContent className="p-8 text-center">
              <div className="text-3xl font-bold mb-4">
                Valor Total: <span className="line-through">$550</span>
              </div>
              <div className="text-5xl font-bold mb-4">
                Tu Inversión HOY: Solo $100
              </div>
              <p className="text-lg mb-6">
                Ahorras $450 (82% de descuento) - Solo esta semana
              </p>
              <Button size="lg" className="bg-black hover:bg-gray-900 text-white font-bold text-xl px-12 py-6 w-full" asChild>
                <a
                  href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  QUIERO APROVECHAR ESTA OFERTA AHORA
                  <ArrowRight className="ml-2 h-6 w-6" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Urgency & Scarcity */}
      <section className="px-4 py-16 bg-red-50">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-red-300 bg-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-6 text-red-800">
                ⏰ Esta Oferta Expira en 72 Horas
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-red-100 p-4 rounded-lg">
                  <p className="text-4xl font-bold text-red-600">3</p>
                  <p className="text-gray-700">Espacios restantes</p>
                </div>
                <div className="bg-orange-100 p-4 rounded-lg">
                  <p className="text-4xl font-bold text-orange-600">37</p>
                  <p className="text-gray-700">Reseñas 5 estrellas</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <p className="text-4xl font-bold text-yellow-600">72h</p>
                  <p className="text-gray-700">Para aprovechar</p>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 mb-6">
                Después del viernes, el precio vuelve a $150 y no incluye los bonos. 
                Las que reservaron esta semana ya aseguraron su transformación.
              </p>
              
              <div className="bg-yellow-50 p-6 rounded-lg">
                <p className="font-bold text-gray-900 mb-2">
                  🔥 ÚLTIMA HORA: 2 personas acaban de reservar mientras leías esto
                </p>
                <p className="text-sm text-gray-600">
                  No dejes que otro verano pase con vergüenza. Tu transformación te espera.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Risk Reversal - FAQ */}
      <section className="px-4 py-16 bg-white">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Elimino TODAS Tus Dudas
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left">
                "¿Y si no funciona en mi caso?"
              </AccordionTrigger>
              <AccordionContent>
                Imposible. En 5 años nunca he tenido un caso que no pueda resolver. 
                Pero si por alguna razón milagrosa no funciona, seguimos trabajando 
                GRATIS hasta que estés 100% satisfecha. No tienes nada que perder.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left">
                "¿Duele? Tengo mucho miedo..."
              </AccordionTrigger>
              <AccordionContent>
                CERO dolor, garantizado. Es tan suave como un manicure regular. 
                Como enfermera registrada, mi prioridad es tu comodidad. 
                Muchas clientas hasta se duermen durante el tratamiento. 
                Si sientes algo, paramos inmediatamente.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left">
                "¿Realmente salgo con uñas perfectas el mismo día?"
              </AccordionTrigger>
              <AccordionContent>
                SÍ, 100% garantizado. En 90 minutos elimino el problema, aplico 
                el tratamiento IBX®, la prótesis anti-humedad Y el GEL Polish 
                en tu color favorito. Sales lista para mostrar tus pies con orgullo. 
                Mira las fotos de mis clientas - todas salieron así.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left">
                "¿Por qué debo elegirte a ti y no otro lugar más barato?"
              </AccordionTrigger>
              <AccordionContent>
                Porque soy la ÚNICA RN certificada en IBX® en el área oeste. 
                Los lugares baratos no eliminan el problema, solo lo cubren temporalmente. 
                En 2 meses gastas más en tratamientos que no funcionan que lo que 
                inviertes conmigo para eliminarlo PARA SIEMPRE. Es matemática simple.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border rounded-lg px-4">
              <AccordionTrigger className="text-left">
                "Vivo lejos de Hatillo, ¿vale la pena?"
              </AccordionTrigger>
              <AccordionContent>
                Tengo clientas que vienen desde San Juan, Ponce y Mayagüez. 
                ¿Por qué manejan 2 horas? Porque no existe este tratamiento 
                en ningún otro lugar de Puerto Rico. Una cliente de Fajardo 
                me dijo: "Manejo 2 horas pero cambió mi vida para siempre". 
                Tú decides si vale la pena dejar de sufrir.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA - The Close */}
      <section className="px-4 py-16 bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Tu Decisión Define Tu Futuro
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
            <Card className="bg-red-900/50 border-red-500">
              <CardHeader>
                <CardTitle className="text-white">
                  Opción 1: No Hacer Nada
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <ul className="space-y-2">
                  <li>• Sigues escondiendo tus pies</li>
                  <li>• Gastas otros $300 en cremas inútiles</li>
                  <li>• El hongo empeora cada día</li>
                  <li>• Pierdes otro verano sin playa</li>
                  <li>• La vergüenza continúa</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-green-900/50 border-green-500">
              <CardHeader>
                <CardTitle className="text-white">
                  Opción 2: Actuar HOY
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <ul className="space-y-2">
                  <li>• Sales con uñas perfectas en 90 min</li>
                  <li>• Ahorras $450 con esta oferta</li>
                  <li>• Eliminas el problema para siempre</li>
                  <li>• Recuperas tu confianza HOY</li>
                  <li>• Vives sin complejos desde ahora</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-yellow-400 text-black p-8 rounded-xl mb-8">
            <p className="text-2xl font-bold mb-4">
              🎯 Recuerda: Esta oferta de $100 (ahorrando $450) 
              expira en 72 horas
            </p>
            <p className="text-lg">
              Solo quedan 3 espacios. No seas la que se arrepienta mañana.
            </p>
          </div>
          
          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-2xl px-16 py-8 shadow-2xl" asChild>
            <a
              href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
              target="_blank"
              rel="noopener noreferrer"
            >
              SÍ, QUIERO TRANSFORMAR MIS UÑAS AHORA
              <ArrowRight className="ml-3 h-8 w-8" />
            </a>
          </Button>
          
          <div className="mt-8 space-y-4">
            <p className="text-gray-400">
              ¿Prefieres hablar conmigo primero?
            </p>
            <Button variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a 
                href="https://wa.me/19394290292?text=Hola%20Neycha,%20vi%20tu%20oferta%20especial%20de%20onicoplastia%20y%20quiero%20reservar" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp: +1 939-429-0292
              </a>
            </Button>
            
            <p className="text-sm text-gray-500">
              📍 166 Ave Dr Susoni, Hatillo • 🏥 RN Certificada • 🏆 IBX® Exclusiva
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