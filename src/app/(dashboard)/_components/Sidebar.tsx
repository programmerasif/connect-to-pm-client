"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    LayoutDashboard,
    MessageSquareWarning,
    Users,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
    {
        label: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Complaints",
        href: "/dashboard/complaints",
        icon: MessageSquareWarning,
    },
    {
        label: "Volunteers",
        href: "/dashboard/volunteers",
        icon: Users,
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const NavLinks = () => (
        <div className="px-4">
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                Menu
            </p>
            <nav className="flex flex-col gap-0.5">
                {navItems.map(({ label, href, icon: Icon }) => {
                    const active =
                        href === "/dashboard"
                            ? pathname === "/dashboard"
                            : pathname.startsWith(href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                                active
                                    ? "bg-white text-[#00C833] shadow-sm"
                                    : "text-white/80 hover:bg-white/15 hover:text-white",
                            )}
                        >
                            <Icon
                                size={17}
                                className={cn(
                                    "shrink-0 transition-colors",
                                    active ? "text-[#00C833]" : "text-white/60 group-hover:text-white",
                                )}
                            />
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );

    const SignOut = () => (
        <div className="px-4">
            <div className="mb-4 border-t border-white/20" />
            <form action="/api/auth/logout" method="POST">
                <button
                    type="submit"
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition-all duration-150 hover:bg-white/15 hover:text-white"
                >
                    <LogOut size={17} className="shrink-0 text-white/50 transition-colors group-hover:text-white" />
                    Sign Out
                </button>
            </form>
        </div>
    );

    const Logo = () => (
        <div className="px-5 pb-6">
            <Link href="/" className="mb-1 flex items-center gap-2">
                <div className="relative h-9 w-28">
                    <Image
                        src="/logo-white.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </Link>
            <div className="mt-3 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/60" />
                <p className="text-xs font-medium text-white/60">Admin Dashboard</p>
            </div>
            <div className="mt-4 border-t border-white/20" />
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col bg-green-700 justify-between py-6 md:flex"
                
            >
                <div className="space-y-4">
                    <Logo />
                    <NavLinks />
                </div>
                <SignOut />
            </aside>

            {/* Mobile Top Bar */}
            <header
                className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 md:hidden"
                style={{ background: "linear-gradient(90deg, #00C833 0%, #00a828 100%)" }}
            >
                <Link href="/" className="relative h-8 w-24">
                    <Image
                        src="/logo-white.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </Link>
                <button
                    type="button"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                    aria-label="Toggle sidebar"
                >
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </header>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />
                    <aside
                        className="absolute left-0 top-0 flex h-full w-64 flex-col justify-between py-6 shadow-2xl"
                        style={{ background: "linear-gradient(160deg, #00C833 0%, #00a828 100%)" }}
                    >
                        <div className="space-y-4">
                            <Logo />
                            <NavLinks />
                        </div>
                        <SignOut />
                    </aside>
                </div>
            )}
        </>
    );
}
