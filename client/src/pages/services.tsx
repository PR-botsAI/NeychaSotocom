import { useQuery } from "@tanstack/react-query";
import ServiceCard from "@/components/service-card";
import { ErrorBoundary } from "@/components/error-boundary";
import type { Service } from "@/types/schema";

function ServicesContent() {
  const { data: services, error, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  if (isLoading) {
    return (
      <div className="px-4 py-12 md:py-24 text-center">
        <div className="container mx-auto">
          <p>Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    throw error;
  }

  return (
    <div className="px-4 py-12 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center">
          Our Services
        </h1>
        <p className="mt-6 text-base md:text-lg text-center text-muted-foreground max-w-2xl mx-auto">
          Discover our range of premium nail care services
        </p>
        <div className="mt-12 md:mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services?.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <ErrorBoundary>
      <ServicesContent />
    </ErrorBoundary>
  );
}