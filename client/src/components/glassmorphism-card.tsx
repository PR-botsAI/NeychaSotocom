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
      className={`group relative rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#F2E6D8]/30 transition-colors overflow-hidden ${className}`}
      whileHover={hoverLift ? { y: -5 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#F2E6D8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );

  if (tilt) {
    return <TiltCard className="h-full">{cardContent}</TiltCard>;
  }

  return cardContent;
}
