import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Service } from "@db/schema";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {service.image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{service.name}</span>
          <span className="text-sm text-muted-foreground">
            ${service.price} • {service.duration}min
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{service.description}</p>
        <Link href={`/booking?service=${service.id}`}>
          <Button className="mt-4 w-full">Book Now</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
