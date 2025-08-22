import { useQuery } from "@tanstack/react-query";

interface ShopProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  available: boolean;
  category?: string;
}

interface ShopData {
  products: ShopProduct[];
  categories?: string[];
  featuredProducts?: ShopProduct[];
}

export function useShopData() {
  return useQuery<ShopData>({
    queryKey: ["shop-data"],
    queryFn: async () => {
      try {
        // Since direct API access has CORS issues, we return empty data
        // The shop promotion will show a direct link to the shop instead
        return {
          products: [],
          categories: [],
          featuredProducts: []
        };
      } catch (error) {
        console.error("Shop data not available:", error);
        return {
          products: [],
          categories: [],
          featuredProducts: []
        };
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: false,
  });
}