import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { GalleryItem } from "@db/schema";

const categories = ["All", "Manicure", "Pedicure", "Nail Art", "Special"];

export default function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: items = [] } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery", selectedCategory],
    queryFn: async () => {
      const params = selectedCategory !== "All" 
        ? `?category=${selectedCategory}` 
        : "";
      const res = await fetch(`/api/gallery${params}`);
      return res.json();
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={item.image}
                alt={item.title}
                className="aspect-square w-full object-cover transition-transform hover:scale-105"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
