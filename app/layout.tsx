import type { Metadata } from "next";
import { Inter, DM_Sans, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import Footer from "./components/Footer";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Teeside Properties — Nairobi's Premier Property Platform | Find, Rent & Invest",
  description:
    "Discover verified apartments, villas, and plots across the Nairobi Metropolitan Area. Teeside Properties offers trusted property management for landlords and a seamless search experience for tenants and diaspora investors.",
  keywords: [
    "Nairobi real estate",
    "property for sale Nairobi",
    "apartments for rent Kilimani",
    "property management Kenya",
    "diaspora investment Nairobi",
    "Westlands apartments",
    "Ruaka property",
    "Kitengela plots",
  ],
  openGraph: {
    title: "Teeside Properties — Nairobi's Premier Property Platform",
    description:
      "Find verified properties across the Nairobi Metropolitan Area. Trusted by 1,200+ clients with KES 4.2B under management.",
    type: "website",
    locale: "en_KE",
    siteName: "Teeside Properties",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teeside Properties — Nairobi Real Estate",
    description:
      "Discover verified apartments, villas, and plots across Nairobi. Your gateway to stress-free property investment.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, dmSans.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg-primary)]">
        <Navbar />
        <main className="flex-1 mobile-nav-safe">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
