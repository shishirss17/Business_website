"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./checkout-form";
import { useCart } from "@/lib/cart-context";
import { Loader2 } from "lucide-react";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function StripeElementsWrapper() {
    const [clientSecret, setClientSecret] = useState("");
    const { state } = useCart();
    const [error, setError] = useState("");

    useEffect(() => {
        if (state.items.length === 0) return;

        // Create PaymentIntent as soon as the page loads
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: state.items.map(i => ({ id: i.product.id, quantity: i.quantity })) }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to initialize payment");
                return res.json();
            })
            .then((data) => setClientSecret(data.clientSecret))
            .catch((err) => setError(err.message));
    }, [state.items]);

    if (state.items.length === 0) {
        return <div>Your cart is empty.</div>
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>
    }

    const appearance = {
        theme: 'stripe' as const,
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="App">
            {clientSecret ? (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            ) : (
                <div className="flex justify-center items-center h-40">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            )}
        </div>
    );
}
