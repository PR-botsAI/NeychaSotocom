import type { Case } from "@/types/schema";

export const cases: Case[] = [
  {
    id: 1,
    title: "Confianza Restaurada",
    description: "Reconstrucción estética profesional — apariencia natural al instante.",
    beforeImage: "/cases/Caso1_before.webp",
    afterImage: "/cases/Caso1_After.webp",
    collageImage: "/cases/Caso1_collage.webp",
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
    beforeImage: "/cases/Caso2_before.webp",
    afterImage: "/cases/Caso2_after.webp",
    collageImage: "/cases/Caso2_collage.webp",
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
    beforeImage: "/cases/Caso3_before.webp",
    afterImage: "/cases/Caso3_after.webp",
    collageImage: "/cases/Caso3_collage.webp",
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
    beforeImage: "/cases/Caso4_before.webp",
    afterImage: "/cases/Caso4_after.webp",
    collageImage: "/cases/Caso4_collage.webp",
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
    beforeImage: "/cases/Caso5_before.webp",
    afterImage: "/cases/Caso5_after.webp",
    collageImage: "/cases/Caso5_collage.webp",
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
    beforeImage: "/cases/Caso6_before.webp",
    afterImage: "/cases/Caso6_after.webp",
    collageImage: "/cases/Caso6_collage.webp",
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
