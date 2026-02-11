import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FadeIn, TextReveal } from "@/components/motion-wrapper";
import { GlassmorphismCard } from "@/components/glassmorphism-card";
import { MagneticButton } from "@/components/magnetic-button";
import { WhatsAppDialog } from "@/components/whatsapp-dialog";
import {
  symptomGroups,
  durationOptions,
  generalPreventionTips,
  conditions as allConditions,
} from "@/data/nail-conditions";
import {
  runDiagnosis,
  type DiagnosisInput,
  type DiagnosisResult,
} from "@/lib/diagnosis-engine";
import { cases } from "@/data/cases";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import {
  Calendar,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Heart,
  Shield,
  Clock,
  MessageSquare,
  Brain,
  Hand,
  Footprints,
  Scan,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import type { BodyArea } from "@/data/nail-conditions";
import type { DiagnosisMatch } from "@/lib/diagnosis-engine";

const BOOKSY_URL =
  "https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo";

const premiumEase = [0.16, 1, 0.3, 1] as const;

// ─── STEP DEFINITIONS ──────────────────────────────────────

type Step = "intro" | "area" | "symptoms" | "duration" | "analyzing" | "results";

const stepOrder: Step[] = ["intro", "area", "symptoms", "duration", "analyzing", "results"];

function getStepIndex(step: Step) {
  return stepOrder.indexOf(step);
}

function getProgress(step: Step) {
  const idx = getStepIndex(step);
  if (step === "intro") return 0;
  if (step === "results") return 100;
  return Math.round((idx / (stepOrder.length - 1)) * 100);
}

// ─── MAIN COMPONENT ────────────────────────────────────────

export default function Diagnostico() {
  const [step, setStep] = useState<Step>("intro");
  const [area, setArea] = useState<BodyArea | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (next: Step) => {
      const currentIdx = getStepIndex(step);
      const nextIdx = getStepIndex(next);
      setDirection(nextIdx > currentIdx ? 1 : -1);
      setStep(next);
    },
    [step]
  );

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleAnalyze = useCallback(() => {
    goTo("analyzing");

    // Simulate AI processing delay for dramatic effect
    setTimeout(() => {
      const input: DiagnosisInput = {
        area: area!,
        symptoms: selectedSymptoms,
        duration: duration!,
      };
      const diagnosisResult = runDiagnosis(input);
      setResult(diagnosisResult);
      goTo("results");
    }, 2800);
  }, [area, selectedSymptoms, duration, goTo]);

  const handleRestart = () => {
    setArea(null);
    setSelectedSymptoms([]);
    setDuration(null);
    setResult(null);
    goTo("intro");
  };

  // Animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
      scale: 0.97,
    }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
      scale: 0.97,
    }),
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Progress bar */}
      {step !== "intro" && step !== "results" && (
        <div className="fixed top-16 left-0 right-0 z-40">
          <Progress
            value={getProgress(step)}
            className="h-1 rounded-none bg-zinc-900 [&>div]:bg-gradient-to-r [&>div]:from-[#F2E6D8] [&>div]:to-[#F2E6D8]/70 [&>div]:transition-all [&>div]:duration-700"
          />
        </div>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: premiumEase }}
        >
          {step === "intro" && <IntroStep onStart={() => goTo("area")} />}
          {step === "area" && (
            <AreaStep
              selected={area}
              onSelect={(a) => {
                setArea(a);
                goTo("symptoms");
              }}
            />
          )}
          {step === "symptoms" && (
            <SymptomsStep
              selected={selectedSymptoms}
              onToggle={toggleSymptom}
              onBack={() => goTo("area")}
              onNext={() => goTo("duration")}
            />
          )}
          {step === "duration" && (
            <DurationStep
              selected={duration}
              onSelect={(d) => {
                setDuration(d);
                handleAnalyze();
              }}
              onBack={() => goTo("symptoms")}
            />
          )}
          {step === "analyzing" && <AnalyzingStep />}
          {step === "results" && result && (
            <ResultsStep
              result={result}
              area={area!}
              onRestart={handleRestart}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── INTRO STEP ────────────────────────────────────────────

function IntroStep({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#F2E6D8]/5 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#F2E6D8]/3 rounded-full blur-[100px]"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-2xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F2E6D8]/20 to-[#F2E6D8]/5 border border-[#F2E6D8]/20 flex items-center justify-center"
        >
          <Brain className="w-10 h-10 text-[#F2E6D8]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent">
              Diagnóstico Inteligente
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl text-gray-300 font-medium">
            de Uñas
          </h2>
        </motion.div>

        <motion.p
          className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          Responde unas preguntas simples sobre tus uñas y nuestro sistema
          analizará tus síntomas para darte una orientación personalizada con
          recomendaciones de cuidado.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-3 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {[
            { icon: Shield, text: "Privado y seguro" },
            { icon: Clock, text: "2 minutos" },
            { icon: Sparkles, text: "Recomendaciones personalizadas" },
          ].map(({ icon: Icon, text }) => (
            <span
              key={text}
              className="inline-flex items-center gap-1.5 text-gray-400 bg-zinc-900/50 border border-zinc-800 px-3 py-1.5 rounded-full"
            >
              <Icon className="w-3.5 h-3.5 text-[#F2E6D8]" />
              {text}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
        >
          <MagneticButton>
            <Button
              size="lg"
              className="bg-[#F2E6D8] hover:bg-[#E6D0B8] text-black font-bold text-lg px-10 py-7 shadow-2xl hover:shadow-[#F2E6D8]/30 transition-all hover:scale-105 animate-pulse-glow"
              onClick={onStart}
            >
              <Scan className="w-5 h-5 mr-2" />
              COMENZAR DIAGNÓSTICO
            </Button>
          </MagneticButton>
        </motion.div>

        <motion.p
          className="text-xs text-gray-600 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Este diagnóstico es orientativo y educativo. No sustituye la
          consulta con un profesional de salud. Para un diagnóstico definitivo,
          agenda una evaluación.
        </motion.p>
      </div>
    </section>
  );
}

// ─── AREA STEP ─────────────────────────────────────────────

function AreaStep({
  selected,
  onSelect,
}: {
  selected: BodyArea | null;
  onSelect: (area: BodyArea) => void;
}) {
  const options = [
    {
      id: "manos" as BodyArea,
      icon: Hand,
      label: "Manos",
      desc: "Uñas de las manos",
    },
    {
      id: "pies" as BodyArea,
      icon: Footprints,
      label: "Pies",
      desc: "Uñas de los pies",
    },
    {
      id: "ambos" as BodyArea,
      icon: Sparkles,
      label: "Ambos",
      desc: "Manos y pies",
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-xl mx-auto w-full text-center space-y-10">
        <FadeIn>
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#F2E6D8]/60 tracking-widest uppercase">
              Paso 1 de 3
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              <TextReveal
                text="¿Dónde está el problema?"
                className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent"
              />
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {options.map(({ id, icon: Icon, label, desc }, i) => (
            <motion.button
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: premiumEase }}
              onClick={() => onSelect(id)}
              className={`group relative p-8 rounded-xl border transition-all duration-300 ${
                selected === id
                  ? "bg-[#F2E6D8]/10 border-[#F2E6D8]/40"
                  : "bg-zinc-900/30 border-zinc-800 hover:border-[#F2E6D8]/20 hover:bg-zinc-900/50"
              }`}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center gap-4">
                <div
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    selected === id
                      ? "bg-[#F2E6D8]/20"
                      : "bg-zinc-800/50 group-hover:bg-[#F2E6D8]/10"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 transition-colors ${
                      selected === id ? "text-[#F2E6D8]" : "text-gray-400 group-hover:text-[#F2E6D8]"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{label}</h3>
                  <p className="text-sm text-gray-500 mt-1">{desc}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SYMPTOMS STEP ─────────────────────────────────────────

function SymptomsStep({
  selected,
  onToggle,
  onBack,
  onNext,
}: {
  selected: string[];
  onToggle: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <section className="min-h-screen px-4 py-24 sm:py-28">
      <div className="max-w-3xl mx-auto space-y-10">
        <FadeIn>
          <div className="text-center space-y-3">
            <p className="text-sm font-medium text-[#F2E6D8]/60 tracking-widest uppercase">
              Paso 2 de 3
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              <TextReveal
                text="¿Qué notas en tus uñas?"
                className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent"
              />
            </h2>
            <p className="text-gray-400 text-sm">
              Selecciona todo lo que aplique. Mientras más detalles, mejor el análisis.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-8">
          {symptomGroups.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + gi * 0.08, duration: 0.5, ease: premiumEase }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{group.icon}</span>
                <h3 className="text-sm font-semibold text-[#F2E6D8]/80 uppercase tracking-wider">
                  {group.title}
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {group.symptoms.map((symptom) => {
                  const isSelected = selected.includes(symptom.id);
                  return (
                    <motion.button
                      key={symptom.id}
                      onClick={() => onToggle(symptom.id)}
                      className={`relative text-left p-3.5 rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? "bg-[#F2E6D8]/10 border-[#F2E6D8]/40 shadow-lg shadow-[#F2E6D8]/5"
                          : "bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSelected && (
                        <motion.div
                          className="absolute top-2 right-2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <CheckCircle className="w-4 h-4 text-[#F2E6D8]" />
                        </motion.div>
                      )}
                      <span className="text-xl block mb-1.5">{symptom.icon}</span>
                      <span
                        className={`text-sm font-medium block ${
                          isSelected ? "text-[#F2E6D8]" : "text-white"
                        }`}
                      >
                        {symptom.label}
                      </span>
                      <span className="text-[11px] text-gray-500 leading-tight block mt-0.5">
                        {symptom.description}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Atrás
          </Button>
          <div className="text-sm text-gray-500">
            {selected.length} síntoma{selected.length !== 1 && "s"} seleccionado
            {selected.length !== 1 && "s"}
          </div>
          <Button
            onClick={onNext}
            disabled={selected.length === 0}
            className="bg-[#F2E6D8] text-black hover:bg-[#E6D0B8] font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Siguiente
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─── DURATION STEP ─────────────────────────────────────────

function DurationStep({
  selected,
  onSelect,
  onBack,
}: {
  selected: string | null;
  onSelect: (d: string) => void;
  onBack: () => void;
}) {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-xl mx-auto w-full space-y-10">
        <FadeIn>
          <div className="text-center space-y-3">
            <p className="text-sm font-medium text-[#F2E6D8]/60 tracking-widest uppercase">
              Paso 3 de 3
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              <TextReveal
                text="¿Hace cuánto lo notas?"
                className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent"
              />
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {durationOptions.map((opt, i) => (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: premiumEase }}
              onClick={() => onSelect(opt.id)}
              className={`p-6 rounded-xl border text-left transition-all duration-200 ${
                selected === opt.id
                  ? "bg-[#F2E6D8]/10 border-[#F2E6D8]/40"
                  : "bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <Clock
                  className={`w-5 h-5 flex-shrink-0 ${
                    selected === opt.id ? "text-[#F2E6D8]" : "text-gray-500"
                  }`}
                />
                <span
                  className={`text-base font-medium ${
                    selected === opt.id ? "text-[#F2E6D8]" : "text-white"
                  }`}
                >
                  {opt.label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="flex items-center justify-start pt-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Atrás
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─── ANALYZING STEP (THE WOW MOMENT) ──────────────────────

function AnalyzingStep() {
  const steps = [
    "Analizando síntomas seleccionados...",
    "Comparando con base de datos clínica...",
    "Generando recomendaciones personalizadas...",
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center space-y-10">
        {/* Pulsing brain icon */}
        <motion.div
          className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-[#F2E6D8]/20 to-[#F2E6D8]/5 border border-[#F2E6D8]/20 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 0 0 rgba(242,230,216,0)",
              "0 0 40px 10px rgba(242,230,216,0.15)",
              "0 0 0 0 rgba(242,230,216,0)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Brain className="w-12 h-12 text-[#F2E6D8]" />
        </motion.div>

        <div className="space-y-6">
          {steps.map((text, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 justify-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.8, duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.8 + 0.4, type: "spring" }}
              >
                <CheckCircle className="w-4 h-4 text-[#F2E6D8]" />
              </motion.div>
              <span className="text-sm text-gray-300">{text}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-[#F2E6D8] to-[#F2E6D8]/70 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── RESULTS STEP ──────────────────────────────────────────

// ─── EXPANDABLE OTHER MATCH CARD ───────────────────────────

function OtherMatchCard({ match }: { match: DiagnosisMatch }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden"
      layout
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-zinc-800/30 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <h4 className="text-sm font-semibold text-white truncate">
            {match.condition.shortName}
          </h4>
          <span className="text-xs font-bold text-[#F2E6D8] bg-[#F2E6D8]/10 px-2 py-0.5 rounded-full flex-shrink-0">
            {match.confidence}%
          </span>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-zinc-800/50 pt-3">
              <p className="text-xs text-gray-400 leading-relaxed">
                {match.condition.description}
              </p>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[10px] text-[#F2E6D8]/60 uppercase tracking-wider font-semibold mb-1">Lo que ves</p>
                  {match.condition.visualSigns.slice(0, 3).map((sign, i) => (
                    <p key={i} className="text-[11px] text-gray-400 flex items-start gap-1 mb-0.5">
                      <CheckCircle className="w-2.5 h-2.5 text-[#F2E6D8]/50 mt-0.5 flex-shrink-0" />
                      {sign}
                    </p>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] text-[#F2E6D8]/60 uppercase tracking-wider font-semibold mb-1">Qué hacer</p>
                  {match.condition.homeCare.slice(0, 2).map((tip, i) => (
                    <p key={i} className="text-[11px] text-gray-400 flex items-start gap-1 mb-0.5">
                      <span className="text-[#F2E6D8]/50 flex-shrink-0">{i + 1}.</span>
                      {tip}
                    </p>
                  ))}
                </div>
              </div>

              {match.condition.medicalWarning && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-[11px] text-red-400 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Alerta Médica
                  </p>
                  <p className="text-[11px] text-gray-300 mt-1">{match.condition.medicalWarning}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── RESULTS STEP ──────────────────────────────────────────

function ResultsStep({
  result,
  area,
  onRestart,
}: {
  result: DiagnosisResult;
  area: BodyArea;
  onRestart: () => void;
}) {
  const topMatch = result.matches[0];
  const otherMatches = result.matches.slice(1);

  // Find related before/after cases
  const relatedCaseData = topMatch
    ? cases.filter((c) => topMatch.condition.relatedCaseIds.includes(c.id))
    : [];

  const urgencyConfig = {
    baja: {
      color: "text-green-400",
      bg: "bg-green-500/10 border-green-500/20",
      label: "Prioridad Baja",
      icon: CheckCircle,
    },
    media: {
      color: "text-yellow-400",
      bg: "bg-yellow-500/10 border-yellow-500/20",
      label: "Prioridad Media",
      icon: AlertTriangle,
    },
    alta: {
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/20",
      label: "Prioridad Alta",
      icon: AlertTriangle,
    },
  };

  const urg = urgencyConfig[result.urgency];
  const UrgencyIcon = urg.icon;

  // Build WhatsApp message with diagnosis context
  const whatsappMsg = topMatch
    ? `¡Hola! Usé el diagnóstico de uñas en su web y mis resultados sugieren ${topMatch.condition.shortName}. Me gustaría agendar una evaluación profesional.`
    : "¡Hola! Usé el diagnóstico de uñas y me gustaría agendar una evaluación.";

  return (
    <section className="px-4 py-24 sm:py-28">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <FadeIn>
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#F2E6D8]/20 to-[#F2E6D8]/5 border border-[#F2E6D8]/20 flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-[#F2E6D8]" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              <TextReveal
                text="Tu Análisis Personalizado"
                className="bg-gradient-to-r from-[#F2E6D8] via-white to-[#F2E6D8] bg-clip-text text-transparent"
              />
            </h2>
          </div>
        </FadeIn>

        {/* Urgency + Summary */}
        <FadeIn delay={0.15}>
          <div
            className={`rounded-xl border p-5 flex items-start gap-4 ${urg.bg}`}
          >
            <UrgencyIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${urg.color}`} />
            <div>
              <p className={`text-sm font-semibold ${urg.color}`}>
                {urg.label}
              </p>
              <p className="text-sm text-gray-300 mt-1">{result.summary}</p>
            </div>
          </div>
        </FadeIn>

        {/* Top match — clean, scannable, conversion-focused */}
        {topMatch && (
          <FadeIn delay={0.25}>
            <GlassmorphismCard className="p-6 sm:p-8 space-y-5">
              {/* Header with confidence */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-[#F2E6D8]/60 uppercase tracking-wider font-medium mb-1">
                    Resultado Principal
                  </p>
                  <h3 className="text-2xl font-bold text-white">
                    {topMatch.condition.shortName}
                  </h3>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-3xl font-bold text-[#F2E6D8]">
                    {topMatch.confidence}%
                  </div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                    coincidencia
                  </p>
                </div>
              </div>

              {/* Confidence bar */}
              <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#F2E6D8] to-[#F2E6D8]/60 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${topMatch.confidence}%` }}
                  transition={{ duration: 1, delay: 0.3, ease: premiumEase }}
                />
              </div>

              {/* Quick explanation — one line */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {topMatch.condition.description}
              </p>

              {/* Key points grid — scannable, not a wall of text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* What you're seeing */}
                <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
                  <p className="text-[11px] text-[#F2E6D8]/70 uppercase tracking-wider font-semibold mb-2">
                    Lo que ves
                  </p>
                  <div className="space-y-1.5">
                    {topMatch.condition.visualSigns.slice(0, 3).map((sign, i) => (
                      <p key={i} className="text-xs text-gray-300 flex items-start gap-1.5">
                        <CheckCircle className="w-3 h-3 text-[#F2E6D8] mt-0.5 flex-shrink-0" />
                        {sign}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Common causes */}
                <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
                  <p className="text-[11px] text-[#F2E6D8]/70 uppercase tracking-wider font-semibold mb-2">
                    Causas comunes
                  </p>
                  <div className="space-y-1.5">
                    {topMatch.condition.commonCauses.slice(0, 3).map((cause, i) => (
                      <p key={i} className="text-xs text-gray-300 flex items-start gap-1.5">
                        <span className="text-[#F2E6D8] flex-shrink-0">&#8226;</span>
                        {cause}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Severity — compact */}
              <div className={`rounded-lg px-4 py-3 border ${
                topMatch.estimatedSeverity === "severo"
                  ? "bg-red-500/5 border-red-500/20"
                  : topMatch.estimatedSeverity === "moderado"
                    ? "bg-yellow-500/5 border-yellow-500/20"
                    : "bg-green-500/5 border-green-500/20"
              }`}>
                <p className={`text-xs font-semibold uppercase tracking-wider ${
                  topMatch.estimatedSeverity === "severo"
                    ? "text-red-400"
                    : topMatch.estimatedSeverity === "moderado"
                      ? "text-yellow-400"
                      : "text-green-400"
                }`}>
                  Severidad: {topMatch.estimatedSeverity.charAt(0).toUpperCase() + topMatch.estimatedSeverity.slice(1)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {topMatch.condition.severityGuide[topMatch.estimatedSeverity]}
                </p>
              </div>
            </GlassmorphismCard>
          </FadeIn>
        )}

        {/* MEDICAL WARNING — critical health alert */}
        {topMatch?.condition.medicalWarning && (
          <FadeIn delay={0.3}>
            <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Alerta Médica Importante
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed">
                {topMatch.condition.medicalWarning}
              </p>
            </div>
          </FadeIn>
        )}

        {/* Before/After proof from portfolio */}
        {relatedCaseData.length > 0 && (
          <FadeIn delay={0.35}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white text-center">
                Casos Reales de{" "}
                <span className="text-[#F2E6D8]">{topMatch.condition.shortName}</span>
              </h3>
              <div className="max-w-md mx-auto">
                <div className="aspect-square rounded-xl overflow-hidden border border-white/10">
                  <BeforeAfterSlider
                    beforeImage={relatedCaseData[0].beforeImage}
                    afterImage={relatedCaseData[0].afterImage}
                    className="w-full h-full"
                  />
                </div>
                <p className="text-center text-xs text-gray-500 mt-2">
                  Desliza para comparar antes y después
                </p>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Home care recommendations */}
        {topMatch && (
          <FadeIn delay={0.4}>
            <div className="space-y-4">
              <div className="flex items-center gap-2 justify-center">
                <Heart className="w-5 h-5 text-[#F2E6D8]" />
                <h3 className="text-lg font-semibold text-white">
                  Lo Que Puedes Hacer en Casa
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topMatch.condition.homeCare.map((tip, i) => (
                  <motion.div
                    key={i}
                    className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4 flex items-start gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                  >
                    <span className="text-[#F2E6D8] text-sm font-bold mt-0.5 flex-shrink-0">
                      {i + 1}.
                    </span>
                    <p className="text-sm text-gray-300 leading-relaxed">{tip}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* What NOT to do */}
        {topMatch && topMatch.condition.doNot.length > 0 && (
          <FadeIn delay={0.5}>
            <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Evita Hacer Esto
              </h3>
              <div className="space-y-2">
                {topMatch.condition.doNot.map((item, i) => (
                  <p key={i} className="text-sm text-gray-400 flex items-start gap-2">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">✕</span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* When to seek professional help */}
        {topMatch && (
          <FadeIn delay={0.55}>
            <div className="bg-[#F2E6D8]/5 border border-[#F2E6D8]/15 rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-semibold text-[#F2E6D8] uppercase tracking-wider">
                Busca Ayuda Profesional Si...
              </h3>
              <div className="space-y-2">
                {topMatch.condition.seekProfessionalWhen.map((item, i) => (
                  <p key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#F2E6D8] mt-0.5 flex-shrink-0" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Professional treatment CTA */}
        {result.recommendProfessional && topMatch && (
          <FadeIn delay={0.6}>
            <div className="relative rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-8 sm:p-10 text-center border border-zinc-800 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-72 h-72 bg-[#F2E6D8]/5 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Solución Profesional con{" "}
                  <span className="text-[#F2E6D8]">Neycha Soto</span>
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed max-w-lg mx-auto">
                  {topMatch.condition.professionalTreatment}
                </p>
                <p className="text-xs text-gray-500 italic">
                  {topMatch.condition.recoveryNote}
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <MagneticButton>
                    <Button
                      size="lg"
                      className="bg-[#F2E6D8] hover:bg-[#E6D0B8] text-black font-bold px-8 py-6 shadow-2xl hover:shadow-[#F2E6D8]/30 transition-all hover:scale-105 animate-pulse-glow"
                      asChild
                    >
                      <a
                        href={BOOKSY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-5 h-5" />
                        AGENDAR EVALUACIÓN
                      </a>
                    </Button>
                  </MagneticButton>

                  <WhatsAppDialog message={whatsappMsg}>
                    <Button
                      variant="outline"
                      className="px-6 py-6 font-medium border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366] cursor-pointer"
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      WhatsApp
                    </Button>
                  </WhatsAppDialog>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Other possible matches — expandable for full detail */}
        {otherMatches.length > 0 && (
          <FadeIn delay={0.65}>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider text-center">
                Otras Posibilidades
              </h3>
              <div className="space-y-3">
                {otherMatches.map((match) => (
                  <OtherMatchCard key={match.condition.id} match={match} />
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* General prevention tips */}
        <FadeIn delay={0.7}>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white text-center">
              Consejos Generales de Prevención
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {generalPreventionTips.map((tip, i) => (
                <motion.div
                  key={i}
                  className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                >
                  <span className="text-2xl block mb-2">{tip.icon}</span>
                  <h4 className="text-xs font-semibold text-[#F2E6D8] mb-1">
                    {tip.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-tight">{tip.tip}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Disclaimer + restart */}
        <FadeIn delay={0.75}>
          <div className="text-center space-y-4 pt-6 border-t border-zinc-800">
            <p className="text-xs text-gray-600 max-w-md mx-auto">
              Este análisis es orientativo y educativo, basado en información
              clínica de referencia. No sustituye el diagnóstico de un
              profesional de salud. Para un diagnóstico definitivo, consulta a tu
              médico o agenda una evaluación profesional.
            </p>
            <Button
              variant="ghost"
              onClick={onRestart}
              className="text-gray-400 hover:text-[#F2E6D8]"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Hacer Otro Diagnóstico
            </Button>
          </div>
        </FadeIn>

        <div className="h-16 md:hidden" />
      </div>
    </section>
  );
}
