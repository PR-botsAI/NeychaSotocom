import type { Case } from "@/types/schema";

export const cases: Case[] = [
  {
    id: 1,
    title: "Confianza Restaurada",
    description: "Reconstrucción estética con IBX® — apariencia natural al instante.",
    beforeImage: "/cases/Caso1_before.png",
    afterImage: "/cases/Caso1_After.png",
    collageImage: "/cases/Caso1_collage.png",
    category: "onicoplastia",
    createdAt: new Date("2024-01-19").toISOString(),
    serviceId: 1,
    highlights: [
      "Reconstrucción estética",
      "Prótesis hipoalergénica",
      "Zapatos abiertos hoy"
    ]
  },
  {
    id: 2,
    title: "Transformación Estética",
    description: "Prótesis especializada con apariencia natural.",
    beforeImage: "/cases/Caso2_before.png",
    afterImage: "/cases/Caso2_after.png",
    collageImage: "/cases/Caso2_collage.png",
    category: "onicoplastia",
    createdAt: new Date("2024-01-19").toISOString(),
    serviceId: 1,
    highlights: [
      "Apariencia natural",
      "Sin dolor",
      "Tratamiento progresivo"
    ]
  },
  {
    id: 3,
    title: "Belleza Natural",
    description: "Apariencia natural con método profesional y seguro.",
    beforeImage: "/cases/Caso3_before.png",
    afterImage: "/cases/Caso3_after.png",
    collageImage: "/cases/Caso3_collage.png",
    category: "onicoplastia",
    createdAt: new Date("2024-01-19").toISOString(),
    serviceId: 1,
    highlights: [
      "Método profesional",
      "Apariencia natural",
      "Resultado duradero"
    ]
  },
  {
    id: 4,
    title: "Nueva Confianza",
    description: "Uñas hermosas mientras cuidamos su salud a largo plazo.",
    beforeImage: "/cases/Caso4_before.png",
    afterImage: "/cases/Caso4_after.png",
    collageImage: "/cases/Caso4_collage.png",
    category: "onicoplastia",
    createdAt: new Date("2024-01-19").toISOString(),
    serviceId: 1,
    highlights: [
      "Apariencia impecable",
      "Cuidado continuo",
      "Seguimiento incluido"
    ]
  },
  {
    id: 5,
    title: "Belleza Renovada",
    description: "Recupera la confianza en tus uñas. Profesional y seguro.",
    beforeImage: "/cases/Caso5_before.png",
    afterImage: "/cases/Caso5_after.png",
    collageImage: "/cases/Caso5_collage.png",
    category: "onicoplastia",
    createdAt: new Date("2024-01-19").toISOString(),
    serviceId: 1,
    highlights: [
      "Apariencia renovada",
      "Proceso indoloro",
      "Resultado visible"
    ]
  },
  {
    id: 6,
    title: "Cambio Positivo",
    description: "Vuelve a mostrar tus uñas con confianza.",
    beforeImage: "/cases/Caso6_before.png",
    afterImage: "/cases/Caso6_after.png",
    collageImage: "/cases/Caso6_collage.png",
    category: "onicoplastia",
    createdAt: new Date("2024-01-19").toISOString(),
    serviceId: 1,
    highlights: [
      "Proceso profesional",
      "Cuidado continuo",
      "Resultado duradero"
    ]
  },
];
