import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

// Import images using Vite's asset handling
import condition1Before from "/assets/nails/condition1-before.jpg";
import condition1After from "/assets/nails/condition1-after.jpg";
import condition2Before from "/assets/nails/condition2-before.jpg";
import condition2After from "/assets/nails/condition2-after.jpg";
import condition3Before from "/assets/nails/condition3-before.jpg";
import condition3After from "/assets/nails/condition3-after.jpg";

const conditions = [
  {
    id: 1,
    before: condition1Before,
    after: condition1After,
    title: "Hongos en las Uñas",
    description: "¿Tienes manchas amarillas o blancas? ¿Uñas quebradizas?",
  },
  {
    id: 2,
    before: condition2Before,
    after: condition2After,
    title: "Uñas Débiles",
    description: "¿Se te parten o pelan las uñas fácilmente?",
  },
  {
    id: 3,
    before: condition3Before,
    after: condition3After,
    title: "Uñas Irregulares",
    description: "¿Notas que tus uñas crecen de forma irregular?",
  },
];

export default function NailConditionMatcher() {
  const [currentCondition, setCurrentCondition] = useState(0);
  const [sliderValue, setSliderValue] = useState([50]);
  const [isDragging, setIsDragging] = useState(false);

  const handleSlide = (value: number[]) => {
    setSliderValue(value);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const container = e.currentTarget.getBoundingClientRect();
    const position = ((touch.clientX - container.left) / container.width) * 100;
    setSliderValue([Math.max(0, Math.min(100, position))]);
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
            className="relative aspect-[4/3] w-full overflow-hidden rounded-lg"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="absolute inset-0">
              <img
                src={condition.after}
                alt="Después"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div
              className="absolute inset-0"
              style={{
                clipPath: `inset(0 ${100 - sliderValue[0]}% 0 0)`,
              }}
            >
              <img
                src={condition.before}
                alt="Antes"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
              style={{ left: `${sliderValue[0]}%` }}
            >
              <div className="absolute inset-y-0 -left-2 w-4 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <div className="h-4 w-1 bg-gray-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Slider
              value={sliderValue}
              onValueChange={handleSlide}
              max={100}
              step={1}
              className="w-full"
            />
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