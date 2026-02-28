"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CartItems } from "@/components/cart/cart-items";
import { useCart } from "@/lib/cart-context";
import { Separator } from "@/components/ui/separator";
import StripeElementsWrapper from "@/components/checkout/stripe-elements-wrapper";
import { GiftMessageForm } from "@/components/checkout/gift-message-form";

export default function CheckoutPage() {
  const { cartTotal } = useCart();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to shopping
      </Link>

      <h1 className="text-3xl font-bold mb-10">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8 order-2 lg:order-1">
          <section>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
              Gift Options
            </h2>
            <GiftMessageForm />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
              Payment Details
            </h2>
            <div className="bg-muted/30 p-6 rounded-xl border">
              <StripeElementsWrapper />
            </div>
          </section>
        </div>

        <div className="order-1 lg:order-2">
          <div className="bg-card border rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="max-h-[400px] overflow-y-auto pr-2 mb-6">
              <CartItems />
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Subtotal</span>
                <span>Rs {cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold pt-2">
                <span>Total</span>
                <span>Rs {cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8 text-center text-xs text-muted-foreground">
              <p>Secure SSL Encrypted Payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
