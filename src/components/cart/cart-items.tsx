"use client";

import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export function CartItems() {
  const { state, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="space-y-6">
      {state.items.map((item) => {
        const image = PlaceHolderImages.find(
          (img) => img.id === item.product.images[0]
        );
        return (
          <div key={item.product.id} className="flex gap-4">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
              {image && (
                <Image
                  src={image.imageUrl}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <Link href={`/product/${item.product.id}`} className="font-semibold hover:underline line-clamp-1">
                  {item.product.name}
                </Link>
                <p className="text-sm text-muted-foreground">
                  Rs {item.product.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Input type="number" value={item.quantity} readOnly className="h-7 w-10 text-center mx-1 px-1" />
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.product.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-right font-semibold min-w-[70px]">
              Rs {(item.product.price * item.quantity).toFixed(2)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
