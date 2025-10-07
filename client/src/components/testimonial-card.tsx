import { Star, Quote } from "lucide-react";

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
    <div className="group relative rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 h-full hover:from-zinc-800 hover:to-zinc-900 transition-all duration-300 border border-zinc-800 hover:border-[#F2E6D8]/30">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2E6D8]/5 rounded-full blur-3xl group-hover:bg-[#F2E6D8]/10 transition-all"></div>
      
      <div className="relative space-y-6">
        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-[#F2E6D8] text-[#F2E6D8]" />
            ))}
          </div>
          <Quote className="w-8 h-8 text-[#F2E6D8]/20" />
        </div>

        {/* Comment */}
        <blockquote className="text-gray-300 leading-relaxed text-base">
          "{comment}"
        </blockquote>

        {/* Author Info */}
        <div className="pt-6 border-t border-zinc-800">
          <div className="font-semibold text-white text-lg">{name}</div>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F2E6D8]"></span>
            {service}
            <span className="text-zinc-600">•</span>
            {date}
          </div>
        </div>
      </div>
    </div>
  );
}