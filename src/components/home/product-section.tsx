"use client";

import React, { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/types";

interface ProductSectionProps {
    title: string;
    subtitle: string;
    products: Product[];
}

export function ProductSection({ title, subtitle, products }: ProductSectionProps) {
    const [api, setApi] = useState<CarouselApi>();

    useEffect(() => {
        if (!api) {
            return;
        }

        const intervalId = setInterval(() => {
            if (api.canScrollNext()) {
                api.scrollNext();
            } else {
                api.scrollTo(0);
            }
        }, 3000);

        return () => clearInterval(intervalId);
    }, [api]);

    return (
        <div className="w-full">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">{title}</h2>
                <p className="text-muted-foreground mt-2 text-lg">{subtitle}</p>
            </div>

            {/* Desktop View: Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Mobile View: Automatic Carousel */}
            <div className="md:hidden">
                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {products.map((product) => (
                            <CarouselItem key={product.id} className="pl-4 basis-[85%]">
                                <ProductCard product={product} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
}
