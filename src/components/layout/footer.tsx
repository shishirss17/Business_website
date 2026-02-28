"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, type: "subscription" }),
      });

      if (!res.ok) throw new Error("Subscription failed");

      toast({
        title: "Subscribed!",
        description: "You have successfully subscribed to our newsletter.",
      });
      setEmail("");
      setName("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-[#E6E6FA] border-t border-pink-200 text-gray-800">
      <div className="container py-12 md:py-16 lg:py-20 px-8 md:px-20 lg:px-32">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
              <Image
                src="/logo1.png"
                alt="CuddleCart Logo"
                width={240}
                height={120}
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-600 text-sm">
              Your one-stop shop for the softest, most huggable friends.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://youtube.com/@cuddlecart" target="_blank" className="text-gray-600 hover:text-gray-800 transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-inter font-semibold mb-4 text-gray-800">Shop</h3>
            <ul className="space-y-2 text-sm font-inter text-gray-600">
              <li><Link href="/products" className="hover:text-gray-800 transition-colors">All Products</Link></li>
              <li><Link href="/products?sort=newest" className="hover:text-gray-800 transition-colors">New Arrivals</Link></li>
              <li><Link href="/products?sort=bestsellers" className="hover:text-gray-800 transition-colors">Best Sellers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-inter font-semibold mb-4 text-gray-800">Company</h3>
            <ul className="space-y-2 text-sm font-inter text-gray-600">
              <li><Link href="/about" className="hover:text-gray-800 transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-gray-800 transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-gray-800 transition-colors">Contact</Link></li>
              <li><Link href="/support" className="hover:text-gray-800 transition-colors">Support</Link></li>
              <li><Link href="/faq" className="hover:text-gray-800 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-inter font-semibold mb-4 text-gray-800">Stay in touch</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get updates on new cuddles and special offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <Input
                type="text"
                placeholder="Name"
                className="bg-white/50 border-pink-200 focus-visible:ring-pink-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/50 border-pink-200 focus-visible:ring-pink-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" size="icon" className="bg-gray-800 hover:bg-gray-700 text-white" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                      <span className="sr-only">Subscribe</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-pink-200 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
