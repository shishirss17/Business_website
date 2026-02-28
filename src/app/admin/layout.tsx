import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // Double-check authorization (middleware should handle this, but extra safety)
    if (!session || (session.user as any).role !== 'admin') {
        redirect('/');
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto bg-background">
                <div className="container mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
