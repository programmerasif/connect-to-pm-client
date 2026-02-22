import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

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
    <html lang="bn">
      <body
        className={`${hindSiliguri.variable} font-[family-name:var(--font-hind-siliguri)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
