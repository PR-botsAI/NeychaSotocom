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
              Vuelve a Amar Tus Pies
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Imagina poder usar sandalias sin pena, ir a la playa con confianza,<br/>
              y no tener que esconder más tus pies. Eso es lo que te ofrezco.
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

      {/* The Real Impact - Life Changing */}
      <section className="px-4 py-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-rose-50/50 to-purple-50/50 border-purple-200/50">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">
                💔 ¿Cuánto Te Está Costando Realmente?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 mb-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-rose-700">Lo que pierdes cada día:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Evitas la playa con tu familia</li>
                    <li>• Rechazas invitaciones a la piscina</li>
                    <li>• Escondes tus pies en reuniones</li>
                    <li>• Te sientes avergonzada en la intimidad</li>
                    <li>• Gastas en cremas que no funcionan</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-purple-700">Lo que recuperarás:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Libertad de usar cualquier zapato</li>
                    <li>• Confianza en la playa y piscina</li>
                    <li>• Autoestima restaurada</li>
                    <li>• Intimidad sin complejos</li>
                    <li>• Ahorro en tratamientos inútiles</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg text-center">
                <p className="font-semibold text-gray-800">
                  "Lloré de felicidad cuando pude usar sandalias en la boda de mi hija"
                </p>
                <p className="text-sm text-gray-600 mt-1">- Carmen, 52 años, Caguas</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What to Expect - Strategic and Concise */}
      <section className="px-4 py-8">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-4">
            Tu Sesión de Transformación de 90 Minutos
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            No es solo un tratamiento, es el inicio de tu nueva vida sin complejos
          </p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>✨ El Proceso Que Cambiará Tu Vida</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="text-primary font-bold">1.</span>
                    <div>
                      <p className="font-semibold">Evaluación Profesional RN (20 min)</p>
                      <p className="text-sm text-muted-foreground">Como enfermera, evalúo tu salud completa, no solo las uñas</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary font-bold">2.</span>
                    <div>
                      <p className="font-semibold">Eliminación Total del Problema (25 min)</p>
                      <p className="text-sm text-muted-foreground">Remuevo cada rastro del hongo con precisión quirúrgica</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary font-bold">3.</span>
                    <div>
                      <p className="font-semibold">Reconstrucción IBX® Exclusiva (30 min)</p>
                      <p className="text-sm text-muted-foreground">La técnica que solo domina el 1% de profesionales en el mundo</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary font-bold">4.</span>
                    <div>
                      <p className="font-semibold">Tu Momento de Gloria (15 min)</p>
                      <p className="text-sm text-muted-foreground">Eliges el color perfecto y sales lista para conquistar el mundo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎁 Tu Inversión en Ti Misma</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <p className="font-bold text-green-800 text-lg mb-2">Solo $75 Primera Sesión</p>
                  <p className="text-sm text-green-700">Compara con los $300+ que has gastado en cremas que no funcionan</p>
                </div>
                <p className="font-semibold mb-3">Todo esto incluido:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Diagnóstico profesional por RN certificada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Tratamiento IBX® (solo el 1% de profesionales lo dominan)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Prótesis anti-humedad alemana de última generación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>GEL Polish profesional incluido (valor $25)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span>Plan de mantenimiento personalizado</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-purple-50 rounded-lg text-center">
                  <p className="text-sm font-semibold text-purple-800">⚡ Sales lista para mostrar tus pies HOY</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Story - Real Transformation */}
      <section className="px-4 py-12 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              De la Vergüenza al Orgullo
            </h2>
            <p className="text-lg text-muted-foreground">
              Historia real de transformación
            </p>
          </div>
          
          <Card className="border-purple-200">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="bg-red-100 p-4 rounded-lg mb-4">
                    <h3 className="font-bold text-red-800 mb-2">😔 Antes:</h3>
                    <p className="text-sm text-gray-700">
                      "Por 8 años escondí mis pies. No iba a la playa con mis hijos. 
                      Rechacé invitaciones. Me perdí momentos importantes. Gasté más de 
                      $1,000 en tratamientos que no funcionaron. Estaba deprimida."
                    </p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-2">✨ Después:</h3>
                    <p className="text-sm text-gray-700">
                      "Salí de mi primera cita llorando de felicidad. Por fin pude usar 
                      sandalias. Fui a la playa con mis hijos. Recuperé mi matrimonio. 
                      Mi vida cambió completamente. Vale cada centavo."
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-purple-200 to-pink-200 p-6 rounded-xl">
                    <p className="text-4xl font-bold text-purple-800 mb-2">8 años</p>
                    <p className="text-lg text-gray-700 mb-4">de sufrimiento terminaron en</p>
                    <p className="text-5xl font-bold text-green-600">90 minutos</p>
                  </div>
                  <p className="mt-4 text-sm italic text-gray-600">
                    - Maritza, 45 años, Arecibo<br/>
                    Cliente desde hace 2 años
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-100 rounded-lg text-center">
                <p className="font-bold text-gray-800">
                  "Si estás leyendo esto y tienes dudas, no esperes más. 
                  Yo perdí 8 años de mi vida. No pierdas ni un día más."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ - Only Essential Questions */}
      <section className="px-4 py-8">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Tus Dudas Reales, Mis Respuestas Honestas
          </h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>"Tengo miedo que duela... ya he sufrido mucho"</AccordionTrigger>
              <AccordionContent>
                Te entiendo completamente. Muchas de mis clientas llegan con ese mismo miedo después de malas experiencias. 
                Te prometo que mi técnica es tan suave como un manicure regular. Como enfermera registrada, mi prioridad 
                es tu comodidad. Si en algún momento sientes algo, paramos inmediatamente. De hecho, muchas clientas se 
                quedan dormidas durante el tratamiento.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>"Ya he probado de todo y nada funciona"</AccordionTrigger>
              <AccordionContent>
                Lo sé, es frustrante. La diferencia es que otros tratamientos solo atacan los síntomas superficiales. 
                Mi método IBX® elimina el ambiente húmedo donde viven los hongos - es como quitarles su casa. 
                Además, soy la única RN certificada en IBX® en el área, lo que me permite tratar casos 
                que otros no pueden. Mi experiencia médica marca la diferencia real.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>"No quiero que nadie sepa que tengo hongos"</AccordionTrigger>
              <AccordionContent>
                Tu privacidad es sagrada para mí. Sales del salón con uñas perfectas que parecen un manicure de lujo. 
                Nadie sabrá que estás en tratamiento. De hecho, te van a preguntar dónde te haces las uñas porque 
                se ven espectaculares. Tu secreto está seguro conmigo.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>"$75 me parece mucho para una primera cita"</AccordionTrigger>
              <AccordionContent>
                Entiendo tu preocupación. Pero piensa: ¿cuánto has gastado ya en cremas y tratamientos que no funcionaron? 
                ¿Cuánto vale para ti volver a usar sandalias? ¿Ir a la playa sin vergüenza? Mis clientas me dicen que 
                hubieran pagado 10 veces más por recuperar su confianza. Además, incluye GEL Polish de $25, 
                sales con uñas perfectas HOY MISMO. Es una inversión en tu calidad de vida.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>"Tengo un evento importante pronto, ¿me ayuda a tiempo?"</AccordionTrigger>
              <AccordionContent>
                ¡Absolutamente! Ese es mi superpoder. Sales de la primera sesión con uñas perfectas listas para lucir. 
                He salvado bodas, quinceañeros, graduaciones y vacaciones. La transformación estética es INMEDIATA. 
                Una clienta vino 3 días antes de su boda desesperada, y lució sandalias hermosas en su gran día. 
                Las fotos quedaron espectaculares.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>"Vivo lejos de Hatillo, ¿vale la pena el viaje?"</AccordionTrigger>
              <AccordionContent>
                Tengo clientas que vienen desde Ponce, Mayagüez, y hasta San Juan. ¿Por qué? Porque soy la única 
                RN certificada en IBX® en Puerto Rico. Este tratamiento no lo encuentras en ningún otro lugar de la isla. 
                Una clienta de Fajardo me dijo: "Manejo 2 horas pero vale cada minuto porque por fin tengo solución real". 
                Tu vida va a cambiar, eso te lo garantizo.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="px-4 py-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-blue-800">
                🏆 Por Qué Mis Clientas Me Eligen
              </h2>
              <p className="text-lg mb-6 text-gray-700">
                Soy la única RN certificada en IBX® en el área oeste. Esta combinación única 
                me permite tratar casos complejos que otros no pueden resolver.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">500+</p>
                  <p className="text-sm">Clientas transformadas</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">5</p>
                  <p className="text-sm">Años de experiencia</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">IBX®</p>
                  <p className="text-sm">Certificación exclusiva</p>
                </div>
              </div>
              <p className="text-sm italic text-gray-600">
                "Viajo desde San Juan porque no hay nadie más con esta técnica" - María, Guaynabo
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Strong CTA */}
      <section className="px-4 py-12 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tu Decisión de Hoy Define Tu Verano
            </h2>
            <p className="text-xl mb-8 opacity-95">
              Puedes seguir escondiendo tus pies otros 6 meses...<br/>
              O puedes salir de aquí HOY con uñas perfectas.
            </p>
            
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl mb-8 max-w-2xl mx-auto">
              <p className="text-lg font-semibold mb-4">
                🎁 Reserva HOY y Recibe:
              </p>
              <ul className="text-left space-y-2">
                <li>✓ GEL Polish de cortesía (valor $25)</li>
                <li>✓ Kit de mantenimiento para casa</li>
                <li>✓ Consulta de seguimiento gratuita</li>
                <li>✓ Acceso directo a mi WhatsApp personal</li>
                <li>✓ Prioridad en citas de seguimiento</li>
              </ul>
            </div>

            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-xl px-12 py-6 shadow-2xl mb-4" asChild>
              <a
                href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-3 h-6 w-6" />
                SÍ, QUIERO MI TRANSFORMACIÓN HOY
              </a>
            </Button>
            
            <p className="text-sm opacity-80 mb-6">
              O si prefieres, escríbeme directamente:
            </p>
            
            <Button variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="https://wa.me/19394290292?text=Hola%20Neycha,%20quiero%20información%20sobre%20el%20tratamiento%20de%20onicoplastia" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp: +1 939-429-0292
              </a>
            </Button>
            
            <div className="mt-8 text-sm opacity-75">
              <p>📍 Hatillo, Puerto Rico • 🏥 RN Certificada • 🏆 IBX® Especialista Exclusiva</p>
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