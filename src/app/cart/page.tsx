"use client";

import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CartItems } from "@/components/cart/cart-items";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LoginDialog } from "@/components/auth/login-dialog";

export default function CartPage() {
  const { itemCount, cartTotal } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [loginOpen, setLoginOpen] = useState(false);

  const handleCheckout = () => {
    if (!session) {
      setLoginOpen(true);
    } else {
      router.push("/checkout");
    }
  };

  const handleLoginSuccess = () => {
    setLoginOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Your Cart</h1>
        <p className="text-muted-foreground mt-2 text-lg">Review your items before checking out.</p>
      </div>

      {itemCount > 0 ? (
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <CartItems />
              </CardContent>
            </Card>
          </div>
          <div className="md:sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-muted-foreground">Calculated at next step</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>Rs {cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-4">Looks like you haven't added any cuddly friends yet.</p>
          <Button asChild>
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      )}
      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
}
