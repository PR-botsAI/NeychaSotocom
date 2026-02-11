import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { TextReveal } from "@/components/motion-wrapper";
import { GlassmorphismCard } from "@/components/glassmorphism-card";

const conditions = [
  {
    id: 1,
    title: "Hongos en las Uñas",
    description: "¿Tienes manchas amarillas o blancas? ¿Uñas quebradizas?",
    before: "/assets/cases/Caso1_before.png",
    after: "/assets/cases/Caso1_after.png"
  },
  {
    id: 2,
    title: "Uñas Débiles",
    description: "¿Se te parten o pelan las uñas fácilmente?",
    before: "/assets/cases/Caso2_before.png",
    after: "/assets/cases/Caso2_after.png"
  },
  {
    id: 3,
    title: "Uñas Irregulares",
    description: "¿Notas que tus uñas crecen de forma irregular?",
    before: "/assets/cases/Caso3_before.png",
    after: "/assets/cases/Caso3_after.png"
  }
];

export default function NailConditionMatcher() {
  const [currentCondition, setCurrentCondition] = useState(0);

  const condition = conditions[currentCondition];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center space-y-4 mb-10">
        <div className="flex flex-col items-center justify-center gap-2 mb-4">
          <Sparkles className="w-8 h-8 text-[#F2E6D8] mb-2" />
          <h2 className="text-3xl sm:text-4xl font-bold max-w-2xl">
            <TextReveal text="¿Te identificas con alguna de estas condiciones?" className="justify-center" />
          </h2>
        </div>
        <p className="text-lg text-gray-400">
          Desliza para ver la transformación que podemos lograr
        </p>
      </div>

      <GlassmorphismCard className="p-8">
        <div className="relative space-y-8">
          <div className="relative aspect-[4/3] w-full max-w-3xl mx-auto overflow-hidden rounded-xl border border-zinc-800">
            <BeforeAfterSlider
              beforeImage={condition.before}
              afterImage={condition.after}
              className="w-full h-full"
            />
          </div>

          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-[#F2E6D8]">{condition.title}</h3>
            <p className="text-gray-300 text-lg max-w-xl mx-auto">{condition.description}</p>

            <div className="flex justify-center gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentCondition(
                    (prev) => (prev - 1 + conditions.length) % conditions.length
                  )
                }
                className="border-zinc-700 hover:bg-zinc-800 hover:border-[#F2E6D8]/50 transition-all px-6"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentCondition((prev) => (prev + 1) % conditions.length)
                }
                className="border-zinc-700 hover:bg-zinc-800 hover:border-[#F2E6D8]/50 transition-all px-6"
              >
                Siguiente
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="text-center pt-6">
            <Button
              asChild
              className="w-full sm:w-auto bg-[#F2E6D8] px-10 py-7 text-black font-bold hover:bg-[#E6D0B8] shadow-2xl hover:shadow-[#F2E6D8]/20 transition-all hover:scale-105 text-lg"
            >
              <a
                href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
                target="_blank"
                rel="noopener noreferrer"
              >
                ¡TRANSFORMA TUS UÑAS AHORA!
              </a>
            </Button>
          </div>
        </div>
      </GlassmorphismCard>
    </div>
  );
}