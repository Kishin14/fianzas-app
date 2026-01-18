import { Home, CreditCard, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const menuItems = [
    {
        title: "Dashboard",
        href: "/",
        icon: Home,
        description: "Visión general de sus finanzas",
    },
    {
        title: "Movimientos",
        href: "/movements",
        icon: CreditCard,
        description: "Gestione sus ingresos y gastos",
    },
    {
        title: "Usuarios",
        href: "/users",
        icon: Users,
        description: "Administración de usuarios del sistema",
    },
];

export function Sidebar({ className }: { className?: string }) {
    const router = useRouter();

    return (
        <div className={cn("pb-12 h-screen border-r bg-sidebar", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-sidebar-foreground">
                        Finanzas App
                    </h2>
                    <Separator className="my-4" />
                    <div className="space-y-1">
                        {menuItems.map((item) => (
                            <Link key={item.href} href={item.href} passHref>
                                <Button
                                    variant={router.pathname === item.href ? "secondary" : "ghost"}
                                    className="w-full justify-start gap-2"
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.title}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
