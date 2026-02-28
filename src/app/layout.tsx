import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PromotionBanner } from '@/components/layout/promotion-banner';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { CartProvider } from '@/lib/cart-context';
import { WishlistProvider } from '@/lib/wishlist-context';
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'CuddleCart',
  description: 'The best place for soft toys and gifts!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <SessionProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="relative flex min-h-dvh flex-col bg-background">
                <PromotionBanner />
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <ScrollToTop />
              </div>
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
