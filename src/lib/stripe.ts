import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock_key", {
    // apiVersion: "2023-10-16", // Removed to use default/compatible version
    appInfo: {
        name: "CuddleCart",
        url: "http://localhost:3000",
    },
    typescript: true,
});
