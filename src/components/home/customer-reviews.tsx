"use client";

import React, { useState, useEffect } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Star, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Review {
    _id: string;
    name: string;
    review: string;
    rating: number;
    createdAt: string;
}

export function CustomerReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();
    const [api, setApi] = useState<CarouselApi>();

    const [open, setOpen] = useState(false);
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [newReview, setNewReview] = useState({ name: '', review: '', rating: 5 });

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        if (!api) {
            return;
        }

        const interval = setInterval(() => {
            if (!api.canScrollNext()) {
                api.scrollTo(0);
            } else {
                api.scrollNext();
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [api]);


    const fetchReviews = async () => {
        try {
            const res = await fetch('/api/reviews');
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            }
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmissionLoading(true);

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReview),
            });

            if (!res.ok) {
                throw new Error("Failed to submit review");
            }

            await fetchReviews();
            setOpen(false);
            setNewReview({ name: '', review: '', rating: 5 });
            toast({
                title: "Review submitted!",
                description: "Thank you for your feedback.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit review. Please try again.",
                variant: "destructive",
            });
        } finally {
            setSubmissionLoading(false);
        }
    };

    return (
        <div className="w-full relative px-4 md:px-12">
            <div className="absolute top-0 right-0 z-10 p-4">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Plus className="h-4 w-4" /> Add Review
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Write a Review</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={newReview.name}
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                    required
                                    minLength={2}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="review">Review</Label>
                                <Textarea
                                    id="review"
                                    value={newReview.review}
                                    onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                                    required
                                    minLength={10}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="rating">Rating</Label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Button
                                            key={star}
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className={star <= newReview.rating ? "text-yellow-400" : "text-gray-300"}
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                        >
                                            <Star className="h-6 w-6 fill-current" />
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <Button type="submit" disabled={submissionLoading}>
                                {submissionLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit Review"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : reviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                    <p>No reviews yet. Be the first to share your experience!</p>
                </div>
            ) : (
                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-6xl mx-auto"
                >
                    <CarouselContent className="-ml-4">
                        {reviews.map((review) => (
                            <CarouselItem key={review._id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <div className="flex flex-col items-center text-center p-6 h-full border rounded-lg shadow-sm bg-card hover:shadow-md transition-shadow">
                                    <div className="mb-4 relative">
                                        <Avatar className="h-16 w-16 border-2 border-primary/10">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.name}`} />
                                            <AvatarFallback><User /></AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{review.name}</h3>
                                    <div className="flex gap-1 mb-3 justify-center">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 text-sm italic leading-relaxed line-clamp-4">
                                        "{review.review}"
                                    </p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            )}
        </div>
    );
}
