import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
}

export default function TestimonialCard({
  name,
  rating,
  comment,
  service,
  date,
}: TestimonialCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="text-gray-700">{comment}</blockquote>
        <footer className="mt-4">
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-muted-foreground">
            {service} • {date}
          </div>
        </footer>
      </CardContent>
    </Card>
  );
}
