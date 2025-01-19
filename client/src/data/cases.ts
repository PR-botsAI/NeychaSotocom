import type { Case } from "@/types/schema";

export const cases: Case[] = [
  {
    id: 1,
    title: "Restauración Completa",
    description: "Transformación total de uñas dañadas con tratamiento profesional",
    beforeImage: "/cases/before-1.jpg",
    afterImage: "/cases/after-1.jpg",
    collageImage: "/cases/collage-1.jpg",
    category: "onicoplastia",
    createdAt: new Date("2024-01-19").toISOString(),
    serviceId: 1
  },
  {
    id: 2,
    title: "Recuperación de Uñas",
    description: "Tratamiento especializado para uñas debilitadas",
    beforeImage: "/cases/before-2.jpg",
    afterImage: "/cases/after-2.jpg",
    collageImage: "/cases/collage-2.jpg",
    category: "onicoplastia",
    createdAt: new Date("2024-01-19").toISOString(),
    serviceId: 1
  }
];