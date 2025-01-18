import { motion } from "framer-motion";
import { Card } from "./card";
import { cn } from "@/lib/utils";

interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  aspectRatio?: "portrait" | "square" | "video";
  width?: number;
  height?: number;
}

export function ImageCard({
  src,
  alt,
  aspectRatio = "square",
  width,
  height,
  className,
  ...props
}: ImageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <Card
        className={cn(
          "group overflow-hidden rounded-lg bg-background/50 backdrop-blur-lg transition-colors hover:bg-background/80",
          className
        )}
        {...props}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "object-cover transition-all",
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square",
              "w-full rounded-lg"
            )}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </motion.div>
      </Card>
    </motion.div>
  );
}
