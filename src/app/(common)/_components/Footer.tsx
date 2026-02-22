import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const pageLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Portfolio Single", href: "/portfolio/single" },
];

const shopLinks = [
    { label: "Product Single", href: "/shop/product" },
    { label: "Blog", href: "/blog" },
    { label: "Blog Post", href: "/blog/post" },
];

const utilityLinks = [
    { label: "Style Guide", href: "/style-guide" },
    { label: "Start Here", href: "/start" },
    { label: "404 Not Found", href: "/404" },
    { label: "Password Protected", href: "/password" },
    { label: "Licenses", href: "/licenses" },
    { label: "Changelog", href: "/changelog" },
];

const socialLinks = [
    { label: "Facebook", href: "#", icon: Facebook },
    { label: "Instagram", href: "#", icon: Instagram },
    { label: "Twitter", href: "#", icon: Twitter },
    { label: "LinkedIn", href: "#", icon: Linkedin },
    { label: "Youtube", href: "#", icon: Youtube },
];

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="mb-4 inline-block">
                            <Image
                                src="/logo-white.png"
                                alt="Logo"
                                width={120}
                                height={40}
                                className="object-contain"
                            />
                        </Link>
                        <p className="mt-4 text-sm leading-relaxed text-gray-400">
                            Stay up to date in the latest features and releases by joining our
                            newsletter.
                        </p>
                    </div>

                    {/* Page Links */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                            Page
                        </h4>
                        <ul className="space-y-2">
                            {pageLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                            Shop
                        </h4>
                        <ul className="space-y-2">
                            {shopLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Utility Pages */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                            Utility Pages
                        </h4>
                        <ul className="space-y-2">
                            {utilityLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                            Follow us
                        </h4>
                        <ul className="space-y-3">
                            {socialLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                                    >
                                        <link.icon size={16} />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row lg:px-8">
                    <p className="text-xs text-gray-500">
                        &copy; 2025 Created by AbdulKadir &amp; Powered by Webflow. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="text-xs text-gray-500 hover:text-white">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-xs text-gray-500 hover:text-white">
                            Terms of Service
                        </Link>
                        <Link href="/cookies" className="text-xs text-gray-500 hover:text-white">
                            Cookies Settings
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
