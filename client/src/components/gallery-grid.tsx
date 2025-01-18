import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ImageCard } from "@/components/ui/image-card";
import type { GalleryItem } from "@db/schema";

const categories = ["All", "Manicure", "Pedicure", "Nail Art", "Special"];

export default function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: items = [], isLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery", selectedCategory],
    queryFn: async () => {
      const params = selectedCategory !== "All" 
        ? `?category=${selectedCategory}` 
        : "";
      const res = await fetch(`/api/gallery${params}`);
      if (!res.ok) throw new Error("Failed to fetch gallery items");
      return res.json();
    },
  });

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-2"
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="transition-all duration-200 hover:scale-105"
          >
            {category}
          </Button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="wait">
          {isLoading ? (
            // Loading skeleton
            [...Array(6)].map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="aspect-square animate-pulse rounded-lg bg-gray-200"
              />
            ))
          ) : (
            items.map((item) => (
              <ImageCard
                key={item.id}
                src={item.image}
                alt={item.title}
                aspectRatio="square"
                className="w-full"
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}