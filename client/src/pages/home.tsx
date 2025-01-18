import Hero from "@/components/hero";
import ServiceCard from "@/components/service-card";
import TestimonialCard from "@/components/testimonial-card";
import { useQuery } from "@tanstack/react-query";
import type { Service } from "@db/schema";

export default function Home() {
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  return (
    <div className="space-y-24 pb-24">
      <Hero />

      <section className="container">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Our Services
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="container">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          What Our Clients Say
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard
            name="Maria R."
            rating={5}
            comment="Amazing service! My nails have never looked better."
            service="Luxury Manicure"
            date="March 2024"
          />
          <TestimonialCard
            name="Sarah L."
            rating={5}
            comment="The nail art is absolutely stunning. Worth every penny!"
            service="Nail Art"
            date="February 2024"
          />
          <TestimonialCard
            name="Jennifer K."
            rating={5}
            comment="Professional staff and relaxing atmosphere. Will definitely return!"
            service="Spa Pedicure"
            date="January 2024"
          />
        </div>
      </section>
    </div>
  );
}
