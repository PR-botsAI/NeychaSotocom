import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useEditorialMotion } from "@/hooks/use-editorial-motion";

const BOOKSY_URL = "https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo";

const CREDENTIALS = [
  { label: "Enfermera Registrada (RN)", desc: "Formación en la UPRA, Arecibo — licencia vigente. Higiene clínica y disciplina aplicadas a la estética." },
  { label: "Certificación en Onicoplastia", desc: "Certificación internacional en sistemas profesionales de fortalecimiento de uñas — una de las pocas técnicas en PR." },
  { label: "40+ Reseñas 5.0/5", desc: "Calificación perfecta en Booksy — clientes reales, resultados reales." },
  { label: "Estándares HEMA/TPO-Free", desc: "Productos sin los alérgenos más comunes en servicios de uñas." },
];

const COMMON_CASES = [
  { name: "Hongos en las uñas", desc: "Uñas amarillas, gruesas o quebradizas después de años intentando de todo. Reconstruimos su apariencia desde la primera visita, mientras la uña natural se recupera." },
  { name: "Uñas engrosadas por los años", desc: "Con el tiempo la uña cambia de forma y de grosor. La alisamos y le devolvemos una apariencia natural y cuidada." },
  { name: "Trauma o accidente", desc: "Uñas levantadas, deformadas o perdidas por un golpe. Prótesis especializada con apariencia natural al instante." },
  { name: "Daño por gel o acrílico", desc: "Uñas finas y debilitadas por años de producto o una remoción agresiva. Las fortalecemos desde adentro mientras crecen sanas." },
  { name: "Pies comprometidos", desc: "Diabetes, psoriasis u otras condiciones: la formación en enfermería me permite evaluar cada caso con criterio. Si lo tuyo requiere precaución médica, te lo digo con honestidad." },
];

const MINI_CASES = [
  { before: "/cases/Caso1_before.webp", after: "/cases/Caso1_After.webp" },
  { before: "/cases/Caso3_before.webp", after: "/cases/Caso3_after.webp" },
  { before: "/cases/Caso4_before.webp", after: "/cases/Caso4_after.webp" },
  { before: "/cases/Caso6_before.webp", after: "/cases/Caso6_after.webp" },
];

export default function SobreMi() {
  const root = useRef<HTMLDivElement>(null);
  useEditorialMotion(root);

  return (
    <div ref={root} className="relative min-h-screen">
      {/* ════════ HERO ════════ */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 px-5 sm:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="flex-shrink-0 relative">
              <div
                className="absolute inset-0 -m-10 bg-[radial-gradient(circle,rgba(242,230,216,0.14)_0%,rgba(242,230,216,0.04)_40%,transparent_70%)] blur-2xl pointer-events-none"
                aria-hidden="true"
              />
              <img
                src="/assets/neycha-profile.png?v=transparent"
                alt="Neycha Soto — Enfermera registrada y especialista en onicoplastia en Hatillo, PR"
                className="relative w-56 h-56 sm:w-72 sm:h-72 object-contain drop-shadow-[0_8px_24px_rgba(242,230,216,0.18)]"
              />
            </div>

            <div className="flex-1 text-center lg:text-left">
              <p className="reveal-line line-mask text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mb-5">
                <span className="inline-block">Conoce a tu especialista</span>
              </p>
              <h1 className="font-display font-light text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.02] text-[#f5f1ea] mb-5">
                <span className="reveal-line line-mask"><span className="inline-block">Soy <em className="italic text-[var(--cream)]">Neycha Soto.</em></span></span>
              </h1>
              <p className="text-sm sm:text-base font-light text-white/65 mb-6">
                Enfermera registrada y especialista certificada en onicoplastia
              </p>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/40">
                Certificada en Onicoplastia &mdash; 40+ Reseñas 5.0 &mdash; Hatillo, PR
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ STORY — short, service-first ════════ */}
      <section className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="container mx-auto max-w-2xl">
          <div className="space-y-7 text-[15px] sm:text-base font-light text-white/70 leading-relaxed">
            <p>
              Vengo del campo de la salud: soy enfermera registrada, formada en la
              UPRA — Universidad de Puerto Rico, Arecibo — con licencia vigente.
              Hoy mi práctica es la onicoplastia, pero el estándar lo traje conmigo:
              higiene clínica, precisión, y un respeto profundo por cada persona
              que se sienta en mi silla.
            </p>
            <p>
              Las uñas me salvaron — y desde entonces me toca devolver el favor.
              Porque esto va mucho más allá de arreglar una uña: es ver a alguien
              dar la mano sin esconderla, volver a la playa, vivir sin pensar en
              sus pies.
            </p>

            <p className="reveal-line line-mask py-4">
              <span className="inline-block font-display italic text-2xl sm:text-3xl text-[var(--cream)] leading-snug">
                Hay clientas que llegan a su segunda cita con sandalias nuevas.
                Llevaban años sin comprarse unas.
              </span>
            </p>

            <p>
              Por eso atiendo una clienta a la vez, solo con cita previa, en un
              estudio privado en Hatillo: evaluación personalizada, los productos
              más limpios del mercado, y un plan diseñado para tu caso — no un
              protocolo genérico.
            </p>

            <blockquote className="border-l border-[var(--gold)]/60 pl-6 py-2 mt-10">
              <p className="font-display italic text-lg sm:text-xl text-[#f5f1ea] leading-relaxed">
                &ldquo;Cada cliente es único. Por eso trabajo solo con cita previa &mdash;
                para dedicarte toda mi atención y darte resultados excepcionales.&rdquo;
              </p>
              <footer className="text-[11px] tracking-[0.2em] uppercase text-[var(--cream)]/70 mt-3">
                &mdash; Neycha Soto
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ════════ COMMON CASES — what we see most in the studio ════════ */}
      <section className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="container mx-auto max-w-3xl">
          <p className="reveal-line line-mask text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
            <span className="inline-block">Lo que más atendemos</span>
          </p>
          <h2 className="font-display font-light text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.05] text-[#f5f1ea] mb-10">
            <span className="reveal-line line-mask"><span className="inline-block">¿Te suena <em className="italic text-[var(--cream)]">familiar?</em></span></span>
          </h2>

          <div className="stagger-up">
            {COMMON_CASES.map((c) => (
              <div key={c.name} className="grid sm:grid-cols-[240px_1fr] gap-x-10 gap-y-1 py-6 border-t border-white/10">
                <h3 className="text-sm tracking-[0.12em] uppercase text-[var(--cream)]">{c.name}</h3>
                <p className="text-sm font-light text-white/50 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-[11px] font-light text-white/35 mt-6">
            Servicio estético, no médico — condiciones subyacentes pueden requerir seguimiento con tu médico.
          </p>

          <a
            href={BOOKSY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 mt-8 text-xs tracking-[0.2em] uppercase text-[var(--cream)] border-b border-[var(--cream)]/40 hover:border-[var(--cream)] pb-1 transition-colors duration-200"
          >
            Agenda tu evaluación personalizada
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
      </section>

      {/* ════════ CREDENTIALS ════════ */}
      <section className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-display font-light text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.05] text-[#f5f1ea] mb-10">
            <span className="reveal-line line-mask"><span className="inline-block">Formación y <em className="italic text-[var(--cream)]">credenciales.</em></span></span>
          </h2>

          <div className="stagger-up">
            {CREDENTIALS.map((c) => (
              <div key={c.label} className="grid sm:grid-cols-[240px_1fr] gap-x-10 gap-y-1 py-6 border-t border-white/10">
                <h3 className="text-sm tracking-[0.12em] uppercase text-[var(--cream)]">{c.label}</h3>
                <p className="text-sm font-light text-white/50 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-sm font-light text-white/45 leading-relaxed mt-8 max-w-xl">
            Un consejo de profesional a cliente: no importa con quién vayas,
            pregúntale siempre a tu técnica si está certificada.
          </p>
        </div>
      </section>

      {/* ════════ MINI GALLERY — hover/tap to reveal the result ════════ */}
      <section className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display font-light text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.05] text-[#f5f1ea] mb-3">
            <span className="reveal-line line-mask"><span className="inline-block">Casos <em className="italic text-[var(--cream)]">reales.</em></span></span>
          </h2>
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/35 mb-10">
            Pasa el cursor sobre cada imagen para ver el resultado
          </p>

          <div className="stagger-up grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MINI_CASES.map((c, i) => (
              <div key={i} className="relative overflow-hidden border border-white/15 aspect-square group">
                <img
                  src={c.before}
                  alt={`Caso ${i + 1} antes`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                  loading="lazy"
                />
                <img
                  src={c.after}
                  alt={`Caso ${i + 1} después`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
                <span className="absolute bottom-2.5 left-2.5 text-[9px] tracking-[0.2em] uppercase bg-black/50 backdrop-blur-sm text-white/85 px-2 py-0.5 group-hover:opacity-0 transition-opacity duration-200">
                  Antes
                </span>
                <span className="absolute bottom-2.5 right-2.5 text-[9px] tracking-[0.2em] uppercase bg-[var(--cream)]/90 text-black px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Después
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="py-24 sm:py-36 px-5 sm:px-8">
        <div className="container mx-auto text-center">
          <h2 className="font-display font-light text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.02] text-[#f5f1ea] mb-6">
            <span className="reveal-line line-mask"><span className="inline-block">¿Lista para tu <em className="italic text-[var(--cream)]">transformación?</em></span></span>
          </h2>
          <p className="text-sm font-light text-white/55 mb-12">
            Evaluación personalizada &mdash; reserva en menos de 3 minutos, sin compromiso.
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
              Estudio privado &mdash; Solo con cita previa &mdash; Hatillo, PR
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
