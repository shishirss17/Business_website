"use client";

import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag } from "lucide-react";

export function WishlistItems() {
    const { items, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    return (
        <div className="space-y-6">
            {items.map((product) => {
                const image = PlaceHolderImages.find(
                    (img) => img.id === product.images[0]
                );
                return (
                    <div key={product.id} className="flex gap-4">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                            {image && (
                                <Image
                                    src={image.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                            <div>
                                <Link href={`/product/${product.id}`} className="font-semibold hover:underline line-clamp-1">
                                    {product.name}
                                </Link>
                                <p className="text-sm text-muted-foreground">
                                    Rs {product.price.toFixed(2)}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    className="flex-1 h-8 text-xs"
                                    onClick={() => addToCart(product)}
                                >
                                    <ShoppingBag className="mr-2 h-3 w-3" />
                                    Add to Cart
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                    onClick={() => removeFromWishlist(product.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
