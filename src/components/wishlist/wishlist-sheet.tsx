"use client";

import {
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/lib/wishlist-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WishlistItems } from "./wishlist-items";

export function WishlistSheetContent() {
    const { wishlistCount } = useWishlist();

    return (
        <>
            <SheetHeader>
                <SheetTitle>Your Wishlist ({wishlistCount})</SheetTitle>
            </SheetHeader>
            <Separator className="my-4" />

            {wishlistCount > 0 ? (
                <div className="flex flex-col h-[calc(100vh-8rem)]">
                    <ScrollArea className="flex-1 pr-4">
                        <WishlistItems />
                    </ScrollArea>
                    <div className="pt-6">
                        <Separator className="mb-4" />
                        <SheetClose asChild>
                            <Button variant="outline" className="w-full">
                                Continue Shopping
                            </Button>
                        </SheetClose>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="p-4 rounded-full bg-pink-50 mb-4">
                        <svg
                            className=" h-12 w-12 text-pink-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </div>
                    <p className="text-xl font-semibold">Your wishlist is empty</p>
                    <p className="text-muted-foreground mt-2">Save your favorite cuddly friends here!</p>
                    <SheetClose asChild>
                        <Button className="mt-6 bg-pink-400 hover:bg-pink-500">
                            Browse Products
                        </Button>
                    </SheetClose>
                </div>
            )}
        </>
    );
}
