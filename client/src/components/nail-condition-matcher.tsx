import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

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
  const [sliderPosition, setSliderPosition] = useState(50);

  const updateSliderPosition = (e: React.MouseEvent | React.TouchEvent) => {
    const sliderRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const newPosition = ((x - sliderRect.left) / sliderRect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, newPosition)));
  };

  const condition = conditions[currentCondition];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center space-y-4 mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-[#F2E6D8]" />
          <h2 className="text-3xl sm:text-4xl font-bold">
            ¿Te identificas con alguna de estas condiciones?
          </h2>
        </div>
        <p className="text-lg text-gray-300">
          Desliza para ver la transformación que podemos lograr
        </p>
      </div>

      <div className="group relative rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 border border-zinc-800 hover:border-[#F2E6D8]/30 transition-all">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F2E6D8]/5 rounded-full blur-3xl group-hover:bg-[#F2E6D8]/10 transition-all"></div>
        
        <div className="relative space-y-6">
          <div 
            className="relative aspect-[4/3] w-full overflow-hidden rounded-xl cursor-ew-resize border-2 border-zinc-800"
            onMouseMove={updateSliderPosition}
            onTouchMove={updateSliderPosition}
          >
            {/* After image (background) */}
            <div className="absolute inset-0">
              <img
                src={condition.after}
                alt="Después"
                className="h-full w-full object-cover"
                draggable="false"
              />
            </div>

            {/* Before image (sliding portion) */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <img
                src={condition.before}
                alt="Antes"
                className="h-full w-full object-cover"
                draggable="false"
              />
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-white border border-zinc-700">
              Antes
            </div>
            <div className="absolute top-4 right-4 bg-[#F2E6D8]/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-black">
              Después
            </div>

            {/* Slider line and handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#F2E6D8]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 bg-[#F2E6D8] rounded-full shadow-2xl flex items-center justify-center">
                <div className="flex gap-0.5">
                  <div className="h-5 w-0.5 bg-black rounded-full" />
                  <div className="h-5 w-0.5 bg-black rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">{condition.title}</h3>
            <p className="text-gray-300 text-lg">{condition.description}</p>
            
            <div className="flex justify-center gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentCondition(
                    (prev) => (prev - 1 + conditions.length) % conditions.length
                  )
                }
                className="border-zinc-700 hover:bg-zinc-800 hover:border-[#F2E6D8]/50 transition-all"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentCondition((prev) => (prev + 1) % conditions.length)
                }
                className="border-zinc-700 hover:bg-zinc-800 hover:border-[#F2E6D8]/50 transition-all"
              >
                Siguiente
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          <div className="text-center pt-4">
            <Button
              asChild
              className="w-full sm:w-auto bg-[#F2E6D8] px-8 py-6 text-black font-bold hover:bg-[#E6D0B8] shadow-xl hover:shadow-2xl transition-all hover:scale-105 text-lg"
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
      </div>
    </div>
  );
}