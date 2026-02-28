"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  LogOut,
  Package,
  MapPin,
  Settings,
  ChevronDown,
  User,
  Mic,
  ShoppingCart,
  UserCircle,
  Eye,
  Shield,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CartSheetContent } from "@/components/cart/cart-sheet";
import { Input } from "../ui/input";
import { useSession, signOut } from "next-auth/react";
import { LoginDialog } from "@/components/auth/login-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { WishlistSheetContent } from "@/components/wishlist/wishlist-sheet";

const navLinks = [
  { href: "/brands", label: "Brands" },
  { href: "/sale", label: "Sale" },
];

const ageSections = [
  { label: "0-18 months", href: "/age/0-18m", color: "bg-[#fdf3e7]" },
  { label: "18-36 months", href: "/age/18-36m", color: "bg-[#fceef5]" },
  { label: "3-5 years", href: "/age/3-5y", color: "bg-[#fff9e6]" },
  { label: "5-7 years", href: "/age/5-7y", color: "bg-[#f2fafb]" },
  { label: "7-9 years", href: "/age/7-9y", color: "bg-[#f4f7fd]" },
  { label: "9-12 years", href: "/age/9-12y", color: "bg-[#f3f1fa]" },
  { label: "12+ years", href: "/age/12p", color: "bg-[#f9f0f5]" },
];

export function Header() {
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [loginOpen, setLoginOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: session, status } = useSession();
  const user = session?.user;
  const isUserLoading = status === "loading";
  const isAdmin = (user as any)?.role === 'admin';
  const isAdminView = pathname.startsWith('/admin');

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('');
  }

  const switchToAdminView = () => {
    router.push('/admin');
  };

  const switchToUserView = () => {
    router.push('/');
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full shadow-md">
        {/* Desktop Header (Baby Pink Theme) */}
        <div className="hidden lg:block bg-[#fbcfe8] text-gray-800">
          <div className="container relative flex h-20 items-center justify-between px-8">
            {/* Logo & Desktop Nav */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
                <Image
                  src="/logo1.png"
                  alt="CuddleCart Logo"
                  width={240}
                  height={120}
                  className="h-20 w-auto object-contain"
                  priority
                />
              </Link>

              {/* Desktop Nav Links */}
              <nav className="flex items-center gap-8">
                <Link
                  href="/categories"
                  className="text-[18px] font-inter font-bold text-gray-800 hover:text-gray-600 transition-colors flex items-center gap-1.5"
                >
                  Category
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>

                {/* Age Mega Menu Trigger */}
                <div className="group relative">
                  <button className="text-[18px] font-inter font-bold text-gray-800 hover:text-gray-600 transition-colors flex items-center gap-1.5 h-20">
                    Age
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  </button>

                  {/* Mega Menu Content */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-[900px] bg-white text-black shadow-2xl rounded-b-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-6">
                    <div className="grid grid-cols-4 gap-4">
                      {ageSections.map((age) => (
                        <Link
                          key={age.href}
                          href={age.href}
                          className={cn(
                            "flex flex-col items-center p-4 rounded-xl transition-transform hover:scale-105 border border-transparent hover:border-gray-100 shadow-sm",
                            age.color
                          )}
                        >
                          <div className="w-20 h-20 mb-3 relative flex items-center justify-center">
                            <svg width="60" height="60" viewBox="0 0 100 100" className="drop-shadow-sm">
                              <circle cx="50" cy="65" r="30" fill="#9c6644" />
                              <circle cx="30" cy="40" r="12" fill="#9c6644" />
                              <circle cx="70" cy="40" r="12" fill="#9c6644" />
                              <circle cx="30" cy="40" r="6" fill="#7f5539" />
                              <circle cx="70" cy="40" r="6" fill="#7f5539" />
                              <circle cx="42" cy="60" r="3" fill="black" />
                              <circle cx="58" cy="60" r="3" fill="black" />
                              <ellipse cx="50" cy="75" r="8" rx="8" ry="6" fill="#ddb892" />
                              <path d="M45 78 Q50 82 55 78" stroke="black" fill="none" strokeWidth="2" />
                            </svg>
                          </div>
                          <span className="text-sm font-bold text-gray-800">{age.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[18px] font-inter font-bold text-gray-800 hover:text-gray-600 transition-colors flex items-center gap-1.5"
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Desktop Search Bar */}
            <div className="flex-1 max-w-md mx-8 hidden lg:block">
              <div className="relative flex items-center bg-white rounded-md shadow-sm border border-pink-100 overflow-hidden">
                <div className="flex items-center gap-1 px-3 border-r border-pink-100 text-gray-400 bg-gray-50/50">
                  <span className="text-xs font-medium">All</span>
                  <ChevronDown className="h-3 w-3" />
                </div>
                <Input
                  type="search"
                  placeholder="Search for products"
                  className="flex-1 border-none bg-transparent h-10 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <div className="px-3 text-pink-400 hover:text-pink-500 cursor-pointer transition-colors border-l border-pink-50">
                  <Search className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex flex-col items-center cursor-pointer group">
                    <Button variant="ghost" size="icon" className="text-gray-800 hover:bg-white/20 h-8 w-8">
                      {user ? (
                        <Avatar className="h-7 w-7 ring-1 ring-pink-300">
                          <AvatarImage src={user.image ?? ''} alt={user.name ?? ''} />
                          <AvatarFallback className="bg-pink-100 text-gray-800 text-[10px]">{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="flex flex-col items-center">
                          <UserCircle className="h-6 w-6" />
                        </div>
                      )}
                    </Button>
                    <span className="text-[14px] font-inter font-medium text-gray-800/90 truncate max-w-[100px]">
                      {user ? `Welcome ${user.name?.split(' ')[0]}` : 'Login'}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {isUserLoading ? (
                    <DropdownMenuLabel>Loading...</DropdownMenuLabel>
                  ) : user ? (
                    <>
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email || (user as any).phoneNumber}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {isAdmin && (
                        <>
                          <DropdownMenuItem onClick={switchToUserView} className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>User View</span>
                            {!isAdminView && <span className="ml-auto text-xs text-primary">●</span>}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={switchToAdminView} className="cursor-pointer">
                            <Shield className="mr-2 h-4 w-4" />
                            <span>Admin View</span>
                            {isAdminView && <span className="ml-auto text-xs text-primary">●</span>}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem asChild>
                        <Link href="/account/profile" className="cursor-pointer w-full flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/account/orders" className="cursor-pointer w-full flex items-center">
                          <Package className="mr-2 h-4 w-4" />
                          <span>My Orders</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/account/addresses" className="cursor-pointer w-full flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>Address</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/account/settings" className="cursor-pointer w-full flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => signOut()} className="text-destructive focus:text-destructive cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem onClick={() => setLoginOpen(true)}>
                      Login / Sign Up
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Sheet>
                <SheetTrigger asChild>
                  <div className="flex flex-col items-center cursor-pointer group">
                    <Button variant="ghost" size="icon" className="relative text-gray-800 hover:bg-white/20 h-8 w-8">
                      <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                      {mounted && wishlistCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm">
                          {wishlistCount}
                        </span>
                      )}
                    </Button>
                    <span className="text-[14px] font-inter font-medium text-gray-800/90">Wishlist</span>
                  </div>
                </SheetTrigger>
                <SheetContent>
                  <WishlistSheetContent />
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <div className="flex flex-col items-center cursor-pointer group">
                    <Button variant="ghost" size="icon" className="relative text-gray-800 hover:bg-white/20 h-8 w-8">
                      <ShoppingBag className="h-5 w-5" />
                      {mounted && itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-gray-800 shadow-sm">
                          {itemCount}
                        </span>
                      )}
                    </Button>
                    <span className="text-[14px] font-inter font-medium text-gray-800/90">My bag</span>
                  </div>
                </SheetTrigger>
                <SheetContent>
                  <CartSheetContent />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Mobile Header (Baby Pink Theme) */}
        <div className="lg:hidden bg-[#fbcfe8] text-gray-800 border-b border-pink-200">
          {/* Row 1: Nav, Brand, Actions */}
          <div className="flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-800 h-10 w-10">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] bg-white text-black p-0">
                  <SheetHeader className="bg-[#fbcfe8] px-6 py-4 mb-4 border-b border-pink-200">
                    <SheetTitle className="text-left font-bold text-gray-800">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="px-4">
                    <Accordion type="single" collapsible className="w-full">
                      {/* Category - Can also be an accordion if there are sub-categories, but for now simple link or accordion */}
                      <AccordionItem value="category" className="border-none">
                        <AccordionTrigger className="hover:no-underline py-3 px-2">
                          <span className="text-base font-medium">Category</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-2 pl-4">
                            <Link href="/categories/toys" className="py-2 text-sm text-gray-600">Toys</Link>
                            <Link href="/categories/gifts" className="py-2 text-sm text-gray-600">Gifts</Link>
                            <Link href="/categories/new" className="py-2 text-sm text-gray-600">New Arrivals</Link>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Age Dropdown */}
                      <AccordionItem value="age" className="border-none">
                        <AccordionTrigger className="hover:no-underline py-3 px-2">
                          <span className="text-base font-medium">Age</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-2 gap-3 pt-2">
                            {ageSections.map((age) => (
                              <Link
                                key={age.href}
                                href={age.href}
                                className={cn("p-3 rounded-lg flex flex-col items-center gap-1", age.color)}
                              >
                                <span className="text-[10px] font-bold text-center">{age.label}</span>
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-base font-medium px-4 py-3 hover:bg-gray-50 flex items-center justify-between border-b border-transparent"
                      >
                        {link.label}
                        <ChevronDown className="h-4 w-4" />
                      </Link>
                    ))}
                    <Link
                      href="/contact"
                      className="text-base font-medium px-4 py-3 hover:bg-gray-50 flex items-center justify-between border-b border-transparent text-pink-600"
                    >
                      Contact Us
                      <ChevronDown className="h-4 w-4" />
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
              <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
                <Image
                  src="/logo1.png"
                  alt="CuddleCart Logo"
                  width={180}
                  height={60}
                  className="h-14 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative text-gray-800 h-9 w-9">
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    {mounted && wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm border border-pink-100">
                        {wishlistCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <WishlistSheetContent />
                </SheetContent>
              </Sheet>

              <div className="relative">
                <Button variant="ghost" size="icon" className="text-gray-800 h-9 w-9">
                  <UserCircle className="h-6 w-6" />
                  <span className="absolute top-1 right-1 h-3 w-3 bg-teal-400 rounded-full border-2 border-pink-200 flex items-center justify-center">
                    <span className="text-[6px] text-white">⚡</span>
                  </span>
                </Button>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative text-gray-800 h-9 w-9">
                    <ShoppingCart className="h-5 w-5" />
                    {mounted && itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-gray-800 shadow-sm border border-pink-100">
                        {itemCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <CartSheetContent />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Row 2: Search Bar - Mobile Only (Baby Pink Theme) */}
        <div className="px-4 pb-3 lg:hidden bg-[#fbcfe8] border-b border-pink-200">
          <div className="relative flex items-center bg-white rounded-md shadow-sm border border-pink-100">
            <div className="flex items-center gap-1 px-3 border-r border-pink-100 text-gray-400">
              <span className="text-xs font-medium">All</span>
              <ChevronDown className="h-3 w-3" />
            </div>
            <Input
              type="search"
              placeholder="Search for products"
              className="flex-1 border-none bg-transparent h-9 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className="pr-3 text-gray-400">
              <Mic className="h-4 w-4" />
            </div>
          </div>
        </div>
      </header>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
