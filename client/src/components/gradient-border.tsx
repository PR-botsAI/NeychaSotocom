import { motion } from "framer-motion";

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  animate?: boolean;
}

export function GradientBorder({
  children,
  className = "",
  borderWidth = 1,
  animate = true,
}: GradientBorderProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute -inset-px rounded-xl opacity-75"
        style={{
          background: `linear-gradient(90deg, #F2E6D8, #E6D0B8, #D4C0A8, #E6D0B8, #F2E6D8)`,
          backgroundSize: "200% 100%",
          padding: borderWidth,
        }}
        animate={animate ? {
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        } : undefined}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="relative bg-zinc-900 rounded-xl h-full">
        {children}
      </div>
    </div>
  );
}
