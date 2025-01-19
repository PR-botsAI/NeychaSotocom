import type { Case } from "@/types/schema";

export const cases: Case[] = [
  {
    id: 1,
    title: "Restauración Completa",
    description: "Transformación total de uñas dañadas",
    beforeImage: "/images/cases/before-1.jpg",
    afterImage: "/images/cases/after-1.jpg",
    collageImage: "/images/cases/collage-1.jpg",
    category: "onicoplastia",
    createdAt: new Date("2024-01-19").toISOString(),
    serviceId: 1
  },
  // Add other cases as needed
];
