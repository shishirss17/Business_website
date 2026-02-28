"use client";

import type { Product } from "@/lib/types";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function ProductDetailsClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const images = product.images
    .map((id) => PlaceHolderImages.find((img) => img.id === id))
    .filter(Boolean);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
      <div className="md:sticky top-24 self-start">
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image!.id}>
                <Card>
                  <CardContent className="relative aspect-square p-0">
                    <Image
                      src={image!.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      data-ai-hint={image!.imageHint}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      <div>
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">{product.name}</h1>
        <p className="text-2xl font-semibold text-primary-foreground/80 mb-4">Rs {product.price.toFixed(2)}</p>
        <p className="text-muted-foreground text-lg mb-6">{product.longDescription}</p>

        <Separator className="my-6" />

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center">
            <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)}>
              <Minus className="h-4 w-4" />
            </Button>
            <Input type="number" value={quantity} readOnly className="w-16 text-center mx-2" />
            <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button size="lg" onClick={handleAddToCart} className="flex-1">
            Add to Cart
          </Button>
        </div>

        <Separator className="my-6" />

        <div>
          <h3 className="font-headline text-xl font-semibold mb-2">Details</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><strong>Brand:</strong> {product.brand}</li>
            <li><strong>Materials:</strong> {product.materials}</li>
            <li><strong>Age Range:</strong> {product.ageRange}</li>
            <li><strong>Care:</strong> {product.care}</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
