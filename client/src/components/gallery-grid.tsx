import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ImageCard } from "@/components/ui/image-card";
import { AlertCircle } from "lucide-react";
import type { GalleryItem } from "@db/schema";

const categories = ["All", "Manicure", "Pedicure", "Nail Art", "Special"];

export default function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: items = [], isLoading, error } = useQuery<GalleryItem[]>({
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

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center" role="alert">
        <AlertCircle className="h-8 w-8 text-destructive mb-2" />
        <h2 className="text-lg font-semibold">Error loading gallery</h2>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Gallery categories"
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="transition-all duration-200 hover:scale-105"
            role="tab"
            aria-selected={selectedCategory === category}
            aria-controls={`${category.toLowerCase()}-gallery`}
          >
            {category}
          </Button>
        ))}
      </motion.div>

      <div 
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        role="tabpanel"
        id={`${selectedCategory.toLowerCase()}-gallery`}
        aria-label={`${selectedCategory} gallery items`}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="aspect-square animate-pulse rounded-lg bg-gray-200"
                role="presentation"
                aria-label="Loading gallery item"
              />
            ))
          ) : items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-8"
            >
              <p className="text-muted-foreground">No items found in this category</p>
            </motion.div>
          ) : (
            items.map((item) => (
              <ImageCard
                key={item.id}
                src={item.image}
                alt={item.title}
                aspectRatio="square"
                className="w-full"
                fallback={
                  <div className="flex items-center justify-center h-full bg-muted">
                    <p className="text-sm text-muted-foreground">Image not available</p>
                  </div>
                }
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}