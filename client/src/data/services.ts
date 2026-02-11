import type { Service } from "@/types/schema";

export const services: Service[] = [
  {
    id: 1,
    name: "Onicoplastia",
    description: "Reconstrucción estética de uñas dañadas por hongos, trauma o condiciones médicas. Sal usando sandalias con apariencia perfecta. Para hombres y mujeres.",
    price: 50,
    duration: 60,
    image: "/images/services/onicoplastia.jpg",
    category: "treatments"
  },
  {
    id: 2,
    name: "Manicura",
    description: "Experiencia profesional que combina técnicas exclusivas, productos premium libres de tóxicos y acabados duraderos que realzan tu estilo personal.",
    price: 30,
    duration: 45,
    image: "/images/services/manicura.jpg",
    category: "classic"
  },
  {
    id: 3,
    name: "Belleza para Pies",
    description: "Tratamiento integral que combina pedicura profesional con terapia spa. Hidratación profunda, masaje relajante y acabado impecable de larga duración.",
    price: 45,
    duration: 75,
    image: "/images/services/pedicura.jpg",
    category: "spa"
  }
];
