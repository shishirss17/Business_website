"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";

export function TrendingVideos() {
    const [api, setApi] = useState<CarouselApi>();

    const videos = [
        { id: 1, src: "/Videos/home.mp4", title: "Cuddle Buddy in Action" },
        { id: 2, src: "/Videos/home.mp4", title: "Softest Hugs" },
        { id: 3, src: "/Videos/home.mp4", title: "Perfect Gift" },
    ];

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
        }, 4000);

        return () => clearInterval(intervalId);
    }, [api]);

    return (
        <section className="py-4 bg-muted/30">
            <div className="container mx-auto px-8 md:px-20 lg:px-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold">Trending Product Videos</h2>
                    <p className="text-muted-foreground mt-2 text-lg">Watch our cuddle buddies in action!</p>
                </div>

                {/* Desktop View: Grid */}
                <div className="hidden md:grid md:grid-cols-3 gap-8">
                    {videos.map((video) => (
                        <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <CardContent className="p-0 aspect-video relative">
                                <video
                                    src={video.src}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            </CardContent>
                            <div className="p-4 text-center">
                                <h3 className="font-semibold text-lg">{video.title}</h3>
                            </div>
                        </Card>
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
                            {videos.map((video) => (
                                <CarouselItem key={video.id} className="pl-4 basis-[90%]">
                                    <Card className="overflow-hidden border-none shadow-md">
                                        <CardContent className="p-0 aspect-video relative">
                                            <video
                                                src={video.src}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="w-full h-full object-cover"
                                            />
                                        </CardContent>
                                        <div className="p-4 text-center bg-white">
                                            <h3 className="font-semibold text-lg">{video.title}</h3>
                                        </div>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
