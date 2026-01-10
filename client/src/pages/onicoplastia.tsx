import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import type { Case } from "@/types/schema";
import { Button } from "@/components/ui/button";
import { GlassmorphismCard } from "@/components/glassmorphism-card";
import { MagneticButton } from "@/components/magnetic-button";
import { ParallaxElement } from "@/components/parallax-element";
import { AnimatedCounter } from "@/components/animated-counter";
import { GradientBorder } from "@/components/gradient-border";
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
  DialogTrigger,
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
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      {/* Modern Hero Section */}
      <section className="relative px-4 py-20 sm:py-28 overflow-hidden">
        {/* Animated Decorative elements */}
        <ParallaxElement speed={0.3} direction="up">
          <motion.div 
            className="absolute top-20 left-10 w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </ParallaxElement>
        <ParallaxElement speed={0.4} direction="down">
          <motion.div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1.1, 1, 1.1],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </ParallaxElement>
        
        <div className="container relative z-10 mx-auto max-w-4xl text-center">
          {/* Logo */}
          <FadeIn delay={0.1}>
            <div className="mb-10">
              <img 
                src="/assets/HeroLogoWhiteTrasparent.png" 
                alt="Neycha Soto" 
                className="h-20 sm:h-24 mx-auto mb-6 drop-shadow-2xl"
              />
              <div className="flex flex-wrap justify-center gap-3 mb-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#F2E6D8]/10 border border-[#F2E6D8]/20 px-4 py-2 text-sm font-semibold text-[#F2E6D8]">
                  <Sparkles className="w-4 h-4" />
                  IBX® Certified
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#F2E6D8]/10 border border-[#F2E6D8]/20 px-4 py-2 text-sm font-semibold text-[#F2E6D8]">
                  <Shield className="w-4 h-4" />
                  RN Profesional
                </span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-[#F2E6D8] to-white bg-clip-text text-transparent">
                Onicoplastia Premium
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Restauración profesional de uñas con tratamiento IBX®
            </p>
          </FadeIn>
          
          {/* Interactive Gallery - Moved to top for immediate visual impact */}
          <FadeIn delay={0.4}>
            <div className="mb-16">
              <p className="text-[#F2E6D8] font-light mb-8 text-lg text-center">
                Una imagen vale más que mil palabras
              </p>
              
              <div className="relative max-w-2xl mx-auto">
                <Carousel
                setApi={setApi}
                className="w-full"
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
                        <div className="group relative rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 border border-zinc-800 hover:border-[#F2E6D8]/30 transition-all">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2E6D8]/5 rounded-full blur-3xl group-hover:bg-[#F2E6D8]/10 transition-all"></div>
                          
                          <div className="relative">
                            <div className="mb-6">
                              <h3 className="text-2xl font-bold text-white mb-2">{case_.title}</h3>
                              <p className="text-gray-400">{case_.description}</p>
                            </div>
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
                          </div>
                        </div>
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
          </FadeIn>
          
          {/* Modern Service Details */}
          <FadeIn delay={0.5}>
            <div className="relative max-w-3xl mx-auto mb-12">
              <GradientBorder>
                <div className="group relative p-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2E6D8]/5 rounded-full blur-3xl group-hover:bg-[#F2E6D8]/10 transition-all"></div>
                  
                  <div className="relative">
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div className="text-center md:text-left">
                        <div className="inline-block p-3 bg-[#F2E6D8]/10 rounded-lg mb-3">
                          <Clock className="w-6 h-6 text-[#F2E6D8]" />
                        </div>
                        <p className="text-[#F2E6D8] font-semibold mb-2">Duración</p>
                        <p className="text-xl text-white">Hasta 2 horas</p>
                      </div>
                      <div className="text-center md:text-left">
                        <div className="inline-block p-3 bg-[#F2E6D8]/10 rounded-lg mb-3">
                          <Sparkles className="w-6 h-6 text-[#F2E6D8]" />
                        </div>
                        <p className="text-[#F2E6D8] font-semibold mb-2">Inversión</p>
                        <p className="text-xl text-white">Primera evaluación: $120</p>
                        <p className="text-sm text-gray-400 mt-1">Seguimientos: $80</p>
                      </div>
                    </div>
                    
                    <div className="pt-8 border-t border-zinc-800">
                      <p className="text-[#F2E6D8] font-semibold mb-6 text-lg">Incluye:</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#F2E6D8] mt-2"></div>
                          <span className="text-gray-300">Evaluación completa y personalizada</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#F2E6D8] mt-2"></div>
                          <span className="text-gray-300">Tratamiento IBX® certificado</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#F2E6D8] mt-2"></div>
                          <span className="text-gray-300">Reconstrucción con prótesis especializada</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#F2E6D8] mt-2"></div>
                          <span className="text-gray-300">GEL Polish profesional incluido</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GradientBorder>
            </div>
          </FadeIn>

          <MagneticButton>
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-[#F2E6D8] hover:bg-[#E6D0B8] text-black font-bold text-base sm:text-lg px-6 sm:px-12 py-6 shadow-2xl hover:shadow-[#F2E6D8]/30 transition-all hover:scale-105" 
              asChild
            >
              <a
                href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5 flex-shrink-0" />
                RESERVAR EVALUACIÓN
              </a>
            </Button>
          </MagneticButton>
          
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Star className="w-4 h-4 text-[#F2E6D8]" />
              <span><AnimatedCounter value={40} suffix="+" /> reseñas 5 estrellas</span>
            </div>
            <span className="text-zinc-700">•</span>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield className="w-4 h-4 text-[#F2E6D8]" />
              <span>100% satisfacción</span>
            </div>
            <span className="text-zinc-700">•</span>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>Disponible ahora</span>
            </div>
          </div>
        </div>
      </section>

      {/* About the Treatment */}
      <section className="px-4 py-16 bg-zinc-950">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-light text-center mb-16">
              El Arte de la <span className="text-[#F2E6D8]">Restauración</span>
            </h2>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            <StaggerItem>
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
            </StaggerItem>
            
            <StaggerItem>
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
            </StaggerItem>
            
            <StaggerItem>
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
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-5xl">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
              Beneficios del <span className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent">Tratamiento</span>
            </h2>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            <StaggerItem>
              <GlassmorphismCard className="p-8 h-full">
                <div className="inline-block p-3 bg-[#F2E6D8]/10 rounded-lg mb-4">
                  <Sparkles className="w-6 h-6 text-[#F2E6D8]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Resultados Visibles
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Sales con uñas hermosas el mismo día. No tienes que esperar 
                  meses para ver cambios - la transformación es inmediata.
                </p>
              </GlassmorphismCard>
            </StaggerItem>
            
            <StaggerItem>
              <GlassmorphismCard className="p-8 h-full">
                <div className="inline-block p-3 bg-[#F2E6D8]/10 rounded-lg mb-4">
                  <Shield className="w-6 h-6 text-[#F2E6D8]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Tratamiento IBX®
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Sistema profesional que fortalece y protege tus uñas desde adentro, 
                  ayudando a prevenir futuros problemas.
                </p>
              </GlassmorphismCard>
            </StaggerItem>
            
            <StaggerItem>
              <GlassmorphismCard className="p-8 h-full">
                <div className="inline-block p-3 bg-[#F2E6D8]/10 rounded-lg mb-4">
                  <Heart className="w-6 h-6 text-[#F2E6D8]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Sin Dolor
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Procedimiento completamente indoloro y relajante. 
                  Muchas clientas lo comparan con un spa para sus uñas.
                </p>
              </GlassmorphismCard>
            </StaggerItem>
            
            <StaggerItem>
              <GlassmorphismCard className="p-8 h-full">
                <div className="inline-block p-3 bg-[#F2E6D8]/10 rounded-lg mb-4">
                  <CheckCircle className="w-6 h-6 text-[#F2E6D8]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Acompañamiento Continuo
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Te acompañamos en todo el proceso de recuperación de tus uñas 
                  durante el tiempo que lo necesites, con seguimientos disponibles.
                </p>
              </GlassmorphismCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-light text-center mb-16">
              Palabras de Nuestras <span className="text-[#F2E6D8]">Clientas</span>
            </h2>
          </FadeIn>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            <StaggerItem>
              <div className="bg-zinc-900/30 p-6 rounded-lg border border-zinc-800 h-full">
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
            </StaggerItem>
            
            <StaggerItem>
              <div className="bg-zinc-900/30 p-6 rounded-lg border border-zinc-800 h-full">
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
            </StaggerItem>
            
            <StaggerItem>
              <div className="bg-zinc-900/30 p-6 rounded-lg border border-zinc-800 h-full">
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
            </StaggerItem>
          </StaggerContainer>
          
          <FadeIn delay={0.3}>
            <div className="text-center mt-12">
              <p className="text-[#F2E6D8] font-light">
                <AnimatedCounter value={40} suffix="+" /> reseñas verificadas • 5.0 de calificación en Booksy
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#F2E6D8]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[#F2E6D8]/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-3xl relative">
          <FadeIn>
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <MessageCircle className="w-12 h-12 text-[#F2E6D8] mx-auto mb-6" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Preguntas <span className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent">Frecuentes</span>
              </h2>
              <p className="text-gray-400 mt-4 max-w-xl mx-auto">
                Todo lo que necesitas saber sobre la onicoplastia
              </p>
            </div>
          </FadeIn>
          
          <StaggerContainer className="space-y-4" staggerDelay={0.1}>
            <Accordion type="single" collapsible className="space-y-4">
              <StaggerItem>
                <AccordionItem value="item-1" className="group relative rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-[#F2E6D8]/40 hover:bg-zinc-900/70 transition-all duration-300 px-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F2E6D8]/0 via-[#F2E6D8]/5 to-[#F2E6D8]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <AccordionTrigger className="text-left font-semibold hover:text-[#F2E6D8] py-6 relative">
                    ¿Qué es la onicoplastia?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 leading-relaxed pb-6 relative">
                    La onicoplastia es un tratamiento profesional especializado para la restauración 
                    de uñas afectadas por hongos u otras condiciones. Utilizamos técnicas avanzadas 
                    y tecnología <span className="text-[#F2E6D8]">IBX®</span> para eliminar el problema desde la raíz y reconstruir la uña.
                  </AccordionContent>
                </AccordionItem>
              </StaggerItem>
              
              <StaggerItem>
                <AccordionItem value="item-2" className="group relative rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-[#F2E6D8]/40 hover:bg-zinc-900/70 transition-all duration-300 px-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F2E6D8]/0 via-[#F2E6D8]/5 to-[#F2E6D8]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <AccordionTrigger className="text-left font-semibold hover:text-[#F2E6D8] py-6 relative">
                    ¿Es doloroso el tratamiento?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 leading-relaxed pb-6 relative">
                    <span className="text-[#F2E6D8] font-medium">No</span>, el tratamiento es completamente indoloro. Es tan suave como un manicure regular. 
                    Como enfermera registrada, mi prioridad es tu comodidad y bienestar durante todo el proceso.
                  </AccordionContent>
                </AccordionItem>
              </StaggerItem>
              
              <StaggerItem>
                <AccordionItem value="item-3" className="group relative rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-[#F2E6D8]/40 hover:bg-zinc-900/70 transition-all duration-300 px-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F2E6D8]/0 via-[#F2E6D8]/5 to-[#F2E6D8]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <AccordionTrigger className="text-left font-semibold hover:text-[#F2E6D8] py-6 relative">
                    ¿Cuánto tiempo dura el tratamiento?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 leading-relaxed pb-6 relative">
                    La sesión completa dura hasta <span className="text-[#F2E6D8] font-medium">2 horas</span>. Durante este tiempo realizamos 
                    la evaluación, el tratamiento IBX®, la aplicación de la prótesis y el GEL Polish. 
                    Sales con uñas perfectas el mismo día.
                  </AccordionContent>
                </AccordionItem>
              </StaggerItem>
              
              <StaggerItem>
                <AccordionItem value="item-4" className="group relative rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-[#F2E6D8]/40 hover:bg-zinc-900/70 transition-all duration-300 px-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F2E6D8]/0 via-[#F2E6D8]/5 to-[#F2E6D8]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <AccordionTrigger className="text-left font-semibold hover:text-[#F2E6D8] py-6 relative">
                    ¿Cuál es la inversión?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 leading-relaxed pb-6 relative">
                    La primera evaluación completa es de <span className="text-[#F2E6D8] font-semibold">$120</span> e incluye todo el tratamiento (hasta 2 horas) 
                    con GEL Polish profesional. Los seguimientos mensuales tienen un costo de <span className="text-[#F2E6D8] font-semibold">$80</span>. 
                    Es una inversión en tu salud y bienestar.
                  </AccordionContent>
                </AccordionItem>
              </StaggerItem>
              
              <StaggerItem>
                <AccordionItem value="item-5" className="group relative rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-[#F2E6D8]/40 hover:bg-zinc-900/70 transition-all duration-300 px-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F2E6D8]/0 via-[#F2E6D8]/5 to-[#F2E6D8]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <AccordionTrigger className="text-left font-semibold hover:text-[#F2E6D8] py-6 relative">
                    ¿Qué hace especial este tratamiento?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 leading-relaxed pb-6 relative">
                    Combinamos el tratamiento <span className="text-[#F2E6D8]">IBX®</span> con técnicas profesionales de reconstrucción. 
                    Como enfermera registrada, entiendo la importancia de un tratamiento seguro y efectivo. 
                    Nuestro enfoque integral asegura no solo uñas hermosas, sino también saludables.
                  </AccordionContent>
                </AccordionItem>
              </StaggerItem>
            </Accordion>
          </StaggerContainer>
        </div>
      </section>

      {/* Shop Promotion */}
      <ShopPromotion />

      {/* Final CTA Section */}
      <section className="px-4 py-24">
        <div className="container mx-auto max-w-5xl">
          <FadeIn>
            <div className="relative rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-12 sm:p-16 text-center border border-zinc-800 overflow-hidden">
              {/* Animated Decorative elements */}
              <motion.div 
                className="absolute top-0 left-0 w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-96 h-96 bg-[#F2E6D8]/5 rounded-full blur-3xl"
                animate={{ 
                  scale: [1.15, 1, 1.15],
                  opacity: [0.5, 0.3, 0.5]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              
              <div className="relative space-y-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles className="w-12 h-12 text-[#F2E6D8] mx-auto" />
                </motion.div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent">
                    Comienza Tu Transformación
                  </span>
                </h2>
                
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Dale a tus uñas el cuidado profesional que merecen
                </p>
                
                <MagneticButton>
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-[#F2E6D8] hover:bg-[#E6D0B8] text-black font-bold text-base sm:text-lg px-6 sm:px-12 py-6 shadow-2xl hover:shadow-[#F2E6D8]/30 transition-all hover:scale-105" 
                    asChild
                  >
                    <a
                      href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-5 h-5 flex-shrink-0" />
                      RESERVAR EVALUACIÓN
                    </a>
                  </Button>
                </MagneticButton>
                
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 pt-6">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span>Hatillo, PR 00659</span>
                  </div>
                  <span className="text-zinc-700">•</span>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#F2E6D8]" />
                    <span>RN & IBX® Certificada</span>
                  </div>
                  <span className="text-zinc-700">•</span>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#F2E6D8]" />
                    <span><AnimatedCounter value={40} suffix="+" /> Reseñas 5⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
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