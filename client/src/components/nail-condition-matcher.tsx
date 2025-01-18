import { useState, useEffect } from "react";
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
  const [sliderValue, setSliderValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Function to calculate slider position
  const calculateSliderPosition = (clientX: number, container: DOMRect) => {
    const position = ((clientX - container.left) / container.width) * 100;
    return Math.max(0, Math.min(100, position));
  };

  // Handler for both mouse and touch events
  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const container = (e.currentTarget as HTMLElement).closest('.slider-container');
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setSliderValue(calculateSliderPosition(clientX, rect));

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      moveEvent.preventDefault();
      const moveClientX = 'touches' in moveEvent ? 
        moveEvent.touches[0].clientX : 
        moveEvent.clientX;
      setSliderValue(calculateSliderPosition(moveClientX, rect));
    };

    const handleEnd = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => setIsDragging(false);
  }, []);

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
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg slider-container">
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
                clipPath: `inset(0 ${100 - sliderValue}% 0 0)`,
              }}
            >
              <img
                src={condition.before}
                alt="Antes"
                className="h-full w-full object-cover"
                draggable="false"
              />
            </div>

            {/* Slider handle and divider */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize"
              style={{ left: `${sliderValue}%` }}
              onMouseDown={startDragging}
              onTouchStart={startDragging}
            >
              {/* Handle circle */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-ew-resize"
                onMouseDown={startDragging}
                onTouchStart={startDragging}
              >
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