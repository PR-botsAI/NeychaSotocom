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
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader>
        <div className="flex items-center gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="text-gray-300">{comment}</blockquote>
        <footer className="mt-4">
          <div className="font-semibold text-white">{name}</div>
          <div className="text-sm text-gray-400">
            {service} • {date}
          </div>
        </footer>
      </CardContent>
    </Card>
  );
}