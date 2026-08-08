import type { Metadata } from "next";
import { Inter, DM_Sans, Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ConditionalChrome } from "@/components/conditional-chrome";
import { Toaster } from "@/components/ui/sonner";

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
      suppressHydrationWarning
      className={cn("h-full", "antialiased", inter.variable, dmSans.variable, "font-sans", geist.variable)}
    >
      <head>
        {/* Google Analytics (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-6PJX8DN0K9"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6PJX8DN0K9');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[var(--color-bg-primary)]">
        <ConditionalChrome>{children}</ConditionalChrome>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
