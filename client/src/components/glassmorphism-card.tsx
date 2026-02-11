import { motion } from "framer-motion";
import { TiltCard } from "./tilt-card";

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  hoverLift?: boolean;
}

export function GlassmorphismCard({
  children,
  className = "",
  tilt = true,
  hoverLift = true,
}: GlassmorphismCardProps) {
  const cardContent = (
    <motion.div
      className={`group relative rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#F2E6D8]/40 transition-all duration-500 overflow-hidden shimmer ${className}`}
      whileHover={hoverLift ? { y: -8, transition: { type: "spring", stiffness: 300, damping: 25 } } : undefined}
    >
      {/* Animated gradient border glow */}
      <div className="absolute -inset-px bg-gradient-to-br from-[#F2E6D8]/20 via-transparent to-[#F2E6D8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />

      {/* Inner gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F2E6D8]/5 via-transparent to-[#F2E6D8]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Subtle top highlight line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#F2E6D8]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );

  if (tilt) {
    return <TiltCard className="h-full">{cardContent}</TiltCard>;
  }

  return cardContent;
}
