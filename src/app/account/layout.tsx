"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Package, MapPin, Settings } from "lucide-react";

const navItems = [
    {
        title: "Profile",
        href: "/account/profile",
        icon: User,
    },
    {
        title: "My Orders",
        href: "/account/orders",
        icon: Package,
    },
    {
        title: "Addresses",
        href: "/account/addresses",
        icon: MapPin,
    },
    {
        title: "Settings",
        href: "/account/settings",
        icon: Settings,
    },
];

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="container mx-auto px-8 md:px-20 lg:px-32 py-12 md:py-16">
            <h1 className="text-3xl font-headline font-bold mb-8">My Account</h1>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                pathname === item.href
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                        </Link>
                    ))}
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 bg-card rounded-xl border p-6 md:p-8 shadow-sm">
                    {children}
                </main>
            </div>
        </div>
    );
}
