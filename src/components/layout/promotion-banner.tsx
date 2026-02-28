"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const promotions = [
    {
        code: "HAM10",
        discount: "10%",
        maxOff: "750",
        minCart: "4499",
    },
    {
        code: "HAM5",
        discount: "5%",
        maxOff: "150",
        minCart: "1499",
    }
];

export function PromotionBanner() {
    const [currentIdx, setCurrentIdx] = useState(0);

    const nextPromo = () => setCurrentIdx((prev) => (prev + 1) % promotions.length);
    const prevPromo = () => setCurrentIdx((prev) => (prev - 1 + promotions.length) % promotions.length);

    const promo = promotions[currentIdx];

    return (
        <div className="bg-[#e1f5fe] py-2 px-4 flex items-center justify-between text-[10px] md:text-xs font-medium border-b border-[#b3e5fc]">
            <button onClick={prevPromo} className="hidden md:block hover:bg-black/5 p-1 rounded-full transition-colors">
                <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 justify-center flex-1">
                <div className="bg-[#fbcfe8] p-1 rounded-sm shrink-0">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-shopping-bag"
                    >
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                        <path d="M3 6h18" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                </div>
                <p className="text-center">
                    Use code <span className="font-bold">{promo.code}</span> to get additional {promo.discount} Off upto {promo.maxOff} on cart value above {promo.minCart} <span className="font-bold underline cursor-pointer">Shop Now</span>
                </p>
            </div>

            <button onClick={nextPromo} className="hidden md:block hover:bg-black/5 p-1 rounded-full transition-colors">
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
}
