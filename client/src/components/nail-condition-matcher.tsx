import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="w-full max-w-4xl mx-auto px-4 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">
          ¿Te identificas con alguna de estas condiciones?
        </h2>
        <p className="text-lg text-gray-300">
          Desliza para ver la transformación que podemos lograr
        </p>
      </div>

      <Card className="overflow-hidden bg-zinc-900/50 border-zinc-800">
        <CardContent className="p-6">
          <div 
            className="relative aspect-[4/3] w-full overflow-hidden rounded-lg cursor-ew-resize"
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

            {/* Slider line and handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="h-4 w-0.5 bg-gray-400 rounded-full" />
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold mb-2">{condition.title}</h3>
            <p className="text-gray-300 mb-6">{condition.description}</p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentCondition(
                    (prev) => (prev - 1 + conditions.length) % conditions.length
                  )
                }
                className="border-gray-600 hover:bg-zinc-800"
              >
                ← Anterior
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentCondition((prev) => (prev + 1) % conditions.length)
                }
                className="border-gray-600 hover:bg-zinc-800"
              >
                Siguiente →
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full sm:w-auto rounded-md bg-[#F2E6D8] px-6 py-3 text-black font-semibold hover:bg-[#E6D0B8] transition-colors"
            >
              ¡TRANSFORMA TUS UÑAS AHORA!
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}