"use client";

import {
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LoginDialog } from "../auth/login-dialog";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { CartItems } from "./cart-items";

export function CartSheetContent() {
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
    <>
      <SheetHeader>
        <SheetTitle>Shopping Cart ({itemCount})</SheetTitle>
      </SheetHeader>
      <Separator className="my-4" />

      {itemCount > 0 ? (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
          <ScrollArea className="flex-1 pr-4">
            <CartItems />
          </ScrollArea>
          <div className="pt-6 space-y-4">
            <Separator />
            <div className="space-y-1.5">
              <div className="flex justify-between text-base font-medium">
                <span>Subtotal</span>
                <span>Rs {cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground italic">Shipping and taxes calculated at checkout.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SheetClose asChild>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/cart">View Cart</Link>
                </Button>
              </SheetClose>
              <Button size="sm" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <p className="text-xl font-semibold">Your cart is empty</p>
          <p className="text-muted-foreground">Add some cuddly friends to get started!</p>
          <SheetClose asChild>
            <Button className="mt-4">Continue Shopping</Button>
          </SheetClose>
        </div>
      )}
      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}
