"use client";

import { useState, useEffect } from "react";
import { getPersonalizedRecommendations } from "@/ai/flows/personalized-product-recommendations";
import { getProductsByIds } from "@/actions/product-actions";
import { ProductCard } from "./product-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { IProduct } from "@/models/Product";

interface ProductRecommendationsProps {
  browsingHistory: string[];
  purchaseHistory: string[];
  currentProductId: string;
}

export function ProductRecommendations({
  browsingHistory,
  purchaseHistory,
  currentProductId,
}: ProductRecommendationsProps) {
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        const result = await getPersonalizedRecommendations({
          browsingHistory,
          purchaseHistory,
          numberOfRecommendations: 4,
        });

        // Filter out the current product from recommendations
        const filteredRecIds = result.recommendations.filter(id => id !== currentProductId);
        const products = await getProductsByIds(filteredRecIds.slice(0, 4));

        setRecommendedProducts(products);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [browsingHistory, purchaseHistory, currentProductId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[250px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {recommendedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
