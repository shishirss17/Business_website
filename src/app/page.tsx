import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Rabbit, Sparkles, Dog, Heart, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BearIcon, DinosaurIcon } from "@/components/icons";
import { getProducts } from "@/actions/product-actions";

import { CustomerReviews } from "@/components/home/customer-reviews";
import { TrendingVideos } from "@/components/home/trending-videos";
import { ProductSection } from "@/components/home/product-section";

// ... existing imports

export default async function Home() {
  const products = await getProducts();
  const categories = [
    { name: "Bears", href: "/categories/bears", icon: <BearIcon className="h-8 w-8 text-primary" /> },
    { name: "Bunnies", href: "/categories/bunnies", icon: <Rabbit className="h-8 w-8 text-primary" /> },
    { name: "Magical", href: "/categories/magical", icon: <Sparkles className="h-8 w-8 text-primary" /> },
    { name: "Dinosaurs", href: "/categories/dinosaurs", icon: <DinosaurIcon className="h-8 w-8 text-primary" /> },
    { name: "Animals", href: "/categories/animals", icon: <Dog className="h-8 w-8 text-primary" /> },
  ];

  return (
    <div className="flex flex-col gap-12 md:gap-16 lg:gap-24">
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <video
          src="/Videos/home.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg mb-4">
            Find Your Perfect Cuddle Buddy
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 drop-shadow">
            Discover a world of cuddly companions. The perfect gift for every occasion, or a new friend just for you.
          </p>
          <Button asChild size="lg" className="font-bold text-lg">
            <Link href="#popular-products">
              Shop Now <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="top-categories" className="container mx-auto px-8 md:px-20 lg:px-32 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-10 left-10 text-pink-200/40 animate-pulse pointer-events-none">
          <Heart className="h-12 w-12 rotate-12" />
        </div>
        <div className="absolute bottom-5 right-20 text-orange-200/40 animate-bounce pointer-events-none" style={{ animationDuration: '3s' }}>
          <Star className="h-8 w-8 -rotate-12" />
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Top Categories</h2>
          <p className="text-muted-foreground mt-2 text-lg">Browse by type of friend.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link href={category.href} key={category.name} className="group">
              <Card className="flex flex-col items-center justify-center gap-4 p-6 text-center transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 group-hover:bg-accent ring-offset-background">
                {category.icon}
                <h3 className="font-headline font-semibold text-lg">{category.name}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section id="new-arrivals" className="container mx-auto px-8 md:px-20 lg:px-32 relative">
        {/* Background Decorations */}
        <div className="absolute -top-4 right-10 text-pink-200/30 animate-pulse pointer-events-none" style={{ animationDuration: '4s' }}>
          <Sparkles className="h-16 w-16" />
        </div>
        <div className="absolute top-1/2 -left-8 text-orange-200/30 animate-bounce pointer-events-none" style={{ animationDuration: '5s' }}>
          <Heart className="h-10 w-10 -rotate-45" />
        </div>

        <ProductSection
          title="New Arrivals"
          subtitle="The latest additions to the CuddleCart family."
          products={products.slice(2, 6)}
        />
      </section>

      <section id="popular-products" className="container mx-auto px-8 md:px-20 lg:px-32">
        <ProductSection
          title="Popular Products"
          subtitle="Our most-loved cuddle buddies"
          products={products.slice(0, 4)}
        />
      </section>

      <section id="top-sellers" className="bg-secondary pt-8 pb-4">
        <div className="container mx-auto px-8 md:px-20 lg:px-32">
          <ProductSection
            title="Top Sellers"
            subtitle="These friends are flying off the shelves!"
            products={products.slice(1, 5)}
          />
        </div>
      </section>

      <TrendingVideos />

      <section className="bg-background pt-4 pb-0">
        <div className="container mx-auto px-8 md:px-20 lg:px-32 text-center">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold uppercase tracking-wider text-gray-800">What Customer Says</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <CustomerReviews />
        </div>
      </section>

      <section className="py-4">
        <div className="container mx-auto px-8 md:px-20 lg:px-32 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Why CuddleCart?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mt-8">
            <div className="flex flex-col items-center">
              <div className="bg-primary/50 rounded-full p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
              </div>
              <h3 className="text-xl font-headline font-semibold">Premium Quality</h3>
              <p className="text-muted-foreground mt-1">Only the softest, safest, and most durable materials.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/50 rounded-full p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><path d="M21 10c-1.5 0-2.4.6-3.4 1.6C16.5 12.7 15.5 14 12 14s-4.5-1.3-5.6-2.4C5.4 10.6 4.5 10 3 10c-1.5 0-3 1.5-3 3v4c0 1.5 1.5 3 3 3h18c1.5 0 3-1.5 3-3v-4c0-1.5-1.5-3-3-3zM7 21V10M17 21V10"></path></svg>
              </div>
              <h3 className="text-xl font-headline font-semibold">Unique Designs</h3>
              <p className="text-muted-foreground mt-1">Lovingly designed characters you won't find anywhere else.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/50 rounded-full p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><path d="M20 12.5a3.5 3.5 0 00-7 0V16H7v-3.5a3.5 3.5 0 00-7 0V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-6.5z"></path><path d="M16 12.5a3.5 3.5 0 00-7 0"></path><path d="M8 12.5a3.5 3.5 0 00-7 0"></path><path d="M3 21v-1.5a3.5 3.5 0 017 0V21"></path><path d="M14 21v-1.5a3.5 3.5 0 017 0V21"></path></svg>
              </div>
              <h3 className="text-xl font-headline font-semibold">Perfect for Gifting</h3>
              <p className="text-muted-foreground mt-1">AI-powered gift messages for a personal touch.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/50 rounded-full p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <h3 className="text-xl font-headline font-semibold">Affordable Price</h3>
              <p className="text-muted-foreground mt-1">Get the best quality products at prices that won't break the bank.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
