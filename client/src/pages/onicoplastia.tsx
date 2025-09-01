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
import { Calendar, MessageCircle, Shield, Clock, Star, CheckCircle } from "lucide-react";
import { cases } from "@/data/cases";

type ImageType = "before" | "after" | "collage";

export default function Onicoplastia() {
  const [selectedImage, setSelectedImage] = useState<ImageType>("before");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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

  return (
    <div className="min-h-screen">
      {/* HERO - Conversion Focused */}
      <section className="relative px-4 py-12 bg-gradient-to-br from-green-50 via-blue-50 to-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Compelling Value Proposition */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Shield className="w-4 h-4 mr-2" />
                RN Certificada • IBX® Especialista • Puerto Rico
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-gray-900">Hongos en las Uñas?</span><br/>
                <span className="text-primary">¡Ya No Más!</span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                ¿Cansada de esconder tus pies? Como la única <strong>Enfermera Registrada</strong> certificada en <strong>IBX®</strong> en el área, elimino el problema atacando la raíz - no solo los síntomas.
              </p>
              
              {/* Key Benefits */}
              <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">90 min</div>
                    <p className="text-sm text-gray-600">Tratamiento completo</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">98%</div>
                    <p className="text-sm text-gray-600">Éxito comprobado</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <p className="text-sm text-gray-600">Clientas felices</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">0</div>
                    <p className="text-sm text-gray-600">Dolor garantizado</p>
                  </div>
                </div>
              </div>
              
              {/* Primary CTA */}
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-lg px-12 py-4 shadow-lg"
                  asChild
                >
                  <a
                    href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="mr-3 h-5 w-5" />
                    RESERVAR MI EVALUACIÓN AHORA
                  </a>
                </Button>
                
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <Button 
                    variant="ghost" 
                    className="text-gray-700 hover:text-primary"
                    asChild
                  >
                    <a href="https://wa.me/19394290292" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Pregunta por WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-2 mt-6 text-sm text-gray-600">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>Evaluación inicial solo $75 • Sin compromiso</span>
              </div>
            </div>
            
            {/* Right Column - Social Proof Visual */}
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Resultados que Hablan</h3>
                  <p className="text-gray-600">Casos reales de Puerto Rico</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <div className="bg-red-50 border-2 border-red-200 p-4 rounded-xl mb-3">
                      <p className="text-red-700 font-semibold text-sm mb-2">😔 ANTES</p>
                      <div className="h-24 bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-red-600 text-xs">Uñas afectadas<br/>por hongos</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-50 border-2 border-green-200 p-4 rounded-xl mb-3">
                      <p className="text-green-700 font-semibold text-sm mb-2">✨ DESPUÉS</p>
                      <div className="h-24 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 text-xs">Uñas perfectas<br/>y protegidas</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-xl text-center">
                  <p className="text-sm font-semibold text-gray-700">
                    "Por fin puedo usar sandalias sin pena"
                  </p>
                  <p className="text-xs text-gray-600 mt-1">- María, Bayamón</p>
                  <div className="flex justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Trust Badge */}
              <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                🏆 #1 en PR
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL GALLERY - Cases */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transformaciones Reales
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ve cómo el tratamiento IBX® ha cambiado la vida de más de 500 mujeres en Puerto Rico
            </p>
          </div>

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
                {onicoplastiaCases.map((case_) => (
                  <CarouselItem key={case_.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg">{case_.title}</CardTitle>
                        <CardDescription className="text-sm">{case_.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-center gap-2 mb-4">
                          <Button
                            variant={selectedImage === "before" ? "default" : "outline"}
                            onClick={() => handleImageClick("before")}
                            size="sm"
                          >
                            Antes
                          </Button>
                          <Button
                            variant={selectedImage === "after" ? "default" : "outline"}
                            onClick={() => handleImageClick("after")}
                            size="sm"
                          >
                            Después
                          </Button>
                        </div>

                        <div
                          className="aspect-square w-full overflow-hidden rounded-lg relative cursor-pointer"
                          onClick={() => !imageError[`${case_.id}-${selectedImage}`] && setSelectedCase(case_)}
                        >
                          {imageError[`${case_.id}-${selectedImage}`] ? (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <p className="text-sm text-gray-500">
                                Imagen no disponible
                              </p>
                            </div>
                          ) : (
                            <img
                              src={case_[`${selectedImage}Image`]}
                              alt={`${selectedImage === "before" ? "Antes" : "Después"} - ${case_.title}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              onError={() => handleImageError(case_.id, selectedImage)}
                            />
                          )}
                        </div>

                        {case_.highlights && (
                          <div className="mt-4 space-y-2">
                            {case_.highlights.slice(0, 2).map((highlight, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === current
                        ? "bg-primary scale-125"
                        : "bg-gray-300"
                    }`}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Ver caso ${index + 1}`}
                  />
                ))}
              </div>

              <div className="absolute -left-4 -right-4 top-1/2 hidden md:flex justify-between -translate-y-1/2">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>
          
          {/* Call-to-Action after Gallery */}
          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4" asChild>
              <a
                href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2 h-5 w-5" />
                ¡Quiero Mi Transformación!
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION - Puerto Rico Specific */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🏝️ El Problema Real en Puerto Rico
            </h2>
            <p className="text-lg text-gray-600">
              No es tu culpa - nuestro clima tropical crea el ambiente perfecto para los hongos
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center border-blue-200">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">💧</div>
                <h3 className="font-bold text-xl mb-2 text-blue-600">85% Humedad</h3>
                <p className="text-gray-600">Constante todo el año</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-green-200">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🌡️</div>
                <h3 className="font-bold text-xl mb-2 text-green-600">28°C Promedio</h3>
                <p className="text-gray-600">Calor tropical constante</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-yellow-200">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🏖️</div>
                <h3 className="font-bold text-xl mb-2 text-yellow-600">Vida Playera</h3>
                <p className="text-gray-600">Exposición a humedad</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-red-800">
                ❌ Los Tratamientos Tradicionales Fallan Aquí
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold mb-2 text-red-700">❌ Cremas y medicamentos:</h4>
                  <p className="text-sm text-gray-700">Solo atacan síntomas superficiales. En 2-3 meses vuelve el problema porque no eliminan el ambiente húmedo.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-red-700">❌ Tratamientos caseros:</h4>
                  <p className="text-sm text-gray-700">Peligrosos y sin base científica. Pueden empeorar la condición y causar infecciones.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SOLUTION - Why IBX Works */}
      <section className="px-4 py-16 bg-gradient-to-br from-primary/10 to-green-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🎯 Por Qué Mi Método SÍ Funciona
            </h2>
            <p className="text-lg text-gray-600">
              El único tratamiento diseñado específicamente para el clima de Puerto Rico
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Eliminamos la Raíz del Problema</h3>
                    <p className="text-gray-600">Removemos completamente el área afectada y sellamos con IBX® - no solo cubrimos, sino que eliminamos.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Prótesis Anti-Humedad</h3>
                    <p className="text-gray-600">Aplicamos una prótesis hipoalergénica que elimina el ambiente húmedo perfecto donde viven los hongos.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Prevención Continua</h3>
                    <p className="text-gray-600">Plan personalizado de seguimiento cada 45 días para mantener tus uñas perfectas para siempre.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-center mb-6">Tu Sesión de 90 Minutos</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-semibold">Evaluación Completa (20 min)</p>
                    <p className="text-sm text-gray-600">Analizamos tu caso específico</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold">Limpieza Profunda (25 min)</p>
                    <p className="text-sm text-gray-600">Removemos áreas afectadas - sin dolor</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="font-semibold">Reconstrucción IBX® (30 min)</p>
                    <p className="text-sm text-gray-600">Sellamos y aplicamos prótesis anti-humedad</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-lg">
                  <Clock className="w-6 h-6 text-pink-600" />
                  <div>
                    <p className="font-semibold">GEL Polish Perfecto (15 min)</p>
                    <p className="text-sm text-gray-600">Color profesional incluido - valor $25</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
                <p className="font-bold text-green-800">
                  ✨ Sales con uñas perfectas el mismo día
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST & CREDENTIALS */}
      <section className="px-4 py-16 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              🩺 ¿Por Qué Confiar en Mí?
            </h2>
            <p className="text-lg text-gray-600">
              Soy la única especialista con esta combinación de credenciales en el área
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-blue-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Enfermera Registrada (RN)</h3>
                <p className="text-gray-600">Conocimiento médico profundo de anatomía y salud de las uñas. Protocolos de seguridad y esterilización hospitalarios.</p>
              </CardContent>
            </Card>
            
            <Card className="border-green-200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Certificada IBX®</h3>
                <p className="text-gray-600">Técnica avanzada de reconstrucción que solo domina el 1% de profesionales. Especialización en casos complejos.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              🏆 Resultados Comprobados
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <p className="text-sm text-gray-600">Clientas transformadas</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">98%</div>
                <p className="text-sm text-gray-600">Tasa de éxito</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">5</div>
                <p className="text-sm text-gray-600">Años especializándome</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">0</div>
                <p className="text-sm text-gray-600">Casos de dolor reportados</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* URGENCY & SCARCITY */}
      <section className="px-4 py-16 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-4 text-red-800">
              ⚠️ Atención: Solo Acepto 12 Clientas Nuevas al Mes
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Cada caso requiere atención personalizada y seguimiento detallado. Para garantizar resultados de calidad, limito mi agenda.
            </p>
            
            <div className="bg-yellow-100 border-2 border-yellow-300 p-6 rounded-xl mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Clock className="w-6 h-6 text-yellow-700" />
                <span className="text-lg font-bold text-yellow-800">Próximas Citas Disponibles:</span>
              </div>
              <p className="text-yellow-800 font-semibold">
                Esta semana quedan solo 3 espacios • Reserva ya antes que se llenen
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white text-xl px-12 py-6 shadow-lg"
                asChild
              >
                <a
                  href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="mr-3 h-6 w-6" />
                  SÍ, RESERVO MI ESPACIO AHORA
                </a>
              </Button>
              
              <p className="text-sm text-gray-600">
                💳 Solo $75 para evaluación inicial • Sin compromiso • Cancelación gratuita
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OBJECTION HANDLING - FAQ */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Respuestas a Tus Dudas
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg border">
              <AccordionTrigger className="px-6">¿Realmente funciona en el clima de Puerto Rico?</AccordionTrigger>
              <AccordionContent className="px-6">
                Sí. Mi técnica está específicamente adaptada para nuestro clima. La prótesis anti-humedad elimina el ambiente perfecto donde viven los hongos. He tratado exitosamente a más de 500 clientas en la isla con una tasa de éxito del 98%.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-white rounded-lg border">
              <AccordionTrigger className="px-6">¿Es doloroso? Tengo miedo al dolor</AccordionTrigger>
              <AccordionContent className="px-6">
                Cero dolor garantizado. Es similar a un manicure regular. Como enfermera, uso técnicas profesionales que no causan molestias. Si sientes alguna incomodidad, paramos inmediatamente.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-white rounded-lg border">
              <AccordionTrigger className="px-6">¿Cuánto tiempo necesito para ver resultados?</AccordionTrigger>
              <AccordionContent className="px-6">
                ¡Inmediato! Sales del salón con uñas perfectas el mismo día. La parte estética es instantánea gracias a la reconstrucción y GEL Polish incluido. El tratamiento preventivo continúa con seguimientos cada 45 días.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="bg-white rounded-lg border">
              <AccordionTrigger className="px-6">¿Qué pasa si no funciona en mi caso?</AccordionTrigger>
              <AccordionContent className="px-6">
                En 5 años especializándome, nunca he tenido un caso donde no pueda ayudar. Como RN certificada, evalúo cada caso individualmente. Si por alguna razón no puedo ayudarte, te reembolso la consulta completa.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="bg-white rounded-lg border">
              <AccordionTrigger className="px-6">¿Cuál es la inversión total?</AccordionTrigger>
              <AccordionContent className="px-6">
                Evaluación inicial: $75 (incluye: evaluación, limpieza, reconstrucción, IBX®, prótesis anti-humedad, GEL Polish valor $25, y plan personalizado). Seguimientos: $40-50 cada 45 días. La mayoría de mis clientas ven esto como una inversión en su confianza y calidad de vida.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA - Urgency */}
      <section className="px-4 py-16 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ya Es Hora de Actuar
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Cada día que esperas es otro día escondiendo tus pies. Cambia eso hoy.
          </p>
          
          <div className="bg-white/10 backdrop-blur p-8 rounded-2xl mb-8">
            <h3 className="text-2xl font-bold mb-4">🎁 Solo Por Reservar Esta Semana:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-300" />
                <span>GEL Polish gratis (valor $25)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-300" />
                <span>Consulta de seguimiento gratis</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-300" />
                <span>Plan personalizado detallado</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-300" />
                <span>Garantía de satisfacción 100%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 text-xl px-16 py-6 shadow-2xl"
              asChild
            >
              <a
                href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-3 h-6 w-6" />
                RESERVAR MI TRANSFORMACIÓN AHORA
              </a>
            </Button>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <a href="https://wa.me/19394290292" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Preguntas por WhatsApp
                </a>
              </Button>
              
              <div className="text-sm opacity-80">
                📞 +1 939-429-0292 • 📍 Hatillo, PR • 💬 Solo texto
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-sm opacity-75">
            <p>⭐ Más de 500 clientas satisfechas • 🛡️ RN Certificada • 💎 IBX® Especialista</p>
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
              src={selectedCase?.[`${selectedImage}Image`]}
              alt={`${selectedImage === "before" ? "Antes" : "Después"}`}
              className="w-full h-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}