import { useQuery } from "@tanstack/react-query";
import ServiceCard from "@/components/service-card";
import type { Service } from "@db/schema";

export default function Services() {
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  return (
    <div className="container py-24">
      <h1 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Our Services
      </h1>
      <p className="mt-6 text-center text-lg text-gray-600">
        Discover our range of premium nail care services
      </p>
      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
