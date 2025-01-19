import type { Case } from "@/types/schema";

export const cases: Case[] = [
  {
    id: 1,
    title: "Restauración Completa",
    description: "Transformación total de uñas dañadas con tratamiento profesional",
    beforeImage: "/cases/Caso1_before.png",
    afterImage: "/cases/Caso1_After.png",
    collageImage: "/cases/Caso1_collage.png",
    category: "onicoplastia",
    createdAt: new Date("2024-01-19").toISOString(),
    serviceId: 1
  },
  {
    id: 2,
    title: "Recuperación de Uñas",
    description: "Tratamiento especializado para uñas debilitadas",
    beforeImage: "/cases/Caso2_before.png",
    afterImage: "/cases/Caso2_after.png",
    collageImage: "/cases/Caso2_collage.png",
    category: "onicoplastia",
    createdAt: new Date("2024-01-19").toISOString(),
    serviceId: 1
  }
];