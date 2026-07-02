import { useRef } from "react";
import { ArrowRight, Instagram, Facebook, Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useEditorialMotion } from "@/hooks/use-editorial-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const BOOKSY_URL = "https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo";
const WHATSAPP_URL = "https://wa.me/19394290292";

const FAQS = [
  {
    q: "¿Cuánto cuesta el servicio?",
    a: "Nuestra especialidad es la onicoplastia: $120 la primera sesión (hasta 2 horas — evaluación, reconstrucción y acabado incluidos) y $80 los seguimientos. El precio es por sesión, no por uña, y no hay costos ocultos. También ofrecemos manicura y pedicura para clientes del estudio — pregunta por disponibilidad al reservar.",
  },
  {
    q: "¿Cómo agendo mi cita?",
    a: "Directamente en Booksy. Tienes el botón arriba y abajo de esta página. Reserva en menos de 3 minutos con confirmación instantánea. Ahí ves la disponibilidad real al día.",
  },
  {
    q: "¿Aceptan walk-ins?",
    a: "No. Trabajamos solo con cita previa para dedicarte la atención completa. Esto también nos permite preparar el estudio según tu servicio.",
  },
  {
    q: "¿Cuáles formas de pago aceptan?",
    a: "Efectivo, ATH Móvil y tarjeta de crédito/débito. El pago es el día de la cita. Para clientes nuevos se requiere un depósito al momento de reservar (lo verás al agendar en Booksy).",
  },
  {
    q: "¿Aceptan plan médico?",
    a: "No. Somos servicio estético, no médico. Algunos planes HSA/FSA pueden cubrir tratamientos estéticos — consulta con tu plan.",
  },
  {
    q: "¿Es para hombres también?",
    a: "Sí. Aproximadamente la mitad de nuestros clientes son hombres — muchos llevan años sin usar chancletas en la playa por uñas dañadas. Atendemos sin prejuicios.",
  },
  {
    q: "¿Cómo me preparo para mi cita?",
    a: "Llega con las uñas naturales o con el producto previo (si tienes gel/acrílico, nosotros lo removemos). Evita aplicarte aceites el día de la cita. Puedes traer una foto de inspiración si tienes algo en mente.",
  },
  {
    q: "Tengo una condición especial (psoriasis, hongos, diabetes). ¿Pueden atenderme?",
    a: "En la mayoría de los casos sí — y con total transparencia: somos un servicio estético, no médico. No diagnosticamos ni tratamos condiciones de salud; si algo merece atención médica, te lo decimos con honestidad para que lo consultes con tu médico o podólogo. Lo que sí ofrecemos: productos hipoalergénicos de alta calidad, protocolos rigurosos de higiene, y un estudio privado donde puedes atenderte con total tranquilidad.",
  },
  {
    q: "¿Qué hace diferentes sus productos?",
    a: "Trabajamos con los productos más limpios disponibles en el mercado: HEMA-Free, Di-HEMA-Free, TPO-Free, veganos, hipoalergénicos y de bajo olor. La razón es simple — las uñas y pies que atendemos exigen ese estándar, y ese mismo cuidado se aplica a cada cliente, sea cual sea su caso.",
  },
  {
    q: "¿Tengo que ir a Hatillo?",
    a: "Sí, el estudio está en Hatillo, Puerto Rico. Si vienes de lejos, asegúrate de revisar bien la disponibilidad en Booksy antes de agendar. La dirección exacta se confirma al reservar.",
  },
  {
    q: "¿Política de cancelación?",
    a: "Cancela o reagenda con al menos 48 horas de anticipación a través de Booksy. Cancelaciones de último minuto afectan a otros clientes en lista de espera.",
  },
];

const WHATSAPP_RULES = [
  { strong: "Solo mensajes de texto.", rest: " No aceptamos llamadas ni notas de voz." },
  { strong: "No es para reservar.", rest: " Reservas siempre en Booksy." },
  { strong: "Respondemos cuando podemos.", rest: " Estamos a máxima capacidad — la respuesta puede tardar." },
  { strong: "", rest: "Si tu pregunta ya está en las FAQs arriba, no la repetimos por WhatsApp." },
];

const BOOKING_RULES = [
  { rule: "Solo con cita previa", why: "Aparto tu tiempo exclusivamente para ti — sin filas ni prisas." },
  { rule: "Sin sala de espera", why: "Tu cita comienza a tu hora, en un ambiente íntimo y privado." },
  { rule: "Evaluación para clientes nuevos", why: "Conocer tu caso primero es lo que nos permite darte el mejor resultado." },
  { rule: "Un espacio solo para ti", why: "Para cuidar tu privacidad y mi concentración, la cita es individual (sin acompañantes)." },
];

const POLICIES = [
  {
    q: "El depósito, explicado",
    a: "Cuando reservas, aparto ese tiempo únicamente para ti. Por eso pedimos un depósito del 50% del servicio — que se aplica completo a tu factura el día de la cita, así que no es un costo adicional: es parte de tu tratamiento. Si necesitas mover tu cita, con gusto la reprogramamos; solo te pedimos avisarnos con al menos 48 horas de anticipación. Si cancelas o reprogramas con menos de 48 horas — o no puedes asistir — el depósito no se reembolsa, porque ese espacio ya quedó guardado para ti.",
  },
  {
    q: "Trusted Clients — cuando ya nos conocemos",
    a: "Después de 3 citas, te damos la bienvenida como Trusted Client: reservas tus próximas citas sin depósito por adelantado. Es nuestra manera de agradecerte la confianza y hacerte todo más sencillo.",
  },
  {
    q: "Puntualidad e imprevistos",
    a: "La vida pasa, lo entendemos. No hacemos cargos automáticos por faltar — solo te pedimos avisar si algo cambia. Si llegas muy tarde y ya no alcanzamos a completar tu servicio, tendremos que reprogramarlo. Un mensajito a tiempo siempre lo resuelve todo.",
  },
  {
    q: "Sobre el beneficio sin depósito",
    a: "El privilegio de reservar sin depósito se basa en la confianza mutua. Si llegaran a acumularse dos cancelaciones muy tardías, o una sola inasistencia sin aviso, volvemos al depósito del 50% en tu próxima reserva — sin penalidades ni dramas. Y como todo aquí, esa confianza se puede volver a ganar con tus próximas visitas.",
  },
];

export default function Contact() {
  const root = useRef<HTMLDivElement>(null);
  useEditorialMotion(root);

  return (
    <div ref={root} className="relative min-h-screen">
      {/* ════════ HERO ════════ */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 px-5 sm:px-8 text-center">
        <div className="container mx-auto max-w-3xl">
          <p className="reveal-line line-mask text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mb-5">
            <span className="inline-block">Contacto</span>
          </p>
          <h1 className="font-display font-light text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.02] text-[#f5f1ea] mb-6">
            <span className="reveal-line line-mask"><span className="inline-block">Estamos <em className="italic text-[var(--cream)]">para ti.</em></span></span>
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base font-light text-white/65 leading-relaxed mb-10">
            La forma más rápida de agendar es directamente en Booksy.
            Las preguntas más frecuentes ya están respondidas más abajo.
          </p>

          <div className="flex flex-col items-center gap-4">
            <a
              href={BOOKSY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[var(--cream)] text-black px-12 py-5 text-sm font-medium tracking-[0.2em] uppercase transition-[transform,box-shadow] duration-200 hover:shadow-[0_12px_50px_rgba(242,230,216,0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Agenda tu cita
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/35">
              Reserva en menos de 3 minutos &mdash; confirmación instantánea
            </p>
          </div>
        </div>
      </section>

      {/* ════════ LOCATION + HOURS ════════ */}
      <section className="py-12 sm:py-16 px-5 sm:px-8">
        <div className="container mx-auto max-w-3xl">
          <div className="stagger-up grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="glass-panel p-8">
              <h3 className="text-xs tracking-[0.2em] uppercase text-[var(--cream)] mb-3">Ubicación</h3>
              <p className="text-sm font-light text-white/75">Hatillo, Puerto Rico</p>
              <p className="text-xs font-light text-white/40 mt-2 leading-relaxed">
                Dirección exacta se confirma al agendar &mdash; estudio privado
              </p>
            </div>
            <div className="glass-panel p-8">
              <h3 className="text-xs tracking-[0.2em] uppercase text-[var(--cream)] mb-3">Horario</h3>
              <p className="text-sm font-light text-white/75">Martes a Sábado</p>
              <p className="text-xs font-light text-white/40 mt-2 leading-relaxed">
                Solo con cita previa &mdash; no walk-ins
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ POLICIES — booking rules + payment/cancellation ════════ */}
      <section id="politicas" className="py-16 sm:py-24 px-5 sm:px-8 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <p className="reveal-line line-mask text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
            <span className="inline-block">Antes de reservar</span>
          </p>
          <h2 className="font-display font-light text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.05] text-[#f5f1ea] mb-4">
            <span className="reveal-line line-mask"><span className="inline-block">Reservar, con <em className="italic text-[var(--cream)]">cuidado.</em></span></span>
          </h2>
          <p className="text-sm font-light text-white/55 mb-10 max-w-lg leading-relaxed">
            Como te atiendo a ti sola, sin prisa, tu cita es un momento reservado solo para ti.
            Aquí te explico con transparencia cómo funciona &mdash; para que llegues con toda tranquilidad.
          </p>

          {/* how the studio works — rule + the reason behind it */}
          <div className="stagger-up grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            {BOOKING_RULES.map((r) => (
              <div key={r.rule} className="flex items-start gap-3 py-3 border-t border-white/10">
                <Check className="w-4 h-4 text-[var(--gold)] flex-shrink-0 mt-0.5" />
                <span>
                  <span className="block text-sm text-[#f5f1ea]">{r.rule}</span>
                  <span className="block text-xs font-light text-white/45 mt-1 leading-relaxed">{r.why}</span>
                </span>
              </div>
            ))}
          </div>

          {/* deposit & cancellation — reassuring, collapsible */}
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 mt-14 mb-4">El depósito y las cancelaciones</p>
          <Accordion type="single" collapsible>
            {POLICIES.map((p, i) => (
              <AccordionItem key={i} value={`pol-${i}`} className="border-b border-white/10">
                <AccordionTrigger className="text-left text-sm sm:text-base font-normal text-[#f5f1ea] hover:text-[var(--cream)] hover:no-underline py-5">
                  {p.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm font-light text-white/55 leading-relaxed pb-6">
                  {p.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm font-light text-white/55">
              ¿Con dudas antes de reservar? Es normal &mdash; damos el primer paso juntas.
            </p>
            <a
              href={BOOKSY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[var(--cream)] border-b border-[var(--cream)]/40 hover:border-[var(--cream)] pb-1 transition-colors duration-200 self-start"
            >
              Agenda tu evaluación
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="container mx-auto max-w-3xl">
          <p className="reveal-line line-mask text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
            <span className="inline-block">Antes de escribirnos</span>
          </p>
          <h2 className="font-display font-light text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.05] text-[#f5f1ea] mb-4">
            <span className="reveal-line line-mask"><span className="inline-block">Preguntas <em className="italic text-[var(--cream)]">frecuentes.</em></span></span>
          </h2>
          <p className="text-sm font-light text-white/45 mb-10 max-w-md">
            El 90% de las dudas se responden aquí abajo. Léelas antes de escribir &mdash; nos ahorras tiempo a las dos.
          </p>

          <Accordion type="single" collapsible>
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10">
                <AccordionTrigger className="text-left text-sm sm:text-base font-normal text-[#f5f1ea] hover:text-[var(--cream)] hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm font-light text-white/55 leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ════════ WHATSAPP — strictly gated ════════ */}
      <section className="py-12 sm:py-16 px-5 sm:px-8">
        <div className="container mx-auto max-w-2xl">
          <div className="glass-panel p-8 sm:p-10">
            <h3 className="font-display font-light text-xl sm:text-2xl text-[#f5f1ea] mb-2">
              ¿Tu pregunta no está arriba?
            </h3>
            <p className="text-xs font-light text-white/45 mb-7">
              Antes de escribir por WhatsApp, lee las reglas:
            </p>

            <ul className="mb-8">
              {WHATSAPP_RULES.map((rule, i) => (
                <li key={i} className="flex items-baseline gap-4 py-3 border-t border-white/10 text-sm font-light text-white/65">
                  <span className="w-1 h-1 rounded-full bg-[var(--gold)] flex-shrink-0 translate-y-[-3px]" />
                  <span>
                    {rule.strong && <strong className="font-normal text-[#f5f1ea]">{rule.strong}</strong>}
                    {rule.rest}
                  </span>
                </li>
              ))}
            </ul>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366] hover:text-[#25D366] text-xs tracking-[0.15em] uppercase font-normal py-6 rounded-none bg-transparent"
                >
                  <SiWhatsapp className="w-4 h-4 mr-2" />
                  Escribir por WhatsApp (caso especial)
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#111] border-white/10 max-w-md">
                <DialogTitle className="font-display font-light text-xl text-[#f5f1ea]">
                  Confirma antes de continuar
                </DialogTitle>
                <DialogDescription className="text-white/55 text-sm font-light pt-2 leading-relaxed">
                  Confirmas que: (1) ya leíste las FAQs arriba, (2) tu pregunta es específica de tu caso, y
                  (3) entiendes que solo recibimos mensajes de texto y respondemos cuando hay disponibilidad.
                </DialogDescription>
                <div className="pt-4 space-y-2">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-[#25D366] hover:bg-[#20bd59] text-white text-xs tracking-[0.15em] uppercase font-normal py-6 rounded-none">
                      <SiWhatsapp className="w-4 h-4 mr-2" />
                      Continuar a WhatsApp
                    </Button>
                  </a>
                  <p className="text-[10px] text-white/35 text-center mt-2 tracking-[0.15em] uppercase">
                    Solo texto &mdash; Sin llamadas &mdash; Sin notas de voz
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* ════════ SOCIAL ════════ */}
      <section className="py-12 sm:py-16 px-5 sm:px-8">
        <div className="container mx-auto max-w-2xl">
          <div className="stagger-up">
            <a
              href="https://www.instagram.com/neychasoto_com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 py-5 border-t border-white/10 transition-colors duration-200"
            >
              <span className="flex items-center gap-4">
                <Instagram className="w-4 h-4 text-white/40 group-hover:text-[var(--cream)] transition-colors duration-200" />
                <span className="text-sm font-light text-white/70 group-hover:text-[#f5f1ea] transition-colors duration-200">
                  Instagram <span className="text-white/40">@neychasoto_com</span>
                </span>
              </span>
              <ArrowRight className="w-4 h-4 text-white/25 group-hover:text-[var(--cream)] group-hover:translate-x-1 transition-[color,transform] duration-200" />
            </a>
            <a
              href="https://www.facebook.com/neychasotocom"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 py-5 border-t border-b border-white/10 transition-colors duration-200"
            >
              <span className="flex items-center gap-4">
                <Facebook className="w-4 h-4 text-white/40 group-hover:text-[var(--cream)] transition-colors duration-200" />
                <span className="text-sm font-light text-white/70 group-hover:text-[#f5f1ea] transition-colors duration-200">
                  Facebook <span className="text-white/40">Neycha Soto</span>
                </span>
              </span>
              <ArrowRight className="w-4 h-4 text-white/25 group-hover:text-[var(--cream)] group-hover:translate-x-1 transition-[color,transform] duration-200" />
            </a>
            <p className="text-[11px] font-light text-white/35 mt-4">
              Trabajos recientes, casos antes/después, y promociones
            </p>
          </div>
        </div>
      </section>

      {/* ════════ FINAL CTA ════════ */}
      <section className="py-24 sm:py-36 px-5 sm:px-8">
        <div className="container mx-auto text-center">
          <h2 className="font-display font-light text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.02] text-[#f5f1ea] mb-6">
            <span className="reveal-line line-mask"><span className="inline-block">¿Listo para transformar <em className="italic text-[var(--cream)]">tus uñas?</em></span></span>
          </h2>
          <p className="text-sm font-light text-white/55 mb-12">
            Reservas en Booksy. Confirmación instantánea. Sin llamadas.
          </p>

          <div className="flex flex-col items-center gap-6">
            <a
              href={BOOKSY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[var(--cream)] text-black px-12 py-5 text-sm font-medium tracking-[0.2em] uppercase transition-[transform,box-shadow] duration-200 hover:shadow-[0_12px_50px_rgba(242,230,216,0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Agenda tu cita
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/35">
              Disponible vía Booksy &mdash; Respuesta inmediata
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
