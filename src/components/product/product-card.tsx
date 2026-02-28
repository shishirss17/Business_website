"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { ShoppingBag, Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist-context";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const primaryImage = PlaceHolderImages.find(
    (img) => img.id === product.images[0]
  );

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/product/${product.id}`} className="flex-grow">
        <CardContent className="p-0">
          <div className="aspect-square relative">
            {primaryImage ? (
              <Image
                src={primaryImage.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={primaryImage.imageHint}
              />
            ) : (
              <div className="bg-muted w-full h-full flex items-center justify-center">
                No Image
              </div>
            )}
          </div>
        </CardContent>
        <div className="p-4">
          <CardTitle className="text-lg font-headline leading-tight mb-1">{product.name}</CardTitle>
          <p className="text-muted-foreground text-sm">{product.description}</p>
        </div>
      </Link>
      <CardFooter className="flex justify-between items-center p-4 pt-0 gap-2">
        <p className="text-lg font-semibold">Rs {product.price.toFixed(2)}</p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "shrink-0 transition-colors",
              isWishlisted
                ? "text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100"
                : "text-gray-400 hover:text-red-500 hover:bg-red-50"
            )}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
          >
            <Heart className={cn("h-4 w-4", isWishlisted && "fill-red-500")} />
            <span className="sr-only">
              {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            </span>
          </Button>
          <Button onClick={() => addToCart(product)} size="sm" className="whitespace-nowrap">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
