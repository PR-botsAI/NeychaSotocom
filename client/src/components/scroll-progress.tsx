import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Glow intensity increases as you scroll
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.8]);

  return (
    <>
      {/* Glow shadow underneath */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#F2E6D8] via-[#E6D0B8] to-[#F2E6D8] origin-left z-[99] blur-sm"
        style={{ scaleX, opacity: glowOpacity }}
      />
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F2E6D8] via-[#E6D0B8] to-[#F2E6D8] origin-left z-[100]"
        style={{ scaleX }}
      />
    </>
  );
}
