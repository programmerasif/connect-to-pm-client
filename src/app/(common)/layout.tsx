import type { Metadata } from "next";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
    title: "সবার আগে বাংলাদেশ - Connect to PM",
    description: "তারেক সাহেবের অঙ্গীকার - সবার আগে বাংলাদেশ",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
