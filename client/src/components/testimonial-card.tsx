import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div
      className="group relative rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 h-full hover:from-zinc-800/80 hover:to-zinc-900/80 transition-all duration-500 border border-zinc-800 hover:border-[#F2E6D8]/30 overflow-hidden"
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 25 } }}
    >
      {/* Background glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2E6D8]/5 rounded-full blur-3xl group-hover:bg-[#F2E6D8]/15 group-hover:w-40 group-hover:h-40 transition-all duration-700" />

      {/* Top line accent */}
      <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[#F2E6D8]/0 to-transparent group-hover:via-[#F2E6D8]/30 transition-all duration-500" />

      <div className="relative space-y-6">
        {/* Rating with animated stars */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: rating }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 400, damping: 15 }}
              >
                <Star className="h-5 w-5 fill-[#F2E6D8] text-[#F2E6D8]" />
              </motion.div>
            ))}
          </div>
          <Quote className="w-8 h-8 text-[#F2E6D8]/20 group-hover:text-[#F2E6D8]/40 transition-colors duration-500" />
        </div>

        {/* Comment */}
        <blockquote className="text-gray-300 leading-relaxed text-base group-hover:text-gray-200 transition-colors duration-300">
          &ldquo;{comment}&rdquo;
        </blockquote>

        {/* Author Info */}
        <div className="pt-6 border-t border-zinc-800 group-hover:border-zinc-700 transition-colors duration-300">
          <div className="font-semibold text-white text-lg">{name}</div>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F2E6D8]" />
            {service}
            <span className="text-zinc-600">&bull;</span>
            {date}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
